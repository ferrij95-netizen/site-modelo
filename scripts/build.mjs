// Motor: gera dist/ a partir de design/ (visual do cliente), content/ (textos) e site.config.json.
// O motor garante SEO/Open Graph, idiomas e WhatsApp; o design é livre, desde que use {{seo}} e {{whatsapp}}.
// Cada página sai com o bloco SEO completo (Open Graph, Twitter, canonical, hreflang).
import fs from 'node:fs';
import path from 'node:path';

import { siteDir, distDir } from './paths.mjs';

// `node scripts/build.mjs` monta o site da raiz; `node scripts/build.mjs clientes/<cliente>` monta o site daquele cliente.
const root = siteDir(process.argv[2]);
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const site = JSON.parse(read('site.config.json'));
const domain = site.domain.replace(/\/$/, '');
const content = Object.fromEntries(site.langs.map(l => [l, JSON.parse(read(`content/${l}.json`))]));
const D = 'design';
const layout = read(`${D}/layout.html`);
for (const slot of ['{{seo}}', '{{whatsapp}}', '{{content}}']) {
  if (!layout.includes(slot)) throw new Error(`${D}/layout.html precisa ter ${slot}`);
}
// Todo arquivo em design/partials/ vira {{nome}} no layout e nas páginas.
const partials = Object.fromEntries(fs.readdirSync(path.join(root, D, 'partials'))
  .filter(f => f.endsWith('.html')).map(f => [f.slice(0, -5), read(`${D}/partials/${f}`)]));
