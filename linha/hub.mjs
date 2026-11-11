// Liga a linha de produção ao banco do hub (D1 "prospeccao"), onde ficam as empresas do canvas e as decisões da aba Aprovar.
//
//   node hub.mjs lista --lista agro [--limite 36]    baixa empresas da lista ainda sem triagem, com site e telefone, para <dados>/lista.json (entrada de prints.mjs)
//   node hub.mjs fila [--lista agro] [--limite 10]   pega as empresas que você aprovou (triagem "fazer", status "produzir") e ainda sem dono, marca pedidoSite "producao" e grava <dados>/fila.json
//                       [--ver]      só olha a fila, sem marcar nada     [--retomar]  inclui as que a linha já pegou antes e não terminou
//   node hub.mjs devolver [--aplicar]                leva o resultado de cada empresa pronta (<dados>/canvas/*.json) para o canvas: status "ligar", proposta A/B, script
//
// Usa o wrangler, que já vem com o Node (npx). Na primeira vez rode `npx wrangler login` e entre na conta Cloudflare da Overtus.
// "devolver" sem --aplicar só escreve o arquivo SQL (<dados>/devolver.sql) para você conferir.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { DADOS, REPO } from './config.mjs';
import { lerJson, gravarJson, log } from './lib/util.mjs';

const BANCO = 'prospeccao';
const args = process.argv.slice(2);
const cmd = args[0];
const opcao = (n, padrao) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : padrao; };
// O wrangler pode escrever avisos antes do JSON; pega a partir do primeiro colchete.
const jsonDe = out => JSON.parse(out.slice(out.indexOf('[')));
const aspas = s => "'" + String(s).replace(/'/g, "''") + "'";

// No Windows, passar pelo cmd.exe estraga o SQL (o "<>" vira redirecionamento); quando der, chama o npx pelo próprio Node, sem shell.
const NPX_CLI = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npx-cli.js');
function wrangler(extra) {
  const resto = ['--yes', 'wrangler', 'd1', 'execute', BANCO, '--remote', ...extra];
  const opcoes = { cwd: REPO, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 };
  const r = process.platform === 'win32' && fs.existsSync(NPX_CLI)
    ? spawnSync(process.execPath, [NPX_CLI, ...resto], opcoes)
    : spawnSync('npx', resto, { ...opcoes, shell: process.platform === 'win32' });
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || 'wrangler falhou').split('\n').filter(Boolean).slice(-6).join('\n'));
  return r.stdout;
}

const COLUNAS_FILA = `id, lista, json_extract(doc,'$.nome') AS nome, json_extract(doc,'$.site') AS site, json_extract(doc,'$.cidade') AS cidade,
    json_extract(doc,'$.extra.uf') AS uf, json_extract(doc,'$.segmento') AS segmento, json_extract(doc,'$.contato.telefone') AS telefone,
    json_extract(doc,'$.contato.whatsapp') AS whatsapp, json_extract(doc,'$.contato.email') AS email, json_extract(doc,'$.aprovacao.em') AS aprovado_em`;
const limitar = (n, padrao) => Math.max(1, Math.min(500, Number(n) || padrao));
const um = s => s.replace(/\s+/g, ' ');
// Quem ainda está na fila: aprovada e sem dono. O pedido pode vir da aba Aprovar (sem pedidoSite) ou do botão "Fazer site" (pedidoSite.estado "fila");
// "producao" é de quem já pegou (a linha ou o Claude). Com retomar, também entram as que a própria linha pegou e não terminou.
const naFila = retomar => `apagado = 0 AND json_extract(doc,'$.triagem') = 'fazer' AND json_extract(doc,'$.status') = 'produzir'
    AND (COALESCE(json_extract(doc,'$.pedidoSite.estado'),'fila') = 'fila'${retomar ? ` OR (json_extract(doc,'$.pedidoSite.estado') = 'producao' AND json_extract(doc,'$.pedidoSite.quem') = 'linha')` : ''})`;

