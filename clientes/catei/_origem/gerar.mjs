// Gera clientes/catei/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/catei/_origem/gerar.mjs
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
  console.log(`catei: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#D2281A', fundo: '#141414', claro: '#F6F4EF',
  fonteTitulo: "'Russo One',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Russo+One&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Feita a partir do próprio galpão da Catei: o branco com a faixa azul na base, o nome em vermelho e os oito serviços como portas de doca numeradas.', pontos: ['Abre com a foto do galpão com o nome na fachada', 'Os números que pesam na decisão: 7.600 m³, -25 °C, 15 t', 'Localização com mapa e telefone sempre à mão'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais forte, com o preto e o dourado do selo de 56 anos: mostra a carga descendo a régua de temperatura, da doca até a câmara, e compara o prédio antigo com o de hoje.', pontos: ['Os oito serviços na ordem em que a carga passa por eles', 'Foto antiga e foto de hoje lado a lado, com a linha para arrastar', 'Vantagens em formato de ficha, fácil de comparar'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('catei: escolha em public/index.html');
