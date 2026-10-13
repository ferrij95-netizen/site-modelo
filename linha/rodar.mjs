// Linha de produção de sites da Overtus.
//
//   node rodar.mjs entrada lista.csv [--lista agro]   registra as empresas da lista (csv do Excel ou json)
//   node rodar.mjs [--limite 10] [--so slug]          roda todas as etapas que faltam, empresa por empresa
//   node rodar.mjs custo                              mostra quanto cada etapa custou
//   node rodar.mjs situacao                           mostra em que etapa cada empresa está
//
// Modo (variável LINHA_MODO): direto (padrão com ANTHROPIC_API_KEY), lote (Batch API, metade do preço) ou manual (sem chave).
import fs from 'node:fs';
import path from 'node:path';
import { DADOS, REPO, NOTA_MINIMA } from './config.mjs';
import { lerJson, gravarJson, lerLista, slugDe, arq, estado, marcar, existe, log } from './lib/util.mjs';
import { MODO, enviarLote, colherLotes, estimarManual } from './lib/claude.mjs';
import { capturar, fecharNavegador } from './etapas/captura.mjs';
import * as IA from './etapas/agentes.mjs';
import { montar } from './etapas/montagem.mjs';
import { publicar } from './etapas/publicar.mjs';

const args = process.argv.slice(2);
const opcao = (n, padrao) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : padrao; };
const empresasDir = path.join(DADOS, 'empresas');

// ---------- entrada ----------
function entrada(arquivo) {
  const lista = opcao('lista', path.basename(arquivo).replace(/\.\w+$/, ''));
  const ocupados = new Set(fs.existsSync(path.join(REPO, 'clientes')) ? fs.readdirSync(path.join(REPO, 'clientes')) : []);
  let novas = 0;
  for (const e of lerLista(arquivo)) {
    const slug = slugDe(e.nome, e.site);
    if (existe(arq(slug, 'empresa.json'))) continue;
    // subdomínio: o slug, sem colidir com cliente feito à mão
    let sub = slug; for (let n = 2; ocupados.has(sub); n++) sub = `${slug}-${n}`;
    ocupados.add(sub);
    gravarJson(arq(slug, 'empresa.json'), { ...e, slug, sub, lista, entrou: new Date().toISOString() });
    marcar(slug, 'entrada', 'ok'); novas++;
  }
  log(`${novas} empresas novas na fila (lista "${lista}")`);
}

// ---------- uma empresa ----------
const PRONTO = 'ok';
async function etapa(slug, nome, fn) {
  const e = estado(slug).etapas[nome];
  if (e === PRONTO || e === 'descartada') return e;
  try {
    const r = await fn();
    if (r === null) { marcar(slug, nome, 'aguardando'); return 'aguardando'; }
    if (MODO === 'manual') await estimarManual(slug, nome);
    marcar(slug, nome, PRONTO); return PRONTO;
  } catch (err) { marcar(slug, nome, 'erro: ' + err.message.split('\n')[0]); log(`${slug} ${nome}: ${err.message.split('\n')[0]}`); return 'erro'; }
}

async function processar(slug) {
  const emp = lerJson(arq(slug, 'empresa.json'));
  if (await etapa(slug, 'captura', () => capturar(emp)) !== PRONTO) return;

  if (await etapa(slug, 'triagem', () => IA.triagem(slug)) !== PRONTO) return;
  const tri = lerJson(arq(slug, 'ia', 'triagem.resposta.json')).json;
  if (tri.nota < NOTA_MINIMA || !tri.vale_refazer) { marcar(slug, 'producao', 'descartada'); log(`${slug}: descartada na triagem (nota ${tri.nota}: ${tri.resumo})`); return; }

  if (await etapa(slug, 'conteudo', () => IA.conteudo(slug)) !== PRONTO) return;
  const ficha = lerJson(arq(slug, 'ia', 'conteudo.resposta.json')).json;
  // A abordagem só depende da ficha: pede junto com a redação (no modo lote, vão no mesmo lote).
  const [red, abo] = [await etapa(slug, 'redacao', () => IA.redacao(slug)), await etapa(slug, 'abordagem', () => IA.abordagem(slug))];
  if (red !== PRONTO) return;
  for (const l of ['en', 'es'].filter(l => ficha.idiomas.includes(l)))
    if (await etapa(slug, `traducao-${l}`, () => IA.traducao(slug, l)) !== PRONTO) return;

  if (await etapa(slug, 'montagem', () => montar(slug)) !== PRONTO) return;
  if (await etapa(slug, 'revisao', () => IA.revisao(slug)) !== PRONTO) return;
  const rev = lerJson(arq(slug, 'ia', 'revisao.resposta.json')).json;
  if (!rev.aprovado && rev.ajustes.length) {
    if (await etapa(slug, 'ajustes', () => montar(slug, { revisao: rev })) !== PRONTO) return;
  }
  if (abo !== PRONTO) return;
  await etapa(slug, 'publicar', () => publicar(slug));
}

