// Marmoraria Lonardi: menu, hero, mini galerias, ampliação de fotos, filtro, simulador de lápide e pedido de orçamento.
(() => {
  document.documentElement.classList.add('js');
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const WA = '5551999076743', MAIL = 'marmorarialonardi@gmail.com';

  // menu do celular
  $$('.abre').forEach(b => b.addEventListener('click', () => {
    const alvo = document.getElementById(b.getAttribute('aria-controls'));
    const caixa = alvo.closest('.botoes') || alvo;
    const ab = caixa.classList.toggle('aberto');
    b.setAttribute('aria-expanded', ab);
  }));

  // topo compacto ao rolar (versão A)
  const topo = $('.v-a .topo');
  if (topo) addEventListener('scroll', () => topo.classList.toggle('compacto', scrollY > 140), { passive: true });

  // revelar ao rolar e contar números
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('vis'); io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px' }) : null;
  $$('[data-rev]').forEach(el => io ? io.observe(el) : el.classList.add('vis'));
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  $$('[data-conta]').forEach(el => {
    const fim = parseInt(el.textContent, 10); if (quieto || !io) return;
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; o.disconnect();
      const t0 = performance.now();
      const passo = t => { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(fim * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(passo); };
      requestAnimationFrame(passo);
    });
    o.observe(el);
  });

  // hero com fotos que trocam (versão A)
  const hero = $('[data-hero]');
  if (hero && !quieto) {
    const fs = $$('.slides figure', hero), ps = $$('.pontos i', hero); let i = 0;
    setInterval(() => { fs[i].classList.remove('on'); ps[i].classList.remove('on'); i = (i + 1) % fs.length; fs[i].classList.add('on'); ps[i].classList.add('on'); }, 5500);
  }

  // mini galerias dos quatro blocos (versão A)
  $$('[data-mini]').forEach(m => {
    const tr = $('.trilho', m), n = tr.children.length, cont = $('.cont b', m); let i = 0;
    const vai = d => { i = (i + d + n) % n; tr.style.transform = `translateX(${-i * 100}%)`; cont.textContent = i + 1; };
    $('.mp', m).onclick = () => vai(-1); $('.mn', m).onclick = () => vai(1);
    let x0 = null;
    tr.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    tr.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) vai(dx < 0 ? 1 : -1); x0 = null; });
  });

  // ampliar fotos
  const lb = $('.lb');
  if (lb) {
    let lista = [], i = 0;
    const im = $('img', lb), leg = $('figcaption', lb);
    const mostra = () => { im.src = lista[i].dataset.lb; im.alt = lista[i].dataset.leg; leg.textContent = lista[i].dataset.leg; };
    const fecha = () => { lb.hidden = true; document.body.style.overflow = ''; };
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-lb]'); if (!b) return;
      const caixa = b.closest('[data-galeria],[data-mini]');
      lista = $$('[data-lb]', caixa).filter(x => !x.closest('[hidden]')); i = lista.indexOf(b);
      mostra(); lb.hidden = false; document.body.style.overflow = 'hidden'; $('.lb-x', lb).focus();
    });
    $('.lb-x', lb).onclick = fecha;
    $('.lb-p', lb).onclick = () => { i = (i - 1 + lista.length) % lista.length; mostra(); };
    $('.lb-n', lb).onclick = () => { i = (i + 1) % lista.length; mostra(); };
    lb.addEventListener('click', e => { if (e.target === lb) fecha(); });
    addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') fecha(); if (e.key === 'ArrowLeft') $('.lb-p', lb).click(); if (e.key === 'ArrowRight') $('.lb-n', lb).click(); });
  }

  // filtro de trabalhos (versão B)
  $$('.filtro').forEach(f => {
    const gal = f.closest('.sec').querySelector('.filtra');
    f.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', f).forEach(x => x.setAttribute('aria-pressed', x === b));
      $$('figure', gal).forEach(fig => { fig.hidden = !!b.dataset.f && fig.dataset.grupo !== b.dataset.f; });
    });
  });

  // simulador de lápide
  $$('[data-sim]').forEach(s => {
    const placa = $('.placa', s), out = k => $(`[data-out=${k}]`, s), inp = k => $(`[data-in=${k}]`, s), btn = $('[data-sim-wa]', s);
    const pedraNome = () => $('input[name^=pedra]:checked', s).closest('label').textContent.trim();
    const data = el => { let v = el.value.replace(/\D/g, '').slice(0, 8); if (v.length > 4) v = v.replace(/(\d{2})(\d{2})(\d+)/, '$1.$2.$3'); else if (v.length > 2) v = v.replace(/(\d{2})(\d+)/, '$1.$2'); el.value = v; };
    const atualiza = () => {
      placa.dataset.pedra = $('input[name^=pedra]:checked', s).value;
      placa.dataset.letra = $('input[name^=letra]:checked', s).value;
      $('.simb', s).dataset.simb = $('input[name^=simb]:checked', s).value;
      $('[data-foto]', s).hidden = !inp('foto').checked;
      out('nome').textContent = inp('nome').value.trim() || 'Nome Completo';
      out('nasc').textContent = inp('nasc').value || '01.01.1950';
      out('fal').textContent = inp('fal').value || '01.01.2026';
      out('frase').textContent = inp('frase').value; out('frase').hidden = !inp('frase').value;
      const txt = ['Olá! Montei uma lápide no site da Marmoraria Lonardi e gostaria de um orçamento:',
        `Pedra: ${pedraNome()}`, `Letras: ${$('input[name^=letra]:checked', s).closest('label').textContent.trim()}`,
        `Nome: ${inp('nome').value.trim() || '(a definir)'}`, `Datas: ${inp('nasc').value || '-'} / ${inp('fal').value || '-'}`,
        `Frase: ${inp('frase').value || 'sem frase'}`, `Símbolo: ${$('input[name^=simb]:checked', s).closest('label').textContent.trim()}`,
        `Foto oval: ${inp('foto').checked ? 'sim' : 'não'}`].join('\n');
      btn.href = `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;
    };
    ['nasc', 'fal'].forEach(k => inp(k).addEventListener('input', () => data(inp(k))));
    s.addEventListener('input', atualiza); s.addEventListener('change', atualiza); atualiza();
  });

  // pedido de orçamento
  $$('[data-orc]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f)), via = e.submitter?.value || 'wa', erro = $('.erro', f);
    if (!d.nome.trim() || !d.fone.trim()) { erro.hidden = false; return; }
    erro.hidden = true;
    const txt = [`Olá! Sou ${d.nome.trim()} e gostaria de um orçamento.`, `Telefone: ${d.fone}`, `Trabalho: ${d.tipo}`,
      d.medidas && `Medidas: ${d.medidas}`, d.pedra && `Pedra: ${d.pedra}`, d.msg && `Mensagem: ${d.msg}`].filter(Boolean).join('\n');
    if (via === 'mail') location.href = `mailto:${MAIL}?subject=${encodeURIComponent('Orçamento pelo site: ' + d.tipo)}&body=${encodeURIComponent(txt)}`;
    else open(`https://wa.me/${WA}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  }));
})();
