// Monta as páginas das versões A ("Tradição", fiel ao site atual: faixa azul, menu bordô, madeira, pasto e a linha de produtos)
// e B ("Reino", com o xadrez azul e vermelho do rótulo e o queijo do reino na frente).
// As páginas internas usam o mesmo conteúdo e a mesma marcação; a home, o topo e o rodapé mudam por versão.
// Estilos em public/assets/{base,a,b}.css.
import {
  empresa as E, resumo, historia, linhaTempo, laticinioIntro, medidas, mantiqueira, numeros, produtos, receitas, videos,
  representantes, galeria, galeriaProduto,
} from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, cls = '', extra = '') => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Tradição', b: 'Reino' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'quem-somos', nome: 'Quem Somos', caminho: 'quem-somos/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'galeria', nome: 'Galeria', caminho: 'galeria/' },
  { slug: 'receitas', nome: 'Receitas', caminho: 'receitas/' },
  { slug: 'blog', nome: 'Blog', caminho: 'blog/' },
  { slug: 'representantes', nome: 'Representantes', caminho: 'representantes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const link = (v, slug) => {
  const n = nav.find(x => x.slug === slug);
  if (n) return `/${v}/${n.caminho}`;
  const [tipo, s] = slug.split('/');
  return `/${v}/${tipo}/${s}/`;
};

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0112 0M16 5a3 3 0 010 6M21 20a6 6 0 00-4-5.6"/>',
  vaca: '<path d="M5 9c-1.5 0-2-1.5-2-2.5M19 9c1.5 0 2-1.5 2-2.5"/><path d="M6 8h12v6a4 4 0 01-4 4h-4a4 4 0 01-4-4z"/><circle cx="10" cy="15" r=".6"/><circle cx="14" cy="15" r=".6"/><path d="M9 11h.01M15 11h.01"/>',
  frasco: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M7 15h10"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/><path d="M9 15a3 3 0 003 3"/>',
  arvore: '<path d="M12 21v-6"/><path d="M12 15c-4 0-7-2.5-7-6a7 7 0 0114 0c0 3.5-3 6-7 6z"/><path d="M9 21h6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const telHref = t => `+55${t.replace(/\D/g, '')}`;
const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(E.mapa)}`;
const prod = s => produtos.find(p => p.slug === s);

// ---------- moldura ----------
function head(v, caminho, titulo, descricao, ogImg) {
  const url = `${E.url}${caminho.slice(1)}`;
  const fonte = v === 'a' ? 'Open+Sans:wght@400;600;700' : 'Inter:wght@400;500;600';
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
<meta property="og:site_name" content="Queijos Millano">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/${ogImg || `og-${v}.jpg`}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#009de0' : '#0b3a5c'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500;700;800;900&family=${fonte}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

function menu(v, slug) {
  const atual = slug.split('/')[0];
  return nav.filter(n => n.slug !== 'index').map(n => {
    const ativo = atual === n.slug;
    const attr = ativo ? ' class="ativo" aria-current="page"' : '';
    if (n.slug === 'produtos') {
      return `<li class="tem-sub"><a href="${link(v, 'produtos')}"${attr}>Produtos</a><button class="sub-btn" aria-expanded="false" aria-label="Ver produtos"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
        <ul class="sub">${produtos.map(p => `<li><a href="${link(v, `produtos/${p.slug}`)}">${p.nome}</a></li>`).join('')}</ul></li>`;
    }
    if (n.slug === 'contato') return `<li><a class="nav-cta${ativo ? ' ativo' : ''}" href="${link(v, n.slug)}"${ativo ? ' aria-current="page"' : ''}>${n.nome}</a></li>`;
    return `<li><a href="${link(v, n.slug)}"${attr}>${n.nome}</a></li>`;
  }).join('');
}

function topo(v, slug) {
  const barra = v === 'a'
    ? `<div class="barra"><div class="in">
  <span class="barra-tel">${E.telefones.map(t => `<a href="tel:${telHref(t)}">${ic('tel')}${t}</a>`).join('')}</span>
  <span class="barra-dir"><a class="barra-rep" href="${link(v, 'representantes')}">Solicite um representante</a><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('fb')}</a><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('ig')}</a></span>
