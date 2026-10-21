// Monta as páginas das versões A ("Modular": fiel ao site atual, faixa geodésica no topo, frase modular·solar·sustentabilidade,
// bolinha laranja nos títulos, fundo cinza claro) e B ("Geodésica": branca, fotos recortadas em triângulos, linha do tempo 1993–2013).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, areas, projetos, linhaTempo, areaDe } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const DIM = { 53: [1400, 1060], 46: [1296, 968], 49: [640, 478], 54: [1296, 1539], 44: [824, 1400], 16: [177, 283], 27: [215, 283] };
const foto = (n, alt, extra = '') => { const [w, h] = DIM[n] || [437, 283]; return `<img src="/assets/img/f${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`; };
const capa = p => p.fotos[0];

export const nomesVersao = { a: 'Modular', b: 'Geodésica' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Quem Somos', caminho: 'empresa/' },
  { slug: 'projetos', nome: 'Projetos', caminho: 'projetos/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  volta: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  casa: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  fb: '<path d="M15 3h-2.5A3.5 3.5 0 009 6.5V9H7v3h2v9h3v-9h2.5l.5-3h-3V7a1 1 0 011-1h2z"/>',
  zoom: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5M11 8v6M8 11h6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const logo = (cls = 'logo', arq = 'logo') => `<img class="${cls}" src="/assets/${arq}.svg" alt="Tria Sistemas de Arquitetura" width="150" height="98">`;
const frase = () => `<p class="frase" aria-label="modular, solar, sustentabilidade">${E.frase.map((f, i) => `<span class="f${i}">${f}</span>`).join('')}</p>`;
const meta = p => [areaDe(p.area).curto, p.ano, p.local].filter(Boolean).join(' · ');

// ---------- moldura ----------
function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
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
<meta property="og:site_name" content="${E.nomeLongo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Source+Sans+3:wght@400;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function topo(v, atual) {
  const links = nav.map(n => {
    const on = n.slug === atual || (atual === 'projeto' && n.slug === 'projetos');
    const conteudo = v === 'a' && n.slug === 'index' ? `<span class="casa">${ic('casa')}</span><span class="sr">Home</span>` : n.nome;
    return `<a href="/${v}/${n.caminho}"${on ? ' aria-current="page"' : ''}${v === 'a' && n.slug === 'index' ? ' class="nav-casa"' : ''}>${conteudo}</a>`;
  }).join('');
  const cta = v === 'b' ? `<a class="btn btn-topo" href="/${v}/contato/">Fale com a Tria</a>` : '';
  return `<header class="topo"><div class="in topo-in">
  <a class="marca" href="/${v}/">${logo()}</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu">${ic('menu')}<span class="sr">Menu</span></button>
  <nav id="menu" class="menu" aria-label="Principal">${links}${cta}</nav>
</div></header>${v === 'a' ? `<div class="frase-faixa"><div class="in">${frase()}</div></div>` : ''}`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo('logo logo-rodape', 'logo-branco')}<p>${esc(E.quemSomos)}</p></div>
  <div><h2 class="rodape-t">Páginas</h2><ul class="rodape-lista">${nav.map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h2 class="rodape-t">Projetos</h2><ul class="rodape-lista">${areas.map(a => `<li><a href="/${v}/projetos/#${a.slug}">${a.nome}</a></li>`).join('')}</ul></div>
  <div><h2 class="rodape-t">Contato</h2><ul class="rodape-lista">
    <li><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></li>
    <li>${ic('pin')} ${E.cidade}</li>
    <li class="redes"><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('ig')}</a><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('fb')}</a></li>
  </ul></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} ${E.nomeLongo}</span><span>Desde ${E.fundacao}</span></div></footer>
<dialog class="lb" aria-label="Foto ampliada"><button class="lb-x" type="button" aria-label="Fechar">×</button><figure><img alt=""><figcaption></figcaption></figure></dialog>`;
}

const pagina = (v, slug, titulo, desc, corpo, atual = slug) =>
  `${head(v, slug === 'index' ? '' : slug + '/', titulo, desc)}\n<body class="v-${v} p-${atual}">\n<a class="pular" href="#conteudo">Pular para o conteúdo</a>\n${topo(v, atual)}\n<main id="conteudo">\n${corpo}\n</main>\n${rodape(v)}\n</body>\n</html>\n`;

const titulo = (t, extra = '') => `<h2 class="t-bola"${extra}>${t}</h2>`;
const ctaContato = v => `<section class="cta"><div class="in cta-in">
  <div><p class="eyebrow">Próximo estande, próximo projeto</p><h2>Conte o que você precisa montar.</h2><p>Estandes, arquitetura corporativa e energia solar. Responderemos pelo e-mail ${E.email}.</p></div>
  <div class="cta-acoes"><a class="btn" href="/${v}/contato/">Falar com a Tria ${ic('seta')}</a><a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')} ${E.email}</a></div>
