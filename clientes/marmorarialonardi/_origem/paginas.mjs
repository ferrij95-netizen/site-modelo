// Monta as páginas das versões A ("Tradição": fiel ao site atual, faixa azul com o letreiro, botões de menu, as quatro galerias
// Lavatórios / Pias / Lápides / Túmulos) e B ("Monograma": clara, com o monograma M|L, casa e memória lado a lado, filtro de trabalhos).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, fotos, linhas, pedras, frases, passos, valores } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const svg = n => fs.readFileSync(path.join(pub, 'assets', n + '.svg'), 'utf8').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (f, { cls = '', lazy = true, alt } = {}) => {
  const [n, leg, w, h] = typeof f === 'string' ? achar(f) : f;
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt ?? leg)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
};
const todas = Object.values(fotos).flat();
const achar = n => todas.find(f => f[0] === n);
const anos = new Date().getFullYear() - E.desde;

export const nomesVersao = { a: 'Tradição', b: 'Monograma' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'banheiros', nome: 'Lavatórios', caminho: 'banheiros/' },
  { slug: 'cozinhas', nome: 'Pias', caminho: 'cozinhas/' },
  { slug: 'lapides', nome: 'Lápides', caminho: 'lapides/' },
  { slug: 'tumulos', nome: 'Túmulos', caminho: 'tumulos/' },
  { slug: 'localizacao', nome: 'Localização', caminho: 'localizacao/' },
  { slug: 'contato', nome: 'Fale conosco', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M15 6l-6 6 6 6"/>',
  dir: '<path d="M9 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  zoom: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Marmoraria Lonardi e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const ext = 'target="_blank" rel="noopener"';
const fontes = 'https://fonts.googleapis.com/css2?family=Lexend+Zetta:wght@600;700&family=Lexend+Exa:wght@500;600;700&family=Open+Sans:wght@400;600;700&display=swap';

// ---------- moldura ----------
function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
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
<meta name="theme-color" content="#032F60">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: E.nome, foundingDate: String(E.desde), telephone: E.fone, email: E.email, address: { '@type': 'PostalAddress', streetAddress: E.endereco, addressLocality: 'Porto Alegre', addressRegion: 'RS', addressCountry: 'BR' }, openingHours: 'Mo-Fr 09:00-12:00, Mo-Fr 13:30-17:30', url: E.url })}</script>
</head>`;
}

function menuLinks(v, ativo) {
  return nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === ativo ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
}

function topoA(ativo) {
  return `<header class="topo">
  <div class="faixa">
    <a class="marca" href="/a/" aria-label="${E.nome}, início">
      <span class="letreiro">${svg('wordmark')}</span>
      <span class="lema">${svg('lema')}</span>
      <span class="desde">${svg('desde')}</span>
    </a>
    <a class="zap" href="${waLink()}" ${ext}>${ic('wa')}<span>WhatsApp</span></a>
  </div>
  <nav class="botoes" aria-label="Menu principal">
    <button class="abre" type="button" aria-expanded="false" aria-controls="menu-a">${ic('menu')}<span>Menu</span></button>
    <div class="lista" id="menu-a">${menuLinks('a', ativo)}</div>
  </nav>
</header>`;
}

function topoB(ativo) {
  return `<header class="topo">
  <div class="in barra">
    <a class="marca" href="/b/" aria-label="${E.nome}, início">
      <span class="mono">${svg('mono')}</span>
      <span class="nome"><span class="letreiro">${svg('wordmark')}</span><small>Mármores e granitos · desde ${E.desde}</small></span>
    </a>
    <nav class="menu" id="menu-b" aria-label="Menu principal">${menuLinks('b', ativo)}<a class="orc" href="/b/contato/">Orçamento</a></nav>
    <button class="abre" type="button" aria-expanded="false" aria-controls="menu-b">${ic('menu')}<span class="sr">Menu</span></button>
  </div>
