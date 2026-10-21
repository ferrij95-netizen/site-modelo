// Gera clientes/copermutum/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/copermutum/_origem/gerar.mjs
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
  console.log(`copermutum: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (molduras e animações de componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#83cf32', fundo: '#0f2a18', claro: '#f6f3ea',
  fonteTitulo: "Nunito,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site atual: topo marrom, faixas verde-lima e fundo bege, na mesma ordem de seções, com acabamento novo.', pontos: ['Mesmas seções do site atual: Cooperativa, Granja UPL, Fábrica, Parceiros e Contato', 'Do grão do cooperado à carne em cinco etapas', 'Funciona bem no celular'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais moderna, com o verde e o amarelo do logo, contando a cadeia completa e a energia do biogás.', pontos: ['Cadeia completa: lavoura, ração, granja, terminação e frigorífico', 'Ciclo do biodigestor que gera energia para a granja', 'Área do cooperado com edital, balanço e webmail'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('copermutum: escolha em public/index.html');
