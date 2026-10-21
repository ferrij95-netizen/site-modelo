// Gera clientes/marmosp/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/marmosp/_origem/gerar.mjs
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
  console.log(`marmosp: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html><meta charset="utf-8"><title>${E.nome}</title><p><a href="/a/">Versão A</a> · <a href="/b/">Versão B</a></p>`);
  process.exit(0);
}
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#C8201A', fundo: '#2A2726', claro: '#F2F0EC',
  fonteTitulo: "'Montserrat',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon-a.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site e à loja de hoje: a placa vermelha vira o logo, a foto da fachada abre o site e o muro de granitos aparece como fundo. Mesma ordem do site atual (foto, Quem somos nós, Entre em contato), agora com ambientes, pedras e obras.', pontos: ['Logo redesenhado em vetor a partir da placa da fachada', 'Ambientes, pedras e obras com as fotos do Instagram', 'Orçamento direto no WhatsApp, telefone e mapa'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais sofisticada, com a identidade preta e dourada "MSP" do Instagram: a ilha em ônix abre o site, as pedras aparecem como uma biblioteca de chapas e as obras ganham fotos grandes.', pontos: ['Selo MSP preto e dourado do Instagram', 'Biblioteca de pedras: ônix, mármores, granitos', 'Etapas do orçamento à instalação'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('marmosp: escolha em public/index.html');
