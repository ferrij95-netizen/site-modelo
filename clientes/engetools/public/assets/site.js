// Menu do celular, abas de produtos (B) e formulário de contato.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// abas de produto, com setas do teclado
document.querySelectorAll('[data-abas]').forEach(box => {
  const bts = [...box.querySelectorAll('[role=tab]')];
  const abrir = b => {
    bts.forEach(o => { const on = o === b; o.setAttribute('aria-selected', String(on)); o.tabIndex = on ? 0 : -1; document.getElementById(o.getAttribute('aria-controls')).hidden = !on; });
  };
  bts.forEach((b, i) => {
    b.addEventListener('click', () => abrir(b));
    b.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { const n = bts[(i + d + bts.length) % bts.length]; abrir(n); n.focus(); }
    });
  });
});

// formulário: na prévia não envia, só confirma
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
