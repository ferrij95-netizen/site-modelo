// Gera clientes/fortalimentos/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/fortalimentos/_origem/gerar.mjs
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
  console.log(`fortalimentos: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#FBC531', corTextoBotao: '#7C1E22', fundo: '#7C1E22', claro: '#FFF8EC',
  fonteTitulo: "'Alegreya Sans SC',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: Object.keys(gerarVersao('a')).length, texto: 'A estrutura que o cliente da Fort já conhece, sem a toalha xadrez e o mapa no lugar do banner: logo e telefones no topo, o menu na faixa amarela e o vermelho do logo abrindo o site com os produtos de verdade.', pontos: ['Busca de produto logo na abertura', 'Prateleira com os destaques da home de hoje', 'Disk Entrega Sorocaba e Região com telefone e WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: Object.keys(gerarVersao('a')).length, texto: 'O site vira o balcão de pedidos do atacado: busca e lista de pedido sempre no topo, catálogo em linhas com quantidade e as três etapas do pedido até a entrega.', pontos: ['Catálogo com filtro por categoria e marca', 'Lista de pedido que sai pronta no WhatsApp', 'Uma página por produto, marca e receita'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('fortalimentos: escolha em public/index.html');

