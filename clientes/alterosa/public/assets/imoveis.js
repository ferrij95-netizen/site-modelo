// Filtro da lista de imóveis: lê ?neg=&tipo=&bairro= e esconde os cartões que não batem.
(() => {
  const lista = document.querySelector('[data-lista]');
  const form = document.querySelector('form[data-filtro]');
  if (!lista || !form) return;
  const cards = [...lista.querySelectorAll('.imv')];
  const total = document.querySelector('[data-total]'), vazio = document.querySelector('[data-vazio]');
  const p = new URLSearchParams(location.search);
  for (const [k, v] of p) { const el = form.elements[k]; if (!el) continue; if (el.length && el[0] && el[0].type === 'radio') [...el].forEach(r => r.checked = r.value === v); else el.value = v; }
  const aplica = () => {
    const f = new FormData(form), neg = f.get('neg') || '', tipo = f.get('tipo') || '', bairro = f.get('bairro') || '';
    let n = 0;
    cards.forEach(c => { const ok = (!neg || c.dataset.neg === neg) && (!tipo || c.dataset.tipo === tipo) && (!bairro || c.dataset.bairro === bairro); c.hidden = !ok; if (ok) n++; });
    if (total) total.textContent = n === 1 ? '1 imóvel' : `${n} imóveis`;
    if (vazio) vazio.hidden = n > 0;
  };
  form.addEventListener('change', aplica);
  form.addEventListener('submit', e => { e.preventDefault(); aplica(); });
  aplica();
})();
