// Monta as páginas das versões A ("Amarela": fiel ao site atual, cabeçalho com logo no centro, foto da sede, linha do tempo
// amarela e rodapé grafite com curva) e B ("Balcão": portal de pedido no azul do logo, busca no topo, prateleiras por
// categoria e filtros ao lado). As duas usam o mesmo catálogo de 316 produtos tirado dos PDFs da Dhiozer e mandam o
// pedido pronto para o WhatsApp do supervisor da região. Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, catalogo, marcas, marcaDe, regioes, segmentos, historia, numeros, termoLgpd } from './conteudo.mjs';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const nomesVersao = { a: 'Amarela', b: 'Balcão' };

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  carrinho: '<path d="M3 4h2l2.4 11h10.2L20 7H6.2"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
  pdf: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/><path d="M9 14h6M9 17h4"/>',
  fora: '<path d="M14 5h5v5M19 5l-8 8"/><path d="M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 9h4l3 3v4h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  filtro: '<path d="M4 5h16l-6 8v5l-4 2v-7z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (num = E.wa, msg = 'Olá! Vim pelo site da Dhiozer e gostaria de atendimento.') => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

const PAGS = [
  ['', 'Início'], ['sobre/', 'Sobre'], ['catalogo/', 'Catálogo'], ['area-de-atuacao/', 'Área de atuação'],
  ['contato/', 'Contato'], ['trabalhe-conosco/', 'Trabalhe conosco'], ['lgpd/', 'LGPD'],
];
const cats = [...new Set(catalogo.map(p => p.cat))];
const porMarca = m => catalogo.filter(p => p.marca === m.catalogo);
const busca = p => `${p.nome} ${p.marca} ${p.cat} ${p.cod || ''}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// ---------- moldura ----------
function head(v, caminho, tit, desc) {
  const u = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=Archivo:wdth,wght@112,700;112,800;112,900&family=Signika:wght@400;500;600'
    : 'family=Archivo:wdth,wght@100,600;112,700;112,800;112,900&family=Inter:wght@400;500;600';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tit)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${u}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(tit)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${u}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#fbd107' : '#0068a0'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const navLinks = (v, atual) => PAGS.map(([c, n]) => `<a href="/${v}/${c}"${c === atual ? ' aria-current="page"' : ''}>${n}</a>`).join('');
const pedidoBtn = (v, cls) => `<a class="${cls}" href="/${v}/pedido/">${ic('carrinho')}<span>Meu pedido</span><b class="ped-n" hidden>0</b></a>`;

function topo(v, atual) {
  if (v === 'a') return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
  <div class="topo-in">
    <a class="logo" href="/a/" aria-label="Dhiozer Distribuidora, início"><img src="/assets/logo.svg" alt="Dhiozer" width="250" height="50"></a>
    <a class="ajuda" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')}<span>Como posso te ajudar?</span></a>
    ${pedidoBtn('a', 'ped-btn')}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
  <nav id="menu" class="nav" aria-label="Principal">${navLinks('a', atual)}</nav>
</header>`;
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="faixa"><div class="w"><span>${ic('relogio')} Seg a sex, 8h às 18h · sáb, 8h às 11h30</span><span>${ic('caminhao')} Entrega no oeste e meio oeste de SC</span><a href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.fone}</a></div></div>
<header class="topo">
  <div class="w topo-in">
    <a class="logo" href="/b/" aria-label="Dhiozer Distribuidora, início"><img src="/assets/logo-branco.svg" alt="Dhiozer" width="200" height="40"></a>
    <form class="busca-topo" action="/b/catalogo/" role="search"><label class="sr" for="q-topo">Buscar produto</label><input id="q-topo" name="q" type="search" placeholder="Buscar entre ${catalogo.length} produtos: Bon o Bon, Muky, orégano..." autocomplete="off"><button type="submit" aria-label="Buscar">${ic('busca')}</button></form>
    ${pedidoBtn('b', 'ped-btn')}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
  <nav id="menu" class="nav" aria-label="Principal"><div class="w">${navLinks('b', atual)}<a class="nav-ped" href="/b/pedido/">Meu pedido</a></div></nav>
