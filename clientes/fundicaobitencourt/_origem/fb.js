// Linha do tempo (abas por ano) e filtro de produtos por linha.
(() => {
  document.querySelectorAll('[data-linha-tempo]').forEach(lt => {
    const bts = [...lt.querySelectorAll('[role=tab]')], ps = [...lt.querySelectorAll('[role=tabpanel]')];
    const vai = i => { bts.forEach((b, k) => b.setAttribute('aria-selected', k === i)); ps.forEach((p, k) => { p.hidden = k !== i; }); lt.style.setProperty('--p', `${(i / (bts.length - 1)) * 100}%`); };
    bts.forEach((b, i) => {
      b.addEventListener('click', () => vai(i));
      b.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { vai(Math.min(i + 1, bts.length - 1)); bts[Math.min(i + 1, bts.length - 1)].focus(); } if (e.key === 'ArrowLeft') { vai(Math.max(i - 1, 0)); bts[Math.max(i - 1, 0)].focus(); } });
    });
    vai(0);
  });
  const f = document.querySelector('.filtro');
  if (f) f.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    f.querySelectorAll('button').forEach(x => x.classList.toggle('ativo', x === b));
    document.querySelectorAll('.prods .pc').forEach(li => { li.hidden = !!b.dataset.filtro && li.dataset.linha !== b.dataset.filtro; });
  });
})();
