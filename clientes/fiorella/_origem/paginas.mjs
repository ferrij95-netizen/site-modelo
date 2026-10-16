// Páginas das duas versões do site da Fiorella Brasil, em pt / en / es.
// A = "Fábrica": clara e editorial (referências: Freudenberg Performance Materials, Lydall). Foto real das
//     bordadeiras na capa, mercados em mosaico, processo do nãotecido ilustrado, régua de gramaturas por linha.
// B = "Fibra": escura e de impacto, com a macro da fibra da própria Fiorella na capa, mercados em lista
//     numerada, buscador de entretelas por uso e toque, processo em fio contínuo.
// Os mesmos textos, fotos, produtos e páginas nas duas.
import * as C from './conteudo.mjs';

const { site, UI, textos: X, LANGS } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const VNOME = { a: 'Fábrica', b: 'Fibra' };

export const PAGINAS = ['', 'produtos', ...C.mercados.map(m => 'produtos/' + m.slug), 'empresa', 'contato'];

// t(['pt','en','es']) devolve o texto da língua atual
let L = 'pt', LI = 0, V = 'a';
const t = x => (Array.isArray(x) ? (x[LI] ?? x[0]) : x);
const url = (slug = '', v = V, l = L) => `/${v}/${l === 'pt' ? '' : l + '/'}${slug ? slug + '/' : ''}`;
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;
const wa = msg => `https://wa.me/${site.whats}?text=${encodeURIComponent(msg)}`;
const MSG = [
  'Olá! Vim pelo site da Fiorella e gostaria de falar com o comercial.',
  'Hello! I found Fiorella on the website and would like to talk to sales.',
  '¡Hola! Llegué por el sitio de Fiorella y quisiera hablar con el área comercial.',
];
const MSGPROD = ['Olá! Vim pelo site da Fiorella e gostaria de um orçamento de ', 'Hello! I would like a quote for ', '¡Hola! Quisiera un presupuesto de '];

const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  whats: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.3 2 2.5 4.3 4.6 4.6l1.2-1.2 1.7.9c-.3 1-1.2 1.7-2.2 1.6-3.3-.4-6-3.1-6.4-6.4-.1-1 .6-1.9 1.6-2.2l.9 1.7z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  sacola: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  baixo: '<path d="m6 9 6 6 6-6"/>',
  selo: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const BAND = {
  pt: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#009b3a"/><path d="M14 2.5 25.5 10 14 17.5 2.5 10z" fill="#fedf00"/><circle cx="14" cy="10" r="4.6" fill="#002776"/></svg>',
  en: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#fff"/><path d="M0 0h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28V20H0z" fill="#b22234"/><rect width="12" height="10.8" fill="#3c3b6e"/></svg>',
  es: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#c60b1e"/><rect y="5" width="28" height="10" fill="#ffc400"/></svg>',
};
const LNOME = { pt: 'Português', en: 'English', es: 'Español' };

// ---------- partes comuns ----------
const MERC = Object.fromEntries(C.mercados.map(m => [m.slug, m]));

function titulo(slug) {
  const nome = site.nome;
  if (!slug) return [`${nome} · ${t(X.heroTitulo)}`, t(X.heroLead)];
  if (slug === 'produtos') return [`${t(UI.produtos)} · ${nome}`, t(X.produtosLead)];
  if (slug === 'empresa') return [`${t(UI.empresa)} · ${nome}`, t(X.sobre[0])];
  if (slug === 'contato') return [`${t(UI.contato)} · ${nome}`, t(X.contatoLead)];
  const m = MERC[slug.split('/')[1]];
  return [`${t(m.nome)} · ${nome}`, t(m.resumo)];
}