</div></section>`;

// ---------- grade de projetos (as duas versões) ----------
function grade(v, lista, { filtro = false } = {}) {
  const chips = filtro ? `<div class="filtro" role="group" aria-label="Filtrar projetos"><button type="button" aria-pressed="true" data-filtro="">Todos <small>${lista.length}</small></button>${areas.map(a => `<button type="button" aria-pressed="false" data-filtro="${a.slug}" id="${a.slug}">${a.nome} <small>${lista.filter(p => p.area === a.slug).length}</small></button>`).join('')}</div>` : '';
  return `${chips}<ul class="grade" ${filtro ? 'data-grade' : ''}>${lista.map(p => `<li data-area="${p.area}"><a class="proj" href="/${v}/projetos/${p.slug}/">
  <span class="proj-foto">${foto(capa(p)[0], capa(p)[1])}</span>
  <span class="proj-txt"><small>${esc(meta(p))}</small><b>${esc(p.titulo)}</b><span>${esc(p.resumo)}</span></span>
</a></li>`).join('')}</ul>`;
}

// ---------- VERSÃO A ----------
function homeA() {
  const v = 'a';
  const dest = ['solar-lounge', 'cupula-portal-do-sol', 'estacionamento-colegio-anchieta', 'alemanha-expointer-2013'].map(s => projetos.find(p => p.slug === s));
  const mezzo = projetos.find(p => p.slug === 'sistema-mezzo');
  return pagina(v, 'index', 'Tria Sistemas de Arquitetura · Estandes, arquitetura modular e energia solar', E.quemSomos, `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="eyebrow">Desde ${E.fundacao} · ${E.cidade}</p>
    <h1>Sistemas de arquitetura modular, estandes e energia solar.</h1>
    <p class="lead">${esc(E.quemSomos)}</p>
    <div class="acoes"><a class="btn" href="/a/projetos/">Ver projetos ${ic('seta')}</a><a class="btn btn-linha" href="/a/contato/">Fale com a Tria</a></div>
  </div>
  <div class="hero-mosaico">
    <figure class="m1">${foto(17, 'Cúpula Portal do Sol, estrutura geodésica em São Francisco de Paula', ' loading="eager" fetchpriority="high"')}</figure>
    <figure class="m2">${foto(54, 'Solar Lounge, carregador movido a energia solar')}</figure>
    <figure class="m3">${foto(46, 'Estande da Alemanha na Expointer 2013')}</figure>
  </div>
</div></section>

<section class="sec"><div class="in">
  ${titulo('projetos em destaque')}
  <div class="destaques">${dest.map((p, i) => `<a class="dest${i < 2 ? ' dest-g' : ''}" href="/a/projetos/${p.slug}/">
    <span class="dest-foto">${foto(capa(p)[0], capa(p)[1])}</span>
    <span class="dest-txt"><small>${esc(meta(p))}</small><b>${esc(p.titulo)}</b><span>${esc(p.resumo)}</span><em>Veja mais ${ic('seta')}</em></span>
  </a>`).join('')}</div>
</div></section>

<section class="sec sec-alt"><div class="in">
  ${titulo('nossos projetos')}
  <p class="intro">Três frentes de trabalho, as mesmas do site de hoje, agora com as fotos de cada uma.</p>
  ${areas.map((a, i) => {
    const lista = projetos.filter(p => p.area === a.slug);
    return `<article class="area${i % 2 ? ' area-inv' : ''}">
    <figure class="area-foto">${foto(a.foto, a.nome)}<figcaption>${lista.length} projetos</figcaption></figure>
    <div class="area-txt">
      <p class="area-n">0${i + 1}</p>
      <h3>${a.nome}</h3>
      ${a.slug === 'energia-solar' ? `<blockquote>${esc(a.texto)}</blockquote>` : `<p>${esc(a.texto)}</p>`}
      <p>${esc(a.texto2)}</p>
      <ul class="area-lista">${lista.slice(0, 4).map(p => `<li><a href="/a/projetos/${p.slug}/">${esc(p.titulo)}${p.ano ? ` <small>${p.ano}</small>` : ''}</a></li>`).join('')}</ul>
      <a class="link" href="/a/projetos/#${a.slug}">Ver projetos [+]</a>
    </div>
  </article>`;
  }).join('')}
