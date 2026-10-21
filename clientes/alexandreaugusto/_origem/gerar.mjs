// Gera clientes/alexandreaugusto/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto ou imóvel:
// node clientes/alexandreaugusto/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, imoveis } from './dados.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`alexandreaugusto: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const paginas = 6 + imoveis.length;
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#f9283a', fundo: '#001a35', claro: '#f4f7fb',
  fonteTitulo: "Arimo,Arial,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Arimo:wght@500;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas, texto: 'Clara e clássica, com o Museu do Ipiranga no topo, a busca logo abaixo e as faixas azuis do site atual.', pontos: ['Busca por negócio, tipo, bairro, quartos, valor e código', 'Os 60 imóveis com fotos, ficha e WhatsApp', 'Linha com os pontos do bairro: museu, parque e metrô'] },
    { letra: 'b', nome: nomesVersao.b, paginas, texto: 'Azul forte, com cara de portal: mosaico de fotos dos imóveis, busca grande e simulador de financiamento na home.', pontos: ['Mosaico com fotos reais da carteira', 'Atalhos por bairro e por comprar ou alugar', 'Simulador SAC e Price com os bancos parceiros'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('alexandreaugusto: escolha em public/index.html');
