// Gera clientes/ultramix/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/ultramix/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, catalogo as C, cidades } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`ultramix: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const n = C.produtos.length;
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#F48120', fundo: '#023F87', claro: '#F3F6FA',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Saira:wdth,wght@100..125,500..800&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 26, texto: 'Fiel ao site de hoje: o logo com o cata-vento, a faixa azul do menu, o banner da Trento, a vitrine "Na ULTRAMIX você encontra os melhores produtos" e as marcas, agora com busca e lista de orçamento.', pontos: [`Catálogo com os ${n} produtos, busca e filtro por departamento e marca`, 'Lista de orçamento que sai pronta pelo WhatsApp', `Mapa e consulta das ${cidades.length} cidades atendidas`] },
    { letra: 'b', nome: nomesVersao.b, paginas: 26, texto: 'O site como ferramenta de compra para mercados, padarias e bares: busca grande no topo, 12 departamentos, filtros ao lado e a lista de orçamento sempre à vista enquanto o comprador navega.', pontos: ['Busca com sugestões e fotos já no topo de todas as páginas', 'Departamentos, marcas e "como comprar" em três passos', 'Painel do orçamento ao lado do catálogo'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('ultramix: escolha em public/index.html');
