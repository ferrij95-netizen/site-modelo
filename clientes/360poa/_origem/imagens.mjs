// Converte as imagens do site atual (img/) em webp leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/360poa/_origem/imagens.mjs
// As fotos do site atual vêm escurecidas (máscara aplicada na própria imagem); aqui elas são clareadas.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = f => path.join(aqui, 'img', f);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });
const salvar = (img, nome, w, q = 80) => img.resize({ width: w, withoutEnlargement: false, kernel: 'lanczos3' }).webp({ quality: q }).toFile(path.join(dest, nome + '.webp'));

// Fotos noturnas escurecidas no site atual: clareia sem estourar as luzes.
const clarear = (f, b) => sharp(ori(f)).linear(b, 0).modulate({ saturation: 1.08 });
await salvar(clarear('slider_4.jpg', 2.1), 'deck-noite-grande', 2000, 72);
await salvar(clarear('banner_25.jpg', 3.8), 'faixa-noite', 1500, 75);

// "Olhares": as oito fotos da galeria do site atual (480 px), ampliadas com cuidado.
const olhares = ['deck-luzes', 'vidro-por-do-sol', 'passarela', 'deck-salao', 'varanda-noite', 'salao-vidro', 'entrada', 'fachada-por-do-sol'];
for (const [i, nome] of olhares.entries()) {
  await salvar(sharp(ori(`olhares_${i + 1}.jpg`)).resize({ width: 960, kernel: 'lanczos3' }).sharpen({ sigma: 0.8 }), nome, 960, 78);
  await salvar(sharp(ori(`olhares_${i + 1}.jpg`)), nome + '-p', 480, 78);
}
// Quadros do slider atual: legumes e temperos sobre fundo de lousa (identidade do cardápio).
await salvar(sharp(ori('slider_1.jpg')), 'lousa-legumes-baixo', 1920, 72);
await salvar(sharp(ori('slider_2.jpg')), 'lousa-legumes', 1920, 72);
await salvar(sharp(ori('slider_3.jpg')), 'lousa-milho', 1920, 72);
// Foto do salão envidraçado com vista para o Gasômetro (recorte do mosaico "Conheça nosso espaço").
await salvar(sharp(ori('about_6.png')).extract({ left: 0, top: 186, width: 190, height: 174 }).flatten({ background: '#000' }), 'salao-gasometro', 380, 80);
await salvar(sharp(ori('about_6.png')).extract({ left: 0, top: 0, width: 190, height: 176 }).flatten({ background: '#000' }), 'fachada-noite-mini', 380, 80);

// Logo: redesenhado em vetor a partir do logo do rodapé (150 px), em branco e no azul-noite.
const svg = fs.readFileSync(ori('logo-tracado.svg'), 'utf8');
fs.writeFileSync(path.join(dest, '../logo-branco.svg'), svg);
fs.writeFileSync(path.join(dest, '../logo-escuro.svg'), svg.replace(/#ffffff/gi, '#14202e'));
await sharp(Buffer.from(svg.replace(/#ffffff/gi, '#14202e'))).resize({ width: 600 }).png().toFile(path.join(dest, '../logo-360.png'));
// Favicon: o logo branco num círculo azul-noite.
const fav = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><circle cx="128" cy="128" r="128" fill="#14202e"/></svg>`;
const logoPeq = await sharp(Buffer.from(svg)).resize({ width: 190 }).png().toBuffer();
await sharp(Buffer.from(fav)).composite([{ input: logoPeq, gravity: 'center' }]).png().toFile(path.join(dest, '../favicon.png'));
console.log('ok');
