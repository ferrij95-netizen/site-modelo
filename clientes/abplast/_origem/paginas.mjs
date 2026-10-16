// Páginas das duas versões do site novo da AB, em pt / en / es.
// A = "Essência": clara, fiel ao site atual (Neulis nos títulos, índigo da marca, painéis de vidro sobre as fotos,
//     degradês menta e lavanda), com a ordem da home atual, mas tudo visível (números, coleções, clientes).
// B = "Estúdio": índigo profundo e de produto, régua de volumes com as embalagens reais na capa,
//     coleções em índice, processos numerados e números de sustentabilidade grandes.
// Referências estudadas: Virospack (catálogo e clientes), Aptar (mercados), Quadpack (filtros), Docol (busca no topo).
// As duas têm as mesmas páginas: catálogo filtrável com as 81 embalagens, ficha de cada embalagem com "fecha com",
// 12 coleções, pumps, cartela de cores, exclusivas, 3 mercados, sobre, sustentabilidade, carreiras, contato e lista de orçamento.
import fs from 'node:fs';
import path from 'node:path';
import * as C from './conteudo.mjs';
// largura/altura de um .webp (para a régua de volumes ficar proporcional)
function dimWebp(n) {
  try {
    const b = fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), '../public/assets/img', n + '.webp'));
    const tipo = b.toString('ascii', 12, 16);
    if (tipo === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (tipo === 'VP8L') { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
    return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  } catch (e) { return [1, 3]; }
}


const { site, UI, X, LANGS } = C;
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let L = 'pt', LI = 0, V = 'a';
const t = x => (Array.isArray(x) ? (x[LI] ?? x[0]) : x);
const url = (slug = '', v = V, l = L) => `/${v}/${l === 'pt' ? '' : l + '/'}${slug ? slug + '/' : ''}`;
const im = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;
const wa = msg => `https://wa.me/${site.whats}?text=${encodeURIComponent(msg)}`;
const MSG = ['Olá! Vim pelo site da AB e gostaria de falar com a equipe de vendas.', 'Hello! I found AB on the website and would like to talk to the sales team.', '¡Hola! Llegué por el sitio de AB y quisiera hablar con el equipo de ventas.'];
const MSGP = ['Olá! Vim pelo site da AB e gostaria de um orçamento de: ', 'Hello! I would like a quote for: ', '¡Hola! Quisiera un presupuesto de: '];

