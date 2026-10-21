// Gera clientes/vidracariachile/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/vidracariachile/_origem/gerar.mjs
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
  console.log(`vidracariachile: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Vidraçaria Chile</title><p><a href="/a/">Versão A</a> · <a href="/b/">Versão B</a></p>`);
  process.exit(0);
}
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', artigo: 'da', cor: '#00AFB6', fundo: '#1E1E66', claro: '#EEF4F7', corTextoBotao: '#0F1240',
  fonteTitulo: "'Questrial',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Questrial&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 15, texto: 'Fiel ao site de hoje: a faixa com o endereço, o cabeçalho com os três telefones, o menu azul, os cinco destaques com a foto emoldurada e o menu lateral de produtos, agora com fotos grandes das obras e funcionando no celular.', pontos: ['Os 10 produtos do site atual, cada um com a sua galeria', '168 fotos de obras com filtro por produto', 'Orçamento que abre pronto no WhatsApp da loja'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 15, texto: 'Mais clara e atual: a curva turquesa do logo, a escolha pelo ambiente (banheiro, área externa, interiores, comércio), o corte de cada vidro desenhado e as quatro fases da empresa desde a Rua Chile.', pontos: ['"Qual é o seu projeto?" indica os produtos certos', 'Vidro comum, laminado, temperado e espelhado lado a lado', 'A história de 1974 até hoje em linha do tempo'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('vidracariachile: escolha em public/index.html');
