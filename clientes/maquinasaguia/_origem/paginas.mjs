// Páginas das duas versões do site da Máquinas Águia.
// A = "Tradição": a mesma ordem da home atual (carrossel amarelo com as máquinas recortadas, os três blocos Empresa,
//     Produtos e Contato, Missão/Visão/Valores ao lado dos depoimentos, rodapé com meio ambiente e BNDES), com
//     cabeçalho claro e o logo na aba amarela pendurada, como hoje.
// B = "Industrial": grafite escuro com faixas amarelas, capa com foto da serra trabalhando, números da empresa,
//     o caminho da tora à peça pronta em etapas clicáveis e as linhas Serraria e Beneficiamento em painéis.
// As páginas internas (catálogo, 46 máquinas, empresa, serviços, notícias, contato) têm a mesma estrutura nas duas.
import * as C from './conteudo.mjs';

const { site, dados } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;
const P = Object.fromEntries(dados.produtos.map(p => [p.slug, p]));
const nomeCompleto = p => p.modelo && p.modelo !== 'Lançamento' ? `${p.nome} ${p.modelo.split(' · ')[0]}` : p.nome;
const curto = (t, n = 150) => t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n)).replace(/[,;:.]$/, '') + '…';
const whats = msg => `https://wa.me/${site.whats}?text=${encodeURIComponent(msg)}`;
const dataBR = d => d.split('-').reverse().join('/');

const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  fabrica: '<path d="M3 21V10l6 4V10l6 4V6l6 3v12z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
  catalogo: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  chave: '<path d="M14.5 6.5a4 4 0 0 0 5 5l-8.5 8.5a2.1 2.1 0 0 1-3-3z"/><path d="M14.5 6.5 17 4l3 3-2.5 2.5"/>',
  ciclo: '<path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  projeto: '<path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>',
  folha: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19 13 11"/>',
  globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z"/>',
  aspas: '<path d="M7 7h4v4c0 3-1.5 5-4 6M14 7h4v4c0 3-1.5 5-4 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const MENU = [['index', 'Home'], ['empresa', 'A empresa'], ['produtos', 'Produtos'], ['servicos', 'Serviços'], ['noticias', 'Notícias'], ['contato', 'Contato']];

