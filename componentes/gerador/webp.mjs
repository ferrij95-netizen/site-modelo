// Converte imagens de origem (pasta do raspado) para public/assets/img/<nome>.webp. Só converte se faltar.
// mapa: { nome: 'arquivo-origem.jpg' } ou { nome: ['arquivo', larguraMax] }
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('sharp');
export async function prepImgs(pub, origem, mapa, logo) {
  const dir = path.join(pub, 'assets/img'); fs.mkdirSync(dir, { recursive: true });
  for (const [nome, v] of Object.entries(mapa)) {
    const [arq, larg] = Array.isArray(v) ? v : [v, 1600];
    const dest = path.join(dir, `${nome}.webp`);
    if (fs.existsSync(dest)) continue;
    const src = path.join(origem, arq);
    if (!fs.existsSync(src)) { console.log('falta imagem', arq); continue; }
    await sharp(src).rotate().resize({ width: larg, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  }
  if (logo) {
    const dest = path.join(pub, 'assets', logo.arq);
    if (!fs.existsSync(dest)) {
      let s = sharp(path.join(origem, logo.src));
      if (logo.trim) s = s.trim({ threshold: 18 });
      await s.webp({ quality: 92, alphaQuality: 100 }).toFile(dest);
    }
    const m = await sharp(dest).metadata(); logo.w = m.width; logo.h = m.height;
    const fav = path.join(pub, 'assets/favicon.png');
    if (!fs.existsSync(fav)) await sharp(path.join(origem, logo.fav || logo.src)).resize(64, 64, { fit: 'contain', background: '#fff' }).png().toFile(fav);
  }
}
