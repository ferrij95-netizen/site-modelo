// Monta as páginas das versões A ("Campo", fiel ao site atual: verde-lima, faixa verde, creme e oliva) e B ("Cooperação", verde e amarelo do logo, 60 anos).
// As páginas internas usam o mesmo conteúdo; a home, o topo e o rodapé mudam por versão. Estilos em public/assets/{base,a,b}.css.
import {
  empresa as E, historia, identidade, numeros, pilares, servicos, unidades, unidadeTexto, linhaTempo, publicacoes, galeria60,
} from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, cls = '', extra = '') => `<img class="${cls}" src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, alt, cls = '') => `<figure class="foto ${cls}">${img(n, alt)}</figure>`;

export const nomesVersao = { a: 'Campo', b: 'Cooperação' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'a-coomat', nome: 'A Coomat', caminho: 'a-coomat/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'unidades', nome: 'Unidades', caminho: 'unidades/' },
  { slug: 'publicacoes', nome: 'Publicações', caminho: 'publicacoes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const link = (v, slug) => `/${v}/${nav.find(n => n.slug === slug).caminho}`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  predio: '<path d="M4 21V5l8-3 8 3v16"/><path d="M9 21v-5h6v5M8 8h2M14 8h2M8 12h2M14 12h2"/>',
  loja: '<path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6zM9 20v-5h6v5"/>',
  cesta: '<path d="M4 9h16l-2 11H6z"/><path d="M8 9l4-6 4 6M9 13v4M15 13v4M12 13v4"/>',
  silo: '<path d="M6 21V8a3 3 0 016 0v13M12 21V10a3 3 0 016 0v11"/><path d="M3 21h18"/>',
  folha: '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l7-7"/>',
  broto: '<path d="M12 21v-9"/><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-4 3-7 7-7 0 4-3 7-7 7z"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  maos: '<path d="M7 11l3-3 3 2 4-4 3 3-6 6a3 3 0 01-4 0l-3-3"/><path d="M3 13l4-2M14 17l-2 3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  aspas: '<path d="M10 7H6a2 2 0 00-2 2v4h5v5H4M20 7h-4a2 2 0 00-2 2v4h5v5h-5" />',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icPilar = { Qualidade: 'escudo', Assistência: 'maos', Insumo: 'broto' };
const mapa = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const telHref = t => `+55${t.replace(/\D/g, '')}`;

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
<meta property="og:site_name" content="Coomat">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#13a03a' : '#0b4a2a'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,600;0,700;0,800;1,700;1,800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

function topo(v, slug) {
  const itens = nav.map(n => n.slug === 'contato'
    ? `<li><a class="nav-cta${slug === n.slug ? ' ativo' : ''}" href="${link(v, n.slug)}"${slug === n.slug ? ' aria-current="page"' : ''}>${n.nome}</a></li>`
    : `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
  return `<div class="barra"><div class="in">
  <span>Toropi · Rio Grande do Sul · desde 1964</span>
  <span class="barra-dir"><a href="tel:${E.telefoneHref}">${ic('tel')}${E.telefone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Coomat, página inicial"><img src="/assets/logo.svg" alt="Coomat, Cooperativa Mista dos Agricultores de Toropi Ltda." width="1294" height="466"></a>
  <img class="coop-topo" src="/assets/somoscoop.webp" alt="Somos o cooperativismo no Brasil, SomosCoop" width="340" height="126">
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  <nav id="menu" aria-label="Principal"><ul>${itens}</ul></nav>
</div></header>
<main id="conteudo">
`;
}

