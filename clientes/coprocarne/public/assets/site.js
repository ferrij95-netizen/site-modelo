// Menu do celular, fotos do banner (A), busca nas tabelas (A), catálogo com lista de pedido (B), formulário e entradas suaves.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;
const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// fotos do banner (eram o Flash do topo do site atual): trocam sozinhas, com pontos para escolher
document.querySelectorAll('[data-slides]').forEach(h => {
  const sl = [...h.querySelectorAll('.slide')], pts = [...h.querySelectorAll('[data-ir]')];
  let i = 0, t;
  const ir = n => { sl[i].classList.remove('on'); pts[i]?.removeAttribute('aria-current'); i = (n + sl.length) % sl.length; sl[i].classList.add('on'); pts[i]?.setAttribute('aria-current', 'true'); };
  const roda = () => { clearInterval(t); if (!parado) t = setInterval(() => ir(i + 1), 6000); };
  pts.forEach(p => p.addEventListener('click', () => { ir(Number(p.dataset.ir)); roda(); }));
  roda();
});

// busca nas tabelas de produtos (A)
document.querySelectorAll('[data-tabela]').forEach(t => {
  const inp = t.querySelector('[data-busca]'), linhas = [...t.querySelectorAll('tbody tr')], vazio = t.querySelector('.tab-vazio');
  inp.addEventListener('input', () => {
    const q = semAcento(inp.value.trim()); let n = 0;
    linhas.forEach(r => { const ok = !q || semAcento(r.textContent).includes(q); r.hidden = !ok; n += ok; });
    vazio.hidden = n > 0;
  });
});

// catálogo com filtro, busca e lista de pedido (B)
document.querySelectorAll('[data-catalogo]').forEach(c => {
  const itens = [...c.querySelectorAll('.cat-lista li')], chips = [...c.querySelectorAll('[data-cat-linha]')];
  const busca = c.querySelector('[data-cat-busca]'), vazio = c.querySelector('.cat-vazio');
  const ped = c.querySelector('[data-pedido]'), lista = ped.querySelector('[data-pedido-lista]'), num = ped.querySelector('[data-pedido-n]');
  let linha = c.dataset.filtroIni || '';
  const q0 = new URLSearchParams(location.search).get('q');
  if (q0) { busca.value = q0; linha = ''; chips.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.catLinha === ''))); }
  const filtra = () => {
    const q = semAcento(busca.value.trim()); let n = 0;
    itens.forEach(li => {
      const ok = (!linha || li.dataset.linha === linha) && (!q || semAcento(li.textContent).includes(q) || li.querySelector('.cl-c').textContent === q);
      li.hidden = !ok; n += ok;
    });
    vazio.hidden = n > 0;
  };
  chips.forEach(b => b.addEventListener('click', () => { linha = b.dataset.catLinha; chips.forEach(o => o.setAttribute('aria-pressed', String(o === b))); filtra(); }));
  busca.addEventListener('input', filtra);
  filtra();

  const marcados = () => [...c.querySelectorAll('[data-item]:checked')].map(i => i.dataset.item);
  const texto = () => `Pedido para a Coprocarne\n\n${marcados().map((m, k) => `${k + 1}. ${m} - quantidade: `).join('\n')}\n\nEmpresa:\nTelefone:\n`;
  const atualiza = () => {
    const m = marcados();
    num.textContent = m.length; ped.classList.toggle('tem', m.length > 0);
    lista.innerHTML = m.map(x => `<li>${x.replace(/</g, '&lt;')}</li>`).join('');
    const a = ped.querySelector('[data-pedido-mail]');
    a.href = `mailto:gabriel@coprocarne.com.br?subject=${encodeURIComponent('Pedido pelo site')}&body=${encodeURIComponent(texto())}`;
  };
  c.addEventListener('change', e => { if (e.target.matches('[data-item]')) atualiza(); });
  ped.querySelector('[data-pedido-copiar]').addEventListener('click', async e => {
    try { await navigator.clipboard.writeText(texto()); e.currentTarget.lastChild.textContent = ' Lista copiada'; } catch { /* sem permissão: segue o e-mail */ }
  });
  ped.querySelector('[data-pedido-limpar]').addEventListener('click', () => { c.querySelectorAll('[data-item]:checked').forEach(i => { i.checked = false; }); atualiza(); });
  atualiza();
});

// formulário: na prévia não envia, só confirma
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));

// entradas suaves ao rolar
if (!parado && 'IntersectionObserver' in window) {
  const alvo = document.querySelectorAll('main section h2, .painel, .linha-a, .linha-b, .rota-passos li, .lt li, .etapas-a-lista li, .garantias-in > div, .fatos-in > div, .fbn-in > div, .ft, .vitrine-lista li, .lbt-fotos li');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  alvo.forEach((el, k) => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('rv'); el.style.transitionDelay = `${(k % 4) * 70}ms`; io.observe(el); } });
}
