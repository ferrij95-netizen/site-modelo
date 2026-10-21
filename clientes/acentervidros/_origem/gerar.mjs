// Gera clientes/acentervidros/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/acentervidros/_origem/gerar.mjs
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
  console.log(`acentervidros: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (molduras e animações de componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'A Center Vidros', artigo: 'da', url: E.url, lang: 'pt', cor: '#31699a', fundo: '#0f2f4f', claro: '#f2f4f6',
  fonteTitulo: "Saira,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Saira:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 10, texto: 'Fiel ao site atual: barra escura no topo, a foto da sede em diagonal, o azul do site e as mesmas seções na mesma ordem, com acabamento novo.', pontos: ['Compromisso, Qualidade e Agilidade abrindo o site', 'Galeria de produtos com filtro, como hoje, e uma página para cada linha', 'Botão do e-commerce sempre à mão'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 10, texto: 'Mais moderna, com o azul-marinho do logo e o vermelho do letreiro da fachada, mostrando como a chapa vira peça pronta.', pontos: ['As cinco etapas da peça desenhadas, do corte ao bisotê', 'Construção civil, arquitetura e indústria moveleira lado a lado', 'Orçamento pelo WhatsApp com o nome do produto'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('acentervidros: escolha em public/index.html');
