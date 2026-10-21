// Páginas das versões A ("Vitrine": fiel ao site atual, faixa de topo com endereço, cabeçalho com os três telefones, menu azul,
// destaques com a foto emoldurada, menu lateral de produtos) e B ("Rua Chile": clara e atual, escolha pelo ambiente, corte dos
// vidros desenhado, as quatro fases da empresa). Estilos em public/assets/{base,a,b}.css, script em site.js.
import fs from 'node:fs';
import { empresa as E, resumo, historia, citacao, fases, cultura, vidros, produtos, destaques, ambientes } from './conteudo.mjs';

const fotos = JSON.parse(fs.readFileSync(new URL('./fotos.json', import.meta.url)));
const dim = Object.fromEntries(Object.values(fotos).flat().map(([n, w, h]) => [n, [w, h]]));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, { cls = '', lazy = true, sizes = '' } = {}) => {
  const [w, h] = dim[n] || [1200, 900];
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async"${sizes}>`;
};
const P = Object.fromEntries(produtos.map(p => [p.slug, p]));

export const nomesVersao = { a: 'Vitrine', b: 'Rua Chile' };

const nav = [
  { slug: 'index', nome: 'Home', nomeB: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'Sobre a Empresa', nomeB: 'A empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos e Serviços', nomeB: 'Produtos', caminho: 'produtos/' },
  { slug: 'obras', nome: 'Obras', nomeB: 'Obras', caminho: 'obras/' },
  { slug: 'contato', nome: 'Fale Conosco', nomeB: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M15 5l-7 7 7 7"/>',
  dir: '<path d="M9 5l7 7-7 7"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  cartao: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
  caminhao: '<path d="M2 16V7h12v9M14 10h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  regua: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
  foto: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Vidraçaria Chile e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const ext = 'target="_blank" rel="noopener"';
// a curva turquesa do logo, usada como desenho de apoio
const curva = (cls = 'curva') => `<svg class="${cls}" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true"><path d="M2 118C120 40 300 6 598 14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
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
<meta property="og:site_name" content="Vidraçaria Chile">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#2A2A86' : '#FFFFFF'}">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Questrial&family=Inter:wght@400;500;600&${v === 'a' ? 'family=Oswald:wght@300;400&' : ''}display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menuProdutos = (v, atual) => produtos.map(p => `<a href="/${v}/produtos/${p.slug}/"${atual === p.slug ? ' aria-current="page"' : ''}>${p.nome}</a>`).join('');
const navLinks = (v, atual, prodAtual) => nav.map(n => {
  const ativo = n.slug === atual ? ' aria-current="page"' : '';
  const nome = v === 'a' ? n.nome : n.nomeB;
  if (n.slug !== 'produtos') return `<a href="/${v}/${n.caminho}"${ativo}>${nome}</a>`;
  return `<div class="sub"><a href="/${v}/${n.caminho}"${ativo}>${nome}</a><button class="sub-bt" type="button" aria-expanded="false" aria-label="Ver produtos">${ic('baixo')}</button><div class="sub-m">${menuProdutos(v, prodAtual)}</div></div>`;
}).join('');
const logoA = (cls = 'logo') => `<a class="${cls}" href="/a/" aria-label="Vidraçaria Chile, página inicial"><img src="/assets/logo.svg" alt="Vidraçaria Chile" width="186" height="155"></a>`;
const logoB = (branco = false) => `<a class="logo-h" href="/b/" aria-label="Vidraçaria Chile, página inicial"><img src="/assets/logo-cv${branco ? '-branco' : ''}.svg" alt="" width="80" height="67"><img src="/assets/logo-nome${branco ? '-branco' : ''}.svg" alt="Vidraçaria Chile" width="186" height="80"></a>`;

function topo(v, atual, prodAtual) {
  const fonesA = `<a href="tel:${E.fones[0].href}">${ic('tel')}<span>41. 3333-5477</span></a><a href="tel:${E.fones[1].href}">${ic('tel')}<span>41. 3333-8677</span></a><a class="a-cab-wa" href="${waLink()}" ${ext}>${ic('wa')}<span>WhatsApp</span></a>`;
  if (v === 'a') return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="a-faixa"><div class="w"><span>${ic('relogio')} Seg. a sex. 08h às 12h · 13h às 18h</span><span>${ic('pin')} ${E.endereco} - ${E.bairro} - Curitiba - PR</span></div></div>
<header class="a-cab"><div class="w">
  ${logoA()}
  <p class="a-slogan">${E.slogan}</p>
  <div class="a-fones">${fonesA}</div>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>
<nav class="a-menu" id="menu" aria-label="Principal"><div class="w">${navLinks(v, atual, prodAtual)}<a class="a-menu-orc" href="/a/contato/#orcamento">Peça um orçamento</a></div></nav>`;
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="b-cab"><div class="w">
  ${logoB()}
  <nav class="b-menu" id="menu" aria-label="Principal">${navLinks(v, atual, prodAtual)}<a class="b-menu-tel" href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].n}</a></nav>
  <a class="b-cab-wa" href="${waLink()}" ${ext}>${ic('wa')}<span>Orçamento</span></a>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  const fones = E.fones.map(f => `<a href="tel:${f.href}">${f.n}</a>${f.wa ? ' <small>(também WhatsApp)</small>' : ''}`).join('<br>');
  const lista = (t, itens) => `<div><h3>${t}</h3><ul>${itens.map(([n, h]) => `<li><a href="${h}">${n}</a></li>`).join('')}</ul></div>`;
  return `<footer class="rod rod-${v}">
<div class="w rod-g">
  <div class="rod-marca">${v === 'a' ? '<img src="/assets/logo-branco.svg" alt="Vidraçaria Chile" width="120" height="100" loading="lazy">' : logoB(true)}
    <p>Vidraçaria em Curitiba desde ${E.fundacao}. Box, vidros temperados, espelhos, coberturas, guarda-corpos, fachadas e esquadrias de alumínio.</p>
    <a class="rod-fb" href="${E.facebook}" ${ext}>${ic('fb')} Curta nossa página no Facebook</a></div>
  <div><h3>Fale conosco</h3><p>${fones}</p><p><a class="rod-wa" href="${waLink()}" ${ext}>${ic('wa')} Chamar no WhatsApp</a></p></div>
  <div><h3>Atendimento</h3><p>${E.horario.map(([d, h]) => `${d}<br><b>${h}</b>`).join('<br>')}</p><h3>Localização</h3><p>${E.endereco}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}<br><a href="${E.mapa}" ${ext}>Ver no mapa</a></p></div>
  ${lista('Produtos e serviços', produtos.map(p => [p.nome, `/${v}/produtos/${p.slug}/`]))}
</div>
<div class="w rod-fim"><span>© ${new Date().getFullYear()} Vidraçaria Chile · Curitiba - PR</span><span>Formas de pagamento: ${E.pagamento.join(', ')}</span></div>
</footer>
<a class="wa-flut" href="${waLink()}" ${ext} aria-label="Falar no WhatsApp">${ic('wa')}</a>
<dialog class="lb" aria-label="Foto ampliada"><button class="lb-x" type="button" aria-label="Fechar">${ic('x')}</button><button class="lb-ant" type="button" aria-label="Foto anterior">${ic('esq')}</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-prox" type="button" aria-label="Próxima foto">${ic('dir')}</button></dialog>`;
}

