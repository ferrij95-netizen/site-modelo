// Monta as páginas das versões A ("Grupo Reval": abertura dividida Serras | Laser como a entrada do site atual,
// metal escovado e marinho do catálogo) e B ("Ficha técnica": branca, escolha da serra pelo material, números do laser),
// em pt, en e es. Páginas internas com o mesmo conteúdo; muda a home, o topo e o estilo (base.css + a.css ou b.css).
import { empresa as E, slugs, dobraLimites, T } from './conteudo.mjs';
import { ROTULOS, SEGMENTOS, PRODUTOS, TIPOS } from './catalogo.mjs';

export const nomesVersao = { a: 'Grupo Reval', b: 'Ficha técnica' };
const LANGS = ['pt', 'en', 'es'];
const pre = L => (L === 'pt' ? '' : `${L}/`);
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const par = s => esc(s).split(/\n{2,}/).map(p => `<p>${p}</p>`).join('');
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\(hm\)/g, 'hm').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70).replace(/-[^-]*$/, m => (m.length < 3 ? '' : m));
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const whats = (L, area = 'serras', msg) => `https://wa.me/${area === 'laser' ? E.whatsLaserHref : E.whatsSerrasHref}?text=${encodeURIComponent(msg || (area === 'laser' ? T[L].whatsLaserMsg : T[L].whatsSerrasMsg))}`;
const segPor = id => SEGMENTOS.find(s => s.id === id);
const prodsSeg = id => PRODUTOS.filter(p => p.seg === id);

const I = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  pdf: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path d="M9 14h6M9 17h4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  whats: '<path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"/><path d="M8.5 8.5c.3 2.6 2.4 5 5 5.6l1.3-1.3 2 1c-.3 1.2-1.4 1.9-2.6 1.7-3.6-.6-6.4-3.5-6.9-7.1-.2-1.2.6-2.3 1.8-2.5l1 2z"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M8 11h6M11 8v6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  topo: '<path d="M6 15l6-6 6 6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const redeIc = {
  Facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" stroke="none"/>',
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
};
const redes = () => E.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nome}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${redeIc[r.nome]}</svg></a>`).join('');
// Bandeiras do site atual (Brasil, EUA, Espanha), em SVG.
const bandeira = {
  pt: '<svg viewBox="0 0 28 20"><rect width="28" height="20" fill="#229e45"/><path d="M14 3l10 7-10 7-10-7z" fill="#f8e509"/><circle cx="14" cy="10" r="4" fill="#2b49a3"/></svg>',
  en: '<svg viewBox="0 0 28 20"><rect width="28" height="20" fill="#b22234"/><path d="M0 3h28M0 6h28M0 9h28M0 12h28M0 15h28M0 18h28" stroke="#fff" stroke-width="1.5"/><rect width="12" height="10.5" fill="#3c3b6e"/></svg>',
  es: '<svg viewBox="0 0 28 20"><rect width="28" height="20" fill="#c60b1e"/><rect y="5" width="28" height="10" fill="#ffc400"/></svg>',
};

// ---------- endereços ----------
const raiz = (v, L) => `/${v}/${pre(L)}`;
const link = (v, L, chave) => `${raiz(v, L)}${slugs[L][chave]}/`;
const linkSeg = (v, L, s) => `${link(v, L, 'serras')}${s.slug[L]}/`;
const slugProd = (p, L) => `${p.id}-${slugify(p.nome[L])}`;
const linkProd = (v, L, p) => `${linkSeg(v, L, segPor(p.seg))}${slugProd(p, L)}/`;

// ---------- moldura ----------
function head(v, L, pagina, titulo, descricao, alternos) {
  const t = T[L];
  const fontes = v === 'a'
    ? 'family=Barlow:ital,wght@0,500;0,600;0,700;1,600&family=Inter:wght@400;500;600'
    : 'family=Barlow+Semi+Condensed:wght@500;600;700&family=Barlow:wght@500;600;700&family=Inter:wght@400;500;600';
  const hl = LANGS.map(l => `<link rel="alternate" hreflang="${T[l].lang}" href="${E.url.replace(/\/$/, '')}${alternos[l]}">`).join('');
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${E.url.replace(/\/$/, '')}${alternos[L]}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta name="robots" content="noindex">
${hl}
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${v} pg-${pagina}">`;
}

