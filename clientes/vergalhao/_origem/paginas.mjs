// Monta as páginas das versões A ("Divisa": fiel ao site atual, faixa amarela no topo, telefone grande, abertura dividida
// Agropecuária | Construção civil, marcas representadas e rodapé azul) e B ("Prateleira": catálogo na frente, busca no topo,
// corredores do agro e da obra, representadas em faixas com foto). Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, unidades, historia, linhaDoTempo, departamentos, totalProdutos, representadas, catalogo, creditos } from './conteudo.mjs';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const nomesVersao = { a: 'Divisa', b: 'Prateleira' };

export const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A empresa', caminho: 'empresa/' },
  { slug: 'agropecuaria', nome: 'Agropecuária', caminho: 'agropecuaria/' },
  { slug: 'construcao-civil', nome: 'Construção civil', caminho: 'construcao-civil/' },
  { slug: 'representacoes', nome: 'Representações', caminho: 'representacoes/' },
  { slug: 'contato', nome: 'Fale conosco', caminho: 'contato/' },
];
const href = (v, slug, hash = '') => `/${v}/${nav.find(n => n.slug === slug).caminho}${hash}`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1.1z"/><path d="M9 9.5c.3 2 2.2 3.9 4.5 4.5l1-1.2 1.6.8c-.2 1-1 1.7-2 1.7-3 0-6-3-6-6 0-1 .7-1.8 1.7-2l.8 1.6z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  rota: '<path d="M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4z"/><path d="M6 15V9a3 3 0 013-3h3M18 9v6a3 3 0 01-3 3h-3"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const wa = (txt = 'Olá! Vim pelo site da Vergalhão e gostaria de um orçamento.') => `https://wa.me/${E.whats}?text=${encodeURIComponent(txt)}`;
const mapaEmbed = u => `https://www.google.com/maps?q=${encodeURIComponent(u.mapa)}&output=embed`;
const mapaLink = u => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.mapa)}`;
const fotoP = (img, alt, extra = '') => img ? `<img src="/assets/img/p/${img.src}.webp" alt="${esc(alt)}" width="${img.w}" height="${img.h}" loading="lazy" decoding="async"${extra}>` : '';

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
<meta property="og:site_name" content="${E.razao}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0f4f98">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,500..800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const fones = () => unidades.map(u => `<a class="fone" href="tel:${u.foneHref}"><small>${u.cidade} - Mato Grosso</small><b>${u.fone}</b></a>`).join('');

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa-am"><div class="in"><a href="${href(v, 'contato')}">Fale conosco</a></div></div>
<header class="topo">
  <div class="topo-in in">
    <a class="marca" href="/a/" aria-label="Vergalhão, página inicial"><img src="/assets/logo.png" alt="Vergalhão Comércio e Representações" width="468" height="137"></a>
    <div class="atend">${ic('tel', 'ic atend-ic')}<span class="atend-t">Atendimento</span><span class="atend-barra" aria-hidden="true"></span><div class="atend-f">${fones()}</div></div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in">${menu(v, atual)}</div></nav>
</header>`;
  return `<header class="topo">
  <div class="topo-in in">
    <a class="marca" href="/b/" aria-label="Vergalhão, página inicial"><img src="/assets/logo.png" alt="Vergalhão Comércio e Representações" width="468" height="137"></a>
    <form class="busca-topo" action="${href(v, 'agropecuaria')}" role="search" data-busca-global>
      <label class="sr" for="q-topo">Buscar produto</label>
      <input id="q-topo" name="q" type="search" placeholder="Buscar entre ${totalProdutos} produtos: arame, ferro, sementes..." autocomplete="off">
      <button type="submit" aria-label="Buscar">${ic('busca')}</button>
    </form>
    <div class="topo-cont"><a class="topo-fone" href="tel:${unidades[0].foneHref}">${ic('tel')}<span><small>Sinop</small>${unidades[0].fone}</span></a><a class="btn btn-whats" href="${wa()}" target="_blank" rel="noopener">${ic('whats')}WhatsApp</a></div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in">${menu(v, atual)}</div></nav>
</header>`;
}

