// Monta as páginas das versões A ("Balcão": loja de rua, branca, com a curva vermelha e cinza do cabeçalho atual e as fotos no pano vermelho)
// e B ("Atacado": catálogo como ferramenta de compra, faixa cinza do quadrado do logo, departamentos na lateral como no site atual, lista em linhas).
// Estilos em public/assets/{base,a,b}.css; comportamento em public/assets/site.js.
import { empresa as E, textos as T, deps, produtos, destaques, negocios } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const nomesVersao = { a: 'Balcão', b: 'Atacado' };

const depPorSlug = Object.fromEntries(deps.map(d => [d.slug, d]));
const prodPorSlug = Object.fromEntries(produtos.map(p => [p.slug, p]));
const subNome = p => depPorSlug[p.dep].subs.find(s => s.slug === p.sub)?.nome || depPorSlug[p.dep].nome;
const total = produtos.length;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  grade: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
  linhas: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  sacola: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
  loja: '<path d="M4 10l1.5-5h13L20 10M4 10v10h16V10M4 10h16"/><path d="M10 20v-5h4v5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Casa dos Plásticos e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;

const foto = (p, tam = 't', extra = '') => {
  const f = p.fotos[0];
  if (!f) return `<span class="sem-foto">${esc(p.nome)}</span>`;
  const r = f.w / f.h;
  const w = tam === 't' ? Math.round(Math.min(420, 420 * r)) : f.w, h = tam === 't' ? Math.round(Math.min(420, 420 / r)) : f.h;
  return `<img src="/assets/img/${tam}/${f.f}.webp" alt="${esc(p.nome)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
};
const fundo = p => p.fotos[0]?.fundo || '#eeeeec';
const add = (p, rotulo = 'Adicionar') => `<button class="add" type="button" data-item="${esc(p.nome)}" data-slug="${p.slug}">${ic('mais')}${ic('ok', 'ic ic-ok')}<span class="t1">${rotulo}</span><span class="t2">Na lista</span></button>`;
const resumo = p => p.desc.filter(l => !/:$/.test(l)).slice(0, 2).join(' · ') || (p.desc[0] || '').replace(/:$/, '');
const buscaTxt = p => esc(semAcento([p.nome, subNome(p), depPorSlug[p.dep].nome, ...p.desc].join(' ')));

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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#E31B23' : '#5f5f5f'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,500..900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const nav = v => [
  ['index', 'Início', ''],
  ['produtos', 'Produtos', 'produtos/'],
  ['loja', v === 'a' ? 'A loja' : 'Horários e endereço', 'loja/'],
  ['contato', 'Contato', 'contato/'],
];
const menu = (v, atual) => nav(v).map(([s, n, c]) => `<a href="/${v}/${c}"${s === atual ? ' aria-current="page"' : ''}>${n}</a>`).join('');
const listaBtn = () => `<button class="btn-lista" type="button" data-abre-lista>${ic('lista')}<span>Minha lista</span><b class="lista-n" hidden>0</b></button>`;
const buscaForm = (v, cls = 'busca-topo', ph = 'Buscar entre os produtos: copo, bipack, isopor…') => `<form class="${cls}" action="/${v}/produtos/" role="search">
  <label class="sr" for="q-${cls}">Buscar produto</label>
  <input id="q-${cls}" name="q" type="search" placeholder="${ph}" autocomplete="off">
  <button type="submit" aria-label="Buscar">${ic('busca')}</button>
</form>`;
const depsNav = (v, atual) => deps.map(d => `<a href="/${v}/produtos/${d.slug}/"${d.slug === atual ? ' aria-current="page"' : ''}>${d.nome}</a>`).join('');

function topo(v, atual, depAtual) {
  const marca = `<a class="marca" href="/${v}/" aria-label="Casa dos Plásticos Embalagens, página inicial"><img src="/assets/logo.webp" alt="Casa dos Plásticos Embalagens" width="290" height="203"></a>`;
  if (v === 'a') return `<div class="faixa"><div class="in">
  <span>${ic('relogio')} Seg. a sex. 8h–18h · sáb. 8h–13h</span>
  <a class="so-pc" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} ${E.rua}, Centro, Curitiba</a>
  <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <a href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.whats}</a>
