// Monta as páginas das versões A ("Bandeira": fiel ao site atual, moldura verde-oliva, fotos dos banners, menu de produtos
// ao lado) e B ("Registro": clara e técnica, azul-petróleo do logo, produtos por área de uso e ficha técnica em destaque),
// em português e inglês. Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, catalogo, documentos, categorias, areas, slides, links, T } from './conteudo.mjs';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LANGS = ['pt', 'en'];
export const nomesVersao = { a: 'Bandeira', b: 'Registro' };

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  pdf: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/><path d="M9 14h6M9 17h4"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>',
  fora: '<path d="M14 5h5v5M19 5l-8 8"/><path d="M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"/>',
  escudo: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a0 0 0 010 0z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = L => `https://wa.me/${E.wa}?text=${encodeURIComponent(T[L].waMsg)}`;

const url = (v, L, pag) => `/${v}/${T[L].slugs[pag]}`;
const prodUrl = (v, L, p) => `${url(v, L, 'produtos')}${p.slug}/`;
const nomeP = (p, L) => L === 'en' ? p.nomeEn : p.nome;
const titulo = s => s.toLowerCase().replace(/(^|[\s/(-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase())
  .replace(/\b(De|Da|Do|Das|Dos|E|Com|Sem|Para|Por|A|O|Of|And|With|Without|For)\b/g, w => w.toLowerCase()).replace(/^(\p{L})/u, c => c.toUpperCase())
  .replace(/\bMl\b/g, 'ml').replace(/\bRmdesc\b/g, 'RMDESC').replace(/\bEva\b/g, 'EVA').replace(/\bBob Shave\b/, 'Bob Shave');
const nome = (p, L) => titulo(nomeP(p, L));
const catNome = (id, L) => categorias.find(c => c.id === id)[L];
const areaDe = id => areas.find(a => a.id === id);
const foto = (p, extra = '') => `<img src="/assets/img/p-${p.slug}.webp" alt="${esc(nome(p, 'pt'))}" loading="lazy" decoding="async"${extra}>`;
const primeiraFrase = s => { const m = String(s).match(/^.{40,}?[.!?](\s|$)/); return (m ? m[0] : s).trim(); };

// Documento RMS de cada produto: pelo número de registro no nome do arquivo; se não houver, pela primeira palavra do nome.
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
const rmsDe = p => {
  const rms = documentos.filter(d => d.grupo === 'rms' && d.arquivo);
  const porNum = rms.find(d => p.anvisa.some(n => d.orig.replace(/\D/g, '').includes(n)));
  if (porNum) return porNum;
  const w = norm(p.nome).split(' ')[0];
  const cand = rms.filter(d => norm(d.titulo).split(' ')[0] === w);
  return cand.length === 1 ? cand[0] : null;
};

// ---------- moldura ----------
function head(v, L, caminho, tit, desc, alternos) {
  const t = T[L], u = `${E.url}${v}/${caminho}`;
  const hl = LANGS.map(l => `<link rel="alternate" hreflang="${T[l].lang}" href="${E.url.replace(/\/$/, '')}${alternos[l]}">`).join('\n');
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tit)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${u}">
${hl}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Medicor Produtos Hospitalares">
<meta property="og:locale" content="${t.og}">
<meta property="og:title" content="${esc(tit)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${u}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#8f8d4e' : '#054948'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const bandeiras = {
  pt: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#229e45"/><path d="M14 3l10 7-10 7-10-7z" fill="#f8e509"/><circle cx="14" cy="10" r="4.2" fill="#2b49a3"/><path d="M10 9.3c2.6-.6 5.4-.2 7.9 1.2" stroke="#fff" stroke-width=".8" fill="none"/></svg>',
  en: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#012169"/><path d="M0 0l28 20M28 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l28 20M28 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M14 0v20M0 10h28" stroke="#fff" stroke-width="6"/><path d="M14 0v20M0 10h28" stroke="#c8102e" stroke-width="3.4"/></svg>',
};
const idiomas = (L, alternos) => `<div class="idiomas">${LANGS.map(l => `<a href="${alternos[l]}" hreflang="${T[l].lang}" lang="${T[l].lang}" title="${T[l].bandeira}"${l === L ? ' aria-current="true"' : ''}>${bandeiras[l]}<span>${l.toUpperCase()}</span></a>`).join('')}</div>`;
const menu = (v, L, atual) => ['index', 'empresa', 'produtos', 'downloads', 'contato'].map(p => `<a href="${url(v, L, p)}"${p === atual ? ' aria-current="page"' : ''}>${T[L].nav[p]}</a>`).join('');
const botaoCot = (v, L) => `<a class="btn-cot" href="${url(v, L, 'contato')}#cotacao">${ic('lista')}<span>${T[L].cotacao}</span><b class="cot-n" hidden>0</b></a>`;
const menuBtn = L => `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="${T[L].abrirMenu}">${ic('menu')}</button>`;

function topo(v, L, atual, alternos) {
  const t = T[L];
  if (v === 'a') return `<header class="topo">
<div class="topo-faixa"><div class="in">
  <a class="logo" href="${url(v, L, 'index')}" aria-label="Medicor Produtos Hospitalares, ${t.nav.index}"><img src="/assets/logo.svg" alt="Medicor Produtos Hospitalares" width="303" height="68"></a>
  <div class="topo-info"><p>${E.endereco[0]} · ${E.endereco[1].replace('Pavilhões', 'Pv.')}<br>Porto Alegre | RS | Brasil</p><a class="topo-fone" href="tel:${E.foneHref}">${E.foneIntl}</a></div>
  ${menuBtn(L)}
</div></div>
<div class="in"><div class="barra">
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, L, atual)}</nav>
  ${idiomas(L, alternos)}
  <a class="barra-fb" href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('fb')}</a>
  ${botaoCot(v, L)}
</div></div>
</header>`;
  return `<div class="util"><div class="in">
  <span class="so-pc">${t.desde === 'desde 1993' ? 'Distribuidora hospitalar desde 1993 · Porto Alegre, RS' : 'Hospital distributor since 1993 · Porto Alegre, Brazil'}</span>
  <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <a href="${waLink(L)}" target="_blank" rel="noopener">${ic('wa')} ${E.waFone}</a>
  ${idiomas(L, alternos)}
</div></div>
<header class="topo"><div class="in">
  <a class="logo" href="${url(v, L, 'index')}" aria-label="Medicor Produtos Hospitalares, ${t.nav.index}"><img src="/assets/logo.svg" alt="Medicor Produtos Hospitalares" width="303" height="68"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, L, atual)}</nav>
  ${botaoCot(v, L)}
  ${menuBtn(L)}
</div></header>`;
}

function rodape(v, L) {
  const t = T[L];
  if (v === 'a') return `<footer class="rodape"><div class="in">
  <a class="rod-fone" href="tel:${E.foneHref}">${E.foneIntl}</a>
  <div class="rod-cols">
    <div><img src="/assets/logo-branco.svg" alt="Medicor Produtos Hospitalares" width="210" height="47" loading="lazy"><p>${t.rodape}</p></div>
    <div><h3>${t.whatsapp}</h3><p><a href="${waLink(L)}" target="_blank" rel="noopener">${ic('wa')} ${E.waFone}</a></p><p><a href="${E.facebook}" target="_blank" rel="noopener">${ic('fb')} Facebook</a></p></div>
    <address><b>${E.razao}</b><br>${E.endereco.join('<br>')}</address>
  </div>
  <div class="rod-fim"><span>© ${E.razao}</span><nav aria-label="Rodapé">${menu(v, L, '')}</nav></div>
</div></footer>
<a class="wa-flut" href="${waLink(L)}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic('wa')}</a>`;
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Medicor Produtos Hospitalares" width="210" height="47" loading="lazy"><p>${t.rodape}</p><img class="rod-rmdesc" src="/assets/img/rmdesc.png" alt="RMDESC" width="130" height="34" loading="lazy"></div>
  <div><h3>${t.ligue}</h3><p><a href="tel:${E.foneHref}">${E.fone}</a></p><h3>${t.whatsapp}</h3><p><a href="${waLink(L)}" target="_blank" rel="noopener">${E.waFone}</a></p></div>
  <div><h3>${t.endereco}</h3><address>${E.endereco.join('<br>')}</address><p><a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} ${t.verMapa}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, L, '')}</nav>
