// Menu do celular e submenu de produtos.
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
}
document.querySelectorAll('.sub-btn').forEach(b => b.addEventListener('click', () => {
  const li = b.closest('.tem-sub');
  b.setAttribute('aria-expanded', li.classList.toggle('aberto'));
}));

// Fotos ampliadas.
const lb = document.querySelector('.lightbox');
if (lb && lb.showModal) {
  const im = lb.querySelector('img');
  document.querySelectorAll('.gal-item').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    im.src = a.getAttribute('href');
    im.alt = a.querySelector('img').alt;
    lb.showModal();
  }));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lb-fechar')) lb.close(); });
}

// Vídeos: a capa vira o player do YouTube só quando a pessoa clica.
document.querySelectorAll('.video').forEach(v => v.addEventListener('click', () => {
  const f = document.createElement('iframe');
  f.src = `https://www.youtube-nocookie.com/embed/${v.dataset.id}?autoplay=1&rel=0`;
  f.allow = 'autoplay; encrypted-media; picture-in-picture';
  f.allowFullscreen = true;
  f.title = v.getAttribute('aria-label');
  v.replaceChildren(f);
}, { once: true }));

// Representantes por estado.
const filtro = document.querySelector('.uf-filtro');
if (filtro) {
  const itens = [...document.querySelectorAll('.reps > li')];
  const mostra = uf => {
    itens.forEach(li => { li.hidden = !!uf && li.dataset.uf !== uf; });
    filtro.querySelectorAll('button').forEach(b => b.classList.toggle('ativo', b.dataset.uf === uf));
  };
  filtro.addEventListener('click', e => { const b = e.target.closest('button'); if (b) mostra(b.dataset.uf); });
  const uf = location.hash.slice(1);
  if (itens.some(li => li.dataset.uf === uf)) mostra(uf);
}

// Formulários sem servidor: abrem o e-mail já preenchido para o laticínio.
document.querySelectorAll('form.form').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  const corpo = [...new FormData(form)].map(([k, v]) => `${k}: ${v || '-'}`).join('\n');
  location.href = `mailto:contato@queijosmillano.com.br?subject=${encodeURIComponent(form.dataset.assunto)}&body=${encodeURIComponent(corpo)}`;
}));
