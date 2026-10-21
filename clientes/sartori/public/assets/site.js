// Menu do celular, vídeo que só carrega no clique, foto que troca no caminho do campo à mesa (B), filtro Premium/Churrasco e formulário.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); document.body.classList.toggle('menu-aberto', !a); });

// vídeo institucional do YouTube: troca a capa pelo player só quando a pessoa clica
document.querySelectorAll('[data-video]').forEach(v => v.querySelector('button').addEventListener('click', () => {
  v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.video}?autoplay=1&rel=0" title="Sartori Alimentos, vídeo institucional" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
}));

// caminho do campo à mesa: a foto fixa troca conforme a etapa passa no meio da tela
const cam = document.querySelector('[data-troca]');
if (cam && 'IntersectionObserver' in window) {
  const figs = [...cam.querySelectorAll('.caminho-fotos figure')];
  const passos = [...cam.querySelectorAll('[data-passo]')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const n = Number(e.target.dataset.passo);
    figs.forEach((f, i) => f.classList.toggle('on', i === n));
    passos.forEach((p, i) => p.classList.toggle('on', i === n));
  }), { rootMargin: '-45% 0px -45% 0px' });
  passos.forEach(p => io.observe(p));
}

// filtro da linha Boitatá (Premium / Churrasco)
document.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => {
  const f = b.dataset.filtro;
  document.querySelectorAll('[data-filtro]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  document.querySelectorAll('[data-grupo]').forEach(g => { g.hidden = !!f && g.dataset.grupo !== f; });
}));

// formulário: na prévia não envia, só avisa
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
