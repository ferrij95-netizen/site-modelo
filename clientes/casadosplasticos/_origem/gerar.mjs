// Gera clientes/casadosplasticos/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/casadosplasticos/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, produtos, deps } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`casadosplasticos: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#E31B23', fundo: '#3d3d3d', claro: '#f3f1ee',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,600..900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + deps.length + produtos.length, texto: 'A loja do Centro em versão de site: branca, com a curva vermelha e cinza do cabeçalho de hoje, as fotos no pano vermelho em destaque e a busca bem no meio.', pontos: ['Busca e departamentos com foto logo na entrada', `${produtos.length} produtos, cada um com página própria`, 'Lista de pedido enviada pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + deps.length + produtos.length, texto: 'Pensada para quem compra para um negócio: faixa cinza do logo, departamentos na lateral como no site atual e o catálogo em linhas, rápido de percorrer.', pontos: ['Atalhos por tipo de negócio (confeitaria, delivery…)', 'Catálogo em lista ou grade, com busca por medida', 'Quantidade de cada item já na lista de orçamento'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('casadosplasticos: escolha em public/index.html');
