// Gera clientes/jchiquitto/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/jchiquitto/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`jchiquitto: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#1E4FB8', fundo: '#07286B', claro: '#E8EEF8',
  fonteTitulo: "'Roboto Condensed',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 18, texto: 'Fiel ao site de hoje: o azul-marinho, a empilhadeira em preto e branco do banner e os títulos condensados com a tarja azul, agora com o selo "desde 1963" bem colocado e tudo legível.', pontos: ['Banner refeito com a foto e o selo 1963 de vocês', '"Até onde a gente levanta": capacidades de 7,5 a 20 t', '12 linhas de produtos com galeria de fotos e cotação'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 18, texto: 'Mais clara e direta: o verde-petróleo do círculo do logo, a Hyster amarela recortada na abertura e os quatro negócios (aluguel, venda, peças e compra) em abas.', pontos: ['Aluguel, venda, peças e compra em abas', 'Índice de produtos que mostra a peça ao passar o mouse', 'Torres duplex, triplex e quadriplex em desenho'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('jchiquitto: escolha em public/index.html');
