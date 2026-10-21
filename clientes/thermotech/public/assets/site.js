// Menu do celular, troca da curva de cada tratamento, filtro e ampliação das fotos, e formulário que monta o e-mail de orçamento.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// curvas: cada botão acende a curva e o texto do tratamento
document.querySelectorAll('[data-curvas]').forEach(box => {
  const bts = [...box.querySelectorAll('[data-alvo]')];
  bts.forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.alvo;
    bts.forEach(o => o.setAttribute('aria-selected', String(o === b)));
    box.querySelectorAll('[data-curva]').forEach(g => g.classList.toggle('on', g.dataset.curva === id));
    box.querySelectorAll('[data-info]').forEach(p => { p.hidden = p.dataset.info !== id; });
  }));
});

// galeria
const chips = [...document.querySelectorAll('.chip[data-grupo]')];
chips.forEach(c => c.addEventListener('click', () => {
  chips.forEach(o => o.setAttribute('aria-pressed', String(o === c)));
  document.querySelectorAll('.galeria li').forEach(li => { li.hidden = c.dataset.grupo !== 'todas' && li.dataset.g !== c.dataset.grupo; });
}));
const caixa = document.querySelector('.caixa');
if (caixa) {
  const img = caixa.querySelector('img');
  let lista = [], k = 0;
  const mostra = n => { k = (n + lista.length) % lista.length; img.src = lista[k].href; img.alt = lista[k].querySelector('img').alt; };
  const fecha = () => { caixa.hidden = true; document.body.style.overflow = ''; };
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-caixa]'); if (!a) return;
    e.preventDefault();
    lista = [...document.querySelectorAll('.galeria li:not([hidden]) [data-caixa]')];
    mostra(lista.indexOf(a)); caixa.hidden = false; document.body.style.overflow = 'hidden'; caixa.querySelector('.cx-fechar').focus();
  });
  caixa.querySelector('.cx-fechar').onclick = fecha;
  caixa.querySelector('.cx-ant').onclick = () => mostra(k - 1);
  caixa.querySelector('.cx-prox').onclick = () => mostra(k + 1);
  caixa.addEventListener('click', e => { if (e.target === caixa) fecha(); });
  document.addEventListener('keydown', e => { if (caixa.hidden) return; if (e.key === 'Escape') fecha(); if (e.key === 'ArrowLeft') mostra(k - 1); if (e.key === 'ArrowRight') mostra(k + 1); });
}

// orçamento: abre o e-mail com os campos preenchidos
document.querySelector('form[data-email]')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, linhas = [];
  for (const el of f.elements) if (el.name && el.value.trim()) linhas.push(`${el.name}: ${el.value.trim()}`);
  location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
});
