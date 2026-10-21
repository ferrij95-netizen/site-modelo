// Gera clientes/herpin/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/herpin/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, produtos } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`herpin: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#C40000', fundo: '#0A0A6B', claro: '#FFDD00', corTextoBotao: '#fff',
  fonteTitulo: "Rubik,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,700;0,800;1,800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 13, texto: 'O amarelo da loja da Av. C-1 e a barra de menu azul do site atual, agora com os seis departamentos em destaque, uma prateleira dos mais procurados e listas prontas por tipo de negócio.', pontos: [`Os ${produtos.length} produtos com foto, busca e filtro`, 'Lista de pedido enviada pronta no WhatsApp', 'Tele-entrega própria explicada em 3 passos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 13, texto: 'Feita para quem compra toda semana: abre na busca, mostra o catálogo em lista com quantidade em cada item e deixa o pedido sempre à vista do lado.', pontos: ['Pedido rápido com quantidade por produto', 'Painel do pedido fixo enquanto navega', 'Listas prontas para marmitaria, lanchonete, açougue e limpeza'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('herpin: escolha em public/index.html');
