// Gera clientes/bioplast/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/bioplast/_origem/gerar.mjs
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
  console.log(`bioplast: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'do', url: E.url, lang: 'pt', cor: '#00A859', fundo: '#23282b', claro: '#E3F1E6',
  fonteTitulo: "'Saira Semi Condensed',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:ital,wght@0,600;0,700;1,700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Inspirada no folder da Bioplast: tarjas verdes numeradas, o mosaico de fotos da fábrica e o catálogo de laboratório em tabelas com os códigos, como no impresso.', pontos: ['Mosaico com as fotos reais da produção', 'Catálogo de laboratório com busca por código', 'Biovin e PartyParts com lista de orçamento'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Mais técnica e direta: abre na injeção de peças, mostra as quatro linhas da fábrica numa lista e o processo do projeto à entrega em cinco passos.', pontos: ['"Quatro linhas, uma fábrica" com foto de cada uma', 'Processo em cinco passos e os 21 polímeros', 'Códigos de laboratório em fichas que abrem e fecham'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('bioplast: escolha em public/index.html');
