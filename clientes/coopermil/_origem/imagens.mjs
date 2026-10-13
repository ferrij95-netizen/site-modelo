// Converte as imagens do site atual (img/, todas da coopermil.com) em webp leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/coopermil/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// Largura máxima por tipo: banners e capas ficam no tamanho original; fotos até 1600 px.
const larg = n => (/^(banner|neg)-/.test(n) ? 960 : /^(cat|rev|maquinas)-/.test(n) ? 600 : /^(somos|bndes|logo|favicon)/.test(n) ? 400 : 1600);
for (const f of fs.readdirSync(ori)) {
  const nome = f.replace(/\.[a-z]+$/, '');
  await sharp(path.join(ori, f), { animated: false }).toColourspace('srgb').resize({ width: larg(nome), withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(dest, nome + '.webp'));
}
console.log('coopermil: imagens convertidas', fs.readdirSync(dest).length);
