// Gera clientes/tolotti/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/tolotti/_origem/gerar.mjs
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
  console.log(`tolotti: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#D7262E', fundo: '#14275f', claro: '#f2f5fb',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Fiel à oficina de hoje: branca com as faixas azuis da fachada, o logo da chave no quadrado vermelho e a caixa de serviços com as setas azuis do site atual, agora com acabamento novo e funcionando no celular.', pontos: ['As fotos reais da oficina em destaque', 'Os 7 serviços com as setas azuis do site antigo', 'Seguro e guincho explicados em 5 etapas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Mais moderna, no azul da marca: conta o caminho do carro do guincho até a entrega e deixa o plantão 24 horas sempre à mão.', pontos: ['"Do guincho à entrega" logo na abertura', 'Serviços numerados com foto de cada um', 'Telefones do guincho em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('tolotti: escolha em public/index.html');
