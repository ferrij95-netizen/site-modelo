// Converte as imagens baixadas do site atual (Wix, static.wixstatic.com/media, pasta orig/) para webp em public/assets/img e grava dim.json.
// Uso: node clientes/mundomagico/_origem/imagens.mjs <pasta-orig>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const sharp = createRequire(import.meta.url)(path.join(aqui, '../../../node_modules/sharp'));
const O = process.argv[2];
const D = path.join(aqui, '../public/assets/img');
const fotos = { // nome: [início do arquivo no Wix, largura máxima]
  'fachada': ['0f4af7_73dd2e', 1800], 'fachada-placa': ['e207be_0be75f', 1600], 'parquinho-predios': ['e207be_8db1c3', 1600], 'parquinho': ['0f4af7_1b5cf5', 1200],
  'turma-banco': ['0f4af7_abc028', 1600], 'turma-parquinho': ['e207be_4b6aec', 600], 'turma-mesa': ['0f4af7_989f95', 984], 'turma-roda': ['0f4af7_48f1f8', 1400],
  'sala-fund': ['e207be_5f25aa', 1400], 'sala-infantil': ['e207be_7a72dc', 1400], 'informatica': ['e207be_c4dc9c', 1400],
  'patio': ['0f4af7_d65ed7', 1600], 'globo': ['e207be_8c2aef', 1400], 'salao': ['e207be_9c3595', 1400], 'equipe': ['e207be_f65902', 1600],
  'musica': ['d013e1_4f1597', 1200], 'cartaz-matricula': ['d013e1_168a16', 361],
  'r-musica': ['e207be_10a846', 172], 'r-psico': ['e207be_89e18f', 197], 'r-tecnologia': ['e207be_8e16f3', 185], 'r-edfisica': ['e207be_ce8899', 187],
  'n-roberta': ['0f4af7_147e20', 763], 'n-maes': ['0f4af7_b98b07', 800],
};
const arqs = fs.readdirSync(O);
fs.mkdirSync(D, { recursive: true });
const dim = {};
for (const [k, [ini, w]] of Object.entries(fotos)) {
  const f = arqs.find(a => a.startsWith(ini));
  const info = await sharp(path.join(O, f)).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(D, `${k}.webp`));
  dim[k] = [info.width, info.height];
}
// Logo: o selo do site atual (172 px, fundo transparente), ampliado com cuidado para 344 px e usado no máximo a 110 px de largura.
const selo = arqs.find(a => a.startsWith('e207be_37a1e9'));
await sharp(path.join(O, selo)).trim().resize({ width: 344, kernel: 'lanczos3' }).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(D, '../selo.webp'));
await sharp(path.join(O, selo)).trim().resize(96).webp({ quality: 90 }).toFile(path.join(D, '../favicon.webp'));
fs.writeFileSync(path.join(aqui, 'dim.json'), JSON.stringify(dim));
console.log(Object.keys(dim).length, 'fotos');
