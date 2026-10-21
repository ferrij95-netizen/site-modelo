// Cofril: menu do celular, banners (A), prateleiras, filtro e busca do catálogo, calculadora de churrasco,
// mapa e seletor de representantes, vídeo do YouTube só ao clicar e formulário de contato (prévia).
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// banners das campanhas
document.querySelectorAll('[data-slider]').forEach(s => {
  const slides = $$('.slide', s), pontos = $$('[data-sl-ir]', s);
  let i = 0, t;
  const ir = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((el, k) => { el.classList.toggle('on', k === i); el.setAttribute('aria-hidden', String(k !== i)); });
    pontos.forEach((p, k) => k === i ? p.setAttribute('aria-current', 'true') : p.removeAttribute('aria-current'));
  };
  const auto = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => ir(i + 1), 6000); };
  $$('[data-sl]', s).forEach(b => b.addEventListener('click', () => { ir(i + Number(b.dataset.sl)); auto(); }));
  pontos.forEach(p => p.addEventListener('click', () => { ir(Number(p.dataset.slIr)); auto(); }));
  s.addEventListener('mouseenter', () => clearInterval(t)); s.addEventListener('mouseleave', auto);
  auto();
});

// prateleiras com setas
document.querySelectorAll('[data-prat]').forEach(p => {
  const lista = p.querySelector('.prat-lista');
  p.querySelectorAll('[data-prat-ir]').forEach(b => b.addEventListener('click', () => {
    const passo = Math.max(lista.clientWidth * .8, 200) * Number(b.dataset.pratIr);
    const fim = lista.scrollLeft + passo;
    if (fim > lista.scrollWidth - lista.clientWidth + 4) lista.scrollTo({ left: 0, behavior: 'smooth' });
    else if (fim < -4) lista.scrollTo({ left: lista.scrollWidth, behavior: 'smooth' });
    else lista.scrollBy({ left: passo, behavior: 'smooth' });
  }));
});

// catálogo: linha (botões ou ?linha=) e busca por nome
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const filtros = $$('[data-filtro]'), busca = document.querySelector('[data-busca]');
if (filtros.length) {
  let linha = new URLSearchParams(location.search).get('linha') || '';
  const aplica = () => {
    const q = norm(busca?.value || '');
    filtros.forEach(o => o.setAttribute('aria-pressed', String(o.dataset.filtro === linha)));
    let vis = 0;
    const itens = $$('.catalogo [data-linha]');
    if (itens.length) itens.forEach(el => { el.hidden = (!!linha && el.dataset.linha !== linha) || (!!q && !el.dataset.nome.includes(q)); if (!el.hidden) vis++; });
    else $$('.catalogo-b [data-linha]').forEach(sec => {
      let n = 0;
      $$('li', sec).forEach(li => { li.hidden = !!q && !li.dataset.nome.includes(q); if (!li.hidden) n++; });
      sec.hidden = (!!linha && sec.dataset.linha !== linha) || !n; if (!sec.hidden) vis += n;
    });
    document.querySelector('[data-cat-vazio]').hidden = vis > 0;
  };
  filtros.forEach(b => b.addEventListener('click', () => { linha = b.dataset.filtro; aplica(); history.replaceState(null, '', linha ? `?linha=${linha}` : location.pathname); }));
  busca?.addEventListener('input', aplica);
  aplica();
}

// calculadora de churrasco
document.querySelectorAll('[data-calc]').forEach(f => {
  const c = JSON.parse(f.dataset.calc), res = f.querySelector('.calc-res');
  const val = n => Math.max(0, Math.min(999, parseInt(f.elements[n].value, 10) || 0));
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString('pt-BR');
  const conta = () => {
    const total = val('homem') * c.homem + val('mulher') * c.mulher + val('crianca') * c.crianca;
    f.querySelector('[data-calc-total]').textContent = fmt(total);
    c.divisao.forEach(([n, p]) => { f.querySelector(`[data-calc-item="${n}"]`).textContent = `${fmt(total * p)} kg`; });
    res.classList.toggle('on', total > 0);
  };
  f.addEventListener('input', conta);
  f.addEventListener('submit', e => e.preventDefault());
  $$('[data-calc-mais], [data-calc-menos]', f).forEach(b => b.addEventListener('click', () => {
    const inp = b.parentElement.querySelector('input');
    inp.value = Math.max(0, (parseInt(inp.value, 10) || 0) + (b.hasAttribute('data-calc-mais') ? 1 : -1)); conta();
  }));
  conta();
});

// representantes: mapa, select e lista A-Z mostram a mesma cidade
document.querySelectorAll('[data-reps]').forEach(r => {
  const sel = r.querySelector('[data-rep-sel]'), vazio = r.querySelector('[data-rep-vazio]');
  const mostra = slug => {
    $$('[data-rep-cidade]', r).forEach(el => { el.hidden = el.dataset.repCidade !== slug; });
    $$('path[data-rep]', r).forEach(p => p.classList.toggle('on', p.dataset.rep === slug));
    vazio.hidden = !!slug; sel.value = slug;
  };
  sel.addEventListener('change', () => mostra(sel.value));
  $$('path[data-rep]', r).forEach(p => {
    p.addEventListener('click', () => mostra(p.dataset.rep));
    p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mostra(p.dataset.rep); } });
  });
  $$('[data-rep-ir]').forEach(b => b.addEventListener('click', () => { mostra(b.dataset.repIr); r.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
  const ini = new URLSearchParams(location.search).get('cidade');
  if (ini) mostra(ini);
});

// vídeo: carrega o YouTube só quando a pessoa clica
document.querySelectorAll('[data-video]').forEach(v => v.querySelector('button').addEventListener('click', () => {
  v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.video}?autoplay=1" title="Vídeo Cofril" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
}));

// formulário: na prévia não envia, só confirma
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