function topo(v, L, ativo, alternos, area) {
  const t = T[L]; const m = t.menu;
  const item = (chave, nome, h) => `<li${ativo === chave ? ' class="ativo"' : ''}><a href="${h}"${ativo === chave ? ' aria-current="page"' : ''}>${esc(nome)}</a></li>`;
  const idiomas = LANGS.map(l => `<a href="${alternos[l]}" hreflang="${T[l].lang}" lang="${T[l].lang}" title="${T[l].bandeira}"${l === L ? ' aria-current="true"' : ''}>${bandeira[l]}<span>${l.toUpperCase()}</span></a>`).join('');
  const logo = area === 'laser' ? 'laser' : 'serras';
  const claro = v === 'a' && ativo === 'home';
  return `<a class="pular" href="#conteudo">${esc(t.pular)}</a>
<header class="topo${claro ? ' topo-sobre' : ''}">
  <div class="topo-in">
    <a class="marca" href="${raiz(v, L)}" aria-label="${esc(area === 'laser' ? t.laserNome : t.serrasNome)}"><img class="logo-cor" src="/assets/logo-${logo}.png" alt="${esc(area === 'laser' ? t.laserNome : t.serrasNome)}" width="200" height="66">${claro ? `<img class="logo-br" src="/assets/logo-serras-branco.png" alt="" width="200" height="66">` : ''}</a>
    <nav class="nav" aria-label="Menu">
      <ul>
        ${item('home', m.home, raiz(v, L))}
        ${item('empresa', m.empresa, link(v, L, 'empresa'))}
        ${item('serras', m.serras, link(v, L, 'serras'))}
        ${item('laser', m.laser, link(v, L, 'laser'))}
        ${item('contato', m.contato, link(v, L, 'contato'))}
      </ul>
      <div class="nav-extra">
        <span class="idiomas">${idiomas}</span>
        <span class="redes">${redes()}</span>
      </div>
    </nav>
    <a class="btn btn-orc" href="${whats(L, area)}" target="_blank" rel="noopener">${ic('whats')}<span>${esc(t.orcamento)}</span></a>
    <button class="burger" type="button" aria-label="Menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v, L, area) {
  const t = T[L]; const m = t.menu;
  return `</main>
<footer class="rodape">
  <div class="rod-in">
    <div class="rod-marca">
      <img src="/assets/logo-serras-branco.png" alt="Reval Serras" width="190" height="63">
      <img src="/assets/logo-laser-branco.png" alt="Reval Laser" width="190" height="68">
      <p>${esc(t.rodape)}</p>
      <div class="redes">${redes()}</div>
    </div>
    <div>
      <h2>${esc(m.contato)}</h2>
      <ul class="rod-lista">
        <li>${ic('mail')}<a href="mailto:${E.emailSerras}">${E.emailSerras}</a></li>
        <li>${ic('mail')}<a href="mailto:${E.emailLaser}">${E.emailLaser}</a></li>
        <li>${ic('tel')}<a href="tel:${E.foneHref}">${E.fone}</a></li>
        <li>${ic('whats')}<a href="${whats(L, 'serras')}" target="_blank" rel="noopener">${E.whatsSerras}</a> <small>${esc(t.serrasNome)}</small></li>
        <li>${ic('whats')}<a href="${whats(L, 'laser')}" target="_blank" rel="noopener">${E.whatsLaser}</a> <small>${esc(t.laserNome)}</small></li>
        <li>${ic('pin')}<a href="${E.mapa}" target="_blank" rel="noopener">${esc(E.rua)} - ${esc(E.bairro)}, ${esc(E.cidade)}, CEP ${E.cep}</a></li>
      </ul>
    </div>
    <div>
      <h2>${esc(m.serras)}</h2>
      <ul>${SEGMENTOS.map(s => `<li><a href="${linkSeg(v, L, s)}">${esc(s.nome[L])}</a></li>`).join('')}</ul>
      <h2 class="rod-h2b">${esc(m.laser)}</h2>
      <ul><li><a href="${link(v, L, 'laser')}#corte">${esc(t.corteTitulo)}</a></li><li><a href="${link(v, L, 'laser')}#dobra">${esc(t.dobraTitulo)}</a></li></ul>
    </div>
  </div>
  <div class="rod-base"><p>© ${new Date().getFullYear()} ${esc(E.razao)} ${esc(t.direitos)}</p><a href="#conteudo" class="rod-topo">${ic('topo')}${esc(t.voltar)}</a></div>
</footer>
<a class="whats-flut" href="${whats(L, area)}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic('whats')}</a>
</body>
</html>`;
}

const pagina = (v, L, chave, titulo, desc, alternos, corpo, area = 'serras') =>
  head(v, L, chave, titulo, desc, alternos) + topo(v, L, chave, alternos, area) + corpo + rodape(v, L, area);
const alt = (v, f) => Object.fromEntries(LANGS.map(l => [l, f(l)]));

// ---------- blocos comuns ----------
const titulo = (sobre, h, sub = '') => `<header class="sec-cab">${sobre ? `<p class="sobre">${esc(sobre)}</p>` : ''}<h2>${esc(h)}</h2>${sub ? `<p class="sub">${esc(sub)}</p>` : ''}</header>`;

function migalhas(v, L, itens) {
  return `<nav class="migalhas" aria-label="breadcrumb"><ol><li><a href="${raiz(v, L)}">${esc(T[L].menu.home)}</a></li>${itens.map(([n, h]) => `<li>${h ? `<a href="${h}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`}</li>`).join('')}</ol></nav>`;
}

function bannerPagina(v, L, foto, sobre, h, sub, mig) {
  return `<section class="pg-cab">
  <div class="pg-cab-foto">${img(foto, '', ' fetchpriority="high" loading="eager"')}</div>
  <div class="pg-cab-in">${mig}<p class="sobre">${esc(sobre)}</p><h1>${esc(h)}</h1>${sub ? `<p class="sub">${esc(sub)}</p>` : ''}</div>
</section>`;
}

function blocoIso(L) {
  const t = T[L];
  return `<section class="iso"><div class="iso-in">
  <div class="iso-selo">${img('iso', 'ISO 9001')}</div>
  <div class="iso-txt"><h2>${esc(t.isoTitulo)}</h2><p>${esc(t.isoTexto)}</p><p class="iso-escopo">${ic('check')}${esc(t.isoEscopo)}</p></div>
  <a class="iso-cert" href="/assets/img/certificado.webp" data-zoom>${img('certificado', 'DNV ISO 9001:2015')}<span>${ic('zoom')}</span></a>
</div></section>`;
}

function chamadaContato(v, L, area = 'ambos') {
  const t = T[L];
  return `<section class="chamada"><div class="chamada-in">
  <h2>${esc(t.contatoTitulo)}</h2><p>${esc(t.contatoSub)}</p>
  <div class="chamada-acoes">
    ${area !== 'laser' ? `<a class="btn btn-claro" href="${whats(L, 'serras')}" target="_blank" rel="noopener">${ic('whats')}${esc(t.vendasSerras)}</a>` : ''}
    ${area !== 'serras' ? `<a class="btn btn-claro" href="${whats(L, 'laser')}" target="_blank" rel="noopener">${ic('whats')}${esc(t.vendasLaser)}</a>` : ''}
    <a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a>
  </div>
</div></section>`;
}

// Linhas de serra: nome + máquina + dentes (linhas, não cards).
function listaSerras(v, L, lista, comFiltro = false) {
  const t = T[L];
  const resumo = p => {
    const m = p.spec.find(([k]) => k === 'maquina' || k === 'maquinas');
    const a = p.spec.find(([k]) => k === 'aplicacao' || k === 'material');
    return (m ? m[1][L][0] : a ? a[1][L][0] : '');
  };
  return `<ul class="serras-lista"${comFiltro ? ' data-lista' : ''}>${lista.map(p => `<li data-tipo="${p.tipo}" data-seg="${p.seg}" data-busca="${esc((p.nome[L] + ' ' + p.spec.map(([, x]) => x[L].join(' ')).join(' ')).toLowerCase())}">
  <a href="${linkProd(v, L, p)}">
    <span class="sl-foto"><img src="/assets/img/p/${p.id}.webp" alt="" loading="lazy" decoding="async" width="120" height="120"></span>
    <span class="sl-txt"><strong>${esc(p.nome[L])}</strong><small>${esc(resumo(p))}</small></span>
    <span class="sl-tipo">${esc(TIPOS[p.tipo][L])}</span>
    <span class="sl-ir">${ic('seta')}</span>
  </a></li>`).join('')}</ul>${comFiltro ? `<p class="lista-vazia" hidden>${esc(t.filtroNenhum)}</p>` : ''}`;
}

// ---------- HOME A: entrada dividida Serras | Laser (como a abertura do site atual) ----------
function homeA(L) {
  const t = T[L]; const v = 'a';
  const segs = SEGMENTOS.map((s, i) => `<article class="seg-a${i % 2 ? ' inv' : ''}" data-rev>
    <a class="seg-a-foto" href="${linkSeg(v, L, s)}">${img(s.foto, s.nome[L])}<span class="etiqueta">${esc(s.nome[L])}</span></a>
    <div class="seg-a-txt"><p class="sobre">${esc(t.serrasCount(prodsSeg(s.id).length))}</p><h3>${esc(s.nome[L])}</h3><p>${esc(s.desc[L])}</p><p class="seg-mat">${esc(s.materiais[L])}</p><a class="link-seta" href="${linkSeg(v, L, s)}">${esc(t.verLinha)}${ic('seta')}</a></div>
  </article>`).join('');
  return `<section class="divisao" aria-label="Reval Serras | Reval Laser">
  <a class="lado lado-serras" href="${link(v, L, 'serras')}">
    <video class="lado-midia" src="/assets/img/afiacao.mp4" poster="/assets/img/afiacao-serra.webp" autoplay muted loop playsinline aria-hidden="true"></video>
    <span class="lado-in"><img src="/assets/logo-serras-branco.png" alt="${esc(t.serrasNome)}" width="340" height="113"><span class="lado-linha">${esc(t.serrasLinha)}</span><span class="btn btn-claro">${esc(t.verSerras)}${ic('seta')}</span></span>
  </a>
  <a class="lado lado-laser" href="${link(v, L, 'laser')}">
    <img class="lado-midia" src="/assets/img/laser-trumpf.webp" alt="" fetchpriority="high">
    <span class="lado-in"><img src="/assets/logo-laser-branco.png" alt="${esc(t.laserNome)}" width="340" height="122"><span class="lado-linha">${esc(t.laserLinha)}</span><span class="btn btn-claro">${esc(t.verLaser)}${ic('seta')}</span></span>
  </a>
  <p class="divisao-bv"><span>${L === 'en' ? 'Welcome to' : L === 'es' ? 'Bienvenido al' : 'Bem-vindo ao'}</span> Grupo Reval</p>
</section>
<section class="metal">
  <div class="metal-in">
    <p class="metal-linha">${esc(t.grupoLinha)}</p>
    <ul class="numeros" data-rev-filhos data-rev-passo="120">${t.numeros.map(([n, d]) => `<li><strong${/^\d+$/.test(n) && n.length < 4 ? ' data-conta' : ''}>${esc(n)}</strong><span>${esc(d)}</span></li>`).join('')}</ul>
  </div>
</section>
<section class="quem">
  <div class="quem-in">
    <figure class="quem-foto" data-rev="esq">${img('aerea', 'Reval, Caxias do Sul')}</figure>
    <div class="quem-txt" data-rev><p class="sobre">${L === 'en' ? 'Who we are' : L === 'es' ? 'Quiénes somos' : 'Quem somos'}</p><h2>${esc(t.quemTitulo)}</h2>${par(t.quemTexto)}<a class="link-seta" href="${link(v, L, 'empresa')}">${L === 'en' ? 'Know our story' : L === 'es' ? 'Conozca nuestra historia' : 'Conheça nossa história'}${ic('seta')}</a></div>
  </div>
  <div class="quem-in quem-2">
    <div class="quem-txt" data-rev><h2>${esc(t.compromissoTitulo)}</h2>${par(t.compromissoTexto)}</div>
    <figure class="quem-foto quem-foto-b" data-rev="dir">${img('serras-mesa', t.serrasNome)}</figure>
  </div>
</section>
<section class="segs">
  ${titulo(t.serrasNome, t.segTitulo, t.segSub)}
  ${segs}
  <p class="segs-cat"><a class="btn btn-linha-escuro" href="${E.catalogoSerras}" target="_blank" rel="noopener">${ic('pdf')}${esc(t.catalogo)}</a></p>
</section>
<section class="laser-faixa">
  <div class="laser-faixa-in">
    <div class="lf-txt" data-rev><img src="/assets/logo-laser-branco.png" alt="${esc(t.laserNome)}" width="260" height="93"><h2>${esc(t.laserTitulo)}</h2><p>${esc(t.laserIntro)}</p><a class="btn btn-claro" href="${link(v, L, 'laser')}">${esc(t.verLaser)}${ic('seta')}</a></div>
    <div class="lf-fotos" data-rev-filhos data-rev-passo="140">
      <figure>${img('laser-chapa', t.corteTitulo)}<figcaption>${esc(t.corteTitulo)}<span>${esc(t.corteDados[1][0])} · ${esc(t.corteDados[2][0])}</span></figcaption></figure>
      <figure>${img('dobra', t.dobraTitulo)}<figcaption>${esc(t.dobraTitulo)}<span>${esc(t.dobraDados[1][0])} · ${esc(t.dobraDados[2][0])}</span></figcaption></figure>
    </div>
  </div>
</section>
${blocoIso(L)}
${chamadaContato(v, L)}`;
}

// ---------- HOME B: ficha técnica, escolha pelo material ----------
function homeB(L) {
  const t = T[L]; const v = 'b';
  const abas = SEGMENTOS.map((s, i) => `<button type="button" role="tab" id="aba-${s.id}" aria-controls="painel-${s.id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${img(s.foto, '')}<span>${esc(s.nome[L])}</span><small>${esc(t.serrasCount(prodsSeg(s.id).length))}</small></button>`).join('');
  const paineis = SEGMENTOS.map((s, i) => `<div class="painel" role="tabpanel" id="painel-${s.id}" aria-labelledby="aba-${s.id}"${i ? ' hidden' : ''}>
    <div class="painel-cab"><p>${esc(s.desc[L])} <span>${esc(s.materiais[L])}.</span></p><a class="link-seta" href="${linkSeg(v, L, s)}">${esc(t.verLinha)}${ic('seta')}</a></div>
    ${listaSerras(v, L, prodsSeg(s.id).slice(0, 6))}
  </div>`).join('');
  const maxEsp = 10;
  const barras = dobraLimites.map(d => {
    const [a, b] = d.esp.split('–').map(x => parseFloat(x.trim().replace(',', '.')));
    const fim = b ?? a; const ini = b ? a : 0;
    return `<li><span class="bb-mat">${esc(d.mat[L])}</span><span class="bb-trilho"><span class="bb-barra" style="--i:${(ini / maxEsp * 100).toFixed(1)}%;--f:${(fim / maxEsp * 100).toFixed(1)}%"></span></span><span class="bb-val">${esc(d.esp)} mm</span><span class="bb-comp">× ${d.comp} mm</span></li>`;
  }).join('');
  const passos = [
    [t.diferenciais[0][0], t.diferenciais[0][1], 'laser-chapa'],
    [t.corteTitulo, t.corteDados.slice(0, 3).map(x => x.join(' ')).join(' · '), 'laser-trumpf'],
    [t.dobraTitulo, t.dobraDados.slice(0, 3).map(x => x.join(' ')).join(' · '), 'dobra-2'],
    [t.diferenciais[2][0], t.diferenciais[2][1], 'fabrica-telhado'],
    [t.diferenciais[1][0], t.diferenciais[1][1], 'aerea-2'],
  ];
  return `<section class="b-hero">
  <div class="b-hero-in">
    <div class="b-hero-txt">
      <p class="sobre">Grupo Reval · Caxias do Sul · ${esc(t.desde)} 1986</p>
      <h1>${L === 'en' ? 'Saw blades and laser cutting with industrial precision' : L === 'es' ? 'Sierras y corte láser con precisión industrial' : 'Serras e corte a laser com precisão industrial'}</h1>
      <p class="sub">${esc(t.grupoLinha)}</p>
      <div class="b-hero-acoes"><a class="btn" href="#material">${esc(t.verSerras)}${ic('seta')}</a><a class="btn btn-linha-escuro" href="${link(v, L, 'laser')}">${esc(t.verLaser)}</a></div>
    </div>
    <div class="b-hero-disco" aria-hidden="true"><img class="gira" src="/assets/img/p/86.webp" alt="" fetchpriority="high"><span class="b-hero-rotulo">${esc(PRODUTOS.find(p => p.id === 86).nome[L])}</span></div>
  </div>
  <ul class="b-numeros">${t.numeros.map(([n, d]) => `<li><strong${/^\d+$/.test(n) && n.length < 4 ? ' data-conta' : ''}>${esc(n)}</strong><span>${esc(d)}</span></li>`).join('')}</ul>
</section>
<section class="b-material" id="material">
  ${titulo(L === 'en' ? 'Reval Serras' : 'Reval Serras', L === 'en' ? 'What do you cut?' : L === 'es' ? '¿Qué material corta?' : 'O que você corta?', t.segSub)}
  <div class="abas" role="tablist" data-abas>${abas}</div>
  ${paineis}
  <p class="b-todas"><a class="btn" href="${link(v, L, 'serras')}">${esc(t.menu.todos)} (${PRODUTOS.length})${ic('seta')}</a><a class="btn btn-linha-escuro" href="${E.catalogoSerras}" target="_blank" rel="noopener">${ic('pdf')}${esc(t.catalogo)}</a></p>
</section>
<section class="b-fabrica">
  <div class="b-fab-video"><video src="/assets/img/afiacao.mp4" poster="/assets/img/afiacao-linha.webp" autoplay muted loop playsinline aria-hidden="true"></video></div>
  <div class="b-fab-txt" data-rev><p class="sobre">${esc(t.historiaTitulo)}</p><h2>${esc(t.quemTitulo)}</h2>${par(t.historia)}<a class="link-seta" href="${link(v, L, 'empresa')}">${esc(t.menu.empresa)}${ic('seta')}</a></div>
</section>
<section class="b-laser">
  ${titulo(t.laserNome, t.laserTitulo, t.laserIntro)}
  <div class="b-laser-grade">
    <div class="b-laser-col">
      <h3>${esc(t.corteTitulo)}</h3>
      <dl class="b-dados">${t.corteDados.map(([n, d]) => `<div><dt>${esc(n)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
    </div>
    <div class="b-laser-col">
      <h3>${esc(t.dobraTitulo)}</h3>
      <p class="bb-leg">${esc(t.dobraTabela[1])}, 0 – 10 mm</p>
      <ul class="bb">${barras}</ul>
    </div>
  </div>
  <div class="b-passos" data-etapas>
    <span class="ap-trilho"></span>
    ${passos.map(([h, p, f], i) => `<article class="ap-etapa"><span class="b-passo-n">${String(i + 1).padStart(2, '0')}</span>${img(f, '')}<h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}
  </div>
  <p class="b-todas"><a class="btn" href="${link(v, L, 'laser')}">${esc(t.verLaser)}${ic('seta')}</a></p>
</section>
${blocoIso(L)}
${chamadaContato(v, L)}`;
}

// ---------- páginas internas ----------
function empresaPg(v, L) {
  const t = T[L];
  return `${bannerPagina(v, L, 'fachada', 'Grupo Reval', t.menu.empresa, `${t.desde} 1986 · ${E.cidade}`, migalhas(v, L, [[t.menu.empresa]]))}
<section class="texto-foto">
  <div class="tf-txt" data-rev><h2>${esc(t.empresaTitulo)}</h2><p>${esc(t.empresaTexto)}</p><h2>${esc(t.historiaTitulo)}</h2>${par(t.historia)}</div>
  <figure class="tf-foto" data-rev="dir">${img('aerea-2', 'Reval, Caxias do Sul')}<figcaption>${esc(E.rua)}, ${esc(E.bairro)} · ${esc(E.cidade)}</figcaption></figure>
</section>
<section class="mvv">
  <ol class="mvv-lista">${t.mvv.map(([n, h, p], i) => `<li data-rev style="--ap-d:${i * 120}ms"><span class="mvv-n">${esc(n)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
</section>
<section class="fotos-fab" aria-label="Fábrica">
  <figure class="ff-1">${img('afiacao-operador', '')}</figure>
  <figure class="ff-2">${img('letreiro', 'Reval')}</figure>
  <figure class="ff-3">${img('afiacao-robo', '')}</figure>
  <figure class="ff-4">${img('fachada-2', '')}</figure>
</section>
<section class="politicas">
  <div class="pol-in">
    <div data-rev><h2>${esc(t.politicaQualTitulo)}</h2><ul class="lista-check">${t.politicaQual.map(x => `<li>${ic('check')}${esc(x)}</li>`).join('')}</ul></div>
    <div data-rev><h2>${esc(t.politicaComTitulo)}</h2><p>${esc(t.politicaCom)}</p>
      <h2 class="pol-h2b">${esc(t.mercadosTitulo)}</h2><ul class="mercados">${t.mercados.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
  </div>
</section>
${blocoIso(L)}
${chamadaContato(v, L)}`;
}

function serrasPg(v, L) {
  const t = T[L];
  const filtros = `<div class="filtro" data-filtro>
    <label class="filtro-busca"><span class="vh">${esc(t.filtroBusca)}</span>${ic('busca')}<input type="search" placeholder="${esc(t.filtroBusca)}" autocomplete="off"></label>
    <div class="filtro-chips" role="group"><button type="button" data-seg="" aria-pressed="true">${esc(t.filtroTodos)}</button>${SEGMENTOS.map(s => `<button type="button" data-seg="${s.id}" aria-pressed="false">${esc(s.nome[L])}</button>`).join('')}</div>
  </div>`;
  const segsVisual = SEGMENTOS.map(s => `<a class="seg-mini" href="${linkSeg(v, L, s)}">${img(s.foto, s.nome[L])}<span class="etiqueta">${esc(s.nome[L])}</span><small>${esc(t.serrasCount(prodsSeg(s.id).length))}</small></a>`).join('');
  return `${bannerPagina(v, L, 'serras-mesa', t.serrasNome, t.segTitulo, t.serrasLinha, migalhas(v, L, [[t.menu.serras]]))}
<section class="segs-mini">${segsVisual}</section>
<section class="catalogo">
  ${filtros}
  ${listaSerras(v, L, PRODUTOS, true)}
  <p class="segs-cat"><a class="btn btn-linha-escuro" href="${E.catalogoSerras}" target="_blank" rel="noopener">${ic('pdf')}${esc(t.catalogo)}</a></p>
</section>
${chamadaContato(v, L, 'serras')}`;
}

function segPg(v, L, s) {
  const t = T[L];
  const outros = SEGMENTOS.filter(x => x.id !== s.id).map(x => `<a href="${linkSeg(v, L, x)}">${esc(x.nome[L])}${ic('seta')}</a>`).join('');
  return `${bannerPagina(v, L, s.foto, t.serrasNome, s.nome[L], s.desc[L], migalhas(v, L, [[t.menu.serras, link(v, L, 'serras')], [s.nome[L]]]))}
<section class="seg-cab"><p>${esc(s.materiais[L])}.</p><span>${esc(t.serrasCount(prodsSeg(s.id).length))}</span></section>
<section class="catalogo">${listaSerras(v, L, prodsSeg(s.id))}
  <nav class="seg-outros" aria-label="${esc(t.segTitulo)}">${outros}</nav>
</section>
${chamadaContato(v, L, 'serras')}`;
}

function fichaPg(v, L, p) {
  const t = T[L]; const s = segPor(p.seg);
  const specs = p.spec.map(([k, x]) => `<div class="spec"><dt>${esc(ROTULOS[k][L])}</dt><dd>${x[L].length > 1 ? `<ul>${x[L].map(y => `<li>${esc(y)}</li>`).join('')}</ul>` : esc(x[L][0])}</dd></div>`).join('');
  const tabs = Array.from({ length: p.tabs }, (_, i) => `<a class="tabela" href="/assets/img/t/${p.id}-${i + 1}.webp" data-zoom><img src="/assets/img/t/${p.id}-${i + 1}.webp" alt="${esc(t.fichaTabelas)} ${i + 1}" loading="lazy" decoding="async"><span>${ic('zoom')}</span></a>`).join('');
  const outros = prodsSeg(p.seg).filter(x => x.id !== p.id).slice(0, 4);
  return `<section class="ficha">
  ${migalhas(v, L, [[t.menu.serras, link(v, L, 'serras')], [s.nome[L], linkSeg(v, L, s)], [p.nome[L]]])}
  <div class="ficha-in">
    <figure class="ficha-foto"><img class="${v === 'b' ? 'gira-hover' : ''}" src="/assets/img/p/${p.id}.webp" alt="${esc(p.nome[L])}" width="600" height="600" fetchpriority="high"></figure>
    <div class="ficha-txt">
      <p class="sobre"><a href="${linkSeg(v, L, s)}">${esc(s.nome[L])}</a> · ${esc(TIPOS[p.tipo][L])}</p>
      <h1>${esc(p.nome[L])}</h1>
      <dl class="specs">${specs}</dl>
      ${p.nota ? `<p class="ficha-nota">${esc(p.nota[L])}</p>` : ''}
      <div class="ficha-pedir">
        <h2>${esc(t.fichaPedir)}</h2><p>${esc(t.fichaPedirSub)}</p>
        <div class="chamada-acoes"><a class="btn" href="${whats(L, 'serras', t.fichaMsg(p.nome[L]))}" target="_blank" rel="noopener">${ic('whats')}${esc(t.whats)}</a><a class="btn btn-linha-escuro" href="mailto:${E.emailSerras}?subject=${encodeURIComponent(p.nome[L])}">${ic('mail')}${E.emailSerras}</a></div>
      </div>
    </div>
  </div>
</section>
<section class="tabelas">
  ${titulo('', t.fichaTabelas, t.fichaTabelasSub)}
  <div class="tabelas-grade">${tabs}</div>
</section>
${outros.length ? `<section class="catalogo outras">${titulo('', t.outrasLinha)}${listaSerras(v, L, outros)}<p class="segs-cat"><a class="link-seta" href="${linkSeg(v, L, s)}">${esc(t.verLinha)}: ${esc(s.nome[L])}${ic('seta')}</a></p></section>` : ''}`;
}

function laserPg(v, L) {
  const t = T[L];
  return `${bannerPagina(v, L, 'laser-trumpf', t.laserNome, t.laserTitulo, t.laserIntro, migalhas(v, L, [[t.menu.laser]]))}
<section class="servico" id="corte">
  <figure class="serv-foto" data-rev="esq">${img('laser-chapa', t.corteTitulo)}</figure>
  <div class="serv-txt" data-rev><p class="sobre">${esc(t.laserNome)}</p><h2>${esc(t.corteTitulo)}</h2>${par(t.corteTexto)}</div>
  <dl class="serv-dados">${t.corteDados.map(([n, d]) => `<div><dt>${esc(n)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
</section>
<section class="servico inv" id="dobra">
  <figure class="serv-foto" data-rev="dir">${img('dobra-2', t.dobraTitulo)}</figure>
  <div class="serv-txt" data-rev><p class="sobre">${esc(t.laserNome)}</p><h2>${esc(t.dobraTitulo)}</h2><p>${esc(t.dobraTexto)}</p>
    <table class="tab-dobra"><thead><tr>${t.dobraTabela.map(x => `<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${dobraLimites.map(d => `<tr><th scope="row">${esc(d.mat[L])}</th><td>${esc(d.esp)}</td><td>${d.comp}</td></tr>`).join('')}</tbody></table>
  </div>
  <dl class="serv-dados">${t.dobraDados.map(([n, d]) => `<div><dt>${esc(n)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
</section>
<section class="difs">
  ${titulo(t.laserNome, t.difTitulo)}
  <div class="difs-grade">
    <figure class="difs-foto">${img('dobra', '')}</figure>
    <ol class="difs-lista">${t.diferenciais.map(([h, p], i) => `<li data-rev style="--ap-d:${i * 100}ms"><span>${String(i + 1).padStart(2, '0')}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
  </div>
  <p class="segs-cat"><a class="btn btn-linha-escuro" href="${E.catalogoLaser}" target="_blank" rel="noopener">${ic('pdf')}${esc(t.catalogoLaser)}</a></p>
</section>
${blocoIso(L)}
${chamadaContato(v, L, 'laser')}`;
}

function contatoPg(v, L) {
  const t = T[L]; const f = t.form;
  return `${bannerPagina(v, L, 'fachada-pb', 'Grupo Reval', t.contatoTitulo, t.contatoSub, migalhas(v, L, [[t.menu.contato]]))}
<section class="contato">
  <div class="cont-areas">
    <div class="cont-area"><img src="/assets/logo-serras.png" alt="${esc(t.serrasNome)}" width="180" height="60"><h2>${esc(t.vendasSerras)}</h2>
      <p><a href="mailto:${E.emailSerras}">${ic('mail')}${E.emailSerras}</a></p>
      <p><a href="${whats(L, 'serras')}" target="_blank" rel="noopener">${ic('whats')}${E.whatsSerras}</a></p></div>
    <div class="cont-area"><img src="/assets/logo-laser.png" alt="${esc(t.laserNome)}" width="180" height="65"><h2>${esc(t.vendasLaser)}</h2>
      ${E.contatosLaser.map(([m, n]) => `<p><a href="mailto:${m}">${ic('mail')}${m}</a> <small>${esc(n)}</small></p>`).join('')}
      <p><a href="${whats(L, 'laser')}" target="_blank" rel="noopener">${ic('whats')}${E.whatsLaser}</a></p></div>
    <div class="cont-area cont-geral"><h2>${esc(t.telefone)}</h2><p><a href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a></p>
      <h2>${esc(t.endereco)}</h2><p>${esc(E.rua)}<br>${esc(E.bairro)}, ${esc(E.cidade)}<br>CEP ${E.cep}</p><p><a class="link-seta" href="${E.mapa}" target="_blank" rel="noopener">${esc(t.comoChegar)}${ic('seta')}</a></p></div>
  </div>
  <form class="form" data-form data-para-serras="${E.emailSerras}" data-para-laser="${E.emailLaser}">
    <h2>${L === 'en' ? 'Send us your message' : L === 'es' ? 'Envíe su mensaje' : 'Envie sua mensagem'}</h2>
    <div class="form-grade">
      <label>${esc(f.nome)}<input name="nome" required autocomplete="name"></label>
      <label>${esc(f.empresa)}<input name="empresa" autocomplete="organization"></label>
      <label>${esc(f.email)}<input name="email" type="email" required autocomplete="email"></label>
      <label>${esc(f.fone)}<input name="fone" type="tel" autocomplete="tel"></label>
      <label class="larga">${esc(f.area)}<select name="area">${f.areas.map((a, i) => `<option value="${['serras', 'laser', 'outros'][i]}">${esc(a)}</option>`).join('')}</select></label>
      <label class="larga">${esc(f.msg)}<textarea name="msg" rows="5" required></textarea></label>
    </div>
    <button class="btn" type="submit">${ic('mail')}${esc(f.enviar)}</button>
    <p class="form-aviso">${esc(f.aviso)}</p>
  </form>
</section>
<section class="mapa"><iframe title="${esc(t.comoChegar)}" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

// ---------- montagem ----------
export function gerarVersao(v) {
  const out = {};
  for (const L of LANGS) {
    const t = T[L]; const p = pre(L);
    const nomeSite = `${t.serrasNome} e ${t.laserNome}`;
    out[`${p}`] = pagina(v, L, 'home', `Grupo Reval · ${t.serrasNome} | ${t.laserNome}`, t.grupoLinha, alt(v, l => raiz(v, l)), v === 'a' ? homeA(L) : homeB(L));
    out[`${p}${slugs[L].empresa}`] = pagina(v, L, 'empresa', `${t.menu.empresa} · Grupo Reval`, t.empresaTexto, alt(v, l => link(v, l, 'empresa')), empresaPg(v, L));
    out[`${p}${slugs[L].serras}`] = pagina(v, L, 'serras', `${t.segTitulo} · ${t.serrasNome}`, t.serrasLinha, alt(v, l => link(v, l, 'serras')), serrasPg(v, L));
    for (const s of SEGMENTOS) {
      out[`${p}${slugs[L].serras}/${s.slug[L]}`] = pagina(v, L, 'serras', `${s.nome[L]} · ${t.serrasNome}`, s.desc[L], alt(v, l => linkSeg(v, l, s)), segPg(v, L, s));
      for (const pr of prodsSeg(s.id)) {
        out[`${p}${slugs[L].serras}/${s.slug[L]}/${slugProd(pr, L)}`] = pagina(v, L, 'serras', `${pr.nome[L]} · ${t.serrasNome}`, `${pr.nome[L]}. ${pr.spec.map(([, x]) => x[L][0]).join(' ')}`.slice(0, 300), alt(v, l => linkProd(v, l, pr)), fichaPg(v, L, pr));
      }
    }
    out[`${p}${slugs[L].laser}`] = pagina(v, L, 'laser', `${t.laserTitulo} · ${t.laserNome}`, t.laserIntro, alt(v, l => link(v, l, 'laser')), laserPg(v, L), 'laser');
    out[`${p}${slugs[L].contato}`] = pagina(v, L, 'contato', `${t.contatoTitulo} · ${nomeSite}`, t.contatoSub, alt(v, l => link(v, l, 'contato')), contatoPg(v, L));
  }
  return out;
}