if (!partials.whatsapp) throw new Error(`${D}/partials/whatsapp.html é obrigatório`);
const dist = distDir(process.argv[2]);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const get = (obj, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

// Mini-templates:
//   {{chave}}            valor escapado (chaves em `raw` entram como HTML)
//   {{{chave}}}          valor sem escapar (ex.: tagline com <br>)
//   {{#each lista}}...{{/each}}   repete o bloco; dentro: {{it.x}}, {{num}} (01, 02...), $i na chave = índice
//   {{#if chave}}...{{else}}...{{/if}}
function render(tpl, ctx, raw, where) {
  const lookup = key => {
    const k = ctx.i === undefined ? key : key.replace(/\$i\b/g, ctx.i);
    if (k in raw) return { raw: raw[k] };
    const v = get(ctx, k);
    if (v === undefined) throw new Error(`Chave "${k}" não encontrada em ${where}`);
    return { v };
  };
  return tpl
    .replace(/\{\{#each ([\w.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (_, key, body) => {
      const list = lookup(key).v;
      if (!Array.isArray(list)) throw new Error(`"${key}" não é uma lista em ${where}`);
      return list.map((it, i) => render(body, { ...ctx, it, i, num: String(i + 1).padStart(2, '0') }, raw, where)).join('');
    })
    .replace(/\{\{#if ([\w.$]+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g, (_, key, yes, no = '') => {
      const k = ctx.i === undefined ? key : key.replace(/\$i\b/g, ctx.i);
      return render(get(ctx, k) ? yes : no, ctx, raw, where);
    })
    .replace(/\{\{\{\s*([\w.$]+)\s*\}\}\}/g, (_, key) => { const r = lookup(key); return r.raw ?? String(r.v); })
    .replace(/\{\{\s*([\w.$]+)\s*\}\}/g, (_, key) => { const r = lookup(key); return r.raw ?? esc(r.v); });
}

const pagePath = (lang, page) => `/${lang}/${page === 'index' ? '' : page}`;
const ogImage = (lang, page) => {
  for (const f of [`og/${lang}-${page}.jpg`, `og/${page}.jpg`, 'og/default.jpg']) {
    if (fs.existsSync(path.join(root, 'assets/img', f))) return `${domain}/assets/img/${f}`;
  }
  return `${domain}/assets/img/og/default.jpg`; // check.mjs acusa se não existir
};

function seo(lang, page) {
  const t = content[lang], p = t.pages[page];
  const url = domain + pagePath(lang, page);
  const img = ogImage(lang, page);
  const alt = site.langs.map(l => `<link rel="alternate" hreflang="${l}" href="${domain}${pagePath(l, page)}">`);
  alt.push(`<link rel="alternate" hreflang="x-default" href="${domain}${pagePath(site.defaultLang, page)}">`);
  const ogAlt = site.langs.filter(l => l !== lang).map(l => `<meta property="og:locale:alternate" content="${content[l].locale}">`);
  return [
    '<!-- seo -->',
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}">`,
    `<link rel="canonical" href="${url}">`,
    ...alt,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(site.name)}">`,
    `<meta property="og:title" content="${esc(p.title)}">`,
    `<meta property="og:description" content="${esc(p.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${img}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(p.title)}">`,
    `<meta property="og:locale" content="${t.locale}">`,
    ...ogAlt,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(p.title)}">`,
    `<meta name="twitter:description" content="${esc(p.description)}">`,
    `<meta name="twitter:image" content="${img}">`,
    '<!-- /seo -->',
  ].join('\n');
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
fs.cpSync(path.join(root, D, 'assets'), path.join(dist, 'assets'), { recursive: true });
// public/ vai para a raiz do site como está (ex.: prévias das direções visuais).
if (fs.existsSync(path.join(root, 'public'))) fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
if (!process.argv[2]) for (const f of ['_headers']) if (fs.existsSync(path.join(root, f))) fs.copyFileSync(path.join(root, f), path.join(dist, f));

const urls = [];
for (const lang of site.langs) {
  const t = content[lang];
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.waMessage)}`;
  fs.mkdirSync(path.join(dist, lang), { recursive: true });
  for (const page of site.pages) {
    if (!t.pages[page]) throw new Error(`content/${lang}.json não tem a página "${page}"`);
    const ctx = { site, t, p: t.pages[page], lang, page, wa, year: new Date().getFullYear(), htmlLang: t.locale.replace('_', '-') };
    const navLinks = site.pages.map(pg =>
      `<a href="${pagePath(lang, pg)}"${pg === page ? ' aria-current="page"' : ''}>${esc(t.nav[pg])}</a>`).join('\n      ');
    const langLinks = site.langs.map(l =>
      `<a href="${pagePath(l, page)}" hreflang="${l}" lang="${l}" title="${esc(content[l].langName)}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('\n      ');
    const raw = { navLinks, langLinks };
    const where = `${lang}/${page}`;
    for (const p of Object.keys(partials)) raw[p] = render(partials[p], ctx, raw, `partial ${p} (${where})`);
    raw.content = render(read(`${D}/pages/${page}.html`), ctx, raw, `${D}/pages/${page}.html (${lang})`);
    raw.seo = seo(lang, page);
    const html = render(layout, ctx, raw, `layout (${where})`);
    fs.writeFileSync(path.join(dist, lang, `${page}.html`), html);
    urls.push(domain + pagePath(lang, page));
  }
}

// Raiz: vai para o idioma salvo ou do navegador, senão o padrão.
const langsJson = JSON.stringify(site.langs);
fs.writeFileSync(path.join(dist, 'index.html'), `<!doctype html>
<html lang="${site.defaultLang}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${seo(site.defaultLang, 'index').replace(`<link rel="canonical" href="${domain}/${site.defaultLang}/">`, `<link rel="canonical" href="${domain}/${site.defaultLang}/">\n<meta name="robots" content="noindex">`)}
<meta http-equiv="refresh" content="0; url=/${site.defaultLang}/">
<script>(function(){var L=${langsJson},s;try{s=localStorage.getItem('lang')}catch(e){}
var n=(navigator.language||'').slice(0,2);var l=L.indexOf(s)>-1?s:(L.indexOf(n)>-1?n:'${site.defaultLang}');location.replace('/'+l+'/')})()</script>
</head><body><a href="/${site.defaultLang}/">${esc(site.name)}</a></body></html>
`);

fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`);

console.log(`build: ${urls.length} páginas em ${path.relative(process.cwd(), dist) || 'dist'}/ (${site.langs.join(', ')})`);
