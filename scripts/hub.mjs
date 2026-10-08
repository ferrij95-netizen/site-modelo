// Monta o hub (hub.overtus.com.br): uma página com todos os clientes de clientes/, gerada a cada build.
// Capa de cada cliente: clientes/<cliente>/capa.jpg se existir; senão a imagem Open Graph da home; senão a cor da marca.
import fs from 'node:fs';
import path from 'node:path';
import { repo } from './paths.mjs';

const out = path.join(repo, 'dist/_hub');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const dir = path.join(repo, 'clientes');
const slugs = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter(c => fs.existsSync(path.join(dir, c, 'site.config.json'))).sort()
  : [];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'capas'), { recursive: true });

const clientes = slugs.map(slug => {
  const base = path.join(dir, slug);
  const cfg = JSON.parse(fs.readFileSync(path.join(base, 'site.config.json'), 'utf8'));
  const completo = fs.existsSync(path.join(base, 'design/layout.html'));
  const lang = cfg.defaultLang || 'pt';
  const og = path.join(repo, 'dist/_clientes', slug, `assets/img/og/${lang}-index.jpg`);
  const fonte = [path.join(base, 'capa.jpg'), og].find(f => fs.existsSync(f));
  let capa = null;
  if (fonte) {
    capa = `capas/${slug}.jpg`;
    fs.copyFileSync(fonte, path.join(out, capa));
  }
  return {
    slug,
    nome: cfg.hubName || cfg.name || slug,
    tagline: cfg.tagline || '',
    cor: cfg.theme?.brandDeep || cfg.theme?.brand || '#333',
    completo,
    direcoes: fs.existsSync(path.join(base, 'public/direcoes')),
    url: `https://${slug}.overtus.com.br/`,
    capa,
  };
});

const card = c => `
    <article class="card">
      <a class="thumb" href="${c.completo || !c.direcoes ? c.url : c.url + 'direcoes/'}" style="--cor:${esc(c.cor)}">
        ${c.capa ? `<img src="${c.capa}" alt="" loading="lazy">` : `<span>${esc(c.nome.slice(0, 1))}</span>`}
      </a>
      <div class="info">
        <span class="status ${c.completo ? 'ok' : 'dir'}">${c.completo ? 'Site completo' : 'Direções'}</span>
        <h2>${esc(c.nome)}</h2>
        <p>${esc(c.tagline)}</p>
        <div class="links">
          ${c.completo ? `<a href="${c.url}">Ver site</a>` : ''}
          ${c.direcoes ? `<a href="${c.url}direcoes/">${c.completo ? 'Direções' : 'Ver direções'}</a>` : ''}
        </div>
        <small>${esc(c.slug)}.overtus.com.br</small>
      </div>
    </article>`;

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Overtus · Sites em desenvolvimento</title>
<style>
  :root { --bg:#f4f4f1; --card:#fff; --ink:#16181b; --muted:#6b7079; --line:#e3e3de; --ok:#1f7a4d; --dir:#a2620b; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  header { max-width:1200px; margin:0 auto; padding:48px 20px 24px; display:flex; justify-content:space-between; align-items:end; gap:16px; flex-wrap:wrap; }
  h1 { margin:0; font-size:28px; letter-spacing:-.02em; }
  header p { margin:4px 0 0; color:var(--muted); }
  .resumo { color:var(--muted); font-size:14px; }
  main { max-width:1200px; margin:0 auto; padding:0 20px 64px; display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:20px; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; }
  .thumb { display:grid; place-items:center; aspect-ratio:1200/630; background:var(--cor); overflow:hidden; text-decoration:none; }
  .thumb img { width:100%; height:100%; object-fit:cover; object-position:top; transition:transform .3s; }
  .thumb:hover img { transform:scale(1.03); }
  .thumb span { color:#fff; font-size:64px; font-weight:700; opacity:.9; }
  .info { padding:16px 18px 18px; display:flex; flex-direction:column; gap:6px; flex:1; }
  .status { align-self:flex-start; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; padding:2px 8px; border-radius:99px; }
  .status.ok { color:var(--ok); background:#e3f3ea; }
  .status.dir { color:var(--dir); background:#fbefdc; }
  h2 { margin:4px 0 0; font-size:19px; }
  .info p { margin:0; color:var(--muted); font-size:14px; flex:1; }
  .links { display:flex; gap:8px; margin-top:8px; }
  .links a { padding:8px 14px; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; color:var(--ink); border:1px solid var(--line); }
  .links a:first-child { background:var(--ink); color:#fff; border-color:var(--ink); }
  small { color:var(--muted); font-size:12px; }
</style>
</head>
<body>
<header>
  <div>
    <h1>Sites em desenvolvimento</h1>
    <p>Previews dos clientes da Overtus.</p>
  </div>
  <span class="resumo">${clientes.length} clientes · ${(n => n === 1 ? '1 site completo' : n + ' sites completos')(clientes.filter(c => c.completo).length)}</span>
</header>
<main>${clientes.map(card).join('')}
</main>
</body>
</html>
`;

fs.writeFileSync(path.join(out, 'index.html'), html);
console.log(`hub: ${clientes.length} clientes em dist/_hub/`);
