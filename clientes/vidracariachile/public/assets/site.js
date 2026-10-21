// Vidraçaria Chile · menu, submenu de produtos, destaques da home A, abas de ambiente, filtro de obras, galeria ampliada e orçamento pelo WhatsApp.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const WA = '554133335477';

// menu do celular
$$('.menu-bt').forEach(b => b.addEventListener('click', () => {
  const m = document.getElementById('menu'); const ab = m.classList.toggle('aberto');
  b.setAttribute('aria-expanded', ab);
}));
// submenu de produtos (no celular abre pelo botão; no computador pelo mouse/foco)
$$('.sub-bt').forEach(b => b.addEventListener('click', () => {
  const ab = b.parentElement.classList.toggle('aberto'); b.setAttribute('aria-expanded', ab);
}));

// destaques da home A
const hero = $('[data-slides]');
if (hero) {
  const sl = $$('.a-slide', hero), pts = $$('.a-hero-pts button', hero);
  let i = 0, t;
  const vai = n => { sl[i].classList.remove('on'); pts[i].removeAttribute('aria-selected'); i = (n + sl.length) % sl.length; sl[i].classList.add('on'); pts[i].setAttribute('aria-selected', 'true'); };
  const roda = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => vai(i + 1), 6000); };
  pts.forEach((p, n) => p.addEventListener('click', () => { vai(n); roda(); }));
  $('.a-ant', hero).addEventListener('click', () => { vai(i - 1); roda(); });
  $('.a-prox', hero).addEventListener('click', () => { vai(i + 1); roda(); });
  hero.addEventListener('mouseenter', () => clearInterval(t)); hero.addEventListener('mouseleave', roda);
  roda();
}

// abas "Qual é o seu projeto?"
$$('[data-abas]').forEach(box => {
  const tabs = $$('[role=tab]', box);
  tabs.forEach(tb => tb.addEventListener('click', () => {
    tabs.forEach(o => { o.setAttribute('aria-selected', o === tb); document.getElementById(o.getAttribute('aria-controls')).hidden = o !== tb; });
  }));
});

// filtro de obras
$$('[data-filtro]').forEach(box => {
  const bts = $$('.filtro button', box), itens = $$('[data-galeria] li', box);
  bts.forEach(b => b.addEventListener('click', () => {
    bts.forEach(o => o.setAttribute('aria-pressed', o === b));
    itens.forEach(li => li.hidden = !!b.dataset.cat && li.dataset.cat !== b.dataset.cat);
  }));
});

// galeria ampliada
const lb = $('dialog.lb');
if (lb) {
  let lista = [], i = 0;
  const mostra = n => {
    i = (n + lista.length) % lista.length; const a = lista[i];
    $('img', lb).src = a.getAttribute('href'); $('img', lb).alt = a.dataset.leg || '';
    $('figcaption', lb).textContent = `${a.dataset.leg || ''} · ${i + 1} de ${lista.length}`;
  };
  $$('[data-galeria] a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    lista = $$('a', a.closest('[data-galeria]')).filter(x => !x.closest('li').hidden);
    mostra(lista.indexOf(a)); lb.showModal();
  }));
  $('.lb-x', lb).addEventListener('click', () => lb.close());
  $('.lb-ant', lb).addEventListener('click', () => mostra(i - 1));
  $('.lb-prox', lb).addEventListener('click', () => mostra(i + 1));
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') mostra(i - 1); if (e.key === 'ArrowRight') mostra(i + 1); });
}

// orçamento: abre a mensagem pronta no WhatsApp da loja
$$('[data-orc]').forEach(f => {
  const prod = new URLSearchParams(location.search).get('produto');
  if (prod) { const o = [...f.produto.options].find(o => o.text === prod); if (o) o.selected = true; }
  f.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    const txt = [`Olá! Vim pelo site da Vidraçaria Chile e gostaria de um orçamento.`, `Nome: ${d.nome}`, d.fone && `Telefone: ${d.fone}`, `Produto: ${d.produto}`, d.medidas && `Medidas: ${d.medidas}`, d.msg && `Mensagem: ${d.msg}`].filter(Boolean).join('\n');
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  });
});
