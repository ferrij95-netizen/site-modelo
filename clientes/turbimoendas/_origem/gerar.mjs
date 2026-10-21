// Gera clientes/turbimoendas/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/turbimoendas/_origem/gerar.mjs
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
  console.log(`turbimoendas: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#F2B705', corTextoBotao: '#222021', fundo: '#2a2a2a', claro: '#ECEDEE',
  fonteTitulo: "'Roboto Condensed',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Fiel ao site atual: fundo cinza claro, barra grafite com filete amarelo, títulos em vinho e o losango amarelo do logo marcando listas e etapas.', pontos: ['Empresa e atividades logo na abertura, como hoje', 'Processo do cilindro bruto à expedição com fotos da fábrica', 'Produtos, serviços e galeria com as fotos reais'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Mais técnica: abre com as capacidades em números grandes e mostra cada serviço numa ficha com a medida máxima, como uma tabela de máquinas.', pontos: ['10.000 mm no torno, 6.600 mm na retífica, 25 t nas pontes', 'Serviços numa ficha com capacidade e aplicações', 'Parque de máquinas com busca e PDF para baixar'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('turbimoendas: escolha em public/index.html');
