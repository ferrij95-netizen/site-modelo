// Gera clientes/thermotech/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/thermotech/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`thermotech: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#2F5BD3', fundo: '#0F1F5C', claro: '#EEF2FB',
  fonteTitulo: "Arimo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,700;1,700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site de hoje: abre na foto aérea da fábrica, com o logo em itálico azul-marinho, o telefone em destaque e o menu em abas, agora com acabamento novo e funcionando no celular.', pontos: ['Os 6 números da fábrica logo na entrada', 'Curva de cada um dos 10 tratamentos', 'Galeria com as 64 fotos, separadas por tipo', 'Português e inglês, no lugar do tradutor do Google'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais clara e técnica: abre na carga incandescente e fala direto com o comprador da fundição, com a curva de temperatura de cada tratamento, a ficha da planta e o pedido de orçamento com material e peso.', pontos: ['"Escolha o tratamento e veja o ciclo"', 'Tabela com faixa típica e resfriamento', 'Certificado com curva e laboratório próprio', 'Pedido de orçamento com material e peso da carga'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('thermotech: escolha em public/index.html');
