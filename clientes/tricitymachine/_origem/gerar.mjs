// Gera clientes/tricitymachine/public/{a,b,c,d}/. Rodar depois de mudar qualquer texto: node clientes/tricitymachine/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao } from './paginas.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b', 'c', 'd']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`tricitymachine: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}
