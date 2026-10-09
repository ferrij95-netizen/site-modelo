// Gera clientes/instor/public/{a,b}/ (português) e {a,b}/en/ (inglês) a partir dos textos e das peças.
// Rodar depois de mudar qualquer texto: node clientes/instor/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { versaoA } from './versao-a.mjs';
import { traduzir } from './traduzir.mjs';
import { site } from './conteudo.mjs';
const versaoB = await import('./versao-b.mjs').then(m => m.versaoB).catch(() => null);

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const faltando = new Set();

// Bandeiras em SVG (emoji de bandeira não aparece no Windows).
const BANDEIRA = {
  pt: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#009c3b"/><path d="M14 2.5 25.5 10 14 17.5 2.5 10Z" fill="#ffdf00"/><circle cx="14" cy="10" r="4.6" fill="#002776"/><path d="M9.6 9.1c3-.6 6.3-.1 8.8 1.5" stroke="#fff" stroke-width=".9" fill="none"/></svg>',
  en: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#fff"/><g fill="#b22234">' + [0, 2, 4, 6, 8, 10, 12].map(i => `<rect y="${i * 20 / 13}" width="28" height="${20 / 13}"/>`).join('') + '</g><rect width="12" height="' + (7 * 20 / 13).toFixed(2) + '" fill="#3c3b6e"/></svg>',
};
const caminho = (v, lang, slug) => `/${v}/${lang === 'pt' ? '' : lang + '/'}${slug === 'index' ? '' : slug + '/'}`;
const seletor = (v, lang, slug) => `<nav class="idiomas" aria-label="${lang === 'pt' ? 'Idioma' : 'Language'}">${[['pt', 'PT', 'Português', 'pt-BR'], ['en', 'EN', 'English', 'en']].map(([l, c, nome, hl]) =>
  `<a href="${caminho(v, l, slug)}" hreflang="${hl}" lang="${hl}" title="${nome}"${l === lang ? ' aria-current="true"' : ''}>${BANDEIRA[l]}<span>${c}</span></a>`).join('')}</nav>`;
const alternados = (v, slug) => [['pt-BR', 'pt'], ['en', 'en'], ['x-default', 'pt']].map(([hl, l]) => `<link rel="alternate" hreflang="${hl}" href="${site.dominio}${caminho(v, l, slug)}">`).join('\n');

for (const [v, gerar] of [['a', versaoA], ['b', versaoB]]) {
  if (!gerar) continue;
  const paginas = gerar();
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const lang of ['pt', 'en']) {
    for (const [slug, html] of Object.entries(paginas)) {
      let out = lang === 'pt' ? html : traduzir(html, v, faltando);
      out = out.replace('<!--IDIOMAS-->', seletor(v, lang, slug)).replace('<!--ALTERNADOS-->', alternados(v, slug));
      const dir = path.join(pub, caminho(v, lang, slug));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), out);
    }
  }
  console.log(`instor: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas em PT e EN`);
}
if (faltando.size) {
  fs.writeFileSync(path.join(aqui, 'faltando-en.json'), JSON.stringify([...faltando], null, 1));
  console.error(`instor: ${faltando.size} textos sem tradução em inglês (lista em _origem/faltando-en.json)`);
  process.exit(1);
}
