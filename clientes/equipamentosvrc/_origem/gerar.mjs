// Gera clientes/equipamentosvrc/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/equipamentosvrc/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, produtos } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`equipamentosvrc: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#2B96CC', fundo: '#0f2f45', claro: '#f2f6f9',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wght@300;600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + produtos.length, texto: 'Fiel ao site de hoje: a faixa colorida no topo, o azul VRC, o selo de 30 anos, os círculos e o caminho do encerado até a coroa pronta, agora com acabamento novo e funcionando no celular.', pontos: ['Os 8 depoimentos de "Quem faz a diferença, indica VRC!"', 'Página própria para cada um dos 24 produtos, com fotos e ficha técnica', 'Onde comprar com as 59 dentais filtradas por estado'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + produtos.length, texto: 'Mais técnica e direta: o protético escolhe a etapa do trabalho (modelo, fundição, injeção, cerâmica, resina, acabamento) e vê os equipamentos da VRC para ela.', pontos: ['"A VRC em cada etapa do laboratório"', 'Forno Lótus Ceram em destaque, com vídeo e catálogo', 'Garantia, assistência e área de suporte bem à vista'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('equipamentosvrc: escolha em public/index.html');
