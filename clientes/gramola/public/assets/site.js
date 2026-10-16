// Menu do celular, submenu, trilho de novidades e filtro do catálogo (busca, linha, grupo, novidades).
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const sem = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

  const topo = $('[data-topo]');
  const rolar = () => topo && topo.classList.toggle('rolou', scrollY > 10);
  addEventListener('scroll', rolar, { passive: true }); rolar();
  const bt = $('[data-menu]');
  bt && bt.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    bt.setAttribute('aria-expanded', aberto);
  });
  $$('.tem-sub > a').forEach(a => a.addEventListener('click', e => {
    if (matchMedia('(max-width: 1020px)').matches && !a.parentElement.classList.contains('aberto')) { e.preventDefault(); a.parentElement.classList.add('aberto'); }
  }));

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

  // Catálogo: o estado fica no endereço (?q=...&linha=...&novos=1)
  const f = $('[data-filtro]');
  if (f) {
    const cartoes = $$('[data-grade] .pc'), q = $('[data-q]', f), novos = $('[data-novos]', f), cont = $('[data-cont]', f), vazio = $('[data-vazio]');
    const u = new URLSearchParams(location.search);
    const est = { q: u.get('q') || '', linha: u.get('linha') || '', grupo: u.get('grupo') || '', novos: u.get('novos') === '1' };
    q.value = est.q; novos.checked = est.novos;
    const chips = $$('.chip', f);
    const marcar = () => chips.forEach(c => c.classList.toggle('on', ('linha' in c.dataset ? c.dataset.linha === est.linha : c.dataset.grupo === est.grupo)));
    const aplicar = () => {
      const termos = sem(est.q).split(/\s+/).filter(Boolean).map(t => t.replace(/[.\-]/g, ''));
      let vis = 0;
      cartoes.forEach(c => {
        const b = c.dataset.busca.replace(/[.\-]/g, '');
        const ok = (!est.linha || c.dataset.linha === est.linha) && (!est.grupo || c.dataset.grupo === est.grupo) && (!est.novos || c.dataset.novo === '1') && termos.every(t => b.includes(t));
        c.hidden = !ok; if (ok) vis++;
      });
      cont.textContent = `${vis} ${vis === 1 ? 'peça' : 'peças'}`;
      if (vazio) vazio.hidden = vis > 0;
      marcar();
      const nu = new URLSearchParams();
      for (const [k, val] of Object.entries(est)) if (val) nu.set(k, val === true ? '1' : val);
      history.replaceState(null, '', location.pathname + (nu.toString() ? '?' + nu : ''));
    };
    let tm;
    q.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { est.q = q.value; aplicar(); }, 120); });
    novos.addEventListener('change', () => { est.novos = novos.checked; aplicar(); });
    chips.forEach(c => c.addEventListener('click', () => {
      if ('linha' in c.dataset) est.linha = c.dataset.linha; else est.grupo = c.dataset.grupo;
      aplicar();
    }));
    aplicar();
  }

  // Formulário: monta o e-mail para o comercial (no preview não há servidor de envio).
  $$('[data-form]').forEach(fm => fm.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(fm);
    const corpo = [...d.entries()].map(([k, v]) => `${k}: ${v}`).join('\n');
    location.href = `${fm.getAttribute('action')}?subject=${encodeURIComponent(d.get('assunto') + ' - ' + d.get('nome'))}&body=${encodeURIComponent(corpo)}`;
  }));
})();
