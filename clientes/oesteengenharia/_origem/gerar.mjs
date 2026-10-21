// Gera clientes/oesteengenharia/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/oesteengenharia/_origem/gerar.mjs
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
  console.log(`oesteengenharia: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#C33A3B', fundo: '#22375C', claro: '#EDF1F7',
  fonteTitulo: "Cabin,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Cabin:wght@600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/esfera.svg', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 11, texto: 'Fiel ao site de hoje: a faixa azul com a esfera vermelha, as fotos das seis áreas passando na abertura e o lema "A escolha certa faz toda a diferença", com acabamento novo.', pontos: ['Fotos das obras em destaque, área por área', 'Etapas do empreendimento numa linha com a mira do logo', 'Página própria para cada área com as realizações'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 11, texto: 'Mais técnica, como um levantamento: papel quadriculado, ficha da empresa, as etapas desenhadas como uma poligonal e as realizações numa caderneta de campo.', pontos: ['Foto da equipe em campo dentro de um visor de estação total', 'Etapas do empreendimento como poligonal topográfica', 'Caderneta com as 27 realizações e filtro por área'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('oesteengenharia: escolha em public/index.html');
