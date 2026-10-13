// Converte as imagens baixadas do site atual (img/) em arquivos leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/matacura/_origem/imagens.mjs
// Também grava cores.json com a cor dominante de cada embalagem (usada no palco do produto).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo original, altura máxima, tirar o selo "Nova Embalagem" do pé da foto]
const embalagens = [
  ['p-shampoo-sarnicida', 'linha-classicos-shampoo-sarnicida-e-antipulgas-200ml-6ac53bd3ae8cf.png', 900, true],
  ['p-shampoo-sarnicida-ant', 'shampoo-sarnicida-e-antipulgas-6446b428c2dd8.png', 900],
  ['p-condicionador-sarnicida', 'linha-classicos-condicionador-sarnicida-200ml-6ac539849f3dc.png', 900, true],
  ['p-condicionador-sarnicida-ant', 'condicionador-sarnicida-6446b437c454f.png', 900],
  ['p-antipulgas-gatos', 'antipulgas-para-gatos-6446b4037e9b5.png', 900],
  ['p-shampoo-antisseptico', 'shampoo-antisseptico-6446b47199004.png', 900],
  ['p-aerossol-sarnicida', 'linha-classicos-aerossol-sarnicida-100ml-6ac539a3ae0ec.png', 900, true],
  ['p-aerossol-sarnicida-ant', 'aerosol-sarnicida-6446b445a5a0a.png', 900],
  ['p-sabonete-sarnicida', 'sabonete-sarnicida-e-antipulgas-6446b4146b295.png', 700],
  ['p-sabonete-antisseptico', 'sabonete-antisseptico-6446b48adef34.png', 700],
  ['p-horse', 'shampoo-horse-6446b49dba19d.png', 900],
  ['p-talco-caes-gatos', 'linha-pet-moments-talco-banho-seco-6ac53f2249d96.png', 900, true],
  ['p-shampoo-neutro', 'linha-classicos-shampoo-neutro-200ml-6ac5411138b2d.png', 900, true],
  ['p-shampoo-neutro-ant', 'shampoo-neutro-6446b3d2b5fc9.png', 900],
  ['p-talco-hipoalergenico', 'linha-pet-moments-talco-hipoalergenico-6ac53ecb1d704.png', 900, true],
  ['p-hipoalergenico', 'linha-classicos-shampoo-e-condicionador-hipoalergenico-200ml-6ac5415fb1096.png', 900, true],
  ['p-hipoalergenico-ant', 'hipoalergenico-2-6446b385a149a.png', 900],
  ['p-spray-hipoalergenico', 'linha-pet-moments-spray-banho-seco-hipoalergenico-6ac53f610bad6.png', 900, true],
  ['p-talco-gatos', 'linha-pet-moments-talco-banho-seco-limpeza-suave-6ac53f36c9d19.png', 900, true],
  ['p-hidratante', 'linha-classicos-shampoo-e-condicionador-hidratante-200ml-6ac5405562a30.png', 900, true],
  ['p-hidratante-ant', 'hidratante-6446b39405fdd.png', 900],
  ['p-spray-gatos', 'linha-pet-moments-spray-banho-seco-desodorizante-para-gatos-6ac53f78741f1.png', 900, true],
  ['p-talco-profunda', 'linha-pet-moments-talco-banho-seco-limpeza-profunda-6ac53f491b13d.png', 900, true],
  ['p-caofiel-shampoo', 'shampoo-antipulgas-57dfe8bb30ff7.png', 701],
  ['p-caofiel-sabonete', 'sabonete-sarnicida-57dff39941da1.png', 418],
  ['p-saralogo', 'pomada-saralogo-6446b4b0047bd.png', 800],
];

// Fotos da linha do tempo (página Histórico do site atual).
const fotos = [
  ['h-1945', 'untitled-1-57d43b07c3847.jpg'], ['h-1969', 'untitled-2-57d43bafa00ec.jpg'], ['h-1989', 'untitled-3-57d43c6ba5f7b.jpg'],
  ['h-1990', 'untitled-4-57d43ccc88318.jpg'], ['h-1997', 'fiscalizacao-97-583c87eebddce.jpg'], ['h-1998', 'matcaura-98-583c867f9c01e.jpg'],
  ['h-1999', 'untitled-6-57d43d9a7ab86.jpg'], ['h-2012', 'anunciocaoset2013-583c894c9199a-5ce821f1345f6.jpg'],
  ['h-2013', 'anunciopetcenter2013-out-cf-583c852473728.jpg'], ['h-2014', 'dscn3330-583c7fc4536ad.JPG'],
  ['h-2015', 'medvep-2015-583c76699d2a1.jpg'], ['h-2016', 'untitled-7-57d43dd785aaf.jpg'],
];

