/* Aba "Aprovar" (estilo Tinder) do canvas de prospecção.
   Módulo sem dependências. Toda a conversa com os dados passa pelo adaptador `cfg` (ver LEIA-ME.md):
   o mesmo código roda com o banco do artifact (db) e com o D1 do hub, só troca o adaptador.

   Regra de negócio (a mesma da aba Triagem):
     FAZER (→, botão verde)  -> triagem "fazer" e, se o status era "novo", status "produzir" (= fila de desenvolvimento)
     NOPE  (←, botão vermelho) -> triagem "descartar"
     TALVEZ (↑, botão azul)  -> triagem "talvez" (volta depois no modo "Talvez")
   Cada decisão grava também aprovacao:{acao,em,por}. */
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
  maybe: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9L3.5 9.7l5.9-.8z"/></svg>',
  undo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7L4.5 11.5 9 16M5 11.5h8.5a5.5 5.5 0 0 1 0 11H11" transform="translate(0 -3)"/></svg>',
  open: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};
const PIN = '<svg class="pin" viewBox="0 0 30 40" aria-hidden="true"><path d="M15 0C6.7 0 0 6.6 0 14.8 0 25.5 15 40 15 40s15-14.500 15-25.200C30 6.600 23.300 0 15 0z" fill="#ea4335"/><circle cx="15" cy="14.500" r="5.500" fill="#b31412"/></svg>';
const MODOS = [["prints", "Com print"], ["todas", "Todas pendentes"], ["talvez", "Talvez"]];
const COLORS = ["#fd267a", "#ff6036", "#ffd24a", "#46c487", "#5ab0ff", "#ffffff"];

let cfg = null, root = null, stage = null;
const S = { modo: "todas", auto: true, hist: [], seen: new Set(), busy: false, dirty: false, drag: null, streak: 0, q: [], pv: new Map(), pp: new Map(), lista: null };

const docs = () => cfg.getDocs() || [];
const byId = id => docs().find(d => d.id === id);
const dayStart = () => { const t = new Date(); t.setHours(0, 0, 0, 0); return t.getTime(); };
function ago(ms) {
  if (!ms) return ""; const m = Math.max(0, Math.round((Date.now() - ms) / 60000));
  if (m < 1) return "agora"; if (m < 60) return "há " + m + " min"; const h = Math.round(m / 60); if (h < 24) return "há " + h + " h";
  const d = Math.round(h / 24); return "há " + d + (d === 1 ? " dia" : " dias");
}
const worst = (a, b) => (num((b.extra || {}).notaSite) ?? -1) - (num((a.extra || {}).notaSite) ?? -1) || String(a.nome || "").localeCompare(String(b.nome || ""), "pt");

/* ---------- fila de cartas ---------- */
function pend(modo = S.modo) {
  const v = docs();
  let q;
  if (modo === "talvez") q = v.filter(d => d.triagem === "talvez" && !S.seen.has(d.id));
  else { q = v.filter(d => !d.triagem); if (modo === "prints") q = q.filter(d => d.temPrint); }
  return q.sort(worst);
}
const filaDev = () => (cfg.getFila ? cfg.getFila() : docs().filter(d => d.triagem === "fazer" && d.status === "produzir"))
  .slice().sort((a, b) => ((b.aprovacao || {}).em || b.atualizadoEm || 0) - ((a.aprovacao || {}).em || a.atualizadoEm || 0));

/* ---------- prints ---------- */
function loadPrint(d) {
  if (!d.temPrint || !cfg.getPrint) { S.pv.set(d.id, null); return; }
  if (S.pv.has(d.id) || S.pp.has(d.id)) return;
  S.pp.set(d.id, Promise.resolve().then(() => cfg.getPrint(d.id)).catch(() => null).then(v => {
    S.pv.set(d.id, v || null); S.pp.delete(d.id);
    const c = stage && stage.querySelector('.ap-card[data-id="' + CSS.escape(d.id) + '"]'); if (c) paintMedia(c);
  }));
}

