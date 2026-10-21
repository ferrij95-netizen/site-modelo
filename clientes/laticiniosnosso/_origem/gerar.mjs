// Gera clientes/laticiniosnosso/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/laticiniosnosso/_origem/gerar.mjs
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
  console.log(`laticiniosnosso: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (molduras e animações de componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Millano', artigo: 'da', url: E.url, lang: 'pt', cor: '#009de0', fundo: '#3d0010', claro: '#eef6f8',
  fonteTitulo: "'Roboto Slab',Georgia,serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 24, texto: 'Fiel ao site atual: faixa azul no topo, menu bordô, madeira, pasto verde e a linha de produtos, na mesma ordem de seções, sem as vaquinhas de desenho e com tudo alinhado.', pontos: ['Quem Somos, produtos e “Últimas do blog” na ordem de hoje', 'Fotos reais dos produtos, receitas e reportagens', 'Representantes por estado e formulário para novos representantes'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 24, texto: 'Mais moderna, com o xadrez azul e vermelho do rótulo e o queijo do reino na frente, contando a história desde 1992.', pontos: ['Linha de produtos clicável, do reino ao doce de leite', 'As cinco etapas de qualidade, do campo ao soro', 'Receitas, reportagens na TV e representantes em 13 estados'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('laticiniosnosso: escolha em public/index.html');
