// Gera clientes/haramaq/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/haramaq/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const total = {};
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [caminho, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  total[v] = Object.keys(paginas).length / 2;
  console.log(`haramaq: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas (pt e es)`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#d71920', fundo: '#1e1d23', claro: '#f6f5f2',
  fonteTitulo: "'Roboto Slab',Georgia,serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: total.a, texto: 'A cara do site de hoje, mais bem acabada: faixas escuras, vermelho HaramaQ e a mesma ordem da página inicial.', pontos: ['Fotos de confinamento e free stall passando no topo', 'As 10 máquinas nos círculos vermelhos', 'Português e espanhol de verdade, com as bandeiras'] },
    { letra: 'b', nome: nomesVersao.b, paginas: total.b, texto: 'Mais industrial: as máquinas separadas por sistema e o trato mostrado etapa por etapa, da colheita ao cocho.', pontos: ['Linha completa em abas: leite, corte, compost barn', 'Seis etapas do trato com a máquina de cada uma', 'Orçamento direto no WhatsApp em toda página'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('haramaq: escolha em public/index.html');
