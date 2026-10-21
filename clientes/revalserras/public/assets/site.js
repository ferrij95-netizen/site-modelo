// Reval: menu, topo transparente na abertura, abas por material, filtro das serras, ampliar tabelas e formulário (monta um e-mail).
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const lang = document.documentElement.lang;

  // menu do celular
  const nav = $('.nav'), burger = $('.burger');
  if (nav && burger) {
    const fechar = document.createElement('button');
    fechar.className = 'nav-fechar'; fechar.type = 'button'; fechar.setAttribute('aria-label', lang === 'pt-BR' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close');
    fechar.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    nav.prepend(fechar);
    const abrir = on => { nav.classList.toggle('aberto', on); burger.setAttribute('aria-expanded', on); document.body.classList.toggle('sem-rolar', on); };
    burger.addEventListener('click', () => abrir(true));
    fechar.addEventListener('click', () => abrir(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') abrir(false); });
  }

  // topo transparente sobre a abertura (versão A), sólido depois de rolar
  const topo = $('.topo');
  if (topo) {
    const f = () => topo.classList.toggle('rolou', scrollY > 40);
    addEventListener('scroll', f, { passive: true }); f();
  }

  // abas "O que você corta?" (setas do teclado também)
  $$('[data-abas]').forEach(box => {
    const abas = $$('[role="tab"]', box);
    const ir = a => {
      abas.forEach(x => {
        const on = x === a;
        x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    };
    abas.forEach((a, i) => {
      a.addEventListener('click', () => ir(a));
      a.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { const n = abas[(i + d + abas.length) % abas.length]; n.focus(); ir(n); }
      });
    });
  });

  // filtro das serras: material + busca; lê ?linha= e ?q= da URL
  $$('[data-filtro]').forEach(box => {
    const lista = $('[data-lista]'), itens = $$('li', lista), chips = $$('[data-seg]', box), q = $('input', box);
    const vazio = $('.lista-vazia');
    const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    let seg = '';
    const aplicar = () => {
      const termos = norm(q.value.trim()).split(/\s+/).filter(Boolean);
      let n = 0;
      itens.forEach(it => {
        const ok = (!seg || it.dataset.seg === seg) && termos.every(t => norm(it.dataset.busca).includes(t));
        it.hidden = !ok; if (ok) n++;
      });
      if (vazio) vazio.hidden = n > 0;
      chips.forEach(c => c.setAttribute('aria-pressed', c.dataset.seg === seg));
    };
    chips.forEach(c => c.addEventListener('click', () => {
      seg = c.dataset.seg; aplicar();
      const u = new URL(location); seg ? u.searchParams.set('linha', seg) : u.searchParams.delete('linha'); history.replaceState(null, '', u);
    }));
    q.addEventListener('input', aplicar);
    const p = new URLSearchParams(location.search);
    if (p.get('linha') && chips.some(c => c.dataset.seg === p.get('linha'))) seg = p.get('linha');
    if (p.get('q')) q.value = p.get('q');
    aplicar();
  });

  // ampliar tabelas e certificado
  const caixa = document.createElement('dialog');
  caixa.className = 'zoom';
  caixa.innerHTML = '<button type="button" class="zoom-fechar" aria-label="X"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button><img alt="">';
  document.body.append(caixa);
  caixa.addEventListener('click', e => { if (e.target === caixa || e.target.closest('.zoom-fechar')) caixa.close(); });
  $$('[data-zoom]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const i = $('img', caixa); i.src = a.getAttribute('href'); i.alt = $('img', a)?.alt || '';
    caixa.showModal();
  }));

  // disco da serra gira com a rolagem (versão B)
  const disco = $('.gira');
  if (disco && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const g = () => { disco.style.transform = `rotate(${scrollY * 0.25}deg)`; };
    addEventListener('scroll', g, { passive: true }); g();
  }

  // formulário: monta um e-mail para a área escolhida
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    const para = d.area === 'laser' ? f.dataset.paraLaser : f.dataset.paraSerras;
    const rot = $$('label', f).map(l => [l.querySelector('[name]')?.name, l.firstChild.textContent.trim()]);
    const area = $('select', f).selectedOptions[0].textContent;
    const corpo = rot.filter(([n]) => n && n !== 'area').map(([n, r]) => `${r}: ${d[n] || '-'}`).join('\n');
    location.href = `mailto:${para}?subject=${encodeURIComponent(`${area} · ${d.nome}`)}&body=${encodeURIComponent(corpo)}`;
  }));
})();
