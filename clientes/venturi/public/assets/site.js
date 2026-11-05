// Menu do celular, busca da capa, filtros das listas, abas Comprar/Alugar, formulários pelo WhatsApp, simulador e zoom da galeria.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// busca: Comprar ou Alugar decide a página de destino
document.querySelectorAll('form[data-busca]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f), dest = f.action.replace(/comprar\/?$/, d.get('pretensao') === 'alugar' ? 'alugar/' : 'comprar/');
  const p = new URLSearchParams();
  for (const k of ['tipo', 'q', 'cod']) if (d.get(k)) p.set(k, d.get(k));
  location.href = dest + (p.toString() ? `?${p}` : '');
}));

// filtros das listas (tipo, bairro, texto, ordem), lidos também da URL
const filtros = document.querySelector('form[data-filtros]');
if (filtros) {
  const lista = document.querySelector('[data-lista]'), itens = [...lista.children], n = document.querySelector('[data-n]'), vazio = document.querySelector('[data-vazio]');
  const chips = [...filtros.querySelectorAll('.chip')];
  const sem = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const url = new URLSearchParams(location.search);
  let tipo = url.get('tipo') || '';
  if (url.get('bairro')) filtros.bairro.value = url.get('bairro');
  if (url.get('q') || url.get('cod')) filtros.q.value = url.get('cod') || url.get('q');
  const aplicar = () => {
    chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.tipo === tipo)));
    const b = filtros.bairro.value, q = sem(filtros.q.value).trim();
    let vis = 0;
    itens.forEach(li => {
      const ok = (!tipo || li.dataset.tipo === tipo) && (!b || li.dataset.bairro === b) && (!q || sem(li.dataset.busca).includes(q));
      li.hidden = !ok; if (ok) vis++;
    });
    const o = filtros.ordem.value;
    const ord = [...itens].sort((x, y) => o === 'menor' ? x.dataset.preco - y.dataset.preco : o === 'maior' ? y.dataset.preco - x.dataset.preco : itens.indexOf(x) - itens.indexOf(y));
    ord.forEach(li => lista.appendChild(li));
    n.textContent = vis; vazio.hidden = vis > 0;
  };
  if (!chips.some(c => c.dataset.tipo === tipo)) tipo = '';
  chips.forEach(c => c.addEventListener('click', () => { tipo = c.dataset.tipo; aplicar(); }));
  filtros.addEventListener('input', aplicar);
  filtros.addEventListener('submit', e => e.preventDefault());
  aplicar();
}

// abas, com setas do teclado
document.querySelectorAll('[data-abas]').forEach(box => {
  const bts = [...box.querySelectorAll('[role=tab]')];
  const abrir = b => bts.forEach(o => { const on = o === b; o.setAttribute('aria-selected', String(on)); o.tabIndex = on ? 0 : -1; document.getElementById(o.getAttribute('aria-controls')).hidden = !on; });
  bts.forEach((b, i) => {
    b.addEventListener('click', () => abrir(b));
    b.addEventListener('keydown', e => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { const x = bts[(i + d + bts.length) % bts.length]; abrir(x); x.focus(); } });
  });
});

// formulários: montam a mensagem e abrem o WhatsApp da Venturi
document.querySelectorAll('form[data-zap]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [`*${f.dataset.titulo}* (site Venturi)`];
  for (const [k, v] of new FormData(f)) if (String(v).trim() && v !== '-') linhas.push(`${k}: ${v}`);
  window.open(`https://wa.me/${f.dataset.zap}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
}));

// simulador SAC
const sim = document.querySelector('form[data-simul]');
if (sim) {
  const num = s => Number(String(s).replace(/\./g, '').replace(',', '.')) || 0;
  const brl = x => x.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const calc = () => {
    const fin = Math.max(num(sim.valor.value) - num(sim.entrada.value), 0), n = +sim.prazo.value, i = Math.pow(1 + num(sim.juros.value) / 100, 1 / 12) - 1, amort = fin / n;
    sim.querySelector('[data-fin]').textContent = brl(fin);
    sim.querySelector('[data-par]').textContent = brl(amort + fin * i);
    sim.querySelector('[data-ult]').textContent = brl(amort + amort * i);
  };
  sim.addEventListener('input', calc); sim.addEventListener('submit', e => e.preventDefault()); calc();
}

// galeria: clique abre a foto grande
document.querySelectorAll('[data-galeria] img').forEach(img => img.addEventListener('click', () => {
  const z = document.createElement('div'); z.className = 'zoom'; z.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
  z.addEventListener('click', () => z.remove()); document.addEventListener('keydown', function f(e) { if (e.key === 'Escape') { z.remove(); document.removeEventListener('keydown', f); } });
  document.body.appendChild(z);
}));
