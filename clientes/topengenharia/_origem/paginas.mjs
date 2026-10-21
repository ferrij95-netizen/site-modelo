// Monta as páginas das versões A ("Canteiro": fiel ao site atual, faixa cinza com o logo em aba branca, carrossel de obras
// com as laterais aparecendo e os três blocos A TOP / Resp. Ambiental / Qualidade) e B ("Trecho": títulos condensados como o
// "ENGENHARIA" do logo, quilometragem das obras, mapa dos estados e obras em ficha técnica). Estilos em public/assets/{base,a,b}.css.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, textos as T, segmentos, obras, destaques, clientes, kmTotal, ufs } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const fotos = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const mapa = JSON.parse(fs.readFileSync(path.join(aqui, 'mapa.json'), 'utf8'));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fora = ' target="_blank" rel="noopener"';
const num = n => n.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

export const nomesVersao = { a: 'Canteiro', b: 'Trecho' };

const segDe = s => segmentos.find(x => x.slug === s);
const obrasDo = s => obras.filter(o => o.seg === s);
const fotoObra = (o, i = 0) => fotos[o.slug][i] || fotos[o.slug][0];
const quando = o => o.periodo || (o.inicio ? `Início em ${o.inicio}` : '');
const ufNome = { BA: 'Bahia', SE: 'Sergipe', CE: 'Ceará', PI: 'Piauí', MT: 'Mato Grosso' };

