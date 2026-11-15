// Nutrepampa: filtro do catálogo por criação (?g=), linha (?l=) e busca
(() => {
  const f = document.querySelector('[data-filtros]'); if (!f) return;
  const bts = [...f.querySelectorAll('button[data-g]')], sel = f.querySelector('[data-linha]'), busca = f.querySelector('[data-busca]'), total = f.querySelector('[data-total]');
  const itens = [...document.querySelectorAll('.catalogo .pr')], vazio = document.querySelector('.cat-vazio');
  const ps = new URLSearchParams(location.search);
  let g = ps.get('g') || '', l = ps.get('l') || '';
  if (!bts.some(b => b.dataset.g === g)) g = '';
  const opLinha = sel ? [...sel.options].find(o => o.value === l) : null;
  if (!opLinha) l = ''; else if (!g) g = opLinha.dataset.g;
  const url = () => { const u = new URL(location); g ? u.searchParams.set('g', g) : u.searchParams.delete('g'); l ? u.searchParams.set('l', l) : u.searchParams.delete('l'); history.replaceState(null, '', u); };
  const aplicar = () => {
    const q = (busca.value || '').trim().toLowerCase(); let n = 0;
    bts.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.g === g)));
    [...sel.options].forEach(o => { o.hidden = !!(o.value && g && o.dataset.g !== g); });
    sel.value = l;
    itens.forEach(i => { const ok = (!g || i.dataset.g === g) && (!l || i.dataset.l === l) && (!q || i.dataset.busca.includes(q)); i.hidden = !ok; if (ok) n++; });
    total.textContent = n; vazio.hidden = n > 0;
  };
  bts.forEach(b => b.addEventListener('click', () => { g = b.dataset.g; l = ''; url(); aplicar(); }));
  sel.addEventListener('change', () => { l = sel.value; if (l) g = sel.selectedOptions[0].dataset.g; url(); aplicar(); });
  busca.addEventListener('input', aplicar);
  aplicar();
})();
