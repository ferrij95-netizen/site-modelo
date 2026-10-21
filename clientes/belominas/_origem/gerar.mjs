// Gera clientes/belominas/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/belominas/_origem/gerar.mjs
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
  console.log(`belominas: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#D7261E', fundo: '#2B2B2B', claro: '#FBF8F1',
  fonteTitulo: "'Fira Sans',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,600;0,700;1,700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 13, texto: 'Feita a partir da embalagem vermelha da Belo Minas: o logo no meio do menu como no site de hoje, as fitas brancas com o nome do queijo e a prateleira de produtos com as setas vermelhas.', pontos: ['Os dois destaques do coalho: pronto para assar e 7 espetos', 'Tabela de produtos com peso, sabor, composição e %VD', 'Uma página para cada um dos oito queijos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 13, texto: 'Mais leve e mais mineira: abre na serra, conta o caminho do leite em três etapas ("da fonte ao consumidor") e mostra cada queijo numa ficha com o rótulo nutricional.', pontos: ['Leite, transformação e distribuição com foto de cada etapa', 'Os oito queijos separados por linha', 'Rótulo de ingredientes e tabela nutricional em cada produto'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('belominas: escolha em public/index.html');