</div></section>

<section class="mezzo"><div class="in mezzo-in">
  <div class="mezzo-txt">
    <p class="eyebrow">Desde 1996</p>
    <h2>Sistema Mezzo: perfis de alumínio alemães de alto acabamento.</h2>
    <p>${esc(mezzo.texto[0])}</p>
    <p>${esc(mezzo.texto[1])}</p>
    <a class="btn btn-escuro" href="/a/projetos/sistema-mezzo/">Ver exposições com Mezzo ${ic('seta')}</a>
  </div>
  <ul class="mezzo-fotos">${mezzo.fotos.slice(1, 5).map(([n, alt]) => `<li><figure>${foto(n, alt)}<figcaption>${esc(alt)}</figcaption></figure></li>`).join('')}</ul>
</div></section>

<section class="sec"><div class="in quem">
  <div>
    ${titulo('quem somos')}
    <p class="lead">${esc(E.quemSomos)}</p>
    <p>${esc(E.facebookFrase)}</p>
    <a class="link" href="/a/empresa/">Conheça a Tria [+]</a>
  </div>
  <dl class="numeros">
    <div><dt>${E.fundacao}</dt><dd>ano de fundação</dd></div>
    <div><dt>1996</dt><dd>na rede mundial mezzo systems</dd></div>
    <div><dt>2009</dt><dd>primeiro projeto de energia solar</dd></div>
  </dl>
</div></section>
${ctaContato(v)}`);
}

function empresaA() {
  return pagina('a', 'empresa', 'Quem Somos · Tria Sistemas de Arquitetura', E.quemSomos, `
<section class="cab"><div class="in"><p class="trilha"><a href="/a/">home</a> • Quem Somos</p><h1>Quem Somos</h1></div></section>
<section class="sec"><div class="in quem-pag">
  <div>
    <p class="lead">${esc(E.quemSomos)}</p>
    <p>${esc(E.facebookFrase)} Do primeiro estande em alumínio escovado, na Festa da Uva de 1993, à geração de energia solar fotovoltaica desde 2009.</p>
    ${frase()}
  </div>
  <figure class="quem-foto">${foto(29, 'Pavilhão geodésico da Tria na Feira do Livro de Porto Alegre')}<figcaption>Pavilhão de autógrafos em cúpula geodésica, Feira do Livro de Porto Alegre, 2005.</figcaption></figure>
</div></section>
<section class="sec sec-alt"><div class="in">
  ${titulo('associações')}
  <p class="intro">A Tria é associada e membro ativo de:</p>
  <ul class="assoc">${E.associacoes.map(a => `<li><b>${a.sigla}</b><span>${a.nome}</span></li>`).join('')}</ul>
</div></section>
<section class="sec"><div class="in">
  ${titulo('linha do tempo')}
  <ol class="tempo-a">${linhaTempo.map(t => `<li><a href="/a/projetos/${t.slug}/"><b>${t.ano}</b><span><strong>${esc(t.titulo)}</strong>${esc(t.texto)}</span></a></li>`).join('')}</ol>
