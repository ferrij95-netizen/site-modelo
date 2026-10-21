// Gera clientes/cofril/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/cofril/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, produtos, receitas, noticias } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
let total = 0;
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  total = Object.keys(paginas).length;
  console.log(`cofril: versão ${v.toUpperCase()}, ${total} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#D71920', fundo: '#7A0F14', claro: '#FFF8EC',
  fonteTitulo: "Nunito,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: total, texto: 'O vermelho e o amarelo do site de hoje, com acabamento novo: os banners das campanhas da Cofril abrindo a página, os ícones das linhas de produto, a calculadora de churrasco e o mapa do Espírito Santo com os representantes.', pontos: [`${produtos.length} produtos, cada um com ingredientes e tabela nutricional`, 'Calculadora de churrasco funcionando direto na página', 'Mapa clicável dos representantes por cidade'] },
    { letra: 'b', nome: nomesVersao.b, paginas: total, texto: 'Mais institucional: abre na fábrica vista do alto e nos números da Cofril, mostra o caminho da granja à mesa, o quadro de prêmios e um catálogo em formato de ficha técnica, pensado também para o comprador do mercado.', pontos: ['1.400 colaboradores, 2.400 t/mês e 18 mil animais/mês em destaque', `Quadro de prêmios e ${noticias.length} notícias`, `${receitas.length} receitas com vídeo`] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('cofril: escolha em public/index.html');
