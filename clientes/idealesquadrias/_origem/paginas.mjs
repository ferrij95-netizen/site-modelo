// Monta as páginas das versões A ("Vitrine": fiel ao site atual, branca com a faixa amarela do menu,
// "Quem somos", "Oferecemos", a faixa verde do orçamento por WhatsApp e "Alguns trabalhos") e
// B ("Caixilho": azul do logo, a janela de quatro vidros do logo como desenho das seções, laranja nos destaques).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, quemSomos, oferecemos, diferenciais, produtos, etapas, fotos, tamanhos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt = fotos[n] || '', extra = '') => {
  const [w, h] = tamanhos[n];
  return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${/loading=/.test(extra) ? '' : ' loading="lazy"'} decoding="async"${extra}>`;
};
// foto que abre ampliada (lightbox em site.js)
const fig = (n, cls = '', legenda = fotos[n]) => `<figure${cls ? ` class="${cls}"` : ''}><a href="/assets/img/${n}.webp" data-lb>${img(n)}</a><figcaption>${esc(legenda)}</figcaption></figure>`;
const prodDe = n => produtos.find(p => p.fotos.includes(n));
const todas = produtos.flatMap(p => p.fotos.map(f => ({ f, p })));

export const nomesVersao = { a: 'Vitrine', b: 'Caixilho' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'trabalhos', nome: 'Trabalhos', caminho: 'trabalhos/' },
  { slug: 'contato', nome: 'Localização e contato', curto: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  // ícones dos quatro itens do "Oferecemos"
  caixa: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M12 3v18M3 12h18"/>',
  selo: '<circle cx="12" cy="9" r="6"/><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5"/>',
  balanca: '<path d="M12 4v16M7 20h10M5 8h14M5 8l-3 6a3 3 0 006 0zM19 8l-3 6a3 3 0 006 0z"/>',
  chave: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
};
const icDif = ['caixa', 'selo', 'balanca', 'chave'];
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Ideal Esquadrias e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const logo = (branco = false) => `<img class="logo-img" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="${E.nome}" width="430" height="184">`;
// a janela de quatro vidros laranja do logo, usada como marcador
const janelinha = '<svg class="janelinha" viewBox="0 0 20 20" aria-hidden="true"><rect x="0" y="0" width="9" height="9" rx="1"/><rect x="11" y="0" width="9" height="9" rx="1"/><rect x="0" y="11" width="9" height="9" rx="1"/><rect x="11" y="11" width="9" height="9" rx="1"/></svg>';

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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#042E46">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual, rodape = false) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual && !rodape ? ' aria-current="page"' : ''}>${rodape && n.curto ? n.curto : n.nome}</a>`).join('');
const btnMenu = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="topinho"><div class="in">
  <span>${ic('pin')} ${E.endereco[0]} · Rubem Berta, Porto Alegre</span>
  <span class="so-pc"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></span>