</div></div>`
    : '<div class="xadrez xadrez-topo" aria-hidden="true"></div>';
  return `${barra}
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Queijos Millano, página inicial"><img src="/assets/img/logo.webp" alt="Millano, Indústria Brasileira" width="418" height="418">${v === 'b' ? '<span class="marca-txt"><strong>Millano</strong><small>Laticínios Nosso · desde 1992</small></span>' : ''}</a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  <nav id="menu" aria-label="Principal"><ul>${menu(v, slug)}</ul></nav>
</div></header>
<main id="conteudo">
`;
}

function rodape(v) {
  return `</main>
<footer class="rodape">
  ${v === 'b' ? '<div class="xadrez" aria-hidden="true"></div>' : ''}
  <div class="in rod-grade">
    <div class="rod-marca">
      <img src="/assets/img/logo.webp" alt="Millano" width="418" height="418" loading="lazy">
      <p>${E.razao}<br>Fabricante das marcas ${E.marcas.slice(0, -1).join(', ')} e ${E.marcas.at(-1)}.</p>
    </div>
    <div>
      <h3>Entre em contato</h3>
      <ul class="rod-lista rod-ic">
        <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
        ${E.telefones.map(t => `<li>${ic('tel')}<a href="tel:${telHref(t)}">${t}</a></li>`).join('')}
        <li>${ic('pin')}<a href="${mapaUrl}" target="_blank" rel="noopener">${E.endereco}, ${E.cidade}</a></li>
      </ul>
    </div>
    <div>
      <h3>Navegue</h3>
      <ul class="rod-lista rod-cols">${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>Redes sociais</h3>
      <p class="rod-redes"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('fb')}</a><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('ig')}</a></p>
      <a class="rod-rep" href="${link(v, 'representantes')}">Seja um representante ${ic('seta')}</a>
    </div>
  </div>
  <div class="in rod-base"><span>© ${new Date().getFullYear()} ${E.razao} · Antônio Carlos, Minas Gerais</span><span>Serra da Mantiqueira, desde 1992.</span></div>
</footer>
<dialog class="lightbox" aria-label="Foto ampliada"><button class="lb-fechar" aria-label="Fechar">${ic('fechar')}</button><img alt=""></dialog>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const pagina = (v, slug, titulo, desc, corpo, og) => head(v, link(v, slug), titulo, desc, og) + topo(v, slug) + corpo.replaceAll('/__v__/', `/${v}/`) + rodape(v);

// Topo das páginas internas: A com foto e madeira, B com faixa azul e xadrez (o CSS decide).
const capa = (eyebrow, titulo, sub, f) => `<section class="capa">
  ${f ? img(f, '', 'capa-foto', ' fetchpriority="high"').replace(' loading="lazy"', '') : ''}
  <div class="in capa-txt">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${titulo}</h1>
    ${sub ? `<p class="lead">${sub}</p>` : ''}
  </div>
</section>`;

// ---------- blocos ----------
const btn = (href, txt, cls = 'btn-prim') => `<a class="btn ${cls}" href="${href}">${txt} ${ic('seta')}</a>`;

const blocoNumeros = () => `<dl class="numeros">${numeros.map(n => `<div><dt>${n.valor}</dt><dd>${n.rotulo}</dd></div>`).join('')}</dl>`;

const blocoMedidas = () => `<ol class="medidas">${medidas.map((m, i) => `<li><span class="med-ic">${ic(m.ic)}</span><span class="med-n">0${i + 1}</span><h3>${m.titulo}</h3><p>${m.texto}</p></li>`).join('')}</ol>`;

const blocoLinhaTempo = () => `<ol class="linha-tempo">${linhaTempo.map(h => `<li><span class="lt-marca">${h.marca}</span><h3>${h.titulo}</h3><p>${h.texto}</p></li>`).join('')}</ol>`;

const blocoProdutosZigue = () => `<div class="zigue">${produtos.map((p, i) => `<article class="zig${i % 2 ? ' inv' : ''}">
  <a class="zig-foto" href="/__v__/produtos/${p.slug}/" tabindex="-1" aria-hidden="true">${img(`p-${p.slug}`, '', '', ' width="650" height="414"')}</a>
  <div class="zig-txt"><h3><a href="/__v__/produtos/${p.slug}/">${p.nome}</a></h3><p>${p.resumo}</p>${btn(`/__v__/produtos/${p.slug}/`, 'Mais detalhes', 'btn-vinho')}</div>
</article>`).join('')}</div>`;