export function gerarVersao(v) {
  const A = v === 'a';
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const LP = slug => L('produtos/' + slug);
  const ativo = slug => slug.split('/')[0];
  const nav = slug => MENU.map(([s, t]) => `<a href="${L(s)}"${ativo(slug) === s ? ' aria-current="page"' : ''}>${t}</a>`).join('');

  const head = (slug, titulo, desc, ogImg) => {
    const url = site.dominio + L(slug);
    const og = ogImg ? `${site.dominio}/assets/img/${ogImg}.webp` : `${site.dominio}/assets/og-${v}.jpg`;
    return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Máquinas Águia">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
${ogImg ? '' : '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@700;900&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>`;
  };

  const topbar = () => `<div class="topbar"><div class="in">
  <span class="tb-fone">Ligue agora: <a href="${site.foneHref}">${site.fone}</a><a class="tb-whats" href="${whats('Olá, vim pelo site da Máquinas Águia.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${ico('whats')}</a></span>
  <span class="tb-dir"><a href="mailto:${site.email}">${ico('email')}${site.email}</a><a href="${site.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ico('facebook')}</a></span>
</div></div>`;

  const header = slug => `${A ? topbar() : ''}<header class="topo"><div class="in">
  <a class="logo" href="${L('index')}" aria-label="Máquinas Águia, início"><img src="/assets/logo-cor.svg" alt="Máquinas Águia, desde 1969, São José dos Pinhais" width="188" height="157"></a>
  ${A ? '' : `<span class="marca-txt"><b>Máquinas Águia</b><small>Desde 1969 · São José dos Pinhais</small></span>`}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span><b class="sr">Menu</b></button>
  <nav id="menu" aria-label="Principal">${nav(slug)}<a class="btn btn-menu" href="${L('contato')}">Solicitar orçamento</a></nav>
</div></header>`;

  const footer = () => `<footer class="rodape"><div class="in r-grid">
  <div><h3>Páginas</h3>${MENU.map(([s, t]) => `<a href="${L(s)}">${t}</a>`).join('')}</div>
  <div><h3>Últimas notícias</h3>${dados.noticias.slice(0, 4).map(n => `<a href="${L('noticias/' + n.slug)}">${esc(C.tituloNoticia[n.slug])}</a>`).join('')}</div>
  <div class="r-contato"><h3>Contato</h3>
    <p>${ico('pin')}<span>${site.endereco}<br>${site.cidade}<br>CEP ${site.cep}</span></p>
    <p>${ico('fone')}<a href="${site.foneHref}">+55 ${site.fone}</a></p>
    <p>${ico('whats')}<a href="${whats('Olá, vim pelo site da Máquinas Águia.')}" target="_blank" rel="noopener">WhatsApp</a></p>
    <p>${ico('email')}<a href="mailto:${site.email}">${site.email}</a></p>
    <div class="bndes">${img('bndes', 'Aceitamos BNDES')}</div>
  </div>
  <div class="r-meio"><h3>Meio ambiente</h3><figure>${img('eucalipto', 'Floresta de eucalipto vista de baixo')}<figcaption>"${C.empresa.meioAmbiente}"</figcaption></figure></div>
</div><div class="r-base"><div class="in"><img src="/assets/${A ? 'logo-cor' : 'logo-cor'}.svg" alt="" width="40" height="33"><span>© ${new Date().getFullYear()} ${site.razao} · São José dos Pinhais (PR)</span><span>Prévia do novo site</span></div></div></footer>
<a class="whats-flut" href="${whats('Olá, vim pelo site da Máquinas Águia e gostaria de um orçamento.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ico('whats')}</a>
<script src="/assets/aguia.js" defer></script>
</body>
</html>`;

  const pagina = (slug, titulo, desc, corpo, ogImg) => `${head(slug, titulo, desc, ogImg)}
<body class="v-${v} p-${ativo(slug)}">
${header(slug)}
<main>
${corpo}
</main>
${footer()}`;

  const trilha = itens => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Home</a>${itens.map(([t, h]) => `<span>/</span>${h ? `<a href="${h}">${esc(t)}</a>` : `<b>${esc(t)}</b>`}`).join('')}</nav>`;

  const capaInterna = (titulo, texto, itens, foto) => `<section class="capa-int${foto ? ' com-foto' : ''}">
  ${foto ? `<div class="ci-foto">${img(foto, '', 'fetchpriority="high"')}</div>` : ''}
  <div class="in">${trilha(itens)}<h1>${titulo}</h1>${texto ? `<p>${texto}</p>` : ''}</div>
</section>`;

  const ctaFinal = () => `<section class="cta-final"><div class="in">
  <div><span class="kicker">Fale com a fábrica</span><h2>Precisa de uma máquina para a sua serraria ou linha de beneficiamento?</h2><p>Atendimento direto da fábrica em São José dos Pinhais (PR) e revendas em SP, RS, SC e RO.</p></div>
  <div class="cta-acoes"><a class="btn btn-escuro" href="${whats('Olá, vim pelo site da Máquinas Águia e gostaria de um orçamento.')}" target="_blank" rel="noopener">${ico('whats')}Orçamento pelo WhatsApp</a><a class="btn btn-linha-escuro" href="${site.foneHref}">${ico('fone')}${site.fone}</a></div>
</div></section>`;

  // ---------- peças ----------
  const cartao = p => `<a class="maq" href="${LP(p.slug)}" data-cats="${p.cats.join(' ')}">
  <span class="maq-foto">${img('c-' + p.slug, nomeCompleto(p))}</span>
  <span class="maq-txt"><small>${p.modelo || '&nbsp;'}</small><b>${esc(p.nome)}</b><span class="maq-mais">Ver máquina ${ico('seta')}</span></span>
</a>`;

  const linhaDe = p => p.cats.includes('serraria') ? 'serraria' : 'beneficiamento';

  const processoA = () => `<ol class="proc-a">${C.processo.map((e, i) => `<li><span class="pa-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.p}</p>
  <a class="pa-maq" href="${LP(e.slugs[0])}">${img('c-' + e.slugs[0], nomeCompleto(P[e.slugs[0]]))}<span>${esc(nomeCompleto(P[e.slugs[0]]))}</span></a>
  <span class="pa-mais">+ ${e.slugs.length - 1} máquinas nesta etapa</span></li>`).join('')}</ol>`;

  const processoB = () => `<div class="proc-b" data-abas>
  <div class="pb-lista" role="tablist" aria-label="Etapas">${C.processo.map((e, i) => `<button role="tab" id="pb-t${i}" aria-controls="pb-p${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}><span>${String(i + 1).padStart(2, '0')}</span>${e.t}</button>`).join('')}</div>
  <div class="pb-paineis">${C.processo.map((e, i) => `<div class="pb-painel" role="tabpanel" id="pb-p${i}" aria-labelledby="pb-t${i}"${i ? ' hidden' : ''}>
    <p class="pb-desc"><b>${String(i + 1).padStart(2, '0')} · ${e.t}.</b> ${e.p}</p>
    <div class="pb-maqs">${e.slugs.map(s => `<a href="${LP(s)}">${img('c-' + s, nomeCompleto(P[s]))}<span><small>${P[s].modelo || 'Máquinas Águia'}</small>${esc(P[s].nome)}</span></a>`).join('')}</div>
  </div>`).join('')}</div>
</div>`;

  const valoresAcc = () => `<div class="acc">
  <details open><summary>Missão</summary><p>${C.empresa.missao}</p></details>
  <details><summary>Visão</summary><p>${C.empresa.visao}</p></details>
  <details><summary>Valores</summary><ul>${C.empresa.valores.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul></details>
</div>`;

  const depoimentosSlider = () => `<div class="depo" data-depo>${C.depoimentos.map((d, i) => `<figure class="depo-item"${i ? ' hidden' : ''}><blockquote>${d.t}</blockquote><figcaption><b>${d.n}</b> · ${d.e}</figcaption></figure>`).join('')}
  <div class="depo-nav">${C.depoimentos.map((d, i) => `<button type="button" aria-label="Depoimento ${i + 1}" aria-pressed="${i === 0}"></button>`).join('')}</div></div>`;

  const noticiasCards = (lista = dados.noticias.slice(0, 3)) => `<div class="news">${lista.map(n => `<a class="nw" href="${L('noticias/' + n.slug)}">${img(C.fotoNoticia[n.slug], C.tituloNoticia[n.slug])}<span><time datetime="${n.data}">${dataBR(n.data)}</time><b>${esc(C.tituloNoticia[n.slug])}</b></span></a>`).join('')}</div>`;

  const linhasPaineis = () => `<div class="linhas">${Object.entries(C.linhas).map(([k, l]) => `<a class="linha linha-${k}" href="${L('produtos/' + k)}">
  ${img(l.img, 'Linha ' + l.nome)}
  <div><span class="kicker">Linha</span><h3>${l.nome}</h3><p>${l.texto}</p>
  <ul>${l.cats.map(([, n]) => `<li>${n}</li>`).join('')}</ul><b class="link-seta">Ver ${dados.produtos.filter(p => p.cats.includes(k)).length} máquinas ${ico('seta')}</b></div></a>`).join('')}</div>`;

  const servicosLista = () => `<div class="serv">${C.servicos.map(s => `<article><span class="sv-ico">${ico(s.ico)}</span><h3>${s.t}</h3><p>${s.p}</p></article>`).join('')}</div>`;

  const numerosFaixa = () => `<ul class="numeros">${C.numeros.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>`;

  const destaquesCatalogo = ['multi-processadora-de-blocos', 'carro-porta-toras-pneumatico-cpa-800', 'serra-de-fita-desdobro-horizontal-dh-110', 'serra-circular-multilaminas-sm350', 'serras-de-fita-geminadas-gemeas', 'torno-tubular-ttr-160p', 'rosqueadeira-externa-pneumatica-rec-p', 'plaina-moldureira-pmr100'];

  // ---------- Home ----------
  const homeA = () => `<section class="slider" data-slider aria-roledescription="carrossel" aria-label="Destaques">
  ${C.destaques.map((d, i) => `<div class="slide${i ? '' : ' ativo'}" aria-hidden="${i ? 'true' : 'false'}">
    <div class="in">
      <figure class="sl-maq">${img(d.img, d.t, i ? '' : 'fetchpriority="high" loading="eager"')}</figure>
      <div class="sl-txt"><span class="kicker">${d.k}</span><${i ? 'h2' : 'h1'}>${d.t}</${i ? 'h2' : 'h1'}><p class="sl-faixa">${d.p}</p>
      <div class="sl-acoes"><a class="btn btn-escuro" href="${LP(d.slug)}">Conheça a máquina ${ico('seta')}</a><a class="btn btn-linha-escuro" href="${L('produtos')}">Todas as máquinas</a></div></div>
    </div></div>`).join('')}
  <div class="sl-nav">${C.destaques.map((d, i) => `<button type="button" aria-label="${esc(d.t)}" aria-pressed="${i === 0}"></button>`).join('')}</div>
</section>

<section class="trio"><div class="in">
  <a class="tr" href="${L('empresa')}"><span class="tr-ico">${ico('fabrica')}</span><div><h2>A Empresa</h2><p>${curto(C.empresa.intro, 170)}</p><b class="link-seta">Continue lendo ${ico('seta')}</b></div></a>
  <a class="tr" href="${L('produtos')}"><span class="tr-ico">${ico('catalogo')}</span><div><h2>Produtos</h2><p>Toda a linha de máquinas para serrarias, para produção de cabos de vassoura, rosqueadeiras, refiladeiras, destopadeiras, plainas e indústria moveleira.</p><b class="link-seta">Ver o catálogo ${ico('seta')}</b></div></a>
  <a class="tr" href="${L('contato')}"><span class="tr-ico">${ico('fone')}</span><div><h2>Contato</h2><p>Em caso de dúvidas, fale conosco pelo telefone e WhatsApp ${site.fone} ou pelo formulário de contato.</p><b class="link-seta">Fale conosco ${ico('seta')}</b></div></a>
</div></section>

<section class="sec"><div class="in">
  <div class="sec-tit"><h2>Nossas linhas</h2><span class="tit-linha"></span></div>
  ${linhasPaineis()}
</div></section>

<section class="sec sec-grafite"><div class="in">
  <div class="sec-tit claro"><h2>Da tora à peça pronta</h2><span class="tit-linha"></span><p>Onde cada máquina Águia entra na serraria e no beneficiamento da madeira.</p></div>
  ${processoA()}
</div></section>

<section class="sec"><div class="in">
  <div class="sec-tit"><h2>Máquinas em destaque</h2><span class="tit-linha"></span></div>
  <div class="grade-maq">${destaquesCatalogo.map(s => cartao(P[s])).join('')}</div>
  <p class="centro"><a class="btn" href="${L('produtos')}">Ver as ${dados.produtos.length} máquinas do catálogo ${ico('seta')}</a></p>
</div></section>

<section class="sec sec-creme"><div class="in duas">
  <div><div class="sec-tit"><h2>Máquinas Águia</h2><span class="tit-linha"></span></div>${valoresAcc()}</div>
  <div><div class="sec-tit"><h2>Depoimentos</h2><span class="tit-linha"></span></div>${depoimentosSlider()}</div>
</div></section>

<section class="meio"><div class="in">
  <figure class="meio-foto">${img('eucalipto', 'Floresta de eucalipto vista de baixo')}<span class="meio-ico">${ico('folha')}</span></figure>
  <div><span class="kicker">Meio ambiente</span><h2>Máquinas Águia e o meio ambiente</h2><p>"${C.empresa.meioAmbiente}"</p></div>
</div></section>

<section class="sec"><div class="in">
  <div class="sec-tit"><h2>Notícias</h2><span class="tit-linha"></span></div>
  ${noticiasCards()}
</div></section>
${ctaFinal()}`;

  const homeB = () => `<section class="capa-b">
  <div class="cb-foto">${img('serrando', 'Máquina Águia serrando um bloco de madeira', 'fetchpriority="high" loading="eager"')}</div>
  <div class="in">
    <span class="kicker">Fabricante desde 1969 · São José dos Pinhais (PR)</span>
    <h1>Máquinas para serraria e beneficiamento de madeira.</h1>
    <p>Precisão de corte e automação: multilâminas, serras de fita, carros porta toras, plainas e máquinas para cabos de vassoura, com mais de 50 modelos e máquinas especiais.</p>
    <div class="cb-acoes"><a class="btn" href="${L('produtos')}">Ver o catálogo ${ico('seta')}</a><a class="btn btn-linha-claro" href="${whats('Olá, vim pelo site da Máquinas Águia e gostaria de um orçamento.')}" target="_blank" rel="noopener">${ico('whats')}Orçamento</a></div>
  </div>
  <div class="cb-num"><div class="in">${numerosFaixa()}</div></div>
</section>

<section class="sec sec-escuro"><div class="in">
  <div class="sec-tit claro"><span class="kicker">Da tora à peça pronta</span><h2>Uma máquina Águia em cada etapa</h2><p>Escolha a etapa da sua produção e veja as máquinas da Águia para ela.</p></div>
  ${processoB()}
</div></section>

<section class="lanc"><div class="in lanc-grid">
  <figure>${img('r-multiprocessador', 'Multiprocessador de Blocos Máquinas Águia')}</figure>
  <div><span class="kicker">Lançamento Máquinas Águia</span><h2>Multiprocessador de Blocos</h2>
    <p class="lead">Um novo conceito em sistema de corte: desdobra blocos em múltiplas tábuas, ripas ou réguas em uma só passagem, com lâminas de 2,3 mm.</p>
    <dl class="ficha"><div><dt>Altura de corte</dt><dd>160 mm</dd></div><div><dt>Largura de passagem</dt><dd>500 mm</dd></div><div><dt>Espessura do corte</dt><dd>2,3 a 2,6 mm</dd></div><div><dt>Ø do disco</dt><dd>200 a 260 mm</dd></div></dl>
    <a class="btn btn-escuro" href="${LP('multi-processadora-de-blocos')}">Ver a máquina ${ico('seta')}</a></div>
</div></section>

<section class="sec"><div class="in">
  <div class="sec-tit"><span class="kicker">Catálogo</span><h2>Duas linhas, ${dados.produtos.length} máquinas</h2></div>
  ${linhasPaineis()}
</div></section>

<section class="sec sec-creme"><div class="in emp-b">
  <figure class="emp-foto">${img('serraria-instalada', 'Serraria equipada com máquinas Águia')}<figcaption>Serraria equipada com máquinas Águia</figcaption></figure>
  <div><span class="kicker">A empresa</span><h2>Mais de 50 anos fabricando máquinas para madeira</h2><p class="lead">${C.empresa.historia}</p><p>${C.empresa.mercados}</p>
  <ul class="mercados">${C.mercados.map(m => `<li>${ico('globo')}${m}</li>`).join('')}</ul>
  <a class="link-seta" href="${L('empresa')}">Conheça a empresa ${ico('seta')}</a></div>
</div></section>

<section class="sec sec-escuro"><div class="in">
  <div class="sec-tit claro"><span class="kicker">Serviços</span><h2>Assistência, restauração e ferramentaria</h2></div>
  ${servicosLista()}
</div></section>

<section class="sec"><div class="in depo-b">
  ${C.depoimentos.map(d => `<figure><span class="aspas">${ico('aspas')}</span><blockquote>${d.t}</blockquote><figcaption><b>${d.n}</b>${d.e}</figcaption></figure>`).join('')}
</div></section>

<section class="sec sec-creme"><div class="in">
  <div class="sec-tit"><span class="kicker">Notícias</span><h2>Feiras, lançamentos e reconhecimentos</h2></div>
  ${noticiasCards()}
</div></section>
${ctaFinal()}`;

  const pags = {};
  pags.index = pagina('index', 'Máquinas Águia · Máquinas para serraria e beneficiamento de madeira desde 1969', 'Fabricante de máquinas para serraria, beneficiamento de madeira e cabos de vassoura em São José dos Pinhais (PR), desde 1969.', A ? homeA() : homeB());

  // ---------- A empresa ----------
  pags.empresa = pagina('empresa', 'A empresa · Máquinas Águia', C.empresa.historia, `${capaInterna('A empresa', 'Fabricante de máquinas para serraria e beneficiamento de madeira desde 1969.', [['A empresa']], A ? null : 'painel-tensao')}
<section class="sec"><div class="in emp-grid">
  <div><p class="lead">${C.empresa.intro} ${C.empresa.modelos}</p><p>${C.empresa.servicos}</p><p>${C.empresa.historia}</p><p>${C.empresa.estrutura}</p><p>${C.empresa.mercados}</p></div>
  <figure class="emp-foto">${img('serraria-instalada', 'Serraria equipada com máquinas Águia')}<figcaption>Serraria equipada com máquinas Águia</figcaption></figure>
</div></section>
<section class="sec sec-grafite"><div class="in">${numerosFaixa()}</div></section>
<section class="sec"><div class="in mvv">
  <article class="mv"><h2>Missão</h2><p>${C.empresa.missao}</p></article>
  <article class="mv"><h2>Visão</h2><p>${C.empresa.visao}</p></article>
  <article class="mv mv-val"><h2>Valores</h2><ul>${C.empresa.valores.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul></article>
</div></section>
<section class="sec sec-creme"><div class="in duas">
  <div><div class="sec-tit"><h2>Revendas</h2><span class="tit-linha"></span></div><p>Além da venda direta pela fábrica em São José dos Pinhais:</p><ul class="revendas">${C.revendas.map(([c, uf]) => `<li><b>${uf}</b>${c}</li>`).join('')}</ul></div>
  <div><div class="sec-tit"><h2>Mercados</h2><span class="tit-linha"></span></div><ul class="mercados">${C.mercados.map(m => `<li>${ico('globo')}${m}</li>`).join('')}</ul></div>
</div></section>
<section class="meio"><div class="in">
  <figure class="meio-foto">${img('eucalipto', 'Floresta de eucalipto vista de baixo')}<span class="meio-ico">${ico('folha')}</span></figure>
  <div><span class="kicker">Meio ambiente</span><h2>Máquinas Águia e o meio ambiente</h2><p>"${C.empresa.meioAmbiente}"</p></div>
</div></section>
${ctaFinal()}`);

  // ---------- Serviços ----------
  pags.servicos = pagina('servicos', 'Serviços · Máquinas Águia', C.empresa.servicos, `${capaInterna('Serviços', C.empresa.servicos, [['Serviços']], A ? null : 'engrenagens')}
<section class="sec"><div class="in">${servicosLista()}</div></section>
<section class="sec sec-creme"><div class="in emp-grid">
  <div><span class="kicker">Manutenção de serras</span><h2>Equipamentos para a afiação e a tensão das lâminas</h2><p class="lead">A Águia também fabrica as máquinas que mantêm as serras da sua serraria afiadas e tensionadas.</p>
  <ul class="lista-maq">${['afiadeira-para-serras-de-fita-e-circulares-a-2', 'recalcador', 'igualador', 'laminadeira-tensionadora', 'afiadeira-para-facas-de-torno-e-similares'].map(s => `<li><a href="${LP(s)}">${ico('seta')}${esc(nomeCompleto(P[s]))}</a></li>`).join('')}</ul></div>
  <figure class="emp-foto">${img('painel-tensao', 'Detalhe de máquina Águia')}</figure>
</div></section>
${ctaFinal()}`);

  // ---------- Produtos ----------
  const chips = () => `<div class="chips" role="toolbar" aria-label="Filtrar máquinas">
  <button type="button" data-f="" aria-pressed="true">Todas <small>${dados.produtos.length}</small></button>
  ${Object.entries(C.linhas).map(([k, l]) => `<button type="button" data-f="${k}" aria-pressed="false">${l.nome} <small>${dados.produtos.filter(p => p.cats.includes(k)).length}</small></button>`).join('')}
  <span class="chips-sep"></span>
  ${[...new Map(Object.values(C.linhas).flatMap(l => l.cats)).entries()].map(([c, n]) => `<button type="button" data-f="${c}" aria-pressed="false" class="sub">${n} <small>${dados.produtos.filter(p => p.cats.includes(c)).length}</small></button>`).join('')}
</div>`;

  pags.produtos = pagina('produtos', 'Produtos · Máquinas Águia', 'Catálogo com as 46 máquinas da Máquinas Águia para serraria, beneficiamento de madeira, cabos de vassoura e indústria moveleira.', `${capaInterna('Produtos', 'Toda a linha de máquinas e equipamentos para serrarias, para a produção de cabos de vassoura, rosqueadeiras, serras circulares, refiladeiras, destopadeiras, plainas e para a indústria moveleira.', [['Produtos']], A ? null : 'serraria-instalada')}
<section class="sec"><div class="in">
  ${linhasPaineis()}
</div></section>
<section class="sec sec-creme" id="catalogo"><div class="in">
  <div class="sec-tit"><h2>Catálogo completo</h2><span class="tit-linha"></span></div>
  ${chips()}
  <div class="grade-maq" data-grade>${dados.produtos.map(cartao).join('')}</div>
</div></section>
${ctaFinal()}`);

  for (const [k, l] of Object.entries(C.linhas)) {
    const daLinha = dados.produtos.filter(p => p.cats.includes(k));
    const usados = new Set();
    const grupos = l.cats.map(([c, n]) => [c, n, daLinha.filter(p => p.cats.includes(c) && !usados.has(p.slug) && usados.add(p.slug))]).filter(g => g[2].length);
    pags['produtos/' + k] = pagina('produtos/' + k, `${l.nome} · Máquinas Águia`, l.texto, `${capaInterna(`Linha ${l.nome}`, l.texto, [['Produtos', L('produtos')], [l.nome]], A ? null : l.img)}
<section class="sec"><div class="in">
  <nav class="ancoras" aria-label="Categorias">${grupos.map(([c, n, ps]) => `<a href="#${c}">${n} <small>${ps.length}</small></a>`).join('')}</nav>
  ${grupos.map(([c, n, ps]) => `<div class="grupo" id="${c}"><div class="sec-tit"><h2>${n}</h2><span class="tit-linha"></span></div><div class="grade-maq">${ps.map(cartao).join('')}</div></div>`).join('')}
</div></section>
${ctaFinal()}`);
  }

  // ---------- cada máquina ----------
  const etapaDe = s => C.processo.findIndex(e => e.slugs.includes(s));
  for (const p of dados.produtos) {
    const k = linhaDe(p);
    const fotos = p.fotos.slice(0, 4).map((f, i) => `p-${p.slug}-${i + 1}`);
    const cats = [...new Set(C.linhas[k].cats.filter(([c]) => p.cats.includes(c)).map(([, n]) => n))];
    const rel = dados.produtos.filter(o => o.slug !== p.slug && o.cats.some(c => !['serraria', 'beneficiamento'].includes(c) && p.cats.includes(c))).slice(0, 4);
    const html = p.html.replace(/\[\[img:[^\]]+\]\]/g, () => img('torno-tubular-desenho', 'Desenho das características físicas do torno tubular'))
      .replace(/<table>/g, '<div class="tabela"><table>').replace(/<\/table>/g, '</table></div>');
    const et = etapaDe(p.slug);
    const msg = `Olá, vim pelo site da Máquinas Águia e gostaria de um orçamento da máquina ${nomeCompleto(p)}.`;
    pags['produtos/' + p.slug] = pagina('produtos/' + p.slug, `${nomeCompleto(p)} · Máquinas Águia`, curto(p.resumo, 155), `<section class="prod-topo"><div class="in">
  ${trilha([['Produtos', L('produtos')], [C.linhas[k].nome, L('produtos/' + k)], [p.nome]])}
  <div class="prod-grid">
    <div class="galeria-prod" data-galeria>
      <figure class="gp-principal">${img(fotos[0], nomeCompleto(p), 'fetchpriority="high" loading="eager"')}</figure>
      ${fotos.length > 1 ? `<div class="gp-mini">${fotos.map((f, i) => `<button type="button" data-src="/assets/img/${f}.webp" aria-pressed="${i === 0}" aria-label="Foto ${i + 1}">${img(f, '')}</button>`).join('')}</div>` : ''}
    </div>
    <div class="prod-info">
      <span class="kicker">${C.linhas[k].nome}${cats.length ? ' · ' + cats.join(' · ') : ''}</span>
      <h1>${esc(p.nome)}</h1>
      ${p.modelo ? `<p class="modelo">${p.modelo === 'Lançamento' ? 'Lançamento' : 'Modelo ' + p.modelo}</p>` : ''}
      <p class="lead">${esc(p.resumo)}</p>
      ${et >= 0 ? `<p class="etapa">${ico('engrenagem')}<span>Etapa ${et + 1} de ${C.processo.length} na serraria: <b>${C.processo[et].t}</b></span></p>` : ''}
      <div class="prod-acoes"><a class="btn" href="${whats(msg)}" target="_blank" rel="noopener">${ico('whats')}Solicitar orçamento</a><a class="btn btn-linha" href="${site.foneHref}">${ico('fone')}${site.fone}</a></div>
    </div>
  </div>
</div></section>
<section class="sec prod-desc"><div class="in prod-desc-grid">
  <article class="texto-prod"><h2>Descrição</h2>${html}</article>
  <aside class="prod-lado">
    <div class="pl-box"><h3>Orçamento direto da fábrica</h3><p>Diga a madeira, a produção e as medidas que você trabalha e a Águia indica o modelo certo.</p><a class="btn" href="${whats(msg)}" target="_blank" rel="noopener">${ico('whats')}WhatsApp</a><a class="pl-link" href="mailto:${site.email}?subject=${encodeURIComponent('Orçamento: ' + nomeCompleto(p))}">${ico('email')}${site.email}</a></div>
    <div class="pl-cats"><h3>Linha ${C.linhas[k].nome}</h3>${C.linhas[k].cats.map(([c, n]) => `<a href="${L('produtos/' + k)}#${c}"${p.cats.includes(c) ? ' class="sim"' : ''}>${n}</a>`).join('')}</div>
  </aside>
</div></section>
${rel.length ? `<section class="sec sec-creme"><div class="in"><div class="sec-tit"><h2>Produtos relacionados</h2><span class="tit-linha"></span></div><div class="grade-maq">${rel.map(cartao).join('')}</div></div></section>` : ''}
${ctaFinal()}`, fotos[0]);
  }

  // ---------- Notícias ----------
  pags.noticias = pagina('noticias', 'Notícias · Máquinas Águia', 'Lançamentos, feiras e reconhecimentos da Máquinas Águia.', `${capaInterna('Notícias', 'Lançamentos, feiras e reconhecimentos da Máquinas Águia.', [['Notícias']], A ? null : 'fiep-2')}
<section class="sec"><div class="in">${noticiasCards(dados.noticias)}</div></section>
${ctaFinal()}`);
  for (const n of dados.noticias) {
    const t = C.tituloNoticia[n.slug];
    const corpo = n.html.replace(/<p>(https?:\/\/|www\.)[^<]*<\/p>/g, m => {
      const u = m.replace(/<\/?p>/g, '');
      const prod = u.match(/\/produto\/([^/]+)\//);
      if (prod && P[prod[1]]) return `<p><a class="link-seta" href="${LP(prod[1])}">Ver ${esc(nomeCompleto(P[prod[1]]))} ${ico('seta')}</a></p>`;
      return '';
    }).replace(/<ul> <li><strong>Confira [^<]*<\/strong><\/li> <\/ul>/g, '');
    pags['noticias/' + n.slug] = pagina('noticias/' + n.slug, `${t} · Máquinas Águia`, curto(n.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(), 155), `<section class="capa-int"><div class="in">${trilha([['Notícias', L('noticias')], [t]])}<time class="data" datetime="${n.data}">${dataBR(n.data)}</time><h1>${t}</h1></div></section>
<section class="sec"><div class="in noticia">
  <figure class="nt-foto">${img(C.fotoNoticia[n.slug], t)}</figure>
  <article class="texto-prod">${corpo}${n.slug.startsWith('homenagem') ? `<div class="nt-galeria">${img('fiep-2', 'Placas da homenagem da FIEP')}${img('fiep-3', 'Evento da FIEP')}</div>` : ''}${n.slug.startsWith('propaganda') ? `<div class="nt-galeria">${img('revista-pagina', 'Página da revista Referência Industrial')}</div>` : ''}
  <p><a class="link-seta voltar" href="${L('noticias')}">${ico('voltar')}Todas as notícias</a></p></article>
</div></section>
${ctaFinal()}`, C.fotoNoticia[n.slug]);
  }

  // ---------- Contato ----------
  const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'Outro país'];
  pags.contato = pagina('contato', 'Contato · Máquinas Águia', `Telefone e WhatsApp ${site.fone}, e-mail ${site.email}. ${site.endereco}, ${site.cidade}.`, `${capaInterna('Contato', 'Em caso de dúvidas, entre em contato pelo telefone e WhatsApp ou preencha o formulário. A mensagem chega no WhatsApp da fábrica.', [['Contato']], A ? null : 'linha-instalada')}
<section class="sec"><div class="in contato-grid">
  <div class="dados-contato">
    <a href="${site.foneHref}">${ico('fone')}<span><small>Telefone e WhatsApp</small>+55 ${site.fone}</span></a>
    <a href="${whats('Olá, vim pelo site da Máquinas Águia.')}" target="_blank" rel="noopener">${ico('whats')}<span><small>WhatsApp</small>Chamar agora</span></a>
    <a href="mailto:${site.email}">${ico('email')}<span><small>E-mail</small>${site.email}</span></a>
    <div>${ico('pin')}<span><small>Endereço</small>${site.endereco}<br>${site.cidade}<br>${site.caixaPostal} · CEP ${site.cep}</span></div>
  </div>
  <form class="form" data-form>
    <h2>Formulário de contato</h2>
    <div class="f2"><label>Nome *<input name="Nome" required autocomplete="name"></label><label>Telefone *<input name="Telefone" required type="tel" autocomplete="tel"></label></div>
    <div class="f2"><label>E-mail *<input name="E-mail" required type="email" autocomplete="email"></label><label>Razão social *<input name="Razão social" required autocomplete="organization"></label></div>
    <div class="f3"><label>Assunto *<input name="Assunto" required></label><label>Estado *<select name="Estado" required><option value=""></option>${estados.map(e => `<option>${e}</option>`).join('')}</select></label><label>Cidade *<input name="Cidade" required autocomplete="address-level2"></label></div>
    <label>Mensagem *<textarea name="Mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ico('whats')}Enviar pelo WhatsApp</button>
  </form>
</div></section>
<section class="sec sec-creme" id="localizacao"><div class="in">
  <div class="sec-tit"><h2>Localização</h2><span class="tit-linha"></span><p>${site.endereco}, ${site.cidade}, região metropolitana de Curitiba.</p></div>
  <div class="mapa"><iframe src="${site.mapa}" title="Mapa: Máquinas Águia em São José dos Pinhais" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
  <p class="centro"><a class="btn btn-linha" href="${site.rota}" target="_blank" rel="noopener">Traçar rota ${ico('externo')}</a></p>
</div></section>`);
  return pags;
}