/* ---------- peças da carta ---------- */
function slidesFor(d, p) {
  if (!d.site) return ["google"];
  const s = ["site"]; if (p && p.m && !p.erro) s.push("cel"); s.push("google"); return s;
}
function stars(n) { const w = Math.max(0, Math.min(100, n / 5 * 100)).toFixed(0); return `<span class="ap-stars" aria-hidden="true">★★★★★<i style="width:${w}%">★★★★★</i></span>`; }
function googleHtml(d) {
  const x = d.extra || {}, c = d.contato || {}, nota = num(x.notaGoogle), av = num(x.avaliacoes);
  const rate = nota != null
    ? `<b>${nota.toFixed(1).replace(".", ",")}</b>${stars(nota)}${av != null ? `<span>(${av})</span>` : ""}`
    : `<span>Sem avaliações no Google</span>`;
  const end = [d.cidade, x.uf || d.uf].filter(Boolean).join(" - ");
  return `<div class="ap-slide ap-g"><div class="ap-gmap">${PIN}<small>Montado com os dados do Google Maps</small></div>
    <div class="ap-gpanel"><h4>${esc(d.nome)}</h4>
      <div class="ap-grate">${rate}</div>
      <div class="ap-gcat">${esc([d.segmento, end].filter(Boolean).join(" · "))}</div>
      <div class="ap-gbtns"><span>Rotas</span><span>Ligar</span><span class="${d.site ? "" : "off"}">Site</span></div>
      <div class="ap-grow end"><i>Endereço</i><span>${esc(end || "não informado")}</span></div>
      <div class="ap-grow tel"><i>Telefone</i><span>${esc(c.telefone || "não informado")}</span></div>
      <div class="ap-grow ${d.site ? "" : "red"}"><i>Site</i><span>${d.site ? esc(host(d.site)) : "Não tem site"}</span></div>
    </div></div>`;
}
function slideHtml(kind, d, p, loaded) {
  if (kind === "google") return googleHtml(d);
  if (kind === "cel") return `<div class="ap-slide ap-ph-only"><div class="ap-phone"><img draggable="false" alt="Site no celular" src="${esc(p.m)}"></div></div>`;
  // site
  if (p && p.erro) return `<div class="ap-slide"><div class="ap-wait err"><strong>O site não abre</strong><span>${esc(p.erro)}</span><a href="${esc(siteUrl(d.site))}" target="_blank" rel="noopener">Tentar abrir ↗</a></div></div>`;
  if (p && p.d) return `<div class="ap-slide ap-site"><div class="ap-browser"><div class="ap-chrome"><i></i><i></i><i></i><span>${esc(host(d.site))}</span></div>
      <div class="ap-shot"><img draggable="false" alt="Site atual de ${esc(d.nome)}" src="${esc(p.d)}"></div></div>${p.m ? `<div class="ap-phone"><img draggable="false" alt="" src="${esc(p.m)}"></div>` : ""}</div>`;
  if (d.temPrint && !loaded) return `<div class="ap-slide"><div class="ap-wait"><div class="sp"></div><span>Carregando o print…</span></div></div>`;
  return `<div class="ap-slide"><div class="ap-wait"><strong>Ainda sem print deste site</strong><span>O print chega quando o computador capturar.</span><a href="${esc(siteUrl(d.site))}" target="_blank" rel="noopener">Abrir o site ↗</a></div></div>`;
}
function paintMedia(card) {
  const d = byId(card.dataset.id); if (!d) return;
  const loaded = S.pv.has(d.id), p = S.pv.get(d.id) || null, sl = slidesFor(d, p);
  let i = Math.min(+card.dataset.slide || 0, sl.length - 1); card.dataset.slide = i;
  const kind = sl[i], m = card.querySelector(".ap-media");
  m.querySelector(".ap-slide").outerHTML = slideHtml(kind, d, p, loaded);
  m.querySelector(".ap-dots").innerHTML = sl.length > 1 ? sl.map((_, j) => `<i class="${j === i ? "on" : ""}"></i>`).join("") : "";
  const b = m.querySelector(".ap-badge");
  let txt = "Site atual", bad = false;
  if (kind === "google") { txt = d.site ? "Ficha no Google" : "Sem site"; bad = !d.site; }
  else if (kind === "cel") txt = "No celular";
  else if (p && p.erro) { txt = "Site fora do ar"; bad = true; }
  b.className = "ap-badge" + (bad ? " bad" : ""); b.innerHTML = "<i></i>" + esc(txt);
}
function cardHtml(d, pos) {
  const x = d.extra || {}, c = d.contato || {}, nota = num(x.notaGoogle), av = num(x.avaliacoes), ns = num(x.notaSite);
  const chips = [];
  if (!d.site) chips.push('<span class="none">Sem site</span>');
  if (nota != null) chips.push(`<span class="star">★ ${esc(String(nota).replace(".", ","))}${av != null ? " · " + av + " aval." : ""}</span>`);
  if (c.telefone) chips.push(`<a href="tel:${esc(String(c.telefone).replace(/[^\d+]/g, ""))}">${esc(c.telefone)}</a>`);
  const w = waUrl(d); if (w) chips.push(`<a href="${esc(w)}" target="_blank" rel="noopener">WhatsApp</a>`);
  if (x.instagram) { const ig = String(x.instagram); chips.push(`<a href="${esc(/^https?:/.test(ig) ? ig : "https://instagram.com/" + ig.replace(/^@/, ""))}" target="_blank" rel="noopener">Instagram</a>`); }
  if (x.maps) chips.push(`<a href="${esc(x.maps)}" target="_blank" rel="noopener">Maps</a>`);
  let why = String(d.notas || x.porQueMarca || "").replace(/^Problemas do site: |^Por que parece analógico: /, "").trim(); why = why.charAt(0).toUpperCase() + why.slice(1);
  const sc = ns == null ? "" : `<div class="ap-score ${ns >= 9 ? "red" : ns >= 7 ? "hot" : ""}" title="Nota do site, de 0 a 10: quanto maior, pior"><b>${esc(ns)}</b><small>/10 ruim</small></div>`;
  return `<div class="ap-card" data-id="${esc(d.id)}" data-pos="${pos}" data-slide="0">
    <div class="ap-media"><div class="ap-dots"></div><span class="ap-badge"></span><div class="ap-slide"></div></div>
    <div class="ap-info">
      <div class="ap-head"><h2 class="ap-name">${esc(d.nome)}</h2>${sc}</div>
      <div class="ap-sub">${esc([d.segmento, [d.cidade, x.uf || d.uf].filter(Boolean).join("/")].filter(Boolean).join(" · "))}</div>
      <div class="ap-chips">${chips.join("")}</div>
      <p class="ap-why">${why ? esc(why) : "Sem observações ainda."}</p>
      <div class="ap-foot">${d.site ? `<a href="${esc(siteUrl(d.site))}" target="_blank" rel="noopener">Abrir site ↗</a>` : ""}<button type="button" data-act="ficha">Ver ficha completa →</button></div>
    </div>
    <div class="ap-stamp like">Fazer!</div><div class="ap-stamp nope">Nope</div><div class="ap-stamp maybe">Talvez</div></div>`;
}

