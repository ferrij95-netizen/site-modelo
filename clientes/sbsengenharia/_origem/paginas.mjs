// Monta as páginas das versões A ("Canteiro": fiel ao site atual, faixa cinza dos segmentos com os ícones redondos,
// banner com a tarja branca inclinada, títulos em Archivo Narrow como o site de hoje) e B ("Traçado": técnica, títulos
// em Archivo largo como o "sbs" do logo, mapa das obras, linha do tempo em forma de rodovia e obras em boletim).
// Estilos em public/assets/{base,a,b}.css, comportamento em public/assets/site.js.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, banners, segmentos, obras, obrasIntro, etapas, institucional as I, marcos, equipamentos, gruposFrota, setoresContato } from './conteudo.mjs';

const dir = path.dirname(new URL(import.meta.url).pathname);
const icones = JSON.parse(fs.readFileSync(path.join(dir, 'icones.json'), 'utf8'));
const mapa = JSON.parse(fs.readFileSync(path.join(dir, 'mapa.json'), 'utf8'));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fora = ' target="_blank" rel="noopener"';
export const nomesVersao = { a: 'Canteiro', b: 'Traçado' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'segmentos', nome: 'Segmentos', caminho: 'segmentos/' },
  { slug: 'obras', nome: 'Principais obras', caminho: 'obras/' },
  { slug: 'locacao', nome: 'Locação', caminho: 'locacao/' },
  { slug: 'conduta', nome: 'Conduta', caminho: 'conduta/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const L = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  fora: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  doc: '<path d="M6 2.5h9l4 4v15H6z"/><path d="M15 2.5v4h4M9 11h7M9 14h7M9 17h5"/>',
  escudo: '<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  pessoa: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/>',
  selo: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  in: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/>',
  cadeado: '<rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${L[n]}</svg>`;
// Ícones dos segmentos: vetorizados do site atual (vetorizar-icones.py).
const icSeg = (id, cls = 'ic-seg') => `<svg class="${cls}" viewBox="${icones[id].vb}" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="${icones[id].d}"/></svg>`;

const foto = (nome, alt = '', { g = false, cls = '', lazy = true } = {}) =>
  `<img class="${cls}" src="/assets/img/obras/${nome}${g ? '-g' : ''}.webp" alt="${esc(alt)}" width="${g ? 1224 : 765}" height="${g ? 688 : 430}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
const segPor = id => segmentos.find(s => s.id === id);
const fotoSeg = s => s.foto ? foto(s.foto, s.nome) : `<img src="/assets/img/frota.webp" alt="Frota de equipamentos da SBS" width="940" height="480" loading="lazy" decoding="async">`;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=Archivo+Narrow:wght@500;600;700&family=Inter:wght@400;500;600'
    : 'family=Archivo:wdth,wght@100..125,500..800&family=Inter:wght@400;500;600';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#00519B">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const marca = v => `<a class="marca" href="/${v}/" aria-label="SBS Engenharia, página inicial"><img src="/assets/logo.svg" alt="SBS Engenharia" width="90" height="90"></a>`;
const restrito = () => E.restrito.map(r => `<a href="${r.url}"${fora}>${r.nome}</a>`).join('');

function topo(v, atual) {
  const btn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
  if (v === 'a') return `<div class="util"><div class="in">
  <p class="util-rest">${ic('cadeado')}<span>Acesso restrito:</span>${restrito()}</p>
  <p class="util-dir"><a href="/a/trabalhe-conosco/">Trabalhe conosco</a><a href="${E.social.facebook}"${fora} aria-label="Facebook">${ic('fb')}</a><a href="${E.social.linkedin}"${fora} aria-label="LinkedIn">${ic('in')}</a></p>
</div></div>
<header class="topo"><div class="in">${marca(v)}<nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="so-cel" href="/a/trabalhe-conosco/">Trabalhe conosco</a></nav>${btn}</div></header>`;
  return `<header class="topo"><div class="in">${marca(v)}
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="so-cel" href="/b/trabalhe-conosco/">Trabalhe conosco</a></nav>
  <a class="topo-tel" href="tel:${E.unidades[0].fones[0].h}">${ic('tel')}<span>${E.unidades[0].fones[0].t}</span></a>${btn}
</div></header>`;
}

function rodape(v) {
  const u = E.unidades;
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="SBS Engenharia" width="90" height="90"><p>${E.completo}<br>Engenharia e construção desde ${E.fundacao}.</p>
    <p class="rod-soc"><a href="${E.social.facebook}"${fora} aria-label="Facebook">${ic('fb')}</a><a href="${E.social.linkedin}"${fora} aria-label="LinkedIn">${ic('in')}</a></p></div>
  ${u.map(x => `<div><h3>${x.nome}</h3><p>${x.rua}<br>${x.bairro}, ${x.cidade}<br>${x.cep}</p><p>${x.fones.map(f => `<a href="tel:${f.h}">${f.t}</a>`).join('<br>')}</p></div>`).join('')}
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}<a href="/${v}/trabalhe-conosco/">Trabalhe conosco</a></nav>
  <div><h3>Acesso restrito</h3>${restrito()}<a href="${E.cartilha}"${fora}>Código de Conduta (PDF)</a><a href="${E.igualdade}"${fora}>Lei da Igualdade Salarial</a></div>
</div><p class="rod-fim"><span>© ${E.completo}</span><span>Porto Alegre · Capão do Leão · RS</span></p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// Cabeçalho das páginas internas. A: banner fotográfico com a tarja branca inclinada (como as páginas internas de hoje).
// B: título grande sobre fundo claro com régua de quilômetro.
function capa(v, titulo, sub, fotoNome, migalha = []) {
  const mig = `<nav class="migalha" aria-label="Você está em"><a href="/${v}/">Início</a>${migalha.map(m => m.url ? `<a href="${m.url}">${m.t}</a>` : `<span>${m.t}</span>`).join('')}</nav>`;
  if (v === 'a') return `<section class="capa">${fotoNome ? `<div class="capa-foto">${foto(fotoNome, '', { g: true, lazy: false })}</div>` : ''}<div class="in">${mig}<div class="tarja"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div></section>`;
  return `<section class="capa"><div class="in">${mig}<h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div><div class="regua" aria-hidden="true"></div></section>`;
}

const tit = (v, titulo, eyebrow, { tag = 'h2', cls = '' } = {}) =>
  `<div class="tit ${cls}">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<${tag}>${titulo}</${tag}></div>`;

// ---------- blocos ----------
// Mapa das obras: estados num SVG à parte (assets/mapa.svg) e os pontos por cima, no mesmo viewBox.
function mapaObras(cls = '', so = null, caixa = null) {
  const lista = so ? obras.filter(o => so.includes(o.slug)) : obras;
  const cidades = {};
  for (const o of lista) for (const p of o.pontos) (cidades[p] ||= []).push(o.slug);
  const vb = caixa || (so ? caixaMapa(Object.keys(cidades)) : '0 0 860 875');
  return `<div class="mapa ${cls}" data-mapa><svg viewBox="${vb}" role="img" aria-label="Mapa das obras da SBS">
  <image href="/assets/mapa.svg" x="0" y="0" width="860" height="875"/>
  ${Object.entries(cidades).map(([c, ss]) => { const [x, y] = mapa.pontos[c]; return `<g class="pino" data-obras="${ss.join(' ')}" transform="translate(${x} ${y})"><circle class="pino-onda" r="11"/><circle r="7"/><title>${c}</title></g>`; }).join('')}
</svg></div>`;
}
function caixaMapa(cidades) {
  const ps = cidades.map(c => mapa.pontos[c]);
  const xs = ps.map(p => p[0]), ys = ps.map(p => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const lado = Math.max(280, Math.max(...xs) - Math.min(...xs) + 90, Math.max(...ys) - Math.min(...ys) + 90);
  return `${(cx - lado / 2).toFixed(0)} ${(cy - lado / 2).toFixed(0)} ${lado.toFixed(0)} ${lado.toFixed(0)}`;
}

const galeria = o => {
  const n = Array.from({ length: o.fotos }, (_, i) => i + 1);
  const leg = i => o.legendas?.[i - 1] || o.curto;
  return `<div class="galeria" data-galeria>
  <figure class="gal-principal"><a href="/assets/img/obras/${o.slug}-1-g.webp" data-lightbox>${foto(`${o.slug}-1`, leg(1), { g: true, lazy: false })}</a><figcaption>${esc(leg(1))}</figcaption></figure>
  ${o.fotos > 1 ? `<div class="gal-miniaturas">${n.map(i => `<button type="button" data-foto="/assets/img/obras/${o.slug}-${i}-g.webp" data-legenda="${esc(leg(i))}"${i === 1 ? ' aria-current="true"' : ''} aria-label="Foto ${i}">${foto(`${o.slug}-${i}`, '')}</button>`).join('')}</div>` : ''}
</div>`;
};

const linkObra = (v, o) => `/${v}/obras/${o.slug}/`;

const formContato = (setor = '') => `<form class="form" data-form>
  <label class="largo"><span>Setor com o qual deseja falar</span><select name="setor">${setoresContato.map(s => `<option${s === setor ? ' selected' : ''}>${s}</option>`).join('')}</select></label>
  <label><span>Nome</span><input name="nome" autocomplete="name" required></label>
  <label><span>E-mail</span><input name="email" type="email" autocomplete="email" required></label>
  <label><span>Telefone</span><input name="telefone" type="tel" autocomplete="tel"></label>
  <label><span>Empresa ou órgão</span><input name="empresa" autocomplete="organization"></label>
  <label class="largo"><span>Mensagem</span><textarea name="mensagem" rows="5" required></textarea></label>
  <div class="largo form-fim"><button type="submit" class="btn">Enviar mensagem ${ic('seta')}</button><p class="form-aviso" role="status" hidden>Esta é uma prévia do site: a mensagem não foi enviada. No site publicado ela chega direto ao setor escolhido.</p></div>
</form>`;

const unidadesHtml = () => `<div class="unidades">${E.unidades.map(u => `<div class="unidade">
  <h3>${u.nome}</h3><p class="u-cidade">${u.cidade}</p>
  <p>${u.rua}<br>${u.bairro} · ${u.cep}</p>
  <p class="u-fones">${u.fones.map(f => `<a href="tel:${f.h}">${ic('tel')} ${f.t}</a>`).join('')}</p>
  <a class="link-seta" href="${u.mapa}"${fora}>${ic('pin')} Ver no mapa</a>
</div>`).join('')}</div>`;

// Três assuntos institucionais do rodapé do site atual: compliance, qualidade e trabalhe conosco.
const faixaInstitucional = v => `<section class="instit"><div class="in">
  <div><span class="instit-ic">${ic('escudo')}</span><h3>Compliance</h3><p>${I.compliance}</p><a class="link-seta" href="/${v}/conduta/">Código de Conduta e canal de relato ${ic('seta')}</a></div>
  <div><span class="instit-ic">${ic('selo')}</span><h3>Qualidade ISO 9001</h3><p>Sistema de Gestão da Qualidade implantado em 1999 e certificado desde abril de 2001, com melhoria contínua nas atividades críticas.</p><a class="link-seta" href="/${v}/empresa/#qualidade">Política da qualidade ${ic('seta')}</a></div>
  <div><span class="instit-ic">${ic('pessoa')}</span><h3>Trabalhe conosco</h3><p>Cadastre seu currículo para as áreas de administração ou obra e faça parte da equipe SBS.</p><a class="link-seta" href="/${v}/trabalhe-conosco/">Cadastrar currículo ${ic('seta')}</a></div>
</div></section>`;

// ---------- páginas ----------
function home(v) {
  const desc = 'SBS Engenharia e Construções: obras rodoviárias, aeroportuárias, viárias, construção civil, energia renovável e locação de equipamentos desde 1982, em Porto Alegre (RS).';
  if (v === 'a') return pagina(v, 'index', '', `${E.nome} · Grandes obras. Grandes realizações.`, desc, `
<section class="hero" data-slider aria-roledescription="carrossel" aria-label="Destaques">
  ${banners.map((b, i) => `<div class="slide${i === 0 ? ' ativo' : ''}" data-slide${i ? ' aria-hidden="true"' : ''}>${foto(b.foto, '', { g: true, lazy: i > 0 })}</div>`).join('')}
  <div class="in hero-in">
    <div class="tarja hero-tarja">
      <div class="tarja-aba">${banners.map((_, i) => `<button type="button" data-ir="${i}" aria-label="Destaque ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}</div>
      ${banners.map((b, i) => `<div class="hero-txt${i === 0 ? ' ativo' : ''}" data-txt>${i === 0 ? '<h1>' : '<p class="h1">'}SBS. <span>${b.tit}</span>${i === 0 ? '</h1>' : '</p>'}<p>${b.txt}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="segs"><div class="in">
  <div class="segs-grade">${segmentos.map(s => `<a class="seg" href="/a/segmentos/#${s.id}"><span class="seg-circ">${icSeg(s.ico)}</span><h2>${s.nome.replace(' ', '<br>')}</h2><p>${s.curto}</p><span class="mais" aria-hidden="true">${ic('mais')}</span></a>`).join('')}</div>
</div></section>

<section class="etapas"><div class="in">
  ${tit(v, 'Do terreno ao asfalto, com equipe e frota próprias', 'Como a SBS executa uma rodovia')}
  <ol class="etapas-lista">${etapas.map((e, i) => `<li><figure>${foto(e.foto, e.n)}</figure><span class="etapa-n">0${i + 1}</span><h3>${e.n}</h3><p>${e.t}</p></li>`).join('')}</ol>
</div></section>

<section class="obras-home"><div class="in">
  <div class="obras-topo">${tit(v, 'Principais obras', 'Do Rio Grande do Sul ao Ceará')}<p>${obrasIntro}</p></div>
  <div class="mosaico">
    ${[0, 5, 4, 2, 10].map((k, i) => { const o = obras[k]; return `<a class="mos${i === 0 ? ' mos-grande' : ''}" href="${linkObra(v, o)}">${foto(`${o.slug}-1`, o.curto, { g: i === 0 })}<span class="mos-leg"><small>${segPor(o.seg).nome} · ${o.uf}</small><b>${o.curto}</b></span></a>`; }).join('')}
  </div>
  <a class="btn btn-claro" href="/a/obras/">Ver todas as obras ${ic('seta')}</a>
</div></section>

<section class="solidez"><div class="in">
  <figure class="solidez-foto">${foto('sede-concepa-terminal-triangulo-1', 'Sede da SBS Engenharia no Jardim do Salso, Porto Alegre')}<figcaption>Sede da SBS, Jardim do Salso, Porto Alegre</figcaption></figure>
  <div class="solidez-txt">
    ${tit(v, 'SBS Engenharia, solidez que inspira confiança.', `Desde ${E.fundacao}`)}
    <p>${I.historia[0]}</p>
    <ul class="numeros">
      <li><b>${E.fundacao}</b><span>ano de fundação</span></li>
      <li><b>457,3 km</b><span>de rodovias conservadas no polo de Pelotas</span></li>
      <li><b>2.200 m</b><span>de pista no aeroporto de Jericoacoara</span></li>
      <li><b>6,7 MW</b><span>na PCH Salto das Flores</span></li>
    </ul>
    <a class="btn" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a>
  </div>
</div></section>

<section class="frota-chamada"><div class="in">
  <div class="fc-txt"><p class="eyebrow">Central de Equipamentos · Capão do Leão</p><h2>Locação de equipamentos</h2><p>${segPor('locacao').curto}</p><a class="btn" href="/a/locacao/">Ver a frota ${ic('seta')}</a></div>
  <figure class="fc-foto"><img src="/assets/img/frota-g.webp" alt="Frota de equipamentos da SBS" width="1504" height="768" loading="lazy" decoding="async"></figure>
</div></section>

${faixaInstitucional(v)}`);

  return pagina(v, 'index', '', `${E.nome} · Grandes obras. Grandes realizações.`, desc, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Engenharia e construção desde ${E.fundacao}</p>
    <h1>Grandes obras.<br>Grandes realizações.</h1>
    <p class="hero-sub">${obrasIntro}</p>
    <div class="botoes"><a class="btn" href="/b/obras/">Ver as obras ${ic('seta')}</a><a class="btn btn-sec" href="/b/contato/">Fale com a SBS</a></div>
  </div>
  <div class="hero-mapa">
    ${mapaObras('mapa-hero', null, '350 20 520 850')}
    <ol class="mapa-lista">${obras.map(o => `<li><a href="${linkObra(v, o)}" data-obra="${o.slug}"><span>${o.uf}</span>${o.curto}</a></li>`).join('')}</ol>
  </div>
</div></section>

<section class="estrada" aria-label="Linha do tempo"><div class="in">
  <p class="eyebrow">Linha do tempo</p>
  <ol class="estrada-marcos">${marcos.map(m => `<li><span class="km">${m.ano}</span><p>${m.t}</p></li>`).join('')}</ol>
</div></section>

<section class="segs"><div class="in">
  ${tit(v, 'Seis frentes de atuação', 'Segmentos')}
  <ol class="segs-lista">${segmentos.map((s, i) => `<li><a href="/b/segmentos/#${s.id}">
    <span class="seg-n">0${i + 1}</span>${icSeg(s.ico)}<h3>${s.nome}</h3><p>${s.curto}</p><span class="seg-seta">${ic('seta')}</span>
    <span class="seg-foto" aria-hidden="true">${fotoSeg(s)}</span></a></li>`).join('')}</ol>
</div></section>

<section class="boletim"><div class="in">
  ${tit(v, 'Boletim de obras', 'Principais obras')}
  <div class="boletim-tabela" role="table" aria-label="Principais obras">
    <div class="bt-cab" role="row"><span role="columnheader">Obra</span><span role="columnheader">Local</span><span role="columnheader">Segmento</span><span role="columnheader">Em números</span></div>
    ${obras.slice(0, 6).map(o => `<a class="bt-linha" role="row" href="${linkObra(v, o)}"><span role="cell" class="bt-obra">${foto(`${o.slug}-1`, '')}<b>${o.curto}</b></span><span role="cell">${o.local}, ${o.uf}</span><span role="cell">${segPor(o.seg).nome}</span><span role="cell" class="bt-dado"><b>${o.dado.n}</b> ${o.dado.t}</span></a>`).join('')}
  </div>
  <a class="link-seta" href="/b/obras/">Todas as ${obras.length} obras ${ic('seta')}</a>
</div></section>

<section class="faixa-foto">${foto('br-392-lote-03-2', 'BR-392 entre Pelotas e Rio Grande', { g: true })}<div class="in"><blockquote>${E.solidez}</blockquote><p>${I.historia[4]}</p></div></section>

<section class="frota-chamada"><div class="in">
  <div class="fc-num"><b>${equipamentos.length}</b><span>tipos de equipamento para locação</span></div>
  <div><h2>Locação de equipamentos</h2><p>${segPor('locacao').texto}</p><a class="btn" href="/b/locacao/">Consultar a frota ${ic('seta')}</a></div>
</div></section>

${faixaInstitucional(v)}`);
}

function empresaPag(v) {
  const valores = v === 'a'
    ? `<ol class="valores">${I.valores.map((x, i) => `<li><span>0${i + 1}</span><h3>${x.n}</h3><p>${x.t}</p></li>`).join('')}</ol>`
    : `<div class="valores" data-abas><div class="valores-abas" role="tablist">${I.valores.map((x, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-aba="${i}"><span>0${i + 1}</span>${x.n}</button>`).join('')}</div>
      ${I.valores.map((x, i) => `<div class="valores-painel" role="tabpanel"${i ? ' hidden' : ''} data-painel="${i}"><h3>${x.n}</h3><p>${x.t}</p></div>`).join('')}</div>`;
  return pagina(v, 'empresa', 'empresa/', `Empresa · ${E.nome}`, 'História, missão, visão, valores, política da qualidade e certificação ISO 9001 da SBS Engenharia e Construções.', `
