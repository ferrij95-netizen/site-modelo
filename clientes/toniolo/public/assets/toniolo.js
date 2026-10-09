// Menu do celular, seletor de idioma e vídeo institucional em janela.
document.querySelectorAll('[data-menu]').forEach(b => b.addEventListener('click', () => {
  const aberto = b.getAttribute('aria-expanded') === 'true';
  b.setAttribute('aria-expanded', String(!aberto));
  document.body.classList.toggle('menu-aberto', !aberto);
}));
document.addEventListener('click', e => {
  document.querySelectorAll('details.idioma[open]').forEach(d => { if (!d.contains(e.target)) d.removeAttribute('open'); });
});
document.querySelectorAll('[data-video]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const m = document.createElement('div');
  m.className = 'modal-video';
  m.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${a.dataset.video}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Grupo Toniolo"></iframe><button type="button" aria-label="Fechar">×</button>`;
  const fechar = () => { m.remove(); document.removeEventListener('keydown', esc); };
  const esc = ev => { if (ev.key === 'Escape') fechar(); };
  m.addEventListener('click', ev => { if (ev.target === m || ev.target.tagName === 'BUTTON') fechar(); });
  document.addEventListener('keydown', esc);
  document.body.appendChild(m);
}));
// Cabeçalho ganha fundo sólido ao rolar.
const topo = document.querySelector('.topo');
if (topo) {
  const f = () => topo.classList.toggle('rolou', scrollY > 40);
  f(); addEventListener('scroll', f, { passive: true });
}
