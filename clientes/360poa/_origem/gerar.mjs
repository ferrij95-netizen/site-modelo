// Gera clientes/360poa/public/{a,b}/ a partir dos textos e das peças.
// Rodar depois de mudar qualquer texto: node clientes/360poa/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { documento, topo, rodape } from './comum.mjs';
import { restaurante, cardapio, eventosPg, galeriaPg, contato, inicioA, inicioB } from './paginas.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const versoes = {
  a: { tema: '#0d1622', inicio: inicioA },
  b: { tema: '#f5eee4', inicio: inicioB },
};
for (const [v, { tema, inicio }] of Object.entries(versoes)) {
  const paginas = {
    index: inicio(), 'o-restaurante': restaurante(), cardapio: cardapio(v),
    eventos: eventosPg(), galeria: galeriaPg(), contato: contato(),
  };
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, corpo] of Object.entries(paginas)) {
    const html = documento({ versao: v, slug, tema, corpo: `${topo({ versao: v, slug, logoCor: v === 'b' ? 'escuro' : 'branco' })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: v })}` });
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`360poa: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}
