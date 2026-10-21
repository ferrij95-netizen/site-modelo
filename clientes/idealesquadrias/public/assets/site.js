// Menu do celular, altura do topo, fotos da abertura, filtro e ampliação das fotos e formulário de orçamento (WhatsApp ou e-mail).
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });
addEventListener('scroll', () => document.body.classList.toggle('rolou', scrollY > 40), { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// produto vindo do link "Orçar" (?servico=...)
const sel = document.querySelector('[data-servico]'), pedido = new URLSearchParams(location.search).get('servico');
if (sel && pedido) sel.value = [...sel.options].some(o => o.value === pedido) ? pedido : '';

const form = document.querySelector('form.form');
const texto = () => [...new FormData(form)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`).join('\n');
form?.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(form.dataset.assunto)}&body=${encodeURIComponent(texto())}`;
});
form?.querySelector('[data-envia-wa]')?.addEventListener('click', () => {
  if (!form.reportValidity()) return;
  window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent('Olá! Pedido de orçamento pelo site:\n' + texto())}`, '_blank', 'noopener');
});

// fotos da abertura (versão A) trocando sozinhas
const slider = document.querySelector('[data-slider]');
if (slider) {
  const slides = [...slider.querySelectorAll('.slide')], pontos = [...slider.querySelectorAll('.slider-pontos button')];
  let i = 0, timer;
  const vai = n => { slides[i].classList.remove('ativo'); pontos[i].removeAttribute('aria-current'); i = (n + slides.length) % slides.length; slides[i].classList.add('ativo'); pontos[i].setAttribute('aria-current', 'true'); };
  const roda = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 5500); };
  pontos.forEach((p, n) => p.addEventListener('click', () => { vai(n); roda(); }));
  roda();
}

// filtro de trabalhos
document.querySelectorAll('.filtros button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filtros button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  document.querySelectorAll('[data-galeria] figure').forEach(f => { f.hidden = !!b.dataset.filtro && f.dataset.cat !== b.dataset.filtro; });
}));

// foto ampliada
const lb = document.querySelector('dialog.lb');
if (lb) {
  const lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption');
  let lista = [], atual = 0;
  const mostra = n => { atual = (n + lista.length) % lista.length; const a = lista[atual]; const im = a.querySelector('img'); lbImg.src = a.href; lbImg.alt = im?.alt || ''; lbCap.textContent = im?.alt || ''; };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-lb]'); if (!a) return;
    e.preventDefault();
    lista = [...document.querySelectorAll('a[data-lb]')].filter(x => !x.closest('[hidden]'));
    mostra(lista.indexOf(a)); lb.showModal();
  });
  lb.querySelector('.lb-fecha').addEventListener('click', () => lb.close());
  lb.querySelector('.lb-ant').addEventListener('click', () => mostra(atual - 1));
  lb.querySelector('.lb-prox').addEventListener('click', () => mostra(atual + 1));
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') mostra(atual - 1); if (e.key === 'ArrowRight') mostra(atual + 1); });
}
