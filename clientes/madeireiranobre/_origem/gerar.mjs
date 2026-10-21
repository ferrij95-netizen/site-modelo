// Gera clientes/madeireiranobre/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/madeireiranobre/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, categorias, todosItens } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`madeireiranobre: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Madeireira Nobre</title><p><a href="/a/">Versão A</a> · <a href="/b/">Versão B</a></p>`);
  process.exit(0);
}
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const n = Object.keys(gerarVersao('a')).length;
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nomeCompleto, url: E.url, lang: 'pt', cor: '#B8322A', fundo: '#2A1616', claro: '#F3EFEC', artigo: 'da',
  fonteTitulo: "'Josefin Sans',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: n, texto: 'Fiel ao site de hoje: faixa de contatos no topo, os banners das telhas, tábuas e vigas, "Madeiras de qualidade direto da serraria" e a grade de produtos com a faixa vinho, agora com o logo nítido e funcionando no celular.', pontos: [`${categorias.length} categorias e ${todosItens.length} produtos com ficha e medidas`, 'Busca de produto no topo, como no site atual', 'Lista de orçamento enviada pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: n, texto: 'Mais moderna e técnica: as bitolas das peças desenhadas em escala, os produtos organizados pela etapa da obra e as três marcas de telha lado a lado.', pontos: ['Viga, caibro, ripão e tábua em escala real', '"O que você está construindo agora?" indica os produtos', 'Calculadora de telhas e compensados'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('madeireiranobre: escolha em public/index.html');
