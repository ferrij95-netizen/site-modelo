// Menu do celular, submenus, carrossel de obras (A), galeria das obras, filtro de obras e formulário por e-mail.
(() => {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  menuBtn?.addEventListener('click', () => {
    const aberto = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!aberto));
    menu.classList.toggle('aberto', !aberto);
    document.body.classList.toggle('menu-aberto', !aberto);
  });
  document.querySelectorAll('.m-abre, .colab-btn').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const pai = b.parentElement, aberto = b.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.sub-aberto').forEach(x => { if (x !== pai) { x.classList.remove('sub-aberto'); x.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false'); } });
    b.setAttribute('aria-expanded', String(!aberto));
    pai.classList.toggle('sub-aberto', !aberto);
  }));
  document.addEventListener('click', () => document.querySelectorAll('.sub-aberto').forEach(x => { x.classList.remove('sub-aberto'); x.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false'); }));

  // Carrossel: trilho com rolagem e encaixe no centro; as obras vizinhas aparecem nas laterais, como no site atual.
  document.querySelectorAll('[data-carrossel]').forEach(c => {
    const t = c.querySelector('.car-trilho'), slides = [...t.children];
    let i = 0, timer;
    const vai = n => { i = (n + slides.length) % slides.length; const s = slides[i]; t.scrollTo({ left: s.offsetLeft - (t.clientWidth - s.clientWidth) / 2, behavior: 'smooth' }); };
    const marca = () => { const meio = t.scrollLeft + t.clientWidth / 2; let melhor = 0, d = Infinity; slides.forEach((s, k) => { const dd = Math.abs(s.offsetLeft + s.clientWidth / 2 - meio); if (dd < d) { d = dd; melhor = k; } }); i = melhor; slides.forEach((s, k) => s.classList.toggle('atual', k === i)); };
    t.addEventListener('scroll', () => { clearTimeout(t._f); t._f = setTimeout(marca, 80); }, { passive: true });
    c.querySelector('.car-ant').addEventListener('click', () => { vai(i - 1); para(); });
    c.querySelector('.car-prox').addEventListener('click', () => { vai(i + 1); para(); });
    const roda = () => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 6000); };
    const para = () => clearInterval(timer);
    c.addEventListener('pointerenter', para); c.addEventListener('pointerleave', () => { para(); roda(); });
    const ini = slides.length > 2 ? 1 : 0;
    requestAnimationFrame(() => { t.scrollLeft = slides[ini].offsetLeft - (t.clientWidth - slides[ini].clientWidth) / 2; marca(); });
    roda();
  });

  // Galeria da obra: miniaturas trocam a foto grande.
  document.querySelectorAll('[data-gal]').forEach(g => {
    const grande = g.querySelector('.gal-grande img'), n = g.querySelector('[data-gal-n]');
    g.querySelectorAll('[data-gal-i]').forEach(b => b.addEventListener('click', () => {
      grande.src = b.dataset.src;
      const im = b.querySelector('img'); grande.width = im.width; grande.height = im.height;
      grande.setAttribute('width', im.getAttribute('width')); grande.setAttribute('height', im.getAttribute('height'));
      n.textContent = +b.dataset.galI + 1;
      g.querySelectorAll('[data-gal-i]').forEach(x => x.removeAttribute('aria-current'));
      b.setAttribute('aria-current', 'true');
    }));
  });

  // Filtro da página Obras sem recarregar (os links continuam levando à página do segmento sem JavaScript).
  const lista = document.querySelector('[data-lista]');
  document.querySelectorAll('[data-filtro]').forEach(a => a.addEventListener('click', e => {
    if (!lista) return;
    e.preventDefault();
    const f = a.dataset.filtro;
    document.querySelectorAll('[data-filtro]').forEach(x => x.classList.toggle('on', x === a));
    lista.querySelectorAll('[data-seg]').forEach(o => { o.hidden = !!f && o.dataset.seg !== f; });
  }));

  document.querySelectorAll('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const corpo = `Nome: ${d.get('nome')}\nE-mail: ${d.get('email')}\nTelefone: ${d.get('telefone') || ''}\n\n${d.get('mensagem')}`;
    location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(`${d.get('assunto')} · site TOP Engenharia`)}&body=${encodeURIComponent(corpo)}`;
  }));
})();
