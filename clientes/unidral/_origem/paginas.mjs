// Monta as páginas das versões A ("Oficina": fiel ao site atual, faixa dourada, menu preto, fotos passando no topo)
// e B ("Pressão": clara e técnica, desenho do cilindro com o serviço de cada parte, etapas do recondicionamento).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, textos as T, servicos, areas, marcas, etapas, partes, fotos, categorias } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const F = Object.fromEntries(fotos.map(f => [f.n, f]));
const img = (n, alt, { p = false, cls = '', lazy = true } = {}) => {
  const f = F[n], w = p ? Math.round(f.w * 560 / Math.max(f.w, f.h)) : f.w, h = p ? Math.round(f.h * 560 / Math.max(f.w, f.h)) : f.h;
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/g/${n}${p ? '-p' : ''}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
};

export const nomesVersao = { a: 'Oficina', b: 'Pressão' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'portfolio', nome: 'Portfólio', caminho: 'portfolio/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  esq: '<path d="M15 5l-7 7 7 7"/>',
  dir: '<path d="M9 5l7 7-7 7"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const wa = (w, txt = 'Olá! Vim pelo site da Unidral e gostaria de um orçamento.') => `https://wa.me/${w.wa}?text=${encodeURIComponent(txt)}`;
const ext = 'target="_blank" rel="noopener"';

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
<meta property="og:site_name" content="${E.completo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1D1D1B">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:wdth,wght@112.5..125,500..700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const btnMenu = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa"><div class="in">
  <span>${ic('relogio')} ${E.horario}</span>
  <span class="so-pc">${ic('pin')} ${E.rua} – ${E.cidade}</span>
</div></div>
<header class="topo">
  <div class="in topo-marca">
    <a class="marca" href="/a/" aria-label="Unidral, página inicial"><img src="/assets/logo.svg" alt="Unidral Cilindros Hidráulicos" width="250" height="59"></a>
    <div class="topo-contato so-pc"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].txt}</a></div>
    ${btnMenu}
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in">${menu(v, atual)}<a class="menu-wa" href="${wa(E.whats[0])}" ${ext}>${ic('wa')} WhatsApp</a></div></nav>
</header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Unidral, página inicial"><img src="/assets/logo.svg" alt="Unidral Cilindros Hidráulicos" width="190" height="45"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].txt}</a></nav>
  <a class="btn-topo" href="/b/contato/">Pedir orçamento</a>
  ${btnMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Unidral Cilindros Hidráulicos" width="220" height="52"><p>Bombas e cilindros hidráulicos em Piracicaba e região. Atendimento 24 horas, 7 dias na semana, 365 dias no ano.</p></div>
  <div><h3>Telefones</h3><p>${E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join('<br>')}</p><h3>WhatsApp</h3><p>${E.whats.map(w => `<a href="${wa(w)}" ${ext}>${w.txt}</a>`).join('<br>')}</p></div>
  <div><h3>Endereço</h3><p>${E.rua}<br>${E.cidade}</p><p><a href="mailto:${E.email}">${E.email}</a></p><a class="rod-link" href="${E.mapa}" ${ext}>${ic('pin')} Ver no mapa</a></div>
  <nav aria-label="Rodapé"><h3>Navegação rápida</h3>${menu(v, '')}</nav>
</div><p class="rod-fim">Unidral · Todos os direitos reservados</p></footer>
<a class="wa-flut" href="${wa(E.whats[0])}" ${ext} aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === slug).caminho, titulo, descricao)}
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

// ---------- blocos usados nas duas versões ----------
const marcasHtml = `<ul class="marcas">${marcas.map(m => `<li><img src="/assets/img/${m.f}" alt="${m.n}" width="${m.w}" height="120" loading="lazy"></li>`).join('')}</ul>`;

function galeria() {
  const filtros = `<div class="filtros" role="group" aria-label="Filtrar trabalhos"><button type="button" data-filtro="" aria-pressed="true">Todos <small>${fotos.length}</small></button>${Object.entries(categorias).map(([c, n]) => `<button type="button" data-filtro="${c}" aria-pressed="false">${n} <small>${fotos.filter(f => f.c === c).length}</small></button>`).join('')}</div>`;
  const itens = fotos.map((f, i) => `<li data-cat="${f.c}"><a href="/assets/img/g/${f.n}.webp" data-luz data-legenda="${esc(categorias[f.c])}">${img(f.n, `${categorias[f.c]}: trabalho entregue pela Unidral (${i + 1})`, { p: true })}</a></li>`).join('');
  return `${filtros}<ul class="galeria">${itens}</ul>
<dialog class="luz" aria-label="Foto ampliada"><figure><img alt=""><figcaption></figcaption></figure>
<button type="button" class="luz-x" aria-label="Fechar">${ic('x')}</button><button type="button" class="luz-ant" aria-label="Foto anterior">${ic('esq')}</button><button type="button" class="luz-prox" aria-label="Próxima foto">${ic('dir')}</button></dialog>`;
}

