// Buffalo: filtro do catálogo por linha (?l=), categoria (?c=) e busca
(() => {
  const f = document.querySelector('[data-filtros]'); if (!f) return;
  const bts = [...f.querySelectorAll('button[data-l]')], busca = f.querySelector('[data-busca]'), total = f.querySelector('[data-total]');
  const itens = [...document.querySelectorAll('.catalogo .pr')], vazio = document.querySelector('.cat-vazio');
  const ps = new URLSearchParams(location.search);
  let l = ps.get('l') || ''; const c = ps.get('c');
  if (c) { const el = itens.find(i => i.dataset.c === c); if (el) { l = el.dataset.l; setTimeout(() => { el.scrollIntoView({ block: 'center' }); el.querySelector('details')?.setAttribute('open', ''); }, 200); } }
  if (!bts.some(b => b.dataset.l === l)) l = '';
  const aplicar = () => {
    const q = (busca.value || '').trim().toLowerCase(); let n = 0;
    bts.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.l === l)));
    itens.forEach(i => { const ok = (!l || i.dataset.l === l) && (!q || i.dataset.busca.includes(q)); i.hidden = !ok; if (ok) n++; if (q && ok) i.querySelector('details')?.setAttribute('open', ''); });
    total.textContent = n; vazio.hidden = n > 0;
  };
  bts.forEach(b => b.addEventListener('click', () => { l = b.dataset.l; const u = new URL(location); l ? u.searchParams.set('l', l) : u.searchParams.delete('l'); u.searchParams.delete('c'); history.replaceState(null, '', u); aplicar(); }));
  busca.addEventListener('input', aplicar);
  aplicar();
})();