/* ---------- render ---------- */
function build() {
  root.innerHTML = `<div class="ap" id="apRoot">
    <div class="ap-bar"><div class="segc" id="apModes"></div><select id="apLista" aria-label="Lista de empresas"></select>
      <button class="btn sm ap-qbtn" type="button" id="apQBtn"></button>
      ${cfg.savePrint ? '<button class="btn sm" type="button" id="apImp">Importar prints</button>' : ""}
      <div class="ap-stats" id="apStats"></div></div>
    <div class="ap-main">
      <div class="ap-deckcol"><div class="ap-stage" id="apStage"><div class="ap-fx" id="apFx"><div class="ap-match" id="apMatch"><b>É um match!</b><span></span></div></div></div>
        <div class="ap-actions">
          <button class="ap-b sm undo" type="button" data-do="undo" title="Desfazer (Z)" aria-label="Desfazer">${IC.undo}</button>
          <button class="ap-b big nope" type="button" data-do="nope" title="Rejeitar (←)" aria-label="Rejeitar">${IC.nope}</button>
          <button class="ap-b sm maybe" type="button" data-do="maybe" title="Talvez (↑)" aria-label="Talvez">${IC.maybe}</button>
          <button class="ap-b big like" type="button" data-do="ok" title="Fazer o site (→)" aria-label="Fazer o site">${IC.like}</button>
          <button class="ap-b sm open" type="button" data-do="open" title="Abrir o site atual (O)" aria-label="Abrir o site atual">${IC.open}</button>
        </div>
        <div class="ap-keys"><kbd>←</kbd> rejeitar · <kbd>→</kbd> fazer o site · <kbd>↑</kbd> talvez · <kbd>↓</kbd> próxima foto · <kbd>Z</kbd> desfazer</div>
      </div>
      <aside class="ap-queue" aria-label="Fila de desenvolvimento"><div class="ap-qhead"><h3>Fila de desenvolvimento</h3><span class="n" id="apQn">0</span></div>
        <p class="ap-qsub">Quem você aprovou. O Claude monta o site na ordem de cima para baixo.</p><div class="ap-qlist" id="apQList"></div></aside>
    </div>
    <div class="ap-sheet" id="apSheet" hidden><div class="ap-dlg" role="dialog" aria-label="Importar prints">
      <h2>Importar prints</h2>
      <p>Escolha os arquivos que o computador gerou na pasta <code>prints</code>: <code>ID.d.jpg</code> (computador), <code>ID.m.jpg</code> (celular) e, se quiser, <code>prints.json</code> (sites que não abriram).</p>
      <label class="ap-drop" id="apDrop">Clique aqui ou solte os arquivos<input type="file" id="apFiles" multiple accept="image/*,.json" hidden></label>
      <div class="ap-log" id="apLog"></div>
      <div style="display:flex;justify-content:flex-end"><button class="btn" type="button" id="apImpClose">Fechar</button></div></div></div>
  </div>`;
  stage = root.querySelector("#apStage");
}
function size() {
  if (!stage || !stage.clientWidth) return;
  const w = stage.clientWidth, h = stage.clientHeight, avail = Math.max(160, h - 30);
  const cw = Math.max(200, Math.min(w - 6, avail * 0.76, 560));
  const ch = cw / 0.76; stage.style.setProperty("--cw", cw.toFixed(0) + "px"); stage.style.setProperty("--ch", ch.toFixed(0) + "px");
  stage.classList.toggle("sm", ch < 500); stage.classList.toggle("xs", ch < 400);
}
function renderBar() {
  const v = docs(), todas = v.filter(d => !d.triagem), nPrints = todas.filter(d => d.temPrint).length;
  if (S.auto && cfg.loaded()) { S.modo = nPrints > 0 ? "prints" : "todas"; S.auto = false; }
  const cnt = { prints: nPrints, todas: todas.length, talvez: v.filter(d => d.triagem === "talvez").length };
  root.querySelector("#apModes").innerHTML = MODOS.map(([k, l]) => `<button class="chip" type="button" data-modo="${k}" aria-pressed="${S.modo === k}">${l}<span class="n">${cnt[k]}</span></button>`).join("");
  const sel = root.querySelector("#apLista"), L = cfg.lists(), cur = cfg.lista();
  if (sel.dataset.l !== cur || sel.options.length !== L.length) {
    sel.innerHTML = L.map(([k, l]) => `<option value="${esc(k)}">${esc(l)}</option>`).join(""); sel.dataset.l = cur;
  }
  sel.value = cur;
  const t0 = dayStart(), hoje = a => v.filter(d => d.aprovacao && d.aprovacao.acao === a && d.aprovacao.em >= t0).length;
  root.querySelector("#apStats").innerHTML = `<span>Restam <b>${S.q.length}</b></span><span>Hoje:</span><span class="okc" title="Aprovadas hoje">fazer <b>${hoje("ok")}</b></span><span title="Rejeitadas hoje">nope <b>${hoje("nope")}</b></span><span title="Talvez hoje">talvez <b>${hoje("maybe")}</b></span>`;
  const fila = filaDev();
  root.querySelector("#apQBtn").textContent = `Fila (${fila.length})`;
  root.querySelector("#apQn").textContent = fila.length;
  root.querySelector("#apQList").innerHTML = fila.length ? fila.slice(0, 60).map(d => `<div class="ap-qi"><button class="nm" type="button" data-ficha="${esc(d.id)}">${esc(d.nome)}</button>
      <small>${esc([d.cidade, ago((d.aprovacao || {}).em || d.atualizadoEm)].filter(Boolean).join(" · "))}</small>
      <button class="x" type="button" data-unfazer="${esc(d.id)}" title="Tirar da fila" aria-label="Tirar ${esc(d.nome)} da fila">${IC.x}</button></div>`).join("")
    + (fila.length > 60 ? `<div class="ap-qempty">+ ${fila.length - 60} mais antigas</div>` : "")
    : `<div class="ap-qempty">Ninguém na fila ainda. Arraste uma ficha para a direita.</div>`;
  const can = cfg.canWrite() && S.q.length > 0;
  root.querySelectorAll(".ap-b").forEach(b => { const a = b.dataset.do; b.disabled = a === "undo" ? !S.hist.length : a === "open" ? !(S.q[0] && S.q[0].site) : !can || (a === "maybe" && S.modo === "talvez"); });
}
function showDone() {
  const mais = MODOS.filter(([k]) => k !== S.modo && pend(k).length).map(([k, l]) => `<button class="btn sm" type="button" data-modo="${k}">${l} (${pend(k).length})</button>`).join("");
  const el = document.createElement("div"); el.className = "ap-done";
  el.innerHTML = `<h2>${cfg.loaded() ? "Acabaram as fichas" : "Carregando…"}</h2><p>${cfg.loaded()
    ? (S.modo === "prints" ? "Nenhuma ficha com print esperando. Importe os prints do computador ou veja as outras." : "Nenhuma empresa pendente neste modo desta lista.")
    : "Buscando as empresas."}</p><div class="ap-dr">${mais}</div>`;
  stage.appendChild(el);
}
function renderDeck() {
  if (!stage) return;
  size();
  const q = S.q, top = q[0], cur = stage.querySelector('.ap-card[data-pos="0"]');
  const want = q.slice(0, 3).map(d => d.id).join("|"), have = [...stage.querySelectorAll(".ap-card")].sort((a, b) => a.dataset.pos - b.dataset.pos).map(c => c.dataset.id).join("|");
  if (want === have && stage.querySelector(".ap-card")) return;
  if (cur && top && cur.dataset.id === top.id && have.split("|")[0] === top.id && have.split("|").length === Math.min(3, q.length)) return;
  stage.querySelectorAll(".ap-card,.ap-done").forEach(c => c.remove());
  if (!q.length) { showDone(); return; }
  const fx = stage.querySelector("#apFx");
  q.slice(0, 3).map((d, i) => [d, i]).reverse().forEach(([d, i]) => {
    const t = document.createElement("div"); t.innerHTML = cardHtml(d, i);
    const c = t.firstElementChild; stage.insertBefore(c, fx); loadPrint(d); paintMedia(c);
  });
  if (S.enterFrom) { const c = stage.querySelector('.ap-card[data-pos="0"]'); c.style.setProperty("--from", S.enterFrom > 0 ? "70px" : "-70px"); c.style.setProperty("--rot", S.enterFrom > 0 ? "8deg" : "-8deg"); c.classList.add("enter"); S.enterFrom = 0; }
}
function render() {
  if (!root || !cfg) return;
  if (cfg.lista() !== S.lista) { S.lista = cfg.lista(); S.hist = []; S.seen = new Set(); S.pv.clear(); S.pp.clear(); S.auto = true; S.streak = 0; }
  S.q = pend(); renderBar(); S.q = pend();
  if (S.busy || S.drag) { S.dirty = true; return; }
  renderDeck(); renderBar();
}

