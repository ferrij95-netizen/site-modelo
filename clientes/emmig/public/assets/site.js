// EMMIG: menu do celular, topo sobre a capa, slides, lista "o que fabricamos", trilho, abas, filtros, foto que troca, caixa de foto e formulário.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // menu
  const btn = $('[data-abre-menu]');
  btn?.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    btn.setAttribute('aria-expanded', aberto);
  });

  // topo transparente que fica verde ao rolar
  const topo = $('.topo-foto');
  if (topo) { const f = () => topo.classList.toggle('rolou', scrollY > 40); f(); addEventListener('scroll', f, { passive: true }); }

  // slides da capa
  const capa = $('[data-slides]');
  if (capa) {
    const sl = $$('.slide', capa), n = $('.slides-n b', capa), barra = $('.slides-barra i', capa);
    let i = 0;
    const vai = k => {
      sl[i].classList.remove('ativo'); i = (k + sl.length) % sl.length; sl[i].classList.add('ativo');
      n.textContent = String(i + 1).padStart(2, '0');
      barra.classList.remove('corre'); void barra.offsetWidth; barra.classList.add('corre');
    };
    if (!parado && sl.length > 1) { barra.classList.add('corre'); setInterval(() => vai(i + 1), 6000); }
  }

  // o que fabricamos: item sob o mouse (ou o do meio da tela) mostra a foto
  const lf = $("[data-lista-fab]");
  if (lf && matchMedia('(min-width: 861px)').matches) {
    const itens = $$('li', lf), fotos = $$('.fab-fotos figure', lf);
    const ativa = k => { itens.forEach((x, j) => x.classList.toggle('ativo', j === k)); fotos.forEach((x, j) => x.classList.toggle('ativo', j === k)); };
    itens.forEach((li, k) => li.addEventListener('mouseenter', () => ativa(k)));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) ativa(itens.indexOf(e.target)); }), { rootMargin: '-48% 0px -48% 0px' });
      itens.forEach(li => io.observe(li));
    }
  }

  // trilho de obras
  const trilho = $('[data-filme-trilho]');
  $$('[data-filme]').forEach(b => b.addEventListener('click', () => trilho.scrollBy({ left: +b.dataset.filme * trilho.clientWidth * .6, behavior: 'smooth' })));

  // abas
  $$('[data-abas]').forEach(lista => {
    const bts = $$('[role=tab]', lista);
    bts.forEach(b => b.addEventListener('click', () => {
      bts.forEach(x => { const sel = x === b; x.setAttribute('aria-selected', sel); document.getElementById(x.getAttribute('aria-controls')).hidden = !sel; });
    }));
  });

  // filtros de obras
  const filtros = $('[data-filtros]');
  if (filtros) {
    const bts = $$('button', filtros), itens = $$('[data-seg]');
    bts.forEach(b => b.addEventListener('click', () => {
      bts.forEach(x => x.setAttribute('aria-pressed', x === b));
      itens.forEach(it => { it.hidden = b.dataset.f !== 'todas' && it.dataset.seg !== b.dataset.f; });
    }));
  }

  // foto fixa que troca conforme o passo
  const troca = $('[data-troca]');
  if (troca && 'IntersectionObserver' in window) {
    const fotos = $$('.troca-fotos figure', troca), passos = $$('.passo', troca);
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const k = +e.target.dataset.passo;
      passos.forEach((p, j) => p.classList.toggle('ativo', j === k));
      fotos.forEach((f, j) => f.classList.toggle('ativo', j === k));
    }), { rootMargin: '-45% 0px -45% 0px' });
    passos.forEach(p => io.observe(p));
  }

  // contador
  $$('[data-conta]').forEach(el => {
    if (parado || !('IntersectionObserver' in window)) return;
    const alvo = +el.textContent; el.textContent = '0';
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const passo = t => { const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(passo); };
      requestAnimationFrame(passo);
    });
    io.observe(el);
  });

  // faixa de clientes: duplica para rolar sem emenda
  $$('[data-rolo] > div').forEach(d => { d.innerHTML += d.innerHTML; });

  // caixa de foto
  const caixa = $('[data-caixa]');
  if (caixa) {
    const im = $('img', caixa), leg = $('figcaption', caixa);
    let grupo = [], k = 0;
    const mostra = () => { const a = grupo[k]; im.src = a.href; im.alt = a.querySelector('img')?.alt || ''; leg.textContent = `${im.alt}`; };
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-foto]'); if (!a) return;
      e.preventDefault();
      const g = a.closest('[data-galeria], figure, .noticia');
      grupo = g ? $$('[data-foto]', g) : [a]; k = grupo.indexOf(a);
      mostra(); caixa.hidden = false; document.body.style.overflow = 'hidden'; $('[data-cf-fechar]', caixa).focus();
    });
    const fecha = () => { caixa.hidden = true; document.body.style.overflow = ''; };
    $('[data-cf-fechar]', caixa).addEventListener('click', fecha);
    $('[data-cf-ant]', caixa).addEventListener('click', () => { k = (k - 1 + grupo.length) % grupo.length; mostra(); });
    $('[data-cf-prox]', caixa).addEventListener('click', () => { k = (k + 1) % grupo.length; mostra(); });
    caixa.addEventListener('click', e => { if (e.target === caixa) fecha(); });
    addEventListener('keydown', e => {
      if (caixa.hidden) return;
      if (e.key === 'Escape') fecha();
      if (e.key === 'ArrowLeft') $('[data-cf-ant]', caixa).click();
      if (e.key === 'ArrowRight') $('[data-cf-prox]', caixa).click();
    });
  }

  // formulário: monta o e-mail
  const form = $('[data-form]');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const corpo = [`Nome: ${d.nome}`, d.empresa && `Empresa: ${d.empresa}`, `E-mail: ${d.email}`, d.telefone && `Telefone: ${d.telefone}`, d.tipo && `Tipo de obra: ${d.tipo}`, '', d.mensagem].filter(x => x !== undefined && x !== '').join('\n');
    location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(d.assunto || 'Contato pelo site')}&body=${encodeURIComponent(corpo)}`;
  });
})();
