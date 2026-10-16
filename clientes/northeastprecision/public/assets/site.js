// Menu, submenus, abas, vídeos do YouTube sob demanda e formulários que montam um e-mail.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });
document.querySelectorAll('.sub > button').forEach(b => b.addEventListener('click', () => { const s = b.parentElement; const a = s.classList.toggle('aberto'); b.setAttribute('aria-expanded', String(a)); }));

document.querySelectorAll('[data-abas]').forEach(box => {
  const tabs = [...box.querySelectorAll('[role=tab]')];
  tabs.forEach(t => t.addEventListener('click', () => tabs.forEach(o => {
    const on = o === t; o.setAttribute('aria-selected', String(on)); document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
  })));
});

document.querySelectorAll('.yt').forEach(b => b.addEventListener('click', () => {
  b.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1" title="${b.getAttribute('aria-label')}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
}, { once: true }));

document.querySelectorAll('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
  location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
}));

// Versão C: topo transparente sobre a abertura, fica sólido ao rolar.
if (document.body.classList.contains('c-home')) { const f = () => document.body.classList.toggle('c-rolou', scrollY > 40); f(); addEventListener('scroll', f, { passive: true }); }
