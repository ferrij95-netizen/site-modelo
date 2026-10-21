// Gera clientes/rdengenharia/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/rdengenharia/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
let total = 0;
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  total = Object.keys(paginas).length;
  console.log(`rdengenharia: versão ${v.toUpperCase()}, ${total} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#ED1C24', fundo: '#231F20', claro: '#F4F2EF',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: total, texto: 'Fiel ao site de hoje: as faixas e o menu vermelhos, os quatro destaques à esquerda e o slideshow com os 20 quadros à direita, agora com acabamento novo e legível no celular.', pontos: ['Slideshow com os 20 quadros do site atual', 'Serviços em tabela numerada, com página própria cada um', 'Projetos 3D e inspeção com drone em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: total, texto: 'Mais técnica, como uma prancha de projeto: os serviços viram os circuitos de um quadro de distribuição, a empresa aparece num carimbo e a história numa linha unifilar.', pontos: ['Serviços como circuitos C01 a C15 de um quadro', 'Fotos com legendas de prancha (Fig. 01, 02...)', 'Galeria dos projetos em 3D rolando de lado'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('rdengenharia: escolha em public/index.html');
