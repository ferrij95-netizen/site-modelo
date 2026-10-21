// Gera clientes/topengenharia/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/topengenharia/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, obras } from './conteudo.mjs';

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
  console.log(`topengenharia: versão ${v.toUpperCase()}, ${total[v]} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#ED1C24', fundo: '#2B2A2A', claro: '#F1F1F1',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,600..900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: total.a, texto: 'Fiel ao site de hoje: a faixa cinza com o logo vermelho, o carrossel de obras com as laterais aparecendo e os três blocos A TOP, Resp. Ambiental e Qualidade, agora com fotos das próprias obras.', pontos: ['Carrossel com as mesmas cinco obras da página atual', 'Seis segmentos de obra em mosaico de fotos', `Página própria para cada uma das ${obras.length} obras, com galeria`] },
    { letra: 'b', nome: nomesVersao.b, paginas: total.b, texto: 'Mais técnica, com a letra condensada do "ENGENHARIA" do logo: quilômetros de rodovia de cada contrato, mapa dos estados e as obras em ficha técnica.', pontos: ['Quilometragem de cada obra rodoviária em barras', 'Mapa do Brasil com as obras por estado', 'Obras em tabela com filtro e ficha técnica'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('topengenharia: escolha em public/index.html');
