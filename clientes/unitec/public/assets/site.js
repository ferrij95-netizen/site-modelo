// Unitec Hospitalar: menu, filtros do catálogo, galeria, abas e formulários (montam um e-mail).
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // menu do celular
  const nav = $('.nav'), burger = $('.burger');
  if (nav && burger) {
    const fechar = document.createElement('button');
    fechar.className = 'nav-fechar'; fechar.type = 'button'; fechar.setAttribute('aria-label', 'Fechar');
    fechar.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    nav.prepend(fechar);
    const abrir = on => { nav.classList.toggle('aberto', on); burger.setAttribute('aria-expanded', on); };
    burger.addEventListener('click', () => abrir(true));
    fechar.addEventListener('click', () => abrir(false));
  }
  $$('.tem-sub > button').forEach(b => b.addEventListener('click', () => {
    const li = b.parentElement, on = !li.classList.contains('aberto');
    $$('.tem-sub.aberto').forEach(x => x !== li && x.classList.remove('aberto'));
    li.classList.toggle('aberto', on); b.setAttribute('aria-expanded', on);
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.tem-sub')) $$('.tem-sub.aberto').forEach(x => x.classList.remove('aberto')); });

  // filtros do catálogo (linha + busca por nome ou código); lê ?linha= e ?q= da URL
  $$('[data-filtro]').forEach(sec => {
    const itens = $$('.prod', sec), chips = $$('[data-linha]', sec), q = $('[data-q]', sec);
    const total = $('[data-total]', sec), vazio = $('[data-vazio]', sec);
    const lang = document.documentElement.lang;
    const rot = n => lang === 'en' ? `${n} item${n === 1 ? '' : 's'}` : lang === 'es' ? `${n} ítem${n === 1 ? '' : 's'}` : `${n} ${n === 1 ? 'item' : 'itens'}`;
    const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    let linha = '';
    const aplicar = () => {
      const termos = norm(q.value.trim()).split(/\s+/).filter(Boolean);
      let n = 0;
      itens.forEach(it => {
        const ok = (!linha || it.dataset.cats.split(' ').includes(linha)) && termos.every(t => norm(it.dataset.busca).includes(t));
        it.hidden = !ok; if (ok) n++;
      });
      total.textContent = rot(n); vazio.hidden = n > 0;
      chips.forEach(c => c.setAttribute('aria-pressed', c.dataset.linha === linha));
    };
    chips.forEach(c => c.addEventListener('click', () => {
      linha = c.dataset.linha; aplicar();
      const u = new URL(location); linha ? u.searchParams.set('linha', linha) : u.searchParams.delete('linha'); history.replaceState(null, '', u);
    }));
    q.addEventListener('input', aplicar);
    const p = new URLSearchParams(location.search);
    if (p.get('linha') && chips.some(c => c.dataset.linha === p.get('linha'))) linha = p.get('linha');
    if (p.get('q')) q.value = p.get('q');
    aplicar();
  });

  // galeria da ficha
  $$('[data-galeria]').forEach(g => {
    const alvo = $('[data-gal-alvo]', g);
    $$('[data-gal]', g).forEach(b => b.addEventListener('click', () => {
      alvo.src = b.dataset.gal;
      $$('[data-gal]', g).forEach(x => x.removeAttribute('aria-current')); b.setAttribute('aria-current', 'true');
    }));
  });

  // abas (certificados, ambientes)
  $$('[data-abas]').forEach(box => {
    const abas = $$('[role="tab"]', box);
    abas.forEach(a => a.addEventListener('click', () => {
      abas.forEach(x => { x.setAttribute('aria-selected', x === a); document.getElementById(x.getAttribute('aria-controls')).hidden = x !== a; });
    }));
  });

  // SAC: os dados do produto só aparecem no "SAC para Produto"
  const blocoProd = $('[data-sac-produto]');
  if (blocoProd) {
    const mostrar = () => {
      const prod = $('[data-sac-tipo="0"]').checked;
      blocoProd.hidden = !prod; $('#data').required = prod;
    };
    $$('[data-sac-tipo]').forEach(r => r.addEventListener('change', mostrar)); mostrar();
  }

  // formulários: montam um e-mail com os campos preenchidos
  $$('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    if (!f.reportValidity()) return;
    const destino = $('[data-destino]', f)?.value || f.dataset.mailto;
    const linhas = [];
    $$('input, select, textarea', f).forEach(c => {
      if (!c.name || c.closest('[hidden]') || (c.type === 'radio' && !c.checked) || !c.value || c.name === 'destinatario') return;
      const rot = c.type === 'radio' ? '' : (f.querySelector(`label[for="${c.id}"] span`)?.textContent.replace(' *', '') || c.name) + ': ';
      linhas.push(rot + c.value);
    });
    const assunto = $('#assunto', f)?.value || document.title.split('|')[0].trim();
    location.href = `mailto:${destino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
  }));
})();
