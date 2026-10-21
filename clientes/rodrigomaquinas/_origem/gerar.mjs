// Gera clientes/rodrigomaquinas/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/rodrigomaquinas/_origem/gerar.mjs
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
  console.log(`rodrigomaquinas: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const escolha = paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#00a5f3', fundo: '#243346', claro: '#eef5f9',
  fonteTitulo: "Alegreya,Georgia,serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Alegreya:wght@700;800&family=Inter:wght@400;500;600&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 23, texto: 'Fiel ao site de hoje: a faixa azul do menu, o logo oval com o endereço ao lado, a busca, as categorias à esquerda e a vitrine com o preço em vermelho, agora grande e no celular.', pontos: ['Fotos aéreas do pátio na abertura', 'Uma página para cada uma das 19 máquinas, com 4 fotos e zoom', 'Botão "Quero esta máquina" que já leva o modelo'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 23, texto: 'O pátio como uma lista de estoque: filtro por tipo, busca, ordem por preço ou ano, e em cada máquina o comparativo com as outras do mesmo tipo.', pontos: ['Linha do tempo com o ano de cada máquina', 'Comparativo de preço entre máquinas do mesmo tipo', '"Sua máquina entra no negócio": compra e troca em 3 passos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
fs.writeFileSync(path.join(pub, 'index.html'), escolha);
console.log('rodrigomaquinas: escolha em public/index.html');

