// Gera clientes/vilelapeloso/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/vilelapeloso/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao, balanca } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
fs.writeFileSync(path.join(pub, 'assets/favicon.svg'), balanca().replace('class="balanca"', 'xmlns="http://www.w3.org/2000/svg" style="color:#B79A60"').replace(/currentColor/g, '#B79A60'));
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`vilelapeloso: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#B79A60', fundo: '#32291E', claro: '#F6F1E8', corTextoBotao: '#32291E',
  fonteTitulo: 'Archivo,system-ui,sans-serif', fonteTexto: "'Source Sans 3',system-ui,sans-serif",
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Source+Sans+3:wght@400;600&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site de hoje: o papel de parede marrom, as faixas douradas nos títulos e "Quem somos" ao lado do "Andamento processual", agora com fotos grandes e versão de celular.', pontos: ['Faixas douradas e estante do site atual', 'As duas áreas com página própria e o que levar na primeira conversa', 'Pedido de usuário e senha do andamento pelo site'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais clara e organizada em torno do caminho do cliente: as duas áreas numeradas, os cinco passos do atendimento numa linha do tempo e os advogados logo na página inicial.', pontos: ['Títulos condensados como as faixas do site atual', 'Linha do tempo do caso, do atendimento ao andamento on-line', 'Endereço com mapa na página inicial'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('vilelapeloso: escolha em public/index.html');
