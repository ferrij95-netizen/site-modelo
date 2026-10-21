// Páginas das versões A ("Taquaral": fiel ao site atual, faixa verde de menu, coluna de fotos ao lado do texto)
// e B ("Mostruário": as pedras em primeiro plano, mostruário interativo, mármore × granito, orçamento em passos).
// Estilos em public/assets/{base,a,b}.css, script em site.js. Animações do kit componentes/apresentacao (apresenta.*).
import { empresa as E, sobre, pilares, etapas, pedras, ambientes, dicas, comparativo, pecas, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, { w = 1032, h = 776, cls = '', lazy = true } = {}) => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
const pedraImg = (p, opts = {}) => img(p.slug, `${p.tipo} ${p.nome}`, { w: 1032, h: 1032, ...opts });
const anos = new Date().getFullYear() - E.fundada;

export const nomesVersao = { a: 'Taquaral', b: 'Mostruário' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'dicas', nome: 'Dicas', caminho: 'dicas/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
  { slug: 'orcamento', nome: 'Orçamento', caminho: 'orcamento/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  regua: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  loja: '<path d="M4 10v10h16V10"/><path d="M2.5 10L5 4h14l2.5 6z"/><path d="M10 20v-5h4v5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Marca: o site atual não tem logo (o topo era um Flash com uma animação). Usamos o nome como no menu e no rodapé
// do site: Arial (Arimo) negrito itálico, azul do texto e o verde da barra de menu.
const marca = (cls = '') => `<span class="marca ${cls}"><b>W<i>&amp;</i>A</b><span>Mármores<br>e Granitos</span></span>`;

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
<meta property="og:site_name" content="${esc(E.nome)}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#0B1A8C' : '#EEF0F3'}">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,500;0,600;0,700;1,700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

const navLinks = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  if (v === 'a') return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="a-faixa"><div class="w"><span>${ic('pin')} ${E.rua} · ${E.bairro} · ${E.cidade}</span><span class="a-faixa-d"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></span></div></div>
<header class="a-cab"><div class="w">
  <a class="logo" href="/a/" aria-label="${esc(E.nome)}, página inicial">${marca()}</a>
  <p class="a-cab-desde">Desde ${E.fundada}<br><span>revestimentos, pisos e pedras</span></p>
  <a class="bt bt-v a-cab-bt" href="/a/orcamento/">Pedir orçamento ${ic('seta')}</a>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>
<nav class="a-menu" id="menu" aria-label="Principal"><div class="w">${navLinks(v, atual)}</div></nav>`;
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="b-cab"><div class="w">
  <a class="logo" href="/b/" aria-label="${esc(E.nome)}, página inicial">${marca('marca-b')}</a>
  <nav class="b-menu" id="menu" aria-label="Principal">${navLinks(v, atual)}<a class="b-menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  <a class="b-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rod rod-${v}">
<div class="w rod-g">
  <div class="rod-marca">${marca('marca-claro')}<p>Mármores e granitos nacionais e importados, beneficiados e instalados sob medida. Em Campinas desde ${E.fundada}.</p></div>
  <div><h3>Loja e parque industrial</h3><p>${E.rua}<br>${E.bairro} · ${E.cidade}</p><p><a href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></p></div>
  <div><h3>Atendimento</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a></p><p><a href="/${v}/orcamento/">Pedir orçamento com visita</a></p></div>
  <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('')}</ul></div>
</div>
<div class="w rod-base"><span>W&amp;A · ${E.rua} · ${E.bairro} · ${E.cidade} · Brasil · F: ${E.fone.replace(/[()]/g, '').replace(' ', ' - ')}</span><span class="rod-cred">${creditos}</span></div>
</footer>`;
}

const pagina = (v, slug, titulo, desc, corpo) => `${head(v, slug === 'index' ? '' : slug + '/', titulo, desc)}
<body class="v-${v} pg-${slug}">
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// Cabeçalho das páginas internas
function capa(v, { titulo, sub, foto, rotulo, pedra }) {
  if (v === 'a') return `<section class="a-capa"><div class="w"><div class="a-capa-t"><p class="a-migalha"><a href="/a/">Início</a> / ${rotulo}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div><figure class="a-capa-f">${img(foto, '', { lazy: false })}</figure></div></section>`;
  return `<section class="b-capa" style="--pedra:url(/assets/img/${pedra || 'calacata-gold'}.webp)"><div class="w"><p class="rot">${rotulo}</p><h1 data-palavras>${titulo}</h1>${sub ? `<p class="b-capa-sub">${sub}</p>` : ''}</div></section>`;
}

// ---------- blocos ----------
const ctaOrc = v => v === 'a'
  ? `<section class="a-orc"><div class="w"><div><h2>Orçamento com visita à obra</h2><p>Envie os dados da sua obra: entramos em contato para marcar uma visita, tirar as medidas e preparar o orçamento das peças em mármore ou granito.</p></div><div class="a-orc-b"><a class="bt bt-az" href="/a/orcamento/">Enviar dados da obra ${ic('seta')}</a><a class="bt bt-br" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>`
  : `<section class="b-cta"><div class="w"><p class="rot">Orçamento</p><h2>Nós vamos até a obra medir.</h2><p>Conte o que precisa e a pedra que gostou. A W&amp;A marca a visita, tira as medidas e prepara o orçamento.</p><div class="b-cta-b"><a class="bt bt-v" href="/b/orcamento/">Começar orçamento ${ic('seta')}</a><a class="bt bt-cl" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>`;

function formOrc(v, { completo = true, id = 'orcamento' } = {}) {
  const op = arr => arr.map(o => `<option>${esc(o)}</option>`).join('');
  const extra = completo ? `
    <label>Tipo de peça<select name="Peça">${op(pecas)}</select></label>
    <label>Pedra de interesse<select name="Pedra" data-pedra-sel><option>Ainda não sei, quero ajuda</option>${op(pedras.map(p => `${p.nome} (${p.tipo.toLowerCase()})`))}<option>Outra pedra / granito nacional</option></select></label>
    <label>Medidas aproximadas<input name="Medidas" placeholder="ex.: 12 degraus de 1,20 m"></label>
    <label>Bairro e cidade da obra<input name="Local da obra" placeholder="ex.: Cambuí, Campinas"></label>` : '';
  return `<form class="form" id="${id}" data-form="${completo ? 'Orçamento' : 'Contato'}">
  <div class="form-g">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email"></label>
    <label>Telefone fixo<input name="Telefone fixo" inputmode="tel" autocomplete="tel"></label>
    <label>Telefone celular<input name="Celular" inputmode="tel"></label>${extra}
    <label class="form-l">${completo ? 'Conte sobre a obra' : 'Sua mensagem'}<textarea name="Mensagem" rows="4"></textarea></label>
  </div>
  <div class="form-b"><button class="bt ${v === 'a' ? 'bt-az' : 'bt-v'}" type="submit">Enviar ${ic('seta')}</button><p class="form-nota">O envio abre o seu e-mail com tudo preenchido para ${E.email}.</p></div>
</form>`;
}

// ---------- páginas da versão A ----------
const A = {
  index() {
    return `<section class="a-hero"><div class="w a-hero-g">
  <div class="a-hero-fotos" data-rev-filhos data-rev-passo="140">
    <figure data-rev="esq">${img('corte-bloco', 'Bloco de granito sendo lavado no parque industrial', { lazy: false, w: 784, h: 584 })}</figure>
    <figure data-rev="esq">${img('bloco-bruto', 'Bloco bruto de granito no pátio', { lazy: false, w: 784, h: 584 })}</figure>
    <figure data-rev="esq">${img('patio-blocos', 'Pátio de blocos com ponte rolante', { w: 784, h: 584 })}</figure>
  </div>
  <div class="a-hero-t">
    <p class="rot">Marmoraria em Campinas · desde ${E.fundada}</p>
    <h1 data-palavras>Revestimentos, pisos e pedras em mármore e granito</h1>
    <p class="a-lead">${sobre.intro}</p>
    <p>${sobre.escolha}</p>
    <div class="a-hero-b"><a class="bt bt-az" href="/a/produtos/">Ver as pedras ${ic('seta')}</a><a class="bt bt-cl" href="/a/orcamento/">Pedir orçamento</a></div>
    <ul class="a-hero-n" data-rev-filhos><li><b data-conta>${anos}</b> anos de mercado</li><li><b>Nacionais</b> e importadas</li><li><b>Visita</b> para medir</li></ul>
  </div>
</div></section>

<section class="a-proc"><div class="w">
  <div class="a-tit"><p class="rot">Do bloco bruto à sua obra</p><h2>Como a pedra chega até você</h2></div>
  <ol class="a-proc-l" data-etapas><span class="ap-trilho"></span>
    ${etapas.map(e => `<li class="ap-etapa"><figure>${img(e.foto, e.t, { w: 784, h: 584 })}${e.banco ? '<figcaption>foto ilustrativa</figcaption>' : ''}</figure><b>${e.n}</b><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}
  </ol>
</div></section>

<section class="a-pedras"><div class="w">
  <div class="a-tit a-tit-l"><div><p class="rot">Produtos</p><h2>Algumas das nossas pedras</h2></div><a class="lk" href="/a/produtos/">Ver todas ${ic('seta')}</a></div>
  <ul class="a-pedras-g" data-rev-filhos data-rev-passo="90">
    ${pedras.map(p => `<li><a href="/a/produtos/#${p.slug}"><span class="a-pedra-f">${pedraImg(p, { w: 520, h: 520 })}</span><b>${p.nome}</b><small>${p.tipo}</small></a></li>`).join('')}
  </ul>
</div></section>

<section class="a-sobre"><div class="w a-sobre-g">
  <div><p class="rot">A empresa</p><h2>Qualidade e confiabilidade em cada peça</h2><p>${sobre.equipe}</p><p>${sobre.estrutura}</p><a class="lk" href="/a/empresa/">Conheça a W&amp;A ${ic('seta')}</a></div>
  <dl class="a-pilares">${pilares.map(p => `<div><dt>${p.t}</dt><dd>${p.d}</dd></div>`).join('')}</dl>
</div></section>

<section class="a-amb"><div class="w">
  <div class="a-tit"><p class="rot">Obras</p><h2>Onde a pedra entra</h2></div>
  <div class="a-amb-g">${ambientes.slice(0, 3).map((a, i) => `<figure class="a-amb-${i}" data-rev="zoom">${img(a.foto, a.t, { w: 784, h: 584 })}<figcaption><b>${a.t}</b>${a.d}</figcaption></figure>`).join('')}</div>
</div></section>
${ctaOrc('a')}`;
  },
  empresa() {
    return `${capa('a', { titulo: 'A empresa', sub: `Em Campinas desde ${E.fundada}, atendendo residências e comércio com mármores e granitos.`, foto: 'corte-bloco', rotulo: 'A empresa' })}
<section class="a-texto"><div class="w a-texto-g">
  <div class="a-texto-c">
    <p class="a-lead">${sobre.intro}</p>
    <p>${sobre.estrutura}</p>
    <p>${sobre.equipe}</p>
    <h2>As pedras</h2>
    <p>${sobre.pedras}</p>
    <p>${sobre.polimento}</p>
    <p>${sobre.jazidas}</p>
    <p>${sobre.parque}</p>
  </div>
  <aside class="a-ficha"><dl>
    <div><dt>Fundação</dt><dd>${E.fundada}</dd></div>
    <div><dt>Endereço</dt><dd>${E.rua}<br>${E.bairro} · ${E.cidade}</dd></div>
    <div><dt>Telefone</dt><dd><a href="tel:${E.foneHref}">${E.fone}</a></dd></div>
    <div><dt>Atuação</dt><dd>Revestimentos, pisos, escadas e pedras sob medida</dd></div>
  </dl></aside>
</div></section>
<section class="a-sobre a-sobre-2"><div class="w a-sobre-g">
  <div><p class="rot">Atendimento</p><h2>A escolha é sempre assistida</h2><p>${sobre.escolha}</p></div>
  <dl class="a-pilares">${pilares.map(p => `<div><dt>${p.t}</dt><dd>${p.d}</dd></div>`).join('')}</dl>
</div></section>
<section class="a-galeria"><div class="w"><div class="a-galeria-g">
  ${['bloco-bruto', 'patio-blocos', 'revestimento-preto', 'escada-granito'].map(f => `<figure data-rev>${img(f, '', { w: 784, h: 584 })}</figure>`).join('')}
</div></div></section>
${ctaOrc('a')}`;
  },
  produtos() {
    return `${capa('a', { titulo: 'Produtos', sub: 'Mármore ou granito, nacional ou importado: venha até a loja ver as chapas de perto.', foto: 'calacata-gold', rotulo: 'Produtos' })}
<section class="a-cat"><div class="w">
  <p class="a-cat-int">${sobre.jazidas} ${sobre.polimento}</p>
  <div class="a-cat-g">
  ${pedras.map((p, i) => `<article class="a-cat-i" id="${p.slug}" data-rev>
    <figure>${pedraImg(p, { w: 700, h: 700 })}</figure>
    <div><small>${p.tipo} · ${p.origem}</small><h2>${p.nome}</h2><dl><div><dt>Tons</dt><dd>${p.tons}</dd></div><div><dt>Indicada para</dt><dd>${p.uso}</dd></div></dl>
    <a class="lk" href="/a/orcamento/?pedra=${encodeURIComponent(p.nome)}">Orçamento com esta pedra ${ic('seta')}</a></div>
  </article>`).join('')}
  </div>
  <p class="a-cat-nota">${ic('loja')} Estas são algumas das pedras do nosso mostruário. Granitos nacionais e outras pedras: consulte a loja na ${E.rua}.</p>
</div></section>
${ctaOrc('a')}`;
  },
  dicas() {
    return `${capa('a', { titulo: 'Dicas', sub: 'Como conservar o seu mármore ou granito por muitos anos.', foto: 'escada-granito', rotulo: 'Dicas' })}
<section class="a-dicas"><div class="w a-dicas-g">
  <ol class="a-dicas-l">${dicas.map((d, i) => `<li data-rev><b>${String(i + 1).padStart(2, '0')}</b><div><h2>${d.t}</h2><p>${d.d}</p></div></li>`).join('')}</ol>
  <div class="a-dicas-f">${['escada-curva', 'revestimento-preto', 'escada-granito'].map(f => `<figure data-rev="dir">${img(f, '', { w: 784, h: 584 })}</figure>`).join('')}</div>
</div></section>
<section class="a-comp"><div class="w">
  <div class="a-tit"><p class="rot">Na hora de escolher</p><h2>Mármore ou granito?</h2></div>
  <div class="a-comp-g">
    <div>${img('crema-marfil', 'Mármore Crema Marfil', { w: 520, h: 520 })}<h3>Mármore</h3><ul>${comparativo.marmore.map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul></div>
    <div>${img('granito-textura', 'Granito polido', { w: 520, h: 390 })}<h3>Granito</h3><ul>${comparativo.granito.map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul></div>
  </div>
</div></section>
${ctaOrc('a')}`;
  },
  contato() {
    return `${capa('a', { titulo: 'Contato', sub: 'Seu contato é importante para nós.', foto: 'patio-blocos', rotulo: 'Contato' })}
<section class="a-cont"><div class="w a-cont-g">
  <div class="a-cont-d">
    <h2>Fale com a W&amp;A</h2>
    <ul>
      <li>${ic('pin')}<span><b>Loja</b>${E.rua} · ${E.bairro}<br>${E.cidade}</span></li>
      <li>${ic('tel')}<span><b>Telefone</b><a href="tel:${E.foneHref}">${E.fone}</a></span></li>
      <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
    </ul>
    <iframe class="mapa" src="${E.mapaEmbed}" title="Mapa: ${E.rua}, Campinas" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <div class="a-cont-f"><h2>Mande uma mensagem</h2>${formOrc('a', { completo: false, id: 'contato' })}</div>
</div></section>`;
  },
  orcamento() {
    return `${capa('a', { titulo: 'Orçamento', sub: 'Para facilitar o seu dia a dia, a W&A criou um diferencial: você envia os dados da obra e nós vamos até você.', foto: 'escada-curva', rotulo: 'Orçamento' })}
<section class="a-cont"><div class="w a-cont-g">
  <div class="a-cont-d">
    <h2>Como funciona</h2>
    <ol class="a-passos">
      <li><b>1</b><span><strong>Você envia os dados</strong>Tipo de peça, pedra e medidas aproximadas.</span></li>
      <li><b>2</b><span><strong>Marcamos a visita</strong>Entramos em contato para combinar o dia.</span></li>
      <li><b>3</b><span><strong>Medimos na obra</strong>A equipe tira as medidas certas no local.</span></li>
      <li><b>4</b><span><strong>Orçamento das peças</strong>Você recebe o orçamento em mármore ou granito.</span></li>
    </ol>
    <p class="a-cont-tel">Prefere ligar? <a href="tel:${E.foneHref}">${E.fone}</a></p>
  </div>
  <div class="a-cont-f"><h2>Dados da obra</h2>${formOrc('a')}</div>
</div></section>`;
  },
};

// ---------- páginas da versão B ----------
const mostruario = (v) => `<div class="b-most" data-most>
  <figure class="b-most-f">${pedras.map((p, i) => `<img src="/assets/img/${p.slug}.webp" alt="${esc(p.tipo + ' ' + p.nome)}" width="1032" height="1032" loading="${i ? 'lazy' : 'eager'}" data-most-img="${i}"${i ? ' hidden' : ''}>`).join('')}</figure>
  <div class="b-most-d">
    <ul class="b-most-l" role="tablist" aria-label="Pedras">${pedras.map((p, i) => `<li><button type="button" role="tab" aria-selected="${i ? 'false' : 'true'}" data-most-bt="${i}"><span style="background-image:url(/assets/img/${p.slug}.webp)"></span>${p.nome}</button></li>`).join('')}</ul>
    ${pedras.map((p, i) => `<div class="b-most-info" data-most-info="${i}"${i ? ' hidden' : ''}><small>${p.tipo} · ${p.origem}</small><h3>${p.nome}</h3><dl><div><dt>Tons</dt><dd>${p.tons}</dd></div><div><dt>Indicada para</dt><dd>${p.uso}</dd></div></dl><a class="bt bt-v" href="/${v}/orcamento/?pedra=${encodeURIComponent(p.nome)}">Quero esta pedra ${ic('seta')}</a></div>`).join('')}
  </div>
</div>`;

const B = {
  index() {
    return `<section class="b-hero"><div class="w b-hero-g">
  <div class="b-hero-t">
    <p class="rot">Marmoraria · Campinas · desde ${E.fundada}</p>
    <h1 data-palavras>A pedra certa para cada ambiente.</h1>
    <p class="b-lead">Mármores e granitos nacionais e importados, das melhores jazidas do mundo, com polimento especial e instalação sob medida.</p>
    <div class="b-hero-b"><a class="bt bt-v" href="/b/produtos/">Abrir o mostruário ${ic('seta')}</a><a class="bt bt-cl" href="/b/orcamento/">Pedir orçamento</a></div>
  </div>
  <div class="b-leque" aria-hidden="true">${pedras.map((p, i) => `<span style="--i:${i};background-image:url(/assets/img/${p.slug}.webp)"><em>${p.nome}</em></span>`).join('')}</div>
</div>
<ul class="w b-hero-n" data-rev-filhos><li><b data-conta>${anos}</b><span>anos em Campinas</span></li><li><b>6</b><span>pedras importadas no mostruário</span></li><li><b>${ic('regua')}</b><span>visita para medir na obra</span></li><li><b>${ic('loja')}</b><span>loja no Taquaral</span></li></ul>
</section>

<section class="b-sec"><div class="w">
  <div class="b-tit"><p class="rot">Mostruário</p><h2>Escolha olhando a pedra.</h2><p>Toque em cada nome para ver a chapa. Na loja, a equipe ajuda a escolher a ideal para o seu ambiente.</p></div>
  ${mostruario('b')}
</div></section>

<section class="b-sec b-sec-esc"><div class="w">
  <div class="b-tit"><p class="rot">Do bloco à obra</p><h2>Cinco etapas até a peça pronta.</h2></div>
  <ol class="b-etapas" data-etapas><span class="ap-trilho"></span>
  ${etapas.map(e => `<li class="ap-etapa"><span class="b-etapa-n">${e.n}</span><div><h3>${e.t}</h3><p>${e.d}</p></div><figure>${img(e.foto, e.t, { w: 784, h: 584 })}${e.banco ? '<figcaption>foto ilustrativa</figcaption>' : ''}</figure></li>`).join('')}
  </ol>
</div></section>

<section class="b-sec"><div class="w">
  <div class="b-tit"><p class="rot">Ambientes</p><h2>Onde aplicamos.</h2></div>
  <div class="b-amb" data-rev-filhos data-rev-passo="100">${ambientes.map((a, i) => `<figure class="b-amb-${i}">${img(a.foto, a.t, { w: 1032, h: 776 })}<figcaption><b>${a.t}</b><span>${a.d}</span></figcaption></figure>`).join('')}</div>
</div></section>

<section class="b-sec b-sec-comp"><div class="w">${comparar()}</div></section>
${ctaOrc('b')}`;
  },
  empresa() {
    return `${capa('b', { titulo: `${anos} anos de pedra em Campinas.`, sub: sobre.intro, rotulo: 'A empresa', pedra: 'grigio-argento' })}
<section class="b-sec"><div class="w b-emp">
  <figure class="b-emp-f" data-rev="esq">${img('corte-bloco', 'Bloco de granito sendo lavado no parque industrial', { w: 784, h: 584 })}<figcaption>Parque industrial da W&amp;A</figcaption></figure>
  <div class="b-emp-t"><p>${sobre.estrutura}</p><p>${sobre.equipe}</p><p>${sobre.pedras} ${sobre.polimento}</p><p>${sobre.jazidas} ${sobre.parque}</p></div>
</div></section>
<section class="b-sec b-sec-esc"><div class="w">
  <div class="b-tit"><p class="rot">Por que a W&amp;A</p><h2>O que não muda desde ${E.fundada}.</h2></div>
  <ol class="b-pil" data-rev-filhos data-rev-passo="110">${pilares.map((p, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>
</div></section>
<section class="b-sec"><div class="w b-faixa-fotos">${['bloco-bruto', 'patio-blocos', 'revestimento-preto'].map(f => `<figure data-rev>${img(f, '', { w: 784, h: 584 })}</figure>`).join('')}</div></section>
${ctaOrc('b')}`;
  },
  produtos() {
    return `${capa('b', { titulo: 'Mostruário de pedras.', sub: 'Mármore ou granito, nacional ou importado: a escolha é sempre assistida pela equipe da W&A.', rotulo: 'Produtos', pedra: 'crema-marfil' })}
<section class="b-sec"><div class="w">${mostruario('b')}</div></section>
<section class="b-sec b-sec-esc"><div class="w">
  <div class="b-tit"><p class="rot">Todas as pedras</p><h2>Lado a lado.</h2></div>
  <div class="b-tabela" role="table" aria-label="Pedras do mostruário">
    <div class="b-tab-l b-tab-h" role="row"><span role="columnheader">Pedra</span><span role="columnheader">Tipo</span><span role="columnheader">Tons</span><span role="columnheader">Indicada para</span></div>
    ${pedras.map(p => `<a class="b-tab-l" role="row" href="/b/orcamento/?pedra=${encodeURIComponent(p.nome)}"><span role="cell"><i style="background-image:url(/assets/img/${p.slug}.webp)"></i>${p.nome}</span><span role="cell">${p.tipo}<small>${p.origem}</small></span><span role="cell">${p.tons}</span><span role="cell">${p.uso}</span></a>`).join('')}
  </div>
  <p class="b-nota">${ic('loja')} Granitos nacionais e outras pedras: consulte a loja na ${E.rua}, ${E.bairro}.</p>
</div></section>
${ctaOrc('b')}`;
  },
  dicas() {
    return `${capa('b', { titulo: 'Pedra bonita por muitos anos.', sub: 'Quatro cuidados simples para o seu mármore ou granito.', rotulo: 'Dicas', pedra: 'onix-arco-iris' })}
<section class="b-sec"><div class="w b-dicas">
  ${dicas.map((d, i) => `<article data-rev><span>${String(i + 1).padStart(2, '0')}</span><h2>${d.t}</h2><p>${d.d}</p></article>`).join('')}
</div></section>
<section class="b-sec b-sec-comp"><div class="w">${comparar()}</div></section>
${ctaOrc('b')}`;
  },
  contato() {
    return `${capa('b', { titulo: 'Venha ver as pedras de perto.', sub: 'Loja e parque industrial no Taquaral, em Campinas.', rotulo: 'Contato', pedra: 'rosso-verona' })}
<section class="b-sec"><div class="w b-cont">
  <div class="b-cont-d">
    <dl>
      <div><dt>Endereço</dt><dd>${E.rua}<br>${E.bairro} · ${E.cidade}<br><a href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa ${ic('seta')}</a></dd></div>
      <div><dt>Telefone</dt><dd><a href="tel:${E.foneHref}">${E.fone}</a></dd></div>
      <div><dt>E-mail</dt><dd><a href="mailto:${E.email}">${E.email}</a></dd></div>
    </dl>
    <iframe class="mapa" src="${E.mapaEmbed}" title="Mapa: ${E.rua}, Campinas" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <div class="b-cont-f"><h2>Mande uma mensagem</h2>${formOrc('b', { completo: false, id: 'contato' })}</div>
</div></section>`;
  },
  orcamento() {
    return `${capa('b', { titulo: 'Orçamento com visita à obra.', sub: 'Você envia os dados da obra, nós marcamos a visita, tiramos as medidas e preparamos o orçamento.', rotulo: 'Orçamento', pedra: 'crema-valencia' })}
<section class="b-sec"><div class="w b-orc">
  <ol class="b-orc-p" data-rev-filhos><li><b>1</b>Dados da obra</li><li><b>2</b>Visita para medir</li><li><b>3</b>Orçamento das peças</li><li><b>4</b>Produção e instalação</li></ol>
  <div class="b-orc-f">${formOrc('b')}</div>
</div></section>`;
  },
};

function comparar() {
  return `<div class="b-comp">
  <div class="b-comp-l" style="--pedra:url(/assets/img/calacata-gold.webp)"><p class="rot">Mármore</p><h3>Elegância e veios marcantes</h3><ul>${comparativo.marmore.map(t => `<li>${t}</li>`).join('')}</ul></div>
  <div class="b-comp-x" aria-hidden="true">ou</div>
  <div class="b-comp-l b-comp-g" style="--pedra:url(/assets/img/granito-textura.webp)"><p class="rot">Granito</p><h3>Resistência para o dia a dia</h3><ul>${comparativo.granito.map(t => `<li>${t}</li>`).join('')}</ul></div>
</div>`;
}

const meta = {
  index: ['W&A Mármores e Granitos · Marmoraria em Campinas desde 2001', 'Revestimentos, pisos, escadas e pedras em mármore e granito, nacionais e importados. Loja e parque industrial no Taquaral, Campinas.'],
  empresa: ['A empresa · W&A Mármores e Granitos', 'Fundada em 2001 em Campinas, a W&A atende projetos de revestimentos, pisos e pedras em mármore e granito.'],
  produtos: ['Produtos · W&A Mármores e Granitos', 'Calacata Gold, Crema Marfil, Crema Valencia, Grigio Argento, Rosso Verona e Ônix Arco-Íris.'],
  dicas: ['Dicas de conservação · W&A Mármores e Granitos', 'Como cuidar do seu mármore ou granito, e qual escolher para cada ambiente.'],
  contato: ['Contato · W&A Mármores e Granitos', `${E.rua}, ${E.bairro}, ${E.cidade} · ${E.fone}`],
  orcamento: ['Orçamento · W&A Mármores e Granitos', 'Envie os dados da sua obra: a W&A marca a visita, mede e prepara o orçamento.'],
};

export function gerarVersao(v) {
  const P = v === 'a' ? A : B;
  return Object.fromEntries(nav.map(n => [n.slug, pagina(v, n.slug, ...meta[n.slug], P[n.slug]())]));
}
