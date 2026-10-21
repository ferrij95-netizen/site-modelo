// Gera clientes/cooperativariobranco/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/cooperativariobranco/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`cooperativariobranco: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (molduras e animações de componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const escolha = paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#4cb848', fundo: '#06361a', claro: '#fbfbee',
  fonteTitulo: "'RB Titulo',Verdana,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'O verde forte e as faixas verde e amarela do site atual, com o prédio da matriz na abertura.', pontos: ['Selo da cooperativa no topo verde', 'As quatro lojas com fotos e telefone', 'Linha do tempo de 1941 até hoje'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Clara e puxada pelos supermercados, com as lojas em abas e as ofertas sempre à mão.', pontos: ['Mosaico com fotos das lojas', 'Telefone de cada loja num toque', 'Os objetivos de 1941 em etapas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
// Fonte dos títulos (a mesma do logotipo, tipo Verdana Bold) também na página de escolha.
fs.writeFileSync(path.join(pub, 'index.html'), escolha.replace('</head>', "<style>@font-face{font-family:'RB Titulo';src:url(/assets/rb-titulo.woff2) format('woff2');font-weight:700;font-display:swap}</style>\n</head>"));
console.log('cooperativariobranco: escolha em public/index.html');
