// Fino Alimentos: menu do celular, formulário de prévia, entradas ao rolar, números e etapas da versão B.
(() => {
  const d = document;
  const btn = d.querySelector('.abre-menu');
  if (btn) btn.addEventListener('click', () => {
    const aberto = d.body.classList.toggle('menu-aberto');
    btn.setAttribute('aria-expanded', aberto);
  });

  d.querySelectorAll('form[data-previa]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const aviso = f.querySelector('.form-aviso');
    aviso.hidden = false;
    aviso.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }));

  const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || calmo) return;

  const revs = d.querySelectorAll('[data-rev]');
  d.documentElement.classList.add('js-rev');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  revs.forEach(el => io.observe(el));

  const conta = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    conta.unobserve(e.target);
    const fim = parseInt(e.target.textContent, 10), t0 = performance.now();
    const passo = t => {
      const k = Math.min(1, (t - t0) / 1100);
      e.target.textContent = Math.round(fim * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }), { threshold: .6 });
  d.querySelectorAll('[data-conta]').forEach(el => conta.observe(el));

  // Versão B: a foto fixa troca conforme a etapa que está no meio da tela.
  d.querySelectorAll('[data-troca]').forEach(sec => {
    const figs = sec.querySelectorAll('.b-cam-midia figure');
    const passos = [...sec.querySelectorAll('.b-passo')];
    const ob = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const i = passos.indexOf(e.target);
      passos.forEach((p, k) => p.classList.toggle('ativo', k === i));
      figs.forEach((f, k) => f.classList.toggle('ativo', k === i));
    }), { rootMargin: '-45% 0px -45% 0px' });
    passos.forEach(p => ob.observe(p));
  });
})();
