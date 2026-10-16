// Pós-venda do canvas de prospecção (página inicial do hub).
// Quando uma empresa vira cliente (etapa "Fechado"), abre uma lista de tarefas: contrato, entrada, domínio,
// site no endereço final, e-mail da empresa, entrega e pedido de indicação.
// - Na ficha da empresa: a lista com marcar como feita (guarda a data) e uma anotação por tarefa.
// - Na Visão geral: bloco "Pós-venda" com todos os clientes de todas as listas (dados de /api/posvenda, src/posvenda.js).
// Nada é feito fora do hub (domínio, cobrança): aqui é só o acompanhamento.
// Fica gravado no registro da empresa em posVenda.tarefas.<chave> = { feito, em, nota }.
// A página liga o módulo com Posvenda.init({...}) e chama Posvenda.render(el) e Posvenda.ficha(doc).
(() => {
  const TAREFAS = [
    ['contrato', 'Contrato assinado', 'Modelo em Sobre a empresa. Anote a data da assinatura.', 'Ex.: assinado por e-mail'],
    ['pagamento', 'Entrada recebida', 'Combine a forma de cobrança e anote o valor recebido.', 'Ex.: R$ 1.500 no Pix, resto na entrega'],
    ['dominio', 'Domínio', 'Registrar o domínio do cliente ou pedir o acesso ao que ele já tem.', 'Ex.: empresa.com.br, no Registro.br dele'],
    ['publicacao', 'Site no endereço final', 'Publicar a versão escolhida no domínio do cliente e conferir no ar.', 'Ex.: versão B no ar em empresa.com.br'],
    ['email', 'E-mail da empresa', 'Criar ou ligar o e-mail com o domínio (ex.: contato@empresa.com.br).', 'Ex.: contato@ e comercial@ criados'],
    ['entrega', 'Entrega ao cliente', 'Mostrar o site no ar, passar os acessos e tirar dúvidas.', 'Ex.: reunião feita, acessos enviados'],
    ['indicacao', 'Pedir indicação', 'Pedir uma avaliação no Google e o contato de outra empresa que precise de site.', 'Ex.: indicou a empresa X'],
  ];
  let cfg = null, cache = null, carregando = null, ultimo = 0, fichaDoc = null;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const data = ms => { if (!ms) return ''; const d = new Date(ms); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); };
  const tarefas = d => ((d.posVenda || {}).tarefas) || {};
  const feitas = d => TAREFAS.filter(([k]) => tarefas(d)[k] && tarefas(d)[k].feito).length;
  const proxima = d => TAREFAS.find(([k]) => !(tarefas(d)[k] && tarefas(d)[k].feito));

  /* ---------- dados de todas as listas ---------- */
  function buscar(forcar) {
    if (carregando) return carregando;
    if (cache && !forcar && Date.now() - ultimo < 60000) return Promise.resolve(cache);
    carregando = fetch('/api/posvenda', { credentials: 'same-origin' })
      .then(r => { if (r.status === 401) { location.href = '/entrar/'; throw new Error('sessão'); } if (!r.ok) throw new Error('erro ' + r.status); return r.json(); })
      .then(j => { cache = j.docs || []; ultimo = Date.now(); return cache; })
      .finally(() => { carregando = null; });
    return carregando;
  }
  // Depois de gravar ou de mudar a etapa, a tela já mostra a mudança.
  function noCache(d) {
    if (!cache) return;
    const i = cache.findIndex(x => x.id === d.id);
    if (d.status !== 'fechado') { if (i >= 0) cache.splice(i, 1); }
    else if (i >= 0) cache[i] = { ...cache[i], ...d };
    else cache.push(d);
  }

  /* ---------- bloco na Visão geral ---------- */
  function pintar(el) {
    if (!el || !el.isConnected) return;
    const head = n => `<div class="sechead"><h2>Pós-venda</h2><span>${n}</span></div>`;
    if (!cache) { el.innerHTML = head('') + `<div class="empty small">Carregando os clientes…</div>`; return; }
    if (!cache.length) { el.innerHTML = head('Todas as listas') + `<div class="empty small">Quando uma empresa passar para “Fechado”, a lista de pós-venda dela aparece aqui: contrato, entrada, domínio, site no ar, e-mail, entrega e indicação.</div>`; return; }
    const arr = [...cache].sort((a, b) => (feitas(a) === TAREFAS.length) - (feitas(b) === TAREFAS.length) || (b.statusEm || 0) - (a.statusEm || 0));
    const abertos = arr.filter(d => feitas(d) < TAREFAS.length).length;
    el.innerHTML = head(`${arr.length} cliente${arr.length > 1 ? 's' : ''}${abertos ? ` · ${abertos} em andamento` : ' · tudo entregue'} · todas as listas`) +
      `<div class="pv-lista">${arr.map(d => {
        const n = feitas(d), p = proxima(d), ok = n === TAREFAS.length;
        return `<button class="pv-cli" type="button" data-pvid="${esc(d.id)}">
          <span class="pv-nome"><span class="tn">${esc(d.nome)}</span><span class="ts">${ok ? 'Pós-venda concluído' : 'Próximo: ' + esc(p[1])}${d.statusEm ? ' · fechou em ' + data(d.statusEm) : ''}</span></span>
          <span class="pv-prog ${ok ? 'ok' : ''}"><span class="pv-bar"><i style="width:${Math.round(n / TAREFAS.length * 100)}%"></i></span><span class="pv-n">${n}/${TAREFAS.length}</span></span>
        </button>`;
      }).join('')}</div>`;
  }
  function render(el) {
    if (!el) return;
    el.classList.add('pv-box');
    pintar(el);
    buscar().then(() => pintar(el)).catch(() => { if (!cache) el.innerHTML = `<div class="sechead"><h2>Pós-venda</h2></div><div class="empty small">Não consegui carregar os clientes. Recarregue a página.</div>`; });
  }
  const rePintar = () => document.querySelectorAll('.pv-box').forEach(pintar);
  document.addEventListener('click', e => {
    const b = e.target.closest('.pv-box [data-pvid]');
    if (!b) return;
    const d = (cache || []).find(x => x.id === b.dataset.pvid);
    if (!d) return;
    e.stopPropagation();
    cfg.openFicha(d.id, d.lista, d.reserva);
  }, true);

  /* ---------- lista na ficha da empresa ---------- */
  function ficha(d) {
    fichaDoc = d;
    noCache(d);
    const det = document.querySelector('#detail'), antes = document.querySelector('#detail #dWhy');
    let B = document.querySelector('#detail #pvBlk');
    if (!det || !antes) return;
    // Para cliente fechado, o pós-venda vem logo no alto da ficha.
    if (d.status !== 'fechado') { if (B) B.remove(); return; }
    if (!B) {
      B = document.createElement('section');
      B.className = 'blk pv-blk'; B.id = 'pvBlk';
      antes.after(B);
      B.addEventListener('change', e => {
        const cb = e.target.closest('[data-pvk]');
        if (cb) { marcar(cb.dataset.pvk, cb.checked); return; }
        const nt = e.target.closest('[data-pvnota]');
        if (nt) anotar(nt.dataset.pvnota, nt.value.trim());
      });
    } else if (B.contains(document.activeElement) && document.activeElement.matches('input[type=text]')) return;
    const t = tarefas(d), n = feitas(d);
    B.innerHTML = `<div class="hd"><h3>Pós-venda</h3><span class="pill ${n === TAREFAS.length ? 's-fechado' : 's-proposta'}">${n === TAREFAS.length ? 'Tudo entregue' : `${n} de ${TAREFAS.length} feitas`}</span></div>
      <p class="small muted" style="margin:0">Cliente fechado${d.statusEm ? ' em ' + data(d.statusEm) : ''}. Marque cada etapa quando estiver feita; a data fica guardada.</p>
      <ol class="pv-tarefas">${TAREFAS.map(([k, nome, dica, ex]) => {
        const x = t[k] || {};
        return `<li class="pv-t ${x.feito ? 'feita' : ''}">
          <label class="pv-ck"><input type="checkbox" data-pvk="${k}" ${x.feito ? 'checked' : ''}><span class="pv-tn">${esc(nome)}</span>${x.feito && x.em ? `<span class="pv-em">feito em ${data(x.em)}</span>` : ''}</label>
          <p class="pv-dica">${esc(dica)}${k === 'contrato' ? ' <a href="/empresa/">Abrir o contrato modelo</a>' : ''}</p>
          <input type="text" class="pv-nota" data-pvnota="${k}" value="${esc(x.nota || '')}" placeholder="${esc(ex)}" aria-label="Anotação: ${esc(nome)}">
        </li>`;
      }).join('')}</ol>`;
  }
  async function gravar(patch, msg) {
    const d = fichaDoc;
    if (!d || !cfg) return;
    try {
      await cfg.save(d.id, { posVenda: patch });
      const pv = { ...(d.posVenda || {}), tarefas: { ...tarefas(d) } };
      for (const [k, v] of Object.entries(patch.tarefas || {})) pv.tarefas[k] = { ...(pv.tarefas[k] || {}), ...v };
      noCache({ ...d, posVenda: pv });
      rePintar();
      if (msg) cfg.toast(msg);
    } catch (e) { cfg.toast('Não salvou: ' + (e && e.message || 'erro')); }
  }
  function marcar(k, feito) {
    const nome = (TAREFAS.find(x => x[0] === k) || [])[1] || '';
    gravar({ tarefas: { [k]: { feito, em: feito ? Date.now() : null } } }, feito ? `${nome}: feito` : `${nome}: desmarcado`);
  }
  const anotar = (k, nota) => gravar({ tarefas: { [k]: { nota } } }, 'Anotado');

  setInterval(() => { if (!document.hidden && document.querySelector('.pv-box')) buscar(true).then(rePintar).catch(() => {}); }, 120000);

  window.Posvenda = { init: c => { cfg = c; }, render, ficha, TAREFAS };
})();
