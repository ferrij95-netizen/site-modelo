// Converte as imagens copiadas do site atual (bertolinipumps.com.br) para webp em public/assets/img/.
import sharp from 'sharp';
import fs from 'node:fs';
const o = new URL('./img/', import.meta.url).pathname, d = new URL('../public/assets/img/', import.meta.url).pathname;
const w = (f, n, larg) => sharp(o + f).resize({ width: larg, withoutEnlargement: true }).webp({ quality: 80 }).toFile(d + n);
await w('hero.jpg', 'hero.webp', 1730);
await w('img_about.jpg', 'fabrica-italia.webp', 900);
await w('img_about2.jpg', 'sede-italia.webp', 900);
await w('aplicacoes.png', 'aplicacoes.webp', 1351);
for (const f of fs.readdirSync(o)) if (f.startsWith('post_')) await w(f, f.replace(/\.\w+$/, '.webp'), 900);
for (const f of fs.readdirSync(o + 'prod')) await sharp(o + 'prod/' + f).flatten({ background: '#ffffff' }).trim({ threshold: 12 }).extend({ top: 20, bottom: 20, left: 20, right: 20, background: '#ffffff' }).resize({ width: 520, height: 520, fit: 'contain', background: '#ffffff', withoutEnlargement: false }).flatten({ background: '#ffffff' }).webp({ quality: 82 }).toFile(d + 'p/' + f.replace(/\.\w+$/, '.webp'));
// logo: original (letras brancas, para fundo escuro) e versão com letras grafite para fundo claro
await sharp(o + 'logo.png').toFile(d + 'logo.png');
const { data, info } = await sharp(o + 'logo.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) { data[i] = 35; data[i + 1] = 36; data[i + 2] = 47; }
await sharp(data, { raw: info }).png().toFile(d + 'logo-escuro.png');
