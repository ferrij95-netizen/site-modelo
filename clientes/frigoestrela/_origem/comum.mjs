// Peças comuns às duas versões: documento com SEO, topo, rodapé, ícones e ajudantes de texto.
import { site, menu, ui, marcas } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Texto na língua da página (aceita string pura, que vale para as duas).
export const tr = (x, lang) => (x && typeof x === 'object' && 'pt' in x ? x[lang] : x);
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const num = i => String(i + 1).padStart(2, '0');

// Endereço de uma página: /a/sobre-nos/ ou /a/en/sobre-nos/.
export const href = (v, lang, slug) => `/${v}/${lang === 'en' ? 'en/' : ''}${slug === 'index' ? '' : slug + '/'}`;

const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1zM17 19c0 1.5-2 2-5 2"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M15 6l-6 6 6 6"/>',
  dir: '<path d="M9 6l6 6-6 6"/>',
  baixo: '<path d="m6 9 6 6 6-6"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  floco: '<path d="M12 2v20M4.9 7l14.2 10M4.9 17 19.1 7M9 4l3 2 3-2M9 20l3-2 3 2"/>',
  termo: '<path d="M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 10v7"/>',
  caixa: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  folha: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19 13 11"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
  couro: '<path d="M7 3 4 6l1 5-2 5 4 5h10l4-5-2-5 1-5-3-3-3 2h-4z"/>',
  pet: '<circle cx="7" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="8" r="2"/><path d="M8 18c0-3 2-6 4-6s4 3 4 6c0 2-2 2-4 1-2 1-4 1-4-1z"/>',
  tripa: '<path d="M5 6c3-2 6 2 3 4s0 6 3 4 6 2 3 4"/><circle cx="5" cy="6" r="1.5"/><circle cx="14" cy="18" r="1.5"/>',
  cruz: '<rect x="3" y="3" width="18" height="18" rx="9"/><path d="M12 7v10M7 12h10"/>',
  estrela: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  fabrica: '<path d="M3 20V10l5 3V10l5 3V6h3v14zM3 20h18M17 20V4h3v16"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  predio: '<path d="M5 21V4h10v17M15 9h4v12M3 21h18M8 8h4M8 12h4M8 16h4"/>',
  pessoa: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  lab: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9"/>',
  vaca: '<path d="M4 9c0-2 2-3 3-3h10c1 0 3 1 3 3l-2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6z"/><path d="M4 9 2 7M20 9l2-2M9 14h.01M15 14h.01"/>',
  mao: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V11M16 11V8a1.5 1.5 0 0 1 3 0v6a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-3l-2.5-4a1.5 1.5 0 0 1 2.5-1.6L7 14"/>',
};
export const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const soc = {
  linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"/>',
  facebook: '<path d="M14 8V6.5c0-.8.2-1.3 1.4-1.3H17V2.2C16.6 2.1 15.6 2 14.5 2 12 2 10.5 3.5 10.5 6.2V8H8v3.2h2.5V22H14V11.2h2.7l.4-3.2z"/>',
  instagram: '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>',
};
export const redes = () => ['linkedin', 'facebook', 'instagram'].map(r => `<a href="${site[r]}" target="_blank" rel="noopener" aria-label="Frigoestrela no ${r[0].toUpperCase() + r.slice(1)}"><svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${soc[r]}</svg></a>`).join('');

export const VERSOES = {
  a: { nome: 'Especial', fontes: 'family=Saira+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap', cor: '#1b1b1b' },
  b: { nome: 'Estrela', fontes: 'family=Saira+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap', cor: '#c8102e' },
};

export function doc({ v, lang, slug, titulo, desc, corpo, og = 'og' }) {
  const url = site.dominio + href(v, lang, slug);
  const t = slug === 'index' ? `Frigoestrela · ${titulo}` : `${titulo} · Frigoestrela`;
  const alt = l => `<link rel="alternate" hreflang="${l === 'pt' ? 'pt-BR' : 'en'}" href="${site.dominio + href(v, l, slug)}">`;
  const ogImg = `${site.dominio}/assets/${og}-${v}.jpg`;
  return `<!doctype html>
<html lang="${lang === 'en' ? 'en' : 'pt-BR'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${alt('pt')}
${alt('en')}
<link rel="alternate" hreflang="x-default" href="${site.dominio + href(v, 'pt', slug)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Frigoestrela">
<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'pt_BR'}">
<meta property="og:locale:alternate" content="${lang === 'en' ? 'pt_BR' : 'en_US'}">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImg}">
<meta name="theme-color" content="${VERSOES[v].cor}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${VERSOES[v].fontes}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${v} p-${slug.replace(/\//g, '-')}">
<a class="pular" href="#conteudo">${lang === 'en' ? 'Skip to content' : 'Pular para o conteúdo'}</a>
${topo({ v, lang, slug })}
<main id="conteudo">
${corpo}
</main>
${rodape({ v, lang })}
</body>
</html>
`;
}

function idiomas(v, lang, slug) {
  return `<span class="idiomas" aria-label="${lang === 'en' ? 'Language' : 'Idioma'}">${['pt', 'en'].map(l =>
    `<a href="${href(v, l, slug)}" hreflang="${l === 'pt' ? 'pt-BR' : 'en'}" lang="${l === 'pt' ? 'pt-BR' : 'en'}"${l === lang ? ' aria-current="true"' : ''}><img src="/assets/img/bandeira-${l}.svg" alt="" width="20" height="14">${l.toUpperCase()}</a>`).join('')}</span>`;
}

