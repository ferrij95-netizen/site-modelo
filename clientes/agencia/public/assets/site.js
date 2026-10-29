// Menu do celular, cabeçalho ao rolar, abas das etapas, indicador de etapas, filtro de projetos e agenda do Cal.com
// (janela por cima da página e agenda embutida em /contato/).
(() => {
  const btn = document.querySelector('[data-menu]');
  if (btn) btn.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    btn.setAttribute('aria-expanded', aberto);
  });
  const topo = document.querySelector('.topo');
  const rolou = () => topo && topo.classList.toggle('rolou', scrollY > 8);
  addEventListener('scroll', rolou, { passive: true });
  rolou();

  // Abas (controle segmentado): cada botão mostra o painel de mesmo índice.
  document.querySelectorAll('[data-abas]').forEach(grupo => {
    const botoes = [...grupo.querySelectorAll('[role="tab"]')];
    const paineis = botoes.map(b => document.getElementById(b.getAttribute('aria-controls')));
    const ativar = i => {
      botoes.forEach((b, j) => { b.setAttribute('aria-selected', i === j); b.tabIndex = i === j ? 0 : -1; });
      paineis.forEach((p, j) => { if (p) p.hidden = i !== j; });
    };
    botoes.forEach((b, i) => {
      b.addEventListener('click', () => ativar(i));
      b.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const n = (i + d + botoes.length) % botoes.length;
        ativar(n); botoes[n].focus();
      });
    });
    ativar(0);
  });

  // Indicador de etapas: marca a etapa clicada e a que está na tela.
  const passos = [...document.querySelectorAll('.passos a')];
  if (passos.length) {
    const marcar = a => passos.forEach(p => p.classList.toggle('ativo', p === a));
    passos.forEach(a => a.addEventListener('click', () => marcar(a)));
    if ('IntersectionObserver' in window) {
      const alvo = Object.fromEntries(passos.map(a => [a.getAttribute('href').slice(1), a]));
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) marcar(alvo[e.target.id]); }), { rootMargin: '-30% 0px -55% 0px' });
      Object.keys(alvo).forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    }
  }

  // Filtro de projetos por setor.
  const filtro = document.querySelector('[data-filtro]');
  if (filtro) {
    filtro.hidden = false;
    const marcar = setor => {
      filtro.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.setor === setor));
      document.querySelectorAll('.proj[data-setor]').forEach(p => { p.hidden = !!setor && p.dataset.setor !== setor; });
    };
    filtro.addEventListener('click', e => { const b = e.target.closest('button'); if (b) marcar(b.dataset.setor); });
  }

  const CAL = document.body.dataset.cal;
  if (!CAL) return;
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, 'https://app.cal.com/embed/embed.js', 'init');
  Cal('init', 'overtus', { origin: 'https://app.cal.com' });
  Cal.ns.overtus('ui', {
    theme: 'light',
    layout: 'month_view',
    cssVarsPerTheme: { light: { 'cal-brand': '#182644', 'cal-brand-text': '#ffffff', 'cal-border': '#dde4ee', 'cal-border-subtle': '#e9eef6', 'cal-bg-subtle': '#f3f5f9' } },
  });
  document.querySelectorAll('[data-agendar]').forEach(a => {
    a.dataset.calLink = CAL;
    a.dataset.calNamespace = 'overtus';
    a.dataset.calConfig = JSON.stringify({ layout: 'month_view', theme: 'light' });
  });
  const inline = document.querySelector('[data-agenda-inline]');
  if (inline) Cal.ns.overtus('inline', { elementOrSelector: inline, calLink: CAL, config: { layout: 'month_view', theme: 'light' } });
})();
