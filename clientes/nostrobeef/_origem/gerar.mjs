// Gera clientes/nostrobeef/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/nostrobeef/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const qtd = {};
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  qtd[v] = Object.keys(paginas).length;
  console.log(`nostrobeef: versão ${v.toUpperCase()}, ${qtd[v]} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#C8102E', fundo: '#16223F', claro: '#F7F4EF',
  fonteTitulo: "'Oswald',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: qtd.a, texto: 'Feita a partir do site de hoje: a faixa de grama com o selo Nostro Beef no meio, o menu azul-marinho e os painéis de canto arredondado sobre o rebanho, com os botões vermelhos de Bovinos e Subprodutos.', pontos: ['As três linhas: Tradicionais, Porcionados e Premium Do Cheff', 'Fotos reais das caixas e dos cortes embalados', 'As 9 receitas do site, uma página para cada'] },
    { letra: 'b', nome: nomesVersao.b, paginas: qtd.b, texto: 'Mais clara e comercial, no bordô e dourado do selo: conta o caminho do pasto ao pedido e traz uma lista de cotação em que o comprador marca os cortes e manda tudo pelo WhatsApp.', pontos: ['Do rebanho ao balcão em quatro etapas', 'Lista de cotação com os 38 cortes e formatos', 'Linha Premium Do Cheff com Brangus e Braford em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('nostrobeef: escolha em public/index.html');
