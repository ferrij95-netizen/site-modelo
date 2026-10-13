/* Proposta e contrato de uma empresa do canvas (hub.overtus.com.br/documento/?id=<id>).
   Lê a empresa no D1 (/api/empresas/<id>), preenche a proposta com as duas versões do site e o contrato
   com os dados do cliente. O que o João digita aqui fica salvo na própria empresa, no campo "documento";
   os dados da Overtus (razão social, CNPJ...) ficam num registro só, "config:overtus", e valem para todas.
   Imprimir anota no histórico do CRM que a proposta ou o contrato foi gerado. Nada é enviado a ninguém. */
(() => {
"use strict";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ID = new URLSearchParams(location.search).get("id") || "";
const CFG_ID = "config:overtus";

const api = (path, opt) => fetch(path, { credentials: "same-origin", ...opt }).then(async r => {
  if (r.status === 401 || r.redirected && /\/entrar\//.test(r.url)) { location.href = "/entrar/"; throw new Error("sessão expirada"); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.erro || "erro " + r.status);
  return j;
});
const ler = id => api("/api/empresas/" + encodeURIComponent(id)).then(j => j.doc);
const gravar = (id, op, data) => api("/api/empresas/" + encodeURIComponent(id), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ op, data }) });
function toast(m) { const t = $("#toast"); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2600); }

/* ---------- pacotes e módulos (os do Anexo I do contrato modelo) ---------- */
const MOD = [
  ["site", "Site institucional"], ["manut", "Manutenção e hospedagem"], ["insta", "Instagram"],
  ["anun", "Anúncios pagos"], ["sist", "Sistema / catálogo"], ["leads", "Garantia de clientes (leads)"],
];
const ITENS = {
  site: ["Site novo com várias páginas, na versão que você escolher (A ou B)", "Versão para computador e celular"],
  manut: ["Hospedagem, HTTPS e cópias de segurança", "Alterações de conteúdo todo mês"],
  insta: ["Posts e stories no Instagram, com sua aprovação"],
  anun: ["Gestão de anúncios no Google e na Meta, com relatório mensal"],
  sist: ["Sistema ou catálogo de produtos"],
  leads: ["Meta mensal de contatos de clientes (leads)"],
};
// Do maior para o menor: o maior aparece primeiro na proposta.
const PAC = [
  { id: "completo", nome: "Pacote completo", mods: ["site", "manut", "insta", "anun", "sist", "leads"] },
  { id: "essencial", nome: "Site + manutenção", mods: ["site", "manut"] },
  { id: "site", nome: "Site", mods: ["site"] },
];
const PACN = Object.fromEntries(PAC.map(p => [p.id, p]));

