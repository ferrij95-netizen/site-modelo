// Ponte entre a página do canvas (feita como artifact do claude.ai) e o banco do hub.
// A página chama claude.use("db") como no claude.ai; aqui isso vira chamadas a /api/empresas,
// que o worker grava no D1 "prospeccao". Assim o código da página continua o mesmo.
(() => {
  const POLL = 20000;
  const api = (path, opt) => fetch(path, { credentials: 'same-origin', ...opt }).then(async r => {
    if (r.status === 401 || r.redirected && /\/entrar\//.test(r.url)) { location.href = '/entrar/'; throw { code: 'session_expired' }; }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw { code: j.code || 'erro', message: j.erro || 'erro ' + r.status };
    return j;
  });
  const novoId = () => 'm-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  // Uma assinatura por lista aberta: guarda os documentos e avisa a página quando algo muda.
  const assinaturas = new Set();
  function emitir(a) {
    const docs = [...a.docs.values()].map(d => ({ id: d.id, data: () => { const { id, ...r } = d; return r; } }));
    try { a.cb({ docs, size: docs.length }); } catch (e) { console.error(e); }
  }
  async function puxar(a) {
    try {
      const j = await api(`/api/empresas?lista=${encodeURIComponent(a.lista)}${a.desde ? '&desde=' + a.desde : ''}`);
      if (!a.ativo) return;
      if (!a.desde) a.docs.clear();
      for (const d of j.docs) a.docs.set(d.id, d);
      for (const id of j.apagados || []) a.docs.delete(id);
      a.desde = j.agora;
      if (j.docs.length || (j.apagados || []).length || !a.carregou) { a.carregou = true; emitir(a); }
    } catch (e) { if (a.err && !a.carregou) a.err(e); }
  }
  // Depois de gravar, a lista da tela já reflete a mudança sem esperar a próxima consulta.
  function local(id, fn) {
    for (const a of assinaturas) {
      const atual = a.docs.get(id);
      const novo = fn(atual);
      if (novo && novo.lista === a.lista) a.docs.set(id, novo); else a.docs.delete(id);
      if (atual || novo) emitir(a);
    }
  }
  setInterval(() => { if (!document.hidden) assinaturas.forEach(puxar); }, POLL);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) assinaturas.forEach(puxar); });

  function ref(id = novoId()) {
    const url = '/api/empresas/' + encodeURIComponent(id);
    const enviar = (op, data) => api(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op, data }) });
    return {
      id,
      async update(patch) { const j = await enviar('update', patch); local(id, () => ({ id, ...j.doc })); },
      async set(body) { const j = await enviar('set', body); local(id, () => ({ id, ...j.doc })); },
      async delete() { await enviar('delete'); local(id, () => null); },
      async get() { const j = await api(url); return { id, exists: !!j.doc, data: () => j.doc }; },
    };
  }
  const colecao = {
    doc: ref,
    where(campo, op, valor) {
      if (campo !== 'lista' || op !== '==') throw new Error('Só o filtro por lista é suportado');
      return {
        onSnapshot(cb, err) {
          const a = { lista: valor, cb, err, docs: new Map(), desde: 0, ativo: true, carregou: false };
          assinaturas.add(a); puxar(a);
          return () => { a.ativo = false; assinaturas.delete(a); };
        },
      };
    },
  };
  const db = { collection: nome => { if (nome !== 'empresas') throw new Error('Coleção desconhecida: ' + nome); return colecao; } };
  const user = { can: async () => true };
  // "sample" (análise automática pelo Claude) só existe dentro do claude.ai; aqui fica desligado.
  window.claude = { use: async nome => ({ db, user })[nome] || null };
})();
