// Lembretes e follow-up do canvas de prospecção (página inicial do hub).
// - Bloco "Hoje" na Visão geral, com todas as listas juntas (dados de /api/lembretes, src/lembretes.js):
//   retornos de hoje e atrasados, propostas e links sem resposta, e os próximos dias.
// - Para cada empresa: mensagem de WhatsApp pronta conforme a situação (abre o wa.me já com o texto; nada é enviado sozinho)
//   e "Registrar resultado": como foi o contato, nota rápida e a data do próximo contato.
// - O mesmo par de botões aparece na ficha da empresa (aba Empresas e CRM).
// - No app instalado, o ícone mostra quantos retornos são para hoje.
// A página liga o módulo com Lembretes.init({...}) e chama Lembretes.render(el) e Lembretes.ficha(doc).
(() => {
  // Quantos dias sem resposta até a empresa aparecer como "parada".
  const DIAS_PROPOSTA = 3, DIAS_LINK = 2;
  const ASSINATURA = 'João, da Overtus';
  let cfg = null, cache = null, carregando = null, ultimo = 0, alvo = null, fichaDoc = null;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const hoje = () => iso(new Date());
  const ddmm = s => s ? s.slice(8, 10) + '/' + s.slice(5, 7) : '';
  const diasEntre = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / 864e5);
  const diasDesde = ms => ms ? Math.floor((Date.now() - ms) / 864e5) : null;
  // Daqui a n dias; sábado e domingo passam para segunda.
  function daqui(n) {
    const d = new Date(); d.setDate(d.getDate() + n);
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    return iso(d);
  }
  function waNumero(d) {
    const c = d.contato || {};
    let n = String(c.whatsapp || (d.extra || {}).whatsapp || '').replace(/\D/g, '');
    if (!n) { const t = String(c.telefone || '').replace(/\D/g, ''); if (t.length === 11 && t[2] === '9') n = t; }
    if (!n) return '';
    return n.length <= 11 ? '55' + n : n;
  }
  const telefone = d => String((d.contato || {}).telefone || '').replace(/[^\d+]/g, '');
  const SLABEL = () => (cfg && cfg.status) || {};
  const LLABEL = () => (cfg && cfg.listas) || {};

  /* ---------- mensagens de WhatsApp ---------- */
  function primeiroNome(d) {
    const n = String((d.contato || {}).nome || '').split(/[,(\-–—/]/)[0].trim().split(/\s+/)[0] || '';
    return /^(sr|sra|dr|dra)\.?$/i.test(n) ? String(d.contato.nome).split(/[,(\-–—/]/)[0].trim().split(/\s+/).slice(0, 2).join(' ') : n;
  }
  function linkPreview(d) {
    const p = d.proposta || {}, c = d.contato || {};
    const u = p.urlA || c.preview || (d.subdominio || (d.enr || {}).subdominio ? `${d.subdominio || d.enr.subdominio}.overtus.com.br` : '');
    return u ? (/^https?:\/\//.test(u) ? u : 'https://' + u.replace(/^\/+/, '')) : '';
  }
  const SITUACOES = [
    ['sem', 'Sem resposta'],
    ['link', 'Link enviado'],
    ['proposta', 'Proposta enviada'],
    ['retorno', 'Retorno combinado'],
    ['script', 'Do script da empresa'],
  ];
  function situacaoDe(d) {
    if (d.status === 'proposta') return 'proposta';
    if (d.status === 'enviado') return 'link';
    if (d.status === 'conversa') return 'retorno';
    if (d.proxData && /retorn|combin|ligar depois|pediu/i.test(d.proxAcao || '')) return 'retorno';
    return 'sem';
  }
  function mensagem(d, sit) {
    const h = new Date().getHours();
    const saud = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    const nome = primeiroNome(d), oi = nome ? `${saud}, ${nome}!` : `${saud}!`;
    const emp = d.nome || 'sua empresa', link = linkPreview(d), p = d.proposta || {};
    const fup = d.followup || ((d.enr || {}).script || {}).followup || '';
    if (sit === 'script' && fup) return fup;
    if (sit === 'proposta') {
      const vs = [p.urlA && `Versão A: ${p.urlA}`, p.urlB && `Versão B: ${p.urlB}`].filter(Boolean).join('\n');
      return `${oi} Aqui é o ${ASSINATURA}.\nPassando para saber se você conseguiu ver as duas versões do site da ${emp}.` +
        (vs ? `\n${vs}` : '') + `\nQual delas combina mais com vocês? Se tiver qualquer dúvida, respondo por aqui mesmo.`;
    }
    if (sit === 'link') {
      return `${oi} Aqui é o ${ASSINATURA}.\nConseguiu dar uma olhada na prévia do site novo da ${emp}?` +
        (link ? `\n${link}` : '') + `\nSe quiser mudar alguma coisa, eu ajusto. Posso te ligar 5 minutos para ouvir o que achou?`;
    }
    if (sit === 'retorno') {
      return `${oi} Aqui é o ${ASSINATURA}.\nComo combinamos, estou retornando sobre o site da ${emp}.` +
        (link ? `\nA prévia continua no ar: ${link}` : '') + `\nPodemos falar agora ou prefere outro horário?`;
    }
    return `${oi} Aqui é o ${ASSINATURA}.\nTentei falar com vocês por telefone. ` +
      (link ? `Preparei uma prévia de site novo para a ${emp}:\n${link}\n` : `Montei uma proposta de site novo para a ${emp}. `) +
      `Posso te mostrar em 5 minutos? Qual o melhor horário para eu ligar?`;
  }

  /* ---------- quem precisa de atenção ---------- */
  function grupos(docs) {
    const t = hoje(), semana = daqui(7);
    const atras = [], parados = [], proximos = [];
    for (const d of docs) {
      if (d.proxData && d.proxData <= t) { atras.push(d); continue; }
      if (d.proxData && d.proxData > t) { if (d.proxData <= semana) proximos.push(d); continue; }
      const desde = diasDesde(d.statusEm || d.contatoEm || d.atualizadoEm);
      if (d.status === 'proposta' && (desde == null || desde >= DIAS_PROPOSTA)) parados.push({ ...d, _dias: desde });
      else if (d.status === 'enviado' && (desde == null || desde >= DIAS_LINK)) parados.push({ ...d, _dias: desde });
      else if (d.status === 'conversa' && (desde == null || desde >= DIAS_PROPOSTA)) parados.push({ ...d, _dias: desde });
    }
    atras.sort((a, b) => a.proxData < b.proxData ? -1 : 1);
    parados.sort((a, b) => (b._dias ?? 999) - (a._dias ?? 999));
    proximos.sort((a, b) => a.proxData < b.proxData ? -1 : 1);
    return { atras, parados, proximos };
  }
  function porque(d, tipo) {
    const t = hoje();
    if (tipo === 'atras') {
      const n = diasEntre(d.proxData, t);
      const quando = n <= 0 ? 'hoje' : n === 1 ? 'atrasado 1 dia' : `atrasado ${n} dias`;
      return [d.proxAcao || 'Retorno combinado', quando, n > 0];
    }
    if (tipo === 'parado') {
      const o = d.status === 'proposta' ? 'Proposta sem resposta' : d.status === 'enviado' ? 'Link enviado sem resposta' : 'Conversa parada';
      return [o, d._dias == null ? 'sem data' : `há ${d._dias} dias`, true];
    }
    return [d.proxAcao || SLABEL()[d.status] || 'Retorno', ddmm(d.proxData), false];
  }
  function linha(d, tipo) {
    const [o, q, quente] = porque(d, tipo);
    const wa = waNumero(d), tel = telefone(d);
    const lista = d.lista && d.lista !== 'minhas' ? LLABEL()[d.lista] || d.lista : '';
    return `<div class="lb-item" data-lid="${esc(d.id)}">
      <button class="lb-nome" type="button" data-lb="abrir"><span class="tn">${esc(d.nome)}</span>
        <span class="ts">${esc(o)}${lista ? ' · ' + esc(lista) : ''}</span></button>
      <span class="due ${quente ? 'late' : ''}">${esc(q)}</span>
      <span class="lb-acoes">
        <button class="lb-b wa" type="button" data-lb="wa" title="${wa ? 'Mensagem de WhatsApp pronta' : 'Mensagem pronta (sem WhatsApp na ficha)'}" aria-label="WhatsApp">${ICO.wa}</button>
        ${tel ? `<a class="lb-b" href="tel:${esc(tel)}" title="Ligar ${esc(d.contato.telefone)}" aria-label="Ligar">${ICO.tel}</a>` : ''}
        <button class="lb-b" type="button" data-lb="res" title="Registrar resultado" aria-label="Registrar resultado">${ICO.ok}</button>
      </span></div>`;
  }
  const ICO = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2z"/></svg>',
    tel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    ok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>',
  };

  async function buscar(forcar) {
    if (!forcar && cache && Date.now() - ultimo < 60000) return cache;
    if (carregando) return carregando;
    carregando = fetch('/api/lembretes', { credentials: 'same-origin' }).then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(j => { cache = j.docs || []; ultimo = Date.now(); return cache; })
      .finally(() => { carregando = null; });
    return carregando;
  }
  function badge(n) {
    try { if (navigator.setAppBadge) n ? navigator.setAppBadge(n) : navigator.clearAppBadge(); } catch {}
  }

  function pintar(el) {
    if (!el || !el.isConnected) return;
    if (!cache) { el.innerHTML = `<div class="sechead"><h2>Hoje</h2></div><div class="empty small">Carregando os retornos…</div>`; return; }
    const g = grupos(cache), total = g.atras.length + g.parados.length;
    badge(g.atras.length);
    const sec = (titulo, arr, tipo, vazio) => arr.length
      ? `<h3 class="lb-sec">${titulo}<span>${arr.length}</span></h3>${arr.slice(0, 40).map(d => linha(d, tipo)).join('')}`
      : (vazio ? `<p class="lb-vazio">${vazio}</p>` : '');
    el.innerHTML = `<div class="sechead"><h2>Hoje</h2><span>${total ? `${total} para resolver · todas as listas` : 'Todas as listas'}</span></div>
      <div class="lb">` +
      sec('Ligar ou retornar', g.atras, 'atras', 'Nenhum retorno para hoje.') +
      sec('Esperando resposta', g.parados, 'parado', '') +
      sec('Próximos dias', g.proximos, 'prox', g.atras.length || g.parados.length ? '' : 'Ao registrar o resultado de um contato, marque a data do próximo e ele aparece aqui.') +
      `</div>`;
  }
  function render(el) {
    if (!el) return;
    el.classList.add('lb-box');
    pintar(el);
    buscar().then(() => pintar(el)).catch(() => { if (!cache) el.innerHTML = `<div class="sechead"><h2>Hoje</h2></div><div class="empty small">Não consegui carregar os retornos. Recarregue a página.</div>`; });
  }
  function rePintar() { document.querySelectorAll('.lb-box').forEach(pintar); }
  setInterval(() => { if (!document.hidden && document.querySelector('.lb-box')) buscar(true).then(rePintar).catch(() => {}); }, 120000);

  /* ---------- janela: WhatsApp e resultado ---------- */
  // Cada resultado sugere a etapa e a data do próximo contato; dá para mudar antes de salvar.
  // O 4º item é o que vai para "ligacoes" (lido pelo painel Resultados); vazio quando não foi ligação.
  const RESULTADOS = [
    ['conversou', 'Conversamos', d => ({ status: d.status === 'proposta' ? 'proposta' : 'conversa', dias: 3, acao: 'Retornar a conversa' }), 'atendeu'],
    ['naoatendeu', 'Não atendeu', d => ({ status: ['novo', 'produzir', ''].includes(d.status || '') ? 'ligar' : d.status, dias: 1, acao: 'Tentar de novo' }), 'nao_atendeu'],
    ['retornar', 'Pediu para retornar', d => ({ status: d.status === 'novo' ? 'ligar' : d.status, dias: 2, acao: 'Retorno combinado' }), 'atendeu'],
    ['mensagem', 'Mandei mensagem', d => ({ status: ['novo', 'produzir', 'ligar', ''].includes(d.status || '') ? 'enviado' : d.status, dias: DIAS_LINK, acao: 'Ver se respondeu' }), ''],
    ['proposta', 'Mandei a proposta', () => ({ status: 'proposta', dias: DIAS_PROPOSTA, acao: 'Cobrar resposta da proposta' }), ''],
    ['fechou', 'Fechou', () => ({ status: 'fechado', dias: null, acao: '' }), ''],
    ['perdido', 'Sem interesse', () => ({ status: 'perdido', dias: null, acao: '' }), ''],
  ];
  function janela() {
    let dl = document.getElementById('lbDlg');
    if (dl) return dl;
    dl = document.createElement('dialog');
    dl.id = 'lbDlg'; dl.className = 'lb-dlg';
    dl.innerHTML = `<form method="dialog" class="lb-f">
      <div class="lb-top"><div><h2 id="lbNome"></h2><p id="lbSub"></p></div><button class="btn sm" value="fechar" type="submit">Fechar</button></div>
      <section id="lbWaSec"><h3>Mensagem de WhatsApp</h3>
        <div class="lb-sits" id="lbSits"></div>
        <textarea id="lbMsg" rows="6" aria-label="Mensagem"></textarea>
        <div class="lb-row"><a class="btn primary" id="lbWa" target="_blank" rel="noopener">Abrir no WhatsApp</a><button class="btn" type="button" id="lbCopiar">Copiar</button><span class="lb-dica" id="lbWaDica"></span></div>
      </section>
      <section><h3>Como foi o contato</h3>
        <div class="lb-sits" id="lbRes"></div>
        <div class="lb-cols">
          <label class="f">Etapa<select id="lbStatus"></select></label>
          <label class="f">Próximo contato<input type="date" id="lbData"></label>
          <div class="f"><span>Atalhos</span><div class="lb-row tight"><button class="btn sm" type="button" data-d="1">Amanhã</button><button class="btn sm" type="button" data-d="3">3 dias</button><button class="btn sm" type="button" data-d="7">1 semana</button><button class="btn sm" type="button" data-d="">Sem data</button></div></div>
          <label class="f wide">Próximo passo<input type="text" id="lbAcao" placeholder="Ex.: ligar para o dono depois das 16h"></label>
          <label class="f wide">Nota rápida (vai para o histórico)<input type="text" id="lbNota" placeholder="Ex.: gostou da versão B, vai falar com o sócio"></label>
        </div>
        <div class="lb-row"><button class="btn primary" type="button" id="lbSalvar">Salvar</button><span class="lb-dica" id="lbSalvo"></span></div>
      </section></form>`;
    document.body.appendChild(dl);
    const $ = s => dl.querySelector(s);
    $('#lbStatus').innerHTML = Object.entries(SLABEL()).map(([k, l]) => `<option value="${k}">${esc(l)}</option>`).join('');
    dl.addEventListener('click', e => {
      if (e.target === dl) { dl.close(); return; }
      const s = e.target.closest('[data-sit]');
      if (s) { escolherSit(s.dataset.sit); return; }
      const r = e.target.closest('[data-res]');
      if (r) { escolherRes(r.dataset.res); return; }
      const d = e.target.closest('[data-d]');
      if (d) { $('#lbData').value = d.dataset.d ? daqui(Number(d.dataset.d)) : ''; }
    });
    $('#lbMsg').addEventListener('input', atualizarWa);
    $('#lbCopiar').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText($('#lbMsg').value); cfg.toast('Mensagem copiada'); }
      catch { $('#lbMsg').select(); document.execCommand('copy'); cfg.toast('Mensagem copiada'); }
    });
    // Depois de abrir o WhatsApp, já deixa marcado "Mandei mensagem" para só conferir e salvar.
    $('#lbWa').addEventListener('click', () => { if (!alvo.res) escolherRes('mensagem'); });
    $('#lbSalvar').addEventListener('click', salvar);
    return dl;
  }
  function escolherSit(k) {
    const dl = janela();
    alvo.sit = k;
    dl.querySelectorAll('[data-sit]').forEach(b => b.setAttribute('aria-pressed', b.dataset.sit === k));
    dl.querySelector('#lbMsg').value = mensagem(alvo.d, k);
    atualizarWa();
  }
  function atualizarWa() {
    const dl = janela(), n = waNumero(alvo.d), a = dl.querySelector('#lbWa');
    const txt = encodeURIComponent(dl.querySelector('#lbMsg').value);
    a.href = n ? `https://wa.me/${n}?text=${txt}` : `https://wa.me/?text=${txt}`;
    dl.querySelector('#lbWaDica').textContent = n ? '' : 'Sem WhatsApp na ficha: o WhatsApp abre para você escolher o contato.';
  }
  function escolherRes(k) {
    const dl = janela(), r = RESULTADOS.find(x => x[0] === k);
    alvo.res = k;
    dl.querySelectorAll('[data-res]').forEach(b => b.setAttribute('aria-pressed', b.dataset.res === k));
    const s = r[2](alvo.d);
    dl.querySelector('#lbStatus').value = s.status || 'novo';
    dl.querySelector('#lbData').value = s.dias == null ? '' : daqui(s.dias);
    dl.querySelector('#lbAcao').value = s.acao;
  }
  function abrir(d, foco) {
    if (!cfg) return;
    const dl = janela(), $ = s => dl.querySelector(s);
    alvo = { d, sit: null, res: null };
    $('#lbNome').textContent = d.nome || '';
    const c = d.contato || {};
    $('#lbSub').textContent = [c.nome, c.telefone, d.cidade, SLABEL()[d.status] || 'Novo'].filter(Boolean).join(' · ');
    const fup = d.followup || ((d.enr || {}).script || {}).followup;
    $('#lbSits').innerHTML = SITUACOES.filter(([k]) => k !== 'script' || fup)
      .map(([k, l]) => `<button class="chip" type="button" data-sit="${k}">${l}</button>`).join('');
    $('#lbRes').innerHTML = RESULTADOS.map(([k, l]) => `<button class="chip" type="button" data-res="${k}">${l}</button>`).join('');
    $('#lbStatus').value = d.status || 'novo';
    $('#lbData').value = d.proxData && d.proxData > hoje() ? d.proxData : '';
    $('#lbAcao').value = d.proxAcao || '';
    $('#lbNota').value = '';
    $('#lbSalvo').textContent = '';
    escolherSit(situacaoDe(d));
    dl.showModal();
    (foco === 'res' ? $('#lbRes .chip') : $('#lbWa')).focus();
    if (foco === 'res') $('#lbRes').scrollIntoView({ block: 'nearest' });
  }
  async function salvar() {
    const dl = janela(), $ = s => dl.querySelector(s), d = alvo.d;
    const status = $('#lbStatus').value, data = $('#lbData').value, acao = $('#lbAcao').value.trim(), nota = $('#lbNota').value.trim();
    const r = RESULTADOS.find(x => x[0] === alvo.res);
    const agora = Date.now(), n = new Date();
    const patch = { proxData: data, proxAcao: data ? acao : (acao || ''), contatoEm: agora };
    if (status !== (d.status || 'novo')) { patch.status = status; patch.statusEm = agora; }
    if (r && r[3]) patch.ligacoes = [...(Array.isArray(d.ligacoes) ? d.ligacoes : []), { em: agora, resultado: r[3] }];
    const texto = [r && r[1], nota].filter(Boolean).join(': ');
    if (texto) {
      const linhaH = `${String(n.getDate()).padStart(2, '0')}/${String(n.getMonth() + 1).padStart(2, '0')}: ${texto}`;
      const h = String((d.contato || {}).historico || '').trim();
      patch.contato = { historico: h ? linhaH + '\n' + h : linhaH };
    }
    $('#lbSalvar').disabled = true;
    try {
      await cfg.save(d.id, patch);
      // Mostra na hora, sem esperar a próxima consulta.
      if (cache) {
        const i = cache.findIndex(x => x.id === d.id);
        const novo = { ...d, ...patch, status: patch.status || d.status, contato: { ...(d.contato || {}), ...(patch.contato || {}) } };
        const fora = ['fechado', 'perdido'].includes(novo.status) || (!novo.proxData && !['enviado', 'proposta', 'conversa'].includes(novo.status));
        if (i >= 0) { if (fora) cache.splice(i, 1); else cache[i] = novo; } else if (!fora) cache.push(novo);
      }
      rePintar();
      dl.close();
      cfg.toast(data ? `Salvo. Próximo contato em ${ddmm(data)}` : 'Salvo');
      buscar(true).then(rePintar).catch(() => {});
    } catch (e) { $('#lbSalvo').textContent = 'Não salvou: ' + (e && e.message || 'erro'); }
    finally { $('#lbSalvar').disabled = false; }
  }

  // Cliques no bloco "Hoje".
  document.addEventListener('click', e => {
    const b = e.target.closest('.lb-box [data-lb]');
    if (!b) return;
    const id = b.closest('[data-lid]').dataset.lid, d = (cache || []).find(x => x.id === id);
    if (!d) return;
    e.stopPropagation();
    if (b.dataset.lb === 'abrir') cfg.openFicha(d.id, d.lista);
    else abrir(d, b.dataset.lb === 'res' ? 'res' : 'wa');
  }, true);

  // Na ficha da empresa: dois botões logo abaixo do nome.
  function ficha(d) {
    fichaDoc = d;
    const head = document.querySelector('#detail .dhead');
    if (!head || document.querySelector('#detail .lb-ficha')) return;
    const w = document.createElement('span');
    w.className = 'lb-ficha';
    w.innerHTML = `<button class="btn sm" type="button" data-lf="wa">WhatsApp pronto</button><button class="btn sm" type="button" data-lf="res">Registrar resultado</button>`;
    w.addEventListener('click', e => { const b = e.target.closest('[data-lf]'); if (b && fichaDoc) abrir(fichaDoc, b.dataset.lf); });
    head.after(w);
  }

  window.Lembretes = { init: c => { cfg = c; }, render, ficha, abrir };
})();