/* ---------- estado ---------- */
let emp = null, ov = {}, clientes = {}, D = {}, aba = "proposta", faltas = [];
const host = s => { try { return new URL(/^https?:/i.test(s) ? s : "https://" + s).hostname.replace(/^www\./, ""); } catch { return ""; } };
const url = s => { s = String(s || "").trim(); return !s ? "" : /^https?:\/\//i.test(s) ? s : "https://" + s; };
const texto = x => typeof x === "string" ? x : x && (x.item || x.problema || x.texto) ? `${x.item || x.problema || x.texto}${x.porque ? ": " + x.porque : ""}` : "";
const industria = d => ["agro", "medicas", "expointer"].includes(d.lista) || /ind[uú]stri|fábrica|fabrica|usina|metal|frigor/i.test([d.segmento, d.nome].join(" "));

// De qual pasta clientes/<slug> é esta empresa: pelo link das versões, pelo preview anotado ou pelo subdomínio sugerido.
function slugDe(d) {
  const p = d.proposta || {}, c = d.contato || {}, e = d.enr || {};
  for (const s of [p.urlA, p.urlB, c.preview, e.subdominio && e.subdominio + ".overtus.com.br"]) {
    const h = host(s || ""); if (!h.endsWith(".overtus.com.br")) continue;
    const sub = h.split(".")[0], cand = [sub, sub.replace(/-b$/, "")];
    for (const k of cand) if (clientes[k]) return k;
    return sub.replace(/-b$/, "");
  }
  return "";
}

function padroes(d) {
  const x = d.extra || {}, c = d.contato || {}, e = d.enr || {}, p = d.proposta || {}, V = e.versoes || [];
  const slug = slugDe(d), cli = clientes[slug];
  const vers = cli ? cli.versoes.filter(v => !["site", "antigo", "atual", "direcoes"].includes(v.id)) : [];
  const urlV = i => p["url" + "AB"[i]] || (vers[i] ? `https://${slug}.overtus.com.br${vers[i].path}` : i === 0 && cli ? `https://${slug}.overtus.com.br/` : slug && !cli ? `https://${slug}${i ? "-b" : ""}.overtus.com.br` : "");
  const diag = (Array.isArray(e.problemasSite) && e.problemasSite.length ? e.problemasSite : Array.isArray(x.problemas) ? x.problemas : []).map(texto).filter(Boolean);
  return {
    cli: { razao: d.nome || "", cnpj: x.cnpj || c.cnpj || "", endereco: x.endereco || d.cidade || "", repr: c.nome || "", cpf: "", email: c.email || "" },
    prop: {
      urlA: urlV(0), urlB: urlV(1),
      nomeA: (V[0] && V[0].nome) || (vers[0] && vers[0].nome) || "Versão A", descA: (V[0] && V[0].descricao) || "",
      nomeB: (V[1] && V[1].nome) || (vers[1] && vers[1].nome) || "Versão B", descB: (V[1] && V[1].descricao) || "",
      diagnostico: diag.join("\n"), validade: "",
    },
    pac: {
      completo: { mostrar: true, impl: "10000", mensal: "" },
      essencial: { mostrar: false, impl: "", mensal: "" },
      site: { mostrar: true, impl: industria(d) ? "5000" : "3000", mensal: "" },
      rec: "completo", fechado: "",
    },
    cond: {
      rodadas: "2", alteracoes: "", posts: "", stories: "", plataformas: "Google Ads e Meta Ads", verba: "", sistema: "", paginas: "", idiomas: "",
      pagImpl: "50% na assinatura e 50% na publicação", vencDia: "", formaPag: "", inicio: "", entregaDias: "", minimoMeses: "12", multa: "30%",
      suspensao: "15", aprovDias: "5", leads: "", compensacao: "continuará o trabalho sem cobrar a mensalidade do módulo no mês seguinte",
      saida: "15", incidente: "48", testemunha1: "", testemunha2: "",
    },
    meta: { slug, capa: cli && cli.capa || "" },
  };
}
let P = {}; // padrões desta empresa
const get = path => {
  const k = path.split(".");
  if (k[0] === "ov") return ov[k[1]] ?? "";
  let a = D, b = P;
  for (const s of k) { a = a && typeof a === "object" ? a[s] : undefined; b = b && typeof b === "object" ? b[s] : undefined; }
  return a !== undefined ? a : b ?? "";
};
function set(path, v) {
  const k = path.split(".");
  if (k[0] === "ov") { ov[k[1]] = v; return; }
  let o = D; for (const s of k.slice(0, -1)) o = o[s] = o[s] && typeof o[s] === "object" ? o[s] : {};
  o[k[k.length - 1]] = v;
}

/* ---------- formulário ---------- */
const F = (p, label, ph = "", tipo = "text") => ({ p, label, ph, tipo });
const GRUPOS = [
  { t: "Cliente", aberto: true, ajuda: "Vem da ficha da empresa. Confira a razão social e o CNPJ antes do contrato.", campos: [
    F("cli.razao", "Razão social"), F("cli.cnpj", "CNPJ", "00.000.000/0000-00"), F("cli.endereco", "Endereço completo"),
    F("cli.repr", "Representante (nome e cargo)"), F("cli.cpf", "CPF do representante"), F("cli.email", "E-mail"),
  ] },
  { t: "Proposta: as duas versões", aberto: true, ajuda: "Os links que o cliente vai abrir. Vêm da ficha ou da pasta do site no hub.", campos: [
    F("prop.urlA", "Link da versão A", "https://cliente.overtus.com.br/a/"), F("prop.nomeA", "Nome da versão A"), F("prop.descA", "Como é a versão A", "", "area"),
    F("prop.urlB", "Link da versão B", "https://cliente.overtus.com.br/b/"), F("prop.nomeB", "Nome da versão B"), F("prop.descB", "Como é a versão B", "", "area"),
    F("prop.diagnostico", "Problemas do site atual (um por linha)", "Não abre no celular\nSem botão de WhatsApp", "area"),
    F("prop.validade", "Validade da proposta (dias)", "Em branco: não aparece"),
  ] },
  { t: "Pacotes e preços", aberto: true, pacotes: true },
  { t: "Condições do contrato", ajuda: "Os números já preenchidos são os sugeridos no contrato modelo. Troque o que for diferente.", campos: [
    F("cond.pagImpl", "Pagamento da implantação"), F("cond.formaPag", "Forma de pagamento", "boleto, PIX ou cartão"), F("cond.vencDia", "Dia do vencimento mensal", "10"),
    F("cond.inicio", "Início dos serviços mensais", "data da publicação do site"), F("cond.entregaDias", "Prazo de entrega do site (dias úteis)", "30"),
    F("cond.minimoMeses", "Prazo mínimo (meses)"), F("cond.multa", "Multa por saída antes do prazo"), F("cond.rodadas", "Rodadas de ajuste do site"),
    F("cond.paginas", "Páginas do site", "Ex.: 6 páginas"), F("cond.idiomas", "Idiomas", "Ex.: português, inglês e espanhol"),
    F("cond.alteracoes", "Alterações de conteúdo por mês"), F("cond.posts", "Posts por mês"), F("cond.stories", "Stories por mês"),
    F("cond.plataformas", "Plataformas de anúncio"), F("cond.verba", "Verba de anúncios por mês (paga pelo cliente)", "R$ 1.000"),
    F("cond.sistema", "Sistema ou catálogo (o que faz)", "", "area"), F("cond.leads", "Meta de leads por mês"),
    F("cond.compensacao", "Se não bater a meta de leads, a Overtus…", "", "area"),
    F("cond.aprovDias", "Prazo do cliente para aprovar (dias úteis)"), F("cond.suspensao", "Suspende após quantos dias de atraso"),
    F("cond.saida", "Entrega dos arquivos na saída (dias)"), F("cond.incidente", "Aviso de incidente de dados (horas)"),
    F("cond.testemunha1", "Testemunha 1 (nome e CPF)"), F("cond.testemunha2", "Testemunha 2 (nome e CPF)"),
  ] },
  { t: "Dados da Overtus", ajuda: "Ficam salvos para todas as propostas e contratos.", campos: [
    F("ov.razao", "Razão social da Overtus"), F("ov.cnpj", "CNPJ da Overtus"), F("ov.endereco", "Endereço da sede"),
    F("ov.repr", "Representante"), F("ov.cpf", "CPF do representante"), F("ov.cidade", "Cidade/UF (foro e assinatura)", "Porto Alegre/RS"),
    F("ov.whatsapp", "WhatsApp para a proposta"), F("ov.email", "E-mail para a proposta"),
  ] },
];
function campo(c) {
  const v = get(c.p), cls = String(v).trim() ? "f" : "f vazio";
  const inp = c.tipo === "area" ? `<textarea rows="3" data-p="${c.p}" placeholder="${esc(c.ph)}">${esc(v)}</textarea>` : `<input type="text" data-p="${c.p}" value="${esc(v)}" placeholder="${esc(c.ph)}">`;
  return `<label class="${cls}">${esc(c.label)}${inp}</label>`;
}
function pacotesHtml() {
  const rec = get("pac.rec"), fech = get("pac.fechado");
  return `<p class="ajuda">Valores em reais. O pacote recomendado ganha destaque na proposta. “Fechado” é o que vai para o contrato.</p>` + PAC.map(p => `<div class="pac">
    <div class="nome"><label><input type="checkbox" data-pc="${p.id}" ${get(`pac.${p.id}.mostrar`) ? "checked" : ""}> ${esc(p.nome)}</label></div>
    <p class="itens">${p.mods.map(m => MOD.find(x => x[0] === m)[1]).join(" · ")}</p>
    <div class="duas">${campo(F(`pac.${p.id}.impl`, "Implantação (R$)", "a definir"))}${campo(F(`pac.${p.id}.mensal`, "Mensal (R$)", "sem mensalidade"))}</div>
    <div class="marcas"><label><input type="radio" name="rec" value="${p.id}" ${rec === p.id ? "checked" : ""}> Recomendado</label>
      <label><input type="radio" name="fech" value="${p.id}" ${fech === p.id ? "checked" : ""}> Fechado com o cliente</label></div>
  </div>`).join("") + `<label class="f" style="flex-direction:row;gap:6px;align-items:center"><input type="radio" name="fech" value="" ${!fech ? "checked" : ""}> Ainda não fechou (o contrato usa o recomendado)</label>`;
}
function montarForm() {
  $("#form").innerHTML = GRUPOS.map(g => `<details ${g.aberto ? "open" : ""}><summary>${esc(g.t)}</summary>${g.ajuda ? `<p class="ajuda">${esc(g.ajuda)}</p>` : ""}${g.pacotes ? pacotesHtml() : g.campos.map(campo).join("")}</details>`).join("");
}
$("#form").addEventListener("input", e => {
  const t = e.target;
  if (t.dataset.p) { set(t.dataset.p, t.value); t.parentElement.classList.toggle("vazio", !t.value.trim()); salvar(t.dataset.p.startsWith("ov.")); }
  else if (t.dataset.pc) { set(`pac.${t.dataset.pc}.mostrar`, t.checked); salvar(); }
  else if (t.name === "rec") { set("pac.rec", t.value); salvar(); }
  else if (t.name === "fech") { set("pac.fechado", t.value); salvar(); }
  agendar();
});

/* ---------- salvar ---------- */
let tSalvar = null, pendOv = false, tDoc = null;
function salvar(doOv) {
  if (doOv) pendOv = true;
  clearTimeout(tSalvar);
  tSalvar = setTimeout(gravarAgora, 900);
}
async function gravarAgora() {
  clearTimeout(tSalvar); tSalvar = null;
  try {
    await gravar(ID, "update", { documento: { ...D, editadoEm: Date.now() } });
    if (pendOv) { pendOv = false; await gravar(CFG_ID, "set", { ...ov, lista: "_config", nome: "Dados da Overtus" }); }
  } catch (e) { toast("Não salvou: " + e.message); }
}
const agendar = () => { clearTimeout(tDoc); tDoc = setTimeout(render, 120); };

/* ---------- valores ---------- */
const numero = v => { const s = String(v ?? "").replace(/[^\d,.-]/g, ""); if (!s) return null; const n = Number(s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/\.(?=\d{3}(\D|$))/g, "")); return Number.isFinite(n) ? n : null; };
const brl = n => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
function extenso(valor) {
  const U = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const DZ = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const C = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
  const ate999 = n => {
    if (n === 100) return "cem";
    const c = Math.floor(n / 100), r = n % 100, p = [];
    if (c) p.push(C[c]);
    if (r) p.push(r < 20 ? U[r] : DZ[Math.floor(r / 10)] + (r % 10 ? " e " + U[r % 10] : ""));
    return p.join(" e ");
  };
  const inteiro = n => {
    if (!n) return "zero";
    const g = [n % 1000, Math.floor(n / 1000) % 1000, Math.floor(n / 1e6) % 1000];
    const partes = [];
    if (g[2]) partes.push(ate999(g[2]) + (g[2] === 1 ? " milhão" : " milhões"));
    if (g[1]) partes.push(g[1] === 1 ? "mil" : ate999(g[1]) + " mil");
    if (g[0]) partes.push(ate999(g[0]));
    if (partes.length > 1 && (g[0] < 100 || g[0] % 100 === 0) && g[0]) { const u = partes.pop(); return partes.join(" ") + " e " + u; }
    return partes.join(" ");
  };
  const r = Math.floor(valor), cent = Math.round((valor - r) * 100);
  let s = "";
  if (r) s = inteiro(r) + (r === 1 ? " real" : r % 1e6 === 0 ? " de reais" : " reais");
  if (cent) s += (s ? " e " : "") + inteiro(cent) + (cent === 1 ? " centavo" : " centavos");
  return s || "zero real";
}

