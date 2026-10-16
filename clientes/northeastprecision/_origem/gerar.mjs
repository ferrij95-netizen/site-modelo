// Gera clientes/northeastprecision/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/northeastprecision/_origem/gerar.mjs
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
  console.log(`northeastprecision: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

const desc = 'Two versions of the new North East Precision CNC website to choose from: Precision and Lights-out.';
const cartao = (v, txt) => `<a class="versao" href="/${v}/"><img src="/assets/versao-${v}.jpg" alt="Version ${v.toUpperCase()} preview" loading="lazy"><span><b>Version ${v.toUpperCase()} · ${nomesVersao[v]}</b>${txt}</span></a>`;
fs.writeFileSync(path.join(pub, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${E.nome} · choose your new website</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${E.url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${E.nome} · choose your new website">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${E.url}">
<meta property="og:image" content="${E.url}assets/og-a.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,700&family=Inter:wght@400;500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;font-family:Inter,sans-serif;color:#fff;background:radial-gradient(1200px 600px at 80% -10%,#0b5a6b 0,transparent 60%),#0c0c0c;display:flex;flex-direction:column;justify-content:center;padding:32px 16px}
.in{max-width:1100px;margin:0 auto;width:100%}h1{font-family:'DM Sans',sans-serif;font-size:clamp(28px,4vw,44px);letter-spacing:-.02em;margin:0 0 8px}p{color:#b9c3c7;margin:0 0 28px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}.versao{display:block;border-radius:18px;overflow:hidden;background:#161b1d;border:1px solid #23302f;text-decoration:none;color:#fff;transition:transform .2s,border-color .2s}
.versao:hover{transform:translateY(-3px);border-color:#0994b0}.versao img{width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;display:block}.versao span{display:block;padding:18px 20px;color:#b9c3c7;font-size:14px}.versao b{display:block;color:#fff;font-family:'DM Sans',sans-serif;font-size:18px;margin-bottom:4px}
.antigo-card{opacity:.8}
</style>
</head>
<body><div class="in">
<h1>${E.nome}</h1>
<p>Two versions of your new website. Same logo, colors, photos and content, two different styles. Pick the one you like best.</p>
<div class="grid">${cartao('a', 'Dark and technical, with a full-width shop photo, capability bento and certifications.')}${cartao('b', 'Light and teal, focused on 24/7 robot automation, materials and the job process.')}<a class="versao antigo-card" href="${E.antigo}" target="_blank" rel="noopener"><img src="/assets/site-atual.jpg" alt="Current website" loading="lazy"><span><b>Current website</b>northeastprecisioncnc.com, for comparison.</span></a></div>
</div></body>
</html>
`);
console.log('northeastprecision: escolha em public/index.html');
