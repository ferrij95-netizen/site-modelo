// Grupo KSS: menu, catálogo com filtros, galeria, abas, lista de orçamento, formulários por e-mail e vídeos.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Menu do celular
  const bm = $('.btn-menu');
  bm?.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    bm.setAttribute('aria-expanded', aberto);
  });
  // Produtos (mega menu): no toque, o primeiro clique abre
  $$('.tem-mega > a').forEach(a => a.addEventListener('click', e => {
    if (matchMedia('(hover: none), (max-width: 1080px)').matches) {
      const item = a.parentElement;
      if (!item.classList.contains('aberto')) { e.preventDefault(); item.classList.add('aberto'); }
    }
  }));

  // Abas (ficha do produto e seletor de linhas)
  $$('[data-abas]').forEach(box => {
    const bts = $$('[data-aba]', box);
    bts.forEach(b => b.addEventListener('click', () => {
      bts.forEach(x => x.setAttribute('aria-selected', x === b));
      $$('[data-painel]', box).forEach(p => { p.hidden = p.dataset.painel !== b.dataset.aba; });
    }));
  });

  // Carrossel de depoimentos
  $$('[data-carrossel]').forEach(box => {
    const itens = $$('figure', box); let i = 0;
    $$('[data-car]', box).forEach(b => b.addEventListener('click', () => {
      i = (i + +b.dataset.car + itens.length) % itens.length;
      itens.forEach((f, k) => { f.hidden = k !== i; });
      $('[data-car-pos]', box).textContent = `${i + 1} / ${itens.length}`;
    }));
  });

  // Galeria do produto
  $$('[data-galeria]').forEach(g => {
    const prin = $('.gal-principal', g), img = $('img', prin);
    $$('[data-foto]', g).forEach(b => b.addEventListener('click', () => {
      img.src = b.dataset.foto; prin.dataset.ampliar = b.dataset.foto;
      prin.classList.toggle('recorte', b.dataset.alpha === 'true');
      $$('[data-foto]', g).forEach(x => x.toggleAttribute('aria-current', x === b));
    }));
  });
  // Foto ampliada
  const caixa = $('dialog.caixa');
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-ampliar]');
    if (b && caixa?.showModal) { $('img', caixa).src = b.dataset.ampliar; caixa.showModal(); }
  });
  caixa?.addEventListener('click', e => { if (e.target === caixa || e.target.closest('.caixa-fechar')) caixa.close(); });

  // Vídeos do YouTube só carregam ao clicar
  $$('[data-yt]').forEach(b => b.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1`;
    f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true; f.title = b.getAttribute('aria-label');
    b.replaceWith(f);
  }));

  // Catálogo: filtros por solução, linha e categoria, e busca
  const cat = $('[data-catalogo]');
  if (cat) {
    const cards = $$('.prod', cat), info = $('[data-cat-info]', cat), vazio = $('[data-cat-vazio]', cat), campo = $('[data-busca-campo]', cat);
    const bts = $$('[data-f]', cat);
    let filtro = { f: '', v: '' };
    const aplicar = () => {
      const q = campo.value.trim().toLowerCase();
      let n = 0;
      cards.forEach(c => {
        const ok = (!filtro.f || c.dataset[filtro.f] === filtro.v) && (!q || c.dataset.busca.includes(q));
        c.hidden = !ok; if (ok) n++;
      });
      bts.forEach(b => b.setAttribute('aria-pressed', b.dataset.f === filtro.f && b.dataset.v === filtro.v));
      const ativo = bts.find(b => b.dataset.f === filtro.f && b.dataset.v === filtro.v);
      info.textContent = `${n} ${n === 1 ? 'produto' : 'produtos'}${filtro.f ? ` em ${ativo.firstChild.textContent.trim()}` : ''}${q ? ` para “${campo.value.trim()}”` : ''}`;
      vazio.hidden = n > 0;
    };
    bts.forEach(b => b.addEventListener('click', () => {
      filtro = { f: b.dataset.f, v: b.dataset.v };
      const u = new URL(location.href); u.search = filtro.f ? `?${{ sol: 'solucao', linha: 'linha', cat: 'cat' }[filtro.f]}=${filtro.v}` : '';
      history.replaceState(null, '', u); aplicar();
    }));
    campo.addEventListener('input', aplicar);
    const qs = new URLSearchParams(location.search);
    for (const [k, f] of [['solucao', 'sol'], ['linha', 'linha'], ['cat', 'cat']]) if (qs.get(k)) filtro = { f, v: qs.get(k) };
    aplicar();
  }

  // Lista de orçamento (fica salva no navegador)
  const CH = 'kss-orcamento';
  const ler = () => { try { return JSON.parse(localStorage.getItem(CH)) || []; } catch { return []; } };
  const salvar = l => { try { localStorage.setItem(CH, JSON.stringify(l)); } catch {} contar(); };
  const contar = () => { const n = ler().length; $$('[data-orc-n]').forEach(b => { b.textContent = n; b.hidden = !n; }); };
  contar();
  $$('[data-orc-add]').forEach(b => {
    const marcar = () => { if (ler().includes(b.dataset.orcAdd)) { b.classList.add('na-lista'); b.lastChild.textContent = ' Na lista do orçamento'; } };
    marcar();
    b.addEventListener('click', () => {
      const l = ler();
      if (!l.includes(b.dataset.orcAdd)) { l.push(b.dataset.orcAdd); salvar(l); }
      marcar();
      $('.btn-orc')?.classList.add('pulsa'); setTimeout(() => $('.btn-orc')?.classList.remove('pulsa'), 900);
    });
  });
  const lista = $('[data-orc-lista]');
  if (lista && window.KSS_CAT) {
    const C = window.KSS_CAT;
    const desenhar = () => {
      const l = ler().filter(s => C[s]);
      lista.innerHTML = l.map(s => `<li><img src="/assets/img/p/${C[s].f}" alt=""><span><small>${C[s].c}</small>${C[s].n}</span><label>Qtd.<input type="number" min="1" value="1" data-qtd="${s}"></label><button type="button" data-tirar="${s}" aria-label="Remover">×</button></li>`).join('');
      $('[data-orc-vazio]').hidden = l.length > 0;
    };
    desenhar();
    lista.addEventListener('click', e => { const b = e.target.closest('[data-tirar]'); if (b) { salvar(ler().filter(s => s !== b.dataset.tirar)); desenhar(); } });
    $('[data-orc-select]').addEventListener('change', e => { const s = e.target.value; if (s) { const l = ler(); if (!l.includes(s)) salvar([...l, s]); e.target.value = ''; desenhar(); } });
  }

  // Formulários: montam um e-mail
  $$('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    let para = f.dataset.mailto;
    const dep = $('[data-depto]', f); if (dep?.selectedOptions[0]?.dataset.email) para = dep.selectedOptions[0].dataset.email;
    const linhas = [];
    if (f.hasAttribute('data-orc-form')) {
      const C = window.KSS_CAT || {};
      const itens = ler().filter(s => C[s]).map(s => `- ${C[s].n} (qtd. ${$(`[data-qtd="${s}"]`)?.value || 1})`);
      linhas.push('Produtos do orçamento:', ...(itens.length ? itens : ['(nenhum produto selecionado)']), '');
    }
    for (const el of f.elements) if (el.name && el.value) linhas.push(`${el.name}: ${el.value}`);
    location.href = `mailto:${para}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
  }));
})();
