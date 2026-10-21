// Monta as páginas das versões A ("Tradição", na ordem e com as faixas escuras do site atual) e B ("Do silo ao cocho", mais
// industrial, organizada pelas etapas do trato). Mesmo conteúdo nas duas, em pt (/v/) e es (/v/es/). Estilos em public/assets/{base,a,b}.css.
import { E, T, dados, tr, grupos, resumo, linhaRodoviario, avaliacoes, depoimentosHome } from './conteudo.mjs';

export const nomesVersao = { a: 'Tradição', b: 'Do silo ao cocho' };
const LANGS = ['pt', 'es'];
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const base = (v, l) => `/${v}/${l === 'es' ? 'es/' : ''}`;
const P = dados.produtos;
const prod = s => P.find(p => p.slug === s);
const linha = (p, l) => (p.slug === 'prohmix-rodoviario' ? linhaRodoviario[l] : tr(p.linha, l));
const grupoDe = s => grupos.find(g => g.slugs.includes(s));
const wa = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
const MESES = { Janeiro: 'enero', Fevereiro: 'febrero', Março: 'marzo', Abril: 'abril', Maio: 'mayo', Junho: 'junio', Julho: 'julio', Agosto: 'agosto', Setembro: 'septiembre', Outubro: 'octubre', Novembro: 'noviembre', Dezembro: 'diciembre' };
const data = (d, l) => (l === 'es' ? d.replace(/[A-ZÇa-zç]+(?= de \d{4})/, m => MESES[m] ?? m) : d);
const limpa = s => String(s).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

const I = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  play: '<path d="M8 5l11 7-11 7z" fill="currentColor" stroke="none"/>',
  doc: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  estrela: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z" fill="currentColor" stroke="none"/>',
  zap: '<path d="M20.5 3.5A11 11 0 003.4 17.3L2 22l4.8-1.3A11 11 0 0020.5 3.5zM12 20a8 8 0 01-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5 0a6.5 6.5 0 01-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.7-1.2 2.2 2.2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z" fill="currentColor" stroke="none"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const redeIc = {
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  Facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" stroke="none"/>',
  LinkedIn: '<path d="M4 9h4v11H4zM6 3a2 2 0 110 4 2 2 0 010-4zM10 9h4v1.6c.6-1 1.9-1.9 3.6-1.9 3.4 0 4.4 2 4.4 5.2V20h-4v-5.4c0-1.5-.3-2.8-1.9-2.8s-2.1 1.2-2.1 2.8V20h-4z" fill="currentColor" stroke="none"/>',
  YouTube: '<path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 001.6 12 31 31 0 002 15.8a3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-3.8 31 31 0 00-.4-3.8zM10 15V9l5.2 3z" fill="currentColor" stroke="none"/>',
};
const redes = () => `<span class="redes">${E.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nome}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${redeIc[r.nome]}</svg></a>`).join('')}</span>`;
// Bandeiras como no site atual (Brasil e Espanha), desenhadas em SVG.
const bandeira = {
  pt: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#229e45"/><path d="M14 3l10 7-10 7L4 10z" fill="#f8e509"/><circle cx="14" cy="10" r="4" fill="#2b49a3"/><path d="M10.2 9.2a8 8 0 017.7 1.6" stroke="#fff" stroke-width=".8" fill="none"/></svg>',
  es: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#c60b1e"/><rect y="5" width="28" height="10" fill="#ffc400"/></svg>',
};
const idiomas = (v, l, caminho) => `<span class="idiomas">${LANGS.map(x => `<a href="${base(v, x)}${caminho}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="true"' : ''} title="${x === 'pt' ? 'Português' : 'Español'}">${bandeira[x]}<span>${x.toUpperCase()}</span></a>`).join('')}</span>`;
const logo = (v, l, claro) => `<a class="marca" href="${base(v, l)}" aria-label="HaramaQ"><img src="/assets/logo-${claro ? 'claro' : 'cor'}.svg" alt="HaramaQ" width="863" height="171"></a>`;
const listras = '<span class="listras" aria-hidden="true"><i></i><i></i><i></i></span>';

// ---------- moldura ----------
function head(v, l, caminho, titulo, desc) {
  const url = `${E.url}${v}/${l === 'es' ? 'es/' : ''}${caminho}`;
  const alt = x => `${E.url}${v}/${x === 'es' ? 'es/' : ''}${caminho}`;
  return `<!doctype html>
