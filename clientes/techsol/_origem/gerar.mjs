// Gera clientes/techsol/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/techsol/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, segmentos } from './conteudo.mjs';

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
  console.log(`techsol: versão ${v.toUpperCase()}, ${total[v]} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#FFAB00', fundo: '#0079B9', claro: '#F5F5F5',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: 'Poppins,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,700;1,800;1,900&family=Poppins:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: total.a, texto: 'Fiel ao site de hoje: o banner do telhado com a caixa âmbar sobre a caixa azul, o painel na grama com as folhas, os serviços sobre o campo solar e o bloco âmbar do WhatsApp, agora com a letra do logo e certo no celular.', pontos: ['Mesma ordem de seções da página atual', 'Etapas do projeto num arco do sol', `Página para cada um dos ${segmentos.length} tipos de cliente e para financiamento`] },
    { letra: 'b', nome: nomesVersao.b, paginas: total.b, texto: 'Mais direta para quem quer saber quanto vai economizar: simulador da conta de luz logo na abertura, os números da Techsol e a foto aérea do Frama Atacadista.', pontos: ['Simulador de economia na conta de luz', 'Residência, comércio, indústria e agro em abas', 'Etapas, serviços e bancos em formato de ficha'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('techsol: escolha em public/index.html');
