// Gera clientes/sartori/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/sartori/_origem/gerar.mjs
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
  console.log(`sartori: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#E9781F', fundo: '#1C1D1F', claro: '#F7F4F1',
  fonteTitulo: "Montserrat,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 23, texto: 'Mantém o menu lateral escuro com o logo laranja, como o site de hoje, e traz o bordô e o dourado dos rótulos Sartori para as seções. Os três selos das linhas abrem o catálogo.', pontos: ['Os selos Boitatá, Tradicional e Miúdos como na home atual', 'Cada corte com a foto e o rótulo de verdade', 'Canais de cada setor e horários, como hoje'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 23, texto: 'Menu no topo e um caminho visual do campo à mesa: criação, transporte em frota própria, pré-abate, abate, câmara fria e mesa, com a foto mudando a cada etapa.', pontos: ['Embalagens Boitatá em destaque logo na abertura', 'Linhas de produto com filtro Premium e Churrasco', 'Chamada para mercados que querem revender'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('sartori: escolha em public/index.html');
