// Gera clientes/rtsengenharia/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/rtsengenharia/_origem/gerar.mjs
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
  console.log(`rtsengenharia: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'do', url: E.url, lang: 'pt', cor: '#1EAEEB', fundo: '#1D2140', claro: '#EEF1F6', corTextoBotao: '#14182F',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 12, texto: 'Fiel ao site de hoje: o banner da prancheta com o prédio de vidro, o menu em abas e os três losangos de Projetos, Consultorias e Instalações, com acabamento novo.', pontos: ['Os textos e as fotos do site atual, organizados', 'Uma página para cada uma das oito disciplinas', 'Contato com mapa e pedido de orçamento pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 12, texto: 'A mesma marca com cara de desenho técnico: carimbo de prancha na abertura, disciplinas como a legenda de um projeto e o fluxo da consultoria à instalação.', pontos: ['Carimbo de prancha com os dados da empresa', 'Disciplinas em formato de legenda, cada uma com sua folha', 'Etapas do projeto numa linha que acompanha a rolagem'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('rtsengenharia: escolha em public/index.html');