function head(slug) {
  const [tt, d] = titulo(slug);
  const can = site.dominio + url(slug);
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${C.HTMLLANG[l]}" href="${site.dominio}${url(slug, V, l)}">`).join('\n');
  return `<!doctype html>
<html lang="${C.HTMLLANG[L]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tt)}</title>
<meta name="description" content="${esc(d)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${can}">
${alt}
<link rel="alternate" hreflang="x-default" href="${site.dominio}${url(slug, V, 'pt')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.nome}">
<meta property="og:locale" content="${C.LOCALE[L]}">
<meta property="og:title" content="${esc(tt)}">
<meta property="og:description" content="${esc(d)}">
<meta property="og:url" content="${can}">
<meta property="og:image" content="${site.dominio}/assets/og-${V}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(tt)}">
<meta name="twitter:description" content="${esc(d)}">
<meta name="twitter:image" content="${site.dominio}/assets/og-${V}.jpg">
<meta name="theme-color" content="${V === 'a' ? '#ffffff' : '#1a0b0d'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${V}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function header(slug) {
  const ativo = s => (slug === s || (s === 'produtos' && slug.startsWith('produtos')) ? ' aria-current="page"' : '');
  const sub = C.mercados.map(m => `<a href="${url('produtos/' + m.slug)}"><i style="--c:${m.cor}"></i>${esc(t(m.nome))}</a>`).join('');
  const langs = LANGS.map(l => `<a href="${url(slug, V, l)}" hreflang="${C.HTMLLANG[l]}" lang="${C.HTMLLANG[l]}" title="${LNOME[l]}"${l === L ? ' aria-current="true"' : ''}>${BAND[l]}<span>${l.toUpperCase()}</span></a>`).join('');
  return `<a class="pular" href="#conteudo">${t(['Ir para o conteúdo', 'Skip to content', 'Ir al contenido'])}</a>
<header class="topo" data-topo>
  <div class="in topo-in">
    <a class="marca" href="${url()}" aria-label="Fiorella Brasil, ${esc(t(UI.inicio))}">
      <img src="/assets/img/${V === 'b' ? 'logo-branco' : 'logo'}.webp" alt="Fiorella" width="800" height="291">
      <small>${esc(t(UI.tag))}</small>
    </a>
    <button class="menu-bt" type="button" aria-expanded="false" aria-controls="nav" data-menu>${ico('menu')}<span>${esc(t(UI.menu))}</span></button>
    <nav id="nav" class="nav" aria-label="${esc(t(UI.menu))}">
      <a href="${url()}"${slug === '' ? ' aria-current="page"' : ''}>${esc(t(UI.inicio))}</a>
      <div class="drop">
        <a href="${url('produtos')}"${ativo('produtos')}>${esc(t(UI.produtos))}${ico('baixo', 'ico seta-baixo')}</a>
        <div class="drop-m">${sub}</div>
      </div>
      <a href="${url('empresa')}"${ativo('empresa')}>${esc(t(UI.empresa))}</a>
      <a href="${url('contato')}"${ativo('contato')}>${esc(t(UI.contato))}</a>
      <a href="${site.loja}" target="_blank" rel="noopener" class="nav-loja">${ico('sacola')}${esc(t(UI.loja))}</a>
      <div class="langs" aria-label="${esc(t(UI.idioma))}">${langs}</div>
      <a class="bt bt-p nav-cta" href="${wa(MSG[LI])}" target="_blank" rel="noopener">${ico('whats')}${esc(t(UI.falar))}</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  const merc = C.mercados.map(m => `<li><a href="${url('produtos/' + m.slug)}">${esc(t(m.nome))}</a></li>`).join('');
  return `<footer class="rodape">
  <div class="in rod-grid">
    <div class="rod-marca">
      <img src="/assets/img/logo-branco.webp" alt="Fiorella" width="800" height="291" loading="lazy">
      <p>${esc(site.razao)}<br>CNPJ ${site.cnpj}</p>
      <img class="rod-iso" src="/assets/img/iso-sgs-ukas.webp" alt="ISO 9001 SGS UKAS" width="294" height="177" loading="lazy">
    </div>
    <div><h3>${esc(t(UI.produtos))}</h3><ul>${merc}</ul></div>
    <div><h3>${esc(t(UI.links))}</h3><ul>
      <li><a href="${url('empresa')}">${esc(t(UI.empresa))}</a></li>
      <li><a href="${url('contato')}">${esc(t(UI.contato))}</a></li>
      <li><a href="${site.loja}" target="_blank" rel="noopener">FiorellaShop ↗</a></li>
      <li><a href="${site.instagram}" target="_blank" rel="noopener">Instagram ↗</a></li>
    </ul></div>
    <div class="rod-ct">
      <h3>${esc(t(UI.localizacao))}</h3>
      <p>${esc(t(site.endereco))}</p>
      <p><a href="${site.waze}" target="_blank" rel="noopener">Waze ↗</a> · <a href="${site.mapa}" target="_blank" rel="noopener">Google Maps ↗</a></p>
      <h3>${esc(t(UI.atendimento))}</h3>
      <p><a href="tel:${site.foneHref}">${site.fone}</a> · <a href="${wa(MSG[LI])}" target="_blank" rel="noopener">WhatsApp</a><br><a href="mailto:${site.email}">${site.email}</a></p>
    </div>
  </div>
  <div class="in rod-fim"><span>© ${new Date().getFullYear()} ${site.nome}. ${esc(t(UI.direitos))}</span><a href="#topo" data-topo-link>${esc(t(UI.voltar))} ↑</a></div>
</footer>
<a class="zap" href="${wa(MSG[LI])}" target="_blank" rel="noopener" aria-label="WhatsApp">${ico('whats')}</a>`;
}

const pagina = (slug, corpo, cls = '') => `${head(slug)}
<body class="v-${V} ${cls}" id="topo">
${header(slug)}
<main id="conteudo">
${corpo}
</main>
${footer()}
</body>
</html>
`;

const migalha = itens => `<nav class="migalha" aria-label="breadcrumb"><a href="${url()}">${esc(t(UI.inicio))}</a>${itens.map(([n, s]) => ` <span>/</span> ${s != null ? `<a href="${url(s)}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`}`).join('')}</nav>`;

const numerosHtml = cls => `<ul class="${cls}">${C.numeros.map(n => `<li><b>${n.n}<small>${esc(t(n.u))}</small></b><span>${esc(t(n.t))}</span></li>`).join('')}</ul>`;

