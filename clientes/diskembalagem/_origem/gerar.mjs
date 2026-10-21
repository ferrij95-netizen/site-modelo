// Gera clientes/diskembalagem/public/{index.html,a/,b/,assets/catalogo.json}. Rodar depois de mudar qualquer texto:
// node clientes/diskembalagem/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao, catalogoJSON } from './paginas.mjs';
import { empresa as E, totalProdutos } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
fs.writeFileSync(path.join(pub, 'assets/catalogo.json'), catalogoJSON());

let n = 0;
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [caminho, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  n = Object.keys(paginas).length;
  console.log(`diskembalagem: versão ${v.toUpperCase()}, ${n} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Disk Embalagens</title><p><a href="/a/">Versão A</a> · <a href="/b/">Versão B</a></p>`);
  process.exit(0);
}
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Disk Embalagens', url: E.url, lang: 'pt', cor: '#ff4110', fundo: '#004a5c', claro: '#eef5f6', artigo: 'da',
  fonteTitulo: 'Dosis,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Dosis:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: n, texto: 'Fiel ao site de hoje: o logo com a atendente, os telefones em laranja no alto, a busca "por nome ou referência", os três banners, os Produtos em Destaque e a faixa laranja do rodapé. Agora funciona no celular.', pontos: [`Os ${totalProdutos} produtos do site atual, com foto, por categoria e subcategoria`, 'Menu de produtos aberto com todas as linhas', 'Lista de orçamento: escolhe, põe a quantidade e envia', 'Como pedir em quatro passos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: n, texto: 'O site como balcão de vendas: a busca no centro com sugestões e foto enquanto digita, compra por ambiente (copa, banheiros, restaurantes, expedição) e a lista sempre à mão.', pontos: ['Busca com sugestões e os itens mais procurados', 'Quantidade direto no produto, sem abrir página', 'Compra por ambiente da empresa', 'Lista lateral e barra fixa no celular'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('diskembalagem: escolha em public/index.html');
