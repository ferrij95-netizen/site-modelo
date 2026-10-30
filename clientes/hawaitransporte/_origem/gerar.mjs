// Gera clientes/hawaitransporte/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/hawaitransporte/_origem/gerar.mjs
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
  console.log(`hawaitransporte: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
if (fs.existsSync(path.join(pub, 'assets/apresentacao/a-pc.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
    nome: 'Hawai Transportes', artigo: 'da', url: E.url, lang: 'pt', cor: '#ec971f', fundo: '#2a2663', claro: '#f4f4f8',
    fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: "Lato,system-ui,sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Lato:wght@400;700&display=swap',
    favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
    versoes: [
      { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site atual: o logo no círculo branco, a foto da cegonha azul com o formulário roxo de cotação e a faixa roxa com a frase da Hawai, agora com páginas e acabamento novos.', pontos: ['Mesma ordem: cotação, frase, história, galeria e onde estamos', 'Cotação que chega pronta no WhatsApp da Hawai', 'Frota, diferenciais e as duas bases com mapa'] },
      { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais moderna: foto cheia da cegonha com cotação rápida, os diferenciais sobre a estrada do logo e o mapa com Fortaleza e Guarulhos.', pontos: ['Origem, destino e veículo já na abertura', 'Rastreador 24 h, galpão coberto e seguro RC/TRC em destaque', 'Galeria em mosaico com as fotos da frota'] },
    ],
    antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
  }));
  console.log('hawaitransporte: escolha em public/index.html');
}
