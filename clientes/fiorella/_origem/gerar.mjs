// Gera clientes/fiorella/public/{a,b}/ (pt na raiz, en/ e es/) a partir de conteudo.mjs e paginas.mjs.
// Rodar depois de mudar qualquer texto: node clientes/fiorella/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerar, gerarLoja } from './paginas.mjs';
import { LANGS } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  let n = 0;
  for (const l of LANGS) {
    for (const [slug, html] of Object.entries(gerar(v, l))) {
      const dir = path.join(pub, v, l === 'pt' ? '' : l, slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      n++;
    }
  }
  console.log(`fiorella: versão ${v.toUpperCase()}, ${n} páginas`);
}

// FiorellaShop nova, no domínio próprio: clientes/fiorellashop/public (home da loja + /produto/<cod>/).
{
  const shop = path.join(pub, '../../fiorellashop/public');
  fs.rmSync(shop, { recursive: true, force: true });
  let n = 0;
  for (const [slug, html] of Object.entries(gerarLoja())) {
    const dir = path.join(shop, slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    n++;
  }
  const a = path.join(pub, 'assets');
  fs.mkdirSync(path.join(shop, 'assets'), { recursive: true });
  for (const f of ['base.css', 'a.css', 'site.js', 'favicon.png']) fs.copyFileSync(path.join(a, f), path.join(shop, 'assets', f));
  fs.copyFileSync(path.join(a, fs.existsSync(path.join(a, 'og-loja.jpg')) ? 'og-loja.jpg' : 'og-a.jpg'), path.join(shop, 'assets/og-a.jpg'));
  // só as imagens que as páginas da loja usam
  const usadas = new Set();
  for (const f of fs.readdirSync(shop, { recursive: true })) if (f.endsWith('.html')) for (const m of fs.readFileSync(path.join(shop, f), 'utf8').matchAll(/\/assets\/img\/([\w/.-]+\.webp)/g)) usadas.add(m[1]);
  for (const f of usadas) { fs.mkdirSync(path.dirname(path.join(shop, 'assets/img', f)), { recursive: true }); fs.copyFileSync(path.join(a, 'img', f), path.join(shop, 'assets/img', f)); }
  console.log(`fiorellashop: ${n} páginas, ${usadas.size} imagens`);
}

// Loja atual (Tray) para comparar: /atual/ com o print de fiorellashop.com.br.
{
  const shop = path.join(pub, '../../fiorellashop/public');
  fs.mkdirSync(path.join(shop, 'atual'), { recursive: true });
  fs.copyFileSync(path.join(pub, 'assets/loja-atual.jpg'), path.join(shop, 'assets/loja-atual.jpg'));
  fs.writeFileSync(path.join(shop, 'atual/index.html'), `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>FiorellaShop atual (Tray)</title><meta name="robots" content="noindex">
<style>body{margin:0;background:#eee;font:15px/1.5 system-ui,sans-serif}p{margin:0;padding:12px 16px;background:#1d1a1b;color:#fff}a{color:#ffb3b6}img{display:block;max-width:1440px;width:100%;margin:0 auto}</style></head>
<body><p>Loja atual, como está hoje em <a href="https://www.fiorellashop.com.br/" target="_blank" rel="noopener">fiorellashop.com.br</a> (print de 16/10/2026).</p><img src="/assets/loja-atual.jpg" alt="Print da FiorellaShop atual"></body></html>
`);
}
