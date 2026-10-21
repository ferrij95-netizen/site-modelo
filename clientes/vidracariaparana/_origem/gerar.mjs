// Gera clientes/vidracariaparana/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/vidracariaparana/_origem/gerar.mjs
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
  console.log(`vidracariaparana: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#7cbd3c', fundo: '#1f3d10', claro: '#f3f6f0',
  fonteTitulo: "Arimo,Arial,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Arimo:wght@600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site de hoje: a faixa verde no topo, o selo cinza da araucária e a lista de serviços com as bolinhas, agora organizada, com fotos e funcionando no celular.', pontos: ['"Vendemos claridade" e os 56 anos logo na abertura', 'Os 18 serviços do site agrupados em 6 famílias', 'Orçamento com medidas direto por e-mail'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna e com cara de Curitiba: a araucária do logo encontra o vidro, os serviços aparecem por ambiente da casa e a história das três gerações vira linha do tempo.', pontos: ['Abertura com araucárias e prédio de vidro', 'Serviços por ambiente: banheiro, sacada, loja, sala', 'A família Morgenstern em três gerações'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('vidracariaparana: escolha em public/index.html');