</div><p class="rod-fim"><span>© ${E.razao}</span><a href="${E.facebook}" target="_blank" rel="noopener">${ic('fb')} Facebook</a></p></footer>
<a class="wa-flut" href="${waLink(L)}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic('wa')}</a>`;
}

const pagina = ({ v, L, pag, caminho, alternos, tit, desc, corpo }) => `${head(v, L, caminho, tit, desc, alternos)}
<body class="v-${v} p-${pag}">
<a class="pular" href="#conteudo">${T[L].pular}</a>
${topo(v, L, pag === 'produto' ? 'produtos' : pag, alternos)}
<main id="conteudo">
${corpo}
</main>
${rodape(v, L)}
</body>
</html>
`;

// ---------- pedaços comuns ----------
const destaques = ['equipo-de-infusao-gravitacional-macrogotas-completo', 'equipo-de-infusao-gravitacional-macrogotas-premium', 'equipo-de-infusao-gravitacional-macrogotas-simples', 'lanceta-para-puncao-de-sangue', 'seringa-descartavel', 'linha-sanguinea-arterial-com-catabolha-para-hemodialise'].map(s => catalogo.find(p => p.slug === s));

const tile = (v, L, p) => `<a class="tile" href="${prodUrl(v, L, p)}"><span class="tile-foto">${foto(p)}</span><span class="tile-nome">${esc(nome(p, L))}</span></a>`;