</div></div>
<header class="topo"><div class="in">
  ${marca}
  ${buscaForm(v)}
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${listaBtn()}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div>
<nav class="deps-linha" aria-label="Departamentos"><div class="in">${depsNav(v, depAtual)}</div></nav>
<svg class="curva" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40V22C380 0 760 4 1440 26V40z" fill="#9b9b9b"/><path d="M0 40V30C420 8 820 12 1440 34V40z" fill="#E31B23"/></svg>
</header>`;
  return `<header class="topo"><div class="in">
  ${marca}
  ${buscaForm(v)}
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${listaBtn()}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>
<div class="faixa"><div class="in">
  <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <a href="tel:${E.fone2Href}" class="so-pc">${E.fone2}</a>
  <a href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} WhatsApp ${E.whats}</a>
  <span class="so-pc">${ic('relogio')} Seg. a sex. 8h–18h · sáb. 8h–13h</span>
</div></div>`;
}

function gaveta(v) {
  return `<dialog class="gaveta" data-gaveta aria-labelledby="gaveta-t">
  <div class="gaveta-cab"><h2 id="gaveta-t">${ic('lista')} Minha lista</h2><button type="button" data-fecha aria-label="Fechar">${ic('x')}</button></div>
  <p class="gaveta-vazia" data-vazia>Sua lista está vazia. Toque em <b>Adicionar</b> nos produtos para montar o pedido de orçamento.</p>
  <div data-lista-itens></div>
  <div class="gaveta-pe" data-cheia hidden>
    <a class="btn btn-wa" data-envia-wa href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Enviar pelo WhatsApp</a>
    <a class="btn btn-sec" href="/${v}/contato/#pedido">Enviar por e-mail</a>
    <p>A loja responde com preço e disponibilidade. Os preços não ficam no site.</p>
  </div>
</dialog>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo.webp" alt="Casa dos Plásticos Embalagens" width="290" height="203" loading="lazy"><p>Embalagens, descartáveis, isopor, vidros e limpeza no Centro de Curitiba.</p></div>
  <div><h3>Loja</h3><p>${E.rua}<br>${E.bairro}<br>${E.cidade}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Horários</h3><p>${E.horarios.map(([d, h]) => `${d}: ${h}`).join('<br>')}</p></div>
  <div><h3>Fale com a gente</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="tel:${E.fone2Href}">${E.fone2}</a><br><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${E.whats}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <nav class="rod-deps" aria-label="Departamentos no rodapé"><h3>Departamentos</h3>${depsNav(v)}</nav>
</div><p class="rod-fim">© Casa dos Plásticos Embalagens · Curitiba, PR</p></footer>
<a class="wa-flut" href="${waLink()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${ic('wa')}</a>
${gaveta(v)}`;
}

const pagina = (v, caminho, atual, titulo, descricao, corpo, depAtual = '') => `${head(v, caminho, titulo, descricao)}
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, atual, depAtual)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- peças comuns ----------
const item = (v, p) => `<article class="pr" data-dep="${p.dep}" data-sub="${p.sub}" data-busca="${buscaTxt(p)}">
  <a class="pr-foto" href="/${v}/produto/${p.slug}/" style="--fundo:${fundo(p)}" tabindex="-1" aria-hidden="true">${foto(p)}</a>
  <div class="pr-txt"><span class="pr-cat">${esc(subNome(p))}</span><h3><a href="/${v}/produto/${p.slug}/">${esc(p.nome)}</a></h3>${resumo(p) ? `<p>${esc(resumo(p))}</p>` : ''}</div>
  ${add(p)}
</article>`;