function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-marcas">
    <img src="/assets/${v === 'a' ? 'logo' : 'logo-branco'}.svg" alt="Coomat" width="1294" height="466" class="rod-logo">
    <img src="/assets/somoscoop.webp" alt="Somos o cooperativismo no Brasil, SomosCoop" width="340" height="126" class="rod-coop">
  </div>
  <div class="in rod-grade">
    <div>
      <h3>Matriz</h3>
      <p>${E.razao}<br><a href="${mapa(unidades[0].mapa)}" target="_blank" rel="noopener">${unidades[0].endereco}</a><br><a href="tel:${E.telefoneHref}">${E.telefone}</a><br><a href="mailto:${E.email}">${E.email}</a></p>
    </div>
    <div>
      <h3>Filiais</h3>
      <ul class="rod-lista">${unidades.slice(1).map(u => `<li><a href="${link(v, 'unidades')}#${u.slug}">${u.nome} · ${u.subtitulo}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>Navegue</h3>
      <ul class="rod-lista">${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul>
    </div>
  </div>
  <div class="in rod-base"><span>© ${new Date().getFullYear()} COOMAT · Cooperativa Mista dos Agricultores de Toropi Ltda.</span><span>Fundada em 29 de abril de 1964.</span></div>
</footer>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const pagina = (v, slug, titulo, desc, corpo) => head(v, slug, titulo, desc) + topo(v, slug) + corpo + rodape(v);

// Topo das páginas internas
const capa = (eyebrow, titulo, sub, f) => `<section class="capa">
  ${img(f, '', 'capa-foto', ' fetchpriority="high"')}
  <div class="in capa-txt">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${titulo}</h1>
    ${sub ? `<p class="lead">${sub}</p>` : ''}
  </div>
</section>`;

// ---------- blocos ----------
const blocoNumeros = (cls = '') => `<div class="numeros ${cls}">${numeros.map(n => `<div class="num"><strong>${n.valor}</strong><span>${n.rotulo}</span></div>`).join('')}</div>`;

const blocoPilares = () => `<ul class="pilares">${pilares.map(p => `<li>${ic(icPilar[p.titulo], 'ic-pilar')}<h3>${p.titulo}</h3><p>${p.texto}</p></li>`).join('')}</ul>`;

const blocoLinhaTempo = () => `<ol class="linha-tempo">${linhaTempo.map(h => `<li><span class="lt-ano">${h.ano}</span><h3>${h.titulo}</h3><p>${h.texto}</p></li>`).join('')}</ol>`;

const blocoServicosLinhas = () => `<div class="serv-linhas">${servicos.map((s, i) => `<article class="serv-linha${i % 2 ? ' inv' : ''}" id="${s.slug}">
  ${foto(s.foto, s.titulo)}
  <div class="serv-txt"><span class="serv-n">0${i + 1}</span><h3>${s.titulo}</h3><p>${s.texto}</p><a class="link-seta" href="/__v__/contato/">Fale com a Coomat ${ic('seta')}</a></div>
</article>`).join('')}</div>`;

const blocoIdentidade = () => `<div class="identidade">
  <blockquote class="missao"><span class="aspas" aria-hidden="true">“</span><p class="eyebrow">Missão</p><p class="missao-txt">${identidade.missao}</p></blockquote>
  <dl class="vis-neg">
    <div><dt>Visão</dt><dd>${identidade.visao}</dd></div>
    <div><dt>Negócio</dt><dd>${identidade.negocio}</dd></div>
  </dl>
  <div class="principios"><h3>Princípios</h3><ol>${identidade.principios.map(p => `<li>${p}</li>`).join('')}</ol></div>
</div>`;

const blocoGaleria = () => `<div class="galeria">${galeria60.map(g => `<a class="gal-item${g.alto ? ' alto' : ''}" href="/assets/img/${g.f}.webp" target="_blank" rel="noopener">${img(g.f, g.alt)}</a>`).join('')}</div>`;

const blocoUnidades = () => `<ul class="unid-grade">${unidades.map(u => `<li id="${u.slug}">
  <span class="unid-ic">${ic(u.ic)}</span>
  <div>
    <p class="unid-nome">${u.nome}</p>
    <h3>${u.subtitulo}</h3>
    <p class="unid-desc">${unidadeTexto[u.slug]}</p>
    <ul class="unid-dados">
      <li>${ic('pin')}<a href="${mapa(u.mapa)}" target="_blank" rel="noopener">${u.endereco}</a></li>
      <li>${ic('tel')}<span>${u.telefones.map(t => `<a href="tel:${telHref(t)}">${t}</a>`).join(' e ')}</span></li>
      <li>${ic('mail')}<a href="mailto:${u.email}">${u.email}</a></li>
    </ul>
  </div>
</li>`).join('')}</ul>`;

const blocoEdital = (v, curto = false) => {
  const p = publicacoes[0];
  return `<article class="edital">
  <a class="edital-img" href="/assets/img/${p.img}.webp" target="_blank" rel="noopener" aria-label="Abrir o ${p.titulo} em tamanho grande">${img(p.img, `${p.titulo}, assinado pelo presidente`, '', ' width="1200" height="1284" loading="eager"').replace(' loading="lazy"', '')}</a>
  <div class="edital-txt">
    <p class="eyebrow">Publicação · ${p.data}</p>
    <h3>${p.titulo}</h3>
    <p>${curto ? 'Convocação da Assembleia Geral Extraordinária de 31 de outubro de 2024, no Casarão da COOMAT.' : p.resumo}</p>
    ${curto ? '' : `<p class="pauta-tit">Ordem do dia</p><ol class="pauta">${p.pauta.map(x => `<li>${x}</li>`).join('')}</ol><p class="nota">${p.obs}</p><p class="assina">${p.assinatura}</p>`}
    <a class="link-seta" href="${curto ? link(v, 'publicacoes') : `/assets/img/${p.img}.webp`}"${curto ? '' : ' target="_blank" rel="noopener"'}>${curto ? 'Ver publicações' : 'Abrir o edital'} ${ic('seta')}</a>
  </div>
</article>`;
};

const blocoContatoFaixa = v => `<section class="faixa-contato"><div class="in fc-grade">
  <div>
    <h2>Entre em contato conosco e obtenha o melhor com a COOMAT</h2>
    <p>Matriz em Toropi e filial em São Pedro do Sul. Fale com a unidade certa por telefone ou e-mail.</p>
  </div>
  <div class="botoes"><a class="btn btn-prim" href="tel:${E.telefoneHref}">${ic('tel')}${E.telefone}</a><a class="btn btn-sec" href="${link(v, 'contato')}">Contato ${ic('seta')}</a></div>
</div></section>`;

const fixV = (v, html) => html.replaceAll('/__v__/', `/${v}/`);

// ---------- HOME A: Campo (mesma ordem do site atual) ----------
function homeA() {
  const v = 'a';
  return pagina(v, 'index', 'COOMAT · Cooperativa Mista dos Agricultores de Toropi', 'Desde 1964 a COOMAT une os agricultores de Toropi (RS): insumos, assistência, grãos, mercado, agroveterinária e fábrica de rações.', fixV(v, `
<section class="hero-a">
  ${img('campo-verde', '', 'hero-foto', ' fetchpriority="high"')}
  <div class="in hero-a-grade">
    <div class="hero-a-txt">
      <p class="eyebrow">Toropi · RS · desde 1964</p>
      <h1>Cooperativa Mista dos Agricultores de Toropi</h1>
      <p class="lead">${historia.fundacao}</p>
      <div class="botoes"><a class="btn btn-prim" href="${link(v, 'servicos')}">Nossos serviços ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'a-coomat')}">A Coomat</a></div>
    </div>
    <figure class="hero-a-moldura">${img('real-60anos-retrato-1', 'Associado com a moldura dos 60 anos da Coomat')}<figcaption>60 anos da COOMAT, abril de 2024</figcaption></figure>
  </div>