// ---------- ilustrações do processo (SVG próprio, desenho simples de cada etapa) ----------
const PROC_SVG = [
  // fibras soltas
  '<g stroke-linecap="round" fill="none"><path d="M10 40c12-14 26 10 40-6s20 4 30-8"/><path d="M8 58c16-6 22-20 40-12s28-6 40 4"/><path d="M14 74c10-10 24 4 34-4s22-14 36 2"/><path d="M20 26c8 6 18-6 28 2s18-4 26 4" opacity=".6"/></g>',
  // manta (camadas)
  '<g fill="none" stroke-linejoin="round"><path d="M10 62 50 44l40 18-40 18z"/><path d="M10 52 50 34l40 18" opacity=".6"/><path d="M10 42 50 24l40 18" opacity=".35"/><path d="M26 64c8-3 14 3 22 0s16 3 24 0" stroke-linecap="round" opacity=".7"/></g>',
  // resina (gotas sobre a manta)
  '<g fill="none" stroke-linejoin="round"><path d="M10 66 50 50l40 16-40 16z"/><path d="M34 18c0 6-5 8-5 13a5 5 0 0 0 10 0c0-5-5-7-5-13z"/><path d="M52 10c0 6-5 8-5 13a5 5 0 0 0 10 0c0-5-5-7-5-13z"/><path d="M70 20c0 6-5 8-5 13a5 5 0 0 0 10 0c0-5-5-7-5-13z"/></g>',
  // estufa
  '<g fill="none" stroke-linejoin="round" stroke-linecap="round"><rect x="16" y="22" width="68" height="50" rx="6"/><path d="M4 56h92" /><path d="M30 34c0 4 4 4 4 8s-4 4-4 8M48 34c0 4 4 4 4 8s-4 4-4 8M66 34c0 4 4 4 4 8s-4 4-4 8"/></g>',
  // rolo
  '<g fill="none" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="30" cy="48" rx="14" ry="24"/><ellipse cx="30" cy="48" rx="4" ry="7"/><path d="M30 24h46c8 0 14 10 14 24s-6 24-14 24H30"/><path d="M90 48c0 0-2 22-10 30H40" opacity=".6"/></g>',
];
const processo = cls => `<ol class="${cls}">${X.processo.map(([n, d], i) => `<li><svg viewBox="0 0 100 90" aria-hidden="true">${PROC_SVG[i]}</svg><span class="proc-n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t(n))}</h3><p>${esc(t(d))}</p></li>`).join('')}</ol>`;

// ---------- produtos ----------
const gTxt = p => `${p.g} g/m²`;
const linhaTag = p => `<span class="ln" style="--c:${C.linhas[p.linha].cor}">${esc(t(C.linhas[p.linha].nome))}</span>`;

function cardProduto(p) {
  const espec = `<dl class="espec">
      <div><dt>${esc(t(UI.gramatura))}</dt><dd>${gTxt(p)}</dd></div>
      <div><dt>${esc(t(UI.composicao))}</dt><dd>${esc(t(p.comp))}</dd></div>
      <div><dt>${esc(t(UI.larguras))}</dt><dd>${esc(t(p.larg))}</dd></div>
      <div><dt>${esc(t(UI.comprimentos))}</dt><dd>${esc(t(p.compr))}</dd></div>
    </dl>`;
  const vari = p.variacoes ? `<table class="vari"><thead><tr><th>${esc(t(UI.referencia))}</th><th>${t(['Medida', 'Size', 'Medida'])}</th><th>${t(['Por folha', 'Per sheet', 'Por hoja'])}</th><th>${t(['Por caixa', 'Per box', 'Por caja'])}</th></tr></thead><tbody>${p.variacoes.map(v => `<tr><td>${v[0]}</td><td>${v[1]}</td><td>${v[2]}</td><td>${v[3]}</td></tr>`).join('')}</tbody></table>` : '';
  return `<article class="prod" id="${p.cod.toLowerCase().replace(/\s+/g, '-')}" style="--c:${C.linhas[p.linha].cor}" data-linha="${p.linha}" data-merc="${p.merc}">
    <figure>${img(p.ficha, `${p.cod}, ${t(C.linhas[p.linha].nome)}`)}</figure>
    <div class="prod-c">
      ${linhaTag(p)}
      <h3>${p.cod}</h3>
      <p>${esc(t(p.apl))}</p>
      ${espec}${vari}
      <div class="prod-bt">
        <a class="bt bt-p" href="${p.url}" target="_blank" rel="noopener">${ico('sacola')}${esc(t(UI.comprar))}</a>
        <a class="bt bt-l" href="${wa(MSGPROD[LI] + p.cod + '.')}" target="_blank" rel="noopener">${esc(t(UI.orcamento))}</a>
      </div>
    </div>
  </article>`;
}

