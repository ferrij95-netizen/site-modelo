// Gera clientes/sbsengenharia/public/{index.html,a/,b/,assets/mapa.svg}. Rodar depois de mudar qualquer texto:
// node clientes/sbsengenharia/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao, mapaSvg } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
fs.writeFileSync(path.join(pub, 'assets/mapa.svg'), mapaSvg());
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
  console.log(`sbsengenharia: versão ${v.toUpperCase()}, ${total} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#1F7AD1', fundo: '#003A70', claro: '#EEF3F8',
  fonteTitulo: "'Archivo Narrow',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: total, texto: 'Fiel ao site de hoje: o banner com a tarja branca inclinada, a faixa cinza dos seis segmentos com os mesmos ícones redondos e as obras em destaque, agora em tela cheia e no celular.', pontos: ['Banner com as fotos das obras e as frases do site atual', 'Etapas de uma rodovia, do terreno ao asfalto', 'Uma página para cada obra, com galeria de fotos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: total, texto: 'Mais técnica: o mapa do Brasil com cada obra marcada, a história como uma rodovia com marcos de quilômetro e as obras num boletim com os números de cada uma.', pontos: ['Mapa das obras do Rio Grande do Sul ao Ceará', 'Linha do tempo em forma de estrada', 'Frota de locação com busca'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('sbsengenharia: escolha em public/index.html');
