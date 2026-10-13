// Monta o hub (hub.overtus.com.br). Raiz: canvas de prospecção (hub/inicio/, dados no D1 via src/prospeccao.js).
// /sites/: uma página com todos os clientes de clientes/, gerada a cada build.
// Capa de cada cliente: clientes/<cliente>/capa.jpg se existir; senão a imagem Open Graph da home; senão a cor da marca.
// Setor: campo "setor" do site.config.json (chave da tabela SETORES abaixo); vira etiqueta e filtro no hub.
// Cada cliente também ganha /ver/<cliente>/: o site aberto dentro da moldura do hub (versões, telefone, script).
// Script de ligação: clientes/<cliente>/script.md, se existir, aparece num painel na moldura.
import fs from 'node:fs';
import path from 'node:path';
import { repo } from './paths.mjs';
import { paginaLigar } from './hub-ligar.mjs';

const out = path.join(repo, 'dist/_hub');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// JSON dentro de <script>: sem "</script>" nem "<!--" que fechem a tag antes da hora.
const json = v => JSON.stringify(v).replace(/</g, '\\u003c');

// Setores na ordem em que aparecem nos filtros. Setor fora da tabela aparece com o próprio nome.
const SETORES = {
  agro: 'Agro e alimentos',
  industria: 'Indústria',
  metalmecanica: 'Metalmecânica',
  saude: 'Saúde',
  oficinas: 'Oficinas',
  distribuicao: 'Distribuição e comércio',
  consultoria: 'Consultoria',
  construcao: 'Construção e imobiliário',
};
const nomeSetor = s => SETORES[s] || (s ? s[0].toUpperCase() + s.slice(1) : 'Sem setor');

// Pastas de public/ que são versões do site (com index.html próprio), e como chamá-las no hub.
const NAO_VERSAO = new Set(['assets', 'img', 'video', 'antigo', 'atual', 'direcoes']);
const NOME_VERSAO = { a: 'Versão A', b: 'Versão B', c: 'Versão C', classica: 'Clássica' };
const nomeVersao = v => NOME_VERSAO[v] || v[0].toUpperCase() + v.slice(1);

const dir = path.join(repo, 'clientes');
const slugs = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter(c => fs.existsSync(path.join(dir, c, 'site.config.json'))).sort()
  : [];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'capas'), { recursive: true });
// Tela de login (hub/entrar/), servida sem senha pelo worker. As fontes do hub moram em /entrar/fontes/.
fs.cpSync(path.join(repo, 'hub/entrar'), path.join(out, 'entrar'), { recursive: true });
// App instalável no PC (manifest, ícones e service worker), também servido sem senha.
fs.cpSync(path.join(repo, 'hub/app'), path.join(out, 'app'), { recursive: true });
fs.copyFileSync(path.join(repo, 'hub/sw.js'), path.join(out, 'sw.js'));
// Busca de sites antigos (hub/busca/): só gera links de pesquisa do Google, protegida pelo mesmo login.
fs.cpSync(path.join(repo, 'hub/busca'), path.join(out, 'busca'), { recursive: true });
// Importar empresas de um arquivo para o banco do canvas (hub/importar/), também atrás do login.
fs.cpSync(path.join(repo, 'hub/importar'), path.join(out, 'importar'), { recursive: true });
// Painel de resultado (hub/resultados/): números da prospecção lidos de /api/resultados, atrás do login.
fs.cpSync(path.join(repo, 'hub/resultados'), path.join(out, 'resultados'), { recursive: true });
// Sobre a empresa (hub/empresa/): documentos da Overtus em PDF, com prévia, atrás do login.
fs.cpSync(path.join(repo, 'hub/empresa'), path.join(out, 'empresa'), { recursive: true });
// Menu lateral do hub (o mesmo da prospecção) para as subpáginas: /sites/, /ver/, /busca/, /importar/.
fs.cpSync(path.join(repo, 'hub/menu'), path.join(out, 'menu'), { recursive: true });