// régua de gramaturas: uma faixa por linha
function regua() {
  const min = 20, max = 110;
  const pos = g => ((g - min) / (max - min) * 100).toFixed(2);
  const linhas = Object.keys(C.linhas).filter(k => C.produtos.some(p => p.linha === k));
  const marcas = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110].map(g => `<span style="left:${pos(g)}%">${g}</span>`).join('');
  const rows = linhas.map(k => {
    const ps = C.produtos.filter(p => p.linha === k);
    const dots = ps.map((p, i) => `<a class="rg-dot" href="${url('produtos/' + p.merc)}#${p.cod.toLowerCase().replace(/\s+/g, '-')}" style="left:${pos(p.gNum || p.g)}%" ${i % 2 ? 'data-baixo' : ''}><i></i><span>${p.cod}<small>${p.g} g</small></span></a>`).join('');
    return `<div class="rg-row" style="--c:${C.linhas[k].cor}"><span class="rg-nome">${esc(t(C.linhas[k].nome))}</span><div class="rg-trilho">${dots}</div></div>`;
  }).join('');
  return `<div class="regua" role="group" aria-label="${esc(t(X.reguaTitulo))}"><div class="regua-in">${rows}<div class="rg-row rg-eixo"><span class="rg-nome">g/m²</span><div class="rg-trilho">${marcas}</div></div></div></div>`;
}

function formContato(merc = '') {
  const opts = C.mercados.map(m => `<option value="${esc(t(m.nome))}"${m.slug === merc ? ' selected' : ''}>${esc(t(m.nome))}</option>`).join('');
  return `<form class="form" data-zap="${site.whats}" data-intro="${esc(MSG[LI])}">
    <label><span>${esc(t(UI.nome))}</span><input name="${esc(t(UI.nome))}" required autocomplete="name"></label>
    <label><span>${esc(t(UI.empresaCampo))}</span><input name="${esc(t(UI.empresaCampo))}" autocomplete="organization"></label>
    <label><span>${esc(t(UI.telefone))}</span><input name="${esc(t(UI.telefone))}" type="tel" autocomplete="tel"></label>
    <label><span>${esc(t(UI.mercadoCampo))}</span><select name="${esc(t(UI.mercadoCampo))}">${opts}<option>${esc(t(UI.outro))}</option></select></label>
    <label class="full"><span>${esc(t(UI.mensagem))}</span><textarea name="${esc(t(UI.mensagem))}" rows="4" placeholder="${esc(t(UI.mensagemPh))}" required></textarea></label>
    <button class="bt bt-p full" type="submit">${ico('whats')}${esc(t(UI.enviar))}</button>
  </form>`;
}

const cta = () => `<section class="cta">
  <div class="in cta-in">
    <div><h2>${esc(t(X.ctaTitulo))}</h2><p>${esc(t(X.ctaLead))}</p></div>
    <div class="cta-bt">
      <a class="bt bt-p" href="${wa(MSG[LI])}" target="_blank" rel="noopener">${ico('whats')}WhatsApp</a>
      <a class="bt bt-o" href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a>
    </div>
  </div>
</section>`;

const lojaBloco = cls => `<section class="${cls}">
  <div class="in loja-in">
    <div class="loja-txt">
      <span class="eyebrow">FiorellaShop · ${esc(t(UI.lojaNome))}</span>
      <h2>${esc(t(X.lojaTitulo))}</h2>
      <p>${esc(t(X.lojaLead))}</p>
      <a class="bt bt-p" href="${site.loja}" target="_blank" rel="noopener">${ico('sacola')}${t(['Ir para a loja', 'Visit the store', 'Ir a la tienda'])}</a>
    </div>
    <div class="loja-img">
      <a href="https://www.fiorellashop.com.br/entretelas-para-bordados" target="_blank" rel="noopener">${img('banner-bordados', t(['Entretelas para bordados na FiorellaShop', 'Embroidery backings at FiorellaShop', 'Entretelas para bordados en FiorellaShop']), 'width="554" height="352"')}</a>
      <a href="https://www.fiorellashop.com.br/entretelas-colantes-para-confeccao" target="_blank" rel="noopener">${img('banner-confeccao', t(['Entretelas para confecção na FiorellaShop', 'Clothing interlinings at FiorellaShop', 'Entretelas para confección en FiorellaShop']), 'width="554" height="352"')}</a>
    </div>
  </div>
</section>`;

const politicaBloco = () => `<div class="politica">
  <h3>${esc(t(X.politicaTitulo))}</h3>
  <p>${esc(t(X.politicaIntro))}</p>
  <ul>${X.politica.map(p => `<li>${ico('check')}${esc(t(p))}</li>`).join('')}</ul>
  <p class="ass">${esc(t(X.politicaAss))}</p>
</div>`;

