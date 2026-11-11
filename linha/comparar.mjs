// Comparador do kit de treino: mesma empresa, mesma ficha, redação com o prompt antigo (V1) e com o kit novo
// (guia + exemplos + autocrítica). Monta os dois sites em pastas de teste, tira os prints e gera uma página
// lado a lado com a nota do detector de genéricos. Não mexe em clientes/ nem no wrangler.
//
//   node comparar.mjs                 compara todas as empresas da fila que já têm captura
//   node comparar.mjs --so <slug>     só uma
//
// Saída: <dados>/comparar/index.html (abrir no navegador).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { DADOS } from './config.mjs';
import { arq, lerJson, existe, log, estado, marcar } from './lib/util.mjs';
import { MODO } from './lib/claude.mjs';
import { capturar, fecharNavegador } from './etapas/captura.mjs';
import * as IA from './etapas/agentes.mjs';
import { montar } from './etapas/montagem.mjs';
import { REDACAO_SISTEMA_V1 } from './lib/prompts.mjs';
import { avaliar, resumo } from './lib/genericos.mjs';
import { esc } from './modelos/comum.mjs';

const args = process.argv.slice(2);
const so = args.includes('--so') ? args[args.indexOf('--so') + 1] : null;
const SAIDA = path.join(DADOS, 'comparar');
const empresasDir = path.join(DADOS, 'empresas');

async function passo(slug, nome, fn) {
  if (estado(slug).etapas[nome] === 'ok') return true;
  try { const r = await fn(); if (r === null) { marcar(slug, nome, 'aguardando'); return false; } marcar(slug, nome, 'ok'); return true; }
  catch (e) { marcar(slug, nome, 'erro: ' + e.message.split('\n')[0]); log(`${slug} ${nome}: ${e.message.split('\n')[0]}`); return false; }
}

async function comparar(slug) {
  const emp = lerJson(arq(slug, 'empresa.json'));
  if (!await passo(slug, 'captura', () => capturar(emp))) return null;
  if (!await passo(slug, 'conteudo', () => IA.conteudo(slug))) return null;
  const okA = await passo(slug, 'cmp-antes', () => IA.redacao(slug, { etapa: 'redacao-antes', sistema: REDACAO_SISTEMA_V1 }));
  const okD = await passo(slug, 'cmp-depois', () => IA.redacao(slug, { etapa: 'redacao-depois' }));
  if (!okA || !okD) return null;
  if (!await passo(slug, 'cmp-critica', () => IA.critica(slug, { de: 'redacao-depois' }))) return null;

  const ficha = lerJson(arq(slug, 'ia', 'conteudo.resposta.json')).json;
  const cap = lerJson(arq(slug, 'captura.json'));
  const pasta = path.join(SAIDA, slug);
  fs.mkdirSync(pasta, { recursive: true });
  const r = { slug, nome: ficha.empresa.nome, url: cap.home.url, lados: {} };
  for (const [lado, de] of [['antes', 'redacao-antes'], ['depois', 'redacao-depois']]) {
    await montar(slug, { de, destino: path.join(pasta, lado), prefixo: `${lado}-` });
    const site = IA.textosDoSite(slug, de);
    r.lados[lado] = { site, aval: avaliar(site, ficha, cap) };
    for (const v of ['a', 'b']) await recorte(arq(slug, 'prints', `${lado}-novo-${v}-computador.jpg`), path.join(pasta, `${lado}-${v}.jpg`));
  }
  r.revisada = lerJson(arq(slug, 'ia', 'redacao-depois.revisada.json'));
  await recorte(arq(slug, 'prints', 'atual-computador.jpg'), path.join(pasta, 'atual.jpg'));
  return r;
}

// Dois primeiros "andares" da home, reduzidos, para ver lado a lado.
async function recorte(origem, destino) {
  if (!existe(origem)) return;
  const m = await sharp(origem).metadata();
  await sharp(origem).extract({ left: 0, top: 0, width: m.width, height: Math.min(m.height, Math.round(m.width * 2.2)) }).resize({ width: 640 }).jpeg({ quality: 74 }).toFile(destino);
}

function textoHome(site) {
  const h = site.paginas?.[0];
  if (!h) return '';
  const li = s => `<li><small>${esc(s.tipo)}</small> ${s.subtitulo ? `<i>${esc(s.subtitulo)}</i> · ` : ''}<b>${esc(s.titulo)}</b>${s.itens?.length ? `<br><span>${s.itens.slice(0, 4).map(i => esc(i.titulo)).join(' · ')}</span>` : ''}</li>`;
  return `<p class="ch"><i>${esc(h.chamada?.sobretitulo || '')}</i><b>${esc(h.chamada?.titulo)}</b>${esc(h.chamada?.subtitulo)}</p><p>Botão: <b>${esc(site.botao)}</b> · ${site.paginas.length} páginas</p><ol>${(h.secoes || []).map(li).join('')}</ol>`;
}