</div></section>
${ctaContato('a')}`);
}

// ---------- VERSÃO B ----------
const triangulos = [[17, 'Cúpula Portal do Sol'], [53, 'Tomada USB do Solar Lounge'], [46, 'Estande da Alemanha na Expointer 2013'], [15, 'Estacionamento solar do Colégio Anchieta'], [24, 'Estande da AHK na ExpoHannover'], [18, 'Fábrica de cervejas em madeira laminada'], [49, 'Palco do Prêmio SERGS'], [29, 'Cúpula da Feira do Livro']];

function homeB() {
  const v = 'b';
  const mezzo = projetos.find(p => p.slug === 'sistema-mezzo');
  return pagina(v, 'index', 'Tria Sistemas de Arquitetura · Estandes, arquitetura modular e energia solar', E.quemSomos, `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="eyebrow"><span class="ponto"></span>Tria Sistemas de Arquitetura · desde ${E.fundacao}</p>
    <h1>Estandes, arquitetura modular e energia solar.</h1>
    <p class="lead">${esc(E.facebookFrase)} Projetos executados no Brasil e no mundo, do primeiro estande em 1993 à energia fotovoltaica.</p>
    <div class="acoes"><a class="btn" href="/b/projetos/">Ver os ${projetos.length} projetos ${ic('seta')}</a><a class="btn btn-linha" href="/b/contato/">Fale com a Tria</a></div>
    ${frase()}
  </div>
  <div class="tri" aria-hidden="false">${triangulos.map(([n, alt], i) => `<figure class="tri-${i}">${foto(n, alt, i < 3 ? ' loading="eager"' : '')}</figure>`).join('')}</div>
</div></section>

<section class="marcos"><div class="in"><dl>
  <div><dt>${E.fundacao}</dt><dd>fundação, em Porto Alegre</dd></div>
  <div><dt>1996</dt><dd>na rede mundial mezzo systems</dd></div>
  <div><dt>4 kWp</dt><dd>no estacionamento solar do Anchieta</dd></div>
  <div><dt>6 mil m²</dt><dd>na nova sede do CREA-RS</dd></div>
</dl></div></section>

<section class="sec"><div class="in">
  <p class="eyebrow">O que a Tria faz</p>
  <h2 class="h-sec">Três frentes, uma mesma ideia: construir bem, com o mínimo de desperdício.</h2>
  <div class="frentes">${areas.map((a, i) => `<article class="frente">
    <a href="/b/projetos/#${a.slug}" class="frente-foto">${foto(a.foto, a.nome)}</a>
    <p class="frente-n">0${i + 1}</p>
    <h3>${a.nome}</h3>
    <p>${esc(a.slug === 'energia-solar' ? a.texto2 : a.texto)}</p>
    <a class="link" href="/b/projetos/#${a.slug}">${projetos.filter(p => p.area === a.slug).length} projetos ${ic('seta')}</a>
  </article>`).join('')}</div>
</div></section>

<section class="sec sec-cinza tempo-sec"><div class="in">
  <p class="eyebrow">1993 – 2013</p>
  <h2 class="h-sec">Vinte anos de projetos, do alumínio escovado ao painel solar.</h2>
  <ol class="tempo" data-tempo>${linhaTempo.map(t => `<li><a href="/b/projetos/${t.slug}/">
    <span class="tempo-ano">${t.ano}</span>
    <span class="tempo-foto">${foto(t.foto, t.titulo)}</span>
    <strong>${esc(t.titulo)}</strong><span>${esc(t.texto)}</span>
  </a></li>`).join('')}</ol>
</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Portfólio</p><h2 class="h-sec">Projetos selecionados</h2></div><a class="link" href="/b/projetos/">Todos os projetos ${ic('seta')}</a></div>
  ${grade(v, ['solar-lounge', 'cupula-portal-do-sol', 'alemanha-expointer-2013', 'estacionamento-colegio-anchieta', 'loja-conceito-sebrae-rs', 'estande-ahk-expohannover-2000'].map(s => projetos.find(p => p.slug === s)))}
</div></section>

<section class="mezzo"><div class="in mezzo-in">
  <div class="mezzo-txt">
    <p class="eyebrow">Sistema Mezzo · desde 1996</p>
    <h2>Estandes em perfis de alumínio alemães, montados e reaproveitados.</h2>
    <p>${esc(areas[0].texto2)}</p>
    <p>${esc(mezzo.texto[2])}</p>
    <a class="btn" href="/b/projetos/sistema-mezzo/">Ver exposições com Mezzo ${ic('seta')}</a>
  </div>
  <div class="mezzo-mosaico">${mezzo.fotos.map(([n, alt]) => `<figure>${foto(n, alt)}</figure>`).join('')}</div>
</div></section>

<section class="sec"><div class="in assoc-b">
  <p class="eyebrow">Associada e membro ativo</p>
  <ul>${E.associacoes.map(a => `<li><b>${a.sigla}</b><span>${a.nome}</span></li>`).join('')}</ul>
