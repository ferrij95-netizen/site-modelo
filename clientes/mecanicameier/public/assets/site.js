// Menu do celular, fotos passando (versão A), abas de especialidade (versão B), galeria com filtro e ampliação, formulário que monta a mensagem do WhatsApp.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// fotos passando
const slides = document.querySelector('[data-slides]');
if (slides) {
  const figs = [...slides.children], pontos = document.querySelector('[data-slides-pontos]');
  let i = 0, timer;
  const vai = n => { figs[i].classList.remove('on'); pontos.children[i].removeAttribute('aria-current'); i = (n + figs.length) % figs.length; figs[i].classList.add('on'); pontos.children[i].setAttribute('aria-current', 'true'); };
  figs.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = n + 1; b.setAttribute('aria-label', `Foto ${n + 1}`); b.onclick = () => { vai(n); clearInterval(timer); }; pontos.append(b); });
  pontos.children[0].setAttribute('aria-current', 'true');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 5600);
}

// abas
document.querySelectorAll('[role=tablist]').forEach(lista => {
  const tabs = [...lista.querySelectorAll('[role=tab]')];
  tabs.forEach(t => t.addEventListener('click', () => tabs.forEach(o => {
    const on = o === t; o.setAttribute('aria-selected', String(on)); document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
  })));
});

// galeria
const gal = document.querySelector('[data-galeria]');
if (gal) {
  const itens = [...gal.children];
  document.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('[data-filtro]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
    itens.forEach(li => { li.hidden = !!b.dataset.filtro && li.dataset.grupo !== b.dataset.filtro; });
  }));
  const luz = document.querySelector('.luz'), fimg = luz.querySelector('img'), fcap = luz.querySelector('figcaption');
  let atual = 0;
  const visiveis = () => itens.filter(li => !li.hidden).map(li => li.querySelector('a'));
  const mostra = k => { const v = visiveis(); atual = (k + v.length) % v.length; fimg.src = v[atual].href; fimg.alt = v[atual].dataset.legenda; fcap.textContent = v[atual].dataset.legenda; };
  gal.addEventListener('click', e => { const a = e.target.closest('a'); if (!a || !luz.showModal) return; e.preventDefault(); mostra(visiveis().indexOf(a)); luz.showModal(); });
  luz.querySelector('.luz-x').onclick = () => luz.close();
  luz.querySelector('.luz-ant').onclick = () => mostra(atual - 1);
  luz.querySelector('.luz-prox').onclick = () => mostra(atual + 1);
  luz.addEventListener('click', e => { if (e.target === luz || e.target.tagName === 'FIGURE') luz.close(); });
  luz.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') mostra(atual - 1); if (e.key === 'ArrowRight') mostra(atual + 1); });
}

// formulário: monta a mensagem e abre o WhatsApp
document.querySelectorAll('form[data-wa]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
  open(`https://wa.me/${f.dataset.wa}?text=${encodeURIComponent(`${f.dataset.assunto}\n${linhas.join('\n')}`)}`, '_blank');
}));
