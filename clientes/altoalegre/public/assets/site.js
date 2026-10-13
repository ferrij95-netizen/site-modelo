// Alto Alegre: menu, topo ao rolar, aparecer ao rolar, galeria e embalagens do produto, filtros, orçamento e formulários (abrem o e-mail).
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  document.documentElement.classList.add('js');

  const topo = $('[data-topo]');
  const rolar = () => topo && topo.classList.toggle('rolou', scrollY > 10);
  addEventListener('scroll', rolar, { passive: true }); rolar();

  const btn = $('[data-menu]'), nav = $('#nav');
  btn && btn.addEventListener('click', () => {
    const aberto = nav.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
    document.body.style.overflow = aberto ? 'hidden' : '';
  });

  // aparecer ao rolar
  const alvos = $$('.sec-head, .cp, .rc, .seta-card, .nums .n, .proj, .pub, .uc, .cert, .canal, .linha-cat, .emb, .duo-card, .linha-tempo li');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ok'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach((el, i) => { el.classList.add('revela'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  }

  // galeria do produto
  const gal = $('[data-galeria]');
  $$('[data-mini]').forEach(b => b.addEventListener('click', () => {
    $$('[data-mini]').forEach(x => x.classList.toggle('on', x === b));
    $$('[data-foto]', gal).forEach(f => f.classList.toggle('on', f.dataset.foto === b.dataset.mini));
  }));

  // embalagem escolhida vai junto para o orçamento
  const orcar = $('[data-orcar]');
  $$('[data-emb]').forEach(b => b.addEventListener('click', () => {
    $$('[data-emb]').forEach(x => x.setAttribute('aria-checked', x === b));
    if (orcar) { const u = new URL(orcar.href); u.searchParams.set('emb', b.dataset.emb); orcar.href = u.pathname + u.search; }
  }));

  // filtros do catálogo e das receitas
  $$('[data-filtro]').forEach(b => b.addEventListener('click', () => {
    $$('[data-filtro]').forEach(x => x.classList.toggle('on', x === b));
    $$('[data-bloco]').forEach(bl => (bl.hidden = b.dataset.filtro !== 'todos' && bl.dataset.bloco !== b.dataset.filtro));
  }));
  $$('[data-filtro-r]').forEach(b => b.addEventListener('click', () => {
    $$('[data-filtro-r]').forEach(x => x.classList.toggle('on', x === b));
    $$('.receitas-grade .rc').forEach(r => (r.hidden = b.dataset.filtroR !== 'todos' && !r.dataset.acucar.split(' ').includes(b.dataset.filtroR)));
  }));

  // orçamento: produto e embalagem vindos do link
  const fo = $('[data-form="orcamento"]');
  if (fo) {
    const sel = $('[data-orc-sel]', fo);
    const q = new URLSearchParams(location.search);
    const atualizar = (emb) => {
      const r = $('input[name=produto]:checked', fo);
      const embs = r.dataset.embs ? r.dataset.embs.split('|') : ['Contrato'];
      sel.innerHTML = embs.map(e => `<option${e === emb ? ' selected' : ''}>${e}</option>`).join('');
      $('[data-orc-nome]').textContent = r.dataset.nome;
      $('[data-orc-emb]').textContent = sel.value;
      const foto = $('[data-orc-foto]');
      foto.src = `/assets/img/${r.dataset.foto}.webp`;
      foto.classList.toggle('orc-foto-larga', !r.dataset.foto.startsWith('p-'));
    };
    const pre = q.get('produto') && $(`input[name=produto][value="${q.get('produto')}"]`, fo);
    if (pre) pre.checked = true;
    atualizar(q.get('emb'));
    $$('input[name=produto]', fo).forEach(r => r.addEventListener('change', () => atualizar()));
    sel.addEventListener('change', () => ($('[data-orc-emb]').textContent = sel.value));
  }

  // formulários: montam o e-mail com os campos preenchidos
  const nomes = { orcamento: 'Pedido de orçamento', contato: 'Contato pelo site', curriculo: 'Trabalhe conosco' };
  $$('form[data-form]').forEach(f => f.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!f.reportValidity()) return;
    const tipo = f.dataset.form;
    const d = new FormData(f);
    const linhas = [];
    for (const [k, v] of d) if (String(v).trim()) linhas.push(`${k[0].toUpperCase() + k.slice(1)}: ${v}`);
    const para = tipo === 'orcamento' ? document.body.dataset.vendas : document.body.dataset.email;
    const assunto = tipo === 'contato' ? `${d.get('assunto')} - ${d.get('nome')}` : `${nomes[tipo]} - ${d.get('empresa') || d.get('nome')}`;
    location.href = `mailto:${para}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
  }));
})();