// ---------- HOME A ----------
function homeA() {
  const tile = (m, cls, foto = m.foto) => `<a class="mt ${cls}" href="${url('produtos/' + m.slug)}" style="--c:${m.cor}">
      ${img(foto, t(m.nome))}
      <div><span class="mt-k">${esc(t(m.curto))}</span><h3>${esc(t(m.nome))}</h3><p>${esc(t(m.resumo))}</p><b>${esc(t(UI.verLinha))} ${ico('seta')}</b></div>
    </a>`;
  return `<section class="hA">
  <div class="in hA-in">
    <div class="hA-txt">
      <span class="eyebrow">${esc(t(X.heroEyebrow))}</span>
      <h1>${esc(t(X.heroTitulo))}</h1>
      <p class="lead">${esc(t(X.heroLead))}</p>
      <div class="hA-bt">
        <a class="bt bt-p" href="${url('produtos')}">${esc(t(UI.verProdutos))} ${ico('seta')}</a>
        <a class="bt bt-l" href="${wa(MSG[LI])}" target="_blank" rel="noopener">${ico('whats')}${esc(t(UI.falar))}</a>
      </div>
      <ul class="hA-sel"><li>${ico('selo')}${esc(t(X.iso))}</li><li>${ico('pin')}Mairinque (SP) · ${esc(t(X.americas))}</li></ul>
    </div>
    <figure class="hA-fig">
      ${img('bordadeiras', t(['Bordadeiras industriais bordando sobre entretela Fiorella', 'Industrial embroidery machines working on Fiorella backing', 'Bordadoras industriales sobre entretela Fiorella']), 'fetchpriority="high" loading="eager" width="1790" height="1239"')}
      <div class="hA-amostra">${img('fibra-vermelha-2', '')}<span>${t(['Nãotecido resinado', 'Chemical bonded nonwoven', 'No tejido resinado'])}<small>${t(['poliéster · viscose', 'polyester · viscose', 'poliéster · viscosa'])}</small></span></div>
      <figcaption class="hA-anos"><b>49</b><span>${t(['anos de<br>tradição', 'years of<br>tradition', 'años de<br>tradición'])}</span></figcaption>
    </figure>
  </div>
</section>

<section class="numA">
  <div class="in numA-in">${numerosHtml('nums')}<img src="/assets/img/iso-sgs-ukas.webp" alt="ISO 9001 · SGS · UKAS" width="294" height="177" loading="lazy"></div>
</section>

<section class="secA">
  <div class="in">
    <header class="sec-h"><span class="eyebrow">${esc(t(UI.mercados))}</span><h2>${esc(t(X.mercadosTitulo))}</h2><p>${esc(t(X.mercadosLead))}</p></header>
    <div class="bento">
      ${tile(MERC.bordado, 'b1')}
      ${tile(MERC.confeccao, 'b2', 'confeccao-moda')}
      ${tile(MERC.automotiva, 'b3')}
      ${tile(MERC.filtros, 'b4')}
      ${tile(MERC.aplicacoes, 'b5')}
    </div>
  </div>
</section>

<section class="procA">
  <div class="in">
    <header class="sec-h"><span class="eyebrow">${t(['Processo', 'Process', 'Proceso'])}</span><h2>${esc(t(X.processoTitulo))}</h2><p>${esc(t(X.processoLead))}</p></header>
    ${processo('proc')}
  </div>
</section>

<section class="secA reguaA">
  <div class="in">
    <header class="sec-h sec-h-l"><span class="eyebrow">${t(['Linha de entretelas', 'Interlining range', 'Línea de entretelas'])}</span><h2>${esc(t(X.reguaTitulo))}</h2><p>${esc(t(X.reguaLead))}</p></header>
    ${regua()}
  </div>
</section>

<section class="fabA">
  <div class="in fabA-in">
    <figure>${img('fabrica-aerea', t(['Vista aérea da fábrica da Fiorella em Mairinque (SP)', 'Aerial view of the Fiorella plant in Mairinque (SP)', 'Vista aérea de la fábrica de Fiorella en Mairinque (SP)']), 'width="728" height="599"')}<figcaption>Mairinque · SP · 50.000 m²</figcaption></figure>
    <div class="fabA-txt">
      <span class="eyebrow">${esc(t(X.sobreTitulo))}</span>
      <h2>${esc(t(X.empresaTitulo))}</h2>
      ${X.sobre.slice(0, 3).map(p => `<p>${esc(t(p))}</p>`).join('')}
      <a class="link" href="${url('empresa')}">${esc(t(UI.saibaMais))} ${ico('seta')}</a>
    </div>
    ${politicaBloco()}
  </div>
</section>

${lojaBloco('lojaA')}
${cta()}`;
}

