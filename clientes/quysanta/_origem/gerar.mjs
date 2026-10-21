// Gera clientes/quysanta/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/quysanta/_origem/gerar.mjs
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
  console.log(`quysanta: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (molduras e animações de componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Quysanta', artigo: 'da', url: E.url, lang: 'pt', cor: '#d61a00', fundo: '#3a0a02', claro: '#fff6d6',
  fonteTitulo: "'Passion One',Impact,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 10, texto: 'Fiel ao site atual: topo vermelho, logo oval e a faixa amarela em arco com o menu, com acabamento novo e funcionando no celular.', pontos: ['Os "doces momentos" e as três chamadas da home: Empresa, A Cocada Bahiana e Receitas', 'As quatro receitas com ingredientes e modo de preparo passo a passo', 'Clientes, redes sociais e formulário de contato que funciona'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 10, texto: 'Mais moderna, puxada pelo amarelo da lata e pelo vermelho do logo, contando a história desde 1907.', pontos: ['A lata de Cocada Bahiana em destaque logo na abertura', 'Linha do tempo de 1907 até hoje e o caminho da fábrica até a mesa', 'Receitas em mosaico e chamada para revendedores'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('quysanta: escolha em public/index.html');