const addBtn = (L, item, rot = true) => `<button class="add" type="button" data-item="${esc(item)}" aria-label="${esc(T[L].addCot)}: ${esc(item)}">${ic('mais', 'ic ic-mais')}${ic('ok', 'ic ic-ok')}${rot ? `<span class="add-rot">${T[L].addCot}</span><span class="add-on">${T[L].naCot}</span>` : ''}</button>`;

function tabelaModelos(p, L) {
  const tab = L === 'en' ? p.modelosEn : p.modelos;
  if (!tab) return '';
  const [cab, ...linhas] = tab;
  return `<div class="tab-wrap"><table class="tab"><thead><tr>${cab.map(c => `<th>${esc(c)}</th>`).join('')}<th class="col-add"><span class="sr">${T[L].cotacao}</span></th></tr></thead><tbody>${linhas.map(r => `<tr>${r.map((c, i) => i === 0 ? `<td class="cod">${esc(c)}</td>` : `<td>${esc(c)}</td>`).join('')}<td class="col-add">${addBtn(L, `${nome(p, L)} · ${r[1]} (${T[L].codigo.toLowerCase()} ${r[0]})`, false)}</td></tr>`).join('')}</tbody></table></div>`;
}

const lista = arr => arr.length ? `<ul>${arr.map(x => `<li>${esc(x.replace(/^\*\s*/, ''))}</li>`).join('')}</ul>` : '';
const selos = (p, L) => `<div class="selos">${p.anvisa.length ? `<span class="selo-anvisa">${ic('escudo')}<span>${T[L].registro}</span><b>${p.anvisa.join(' · ')}</b></span>` : ''}${p.inmetro ? `<span class="selo-inmetro"><img src="/assets/img/inmetro.png" alt="INMETRO" width="22" height="26" loading="lazy">${T[L].inmetro}</span>` : ''}</div>`;

function ficha(v, L, p) {
  const t = T[L], d = p[L], doc = rmsDe(p);
  const blocos = [[t.composicao, d.comp], [t.apresentacao, d.apr], [t.informacoes, d.outros]].filter(([, a]) => a.length);
  return { doc, blocos: blocos.map(([h, a]) => `<section class="bloco"><h2>${h}</h2>${lista(a)}</section>`).join(''),
    desc: d.desc.map(x => `<p>${esc(x)}</p>`).join(''),
    modelos: p.modelos ? `<section class="modelos"><h2>${t.modelos}</h2>${tabelaModelos(p, L)}</section>` : '',
    add: p.modelos ? '' : addBtn(L, nome(p, L)),
    rms: doc ? `<a class="link-doc" href="/assets/docs/${doc.arquivo}" target="_blank" rel="noopener">${ic('pdf')}<span>${t.rms}</span></a>` : '' };
}

const fotoGrande = (L, p) => `<a class="foto-grande" href="/assets/img/p-${p.slug}.webp" target="_blank" rel="noopener" aria-label="${T[L].fotoAmpliar}">${foto(p, ' fetchpriority="high"').replace('loading="lazy"', 'loading="eager"')}</a>`;

const equacao = L => `<p class="equacao"><span>${T[L].conhecimento}</span><i>+</i><span>${T[L].amor}</span><i>=</i><span>${T[L].qualidade}</span></p>`;

const catalogoCta = (L, cls = '') => `<section class="cat-cta ${cls}"><div class="in"><img src="/assets/img/capa-catalogo.webp" alt="${T[L].catalogoTit}" width="230" height="312" loading="lazy"><div><h2>${T[L].catalogoTit}</h2><p>${T[L].catalogoTxt}</p><a class="btn" href="${E.catalogoPdf}" target="_blank" rel="noopener">${ic('baixar')} ${T[L].baixarCatalogo}</a></div></div></section>`;