function catalogo(v, lista, { dep = null, busca = true } = {}) {
  const filtros = !dep && v === 'b' ? '' : dep
    ? (dep.subs.length > 1 ? `<div class="chips" role="group" aria-label="Filtrar por tipo"><button type="button" data-filtro="" aria-pressed="true">Todos <small>${dep.n}</small></button>${dep.subs.map(s => `<button type="button" data-filtro="${s.slug}" aria-pressed="false">${s.nome} <small>${s.n}</small></button>`).join('')}</div>` : '')
    : `<div class="chips" role="group" aria-label="Filtrar por departamento"><button type="button" data-filtro="" aria-pressed="true">Todos <small>${total}</small></button>${deps.map(d => `<button type="button" data-filtro="${d.slug}" aria-pressed="false">${d.nome} <small>${d.n}</small></button>`).join('')}</div>`;
  return `<div class="cat" data-catalogo data-nivel="${dep ? 'sub' : 'dep'}">
  <div class="cat-ferr">
    ${busca ? `<label class="cat-busca"><span class="sr">Buscar neste catálogo</span>${ic('busca')}<input type="search" data-busca-cat placeholder="${dep ? `Buscar em ${dep.nome}` : 'Buscar por nome, medida ou tipo'}" autocomplete="off"></label>` : ''}
    ${v === 'b' ? `<div class="vista" role="group" aria-label="Modo de exibição"><button type="button" data-vista="linhas" aria-pressed="true" aria-label="Em lista">${ic('linhas')}</button><button type="button" data-vista="grade" aria-pressed="false" aria-label="Em grade">${ic('grade')}</button></div>` : ''}
    <p class="cat-n" aria-live="polite"><b data-cat-n>${lista.length}</b> produtos</p>
  </div>
  ${filtros}
  <div class="grade-pr${v === 'b' ? ' em-linhas' : ''}" data-itens>${lista.map(p => item(v, p)).join('\n')}</div>
  <p class="sem-res" data-sem-res hidden>Nenhum produto com esse nome no catálogo do site. A loja tem mais itens no balcão: <a href="${waLink()}" target="_blank" rel="noopener">pergunte pelo WhatsApp</a>.</p>
</div>`;
}

const capaDep = d => {
  const ps = produtos.filter(p => p.dep === d.slug && p.fotos.length);
  return ps.find(p => p.fotos[0].vermelho) || ps[0];
};

const passos = [
  ['Encontre', 'Procure pelo nome ou navegue pelos departamentos. São ' + total + ' produtos com foto.'],
  ['Monte a lista', 'Toque em Adicionar e escreva a quantidade de cada item.'],
  ['Envie', 'Mande a lista pelo WhatsApp ou e-mail. A loja responde com preço e disponibilidade.'],
  ['Retire', `Passe na loja da ${E.rua}, no Centro, ou combine a entrega com a equipe.`],
];

function blocoLoja(v) {
  return `<section class="loja-bloco"><div class="in">
  <div class="loja-txt">
    <p class="sobre">A loja</p>
    <h2>${E.rua}, no Centro de Curitiba</h2>
    <dl class="horas">${E.horarios.map(([d, h]) => `<div><dt>${d}</dt><dd>${h}</dd></div>`).join('')}</dl>
    <p class="loja-end">${ic('pin')} ${E.rua} · ${E.bairro} · ${E.cidade}</p>
    <div class="acoes"><a class="btn" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a><a class="btn btn-sec" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
  </div>
  <div class="loja-mapa"><iframe title="Mapa da Casa dos Plásticos" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>`;
}

