// Converte as fotos (img/) em webp leves para public/assets/img/ e prepara logo e favicon.
// Rodar só quando chegar foto nova: node clientes/engenho-am/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = f => path.join(aqui, 'img', f);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo original, largura máxima]. Fotos do Unsplash (ver imagens.md) até a empresa mandar fotos próprias.
const lista = [
  ['arroz-branco', 'arroz-tabua.jpg', 1400], ['arroz-parboilizado', 'arroz-medidor.jpg', 1400], ['arroz-casca', 'arroz-integral.jpg', 1400],
  ['casca', 'arroz-integral.jpg', 1800], ['grao-mao', 'grao-mao.jpg', 1800], ['lavoura', 'lavoura-dia.jpg', 1600],
  ['silos', 'tanques.jpg', 1600], ['silos-fila', 'silos-fila.jpg', 2000],
];
for (const [nome, f, w] of lista) {
  await sharp(ori(f)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(dest, nome + '.webp'));
}

// Logo do site atual em 2x (o original tem só 372 px). Favicon: o cedro com as faixas.
await sharp(ori('logo.png')).extract({ left: 0, top: 0, width: 359, height: 92 }).resize({ width: 718, kernel: 'lanczos3' }).png().toFile(path.join(dest, '../logo-engenho-am.png'));
await sharp(ori('print-site-atual.jpg')).resize({ width: 1200 }).jpeg({ quality: 78 }).toFile(path.join(dest, '../site-atual.jpg'));
await sharp(ori('logo.png')).extract({ left: 0, top: 0, width: 96, height: 92 }).resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toFile(path.join(dest, '../favicon.png'));
console.log(`engenho-am: ${lista.length} imagens, logo e favicon em public/assets`);