const img = (f, alt = '', { cls = '', lazy = true, sizes } = {}) => {
  const [n, w, h] = Array.isArray(f) ? f : [f, 630, 380];
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ''} decoding="async"${sizes ? ` sizes="${sizes}"` : ''}>`;
};
const fotoPorNome = n => { for (const l of Object.values(fotos)) { const f = l.find(x => x[0] === n); if (f) return f; } return [n, 630, 380]; };

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  volta: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  fora: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
  esq: '<path d="M15 5l-7 7 7 7"/>',
  dir: '<path d="M9 5l7 7-7 7"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  folha: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  cadeado: '<rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  capacete: '<path d="M3 17h18M5 17v-3a7 7 0 0114 0v3"/><path d="M10 7.5V5h4v2.5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// ---------- navegação ----------
const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A empresa', caminho: 'empresa/', sub: [
    { slug: 'empresa', nome: 'A empresa', caminho: 'empresa/' },
    { slug: 'qualidade', nome: 'Qualidade e segurança', caminho: 'qualidade/' },
    { slug: 'responsabilidade-ambiental', nome: 'Responsabilidade ambiental', caminho: 'responsabilidade-ambiental/' },
  ] },
  { slug: 'obras', nome: 'Obras', caminho: 'obras/', sub: [{ slug: 'obras', nome: 'Todas as obras', caminho: 'obras/' }, ...segmentos.map(s => ({ slug: s.slug, nome: s.nome, caminho: `obras/${s.slug}/` }))] },
  { slug: 'clientes', nome: 'Clientes', caminho: 'clientes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const grupoDe = sl => nav.find(n => n.slug === sl || n.sub?.some(s => s.slug === sl))?.slug;

function menu(v, atual) {
  const g = grupoDe(atual);
  return nav.map(n => n.sub
    ? `<div class="m-item tem-sub"><a href="/${v}/${n.caminho}"${g === n.slug ? ' aria-current="page"' : ''}>${n.nome}</a><button class="m-abre" type="button" aria-expanded="false" aria-label="Abrir ${n.nome}">${ic('baixo')}</button>
      <div class="m-sub">${n.sub.map(s => `<a href="/${v}/${s.caminho}"${s.slug === atual ? ' aria-current="page"' : ''}>${s.nome}</a>`).join('')}</div></div>`
    : `<div class="m-item"><a href="/${v}/${n.caminho}"${g === n.slug ? ' aria-current="page"' : ''}>${n.nome}</a></div>`).join('');
}

function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=Archivo:wdth,wght@75..100,500..900&family=Inter:wght@400;500;600'
    : 'family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600';
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
<meta property="og:site_name" content="${E.completo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#ED1C24">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const logo = (cls = 'marca-img') => `<img class="${cls}" src="/assets/logo.svg" alt="TOP Engenharia" width="128" height="157">`;

function topo(v, atual) {
  const colab = `<div class="colab"><button type="button" class="colab-btn" aria-expanded="false">${ic('cadeado')} Colaborador ${ic('baixo')}</button><div class="colab-lista">${E.colaborador.map(c => `<a href="${c.url}"${fora}>${c.nome}</a>`).join('')}</div></div>`;
  if (v === 'a') return `<div class="faixa"><div class="in">
  <a href="tel:${E.tel.h}">${ic('tel')} ${E.tel.t}</a>
  <a class="so-pc" href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
  <span class="faixa-dir"><a href="/a/canal-de-denuncias/">${ic('escudo')} Canal de denúncias</a>${colab}</span>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="TOP Engenharia, página inicial">${logo()}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-den" href="/a/canal-de-denuncias/">Canal de denúncias</a></nav>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="TOP Engenharia, página inicial">${logo()}<span class="marca-txt"><b>Construção pesada</b><span>Salvador · BA · desde ${E.fundacao}</span></span></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-den" href="/b/canal-de-denuncias/">Canal de denúncias</a></nav>
  <a class="topo-tel" href="tel:${E.tel.h}">${ic('tel')}<span>${E.tel.t}</span></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  const cta = v === 'a'
    ? `<section class="cta"><div class="in"><div><h2>Vamos conversar sobre a sua obra?</h2><p>Atendimento a órgãos públicos e empresas privadas em todo o Brasil, a partir de Salvador.</p></div><div class="cta-acoes"><a class="btn btn-claro" href="/a/contato/">Enviar mensagem ${ic('seta')}</a><a class="cta-tel" href="tel:${E.tel.h}">${ic('tel')} ${E.tel.t}</a></div></div></section>`
    : `<section class="cta"><div class="in"><p class="cta-km">km ${num(Math.round(kmTotal))}+</p><div><h2>Próximo trecho</h2><p>Fale com a TOP Engenharia sobre terraplenagem, pavimentação, saneamento, barragens, aeroportos e obras de arte especiais.</p></div><a class="btn" href="/b/contato/">Falar com a TOP ${ic('seta')}</a></div></section>`;
  return `${cta}
<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="TOP Engenharia" width="96" height="118"><p>${E.completo}<br>Construção pesada desde ${E.fundacao}.</p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}"${fora}>${ic('pin')} Ver no mapa</a></div>
  <div><h3>Contato</h3><p><a href="tel:${E.tel.h}">Tel. ${E.tel.t}</a><br>Fax ${E.fax}<br><a href="mailto:${E.email}">${E.email}</a></p><p class="rod-den"><a href="/${v}/canal-de-denuncias/">${ic('escudo')} Canal de denúncias</a><br><a href="mailto:${E.denuncia}">${E.denuncia}</a></p></div>
  <nav aria-label="Obras"><h3>Obras</h3>${segmentos.map(s => `<a href="/${v}/obras/${s.slug}/">${s.nome}</a>`).join('')}</nav>
  <nav aria-label="Colaborador"><h3>Colaborador</h3>${E.colaborador.map(c => `<a href="${c.url}"${fora}>${c.nome}</a>`).join('')}</nav>
</div><p class="rod-fim">© ${E.completo} · Salvador, Bahia · ISO 9001 · Qualiop Nível A</p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl.split('/')[0]}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// Cabeçalho das páginas internas. A: faixa cinza em degradê como o topo do site atual. B: título condensado com marco de km.
const migalhas = (v, trilha) => `<nav class="migalhas" aria-label="Você está em"><a href="/${v}/">Início</a>${trilha.map(([n, c]) => c ? ` / <a href="/${v}/${c}">${n}</a>` : ` / <span>${n}</span>`).join('')}</nav>`;
const capa = (v, { eyebrow, titulo, sub, trilha = [], foto, marco }) => v === 'a'
  ? `<section class="capa${foto ? ' capa-foto' : ''}"><div class="in"><div class="capa-txt">${migalhas(v, trilha)}<p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div>${foto ? `<figure class="capa-fig">${img(foto, '', { lazy: false })}</figure>` : ''}</div></section>`
  : `<section class="capa${foto ? ' capa-foto' : ''}"><div class="in"><div class="capa-txt">${migalhas(v, trilha)}<p class="eyebrow">${marco ? `<span class="marco">${marco}</span>` : ''}${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div>${foto ? `<figure class="capa-fig">${img(foto, '', { lazy: false })}</figure>` : ''}</div></section>`;

// ---------- blocos comuns ----------
const linkObra = (v, o) => `/${v}/obras/${o.slug}/`;

function mapaSvg(v, cls = 'mapa-br') {
  const cont = Object.fromEntries(ufs.map(u => [u, obras.filter(o => o.uf === u).length]));
  const paths = Object.entries(mapa.uf).map(([u, x]) => `<path class="${cont[u] ? 'uf on' : 'uf'}" d="${x.d}"><title>${cont[u] ? `${ufNome[u]}: ${cont[u]} ${cont[u] > 1 ? 'obras' : 'obra'}` : u}</title></path>`).join('');
  const marcas = ufs.map(u => { const [x, y] = mapa.uf[u].c; return `<g class="uf-marca" transform="translate(${x} ${y})"><circle r="${10 + cont[u] * 1.3}"/><text dy="5">${cont[u]}</text></g>`; }).join('');
  return `<svg class="${cls}" viewBox="0 0 ${mapa.w} ${mapa.h}" role="img" aria-label="Mapa do Brasil com os estados das obras: ${ufs.map(u => `${ufNome[u]} (${cont[u]})`).join(', ')}">${paths}${marcas}</svg>`;
}

const fichaLinhas = o => [
  ['Obra', esc(o.desc)],
  ...(o.trechos ? [[o.seg === 'pontes' ? 'Locais' : o.slug === 'rdm-bahia' ? 'Serviços' : 'Trecho', `<ul>${o.trechos.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`]] : []),
  ...(o.km ? [['Extensão', `${num(o.km)} km`]] : []),
  ...(quando(o) ? [['Período', esc(quando(o))]] : []),
  ['Local', `${esc(o.local)}`],
  ['Cliente', esc(o.cliente)],
];

function galeria(o) {
  const l = fotos[o.slug];
  return `<div class="gal" data-gal>
  <figure class="gal-grande">${img(l[0], o.titulo, { lazy: false })}<figcaption><span data-gal-n>1</span> / ${l.length}</figcaption></figure>
  ${l.length > 1 ? `<div class="gal-mini">${l.map((f, i) => `<button type="button" data-gal-i="${i}" data-src="/assets/img/${f[0]}"${i === 0 ? ' aria-current="true"' : ''} aria-label="Foto ${i + 1}">${img(f, '')}</button>`).join('')}</div>` : ''}
</div>`;
}

function formContato(v) {
  return `<form class="form" data-mailto="${E.email}">
  <div class="f-linha"><label><span>Assunto</span><select name="assunto"><option>Contato</option><option>Currículo</option><option>Proposta / orçamento</option></select></label>
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label></div>
  <div class="f-linha"><label><span>E-mail</span><input type="email" name="email" required autocomplete="email"></label>
  <label><span>Telefone</span><input name="telefone" autocomplete="tel"></label></div>
  <label><span>Mensagem</span><textarea name="mensagem" rows="5" required></textarea></label>
  <p class="f-nota">Para enviar currículo, escolha "Currículo" no assunto e anexe o PDF (até 2 MB) no e-mail que vai abrir.</p>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
</form>`;
}

// ---------- páginas ----------
function homeA() {
  const v = 'a';
  return pagina(v, 'index', '', `${E.nome} · Construção pesada desde ${E.fundacao}`, `${T.resumo} Terraplenagem, pavimentação, saneamento, barragens, aeroportos e obras de arte especiais. Salvador, Bahia.`, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Construção pesada · desde ${E.fundacao}</p>
    <h1>Solidez, tradição e credibilidade em obras de infraestrutura.</h1>
    <p class="hero-sub">${T.resumo}</p>
    <div class="hero-acoes"><a class="btn" href="/a/obras/">Conheça as obras ${ic('seta')}</a><a class="btn btn-linha" href="/a/empresa/">A empresa</a></div>
  </div>
  <div class="carrossel" data-carrossel>
    <div class="car-trilho">${[destaques.at(-1), ...destaques.slice(0, -1)].map((d, i) => { const o = obras.find(x => x.slug === d.obra); return `<a class="car-slide" href="${linkObra(v, o)}">${img([d.img, 630, 380], d.legenda, { lazy: i > 2 })}<span class="car-leg">${esc(d.legenda)}</span></a>`; }).join('')}</div>
    <button class="car-btn car-ant" type="button" aria-label="Obra anterior">${ic('esq')}</button><button class="car-btn car-prox" type="button" aria-label="Próxima obra">${ic('dir')}</button>
  </div>
</div></section>

<section class="tres"><div class="in">
  ${[
    { t: 'A TOP', d: T.resumo, f: fotoObra(obras.find(o => o.slug === 'crema-br-242'), 1), c: 'empresa/' },
    { t: 'Resp. Ambiental', d: T.ambientalCurto, f: fotoObra(obras.find(o => o.slug === 'barragem-barra-do-choca'), 3), c: 'responsabilidade-ambiental/' },
    { t: 'Qualidade', d: T.qualidadeCurto, f: fotoObra(obras.find(o => o.slug === 'aeroporto-cariri'), 2), c: 'qualidade/' },
  ].map((b, i) => `<article class="tres-item"><a href="/a/${b.c}" class="tres-foto">${img(b.f, '')}<span class="tres-n">0${i + 1}</span></a><h2>${b.t}</h2><p>${b.d}</p><a class="link-seta" href="/a/${b.c}">Leia mais ${ic('seta')}</a></article>`).join('')}
</div></section>

<section class="numeros"><div class="in">
  <div class="num"><b>${E.fundacao}</b><span>ano de fundação, em Salvador</span></div>
  <div class="num"><b>${obras.length}</b><span>obras de referência no portfólio</span></div>
  <div class="num"><b>${num(Math.round(kmTotal))} km</b><span>de rodovias nas obras listadas</span></div>
  <div class="num"><b>${ufs.length}</b><span>estados: ${ufs.map(u => ufNome[u]).join(', ').replace(/, ([^,]+)$/, ' e $1')}</span></div>
</div></section>

<section class="segs"><div class="in">
  <div class="tit"><p class="eyebrow">Obras</p><h2>Seis frentes da construção pesada</h2><p>${T.atuacao.join(' · ')}.</p></div>
  <div class="segs-grade">${segmentos.map(s => { const n = obrasDo(s.slug).length; return `<a class="seg seg-${s.slug}" href="/a/obras/${s.slug}/">${img(fotoPorNome(s.capa), '')}<span class="seg-txt"><b>${s.nome}</b><span>${n} ${n > 1 ? 'obras' : 'obra'} ${ic('seta')}</span></span></a>`; }).join('')}</div>
</div></section>

<section class="cert"><div class="in">
  <div class="cert-txt"><p class="eyebrow">Certificações</p><h2>Métodos padronizados, certificados por obra.</h2><p>${T.empresa[2]}</p><a class="link-seta" href="/a/qualidade/">Qualidade e segurança ${ic('seta')}</a></div>
  <ul class="cert-selos">${T.certificacoes.map(c => `<li>${ic('escudo')}<b>${c.t}</b><span>${c.d}</span></li>`).join('')}</ul>
</div></section>

<section class="logos"><div class="in">
  <div class="tit tit-linha"><h2>Principais clientes</h2><a class="link-seta" href="/a/clientes/">Ver todos ${ic('seta')}</a></div>
  <ul class="logos-faixa">${clientes.filter(c => c.logo).map(c => `<li><img src="/assets/img/clientes/${c.logo}.webp" alt="${esc(c.sigla)}" loading="lazy"></li>`).join('')}</ul>
</div></section>`);
}

