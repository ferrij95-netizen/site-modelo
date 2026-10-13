// Gera clientes/altoalegre/public/{a,b}/ a partir dos textos e das peças.
// Rodar depois de mudar qualquer texto: node clientes/altoalegre/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { paginas } from './paginas.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const pags = paginas(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(pags)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`altoalegre: versão ${v.toUpperCase()}, ${Object.keys(pags).length} páginas`);
}
