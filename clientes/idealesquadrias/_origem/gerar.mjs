// Gera clientes/idealesquadrias/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/idealesquadrias/_origem/gerar.mjs
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
  console.log(`idealesquadrias: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#EE8E11', fundo: '#042E46', claro: '#f3f5f7',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@700;800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`, artigo: 'da',
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Fiel ao site de hoje: branca, com a faixa amarela do menu, "Quem somos", "Oferecemos", a faixa verde do orçamento por WhatsApp e "Alguns trabalhos", agora com fotos grandes e funcionando no celular.', pontos: ['As fotos das obras em destaque, que ampliam ao tocar', 'Os produtos em vitrine, com fotos de cada linha', 'Orçamento pelo WhatsApp em todas as páginas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Mais moderna, no azul do logo: "Arte em alumínio" na abertura e a janela de quatro vidros do logo como desenho das seções.', pontos: ['Fotos montadas como uma janela de quatro vidros', 'Linha de produtos numerada, de 01 a 07', 'Do orçamento à colocação em 4 etapas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('idealesquadrias: escolha em public/index.html');