</header>`;
}

function rodape(v) {
  const marca = v === 'a'
    ? `<span class="letreiro">${svg('wordmark')}</span><span class="lema">${svg('lema')}</span>`
    : `<span class="mono">${svg('mono')}</span><span class="letreiro">${svg('wordmark')}</span>`;
  return `<footer class="rodape">
  <div class="in grade">
    <div class="r-marca">${marca}<p>Mármores e granitos em Porto Alegre desde ${E.desde}. Pias, lavatórios, lápides e túmulos.</p></div>
    <div><h2>Contato</h2>
      <p><a href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a><br><a href="${waLink()}" ${ext}>${ic('wa')}${E.whats}</a><br><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></p></div>
    <div><h2>Endereço</h2><p><a href="${E.rota}" ${ext}>${ic('pin')}${E.endereco}<br>${E.cidade}</a></p>
      <p class="h">${ic('relogio')}${E.horario[0]}<br>${E.horario[1]}</p></div>
    <div><h2>Páginas</h2><p class="mapa-site">${nav.map(n => `<a href="/${v}/${n.caminho}">${n.nome}</a>`).join('')}</p></div>
  </div>
  <div class="in fim"><span>© ${new Date().getFullYear()} ${E.nome}</span><span>Endereço: ${E.endereco} · ${E.cidade} · Fone/Fax ${E.fone}</span></div>
