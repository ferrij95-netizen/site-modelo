// Fotos reais do site atual (fundicaobitencourt.com.br/assets/images) convertidas para webp em public/assets/img.
// Os originais (20 MB) ficam fora do repositório, na pasta do projeto: /mnt/project-files/bitencourt/originais.
// Rodar quando chegar foto nova: node clientes/bitencourt/_origem/imagens.mjs [pasta dos originais]
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = process.argv[2] || '/mnt/project-files/bitencourt/originais';
const dest = path.join(aqui, '../public/assets/img');
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.join(dest, 'produtos'), { recursive: true });
fs.mkdirSync(path.join(dest, 'galeria'), { recursive: true });

// Peças: fotos de catálogo em fundo branco, limitadas a 900 px.
for (const f of fs.readdirSync(path.join(ori, 'produtos'))) {
  await sharp(path.join(ori, 'produtos', f)).flatten({ background: '#fff' }).resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86 }).toFile(path.join(dest, 'produtos', f.replace(/\.png$/, '.webp')));
}
// Instalações: as fotos do site atual têm 400 a 1000 px; as menores são ampliadas até 1000 px com nitidez leve.
const galeria = {
  'foto01.jpg': 'planta-fachada', 'foto02.jpg': 'planta-jardim', 'foto03.jpg': 'exaustao', 'foto031.jpg': 'filtros',
  'foto04.jpg': 'molde-areia', 'foto05.jpg': 'centrifuga', 'foto06.jpg': 'coquilha', 'foto07.jpg': 'fundicao-galpao',
  'foto08.jpg': 'vazamento', 'foto09.jpg': 'torno-cnc', 'foto10.jpg': 'usinagem-cobre', 'foto11.jpg': 'usinagem-bronze',
  'foto12.jpg': 'cavacos-cobre', 'foto13.jpg': 'espectrometro', 'foto14.jpg': 'condutivimetro', 'foto15.jpg': 'microscopio',
  'foto17.jpg': 'embalagem', 'foto18.jpg': 'carregamento',
};
for (const [f, n] of Object.entries(galeria)) {
  const img = sharp(path.join(ori, 'galeria', f));
  const { width } = await img.metadata();
  await img.resize({ width: Math.min(Math.max(width, 1000), 1400), kernel: 'lanczos3' }).sharpen({ sigma: width < 900 ? 0.8 : 0.4 })
    .webp({ quality: 82 }).toFile(path.join(dest, 'galeria', n + '.webp'));
}
await sharp(path.join(ori, 'fbl-banner.png')).webp({ quality: 82 }).toFile(path.join(dest, 'cadinho.webp'));
await sharp(path.join(ori, 'processos.jpg')).webp({ quality: 88 }).toFile(path.join(dest, 'como-produzimos.webp'));
await sharp(path.join(ori, 'chegamosemvoce.png')).webp({ quality: 86 }).toFile(path.join(dest, 'brasil.webp'));
await sharp(path.join(ori, 'iso9001.png')).webp({ quality: 90 }).toFile(path.join(dest, 'iso9000.webp'));
await sharp(path.join(ori, 'banner4-bk2.png')).webp({ quality: 84 }).toFile(path.join(dest, 'elementos.webp'));
await sharp(path.join(ori, 'banner5.png')).webp({ quality: 84 }).toFile(path.join(dest, 'pecas.webp'));
await sharp(path.join(ori, 'banner3.png')).resize({ width: 800 }).webp({ quality: 84 }).toFile(path.join(dest, 'cavacos.webp'));
await sharp(path.join(ori, 'foundry.jpg')).resize({ width: 1200 }).blur(0.6).webp({ quality: 80 }).toFile(path.join(dest, 'textura.webp'));
console.log('bitencourt: imagens prontas');
