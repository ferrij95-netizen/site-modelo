// Troca de idioma (PT/EN/ES) e filtro do catálogo (etapa, aplicação, busca).
(() => {
  const html = document.documentElement;
  const marca = () => document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === (html.dataset.l || 'pt')));
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (!b) return;
    html.dataset.l = b.dataset.lang;
    html.lang = { pt: 'pt-BR', en: 'en', es: 'es' }[b.dataset.lang];
    try { localStorage.setItem('gaidzinski-lang', b.dataset.lang); } catch (_) {}
    marca();
  });
  if (html.dataset.l && html.dataset.l !== 'pt') html.lang = html.dataset.l;
  marca();

  const f = document.querySelector('[data-filtros]');
  if (!f) return;
  const itens = [...document.querySelectorAll('.catalogo .mq')];
  const apl = f.querySelector('[data-apl]'), busca = f.querySelector('[data-busca]'), total = f.querySelector('[data-total]'), vazio = document.querySelector('.cat-vazio');
  const q = new URLSearchParams(location.search);
  let cat = q.get('cat') || '';
  if (q.get('apl')) apl.value = q.get('apl');
  const aplica = () => {
    const a = apl.value, t = busca.value.trim().toLowerCase();
    let n = 0;
    itens.forEach(i => {
      const ok = (!cat || i.dataset.cat === cat) && (!a || i.dataset.apl.split(' ').includes(a)) && (!t || i.dataset.busca.includes(t));
      i.hidden = !ok; if (ok) n++;
    });
    total.textContent = n; vazio.hidden = n > 0;
    f.querySelectorAll('[data-cat]').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === cat));
  };
  f.addEventListener('click', e => { const b = e.target.closest('button[data-cat]'); if (b) { cat = b.dataset.cat; aplica(); } });
  apl.addEventListener('change', aplica);
  busca.addEventListener('input', aplica);
  aplica();
})();