function rodape(v) {
  return `<footer class="rodape">
<div class="in rod-grade">
  <div class="rod-marca"><img src="/assets/logo-branco.png" alt="Vergalhão Comércio e Representações" width="468" height="137" loading="lazy"><p>Agropecuária e construção civil no norte de Mato Grosso desde 1994. Representante ABS Pecplan, Germisul, Socil e Beckhauser.</p></div>
  ${unidades.map(u => `<div><h2>${u.nome} · ${u.cidade}</h2><p>${u.endereco.join('<br>')}</p><p><a href="tel:${u.foneHref}">${u.fone}</a></p><a class="rod-link" href="${mapaLink(u)}" target="_blank" rel="noopener">${ic('pin')}Ver no mapa</a></div>`).join('')}
  <nav aria-label="Rodapé"><h2>Navegue</h2>${nav.map(n => `<a href="/${v}/${n.caminho}">${n.nome}</a>`).join('')}</nav>
</div>
<div class="in rod-fim"><span>© ${E.razao} · Sinop e Alta Floresta, MT</span><span class="rod-cred">Fotos de abertura: ${creditos.map(c => `<a href="${c.url}" target="_blank" rel="noopener">${esc(c.autor)}</a> (${c.licenca})`).join(', ')}</span><a href="/">Ver as duas versões</a></div>
</footer>
<a class="whats-flut" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('whats')}</a>
<dialog class="prod-dlg" id="prod-dlg" aria-labelledby="pd-nome">
  <button class="pd-x" type="button" aria-label="Fechar" data-fecha>${ic('x')}</button>
  <div class="pd-grade">
    <figure class="pd-foto"><img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="600" height="600"></figure>
    <div class="pd-txt">
      <p class="pd-linha"></p>
      <h2 id="pd-nome"></h2>
      <p class="pd-ref"></p>
      <div class="pd-desc"></div>
      <div class="pd-acoes"><a class="btn btn-whats pd-whats" href="#" target="_blank" rel="noopener">${ic('whats')}Pedir orçamento</a><a class="btn btn-sec" href="tel:${unidades[0].foneHref}">${ic('tel')}${unidades[0].fone}</a></div>
    </div>
  </div>
</dialog>`;
}

const pagina = (v, slug, titulo, desc, corpo) => `${head(v, slug === 'index' ? '' : nav.find(n => n.slug === slug).caminho, titulo, desc)}
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

// ---------- peças comuns ----------
// Um produto do catálogo. Os dados vão em data-* e o site.js abre a janela com foto, código e descrição.
const prodItem = (p, linha) => `<li class="prod" data-nome="${esc((p.nome + ' ' + linha + ' ' + (p.grupo || '')).toLowerCase())}"><button type="button" class="prod-btn" data-prod data-linha="${esc(linha)}" data-titulo="${esc(p.nome)}" data-ref="${esc(p.ref)}" data-desc="${esc(p.desc)}" data-img="${p.img ? `/assets/img/p/${p.img.src}.webp` : ''}" data-whats="${esc(wa(`Olá! Vim pelo site e gostaria de um orçamento de: ${p.nome}${p.ref ? ` (cód. ${p.ref})` : ''}.`))}">
  <span class="prod-foto">${fotoP(p.img, p.nome)}</span><span class="prod-nome">${esc(p.nome)}</span>
