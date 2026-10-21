// Monta as páginas das versões A ("Atacado": o verde forte do site atual, topo verde, faixa de logos das empresas,
// títulos em itálico pesado como o "Tozzo" do logo) e B ("Mix": clara, o catálogo de marcas na frente, busca na abertura,
// títulos retos). Estilos em public/assets/{base,a,b}.css; comportamento em public/assets/site.js.
import { empresa as E, sobre, numeros, cadeia, empresas, categorias, nomesMarca, produtos, telefones, boletos, links, galeria } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (f, alt, w = 960, h = 637, extra = '') => `<img src="/assets/img/fotos/${f}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const marcaImg = m => `<img src="/assets/img/marcas/${m}.webp" alt="${esc(nomesMarca[m])}" loading="lazy" decoding="async">`;
const conta = n => (n.includes(',') ? '' : ' data-conta');
const pad = n => String(n).padStart(2, '0');
const empPor = slug => empresas.find(e => e.slug === slug);

export const nomesVersao = { a: 'Atacado', b: 'Mix' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'grupo', nome: 'O Grupo', caminho: 'grupo/' },
  { slug: 'empresas', nome: 'Empresas', caminho: 'empresas/' },
  { slug: 'catalogo', nome: 'Catálogo de marcas', caminho: 'catalogo/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  lista: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  caminhao: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  grao: '<path d="M12 3c4 3 5 8 3 12s-5 6-6 6c-2-3-3-7-1-11s3-5 4-7z"/><path d="M12 7c-1 4-2 8-3 14"/>',
  caixa: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  loja: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18"/><path d="M9 20v-6h6v6"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
  pessoa: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icEtapa = { cerealista: 'grao', alimentos: 'caixa', transportes: 'caminhao' };

// ---------- moldura ----------
const fontes = {
  a: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,100,500;0,100,700;1,112,800;1,125,800&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100,600;100,700;112,800&family=Inter:wght@400;500;600&display=swap',
};

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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#00A859' : '#0B3D24'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes[v]}">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const btnMenu = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnLista = v => `<a class="lista-btn" href="/${v}/contato/#cotacao" aria-label="Lista de cotação">${ic('lista')}<span class="lista-txt">Cotação</span><b data-conta-lista hidden>0</b></a>`;

function topo(v, atual) {
  const sites = empresas.map(e => `<a href="/${v}/empresas/${e.slug}/">${e.nome}</a>`).join('');
  if (v === 'a') return `<div class="faixa"><div class="in">
  <span class="faixa-sites"><b>Empresas do grupo:</b> ${sites}</span>
  <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <a href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Grupo Tozzo, início"><img src="/assets/logo-branco.svg" alt="Tozzo Atacado Distribuidor" width="220" height="96"></a>
  <nav class="menu" id="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${btnLista(v)}${btnMenu}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Grupo Tozzo, início"><img src="/assets/logo.svg" alt="Tozzo Atacado Distribuidor" width="220" height="96"></a>
  <nav class="menu" id="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-fone" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  ${btnLista(v)}${btnMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">
      <img src="/assets/logo-branco.svg" alt="Tozzo Atacado Distribuidor" width="200" height="88" loading="lazy">
      <p>${E.rua}<br>${E.bairro} · CEP ${E.cep}</p>
      <p><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><br><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p>
    </div>
    <nav aria-label="Institucional"><h2>Institucional</h2>${nav.map(n => `<a href="/${v}/${n.caminho}">${n.nome}</a>`).join('')}<a href="${links.denuncias}" target="_blank" rel="noopener">Canal de denúncias</a></nav>
    <nav aria-label="Empresas"><h2>Empresas</h2>${empresas.map(e => `<a href="/${v}/empresas/${e.slug}/">${e.nome}</a>`).join('')}</nav>
    <nav aria-label="Informações"><h2>Informações</h2><a href="/${v}/contato/#telefones">Telefones e ramais</a><a href="/${v}/contato/#boletos">2ª via de boletos</a><a href="${links.vagas}" target="_blank" rel="noopener">Trabalhe conosco</a><a href="${links.webmail}" target="_blank" rel="noopener">Webmail</a><a href="${links.optiwork}" target="_blank" rel="noopener">OptiWork</a><a href="${links.intranet}" target="_blank" rel="noopener">Intranet</a></nav>
  </div>
  <div class="in rod-base"><span>${E.razao} · CNPJ ${E.cnpj}</span><span>Prévia feita pela Overtus · <a href="/">ver as duas versões</a></span></div>
</footer>
<div class="lista-flutua" data-lista-flutua hidden><span>${ic('lista')} <b data-conta-lista>0</b> na lista de cotação</span><a href="/${v}/contato/#cotacao">Pedir cotação ${ic('seta')}</a></div>`;
}

function pagina(v, slug, caminho, titulo, descricao, corpo) {
  return `${head(v, caminho, titulo, descricao)}
<body class="v-${v}">
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

// ---------- blocos ----------
const titulo = (eyebrow, h, nivel = 2, extra = '') => `${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h${nivel}${extra}>${h}</h${nivel}>`;

function capaInterna(v, eyebrow, h, texto, f) {
  return `<section class="capa-int">
  <div class="capa-foto">${foto(f, '', 960, 637, ' fetchpriority="high" loading="eager"')}</div>
  <div class="in capa-txt">${titulo(eyebrow, h, 1)}${texto ? `<p class="lead">${texto}</p>` : ''}</div>
</section>`;
}

const btnAdd = (id, nome) => `<button class="add" type="button" data-add="${esc(id)}" data-nome="${esc(nome)}" aria-pressed="false">${ic('mais', 'ic ic-mais')}${ic('ok', 'ic ic-ok')}<span class="add-txt">Cotar</span></button>`;

function tileMarca(m, cat) {
  const nome = nomesMarca[m];
  return `<li class="tm" data-cat="${cat}" data-busca="${esc(`${nome} ${cat}`.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase())}">
  <div class="tm-logo">${marcaImg(m)}</div>
  <div class="tm-pe"><b>${esc(nome)}</b>${btnAdd(`marca:${nome}`, nome)}</div>
</li>`;
}

function prateleira(v) {
  return `<ul class="prat" role="list">${produtos.map(p => `<li class="pp">
  <div class="pp-foto"><img src="/assets/img/prod/${p.slug}.webp" alt="${esc(p.nome)}" width="480" height="600" loading="lazy" decoding="async"></div>
  <div class="pp-txt"><small>${p.tipo}</small><b>${esc(p.nome)}</b><span>${p.det}</span></div>
  ${btnAdd(`produto:${p.nome} ${p.det}`, `${p.nome} (${p.det})`)}
</li>`).join('')}</ul>`;
}

function numerosBloco() {
  return `<ul class="nums" role="list">${numeros.map(n => `<li><b${conta(n.n)}>${n.n}</b><span>${n.t}</span></li>`).join('')}</ul>`;
}

// Caminho do Feijão Tozzo: A como estrada com paradas; B como linha de fotos numeradas.
function cadeiaBloco(v) {
  if (v === 'a') return `<section class="rota">
  <div class="in">
    ${titulo('Verticalização', 'Do grão à entrega, tudo em casa')}
    <p class="lead">O Feijão Tozzo e o Arroz Tozzo são beneficiados pela Cerealista Tozzo, distribuídos pela Tozzo Distribuidora, vendidos pela Tozzo Atacado e transportados pela Transtozzo. É assim que o grupo controla a qualidade e mantém o preço competitivo.</p>
    <ol class="rota-trilho" data-etapas>
      <span class="ap-trilho" aria-hidden="true"></span>
      ${cadeia.map((c, i) => `<li class="ap-etapa">
        <span class="rota-marco">${ic(icEtapa[c.emp])}</span>
        <div class="rota-foto">${foto(c.foto, '')}</div>
        <b>${pad(i + 1)} · ${c.verbo}</b>
        <p>${c.t}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>`;
  return `<section class="trilha">
  <div class="in">
    <div class="trilha-cab">${titulo('Do grão à gôndola', 'Quatro empresas, um caminho só')}<p>O Feijão Tozzo é beneficiado, distribuído, vendido e entregue por empresas do próprio grupo: controle total da qualidade e preço competitivo.</p></div>
    <ol class="trilha-lista" data-rev-filhos data-rev-passo="120">
      ${cadeia.map((c, i) => `<li>
        <figure>${foto(c.foto, '')}<figcaption>${pad(i + 1)}</figcaption></figure>
        <h3>${c.verbo}</h3>
        <p>${c.t}</p>
        <a class="link-seta" href="/b/empresas/${c.emp}/">${empPor(c.emp).nome} ${ic('seta')}</a>
      </li>`).join('')}
    </ol>
  </div>
</section>`;
}

function contatoFaixa(v) {
  return `<section class="cta">
  <div class="in cta-in">
    <div>${titulo('Contate-nos', v === 'a' ? 'Fale com o comercial do Grupo Tozzo' : 'Monte sua lista e peça a cotação')}
    <p>${v === 'a' ? 'Entre em contato pelos canais abaixo: responderemos a você em breve.' : 'Marque as marcas e produtos que você compra, mande a lista e o comercial responde com preços e prazos de entrega.'}</p></div>
    <div class="cta-acoes">
      <a class="btn btn-cor" href="/${v}/contato/#cotacao">${ic('lista')} Pedir cotação</a>
      <a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
      <a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')} E-mail</a>
    </div>
  </div>
</section>`;
}

// ---------- páginas ----------
function inicio(v) {
  if (v === 'a') {
    const slides = ['alimentos', 'cerealista', 'transportes', 'bebidas', 'fazenda'].map(empPor);
    return `<section class="hero-a" data-slider>
  <div class="in hero-a-in">
    <div class="hero-a-txt">
      <p class="eyebrow">Atacado · Distribuição · Cereais · Bebidas · Transporte</p>
      <h1>Grupo Tozzo</h1>
      <p class="lead">Um grupo de empresas de Chapecó que carregam a responsabilidade e os valores da marca Tozzo. Conheça nossas empresas, produtos e serviços e comprove nossa qualidade.</p>
      <div class="hero-btns"><a class="btn btn-lima" href="/a/catalogo/">Catálogo de marcas ${ic('seta')}</a><a class="btn btn-linha" href="/a/contato/#cotacao">Pedir cotação</a></div>
    </div>
    <div class="hero-a-slides">
      ${slides.map((e, i) => `<figure class="slide${i ? '' : ' on'}" data-slide>
        ${foto(e.foto, '', 960, 637, i ? '' : ' fetchpriority="high" loading="eager"')}
        <figcaption><b>${e.nome}:</b> ${e.frase.charAt(0).toLowerCase() + e.frase.slice(1)}</figcaption>
      </figure>`).join('')}
      <div class="slide-pontos" role="group" aria-label="Escolher empresa">${slides.map((e, i) => `<button type="button" aria-label="${e.nome}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>
    </div>
  </div>
</section>
<nav class="logos-emp" aria-label="Empresas do grupo"><div class="in">${empresas.map(e => `<a href="/a/empresas/${e.slug}/"><img src="/assets/${e.logo}.svg" alt="${e.nome}" width="200" height="88" loading="lazy"></a>`).join('')}</div></nav>
<section class="sobre-a">
  <div class="in sobre-a-in">
    <div class="sobre-a-fotos">${foto('sede-aereo', 'Vista aérea das empresas do Grupo Tozzo', 800, 542)}${foto('frota-garagem', 'Garagem da Tozzo Transportes com a frota', 960, 529)}</div>
    <div>
      ${titulo('Sobre o grupo', 'Oito empresas e uma marca só')}
      <p>${sobre[0]}</p>
      <p>${sobre[2]}</p>
      <a class="link-seta" href="/a/grupo/">Leia mais sobre o grupo ${ic('seta')}</a>
    </div>
  </div>
</section>
<section class="faixa-nums"><div class="in">${numerosBloco()}</div></section>
${cadeiaBloco(v)}
<section class="parceiros-a">
  <div class="in">
    <div class="sec-cab">${titulo('Parceiros Tozzo', 'Algumas das marcas que distribuímos')}<a class="link-seta" href="/a/catalogo/">Ver todos os parceiros ${ic('seta')}</a></div>
    <ul class="muro" role="list">${['b-heineken', 'gomes-da-costa', 'unilever-u', 'p-g', 'chocolates-m-m', 'tozzo-feijao', 'b-amstel', 'melitta-2', 'bombril-b', 'grupo-bic', 'calcados-havaianas', 'chivas-s', 'goias-verde', 'reckitt-r', 'b-baden-baden', 'halls-h', 'vinho-aurora', 'refrigerante-itubaina'].map(m => `<li>${marcaImg(m)}</li>`).join('')}</ul>
  </div>
</section>
${contatoFaixa(v)}`;
  }
  return `<section class="hero-b">
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      <p class="eyebrow">Tozzo Atacado e Distribuidor · Chapecó (SC)</p>
      <h1>Mais de 5 mil itens para abastecer o seu negócio</h1>
      <p class="lead">Alimentos, bebidas, higiene e limpeza das marcas mais conhecidas do mercado, com frota própria e entrega em até 48 horas depois do pedido.</p>
      <form class="busca" action="/b/catalogo/" role="search">
        <label for="q-home" class="sr">Buscar marca</label>
        ${ic('busca')}<input id="q-home" name="q" type="search" placeholder="Busque uma marca: Heineken, Gomes da Costa, Bombril…" autocomplete="off">
        <button class="btn btn-cor" type="submit">Buscar</button>
      </form>
      <p class="chips">${categorias.map(c => `<a href="/b/catalogo/#${c.slug}">${c.nome}</a>`).join('')}</p>
    </div>
    <div class="hero-b-foto">
      ${foto('armazem', 'Armazém do atacado Tozzo com as prateleiras cheias', 960, 637, ' fetchpriority="high" loading="eager"')}
      <p class="selo48"><b>48 h</b><span>do pedido à entrega, com a frota da Transtozzo</span></p>
    </div>
  </div>
</section>
<section class="cats">
  <div class="in">
    <div class="sec-cab">${titulo('Catálogo', 'Compre por categoria')}<a class="link-seta" href="/b/catalogo/">Ver todas as marcas ${ic('seta')}</a></div>
    <ul class="cat-grade" role="list">${categorias.map((c, i) => `<li><a class="cat" href="/b/catalogo/#${c.slug}">
      <span class="cat-n">${pad(i + 1)}</span>
      <b>${c.nome}</b>
      <span class="cat-logos">${c.marcas.slice(0, 3).map(marcaImg).join('')}</span>
      <small>${c.marcas.length} ${c.marcas.length > 1 ? 'marcas' : 'marca'} ${ic('seta')}</small>
    </a></li>`).join('')}</ul>
  </div>
</section>
<section class="proprias">
  <div class="in">
    <div class="sec-cab">${titulo('Marcas próprias', 'Feijão Tozzo, da Cerealista para a sua prateleira')}<a class="link-seta" href="/b/empresas/cerealista/">Conheça a Cerealista ${ic('seta')}</a></div>
    ${prateleira(v)}
  </div>
</section>
${cadeiaBloco(v)}
<section class="grupo-b">
  <div class="in grupo-b-in">
    <div>${titulo('O Grupo Tozzo', 'Uma empresa para cada elo')}<p>${sobre[1]}</p><a class="link-seta" href="/b/grupo/">Sobre o grupo ${ic('seta')}</a></div>
    <ol class="emp-indice">${empresas.map(e => `<li><a href="/b/empresas/${e.slug}/"><img src="/assets/${e.logo}.svg" alt="" width="120" height="53" loading="lazy"><span><b>${e.nome}</b><small>${e.frase}</small></span>${ic('seta')}</a></li>`).join('')}</ol>
  </div>
</section>
<section class="frota-b">
  <div class="frota-b-foto">${foto('frota-andes', 'Carretas da Tozzo Transportes na Cordilheira dos Andes', 960, 722)}</div>
  <div class="in frota-b-in">
    <div class="frota-b-cx">${titulo('Logística própria', 'Do Sul ao Chile, com frota Tozzo')}
      <ul class="nums nums-cx" role="list">${empPor('transportes').frota.map(n => `<li><b${conta(n.n)}>${n.n}</b><span>${n.t}</span></li>`).join('')}</ul>
      <a class="link-seta" href="/b/empresas/transportes/">Tozzo Transportes ${ic('seta')}</a>
    </div>
  </div>
</section>
${contatoFaixa(v)}`;
}

function grupo(v) {
  return `${capaInterna(v, 'O Grupo', 'Sobre o Grupo Tozzo', 'Oito empresas que carregam a responsabilidade e, sobretudo, os valores da marca Tozzo.', 'sede-aereo-2')}
<section class="texto-grupo">
  <div class="in texto-grupo-in">
    <div class="texto-col">${sobre.map(p => `<p>${p}</p>`).join('')}</div>
    <aside class="lista-emp">
      <h2>Empresas do grupo</h2>
      <ul>${['Tozzo Alimentos', 'Tozzo Bebidas', 'Cerealista Tozzo', 'Tozzo Distribuidora', 'Tozzo Atacado', 'Tozzo Atacado de Balcão', 'Tozzo Transportes (Transtozzo)', 'Fazenda Tozzo'].map(n => `<li>${ic('ok')} ${n}</li>`).join('')}</ul>
    </aside>
  </div>
</section>
<section class="faixa-nums"><div class="in">${numerosBloco()}</div></section>
${cadeiaBloco(v)}
<section class="galeria-sec">
  <div class="in">
    ${titulo('Galerias de fotos', 'O grupo em imagens')}
    <ul class="galeria" role="list">${galeria.map(g => `<li><figure>${foto(g.f, g.t)}<figcaption>${g.t}</figcaption></figure></li>`).join('')}</ul>
  </div>
</section>
${contatoFaixa(v)}`;
}

function empresasPag(v) {
  return `${capaInterna(v, 'Empresas', 'As empresas do Grupo Tozzo', 'Atacado, distribuição, cereais, bebidas, transporte e pecuária: cada empresa com seu foco e a mesma marca.', 'complexo-aereo-2')}
<section class="emp-blocos">
  <div class="in">${empresas.map((e, i) => `<article class="eb${i % 2 ? ' eb-inv' : ''}">
    <div class="eb-foto">${foto(e.foto, e.nome)}</div>
    <div class="eb-txt">
      <img class="eb-logo" src="/assets/${e.logo}.svg" alt="${e.nome}" width="200" height="88" loading="lazy">
      <p class="eb-sub">${e.sub}</p>
      <h2>${e.frase}</h2>
      <p>${e.texto[0]}</p>
      <a class="btn btn-cor" href="/${v}/empresas/${e.slug}/">Conheça a ${e.nome} ${ic('seta')}</a>
    </div>
  </article>`).join('')}</div>
</section>
${contatoFaixa(v)}`;
}

function empresaPag(v, e) {
  const extra = {
    alimentos: () => `<section class="extra-sec"><div class="in">${titulo('Parceiros', 'Marcas que passam pelo nosso atacado')}<ul class="muro" role="list">${['gomes-da-costa', 'goias-verde', 'unilever-u', 'p-g', 'reckitt-r', 'bombril-b', 'melitta-2', 'chocolates-m-m', 'grupo-bic', 'calcados-havaianas', 'ducoco-c', 'vale-fertil'].map(m => `<li>${marcaImg(m)}</li>`).join('')}</ul><p class="mais"><a class="btn btn-cor" href="/${v}/catalogo/">Ver o catálogo de marcas ${ic('seta')}</a></p></div></section>`,
    cerealista: () => `<section class="extra-sec proprias"><div class="in">${titulo('Produtos', 'Linha Feijão Tozzo e Feijão da Feira')}${prateleira(v)}</div></section>`,
    bebidas: () => `<section class="extra-sec"><div class="in">${titulo('Marcas', 'Distribuidora exclusiva Heineken')}<ul class="muro" role="list">${e.marcas.map(m => `<li>${marcaImg(m)}</li>`).join('')}</ul><p class="aviso18">Venda de bebidas alcoólicas proibida para menores de 18 anos. Beba com moderação.</p></div></section>`,
    transportes: () => `<section class="extra-sec frota-sec"><div class="in frota-in">
      <div>${titulo('Frota', 'Números da Transtozzo')}<ul class="nums nums-frota" role="list">${e.frota.map(n => `<li><b${conta(n.n)}>${n.n}</b><span>${n.t}</span></li>`).join('')}</ul></div>
      <div class="filiais"><h3>14 filiais em 4 estados</h3>${e.filiais.map(f => `<div class="fil"><span>${f.uf}</span><i style="--n:${f.n}"></i><b>${f.n}</b></div>`).join('')}<p>Sede em Chapecó (SC), com rotas para a Argentina e o Chile.</p></div>
    </div></section>`,
    fazenda: () => '',
  }[e.slug]();
  return `<section class="capa-emp">
  <div class="capa-foto">${foto(e.foto, '', 960, 637, ' fetchpriority="high" loading="eager"')}</div>
  <div class="in capa-txt">
    <img class="capa-logo" src="/assets/${e.logo}-branco.svg" alt="${e.nome}" width="240" height="106">
    <h1>${e.frase}</h1>
  </div>
</section>
<section class="emp-sobre">
  <div class="in emp-sobre-in">
    <div class="texto-col"><p class="eyebrow">${e.sub}</p>${e.texto.map(p => `<p>${p}</p>`).join('')}</div>
    <aside class="fatos">
      <ul>${e.fatos.map(f => `<li>${ic('ok')} ${f}</li>`).join('')}</ul>
      <div class="fatos-cont">
        <a href="tel:+55${e.fone.replace(/\D/g, '')}">${ic('tel')} ${e.fone}</a>
        ${e.fone2 ? `<a href="tel:+55${e.fone2.replace(/\D/g, '')}">${ic('tel')} ${e.fone2}</a>` : ''}
        ${e.email ? `<a href="mailto:${e.email}">${ic('mail')} ${e.email}</a>` : ''}
        ${e.enderecos.map(([c, r]) => `<p>${ic('pin')} <span><b>${c}</b><br>${r}</span></p>`).join('')}
        ${e.insta ? `<a href="${e.insta}" target="_blank" rel="noopener">${ic('insta')} Instagram</a>` : ''}
        <a href="${e.site}" target="_blank" rel="noopener">${ic('ext')} Site da ${e.nome}</a>
      </div>
    </aside>
  </div>
</section>
${extra}
<section class="galeria-sec">
  <div class="in">
    ${titulo('Fotos', e.nome)}
    <ul class="galeria" role="list">${e.fotos.filter(f => f !== e.foto).map(f => `<li><figure>${foto(f, e.nome)}</figure></li>`).join('')}</ul>
  </div>
</section>
<nav class="outras"><div class="in">${empresas.filter(o => o !== e).map(o => `<a href="/${v}/empresas/${o.slug}/"><img src="/assets/${o.logo}.svg" alt="${o.nome}" width="150" height="66" loading="lazy"></a>`).join('')}</div></nav>
${contatoFaixa(v)}`;
}

function catalogo(v) {
  return `<section class="cat-cab">
  <div class="in">
    ${titulo('Catálogo de marcas', 'Parceiros Tozzo', 1)}
    <p class="lead">Algumas das marcas que o atacado e a distribuidora do Grupo Tozzo trabalham. O mix completo passa de 5 mil itens: marque o que você compra e peça a cotação com os itens que precisa.</p>
    <div class="filtro">
      <label class="busca">${ic('busca')}<span class="sr">Buscar marca</span><input type="search" data-busca-cat placeholder="Buscar marca" autocomplete="off"></label>
      <div class="chips" role="group" aria-label="Categorias"><button type="button" data-chip="" aria-pressed="true">Todas</button>${categorias.map(c => `<button type="button" data-chip="${c.slug}" aria-pressed="false">${c.nome}</button>`).join('')}</div>
    </div>
  </div>
</section>
<section class="cat-corpo">
  <div class="in">
    ${categorias.map(c => `<div class="cat-bloco" id="${c.slug}" data-bloco="${c.slug}">
      <h2>${c.nome} <small>${c.marcas.length}</small></h2>
      ${c.slug === 'cervejas' || c.slug === 'destilados' ? '<p class="aviso18">Venda proibida para menores de 18 anos.</p>' : ''}
      <ul class="tm-grade" role="list">${c.marcas.map(m => tileMarca(m, c.slug)).join('')}</ul>
    </div>`).join('')}
    <p class="vazio" data-vazio hidden>Nenhuma marca com esse nome na lista do site. O mix tem mais de 5 mil itens: <a href="/${v}/contato/#cotacao">pergunte ao comercial</a>.</p>
  </div>
</section>
<section class="proprias" id="feijao">
  <div class="in">
    <div class="sec-cab">${titulo('Marcas próprias', 'Linha Feijão Tozzo')}<a class="link-seta" href="/${v}/empresas/cerealista/">Tozzo Cerealista ${ic('seta')}</a></div>
    ${prateleira(v)}
  </div>
</section>
${contatoFaixa(v)}`;
}

function contato(v) {
  return `<section class="cat-cab contato-cab">
  <div class="in">${titulo('Contato', 'Fale com o Grupo Tozzo', 1)}<p class="lead">Mande a sua lista de cotação, uma dúvida ou uma sugestão: responderemos a você em breve.</p></div>
</section>
<section class="contato-sec">
  <div class="in contato-in">
    <form class="form" id="cotacao" data-form>
      <h2>Pedido de cotação</h2>
      <div class="lista-cot" data-lista>
        <p class="lista-vazia" data-lista-vazia>A lista está vazia. <a href="/${v}/catalogo/">Marque marcas e produtos no catálogo</a> ou escreva o que precisa na mensagem.</p>
        <ul data-lista-itens></ul>
      </div>
      <div class="campos">
        <label>Nome*<input name="nome" required autocomplete="name"></label>
        <label>Empresa<input name="empresa" autocomplete="organization"></label>
        <label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label>
        <label>E-mail*<input name="email" type="email" required autocomplete="email"></label>
        <label>Cidade<input name="cidade" autocomplete="address-level2"></label>
        <label>CNPJ<input name="cnpj" inputmode="numeric"></label>
        <label class="largo">Mensagem<textarea name="mensagem" rows="4"></textarea></label>
      </div>
      <label class="aceite"><input type="checkbox" required> Li e aceito a política de privacidade</label>
      <button class="btn btn-cor" type="submit">${ic('mail')} Enviar por e-mail</button>
      <p class="form-nota">O botão abre o seu e-mail com a lista pronta para ${E.email}.</p>
    </form>
    <aside class="contato-lado">
      <div class="cl-bloco">
        <h2>Atendimento</h2>
        <a class="cl-grande" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
        <a href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
        <p>${ic('pin')} <span>${E.rua}<br>${E.bairro} · CEP ${E.cep}</span></p>
        <a class="link-seta" href="${E.mapa}" target="_blank" rel="noopener">Como chegar ${ic('seta')}</a>
      </div>
      <div class="cl-bloco" id="telefones">
        <h2>Telefones e ramais</h2>
        <dl class="tels">${telefones.map(([n, f, h]) => `<div><dt>${n}</dt><dd><a href="tel:${h}">${f}</a></dd></div>`).join('')}</dl>
      </div>
      <div class="cl-bloco" id="boletos">
        <h2>2ª via de boletos</h2>
        <p class="bancos">${boletos.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</p>
      </div>
      <div class="cl-bloco">
        <h2>Trabalhe conosco</h2>
        <p>Veja as vagas abertas nas empresas do grupo e envie o seu currículo.</p>
        <a class="btn btn-linha" href="${links.vagas}" target="_blank" rel="noopener">${ic('pessoa')} Vagas disponíveis</a>
      </div>
    </aside>
  </div>
</section>`;
}

export function gerarVersao(v) {
  const p = {};
  p.index = pagina(v, 'index', '', 'Grupo Tozzo · Atacado, distribuição, cereais, bebidas e transporte', 'O Grupo Tozzo, de Chapecó (SC), reúne Tozzo Alimentos, Cerealista, Bebidas, Transportes e Fazenda. Mix de mais de 5 mil itens e entrega em até 48 horas.', inicio(v));
  p.grupo = pagina(v, 'grupo', 'grupo/', 'O Grupo · Grupo Tozzo', 'Conheça o Grupo Tozzo: oito empresas, sistema Broker na distribuição, mix de mais de 5 mil itens e logística própria.', grupo(v));
  p.empresas = pagina(v, 'empresas', 'empresas/', 'Empresas · Grupo Tozzo', 'Tozzo Alimentos, Tozzo Cerealista, Tozzo Bebidas, Tozzo Transportes e Fazenda Tozzo.', empresasPag(v));
  for (const e of empresas) p[`empresas/${e.slug}`] = pagina(v, 'empresas', `empresas/${e.slug}/`, `${e.nome} · Grupo Tozzo`, `${e.nome}: ${e.frase}`, empresaPag(v, e));
  p.catalogo = pagina(v, 'catalogo', 'catalogo/', 'Catálogo de marcas · Grupo Tozzo', 'Marcas parceiras do Grupo Tozzo por categoria e a linha Feijão Tozzo. Monte a lista e peça a cotação.', catalogo(v));
  p.contato = pagina(v, 'contato', 'contato/', 'Contato · Grupo Tozzo', 'Pedido de cotação, telefones e ramais, 2ª via de boletos e vagas do Grupo Tozzo.', contato(v));
  return p;
}