const pagina = (v, caminho, atual, titulo, desc, corpo, prodAtual) => `${head(v, caminho, titulo, desc)}
<body class="v-${v}">
${topo(v, atual, prodAtual)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// galeria com lightbox; itens = [nome, legenda, cat]
const galeria = (itens, cls = 'gal') => `<ul class="${cls}" data-galeria>${itens.map(([n, leg, cat]) => `<li${cat ? ` data-cat="${cat}"` : ''}><a href="/assets/img/${n}.webp" data-leg="${esc(leg)}">${img(n, leg)}</a></li>`).join('')}</ul>`;
const fotosDe = p => fotos[p.cat].map(([n]) => [n, p.nome, p.slug]);
const todasObras = () => produtos.flatMap(fotosDe);

// Corte dos vidros desenhado (versão B): camadas em escala aproximada
function corteVidro(id) {
  const ch = (y, h, cls = 'vd') => `<rect class="${cls}" x="20" y="${y}" width="200" height="${h}" rx="1.5"/>`;
  const d = {
    comum: ch(44, 22),
    laminado: ch(30, 18) + `<rect class="pvb" x="20" y="48" width="200" height="6"/>` + ch(54, 18),
    temperado: ch(38, 30, 'vd tp') + '<path class="tens" d="M28 44h184M28 62h184" stroke-dasharray="3 5"/>',
    espelhado: ch(40, 22) + '<rect class="prata" x="20" y="62" width="200" height="5"/>',
  }[id];
  return `<svg class="corte" viewBox="10 22 220 56" aria-hidden="true">${d}</svg>`;
}

// ---------- páginas ----------
function home(v) {
  if (v === 'a') {
    const slides = destaques.map((d, i) => `<div class="a-slide${i ? '' : ' on'}" role="group" aria-roledescription="destaque" aria-label="${i + 1} de ${destaques.length}"><div class="w a-slide-g">
      <figure class="a-moldura">${img(d.foto, d.titulo, { lazy: i > 0 })}</figure>
      <div class="a-slide-t"><p class="a-slide-n">0${i + 1}</p><h2>${d.titulo}</h2><p>${P[d.slug].curto}</p><a class="bt bt-branco" href="/a/produtos/${d.slug}/">Ver ${d.titulo.toLowerCase()} ${ic('seta')}</a></div>
    </div></div>`).join('');
    const mosaico = produtos.map(p => `<a class="a-mos-i${['guarda-corpos', 'coberturas'].includes(p.slug) ? ' a-mos-g' : ''}" href="/a/produtos/${p.slug}/">${img(p.capa, p.nome)}<span><b>${p.nome}</b><small>${p.curto}</small></span></a>`).join('');
    return pagina(v, '', 'index', 'Vidraçaria Chile · Vidraçaria em Curitiba há 40 anos', 'Box para banheiro, vidros temperados, espelhos, coberturas, guarda-corpos, muros de vidro, fachadas e esquadrias de alumínio em Curitiba, desde 1976.', `