// menu lateral de produtos (versão A), como o site atual
const lateral = (v, L, atualCat, atualProd) => `<aside class="lateral">
  <h2>${T[L].produtos}</h2>
  <ul class="cats">${categorias.map(c => {
    const ps = catalogo.filter(p => p.cat === c.id);
    return `<li><details${c.id === atualCat ? ' open' : ''}><summary>${esc(c[L])}<small>${ps.length}</small></summary><ul>${ps.map(p => `<li><a href="${prodUrl(v, L, p)}"${p.slug === atualProd ? ' aria-current="page"' : ''}>${esc(nome(p, L))}</a></li>`).join('')}</ul></details></li>`;
  }).join('')}</ul>
  <a class="lat-cat" href="${E.catalogoPdf}" target="_blank" rel="noopener">${ic('pdf')} ${T[L].baixarCatalogo}</a>
  <img class="lat-selo" src="/assets/img/to-nessa.png" alt="Conhecimento + Amor = Qualidade na saúde · Tô nessa" width="200" height="198" loading="lazy">
</aside>`;

const titBanda = (titulo, sub = '') => `<section class="banda"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- páginas ----------
function homeA(L) {
  const t = T[L], v = 'a';
  return `<section class="vitrine"><div class="in">
  <div class="slides" data-slides>${slides.map((s, i) => `<figure class="slide${i ? '' : ' on'}"><img src="/assets/img/${s.img}.webp" alt="" width="${[960, 1080, 800, 920][i]}" height="600"${i ? ' loading="lazy"' : ' fetchpriority="high"'}><figcaption>${i ? `<p>${esc(s[L])}</p>` : `<h1>${esc(s[L])}</h1>`}</figcaption></figure>`).join('')}
    <div class="pontos" data-slides-pontos></div>
  </div>
  <div class="faixa-rmdesc"><div><h2>${t.tagline}</h2><p>${t.banner}</p></div><a class="selo-rmdesc" href="${url(v, L, 'produtos')}"><img src="/assets/img/rmdesc.png" alt="RMDESC" width="260" height="68"></a></div>
</div></section>

<section class="miolo"><div class="in grade-lateral">
  ${lateral(v, L)}
  <div class="principal">
    <h2 class="tit-sec">${t.destaque}</h2>
    <div class="tiles">${destaques.map(p => tile(v, L, p)).join('')}</div>
    <a class="btn btn-cheio" href="${url(v, L, 'produtos')}">${t.verTodos} ${ic('seta')}</a>
  </div>
</div></section>

<section class="bandeira"><div class="in">
  <img class="bandeira-selo" src="/assets/img/to-nessa.png" alt="Tô nessa: Conhecimento + Amor = Qualidade na saúde" width="200" height="198" loading="lazy">
  <div>
    <p class="sobre">${t.bandeiraTit}:</p>
    ${equacao(L)}
    <p>${t.bandeiraTxt}</p>
  </div>
</div>
<div class="in"><ol class="valores">${t.valores.map((x, i) => `<li><span>0${i + 1}</span>${x}</li>`).join('')}</ol></div></section>

<section class="sobre-emp"><div class="in">
  <figure><img src="/assets/img/fachada.webp" alt="Sede da Medicor Produtos Hospitalares em Porto Alegre" width="1160" height="634" loading="lazy"><figcaption>${E.endereco[0]} · Porto Alegre</figcaption></figure>
  <div>
    <h2 class="tit-sec">${t.nav.empresa}</h2>
    <p class="lead">${t.empresa[0]}</p>
    <dl class="numeros"><div><dt>1993</dt><dd>${L === 'en' ? 'founded' : 'fundação'}</dd></div><div><dt>${catalogo.length}</dt><dd>${t.produtosN}</dd></div><div><dt>${categorias.length}</dt><dd>${t.linhasN}</dd></div><div><dt>BR</dt><dd>${t.brasil}</dd></div></dl>
    <a class="btn" href="${url(v, L, 'empresa')}">${t.nav.empresa} ${ic('seta')}</a>
  </div>