// Corta o selo "Nova Embalagem": de baixo para cima, pula o selo e a faixa transparente acima dele.
async function semSelo(arq) {
  const { data, info } = await sharp(arq).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const cheia = y => { for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 20) return true; return false; };
  let y = info.height - 1;
  while (y > 0 && !cheia(y)) y--; // margem do pé
  while (y > 0 && cheia(y)) y--; // selo
  const fimSelo = y;
  while (y > 0 && !cheia(y)) y--; // vão entre a embalagem e o selo
  if (fimSelo - y < 4 || y < info.height * 0.6) return sharp(arq);
  return sharp(arq).extract({ left: 0, top: 0, width: info.width, height: y + 1 });
}

// Cor dominante da embalagem: média dos pixels saturados (ignora branco, preto e cinza).
async function cor(buf) {
  const { data } = await sharp(buf).resize(60).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const baldes = new Map();
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    if (a < 200 || mx - mn < 60 || mx < 70) continue;
    const k = [r >> 5, g >> 5, b >> 5].join();
    const v = baldes.get(k) || [0, 0, 0, 0]; v[0] += r; v[1] += g; v[2] += b; v[3]++; baldes.set(k, v);
  }
  const [r, g, b, n] = [...baldes.values()].sort((x, y) => y[3] - x[3])[0] || [253, 208, 17, 1];
  return '#' + [r, g, b].map(c => Math.round(c / n).toString(16).padStart(2, '0')).join('');
}

const cores = {};
for (const [nome, arq, alt, selo] of embalagens) {
  const base = selo ? await semSelo(path.join(ori, arq)) : sharp(path.join(ori, arq));
  const buf = await base.png().toBuffer();
  const limpo = await sharp(buf).trim({ threshold: 1 }).toBuffer();
  await sharp(limpo).resize({ height: alt, withoutEnlargement: true }).webp({ quality: 86, alphaQuality: 90 }).toFile(path.join(dest, nome + '.webp'));
  cores[nome] = await cor(limpo);
}
for (const [nome, arq] of fotos) await sharp(path.join(ori, arq)).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(dest, nome + '.webp'));

// Recortes dos prints do site atual: as fotos de tutores (topo da home) e a vista aérea da fábrica (página Empresa).
await sharp(path.join(ori, 'print-home.png')).extract({ left: 452, top: 222, width: 702, height: 344 }).webp({ quality: 88 }).toFile(path.join(dest, 'f-momentos.webp'));
await sharp(path.join(ori, 'print-empresa.png')).extract({ left: 424, top: 472, width: 690, height: 302 }).webp({ quality: 88 }).toFile(path.join(dest, 'f-fabrica.webp'));
await sharp(path.join(ori, 'print-home.png')).resize(1200).jpeg({ quality: 82 }).toFile(path.join(dest, 'site-atual.jpg'));

// Logos das linhas, logo principal (reduzido) e ícone.
for (const l of ['classicos', 'pet-moments', 'cao-fiel', 'saralogo']) await sharp(path.join(ori, `l-${l}.png`)).webp({ quality: 92 }).toFile(path.join(dest, `l-${l}.webp`));
await sharp(path.join(ori, 'logo.png')).resize(600).png({ compressionLevel: 9 }).toFile(path.join(dest, 'logo.png'));
await sharp(path.join(ori, 'logo-rodape.png')).resize(256).png().toFile(path.join(dest, 'icone.png'));
await sharp(path.join(ori, 'logo-rodape.png')).resize(400).webp({ quality: 90 }).toFile(path.join(dest, 'icone-m.webp'));

fs.writeFileSync(path.join(aqui, 'cores.json'), JSON.stringify(cores, null, 1));
console.log(`matacura: ${embalagens.length} embalagens, ${fotos.length} fotos`);
