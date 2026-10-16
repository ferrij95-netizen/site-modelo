// Monta as páginas das versões A ("Precision", escura, inspirada no Metalferri) e B ("Lights-out", clara e teal).
// As páginas internas usam o mesmo conteúdo; a home e o topo de cada página mudam por versão. Estilos em public/assets/{base,a,b}.css.
import {
  empresa as E, sobre, numeros, servicos, industrias, certificados, equipamentos, inspecao, software, modulosQualidade, jobboss,
  noticias, videos, materiais, vaga, orcamento,
} from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Precision', b: 'Lights-out' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { nome: 'About Us', filhos: [
    { slug: 'about', nome: 'Our Story', caminho: 'about/' },
    { slug: 'facilities', nome: 'Facilities', caminho: 'facilities/' },
    { slug: 'quality', nome: 'Quality Control', caminho: 'quality/' },
    { slug: 'software', nome: 'Software', caminho: 'software/' },
    { slug: 'videos', nome: 'Videos', caminho: 'videos/' },
  ] },
  { nome: 'Capabilities', filhos: [
    { slug: 'steel-machining', nome: 'Steel Machining', caminho: 'steel-machining/' },
    { slug: 'aluminum-machining', nome: 'Aluminum Machining', caminho: 'aluminum-machining/' },
  ] },
  { slug: 'news', nome: 'News', caminho: 'news/' },
  { slug: 'careers', nome: 'Careers', caminho: 'careers/' },
  { slug: 'contact', nome: 'Contact Us', caminho: 'contact/' },
];

const I = {
  aviao: '<path d="M2 16l20-6-20-6 3 6-3 6z"/><path d="M5 10h9"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  cruz: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
  carro: '<path d="M3 16v-4l2-5h14l2 5v4z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/><path d="M3 12h18"/>',
  raio: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  robo: '<path d="M5 20h8"/><path d="M9 20v-5l5-5"/><circle cx="14" cy="10" r="1.6"/><path d="M14 10l4-4 2 2"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/>',
  play: '<path d="M8 5l11 7-11 7z"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  recicla: '<path d="M7 19H4l3-5M17 19h3l-3-5M12 4l-2 3h4z"/><path d="M7 14l3-7M17 14l-3-7M7 19h10"/>',
};
const icone = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const redeIc = {
  YouTube: '<path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 001.6 12 31 31 0 002 15.8a3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-3.8 31 31 0 00-.4-3.8zM10 15V9l5.2 3z" fill="currentColor" stroke="none"/>',
  Facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" stroke="none"/>',
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
};
const redes = () => E.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nome}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${redeIc[r.nome]}</svg></a>`).join('');

// ---------- moldura ----------
function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Skip to content</a>
`;
}

const marca = v => `<a class="marca" href="/${v}/"><strong>${E.nome}</strong><em>${E.tagline}</em></a>`;

function cabecalho(v, ativa) {
  const link = p => `<a href="/${v}/${p.caminho}"${p.slug === ativa ? ' aria-current="page"' : ''}>${p.nome}</a>`;
  const itens = nav.map(p => p.filhos
    ? `<div class="sub${p.filhos.some(f => f.slug === ativa) ? ' ativo' : ''}"><button type="button" aria-expanded="false">${p.nome}<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button><div class="sub-menu">${p.filhos.map(link).join('')}</div></div>`
    : link(p)).join('');
  const util = v === 'a' ? `<div class="util"><div class="in">
  <span><a href="tel:${E.telefoneHref}">${icone('tel', 'ic-s')}${E.telefone}</a><a href="mailto:${E.emails[0].email}">${icone('mail', 'ic-s')}${E.emails[0].email}</a></span>
  <span class="util-dir"><span class="selo-util">ISO 9001:2015 · ITAR Registered · CAGE ${E.cage}</span><span class="redes">${redes()}</span></span>
</div></div>\n` : '';
  return `${util}<header class="topo"><div class="topo-in">
  ${marca(v)}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span><b class="sr">Menu</b></button>
  <nav id="menu" class="menu" aria-label="Main">${itens}<a class="btn btn-cta" href="/${v}/contact/#quote">Request a Quote</a></nav>
</div></header>
<main id="conteudo">
`;
}