<html lang="${T[l].lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
${LANGS.map(x => `<link rel="alternate" hreflang="${x === 'pt' ? 'pt-BR' : 'es'}" href="${alt(x)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${alt('pt')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="HaramaQ">
<meta property="og:locale" content="${T[l].og}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1e1d23">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">${l === 'es' ? 'Ir al contenido' : 'Pular para o conteúdo'}</a>
`;
}

function menuItens(v, l, ativa) {
  const t = T[l].nav; const b = base(v, l);
  const a = (slug, nome, href = `${b}${slug}/`) => `<a href="${href}"${ativa === slug ? ' aria-current="page"' : ''}>${nome}</a>`;
  const sub = `<div class="sub${ativa === 'produtos' ? ' ativo' : ''}"><button type="button" aria-expanded="false">${t.produtos}${ic('baixo', 'ic-s')}</button><div class="sub-menu">
    ${grupos.map(g => `<div class="sub-grupo"><small>${g[l].nome}</small>${g.slugs.map(s => `<a href="${b}produtos/${s}/">${prod(s).nome}</a>`).join('')}</div>`).join('')}
    <a class="sub-todos" href="${b}produtos/">${t.todos} ${ic('seta', 'ic-s')}</a></div></div>`;
  return [a('empresa', t.empresa), sub, a('pos-venda', t.posvenda), a('videos', t.videos), a('blog', t.blog), `<a href="${E.catalogo}" target="_blank" rel="noopener">${t.catalogo}</a>`, a('contato', t.contato)].join('');
}

function cabecalho(v, l, ativa, caminho) {
  const t = T[l]; const b = base(v, l);
  if (v === 'a') return `<div class="faixa-topo"><div class="in">
  <span>${t.local}</span>
  <span class="faixa-dir">${redes()}<a class="btn-trabalhe" href="${b}contato/#trabalhe">${t.nav.trabalhe}</a>${idiomas(v, l, caminho)}</span>
</div></div>
<div class="cab-info"><div class="in">
  ${logo(v, l)}
  <a class="info" href="mailto:${E.email}"><span class="info-ic">${ic('mail')}</span><span><small>E-mail</small>${E.email}</span></a>
  <a class="info" href="tel:${E.telHref}"><span class="info-ic">${ic('tel')}</span><span><small>${l === 'es' ? 'Teléfono' : 'Telefone'}</small>${E.tel}</span></a>
  <a class="info" href="${E.mapaLink}" target="_blank" rel="noopener"><span class="info-ic">${ic('pin')}</span><span><small>${l === 'es' ? 'Dirección' : 'Endereço'}</small>${E.endereco}</span></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu">${ic('menu')}<b class="sr">Menu</b></button>
</div></div>
<header class="topo"><div class="in">
  <a class="casa${ativa === 'index' ? ' ativo' : ''}" href="${b}" aria-label="${t.nav.inicio}">${ic('casa')}</a>
  <nav id="menu" class="menu" aria-label="Menu">${menuItens(v, l, ativa)}<span class="menu-extra">${idiomas(v, l, caminho)}</span></nav>
  <a class="btn btn-verm topo-cta" href="${b}contato/">${t.orcamento}</a>
</div></header>
<main id="conteudo">
`;
  return `<header class="topo"><div class="in">
  ${logo(v, l)}
  <nav id="menu" class="menu" aria-label="Menu">${menuItens(v, l, ativa)}<span class="menu-extra">${redes()}</span></nav>
  <span class="topo-dir">${idiomas(v, l, caminho)}<a class="btn btn-verm topo-cta" href="${wa(E.wa, l === 'es' ? '¡Hola, HaramaQ! Quiero un presupuesto.' : 'Olá, HaramaQ! Quero um orçamento.')}" target="_blank" rel="noopener">${ic('zap', 'ic-s')}${t.orcamento}</a></span>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu">${ic('menu')}<b class="sr">Menu</b></button>
</div></header>
<main id="conteudo">
`;
}

function rodape(v, l) {
  const t = T[l]; const b = base(v, l);
  const nav = [[t.nav.empresa, `${b}empresa/`], [t.nav.produtos, `${b}produtos/`], [t.nav.posvenda, `${b}pos-venda/`], [t.nav.videos, `${b}videos/`], [t.nav.blog, `${b}blog/`], [t.nav.contato, `${b}contato/`], [t.nav.trabalhe, `${b}contato/#trabalhe`]];
  return `</main>
<footer class="rodape"><div class="in rodape-grid">
  <div class="rodape-marca">${logo(v, l, true)}<p class="slogan">${listras}${t.slogan}</p>${redes()}</div>
  <div><h3>${t.industria}</h3><p>${t.rodape}</p></div>
  <div><h3>${t.links}</h3><ul>${nav.map(([n, h]) => `<li><a href="${h}">${n}</a></li>`).join('')}</ul></div>
  <div><h3>${t.contato}</h3><ul class="rodape-contato">
    <li>${ic('tel', 'ic-s')}<a href="tel:${E.telHref}">${E.telOp} ${E.tel}</a></li>
    <li>${ic('tel', 'ic-s')}<a href="tel:${E.posvendaHref}">${E.posvendaOp} ${E.posvenda}</a></li>
    <li>${ic('mail', 'ic-s')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin', 'ic-s')}<span>${E.endereco}</span></li>
  </ul></div>
</div>
<div class="rodape-base"><div class="in"><span>© ${new Date().getFullYear()} HaramaQ. ${t.direitos}</span><span>${t.preview} <a href="${E.antigo}" target="_blank" rel="noopener">haramaq.com.br</a></span></div></div>
</footer>
<a class="whats-flutua" href="${wa(E.wa, l === 'es' ? '¡Hola, HaramaQ!' : 'Olá, HaramaQ!')}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic('zap')}</a>
<script src="/assets/haramaq.js" defer></script>
</body>
</html>
`;
}

const pagina = (v, l, ativa, caminho, titulo, desc, corpo) => head(v, l, caminho, titulo, desc) + cabecalho(v, l, ativa, caminho) + corpo + rodape(v, l);

// Topo das páginas internas. A: faixa com foto escurecida e título (como as faixas do site atual). B: título grande no branco, faixa vermelha.
function topoPagina(v, l, { titulo, texto, foto = 'pasto', trilha = [] }) {
  const t = T[l];
  const mig = `<nav class="migalha" aria-label="Breadcrumb"><a href="${base(v, l)}">${t.nav.inicio}</a>${trilha.map(([n, h]) => `<span>/</span>${h ? `<a href="${h}">${n}</a>` : `<span aria-current="page">${n}</span>`}`).join('')}</nav>`;
  if (v === 'a') return `<section class="ph" style="--foto:url('/assets/img/${foto}.webp')"><div class="in">${mig}<h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div></section>`;
  return `<section class="ph"><div class="in">${mig}<div class="ph-linha"><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div></div>${listras}</section>`;
}

const tituloSecao = (eyebrow, titulo, extra = '') => `<div class="cab${extra}"><p class="eyebrow"><span class="traco"></span>${eyebrow}</p><h2>${titulo}</h2></div>`;
const video = (id, titulo, cls = '') => `<button type="button" class="video${cls}" data-yt="${id}" aria-label="${esc(titulo)}">${img('v-' + id, titulo)}<span class="play">${ic('play')}</span></button>`;
const faq = l => `<div class="faq">${T[l].faq.map(([q, r], i) => `<details${i === 0 ? ' open' : ''}><summary><span class="n">${String(i + 1).padStart(2, '0')}</span>${q}<span class="mais">${ic('mais', 'ic-s')}</span></summary><p>${r}</p></details>`).join('')}</div>`;
const estrelas = () => `<span class="estrelas" aria-label="5/5">${ic('estrela', 'ic-s').repeat(5)}</span>`;
const avals = l => `<div class="avals" data-rolar>${avaliacoes.map(a => `<figure class="aval"><figcaption><span class="ini">${a.nome[0]}</span><b>${a.nome}</b><span class="g">G</span></figcaption>${estrelas()}<blockquote lang="pt">${a.txt}</blockquote></figure>`).join('')}</div>`;
const numeros = l => { const t = T[l]; return [[`${E.anos}`, t.anos], [`${E.revendas}+`, t.revendas], [`${grupos.length}`, t.modelos], ['3', t.pesagem]]; };

// ---------- homes ----------
function homeA(l) {
  const t = T[l]; const bb = base('a', l);
  const slides = [['hero-confinamento', l === 'es' ? 'Carro mezclador HaramaQ alimentando un feedlot' : 'Vagão misturador HaramaQ tratando confinamento'], ['hero-leite', l === 'es' ? 'Prohmix alimentando vacas lecheras en el galpón' : 'Prohmix tratando vacas de leite no free stall'], ['hero-rodoviario', l === 'es' ? 'Prohmix Rodoviário sobre camión' : 'Prohmix Rodoviário montado no caminhão']];
  return `<section class="hero" data-slider>
  ${slides.map(([f, alt], i) => `<figure class="slide${i === 0 ? ' ativo' : ''}"><img src="/assets/img/${f}.webp" alt="${esc(alt)}"${i ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async"></figure>`).join('')}
  <div class="in hero-txt">
    <p class="eyebrow"><span class="traco"></span>${l === 'es' ? 'Carros mezcladores' : 'Vagões misturadores'}</p>
    <h1>${t.lema}</h1>
    <p class="lead">${t.heroTxt}</p>
    <div class="botoes"><a class="btn btn-verm" href="${bb}produtos/">${t.verMaquinas}</a><a class="btn btn-claro" href="${wa(E.wa, l === 'es' ? '¡Hola, HaramaQ! Quiero un presupuesto.' : 'Olá, HaramaQ! Quero um orçamento.')}" target="_blank" rel="noopener">${ic('zap', 'ic-s')}${t.whats}</a></div>
  </div>
  <div class="pontos" role="tablist">${slides.map((_, i) => `<button type="button" aria-label="${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}</div>
</section>

<section class="secao intro"><div class="in intro-grid">
  <div><p class="eyebrow"><span class="traco"></span>${l === 'es' ? 'Carros mezcladores' : 'Vagões misturadores'}</p><h2 class="grande">HaramaQ</h2><a class="btn btn-escuro" href="${bb}empresa/">${t.saibaMais}</a></div>
  <div class="intro-txt">${t.intro.map(p => `<p>${p}</p>`).join('')}</div>
  <div class="intro-num"><div class="num-anos"><span class="quadro">${listras}</span><b>${E.anos}</b><span>${t.anos}</span></div><div class="num-rev"><b>${E.revendas}+</b><span>${t.revendas}</span></div></div>
</div></section>

<section class="secao cinza"><div class="in">
  <h2 class="titulo-centro">${t.avaliacoes}</h2>
  <div class="aval-grid"><div class="aval-nota"><b>${t.excelente}</b>${estrelas()}<span class="google">Google</span><small>${t.googleNota}</small></div>${avals(l)}</div>
</div></section>

<section class="cta-foto" style="--foto:url('/assets/img/entardecer.webp')"><div class="in"><div class="cta-box">
  <h2>${t.ctaTit}</h2><p>${t.ctaTxt}</p><a class="btn btn-verm" href="${bb}contato/">${t.entreContato}</a>
</div></div></section>

<section class="secao"><div class="in">
  ${tituloSecao(t.maquinario, l === 'es' ? 'Productos <span>destacados</span>' : 'Produtos em <span>destaque</span>', ' centro')}
  <div class="circulos">${P.map(p => `<a class="circulo" href="${bb}produtos/${p.slug}/"><span class="disco">${img('p-' + p.slug, p.nome)}</span><small>${grupoDe(p.slug)[l].nome}</small><b>${p.nome}</b></a>`).join('')}</div>
</div></section>

<section class="secao cinza"><div class="in">
  <h2 class="titulo-centro">${t.depoimentos}</h2>
  <div class="depo-grid">${depoimentosHome.map(d => `<figure class="depo">${video(d.id, d[l])}<figcaption>${d[l]}</figcaption></figure>`).join('')}</div>
</div></section>

<section class="secao"><div class="in">
  ${tituloSecao(t.faqSub, t.faqTit)}
  ${faq(l)}
</div></section>`;
}

function homeB(l) {
  const t = T[l]; const b = base('b', l);
  return `<section class="hero"><div class="hero-foto">${img('hero-rodoviario', l === 'es' ? 'Prohmix Rodoviário sobre camión en un feedlot' : 'Prohmix Rodoviário em confinamento', ' fetchpriority="high" loading="eager"')}</div>
  <div class="in"><div class="hero-painel">
    <p class="eyebrow claro">${listras}${t.slogan}</p>
    <h1>${t.heroTit}</h1>
    <p class="lead">${t.heroTxt}</p>
    <div class="botoes"><a class="btn btn-branco" href="${b}produtos/">${t.verMaquinas} ${ic('seta', 'ic-s')}</a><a class="btn btn-contorno" href="${wa(E.wa, l === 'es' ? '¡Hola, HaramaQ! Quiero un presupuesto.' : 'Olá, HaramaQ! Quero um orçamento.')}" target="_blank" rel="noopener">${ic('zap', 'ic-s')}${t.whats}</a></div>
  </div></div>
</section>
<section class="numeros"><div class="in">${numeros(l).map(([n, s]) => `<div><b data-conta>${n}</b><span>${s}</span></div>`).join('')}</div></section>

<section class="secao linhas"><div class="in">
  ${tituloSecao(t.linhaCompleta, l === 'es' ? 'Una máquina para cada <span>sistema</span>' : 'Uma máquina para cada <span>sistema</span>')}
  <div class="abas" role="tablist">${grupos.map((g, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-controls="g-${g.id}" id="t-${g.id}"><b>${g[l].nome}</b><small>${g[l].curto}</small></button>`).join('')}</div>
  ${grupos.map((g, i) => `<div class="aba-painel" role="tabpanel" id="g-${g.id}" aria-labelledby="t-${g.id}"${i ? ' hidden' : ''}>
    <p class="uso">${g[l].uso}</p>
    <div class="vitrine n${g.slugs.length}">${g.slugs.map(s => { const p = prod(s); return `<a class="maq" href="${b}produtos/${s}/"><span class="palco">${img('p-' + s, p.nome)}</span><b>${p.nome}</b><span>${resumo[s][l]}</span><span class="mais">${l === 'es' ? 'Ver máquina' : 'Ver máquina'} ${ic('seta', 'ic-s')}</span></a>`; }).join('')}</div>
  </div>`).join('')}
</div></section>

<section class="secao escura passos-sec"><div class="in">
  ${tituloSecao(t.passosSub, t.passosTit)}
  <ol class="passos">${t.passos.map((p, i) => `<li><a href="${b}produtos/${p.slug}/"><span class="foto">${img(p.foto, p.t)}</span><span class="num">${String(i + 1).padStart(2, '0')}</span><b>${p.t}</b><span>${p.txt}</span></a></li>`).join('')}</ol>
</div></section>

<section class="fabrica"><div class="fabrica-foto">${img('fabrica', l === 'es' ? 'Planta industrial de HaramaQ en Sertão (RS)' : 'Parque fabril da HaramaQ em Sertão (RS)')}</div><div class="in"><div class="fabrica-box">
  <p class="eyebrow"><span class="traco"></span>${t.nav.empresa}</p><h2>${t.empresaTit}</h2><p>${t.historia[0]}</p><p>${t.historia[3]}</p>
  <a class="link-seta" href="${b}empresa/">${l === 'es' ? 'Nuestra historia' : 'Nossa história'} ${ic('seta', 'ic-s')}</a>
</div></div></section>

<section class="secao"><div class="in depo-b">
  <div class="depo-video">${tituloSecao(t.depoimentos, l === 'es' ? 'Quien usa, <span>lo cuenta</span>' : 'Quem usa, <span>conta</span>')}${video(depoimentosHome[0].id, depoimentosHome[0][l], ' grande')}<div class="depo-mini">${depoimentosHome.slice(1).map(d => `<figure>${video(d.id, d[l])}<figcaption>${d[l]}</figcaption></figure>`).join('')}</div></div>
  <aside class="depo-google"><div class="aval-nota"><b>${t.excelente}</b>${estrelas()}<span class="google">Google</span></div>${avaliacoes.slice(0, 4).map(a => `<blockquote lang="pt"><p>“${a.txt}”</p><cite>${a.nome}</cite></blockquote>`).join('')}<small>${t.googleNota}</small></aside>
</div></section>

<section class="secao cinza"><div class="in faq-b">
  <div>${tituloSecao(t.faqSub, t.faqTit)}<div class="faq-cta"><p>${t.ctaTxt}</p><a class="btn btn-verm" href="${b}contato/">${t.entreContato}</a><a class="tel" href="tel:${E.telHref}">${ic('tel', 'ic-s')}${E.tel}</a></div></div>
  ${faq(l)}
</div></section>
${ctaFaixa('b', l)}`;
}

const ctaFaixa = (v, l) => { const t = T[l]; return `<section class="cta-faixa"><div class="in">${listras}<div><h2>${t.ctaTit}</h2><p>${t.ctaTxt}</p></div><div class="botoes"><a class="btn btn-branco" href="${base(v, l)}contato/">${t.entreContato}</a><a class="btn btn-contorno" href="tel:${E.telHref}">${ic('tel', 'ic-s')}${E.tel}</a></div></div></section>`; };

// ---------- páginas internas ----------
function empresa(v, l) {
  const t = T[l];
  return topoPagina(v, l, { titulo: t.nav.empresa, foto: 'fabrica', trilha: [[t.nav.empresa]] }) + `
<section class="secao"><div class="in hist">
  <div class="hist-txt">${tituloSecao('HaramaQ', t.empresaTit)}${t.historia.map(p => `<p>${p}</p>`).join('')}<p class="fecho">${t.fecho}</p></div>
  <figure class="hist-selo">${img('selo-20anos', 'HaramaQ, evolução sem limites')}</figure>
</div></section>
<section class="secao cinza"><div class="in mvv">${t.mvv.map(m => `<div class="mvv-item"><h3>${listras}${m.t}</h3>${m.txt ? `<p>${m.txt}</p>` : `<ul>${m.lista.map(x => `<li>${ic('check', 'ic-s')}${x}</li>`).join('')}</ul>`}</div>`).join('')}</div></section>
<section class="campo"><div class="campo-foto">${img('campo-aereo', t.emCampo)}</div><div class="in campo-grid">
  <h2>${t.emCampo}</h2>
  <div><h3>${t.eficiencia}</h3><p>${t.eficienciaTxt}</p></div>
  <div><h3>${t.inovacao}</h3><p>${t.inovacaoTxt}</p></div>
</div></section>
<section class="secao"><div class="in numeros-linha">${numeros(l).map(([n, s]) => `<div><b>${n}</b><span>${s}</span></div>`).join('')}</div></section>
<section class="secao cinza"><div class="in video-inst">${video('V2VVrqPaY5s', tr(dados.videos[0].t, l), ' grande')}<div><h2>${tr(dados.videos[0].t, l)}</h2><p>${t.intro[0]}</p><a class="btn btn-verm" href="${base(v, l)}videos/">${t.nav.videos}</a></div></div></section>
${ctaFaixa(v, l)}`;
}

function produtos(v, l) {
  const t = T[l]; const b = base(v, l);
  return topoPagina(v, l, { titulo: t.nav.produtos, texto: t.heroTxt, foto: 'produtos-topo', trilha: [[t.nav.produtos]] }) + `
<nav class="ancoras"><div class="in">${grupos.map(g => `<a href="#${g.id}">${g[l].nome}</a>`).join('')}<a class="cat" href="${E.catalogo}" target="_blank" rel="noopener">${ic('doc', 'ic-s')}${t.nav.catalogo}</a></div></nav>
${grupos.map((g, i) => `<section class="secao grupo${i % 2 ? ' cinza' : ''}" id="${g.id}"><div class="in">
  <div class="grupo-cab"><p class="eyebrow"><span class="traco"></span>${g[l].curto}</p><h2>${g[l].nome}</h2><p>${g[l].uso}</p></div>
  <div class="lista-maq n${g.slugs.length}">${g.slugs.map(s => { const p = prod(s); return `<a class="maq" href="${b}produtos/${s}/"><span class="palco">${img('p-' + s, p.nome)}</span><span class="maq-txt"><small>${linha(p, l)}</small><b>${p.nome}</b><span>${resumo[s][l]}</span><span class="mais">${l === 'es' ? 'Ver máquina' : 'Ver máquina'} ${ic('seta', 'ic-s')}</span></span></a>`; }).join('')}</div>
</div></section>`).join('')}
${ctaFaixa(v, l)}`;
}

function produto(v, l, p) {
  const t = T[l]; const b = base(v, l);
  const g = grupoDe(p.slug);
  const msg = t.pedirMaquina(p.nome);
  const blocos = [...p.spec, ...p.opc].map((x, i) => ({ ...x, n: i }));
  const spec = blocos.slice(0, p.spec.length); const opc = blocos.slice(p.spec.length);
  const item = x => `<article class="item">${x.img ? `<figure>${img(`f-${p.slug}-${x.n}`, tr(x.t, l))}</figure>` : ''}<div><h3>${tr(x.t, l)}</h3>${x.txt.filter(s => s !== x.t).map(s => `<p>${tr(s, l)}</p>`).join('')}</div></article>`;
  const nomeV = p.nome.toLowerCase().replace(/[^a-z0-9]/g, '');
  const vids = dados.videos.filter(x => { const n = x.t.toLowerCase().replace(/[^a-z0-9]/g, ''); return n.includes(nomeV.slice(0, 10)) || (p.slug === 'prohmix-3-5-6-0-9-0' && n.includes('prohmix60')); }).slice(0, 2);
  const outros = g.slugs.length > 1 ? g.slugs.filter(s => s !== p.slug) : P.filter(x => x.slug !== p.slug && grupoDe(x.slug) !== g).slice(0, 3).map(x => x.slug);
  return `<section class="maq-hero"><div class="in maq-hero-grid">
  <div class="maq-hero-txt">
    <nav class="migalha" aria-label="Breadcrumb"><a href="${b}">${t.nav.inicio}</a><span>/</span><a href="${b}produtos/">${t.nav.produtos}</a><span>/</span><span aria-current="page">${p.nome}</span></nav>
    <p class="eyebrow"><span class="traco"></span>${linha(p, l)}</p>
    <h1>${p.nome}</h1>
    ${p.intro.map(s => `<p>${tr(s, l)}</p>`).join('')}
    <div class="botoes"><a class="btn btn-verm" href="${wa(E.wa, msg)}" target="_blank" rel="noopener">${ic('zap', 'ic-s')}${t.orcamento}</a>${p.folder ? `<a class="btn btn-linha" href="${l === 'es' && p.folderEs ? p.folderEs : p.folder}" target="_blank" rel="noopener">${ic('doc', 'ic-s')}${t.folder}</a>` : ''}${p.folderEs && p.folder ? `<a class="link-pdf" href="${l === 'es' ? p.folder : p.folderEs}" target="_blank" rel="noopener">${bandeira[l === 'es' ? 'pt' : 'es']}${t.folderEs}</a>` : ''}</div>
  </div>
  <figure class="maq-palco">${img('p-' + p.slug, p.nome, ' fetchpriority="high" loading="eager"')}</figure>
</div></section>
<section class="secao"><div class="in">
  ${tituloSecao(p.nome, t.especificacoes)}
  <div class="itens itens-spec">${spec.map(item).join('')}</div>
</div></section>
${opc.length ? `<section class="secao cinza"><div class="in">${tituloSecao(p.nome, t.opcionais)}<div class="itens itens-opc">${opc.map(item).join('')}</div></div></section>` : ''}
${vids.length ? `<section class="secao"><div class="in maq-videos">${tituloSecao(t.videosTit, p.nome)}<div class="vid-grid n${vids.length}">${vids.map(x => `<figure>${video(x.id, tr(x.t, l))}<figcaption>${tr(x.t, l)}</figcaption></figure>`).join('')}</div></div></section>` : ''}
<section class="secao${vids.length ? ' cinza' : ''}"><div class="in">
  ${tituloSecao(g[l].nome, t.relacionadas)}
  <div class="lista-maq mini">${outros.map(s => { const o = prod(s); return `<a class="maq" href="${b}produtos/${s}/"><span class="palco">${img('p-' + s, o.nome)}</span><span class="maq-txt"><b>${o.nome}</b><span>${resumo[s][l]}</span></span></a>`; }).join('')}</div>
  <p class="todos"><a class="link-seta" href="${b}produtos/">${t.voltarProdutos} ${ic('seta', 'ic-s')}</a></p>
</div></section>
${ctaFaixa(v, l)}`;
}

function videos(v, l) {
  const t = T[l];
  return topoPagina(v, l, { titulo: t.videosTit, texto: t.videosSub, foto: 'hero-leite', trilha: [[t.videosTit]] }) + `
<section class="secao"><div class="in"><div class="vid-grid todos-videos">${dados.videos.map(x => `<figure>${video(x.id, tr(x.t, l))}<figcaption>${tr(x.t, l)}</figcaption></figure>`).join('')}</div>
<p class="todos"><a class="btn btn-linha" href="${E.redes[3].url}" target="_blank" rel="noopener">YouTube HaramaQ</a></p></div></section>
${ctaFaixa(v, l)}`;
}

function posVenda(v, l) {
  const t = T[l]; const c = t.posCampos;
  const uf = (nome, rot) => `<label><span>${rot}</span><input name="${nome}" maxlength="40"></label>`;
  return topoPagina(v, l, { titulo: t.posTit, foto: 'hero-confinamento', trilha: [[t.nav.posvenda]] }) + `
<section class="secao"><div class="in pos-grid">
  <div class="pos-txt"><p>${t.posTxt}</p>
    <a class="pos-tel" href="tel:${E.posvendaHref}">${ic('tel')}<span><small>${t.posvenda}</small>${E.posvenda}</span></a>
    <a class="btn btn-verm" href="${wa(E.waPos, l === 'es' ? '¡Hola, HaramaQ! Necesito atención posventa.' : 'Olá, HaramaQ! Preciso de atendimento de pós-venda.')}" target="_blank" rel="noopener">${ic('zap', 'ic-s')}${t.whats}</a>
    ${video('tJJaCyzzNdU', t.posVideo, ' grande')}
  </div>
  <form class="form etapas-form" data-wa="${E.waPos}" data-titulo="${esc(t.posTit)}">
    <ol class="etapas-nav">${t.posEtapas.map((e, i) => `<li${i === 0 ? ' class="ativa"' : ''}><span>${i + 1}</span>${e}</li>`).join('')}</ol>
    <fieldset class="etapa ativa"><legend>${t.posEtapas[0]}</legend>
      <label><span>${c.nome}</span><input name="${c.nome}" required></label>
      <div class="dupla"><label><span>${c.fone}</span><input name="${c.fone}" type="tel" required></label><label><span>${c.email}</span><input name="${c.email}" type="email"></label></div>
      <div class="dupla"><label><span>${c.cidade}</span><input name="${c.cidade}"></label>${uf(c.uf, c.uf)}</div>
    </fieldset>
    <fieldset class="etapa"><legend>${t.posEtapas[1]}</legend>
      <label><span>${c.revenda}</span><input name="${c.revenda}"></label>
      <div class="dupla"><label><span>${c.cidadeRev}</span><input name="${c.cidadeRev}"></label>${uf(c.ufRev, c.ufRev)}</div>
    </fieldset>
    <fieldset class="etapa"><legend>${t.posEtapas[2]}</legend>
      <label><span>${c.equip}</span><select name="${c.equip}">${P.map(p => `<option>${p.nome}</option>`).join('')}</select></label>
      <div class="dupla"><label><span>${c.serie}</span><input name="${c.serie}"></label><label><span>${c.compra}</span><input name="${c.compra}" type="date"></label></div>
      <p class="nota">${ic('doc', 'ic-s')}<span><b>${c.nota}.</b> ${c.notaTxt}</span></p>
    </fieldset>
    <fieldset class="etapa"><legend>${t.posEtapas[3]}</legend>
      <label><span>${c.reclamacao}</span><textarea name="${c.reclamacao}" rows="6" required></textarea></label>
    </fieldset>
    <div class="etapas-botoes"><button type="button" class="btn btn-linha" data-voltar hidden>${c.voltar}</button><button type="button" class="btn btn-escuro" data-proximo>${c.proximo}</button><button type="submit" class="btn btn-verm" hidden>${ic('zap', 'ic-s')}${c.enviar}</button></div>
  </form>
</div></section>`;
}

function blog(v, l) {
  const t = T[l]; const b = base(v, l);
  return topoPagina(v, l, { titulo: t.blogTit, texto: t.blogSub, foto: 'campo-aereo', trilha: [[t.blogTit]] }) + `
<section class="secao"><div class="in"><div class="posts">${dados.blog.map((p, i) => `<a class="post${i === 0 ? ' destaque' : ''}" href="${b}blog/${p.slug}/"><figure>${img('b-' + p.slug.slice(0, 40), tr(p.t, l))}</figure><div><small>${data(p.data, l)}</small><h2>${tr(p.t, l)}</h2><p>${limpa(tr(p.corpo[0].p, l)).slice(0, 220)}…</p><span class="mais">${t.lerArtigo} ${ic('seta', 'ic-s')}</span></div></a>`).join('')}</div></div></section>`;
}

function artigo(v, l, p) {
  const t = T[l]; const b = base(v, l);
  const corpo = p.corpo.map((x, i) => (x.h ? `<h2>${limpa(x.h)}</h2>` : i === 0 ? '' : `<p>${limpa(x.p)}</p>`)).join('');
  return `<article class="artigo"><div class="in artigo-grid">
  <div class="artigo-txt">
    <nav class="migalha" aria-label="Breadcrumb"><a href="${b}">${t.nav.inicio}</a><span>/</span><a href="${b}blog/">${t.blogTit}</a></nav>
    <h1>${tr(p.t, l)}</h1><p class="meta">${t.por} · ${data(p.data, l)}</p>
    <figure class="artigo-capa">${img('b-' + p.slug.slice(0, 40), tr(p.t, l), ' loading="eager"')}</figure>
    <p class="abre">${limpa(tr(p.corpo[0].p, l))}</p>
    ${l === 'es' ? `<p class="aviso-lang">${t.artigoEs}</p><div lang="pt">${corpo}</div>` : corpo}
  </div>
  <aside class="artigo-lado"><h3>${t.outrosArtigos}</h3>${dados.blog.filter(x => x !== p).map(x => `<a href="${b}blog/${x.slug}/">${img('b-' + x.slug.slice(0, 40), tr(x.t, l))}<span>${tr(x.t, l)}</span></a>`).join('')}
  <div class="lado-cta"><p>${t.ctaTit}</p><a class="btn btn-verm" href="${wa(E.wa, l === 'es' ? '¡Hola, HaramaQ!' : 'Olá, HaramaQ!')}" target="_blank" rel="noopener">${ic('zap', 'ic-s')}${t.whats}</a></div></aside>
</div></article>`;
}

function contato(v, l) {
  const t = T[l]; const f = t.form;
  return topoPagina(v, l, { titulo: t.contatoTit, foto: 'pasto', trilha: [[t.nav.contato]] }) + `
<section class="secao"><div class="in contato-grid">
  <div class="contato-dados">
    <p>${t.contatoTxt}</p>
    <h3>${t.setores}</h3>
    <a class="setor" href="${wa(E.wa, l === 'es' ? '¡Hola, HaramaQ! Quiero hablar con el sector comercial.' : 'Olá, HaramaQ! Quero falar com o comercial.')}" target="_blank" rel="noopener"><span class="info-ic">${ic('zap')}</span><span><small>${t.comercial} · ${E.telOp}</small>${E.tel}</span></a>
    <a class="setor" href="${wa(E.waPos, l === 'es' ? '¡Hola, HaramaQ! Necesito atención posventa.' : 'Olá, HaramaQ! Preciso de pós-venda.')}" target="_blank" rel="noopener"><span class="info-ic">${ic('zap')}</span><span><small>${t.posvenda} · ${E.posvendaOp}</small>${E.posvenda}</span></a>
    <a class="setor" href="mailto:${E.emailContato}"><span class="info-ic">${ic('mail')}</span><span><small>E-mail</small>${E.emailContato}</span></a>
    <a class="setor" href="${E.mapaLink}" target="_blank" rel="noopener"><span class="info-ic">${ic('pin')}</span><span><small>${l === 'es' ? 'Dirección' : 'Endereço'}</small>${E.endereco}</span></a>
  </div>
  <form class="form form-contato" data-wa="${E.wa}" data-titulo="${esc(t.contatoTit)}">
    <h2>${l === 'es' ? 'Formulario de contacto' : 'Formulário para contato'}</h2>
    <div class="dupla"><label><span>${f.nome}</span><input name="${f.nome}" required></label><label><span>${f.fone}</span><input name="${f.fone}" type="tel" required></label></div>
    <label><span>${f.email}</span><input name="${f.email}" type="email"></label>
    <div class="dupla"><label><span>${f.cidade}</span><input name="${f.cidade}"></label><label><span>${f.uf}</span><input name="${f.uf}" maxlength="40"></label></div>
    <label><span>${f.motivo}</span><select name="${f.motivo}">${f.motivos.map(m => `<option>${m}</option>`).join('')}</select></label>
    <label><span>${f.msg}</span><textarea name="${f.msg}" rows="5"></textarea></label>
    <button class="btn btn-verm" type="submit">${ic('zap', 'ic-s')}${f.enviar}</button><small class="aviso">${f.aviso}</small>
  </form>
</div></section>
<section class="secao cinza" id="trabalhe"><div class="in trabalhe">
  <div><h2>${t.trabalheTit}</h2><p>${t.trabalheTxt}</p><a class="btn btn-escuro" href="mailto:${E.email}?subject=${encodeURIComponent(t.trabalheTit)}">${ic('mail', 'ic-s')}${E.email}</a></div>
  <figure>${img('fabrica', l === 'es' ? 'Planta de HaramaQ' : 'Fábrica da HaramaQ')}</figure>
</div></section>
<section class="mapa" aria-label="${t.localizacao}"><iframe src="${E.mapa}" title="${t.localizacao}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="btn btn-verm" href="${E.mapaLink}" target="_blank" rel="noopener">${ic('pin', 'ic-s')}${t.comoChegar}</a></section>`;
}

// ---------- montagem ----------
export function gerarVersao(v) {
  const out = {};
  for (const l of LANGS) {
    const t = T[l]; const pre = l === 'es' ? 'es/' : '';
    const add = (caminho, ativa, titulo, desc, corpo) => { out[pre + caminho] = pagina(v, l, ativa, caminho, titulo, desc, corpo); };
    add('', 'index', `HaramaQ · ${t.heroTit}`, t.heroTxt, v === 'a' ? homeA(l) : homeB(l));
    add('empresa/', 'empresa', `${t.nav.empresa} · HaramaQ`, t.historia[0], empresa(v, l));
    add('produtos/', 'produtos', `${t.nav.produtos} · HaramaQ`, t.heroTxt, produtos(v, l));
    for (const p of P) add(`produtos/${p.slug}/`, 'produtos', `${p.nome} · ${linha(p, l)} · HaramaQ`, limpa(tr(p.intro[0], l)).slice(0, 158), produto(v, l, p));
    add('videos/', 'videos', `${t.videosTit} · HaramaQ`, t.videosSub, videos(v, l));
    add('pos-venda/', 'pos-venda', `${t.posTit} · HaramaQ`, t.posTxt.slice(0, 158), posVenda(v, l));
    add('blog/', 'blog', `${t.blogTit} · HaramaQ`, t.blogSub, blog(v, l));
    for (const p of dados.blog) add(`blog/${p.slug}/`, 'blog', `${tr(p.t, l)} · HaramaQ`, limpa(tr(p.corpo[0].p, l)).slice(0, 158), artigo(v, l, p));
    add('contato/', 'contato', `${t.nav.contato} · HaramaQ`, t.contatoTxt.slice(0, 158), contato(v, l));
  }
  return out;
}
