// Monta as páginas das versões A ("Muro": o azul do site atual e o letreiro pintado no muro da fábrica, longa e direta)
// e B ("Selo": o selo azul-marinho das fotos, "O melhor resultado, sempre!", com etapas e catálogo em abas).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, linhas, portao, etapas, frases, videos, aviso, tamanhos, fotosDe, legenda } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, extra = '', alt = legenda(n)) => {
  const [w, h] = tamanhos[n];
  return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${/loading=/.test(extra) ? '' : ' loading="lazy"'} decoding="async"${extra}>`;
};
const fig = (n, cls = '') => `<figure${cls ? ` class="${cls}"` : ''}>${img(n)}<figcaption>${esc(legenda(n))}</figcaption></figure>`;

export const nomesVersao = { a: 'Muro', b: 'Selo' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'portoes', nome: 'Portão seguro', caminho: 'portoes/' },
  { slug: 'obras', nome: 'Obras', caminho: 'obras/' },
  { slug: 'alumac', nome: 'A Alumac', caminho: 'alumac/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
  cartao: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  alerta: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
  fabrica: '<path d="M3 21V10l6 4V10l6 4V5h6v16z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Alumac e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;

// Marca: não há arquivo de logo. A versão A usa o letreiro pintado no muro da fábrica; a B, o selo azul-marinho das fotos.
const marca = v => v === 'a'
  ? `<span class="logo-muro"><b>ALUMAC</b><small>Montagem de Alumínio</small></span>`
  : `<span class="logo-selo"><b>ALUMAC</b><small>${E.slogan}</small></span>`;

function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
  const fontes = v === 'a'
    ? 'family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600'
    : 'family=Tinos:wght@400;700&family=Inter:wght@400;500;600;700';
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
<meta name="theme-color" content="${v === 'a' ? '#336699' : '#0F1C4D'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const faixa = `<div class="faixa"><div class="in">
  <span>${ic('pin')} ${E.endereco[0]}, Fortaleza</span>
  <span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></span>
  <span class="so-pc">${ic('cartao')} ${E.cartao}</span>
</div></div>`;
  return `${faixa}
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Alumac, início">${marca(v)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Pedir orçamento</a></nav>
  <a class="btn-topo" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')}<span>Orçamento</span></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${marca(v)}<p>Fabricação e montagem de portões, janelas, portas, grades, corrimãos e guarda-roupas de alumínio em Fortaleza.</p></div>
  <div><h3>Fábrica e loja</h3><p>${E.endereco.join('<br>')}</p><p><a href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa</a></p></div>
  <div><h3>Telefones</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br>${E.celulares.map(c => `<a href="https://wa.me/${c.h}" target="_blank" rel="noopener">${c.n}</a>`).join('<br>')}</p></div>
  <div><h3>Páginas</h3><p class="rod-nav">${menu(v, '')}</p></div>
</div>
<div class="in rod-fim"><span>© ${new Date().getFullYear()} ${E.completo}. ${E.cartao}.</span><span><a href="${E.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${E.youtube}" target="_blank" rel="noopener">YouTube</a></span></div>
</footer>
<a class="wa-flutua" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, slug === 'index' ? '' : slug + '/', titulo, descricao)}
<body class="v-${v} p-${slug}">
${topo(v, slug)}
<main>
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- blocos compartilhados ----------

