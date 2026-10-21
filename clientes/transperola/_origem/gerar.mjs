// Gera clientes/transperola/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/transperola/_origem/gerar.mjs
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
  console.log(`transperola: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
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
  nome: E.nome, url: E.url, lang: 'pt', cor: '#E30613', fundo: '#14107a', claro: '#fff8cc',
  fonteTitulo: "'Inter Tight',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Fiel ao site de hoje: o amarelo das carretas no topo, as três fotos da frota lado a lado, a faixa grafite de Atuação, Coleta e Tecnologia e o painel das filiais, agora com acabamento novo e funcionando no celular.', pontos: ['As mesmas 7 páginas do menu atual', 'Busca entre as 130 cidades atendidas', 'Os 11 endereços, telefones e WhatsApps'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'No azul e amarelo da apresentação comercial: um mapa com a rota de Guarulhos até cada filial, com distância e prazo de entrega, e a frota e a estrutura em números.', pontos: ['Mapa com distância e prazo por filial', 'Trajetória de 1964 até hoje', 'Cotação, coleta e rastreio num lugar só'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('transperola: escolha em public/index.html');