function formulario(v) {
  return `<form class="form" data-form>
  <label>Nome *<input name="nome" required autocomplete="name"></label>
  <label>E-mail *<input name="email" type="email" required autocomplete="email"></label>
  <label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label>
  <label>Equipamento ou peça<input name="equipamento" placeholder="Ex.: cilindro da lança de escavadeira"></label>
  <label class="largo">Mensagem<textarea name="mensagem" rows="4"></textarea></label>
  <p class="largo aviso">Ao enviar este formulário você concorda que a Unidral armazenará e utilizará os dados fornecidos para entrar em contato com você.</p>
  <div class="largo botoes"><button class="btn" type="submit" data-via="whats">${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-2" type="submit" data-via="email">${ic('mail')} Enviar por e-mail</button></div>
</form>`;
}

const contatos = () => `<dl class="contatos">
  <div><dt>${ic('tel')} Telefones</dt><dd>${E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join('')}</dd></div>
  <div><dt>${ic('wa')} WhatsApp</dt><dd>${E.whats.map(w => `<a href="${wa(w)}" ${ext}>${w.txt}</a>`).join('')}</dd></div>
  <div><dt>${ic('mail')} E-mail</dt><dd><a href="mailto:${E.email}">${E.email}</a></dd></div>
  <div><dt>${ic('pin')} Endereço</dt><dd>${E.rua}<br>${E.cidade}</dd></div>
</dl>`;

const mapa = `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: ${E.rua}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

// Desenho do cilindro (versão B): olhal traseiro, camisa, cabeçote, haste e olhal da haste, com os números das partes.
const cilindro = `<svg class="cil" viewBox="-34 0 1070 260" role="img" aria-label="Desenho de um cilindro hidráulico com as partes numeradas">
<defs>
  <linearGradient id="cam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4c4f"/><stop offset=".3" stop-color="#8a8d91"/><stop offset=".55" stop-color="#5b5e62"/><stop offset="1" stop-color="#2c2e30"/></linearGradient>
  <linearGradient id="cromo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa0a6"/><stop offset=".35" stop-color="#f4f6f8"/><stop offset=".6" stop-color="#b9bfc5"/><stop offset="1" stop-color="#6c7278"/></linearGradient>
  <linearGradient id="ouro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0b93a"/><stop offset="1" stop-color="#9c780c"/></linearGradient>
</defs>
<g class="cil-pecas">
  <path d="M40 130a46 46 0 1 1 0 .1z" fill="none" stroke="url(#cam)" stroke-width="26"/>
  <rect x="78" y="104" width="60" height="52" rx="6" fill="url(#cam)"/>
  <rect x="130" y="70" width="450" height="120" rx="10" fill="url(#cam)"/>
  <rect x="150" y="84" width="410" height="92" rx="4" fill="none" stroke="#c69b12" stroke-width="2" stroke-dasharray="7 6" opacity=".75"/>
  <rect x="300" y="88" width="34" height="84" rx="3" fill="url(#ouro)" opacity=".9"/>
  <rect x="570" y="78" width="70" height="104" rx="8" fill="url(#ouro)"/>
  <rect x="604" y="78" width="8" height="104" fill="#1d1d1b" opacity=".35"/>
  <rect x="640" y="109" width="250" height="42" rx="3" fill="url(#cromo)"/>
  <rect x="880" y="102" width="40" height="56" rx="6" fill="url(#cam)"/>
  <path d="M958 130a40 40 0 1 1 0 .1z" fill="none" stroke="url(#cam)" stroke-width="22"/>
</g>
<g class="cil-num" font-family="Saira, sans-serif" font-weight="700" font-size="22">
  <line x1="360" y1="70" x2="360" y2="30"/><circle cx="360" cy="26" r="17"/><text x="360" y="34">1</text>
  <line x1="760" y1="109" x2="760" y2="30"/><circle cx="760" cy="26" r="17"/><text x="760" y="34">2</text>
  <line x1="605" y1="182" x2="605" y2="230"/><circle cx="605" cy="234" r="17"/><text x="605" y="242">3</text>
  <line x1="40" y1="176" x2="40" y2="230"/><circle cx="40" cy="234" r="17"/><text x="40" y="242">4</text>
