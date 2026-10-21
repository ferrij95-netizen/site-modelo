// Gera clientes/altapressao/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/altapressao/_origem/gerar.mjs
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
  console.log(`altapressao: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#0093DD', fundo: '#0B3B63', claro: '#EAF4FC',
  fonteTitulo: "Montserrat,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Segue o site atual da Alta Pressão: faixa azul, cabeçalho com funcionamento, telefone e os selos ISO, menu azul e a fachada na abertura, agora com as linhas do logo costurando as seções.', pontos: ['Mesma ordem e o mesmo azul do site atual', 'Serviços com fotos reais da oficina', 'Etapas do serviço em setas, do recebimento à entrega'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais técnica: abre na bancada de teste, mostra as quatro frentes em abas e desenha as seis etapas sobre a curva de pressão do logo.', pontos: ['Abertura com a foto da bancada de teste', 'Etapas sobre a curva de pressão do logo', 'Estrutura separada em usinagem, montagem e recuperação'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('altapressao: escolha em public/index.html');
