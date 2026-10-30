// Gera clientes/energysolar/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/energysolar/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const total = {};
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  total[v] = Object.keys(paginas).length;
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`energysolar: versão ${v.toUpperCase()}, ${total[v]} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#66B837', fundo: '#1C6E52', claro: '#F4F5F2',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: 'Poppins,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,100..125,600..800;1,100..125,700..900&family=Poppins:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: total.a, texto: 'Fiel ao site de hoje: a faixa verde com o telefone, o "Instale energia solar" em verde itálico como o logo, o bloco "Economize até 95%", os serviços, as obras e o formulário de simulação. Sem o porquinho e sem o telefone gigante no banner.', pontos: ['Mesmas páginas e mesma ordem do site atual', 'Foto real de instalação e das obras de Salvador e Camaçari', 'Caminho da energia em desenho animado na página Como funciona'] },
    { letra: 'b', nome: nomesVersao.b, paginas: total.b, texto: 'Mais direta para quem quer saber quanto vai economizar: simulador da conta de luz logo na abertura, os kWp das obras em números grandes e o laranja do sol do logo como destaque.', pontos: ['Simulador de economia na conta de luz', 'Do painel ao medidor em quatro etapas ligadas', 'Fichas das obras com potência e cidade'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('energysolar: escolha em public/index.html');