</section>

<section class="faixa-verde"><div class="in">${blocoPilares()}</div></section>

<section class="sec sec-creme" id="solucoes"><div class="in solucoes">
  <div class="sol-txt">
    <p class="eyebrow">Serviços</p>
    <h2>Soluções para o produtor rural é na COOMAT</h2>
    <p>${historia.motivos}</p>
    <ul class="sol-lista">${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.slug}"><strong>${s.titulo}</strong><span>${s.texto}</span>${ic('seta', 'ic-seta')}</a></li>`).join('')}</ul>
  </div>
  <figure class="sol-foto">${img('mao-milho', 'Mão do agricultor na lavoura de milho')}</figure>
</div></section>

<section class="faixa-oliva"><div class="in">${blocoNumeros()}</div></section>

<section class="sec sec-branca" id="voce-sabia"><div class="in sabia">
  <div class="sabia-txt">
    <h2 class="selo-tit">Você sabia?</h2>
    <p class="sabia-grande">A COOMAT começou vendendo os produtos coloniais das comunidades de Toropi.</p>
    <p>${historia.crescimento}</p>
    <a class="link-seta" href="${link(v, 'a-coomat')}">Nossa história ${ic('seta')}</a>
  </div>
  <div class="mosaico">
    ${foto('milho-trigo', 'Lavoura de milho ao lado de trigo')}
    ${foto('trator', 'Trator no campo')}
    ${foto('pastagem', 'Campos e pastagens vistos de cima')}
    ${foto('sulcos', 'Solo preparado para o plantio')}
  </div>