<section class="a-hero" data-slides aria-label="Destaques">
  ${slides}
  <button class="a-hero-seta a-ant" type="button" aria-label="Destaque anterior">${ic('esq')}</button><button class="a-hero-seta a-prox" type="button" aria-label="Próximo destaque">${ic('dir')}</button>
  <div class="a-hero-pts">${destaques.map((d, i) => `<button type="button" aria-label="${d.titulo}"${i ? '' : ' aria-selected="true"'}></button>`).join('')}</div>
</section>
<section class="a-sobre"><div class="w a-sobre-g">
  <div><h2 class="a-tit">Sobre a empresa</h2><p class="a-lead">${resumo}</p><p>Na mesma rua desde 1980, com loja, showroom e equipe própria de instalação. A maioria dos nossos clientes chega por indicação.</p><a class="bt" href="/a/empresa/">Conheça a nossa história ${ic('seta')}</a></div>
  <figure class="a-sobre-f">${img('loja', 'Fachada da Vidraçaria Chile na Rua João Negrão, 2150')}<figcaption>${ic('pin')} Rua João Negrão, 2150 · Rebouças</figcaption></figure>
  <ul class="a-num"><li><b>${E.fundacao}</b><span>fundada na Rua Chile, no Rebouças</span></li><li><b>40+</b><span>anos de vidraçaria em Curitiba</span></li><li><b>10</b><span>linhas de produtos e serviços</span></li></ul>
