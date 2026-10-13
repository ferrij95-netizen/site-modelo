// Frigoestrela: menu, submenus, carrossel, abas de marcas, catálogo com filtro, vídeo sob demanda, filtro de unidades e formulários da prévia.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Menu do celular
  const btn = $('[data-menu]');
  const nav = $('#nav');
  if (btn && nav) btn.addEventListener('click', () => {
    const aberto = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!aberto));
    document.body.classList.toggle('menu-aberto', !aberto);
  });
  $$('.abre-sub').forEach(b => b.addEventListener('click', () => {
    const li = b.closest('li');
    const ab = li.classList.toggle('aberto');
    b.setAttribute('aria-expanded', String(ab));
  }));

  // Topo muda ao rolar
  const topo = $('.topo');
  const rolar = () => document.body.classList.toggle('rolou', scrollY > 40);
  addEventListener('scroll', rolar, { passive: true }); rolar();

  // Carrossel
  $$('[data-slider]').forEach(sl => {
    const slides = $$('.slide', sl);
    const pontos = $$('.sl-pontos button', sl);
    let i = 0, timer;
    const ir = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('ativo', k === i));
      pontos.forEach((p, k) => (k === i ? p.setAttribute('aria-current', 'true') : p.removeAttribute('aria-current')));
    };
    const auto = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(i + 1), 6500); };
    pontos.forEach((p, k) => p.addEventListener('click', () => { ir(k); auto(); }));
    $('.sl-ant', sl)?.addEventListener('click', () => { ir(i - 1); auto(); });
    $('.sl-prox', sl)?.addEventListener('click', () => { ir(i + 1); auto(); });
    let x0 = null;
    sl.addEventListener('touchstart', e => (x0 = e.touches[0].clientX), { passive: true });
    sl.addEventListener('touchend', e => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 40) { ir(i + (d < 0 ? 1 : -1)); auto(); } x0 = null; });
    sl.addEventListener('mouseenter', () => clearInterval(timer));
    sl.addEventListener('mouseleave', auto);
    auto();
  });

  // Abas das marcas (home B)
  $$('[data-abas]').forEach(ab => {
    const tabs = $$('[role=tab]', ab);
    tabs.forEach((t, k) => t.addEventListener('click', () => {
      tabs.forEach((x, j) => {
        x.setAttribute('aria-selected', String(j === k));
        document.getElementById(x.getAttribute('aria-controls')).hidden = j !== k;
      });
    }));
  });

  // Vídeo institucional (Vimeo) só carrega no clique
  $$('[data-video]').forEach(v => $('.play', v).addEventListener('click', () => {
    v.innerHTML = `<iframe src="https://player.vimeo.com/video/${v.dataset.video}?autoplay=1&dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Frigoestrela"></iframe>`;
    v.classList.add('tocando');
  }));

  // Catálogo: busca por nome e filtro por conservação
  $$('[data-catalogo]').forEach(cat => {
    const busca = $('[data-busca]', cat);
    const chips = $$('.chips button', cat);
    const itens = $$('.et', cat);
    let tipo = '';
    const sem = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const aplicar = () => {
      const q = sem(busca.value.trim());
      let vis = 0;
      itens.forEach(it => { const ok = (!tipo || it.dataset.tipo === tipo) && (!q || sem(it.dataset.nome).includes(q)); it.hidden = !ok; if (ok) vis++; });
      $$('.linha-p', cat).forEach(l => (l.hidden = !$$('.et', l).some(e => !e.hidden)));
      $$('.grupo', cat).forEach(g => (g.hidden = !$$('.linha-p', g).some(e => !e.hidden)));
      $('.vazio', cat).hidden = vis > 0;
    };
    busca.addEventListener('input', aplicar);
    chips.forEach(c => c.addEventListener('click', () => { tipo = c.dataset.tipo; chips.forEach(x => x.setAttribute('aria-pressed', String(x === c))); aplicar(); }));
  });

  // Unidades: filtro pela legenda
  $$('[data-filtro-unidades]').forEach(w => {
    const bts = $$('.un-leg button', w);
    bts.forEach(b => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      bts.forEach(x => x.setAttribute('aria-pressed', String(on && x === b)));
      $$('.un', w).forEach(u => (u.hidden = on && !u.dataset.tipos.split(' ').includes(b.dataset.tipo)));
    }));
  });

  // Formulários da prévia: assunto pela URL e aviso ao enviar (ainda sem envio real).
  $$('[data-form]').forEach(f => {
    const a = new URLSearchParams(location.search).get('assunto');
    const sel = $('select[name=assunto]', f);
    if (a && sel) [...sel.options].forEach(o => { if (o.value.startsWith(a.slice(0, 6))) o.selected = true; });
    f.addEventListener('submit', e => { e.preventDefault(); $('.aviso', f).hidden = false; });
  });
})();
