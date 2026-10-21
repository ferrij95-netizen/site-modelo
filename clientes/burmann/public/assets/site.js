// Burmann Alimentos: menu do celular, faixa de lavoura, abas do mostruário, catálogo com cotação, formulário por e-mail.
document.documentElement.classList.add('js');
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu do celular
  $$('.a-burger,.b-burger').forEach(b => b.addEventListener('click', () => {
    const topo = b.closest('header');
    const aberto = topo.classList.toggle('aberto');
    b.setAttribute('aria-expanded', aberto);
  }));

  // Aparece ao rolar
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' }) : null;
  $$('[data-rev]').forEach(el => io ? io.observe(el) : el.classList.add('vis'));

  // Números que contam
  $$('[data-conta]').forEach(el => {
    const fim = +el.textContent; if (calmo || !io) return;
    el.textContent = '0';
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; o.disconnect();
      const t0 = performance.now();
      const passo = t => { const k = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(fim * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(passo); };
      requestAnimationFrame(passo);
    });
    o.observe(el);
  });

  // Faixa de lavoura: troca a foto a cada 5 s
  $$('[data-faixa]').forEach(f => {
    const figs = $$('figure', f); if (calmo || figs.length < 2) return;
    let i = 0;
    setInterval(() => { figs[i].classList.remove('on'); i = (i + 1) % figs.length; figs[i].classList.add('on'); }, 5000);
  });

  // Abas do mostruário
  $$('[data-abas]').forEach(box => {
    const abas = $$('[data-aba]', box);
    abas.forEach(a => a.addEventListener('click', () => {
      abas.forEach(x => x.setAttribute('aria-selected', x === a));
      $$('[data-painel]', box).forEach(p => { p.hidden = !!a.dataset.aba && p.dataset.painel !== a.dataset.aba; });
    }));
  });

  // Catálogo: filtro, busca e lista de cotação (abre o e-mail)
  $$('[data-catalogo]').forEach(cat => {
    const linhas = $$('tbody tr', cat);
    const chips = $$('[data-fam]', cat);
    const busca = cat.querySelector('[data-busca]');
    const bt = cat.querySelector('[data-cot]');
    const lista = cat.querySelector('[data-cot-lista]');
    let fam = '';
    const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
    const filtra = () => {
      const q = busca ? norm(busca.value) : '';
      linhas.forEach(tr => { tr.hidden = !((!fam || tr.dataset.f === fam) && (!q || tr.dataset.t.includes(q))); });
    };
    chips.forEach(c => c.addEventListener('click', () => {
      fam = c.dataset.fam; chips.forEach(x => x.setAttribute('aria-pressed', x === c)); filtra();
    }));
    if (busca) busca.addEventListener('input', filtra);
    const atualiza = () => {
      const sel = linhas.filter(tr => tr.querySelector('input').checked);
      linhas.forEach(tr => tr.classList.toggle('sel', tr.querySelector('input').checked));
      const nomes = sel.map(tr => tr.querySelector('input').value);
      const n = nomes.length;
      const rot = n === 0 ? cat.dataset.rotulo0 : n === 1 ? cat.dataset.rotulo1 : cat.dataset.rotulon.replace(/\d+/, n);
      bt.firstChild.textContent = rot + ' ';
      bt.setAttribute('aria-disabled', n === 0);
      lista.textContent = nomes.join(' · ');
      const corpo = `${cat.dataset.msg}\n\n${nomes.map(x => `- ${x}`).join('\n')}\n`;
      bt.href = `mailto:${cat.dataset.email}?subject=${encodeURIComponent(document.title.split(' · ')[0] + ' · ' + rot)}&body=${encodeURIComponent(corpo)}`;
    };
    $$('tbody input', cat).forEach(i => i.addEventListener('change', atualiza));
    atualiza();
  });

  // Formulário: monta o e-mail
  $$('form[data-mailto]').forEach(f => {
    const prod = new URLSearchParams(location.search).get('produto');
    if (prod && f.msg) f.msg.value = `${prod}: `;
    f.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f));
      const corpo = `${d.msg}\n\n${d.nome}\n${d.email}${d.tel ? '\n' + d.tel : ''}`;
      location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto + ' · ' + d.nome)}&body=${encodeURIComponent(corpo)}`;
    });
  });
})();
