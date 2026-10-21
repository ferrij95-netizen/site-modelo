// Menu, filtro de modelos (linha e número de passageiros), números que contam e formulários que montam WhatsApp ou e-mail.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', Math.max(0, topo.getBoundingClientRect().bottom) + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// filtro: linha (botões) + mínimo de passageiros (régua)
let linha = '';
const grade = document.querySelector('[data-grade]');
function filtra() {
  document.querySelectorAll('[data-lugares]').forEach(box => {
    const r = box.querySelector('[data-lug]'); if (!r) return;
    const n = +r.value;
    box.querySelectorAll('[data-lug-out]').forEach(o => { o.textContent = n; });
    box.querySelectorAll('[data-lug-txt]').forEach(o => { o.textContent = n; });
    let c = 0;
    box.querySelectorAll('[data-lug-lista] [data-lugares-max]').forEach(a => { const ok = +a.dataset.lugaresMax >= n; a.hidden = !ok; if (ok) c++; });
    box.querySelectorAll('[data-lug-grupo]').forEach(g => { g.hidden = !g.querySelector('a:not([hidden])'); });
    const cont = box.querySelector('[data-lug-n]'); if (cont) cont.textContent = c;
  });
  if (!grade) return;
  const r = document.querySelector('[data-lugares-grade] [data-lug]');
  const min = r ? +r.value : 0;
  let total = 0;
  grade.querySelectorAll('[data-linha]').forEach(el => {
    const ok = (!linha || el.dataset.linha === linha) && +el.dataset.lugaresMax >= min;
    el.hidden = !ok; if (ok) total++;
  });
  const sem = document.querySelector('[data-sem-res]'); if (sem) sem.hidden = total > 0;
}
document.querySelectorAll('[data-lug]').forEach(r => r.addEventListener('input', filtra));
document.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => {
  linha = b.dataset.filtro;
  document.querySelectorAll('[data-filtro]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  filtra();
}));
filtra();

// números que contam ao aparecer
const contas = document.querySelectorAll('[data-conta]');
if (contas.length && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, fim = +el.textContent, ini = fim > 1000 ? fim - 34 : 0, t0 = performance.now();
    const passo = t => { const p = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(ini + (fim - ini) * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(passo); };
    requestAnimationFrame(passo);
  }), { threshold: .6 });
  contas.forEach(c => io.observe(c));
}

// formulários: montam a mensagem e abrem o WhatsApp ou o e-mail
document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const via = e.submitter?.value || 'wa';
  const linhas = [];
  new FormData(f).forEach((v, k) => { if (String(v).trim()) linhas.push(`${k}: ${String(v).trim()}`); });
  const texto = `${f.dataset.assunto}\n\n${linhas.join('\n')}`;
  if (via === 'email') location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(texto)}`;
  else window.open(`https://wa.me/${f.dataset.wa}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
}));
