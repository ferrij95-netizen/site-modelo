// Gera clientes/medline/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/medline/_origem/gerar.mjs
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
  for (const [caminho, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`medline: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#00616e', fundo: '#062a2f', claro: '#f2f5f5',
  fonteTitulo: "'Inter Tight',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Fiel ao site de hoje: fundo branco, a faixa de menu verde-petróleo e a esfera de palavras da Medline na abertura, agora sem Flash, com os três segmentos em painéis altos como no site atual.', pontos: ['Esfera de palavras e "Seja bem-vindo" da home atual', 'Uma página por segmento com as marcas e os produtos', 'Contato com os mesmos campos do formulário de hoje'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Mais de imagem: abertura com foto de centro cirúrgico, os segmentos em faixas largas com as marcas de cada um e os compromissos da empresa contados em etapas.', pontos: ['Logos das marcas passando logo abaixo da abertura', 'Linha YNS com benefícios, modo de uso e ingredientes', 'Mapa em tela cheia com o botão "Como chegar"'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('medline: escolha em public/index.html');