</footer>
<a class="flutua" href="${waLink()}" ${ext} aria-label="Conversar no WhatsApp">${ic('wa')}</a>
<div class="lb" hidden><button class="lb-x" type="button" aria-label="Fechar">${ic('x')}</button><button class="lb-p" type="button" aria-label="Anterior">${ic('esq')}</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-n" type="button" aria-label="Próxima">${ic('dir')}</button></div>
<script src="/assets/site.js" defer></script>`;
}

function pagina(v, slug, titulo, descricao, corpo) {
  const caminho = nav.find(n => n.slug === slug).caminho;
  return `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${v === 'a' ? topoA(slug) : topoB(slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>`;
}

// ---------- blocos comuns ----------
function galeria(lista, { cls = 'galeria', grupo = '' } = {}) {
  return `<div class="${cls}" data-galeria>${lista.map(f => `<figure${grupo ? ` data-grupo="${grupo === true ? chaveDe(f[0]) : grupo}"` : ''}><button type="button" class="foto" data-lb="/assets/img/${f[0]}.webp" data-leg="${esc(f[1])}" aria-label="Ampliar: ${esc(f[1])}">${img(f)}<span class="lupa">${ic('zoom')}</span></button><figcaption>${esc(f[1])}</figcaption></figure>`).join('')}</div>`;
}
const chaveDe = n => Object.keys(fotos).find(k => fotos[k].some(f => f[0] === n));

function contatoLinhas() {
  return `<ul class="contatos">
  <li>${ic('wa')}<span><b>WhatsApp</b><a href="${waLink()}" ${ext}>${E.whats}</a></span></li>
  <li>${ic('tel')}<span><b>Fone/Fax</b><a href="tel:${E.foneHref}">${E.fone}</a></span></li>
  <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
  <li>${ic('pin')}<span><b>Endereço</b><a href="${E.rota}" ${ext}>${E.endereco}, ${E.cidade}</a></span></li>
  <li>${ic('relogio')}<span><b>Horário</b>${E.horario[0]}, ${E.horario[1]}</span></li>
</ul>`;
}

const mapa = () => `<div class="mapa"><iframe src="${E.mapa}" title="Mapa: ${esc(E.endereco)}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

function formulario() {
  const tipos = ['Pia ou bancada de cozinha', 'Lavatório ou bancada de banheiro', 'Lápide', 'Túmulo', 'Outro trabalho em pedra'];
  return `<form class="orc-form" data-orc novalidate>
  <div class="campos">
    <label>Seu nome<input name="nome" autocomplete="name" required></label>
    <label>Telefone ou WhatsApp<input name="fone" type="tel" autocomplete="tel" required></label>
    <label class="largo">O que você precisa?<select name="tipo">${tipos.map(t => `<option>${t}</option>`).join('')}</select></label>
    <label>Medidas aproximadas<input name="medidas" placeholder="ex.: 2,10 m × 0,60 m"></label>
    <label>Pedra (se já sabe)<input name="pedra" placeholder="granito, mármore, cor..."></label>
    <label class="largo">Mensagem<textarea name="msg" rows="4" placeholder="Conte o que você imagina. Se tiver foto do local, mande depois pelo WhatsApp."></textarea></label>
  </div>
  <p class="erro" hidden>Preencha nome e telefone para enviarmos o orçamento.</p>
  <div class="envia"><button class="btn" type="submit" name="via" value="wa">${ic('wa')}Enviar pelo WhatsApp</button><button class="btn sec" type="submit" name="via" value="mail">${ic('mail')}Enviar por e-mail</button></div>
</form>`;
}

// Simulador de lápide: pedra, letras, símbolo, foto, frase. A prévia é montada com as texturas das pedras das fotos do site atual.
function simulador(v) {
  return `<div class="sim" data-sim>
  <div class="sim-previa">
    <div class="placa" data-pedra="granito-cinza" data-letra="bronze">
      <div class="placa-in">
        <div class="linha-topo"><span class="oval" data-foto></span><span class="simb" data-simb="cruz" aria-hidden="true"></span></div>
        <p class="pn" data-out="nome">Nome Completo</p>
        <p class="pd"><span>★ <i data-out="nasc">01.01.1950</i></span><span>✝ <i data-out="fal">01.01.2026</i></span></p>
        <p class="pf" data-out="frase">Saudades eternas</p>
      </div>
      <span class="assin">LONARDI</span>
    </div>
    <p class="sim-nota">Prévia ilustrativa, feita com as pedras das lápides da Lonardi. O desenho final é combinado na marmoraria.</p>
  </div>
  <div class="sim-campos">
    <fieldset><legend>Pedra</legend><div class="pedras">${pedras.map((p, i) => `<label class="pedra"><input type="radio" name="pedra-${v}" value="${p.id}"${i ? '' : ' checked'}><span style="background-image:url(/assets/img/tex-${p.id}.webp)"></span><b>${p.nome}</b></label>`).join('')}</div></fieldset>
    <label>Nome<input data-in="nome" value="" placeholder="Nome completo" maxlength="40"></label>
    <div class="duas"><label>Nascimento<input data-in="nasc" placeholder="01.01.1950" maxlength="10" inputmode="numeric"></label><label>Falecimento<input data-in="fal" placeholder="01.01.2026" maxlength="10" inputmode="numeric"></label></div>
    <label>Frase<select data-in="frase">${frases.map(f => `<option>${f}</option>`).join('')}<option value="">Sem frase</option></select></label>
    <div class="duas">
      <fieldset><legend>Letras</legend><div class="op"><label><input type="radio" name="letra-${v}" value="bronze" checked>Bronze</label><label><input type="radio" name="letra-${v}" value="gravada">Gravadas</label></div></fieldset>
      <fieldset><legend>Símbolo</legend><div class="op"><label><input type="radio" name="simb-${v}" value="cruz" checked>Cruz</label><label><input type="radio" name="simb-${v}" value="">Nenhum</label></div></fieldset>
    </div>
    <label class="check"><input type="checkbox" data-in="foto" checked>Com foto oval</label>
    <a class="btn" data-sim-wa href="${waLink()}" ${ext}>${ic('wa')}Pedir orçamento desta lápide</a>
  </div>
</div>`;
}

// ---------- versão A: Tradição ----------
function miniGaleria(l) {
  const lista = fotos[l.chave];
  return `<article class="bloco" data-rev>
  <h3><a href="/a/${l.slug}/">${l.nome}</a></h3>
  <div class="mini" data-mini>
    <div class="trilho">${lista.map((f, i) => `<button type="button" class="foto" data-lb="/assets/img/${f[0]}.webp" data-leg="${esc(f[1])}" aria-label="Ampliar: ${esc(f[1])}">${img(f)}</button>`).join('')}</div>
    <button class="mp" type="button" aria-label="Foto anterior">${ic('esq')}</button><button class="mn" type="button" aria-label="Próxima foto">${ic('dir')}</button>
    <span class="cont"><b>1</b>/${lista.length}</span>
  </div>
  <p>${l.texto}</p>
  <a class="mais" href="/a/${l.slug}/">Ver ${lista.length} trabalhos ${ic('seta')}</a>
</article>`;
}

function aIndex() {
  const slides = ['pia-01', 'lapide-04', 'lavatorio-01', 'tumulo-02'];
  return pagina('a', 'index', `${E.nome} · Mármores e granitos em Porto Alegre desde ${E.desde}`,
    `Pias, lavatórios, lápides e túmulos em mármore e granito, sob medida, em Porto Alegre desde ${E.desde}. Orçamento pelo WhatsApp ${E.whats}.`, `
<section class="hero" data-hero>
  <div class="slides">${slides.map((s, i) => `<figure${i ? '' : ' class="on"'}>${img(s, { lazy: i > 0, alt: '' })}</figure>`).join('')}</div>
  <div class="in hero-txt">
    <p class="selo">${E.lema.join(' · ')}</p>
    <h1>Mármores e granitos sob medida, desde ${E.desde}</h1>
    <p class="sub">Pias, lavatórios, lápides e túmulos feitos pela ${E.nome} em Porto Alegre.</p>
    <div class="acoes"><a class="btn" href="${waLink()}" ${ext}>${ic('wa')}Orçamento sem compromisso</a><a class="btn claro" href="#trabalhos">Ver trabalhos</a></div>
  </div>
  <div class="pontos" aria-hidden="true">${slides.map((_, i) => `<i${i ? '' : ' class="on"'}></i>`).join('')}</div>
</section>

<section class="sec folha" id="trabalhos">
  <div class="in">
    <div class="cab"><p class="eye">Nossos trabalhos</p><h2>Quatro linhas, a mesma pedra bem trabalhada</h2></div>
    <div class="blocos">${linhas.map(miniGaleria).join('')}</div>
  </div>
</section>

<section class="sec ano">
  <div class="in ano-grade">
    <div class="ano-num" data-rev><span class="mil">${E.desde}</span><span class="leg"><b data-conta>${anos}</b> anos de marmoraria</span></div>
    <div class="ano-txt">
      <h2>Qualidade, agilidade e tradição</h2>
      <p>O lema que abre o site da Lonardi há anos continua sendo a forma de trabalhar: atendimento direto, orçamento rápido e peças que duram gerações.</p>
      <ul class="tres">${valores.map(x => `<li data-rev><b>${x.t}</b><span>${x.d}</span></li>`).join('')}</ul>
      <a class="btn claro" href="/a/empresa/">Conheça a empresa</a>
    </div>
  </div>
</section>

<section class="sec passos-a">
  <div class="in">
    <div class="cab"><p class="eye">Como pedir</p><h2>Do orçamento à instalação</h2></div>
    <ol class="setas">${passos.map((p, i) => `<li data-rev style="--ap-d:${i * 120}ms"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${p.t}</b><span>${p.d}</span></li>`).join('')}</ol>
  </div>
</section>

<section class="sec chama-lapide">
  <div class="in chama">
    <div class="chama-img">${img('lapide-13')}</div>
    <div>
      <p class="eye">Lápides</p>
      <h2>Monte a lápide antes de vir à marmoraria</h2>
      <p>Escolha a pedra, escreva o nome, as datas e a frase e veja uma prévia. O pedido segue pelo WhatsApp com tudo anotado.</p>
      <a class="btn" href="/a/lapides/#simulador">Abrir o simulador ${ic('seta')}</a>
    </div>
  </div>
</section>

<section class="sec contato-a">
  <div class="in duas-col">
    <div><p class="eye">Fale conosco</p><h2>Solicite seu orçamento sem compromisso</h2>${contatoLinhas()}</div>
    ${mapa()}
  </div>
</section>`);
}

function cabecalho(v, eye, titulo, sub, foto) {
  return `<section class="pg-cab${foto ? ' com-foto' : ''}">${foto ? `<div class="pg-foto">${img(foto, { lazy: false, alt: '' })}</div>` : ''}<div class="in"><p class="eye">${eye}</p><h1>${titulo}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div></section>`;
}

function paginaLinha(v, l, extra = '') {
  const lista = fotos[l.chave];
  const outras = linhas.filter(x => x !== l);
  return pagina(v, l.slug, `${l.curto} · ${E.nome}`, `${l.texto} ${E.nome}, Porto Alegre, desde ${E.desde}.`, `
${cabecalho(v, l.nome, l.curto, l.texto, l.capa)}
<section class="sec">
  <div class="in">
    <div class="cab linha"><h2>${lista.length} trabalhos da Lonardi</h2><a class="btn" href="${waLink(`Olá! Vim pelo site e gostaria de um orçamento de ${l.nome.toLowerCase()}.`)}" ${ext}>${ic('wa')}Orçamento de ${l.nome.toLowerCase()}</a></div>
    ${galeria(lista, { cls: v === 'a' ? 'galeria' : 'galeria mosaico' })}
  </div>
</section>
${extra}
<section class="sec outras">
  <div class="in"><h2>Outros trabalhos</h2><div class="outras-l">${outras.map(o => `<a href="/${v}/${o.slug}/">${img(o.capa, { alt: '' })}<span>${o.nome}</span></a>`).join('')}</div></div>
</section>`);
}

const secSimulador = v => `<section class="sec simula" id="simulador"><div class="in"><div class="cab"><p class="eye">Simulador</p><h2>Monte a sua lápide</h2><p>Escolha a pedra, as letras e a frase. A prévia muda na hora e o pedido vai pronto pelo WhatsApp.</p></div>${simulador(v)}</div></section>`;

function paginaEmpresa(v) {
  return pagina(v, 'empresa', `A empresa · ${E.nome}`, `A ${E.nome} trabalha mármore e granito em Porto Alegre desde ${E.desde}.`, `
${cabecalho(v, 'Empresa', `Marmoraria em Porto Alegre desde ${E.desde}`, `${anos} anos cortando, polindo e instalando mármore e granito, com o mesmo lema: ${E.lema.join(', ').toLowerCase().replace(/, ([^,]*)$/, ' e $1')}.`, 'lapide-04')}
<section class="sec">
  <div class="in duas-col emp">
    <div class="emp-txt">
      <h2>Da cozinha ao cemitério, a mesma pedra bem trabalhada</h2>
      <p>A ${E.nome} faz pias e bancadas de cozinha, lavatórios de banheiro, lápides e túmulos em mármore e granito. Cada peça é feita sob medida e instalada pela própria marmoraria.</p>
      <p>As lápides saem com a assinatura LONARDI gravada no canto, como se vê nas fotos dos trabalhos. É uma marca de quem faz há ${anos} anos e responde pelo que entrega.</p>
      <p>O atendimento é direto: você manda as medidas ou uma foto pelo WhatsApp, recebe o orçamento e combina o prazo com quem vai fazer a peça.</p>
    </div>
    <figure class="emp-foto">${img('lapide-04')}<figcaption>A assinatura LONARDI no canto de uma lápide em mármore bege.</figcaption></figure>
  </div>
</section>
<section class="sec valores">
  <div class="in"><div class="cab"><p class="eye">Desde ${E.desde}</p><h2>${E.lema.join(' · ')}</h2></div>
  <div class="val-l">${valores.map((x, i) => `<div class="val" data-rev style="--ap-d:${i * 120}ms"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${x.t}</h3><p>${x.d}</p></div>`).join('')}</div></div>
</section>
<section class="sec">
  <div class="in"><div class="cab"><p class="eye">O que fazemos</p><h2>Quatro linhas de trabalho</h2></div>
  <div class="linhas-l">${linhas.map(l => `<a class="linha-i" href="/${v}/${l.slug}/">${img(l.capa, { alt: '' })}<span><b>${l.curto}</b>${l.texto}</span></a>`).join('')}</div></div>
</section>`);
}

function paginaLocal(v) {
  return pagina(v, 'localizacao', `Localização · ${E.nome}`, `${E.endereco}, ${E.cidade}. ${E.horario[0]}, ${E.horario[1]}.`, `
${cabecalho(v, 'Localização', 'Venha conhecer a marmoraria', `${E.endereco}, ${E.cidade}.`)}
<section class="sec">
  <div class="in duas-col local">
    <div>
      <h2>${E.nome}</h2>
      <p class="end">${E.endereco}<br>${E.cidade}</p>
      <div class="horario"><h3>Horário de funcionamento</h3><p>${E.horario[0]}:<br><b>das 9h às 12h</b> e <b>das 13h30 às 17h30</b></p></div>
      ${contatoLinhas()}
      <a class="btn" href="${E.rota}" ${ext}>${ic('pin')}Traçar rota até a Lonardi</a>
    </div>
    ${mapa()}
  </div>
</section>`);
}

function paginaContato(v) {
  return pagina(v, 'contato', `Fale conosco · ${E.nome}`, `Solicite seu orçamento sem compromisso: WhatsApp ${E.whats}, fone ${E.fone}, ${E.email}.`, `
${cabecalho(v, 'Fale conosco', 'Solicite seu orçamento sem compromisso!', 'Conte o que você precisa. A resposta vem pelo WhatsApp ou por e-mail, como preferir.')}
<section class="sec">
  <div class="in duas-col contato">
    ${formulario()}
    <aside>${contatoLinhas()}</aside>
  </div>
</section>`);
}

// ---------- versão B: Monograma ----------
function bIndex() {
  const casa = linhas.filter(l => l.grupo === 'casa'), mem = linhas.filter(l => l.grupo === 'memoria');
  const lado = (titulo, txt, lista, cls) => `<div class="lado ${cls}" data-rev>
    <div class="lado-fotos">${lista.map(l => `<a href="/b/${l.slug}/">${img(l.capa, { alt: '' })}<span>${l.nome}</span></a>`).join('')}</div>
    <div class="lado-txt"><h3>${titulo}</h3><p>${txt}</p><p class="ls">${lista.map(l => `<a href="/b/${l.slug}/">${l.curto} ${ic('seta')}</a>`).join('')}</p></div>
  </div>`;
  const destaque = ['pia-07', 'lavatorio-03', 'lapide-11', 'tumulo-01', 'pia-04', 'lapide-09', 'lavatorio-05', 'pia-09'].map(achar);
  return pagina('b', 'index', `${E.nome} · Mármores e granitos em Porto Alegre desde ${E.desde}`,
    `Pias, lavatórios, lápides e túmulos em mármore e granito, sob medida, em Porto Alegre desde ${E.desde}. Orçamento pelo WhatsApp ${E.whats}.`, `
<section class="hero">
  <div class="hero-txt">
    <span class="marca-d">${svg('mono')}</span>
    <p class="eye">Porto Alegre · desde ${E.desde}</p>
    <h1>A pedra certa, cortada na medida</h1>
    <p class="sub">Pias, lavatórios, lápides e túmulos em mármore e granito, feitos e instalados pela ${E.nome}.</p>
    <div class="acoes"><a class="btn" href="${waLink()}" ${ext}>${ic('wa')}Pedir orçamento</a><a class="btn sec" href="#frentes">Ver trabalhos</a></div>
    <dl class="nums"><div><dt data-conta>${anos}</dt><dd>anos de marmoraria</dd></div><div><dt>${todas.length}</dt><dd>trabalhos no site</dd></div><div><dt>4</dt><dd>linhas de trabalho</dd></div></dl>
  </div>
  <div class="hero-fotos">
    <figure class="f1">${img('pia-01', { lazy: false })}</figure>
    <figure class="f2">${img('lavatorio-01', { lazy: false })}</figure>
    <figure class="f3">${img('lapide-04', { lazy: false })}</figure>
  </div>
</section>

<section class="sec frentes" id="frentes">
  <div class="in">
    <div class="cab"><p class="eye">O que fazemos</p><h2>Para a casa e para a memória</h2></div>
    ${lado('Para a sua casa', 'Pias, bancadas e lavatórios em granito e mármore, com recortes para cuba e cooktop e frontões no mesmo material.', casa, 'casa')}
    ${lado('Em memória', 'Lápides com nome, datas, foto e frase, e túmulos em granito polido. Feitos com o cuidado que a homenagem pede.', mem, 'memoria')}
  </div>
</section>

<section class="sec pedras-sec">
  <div class="in">
    <div class="cab"><p class="eye">As pedras</p><h2>Granito e mármore, nas cores dos nossos trabalhos</h2></div>
    <div class="pedras-l">${pedras.map((p, i) => `<a class="pedra-c ${p.tom}" href="/b/lapides/#simulador" data-rev style="--ap-d:${i * 100}ms"><span class="tex" style="background-image:url(/assets/img/tex-${p.id}.webp)"></span><b>${p.nome}</b><span class="usos">${p.fotos.map(f => img(f, { alt: '' })).join('')}</span></a>`).join('')}</div>
    <p class="nota">Texturas tiradas das fotos de trabalhos da Lonardi. Outras cores e acabamentos sob consulta.</p>
  </div>
</section>

<section class="sec trabalhos">
  <div class="in">
    <div class="cab linha"><div><p class="eye">Trabalhos</p><h2>Alguns dos ${todas.length} trabalhos</h2></div>
      <div class="filtro" role="group" aria-label="Filtrar trabalhos"><button type="button" aria-pressed="true" data-f="">Todos</button>${linhas.map(l => `<button type="button" aria-pressed="false" data-f="${l.chave}">${l.nome}</button>`).join('')}</div></div>
    ${galeria([...destaque, ...todas.filter(f => !destaque.includes(f))].slice(0, 14), { cls: 'galeria mosaico filtra', grupo: true })}
  </div>
</section>

<section class="sec ano-b">
  <div class="in ano-grade">
    <p class="mil" aria-hidden="true">${E.desde}</p>
    <div><p class="eye">Como trabalhamos</p><h2>${anos} anos de ${E.lema.map(x => x.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' e $1')}</h2></div>
    <ol class="trilha"><span class="trilho-l" aria-hidden="true"></span>${passos.map((p, i) => `<li data-rev style="--ap-d:${i * 150}ms"><span class="n">${i + 1}</span><b>${p.t}</b><span>${p.d}</span></li>`).join('')}</ol>
  </div>
</section>

${secSimulador('b')}

<section class="sec contato-b">
  <div class="in duas-col">
    <div><p class="eye">Fale conosco</p><h2>Orçamento sem compromisso</h2>${contatoLinhas()}<a class="btn" href="/b/contato/">Montar pedido de orçamento ${ic('seta')}</a></div>
    ${mapa()}
  </div>
</section>`);
}

export function gerarVersao(v) {
  const p = {};
  p.index = v === 'a' ? aIndex() : bIndex();
  p.empresa = paginaEmpresa(v);
  for (const l of linhas) p[l.slug] = paginaLinha(v, l, l.slug === 'lapides' ? secSimulador(v) : '');
  p.localizacao = paginaLocal(v);
  p.contato = paginaContato(v);
  return p;
}
