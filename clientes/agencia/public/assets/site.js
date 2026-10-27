// Menu do celular, cabeçalho ao rolar e agenda do Cal.com (janela por cima da página e agenda na página de contato).
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

  // Lista de setores: o print à direita mostra um projeto do setor apontado.
  document.querySelectorAll('.setlista').forEach(sl => {
    const img = sl.querySelector('.setlista-tela img');
    const links = sl.querySelectorAll('a[data-tela]');
    const ativar = a => { links.forEach(l => l.classList.toggle('ativo', l === a)); if (img && img.getAttribute('src') !== a.dataset.tela) img.src = a.dataset.tela; };
    links.forEach(a => { a.addEventListener('mouseenter', () => ativar(a)); a.addEventListener('focus', () => ativar(a)); });
    if (links[0]) links[0].classList.add('ativo');
  });

  const CAL = document.body.dataset.cal;
  if (!CAL) return;
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, 'https://app.cal.com/embed/embed.js', 'init');
  Cal('init', 'overtus', { origin: 'https://app.cal.com' });
  const escuro = document.body.classList.contains('v-b');
  Cal.ns.overtus('ui', {
    theme: escuro ? 'dark' : 'light',
    layout: 'month_view',
    cssVarsPerTheme: {
      dark: { 'cal-brand': '#fef9e1', 'cal-brand-text': '#182644', 'cal-bg': '#182644', 'cal-bg-muted': '#1f3052', 'cal-bg-subtle': '#24365d', 'cal-bg-emphasis': '#2c4170', 'cal-border': '#34497a', 'cal-border-subtle': '#2c4170', 'cal-text': '#fef9e1', 'cal-text-emphasis': '#ffffff', 'cal-text-muted': '#c1d3e6' },
      light: { 'cal-brand': '#182644', 'cal-brand-text': '#fef9e1' },
    },
  });
  document.querySelectorAll('[data-agendar]').forEach(a => {
    a.dataset.calLink = CAL;
    a.dataset.calNamespace = 'overtus';
    a.dataset.calConfig = JSON.stringify({ layout: 'month_view', theme: escuro ? 'dark' : 'light' });
  });
  const inline = document.querySelector('[data-agenda-inline]');
  if (inline) Cal.ns.overtus('inline', { elementOrSelector: inline, calLink: CAL, config: { layout: 'month_view', theme: escuro ? 'dark' : 'light' } });
})();
