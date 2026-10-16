// AB · menu, slides, abas, catálogo filtrável e lista de orçamento (salva neste navegador, enviada por WhatsApp)
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  let T = {};
  try { T = JSON.parse($('#ab-i18n').textContent); } catch (e) {}

  // menu
  const nav = $('#nav'), mb = $('[data-menu]');
  if (mb && nav) mb.addEventListener('click', () => { const a = nav.classList.toggle('aberto'); mb.setAttribute('aria-expanded', a); document.body.style.overflow = a ? 'hidden' : ''; });
  const movel = () => matchMedia('(max-width: 1180px)').matches;
  $$('[data-drop]').forEach(a => a.addEventListener('click', e => { if (!movel()) return; const d = a.parentElement; if (!d.classList.contains('aberto')) { e.preventDefault(); $$('.drop.aberto').forEach(x => x !== d && x.classList.remove('aberto')); d.classList.add('aberto'); } }));

  // slides da capa
  const sl = $('[data-slider]');
  if (sl) {
    const ss = $$('[data-slide]', sl), ds = $$('[data-dot]', sl);
    let i = 0, tm;
    const vai = n => { i = (n + ss.length) % ss.length; ss.forEach((s, k) => { s.classList.toggle('ativo', k === i); s.toggleAttribute('aria-hidden', k !== i); }); ds.forEach((d, k) => d.toggleAttribute('aria-current', k === i)); };
    const auto = () => { clearInterval(tm); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) tm = setInterval(() => vai(i + 1), 6500); };
    ds.forEach((d, k) => d.addEventListener('click', () => { vai(k); auto(); }));
    sl.addEventListener('mouseenter', () => clearInterval(tm)); sl.addEventListener('mouseleave', auto);
    auto();
  }

  // abas
  $$('[data-abas]').forEach(ab => {
    const bs = $$(':scope > .abas-l [data-aba]', ab), ps = $$(':scope > [data-painel]', ab);
    bs.forEach(b => b.addEventListener('click', () => { bs.forEach(x => x.setAttribute('aria-selected', x === b)); ps.forEach(p => { p.hidden = p.dataset.painel !== b.dataset.aba; }); }));
  });

  // busca rápida
  $$('[data-busca]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); const q = f.q.value.trim(); location.href = f.getAttribute('action') + (q ? '#q=' + encodeURIComponent(q) : ''); }));

  // lista de orçamento
  const CH = 'ab-orcamento';
  const ler = () => { try { return JSON.parse(localStorage.getItem(CH)) || []; } catch (e) { return []; } };
  const gravar = l => { try { localStorage.setItem(CH, JSON.stringify(l)); } catch (e) {} badge(); };
  const badge = () => { const n = ler().length; $$('[data-orc-n]').forEach(b => { b.textContent = n; b.hidden = !n; }); marcar(); };
  const marcar = () => { const ss = new Set(ler().map(x => x.s)); $$('[data-add]').forEach(b => { let d; try { d = JSON.parse(b.dataset.add); } catch (e) { return; } b.classList.toggle('no', ss.has(d.s)); const sp = b.querySelector('span'); if (sp) sp.textContent = ss.has(d.s) ? T.ok : T.add; }); };
  const toast = msg => { const t = $('[data-toast]'); if (!t) return; t.innerHTML = msg; t.classList.add('ver'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('ver'), 3200); };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    let d; try { d = JSON.parse(b.dataset.add); } catch (er) { return; }
    const l = ler(); const k = l.findIndex(x => x.s === d.s);
    if (k >= 0) l.splice(k, 1); else { l.push({ ...d, q: '' }); toast(`<b>${d.n}</b> ${T.addMsg} <a href="${T.base}orcamento/">→</a>`); }
    gravar(l); if (lista) render();
  });
  const lista = $('[data-orc-lista]');
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function render() {
    const l = ler();
    if (!l.length) { lista.innerHTML = `<p class="cat-vazio">${esc(T.vazio)}</p>`; return; }
    lista.innerHTML = l.map((x, i) => `<div class="orc-item"><img src="/assets/img/${esc(x.f)}.webp" alt=""><div><b>${esc(x.n)}</b><small>${esc(x.c)} · ${T.ref} ${esc(x.r)}</small></div><label><span class="sr">${esc(T.qtd)}</span><input type="number" min="0" step="1000" inputmode="numeric" placeholder="${esc(T.qtd)}" value="${esc(x.q)}" data-q-i="${i}"></label><button type="button" data-rm="${i}" aria-label="${esc(T.remover)}">✕</button></div>`).join('');
  }
  if (lista) {
    render();
    lista.addEventListener('input', e => { const i = e.target.dataset.qI; if (i == null) return; const l = ler(); l[i].q = e.target.value; try { localStorage.setItem(CH, JSON.stringify(l)); } catch (er) {} });
    lista.addEventListener('click', e => { const i = e.target.closest('[data-rm]')?.dataset.rm; if (i == null) return; const l = ler(); l.splice(i, 1); gravar(l); render(); });
  }
  const fo = $('[data-orc-form]');
  if (fo) fo.addEventListener('submit', e => {
    e.preventDefault(); const l = ler(); if (!l.length) { toast(esc(T.vazio)); return; }
    const f = new FormData(fo);
    const txt = T.msgP + '\n' + l.map(x => `• ${x.n} (${x.c}, ${T.ref} ${x.r})${x.q ? ' · ' + x.q + ' ' + T.qtd : ''}`).join('\n') + `\n\n${f.get('nome')} · ${f.get('empresa')}${f.get('cidade') ? ' · ' + f.get('cidade') : ''}${f.get('obs') ? '\n' + f.get('obs') : ''}`;
    window.open(`https://wa.me/${T.whats}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  });
  $$('[data-form-wa]').forEach(fm => fm.addEventListener('submit', e => {
    e.preventDefault(); const f = new FormData(fm);
    const txt = [`${f.get('nome')} · ${f.get('empresa')}`, f.get('email'), f.get('telefone'), f.get('cidade'), f.get('mercado')].filter(Boolean).join('\n') + (f.get('mensagem') ? '\n\n' + f.get('mensagem') : '');
    window.open(`https://wa.me/${T.whats}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  }));
  badge();

  // filtro rápido da página de coleção
  $$('[data-filtro-mini]').forEach(g => {
    const grid = g.closest('.sec').querySelector('.pc-grid');
    $$('[data-fm]', g).forEach(b => b.addEventListener('click', () => {
      $$('[data-fm]', g).forEach(x => x.setAttribute('aria-pressed', x === b));
      $$('[data-item]', grid).forEach(it => { it.hidden = b.dataset.fm !== '*' && it.dataset.tipo !== b.dataset.fm; });
    }));
  });

  // catálogo
  const cat = $('[data-catalogo]');
  if (cat) {
    const form = $('[data-form-filtros]', cat), q = $('[data-q]', cat), conta = $('[data-conta]', cat), chips = $('[data-chips]', cat), vazio = $('[data-vazio]', cat);
    const itens = $$('[data-item]', cat), aside = $('[data-filtros]', cat), nf = $('[data-nfiltros]', cat);
    const CH = ['tipo', 'vol', 'res', 'garg', 'col', 'merc'];
    const sel = () => Object.fromEntries(CH.map(k => [k, $$(`input[name="${k}"]:checked`, form).map(i => i.value)]));
    const lerHash = () => {
      const h = new URLSearchParams(location.hash.slice(1));
      $$('input', form).forEach(i => { i.checked = (h.get(i.name) || '').split(',').includes(i.value); });
      q.value = h.get('q') || '';
    };
    const aplicar = (gravarHash = true) => {
      const s = sel(), termo = q.value.trim().toLowerCase();
      const ok = it => CH.every(k => !s[k].length || s[k].some(v => (k === 'vol' || k === 'garg' || k === 'tipo' ? it.dataset[k] === v : it.dataset[k].split(' ').includes(v)))) && (!termo || termo.split(/\s+/).every(w => it.dataset.q.includes(w)));
      let n = 0;
      itens.forEach(it => { const v = ok(it); it.hidden = !v; if (v && it.tagName !== 'TR') n++; });
      conta.textContent = n; vazio.hidden = n > 0;
      const ativos = CH.flatMap(k => s[k].map(v => [k, v]));
      chips.innerHTML = ativos.map(([k, v]) => { const lb = $(`input[name="${k}"][value="${CSS.escape(v)}"]`, form)?.nextElementSibling?.textContent || v; return `<button type="button" data-chip="${k}|${esc(v)}">${esc(lb)} <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`; }).join('');
      if (nf) nf.textContent = ativos.length ? ` (${ativos.length})` : '';
      if (gravarHash) {
        const h = new URLSearchParams(); CH.forEach(k => s[k].length && h.set(k, s[k].join(','))); if (q.value.trim()) h.set('q', q.value.trim());
        const str = h.toString().replace(/%2C/g, ',');
        history.replaceState(null, '', str ? '#' + str : location.pathname);
      }
    };
    form.addEventListener('change', () => aplicar());
    q.addEventListener('input', () => aplicar());
    chips.addEventListener('click', e => { const c = e.target.closest('[data-chip]'); if (!c) return; const [k, v] = c.dataset.chip.split('|'); const i = $(`input[name="${k}"][value="${CSS.escape(v)}"]`, form); if (i) i.checked = false; aplicar(); });
    $$('[data-limpar]', cat).forEach(b => b.addEventListener('click', () => { form.reset(); q.value = ''; aplicar(); }));
    window.addEventListener('hashchange', () => { lerHash(); aplicar(false); });
    $$('[data-vista]', cat).forEach(b => b.addEventListener('click', () => {
      $$('[data-vista]', cat).forEach(x => x.setAttribute('aria-pressed', x === b));
      $('[data-vista-grade]', cat).hidden = b.dataset.vista !== 'grade'; $('[data-vista-tabela]', cat).hidden = b.dataset.vista !== 'tabela';
      try { localStorage.setItem('ab-vista', b.dataset.vista); } catch (e) {}
    }));
    try { const v = localStorage.getItem('ab-vista'); if (v === 'tabela') $('[data-vista="tabela"]', cat).click(); } catch (e) {}
    const abre = a => { aside.classList.toggle('aberto', a); document.body.style.overflow = a ? 'hidden' : ''; };
    $('[data-filtros-abrir]', cat)?.addEventListener('click', () => abre(true));
    $('[data-filtros-fechar]', cat)?.addEventListener('click', () => abre(false));
    lerHash(); aplicar(false);
  }
})();
