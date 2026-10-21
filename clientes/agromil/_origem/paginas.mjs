// Monta as páginas das versões A ("Tradição", fiel ao site atual: fundo branco, logo e vendedores à frente)
// e B ("Da semente à colheita", foto de abertura, ciclo da semente e faixa marrom de vendas).
// Páginas internas usam o mesmo conteúdo; topo, rodapé e home mudam por versão. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, vendedores, linhas, ciclo, clientes, comoComprar } from './conteudo.mjs';
import { creditos } from './fotos.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Todas as fotos são de banco (o site atual não tem nenhuma) e levam o selo "Foto ilustrativa".
const foto = (n, alt, cls = '', extra = '') => `<figure class="foto ${cls}"><img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}><span class="ilus">Foto ilustrativa</span></figure>`;

export const nomesVersao = { a: 'Tradição', b: 'Da semente à colheita' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A Agromil', caminho: 'empresa/' },
  { slug: 'sementes', nome: 'Sementes', caminho: 'sementes/' },
  { slug: 'vendas', nome: 'Vendas', caminho: 'vendas/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const link = (v, slug) => `/${v}/${nav.find(n => n.slug === slug).caminho}`;
const wa = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
const msgPadrao = 'Olá! Vim pelo site da Agromil Sementes e gostaria de um orçamento.';
const mapaLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(E.mapa)}`;
const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(E.mapa)}&output=embed`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  loja: '<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16"/><path d="M10 20v-6h4v6"/>',
  broto: '<path d="M12 21v-9"/><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-4 3-6 7-6 0 4-3 6-7 6z"/>',
  bandeja: '<rect x="3" y="12" width="18" height="7" rx="1"/><path d="M7 12V9M12 12V8M17 12V9M7 9c-1.5 0-2-1-2-2 1 0 2 .5 2 2zM12 8c1.5 0 2.5-1 2.5-2.5-1.5 0-2.5 1-2.5 2.5zM17 9c-1.5 0-2-1-2-2 1 0 2 .5 2 2z"/>',
  flor: '<circle cx="12" cy="9" r="2"/><path d="M12 7c0-3 3-3 3 0s-3 2-3 2zM12 7c0-3-3-3-3 0s3 2 3 2zM14 9c3 0 3 3 0 3s-2-3-2-3zM10 9c-3 0-3 3 0 3s2-3 2-3zM12 11v10M12 17c-2 0-4-1-4-3 2 0 4 1 4 3z"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icCliente = ['loja', 'broto', 'bandeja', 'flor'];

// ---------- moldura ----------
function head(v, slug, titulo, descricao) {
  const url = `${E.url}${link(v, slug).slice(1)}`;
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
<meta name="theme-color" content="#00a859">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

function topo(v, slug) {
  const itens = nav.map(n => n.slug === 'contato'
    ? `<li><a class="nav-cta${slug === n.slug ? ' ativo' : ''}" href="${link(v, n.slug)}">${n.nome}</a></li>`
    : `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
  const sobreFoto = v === 'b' && slug === 'index';
  return `<div class="barra"><div class="in">
  <span>Sementes de hortaliças, flores e gramas · Chapecó, SC · desde ${E.desde}</span>
  <span class="barra-dir"><a href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span>
</div></div>
<header class="topo${sobreFoto ? ' topo-foto' : ''}"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Agromil Sementes, página inicial"><img class="logo-cor" src="/assets/logo.png" alt="Agromil Sementes Ltda." width="500" height="249">${v === 'b' ? '<img class="logo-branco" src="/assets/logo-branco.png" alt="" width="500" height="249">' : ''}</a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  <nav id="menu" aria-label="Principal"><ul>${itens}</ul></nav>
</div></header>
<main id="conteudo">
`;
}

function rodape(v) {
  return `</main>
<footer class="rodape"><div class="in">
  <div class="rod-marca">
    <img src="/assets/logo-branco.png" alt="Agromil Sementes Ltda." width="500" height="249">
    <p>${E.razao}<br>CNPJ ${E.cnpj}</p>
  </div>
  <div>
    <h3>Endereço</h3>
    <p><a href="${mapaLink}" target="_blank" rel="noopener">${E.endereco}<br>${E.cidade} · CEP ${E.cep}</a></p>
  </div>
  <div>
    <h3>Escritório</h3>
    <ul class="rod-lista">
      <li><a href="tel:${E.foneHref}">${E.fone}</a></li>
      <li><a href="tel:${E.celularHref}">${E.celular}</a></li>
      <li><a href="mailto:${E.email}">${E.email}</a></li>
    </ul>
  </div>
  <div>
    <h3>Vendas</h3>
    <ul class="rod-lista">${vendedores.map(p => `<li>${p.nome}: <a href="${wa(p.whats, msgPadrao)}" target="_blank" rel="noopener">${p.fone}</a></li>`).join('')}</ul>
  </div>
</div>
<div class="in rod-base"><span>© ${new Date().getFullYear()} Agromil Sementes. Chapecó, SC.</span><span>Fotos ilustrativas de bancos livres, créditos em <a href="${link(v, 'contato')}#creditos">Contato</a>.</span></div>
</footer>
<a class="whats-flut" href="${wa(E.whats, msgPadrao)}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('whats')}</a>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const pagina = (v, slug, titulo, desc, corpo) => head(v, slug, titulo, desc) + topo(v, slug) + corpo + rodape(v);

const capa = (eyebrow, titulo, sub, img) => `<section class="capa">
  ${foto(img, '', 'capa-foto', ' loading="eager" fetchpriority="high"')}
  <div class="in capa-txt">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${titulo}</h1>
    ${sub ? `<p class="lead">${sub}</p>` : ''}
  </div>
</section>`;

// ---------- blocos ----------
const vendedorItem = (p, cls = '') => `<div class="vend ${cls}">
  <span class="vend-ini" aria-hidden="true">${p.nome[0]}</span>
  <div class="vend-txt"><strong>${p.nome}</strong><a href="tel:+55${p.whats.slice(2)}">${p.fone}</a></div>
  <a class="vend-wa" href="${wa(p.whats, msgPadrao)}" target="_blank" rel="noopener">${ic('whats')}<span>WhatsApp</span></a>
</div>`;

const blocoCiclo = (v, comFoto) => `<ol class="ciclo${comFoto ? ' ciclo-fotos' : ''}">${ciclo.map((c, i) => `<li class="etapa">
  ${comFoto ? foto(`ciclo-${i + 1}`, c.nome, 'etapa-foto') : ''}
  <span class="etapa-n">${c.n}</span>
  <h3>${c.nome}</h3>
  <p>${c.texto}</p>
</li>`).join('')}</ol>`;

const blocoClientes = () => `<ul class="publico">${clientes.map((c, i) => `<li>${ic(icCliente[i], 'ic-g')}<h3>${c.nome}</h3><p>${c.texto}</p></li>`).join('')}</ul>`;

const blocoComprar = () => `<ol class="passos">${comoComprar.map((p, i) => `<li><span class="passo-n">${i + 1}</span><h3>${p.nome}</h3><p>${p.texto}</p></li>`).join('')}</ol>`;

const blocoMapa = () => `<div class="mapa"><iframe src="${mapaEmbed}" title="Mapa: ${esc(E.mapa)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const linhaMosaico = v => `<div class="mosaico">${linhas.map((l, i) => `<a class="mos mos-${i + 1}" href="${link(v, 'sementes')}#${l.id}">
  ${foto(l.img, l.nome)}
  <span class="mos-txt"><strong>${l.nome}</strong><small>${l.especies.slice(0, 3).join(', ')} e mais</small></span>
</a>`).join('')}</div>`;

// ---------- homes ----------
function homeA(v) {
  return `<section class="hero-a"><div class="in hero-a-grade">
  <div class="hero-a-txt">
    <p class="eyebrow">Chapecó · Santa Catarina · desde ${E.desde}</p>
    <h1>Sementes de hortaliças, flores e gramas para quem planta e para quem revende.</h1>
    <p class="lead">A Agromil distribui sementes no atacado há mais de ${new Date().getFullYear() - E.desde} anos. Atendimento direto com a equipe de vendas, do pedido à entrega.</p>
    <div class="botoes"><a class="btn btn-verde" href="${link(v, 'sementes')}">Ver as linhas de sementes ${ic('seta')}</a><a class="btn btn-claro" href="${link(v, 'vendas')}">Falar com vendas</a></div>
  </div>
  <div class="hero-a-fotos">
    ${foto('hero', 'Canteiros de hortaliças', 'hf-1', ' loading="eager" fetchpriority="high"')}
    ${foto('bandeja', 'Mudas em bandeja', 'hf-2', ' loading="eager"')}
    <img class="hf-semente" src="/assets/semente.png" alt="" width="36" height="85">
  </div>
</div></section>

<section class="faixa-vendas"><div class="in">
  <div class="fv-tit"><p class="eyebrow">Vendas</p><h2>Fale direto com quem vende.</h2><p>Escritório <a href="tel:${E.foneHref}">${E.fone}</a> · <a href="mailto:${E.email}">${E.email}</a></p></div>
  <div class="fv-lista">${vendedores.map(p => vendedorItem(p)).join('')}</div>
</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Linhas de sementes</p><h2>Da folhosa à flor, tudo para o canteiro.</h2></div><a class="link-seta" href="${link(v, 'sementes')}">Todas as linhas ${ic('seta')}</a></div>
  ${linhaMosaico(v)}
</div></section>

<section class="sec sec-tinta"><div class="in sobre-a">
  <div class="sobre-ano"><span>desde</span><strong>${E.desde}</strong><span>no oeste catarinense</span></div>
  <div>
    <p class="eyebrow">A Agromil</p>
    <h2>Uma empresa de sementes de Chapecó.</h2>
    <p class="lead">A ${E.razao} trabalha com o comércio atacadista de sementes de hortaliças, flores e gramas. São quase quatro décadas atendendo revendas, produtores e viveiros a partir de Chapecó.</p>
    <a class="link-seta" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a>
  </div>
</div></section>

<section class="sec sec-verde"><div class="in">
  <p class="eyebrow eyebrow-claro">Da semente à colheita</p>
  <h2>Tudo começa com uma boa semente.</h2>
  ${blocoCiclo(v, false)}
</div></section>

<section class="sec"><div class="in">
  <p class="eyebrow">Para quem vendemos</p>
  <h2>Atendimento para cada tipo de cliente.</h2>
  ${blocoClientes()}
</div></section>

<section class="sec sec-tinta"><div class="in contato-home">
  <div>
    <p class="eyebrow">Onde estamos</p>
    <h2>Rua Mato Grosso, 1017-D, Chapecó.</h2>
    <p>${E.endereco} · ${E.cidade} · CEP ${E.cep}</p>
    <div class="botoes"><a class="btn btn-verde" href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a><a class="btn btn-claro" href="${mapaLink}" target="_blank" rel="noopener">${ic('pin')}Como chegar</a></div>
  </div>
  ${blocoMapa()}
</div></section>`;
}

function homeB(v) {
  return `<section class="hero-b">
  ${foto('hero', 'Canteiros de hortaliças', 'hero-b-foto', ' loading="eager" fetchpriority="high"')}
  <div class="in hero-b-txt">
    <p class="eyebrow eyebrow-claro">Agromil Sementes · Chapecó, SC</p>
    <h1>Da semente à colheita, desde ${E.desde}.</h1>
    <p class="lead">Sementes de hortaliças, flores e gramas no atacado, com atendimento direto da equipe de vendas.</p>
    <div class="botoes"><a class="btn btn-lima" href="${link(v, 'sementes')}">Conhecer as linhas ${ic('seta')}</a><a class="btn btn-linha" href="${wa(E.whats, msgPadrao)}" target="_blank" rel="noopener">${ic('whats')}Pedir orçamento</a></div>
  </div>
  <div class="hero-b-dados"><div class="in">
    <div><strong>${E.desde}</strong><span>início da Agromil</span></div>
    <div><strong>${linhas.length} linhas</strong><span>hortaliças, flores e gramas</span></div>
    <div><strong>${vendedores.length} vendedores</strong><span>atendimento direto</span></div>
  </div></div>
</section>

<section class="sec"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">O caminho da semente</p><h2>Cinco etapas entre o pacote e a mesa.</h2></div><p class="nota">A Agromil cuida da primeira, e ajuda você a acertar todas as outras.</p></div>
  ${blocoCiclo(v, true)}
</div></section>

<section class="sec sec-tinta"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Linhas de sementes</p><h2>O que você encontra na Agromil.</h2></div><a class="link-seta" href="${link(v, 'sementes')}">Montar minha lista ${ic('seta')}</a></div>
  <div class="linhas-b">${linhas.map((l, i) => `<a class="lb" href="${link(v, 'sementes')}#${l.id}">
    ${foto(l.img, l.nome, 'lb-foto')}
    <span class="lb-n">0${i + 1}</span>
    <h3>${l.nome}</h3>
    <p>${l.especies.slice(0, 4).join(' · ')}</p>
  </a>`).join('')}</div>
</div></section>

<section class="sec sec-marrom"><div class="in vendas-b">
  <div>
    <p class="eyebrow eyebrow-claro">Vendas</p>
    <h2>Seu pedido com quem entende de semente.</h2>
    <p class="lead">Escolha um vendedor e chame no WhatsApp. Variedades, embalagens, preço e entrega são combinados direto com ele.</p>
  </div>
  <div class="vendas-b-lista">${vendedores.map(p => vendedorItem(p, 'vend-escuro')).join('')}</div>
</div></section>

<section class="sec"><div class="in sobre-b">
  ${foto('sementes', 'Sementes na mão', 'sobre-b-foto')}
  <div>
    <p class="eyebrow">A Agromil</p>
    <h2>Quase quatro décadas no comércio de sementes.</h2>
    <p>Fundada em ${E.desde} em Chapecó, a ${E.razao} atende revendas agropecuárias, produtores de hortaliças, viveiros e floriculturas com sementes de hortaliças, flores e gramas.</p>
    ${blocoClientes()}
  </div>
</div></section>

<section class="sec sec-verde"><div class="in contato-home">
  <div>
    <p class="eyebrow eyebrow-claro">Visite ou ligue</p>
    <h2>Rua Mato Grosso, 1017-D, Chapecó.</h2>
    <p>${E.endereco} · ${E.cidade} · CEP ${E.cep}<br><a href="tel:${E.foneHref}">${E.fone}</a> · <a href="mailto:${E.email}">${E.email}</a></p>
    <div class="botoes"><a class="btn btn-lima" href="${mapaLink}" target="_blank" rel="noopener">${ic('pin')}Como chegar</a></div>
  </div>
  ${blocoMapa()}
</div></section>`;
}

// ---------- páginas internas ----------
function empresa(v) {
  return `${capa('A Agromil', 'Sementes de qualidade, desde ' + E.desde + '.', 'Uma empresa de Chapecó, Santa Catarina, no atacado de sementes de hortaliças, flores e gramas.', 'campo')}
<section class="sec"><div class="in duas-col">
  <div>
    <p class="eyebrow">Quem somos</p>
    <h2>Do oeste catarinense para a horta.</h2>
    <p class="lead">A ${E.razao} abriu as portas em ${E.desde}, em Chapecó. Desde então trabalha com o comércio atacadista de sementes olerícolas (hortaliças), de flores e de gramas, e também com plantas e flores no varejo.</p>
    <p>O atendimento é feito por uma equipe de vendas própria, que conhece as culturas da região e acompanha o cliente do pedido à entrega. O escritório fica na Rua Mato Grosso, no bairro São Cristóvão.</p>
  </div>
  <dl class="ficha">
    <div><dt>Razão social</dt><dd>${E.razao}</dd></div>
    <div><dt>CNPJ</dt><dd>${E.cnpj}</dd></div>
    <div><dt>Início</dt><dd>${E.desde}</dd></div>
    <div><dt>Atividade</dt><dd>Atacado de sementes de hortaliças, flores e gramas</dd></div>
    <div><dt>Endereço</dt><dd>${E.endereco}, ${E.cidade}</dd></div>
  </dl>
</div></section>
<section class="sec sec-verde"><div class="in">
  <p class="eyebrow eyebrow-claro">Da semente à colheita</p>
  <h2>Onde a Agromil entra no ciclo.</h2>
  ${blocoCiclo(v, v === 'b')}
</div></section>
<section class="sec"><div class="in">
  <p class="eyebrow">Para quem vendemos</p>
  <h2>Revenda, produção, viveiro e jardim.</h2>
  ${blocoClientes()}
  <div class="botoes"><a class="btn btn-verde" href="${link(v, 'vendas')}">Falar com vendas ${ic('seta')}</a></div>
</div></section>`;
}

function sementes(v) {
  return `${capa('Linhas de sementes', 'Sementes de hortaliças, flores e gramas.', 'Toque nas espécies para montar sua lista e envie para um vendedor pelo WhatsApp.', 'bandeja')}
<nav class="filtro" aria-label="Linhas"><div class="in">${linhas.map(l => `<a href="#${l.id}">${l.nome}</a>`).join('')}</div></nav>
<section class="sec"><div class="in">
  ${linhas.map((l, i) => `<article class="linha${i % 2 ? ' linha-inv' : ''}" id="${l.id}">
    ${foto(l.img, l.nome, 'linha-foto')}
    <div class="linha-txt">
      <span class="linha-n">0${i + 1}</span>
      <h2>${l.nome}</h2>
      <p>${l.texto}</p>
      <ul class="chips">${l.especies.map(s => `<li><button type="button" class="chip" data-item="${esc(s)}" aria-pressed="false">${ic('mais', 'ic ic-mais')}${ic('ok', 'ic ic-ok')}${s}</button></li>`).join('')}</ul>
    </div>
  </article>`).join('')}
  <p class="nota">Variedades, marcas, tamanhos de embalagem e disponibilidade de cada safra: consulte a equipe de vendas.</p>
</div></section>
<div class="lista-barra" hidden>
  <div class="in">
    <span>${ic('lista')}<b class="lista-qtd">0</b> itens na lista</span>
    <div class="lista-acoes">
      ${vendedores.map(p => `<a class="btn btn-lima btn-p" data-wa="${p.whats}" href="${wa(p.whats, msgPadrao)}" target="_blank" rel="noopener">${ic('whats')}${p.nome}</a>`).join('')}
      <button type="button" class="lista-limpar" aria-label="Limpar lista">${ic('fechar')}</button>
    </div>
  </div>
</div>`;
}

function vendas(v) {
  return `${capa('Vendas', 'Fale direto com um vendedor.', 'A Agromil atende pela equipe de vendas: ligue ou chame no WhatsApp quem preferir.', 'frutos')}
<section class="sec"><div class="in">
  <div class="vendas-pag">${vendedores.map(p => vendedorItem(p, 'vend-grande')).join('')}</div>
  <p class="nota">Escritório: <a href="tel:${E.foneHref}">${E.fone}</a> · <a href="tel:${E.celularHref}">${E.celular}</a> · <a href="mailto:${E.email}">${E.email}</a></p>
</div></section>
<section class="sec sec-tinta"><div class="in">
  <p class="eyebrow">Como comprar</p>
  <h2>Três passos, sem complicação.</h2>
  ${blocoComprar()}
</div></section>
<section class="sec"><div class="in duas-col">
  <div>
    <p class="eyebrow">Pedido de orçamento</p>
    <h2>Conte o que você precisa.</h2>
    <p class="lead">Preencha e o pedido abre pronto no WhatsApp do vendedor escolhido.</p>
  </div>
  <form class="form" data-pedido>
    <label>Seu nome<input name="nome" required autocomplete="name"></label>
    <label>Cidade<input name="cidade" required autocomplete="address-level2"></label>
    <label>Você é<select name="tipo">${clientes.map(c => `<option>${c.nome}</option>`).join('')}<option>Outro</option></select></label>
    <label>O que precisa<textarea name="msg" rows="4" required placeholder="Espécies, quantidades, época de plantio"></textarea></label>
    <label>Enviar para<select name="vend">${vendedores.map(p => `<option value="${p.whats}">${p.nome}</option>`).join('')}</select></label>
    <button class="btn btn-verde" type="submit">${ic('whats')}Enviar pelo WhatsApp</button>
  </form>
</div></section>`;
}

function contato(v) {
  return `${capa('Contato', 'Visite, ligue ou escreva.', `${E.endereco} · ${E.cidade} · CEP ${E.cep}`, 'estufa')}
<section class="sec"><div class="in canais">
  <a class="canal" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small><b>${E.fone}</b></span></a>
  <a class="canal" href="tel:${E.celularHref}">${ic('tel')}<span><small>Celular</small><b>${E.celular}</b></span></a>
  <a class="canal" href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small><b>${E.email}</b></span></a>
  <a class="canal" href="${mapaLink}" target="_blank" rel="noopener">${ic('pin')}<span><small>Endereço</small><b>${E.endereco}</b></span></a>
</div></section>
<section class="sec sec-tinta"><div class="in contato-home">
  <form class="form" data-mailto="${E.email}" data-assunto="Contato pelo site">
    <h2>Mande uma mensagem</h2>
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>Telefone<input name="fone" type="tel" autocomplete="tel"></label>
    <label>Mensagem<textarea name="msg" rows="5" required></textarea></label>
    <button class="btn btn-verde" type="submit">${ic('mail')}Enviar por e-mail</button>
  </form>
  ${blocoMapa()}
</div></section>
<section class="sec"><div class="in">
  <p class="eyebrow">Vendas</p>
  <div class="vendas-pag">${vendedores.map(p => vendedorItem(p)).join('')}</div>
  <details class="creditos" id="creditos"><summary>Créditos das fotos ilustrativas</summary><ul>${creditos.map(c => `<li>${c}</li>`).join('')}</ul></details>
</div></section>`;
}

export function gerarVersao(v) {
  const nomeV = nomesVersao[v];
  const t = s => `${s} · Agromil Sementes`;
  return {
    index: pagina(v, 'index', `Agromil Sementes · Sementes de hortaliças, flores e gramas em Chapecó (SC)`, `Atacado de sementes de hortaliças, flores e gramas em Chapecó, SC, desde ${E.desde}. Versão ${nomeV}.`, v === 'a' ? homeA(v) : homeB(v)),
    empresa: pagina(v, 'empresa', t('A Agromil'), `A Agromil Sementes Olerícolas, de Chapecó (SC), trabalha no atacado de sementes desde ${E.desde}.`, empresa(v)),
    sementes: pagina(v, 'sementes', t('Linhas de sementes'), 'Folhosas, hortaliças de fruto, raízes, temperos, flores e gramas. Monte sua lista e envie ao vendedor.', sementes(v)),
    vendas: pagina(v, 'vendas', t('Vendas'), 'Fale direto com os vendedores da Agromil Sementes: Edinei, Clademir e Rudiney.', vendas(v)),
    contato: pagina(v, 'contato', t('Contato'), `${E.endereco}, ${E.cidade}. Telefone ${E.fone}.`, contato(v)),
  };
}