</button></li>`;

// Catálogo de um departamento: busca, linhas (âncoras) e produtos agrupados por linha.
function catalogoDep(v, d) {
  const total = d.linhas.reduce((n, l) => n + l.produtos.length, 0);
  const linhasNav = d.linhas.map(l => `<a href="#${l.slug}" data-linha-link="${l.slug}">${esc(l.nome)}<small>${l.produtos.length}</small></a>`).join('');
  const outro = departamentos.find(x => x !== d);
  return `<div class="cat ${v === 'a' ? 'cat-lateral' : 'cat-topo'}" data-catalogo data-outro="${href(v, outro.slug)}" data-outro-nome="${outro.nome}">
  <aside class="cat-nav">
    <div class="cat-busca"><label class="sr" for="q-${d.slug}">Buscar em ${d.nome}</label>${ic('busca')}<input id="q-${d.slug}" type="search" placeholder="Buscar em ${esc(d.nome.toLowerCase())}" data-filtro-busca autocomplete="off"></div>
    <nav class="cat-linhas" aria-label="Linhas de ${esc(d.nome)}">${linhasNav}</nav>
  </aside>
  <div class="cat-corpo">
    <p class="cat-sem" hidden data-sem>Nenhum produto com esse nome em ${esc(d.nome.toLowerCase())}. <a data-sem-outro href="${href(v, outro.slug)}">Procurar em ${esc(outro.nome.toLowerCase())}</a> ou <a href="${wa()}" target="_blank" rel="noopener">pergunte no WhatsApp</a>: a loja tem mais itens do que o site mostra.</p>
    ${d.linhas.map(l => `<section class="cat-sec" id="${l.slug}" data-sec>
      <header class="cat-sec-h"><h2>${esc(l.nome)}</h2><span>${l.produtos.length} ${l.produtos.length === 1 ? 'item' : 'itens'}</span></header>
      <ul class="prods">${l.produtos.map(p => prodItem(p, l.nome)).join('')}</ul>
    </section>`).join('')}
    <p class="cat-total">${total} produtos em ${d.linhas.length} linhas. Clique no produto para ver a descrição e pedir orçamento.</p>
  </div>
</div>`;
}

const unidadeBloco = (u, comMapa = true) => `<article class="unid">
  ${comMapa ? `<div class="unid-mapa"><iframe src="${mapaEmbed(u)}" title="Mapa da ${u.nome.toLowerCase()} em ${u.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>` : ''}
  <div class="unid-txt">
    <p class="unid-tag">${u.nome}</p>
    <h3>${u.cidade} / ${u.uf}</h3>
    <p>${u.endereco.join('<br>')}</p>
    <p class="unid-fone"><a href="tel:${u.foneHref}">${ic('tel')}${u.fone}</a></p>
    <p class="unid-nota">${u.nota}</p>
    <a class="link-seta" href="${mapaLink(u)}" target="_blank" rel="noopener">${ic('rota')}Como chegar</a>
  </div>
</article>`;

// Representadas: blocos completos usados na página Representações das duas versões.
function repBloco(v, r) {
  const linhas = catalogo[r.chave];
  let corpo = '';
  if (r.slug === 'abs-pecplan') {
    corpo = linhas.map(l => {
      const filhos = (l.filhos || []).filter(f => !/galeria/i.test(f.nome));
      return `<div class="rep-linha"><h4>${esc(l.nome.replace('Sémen', 'Sêmen'))}</h4>${filhos.length
        ? `<ul class="racas">${filhos.map(f => `<li>${f.img ? `<img src="/assets/img/p/${f.img.src}.webp" alt="${esc(f.nome)}" width="${f.img.w}" height="${f.img.h}" loading="lazy">` : ''}<span>${esc(f.nome)}</span></li>`).join('')}</ul>`
        : `<p class="rep-obs">Botijões criogênicos para armazenar e transportar o sêmen. Consulte modelos.</p>`}</div>`;
    }).join('');
  } else if (r.slug === 'germisul') {
    corpo = `<ul class="cultivares">${linhas.map(l => `<li>${fotoP(l.capa, 'Pastagem ' + l.nome)}<span>${esc(l.nome)}</span></li>`).join('')}</ul>`;
  } else {
    corpo = linhas.map(l => `<div class="rep-linha"><h4>${esc(l.nome.charAt(0) + l.nome.slice(1).toLowerCase())}</h4><ul class="prods prods-mini">${l.produtos.map(p => prodItem(p, `${r.nome} · ${l.nome}`)).join('')}</ul></div>`).join('');
  }
  return `<section class="rep" id="${r.slug}">
  <header class="rep-h"><img class="rep-logo" src="/assets/img/${r.logo}" alt="${r.nome}" loading="lazy"><div><p class="sobre">Representação</p><h2>${r.nome}</h2><p>${r.texto}</p></div><a class="btn btn-sec" href="${wa(`Olá! Gostaria de falar sobre produtos ${r.nome}.`)}" target="_blank" rel="noopener">${ic('whats')}Falar sobre ${r.nome}</a></header>
  ${corpo}
