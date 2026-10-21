// Monta as páginas das versões A ("Embalagem": o vermelho e as fitas da embalagem Belo Minas, menu com o logo no meio como no site atual,
// prateleira de produtos com setas vermelhas) e B ("Da fonte": paisagem, o caminho do leite em três etapas, fichas com rótulo nutricional).
// Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, produtos, linhas, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, w = 1600, h = 1067, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const emb = (p, extra = '') => `<img src="/assets/prod/${p.img}.webp" alt="${esc(p.nome)} Belo Minas, embalagem" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Embalagem', b: 'Da fonte' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A Empresa', caminho: 'empresa/' },
  { slug: 'meio-ambiente', nome: 'Meio Ambiente', caminho: 'meio-ambiente/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'contato', nome: 'Fale Conosco', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M15 5l-7 7 7 7"/>',
  dir: '<path d="M9 5l7 7-7 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  reciclar: '<path d="M7 19H4l3-5M17 19h3l-3-5M9 5l3-2 3 2M8 14l-2-4M18 10l-2 4M10 19h4"/>',
  folha: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19l8-8"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  inseto: '<circle cx="12" cy="13" r="5"/><path d="M12 8V5M8 6l2 2M16 6l-2 2M4 13h3M17 13h3M5 19l3-2M19 19l-3-2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const iconeAmb = ['reciclar', 'gota', 'inseto', 'folha'];

// Fita (a faixa branca com o nome do queijo na embalagem), em SVG para esticar sem distorcer as pontas.
const fita = (txt, cls = 'fita') => `<span class="${cls}"><svg class="fita-p" viewBox="0 0 20 40" aria-hidden="true" preserveAspectRatio="none"><path d="M20 0H0l8 20-8 20h20z"/></svg><span class="fita-t">${txt}</span><svg class="fita-p fita-d" viewBox="0 0 20 40" aria-hidden="true" preserveAspectRatio="none"><path d="M0 0h20l-8 20 8 20H0z"/></svg></span>`;

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
<meta property="og:site_name" content="${E.nomeLongo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#D7261E' : '#FBF8F1'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700;1,800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual, cls = '') => `<a href="/${v}/${n.caminho}"${cls ? ` class="${cls}"` : ''}${n.slug === atual || (atual === 'produto' && n.slug === 'produtos') ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 400) => `<img src="/assets/logo.webp" alt="Belo Minas" width="${w}" height="${Math.round(w * 428 / 1596)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  const [ini, emp, amb, prod, cont] = nav;
  if (v === 'a') return `<div class="faixa-info"><div class="in"><span>${ic('relogio')} ${E.horario}</span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div>
<header class="topo"><div class="in">
  <a class="marca marca-cel" href="/a/" aria-label="Belo Minas, início">${logo(220)}</a>
  <nav id="menu" class="menu" aria-label="Principal">
    ${link(v, ini, atual, 'so-cel')}${link(v, emp, atual)}${link(v, amb, atual)}
    <a class="marca marca-pc" href="/a/" aria-label="Belo Minas, início">${logo(330)}</a>
    ${link(v, prod, atual)}${link(v, cont, atual)}
  </nav>
  ${menuBtn}
</div><div class="topo-listra" aria-hidden="true"></div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Belo Minas, início">${logo(230)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}
    <a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(260)}<p>${T.chamada}</p></div>
  <div><h3>Fale conosco</h3><p><a class="rod-tel" href="tel:${E.foneHref}">${E.fone}</a><br>${E.horario}</p></div>
  <div><h3>Qualidade</h3><p class="rod-sif">${ic('escudo')} Produtos inspecionados pelo S.I.F. nº ${E.sif}</p><p class="rod-selo"><img src="/assets/img/selo-verde.webp" alt="Selo Verde Belo Minas: Cuide do Meio Ambiente" width="800" height="272" loading="lazy"></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div><p class="rod-fim">© Belo Minas Laticínios · ${E.razao} · ${E.cidade}</p><p class="rod-cred">${creditos}</p></footer>`;
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

// ---------- blocos comuns ----------
const tabelaNut = p => `<table class="nut"><caption>Informação nutricional</caption><thead><tr><th scope="col">Nutriente</th><th scope="col">%VD*</th></tr></thead><tbody>${p.nut.map(([n, x]) => `<tr><th scope="row">${n}</th><td>${x}</td></tr>`).join('')}</tbody><tfoot><tr><td colspan="2">* % Valores Diários com base em uma dieta de 2.000 kcal, conforme a embalagem.</td></tr></tfoot></table>`;

const formContato = v => `<form class="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label>Departamento<select name="Departamento"><option>Comercial e revenda</option><option>Qualidade e SAC</option><option>Elogio ou sugestão</option><option>Outros assuntos</option></select></label>
    <label class="largo">Assunto<input name="Assunto"></label>
    <label class="largo">Comentários<textarea name="Comentários" rows="5" required></textarea></label>
  </div>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto no e-mail da Belo Minas. Enquanto isso, ligue <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</form>`;

// ---------- versão A ----------
function prateleira(v, lista = produtos, titulo = true) {
  return `<div class="prat" data-prat>
  <button class="prat-seta prat-esq" type="button" aria-label="Produtos anteriores" data-prat-ir="-1">${ic('esq')}</button>
  <ul class="prat-lista" tabindex="0" aria-label="Produtos Belo Minas">${lista.map(p => `<li><a class="prat-item" href="/${v}/produtos/${p.slug}/">
    <span class="prat-img">${emb(p)}</span>
    ${titulo ? fita(p.curto, 'fita fita-p-sm') : ''}<span class="prat-peso">${p.peso}</span></a></li>`).join('')}</ul>
  <button class="prat-seta prat-dir" type="button" aria-label="Próximos produtos" data-prat-ir="1">${ic('dir')}</button>
</div>`;
}

const homeA = () => {
  const esp = produtos[0];
  return `<section class="hero">
  <div class="hero-foto">${foto('pasto-holandesas', 'Vacas holandesas pastando', 1500, 1013, ' fetchpriority="high" loading="eager"')}</div>
  <div class="in hero-in">
    <div class="hero-txt">
      <p class="hero-sobre">${T.bannerHome}</p>
      <h1>O sabor do<br>verdadeiro queijo</h1>
      <p>${T.chamada}</p>
      <div class="acoes"><a class="btn" href="/a/produtos/">Conheça os produtos ${ic('seta')}</a><a class="btn btn-claro" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
    </div>
    <a class="hero-emb" href="/a/produtos/${esp.slug}/" aria-label="${esp.nome}">${emb(esp, ' fetchpriority="high" loading="eager"')}</a>
  </div>
</section>

<section class="destaques"><div class="in">
  <article class="dest dest-brasa">
    <div class="dest-foto">${foto('coalho-brasa', 'Espetos de queijo coalho assando na churrasqueira', 1023, 685)}</div>
    <div class="dest-txt"><p class="eyebrow">Linha churrasco</p><h2>${T.destaque1.titulo}</h2><p>${T.destaque1.texto}</p><a class="link" href="/a/produtos/queijo-coalho-espeto/">Saiba mais ${ic('seta')}</a></div>
  </article>
  <article class="dest dest-7">
    <span class="dest-num" aria-hidden="true">7</span>
    <img class="dest-emb" src="/assets/prod/coalho-7-espetos.webp" alt="Queijo coalho Belo Minas, embalagem com 7 espetos" width="232" height="306" loading="lazy">
    <div class="dest-txt"><p class="eyebrow">Nova embalagem</p><h2>${T.destaque2.titulo}</h2><p>${T.destaque2.texto}</p><a class="link" href="/a/produtos/queijo-coalho-espeto/">Saiba mais ${ic('seta')}</a></div>
  </article>
</div></section>

<section class="sec-prod"><div class="in">
  <div class="tit-fita"><h2>${fita('Nossos produtos')}</h2><p>Selecione e clique em um de nossos produtos e obtenha todas as informações.</p></div>
  ${prateleira('a')}
  <p class="centro"><a class="btn btn-contorno" href="/a/produtos/">Ver a tabela completa ${ic('seta')}</a></p>
</div></section>

<section class="fonte"><div class="in">
  <div class="tit-fita tit-claro"><h2>${fita('Da fonte ao consumidor')}</h2><p>${T.bannerProdutos}</p></div>
  <ol class="fonte-lista">${T.etapas.map((e, i) => `<li>
    <figure>${foto(['pasto-holandesas', 'producao-mussarela', 'vendedor-praia'][i], ['Gado leiteiro no pasto', 'Produção de queijo', 'Vendedor de queijo coalho na praia'][i], 1600, 1067)}</figure>
    <span class="fonte-n">${e.n}</span><h3>${e.titulo}<small>${e.sub}</small></h3><p>${e.texto}</p></li>`).join('')}</ol>
  <p class="centro"><a class="btn btn-branco" href="/a/empresa/">Conheça a Belo Minas ${ic('seta')}</a></p>
</div></section>

<section class="amb-faixa"><div class="in">
  <a class="amb-selo" href="/a/meio-ambiente/"><img src="/assets/img/selo-verde.webp" alt="Selo Verde Belo Minas: Cuide do Meio Ambiente" width="800" height="272" loading="lazy"></a>
  <div><h2>Responsabilidade ambiental</h2><p>${T.ambienteIntro}</p><a class="link" href="/a/meio-ambiente/">Veja o que fazemos ${ic('seta')}</a></div>
</div></section>

${ctaA()}`;
};

const ctaA = () => `<section class="cta"><div class="in">
  <div><p class="eyebrow">Fale conosco</p><h2>${T.contato}</h2></div>
  <div class="cta-fone"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><span>${E.horario}</span><a class="btn btn-branco" href="/a/contato/">Enviar mensagem ${ic('seta')}</a></div>
</div></section>`;

const capaA = (sobre, titulo, sub, img, alt) => `<section class="capa"><div class="capa-foto">${foto(img, alt, 1800, 1200, ' fetchpriority="high" loading="eager"')}</div><div class="in"><p class="capa-sobre">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const empresaA = () => `${capaA('Nossa empresa', 'Da fonte ao consumidor', T.bannerProdutos.replace('...', '.'), 'mantiqueira-serra', 'Serra da Mantiqueira')}
<section class="etapas-a"><div class="in">
  ${T.etapas.map((e, i) => `<article class="etapa${i % 2 ? ' inv' : ''}">
    <figure>${foto(['pasto-holandesas', 'producao-equipe', 'coalho-brasa'][i], ['Vacas leiteiras no pasto', 'Produção de queijo fresco', 'Queijo coalho na brasa'][i], 1600, 1067)}</figure>
    <div><span class="etapa-n">${e.n}</span><p class="eyebrow">${e.sub}</p><h2>${e.titulo}</h2><p>${e.texto}</p></div>
  </article>`).join('')}
</div></section>
<section class="missao"><div class="in">
  <div class="tit-fita"><h2>${fita('Missão e valores')}</h2></div>
  <div class="missao-grade">
    <div class="missao-txt">${T.missao.map(p => `<p>${p}</p>`).join('')}</div>
    <aside class="missao-lado"><h3>O que nos guia desde o início</h3><ul>${T.valores.map(x => `<li>${x}</li>`).join('')}</ul>
      <p class="sif">${ic('escudo')} <span>Fábrica com inspeção federal: <b>S.I.F. nº ${E.sif}</b>, impresso em todas as embalagens.</span></p></aside>
  </div>
</div></section>
${ctaA()}`;

const filtros = () => `<div class="filtros" role="toolbar" aria-label="Filtrar por linha"><button type="button" data-filtro="" aria-pressed="true">Todos <small>${produtos.length}</small></button>${Object.entries(linhas).map(([k, n]) => `<button type="button" data-filtro="${k}" aria-pressed="false">${n} <small>${produtos.filter(p => p.linha === k).length}</small></button>`).join('')}</div>`;

const produtosA = () => `${capaA('Nossos produtos', 'Oito queijos, um só cuidado', T.combinacao, 'coalho-fatia', 'Queijo coalho em fatia')}
<section class="catalogo"><div class="in">
  ${filtros()}
  <div class="tabela-prod" role="table" aria-label="Produtos Belo Minas">
    <div class="tp-cab" role="row"><span role="columnheader">Produto</span><span role="columnheader">Peso</span><span role="columnheader">Sabor</span><span role="columnheader">Composição</span><span role="columnheader">Tabela nutricional</span></div>
    ${produtos.map(p => `<div class="tp-linha" role="row" data-linha="${p.linha}">
      <a class="tp-prod" role="cell" href="/a/produtos/${p.slug}/"><span class="tp-img">${emb(p)}</span><b>${p.nome}</b></a>
      <span role="cell" class="tp-peso"><small>Peso</small>${p.peso}</span>
      <span role="cell" class="tp-sabor"><small>Sabor</small>${p.sabor}</span>
      <span role="cell" class="tp-comp"><small>Composição</small>${p.comp}</span>
      <details role="cell" class="tp-nut"><summary>Ver %VD</summary>${tabelaNut(p)}</details>
    </div>`).join('')}
  </div>
</div></section>
${ctaA()}`;

function produtoA(p) {
  const outros = produtos.filter(o => o !== p);
  return `<section class="prod-topo"><div class="in">
  <nav class="trilha" aria-label="Você está em"><a href="/a/">Início</a> / <a href="/a/produtos/">Produtos</a> / <span>${p.curto}</span></nav>
  <div class="prod-grade">
    <figure class="prod-emb">${emb(p, ' fetchpriority="high" loading="eager"')}</figure>
    <div class="prod-info">
      <p class="eyebrow">${linhas[p.linha]}</p>
      <h1>${p.nome}</h1>
      <p class="prod-nota">${p.nota}</p>
      <dl class="prod-dados"><div><dt>Peso</dt><dd>${p.peso}</dd></div><div><dt>Sabor</dt><dd>${p.sabor}</dd></div><div><dt>Inspeção</dt><dd>S.I.F. ${E.sif}</dd></div></dl>
      <h2 class="h-peq">Composição</h2><p>${p.comp}</p>
      <a class="btn" href="/a/contato/">Quero comprar ou revender ${ic('seta')}</a>
    </div>
    ${tabelaNut(p)}
  </div>
</div></section>
${p.slug === 'queijo-coalho-peca' ? `<section class="prod-foto"><div class="in"><figure><img src="/assets/prod/coalho-peca-foto.webp" alt="Queijo de coalho peça 2,5 kg na embalagem Belo Minas" width="448" height="336" loading="lazy"><figcaption>A peça de 2,5 kg na embalagem vermelha, com o selo de inspeção S.I.F. ${E.sif}.</figcaption></figure></div></section>` : ''}
<section class="sec-prod"><div class="in"><div class="tit-fita"><h2>${fita('Outros produtos')}</h2></div>${prateleira('a', outros)}</div></section>`;
}

const ambienteA = () => `${capaA('Meio ambiente', 'Preocupação com o meio ambiente', T.bannerAmbiente, 'mantiqueira-neblina', 'Mar de morros com neblina na Serra da Mantiqueira')}
<section class="amb"><div class="in">
  <p class="amb-intro">${T.ambienteIntro}</p>
  <ol class="amb-lista">${T.ambiente.map((a, i) => `<li><span class="amb-ic">${ic(iconeAmb[i])}</span><h2>${a.titulo}</h2><p>${a.texto}</p></li>`).join('')}</ol>
</div></section>
<section class="selo"><div class="in">
  <figure><img src="/assets/img/selo-verde.webp" alt="Selo Verde Belo Minas: Cuide do Meio Ambiente" width="800" height="272" loading="lazy"></figure>
  <div><h2>Nosso selo</h2><p>${T.selo}</p><a class="btn btn-verde" href="/assets/img/selo-verde.jpg" download="selo-verde-belo-minas.jpg">${ic('baixar')} Baixar o Selo Verde em alta</a></div>
</div></section>
${ctaA()}`;

const contatoA = () => `${capaA('Fale conosco', 'Estamos aqui para ouvir você', T.bannerContato, 'fazenda-ceu', 'Pasto de fazenda leiteira sob céu azul')}
<section class="contato"><div class="in">
  <div class="contato-lado">
    <p>${T.contato}</p>
    <a class="contato-fone" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
    <p class="contato-h">${ic('relogio')} ${E.horario}</p>
    <p class="contato-h">${ic('pin')} Fábrica em ${E.cidade}</p>
    <figure class="contato-emb"><img src="/assets/prod/mussarela.webp" alt="Mussarela Belo Minas nas embalagens" loading="lazy"></figure>
    <a class="link" href="/a/produtos/">Clique aqui e veja todos os nossos produtos ${ic('seta')}</a>
  </div>
  <div class="contato-form"><h2>Preencha o formulário para enviar sua mensagem</h2>${formContato('a')}</div>
</div></section>`;

// ---------- versão B ----------
const homeB = () => `<section class="hero">
  <div class="hero-foto">${foto('mantiqueira-neblina', 'Mar de morros com neblina na Serra da Mantiqueira', 1800, 1200, ' fetchpriority="high" loading="eager"')}</div>
  <div class="in hero-in">
    <p class="eyebrow">Belo Minas Laticínios</p>
    <h1>Nossos produtos,<br>da fonte ao consumidor.</h1>
    <p>${T.chamada}</p>
    <div class="acoes"><a class="btn" href="/b/produtos/">Ver os oito queijos ${ic('seta')}</a><a class="btn btn-vidro" href="/b/empresa/">Como fazemos</a></div>
  </div>
  <ul class="hero-tira" aria-label="Produtos">${produtos.map(p => `<li><a href="/b/produtos/${p.slug}/">${emb(p)}<span>${p.curto}</span></a></li>`).join('')}</ul>
</section>

<section class="caminho" data-caminho><div class="in">
  <div class="caminho-fotos" aria-hidden="true">${['pasto-holandesas', 'producao-equipe', 'coalho-brasa'].map((f, i) => `<figure class="${i ? '' : 'on'}">${foto(f, '', 1600, 1067)}</figure>`).join('')}</div>
  <div class="caminho-txt">
    <p class="eyebrow">O caminho do leite</p>
    <h2>Três etapas, um mesmo cuidado</h2>
    ${T.etapas.map((e, i) => `<article class="passo" data-passo="${i}"><figure class="passo-foto">${foto(['pasto-holandesas', 'producao-equipe', 'coalho-brasa'][i], ['Vacas leiteiras no pasto', 'Produção de queijo fresco', 'Queijo coalho na brasa'][i], 1600, 1067)}</figure><span class="passo-n">${e.n}</span><h3>${e.titulo}</h3><p class="passo-sub">${e.sub}</p><p>${e.texto}</p></article>`).join('')}
  </div>
</div></section>

<section class="linha-b"><div class="in">
  <div class="tit"><p class="eyebrow">Produtos</p><h2>${T.combinacao.replace('...', '.')}</h2></div>
  ${Object.entries(linhas).map(([k, n]) => `<div class="grupo"><h3>${n}</h3><ul class="fichas">${produtos.filter(p => p.linha === k).map(fichaB).join('')}</ul></div>`).join('')}
</div></section>

<section class="brasa"><div class="brasa-foto">${foto('coalho-brasa', 'Espetos de queijo coalho assando', 1023, 685)}</div><div class="in">
  <div class="brasa-txt"><p class="eyebrow">Linha churrasco</p><h2>${T.destaque1.titulo}</h2><p>${T.destaque1.texto}</p>
  <p class="brasa-novo"><b>7 espetos</b> ${T.destaque2.texto.replace('Novo Queijo Coalho com 7 espetos! ', '')}</p>
  <a class="btn" href="/b/produtos/queijo-coalho-espeto/">Ver o coalho espeto ${ic('seta')}</a></div>
  <img class="brasa-emb" src="/assets/prod/coalho-espeto.webp" alt="Queijo de coalho espeto Belo Minas, embalagem" loading="lazy">
</div></section>

<section class="dupla"><div class="in">
  <article><p class="eyebrow">Missão e valores</p><h2>A nossa base é a mesma do início</h2><p>${T.missao[0]}</p><a class="link" href="/b/empresa/">Leia mais ${ic('seta')}</a></article>
  <article class="dupla-verde"><img src="/assets/img/selo-verde.webp" alt="Selo Verde Belo Minas" width="800" height="272" loading="lazy"><h2>Responsabilidade ambiental</h2><p>${T.ambienteIntro}</p><a class="link" href="/b/meio-ambiente/">O que fazemos ${ic('seta')}</a></article>
</div></section>
${ctaB()}`;

const fichaB = p => `<li data-linha="${p.linha}"><a class="ficha" href="/b/produtos/${p.slug}/"><span class="ficha-img">${emb(p)}</span><span class="ficha-nome">${p.nome}</span><span class="ficha-dados"><span>${p.peso}</span><span>${p.sabor}</span></span></a></li>`;

const ctaB = () => `<section class="cta"><div class="in">
  <h2>${T.contato}</h2>
  <div class="cta-acoes"><a class="cta-fone" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><span>${E.horario}</span><a class="btn" href="/b/contato/">Fale conosco ${ic('seta')}</a></div>
</div></section>`;

const capaB = (sobre, titulo, sub, img, alt) => `<section class="capa"><div class="in"><div class="capa-txt"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div>${img ? `<figure class="capa-foto">${foto(img, alt, 1800, 1200, ' fetchpriority="high" loading="eager"')}</figure>` : ''}</section>`;

const empresaB = () => `${capaB('A Empresa', 'Da fonte ao consumidor', 'Do leite selecionado à mesa de quem compra, cada etapa da Belo Minas tem um compromisso com o sabor.', 'mantiqueira-serra', 'Serra da Mantiqueira')}
<section class="linha-tempo"><div class="in"><ol>${T.etapas.map((e, i) => `<li><figure>${foto(['pasto-holandesas', 'producao-equipe', 'vendedor-praia'][i], ['Vacas leiteiras no pasto', 'Produção de queijo fresco', 'Vendedor de queijo coalho'][i], 1600, 1067)}</figure><div><span class="passo-n">${e.n}</span><h2>${e.titulo}</h2><p class="passo-sub">${e.sub}</p><p>${e.texto}</p></div></li>`).join('')}</ol></div></section>
<section class="missao-b"><div class="in">
  <div class="tit"><p class="eyebrow">Missão e valores</p><h2>Justiça, honestidade e cuidado com as pessoas</h2></div>
  <div class="missao-col">${T.missao.map(p => `<p>${p}</p>`).join('')}</div>
  <ul class="valores">${T.valores.map((x, i) => `<li><span>0${i + 1}</span>${x}</li>`).join('')}</ul>
  <p class="sif">${ic('escudo')} <span>Inspeção federal: <b>S.I.F. nº ${E.sif}</b>, impresso em todas as embalagens.</span></p>
</div></section>
${ctaB()}`;

const produtosB = () => `${capaB('Produtos', 'Oito queijos Belo Minas', T.combinacao, null)}
<section class="catalogo-b"><div class="in">
  ${filtros()}
  <ul class="fichas fichas-todas">${produtos.map(fichaB).join('')}</ul>
</div></section>
<section class="comparar"><div class="in">
  <div class="tit"><p class="eyebrow">Lado a lado</p><h2>Peso, sabor e composição</h2></div>
  <div class="tabela-rola"><table class="comp-tab"><thead><tr><th scope="col">Produto</th><th scope="col">Peso</th><th scope="col">Sabor</th><th scope="col">Composição</th></tr></thead><tbody>${produtos.map(p => `<tr><th scope="row"><a href="/b/produtos/${p.slug}/">${p.nome}</a></th><td>${p.peso}</td><td>${p.sabor}</td><td>${p.comp}</td></tr>`).join('')}</tbody></table></div>
</div></section>
${ctaB()}`;

function produtoB(p) {
  const outros = produtos.filter(o => o !== p && o.linha === p.linha).concat(produtos.filter(o => o.linha !== p.linha)).slice(0, 4);
  return `<section class="prod"><div class="in">
  <nav class="trilha" aria-label="Você está em"><a href="/b/">Início</a> / <a href="/b/produtos/">Produtos</a> / <span>${p.curto}</span></nav>
  <div class="prod-grade">
    <figure class="prod-emb">${emb(p, ' fetchpriority="high" loading="eager"')}</figure>
    <div class="prod-info">
      <p class="eyebrow">${linhas[p.linha]}</p>
      <h1>${p.nome}</h1>
      <p class="prod-nota">${p.nota}</p>
      <dl class="prod-dados"><div><dt>Peso</dt><dd>${p.peso}</dd></div><div><dt>Sabor</dt><dd>${p.sabor}</dd></div><div><dt>S.I.F.</dt><dd>${E.sif}</dd></div></dl>
      <div class="rotulo"><p class="rotulo-ing"><b>Ingredientes:</b> ${p.comp}</p>${tabelaNut(p)}</div>
      <a class="btn" href="/b/contato/">Quero comprar ou revender ${ic('seta')}</a>
    </div>
  </div>
</div></section>
<section class="linha-b"><div class="in"><div class="tit"><h2>Veja também</h2></div><ul class="fichas">${outros.map(fichaB).join('')}</ul></div></section>`;
}

const ambienteB = () => `${capaB('Meio Ambiente', 'Preocupação com o meio ambiente', T.ambienteIntro, 'mantiqueira-neblina', 'Mar de morros com neblina na Serra da Mantiqueira')}
<section class="amb-b"><div class="in">
  <ul class="amb-grade">${T.ambiente.map((a, i) => `<li class="amb-${i}"><span class="amb-ic">${ic(iconeAmb[i])}</span><h2>${a.titulo}</h2><p>${a.texto}</p></li>`).join('')}</ul>
</div></section>
<section class="selo-b"><div class="in">
  <img src="/assets/img/selo-verde.webp" alt="Selo Verde Belo Minas: Cuide do Meio Ambiente" width="800" height="272" loading="lazy">
  <div><h2>Nosso Selo Verde</h2><p>${T.selo}</p><a class="btn btn-verde" href="/assets/img/selo-verde.jpg" download="selo-verde-belo-minas.jpg">${ic('baixar')} Baixar em alta resolução</a></div>
</div></section>
${ctaB()}`;

const contatoB = () => `${capaB('Fale Conosco', 'Satisfação e cuidado com o consumidor', 'Faça aqui seu elogio, crítica ou sugestão, ou nos envie suas dúvidas.', null)}
<section class="contato"><div class="in">
  <div class="contato-form">${formContato('b')}</div>
  <aside class="contato-lado">
    <a class="contato-fone" href="tel:${E.foneHref}"><small>Telefone</small>${E.fone}</a>
    <p><small>Horário de atendimento</small>${E.horario}</p>
    <p><small>Fábrica</small>${E.cidade}</p>
    <p><small>Quer revender?</small>Escolha "Comercial e revenda" no formulário e conte de qual cidade você é.</p>
  </aside>
</div></section>`;

// ---------- montagem ----------
const descr = 'Queijos Belo Minas: coalho espeto e peça, minas frescal, ricota, mussarela, prato e provolone. ' + T.chamada;
export function gerarVersao(v) {
  const A = v === 'a';
  const out = {
    index: pagina(v, 'index', '', 'Belo Minas Laticínios · O sabor do verdadeiro queijo', descr, A ? homeA() : homeB()),
    empresa: pagina(v, 'empresa', 'empresa/', 'A Empresa · Belo Minas Laticínios', 'Da fonte ao consumidor: leite selecionado, transformação com controle rigoroso e cuidado no pós-venda.', A ? empresaA() : empresaB()),
    produtos: pagina(v, 'produtos', 'produtos/', 'Produtos · Belo Minas Laticínios', 'Peso, sabor, composição e tabela nutricional dos oito queijos Belo Minas.', A ? produtosA() : produtosB()),
    'meio-ambiente': pagina(v, 'meio-ambiente', 'meio-ambiente/', 'Meio Ambiente · Belo Minas Laticínios', T.ambienteIntro, A ? ambienteA() : ambienteB()),
    contato: pagina(v, 'contato', 'contato/', 'Fale Conosco · Belo Minas Laticínios', `Telefone ${E.fone}, ${E.horario.toLowerCase()}.`, A ? contatoA() : contatoB()),
  };
  for (const p of produtos) out[`produtos/${p.slug}`] = pagina(v, 'produto', `produtos/${p.slug}/`, `${p.nome} · Belo Minas`, `${p.nome} Belo Minas, ${p.peso}. ${p.comp}`, A ? produtoA(p) : produtoB(p));
  return out;
}