// Só olhar (não marca nada).
export function sqlFila(lista, limite, retomar = false) {
  return um(`SELECT ${COLUNAS_FILA} FROM empresas WHERE ${naFila(retomar)}
    ${lista ? `AND lista = ${aspas(lista)}` : ''} ORDER BY aprovado_em, id LIMIT ${limitar(limite, 50)}`);
}
// Pegar: uma única atualização escolhe e marca, então a linha e o Claude nunca pegam a mesma empresa (o lote identifica as que ficaram com a linha).
export function sqlPegar(lista, limite, agora, retomar = false) {
  const marca = JSON.stringify({ pedidoSite: { estado: 'producao', quem: 'linha', em: agora, lote: agora } });
  return um(`UPDATE empresas SET doc = json_patch(doc, ${aspas(marca)}), versao = versao + 1, atualizado = ${agora}
    WHERE id IN (SELECT id FROM empresas WHERE ${naFila(retomar)} ${lista ? `AND lista = ${aspas(lista)}` : ''}
    ORDER BY json_extract(doc,'$.aprovacao.em'), id LIMIT ${limitar(limite, 50)})`);
}
export function sqlPegas(agora) {
  return um(`SELECT ${COLUNAS_FILA} FROM empresas WHERE apagado = 0 AND json_extract(doc,'$.pedidoSite.lote') = ${Number(agora)} AND json_extract(doc,'$.pedidoSite.quem') = 'linha' ORDER BY aprovado_em, id`);
}

export function sqlLista(lista, limite) {
  return `SELECT id, lista, json_extract(doc,'$.nome') AS nome, json_extract(doc,'$.site') AS site, json_extract(doc,'$.cidade') AS cidade,
    json_extract(doc,'$.extra.uf') AS uf, json_extract(doc,'$.segmento') AS segmento, json_extract(doc,'$.contato.telefone') AS telefone,
    json_extract(doc,'$.contato.whatsapp') AS whatsapp, json_extract(doc,'$.contato.email') AS email, json_extract(doc,'$.extra.notaSite') AS nota
    FROM empresas WHERE apagado = 0 AND lista = ${aspas(lista)} AND COALESCE(json_extract(doc,'$.reserva'),0) = 0
    AND COALESCE(json_extract(doc,'$.triagem'),'') = '' AND COALESCE(json_extract(doc,'$.site'),'') <> '' AND COALESCE(json_extract(doc,'$.contato.telefone'),'') <> ''
    AND COALESCE(json_extract(doc,'$.temPrint'),0) = 0 ORDER BY nota DESC, id LIMIT ${Math.max(1, Math.min(500, Number(limite) || 36))}`.replace(/\s+/g, ' ');
}

// Duas atualizações por empresa: junta os campos novos ao registro (json_patch = mesclagem em profundidade, como o hub faz)
// e só muda o status para "ligar" se ainda estiver em "produzir" (não desfaz o que você já mexeu depois).
export function sqlDevolver(doc, agora = Date.now()) {
  const { id, lista, nome, site, cidade, segmento, contato, status, ...resto } = doc;
  const patch = { ...resto, linha: { pronto: new Date(agora).toISOString(), sub: resto.enr?.subdominio || '' } };
  // Quem pediu pelo botão "Fazer site" (ou pela aba Aprovar) vê o pedido como pronto, com os links das duas versões; lote: null apaga a marca de quem pegou.
  const nomes = (resto.enr?.versoes || []).map(v => v.nome);
  if (resto.proposta?.urlA) patch.pedidoSite = { estado: 'pronto', quem: 'linha', em: agora, lote: null,
    versoes: [{ nome: nomes[0] || 'Versão A', url: resto.proposta.urlA }, ...(resto.proposta.urlB ? [{ nome: nomes[1] || 'Versão B', url: resto.proposta.urlB }] : [])] };
  return [
    `UPDATE empresas SET doc = json_patch(doc, ${aspas(JSON.stringify(patch))}), versao = versao + 1, atualizado = ${agora} WHERE id = ${aspas(id)} AND apagado = 0;`,
    `UPDATE empresas SET doc = json_set(doc, '$.status', 'ligar'), versao = versao + 1, atualizado = ${agora + 1} WHERE id = ${aspas(id)} AND apagado = 0 AND json_extract(doc,'$.status') = 'produzir';`,
  ];
}