</header>`;
}

function rodape(v) {
  const marcasL = marcas.map(m => `<a href="/${v}/catalogo/${m.id}/">${m.curto}</a>`).join('');
  const contato = `<p>${ic('pin')}<span>${E.endereco}<br>${E.cidade} · CEP ${E.cep}</span></p>
      <p>${ic('wa')}<a href="${waLink()}" target="_blank" rel="noopener">${E.fone}</a></p>
      <p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>`;
  const redes = `<div class="redes"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('fb')}</a><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('ig')}</a></div>`;
  return `<footer class="rodape">
  ${v === 'a' ? '<svg class="onda" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 90V52C260 10 600 0 900 12c230 9 420 30 540 78z"/></svg>' : ''}
  <div class="w rod-grid">
    <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Dhiozer" width="190" height="38" loading="lazy"><p>${E.frase}.</p>${redes}</div>
    <div><h2>Endereço</h2>${contato}</div>
    <div><h2>Páginas</h2><nav class="rod-links" aria-label="Rodapé">${PAGS.map(([c, n]) => `<a href="/${v}/${c}">${n}</a>`).join('')}<a href="https://dhiozer.com.br:2096/" rel="noopener">Webmail</a></nav></div>
    <div><h2>Marcas</h2><nav class="rod-links" aria-label="Marcas">${marcasL}</nav></div>
  </div>
  <div class="w rod-fim"><span>© ${new Date().getFullYear()} ${E.razao} · CNPJ ${E.cnpj}</span><a href="/${v}/lgpd/">Privacidade e LGPD</a></div>
