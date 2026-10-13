// Menu lateral do hub, igual ao da prospecção (página inicial), para as outras páginas: /sites/, /ver/<cliente>/, /busca/, /importar/, /empresa/.
// Uso: <script src="/menu/menu.js"></script> logo depois de <body>. No celular vira uma barra fixa embaixo.
// As abas da prospecção abrem por endereço (/#triagem, /#empresas...), que a página inicial lê ao carregar.
(() => {
  const ic = d => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const itens = [
    ['/#visao', 'Visão geral', '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>'],
    ['/#triagem', 'Triagem', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>'],
    ['/#aprovar', 'Aprovar', '<rect x="6" y="3" width="12" height="18" rx="2.5"/><path d="M9.5 12.5l2 2 3.5-4"/>'],
    ['/#pedidos', 'Fazer site', '<path d="M4 5h16v11H4zM8 20h8M12 16v4M12 8v5M9.5 10.5h5"/>'],
    ['/#empresas', 'Empresas e CRM', '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>'],
    ['/#roteiro', 'Roteiro e bônus', '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'],
    null,
    ['/resultados/', 'Resultados', '<path d="M4 20h16M7 16v-5M12 16V6M17 16v-8"/>'],
    ['/sites/', 'Sites dos clientes', '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>'],
    ['/busca/', 'Buscar sites antigos', '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'],
    ['/ligar/', 'Para ligar', '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>'],
    ['/empresa/', 'Sobre a empresa', '<path d="M4 21V5l8-3 8 3v16M9 21v-5h6v5M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01"/>'],
    ['/sair', 'Sair', '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>'],
  ];
  const aqui = location.pathname;
  const atual = h => h === '/sites/' ? aqui === h || aqui.startsWith('/ver/') : aqui.startsWith(h);
  const css = `
html.trilho{padding-left:72px}
.trilho-menu{position:fixed;z-index:50;left:0;top:0;bottom:0;width:72px;display:flex;flex-direction:column;align-items:center;gap:clamp(2px,.8vh,8px);padding:clamp(12px,2.2vh,20px) 0;
  background:radial-gradient(140% 40% at 0% 0%,rgba(40,14,1,.85) 0%,rgba(40,14,1,0) 70%),radial-gradient(160% 30% at 100% 100%,rgba(237,148,84,.22) 0%,rgba(237,148,84,0) 70%),#182644;font-family:system-ui,sans-serif}
.trilho-menu .logo{width:40px;height:40px;border-radius:50%;margin-bottom:clamp(6px,2vh,18px);display:flex;align-items:center;justify-content:center;text-decoration:none;
  box-shadow:inset 0 0 0 1.5px rgba(254,249,225,.35);
  background:radial-gradient(circle at 25% 20%,rgba(40,14,1,.9) 0%,rgba(40,14,1,0) 55%),radial-gradient(circle at 80% 85%,rgba(237,148,84,.45) 0%,rgba(237,148,84,0) 55%),linear-gradient(160deg,#182644 0%,#5a769f 100%)}
.trilho-menu .logo span{font-family:Fraunces,Georgia,serif;font-size:22px;line-height:1;color:#fef9e1}
.trilho-menu a.rb{width:44px;height:clamp(36px,5.2vh,44px);border-radius:12px;display:flex;align-items:center;justify-content:center;color:rgba(254,249,225,.7);text-decoration:none}
.trilho-menu a.rb:hover{background:rgba(254,249,225,.08);color:#fef9e1}
.trilho-menu a.rb[aria-current="page"]{background:rgba(254,249,225,.12);color:#fef9e1}
.trilho-menu svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.trilho-menu .sp{flex:1}
@media (max-width:900px){
  html.trilho{padding-left:0}
  html.trilho body{padding-bottom:calc(64px + env(safe-area-inset-bottom,0px))}
  .trilho-menu{top:auto;right:0;width:auto;height:auto;flex-direction:row;justify-content:space-around;gap:0;padding:8px 8px calc(8px + env(safe-area-inset-bottom,0px))}
  .trilho-menu .logo,.trilho-menu .sp{display:none}
  .trilho-menu a.rb{height:44px}
}`;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);
  const nav = document.createElement('nav');
  nav.className = 'trilho-menu';
  nav.setAttribute('aria-label', 'Menu do hub');
  nav.innerHTML = '<a class="logo" href="/" title="Prospecção (visão geral)"><span>O</span></a>' + itens.map(i => i
    ? `<a class="rb" href="${i[0]}" title="${i[1]}" aria-label="${i[1]}"${atual(i[0]) ? ' aria-current="page"' : ''}>${ic(i[2])}</a>`
    : '<span class="sp"></span>').join('');
  document.documentElement.classList.add('trilho');
  document.body.prepend(nav);
})();
