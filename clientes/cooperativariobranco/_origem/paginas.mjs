// Monta as versões A ("Tradição", verde forte como o site atual) e B ("Mercado", clara, puxada pelas lojas).
// Páginas internas com o mesmo conteúdo; topo, rodapé e home mudam por versão. Estilos em public/assets/{base,a,b}.css.
import {
  E, telefones, emails, lojas, linhaDoTempo, institucional, historico, objetivos,
  primeiraDiretoria, presidentes, diretoriaAtual, estruturaDirecao, hino,
} from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" srcset="/assets/img/${n}-p.webp 800w, /assets/img/${n}.webp 1800w" sizes="(max-width: 800px) 100vw, 60vw" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Tradição', b: 'Mercado' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'institucional', nome: 'Institucional', caminho: 'institucional/' },
  { slug: 'historico', nome: 'Histórico', caminho: 'historico/' },
  { slug: 'presidentes', nome: 'Presidentes', caminho: 'presidentes/' },
  { slug: 'lojas', nome: 'Nossas Lojas', caminho: 'lojas/' },
  { slug: 'ofertas', nome: 'Ofertas da Semana', caminho: 'ofertas/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  carrinho: '<path d="M3 4h2l2.5 11h11L21 7H6.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  folha: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
  pao: '<path d="M4 11a8 5 0 0116 0v7a1 1 0 01-1 1H5a1 1 0 01-1-1z"/><path d="M9 9v3M12 8v4M15 9v3"/>',
  camisa: '<path d="M8 3l-5 3 2 4 2-1v12h10V9l2 1 2-4-5-3a4 4 0 01-8 0z"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const icone = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icLoja = { super1: 'carrinho', super2: 'pao', agricola: 'folha', confeccao: 'camisa' };
// Os dois pinheiros do selo, como marcador.
const pinheiros = (cls = 'pinheiros') => `<svg class="${cls}" viewBox="0 0 72 60" aria-hidden="true"><path d="M18 0L0 46h36zM54 0L36.5 46H72z"/><rect x="14.5" y="45" width="7" height="15"/><rect x="50.5" y="45" width="7" height="15"/></svg>`;

const marca = v => `<a class="marca" href="/${v}/" aria-label="${E.razao}, início">
  <img class="selo" src="/assets/selo.svg" alt="" width="64" height="64">
  <span class="marca-txt"><small>Cooperativa Agrícola Mista</small><strong>Rio Branco</strong>${v === 'a' ? `<em>${E.slogan}...</em>` : ''}</span>
</a>`;

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
<meta name="theme-color" content="${v === 'a' ? '#0b7a2a' : '#ffffff'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<link rel="preload" href="/assets/rb-titulo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function menu(v, slug) {
  return nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === slug ? ' aria-current="page"' : ''}${n.slug === 'ofertas' && v === 'b' ? ' class="nav-ofertas"' : ''}>${n.nome}</a>`).join('');
}

function topo(v, slug) {
  if (v === 'a') return `<div class="barra"><div class="wrap">
  <span>${icone('pin')} ${E.endereco}</span>
  <span><a href="tel:${telefones[0].href}">${icone('tel')} Matriz ${telefones[0].num}</a><a href="tel:${telefones[2].href}">Filial ${telefones[2].num}</a></span>
</div></div>
<header class="topo"><div class="wrap">
  ${marca(v)}
  <button class="abre-menu" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${icone('menu')}</button>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, slug)}</nav>
