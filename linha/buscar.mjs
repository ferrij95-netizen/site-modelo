// Buscador: separa, numa lista de empresas, os sites que o DONO acharia velhos, feios ou quebrados ao abrir,
// antes de a ficha ir para a aba Aprovar. Defeito escondido no código (versão de plugin, analytics, link de spam)
// não vende site novo; o que vende é o que aparece na tela, no computador e no celular.
//
//   node buscar.mjs nota lista.json|csv [--limite 30] [--paralelo 4] [--ia 6] [--teto 2] [--refazer]
//   node buscar.mjs mosaico [--min 0]      folhas com 12 sites (computador + celular) para a nota visual
//   node buscar.mjs ranking                 junta nota objetiva + nota visual + ficha e grava o resultado
//   node buscar.mjs calibrar [--rotulos rotulos.json] [--aplicar]
//
// Estágios:
//  1. Navegador (sem IA, grátis): abre o site, tira os prints (os mesmos <id>.d.jpg / <id>.m.jpg da aba Aprovar) e
//     mede o que se vê: cabe no celular, largura do conteúdo, fontes do sistema, fotos quebradas ou borradas, foto no topo,
//     tabela/Flash/letreiro, "em construção", lentidão, HTTPS, ano do rodapé e do conteúdo.
//  2. DeepSeek em paralelo (só texto, ~R$ 0,005 por empresa): o que a empresa faz, segmento, se é empresa de verdade,
//     telefone/WhatsApp/e-mail achados no texto, sinais de abandono no conteúdo e uma ficha curta. Limite de concorrência
//     (--ia) e teto de gasto em reais (--teto): ao chegar no teto, para de chamar.
//  3. Nota objetiva de 0 a 10 com os pesos de <dados>/buscador/pesos.json (ou os pesos iniciais abaixo).
//  4. Nota visual só para os finalistas: mosaicos com 12 sites por imagem, que a sessão do Claude no PC olha e grava em
//     <dados>/buscador/visual.json ({ "<id>": { "nota": 0-10, "porque": "..." } }). A DeepSeek não lê imagem.
//  5. Calibrar: cada aprovar/rejeitar do João na aba Aprovar (D1 "prospeccao") vira exemplo; uma regressão logística
//     ajusta os pesos e escolhe o corte que mantém 90% das aprovadas.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import { DADOS, REPO, PRECOS, DOLAR } from './config.mjs';
import { lerLista, lerJson, gravarJson, slugDe, log } from './lib/util.mjs';
import { UA_PC, UA_CEL, abrirNavegador, fecharNavegador, abrirPagina, reduzir, erroLegivel } from './lib/navegador.mjs';
import { deepseekJson } from './lib/claude.mjs';

const args = process.argv.slice(2);
const cmd = args[0];
const opcao = (n, padrao) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : padrao; };
const BANDEIRAS = ['--refazer', '--aplicar', '--sem-hub'];
const posicionais = [];
for (let k = 1; k < args.length; k++) { if (args[k].startsWith('--')) { if (!BANDEIRAS.includes(args[k])) k++; } else posicionais.push(args[k]); }

const PASTA = path.join(DADOS, 'buscador');
const PRINTS = path.join(DADOS, 'prints');
const arqSinais = id => path.join(PASTA, 'sinais', `${id}.json`);
const arqFicha = id => path.join(PASTA, 'ficha', `${id}.json`);
const ANO = new Date().getFullYear();

// ---------- Pesos ----------
// Cada sinal vale de 0 a 1. Os pesos iniciais favorecem o que o dono VÊ; o que só aparece no código pesa pouco.
// "calibrar" troca estes números pelos aprendidos com as decisões do Aprovar.
export const SINAIS = {
  naoCabeCelular: { peso: 2.0, texto: 'Não se adapta ao celular' },
  letraMinusculaCelular: { peso: 1.0, texto: 'Letra minúscula no celular' },
  conteudoEstreito: { peso: 1.4, texto: 'Layout estreito, de site antigo, com faixas vazias dos lados' },
  fotosQuebradas: { peso: 1.3, texto: 'Imagens quebradas' },
  fotosBorradas: { peso: 0.8, texto: 'Fotos pequenas ou borradas' },
  semFotoNoTopo: { peso: 0.6, texto: 'Topo sem foto de destaque' },
  fonteDoSistema: { peso: 0.8, texto: 'Fontes padrão do Windows (Arial, Verdana, Times)' },
  letraPequenaPc: { peso: 0.5, texto: 'Letra pequena no computador' },
  estruturaAntiga: { peso: 1.5, texto: 'Estrutura antiga (tabelas, Flash, molduras, letreiro)' },
  emConstrucao: { peso: 1.8, texto: 'Página "em construção" ou texto de modelo (lorem ipsum)' },
  lento: { peso: 0.5, texto: 'Demora para abrir' },
  semHttps: { peso: 0.4, texto: 'Sem HTTPS (aparece "Não seguro")' },
  anoVelho: { peso: 0.6, texto: 'Rodapé ou novidades de anos atrás' },
  construtorAntigo: { peso: 0.3, texto: 'Feito em ferramenta antiga' },
  conteudoAbandonado: { peso: 0.6, texto: 'Conteúdo parado (notícias e promoções velhas)' },
  temaModerno: { peso: -1.5, texto: 'Tema moderno (fontes da web, foto grande, responsivo)' },
};
const VIES_INICIAL = -2.6;
function pesos() {
  const p = lerJson(path.join(PASTA, 'pesos.json'));
  if (p?.pesos) return p;
  return { vies: VIES_INICIAL, pesos: Object.fromEntries(Object.entries(SINAIS).map(([k, v]) => [k, v.peso])), corte: 6, origem: 'pesos iniciais' };
}
const sig = z => 1 / (1 + Math.exp(-z));
export function notaObjetiva(x, p = pesos()) {
  let z = p.vies;
  for (const k of Object.keys(p.pesos)) z += p.pesos[k] * (x[k] ?? (k === 'visual' ? 0.5 : 0));
  return Math.round(sig(z) * 100) / 10;
}

