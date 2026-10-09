// Converte as imagens baixadas do site atual (img/) em arquivos leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/altoalegre/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo original, largura máxima]
const lista = [
  // embalagens (as maiores que o site tem: 400 px de altura)
  ['p-cristal', '24fdc3686ae9974bbb60a784d217a6fa03eb1ff4.png', 600],
  ['p-refinado', '8e2c546b6f2baf131eb373402717a63519f55e54.png', 600],
  ['p-demerara', '80622648b09a11a17a661c587aba785cc43efe6d.png', 600],
  ['p-sache', '0d0c945c0bbbe88c3ac1f6af8ce212fbd43a5312.png', 600],
  ['p-cristal-2', 'produto1.png', 600],
  ['p-refinado-2', 'produto2.png', 600],
  ['p-demerara-2', 'produto3.png', 600],
  ['p-sache-2', 'produto5.png', 600],
  // fotos das páginas do site atual
  ['f-usina-campo', 'alcool.jpg', 1920],
  ['f-fabrica-pb', 'energia.jpg', 1920],
  ['f-usina', 'sobre-banner2.jpg', 1920],
  ['f-familia', 'sobre-banner1.jpg', 1920],
  ['f-plantio', 'su-banner1.jpg', 1920],
  ['f-esporte', 'su-banner2.jpg', 1920],
  ['f-escritorio', 'contato.jpg', 1920],
  ['f-cafe', 'banner-produto.jpg', 1920],
  ['f-embalagens', 'banner1un2.jpg', 1920],
  ['f-delicias', 'banner20253.jpg', 1920],
  ['f-oficina', 'altooficina.jpg', 1920],
  ['f-oficina-cel', 'altooficinamob.jpg', 700],
  ['logo-oficina', 'logo-oficina.png', 700],
  ['mapa', 'sobre-mapa.png', 900],
  // receitas
  ['r-bolo-cenoura', 'f24111767b907b3a99ba4dbfe7852efb05dfdb51.jpeg', 1000],
  ['r-docinho-abacaxi', 'd3afea84d1c276b15416c70deedc19056272a3ca.jpeg', 1000],
  ['r-geleia', 'ae0e2942ebef20a4b20319709e7c189fd663a6a8.jpeg', 1000],
  ['r-panetone', '9e99740ca10af83f6d1c37217a6e066cd708e1d5.jpeg', 1000],
  ['r-ovos-nevados', '779029454b438598b2fff1722f1a04014f9e165b.jpeg', 1000],
  ['r-bolo-gelado', 'af2881e9ab1ba5cfff6ae8bcea9e0f04aab7bdac.jpeg', 1000],
  ['r-torta-morango', 'c0a1e8289623b84707c6e59f6a085545f69caba7.jpeg', 1000],
  ['r-casadinho', '20566e07b032b9640767a3bb222a48f69e91642b.jpeg', 1000],
  ['r-bombons', 'e695890aa612b7b62fa39f61b732493ff9b2a7c8.jpeg', 1000],
  ['r-rosca', 'de0d7130958bd4b7ddd24f9705e230409e8cc33f.jpeg', 1000],
];

for (const [nome, arq, larg] of lista) {
  await sharp(path.join(ori, arq)).resize({ width: larg, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(dest, nome + '.webp'));
}
// Logos: PNG original do site (fundo escuro) e a versão colorida para fundo claro (logo-cor.png, cores trocadas a partir do branco).
fs.copyFileSync(path.join(ori, 'logo-branco.png'), path.join(dest, 'logo-branco.png'));
fs.copyFileSync(path.join(ori, 'logo-cor.png'), path.join(dest, 'logo-cor.png'));
fs.copyFileSync(path.join(ori, 'print-home.jpg'), path.join(dest, 'site-atual.jpg'));
console.log(`altoalegre: ${lista.length} imagens`);
