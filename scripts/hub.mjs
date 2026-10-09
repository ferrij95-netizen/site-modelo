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
// Tela de login (hub/entrar/), servida sem senha pelo worker.
fs.cpSync(path.join(repo, 'hub/entrar'), path.join(out, 'entrar'), { recursive: true });
// App instalável no PC (manifest, ícones e service worker), também servido sem senha.
fs.cpSync(path.join(repo, 'hub/app'), path.join(out, 'app'), { recursive: true });
fs.copyFileSync(path.join(repo, 'hub/sw.js'), path.join(out, 'sw.js'));

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
        <div class="nome">
          <span class="status ${c.completo ? 'ok' : 'dir'}">${c.completo ? 'Site completo' : 'Direções'}</span>
          <h2>${esc(c.nome)}</h2>
          <p title="${esc(c.slug)}.overtus.com.br">${esc(c.tagline || c.slug + '.overtus.com.br')}</p>
        </div>
        <div class="links">
          ${c.completo ? `<a href="${c.url}">Ver site</a>` : ''}
          ${c.direcoes ? `<a href="${c.url}direcoes/">${c.completo ? 'Direções' : 'Ver direções'}</a>` : ''}
        </div>
      </div>
    </article>`;

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Overtus · Sites em desenvolvimento</title>
<link rel="manifest" href="/app/manifest.json">
<meta name="theme-color" content="#182644">
<link rel="icon" href="/app/favicon-48.png">
<link rel="apple-touch-icon" href="/app/icone-apple-180.png">
<style>
  /* O hub inteiro cabe na janela: cabeçalho fixo e a grade divide o resto da altura entre os cartões. */
  :root { --bg:#f4f4f1; --card:#fff; --ink:#16181b; --muted:#6b7079; --line:#e3e3de; --ok:#1f7a4d; --dir:#a2620b; --borda:clamp(12px, min(2.6vh, 2.2vw), 28px); }
  * { box-sizing: border-box; }
  html, body { height:100%; }
  body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; display:flex; flex-direction:column; height:100vh; height:100dvh; padding:var(--borda); gap:clamp(10px, 2vh, 20px); }
  header { width:100%; max-width:1600px; margin:0 auto; display:flex; justify-content:space-between; align-items:end; gap:4px 16px; flex-wrap:wrap; flex:none; }
  h1 { margin:0; font-size:clamp(20px, 3.2vh, 28px); line-height:1.2; letter-spacing:-.02em; }
  header p { margin:2px 0 0; color:var(--muted); font-size:clamp(13px, 1.8vh, 16px); }
  .resumo { color:var(--muted); font-size:14px; }
  .resumo a { color:inherit; }
  .instalar { font:inherit; font-size:13px; font-weight:600; margin-right:10px; padding:5px 12px; border-radius:8px; border:0; background:#182644; color:#fff; cursor:pointer; }
  main { width:100%; max-width:1600px; margin:0 auto; flex:1; min-height:0; display:grid; grid-template-columns:repeat(var(--cols, 3), minmax(0, 1fr)); grid-auto-rows:minmax(var(--min-linha, 0px), 1fr); gap:clamp(10px, 1.8vh, 20px); overflow:auto; }
  .card { container-type:inline-size; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; min-height:0; }
  .thumb { flex:1; min-height:0; display:grid; place-items:center; background:var(--cor); overflow:hidden; text-decoration:none; }
  .thumb img { width:100%; height:100%; object-fit:cover; object-position:top; transition:transform .3s; }
  .thumb:hover img { transform:scale(1.03); }
  .thumb span { color:#fff; font-size:clamp(32px, 7vh, 64px); font-weight:700; opacity:.9; }
  .info { flex:none; padding:clamp(8px, 1.4vh, 14px) clamp(12px, 1.4vw, 18px); display:grid; grid-template-columns:1fr auto; align-items:center; gap:2px 12px; }
  .nome { min-width:0; }
  .status { display:inline-block; white-space:nowrap; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; padding:1px 8px; border-radius:99px; }
  .status.ok { color:var(--ok); background:#e3f3ea; }
  .status.dir { color:var(--dir); background:#fbefdc; }
  h2 { margin:2px 0 0; font-size:clamp(15px, 2vh, 18px); line-height:1.25; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .info p { margin:0; color:var(--muted); font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .links { display:flex; gap:6px; }
  .links a { padding:clamp(5px, .9vh, 8px) 12px; border-radius:8px; font-size:13px; font-weight:600; text-decoration:none; color:var(--ink); border:1px solid var(--line); white-space:nowrap; }
  .links a:first-child { background:var(--ink); color:#fff; border-color:var(--ink); }
  @container (max-width: 360px) { .info { grid-template-columns:1fr; } .links { margin-top:4px; } }
  /* Celular: um cartão por linha, foto à esquerda e texto à direita, para todos caberem na tela. */
  @media (max-width: 560px) {
    .card { flex-direction:row; }
    .thumb { flex:0 0 38%; }
    .info { flex:1; min-width:0; grid-template-columns:1fr; align-content:center; padding:8px 12px; }
    .info p { display:none; }
    .links { margin-top:4px; }
    .links a { padding:4px 10px; font-size:12px; }
  }
</style>
</head>
<body>
<header>
  <div>
    <h1>Sites em desenvolvimento</h1>
    <p>Previews dos clientes da Overtus.</p>
  </div>
  <span class="resumo"><button class="instalar" hidden>Instalar app</button>${clientes.length} clientes · ${(n => n === 1 ? '1 site completo' : n + ' sites completos')(clientes.filter(c => c.completo).length)} · <a href="/sair">Sair</a></span>
</header>
<main>${clientes.map(card).join('')}
</main>
<script>
  // App no PC: o navegador avisa quando o hub pode ser instalado e o botão "Instalar app" aparece.
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
  (function () {
    const btn = document.querySelector('.instalar');
    let pedido;
    addEventListener('beforeinstallprompt', e => { e.preventDefault(); pedido = e; btn.hidden = false; });
    addEventListener('appinstalled', () => { btn.hidden = true; });
    btn.addEventListener('click', async () => { if (!pedido) return; pedido.prompt(); await pedido.userChoice; pedido = null; btn.hidden = true; });
  })();
  // Escolhe o número de colunas que deixa os cartões maiores sem passar da altura da janela.
  (function () {
    const main = document.querySelector('main'), n = main.children.length, MIN_FOTO = 70;
    function ajusta() {
      if (innerWidth <= 560) {
        main.style.setProperty('--cols', 1);
        main.style.setProperty('--min-linha', main.clientHeight / n < 84 ? '84px' : '0px');
        return;
      }
      const W = main.clientWidth, H = main.clientHeight, gap = parseFloat(getComputedStyle(main).rowGap) || 0;
      let melhor = { cols: 1, nota: -1, info: 96 };
      for (let cols = 1; cols <= n; cols++) {
        const linhas = Math.ceil(n / cols), w = (W - gap * (cols - 1)) / cols, h = (H - gap * (linhas - 1)) / linhas;
        if (w < 220 && cols > 1) break;
        const INFO = w <= 360 ? 128 : 96; // cartão estreito: botões descem para baixo do nome
        const nota = Math.min(w, (h - INFO) * 1.9);
        if (nota > melhor.nota) melhor = { cols, nota, info: INFO };
      }
      main.style.setProperty('--cols', melhor.cols);
      // Clientes demais para a altura: cada cartão mantém um tamanho mínimo e a grade rola por dentro.
      main.style.setProperty('--min-linha', melhor.nota / 1.9 < MIN_FOTO ? (MIN_FOTO + melhor.info) + 'px' : '0px');
    }
    ajusta();
    addEventListener('resize', ajusta);
  })();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(out, 'index.html'), html);
console.log(`hub: ${clientes.length} clientes em dist/_hub/`);
