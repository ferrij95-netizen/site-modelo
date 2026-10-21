// Gera clientes/emmig/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/emmig/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const contagem = {};
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  contagem[v] = Object.keys(paginas).length;
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`emmig: versão ${v.toUpperCase()}, ${contagem[v]} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'EMMIG', url: E.url, lang: 'pt', cor: '#55A04B', fundo: '#16291a', claro: '#f3f4f1',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,600..900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: contagem.a, texto: 'Clara e técnica, com o verde da marca no topo, a ficha da empresa e o processo do projeto à montagem.', pontos: ['Vigas com a marca EMMIG na capa', 'O que a EMMIG fabrica, item por item', 'Obras por segmento com as fotos reais'] },
    { letra: 'b', nome: nomesVersao.b, paginas: contagem.b, texto: 'Guiada pelas fotos das obras: capa em tela cheia trocando de obra, trilho de destaques e escolha por tipo de obra.', pontos: ['Capa com as obras em tela cheia', 'Obras separadas por tipo, em abas', 'Do projeto à entrega, com foto de cada etapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('emmig: escolha em public/index.html');