// Desenho do portão visto da rua: do jeito Alumac (lambri liso) e invertido (estrutura e parafusos para fora).
const desenhoPortao = (invertido) => {
  const lam = Array.from({ length: 13 }, (_, i) => `<line x1="${22 + i * 12}" y1="40" x2="${22 + i * 12}" y2="196"/>`).join('');
  const band = Array.from({ length: 13 }, (_, i) => `<rect x="${20 + i * 12}" y="14" width="6" height="20" rx="1"/>`).join('');
  const estrutura = invertido ? `<g class="dp-estr"><rect x="16" y="36" width="168" height="8"/><rect x="16" y="112" width="168" height="8"/><rect x="16" y="188" width="168" height="8"/><line x1="20" y1="190" x2="180" y2="42"/>${[30, 70, 110, 150, 170].map(x => `<circle cx="${x}" cy="40" r="2.6"/><circle cx="${x}" cy="116" r="2.6"/>`).join('')}</g>` : '';
  return `<svg class="desenho-portao${invertido ? ' inv' : ''}" viewBox="0 0 200 210" role="img" aria-label="${invertido ? 'Portão com a estrutura invertida: tubos e parafusos do lado da rua' : 'Portão Alumac visto da rua: lambri liso, sem estrutura aparente'}">
<rect class="dp-quadro" x="8" y="6" width="184" height="198" rx="2"/><g class="dp-band">${band}</g><line class="dp-div" x1="8" y1="38" x2="192" y2="38"/><g class="dp-lam">${lam}</g><line class="dp-div" x1="100" y1="38" x2="100" y2="204"/><circle class="dp-maca" cx="92" cy="122" r="3"/>${estrutura}</svg>`;
};
const comparaPortao = () => `<div class="compara">
  <figure class="cp-ok">${desenhoPortao(false)}<figcaption><b>${ic('escudo')} Do jeito Alumac</b>Do lado da rua só o lambri. A estrutura fica do lado de dentro, como manda o fabricante.</figcaption></figure>
  <figure class="cp-nao">${desenhoPortao(true)}<figcaption><b>${ic('alerta')} Estrutura invertida</b>Tubos e parafusos para fora: dá para forçar o portão de fora para dentro. Jamais compre.</figcaption></figure>
</div>`;

const avisoBloco = () => `<aside class="aviso" aria-label="Aviso de golpe"><div class="in aviso-in">
  <span class="aviso-ic">${ic('alerta')}</span>
  <div><p class="aviso-t">Alumac informa</p><p>${esc(aviso)}</p></div>
</div></aside>`;

const video = (vd, cls = '') => `<button class="video ${cls}" type="button" data-video="${vd.id}" aria-label="Assistir: ${esc(vd.t)}">${img(vd.foto, '', '')}<span class="video-play">${ic('play')}</span><span class="video-t">${esc(vd.t)}</span></button>`;

const formulario = () => `<form class="form" data-wa="${E.wa}" novalidate>
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Telefone<input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label>Bairro<input name="Bairro"></label>
    <label>O que precisa<select name="Produto" data-produto><option value="">Escolha</option>${linhas.map(l => `<option value="${l.slug}">${l.nome}</option>`).join('')}</select></label>
    <label class="cheio">Medidas e detalhes<textarea name="Detalhes" rows="4" placeholder="Ex.: portão de garagem de 3 m de largura com porta social"></textarea></label>
  </div>
  <button class="btn btn-wa" type="submit">${ic('wa')} Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Raquel Machado, diretora. A visita para medir é marcada por lá.</p>
</form>`;

const contatoInfo = () => `<ul class="contatos">
  <li>${ic('tel')}<div><b>Fixo</b><a href="tel:${E.foneHref}">${E.fone}</a></div></li>
  ${E.celulares.map(c => `<li>${ic('wa')}<div><b>${esc(c.quem)}</b><a href="https://wa.me/${c.h}" target="_blank" rel="noopener">${c.n}</a></div></li>`).join('')}
  <li>${ic('pin')}<div><b>Fábrica e loja</b><span>${E.endereco.join('<br>')}</span></div></li>
  <li>${ic('cartao')}<div><b>Pagamento</b><span>${E.cartao}</span></div></li>
</ul>`;

const galeria = () => {
  const todas = linhas.flatMap(l => fotosDe(l.slug));
  return `<div class="filtros" role="group" aria-label="Filtrar obras"><button type="button" aria-pressed="true" data-filtro="">Todas <small>${todas.length}</small></button>${linhas.map(l => `<button type="button" aria-pressed="false" data-filtro="${l.slug}">${l.curto || l.nome} <small>${fotosDe(l.slug).length}</small></button>`).join('')}</div>
<div class="galeria">${todas.map(n => `<a href="/assets/img/${n}.webp" data-cat="${n.split('-')[0]}" data-zoom>${img(n)}<span>${esc(legenda(n))}</span></a>`).join('')}</div>`;
};

// ---------- versão A: Muro ----------