</div></section>

<section class="sec sec-creme" id="sessenta"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">29 de abril de 2024</p><h2>60 anos de COOMAT</h2></div><p>Associados, conselho e colaboradores na festa dos 60 anos da cooperativa, em Toropi.</p></div>
  ${blocoGaleria()}
</div></section>

<section class="faixa-marcas">
  ${img('campo-solo', '', 'fm-foto')}
  <div class="in fm-txt">
    <h2>Trabalhamos com as melhores marcas do mercado agrícola</h2>
    <p>Garantia de qualidade</p>
    <a class="btn btn-prim" href="${link(v, 'servicos')}">Serviços ${ic('seta')}</a>
  </div>
</section>

<section class="sec sec-branca"><div class="in edital-home">
  ${blocoEdital(v, true)}
</div></section>

<section class="sec sec-creme" id="unidades"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">Matriz e filiais</p><h2>Onde encontrar a COOMAT</h2></div><p>Quatro unidades em Toropi, na Rua 22 de Outubro, e uma filial em São Pedro do Sul.</p></div>
  ${blocoUnidades()}
</div></section>
`));
}

// ---------- HOME B: Cooperação ----------
function homeB() {
  const v = 'b';
  return pagina(v, 'index', 'COOMAT · 60 anos de cooperação em Toropi', 'Cooperativa Mista dos Agricultores de Toropi (RS), fundada em 1964 por 62 agricultores: 4.408 associados, matriz e quatro filiais.', fixV(v, `
<section class="hero-b"><div class="in hero-b-grade">
  <div class="hero-b-txt">
    <p class="eyebrow">Cooperativa Mista dos Agricultores de Toropi Ltda.</p>
    <h1>Cooperação e desenvolvimento no campo desde 1964.</h1>
    <p class="lead">${historia.motivos}</p>
    <div class="botoes"><a class="btn btn-prim" href="${link(v, 'servicos')}">O que fazemos ${ic('seta')}</a><a class="btn btn-sec" href="${link(v, 'unidades')}">Unidades</a></div>
  </div>
  <div class="hero-b-midia">
    ${foto('real-60anos-painel', 'Painel dos 60 anos da Coomat', 'hero-b-foto')}
    <div class="selo-60"><strong>60</strong><span>anos<br>1964 · 2024</span></div>
  </div>
</div></section>

<section class="faixa-num"><div class="in">${blocoNumeros()}</div></section>

<section class="sec" id="historia"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">Nossa história</p><h2>De 62 agricultores a 4.408 associados</h2></div><p>${historia.crescimento}</p></div>
  ${blocoLinhaTempo()}
</div></section>

<section class="sec sec-campo" id="servicos">
  ${img('campo-aereo', '', 'campo-fundo')}
  <div class="in">
    <div class="cab-linha"><div><p class="eyebrow">Serviços</p><h2>As melhores soluções são na COOMAT</h2></div><p>Trabalhamos com as melhores marcas do mercado agrícola, com garantia de qualidade.</p></div>
    ${blocoPilares()}
  </div>
</section>

<section class="sec" id="areas"><div class="in">
  ${blocoServicosLinhas()}
</div></section>

<section class="sec sec-verde" id="identidade"><div class="in">
  <p class="eyebrow">Quem somos</p>
  <h2>Ser referência em qualidade e competitividade</h2>
  ${blocoIdentidade()}
</div></section>

<section class="sec" id="unidades"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">Matriz e filiais</p><h2>Cinco unidades, duas cidades</h2></div><p>Toropi concentra a matriz, o mercado, a agroveterinária e a fábrica de rações. A filial 02 atende São Pedro do Sul.</p></div>
  <div class="cidades">
    <div class="cidade"><h3>${ic('pin')}Toropi</h3><p class="cid-end">Rua 22 de Outubro, 417</p><ul>${unidades.filter(u => u.slug !== 'sao-pedro').map(u => `<li><a href="${link(v, 'unidades')}#${u.slug}">${ic(u.ic)}<span><strong>${u.subtitulo}</strong><small>${u.nome}</small></span></a></li>`).join('')}</ul>
    ${foto('real-60anos-equipe', 'Equipe da Coomat na matriz, em Toropi', 'cid-foto')}</div>
    <div class="cidade"><h3>${ic('pin')}São Pedro do Sul</h3><p class="cid-end">Rua José Bonifácio, 216</p><ul>${unidades.filter(u => u.slug === 'sao-pedro').map(u => `<li><a href="${link(v, 'unidades')}#${u.slug}">${ic(u.ic)}<span><strong>Filial São Pedro do Sul</strong><small>${u.nome}</small></span></a></li>`).join('')}</ul>
    ${foto('trigo-colheita', 'Colheita de trigo', 'cid-foto')}</div>
  </div>
