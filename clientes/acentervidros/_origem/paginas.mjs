// Monta as páginas das versões A ("Fachada", fiel ao site atual: topo escuro, cinza claro com a fachada em diagonal, azul #31699a)
// e B ("Bisotê", azul-marinho do logo, vermelho do letreiro da fachada só como marcador, etapas da peça desenhadas).
// As páginas internas usam o mesmo conteúdo; topo, rodapé, home e listagem de produtos mudam por versão. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, lema, historia, missao, numeros, mercados, servicos, etapas, produtos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Fachada', b: 'Bisotê' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Sobre nós', caminho: 'empresa/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const link = (v, slug) => {
  const p = produtos.find(x => x.slug === slug);
  return p ? `/${v}/produtos/${p.slug}/` : `/${v}/${nav.find(n => n.slug === slug).caminho}`;
};
const whats = msg => `https://api.whatsapp.com/send?phone=${E.whatsHref}&text=${encodeURIComponent(msg)}`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1.1z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  carrinho: '<path d="M3 4h2l2 11h11l2-8H6"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  bisote: '<path d="M3 17h18M3 17l3-6h12l3 6"/><path d="M6 11V7h12v4"/>',
  lapidacao: '<path d="M4 16h16a0 0 0 010 0 3 3 0 01-3 3H7a3 3 0 01-3-3z"/><path d="M4 16V8h16v8"/>',
  movel: '<rect x="4" y="4" width="16" height="14" rx="1"/><path d="M12 4v14M7 21v-3M17 21v-3M9.5 10v2M14.5 10v2"/><path d="M6 7l3 3M15 7l3 3" opacity=".6"/>',
  furo: '<rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="8" cy="12" r="2"/><rect x="13" y="9" width="5" height="6" rx="1"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Perfil da borda do vidro em cada etapa (desenho em corte), usado na versão B.
const perfil = [
  '<rect x="10" y="34" width="100" height="16" class="vd"/><rect x="18" y="26" width="100" height="16" class="vd v2"/>',
  '<rect x="10" y="30" width="100" height="22" class="vd"/><rect x="40" y="30" width="18" height="22" class="furo"/><path d="M76 24v34" class="corte"/>',
  '<path d="M10 30h92a8 11 0 010 22H10z" class="vd"/><path d="M102 30a8 11 0 010 22" class="brilho"/>',
  '<path d="M10 30h86l14 8v6l-14 8H10z" class="vd"/><path d="M96 30l14 8v6l-14 8" class="brilho"/>',
  '<rect x="14" y="44" width="96" height="10" class="vd"/><rect x="14" y="32" width="96" height="10" class="vd v2"/><rect x="14" y="20" width="96" height="10" class="vd v3"/>',
];
const desenhoEtapa = i => `<svg class="perfil" viewBox="0 0 120 70" aria-hidden="true">${perfil[i]}</svg>`;

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
<meta property="og:site_name" content="A Center Vidros">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#31699a' : '#0f2f4f'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,500;0,600;0,700;0,800;1,700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

function topo(v, slug) {
  const ativo = s => (s === slug || (s === 'produtos' && produtos.some(p => p.slug === slug))) ? ' aria-current="page"' : '';
  const menu = nav.map(n => `<a href="${link(v, n.slug)}"${ativo(n.slug)}>${n.nome}</a>`).join('');
  const barra = v === 'a' ? `<div class="barra"><div class="in">
  <a href="tel:${E.telHref}">${ic('tel')} ${E.telefone}</a>
  <a href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
  <a href="${whats('Olá, vim pelo site da A Center Vidros.')}" target="_blank" rel="noopener">${ic('whats')} WhatsApp</a>
</div></div>` : '';
  return `${barra}<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="A Center Vidros, página inicial"><img src="/assets/logo.png" alt="Center Vidros Distribuidora" width="390" height="185"></a>
  <button class="abre-menu" aria-expanded="false" aria-controls="menu">${ic('menu')}<span>Menu</span></button>
  <nav id="menu" class="menu" aria-label="Principal">${menu}
    <a class="btn-loja" href="${E.ecommerce}" target="_blank" rel="noopener">${ic('carrinho')} ${v === 'a' ? 'Compre no nosso e-commerce' : 'E-commerce'}</a>
  </nav>
</div></header>
<main id="conteudo">`;
}