</div></section>
${ctaContato(v)}`);
}

function empresaB() {
  return pagina('b', 'empresa', 'Quem Somos · Tria Sistemas de Arquitetura', E.quemSomos, `
<section class="cab"><div class="in cab-in">
  <div><p class="eyebrow"><span class="ponto"></span>Quem Somos</p><h1>Arquitetura corporativa desde ${E.fundacao}.</h1><p class="lead">${esc(E.quemSomos)}</p></div>
  <div class="tri tri-p" aria-hidden="false">${triangulos.slice(0, 4).map(([n, alt], i) => `<figure class="tri-${i}">${foto(n, alt)}</figure>`).join('')}</div>
</div></section>
<section class="sec"><div class="in quem-b">
  <div><h2 class="h-sec">Soluções rápidas, eficazes e criativas.</h2><p>${esc(E.facebookFrase)} A Tria projeta e executa arquitetura efêmera, estandes e exposições no Brasil e no exterior, faz parte da rede mundial mezzo systems desde 1996 e implanta projetos de geração de energia solar fotovoltaica desde 2009.</p>${frase()}</div>
  <ul class="assoc">${E.associacoes.map(a => `<li><b>${a.sigla}</b><span>${a.nome}</span></li>`).join('')}</ul>
</div></section>
<section class="sec sec-cinza tempo-sec"><div class="in">
  <p class="eyebrow">1993 – 2013</p><h2 class="h-sec">Linha do tempo</h2>
  <ol class="tempo" data-tempo>${linhaTempo.map(t => `<li><a href="/b/projetos/${t.slug}/"><span class="tempo-ano">${t.ano}</span><span class="tempo-foto">${foto(t.foto, t.titulo)}</span><strong>${esc(t.titulo)}</strong><span>${esc(t.texto)}</span></a></li>`).join('')}</ol>
</div></section>
${ctaContato('b')}`);
}

// ---------- páginas comuns ----------
function projetosPag(v) {
  const cab = v === 'a'
    ? `<section class="cab"><div class="in"><p class="trilha"><a href="/a/">home</a> • Projetos</p><h1>Projetos</h1></div></section>`
    : `<section class="cab cab-curto"><div class="in"><p class="eyebrow"><span class="ponto"></span>Portfólio</p><h1>Projetos</h1><p class="lead">Estandes e exposições, energia solar e arquitetura. Escolha uma frente ou veja todos.</p></div></section>`;
  const intro = v === 'a' ? `<div class="areas-intro">${areas.map(a => `<div><h2 class="t-bola">${a.nome}</h2><p>${esc(a.texto)}</p></div>`).join('')}</div>` : '';
  return pagina(v, 'projetos', 'Projetos · Tria Sistemas de Arquitetura', 'Estandes e exposições, energia solar e arquitetura: os projetos da Tria Sistemas de Arquitetura desde 1993.', `
${cab}
<section class="sec"><div class="in">${intro}${grade(v, projetos, { filtro: true })}</div></section>
${ctaContato(v)}`);
}

function projetoPag(v, p) {
  const i = projetos.indexOf(p), ant = projetos[(i - 1 + projetos.length) % projetos.length], prox = projetos[(i + 1) % projetos.length];
  const a = areaDe(p.area);
  const [f0, ...resto] = p.fotos;
  const nums = p.numeros ? `<dl class="numeros numeros-p">${p.numeros.map(([n, l]) => `<div><dt>${n}</dt><dd>${l}</dd></div>`).join('')}</dl>` : '';
  const galeria = resto.length ? `<ul class="galeria">${resto.map(([n, alt]) => `<li><button type="button" class="zoom" data-zoom="/assets/img/f${n}.webp" data-legenda="${esc(alt)}">${foto(n, alt)}<span>${ic('zoom')}</span></button><p>${esc(alt)}</p></li>`).join('')}</ul>` : '';
  const trilha = v === 'a' ? `<p class="trilha"><a href="/a/">home</a> • <a href="/a/projetos/">Projetos</a> • <a href="/a/projetos/#${a.slug}">${a.nome}</a></p>` : `<p class="eyebrow"><span class="ponto"></span><a href="/b/projetos/#${a.slug}">${a.nome}</a></p>`;
  return pagina(v, `projetos/${p.slug}`, `${p.titulo} · Projetos · Tria`, p.resumo, `
