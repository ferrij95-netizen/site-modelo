// Gera clientes/fuhrcontabilidade/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/fuhrcontabilidade/_origem/gerar.mjs
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
  console.log(`fuhrcontabilidade: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#A8843F', fundo: '#062E5E', claro: '#EAF1FA',
  fonteTitulo: "Montserrat,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 14, texto: 'Fiel ao site de hoje: a faixa azul com o logo na aba branca, os atalhos de ferramentas e a agenda tributária logo na abertura, com acabamento novo.', pontos: ['Agenda tributária do mês na primeira tela', 'Serviços em abas e depoimentos com os logos dos clientes', 'Artigos da equipe com página própria'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 14, texto: 'Mais sóbria e organizada como um balancete: números do escritório em livro-razão, serviços como plano de contas e o mês da empresa numa linha do tempo.', pontos: ['Resumo do escritório em formato de livro-razão', 'Serviços numerados como plano de contas', 'Linha do tempo do mês, do documento ao balancete'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('fuhrcontabilidade: escolha em public/index.html');