/* ---------- decisões ---------- */
function apply(d, acao) {
  const prev = { triagem: d.triagem || "", status: d.status || "", aprovacao: d.aprovacao || null };
  const patch = { aprovacao: { acao, em: Date.now(), por: (cfg.userId && cfg.userId()) || null } };
  patch.triagem = acao === "ok" ? "fazer" : acao === "nope" ? "descartar" : "talvez";
  if (acao === "ok" && (!d.status || d.status === "novo")) patch.status = "produzir";
  Object.assign(d, patch); cfg.save(d.id, patch);
  S.hist.push({ id: d.id, acao, prev, statusMudou: "status" in patch }); S.seen.add(d.id);
}
function fly(card, acao) {
  const cw = card.offsetWidth, ch = card.offsetHeight, dr = S.drag && S.drag.c === card ? S.drag : { dx: 0, dy: 0 };
  const tx = acao === "ok" ? cw * 1.7 : acao === "nope" ? -cw * 1.7 : dr.dx * 0.6;
  const ty = acao === "maybe" ? -ch * 1.25 : dr.dy + 40, rot = acao === "ok" ? 24 : acao === "nope" ? -24 : 0;
  card.classList.remove("drag"); card.classList.add("anim");
  const st = card.querySelector(".ap-stamp." + (acao === "ok" ? "like" : acao)); if (st) st.style.opacity = 1;
  card.style.transform = `translate(${tx}px,${ty}px) rotate(${rot}deg)`; card.style.opacity = 0;
}
function celebrate(d) {
  S.streak++;
  const fx = root.querySelector("#apFx"), m = root.querySelector("#apMatch");
  m.querySelector("span").textContent = (S.streak >= 3 && S.streak % 3 === 0 ? `Sequência de ${S.streak}! · ` : "") + d.nome + " entrou na fila de desenvolvimento";
  m.classList.remove("show"); void m.offsetWidth; m.classList.add("show");
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const R = stage.getBoundingClientRect(), n = 26;
  for (let i = 0; i < n; i++) {
    const e = document.createElement("i"), a = Math.random() * Math.PI * 2, r = 80 + Math.random() * 190;
    e.style.cssText = `background:${COLORS[i % COLORS.length]};left:${R.width / 2}px;top:${R.height * 0.42}px;--dx:${(Math.cos(a) * r).toFixed(0)}px;--dy:${(Math.sin(a) * r - 40).toFixed(0)}px;--rt:${(Math.random() * 720 - 360).toFixed(0)}deg;animation-delay:${(Math.random() * 0.08).toFixed(2)}s`;
    fx.appendChild(e); setTimeout(() => e.remove(), 1150);
  }
}
function decide(acao) {
  if (S.busy || !cfg.canWrite()) { if (!cfg.canWrite()) cfg.toast("Você só pode ver esta lista; as decisões não são salvas."); return; }
  const card = stage.querySelector('.ap-card[data-pos="0"]'), d = card && byId(card.dataset.id);
  if (!d) return;
  if (acao === "maybe" && S.modo === "talvez") return;
  S.busy = true; apply(d, acao); if (acao !== "ok") S.streak = 0;
  fly(card, acao); if (acao === "ok") celebrate(d);
  S.drag = null;
  const rest = [...stage.querySelectorAll(".ap-card")].filter(c => c !== card);
  rest.forEach(c => { c.dataset.pos = +c.dataset.pos - 1; c.classList.add("anim"); });
  S.q = pend(); renderBar();
  setTimeout(() => { S.busy = false; card.remove(); S.dirty = false; renderDeck(); S.q = pend(); renderBar(); }, 300);
}
function undo() {
  if (S.busy || !S.hist.length) return;
  const h = S.hist.pop(), d = byId(h.id); if (!d) return;
  const patch = { triagem: h.prev.triagem, aprovacao: h.prev.aprovacao }; if (h.statusMudou) patch.status = h.prev.status || "novo";
  Object.assign(d, patch); cfg.save(d.id, patch); S.seen.delete(d.id); S.streak = 0;
  if (S.modo === "prints" && !d.temPrint) S.modo = "todas";
  S.enterFrom = h.acao === "nope" ? -1 : 1; S.dirty = false;
  stage.querySelectorAll(".ap-card").forEach(c => c.remove());
  S.q = pend(); renderDeck(); renderBar();
}
function unfazer(id) {
  const d = byId(id); if (!d) return;
  const patch = { triagem: "", status: d.status === "produzir" ? "novo" : d.status, aprovacao: null };
  Object.assign(d, patch); cfg.save(id, patch); S.hist = S.hist.filter(h => h.id !== id); S.seen.delete(id);
  S.dirty = false; stage.querySelectorAll(".ap-card").forEach(c => c.remove()); S.q = pend(); renderDeck(); renderBar();
  cfg.toast("Saiu da fila e voltou para as pendentes.");
}