const I = {
  whats: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.3 2 2.5 4.3 4.6 4.6l1.2-1.2 1.7.9c-.3 1-1.2 1.7-2.2 1.6-3.3-.4-6-3.1-6.4-6.4-.1-1 .6-1.9 1.6-2.2l.9 1.7z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  baixo: '<path d="m6 9 6 6 6-6"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  grade: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  prancheta: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  filtro: '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  face: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  yt: '<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z"/>',
  folha: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19 13 11"/>',
  gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  raio: '<path d="M13 3 5 14h6l-1 7 8-11h-6z"/>',
  recicla: '<path d="M7 19H4l3-5M17 19h3l-3-5M9 5l3-2 3 5"/><path d="M7 14 10 9M14 8l3 6M10 19h7"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const LOGO = cor => `<svg class="logo" viewBox="0 0 61 38" aria-hidden="true"><path fill="${cor}" fill-rule="evenodd" d="M44.97 6.57c2.13 2.2 2.13 5.81 0 8.02l-3.74 3.85h6.75l.36-.37c3.99-4.12 3.99-10.86 0-14.98s-10.52-4.12-14.51 0L0 38h6.75L37.2 6.57c2.14-2.2 5.63-2.2 7.77 0Z"/><path fill="${cor}" fill-rule="evenodd" d="M51.52 18.44H28l-4.74 4.89H36.5l-8.17 8.43h6.75l8.17-8.43h8.2c2.6 0 4.74 2.2 4.74 4.89s-2.13 4.89-4.74 4.89H27.05L22.31 38h29.21C56.74 38 61 33.6 61 28.22s-4.26-9.78-9.48-9.78Z"/></svg>`;
const BAND = {
  pt: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#009b3a"/><path d="M14 2.5 25.5 10 14 17.5 2.5 10z" fill="#fedf00"/><circle cx="14" cy="10" r="4.6" fill="#002776"/></svg>',
  en: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#fff"/><path d="M0 0h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28v1.54H0zm0 3.08h28V20H0z" fill="#b22234"/><rect width="12" height="10.8" fill="#3c3b6e"/></svg>',
  es: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#c60b1e"/><rect y="5" width="28" height="10" fill="#ffc400"/></svg>',
};
const LNOME = { pt: 'Português', en: 'English', es: 'Español' };
const VNOME = { a: 'Essência', b: 'Estúdio' };

// ---------- dados auxiliares ----------
const P = Object.fromEntries(C.produtos.map(p => [p.slug, p]));
const M = Object.fromEntries(C.mercados.map(m => [m.slug, m]));
const VOLF = [[0, 30, '≤ 30 ml'], [31, 100, '31–100 ml'], [101, 250, '101–250 ml'], [251, 500, '251–500 ml'], [501, 99999, '> 500 ml']];
const faixa = n => (n == null ? '' : VOLF.findIndex(([a, b]) => n >= a && n <= b));
const ehFecho = p => ['tampa', 'batoque', 'conta-gotas', 'cache'].includes(p.tipo.k);
const GARGS = ['20/410', '24/410', '28/410', 'Snap', 'R20', 'R61', 'R82'];
const nomeCol = s => C.COL[s].nome;
function fechaCom(p) {
  if (ehFecho(p) || !p.garg) return [];
  return C.produtos.filter(q => ehFecho(q) && q.garg === p.garg && q.colecoes.some(c => p.colecoes.includes(c)));
}
const pumpsDe = p => (ehFecho(p) || !p.garg ? [] : C.pumps.filter(u => u.variantes.some(v => v.garg === p.garg) && u.colecoes.some(c => p.colecoes.includes(c))));
const segNome = k => t(C.segmentos[k].nome);
const dataItem = p => esc(JSON.stringify({ s: p.slug, n: t(p.nome), r: p.ref, c: p.colecoes.map(nomeCol).join(', '), f: p.foto }));

// ---------- títulos e metatags ----------
function titulo(slug) {
  const n = 'AB Embalagens';
  const [a, b] = slug.split('/');
  if (!slug) return [`AB · ${t(X.heroTitulo)}`, t(X.heroLead)];
  if (slug === 'catalogo') return [`${t(X.catalogoTitulo)} · ${n}`, t(X.catalogoLead)];
  if (slug === 'colecoes') return [`${t(UI.colecoes)} · ${t(UI.linha)} · ${n}`, t(X.linhaLead)];
  if (a === 'colecoes') { const c = C.COL[b]; return [`${t(UI.colecao)} ${c.nome} · ${n}`, t(c.desc)]; }
  if (a === 'embalagem') { const p = P[b]; return [`${t(p.nome)} ${p.colecoes.map(nomeCol).join(', ')} · ref. ${p.ref} · ${n}`, `${t(p.nome)}, ${t(UI.colecao).toLowerCase()} ${p.colecoes.map(nomeCol).join(', ')}. ${t(UI.resina)}: ${p.resina}${p.gargalo ? `, ${t(UI.gargalo).toLowerCase()} ${p.gargalo}` : ''}${p.vol ? `, ${p.vol}` : ''}.`]; }
  if (a === 'mercados') { const m = M[b]; return [`${t(m.nome)} · ${n}`, t(m.p)]; }
  const mapa = {
    pumps: [UI.pumps, X.pumpsLead], cores: [UI.cores, X.coresLead], exclusivas: [UI.exclusivas, X.exclusivasLead],
    sobre: [UI.empresa, X.quemSomos], sustentabilidade: [UI.sustentabilidade, X.sustLead], carreiras: [UI.carreiras, X.carreirasLead],
    contato: [UI.contato, X.contatoLead], orcamento: [UI.orcamento, X.contatoLead],
  };
  return [`${t(mapa[slug][0])} · ${n}`, t(mapa[slug][1])];
}

function head(slug) {
  const [tt, d] = titulo(slug);
  const can = site.dominio + url(slug);
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${C.HTMLLANG[l]}" href="${site.dominio}${url(slug, V, l)}">`).join('\n');
  const fontes = 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap';
  return `<!doctype html>
<html lang="${C.HTMLLANG[L]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tt)}</title>
<meta name="description" content="${esc(d.slice(0, 300))}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${can}">
${alt}
<link rel="alternate" hreflang="x-default" href="${site.dominio}${url(slug, V, 'pt')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AB Soluções em Embalagens Plásticas">
<meta property="og:locale" content="${C.LOCALE[L]}">
<meta property="og:title" content="${esc(tt)}">
<meta property="og:description" content="${esc(d.slice(0, 300))}">
<meta property="og:url" content="${can}">
<meta property="og:image" content="${site.dominio}/assets/og-${V}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(tt)}">
<meta name="twitter:description" content="${esc(d.slice(0, 300))}">
<meta name="twitter:image" content="${site.dominio}/assets/og-${V}.jpg">
<meta name="theme-color" content="${V === 'a' ? '#ffffff' : '#141a44'}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes}">
<link rel="preload" href="/assets/fonts/neulis-semibold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${V}.css">
<script src="/assets/ab.js" defer></script>
</head>`;
}

// ---------- topo e rodapé ----------
function header(slug) {
  const at = (...ss) => (ss.some(s => slug === s || slug.startsWith(s + '/')) ? ' aria-current="page"' : '');
  const cols = C.colecoes.map(c => `<a href="${url('colecoes/' + c.slug)}" class="mm-col">${im('f-' + (c.itens.find(p => !ehFecho(p)) || c.itens[0]).foto.slice(2), '')}<span>${esc(c.nome)}</span><small>${esc(c.vers)}</small></a>`).join('');
  const langs = LANGS.map(l => `<a href="${url(slug, V, l)}" hreflang="${C.HTMLLANG[l]}" lang="${C.HTMLLANG[l]}" title="${LNOME[l]}" data-lang${l === L ? ' aria-current="true"' : ''}>${BAND[l]}<span>${l.toUpperCase()}</span></a>`).join('');
  return `<a class="pular" href="#conteudo">${t(['Ir para o conteúdo', 'Skip to content', 'Ir al contenido'])}</a>
<header class="topo" data-topo>
  <div class="in topo-in">
    <a class="marca" href="${url()}" aria-label="AB, ${esc(t(UI.inicio))}">${LOGO('currentColor')}<span class="marca-t">AB<small>${t(['Soluções em Embalagens Plásticas', 'Plastic Packaging Solutions', 'Soluciones en Envases Plásticos'])}</small></span></a>
    <nav id="nav" class="nav" aria-label="${esc(t(UI.menu))}">
      <div class="drop drop-mega">
        <a href="${url('catalogo')}"${at('catalogo', 'colecoes', 'embalagem', 'pumps', 'cores')} data-drop>${esc(t(UI.linha))}${ico('baixo', 'ico seta-baixo')}</a>
        <div class="mega">
          <div class="mega-in in">
            <div class="mega-lado">
              <a class="mega-cat" href="${url('catalogo')}"><b>${esc(t(UI.catalogo))}</b><span>${C.produtos.length} ${t(UI.embalagens)} · ${t(['filtros por volume, resina e gargalo', 'filter by capacity, resin and neck', 'filtros por volumen, resina y cuello'])}</span>${ico('seta')}</a>
              <a href="${url('colecoes')}">${esc(t(UI.verTodas))}</a>
              <a href="${url('pumps')}">${esc(t(UI.pumps))}</a>
              <a href="${url('cores')}">${esc(t(['Cartela de cores', 'Color chart', 'Carta de colores']))}</a>
            </div>
            <div class="mega-cols">${cols}</div>
          </div>
        </div>
      </div>
      <a href="${url('exclusivas')}"${at('exclusivas')}>${esc(t(UI.exclusivas))}</a>
      <div class="drop">
        <a href="${url('mercados/cosmeticos')}"${at('mercados')} data-drop>${esc(t(UI.mercados))}${ico('baixo', 'ico seta-baixo')}</a>
        <div class="drop-m">${C.mercados.map(m => `<a href="${url('mercados/' + m.slug)}">${esc(t(m.nome))}</a>`).join('')}</div>
      </div>
      <div class="drop">
        <a href="${url('sobre')}"${at('sobre', 'sustentabilidade', 'carreiras')} data-drop>${esc(t(UI.institucional))}${ico('baixo', 'ico seta-baixo')}</a>
        <div class="drop-m"><a href="${url('sobre')}">${esc(t(UI.empresa))}</a><a href="${url('sustentabilidade')}">${esc(t(UI.sustentabilidade))}</a><a href="${url('carreiras')}">${esc(t(UI.carreiras))}</a></div>
      </div>
      <a href="${url('contato')}"${at('contato')}>${esc(t(UI.contato))}</a>
      <div class="langs" aria-label="${esc(t(UI.idioma))}">${langs}</div>
    </nav>
    <div class="topo-acoes">
      <a class="orc-bt" href="${url('orcamento')}" data-orc-bt aria-label="${esc(t(UI.orcamento))}">${ico('prancheta')}<span class="orc-n" data-orc-n hidden>0</span><span class="orc-t">${esc(t(UI.orcamento))}</span></a>
      <a class="bt bt-p topo-cta" href="${wa(MSG[LI])}" target="_blank" rel="noopener">${ico('whats')}<span>${esc(t(UI.falar))}</span></a>
      <button class="menu-bt" type="button" aria-expanded="false" aria-controls="nav" data-menu>${ico('menu')}<span class="sr">${esc(t(UI.menu))}</span></button>
    </div>
  </div>
</header>`;
}

function footer() {
  const s = (h, ic, n) => `<a href="${h}" target="_blank" rel="noopener" aria-label="${n}">${ico(ic)}</a>`;
  return `<footer class="rodape">
  <div class="in rod-grid">
    <div class="rod-marca">
      <a class="marca" href="${url()}">${LOGO('currentColor')}<span class="marca-t">AB<small>${t(['Soluções em Embalagens Plásticas', 'Plastic Packaging Solutions', 'Soluciones en Envases Plásticos'])}</small></span></a>
      <p>${esc(t(UI.grupo))}.</p>
      <div class="selos">${im('iso-9001', 'ISO 9001:2015')}${im('iso-22716', 'ISO 22716:2007')}${im('selo-carbono', t(['Empresa Carbono Neutro', 'Carbon Neutral Company', 'Empresa Carbono Neutro']))}</div>
      <div class="redes">${s(site.linkedin, 'linkedin', 'LinkedIn')}${s(site.instagram, 'insta', 'Instagram')}${s(site.facebook, 'face', 'Facebook')}${s(site.youtube, 'yt', 'YouTube')}</div>
    </div>
    <div><h3>${esc(t(UI.linha))}</h3><ul><li><a href="${url('catalogo')}">${esc(t(UI.catalogo))}</a></li><li><a href="${url('colecoes')}">${esc(t(UI.colecoes))}</a></li><li><a href="${url('pumps')}">${esc(t(UI.pumps))}</a></li><li><a href="${url('cores')}">${esc(t(UI.cores))}</a></li><li><a href="${url('exclusivas')}">${esc(t(UI.exclusivas))}</a></li></ul></div>
    <div><h3>${esc(t(UI.mercados))}</h3><ul>${C.mercados.map(m => `<li><a href="${url('mercados/' + m.slug)}">${esc(t(m.nome))}</a></li>`).join('')}</ul></div>
    <div><h3>${esc(t(UI.institucional))}</h3><ul><li><a href="${url('sobre')}">${esc(t(UI.empresa))}</a></li><li><a href="${url('sustentabilidade')}">${esc(t(UI.sustentabilidade))}</a></li><li><a href="${url('carreiras')}">${esc(t(UI.carreiras))}</a></li><li><a href="${url('contato')}#faq">FAQ</a></li><li><a href="${site.portal}" target="_blank" rel="noopener">${esc(t(UI.portal))}</a></li></ul></div>
    <div class="rod-contato"><h3>${esc(t(UI.contato))}</h3>
      <p><a href="${site.mapa}" target="_blank" rel="noopener">${ico('pin')}<span>${esc(site.endereco)}<br>${esc(site.cidade)}</span></a></p>
      <p><a href="${wa(MSG[LI])}" target="_blank" rel="noopener">${ico('whats')}<span>${t(['Vendas', 'Sales', 'Ventas'])} · ${site.whatsTxt}</span></a></p>
      <p class="rod-den">${esc(t(UI.denuncias))}: <a href="tel:08005126655">${site.denuncia}</a> · <a href="${site.denunciaUrl}" target="_blank" rel="noopener">contatoseguro.com.br</a></p>
    </div>
  </div>
  <div class="in rod-base"><span>${esc(t(UI.copiar))}</span><span>${t(['Prévia do novo site', 'New website preview', 'Vista previa del nuevo sitio'])} · <a href="/">${t(['ver as duas versões', 'see both versions', 'ver las dos versiones'])}</a></span></div>
</footer>
<div class="orc-toast" data-toast role="status" aria-live="polite"></div>
<script type="application/json" id="ab-i18n">${JSON.stringify({ add: t(UI.adicionar), ok: t(UI.adicionado), addMsg: t(['adicionada à lista de orçamento', 'added to the quote list', 'agregado a la lista de presupuesto']), whats: site.whats, msgP: MSGP[LI], qtd: t(['peças', 'pcs', 'piezas']), ref: 'ref.', vazio: t(UI.vazio), remover: t(UI.remover), lang: L, v: V, base: url('', V, L) }).replace(/</g, '\\u003c')}</script>`;
}

function pagina(slug, corpo, cls = '') {
  return `${head(slug)}
<body class="v-${V}${cls ? ' ' + cls : ''}">
${header(slug)}
<main id="conteudo">
${corpo}
</main>
${footer()}
</body>
</html>`;
}

// ---------- blocos reutilizados ----------
const eyebrow = s => `<p class="eyebrow">${esc(s)}</p>`;
const btn = (h, txt, cls = 'bt-p', ext = false) => `<a class="bt ${cls}" href="${h}"${ext ? ' target="_blank" rel="noopener"' : ''}>${esc(txt)}${ico('seta')}</a>`;
const migalha = itens => `<nav class="migalha" aria-label="breadcrumb"><ol>${itens.map(([h, n], i) => (i < itens.length - 1 ? `<li><a href="${h}">${esc(n)}</a></li>` : `<li aria-current="page">${esc(n)}</li>`)).join('')}</ol></nav>`;

function topoPagina({ eb, h1, lead, img, migs, extra = '' }) {
  if (V === 'a') {
    return `<section class="ptopo${img ? ' com-foto' : ''}">
  ${img ? `<div class="ptopo-foto">${im(img, '', 'fetchpriority="high" loading="eager"')}</div>` : ''}
  <div class="in ptopo-in">
    ${migs ? migalha(migs) : ''}
    <div class="vidro">${eb ? eyebrow(eb) : ''}<h1>${esc(h1)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}${extra}</div>
  </div>
</section>`;
  }
  return `<section class="ptopo">
  <div class="in ptopo-in">
    <div class="ptopo-txt">${migs ? migalha(migs) : ''}${eb ? eyebrow(eb) : ''}<h1>${esc(h1)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}${extra}</div>
    ${img ? `<div class="ptopo-foto">${im(img, '', 'fetchpriority="high" loading="eager"')}</div>` : ''}
  </div>
</section>`;
}

const specs = p => `<dl class="pc-specs">${p.vol ? `<div><dt>${esc(t(UI.volume))}</dt><dd>${esc(p.vol)}</dd></div>` : ''}<div><dt>${esc(t(UI.resina))}</dt><dd>${esc(p.resina)}</dd></div>${p.gargalo ? `<div><dt>${esc(t(UI.gargalo))}</dt><dd>${esc(p.gargalo)}</dd></div>` : ''}</dl>`;

function cartao(p, extraCls = '') {
  const attrs = `data-item data-tipo="${p.tipo.k}" data-vol="${faixa(p.nominal)}" data-res="${p.resinas.join(' ')}" data-garg="${esc(p.garg)}" data-col="${p.colecoes.join(' ')}" data-merc="${p.mercados.join(' ')}" data-q="${esc((t(p.nome) + ' ' + p.nome[0] + ' ' + p.ref + ' ' + p.molde + ' ' + p.colecoes.map(nomeCol).join(' ')).toLowerCase())}"`;
  return `<article class="pc ${extraCls}" ${attrs}>
  <a class="pc-link" href="${url('embalagem/' + p.slug)}">
    <div class="pc-img">${im(p.foto, t(p.nome))}</div>
    <div class="pc-txt"><span class="pc-col">${esc(p.colecoes.map(nomeCol).join(' · '))}</span><h3>${esc(t(p.nome))}</h3><span class="pc-ref">ref. ${esc(p.ref)}</span>${specs(p)}</div>
  </a>
  <button class="pc-add" type="button" data-add="${dataItem(p)}" aria-label="${esc(t(UI.adicionar))}: ${esc(t(p.nome))}">${ico('mais')}<span>${esc(t(UI.adicionar))}</span></button>
</article>`;
}

function linhaTabela(p) {
  return `<tr data-item data-tipo="${p.tipo.k}" data-vol="${faixa(p.nominal)}" data-res="${p.resinas.join(' ')}" data-garg="${esc(p.garg)}" data-col="${p.colecoes.join(' ')}" data-merc="${p.mercados.join(' ')}" data-q="${esc((t(p.nome) + ' ' + p.nome[0] + ' ' + p.ref + ' ' + p.molde + ' ' + p.colecoes.map(nomeCol).join(' ')).toLowerCase())}">
  <td class="tb-img">${im(p.foto, '')}</td>
  <th scope="row"><a href="${url('embalagem/' + p.slug)}">${esc(t(p.nome))}</a><small>${esc(p.colecoes.map(nomeCol).join(', '))}</small></th>
  <td>${esc(p.ref)}</td><td>${esc(p.vol || '–')}</td><td>${esc(p.resina)}</td><td>${esc(p.gargalo || '–')}</td><td>${esc(p.molde || '–')}</td><td>${esc(p.dim || '–')}</td>
  <td><button class="tb-add" type="button" data-add="${dataItem(p)}" aria-label="${esc(t(UI.adicionar))}: ${esc(t(p.nome))}">${ico('mais')}</button></td>
</tr>`;
}

function colCard(c, i) {
  const n = c.itens.length;
  return `<a class="cc" href="${url('colecoes/' + c.slug)}" style="--c:${c.cor}">
  <div class="cc-img">${im(c.galeria[0] || c.img, c.nome)}</div>
  <div class="cc-txt"><span class="cc-n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(c.nome)}</h3><p>${esc(c.vers)} · ${esc(c.mat)}</p><span class="cc-q">${n} ${t(UI.embalagens)}</span></div>
</a>`;
}

function contatoBloco(titulo = X.contatoTitulo, lead = X.contatoLead, comFaq = false) {
  const merc = C.mercados.map(m => `<option>${esc(t(m.nome))}</option>`).join('');
  return `<section class="sec contato-sec" id="contato">
  <div class="in contato-grid">
    <div class="contato-txt">
      ${eyebrow(t(UI.contato))}
      <h2>${esc(t(titulo))}</h2>
      <p class="lead">${esc(t(lead))}</p>
      <ul class="contato-lista">
        <li><a href="${wa(MSG[LI])}" target="_blank" rel="noopener">${ico('whats')}<span><b>${t(['WhatsApp de vendas', 'Sales WhatsApp', 'WhatsApp de ventas'])}</b>${site.whatsTxt}</span></a></li>
        <li><a href="${site.mapa}" target="_blank" rel="noopener">${ico('pin')}<span><b>${esc(site.endereco)}</b>${esc(site.cidade)}</span></a></li>
      </ul>
      ${comFaq ? '' : `<p class="nota-pg">${esc(t(X.pagamento))}</p>`}
    </div>
    <form class="form" data-form-wa>
      <div class="f2"><label><span>${esc(t(UI.nome))}</span><input name="nome" required autocomplete="name"></label><label><span>${esc(t(UI.empresaCampo))}</span><input name="empresa" required autocomplete="organization"></label></div>
      <div class="f2"><label><span>${esc(t(UI.email))}</span><input name="email" type="email" autocomplete="email"></label><label><span>${esc(t(UI.telefone))}</span><input name="telefone" type="tel" autocomplete="tel"></label></div>
      <div class="f2"><label><span>${esc(t(UI.cidadeUf))}</span><input name="cidade"></label><label><span>${esc(t(UI.mercado))}</span><select name="mercado">${merc}</select></label></div>
      <label><span>${esc(t(UI.mensagem))}</span><textarea name="mensagem" rows="4" placeholder="${esc(t(['Ex.: frasco de 200 ml em PET para shampoo, 20 mil peças, com serigrafia.', 'E.g.: 200 ml PET bottle for shampoo, 20,000 pcs, screen printed.', 'Ej.: frasco de 200 ml en PET para champú, 20 mil piezas, con serigrafía.']))}"></textarea></label>
      <button class="bt bt-p" type="submit">${ico('whats')}${esc(t(UI.enviarMsg))}</button>
      <p class="form-nota">${esc(t(UI.formNota))}</p>
    </form>
  </div>
</section>`;
}

function faqBloco() {
  return `<section class="sec faq-sec" id="faq"><div class="in faq-in">
  <div>${eyebrow('FAQ')}<h2>${t(['Perguntas frequentes', 'Frequently asked questions', 'Preguntas frecuentes'])}</h2></div>
  <div class="faq">${C.faq.map(([q, a]) => `<details><summary>${esc(t(q))}${ico('mais')}</summary><p>${esc(t(a))}</p></details>`).join('')}</div>
</div></section>`;
}

const marcasFaixa = () => `<section class="sec marcas-sec"><div class="in">
  <p class="marcas-t"><b>+300</b> ${t(['empresas confiam na AB', 'companies trust AB', 'empresas confían en AB'])}</p>
  <div class="marcas" role="list">${C.marcasClientes.map(m => `<span role="listitem">${im('marca-' + m, m.replace(/-/g, ' '))}</span>`).join('')}</div>
</div></section>`;

// ---------- páginas ----------
function home() {
  return V === 'a' ? homeA() : homeB();
}

function homeA() {
  const slides = [
    { img: 'hero-prainha', mob: 'hero-prainha-m', eb: t(['Lançamento', 'New', 'Lanzamiento']), h: t(['Frasnaga Prainha', 'Prainha tube bottle', 'Frasco squeeze Prainha']), p: t(['Uma coleção compacta com novo formato e volumetrias: 10 e 20 ml.', 'A compact collection with a new shape and capacities: 10 and 20 ml.', 'Una colección compacta con nuevo formato y volúmenes: 10 y 20 ml.']), h2: url('colecoes/prainha') },
    { img: 'hero-itapema', eb: t(UI.colecao), h: t(['Coleção Itapema', 'Itapema collection', 'Colección Itapema']), p: t(['Para skincare e maquiagem: praticidade, sustentabilidade e sofisticação em um só pote, com refil.', 'For skincare and makeup: practicality, sustainability and sophistication in one refillable jar.', 'Para skincare y maquillaje: practicidad, sostenibilidad y sofisticación en un solo pote, con repuesto.']), h2: url('colecoes/itapema') },
    { img: 'hero-pumps', eb: t(UI.pumps), h: t(['Pumps AB', 'AB pumps', 'Bombas AB']), p: t(['Um lançamento que leva mais performance para a sua embalagem, até a última gota.', 'More performance for your packaging, down to the last drop.', 'Más rendimiento para su envase, hasta la última gota.']), h2: url('pumps') },
    { img: 'hero-exclusivas', eb: t(UI.exclusivas), h: t(['Embalagens exclusivas', 'Custom packaging', 'Envases exclusivos']), p: t(['Torne seu produto ainda mais único com embalagens totalmente personalizadas, da forma ao acabamento.', 'Make your product even more unique with fully custom packaging, from shape to finish.', 'Haga su producto aún más único con envases totalmente personalizados, de la forma al acabado.']), h2: url('exclusivas') },
    { img: 'hero-sustentabilidade', eb: t(UI.sustentabilidade), h: t(X.sustTitulo), p: t(X.sustLead), h2: url('sustentabilidade') },
  ];
  const sl = slides.map((s, i) => `<div class="slide${i === 0 ? ' ativo' : ''}" data-slide${i ? ' aria-hidden="true"' : ''}>
    <picture>${s.mob ? `<source media="(max-width: 700px)" srcset="/assets/img/${s.mob}.webp">` : ''}${im(s.img, '', i === 0 ? 'fetchpriority="high" loading="eager"' : '')}</picture>
    <div class="in slide-in"><div class="vidro">${eyebrow(s.eb)}<h2 class="slide-h">${esc(s.h)}</h2><p>${esc(s.p)}</p>${btn(s.h2, t(UI.saibaMais))}</div></div>
  </div>`).join('');
  const dots = slides.map((s, i) => `<button type="button" data-dot="${i}"${i === 0 ? ' aria-current="true"' : ''}><span>${esc(s.h)}</span></button>`).join('');
  const quick = C.TIPOS.filter(x => ['frasco', 'frasnaga', 'pote', 'tampa'].includes(x.k)).map(x => `<a href="${url('catalogo')}#tipo=${x.k}">${esc(t(x.n))}<b>${C.produtos.filter(p => p.tipo.k === x.k).length}</b></a>`).join('');
  return pagina('', `
<section class="hero" data-slider aria-roledescription="carousel">
  ${sl}
  <div class="in hero-dots" role="tablist">${dots}</div>
</section>

<section class="busca-rapida"><div class="in br-in">
  <h1 class="br-h">${esc(t(X.heroTitulo))}</h1>
  <form class="br-form" action="${url('catalogo')}" data-busca>${ico('busca')}<input name="q" type="search" placeholder="${esc(t(UI.buscar))}" aria-label="${esc(t(UI.buscar))}"><button class="bt bt-p" type="submit">${t(['Buscar', 'Search', 'Buscar'])}</button></form>
  <div class="br-atalhos">${quick}<a href="${url('catalogo')}#vol=0">≤ 30 ml</a><a href="${url('catalogo')}#res=PET">PET</a><a href="${url('catalogo')}#res=PEAD">PEAD</a></div>
</div></section>

<section class="sec merc-sec"><div class="in">
  <div class="sec-cab centro">${eyebrow(t(X.paraQuem))}<h2>${esc(t(X.dado66))}</h2><p>${esc(t(X.paraQuemLead))}</p></div>
  <div class="merc-grid">${C.mercados.map(m => `<a class="merc" href="${url('mercados/' + m.slug)}">${im(m.img, t(m.nome))}<div class="merc-t"><h3>${esc(t(m.nome))}</h3><span>${esc(t(UI.saibaMais))} ${ico('seta')}</span></div></a>`).join('')}</div>
</div></section>

<section class="sec qs-sec"><div class="in qs-grid">
  <div class="qs-foto">${im('fabrica-linha', t(['Linha de produção da AB', 'AB production line', 'Línea de producción de AB']))}</div>
  <div>${eyebrow(t(['Quem somos', 'Who we are', 'Quiénes somos']))}<h2>${esc(t(X.quemSomosTitulo))}</h2><p>${esc(t(X.quemSomos))}</p>${btn(url('sobre'), t(UI.empresa), 'bt-s')}</div>
</div></section>

<section class="numeros"><div class="in num-grid">
  <h2 class="num-h">${t(['Qualidade traduzida em números', 'Quality in numbers', 'Calidad traducida en números'])}</h2>
  ${C.numeros.map(n => `<div class="num"><b>${esc(n.n)}</b><span>${esc(t(n.t))}</span></div>`).join('')}
</div></section>

<section class="sec prod-sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(['Produtos', 'Products', 'Productos']))}<h2>${esc(t(X.dado59))}</h2><p>${t(['Seja na Linha AB ou em embalagens exclusivas, combinamos criatividade, inovação e qualidade para atrair o olhar dos seus clientes e agregar valor à sua marca.', 'Whether AB Line or custom packaging, we combine creativity, innovation and quality to catch your customers’ eye and add value to your brand.', 'Ya sea en la Línea AB o en envases exclusivos, combinamos creatividad, innovación y calidad para atraer la mirada de sus clientes y valorizar su marca.'])}</p></div>
  <div class="dupla">
    <a class="dupla-c" href="${url('catalogo')}">${im('g-ubatuba-2', t(UI.linha))}<div class="vidro"><h3>${esc(t(UI.linha))}</h3><p>${esc(t(X.linhaLead))}</p><span class="link">${esc(t(UI.verCatalogo))} ${ico('seta')}</span></div></a>
    <a class="dupla-c" href="${url('exclusivas')}">${im('ex-24', t(UI.exclusivas))}<div class="vidro"><h3>${esc(t(['Embalagens exclusivas', 'Custom packaging', 'Envases exclusivos']))}</h3><p>${t(['Seu produto com uma embalagem inovadora e personalizada, que proporciona uma experiência única de uso e encantamento.', 'Your product in innovative, personalized packaging that delivers a unique, delightful experience.', 'Su producto con un envase innovador y personalizado, que brinda una experiencia única de uso y encanto.'])}</p><span class="link">${esc(t(UI.saibaMais))} ${ico('seta')}</span></div></a>
  </div>
</div></section>

<section class="sec cols-sec"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(UI.linha))}<h2>${esc(t(X.linhaTitulo))}</h2></div>${btn(url('colecoes'), t(UI.verTodas), 'bt-s')}</div>
</div>
<div class="trilho" data-trilho tabindex="0" aria-label="${esc(t(UI.colecoes))}">${C.colecoes.map(colCard).join('')}</div>
</section>

${marcasFaixa()}

<section class="sec sus-sec"><div class="in">
  <div class="sec-cab centro">${eyebrow(t(UI.sustentabilidade))}<h2>${esc(t(X.sustTitulo))}</h2><p>${esc(t(X.sustLead))}</p></div>
  <div class="abas" data-abas>
    <div class="abas-l" role="tablist">${C.sustentabilidade.slice(0, 5).map((s, i) => `<button role="tab" type="button" aria-selected="${i === 0}" data-aba="${i}">${esc(t(s.t))}</button>`).join('')}</div>
    ${C.sustentabilidade.slice(0, 5).map((s, i) => `<div class="aba" role="tabpanel" data-painel="${i}"${i ? ' hidden' : ''}>${im(s.img, t(s.t))}<div><h3>${esc(t(s.t))}</h3><p>${esc(t(s.p))}</p>${btn(url('sustentabilidade'), t(['Conheça nossas iniciativas', 'See our initiatives', 'Conozca nuestras iniciativas']), 'bt-s')}</div></div>`).join('')}
  </div>
</div></section>

<section class="sec car-sec"><div class="in car-grid">
  <div>${eyebrow(t(UI.carreiras))}<h2>${esc(t(X.carreirasTitulo))}</h2><p>${esc(t(X.carreirasLead))}</p>${btn(url('carreiras'), t(['Benefícios e vagas', 'Benefits and jobs', 'Beneficios y vacantes']), 'bt-s')}</div>
  <div class="car-fotos">${im('car-1', '')}${im('car-3', '')}${im('car-corpo', '')}</div>
</div></section>

${contatoBloco()}`, 'home');
}

function homeB() {
  const regua = C.colecoes.find(c => c.slug === 'ubatuba').itens.filter(p => !ehFecho(p)).sort((a, b) => a.nominal - b.nominal);
  const alt = p => +((p.dim.match(/\d+/g) || [100]).sort((a, b) => b - a)[0]);
  const max = Math.max(...regua.map(alt));
  const entradas = [
    { h: url('catalogo'), n: '01', t: t(UI.linha), p: t(['81 embalagens prontas em 12 coleções, com ficha técnica e cartela de cores.', '81 ready-made items in 12 collections, with specs and color chart.', '81 envases listos en 12 colecciones, con ficha técnica y carta de colores.']), img: 'g-garopaba-6' },
    { h: url('exclusivas'), n: '02', t: t(UI.exclusivas), p: t(['Da ideia à materialização: forma, cor e decoração únicas para a sua marca.', 'From idea to production: unique shape, color and decoration for your brand.', 'De la idea a la producción: forma, color y decoración únicos para su marca.']), img: 'ex-24' },
    { h: url('pumps'), n: '03', t: t(UI.pumps), p: t(['Dosadora, spray, mini trigger, fine mist e tratamento, em 20, 24 e 28/410.', 'Lotion, spray, mini trigger, fine mist and treatment, in 20, 24 and 28/410.', 'Dosificadora, spray, mini gatillo, fine mist y tratamiento, en 20, 24 y 28/410.']), img: 'pump-capa' },
  ];
  const tipos = C.TIPOS.filter(x => C.produtos.some(p => p.tipo.k === x.k));
  return pagina('', `
<section class="hero-b">
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      ${eyebrow(t(X.heroEyebrow))}
      <h1>${esc(t(X.heroTitulo))}</h1>
      <p class="lead">${esc(t(X.heroLead))}</p>
      <form class="br-form" action="${url('catalogo')}" data-busca>${ico('busca')}<input name="q" type="search" placeholder="${esc(t(UI.buscar))}" aria-label="${esc(t(UI.buscar))}"><button class="bt bt-p" type="submit">${t(['Buscar', 'Search', 'Buscar'])}</button></form>
      <div class="hero-b-num">${C.numeros.slice(0, 3).map(n => `<div><b>${esc(n.n)}</b><span>${esc(t(n.t))}</span></div>`).join('')}</div>
    </div>
    <figure class="regua" aria-label="${esc(t(['Coleção Ubatuba, de 60 ml a 1 litro', 'Ubatuba collection, from 60 ml to 1 liter', 'Colección Ubatuba, de 60 ml a 1 litro']))}">
      <div class="regua-palco">${regua.map(p => `<a href="${url('embalagem/' + p.slug)}" class="regua-item" style="--h:${(alt(p) / max * 100).toFixed(1)}%;flex-grow:${(dimWebp(p.foto)[0] / dimWebp(p.foto)[1] * alt(p) / max * 100).toFixed(1)}">${im(p.foto, t(p.nome), 'loading="eager"')}<span>${p.nominal >= 1000 ? '1 L' : p.nominal + ' ml'}</span></a>`).join('')}</div>
      <figcaption><b>Ubatuba</b> · ${t(['de 60 ml a 1 litro em PEAD', 'from 60 ml to 1 liter in HDPE', 'de 60 ml a 1 litro en PEAD'])} <a href="${url('colecoes/ubatuba')}">${esc(t(UI.verColecao))} ${ico('seta')}</a></figcaption>
    </figure>
  </div>
</section>

<section class="sec entradas-sec"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(['Por onde começar', 'Where to start', 'Por dónde empezar']))}<h2>${esc(t(X.dado59))}</h2></div><p>${esc(t(X.paraQuemLead))}</p></div>
  <div class="entradas">${entradas.map(e => `<a class="ent" href="${e.h}">${im(e.img, '')}<div class="ent-t"><span class="ent-n">${e.n}</span><h3>${esc(e.t)}</h3><p>${esc(e.p)}</p><span class="link">${esc(t(UI.saibaMais))} ${ico('seta')}</span></div></a>`).join('')}</div>
</div></section>

<section class="sec explorar-sec"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(UI.catalogo))}<h2>${t(['Explore por tipo de embalagem', 'Browse by packaging type', 'Explore por tipo de envase'])}</h2></div>${btn(url('catalogo'), t(UI.verCatalogo), 'bt-s')}</div>
  <div class="abas" data-abas>
    <div class="abas-l" role="tablist">${tipos.map((x, i) => `<button role="tab" type="button" aria-selected="${i === 0}" data-aba="${i}">${esc(t(x.n))} <small>${C.produtos.filter(p => p.tipo.k === x.k).length}</small></button>`).join('')}</div>
    ${tipos.map((x, i) => `<div class="aba" role="tabpanel" data-painel="${i}"${i ? ' hidden' : ''}><div class="mini-grid">${C.produtos.filter(p => p.tipo.k === x.k).slice(0, 10).map(p => `<a class="mini" href="${url('embalagem/' + p.slug)}"><span class="mini-img">${im(p.foto, '')}</span><b>${esc(t(p.nome))}</b><small>${esc(p.colecoes.map(nomeCol).join(' · '))}</small></a>`).join('')}<a class="mini mini-mais" href="${url('catalogo')}#tipo=${x.k}">${t(['Ver todos', 'See all', 'Ver todos'])}<b>${esc(t(x.n))}</b>${ico('seta')}</a></div></div>`).join('')}
  </div>
</div></section>

<section class="sec indice-sec"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(UI.colecoes))}<h2>${esc(t(X.linhaTitulo))}</h2></div><p>${esc(t(X.linhaLead))}</p></div>
  <ol class="indice">${C.colecoes.map((c, i) => `<li><a href="${url('colecoes/' + c.slug)}" style="--c:${c.cor}"><span class="ix-n">${String(i + 1).padStart(2, '0')}</span><span class="ix-nome">${esc(c.nome)}</span><span class="ix-vol">${esc(c.vers)}</span><span class="ix-mat">${esc(c.mat)}</span><span class="ix-img">${im(c.galeria[0] || c.img, '')}</span>${ico('seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="merc-b"><div class="in">
  <div class="sec-cab">${eyebrow(t(X.paraQuem))}<h2>${esc(t(X.dado66))}</h2></div>
  <div class="merc-b-grid">${C.mercados.map(m => `<a class="merc" href="${url('mercados/' + m.slug)}">${im(m.img, t(m.nome))}<div class="merc-t"><h3>${esc(t(m.nome))}</h3><p>${esc(t(m.titulo))}</p><span>${esc(t(UI.saibaMais))} ${ico('seta')}</span></div></a>`).join('')}</div>
</div></section>

<section class="sec proc-sec"><div class="in proc-grid">
  <div class="proc-cab">${eyebrow(t(['Como fabricamos', 'How we make it', 'Cómo fabricamos']))}<h2>${esc(t(X.quemSomosTitulo))}</h2><p>${esc(t(X.quemSomos))}</p></div>
  <ol class="proc">${C.X.processos.map((p, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${esc(t(p.k))}</h3><p>${esc(t(p.p))}</p></li>`).join('')}</ol>
</div></section>

<section class="sec premios-b"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(['Prêmios', 'Awards', 'Premios']))}<h2>${t(['Um portfólio repleto de projetos premiados', 'A portfolio full of award-winning projects', 'Un portafolio lleno de proyectos premiados'])}</h2></div>${btn(url('sobre') + '#premios', t(UI.empresa), 'bt-s')}</div>
  <ol class="linha-tempo" data-trilho tabindex="0">${C.premios.map(([a, n, d]) => `<li><b>${a}</b><h3>${esc(n)}</h3><p>${esc(t(d))}</p></li>`).join('')}</ol>
</div></section>

<section class="sus-b"><div class="in">
  <div class="sec-cab">${eyebrow(t(UI.sustentabilidade))}<h2>${esc(t(X.meta2027))}</h2></div>
  <div class="sus-num">
    <div>${ico('raio')}<b>100%</b><span>${t(['energia de fontes renováveis', 'renewable energy', 'energía renovable'])}</span></div>
    <div>${ico('recicla')}<b>&gt;95%</b><span>${t(['dos resíduos com destino sustentável (Lixo Zero)', 'of waste sent to sustainable destinations (Zero Waste)', 'de los residuos con destino sostenible (Basura Cero)'])}</span></div>
    <div>${ico('folha')}<b>CO₂</b><span>${t(['Empresa Carbono Neutro certificada', 'Certified Carbon Neutral Company', 'Empresa Carbono Neutro certificada'])}</span></div>
    <div>${ico('gota')}<b>10%</b><span>${t(['da água vem da chuva', 'of water comes from rain', 'del agua viene de la lluvia'])}</span></div>
  </div>
  ${btn(url('sustentabilidade'), t(['Conheça nossas iniciativas', 'See our initiatives', 'Conozca nuestras iniciativas']), 'bt-c')}
</div></section>

${marcasFaixa()}
${contatoBloco()}`, 'home');
}

function catalogo() {
  const grupo = (nome, chave, ops) => `<fieldset class="fg"><legend>${esc(nome)}</legend>${ops.map(([v, r, n]) => `<label class="chk"><input type="checkbox" name="${chave}" value="${esc(v)}"><span>${esc(r)}</span><small>${n}</small></label>`).join('')}</fieldset>`;
  const conta = f => C.produtos.filter(f).length;
  const segs = [...new Set(C.produtos.flatMap(p => p.mercados))];
  const filtros = [
    grupo(t(UI.tipo), 'tipo', C.TIPOS.map(x => [x.k, t(x.n), conta(p => p.tipo.k === x.k)]).filter(o => o[2])),
    grupo(t(UI.volume), 'vol', VOLF.map((f, i) => [String(i), f[2], conta(p => faixa(p.nominal) === i)])),
    grupo(t(UI.resina), 'res', ['PET', 'PEAD', 'PEBD', 'PP'].map(r => [r, r, conta(p => p.resinas.includes(r))])),
    grupo(t(UI.gargalo), 'garg', GARGS.map(g => [g, g, conta(p => p.garg === g)]).filter(o => o[2])),
    grupo(t(UI.colecao), 'col', C.colecoes.map(c => [c.slug, c.nome, conta(p => p.colecoes.includes(c.slug))])),
    grupo(t(UI.mercado), 'merc', segs.map(s => [s, segNome(s), conta(p => p.mercados.includes(s))])),
  ].join('');
  return pagina('catalogo', `
${topoPagina({ eb: t(UI.linha), h1: t(X.catalogoTitulo), lead: t(X.catalogoLead), img: null, migs: [[url(), t(UI.inicio)], [url('colecoes'), t(UI.linha)], ['', t(UI.catalogo)]] })}
<section class="sec cat-sec" data-catalogo><div class="in cat-grid">
  <aside class="cat-filtros" id="filtros" data-filtros>
    <div class="cf-cab"><h2>${ico('filtro')}${esc(t(UI.filtros))}</h2><button type="button" class="link" data-limpar>${esc(t(UI.limpar))}</button><button type="button" class="cf-fechar" data-filtros-fechar aria-label="${esc(t(UI.fechar))}">${ico('x')}</button></div>
    <form data-form-filtros>${filtros}</form>
  </aside>
  <div class="cat-res">
    <div class="cat-barra">
      <label class="cat-busca">${ico('busca')}<input type="search" data-q placeholder="${esc(t(UI.buscar))}" aria-label="${esc(t(UI.buscar))}"></label>
      <button type="button" class="bt bt-s cf-abrir" data-filtros-abrir aria-controls="filtros">${ico('filtro')}${esc(t(UI.filtros))}<span data-nfiltros></span></button>
      <p class="cat-conta" aria-live="polite"><b data-conta>${C.produtos.length}</b> ${esc(t(UI.itens))}</p>
      <div class="vista" role="group" aria-label="${t(['Visualização', 'View', 'Vista'])}"><button type="button" data-vista="grade" aria-pressed="true">${ico('grade')}<span>${esc(t(UI.grade))}</span></button><button type="button" data-vista="tabela" aria-pressed="false">${ico('lista')}<span>${esc(t(UI.tabela))}</span></button></div>
    </div>
    <div class="chips" data-chips></div>
    <div class="pc-grid" data-vista-grade>${C.produtos.map(p => cartao(p)).join('')}</div>
    <div class="tb-wrap" data-vista-tabela hidden><table class="tb">
      <thead><tr><td></td><th scope="col">${esc(t(UI.tipo))}</th><th scope="col">${esc(t(UI.referencia))}</th><th scope="col">${esc(t(UI.volTotal))}</th><th scope="col">${esc(t(UI.resina))}</th><th scope="col">${esc(t(UI.gargalo))}</th><th scope="col">${esc(t(UI.molde))}</th><th scope="col">${esc(t(UI.dimensao))}</th><td></td></tr></thead>
      <tbody>${C.produtos.map(linhaTabela).join('')}</tbody>
    </table></div>
    <p class="cat-vazio" data-vazio hidden>${esc(t(UI.nenhum))} <button type="button" class="link" data-limpar>${esc(t(UI.limpar))}</button></p>
    <p class="cat-nota">${t(['Volume total = capacidade até a boca, como na ficha do site atual. Precisa de um formato que não está aqui?', 'Brim-full capacity as in the current technical sheets. Need a shape that is not here?', 'Volumen total = capacidad hasta la boca, como en la ficha actual. ¿Necesita un formato que no está aquí?'])} <a href="${url('exclusivas')}">${esc(t(UI.exclusivas))}</a>.</p>
  </div>
</div></section>`, 'pg-catalogo');
}

function colecoesPg() {
  return pagina('colecoes', `
${topoPagina({ eb: t(UI.linha), h1: t(X.linhaTitulo), lead: t(X.linhaLead), img: 'hero-prainha', migs: [[url(), t(UI.inicio)], ['', t(UI.colecoes)]], extra: `<div class="topo-bts">${btn(url('catalogo'), t(UI.verCatalogo))}${btn(url('cores'), t(['Cartela de cores', 'Color chart', 'Carta de colores']), 'bt-s')}</div>` })}
<section class="sec"><div class="in"><div class="cc-grid">${C.colecoes.map(colCard).join('')}</div></div></section>
<section class="sec cmp-sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(['Comparar', 'Compare', 'Comparar']))}<h2>${t(['As 12 coleções lado a lado', 'All 12 collections side by side', 'Las 12 colecciones lado a lado'])}</h2></div>
  <div class="tb-wrap"><table class="tb tb-cmp"><thead><tr><th scope="col">${esc(t(UI.colecao))}</th><th scope="col">${esc(t(UI.versatilidade))}</th><th scope="col">${esc(t(UI.materiaPrima))}</th><th scope="col">${esc(t(UI.personalizacao))}</th><th scope="col">${esc(t(UI.perfeita))}</th></tr></thead>
  <tbody>${C.colecoes.map(c => `<tr><th scope="row"><a href="${url('colecoes/' + c.slug)}"><i style="--c:${c.cor}"></i>${esc(c.nome)}</a></th><td>${esc(c.vers)}</td><td>${esc(c.mat)}</td><td>${esc(c.pers)}</td><td>${c.mercados.map(segNome).map(esc).join(', ')}</td></tr>`).join('')}</tbody></table></div>
</div></section>
${contatoBloco()}`);
}

function colecaoPg(c) {
  const i = C.colecoes.indexOf(c);
  const ant = C.colecoes[(i + C.colecoes.length - 1) % C.colecoes.length], prox = C.colecoes[(i + 1) % C.colecoes.length];
  const tiposCol = [...new Set(c.itens.map(p => p.tipo.k))];
  const pumpsCol = C.pumps.filter(u => u.colecoes.includes(c.slug));
  const ficha = [[UI.versatilidade, c.vers], [UI.personalizacao, c.pers], [UI.materiaPrima, c.mat]];
  const resinasCol = new Set(c.itens.flatMap(p => p.resinas));
  const coresCol = C.cores.filter(g => (g.grupo === 'PET' ? resinasCol.has('PET') : resinasCol.has('PEAD') || resinasCol.has('PEBD')));
  return pagina('colecoes/' + c.slug, `
<section class="col-topo" style="--c:${c.cor}">
  <div class="col-banner">${im(c.img, '', 'fetchpriority="high" loading="eager"')}</div>
  <div class="in col-topo-in">
    ${migalha([[url(), t(UI.inicio)], [url('colecoes'), t(UI.colecoes)], ['', c.nome]])}
    <div class="col-cab">
      <div>${eyebrow(`${t(UI.colecao)} ${String(i + 1).padStart(2, '0')} / 12`)}<h1>${esc(c.nome)}</h1></div>
      <dl class="col-ficha">${ficha.map(([k, v]) => `<div><dt>${esc(t(k))}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    </div>
  </div>
</section>
<section class="sec col-intro"><div class="in col-intro-in">
  <div><p class="lead">${esc(t(c.desc))}</p>
    <p class="col-merc"><b>${esc(t(UI.perfeita))}:</b> ${c.mercados.map(s => `<span class="tag">${esc(segNome(s))}</span>`).join('')}</p>
    <div class="topo-bts"><a class="bt bt-p" href="${wa(MSGP[LI] + t(UI.colecao) + ' ' + c.nome)}" target="_blank" rel="noopener">${ico('whats')}${t(['Pedir orçamento da coleção', 'Request a quote', 'Pedir presupuesto'])}</a>${btn(url('catalogo') + '#col=' + c.slug, t(['Filtrar no catálogo', 'Filter in catalog', 'Filtrar en el catálogo']), 'bt-s')}</div>
  </div>
  <div class="col-galeria">${c.galeria.slice(0, 4).map((g, k) => `<figure class="g${k}">${im(g, `${t(UI.emUso)}: ${c.nome}`)}</figure>`).join('')}</div>
</div></section>
<section class="sec col-itens"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(`${c.itens.length} ${t(UI.embalagens)}`)}<h2>${t(['Embalagens e fechamentos', 'Packaging and closures', 'Envases y cierres'])}</h2></div>
    <div class="filtro-mini" data-filtro-mini role="group"><button type="button" aria-pressed="true" data-fm="*">${esc(t(UI.todos))}</button>${tiposCol.map(k => `<button type="button" aria-pressed="false" data-fm="${k}">${esc(t(C.TIPOS.find(x => x.k === k).n))}</button>`).join('')}</div></div>
  <div class="pc-grid">${c.itens.map(p => cartao(p)).join('')}</div>
</div></section>
${pumpsCol.length ? `<section class="sec col-pumps"><div class="in">
  <div class="sec-cab">${eyebrow(t(UI.pumps))}<h2>${t(['Pumps compatíveis com a coleção', 'Pumps for this collection', 'Bombas compatibles con la colección'])} ${esc(c.nome)}</h2></div>
  <div class="pumps-mini">${pumpsCol.map(u => `<a href="${url('pumps')}#${u.slug}">${im(u.img, '')}<b>${esc(t(u.nome))}</b><small>${u.variantes.map(v => v.garg).join(' · ')}</small></a>`).join('')}</div>
</div></section>` : ''}
${c.galeria.length > 4 ? `<section class="sec col-uso"><div class="in">
  <div class="sec-cab">${eyebrow(t(UI.emUso))}<h2>${t(['Marcas que já usam a', 'Brands already using', 'Marcas que ya usan la'])} ${esc(c.nome)}</h2></div>
  <div class="mosaico">${c.galeria.slice(4).map(g => `<figure>${im(g, `${c.nome}`)}</figure>`).join('')}</div>
</div></section>` : ''}
<section class="sec col-cores"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(UI.cartela))}<h2>${t(['Cores disponíveis', 'Available colors', 'Colores disponibles'])}</h2></div><p>${esc(t(UI.coresVariam))}</p></div>
  ${cartelaHtml(coresCol)}
</div></section>
<nav class="sec col-nav"><div class="in col-nav-in">
  <a href="${url('colecoes/' + ant.slug)}">${ico('voltar')}<span><small>${esc(t(UI.colecao))}</small>${esc(ant.nome)}</span></a>
  <a href="${url('colecoes/' + prox.slug)}"><span><small>${esc(t(UI.colecao))}</small>${esc(prox.nome)}</span>${ico('seta')}</a>
</div></nav>
${contatoBloco()}`, 'pg-colecao');
}

function cartelaHtml(grupos) {
  return `<div class="cartela">${grupos.map(g => `<div class="cartela-g"><h3>${t(['Cores', 'Colors', 'Colores'])} ${esc(g.grupo === 'PEAD' ? t(['PEAD', 'HDPE', 'PEAD']) : g.grupo)}</h3>${g.tipos.map(tp => `<div class="cartela-t"><h4>${esc(t(tp.tipo))}</h4><ul>${tp.cores.map(c => `<li>${im(c.img, '')}<span>${esc(c.nome)}</span></li>`).join('')}</ul></div>`).join('')}</div>`).join('')}</div>`;
}

function produtoPg(p) {
  const c = C.COL[p.colecoes[0]];
  const fecha = fechaCom(p);
  const pm = pumpsDe(p);
  const linhas = [[UI.referencia, p.ref], [UI.tipo, t(p.tipo.s)], [UI.colecao, p.colecoes.map(nomeCol).join(', ')], [UI.volNominal, p.nominal ? p.nominal + ' ml' : ''], [UI.volTotal, p.vol], [UI.resina, p.resina], [UI.gargalo, p.gargalo], [UI.molde, p.molde], [UI.dimensao, p.dim]].filter(r => r[1]);
  const outros = c.itens.filter(q => q !== p).slice(0, 8);
  const cor = C.cores.filter(g => (g.grupo === 'PET' ? p.resinas.includes('PET') : p.resinas.includes('PEAD') || p.resinas.includes('PEBD')));
  return pagina('embalagem/' + p.slug, `
<section class="ficha"><div class="in">
  ${migalha([[url(), t(UI.inicio)], [url('catalogo'), t(UI.catalogo)], [url('colecoes/' + c.slug), c.nome], ['', t(p.nome)]])}
  <div class="ficha-grid">
    <div class="ficha-palco" style="--c:${c.cor}">${im(p.foto, t(p.nome), 'loading="eager" fetchpriority="high"')}<span class="ficha-col">${esc(t(UI.colecao))} ${esc(p.colecoes.map(nomeCol).join(' · '))}</span></div>
    <div class="ficha-txt">
      ${eyebrow(t(p.tipo.s))}
      <h1>${esc(t(p.nome))}</h1>
      <p class="ficha-sub">${esc(t(UI.colecao))} ${p.colecoes.map(s => `<a href="${url('colecoes/' + s)}">${esc(nomeCol(s))}</a>`).join(', ')} · ref. ${esc(p.ref)}</p>
      <table class="ficha-tb"><tbody>${linhas.map(([k, v]) => `<tr><th scope="row">${esc(t(k))}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
      <div class="ficha-bts">
        <button class="bt bt-p" type="button" data-add="${dataItem(p)}">${ico('mais')}<span>${esc(t(UI.adicionar))}</span></button>
        <a class="bt bt-s" href="${wa(MSGP[LI] + t(p.nome) + ' · ' + p.colecoes.map(nomeCol).join(', ') + ' · ref. ' + p.ref)}" target="_blank" rel="noopener">${ico('whats')}${esc(t(UI.pedirAmostra))}</a>
      </div>
      <p class="ficha-nota">${esc(t(['Personalização: ', 'Decoration: ', 'Personalización: ']))}${esc(C.COL[p.colecoes[0]].pers)}. ${t(['Rótulo ou serigrafia a partir de 10 mil peças.', 'Labels or screen printing from 10,000 pieces.', 'Etiqueta o serigrafía desde 10 mil piezas.'])}</p>
    </div>
  </div>
</div></section>
${fecha.length || pm.length ? `<section class="sec fecha-sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(UI.combina))}<h2>${t(['Monte a embalagem completa', 'Build the complete package', 'Arme el envase completo'])}</h2><p>${esc(t(UI.combinaLead))} (${esc(p.gargalo)})</p></div>
  <div class="fecha">${fecha.map(q => `<a href="${url('embalagem/' + q.slug)}"><span class="fecha-img">${im(q.foto, '')}</span><b>${esc(t(q.nome))}</b><small>ref. ${esc(q.ref)} · ${esc(q.resina)}</small></a>`).join('')}${pm.map(u => `<a href="${url('pumps')}#${u.slug}"><span class="fecha-img">${im(u.img, '')}</span><b>${esc(t(u.nome))}</b><small>${esc(u.variantes.filter(v => v.garg === p.garg).map(v => v.modelo).join(' · '))}</small></a>`).join('')}</div>
</div></section>` : ''}
${cor.length ? `<section class="sec ficha-cores"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(UI.cartela))}<h2>${t(['Cores para esta resina', 'Colors for this resin', 'Colores para esta resina'])}</h2></div><p>${esc(t(UI.coresVariam))}</p></div>
  ${cartelaHtml(cor)}
</div></section>` : ''}
${c.galeria.length ? `<section class="sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(UI.emUso))}<h2>${t(['A coleção', 'The', 'La colección'])} ${esc(c.nome)} ${t(['nas prateleiras', 'collection on the shelf', 'en las góndolas'])}</h2></div>
  <div class="mosaico m4">${c.galeria.slice(0, 4).map(g => `<figure>${im(g, c.nome)}</figure>`).join('')}</div>
</div></section>` : ''}
${outros.length ? `<section class="sec outros-sec"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(c.nome)}<h2>${esc(t(UI.outros))}</h2></div>${btn(url('colecoes/' + c.slug), t(UI.verColecao), 'bt-s')}</div>
  <div class="pc-grid pc-4">${outros.map(q => cartao(q)).join('')}</div>
</div></section>` : ''}`, 'pg-produto');
}

function pumpsPg() {
  const lin = (k, v) => (v ? `<div><dt>${esc(t(k))}</dt><dd>${esc(t(v))}</dd></div>` : '');
  return pagina('pumps', `
${topoPagina({ eb: t(UI.pumps), h1: t(X.pumpsTitulo), lead: t(X.pumpsLead), img: 'hero-pumps', migs: [[url(), t(UI.inicio)], [url('colecoes'), t(UI.linha)], ['', t(UI.pumps)]] })}
<section class="sec"><div class="in">
  <nav class="pumps-nav">${C.pumps.map(u => `<a href="#${u.slug}">${im(u.img, '')}<span>${esc(t(u.nome))}</span></a>`).join('')}</nav>
  <div class="pumps">${C.pumps.map((u, i) => `<article class="pump" id="${u.slug}">
    <div class="pump-img">${im(u.img, t(u.nome))}</div>
    <div class="pump-txt">${eyebrow(`${String(i + 1).padStart(2, '0')} · ${t(u.tipo)}`)}<h2>${esc(t(u.nome))}</h2><p>${esc(t(u.p))}</p>
      <dl class="pump-dados"><div><dt>${t(['Vazão', 'Output', 'Caudal'])}</dt><dd>${esc(u.vazao)}</dd></div><div><dt>${t(['Peças por caixa', 'Pieces per box', 'Piezas por caja'])}</dt><dd>${esc(u.caixa)}</dd></div></dl>
      <div class="pump-vars">${u.variantes.map(v => `<dl>${lin(UI.gargalo, v.garg)}${lin(['Cor colar', 'Collar color', 'Color collar'], v.colar)}${lin(['Cor atuador', 'Actuator color', 'Color actuador'], v.atuador)}${lin(['Sobretampa', 'Overcap', 'Sobretapa'], v.sobretampa)}${lin(['Modelo', 'Model', 'Modelo'], v.modelo)}</dl>`).join('')}</div>
      ${u.nota ? `<p class="nota">${esc(t(u.nota))}</p>` : ''}
      <p class="pump-cols"><b>${esc(t(UI.colecoes))}:</b> ${u.colecoes.map(s => `<a href="${url('colecoes/' + s)}">${esc(nomeCol(s))}</a>`).join(' · ')}</p>
      <a class="bt bt-p" href="${wa(MSGP[LI] + t(u.nome))}" target="_blank" rel="noopener">${ico('whats')}${esc(t(UI.pedirAmostra))}</a>
    </div>
  </article>`).join('')}</div>
</div></section>
${contatoBloco()}`);
}

function coresPg() {
  return pagina('cores', `
${topoPagina({ eb: t(UI.linha), h1: t(X.coresTitulo), lead: t(X.coresLead), img: null, migs: [[url(), t(UI.inicio)], [url('colecoes'), t(UI.linha)], ['', t(UI.cores)]] })}
<section class="sec"><div class="in">${cartelaHtml(C.cores)}<p class="nota">${esc(t(UI.coresVariam))}</p></div></section>
${contatoBloco()}`);
}

function exclusivasPg() {
  const fotos = ['ex-24', 'ex-13', 'ex-11', 'ex-19', 'ex-21', 'ex-5', 'ex-6', 'ex-7', 'ex-14', 'ex-22', 'ex-23', 'ex-33'];
  return pagina('exclusivas', `
${topoPagina({ eb: t(UI.exclusivas), h1: t(X.exclusivasTitulo), lead: t(X.exclusivasLead), img: 'hero-exclusivas', migs: [[url(), t(UI.inicio)], ['', t(UI.exclusivas)]] })}
<section class="sec porque-sec"><div class="in">
  <div class="sec-cab centro">${eyebrow(t(['Por que exclusiva', 'Why custom', 'Por qué exclusiva']))}<h2>${t(['Você sabe o que uma embalagem exclusiva pode fazer pelo seu produto?', 'Do you know what custom packaging can do for your product?', '¿Sabe lo que un envase exclusivo puede hacer por su producto?'])}</h2></div>
  <ol class="porque">${X.porque.map((p, i) => { const [a, b, d] = t(p); return `<li><span>${String(i + 1).padStart(2, '0')}</span><p>${esc(a)}<b>${esc(b)}</b>${esc(d)}</p></li>`; }).join('')}</ol>
</div></section>
<section class="sec casos-sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(['Projetos premiados', 'Award-winning projects', 'Proyectos premiados']))}<h2>${t(['Cases que viraram referência', 'Cases that became benchmarks', 'Casos que se volvieron referencia'])}</h2></div>
  ${X.casos.map((k, i) => `<article class="caso${i % 2 ? ' inv' : ''}"><div class="caso-img">${im(k.img, k.t)}</div><div><h3>${esc(k.t)}</h3><p>${esc(t(k.p))}</p></div></article>`).join('')}
</div></section>
<section class="sec etapas-sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(['O que fazemos', 'What we do', 'Lo que hacemos']))}<h2>${t(['Cada etapa analisada para materializar a sua ideia', 'Every step analyzed to bring your idea to life', 'Cada etapa analizada para materializar su idea'])}</h2><p>${t(['Uma embalagem viável, segura, ergonômica e de destaque para o seu público.', 'A viable, safe, ergonomic package that stands out to your audience.', 'Un envase viable, seguro, ergonómico y destacado para su público.'])}</p></div>
  <ol class="etapas">${X.etapasExclusiva.map((e, i) => `<li>${im(e.img, t(e.t))}<div><span>${String(i + 1).padStart(2, '0')}</span><h3>${esc(t(e.t))}</h3><p>${esc(t(e.p))}</p></div></li>`).join('')}</ol>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(['Portfólio', 'Portfolio', 'Portafolio']))}<h2>${t(['Embalagens exclusivas que já produzimos', 'Custom packaging we have produced', 'Envases exclusivos que ya producimos'])}</h2></div><p>${t(['Fotos do portfólio do site atual da AB.', 'Photos from AB’s current portfolio.', 'Fotos del portafolio actual de AB.'])}</p></div>
  <div class="mosaico m6">${fotos.map(f => `<figure>${im(f, '')}</figure>`).join('')}</div>
</div></section>
${marcasFaixa()}
${contatoBloco(['Faça seu projeto exclusivo', 'Start your custom project', 'Haga su proyecto exclusivo'], ['Conte a ideia, o volume, o mercado e a quantidade. Nosso time de P&D e vendas retorna com a viabilidade.', 'Tell us the idea, capacity, market and quantity. Our R&D and sales team will come back with feasibility.', 'Cuéntenos la idea, el volumen, el mercado y la cantidad. Nuestro equipo de I+D y ventas responde con la viabilidad.'])}`);
}

function mercadoPg(m) {
  const cols = C.colecoes.filter(c => c.mercados.includes(m.slug) || c.mercados.some(s => m.seg.includes(s)));
  const fotos = { cosmeticos: ['g-garopaba-3', 'g-ubatuba-4', 'g-jurere-3', 'g-floripa-2', 'g-itapema-5', 'g-prainha-3'], petcare: ['g-itajuba-5', 'g-itajuba-4', 'g-garopaba-9', 'g-vera-5', 'pet-spray', 'g-camboriu-9'], farma: ['farma-201', 'farma-5', 'farma-3', 'farma-30', 'farma-50', 'g-vera-4'] }[m.slug];
  return pagina('mercados/' + m.slug, `
${topoPagina({ eb: t(UI.mercados), h1: t(m.nome), lead: t(m.titulo), img: m.hero, migs: [[url(), t(UI.inicio)], ['', t(m.nome)]] })}
<section class="sec merc-intro"><div class="in merc-intro-in">
  <div><p class="lead">${esc(t(m.p))}</p><ol class="porque porque-c">${X.porque.slice(1, 4).map(p => { const [a, b, d] = t(p); return `<li><p>${esc(a)}<b>${esc(b)}</b>${esc(d)}</p></li>`; }).join('')}</ol></div>
  <div class="merc-fotos">${fotos.slice(0, 3).map(f => `<figure>${im(f, '')}</figure>`).join('')}</div>
</div></section>
${m.seg.length ? `<section class="sec seg-sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(['Segmentos', 'Segments', 'Segmentos']))}<h2>${t(['Para cada linha de produto', 'For every product line', 'Para cada línea de producto'])}</h2></div>
  <div class="segs">${m.seg.map(s => `<a class="seg" href="${url('catalogo')}#merc=${s === 'dermo' || s === 'fito' || s === 'oral' ? 'farma' : s}">${im(C.segmentos[s].img, '')}<span>${esc(segNome(s))}</span></a>`).join('')}</div>
</div></section>` : ''}
<section class="sec"><div class="in">
  <div class="sec-cab lado"><div>${eyebrow(t(UI.linha))}<h2>${t(['Coleções indicadas para', 'Collections recommended for', 'Colecciones indicadas para'])} ${esc(t(m.nome))}</h2></div>${btn(url('catalogo') + '#merc=' + m.slug, t(UI.verCatalogo), 'bt-s')}</div>
  <div class="cc-grid">${cols.map(c => colCard(c, C.colecoes.indexOf(c))).join('')}</div>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(UI.emUso))}<h2>${t(['Embalagens AB nas prateleiras', 'AB packaging on the shelf', 'Envases AB en las góndolas'])}</h2></div>
  <div class="mosaico m6">${fotos.map(f => `<figure>${im(f, '')}</figure>`).join('')}</div>
</div></section>
<section class="sec exc-cta"><div class="in exc-cta-in">${im('ex-13', '')}<div>${eyebrow(t(UI.exclusivas))}<h2>${t(['Quer se destacar ainda mais?', 'Want to stand out even more?', '¿Quiere destacarse aún más?'])}</h2><p>${t(['Desenvolvemos embalagens exclusivas para o seu produto, da ideia até a materialização, com formato, cores e decorações únicas para encantar seu cliente e valorizar a sua marca.', 'We develop custom packaging for your product, from idea to production, with unique shape, colors and decoration to delight your customer and enhance your brand.', 'Desarrollamos envases exclusivos para su producto, de la idea a la producción, con formato, colores y decoración únicos para encantar a su cliente y valorizar su marca.'])}</p>${btn(url('exclusivas'), t(UI.saibaMais))}</div></div></section>
${contatoBloco()}`);
}

function sobrePg() {
  return pagina('sobre', `
${topoPagina({ eb: t(UI.empresa), h1: t(['Somos especialistas em embalagens', 'We are packaging specialists', 'Somos especialistas en envases']), lead: t(['Combinamos inovação, desenvolvimento e sustentabilidade para que cada embalagem encante e agregue valor.', 'We combine innovation, development and sustainability so every package delights and adds value.', 'Combinamos innovación, desarrollo y sostenibilidad para que cada envase encante y sume valor.']), img: 'fabrica-78', migs: [[url(), t(UI.inicio)], ['', t(UI.empresa)]] })}
<section class="sec qs-sec"><div class="in qs-grid">
  <div class="qs-foto">${im('inovacao', '')}</div>
  <div>${eyebrow(t(['Quem somos', 'Who we are', 'Quiénes somos']))}<h2>${t(['A inovação faz parte da nossa história', 'Innovation is part of our story', 'La innovación es parte de nuestra historia'])}</h2><p>${esc(t(X.quemSomos))}</p></div>
</div></section>
<section class="numeros"><div class="in num-grid"><h2 class="num-h">${t(['Qualidade traduzida em números', 'Quality in numbers', 'Calidad traducida en números'])}</h2>${C.numeros.map(n => `<div class="num"><b>${esc(n.n)}</b><span>${esc(t(n.t))}</span></div>`).join('')}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(['O que fazemos', 'What we do', 'Lo que hacemos']))}<h2>${t(['Tampas, batoques, frascos e potes na Linha AB e em embalagens exclusivas', 'Caps, plugs, bottles and jars in the AB Line and in custom packaging', 'Tapas, obturadores, frascos y potes en la Línea AB y en envases exclusivos'])}</h2></div>
  <ol class="proc proc-4">${X.processos.map((p, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${esc(t(p.k))}</h3><p>${esc(t(p.p))}</p></li>`).join('')}</ol>
</div></section>
<section class="sec premios-sec" id="premios"><div class="in">
  <div class="sec-cab">${eyebrow(t(['Prêmios', 'Awards', 'Premios']))}<h2>${t(['Um portfólio repleto de projetos premiados', 'A portfolio full of award-winning projects', 'Un portafolio lleno de proyectos premiados'])}</h2></div>
  <ol class="linha-tempo" data-trilho tabindex="0">${C.premios.map(([a, n, d]) => `<li><b>${a}</b><h3>${esc(n)}</h3><p>${esc(t(d))}</p></li>`).join('')}</ol>
</div></section>
<section class="sec qual-sec"><div class="in qual-grid">
  <div>${eyebrow(t(X.qualidadeTitulo))}<h2>${t(['Programa de Qualidade Assegurada e Acordos de Qualidade', 'Quality Assurance Program and Quality Agreements', 'Programa de Calidad Asegurada y Acuerdos de Calidad'])}</h2>${X.qualidade.map(q => `<p>${esc(t(q))}</p>`).join('')}</div>
  <div class="isos">${X.isos.map(s => `<article>${im(s.img, s.t)}<div><h3>${esc(s.t)}</h3><p>${esc(t(s.p))}</p></div></article>`).join('')}</div>
</div>
<div class="in sgi"><h3>${t(['Política do Sistema de Gestão Integrado (SGI)', 'Integrated Management System (IMS) policy', 'Política del Sistema de Gestión Integrado (SGI)'])}</h3><p>${esc(t(X.sgi))}</p></div></section>
<section class="sec ess-sec"><div class="in ess-grid">
  <div class="ess-foto">${im('fabrica-linha', '')}</div>
  <div>${eyebrow(t(['Nossa essência acompanha cada embalagem', 'Our essence goes into every package', 'Nuestra esencia acompaña cada envase']))}
    <dl class="ess">${X.essencia.map(e => `<div><dt>${esc(t(e.t))}</dt><dd>${esc(t(e.p))}</dd></div>`).join('')}<div><dt>${t(['Valores', 'Values', 'Valores'])}</dt><dd><ul>${X.valores.map(v => `<li><b>${esc(t(v.t))}:</b> ${esc(t(v.p))}</li>`).join('')}</ul></dd></div></dl>
  </div>
</div></section>
${marcasFaixa()}
${contatoBloco()}`);
}

function sustPg() {
  return pagina('sustentabilidade', `
${topoPagina({ eb: t(UI.sustentabilidade), h1: t(X.sustTitulo), lead: t(X.sustLead), img: 'hero-sustentabilidade', migs: [[url(), t(UI.inicio)], ['', t(UI.sustentabilidade)]] })}
<section class="sec meta-sec"><div class="in meta-in">${im('selo-carbono', t(['Selo Empresa Carbono Neutro 2024', 'Carbon Neutral Company 2024 seal', 'Sello Empresa Carbono Neutro 2024']))}<div>${eyebrow(t(['Compromisso 2027', '2027 commitment', 'Compromiso 2027']))}<h2>${esc(t(X.meta2027))}</h2></div>${im('sus-grafico', '')}</div></section>
<section class="sec"><div class="in"><div class="sus-grid">${C.sustentabilidade.map(s => `<article class="sus-c">${im(s.img, t(s.t))}<div><h3>${esc(t(s.t))}</h3><p>${esc(t(s.p))}</p></div></article>`).join('')}</div></div></section>
<section class="sec ods-sec"><div class="in ods-in">
  <div>${eyebrow(t(['Objetivos de Desenvolvimento Sustentável', 'Sustainable Development Goals', 'Objetivos de Desarrollo Sostenible']))}<h2>ODS</h2><p>${esc(t(X.ods))}</p></div>
  <div class="ods">${['ods-3', 'ods-4', 'ods-9', 'ods-11', 'ods-12', 'selo-ods'].map(o => im(o, o.toUpperCase())).join('')}</div>
</div></section>
<section class="sec iafa-sec"><div class="in qs-grid">
  <div class="qs-foto">${im('sus-iafa', '')}</div>
  <div>${eyebrow(t(['Responsabilidade social', 'Social responsibility', 'Responsabilidad social']))}<h2>Instituto A Fonte da Alegria</h2><p>${esc(t(X.iafa))}</p></div>
</div></section>
${contatoBloco()}`);
}

function carreirasPg() {
  return pagina('carreiras', `
${topoPagina({ eb: t(UI.carreiras), h1: t(X.carreirasTitulo), lead: t(X.carreirasLead), img: 'hero-carreiras', migs: [[url(), t(UI.inicio)], ['', t(UI.carreiras)]], extra: `<div class="topo-bts">${btn(site.linkedin, t(['Ver vagas no LinkedIn', 'See jobs on LinkedIn', 'Ver vacantes en LinkedIn']), 'bt-p', true)}</div>` })}
<section class="sec"><div class="in">
  <div class="sec-cab">${eyebrow(t(['Benefícios', 'Benefits', 'Beneficios']))}<h2>${t(['Proporcionamos diversos benefícios para nossos colaboradores', 'We offer many benefits to our employees', 'Ofrecemos diversos beneficios a nuestros colaboradores'])}</h2></div>
  <div class="benef">${C.beneficios.map((b, i) => `<article>${im(['car-educacao', 'car-2', 'car-corpo', 'car-4'][i], '')}<div><h3>${esc(t(b.t))}</h3><ul>${b.i.map(x => `<li>${ico('check')}${esc(t(x))}</li>`).join('')}</ul></div></article>`).join('')}</div>
</div></section>
<section class="sec qs-sec"><div class="in qs-grid">
  <div class="qs-foto">${im('car-1', '')}</div>
  <div>${eyebrow(t(['Cuidando dos colaboradores', 'Caring for our people', 'Cuidando a los colaboradores']))}<h2>Programa Cuidar + de Você</h2><p>${esc(t(X.cuidar))}</p>
    <ul class="valores-l">${X.valores.map(v => `<li><b>${esc(t(v.t))}</b>${esc(t(v.p))}</li>`).join('')}</ul></div>
</div></section>
${contatoBloco(['Quer fazer parte do nosso time?', 'Want to join our team?', '¿Quiere ser parte de nuestro equipo?'], ['Acompanhe as vagas no LinkedIn da AB ou mande uma mensagem com o seu interesse.', 'Follow openings on AB’s LinkedIn or send us a message.', 'Siga las vacantes en el LinkedIn de AB o envíenos un mensaje.'])}`);
}

function contatoPg() {
  return pagina('contato', `
${topoPagina({ eb: t(UI.contato), h1: t(X.contatoTitulo), lead: t(X.contatoLead), img: 'hero-contato', migs: [[url(), t(UI.inicio)], ['', t(UI.contato)]] })}
${contatoBloco(X.contatoTitulo, X.contatoLead, true)}
<section class="sec atalhos-sec"><div class="in atalhos">
  <a href="${url('catalogo')}">${ico('busca')}<b>${esc(t(UI.catalogo))}</b><span>${t(['Escolha a embalagem e monte a lista de orçamento.', 'Pick items and build your quote list.', 'Elija envases y arme la lista de presupuesto.'])}</span></a>
  <a href="${url('carreiras')}">${ico('check')}<b>${esc(t(UI.carreiras))}</b><span>${t(['Faça parte da nossa equipe.', 'Join our team.', 'Sea parte de nuestro equipo.'])}</span></a>
  <a href="${site.denunciaUrl}" target="_blank" rel="noopener">${ico('externo')}<b>${esc(t(UI.denuncias))}</b><span>${t(['Faça um contato seguro', 'Make a safe report', 'Haga un contacto seguro'])}: ${site.denuncia}</span></a>
</div></section>
${faqBloco()}
<section class="mapa"><iframe title="${t(['Mapa da AB em Joinville', 'AB on the map, Joinville', 'Mapa de AB en Joinville'])}" src="https://www.google.com/maps?q=Rua+Frederico+Hubner,+118,+Joinville,+SC&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);
}

function orcamentoPg() {
  return pagina('orcamento', `
${topoPagina({ eb: t(UI.linha), h1: t(UI.orcamento), lead: t(['Junte as embalagens que você quer, informe as quantidades e mande tudo de uma vez para a equipe de vendas.', 'Gather the items you want, set quantities and send everything at once to the sales team.', 'Junte los envases que desea, indique cantidades y envíe todo de una vez al equipo de ventas.']), img: null, migs: [[url(), t(UI.inicio)], [url('catalogo'), t(UI.catalogo)], ['', t(UI.orcamento)]] })}
<section class="sec"><div class="in orc-grid">
  <div class="orc-lista" data-orc-lista><p class="cat-vazio">${esc(t(UI.vazio))}</p></div>
  <form class="form orc-form" data-orc-form>
    <h2>${t(['Seus dados', 'Your details', 'Sus datos'])}</h2>
    <label><span>${esc(t(UI.nome))}</span><input name="nome" required autocomplete="name"></label>
    <label><span>${esc(t(UI.empresaCampo))}</span><input name="empresa" required autocomplete="organization"></label>
    <label><span>${esc(t(UI.cidadeUf))}</span><input name="cidade"></label>
    <label><span>${t(['Observações (cores, decoração, prazo)', 'Notes (colors, decoration, deadline)', 'Observaciones (colores, decoración, plazo)'])}</span><textarea name="obs" rows="3"></textarea></label>
    <button class="bt bt-p" type="submit">${ico('whats')}${esc(t(UI.enviar))}</button>
    <p class="form-nota">${t(['A lista fica salva neste navegador. Quantidade mínima e decoração: confira com o comercial.', 'The list is saved in this browser. Minimums and decoration: check with sales.', 'La lista queda guardada en este navegador. Mínimos y decoración: consulte con ventas.'])}</p>
    ${btn(url('catalogo'), t(['Adicionar mais embalagens', 'Add more items', 'Agregar más envases']), 'bt-s')}
  </form>
</div></section>`, 'pg-orcamento');
}

// ---------- gerar ----------
export function paginas() {
  return ['', 'catalogo', 'colecoes', ...C.colecoes.map(c => 'colecoes/' + c.slug), ...C.produtos.map(p => 'embalagem/' + p.slug), 'pumps', 'cores', 'exclusivas', ...C.mercados.map(m => 'mercados/' + m.slug), 'sobre', 'sustentabilidade', 'carreiras', 'contato', 'orcamento'];
}
export function gerar(v, l) {
  V = v; L = l; LI = LANGS.indexOf(l);
  const out = {};
  for (const s of paginas()) {
    const [a, b] = s.split('/');
    out[s] = !s ? home()
      : s === 'catalogo' ? catalogo()
      : s === 'colecoes' ? colecoesPg()
      : a === 'colecoes' ? colecaoPg(C.COL[b])
      : a === 'embalagem' ? produtoPg(P[b])
      : a === 'mercados' ? mercadoPg(M[b])
      : { pumps: pumpsPg, cores: coresPg, exclusivas: exclusivasPg, sobre: sobrePg, sustentabilidade: sustPg, carreiras: carreirasPg, contato: contatoPg, orcamento: orcamentoPg }[s]();
  }
  return out;
}
export { VNOME };
