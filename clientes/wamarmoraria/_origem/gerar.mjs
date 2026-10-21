// Gera clientes/wamarmoraria/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/wamarmoraria/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));

for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`wamarmoraria: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (precisa dos prints em assets/apresentacao/).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html><meta charset="utf-8"><title>W&amp;A</title><p><a href="/a/">Versão A</a> · <a href="/b/">Versão B</a></p>`);
  process.exit(0);
}
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#8DBE0A', fundo: '#07105A', claro: '#F4F5F7', corTextoBotao: '#0B1A0A',
  fonteTitulo: "'Arimo',Arial,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,700;1,700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site de hoje: a faixa verde do menu com os links em itálico, as fotos do parque industrial ao lado do texto da empresa e as mesmas páginas (A empresa, Produtos, Dicas, Contato, Orçamento), agora com fotos grandes e funcionando no celular.', pontos: ['As seis pedras do catálogo em amostras grandes', 'Do bloco bruto à obra, em cinco etapas com as fotos da W&A', 'Orçamento com visita: o cliente manda os dados da obra'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais moderna e com a pedra em primeiro plano: um leque de amostras no topo, um mostruário em que o cliente toca no nome e vê a chapa, e a comparação mármore ou granito.', pontos: ['Mostruário interativo das seis pedras', 'Linha do tempo do bloco até a peça instalada', 'Orçamento com tipo de peça, pedra e medidas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('wamarmoraria: escolha em public/index.html');
