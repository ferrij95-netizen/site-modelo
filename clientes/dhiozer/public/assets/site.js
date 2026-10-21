// Menu do celular, filtros e busca do catálogo, quantidades do pedido (ficam no navegador), ficha do produto,
// página do pedido que monta a mensagem para o WhatsApp do supervisor da região e formulários (WhatsApp ou e-mail).
const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const btn = $('.menu-btn'), menu = $('#menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// aparecer ao rolar
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('[data-rev], [data-etapas]').forEach(el => { el.classList.add('rev'); io.observe(el); });
}

// ---------- pedido (lista no navegador) ----------
const CHAVE = 'dhiozer-pedido';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch { return {}; } };
const gravar = o => { try { localStorage.setItem(CHAVE, JSON.stringify(o)); } catch {} conta(); };
function conta() {
  const o = ler(), n = Object.keys(o).length;
  $$('.ped-n').forEach(b => { b.textContent = n; b.hidden = !n; });
  const barra = $('[data-barra-ped]'); if (barra) barra.hidden = !n;
}
const aviso = t => { const a = $('[data-aviso]'); if (!a) return; a.textContent = t; a.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => a.classList.remove('on'), 1800); };
function poe(id, q) {
  const o = ler(); q = Math.max(0, Math.min(999, parseInt(q, 10) || 0));
  if (q) o[id] = q; else delete o[id];
  gravar(o);
  $$(`[data-id="${id}"] [data-qtd] input`).forEach(i => { i.value = q; i.closest('.prod')?.classList.toggle('no-ped', q > 0); });
  return q;
}
function pintaQtd() {
  const o = ler();
  $$('.prod').forEach(li => { const q = o[li.dataset.id] || 0; $('input', li).value = q; li.classList.toggle('no-ped', q > 0); });
}
document.addEventListener('click', e => {
  const b = e.target.closest('.q-mais, .q-menos'); if (!b) return;
  const li = b.closest('[data-id]'), inp = $('input', b.parentElement);
  const q = poe(li.dataset.id, (+inp.value || 0) + (b.classList.contains('q-mais') ? 1 : -1));
  const nome = $('.prod-nome', li)?.textContent || '';
  aviso(q ? `${nome}: ${q} cx no pedido` : `${nome} saiu do pedido`);
});
document.addEventListener('change', e => { const i = e.target.closest('[data-qtd] input'); if (i) poe(i.closest('[data-id]').dataset.id, i.value); });

// ---------- catálogo: busca e filtros ----------
const cat = $('[data-catalogo]');
if (cat) {
  const campo = $('[data-busca]', cat), itens = $$('.prod', cat), nEl = $('[data-n]', cat), sem = $('[data-sem-res]', cat);
  let fCat = '', fMarca = '';
  const filtra = () => {
    const q = semAcento(campo.value.trim()); let n = 0;
    itens.forEach(li => { const ok = (!fCat || li.dataset.cat === fCat) && (!fMarca || li.dataset.marca === fMarca) && (!q || q.split(/\s+/).every(p => li.dataset.busca.includes(p))); li.hidden = !ok; if (ok) n++; });
    nEl.textContent = n; sem.hidden = n > 0;
  };
  campo.addEventListener('input', filtra);
  const grupo = (attr, set) => $$(`[${attr}]`, cat).forEach(c => c.addEventListener('click', () => { set(c.getAttribute(attr)); $$(`[${attr}]`, cat).forEach(o => o.setAttribute('aria-pressed', String(o === c))); filtra(); }));
  grupo('data-cat-f', v => fCat = v); grupo('data-marca-f', v => fMarca = v);
  const ps = new URLSearchParams(location.search);
  if (ps.get('q')) { campo.value = ps.get('q'); $$('#q-topo').forEach(i => i.value = ps.get('q')); }
  if (ps.get('cat')) $$('[data-cat-f]', cat).find(c => c.dataset.catF === ps.get('cat'))?.click();
  filtra();
  $$('[data-vis]', cat).forEach(b => b.addEventListener('click', () => { $('.grade', cat).classList.toggle('em-lista', b.dataset.vis === 'lista'); $$('[data-vis]', cat).forEach(o => o.setAttribute('aria-pressed', String(o === b))); }));
}

// ---------- ficha do produto ----------
const ficha = $('[data-ficha]');
document.addEventListener('click', e => {
  const b = e.target.closest('[data-abre]'); if (!b || !ficha?.showModal) return;
  const li = b.closest('.prod'), img = $('img', li);
  $('[data-ficha-corpo]', ficha).innerHTML = `<div class="ficha-in" data-id="${li.dataset.id}"><img src="${img.src}" alt="${esc(img.alt)}"><div><span class="prod-marca">${$('.prod-marca', li).innerHTML}</span><h2 id="ficha-t">${$('.prod-nome', li).innerHTML}</h2><p>${$('.prod-emb', li).innerHTML}</p><p class="ficha-cat">${esc(li.dataset.cat)}</p><p class="ficha-q">Caixas no pedido</p>${$('[data-qtd]', li).outerHTML}</div></div>`;
  $('[data-ficha-corpo] input', ficha).value = ler()[li.dataset.id] || 0;
  ficha.showModal();
});
ficha?.addEventListener('click', e => { if (e.target === ficha) ficha.close(); });