</div></header>
<div class="faixas" aria-hidden="true"><i></i><i></i><i></i></div>`;
  return `<header class="topo"><div class="wrap">
  ${marca(v)}
  <button class="abre-menu" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${icone('menu')}</button>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, slug)}</nav>
  <a class="topo-tel" href="tel:${telefones[0].href}">${icone('tel')}<span><small>Matriz</small>${telefones[0].num}</span></a>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="wrap">
  <div class="rod-marca">${marca(v)}<p>${E.razao}<br>${E.lema}. Desde 1941 em São Marcos, RS.</p></div>
  <div><h3>Páginas</h3>${nav.map(n => `<a href="/${v}/${n.caminho}">${n.nome}</a>`).join('')}</div>
  <div><h3>Lojas</h3>${lojas.map(l => `<a href="/${v}/lojas/#${l.id}">${l.nome}</a>`).join('')}</div>
  <div><h3>Contato</h3>
    <a href="${E.mapa}" target="_blank" rel="noopener">${E.endereco}</a>
    ${telefones.slice(0, 3).map(t => `<a href="tel:${t.href}">${t.nome}: ${t.num}</a>`).join('')}
    <a href="mailto:${E.email}">${E.email}</a>
  </div>
</div>
<div class="wrap rod-fim"><span>© ${new Date().getFullYear()} ${E.razao}</span><span>${E.slogan}.</span></div>
</footer>`;
}

function pagina(v, slug, titulo, descricao, corpo) {
  const p = nav.find(n => n.slug === slug).caminho;
  return `${head(v, p, titulo, descricao)}
<body class="v-${v} pg-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;
}

// Abertura das páginas internas.
function abertura(v, titulo, texto, foto) {
  if (v === 'a') return `<section class="ab-a"><div class="ab-foto">${img(foto, '', ' fetchpriority="high" loading="eager"')}</div><div class="wrap"><p class="sobre">${E.nome}</p><h1>${titulo}</h1><p>${texto}</p></div></section>`;
  return `<section class="ab-b"><div class="wrap"><div><p class="sobre">${pinheiros('pin-mini')} ${E.nome}</p><h1>${titulo}</h1><p>${texto}</p></div><figure>${img(foto, '', ' fetchpriority="high" loading="eager"')}</figure></div></section>`;
}

const cta = v => `<section class="cta"><div class="wrap">
  <div><h2>Fale com a Cooperativa</h2><p>Atendemos associados, clientes e fornecedores pela matriz e por cada loja.</p></div>
  <div class="cta-tels">${telefones.slice(0, 3).map(t => `<a href="tel:${t.href}">${icone('tel')}<span><small>${t.nome}</small>${t.num}</span></a>`).join('')}</div>
</div></section>`;

const timeline = cls => `<ol class="linha ${cls}">${linhaDoTempo.map(t => `<li><span class="ano">${t.ano}</span><h3>${t.titulo}</h3><p>${t.texto}</p></li>`).join('')}
  <li class="hoje"><span class="ano">Hoje</span><h3>Quatro lojas</h3><p>Dois supermercados, a Loja Agrícola e a Loja de Confecções, todos em São Marcos.</p></li></ol>`;

