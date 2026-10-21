// Menu, slides da capa (A), entrada ao rolar, escolha pela vazão e fotos que trocam (B), formulário que monta o e-mail.
document.documentElement.classList.add('js');
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;

// slides da capa (versão A, como o banner do site atual)
const capa = document.querySelector('[data-slides]');
if (capa) {
  const slides = [...capa.querySelectorAll('.capa-slide')], pontos = capa.querySelector('[data-slides-pontos]');
  let i = 0, timer;
  const vai = n => { slides[i].classList.remove('on'); pontos.children[i].removeAttribute('aria-current'); i = (n + slides.length) % slides.length; slides[i].classList.add('on'); pontos.children[i].setAttribute('aria-current', 'true'); };
  slides.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Destaque ${n + 1}`); b.onclick = () => { vai(n); clearInterval(timer); }; pontos.append(b); });
  pontos.children[0].setAttribute('aria-current', 'true');
  if (!parado) timer = setInterval(() => vai(i + 1), 7000);
}

// entrada ao rolar
document.querySelectorAll('[data-rev-filhos]').forEach(p => [...p.children].forEach((c, k) => c.style.setProperty('--k', k)));
const alvos = document.querySelectorAll('[data-rev], [data-rev-filhos], .corte');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  alvos.forEach(a => io.observe(a));
} else alvos.forEach(a => a.classList.add('vis'));

// escolha pela vazão (versão B)
const vz = document.querySelector('[data-vazao]');
if (vz) {
  const range = vz.querySelector('[data-vz-range]'), figs = [...vz.querySelectorAll('.vz-f')], num = vz.querySelector('[data-vz-n]'), lk = vz.querySelector('[data-vz-link]');
  const vazoes = [500, 1000, 2000, 3000, 5000, 10000];
  const muda = () => {
    const k = +range.value, l = vazoes[k].toLocaleString('pt-BR');
    figs.forEach((f, n) => f.classList.toggle('on', n === k));
    num.textContent = l;
    lk.href = lk.href.replace(/\?produto=[^#]*/, `?produto=${encodeURIComponent(`Filtro Central ${l} l/h`)}`);
  };
  range.addEventListener('input', muda);
}

// fotos que trocam enquanto o texto rola (versão B)
const troca = document.querySelector('[data-troca]');
if (troca && 'IntersectionObserver' in window) {
  const passos = [...troca.querySelectorAll('.troca-passo')], figs = [...troca.querySelectorAll('.troca-midia figure')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const k = passos.indexOf(e.target);
    passos.forEach((p, n) => p.classList.toggle('on', n === k));
    figs.forEach((f, n) => f.classList.toggle('on', n === k));
  }), { rootMargin: '-45% 0px -45% 0px' });
  passos.forEach(p => io.observe(p));
}

// produto vindo do botão "Pedir orçamento"
const produto = new URLSearchParams(location.search).get('produto');
const sel = document.querySelector('[data-produto]');
if (produto && sel) {
  const op = [...sel.options].find(o => o.text === produto);
  if (op) sel.value = op.text; else { sel.add(new Option(produto, produto, true, true)); }
}

// formulário: monta o e-mail com os campos preenchidos
document.querySelectorAll('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
  location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
}));