</div></section>
<section class="a-prod"><div class="w"><h2 class="a-tit">Produtos e serviços</h2><div class="a-mos">${mosaico}</div></div></section>
<section class="a-wa"><div class="w a-wa-g">${ic('wa', 'a-wa-ic')}<div><h2>Pensando na sua comodidade, também estamos no WhatsApp</h2><p>Solicite o seu orçamento, envie fotos e medidas do vão e tire suas dúvidas sem sair de casa.</p></div><a class="bt bt-branco" href="${waLink()}" ${ext}>${E.fones[0].n} ${ic('seta')}</a></div></section>
<section class="a-info"><div class="w a-info-g">
  <div><h2 class="a-tit">Opções de pagamento</h2><ul class="a-pag">${E.pagamento.map(p => `<li>${ic(p === 'Boleto' ? 'regua' : 'cartao')}${p}</li>`).join('')}</ul></div>
  <div><h2 class="a-tit">Fornecedores</h2><img class="a-forn" src="/assets/img/fornecedores.webp" alt="InterBox, vidros temperados e laminados de segurança, e Real Vidros distribuidora" width="444" height="128" loading="lazy"><p class="a-forn-t">Espelhos das linhas Cebrace Optimirror e Guardian.</p></div>
  <div><h2 class="a-tit">Curta nossa página</h2><p>Acompanhe as obras e novidades da Vidraçaria Chile no Facebook.</p><a class="bt bt-linha" href="${E.facebook}" ${ext}>${ic('fb')} facebook.com/vidracariachile</a></div>
</div></section>`);
  }
  // B
  const amb = ambientes.map((a, i) => `<div class="b-amb-p" role="tabpanel" id="amb-${a.id}" aria-labelledby="amb-t-${a.id}"${i ? ' hidden' : ''}>
    ${img(a.foto, a.nome)}
    <div><p>${a.texto}</p><ul class="b-chips">${a.slugs.map(s => `<li><a href="/b/produtos/${s}/">${P[s].nome} ${ic('seta')}</a></li>`).join('')}</ul></div></div>`).join('');
  const obras = ['guarda-13', 'coberturas-16', 'fachadas-03', 'box-02', 'temperados-26', 'muros-02', 'coberturas-33', 'espelhos-03', 'guarda-16'];
  const nomeDe = n => produtos.find(p => n.startsWith(p.cat + '-'))?.nome || '';
  return pagina(v, '', 'index', 'Vidraçaria Chile · Vidros, box e coberturas em Curitiba desde 1976', 'Box para banheiro, vidros temperados, espelhos, coberturas, guarda-corpos, muros de vidro, fachadas e esquadrias de alumínio em Curitiba, desde 1976.', `
<section class="b-hero"><div class="w b-hero-g">
  <div class="b-hero-t">
    <p class="b-sobre">Vidraçaria em Curitiba · desde ${E.fundacao}</p>
    <h1>Vidro sob medida, da Rua Chile para Curitiba inteira.</h1>
    <p class="b-lead">Box, vidros temperados, espelhos, coberturas, guarda-corpos, muros de vidro, fachadas e esquadrias de alumínio. Medimos, fabricamos e instalamos.</p>
    <div class="b-bts"><a class="bt" href="${waLink()}" ${ext}>${ic('wa')} Pedir orçamento</a><a class="bt bt-linha" href="/b/produtos/">Ver produtos</a></div>
    ${curva('curva b-hero-curva')}
  </div>
  <div class="b-hero-f">${img('guarda-34', 'Escada com guarda-corpo de vidro instalado pela Vidraçaria Chile', { lazy: false })}<figure class="b-hero-f2">${img('coberturas-10', 'Cobertura de vidro sobre jardim')}</figure><p class="b-hero-end">${ic('pin')} ${E.endereco} · ${E.bairro}</p></div>
</div></section>
<section class="b-faixa" aria-label="Produtos"><div class="w"><ul>${produtos.map(p => `<li><a href="/b/produtos/${p.slug}/">${p.nome}</a></li>`).join('')}</ul></div></section>
<section class="b-sec b-amb"><div class="w">
  <div class="b-cab-sec"><p class="b-sobre">Qual é o seu projeto?</p><h2>Escolha o ambiente e veja o que fazemos para ele.</h2></div>
  <div data-abas><div class="b-amb-tabs" role="tablist">${ambientes.map((a, i) => `<button role="tab" id="amb-t-${a.id}" aria-controls="amb-${a.id}" aria-selected="${!i}">${a.nome}</button>`).join('')}</div>${amb}</div>