/* ---------- campos no documento ---------- */
// v(path, rótulo): o valor do campo ou, se estiver vazio, a marca [RÓTULO] (que entra na lista do que falta).
function v(path, rot) {
  const s = String(get(path) ?? "").trim();
  if (s) return esc(s);
  if (!faltas.some(f => f.p === path)) faltas.push({ p: path, rot });
  return `<mark class="falta">[${esc(rot)}]</mark>`;
}
function falta(rot, p) { if (!faltas.some(f => f.p === p)) faltas.push({ p, rot }); return `<mark class="falta">[${esc(rot)}]</mark>`; }
const pacoteContrato = () => PACN[get("pac.fechado")] || PACN[get("pac.rec")] || PAC[0];
const hoje = () => new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
function corMarca(d) {
  const m = d.marca || {}, s = (d.enr && d.enr.marca) || {};
  const hex = h => /^#[0-9a-f]{3,8}$/i.test(String(h || "").trim()) ? String(h).trim() : null;
  return String(m.cores || "").split(/[,\s]+/).map(hex).find(Boolean) || ((s.cores || [])[0] && hex(s.cores[0].hex)) || "#ed9454";
}
function valorPac(p, rot = true) {
  const i = numero(get(`pac.${p.id}.impl`)), m = numero(get(`pac.${p.id}.mensal`));
  if (i == null && m == null) return rot ? falta(`preço do ${p.nome}`, `pac.${p.id}.impl`) : "";
  return [i != null ? brl(i) : "", m != null ? (i != null ? " + " : "") + brl(m) + " por mês" : ""].join("");
}

