// Troca de idioma (PT/EN/ES), filtro do catálogo e abas da versão B.
(() => {
  const html = document.documentElement;
  const marca = () => document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === (html.dataset.l || 'pt')));
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (!b) return;
    html.dataset.l = b.dataset.lang;
    html.lang = { pt: 'pt-BR', en: 'en', es: 'es' }[b.dataset.lang];
    try { localStorage.setItem('taf-lang', b.dataset.lang); } catch (_) {}
    marca();
  });
  if (html.dataset.l && html.dataset.l !== 'pt') html.lang = html.dataset.l;
  marca();

  document.querySelectorAll('[data-abas]').forEach(caixa => {
    const abas = [...caixa.querySelectorAll('[data-aba]')];
    abas.forEach(a => a.addEventListener('click', () => {
      abas.forEach(x => x.setAttribute('aria-selected', x === a));
      caixa.querySelectorAll('[data-painel]').forEach(p => { p.hidden = p.dataset.painel !== a.dataset.aba; });
    }));
  });

  const f = document.querySelector('[data-filtros]');
  if (!f) return;
  const itens = [...document.querySelectorAll('.catalogo .pr')];
  const sel = f.querySelector('[data-cia]'), busca = f.querySelector('[data-busca]'), total = f.querySelector('[data-total]'), vazio = document.querySelector('.cat-vazio');
  let linha = '';
  const q = new URLSearchParams(location.search);
  if (q.get('linha')) linha = q.get('linha');
  if (q.get('cia')) sel.value = q.get('cia');
  const aplica = () => {
    const c = sel.value, t = busca.value.trim().toLowerCase();
    let n = 0;
    itens.forEach(i => {
      const ok = (!linha || i.dataset.linha === linha) && (!c || i.dataset.cia.split('|').includes(c)) && (!t || i.dataset.busca.includes(t));
      i.hidden = !ok; if (ok) n++;
    });
    total.textContent = n; vazio.hidden = n > 0;
    f.querySelectorAll('[data-linha]').forEach(b => b.setAttribute('aria-pressed', b.dataset.linha === linha));
  };
  f.addEventListener('click', e => { const b = e.target.closest('button[data-linha]'); if (b) { linha = b.dataset.linha; aplica(); } });
  sel.addEventListener('change', aplica);
  busca.addEventListener('input', aplica);
  aplica();
})();