// ---------- HOME B ----------
function homeB() {
  const linhasUso = Object.keys(C.linhas).filter(k => C.produtos.some(p => p.linha === k));
  const usos = ['bordado', 'confeccao', 'aplicacoes'];
  const tiles = C.produtos.map(p => `<a class="ft" href="${url('produtos/' + p.merc)}#${p.cod.toLowerCase().replace(/\s+/g, '-')}" data-linha="${p.linha}" data-merc="${p.merc}" style="--c:${C.linhas[p.linha].cor}">
      ${img(p.ficha, p.cod)}
      <span class="ft-b"><b>${p.cod}</b><small>${p.g} g/m² · ${esc(t(p.comp))}</small></span>
    </a>`).join('');
  return `<section class="hB">
  ${img('fibra-vermelha-2', '', 'class="hB-bg" fetchpriority="high" loading="eager"')}
  <div class="in hB-in">
    <span class="eyebrow">${esc(t(X.heroEyebrow))}</span>
    <h1>${esc(t(X.heroTituloB))}</h1>
    <p class="lead">${esc(t(X.heroLead))}</p>
    <div class="hB-bt">
      <a class="bt bt-p" href="#buscador">${esc(t(X.finderTitulo))} ${ico('seta')}</a>
      <a class="bt bt-o" href="${wa(MSG[LI])}" target="_blank" rel="noopener">${ico('whats')}${esc(t(UI.falar))}</a>
    </div>
    ${numerosHtml('nums hB-nums')}
  </div>
</section>

<div class="faixa" aria-hidden="true"><div>${[...C.mercados, ...C.mercados].map(m => `<span>${esc(t(m.nome))}</span>`).join('')}${[...C.mercados, ...C.mercados].map(m => `<span>${esc(t(m.nome))}</span>`).join('')}</div></div>

<section class="mercB">
  <div class="in">
    <header class="sec-h sec-h-l"><span class="eyebrow">${esc(t(UI.mercados))}</span><h2>${esc(t(X.mercadosTitulo))}</h2><p>${esc(t(X.mercadosLead))}</p></header>
    <ol class="lista">
      ${C.mercados.map((m, i) => `<li><a href="${url('produtos/' + m.slug)}" style="--c:${m.cor}">
        <span class="l-n">0${i + 1}</span>
        <span class="l-t"><b>${esc(t(m.nome))}</b><small>${esc(t(m.resumo))}</small></span>
        <span class="l-img">${img(m.slug === 'confeccao' ? 'confeccao-modelos' : m.foto, t(m.nome))}</span>
        <span class="l-s">${ico('seta')}</span>
      </a></li>`).join('')}
    </ol>
  </div>
</section>

<section class="findB" id="buscador">
  <div class="in">
    <header class="sec-h sec-h-l"><span class="eyebrow">${t(['Linha de entretelas', 'Interlining range', 'Línea de entretelas'])}</span><h2>${esc(t(X.finderTitulo))}</h2><p>${esc(t(X.finderLead))}</p></header>
    <div class="filtros" data-filtros>
      <div class="f-g" data-grupo="merc"><span>${t(['Uso', 'Use', 'Uso'])}</span><button type="button" aria-pressed="true" data-v="">${esc(t(UI.todos))}</button>${usos.map(u => `<button type="button" aria-pressed="false" data-v="${u}">${esc(t(MERC[u].curto))}</button>`).join('')}</div>
      <div class="f-g" data-grupo="linha"><span>${t(['Toque e função', 'Hand and function', 'Tacto y función'])}</span><button type="button" aria-pressed="true" data-v="">${esc(t(UI.todos))}</button>${linhasUso.map(k => `<button type="button" aria-pressed="false" data-v="${k}" style="--c:${C.linhas[k].cor}"><i></i>${esc(t(C.linhas[k].nome))}</button>`).join('')}</div>
    </div>
    <div class="ft-grid" data-resultado>${tiles}</div>
    <p class="ft-vazio" hidden data-vazio>${t(['Nenhuma referência com essa combinação. Fale com a fábrica: a Fiorella desenvolve sob medida.', 'No reference matches this combination. Talk to the factory: Fiorella develops custom products.', 'Ninguna referencia con esa combinación. Hable con la fábrica: Fiorella desarrolla a medida.'])}</p>
  </div>
</section>

<section class="procB">
  <div class="in">
    <header class="sec-h"><span class="eyebrow">${t(['Processo', 'Process', 'Proceso'])}</span><h2>${esc(t(X.processoTitulo))}</h2><p>${esc(t(X.processoLead))}</p></header>
    ${processo('proc proc-fio')}
  </div>
</section>

<section class="fabB">
  <div class="in fabB-in">
    <div class="fabB-txt">
      <span class="eyebrow">${esc(t(X.sobreTitulo))}</span>
      <h2>${esc(t(X.empresaTitulo))}</h2>
      ${X.sobre.map(p => `<p>${esc(t(p))}</p>`).join('')}
      <a class="link" href="${url('empresa')}">${esc(t(UI.saibaMais))} ${ico('seta')}</a>
    </div>
    <div class="fabB-img">
      ${img('fabrica-aerea', t(['Vista aérea da fábrica em Mairinque (SP)', 'Aerial view of the plant in Mairinque (SP)', 'Vista aérea de la fábrica en Mairinque (SP)']), 'width="728" height="599"')}
      ${img('bordado-lilia', t(['Bordado sobre entretela Fiorella', 'Embroidery on Fiorella backing', 'Bordado sobre entretela Fiorella']))}
      ${img('bordado-flores', t(['Bordadeira trabalhando sobre entretela Fiorella', 'Embroidery machine working on Fiorella backing', 'Bordadora trabajando sobre entretela Fiorella']))}
      <span class="selo-iso">ISO<b>9001</b><small>2015</small></span>
    </div>
  </div>
  <div class="in">${politicaBloco()}</div>
</section>

${lojaBloco('lojaB')}
${cta()}`;
}