// ---------- home A ----------
function homeA() {
  const v = 'a';
  return `<section class="hero-a">
  <div class="hero-foto">${img('matriz-agricola', 'Prédio da matriz da Cooperativa Rio Branco com a Loja Agrícola, no centro de São Marcos', ' fetchpriority="high" loading="eager" sizes="100vw"')}</div>
  <div class="wrap">
    <p class="sobre">Cooperativa Agrícola Mista Rio Branco · São Marcos, RS</p>
    <h1>Tradição, qualidade e preço justo desde 1941.</h1>
    <p class="lead">Supermercados, Loja Agrícola e Loja de Confecções de uma cooperativa fundada por 70 agricultores de São Marcos.</p>
    <div class="botoes"><a class="bt bt-amarelo" href="/a/lojas/">Conheça as lojas ${icone('seta')}</a><a class="bt bt-linha" href="/a/ofertas/">Ofertas da Semana</a></div>
  </div>
</section>
<section class="numeros"><div class="wrap">
  <div><strong>1941</strong><span>ano da fundação, em 14 de dezembro</span></div>
  <div><strong>70</strong><span>sócios fundadores, quase todos agricultores</span></div>
  <div><strong>4</strong><span>lojas: 2 supermercados, agrícola e confecções</span></div>
  <div><strong>1949</strong><span>inauguração do moinho de trigo e milho</span></div>
</div></section>
<section class="entradas"><div class="wrap">
  ${[
    ['historico', 'Histórico', 'Uma cooperativa com mais de oito décadas de trabalho e responsabilidade.', 'Saiba um pouco mais sobre a história da Cooperativa Rio Branco.'],
    ['presidentes', 'Presidentes', 'Ao longo dos anos, cada presidente foi responsável por uma parte do crescimento.', 'Conheça-os.'],
    ['lojas', 'Nossas Lojas', 'São 2 supermercados, uma Loja Agrícola e uma Loja de Artigos para Vestuário.', 'Conheça um pouco de cada uma delas.'],
    ['contato', 'Fale Conosco', 'Todas as formas de contato com a cooperativa, por área e por loja.', 'Teremos o maior prazer em atendê-lo.'],
  ].map(([s, t, d, l]) => `<a class="entrada" href="/a/${s}/">${pinheiros()}<h2>${t}</h2><p>${d}</p><span>${l} ${icone('seta')}</span></a>`).join('')}
</div></section>
<section class="lojas-a"><div class="wrap">
  <div class="tit"><p class="sobre">Nossas lojas</p><h2>Do insumo da lavoura ao mercado da família</h2></div>
  ${lojas.map((l, i) => `<article class="loja-a${i % 2 ? ' inv' : ''}" id="${l.id}">
    <figure>${img(l.foto2, `${l.nome}, ${l.tipo}`)}</figure>
    <div><span class="desde">Desde ${l.desde}</span><h3>${l.nome}</h3><p class="tipo">${l.tipo}</p><p>${l.curto}</p>
    <a class="tel-loja" href="tel:${l.tel.href}">${icone('tel')} ${l.tel.num}</a></div>
  </article>`).join('')}
</div></section>
<section class="historia-a"><div class="wrap">
  <div class="tit"><p class="sobre">Nossa história</p><h2>Da venda em comum da colheita às quatro lojas de hoje</h2></div>
  ${timeline('linha-a')}
  <a class="bt bt-amarelo" href="/a/historico/">Ler o histórico completo ${icone('seta')}</a>
</div></section>
<section class="hino-a"><div class="wrap">
  ${img('matriz-esquina', 'Esquina da matriz da Cooperativa Agrícola Mista Rio Branco')}
  <blockquote><p>“Enfrentamos a luta unidos, pois baqueia quem luta sozinho.”</p><cite>Hino da Cooperativa, 1971</cite></blockquote>
</div></section>
${cta(v)}`;
}

