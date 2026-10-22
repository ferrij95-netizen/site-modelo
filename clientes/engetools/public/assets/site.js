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

// catálogo (A): filtro por linha, também pelo ?cat= da URL
const filtro = document.querySelector('[data-filtro]'), vit = document.querySelector('[data-vitrine]');
if (filtro && vit) {
  const aplicar = cat => {
    filtro.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === cat)));
    vit.querySelectorAll('.item').forEach(it => { it.hidden = !!cat && it.dataset.cat !== cat; });
  };
  filtro.addEventListener('click', e => { const b = e.target.closest('button'); if (b) aplicar(b.dataset.cat); });
  const c = new URLSearchParams(location.search).get('cat');
  if (c && filtro.querySelector(`[data-cat="${c}"]`)) aplicar(c);
}

// contato: "Pedir orçamento" de um produto já preenche o assunto e a mensagem
const fc = document.getElementById('form');
if (fc) {
  const q = new URLSearchParams(location.search), prod = q.get('produto'), cat = q.get('cat');
  const assunto = { fresas: 0, abrasivos: 1, grafite: 2, especiais: 3 }[cat];
  if (assunto !== undefined) fc.querySelector('select').selectedIndex = assunto;
  if (prod) fc.querySelector('textarea').value = `Gostaria de um orçamento de: ${prod}\nQuantidade: \nMaterial da peça / máquina: `;
}
