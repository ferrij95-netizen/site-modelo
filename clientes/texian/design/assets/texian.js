// Menu, link ativo, vídeo do topo, filtro de notícias e formulários (enviados por e-mail).
(() => {
  const cab = document.getElementById('cab');
  const burger = cab.querySelector('.burger');
  burger.addEventListener('click', () => {
    const aberto = cab.classList.toggle('aberto');
    burger.setAttribute('aria-expanded', aberto);
    burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = aberto ? 'hidden' : '';
  });
  cab.querySelectorAll('.grupo>button').forEach(b => b.addEventListener('click', () => {
    const g = b.parentElement, on = g.classList.toggle('aberto');
    b.setAttribute('aria-expanded', on);
  }));

  // Link da página atual (e do grupo dela) em destaque.
  const aqui = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/pt';
  cab.querySelectorAll('.menu a').forEach(a => {
    const h = a.getAttribute('href').replace(/\/$/, '');
    if (h === aqui) {
      a.setAttribute('aria-current', 'page');
      const g = a.closest('.grupo');
      if (g) g.querySelector('button').setAttribute('aria-current', 'true');
    }
  });
  if (document.body.dataset.noticia !== undefined) cab.querySelector('.menu a[href="/pt/noticias"]')?.setAttribute('aria-current', 'true');

  // Vídeo de solda do topo: respeita quem prefere menos movimento.
  const v = document.querySelector('.hero video'), pausa = document.querySelector('.hero .pausa');
  if (v) {
    const parar = () => { v.pause(); pausa.innerHTML = '&#9654;'; pausa.setAttribute('aria-label', 'Reproduzir vídeo'); };
    const tocar = () => { v.play().catch(() => {}); pausa.innerHTML = '&#10073;&#10073;'; pausa.setAttribute('aria-label', 'Pausar vídeo'); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) parar();
    pausa.addEventListener('click', () => (v.paused ? tocar() : parar()));
  }

  // Entrada suave das seções.
  const io = 'IntersectionObserver' in window && new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rev').forEach(el => (io ? io.observe(el) : el.classList.add('on')));

  // Filtro de notícias por ano.
  const f = document.querySelector('.anos-f');
  if (f) f.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    f.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    document.querySelectorAll('.news [data-ano]').forEach(a => { a.hidden = b.dataset.ano !== 'todos' && a.dataset.ano !== b.dataset.ano; });
  });

  // Formulários: montam o e-mail para texian@texian.com.br com os campos preenchidos.
  document.querySelectorAll('form[data-assunto]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [...form.elements].filter(el => el.name && el.value.trim()).map(el => `${el.name}: ${el.value.trim()}`);
    const assunto = form.elements['Assunto']?.value.trim() || form.dataset.assunto;
    location.href = `mailto:texian@texian.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
  }));
})();
