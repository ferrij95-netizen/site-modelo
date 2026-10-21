// Gera clientes/vergalhao/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/vergalhao/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, totalProdutos } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`vergalhao: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#ffdd1f', fundo: '#0a3768', claro: '#f2f4f7',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site de hoje: faixa amarela, telefone grande no topo e a abertura dividida entre Agropecuária e Construção civil, agora com fotos grandes, catálogo com busca e funcionando no celular.', pontos: [`Catálogo com ${totalProdutos} produtos, busca e foto ampliada`, 'Marcas representadas com logo e as linhas de cada uma', 'As duas lojas com mapa, telefone e rota'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'O catálogo na frente: busca no topo de todas as páginas, os corredores do agro e da obra com todas as linhas e pedido de orçamento pelo WhatsApp em cada produto.', pontos: ['Busca de produtos em qualquer página', 'Corredores com todas as linhas da loja', 'Orçamento pelo WhatsApp com o nome e o código do produto'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('vergalhao: escolha em public/index.html');