/* ---------- arrastar ---------- */
function stamps(c, dx, dy) {
  const T = Math.max(60, c.offsetWidth * 0.3), vert = Math.abs(dy) > Math.abs(dx) * 0.8;
  const set = (k, v) => { const e = c.querySelector(".ap-stamp." + k); if (e) e.style.opacity = Math.max(0, Math.min(1, v)).toFixed(2); };
  set("like", vert ? 0 : dx / T); set("nope", vert ? 0 : -dx / T); set("maybe", vert && S.modo !== "talvez" ? -dy / T : 0);
}
function tapSlide(c, e) {
  const r = c.getBoundingClientRect(), m = c.querySelector(".ap-media").getBoundingClientRect();
  if (e.clientY > m.bottom) return;
  const d = byId(c.dataset.id); if (!d) return;
  const n = slidesFor(d, S.pv.get(d.id) || null).length; if (n < 2) return;
  const dir = (e.clientX - r.left) / r.width > 0.5 ? 1 : -1;
  c.dataset.slide = (((+c.dataset.slide || 0) + dir) % n + n) % n; paintMedia(c);
}
function onDown(e) {
  const c = e.target.closest('.ap-card[data-pos="0"]');
  if (!c || S.busy || e.button > 0 || e.target.closest("a,button")) return;
  S.drag = { c, x0: e.clientX, y0: e.clientY, dx: 0, dy: 0, moved: false, id: e.pointerId };
  try { c.setPointerCapture(e.pointerId); } catch {}
}
function onMove(e) {
  const g = S.drag; if (!g || e.pointerId !== g.id) return;
  g.dx = e.clientX - g.x0; g.dy = e.clientY - g.y0;
  if (!g.moved && Math.abs(g.dx) + Math.abs(g.dy) > 7) { g.moved = true; g.c.classList.remove("anim"); g.c.classList.add("drag"); }
  if (!g.moved) return;
  g.c.style.transform = `translate(${g.dx}px,${g.dy}px) rotate(${(g.dx / 20).toFixed(2)}deg)`;
  stamps(g.c, g.dx, g.dy);
}
function onUp(e) {
  const g = S.drag; if (!g || e.pointerId !== g.id) return;
  if (!g.moved) { S.drag = null; tapSlide(g.c, e); return; }
  const T = Math.max(70, g.c.offsetWidth * 0.3), vert = Math.abs(g.dy) > Math.abs(g.dx) * 0.8;
  if (!vert && g.dx > T) return decide("ok");
  if (!vert && g.dx < -T) return decide("nope");
  if (vert && g.dy < -T && S.modo !== "talvez") return decide("maybe");
  g.c.classList.remove("drag"); g.c.classList.add("anim"); g.c.style.transform = ""; stamps(g.c, 0, 0);
  S.drag = null; if (S.dirty) { S.dirty = false; render(); }
}

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
  (Array.isArray(manifest) ? manifest : (manifest && manifest.itens) || []).forEach(it => { if (it && it.id && it.erro) (by[it.id] = by[it.id] || {}).erro = String(it.erro).slice(0, 160); });
  const ids = Object.keys(by); let ok = 0, sem = 0;
  L(ids.length + " empresas nos arquivos.");
  for (const id of ids) {
    const o = by[id];
    try {
      const obj = { em: Date.now() };
      if (o.d) obj.d = await toData(o.d, 1000, 150000);
      if (o.m) obj.m = await toData(o.m, 340, 70000);
      if (o.erro && !o.d) obj.erro = o.erro;
      await cfg.savePrint(id, obj); S.pv.delete(id); ok++;
      if (ok % 5 === 0) L(ok + " de " + ids.length + "…");
    } catch (e) { sem++; L(id + ": " + (e && e.message || "não salvou")); }
  }
  if (bad.length) L("Ignorados (nome fora do padrão): " + bad.slice(0, 6).join(", ") + (bad.length > 6 ? "…" : ""));
  L("Pronto: " + ok + " importados" + (sem ? ", " + sem + " com problema" : "") + ".");
  S.auto = true; render();
}