// ---------- 1. Navegador ----------
// Roda dentro da página do computador. Só mede; quem decide é nota().
function medirPc() {
  const vis = el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity !== 0; };
  const W = innerWidth, H = innerHeight;
  // Largura ocupada pelo texto e pelas imagens (5% e 95% das bordas, para ignorar enfeites).
  const blocos = [...document.querySelectorAll('p,h1,h2,h3,h4,li,td,img,figure,blockquote,form')].filter(vis).slice(0, 600);
  const esq = [], dir = [];
  for (const el of blocos) { const r = el.getBoundingClientRect(); if (r.width < W * 0.98) { esq.push(r.left); dir.push(r.right); } }
  const q = (a, f) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(f * s.length))]; };
  const largura = Math.round(q(dir, 0.95) - q(esq, 0.05));
  // Fonte do texto corrido: a família e o tamanho que mais aparecem (por número de letras).
  const contagem = {}, tamanhos = [];
  for (const el of document.querySelectorAll('p,li,td,span,a')) {
    if (!vis(el) || el.childElementCount > 2) continue;
    const t = (el.innerText || '').trim(); if (t.length < 20) continue;
    const s = getComputedStyle(el);
    const fam = s.fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
    contagem[fam] = (contagem[fam] || 0) + t.length;
    tamanhos.push([parseFloat(s.fontSize), t.length]);
  }
  const fonte = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  const titulo = document.querySelector('h1,h2');
  const fonteTitulo = titulo ? getComputedStyle(titulo).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase() : '';
  tamanhos.sort((a, b) => a[0] - b[0]);
  let acum = 0; const totalLetras = tamanhos.reduce((s, t) => s + t[1], 0);
  let tamanho = 0; for (const [fs, n] of tamanhos) { acum += n; if (acum >= totalLetras / 2) { tamanho = fs; break; } }
  let webfont = false; try { webfont = [...document.fonts].some(f => f.status === 'loaded'); } catch {}
  // Imagens: quebradas, borradas (esticadas além do tamanho real) e a maior foto da primeira tela.
  let quebradas = 0, borradas = 0, topo = 0;
  for (const img of document.querySelectorAll('img')) {
    const r = img.getBoundingClientRect();
    if (!vis(img) || r.width < 40) continue;
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) quebradas++;
    else if (r.width > 250 && img.naturalWidth && img.naturalWidth < r.width * 0.7) borradas++;
    if (r.top < H) topo = Math.max(topo, Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0)));
  }
  for (const el of document.querySelectorAll('header,section,div,a,figure')) {
    const r = el.getBoundingClientRect(); if (r.top > H || r.width < 300 || r.height < 150) continue;
    if (/url\(/.test(getComputedStyle(el).backgroundImage)) topo = Math.max(topo, Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0)));
    if (el.querySelector(':scope > video, :scope > iframe[src*="youtube"]')) topo = Math.max(topo, r.width * Math.min(r.height, H));
  }
  // Estrutura antiga.
  const html = document.documentElement.outerHTML.slice(0, 600000);
  const tabelasLayout = [...document.querySelectorAll('table')].filter(t => { const r = t.getBoundingClientRect(); return r.width > W * 0.5 && t.querySelector('img') && (t.querySelector('table') || t.getAttribute('width')); }).length;
  const antigo = {
    flash: !!document.querySelector('object[data*=".swf"],embed[src*=".swf"],param[value*=".swf"]') || /swfobject/i.test(html),
    molduras: !!document.querySelector('frameset,frame'),
    letreiro: !!document.querySelector('marquee,blink'),
    tabelas: tabelasLayout,
    tagsVelhas: document.querySelectorAll('font,center,[bgcolor]').length,
  };
  const texto = document.body.innerText || '';
  const rodape = (document.querySelector('footer')?.innerText || texto.slice(-2500));
  const m = rodape.match(/(?:©|copyright|todos os direitos)[^\n]{0,40}?((?:19|20)\d{2})/i);
  const anos = (texto.match(/\b20[0-3]\d\b/g) || []).map(Number).filter(a => a <= new Date().getFullYear());
  const gerador = document.querySelector('meta[name="generator"]')?.content || '';
  const scripts = [...document.scripts].map(s => s.src).join(' ') + ' ' + [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href).join(' ');
  const jq = window.jQuery?.fn?.jquery || '';
  return {
    largura, fonte, fonteTitulo, tamanho, webfont, quebradas, borradas, topoFrac: Math.round(topo / (W * H) * 100) / 100,
    antigo, anoRodape: m ? +m[1] : 0, anoMaisNovo: anos.length ? Math.max(...anos) : 0, gerador, jquery: jq,
    construtor: /websitex5|website x5/i.test(html) ? 'WebSite X5' : /mobirise/i.test(html) ? 'Mobirise' : /wixstatic|wix\.com/i.test(scripts + gerador) ? 'Wix' : /joomla/i.test(gerador) ? 'Joomla' : /drupal/i.test(gerador + scripts) ? 'Drupal' : /wordpress|wp-content/i.test(gerador + scripts) ? 'WordPress' : '',
    moderno: /elementor|webflow|next\/static|_next\/|framer|tailwind|squarespace|gatsby|nuxt/i.test(scripts + html.slice(0, 200000)),
    placeholder: (texto.match(/lorem ipsum|dolor sit amet|site em constru[cç][aã]o|em manuten[cç][aã]o|under construction|coming soon|hello world|t[ií]tulo da not[ií]cia/i) || [''])[0],
    titulo: document.title.slice(0, 160),
    descricao: document.querySelector('meta[name="description"]')?.content?.slice(0, 300) || '',
    menu: [...document.querySelectorAll('nav a, header a')].filter(vis).map(a => (a.innerText || '').trim()).filter(t => t && t.length < 40).slice(0, 25),
    contatos: {
      tel: [...new Set([...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href').slice(4)))].slice(0, 5),
      whatsapp: [...new Set([...document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp"],a[href*="web.whatsapp"]')].map(a => a.href))].slice(0, 3),
      email: [...new Set([...document.querySelectorAll('a[href^="mailto:"]')].map(a => a.getAttribute('href').slice(7).split('?')[0]))].slice(0, 3),
      instagram: [...new Set([...document.querySelectorAll('a[href*="instagram.com"]')].map(a => a.href))].slice(0, 2),
      formulario: !!document.querySelector('form input[type=email], form textarea'),
    },
    // Texto para a DeepSeek: cabeçalhos e começo da página, mais o rodapé (onde ficam contato e endereço).
    textoIa: (texto.replace(/\s+\n/g, '\n').replace(/\n{2,}/g, '\n').slice(0, 3500) + '\n[...]\n' + rodape.replace(/\s+/g, ' ').slice(0, 800)),
  };
}

function medirCelular() {
  const ps = [...document.querySelectorAll('p,li,td,span,a')].filter(el => { const t = (el.innerText || '').trim(); return t.length > 20 && el.getBoundingClientRect().width > 0; }).slice(0, 300);
  const tam = ps.map(el => parseFloat(getComputedStyle(el).fontSize)).sort((a, b) => a - b);
  return {
    viewport: !!document.querySelector('meta[name="viewport"]'),
    larguraPagina: document.documentElement.scrollWidth,
    larguraJanela: innerWidth,
    tamanho: tam.length ? tam[Math.floor(tam.length / 2)] : 0,
  };
}

async function capturar(e) {
  const b = await abrirNavegador();
  const out = { id: e.id, nome: e.nome, site: e.site, em: new Date().toISOString() };
  const pc = await b.newContext({ viewport: { width: 1366, height: 800 }, userAgent: UA_PC, locale: 'pt-BR', ignoreHTTPSErrors: true });
  try {
    const pg = await pc.newPage();
    let falhas = 0; pg.on('requestfailed', () => falhas++); pg.on('response', r => { if (r.status() >= 400 && r.request().resourceType() === 'image') falhas++; });
    const t0 = Date.now();
    await abrirPagina(pg, e.site);
    await pg.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await pg.waitForTimeout(800);
    out.ms = Date.now() - t0;
    out.url_final = pg.url();
    out.pc = await pg.evaluate(medirPc);
    out.pc.recursosFalhos = falhas;
    const buf = await pg.screenshot({ type: 'jpeg', quality: 82 });
    out.pc.entropia = Math.round((await sharp(buf).stats()).entropy * 100) / 100;
    fs.writeFileSync(path.join(PRINTS, `${e.id}.d.jpg`), await reduzir(buf, 1000, 62));
  } finally { await pc.close(); }
  const cel = await b.newContext({ viewport: { width: 390, height: 844 }, userAgent: UA_CEL, isMobile: true, hasTouch: true, locale: 'pt-BR', ignoreHTTPSErrors: true });
  try {
    const pg = await cel.newPage();
    await pg.goto(out.url_final, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await pg.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await pg.waitForTimeout(600);
    out.cel = await pg.evaluate(medirCelular);
    const buf = await pg.screenshot({ type: 'jpeg', quality: 82 });
    fs.writeFileSync(path.join(PRINTS, `${e.id}.m.jpg`), await reduzir(buf, 340, 60));
  } finally { await cel.close(); }
  out.ok = true;
  return out;
}

// Sinais de 0 a 1 a partir das medidas. Também devolve os motivos que aparecem para o João.
const FONTES_SISTEMA = /^(arial|helvetica|verdana|tahoma|times new roman|times|georgia|trebuchet ms|comic sans ms|courier new|sans-serif|serif|segoe ui|calibri|microsoft sans serif)$/;
export function sinais(s, ficha) {
  const x = {};
  if (!s?.ok) return x;
  const pc = s.pc, cel = s.cel || {};
  const escala = cel.larguraJanela ? 390 / cel.larguraJanela : 1; // sem viewport, o celular mostra a página em 980 px encolhida
  x.naoCabeCelular = !cel.viewport || cel.larguraPagina > cel.larguraJanela + 8 ? 1 : 0;
  x.letraMinusculaCelular = cel.tamanho && cel.tamanho * escala < 12 ? 1 : 0;
  x.conteudoEstreito = pc.largura && pc.largura < 1000 ? Math.min(1, (1000 - pc.largura) / 150) : 0;
  x.fotosQuebradas = Math.min(1, (pc.quebradas || 0) / 2);
  x.fotosBorradas = Math.min(1, (pc.borradas || 0) / 3);
  x.semFotoNoTopo = pc.topoFrac < 0.15 ? 1 : pc.topoFrac < 0.3 ? 0.4 : 0;
  x.fonteDoSistema = !pc.webfont && FONTES_SISTEMA.test(pc.fonte) ? 1 : FONTES_SISTEMA.test(pc.fonteTitulo) && FONTES_SISTEMA.test(pc.fonte) ? 0.5 : 0;
  x.letraPequenaPc = pc.tamanho && pc.tamanho < 13 ? 1 : 0;
  const a = pc.antigo || {};
  x.estruturaAntiga = Math.min(1, (a.flash ? 1 : 0) + (a.molduras ? 1 : 0) + (a.letreiro ? 0.6 : 0) + (a.tabelas ? 0.6 : 0) + (a.tagsVelhas > 5 ? 0.4 : 0));
  x.emConstrucao = pc.placeholder ? 1 : 0;
  x.lento = s.ms > 8000 ? 1 : s.ms > 5000 ? 0.5 : 0;
  x.semHttps = String(s.url_final || '').startsWith('http://') ? 1 : 0;
  const ano = Math.max(pc.anoRodape || 0, 0);
  x.anoVelho = ano && ano <= ANO - 5 ? 1 : ano && ano <= ANO - 3 ? 0.5 : 0;
  const jq = (pc.jquery || '').split('.').map(Number);
  x.construtorAntigo = /WebSite X5|Mobirise/.test(pc.construtor) || (jq[0] === 1 && jq[1] < 9) ? 1 : 0;
  x.conteudoAbandonado = ficha?.abandonado ? 1 : 0;
  x.temaModerno = pc.moderno && pc.webfont && !x.naoCabeCelular && pc.topoFrac >= 0.3 ? 1 : pc.webfont && !x.naoCabeCelular && pc.largura >= 1100 ? 0.5 : 0;
  return x;
}
export const motivos = x => Object.entries(x).filter(([k, v]) => v >= 0.5 && SINAIS[k]?.peso > 0).sort((a, b) => SINAIS[b[0]].peso * b[1] - SINAIS[a[0]].peso * a[1]).map(([k]) => SINAIS[k].texto);

// ---------- 2. DeepSeek (texto) ----------
const SISTEMA_FICHA = `Você recebe o texto de um site de empresa brasileira (cabeçalho, menu, começo da página e rodapé).
Responda só com fatos que estão no texto; se não estiver, deixe vazio. Português do Brasil, frases curtas.
- empresaReal: false se for órgão público, associação, sindicato, escola, pessoa física ou site que não é da empresa.
- abandonado: true se o conteúdo visível mostra que ninguém mexe há anos (notícias, eventos ou promoções de 3+ anos atrás, "em breve" eterno, contagem de ano velho). Ano atual: ${ANO}.
- sinaisAbandono: os trechos que mostram isso, curtos.
- ficha: 2 frases sobre o que a empresa faz, para quem, e onde.`;
const ESQUEMA_FICHA = {
  type: 'object', additionalProperties: false,
  required: ['empresaReal', 'segmento', 'oQueFaz', 'b2b', 'porte', 'telefones', 'whatsapp', 'email', 'cidade', 'abandonado', 'sinaisAbandono', 'ficha'],
  properties: {
    empresaReal: { type: 'boolean' }, segmento: { type: 'string' }, oQueFaz: { type: 'string' }, b2b: { type: 'boolean' },
    porte: { type: 'string', enum: ['pequena', 'media', 'grande', 'nao_sei'] },
    telefones: { type: 'array', items: { type: 'string' } }, whatsapp: { type: 'string' }, email: { type: 'string' }, cidade: { type: 'string' },
    abandonado: { type: 'boolean' }, sinaisAbandono: { type: 'array', items: { type: 'string' } }, ficha: { type: 'string' },
  },
};
function usd(modelo, u) {
  const p = PRECOS[modelo] || PRECOS['deepseek-chat'];
  return ((u.input_tokens || 0) * p.entrada + (u.cache_read_input_tokens || 0) * p.entrada * 0.1 + (u.output_tokens || 0) * p.saida) / 1e6;
}
const gastoReais = () => { const f = path.join(PASTA, 'custo.jsonl'); return fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).reduce((s, l) => s + JSON.parse(l).reais, 0) : 0; };

async function ficha(e, s, teto) {
  const salva = lerJson(arqFicha(e.id));
  if (salva?.json) return salva.json;
  if (!process.env.DEEPSEEK_API_KEY) return null;
  if (gastoReais() >= teto) throw new Error(`teto de R$ ${teto} atingido, ficha não pedida`);
  const pc = s.pc;
  const texto = [`Empresa (da lista): ${e.nome}`, `Site: ${s.url_final}`, `Título: ${pc.titulo}`, `Descrição: ${pc.descricao}`, `Menu: ${pc.menu.join(' | ')}`,
    `Contatos achados nos links: ${JSON.stringify(pc.contatos)}`, '', pc.textoIa].join('\n');
  const t0 = Date.now();
  const r = await deepseekJson({ sistema: SISTEMA_FICHA, texto, esquema: ESQUEMA_FICHA, maxTokens: 900, temperatura: 0.2, rotulo: `${e.id} ficha` });
  const dolar = usd(r.modelo, r.usage);
  fs.appendFileSync(path.join(PASTA, 'custo.jsonl'), JSON.stringify({ quando: new Date().toISOString(), id: e.id, modelo: r.modelo, ...r.usage, usd: dolar, reais: dolar * DOLAR, ms: Date.now() - t0 }) + '\n');
  if (!r.json) throw new Error('DeepSeek não devolveu JSON');
  gravarJson(arqFicha(e.id), { json: r.json, usage: r.usage, modelo: r.modelo });
  return r.json;
}

// Fila com N trabalhadores ao mesmo tempo (navegador e IA têm limites diferentes).
async function emParalelo(itens, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.max(1, n) }, async () => { while (i < itens.length) { const it = itens[i++]; await fn(it); } }));
}

// ---------- Ranking ----------
function ranking(lista) {
  const p = pesos();
  const visual = lerJson(path.join(PASTA, 'visual.json'), {});
  const linhas = lista.map(e => {
    const s = lerJson(arqSinais(e.id));
    const f = lerJson(arqFicha(e.id))?.json || null;
    if (!s) return null;
    if (!s.ok) return { id: e.id, nome: e.nome, site: e.site, situacao: s.semSiteProprio ? 'sem site próprio' : 'fora do ar', erro: s.erro, nota: null, final: null, notaAntiga: e.nota ?? null, rotulo: e.rotulo ?? null };
    const x = sinais(s, f);
    const obj = notaObjetiva(x, p);
    const v = visual[e.id];
    // Com nota visual, ela manda (é o que o dono vê). Depois de calibrar, o peso dela vem das decisões do João.
    const final = !v ? obj : p.pesos.visual !== undefined ? notaObjetiva({ ...x, visual: v.nota / 10 }, p) : Math.round((0.75 * v.nota + 0.25 * obj) * 10) / 10;
    return {
      id: e.id, nome: e.nome, site: e.site, situacao: 'abre', nota: obj, visual: v?.nota ?? null, porqueVisual: v?.porque || '', final,
      // A ficha da DeepSeek tira da fila quem não é empresa (associação, órgão público) ou é gigante (não compra site de R$ 3 mil).
      passa: final >= p.corte && f?.empresaReal !== false && f?.porte !== 'grande', motivos: motivos(x), sinais: x,
      ficha: f && { empresaReal: f.empresaReal, segmento: f.segmento, oQueFaz: f.oQueFaz, porte: f.porte, telefones: f.telefones, whatsapp: f.whatsapp, email: f.email, abandono: f.sinaisAbandono, ficha: f.ficha },
      notaAntiga: e.nota ?? null, rotulo: e.rotulo ?? null,
    };
  }).filter(Boolean).sort((a, b) => (b.final ?? 11) - (a.final ?? 11));
  gravarJson(path.join(PASTA, 'resultado.json'), linhas);
  return linhas;
}

// Endereços que não são site próprio (rede social, WhatsApp, link de bio, página grátis do Google/Wix): não adianta abrir.
export const SEM_SITE_PROPRIO = /(instagram\.com|facebook\.com|fb\.com|linktr\.ee|wa\.me|whatsapp\.com|negocio\.site|business\.site|wixsite\.com|linkedin\.com|youtube\.com|tiktok\.com|google\.com\/maps|goo\.gl)/i;

// Lista de trabalho: a última passada para "nota" fica guardada, para mosaico/ranking/calibrar não precisarem do arquivo.
const listaSalva = () => lerJson(path.join(PASTA, 'lista.json'), []);

// ---------- Comandos ----------
if (cmd === 'nota') {
  const arquivo = posicionais[0];
  if (!arquivo) { console.log('uso: node buscar.mjs nota lista.json|csv [--limite 30] [--paralelo 4] [--ia 6] [--teto 2] [--refazer]'); process.exit(1); }
  fs.mkdirSync(PRINTS, { recursive: true }); fs.mkdirSync(path.join(PASTA, 'sinais'), { recursive: true });
  const bruta = arquivo.endsWith('.json') ? JSON.parse(fs.readFileSync(arquivo, 'utf8')) : lerLista(arquivo);
  let lista = bruta.map(e => ({ ...e, nome: e.nome || e.empresa, id: e.id || slugDe(e.nome || e.empresa, e.site) })).filter(e => e.site);
  lista = lista.slice(0, Number(opcao('limite', lista.length)));
  gravarJson(path.join(PASTA, 'lista.json'), lista);
  const teto = Number(opcao('teto', 2));
  const refazer = args.includes('--refazer');
  log(`${lista.length} sites. Navegador: ${opcao('paralelo', 4)} de cada vez. DeepSeek: ${process.env.DEEPSEEK_API_KEY ? `${opcao('ia', 6)} de cada vez, teto R$ ${teto}` : 'sem chave (DEEPSEEK_API_KEY), só sinais'}`);
  // O navegador e a IA andam juntos: assim que um site é medido, a ficha dele entra na fila da IA.
  const filaIa = [];
  let iaAtivos = 0; const maxIa = Number(opcao('ia', 6));
  const iaPendentes = [];
  const pedirFicha = (e, s) => new Promise(res => {
    filaIa.push(async () => {
      try { await ficha(e, s, teto); } catch (err) { log(`${e.id}: ficha não saiu (${err.message})`); }
      res();
    });
    puxar();
  });
  function puxar() { while (iaAtivos < maxIa && filaIa.length) { const job = filaIa.shift(); iaAtivos++; job().finally(() => { iaAtivos--; puxar(); }); } }
  const t0 = Date.now();
  await emParalelo(lista, Number(opcao('paralelo', 4)), async e => {
    let s = refazer ? null : lerJson(arqSinais(e.id));
    if (!s && SEM_SITE_PROPRIO.test(e.site)) s = { id: e.id, nome: e.nome, site: e.site, ok: false, semSiteProprio: true, erro: 'Não tem site próprio (só rede social, WhatsApp ou página grátis)', em: new Date().toISOString() };
    if (!s) {
      try { s = await capturar(e); } catch (err) { s = { id: e.id, nome: e.nome, site: e.site, ok: false, erro: erroLegivel(err), em: new Date().toISOString() }; }
      gravarJson(arqSinais(e.id), s);
    }
    log(`${e.id}: ${s.ok ? 'medido' : s.erro}`);
    if (s.ok) iaPendentes.push(pedirFicha(e, s));
  });
  await fecharNavegador();
  await Promise.all(iaPendentes);
  // O manifesto da aba Aprovar (mesmo formato de prints.mjs), com os motivos visíveis no lugar dos alertas antigos.
  const manifesto = path.join(PRINTS, 'prints.json');
  const feitos = Object.fromEntries((lerJson(manifesto, []) || []).map(r => [r.id, r]));
  const linhas = ranking(lista);
  for (const r of linhas) feitos[r.id] = r.situacao === 'abre' ? { id: r.id, nome: r.nome, site: r.site, url_final: lerJson(arqSinais(r.id))?.url_final, ok: true, sinais: r.motivos.slice(0, 4), nota: r.final, em: new Date().toISOString() } : { id: r.id, nome: r.nome, site: r.site, erro: r.erro, em: new Date().toISOString() };
  gravarJson(manifesto, Object.values(feitos));
  const custo = fs.existsSync(path.join(PASTA, 'custo.jsonl')) ? fs.readFileSync(path.join(PASTA, 'custo.jsonl'), 'utf8').split('\n').filter(Boolean).map(JSON.parse).filter(c => lista.some(e => e.id === c.id)) : [];
  const reais = custo.reduce((s, c) => s + c.reais, 0);
  log(`pronto em ${Math.round((Date.now() - t0) / 1000)} s: ${linhas.filter(l => l.situacao === 'abre').length} medidos, ${linhas.filter(l => l.situacao === 'fora do ar').length} fora do ar, ${linhas.filter(l => l.situacao === 'sem site próprio').length} sem site próprio, ${linhas.filter(l => l.passa).length} passam do corte ${pesos().corte}.`);
  if (custo.length) log(`DeepSeek: ${custo.length} fichas, R$ ${reais.toFixed(3)} no total, R$ ${(reais / custo.length).toFixed(4)} por empresa.`);
  log(`Resultado: ${path.join(PASTA, 'resultado.json')}. Próximo: node buscar.mjs mosaico`);
} else if (cmd === 'mosaico') {
  // 12 sites por folha: print do computador + do celular, com o número da ficha. Uma olhada dá nota a 12 sites.
  const min = Number(opcao('min', 0));
  const linhas = ranking(listaSalva()).filter(r => r.situacao === 'abre' && r.nota >= min && fs.existsSync(path.join(PRINTS, `${r.id}.d.jpg`)));
  const dir = path.join(PASTA, 'mosaicos'); fs.mkdirSync(dir, { recursive: true });
  const TW = 480, TH = 281, MW = 130, ROT = 26, PAD = 10, COLS = 3, POR = 12;
  const tileW = TW + MW + PAD, tileH = TH + ROT + PAD;
  const folhas = [];
  for (let f = 0; f * POR < linhas.length; f++) {
    const grupo = linhas.slice(f * POR, (f + 1) * POR);
    const camadas = [];
    for (const [i, r] of grupo.entries()) {
      const x = (i % COLS) * tileW + PAD, y = Math.floor(i / COLS) * tileH + PAD;
      const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      camadas.push({ input: Buffer.from(`<svg width="${TW + MW}" height="${ROT}"><rect width="100%" height="100%" fill="#111"/><text x="6" y="18" font-family="Arial" font-size="15" fill="#fff">${f * POR + i + 1}. ${esc(r.id)}  ${esc(r.nome || '').slice(0, 38)}</text></svg>`), left: x, top: y });
      camadas.push({ input: await sharp(path.join(PRINTS, `${r.id}.d.jpg`)).resize(TW, TH, { fit: 'cover', position: 'top' }).toBuffer(), left: x, top: y + ROT });
      const m = path.join(PRINTS, `${r.id}.m.jpg`);
      if (fs.existsSync(m)) camadas.push({ input: await sharp(m).resize(MW, TH, { fit: 'cover', position: 'top' }).toBuffer(), left: x + TW, top: y + ROT });
    }
    const out = path.join(dir, `folha-${String(f + 1).padStart(2, '0')}.jpg`);
    await sharp({ create: { width: COLS * tileW + PAD, height: Math.ceil(grupo.length / COLS) * tileH + PAD, channels: 3, background: '#ddd' } }).composite(camadas).jpeg({ quality: 78 }).toFile(out);
    folhas.push({ folha: out, ids: grupo.map(r => r.id) });
  }
  gravarJson(path.join(dir, 'folhas.json'), folhas);
  fs.writeFileSync(path.join(dir, 'COMO-DAR-NOTA.md'), `# Nota visual (para a sessão do Claude que olha as folhas)

Abra cada folha-XX.jpg. Cada quadro é um site: print do computador (esquerda) e do celular (direita).
Nota de 0 a 10: quanto o DONO da empresa, abrindo o próprio site, acharia velho, feio ou quebrado.
- 8 a 10: claramente antigo ou quebrado (layout estreito, fonte de Windows, fotos pequenas ou borradas, não cabe no celular, página vazia ou "em construção").
- 5 a 7: datado, mas apresentável; o dono pode não ver motivo para trocar.
- 0 a 4: moderno e limpo, mesmo que tenha defeitos escondidos no código. Não vale ligar.
Grave em ${path.join(PASTA, 'visual.json')}: { "<id>": { "nota": 8, "porque": "uma frase do que se vê" }, ... }
Depois: node buscar.mjs ranking
`);
  log(`${folhas.length} folhas com ${linhas.length} sites em ${dir}. Instruções em COMO-DAR-NOTA.md`);
} else if (cmd === 'ranking') {
  const linhas = ranking(listaSalva());
  const p = pesos();
  for (const r of linhas) console.log(`${String(r.final ?? 'X').padStart(4)} ${r.passa ? '✔' : ' '} ${r.id.padEnd(16)} ${(r.nome || '').slice(0, 30).padEnd(30)} ${r.situacao === 'abre' ? r.motivos.slice(0, 3).join('; ') : r.erro}`);
  log(`corte ${p.corte} (${p.origem}). ${linhas.filter(l => l.passa).length} de ${linhas.length} passam.`);
} else if (cmd === 'calibrar') {
  // Exemplos: decisões do Aprovar no D1 (aprovou = 1, rejeitou = 0) e, se houver, rótulos à mão.
  const lista = listaSalva();
  const rot = {};
  for (const e of lista) if (e.rotulo === 0 || e.rotulo === 1) rot[e.id] = e.rotulo;
  Object.assign(rot, lerJson(opcao('rotulos', ''), {}) || {});
  if (!args.includes('--sem-hub')) {
    try {
      // Aprovar grava aprovacao.acao = ok | nope | maybe e triagem = fazer | descartar | talvez. "talvez" não entra.
      const sql = "SELECT id, json_extract(doc,'$.aprovacao.acao') AS acao, json_extract(doc,'$.triagem') AS triagem FROM empresas WHERE apagado = 0 AND (json_extract(doc,'$.aprovacao.acao') IN ('ok','nope') OR json_extract(doc,'$.triagem') IN ('fazer','descartar'))";
      const r = spawnSync('npx', ['--yes', 'wrangler', 'd1', 'execute', 'prospeccao', '--remote', '--json', '--command', sql], { cwd: REPO, encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 64 << 20 });
      const linhas = JSON.parse(r.stdout.slice(r.stdout.indexOf('[')))[0]?.results || [];
      for (const l of linhas) rot[l.id] = l.acao === 'ok' || (!l.acao && l.triagem === 'fazer') ? 1 : 0;
      log(`${linhas.length} decisões do Aprovar lidas do hub`);
    } catch (e) { log('não consegui ler o hub (npx wrangler login?): ' + e.message.split('\n')[0]); }
  }
  const visual = lerJson(path.join(PASTA, 'visual.json'), {});
  const ex = Object.entries(rot).map(([id, y]) => { const s = lerJson(arqSinais(id)); if (!s?.ok) return null; const x = sinais(s, lerJson(arqFicha(id))?.json); x.visual = visual[id] ? visual[id].nota / 10 : 0.5; return { id, y, x }; }).filter(Boolean);
  const pos = ex.filter(e => e.y).length;
  if (ex.length < 8 || !pos || pos === ex.length) { log(`só ${ex.length} exemplos medidos (${pos} aprovados): pouco para calibrar. Continue deslizando no Aprovar.`); process.exit(0); }
  // Regressão logística com freio (puxa os pesos para os iniciais quando há poucos exemplos).
  const chaves = [...Object.keys(SINAIS), 'visual'];
  const p0 = pesos();
  const w = Object.fromEntries(chaves.map(k => [k, k === 'visual' ? (p0.pesos.visual ?? 4) : p0.pesos[k]]));
  const prior = { ...w }; let b = p0.pesos.visual === undefined ? p0.vies - 2 : p0.vies; // o visual entra valendo 0,5 x 4 = 2
  const lambda = 4 / ex.length, taxa = 0.3;
  for (let it = 0; it < 3000; it++) {
    const g = Object.fromEntries(chaves.map(k => [k, 0])); let gb = 0;
    for (const e of ex) { const z = b + chaves.reduce((s, k) => s + w[k] * (e.x[k] || 0), 0); const d = sig(z) - e.y; gb += d; for (const k of chaves) g[k] += d * (e.x[k] || 0); }
    b -= taxa * gb / ex.length;
    for (const k of chaves) w[k] -= taxa * (g[k] / ex.length + lambda * (w[k] - prior[k]));
  }
  const pont = ex.map(e => ({ ...e, n: Math.round(sig(b + chaves.reduce((s, k) => s + w[k] * (e.x[k] || 0), 0)) * 100) / 10 })).sort((a, c) => c.n - a.n);
  // Corte: o mais alto que ainda deixa passar 90% das aprovadas.
  const notasPos = pont.filter(e => e.y).map(e => e.n).sort((a, c) => a - c);
  const corte = notasPos[Math.floor(notasPos.length * 0.1)];
  const passam = pont.filter(e => e.n >= corte);
  const res = { vies: b, pesos: w, corte, origem: `calibrado com ${ex.length} decisões em ${new Date().toISOString().slice(0, 10)}`, acerto: `${passam.filter(e => e.y).length} de ${passam.length} que passam foram aprovadas; ${pont.filter(e => !e.y && e.n < corte).length} de ${ex.length - pos} rejeitadas ficaram de fora` };
  log(res.origem + '. ' + res.acerto);
  for (const k of chaves) log(`  ${k.padEnd(22)} ${prior[k].toFixed(2)} -> ${w[k].toFixed(2)}`);
  if (args.includes('--aplicar')) { gravarJson(path.join(PASTA, 'pesos.json'), res); log('pesos gravados em ' + path.join(PASTA, 'pesos.json')); }
  else log('rode com --aplicar para usar estes pesos');
} else {
  console.log('uso: node buscar.mjs nota lista.json [--limite 30] [--paralelo 4] [--ia 6] [--teto 2]  |  mosaico [--min 0]  |  ranking  |  calibrar [--rotulos f.json] [--aplicar]');
  process.exit(1);
}