</footer>
<a class="wa-fixo" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>
<dialog class="ficha" data-ficha aria-labelledby="ficha-t"><form method="dialog"><button class="ficha-x" aria-label="Fechar">${ic('x')}</button></form><div data-ficha-corpo></div></dialog>
<div class="aviso" data-aviso role="status" aria-live="polite"></div>`;
}

const pagina = (v, caminho, tit, desc, corpo, extra = '') => `${head(v, caminho, tit, desc)}
<body class="v-${v}"${extra}>
${topo(v, caminho)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- produto ----------
function card(p, v, i = 99) {
  const m = marcaDe(p);
  return `<li class="prod" data-id="${p.id}" data-marca="${m.id}" data-cat="${esc(p.cat)}" data-busca="${esc(busca(p))}">
  <button class="prod-foto" type="button" data-abre aria-label="Ver detalhes: ${esc(p.nome)}"><img src="/assets/p/${p.id}.webp" alt="${esc(p.nome)}" width="${p.w}" height="${p.h}"${i < 8 ? '' : ' loading="lazy"'} decoding="async"></button>
  <div class="prod-txt">
    <span class="prod-marca">${esc(m.curto)}${p.cod ? ` · cód. ${p.cod}` : ''}</span>
    <h3 class="prod-nome">${esc(p.nome)}</h3>
    <p class="prod-emb">${esc([p.det, p.emb].filter(Boolean).join(' · '))}</p>
  </div>
  <div class="qtd" data-qtd>
    <button type="button" class="q-menos" aria-label="Menos uma caixa">${ic('menos')}</button>
    <input type="number" min="0" max="999" inputmode="numeric" value="0" aria-label="Caixas de ${esc(p.nome)}">
    <button type="button" class="q-mais" aria-label="Mais uma caixa">${ic('mais')}</button>
  </div>
</li>`;
}
const grade = (lista, v, cls = 'grade') => `<ul class="${cls}" role="list">${lista.map((p, i) => card(p, v, i)).join('\n')}</ul>`;

// Dados resumidos para a página do pedido (nome, marca, embalagem e código de cada produto).
const dadosPedido = () => `<script type="application/json" id="produtos">${JSON.stringify(Object.fromEntries(catalogo.map(p => [p.id, [p.nome, marcaDe(p).curto, p.emb, p.cod || '']]))).replace(/</g, '\\u003c')}</script>`;

// ---------- blocos comuns ----------
function blocoRegioes(v) {
  return `<div class="reg">
  <figure class="reg-mapa"><img src="/assets/img/mapa.webp" alt="Mapa do oeste e meio oeste de Santa Catarina com as áreas de cada supervisor: Oeste em verde e Meio Oeste em salmão" width="1900" height="972" loading="lazy">
    <figcaption><span class="tag verde">Oeste</span><span class="tag salmao">Meio Oeste</span></figcaption></figure>
  <div class="reg-sup">
    ${regioes.map(r => `<div class="sup sup-${r.id}"><span class="sup-reg">${r.nome} · área ${r.cor}</span><strong>${r.supervisor}</strong><span>Supervisor comercial</span><a class="btn btn-wa" href="${waLink(r.wa, `Olá ${r.supervisor}! Vim pelo site da Dhiozer e quero atendimento na região ${r.nome}.`)}" target="_blank" rel="noopener">${ic('wa')} Falar com ${r.supervisor}</a></div>`).join('')}
  </div>
</div>`;
}
const passos = [
  ['Escolha', 'Ache o produto pela marca, pela categoria ou pela busca e marque quantas caixas quer.'],
  ['Monte o pedido', 'A lista fica guardada no seu celular. Informe o nome do mercado e a cidade.'],
  ['Confirme com o vendedor', 'O pedido chega pronto no WhatsApp do supervisor da sua região, que confirma preço e entrega.'],
];

function filtros(v, marcaFixa) {
  const lista = marcaFixa ? porMarca(marcaFixa) : catalogo;
  const cs = [...new Set(lista.map(p => p.cat))];
  const chipsCat = `<button class="chip" type="button" data-cat-f="" aria-pressed="true">Todas</button>${cs.map(c => `<button class="chip" type="button" data-cat-f="${esc(c)}" aria-pressed="false">${esc(c)} <small>${lista.filter(p => p.cat === c).length}</small></button>`).join('')}`;
  const chipsMarca = marcaFixa ? '' : `<button class="chip" type="button" data-marca-f="" aria-pressed="true">Todas as marcas</button>${marcas.map(m => `<button class="chip" type="button" data-marca-f="${m.id}" aria-pressed="false">${esc(m.curto)} <small>${porMarca(m).length}</small></button>`).join('')}`;
  return { chipsCat, chipsMarca, lista };
}

// ======================= VERSÃO A =======================
function aInicio() {
  const marcasHtml = marcas.map((m, k) => {
    const ps = porMarca(m);
    const boas = ps.filter(p => p.w / p.h > 0.55 && p.w / p.h < 1.7);
    const amostra = [...new Set([...[0, 0.25, 0.5, 0.75].map(f => boas[Math.floor(f * boas.length)]), ...ps.filter((_, i) => i % 2 === 0)])].filter(Boolean).slice(0, 4);
    return `<article class="am${k % 2 ? ' am-inv' : ''}" data-rev>
  <div class="am-logo"><img src="/assets/marcas/${m.id}.png" alt="${esc(m.nome)}" loading="lazy"></div>
  <div class="am-txt"><h3>${esc(m.nome)}</h3><p>${esc(m.texto)}</p>
    <p class="am-acoes"><a class="btn btn-azul" href="/a/catalogo/${m.id}/">Ver os ${ps.length} produtos ${ic('seta')}</a><a class="lnk" href="${m.pdf}" target="_blank" rel="noopener">${ic('pdf')} Catálogo em PDF</a></p></div>
  <ul class="am-prods" role="list">${amostra.map(p => `<li><img src="/assets/p/${p.id}.webp" alt="${esc(p.nome)}" width="${p.w}" height="${p.h}" loading="lazy"></li>`).join('')}</ul>
</article>`;
  }).join('\n');
  return pagina('a', '', 'Dhiozer Distribuidora · Chapecó (SC), desde 1997', `${E.frase}. Arcor, Triunfo, Bretzke, Leke, Splash e Taschibra com pedido pelo site.`, `
<section class="a-hero">
  <img class="a-hero-img ap-kenburns" src="/assets/img/sede.webp" alt="Sede da Dhiozer em Chapecó, prédio amarelo e branco junto à BR-282" width="1280" height="720">
  <div class="w a-hero-in">
    <p class="kicker">${E.frase}</p>
    <h1>Bem-vindo à <span>Dhiozer</span> Distribuidora</h1>
    <p class="a-hero-sub">Seis marcas, ${catalogo.length} produtos e o vendedor da sua região a um WhatsApp de distância.</p>
    <p class="a-hero-acoes"><a class="btn btn-ama" href="/a/catalogo/">Ver o catálogo ${ic('seta')}</a><a class="btn btn-claro" href="/a/area-de-atuacao/">Falar com o vendedor</a></p>
  </div>
</section>
<section class="a-num" aria-label="A Dhiozer em números"><div class="w a-num-in">${numeros.map(([n, t]) => `<p><strong data-conta>${n}</strong><span>${t}</span></p>`).join('')}</div></section>
<section class="sec a-marcas">
  <div class="w">
    <h2 class="tit">Conheça as marcas que distribuímos</h2>
    <p class="lead">Do chocolate à lâmpada: o que o varejo do oeste catarinense mais gira, com entrega própria a partir de Chapecó.</p>
    ${marcasHtml}
  </div>
</section>
<section class="sec a-passos">
  <div class="w">
    <h2 class="tit">Seu pedido em três paradas</h2>
    <ol class="rota" data-etapas>${passos.map(([t, d], i) => `<li class="ap-etapa"><span class="rota-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}<span class="ap-trilho" aria-hidden="true"></span></ol>
    <p class="centro"><a class="btn btn-azul" href="/a/catalogo/">Começar pelo catálogo ${ic('seta')}</a></p>
  </div>
</section>
<section class="sec a-reg">
  <div class="w">
    <h2 class="tit">Atendemos o oeste e o meio oeste de Santa Catarina</h2>
    <p class="lead">${segmentos.join(', ')}.</p>
    ${blocoRegioes('a')}
  </div>
</section>
<section class="a-news">
  <div class="w a-news-in">
    <h2>Inscrever-se</h2>
    <form class="news" data-wa-form="${E.wa}" data-assunto="Quero receber as ofertas e novidades da Dhiozer">
      <p>Receba nossas ofertas e novidades no WhatsApp:</p>
      <div class="news-l"><label class="sr" for="n-nome">Seu nome e mercado</label><input id="n-nome" name="Nome e mercado" required placeholder="Seu nome e o nome do mercado"><button class="btn btn-escuro" type="submit">Inscrever-se</button></div>
    </form>
  </div>
</section>`);
}

function aSobre() {
  return pagina('a', 'sobre/', 'Sobre a Dhiozer · da garagem a 2.000 m²', 'A história da Dhiozer Distribuidora, de 1997 na garagem de casa à sede de 2.000 m² junto à BR-282, em Chapecó.', `
<section class="a-hist">
  <div class="w">
    <h1 class="tit">História</h1>
    <p class="lead">Da garagem de casa, em 1997, à sede de 2.000 m² junto à BR-282.</p>
    <ol class="tempo">${historia.map((h, i) => `<li class="t-item${i % 2 ? ' t-esq' : ''}" data-rev="${i % 2 ? 'esq' : 'dir'}">
      <span class="t-foto">${h.img === 'logo' ? '<img src="/assets/logo.svg" alt="Logo atual da Dhiozer" class="t-logo">' : `<img src="/assets/img/${h.img}.webp" alt="${esc(h.tit)}, ${h.ano}" loading="lazy">`}</span>
      <div class="t-txt"><span class="t-ano">${h.ano}</span><h2>“${h.tit}”</h2><p>${h.txt}</p></div></li>`).join('')}</ol>
  </div>
</section>
<section class="a-num a-num-esc" aria-label="A Dhiozer em números"><div class="w a-num-in">${numeros.map(([n, t]) => `<p><strong data-conta>${n}</strong><span>${t}</span></p>`).join('')}</div></section>
<section class="sec">
  <div class="w a-sede">
    <figure><img src="/assets/img/frota.webp" alt="Caminhão e utilitários da Dhiozer na frente da segunda sede, em 2006" width="1600" height="1197" loading="lazy"><figcaption>2006: a frota na frente da 2ª sede, de 600 m².</figcaption></figure>
    <div><h2 class="tit">Quem vende, entrega</h2><p>Desde o começo a Dhiozer vende e entrega com equipe própria: em 1998 o mesmo vendedor visitava os clientes de segunda a quarta e entregava às sextas e sábados. Hoje são 14 profissionais de vendas e 7 veículos atendendo supermercados, mercados, mercearias, restaurantes, lanchonetes, bares e outros comércios do oeste e meio oeste catarinense.</p>
      <p><a class="btn btn-azul" href="/a/area-de-atuacao/">Ver a área de atuação ${ic('seta')}</a></p></div>
  </div>
</section>`);
}

function aCatalogo(m) {
  const { chipsCat, chipsMarca, lista } = filtros('a', m);
  const tit = m ? `${m.nome}: ${lista.length} produtos` : 'Catálogo';
  const intro = m
    ? `<div class="cat-marca"><img src="/assets/marcas/${m.id}.png" alt="${esc(m.nome)}"><p>${esc(m.texto)}</p><p class="cat-links"><a class="lnk" href="${m.pdf}" target="_blank" rel="noopener">${ic('pdf')} Catálogo ${esc(m.curto)} em PDF</a>${m.site ? `<a class="lnk" href="${m.site}" target="_blank" rel="noopener">${ic('fora')} Site da marca</a>` : ''}<a class="lnk" href="/a/catalogo/">Todas as marcas</a></p></div>`
    : `<p class="lead">Escolha a marca, filtre pela categoria e marque quantas caixas quer. O pedido vai pronto para o WhatsApp do supervisor da sua região.</p>
      <ul class="marcas-tira" role="list">${marcas.map(x => `<li><a href="/a/catalogo/${x.id}/"><img src="/assets/marcas/${x.id}.png" alt="${esc(x.nome)}" loading="lazy"><span>${porMarca(x).length} itens</span></a></li>`).join('')}</ul>`;
  return pagina('a', m ? `catalogo/${m.id}/` : 'catalogo/', `${tit} · Dhiozer Distribuidora`, m ? `${m.linhas}: produtos ${m.nome} com embalagem e pedido pelo WhatsApp da Dhiozer.` : `${catalogo.length} produtos Arcor, Triunfo, Bretzke, Leke, Splash e Taschibra com pedido pelo WhatsApp.`, `
<section class="cat-topo"><div class="w"><h1 class="tit">${m ? esc(m.nome) : 'Catálogo'}</h1>${intro}</div></section>
<section class="sec cat" data-catalogo>
  <div class="w">
    <div class="cat-barra">
      <div class="cat-busca">${ic('busca')}<label class="sr" for="q">Buscar produto</label><input id="q" type="search" data-busca placeholder="Buscar por nome ou código" autocomplete="off"></div>
      <p class="cat-n" aria-live="polite"><b data-n>${lista.length}</b> produtos</p>
    </div>
    ${chipsMarca ? `<div class="chips" role="group" aria-label="Marca">${chipsMarca}</div>` : ''}
    <div class="chips chips-cat" role="group" aria-label="Categoria">${chipsCat}</div>
    ${grade(lista, 'a')}
    <p class="sem-res" data-sem-res hidden>Nenhum produto encontrado. Tente outra palavra ou <a href="${waLink()}" target="_blank" rel="noopener">pergunte no WhatsApp</a>.</p>
  </div>
</section>
<div class="barra-ped" data-barra-ped hidden><div class="w"><span><b class="ped-n">0</b> produtos no pedido</span><a class="btn btn-ama" href="/a/pedido/">Revisar e enviar ${ic('seta')}</a></div></div>`);
}

function aArea() {
  return pagina('a', 'area-de-atuacao/', 'Área de atuação · Dhiozer Distribuidora', 'A Dhiozer atende o oeste e o meio oeste de Santa Catarina. Fale direto com o supervisor comercial da sua região.', `
<section class="sec">
  <div class="w">
    <h1 class="tit">Área de atuação</h1>
    <p class="lead">Atuamos na região oeste e meio oeste de Santa Catarina. Atendemos diversos segmentos de clientes:</p>
    <ul class="segs" role="list">${segmentos.map(s => `<li>${s}</li>`).join('')}</ul>
    ${blocoRegioes('a')}
  </div>
</section>`);
}

function formContato(v) {
  return `<form class="form" data-wa-form="${E.wa}" data-assunto="Contato pelo site da Dhiozer">
  <div class="f2"><p><label for="c-nome">Nome</label><input id="c-nome" name="Nome" required autocomplete="name"></p><p><label for="c-emp">Mercado ou empresa</label><input id="c-emp" name="Empresa" autocomplete="organization"></p></div>
  <div class="f2"><p><label for="c-tel">Telefone</label><input id="c-tel" name="Telefone" type="tel" autocomplete="tel"></p><p><label for="c-cid">Cidade</label><input id="c-cid" name="Cidade" autocomplete="address-level2"></p></div>
  <p><label for="c-ass">Assunto</label><input id="c-ass" name="Assunto"></p>
  <p><label for="c-msg">Mensagem</label><textarea id="c-msg" name="Mensagem" rows="5" required></textarea></p>
  <p class="ok-lgpd"><label><input type="checkbox" required> Autorizo a Dhiozer a usar estes dados para responder ao meu contato, conforme a <a href="/${v}/lgpd/">LGPD</a>.</label></p>
  <p><button class="btn ${v === 'a' ? 'btn-azul' : 'btn-ama'}" type="submit">${ic('wa')} Enviar pelo WhatsApp</button></p>
</form>`;
}
const blocoContato = v => `<div class="info">
  <p class="info-l">${ic('pin')}<span><b>Endereço</b>${E.endereco}<br>${E.cidade} · CEP ${E.cep}<br><a href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa</a></span></p>
  <p class="info-l">${ic('wa')}<span><b>Telefone e WhatsApp</b><a href="${waLink()}" target="_blank" rel="noopener">${E.fone}</a></span></p>
  <p class="info-l">${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></p>
  <div class="info-l">${ic('relogio')}<span><b>Horário de funcionamento</b><table class="hor">${E.horario.map(([d, h]) => `<tr><th scope="row">${d}</th><td>${h}</td></tr>`).join('')}</table></span></div>
</div>`;

function contato(v) {
  return pagina(v, 'contato/', 'Contato · Dhiozer Distribuidora', `Endereço, horário, WhatsApp ${E.fone} e e-mail da Dhiozer Distribuidora em Chapecó (SC).`, `
<section class="sec">
  <div class="w">
    <h1 class="tit">${v === 'a' ? 'Estamos prontos para lhe atender!' : 'Contato'}</h1>
    <div class="cont">
      ${blocoContato(v)}
      <div class="cont-form"><h2>Mande uma mensagem</h2>${formContato(v)}</div>
    </div>
    <iframe class="mapa-g" title="Mapa da Dhiozer em Chapecó" loading="lazy" src="https://maps.google.com/maps?q=Rua%20Denilde%20Maria%20Copetti%20765%2C%20Chapec%C3%B3%20SC&z=15&output=embed"></iframe>
  </div>
</section>`);
}

function trabalhe(v) {
  return pagina(v, 'trabalhe-conosco/', 'Trabalhe conosco · Dhiozer Distribuidora', 'Envie seu currículo para a Dhiozer Distribuidora, em Chapecó (SC).', `
<section class="sec">
  <div class="w estreito">
    <h1 class="tit">Trabalhe conosco!</h1>
    <p class="lead">Vendas, logística e escritório: conte um pouco de você. A mensagem abre no seu e-mail endereçada à Dhiozer, e você pode anexar o currículo antes de enviar.</p>
    <form class="form" data-mail-form="${E.email}" data-assunto="Trabalhe conosco">
      <div class="f2"><p><label for="t-nome">Nome completo</label><input id="t-nome" name="Nome" required autocomplete="name"></p><p><label for="t-vaga">Vaga pretendida</label><input id="t-vaga" name="Vaga pretendida" required></p></div>
      <div class="f2"><p><label for="t-tel">Telefone</label><input id="t-tel" name="Telefone" type="tel" required autocomplete="tel"></p><p><label for="t-nasc">Data de nascimento</label><input id="t-nasc" name="Nascimento" type="date"></p></div>
      <p><label for="t-cid">Cidade e bairro</label><input id="t-cid" name="Cidade e bairro"></p>
      <p><label for="t-cv">Breve descrição do seu currículo e suas aptidões</label><textarea id="t-cv" name="Currículo" rows="6" required></textarea></p>
      <p class="ok-lgpd"><label><input type="checkbox" required> Concordo com o tratamento dos meus dados pessoais exclusivamente para avaliação, seleção e eventual recrutamento nos processos de admissão.</label></p>
      <p><button class="btn ${v === 'a' ? 'btn-azul' : 'btn-ama'}" type="submit">${ic('mail')} Enviar candidatura</button></p>
    </form>
  </div>
</section>`);
}

function lgpd(v) {
  return pagina(v, 'lgpd/', 'LGPD · Dhiozer Distribuidora', 'Canal de comunicação e termo de consentimento para tratamento de dados pessoais da Dhiozer Distribuidora.', `
<section class="sec">
  <div class="w estreito texto">
    <h1 class="tit">LGPD</h1>
    <h2>Canal de comunicação</h2>
    <p>Para pedir acesso, correção ou eliminação dos seus dados, ou revogar o consentimento, escreva para <a href="mailto:${E.lgpdEmail}">${E.lgpdEmail}</a> ou <a href="mailto:${E.lgpdCanal}">${E.lgpdCanal}</a>, ou envie correspondência para ${E.endereco}, ${E.cidade}.</p>
    <h2>Termo de consentimento para tratamento de dados pessoais</h2>
    <p>${termoLgpd}</p>
    <h2>Pedidos feitos pelo site</h2>
    <p>A lista de produtos do pedido fica guardada só no seu navegador. Os dados do formulário vão direto para o WhatsApp da Dhiozer quando você toca em enviar; o site não grava nada.</p>
  </div>
</section>`);
}

function pedido(v) {
  return pagina(v, 'pedido/', 'Meu pedido · Dhiozer Distribuidora', 'Revise os produtos e envie o pedido para o supervisor da sua região pelo WhatsApp.', `
<section class="sec">
  <div class="w">
    <h1 class="tit">Meu pedido</h1>
    <div class="ped">
      <div class="ped-lista" data-ped-lista data-vazia="Seu pedido está vazio. Escolha os produtos no catálogo e marque quantas caixas quer."></div>
      <form class="form ped-form" data-pedido>
        <h2>Para quem entregar</h2>
        <p><label for="p-nome">Seu nome</label><input id="p-nome" name="Nome" required autocomplete="name"></p>
        <p><label for="p-emp">Mercado ou empresa</label><input id="p-emp" name="Empresa" required autocomplete="organization"></p>
        <div class="f2"><p><label for="p-cnpj">CNPJ (se já for cliente, opcional)</label><input id="p-cnpj" name="CNPJ" inputmode="numeric"></p><p><label for="p-cid">Cidade</label><input id="p-cid" name="Cidade" required autocomplete="address-level2"></p></div>
        <fieldset class="ped-reg"><legend>Sua região</legend>
          ${regioes.map((r, i) => `<label><input type="radio" name="regiao" value="${r.wa}" data-sup="${r.supervisor}"${i ? '' : ' required'}> ${r.nome} <small>(${r.supervisor})</small></label>`).join('')}
          <label><input type="radio" name="regiao" value="${E.wa}" data-sup="comercial"> Não sei <small>(comercial)</small></label>
        </fieldset>
        <p><label for="p-obs">Observação</label><textarea id="p-obs" name="Observação" rows="3" placeholder="Prazo, forma de pagamento, produto que não achou..."></textarea></p>
        <p><button class="btn ${v === 'a' ? 'btn-azul' : 'btn-ama'}" type="submit">${ic('wa')} Enviar pedido pelo WhatsApp</button></p>
        <p class="nota">Os preços e a data de entrega são confirmados pelo vendedor no WhatsApp.</p>
      </form>
    </div>
  </div>
</section>
${dadosPedido()}`);
}

// ======================= VERSÃO B =======================
function bInicio() {
  const prateleiras = ['Chocolates e bombons', 'Biscoitos', 'Temperos e especiarias', 'Sobremesas', 'Balas e pirulitos', 'Iluminação'].map(c => {
    const ps = catalogo.filter(p => p.cat === c);
    const dez = ps.filter((_, i) => i % Math.max(1, Math.floor(ps.length / 10)) === 0).slice(0, 10);
    return `<section class="prat" aria-labelledby="pr-${dez[0].id}">
  <div class="prat-cab"><h3 id="pr-${dez[0].id}">${esc(c)}</h3><a class="lnk" href="/b/catalogo/?cat=${encodeURIComponent(c)}">Ver ${ps.length} ${ic('seta')}</a></div>
  ${grade(dez, 'b', 'trilho')}
</section>`;
  }).join('\n');
  return pagina('b', '', 'Dhiozer Distribuidora · pedido online para o varejo do oeste de SC', `${catalogo.length} produtos Arcor, Triunfo, Bretzke, Leke, Splash e Taschibra. Monte o pedido e envie ao vendedor da sua região.`, `
<section class="b-hero">
  <div class="w b-hero-in">
    <div class="b-hero-txt">
      <p class="kicker">Distribuidora em Chapecó desde 1997</p>
      <h1>Abasteça o seu mercado sem esperar a visita do vendedor.</h1>
      <p>Arcor, Triunfo, Bretzke, Leke, Splash e Taschibra: ${catalogo.length} produtos com foto e embalagem. Marque as caixas, envie, e o supervisor da sua região confirma no WhatsApp.</p>
      <form class="b-busca" action="/b/catalogo/" role="search"><label class="sr" for="q-hero">Buscar produto</label>${ic('busca')}<input id="q-hero" name="q" type="search" placeholder="O que falta na prateleira?"><button class="btn btn-ama" type="submit">Buscar</button></form>
      <p class="b-atalhos">${['Bon o Bon', 'Muky', 'Pudim', 'Pimenta', 'Wafer', 'LED'].map(t => `<a href="/b/catalogo/?q=${encodeURIComponent(t)}">${t}</a>`).join('')}</p>
    </div>
    <ul class="b-marcas" role="list">${marcas.map(m => `<li><a href="/b/catalogo/${m.id}/"><span class="bm-logo"><img src="/assets/marcas/${m.id}.png" alt="${esc(m.nome)}"></span><span class="bm-n">${porMarca(m).length} itens</span></a></li>`).join('')}</ul>
  </div>
</section>
<section class="sec b-passos">
  <div class="w">
    <h2 class="tit-b">Como comprar</h2>
    <ol class="b-p">${passos.map(([t, d], i) => `<li data-rev style="--ap-d:${i * 120}ms"><span class="b-o" aria-hidden="true">${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
  </div>
</section>
<section class="sec b-prats">
  <div class="w">
    <div class="b-sec-cab"><h2 class="tit-b">Prateleiras</h2><a class="btn btn-azul" href="/b/catalogo/">Catálogo completo ${ic('seta')}</a></div>
    ${prateleiras}
  </div>
</section>
<section class="b-sede">
  <img src="/assets/img/sede.webp" alt="Sede da Dhiozer em Chapecó, junto à BR-282" width="1280" height="720" loading="lazy">
  <div class="w b-sede-in">
    <div class="b-sede-txt">
      <h2>Da garagem de casa a 2.000 m² na BR-282</h2>
      <p>A Dhiozer nasceu em 1997 na garagem dos fundadores. Hoje são 14 profissionais de vendas e 7 veículos entregando no oeste e meio oeste catarinense.</p>
      <ol class="b-linha">${historia.filter(h => ['1997', '2000', '2006', '2013', '2022'].includes(h.ano)).map(h => `<li><b>${h.ano}</b><span>${h.tit}</span></li>`).join('')}</ol>
      <a class="btn btn-ama" href="/b/sobre/">Nossa história ${ic('seta')}</a>
    </div>
  </div>
</section>
<section class="sec">
  <div class="w">
    <h2 class="tit-b">Fale com o supervisor da sua região</h2>
    <p class="lead">${segmentos.join(' · ')}</p>
    ${blocoRegioes('b')}
  </div>
</section>`);
}

function bSobre() {
  return pagina('b', 'sobre/', 'Empresa · Dhiozer Distribuidora', 'A história da Dhiozer Distribuidora: de 1997 na garagem de casa à sede de 2.000 m² junto à BR-282, em Chapecó.', `
<section class="b-pag-topo"><div class="w"><h1>Empresa</h1><p>${E.frase}.</p></div></section>
<section class="sec">
  <div class="w">
    <dl class="b-num">${numeros.map(([n, t]) => `<div><dt data-conta>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>
    <h2 class="tit-b">Linha do tempo</h2>
    <ol class="b-tempo">${historia.map(h => `<li data-rev><figure>${h.img === 'logo' ? '<img src="/assets/logo.svg" alt="Logo atual da Dhiozer" class="t-logo">' : `<img src="/assets/img/${h.img}.webp" alt="${esc(h.tit)}, ${h.ano}" loading="lazy">`}</figure><b>${h.ano}</b><h3>${h.tit}</h3><p>${h.txt}</p></li>`).join('')}</ol>
  </div>
</section>`);
}

function bCatalogo(m) {
  const { chipsCat, lista } = filtros('b', m);
  const lado = `<aside class="b-filtros" aria-label="Filtros">
  <h2>Marcas</h2>
  <ul role="list">${m ? `<li><a href="/b/catalogo/">Todas as marcas</a></li>` : ''}${marcas.map(x => `<li><a href="/b/catalogo/${x.id}/"${m === x ? ' aria-current="page"' : ''}>${esc(x.curto)} <small>${porMarca(x).length}</small></a></li>`).join('')}</ul>
  ${m ? `<h2>Material da marca</h2><p><a class="lnk" href="${m.pdf}" target="_blank" rel="noopener">${ic('pdf')} Catálogo em PDF</a></p>${m.site ? `<p><a class="lnk" href="${m.site}" target="_blank" rel="noopener">${ic('fora')} Site da marca</a></p>` : ''}` : ''}
  <h2>Precisa de ajuda?</h2><p><a class="lnk" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.fone}</a></p>
</aside>`;
  return pagina('b', m ? `catalogo/${m.id}/` : 'catalogo/', `${m ? m.nome : 'Catálogo'} · Dhiozer Distribuidora`, m ? `${m.linhas}: produtos ${m.nome} com pedido pelo WhatsApp da Dhiozer.` : `${catalogo.length} produtos com foto, embalagem e pedido pelo WhatsApp.`, `
<section class="b-pag-topo"><div class="w b-pag-cab">${m ? `<img src="/assets/marcas/${m.id}.png" alt="">` : ''}<div><h1>${m ? esc(m.nome) : 'Catálogo'}</h1><p>${m ? esc(m.texto) : 'Filtre pela marca e pela categoria, marque as caixas e envie o pedido.'}</p></div></div></section>
<section class="sec cat" data-catalogo>
  <div class="w b-cat">
    ${lado}
    <div class="b-cat-main">
      <div class="cat-barra">
        <div class="cat-busca">${ic('busca')}<label class="sr" for="q">Buscar produto</label><input id="q" type="search" data-busca placeholder="Buscar por nome ou código" autocomplete="off"></div>
        <p class="cat-n" aria-live="polite"><b data-n>${lista.length}</b> produtos</p>
        <div class="vis" role="group" aria-label="Exibição"><button type="button" data-vis="grade" aria-pressed="true">Grade</button><button type="button" data-vis="lista" aria-pressed="false">Lista</button></div>
      </div>
      <div class="chips chips-cat" role="group" aria-label="Categoria">${chipsCat}</div>
      ${grade(lista, 'b')}
      <p class="sem-res" data-sem-res hidden>Nenhum produto encontrado. Tente outra palavra ou <a href="${waLink()}" target="_blank" rel="noopener">pergunte no WhatsApp</a>.</p>
    </div>
  </div>
</section>
<div class="barra-ped" data-barra-ped hidden><div class="w"><span><b class="ped-n">0</b> produtos no pedido</span><a class="btn btn-ama" href="/b/pedido/">Revisar e enviar ${ic('seta')}</a></div></div>`);
}

function bArea() {
  return pagina('b', 'area-de-atuacao/', 'Área de atuação · Dhiozer Distribuidora', 'A Dhiozer atende o oeste e o meio oeste de Santa Catarina. Fale direto com o supervisor comercial da sua região.', `
<section class="b-pag-topo"><div class="w"><h1>Área de atuação</h1><p>Oeste e meio oeste de Santa Catarina, com entrega própria a partir de Chapecó.</p></div></section>
<section class="sec">
  <div class="w">
    <ul class="segs" role="list">${segmentos.map(s => `<li>${s}</li>`).join('')}</ul>
    ${blocoRegioes('b')}
  </div>
</section>`);
}

export function gerarVersao(v) {
  const p = {};
  const add = (c, html) => { p[c] = html; };
  if (v === 'a') {
    add('', aInicio()); add('sobre/', aSobre()); add('catalogo/', aCatalogo());
    for (const m of marcas) add(`catalogo/${m.id}/`, aCatalogo(m));
    add('area-de-atuacao/', aArea());
  } else {
    add('', bInicio()); add('sobre/', bSobre()); add('catalogo/', bCatalogo());
    for (const m of marcas) add(`catalogo/${m.id}/`, bCatalogo(m));
    add('area-de-atuacao/', bArea());
  }
  add('contato/', contato(v)); add('trabalhe-conosco/', trabalhe(v)); add('lgpd/', lgpd(v)); add('pedido/', pedido(v));
  return p;
}