function inicioA() {
  return `<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt">
    <p class="selo-topo">${ic('fabrica')} Fábrica própria na Rua Cuiabá, 230</p>
    <h1>A segurança da sua casa começa pelo portão.</h1>
    <p class="lead">Portões, janelas, portas, grades, corrimãos e guarda-roupas de alumínio fabricados e montados pela Alumac, a marca mais reconhecida em esquadrias de alumínio em Fortaleza.</p>
    <div class="acoes"><a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Pedir orçamento</a><a class="btn btn-linha" href="/a/produtos/">Ver produtos ${ic('seta')}</a></div>
  </div>
  <figure class="hero-a-foto">${img('fabrica-1', ' fetchpriority="high" loading="eager"')}<figcaption>${legenda('fabrica-1')}</figcaption></figure>
</div>
<div class="letreiro" aria-hidden="true"><span>ALUMAC</span><span>ALUMAC</span><span>ALUMAC</span><span>ALUMAC</span><span>ALUMAC</span><span>ALUMAC</span></div>
</section>

<section class="numeros"><div class="in numeros-in">
  <div><b>${ic('estrela')} ${E.nota}</b><span>nota no Google</span></div>
  <div><b>10x</b><span>sem entrada no cartão</span></div>
  <div><b>Inox 304</b><span>na trava dos corrediços</span></div>
  <div><b>230</b><span>Rua Cuiabá: fábrica e loja no mesmo lugar</span></div>
</div></section>

<section class="sec produtos-a"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Produtos</p><h2>Tudo em alumínio, feito sob medida</h2><p>Seis linhas de produto, todas fabricadas na Rua Cuiabá com material de primeira linha.</p></div>
  <div class="mosaico">${linhas.map((l, i) => `<a class="mos mos-${i + 1}" href="/a/produtos/#${l.slug}">${img(l.foto)}<span class="mos-t"><b>${l.nome}</b><small>${esc(l.resumo)}</small></span></a>`).join('')}</div>
</div></section>

<section class="sec video-a"><div class="in video-a-in">
  <div><p class="eyebrow">Veja a diferença</p><h2>Janelas da Alumac e M2000, lado a lado</h2><p>No vídeo do canal da Alumac, a comparação de perto: o que muita gente vende como janela M2000 é um box disfarçado de janela. Na Alumac, a janela é feita com perfil de esquadria.</p><p><a class="link" href="${E.youtube}" target="_blank" rel="noopener">Mais vídeos no canal da Alumac ${ic('seta')}</a></p></div>
  ${video(videos[1], 'video-grande')}
</div></section>

<section class="sec portao-a"><div class="in portao-a-in">
  <div class="portao-a-txt"><p class="eyebrow">Portão seguro</p><h2>A Alumac tem os portões mais seguros da cidade</h2><p>Porque tem equipamento de produção à altura para seguir a recomendação do fabricante: nunca inverter a estrutura do portão. Invertido, ele fica inseguro de fora para dentro.</p>
  <ol class="lista-num">${portao.map(p => `<li><b>${p.t}</b><span>${p.d}</span></li>`).join('')}</ol>
  <a class="btn btn-claro" href="/a/portoes/">Entenda o portão seguro ${ic('seta')}</a></div>
  ${comparaPortao()}
</div></section>

<section class="sec frases-a"><div class="in">
  <p class="eyebrow">Alumac avisa</p>
  <ul class="frases">${frases.slice(1, 5).map(f => `<li><blockquote>${esc(f)}</blockquote></li>`).join('')}</ul>
  <p class="frases-link"><a class="link" href="${E.instagram}" target="_blank" rel="noopener">${ic('insta')} Siga @alumac.fortaleza no Instagram</a></p>
</div></section>

<section class="sec obras-a"><div class="in">
  <div class="sec-cab lado"><div><p class="eyebrow">Obras entregues</p><h2>Quem compra, sempre quer mais</h2></div><a class="link" href="/a/obras/">Ver todas as obras ${ic('seta')}</a></div>
  <div class="tira">${['portoes-2', 'corrimaos-2', 'moveis-1', 'janelas-1', 'grades-1', 'portas-5'].map(n => fig(n)).join('')}</div>
</div></section>

${avisoBloco()}

<section class="sec contato-a"><div class="in contato-in">
  <div><p class="eyebrow">Orçamento</p><h2>Visite o lugar onde está comprando</h2><p>É a dica de ouro da Alumac: um produto que se compra para durar dezenas de anos não deve ser feito em qualquer lugar. Venha à fábrica ou peça a visita para medir.</p>${contatoInfo()}</div>
  ${formulario()}
</div></section>`;
}