${capa(v, 'Empresa', 'Saiba mais sobre a SBS.', 'sede-concepa-terminal-triangulo-1', [{ t: 'Empresa' }])}
<section class="historia"><div class="in">
  <div class="historia-txt">${tit(v, 'Solidez que inspira confiança.', `Desde ${E.fundacao}`)}${I.historia.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="historia-foto">${foto('sede-concepa-terminal-triangulo-1', 'Sede da SBS Engenharia')}<figcaption>Sede da SBS no Jardim do Salso, Porto Alegre</figcaption></figure>
</div></section>
<section class="marcos-sec"><div class="in">
  ${tit(v, 'Marcos da trajetória', 'Linha do tempo')}
  <ol class="marcos">${marcos.map(m => `<li><b>${m.ano}</b><p>${m.t}</p></li>`).join('')}</ol>
</div></section>
<section class="mvv"><div class="in">
  <div class="mv"><div><h2>Nossa missão</h2><p>${I.missao}</p></div><div><h2>Nossa visão</h2><p>${I.visao}</p></div></div>
  ${tit(v, 'Nossos valores', 'O que nos orienta')}
  ${valores}
</div></section>
<section class="qualidade" id="qualidade"><div class="in">
  <div>${tit(v, 'Política do Sistema de Gestão da Qualidade', 'ISO 9001')}<p class="destaque">${I.politica}</p>
    <h3>Escopo técnico</h3><p>${I.escopo}</p><h3>Certificação</h3><p>${I.certificacao}</p></div>
  <figure class="certificado"><a href="/assets/img/certificado-iso.webp" data-lightbox><img src="/assets/img/certificado-iso.webp" alt="Certificado de conformidade ISO 9001 da SBS Engenharia" width="480" height="668" loading="lazy"></a><figcaption>Certificado de conformidade ISO 9001</figcaption></figure>
</div></section>
${faixaInstitucional(v)}`);
}

function segmentosPag(v) {
  const rel = s => obras.filter(o => o.seg === s.id);
  const corpo = segmentos.map((s, i) => `<section class="segmento${i % 2 ? ' inv' : ''}" id="${s.id}"><div class="in">
  <figure>${s.foto ? foto(s.foto, s.nome, { g: true }) : `<img src="/assets/img/frota-g.webp" alt="Frota de equipamentos da SBS" width="1504" height="768" loading="lazy" decoding="async">`}</figure>
  <div class="segmento-txt">
    <p class="eyebrow">${v === 'b' ? `0${i + 1} · ` : ''}Segmento</p>
    <h2>${v === 'a' ? `<span class="seg-circ">${icSeg(s.ico)}</span>` : icSeg(s.ico)}${s.nome}</h2>
    <p>${s.texto}</p>
    <p class="rot">${s.clientesRot}</p><ul class="chips">${s.clientes.map(c => `<li>${c}</li>`).join('')}</ul>
    ${rel(s).length ? `<p class="rot">Obras deste segmento</p><ul class="seg-obras">${rel(s).map(o => `<li><a href="${linkObra(v, o)}">${o.curto} ${ic('seta')}</a></li>`).join('')}</ul>` : ''}
    ${s.id === 'locacao' ? `<a class="btn" href="/${v}/locacao/">Ver a frota ${ic('seta')}</a>` : ''}
  </div>
</div></section>`).join('');
  const indice = `<nav class="seg-indice" aria-label="Segmentos"><div class="in">${segmentos.map((s, i) => `<a href="#${s.id}">${icSeg(s.ico)}<span>${v === 'b' ? `0${i + 1} ` : ''}${s.nome}</span></a>`).join('')}</div></nav>`;
  return pagina(v, 'segmentos', 'segmentos/', `Segmentos · ${E.nome}`, 'Obras aeroportuárias, rodoviárias, viárias, construção civil, energia renovável e locação de equipamentos.', `
${capa(v, 'Segmentos', 'A SBS está presente em diversas áreas de atuação. Conheça nosso portfólio.', 'aeroporto-jericoacoara-5', [{ t: 'Segmentos' }])}
${indice}
${corpo}`);
}

function obrasPag(v) {
  const lista = v === 'a'
    ? `<section class="obras-grade-sec"><div class="in"><p class="intro">${obrasIntro}</p>
      <div class="filtros" data-filtros><button type="button" aria-pressed="true" data-f="">Todas</button>${[...new Set(obras.map(o => o.seg))].map(id => `<button type="button" aria-pressed="false" data-f="${id}">${segPor(id).nome}</button>`).join('')}</div>
      <div class="obras-grade">${obras.map(o => `<a class="obra-item" data-seg="${o.seg}" href="${linkObra(v, o)}"><figure>${foto(`${o.slug}-1`, o.curto)}<span class="obra-qtd">${o.fotos} foto${o.fotos > 1 ? 's' : ''}</span></figure><div><small>${segPor(o.seg).nome} · ${o.local}, ${o.uf}</small><h2>${o.curto}</h2><p>${o.texto[0].slice(0, 140).replace(/\s\S*$/, '')}…</p></div></a>`).join('')}</div>
    </div></section>`
    : `<section class="obras-mapa"><div class="in">
      <div class="om-mapa">${mapaObras('mapa-obras', null, '350 20 520 850')}<p class="intro">${obrasIntro}</p></div>
      <ol class="obras-lista">${obras.map((o, i) => `<li><a href="${linkObra(v, o)}" data-obra="${o.slug}"><span class="ol-n">${String(i + 1).padStart(2, '0')}</span>${foto(`${o.slug}-1`, '')}<span class="ol-txt"><small>${segPor(o.seg).nome} · ${o.local}, ${o.uf}</small><b>${o.curto}</b></span><span class="ol-dado"><b>${o.dado.n}</b>${o.dado.t}</span></a></li>`).join('')}</ol>
    </div></section>`;
  return pagina(v, 'obras', 'obras/', `Principais obras · ${E.nome}`, 'Obras da SBS: BR-116, BR-392, BR-290 Freeway, RS-377, Ecosul, Ecovia, Aeroporto de Jericoacoara, PCH Salto das Flores e mais.', `
${capa(v, 'Principais obras', 'Saiba mais sobre os projetos executados pela SBS.', 'br-392-lote-03-1', [{ t: 'Principais obras' }])}
${lista}`);
}

function obraPag(v, o, i) {
  const ant = obras[(i + obras.length - 1) % obras.length], prox = obras[(i + 1) % obras.length];
  const s = segPor(o.seg);
  return pagina(v, 'obra', `obras/${o.slug}/`, `${o.curto} · ${E.nome}`, o.texto[0].slice(0, 155), `
${capa(v, o.titulo, null, v === 'a' ? `${o.slug}-1` : null, [{ t: 'Principais obras', url: `/${v}/obras/` }, { t: o.curto }])}
<section class="obra"><div class="in">
  ${galeria(o)}
  <aside class="ficha">
    <p class="ficha-dado"><b>${o.dado.n}</b><span>${o.dado.t}</span></p>
    <dl><div><dt>Segmento</dt><dd><a href="/${v}/segmentos/#${s.id}">${s.nome}</a></dd></div><div><dt>Local</dt><dd>${o.local}, ${o.uf}</dd></div></dl>
    ${v === 'b' ? mapaObras('mapa-ficha', [o.slug]) : ''}
  </aside>
  <div class="obra-txt">${o.texto.map(p => `<p>${p}</p>`).join('')}</div>
</div></section>
<nav class="obra-nav" aria-label="Outras obras"><div class="in">
  <a href="${linkObra(v, ant)}">${ic('voltar')}<span><small>Obra anterior</small>${ant.curto}</span></a>
  <a href="/${v}/obras/" class="obra-nav-todas">Todas as obras</a>
  <a href="${linkObra(v, prox)}"><span><small>Próxima obra</small>${prox.curto}</span>${ic('seta')}</a>
</div></nav>`);
}

function locacaoPag(v) {
  const grupos = gruposFrota.map(g => ({ n: g.n, itens: equipamentos.filter(g.f) }));
  const lista = v === 'a'
    ? `<div class="frota-grupos">${grupos.map(g => `<div><h3>${g.n}</h3><ul>${g.itens.map(e => `<li>${e}</li>`).join('')}</ul></div>`).join('')}</div>`
    : `<div class="frota-busca"><label>${ic('busca')}<input type="search" placeholder="Buscar equipamento (ex.: rolo, caminhão, usina)" data-busca aria-label="Buscar equipamento"></label><span data-conta>${equipamentos.length} equipamentos</span></div>
      <ol class="frota-lista" data-lista>${equipamentos.map((e, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${e}</li>`).join('')}</ol>`;
  return pagina(v, 'locacao', 'locacao/', `Locação de equipamentos · ${E.nome}`, 'Locação de equipamentos rodoviários e de terraplenagem da SBS Engenharia, com plano de manutenção regular. Central de Equipamentos em Capão do Leão (RS).', `
${capa(v, 'Locação de equipamentos', 'Saiba mais sobre os equipamentos disponíveis.', null, [{ t: 'Locação' }])}
<section class="locacao"><div class="in">
  <div class="loc-txt">
    <p class="destaque">A SBS Engenharia oferece ao mercado que necessita de soluções rápidas a locação de sua extensa e qualificada frota de equipamentos.</p>
    <p>${segPor('locacao').texto}</p>
    <div class="loc-contato"><p><b>Central de Equipamentos · Capão do Leão, RS</b><br>Peça um orçamento pelos telefones:</p>
      <p class="u-fones">${E.locacaoFones.map(f => `<a class="btn${f === E.locacaoFones[0] ? '' : ' btn-sec'}" href="tel:${f.h}">${ic('tel')} ${f.t}</a>`).join('')}</p></div>
  </div>
  <figure class="loc-foto"><img src="/assets/img/frota-g.webp" alt="Frota de equipamentos da SBS na Central de Equipamentos" width="1504" height="768" loading="lazy" decoding="async"></figure>
</div></section>
<section class="frota"><div class="in">
  ${tit(v, 'Consulte a disponibilidade', 'Frota')}
  ${lista}
</div></section>`);
}

function condutaPag(v) {
  return pagina(v, 'conduta', 'conduta/', `Conduta · ${E.nome}`, 'Código de Conduta, Programa de Compliance e canal confidencial de relato da SBS Engenharia.', `
${capa(v, 'Conduta', 'Conheça o Código de Conduta da SBS Engenharia.', null, [{ t: 'Conduta' }])}
<section class="conduta"><div class="in">
  <div class="conduta-txt">
    ${tit(v, 'Objetivo do Código de Conduta da SBS Engenharia', 'Compliance')}
    <p>${I.compliance}</p><p>${I.codigo}</p><p>${I.eficacia}</p>
    <p class="conduta-docs"><a class="btn" href="${E.cartilha}"${fora}>${ic('doc')} Código de Conduta (PDF)</a><a class="btn btn-sec" href="${E.igualdade}"${fora}>${ic('doc')} Relatório da Lei da Igualdade Salarial</a></p>
  </div>
  <aside class="relato">
    <span class="instit-ic">${ic('escudo')}</span>
    <h2>Envie seu relato de violação do Código de Conduta</h2>
    <p>Todo relato será tratado com confidencialidade pelo Comitê de Conduta da SBS Engenharia.</p>
    <a class="btn btn-claro" href="${E.denuncia}"${fora}>Fazer um relato ${ic('fora')}</a>
    <small>O canal é operado pela BeCompliance, fora deste site.</small>
  </aside>
</div></section>`);
}

function trabalhePag(v) {
  return pagina(v, 'trabalhe', 'trabalhe-conosco/', `Trabalhe conosco · ${E.nome}`, 'Cadastre seu currículo na SBS Engenharia para vagas de administração ou obra.', `
${capa(v, 'Trabalhe conosco', 'Para cadastrar-se, preencha os campos conforme solicitado.', 'br-116-1', [{ t: 'Trabalhe conosco' }])}
<section class="trabalhe"><div class="in">
  <div class="trab-txt">${tit(v, 'Faça parte da equipe SBS', 'Valorização das pessoas')}<p>${I.valores[0].t}</p></div>
  <form class="form" data-form>
    <fieldset class="largo"><legend>Para qual área se candidata</legend><div class="opcoes"><label><input type="radio" name="area" value="Administração" required> Administração</label><label><input type="radio" name="area" value="Obra"> Obra</label></div></fieldset>
    <label><span>Nome completo</span><input name="nome" autocomplete="name" required></label>
    <label><span>Data de nascimento</span><input name="nascimento" type="date"></label>
    <label><span>E-mail</span><input name="email" type="email" autocomplete="email" required></label>
    <label><span>Celular</span><input name="celular" type="tel" autocomplete="tel" required></label>
    <label><span>Cidade/UF</span><input name="cidade" autocomplete="address-level2"></label>
    <label><span>Grau de instrução</span><select name="instrucao"><option>1º grau completo</option><option>2º grau completo</option><option>Nível superior</option></select></label>
    <label class="largo"><span>Cursos realizados</span><textarea name="cursos" rows="3" placeholder="Nome do curso, entidade e ano"></textarea></label>
    <label class="largo"><span>Experiência profissional</span><textarea name="experiencia" rows="5" placeholder="Empresa, cargo, período e um resumo das atividades"></textarea></label>
    <label><span>Pretensão salarial</span><input name="pretensao"></label>
    <label><span>Currículo (PDF, opcional)</span><input name="curriculo" type="file" accept=".pdf,.doc,.docx"></label>
    <div class="largo form-fim"><button type="submit" class="btn">Enviar cadastro ${ic('seta')}</button><p class="form-aviso" role="status" hidden>Esta é uma prévia do site: o cadastro não foi enviado. No site publicado ele chega ao setor de Recursos Humanos.</p></div>
  </form>
</div></section>`);
}

function contatoPag(v) {
  return pagina(v, 'contato', 'contato/', `Contato · ${E.nome}`, 'Fale com a SBS Engenharia: escritório central em Porto Alegre e Central de Equipamentos em Capão do Leão (RS).', `
${capa(v, 'Contato', 'A SBS está esperando o seu contato.', null, [{ t: 'Contato' }])}
<section class="contato"><div class="in">
  ${unidadesHtml()}
  <div class="contato-form">${tit(v, 'Envie suas dúvidas e sugestões para a SBS Engenharia', 'Mensagem')}<p>Teremos muito prazer em responder sua mensagem o mais rápido possível.</p>${formContato()}</div>
</div></section>`);
}

export function gerarVersao(v) {
  const p = {
    index: home(v), empresa: empresaPag(v), segmentos: segmentosPag(v), obras: obrasPag(v), locacao: locacaoPag(v),
    conduta: condutaPag(v), 'trabalhe-conosco': trabalhePag(v), contato: contatoPag(v),
  };
  obras.forEach((o, i) => { p[`obras/${o.slug}`] = obraPag(v, o, i); });
  return p;
}

// Mapa base (estados) usado como imagem por baixo dos pinos.
export function mapaSvg() {
  const destaque = ['RS', 'SC', 'PR', 'CE'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 875"><g fill="#E3E9EF" stroke="#fff" stroke-width="1.6" stroke-linejoin="round">${Object.entries(mapa.estados).map(([k, d]) => `<path${destaque.includes(k) ? ' fill="#B9CFE4"' : ''} d="${d}"/>`).join('')}</g></svg>`;
}
