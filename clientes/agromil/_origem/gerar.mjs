// Gera clientes/agromil/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/agromil/_origem/gerar.mjs
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
  console.log(`agromil: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#a8c840', fundo: '#0b4d2c', claro: '#f2f6ee',
  fonteTitulo: 'Montserrat,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site atual: fundo branco, o logo em destaque e os três vendedores logo na primeira tela, agora com fotos, linhas de sementes e mapa.', pontos: ['Vendedores com telefone e WhatsApp na primeira tela', 'Mosaico com as seis linhas de sementes', 'Funciona bem no celular, com acentos corrigidos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna: foto de abertura em tela cheia, o caminho da semente até a colheita e uma faixa marrom de vendas com as cores do logo.', pontos: ['Ciclo da semente em cinco etapas com fotos', 'Lista de sementes que vai pronta para o WhatsApp do vendedor', 'Pedido de orçamento direto pelo site'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('agromil: escolha em public/index.html');