export function topo({ v, lang, slug }) {
  const L = s => href(v, lang, s);
  const ativo = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
  const itens = menu.map(m => {
    const sub = m.sub ? m.sub.some(([s]) => s === slug || slug.startsWith(s + '/')) : false;
    if (!m.sub) return `<li><a href="${L(m.s)}"${ativo(m.s)}>${tr(m.t, lang)}</a></li>`;
    return `<li class="tem-sub"><a href="${L(m.s)}"${sub || ativo(m.s) ? ' aria-current="page"' : ''}>${tr(m.t, lang)}</a><button class="abre-sub" aria-expanded="false" aria-label="${tr(m.t, lang)}">${ico('baixo')}</button>
      <ul class="sub">${m.sub.map(([s, t]) => `<li><a href="${L(s)}"${slug === s ? ' aria-current="page"' : ''}>${tr(t, lang)}</a></li>`).join('')}</ul></li>`;
  }).join('');
  const marca = `<a class="marca" href="${L('index')}" aria-label="Frigoestrela, ${tr(ui.inicio, lang).toLowerCase()}"><img src="/assets/img/logo-frigoestrela${v === 'a' ? '-branco' : ''}.svg" alt="Frigoestrela" width="200" height="23"></a>`;
  const faixa = v === 'b'
    ? `<div class="faixa"><div class="in"><a href="tel:${site.foneHref}">${ico('fone')}<span>${tr(ui.central, lang)} <b>${site.fone}</b></span></a><a href="tel:${site.sacHref}" class="so-pc">SAC <b>${site.sac}</b></a><span class="dir">${redes()}${idiomas(v, lang, slug)}</span></div></div>`
    : '';
  return `${faixa}<header class="topo">
  <div class="in">
    ${marca}
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>${tr(ui.menu, lang)}</em></button>
    <nav id="nav" aria-label="${lang === 'en' ? 'Main menu' : 'Menu principal'}"><ul class="menu">${itens}</ul>${v === 'a' ? idiomas(v, lang, slug) : ''}</nav>
  </div>
</header>`;
}

export function rodape({ v, lang }) {
  const L = s => href(v, lang, s);
  const inst = [['sobre-nos', ui.inicio], ['unidades'], ['controle-de-qualidade'], ['areas-de-atuacao'], ['exportacao'], ['boutique-de-carne'], ['esg'], ['noticias'], ['contato'], ['trabalhe-conosco']];
  const nomes = { 'sobre-nos': ['Sobre Nós', 'About us'], unidades: ['Unidades', 'Units'], 'controle-de-qualidade': ['Controle de qualidade', 'Quality control'], 'areas-de-atuacao': ['Áreas de atuação', 'Business areas'],
    exportacao: ['Exportação', 'Export'], 'boutique-de-carne': ['Boutique de Carne', 'Meat Boutique'], esg: ['ESG', 'ESG'], noticias: ['Notícias', 'News'], contato: ['Fale Conosco', 'Contact us'], 'trabalhe-conosco': ['Trabalhe Conosco', 'Careers'] };
  const nm = s => nomes[s][lang === 'en' ? 1 : 0];
  return `<footer class="rodape">
  <div class="r-central"><div class="in">
    <span class="r-tit">${tr(ui.central, lang)}</span>
    <a href="tel:${site.foneHref}">${ico('fone')}<span>Estrela <b>${site.fone}</b></span></a>
    <a href="tel:${site.sacHref}">${ico('headset')}<span>SAC <b>${site.sac}</b></span></a>
    <a href="${site.ouvidoria}" target="_blank" rel="noopener">${ico('escudo')}<span>${tr(ui.ouvidoria, lang)} <b>Contato Seguro</b></span></a>
  </div></div>
  <div class="in r-cols">
    <div class="r-marca"><img src="/assets/img/logo-frigoestrela-branco.svg" alt="Frigoestrela" width="220" height="25" loading="lazy">
      <p>${lang === 'en' ? 'Beef, pork, sausages and by-products since 1979, for Brazil and the world.' : 'Carnes bovinas e suínas, embutidos e subprodutos desde 1979, para o Brasil e o mundo.'}</p>
      <div class="r-redes"><span>${tr(ui.siga, lang)}</span>${redes()}</div></div>
    <div><span class="r-tit">${tr(ui.institucional, lang)}</span><ul>${inst.map(([s]) => `<li><a href="${L(s)}">${nm(s)}</a></li>`).join('')}</ul></div>
    <div><span class="r-tit">${tr(ui.linhas, lang)}</span><ul>${marcas.map(m => `<li><a href="${L(m.s)}">${m.nome}</a></li>`).join('')}</ul>
      <span class="r-tit r-tit2">${tr(ui.ouvidoria, lang)}</span><p class="r-ouv">${tr(ui.ouvidoriaTxt, lang)} <a href="${site.ouvidoria}" target="_blank" rel="noopener">contatoseguro.com.br ${ico('externo')}</a></p></div>
  </div>
  <div class="r-base"><div class="in"><span>© 2026 Frigoestrela · CNPJ ${site.cnpj} · ${tr(ui.direitos, lang)}</span><a href="${site.atual}politica-de-privacidade/" target="_blank" rel="noopener">${tr(ui.privacidade, lang)}</a></div></div>
</footer>`;
}