</div></section>

<section class="sec sec-papel" id="sessenta"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">29 de abril de 2024</p><h2>A festa dos 60 anos</h2></div><p>Associados, conselho e colaboradores comemoraram os 60 anos da cooperativa em Toropi.</p></div>
  ${blocoGaleria()}
</div></section>

<section class="sec"><div class="in">
  ${blocoEdital(v, true)}
</div></section>

${blocoContatoFaixa(v)}
`));
}

// ---------- páginas internas ----------
function sobrePag(v) {
  return pagina(v, 'a-coomat', 'A Coomat · Cooperativa Mista dos Agricultores de Toropi', 'História da COOMAT, fundada em 29 de abril de 1964 por 62 agricultores de Toropi (RS): visão, missão, princípios e os 60 anos.', fixV(v, `
${capa('A Coomat', 'Fundada por 62 agricultores em 1964', 'Cooperativa Mista dos Agricultores de Toropi Ltda.', 'campo-verde')}
<section class="sec"><div class="in dupla">
  <div class="texto">
    <h2>Nossa história</h2>
    <p>${historia.fundacao}</p>
    <p>${historia.motivos}</p>
    <p>${historia.crescimento}</p>
  </div>
  <figure class="foto-real">${img('real-60anos-diretoria', 'Grupo da Coomat em frente ao painel dos 60 anos')}<figcaption>Festa dos 60 anos, abril de 2024</figcaption></figure>
</div></section>
<section class="sec sec-papel"><div class="in">
  <p class="eyebrow">Linha do tempo</p>
  <h2>Dos produtos coloniais aos grãos e às filiais</h2>
  ${blocoLinhaTempo()}
</div></section>
<section class="sec"><div class="in">${blocoNumeros('numeros-claros')}</div></section>
<section class="sec sec-verde"><div class="in">
  <p class="eyebrow">Visão, negócio, missão e princípios</p>
  <h2>O que move a COOMAT</h2>
  ${blocoIdentidade()}
</div></section>
<section class="sec sec-papel" id="sessenta"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">29 de abril de 2024</p><h2>60 anos de COOMAT</h2></div><p>Fotos da festa dos 60 anos da cooperativa, em Toropi.</p></div>
  ${blocoGaleria()}
</div></section>
<section class="sec"><div class="in coop-faixa">
  <img src="/assets/somoscoop.webp" alt="Somos o cooperativismo no Brasil, SomosCoop" width="340" height="126">
  <p>A COOMAT faz parte do movimento <strong>SomosCoop</strong>, do cooperativismo brasileiro.</p>
</div></section>
`));
}

function servicosPag(v) {
  return pagina(v, 'servicos', 'Serviços · COOMAT', 'Sementes e adubo, defensivos, desenvolvimento e meio ambiente: as soluções da COOMAT para o produtor rural de Toropi e região.', fixV(v, `
${capa('Serviços', 'As melhores soluções são na COOMAT', 'Trabalhamos com as melhores marcas do mercado agrícola, com garantia de qualidade.', 'sulcos')}
<section class="sec"><div class="in">
  <p class="eyebrow">Nosso compromisso</p>
  <h2>O seu sucesso é o nosso sucesso</h2>
  <p class="lead-escuro largura-texto">Nosso compromisso com a satisfação dos associados é contínuo, da concepção à execução.</p>
  ${blocoPilares()}
</div></section>
<section class="sec sec-papel"><div class="in">
  ${blocoServicosLinhas()}
</div></section>
<section class="sec"><div class="in dupla">
  <div class="texto">
    <p class="eyebrow">Nas filiais</p>
    <h2>Mercado, agroveterinária e fábrica de rações</h2>
    <p>Além dos insumos para a lavoura, a COOMAT mantém em Toropi o mercado da cooperativa, a agroveterinária e a fábrica de rações, e atende São Pedro do Sul pela filial 02.</p>
    <a class="link-seta" href="${link(v, 'unidades')}">Ver unidades ${ic('seta')}</a>
  </div>
  ${foto('trigo-colheita', 'Colheita de trigo', 'foto-larga')}
