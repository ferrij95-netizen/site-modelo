// Gera clientes/marmorarialonardi/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/marmorarialonardi/_origem/gerar.mjs
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
  console.log(`marmorarialonardi: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Marmoraria Lonardi</title><p><a href="/a/">Versão A</a> · <a href="/b/">Versão B</a></p>`);
  process.exit(0);
}
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#2F6FC0', fundo: '#032F60', claro: '#EEF0F3',
  fonteTitulo: "'Lexend Exa',system-ui,sans-serif", fonteTexto: "'Open Sans',system-ui,sans-serif",
  googleFonts: 'https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@600;700;800&family=Open+Sans:wght@400;600&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Fiel ao site de hoje: a faixa azul com o letreiro MARMORARIA LONARDI e o lema, os botões de menu e as quatro galerias (Lavatórios, Pias, Lápides, Túmulos), agora com fotos grandes, ampliação e funcionando no celular.', pontos: ['As 34 fotos de trabalhos do site atual, com legenda', 'Simulador de lápide com as pedras da Lonardi', 'Orçamento enviado pelo WhatsApp ou e-mail'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Mais clara e moderna, com o monograma M|L como marca: a casa (pias e lavatórios) e a memória (lápides e túmulos) lado a lado, as pedras em destaque e os trabalhos com filtro.', pontos: ['"Para a casa e para a memória" separa os dois públicos', 'Pedras com textura real e trabalhos feitos com cada uma', 'Simulador de lápide já na página inicial'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('marmorarialonardi: escolha em public/index.html');
