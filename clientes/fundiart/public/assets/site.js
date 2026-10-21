// Menu do celular, obras passando no topo (versão A), filtro da galeria, foto ampliada e formulário que monta o e-mail.
const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];

// menu
const btn = $('.menu-btn'), menu = $('#menu');
btn?.addEventListener('click', () => {
  const aberto = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!aberto));
  document.body.classList.toggle('menu-aberto', !aberto);
});

// obras passando (pausa ao passar o mouse; para quem pede menos movimento, só troca pelos pontos)
$$('[data-slides]').forEach(box => {
  const figs = $$('figure', box), pts = $$('.v-pontos button', box);
  let i = 0, t;
  const vai = n => {
    figs[i].classList.remove('on'); pts[i]?.removeAttribute('aria-current');
    i = (n + figs.length) % figs.length;
    figs[i].classList.add('on'); pts[i]?.setAttribute('aria-current', 'true');
  };
  pts.forEach((p, n) => p.addEventListener('click', () => { vai(n); reinicia(); }));
  const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reinicia = () => { clearInterval(t); if (!parado) t = setInterval(() => vai(i + 1), 5000); };
  box.addEventListener('mouseenter', () => clearInterval(t));
  box.addEventListener('mouseleave', reinicia);
  reinicia();
});

// filtro da galeria (#esculturas, #monumentos... no endereço já abre filtrado)
const abas = $$('[data-filtro]');
const filtra = cat => {
  if (!abas.some(a => a.dataset.filtro === cat)) cat = 'todas';
  abas.forEach(a => a.setAttribute('aria-selected', String(a.dataset.filtro === cat)));
  $$('[data-galeria] li[data-cat]').forEach(li => { li.hidden = cat !== 'todas' && li.dataset.cat !== cat; });
};
if (abas.length) {
  abas.forEach(a => a.addEventListener('click', () => { filtra(a.dataset.filtro); history.replaceState(null, '', a.dataset.filtro === 'todas' ? location.pathname : '#' + a.dataset.filtro); }));
  filtra(location.hash.slice(1));
  addEventListener('hashchange', () => filtra(location.hash.slice(1)));
}

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
    const grupo = a.closest('[data-galeria], .artistas, .artistas-b-l, .foco, .foco-b, .passos-b') || document;
    lista = $$('[data-amplia]', grupo).filter(x => !x.closest('li[hidden]'));
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

// formulário: abre o e-mail já preenchido
$$('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
  location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
}));
