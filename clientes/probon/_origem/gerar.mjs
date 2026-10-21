// Gera clientes/probon/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/probon/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, produtos } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
let n = 0;
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  n = Object.keys(paginas).length;
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`probon: versão ${v.toUpperCase()}, ${n} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Probon', url: E.url, lang: 'pt', cor: '#b8292d', fundo: '#2a0c0d', claro: '#f7f3f1',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: n, texto: 'A estrutura do site de hoje, com logo e contatos no topo e o menu na barra vermelha, e a foto aérea da fábrica na abertura.', pontos: ['Colchões e linha industrial lado a lado', 'Do bloco de espuma ao colchão em 5 etapas', `Catálogo com filtro e ficha dos ${produtos.length} modelos`] },
    { letra: 'b', nome: nomesVersao.b, paginas: n, texto: 'O colchão em primeiro plano: buscador por tipo, conforto e peso, corte do colchão por camadas e escala do macio ao extra firme.', pontos: ['Buscador de colchão na abertura', 'Imperial camada por camada', 'Escolha pelo nível de conforto'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('probon: escolha em public/index.html');
