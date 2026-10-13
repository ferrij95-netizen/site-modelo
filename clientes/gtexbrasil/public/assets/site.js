// Menu do celular, submenus, trilhos com setas, carrossel, troca de embalagem, filtro do catálogo e busca nas FDS.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const sem = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

  // Topo: sombra ao rolar e menu do celular.
  const topo = $('[data-topo]');
  const rolar = () => topo && topo.classList.toggle('rolou', scrollY > 10);
  addEventListener('scroll', rolar, { passive: true }); rolar();
  const bt = $('[data-menu]');
  bt && bt.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    bt.setAttribute('aria-expanded', aberto);
  });
  // Submenus: no celular abrem com toque.
  $$('.tem-sub > button, .tem-sub.mega > a').forEach(a => a.addEventListener('click', e => {
    if (matchMedia('(max-width: 1080px)').matches) {
      if (a.tagName === 'A' && a.parentElement.classList.contains('aberto')) return;
      e.preventDefault(); a.parentElement.classList.toggle('aberto');
    }
  }));

  // Trilhos de cartões: setas no computador.
  $$('[data-trilho]').forEach(t => {
    const caixa = document.createElement('div'); caixa.className = 'trilho-setas';
    caixa.innerHTML = '<button type="button" aria-label="Anteriores">‹</button><button type="button" aria-label="Próximos">›</button>';
    t.after(caixa);
    const [ant, prox] = caixa.children;
    const passo = () => t.clientWidth * 0.85;
    ant.onclick = () => t.scrollBy({ left: -passo(), behavior: 'smooth' });
    prox.onclick = () => t.scrollBy({ left: passo(), behavior: 'smooth' });
    const at = () => { ant.disabled = t.scrollLeft < 8; prox.disabled = t.scrollLeft + t.clientWidth > t.scrollWidth - 8; caixa.hidden = t.scrollWidth <= t.clientWidth + 8; };
    t.addEventListener('scroll', at, { passive: true }); addEventListener('resize', at); at();
  });

  // Carrossel de destaques (versão B).
  $$('[data-carrossel]').forEach(c => {
    const tr = $('.car-trilho', c), pts = $$('.car-pontos button', c);
    let i = 0, tempo;
    const ir = n => { i = (n + pts.length) % pts.length; tr.scrollTo({ left: tr.children[i].offsetLeft - tr.offsetLeft, behavior: 'smooth' }); pts.forEach((p, k) => p.setAttribute('aria-current', k === i)); };
    pts.forEach((p, k) => p.onclick = () => { ir(k); clearInterval(tempo); });
    tr.addEventListener('scroll', () => { const k = Math.round(tr.scrollLeft / tr.clientWidth); if (k !== i) { i = k; pts.forEach((p, j) => p.setAttribute('aria-current', j === i)); } }, { passive: true });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) tempo = setInterval(() => ir(i + 1), 6000);
    c.addEventListener('pointerdown', () => clearInterval(tempo));
  });

  // Produto: troca a foto pela embalagem escolhida.
  $$('[data-produto]').forEach(p => {
    const fotos = $$('.pd-foto img', p), bts = $$('button[data-emb]', p);
    bts.forEach(b => b.addEventListener('click', () => {
      const n = b.dataset.emb;
      fotos.forEach(f => f.hidden = f.dataset.emb !== n);
      bts.forEach(x => x.setAttribute('aria-pressed', x.dataset.emb === n));
    }));
  });
  // Formulário de empresa: traz o produto da página de onde veio.
  const campo = $('[data-produto-campo]');
  const veio = new URLSearchParams(location.search).get('produto');
  if (campo && veio) campo.value = veio;

  // Catálogo: filtros por marca, categoria, tipo e busca; o estado fica no endereço (#marca=urca&tipo=...).
  const cat = $('[data-catalogo]');
  if (cat) {
    const cartoes = $$('.grade .pc', cat), busca = $('[data-busca]', cat), n = $('[data-n]', cat), vazio = $('[data-vazio]', cat);
    const est = { marca: '', cat: '', tipo: '', q: '' };
    const ler = () => {
      const h = new URLSearchParams(location.hash.slice(1));
      const q = new URLSearchParams(location.search).get('q');
      for (const k of ['marca', 'cat', 'tipo']) est[k] = h.get(k) || '';
      est.q = h.get('q') || q || '';
    };
    const aplicar = () => {
      const q = sem(est.q);
      let vis = 0;
      cartoes.forEach(c => {
        const ok = (!est.marca || c.dataset.marca === est.marca) && (!est.cat || c.dataset.cat === est.cat) && (!est.tipo || c.dataset.tipo === est.tipo) && (!q || q.split(/\s+/).every(p => c.dataset.busca.includes(p)));
        c.hidden = !ok; if (ok) vis++;
      });
      n.textContent = vis; vazio.hidden = vis > 0;
      $$('[data-filtro]', cat).forEach(f => $$('.chip', f).forEach(ch => ch.setAttribute('aria-pressed', ch.dataset.v === est[f.dataset.filtro])));
      if (busca.value !== est.q) busca.value = est.q;
      $$('[data-limpar]', cat).forEach(b => { if (b.classList.contains('limpar')) b.hidden = !(est.marca || est.cat || est.tipo || est.q); });
    };
    const gravar = () => {
      const h = new URLSearchParams();
      for (const k of ['marca', 'cat', 'tipo', 'q']) if (est[k]) h.set(k, est[k]);
      history.replaceState(null, '', location.pathname + (h.toString() ? '#' + h : ''));
      aplicar();
    };
    $$('[data-filtro]', cat).forEach(f => f.addEventListener('click', e => {
      const ch = e.target.closest('.chip'); if (!ch) return;
      est[f.dataset.filtro] = ch.dataset.v; gravar();
    }));
    busca.addEventListener('input', () => { est.q = busca.value; gravar(); });
    $$('[data-limpar]', cat).forEach(b => b.addEventListener('click', () => { est.marca = est.cat = est.tipo = est.q = ''; gravar(); }));
    addEventListener('hashchange', () => { ler(); aplicar(); });
    ler(); aplicar();
  }

  // FDS: busca por nome da ficha.
  const bd = $('[data-busca-doc]');
  bd && bd.addEventListener('input', () => {
    const q = sem(bd.value);
    $$('.doc-grupo').forEach(g => {
      let vis = 0;
      $$('li', g).forEach(li => { const ok = !q || sem(li.textContent).includes(q); li.hidden = !ok; if (ok) vis++; });
      g.hidden = !vis; if (q) g.open = true;
    });
  });
})();