</div></section>
${catalogoCta(L)}`;
}

function homeB(L) {
  const t = T[L], v = 'b';
  const ser = catalogo.find(p => p.slug === 'seringa-descartavel');
  const cont = g => documentos.filter(d => d.grupo === g).length;
  return `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">${L === 'en' ? 'Hospital products since 1993' : 'Produtos hospitalares desde 1993'}</p>
    <h1>${t.heroB}</h1>
    <p class="hero-sub">${t.heroBSub}</p>
    <div class="acoes"><a class="btn btn-cheio" href="${url(v, L, 'produtos')}">${t.verCatalogo} ${ic('seta')}</a><a class="btn" href="${url(v, L, 'contato')}">${t.pedirCot}</a></div>
    <dl class="fatos"><div><dt>1993</dt><dd>${L === 'en' ? 'founded' : 'fundação'}</dd></div><div><dt>${catalogo.length}</dt><dd>${t.produtosN}</dd></div><div><dt>${categorias.length}</dt><dd>${t.linhasN}</dd></div></dl>
  </div>
  <div class="hero-vis">
    <figure class="estoque"><img src="/assets/img/estoque.webp" alt="${L === 'en' ? 'Stock of RMDESC products' : 'Estoque de produtos RMDESC'}" width="1600" height="2182" fetchpriority="high"></figure>
    <a class="ficha-flut" href="${prodUrl(v, L, ser)}">
      <span class="ff-top"><img src="/assets/img/p-${ser.slug}.webp" alt="" width="64" height="64"><span><small>${t.fichaTit}</small><b>${esc(nome(ser, L))}</b></span></span>
      <span class="ff-linha"><span>${t.registro}</span><b>${ser.anvisa[0]}</b></span>
      <span class="ff-linha"><span>INMETRO</span><b>${L === 'en' ? 'certified' : 'certificado'}</b></span>
      <span class="ff-linha"><span>${t.modelos}</span><b>3 · 5 · 10 · 20 · 60 ml</b></span>
    </a>
  </div>
</div></section>

<section class="areas"><div class="in">
  <div class="cab-sec"><h2>${t.areasTit}</h2><p>${t.areasSub}</p></div>
  <ol class="area-lista">${areas.map((a, i) => {
    const ps = catalogo.filter(p => p.area === a.id);
    return `<li><a href="${url(v, L, 'produtos')}#${a.id}"><span class="num">0${i + 1}</span><span class="a-txt"><b>${a[L]}</b><span>${L === 'en' ? a.enTxt : a.ptTxt}</span></span><span class="a-fotos">${ps.slice(0, 3).map(p => `<img src="/assets/img/p-${p.slug}.webp" alt="" width="72" height="72" loading="lazy">`).join('')}</span><span class="a-n">${ps.length}</span>${ic('seta')}</a></li>`;
  }).join('')}</ol>
</div></section>

<section class="como"><div class="in">
  <h2>${t.comoTit}</h2>
  <ol class="passos" data-etapas>${t.como.map(([h, p], i) => `<li><span class="p-n">${i + 1}</span><b>${h}</b><p>${p}</p></li>`).join('')}</ol>
</div></section>

<section class="docs-faixa"><div class="in">
  <div><h2>${t.docsTit}</h2><p>${t.docsTxt}</p><a class="btn btn-claro" href="${url(v, L, 'downloads')}">${t.verDocs} ${ic('seta')}</a></div>
  <ul class="docs-n">${['empresa', 'cert', 'dou', 'rms'].map(g => `<li><b>${cont(g)}</b><span>${t.grupos[g]}</span></li>`).join('')}</ul>
</div></section>

<section class="bandeira"><div class="in">
  <div><p class="sobre">${t.bandeiraTit}:</p>${equacao(L)}<p>${t.bandeiraTxt}</p></div>
  <img class="bandeira-selo" src="/assets/img/to-nessa.png" alt="Tô nessa: Conhecimento + Amor = Qualidade na saúde" width="200" height="198" loading="lazy">
</div></section>

<section class="emp-prev"><div class="in">
  <figure><img src="/assets/img/fachada.webp" alt="Sede da Medicor Produtos Hospitalares em Porto Alegre" width="1160" height="634" loading="lazy"></figure>
  <div><h2>${t.nav.empresa}</h2><p>${t.empresa[1]}</p><p>${t.empresa[2]}</p><a class="btn" href="${url(v, L, 'empresa')}">${L === 'en' ? 'About Medicor' : 'Conheça a Medicor'} ${ic('seta')}</a></div>
