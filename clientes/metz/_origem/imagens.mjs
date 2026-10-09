// Converte as imagens baixadas do site atual (img/) em webp leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/metz/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo original, largura máxima]
// Os "recorte-*" são as fotos tiradas de dentro das artes do site atual (as artes têm texto por cima).
const lista = [
  ['logo-claro', 'LOGO-REM.png', 440],
  ['logo-escuro', 'recorte-logo-escuro.png', 440],
  ['christian', 'recorte-christian.png', 900],
  ['retrato', 'recorte-retrato.png', 900],
  ['palestra', 'recorte-palestra.png', 900],
  ['mentoria', 'recorte-mentoria.png', 900],
  ['ebook', 'recorte-ebook.png', 700],
  ['jogo', 'recorte-jogo.png', 1400],
  ['flowmap', 'WhatsApp-Image-2026-03-27-at-19.42.20-3.jpeg', 1600],
  ['perfil-rem', 'PERFIL-scaled.png', 1400],
  ['leonardo', 'Leonardo-Linhares.jpeg', 200],
];

for (const [nome, arq, larg] of lista) {
  await sharp(path.join(ori, arq)).resize({ width: larg, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(dest, nome + '.webp'));
  console.log(nome);
}