</div></section>
<section class="b-sec b-vidros"><div class="w">
  <div class="b-cab-sec"><p class="b-sobre">Conheça o vidro</p><h2>Quatro vidros, quatro usos.</h2><p>O vidro certo depende do lugar: uma janela, um box, uma cobertura ou uma fachada pedem coisas diferentes. Este é o corte de cada um.</p></div>
  <div class="b-vid-g">${vidros.map(x => `<article class="b-vid">${corteVidro(x.id)}<p class="b-vid-esp">${x.esp}</p><h3>${x.nome}</h3><p>${x.texto}</p></article>`).join('')}</div>
</div></section>
<section class="b-sec b-fases"><div class="w">
  <div class="b-cab-sec"><p class="b-sobre">Desde ${E.fundacao}</p><h2>Quatro fases de uma vidraçaria de bairro.</h2></div>
  <ol class="b-linha">${fases.map(f => `<li><span class="b-linha-ano">${f.ano}</span><h3>${f.titulo}</h3><p>${f.texto}</p></li>`).join('')}</ol>
  <blockquote class="b-cit"><p>“${citacao}”</p><cite>Vidraçaria Chile, sobre os seus 40 anos</cite></blockquote>
</div></section>
<section class="b-sec b-obras"><div class="w">
  <div class="b-cab-sec b-cab-lado"><div><p class="b-sobre">Obras</p><h2>Feito pela nossa equipe.</h2></div><a class="bt bt-linha" href="/b/obras/">Ver todas as ${todasObras().length} fotos ${ic('seta')}</a></div>
  ${galeria(obras.map(n => [n, nomeDe(n)]), 'b-mosaico')}
</div></section>
${contatoB()}`);
}

function contatoB() {
  return `<section class="b-sec b-cont"><div class="w b-cont-g">
  <div><p class="b-sobre">Visite a loja</p><h2>Rua João Negrão, 2150.</h2><p>No Rebouças, perto do Centro de Curitiba, na mesma rua desde 1980. Traga as medidas ou mande fotos do vão pelo WhatsApp.</p>
    <dl class="b-dl"><div><dt>${ic('tel')} Telefones</dt><dd>${E.fones.map(f => `<a href="tel:${f.href}">${f.n}</a>`).join('<br>')}</dd></div><div><dt>${ic('relogio')} Atendimento</dt><dd>Segunda a sexta<br>08h às 12h e 13h às 18h</dd></div></dl>
    <div class="b-bts"><a class="bt" href="${waLink()}" ${ext}>${ic('wa')} WhatsApp ${E.fones[0].n}</a><a class="bt bt-linha" href="${E.mapa}" ${ext}>${ic('pin')} Como chegar</a></div></div>
  <iframe class="mapa" src="${E.mapaEmbed}" title="Mapa: Vidraçaria Chile, Rua João Negrão 2150" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div></section>`;
}

function empresaPg(v) {
  const titulo = 'Sobre a empresa · Vidraçaria Chile';
  const desc = 'A Vidraçaria Chile nasceu em 1974 na Rua Chile, no Rebouças, e está na Rua João Negrão desde 1980. Conheça a história, a missão e os valores.';
  const cult = `<div class="mvv"><div><h3>Missão</h3><p>${cultura.missao}</p></div><div><h3>Visão</h3><p>${cultura.visao}</p></div><div><h3>Valores</h3><ul>${cultura.valores.map(x => `<li>${ic('ok')}${x}</li>`).join('')}</ul></div></div>`;
  if (v === 'a') return pagina(v, 'empresa/', 'empresa', titulo, desc, `
