// Menu, filtro de raça, números que contam, ciclo do programa (versão B) e formulário que monta e-mail ou WhatsApp.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', Math.max(0, topo.getBoundingClientRect().bottom) + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// filtro Hereford / Braford
document.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('[data-filtro]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  document.querySelectorAll('[data-lista-touros] .touro').forEach(t => { t.hidden = !!b.dataset.filtro && t.dataset.raca !== b.dataset.filtro; });
}));

// números que contam ao aparecer
const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;
const contas = document.querySelectorAll('[data-conta]');
if (!parado && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, txt = el.textContent, m = txt.match(/[\d.]+/); if (!m) return;
    const fim = parseFloat(m[0].replace(/\./g, '')), ini = +(el.dataset.contaDe || 0), t0 = performance.now(), dur = 1400;
    const fmt = n => Math.round(n).toLocaleString('pt-BR');
    const passo = t => { const p = Math.min(1, (t - t0) / dur), v = ini + (fim - ini) * (1 - Math.pow(1 - p, 3)); el.textContent = txt.replace(m[0], el.dataset.contaDe ? Math.round(v) : fmt(v)); if (p < 1) requestAnimationFrame(passo); };
    requestAnimationFrame(passo);
  }), { threshold: .6 });
  contas.forEach(c => io.observe(c));
}

// ciclo do programa (versão B)
const ciclo = document.querySelector('[data-ciclo]');
if (ciclo) {
  const itens = [...ciclo.querySelectorAll('.ciclo-lista li')], nos = [...ciclo.querySelectorAll('.ciclo-no')];
  let atual = 0, timer;
  const vai = k => { atual = k; itens.forEach((li, i) => { li.classList.toggle('on', i === k); li.querySelector('button').setAttribute('aria-expanded', String(i === k)); }); nos.forEach((n, i) => n.classList.toggle('on', i === k)); };
  const para = () => clearInterval(timer);
  itens.forEach((li, i) => li.querySelector('button').addEventListener('click', () => { para(); vai(i); }));
  nos.forEach((n, i) => n.addEventListener('click', () => { para(); vai(i); }));
  vai(0);
  if (!parado) {
    const io = new IntersectionObserver(([e]) => { para(); if (e.isIntersecting) timer = setInterval(() => vai((atual + 1) % itens.length), 4200); }, { threshold: .4 });
    io.observe(ciclo); ciclo.addEventListener('pointerenter', para, { once: true });
  }
}

// formulário
const linhasForm = f => [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
document.querySelectorAll('form[data-mailto]').forEach(f => {
  f.addEventListener('submit', e => { e.preventDefault(); location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhasForm(f).join('\n'))}`; });
  f.querySelector('[data-wa]')?.addEventListener('click', ev => { if (!f.reportValidity()) return; open(`https://wa.me/${ev.currentTarget.dataset.wa}?text=${encodeURIComponent(`${f.dataset.assunto}\n${linhasForm(f).join('\n')}`)}`, '_blank'); });
});
