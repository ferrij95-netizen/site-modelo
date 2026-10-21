// Gera clientes/pizzinatto/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/pizzinatto/_origem/gerar.mjs
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
  console.log(`pizzinatto: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Pizzinatto</title><p><a href="/a/">Versão A</a> · <a href="/b/">Versão B</a></p>`);
  process.exit(0);
}
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#F47D35', fundo: '#2E2F31', claro: '#F2F2F0',
  fonteTitulo: "'Kanit',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,600;0,700;1,800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Fiel ao site de hoje: a faixa laranja do menu, os três atalhos (Calcule, Monte, Catálogos), as novidades e o mosaico "Obras Pizzinatto", agora com o logo novo, fotos grandes das obras e funcionando no celular.', pontos: ['Destaques com as obras reais (CARDE, Bocão, Teatrão)', 'Calculadora de telhas com as mesmas contas do site atual', 'Lista de orçamento enviada por e-mail ou WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Mais moderna e técnica: os seis perfis de telha desenhados com as medidas reais, a escolha pelo tipo de obra e a telha sanduíche montada camada por camada.', pontos: ['"Qual é a sua obra?" indica os produtos certos', 'Perfis PZ 17 a PZ 100 com altura e largura útil', 'Monte o seu produto e orçamento em um clique'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('pizzinatto: escolha em public/index.html');
