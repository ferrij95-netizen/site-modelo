// Fort Alimentos: menu do celular, filtro do catálogo, prateleira, lista de pedido (guardada no navegador) e envio pelo WhatsApp.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const WHATS = '5515991138912';
  const CHAVE = 'fort-lista';

  // Menu do celular
  const btn = $('.menu-btn'), menu = $('#menu');
  if (btn && menu) btn.addEventListener('click', () => {
    const aberto = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!aberto));
    menu.classList.toggle('aberto', !aberto);
  });

  // Lista de pedido
  const dadosEl = $('#fort-produtos');
  const dados = dadosEl ? JSON.parse(dadosEl.textContent) : {};
  const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch { return {}; } };
  const gravar = l => { try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch {} atualizarContador(); };
  const atualizarContador = () => {
    const n = Object.keys(ler()).length;
    $$('[data-lista-n]').forEach(el => { el.textContent = n; el.classList.toggle('tem', n > 0); });
  };
  atualizarContador();

  const aviso = $('[data-aviso]');
  let avisoT;
  const avisar = html => {
    if (!aviso) return;
    aviso.innerHTML = html; aviso.hidden = false; aviso.classList.add('ver');
    clearTimeout(avisoT); avisoT = setTimeout(() => { aviso.classList.remove('ver'); setTimeout(() => { aviso.hidden = true; }, 300); }, 3200);
  };

  // Quantidade (+ / -)
  document.addEventListener('click', e => {
    const mais = e.target.closest('[data-qtd-mais]'), menos = e.target.closest('[data-qtd-menos]');
    if (!mais && !menos) return;
    const inp = (mais || menos).parentElement.querySelector('input');
    inp.value = Math.max(1, (parseInt(inp.value, 10) || 1) + (mais ? 1 : -1));
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // Adicionar à lista
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]');
    if (!b) return;
    const id = b.dataset.add;
    const caixa = b.closest('[data-item], .pp-pedir, .prod-acao');
    const inp = caixa && caixa.querySelector('[data-qtd] input');
    const q = inp ? Math.max(1, parseInt(inp.value, 10) || 1) : 1;
    const l = ler(); l[id] = (l[id] || 0) + q; gravar(l);
    b.classList.add('ok'); setTimeout(() => b.classList.remove('ok'), 1200);
    const nome = dados[id] ? dados[id].n : 'Produto';
    const v = location.pathname.split('/')[1] || 'a';
    avisar(`<b>${nome}</b> na lista (${l[id]}). <a href="/${v}/pedido/">Ver lista de pedido</a>`);
  });

  // Página do pedido
  const itens = $('[data-lista-itens]');
  const desenhar = () => {
    if (!itens) return;
    const l = ler(), ids = Object.keys(l).filter(id => dados[id]);
    $('[data-lista-vazia]').hidden = ids.length > 0;
    $('[data-lista-acoes]').hidden = ids.length === 0;
    const v = location.pathname.split('/')[1] || 'a';
    itens.innerHTML = ids.map(id => `<li data-id="${id}">
      <img src="/assets/prod/${id}.webp" alt="" width="64" height="64">
      <span class="li-nome"><a href="/${v}/produtos/${dados[id].s}/">${dados[id].n}</a><small>${dados[id].m}</small></span>
      <span class="qtd" data-qtd><button type="button" data-qtd-menos aria-label="Menos"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg></button><input type="number" min="1" value="${l[id]}" aria-label="Quantidade"><button type="button" data-qtd-mais aria-label="Mais"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button></span>
      <button class="li-tirar" type="button" data-tirar aria-label="Tirar da lista"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </li>`).join('');
  };
  if (itens) {
    desenhar();
    itens.addEventListener('change', e => {
      const li = e.target.closest('li[data-id]'); if (!li) return;
      const l = ler(); l[li.dataset.id] = Math.max(1, parseInt(e.target.value, 10) || 1); gravar(l);
    });
    itens.addEventListener('click', e => {
      const t = e.target.closest('[data-tirar]'); if (!t) return;
      const l = ler(); delete l[t.closest('li').dataset.id]; gravar(l); desenhar();
    });
    const limpar = $('[data-lista-limpar]');
    if (limpar) limpar.addEventListener('click', () => { gravar({}); desenhar(); });
  }
  const pf = $('[data-pedido-form]');
  if (pf) pf.addEventListener('submit', e => {
    e.preventDefault();
    const l = ler(), ids = Object.keys(l).filter(id => dados[id]);
    if (!ids.length) { avisar('Adicione pelo menos um produto à lista antes de enviar.'); return; }
    const f = new FormData(pf);
    const linhas = ['*Pedido pelo site · Fort Alimentos*', '', ...ids.map(id => `• ${l[id]} × ${dados[id].n}`), '',
      `Comércio: ${f.get('comercio')} (${f.get('tipo')})`, `Contato: ${f.get('nome')} · ${f.get('telefone')}`];
    if (f.get('bairro')) linhas.push(`Local: ${f.get('bairro')}`);
    if (f.get('cnpj')) linhas.push(`CNPJ: ${f.get('cnpj')}`);
    if (f.get('obs')) linhas.push(`Obs.: ${f.get('obs')}`);
    window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
  });

  // Filtro do catálogo (?cat=, ?marca=, ?q=)
  const cat = $('[data-catalogo]');
  if (cat) {
    const ps = new URLSearchParams(location.search);
    const st = { cat: ps.get('cat') || '', marca: ps.get('marca') || '', q: (ps.get('q') || '').trim().toLowerCase() };
    const q = $('.busca-cat input', cat), sel = $('[data-f-marca]', cat);
    if (q) q.value = ps.get('q') || '';
    if (sel) sel.value = st.marca;
    const tira = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    const aplicar = () => {
      $$('[data-f-cat]', cat).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.fCat === st.cat)));
      let n = 0;
      const termos = tira(st.q).split(/\s+/).filter(Boolean);
      $$('[data-item]', cat).forEach(li => {
        const ok = (!st.cat || li.dataset.cat === st.cat) && (!st.marca || li.dataset.marca === st.marca) && termos.every(t => tira(li.dataset.busca).includes(t));
        li.hidden = !ok; if (ok) n++;
      });
      $('[data-conta]', cat).textContent = n === 1 ? '1 produto' : `${n} produtos`;
      $('[data-nada]', cat).hidden = n > 0;
      const u = new URL(location.href);
      for (const k of ['cat', 'marca', 'q']) { if (st[k]) u.searchParams.set(k, st[k]); else u.searchParams.delete(k); }
      history.replaceState(null, '', u);
    };
    cat.addEventListener('click', e => { const b = e.target.closest('[data-f-cat]'); if (b) { st.cat = b.dataset.fCat; aplicar(); } });
    if (sel) sel.addEventListener('change', () => { st.marca = sel.value; aplicar(); });
    const fb = $('.busca-cat', cat);
    if (fb) { fb.addEventListener('submit', e => { e.preventDefault(); }); q.addEventListener('input', () => { st.q = q.value.trim().toLowerCase(); aplicar(); }); }
    aplicar();
  }

  // Prateleira com setas
  const prat = $('[data-prat]');
  $$('[data-prat-ir]').forEach(b => b.addEventListener('click', () => {
    if (!prat) return;
    const item = prat.firstElementChild; const passo = item ? item.getBoundingClientRect().width + 16 : 300;
    prat.scrollBy({ left: passo * Number(b.dataset.pratIr) * 2, behavior: 'smooth' });
  }));

  // Faixa de marcas: duplica a lista para rolar sem emenda
  $$('[data-marquee] ul').forEach(ul => { ul.innerHTML += ul.innerHTML.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" '); });

  // Formulário de contato (prévia)
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); $('.form-ok', f).hidden = false; }));
})();