// ---------- PRODUTOS (visão geral) ----------
function produtos() {
  const linhaRow = p => `<tr style="--c:${C.linhas[p.linha].cor}"><th scope="row"><a href="${url('produtos/' + p.merc)}#${p.cod.toLowerCase().replace(/\s+/g, '-')}">${p.cod}</a></th><td><span class="ln">${esc(t(C.linhas[p.linha].nome))}</span></td><td>${esc(t(MERC[p.merc].curto))}</td><td>${gTxt(p)}</td><td>${esc(t(p.comp))}</td><td>${esc(t(p.larg))}</td><td>${esc(t(p.compr))}</td></tr>`;
  return `${pageHero(t(UI.produtos), t(X.produtosLead), [[t(UI.produtos)]], 'fibra-vermelha')}
<section class="sec">
  <div class="in">
    <div class="mgrid">
      ${C.mercados.map(m => `<a class="mc" href="${url('produtos/' + m.slug)}" style="--c:${m.cor}">${img(m.slug === 'confeccao' ? 'confeccao-modelos' : m.foto, t(m.nome))}<div><h2>${esc(t(m.nome))}</h2><p>${esc(t(m.resumo))}</p><b>${esc(t(UI.verLinha))} ${ico('seta')}</b></div></a>`).join('')}
    </div>
  </div>
</section>
<section class="sec sec-alt">
  <div class="in">
    <header class="sec-h sec-h-l"><span class="eyebrow">${esc(t(UI.fichaTecnica))}</span><h2>${esc(t(X.tabelaTitulo))}</h2></header>
    <div class="tabela-w"><table class="tabela">
      <thead><tr><th>${esc(t(UI.referencia))}</th><th>${esc(t(UI.linha))}</th><th>${t(['Uso', 'Use', 'Uso'])}</th><th>${esc(t(UI.gramatura))}</th><th>${esc(t(UI.composicao))}</th><th>${esc(t(UI.larguras))}</th><th>${esc(t(UI.comprimentos))}</th></tr></thead>
      <tbody>${C.produtos.map(linhaRow).join('')}</tbody>
    </table></div>
  </div>
</section>
<section class="sec">
  <div class="in"><header class="sec-h sec-h-l"><h2>${esc(t(X.reguaTitulo))}</h2><p>${esc(t(X.reguaLead))}</p></header>${regua()}</div>
</section>
${cta()}`;
}

function pageHero(h1, lead, mig, foto, cor) {
  return `<section class="ph" ${cor ? `style="--c:${cor}"` : ''}>
  ${foto ? img(foto, '', 'class="ph-bg" loading="eager"') : ''}
  <div class="in ph-in">
    ${migalha(mig.map(([n, s]) => [n, s]))}
    <h1>${esc(h1)}</h1>
    <p class="lead">${esc(lead)}</p>
  </div>
</section>`;
}

// ---------- página de mercado ----------
const fatos = () => `<ul class="fatos">
  <li><b>${t(['Nãotecidos resinados', 'Chemical bonding nonwovens', 'No tejidos resinados'])}</b><span>${t(['poliéster e/ou viscose', 'polyester and/or viscose', 'poliéster y/o viscosa'])}</span></li>
  <li><b>+18 ${esc(t(C.numeros[0].u))}</b><span>${esc(t(C.numeros[0].t))}</span></li>
  <li><b>ISO 9001:2015</b><span>${t(['SGS · UKAS', 'SGS · UKAS', 'SGS · UKAS'])}</span></li>
  <li><b>${esc(t(X.americas))}</b><span>${t(['fábrica em Mairinque (SP)', 'plant in Mairinque (SP), Brazil', 'fábrica en Mairinque (SP), Brasil'])}</span></li>
</ul>`;

const GALERIA = {
  bordado: ['bordadeiras', 'bordado-flores', 'bordado-lilia', 'aplic-patch-uso'],
  confeccao: ['confeccao-modelos', 'confeccao-moda', 'nt-laser-etiquetas'],
  aplicacoes: ['forminhas-laranja', 'forminhas-rosa', 'aplic-patch-uso', 'aplicacoes-desenho'],
};

function mercado(slug) {
  const m = MERC[slug];
  const ps = C.produtos.filter(p => p.merc === slug);
  const outros = C.mercados.filter(o => o.slug !== slug);
  const tam = C.tambem[slug] || [];
  const linhasAqui = [...new Set(ps.map(p => p.linha))];
  const legenda = linhasAqui.length ? `<ul class="legenda">${linhasAqui.map(k => `<li style="--c:${C.linhas[k].cor}"><i></i>${esc(t(C.linhas[k].nome))}</li>`).join('')}</ul>` : '';
  const desenvolvimento = `<section class="sec sec-alt">
  <div class="in dev">
    <div>
      <span class="eyebrow">${esc(t(UI.desenvolvimento))}</span>
      <h2>${esc(t(UI.oQueInformar))}</h2>
      <ul class="checks">${C.especificar.map(e => `<li>${ico('check')}${esc(t(e))}</li>`).join('')}</ul>
    </div>
    ${formContato(slug)}
  </div>
</section>`;
  const fotoHero = slug === 'confeccao' ? 'confeccao-modelos' : m.foto;
  return `${pageHero(t(m.nome), t(m.resumo), [[t(UI.produtos), 'produtos'], [t(m.nome)]], fotoHero, m.cor)}
<section class="sec">
  <div class="in intro">
    <p class="intro-t">${esc(t(m.texto))}</p>
    ${legenda || fatos()}
  </div>
</section>
${ps.length ? `<section class="sec sec-prod">
  <div class="in">
    <header class="sec-h sec-h-l"><span class="eyebrow">${esc(t(UI.fichaTecnica))}</span><h2>${t(['Referências', 'References', 'Referencias'])}</h2></header>
    <div class="prods">${ps.map(cardProduto).join('')}</div>
    ${tam.length ? `<div class="tambem"><b>${esc(t(UI.tambemNaLoja))}:</b>${tam.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(t(n))} ↗</a>`).join('')}</div>` : ''}
  </div>
</section>` : ''}
${GALERIA[slug] ? `<section class="sec sec-gal"><div class="in"><div class="galeria g${GALERIA[slug].length}">${GALERIA[slug].map(f => `<figure>${img(f, t(m.nome))}</figure>`).join('')}</div></div></section>` : ''}
${ps.length ? '' : desenvolvimento}
${slug === 'aplicacoes' ? desenvolvimento : ''}
<section class="sec">
  <div class="in">
    <header class="sec-h sec-h-l"><h2>${t(['Outros mercados', 'Other markets', 'Otros mercados'])}</h2></header>
    <div class="outros">${outros.map(o => `<a href="${url('produtos/' + o.slug)}" style="--c:${o.cor}"><i></i><span>${esc(t(o.nome))}</span>${ico('seta')}</a>`).join('')}</div>
  </div>
