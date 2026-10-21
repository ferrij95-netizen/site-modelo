// Gera clientes/coomat/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/coomat/_origem/gerar.mjs
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
  console.log(`coomat: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (molduras e animações de componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Coomat', artigo: 'da', url: E.url, lang: 'pt', cor: '#00a859', fundo: '#0b3a22', claro: '#f4f2e3',
  fonteTitulo: "Montserrat,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site atual: verde-lima no topo, faixa verde, creme e oliva, na mesma ordem de seções, com acabamento novo.', pontos: ['Mesmas seções: Qualidade, Assistência, Insumo, Você sabia? e as melhores marcas', 'Fotos reais da festa dos 60 anos', 'Matriz e quatro filiais com telefone e e-mail de cada uma'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais moderna, com o verde e o amarelo do logo, contando os 60 anos de cooperação.', pontos: ['Linha do tempo de 1964 a 2024', 'Missão, visão e princípios da cooperativa', 'Edital da assembleia e contato por unidade'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('coomat: escolha em public/index.html');
