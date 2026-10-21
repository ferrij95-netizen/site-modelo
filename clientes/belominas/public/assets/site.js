// Menu do celular, prateleira com setas (A), troca de foto no caminho do leite (B), filtro por linha e formulário de contato.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// prateleira: as setas vermelhas andam um "pedaço" da lista
document.querySelectorAll('[data-prat]').forEach(p => {
  const lista = p.querySelector('.prat-lista');
  p.querySelectorAll('[data-prat-ir]').forEach(b => b.addEventListener('click', () => {
    const passo = Math.max(lista.clientWidth * .8, 200) * Number(b.dataset.pratIr);
    const fim = lista.scrollLeft + passo;
    if (fim > lista.scrollWidth - lista.clientWidth + 4) lista.scrollTo({ left: 0, behavior: 'smooth' });
    else if (fim < -4) lista.scrollTo({ left: lista.scrollWidth, behavior: 'smooth' });
    else lista.scrollBy({ left: passo, behavior: 'smooth' });
  }));
});

// caminho do leite: a foto fixa troca conforme a etapa passa no meio da tela
const cam = document.querySelector('[data-caminho]');
if (cam && 'IntersectionObserver' in window) {
  const figs = [...cam.querySelectorAll('.caminho-fotos figure')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) figs.forEach((f, i) => f.classList.toggle('on', i === Number(e.target.dataset.passo)));
  }), { rootMargin: '-45% 0px -45% 0px' });
  cam.querySelectorAll('[data-passo]').forEach(p => io.observe(p));
}

// filtro por linha de produto
document.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => {
  const f = b.dataset.filtro;
  document.querySelectorAll('[data-filtro]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  document.querySelectorAll('.catalogo [data-linha], .catalogo-b [data-linha]').forEach(el => { el.hidden = !!f && el.dataset.linha !== f; });
}));

// formulário: na prévia não envia, só confirma
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
