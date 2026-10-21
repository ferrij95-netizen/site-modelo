// Gera clientes/burmann/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/burmann/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [chave, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, chave.replace(/(^|\/)index$/, ''));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`burmann: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#FFC600', corTextoBotao: '#191919', fundo: '#191919', claro: '#F4F2EC',
  fonteTitulo: "'Source Sans 3',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,700;0,800;1,800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 30, texto: 'Fiel ao site de hoje: o topo grafite com o logo, as faixas de lavoura passando devagar e as três colunas Quem Somos, Nossos Produtos e Entre em contato, com o verde, o laranja e o vermelho de agora.', pontos: ['Mostruário dos 41 grãos com as fotos do catálogo atual, separado em seis famílias', 'Do produtor ao cliente em quatro etapas e as feiras de 2002 a 2013', 'Português, inglês e espanhol, como as bandeiras do site atual'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 30, texto: 'Mais clara, com o amarelo e o itálico do logo, pensada para o comprador de fora: a mesa de operações (origem, Burmann, destino) e um catálogo com o nome de cada produto nos três idiomas.', pontos: ['Catálogo com busca, filtro por família e lista de cotação por e-mail', 'Rotas das feiras internacionais a partir de Porto Alegre', 'Contatos separados: comercial no Brasil e vendas internacionais'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('burmann: escolha em public/index.html');