// ---------- versão B: Selo ----------

function inicioB() {
  return `<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt">
    <p class="eyebrow claro">Esquadrias de alumínio em Fortaleza</p>
    <h1>Feito para durar mais de meio século.</h1>
    <p class="lead">Portões, janelas, portas, grades, corrimãos e guarda-roupas de alumínio, fabricados pela Alumac na Rua Cuiabá, 230. Material de primeira linha: não o menor preço, o melhor preço.</p>
    <div class="acoes"><a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Pedir orçamento</a><a class="btn btn-contorno" href="/b/produtos/">Conhecer os produtos</a></div>
    <p class="hero-b-nota">${ic('estrela')} <b>${E.nota}</b> no Google · ${E.cartao}</p>
  </div>
  <div class="hero-b-fotos">
    <figure class="hb-1">${img('portoes-3', ' fetchpriority="high" loading="eager"')}</figure>
    <figure class="hb-2">${img('janelas-1', ' loading="eager"')}</figure>
    <figure class="hb-3">${img('moveis-1', ' loading="eager"')}</figure>
    <span class="hb-selo">${marca('b')}</span>
  </div>
</div></section>

<section class="sec etapas-b"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Como a Alumac trabalha</p><h2>Da medição à montagem, sempre na presença do cliente</h2></div>
  <ol class="etapas" data-etapas>${etapas.map((e, i) => `<li><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
</div></section>

<section class="sec catalogo-b"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Produtos</p><h2>Seis linhas, um só padrão de acabamento</h2></div>
  <div class="abas" role="tablist">${linhas.map((l, i) => `<button role="tab" id="aba-${l.slug}" aria-controls="painel-${l.slug}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${l.curto || l.nome}</button>`).join('')}</div>
  ${linhas.map((l, i) => `<div class="painel" role="tabpanel" id="painel-${l.slug}" aria-labelledby="aba-${l.slug}"${i ? ' hidden' : ''}>
    <div class="painel-txt"><h3>${l.nome}</h3><p>${esc(l.texto)}</p><ul class="tipos">${l.tipos.map(t => `<li>${esc(t)}</li>`).join('')}</ul><a class="link" href="/b/produtos/#${l.slug}">Ver fotos de ${(l.curto || l.nome).toLowerCase()} ${ic('seta')}</a></div>
    <div class="painel-fotos">${fotosDe(l.slug).slice(0, 3).map(n => fig(n)).join('')}</div>
  </div>`).join('')}
</div></section>

<section class="sec portao-b"><div class="in portao-b-in">
  ${comparaPortao()}
  <div><p class="eyebrow claro">Por dentro do portão</p><h2>A segurança da sua casa começa pelo portão</h2><p>Portão de alumínio com a estrutura invertida não fornece segurança. A Alumac fabrica cada portão com a armação do lado de dentro e soluções próprias que você não encontra em outro lugar.</p>
  <dl class="portao-lista">${portao.map(p => `<div><dt>${p.t}</dt><dd>${p.d}</dd></div>`).join('')}</dl>
  <a class="btn btn-contorno" href="/b/portoes/">Ver o portão seguro ${ic('seta')}</a></div>
</div></section>

<section class="sec videos-b"><div class="in">
  <div class="sec-cab lado"><div><p class="eyebrow">No canal da Alumac</p><h2>Quem faz, mostra</h2></div><a class="link" href="${E.youtube}" target="_blank" rel="noopener">Abrir o canal ${ic('seta')}</a></div>
  <div class="videos">${videos.map((vd, i) => video(vd, i < 2 ? 'v-larg' : 'v-alto')).join('')}</div>
</div></section>

<section class="sec citacao-b"><div class="in"><blockquote>“${esc(frases[4])}”</blockquote><p>Alumac · Rua Cuiabá, 230</p></div></section>

${avisoBloco()}

<section class="sec contato-b"><div class="in contato-in">
  <div><p class="eyebrow">Orçamento</p><h2>Peça a visita para medir</h2><p>Conte o que precisa e as medidas aproximadas. A Alumac retorna pelo WhatsApp para marcar a visita.</p>${contatoInfo()}</div>
  ${formulario()}
</div></section>`;
}

// ---------- páginas internas (mesmo conteúdo, estilo de cada versão) ----------

const cabecalho = (v, eyebrow, titulo, texto, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}"><div class="in cab-in">
  <div><p class="eyebrow${v === 'b' ? ' claro' : ''}">${eyebrow}</p><h1>${titulo}</h1><p class="lead">${texto}</p></div>
  ${foto ? `<figure class="cab-foto">${img(foto, ' loading="eager"')}</figure>` : ''}
</div></section>`;

function produtos(v) {
  return `${cabecalho(v, 'Produtos', 'Tudo em alumínio, sob medida', 'Portões, janelas, portas, grades, corrimãos, guarda-roupas e armários. Escolha a linha e veja as obras entregues.')}
<nav class="ancoras"><div class="in">${linhas.map(l => `<a href="#${l.slug}">${l.curto || l.nome}</a>`).join('')}</div></nav>
${linhas.map((l, i) => `<section class="sec linha${i % 2 ? ' alt' : ''}" id="${l.slug}"><div class="in linha-in">
  <div class="linha-txt"><p class="eyebrow">${String(i + 1).padStart(2, '0')} · ${l.curto || l.nome}</p><h2>${l.nome}</h2><p>${esc(l.texto)}</p>
  <ul class="tipos">${l.tipos.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
  <a class="btn btn-wa" href="${waLink(`Olá! Vim pelo site da Alumac e gostaria de um orçamento de ${l.nome.toLowerCase()}.`)}" target="_blank" rel="noopener">${ic('wa')} Orçar ${(l.curto || l.nome).toLowerCase()}</a></div>
  <div class="linha-fotos">${fotosDe(l.slug).slice(0, 5).map(n => `<a href="/assets/img/${n}.webp" data-zoom>${img(n)}</a>`).join('')}</div>
</div></section>`).join('')}`;
}

function portoes(v) {
  return `${cabecalho(v, 'Portão seguro', 'A segurança da sua casa começa pelo portão', 'A Alumac tem os portões mais seguros da cidade porque segue a recomendação do fabricante: a estrutura nunca vai invertida.', 'portoes-1')}
<section class="sec"><div class="in portao-pag">
  <div><h2>Invertido, jamais compre</h2><p>Muita empresa monta o portão com a armação virada para a rua porque não tem equipamento para fazer do jeito certo. Fica mais barato para quem faz e inseguro para quem compra: com os tubos e parafusos do lado de fora, o portão pode ser forçado de fora para dentro.</p><p>Na Alumac, a estrutura fica do lado de dentro e a rua só vê o lambri liso.</p></div>
  ${comparaPortao()}
</div></section>
<section class="sec alt"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Só a Alumac faz desta forma</p><h2>Soluções criadas na própria fábrica</h2></div>
  <ol class="solucoes">${portao.map((p, i) => `<li><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>
</div></section>
<section class="sec"><div class="in video-a-in">
  <div><p class="eyebrow">Vídeo</p><h2>Portão com a estrutura invertida não fornece segurança</h2><p>No canal da Alumac, a explicação na bancada da fábrica, com dois portões lado a lado.</p></div>
  ${video(videos[0], 'video-grande')}
</div></section>
<section class="sec alt"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Portões entregues</p><h2>Garagens de Fortaleza com portão Alumac</h2></div>
  <div class="grade-fotos">${fotosDe('portoes').map(n => `<a href="/assets/img/${n}.webp" data-zoom>${img(n)}</a>`).join('')}</div>
</div></section>`;
}

function obras(v) {
  return `${cabecalho(v, 'Obras', 'Obras entregues pela Alumac', 'Fotos de clientes em Fortaleza: portões, janelas, portas, grades, corrimãos e guarda-roupas. Toque numa foto para ampliar.')}
<section class="sec"><div class="in">${galeria()}</div></section>`;
}

function alumac(v) {
  return `${cabecalho(v, 'A Alumac', 'Uma vida num só lugar: Rua Cuiabá, 230', 'Fábrica e loja no mesmo endereço, no Jóquei Clube. É lá que a Alumac cria, fabrica e mostra o que faz.', 'fabrica-2')}
<section class="sec"><div class="in sobre">
  <div class="sobre-txt">
    <h2>Pioneira em Fortaleza</h2>
    <p>A Alumac foi pioneira na criação de portas em alumínio e PVC industrial em Fortaleza e segue criando projetos próprios que marcam evolução na fabricação de esquadrias de alumínio, como a trava anti-rebote em inox 304 e as guias chavetas da bandeirola de segurança.</p>
    <p>A empresa é da família Machado. Só trabalha com material de primeira linha e por isso não trabalha com o menor preço, e sim com o melhor preço: o alumínio tem muitas qualidades e durezas, e um produto feito para durar dezenas de anos não deve ser comprado em qualquer lugar.</p>
    <blockquote class="sobre-frase">“Quando o que quer não existe, inventa o que quer.”</blockquote>
  </div>
  <div class="sobre-fotos">${['fabrica-3', 'fabrica-4', 'fabrica-5', 'fabrica-6'].map(n => fig(n)).join('')}</div>
</div></section>
<section class="sec alt"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Como a venda acontece</p><h2>Sempre na presença do cliente</h2></div>
  <ol class="etapas">${etapas.map((e, i) => `<li><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
</div></section>
${avisoBloco()}
<section class="sec"><div class="in">
  <div class="sec-cab lado"><div><p class="eyebrow">Vídeos</p><h2>No canal da Alumac</h2></div><a class="link" href="${E.youtube}" target="_blank" rel="noopener">Abrir o canal ${ic('seta')}</a></div>
  <div class="videos">${videos.map((vd, i) => video(vd, i < 2 ? 'v-larg' : 'v-alto')).join('')}</div>
</div></section>`;
}

function contato(v) {
  return `${cabecalho(v, 'Contato', 'Peça seu orçamento', 'Venha à fábrica na Rua Cuiabá, 230, ou peça a visita para medir. A venda é feita sempre na presença do cliente.')}
<section class="sec"><div class="in contato-in">
  <div>${contatoInfo()}<p class="contato-dica">${ic('alerta')} A Alumac nunca pede entrada por Pix ou link de cartão. A única pessoa autorizada a vender é Raquel Machado, diretora.</p></div>
  ${formulario()}
</div></section>
<section class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: Alumac, Rua Cuiabá, 230, Fortaleza" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

export function gerarVersao(v) {
  const t = s => `${s} · ${E.nome} Fortaleza`;
  return {
    index: pagina(v, 'index', `${E.nome} · Portões, janelas e esquadrias de alumínio em Fortaleza`, 'Fábrica de portões, janelas, portas, grades, corrimãos e guarda-roupas de alumínio na Rua Cuiabá, 230, Fortaleza. Orçamento com visita para medir.', v === 'a' ? inicioA() : inicioB()),
    produtos: pagina(v, 'produtos', t('Produtos'), 'Portões, janelas, portas, grades, corrimãos, guarda-roupas e armários de alumínio feitos sob medida pela Alumac em Fortaleza.', produtos(v)),
    portoes: pagina(v, 'portoes', t('Portão seguro'), 'Por que os portões da Alumac são os mais seguros de Fortaleza: estrutura do lado de dentro, trava anti-rebote em inox 304 e bandeirola de segurança.', portoes(v)),
    obras: pagina(v, 'obras', t('Obras'), 'Fotos de portões, janelas, portas, grades, corrimãos e guarda-roupas de alumínio entregues pela Alumac em Fortaleza.', obras(v)),
    alumac: pagina(v, 'alumac', t('A Alumac'), 'Fábrica e loja na Rua Cuiabá, 230, Jóquei Clube, Fortaleza. Pioneira em portas de alumínio e PVC industrial.', alumac(v)),
    contato: pagina(v, 'contato', t('Contato'), 'Telefones, WhatsApp e endereço da Alumac em Fortaleza. Peça a visita para medir e o orçamento.', contato(v)),
  };
}
