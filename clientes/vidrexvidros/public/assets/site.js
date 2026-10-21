// Vidrex Vidros: menu do celular, slider (A), abas do vidro, filtro do portfólio, lightbox, antes e depois, formulário → WhatsApp.
document.documentElement.classList.add('js');
const WA = '5565984069096';

// menu
const bt = document.querySelector('.menu-bt'), menu = document.getElementById('menu');
if (bt && menu) bt.addEventListener('click', () => { const a = menu.classList.toggle('aberto'); bt.setAttribute('aria-expanded', a); });

// slider da versão A
document.querySelectorAll('[data-slider]').forEach(s => {
  const sl = [...s.querySelectorAll('.a-slide')], pt = [...s.querySelectorAll('.a-pontos button')];
  let i = 0, t;
  const ir = n => {
    sl[i].classList.remove('on'); sl[i].setAttribute('aria-hidden', 'true'); pt[i].removeAttribute('aria-current');
    i = (n + sl.length) % sl.length;
    sl[i].classList.add('on'); sl[i].setAttribute('aria-hidden', 'false'); pt[i].setAttribute('aria-current', 'true');
    const im = sl[i].querySelector('img'); if (im) im.loading = 'eager';
  };
  const auto = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => ir(i + 1), 5500); };
  pt.forEach((b, n) => b.addEventListener('click', () => { ir(n); auto(); }));
  s.addEventListener('mouseenter', () => clearInterval(t)); s.addEventListener('mouseleave', auto);
  auto();
});

// abas (qual vidro)
document.querySelectorAll('[data-abas]').forEach(w => {
  const tabs = [...w.querySelectorAll('[role=tab]')];
  tabs.forEach(tb => tb.addEventListener('click', () => {
    tabs.forEach(o => { o.setAttribute('aria-selected', o === tb); document.getElementById(o.getAttribute('aria-controls')).hidden = o !== tb; });
  }));
});

// filtro do portfólio (B)
document.querySelectorAll('[data-filtro]').forEach(w => {
  const bts = [...w.querySelectorAll('[data-f]')], figs = [...w.querySelectorAll('[data-tipo]')];
  bts.forEach(b => b.addEventListener('click', () => {
    bts.forEach(o => o.setAttribute('aria-pressed', o === b));
    figs.forEach(f => { f.hidden = b.dataset.f !== '*' && f.dataset.tipo !== b.dataset.f; });
  }));
});

// lightbox
const lb = document.querySelector('.lb');
if (lb) {
  const im = lb.querySelector('img'), cap = lb.querySelector('figcaption');
  let grupo = [], k = 0;
  const mostra = n => { k = (n + grupo.length) % grupo.length; const a = grupo[k]; im.src = a.href; im.alt = a.querySelector('img')?.alt || ''; cap.textContent = a.dataset.legenda || ''; };
  const fecha = () => { lb.hidden = true; document.body.style.overflow = ''; };
  document.addEventListener('click', e => {
    const a = e.target.closest('.lb-a'); if (!a) return;
    e.preventDefault();
    grupo = [...document.querySelectorAll(`.lb-a[data-grupo="${a.dataset.grupo}"]`)].filter(x => !x.closest('[hidden]'));
    mostra(grupo.indexOf(a)); lb.hidden = false; document.body.style.overflow = 'hidden'; lb.querySelector('.lb-x').focus();
  });
  lb.querySelector('.lb-x').onclick = fecha;
  lb.querySelector('.lb-ant').onclick = () => mostra(k - 1);
  lb.querySelector('.lb-prox').onclick = () => mostra(k + 1);
  lb.addEventListener('click', e => { if (e.target === lb) fecha(); });
  document.addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') fecha(); if (e.key === 'ArrowLeft') mostra(k - 1); if (e.key === 'ArrowRight') mostra(k + 1); });
}

// antes e depois
document.querySelectorAll('[data-ad]').forEach(w => {
  const r = w.querySelector('input');
  r.addEventListener('input', () => w.style.setProperty('--p', r.value + '%'));
});

// linha de temperatura entra quando aparece
const cfs = document.querySelectorAll('.cf');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { threshold: .25 });
  cfs.forEach(c => io.observe(c));
} else cfs.forEach(c => c.classList.add('vis'));

// categoria ativa no menu lateral de produtos (B)
const nav = document.querySelector('.b-prod-nav');
if (nav && 'IntersectionObserver' in window) {
  const links = [...nav.querySelectorAll('a')];
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.hash === '#' + e.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('.b-prod').forEach(p => io.observe(p));
}

// formulário: produto vindo do link "Pedir orçamento de ..."
const qp = new URLSearchParams(location.search).get('produto');
document.querySelectorAll('select[name=produto]').forEach(s => { if (qp) [...s.options].forEach(o => { if (o.text === qp) s.value = o.value; }); });

// formulário → WhatsApp
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f)), err = f.querySelector('.form-erro');
  let ok = true;
  ['nome', 'telefone'].forEach(n => { const el = f.elements[n]; const v = (el.value || '').trim(); el.setAttribute('aria-invalid', !v); if (!v) ok = false; });
  err.hidden = ok; if (!ok) return;
  const orc = f.dataset.form === 'orcamento';
  const linhas = [orc ? 'Olá! Gostaria de um orçamento (pelo site da Vidrex).' : 'Olá! Vim pelo site da Vidrex.', '', `Nome: ${d.nome}`, `Telefone: ${d.telefone}`];
  if (orc) { linhas.push(`Produto: ${d.produto}`); if (d.medidas) linhas.push(`Medidas: ${d.medidas}`); if (d.local) linhas.push(`Local da obra: ${d.local}`); linhas.push(`Entrega: ${d.entrega}`); }
  else if (d.email) linhas.push(`E-mail: ${d.email}`);
  if (d.mensagem) linhas.push('', d.mensagem);
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
}));