const clientes = slugs.map(slug => {
  const base = path.join(dir, slug);
  const pub = path.join(base, 'public');
  const cfg = JSON.parse(fs.readFileSync(path.join(base, 'site.config.json'), 'utf8'));
  // Sites da linha de produção (linha/) são estáticos em public/ e já saem completos.
  const completo = fs.existsSync(path.join(base, 'design/layout.html')) || !!cfg.linha;
  const ligacao = fs.existsSync(path.join(base, 'ligacao.json')) ? JSON.parse(fs.readFileSync(path.join(base, 'ligacao.json'), 'utf8')) : null;
  const lang = cfg.defaultLang || 'pt';
  const og = path.join(repo, 'dist/_clientes', slug, `assets/img/og/${lang}-index.jpg`);
  const fonte = [path.join(base, 'capa.jpg'), og].find(f => fs.existsSync(f));
  let capa = null;
  if (fonte) {
    capa = `/capas/${slug}.jpg`;
    fs.copyFileSync(fonte, path.join(out, capa));
  }
  const tem = p => fs.existsSync(path.join(pub, p, 'index.html'));
  const pastas = fs.existsSync(pub) ? fs.readdirSync(pub).filter(p => !NAO_VERSAO.has(p) && tem(p)).sort() : [];
  const direcoes = tem('direcoes');
  // O que a moldura deixa trocar: as versões do site, o site antigo e as direções visuais.
  const vistas = [];
  if (completo || !pastas.length) {
    if (completo || fs.existsSync(path.join(pub, 'index.html'))) vistas.push({ id: 'site', nome: 'Site', path: '/' });
  }
  for (const p of pastas) vistas.push({ id: p, nome: nomeVersao(p), path: `/${p}/` });
  for (const p of ['antigo', 'atual']) if (tem(p)) vistas.push({ id: p, nome: 'Site antigo', path: `/${p}/` });
  if (direcoes) vistas.push({ id: 'direcoes', nome: 'Direções', path: '/direcoes/' });
  if (!vistas.length) vistas.push({ id: 'site', nome: 'Site', path: '/' });
  const scriptMd = path.join(base, 'script.md');
  return {
    slug,
    nome: cfg.hubName || cfg.name || slug,
    tagline: cfg.tagline || '',
    cidade: cfg.address || '',
    setor: cfg.setor || '',
    cor: cfg.theme?.brandDeep || cfg.theme?.brand || '#333',
    completo,
    versoes: pastas.length,
    direcoes,
    url: `https://${slug}.overtus.com.br`,
    telefone: cfg.phone || '',
    telefoneHref: cfg.phoneHref || (cfg.phone || '').replace(/[^\d+]/g, ''),
    whatsapp: cfg.whatsapp || '',
    script: fs.existsSync(scriptMd) ? fs.readFileSync(scriptMd, 'utf8') : '',
    vistas,
    capa,
    ligacao,
  };
});

// Setores presentes, na ordem da tabela; os desconhecidos no fim e "Sem setor" por último.
const ordem = Object.keys(SETORES);
const setores = [...new Set(clientes.map(c => c.setor))].sort((a, b) => {
  const ia = a ? (ordem.includes(a) ? ordem.indexOf(a) : 98) : 99;
  const ib = b ? (ordem.includes(b) ? ordem.indexOf(b) : 98) : 99;
  return ia - ib || a.localeCompare(b);
});

