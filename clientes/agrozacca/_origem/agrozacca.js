// Agrozacca: filtro do catálogo por espécie (?esp=) e busca
(() => {
  const f = document.querySelector('[data-filtros]'); if (!f) return;
  const bts = [...f.querySelectorAll('button[data-esp]')], busca = f.querySelector('[data-busca]'), total = f.querySelector('[data-total]');
  const itens = [...document.querySelectorAll('.catalogo .pr')], vazio = document.querySelector('.cat-vazio');
  let esp = new URLSearchParams(location.search).get('esp') || '';
  if (!bts.some(b => b.dataset.esp === esp)) esp = '';
  const aplicar = () => {
    const q = (busca.value || '').trim().toLowerCase(); let n = 0;
    bts.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.esp === esp)));
    itens.forEach(i => { const ok = (!esp || i.dataset.esp === esp) && (!q || i.dataset.busca.includes(q)); i.hidden = !ok; if (ok) n++; });
    total.textContent = n; vazio.hidden = n > 0;
  };
  bts.forEach(b => b.addEventListener('click', () => { esp = b.dataset.esp; const u = new URL(location); esp ? u.searchParams.set('esp', esp) : u.searchParams.delete('esp'); history.replaceState(null, '', u); aplicar(); }));
  busca.addEventListener('input', aplicar);
  aplicar();
})();
