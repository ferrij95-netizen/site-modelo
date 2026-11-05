// Menu do celular, abas (atividades na B), formulário de contato e contagem para o leilão.
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

// contagem regressiva para o próximo leilão
const fmt = el => {
  const fim = new Date(el.dataset.ate).getTime(), r = fim - Date.now();
  if (r <= -6 * 36e5) { el.hidden = true; return; }
  if (r <= 0) { el.textContent = 'Ao vivo agora'; return; }
  const d = Math.floor(r / 864e5), h = Math.floor(r / 36e5) % 24, m = Math.floor(r / 6e4) % 60;
  el.innerHTML = `<span><b>${d}</b>dias</span><span><b>${h}</b>h</span><span><b>${String(m).padStart(2, '0')}</b>min</span>`;
};
const conts = document.querySelectorAll('.contagem[data-ate]');
conts.forEach(fmt);
if (conts.length) setInterval(() => conts.forEach(fmt), 30000);
