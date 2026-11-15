// Troca de idioma (PT/EN/ES sem recarregar) e abas de processos da versão B.
(() => {
  const html = document.documentElement;
  const marca = () => document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === (html.dataset.l || 'pt')));
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (!b) return;
    html.dataset.l = b.dataset.lang;
    html.lang = { pt: 'pt-BR', en: 'en', es: 'es' }[b.dataset.lang];
    try { localStorage.setItem('effisa-lang', b.dataset.lang); } catch (_) {}
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
})();
