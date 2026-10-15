// Fotos reais do site atual (reinasementes.com/pkg/img) convertidas para webp em public/assets/img.
// As 8 fotos da galeria do site atual só existem em 400x300: são ampliadas 2x com nitidez leve.
// Rodar quando chegar foto nova: node clientes/reina/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = f => path.join(aqui, 'img', f);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });
const nomes = {
  'item-1.jpg': 'portaria-chao', 'item-2.jpg': 'aerea-lavouras', 'item-3.jpg': 'fachada-carretas', 'item-4.jpg': 'fachada-bandeiras',
  'item-5.jpg': 'reflexo', 'item-6.jpg': 'aerea-unidade', 'item-7.jpg': 'portico-ceu', 'item-8.jpg': 'equipe',
};
await sharp(ori('banner.jpg')).webp({ quality: 80 }).toFile(path.join(dest, 'fachada.webp'));
await sharp(ori('city.jpg')).webp({ quality: 80 }).toFile(path.join(dest, 'acesso.webp'));
for (const [f, n] of Object.entries(nomes)) {
  await sharp(ori(f)).resize({ width: 800, kernel: 'lanczos3' }).sharpen({ sigma: 0.8 }).modulate({ saturation: 1.05 }).webp({ quality: 84 }).toFile(path.join(dest, n + '.webp'));
}
console.log('reina: imagens', fs.readdirSync(dest).length);
