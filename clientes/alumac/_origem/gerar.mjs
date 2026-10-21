// Gera clientes/alumac/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/alumac/_origem/gerar.mjs
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
  console.log(`alumac: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#4f8fd6', fundo: '#0F1C4D', claro: '#eef3f8',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site de hoje e à fábrica: o azul do site atual, o letreiro ALUMAC pintado no muro da Rua Cuiabá e as frases da própria Alumac, agora organizados e funcionando no celular.', pontos: ['"A segurança da sua casa começa pelo portão" na abertura', 'Desenho do portão certo e do invertido', 'Aviso contra golpe em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais sóbria, no azul-marinho do selo "O melhor resultado, sempre!" que a Alumac põe nas fotos: mostra como a venda acontece e o catálogo em abas.', pontos: ['Etapas da medição à montagem', 'Seis linhas de produto em abas, com fotos reais', 'Vídeos do canal da Alumac'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('alumac: escolha em public/index.html');
