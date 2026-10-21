// Gera clientes/fundiart/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/fundiart/_origem/gerar.mjs
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
  console.log(`fundiart: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#FF6000', fundo: '#120705', claro: '#f2f2f0',
  fonteTitulo: "Arimo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Arimo:wght@500;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Fiel ao site de hoje: fundo preto, o fogo da fundição e a faixa de menu laranja, com as obras passando em destaque e a legenda ao lado, agora grande e funcionando no celular.', pontos: ['Obras em destaque com autor, medidas e material', 'Processo contado em quatro etapas com as fotos da fábrica', 'Galeria com 86 trabalhos, filtro por tipo e foto ampliada'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Mais clara e de galeria: um mosaico de obras logo na abertura, as quatro frentes da fundição e os artistas com as obras de cada um.', pontos: ['Mosaico de esculturas, monumentos e troféus na abertura', 'Página de clientes com as obras de cada artista', 'Formulário de orçamento e rota até a fábrica'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('fundiart: escolha em public/index.html');
