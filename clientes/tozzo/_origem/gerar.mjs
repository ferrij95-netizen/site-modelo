// Gera clientes/tozzo/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/tozzo/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

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
  console.log(`tozzo: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'do', url: E.url, lang: 'pt', cor: '#00A859', fundo: '#0B3D24', claro: '#EEF5E4',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@1,112,800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 10, texto: 'Fiel ao site de hoje: o topo verde, a faixa com os logos das cinco empresas e as frases de cada uma no banner, agora com fotos grandes, títulos no itálico do logo e o caminho do grão à entrega.', pontos: ['Banner com as cinco empresas e as fotos de vocês', '"Do grão à entrega": Cerealista, Distribuidora, Atacado e Transtozzo', 'Página própria para cada empresa do grupo'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 10, texto: 'Pensada para vender: a busca de marcas logo na abertura, o catálogo por categoria e a lista de cotação que o cliente monta clicando nas marcas e manda pronta para o comercial.', pontos: ['Busca entre as marcas parceiras na abertura', 'Catálogo em 8 categorias com lista de cotação', 'Linha Feijão Tozzo na prateleira'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('tozzo: escolha em public/index.html');
