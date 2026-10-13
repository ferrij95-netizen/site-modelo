// Alumigroup: menu do celular, slider (versão A), abas do topo (versão B), formulários pelo WhatsApp e entrada suave.
(() => {
  const btn = document.querySelector('[data-menu]');
  const nav = document.getElementById('nav');
  if (btn && nav) btn.addEventListener('click', () => {
    const aberto = nav.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
  });

  // Slider da versão A: troca sozinho a cada 7 s, para quando o mouse está em cima.
  const slider = document.querySelector('[data-slider]');
  if (slider) {
    const slides = [...slider.querySelectorAll('[data-slide]')];
    const pontos = [...slider.querySelectorAll('[data-ir]')];
    let i = 0, timer;
    const ir = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('ativo', k === i));
      pontos.forEach((p, k) => (k === i ? p.setAttribute('aria-current', 'true') : p.removeAttribute('aria-current')));
    };
    const auto = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(i + 1), 7000); };
    slider.querySelector('[data-ant]').addEventListener('click', () => { ir(i - 1); auto(); });
    slider.querySelector('[data-prox]').addEventListener('click', () => { ir(i + 1); auto(); });
    pontos.forEach(p => p.addEventListener('click', () => { ir(+p.dataset.ir); auto(); }));
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', auto);
    auto();
  }

  // Abas do topo da versão B.
  const abas = document.querySelector('[data-abas]');
  if (abas) {
    const bts = [...abas.querySelectorAll('[data-aba]')];
    const pain = [...abas.querySelectorAll('[data-painel]')];
    bts.forEach(b => b.addEventListener('click', () => {
      bts.forEach(x => x.setAttribute('aria-selected', x === b));
      pain.forEach(p => p.classList.toggle('ativo', p.dataset.painel === b.dataset.aba));
    }));
  }

  // Formulários: montam a mensagem e abrem o WhatsApp da empresa.
  const zap = document.body.dataset.zap;
  document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const tipo = f.dataset.form === 'curriculo' ? 'Currículo pelo site' : 'Pedido de orçamento pelo site';
    const linhas = [...new FormData(f)].filter(([k, v]) => typeof v === 'string' && v.trim()).map(([k, v]) => `${k}: ${v.trim()}`);
    if (f.dataset.form === 'curriculo') linhas.push('(vou anexar o currículo nesta conversa)');
    window.open(`https://wa.me/${zap}?text=${encodeURIComponent(`${tipo}\n\n${linhas.join('\n')}`)}`, '_blank', 'noopener');
  }));

  // Entrada suave dos blocos ao rolar.
  if ('IntersectionObserver' in window) {
    const alvos = document.querySelectorAll('main .secao .tit, main .secao .in > *:not(.tit), .vantagens .vt, .vant-b .vb');
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(a => { if (a.getBoundingClientRect().top > innerHeight) { a.classList.add('revela'); io.observe(a); } });
  }
})();
