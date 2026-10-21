// Monta as páginas das versões A ("Tradição": fiel ao site atual, faixa laranja de menu, três atalhos, mosaico "Obras Pizzinatto")
// e B ("Perfil": clara e técnica, perfis das telhas desenhados em escala, escolha pelo tipo de obra).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, sobre, historia, cultura, qualidade as Q, perfis, telhasIntro, termo, especiais, cores, calhas, veneziana, acessorios, fixacao, aco, corte, obras, catObras, noticias, calc } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, { w = 1600, h = 1000, cls = '', lazy = true } = {}) => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
const mm = n => String(n).replace('.', ',');

export const nomesVersao = { a: 'Tradição', b: 'Perfil' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'telhas', nome: 'Telhas', caminho: 'telhas/' },
  { slug: 'calhas', nome: 'Calhas e acessórios', caminho: 'calhas/' },
  { slug: 'aco', nome: 'Aço e corte', caminho: 'aco/' },
  { slug: 'obras', nome: 'Obras', caminho: 'obras/' },
  { slug: 'calcule', nome: 'Calcule sua obra', caminho: 'calcule/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  calc: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><rect x="8" y="5.5" width="8" height="4" rx=".5"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01"/>',
  telha: '<path d="M1.5 17h3l2-7h3l2 7h3l2-7h3l2 7h1"/><path d="M1.5 21h21"/>',
  livro: '<path d="M4 4.5h10a2 2 0 012 2V21H6a2 2 0 01-2-2z"/><path d="M8 4.5V2.8h10a2 2 0 012 2V18h-4"/><path d="M7 9h6M7 12.5h6"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  boleto: '<path d="M4 5v14M7 5v14M10 5v10M13 5v14M16 5v10M19 5v14"/><path d="M9 19h1M15 19h1"/>',
  sac: '<path d="M4 13v-1a8 8 0 0116 0v1"/><rect x="2.5" y="13" width="4" height="6" rx="1.5"/><rect x="17.5" y="13" width="4" height="6" rx="1.5"/><path d="M19.5 19c0 1.5-1.5 2.5-4 2.5H13"/>',
  play: '<path d="M8 5l11 7-11 7z"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  cami: '<path d="M2 16V7h12v9M14 10h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  ig: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.3 6.7h.01"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  in: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 10.5V17M8 7.3v.01M12 17v-6.5M12 13.5c0-1.8 1-3 2.6-3S17 11.6 17 13.5V17"/>',
  yt: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.3v5.4l4.6-2.7z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Pizzinatto e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const ext = 'target="_blank" rel="noopener"';

// Perfil da telha desenhado a partir das medidas reais (altura exagerada 3× para a forma aparecer). Linha só, cor = currentColor.
export function perfilSvg(p, { largura = p.total, exag = 3, traco = 2.2, cls = 'perfil' } = {}) {
  const H = p.altura * exag, pad = traco + 2, alto = H + pad * 2;
  let d = '';
  if (p.ond) {
    const passos = Math.ceil(largura / p.passo) * 24;
    for (let i = 0; i <= passos; i++) {
      const x = i * largura / passos, y = pad + H / 2 - Math.cos(x / p.passo * Math.PI * 2) * H / 2;
      d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  } else {
    const c = p.crista, alma = Math.min(p.altura * 0.75, (p.passo - c) * 0.22), vale = p.passo - c - alma * 2;
    let x = 0; d = `M0 ${pad + H}`;
    const top = pad, bot = pad + H;
    x = vale / 2; d += `H${x.toFixed(1)}`;
    while (x < largura) {
      d += `L${(x + alma).toFixed(1)} ${top}H${(x + alma + c).toFixed(1)}L${(x + alma * 2 + c).toFixed(1)} ${bot}`;
      x += alma * 2 + c;
      const fim = Math.min(x + vale, largura); d += `H${fim.toFixed(1)}`; x += vale;
    }
  }
  return `<svg class="${cls}" viewBox="${-pad} 0 ${largura + pad * 2} ${alto.toFixed(1)}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="${traco}" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`;
}

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
<meta property="og:site_name" content="Pizzinatto">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#E8702A' : '#3B3C3F'}">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,500;0,600;0,700;1,700;1,800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const navLinks = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const btnOrc = v => `<a class="btn-orc" href="/${v}/contato/#orcamento">${ic('lista')}<span>Orçamento</span><b class="orc-n" hidden>0</b></a>`;
const redes = () => `<a href="${E.redes.instagram}" ${ext} aria-label="Instagram">${ic('ig')}</a><a href="${E.redes.facebook}" ${ext} aria-label="Facebook">${ic('fb')}</a><a href="${E.redes.linkedin}" ${ext} aria-label="LinkedIn">${ic('in')}</a><a href="${E.redes.youtube}" ${ext} aria-label="YouTube">${ic('yt')}</a>`;

function topo(v, atual) {
  if (v === 'a') return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="a-faixa"><div class="w"><span>${ic('pin')} Matriz Piracicaba-SP · Filial São Paulo</span><span class="a-faixa-d"><a href="tel:${E.foneHref}">Tel <b>${E.fone}</b></a><i></i><a href="/${v}/contato/#sac">SAC (Atendimento ao Cliente)</a><i></i><span class="a-redes">${redes()}</span></span></div></div>
<header class="a-cab"><div class="w">
  <a class="logo" href="/${v}/" aria-label="Pizzinatto, página inicial"><img src="/assets/logo.svg" alt="Pizzinatto" width="330" height="41"></a>
  <div class="a-cab-d"><a class="a-loja" href="${E.loja}" ${ext}>Loja on-line ${ic('seta')}</a><a class="a-wa" href="${waLink()}" ${ext}>${ic('wa')} WhatsApp</a>${btnOrc(v)}</div>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>
<nav class="a-menu" id="menu" aria-label="Principal"><div class="w">${navLinks(v, atual)}</div></nav>`;
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="b-cab"><div class="w">
  <a class="logo" href="/${v}/" aria-label="Pizzinatto, página inicial"><img src="/assets/logo.svg" alt="Pizzinatto" width="330" height="41"></a>
  <nav class="b-menu" id="menu" aria-label="Principal">${navLinks(v, atual)}<a class="b-menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  <div class="b-cab-d"><a class="b-tel" href="tel:${E.foneHref}">${E.fone}</a>${btnOrc(v)}</div>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  const col = (t, links) => `<div><h3>${t}</h3><ul>${links.map(([n, h, e]) => `<li><a href="${h}"${e ? ` ${ext}` : ''}>${n}</a></li>`).join('')}</ul></div>`;
  return `<footer class="rod rod-${v}">
<div class="w rod-g">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Pizzinatto" width="330" height="41" loading="lazy">
    <p>Telhas, calhas e aço para a construção civil. Desde 1981 em Piracicaba-SP, com atuação em todo o Brasil.</p>
    <div class="rod-selo"><span>${E.slogan.replace(', ', ',<br>')}</span><img src="/assets/img/garantido.png" alt="Selo 100% garantido Pizzinatto" width="80" height="95" loading="lazy"></div>
  </div>
  <div class="rod-cont"><h3>Matriz · Piracicaba-SP</h3><p>${E.endereco}<br>${E.cep} · ${E.cidade}</p><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a></p>
    <h3>${E.filial.nome}</h3><p>${E.filial.endereco}<br>${E.filial.cep} · ${E.filial.cidade}<br><a href="tel:${E.filial.foneHref}">${E.filial.fone}</a></p></div>
  ${col('Produtos', [['Telhas de aço', `/${v}/telhas/`], ['Telhas termoacústicas', `/${v}/telhas/#termo`], ['Cobertura zipada', `/${v}/telhas/#zipada`], ['Calhas e rufos', `/${v}/calhas/`], ['Aço e corte', `/${v}/aco/`], ['Loja on-line', E.loja, 1]])}
  ${col('Atendimento', [['Solicite um orçamento', `/${v}/contato/#orcamento`], ['Calcule a sua obra', `/${v}/calcule/`], ['SAC', `/${v}/contato/#sac`], ['2ª via de boletos e notas', `/${v}/contato/#boleto`], ['Entrega e recebimento', `/${v}/contato/#entrega`], ['Trabalhe conosco', E.vagas, 1], ['Canal de denúncias', E.denuncias, 1]])}
</div>
<div class="w rod-base"><span>© ${new Date().getFullYear()} ${E.razao}</span><span class="rod-redes">${redes()}</span></div>
</footer>
<a class="wa-flut" href="${waLink()}" ${ext} aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, titulo, desc, corpo) => `${head(v, slug === 'index' ? '' : slug + '/', titulo, desc)}
<body class="v-${v} pg-${slug}">
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// Cabeçalho das páginas internas
function capa(v, { titulo, sub, foto, rotulo }) {
  if (v === 'a') return `<section class="a-capa"><div class="a-capa-f">${img(foto, '', { lazy: false })}</div><div class="w"><p class="a-migalha"><a href="/a/">Início</a> / ${rotulo}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  return `<section class="b-capa"><div class="w b-capa-g"><div><p class="rot">${rotulo}</p><h1>${titulo}</h1>${sub ? `<p class="b-capa-sub">${sub}</p>` : ''}</div><figure>${img(foto, '', { lazy: false })}</figure></div>${perfilSvg(perfis[3], { largura: 2400, cls: 'b-capa-linha', exag: 2.2 })}</section>`;
}

// ---------- blocos reutilizados ----------
const cta = (v) => v === 'a'
  ? `<section class="a-chat"><div class="w"><div><h2>Fale com um especialista</h2><p>No horário comercial, nosso time comercial tira dúvidas sobre modelos, espessuras e preenchimentos e já prepara o orçamento.</p></div><div class="a-chat-b"><a class="bt bt-l" href="${waLink()}" ${ext}>${ic('wa')} Estamos on-line</a><a class="bt bt-c" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>`
  : `<section class="b-cta"><div class="w"><h2>Tem um projeto em mãos?</h2><p>Mande as medidas ou a planta: o comercial indica o modelo, a espessura e o preenchimento certos e responde com o orçamento.</p><div class="b-cta-b"><a class="bt bt-l" href="/${v}/contato/#orcamento">Solicitar orçamento ${ic('seta')}</a><a class="bt bt-v" href="${waLink()}" ${ext}>${ic('wa')} WhatsApp</a></div></div></section>`;

const seloLista = () => `<div class="selos"><img src="/assets/img/parceiros.webp" alt="ABCEM, CBCA, Selo Verde e Top of Mind Telhas e Calhas" width="700" height="127" loading="lazy"><img src="/assets/img/selos-abnt.webp" alt="Selos NBR 14513, NBR 7008 e NBR 14125" width="1192" height="461" loading="lazy"></div>`;

function montador(v) {
  const op = (arr) => arr.map(o => `<option>${esc(o)}</option>`).join('');
  return `<form class="monte" id="monte-form" data-monte>
  <div class="monte-g">
    <label>Modelo<select name="modelo">${op(perfis.map(p => `${p.nome} ${p.tipo.toLowerCase()}`))}</select></label>
    <label>Tipo<select name="tipo" data-tipo><option>Telha simples</option><option>Telha termoacústica</option></select></label>
    <label data-so-termo hidden>Preenchimento<select name="recheio">${op(['Poliestireno (EPS)', 'Poliisocianurato (PIR)', 'Lã de Rocha'])}</select></label>
    <label data-so-termo hidden>Espessura do preenchimento<select name="esp-recheio">${op(['20 mm', '25 mm', '30 mm', '40 mm', '50 mm', '60 mm', '70 mm', '80 mm', '100 mm'])}</select></label>
    <label data-so-termo hidden>Acabamento inferior<select name="inferior">${op(termo.acabamentos.map(a => a.nome))}</select></label>
    <label>Aço<select name="aco">${op(['Galvanizado', 'Galvalume', 'Alumínio', 'Pré-pintado', 'Pós-pintado (eletrostática)'])}</select></label>
    <label>Espessura do aço<select name="esp">${op(['0,43 mm', '0,50 mm', '0,65 mm', '0,80 mm'])}</select></label>
    <label>Cor<select name="cor"><option>Natural (sem pintura)</option>${op(cores.lista.map(c => c[0]))}</select></label>
    <label>Comprimento das peças (m)<input name="comp" inputmode="decimal" placeholder="ex.: 6,00"></label>
    <label>Quantidade (m² ou peças)<input name="qtd" inputmode="decimal" placeholder="ex.: 320 m²"></label>
  </div>
  <p class="monte-res" data-monte-res aria-live="polite"></p>
  <div class="monte-b"><button class="bt bt-l" type="submit">${ic('mais')} Adicionar ao orçamento</button><a class="bt bt-c" href="/${v}/contato/#orcamento">Ver lista ${ic('seta')}</a></div>
</form>`;
}

// ---------- páginas ----------
function home(v) {
  const slides = [
    { foto: 'obra-carde', t: 'Telhas termoacústicas no CARDE, o maior museu de automóveis da América Latina', l: 'Ver obras', h: `/${v}/obras/` },
    { foto: 'obra-bocao', t: 'Sistema de cobertura zipada: telhas contínuas, sem parafusos aparentes e com 100% de estanqueidade', l: 'Conhecer a zipada', h: `/${v}/telhas/#zipada` },
    { foto: 'obra-ginasio', t: 'Do Teatrão de São José dos Campos à Arena do Futuro: grandes vãos cobertos com aço Pizzinatto', l: 'Ver obras', h: `/${v}/obras/` },
    { foto: 'litoranea', t: 'Telha para região litorânea, com até 5 anos de garantia à beira-mar', l: 'Saiba mais', h: `/${v}/telhas/#litoranea` },
  ];
  if (v === 'a') {
    const box = (icone, t1, t2, t3, h) => `<a class="a-box" href="${h}">${ic(icone, 'a-box-ic')}<span class="a-box-t"><b>${t1}</b> ${t2}</span><span class="a-box-s">${t3}</span></a>`;
    const mosaico = ['obra-guindaste', 'obra-arena', 'obra-soja', 'obra-ginasio'];
    return pagina(v, 'index', 'Pizzinatto | Telhas, calhas e aço para a construção civil', 'Fabricante de telhas de aço, termoacústicas (EPS, PIR e lã de rocha), cobertura zipada, calhas e aço em Piracicaba-SP desde 1981.', `
<section class="a-hero" data-slides>
  ${slides.map((s, i) => `<figure class="a-slide${i ? '' : ' on'}">${img(s.foto, '', { lazy: i > 0 })}<figcaption class="w"><span class="a-slide-n">0${i + 1}</span><p>${s.t}</p><a class="bt bt-l" href="${s.h}">${s.l} ${ic('seta')}</a></figcaption></figure>`).join('')}
  <div class="a-hero-pts w" role="tablist" aria-label="Destaques">${slides.map((s, i) => `<button type="button" role="tab" aria-label="Destaque ${i + 1}"${i ? '' : ' aria-selected="true"'}></button>`).join('')}</div>
</section>
<section class="a-boxes"><div class="w">
  ${box('calc', 'Calcule', 'a sua obra', 'Estimativa de material para a sua cobertura', `/${v}/calcule/`)}
  ${box('telha', 'Monte', 'o seu produto', 'Diversas configurações para a sua obra', `/${v}/telhas/#monte`)}
  ${box('livro', 'Catálogos', '& manuais', 'Especificações técnicas e instalação', `/${v}/telhas/#catalogos`)}
</div></section>

<section class="a-linhas"><div class="w">
  <h2 class="a-tit">Soluções completas em coberturas metálicas</h2>
  <div class="a-linhas-g">
    <a href="/${v}/telhas/" class="a-linha">${img('pz40x1020', 'Telha trapezoidal PZ 40×1020', { w: 1159, h: 433 })}<h3>Telhas de aço</h3><p>Seis perfis, do PZ 17 ondulado ao PZ 100, natural ou pintado.</p></a>
    <a href="/${v}/telhas/#termo" class="a-linha">${img('pir', 'Telha termoacústica com PIR', { w: 350, h: 462 })}<h3>Termoacústicas</h3><p>EPS, PIR com laudo IT-10 e lã de rocha.</p></a>
    <a href="/${v}/calhas/" class="a-linha">${img('casa-calhas', 'Calhas, rufos e condutores numa casa', { w: 841, h: 626 })}<h3>Calhas e acessórios</h3><p>Calhas, rufos, condutores, venezianas e fixação.</p></a>
    <a href="/${v}/aco/" class="a-linha">${img('bobinas', 'Bobinas de aço galvanizado', { w: 400, h: 300 })}<h3>Aço e corte</h3><p>Galvanizado, galvalume, pré e pós-pintado, chapas e bobinas.</p></a>
  </div>
</div></section>

<section class="a-news"><div class="w a-news-g">
  <div><h2 class="a-tit">Novidades</h2><div class="a-news-l">${noticias.map(n => `<a class="a-new" href="${n.url}" ${ext}>${img(n.img, '', { w: 800, h: 600 })}<span class="a-new-d">${n.data}</span><h3>${n.t}</h3><span class="a-mais">Leia mais ${ic('seta')}</span></a>`).join('')}</div></div>
  <aside class="a-video"><h2 class="a-tit">Vídeo institucional</h2>
    <button class="video" type="button" data-video="${E.video}" aria-label="Assistir ao vídeo institucional">${img('obra-instalacao', 'Montagem de cobertura Pizzinatto', { w: 1501, h: 1000 })}<span class="video-p">${ic('play')}</span></button>
    <blockquote>${E.primeira}</blockquote></aside>
</div></section>

<section class="a-obras"><div class="w">
  <h2 class="a-tit">Obras Pizzinatto</h2>
  <a class="a-mosaico" href="/${v}/obras/" aria-label="Ver as obras Pizzinatto">${mosaico.map((f, i) => `<span class="a-mos-${i + 1}">${img(f, '', { w: 1600, h: 1000 })}</span>`).join('')}<span class="a-losango"><span>${ic('telha')}<b>Obras</b> Pizzinatto</span></span></a>
</div></section>

${cta(v)}

<section class="a-premios"><div class="w"><h2 class="a-tit">Associações e prêmios</h2>${seloLista()}</div></section>

<section class="a-atalhos"><div class="w">
  <a class="a-atalho a-atalho-l" href="/${v}/contato/#boleto">${ic('boleto')}<span>2ª via de boletos<br>e notas fiscais</span></a>
  <a class="a-atalho a-atalho-c" href="/${v}/contato/#sac">${ic('sac')}<span>SAC · Serviço de<br>Atendimento ao Cliente</span></a>
</div></section>`);
  }

  // ----- versão B -----
  const obrasTipo = [
    { id: 'galpao', nome: 'Galpão e indústria', foto: 'obra-guindaste', t: 'Grandes áreas pedem cobertura que proteja a produção e segure o calor do lado de fora.',
      p: [['Termoacústica com PIR', 'Laudo IT-10 (Classe II-A) para o AVCB', '#termo'], ['Cobertura zipada', 'Coberturas planas, sem parafusos aparentes', '#zipada'], ['Telhas translúcidas', 'Luz natural e menos gasto com iluminação', '#translucida'], ['Venezianas industriais', 'Ventilação e iluminação naturais', 'calhas/#venezianas']] },
    { id: 'comercio', nome: 'Comércio e fachada', foto: 'obra-boss', t: 'Lojas, restaurantes e centros comerciais unem aparência e conforto.',
      p: [['Telhas perfuradas', 'Fachadas e divisórias com estética', '#perfurada'], ['Painel TAC', 'Fachadas e fechamentos comerciais', '#painel'], ['Telhas pintadas', '15 cores com pintura eletrostática', '#cores'], ['Calhas e rufos', 'Acabamento e coleta de água', 'calhas/']] },
    { id: 'casa', nome: 'Casa e reforma', foto: 'obra-casapatio', t: 'Conforto térmico e acústico em casa, com o visual que o projeto pede.',
      p: [['Telha amadeirada', 'Visual de madeira, núcleo EPS ou PIR', '#amadeirada'], ['Termoacústica com EPS', 'A opção de menor custo', '#termo'], ['Calhas Pizzinatto', 'Moldura, platibanda, chalé e água furtada', 'calhas/'], ['Ripamento metálico', 'Para telha cerâmica ou metálica', '#ripamento']] },
    { id: 'litoral', nome: 'Beira-mar', foto: 'obra-litoral', t: 'Sol, umidade e maresia pedem materiais que não enferrujam.',
      p: [['Telha de alumínio', '5 anos de garantia contra defeitos', '#aluminio'], ['Galvalume com pintura dupla-face', 'Garantia litorânea de 1 a 5 anos', '#litoranea'], ['PIR', 'Mais resistente à maresia e a fungos', '#termo']] },
    { id: 'frio', nome: 'Câmara fria e alimentos', foto: 'obra-shinoda', t: 'Frigoríficos, supermercados e laboratórios precisam de temperatura sob controle.',
      p: [['Painel TAC com EPS', 'Câmaras frias, frigoríficos e containers', '#painel'], ['Termoacústica com PIR', 'Isolamento e resistência ao fogo', '#termo'], ['Pós-pintura', 'Acabamento que dura', 'aco/#pospintura']] },
  ];
  const lk = h => h.startsWith('#') ? `/${v}/telhas/${h}` : `/${v}/${h}`;
  return pagina(v, 'index', 'Pizzinatto | Telhas, calhas e aço para a construção civil', 'Fabricante de telhas de aço, termoacústicas (EPS, PIR e lã de rocha), cobertura zipada, calhas e aço em Piracicaba-SP desde 1981.', `
<section class="b-hero">
  <div class="b-hero-f">${img('obra-guindaste', 'Montagem de cobertura Pizzinatto com guindaste', { w: 1600, h: 1066, lazy: false, cls: 'ken' })}</div>
  <div class="w b-hero-t">
    <p class="rot">Fabricante desde 1981 · Piracicaba-SP</p>
    <h1>Telhas, calhas e aço para obras de todo porte.</h1>
    <p class="b-hero-sub">Telhas termoacústicas com EPS, PIR e lã de rocha, cobertura zipada, calhas e aço plano, com fábrica própria e entrega em todo o Brasil.</p>
    <div class="b-hero-b"><a class="bt bt-l" href="/${v}/contato/#orcamento">Solicitar orçamento ${ic('seta')}</a><a class="bt bt-cl" href="/${v}/calcule/">${ic('calc')} Calcular minha obra</a></div>
  </div>
  <div class="b-hero-faixa">${perfilSvg(perfis[4], { largura: 3200, cls: 'b-hero-linha', exag: 2.6 })}</div>
</section>

<section class="b-numeros"><div class="w">
  <div><b>1981</b><span>fundada em Piracicaba por Antonio F. Pizzinatto</span></div>
  <div><b>6</b><span>perfis de telha, do PZ 17 ao PZ 100</span></div>
  <div><b>IT-10</b><span>única com telha PIR e pintura eletrostática</span></div>
  <div><b>Top of Mind</b><span>a mais lembrada em telhas e calhas</span></div>
</div></section>

<section class="b-tipo" data-abas><div class="w">
  <div class="b-sec-t"><p class="rot">Por onde começar</p><h2>Qual é a sua obra?</h2></div>
  <div class="b-tipo-abas" role="tablist">${obrasTipo.map((o, i) => `<button type="button" role="tab" id="tab-${o.id}" aria-controls="aba-${o.id}" aria-selected="${i ? 'false' : 'true'}">${o.nome}</button>`).join('')}</div>
  ${obrasTipo.map((o, i) => `<div class="b-tipo-p" role="tabpanel" id="aba-${o.id}" aria-labelledby="tab-${o.id}"${i ? ' hidden' : ''}>
    <figure>${img(o.foto, '', { w: 1600, h: 1000 })}</figure>
    <div><p class="b-tipo-t">${o.t}</p><ol>${o.p.map(([n, s, h]) => `<li><a href="${lk(h)}"><b>${n}</b><span>${s}</span>${ic('seta')}</a></li>`).join('')}</ol></div>
  </div>`).join('')}
</div></section>

<section class="b-perfis"><div class="w">
  <div class="b-sec-t b-sec-t2"><div><p class="rot">Linha de telhas</p><h2>Seis perfis, medidas reais</h2></div><p>Cada desenho segue as medidas da fábrica: altura da onda e largura útil em milímetros. Natural, galvalume ou pintada, simples ou termoacústica.</p></div>
  <div class="b-perfis-l">${perfis.map(p => `<a class="b-perfil" href="/${v}/telhas/#${p.id}"><span class="b-perfil-n">${p.nome}<small>${p.tipo}</small></span>${perfilSvg(p, { largura: p.total, exag: 3 })}<span class="b-perfil-m"><span><b>${p.altura}</b> mm altura</span><span><b>${p.util}</b> mm útil</span></span></a>`).join('')}</div>
</div></section>

<section class="b-sand" data-sand><div class="w b-sand-g">
  <div><p class="rot">Telha sanduíche</p><h2>Monte a termoacústica camada por camada</h2><p>${termo.intro.split('. ').slice(0, 2).join('. ')}.</p>
    <fieldset><legend>Preenchimento</legend><div class="pilulas">${termo.recheios.map((r, i) => `<label><input type="radio" name="sand-r" value="${r.id}"${i === 1 ? ' checked' : ''}><span>${r.nome}</span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Acabamento inferior</legend><div class="pilulas">${termo.acabamentos.map((a, i) => `<label><input type="radio" name="sand-a" value="${a.id}"${i ? '' : ' checked'}><span>${a.nome}</span></label>`).join('')}</div></fieldset>
  </div>
  <div class="b-sand-v">
    ${termo.recheios.map((r, i) => `<div class="b-sand-r" data-r="${r.id}"${i === 1 ? '' : ' hidden'}>${img(r.img, `Telha termoacústica com ${r.nome}`, { w: 220, h: 132 })}<h3>${r.nome}</h3><ul>${r.itens.map(t => `<li>${t}</li>`).join('')}</ul><p class="b-sand-d">${r.dados}</p></div>`).join('')}
    <div class="b-sand-ab">${termo.acabamentos.map((a, i) => `<div data-a="${a.id}"${i ? ' hidden' : ''}>${img(a.img, `Acabamento inferior ${a.nome}`, { w: 220, h: 132 })}<p><b>${a.nome}:</b> ${a.t}</p></div>`).join('')}</div>
    <a class="bt bt-l" href="/${v}/telhas/#monte">Montar e orçar ${ic('seta')}</a>
  </div>
</div></section>

<section class="b-obras"><div class="w">
  <div class="b-sec-t b-sec-t2"><div><p class="rot">Obras</p><h2>Coberturas que estão de pé</h2></div><a class="bt bt-c" href="/${v}/obras/">Todas as obras ${ic('seta')}</a></div>
  <div class="b-obras-g">${obras.filter(o => o.destaque).concat(obras.slice(4, 6)).map((o, i) => `<figure class="b-ob b-ob-${i + 1}">${img(o.img, o.nome)}<figcaption><b>${o.nome}</b><span>${o.prod}</span></figcaption></figure>`).join('')}</div>
</div></section>

<section class="b-calc-ch"><div class="w b-calc-ch-g">
  <div><p class="rot">Calcule a sua obra</p><h2>Quanto de telha a sua cobertura precisa?</h2><p>Escolha o formato do telhado, informe as medidas e veja a estimativa de telhas, parafusos, fechamentos, calhas e rufos.</p><a class="bt bt-l" href="/${v}/calcule/">Abrir a calculadora ${ic('seta')}</a></div>
  <div class="b-calc-tipos">${calc.map(c => `<a href="/${v}/calcule/#${c.id}">${img(c.img, `Cobertura ${c.nome}`, { w: 220, h: 132 })}<span>${c.nome}</span></a>`).join('')}</div>
</div></section>

<section class="b-hist"><div class="w b-hist-g">
  <figure>${img('workshop', 'Workshop para instaladores de telhas e calhas da Pizzinatto', { w: 1600, h: 900 })}</figure>
  <div><p class="rot">Empresa</p><h2>${cultura.proposito}</h2><p>${sobre[1]}</p><a class="lk" href="/${v}/empresa/">Nossa história ${ic('seta')}</a></div>
</div></section>

<section class="b-selos"><div class="w">${seloLista()}</div></section>
${cta(v)}`);
}

function empresaPg(v) {
  const timeline = `<ol class="linha-tempo" data-etapas>${historia.map(h => `<li><b>${h.ano}</b><p>${h.t}</p></li>`).join('')}</ol>`;
  const valores = `<ul class="valores">${cultura.valores.map((x, i) => `<li><span>0${i + 1}</span>${x}</li>`).join('')}</ul>`;
  const garantia = `<div class="garantia-l">${Q.litoral.map(g => `<div><b>${g.prazo}</b><span>${g.t}</span></div>`).join('')}</div>`;
  const normas = `<dl class="normas">${Q.normas.map(n => `<div><dt>${n.n}</dt><dd>${n.t}</dd></div>`).join('')}</dl>`;
  return pagina(v, 'empresa', 'Empresa | Pizzinatto', 'Desde 1981 em Piracicaba-SP: história, cultura, qualidade e garantia da Pizzinatto.', `
${capa(v, { titulo: 'Desde 1981 fazendo coberturas que duram', sub: sobre[0], foto: 'obra-instalacao', rotulo: 'Empresa' })}
<section class="sec emp-intro"><div class="w emp-intro-g">
  <div><h2 class="${v}-tit">Nossa história</h2><p>${sobre[1]}</p><p>${sobre[2]}</p></div>
  <figure>${img('equipe', 'Equipe Pizzinatto', { w: 998, h: 288 })}</figure>
</div></section>
<section class="sec sec-hist"><div class="w">${timeline}</div></section>
<section class="sec sec-cultura"><div class="w cultura-g">
  <div class="cultura-prop"><p class="rot">Nosso propósito</p><p class="cultura-frase">${cultura.proposito}</p></div>
  <div><h3>Visão</h3><p>${cultura.visao}</p><h3>Missão</h3><p>${cultura.missao}</p></div>
  <div><h3>Valores</h3>${valores}</div>
</div></section>
<section class="sec sec-qual"><div class="w qual-g">
  <div><h2 class="${v}-tit">Qualidade e normas</h2><p>${Q.intro}</p>${normas}</div>
  <div class="qual-selos"><img src="/assets/img/selos-abnt.webp" alt="Selos NBR 14513, NBR 7008 e NBR 14125" width="1192" height="461" loading="lazy"><img src="/assets/img/hcfc.webp" alt="Certificado de Indústria Sustentável do Programa Brasileiro de Eliminação dos HCFCs" width="700" height="933" loading="lazy"></div>
</div></section>
<section class="sec sec-gar" id="garantia"><div class="w gar-g">
  <div><h2 class="${v}-tit">Garantia</h2><p>${Q.garantia}</p><p class="nota">${Q.recebimento}</p></div>
  <div><h3>Garantia em regiões litorâneas</h3>${garantia}</div>
</div></section>
<section class="sec sec-unid"><div class="w unid-g">
  <div class="unid"><h3>Matriz · Piracicaba-SP</h3><p>${E.endereco} · ${E.cep}<br>${E.cidade}</p><a href="tel:${E.foneHref}">${E.fone}</a></div>
  <div class="unid"><h3>${E.filial.nome}</h3><p>${E.filial.endereco} · ${E.filial.cep}<br>${E.filial.cidade}</p><a href="tel:${E.filial.foneHref}">${E.filial.fone}</a></div>
  <div class="unid unid-vagas"><h3>Trabalhe na Pizzinatto</h3><p>Valorizamos o desenvolvimento profissional, o trabalho em equipe e a integridade em tudo o que fazemos.</p><a href="${E.vagas}" ${ext}>Ver vagas ${ic('seta')}</a></div>
</div></section>
${cta(v)}`);
}

function telhasPg(v) {
  const sub = [['perfis', 'Telhas de aço'], ['termo', 'Termoacústicas'], ['zipada', 'Zipada'], ['especiais', 'Linhas especiais'], ['cores', 'Cores'], ['monte', 'Monte o seu produto'], ['catalogos', 'Catálogos']];
  const subnav = `<nav class="subnav" aria-label="Nesta página"><div class="w">${sub.map(([id, n]) => `<a href="#${id}">${n}</a>`).join('')}</div></nav>`;
  const perfisHtml = perfis.map(p => `<article class="perfil-it" id="${p.id}">
    <div class="perfil-it-f">${img(p.id, `Telha ${p.nome}`, { w: 1100, h: 420 })}</div>
    <div class="perfil-it-t"><h3>${p.nome} <small>${p.tipo}</small></h3><p>${p.t}</p>
      <div class="perfil-des">${perfilSvg(p, { largura: p.total, exag: 3 })}<span class="cota cota-l">${p.util} mm · largura útil</span><span class="cota cota-h">${p.altura} mm</span></div>
      <dl class="ficha"><div><dt>Largura total</dt><dd>${p.total} mm</dd></div><div><dt>Largura útil</dt><dd>${p.util} mm</dd></div><div><dt>Altura</dt><dd>${p.altura} mm</dd></div><div><dt>Espessuras</dt><dd>${p.esp} mm</dd></div><div><dt>Norma</dt><dd>${p.norma}</dd></div></dl>
      <button class="add" type="button" data-item="Telha ${p.nome} ${p.tipo.toLowerCase()}">${ic('mais')} Adicionar ao orçamento</button></div>
  </article>`).join('');
  const sob = `<div class="tab-rola"><table class="tab"><caption>Sobrecarga admissível (kg/m²) das telhas termoacústicas, por espessura do aço, número de apoios e vão entre apoios (mm)</caption><thead><tr><th>Aço</th><th>Apoios</th>${termo.vaos.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${termo.sobrecarga.map(g => g.linhas.map((l, i) => `<tr>${i ? '' : `<th rowspan="3">${g.esp} mm</th>`}${l.map((c, j) => `<td${j ? '' : ' class="ap"'}>${c}</td>`).join('')}</tr>`).join('')).join('')}</tbody></table></div>`;
  const esp = especiais.filter(e => e.id !== 'zipada');
  const zip = especiais.find(e => e.id === 'zipada');
  return pagina(v, 'telhas', 'Telhas de aço e termoacústicas | Pizzinatto', 'Telhas PZ 17, PZ 25, PZ 35, PZ 40×980, PZ 40×1020 e PZ 100, termoacústicas com EPS, PIR e lã de rocha, cobertura zipada, alumínio, perfuradas e mais.', `
${capa(v, { titulo: 'Telhas Pizzinatto', sub: telhasIntro, foto: 'obra-dongwon', rotulo: 'Telhas' })}
${subnav}
<section class="sec" id="perfis"><div class="w">
  <div class="sec-t"><h2 class="${v}-tit">Telhas de aço · naturais e pintadas</h2><p>Aço galvanizado ou galvalume, em seis perfis. Todas podem receber pintura eletrostática e virar termoacústica.</p></div>
  <div class="perfis-lista">${perfisHtml}</div>
</div></section>

<section class="sec sec-termo" id="termo"><div class="w">
  <div class="sec-t"><h2 class="${v}-tit">Telhas termoacústicas</h2><p>${termo.intro}</p></div>
  <div class="termo-g">${termo.recheios.map(r => `<article class="termo-r" id="${r.id}">${img(r.img, `Telha termoacústica com ${r.nome}`, { w: 220, h: 132 })}<div><p class="termo-tag">${r.curto}</p><h3>${r.nome}</h3><ul>${r.itens.map(t => `<li>${t}</li>`).join('')}</ul><p class="termo-d">${r.dados}</p></div></article>`).join('')}</div>
  <h3 class="sub-t">Acabamento da face inferior</h3>
  <div class="acab-g">${termo.acabamentos.map(a => `<figure>${img(a.img, `Acabamento ${a.nome}`, { w: 220, h: 132 })}<figcaption><b>${a.nome}</b>${a.t}</figcaption></figure>`).join('')}</div>
  <p class="nota">Aço: ${termo.aco}.</p>
  ${sob}
</div></section>

<section class="sec sec-zip" id="zipada"><div class="w zip-g">
  <div><p class="rot">${zip.selo}</p><h2 class="${v}-tit">${zip.nome}</h2><p>${zip.t}</p><ul class="check">${zip.itens.map(t => `<li>${t}</li>`).join('')}</ul><button class="add" type="button" data-item="Sistema de cobertura zipada">${ic('mais')} Adicionar ao orçamento</button></div>
  <div class="zip-f">${img('obra-max', 'Cobertura zipada no Max Atacadista, Piracicaba', { w: 1500, h: 1000 })}${img('zipada-perfil', 'Perfil da telha zipada: 490 mm de largura total e 477 mm útil', { w: 700, h: 275 })}${img('zipadeira', 'Zipadeira e clipe de fixação', { w: 600, h: 542 })}</div>
</div></section>

<section class="sec sec-esp" id="especiais"><div class="w">
  <div class="sec-t"><h2 class="${v}-tit">Linhas especiais</h2><p>Para beira-mar, fachadas, iluminação natural, arcos, câmaras frias e canteiros de obra.</p></div>
  <div class="esp-g">${esp.map((e, i) => `<article class="esp esp-${i % 3}" id="${e.id}">${img(e.img, e.nome, { w: 900, h: 600 })}<div>${e.selo ? `<p class="esp-selo">${e.selo}</p>` : ''}<h3>${e.nome}</h3><p>${e.t}</p><ul>${e.itens.map(t => `<li>${t}</li>`).join('')}</ul><button class="add" type="button" data-item="${e.nome}">${ic('mais')} Orçar</button></div></article>`).join('')}</div>
</div></section>

<section class="sec sec-cores" id="cores"><div class="w cores-g">
  <div><h2 class="${v}-tit">Tabela de cores</h2><p>${cores.pintura}</p><ul class="check">${cores.vantagens.map(t => `<li>${t}</li>`).join('')}</ul><p class="nota">Cores aproximadas na tela. Consulte outras cores exclusivas para o seu projeto.</p></div>
  <ul class="cores">${cores.lista.map(([n, c]) => `<li><span style="--c:${c}"></span>${n}</li>`).join('')}</ul>
</div></section>

<section class="sec sec-monte" id="monte"><div class="w">
  <div class="sec-t"><h2 class="${v}-tit">Monte o seu produto</h2><p>Escolha modelo, preenchimento, aço, espessura e cor. A configuração vai para a lista de orçamento e segue para o comercial.</p></div>
  ${montador(v)}
</div></section>

<section class="sec sec-cat" id="catalogos"><div class="w">
  <h2 class="${v}-tit">Catálogos e manuais</h2>
  <ul class="cat-l">${[['Catálogo · Coberturas & Acessórios', 'https://grupopizzinatto.com.br/download-coberturas-acessorios/'], ['Folder · Coberturas & Acessórios', 'https://grupopizzinatto.com.br/download-folder-coberturas-acessorios/'], ['Manual · Telhas de Aço', 'https://grupopizzinatto.com.br/pdf/manual_telhas.pdf'], ['Manual · Telha × Forro', 'https://grupopizzinatto.com.br/download-manual-de-instrucoes-telha-x-forro/'], ['Manual · Telha × Filme', 'https://grupopizzinatto.com.br/download-manual-de-instrucoes-telha-x-filme/'], ['Manual · Telhas de Alumínio', 'https://grupopizzinatto.com.br/telhasaluminio/'], ['Telhas para Regiões Litorâneas', 'https://grupopizzinatto.com.br/download-telhas-para-regioes-litoraneas/']].map(([n, h]) => `<li><a href="${h}" ${ext}>${ic('livro')}<span>${n}</span>${ic('seta')}</a></li>`).join('')}</ul>
</div></section>
${cta(v)}`);
}

function calhasPg(v) {
  return pagina(v, 'calhas', 'Calhas, rufos e acessórios | Pizzinatto', 'Calhas, rufos, condutores e pingadeiras em aço galvanizado, venezianas industriais, acessórios para coberturas e fixação.', `
${capa(v, { titulo: 'Calhas, arremates e acessórios', sub: calhas.intro.split('. ')[0] + '.', foto: 'obra-residencia', rotulo: 'Calhas e acessórios' })}
<section class="sec sec-calhas"><div class="w calhas-g">
  <figure class="calhas-casa">${img('casa-calhas', 'Onde vai cada peça: moldura, platibanda, água furtada, chalé, rufo, condutor e pingadeira', { w: 841, h: 626 })}<figcaption>Onde vai cada peça na casa</figcaption></figure>
  <div><h2 class="${v}-tit">Calhas Pizzinatto</h2><p>${calhas.intro}</p><p class="nota">Desde 1988 a Pizzinatto oferece calhas galvanizadas em até 6 metros.</p></div>
</div>
<div class="w"><div class="calhas-l">${calhas.itens.map(c => `<article class="calha">${img('calha-' + c.id, c.nome, { w: 220, h: 132 })}<p class="calha-g">${c.grupo}</p><h3>${c.nome}</h3><p>${c.t}</p><button class="add" type="button" data-item="${c.nome}">${ic('mais')} Orçar</button></article>`).join('')}</div></div></section>

<section class="sec sec-ven" id="venezianas"><div class="w ven-g">
  <div><h2 class="${v}-tit">Venezianas industriais</h2><p>${veneziana.t}</p><ul class="check">${veneziana.itens.map(t => `<li>${t}</li>`).join('')}</ul><button class="add" type="button" data-item="Venezianas industriais">${ic('mais')} Adicionar ao orçamento</button></div>
  <div class="ven-f">${img('veneziana', 'Venezianas industriais Pizzinatto', { w: 891, h: 350 })}${img('veneziana-modulos', 'Medidas do módulo da veneziana', { w: 400, h: 184 })}</div>
</div></section>

<section class="sec sec-aces" id="acessorios"><div class="w">
  <div class="sec-t"><h2 class="${v}-tit">Acessórios para coberturas</h2><p>As medidas e o comprimento variam conforme o modelo, a espessura do preenchimento ou o projeto.</p></div>
  <ol class="aces-g">${acessorios.map((a, i) => `<li><img src="/assets/img/aces-${String(i + 1).padStart(2, '0')}.webp" alt="" width="160" height="90" loading="lazy"><span><b>${String(i + 1).padStart(2, '0')}</b>${a}</span></li>`).join('')}</ol>
</div></section>

<section class="sec sec-fix" id="fixacao"><div class="w">
  <h2 class="${v}-tit">Acessórios para fixação</h2>
  <dl class="fix-l">${fixacao.map(f => `<div><dt>${f.nome}</dt><dd>${f.t}</dd></div>`).join('')}</dl>
  <p class="nota">Fechamentos de onda para PZ 17, PZ 25, PZ 35, PZ 40×980, PZ 40×1020 e PZ 100.</p>
</div></section>
${cta(v)}`);
}

function acoPg(v) {
  return pagina(v, 'aco', 'Aço e linha Corte | Pizzinatto', 'Aço galvanizado, galvalume, pré-pintado, pós-pintado e alumínio. Linha Corte: chapas, bobininhas, fitas e serviço de corte.', `
${capa(v, { titulo: 'Aço plano e linha Corte', sub: corte.t, foto: 'obra-interno2', rotulo: 'Aço e corte' })}
<section class="sec sec-acos"><div class="w">
  <div class="acos-l">${aco.map(a => `<article class="aco" id="${a.id}"><div class="aco-f">${img(a.img, a.nome, { w: 900, h: 560 })}</div><div><h2>${a.nome}</h2><p>${a.t}</p><ul class="check">${a.itens.map(t => `<li>${t}</li>`).join('')}</ul></div></article>`).join('')}</div>
</div></section>
<section class="sec sec-corte" id="corte"><div class="w">
  <div class="sec-t"><h2 class="${v}-tit">Linha Corte</h2><p>${corte.t} Aços: ${corte.acos.join(', ').toLowerCase()}. Espessuras ${corte.esp}.</p></div>
  <div class="corte-g">${corte.itens.map(c => `<article>${img(c.img, c.nome, { w: 400, h: 300 })}<h3>${c.nome}</h3><p>${c.t}</p><p class="corte-apl"><b>Aplicações:</b> ${c.apl}</p><button class="add" type="button" data-item="Linha Corte · ${c.nome}">${ic('mais')} Orçar</button></article>`).join('')}</div>
</div></section>
${cta(v)}`);
}

function obrasPg(v) {
  const cats = Object.entries(catObras);
  return pagina(v, 'obras', 'Obras | Pizzinatto', 'Obras com telhas Pizzinatto: CARDE, Bocão, Max Atacadista, Arena do Futuro, Teatrão de São José dos Campos, Volkswagen e muitas outras.', `
${capa(v, { titulo: 'Obras com produtos Pizzinatto', sub: 'Indústrias, centros de distribuição, lojas, arenas, museus e casas pelo Brasil.', foto: 'obra-arena', rotulo: 'Obras' })}
<section class="sec sec-obras" data-filtro><div class="w">
  <div class="filtro" role="group" aria-label="Filtrar obras"><button type="button" aria-pressed="true" data-cat="">Todas</button>${cats.map(([k, n]) => `<button type="button" aria-pressed="false" data-cat="${k}">${n}</button>`).join('')}</div>
  <ul class="galeria">${obras.map((o, i) => `<li data-cat="${o.cat}" class="${i % 7 === 0 ? 'gr' : ''}"><figure>${img(o.img, o.nome)}<figcaption><b>${o.nome}</b><span>${o.prod}</span></figcaption></figure></li>`).join('')}</ul>
  <p class="nota">Tem uma obra com produtos Pizzinatto? Envie a foto para <a href="mailto:${E.email}">${E.email}</a>.</p>
</div></section>
${cta(v)}`);
}

function calculePg(v) {
  const num = (n, l, extra = '') => `<label>${l}<input name="${n}" type="number" inputmode="decimal" min="0" step="0.01"${extra}><span class="un">m</span></label>`;
  const rad = (n, ops, sel = 0) => `<div class="pilulas">${ops.map((o, i) => `<label><input type="radio" name="${n}" value="${o}"${i === sel ? ' checked' : ''}><span>${o}</span></label>`).join('')}</div>`;
  return pagina(v, 'calcule', 'Calcule a sua obra | Pizzinatto', 'Calculadora de telhas: escolha uma água, duas águas, shed ou arco, informe as medidas e veja a estimativa de telhas, parafusos, calhas e rufos.', `
${capa(v, { titulo: 'Calcule a sua obra', sub: 'Escolha o formato da cobertura, informe as medidas em metros e veja a estimativa de material na hora.', foto: 'obra-guindaste2', rotulo: 'Calcule sua obra' })}
<section class="sec sec-calc"><div class="w">
<form class="calc" data-calc>
  <fieldset class="calc-tipos"><legend>1. Formato da cobertura</legend>
    ${calc.map((c, i) => `<label class="calc-tipo"><input type="radio" name="tipo" value="${c.id}"${i ? '' : ' checked'}>${img(c.img, '', { w: 220, h: 132 })}<span>${c.nome}</span></label>`).join('')}
  </fieldset>
  <div class="calc-g">
    <div class="calc-in">
      <fieldset><legend>2. Medidas da cobertura</legend>
        <div class="calc-ex">${calc.map((c, i) => `<img data-ex="${c.id}" src="/assets/img/${c.ex}.webp" alt="Onde medir na cobertura ${c.nome}" width="213" height="140" loading="lazy"${i ? ' hidden' : ''}>`).join('')}</div>
        <div class="campos">${num('x', '<span data-rot-x>Largura (X)</span>', ' required')}${num('y', '<span data-rot-y>Comprimento (Y)</span>', ' required')}<label data-so-shed hidden>Quantidade de sheds (q)<input name="q" type="number" inputmode="numeric" min="1" step="1" value="1"></label></div>
      </fieldset>
      <fieldset><legend>3. Fechamento lateral <small>(opcional)</small></legend>
        <div class="campos">${num('a', 'Medida (a)')}${num('b', 'Medida (b)')}${num('c', 'Medida (c)')}<span data-so-d hidden>${num('d', 'Medida (d)')}</span>${num('h', 'Altura (h)')}</div>
      </fieldset>
      <fieldset><legend>4. Tipo de telha</legend>
        ${rad('telha', ['Telha simples', 'Telha termoacústica'])}
        <div data-so-termo hidden><p class="mini">Preenchimento</p>${rad('recheio', ['Poliestireno (EPS)', 'Poliisocianurato (PIR)', 'Lã de Rocha'])}</div>
        <p class="mini">Fechamento lateral</p>${rad('lateral', ['Telha simples', 'Telha termoacústica'])}
        <p class="mini">Incluir calhas e rufos?</p>${rad('calhas', ['Sim', 'Não'])}
      </fieldset>
    </div>
    <aside class="calc-res" aria-live="polite">
      <h2>Estimativa de material</h2>
      <dl data-res><div><dt>Telhas da cobertura</dt><dd>—</dd></div></dl>
      <p class="nota">Mesmas contas do "Calcule a sua obra" do site atual, com 10% de perda. É uma estimativa: o comercial confirma modelo, espessura e quantidades no orçamento.</p>
      <button class="bt bt-l" type="button" data-calc-env disabled>${ic('lista')} Enviar para orçamento</button>
    </aside>
  </div>
</form>
</div></section>
${cta(v)}`);
}

function contatoPg(v) {
  const ufs = 'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ');
  return pagina(v, 'contato', 'Contato e orçamento | Pizzinatto', 'Solicite um orçamento de telhas, calhas e aço. Telefone (19) 3437-8300, WhatsApp, SAC, 2ª via de boleto e entrega.', `
${capa(v, { titulo: 'Contato e orçamento', sub: 'Fale com o comercial pelo telefone, WhatsApp ou e-mail, ou envie a lista de orçamento abaixo.', foto: 'obra-galpao-cargas', rotulo: 'Contato' })}
<section class="sec sec-canais"><div class="w canais">
  <a href="tel:${E.foneHref}">${ic('tel')}<span>Telefone</span><b>${E.fone}</b></a>
  <a href="${waLink()}" ${ext}>${ic('wa')}<span>WhatsApp</span><b>${E.fone}</b></a>
  <a href="mailto:${E.email}">${ic('mail')}<span>E-mail</span><b>${E.email}</b></a>
  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua da Glória, 2300, Piracicaba SP')}" ${ext}>${ic('pin')}<span>Matriz</span><b>${E.endereco}, ${E.cidade}</b></a>
</div></section>

<section class="sec sec-orc" id="orcamento"><div class="w orc-g">
  <form class="form" data-orc data-mailto="${E.email}" data-assunto="Orçamento pelo site">
    <h2 class="${v}-tit">Solicite um orçamento</h2>
    <div class="orc-lista" data-orc-lista hidden><h3>Itens da sua lista</h3><ul></ul><button type="button" class="lk" data-orc-limpa>Limpar lista</button></div>
    <div class="form-g">
      <label>Nome*<input name="Nome" required autocomplete="name"></label>
      <label>E-mail*<input name="E-mail" type="email" required autocomplete="email"></label>
      <label>Telefone*<input name="Telefone" type="tel" required autocomplete="tel"></label>
      <label>Empresa<input name="Empresa" autocomplete="organization"></label>
      <label>Estado<select name="Estado"><option value="">Selecione</option>${ufs.map(u => `<option${u === 'SP' ? ' selected' : ''}>${u}</option>`).join('')}</select></label>
      <label>Cidade<input name="Cidade" autocomplete="address-level2"></label>
    </div>
    <fieldset class="pilulas"><legend>Contato</legend><label><input type="radio" name="Contato" value="Pessoa jurídica" checked><span>Pessoa jurídica</span></label><label><input type="radio" name="Contato" value="Pessoa física"><span>Pessoa física</span></label></fieldset>
    <label>Itens para orçamento*<textarea name="Itens" rows="6" required placeholder="Modelo, espessura, preenchimento, cor, comprimento e quantidade"></textarea></label>
    <p class="nota">Tem projeto ou planta? Envie o arquivo pelo WhatsApp depois de mandar a lista.</p>
    <div class="form-b"><button class="bt bt-l" type="submit">${ic('mail')} Enviar por e-mail</button><button class="bt bt-v" type="button" data-wa="${E.wa}">${ic('wa')} Enviar pelo WhatsApp</button></div>
  </form>
  <aside class="orc-lado">
    <div class="aviso"><h3>${ic('escudo')} Atenção a boletos falsos</h3><p>Os boletos da Pizzinatto são enviados somente por e-mails com o remetente <b>@grupopizzinatto.com.br</b>. Ao pagar, confira se a razão social e o CNPJ são os mesmos da nota fiscal. Na dúvida, ligue para ${E.fone}.</p></div>
    <div class="lado-b" id="boleto"><h3>${ic('boleto')} 2ª via de boletos e notas fiscais</h3><p>Emita a segunda via do boleto direto no banco ou peça a nota fiscal ao financeiro.</p><a class="lk" href="${E.boleto}" ${ext}>Emitir 2ª via ${ic('seta')}</a></div>
    <div class="lado-b" id="sac"><h3>${ic('sac')} SAC · Atendimento ao Cliente</h3><p>Elogios, sugestões, reclamações e acionamento de garantia. Informe o número do pedido para agilizar.</p><a class="lk" href="mailto:${E.email}?subject=${encodeURIComponent('SAC · Atendimento ao Cliente')}">Abrir chamado ${ic('seta')}</a></div>
    <div class="lado-b"><h3>Representante comercial</h3><p>Tem experiência em vendas de aço ou material de construção? Venha fazer parte da equipe de representantes.</p><a class="lk" href="mailto:${E.email}?subject=${encodeURIComponent('Representante comercial')}">Quero representar ${ic('seta')}</a></div>
  </aside>
</div></section>

<section class="sec sec-entrega" id="entrega"><div class="w ent-g">
  <div><h2 class="${v}-tit">${ic('cami')} Entrega e recebimento</h2><p>Caminhões acima de 3 eixos precisam de autorização prévia da prefeitura para circular em Piracicaba e devem entrar pela Rodovia Cornélio Pires (SP-127).</p>
    <ol class="passos"><li>Estacione o caminhão nos locais indicados.</li><li>Dirija-se à recepção (Rua da Glória, esquina com Rua Dr. João Conceição).</li><li>Aguarde a Logística chamar para carregar ou descarregar.</li></ol>
    <p class="nota">Acesso às dependências só acompanhado por funcionário, com EPI, calça, camisa e sapato de segurança. Ajudantes e familiares precisam de autorização.</p></div>
  <dl class="portoes"><div><dt>Portão 6</dt><dd>Carregamento de produtos · Av. Dr. Paulo de Moraes / Rua São João</dd></div><div><dt>Portão 5</dt><dd>Descarregamento de bobinas · Rua da Glória / Rua Dr. João Conceição / Tv. Etamir</dd></div><div><dt>Portões 1, 2 e 3</dt><dd>Rua Dr. João Conceição</dd></div></dl>
</div></section>`);
}

export function gerarVersao(v) {
  return { index: home(v), empresa: empresaPg(v), telhas: telhasPg(v), calhas: calhasPg(v), aco: acoPg(v), obras: obrasPg(v), calcule: calculePg(v), contato: contatoPg(v) };
}
