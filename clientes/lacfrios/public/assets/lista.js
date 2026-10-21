// Lista de pedido da LacFrios: guarda os itens neste aparelho (localStorage), mostra a contagem no topo,
// desenha a lista (página Pedido e painel lateral da versão B) e monta a mensagem de WhatsApp/e-mail.
(() => {
  const CHAVE = 'lacfrios-lista';
  const UNIDADES = ['kg', 'peça', 'caixa', 'unidade', 'pacote'];
  const WA = '5541991155429', EMAIL = 'lacfrios@lacfrios.com.br';
  // linhas sem item nomeado (embutidos, molhos...) e itens escritos à mão começam em caixa; queijos e manteiga em kg
  const GRANEL = /^(embutidos|congelados|enlatados|molhos|doces|secos|outro)\b/;
  let itens = [];
  try { itens = JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { itens = []; }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(itens)); } catch {} };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  const toast = document.querySelector('[data-toast]');
  let tt;
  const avisar = txt => {
    if (!toast) return;
    toast.innerHTML = `${esc(txt)} <a href="${location.pathname.startsWith('/b/') ? '/b/' : '/a/'}pedido/">Ver lista</a>`;
    toast.hidden = false; toast.classList.add('on');
    clearTimeout(tt); tt = setTimeout(() => { toast.classList.remove('on'); setTimeout(() => toast.hidden = true, 300); }, 2600);
  };

  function adicionar(chave, nome, silencioso) {
    const ja = itens.find(i => i.chave === chave);
    if (ja) ja.qtd += 1;
    else itens.push({ chave, nome, qtd: 1, un: GRANEL.test(chave) ? 'caixa' : 'kg' });
    salvar(); desenhar();
    if (!silencioso) avisar(`${nome} na lista.`);
  }

  function desenhar() {
    const n = itens.length;
    document.querySelectorAll('[data-conta]').forEach(el => { el.textContent = n; el.hidden = n === 0; });
    document.querySelectorAll('[data-add]').forEach(b => b.classList.toggle('na-lista', itens.some(i => i.chave === b.dataset.add)));
    document.querySelectorAll('[data-lista]').forEach(box => {
      const compacta = box.hasAttribute('data-compacta');
      const vazio = box.querySelector('.lista-vazia');
      box.querySelectorAll('.lista-item').forEach(el => el.remove());
      if (vazio) vazio.hidden = n > 0;
      itens.forEach((it, idx) => {
        const row = document.createElement('div');
        row.className = 'lista-item';
        row.innerHTML = `<span class="lista-nome">${esc(it.nome)}</span>
          <span class="lista-qtd"><button type="button" data-menos aria-label="Diminuir ${esc(it.nome)}">−</button><input type="number" min="0.5" step="0.5" value="${it.qtd}" aria-label="Quantidade de ${esc(it.nome)}" inputmode="decimal"><button type="button" data-mais aria-label="Aumentar ${esc(it.nome)}">+</button></span>
          ${compacta ? `<span class="lista-un-txt">${esc(it.un)}</span>` : `<select aria-label="Unidade de ${esc(it.nome)}">${UNIDADES.map(u => `<option${u === it.un ? ' selected' : ''}>${u}</option>`).join('')}</select>`}
          <button type="button" class="lista-tira" data-tira aria-label="Tirar ${esc(it.nome)} da lista">×</button>`;
        const inp = row.querySelector('input');
        row.querySelector('[data-menos]').onclick = () => { it.qtd = Math.max(0.5, +(it.qtd - (it.qtd > 1 ? 1 : 0.5)).toFixed(1)); salvar(); desenhar(); };
        row.querySelector('[data-mais]').onclick = () => { it.qtd = +(it.qtd + 1).toFixed(1); salvar(); desenhar(); };
        inp.onchange = () => { it.qtd = Math.max(0.5, parseFloat(inp.value.replace(',', '.')) || 1); salvar(); desenhar(); };
        const sel = row.querySelector('select');
        if (sel) sel.onchange = () => { it.un = sel.value; salvar(); desenhar(); };
        row.querySelector('[data-tira]').onclick = () => { itens.splice(idx, 1); salvar(); desenhar(); };
        box.appendChild(row);
      });
    });
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]');
    if (b) { adicionar(b.dataset.add, b.dataset.nome); return; }
    const s = e.target.closest('[data-sugestao]');
    if (s) {
      const ids = s.dataset.sugestao.split(','), nomes = s.dataset.nomes.split(',');
      ids.forEach((id, i) => { if (!itens.some(x => x.chave === id)) adicionar(id, nomes[i], true); });
      avisar(`${ids.length} itens sugeridos na lista.`);
    }
  });

  document.querySelectorAll('form[data-livre]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const txt = f.item.value.trim();
    if (!txt) { f.item.focus(); return; }
    const nome = f.dataset.livre === 'outro' ? txt : `${f.dataset.nome}: ${txt}`;
    adicionar(`${f.dataset.livre}:${txt.toLowerCase()}`, nome);
    f.reset();
  }));

  // Envio: monta a mensagem. Na prévia não abre o WhatsApp nem o e-mail da LacFrios, só mostra o texto que iria.
  const dlg = document.querySelector('[data-dialogo]');
  document.querySelectorAll('form[data-enviar]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const canal = e.submitter?.dataset.canal || 'whatsapp';
    if (!itens.length) { avisar('A lista está vazia.'); return; }
    const d = Object.fromEntries(new FormData(f));
    const msg = [`Pedido pelo site · ${d.estabelecimento}`, `Contato: ${d.nome} · ${d.telefone}`, d.segmento ? `Negócio: ${d.segmento}` : '', `Entrega: ${d.bairro}`, '',
      ...itens.map(i => `• ${String(i.qtd).replace('.', ',')} ${i.un} · ${i.nome}`), d.obs ? `\nObs.: ${d.obs}` : ''].filter((l, i) => l !== '' || i === 4).join('\n');
    const link = canal === 'email' ? `mailto:${EMAIL}?subject=${encodeURIComponent('Pedido pelo site · ' + d.estabelecimento)}&body=${encodeURIComponent(msg)}` : `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    if (!dlg) return;
    dlg.querySelector('[data-dialogo-txt]').textContent = canal === 'email'
      ? `Prévia: no site publicado este botão abre o e-mail com o pedido pronto para ${EMAIL}. Nada foi enviado.`
      : 'Prévia: no site publicado este botão abre o WhatsApp da LacFrios com o pedido abaixo já escrito. Nada foi enviado.';
    dlg.querySelector('[data-dialogo-msg]').textContent = msg;
    dlg.dataset.link = link;
    dlg.showModal();
  }));
  dlg?.querySelector('[data-copiar]')?.addEventListener('click', ev => {
    navigator.clipboard?.writeText(dlg.querySelector('[data-dialogo-msg]').textContent);
    ev.target.textContent = 'Copiado';
  });

  desenhar();
  window.addEventListener('storage', e => { if (e.key === CHAVE) { try { itens = JSON.parse(e.newValue) || []; } catch {} desenhar(); } });
})();