</section>`;
}

const contagem = l => `${l.produtos.length}`;

// ================= VERSÃO A: Divisa =================
function homeA() {
  const v = 'a';
  const [ag, ob] = departamentos;
  const vitrine = d => {
    const sel = d.linhas.filter(l => l.capa).slice(0, 10);
    return `<ul class="vit" data-rev-filhos data-rev-passo="60">${sel.map(l => `<li><a href="${href(v, d.slug, '#' + l.slug)}"><span class="vit-foto">${fotoP(l.capa, l.nome)}</span><span class="vit-nome">${esc(l.nome)}</span><small>${l.produtos.length} ${l.produtos.length === 1 ? 'item' : 'itens'}</small></a></li>`).join('')}</ul>`;
  };
  return pagina(v, 'index', 'Vergalhão · Agropecuária e construção civil em Sinop e Alta Floresta (MT)',
    'Vergalhão Comércio e Representações: arame, cerca elétrica, ferramentas, sementes, ferro e materiais de construção. Representante ABS Pecplan, Germisul, Socil e Beckhauser.',
    `<section class="divisa" aria-label="Escolha o departamento">
  <a class="lado lado-agro" href="${href(v, 'agropecuaria')}">
    <img src="/assets/img/pasto.webp" alt="Gado nelore no pasto" width="1920" height="1272" class="ap-kenburns">
    <span class="lado-txt"><span class="lado-btn">Agropecuária</span><span class="lado-res">${ag.resumo}</span></span>
  </a>
  <a class="lado lado-obra" href="${href(v, 'construcao-civil')}">
    <img src="/assets/img/armador.webp" alt="Armador montando a ferragem de uma laje" width="1600" height="1067">
    <span class="lado-txt"><span class="lado-btn">Construção civil</span><span class="lado-res">${ob.resumo}</span></span>
  </a>
  <span class="divisa-v" aria-hidden="true"><img src="/assets/img/simbolo.png" alt="" width="138" height="135"></span>
</section>

<section class="numeros"><div class="in num-grade" data-rev-filhos data-rev-passo="90">
  <p><b data-conta data-conta-de="1960">1994</b><span>fundada em 14 de novembro</span></p>
  <p><b data-conta>3.000 m²</b><span>de terreno na sede própria em Sinop</span></p>
  <p><b>2 lojas</b><span>Sinop e Alta Floresta</span></p>
  <p><b data-conta>${totalProdutos}</b><span>produtos no catálogo do site</span></p>
</div></section>

<section class="repres"><div class="in">
  <h2 class="tit-linha"><span>Representante</span></h2>
  <ul class="repres-logos" data-rev-filhos>${representadas.map(r => `<li><a href="${href(v, 'representacoes', '#' + r.slug)}"><img src="/assets/img/${r.logo}" alt="${r.nome}" loading="lazy"><span>${r.texto.split(':')[0]}</span></a></li>`).join('')}</ul>
</div></section>

<section class="dep dep-agro"><div class="in">
  <div class="dep-h"><h2>Agropecuária</h2><p>${ag.linhas.length} linhas para a fazenda, o sítio e a lida com o gado.</p><a class="btn btn-am" href="${href(v, 'agropecuaria')}">Ver todos os produtos ${ic('seta')}</a></div>
  ${vitrine(ag)}
</div></section>

<section class="dep dep-obra"><div class="in">
  <div class="dep-h"><h2>Construção civil</h2><p>Do ferro da fundação à linha de água: ${ob.linhas.length} linhas para a obra.</p><a class="btn btn-claro" href="${href(v, 'construcao-civil')}">Ver todos os produtos ${ic('seta')}</a></div>
  ${vitrine(ob)}
