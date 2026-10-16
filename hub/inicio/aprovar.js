/* Aba "Aprovar" do canvas de prospecção: grade com 6 cards ao mesmo tempo.
   Módulo sem dependências. Toda a conversa com os dados passa pelo adaptador `cfg` (ver LEIA-ME.md):
   o mesmo código roda com o banco do artifact (db) e com o D1 do hub, só troca o adaptador.

   Regra de negócio (a mesma da aba Triagem):
     FAZER (✓, botão verde)    -> triagem "fazer" e, se o status era "novo", status "produzir" (= fila de desenvolvimento)
     DESCARTAR (X, vermelho)    -> triagem "descartar"
     TALVEZ (?, botão discreto) -> triagem "talvez" (volta depois no modo "Talvez")
   Cada decisão grava também aprovacao:{acao,em,por}. O card decidido sai e o próximo da fila entra no mesmo lugar. */
(function () {
"use strict";
const NS = window.Aprovar = {};
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = v => { if (v === null || v === undefined || v === "") return null; const n = Number(String(v).replace(",", ".")); return Number.isFinite(n) ? n : null; };
const siteUrl = s => { s = String(s || "").trim(); if (!s) return ""; return /^https?:\/\//i.test(s) ? s : "https://" + s; };
const host = s => { try { return new URL(siteUrl(s)).hostname.replace(/^www\./, ""); } catch { return String(s || ""); } };
function waUrl(d) {
  const c = d.contato || {}; let n = String(c.whatsapp || (d.extra || {}).whatsapp || "").replace(/\D/g, "");
  if (!n) { const t = String(c.telefone || "").replace(/\D/g, ""); if (t.length === 11 && t[2] === "9") n = t; }
  if (!n) return ""; if (n.length <= 11) n = "55" + n; return "https://wa.me/" + n;
}
const IC = {
  nope: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  like: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5l5 5L19.5 7"/></svg>',
  maybe: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.2 9a2.9 2.9 0 1 1 4.1 2.7c-.8.4-1.3 1.1-1.3 2v.6M12 17.6v.1"/></svg>',
  undo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7L4.5 11.5 9 16M5 11.5h8.5a5.5 5.5 0 0 1 0 11H11" transform="translate(0 -3)"/></svg>',
  zoom: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-6 6M4 20l6-6"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};
const MODOS = [["prints", "Com print"], ["todas", "Todas pendentes"], ["talvez", "Talvez"]];
const N = 6, OUT_MS = 520;

let cfg = null, root = null, grid = null;
const S = { modo: "todas", auto: true, hist: [], seen: new Set(), out: new Set(), slots: [], sel: 0, zoom: null, q: [], pv: new Map(), pp: new Map(), lista: null };

const docs = () => cfg.getDocs() || [];
const byId = id => docs().find(d => d.id === id);
const dayStart = () => { const t = new Date(); t.setHours(0, 0, 0, 0); return t.getTime(); };
function ago(ms) {
  if (!ms) return ""; const m = Math.max(0, Math.round((Date.now() - ms) / 60000));
  if (m < 1) return "agora"; if (m < 60) return "há " + m + " min"; const h = Math.round(m / 60); if (h < 24) return "há " + h + " h";
  const d = Math.round(h / 24); return "há " + d + (d === 1 ? " dia" : " dias");
}
const worst = (a, b) => (num((b.extra || {}).notaSite) ?? -1) - (num((a.extra || {}).notaSite) ?? -1) || String(a.nome || "").localeCompare(String(b.nome || ""), "pt");
const lugar = d => [d.cidade, (d.extra || {}).uf || d.uf].filter(Boolean).join("/");

/* ---------- fila e os 6 lugares da grade ---------- */
function pend(modo = S.modo) {
  const v = docs();
  let q;
  if (modo === "talvez") q = v.filter(d => d.triagem === "talvez" && !S.seen.has(d.id));
  else { q = v.filter(d => !d.triagem); if (modo === "prints") q = q.filter(d => d.temPrint); }
  return q.sort(worst);
}
const filaDev = () => (cfg.getFila ? cfg.getFila() : docs().filter(d => d.triagem === "fazer" && d.status === "produzir"))
  .slice().sort((a, b) => ((b.aprovacao || {}).em || b.atualizadoEm || 0) - ((a.aprovacao || {}).em || a.atualizadoEm || 0));
// Mantém cada card no seu lugar; só o lugar que vagou recebe o próximo da fila.
function fill() {
  S.q = pend(); const ok = new Set(S.q.map(d => d.id));
  const slots = S.slots.slice(0, N).map(id => id && (ok.has(id) || S.out.has(id)) ? id : null);
  const used = new Set(slots.filter(Boolean)), next = S.q.filter(d => !used.has(d.id));
  for (let i = 0; i < N; i++) if (!slots[i] && next.length) slots[i] = next.shift().id;
  while (slots.length && !slots[slots.length - 1]) slots.pop();
  S.slots = next.length ? slots : slots.filter(Boolean);
  S.sel = Math.max(0, Math.min(S.sel, S.slots.length - 1));
}
const restam = () => S.q.filter(d => !S.out.has(d.id)).length;

/* ---------- prints ---------- */
function loadPrint(d) {
  if (!d.temPrint || !cfg.getPrint) { S.pv.set(d.id, null); return; }
  if (S.pv.has(d.id) || S.pp.has(d.id)) return;
  S.pp.set(d.id, Promise.resolve().then(() => cfg.getPrint(d.id)).catch(() => null).then(v => {
    S.pv.set(d.id, v || null); S.pp.delete(d.id);
    root.querySelectorAll('[data-id="' + CSS.escape(d.id) + '"] .ap-media').forEach(m => { m.innerHTML = mediaHtml(d, m.classList.contains("big")); });
  }));
}

/* ---------- peças do card ---------- */
function stars(n) { const w = Math.max(0, Math.min(100, n / 5 * 100)).toFixed(0); return `<span class="ap-stars" aria-hidden="true">★★★★★<i style="width:${w}%">★★★★★</i></span>`; }
function scoreHtml(d) {
  const ns = num((d.extra || {}).notaSite);
  return ns == null ? "" : `<span class="ap-score ${ns >= 9 ? "red" : ns >= 7 ? "hot" : ""}" title="Nota do site, de 0 a 10: quanto maior, pior"><b>${esc(ns)}</b>/10</span>`;
}
function googleTxt(d) {
  const x = d.extra || {}, nota = num(x.notaGoogle), av = num(x.avaliacoes);
  return nota == null ? "" : `★ ${esc(nota.toFixed(1).replace(".", ","))}${av != null ? ` (${av})` : ""}`;
}
// big = versão ampliada (computador e celular lado a lado)
function mediaHtml(d, big) {
  const loaded = S.pv.has(d.id), p = S.pv.get(d.id) || null, x = d.extra || {};
  let badge = "", bad = false, body;
  if (!d.site) {
    const nota = num(x.notaGoogle), av = num(x.avaliacoes);
    badge = "Sem site"; bad = true;
    body = `<div class="ap-nosite"><strong>Não tem site</strong>${nota != null ? `<span>${stars(nota)} ${esc(nota.toFixed(1).replace(".", ","))}${av != null ? ` · ${av} avaliações` : ""}</span>` : "<span>Sem avaliações no Google</span>"}</div>`;
  } else if (p && p.erro) {
    badge = "Fora do ar"; bad = true;
    body = `<div class="ap-wait err"><strong>O site não abre</strong><span>${esc(p.erro)}</span></div>`;
  } else if (p && (p.d || p.m)) {
    badge = host(d.site);
    const ph = p.m ? `<div class="ap-phone"><img draggable="false" alt="${big ? "Site no celular" : ""}" src="${esc(p.m)}"></div>` : "";
    body = p.d
      ? `<div class="ap-shot"><img draggable="false" alt="Site atual de ${esc(d.nome)}" src="${esc(p.d)}"></div>${ph}`
      : `<div class="ap-ph-only">${ph}</div>`;
  } else if (d.temPrint && !loaded) {
    badge = host(d.site); body = `<div class="ap-wait"><div class="sp"></div><span>Carregando o print…</span></div>`;
  } else {
    badge = host(d.site); body = `<div class="ap-wait"><strong>Ainda sem print</strong><a href="${esc(siteUrl(d.site))}" target="_blank" rel="noopener">Abrir o site ↗</a></div>`;
  }
  return `${body}<span class="ap-badge${bad ? " bad" : ""}">${esc(badge)}</span>${big ? "" : scoreHtml(d)}${big ? "" : `<span class="ap-zi" aria-hidden="true">${IC.zoom}</span>`}`;
}
function actsHtml(big) {
  return `<div class="ap-acts${big ? " big" : ""}">
    <button class="ap-b nope" type="button" data-do="nope" title="Descartar (X)" aria-label="Descartar">${IC.nope}</button>
    <button class="ap-b maybe" type="button" data-do="maybe" title="Talvez (T)" aria-label="Talvez">${IC.maybe}</button>
    <button class="ap-b like" type="button" data-do="ok" title="Fazer o site (Enter)" aria-label="Fazer o site">${IC.like}</button></div>`;
}
function cardHtml(d) {
  const g = googleTxt(d);
  return `<div class="ap-media" data-act="zoom" title="Ver maior">${mediaHtml(d, false)}</div>
    <div class="ap-info"><div class="ap-name" title="${esc(d.nome)}">${esc(d.nome)}</div>
      <div class="ap-sub">${esc([lugar(d), d.segmento].filter(Boolean).join(" · ")) || "&nbsp;"}${g ? `<span class="g">${g}</span>` : ""}</div></div>
    ${actsHtml(false)}<div class="ap-out" aria-hidden="true"></div>`;
}
function zoomHtml(d) {
  const x = d.extra || {}, c = d.contato || {}, p = S.pv.get(d.id) || null;
  const chips = [];
  if (c.telefone) chips.push(`<a href="tel:${esc(String(c.telefone).replace(/[^\d+]/g, ""))}">${esc(c.telefone)}</a>`);
  const w = waUrl(d); if (w) chips.push(`<a href="${esc(w)}" target="_blank" rel="noopener">WhatsApp</a>`);
  if (x.instagram) { const ig = String(x.instagram); chips.push(`<a href="${esc(/^https?:/.test(ig) ? ig : "https://instagram.com/" + ig.replace(/^@/, ""))}" target="_blank" rel="noopener">Instagram</a>`); }
  if (x.maps) chips.push(`<a href="${esc(x.maps)}" target="_blank" rel="noopener">Maps</a>`);
  if (d.site) chips.push(`<a href="${esc(siteUrl(d.site))}" target="_blank" rel="noopener">Abrir site ↗</a>`);
  let why = String(d.notas || x.porQueMarca || "").replace(/^Problemas do site: |^Por que parece analógico: /, "").trim(); why = why.charAt(0).toUpperCase() + why.slice(1);
  const al = d.site && p && Array.isArray(p.sinais) ? p.sinais.slice(0, 6).map(s => `<span>${esc(s)}</span>`).join("") : "";
  const g = googleTxt(d);
  return `<div class="ap-zdlg" role="dialog" aria-label="${esc(d.nome)}" data-id="${esc(d.id)}">
    <button class="ap-zx" type="button" data-act="unzoom" aria-label="Fechar">${IC.x}</button>
    <div class="ap-media big">${mediaHtml(d, true)}</div>
    <div class="ap-zinfo">
      <div class="ap-zhead"><div class="ap-zname">${esc(d.nome)}</div>${scoreHtml(d)}</div>
      <div class="ap-sub">${esc([lugar(d), d.segmento].filter(Boolean).join(" · "))}${g ? `<span class="g">${g}</span>` : ""}</div>
      <div class="ap-chips">${chips.join("")}</div>
      ${al ? `<div class="ap-alerts">${al}</div>` : ""}
      <p class="ap-why">${why ? esc(why) : "Sem observações ainda."}</p>
      <button class="ap-lnk" type="button" data-act="ficha">Ver ficha completa →</button>
    </div>${actsHtml(true)}</div>`;
}

/* ---------- render ---------- */
function build() {
  root.innerHTML = `<div class="ap" id="apRoot">
    <div class="ap-bar"><div class="segc" id="apModes"></div><select id="apLista" aria-label="Lista de empresas"></select>
      <button class="btn sm ap-undo" type="button" data-do="undo" title="Desfazer a última decisão (Z)">${IC.undo}<span>Desfazer</span></button>
      <button class="btn sm ap-qbtn" type="button" id="apQBtn"></button>
      ${cfg.savePrint ? '<button class="btn sm" type="button" id="apImp">Importar prints</button>' : ""}
      <div class="ap-stats" id="apStats"></div></div>
    <div class="ap-main">
      <div class="ap-gridcol"><div class="ap-grid" id="apGrid"></div>
        <div class="ap-keys"><kbd>X</kbd> descartar · <kbd>Enter</kbd> fazer o site · <kbd>T</kbd> talvez · <kbd>Z</kbd> desfazer · <kbd>←</kbd><kbd>→</kbd> escolher o card · <kbd>Espaço</kbd> ver maior</div>
      </div>
      <aside class="ap-queue" aria-label="Fila de desenvolvimento"><div class="ap-qhead"><h3>Fila de desenvolvimento</h3><span class="n" id="apQn">0</span></div>
        <p class="ap-qsub">Quem você aprovou. O Claude monta o site na ordem de cima para baixo.</p><div class="ap-qlist" id="apQList"></div></aside>
    </div>
    <div class="ap-zoom" id="apZoom" hidden></div>
    <div class="ap-sheet" id="apSheet" hidden><div class="ap-dlg" role="dialog" aria-label="Importar prints">
      <h2>Importar prints</h2>
      <p>Escolha os arquivos que o computador gerou na pasta <code>prints</code>: <code>ID.d.jpg</code> (computador), <code>ID.m.jpg</code> (celular) e, se quiser, <code>prints.json</code> (sites que não abriram).</p>
      <label class="ap-drop" id="apDrop">Clique aqui ou solte os arquivos<input type="file" id="apFiles" multiple accept="image/*,.json" hidden></label>
      <div class="ap-log" id="apLog"></div>
      <div style="display:flex;justify-content:flex-end"><button class="btn" type="button" id="apImpClose">Fechar</button></div></div></div>
  </div>`;
  grid = root.querySelector("#apGrid");
}
function renderBar() {
  const v = docs(), todas = v.filter(d => !d.triagem), nPrints = todas.filter(d => d.temPrint).length;
  const cnt = { prints: nPrints, todas: todas.length, talvez: v.filter(d => d.triagem === "talvez").length };
  root.querySelector("#apModes").innerHTML = MODOS.map(([k, l]) => `<button class="chip" type="button" data-modo="${k}" aria-pressed="${S.modo === k}">${l}<span class="n">${cnt[k]}</span></button>`).join("");
  const sel = root.querySelector("#apLista"), L = cfg.lists(), cur = cfg.lista();
  if (sel.dataset.l !== cur || sel.options.length !== L.length) {
    sel.innerHTML = L.map(([k, l]) => `<option value="${esc(k)}">${esc(l)}</option>`).join(""); sel.dataset.l = cur;
  }
  sel.value = cur;
  const t0 = dayStart(), hoje = a => v.filter(d => d.aprovacao && d.aprovacao.acao === a && d.aprovacao.em >= t0).length;
  root.querySelector("#apStats").innerHTML = `<span>Restam <b>${restam()}</b></span><span>Hoje:</span><span class="okc" title="Aprovadas hoje">fazer <b>${hoje("ok")}</b></span><span title="Descartadas hoje">descartadas <b>${hoje("nope")}</b></span><span title="Talvez hoje">talvez <b>${hoje("maybe")}</b></span>`;
  const fila = filaDev();
  root.querySelector("#apQBtn").textContent = `Fila (${fila.length})`;
  root.querySelector("#apQn").textContent = fila.length;
  root.querySelector("#apQList").innerHTML = fila.length ? fila.slice(0, 60).map(d => `<div class="ap-qi"><button class="nm" type="button" data-ficha="${esc(d.id)}">${esc(d.nome)}</button>
      <small>${esc([d.cidade, ago((d.aprovacao || {}).em || d.atualizadoEm)].filter(Boolean).join(" · "))}</small>
      <button class="x" type="button" data-unfazer="${esc(d.id)}" title="Tirar da fila" aria-label="Tirar ${esc(d.nome)} da fila">${IC.x}</button></div>`).join("")
    + (fila.length > 60 ? `<div class="ap-qempty">+ ${fila.length - 60} mais antigas</div>` : "")
    : `<div class="ap-qempty">Ninguém na fila ainda. Clique no ✓ de um card.</div>`;
  root.querySelector(".ap-undo").disabled = !S.hist.length;
  const can = cfg.canWrite();
  root.querySelectorAll(".ap-acts .ap-b").forEach(b => { b.disabled = !can || (b.dataset.do === "maybe" && S.modo === "talvez"); });
}
function doneHtml() {
  const mais = MODOS.filter(([k]) => k !== S.modo && pend(k).length).map(([k, l]) => `<button class="btn sm" type="button" data-modo="${k}">${l} (${pend(k).length})</button>`).join("");
  return `<div class="ap-done"><h2>${cfg.loaded() ? "Acabaram as fichas" : "Carregando…"}</h2><p>${cfg.loaded()
    ? (S.modo === "prints" ? "Nenhuma ficha com print esperando. Importe os prints do computador ou veja as outras." : "Nenhuma empresa pendente neste modo desta lista.")
    : "Buscando as empresas."}</p><div class="ap-dr">${mais}</div></div>`;
}
function renderGrid() {
  if (!grid) return;
  if (!S.slots.length) { if (!grid.querySelector(".ap-done")) grid.innerHTML = doneHtml(); grid.classList.add("empty"); return; }
  if (grid.classList.contains("empty")) { grid.classList.remove("empty"); grid.innerHTML = ""; }
  for (let i = 0; i < N; i++) {
    let cell = grid.children[i];
    if (!cell) { cell = document.createElement("div"); cell.className = "ap-cell"; grid.appendChild(cell); }
    const id = S.slots[i] || "", c = cell.firstElementChild;
    if ((c ? c.dataset.id : "") === id) continue;
    cell.innerHTML = "";
    const d = id && byId(id); if (!d) continue;
    const a = document.createElement("article"); a.className = "ap-card" + (c || S.ready ? " enter" : ""); a.dataset.id = id;
    a.innerHTML = cardHtml(d); cell.appendChild(a); loadPrint(d);
  }
  S.ready = true;
  // adianta os prints dos próximos da fila
  const used = new Set(S.slots); S.q.filter(d => !used.has(d.id)).slice(0, 4).forEach(loadPrint);
  grid.querySelectorAll(".ap-card").forEach((c, i) => c.classList.toggle("sel", c.parentElement === grid.children[S.sel]));
  renderBar();
}
function render() {
  if (!root || !cfg) return;
  if (cfg.lista() !== S.lista) { S.lista = cfg.lista(); S.hist = []; S.seen = new Set(); S.out.clear(); S.slots = []; S.pv.clear(); S.pp.clear(); S.auto = true; S.ready = false; if (grid) grid.innerHTML = ""; }
  if (S.auto && cfg.loaded()) { S.modo = docs().some(d => !d.triagem && d.temPrint) ? "prints" : "todas"; S.auto = false; }
  fill(); renderGrid(); renderBar();
  if (S.zoom && !S.out.has(S.zoom) && !S.slots.includes(S.zoom)) closeZoom();
}
function resetGrid() { S.slots = []; S.out.clear(); S.sel = 0; S.ready = false; if (grid) grid.innerHTML = ""; }

/* ---------- ampliar um card ---------- */
function openZoom(id) {
  const d = byId(id); if (!d) return;
  S.zoom = id; const z = root.querySelector("#apZoom"); z.innerHTML = zoomHtml(d); z.hidden = false; loadPrint(d); renderBar();
}
function closeZoom() { S.zoom = null; const z = root.querySelector("#apZoom"); z.hidden = true; z.innerHTML = ""; }

/* ---------- decisões ---------- */
function apply(d, acao, slot) {
  const prev = { triagem: d.triagem || "", status: d.status || "", aprovacao: d.aprovacao || null };
  const patch = { aprovacao: { acao, em: Date.now(), por: (cfg.userId && cfg.userId()) || null } };
  patch.triagem = acao === "ok" ? "fazer" : acao === "nope" ? "descartar" : "talvez";
  if (acao === "ok" && (!d.status || d.status === "novo")) patch.status = "produzir";
  Object.assign(d, patch); cfg.save(d.id, patch);
  S.hist.push({ id: d.id, acao, prev, slot, statusMudou: "status" in patch }); S.seen.add(d.id);
}
function decide(id, acao) {
  if (!cfg.canWrite()) { cfg.toast("Você só pode ver esta lista; as decisões não são salvas."); return; }
  const d = id && byId(id); if (!d || S.out.has(id)) return;
  if (acao === "maybe" && S.modo === "talvez") return;
  const slot = S.slots.indexOf(id);
  S.out.add(id); apply(d, acao, slot);
  if (S.zoom === id) closeZoom();
  const card = grid.querySelector('.ap-card[data-id="' + CSS.escape(id) + '"]');
  if (card) { card.classList.add("out", acao); card.querySelector(".ap-out").innerHTML = acao === "ok" ? IC.like + "<span>Fazer</span>" : acao === "nope" ? IC.nope + "<span>Descartado</span>" : IC.maybe + "<span>Talvez</span>"; }
  fill(); renderBar();
  setTimeout(() => { S.out.delete(id); fill(); renderGrid(); }, OUT_MS);
}
function undo() {
  const h = S.hist.pop(); if (!h) return;
  const d = byId(h.id); if (!d) { renderBar(); return; }
  const patch = { triagem: h.prev.triagem, aprovacao: h.prev.aprovacao }; if (h.statusMudou) patch.status = h.prev.status || "novo";
  Object.assign(d, patch); cfg.save(d.id, patch); S.seen.delete(d.id); S.out.delete(d.id);
  if (S.modo === "prints" && !d.temPrint) { S.modo = "todas"; resetGrid(); }
  if (S.modo === "talvez" && d.triagem !== "talvez") { S.modo = "todas"; resetGrid(); }
  const i = h.slot >= 0 && h.slot < N ? h.slot : 0;
  while (S.slots.length < i) S.slots.push(null);
  S.slots[i] = d.id; S.sel = i;
  fill(); renderGrid();
}
function unfazer(id) {
  const d = byId(id); if (!d) return;
  const patch = { triagem: "", status: d.status === "produzir" ? "novo" : d.status, aprovacao: null };
  Object.assign(d, patch); cfg.save(id, patch); S.hist = S.hist.filter(h => h.id !== id); S.seen.delete(id);
  fill(); renderGrid();
  cfg.toast("Saiu da fila e voltou para as pendentes.");
}
function select(i) {
  if (!S.slots.length) return;
  S.sel = Math.max(0, Math.min(i, S.slots.length - 1));
  grid.querySelectorAll(".ap-card").forEach(c => c.classList.toggle("sel", c.parentElement === grid.children[S.sel]));
}
const cols = () => (getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length) || 3;

/* ---------- importar prints ---------- */
function toData(file, maxW, maxBytes) {
  return createImageBitmap(file).then(bm => {
    let w = Math.min(maxW, bm.width), q = 0.74;
    const tryOnce = () => new Promise((ok, no) => {
      const cv = document.createElement("canvas"); cv.width = w; cv.height = Math.round(bm.height * w / bm.width);
      cv.getContext("2d").drawImage(bm, 0, 0, cv.width, cv.height);
      cv.toBlob(b => b ? ok(b) : no(new Error("imagem inválida")), "image/jpeg", q);
    });
    const loop = async () => { let b = await tryOnce(); for (let i = 0; i < 6 && b.size * 1.37 > maxBytes; i++) { q = Math.max(0.4, q - 0.08); w = Math.round(w * 0.88); b = await tryOnce(); } return b; };
    return loop();
  }).then(b => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = () => no(r.error); r.readAsDataURL(b); }));
}
async function importFiles(files) {
  const log = root.querySelector("#apLog"), L = t => { log.textContent += t + "\n"; log.scrollTop = log.scrollHeight; };
  log.textContent = ""; const by = {}, bad = []; let manifest = null;
  for (const f of files) {
    if (/\.json$/i.test(f.name)) { try { manifest = JSON.parse(await f.text()); } catch { bad.push(f.name); } continue; }
    const m = f.name.match(/^(.+)\.(d|m)\.(jpe?g|png|webp)$/i); if (!m) { bad.push(f.name); continue; }
    (by[m[1]] = by[m[1]] || {})[m[2].toLowerCase()] = f;
  }
  (Array.isArray(manifest) ? manifest : (manifest && manifest.itens) || []).forEach(it => {
    if (!it || !it.id) return;
    if (it.erro) (by[it.id] = by[it.id] || {}).erro = String(it.erro).slice(0, 160);
    if (Array.isArray(it.sinais) && it.sinais.length && by[it.id]) by[it.id].sinais = it.sinais.slice(0, 6).map(x => String(x).slice(0, 60));
  });
  const ids = Object.keys(by); let ok = 0, sem = 0;
  L(ids.length + " empresas nos arquivos.");
  for (const id of ids) {
    const o = by[id];
    try {
      const obj = { em: Date.now() };
      if (o.d) obj.d = await toData(o.d, 1000, 150000);
      if (o.m) obj.m = await toData(o.m, 340, 70000);
      if (o.erro && !o.d) obj.erro = o.erro;
      if (o.sinais) obj.sinais = o.sinais;
      if (!obj.d && !obj.m && !obj.erro) continue;
      await cfg.savePrint(id, obj); S.pv.delete(id); ok++;
      if (ok % 5 === 0) L(ok + " de " + ids.length + "…");
    } catch (e) { sem++; L(id + ": " + (e && e.message || "não salvou")); }
  }
  if (bad.length) L("Ignorados (nome fora do padrão): " + bad.slice(0, 6).join(", ") + (bad.length > 6 ? "…" : ""));
  L("Pronto: " + ok + " importados" + (sem ? ", " + sem + " com problema" : "") + ".");
  S.auto = true; resetGrid(); render();
}

/* ---------- eventos ---------- */
function active() { return root && root.getClientRects().length > 0; }
function wire() {
  root.addEventListener("click", e => {
    const t = e.target;
    const m = t.closest("[data-modo]"); if (m) { S.modo = m.dataset.modo; S.auto = false; resetGrid(); render(); return; }
    const a = t.closest("[data-do]");
    if (a) {
      const k = a.dataset.do; if (k === "undo") { undo(); return; }
      const own = a.closest("[data-id]"); if (own) decide(own.dataset.id, k); return;
    }
    if (t.closest('[data-act="unzoom"]') || t.id === "apZoom") { closeZoom(); renderBar(); return; }
    if (t.closest('[data-act="ficha"]')) { const id = S.zoom; closeZoom(); if (id && cfg.openFicha) cfg.openFicha(id); return; }
    const z = t.closest('[data-act="zoom"]');
    if (z && !t.closest("a")) { const c = z.closest(".ap-card"); if (c && !S.out.has(c.dataset.id)) { select([...grid.children].indexOf(c.parentElement)); openZoom(c.dataset.id); } return; }
    const card = t.closest(".ap-card"); if (card && !t.closest("a,button")) { select([...grid.children].indexOf(card.parentElement)); return; }
    const f = t.closest("[data-ficha]"); if (f && cfg.openFicha) { cfg.openFicha(f.dataset.ficha); return; }
    const u = t.closest("[data-unfazer]"); if (u) { unfazer(u.dataset.unfazer); return; }
    if (t.closest("#apQBtn")) { root.querySelector("#apRoot").classList.toggle("q-open"); return; }
    if (t.closest("#apImp")) { root.querySelector("#apSheet").hidden = false; return; }
    if (t.closest("#apImpClose") || t.id === "apSheet") { root.querySelector("#apSheet").hidden = true; return; }
  });
  root.addEventListener("change", e => {
    if (e.target.id === "apLista") { resetGrid(); cfg.setLista(e.target.value); }
    if (e.target.id === "apFiles") { importFiles([...e.target.files]); e.target.value = ""; }
  });
  const drop = root.querySelector("#apDrop");
  ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("over"); }));
  ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("over"); }));
  drop.addEventListener("drop", e => importFiles([...e.dataTransfer.files]));
  document.addEventListener("keydown", e => {
    if (!active() || e.metaKey || e.ctrlKey || e.altKey || e.target.closest("input,select,textarea,[contenteditable]")) return;
    if (root.querySelector("#apSheet") && !root.querySelector("#apSheet").hidden) return;
    const k = e.key, cur = S.zoom || S.slots[S.sel]; let h = true;
    if (k === "Escape") { if (S.zoom) { closeZoom(); renderBar(); } else h = false; }
    else if (k === "x" || k === "X" || k === "Delete") decide(cur, "nope");
    else if (k === "Enter" || k === "v" || k === "V") { if (e.target.closest("button,a")) h = false; else decide(cur, "ok"); }
    else if (k === "t" || k === "T") decide(cur, "maybe");
    else if (k === "z" || k === "Z" || k === "Backspace") undo();
    else if (k === " ") { if (S.zoom) closeZoom(); else if (cur) openZoom(cur); renderBar(); }
    else if (S.zoom) h = false;
    else if (k === "ArrowRight") select(S.sel + 1); else if (k === "ArrowLeft") select(S.sel - 1);
    else if (k === "ArrowDown") select(S.sel + cols()); else if (k === "ArrowUp") select(S.sel - cols());
    else if (/^[1-6]$/.test(k)) select(+k - 1);
    else if (k === "o" || k === "O") { const d = byId(cur); if (d && d.site) window.open(siteUrl(d.site), "_blank", "noopener"); }
    else h = false;
    if (h) e.preventDefault();
  });
}

NS.init = function (c) { cfg = c; root = c.root; build(); wire(); render(); };
NS.render = render;
NS.show = function (on) { document.body.classList.toggle("ap-on", !!on); if (on) render(); else if (S.zoom) closeZoom(); };
NS._state = S;
})();
