// Reprova o build se alguma página em dist/ estiver sem SEO completo ou com imagem OG ausente/pesada.
import fs from 'node:fs';
import path from 'node:path';

import { siteDir, distDir } from './paths.mjs';

const root = siteDir(process.argv[2]);
const dist = distDir(process.argv[2]);
const site = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const domain = site.domain.replace(/\/$/, '');
const MAX_OG_BYTES = 300 * 1024;

const required = [
  [/<title>[^<]{10,}<\/title>/, '<title> (mín. 10 caracteres)'],
  [/<meta name="description" content="[^"]{50,}"/, 'meta description (mín. 50 caracteres)'],
  [/<link rel="canonical" href="https?:\/\//, 'canonical absoluto'],
  [/<link rel="alternate" hreflang="x-default"/, 'hreflang x-default'],
  [/<meta property="og:title" content="[^"]+"/, 'og:title'],
  [/<meta property="og:description" content="[^"]+"/, 'og:description'],
  [/<meta property="og:url" content="https?:\/\//, 'og:url absoluto'],
  [/<meta property="og:image" content="https?:\/\//, 'og:image absoluto'],
  [/<meta property="og:type"/, 'og:type'],
  [/<meta name="twitter:card" content="summary_large_image"/, 'twitter:card'],
];

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory() && e.name !== 'assets' && e.name !== '_clientes') walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(dist);

const errors = [];
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file);
  for (const [re, label] of required) if (!re.test(html)) errors.push(`${rel}: falta ${label}`);
  const img = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (img?.startsWith(domain)) {
    const local = path.join(dist, img.slice(domain.length));
    if (!fs.existsSync(local)) errors.push(`${rel}: og:image não existe (${img.slice(domain.length)}). Rode npm run og`);
    else if (fs.statSync(local).size > MAX_OG_BYTES) errors.push(`${rel}: og:image maior que 300 KB`);
  }
  if (/\{\{/.test(html)) errors.push(`${rel}: sobrou placeholder {{...}}`);
}

if (errors.length) {
  console.error(`check: ${errors.length} problema(s)\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log(`check: ${site.name}: ${pages.length} páginas OK (Open Graph, Twitter, canonical, hreflang, og:image)`);
