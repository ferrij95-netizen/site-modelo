// Botão fechado/aberto nos retráteis e abas de linhas da versão B.
(() => {
  document.querySelectorAll('[data-pf]').forEach(pf => pf.addEventListener('click', e => {
    const b = e.target.closest('[data-pos]');
    if (!b) return;
    pf.classList.toggle('mostra-aberto', b.dataset.pos === 'aberto');
    pf.querySelectorAll('[data-pos]').forEach(x => x.setAttribute('aria-pressed', x === b));
  }));
  document.querySelectorAll('[data-abas]').forEach(caixa => {
    const abas = [...caixa.querySelectorAll('[data-aba]')];
    abas.forEach(a => a.addEventListener('click', () => {
      abas.forEach(x => x.setAttribute('aria-selected', x === a));
      caixa.querySelectorAll('[data-painel]').forEach(p => { p.hidden = p.dataset.painel !== a.dataset.aba; });
    }));
  });
})();