</div></section>

<section class="banner-rh" aria-label="Socil Royal Horse"><a href="${href(v, 'representacoes', '#socil')}"><img src="/assets/img/royal-horse.webp" alt="Socil Royal Horse, linha High Performance: a nutrição do seu equino sempre em primeiro lugar" width="1920" height="875" loading="lazy"></a></section>

<section class="sobre-a"><div class="in sobre-grade">
  <div data-rev="esq"><p class="sobre">Desde 1994</p><h2>Ética, qualidade e marcas consagradas no norte de Mato Grosso</h2><p>${historia[0]}</p><p>${historia[3]}</p><a class="link-seta" href="${href(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></div>
  <figure data-rev="dir"><img src="/assets/img/vergalhoes.webp" alt="Feixe de vergalhões de aço" width="1920" height="1183" loading="lazy"></figure>
</div></section>

<section class="onde"><div class="in">
  <h2 class="tit-linha"><span>Veja onde a Vergalhão está localizada</span></h2>
  <div class="unids">${unidades.map(u => unidadeBloco(u)).join('')}</div>
</div></section>`);
}

function capaDep(v, d) {
  return `<section class="capa capa-${d.cor}">
  <img src="/assets/img/${d.foto}" alt="" width="1920" height="1272" class="capa-foto">
  <div class="in capa-in"><p class="trilha"><a href="/${v}/">Início</a> · ${d.nome}</p><h1>${d.nome}</h1><p>${d.resumo}</p></div>
</section>`;
}

function depPagina(v, d) {
  const titulo = `${d.nome} · Vergalhão`;
  const desc = `Catálogo de ${d.nome.toLowerCase()} da Vergalhão em Sinop e Alta Floresta (MT): ${d.resumo}`;
  if (v === 'a') return pagina(v, d.slug, titulo, desc, `${capaDep(v, d)}
<div class="lista-h lista-${d.cor}"><div class="in"><h2>Lista de produtos ${d.slug === 'agropecuaria' ? 'da agropecuária' : 'da construção civil'}</h2></div></div>
<section class="in sec-cat">${catalogoDep(v, d)}</section>
${d.slug === 'construcao-civil' ? `<section class="banner-faixa"><img src="/assets/img/hidraulicos.webp" alt="Completa linha em materiais hidráulicos" width="1920" height="330" loading="lazy"></section>` : ''}`);
  const outro = departamentos.find(x => x !== d);
  return pagina(v, d.slug, titulo, desc, `<section class="capa-b capa-b-${d.cor}"><div class="in capa-b-in">
  <div><p class="trilha"><a href="/${v}/">Início</a> · ${d.nome}</p><h1>${d.nome}</h1><p>${d.resumo}</p>
  <p class="capa-b-num"><b>${d.linhas.reduce((n, l) => n + l.produtos.length, 0)}</b> produtos · <b>${d.linhas.length}</b> linhas · <a href="${href(v, outro.slug)}">ir para ${outro.nome.toLowerCase()} ${ic('seta')}</a></p></div>
  <figure><img src="/assets/img/${d.foto}" alt="" width="1920" height="1272"></figure>
</div></section>
<section class="in sec-cat">${catalogoDep(v, d)}</section>`);
}

function empresaPagina(v) {
  const corpo = `<section class="${v === 'a' ? 'capa capa-emp' : 'capa-b capa-b-emp'}">${v === 'a' ? '<img src="/assets/img/vergalhoes.webp" alt="" width="1920" height="1183" class="capa-foto">' : ''}
  <div class="in ${v === 'a' ? 'capa-in' : 'capa-b-in capa-b-so'}"><div><p class="trilha"><a href="/${v}/">Início</a> · A empresa</p><h1>A empresa</h1><p>Distribuição de aço, arame e tudo o que o campo e a obra precisam, no norte de Mato Grosso desde 1994.</p></div></div>