function pagina(rs) {
  const bloco = r => {
    const lado = (k, t) => { const L = r.lados[k]; return `<div class="col"><h3>${t} <em class="nota n${Math.floor(L.aval.nota / 25)}">${L.aval.nota}</em></h3>
<div class="prints"><img src="${r.slug}/${k}-a.jpg" alt=""><img src="${r.slug}/${k}-b.jpg" alt=""></div>${textoHome(L.site)}
<details><summary>${L.aval.problemas.length} problemas do detector</summary><ul>${L.aval.problemas.map(p => `<li><code>${esc(p.onde)}</code> ${esc(p.texto)}</li>`).join('')}</ul></details></div>`; };
    return `<section><h2>${esc(r.nome)} <a href="${esc(r.url)}">site atual ↗</a></h2>
<div class="grade"><div class="col"><h3>Site atual</h3><img src="${r.slug}/atual.jpg" alt=""></div>${lado('antes', 'Antes (prompt antigo)')}${lado('depois', 'Depois (kit + autocrítica)')}</div>
${r.revisada ? `<p class="auto">Autocrítica: nota ${r.revisada.notaAntes} → ${r.revisada.notaDepois}, ${r.revisada.trocas} trocas, ${r.revisada.remocoes} remoções. ${esc(r.revisada.avaliacao || '')}</p>` : ''}
<p class="abrir">Abrir os sites montados: <code>${esc(path.join(SAIDA, r.slug))}</code> (pastas antes/public e depois/public).</p></section>`;
  };
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kit de treino · antes e depois</title>
<style>body{margin:0;font:15px/1.45 Inter,system-ui,sans-serif;background:#f3f4f6;color:#1d2129}main{max-width:1800px;margin:auto;padding:24px}
section{background:#fff;border:1px solid #e2e5ea;border-radius:8px;padding:20px;margin-bottom:28px}h2{margin:0 0 12px}h2 a{font-size:14px;font-weight:400}
.grade{display:grid;grid-template-columns:.8fr 1.3fr 1.3fr;gap:18px;align-items:start}.prints{display:grid;grid-template-columns:1fr 1fr;gap:8px}
img{width:100%;border:1px solid #e2e5ea;border-radius:4px;display:block}h3{margin:0 0 8px;font-size:15px}.nota{font-style:normal;padding:2px 8px;border-radius:12px;color:#fff;background:#b42318}
.n2{background:#b54708}.n3,.n4{background:#067647}.ch{display:grid;gap:2px;background:#f7f8fa;padding:10px;border-radius:6px}.ch i{color:#6b7280;font-size:13px}
ol{padding-left:18px}ol small{color:#6b7280;text-transform:uppercase;font-size:11px}ol span{color:#5b6270;font-size:13px}.auto,.abrir{color:#5b6270;font-size:13px}
details li{font-size:13px}code{font-size:12px}@media(max-width:1100px){.grade{grid-template-columns:1fr}}</style></head>
<body><main><h1>Kit de treino do gerador · antes e depois</h1><p>Mesma ficha da empresa, mesmos modelos de página. Só muda a instrução do redator. Nota do detector de genéricos: 0 a 100 (100 = nada genérico ou inventado encontrado).</p>
${rs.map(bloco).join('\n')}</main></body></html>`;
}

log(`comparar: modo ${MODO}; dados em ${DADOS}`);
let slugs = fs.existsSync(empresasDir) ? fs.readdirSync(empresasDir) : [];
if (so) slugs = slugs.filter(s => s === so);
const rs = [];
for (const s of slugs) { const r = await comparar(s); if (r) { rs.push(r); log(`${s}: antes ${resumo(r.lados.antes.aval)} | depois ${resumo(r.lados.depois.aval)}`); } }
await fecharNavegador();
if (rs.length) {
  fs.mkdirSync(SAIDA, { recursive: true });
  fs.writeFileSync(path.join(SAIDA, 'index.html'), pagina(rs));
  log(`comparação de ${rs.length} empresas em ${path.join(SAIDA, 'index.html')}`);
} else log('nenhuma empresa pronta para comparar (faltam respostas da IA: rode de novo depois de responder os pedidos)');
