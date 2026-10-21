// Gera clientes/produvale/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/produvale/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, linhas, marcas } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`produvale: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const n = Object.keys(gerarVersao('a')).length;
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#e0101a', fundo: '#06185a', claro: '#f1f4fa',
  fonteTitulo: "Archivo,'Arial Black',sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: n, texto: 'Branca como um ambiente hospitalar, com o azul do logo nos títulos e o vermelho da cruz nos botões.', pontos: [`As ${linhas.length} linhas do site atual, cada uma com foto e exemplos`, 'Foto de Blumenau na abertura, como a faixa do logo', 'Pedido de cotação a um clique em todas as páginas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: n, texto: 'O azul-marinho e a faixa vermelha do site atual, com a foto de Blumenau recortada na cruz do logo.', pontos: ['Abertura azul com a cruz da marca', 'Mosaico de fotos das linhas de produto', `${marcas.length} marcas parceiras em destaque`] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('produvale: escolha em public/index.html');
