// Fotos reais do site atual (maquinasaguia.com.br/site/wp-content/uploads) convertidas para webp em public/assets/img.
// Os originais ficam fora do repositório, em /mnt/project-files/maquinasaguia/originais (baixados por extrair.py e curl).
// Rodar quando chegar foto nova: node clientes/maquinasaguia/_origem/imagens.mjs [pasta dos originais]
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const orig = process.argv[2] || path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });
const dados = JSON.parse(fs.readFileSync(path.join(aqui, 'dados.json'), 'utf8'));
const o = f => path.join(orig, f);

// Máquinas: até 4 fotos por máquina (1100 px) e uma miniatura para os cartões do catálogo (640 px).
// Usa o recorte sem fundo (recortar.py, em <originais>/recortes) quando existe; as fotos listadas em MANTER_FUNDO
// são de máquina instalada ou detalhe, em que o recorte não fica bom, e ficam com o fundo original.
const MANTER_FUNDO = new Set(JSON.parse(fs.readFileSync(path.join(aqui, 'manter-fundo.json'), 'utf8')));
const fonte = f => {
  const r = path.join(orig, 'recortes', f.replace(/\.[^.]+$/, '.png'));
  return !MANTER_FUNDO.has(f) && fs.existsSync(r) ? [r, true] : [o(f), false];
};
let n = 0;
for (const p of dados.produtos) {
  for (const [i, f] of p.fotos.slice(0, 4).entries()) {
    const [src, recorte] = fonte(f);
    const base = () => recorte ? sharp(src) : sharp(src).rotate().flatten({ background: '#ffffff' });
    await base().resize({ width: 1100, height: 1100, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(dest, `p-${p.slug}-${i + 1}.webp`));
    if (i === 0) await base().resize({ width: 640, height: 480, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(dest, `c-${p.slug}.webp`));
    n++;
  }
}

// Máquinas recortadas (fundo transparente) dos banners da capa do site atual.
const recortes = { 'maquinas-aguia-banner-1.png': 'r-multiprocessador', 'maquinas-aguia-banner2.png': 'r-carro-cpa800', '2014_05_maquinas-aguia-banner_3.png': 'r-refiladeira', 'maquinas-aguia-banner4.png': 'r-torno-ttr160' };
for (const [f, nome] of Object.entries(recortes)) {
  await sharp(o(f)).trim({ threshold: 1 }).resize({ width: 1000, withoutEnlargement: false, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 })
    .webp({ quality: 86, alphaQuality: 90 }).toFile(path.join(dest, nome + '.webp'));
}

// Fotos da empresa, das máquinas instaladas e das notícias.
const fotos = {
  'Foto-serrando.jpg': 'serrando', 'IMG_7162-scaled.jpg': 'engrenagens', 'SAM_3292-scaled.jpg': 'painel-tensao',
  '2014_05_100_5188-scaled.jpg': 'linha-instalada', 'WhatsApp-Image-2020-02-13-at-14.08.43.jpeg': 'serraria-instalada', '2014_04_eucalipto_maquinas-aguia.png': 'eucalipto',
  'fiep-1.jpg': 'fiep-1', 'fiep-2.jpg': 'fiep-2', 'fiep-3.jpg': 'fiep-3', 'CAPA-REVISTA.jpg': 'revista-capa', 'PAG-2.jpg': 'revista-pagina',
  'Foto-tradicao.jpg': 'tradicao-capa', 'Multi-Pro-Bloc.jpg': 'multi-pro-bloc', 'post-lignum-convite-maquinas-aguia-1.png': 'lignum',
  'maquinas-aguia-bndes.jpeg': 'bndes', '2014_03_maquinas-aguia-torno-tubular-caracteristica-fisica.jpg': 'torno-tubular-desenho',
};
for (const [f, nome] of Object.entries(fotos)) {
  await sharp(o(f)).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(dest, nome + '.webp'));
}
console.log(`maquinasaguia: ${n} fotos de máquinas, ${fs.readdirSync(dest).length} arquivos em public/assets/img`);
