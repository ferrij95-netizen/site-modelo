// Converte as imagens do site atual (baixadas em img/, lista em imagens.md) para public/assets/img/*.webp.
// Rodar: node clientes/flamarsul/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const sharp = createRequire(path.join(aqui, '../../../package.json'))('sharp');
const src = n => path.join(aqui, 'img', n);
const out = path.join(aqui, '../public/assets/img');
fs.mkdirSync(out, { recursive: true });

const fotos = {
  'equipe-2025': ['2025_10_280kb.jpg', 1032],
  'equipe-2020': ['2020_04_teste6.png', 1032],
  'equipe-portao': ['2018_12_galeria-fotos06.jpg', 1032],
  'equipe-rosa': ['2018_12_galeria-fotos02.jpg', 1032],
  'equipe-rosa-2': ['2018_12_galeria-fotos01.jpg', 1032],
  'palestra': ['2018_12_galeria-fotos03.jpg', 1032],
  'frota': ['2018_12_galeria-fotos05.jpg', 1032],
  'frota-2': ['2018_12_galeria-fotos04.jpg', 1032],
  'equipe-toda': ['2018_12_galeria-fotos07.jpg', 1032],
  'televendas': ['2019_02_Flamarsul-foto-vendas-online.png', 920],
  'fundo-pontos': ['2019_02_fundo-home.png', 2400],
  'relatorio-2026-1': ['2025_10_Relatorio-transparencia-salarial.jpg', 868],
  'relatorio-2024-2': ['2024_10_RELATORIO-TRANSPARENCIA-SALARIAL-2°-SEM-FLAMARSUL_page-0001.jpg', 1800],
};
for (const [nome, [arq, w]] of Object.entries(fotos)) await sharp(src(arq)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(out, nome + '.webp'));

// Recortes com fundo transparente.
await sharp(src('2019_01_van-mockup.png')).trim().webp({ quality: 88, alphaQuality: 90 }).toFile(path.join(out, 'van.webp'));
await sharp(src('2019_01_2Flamarsul-mapa-png.png')).trim().webp({ quality: 88 }).toFile(path.join(out, 'mapa-rs.webp'));

// Logos das marcas distribuídas (como estão na página Produtos).
const marcas = {
  'bem-bolado': '2021_01_logo-bem-bolado-horizontal-300x300.png', cricket: '2019_05_Cricket-logo.jpg', fini: '2019_05_Fnni-logo.jpg',
  danilla: '2025_10_Danilla-Foods-1.webp', benevia: '2025_10_BENEVIA-Logo.svg', guimaraes: '2025_10_novo-logo-guimaraes-2022-2.webp',
  jazam: '2025_10_logo_2023.png', copag: '2025_10_46c3c224e8627a1ecb39742f56d7d0ad6e807d1d.png',
};
for (const [nome, arq] of Object.entries(marcas)) {
  await sharp(src(arq), { density: 150 }).flatten({ background: '#ffffff' }).trim({ threshold: 12 }).resize({ width: 480, height: 240, fit: 'inside', withoutEnlargement: true }).webp({ quality: 90 }).toFile(path.join(out, 'marca-' + nome + '.webp'));
}

// Ícones dos diferenciais (versões de 350 px do site atual) viram máscaras PNG (só o desenho, cor definida no CSS).
const icones = { atendimento: '2018_12_icones-diferenciais-02.png', agilidade: '2018_12_icones-diferenciais-03.png', operacao: '2018_12_icones-diferenciais-04.png', relogio: '2018_12_icones-diferenciais-01.png',
  gps: '2021_01_PRONTO-GPS-FINO.png', telefone: '2021_01_PRONTO-TELEFONE-FINO.png', email: '2021_01_PRONTO-EMAIL-FINO.png', whats: '2021_01_PRONTO-WHATS-FINO.png' };
for (const [nome, arq] of Object.entries(icones)) {
  let img = sharp(src(arq)).resize(350).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    let a = data[i * 4 + 3];
    // No relógio, apaga o "24" do meio: o número entra como texto (48h, como no site atual).
    if (nome === 'relogio') { const x = i % info.width - 175, y = Math.floor(i / info.width) - 178; if (x * x + y * y < 108 * 108) a = 0; }
    px.set([255, 255, 255, a], i * 4);
  }
  await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(path.join(out, 'icone-' + nome + '.png'));
}

// Favicon: o símbolo do logo.
await sharp(path.join(aqui, '../public/assets/simbolo.svg'), { density: 300 }).trim().resize(128, 128, { fit: 'contain', background: '#0000' }).png().toFile(path.join(aqui, '../public/assets/favicon.png'));
console.log('flamarsul: imagens prontas');
