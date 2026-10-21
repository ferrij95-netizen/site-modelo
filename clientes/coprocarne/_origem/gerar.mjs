// Gera clientes/coprocarne/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/coprocarne/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, linhas } from './conteudo.mjs';
const total = linhas.reduce((s, l) => s + l.itens.length, 0);

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const n = {};
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  n[v] = Object.keys(paginas).length;
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`coprocarne: versão ${v.toUpperCase()}, ${n[v]} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#4A80CC', fundo: '#0E2547', claro: '#F3F5F8',
  fonteTitulo: "'EB Garamond',Georgia,serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif",
  googleFonts: 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@600;700&family=Source+Sans+3:wght@400;500;600&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: n.a, texto: 'O site de hoje, refeito com calma: a faixa cinza com a placa azul do logo, o menu azul com as mesmas sete páginas e os três painéis da home (Ouro do Sul, as silhuetas do boi, do embutido e do porco, e o mapa), agora grandes e com as fotos do banner.', pontos: ['As fotos do banner em Flash voltam a aparecer, agora no celular também', 'Lista de bovinos, embutidos e suínos com código e busca', 'Transporte refrigerado e a parceria Ouro do Sul em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: n.b, texto: 'Pensada para quem compra: abre com uma busca por produto ou código, mostra a rota de 70 km do frigorífico em Harmonia até Porto Alegre e deixa o cliente marcar os itens e mandar a lista do pedido por e-mail.', pontos: [`Catálogo único com os ${total} itens, filtro por linha e busca`, 'Lista do pedido que vai por e-mail ou copiada', 'Faixas de temperatura do transporte em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('coprocarne: escolha em public/index.html');
