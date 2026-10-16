// Gera clientes/fiorella/public/{a,b}/ (pt na raiz, en/ e es/) a partir de conteudo.mjs e paginas.mjs.
// Rodar depois de mudar qualquer texto: node clientes/fiorella/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerar } from './paginas.mjs';
import { LANGS } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  let n = 0;
  for (const l of LANGS) {
    for (const [slug, html] of Object.entries(gerar(v, l))) {
      const dir = path.join(pub, v, l === 'pt' ? '' : l, slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      n++;
    }
  }
  console.log(`fiorella: versão ${v.toUpperCase()}, ${n} páginas`);
}
