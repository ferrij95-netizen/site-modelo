// Menu do celular, busca e filtro do catálogo, janela do produto e formulário que monta a mensagem do WhatsApp.
const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
const sem = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// menu
const btn = $('.menu-btn');
btn?.addEventListener('click', () => {
  const aberto = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!aberto));
  document.body.classList.toggle('menu-aberto', !aberto);
});

// catálogo: busca por nome (também vem de ?q= da busca do topo) e linha atual destacada ao rolar
const cat = $('[data-catalogo]');
if (cat) {
  const campo = $('[data-filtro-busca]', cat), secs = $$('[data-sec]', cat), aviso = $('[data-sem]', cat);
  const itens = $$('.prod', cat).map(li => ({ li, txt: sem(li.dataset.nome) }));
  const filtra = q => {
    const t = sem(q);
    itens.forEach(i => { i.li.hidden = !!t && !t.split(/\s+/).every(p => i.txt.includes(p)); });
    let algum = false;
    secs.forEach(s => { const v = $$('.prod', s).some(li => !li.hidden); s.hidden = !v; algum ||= v; });
    $$('[data-linha-link]', cat).forEach(a => { a.classList.toggle('apagado', !!t && $('#' + a.dataset.linhaLink)?.hidden); });
    aviso.hidden = algum;
    const outro = $('[data-sem-outro]', cat); if (outro) outro.href = cat.dataset.outro + (t ? '?q=' + encodeURIComponent(q) : '');
  };
  campo.addEventListener('input', () => { filtra(campo.value); history.replaceState(null, '', campo.value ? '?q=' + encodeURIComponent(campo.value) : location.pathname); });
  const q = new URLSearchParams(location.search).get('q');
  if (q) { campo.value = q; filtra(q); }
  const links = $$('[data-linha-link]', cat);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('on', a.dataset.linhaLink === e.target.id));
      const on = links.find(a => a.classList.contains('on'));
      const nav = on?.parentElement; if (nav && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: on.offsetLeft - 16, behavior: 'smooth' });
    }), { rootMargin: '-30% 0px -60% 0px' });
    secs.forEach(s => io.observe(s));
  }
}

// busca do topo e da abertura: vai para o catálogo com ?q=
$$('[data-busca-global]').forEach(f => f.addEventListener('submit', e => {
  const q = $('input', f).value.trim();
  if (!q) { e.preventDefault(); return; }
  if (cat && f.closest('header')) { e.preventDefault(); const c = $('[data-filtro-busca]', cat); c.value = q; c.dispatchEvent(new Event('input')); c.scrollIntoView({ block: 'center' }); }
}));
// atalhos "mais procurados": decidem o departamento pelo nome
const obra = ['ferro ca-50', 'linha agua', 'pregos', 'telas para concreto'];
$$('[data-chip]').forEach(a => {
  const q = a.dataset.chip, base = location.pathname.startsWith('/a/') ? '/a/' : '/b/';
  a.href = `${base}${obra.includes(sem(q)) ? 'construcao-civil' : 'agropecuaria'}/?q=${encodeURIComponent(q)}`;
});

// janela do produto
const dlg = $('#prod-dlg');
if (dlg) {
  let origem;
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-prod]');
    if (!b) return;
    origem = b;
    const img = $('.pd-foto img', dlg);
    img.src = b.dataset.img || ''; img.alt = b.dataset.titulo;
    $('.pd-foto', dlg).hidden = !b.dataset.img;
    $('.pd-linha', dlg).textContent = b.dataset.linha;
    $('#pd-nome', dlg).textContent = b.dataset.titulo;
    $('.pd-ref', dlg).textContent = b.dataset.ref ? 'Código ' + b.dataset.ref : '';
    const d = $('.pd-desc', dlg); d.textContent = '';
    (b.dataset.desc || 'Consulte medidas, modelos e preço com a nossa equipe.').split('\n').forEach(l => { const p = document.createElement('p'); p.textContent = l; d.append(p); });
    $('.pd-whats', dlg).href = b.dataset.whats;
    dlg.showModal(); document.body.classList.add('dlg-aberto');
  });
  const fecha = () => dlg.close();
  $('[data-fecha]', dlg).addEventListener('click', fecha);
  dlg.addEventListener('click', e => { if (e.target === dlg) fecha(); });
  dlg.addEventListener('close', () => { document.body.classList.remove('dlg-aberto'); origem?.focus(); });
}

// formulário: abre o WhatsApp com a mensagem pronta
$$('form[data-form-whats]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  const linhas = ['Olá! Mensagem enviada pelo site da Vergalhão.', `Nome: ${d.nome}`, `Telefone: ${d.fone}`];
  if (d.email) linhas.push(`E-mail: ${d.email}`);
  if (d.cidade) linhas.push(`Cidade: ${d.cidade} - ${d.uf}`);
  const txt = [...linhas, '', d.msg].join('\n');
  window.open(`https://wa.me/${f.dataset.formWhats}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
}));
