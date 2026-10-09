// Peças comuns às duas versões: documento com SEO completo nas três línguas, links, logo, ícones e seletor de idioma.
import { site, paginas, solucoes, LANGS, LANG, tr, ui } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Endereço de uma página: /a/, /a/en/quem-somos/, /b/es/solucoes/dragagem-de-precisao/
export const link = (v, l, slug) => `/${v}/${l === 'pt' ? '' : l + '/'}${slug === 'index' ? '' : slug + '/'}`;

export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const logo = (tipo = 'claro') => `<img class="logo" src="/assets/logo-toniolo-${tipo}.png" alt="Grupo Toniolo" width="298" height="126">`;

export const seta = '<svg class="seta" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
export const mais = '<svg class="mais" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const svg = (d, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</g></svg>`;
export const icTel = svg('<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>');
export const icMail = svg('<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>');
export const icMapa = svg('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>');
export const icWa = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';
export const icPlay = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>';
export const icCheck = svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>');
export const icDoc = svg('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>');
export const icUser = svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>');
export const icLinkedin = svg('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>');
export const icSelo = svg('<circle cx="12" cy="9" r="6"/><path d="m8.5 13.5-1.5 7.5 5-2.5 5 2.5-1.5-7.5"/><path d="m9.5 9 1.8 1.8L14.8 7.5"/>');
export const icTrofeu = svg('<path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9 18h6"/>');
export const icPatente = svg('<path d="M4 17h3l2-4h6l2 4h3"/><path d="M9 13V8l3-3 3 3v5"/><path d="M3 20h18"/>');
export const icGlobo = svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>');

// Ícones das soluções, na ordem de `solucoes`.
export const icSol = [
  '<path d="M3 17c3-2 5-2 8 0s5 2 8 0"/><path d="M5 13V9l4-3h5l2 4"/><path d="M14 6l5-2 2 4-4 2"/><rect x="4" y="13" width="10" height="2.5" rx="1"/>',
  '<path d="M2 19h20"/><path d="M4 19 9 7h6l5 12"/><path d="M8 13h8M12 7v12"/>',
  '<path d="M12 3c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C7 9.5 9 7 12 3Z"/><path d="M4 21h16"/><path d="M10 13.5a2 2 0 0 0 2 2"/>',
  '<path d="M3 15c2.5-1.5 4.5-1.5 7 0s4.5 1.5 7 0 3-1 4-1"/><path d="M6 15V8h7l3 3v4"/><path d="M16 11h4v2"/><path d="M3 19h18"/>',
  '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  '<path d="M4 20h16"/><path d="M6 20l2-5h8l2 5"/><path d="M8 15l1.5-4h5L16 15"/><path d="M10 11l1-3h2l1 3"/>',
  '<circle cx="6" cy="16" r="3"/><circle cx="18" cy="16" r="3"/><path d="M6 13h12M6 19h12"/><path d="M9 6h6l-3 4z"/>',
  '<path d="M3 17c2-1.2 4-1.2 6 0s4 1.2 6 0 4-1.2 6 0"/><path d="M12 14V7"/><path d="M12 9c-2-3-5-3-6-2 1 2.5 3.5 3 6 2Z"/><path d="M12 8c2-3 5-3 6-2-1 2.5-3.5 3-6 2Z"/>',
  '<path d="M3 20h18"/><path d="M5 20v-4h6v4"/><path d="M8 16 14 5l5 3-2 3"/><path d="M17 11l1 3-3 1"/>',
].map(d => svg(d, 'ic-sol'));

export const redesIcones = {
  Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></g><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4 6h3.8v1.7A4.2 4.2 0 0 1 17.6 9c4 0 4.4 2.6 4.4 6v6h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4z"/></svg>',
  YouTube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8ZM10 15V9l5.2 3Z"/></svg>',
};
export const redes = () => `<div class="redes">${site.redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${redesIcones[n]}</a>`).join('')}</div>`;

// Seletor de idioma, no mesmo lugar do site atual ("Idioma: Português").
export const idiomas = (v, l, slug) => `<details class="idioma"><summary><span class="idioma-rot">${tr(ui.idioma, l)}:</span> <b>${LANG[l].nome}</b><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></summary>
  <div class="idioma-lista">${LANGS.map(o => `<a href="${link(v, o, slug)}" hreflang="${LANG[o].html}" lang="${LANG[o].html}"${o === l ? ' aria-current="true"' : ''}><span>${LANG[o].curto}</span>${LANG[o].nome}</a>`).join('')}</div></details>`;

export const waLink = l => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(tr(ui.waMsg, l))}`;

export const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap',
};

// Título, descrição e caminho de cada página (as soluções usam o nome e o resumo).
export function meta(slug, l) {
  if (slug.startsWith('solucoes/')) {
    const s = solucoes.find(x => 'solucoes/' + x.id === slug);
    return [`${tr(s.nome, l)} · Grupo Toniolo`, tr(s.resumo, l)];
  }
  const p = paginas[slug];
  return [tr(p[1], l), tr(p[2], l)];
}

export function documento({ v, l, slug, corpo, tema }) {
  const [titulo, desc] = meta(slug, l);
  const url = site.dominio + link(v, l, slug);
  const og = `${site.dominio}/assets/og-${v}.jpg`;
  const alternos = LANGS.map(o => `<link rel="alternate" hreflang="${LANG[o].html}" href="${site.dominio + link(v, o, slug)}">`).join('\n');
  return `<!doctype html>
<html lang="${LANG[l].html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
${alternos}
<link rel="alternate" hreflang="x-default" href="${site.dominio + link(v, 'pt', slug)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Grupo Toniolo">
<meta property="og:locale" content="${LANG[l].og}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="${tema}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES[v]}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} p-${slug.split('/')[0]}">
${corpo}
<a class="wa-flutua" href="${waLink(l)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa}</a>
<script src="/assets/toniolo.js" defer></script>
</body>
</html>
`;
}

// Slugs de todas as páginas de cada versão.
export const slugs = ['index', 'quem-somos', 'solucoes', ...solucoes.map(s => 'solucoes/' + s.id), 'carreira', 'blog', 'transparencia', 'contato'];