/* ---------- proposta ---------- */
function proposta() {
  const d = emp, nome = esc(get("cli.razao") || d.nome);
  const diag = String(get("prop.diagnostico")).split("\n").map(s => s.replace(/^[-•*\s]+/, "").trim()).filter(Boolean);
  const shown = PAC.filter(p => get(`pac.${p.id}.mostrar`));
  const rec = get("pac.rec"), val = numero(get("prop.validade"));
  const atual = d.site ? host(d.site) : "";
  const ver = (L, cls) => {
    const u = String(get("prop.url" + L)).trim(), desc = String(get("prop.desc" + L)).trim();
    return `<div class="ver ${cls}"><div class="cab"><span>Versão ${L}</span><h3>${esc(get("prop.nome" + L))}</h3></div>
      <div class="corpo">${desc ? `<p>${esc(desc)}</p>` : ""}<p>${u ? `<a href="${esc(url(u))}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\//, ""))}</a>` : falta("link da versão " + L, "prop.url" + L)}</p></div></div>`;
  };
  const capa = P.meta.capa ? `<div class="capa-site"><img src="${esc(P.meta.capa)}" alt="Prévia do site novo da ${nome}" onerror="this.parentElement.remove()"></div>` : "";
  const contato = [ov.repr && esc(ov.repr), ov.whatsapp && `WhatsApp ${esc(ov.whatsapp)}`, ov.email && esc(ov.email)].filter(Boolean);
  return `<div class="pr" style="--marca:${corMarca(d)}">
  <section class="capa"><div class="dentro">
    <div class="logo"><i>O</i> Overtus</div>
    <div class="tit"><p class="rotulo">Proposta comercial</p><h1>${nome}</h1>
      <p class="sub">Um site novo para a ${esc(d.nome)}, em duas versões para você escolher.</p></div>
    <div class="meta"><div>Preparada para<b>${esc(get("cli.repr") || d.nome)}</b></div><div>Data<b>${hoje()}</b></div>
      ${val ? `<div>Validade<b>${val} dias</b></div>` : ""}<div>Por<b>${ov.repr ? esc(ov.repr) + " · " : ""}Overtus</b></div></div>
  </div></section>
  <div class="faixa"></div>
  ${diag.length ? `<section><p class="rot">Hoje</p><h2>O site atual</h2>
    <p>Olhamos o site ${atual ? `<strong>${esc(atual)}</strong>` : "atual"} com olhar de cliente. Estes pontos fazem quem chega desistir antes de entrar em contato:</p>
    <ul class="pontos">${diag.map(s => `<li>${esc(s)}</li>`).join("")}</ul></section>` : ""}
  <section><p class="rot">O site novo</p><h2>Duas versões, a mesma marca</h2>
    <p>Montamos duas versões do novo site da ${esc(d.nome)} com o logo, as cores e as fontes da empresa. As duas já estão no ar: abra no computador e no celular e escolha a que mais combina com vocês.</p>
    <div class="versoes">${ver("A", "a")}${ver("B", "b")}</div>${capa}</section>
  <section class="quem"><p class="rot">Quem somos</p><h2>Overtus</h2>
    <p><strong>Estrutura comercial para quem vende de verdade.</strong> Criamos sites, sistemas e a presença digital que ajudam empresas a serem encontradas e a receber mais pedidos de orçamento.</p></section>
  <section><p class="rot">Investimento</p><h2>Escolha o pacote</h2>
    ${shown.length ? `<div class="pacotes">${shown.map(p => {
      const i = numero(get(`pac.${p.id}.impl`)), m = numero(get(`pac.${p.id}.mensal`));
      const preco = i == null && m == null ? `<div class="preco">${falta(`preço do ${p.nome}`, `pac.${p.id}.impl`)}</div>`
        : `<div class="preco">${i != null ? brl(i) : brl(m)}<small>${i != null ? (m != null ? `+ ${brl(m)} por mês` : "valor do projeto") : "por mês"}</small></div>`;
      return `<div class="pacote ${rec === p.id && shown.length > 1 ? "rec" : ""}">${rec === p.id && shown.length > 1 ? `<span class="selo">Recomendado</span>` : ""}
        <h3>${esc(p.nome)}</h3>${preco}<ul>${p.mods.flatMap(k => ITENS[k]).map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`;
    }).join("")}</div>` : `<p>${falta("escolha ao menos um pacote", "pac")}</p>`}
    <p class="nota">Condições de pagamento no contrato.${shown.some(p => p.mods.includes("anun")) ? " A verba dos anúncios é paga pelo cliente direto ao Google e à Meta." : ""}${shown.some(p => p.mods.includes("leads")) ? " A meta de leads é de contatos recebidos, não de vendas fechadas." : ""}</p></section>
  <section><p class="rot">Próximo passo</p><h2>Como seguimos</h2>
    <ol class="passos"><li><div><h3>Escolha a versão</h3>Abra as duas versões e diga qual prefere, a A ou a B.</div></li>
      <li><div><h3>Escolha o pacote</h3>Fechamos os detalhes e assinamos o contrato, que pode ser por assinatura eletrônica.</div></li>
      <li><div><h3>Envie seus materiais</h3>Logo, fotos e acessos. Fazemos os ajustes finais com você.</div></li>
      <li><div><h3>Site no ar</h3>Publicamos o site novo no endereço da ${esc(d.nome)}.</div></li></ol></section>
  <section class="fim"><h2>Vamos colocar o site novo no ar?</h2>
    <p>${contato.length ? contato.join(" · ") : falta("WhatsApp ou e-mail da Overtus", "ov.whatsapp")}</p></section>
</div>`;
}

