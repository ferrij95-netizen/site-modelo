// Gera clientes/toniolo/public/{a,b}/ (português na raiz, /en/ e /es/) a partir dos textos e das peças.
// Rodar depois de mudar qualquer texto: node clientes/toniolo/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { LANGS } from './conteudo.mjs';
import { versaoA } from './versao-a.mjs';
import { versaoB } from './versao-b.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const [v, gerar] of [['a', versaoA], ['b', versaoB]]) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  let total = 0;
  for (const l of LANGS) {
    const paginas = gerar(l);
    for (const [slug, html] of Object.entries(paginas)) {
      // Nenhum texto pode ficar sem tradução (o T() devolve undefined quando falta a língua).
      if (/undefined|\[object Object\]/.test(html)) throw new Error(`${v}/${l}/${slug}: texto faltando`);
      const dir = path.join(pub, v, l === 'pt' ? '' : l, slug === 'index' ? '' : slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      total++;
    }
  }
  console.log(`toniolo: versão ${v.toUpperCase()}, ${total} páginas (pt, en, es)`);
}