// ---------- páginas ----------
function home(v) {
  const dest = destaques.map(s => prodPorSlug[s]);
  const recentes = [...produtos].sort((a, b) => b.id - a.id).slice(0, 12);
  if (v === 'a') {
    const mosaico = ['caixa-termica-de-32-litros', 'balde-plastico-20-litros', 'copo-300ml', 'sacos-de-lixo-preto', 'caixa-oitavada-40cm', 'sacola-de-papel-kraft-n3'].map(s => prodPorSlug[s]).filter(Boolean);
    return pagina(v, '', 'index', 'Casa dos Plásticos Embalagens · Curitiba', `Embalagens, descartáveis, isopor, vidros e limpeza no Centro de Curitiba. ${total} produtos no catálogo: monte sua lista e peça orçamento pelo WhatsApp.`, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="sobre">Embalagens · Centro de Curitiba</p>
    <h1>Embalagens, descartáveis e limpeza num balcão só.</h1>
    <p class="lead">${total} produtos com foto: caixas, bipacks, isopor, potes, vidros, sacolas, bobinas e mais. Monte sua lista aqui e receba o orçamento pelo WhatsApp.</p>
    ${buscaForm(v, 'busca-hero', 'O que você procura?')}
    <p class="hero-sug">Mais buscados: ${['bipack', 'caixa térmica', 'pote redondo', 'sacola kraft', 'filme pvc'].map(q => `<a href="/a/produtos/?q=${encodeURIComponent(q)}">${q}</a>`).join('')}</p>
  </div>
  <div class="hero-mosaico" aria-hidden="true">${mosaico.map((p, i) => `<a class="hm hm${i + 1}" href="/a/produto/${p.slug}/" tabindex="-1" style="--fundo:${fundo(p)}">${foto(p, 'p')}</a>`).join('')}</div>
</div></section>

<section class="deps-mosaico"><div class="in">
  <div class="tit-linha"><h2>Departamentos</h2><a href="/a/produtos/">Ver todos os ${total} produtos ${ic('seta')}</a></div>
  <div class="dm">${deps.map((d, i) => { const p = capaDep(d); return `<a class="dm-i${i < 2 ? ' dm-g' : ''}" href="/a/produtos/${d.slug}/" style="--fundo:${fundo(p)}">${foto(p, i < 2 ? 'p' : 't')}<span class="dm-n"><b>${d.nome}</b><small>${d.n} ${d.n === 1 ? 'produto' : 'produtos'}</small></span></a>`; }).join('')}</div>
</div></section>

<section class="destaques"><div class="in">
  <div class="tit-linha"><h2>Produtos em destaque</h2><p>Os mesmos destaques da vitrine da loja.</p></div>
  <div class="trilho" data-trilho>${dest.map(p => item(v, p)).join('')}</div>
</div></section>

<section class="como"><div class="in">
  <h2>Como pedir</h2>
  <ol class="passos">${passos.map(([t, d], i) => `<li><span class="passo-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>

<section class="faixas-promo"><div class="in">
  <a class="promo promo-preto" href="/a/produtos/variedades/?f=recipientes"><span class="promo-t"><b>Bipack</b><small>Mais de 20 modelos de embalagem transparente com tampa</small></span><img src="/assets/img/banner-bipack.webp" alt="Bipacks com doces e salgados" width="926" height="331" loading="lazy"></a>
  <a class="promo promo-vinho" href="/a/produtos/freezer-e-micro-ondas/"><span class="promo-t"><b>Potes</b><small>Para freezer e micro-ondas, redondos e retangulares</small></span><img src="/assets/img/banner-potes.webp" alt="Potes plásticos com alimentos" width="986" height="331" loading="lazy"></a>
</div></section>

<section class="novos"><div class="in">
  <div class="tit-linha"><h2>Chegaram na loja</h2><a href="/a/produtos/">Catálogo completo ${ic('seta')}</a></div>
  <div class="grade-pr">${recentes.slice(0, 8).map(p => item(v, p)).join('')}</div>
</div></section>
${blocoLoja(v)}`);
  }
  // B
  return pagina(v, '', 'index', 'Casa dos Plásticos Embalagens · Catálogo para o seu negócio', `Catálogo da Casa dos Plásticos, em Curitiba: ${total} embalagens, descartáveis, isopor, vidros e produtos de limpeza. Monte a lista e peça orçamento.`, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="sobre">Casa dos Plásticos Embalagens · Curitiba, PR</p>
    <h1>O estoque da loja, aberto para o seu negócio.</h1>
    <p class="lead">Caixas, bipacks, isopor, vidros, bobinas, sacolas e limpeza. Encontre pelo nome ou pela medida, monte a lista com as quantidades e mande para a loja.</p>
    ${buscaForm(v, 'busca-hero', 'Nome, medida ou código: BP-32, 500ml, 40cm…')}
  </div>
  <dl class="hero-num"><div><dt>Produtos no catálogo</dt><dd>${total}</dd></div><div><dt>Departamentos</dt><dd>${deps.length}</dd></div><div><dt>Caixas térmicas, de 3 a 170 litros</dt><dd>23</dd></div><div><dt>Modelos de bipack</dt><dd>${produtos.filter(p => /bipack/i.test(p.nome)).length}</dd></div></dl>
</div></section>

<section class="negocios"><div class="in">
  <h2>Por tipo de negócio</h2>
  <div class="neg-lista">${negocios.map((n, i) => {
    const pega = n.fotos.map(s => prodPorSlug[s]).filter(Boolean);
    return `<div class="neg"><span class="neg-n">0${i + 1}</span><div class="neg-txt"><h3>${n.nome}</h3><p>${n.texto}</p><ul>${n.links.map(([d, s]) => { const dd = depPorSlug[d]; const ss = dd.subs.find(x => x.slug === s); return `<li><a href="/b/produtos/${d}/${ss ? `?f=${s}` : ''}">${ss ? ss.nome : dd.nome}</a></li>`; }).join('')}</ul></div><div class="neg-fotos">${pega.map(p => `<a href="/b/produto/${p.slug}/" style="--fundo:${fundo(p)}" title="${esc(p.nome)}">${foto(p)}</a>`).join('')}</div></div>`;
  }).join('')}</div>
</div></section>

<section class="indice"><div class="in">
  <div class="tit-linha"><h2>Índice de departamentos</h2><a href="/b/produtos/">Abrir o catálogo ${ic('seta')}</a></div>
  <ol class="ind">${deps.map((d, i) => `<li><a href="/b/produtos/${d.slug}/"><span class="ind-n">${String(i + 1).padStart(2, '0')}</span><b>${d.nome}</b><span class="ind-subs">${d.subs.map(s => s.nome).join(' · ') || '&nbsp;'}</span><span class="ind-q">${d.n}</span></a></li>`).join('')}</ol>
</div></section>

<section class="destaques"><div class="in">
  <div class="tit-linha"><h2>Mais pedidos</h2><p>Os destaques da vitrine da loja.</p></div>
  <div class="grade-pr">${dest.slice(0, 10).map(p => item(v, p)).join('')}</div>
</div></section>

<section class="como"><div class="in">
  <h2>Do catálogo ao balcão</h2>
  <ol class="passos">${passos.map(([t, d], i) => `<li><span class="passo-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${blocoLoja(v)}`);
}

function lateral(v, atual) {
  return `<aside class="lateral" aria-label="Departamentos"><h2>Departamentos</h2><nav><a href="/${v}/produtos/"${!atual ? ' aria-current="page"' : ''}>Todos <small>${total}</small></a>${deps.map(d => `<a href="/${v}/produtos/${d.slug}/"${d.slug === atual ? ' aria-current="page"' : ''}>${d.nome} <small>${d.n}</small></a>`).join('')}</nav></aside>`;
}

function produtosPag(v) {
  const corpo = `<section class="pag-cab"><div class="in"><p class="trilha"><a href="/${v}/">Início</a> / Produtos</p><h1>Todos os produtos</h1><p class="lead">${total} itens em ${deps.length} departamentos. Busque, filtre e adicione à lista para pedir orçamento.</p></div></section>
<section class="pag-cat"><div class="in${v === 'b' ? ' com-lateral' : ''}">${v === 'b' ? lateral(v, '') : ''}${catalogo(v, produtos)}</div></section>`;
  return pagina(v, 'produtos/', 'produtos', `Produtos · ${E.nome}`, `Catálogo completo da Casa dos Plásticos: ${total} embalagens, descartáveis, isopor, vidros e produtos de limpeza em Curitiba.`, corpo);
}

function depPag(v, d) {
  const lista = produtos.filter(p => p.dep === d.slug);
  const p0 = capaDep(d);
  const corpo = `<section class="pag-cab pag-dep" style="--fundo:${fundo(p0)}"><div class="in"><div><p class="trilha"><a href="/${v}/">Início</a> / <a href="/${v}/produtos/">Produtos</a> / ${d.nome}</p><h1>${d.nome}</h1><p class="lead">${d.n} ${d.n === 1 ? 'produto' : 'produtos'}${d.subs.length ? ': ' + d.subs.map(s => s.nome.toLowerCase()).join(', ') : ''}.</p></div>${v === 'a' ? `<div class="dep-foto">${foto(p0, 'p')}</div>` : ''}</div></section>
<section class="pag-cat"><div class="in${v === 'b' ? ' com-lateral' : ''}">${v === 'b' ? lateral(v, d.slug) : ''}${catalogo(v, lista, { dep: d })}</div></section>`;
  return pagina(v, `produtos/${d.slug}/`, 'produtos', `${d.nome} · ${E.nome}`, `${d.nome} na Casa dos Plásticos, Centro de Curitiba: ${d.n} produtos com foto. Peça orçamento pelo WhatsApp.`, corpo, d.slug);
}

function produtoPag(v, p) {
  const d = depPorSlug[p.dep];
  const irmaos = produtos.filter(x => x.dep === p.dep && x.sub === p.sub && x !== p).slice(0, v === 'a' ? 4 : 6);
  const fotos = p.fotos.map((f, i) => `<figure style="--fundo:${f.fundo}"><img src="/assets/img/p/${f.f}.webp" alt="${esc(p.nome)}${i ? ` (foto ${i + 1})` : ''}" width="${f.w}" height="${f.h}"${i ? ' loading="lazy"' : ''}></figure>`).join('');
  const desc = p.desc.length ? `<ul class="desc">${p.desc.map(l => /:$/.test(l) ? `<li class="desc-tit">${esc(l.replace(/:$/, ''))}</li>` : `<li>${esc(l)}</li>`).join('')}</ul>` : '<p class="desc-vazia">Consulte medidas, cores e embalagem com a loja.</p>';
  const corpo = `<section class="prod"><div class="in">
  <p class="trilha"><a href="/${v}/">Início</a> / <a href="/${v}/produtos/">Produtos</a> / <a href="/${v}/produtos/${d.slug}/">${d.nome}</a>${p.sub ? ` / <a href="/${v}/produtos/${d.slug}/?f=${p.sub}">${esc(subNome(p))}</a>` : ''}</p>
  <div class="prod-g">
    <div class="prod-fotos${p.fotos.length > 1 ? ' duas' : ''}">${fotos || '<figure class="sem"><span>Sem foto</span></figure>'}</div>
    <div class="prod-txt">
      <p class="sobre">${esc(subNome(p))}</p>
      <h1>${esc(p.nome)}</h1>
      ${desc}
      <div class="prod-acoes">${add(p, 'Adicionar à lista')}<a class="btn btn-wa" href="${waLink(`Olá! Vim pelo site da Casa dos Plásticos. Gostaria de saber preço e disponibilidade de: ${p.nome}`)}" target="_blank" rel="noopener">${ic('wa')} Perguntar no WhatsApp</a></div>
      <p class="prod-nota">${ic('loja')} Retire na loja: ${E.rua}, Centro. Seg. a sex. 8h–18h, sáb. 8h–13h.</p>
    </div>
  </div>
</div></section>
${irmaos.length ? `<section class="irmaos"><div class="in"><div class="tit-linha"><h2>Mais em ${esc(subNome(p))}</h2><a href="/${v}/produtos/${d.slug}/${p.sub ? `?f=${p.sub}` : ''}">Ver todos ${ic('seta')}</a></div><div class="grade-pr">${irmaos.map(x => item(v, x)).join('')}</div></div></section>` : ''}`;
  return pagina(v, `produto/${p.slug}/`, 'produtos', `${p.nome} · ${E.nome}`, `${p.nome}${p.desc[0] ? ': ' + p.desc[0] : ''}. ${d.nome} na Casa dos Plásticos, Curitiba.`, corpo, d.slug);
}

function lojaPag(v) {
  const corpo = `<section class="pag-cab"><div class="in"><p class="trilha"><a href="/${v}/">Início</a> / ${v === 'a' ? 'A loja' : 'Horários e endereço'}</p><h1>${v === 'a' ? 'A loja' : 'Horários e endereço'}</h1><p class="lead">${T.horarios}</p></div></section>
${blocoLoja(v)}
<section class="como"><div class="in"><h2>Antes de vir</h2><ol class="passos">${passos.map(([t, d], i) => `<li><span class="passo-n">${v === 'a' ? i + 1 : String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol></div></section>`;
  return pagina(v, 'loja/', 'loja', `Horários e localização · ${E.nome}`, `Casa dos Plásticos: ${E.rua}, Centro, Curitiba. Segunda a sexta das 8h às 18h, sábado das 8h às 13h.`, corpo);
}

function contatoPag(v) {
  const corpo = `<section class="pag-cab"><div class="in"><p class="trilha"><a href="/${v}/">Início</a> / Contato</p><h1>Contato e orçamento</h1><p class="lead">${T.contato}</p></div></section>
<section class="contato"><div class="in">
  <form class="form" id="pedido" data-form>
    <h2>Pedido de orçamento</h2>
    <div class="form-lista" data-form-lista><p class="vazia">Nenhum produto na lista ainda. <a href="/${v}/produtos/">Abrir o catálogo</a> ou descreva o que precisa na mensagem.</p></div>
    <div class="campos">
      <label>Seu nome <span>(obrigatório)</span><input name="nome" required autocomplete="name"></label>
      <label>Empresa<input name="empresa" autocomplete="organization"></label>
      <label>Seu e-mail <span>(obrigatório)</span><input name="email" type="email" required autocomplete="email"></label>
      <label>Telefone<input name="fone" type="tel" autocomplete="tel"></label>
      <label class="larga">Assunto<input name="assunto" value="Orçamento"></label>
      <label class="larga">Sua mensagem<textarea name="msg" rows="4" placeholder="Medidas, cores, quantidades, prazo…"></textarea></label>
    </div>
    <div class="acoes"><button class="btn btn-wa" type="submit" data-via="wa">${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-sec" type="submit" data-via="email">${ic('mail')} Enviar por e-mail</button></div>
  </form>
  <aside class="contato-info">
    <h2>Casa dos Plásticos</h2>
    <p>${ic('pin')} ${E.rua}<br>${E.bairro}<br>${E.cidade}</p>
    <p>${ic('tel')} <a href="tel:${E.foneHref}">${E.fone}</a> · <a href="tel:${E.fone2Href}">${E.fone2}</a></p>
    <p>${ic('wa')} <a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${E.whats}</a></p>
    <p>${ic('mail')} <a href="mailto:${E.email}">${E.email}</a></p>
    <dl class="horas">${E.horarios.map(([d, h]) => `<div><dt>${d}</dt><dd>${h}</dd></div>`).join('')}</dl>
  </aside>
</div></section>`;
  return pagina(v, 'contato/', 'contato', `Contato · ${E.nome}`, `Peça orçamento à Casa dos Plásticos: ${E.fone}, WhatsApp ${E.whats}, ${E.email}.`, corpo);
}

export function gerarVersao(v) {
  const out = { index: home(v), produtos: produtosPag(v), loja: lojaPag(v), contato: contatoPag(v) };
  for (const d of deps) out[`produtos/${d.slug}`] = depPag(v, d);
  for (const p of produtos) out[`produto/${p.slug}`] = produtoPag(v, p);
  return out;
}