function rodape(v) {
  const col = (t, links) => `<div><h3>${t}</h3><ul>${links.map(([n, h]) => `<li><a href="${h}">${n}</a></li>`).join('')}</ul></div>`;
  return `</main>
<footer class="rodape"><div class="rodape-in">
  <div class="rodape-marca">${marca(v)}<p>Precision CNC machining of steel and aluminum in Dover, New Hampshire, since 1985.</p><div class="redes">${redes()}</div></div>
  <div><h3>Address</h3><p>${E.rua}<br>${E.cidade}</p><p><a href="tel:${E.telefoneHref}">TEL: ${E.telefone}</a></p>${E.emails.map(e => `<p><small>${e.rotulo}</small><br><a href="mailto:${e.email}">${e.email}</a></p>`).join('')}</div>
  ${col('Company', [['Our Story', `/${v}/about/`], ['Facilities', `/${v}/facilities/`], ['Quality Control', `/${v}/quality/`], ['Software', `/${v}/software/`], ['Videos', `/${v}/videos/`], ['News', `/${v}/news/`], ['Careers', `/${v}/careers/`]])}
  <div><h3>Certifications</h3><ul class="certs-lista"><li><a href="${E.pdfs.iso}" target="_blank" rel="noopener">ISO 9001:2015</a></li><li><a href="${E.pdfs.itar}" target="_blank" rel="noopener">ITAR DOS/DDTC</a></li><li>CAGE Code: ${E.cage}</li><li>FFL Type 7</li><li>CMMC Level 1</li></ul><a class="btn btn-cta" href="/${v}/contact/#quote">Request a Quote</a></div>
</div>
<div class="rodape-base"><span>© ${new Date().getFullYear()} ${E.nome}. All rights reserved.</span><span>Website by Overtus</span></div>
</footer>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

const pagina = (v, slug, caminho, titulo, desc, corpo) => head(v, caminho, titulo, desc) + cabecalho(v, slug) + corpo + rodape(v);

// Topo das páginas internas: A é faixa escura com foto e gradiente; B é título grande no creme com foto recortada ao lado.
function topoPagina(v, { eyebrow, titulo, texto, foto, migalha }) {
  const trilha = `<nav class="migalha" aria-label="Breadcrumb"><a href="/${v}/">Home</a><span>/</span>${migalha ? `<span>${migalha}</span><span>/</span>` : ''}<span aria-current="page">${esc(eyebrow)}</span></nav>`;
  if (v === 'a') return `<section class="ph" style="--foto:url('/assets/img/${foto}.webp')"><div class="in">${trilha}<p class="eyebrow">${esc(eyebrow)}</p><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div></section>`;
  return `<section class="ph"><div class="in ph-grid"><div>${trilha}<p class="eyebrow">${esc(eyebrow)}</p><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div><figure class="ph-foto">${img(foto, '')}</figure></div></section>`;
}

const cta = (v, titulo = 'Have a drawing? <em>Let’s make it.</em>') => `<section class="cta-bloco"><div class="in"><div class="cta-card">
  <div><p class="eyebrow">Let’s get started</p><h2>${titulo}</h2><p>Send your part drawing and our team replies with a detailed quote. We are very cost effective with production runs.</p>
  <div class="botoes"><a class="btn btn-cta" href="/${v}/contact/#quote">Request a quote</a><a class="btn-tel" href="tel:${E.telefoneHref}">or call <strong>${E.telefone}</strong></a></div></div>
  <a class="drop" href="/${v}/contact/#quote">${icone('upload', 'ic-l')}<strong>Send your technical drawing</strong><span>Attach it to your quote request</span><small>PDF drawings</small></a>
</div></div></section>`;

// ---------- homes ----------
function homeA() {
  const v = 'a';
  return `<section class="hero" style="--foto:url('/assets/img/shop-robots.webp')"><div class="in">
  <p class="eyebrow"><span class="ponto"></span>CNC machining in Dover, NH since 1985</p>
  <h1>Measuring success <em>one part at a time.</em></h1>
  <p class="lead">High-volume CNC turning and milling of steel and aluminum, from 100 to 25,000 piece runs, in a climate-controlled shop that runs 24/7 with Universal Robots.</p>
  <div class="botoes"><a class="btn btn-cta" href="/a/contact/#quote">Request a quote</a><a class="btn btn-ghost" href="/a/contact/#quote">Send your drawing</a></div>
  <ul class="checks">${['ISO 9001:2015 Certified', 'ITAR Registered', 'Running 24/7'].map(t => `<li>${icone('check', 'ic-s')}${t}</li>`).join('')}</ul>
</div></section>

<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">What we do</p><h2>Precision capacity <span>under one roof</span></h2><p>Every job gets the same standard of care, from a short run to high-volume production.</p></div>
  <div class="bento">${servicos.map((s, i) => `<a class="bento-card b${i}" href="/a/${s.link}">${img(s.img, s.nome)}<div><h3>${s.nome}</h3><p>${s.texto}</p><span class="mais">Learn more ${icone('seta', 'ic-s')}</span></div></a>`).join('')}</div>
</div></section>

<section class="secao secao-clara"><div class="in">
  <div class="cab centro"><p class="eyebrow">Industries served</p><h2>Parts made to print for <span>demanding industries</span></h2><p>From aerospace and defense to medical and industrial automation, with the same technical rigor.</p></div>
  <div class="ind-grid">${industrias.map(x => `<div class="ind">${icone(x.icone)}<span>${x.nome}</span></div>`).join('')}</div>
</div></section>

<section class="capacidade"><div class="in cap-grid">
  <div><p class="eyebrow">Production capacity</p><h2>High-volume machining for parts made to your drawing</h2><p>${sobre.resumo2}</p><a class="btn btn-ghost" href="/a/facilities/">See our equipment list</a></div>
  <div class="stats">${numeros.slice(0, 4).map(n => `<div class="stat"><b>${n.n}</b><span>${n.t}</span></div>`).join('')}</div>
</div></section>

<section class="faixa-foto" style="--foto:url('/assets/img/qc-room.webp')"><div class="in"><p>Two full-time inspectors, CMMs and vision systems in a temperature and humidity-controlled room.</p><a class="btn btn-cta" href="/a/quality/">See our quality control</a></div></section>

<section class="secao"><div class="in sobre-a">
  <figure>${img('building', 'North East Precision CNC building at 4 Progress Drive, Dover, NH')}<figcaption>4 Progress Drive, Dover, NH. Solar-powered since 2019.</figcaption></figure>
  <div><p class="eyebrow">About us</p><h2>Family-run, ahead of its time for its size</h2><p>${sobre.resumo}</p><ul class="lista-check">${['Modern facility to Industry 4.0 standards', '20 Universal Robots tending lathes and mills', 'ISO 9001 continuous improvement'].map(t => `<li>${icone('check', 'ic-s')}${t}</li>`).join('')}</ul><a class="link-seta" href="/a/about/">Our story ${icone('seta', 'ic-s')}</a></div>
</div></section>

<section class="secao secao-clara"><div class="in">
  <div class="cab centro"><p class="eyebrow">Trust</p><h2>Certified for <span>regulated work</span></h2></div>
  <div class="marquee"><div class="trilho">${[...certificados, ...certificados].map(c => `<div class="selo">${c.img ? img(c.img, c.nome) : `<b>${c.selo}</b>`}<span>${c.nome}</span></div>`).join('')}</div></div>
</div></section>
${cta(v)}`;
}

function homeB() {
  const v = 'b';
  const passos = [
    ['Quote', 'Send your drawing, annual volume and material. We quote steel and aluminum runs from 100 to 25,000 pieces.'],
    ['Plan & track', 'Every order is tracked in JobBOSS from quotation to shipment, with 15-year record retention.'],
    ['Machine 24/7', 'Mori Seiki, Brother Speedio and Okuma centers, tended day and night by Universal Robots.'],
    ['Inspect', 'Fowler CMM, Keyence LM-X and OGP vision systems, with FAI, APQP and PPAP documentation in High QA.'],
    ['Wash & ship', 'Ramco ultrasonic parts washer with deionized water option, then out the door on time.'],
  ];
  return `<section class="hero"><div class="in hero-grid">
  <div class="hero-txt">
    <p class="chip"><span class="ponto"></span>Lights-out production · Dover, NH</p>
    <h1>High-volume CNC machining, <em>running 24/7.</em></h1>
    <p class="lead">${E.tagline}. Since 1985 we turn and mill steel and aluminum parts in a 14,600 sq ft climate-controlled shop where Universal Robots keep the spindles cutting around the clock.</p>
    <div class="botoes"><a class="btn btn-cta" href="/b/contact/#quote">Request a quote ${icone('seta', 'ic-s')}</a><a class="btn btn-linha" href="/b/facilities/">Tour the facility</a></div>
  </div>
  <div class="hero-fotos">
    <figure class="f1">${img('robot-cart', 'Universal Robot loading a Brother Speedio machining center')}</figure>
    <figure class="f2">${img('shop-aisle', 'Inside the North East Precision CNC shop')}</figure>
    <div class="flut fl1"><b>20</b><span>Universal Robots<br>on the floor</span></div>
    <div class="flut fl2"><b class="cage">ISO</b><span>ISO 9001:2015<br>Certified</span></div>
  </div>
</div>
<div class="faixa-num"><div class="in">${numeros.map(n => `<div><b>${n.n}</b><span>${n.t}</span></div>`).join('')}</div></div></section>

<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">Materials</p><h2>Steel or aluminum, at any production scale</h2></div>
  <div class="mat-split">${Object.entries(materiais).map(([slug, m]) => `<a class="mat" href="/b/${slug}/">${img(m.img, m.nome)}<div class="mat-txt"><h3>${m.curto}</h3><p>${m.intro.split('. ').slice(0, 1).join('')}.</p><ul>${m.graus.map(g => `<li><b>${g[0]}</b> ${g[1]}</li>`).join('')}</ul><span class="mais">${m.nome} ${icone('seta', 'ic-s')}</span></div></a>`).join('')}</div>
</div></section>

<section class="processo"><div class="in">
  <div class="cab claro"><p class="eyebrow">How a job moves</p><h2>From drawing to shipment</h2></div>
  <ol class="passos">${passos.map(([t, d], i) => `<li><span class="num">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>

<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">Inside the shop</p><h2>A fully equipped machine shop for just about every job</h2></div>
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist">${equipamentos.slice(0, 6).map((g, i) => `<button role="tab" aria-selected="${i === 0}" aria-controls="aba-${g.id}" id="t-${g.id}">${g.nome.replace(' (EDM)', '')}<small>${g.itens.length}</small></button>`).join('')}</div>
    ${equipamentos.slice(0, 6).map((g, i) => `<div class="aba" role="tabpanel" id="aba-${g.id}" aria-labelledby="t-${g.id}"${i ? ' hidden' : ''}><figure>${img(g.img, g.nome)}</figure><ul>${g.itens.slice(0, 7).map(t => `<li>${esc(t)}</li>`).join('')}</ul><a class="link-seta" href="/b/facilities/#${g.id}">See the full list ${icone('seta', 'ic-s')}</a></div>`).join('')}
  </div>
</div></section>

<section class="secao secao-creme"><div class="in qual-b">
  <div><p class="eyebrow">Quality</p><h2>Certified for aerospace, defense and soon medical</h2><p>${sobre.qualidade.split('. ').slice(0, 2).join('. ')}.</p><a class="btn btn-cta" href="/b/quality/">Quality control</a></div>
  <div class="selos-b">${certificados.map(c => `<div class="selo-b">${c.img ? img(c.img, c.nome) : `<b class="cage">${c.selo}</b>`}<span>${c.nome}</span></div>`).join('')}</div>
</div></section>

<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">Milestones</p><h2>Ten years of steady investment</h2></div>
  <div class="linha-tempo" tabindex="0">${noticias.filter(n => n.img).slice(0, 9).map(n => `<article><span class="ano">${n.ano}</span>${img(n.img, n.titulo)}<h3>${n.titulo}</h3><p>${n.texto.split('. ')[0]}.</p></article>`).join('')}</div>
  <a class="link-seta" href="/b/news/">All news ${icone('seta', 'ic-s')}</a>
</div></section>

<section class="verde"><div class="in verde-grid">
  <figure>${img('solar-field', '137 kW solar array next to the shop')}</figure>
  <div><p class="eyebrow">Solar & environment</p><h2>Powered by the sun, zero-waste stream</h2>
  <div class="verde-num"><div>${icone('sol')}<b>137 kW</b><span>365 solar panels</span></div><div>${icone('recicla')}<b>100%</b><span>chips and cutting fluids recycled</span></div></div>
  <a class="link-seta" href="/b/about/#environment">Our environmental commitment ${icone('seta', 'ic-s')}</a></div>
</div></section>
${cta(v, 'Ready to quote <em>your next run?</em>')}`;
}

// ---------- páginas internas ----------
function about(v) {
  return topoPagina(v, { eyebrow: 'Our Story', migalha: 'About Us', titulo: 'Since 1985, built on <em>quality and on-time delivery</em>', texto: sobre.historia.split('. ')[0] + '.', foto: 'building' }) + `
<section class="secao"><div class="in duas">
  <div><p class="eyebrow">Who we are</p><h2>A trusted partner for a wide range of industries</h2><p>${sobre.historia}</p><p>${sobre.equipe}</p></div>
  <div class="cartao-lista"><h3>Expertise and Technology</h3><ul class="lista-check">${sobre.expertise.map(t => `<li>${icone('check', 'ic-s')}${t}</li>`).join('')}</ul><h3>Commitment to Quality</h3><p>${sobre.qualidade}</p><p><strong>${sobre.convite}</strong></p></div>
</div></section>
<section class="secao secao-clara"><div class="in">
  <div class="cab"><p class="eyebrow">Our facility</p><h2>Clean, climate-controlled and organized</h2></div>
  <div class="galeria">${[['building-wide', 'Front of the North East Precision CNC building'], ['shop-robots', 'Brother machining centers with robot carts'], ['qc-room', 'Quality control room'], ['lobby', 'Lobby'], ['conference', 'Conference room'], ['qc-fowler', 'Fowler CMM station'], ['breakroom', 'Break room'], ['shop-aisle', 'Shop floor']].map(([f, a], i) => `<figure class="g${i}">${img(f, a)}<figcaption>${a}</figcaption></figure>`).join('')}</div>
</div></section>
<section class="secao"><div class="in duas">
  <div><p class="eyebrow">Community outreach</p><h2>Training the next generation of machinists</h2><ul class="lista-num">${sobre.comunidade.map(t => `<li>${t}</li>`).join('')}</ul></div>
  <figure class="logo-ctc">${img('dover-ctc', 'Dover Career Technical Center')}</figure>
</div></section>
<section class="verde" id="environment"><div class="in verde-grid">
  <figure>${img('solar-roof', 'Rooftop solar panels')}</figure>
  <div><p class="eyebrow">Solar & environment concerns</p><h2>Minimizing our carbon footprint</h2><p>${sobre.solar}</p><p>${sobre.reciclagem}</p>
  <div class="verde-num"><div>${icone('sol')}<b>137 kW</b><span>365 solar panels</span></div><div>${icone('recicla')}<b>100%</b><span>chips and fluids recycled</span></div></div>
  <a class="link-seta" href="${E.pdfs.ambiental}" target="_blank" rel="noopener">Environmental Compliance document ${icone('seta', 'ic-s')}</a></div>
</div></section>` + cta(v);
}

function facilities(v) {
  return topoPagina(v, { eyebrow: 'Facilities', migalha: 'About Us', titulo: 'A fully equipped machine shop <em>for just about every job</em>', texto: 'Lathes, 5-axis mills, robot cells, EDM, finishing and a dedicated inspection room under one roof.', foto: 'shop-robots' }) + `
<section class="secao"><div class="in">
  <nav class="atalhos" aria-label="Equipment groups">${equipamentos.map(g => `<a href="#${g.id}">${g.nome}<small>${g.itens.length}</small></a>`).join('')}</nav>
  <div class="equip">${equipamentos.map((g, i) => `<article class="grupo${i % 2 ? ' inv' : ''}" id="${g.id}"><figure>${img(g.img, g.nome)}</figure><div><p class="eyebrow">${String(i + 1).padStart(2, '0')}</p><h2>${g.nome}</h2><ul class="lista-maq">${g.itens.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${g.id === 'quality' ? `<a class="link-seta" href="/${v}/quality/">Quality Control page ${icone('seta', 'ic-s')}</a>` : ''}</div></article>`).join('')}</div>
</div></section>
<section class="secao secao-clara"><div class="in">
  <div class="cab"><p class="eyebrow">Featured machines</p><h2>Some of the equipment on our floor</h2></div>
  <div class="maq-grid">${[['mori', 'Mori Seiki NL series lathe'], ['dmu50', 'DMU 50 Ecoline 5-axis'], ['wire-edm', 'Fanuc Robocut wire EDM'], ['ur10e', 'Universal Robot UR10e']].map(([f, n]) => `<figure>${img(f, n)}<figcaption>${n}</figcaption></figure>`).join('')}</div>
</div></section>` + cta(v);
}

function quality(v) {
  return topoPagina(v, { eyebrow: 'Quality Control', migalha: 'About Us', titulo: 'Only the best parts <em>leave our shop</em>', texto: 'ISO 9001:2015 certified, ITAR registered and CMMC Level 1, with two full-time employees dedicated to inspection.', foto: 'qc-room' }) + `
<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">Certifications</p><h2>Registered and certified</h2></div>
  <div class="cert-grid">${certificados.map(c => `<article class="cert">${c.img ? `<div class="cert-img">${img(c.img, c.nome)}</div>` : `<div class="cert-img"><b class="cage">${c.selo}</b></div>`}<h3>${c.nome}</h3><p>${c.texto}</p>${c.link ? `<a class="link-seta" href="${E.pdfs[c.link]}" target="_blank" rel="noopener">${c.rotulo} ${icone('seta', 'ic-s')}</a>` : ''}</article>`).join('')}</div>
</div></section>
<section class="secao secao-clara"><div class="in">
  <div class="cab"><p class="eyebrow">Inspection equipment</p><h2>Measuring every part, precisely</h2></div>
  <div class="insp">${inspecao.map(x => `<figure>${img(x.img, x.nome)}<figcaption><b>${x.nome}</b>${x.texto}</figcaption></figure>`).join('')}</div>
</div></section>
<section class="secao"><div class="in duas">
  <div><p class="eyebrow">We offer</p><h2>A complete quality department</h2><p>Temperature and humidity-controlled inspection room inside our climate-controlled facility.</p>${img('qc-fowler', 'Fowler CMM station', ' class="foto-arred"')}</div>
  <ul class="lista-maq">${equipamentos.find(g => g.id === 'quality').itens.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
</div></section>` + cta(v);
}

function softwarePg(v) {
  return topoPagina(v, { eyebrow: 'Software', migalha: 'About Us', titulo: 'Quality and traceability, <em>from quote to shipment</em>', texto: 'High QA, uniPoint and JobBOSS connect engineering, production and inspection.', foto: 'inspection-station' }) + `
<section class="secao"><div class="in">
  <div class="soft-grid">${software.map(s => `<article class="soft"><div class="soft-logo">${img(s.img, s.nome)}</div><h2>${s.nome}</h2><p>${s.texto}</p></article>`).join('')}</div>
</div></section>
<section class="secao secao-clara"><div class="in duas">
  <div><p class="eyebrow">Quality tracking</p><h2>uniPoint Quality Management Software</h2><ul class="modulos">${modulosQualidade.map(m => `<li>${icone('check', 'ic-s')}${m}</li>`).join('')}</ul></div>
  <div><p class="eyebrow">Job tracking</p><h2>JobBoss Tracking System</h2><p>${jobboss}</p><div class="destaque-num"><b>15</b><span>years of record retention</span></div></div>
</div></section>` + cta(v);
}

function material(v, slug) {
  const m = materiais[slug];
  const outro = Object.entries(materiais).find(([s]) => s !== slug);
  return topoPagina(v, { eyebrow: m.nome, migalha: 'Capabilities', titulo: m.titulo.replace(': ', ': <em>') + '</em>', texto: m.intro, foto: m.img }) + `
<section class="secao"><div class="in duas">
  <div><p class="eyebrow">What is ${m.nome.toLowerCase()}?</p><h2>Complex geometries, tight tolerances</h2><p>${m.oque}</p></div>
  <div class="tabela-graus"><h3>Grades we machine</h3><table><thead><tr><th>Grade</th><th>${slug === 'steel-machining' ? 'Examples' : 'Type'}</th><th>Why</th></tr></thead><tbody>${m.graus.map(g => `<tr><td>${g[0]}</td><td>${g[1]}</td><td>${g[2]}</td></tr>`).join('')}</tbody></table></div>
</div></section>
<section class="secao secao-clara"><div class="in">
  <div class="cab"><p class="eyebrow">Why ${m.curto.toLowerCase()}</p><h2>Why choose ${m.curto.toLowerCase()} for CNC machining</h2></div>
  <div class="porque">${m.porque.map((p, i) => `<article><span class="num">0${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p><ul>${p.l.map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('')}</div>
</div></section>
<section class="secao"><div class="in duas">
  <div class="cartao-lista"><h3>Our ${m.nome.toLowerCase()} capabilities</h3><ul class="lista-check">${m.capacidades.map(t => `<li>${icone('check', 'ic-s')}${t}</li>`).join('')}</ul></div>
  <div class="cartao-lista escuro"><h3>${m.curto} at high volumes</h3><ul class="lista-check">${m.volume.map(t => `<li>${icone('check', 'ic-s')}${t}</li>`).join('')}</ul><p>Whether you need a single prototype or thousands of production parts, we tailor our machining process to your project’s needs.</p></div>
</div>
<div class="in"><p class="fecho">${m.fecho}</p><a class="link-seta" href="/${v}/${outro[0]}/">See also: ${outro[1].nome} ${icone('seta', 'ic-s')}</a></div></section>` + cta(v);
}

function videosPg(v) {
  const grupo = g => videos.filter(x => x.grupo === g).map(x => `<figure class="video"><button type="button" class="yt" data-yt="${x.id}" aria-label="Play: ${esc(x.titulo)}"><img src="https://i.ytimg.com/vi/${x.id}/hqdefault.jpg" alt="" loading="lazy">${icone('play', 'ic-play')}</button><figcaption>${x.titulo}</figcaption></figure>`).join('');
  return topoPagina(v, { eyebrow: 'Videos', migalha: 'About Us', titulo: 'See our machines <em>in action</em>', texto: 'Universal Robots tending our lathes and mills, and our Keyence LM-X measuring system.', foto: 'robot-lathe' }) + `
<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">Machines</p><h2>Automation and inspection</h2></div><div class="videos">${grupo('Machines')}</div>
  <div class="cab" style="margin-top:56px"><p class="eyebrow">Tutorials</p><h2>How we measure</h2></div><div class="videos">${grupo('Tutorials')}</div>
  <a class="link-seta" href="${E.redes[0].url}" target="_blank" rel="noopener">More on our YouTube channel ${icone('seta', 'ic-s')}</a>
</div></section>` + cta(v);
}

function news(v) {
  return topoPagina(v, { eyebrow: 'News', titulo: 'Investing in our shop, <em>year after year</em>', texto: 'Robots, inspection equipment, expansions and certifications since 2016.', foto: 'robot-cart' }) + `
<section class="secao"><div class="in">
  <ol class="noticias">${noticias.map(n => `<li><span class="ano">${n.ano}</span><article>${n.img ? `<figure>${img(n.img, n.titulo)}</figure>` : ''}<div><h2>${n.titulo}</h2><p>${n.texto}</p>${n.video ? `<a class="link-seta" href="https://www.youtube.com/watch?v=${n.video}" target="_blank" rel="noopener">See our robot in action ${icone('seta', 'ic-s')}</a>` : ''}</div></article></li>`).join('')}</ol>
</div></section>` + cta(v);
}

function careers(v) {
  return topoPagina(v, { eyebrow: 'Careers', titulo: 'Build precision parts <em>with our team</em>', texto: 'Thank you for your interest in working at North East Precision CNC! You will find our open positions below.', foto: 'shop-aisle' }) + `
<section class="secao"><div class="in duas vaga">
  <div><p class="eyebrow">Available position</p><h2>${vaga.titulo}</h2><p>${vaga.texto}</p><p>${vaga.funcao}</p><p>${sobre.equipe}</p>
  <h3>Requirements</h3><ul class="lista-check">${vaga.requisitos.map(t => `<li>${icone('check', 'ic-s')}${t}</li>`).join('')}</ul></div>
  <div><div class="cartao-lista"><h3>Benefits</h3><ul class="chips">${vaga.beneficios.map(b => `<li>${b}</li>`).join('')}</ul></div>
  <form class="form cartao-lista" data-mailto="${E.emails[1].email}" data-assunto="Job application: ${vaga.titulo}"><h3>Application</h3>
    <div class="campos2"><label>First name *<input name="First name" required></label><label>Last name<input name="Last name"></label></div>
    <label>Email *<input type="email" name="Email" required></label><label>Phone *<input type="tel" name="Phone" required></label><label>Address (City, State)<input name="City, State"></label>
    <p class="nota">Your email app opens with this application. Please attach your resume before sending.</p>
    <button class="btn btn-cta" type="submit">Submit application</button></form></div>
</div></section>`;
}

function contact(v) {
  const sel = (n, ops, req = true) => `<label>${n}${req ? ' *' : ''}<select name="${n}"${req ? ' required' : ''}><option value="">Select</option>${ops.map(o => `<option>${o}</option>`).join('')}</select></label>`;
  return topoPagina(v, { eyebrow: 'Contact Us', titulo: 'Let’s quote <em>your project</em>', texto: orcamento, foto: 'building' }) + `
<section class="secao"><div class="in contato">
  <aside class="contato-info">
    ${E.emails.map(e => `<a class="ct" href="mailto:${e.email}">${icone('mail')}<span><small>${e.rotulo}</small>${e.email}</span></a>`).join('')}
    <a class="ct" href="tel:${E.telefoneHref}">${icone('tel')}<span><small>Phone</small>${E.telefone}</span></a>
    <a class="ct" href="https://maps.google.com/?q=4+Progress+Drive+Dover+NH+03820" target="_blank" rel="noopener">${icone('pin')}<span><small>Address</small>${E.endereco}</span></a>
    <ul class="chips">${['CAGE Code: 0FLD1', 'ISO 9001:2015 Certified', 'ITAR Registered', 'JCP Certified', 'FFL Type 7'].map(t => `<li>${t}</li>`).join('')}</ul>
    <iframe class="mapa" title="Map: 4 Progress Drive, Dover, NH" loading="lazy" src="https://maps.google.com/maps?q=4%20Progress%20Drive%2C%20Dover%2C%20NH%2003820&z=14&output=embed"></iframe>
  </aside>
  <form class="form cartao-lista" id="quote" data-mailto="${E.emails[0].email}" data-assunto="Quote request">
    <p class="eyebrow">Request a quote</p><h2>Tell us about your part</h2>
    <div class="campos2"><label>First name *<input name="First name" required></label><label>Last name<input name="Last name"></label></div>
    <div class="campos2"><label>Company<input name="Company"></label><label>Email *<input type="email" name="Email" required></label></div>
    <label>Phone<input type="tel" name="Phone"></label>
    <label>Describe your project<textarea name="Project" rows="4"></textarea></label>
    <div class="campos2">${sel('Estimated Annual Volume', ['<1,000', '1,000-5,000', '5,000-25,000', '25,000+'])}${sel('Estimated Annual Spend', ['<$10K', '$10K-$50K', '$50K-$250K', '$250K+'])}</div>
    <div class="campos2">${sel('Customer Type', ['OEM', 'Tier-1 Supplier', 'Broker/Other'])}${sel('Material', ['Steel', 'Aluminum'])}</div>
    ${sel('Contract Intent', ['One-time', 'Multi-year preferred'])}
    <div class="drop drop-form">${icone('upload', 'ic-l')}<strong>Project drawings (PDFs only)</strong><span>Your email app opens with this request. Attach your PDF drawings before sending.</span></div>
    <button class="btn btn-cta" type="submit">Submit request</button>
  </form>
</div></section>`;
}

export function gerarVersao(v) {
  const t = n => `${n} | ${E.nome}`;
  return {
    index: pagina(v, 'index', '', `${E.nome} | ${E.tagline}`, 'High-volume CNC machining of steel and aluminum in Dover, NH. ISO 9001:2015, ITAR registered, running 24/7 with Universal Robots.', v === 'a' ? homeA() : homeB()),
    about: pagina(v, 'about', 'about/', t('Our Story'), 'Since 1985, North East Precision CNC has become a leader in precision manufacturing in Dover, New Hampshire.', about(v)),
    facilities: pagina(v, 'facilities', 'facilities/', t('Facilities'), 'CNC lathes, 5-axis mills, Universal Robots, EDM, finishing and quality control equipment.', facilities(v)),
    quality: pagina(v, 'quality', 'quality/', t('Quality Control'), 'ISO 9001:2015 certified, ITAR registered, FFL Type 7, CMMC Level 1 and CAGE Code 0FLD1.', quality(v)),
    software: pagina(v, 'software', 'software/', t('Software'), 'High QA, uniPoint and JobBOSS for quality documentation and full job traceability.', softwarePg(v)),
    'steel-machining': pagina(v, 'steel-machining', 'steel-machining/', t('Steel Machining'), materiais['steel-machining'].intro.slice(0, 155), material(v, 'steel-machining')),
    'aluminum-machining': pagina(v, 'aluminum-machining', 'aluminum-machining/', t('Aluminum Machining'), materiais['aluminum-machining'].intro.slice(0, 155), material(v, 'aluminum-machining')),
    videos: pagina(v, 'videos', 'videos/', t('Videos'), 'Videos of our Universal Robots and Keyence LM-X measuring system.', videosPg(v)),
    news: pagina(v, 'news', 'news/', t('News'), 'Robots, inspection equipment, expansions and certifications at North East Precision CNC since 2016.', news(v)),
    careers: pagina(v, 'careers', 'careers/', t('Careers'), 'Open positions at North East Precision CNC in Dover, NH.', careers(v)),
    contact: pagina(v, 'contact', 'contact/', t('Contact Us'), 'Request a quote from North East Precision CNC. Call (603) 742-6247.', contact(v)),
  };
}