</g>
</svg>`;

const etapasHtml = cls => `<ol class="${cls}">${etapas.map((e, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>`;

// ---------- versão A: Oficina ----------
function paginasA() {
  const hero = ['g-73', 'g-77', 'g-75', 'g-74'];
  const cab = (titulo, sub, foto) => `<section class="cab-pag"><div class="cab-foto">${img(foto, '', { lazy: false })}</div><div class="in"><p class="olho">Unidral · Piracicaba e Região</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  const fale = `<section class="fale"><div class="in">
  <div class="fale-24"><p class="olho">Fale conosco</p><h2>Atendimento<br><b>24 hrs</b></h2><ul><li><b>7</b> dias na semana</li><li><b>365</b> dias no ano</li></ul></div>
  ${contatos()}
</div></section>`;

  const index = `<section class="hero">
  <div class="slides" data-slides>${hero.map((n, i) => `<figure${i ? '' : ' class="on"'}>${img(n, 'Cilindros e bombas hidráulicas entregues pela Unidral', { lazy: i > 0 })}</figure>`).join('')}</div>
  <div class="in hero-txt">
    <p class="olho">Bombas e cilindros hidráulicos · Piracicaba e Região</p>
    <h1>Fabricação e recondicionamento de cilindros hidráulicos</h1>
    <p>Para toda a linha Mobil: escavadeiras, carregadeiras de rodas, retroescavadeiras e equipamentos das marcas mais renomadas.</p>
    <div class="botoes"><a class="btn" href="/a/contato/">Solicitar orçamento ${ic('seta')}</a><a class="btn btn-claro" href="/a/portfolio/">Ver portfólio</a></div>
  </div>
  <div class="in"><div class="pontos" data-slides-pontos></div></div>
</section>

<section class="intro"><div class="in">
  <figure class="intro-foto">${img('g-01', 'Técnico da Unidral montando as vedações de um pistão')}</figure>
  <div class="intro-txt"><p class="olho">A Unidral</p><h2>Projetos de acordo com a necessidade de cada cliente</h2><p>${T.diferencial}</p><p>${T.linhaMobil}</p>
  <ul class="tripe"><li>Qualidade técnica</li><li>Flexibilidade comercial</li><li>Lead time de atendimento</li></ul></div>
</div></section>

<section class="maq"><div class="in"><h2 class="tit-linha">Maquinários atendidos</h2>${marcasHtml}</div></section>

<section class="servs"><div class="in">
  <div class="tit-sec"><p class="olho">O que fazemos</p><h2>Produtos e serviços</h2></div>
  <ul class="servs-grade">${servicos.map((s, i) => `<li><a href="/a/servicos/#s${i + 1}">${img(s.foto, '', { p: true })}<span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3></a></li>`).join('')}</ul>
</div></section>

<section class="areas"><div class="in">
  <div class="tit-sec"><p class="olho">Onde trabalhamos</p><h2>Áreas de atuação</h2><p>Cilindros e bombas para equipamentos que não podem parar, do campo ao porto.</p></div>
  <ul class="areas-lista">${areas.map(a => `<li>${a}</li>`).join('')}</ul>
</div></section>

<section class="port-faixa"><div class="in">
  <div class="tit-sec tit-lado"><div><p class="olho">Portfólio</p><h2>Trabalhos entregues</h2></div><a class="link-seta" href="/a/portfolio/">Ver todos os ${fotos.length} trabalhos ${ic('seta')}</a></div>
  <ul class="port-tira">${['g-52', 'g-37', 'g-18', 'g-06', 'g-72', 'g-41'].map(n => `<li>${img(n, 'Trabalho entregue pela Unidral', { p: true })}</li>`).join('')}</ul>
</div></section>
${fale}`;

  const servicosPg = `${cab('Serviços', T.supervisao, 'g-77')}
<section class="s-lista"><div class="in">${servicos.map((s, i) => `<article id="s${i + 1}" class="s-item">
  <figure>${img(s.foto, s.t, { p: true })}</figure>
  <div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2><p>${s.txt}</p></div>
</article>`).join('')}</div></section>

<section class="etapas-a"><div class="in">
  <div class="tit-sec"><p class="olho">Do recebimento à entrega</p><h2>Como recuperamos o seu cilindro</h2></div>
  ${etapasHtml('setas')}
</div></section>

<section class="prev"><div class="in">
  <figure>${img('g-70', 'Usinagem de peça no torno da Unidral')}</figure>
  <div><p class="olho">Manutenção preventiva</p><h2>Máquina parada é sinônimo de prejuízo</h2><p>${T.preventiva}</p><p>${T.parado}</p><p class="destaque">${T.logistica}</p></div>
</div></section>

<section class="areas areas-curta"><div class="in"><h2 class="tit-linha">Áreas de atuação</h2><ul class="areas-lista">${areas.map(a => `<li>${a}</li>`).join('')}</ul></div></section>
${fale}`;

  const portfolio = `${cab('Portfólio', T.portfolio, 'g-75')}
<section class="port"><div class="in">${galeria()}</div></section>
${fale}`;

  const contato = `${cab('Contato', 'E nós responderemos o mais rápido possível!', 'g-73')}
<section class="ct"><div class="in">
  <div class="ct-info"><h2>Fale com a Unidral</h2><p>Atendimento 24 hrs, 7 dias na semana, 365 dias no ano. Escritório de ${E.horario.toLowerCase()}.</p>${contatos()}</div>
  <div class="ct-form"><h2>Peça um orçamento</h2>${formulario('a')}</div>
</div></section>
${mapa}`;

  return {
    index: pagina('a', 'index', 'Unidral · Bombas e Cilindros Hidráulicos | Piracicaba e Região', 'Fabricação e recondicionamento de cilindros hidráulicos e pneumáticos, brunimento, cromação, bombas hidráulicas e usinagem em Piracicaba. Atendimento 24 hrs.', index),
    servicos: pagina('a', 'servicos', 'Serviços · Unidral Cilindros Hidráulicos', 'Cilindros Mill Type, soldados, tirantados e ISO 6020/6022, brunimento e retífica, cromação, bombas hidráulicas, usinagem e manutenção preventiva.', servicosPg),
    portfolio: pagina('a', 'portfolio', 'Portfólio · Unidral Cilindros Hidráulicos', 'Cilindros, bombas e peças entregues pela Unidral para clientes de todo o Brasil.', portfolio),
    contato: pagina('a', 'contato', 'Contato · Unidral Cilindros Hidráulicos', `Telefones, WhatsApp e endereço da Unidral em Piracicaba/SP. ${E.rua}.`, contato),
  };
}

// ---------- versão B: Pressão ----------
function paginasB() {
  const cab = (olho, titulo, sub) => `<section class="cab-b"><div class="in"><p class="olho">${olho}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  const fim = `<section class="fim-b"><div class="in">
  <div><h2>Cilindro parado?<br>Fale com a Unidral.</h2><p>Atendimento 24 hrs, 7 dias na semana, 365 dias no ano.</p></div>
  <div class="fim-tels">${E.whats.map(w => `<a href="${wa(w)}" ${ext}>${ic('wa')}<span><small>WhatsApp</small>${w.txt}</span></a>`).join('')}${E.fones.map(f => `<a href="tel:${f.href}">${ic('tel')}<span><small>Telefone</small>${f.txt}</span></a>`).join('')}</div>
</div></section>`;

  const index = `<section class="hero-b"><div class="in">
  <div class="hero-b-txt">
    <p class="olho">Bombas e cilindros hidráulicos · Piracicaba/SP</p>
    <h1>Máquina parada é sinônimo de prejuízo.</h1>
    <p>A Unidral fabrica e recondiciona cilindros hidráulicos e pneumáticos e recupera bombas hidráulicas para que o seu equipamento volte a trabalhar o quanto antes.</p>
    <div class="botoes"><a class="btn" href="/b/contato/">Pedir orçamento ${ic('seta')}</a><a class="btn btn-2" href="${wa(E.whats[0])}" ${ext}>${ic('wa')} WhatsApp</a></div>
  </div>
  <figure class="hero-b-foto">${img('g-73', 'Cilindros hidráulicos recondicionados pela Unidral, prontos para entrega', { lazy: false })}<figcaption><b>24 hrs</b><span>7 dias na semana<br>365 dias no ano</span></figcaption></figure>
</div></section>

<section class="marcas-b"><div class="in"><p>Linha Mobil: escavadeiras, carregadeiras de rodas, retroescavadeiras e equipamentos de marcas como</p>${marcasHtml}</div></section>

<section class="anat"><div class="in">
  <div class="tit-sec"><p class="olho">Recondicionamento completo</p><h2>Cada parte do cilindro, um serviço da Unidral</h2></div>
  <div class="anat-des">${cilindro}</div>
  <ol class="anat-lista">${partes.map(p => `<li><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>
</div></section>

<section class="etapas-b"><div class="in">
  <div class="tit-sec"><p class="olho">Do recebimento à entrega</p><h2>Como o seu equipamento volta a trabalhar</h2></div>
  ${etapasHtml('linha')}
</div></section>

<section class="servs-b"><div class="in">
  <div class="servs-b-tit"><p class="olho">Produtos e serviços</p><h2>Tudo em cilindros e bombas hidráulicas, num só lugar</h2><p>${T.diferencial}</p><a class="link-seta" href="/b/servicos/">Ver os serviços ${ic('seta')}</a></div>
  <ol class="servs-b-lista">${servicos.map((s, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${s.t}</h3><p>${s.txt}</p></div></li>`).join('')}</ol>
</div></section>

<section class="setores"><div class="in"><p class="olho">Áreas de atuação</p><p class="setores-lista">${areas.map(a => `<span>${a}</span>`).join('')}</p></div></section>

<section class="mosaico"><div class="in">
  <div class="tit-sec tit-lado"><div><p class="olho">Portfólio</p><h2>Entregues para clientes de todo o Brasil</h2></div><a class="link-seta" href="/b/portfolio/">Ver portfólio ${ic('seta')}</a></div>
  <div class="mos">${['g-52', 'g-74', 'g-77', 'g-01', 'g-79'].map(n => `<figure>${img(n, 'Trabalho entregue pela Unidral', { p: n !== 'g-52' })}</figure>`).join('')}</div>
</div></section>

<section class="prev-b"><div class="in">
  <figure>${img('g-70', 'Usinagem no torno da Unidral')}</figure>
  <div><p class="olho">Manutenção preventiva</p><h2>Vamos até a sua empresa antes que o equipamento pare</h2><p>${T.preventiva}</p><p>${T.logistica}</p></div>
</div></section>
${fim}`;

  const servicosPg = `${cab('Serviços', 'Recuperação com engenharia e garantia', T.supervisao)}
<section class="sb-lista"><div class="in">${servicos.map((s, i) => `<article id="s${i + 1}">
  <span class="n">${String(i + 1).padStart(2, '0')}</span><div class="sb-txt"><h2>${s.t}</h2><p>${s.txt}</p></div><figure>${img(s.foto, s.t, { p: true })}</figure>
</article>`).join('')}</div></section>

<section class="anat anat-curta"><div class="in">
  <div class="tit-sec"><p class="olho">Recondicionamento completo</p><h2>O que recuperamos em cada parte</h2></div>
  <div class="anat-des">${cilindro}</div>
  <ol class="anat-lista">${partes.map(p => `<li><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>
</div></section>

<section class="etapas-b"><div class="in">
  <div class="tit-sec"><p class="olho">Do recebimento à entrega</p><h2>Etapas do serviço</h2></div>
  ${etapasHtml('linha')}
</div></section>

<section class="dupla"><div class="in">
  <div><h2>Manutenção preventiva</h2><p>${T.preventiva}</p></div>
  <div><h2>Logística própria</h2><p>${T.logistica} ${T.parado}</p></div>
</div></section>

<section class="setores"><div class="in"><p class="olho">Áreas de atuação</p><p class="setores-lista">${areas.map(a => `<span>${a}</span>`).join('')}</p></div></section>
${fim}`;

  const portfolio = `${cab('Portfólio', 'Trabalhos entregues', T.portfolio)}
<section class="port port-b"><div class="in">${galeria()}</div></section>
${fim}`;

  const contato = `${cab('Contato', 'Peça seu orçamento', 'E nós responderemos o mais rápido possível!')}
<section class="ct ct-b"><div class="in">
  <div class="ct-form">${formulario('b')}</div>
  <div class="ct-info">${contatos()}<p class="horario">${ic('relogio')} Escritório: ${E.horario.toLowerCase()}.<br>Atendimento 24 hrs, 7 dias na semana, 365 dias no ano.</p></div>
</div></section>
${mapa}`;

  return {
    index: pagina('b', 'index', 'Unidral · Cilindros e Bombas Hidráulicas em Piracicaba', 'Fabricação e recondicionamento de cilindros hidráulicos e bombas para a linha Mobil. Atendimento 24 hrs, 7 dias na semana, 365 dias no ano.', index),
    servicos: pagina('b', 'servicos', 'Serviços · Unidral', 'Brunimento, retífica, cromação, usinagem, bombas hidráulicas e cilindros Mill Type, soldados, tirantados e ISO 6020/6022.', servicosPg),
    portfolio: pagina('b', 'portfolio', 'Portfólio · Unidral', 'Cilindros, bombas e peças entregues pela Unidral.', portfolio),
    contato: pagina('b', 'contato', 'Contato · Unidral', `Telefones, WhatsApp e endereço da Unidral em Piracicaba/SP. ${E.rua}.`, contato),
  };
}

export const gerarVersao = v => (v === 'a' ? paginasA() : paginasB());
