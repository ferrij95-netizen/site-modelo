// Menu do celular, submenu "Outros serviços" e formulário que abre o e-mail com a mensagem pronta.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => {
  const a = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!a));
  menu.classList.toggle('aberto', !a);
});

document.querySelectorAll('.sub>button').forEach(b => b.addEventListener('click', () => {
  const sub = b.parentElement, a = sub.classList.toggle('aberto');
  b.setAttribute('aria-expanded', String(a));
}));
document.addEventListener('click', e => {
  document.querySelectorAll('.sub.aberto').forEach(s => { if (!s.contains(e.target)) { s.classList.remove('aberto'); s.querySelector('button').setAttribute('aria-expanded', 'false'); } });
});

document.querySelectorAll('form[data-form-email]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const assunto = `${d.get('Assunto') || 'Contato'} · site Destil`;
  const corpo = [...d.entries()].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`).join('\n');
  location.href = `mailto:${f.dataset.formEmail}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
}));
