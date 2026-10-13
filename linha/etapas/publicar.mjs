// Etapa 8 (sem IA): deixa a empresa pronta para ligar.
//  - clientes/<sub>/ligacao.json: telefone, WhatsApp, e-mail, problemas do site atual e o script adaptado (o hub mostra).
//  - rota <sub>.overtus.com.br no wrangler.jsonc (o preview vai ao ar no próximo deploy).
//  - dados/canvas/<slug>.json: o mesmo conteúdo no formato do canvas de prospecção, para importar lá.
import fs from 'node:fs';
import path from 'node:path';
import { REPO, DADOS, DOMINIO, DOLAR } from '../config.mjs';
import { arq, lerJson, gravarJson, log } from '../lib/util.mjs';
import { VERSOES } from '../modelos/versoes.mjs';

export function publicar(slug) {
  const emp = lerJson(arq(slug, 'empresa.json'));
  const ficha = lerJson(arq(slug, 'ia', 'conteudo.resposta.json')).json;
  const tri = lerJson(arq(slug, 'ia', 'triagem.resposta.json'))?.json || {};
  const ab = lerJson(arq(slug, 'ia', 'abordagem.resposta.json')).json;
  const cap = lerJson(arq(slug, 'captura.json'));
  const base = `https://${emp.sub}.${DOMINIO}`;
  const telefones = [...new Set([emp.telefone, ...ficha.contato.telefones].filter(Boolean))];
  const whatsapp = emp.whatsapp || ficha.contato.whatsapp || '';
  const links = { a: `${base}/a/`, b: `${base}/b/`, escolha: `${base}/` };
  const script = { ...ab.script, whatsapp: ab.script.whatsapp.replace('{LINK_A}', links.a).replace('{LINK_B}', links.b) };

  const ligacao = {
    empresa: ficha.empresa.nome, cidade: ficha.empresa.cidade || emp.cidade, uf: ficha.empresa.uf || emp.uf, segmento: ficha.empresa.segmento || emp.segmento,
    lista: emp.lista || '', site_atual: cap.home.url, preview: links,
    telefones, whatsapp, email: emp.email || ficha.contato.emails[0] || '',
    nota_visual: tri.nota ?? null,
    // O que a revisão apontou e a montagem não conseguiu corrigir sozinha: o hub mostra como alerta.
    alertas: (() => { const r = lerJson(arq(slug, 'ia', 'revisao.resposta.json'))?.json; return r && !r.aprovado && !r.ajustes.length ? r.problemas : []; })(), problemas: ab.problemas, melhor_horario: ab.melhor_horario, script,
    gerado: new Date().toISOString(),
  };
  gravarJson(path.join(REPO, 'clientes', emp.sub, 'ligacao.json'), ligacao);

  // Rota do preview (um endereço por cliente, como os outros).
  const wr = path.join(REPO, 'wrangler.jsonc');
  let txt = fs.readFileSync(wr, 'utf8');
  const padrao = `${emp.sub}.${DOMINIO}`;
  if (!txt.includes(`"${padrao}"`)) {
    txt = txt.replace(/(\{ "pattern": "[^"]+", "custom_domain": true \})(\s*\n\s*\],)/, `$1,\n    { "pattern": "${padrao}", "custom_domain": true }$2`);
    fs.writeFileSync(wr, txt);
  }

  // Quanto este site custou na linha (soma de custo.jsonl): o painel Resultados do hub mostra por site.
  const fc = path.join(DADOS, 'custo.jsonl');
  const gastos = fs.existsSync(fc) ? fs.readFileSync(fc, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)).filter(l => l.slug === slug) : [];
  const usd = gastos.reduce((t, l) => t + (l.usd || 0), 0);

  // Documento para o canvas de prospecção (coleção "empresas").
  // "id" é o da empresa no canvas (coluna id da lista); com ele, `node hub.mjs devolver` atualiza a empresa lá.
  gravarJson(path.join(DADOS, 'canvas', `${slug}.json`), {
    id: emp.id || '', lista: emp.lista || 'linha', nome: ligacao.empresa, site: cap.home.url, cidade: [ligacao.cidade, ligacao.uf].filter(Boolean).join('/'),
    segmento: ligacao.segmento, status: 'ligar',
    contato: { telefone: telefones[0] || '', email: ligacao.email, whatsapp },
    proposta: { urlA: links.a, urlB: links.b },
    custo: { usd: +usd.toFixed(4), reais: +(usd * DOLAR).toFixed(2), pedidos: gastos.length, estimado: gastos.some(l => l.estimado) },
    enr: {
      script, subdominio: emp.sub, mensagemProposta: script.whatsapp,
      versoes: ['a', 'b'].map(v => ({ nome: VERSOES[v].nome, estilo: v === 'a' ? 'fiel ao site atual' : 'moderna', descricao: VERSOES[v].descricao, destaques: [] })),
      problemas: ab.problemas, notaVisual: tri.nota ?? null, melhorHorario: ab.melhor_horario,
    },
  });
  log(`${slug}: pronto para ligar (${telefones[0] || 'sem telefone'}) -> ${links.escolha}`);
}
