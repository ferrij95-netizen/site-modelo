// Recorta e converte as imagens do site atual (img/) em webp leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/vordex/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = f => path.join(aqui, 'img', f);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });
const S = n => `Copia-de-VORDEX-Apresentacao-2023-TMFL-${n}.png`;
const salvar = (img, nome, w) => img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(dest, nome + '.webp'));
const recorte = (f, [x1, y1, x2, y2]) => sharp(ori(f)).extract({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 });

// Fotos inteiras.
await salvar(sharp(ori('IMG_0218-scaled.jpg')), 'sede', 2200);
await salvar(sharp(ori('future-factory-plant-energy-industry-devotion-concept-creative-design-1.jpg')), 'integridade', 700);

// Fotos de obra recortadas de dentro das lâminas da apresentação (dentro da moldura arredondada).
const recortes = [
  ['planta-esteiras', S(10), [72, 206, 352, 592]], ['planta-escadas', S(10), [398, 206, 930, 592]],
  ['fab-silo-1', S(12), [74, 204, 327, 382]], ['fab-silo-2', S(12), [368, 204, 621, 382]],
  ['fab-tanque-1', S(12), [74, 420, 327, 599]], ['fab-tanque-2', S(12), [368, 420, 621, 599]],
  ['fab-cabine', S(12), [664, 204, 952, 599]],
  ['fab-estrutura', S(11), [758, 0, 1024, 470]], ['soldador', S(2), [600, 40, 1024, 768]],
];
for (const [nome, f, caixa] of recortes) await salvar(recorte(f, caixa), nome, 1100);
// Faixa com quatro fotos de montagem (1200x400).
const faixa = [[85, 336], [345, 596], [604, 855], [864, 1115]];
for (const [i, [a, b]] of faixa.entries()) await salvar(recorte('Design-sem-nome-9.png', [a + 12, 45, b - 12, 357]), `montagem-${i + 1}`, 600);
// Fotos redondas dos serviços (a moldura laranja fica de fora).
for (const [nome, f] of [['circ-fabricacao', 'Fabricacao.png'], ['circ-manutencao', 'manutencao.png'], ['circ-locacao', 'Locacao.png'], ['circ-terraplanagem', 'terraplanagem.png']])
  await salvar(recorte(f, [88, 88, 412, 412]), nome, 360);
// Lâminas da frota (fundo transparente, máquinas e barras com números).
for (const [nome, n] of [['frota-locacao-1', 14], ['frota-locacao-2', 17], ['frota-terra-1', '8-2'], ['frota-terra-2', '9-2']])
  await salvar(sharp(ori(S(n))).extract({ left: 0, top: n === 14 ? 300 : 40, width: 1024, height: n === 14 ? 468 : 700 }), nome, 1024);
// Ícones do site atual (círculos laranja e grafite).
for (let i = 1; i <= 8; i++) await salvar(sharp(ori(`Design-sem-nome-${i}.png`)), `icone-${i}`, 160);
for (const f of ['7-anos', 'equipamentos', 'estrutura']) await salvar(sharp(ori(f + '.png')), 'icone-' + f, 220);

// Logo: o PNG cinza do site (transparente) e uma versão clara para fundo escuro (cinza vira branco, o V fica).
const logo = sharp(ori('Logo-Cinza.png'));
await logo.clone().png().toFile(path.join(dest, '../logo-vordex.png'));
const { data, info } = await sharp(ori('Logo-Cinza.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let p = 0; p < data.length; p += 4) {
  const [r, g, b] = [data[p], data[p + 1], data[p + 2]];
  if (Math.abs(r - g) < 14 && Math.abs(g - b) < 14) { data[p] = data[p + 1] = data[p + 2] = 255; }
}
await sharp(data, { raw: info }).png().toFile(path.join(dest, '../logo-vordex-branco.png'));
// Favicon: o V do logo.
await sharp(ori('Logo-Cinza.png')).extract({ left: 0, top: 0, width: 274, height: 274 }).resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(dest, '../favicon.png'));
console.log('vordex: imagens prontas');