// ---------- home B ----------
function homeB() {
  const v = 'b';
  return `<section class="hero-b"><div class="wrap">
  <div class="hero-txt">
    <p class="sobre">${pinheiros('pin-mini')} São Marcos, RS · desde 1941</p>
    <h1>A cooperativa de São Marcos, do campo à mesa.</h1>
    <p class="lead">Dois supermercados, Loja Agrícola e Loja de Confecções da Cooperativa Agrícola Mista Rio Branco. ${E.slogan}.</p>
    <div class="botoes"><a class="bt bt-verde" href="/b/lojas/">Nossas lojas ${icone('seta')}</a><a class="bt bt-claro" href="/b/ofertas/">Ofertas da Semana</a></div>
  </div>
  <div class="mosaico">
    <figure class="m1">${img('super2-interior', 'Interior do Super Coop com hortifrúti, padaria e confeitaria', ' fetchpriority="high" loading="eager"')}</figure>
    <figure class="m2">${img('super1-fachada', 'Fachada do Super Coop I')}</figure>
    <figure class="m3">${img('agricola-interior', 'Loja Agrícola com roçadeiras Stihl')}</figure>
    <span class="selo-grande"><img src="/assets/selo.svg" alt="" width="120" height="120"></span>
  </div>
</div></section>
<section class="tels-b"><div class="wrap">
  ${lojas.map(l => `<a href="tel:${l.tel.href}">${icone(icLoja[l.id])}<span><strong>${l.nome}</strong><small>${l.tel.num}</small></span></a>`).join('')}
</div></section>
<section class="abas-b"><div class="wrap">
  <div class="tit"><h2>Escolha a loja</h2><p>Cada loja da cooperativa atende uma parte da vida de São Marcos.</p></div>
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist">${lojas.map((l, i) => `<button role="tab" id="aba-${l.id}" aria-controls="painel-${l.id}" aria-selected="${i === 0}">${icone(icLoja[l.id])} ${l.nome}</button>`).join('')}</div>
    ${lojas.map((l, i) => `<div class="painel" role="tabpanel" id="painel-${l.id}" aria-labelledby="aba-${l.id}"${i ? ' hidden' : ''}>
      <figure>${img(l.foto, `${l.nome}`)}</figure>
      <div><span class="desde">Desde ${l.desde}</span><h3>${l.nome}</h3><p class="tipo">${l.tipo}</p>${l.texto.map(t => `<p>${t}</p>`).join('')}
      <div class="painel-acoes"><a class="bt bt-verde" href="tel:${l.tel.href}">${icone('tel')} ${l.tel.num}</a>${l.email ? `<a class="bt bt-claro" href="mailto:${l.email}">${icone('mail')} E-mail</a>` : ''}</div></div>
    </div>`).join('')}
  </div>
</div></section>
<section class="obj-b"><div class="wrap">
  <div class="tit"><p class="sobre">Por que uma cooperativa</p><h2>Os objetivos de 1941 continuam aqui</h2><p>Os agricultores de São Marcos vendiam a colheita em condições muito desfavoráveis. Juntos, mudaram isso.</p></div>
  <ol class="setas">${objetivos.map((o, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${o.t}</h3><p>${o.d}</p></li>`).join('')}</ol>
</div></section>
<section class="hist-b"><div class="wrap">
  <figure>${img('matriz-esquina', 'Prédio da matriz da Cooperativa Agrícola Mista Rio Branco')}<figcaption>A matriz, na Rua Padre Feijó</figcaption></figure>
  <div><p class="sobre">Histórico</p><h2>Fundada por 70 agricultores em 14 de dezembro de 1941</h2>
  <p>${historico[1]}</p><p>O moinho de trigo e milho foi inaugurado em 31 de janeiro de 1949. Depois vieram o Super Coop I (1983), a Loja de Confecções própria (1991) e o Super Coop II (1998).</p>
  <a class="link" href="/b/historico/">Histórico completo ${icone('seta')}</a></div>
</div></section>
${cta(v)}`;
}

// ---------- páginas internas ----------
function institucionalPg(v) {
  return `${abertura(v, 'Institucional', 'Desde 1941, atendimento eficaz aos associados e à população de São Marcos.', 'matriz-esquina')}
<section class="texto"><div class="wrap duas">
  <div class="corrido">${institucional.map(t => `<p>${t}</p>`).join('')}</div>
  <aside class="ficha"><h2>${E.razao}</h2><dl>
    <dt>Fundação</dt><dd>${E.fundacao}</dd>
    <dt>Sede</dt><dd>${E.endereco}</dd>
    <dt>Lojas</dt><dd>Super Coop I, Super Coop II, Loja Agrícola e Loja de Confecções</dd>
    <dt>Lema</dt><dd>${E.slogan}. ${E.lema}.</dd>
  </dl></aside>
</div></section>
<section class="faixa-fotos"><div class="wrap">${['super1-interior', 'agricola-interior', 'confeccao'].map(f => `<figure>${img(f, '')}</figure>`).join('')}</div></section>
${cta(v)}`;
}

function historicoPg(v) {
  return `${abertura(v, 'Histórico', 'Fundada em 14 de dezembro de 1941 por 70 sócios, quase todos agricultores de São Marcos.', 'matriz-agricola')}
