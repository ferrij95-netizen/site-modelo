// Menu do celular, foto ampliada, formulário que monta o e-mail (já preenchido pelo ?segmento=&marca= do link).
const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];

// menu
const btn = $('.menu-btn');
btn?.addEventListener('click', () => {
  const aberto = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!aberto));
  btn.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
  document.body.classList.toggle('menu-aberto', !aberto);
});

// foto ampliada
const lb = $('#lb');
if (lb) {
  let lista = [], k = 0, origem;
  const lbImg = $('img', lb), lbLeg = $('figcaption', lb);
  const mostra = n => {
    k = (n + lista.length) % lista.length;
    const a = lista[k];
    lbImg.src = a.getAttribute('href'); lbImg.alt = $('img', a)?.alt || '';
    lbLeg.textContent = a.dataset.legenda || '';
  };
  const fecha = () => { lb.hidden = true; document.body.classList.remove('lb-aberto'); origem?.focus(); };
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-amplia]');
    if (!a) return;
    e.preventDefault(); origem = a;
    lista = $$('[data-amplia]');
    mostra(lista.indexOf(a)); lb.hidden = false; document.body.classList.add('lb-aberto'); $('.lb-x', lb).focus();
  });
  $('.lb-x', lb).addEventListener('click', fecha);
  $('.lb-ant', lb).addEventListener('click', () => mostra(k - 1));
  $('.lb-prox', lb).addEventListener('click', () => mostra(k + 1));
  lb.addEventListener('click', e => { if (e.target === lb) fecha(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') fecha();
    if (e.key === 'ArrowLeft') mostra(k - 1);
    if (e.key === 'ArrowRight') mostra(k + 1);
  });
}

// formulário: preenche segmento e marca vindos do link e abre o e-mail já preenchido
const f = $('form[data-mailto]');
if (f) {
  const q = new URLSearchParams(location.search);
  if (q.get('segmento')) f.elements['Segmento'].value = q.get('segmento');
  if (q.get('marca')) f.elements['Marca'].value = q.get('marca');
  f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
    location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
  });
}