/* ---------- contrato (texto do contrato modelo da Overtus, de 10/10/2026) ---------- */
function contrato() {
  const pac = pacoteContrato(), tem = m => pac.mods.includes(m);
  const impl = numero(get(`pac.${pac.id}.impl`)), mens = numero(get(`pac.${pac.id}.mensal`));
  const R = (n, rot, p) => n != null ? `${brl(n)} (${extenso(n)})` : falta(rot, p);
  const mensais = pac.mods.some(m => m !== "site");
  const linha = (k, det, valor) => `<tr><td class="x">${tem(k) ? "X" : "–"}</td><td>${esc(MOD.find(x => x[0] === k)[1])}</td><td>${tem(k) ? det : ""}</td><td>${tem(k) ? valor : ""}</td></tr>`;
  const sitesV = [get("prop.urlA"), get("prop.urlB")].filter(Boolean).map(esc).join(" e ");
  return `<div class="ct">
  <h1>Contrato de Prestação de Serviços</h1>
  <p class="subt">${v("ov.razao", "RAZÃO SOCIAL DA OVERTUS")} · ${v("cli.razao", "RAZÃO SOCIAL DO CLIENTE")}</p>
  <h2>Das partes</h2>
  <p><strong>CONTRATADA:</strong> ${v("ov.razao", "RAZÃO SOCIAL DA OVERTUS")}, nome fantasia Overtus, inscrita no CNPJ sob o nº ${v("ov.cnpj", "CNPJ DA OVERTUS")}, com sede em ${v("ov.endereco", "ENDEREÇO DA OVERTUS")}, neste ato representada por ${v("ov.repr", "REPRESENTANTE DA OVERTUS")}, CPF ${v("ov.cpf", "CPF DO REPRESENTANTE DA OVERTUS")}, doravante "OVERTUS".</p>
  <p><strong>CONTRATANTE:</strong> ${v("cli.razao", "RAZÃO SOCIAL DO CLIENTE")}, inscrita no CNPJ sob o nº ${v("cli.cnpj", "CNPJ DO CLIENTE")}, com sede em ${v("cli.endereco", "ENDEREÇO DO CLIENTE")}, neste ato representada por ${v("cli.repr", "NOME E CARGO")}, CPF ${v("cli.cpf", "CPF DO REPRESENTANTE DO CLIENTE")}, e-mail ${v("cli.email", "E-MAIL DO CLIENTE")}, doravante "CLIENTE".</p>
  <p>As partes celebram este Contrato de Prestação de Serviços, regido pelos artigos 593 a 609 do Código Civil e pelas cláusulas a seguir.</p>

  <h2>Cláusula 1 – Objeto e escopo</h2>
  <p>1.1. A OVERTUS prestará ao CLIENTE os serviços marcados no Anexo I. Módulos não marcados não fazem parte deste contrato.</p>
  <p>1.2. <strong>Site institucional.</strong> Criação de site multipágina com a identidade visual do CLIENTE (logo, cores, fontes), apresentação de até duas propostas visuais para escolha, até ${v("cond.rodadas", "2")} rodadas de ajustes após a escolha, versão para computador e celular, e idiomas listados no Anexo I.</p>
  <p>1.3. <strong>Manutenção e hospedagem.</strong> Hospedagem do site, certificado de segurança (HTTPS), cópias de segurança, correção de falhas e até ${tem("manut") ? v("cond.alteracoes", "Nº DE ALTERAÇÕES") : "[X]"} alterações de conteúdo por mês (textos, fotos, produtos). Alterações acima disso ou novas páginas são orçadas à parte.</p>
  <p>1.4. <strong>Instagram.</strong> Planejamento e publicação de até ${tem("insta") ? v("cond.posts", "Nº DE POSTS") : "[X]"} posts e ${tem("insta") ? v("cond.stories", "Nº DE STORIES") : "[X]"} stories por mês, com aprovação prévia do CLIENTE. Não inclui atendimento de mensagens, salvo se marcado no Anexo I.</p>
  <p>1.5. <strong>Anúncios pagos.</strong> Criação, gestão e otimização de campanhas em ${v("cond.plataformas", "Google Ads / Meta Ads")}, com relatório mensal. A verba de mídia é paga pelo CLIENTE diretamente à plataforma e não está incluída no valor deste contrato.</p>
  <p>1.6. <strong>Sistema e catálogo.</strong> Desenvolvimento e manutenção do sistema descrito no Anexo I (ex.: catálogo de produtos, painel de notícias, agendamento, CRM). Funcionalidades fora da descrição são orçadas à parte.</p>
  <p>1.7. Não estão incluídos, salvo indicação no Anexo I: produção de fotos e vídeos presenciais, traduções juramentadas, compra de imagens pagas, taxas de registro de domínio e verba de anúncios.</p>

  <h2>Cláusula 2 – Valores e pagamento</h2>
  <p>2.1. Pela implantação (criação do site e/ou sistema), o CLIENTE pagará ${impl != null ? R(impl) : mensais && mens != null ? "o valor de implantação dispensado nos termos do item 2.3" : R(null, "valor da implantação", `pac.${pac.id}.impl`)}${impl != null ? `, em ${v("cond.pagImpl", "50% na assinatura e 50% na publicação / X parcelas")}` : ""}.</p>
  <p>2.2. ${mensais ? `Pelos serviços mensais marcados no Anexo I, o CLIENTE pagará ${R(mens, "VALOR MENSAL", `pac.${pac.id}.mensal`)} por mês, com vencimento todo dia ${v("cond.vencDia", "DIA DO VENCIMENTO")}, por ${v("cond.formaPag", "FORMA DE PAGAMENTO")}, a partir de ${v("cond.inicio", "INÍCIO DOS SERVIÇOS")}.` : "Não há serviços mensais contratados."}</p>
  <p>2.3. Quando o site estiver incluído no pacote mensal, o valor de implantação do item 2.1 fica dispensado, desde que cumprido o prazo mínimo da Cláusula 3. Em caso de rescisão antes desse prazo, aplica-se o item 3.4.</p>
  <p>2.4. Os valores serão reajustados a cada 12 meses pela variação do IPCA/IBGE.</p>
  <p>2.5. Em caso de atraso, incidem multa de 2%, juros de 1% ao mês e correção pelo IPCA. Após ${v("cond.suspensao", "15")} dias de atraso, a OVERTUS poderá suspender os serviços, mediante aviso por e-mail, até a regularização.</p>
  <p>2.6. A OVERTUS emitirá nota fiscal de cada pagamento recebido.</p>

  <h2>Cláusula 3 – Prazo e rescisão</h2>
  <p>3.1. O site será entregue para aprovação em até ${v("cond.entregaDias", "PRAZO DE ENTREGA")} dias úteis após o CLIENTE enviar os materiais pedidos (logo, textos, fotos, acessos). Atrasos no envio prorrogam esse prazo na mesma medida.</p>
  <p>3.2. Os serviços mensais têm prazo mínimo de ${v("cond.minimoMeses", "12")} meses a partir de ${v("cond.inicio", "INÍCIO DOS SERVIÇOS")}. Depois disso, o contrato se renova automaticamente por prazo indeterminado.</p>
  <p>3.3. Após o prazo mínimo, qualquer parte pode encerrar o contrato com aviso por escrito de 30 dias, sem multa.</p>
  <p>3.4. Se o CLIENTE encerrar antes do prazo mínimo, pagará multa de ${v("cond.multa", "30%")} sobre as mensalidades que faltam até o fim desse prazo. Se o site foi incluído sem custo de implantação (item 2.3), pagará também o valor de implantação de ${impl != null ? brl(impl) : "R$ [VALOR]"}, proporcional aos meses que faltam.</p>
  <p>3.5. Qualquer parte pode rescindir imediatamente, sem multa, se a outra descumprir este contrato e não corrigir a falha em 15 dias após notificação, ou em caso de falência ou recuperação judicial.</p>

  <h2>Cláusula 4 – Obrigações das partes</h2>
  <p>4.1. <strong>A OVERTUS se obriga a:</strong> executar os serviços com qualidade profissional e nos prazos combinados; manter o site no ar, salvo paradas de manutenção avisadas ou falhas do provedor de hospedagem; enviar relatório mensal dos serviços de Instagram e anúncios; guardar sigilo sobre as informações do CLIENTE.</p>
  <p>4.2. <strong>O CLIENTE se obriga a:</strong> enviar materiais, informações e acessos necessários; responder aos pedidos de aprovação em até ${v("cond.aprovDias", "5")} dias úteis; garantir que tem direito de uso sobre logos, fotos e textos que fornecer; pagar em dia; indicar um responsável para falar com a OVERTUS.</p>
  <p>4.3. <strong>Aprovações.</strong> Cada entrega (proposta visual, site, post, campanha) é enviada para aprovação por e-mail ou WhatsApp. Sem resposta em ${v("cond.aprovDias", "5")} dias úteis, considera-se aprovada. Mudanças pedidas após a aprovação contam como alteração nova.</p>
  <p>4.4. A OVERTUS não responde por informações incorretas fornecidas pelo CLIENTE nem por preços, promoções ou promessas que o CLIENTE pedir para publicar.</p>

  <h2>Cláusula 5 – Geração de clientes (leads)</h2>
  <p>5.1. Quando o módulo "Garantia de clientes" estiver marcado no Anexo I, a OVERTUS se compromete a gerar, em média, ${tem("leads") ? v("cond.leads", "Nº DE LEADS") : "[X]"} leads por mês, medidos ao longo de cada trimestre.</p>
  <p>5.2. <strong>Lead</strong> é um contato de potencial cliente recebido pelos canais geridos pela OVERTUS (formulário do site, WhatsApp do site, mensagem vinda de anúncio), com nome e telefone ou e-mail válidos. Contatos repetidos, spam, fornecedores e candidatos a emprego não contam.</p>
  <p>5.3. A OVERTUS <strong>não garante vendas, faturamento nem fechamento de negócios.</strong> O atendimento, o preço e o fechamento são de responsabilidade exclusiva do CLIENTE.</p>
  <p>5.4. A meta só vale enquanto: (a) a verba de anúncios combinada no Anexo I for mantida pelo CLIENTE; (b) o CLIENTE estiver com pagamentos em dia; (c) o CLIENTE não alterar, pausar ou desligar as campanhas por conta própria.</p>
  <p>5.5. Se a média do trimestre ficar abaixo da meta, cumpridas as condições do item 5.4, a OVERTUS ${v("cond.compensacao", "continuará o trabalho sem cobrar a mensalidade do módulo no mês seguinte / concederá desconto de X% no mês seguinte")}, sem outra indenização.</p>

  <h2>Cláusula 6 – Propriedade do site, domínio e contas</h2>
  <p>6.1. O <strong>domínio</strong> (ex.: www.cliente.com.br) é registrado em nome do CLIENTE e pertence a ele. Se a OVERTUS pagar o registro, o valor é repassado ao CLIENTE.</p>
  <p>6.2. As <strong>contas de Instagram, Google e Meta</strong> pertencem ao CLIENTE. A OVERTUS recebe acesso de administrador apenas para prestar os serviços e o devolve ao fim do contrato.</p>
  <p>6.3. <strong>Conteúdos</strong> fornecidos pelo CLIENTE (logo, fotos, textos) continuam sendo dele. Posts e artes produzidos pela OVERTUS e pagos pertencem ao CLIENTE.</p>
  <p>6.4. <strong>Site.</strong> Pago integralmente o valor de implantação (ou cumprido o prazo mínimo, quando o site foi incluído no pacote), o CLIENTE recebe o direito de uso definitivo do layout, textos e imagens do seu site. Antes disso, o direito de uso é temporário e vinculado a este contrato.</p>
  <p>6.5. O código-base, ferramentas, modelos e componentes reutilizáveis da OVERTUS continuam sendo da OVERTUS, que pode usá-los em outros projetos sem expor dados do CLIENTE.</p>
  <p>6.6. <strong>Saída.</strong> Ao fim do contrato, quitados os valores, a OVERTUS entrega em até ${v("cond.saida", "15")} dias os arquivos do site em formato que permita hospedá-lo em outro lugar, e transfere todos os acessos.</p>
  <p>6.7. A OVERTUS pode citar o CLIENTE e mostrar o site no seu portfólio, salvo pedido contrário por escrito.</p>

  <h2>Cláusula 7 – Dados pessoais (LGPD) e sigilo</h2>
  <p>7.1. Nos dados de visitantes e leads recebidos pelo site e anúncios, o CLIENTE é o controlador e a OVERTUS a operadora, nos termos da Lei 13.709/2018 (LGPD). A OVERTUS só trata esses dados para prestar os serviços e conforme as instruções do CLIENTE.</p>
  <p>7.2. A OVERTUS manterá medidas de segurança razoáveis, não venderá nem compartilhará os dados com terceiros (exceto as plataformas necessárias, como hospedagem, Google e Meta) e avisará o CLIENTE em até ${v("cond.incidente", "48")} horas sobre qualquer incidente de segurança.</p>
  <p>7.3. O site terá política de privacidade e aviso de cookies. O CLIENTE é responsável por responder aos pedidos dos titulares dos dados, com apoio da OVERTUS.</p>
  <p>7.4. Ao fim do contrato, a OVERTUS entrega ao CLIENTE e apaga de seus sistemas os dados pessoais que tiver, salvo os que a lei obrigue a guardar.</p>
  <p>7.5. As partes manterão sigilo sobre informações comerciais uma da outra durante o contrato e por 2 anos após seu fim.</p>

  <h2>Cláusula 8 – Responsabilidade</h2>
  <p>8.1. A responsabilidade total da OVERTUS por danos ligados a este contrato fica limitada ao valor pago pelo CLIENTE nos últimos 12 meses, salvo dolo ou culpa grave.</p>
  <p>8.2. A OVERTUS não responde por lucros cessantes, por quedas ou mudanças de regras das plataformas (Google, Meta, Instagram, provedores de hospedagem), nem por bloqueio de contas causado por conteúdo ou conduta do CLIENTE.</p>

  <h2>Cláusula 9 – Disposições gerais e foro</h2>
  <p>9.1. Este contrato não cria vínculo de emprego, sociedade ou representação entre as partes.</p>
  <p>9.2. Alterações só valem por escrito, inclusive por e-mail trocado entre os responsáveis indicados.</p>
  <p>9.3. As partes aceitam a assinatura eletrônica deste contrato (ex.: gov.br, Clicksign, DocuSign), nos termos da MP 2.200-2/2001 e da Lei 14.063/2020.</p>
  <p>9.4. Fica eleito o foro da comarca de ${v("ov.cidade", "CIDADE/UF DA OVERTUS")} para resolver qualquer questão deste contrato.</p>
  <p>${v("ov.cidade", "CIDADE/UF DA OVERTUS")}, ${hoje()}.</p>
  <div class="ass">
    <div><strong>OVERTUS</strong> – ${v("ov.repr", "REPRESENTANTE DA OVERTUS")}</div>
    <div><strong>CLIENTE</strong> – ${v("cli.repr", "NOME E CARGO")}</div>
    <div>Testemunha 1: ${v("cond.testemunha1", "TESTEMUNHA 1")}</div>
    <div>Testemunha 2: ${v("cond.testemunha2", "TESTEMUNHA 2")}</div>
  </div>

  <h2 class="anexo">Anexo I – Módulos contratados</h2>
  <p>Pacote: <strong>${esc(pac.nome)}</strong>.${sitesV ? ` Versões apresentadas: ${sitesV}${emp.proposta && emp.proposta.escolhida ? `; escolhida pelo CLIENTE: versão ${esc(emp.proposta.escolhida)}` : ""}.` : ""}</p>
  <table><tr><th>Contratado</th><th>Módulo</th><th>Detalhe combinado</th><th>Valor</th></tr>
    ${linha("site", `${v("cond.paginas", "Nº DE PÁGINAS")}; idiomas: ${v("cond.idiomas", "IDIOMAS")}`, impl != null ? brl(impl) + " implantação" : "–")}
    ${linha("manut", `${v("cond.alteracoes", "Nº DE ALTERAÇÕES")} alterações/mês`, "no pacote")}
    ${linha("insta", `${v("cond.posts", "Nº DE POSTS")} posts e ${v("cond.stories", "Nº DE STORIES")} stories/mês`, "no pacote")}
    ${linha("anun", `${v("cond.plataformas", "Google / Meta")}, verba de mídia ${v("cond.verba", "VERBA DE ANÚNCIOS")} /mês paga pelo cliente`, "no pacote")}
    ${linha("sist", v("cond.sistema", "DESCREVER FUNCIONALIDADES"), "no pacote")}
    ${linha("leads", `meta de ${v("cond.leads", "Nº DE LEADS")} leads/mês, média trimestral (Cláusula 5)`, "incluído")}
    <tr><th colspan="3">Total do pacote</th><th>${valorPac(pac)}</th></tr>
  </table>
  <p>${mensais ? `<strong>Prazo mínimo:</strong> ${v("cond.minimoMeses", "12")} meses. <strong>Início:</strong> ${v("cond.inicio", "INÍCIO DOS SERVIÇOS")}. <strong>Vencimento:</strong> dia ${v("cond.vencDia", "DIA DO VENCIMENTO")}. ` : ""}<strong>Forma de pagamento:</strong> ${v("cond.formaPag", "FORMA DE PAGAMENTO")}.</p>
</div>`;
}

