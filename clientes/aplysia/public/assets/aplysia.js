// APLYSIA: menu do celular, banner rotativo, painéis de segmento, galeria ampliada, entrada suave e formulários
// (o formulário abre o e-mail ou o WhatsApp já preenchidos, sem servidor).
(() => {
  const btn = document.querySelector('[data-menu]');
  if (btn) {
    const nav = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', () => {
      const aberto = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!aberto));
      nav.classList.toggle('aberto', !aberto);
    });
  }

  const slider = document.querySelector('[data-slider]');
  if (slider) {
    const slides = [...slider.querySelectorAll('.slide')];
    const pontos = [...slider.querySelectorAll('.pontos-slider button')];
    let i = 0, timer;
    const ir = n => {
      slides[i].classList.remove('ativo'); pontos[i].removeAttribute('aria-current');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('ativo'); pontos[i].setAttribute('aria-current', 'true');
    };
    const tocar = () => { clearInterval(timer); timer = setInterval(() => ir(i + 1), 7000); };
    pontos.forEach((p, n) => p.addEventListener('click', () => { ir(n); tocar(); }));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) tocar();
  }

  // Painéis de segmento (versão B): abre o painel sob o mouse ou o foco.
  const paineis = [...document.querySelectorAll('.painel')];
  paineis.forEach(p => {
    const abrir = () => { paineis.forEach(x => x.classList.toggle('aberto', x === p)); };
    p.addEventListener('mouseenter', abrir);
    p.addEventListener('focus', abrir);
  });

  document.querySelectorAll('[data-galeria]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const v = document.createElement('div');
    v.className = 'visor';
    v.innerHTML = `<img src="${a.getAttribute('href')}" alt="${a.querySelector('img').alt}">`;
    v.addEventListener('click', () => v.remove());
    document.addEventListener('keydown', function esc(ev) { if (ev.key === 'Escape') { v.remove(); document.removeEventListener('keydown', esc); } });
    document.body.append(v);
  }));

  if ('IntersectionObserver' in window) {
    const alvos = document.querySelectorAll('main > section:not(.hero):not(.hero-b):not(.cab) > .in > *, .seg-card, .serv-card, .area-card, .premio, .casos li');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(el => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('revela'); io.observe(el); } });
  }

  const email = document.body.dataset.email, zap = document.body.dataset.zap, en = document.body.dataset.lang === 'en';
  document.querySelectorAll('[data-form]').forEach(form => {
    let via = 'email';
    form.querySelectorAll('[data-via]').forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const dados = [...form.querySelectorAll('input[name], select[name], textarea[name]')].filter(c => c.value.trim())
        .map(c => `${c.closest('label').querySelector('span').textContent.replace(' *', '')}: ${c.value.trim()}`);
      const assunto = form.dataset.assunto || form.querySelector('[name="assunto"]')?.value || (en ? 'Contact from the website' : 'Contato pelo site');
      const texto = `${en ? 'Hello, APLYSIA.' : 'Olá, APLYSIA.'}\n\n${dados.join('\n')}`;
      if (via === 'zap') window.open(`https://wa.me/${zap}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
      else location.href = `mailto:${email}?subject=${encodeURIComponent(assunto + ' · site')}&body=${encodeURIComponent(texto)}`;
    });
  });
})();