<section class="cab cab-proj"><div class="in">${trilha}<h1>${esc(p.titulo)}</h1>${p.ano || p.local ? `<p class="proj-meta">${esc([p.ano, p.local].filter(Boolean).join(' · '))}</p>` : ''}</div></section>
<section class="sec"><div class="in proj-pag">
  <figure class="proj-capa"><button type="button" class="zoom" data-zoom="/assets/img/f${f0[0]}.webp" data-legenda="${esc(f0[1])}">${foto(f0[0], f0[1], ' loading="eager"')}<span>${ic('zoom')}</span></button><figcaption>${esc(f0[1])}</figcaption></figure>
  <div class="proj-texto">
    ${p.texto.map(t => `<p>${esc(t)}</p>`).join('')}
    ${nums}
    <dl class="ficha"><div><dt>Frente</dt><dd><a href="/${v}/projetos/#${a.slug}">${a.nome}</a></dd></div>${p.ano ? `<div><dt>Ano</dt><dd>${p.ano}</dd></div>` : ''}${p.local ? `<div><dt>Local</dt><dd>${esc(p.local)}</dd></div>` : ''}</dl>
    <a class="btn" href="/${v}/contato/?projeto=${encodeURIComponent(p.titulo)}">Quero um projeto assim ${ic('seta')}</a>
  </div>
  ${galeria}
</div></section>
<nav class="sec in pag-nav" aria-label="Outros projetos"><a href="/${v}/projetos/${ant.slug}/">${ic('volta')}<span><small>Anterior</small>${esc(ant.titulo)}</span></a><a href="/${v}/projetos/">Todos os projetos</a><a href="/${v}/projetos/${prox.slug}/"><span><small>Próximo</small>${esc(prox.titulo)}</span>${ic('seta')}</a></nav>`, 'projeto');
}

function contatoPag(v) {
  const cab = v === 'a'
    ? `<section class="cab"><div class="in"><p class="trilha"><a href="/a/">home</a> • Contato</p><h1>Contato</h1></div></section>`
    : `<section class="cab cab-curto"><div class="in"><p class="eyebrow"><span class="ponto"></span>Contato</p><h1>Vamos conversar sobre o seu projeto.</h1></div></section>`;
  return pagina(v, 'contato', 'Contato · Tria Sistemas de Arquitetura', `Fale com a Tria Sistemas de Arquitetura pelo e-mail ${E.email}.`, `
${cab}
<section class="sec"><div class="in contato">
  <form class="form" data-form-email="${E.email}">
    <div class="campo"><label for="f-nome">Nome</label><input id="f-nome" name="Nome" required autocomplete="name"></div>
    <div class="campo"><label for="f-email">E-mail</label><input id="f-email" name="E-mail" type="email" required autocomplete="email"></div>
    <div class="campo"><label for="f-tel">Telefone</label><input id="f-tel" name="Telefone" type="tel" autocomplete="tel"></div>
    <div class="campo"><label for="f-tipo">Assunto</label><select id="f-tipo" name="Assunto"><option>Estande ou exposição</option><option>Energia solar</option><option>Arquitetura</option><option>Sistema Mezzo</option><option>Outro assunto</option></select></div>
    <div class="campo campo-l"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="Mensagem" rows="6" required></textarea></div>
    <button class="btn" type="submit">Enviar por e-mail ${ic('seta')}</button>
    <p class="form-nota">O botão abre o seu programa de e-mail com a mensagem pronta para ${E.email}.</p>
  </form>
  <aside class="contato-info">
    <h2>${v === 'a' ? '<span class="bola"></span>' : ''}Contatos</h2>
    <p><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p>
    <p>${ic('pin')} ${E.cidade}</p>
    <p class="redes"><a href="${E.instagram}" target="_blank" rel="noopener">${ic('ig')} Instagram</a><a href="${E.facebook}" target="_blank" rel="noopener">${ic('fb')} Facebook</a></p>
    <figure>${foto(15, 'Estacionamento solar do Colégio Anchieta')}</figure>
  </aside>
</div></section>`);
}

export function gerarVersao(v) {
  const out = { index: v === 'a' ? homeA() : homeB(), empresa: v === 'a' ? empresaA() : empresaB(), projetos: projetosPag(v), contato: contatoPag(v) };
  for (const p of projetos) out[`projetos/${p.slug}`] = projetoPag(v, p);
  return out;
}