/* ---------- tela ---------- */
function render() {
  if (!emp) return;
  faltas = [];
  $("#folha").innerHTML = aba === "proposta" ? proposta() : contrato();
  const F = $("#faltas");
  F.hidden = !faltas.length;
  F.innerHTML = faltas.length ? `Falta preencher (${faltas.length}): ` + faltas.map(f => `<button type="button" data-ir="${esc(f.p)}">${esc(f.rot)}</button>`).join("") : "";
  document.title = `${aba === "proposta" ? "Proposta" : "Contrato"} - ${emp.nome}`;
}
$("#faltas").addEventListener("click", e => {
  const b = e.target.closest("[data-ir]"); if (!b) return;
  const p = b.dataset.ir, el = document.querySelector(`[data-p="${CSS.escape(p)}"]`) || document.querySelector(`[data-pc]`);
  if (!el) return;
  const det = el.closest("details"); if (det) det.open = true;
  el.scrollIntoView({ block: "center", behavior: "smooth" }); el.focus({ preventScroll: true });
});
document.querySelectorAll("[data-aba]").forEach(b => b.onclick = () => {
  aba = b.dataset.aba;
  document.querySelectorAll("[data-aba]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  render(); $(".papel").scrollTop = 0;
  try { history.replaceState(null, "", "#" + aba); } catch {}
});

// Anota uma linha no histórico do CRM (o mesmo campo da ficha), sem repetir a mesma linha no mesmo dia.
async function anotar(texto, extra = {}) {
  const atual = await ler(ID).catch(() => emp);
  const n = new Date(), linha = `${String(n.getDate()).padStart(2, "0")}/${String(n.getMonth() + 1).padStart(2, "0")}: ${texto}`;
  const h = String((atual && atual.contato && atual.contato.historico) || "").trim();
  const patch = { ...extra, atualizadoEm: Date.now() };
  if (h.split("\n")[0] !== linha) patch.contato = { historico: h ? linha + "\n" + h : linha };
  const j = await gravar(ID, "update", patch);
  emp = { ...emp, ...j.doc };
}
$("#imprimir").onclick = async () => {
  const pac = aba === "proposta" ? PACN[get("pac.rec")] : pacoteContrato();
  try {
    await gravarAgora();
    await anotar(`${aba === "proposta" ? "Proposta" : "Contrato"} gerado${aba === "proposta" ? "a" : ""} no hub (${pac ? pac.nome + ", " + (valorPac(pac, false) || "sem preço") : "sem pacote"})`,
      { proposta: aba === "proposta" ? { geradaEm: Date.now() } : { contratoEm: Date.now(), pacote: pac && pac.id } });
    toast("Anotado no histórico da empresa");
  } catch (e) { toast("Não anotou no CRM: " + e.message); }
  render();
  setTimeout(() => window.print(), 50);
};
$("#enviada").onclick = async () => {
  const b = $("#enviada"); b.disabled = true;
  try {
    await gravarAgora();
    await anotar("Proposta enviada ao cliente", { status: "proposta", proposta: { enviadaEm: Date.now() } });
    b.textContent = "Marcada como enviada"; toast("Etapa: Proposta enviada");
  } catch (e) { b.disabled = false; toast("Não salvou: " + e.message); }
};

async function iniciar() {
  if (!ID) { $("#folha").innerHTML = `<div class="msg">Abra esta página pelo botão “Proposta e contrato” na ficha de uma empresa.</div>`; $("#form").hidden = true; return; }
  try {
    const [d, o, c] = await Promise.all([ler(ID), ler(CFG_ID).catch(() => null), fetch("/documento/clientes.json").then(r => r.ok ? r.json() : {}).catch(() => ({}))]);
    if (!d) { $("#folha").innerHTML = `<div class="msg">Empresa não encontrada no banco do hub.</div>`; return; }
    emp = d; clientes = c || {};
    if (o) { const { id, versao, lista, nome, ...resto } = o; ov = resto; }
    D = d.documento ? JSON.parse(JSON.stringify(d.documento)) : {};
    delete D.editadoEm;
    P = padroes(d);
  } catch (e) { $("#folha").innerHTML = `<div class="msg">Não consegui abrir a empresa: ${esc(e.message)}</div>`; return; }
  $("#titulo").textContent = `Proposta e contrato · ${emp.nome}`;
  if (emp.status === "proposta") $("#enviada").textContent = "Já marcada como enviada";
  if (location.hash === "#contrato") $('[data-aba="contrato"]').click();
  montarForm(); render();
}
// Ao fechar a aba com algo ainda por salvar, manda mesmo assim (keepalive deixa o pedido terminar).
window.addEventListener("pagehide", () => {
  if (!tSalvar) return;
  clearTimeout(tSalvar); tSalvar = null;
  const env = (id, op, data) => fetch("/api/empresas/" + encodeURIComponent(id), { method: "POST", keepalive: true, credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ op, data }) });
  env(ID, "update", { documento: { ...D, editadoEm: Date.now() } });
  if (pendOv) env(CFG_ID, "set", { ...ov, lista: "_config", nome: "Dados da Overtus" });
});
iniciar();
})();
