// Gera clientes/imobiliaria/public: /a/ e /b/ (duas versões do site modelo de imobiliária) e a página de escolha em /.
// Uso: node clientes/imobiliaria/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARCA, IMOVEIS, TIPOS, BAIRROS_FOTO } from './dados.mjs';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(aqui, '..', 'public');
const raiz = path.join(aqui, '..', '..', '..');

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const precoTxt = i => i.fin === 'aluguel' ? `${brl(i.preco)}<small>/mês</small>` : brl(i.preco);
const img = (n, p) => `/assets/img/${n}${p ? '-p' : ''}.webp`;
const nVenda = IMOVEIS.filter(i => i.fin === 'venda').length;
const nAluguel = IMOVEIS.length - nVenda;
const bairros = [...new Set(IMOVEIS.map(i => i.bairro))].sort((a, b) => a.localeCompare(b, 'pt'));

// Ícones de traço (24px)
const I = {
  area: '<path d="M4 4h16v16H4z"/><path d="M4 9h5V4M20 15h-5v5"/>',
  cama: '<path d="M3 18V8M21 18v-5a3 3 0 0 0-3-3H10v8M3 14h18M6.5 10.5h.01"/>',
  banho: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>',
  carro: '<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM7 13h.01M17 13h.01"/>',
  coracao: '<path d="M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c-2 4.5-9 9-9 9z"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  pino: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  email: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/>',
  filtro: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  chave: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/>',
  casa: '<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  olho: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  aperto: '<path d="m11 17 2 2a1.5 1.5 0 0 0 2-2M14 14l2.5 2.5a1.5 1.5 0 0 0 2-2L14 10l-2 2a2 2 0 0 1-3-3l3-3h4l4 4M3 7l4-1 5 5M3 7v7l3 3"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
};
const ic = (n, s = 20) => `<svg class="ic" viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icWhats = s => `<svg class="ic" viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5 0a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"/></svg>`;

// Marca: quatro quadras de um mapa, uma delas vazada (o "lote" escolhido).
const marcaSvg = (cor = 'currentColor', destaque = 'var(--acento)') => `<svg class="marca-ic" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><rect x="2" y="2" width="12.5" height="12.5" fill="${cor}"/><rect x="17.5" y="2" width="12.5" height="12.5" fill="${cor}"/><rect x="2" y="17.5" width="12.5" height="12.5" fill="${cor}"/><rect x="17.5" y="17.5" width="12.5" height="12.5" fill="${destaque}"/></svg>`;
const marca = v => `<a class="marca" href="/${v}/" aria-label="${MARCA.nome}, início">${marcaSvg()}<span class="marca-txt"><b>${MARCA.curto}</b><small>Imóveis</small></span></a>`;

const VERSOES = {
  a: {
    nome: 'Vitrine',
    fontes: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..800&family=Inter:wght@400;500;600&display=swap',
    cor: '#e4572e', fundo: '#14171c', claro: '#f6f5f2',
  },
  b: {
    nome: 'Bairro',
    fontes: 'https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap',
    cor: '#c9ec5b', fundo: '#0f3a2e', claro: '#f4f6f1',
  },
};

const menu = [
  ['comprar', 'Comprar', 'imoveis/?fin=venda'],
  ['alugar', 'Alugar', 'imoveis/?fin=aluguel'],
  ['anunciar', 'Anunciar imóvel', 'anunciar/'],
  ['sobre', 'A Quadra', 'sobre/'],
  ['contato', 'Contato', 'contato/'],
];

