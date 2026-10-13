// Pato Indústria: menu, topo ao rolar, slider da home A, galeria de produto, formulário pelo WhatsApp e animações.
document.documentElement.classList.add('js');

const topo = document.querySelector('[data-topo]');
const rolar = () => topo && topo.classList.toggle('rolou', scrollY > 40);
addEventListener('scroll', rolar, { passive: true });
rolar();

const btn = document.querySelector('[data-menu]');
const nav = document.getElementById('nav');
if (btn && nav) btn.addEventListener('click', () => {
  const aberto = nav.classList.toggle('aberto');
  btn.setAttribute('aria-expanded', aberto);
  topo.classList.toggle('rolou', aberto || scrollY > 40);
  document.body.style.overflow = aberto ? 'hidden' : '';
});

// Slider: troca a foto a cada 6 s; os tracinhos escolhem a foto.
const slider = document.querySelector('[data-slider]');
if (slider) {
  const fotos = [...slider.querySelectorAll('.slide')];
  const pontos = [...slider.querySelectorAll('[data-ir]')];
  let atual = 0, timer;
  const ir = i => {
    fotos[atual].classList.remove('on'); pontos[atual].removeAttribute('aria-current');
    atual = (i + fotos.length) % fotos.length;
    fotos[atual].classList.add('on'); pontos[atual].setAttribute('aria-current', 'true');
  };
  const iniciar = () => { clearInterval(timer); timer = setInterval(() => ir(atual + 1), 6000); };
  pontos.forEach(p => p.addEventListener('click', () => { ir(+p.dataset.ir); iniciar(); }));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) iniciar();
}

// Galeria do produto: miniatura vira foto principal.
document.querySelectorAll('[data-galeria]').forEach(g => {
  const principal = g.querySelector('.g-principal img');
  g.querySelectorAll('[data-foto]').forEach(b => b.addEventListener('click', () => {
    principal.src = b.dataset.foto;
    g.querySelectorAll('[data-foto]').forEach(x => x.removeAttribute('aria-current'));
    b.setAttribute('aria-current', 'true');
  }));
});

// Formulário: monta a mensagem e abre o WhatsApp da Pato Indústria.
document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  const linhas = ['Olá! Pedido de orçamento pelo site da Pato Indústria.', `Nome: ${d.nome}`, d.empresa && `Fazenda/empresa: ${d.empresa}`, `Telefone: ${d.fone}`, d.cidade && `Cidade: ${d.cidade}`, `Interesse: ${d.produto || 'Unidade completa / vários equipamentos'}`, d.msg && `Mensagem: ${d.msg}`].filter(Boolean);
  window.open('https://wa.me/5546991112337?text=' + encodeURIComponent(linhas.join('\n')), '_blank', 'noopener');
}));

// Blocos aparecem ao rolar.
const alvos = document.querySelectorAll('.sec-cab, .c-prod, .c-obra, .b-item, .o-card, .ot-lista li, .ot-grade article, .est-grade article, .fluxo-linha > li, .linha-tempo li, .mvv .in > div');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  alvos.forEach((el, i) => { el.setAttribute('data-rev', ''); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
}