const blocoProdutosGrade = () => `<ul class="prod-grade">${produtos.map(p => `<li><a href="/__v__/produtos/${p.slug}/">
  <span class="pg-foto">${img(`p-${p.slug}`, p.nome, '', ' width="650" height="414"')}</span>
  <span class="pg-nome">${p.nome}</span><span class="pg-curto">${p.curto}</span>
</a></li>`).join('')}</ul>`;

// Linha de produtos recortada da foto do site atual, com os produtos clicáveis.
const pontos = [
  { s: 'queijo-minas-padrao', x: 9, y: 58 },
  { s: 'queijo-prato', x: 28.5, y: 70 },
  { s: 'queijo-parmesao', x: 53, y: 38 },
  { s: 'doce-de-leite', x: 72, y: 70 },
  { s: 'queijo-do-reino', x: 91.5, y: 66 },
];
const blocoPrateleira = () => `<div class="prateleira">
  <div class="prat-linha">
    ${img('linha-produtos', 'Produtos Millano: queijo minas padrão, manteiga, queijo prato, parmesão em cunha e em peça, doce de leite em lata, queijo reino na lata e na bola vermelha', 'prat-img', ' width="1600" height="417"')}
    ${pontos.map(p => `<a class="ponto${p.x > 80 ? ' dir' : p.x < 20 ? ' esq' : ''}" style="left:${p.x}%;top:${p.y}%" href="/__v__/produtos/${p.s}/"><span>${prod(p.s).nome}</span></a>`).join('')}
  </div>
  <div class="prat-tabua" aria-hidden="true"></div>
</div>`;

const blocoReceitas = (lista, cls = '') => `<ul class="rec-grade ${cls}">${lista.map(r => `<li><a href="/__v__/receitas/${r.slug}/">
  <span class="rec-foto">${img(`r-${r.slug}`, r.nome, '', ' width="650" height="414"')}</span>
  <span class="rec-nome">${r.nome}</span>
  ${r.tempo || r.porcoes ? `<span class="rec-meta">${r.tempo ? `${ic('relogio')}${r.tempo}` : ''}${r.porcoes ? `${ic('pessoas')}${r.porcoes} ${r.porcoes === '1' ? 'porção' : 'porções'}` : ''}</span>` : ''}
</a></li>`).join('')}</ul>`;

const blocoVideos = () => `<ul class="videos">${videos.map(x => `<li>
  <button class="video" data-id="${x.id}" aria-label="Assistir: ${esc(x.titulo)}">${img(`v-${x.id}`, '', '', ' width="480" height="270"')}<span class="play">${ic('play')}</span></button>
  <h3>${x.titulo}</h3>
</li>`).join('')}</ul>`;

const blocoGaleria = (lista) => `<div class="galeria">${lista.map((f, i) => `<a class="gal-item" href="/assets/img/${f}.webp">${img(f, `Produtos Millano, foto ${i + 1}`)}</a>`).join('')}</div>`;

const blocoRepCta = () => `<section class="rep-cta"><div class="in rep-cta-grade">
  <div>
    <p class="eyebrow">Onde encontrar</p>
    <h2>Representantes em ${representantes.length} estados</h2>
    <p>Do Pará a São Paulo, os queijos Millano chegam aos supermercados, padarias e distribuidores pelos nossos representantes. O Nordeste é o nosso maior mercado.</p>
    <div class="botoes">${btn('/__v__/representantes/', 'Solicite um representante')}${btn('/__v__/representantes/#seja', 'Seja um representante', 'btn-sec')}</div>
  </div>
  <ul class="ufs">${representantes.map(r => `<li><a href="/__v__/representantes/#${r.uf.toLowerCase()}" title="${r.estado}">${r.uf}</a></li>`).join('')}</ul>
</div></section>`;