function homeB() {
  const v = 'b';
  const rod = obras.filter(o => o.km).sort((a, b) => b.km - a.km);
  const max = rod[0].km;
  return pagina(v, 'index', '', `${E.nome} · Terraplenagem, pavimentação e obras de infraestrutura`, `${T.resumo} ${num(Math.round(kmTotal))} km de rodovias, barragens, saneamento, portos, aeroportos e pontes. Salvador, Bahia.`, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow"><span class="marco">km 0</span>Salvador · BA · ${E.fundacao}</p>
    <h1>Terraplenagem, pavimentação, saneamento, barragens, aeroportos e obras de arte especiais.</h1>
    <p class="hero-sub">${T.empresa[0].split('. ').slice(0, 2).join('. ')}.</p>
    <div class="hero-acoes"><a class="btn" href="/b/obras/">Ver as ${obras.length} obras ${ic('seta')}</a><a class="btn btn-linha" href="/b/contato/">Contato</a></div>
  </div>
  <figure class="hero-foto">${img(fotoObra(obras.find(o => o.slug === 'br-101-se'), 1), 'Trevo da BR-101/SE executado pela TOP Engenharia', { lazy: false })}<figcaption>BR-101/SE · adequação rodoviária, km 77,3 – km 91,6</figcaption></figure>
</div>
<div class="hodometro"><div class="in">
  <div><b data-conta>${num(Math.round(kmTotal))}</b><span>km de rodovias<br>nas obras listadas</span></div>
  <div><b>${new Date().getFullYear() - E.fundacao}</b><span>anos de<br>construção pesada</span></div>
  <div><b>${ufs.length}</b><span>estados com<br>obras no portfólio</span></div>
  <div><b>2</b><span>certificações:<br>ISO 9001 e Qualiop A</span></div>
</div></div></section>

<section class="km"><div class="in">
  <div class="tit"><p class="eyebrow"><span class="marco">01</span>Rodovias</p><h2>Quilômetros executados, obra por obra</h2><p>Extensão informada em cada contrato rodoviário do portfólio, do CREMA na BR-242 à ligação de N. S. do Socorro.</p></div>
  <ol class="km-lista">${rod.map(o => `<li><a href="${linkObra(v, o)}"><span class="km-nome"><b>${esc(o.local)}</b>${esc(o.titulo)}</span><span class="km-barra"><i style="--p:${(o.km / max * 100).toFixed(1)}%"></i></span><span class="km-n">${num(o.km)} km</span></a></li>`).join('')}</ol>
</div></section>

<section class="mapa"><div class="in">
  <div class="mapa-txt"><p class="eyebrow"><span class="marco">02</span>Onde atuamos</p><h2>De Salvador para ${ufs.length} estados</h2><p>A TOP Engenharia atua em diversos estados do Brasil. As obras do portfólio estão na Bahia, em Sergipe, no Ceará, no Piauí e em Mato Grosso.</p>
  <ul class="mapa-leg">${ufs.map(u => `<li><b>${obras.filter(o => o.uf === u).length}</b>${ufNome[u]}</li>`).join('')}</ul></div>
  ${mapaSvg(v)}
</div></section>

<section class="segs"><div class="in">
  <div class="tit"><p class="eyebrow"><span class="marco">03</span>Segmentos</p><h2>Seis frentes de obra</h2></div>
  <div class="segs-lista">${segmentos.map((s, i) => { const l = obrasDo(s.slug); return `<a class="seg" href="/b/obras/${s.slug}/"><span class="seg-n">${String(i + 1).padStart(2, '0')}</span><b>${s.nome}</b><span class="seg-lst">${l.slice(0, 2).map(o => esc(o.titulo)).join(' · ')}${l.length > 2 ? ` · +${l.length - 2}` : ''}</span><span class="seg-cont">${l.length}</span>${img(fotoPorNome(s.capa), '', { cls: 'seg-img' })}</a>`; }).join('')}</div>
</div></section>

<section class="seg-trab"><div class="in">
  <div class="tit"><p class="eyebrow"><span class="marco">04</span>Segurança do trabalho</p><h2>Do levantamento de riscos ao índice zero</h2><p>${T.seguranca[0].split('. ').slice(0, 1)}.</p></div>
  <ol class="etapas">${T.etapasSeguranca.map((e, i) => `<li><span class="et-n">${i + 1}</span><b>${e.t}</b><p>${e.d}</p></li>`).join('')}</ol>
  <a class="link-seta" href="/b/qualidade/">Política de qualidade e segurança ${ic('seta')}</a>
</div></section>

<section class="clis"><div class="in">
  <div class="tit tit-linha"><h2>Clientes</h2><a class="link-seta" href="/b/clientes/">Lista completa ${ic('seta')}</a></div>
  <ul class="siglas">${clientes.slice(0, 12).map(c => `<li><b>${esc(c.sigla)}</b><span>${esc(c.nome)}</span></li>`).join('')}</ul>
</div></section>`);
}

function empresaPag(v) {
  const principais = ['barragem-pedras-altas', 'barragem-barra-do-choca', 'esgotamento-feira-de-santana'].map(s => obras.find(o => o.slug === s));
  return pagina(v, 'empresa', 'empresa/', `A empresa · ${E.completo}`, T.empresa[0], `
${capa(v, { eyebrow: 'A empresa', titulo: v === 'a' ? 'Sinônimo de solidez, tradição e credibilidade.' : 'Solidez, tradição e credibilidade desde 1977', sub: T.resumo, trilha: [['A empresa']], foto: v === 'a' ? fotoObra(obras.find(o => o.slug === 'vias-elevadas-feira-de-santana'), 3) : fotoObra(obras.find(o => o.slug === 'crema-br-242'), 1), marco: '1977' })}
<section class="emp"><div class="in">
  <div class="emp-txt">${T.empresa.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="emp-lado">
    <p class="emp-ano"><b>${E.fundacao}</b><span>Fundação</span></p>
    <h2>Atuação</h2><ul class="emp-tags">${T.atuacao.map(a => `<li>${a}</li>`).join('')}</ul>
  </aside>
</div></section>
<section class="estrut"><div class="in">
  ${T.estrutura.map((e, i) => `<div class="estrut-item"><span>${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.d}</p></div>`).join('')}
  ${T.certificacoes.map(c => `<div class="estrut-item estrut-cert">${ic('escudo')}<h3>${c.t}</h3><p>${c.d}</p></div>`).join('')}
</div></section>
<section class="principais"><div class="in">
  <div class="tit tit-linha"><h2>Principais obras</h2><a class="link-seta" href="/${v}/obras/">Todas as obras ${ic('seta')}</a></div>
  <div class="prin-grade">${principais.map(o => `<a class="prin" href="${linkObra(v, o)}">${img(fotoObra(o), '')}<span class="tag">${segDe(o.seg).nome}</span><b>${esc(o.desc)}</b><small>Cliente: ${esc(o.cliente)}</small></a>`).join('')}</div>
</div></section>
<section class="sub-links"><div class="in">
  <a href="/${v}/qualidade/">${ic('capacete', 'ic-g')}<span><b>Qualidade e segurança</b>Política de qualidade, objetivos e segurança do trabalho</span>${ic('seta')}</a>
  <a href="/${v}/responsabilidade-ambiental/">${ic('folha', 'ic-g')}<span><b>Responsabilidade ambiental</b>As ações da TOP pelo desenvolvimento sustentável</span>${ic('seta')}</a>
</div></section>`);
}

function qualidadePag(v) {
  return pagina(v, 'qualidade', 'qualidade/', `Qualidade e segurança · ${E.completo}`, T.qualidadeCurto, `
${capa(v, { eyebrow: 'A empresa · Política de qualidade', titulo: 'Qualidade e segurança do trabalho', sub: T.qualidadeCurto, trilha: [['A empresa', 'empresa/'], ['Qualidade e segurança']], foto: fotoObra(obras.find(o => o.slug === 'rdm-bahia'), 3), marco: 'ISO 9001' })}
<section class="pol"><div class="in">
  <div class="pol-txt"><h2>Política de qualidade</h2><p>${T.qualidade}</p></div>
  <div class="pol-obj"><h3>É nosso objetivo</h3><ol>${T.objetivos.map(o => `<li>${o.replace(/;$/, '.').replace(/\.$/, '')}</li>`).join('')}</ol></div>
</div></section>
<section class="seg-trab"><div class="in">
  <div class="tit"><p class="eyebrow">${v === 'b' ? '<span class="marco">SST</span>' : ''}Segurança do trabalho</p><h2>Todos os acidentes podem ser evitados</h2></div>
  <div class="seg-txt">${T.seguranca.map(p => `<p>${p}</p>`).join('')}</div>
  <h3 class="etapas-tit">Pontos que a empresa julga importantes, na ordem da obra</h3>
  <ol class="etapas">${T.etapasSeguranca.map((e, i) => `<li><span class="et-n">${i + 1}</span><b>${e.t}</b><p>${e.d}</p></li>`).join('')}</ol>
</div></section>`);
}

function ambientalPag(v) {
  return pagina(v, 'responsabilidade-ambiental', 'responsabilidade-ambiental/', `Responsabilidade ambiental · ${E.completo}`, T.ambientalCurto, `
${capa(v, { eyebrow: 'A empresa · Responsabilidade ambiental', titulo: 'Crescimento ajustado à proteção do meio ambiente', sub: T.ambientalCurto, trilha: [['A empresa', 'empresa/'], ['Responsabilidade ambiental']], foto: fotoObra(obras.find(o => o.slug === 'barragem-barra-do-choca'), 3), marco: 'Meio ambiente' })}
<section class="amb"><div class="in">
  <div class="amb-txt">${T.ambiental.map(p => `<p>${p}</p>`).join('')}</div>
  <ol class="amb-lista">${T.acoesAmbientais.map((a, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${a}</li>`).join('')}</ol>
</div></section>`);
}

function cartaoObra(v, o) {
  return `<a class="obra" href="${linkObra(v, o)}" data-seg="${o.seg}">${img(fotoObra(o), '')}<span class="obra-txt"><span class="tag">${segDe(o.seg).nome} · ${o.uf}</span><b>${esc(o.titulo)}</b><small>${esc(o.cliente.split(' – ')[0])}${quando(o) ? ` · ${esc(quando(o).replace(/ \(previsto\)/, ''))}` : ''}</small></span></a>`;
}

function obrasPag(v) {
  const filtro = `<div class="filtro" role="group" aria-label="Filtrar por segmento"><a class="on" href="/${v}/obras/" data-filtro="">Todas <span>${obras.length}</span></a>${segmentos.map(s => `<a href="/${v}/obras/${s.slug}/" data-filtro="${s.slug}">${s.nome} <span>${obrasDo(s.slug).length}</span></a>`).join('')}</div>`;
  const corpo = v === 'a'
    ? `<section class="obras"><div class="in">${filtro}<div class="obras-grade" data-lista>${obras.map(o => cartaoObra(v, o)).join('')}</div></div></section>`
    : `<section class="obras"><div class="in">${filtro}
  <div class="tabela" data-lista><div class="tb-cab" aria-hidden="true"><span>Obra</span><span>Segmento</span><span>UF</span><span>Extensão</span><span>Cliente</span></div>
  ${obras.map(o => `<a class="tb-linha" href="${linkObra(v, o)}" data-seg="${o.seg}">${img(fotoObra(o), '', { cls: 'tb-img' })}<span class="tb-obra"><b>${esc(o.titulo)}</b><small>${esc(quando(o))}</small></span><span class="tb-seg">${segDe(o.seg).nome}</span><span class="tb-uf">${o.uf}</span><span class="tb-km">${o.km ? `${num(o.km)} km` : '–'}</span><span class="tb-cli">${esc(o.cliente.split(' – ')[0])}</span></a>`).join('')}</div>
  <div class="obras-mapa">${mapaSvg(v)}<ul class="mapa-leg">${ufs.map(u => `<li><b>${obras.filter(o => o.uf === u).length}</b>${ufNome[u]}</li>`).join('')}</ul></div>
</div></section>`;
  return pagina(v, 'obras', 'obras/', `Obras · ${E.completo}`, `${obras.length} obras de referência da TOP Engenharia: rodovias, saneamento, barragens, portos, aeroportos, pontes e viadutos na Bahia, Sergipe, Ceará, Piauí e Mato Grosso.`, `
${capa(v, { eyebrow: 'Obras', titulo: v === 'a' ? 'Obras de referência' : `${obras.length} obras, ${ufs.length} estados`, sub: `Rodovias, saneamento, barragens, portos, aeroportos, pontes e viadutos para órgãos públicos e empresas como DNIT, DERBA, EMBASA, CERB, CODEBA e Vale.`, trilha: [['Obras']], marco: `${num(Math.round(kmTotal))} km` })}
${corpo}`);
}

function segPag(v, s) {
  const l = obrasDo(s.slug);
  const corpo = v === 'a'
    ? `<section class="seg-obras"><div class="in">${l.map((o, i) => `<article class="linha-obra${i % 2 ? ' inv' : ''}"><a class="lo-foto" href="${linkObra(v, o)}">${img(fotoObra(o), o.titulo)}</a><div class="lo-txt"><span class="tag">${o.local}</span><h2><a href="${linkObra(v, o)}">${esc(o.titulo)}</a></h2><p>${esc(o.desc)}</p><p class="lo-cli">Cliente: ${esc(o.cliente)}</p><a class="link-seta" href="${linkObra(v, o)}">Detalhes da obra ${ic('seta')}</a></div></article>`).join('')}</div></section>`
    : `<section class="seg-obras"><div class="in"><div class="fichas">${l.map((o, i) => `<a class="ficha-c" href="${linkObra(v, o)}"><span class="fc-n">${String(i + 1).padStart(2, '0')}</span>${img(fotoObra(o), '')}<b>${esc(o.titulo)}</b><dl><div><dt>Local</dt><dd>${esc(o.local)}</dd></div>${o.km ? `<div><dt>Extensão</dt><dd>${num(o.km)} km</dd></div>` : ''}${quando(o) ? `<div><dt>Período</dt><dd>${esc(quando(o))}</dd></div>` : ''}<div><dt>Cliente</dt><dd>${esc(o.cliente.split(' – ')[0])}</dd></div></dl></a>`).join('')}</div></div></section>`;
  const outros = `<section class="outros-segs"><div class="in"><h2>Outros segmentos</h2><div class="os-lista">${segmentos.filter(x => x !== s).map(x => `<a href="/${v}/obras/${x.slug}/">${img(fotoPorNome(x.capa), '')}<b>${x.nome}</b></a>`).join('')}</div></div></section>`;
  return pagina(v, `obras/${s.slug}`, `obras/${s.slug}/`, `${s.nome} · Obras · ${E.completo}`, `Obras de ${s.nome.toLowerCase()} da TOP Engenharia: ${l.map(o => o.titulo).join('; ')}.`, `
${capa(v, { eyebrow: 'Obras', titulo: s.nome, sub: `${l.length} ${l.length > 1 ? 'obras' : 'obra'}: ${l.map(o => o.titulo).join(' · ')}.`, trilha: [['Obras', 'obras/'], [s.nome]], foto: fotoPorNome(s.capa), marco: `${l.length} ${l.length > 1 ? 'obras' : 'obra'}` })}
${corpo}
${outros}`);
}

function obraPag(v, o) {
  const s = segDe(o.seg);
  const i = obras.indexOf(o);
  const ant = obras[(i - 1 + obras.length) % obras.length], prox = obras[(i + 1) % obras.length];
  const mesmas = obrasDo(o.seg).filter(x => x !== o).slice(0, 3);
  return pagina(v, `obras/${o.slug}`, `obras/${o.slug}/`, `${o.titulo} · ${s.nome} · ${E.completo}`, `${o.desc} Cliente: ${o.cliente}.`, `
<section class="obra-cab"><div class="in">
  ${migalhas(v, [['Obras', 'obras/'], [s.nome, `obras/${s.slug}/`], [o.titulo]])}
  <p class="eyebrow">${v === 'b' && o.km ? `<span class="marco">${num(o.km)} km</span>` : ''}${s.nome} · ${esc(o.local)}</p>
  <h1>${esc(o.titulo)}</h1>
</div></section>
<section class="obra-corpo"><div class="in">
  ${galeria(o)}
  <div class="ficha"><h2>${v === 'a' ? 'Sobre a obra' : 'Ficha técnica'}</h2><dl>${fichaLinhas(o).map(([k, d]) => `<div><dt>${k}</dt><dd>${d}</dd></div>`).join('')}</dl>
  <a class="btn" href="/${v}/contato/">Fale com a TOP ${ic('seta')}</a></div>
</div></section>
<nav class="obra-nav" aria-label="Outras obras"><div class="in">
  <a href="${linkObra(v, ant)}">${ic('volta')}<span><small>Obra anterior</small>${esc(ant.titulo)}</span></a>
  <a href="${linkObra(v, prox)}" class="prox"><span><small>Próxima obra</small>${esc(prox.titulo)}</span>${ic('seta')}</a>
</div></nav>
${mesmas.length ? `<section class="mesmas"><div class="in"><div class="tit tit-linha"><h2>Mais obras de ${s.nome.toLowerCase()}</h2><a class="link-seta" href="/${v}/obras/${s.slug}/">Ver todas ${ic('seta')}</a></div><div class="obras-grade">${mesmas.map(x => cartaoObra(v, x)).join('')}</div></div></section>` : ''}`);
}

function clientesPag(v) {
  return pagina(v, 'clientes', 'clientes/', `Clientes · ${E.completo}`, `Principais clientes da TOP Engenharia: ${clientes.map(c => c.sigla).join(', ')}.`, `
${capa(v, { eyebrow: 'Clientes', titulo: 'Principais clientes', sub: 'Órgãos federais, estaduais e municipais, companhias de saneamento e grandes empresas que confiaram obras à TOP Engenharia.', trilha: [['Clientes']], marco: `${clientes.length}` })}
<section class="cli"><div class="in">
  <ul class="cli-grade">${clientes.filter(c => c.logo).map(c => `<li><span class="cli-logo"><img src="/assets/img/clientes/${c.logo}.webp" alt="" loading="lazy"></span><b>${esc(c.sigla)}</b><span>${esc(c.nome)}</span></li>`).join('')}</ul>
  <h2 class="cli-sub">Também atendemos</h2>
  <ul class="siglas">${clientes.filter(c => !c.logo).map(c => `<li><b>${esc(c.sigla)}</b><span>${esc(c.nome)}</span></li>`).join('')}</ul>
</div></section>`);
}

function contatoPag(v) {
  return pagina(v, 'contato', 'contato/', `Contato · ${E.completo}`, `Fale com a TOP Engenharia: ${E.tel.t}, ${E.email}. ${E.endereco.join(', ')}.`, `
${capa(v, { eyebrow: 'Contato', titulo: 'Envie sua mensagem', sub: 'Propostas, dúvidas ou currículos. Responderemos pelo e-mail informado.', trilha: [['Contato']], marco: 'Salvador' })}
<section class="contato"><div class="in">
  <div class="contato-form">${formContato(v)}</div>
  <div class="contato-lado">
    <ul class="contato-linhas">
      <li>${ic('tel')}<span><small>Telefone</small><a href="tel:${E.tel.h}">${E.tel.t}</a><br>Fax ${E.fax}</span></li>
      <li>${ic('mail')}<span><small>E-mail</small><a href="mailto:${E.email}">${E.email}</a></span></li>
      <li>${ic('pin')}<span><small>Onde estamos</small>${E.endereco.join('<br>')}</span></li>
      <li>${ic('escudo')}<span><small>Denúncias</small><a href="/${v}/canal-de-denuncias/">Canal de denúncias</a> · <a href="mailto:${E.denuncia}">${E.denuncia}</a></span></li>
    </ul>
    <div class="mapa-emb"><iframe src="${E.mapaEmbed}" title="Mapa: TOP Engenharia, Rua do Zaire, Salvador" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</div></section>`);
}

function denunciaPag(v) {
  return pagina(v, 'canal-de-denuncias', 'canal-de-denuncias/', `Canal de denúncias · ${E.completo}`, 'Canal de denúncias da TOP Engenharia: seguro e confidencial, com opção de denúncia anônima.', `
${capa(v, { eyebrow: 'Canal de denúncias', titulo: 'Sua denúncia é importante', sub: T.denuncia.join(' '), trilha: [['Canal de denúncias']], marco: 'Sigilo' })}
<section class="den"><div class="in">
  <div class="den-passos">
    <div><span>1</span><h2>Escolha como denunciar</h2><p>Você pode se identificar ou fazer a denúncia de forma anônima, sem nome nem e-mail.</p></div>
    <div><span>2</span><h2>Descreva o ocorrido</h2><p>Tipos de denúncia: ${T.tiposDenuncia.join(', ').toLowerCase()}. Se quiser, anexe um arquivo (PDF, JPG, PNG ou GIF, até 5 MB).</p></div>
    <div><span>3</span><h2>Tratamento confidencial</h2><p>Todas as denúncias são tratadas com seriedade e confidencialidade.</p></div>
  </div>
  <div class="den-acoes">
    <a class="btn" href="${E.formDenuncia}"${fora}>${ic('cadeado')} Abrir o formulário de denúncia</a>
    <p>Ou escreva para <a href="mailto:${E.denuncia}">${E.denuncia}</a>.</p>
  </div>
</div></section>`);
}

export function gerarVersao(v) {
  const p = {
    index: v === 'a' ? homeA() : homeB(),
    empresa: empresaPag(v), qualidade: qualidadePag(v), 'responsabilidade-ambiental': ambientalPag(v),
    obras: obrasPag(v), clientes: clientesPag(v), contato: contatoPag(v), 'canal-de-denuncias': denunciaPag(v),
  };
  for (const s of segmentos) p[`obras/${s.slug}`] = segPag(v, s);
  for (const o of obras) p[`obras/${o.slug}`] = obraPag(v, o);
  return p;
}
