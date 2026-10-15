// Menu do celular, vitrine da home, busca no catálogo e formulário (abre o WhatsApp com a mensagem).
const btn = document.querySelector('.abre-menu'), nav = document.querySelector('.topo nav');
btn?.addEventListener('click', () => { const a = nav.classList.toggle('aberto'); btn.setAttribute('aria-expanded', a); });

const trilho = document.querySelector('.trilho');
if (trilho) {
  const passo = () => trilho.querySelector('.fam').offsetWidth + 18;
  document.querySelector('.tn-ant').onclick = () => trilho.scrollBy({ left: -passo(), behavior: 'smooth' });
  document.querySelector('.tn-prox').onclick = () => trilho.scrollBy({ left: trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4 ? -trilho.scrollWidth : passo(), behavior: 'smooth' });
}

const busca = document.querySelector('[data-busca]');
if (busca) {
  busca.addEventListener('input', () => {
    const q = busca.value.trim().toLowerCase();
    let total = 0;
    document.querySelectorAll('.familia').forEach(f => {
      let nf = 0;
      f.querySelectorAll('.grupo').forEach(g => {
        let ng = 0;
        g.querySelectorAll('.prod').forEach(p => { const ok = !q || p.dataset.busca.includes(q); p.hidden = !ok; ng += ok; });
        g.hidden = !ng; nf += ng;
      });
      f.hidden = !nf; total += nf;
    });
    document.querySelector('.nada').hidden = total > 0;
  });
  const links = [...document.querySelectorAll('.cat-lado nav a')];
  const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.classList.toggle('ativo', l.hash === '#' + e.target.id)); }), { rootMargin: '-30% 0px -60% 0px' });
  document.querySelectorAll('.familia').forEach(f => obs.observe(f));
}

document.querySelectorAll('.form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const txt = `Olá, Bertolini! Sou ${d.get('nome')} (${d.get('email')}${d.get('telefone') ? ', ' + d.get('telefone') : ''}).\nInteresse: ${d.get('interesse')}\n\n${d.get('mensagem')}`;
  window.open(`https://wa.me/${f.dataset.whats}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  f.querySelector('.aviso').hidden = false;
}));
