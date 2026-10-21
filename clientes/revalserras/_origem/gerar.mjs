// Gera clientes/revalserras/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/revalserras/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';
import { PRODUTOS } from './catalogo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
let total = 0;
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [rota, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, rota);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  total = Object.keys(paginas).length;
  console.log(`revalserras: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas (pt, en, es)`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Reval Serras e Laser', url: E.url, lang: 'pt', cor: '#2b86d6', fundo: '#0a1a4f', claro: '#eef0f2',
  fonteTitulo: "'Barlow',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: total, texto: 'Abre como o site de vocês, dividido entre Reval Serras e Reval Laser, agora com o vídeo da afiação, fotos reais e as quatro linhas de serra.', pontos: [`${PRODUTOS.length} serras com ficha, tabela de medidas e botão de orçamento`, 'Corte a laser e dobra com as capacidades do catálogo', 'Português, inglês e espanhol, como as bandeiras do site atual'] },
    { letra: 'b', nome: nomesVersao.b, paginas: total, texto: 'Branca e técnica: o cliente escolhe o material que corta e chega na serra certa; o laser aparece em números e etapas.', pontos: ['"O que você corta?" com as serras de cada material', 'Limites de dobra em gráfico e etapas da chapa até a peça pronta', 'Busca por nome, máquina ou aplicação'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('revalserras: escolha em public/index.html');
