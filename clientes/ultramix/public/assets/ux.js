// Ultramix: catálogo, busca, lista de orçamento (fica no navegador e sai pelo WhatsApp ou e-mail),
// consulta de cidade atendida e menu do celular. Usado pelas versões A e B; cada uma só muda o CSS.
(() => {
  const WHATS = '5516993908784';
  const EMAIL = 'contato@distribuidoraultramix.com.br';
  const CHAVE = 'ultramix-orcamento';
  const POR_PAGINA = 48;
  const V = document.body.dataset.v || 'a';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // ---------- dados ----------
  let dados = null;
  const carregar = () => dados || (dados = fetch('/assets/produtos.json').then(r => r.json()).then(d => {
    d.porSlug = new Map(d.produtos.map(p => [p.slug, p]));
    d.nomeMarca = Object.fromEntries(d.marcas.map(m => [m.slug, m.nome]));
    d.nomeMarca.outras = 'Outras marcas';
    d.nomeCat = Object.fromEntries(d.cats);
    d.produtos.forEach(p => { p.busca = norm(`${p.nome} ${d.nomeMarca[p.marca]} ${d.nomeCat[p.cat]}`); });
    return d;
  }));

  // ---------- lista de orçamento ----------
  const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch { return {}; } };
  let lista = ler();
  const gravar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch {} atualizarContagem(); };
  const totalItens = () => Object.keys(lista).length;
  function atualizarContagem() {
    const n = totalItens();
    $$('[data-orc-n]').forEach(el => { el.textContent = n; el.hidden = !n; });
    $$('.pc[data-slug]').forEach(marcarCard);
    document.dispatchEvent(new CustomEvent('orcamento'));
  }
  function marcarCard(card) {
    const q = lista[card.dataset.slug];
    card.classList.toggle('na-lista', !!q);
    const b = $('[data-add]', card);
    if (b) b.innerHTML = q ? `${ico.ok}<span>Na lista · ${q}</span>` : `${ico.mais}<span>Adicionar</span>`;
  }
  function adicionar(slug, q) {
    q = Math.max(1, Math.min(9999, parseInt(q, 10) || 1));
    lista[slug] = (lista[slug] || 0) + q;
    gravar();
    carregar().then(d => aviso(`${d.porSlug.get(slug)?.nome || 'Produto'} adicionado ao orçamento`));
  }

  // ---------- peças ----------
  const ico = {
    mais: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    menos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>',
    ok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    whats: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.8A8 8 0 1112 20a8 8 0 01-3.9-1z"/><path d="M9 9.5c.3 2 1.8 3.8 4 4.8l1.2-1.2 1.8.8-.4 1.6c-3.6.2-7-3.2-7-6.8l1.6-.4.8 1.8z"/></svg>',
    lupa: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>',
  };
  const spr = p => `<span class="spr" style="--bg:url(/assets/sprites/p${String(p.s).padStart(2, '0')}.webp);--x:${p.i % 5};--y:${Math.floor(p.i / 5)}" role="img" aria-label="${esc(p.nome)}, embalagem"></span>`;
  // "16x29g" vira "16 unidades de 29 g" para o comprador saber o que vem na caixa.
  function embalagem(nome) {
    const m = nome.match(/(\d+)\s?x\s?(\d+(?:[.,]\d+)?)\s?(g|ml|kg)\b/i);
    if (m) return `${m[1]} unidades de ${m[2]} ${m[3].toLowerCase()}`;
    const u = nome.match(/c\/\s?(\d+)\s?(unidades)?/i);
    if (u) return `Com ${u[1]} unidades`;
    const t = nome.match(/(\d+(?:[.,]\d+)?)\s?(g|ml|kg|litros?)\b/i);
    return t ? `${t[1]} ${t[2].toLowerCase()}` : '';
  }
  const qtd = (v = 1) => `<div class="qtd"><button type="button" data-menos aria-label="Diminuir">${ico.menos}</button><input type="text" inputmode="numeric" value="${v}" aria-label="Quantidade"><button type="button" data-mais aria-label="Aumentar">${ico.mais}</button></div>`;
  const card = (p, d) => `<article class="pc" data-slug="${p.slug}">
<button type="button" class="pc-ver" data-ver aria-label="Ver ${esc(p.nome)}">${spr(p)}</button>
<p class="pc-marca">${esc(d.nomeMarca[p.marca])}</p><h3 class="pc-nome">${esc(p.nome)}</h3><p class="pc-emb">${esc(embalagem(p.nome))}</p>
<div class="pc-acao">${qtd()}<button type="button" class="pc-add" data-add></button></div></article>`;

  // ---------- aviso ----------
  let avisoEl, avisoT;
  function aviso(txt) {
    if (!avisoEl) {
      avisoEl = document.createElement('div');
      avisoEl.className = 'aviso';
      avisoEl.setAttribute('role', 'status');
      document.body.append(avisoEl);
    }
    avisoEl.innerHTML = `${ico.ok}<span>${esc(txt)}</span><a href="/${V}/orcamento/">Ver lista (${totalItens()})</a>`;
    avisoEl.classList.add('on');
    clearTimeout(avisoT);
    avisoT = setTimeout(() => avisoEl.classList.remove('on'), 3800);
  }

  // ---------- cliques nos cards (estáticos e gerados) ----------
  document.addEventListener('click', e => {
    const c = e.target.closest('.pc[data-slug], .det');
    if (!c) return;
    const inp = $('.qtd input', c);
    if (e.target.closest('[data-mais]')) inp.value = (parseInt(inp.value, 10) || 0) + 1;
    else if (e.target.closest('[data-menos]')) inp.value = Math.max(1, (parseInt(inp.value, 10) || 1) - 1);
    else if (e.target.closest('[data-add]')) { adicionar(c.dataset.slug, inp.value); inp.value = 1; if (c.matches('.det')) c.close(); }
    else if (e.target.closest('[data-ver]')) detalhe(c.dataset.slug);
  });

  // ---------- detalhe do produto ----------
  let det;
  async function detalhe(slug) {
    const d = await carregar();
    const p = d.porSlug.get(slug);
    if (!p) return;
    if (!det) {
      det = document.createElement('dialog');
      det.className = 'det';
      document.body.append(det);
      det.addEventListener('click', e => { if (e.target === det || e.target.closest('[data-fechar]')) det.close(); });
    }
    const msg = encodeURIComponent(`Olá, Ultramix! Gostaria de saber preço e disponibilidade de: ${p.nome} (${d.nomeMarca[p.marca]}).`);
    det.dataset.slug = slug;
    det.innerHTML = `<div class="det-in"><button type="button" class="det-x" data-fechar aria-label="Fechar">${ico.x}</button>
<div class="det-img">${spr(p)}</div>
<div class="det-txt"><p class="det-marca"><a href="/${V}/marcas/${p.marca === 'outras' ? '' : p.marca + '/'}">${esc(d.nomeMarca[p.marca])}</a> · <a href="/${V}/produtos/?cat=${p.cat}">${esc(d.nomeCat[p.cat])}</a></p>
<h2>${esc(p.nome)}</h2>${embalagem(p.nome) ? `<p class="det-emb">${esc(embalagem(p.nome))}</p>` : ''}
<p class="det-para">A Ultramix distribui ${esc(p.nome)} para supermercados, mercados, conveniências, padarias, bares, lanchonetes, restaurantes, cozinhas industriais e bufês, em toda a região de Ribeirão Preto.</p>
<div class="det-acao">${qtd()}<button type="button" class="btn btn-cor" data-add>${ico.mais}<span>Adicionar ao orçamento</span></button></div>
<a class="det-whats" href="https://api.whatsapp.com/send?phone=${WHATS}&text=${msg}" target="_blank" rel="noopener">${ico.whats} Perguntar preço pelo WhatsApp</a></div></div>`;
    det.showModal();
    history.replaceState(null, '', `#p=${slug}`);
    det.addEventListener('close', () => history.replaceState(null, '', location.pathname + location.search), { once: true });
  }
  if (location.hash.startsWith('#p=')) detalhe(decodeURIComponent(location.hash.slice(3)));

  // ---------- catálogo ----------
  const cat = $('[data-catalogo]');
  if (cat) carregar().then(d => {
    const form = $('[data-filtros]', cat);
    const grade = $('[data-grade]', cat);
    const total = $$('[data-total]', cat);
    const vazio = $('[data-vazio]', cat);
    const sentinela = $('[data-mais-itens]', cat);
    const busca = $('input[name=q]', cat);
    const ps = new URLSearchParams(location.search);
    const fixo = cat.dataset.marca || '';
    if (busca) busca.value = ps.get('q') || '';
    for (const k of ['cat', 'marca']) { const r = form && $(`input[name=${k}][value="${ps.get(k) || ''}"]`, form); if (r) r.checked = true; }
    let res = [], mostrados = 0;
    const contagens = () => {
      // Quantos itens cada filtro teria com a busca atual: ajuda o comprador a não cair em lista vazia.
      if (!form) return;
      const q = norm(busca?.value || '').split(/\s+/).filter(Boolean);
      const base = d.produtos.filter(p => q.every(t => p.busca.includes(t)));
      const fm = form.marca?.value || fixo, fc = form.cat?.value || '';
      $$('[data-n-cat]', form).forEach(el => { const v = el.dataset.nCat; el.textContent = base.filter(p => (!v || p.cat === v) && (!fm || p.marca === fm)).length; });
      $$('[data-n-marca]', form).forEach(el => { const v = el.dataset.nMarca; el.textContent = base.filter(p => (!v || p.marca === v) && (!fc || p.cat === fc)).length; });
    };
    function filtrar(pushUrl) {
      const q = norm(busca?.value || '').split(/\s+/).filter(Boolean);
      const fc = form?.cat?.value || '';
      const fm = form?.marca?.value || fixo;
      const ord = form?.ordem?.value || '';
      res = d.produtos.filter(p => (!fc || p.cat === fc) && (!fm || p.marca === fm) && q.every(t => p.busca.includes(t)));
      if (ord === 'az') res = [...res].sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));
      grade.innerHTML = '';
      mostrados = 0;
      mais();
      total.forEach(el => { el.textContent = res.length; });
      if (vazio) vazio.hidden = res.length > 0;
      contagens();
      $$('[data-limpar]', cat).forEach(b => { b.hidden = !(q.length || fc || (fm && !fixo)); });
      const t = $('[data-titulo-filtro]', cat);
      if (t) t.textContent = fm && !fixo ? d.nomeMarca[fm] : fc ? d.nomeCat[fc] : q.length ? `Busca: “${busca.value.trim()}”` : 'Todos os produtos';
      if (pushUrl) {
        const u = new URLSearchParams();
        if (busca?.value.trim()) u.set('q', busca.value.trim());
        if (fc) u.set('cat', fc);
        if (fm && !fixo) u.set('marca', fm);
        history.replaceState(null, '', location.pathname + (u.size ? `?${u}` : ''));
      }
    }
    function mais() {
      const fatia = res.slice(mostrados, mostrados + POR_PAGINA);
      grade.insertAdjacentHTML('beforeend', fatia.map(p => card(p, d)).join(''));
      mostrados += fatia.length;
      $$('.pc[data-slug]', grade).forEach(marcarCard);
      if (sentinela) sentinela.hidden = mostrados >= res.length;
    }
    if (sentinela) {
      new IntersectionObserver(es => { if (es[0].isIntersecting && mostrados < res.length) mais(); }, { rootMargin: '600px' }).observe(sentinela);
      sentinela.addEventListener('click', mais);
    }
    let t;
    cat.addEventListener('input', e => { if (!e.target.closest('.qtd')) { clearTimeout(t); t = setTimeout(() => filtrar(true), e.target.name === 'q' ? 180 : 0); } });
    form?.addEventListener('submit', e => { e.preventDefault(); filtrar(true); });
    $$('[data-limpar]', cat).forEach(b => b.addEventListener('click', () => { form.reset(); if (busca) busca.value = ''; filtrar(true); }));
    filtrar(false);
  });

  // ---------- busca do topo com sugestões ----------
  $$('[data-busca]').forEach(f => {
    const inp = $('input', f);
    const box = document.createElement('div');
    box.className = 'sug';
    box.hidden = true;
    f.append(box);
    let t;
    inp.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(async () => {
        const q = norm(inp.value).split(/\s+/).filter(Boolean);
        if (!q.length) { box.hidden = true; return; }
        const d = await carregar();
        const r = d.produtos.filter(p => q.every(x => p.busca.includes(x)));
        box.innerHTML = r.slice(0, 6).map(p => `<a href="/${V}/produtos/?q=${encodeURIComponent(inp.value.trim())}#p=${p.slug}">${spr(p)}<span><b>${esc(p.nome)}</b><small>${esc(d.nomeMarca[p.marca])}</small></span></a>`).join('')
          + `<button type="submit" class="sug-tudo">${r.length ? `Ver os ${r.length} resultados` : 'Nenhum produto com esse nome. Fale com a gente pelo WhatsApp.'}</button>`;
        box.hidden = false;
      }, 140);
    });
    inp.addEventListener('focus', () => { if (box.innerHTML && inp.value) box.hidden = false; });
    document.addEventListener('click', e => { if (!f.contains(e.target)) box.hidden = true; });
    f.addEventListener('keydown', e => { if (e.key === 'Escape') box.hidden = true; });
  });

  // ---------- página do orçamento ----------
  const orc = $('[data-orcamento]');
  if (orc) carregar().then(d => {
    const ul = $('[data-itens]', orc);
    const vazio = $('[data-orc-vazio]', orc);
    const form = $('form', orc);
    const desenhar = () => {
      const itens = Object.entries(lista).filter(([s]) => d.porSlug.has(s));
      vazio.hidden = itens.length > 0;
      orc.classList.toggle('tem-itens', itens.length > 0);
      ul.innerHTML = itens.map(([s, q]) => { const p = d.porSlug.get(s); return `<li class="oi" data-item="${s}">${spr(p)}<div class="oi-txt"><b>${esc(p.nome)}</b><small>${esc(d.nomeMarca[p.marca])}${embalagem(p.nome) ? ' · ' + esc(embalagem(p.nome)) : ''}</small></div>${qtd(q)}<button type="button" class="oi-x" data-tirar aria-label="Tirar ${esc(p.nome)} da lista">${ico.x}</button></li>`; }).join('');
      $$('[data-n-itens]', orc).forEach(el => { el.textContent = itens.length; });
    };
    ul.addEventListener('click', e => {
      const li = e.target.closest('[data-item]');
      if (!li) return;
      const s = li.dataset.item;
      if (e.target.closest('[data-tirar]')) delete lista[s];
      else if (e.target.closest('[data-mais]')) lista[s]++;
      else if (e.target.closest('[data-menos]')) lista[s] = Math.max(1, lista[s] - 1);
      else return;
      gravar(); desenhar();
    });
    ul.addEventListener('change', e => { const li = e.target.closest('[data-item]'); if (li) { lista[li.dataset.item] = Math.max(1, parseInt(e.target.value, 10) || 1); gravar(); desenhar(); } });
    $('[data-esvaziar]', orc)?.addEventListener('click', () => { if (confirm('Tirar todos os itens da lista?')) { lista = {}; gravar(); desenhar(); } });
    const texto = () => {
      const f = new FormData(form);
      const linhas = Object.entries(lista).filter(([s]) => d.porSlug.has(s)).map(([s, q]) => `• ${q} × ${d.porSlug.get(s).nome} (${d.nomeMarca[d.porSlug.get(s).marca]})`);
      return [`Olá, Ultramix! Gostaria de um orçamento:`, '', ...linhas, '',
        `Nome: ${f.get('nome') || ''}`, `Estabelecimento: ${f.get('empresa') || ''}`, `Cidade: ${f.get('cidade') || ''}`, `Telefone: ${f.get('fone') || ''}`,
        f.get('obs') ? `Observações: ${f.get('obs')}` : ''].filter((l, i, a) => l || a[i - 1]).join('\n');
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!totalItens()) { aviso('Adicione pelo menos um produto à lista'); return; }
      const via = e.submitter?.value || 'whats';
      if (via === 'email') location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Orçamento pelo site')}&body=${encodeURIComponent(texto())}`;
      else window.open(`https://api.whatsapp.com/send?phone=${WHATS}&text=${encodeURIComponent(texto())}`, '_blank', 'noopener');
    });
    desenhar();
    document.addEventListener('orcamento', () => { if (!ul.contains(document.activeElement)) desenhar(); });
  });

  // ---------- painel lateral do orçamento (catálogo da versão B) ----------
  const painel = $('[data-painel]');
  if (painel) carregar().then(d => {
    const ul = $('ul', painel);
    const desenhar = () => {
      const itens = Object.entries(lista).filter(([s]) => d.porSlug.has(s));
      painel.classList.toggle('tem-itens', itens.length > 0);
      ul.innerHTML = itens.slice(-8).reverse().map(([s, q]) => `<li>${spr(d.porSlug.get(s))}<span>${esc(d.porSlug.get(s).nome)}</span><b>${q}</b></li>`).join('');
      $$('[data-n-itens]', painel).forEach(el => { el.textContent = itens.length; });
    };
    document.addEventListener('orcamento', desenhar);
    desenhar();
  });

  // ---------- atende minha cidade? ----------
  $$('[data-cidade]').forEach(f => {
    const inp = $('input', f), out = $('output', f);
    fetch('/assets/cidades.json').then(r => r.json()).then(cs => {
      const nomes = cs.map(c => c[0]);
      const dl = document.createElement('datalist');
      dl.id = `cid-${Math.random().toString(36).slice(2)}`;
      dl.innerHTML = nomes.map(n => `<option value="${n}">`).join('');
      f.append(dl);
      inp.setAttribute('list', dl.id);
      const testar = () => {
        const q = norm(inp.value.trim());
        if (!q) { out.textContent = ''; out.className = ''; return; }
        const achou = nomes.find(n => norm(n) === q);
        const parecidas = nomes.filter(n => norm(n).startsWith(q));
        out.className = achou ? 'sim' : parecidas.length ? '' : 'nao';
        out.innerHTML = achou ? `Sim, a Ultramix entrega em <b>${esc(achou)}</b>.`
          : parecidas.length ? `Continue digitando: ${parecidas.slice(0, 3).map(esc).join(', ')}${parecidas.length > 3 ? '…' : ''}`
          : `${esc(inp.value.trim())} não está na lista de hoje. <a href="https://api.whatsapp.com/send?phone=${WHATS}&text=${encodeURIComponent(`Olá, Ultramix! Vocês entregam em ${inp.value.trim()}?`)}" target="_blank" rel="noopener">Pergunte pelo WhatsApp</a>.`;
        $$('[data-cid]').forEach(el => el.classList.toggle('acesa', !!achou && el.dataset.cid === achou));
      };
      inp.addEventListener('input', testar);
      f.addEventListener('submit', e => { e.preventDefault(); testar(); });
    });
  });

  // ---------- abas da prateleira ----------
  $$('[data-abas]').forEach(box => {
    const bts = $$('[role=tab]', box);
    bts.forEach(b => b.addEventListener('click', () => {
      bts.forEach(x => x.setAttribute('aria-selected', x === b));
      $$('[role=tabpanel]', box).forEach(p => { p.hidden = p.id !== b.getAttribute('aria-controls'); });
    }));
  });
  // Setas das prateleiras que rolam de lado.
  $$('[data-trilho]').forEach(w => {
    const tr = $('.trilho', w) || w;
    $$('[data-rolar]', w).forEach(b => b.addEventListener('click', () => {
      const t = $$('.trilho', w).find(x => !x.closest('[hidden]')) || tr;
      t.scrollBy({ left: (b.dataset.rolar === 'dir' ? 1 : -1) * t.clientWidth * 0.85, behavior: 'smooth' });
    }));
  });

  // ---------- formulário de contato (prévia) ----------
  $$('form[data-previa]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const o = $('.form-ok', f);
    if (o) { o.hidden = false; o.focus(); }
  }));

  // ---------- menu do celular ----------
  const mb = $('.menu-btn'), menu = $('#menu');
  if (mb && menu) mb.addEventListener('click', () => {
    const ab = mb.getAttribute('aria-expanded') !== 'true';
    mb.setAttribute('aria-expanded', ab);
    document.body.classList.toggle('menu-aberto', ab);
  });

  // ---------- carrossel do topo (versão A) ----------
  $$('[data-slider]').forEach(sl => {
    const slides = $$('.slide', sl), pts = $$('.slide-pts button', sl);
    let i = 0, t;
    const ir = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('on', k === i)); pts.forEach((p, k) => p.setAttribute('aria-selected', k === i)); };
    const auto = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => ir(i + 1), 7000); };
    pts.forEach((p, k) => p.addEventListener('click', () => { ir(k); auto(); }));
    sl.addEventListener('mouseenter', () => clearInterval(t));
    sl.addEventListener('mouseleave', auto);
    auto();
  });

  // ---------- entrada suave ao rolar ----------
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-rev');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('[data-rev]').forEach(el => io.observe(el));
  }

  atualizarContagem();
  window.addEventListener('storage', e => { if (e.key === CHAVE) { lista = ler(); atualizarContagem(); } });
})();