// ---------- HOME A: Tradição (mesma ordem do site atual) ----------
function homeA() {
  return `<section class="hero-a">
  <div class="hero-ceu">
    <div class="in hero-a-txt">
      <p class="eyebrow">Antônio Carlos · Serra da Mantiqueira · desde 1992</p>
      <h1>O maior produtor de queijo tipo reino do Brasil</h1>
      <p class="lead">Queijo do reino, parmesão, minas padrão, prato, caccio cavalo e doce de leite, feitos em um dos pontos mais altos da Serra da Mantiqueira.</p>
      <div class="botoes">${btn('/__v__/produtos/', 'Conheça os produtos')}${btn('/__v__/representantes/', 'Solicite um representante', 'btn-sec')}</div>
    </div>
    <svg class="morro" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150C260 60 520 40 820 70s460 40 620 10V220H0z" fill="#0f8050"/><path d="M0 190c300-60 700-80 1440-40V220H0z" fill="#0b6b42"/></svg>
  </div>
  <div class="hero-mesa">${blocoPrateleira()}</div>
</section>

<section class="quem-a"><div class="in quem-grade">
  <h2 class="vertical" aria-label="Quem somos"><span>Quem</span><span>Somos</span></h2>
  <div class="quem-txt">
    <p class="quem-lead">${resumo}</p>
    <p>${mantiqueira}</p>
    ${btn('/__v__/quem-somos/', 'Conheça a nossa história', 'btn-vinho')}
  </div>
  <figure class="quem-foto">${img('mesa', 'Café da manhã com queijo do reino, manteiga e queijo prato Millano', '', ' width="1800" height="686"')}</figure>
</div></section>

<section class="ouro">${'<div class="in">' + blocoNumeros() + '</div>'}</section>

<section class="sec produtos-a"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Nossos produtos</p><h2>Queijos finos da Serra da Mantiqueira</h2></div>
  ${blocoProdutosZigue()}
</div></section>

<section class="sec receitas-a"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Receitas</p><h2>Para fazer com Millano</h2></div>${btn('/__v__/receitas/', 'Todas as receitas', 'btn-vinho')}</div>
  ${blocoReceitas([receitas[0], receitas[3], receitas[1]], 'rec-destaque')}
</div></section>

<section class="sec blog-a"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Blog</p><h2>Últimas do blog</h2></div>
  ${blocoVideos()}
</div></section>

${blocoRepCta()}`;
}

// ---------- HOME B: Reino ----------
function homeB() {
  return `<section class="hero-b">
  ${img('p-queijo-do-reino-faixa', 'Queijo do reino Millano na bola vermelha e na lata, com uma fatia cortada', 'hero-b-foto', ' width="1800" height="517" fetchpriority="high"').replace(' loading="lazy"', '')}
  <div class="in hero-b-txt">
    <p class="eyebrow">Laticínios Nosso · Antônio Carlos, MG</p>
    <h1>O queijo do reino que o Brasil mais compra</h1>
    <p class="lead">Desde 1992 na Serra da Mantiqueira. Somos o maior produtor de queijo tipo reino do país, premiado no Concurso Nacional de Produtos Lácteos da EPAMIG.</p>
    <div class="botoes">${btn('/__v__/produtos/queijo-do-reino/', 'Conheça o queijo do reino')}${btn('/__v__/representantes/', 'Onde comprar', 'btn-sec')}</div>
  </div>
</section>
<div class="xadrez" aria-hidden="true"></div>

<section class="sec linha-b"><div class="in">
  <div class="sec-tit centro"><p class="eyebrow">A linha Millano</p><h2>Do reino ao doce de leite</h2><p>Toque em um produto para ver fotos e detalhes.</p></div>
</div>
  ${blocoPrateleira()}
  <div class="in"><ul class="chips-prod">${produtos.map(p => `<li><a href="/__v__/produtos/${p.slug}/">${p.nome}</a></li>`).join('')}</ul></div>
</section>

<section class="sec processo-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Do leite ao queijo</p><h2>Qualidade em cada etapa</h2><p>${laticinioIntro.replace(/:$/, '.')}</p></div>
  ${blocoMedidas()}
</div></section>

<section class="sec historia-b"><div class="in hist-grade">
  <figure class="hist-foto">${img('linha', 'Manteiga, queijo minas, queijo prato, caccio cavalo e queijo do reino Millano sobre a mesa de madeira', '', ' width="1800" height="686"')}</figure>
  <div>
    <p class="eyebrow">Nossa história</p>
    <h2>Começou numa pequena casa na zona rural de Antônio Carlos</h2>
    ${blocoLinhaTempo()}
    ${btn('/__v__/quem-somos/', 'Quem somos', 'btn-azul')}
  </div>
</div></section>

<section class="faixa-numeros"><div class="in">${blocoNumeros()}</div></section>

<section class="sec receitas-b"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Receitas</p><h2>Na cozinha com Millano</h2></div>${btn('/__v__/receitas/', 'Ver as 10 receitas', 'btn-azul')}</div>
</div>
  <div class="trilho">${blocoReceitas(receitas.slice(0, 6), 'rec-trilho')}</div>
</section>

<section class="sec tv-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Na TV</p><h2>O queijo do reino Millano no Globo Rural e no Trilhas do Sabor</h2></div>
  ${blocoVideos()}
</div></section>

${blocoRepCta()}`;
}

