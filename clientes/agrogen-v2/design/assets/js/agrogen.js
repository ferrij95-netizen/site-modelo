// Menu do celular
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
// Item do menu ativo (subpáginas acendem o item pai)
const grupos = { granjas: 'estrutura', incubatorios: 'estrutura', fabricas: 'estrutura', 'bem-estar': 'pilares', sanidade: 'pilares', pessoas: 'pilares', ambiental: 'pilares' };
const page = document.body.dataset.page;
const ativo = document.querySelector(`.nav [data-g="${grupos[page] || page}"]`);
if (ativo) { ativo.classList.add('on'); ativo.setAttribute('aria-current', 'page'); }
// Borda do cabeçalho ao rolar
const header = document.querySelector('.site-header');
const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
// Alto contraste (o site atual oferece; guardamos a escolha)
const hc = document.querySelector('.contrast-toggle');
const setHc = on => { document.body.classList.toggle('hc', on); if (hc) hc.setAttribute('aria-pressed', String(on)); };
if (document.documentElement.classList.contains('hc-pre')) setHc(true);
if (hc) hc.addEventListener('click', () => {
  const on = !document.body.classList.contains('hc'); setHc(on);
  try { localStorage.setItem('hc', on ? '1' : '0'); } catch (e) {}
});
// Entrada suave dos blocos
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
} else els.forEach(el => el.classList.add('in'));
