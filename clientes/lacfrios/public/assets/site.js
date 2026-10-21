// Menu do celular, busca do catálogo (B) e formulários de cadastro e contato (na prévia não enviam).
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// busca: esconde as linhas da tabela que não batem e as categorias que ficaram vazias
const busca = document.querySelector('[data-busca-input]');
if (busca) {
  const normal = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const filtrar = () => {
    const q = normal(busca.value.trim());
    let algum = false;
    document.querySelectorAll('[data-cat]').forEach(sec => {
      let n = 0;
      sec.querySelectorAll('[data-busca]').forEach(tr => { const ok = !q || normal(tr.dataset.busca).includes(q); tr.hidden = !ok; if (ok) n++; });
      sec.hidden = n === 0; if (n) algum = true;
    });
    document.querySelector('[data-busca-vazio]').hidden = algum;
  };
  busca.addEventListener('input', filtrar);
  const q = new URLSearchParams(location.search).get('q');
  if (q) { busca.value = q; filtrar(); }
}

document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
