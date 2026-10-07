// Gera assets/img/og/<lang>-<pagina>.jpg (1200x630, < 300 KB) a partir da foto do hero,
// com o mesmo gradiente do site e o título da página por cima.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const site = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const outDir = path.join(root, 'assets/img/og');
fs.mkdirSync(outDir, { recursive: true });

const W = 1200, H = 630;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Quebra o título em até 3 linhas de ~24 caracteres.
function lines(text, max = 24) {
  const out = [''];
  for (const w of text.split(/\s+/)) {
    if ((out.at(-1) + ' ' + w).trim().length > max && out.at(-1)) out.push(w);
    else out[out.length - 1] = (out.at(-1) + ' ' + w).trim();
  }
  return out.slice(0, 3);
}

function overlay(title) {
  const ls = lines(title);
  const tspans = ls.map((l, i) => `<tspan x="80" dy="${i ? 76 : 0}">${esc(l)}</tspan>`).join('');
  const y0 = H / 2 - ((ls.length - 1) * 76) / 2 + 20;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${site.theme.ink}" stop-opacity=".9"/><stop offset=".6" stop-color="${site.theme.ink}" stop-opacity=".55"/><stop offset="1" stop-color="${site.theme.ink}" stop-opacity="0"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="80" y="${y0 - 110}" width="72" height="8" fill="${site.theme.brand}"/>
  <text y="${y0}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="64" font-weight="800" fill="#fff">${tspans}</text>
  <text x="80" y="${H - 60}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="30" font-weight="600" fill="#fff" fill-opacity=".85">${esc(site.name)}</text>
</svg>`);
}

async function make(title, file) {
  const base = sharp(path.join(root, site.hero.image)).resize(W, H, { fit: 'cover', position: 'attention' });
  let q = 82, buf;
  do {
    buf = await base.clone().composite([{ input: overlay(title) }]).jpeg({ quality: q, mozjpeg: true }).toBuffer();
    q -= 8;
  } while (buf.length > 280 * 1024 && q > 40);
  fs.writeFileSync(path.join(outDir, file), buf);
  console.log(`og: ${file} ${(buf.length / 1024).toFixed(0)} KB`);
}

for (const lang of site.langs) {
  const t = JSON.parse(fs.readFileSync(path.join(root, `content/${lang}.json`), 'utf8'));
  for (const page of site.pages) {
    const p = t.pages[page];
    await make(page === 'index' ? (p.heroTitle || p.title) : (p.heading || p.title), `${lang}-${page}.jpg`);
  }
}
await make(site.name, 'default.jpg');