</div></section>
${catalogoCta(L, 'cat-b')}`;
}

function empresaPag(v, L) {
  const t = T[L];
  const textos = `<div class="emp-txt">${t.empresa.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div>`;
  const bandeira = `<section class="bandeira bandeira-int"><img class="bandeira-selo" src="/assets/img/to-nessa.png" alt="Tô nessa" width="200" height="198" loading="lazy"><div><p class="sobre">${t.bandeiraTit}:</p>${equacao(L)}<p>${t.bandeiraTxt}</p></div></section>`;
  const mve = `<section class="mve"><div class="mve-missao"><h2>${t.missaoTit}</h2><p>${t.missao}</p></div><div class="mve-valores"><h2>${t.valoresTit}</h2><ol class="valores">${t.valores.map((x, i) => `<li><span>0${i + 1}</span>${x}</li>`).join('')}</ol></div></section>
<section class="equipe"><h2>${t.equipeTit}</h2>${t.equipe.map(p => `<p>${p}</p>`).join('')}</section>
<section class="rmdesc-box"><img src="/assets/img/rmdesc.png" alt="RMDESC" width="260" height="68" loading="lazy"><div><h2>${t.rmdescTit}</h2><p>${t.rmdescTxt}</p><a class="btn" href="${url(v, L, 'produtos')}">${t.verTodos} ${ic('seta')}</a></div></section>`;
  if (v === 'a') return `${titBanda(t.nav.empresa, t.tagline)}
<section class="miolo"><div class="in grade-lateral">${lateral(v, L)}<div class="principal">
  <figure class="emp-foto"><img src="/assets/img/fachada.webp" alt="Sede da Medicor Produtos Hospitalares em Porto Alegre" width="1160" height="634"></figure>
  ${textos}${bandeira}${mve}
</div></div></section>`;
  return `<section class="emp-hero"><div class="in"><div><p class="eyebrow">${t.pioneira}</p><h1>${t.nav.empresa}</h1><p class="hero-sub">${t.empresa[0]}</p></div><figure><img src="/assets/img/fachada.webp" alt="Sede da Medicor Produtos Hospitalares em Porto Alegre" width="1160" height="634"></figure></div></section>
<section class="emp-corpo"><div class="in">
  <div class="emp-cols"><p>${t.empresa[1]}</p><p>${t.empresa[2]}</p></div>
  ${bandeira}${mve}
</div></section>
<section class="estoque-faixa" aria-hidden="true"><img src="/assets/img/estoque-largo.webp" alt="" width="1800" height="1143" loading="lazy"></section>`;
}

function produtosPag(v, L) {
  const t = T[L];
  if (v === 'a') return `${titBanda(t.nav.produtos, t.catalogoTxt)}
<section class="miolo"><div class="in grade-lateral">${lateral(v, L)}<div class="principal">
  <a class="cat-mini" href="${E.catalogoPdf}" target="_blank" rel="noopener"><img src="/assets/img/capa-catalogo.webp" alt="" width="70" height="95"><span><b>${t.catalogoTit}</b>${t.baixarCatalogo}</span>${ic('baixar')}</a>
  ${categorias.map(c => { const ps = catalogo.filter(p => p.cat === c.id); return `<section class="cat-grupo" id="${c.id}"><h2 class="tit-sec">${esc(c[L])}</h2><div class="tiles">${ps.map(p => tile(v, L, p)).join('')}</div></section>`; }).join('')}
</div></div></section>`;
  return `<section class="cab-pag"><div class="in"><h1>${t.nav.produtos}</h1><p>${t.areasSub}</p>
  <div class="filtros"><label class="busca">${ic('busca')}<span class="sr">${t.buscar}</span><input type="search" placeholder="${t.buscar}" data-busca></label>
  <div class="chips" role="group" aria-label="${t.areasTit}"><button type="button" class="chip" data-area="" aria-pressed="true">${t.todos}</button>${areas.map(a => `<button type="button" class="chip" data-area="${a.id}" aria-pressed="false">${a[L]}</button>`).join('')}</div></div>
</div></section>
<section class="cat-lista"><div class="in">
  ${areas.map(a => `<section class="area-grupo" id="${a.id}" data-grupo="${a.id}"><h2>${a[L]}</h2><ul>${catalogo.filter(p => p.area === a.id).map(p => `<li data-item-busca="${esc(norm(`${nome(p, L)} ${p.anvisa.join(' ')} ${(p.modelos || []).slice(1).map(r => r.join(' ')).join(' ')} ${catNome(p.cat, L)}`).toLowerCase())}"><a href="${prodUrl(v, L, p)}"><span class="l-foto">${foto(p)}</span><span class="l-txt"><b>${esc(nome(p, L))}</b><span>${esc(primeiraFrase(p[L].desc[0] || ''))}</span></span><span class="l-reg">${p.anvisa.length ? `<small>ANVISA</small>${p.anvisa[0]}` : `<small>${catNome(p.cat, L)}</small>`}</span>${ic('seta')}</a></li>`).join('')}</ul></section>`).join('')}
  <p class="sem-res" data-sem-res hidden>${t.semRes}</p>
</div></section>
${catalogoCta(L, 'cat-b')}`;
}

function produtoPag(v, L, p) {
  const t = T[L], f = ficha(v, L, p);
  const rel = catalogo.filter(x => x !== p && (v === 'a' ? x.cat === p.cat : x.area === p.area)).slice(0, 4);
  const migalha = `<nav class="migalha" aria-label="Breadcrumb"><a href="${url(v, L, 'produtos')}">${t.nav.produtos}</a><span>/</span><a href="${url(v, L, 'produtos')}#${v === 'a' ? p.cat : p.area}">${esc(v === 'a' ? catNome(p.cat, L) : areaDe(p.area)[L])}</a></nav>`;
  if (v === 'a') return `<section class="miolo"><div class="in grade-lateral">${lateral(v, L, p.cat, p.slug)}<div class="principal">
  ${migalha}
  <h1 class="tit-prod">${esc(nome(p, L))}</h1>
  <div class="prod-topo">${fotoGrande(L, p)}<div class="prod-desc">${f.desc}${selos(p, L)}${f.add}${f.rms}</div></div>
  ${f.modelos}
  <div class="blocos">${f.blocos}</div>
  ${rel.length ? `<section class="rel"><h2 class="tit-sec">${t.relacionados}</h2><div class="tiles">${rel.map(x => tile(v, L, x)).join('')}</div></section>` : ''}
</div></div></section>`;
  return `<section class="prod"><div class="in">
  ${migalha}
  <div class="prod-grid">
    <div class="prod-vis">${fotoGrande(L, p)}</div>
    <div class="prod-info">
      <p class="eyebrow">RMDESC · ${esc(catNome(p.cat, L))}</p>
      <h1>${esc(nome(p, L))}</h1>
      ${f.desc}
      ${selos(p, L)}
      ${f.modelos}${f.add}
      ${f.rms}
    </div>
  </div>
  <div class="blocos">${f.blocos}</div>
</div></section>
${rel.length ? `<section class="rel"><div class="in"><h2>${t.relacionados}: ${areaDe(p.area)[L]}</h2><div class="rel-lista">${rel.map(x => `<a href="${prodUrl(v, L, x)}">${foto(x)}<span>${esc(nome(x, L))}</span></a>`).join('')}</div></div></section>` : ''}`;
}

function downloadsPag(v, L) {
  const t = T[L];
  const grupos = ['empresa', 'cert', 'dou', 'rms'];
  const docNome = d => L === 'en' && d.tituloEn ? d.tituloEn : titulo(d.titulo).replace(/ C\/ /gi, ' c/ ').replace(/\bResolução\b/, 'Resolução');
  const item = d => d.arquivo
    ? `<li data-item-busca="${esc(norm(docNome(d)).toLowerCase())}"><a href="/assets/docs/${d.arquivo}" target="_blank" rel="noopener">${ic('pdf')}<span>${esc(docNome(d))}</span>${ic('baixar', 'ic ic-baixar')}</a></li>`
    : `<li data-item-busca="${esc(norm(docNome(d)).toLowerCase())}"><a href="${url(v, L, 'contato')}">${ic('pdf')}<span>${esc(docNome(d))}</span><em>${t.sobConsulta}</em></a></li>`;
  const docs = grupos.map(g => `<section class="doc-grupo"><h2${v === 'a' ? ' class="tit-sec"' : ''}>${t.grupos[g]} <small>${documentos.filter(d => d.grupo === g).length}</small></h2><ul class="doc-lista">${documentos.filter(d => d.grupo === g).map(item).join('')}</ul></section>`).join('');
  const lk = `<section class="links-uteis"><h2${v === 'a' ? ' class="tit-sec"' : ''}>${t.linksTit}</h2><p>${t.linksSub}</p><ul>${links.map(([n, h]) => `<li><a href="${h}" target="_blank" rel="noopener">${esc(n)}${ic('fora')}</a></li>`).join('')}</ul></section>`;
  if (v === 'a') return `${titBanda(t.downloadsTit, t.downloadsSub)}
<section class="miolo"><div class="in grade-lateral">${lateral(v, L)}<div class="principal">
  <a class="cat-mini" href="${E.catalogoPdf}" target="_blank" rel="noopener"><img src="/assets/img/capa-catalogo.webp" alt="" width="70" height="95"><span><b>${t.catalogoTit}</b>${t.baixarCatalogo}</span>${ic('baixar')}</a>
  ${docs}${lk}
</div></div></section>`;
  return `<section class="cab-pag"><div class="in"><h1>${t.downloadsTit}</h1><p>${t.downloadsSub}</p>
  <div class="filtros"><label class="busca">${ic('busca')}<span class="sr">${t.buscar}</span><input type="search" placeholder="${L === 'en' ? 'Search document' : 'Buscar documento'}" data-busca></label></div>
</div></section>
<section class="docs-pag"><div class="in"><div class="docs-cols"><div>${docs}<p class="sem-res" data-sem-res hidden>${t.semRes}</p></div><aside>
  <a class="cat-mini" href="${E.catalogoPdf}" target="_blank" rel="noopener"><img src="/assets/img/capa-catalogo.webp" alt="" width="70" height="95"><span><b>${t.catalogoTit}</b>${t.baixarCatalogo}</span>${ic('baixar')}</a>
  ${lk}</aside></div></div></section>`;
}

function contatoPag(v, L) {
  const t = T[L], f = t.form;
  const form = `<form class="form" data-wa-form="${E.wa}" data-assunto="${esc(f.assunto)}">
  <div class="campos">
    <label><span>${f.nome}</span><input name="${f.nome}" required autocomplete="name"></label>
    <label><span>${f.empresa}</span><input name="${f.empresa}" autocomplete="organization"></label>
    <label><span>${f.cidade}</span><input name="${f.cidade}" autocomplete="address-level2"></label>
    <label><span>${f.fone}</span><input name="${f.fone}" type="tel" autocomplete="tel"></label>
    <label class="larga"><span>${f.email}</span><input name="${f.email}" type="email" autocomplete="email"></label>
    <div class="larga cot-box" id="cotacao"><h2>${t.cotTit}</h2><div data-cot-lista data-vazia="${esc(t.cotVazia)}" data-qtd="${esc(t.qtd)}" data-tirar="${esc(t.tirar)}"><p class="cot-vazia">${t.cotVazia}</p></div><input type="hidden" name="${f.cot}" data-cot-campo></div>
    <label class="larga"><span>${f.msg}</span><textarea name="${f.msg}" rows="5"></textarea></label>
    <label class="larga check"><input type="checkbox" name="${f.novidades}" value="${L === 'en' ? 'yes' : 'sim'}"><span>${f.novidades}</span></label>
  </div>
  <button class="btn btn-cheio" type="submit">${ic('wa')} ${f.enviar}</button>
</form>`;
  const canais = `<div class="canais">
  <a href="tel:${E.foneHref}">${ic('tel')}<span><small>${t.ligue}</small>${E.fone}</span></a>
  <a href="${waLink(L)}" target="_blank" rel="noopener">${ic('wa')}<span><small>${t.whatsapp}</small>${E.waFone}</span></a>
  <a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}<span><small>${t.endereco}</small>${E.endereco.join('<br>')}</span></a>
