// Menu do celular, carrossel de cargas, filtro da galeria, mapa interativo e formulários que montam WhatsApp ou e-mail.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// carrossel: setas rolam um cartão por vez
document.querySelectorAll('[data-carrossel]').forEach(c => {
  const t = c.querySelector('[data-trilha]');
  const passo = d => { const li = t.querySelector('li'); t.scrollBy({ left: d * (li ? li.getBoundingClientRect().width + 20 : 400), behavior: 'smooth' }); };
  c.querySelector('[data-ant]')?.addEventListener('click', () => passo(-1));
  c.querySelector('[data-prox]')?.addEventListener('click', () => passo(1));
});

// filtro da galeria por tipo de carga
document.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => {
  const tipo = b.dataset.filtro;
  b.parentElement.querySelectorAll('[data-filtro]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  document.querySelectorAll('[data-grade] [data-tipo]').forEach(li => { li.hidden = !!tipo && li.dataset.tipo !== tipo; });
}));

// mapa: mostra o nome do estado e se há coleta
document.querySelectorAll('[data-mapa]').forEach(box => {
  const info = box.querySelector('[data-mapa-info]') || box.closest('section')?.querySelector('[data-mapa-info]');
  const mostra = p => {
    box.querySelectorAll('.uf.ativo').forEach(x => x.classList.remove('ativo'));
    p.classList.add('ativo');
    if (info) info.innerHTML = `<b>${p.dataset.nome}</b>: ${p.classList.contains('col') ? 'coleta e entrega' : 'entrega'}`;
  };
  box.querySelectorAll('.uf').forEach(p => { p.addEventListener('mouseenter', () => mostra(p)); p.addEventListener('click', () => mostra(p)); });
});

// formulários: montam a mensagem e abrem o WhatsApp ou o e-mail
document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const via = e.submitter?.value || 'wa';
  const linhas = [];
  new FormData(f).forEach((v, k) => { if (k !== 'via' && String(v).trim()) linhas.push(`${k}: ${String(v).trim()}`); });
  const texto = `${f.dataset.assunto}\n\n${linhas.join('\n')}`;
  if (via === 'email') location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(texto)}`;
  else window.open(`https://wa.me/${f.dataset.wa}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
}));
