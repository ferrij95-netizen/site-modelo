// Gera clientes/faximobiliaria/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto ou imóvel:
// node clientes/faximobiliaria/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, imoveis, cidades } from './dados.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`faximobiliaria: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const paginas = 8 + imoveis.length;
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#e30010', fundo: '#111111', claro: '#f4f4f2',
  fonteTitulo: "Saira,Arial,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Saira:wght@600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas, texto: 'Fiel ao site atual: a costa de Fortaleza no topo, a moldura preta e vermelha e os três botões, agora com busca e todos os imóveis.', pontos: ['Busca por alugar ou comprar, tipo, cidade, bairro, valor e código', `Os ${imoveis.length} imóveis com fotos e ficha completa`, 'Passo a passo da locação e lista de documentos'] },
    { letra: 'b', nome: nomesVersao.b, paginas, texto: 'Cara de portal: topo preto com o logo em branco, mosaico com fotos reais da carteira e blocos vermelhos para o proprietário.', pontos: ['Mosaico com os imóveis de melhor foto', `Imóveis por cidade, de Fortaleza ao litoral (${cidades.length} cidades)`, 'Vantagens para quem quer alugar o imóvel'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('faximobiliaria: escolha em public/index.html');
