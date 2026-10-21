// Gera clientes/bittencourt/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/bittencourt/_origem/gerar.mjs
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
  console.log(`bittencourt: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.completo, artigo: 'da', url: E.url, lang: 'pt', cor: '#B3163D', fundo: '#1D1D1F', claro: '#F1F1F1',
  fonteTitulo: "'PT Sans Narrow',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 12, texto: 'Fiel ao site de hoje: topo grafite com o brasão, a faixa vermelha do menu, as frases do slider e a premiação na lateral, agora com fotos grandes de Vitória e funcionando no celular.', pontos: ['Brasão em destaque e títulos em duas cores, como hoje', 'Áreas de atuação em abas, com foto e o que cada uma cobre', 'Etapas da mediação e arbitragem e a equipe com currículos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 12, texto: 'Mais clara e direta, puxando para o que diferencia o escritório: a atuação portuária. Áreas como sumário de um livro jurídico e a formação do fundador como uma rota pelo mundo.', pontos: ['Áreas numeradas como um sumário', 'Do terminal ao Tribunal Marítimo numa rota', 'Formação do fundador: Belo Horizonte, Tóquio, Roterdã, Harvard e Vitória'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('bittencourt: escolha em public/index.html');
