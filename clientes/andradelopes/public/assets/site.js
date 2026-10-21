// Menu, banner que troca de foto (A), filtro do portfólio por finalidade, linha das etapas que enche ao aparecer (B)
// e formulário de contato que abre o e-mail já preenchido.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });
const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;

// banner da abertura (A)
document.querySelectorAll('[data-banner]').forEach(b => {
  const fotos = [...b.querySelectorAll('figure')], pontos = [...b.querySelectorAll('.banner-pontos button')];
  let i = 0, timer;
  const vai = n => { i = (n + fotos.length) % fotos.length; fotos.forEach((f, k) => f.classList.toggle('on', k === i)); pontos.forEach((p, k) => p.toggleAttribute('aria-current', k === i)); };
  const auto = () => { clearInterval(timer); if (!parado) timer = setInterval(() => vai(i + 1), 5500); };
  pontos.forEach((p, k) => p.addEventListener('click', () => { vai(k); auto(); }));
  auto();
});

// filtro do portfólio
document.querySelectorAll('[data-filtros]').forEach(box => {
  const lista = box.parentElement.querySelector('[data-lista]');
  box.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    box.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const f = b.dataset.f;
    lista.querySelectorAll('[data-fin]').forEach(it => { it.hidden = f && it.dataset.fin !== f; });
  });
});

// linha das etapas (B)
const regua = document.querySelector('[data-regua]');
if (regua && 'IntersectionObserver' in window && !parado) {
  regua.style.setProperty('--cheio', '0%');
  new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { regua.style.setProperty('--cheio', '100%'); o.disconnect(); } }), { threshold: .5 }).observe(regua);
}

// contato: monta o e-mail
document.querySelectorAll('[data-contato]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  const corpo = `Nome: ${d.nome}\nEmpresa: ${d.empresa || '-'}\nE-mail: ${d.email}\nFone: ${d.fone || '-'}\nAssunto: ${d.assunto}\n\n${d.mensagem || ''}`;
  location.href = `mailto:${f.dataset.para}?subject=${encodeURIComponent(`Contato pelo site: ${d.assunto}`)}&body=${encodeURIComponent(corpo)}`;
}));