</section>
${cta()}`;
}

// ---------- EMPRESA ----------
function empresa() {
  return `${pageHero(t(X.empresaTitulo), t(X.sobre[0]), [[t(UI.empresa)]], 'bordadeiras')}
<section class="sec">
  <div class="in emp">
    <div class="emp-txt">${X.sobre.map(p => `<p>${esc(t(p))}</p>`).join('')}</div>
    <figure class="emp-fig">${img('fabrica-aerea', t(['Vista aérea da fábrica em Mairinque (SP)', 'Aerial view of the plant in Mairinque (SP)', 'Vista aérea de la fábrica en Mairinque (SP)']), 'width="728" height="599"')}<figcaption>${esc(t(site.endereco))}</figcaption></figure>
  </div>
</section>
<section class="sec sec-num"><div class="in">${numerosHtml('nums')}</div></section>
<section class="sec ${V === 'a' ? 'procA' : 'procB'}">
  <div class="in">
    <header class="sec-h"><h2>${esc(t(X.processoTitulo))}</h2><p>${esc(t(X.processoLead))}</p></header>
    ${processo(V === 'a' ? 'proc' : 'proc proc-fio')}
  </div>
</section>
<section class="sec">
  <div class="in emp2">
    ${politicaBloco()}
    <div class="iso-box">
      <img src="/assets/img/iso-sgs-ukas.webp" alt="ISO 9001 · SGS · UKAS" width="294" height="177" loading="lazy">
      <h3>${esc(t(X.iso))}</h3>
      <p>${t(['Sistema de Gestão da Qualidade certificado pela SGS, com acreditação UKAS.', 'Quality Management System certified by SGS, with UKAS accreditation.', 'Sistema de Gestión de Calidad certificado por SGS, con acreditación UKAS.'])}</p>
    </div>
  </div>
</section>
${cta()}`;
}

// ---------- CONTATO ----------
function contato() {
  const card = (ic, h, linhas) => `<div class="cc">${ico(ic)}<h2>${esc(h)}</h2>${linhas}</div>`;
  return `${pageHero(t(X.contatoTitulo), t(X.contatoLead), [[t(UI.contato)]], 'fibra-vermelha')}
<section class="sec">
  <div class="in ct">
    <div class="ccs">
      ${card('fone', t(X.comercial), `<p><a href="tel:${site.foneHref}">${site.fone}</a></p><p><a href="mailto:${site.email}">${site.email}</a></p>`)}
      ${card('whats', 'WhatsApp', `<p><a href="${wa(MSG[LI])}" target="_blank" rel="noopener">+55 (11) 4718-8000</a></p>`)}
      ${card('sacola', t(X.lojaSac), `<p><a href="${site.loja}" target="_blank" rel="noopener">fiorellashop.com.br</a></p><p><a href="mailto:${site.emailLoja}">${site.emailLoja}</a></p>`)}
      ${card('pin', t(UI.localizacao), `<p>${esc(t(site.endereco))}</p><p><a href="${site.waze}" target="_blank" rel="noopener">Waze ↗</a> · <a href="${site.mapa}" target="_blank" rel="noopener">Google Maps ↗</a></p>`)}
    </div>
    <div class="ct-form"><h2>${t(['Envie sua mensagem', 'Send your message', 'Envíe su mensaje'])}</h2>${formContato()}</div>
  </div>
</section>
<section class="mapa"><iframe title="${esc(t(UI.localizacao))}" src="${site.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

export function gerar(v, l) {
  V = v; L = l; LI = LANGS.indexOf(l);
  const out = {};
  for (const slug of PAGINAS) {
    let corpo, cls = '';
    if (slug === '') { corpo = v === 'a' ? homeA() : homeB(); cls = 'home'; }
    else if (slug === 'produtos') corpo = produtos();
    else if (slug === 'empresa') corpo = empresa();
    else if (slug === 'contato') corpo = contato();
    else corpo = mercado(slug.split('/')[1]);
    out[slug] = pagina(slug, corpo, cls);
  }
  return out;
}
export { VNOME };
