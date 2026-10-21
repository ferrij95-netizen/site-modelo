// HaramaQ: menu, carrossel, abas, vídeos leves do YouTube, formulários que abrem o WhatsApp e aparecer ao rolar.
document.documentElement.classList.add('js');

// menu do celular e submenu de produtos
const menu = document.getElementById('menu');
document.querySelectorAll('.menu-btn').forEach(b => b.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  b.setAttribute('aria-expanded', aberto);
}));
document.addEventListener('click', e => {
  if (menu?.classList.contains('aberto') && !menu.contains(e.target) && !e.target.closest('.menu-btn')) menu.classList.remove('aberto');
});
document.querySelectorAll('.sub > button').forEach(b => b.addEventListener('click', () => {
  const s = b.parentElement; const aberto = s.classList.toggle('aberto');
  b.setAttribute('aria-expanded', aberto);
}));

// carrossel da versão A
document.querySelectorAll('[data-slider]').forEach(h => {
  const slides = [...h.querySelectorAll('.slide')]; const pontos = [...h.querySelectorAll('.pontos button')];
  let i = 0; let timer;
  const vai = n => {
    slides[i].classList.remove('ativo'); pontos[i]?.removeAttribute('aria-current');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('ativo'); pontos[i]?.setAttribute('aria-current', 'true');
  };
  const roda = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 6500); };
  pontos.forEach((p, n) => p.addEventListener('click', () => { vai(n); roda(); }));
  roda();
});

// abas da linha (versão B)
document.querySelectorAll('.abas').forEach(lista => {
  const botoes = [...lista.querySelectorAll('[role=tab]')];
  botoes.forEach(b => b.addEventListener('click', () => {
    botoes.forEach(x => { x.setAttribute('aria-selected', x === b); document.getElementById(x.getAttribute('aria-controls')).hidden = x !== b; });
  }));
});

// vídeo do YouTube só ao clicar
document.querySelectorAll('[data-yt]').forEach(b => b.addEventListener('click', () => {
  const f = document.createElement('iframe');
  f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0`;
  f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true; f.title = b.getAttribute('aria-label') || 'YouTube';
  b.replaceChildren(f); b.style.cursor = 'default';
}, { once: true }));

// formulários: montam a mensagem e abrem o WhatsApp
const enviaWhats = form => {
  const linhas = [`*${form.dataset.titulo}*`];
  new FormData(form).forEach((v, k) => { if (String(v).trim()) linhas.push(`${k}: ${v}`); });
  window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
};
document.querySelectorAll('.form-contato').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); enviaWhats(f); }));

// pós-venda em 4 etapas
document.querySelectorAll('.etapas-form').forEach(f => {
  const etapas = [...f.querySelectorAll('.etapa')]; const nav = [...f.querySelectorAll('.etapas-nav li')];
  const voltar = f.querySelector('[data-voltar]'); const prox = f.querySelector('[data-proximo]'); const enviar = f.querySelector('[type=submit]');
  let i = 0;
  const mostra = () => {
    etapas.forEach((e, n) => e.classList.toggle('ativa', n === i));
    nav.forEach((e, n) => { e.classList.toggle('ativa', n === i); e.classList.toggle('feita', n < i); });
    voltar.hidden = i === 0; prox.hidden = i === etapas.length - 1; enviar.hidden = i !== etapas.length - 1;
  };
  const valida = () => [...etapas[i].querySelectorAll('input,select,textarea')].every(c => c.reportValidity());
  prox.addEventListener('click', () => { if (valida()) { i++; mostra(); } });
  voltar.addEventListener('click', () => { i--; mostra(); });
  f.addEventListener('submit', e => { e.preventDefault(); if (valida()) enviaWhats(f); });
});

// aparecer ao rolar
const alvos = document.querySelectorAll('.secao .cab, .circulo, .maq, .item, .passos li, .post, .mvv-item, .depo, .aval, .numeros-linha > div');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  alvos.forEach((a, n) => { a.setAttribute('data-rev', ''); a.style.transitionDelay = `${(n % 5) * 70}ms`; io.observe(a); });
}