<section class="texto"><div class="wrap duas">
  <div class="corrido">${historico.map(t => `<p>${t}</p>`).join('')}</div>
  <aside class="ficha"><h2>A primeira diretoria</h2><dl>${primeiraDiretoria.map(d => `<dt>${d.cargo}</dt><dd>${d.nome}</dd>`).join('')}</dl></aside>
</div></section>
<section class="historia-${v}"><div class="wrap"><div class="tit"><h2>Linha do tempo</h2></div>${timeline(`linha-${v}`)}</div></section>
<section class="hino"><div class="wrap">
  <div class="tit"><p class="sobre">1971, trigésimo aniversário</p><h2>Hino da Cooperativa</h2></div>
  <div class="hino-grade">
    ${hino.estrofes.map((e, i) => `<div class="estrofe"><span>${i + 1}</span><p>${e.join('<br>')}</p></div>`).join('')}
    <div class="estribilho"><span>Estribilho</span><p>${hino.estribilho.join('<br>')}</p></div>
  </div>
  <p class="fonte">${hino.fonte}</p>
</div></section>`;
}

function presidentesPg(v) {
  return `${abertura(v, 'Presidentes', 'Cada presidente foi responsável por uma parte do crescimento da Cooperativa.', 'matriz-esquina')}
<section class="direcao"><div class="wrap">
  <div class="estrutura"><h2>Como a direção é composta</h2><ul>${estruturaDirecao.map(c => `<li>${c}</li>`).join('')}</ul></div>
  <div class="geracoes">
    <div class="ger"><span class="rot">Atual diretoria</span>${diretoriaAtual.map(d => `<p><small>${d.cargo}</small><strong>${d.nome}</strong></p>`).join('')}</div>
    <div class="ger"><span class="rot">Também presidiram a Cooperativa</span>${presidentes.map(n => `<p><strong>${n}</strong></p>`).join('')}</div>
    <div class="ger"><span class="rot">1ª diretoria, 1941</span>${primeiraDiretoria.map(d => `<p><small>${d.cargo}</small><strong>${d.nome}</strong></p>`).join('')}</div>
  </div>
</div></section>
${cta(v)}`;
}

function lojasPg(v) {
  return `${abertura(v, 'Nossas Lojas', 'Dois supermercados, uma Loja Agrícola e uma Loja de Artigos para Vestuário, em São Marcos.', 'super2-fachada')}
<nav class="atalhos"><div class="wrap">${lojas.map(l => `<a href="#${l.id}">${icone(icLoja[l.id])} ${l.nome}</a>`).join('')}</div></nav>
${lojas.map((l, i) => `<section class="loja-pg${i % 2 ? ' inv' : ''}" id="${l.id}"><div class="wrap">
  <div class="fotos"><figure>${img(l.foto, `${l.nome}`)}</figure><figure>${img(l.foto2, `${l.nome}, ${l.tipo}`)}</figure></div>
  <div class="info"><span class="desde">Desde ${l.desde}</span><h2>${l.nome}</h2><p class="tipo">${l.tipo}</p>${l.texto.map(t => `<p>${t}</p>`).join('')}
    <ul class="contatos"><li><a href="tel:${l.tel.href}">${icone('tel')} ${l.tel.num}</a></li>${l.email ? `<li><a href="mailto:${l.email}">${icone('mail')} ${l.email}</a></li>` : ''}</ul></div>
</div></section>`).join('')}
${cta(v)}`;
}

function ofertasPg(v) {
  return `${abertura(v, 'Ofertas da Semana', 'As ofertas dos supermercados Super Coop I e Super Coop II.', 'super1-interior')}
<section class="ofertas"><div class="wrap">
  <div class="encarte">
    <span class="rot">${icone('relogio')} Encarte da semana</span>
    <h2>As ofertas da semana são publicadas aqui pelos supermercados</h2>
    <p>Esta é a área do encarte semanal do Super Coop I e do Super Coop II. Para saber das ofertas de hoje, ligue para a loja mais perto de você.</p>
    <div class="painel-acoes">${[telefones[1], telefones[2]].map(t => `<a class="bt ${v === 'a' ? 'bt-amarelo' : 'bt-verde'}" href="tel:${t.href}">${icone('tel')} ${t.nome}: ${t.num}</a>`).join('')}</div>
  </div>
  <div class="ofertas-lojas">${lojas.slice(0, 2).map(l => `<a href="/${v}/lojas/#${l.id}"><figure>${img(l.foto2, l.nome)}</figure><span><strong>${l.nome}</strong><small>${l.tipo}</small></span></a>`).join('')}</div>
