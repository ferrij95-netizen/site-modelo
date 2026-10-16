// Máquinas Águia: menu do celular, cabeçalho ao rolar, carrossel da capa, depoimentos, etapas, galeria da máquina,
// filtro do catálogo e formulário de contato (o site é estático: a mensagem abre no WhatsApp da fábrica).
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const topo = $('.topo'), btn = $('.menu-btn'), menu = $('#menu');
  const medir = () => document.documentElement.style.setProperty('--menu-top', topo.getBoundingClientRect().bottom + 'px');
  if (btn) btn.addEventListener('click', () => {
    const abre = btn.getAttribute('aria-expanded') !== 'true';
    medir(); btn.setAttribute('aria-expanded', abre); menu.classList.toggle('aberto', abre);
  });
  const rolar = () => { topo.classList.toggle('rolou', scrollY > 40); };
  addEventListener('scroll', rolar, { passive: true }); rolar();

  // Carrossel da capa (versão A)
  const sl = $('[data-slider]');
  if (sl) {
    const slides = $$('.slide', sl), dots = $$('.sl-nav button', sl);
    let i = 0, t;
    const ir = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('ativo', k === i); s.setAttribute('aria-hidden', k !== i); });
      dots.forEach((d, k) => d.setAttribute('aria-pressed', k === i));
    };
    const auto = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => ir(i + 1), 6500); };
    dots.forEach((d, k) => d.addEventListener('click', () => { ir(k); auto(); }));
    sl.addEventListener('mouseenter', () => clearInterval(t)); sl.addEventListener('mouseleave', auto);
    auto();
  }

  // Depoimentos
  const dp = $('[data-depo]');
  if (dp) {
    const itens = $$('.depo-item', dp), dots = $$('.depo-nav button', dp);
    let i = 0;
    const ir = n => { i = n % itens.length; itens.forEach((e, k) => e.hidden = k !== i); dots.forEach((d, k) => d.setAttribute('aria-pressed', k === i)); };
    dots.forEach((d, k) => d.addEventListener('click', () => ir(k)));
    setInterval(() => ir(i + 1), 9000);
  }

  // Etapas clicáveis (versão B)
  $$('[data-abas]').forEach(box => {
    const abas = $$('[role="tab"]', box);
    const ir = a => {
      abas.forEach(x => { const sel = x === a; x.setAttribute('aria-selected', sel); x.tabIndex = sel ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !sel; });
    };
    abas.forEach((a, k) => {
      a.addEventListener('click', () => ir(a));
      a.addEventListener('keydown', e => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); const n = abas[(k + d + abas.length) % abas.length]; ir(n); n.focus(); }
      });
    });
  });

  // Galeria da página da máquina
  $$('[data-galeria]').forEach(g => {
    const principal = $('.gp-principal img', g);
    $$('.gp-mini button', g).forEach(b => b.addEventListener('click', () => {
      principal.src = b.dataset.src;
      $$('.gp-mini button', g).forEach(x => x.setAttribute('aria-pressed', x === b));
    }));
  });

  // Filtro do catálogo
  const grade = $('[data-grade]');
  if (grade) {
    const chips = $$('.chips button'), cards = $$('.maq', grade);
    const filtrar = f => {
      cards.forEach(c => c.hidden = !!f && !c.dataset.cats.split(' ').includes(f));
      chips.forEach(b => b.setAttribute('aria-pressed', b.dataset.f === f));
    };
    chips.forEach(b => b.addEventListener('click', () => { filtrar(b.dataset.f); history.replaceState(null, '', b.dataset.f ? '#' + b.dataset.f : location.pathname); }));
    const h = decodeURIComponent(location.hash.slice(1));
    if (h && chips.some(b => b.dataset.f === h)) { filtrar(h); $('#catalogo').scrollIntoView(); }
  }

  // Formulário de contato: monta a mensagem e abre o WhatsApp da fábrica
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [...new FormData(f)].map(([k, v]) => `${k}: ${String(v).trim()}`);
    open('https://wa.me/554133823100?text=' + encodeURIComponent('Contato pelo site\n' + linhas.join('\n')), '_blank', 'noopener');
  }));
})();
