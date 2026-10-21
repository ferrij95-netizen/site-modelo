// Gera clientes/vidrexvidros/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/vidrexvidros/_origem/gerar.mjs
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
  console.log(`vidrexvidros: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Vidrex Vidros</title><p><a href="/a/">Versão A</a> · <a href="/b/">Versão B</a></p>`);
  process.exit(0);
}
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#E8261F', fundo: '#373735', claro: '#F1F1EF',
  fonteTitulo: "'Barlow Condensed',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Fiel ao site de hoje: a faixa grafite, a aba vermelha no menu, o slider com as tarjas vermelha e grafite, as abas em seta e o rodapé vermelho. Agora com o logo nítido, fotos grandes das obras e funcionando no celular.', pontos: ['Os mesmos 8 menus e as 9 categorias de produto', 'Portfólio com as obras reais (Casa Cor MT, Clínica Salutte, Soneca Hotel)', 'Orçamento que chega pronto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Mais moderna e técnica: o vidro comum, temperado e laminado desenhados em corte (e como cada um quebra), a escolha pelo canto da obra e o antes e depois da pele de vidro.', pontos: ['"Qual vidro para cada caso?" explicado em desenho', 'Antes e depois que o cliente arrasta', '"Da chapa à obra": os 8 serviços em sequência'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('vidrexvidros: escolha em public/index.html');