// Identidade do hub (a mesma da tela de login): marinho, areia, laranja, Fraunces nos títulos e General Sans no texto.
const fontes = `
  @font-face { font-family: 'Fraunces'; font-weight: 400; font-display: swap; src: url(/entrar/fontes/fraunces-latin-ext.woff2) format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
  @font-face { font-family: 'Fraunces'; font-weight: 400; font-display: swap; src: url(/entrar/fontes/fraunces-latin.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
  @font-face { font-family: 'General Sans'; font-weight: 400; font-display: swap; src: url(/entrar/fontes/general-sans-400.woff2) format('woff2'); }
  @font-face { font-family: 'General Sans'; font-weight: 500; font-display: swap; src: url(/entrar/fontes/general-sans-500.woff2) format('woff2'); }
  @font-face { font-family: 'General Sans'; font-weight: 600; font-display: swap; src: url(/entrar/fontes/general-sans-600.woff2) format('woff2'); }
  :root { --azul:#182644; --azul2:#24365d; --areia:#f7f3f0; --creme:#fef9e1; --claro:#c1d3e6; --laranja:#ed9454; --tinta:#0c1018; --muted:#5f6675; --linha:#e6dfd8; --ok:#1f7a4d; --dir:#a2620b; --borda:clamp(12px, min(2.6vh, 2.2vw), 28px); }
  * { box-sizing:border-box; }
  html, body { height:100%; }
  body { margin:0; background:var(--areia); color:var(--tinta); font:16px/1.5 'General Sans', ui-sans-serif, system-ui, sans-serif; letter-spacing:-.01em; -webkit-font-smoothing:antialiased; }
  [hidden] { display:none !important; }
  .marca { display:inline-flex; align-items:center; gap:10px; text-decoration:none; color:inherit; }
  .marca img { width:28px; height:28px; border-radius:8px; display:block; }
  .marca b { font-size:13px; font-weight:600; letter-spacing:.12em; }
  .tag { display:inline-block; white-space:nowrap; font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; padding:1px 8px; border-radius:99px; }
  .tag.setor { color:#8a4a17; background:#fbe6d4; }`;

const head = titulo => `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(titulo)}</title>
<link rel="manifest" href="/app/manifest.json">
<meta name="theme-color" content="#182644">
<link rel="icon" href="/app/favicon-48.png">
<link rel="apple-touch-icon" href="/app/icone-apple-180.png">
<link rel="preload" href="/entrar/fontes/general-sans-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/entrar/fontes/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>`;

const busca = c => [c.nome, c.slug, c.tagline, c.cidade, nomeSetor(c.setor)].join(' ').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const card = c => `
    <article class="card" data-setor="${esc(c.setor)}" data-busca="${esc(busca(c))}">
      <a class="thumb" href="/ver/${c.slug}/" style="--cor:${esc(c.cor)}">
        ${c.capa ? `<img src="${c.capa}" alt="" loading="lazy">` : `<span>${esc(c.nome.slice(0, 1))}</span>`}
      </a>
      <div class="info">
        <div class="nome">
          <div class="tags"><span class="tag setor">${esc(nomeSetor(c.setor))}</span><span class="tag ${c.ligacao ? 'ligar' : c.completo || c.versoes ? 'ok' : 'dir'}">${c.ligacao ? 'Pronto para ligar' : c.completo ? 'Site completo' : c.versoes ? c.versoes + ' versões' : 'Direções'}</span></div>
          <h2>${esc(c.nome)}</h2>
          <p title="${esc(c.slug)}.overtus.com.br">${esc(c.tagline || c.slug + '.overtus.com.br')}</p>
        </div>
        <div class="links">
          <a href="/ver/${c.slug}/">Abrir</a>
          <a href="${c.url}/" target="_blank" rel="noopener" title="Abrir ${esc(c.slug)}.overtus.com.br fora do hub" aria-label="Abrir fora do hub">↗</a>
        </div>
      </div>
    </article>`;

const chip = (id, nome, n) => `<button class="chip" data-setor="${esc(id)}" aria-pressed="false">${esc(nome)} <small>${n}</small></button>`;