// ---------- página do pedido ----------
const lista = $('[data-ped-lista]');
const dados = (() => { try { return JSON.parse($('#produtos')?.textContent || '{}'); } catch { return {}; } })();
function pintaPedido() {
  if (!lista) return;
  const o = ler(), ids = Object.keys(o).filter(id => dados[id]);
  if (!ids.length) { lista.innerHTML = `<p class="ped-vazio">${esc(lista.dataset.vazia)}</p><p><a class="btn btn-azul" href="../catalogo/">Abrir o catálogo</a></p>`; return; }
  lista.innerHTML = `<ul class="ped-itens" role="list">${ids.map(id => { const [nome, marca, emb, cod] = dados[id]; return `<li data-id="${id}"><img src="/assets/p/${id}.webp" alt="" loading="lazy"><div><span class="prod-marca">${esc(marca)}${cod ? ` · cód. ${esc(cod)}` : ''}</span><b class="prod-nome">${esc(nome)}</b><small>${esc(emb)}</small></div><div class="qtd" data-qtd><button type="button" class="q-menos" aria-label="Menos uma caixa"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg></button><input type="number" min="0" max="999" inputmode="numeric" value="${o[id]}" aria-label="Caixas de ${esc(nome)}"><button type="button" class="q-mais" aria-label="Mais uma caixa"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button></div></li>`; }).join('')}</ul><p class="ped-tot">${ids.length} produtos · ${ids.reduce((s, id) => s + o[id], 0)} caixas</p>`;
}
if (lista) {
  pintaPedido();
  document.addEventListener('click', e => { if (e.target.closest('.q-mais, .q-menos') && lista.contains(e.target)) setTimeout(pintaPedido); });
  document.addEventListener('change', e => { if (lista.contains(e.target)) setTimeout(pintaPedido); });
  $('[data-pedido]')?.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, o = ler(), ids = Object.keys(o).filter(id => dados[id]);
    if (!ids.length) { aviso('Escolha pelo menos um produto no catálogo'); return; }
    const reg = $('input[name="regiao"]:checked', f);
    const campos = [...new FormData(f)].filter(([k, v]) => k !== 'regiao' && String(v).trim()).map(([k, v]) => `${k}: ${v}`);
    const itens = ids.map(id => { const [nome, marca, emb, cod] = dados[id]; return `• ${o[id]} cx · ${nome} (${marca}${cod ? `, cód. ${cod}` : ''}${emb ? `, ${emb}` : ''})`; });
    const txt = `Pedido pelo site da Dhiozer${reg.dataset.sup !== 'comercial' ? ` · para ${reg.dataset.sup}` : ''}\n\n${campos.join('\n')}\n\n${itens.join('\n')}`;
    open(`https://wa.me/${reg.value}?text=${encodeURIComponent(txt)}`, '_blank');
  });
}

// ---------- formulários ----------
$$('form[data-wa-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim() && v !== 'on').map(([k, v]) => `${k}: ${v}`);
  open(`https://wa.me/${f.dataset.waForm}?text=${encodeURIComponent(`${f.dataset.assunto}\n${linhas.join('\n')}`)}`, '_blank');
}));
$$('form[data-mail-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim() && v !== 'on').map(([k, v]) => `${k}: ${v}`);
  location.href = `mailto:${f.dataset.mailForm}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
}));

// contagem dos números
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const io2 = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io2.unobserve(e.target);
    const el = e.target, m = el.textContent.match(/^([\d.]+)(.*)$/); if (!m) return;
    const alvo = +m[1].replace(/\./g, ''), ini = alvo > 1900 && alvo < 2100 ? 1990 : 0, fmt = n => (m[1].includes('.') ? n.toLocaleString('pt-BR') : String(n)) + m[2];
    const t0 = performance.now(); const passo = t => { const k = Math.min(1, (t - t0) / 1100); el.textContent = fmt(Math.round(ini + (alvo - ini) * (1 - (1 - k) ** 3))); if (k < 1) requestAnimationFrame(passo); }; requestAnimationFrame(passo);
  }), { threshold: .6 });
  $$('[data-conta]').forEach(el => io2.observe(el));
}

pintaQtd(); conta();
addEventListener('pageshow', () => { pintaQtd(); conta(); pintaPedido(); });
