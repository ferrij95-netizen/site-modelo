// Menu do celular, pontos "Navegue pelo site" (A), foto que troca nos espaços (B) e formulário da prévia.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// pontos laterais: um por seção marcada com data-secao, o da seção visível acende
const pontos = document.querySelector('.pontos');
const secoes = [...document.querySelectorAll('[data-secao]')];
if (pontos && secoes.length > 2) {
  const links = secoes.map((s, i) => {
    if (!s.id) s.id = `secao-${i}`;
    const a = document.createElement('a');
    a.href = `#${s.id}`; a.title = s.dataset.secao; a.setAttribute('aria-label', s.dataset.secao);
    pontos.appendChild(a);
    return a;
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach((a, i) => a.classList.toggle('on', secoes[i] === e.target));
    }), { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(s => io.observe(s));
  }
}

// espaços: a foto fixa troca conforme o texto passa no meio da tela
document.querySelectorAll('[data-troca]').forEach(box => {
  if (!('IntersectionObserver' in window)) return;
  const figs = [...box.querySelectorAll('.troca-midia figure')];
  const passos = [...box.querySelectorAll('[data-passo]')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const n = Number(e.target.dataset.passo);
    figs.forEach((f, i) => f.classList.toggle('on', i === n));
    passos.forEach((p, i) => p.classList.toggle('on', i === n));
  }), { rootMargin: '-45% 0px -45% 0px' });
  passos.forEach(p => io.observe(p));
});

// formulário: na prévia não envia, só avisa
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
