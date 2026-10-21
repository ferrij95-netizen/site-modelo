// Menu, abas de negócios (B), índice de produtos com foto (B), galeria e zoom de produto, barras de capacidade
// e torres animadas ao entrar na tela, e o formulário de cotação que monta WhatsApp ou e-mail.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', Math.max(0, topo.getBoundingClientRect().bottom) + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// abas
document.querySelectorAll('[data-abas]').forEach(box => {
  const abas = [...box.querySelectorAll('[role=tab]')];
  const vai = a => abas.forEach(o => { const on = o === a; o.setAttribute('aria-selected', String(on)); document.getElementById(o.getAttribute('aria-controls')).hidden = !on; });
  abas.forEach((a, i) => {
    a.addEventListener('click', () => vai(a));
    a.addEventListener('keydown', e => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { const n = abas[(i + d + abas.length) % abas.length]; n.focus(); vai(n); } });
  });
});

// índice de produtos: passar o mouse troca a foto
const fotoIndice = document.querySelector('[data-indice-foto] img');
document.querySelectorAll('.prod-lista a[data-foto]').forEach(a => {
  const troca = () => { document.querySelectorAll('.prod-lista a.on').forEach(o => o.classList.remove('on')); a.classList.add('on'); if (fotoIndice) { fotoIndice.src = a.dataset.foto; fotoIndice.alt = a.querySelector('b').textContent; } };
  a.addEventListener('mouseenter', troca); a.addEventListener('focus', troca);
});

// galeria do produto
const principal = document.querySelector('.gal-principal');
document.querySelectorAll('.gal-miniaturas button').forEach(b => b.addEventListener('click', () => {
  principal.querySelector('img').src = b.dataset.foto; principal.dataset.zoom = b.dataset.foto;
  document.querySelectorAll('.gal-miniaturas button').forEach(o => o.toggleAttribute('aria-current', o === b));
}));
const dlg = document.querySelector('[data-zoom-dlg]');
document.addEventListener('click', e => {
  const z = e.target.closest('[data-zoom]'); if (!z || !dlg) return;
  const im = dlg.querySelector('img'); im.src = z.dataset.zoom; im.alt = z.querySelector('img')?.alt || '';
  dlg.showModal();
});
dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

// animações ao entrar na tela (barras e torres)
const anim = [...document.querySelectorAll('[data-capac], .torre-sec')];
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  anim.forEach(el => el.classList.add('anima'));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove('anima'); io.unobserve(e.target); } }), { threshold: .3 });
  anim.forEach(el => io.observe(el));
}

// formulário de cotação
const form = document.querySelector('[data-form]');
let via = 'wa';
form?.querySelectorAll('[data-via]').forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
form?.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const txt = [`Pedido de cotação pelo site: ${d.assunto}`, `Nome: ${d.nome}`, d.empresa && `Empresa: ${d.empresa}`, `Telefone: ${d.telefone}`, d.cidade && `Cidade: ${d.cidade}`, d.mensagem && `Mensagem: ${d.mensagem}`].filter(Boolean).join('\n');
  if (via === 'email') location.href = `mailto:vendas@jchiquitto.com.br?subject=${encodeURIComponent(`Cotação: ${d.assunto}`)}&body=${encodeURIComponent(txt)}`;
  else window.open(`https://wa.me/551934173450?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
});
