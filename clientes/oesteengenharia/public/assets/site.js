// Menu, topo que encolhe ao rolar, fotos da abertura (A), áreas com foto que troca (A), faixa de clientes (A),
// filtro da caderneta (B), ampliação das fotos e formulário que monta o e-mail para a Oeste.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });
const marcaRolou = () => document.body.classList.toggle('rolou', scrollY > 40);
marcaRolou(); addEventListener('scroll', marcaRolou, { passive: true });
const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;

// fotos das seis áreas na abertura, como o slider do site atual
document.querySelectorAll('[data-slider]').forEach(s => {
  const figs = [...s.querySelectorAll('figure')], pts = [...s.querySelectorAll('.hero-pontos button')];
  let i = 0, timer;
  const vai = n => { i = (n + figs.length) % figs.length; figs.forEach((f, k) => f.hidden = k !== i); pts.forEach((p, k) => p.setAttribute('aria-selected', String(k === i))); };
  const auto = () => { clearInterval(timer); if (!parado) timer = setInterval(() => vai(i + 1), 6000); };
  pts.forEach((p, k) => p.addEventListener('click', () => { vai(k); auto(); }));
  auto();
});

// áreas: passar o mouse (ou o foco) no nome troca a foto
document.querySelectorAll('[data-troca]').forEach(box => {
  const links = [...box.querySelectorAll('.troca-lista a')], figs = [...box.querySelectorAll('.troca-midia figure')];
  const vai = i => { links.forEach((l, k) => l.classList.toggle('ativo', k === i)); figs.forEach((f, k) => f.hidden = k !== i); };
  links.forEach((l, i) => { l.addEventListener('mouseenter', () => vai(i)); l.addEventListener('focus', () => vai(i)); });
});

// faixa de clientes: duplica a fila para correr sem emenda
document.querySelectorAll('.corre').forEach(c => { c.insertAdjacentHTML('beforeend', c.innerHTML.replace(/<span>/g, '<span aria-hidden="true">')); });

// caderneta: filtro por área
document.querySelectorAll('.filtros').forEach(f => {
  const tab = f.nextElementSibling.querySelector('[data-filtrar]'), bts = [...f.querySelectorAll('button')];
  bts.forEach(b => b.addEventListener('click', () => {
    bts.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    let n = 0;
    tab.querySelectorAll('tbody tr').forEach(tr => { const ok = !b.dataset.f || tr.dataset.a === b.dataset.f; tr.hidden = !ok; if (ok) tr.querySelector('.n').textContent = String(++n).padStart(3, '0'); });
  }));
});

// ampliação das fotos da galeria
document.querySelectorAll('[data-galeria] a').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const d = document.createElement('div');
  d.className = 'amplia'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
  d.innerHTML = `<img src="${a.getAttribute('href')}" alt="${a.querySelector('img').alt}"><button type="button" aria-label="Fechar"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`;
  const fecha = () => { d.remove(); removeEventListener('keydown', esc); a.focus(); };
  const esc = ev => { if (ev.key === 'Escape') fecha(); };
  d.addEventListener('click', ev => { if (ev.target !== d.querySelector('img')) fecha(); });
  addEventListener('keydown', esc);
  document.body.append(d); d.querySelector('button').focus();
}));

// formulário: monta o e-mail com os campos do "Fale Conosco" do site atual
document.querySelectorAll('[data-contato]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  const corpo = [`Nome: ${d.nome}`, `E-mail: ${d.email}`, d.telefone && `Telefone: ${d.telefone}`, d.endereco && `Endereço: ${d.endereco}`, d.cidade && `Cidade: ${d.cidade}`, d.area && `Área de interesse: ${d.area}`].filter(Boolean).join('\n') + `\n\n${d.mensagem}`;
  location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(`Contato pelo site${d.area ? ` · ${d.area}` : ''}`)}&body=${encodeURIComponent(corpo)}`;
}));
