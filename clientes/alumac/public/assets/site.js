// Menu do celular, abas do catálogo, filtro e zoom da galeria, vídeos do YouTube e formulário que abre o WhatsApp.
addEventListener('scroll', () => document.body.classList.toggle('rolou', scrollY > 40), { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// abas (versão B)
const abas = [...document.querySelectorAll('[role=tab]')];
const abre = t => abas.forEach(b => { const on = b === t; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; document.getElementById(b.getAttribute('aria-controls')).hidden = !on; });
abas.forEach((b, i) => {
  b.addEventListener('click', () => abre(b));
  b.addEventListener('keydown', e => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { const n = abas[(i + d + abas.length) % abas.length]; abre(n); n.focus(); } });
});

// filtro da galeria
const filtros = [...document.querySelectorAll('[data-filtro]')];
filtros.forEach(f => f.addEventListener('click', () => {
  filtros.forEach(o => o.setAttribute('aria-pressed', o === f));
  document.querySelectorAll('.galeria a').forEach(a => { a.hidden = !!f.dataset.filtro && a.dataset.cat !== f.dataset.filtro; });
}));

// zoom das fotos
document.addEventListener('click', e => {
  const a = e.target.closest('[data-zoom]');
  if (!a) return;
  e.preventDefault();
  const im = a.querySelector('img');
  const z = document.createElement('div');
  z.className = 'zoom'; z.setAttribute('role', 'dialog'); z.setAttribute('aria-modal', 'true');
  z.innerHTML = `<div><img src="${a.getAttribute('href')}" alt=""><p></p></div><button type="button" aria-label="Fechar">×</button>`;
  z.querySelector('p').textContent = im?.alt || '';
  const fecha = () => { z.remove(); removeEventListener('keydown', esc); a.focus(); };
  const esc = ev => ev.key === 'Escape' && fecha();
  z.addEventListener('click', ev => { if (ev.target === z || ev.target.tagName === 'BUTTON') fecha(); });
  addEventListener('keydown', esc);
  document.body.append(z); z.querySelector('button').focus();
});

// vídeo: troca a capa pelo player só quando a pessoa clica
document.querySelectorAll('[data-video]').forEach(v => v.addEventListener('click', () => {
  if (v.querySelector('iframe')) return;
  const f = document.createElement('iframe');
  f.src = `https://www.youtube-nocookie.com/embed/${v.dataset.video}?autoplay=1&rel=0`;
  f.title = v.getAttribute('aria-label'); f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  v.append(f);
}, { once: true }));

// produto vindo do link (?produto=...)
const sel = document.querySelector('[data-produto]'), pedido = new URLSearchParams(location.search).get('produto');
if (sel && pedido) sel.value = [...sel.options].some(o => o.value === pedido) ? pedido : '';

const form = document.querySelector('form.form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const linhas = [...new FormData(form)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${k === 'Produto' ? sel.selectedOptions[0].text : v}`);
  window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent('Olá! Pedido de orçamento pelo site da Alumac:\n' + linhas.join('\n'))}`, '_blank', 'noopener');
});
