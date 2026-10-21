// Gera clientes/andradelopes/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/andradelopes/_origem/gerar.mjs
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
  console.log(`andradelopes: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#C8A031', fundo: '#2B2725', claro: '#F4F2EF', corTextoBotao: '#221E1C',
  fonteTitulo: 'Jost,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Jost:wght@500;600&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 19, texto: 'Fiel ao site de hoje: a faixa grafite com o logo, a engrenagem dourada marcando o menu e os títulos, o banner com as fotos do site e os profissionais associados ao lado do texto.', pontos: ['Banner com as fotos do site atual, agora sem Flash', 'Os 12 trabalhos do portfólio com página própria', 'Clientes e entidades com os logos de verdade'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 19, texto: 'Mais sóbria, com cara de laudo técnico: a abertura é uma ficha com objeto, finalidade e métodos, as etapas do trabalho numa linha e o portfólio em tabela.', pontos: ['Abertura em forma de ficha de laudo', 'Etapas, da vistoria ao laudo, numa linha', 'Portfólio em tabela com filtro por finalidade'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('andradelopes: escolha em public/index.html');
