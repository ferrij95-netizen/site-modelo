// Gera clientes/dhiozer/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/dhiozer/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, catalogo } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [caminho, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`dhiozer: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Dhiozer', url: E.url, lang: 'pt', cor: '#fbd107', fundo: '#0068a0', claro: '#f6f4ee', corTextoBotao: '#2b2a29',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,700;112,800;112,900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 14, texto: 'Fiel ao site de hoje: logo no centro com o menu embaixo, a foto da sede na abertura, o amarelo do botão do WhatsApp, a linha do tempo amarela e o rodapé grafite com a curva. Agora com catálogo de verdade e funcionando no celular.', pontos: [`${catalogo.length} produtos tirados dos catálogos em PDF, com foto e embalagem`, 'As seis marcas na ordem da home atual, com amostra de produtos', 'Pedido enviado pronto ao WhatsApp do supervisor da região', 'História de 1997 a 2022 com as fotos antigas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 14, texto: 'Um balcão de pedidos no azul do logo: o comprador do mercado busca o produto no topo, passa pelas prateleiras por categoria e monta o pedido sem esperar a visita do vendedor.', pontos: ['Busca em todas as páginas e atalhos para os itens que mais giram', 'Prateleiras: chocolates, biscoitos, temperos, sobremesas, balas, iluminação', 'Filtro por marca e categoria, em grade ou em lista', 'Mapa da área de atuação com Lucas (Oeste) e Juliano (Meio Oeste)'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('dhiozer: escolha em public/index.html');
