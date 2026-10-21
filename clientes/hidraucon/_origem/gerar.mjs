// Gera clientes/hidraucon/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/hidraucon/_origem/gerar.mjs
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
  console.log(`hidraucon: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#FBA832', fundo: '#1d1d1b', claro: '#FFF3E0', corTextoBotao: '#1d1d1b',
  fonteTitulo: 'Rubik,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Rubik:wght@700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 9, texto: 'Segue o site atual da Hidraucon: logo, "fazendo melhor" e os dois telefones no topo, menu cinza, a faixa preta e laranja sobre os banners, quem somos no painel cinza e as três linhas com "Veja aqui".', pontos: ['Mesma ordem, cores e banners do site atual', 'Catálogo com busca e lista de orçamento', 'Pedido de mangueira montada enviado para Porto Alegre ou Guaíba'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 9, texto: 'O site como ferramenta de venda: abre na busca de produtos e mostra as bitolas em escala, as faixas de pressão num manômetro e as 24 aplicações da linha industrial.', pontos: ['Busca de produto logo na abertura', 'Régua das 13 bitolas e manômetro de pressão', 'Pedido em 4 passos: linha, bitola e pressão, pontas, medida'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('hidraucon: escolha em public/index.html');
