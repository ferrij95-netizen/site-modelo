// Menu do celular, régua de temperatura (B: foto fixa que troca), antes e hoje (B) e formulário de contato.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// régua: a foto fixa troca e a etapa acende conforme passa no meio da tela
document.querySelectorAll('[data-regua]').forEach(r => {
  if (!('IntersectionObserver' in window)) return;
  const figs = [...r.querySelectorAll('.regua-fotos figure')];
  const passos = [...r.querySelectorAll('[data-passo]')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const n = Number(e.target.dataset.passo);
    figs.forEach((f, i) => f.classList.toggle('on', i === n));
    passos.forEach((p, i) => p.classList.toggle('on', i <= n));
  }), { rootMargin: '-45% 0px -45% 0px' });
  passos.forEach(p => io.observe(p));
});

// antes e hoje: a linha acompanha o controle deslizante
document.querySelectorAll('[data-compara]').forEach(c => {
  const r = c.querySelector('input');
  r.addEventListener('input', () => c.style.setProperty('--pos', r.value + '%'));
});

// formulário: na prévia não envia, só confirma
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