const html = `<!doctype html>
<html lang="pt-BR">
<head>
${head('Overtus Hub · Sites em desenvolvimento')}
<style>${fontes}
  /* O hub inteiro cabe na janela: cabeçalho e filtros fixos, e a grade divide o resto da altura entre os cartões. */
  body { display:flex; flex-direction:column; height:100vh; height:100dvh; padding:var(--borda); gap:clamp(8px, 1.6vh, 16px); }
  header, .filtros, main { width:100%; max-width:1600px; margin:0 auto; }
  header { display:flex; justify-content:space-between; align-items:end; gap:4px 16px; flex-wrap:wrap; flex:none; }
  header .marca { color:var(--azul); }
  h1 { margin:clamp(2px, .8vh, 8px) 0 0; font:400 clamp(22px, 3.6vh, 32px)/1.1 'Fraunces', serif; letter-spacing:-.02em; color:var(--azul); }
  .resumo { color:var(--muted); font-size:14px; }
  .resumo a { color:var(--azul); }
  .instalar { font:inherit; font-size:13px; font-weight:600; margin-right:10px; padding:5px 12px; border-radius:99px; border:0; background:var(--azul); color:var(--creme); cursor:pointer; }
  .filtros { flex:none; display:flex; align-items:center; gap:12px; }
  .chips { flex:1; min-width:0; display:flex; gap:6px; overflow-x:auto; scrollbar-width:none; }
  .chip { flex:none; font:inherit; font-size:13px; font-weight:500; padding:clamp(4px, .7vh, 7px) 12px; border-radius:99px; border:1px solid var(--linha); background:#fff; color:var(--azul); cursor:pointer; white-space:nowrap; }
  .chip small { font-size:12px; color:var(--muted); margin-left:2px; }
  .chip:hover { border-color:var(--laranja); }
  .chip[aria-pressed="true"] { background:var(--azul); border-color:var(--azul); color:var(--creme); }
  .chip[aria-pressed="true"] small { color:var(--claro); }
  .procurar { flex:none; width:min(260px, 32vw); font:inherit; font-size:14px; padding:clamp(4px, .7vh, 7px) 14px; border-radius:99px; border:1px solid var(--linha); background:#fff; color:var(--tinta); outline:none; }
  .procurar:focus { border-color:var(--azul); }
  main { flex:1; min-height:0; display:grid; grid-template-columns:repeat(var(--cols, 3), minmax(0, 1fr)); grid-auto-rows:var(--linha, 1fr); gap:clamp(10px, 1.8vh, 20px); overflow:auto; align-content:start; }
  .vazio { grid-column:1 / -1; align-self:center; text-align:center; color:var(--muted); font-size:15px; }
  .card { container-type:inline-size; background:#fff; border:1px solid var(--linha); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; min-height:0; box-shadow:0 18px 40px -32px rgba(24,38,68,.45); }
  .thumb { flex:1; min-height:0; display:grid; place-items:center; background:var(--cor); overflow:hidden; text-decoration:none; }
  .thumb img { width:100%; height:100%; object-fit:cover; object-position:top; transition:transform .3s; }
  .thumb:hover img { transform:scale(1.03); }
  .thumb span { color:#fff; font:400 clamp(32px, 7vh, 64px) 'Fraunces', serif; opacity:.9; }
  .info { flex:none; padding:clamp(8px, 1.4vh, 14px) clamp(12px, 1.4vw, 18px); display:grid; grid-template-columns:1fr auto; align-items:center; gap:2px 12px; }
  .nome { min-width:0; }
  .tags { display:flex; gap:4px; overflow:hidden; }
  .tag.ok { color:var(--ok); background:#e3f3ea; }
  .tag.dir { color:var(--dir); background:#fbefdc; }
  .tag.ligar { color:#fff; background:var(--laranja); }
  h2 { margin:3px 0 0; font:400 clamp(16px, 2.2vh, 20px)/1.2 'Fraunces', serif; letter-spacing:-.01em; color:var(--azul); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .info p { margin:0; color:var(--muted); font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .links { display:flex; gap:6px; }
  .links a { padding:clamp(5px, .9vh, 8px) 14px; border-radius:99px; font-size:13px; font-weight:600; text-decoration:none; color:var(--azul); border:1px solid var(--linha); white-space:nowrap; }
  .links a:first-child { background:var(--azul); color:var(--creme); border-color:var(--azul); }
  .links a:hover { border-color:var(--laranja); }
  @container (max-width: 420px) { .info { grid-template-columns:1fr; } .links { margin-top:4px; } }
  /* Celular: a página rola normalmente; um cartão por linha, foto à esquerda e texto à direita. */
  @media (max-width: 560px) {
    .filtros { flex-direction:column; align-items:stretch; gap:8px; }
    .procurar { width:100%; order:-1; }
    .card { flex-direction:row; }
    .thumb { flex:0 0 38%; }
    .info { flex:1; min-width:0; grid-template-columns:1fr; align-content:center; padding:8px 12px; }
    .info p, .tag:not(.setor) { display:none; }
    .links { margin-top:4px; }
    .links a { padding:4px 10px; font-size:12px; }
  }
</style>
</head>
<body>
<script src="/menu/menu.js"></script>
<header>
  <div>
    <a class="marca" href="/" title="Voltar à prospecção"><img src="/app/icone-192.png" alt=""><b>OVERTUS HUB</b></a>
    <h1>Sites em desenvolvimento</h1>
  </div>
  <span class="resumo"><button class="instalar" hidden>Instalar app</button>${clientes.length} clientes · ${(n => n === 1 ? '1 site completo' : n + ' sites completos')(clientes.filter(c => c.completo).length)} · <a href="/">Prospecção</a> ${clientes.some(c => c.ligacao) ? `· <a href="/ligar/">Para ligar (${clientes.filter(c => c.ligacao).length})</a> ` : ''}· <a href="/busca/">Buscar sites antigos</a> · <a href="/sair">Sair</a></span>
</header>
<div class="filtros">
  <div class="chips" role="toolbar" aria-label="Filtrar por setor">${chip('', 'Todos', clientes.length)}${setores.map(s => chip(s, nomeSetor(s), clientes.filter(c => c.setor === s).length)).join('')}</div>
  <input class="procurar" type="search" placeholder="Procurar cliente, cidade…" aria-label="Procurar cliente">
</div>
<main>${clientes.map(card).join('')}
  <p class="vazio" hidden>Nenhum site com esse filtro.</p>
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
  (function () {
    const main = document.querySelector('main'), cards = [...main.querySelectorAll('.card')], vazio = main.querySelector('.vazio'), MIN_FOTO = 70;
    const chips = [...document.querySelectorAll('.chip')], campo = document.querySelector('.procurar');
    // Escolhe o número de colunas que deixa os cartões (dos clientes visíveis) maiores sem passar da altura da janela.
    function ajusta() {
      if (innerWidth <= 560) {
        main.style.setProperty('--cols', 1);
        main.style.setProperty('--linha', '84px');
        return;
      }
      const n = Math.max(1, cards.filter(c => !c.hidden).length);
      const W = main.clientWidth, H = main.clientHeight, gap = parseFloat(getComputedStyle(main).rowGap) || 0;
      const info = w => w <= 420 ? 136 : 104; // cartão estreito: botões descem para baixo do nome
      let melhor = null;
      for (let cols = 1; cols <= n; cols++) {
        const linhas = Math.ceil(n / cols), w = (W - gap * (cols - 1)) / cols, h = (H - gap * (linhas - 1)) / linhas;
        if (w < 220 && cols > 1) break;
        if (h - info(w) < MIN_FOTO) continue;
        // Nota = área da foto, sem contar a parte que passaria de uma proporção 3:2 (seria só corte).
        const nota = w * Math.min(h - info(w), w / 1.5);
        if (!melhor || nota > melhor.nota) melhor = { cols, nota, linha: Math.floor(Math.min(h, info(w) + w / 1.5 * 1.3)) };
      }
      // Clientes demais para a altura: cartões de tamanho mínimo e a grade rola por dentro.
      if (!melhor) {
        const cols = Math.max(1, Math.floor((W + gap) / (260 + gap))), w = (W - gap * (cols - 1)) / cols;
        melhor = { cols, linha: Math.floor(info(w) + Math.max(MIN_FOTO, w / 2.6)) };
      }
      main.style.setProperty('--cols', melhor.cols);
      main.style.setProperty('--linha', melhor.linha + 'px');
    }
    // Filtro por setor e busca por texto; o setor escolhido fica guardado para a volta da moldura.
    const sem = s => s.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().trim();
    let setor = '';
    try { setor = sessionStorage.getItem('hub-setor') || ''; } catch (e) {}
    if (location.hash.length > 1) setor = decodeURIComponent(location.hash.slice(1));
    if (!chips.some(c => c.dataset.setor === setor)) setor = '';
    function filtra() {
      const q = sem(campo.value);
      for (const c of cards) c.hidden = (setor && c.dataset.setor !== setor) || (q && !c.dataset.busca.includes(q));
      for (const c of chips) c.setAttribute('aria-pressed', c.dataset.setor === setor);
      vazio.hidden = cards.some(c => !c.hidden);
      try { sessionStorage.setItem('hub-setor', setor); } catch (e) {}
      history.replaceState(null, '', setor ? '#' + encodeURIComponent(setor) : location.pathname);
      ajusta();
    }
    chips.forEach(c => c.addEventListener('click', () => { setor = c.dataset.setor; filtra(); }));
    campo.addEventListener('input', filtra);
    filtra();
    addEventListener('resize', ajusta);
  })();
</script>
</body>
</html>
`;

