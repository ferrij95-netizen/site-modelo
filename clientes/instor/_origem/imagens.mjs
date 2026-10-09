// Converte as imagens baixadas do site atual (img/) em webp leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/instor/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });
const achar = ini => fs.readdirSync(ori).find(f => f.startsWith(ini));

// [nome final, começo do arquivo original, largura máxima]
const lista = [
  ['tupa-ex', '4f32b3f0', 1600],
  ['tupa-ex-render', '12-Tupa-EX', 900],
  ['macuxi', 'C0001', 1920],
  ['guaraci', 'guaraci', 900],
  ['guaraci-tanque', 'robo-2', 900],
  ['tupa', 'tupa', 900],
  ['tupa-braco', 'WhatsApp-Image', 900],
  ['anhanga', 'anhanga', 900],
  ['thor', 'thor', 900],
  ['jaguar', 'jaguar', 900],
  ['jaguar-galpao', '8-Finep-Jaguar', 900],
  ['jaguar-estoque', 'image1', 900],
  ['coletor', 'coletor', 900],
  ['jaci', 'jaci', 900],
  ['jaci-quarto', 'saude-jaci', 900],
  ['jaci-centro', '1-Jaci', 900],
  ['angoera', 'Scanner-Angoera', 900],
  ['caldeiras', 'Captura-de-tela-de-2024-09-25', 900],
  ['chassi', 'robo-1', 900],
  ['painel-embrapa', 'painel-de-robotica', 900],
  ['linha-robos', '4-Parceria-INF', 900],
  ['fundadores', '9-INX', 900],
  ['petrobras-tanques', '10-Petrobras', 900],
  ['miguel', '1-Miguel', 300],
  ['marta', '2-Marta', 300],
  ['diogenes', 'diogenes', 300],
  ['luciano', '3-Luciano', 300],
];
for (const [nome, ini, w] of lista) {
  const f = achar(ini);
  if (!f) { console.log('faltou', ini); continue; }
  await sharp(path.join(ori, f)).flatten({ background: '#ffffff' }).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(dest, nome + '.webp'));
}
console.log(`instor: ${lista.length} imagens em public/assets/img`);
