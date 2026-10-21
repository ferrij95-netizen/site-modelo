// Gera clientes/finoalimentos/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/finoalimentos/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const contagem = {};
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  contagem[v] = Object.keys(paginas).length;
  console.log(`finoalimentos: versão ${v.toUpperCase()}, ${contagem[v]} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#DE242A', fundo: '#0D562E', claro: '#F7F3EA',
  fonteTitulo: "'Roboto Slab',Georgia,serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: contagem.a, texto: 'Mantém o desenho do site de hoje, agora completo: o saco de amido sobre a lavoura de mandioca, o "Quem somos?" com os círculos vermelhos e o menu de produtos, com a força do vermelho do logo.', pontos: ['Fecularia em números: 250 t/dia de moagem, 70 t/dia de produto', 'As nove aplicações em mosaico de fotos, cada uma com página própria', 'Da lavoura ao caminhão em seis etapas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: contagem.b, texto: 'Feita a partir da embalagem da Fino: topo vermelho, papel creme e faixa verde como o saco de 25 kg, com um rótulo de produto na abertura e uma ficha técnica em cada linha.', pontos: ['Do campo ao saco: foto fixa que troca a cada etapa', 'Índice das nove linhas com tipo de amido e aplicações', 'Laudo de qualidade e energia da caldeira em gráfico'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('finoalimentos: escolha em public/index.html');
