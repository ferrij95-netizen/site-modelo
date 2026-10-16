// Pantanal Beef: menu, submenus, catálogo com filtro e busca, galeria do produto e formulários da prévia.
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const bt = $('[data-menu]');
  if (bt) bt.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    bt.setAttribute('aria-expanded', aberto);
  });
  $$('.abre-sub').forEach(b => b.addEventListener('click', () => {
    const sub = b.nextElementSibling;
    const aberto = sub.classList.toggle('aberto');
    b.setAttribute('aria-expanded', aberto);
  }));

  // Catálogo: linha, conservação e busca combinadas; a linha também vem do endereço (#linha-grill).
  const cat = $('[data-catalogo]');
  if (cat) {
    const estado = { linha: '', cons: '', q: '' };
    const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
    const aplicar = () => {
      let n = 0;
      $$('.grupo', cat).forEach(g => {
        let vis = 0;
        $$('.item', g).forEach(it => {
          const ok = (!estado.linha || it.dataset.linha === estado.linha)
            && (!estado.cons || it.dataset.cons === estado.cons)
            && (!estado.q || it.dataset.busca.includes(estado.q));
          it.hidden = !ok; if (ok) vis++;
        });
        g.hidden = !vis; n += vis;
      });
      $('[data-resultado]').textContent = n === 1 ? '1 item' : `${n} itens`;
      $('[data-vazio]').hidden = n > 0;
      $$('[data-linha]').forEach(c => c.tagName === 'BUTTON' && c.classList.toggle('on', c.dataset.linha === estado.linha));
      $$('[data-cons]').forEach(c => c.tagName === 'BUTTON' && c.classList.toggle('on', c.dataset.cons === estado.cons));
    };
    $$('button[data-linha]').forEach(c => c.addEventListener('click', () => {
      estado.linha = c.dataset.linha; aplicar();
      history.replaceState(null, '', estado.linha ? '#linha-' + estado.linha : location.pathname);
      cat.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    $$('button[data-cons]').forEach(c => c.addEventListener('click', () => { estado.cons = c.dataset.cons; aplicar(); }));
    const busca = $('[data-busca]');
    busca.addEventListener('input', () => { estado.q = norm(busca.value); aplicar(); });
    const daUrl = () => {
      const m = location.hash.match(/^#linha-(\w+)/);
      if (m && $('button[data-linha="' + m[1] + '"]')) { estado.linha = m[1]; aplicar(); }
    };
    daUrl();
    window.addEventListener('hashchange', daUrl);
  }

  // Galeria do produto: embalada / peça / no corte.
  $$('[data-galeria]').forEach(g => {
    const figs = $$('.galeria-palco figure', g);
    $$('.galeria-tabs button', g).forEach((b, k, todos) => b.addEventListener('click', () => {
      figs.forEach((f, j) => f.hidden = j !== k);
      todos.forEach((x, j) => { x.classList.toggle('on', j === k); x.setAttribute('aria-selected', j === k); });
    }));
  });

  // Formulários da prévia: assunto e produto pela URL e aviso ao enviar (ainda sem envio real).
  $$('[data-form]').forEach(f => {
    const q = new URLSearchParams(location.search);
    const sel = $('select[name=assunto]', f);
    if (q.get('assunto') && sel) [...sel.options].forEach(o => { if (o.value === q.get('assunto')) o.selected = true; });
    const msg = $('[data-produto]', f);
    if (q.get('produto') && msg) msg.value = q.get('produto') + '\nQuantidade e cidade de entrega: ';
    f.addEventListener('submit', e => { e.preventDefault(); $('.aviso', f).hidden = false; });
  });
})();
