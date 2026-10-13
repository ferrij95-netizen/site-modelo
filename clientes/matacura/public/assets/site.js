// Matacura: menu, topo ao rolar, aparecer ao rolar, galeria, abas, filtros do catálogo, vídeos leves e formulários (abrem o e-mail).
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  document.documentElement.classList.add('js');

  const topo = $('[data-topo]');
  const rolar = () => topo && topo.classList.toggle('rolou', scrollY > 10);
  addEventListener('scroll', rolar, { passive: true }); rolar();

  const btn = $('[data-menu]'), nav = $('#nav');
  btn && btn.addEventListener('click', () => {
    const aberto = nav.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
    document.body.style.overflow = aberto ? 'hidden' : '';
  });

  // aparecer ao rolar
  const alvos = $$('.sec-head, .cp, .linha-a, .nec, .nb, .atalho, .nums .n, .pol, .rep, .tempo li, .pi-bloco, .oc-marca');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ok'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
    alvos.forEach((el, i) => { el.classList.add('revela'); el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el); });
  }

  // galeria do produto
  const gal = $('[data-galeria]');
  $$('[data-mini]').forEach(b => b.addEventListener('click', () => {
    $$('[data-mini]').forEach(x => x.classList.toggle('on', x === b));
    $$('[data-foto]', gal).forEach(f => f.classList.toggle('on', f.dataset.foto === b.dataset.mini));
  }));

  // abas (linhas na home B, estados nos representantes)
  const abas = (sel, painel, chave) => $$(sel).forEach(b => b.addEventListener('click', () => {
    $$(sel).forEach(x => x.setAttribute('aria-selected', x === b));
    $$(painel).forEach(p => (p.hidden = p.dataset[chave] !== b.dataset[chave === 'painel' ? 'aba' : 'uf']));
  }));
  abas('[data-aba]', '[data-painel]', 'painel');
  abas('[data-uf]', '[data-uf-painel]', 'ufPainel');

  // trilho horizontal
  const tr = $('[data-trilho]');
  if (tr) {
    const passo = () => tr.firstElementChild.getBoundingClientRect().width + 20;
    $('[data-trilho-ant]').addEventListener('click', () => tr.scrollBy({ left: -passo(), behavior: 'smooth' }));
    $('[data-trilho-prox]').addEventListener('click', () => tr.scrollBy({ left: passo(), behavior: 'smooth' }));
  }

  // filtros do catálogo (linha + necessidade); ?para=<necessidade> no link já filtra
  const cards = $$('.catalogo .cp');
  if (cards.length) {
    let fl = 'todas', ft = new URLSearchParams(location.search).get('para') || 'todas';
    const aplicar = () => {
      $$('[data-f-linha]').forEach(b => b.classList.toggle('on', b.dataset.fLinha === fl));
      $$('[data-f-tag]').forEach(b => b.classList.toggle('on', b.dataset.fTag === ft));
      let n = 0;
      cards.forEach(c => { const ok = (fl === 'todas' || c.dataset.linha === fl) && (ft === 'todas' || c.dataset.tags.split(' ').includes(ft)); c.classList.toggle('esconde', !ok); n += ok; });
      $$('.cat-bloco').forEach(b => b.classList.toggle('esconde', !$$('.cp:not(.esconde)', b).length));
      $('[data-vazio]').hidden = n > 0;
    };
    $$('[data-f-linha]').forEach(b => b.addEventListener('click', () => { fl = b.dataset.fLinha; aplicar(); }));
    $$('[data-f-tag]').forEach(b => b.addEventListener('click', () => { ft = b.dataset.fTag; aplicar(); }));
    $('[data-limpar]').addEventListener('click', () => { fl = ft = 'todas'; aplicar(); });
    if (!$$('[data-f-tag]').some(b => b.dataset.fTag === ft)) ft = 'todas';
    aplicar();
  }

  // vídeo do YouTube só ao clicar
  $$('[data-yt]').forEach(b => b.addEventListener('click', () => {
    b.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="${b.getAttribute('aria-label')}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }, { once: true }));

  // formulários: monta o e-mail com os campos
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [...new FormData(f)].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
    location.href = `mailto:${f.dataset.para}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
  }));
})();
