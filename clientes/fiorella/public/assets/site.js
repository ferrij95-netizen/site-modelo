// Fiorella · menu do celular, topo com sombra, buscador de entretelas (versão B), formulário para o WhatsApp e entrada suave.
(() => {
  const topo = document.querySelector('[data-topo]');
  const bt = document.querySelector('[data-menu]');
  const nav = document.getElementById('nav');
  if (bt && nav) bt.addEventListener('click', () => {
    const ab = nav.classList.toggle('aberto');
    bt.setAttribute('aria-expanded', ab);
  });
  const sombra = () => topo && topo.classList.toggle('rolou', scrollY > 10);
  addEventListener('scroll', sombra, { passive: true }); sombra();

  // buscador: dois grupos de filtro (uso e linha)
  const fil = document.querySelector('[data-filtros]');
  if (fil) {
    const estado = { merc: '', linha: '' };
    const tiles = [...document.querySelectorAll('[data-resultado] > [data-linha]')];
    const vazio = document.querySelector('[data-vazio]');
    fil.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const g = b.closest('[data-grupo]');
      estado[g.dataset.grupo] = b.dataset.v;
      g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      let n = 0;
      tiles.forEach(t => {
        const ok = (!estado.merc || t.dataset.merc === estado.merc) && (!estado.linha || t.dataset.linha === estado.linha);
        t.hidden = !ok; if (ok) n++;
      });
      if (vazio) vazio.hidden = n > 0;
    });
  }

  // formulário: monta a mensagem e abre o WhatsApp
  document.querySelectorAll('form[data-zap]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [f.dataset.intro, ''];
    new FormData(f).forEach((v, k) => { if (String(v).trim()) linhas.push(`${k}: ${v}`); });
    open(`https://wa.me/${f.dataset.zap}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
  }));

  const tl = document.querySelector('[data-topo-link]');
  if (tl) tl.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); });

  // entrada suave das seções
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const alvos = document.querySelectorAll('.sec-h, .bento, .proc, .regua, .lista li, .prods > *, .mgrid > *, .fabA-in > *, .fabB-in > *, .loja-in > *, .politica');
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('vis'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(a => { if (a.getBoundingClientRect().top > innerHeight) { a.classList.add('anim'); io.observe(a); } });
  }
})();
