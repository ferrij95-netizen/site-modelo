// Abas de serviços (versão A) e filtro da galeria de obras.
(() => {
  document.querySelectorAll('[data-abas]').forEach(box => {
    const abas = [...box.querySelectorAll('[role=tab]')];
    const paineis = abas.map(a => document.getElementById(a.getAttribute('aria-controls')));
    box.classList.add('pronto');
    const vai = (i, foco) => {
      abas.forEach((a, k) => { a.setAttribute('aria-selected', k === i); a.tabIndex = k === i ? 0 : -1; paineis[k].hidden = k !== i; });
      if (foco) abas[i].focus();
    };
    abas.forEach((a, i) => {
      a.addEventListener('click', () => vai(i));
      a.addEventListener('keydown', e => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); vai((i + d + abas.length) % abas.length, true); }
      });
    });
    vai(0);
  });
  document.querySelectorAll('.filtro').forEach(f => {
    const fotos = [...f.nextElementSibling.children];
    f.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      f.querySelectorAll('button').forEach(x => x.classList.toggle('ativo', x === b));
      fotos.forEach(a => { a.hidden = b.dataset.filtro !== 'todas' && a.dataset.cat !== b.dataset.filtro; });
    });
  });
})();