const principal = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (!principal) { /* importado só para testar o SQL */ }
else if (cmd === 'lista') {
  const lista = opcao('lista');
  if (!lista) { console.log('diga a lista: node hub.mjs lista --lista agro [--limite 36]'); process.exit(1); }
  const linhas = jsonDe(wrangler(['--json', '--command', sqlLista(lista, opcao('limite', 36))]))[0]?.results || [];
  gravarJson(path.join(DADOS, 'lista.json'), linhas);
  log(`${linhas.length} empresas da lista "${lista}" em ${path.join(DADOS, 'lista.json')}. Próximo passo: node prints.mjs ${path.join(DADOS, 'lista.json')}`);
} else if (cmd === 'fila') {
  const lista = opcao('lista'), limite = opcao('limite', 50), retomar = args.includes('--retomar'), agora = Date.now();
  let linhas;
  if (args.includes('--ver')) linhas = jsonDe(wrangler(['--json', '--command', sqlFila(lista, limite, retomar)]))[0]?.results || [];
  else {
    wrangler(['--json', '--command', sqlPegar(lista, limite, agora, retomar)]);
    linhas = jsonDe(wrangler(['--json', '--command', sqlPegas(agora)]))[0]?.results || [];
  }
  const comSite = linhas.filter(r => r.site), semSite = linhas.filter(r => !r.site);
  gravarJson(path.join(DADOS, 'fila.json'), comSite);
  if (semSite.length) gravarJson(path.join(DADOS, 'fila-sem-site.json'), semSite);
  log(`${linhas.length} aprovadas${args.includes('--ver') ? ' (só olhando, nada foi marcado)' : ' e marcadas como "em produção" no hub'}: ${comSite.length} com site em ${path.join(DADOS, 'fila.json')}${semSite.length ? `, ${semSite.length} sem site em fila-sem-site.json (a linha ainda não faz essas; elas ficam marcadas, use o Claude)` : ''}`);
  if (comSite.length) log('Próximo passo: node rodar.mjs entrada ' + path.join(DADOS, 'fila.json') + ' && node rodar.mjs');
} else if (cmd === 'devolver') {
  const pasta = path.join(DADOS, 'canvas');
  const docs = fs.existsSync(pasta) ? fs.readdirSync(pasta).filter(f => f.endsWith('.json')).map(f => lerJson(path.join(pasta, f))).filter(d => d?.id) : [];
  if (!docs.length) { log('Nada para devolver: nenhuma empresa pronta com id do canvas em ' + pasta); process.exit(0); }
  const sql = docs.flatMap((d, i) => sqlDevolver(d, Date.now() + i * 2)).join('\n');
  const arq = path.join(DADOS, 'devolver.sql');
  fs.writeFileSync(arq, sql + '\n');
  if (args.includes('--aplicar')) { wrangler(['--file', arq]); log(`${docs.length} empresas atualizadas no canvas do hub (status "ligar", proposta A/B e script).`); }
  else log(`${docs.length} empresas prontas. Conferir ${arq} e rodar de novo com --aplicar para gravar no hub.`);
} else {
  console.log('uso: node hub.mjs lista --lista agro [--limite 36]  |  node hub.mjs fila [--lista agro] [--limite 10] [--ver] [--retomar]  |  node hub.mjs devolver [--aplicar]');
  process.exit(1);
}
