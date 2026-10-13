// Converte as imagens do site atual (img/, lista em imagens.txt: nome final, arquivo, largura máxima) em webp leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/frigoestrela/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

const lista = fs.readFileSync(path.join(aqui, 'imagens.txt'), 'utf8').trim().split('\n').map(l => l.split(' '));
for (const [nome, arq, larg] of lista) {
  const src = path.join(aqui, 'img', arq);
  const meta = await sharp(src).metadata();
  const alvo = Math.min(+larg, meta.width);
  await sharp(src).toColourspace('srgb').resize({ width: alvo }).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(dest, nome + '.webp'));
}
for (const f of ['logo-frigoestrela.svg', 'logo-frigoestrela-branco.svg']) fs.copyFileSync(path.join(aqui, 'img', f), path.join(dest, f));
console.log(`frigoestrela: ${lista.length} imagens`);