</div></div>
<header class="topo"><div class="in">
  <div class="cab">
    <a class="logo" href="/a/" aria-label="${E.nome}, página inicial">${logo()}</a>
    <div class="cab-contato">
      <a class="cab-tel" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a>
      <a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} <span>WhatsApp</span></a>
      ${btnMenu}
    </div>
  </div>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="logo" href="/b/" aria-label="${E.nome}, página inicial">${logo(true)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  <a class="btn btn-laranja btn-topo" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')}<span>Orçamento</span></a>
  ${btnMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(true)}<p>${E.slogan}. Fabricação, montagem e instalação de esquadrias de alumínio em Porto Alegre.</p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div>
  <div><h3>Contato</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="${waLink()}" target="_blank" rel="noopener">${E.cel} · WhatsApp</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <div><h3>Produtos</h3><p class="rod-prod">${produtos.map(p => `<a href="/${v}/produtos/#${p.slug}">${p.curto}</a>`).join('')}</p><nav aria-label="Rodapé" class="rod-nav">${menu(v, '', true)}</nav></div>
</div><p class="rod-fim">© ${E.nome} · ${E.slogan} · Porto Alegre, RS</p></footer>
<a class="wa-flut" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>
<dialog class="lb" aria-label="Foto ampliada"><button class="lb-fecha" type="button" aria-label="Fechar">×</button><button class="lb-ant" type="button" aria-label="Foto anterior">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-prox" type="button" aria-label="Próxima foto">›</button></dialog>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === slug).caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- blocos comuns ----------
const opcoes = produtos.map(p => `<option value="${esc(p.nome)}">${esc(p.nome)}</option>`).join('');
const form = () => `<form class="form" id="orcamento" data-mailto="${E.email}" data-assunto="Pedido de orçamento pelo site" data-wa="${E.wa}">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Telefone ou WhatsApp<input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label>O que você precisa?<select name="Produto" data-servico><option value="">Escolha</option>${opcoes}<option value="Outro">Outro</option></select></label>
    <label>Bairro ou cidade da obra<input name="Local" placeholder="Ex.: Sarandi, Porto Alegre"></label>
    <label class="largo">Medidas aproximadas<input name="Medidas" placeholder="Ex.: janela 1,50 x 1,20 m, duas folhas"></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="4" placeholder="Cor do alumínio, tipo de vidro, prazo da obra..."></textarea></label>
  </div>
  <div class="form-acoes"><button class="btn btn-wa" type="button" data-envia-wa>${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-linha" type="submit">${ic('mail')} Enviar por e-mail</button></div>
  <p class="form-nota">Se tiver, mande também uma foto do vão pelo WhatsApp: o orçamento sai mais rápido.</p>
</form>`;

const contatoInfo = () => `<ul class="contato-lista">
  <li>${ic('pin')}<span><b>Endereço</b>${E.endereco.join('<br>')}<br><a href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa</a></span></li>
  <li>${ic('tel')}<span><b>Telefone</b><a href="tel:${E.foneHref}">${E.fone}</a></span></li>
  <li>${ic('wa')}<span><b>WhatsApp</b><a href="${waLink()}" target="_blank" rel="noopener">${E.cel}</a></span></li>
  <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
</ul>`;
const mapa = `<div class="mapa"><iframe title="Mapa: ${esc(E.nome)}" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const filtros = v => `<div class="filtros" role="group" aria-label="Filtrar trabalhos"><button type="button" aria-pressed="true" data-filtro="">Todos</button>${produtos.filter(p => p.fotos.length).map(p => `<button type="button" aria-pressed="false" data-filtro="${p.slug}">${p.curto}</button>`).join('')}</div>`;
const galeriaToda = cls => `<div class="${cls}" data-galeria>${todas.map(({ f, p }) => `<figure data-cat="${p.slug}"><a href="/assets/img/${f}.webp" data-lb>${img(f)}</a><figcaption>${esc(fotos[f])}<small>${p.nome}</small></figcaption></figure>`).join('')}</div>`;

// ================= VERSÃO A · Vitrine =================
const slides = ['casa-piscina', 'portao', 'cerca-vidro', 'fechamento'];
const A = {
  home: () => pagina('a', 'index', `${E.nome} · Esquadrias de alumínio em Porto Alegre`, 'Ideal Esquadrias, Porto Alegre: fabricação, montagem e instalação de janelas, portas, portões, grades, coberturas, cercas de vidro e box para banheiro em alumínio. Orçamento pelo WhatsApp.', `
<section class="hero"><div class="in">
  <div class="slider" data-slider>
    ${slides.map((s, i) => `<figure class="slide${i ? '' : ' ativo'}">${img(s, fotos[s], i ? '' : ' fetchpriority="high" loading="eager"')}</figure>`).join('')}
    <div class="slider-pontos">${slides.map((s, i) => `<button type="button" aria-label="Foto ${i + 1}: ${esc(fotos[s])}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>
  </div>
  <div class="hero-txt">
    <p class="eyebrow">${E.slogan} · ${E.cidade}</p>
    <h1>Esquadrias de alumínio sob medida</h1>
    <p>Janelas, portas, portões, grades, coberturas e box para banheiro. Fabricação, montagem e instalação, respeitando o prazo combinado.</p>
    <div class="botoes"><a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Orçamento pelo WhatsApp</a><a class="btn btn-linha" href="/a/produtos/">Ver produtos ${ic('seta')}</a></div>
  </div>
</div></section>

<section class="quem"><div class="in">
  <h2 class="tit-centro">Quem somos</h2>
  <p class="quem-txt">${quemSomos} Entre em contato conosco: teremos prazer em tê-lo como nosso cliente!</p>
  <ul class="chips">${produtos.map(p => `<li><a href="/a/produtos/#${p.slug}">${janelinha}${p.curto}</a></li>`).join('')}</ul>
</div></section>

<section class="oferecemos"><div class="in">
  <div class="of-txt">
    <h2>Oferecemos</h2>
    <p class="lead">${oferecemos}</p>
    <ul class="dif">${diferenciais.map((d, i) => `<li>${ic(icDif[i])}<h3>${d.t}</h3><p>${d.d}</p></li>`).join('')}</ul>
  </div>
  <figure class="of-foto">${img('janela-veneziana')}</figure>
</div></section>

<section class="linha-prod"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Nossos produtos</p><h2>Do box do banheiro ao portão da frente.</h2></div><a class="link" href="/a/produtos/">Todos os produtos ${ic('seta')}</a></div>
  <div class="vitrine">${produtos.map((p, i) => p.fotos.length
    ? `<a class="vt vt-${i + 1}" href="/a/produtos/#${p.slug}"><figure>${img(p.fotos[0])}</figure><span class="vt-txt"><b>${p.nome}</b><small>${p.fotos.length} ${p.fotos.length > 1 ? 'fotos' : 'foto'} de obras ${ic('seta')}</small></span></a>`
    : `<a class="vt vt-${i + 1} vt-sem" href="/a/produtos/#${p.slug}">${janelinha}<b>${p.nome}</b><span>${p.texto.split(':')[0].split('.')[0]}.</span><small>Saiba mais ${ic('seta')}</small></a>`).join('')}</div>
</div></section>

<section class="processo"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Como trabalhamos</p><h2>Da medida à colocação, com a mesma equipe.</h2></div>
  <ol class="perfil">${etapas.map((e, i) => `<li><span class="n">${i + 1}</span><figure>${img(e.foto, '')}</figure><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
</div></section>

<section class="orcamento"><div class="in">
  <p class="eyebrow">Orçamento on-line</p>
  <h2>Faça seu orçamento por WhatsApp</h2>
  <p>Mande foto e medidas do vão. A resposta vem no mesmo número.</p>
  <a class="btn btn-amarelo" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Clique aqui · ${E.cel}</a>
</div></section>

<section class="trabalhos"><div class="in">
  <h2 class="tit-centro">Alguns trabalhos</h2>
  <div class="mosaico">${['porta-pivotante', 'casa-piscina', 'porta-correr-preta', 'guarda-corpo', 'janela-canto', 'cobertura', 'portao', 'janela-correr'].map((f, i) => fig(f, `m${i + 1}`)).join('')}</div>
  <p class="centro"><a class="btn btn-linha" href="/a/trabalhos/">Ver todos os trabalhos ${ic('seta')}</a></p>
</div></section>

<section class="onde"><div class="in">
  <div><p class="eyebrow">Localização</p><h2>Rubem Berta, zona norte de Porto Alegre</h2>${contatoInfo()}</div>
  ${mapa}
</div></section>`),

  produtos: () => pagina('a', 'produtos', `Produtos · ${E.nome}`, 'Janelas e esquadrias, portas, portões e grades, cercas e guarda-corpos de vidro temperado, coberturas, box para banheiro e consertos em geral, em Porto Alegre.', `
<section class="capa"><div class="in"><p class="eyebrow">Produtos</p><h1>Tudo em alumínio, feito sob medida.</h1><p>${oferecemos}</p></div></section>
<nav class="indice" aria-label="Produtos"><div class="in">${produtos.map(p => `<a href="#${p.slug}">${p.curto}</a>`).join('')}</div></nav>
${produtos.map((p, i) => `<section class="prod${i % 2 ? ' alt' : ''}${p.fotos.length ? '' : ' sem-foto'}" id="${p.slug}"><div class="in">
  <div class="prod-txt"><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${p.nome}</h2><p>${p.texto}</p>
  <a class="btn btn-wa" href="${waLink(`Olá! Vim pelo site e gostaria de um orçamento de ${p.nome.toLowerCase()}.`)}" target="_blank" rel="noopener">${ic('wa')} Orçar ${p.curto.toLowerCase()}</a></div>
  ${p.fotos.length ? `<div class="prod-fotos n${Math.min(p.fotos.length, 4)}">${p.fotos.slice(0, 4).map(f => fig(f)).join('')}</div>` : `<div class="prod-vazio">${janelinha}<p>${p.slug === 'box' ? 'Peça modelos e referências de box pelo WhatsApp: enviamos fotos de trabalhos parecidos com o que você procura.' : 'Mande uma foto do que precisa de conserto pelo WhatsApp e respondemos com o orçamento.'}</p></div>`}
</div></section>`).join('')}
<section class="orcamento"><div class="in"><h2>Não achou o que procura?</h2><p>Mande uma foto pelo WhatsApp: fazemos sob medida.</p><a class="btn btn-amarelo" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.cel}</a></div></section>`),

  trabalhos: () => pagina('a', 'trabalhos', `Trabalhos · ${E.nome}`, 'Fotos de obras da Ideal Esquadrias em Porto Alegre: janelas, portas pivotantes e de correr, portões, cercas de vidro temperado e coberturas em alumínio.', `
<section class="capa"><div class="in"><p class="eyebrow">Trabalhos</p><h1>Alguns trabalhos</h1><p>Portas, janelas, portões, vidro temperado e coberturas instalados pela Ideal. Toque na foto para ampliar.</p></div></section>
<section class="galeria"><div class="in">${filtros('a')}${galeriaToda('grade-trab')}</div></section>
<section class="orcamento"><div class="in"><h2>Quer um destes na sua obra?</h2><a class="btn btn-amarelo" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Orçamento pelo WhatsApp</a></div></section>`),

  contato: () => pagina('a', 'contato', `Localização e contato · ${E.nome}`, `Peça um orçamento para a Ideal Esquadrias: ${E.fone}, WhatsApp ${E.cel}, ${E.email}. ${E.endereco.slice(0, 2).join(', ')}.`, `
<section class="capa"><div class="in"><p class="eyebrow">Localização e contato</p><h1>Peça seu orçamento.</h1><p>Conte o que precisa e responderemos pelo WhatsApp ou por e-mail.</p></div></section>
<section class="contato"><div class="in">
  <div>${form()}</div>
  <aside>${contatoInfo()}</aside>
</div></section>
<section class="onde so-mapa"><div class="in">${mapa}</div></section>`),
};

// ================= VERSÃO B · Caixilho =================
const B = {
  home: () => pagina('b', 'index', `${E.nome} · ${E.slogan}`, 'Esquadrias de alumínio em Porto Alegre: janelas, portas, portões, grades, coberturas, vidro temperado e box para banheiro. Fabricação, montagem e instalação.', `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">${E.nome} · ${E.cidade}</p>
    <h1>${E.slogan}.</h1>
    <p>Janelas, portas, portões, grades, coberturas e box para banheiro, fabricados e instalados sob medida pela nossa equipe.</p>
    <div class="botoes"><a class="btn btn-laranja" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Orçamento pelo WhatsApp</a><a class="btn btn-claro" href="/b/produtos/">Ver produtos ${ic('seta')}</a></div>
  </div>
  <div class="caixilho">
    <figure class="v1">${img('porta-pivotante', fotos['porta-pivotante'], ' fetchpriority="high" loading="eager"')}</figure>
    <figure class="v2">${img('cerca-vidro', fotos['cerca-vidro'], ' loading="eager"')}</figure>
    <figure class="v3">${img('porta-correr-preta', fotos['porta-correr-preta'], ' loading="eager"')}</figure>
    <a class="v4" href="/b/trabalhos/"><span>${todas.length} fotos de obras</span><b>Ver trabalhos ${ic('seta')}</b></a>
  </div>
</div></section>

<div class="faixa-prod" aria-label="Produtos"><div class="in">${produtos.map(p => `<a href="/b/produtos/#${p.slug}">${p.curto}</a>`).join(janelinha)}</div></div>

<section class="linhas-sec"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Linha de produtos</p><h2>Sete linhas, uma fábrica.</h2></div><p class="sec-desc">${oferecemos}</p></div>
  <ol class="linhas">${produtos.map((p, i) => `<li><a href="/b/produtos/#${p.slug}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${p.nome}</span><span class="d">${p.texto}</span>${p.fotos.length ? `<span class="mini">${img(p.fotos[0], '')}</span>` : `<span class="mini vazio">${janelinha}</span>`}${ic('seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="processo"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Como trabalhamos</p><h2>Quatro etapas, como os quatro vidros do nosso logo.</h2></div>
  <ol class="quadro" data-quadro>${etapas.map((e, i) => `<li><figure>${img(e.foto, '')}</figure><div><span class="n">0${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></div></li>`).join('')}</ol>
</div></section>

<section class="quem"><div class="in">
  <figure class="quem-foto">${img('porta-pivotante-pedra')}</figure>
  <div class="quem-txt">
    <p class="eyebrow">Quem somos</p>
    <h2>Experiência em produção de esquadrias de alumínio.</h2>
    <p>${quemSomos}</p>
    <ul class="dif">${diferenciais.map((d, i) => `<li>${ic(icDif[i])}<div><h3>${d.t}</h3><p>${d.d}</p></div></li>`).join('')}</ul>
  </div>
</div></section>

<section class="rolo"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Trabalhos</p><h2>Obras recentes.</h2></div><a class="link" href="/b/trabalhos/">Ver todos ${ic('seta')}</a></div>
</div>
<div class="rolo-trilho">${['casa-piscina', 'porta-correr-3', 'guarda-corpo', 'fachada-vidro', 'janela-correr', 'cobertura', 'portao', 'janela-preta'].map(f => fig(f)).join('')}</div>
</section>

<section class="cta"><div class="in">
  <div><p class="eyebrow">Orçamento on-line</p><h2>Faça seu orçamento por WhatsApp.</h2><p>Mande foto e medidas aproximadas do vão.</p></div>
  <a class="btn btn-branco" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.cel}</a>
</div></section>

<section class="onde"><div class="in">
  <div><p class="eyebrow">Localização</p><h2>Na Av. Bernardino Silveira Amorim, zona norte de Porto Alegre.</h2>${contatoInfo()}</div>
  ${mapa}
</div></section>`),

  produtos: () => pagina('b', 'produtos', `Produtos · ${E.nome}`, 'Linha de produtos da Ideal Esquadrias: janelas, portas, portões e grades, vidro temperado, coberturas, box para banheiro e consertos em alumínio, em Porto Alegre.', `
<section class="capa"><div class="in"><p class="eyebrow">Produtos</p><h1>Sete linhas, uma fábrica.</h1><p>${oferecemos}</p></div></section>
<section class="prod-b"><div class="in">
  <nav class="prod-indice" aria-label="Produtos">${produtos.map((p, i) => `<a href="#${p.slug}"><span>${String(i + 1).padStart(2, '0')}</span>${p.curto}</a>`).join('')}</nav>
  <div class="prod-blocos">${produtos.map((p, i) => `
    <article id="${p.slug}" class="${p.fotos.length ? '' : 'sem-foto'}">
      ${p.fotos.length ? `<div class="pb-fotos">${fig(p.fotos[0], 'pb-grande')}${p.fotos.length > 1 ? `<div class="pb-mini">${p.fotos.slice(1, 5).map(f => fig(f)).join('')}</div>` : ''}</div>` : ''}
      <div class="pb-txt"><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${p.nome}</h2><p>${p.texto}</p>
      <a class="btn btn-linha" href="/b/contato/?servico=${encodeURIComponent(p.nome)}#orcamento">Orçar ${p.curto.toLowerCase()} ${ic('seta')}</a></div>
    </article>`).join('')}
  </div>
</div></section>`),

  trabalhos: () => pagina('b', 'trabalhos', `Trabalhos · ${E.nome}`, 'Obras da Ideal Esquadrias em Porto Alegre: portas pivotantes, portas e janelas de correr, portões, cercas de vidro temperado e coberturas.', `
<section class="capa"><div class="in"><p class="eyebrow">Trabalhos</p><h1>Obras recentes.</h1><p>Filtre por produto e toque na foto para ampliar.</p></div></section>
<section class="galeria"><div class="in">${filtros('b')}${galeriaToda('colunas')}</div></section>
<section class="cta"><div class="in"><div><h2>Quer um destes na sua obra?</h2></div><a class="btn btn-branco" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Orçamento pelo WhatsApp</a></div></section>`),

  contato: () => pagina('b', 'contato', `Contato · ${E.nome}`, `Orçamento de esquadrias de alumínio: ${E.fone}, WhatsApp ${E.cel}, ${E.email}. ${E.endereco.slice(0, 2).join(', ')}.`, `
<section class="capa"><div class="in"><p class="eyebrow">Localização e contato</p><h1>Conte o que a sua obra precisa.</h1><p>Resposta pelo WhatsApp ou por e-mail.</p></div></section>
<section class="contato"><div class="in">
  <div>${form()}</div>
  <aside>${contatoInfo()}${mapa}</aside>
</div></section>`),
};

export function gerarVersao(v) {
  const X = v === 'a' ? A : B;
  return { index: X.home(), produtos: X.produtos(), trabalhos: X.trabalhos(), contato: X.contato() };
}