</div></section>`;
}

function contatoPg(v) {
  return `${abertura(v, 'Contato', 'Fale diretamente com a área interessada: assim a sua dúvida chega mais rápido a quem pode responder.', 'matriz-agricola')}
<section class="contato"><div class="wrap">
  <div class="tels"><h2>Telefones</h2><ul>${telefones.map(t => `<li><span>${t.nome}</span><a href="tel:${t.href}">${t.num}</a></li>`).join('')}</ul></div>
  <div class="mails"><h2>E-mails por área</h2><ul>${emails.map(e => `<li><span>${e.area}</span><a href="mailto:${e.email}">${e.email}</a></li>`).join('')}</ul></div>
  <form class="form" data-form action="mailto:${E.email}" method="post" enctype="text/plain">
    <h2>Mande uma mensagem</h2>
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>Telefone ou e-mail<input name="contato" required></label>
    <label>Assunto<select name="assunto">${['Assuntos da cooperativa', 'Supermercados', 'Loja Agrícola', 'Loja de Confecções', 'Recursos Humanos', 'Compras e fornecedores'].map(a => `<option>${a}</option>`).join('')}</select></label>
    <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
    <button class="bt ${v === 'a' ? 'bt-amarelo' : 'bt-verde'}" type="submit">Enviar ${icone('seta')}</button>
  </form>
</div></section>
<section class="mapa"><div class="wrap"><div class="mapa-info">${icone('pin')}<p><strong>Matriz</strong>${E.endereco}</p><a href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa</a></div>
<iframe src="${E.mapaEmbed}" title="Mapa da matriz da Cooperativa Rio Branco" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></section>`;
}

const meta = {
  index: ['Cooperativa Rio Branco | Tradição, qualidade e preço justo', 'Cooperativa Agrícola Mista Rio Branco, São Marcos RS: Super Coop I e II, Loja Agrícola e Loja de Confecções desde 1941.'],
  institucional: ['Institucional | Cooperativa Rio Branco', 'A Cooperativa Agrícola Mista Rio Branco atende associados e a população de São Marcos desde 1941.'],
  historico: ['Histórico | Cooperativa Rio Branco', 'Fundada em 14 de dezembro de 1941 por 70 sócios, com moinho inaugurado em 1949. História e hino da Cooperativa.'],
  presidentes: ['Presidentes | Cooperativa Rio Branco', 'A diretoria atual, os presidentes e a primeira diretoria da Cooperativa Agrícola Mista Rio Branco.'],
  lojas: ['Nossas Lojas | Cooperativa Rio Branco', 'Super Coop I, Super Coop II, Loja Agrícola e Loja de Confecções em São Marcos, RS.'],
  ofertas: ['Ofertas da Semana | Cooperativa Rio Branco', 'Ofertas da semana dos supermercados Super Coop I e Super Coop II, em São Marcos.'],
  contato: ['Contato | Cooperativa Rio Branco', 'Telefones e e-mails da Cooperativa Rio Branco por área e por loja. Rua Padre Feijó, 357, São Marcos, RS.'],
};

export function gerarVersao(v) {
  const corpos = {
    index: v === 'a' ? homeA() : homeB(),
    institucional: institucionalPg(v), historico: historicoPg(v), presidentes: presidentesPg(v),
    lojas: lojasPg(v), ofertas: ofertasPg(v), contato: contatoPg(v),
  };
  return Object.fromEntries(Object.entries(corpos).map(([s, c]) => [s, pagina(v, s, meta[s][0], meta[s][1], c)]));
}