</section>
<section class="hist"><div class="in hist-grade">
  <div class="hist-txt" data-rev>${historia.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="hist-fatos" data-rev="dir">
    <p><b>1994</b><span>14 de novembro, fundação</span></p>
    <p><b>3.000 m²</b><span>terreno da sede própria em Sinop</span></p>
    <p><b>2.100 m²</b><span>de área construída</span></p>
    <p><b>Alta Floresta</b><span>filial no extremo norte do estado</span></p>
  </aside>
</div></section>
<section class="tempo"><div class="in">
  <h2 class="${v === 'a' ? 'tit-linha' : 'tit-b'}"><span>Nossa trajetória</span></h2>
  <ol class="tempo-lista" data-etapas><span class="ap-trilho" aria-hidden="true"></span>${linhaDoTempo.map(t => `<li class="ap-etapa"><span class="tempo-ano">${t.ano}</span><h3>${t.titulo}</h3><p>${t.texto}</p></li>`).join('')}</ol>
</div></section>
<section class="valores"><div class="in val-grade">
  <div><h3>Ética</h3><p>A marca da Vergalhão foi construída com base na ética, no trato com o cliente e com os fornecedores.</p></div>
  <div><h3>Qualidade</h3><p>Produtos de marcas consagradas, como Gerdau, Tramontina, Patriot, TRU-TEST e Jacto, e as representações ABS Pecplan, Germisul, Socil e Beckhauser.</p></div>
  <div><h3>Atendimento</h3><p>Excelência no atendimento ao produtor rural, ao construtor e a quem está reformando a casa.</p></div>
</div></section>
<section class="onde"><div class="in"><h2 class="${v === 'a' ? 'tit-linha' : 'tit-b'}"><span>Nossas lojas</span></h2><div class="unids">${unidades.map(u => unidadeBloco(u)).join('')}</div></div></section>`;
  return pagina(v, 'empresa', 'A empresa · Vergalhão', 'Desde 1994 em Mato Grosso: sede própria em Sinop com 3.000 m² de terreno e filial em Alta Floresta.', corpo);
}

function repPagina(v) {
  const corpo = `<section class="${v === 'a' ? 'capa capa-rep' : 'capa-b capa-b-rep'}">${v === 'a' ? '<img src="/assets/img/pasto-largo.webp" alt="" width="1920" height="1272" class="capa-foto">' : ''}
  <div class="in ${v === 'a' ? 'capa-in' : 'capa-b-in capa-b-so'}"><div><p class="trilha"><a href="/${v}/">Início</a> · Representações</p><h1>Representações</h1><p>A Vergalhão representa quatro marcas do campo em Sinop e região: genética, pastagem, nutrição e manejo.</p></div></div>
</section>
<nav class="rep-nav" aria-label="Marcas"><div class="in">${representadas.map(r => `<a href="#${r.slug}"><img src="/assets/img/${r.logo}" alt="${r.nome}"></a>`).join('')}</div></nav>
<div class="in reps">${representadas.map(r => repBloco(v, r)).join('')}</div>`;
  return pagina(v, 'representacoes', 'Representações · Vergalhão', 'ABS Pecplan, Germisul, Socil e Beckhauser em Sinop e Alta Floresta (MT): sêmen bovino, sementes de pastagem, nutrição animal e troncos de contenção.', corpo);
}

function contatoPagina(v) {
  const ufs = ['MT', 'PA', 'RO', 'AM', 'GO', 'MS', 'TO', 'Outro'];
  const corpo = `<section class="${v === 'a' ? 'capa capa-cont' : 'capa-b capa-b-cont'}">${v === 'a' ? '<img src="/assets/img/painel.webp" alt="" width="1920" height="338" class="capa-foto">' : ''}
  <div class="in ${v === 'a' ? 'capa-in' : 'capa-b-in capa-b-so'}"><div><p class="trilha"><a href="/${v}/">Início</a> · Fale conosco</p><h1>Fale conosco</h1><p>Envie um orçamento, uma solicitação ou uma mensagem para a Vergalhão. Em breve entraremos em contato.</p></div></div>
</section>
<section class="cont"><div class="in cont-grade">
  <form class="form" id="orcamento" data-form-whats="${E.whats}">
    <h2>Orçamento ou mensagem</h2>
    <div class="campos">
      <label class="c-2">Nome completo<input name="nome" required autocomplete="name"></label>
      <label>Telefone ou celular<input name="fone" type="tel" required autocomplete="tel"></label>
      <label>E-mail<input name="email" type="email" autocomplete="email"></label>
      <label>Cidade<input name="cidade" autocomplete="address-level2"></label>
      <label>UF<select name="uf">${ufs.map(u => `<option>${u}</option>`).join('')}</select></label>
      <label class="c-2">Mensagem<textarea name="msg" rows="5" required placeholder="Ex.: 20 rolos de arame ovalado, 1 eletrificador Patriot PMX 200 e 50 barras de ferro CA-50 3/8."></textarea></label>
    </div>
    <button class="btn btn-whats" type="submit">${ic('whats')}Enviar pelo WhatsApp</button>
    <p class="form-nota">O envio abre o WhatsApp da Vergalhão com a mensagem pronta. Se preferir, ligue: ${unidades.map(u => `<a href="tel:${u.foneHref}">${u.cidade} ${u.fone}</a>`).join(' · ')}.</p>
  </form>
  <div class="cont-unids">${unidades.map(u => unidadeBloco(u)).join('')}</div>
</div></section>`;
  return pagina(v, 'contato', 'Fale conosco · Vergalhão', 'Telefones, endereços e pedido de orçamento da Vergalhão em Sinop (66) 3515-9200 e Alta Floresta (66) 3521-7074.', corpo);
}

// ================= VERSÃO B: Prateleira =================
function homeB() {
  const v = 'b';
  const [ag, ob] = departamentos;
  const acha = (d, n) => d.linhas.flatMap(l => l.produtos.map(p => ({ ...p, linha: l.nome }))).find(p => p.nome === n);
  const destaques = [
    acha(ag, 'Eletrificador Patriot PMX 200 - 70km'), acha(ob, 'Ferro CA-50'), acha(ag, 'Arame Ovalado'), acha(ag, 'Carriola Baleia 150L'),
    acha(ag, 'INDICADOR ID5000'), acha(ag, 'Pulverizador Jacto 20 Lts'), acha(ob, 'Telas para Concreto'), acha(ag, 'Painel solar') || acha(ag, '100 watts'),
    acha(ob, 'Anelado'), acha(ag, 'Bebedouro Tipo Australiano'),
  ].filter(Boolean);
  const vitrineHero = [acha(ag, 'Eletrificador Patriot PMX 200 - 70km'), acha(ag, 'Arame Galvanizado'), acha(ag, 'Carriola Baleia 150L'), acha(ob, 'Ferro CA-50')].filter(Boolean);
  const corredor = d => `<div class="corr corr-${d.cor}">
    <header><h3>${d.nome}</h3><a href="${href(v, d.slug)}">Ver tudo ${ic('seta')}</a></header>
    <ol>${d.linhas.map(l => `<li><a href="${href(v, d.slug, '#' + l.slug)}"><span>${esc(l.nome)}</span><i aria-hidden="true"></i><small>${l.produtos.length}</small></a></li>`).join('')}</ol>
  </div>`;
  return pagina(v, 'index', 'Vergalhão · Catálogo de agropecuária e construção civil em Sinop (MT)',
    `Busque entre ${totalProdutos} produtos de agropecuária e construção civil e peça orçamento pelo WhatsApp. Lojas em Sinop e Alta Floresta (MT).`,
    `<section class="hero-b"><div class="in hero-b-grade">
  <div class="hero-b-txt">
    <p class="sobre">Sinop e Alta Floresta · desde 1994</p>
    <h1 data-palavras>Do arame da cerca ao ferro da obra.</h1>
    <p class="hero-b-lead">Agropecuária e construção civil num só lugar, com marcas consagradas e as representações ABS Pecplan, Germisul, Socil e Beckhauser.</p>
    <form class="busca-hero" action="${href(v, 'agropecuaria')}" role="search" data-busca-global>
      <label class="sr" for="q-hero">O que você procura?</label>
      <input id="q-hero" name="q" type="search" placeholder="O que você procura?" autocomplete="off">
      <button class="btn btn-azul" type="submit">${ic('busca')}Buscar</button>
    </form>
    <p class="chips">Mais procurados: ${['Arame', 'Cerca elétrica', 'Ferro CA-50', 'Sementes', 'Linha água', 'EPI'].map(c => `<a href="#" data-chip="${c}">${c}</a>`).join('')}</p>
  </div>
  <div class="hero-b-vit" aria-hidden="true">
    <span class="chevron"></span>
    ${vitrineHero.map((p, i) => `<img class="hv hv-${i}" src="/assets/img/p/${p.img.src}.webp" alt="" width="${p.img.w}" height="${p.img.h}">`).join('')}
  </div>
</div></section>

<section class="deps-b"><div class="in deps-b-grade">
  ${departamentos.map(d => `<a class="dep-b dep-b-${d.cor}" href="${href(v, d.slug)}"><img src="/assets/img/${d.foto}" alt="" width="1920" height="1272" loading="lazy"><span class="dep-b-txt"><b>${d.nome}</b><span>${d.linhas.reduce((n, l) => n + l.produtos.length, 0)} produtos em ${d.linhas.length} linhas</span></span>${ic('seta', 'ic dep-b-seta')}</a>`).join('')}
</div></section>

<section class="corredores"><div class="in">
  <div class="sec-h"><h2 class="tit-b">O que você precisa hoje?</h2><p>Todas as linhas da loja, como nos corredores. Clique e vá direto aos produtos.</p></div>
  <div class="corr-grade">${departamentos.map(corredor).join('')}</div>
</div></section>

<section class="dest"><div class="in">
  <div class="sec-h"><h2 class="tit-b">Saindo do balcão</h2><p>Alguns itens do catálogo. Toque para ver a descrição e pedir orçamento.</p></div>
  <ul class="prods prods-rola">${destaques.map(p => prodItem(p, p.linha)).join('')}</ul>
</div></section>

<section class="reps-b"><div class="in">
  <div class="sec-h"><h2 class="tit-b">Representações</h2><p>Quatro marcas do campo com atendimento da Vergalhão em Sinop e região.</p></div>
  <div class="reps-b-grade">${representadas.map((r, i) => `<a class="rep-b" href="${href(v, 'representacoes', '#' + r.slug)}" data-rev style="--ap-d:${i * 80}ms"><img src="/assets/img/${r.logo}" alt="${r.nome}" loading="lazy"><p>${r.texto}</p><span class="link-seta">Ver linhas ${ic('seta')}</span></a>`).join('')}</div>
</div></section>

<section class="hist-b"><div class="in hist-b-grade">
  <figure><img src="/assets/img/vergalhoes.webp" alt="Feixe de vergalhões de aço" width="1920" height="1183" loading="lazy"></figure>
  <div><p class="sobre">A empresa</p><h2>Começou com aço e arame Gerdau. Hoje atende o campo e a obra.</h2><p>${historia[0]}</p><p>${historia[2]}</p><a class="link-seta" href="${href(v, 'empresa')}">Nossa história ${ic('seta')}</a></div>
</div></section>

<section class="onde"><div class="in"><div class="sec-h"><h2 class="tit-b">Duas lojas no norte de Mato Grosso</h2></div><div class="unids">${unidades.map(u => unidadeBloco(u)).join('')}</div></div></section>`);
}

export function gerarVersao(v) {
  return {
    index: v === 'a' ? homeA() : homeB(),
    empresa: empresaPagina(v),
    agropecuaria: depPagina(v, departamentos[0]),
    'construcao-civil': depPagina(v, departamentos[1]),
    representacoes: repPagina(v),
    contato: contatoPagina(v),
  };
}
export { slugify };
