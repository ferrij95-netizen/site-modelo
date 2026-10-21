// Gera clientes/conexaodeltag/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/conexaodeltag/_origem/gerar.mjs
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
  console.log(`conexaodeltag: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) { fs.writeFileSync(path.join(pub, 'index.html'), '<!doctype html><meta http-equiv="refresh" content="0;url=/a/">'); process.exit(0); }
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#AF0000', fundo: '#2B0A04', claro: '#FFF3DE',
  fonteTitulo: "Marcellus,'Optima',serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Fiel ao site de hoje: a faixa vermelha com o logo e os telefones, o menu bordô e o fundo creme, agora com a foto do campo em destaque, acabamento novo e funcionando no celular.', pontos: ['Os diferenciais da Conexão em números grandes', 'O programa em seis etapas, em setas como as do logo', 'Os 20 touros em centrais, os 16 membros e as notícias'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Mais moderna e direta: o touro em tela cheia logo na abertura, o programa como um ciclo em volta das três setas do logo e o peso de cada característica do índice em barras.', pontos: ['Ciclo do programa que se explica sozinho', 'DEP genômica para resistência ao carrapato em destaque', 'Touros filtrados por raça, Hereford ou Braford'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('conexaodeltag: escolha em public/index.html');