// ---------- páginas internas ----------
function quemSomos() {
  return `${capa('Quem somos', 'A história', 'Uma empresa familiar que começou artesanal e se tornou o maior produtor de queijo tipo reino do Brasil.', 'mesa')}
<section class="sec"><div class="in hist-texto">
  <div class="hist-col">${historia.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="hist-lado">${blocoLinhaTempo()}</aside>
</div></section>
<section class="sec laticinio"><div class="in">
  <div class="sec-tit"><p class="eyebrow">O laticínio</p><h2>Tecnologia e segurança alimentar sem perder o sabor</h2><p>${laticinioIntro}</p></div>
  ${blocoMedidas()}
</div></section>
<section class="mantiqueira">
  ${img('linha', 'Produtos Millano sobre a mesa de madeira', 'mant-foto', ' width="1800" height="686"')}
  <div class="in"><blockquote><p>${mantiqueira}</p></blockquote></div>
</section>
<section class="sec"><div class="in">${blocoNumeros()}</div></section>
<section class="sec marcas"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Nossas marcas</p><h2>Fabricante de ${E.marcas.join(', ').replace(/, ([^,]*)$/, ' e $1')}</h2><p>O queijo tipo reino do Laticínios Nosso chega ao mercado com as marcas Millano, Bambino, Palmyra e Borboleta.</p></div>
</div></section>`;
}

function produtosPag() {
  return `${capa('Produtos', 'Nossos produtos', 'Seis produtos feitos na Serra da Mantiqueira, com o queijo do reino como carro-chefe.', 'linha')}
<section class="sec"><div class="in">${blocoProdutosGrade()}</div></section>
<section class="sec prat-sec"><div class="in"><div class="sec-tit centro"><p class="eyebrow">A linha completa</p><h2>Todos juntos na mesa</h2></div></div>${blocoPrateleira()}</section>
${blocoRepCta()}`;
}

function produtoPag(p) {
  const n = galeriaProduto[p.slug];
  const recs = receitas.filter(r => r.queijo === p.slug);
  const outros = produtos.filter(x => x.slug !== p.slug);
  return `<section class="prod-capa">
  ${img(`p-${p.slug}-faixa`, p.nome, 'prod-faixa', ' fetchpriority="high"').replace(' loading="lazy"', '')}
</section>
<section class="sec prod-det"><div class="in prod-dados">
  <div class="prod-txt">
    <p class="eyebrow"><a href="/__v__/produtos/">Produtos</a> / ${p.nome}</p>
    <h1>${p.nome}</h1>
    <p class="prod-destaque">${p.destaque}</p>
    ${p.texto.map(t => `<p>${t}</p>`).join('')}
    <div class="botoes">${btn('/__v__/representantes/', 'Onde comprar')}${btn('/__v__/contato/', 'Fale conosco', 'btn-sec')}</div>
  </div>
  <figure class="prod-foto">${img(`p-${p.slug}`, p.nome, '', ' width="650" height="414"')}</figure>
</div></section>
<section class="sec prod-gal"><div class="in"><h2 class="tit-menor">Fotos</h2>${blocoGaleria(Array.from({ length: n }, (_, i) => `p-${p.slug}-${i + 1}`))}</div></section>
${recs.length ? `<section class="sec"><div class="in"><h2 class="tit-menor">Receita com ${p.nome.toLowerCase()}</h2>${blocoReceitas(recs)}</div></section>` : ''}
<section class="sec outros"><div class="in"><h2 class="tit-menor">Outros produtos</h2><ul class="outros-lista">${outros.map(o => `<li><a href="/__v__/produtos/${o.slug}/">${img(`p-${o.slug}`, '', '', ' width="650" height="414"')}<span>${o.nome}</span></a></li>`).join('')}</ul></div></section>`;
}