// A lista de sites mora em /sites/; a raiz do hub é o canvas de prospecção (hub/inicio/).
fs.mkdirSync(path.join(out, 'sites'), { recursive: true });
fs.writeFileSync(path.join(out, 'sites', 'index.html'), html);
fs.copyFileSync(path.join(repo, 'hub/inicio/index.html'), path.join(out, 'index.html'));
fs.mkdirSync(path.join(out, 'inicio'), { recursive: true });
for (const f of ['dados.js', 'aprovar.js', 'aprovar.css', 'lembretes.js', 'lembretes.css']) fs.copyFileSync(path.join(repo, 'hub/inicio', f), path.join(out, 'inicio', f));

// Moldura: o site do cliente aberto dentro do hub, com a barra da Overtus em cima.
const moldura = c => `<!doctype html>
<html lang="pt-BR">
<head>
${head(`${c.nome} · Overtus Hub`)}
<style>${fontes}
  body { display:flex; flex-direction:column; height:100vh; height:100dvh; overflow:hidden; background:var(--azul); }
  .barra { flex:none; display:flex; align-items:center; gap:10px 16px; padding:10px var(--borda); color:var(--creme); background:radial-gradient(ellipse 40% 140% at 0% 0%, rgba(40,14,1,.75), rgba(40,14,1,0) 70%), radial-gradient(ellipse 35% 160% at 100% 100%, rgba(237,148,84,.18), rgba(237,148,84,0) 70%), var(--azul); }
  .barra a, .barra button { font:inherit; color:inherit; }
  .voltar { display:inline-flex; align-items:center; gap:8px; text-decoration:none; padding:6px 12px 6px 8px; border-radius:99px; border:1px solid rgba(254,249,225,.22); font-size:14px; font-weight:500; white-space:nowrap; }
  .voltar img { width:22px; height:22px; border-radius:6px; }
  .voltar:hover { background:rgba(254,249,225,.08); }
  .quem { min-width:0; display:flex; align-items:baseline; gap:10px; }
  .quem h1 { margin:0; font:400 clamp(18px, 2.6vh, 22px)/1.2 'Fraunces', serif; letter-spacing:-.01em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .quem .tag.setor { color:var(--azul); background:var(--laranja); }
  .vistas { display:flex; gap:2px; padding:3px; border-radius:99px; background:rgba(254,249,225,.08); border:1px solid rgba(254,249,225,.14); overflow-x:auto; scrollbar-width:none; flex:none; max-width:100%; }
  .vistas button, .tela button { border:0; background:transparent; cursor:pointer; padding:5px 14px; border-radius:99px; font-size:13px; font-weight:500; white-space:nowrap; color:rgba(254,249,225,.78); }
  .vistas button:hover, .tela button:hover { color:#fff; }
  .vistas button[aria-pressed="true"], .tela button[aria-pressed="true"] { background:var(--creme); color:var(--azul); }
  .espaco { flex:1; }
  .tela { display:flex; gap:2px; padding:3px; border-radius:99px; border:1px solid rgba(254,249,225,.14); }
  .tela button { padding:5px 10px; display:grid; place-items:center; }
  .acao { display:inline-flex; align-items:center; gap:6px; text-decoration:none; padding:6px 14px; border-radius:99px; border:1px solid rgba(254,249,225,.22); background:transparent; cursor:pointer; font-size:13px; font-weight:500; white-space:nowrap; }
  .acao:hover { background:rgba(254,249,225,.08); }
  .acao.forte { background:var(--laranja); border-color:var(--laranja); color:var(--azul); font-weight:600; }
  .acao.forte:hover { background:#f2a872; }
  .acao[aria-pressed="true"] { background:var(--creme); color:var(--azul); }
  /* Palco: o site do cliente em um quadro arredondado, com a borda areia do hub em volta. */
  .palco { flex:1; min-height:0; display:flex; gap:var(--borda); padding:var(--borda); background:var(--areia); border-radius:clamp(14px, 2.4vh, 22px) clamp(14px, 2.4vh, 22px) 0 0; }
  .quadro { flex:1; min-width:0; display:flex; justify-content:center; }
  iframe { display:block; width:100%; height:100%; border:0; border-radius:14px; background:#fff; box-shadow:0 30px 60px -36px rgba(24,38,68,.55), 0 0 0 1px var(--linha); transition:width .25s; }
  .celular iframe { width:390px; max-width:100%; }
  .script { flex:none; width:min(380px, 34vw); display:flex; flex-direction:column; background:#fff; border-radius:14px; box-shadow:0 0 0 1px var(--linha); overflow:hidden; }
  .script header { flex:none; display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border-bottom:1px solid var(--linha); }
  .script header b { font:400 18px 'Fraunces', serif; color:var(--azul); }
  .script header button { border:0; background:none; font-size:20px; line-height:1; cursor:pointer; color:var(--muted); }
  .texto { flex:1; overflow:auto; padding:6px 18px 18px; font-size:14px; line-height:1.6; color:#2a2f3a; }
  .texto h3 { margin:16px 0 4px; font:400 17px 'Fraunces', serif; color:var(--azul); }
  .texto h4 { margin:14px 0 2px; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:#8a4a17; }
  .texto p { margin:6px 0; }
  .texto ul { margin:6px 0; padding-left:18px; }
  @media (max-width: 900px) {
    .barra { flex-wrap:wrap; padding:8px 12px; }
    /* Celular: linha 1 com voltar e nome; linha 2 com as versões e os botões. */
    .quem { flex:1 1 calc(100% - 60px); }
    .vistas { order:5; flex:1 1 0; min-width:0; }
    .acao { order:6; padding:6px 10px; }
    .tela, .espaco { display:none; }
    .acao .rotulo, .voltar .rotulo { display:none; }
    .voltar { padding:6px; }
    .palco { padding:0; border-radius:0; }
    iframe { border-radius:0; box-shadow:none; }
    .script { position:fixed; inset:auto 0 0 0; width:auto; height:70dvh; border-radius:16px 16px 0 0; box-shadow:0 -20px 50px rgba(0,0,0,.3); z-index:2; }
  }
</style>
</head>
<body>
<script src="/menu/menu.js"></script>
<div class="barra">
  <a class="voltar" href="/sites/" title="Voltar para a lista de sites"><img src="/app/icone-192.png" alt=""><span class="rotulo">Hub</span></a>
  <div class="quem"><h1>${esc(c.nome)}</h1><span class="tag setor">${esc(nomeSetor(c.setor))}</span></div>
  <div class="vistas" role="toolbar" aria-label="Versão do site">${c.vistas.map(v => `<button data-vista="${esc(v.id)}" aria-pressed="false">${esc(v.nome)}</button>`).join('')}</div>
  <span class="espaco"></span>
  <div class="tela" role="toolbar" aria-label="Tamanho da tela">
    <button data-tela="computador" aria-pressed="true" title="Computador" aria-label="Computador"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg></button>
    <button data-tela="celular" aria-pressed="false" title="Celular" aria-label="Celular"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg></button>
  </div>
  ${c.telefone ? `<a class="acao" href="tel:${esc(c.telefoneHref)}" title="Ligar para ${esc(c.nome)}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg><span class="rotulo">${esc(c.telefone)}</span></a>` : ''}
  ${c.whatsapp ? `<a class="acao" href="https://wa.me/${esc(c.whatsapp.replace(/\D/g, ''))}" target="_blank" rel="noopener" title="WhatsApp de ${esc(c.nome)}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 20l1.3-4A8.5 8.5 0 1 1 8.4 19z"/></svg><span class="rotulo">WhatsApp</span></a>` : ''}
  ${c.script ? `<button class="acao forte" data-script aria-pressed="false">Script</button>` : ''}
  <a class="acao" href="${c.url}/" target="_blank" rel="noopener" title="Abrir ${esc(c.slug)}.overtus.com.br fora do hub">↗<span class="rotulo"> Abrir fora</span></a>