function header(v, ativo, sobreFoto) {
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="topo-info"><div class="in"><span>${ic('pino', 15)} Moinhos de Vento, Porto Alegre</span><span class="ti-dir"><a href="tel:${MARCA.foneHref}">${ic('fone', 15)} ${MARCA.fone}</a><span>${MARCA.creci}</span></span></div></div>
<header class="cab${sobreFoto ? ' cab-foto' : ''}" data-cab>
  <div class="in cab-in">
    ${marca(v)}
    <nav class="nav" aria-label="Principal" data-nav>
      ${menu.map(([k, t, h]) => `<a href="/${v}/${h}"${k === ativo ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
    </nav>
    <div class="cab-acoes">
      <a class="fav-link" href="/${v}/favoritos/" aria-label="Favoritos">${ic('coracao', 20)}<span class="fav-n" data-fav-n hidden>0</span></a>
      <a class="btn btn-acento btn-p cab-cta" href="/${v}/imoveis/">${ic('busca', 17)} Buscar imóveis</a>
      <button class="menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false" data-menu>${ic('menu', 24)}</button>
    </div>
  </div>
</header>`;
}

function footer(v) {
  return `<footer class="rod">
  <div class="in rod-grade">
    <div class="rod-marca">${marca(v)}<p>${MARCA.slogan} Venda, locação e avaliação de imóveis residenciais.</p><p class="rod-creci">${MARCA.creci}</p></div>
    <div><h3>Imóveis</h3><a href="/${v}/imoveis/?fin=venda">À venda</a><a href="/${v}/imoveis/?fin=aluguel">Para alugar</a><a href="/${v}/imoveis/?tipo=apartamento">Apartamentos</a><a href="/${v}/imoveis/?tipo=casa">Casas</a><a href="/${v}/favoritos/">Meus favoritos</a></div>
    <div><h3>Proprietário</h3><a href="/${v}/anunciar/">Anunciar imóvel</a><a href="/${v}/anunciar/#avaliacao">Avaliação gratuita</a><a href="/${v}/sobre/">A Quadra</a></div>
    <div><h3>Fale com a gente</h3><a href="tel:${MARCA.foneHref}">${MARCA.fone}</a><a href="mailto:${MARCA.email}">${MARCA.email}</a><p>${MARCA.endereco}</p><p>${MARCA.horario}</p></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${MARCA.nome}</span><span>Site modelo criado pela <a href="https://agencia.overtus.com.br/">Overtus</a>. Imóveis, preços e contatos são fictícios; fotos de banco de imagens.</span></div>
</footer>
<a class="whats-flut" href="#" data-whats="Olá! Vim pelo site da ${MARCA.nome}." aria-label="Conversar no WhatsApp">${icWhats(28)}</a>
<dialog class="lb" data-lb><button class="lb-fechar" type="button" aria-label="Fechar" data-lb-fechar>${ic('fechar', 26)}</button><button class="lb-nav lb-ant" type="button" aria-label="Foto anterior" data-lb-ant>${ic('esq', 26)}</button><img alt="" data-lb-img><button class="lb-nav lb-prox" type="button" aria-label="Próxima foto" data-lb-prox>${ic('seta', 26)}</button><p class="lb-cont" data-lb-cont></p></dialog>`;
}

function pagina(v, { rota, titulo, desc, corpo, ativo, sobreFoto, og }) {
  const V = VERSOES[v];
  const url = `${MARCA.url}${v}/${rota}`;
  const t = titulo ? `${titulo} · ${MARCA.nome}` : `${MARCA.nome} · ${MARCA.slogan}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${MARCA.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og || `${MARCA.url}assets/og-${v}.jpg`}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${V.fundo}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${V.fontes}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${v}" data-whats-num="${MARCA.whats}">
${header(v, ativo, sobreFoto)}
<main id="conteudo">
${corpo}
</main>
${footer(v)}
</body>
</html>
`;
}

// ---------- peças ----------
const atributos = i => `data-fin="${i.fin}" data-tipo="${i.tipo}" data-bairro="${esc(i.bairro)}" data-preco="${i.preco}" data-dorm="${i.dorm}" data-vagas="${i.vagas}" data-area="${i.area}" data-ref="${i.ref}"`;
const specs = i => `<ul class="specs"><li>${ic('area', 17)}${i.area} m²</li>${i.dorm ? `<li>${ic('cama', 17)}${i.dorm} dorm.</li>` : ''}<li>${ic('banho', 17)}${i.banh} banh.</li>${i.vagas ? `<li>${ic('carro', 17)}${i.vagas} vaga${i.vagas > 1 ? 's' : ''}</li>` : ''}</ul>`;
const favBtn = i => `<button class="fav" type="button" data-fav="${i.ref}" aria-pressed="false" aria-label="Salvar ${esc(i.titulo)} nos favoritos">${ic('coracao', 19)}</button>`;
const selo = i => `<span class="selo selo-${i.fin}">${i.fin === 'venda' ? 'Venda' : 'Aluguel'}</span>`;

function card(v, i, extra = '') {
  return `<article class="card ${extra}" ${atributos(i)}>
  <a class="card-foto" href="/${v}/imovel/${i.slug}/"><img src="${img(i.fotos[0], true)}" alt="${esc(i.titulo)}" loading="lazy" decoding="async" width="720" height="540">${selo(i)}<span class="card-n">${ic('camera', 14)} ${i.fotos.length}</span></a>
  ${favBtn(i)}
  <div class="card-info">
    <p class="card-loc">${TIPOS[i.tipo]} · ${esc(i.bairro)}</p>
    <h3><a href="/${v}/imovel/${i.slug}/">${esc(i.titulo)}</a></h3>
    ${specs(i)}
    <p class="card-preco">${precoTxt(i)}</p>
  </div>
</article>`;
}

function buscaForm(v, cls = '') {
  return `<form class="busca ${cls}" action="/${v}/imoveis/" method="get" role="search">
  <div class="busca-abas" role="radiogroup" aria-label="Finalidade">
    <label><input type="radio" name="fin" value="venda" checked><span>Comprar</span></label>
    <label><input type="radio" name="fin" value="aluguel"><span>Alugar</span></label>
  </div>
  <div class="busca-campos">
    <label class="campo"><span>Tipo</span><select name="tipo"><option value="">Todos os tipos</option>${Object.entries(TIPOS).map(([k, t]) => `<option value="${k}">${t}</option>`).join('')}</select></label>
    <label class="campo"><span>Bairro</span><select name="bairro"><option value="">Todos os bairros</option>${bairros.map(b => `<option>${esc(b)}</option>`).join('')}</select></label>
    <label class="campo"><span>Dormitórios</span><select name="dorm"><option value="">Qualquer</option><option value="1">1 ou mais</option><option value="2">2 ou mais</option><option value="3">3 ou mais</option><option value="4">4 ou mais</option></select></label>
    <button class="btn btn-acento busca-btn" type="submit">${ic('busca', 19)} Buscar</button>
  </div>
</form>`;
}

const passos = [
  ['busca', 'Você conta o que procura', 'Bairro, tamanho, orçamento e o que não pode faltar. Em 10 minutos de conversa a gente entende o essencial.'],
  ['olho', 'Visitas com quem conhece', 'Separamos só imóveis que fazem sentido e vamos junto, com a ficha do prédio e do bairro em mãos.'],
  ['doc', 'Documentação conferida', 'Matrícula, certidões e débitos verificados antes da proposta. Nada de surpresa na hora de assinar.'],
  ['aperto', 'Proposta e negociação', 'Negociamos preço e condições por você e cuidamos do contrato e do financiamento.'],
  ['chave', 'As chaves na sua mão', 'Acompanhamos a escritura, o registro e a vistoria de entrega. Depois disso, a casa é sua.'],
];

// ---------- páginas ----------
function inicioA(v) {
  const dest = IMOVEIS.filter(i => i.destaque);
  const [d1, d2, d3] = dest;
  const recentes = IMOVEIS.filter(i => !i.destaque).slice(0, 6);
  return `<section class="hero">
  <img class="hero-foto" src="${img('casa-noite')}" alt="Casa contemporânea iluminada ao entardecer" fetchpriority="high" width="1600" height="1067">
  <div class="in hero-in">
    <p class="rotulo">${nVenda} imóveis à venda · ${nAluguel} para alugar</p>
    <h1>Imóveis escolhidos a dedo em Porto Alegre.</h1>
    <p class="hero-sub">Casas e apartamentos nos melhores bairros da cidade, com fotos de verdade, ficha completa e um corretor que conhece cada endereço.</p>
  </div>
  <div class="in hero-busca">${buscaForm(v)}</div>
</section>

<section class="sec destaques-a">
  <div class="in">
    <div class="sec-topo"><div><p class="rotulo">Em destaque</p><h2>Os imóveis da semana</h2></div><a class="link-seta" href="/${v}/imoveis/">Ver todos os ${IMOVEIS.length} imóveis ${ic('seta', 18)}</a></div>
    <div class="dest-grade">
      <article class="dest-grande" ${atributos(d1)}>
        <a href="/${v}/imovel/${d1.slug}/" class="dest-foto"><img src="${img(d1.fotos[0])}" alt="${esc(d1.titulo)}" loading="lazy" width="1600" height="1067"></a>
        ${favBtn(d1)}
        <div class="dest-info">
          <p class="card-loc">${TIPOS[d1.tipo]} · ${esc(d1.bairro)} · ${d1.ref}</p>
          <h3><a href="/${v}/imovel/${d1.slug}/">${esc(d1.titulo)}</a></h3>
          ${specs(d1)}
          <p class="card-preco">${precoTxt(d1)}</p>
        </div>
      </article>
      ${card(v, d2, 'card-lado')}
      ${card(v, d3, 'card-lado')}
    </div>
  </div>
</section>

<section class="sec bairros-a">
  <div class="in bairros-a-in">
    <div class="bairros-a-txt">
      <p class="rotulo">Bairros</p>
      <h2>Escolha pelo endereço</h2>
      <p>Cada bairro tem seu ritmo. Passe o mouse para ver um imóvel de lá e clique para ver o que temos na região.</p>
      <figure class="bairro-preview" aria-hidden="true">${Object.entries(BAIRROS_FOTO).map(([b, [f]], k) => `<img src="${img(f, true)}" alt="" data-bairro-img="${esc(b)}"${k ? '' : ' class="on"'} loading="lazy">`).join('')}</figure>
    </div>
    <ol class="bairros-lista">
      ${Object.entries(BAIRROS_FOTO).map(([b, [, d]]) => `<li><a href="/${v}/imoveis/?bairro=${encodeURIComponent(b)}" data-bairro="${esc(b)}"><span class="bl-nome">${esc(b)}</span><span class="bl-n">${d}</span>${ic('seta', 22)}</a></li>`).join('')}
    </ol>
  </div>
</section>

<section class="sec passos-a">
  <div class="in">
    <div class="sec-topo"><div><p class="rotulo">Como compramos com você</p><h2>Do primeiro clique às chaves</h2></div></div>
    <ol class="linha-tempo">
      ${passos.map(([icn, t, d], k) => `<li><span class="lt-n">${String(k + 1).padStart(2, '0')}</span><span class="lt-ic">${ic(icn, 24)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="anuncie-a">
  <img src="${img('living-terroso')}" alt="" loading="lazy">
  <div class="in anuncie-a-in">
    <div>
      <p class="rotulo">Para proprietários</p>
      <h2>Quanto vale o seu imóvel hoje?</h2>
      <p>Avaliação gratuita feita por um corretor do bairro, com comparação de vendas reais. Se decidir anunciar, cuidamos das fotos, das visitas e da negociação.</p>
    </div>
    <form class="form form-escuro" data-form="Avaliação de imóvel">
      <label class="campo"><span>Seu nome</span><input name="Nome" required autocomplete="name"></label>
      <label class="campo"><span>Bairro do imóvel</span><input name="Bairro" required></label>
      <label class="campo"><span>Telefone ou WhatsApp</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label>
      <button class="btn btn-acento" type="submit">Pedir avaliação ${ic('seta', 18)}</button>
      <p class="form-ok" role="status" hidden></p>
    </form>
  </div>
</section>

<section class="sec">
  <div class="in">
    <div class="sec-topo"><div><p class="rotulo">Chegaram agora</p><h2>Novos na carteira</h2></div><a class="link-seta" href="/${v}/imoveis/">Buscar com filtros ${ic('seta', 18)}</a></div>
    <div class="grade-cards">${recentes.map(i => card(v, i)).join('')}</div>
  </div>
</section>

<section class="faixa-contato">
  <div class="in fc-in">
    <h2>Não achou o que procura?</h2>
    <p>Diga o que você precisa e avisamos quando entrar um imóvel com a sua cara, antes de ir para o site.</p>
    <a class="btn btn-acento" href="#" data-whats="Olá! Procuro um imóvel e queria receber opções antes de irem para o site.">${icWhats(19)} Avise-me pelo WhatsApp</a>
  </div>
</section>`;
}

function inicioB(v) {
  const dest = IMOVEIS.filter(i => i.destaque);
  const cats = [
    ['Apartamentos', 'tipo=apartamento', 'living-panoramico', IMOVEIS.filter(i => i.tipo === 'apartamento').length],
    ['Casas', 'tipo=casa', 'casa-laje', IMOVEIS.filter(i => i.tipo === 'casa').length],
    ['Coberturas', 'tipo=cobertura', 'living-piscina', IMOVEIS.filter(i => i.tipo === 'cobertura').length],
    ['Para alugar', 'fin=aluguel', 'living-integrado', nAluguel],
  ];
  return `<section class="hero-b">
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      <p class="rotulo">Imobiliária em Porto Alegre</p>
      <h1>A casa certa começa pelo bairro certo.</h1>
      <p class="hero-sub">Comprar, alugar ou vender com quem anda pelas ruas de Moinhos, Bela Vista, Três Figueiras e Zona Sul todos os dias.</p>
      ${buscaForm(v, 'busca-b')}
    </div>
    <div class="hero-mosaico">
      <a class="hm hm-1" href="/${v}/imovel/${dest[0].slug}/"><img src="${img(dest[0].fotos[0])}" alt="${esc(dest[0].titulo)}" fetchpriority="high"><span class="hm-tag"><small>Imóvel da semana</small>${esc(dest[0].bairro)} · ${brl(dest[0].preco)}</span></a>
      <a class="hm hm-2" href="/${v}/imovel/${dest[2].slug}/"><img src="${img(dest[2].fotos[1], true)}" alt="${esc(dest[2].titulo)}"></a>
      <a class="hm hm-3" href="/${v}/imovel/${dest[1].slug}/"><img src="${img(dest[1].fotos[1], true)}" alt="${esc(dest[1].titulo)}"></a>
    </div>
  </div>
</section>

<section class="sec cats">
  <div class="in">
    <div class="sec-topo"><div><p class="rotulo">Comece por aqui</p><h2>O que você está procurando?</h2></div></div>
    <div class="cats-grade">${cats.map(([t, q, f, n]) => `<a class="cat" href="/${v}/imoveis/?${q}"><img src="${img(f, true)}" alt="" loading="lazy"><span class="cat-t">${t}</span><span class="cat-n">${n} imóve${n > 1 ? 'is' : 'l'} ${ic('seta', 18)}</span></a>`).join('')}</div>
  </div>
</section>

<section class="sec carrossel-sec">
  <div class="in">
    <div class="sec-topo"><div><p class="rotulo">Em destaque</p><h2>Selecionados pela equipe</h2></div><div class="car-nav"><button type="button" aria-label="Anteriores" data-car="-1">${ic('esq', 20)}</button><button type="button" aria-label="Próximos" data-car="1">${ic('seta', 20)}</button></div></div>
  </div>
  <div class="carrossel" data-carrossel>${dest.concat(IMOVEIS.filter(i => !i.destaque).slice(0, 3)).map(i => card(v, i)).join('')}</div>
</section>

<section class="porque">
  <div class="in porque-in">
    <div class="porque-foto"><img src="${img('jantar-verde')}" alt="Sala de jantar com cadeiras verdes" loading="lazy"></div>
    <div>
      <p class="rotulo">Por que a Quadra</p>
      <h2>Menos anúncios, mais imóveis que valem a visita.</h2>
      <ol class="porque-lista">
        <li><b>Curadoria</b><p>Visitamos cada imóvel antes de anunciar. Se a foto não mostra o que você vai ver, ele não entra.</p></li>
        <li><b>Ficha completa</b><p>Condomínio, IPTU, metragem e situação da documentação na página de cada imóvel.</p></li>
        <li><b>Corretor do bairro</b><p>Quem atende você mora ou trabalha na região e sabe da padaria à escola.</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="sec passos-b">
  <div class="in">
    <div class="sec-topo sec-topo-c"><div><p class="rotulo">Passo a passo</p><h2>Do primeiro clique às chaves</h2></div></div>
    <ol class="zigue">${passos.map(([icn, t, d], k) => `<li><span class="zg-n">${k + 1}</span><div class="zg-c"><span class="zg-ic">${ic(icn, 26)}</span><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
  </div>
</section>

<section class="sec bairros-b">
  <div class="in">
    <div class="sec-topo"><div><p class="rotulo">Onde estamos</p><h2>Bairros com imóveis agora</h2></div><a class="link-seta" href="/${v}/imoveis/">Buscar por bairro ${ic('seta', 18)}</a></div>
    <ul class="chips-bairro">${bairros.map(b => `<li><a href="/${v}/imoveis/?bairro=${encodeURIComponent(b)}">${esc(b)} ${ic('seta', 16)}</a></li>`).join('')}</ul>
  </div>
</section>

<section class="anuncie-b">
  <div class="in anuncie-b-in">
    <div>
      <p class="rotulo">Tem um imóvel?</p>
      <h2>Venda ou alugue com a Quadra.</h2>
      <ul class="lista-check"><li>${ic('check', 18)} Avaliação gratuita com vendas reais do bairro</li><li>${ic('check', 18)} Fotos profissionais e anúncio nos grandes portais</li><li>${ic('check', 18)} Visitas acompanhadas e propostas filtradas</li></ul>
    </div>
    <form class="form" data-form="Anunciar imóvel">
      <label class="campo"><span>Seu nome</span><input name="Nome" required autocomplete="name"></label>
      <label class="campo"><span>Telefone ou WhatsApp</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label>
      <label class="campo"><span>Quero</span><select name="Finalidade"><option>Vender</option><option>Alugar</option><option>Só saber quanto vale</option></select></label>
      <button class="btn btn-escuro" type="submit">Quero anunciar ${ic('seta', 18)}</button>
      <p class="form-ok" role="status" hidden></p>
    </form>
  </div>
</section>`;
}

function listagem(v) {
  return `<section class="pag-topo"><div class="in"><nav class="migalha" aria-label="Você está em"><a href="/${v}/">Início</a> / <span>Imóveis</span></nav><h1 data-lista-titulo>Imóveis à venda e para alugar</h1></div></section>
<section class="sec sec-lista">
  <div class="in lista-in">
    <button class="btn btn-linha filtros-btn" type="button" data-filtros-abrir aria-expanded="false">${ic('filtro', 18)} Filtros</button>
    <form class="filtros" data-filtros>
      <fieldset class="f-fin"><legend>Finalidade</legend>
        <label><input type="radio" name="fin" value=""><span>Todos</span></label>
        <label><input type="radio" name="fin" value="venda"><span>Comprar</span></label>
        <label><input type="radio" name="fin" value="aluguel"><span>Alugar</span></label>
      </fieldset>
      <label class="campo"><span>Tipo</span><select name="tipo"><option value="">Todos os tipos</option>${Object.entries(TIPOS).map(([k, t]) => `<option value="${k}">${t}</option>`).join('')}</select></label>
      <label class="campo"><span>Bairro</span><select name="bairro"><option value="">Todos os bairros</option>${bairros.map(b => `<option>${esc(b)}</option>`).join('')}</select></label>
      <div class="f-dupla"><label class="campo"><span>Preço mínimo</span><input name="min" inputmode="numeric" placeholder="R$"></label><label class="campo"><span>Preço máximo</span><input name="max" inputmode="numeric" placeholder="R$"></label></div>
      <fieldset class="f-num"><legend>Dormitórios</legend>${['', '1', '2', '3', '4'].map(n => `<label><input type="radio" name="dorm" value="${n}"><span>${n ? n + '+' : 'Todos'}</span></label>`).join('')}</fieldset>
      <fieldset class="f-num"><legend>Vagas</legend>${['', '1', '2', '3'].map(n => `<label><input type="radio" name="vagas" value="${n}"><span>${n ? n + '+' : 'Todas'}</span></label>`).join('')}</fieldset>
      <button class="btn btn-linha f-limpar" type="reset">Limpar filtros</button>
    </form>
    <div class="resultados">
      <div class="res-topo"><p data-res-n aria-live="polite">${IMOVEIS.length} imóveis</p><label class="campo campo-linha"><span>Ordenar</span><select data-ordem><option value="rec">Mais recentes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="area">Maior área</option></select></label></div>
      <div class="grade-cards" data-lista>${IMOVEIS.map((i, k) => card(v, i).replace('<article class="card ', `<article style="--ord:${k}" class="card `)).join('')}</div>
      <div class="vazio" data-vazio hidden><h2>Nenhum imóvel com esses filtros</h2><p>Tente outro bairro ou faixa de preço, ou peça para avisarmos quando entrar.</p><a class="btn btn-acento" href="#" data-whats="Olá! Não achei no site o imóvel que procuro. Podem me avisar quando entrar?">${icWhats(18)} Avise-me</a></div>
    </div>
  </div>
</section>`;
}

function detalhe(v, i) {
  const sim = IMOVEIS.filter(o => o !== i && (o.fin === i.fin) && (o.tipo === i.tipo || o.bairro === i.bairro)).slice(0, 3);
  const mais = sim.length < 3 ? IMOVEIS.filter(o => o !== i && !sim.includes(o) && o.fin === i.fin).slice(0, 3 - sim.length) : [];
  const custo = i.fin === 'aluguel'
    ? `<div class="sim" data-sim-aluguel data-aluguel="${i.preco}" data-cond="${i.cond}" data-iptu="${i.iptu}">
        <h2>Custo por mês</h2>
        <dl class="sim-linhas"><div><dt>Aluguel</dt><dd>${brl(i.preco)}</dd></div><div><dt>Condomínio</dt><dd>${i.cond ? brl(i.cond) : 'Não tem'}</dd></div><div><dt>IPTU</dt><dd>${brl(i.iptu)}</dd></div><div><dt>Seguro incêndio (estimado)</dt><dd data-seguro></dd></div><div class="sim-total"><dt>Total</dt><dd data-total></dd></div></dl>
        <p class="sim-nota">Garantias aceitas: seguro fiança, título de capitalização ou fiador. Valores de demonstração.</p>
      </div>`
    : `<div class="sim" data-sim data-preco="${i.preco}">
        <h2>Simule o financiamento</h2>
        <div class="sim-campos">
          <label class="campo"><span>Entrada <output data-ent-out></output></span><input type="range" min="20" max="80" step="5" value="30" data-ent></label>
          <label class="campo"><span>Prazo <output data-prazo-out></output></span><input type="range" min="60" max="420" step="12" value="360" data-prazo></label>
          <label class="campo"><span>Juros ao ano</span><select data-juros><option value="10.5">10,5%</option><option value="11.5" selected>11,5%</option><option value="12.5">12,5%</option></select></label>
        </div>
        <dl class="sim-linhas"><div><dt>Valor financiado</dt><dd data-fin-val></dd></div><div><dt>1ª parcela (SAC)</dt><dd data-sac></dd></div><div class="sim-total"><dt>Parcela fixa (Price)</dt><dd data-price></dd></div></dl>
        <p class="sim-nota">Simulação aproximada, sem seguros e taxas do banco. A aprovação depende da análise de crédito.</p>
      </div>`;
  return `<section class="pag-topo pag-topo-imovel"><div class="in">
  <nav class="migalha" aria-label="Você está em"><a href="/${v}/">Início</a> / <a href="/${v}/imoveis/?fin=${i.fin}">${i.fin === 'venda' ? 'Comprar' : 'Alugar'}</a> / <span>${esc(i.bairro)}</span></nav>
  <div class="im-cab">
    <div><p class="card-loc">${TIPOS[i.tipo]} · ${esc(i.bairro)}, Porto Alegre · Ref. ${i.ref}</p><h1>${esc(i.titulo)}</h1></div>
    <div class="im-preco"><small>${i.fin === 'venda' ? 'Valor de venda' : 'Aluguel'}</small><b>${precoTxt(i)}</b>${favBtn(i).replace('class="fav"', 'class="fav fav-txt"').replace('</svg>', '</svg><span>Salvar</span>')}</div>
  </div>
</div></section>
<section class="galeria in" data-galeria>
  ${i.fotos.map((f, k) => `<button type="button" class="gal-item gal-${k}" data-gal="${img(f)}" aria-label="Ampliar foto ${k + 1} de ${i.fotos.length}"><img src="${img(f, k > 0)}" alt="${esc(i.titulo)}, foto ${k + 1}" ${k ? 'loading="lazy"' : 'fetchpriority="high"'}></button>`).join('')}
  <span class="gal-todas">${ic('camera', 16)} Ver as ${i.fotos.length} fotos</span>
</section>
<section class="sec sec-imovel">
  <div class="in im-grade">
    <div class="im-principal">
      <ul class="im-numeros">
        <li>${ic('area', 24)}<b>${i.area} m²</b><span>área privativa</span></li>
        ${i.terreno ? `<li>${ic('casa', 24)}<b>${i.terreno} m²</b><span>terreno</span></li>` : ''}
        <li>${ic('cama', 24)}<b>${i.dorm}</b><span>dormitório${i.dorm > 1 ? 's' : ''}${i.suites ? `, ${i.suites} suíte${i.suites > 1 ? 's' : ''}` : ''}</span></li>
        <li>${ic('banho', 24)}<b>${i.banh}</b><span>banheiro${i.banh > 1 ? 's' : ''}</span></li>
        <li>${ic('carro', 24)}<b>${i.vagas || '–'}</b><span>vaga${i.vagas === 1 ? '' : 's'}</span></li>
      </ul>
      <div class="im-bloco"><h2>Sobre o imóvel</h2><p>${esc(i.texto)}</p></div>
      <div class="im-bloco"><h2>Características</h2><ul class="im-itens">${i.itens.map(t => `<li>${ic('check', 17)}${esc(t)}</li>`).join('')}</ul></div>
      <div class="im-bloco"><h2>Valores</h2><dl class="im-valores"><div><dt>${i.fin === 'venda' ? 'Venda' : 'Aluguel'}</dt><dd>${precoTxt(i)}</dd></div><div><dt>Condomínio</dt><dd>${i.cond ? brl(i.cond) + '/mês' : 'Não tem'}</dd></div><div><dt>IPTU</dt><dd>${brl(i.iptu)}/mês</dd></div>${i.fin === 'venda' ? `<div><dt>Valor por m²</dt><dd>${brl(Math.round(i.preco / i.area))}</dd></div>` : ''}</dl></div>
      ${custo}
      <div class="im-bloco im-local"><h2>Localização</h2><div class="mapa-ph">${ic('pino', 28)}<p><b>${esc(i.bairro)}, Porto Alegre</b>O endereço exato é passado na visita, para a segurança do proprietário.</p></div></div>
    </div>
    <aside class="im-lateral">
      <div class="visita">
        <h2>Agende uma visita</h2>
        <p>Resposta em até 1 hora no horário comercial.</p>
        <form class="form" data-form="Visita ao imóvel ${i.ref} (${esc(i.titulo)})">
          <label class="campo"><span>Nome</span><input name="Nome" required autocomplete="name"></label>
          <label class="campo"><span>Telefone ou WhatsApp</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label>
          <label class="campo"><span>Melhor dia</span><select name="Dia"><option>Durante a semana</option><option>Sábado de manhã</option><option>Tanto faz</option></select></label>
          <button class="btn btn-acento" type="submit">Quero visitar ${ic('seta', 18)}</button>
          <p class="form-ok" role="status" hidden></p>
        </form>
        <a class="btn btn-linha" href="#" data-whats="Olá! Tenho interesse no imóvel ${i.ref}, ${i.titulo} (${i.bairro}).">${icWhats(18)} Conversar no WhatsApp</a>
      </div>
    </aside>
  </div>
</section>
<section class="sec sec-parecidos"><div class="in"><div class="sec-topo"><div><p class="rotulo">Veja também</p><h2>Imóveis parecidos</h2></div></div><div class="grade-cards">${sim.concat(mais).map(o => card(v, o)).join('')}</div></div></section>`;
}

function anunciar(v) {
  return `<section class="pag-topo pag-topo-foto"><img src="${img('living-madeira')}" alt=""><div class="in"><nav class="migalha" aria-label="Você está em"><a href="/${v}/">Início</a> / <span>Anunciar imóvel</span></nav><h1>Venda ou alugue seu imóvel com quem conhece o bairro.</h1><p class="pt-sub">Avaliação gratuita, fotos profissionais e visitas acompanhadas. Você só paga a comissão quando o negócio sai.</p></div></section>
<section class="sec">
  <div class="in">
    <div class="sec-topo"><div><p class="rotulo">Como funciona</p><h2>Seu imóvel anunciado em uma semana</h2></div></div>
    <ol class="etapas-anuncio">
      <li><span>1</span><h3>Avaliação</h3><p>Um corretor visita o imóvel e compara com vendas e aluguéis reais da região para chegar a um preço que vende.</p></li>
      <li><span>2</span><h3>Fotos e ficha</h3><p>Fotógrafo profissional, planta, metragem conferida e documentos organizados antes de anunciar.</p></li>
      <li><span>3</span><h3>Divulgação</h3><p>No nosso site, nos grandes portais e para a nossa lista de clientes que já procuram no bairro.</p></li>
      <li><span>4</span><h3>Visitas e propostas</h3><p>Visitas só com interessados qualificados. Você recebe cada proposta por escrito e decide.</p></li>
    </ol>
  </div>
</section>
<section class="sec sec-cinza" id="avaliacao">
  <div class="in form-dupla">
    <div>
      <p class="rotulo">Avaliação gratuita</p>
      <h2>Conte um pouco sobre o imóvel</h2>
      <p>Respondemos no mesmo dia com os próximos passos. Seus dados não são compartilhados com ninguém.</p>
      <ul class="lista-check"><li>${ic('check', 18)} Sem compromisso e sem exclusividade obrigatória</li><li>${ic('check', 18)} Relatório com imóveis comparáveis</li><li>${ic('check', 18)} Sugestão de preço para venda e para aluguel</li></ul>
    </div>
    <form class="form form-grande" data-form="Anunciar imóvel">
      <fieldset class="f-fin"><legend>Quero</legend><label><input type="radio" name="Finalidade" value="Vender" checked><span>Vender</span></label><label><input type="radio" name="Finalidade" value="Alugar"><span>Alugar</span></label><label><input type="radio" name="Finalidade" value="Avaliar"><span>Só avaliar</span></label></fieldset>
      <div class="f-dupla"><label class="campo"><span>Tipo</span><select name="Tipo">${Object.values(TIPOS).map(t => `<option>${t}</option>`).join('')}</select></label><label class="campo"><span>Bairro</span><input name="Bairro" required></label></div>
      <div class="f-dupla"><label class="campo"><span>Área (m²)</span><input name="Área" inputmode="numeric"></label><label class="campo"><span>Dormitórios</span><select name="Dormitórios"><option>1</option><option>2</option><option selected>3</option><option>4 ou mais</option></select></label></div>
      <label class="campo"><span>Seu nome</span><input name="Nome" required autocomplete="name"></label>
      <div class="f-dupla"><label class="campo"><span>Telefone ou WhatsApp</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label><label class="campo"><span>E-mail</span><input name="E-mail" type="email" autocomplete="email"></label></div>
      <button class="btn btn-acento" type="submit">Enviar para avaliação ${ic('seta', 18)}</button>
      <p class="form-ok" role="status" hidden></p>
    </form>
  </div>
</section>`;
}

function sobre(v) {
  return `<section class="pag-topo pag-topo-foto"><img src="${img('jantar-verde')}" alt=""><div class="in"><nav class="migalha" aria-label="Você está em"><a href="/${v}/">Início</a> / <span>A Quadra</span></nav><h1>Uma imobiliária de bairro, com o cuidado de uma boutique.</h1></div></section>
<section class="sec">
  <div class="in sobre-grade">
    <div class="rotuloxt">
      <p class="rotulo">Quem somos</p>
      <h2>Poucos imóveis, muito bem cuidados.</h2>
      <p>A Quadra nasceu da ideia de que procurar casa não precisa ser cansativo. Em vez de milhares de anúncios repetidos, uma carteira enxuta de imóveis que a nossa equipe visitou, mediu e fotografou.</p>
      <p>Trabalhamos com venda, locação e avaliação de imóveis residenciais nos bairros onde a gente vive. Cada cliente tem um corretor do começo ao fim, do primeiro contato à entrega das chaves.</p>
    </div>
    <figure class="sobre-foto"><img src="${img('living-quadros')}" alt="Living iluminado com quadros na parede" loading="lazy"></figure>
  </div>
</section>
<section class="sec sec-cinza">
  <div class="in">
    <div class="sec-topo"><div><p class="rotulo">O que nos guia</p><h2>Três compromissos com quem compra, vende ou aluga</h2></div></div>
    <div class="valores">
      <div><span class="val-ic">${ic('olho', 28)}</span><h3>Foto que é o imóvel</h3><p>Sem grande-angular exagerada nem filtro. Se você se decepcionar na visita, o erro foi nosso.</p></div>
      <div><span class="val-ic">${ic('doc', 28)}</span><h3>Documentação em dia</h3><p>Conferimos matrícula, certidões e débitos antes de anunciar. A negociação começa segura.</p></div>
      <div><span class="val-ic">${ic('fone', 28)}</span><h3>Resposta no mesmo dia</h3><p>Mensagem respondida em até 1 hora no horário comercial, inclusive no sábado de manhã.</p></div>
    </div>
  </div>
</section>
<section class="sec">
  <div class="in servicos">
    <a href="/${v}/imoveis/?fin=venda"><h3>Venda</h3><p>Imóveis residenciais prontos, com ficha completa e simulação de financiamento.</p><span class="link-seta">Ver imóveis à venda ${ic('seta', 18)}</span></a>
    <a href="/${v}/imoveis/?fin=aluguel"><h3>Locação</h3><p>Contrato digital, vistoria com fotos e garantias flexíveis: seguro fiança, capitalização ou fiador.</p><span class="link-seta">Ver imóveis para alugar ${ic('seta', 18)}</span></a>
    <a href="/${v}/anunciar/"><h3>Administração</h3><p>Cuidamos do seu imóvel alugado: cobrança, repasse, manutenção e renovação de contrato.</p><span class="link-seta">Anunciar meu imóvel ${ic('seta', 18)}</span></a>
  </div>
</section>`;
}

function contato(v) {
  return `<section class="pag-topo"><div class="in"><nav class="migalha" aria-label="Você está em"><a href="/${v}/">Início</a> / <span>Contato</span></nav><h1>Fale com a Quadra</h1><p class="pt-sub">Atendimento por telefone, WhatsApp ou na nossa loja no Moinhos de Vento.</p></div></section>
<section class="sec">
  <div class="in form-dupla">
    <div class="contato-info">
      <a href="#" data-whats="Olá! Vim pelo site da ${MARCA.nome}.">${icWhats(24)}<span><b>WhatsApp</b>Resposta em até 1 hora</span></a>
      <a href="tel:${MARCA.foneHref}">${ic('fone', 24)}<span><b>${MARCA.fone}</b>Telefone</span></a>
      <a href="mailto:${MARCA.email}">${ic('email', 24)}<span><b>${MARCA.email}</b>E-mail</span></a>
      <p>${ic('pino', 24)}<span><b>Loja</b>${MARCA.endereco}<br>${MARCA.horario}</span></p>
    </div>
    <form class="form form-grande" data-form="Contato pelo site">
      <label class="campo"><span>Nome</span><input name="Nome" required autocomplete="name"></label>
      <div class="f-dupla"><label class="campo"><span>Telefone ou WhatsApp</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label><label class="campo"><span>E-mail</span><input name="E-mail" type="email" autocomplete="email"></label></div>
      <label class="campo"><span>Assunto</span><select name="Assunto"><option>Quero comprar</option><option>Quero alugar</option><option>Quero vender ou alugar meu imóvel</option><option>Sou inquilino ou proprietário</option><option>Outro assunto</option></select></label>
      <label class="campo"><span>Mensagem</span><textarea name="Mensagem" rows="4"></textarea></label>
      <button class="btn btn-acento" type="submit">Enviar mensagem ${ic('seta', 18)}</button>
      <p class="form-ok" role="status" hidden></p>
    </form>
  </div>
</section>`;
}

function favoritos(v) {
  return `<section class="pag-topo"><div class="in"><nav class="migalha" aria-label="Você está em"><a href="/${v}/">Início</a> / <span>Favoritos</span></nav><h1>Meus favoritos</h1><p class="pt-sub">Os imóveis que você salvou ficam guardados neste aparelho.</p></div></section>
<section class="sec"><div class="in">
  <div class="grade-cards" data-favs>${IMOVEIS.map(i => card(v, i).replace('<article class="card ', '<article hidden class="card ')).join('')}</div>
  <div class="vazio" data-favs-vazio><h2>Nenhum favorito ainda</h2><p>Toque no coração de um imóvel para guardar aqui e comparar depois.</p><a class="btn btn-acento" href="/${v}/imoveis/">${ic('busca', 18)} Buscar imóveis</a></div>
</div></section>`;
}

// ---------- gerar ----------
function grava(rel, html) {
  const f = path.join(pub, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}

for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  grava(`${v}/index.html`, pagina(v, { rota: '', desc: `${MARCA.nome}: casas e apartamentos à venda e para alugar em Porto Alegre, com fotos reais, ficha completa e corretor do bairro.`, corpo: v === 'a' ? inicioA(v) : inicioB(v), ativo: '', sobreFoto: v === 'a' }));
  grava(`${v}/imoveis/index.html`, pagina(v, { rota: 'imoveis/', titulo: 'Imóveis à venda e para alugar', desc: `Busque casas, apartamentos e coberturas em Porto Alegre por bairro, preço, dormitórios e vagas.`, corpo: listagem(v), ativo: 'comprar' }));
  for (const i of IMOVEIS) {
    grava(`${v}/imovel/${i.slug}/index.html`, pagina(v, { rota: `imovel/${i.slug}/`, titulo: `${i.titulo}, ${i.bairro}`, desc: `${TIPOS[i.tipo]} ${i.fin === 'venda' ? 'à venda' : 'para alugar'} em ${i.bairro}, Porto Alegre: ${i.area} m², ${i.dorm} dormitórios, ${i.vagas} vagas. ${i.fin === 'venda' ? brl(i.preco) : brl(i.preco) + ' por mês'}.`, corpo: detalhe(v, i), ativo: i.fin === 'venda' ? 'comprar' : 'alugar', og: `${MARCA.url.replace(/\/$/, '')}${img(i.fotos[0], true)}` }));
  }
  grava(`${v}/anunciar/index.html`, pagina(v, { rota: 'anunciar/', titulo: 'Anunciar imóvel', desc: 'Venda ou alugue seu imóvel em Porto Alegre com avaliação gratuita, fotos profissionais e visitas acompanhadas.', corpo: anunciar(v), ativo: 'anunciar', sobreFoto: true }));
  grava(`${v}/sobre/index.html`, pagina(v, { rota: 'sobre/', titulo: 'A Quadra', desc: 'Imobiliária de bairro em Porto Alegre: poucos imóveis, muito bem cuidados.', corpo: sobre(v), ativo: 'sobre', sobreFoto: true }));
  grava(`${v}/contato/index.html`, pagina(v, { rota: 'contato/', titulo: 'Contato', desc: `Fale com a ${MARCA.nome} por WhatsApp, telefone ou e-mail.`, corpo: contato(v), ativo: 'contato' }));
  grava(`${v}/favoritos/index.html`, pagina(v, { rota: 'favoritos/', titulo: 'Favoritos', desc: 'Os imóveis que você salvou.', corpo: favoritos(v), ativo: '' }));
}

// Página de escolha (/) com o kit de apresentação, quando os prints existirem.
const prints = ['a-pc', 'a-cel', 'b-pc', 'b-cel'].every(p => fs.existsSync(path.join(pub, 'assets/apresentacao', p + '.webp')));
if (prints) {
  for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(raiz, 'componentes/apresentacao', f), path.join(pub, 'assets', f));
  const { paginaEscolha } = await import(path.join(raiz, 'componentes/apresentacao/escolha.mjs'));
  fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
    nome: MARCA.nome, url: MARCA.url, lang: 'pt', cor: '#e4572e', fundo: '#14171c', claro: '#f6f5f2',
    fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
    googleFonts: VERSOES.a.fontes, favicon: '', ogImagem: `${MARCA.url}assets/og-a.jpg`,
    versoes: [
      { letra: 'a', nome: 'Vitrine', paginas: 7, texto: 'Clara e direta, com a foto do imóvel ocupando a tela e a busca logo abaixo. Laranja só nos botões.', pontos: ['Busca por finalidade, tipo, bairro e dormitórios', 'Bairros em lista com prévia de foto', 'Linha do tempo da compra, do clique às chaves'] },
      { letra: 'b', nome: 'Bairro', paginas: 7, texto: 'Verde-escuro e acolhedora, com mosaico de fotos, categorias e carrossel de destaques.', pontos: ['Busca dentro do topo, ao lado do mosaico', 'Categorias com foto e contagem', 'Passo a passo em zigue-zague'] },
    ],
  }).replace(/<title>[^<]*<\/title>/, `<title>${MARCA.nome} · Site modelo de imobiliária</title>`));
}
console.log(`imobiliaria: ${IMOVEIS.length} imóveis, páginas em public/a e public/b${prints ? ' + escolha em public/index.html' : ' (sem prints: escolha não gerada)'}`);