function receitasPag() {
  return `${capa('Receitas', 'Receitas com Millano', 'Dez receitas para fazer com os queijos Millano, da torta de queijo do reino à pizza.', 'torta-faixa')}
<section class="sec"><div class="in">${blocoReceitas(receitas)}</div></section>`;
}

function receitaPag(r) {
  const p = r.queijo && prod(r.queijo);
  return `<section class="sec rec-pag"><div class="in rec-grade-pag">
  <figure class="rec-pag-foto">${img(`r-${r.slug}`, r.nome, '', ' width="650" height="414" loading="eager"').replace(' loading="lazy"', '')}</figure>
  <div>
    <p class="eyebrow"><a href="/__v__/receitas/">Receitas</a></p>
    <h1>${r.nome}</h1>
    ${r.tempo || r.porcoes ? `<p class="rec-meta">${r.tempo ? `${ic('relogio')}Preparo: ${r.tempo}` : ''}${r.porcoes ? `${ic('pessoas')}${r.porcoes} ${r.porcoes === '1' ? 'porção' : 'porções'}` : ''}</p>` : ''}
    ${r.grupos.map(g => `<h2 class="tit-menor">${g.t}</h2><ul class="ingred">${g.i.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`).join('')}
  </div>
</div>
<div class="in"><h2 class="tit-menor">Modo de preparo</h2><ol class="preparo">${r.preparo.map(x => `<li>${x}</li>`).join('')}</ol>
${p ? `<a class="rec-prod" href="/__v__/produtos/${p.slug}/">${img(`p-${p.slug}`, '', '', ' width="650" height="414"')}<span>Feito com <strong>${p.nome} Millano</strong> ${ic('seta')}</span></a>` : ''}
</div></section>
<section class="sec outros"><div class="in"><h2 class="tit-menor">Mais receitas</h2>${blocoReceitas(receitas.filter(x => x.slug !== r.slug).slice(0, 3))}</div></section>`;
}

function galeriaPag() {
  return `${capa('Galeria', 'Galeria de fotos', 'Os produtos Millano à mesa: queijo do reino, prato, minas, parmesão, caccio cavalo, manteiga e doce de leite.', 'p-queijo-do-reino-faixa')}
<section class="sec"><div class="in">${blocoGaleria(galeria)}</div></section>`;
}

function blogPag() {
  return `${capa('Blog', 'O queijo do reino Millano na TV', 'Reportagens do Globo Rural e do programa Trilhas do Sabor sobre a produção do queijo do reino Millano.', 'p-queijo-do-reino-faixa')}
<section class="sec"><div class="in">${blocoVideos()}</div></section>`;
}

function representantesPag() {
  return `${capa('Representantes', 'Solicite um representante', `Escolha o seu estado e fale direto com o representante Millano mais perto de você. Atendemos ${representantes.length} estados.`, 'linha')}
<section class="sec"><div class="in">
  <nav class="uf-filtro" aria-label="Estados"><button class="ativo" data-uf="">Todos</button>${representantes.map(r => `<button data-uf="${r.uf.toLowerCase()}">${r.uf}</button>`).join('')}</nav>
  <ul class="reps">${representantes.map(r => `<li id="${r.uf.toLowerCase()}" data-uf="${r.uf.toLowerCase()}">
    <p class="rep-uf"><span>${r.uf}</span>${r.estado}</p>
    <h3>${r.empresa}</h3>
    <ul class="rep-cont">${r.contatos.map(([nome, t]) => `<li>${ic('tel')}<span>${nome ? `${nome}: ` : ''}<a href="tel:${telHref(t)}">${t}</a></span></li>`).join('')}${r.emails.map(m => `<li>${ic('mail')}<a href="mailto:${m}">${m}</a></li>`).join('')}</ul>
  </li>`).join('')}</ul>
</div></section>
<section class="sec seja" id="seja"><div class="in seja-grade">
  <div><p class="eyebrow">Seja um representante</p><h2>Quer representar a Millano na sua região?</h2><p>Tem interesse em ser um de nossos representantes? Envie-nos uma mensagem e entraremos em contato com você.</p></div>
  <form class="form" data-assunto="Quero ser representante Millano">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label>Nome da empresa<input name="Empresa" autocomplete="organization"></label>
    <label>Cidade<input name="Cidade" autocomplete="address-level2"></label>
    <label>Estado<input name="Estado" autocomplete="address-level1"></label>
    <label class="cheio">Mensagem<textarea name="Mensagem" rows="4"></textarea></label>
    <button class="btn btn-prim" type="submit">Enviar ${ic('seta')}</button>
  </form>
</div></section>`;
}

function contatoPag() {
  return `${capa('Contato', 'Fale com o Laticínios Nosso', 'Fabricante do queijo tipo reino das marcas Millano, Bambino, Palmyra e Borboleta, fundado em setembro de 1992 em Antônio Carlos, Minas Gerais.', 'mesa')}
<section class="sec"><div class="in contato-grade">
  <div class="contato-info">
    <h2>Onde estamos</h2>
    <ul class="rod-ic contato-lista">
      <li>${ic('pin')}<a href="${mapaUrl}" target="_blank" rel="noopener">${E.endereco}<br>${E.cidade}</a></li>
      ${E.telefones.map(t => `<li>${ic('tel')}<a href="tel:${telHref(t)}">${t}</a></li>`).join('')}
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('ig')}<a href="${E.instagram}" target="_blank" rel="noopener">@queijosmillano</a></li>
      <li>${ic('fb')}<a href="${E.facebook}" target="_blank" rel="noopener">facebook.com/queijosmillano</a></li>
    </ul>
    <p class="nota">Quer comprar para revender? Veja o <a href="/__v__/representantes/">representante do seu estado</a>.</p>
  </div>
  <form class="form" data-assunto="Contato pelo site Millano">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label>
    <label class="cheio">Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label class="cheio">Mensagem<textarea name="Mensagem" rows="5" required></textarea></label>
    <button class="btn btn-prim" type="submit">Enviar ${ic('seta')}</button>
  </form>
</div></section>
<section class="mapa"><iframe title="Mapa: Laticínios Nosso, Antônio Carlos (MG)" src="https://www.google.com/maps?q=${encodeURIComponent(E.mapa)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

export function gerarVersao(v) {
  const t = s => `${s} · Queijos Millano`;
  const P = {};
  P.index = pagina(v, 'index', 'Queijos Millano · Laticínios Nosso, maior produtor de queijo tipo reino do Brasil', 'Queijo do reino, parmesão, minas padrão, prato, caccio cavalo e doce de leite Millano, feitos desde 1992 em Antônio Carlos, na Serra da Mantiqueira (MG).', v === 'a' ? homeA() : homeB());
  P['quem-somos'] = pagina(v, 'quem-somos', t('Quem Somos'), 'A história do Laticínios Nosso, criado em 1992 por Moacir Lucas Vidal e Aparecida Moraes em Antônio Carlos (MG), e como fazemos os queijos Millano.', quemSomos());
  P.produtos = pagina(v, 'produtos', t('Produtos'), 'Queijo do reino, parmesão, minas padrão, caccio cavalo, prato e doce de leite Millano.', produtosPag());
  for (const p of produtos) P[`produtos/${p.slug}`] = pagina(v, `produtos/${p.slug}`, t(p.nome), p.resumo.slice(0, 155), produtoPag(p));
  P.receitas = pagina(v, 'receitas', t('Receitas'), 'Receitas com os queijos Millano: torta de queijo do reino, tomate recheado, risotos, pizza, bruschetta e mais.', receitasPag());
  for (const r of receitas) P[`receitas/${r.slug}`] = pagina(v, `receitas/${r.slug}`, t(r.nome), `Receita de ${r.nome.toLowerCase()} com queijo Millano: ingredientes e modo de preparo.`, receitaPag(r));
  P.galeria = pagina(v, 'galeria', t('Galeria'), 'Fotos dos produtos Millano: queijo do reino, prato, minas padrão, parmesão, caccio cavalo, manteiga e doce de leite.', galeriaPag());
  P.blog = pagina(v, 'blog', t('Blog'), 'Reportagens do Globo Rural e do Trilhas do Sabor sobre o queijo do reino Millano.', blogPag());
  P.representantes = pagina(v, 'representantes', t('Representantes'), 'Representantes Millano em 13 estados, de Pernambuco a São Paulo. Seja também um representante.', representantesPag());
  P.contato = pagina(v, 'contato', t('Contato'), 'Laticínios Nosso: Estrada da Borda, km 03, Antônio Carlos (MG). Telefones (32) 3330-1315 e (32) 3330-1364.', contatoPag());
  return P;
}
