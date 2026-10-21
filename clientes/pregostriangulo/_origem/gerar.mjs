// Gera clientes/pregostriangulo/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/pregostriangulo/_origem/gerar.mjs
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
  console.log(`pregostriangulo: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#E8003A', fundo: '#1c1d1f', claro: '#f1f1f0',
  fonteTitulo: "'Source Sans 3',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@700;800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site de hoje: faixa vermelha no topo, o selo do logo e as abas "Escolha o tipo de produto" com os ícones originais, agora com acabamento novo e funcionando no celular.', pontos: ['Fotos do site atual em destaque, passando sozinhas', 'Abas de produto com as tabelas completas', 'Lista de orçamento enviada por e-mail ou WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna e direta: o cliente escolhe pelo uso (telhado, fôrmas, caixas, cercas) e vê cada prego desenhado em escala, com milímetros e bitola.', pontos: ['"Qual prego para o seu trabalho?" com pregos em escala', 'As 8 linhas da fábrica numa lista só', 'Como comprar em três passos, com os vendedores'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('pregostriangulo: escolha em public/index.html');
