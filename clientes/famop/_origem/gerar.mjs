// Gera clientes/famop/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/famop/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, maquinas } from './conteudo.mjs';

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
  console.log(`famop: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
const n = 4 + maquinas.length;
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Famop', url: E.url, lang: 'pt', cor: '#e3062d', fundo: '#4d0000', claro: '#f4f2f1',
  fonteTitulo: 'Rubik,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Rubik:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: n, texto: 'Fiel ao site de hoje: o fundo vinho, o quadro branco com o logo e a retificadora esmaecendo, a faixa cinza "Desde 1964 Tradição e Qualidade" e a barra de menu grafite. A abertura em Flash, que hoje não abre, foi refeita sem plugin.', pontos: ['As máquinas lado a lado, como na página de equipamentos atual', 'Ficha técnica e acessórios de cada máquina numa página só', 'Do bloco ao virabrequim: uma máquina para cada etapa', 'Português e inglês, como o site atual'] },
    { letra: 'b', nome: nomesVersao.b, paginas: n, texto: 'Mais clara e técnica: a máquina sobre fundo branco com a linha de medida de desenho técnico, os números que o dono de retífica procura e a escolha da máquina pelo serviço.', pontos: ['"O que a sua retífica precisa usinar?": cilindros, bielas ou virabrequins', 'Comparação lado a lado das retificadoras de virabrequins', 'Estojos de peças com os números da foto', 'Orçamento por e-mail já com a máquina escolhida'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('famop: escolha em public/index.html');