</div>
<div class="palco">
  <div class="quadro"><iframe title="${esc(c.nome)}" src="${c.url}${c.vistas[0].path}"></iframe></div>
  ${c.script ? `<aside class="script" hidden><header><b>Script de ligação</b><button aria-label="Fechar script">×</button></header><div class="texto"></div></aside>` : ''}
</div>
<script>
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
  (function () {
    const URL_BASE = ${json(c.url)}, VISTAS = ${json(c.vistas)}, SCRIPT = ${json(c.script)};
    const quadro = document.querySelector('.quadro'), frame = document.querySelector('iframe');
    // Versão aberta fica no endereço (#b), para recarregar ou mandar o link sem perder a escolha.
    function abre(id, inicio) {
      const v = VISTAS.find(v => v.id === id) || VISTAS[0];
      if (!inicio || v !== VISTAS[0]) frame.src = URL_BASE + v.path;
      document.querySelectorAll('[data-vista]').forEach(b => b.setAttribute('aria-pressed', b.dataset.vista === v.id));
      history.replaceState(null, '', v === VISTAS[0] ? location.pathname : '#' + v.id);
    }
    document.querySelectorAll('[data-vista]').forEach(b => b.addEventListener('click', () => abre(b.dataset.vista)));
    abre(location.hash.slice(1), true);
    if (VISTAS.length < 2) document.querySelector('.vistas').hidden = true;
    document.querySelectorAll('[data-tela]').forEach(b => b.addEventListener('click', () => {
      quadro.classList.toggle('celular', b.dataset.tela === 'celular');
      document.querySelectorAll('[data-tela]').forEach(x => x.setAttribute('aria-pressed', x === b));
    }));
    // Script de ligação em markdown simples: títulos (#), listas (-), negrito (**) e parágrafos.
    const botao = document.querySelector('[data-script]');
    if (botao) {
      const painel = document.querySelector('.script');
      const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
      const linha = s => esc(s).replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
      let h = '', lista = false;
      for (const l of SCRIPT.split(/\\r?\\n/)) {
        const t = l.trim(), item = /^[-*] /.test(t);
        if (lista && !item) { h += '</ul>'; lista = false; }
        if (!t) continue;
        if (item) { if (!lista) { h += '<ul>'; lista = true; } h += '<li>' + linha(t.slice(2)) + '</li>'; }
        else if (/^#{1,2} /.test(t)) h += '<h3>' + linha(t.replace(/^#+ /, '')) + '</h3>';
        else if (/^#{3,} /.test(t)) h += '<h4>' + linha(t.replace(/^#+ /, '')) + '</h4>';
        else h += '<p>' + linha(t) + '</p>';
      }
      if (lista) h += '</ul>';
      painel.querySelector('.texto').innerHTML = h;
      const mostra = sim => { painel.hidden = !sim; botao.setAttribute('aria-pressed', sim); };
      botao.addEventListener('click', () => mostra(painel.hidden));
      painel.querySelector('header button').addEventListener('click', () => mostra(false));
    }
  })();
</script>
</body>
</html>
`;

for (const c of clientes) {
  fs.mkdirSync(path.join(out, 'ver', c.slug), { recursive: true });
  fs.writeFileSync(path.join(out, 'ver', c.slug, 'index.html'), moldura(c));
}
// Página "Para ligar": empresas que a linha de produção (linha/) deixou prontas: site + telefone + script.
fs.mkdirSync(path.join(out, 'ligar'), { recursive: true });
fs.writeFileSync(path.join(out, 'ligar', 'index.html'), paginaLigar(clientes.filter(c => c.ligacao), esc));
console.log(`hub: ${clientes.length} clientes em dist/_hub/, ${setores.length} setores`);
