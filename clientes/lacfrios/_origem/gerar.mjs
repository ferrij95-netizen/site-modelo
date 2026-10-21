// Gera clientes/lacfrios/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/lacfrios/_origem/gerar.mjs
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
  console.log(`lacfrios: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#DA251C', fundo: '#173F6E', claro: '#F3F6FA',
  fonteTitulo: "'Barlow',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,600;0,700;0,800;1,700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Feita a partir do logo: o azul do losango com as linhas brancas cortando, o vermelho do nome nos botões. Catálogo por categoria com foto, como uma vitrine de balcão de frios.', pontos: ['Os doze queijos do site viram botões que vão direto para a lista de pedido', 'Lista pronta para cada tipo de negócio: hotel, pizzaria, padaria e outros', 'A Kombi de entrega, a fábrica e as receitas do site atual'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Mais direta, com cara de talão de pedido: busca logo na abertura, catálogo em tabela e a lista de pedido sempre ao lado, pronta para mandar pelo WhatsApp.', pontos: ['Busca de produto na primeira tela', 'Catálogo em tabela com a lista ao lado, no computador e no celular', 'Envio do pedido com quantidade, unidade e endereço de entrega'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('lacfrios: escolha em public/index.html');