<div class="a-pg-tit"><div class="w"><p class="trilha"><a href="/a/">Home</a> / Sobre a Empresa</p><h1>Sobre a empresa</h1></div></div>
<section class="a-sec"><div class="w a-emp-g">
  <div class="a-texto">${historia.map(p => `<p>${p}</p>`).join('')}</div>
  <aside><figure class="a-sobre-f">${img('loja', 'Loja da Vidraçaria Chile na Rua João Negrão')}<figcaption>${ic('pin')} Rua João Negrão, 2150, desde 1980</figcaption></figure>
  <ol class="a-fases">${fases.map(f => `<li><b>${f.ano}</b><span>${f.titulo}</span></li>`).join('')}</ol></aside>
</div></section>
<section class="a-cit"><div class="w"><blockquote><p>“${citacao}”</p></blockquote></div></section>
<section class="a-sec"><div class="w">${cult}</div></section>`);
  return pagina(v, 'empresa/', 'empresa', titulo, desc, `
<section class="b-pg-tit"><div class="w"><p class="trilha"><a href="/b/">Início</a> / A empresa</p><h1>Da Rua Chile à João Negrão, desde ${E.fundacao}.</h1>${curva('curva b-pg-curva')}</div></section>
<section class="b-sec"><div class="w b-emp-g">
  <div class="b-texto"><p class="b-lead">${historia[0]}</p>${historia.slice(1).map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="b-emp-f">${img('loja', 'Loja da Vidraçaria Chile na Rua João Negrão')}<figcaption>A loja na Rua João Negrão, 2150</figcaption></figure>
</div></section>
<section class="b-sec b-fases"><div class="w">
  <div class="b-cab-sec"><p class="b-sobre">Quatro fases</p><h2>Do vidro comum à fachada inteira.</h2></div>
  <ol class="b-linha b-linha-f">${fases.map(f => `<li>${f.foto ? img(f.foto, f.titulo) : `<span class="b-linha-sem">${ic('regua')}<b>Mesa de corte</b></span>`}<span class="b-linha-ano">${f.ano}</span><h3>${f.titulo}</h3><p>${f.texto}</p></li>`).join('')}</ol>
  <blockquote class="b-cit"><p>“${citacao}”</p></blockquote>
</div></section>
<section class="b-sec"><div class="w">${cult}</div></section>
${contatoB()}`);
}

function produtosPg(v) {
  const titulo = 'Produtos e serviços · Vidraçaria Chile';
  const desc = 'Vidros, temperados, espelhos, box, guarda-corpos e escadas, fachadas, coberturas, muros de vidro, esquadrias de alumínio e acessórios.';
  if (v === 'a') return pagina(v, 'produtos/', 'produtos', titulo, desc, `
<div class="a-pg-tit"><div class="w"><p class="trilha"><a href="/a/">Home</a> / Produtos e Serviços</p><h1>Produtos e serviços</h1></div></div>
<section class="a-sec"><div class="w a-lat-g">
  <aside class="a-lat"><h2>Produtos e Serviços</h2><nav>${menuProdutos('a')}</nav></aside>
  <div class="a-lista">${produtos.map(p => `<a class="a-lista-i" href="/a/produtos/${p.slug}/">${img(p.capa, p.nome)}<div><h2>${p.nome}</h2><p>${p.curto}</p><span>Ver fotos e detalhes ${ic('seta')}</span></div></a>`).join('')}</div>
</div></section>`);
  return pagina(v, 'produtos/', 'produtos', titulo, desc, `
<section class="b-pg-tit"><div class="w"><p class="trilha"><a href="/b/">Início</a> / Produtos</p><h1>Tudo em vidro, do parafuso à fachada.</h1>${curva('curva b-pg-curva')}</div></section>
<section class="b-sec"><div class="w"><ol class="b-plist">${produtos.map((p, i) => `<li><a href="/b/produtos/${p.slug}/"><span class="b-plist-n">${String(i + 1).padStart(2, '0')}</span>${img(p.capa, p.nome)}<span class="b-plist-t"><b>${p.nome}</b><small>${p.curto}</small></span>${ic('seta')}</a></li>`).join('')}</ol></div></section>
${contatoB()}`);
}

function produtoPg(v, p) {
  const titulo = `${p.nome} · Vidraçaria Chile`;
  const desc = `${p.curto} Vidraçaria Chile, Curitiba.`;
  const wa = waLink(`Olá! Vim pelo site da Vidraçaria Chile e gostaria de um orçamento de ${p.nome.toLowerCase()}.`);
  const fs = fotosDe(p);
  const outros = produtos.filter(o => o !== p);
  if (v === 'a') return pagina(v, `produtos/${p.slug}/`, 'produtos', titulo, desc, `
<div class="a-pg-tit"><div class="w"><p class="trilha"><a href="/a/">Home</a> / <a href="/a/produtos/">Produtos e Serviços</a> / ${p.nome}</p><h1>${p.nome}</h1></div></div>
<section class="a-sec"><div class="w a-lat-g">
  <aside class="a-lat"><h2>Produtos e Serviços</h2><nav>${menuProdutos('a', p.slug)}</nav></aside>
  <div>
    <div class="a-prod-g"><div class="a-texto">${p.texto.map(t => `<p>${t}</p>`).join('')}<ul class="a-itens">${p.itens.map(x => `<li>${ic('ok')}${x}</li>`).join('')}</ul>
      <div class="a-bts"><a class="bt" href="${wa}" ${ext}>${ic('wa')} Orçamento pelo WhatsApp</a><a class="bt bt-linha" href="/a/contato/#orcamento">Enviar medidas</a></div></div>
      <figure class="a-moldura a-moldura-p">${img(p.capa, p.nome, { lazy: false })}</figure></div>
    ${fs.length > 1 ? `<h2 class="a-tit">Galeria · ${fs.length} fotos</h2>${galeria(fs.map(([n, l]) => [n, l]))}` : ''}
  </div>
</div></section>`, p.slug);
  return pagina(v, `produtos/${p.slug}/`, 'produtos', titulo, desc, `
<section class="b-prod-h"><div class="w b-prod-hg">
  <div><p class="trilha"><a href="/b/">Início</a> / <a href="/b/produtos/">Produtos</a> / ${p.nome}</p><h1>${p.nome}</h1><p class="b-lead">${p.curto}</p>
  <div class="b-bts"><a class="bt" href="${wa}" ${ext}>${ic('wa')} Pedir orçamento</a>${fs.length > 1 ? `<a class="bt bt-linha" href="#fotos">${ic('foto')} ${fs.length} fotos</a>` : ''}</div></div>
  ${img(p.capa, p.nome, { lazy: false, cls: 'b-prod-capa' })}
</div></section>
<section class="b-sec"><div class="w b-prod-g">
  <div class="b-texto">${p.texto.map(t => `<p>${t}</p>`).join('')}</div>
  <div class="b-espec"><h2>O que fazemos</h2><ul>${p.itens.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>
${fs.length > 1 ? `<section class="b-sec b-sec-gal" id="fotos"><div class="w"><div class="b-cab-sec"><p class="b-sobre">Obras</p><h2>${p.nome}: obras da nossa equipe.</h2></div>${galeria(fs.map(([n, l]) => [n, l]), 'b-mosaico')}</div></section>` : ''}
<section class="b-sec b-outros"><div class="w"><h2>Outros produtos</h2><ul class="b-chips">${outros.map(o => `<li><a href="/b/produtos/${o.slug}/">${o.nome} ${ic('seta')}</a></li>`).join('')}</ul></div></section>
${contatoB()}`, p.slug);
}

function obrasPg(v) {
  const titulo = 'Obras · Vidraçaria Chile';
  const desc = 'Fotos de box, guarda-corpos, coberturas, fachadas, muros de vidro e esquadrias instalados pela Vidraçaria Chile em Curitiba.';
  const filtro = `<div class="filtro" role="group" aria-label="Filtrar fotos"><button type="button" aria-pressed="true" data-cat="">Todas</button>${produtos.filter(p => fotos[p.cat].length > 1).map(p => `<button type="button" aria-pressed="false" data-cat="${p.slug}">${p.nome}</button>`).join('')}</div>`;
  const gal = galeria(todasObras(), v === 'a' ? 'gal' : 'b-mosaico');
  if (v === 'a') return pagina(v, 'obras/', 'obras', titulo, desc, `
<div class="a-pg-tit"><div class="w"><p class="trilha"><a href="/a/">Home</a> / Obras</p><h1>Obras</h1></div></div>
<section class="a-sec"><div class="w" data-filtro>${filtro}${gal}</div></section>`);
  return pagina(v, 'obras/', 'obras', titulo, desc, `
<section class="b-pg-tit"><div class="w"><p class="trilha"><a href="/b/">Início</a> / Obras</p><h1>${todasObras().length} fotos de obras em Curitiba.</h1>${curva('curva b-pg-curva')}</div></section>
<section class="b-sec"><div class="w" data-filtro>${filtro}${gal}</div></section>
${contatoB()}`);
}

function contatoPg(v) {
  const titulo = 'Fale conosco · Vidraçaria Chile';
  const desc = 'Rua João Negrão, 2150, Rebouças, Curitiba. (41) 3333-5477 (também WhatsApp) e (41) 3333-8677. Segunda a sexta, 8h às 12h e 13h às 18h.';
  const form = `<form class="form" id="orcamento" data-orc>
    <h2>${v === 'a' ? 'Solicite um orçamento' : 'Peça um orçamento'}</h2>
    <p>Preencha e a mensagem abre pronta no WhatsApp da loja. Se tiver, mande também fotos do local.</p>
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>Telefone<input name="fone" type="tel" autocomplete="tel"></label>
    <label>Produto<select name="produto">${produtos.map(p => `<option>${p.nome}</option>`).join('')}<option>Outro</option></select></label>
    <label>Medidas aproximadas<input name="medidas" placeholder="ex.: vão de 1,20 x 2,10 m"></label>
    <label class="form-l">Mensagem<textarea name="msg" rows="4" placeholder="Bairro da obra, cor do vidro, prazo…"></textarea></label>
    <button class="bt" type="submit">${ic('wa')} Enviar pelo WhatsApp</button>
  </form>`;
  const dados = `<div class="cont-dados">
    <div><h3>${ic('tel')} Telefones</h3><p>${E.fones.map(f => `<a href="tel:${f.href}">${f.n}</a>${f.wa ? ' · também WhatsApp' : ''}`).join('<br>')}</p></div>
    <div><h3>${ic('relogio')} Atendimento</h3><p>Segunda a sexta: 08h às 12h e 13h às 18h<br>Fechado aos sábados e domingos</p></div>
    <div><h3>${ic('pin')} Localização</h3><p>${E.endereco}<br>${E.bairro} / Centro · ${E.cidade}<br>CEP ${E.cep}</p></div>
  </div>`;
  const mapa = `<iframe class="mapa" src="${E.mapaEmbed}" title="Mapa: Vidraçaria Chile, Rua João Negrão 2150" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  if (v === 'a') return pagina(v, 'contato/', 'contato', titulo, desc, `
<div class="a-pg-tit"><div class="w"><p class="trilha"><a href="/a/">Home</a> / Fale Conosco</p><h1>Fale conosco</h1></div></div>
<section class="a-sec"><div class="w a-cont-g">${form}<div>${dados}${mapa}</div></div></section>`);
  return pagina(v, 'contato/', 'contato', titulo, desc, `
<section class="b-pg-tit"><div class="w"><p class="trilha"><a href="/b/">Início</a> / Contato</p><h1>Mande as medidas, a gente cuida do resto.</h1>${curva('curva b-pg-curva')}</div></section>
<section class="b-sec"><div class="w b-cont2">${form}<div>${dados}${mapa}</div></div></section>`);
}

export function gerarVersao(v) {
  const pg = { index: home(v), empresa: empresaPg(v), produtos: produtosPg(v), obras: obrasPg(v), contato: contatoPg(v) };
  for (const p of produtos) pg[`produtos/${p.slug}`] = produtoPg(v, p);
  return pg;
}