/* ---------- eventos ---------- */
function active() { return root && root.getClientRects().length > 0; }
function wire() {
  stage.addEventListener("pointerdown", onDown); stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerup", onUp); stage.addEventListener("pointercancel", onUp);
  root.addEventListener("click", e => {
    const t = e.target;
    const m = t.closest("[data-modo]"); if (m) { S.modo = m.dataset.modo; S.auto = false; S.dirty = false; stage.querySelectorAll(".ap-card,.ap-done").forEach(c => c.remove()); render(); return; }
    const a = t.closest("[data-do]"); if (a) { const k = a.dataset.do; if (k === "undo") undo(); else if (k === "open") { const d = S.q[0]; if (d && d.site) window.open(siteUrl(d.site), "_blank", "noopener"); } else decide(k); return; }
    if (t.closest('[data-act="ficha"]')) { const c = t.closest(".ap-card"); if (c && cfg.openFicha) cfg.openFicha(c.dataset.id); return; }
    const f = t.closest("[data-ficha]"); if (f && cfg.openFicha) { cfg.openFicha(f.dataset.ficha); return; }
    const u = t.closest("[data-unfazer]"); if (u) { unfazer(u.dataset.unfazer); return; }
    if (t.closest("#apQBtn")) { root.querySelector("#apRoot").classList.toggle("q-open"); return; }
    if (t.closest("#apImp")) { root.querySelector("#apSheet").hidden = false; return; }
    if (t.closest("#apImpClose") || t.id === "apSheet") { root.querySelector("#apSheet").hidden = true; return; }
  });
  root.addEventListener("change", e => {
    if (e.target.id === "apLista") { S.dirty = false; stage.querySelectorAll(".ap-card,.ap-done").forEach(c => c.remove()); cfg.setLista(e.target.value); }
    if (e.target.id === "apFiles") { importFiles([...e.target.files]); e.target.value = ""; }
  });
  const drop = root.querySelector("#apDrop");
  ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("over"); }));
  ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("over"); }));
  drop.addEventListener("drop", e => importFiles([...e.dataTransfer.files]));
  document.addEventListener("keydown", e => {
    if (!active() || e.metaKey || e.ctrlKey || e.altKey || e.target.closest("input,select,textarea,[contenteditable]")) return;
    if (root.querySelector("#apSheet") && !root.querySelector("#apSheet").hidden) return;
    const k = e.key; let h = true;
    if (k === "ArrowRight") decide("ok"); else if (k === "ArrowLeft") decide("nope"); else if (k === "ArrowUp") decide("maybe");
    else if (k === "z" || k === "Z" || k === "Backspace") undo();
    else if (k === "ArrowDown" || k === " ") { const c = stage.querySelector('.ap-card[data-pos="0"]'); if (c) tapSlide(c, { clientX: c.getBoundingClientRect().right, clientY: c.getBoundingClientRect().top + 5 }); }
    else if (k === "o" || k === "O") { const d = S.q[0]; if (d && d.site) window.open(siteUrl(d.site), "_blank", "noopener"); }
    else h = false;
    if (h) e.preventDefault();
  });
  if (window.ResizeObserver) new ResizeObserver(size).observe(stage); else addEventListener("resize", size);
}

NS.init = function (c) { cfg = c; root = c.root; build(); wire(); size(); render(); };
NS.render = render;
NS.show = function (on) { document.body.classList.toggle("ap-on", !!on); if (on) { size(); render(); } };
NS._state = S;
})();
