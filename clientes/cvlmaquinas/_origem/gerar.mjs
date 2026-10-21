// Gera clientes/cvlmaquinas/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/cvlmaquinas/_origem/gerar.mjs
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
  console.log(`cvlmaquinas: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
// Amarelo do logo como destaque: o texto dos botões fica azul para ter contraste e o brilho do fundo fica azul (amarelo sobre azul vira verde).
const escolha = paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#F5C400', fundo: '#063a66', claro: '#eef2f6',
  fonteTitulo: "Saira,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Saira:wdth,wght@100..125,500..800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 24, texto: 'Fiel ao site de hoje: a faixa azul com a linha amarela, o selo CVL e a vitrine de máquinas como nos banners atuais, agora em tela cheia e no celular.', pontos: ['Vitrine com Máxima, Futura V, LVB e PMP-102', 'Uma página para cada uma das 19 máquinas', 'Cartão BNDES, Proger e representantes na home'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 24, texto: 'Mais técnica: mostra o caminho da chapa dentro da fábrica, do corte ao lixamento, e a máquina CVL de cada etapa, com fichas e cotas.', pontos: ['"Do painel ao móvel" em cinco etapas', 'Comparativo das cinco seccionadoras', 'Catálogo com busca e filtro por linha'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
fs.writeFileSync(path.join(pub, 'index.html'), escolha.replace('</style>', '.es-btn{color:#063a66}.es-escolha a:hover{border-color:#F5C400}.es-intro,.es-fim{background:radial-gradient(900px 600px at 80% 15%,rgba(29,111,184,.7),transparent 65%),linear-gradient(180deg,#063a66,#05305a)}.es-intro{border-bottom:8px solid #F5C400}</style>'));
console.log('cvlmaquinas: escolha em public/index.html');