</div>`;
  const mapa = `<iframe class="mapa" src="${E.mapaEmbed}" title="${t.verMapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  if (v === 'a') return `${titBanda(t.contatoTit, t.contatoSub)}
<section class="miolo"><div class="in grade-lateral">${lateral(v, L)}<div class="principal contato">${canais}${form}${mapa}</div></div></section>`;
  return `<section class="cab-pag"><div class="in"><h1>${t.contatoTit}</h1><p>${t.contatoSub}</p></div></section>
<section class="contato"><div class="in contato-grid"><div>${form}</div><aside>${canais}${mapa}</aside></div></section>`;
}

// ---------- montagem ----------
export function gerarVersao(v) {
  const out = {};
  const descs = { pt: 'Medicor Produtos Hospitalares, Porto Alegre (RS): distribuição de descartáveis para a saúde desde 1993 e marca própria RMDESC.', en: 'Medicor Hospital Products, Porto Alegre, Brazil: distribution of disposable health products since 1993 and its own RMDESC brand.' };
  const alt = pag => Object.fromEntries(LANGS.map(l => [l, url(v, l, pag)]));
  const pags = { index: v === 'a' ? homeA : homeB, empresa: L => empresaPag(v, L), produtos: L => produtosPag(v, L), downloads: L => downloadsPag(v, L), contato: L => contatoPag(v, L) };
  for (const L of LANGS) {
    const t = T[L];
    for (const [pag, fn] of Object.entries(pags)) {
      const tit = pag === 'index' ? `Medicor Produtos Hospitalares · ${t.tagline}` : `${t.nav[pag]} · Medicor Produtos Hospitalares`;
      out[t.slugs[pag]] = pagina({ v, L, pag, caminho: t.slugs[pag], alternos: alt(pag), tit, desc: pag === 'index' ? descs[L] : `${t.nav[pag]}. ${descs[L]}`, corpo: fn(L) });
    }
    for (const p of catalogo) {
      const caminho = `${t.slugs.produtos}${p.slug}/`;
      const alternos = Object.fromEntries(LANGS.map(l => [l, prodUrl(v, l, p)]));
      out[caminho] = pagina({ v, L, pag: 'produto', caminho, alternos, tit: `${nome(p, L)} · Medicor`, desc: primeiraFrase(p[L].desc[0] || descs[L]), corpo: produtoPag(v, L, p) });
    }
  }
  return out;
}
