// Gera clientes/tria/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/tria/_origem/gerar.mjs
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
  console.log(`tria: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#f39a3c', fundo: '#3b3a3a', claro: '#efeeee',
  fonteTitulo: "Ubuntu,system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif",
  googleFonts: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&family=Source+Sans+3:wght@400;600&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 19, texto: 'Fiel ao site de hoje: a faixa com o desenho geodésico no topo, a frase "modular solar sustentabilidade", a bolinha laranja nos títulos e o fundo cinza claro, agora com as fotos dos projetos aparecendo.', pontos: ['Projetos em destaque com foto, não mais caixas cinza vazias', 'As três frentes (estandes, energia solar, arquitetura) lado a lado', 'Uma página para cada um dos 15 projetos, com galeria'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 19, texto: 'Mais moderna: fundo branco, fotos recortadas em triângulos como uma cúpula geodésica e uma linha do tempo de 1993 a 2013 com os projetos marcantes.', pontos: ['Fotos em triângulos, no espírito das cúpulas da Tria', 'Linha do tempo: Festa da Uva 1993 até a Expointer 2013', 'Portfólio com filtro por frente de trabalho'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('tria: escolha em public/index.html');