// ---------- relatórios ----------
function custo() {
  const f = path.join(DADOS, 'custo.jsonl');
  if (!existe(f)) return log('nenhum custo registrado ainda');
  const linhas = fs.readFileSync(f, 'utf8').trim().split('\n').map(l => JSON.parse(l));
  const por = (k) => { const m = {}; for (const l of linhas) { const c = m[l[k]] ||= { n: 0, entrada: 0, saida: 0, usd: 0 }; c.n++; c.entrada += l.entrada + l.cacheEscrita + l.cacheLeitura; c.saida += l.saida; c.usd += l.usd; } return m; };
  const { DOLAR } = { DOLAR: Number(process.env.DOLAR || 5.5) };
  console.log('\nPor etapa:');
  for (const [k, c] of Object.entries(por('etapa'))) console.log(`  ${k.padEnd(14)} ${String(c.n).padStart(4)} pedidos  ${String(c.entrada).padStart(8)} tok entrada  ${String(c.saida).padStart(7)} tok saída  US$ ${c.usd.toFixed(4)}`);
  const empresas = por('slug');
  const prontas = Object.keys(empresas).filter(s => estado(s).etapas.publicar === PRONTO);
  const total = linhas.reduce((a, l) => a + l.usd, 0);
  console.log(`\nTotal: US$ ${total.toFixed(4)} (R$ ${(total * DOLAR).toFixed(2)}) em ${Object.keys(empresas).length} empresas; ${prontas.length} prontas para ligar.`);
  if (prontas.length) console.log(`Custo por site pronto (inclui as descartadas na triagem): US$ ${(total / prontas.length).toFixed(4)} = R$ ${(total * DOLAR / prontas.length).toFixed(2)}`);
  if (linhas.some(l => l.estimado)) console.log('(Linhas marcadas como estimadas vieram do modo manual: tokens contados pelo tamanho do texto e das imagens.)');
}

function situacao() {
  if (!fs.existsSync(empresasDir)) return log('fila vazia');
  for (const s of fs.readdirSync(empresasDir)) {
    const e = estado(s).etapas;
    console.log(s.padEnd(24), Object.entries(e).filter(([k]) => k !== 'entrada').map(([k, v]) => `${k}:${v === 'ok' ? '✓' : v}`).join('  '));
  }
}

// ---------- principal ----------
const cmd = args[0];
if (cmd === 'entrada') entrada(args[1]);
else if (cmd === 'custo') custo();
else if (cmd === 'situacao') situacao();
else {
  log(`modo ${MODO}; dados em ${DADOS}`);
  await colherLotes();
  const so = opcao('so');
  let slugs = fs.existsSync(empresasDir) ? fs.readdirSync(empresasDir) : [];
  if (so) slugs = slugs.filter(s => s === so);
  slugs = slugs.filter(s => !['ok', 'descartada'].includes(estado(s).etapas.publicar) && estado(s).etapas.producao !== 'descartada').slice(0, Number(opcao('limite', 1e9)));
  // Algumas empresas ao mesmo tempo: a captura espera a rede e a IA espera a resposta.
  const PARALELO = Number(opcao('paralelo', 3));
  const fila = [...slugs];
  await Promise.all(Array.from({ length: PARALELO }, async () => { while (fila.length) await processar(fila.shift()); }));
  await fecharNavegador();
  await enviarLote();
  situacao();
}
