// Gera clientes/grupokss/public/{a,b}/ (e a página de escolha em public/index.html). Rodar depois de mudar qualquer texto:
// node clientes/grupokss/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao } from './paginas.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`grupokss: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (molduras e animações de componentes/apresentacao/ na raiz do repositório).
const { empresa: E } = await import('./conteudo.mjs');
const { nomesVersao } = await import('./paginas.mjs');
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const escolha = paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#e30613', fundo: '#0f2d45', claro: '#f2f6f9',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: 'Lato,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Saira:wdth,wght@112.5,600;112.5,700;125,800&family=Lato:wght@400;700&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 72, texto: 'Clara, com a faixa azul do site atual e a home na mesma ordem: abertura com a mesa Vision T4 EH, linhas de produtos, os três pilares e os depoimentos.', pontos: ['Linhas de produtos em mosaico, com fotos reais', 'Destaque do Foco SKYLED com os números da ficha', 'Catálogo com os 58 produtos, filtros e lista de orçamento'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 72, texto: 'Mais azul, abre com a foto do estande na Feira Hospitalar e leva o visitante pelas sete linhas, da mesa Vision T4 EH ao pós-venda.', pontos: ['Seletor das sete linhas de produtos', 'Mesa Vision T4 EH em destaque, com o painel touch', 'Processo do projeto ao pós-venda e agenda de eventos 2025'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}).replace('O novo site da <em>', 'O novo site do <em>');
fs.writeFileSync(path.join(pub, 'index.html'), escolha);
console.log('grupokss: escolha em public/index.html');