function rodape(v) {
  const prods = produtos.map(p => `<li><a href="${link(v, p.slug)}">${p.nome}</a></li>`).join('');
  return `</main>
<footer class="rodape"><div class="in">
  <div class="rd-marca">
    <span class="rd-logo"><img src="/assets/logo.png" alt="Center Vidros Distribuidora" loading="lazy" width="390" height="185"></span>
    <p>Distribuição de vidros planos para construção civil, arquitetura e decoração e indústria moveleira, no atacado e no varejo, há mais de 30 anos.</p>
    <p class="rd-lema">${lema.map(l => `<span>${l}</span>`).join('')}</p>
  </div>
  <div><h2>Produtos</h2><ul>${prods}</ul></div>
  <div><h2>Empresa</h2><ul>${nav.filter(n => n.slug !== 'index').map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}<li><a href="${E.ecommerce}" target="_blank" rel="noopener">E-commerce</a></li></ul></div>
  <div class="rd-contato"><h2>Contato</h2>
    <p><a href="tel:${E.telHref}">${ic('tel')} ${E.telefone}</a></p>
    <p><a href="${whats('Olá, vim pelo site da A Center Vidros.')}" target="_blank" rel="noopener">${ic('whats')} WhatsApp ${E.whatsapp}</a></p>
    <p><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p>
    <p><a href="${E.mapaLink}" target="_blank" rel="noopener">${ic('pin')} ${E.rua}<br>${E.bairro}</a></p>
  </div>
</div>
<div class="rd-base"><div class="in"><span>© ${new Date().getFullYear()} A Center Vidros · Ribeirão Preto, SP</span><a href="/">Ver as duas versões</a></div></div>
</footer>
<a class="flutua-whats" href="${whats('Olá, vim pelo site da A Center Vidros.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('whats')}<span>Fale conosco</span></a>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => head(v, slug, titulo, descricao) + topo(v, slug) + corpo + rodape(v);

const tituloDuplo = (a, b, tag = 'h2') => `<${tag} class="tit-duplo">${a} <span>${b}</span></${tag}>`;

// Cabeçalho das páginas internas: A cinza com foto em diagonal (como o banner atual), B faixa escura com foto.
const cabeca = (v, sobre, titulo, texto, foto) => v === 'a'
  ? `<section class="cabeca"><div class="cb-txt"><div class="in"><p class="sobre">${sobre}</p><h1 class="tit-duplo">${titulo}</h1>${texto ? `<p>${texto}</p>` : ''}</div></div><figure class="cb-foto">${img(foto, '', ' loading="eager"')}</figure></section>`
  : `<section class="cabeca"><figure class="cb-foto">${img(foto, '', ' loading="eager"')}</figure><div class="in"><p class="sobre">${sobre}</p><h1>${titulo}</h1>${texto ? `<p>${texto}</p>` : ''}</div></section>`;

// ---------- blocos ----------
const blocoNumeros = () => `<section class="numeros"><div class="in"><ul>${numeros.map(n => `<li><strong>${n.n}</strong><span>${n.t}</span></li>`).join('')}</ul></div></section>`;

const blocoServicosA = (v, completo) => `<section class="servicos" id="servicos"><div class="in">
  ${tituloDuplo('Nossos', 'Serviços')}
  <ol class="sv-lista">${servicos.map((s, i) => `<li id="${s.slug}"><span class="sv-num">0${i + 1}</span>${ic(s.icone, 'sv-ic')}<h3>${s.nome}</h3><p>${completo ? s.texto : s.resumo}</p></li>`).join('')}</ol>
  ${completo ? '' : `<a class="btn btn-claro" href="${link(v, 'servicos')}">Ver os serviços ${ic('seta')}</a>`}
</div></section>`;

const blocoEtapas = () => `<section class="etapas"><div class="in">
  <p class="sobre">Do estoque à peça pronta</p>
  <h2>Uma chapa de vidro vira peça sob medida em cinco passos</h2>
  <ol class="et-lista">${etapas.map((e, i) => `<li><span class="et-n">${i + 1}</span>${desenhoEtapa(i)}<h3>${e.nome}</h3><p>${e.texto}</p></li>`).join('')}</ol>
</div></section>`;

const filtroGaleria = v => {
  const itens = produtos.flatMap(p => p.fotos.map(([f, alt]) => ({ p, f, alt })));
  return `<div class="filtro" role="group" aria-label="Filtrar produtos"><button class="ativo" data-filtro="todos" aria-pressed="true">Todos</button>${produtos.map(p => `<button data-filtro="${p.slug}" aria-pressed="false">${p.nome}</button>`).join('')}</div>
  <ul class="galeria">${itens.map(({ p, f, alt }) => `<li data-cat="${p.slug}"><a href="${link(v, p.slug)}">${img(f, alt)}<span><strong>${p.nome}</strong>${esc(alt)}</span></a></li>`).join('')}</ul>`;
};

const vitrine = v => `<ol class="vitrine">${produtos.map((p, i) => `<li><a href="${link(v, p.slug)}">
  <span class="vt-n">0${i + 1}</span>
  <span class="vt-txt"><strong>${p.nome}</strong><span>${p.texto}</span></span>
  <span class="vt-foto">${img(p.capa, p.fotos[0][1])}</span>
  <span class="vt-seta">${ic('seta')}</span>
</a></li>`).join('')}</ol>`;

const formulario = (v, assunto = '') => `<form class="form" data-form novalidate>
  <div class="campo"><label for="f-nome">Nome</label><input id="f-nome" name="nome" autocomplete="name" required></div>
  <div class="campo"><label for="f-tel">Telefone ou WhatsApp</label><input id="f-tel" name="telefone" autocomplete="tel" inputmode="tel"></div>
  <div class="campo"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
  <div class="campo"><label for="f-assunto">Assunto</label><select id="f-assunto" name="assunto">
    ${['Orçamento', ...produtos.map(p => p.nome), 'Serviços (bisotê, lapidação, recortes)', 'Atacado / revenda', 'Outro'].map(o => `<option${o === assunto ? ' selected' : ''}>${o}</option>`).join('')}
  </select></div>
  <div class="campo largo"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="mensagem" rows="5" placeholder="Medidas, espessura, quantidade, acabamento..." required></textarea></div>
  <div class="botoes largo">
    <button class="btn" type="submit" data-via="whats">${ic('whats')} Enviar pelo WhatsApp</button>
    <button class="btn btn-linha" type="submit" data-via="email">${ic('mail')} Enviar por e-mail</button>
  </div>
  <p class="form-aviso largo" role="status" aria-live="polite"></p>
</form>`;

const blocoContato = v => `<section class="contato" id="contato"><div class="in">
  ${tituloDuplo('Entre em', 'Contato')}
  <div class="ct-grade">
    <div class="ct-form"><h3>Envie-nos uma mensagem</h3>${formulario(v)}</div>
    <aside class="ct-info">
      <h3>Localização e informações</h3>
      <p>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></p>
      <p>${ic('tel')}<a href="tel:${E.telHref}">${E.telefone}</a></p>
      <p>${ic('whats')}<a href="${whats('Olá, vim pelo site da A Center Vidros.')}" target="_blank" rel="noopener">${E.whatsapp}</a></p>
      <p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>
      <p>${ic('carrinho')}<a href="${E.ecommerce}" target="_blank" rel="noopener">E-commerce da Center Vidros</a></p>
    </aside>
  </div>
</div>
<div class="mapa"><iframe src="${E.mapa}" title="Mapa: A Center Vidros, Ribeirão Preto" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</section>`;

// ---------- homes ----------
function homeA() {
  return `<section class="hero"><div class="hero-txt"><div class="in">
    <h1 class="lema" aria-label="A Center Vidros: ${lema.join(', ')}">${lema.map(l => `<span>${l}</span>`).join('')}</h1>
    <p>Distribuidora de vidros planos em Ribeirão Preto há mais de 30 anos: espelhos, vidros float, fantasia, temperados e box para banheiro, no atacado e no varejo.</p>
    <div class="botoes"><a class="btn" href="${link('a', 'produtos')}">Produtos ${ic('seta')}</a><a class="btn btn-linha" href="${link('a', 'contato')}">Fale conosco</a></div>
  </div></div><figure class="hero-foto">${img('fachada-larga', 'Vista aérea da sede da A Center Vidros na Via Norte, em Ribeirão Preto', ' loading="eager" fetchpriority="high"')}</figure></section>
  <section class="historia"><div class="in hs-grade">
    <div><h2 class="tit-linha">Nossa história</h2>${historia.slice(0, 2).map(p => `<p>${p}</p>`).join('')}<a class="btn btn-linha" href="${link('a', 'empresa')}">Conheça a empresa ${ic('seta')}</a></div>
    <figure class="hs-foto">${img('fachada', 'Sede da A Center Vidros vista do alto')}</figure>
  </div></section>
  ${blocoNumeros()}
  ${blocoServicosA('a', false)}
  <section class="produtos" id="produtos"><div class="in">${tituloDuplo('Nossos', 'Produtos')}${filtroGaleria('a')}</div></section>
  ${blocoContato('a')}`;
}

function homeB() {
  return `<section class="hero">
    <figure class="hero-foto">${img('temperado-2', 'Escada com guarda-corpo de vidro temperado', ' loading="eager" fetchpriority="high"')}</figure>
    <div class="in">
      <p class="sobre">Distribuidora em Ribeirão Preto · há mais de 30 anos</p>
      <h1>Vidros planos para a obra, o projeto e a fábrica de móveis.</h1>
      <p class="hero-sub">Espelhos, vidros float, fantasia, temperados e box para banheiro, com bisotê, lapidação, furos e recortes. No atacado e no varejo.</p>
      <div class="botoes"><a class="btn" href="${whats('Olá, gostaria de um orçamento.')}" target="_blank" rel="noopener">${ic('whats')} Pedir orçamento</a><a class="btn btn-claro" href="${link('b', 'produtos')}">Ver produtos ${ic('seta')}</a></div>
      <ul class="lema">${lema.map(l => `<li>${l}</li>`).join('')}</ul>
    </div>
  </section>
  <section class="mercados"><div class="in"><ul>${mercados.map((m, i) => `<li><span>0${i + 1}</span><h2>${m.nome}</h2><p>${m.texto}</p></li>`).join('')}</ul></div></section>
  <section class="produtos"><div class="in">
    <div class="sec-topo"><p class="sobre">Produtos</p><h2>Cinco linhas, do vidro comum ao box pronto</h2></div>
    ${vitrine('b')}
  </div></section>
  ${blocoEtapas()}
  <section class="sede"><div class="in sd-grade">
    <figure>${img('fachada', 'Sede da A Center Vidros vista do alto')}<figcaption>${E.rua}, Ribeirão Preto</figcaption></figure>
    <div><p class="sobre">A empresa</p><h2>Três décadas no mercado vidreiro</h2><p>${historia[0]}</p><p>${historia[3]}</p><a class="btn btn-linha" href="${link('b', 'empresa')}">Nossa história ${ic('seta')}</a></div>
  </div></section>
  ${blocoNumeros()}
  <section class="loja"><div class="in">
    <div><h2>Já é cliente? Faça o pedido pela loja online.</h2><p>Clientes cadastrados compram direto pelo e-commerce da Center Vidros. Para se cadastrar, fale com o comercial.</p></div>
    <div class="botoes"><a class="btn" href="${E.ecommerce}" target="_blank" rel="noopener">${ic('carrinho')} Entrar no e-commerce</a><a class="btn btn-claro" href="${link('b', 'contato')}">Quero me cadastrar</a></div>
  </div></section>`;
}

// ---------- internas ----------
function empresaPag(v) {
  return cabeca(v, 'Sobre nós', v === 'a' ? 'Nossa <span>história</span>' : 'Mais de 30 anos no mercado vidreiro', 'Distribuição de vidros planos para construção civil, arquitetura e decoração e indústria moveleira.', v === 'a' ? 'fachada-larga' : 'fachada')
  + `<section class="historia"><div class="in hs-grade">
    <div class="hs-texto">${historia.map(p => `<p>${p}</p>`).join('')}</div>
    <figure class="hs-foto">${img('fachada', 'Sede da A Center Vidros na Via Norte, em Ribeirão Preto')}<figcaption>Sede na Via Norte, Ribeirão Preto</figcaption></figure>
  </div></section>
  <section class="missao"><div class="in"><p class="sobre">Missão</p><blockquote>${missao}</blockquote><ul class="lema">${lema.map(l => `<li>${l}</li>`).join('')}</ul></div></section>
  ${blocoNumeros()}
  <section class="mercados"><div class="in">${v === 'a' ? tituloDuplo('Quem', 'atendemos') : '<h2 class="sec-tit">Quem atendemos</h2>'}<ul>${mercados.map((m, i) => `<li><span>0${i + 1}</span><h3>${m.nome}</h3><p>${m.texto}</p></li>`).join('')}</ul></div></section>`;
}

function servicosPag(v) {
  const corpo = v === 'a' ? blocoServicosA(v, true)
    : `<section class="sv-b"><div class="in">${servicos.map((s, i) => `<article id="${s.slug}" class="sv-item">
      <div class="sv-cab"><span class="sv-num">0${i + 1}</span>${desenhoEtapa([3, 2, 4, 1][i])}</div>
      <div><h2>${s.nome}</h2><p class="sv-resumo">${s.resumo}</p><p>${s.texto}</p>
      <a class="link-seta" href="${whats(`Olá, gostaria de um orçamento de ${s.nome.toLowerCase()}.`)}" target="_blank" rel="noopener">Orçar ${s.nome.toLowerCase()} ${ic('seta')}</a></div>
    </article>`).join('')}</div></section>`;
  return cabeca(v, 'Serviços', v === 'a' ? 'Nossos <span>serviços</span>' : 'Acabamento feito na casa', 'Bisotê, lapidação, espelhamento de móveis, furos e recortes para deixar a peça pronta para instalar.', v === 'a' ? 'espelho-2' : 'espelho-4')
  + corpo + (v === 'b' ? blocoEtapas() : '')
  + `<section class="chamada"><div class="in"><h2>Precisa de uma peça sob medida?</h2><p>Mande as medidas, a espessura e o acabamento que a equipe comercial responde com o orçamento.</p><a class="btn" href="${whats('Olá, preciso de uma peça sob medida.')}" target="_blank" rel="noopener">${ic('whats')} Enviar medidas</a></div></section>`;
}

function produtosPag(v) {
  return cabeca(v, 'Produtos', v === 'a' ? 'Nossos <span>produtos</span>' : 'Produtos', 'Espelhos, vidros float, vidro fantasia, vidro temperado e box para banheiro, no atacado e no varejo.', v === 'a' ? 'float-4' : 'box-3')
  + `<section class="produtos"><div class="in">${v === 'a' ? filtroGaleria(v) : vitrine(v)}</div></section>
  <section class="chamada"><div class="in"><h2>Compra em quantidade?</h2><p>Clientes cadastrados fazem o pedido pelo e-commerce. Para cadastro ou orçamento, fale com o comercial.</p><div class="botoes"><a class="btn" href="${E.ecommerce}" target="_blank" rel="noopener">${ic('carrinho')} E-commerce</a><a class="btn btn-linha" href="${link(v, 'contato')}">Falar com o comercial</a></div></div></section>`;
}

function produtoPag(v, p) {
  const i = produtos.indexOf(p);
  const ant = produtos[(i + produtos.length - 1) % produtos.length], prox = produtos[(i + 1) % produtos.length];
  const svs = p.servicos.map(s => servicos.find(x => x.slug === s));
  return cabeca(v, `<a href="${link(v, 'produtos')}">Produtos</a>`, p.nome, '', p.capa)
  + `<section class="produto"><div class="in pd-grade">
    <div class="pd-txt">
      <p class="pd-lead">${p.texto}</p>
      <h2>Onde se usa</h2>
      <ul class="pd-usos">${p.usos.map(u => `<li>${u}</li>`).join('')}</ul>
      <h2>Serviços para esta linha</h2>
      <ul class="pd-svs">${svs.map(s => `<li><a href="${link(v, 'servicos')}#${s.slug}">${ic(s.icone)} ${s.nome}</a></li>`).join('')}</ul>
      <div class="botoes"><a class="btn" href="${whats(`Olá, gostaria de um orçamento de ${p.nome}.`)}" target="_blank" rel="noopener">${ic('whats')} Orçar ${p.nome.toLowerCase()}</a><a class="btn btn-linha" href="${E.ecommerce}" target="_blank" rel="noopener">${ic('carrinho')} E-commerce</a></div>
    </div>
    <ul class="pd-fotos n${p.fotos.length}">${p.fotos.map(([f, alt]) => `<li><figure>${img(f, alt)}<figcaption>${esc(alt)}</figcaption></figure></li>`).join('')}</ul>
  </div></section>
  <nav class="pd-nav" aria-label="Outros produtos"><div class="in">
    <a href="${link(v, ant.slug)}"><small>Anterior</small>${ant.nome}</a>
    <a href="${link(v, prox.slug)}"><small>Próximo</small>${prox.nome}</a>
  </div></nav>`;
}

function contatoPag(v) {
  return cabeca(v, 'Contato', v === 'a' ? 'Entre em <span>contato</span>' : 'Fale com o comercial', `${E.telefone} · ${E.email}`, v === 'a' ? 'fachada-larga' : 'fachada')
  + blocoContato(v);
}

export function gerarVersao(v) {
  const N = 'A Center Vidros';
  const out = {
    index: pagina(v, 'index', `${N} · Distribuidora de vidros em Ribeirão Preto`, 'Distribuidora de vidros planos em Ribeirão Preto há mais de 30 anos: espelhos, vidros float, fantasia, temperados e box para banheiro, com bisotê, lapidação, furos e recortes.', v === 'a' ? homeA() : homeB()),
    empresa: pagina(v, 'empresa', `Sobre nós · ${N}`, historia[0], empresaPag(v)),
    servicos: pagina(v, 'servicos', `Serviços · ${N}`, 'Bisotê, lapidação, espelhamento de móveis, furos e recortes em vidros e espelhos.', servicosPag(v)),
    produtos: pagina(v, 'produtos', `Produtos · ${N}`, 'Espelhos, vidros float, vidro fantasia, vidro temperado e box para banheiro.', produtosPag(v)),
    contato: pagina(v, 'contato', `Contato · ${N}`, `${E.rua}, ${E.bairro}. ${E.telefone}.`, contatoPag(v)),
  };
  for (const p of produtos) out[`produtos/${p.slug}`] = pagina(v, p.slug, `${p.nome} · ${N}`, p.texto, produtoPag(v, p));
  return out;
}
