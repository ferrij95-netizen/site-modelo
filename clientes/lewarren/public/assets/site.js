// Menu do celular, caixa de fotos, formulários que abrem o WhatsApp, carrossel simples e entrada suave das seções.
(() => {
  const WA = '';
  const btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    btn.setAttribute('aria-expanded', aberto);
  });

  // <form data-wa="Assunto"> com campos name/label: monta a mensagem e abre o WhatsApp
  document.querySelectorAll('form[data-wa]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    f.querySelectorAll('[required]').forEach(c => {
      const vazio = c.type === 'checkbox' ? !c.checked : !c.value.trim();
      const l = c.closest('label'); if (l) l.classList.toggle('erro', vazio);
      if (vazio && ok) { c.focus(); ok = false; }
    });
    if (!ok) return;
    const linhas = [f.dataset.wa || 'Olá! Vim pelo site.'];
    [...f.elements].forEach(c => {
      if (!c.name || c.type === 'checkbox' || c.type === 'submit' || !c.value.trim()) return;
      const rot = c.dataset.rotulo || (c.closest('label') && c.closest('label').firstChild.textContent.trim()) || c.name;
      const val = c.tagName === 'SELECT' ? c.options[c.selectedIndex].text : c.value.trim();
      linhas.push(`${rot.replace(/\*$/, '').trim()}: ${val}`);
    });
    if (f.dataset.email) { location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(f.dataset.wa || 'Website inquiry')}&body=${encodeURIComponent(linhas.slice(1).join('\n'))}`; return; }
    window.open(`https://wa.me/${f.dataset.numero || WA}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
  }));
  document.addEventListener('input', e => { const l = e.target.closest && e.target.closest('label.erro'); if (l && e.target.value.trim()) l.classList.remove('erro'); });

  // Caixa de fotos: links com data-foto="legenda"
  const fotos = [...document.querySelectorAll('[data-foto]')];
  if (fotos.length) {
    const caixa = document.createElement('div');
    caixa.className = 'caixa-foto'; caixa.hidden = true;
    const en = document.documentElement.lang === 'en';
    caixa.innerHTML = `<button class="caixa-fechar" aria-label="${en ? 'Close' : 'Fechar'}">×</button><button class="caixa-ant" aria-label="${en ? 'Previous' : 'Anterior'}">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="caixa-prox" aria-label="${en ? 'Next' : 'Próxima'}">›</button>`;
    document.body.appendChild(caixa);
    let i = 0;
    const abre = n => {
      i = (n + fotos.length) % fotos.length;
      caixa.querySelector('img').src = fotos[i].href;
      caixa.querySelector('img').alt = fotos[i].dataset.foto;
      caixa.querySelector('figcaption').textContent = fotos[i].dataset.foto;
      caixa.hidden = false;
    };
    fotos.forEach((a, n) => a.addEventListener('click', e => { e.preventDefault(); abre(n); }));
    caixa.addEventListener('click', e => {
      if (e.target.closest('.caixa-prox')) return abre(i + 1);
      if (e.target.closest('.caixa-ant')) return abre(i - 1);
      if (e.target === caixa || e.target.closest('.caixa-fechar')) caixa.hidden = true;
    });
    document.addEventListener('keydown', e => {
      if (caixa.hidden) return;
      if (e.key === 'Escape') caixa.hidden = true;
      if (e.key === 'ArrowRight') abre(i + 1);
      if (e.key === 'ArrowLeft') abre(i - 1);
    });
  }

  // Carrossel: [data-carrossel] com filhos .slide; botões [data-ant]/[data-prox] e pontos opcionais
  document.querySelectorAll('[data-carrossel]').forEach(c => {
    const slides = [...c.querySelectorAll('.slide')];
    if (slides.length < 2) return;
    const pontos = c.querySelector('.pontos');
    let i = 0, t;
    if (pontos) pontos.innerHTML = slides.map((_, n) => `<button aria-label="Foto ${n + 1}"></button>`).join('');
    const vai = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('ativo', k === i));
      if (pontos) [...pontos.children].forEach((b, k) => b.classList.toggle('ativo', k === i));
    };
    const auto = () => { clearInterval(t); t = setInterval(() => vai(i + 1), +(c.dataset.carrossel || 6000)); };
    c.addEventListener('click', e => {
      if (e.target.closest('[data-prox]')) { vai(i + 1); auto(); }
      if (e.target.closest('[data-ant]')) { vai(i - 1); auto(); }
      const p = e.target.closest('.pontos button'); if (p) { vai([...pontos.children].indexOf(p)); auto(); }
    });
    vai(0); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) auto();
  });

  // Entrada suave: elementos com .sobe aparecem ao entrar na tela
  const els = document.querySelectorAll('.sobe');
  if (els.length && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('anima');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  }
})();
