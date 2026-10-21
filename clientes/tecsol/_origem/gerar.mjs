// Gera clientes/tecsol/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/tecsol/_origem/gerar.mjs
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
  console.log(`tecsol: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#00A3E0', fundo: '#0b3a5c', claro: '#eef7fc',
  fonteTitulo: "Rubik,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Rubik:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site de hoje: o fundo de água azul-claro, os filtros recortados e o rodapé azul com as três unidades, agora com acabamento novo, seguro e funcionando no celular.', pontos: ['Corte do filtro mostrando as 6 camadas (carvão e quartzo)', 'Limpeza semanal explicada em 3 passos', 'Os 6 modelos com foto e pedido de orçamento'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna e de indústria: abre com a fábrica em Piracicaba, e o cliente escolhe o filtro arrastando a vazão, de 500 a 10.000 litros por hora.', pontos: ['"Quanta água filtrada você precisa por hora?"', '"Da chapa ao telhado" com as fotos da fábrica', 'Aquecedor solar peça por peça, com os dados técnicos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('tecsol: escolha em public/index.html');