</div></section>
${blocoContatoFaixa(v)}
`));
}

function unidadesPag(v) {
  return pagina(v, 'unidades', 'Unidades · COOMAT', 'Matriz e filiais da COOMAT em Toropi e São Pedro do Sul (RS): endereços, telefones e e-mails.', fixV(v, `
${capa('Unidades', 'Matriz e filiais', 'Quatro unidades em Toropi, na Rua 22 de Outubro, e uma em São Pedro do Sul.', 'campo-aereo')}
<section class="sec"><div class="in">
  ${blocoUnidades()}
</div></section>
<section class="sec sec-papel"><div class="in dupla">
  <div class="texto">
    <h2>Como chegar</h2>
    <p>A matriz, o mercado, a agroveterinária e a fábrica de rações ficam na Rua 22 de Outubro, 417, em Toropi. As assembleias acontecem no Casarão da COOMAT, na mesma rua, número 408.</p>
    <a class="btn btn-prim" href="${mapa(unidades[0].mapa)}" target="_blank" rel="noopener">${ic('pin')}Abrir no mapa</a>
  </div>
  <div class="mapa"><iframe title="Mapa da matriz da COOMAT em Toropi" src="https://www.google.com/maps?q=${encodeURIComponent(unidades[0].mapa)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>
`));
}

function publicacoesPag(v) {
  return pagina(v, 'publicacoes', 'Publicações · COOMAT', 'Editais e comunicados da COOMAT aos associados: Edital AGE/2024.', fixV(v, `
${capa('Publicações', 'Editais e comunicados aos associados', 'Convocações de assembleia e avisos da cooperativa.', 'pastagem')}
<section class="sec"><div class="in">
  ${blocoEdital(v)}
</div></section>
`));
}

function contatoPag(v) {
  const opcoes = unidades.map(u => `<option value="${u.email}">${u.nome} · ${u.subtitulo}</option>`).join('');
  return pagina(v, 'contato', 'Contato · COOMAT', 'Telefones, e-mails e endereços da COOMAT em Toropi e São Pedro do Sul (RS).', fixV(v, `
${capa('Contato', 'Fale com a COOMAT', 'Escolha a unidade e escreva sua mensagem, ou ligue direto.', 'milho-trigo')}
<section class="sec"><div class="in contato-grade">
  <form class="form" id="form-contato" action="mailto:${E.email}" method="post" enctype="text/plain">
    <h2>Envie sua mensagem</h2>
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label>
    <label>Unidade<select name="unidade">${opcoes}</select></label>
    <label>Assunto<select name="assunto"><option>Dúvida</option><option>Orçamento</option><option>Quero ser associado</option><option>Trabalhe conosco</option><option>Outro</option></select></label>
    <label class="larga">Mensagem<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn btn-prim" type="submit">Enviar ${ic('seta')}</button>
    <p class="nota pequena">A mensagem abre no seu programa de e-mail, já endereçada à unidade escolhida.</p>
  </form>
  <div class="contato-lado">
    <h2>Matriz</h2>
    <p class="end-grande">${unidades[0].endereco}</p>
    <p><a class="btn btn-sec" href="tel:${E.telefoneHref}">${ic('tel')}${E.telefone}</a></p>
    <p><a href="mailto:${E.email}">${E.email}</a></p>
    <h3>Filiais</h3>
    <ul class="filiais-lista">${unidades.slice(1).map(u => `<li><strong>${u.nome} · ${u.subtitulo}</strong><span>${u.telefones.map(t => `<a href="tel:${telHref(t)}">${t}</a>`).join(' e ')} · <a href="mailto:${u.email}">${u.email}</a></span></li>`).join('')}</ul>
  </div>
</div></section>
<section class="sec sec-papel"><div class="in">
  <div class="mapa mapa-larga"><iframe title="Mapa da matriz da COOMAT em Toropi" src="https://www.google.com/maps?q=${encodeURIComponent(unidades[0].mapa)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>
`));
}

export function gerarVersao(v) {
  return {
    index: v === 'a' ? homeA() : homeB(),
    'a-coomat': sobrePag(v),
    servicos: servicosPag(v),
    unidades: unidadesPag(v),
    publicacoes: publicacoesPag(v),
    contato: contatoPag(v),
  };
}
