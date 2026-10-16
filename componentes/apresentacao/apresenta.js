// Overtus · kit de apresentação. Sem dependências. Inclua com <script src="apresenta.js" defer> depois do apresenta.css.
// Atributos: data-rev, data-rev-filhos, data-palavras, data-conta, data-etapas, data-troca, data-slide, data-paralaxe, .mk-rola.
// <body data-ap-auto="seletor, seletor"> marca esses elementos com data-rev sozinho (útil em páginas internas já prontas).
(() => {
  const doc = document.documentElement, body = document.body;
  const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;
  doc.classList.add('ap-js');
  const topo = () => parseFloat(getComputedStyle(doc).getPropertyValue('--ap-topo')) || 0;

  // revelar automático: atraso escalonado entre irmãos
  if (body.dataset.apAuto) document.querySelectorAll(body.dataset.apAuto).forEach(el => {
    if (el.hasAttribute('data-rev')) return;
    el.setAttribute('data-rev', '');
    const i = [...el.parentElement.children].indexOf(el) % 6;
    if (i) el.style.setProperty('--ap-d', i * 90 + 'ms');
  });
  document.querySelectorAll('[data-rev-filhos]').forEach(p => [...p.children].forEach((c, i) => {
    c.setAttribute('data-rev', p.dataset.revFilhos);
    c.style.setProperty('--ap-d', i * (+p.dataset.revPasso || 90) + 'ms');
  }));

  // palavras: cada palavra sobe de dentro de uma máscara
  document.querySelectorAll('[data-palavras]').forEach(el => {
    let i = 0;
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nos = [];
    while (tw.nextNode()) nos.push(tw.currentNode);
    nos.forEach(n => {
      const f = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) return f.append(' ');
        const s = document.createElement('span'); s.className = 'ap-p';
        const d = document.createElement('span'); d.textContent = p; d.style.setProperty('--i', i++);
        s.append(d); f.append(s);
      });
      n.replaceWith(f);
    });
  });

  // contador: anima cada número do texto mantendo o formato ("100 – 25,000", "24/7", "40+")
  const contar = el => {
    const final = el.dataset.conta || el.textContent;
    const nums = [...final.matchAll(/\d[\d,]*(\.\d+)?/g)];
    if (!nums.length || parado) return void (el.textContent = final);
    const t0 = performance.now(), dur = +el.dataset.contaTempo || 1800, de = +el.dataset.contaDe || 0;
    const passo = t => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(2, -10 * k);
      el.textContent = final.replace(/\d[\d,]*(\.\d+)?/g, m => {
        const alvo = parseFloat(m.replace(/,/g, '')), dec = (m.split('.')[1] || '').length;
        const v = k < 1 ? de + (alvo - de) * e : alvo;
        return m.includes(',') ? v.toLocaleString('en-US', { maximumFractionDigits: dec, minimumFractionDigits: dec }) : v.toFixed(dec);
      });
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  document.querySelectorAll('[data-conta]').forEach(el => {
    el.dataset.conta ||= el.textContent;
    if (!parado) el.textContent = el.dataset.conta.replace(/\d[\d,]*(\.\d+)?/g, el.dataset.contaDe || '0');
  });

  // entrada na tela
  const io = new IntersectionObserver(ents => ents.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('ap-vis');
    if (e.target.hasAttribute('data-conta')) contar(e.target);
    io.unobserve(e.target);
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('[data-rev],[data-palavras],[data-conta]').forEach(el => io.observe(el));

  // telas que rolam sozinhas dentro da moldura
  const mede = v => { const im = v.querySelector('img'); if (im) v.style.setProperty('--mk-desl', Math.max(0, im.offsetHeight - v.clientHeight)); };
  document.querySelectorAll('.mk-rola').forEach(v => { const im = v.querySelector('img'); im?.complete ? mede(v) : im?.addEventListener('load', () => mede(v)); });

  // troca de imagem fixa conforme o texto passa pelo meio da tela
  document.querySelectorAll('[data-troca]').forEach(box => {
    const midia = [...box.querySelectorAll('.ap-troca-midia>*')], passos = [...box.querySelectorAll('.ap-troca-passo')];
    const ativa = i => { midia.forEach((m, j) => m.classList.toggle('ap-on', j === i)); passos.forEach((p, j) => p.classList.toggle('ap-on', j === i)); };
    ativa(0);
    const o = new IntersectionObserver(ents => ents.forEach(e => e.isIntersecting && ativa(passos.indexOf(e.target))), { rootMargin: '-45% 0px -45% 0px' });
    passos.forEach(p => o.observe(p));
  });

  // slides: pontos de navegação, barra de progresso, encaixe suave
  const slides = [...document.querySelectorAll('[data-slide]')];
  let pontos = [];
  if (slides.length > 2) {
    doc.classList.add('ap-snap');
    const nav = document.createElement('ol'); nav.className = 'ap-pontos'; nav.setAttribute('aria-label', 'Sections');
    slides.forEach((s, i) => { s.id ||= 'tela-' + (i + 1); nav.insertAdjacentHTML('beforeend', `<li><a href="#${s.id}"><span>${s.dataset.slide}</span><i></i></a></li>`); });
    body.append(nav); pontos = [...nav.querySelectorAll('a')];
    const barra = document.createElement('div'); barra.className = 'ap-barra'; body.append(barra);
    const o = new IntersectionObserver(ents => ents.forEach(e => {
      if (!e.isIntersecting) return;
      pontos.forEach((a, j) => a.toggleAttribute('aria-current', slides[j] === e.target));
      nav.style.setProperty('--ap-pontos-cor', getComputedStyle(e.target).color);
    }), { rootMargin: '-50% 0px -50% 0px' });
    slides.forEach(s => o.observe(s));
  }

  // a cada quadro de rolagem: barra, etapas, paralaxe
  const etapas = [...document.querySelectorAll('[data-etapas]')], para = [...document.querySelectorAll('[data-paralaxe]')];
  let pedido = false;
  const quadro = () => {
    pedido = false;
    const h = innerHeight, max = doc.scrollHeight - h;
    if (pontos.length) doc.style.setProperty('--ap-prog', max > 0 ? scrollY / max : 0);
    etapas.forEach(box => {
      const r = box.getBoundingClientRect(), k = Math.min(1, Math.max(0, (h * .62 - r.top) / (r.height || 1)));
      box.style.setProperty('--ap-linha', parado ? 1 : k);
      const it = box.querySelectorAll('.ap-etapa');
      it.forEach((el, i) => el.classList.toggle('ap-on', parado || k >= i / it.length));
    });
    if (!parado) para.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      el.style.transform = `translate3d(0,${((r.top + r.height / 2 - h / 2) * (+el.dataset.paralaxe || .15)).toFixed(1)}px,0)`;
    });
  };
  const pede = () => { if (!pedido) { pedido = true; requestAnimationFrame(quadro); } };
  addEventListener('scroll', pede, { passive: true }); addEventListener('resize', () => { pede(); document.querySelectorAll('.mk-rola').forEach(mede); });
  quadro();
})();
