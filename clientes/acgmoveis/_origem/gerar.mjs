// Gera clientes/acgmoveis/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/acgmoveis/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, produtos, representantes } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`acgmoveis: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const n = Object.keys(gerarVersao('a')).length;
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#81a249', fundo: '#1f4448', claro: '#f2f3f1',
  fonteTitulo: "Marcellus,Georgia,serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: n, texto: 'Clara como o catálogo 2024, com o teal e o verde do logo e os produtos em primeiro plano.', pontos: [`${produtos.length} produtos com referências e medidas`, 'Desenho dos tampos em escala, como no catálogo', 'Catálogo em PDF sempre a um clique'] },
    { letra: 'b', nome: nomesVersao.b, paginas: n, texto: 'Foto em tela cheia como o site atual, com os quadros teal e verde do logo e os ambientes mudando ao rolar.', pontos: ['Abertura com o mesmo clima do site atual', 'Linhas de produto nos quadros do logo', `${representantes.length} representantes por estado`] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('acgmoveis: escolha em public/index.html');
