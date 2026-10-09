// Gera clientes/instor/public/{a,b}/ a partir dos textos e das peças.
// Rodar depois de mudar qualquer texto: node clientes/instor/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { versaoA } from './versao-a.mjs';
const versaoB = await import('./versao-b.mjs').then(m => m.versaoB).catch(() => null);

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const [v, gerar] of [['a', versaoA], ['b', versaoB]]) {
  if (!gerar) continue;
  const paginas = gerar();
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`instor: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}
