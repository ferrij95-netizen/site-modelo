// Herpin: lista de pedido (guardada no navegador), busca do catálogo, fotos em tela cheia, abas e menu.
(() => {
  const CHAVE = 'herpin-pedido';
  const WA = '5562982440168';
  const EMAIL = 'herpin@herpin.com.br';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  let pedido = [];
  try { pedido = JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { pedido = []; }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(pedido)); } catch {} atualizar(); };
  const achar = id => pedido.find(i => i.id === id);

  const aviso = $('.aviso-pedido');
  let tAviso;
  const avisar = txt => { if (!aviso) return; aviso.textContent = txt; aviso.classList.add('on'); clearTimeout(tAviso); tAviso = setTimeout(() => aviso.classList.remove('on'), 2200); };

  function adicionar(id, nome, foto, dep, qtd = 1) {
    const it = achar(id);
    if (it) it.qtd += qtd; else pedido.push({ id, nome, foto, dep, qtd });
  }

  function atualizar() {
    const total = pedido.length;
    $$('[data-pedido-n]').forEach(el => { el.textContent = total; el.classList.toggle('tem', total > 0); });
    $$('[data-add]').forEach(b => b.classList.toggle('no', !!achar(b.dataset.add)));
    $$('[data-painel]').forEach(ul => {
      ul.innerHTML = pedido.map(i => `<li><span>${i.nome}</span><b>${i.qtd}</b><button type="button" data-tirar="${i.id}" aria-label="Tirar ${i.nome}">×</button></li>`).join('');
      ul.parentElement.classList.toggle('cheio', total > 0);
    });
    const lista = $('#pedido-itens');
    if (lista) {
      lista.innerHTML = pedido.map(i => `<li data-id="${i.id}">
        <span class="pi-img">${i.foto ? `<img src="${i.foto}" alt="">` : ''}</span>
        <span class="pi-nome">${i.nome}<small>${i.dep || ''}</small></span>
        <span class="qtd"><button type="button" data-pq="-1" aria-label="Diminuir">−</button><input type="number" min="1" value="${i.qtd}" aria-label="Quantidade de ${i.nome}"><button type="button" data-pq="1" aria-label="Aumentar">+</button></span>
        <button class="pi-tirar" type="button" data-tirar="${i.id}" aria-label="Tirar ${i.nome} do pedido">×</button></li>`).join('');
      const vazio = $('.pedido-vazio');
      if (vazio) vazio.hidden = total > 0;
    }
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]');
    if (b) {
      const linha = b.closest('.linha');
      const q = linha ? Math.max(1, parseInt($('.qtd input', linha)?.value, 10) || 1) : 1;
      if (achar(b.dataset.add) && !linha) { pedido = pedido.filter(i => i.id !== b.dataset.add); salvar(); avisar(`${b.dataset.nome} saiu do pedido`); return; }
      adicionar(b.dataset.add, b.dataset.nome, b.dataset.foto, b.dataset.dep, q);
      salvar(); avisar(`${b.dataset.nome} no pedido${q > 1 ? ` (${q})` : ''}`);
      return;
    }
    const kit = e.target.closest('[data-kit]');
    if (kit) {
      JSON.parse(kit.dataset.kitNomes).forEach(([id, nome, foto, dep]) => { if (!achar(id)) adicionar(id, nome, foto, dep); });
      salvar(); avisar('Lista adicionada ao pedido');
      kit.classList.add('feito');
      return;
    }
    const tirar = e.target.closest('[data-tirar]');
    if (tirar) { pedido = pedido.filter(i => i.id !== tirar.dataset.tirar); salvar(); return; }
    const q = e.target.closest('[data-q]');
    if (q) { const inp = $('input', q.parentElement); inp.value = Math.max(1, (parseInt(inp.value, 10) || 1) + +q.dataset.q); return; }
    const pq = e.target.closest('[data-pq]');
    if (pq) { const it = achar(pq.closest('li').dataset.id); if (it) { it.qtd = Math.max(1, it.qtd + +pq.dataset.pq); salvar(); } return; }
    const z = e.target.closest('[data-fotos]');
    if (z) { abrirGaleria(z.dataset.fotos.split('|'), z.dataset.titulo); return; }
  });
  document.addEventListener('change', e => {
    const inp = e.target.closest('#pedido-itens input');
    if (inp) { const it = achar(inp.closest('li').dataset.id); if (it) { it.qtd = Math.max(1, parseInt(inp.value, 10) || 1); salvar(); } }
  });

  // Envio de formulários: monta a mensagem e abre o WhatsApp ou o e-mail.
  $$('form[data-envio]').forEach(f => {
    let via = 'wa';
    $$('[data-via]', f).forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
    f.addEventListener('submit', e => {
      e.preventDefault();
      const linhas = [];
      const assunto = f.dataset.assunto || 'Pedido de orçamento pelo site';
      linhas.push(`*${assunto}*`);
      if (f.dataset.envio === 'pedido') {
        if (pedido.length) { linhas.push('', 'Produtos:'); pedido.forEach(i => linhas.push(`- ${i.qtd} × ${i.nome}${i.dep ? ` (${i.dep})` : ''}`)); }
        else if (!f.elements['Observações'].value.trim()) { avisar('Adicione produtos ou escreva o que precisa'); return; }
      }
      linhas.push('');
      $$('input, textarea', f).forEach(i => { if (i.value.trim()) linhas.push(`${i.name}: ${i.value.trim()}`); });
      const txt = linhas.join('\n');
      const url = via === 'email'
        ? `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(txt.replace(/\*/g, ''))}`
        : `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;
      window.open(url, via === 'email' ? '_self' : '_blank');
    });
  });
  $$('form[data-envio="pedido"]').forEach(f => f.dataset.assunto = 'Pedido de orçamento pelo site');

  // Busca e filtros do catálogo.
  const busca = $('[data-busca]');
  if (busca) {
    const itens = $$('[data-item]');
    const blocos = $$('[data-bloco]');
    let dep = '';
    const filtrar = () => {
      const termos = norm(busca.value.trim()).split(/\s+/).filter(Boolean);
      let n = 0;
      itens.forEach(it => {
        const ok = (!dep || it.dataset.dep === dep) && termos.every(t => it.dataset.nome.includes(t));
        it.hidden = !ok; if (ok) n++;
      });
      blocos.forEach(b => { b.hidden = !$$('[data-item]', b).some(i => !i.hidden); });
      $$('[data-conta]').forEach(c => c.textContent = n);
      const vazio = $('.vazio'); if (vazio) vazio.hidden = n > 0;
    };
    busca.addEventListener('input', filtrar);
    $$('[data-filtro]').forEach(b => b.addEventListener('click', () => {
      dep = b.dataset.filtro;
      $$('[data-filtro]').forEach(x => x.setAttribute('aria-pressed', x === b));
      filtrar();
    }));
    const q = new URLSearchParams(location.search).get('q');
    if (q) { busca.value = q; filtrar(); }
  }

  // Galeria de fotos.
  const dlg = $('dialog.galeria');
  function abrirGaleria(fotos, titulo) {
    if (!dlg) return;
    const img = $('figure img', dlg), cap = $('figcaption', dlg), mini = $('.gal-mini', dlg);
    const mostrar = i => { img.src = fotos[i]; img.alt = titulo; $$('button', mini).forEach((b, k) => b.setAttribute('aria-current', k === i)); };
    cap.textContent = titulo;
    mini.innerHTML = fotos.length > 1 ? fotos.map((f, i) => `<button type="button" aria-label="Foto ${i + 1}"><img src="${f}" alt=""></button>`).join('') : '';
    $$('button', mini).forEach((b, i) => b.addEventListener('click', () => mostrar(i)));
    mostrar(0);
    dlg.showModal();
  }
  if (dlg) {
    $('.gal-fechar', dlg).addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  }

  // Abas dos kits (versão A).
  $$('[role="tablist"]').forEach(tl => {
    const tabs = $$('[role="tab"]', tl);
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => { x.setAttribute('aria-selected', x === t); $('#' + x.getAttribute('aria-controls')).hidden = x !== t; });
    }));
  });

  // Menu no celular.
  const bm = $('.btn-menu'), menu = $('#menu');
  if (bm && menu) bm.addEventListener('click', () => { const ab = bm.getAttribute('aria-expanded') !== 'true'; bm.setAttribute('aria-expanded', ab); menu.classList.toggle('aberto', ab); });

  atualizar();
})();
