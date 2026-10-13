// BM Soluções em Aços: menu do celular, carrossel, filtros de telas, galeria de obras e envio dos formulários (site estático).
(() => {
  const corpo = document.body;
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  // Carrossel: troca sozinho a cada 6 s, para quando o mouse está em cima.
  document.querySelectorAll('[data-carrossel]').forEach(car => {
    const slides = [...car.querySelectorAll('.slide')];
    const pontos = [...car.querySelectorAll('[data-ir]')];
    let atual = 0, timer;
    const ir = n => {
      atual = (n + slides.length) % slides.length;
      slides.forEach((s, i) => { s.classList.toggle('ativo', i === atual); s.setAttribute('aria-hidden', i !== atual); });
      pontos.forEach((p, i) => p.classList.toggle('ativo', i === atual));
    };
    const tocar = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(atual + 1), 6000); };
    pontos.forEach((p, i) => p.addEventListener('click', () => { ir(i); tocar(); }));
    car.querySelector('[data-ant]')?.addEventListener('click', () => { ir(atual - 1); tocar(); });
    car.querySelector('[data-prox]')?.addEventListener('click', () => { ir(atual + 1); tocar(); });
    car.addEventListener('mouseenter', () => clearInterval(timer));
    car.addEventListener('mouseleave', tocar);
    tocar();
  });

  // Lista de produtos da home B: a foto ao lado acompanha o item apontado.
  const plFoto = document.querySelector('[data-pl-foto]');
  if (plFoto) document.querySelectorAll('[data-pl-ir]').forEach(a => a.addEventListener('mouseenter', () => {
    plFoto.querySelectorAll('img').forEach(im => im.classList.toggle('ativo', im.dataset.pl === a.dataset.plIr));
  }));

  // Filtros da página de telas.
  const filtros = document.querySelectorAll('[data-filtro]');
  filtros.forEach(b => b.addEventListener('click', () => {
    filtros.forEach(x => x.classList.toggle('ativo', x === b));
    document.querySelectorAll('[data-grupo]').forEach(t => { t.hidden = b.dataset.filtro !== 'todas' && t.dataset.grupo !== b.dataset.filtro; });
  }));

  // Galeria de obras: abre a foto ampliada.
  const lb = document.querySelector('[data-lightbox]');
  if (lb) {
    document.querySelectorAll('[data-foto]').forEach(b => b.addEventListener('click', () => {
      lb.querySelector('img').src = b.dataset.foto;
      lb.querySelector('img').alt = b.querySelector('img').alt;
      lb.showModal();
    }));
    lb.addEventListener('click', e => { if (e.target === lb || e.target.matches('[data-fechar]')) lb.close(); });
  }

  document.querySelectorAll('[data-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter ? e.submitter.dataset.via : 'zap';
    const linhas = [...form.querySelectorAll('input, select, textarea')]
      .filter(c => c.value.trim())
      .map(c => `${c.closest('label').querySelector('span').textContent}: ${c.value.trim()}`);
    const assunto = form.dataset.assunto;
    const txt = `${assunto}\n\n${linhas.join('\n')}`;
    if (via === 'zap') location.href = `https://wa.me/${corpo.dataset.zap}?text=${encodeURIComponent(txt)}`;
    else location.href = `mailto:${form.dataset.para}?subject=${encodeURIComponent(assunto + ' · site')}&body=${encodeURIComponent(txt)}`;
  }));
})();
