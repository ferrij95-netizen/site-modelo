// Gera clientes/unidral/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/unidral/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, fotos } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`unidral: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#C69B12', fundo: '#1D1D1B', claro: '#F3F3F1',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Saira:wdth,wght@112.5..125,600..700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Fiel ao site de hoje: faixa dourada no topo, o logo no centro e o menu preto, agora com as fotos reais da oficina passando na abertura e funcionando no celular.', pontos: ['Produtos e serviços com fotos do próprio portfólio', 'Etapas do recondicionamento em setas', `Portfólio com ${fotos.length} trabalhos e filtro`] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Mais moderna e direta: abre com "máquina parada é sinônimo de prejuízo" e mostra, num desenho do cilindro, o serviço da Unidral em cada parte.', pontos: ['Desenho do cilindro: camisa, haste, vedações e olhais', 'Do recebimento à entrega em cinco etapas', 'WhatsApp e telefones sempre à mão'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('unidral: escolha em public/index.html');
