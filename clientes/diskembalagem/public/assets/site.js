// Disk Embalagens: menu, banners, catálogo (filtro, busca, detalhes), lista de orçamento salva no navegador e envio.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const body = document.body;
  const V = body.dataset.v;
  const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icMais = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const icMenos = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
  const icOk = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  // ---------- catálogo (um arquivo para as duas versões) ----------
  let catalogo = null, porId = {};
  const carregar = () => catalogo ? Promise.resolve(catalogo) : fetch('/assets/catalogo.json').then(r => r.json()).then(d => {
    catalogo = d;
    d.cats.forEach(c => { c.subNome = Object.fromEntries(c.subs); });
    d.p.forEach(a => { porId[a[0]] = { id: a[0], nome: a[1], cat: a[2], sub: a[3], desc: a[4], sp: a[5] ? [a[5], a[6], a[7]] : null }; });
    return d;
  });
  const catDe = s => catalogo.cats.find(c => c.s === s);
  const foto = (p, cls = 'sp') => p.sp
    ? `<span class="${cls}" role="img" aria-label="${esc(p.nome)}" style="--f:url(/assets/cat/${p.sp[0]}.webp);--x:${p.sp[1]};--y:${p.sp[2]}"></span>`
    : `<span class="${cls} sp-vazio" role="img" aria-label="Foto em breve"><img src="/assets/logo.svg" alt=""></span>`;
  const rota = c => `/${V}/produtos/${c}/`;

  // ---------- lista de orçamento ----------
  const CHAVE = 'disk-lista';
  let lista = {};
  try { lista = JSON.parse(localStorage.getItem(CHAVE) || '{}') || {}; } catch (e) { lista = {}; }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch (e) {} atualizar(); };
  const totalItens = () => Object.keys(lista).length;
  function atualizar() {
    const n = totalItens();
    $$('[data-lista-n]').forEach(b => { b.textContent = n; b.classList.toggle('tem', n > 0); });
    const barra = $('.b-barra'); if (barra) barra.hidden = n === 0 || !!$('[data-lista-tabela]');
    $$('.pd, .mp').forEach(el => {
      const na = !!lista[el.dataset.id];
      el.classList.toggle('na-lista', na);
      const t = $('.pd-add span', el); if (t) t.textContent = na ? `Na lista (${lista[el.dataset.id]})` : (V === 'b' && !el.classList.contains('mp') ? 'Adicionar' : 'Adicionar à lista');
    });
    desenharMini(); desenharTabela();
  }
  let avisoT;
  function aviso(txt) {
    const a = $('.aviso'); if (!a) return;
    a.innerHTML = txt; a.hidden = false; a.classList.add('vis');
    clearTimeout(avisoT); avisoT = setTimeout(() => { a.classList.remove('vis'); setTimeout(() => { a.hidden = true; }, 300); }, 2600);
  }
  function adicionar(id, q = 1) {
    lista[id] = (lista[id] || 0) + q; salvar();
    carregar().then(() => aviso(`${icOk}<span><b>${esc(porId[id].nome)}</b> na lista (${lista[id]})</span><a href="/${V}/orcamento/">Ver lista</a>`));
  }

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const pd = add.closest('[data-id]');
      const inp = $('[data-qtd] input', pd);
      adicionar(pd.dataset.id, Math.max(1, parseInt(inp && inp.value, 10) || 1));
      if (inp) inp.value = 1;
      return;
    }
    const mm = e.target.closest('[data-mais],[data-menos]');
    if (mm && mm.closest('[data-qtd]')) {
      const inp = $('input', mm.closest('[data-qtd]'));
      inp.value = Math.max(1, (parseInt(inp.value, 10) || 1) + (mm.hasAttribute('data-mais') ? 1 : -1));
      inp.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }
    const abre = e.target.closest('[data-abre]');
    if (abre) { abrirProduto(abre.closest('[data-id]').dataset.id); return; }
    if (e.target.closest('[data-fecha]')) { fecharModal(); return; }
    const gav = e.target.closest('[data-gaveta]');
    if (gav && !$('[data-lista-tabela]') && totalItens() > 0) { e.preventDefault(); abrirGaveta(); return; }
    if (e.target.closest('[data-fecha-gaveta]')) { fecharGaveta(); return; }
    const tira = e.target.closest('[data-tira]');
    if (tira) { delete lista[tira.dataset.tira]; salvar(); return; }
    if (e.target.closest('[data-imprimir]')) { window.print(); return; }
    if (e.target.closest('[data-copia]')) {
      const t = $('.envio-txt', e.target.closest('.envio-ok'));
      navigator.clipboard && navigator.clipboard.writeText(t.value).then(() => aviso(`${icOk}<span>Texto copiado</span>`));
      t.select();
    }
  });

  // ---------- detalhes do produto ----------
  const modal = $('#modal');
  let ultimoFoco = null;
  function abrirProduto(id) {
    carregar().then(() => {
      const p = porId[id]; if (!p) return;
      const c = catDe(p.cat);
      const outros = catalogo.p.filter(a => a[2] === p.cat && a[3] === p.sub && a[0] !== p.id).slice(0, 4).map(a => porId[a[0]]);
      $('.modal-corpo', modal).innerHTML = `<div class="mp" data-id="${p.id}">
<div class="mp-foto">${foto(p)}</div>
<div class="mp-txt"><p class="mp-cat"><a href="${rota(p.cat)}">${esc(c.n)}</a> / <a href="${rota(p.cat)}#${p.sub}">${esc(c.subNome[p.sub])}</a></p>
<h2 id="modal-t">${esc(p.nome)}</h2>
${p.desc ? `<div class="mp-desc"><h3>Informações do produto</h3><p>${esc(p.desc).replace(/\n/g, '<br>')}</p></div>` : '<p class="mp-desc mp-desc-v">Medidas, marcas e embalagens: consulte a Disk.</p>'}
<div class="mp-acao"><div class="qtd" data-qtd><button type="button" data-menos aria-label="Menos">${icMenos}</button><input type="number" min="1" value="1" inputmode="numeric" aria-label="Quantidade"><button type="button" data-mais aria-label="Mais">${icMais}</button></div><button class="pd-add" type="button" data-add>${icMais}<span>Adicionar à lista</span></button></div>
<p class="mp-fone">Ou ligue: ${esc(body.dataset.fones)}</p></div></div>
${outros.length ? `<div class="mp-outros"><h3>Você também pode precisar</h3><div class="mp-outros-g">${outros.map(o => `<button type="button" data-id="${o.id}" data-abre>${foto(o)}<span>${esc(o.nome)}</span></button>`).join('')}</div></div>` : ''}`;
      if (modal.hidden) ultimoFoco = document.activeElement;
      modal.hidden = false; body.classList.add('travado');
      requestAnimationFrame(() => modal.classList.add('aberto'));
      $('.modal-x', modal).focus();
      history.replaceState(null, '', `#p${p.id}`);
      atualizar();
    });
  }
  function fecharModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('aberto'); body.classList.remove('travado');
    setTimeout(() => { modal.hidden = true; }, 200);
    if (location.hash.startsWith('#p')) history.replaceState(null, '', location.pathname + location.search);
    ultimoFoco && ultimoFoco.focus && ultimoFoco.focus();
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { fecharModal(); fecharGaveta(); } });
  if (/^#p\d+$/.test(location.hash)) abrirProduto(location.hash.slice(2));

  // ---------- gaveta da lista (versão B) ----------
  const gaveta = $('#gaveta');
  function abrirGaveta() { if (!gaveta) return; gaveta.hidden = false; body.classList.add('travado'); requestAnimationFrame(() => gaveta.classList.add('aberta')); desenharMini(); }
  function fecharGaveta() { if (!gaveta || gaveta.hidden) return; gaveta.classList.remove('aberta'); body.classList.remove('travado'); setTimeout(() => { gaveta.hidden = true; }, 250); }
  function desenharMini() {
    const el = $('[data-lista-mini]'); if (!el || (gaveta && gaveta.hidden)) return;
    carregar().then(() => {
      const ids = Object.keys(lista).filter(id => porId[id]);
      el.innerHTML = ids.length ? ids.map(id => linha(porId[id], true)).join('') : '<p class="orc-vazia">Sua lista está vazia.</p>';
    });
  }
  const linha = (p, mini) => `<div class="li" data-id="${p.id}">${foto(p)}<div class="li-txt"><b>${esc(p.nome)}</b><small>${esc(catDe(p.cat).n)}</small></div>
<div class="qtd qtd-li" data-qtd data-li="${p.id}"><button type="button" data-menos aria-label="Menos">${icMenos}</button><input type="number" min="1" value="${lista[p.id]}" inputmode="numeric" aria-label="Quantidade de ${esc(p.nome)}"><button type="button" data-mais aria-label="Mais">${icMais}</button></div>
<button type="button" class="li-x" data-tira="${p.id}" aria-label="Tirar ${esc(p.nome)} da lista">×</button></div>`;
  document.addEventListener('change', e => {
    const q = e.target.closest('[data-li]');
    if (q) { lista[q.dataset.li] = Math.max(1, parseInt(e.target.value, 10) || 1); salvar(); }
  });

  // ---------- página da lista ----------
  function desenharTabela() {
    const el = $('[data-lista-tabela]'); if (!el) return;
    carregar().then(() => {
      if (el.contains(document.activeElement) && document.activeElement.tagName === 'INPUT') return;
      const ids = Object.keys(lista).filter(id => porId[id]);
      $('.orc-vazia').hidden = ids.length > 0;
      el.innerHTML = ids.length ? `<div class="li-cab"><span>${ids.length} ${ids.length === 1 ? 'produto' : 'produtos'}</span><span>Quantidade</span></div>${ids.map(id => linha(porId[id])).join('')}` : '';
    });
  }

  // ---------- envio (orçamento e contato) ----------
  $$('form[data-envio]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    let txt;
    if (f.dataset.envio === 'orcamento') {
      const ids = Object.keys(lista).filter(id => porId[id]);
      if (!ids.length) { aviso('<span>Adicione produtos à lista antes de enviar.</span>'); return; }
      txt = `Pedido de orçamento pelo site\n\nNome: ${d.nome}${d.empresa ? `\nEmpresa: ${d.empresa}` : ''}\nCidade: ${d.cidade}\nTelefone: ${d.telefone}\n\n${ids.map(id => `${lista[id]} x ${porId[id].nome}`).join('\n')}${d.obs ? `\n\nObservações: ${d.obs}` : ''}`;
    } else {
      txt = `Mensagem pelo site\n\nNome: ${d.nome}\nE-mail: ${d.email}\nCidade: ${d.cidade} - ${d.estado}\n\n${d.mensagem}`;
    }
    const whats = body.dataset.whats, email = body.dataset.email;
    const ok = $('.envio-ok', f);
    if (whats) window.open(`https://wa.me/${whats}?text=${encodeURIComponent(txt)}`, '_blank');
    else if (email) location.href = `mailto:${email}?subject=${encodeURIComponent(f.dataset.envio === 'orcamento' ? 'Pedido de orçamento' : 'Contato pelo site')}&body=${encodeURIComponent(txt)}`;
    ok.innerHTML = `<p><b>Pronto!</b> ${whats || email ? 'Confira e envie a mensagem que abriu.' : `Ligue para ${esc(body.dataset.fones)} e passe o pedido, ou copie o texto abaixo.`}</p><textarea class="envio-txt" rows="6" readonly>${esc(txt)}</textarea><button type="button" class="bt bt-contorno" data-copia>Copiar texto</button>`;
    ok.hidden = false;
  }));

  // ---------- catálogo: filtro, subcategoria, ordem, busca ----------
  const grade = $('[data-grade]');
  if (grade) {
    const itens = $$('.pd', grade);
    const ordemOriginal = itens.slice();
    let nomes = new Map(itens.map(el => [el, norm($('.pd-nome', el).textContent)]));
    const filtro = $('[data-filtro]'), ordem = $('[data-ordem]');
    let sub = (location.hash.match(/^#([a-z0-9-]+)$/) || [])[1] || '';
    const q0 = new URLSearchParams(location.search).get('q');
    if (q0 && filtro) filtro.value = q0;
    function aplicar() {
      const termos = norm(filtro ? filtro.value : '').split(/\s+/).filter(Boolean);
      let n = 0;
      itens.forEach(el => {
        const vis = (!sub || el.dataset.sub === sub) && termos.every(t => nomes.get(el).includes(t));
        el.hidden = !vis; if (vis) n++;
      });
      $$('.chip[data-sub]').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.sub === sub)));
      $$('[data-sub-link]').forEach(a => a.classList.toggle('ativo', a.dataset.subLink === sub));
      const cn = $('[data-cat-n]'); if (cn) cn.textContent = n;
      const vz = $('.cat-vazio'); if (vz) vz.hidden = n > 0;
    }
    function ordenar() {
      const m = ordem.value;
      const arr = m === 'cat' ? ordemOriginal.slice() : itens.slice().sort((a, b) => nomes.get(a).localeCompare(nomes.get(b)) * (m === 'za' ? -1 : 1));
      arr.forEach(el => grade.appendChild(el));
    }
    $$('.chip[data-sub]').forEach(c => c.addEventListener('click', () => { sub = c.dataset.sub; history.replaceState(null, '', sub ? `#${sub}` : location.pathname + location.search); aplicar(); }));
    $$('[data-sub-link]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); sub = a.dataset.subLink; history.replaceState(null, '', `#${sub}`); aplicar(); grade.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
    window.addEventListener('hashchange', () => { const h = (location.hash.match(/^#([a-z0-9-]+)$/) || [])[1]; if (h !== undefined && !/^p\d+$/.test(h)) { sub = h; aplicar(); } });
    filtro && filtro.addEventListener('input', aplicar);
    ordem && ordem.addEventListener('change', ordenar);
    aplicar();
  }

  // ---------- sugestões na busca do cabeçalho ----------
  $$('[data-sugere]').forEach(inp => {
    const caixa = $('.sugestoes', inp.form);
    let sel = -1;
    inp.addEventListener('focus', carregar, { once: true });
    inp.addEventListener('input', () => carregar().then(() => {
      const termos = norm(inp.value).split(/\s+/).filter(Boolean);
      if (!termos.length) { caixa.hidden = true; return; }
      const achados = catalogo.p.filter(a => termos.every(t => norm(a[1]).includes(t)));
      sel = -1;
      caixa.innerHTML = achados.slice(0, 6).map(a => { const p = porId[a[0]]; return `<button type="button" class="sug" data-id="${p.id}" data-abre>${foto(p)}<span><b>${esc(p.nome)}</b><small>${esc(catDe(p.cat).n)}</small></span></button>`; }).join('')
        + `<a class="sug-todos" href="/${V}/produtos/?q=${encodeURIComponent(inp.value)}">${achados.length ? `Ver os ${achados.length} resultados` : 'Nenhum produto com esse nome. Buscar mesmo assim'}</a>`;
      caixa.hidden = false;
    }));
    inp.addEventListener('keydown', e => {
      const ops = $$('.sug, .sug-todos', caixa);
      if (caixa.hidden || !ops.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + ops.length) % ops.length; ops.forEach((o, i) => o.classList.toggle('sel', i === sel)); }
      if (e.key === 'Enter' && sel >= 0) { e.preventDefault(); ops[sel].click(); }
    });
    document.addEventListener('click', e => { if (!inp.form.contains(e.target) || e.target.closest('.sug')) caixa.hidden = true; });
  });

  // ---------- menu do celular ----------
  $$('[data-menu]').forEach(b => b.addEventListener('click', () => {
    const ab = body.classList.toggle('menu-aberto'); b.setAttribute('aria-expanded', String(ab));
  }));

  // ---------- banners (versão A) ----------
  const car = $('[data-carrossel]');
  if (car) {
    const slides = $$('.slide', car), pontos = $$('.ponto', car);
    let i = 0, t;
    const ir = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('ativo', k === i); s.setAttribute('aria-hidden', String(k !== i)); $$('a', s).forEach(a => a.tabIndex = k === i ? 0 : -1); });
      pontos.forEach((p, k) => p.toggleAttribute('aria-current', k === i));
    };
    const auto = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => ir(i + 1), 6500); };
    $('[data-prox]', car).addEventListener('click', () => { ir(i + 1); auto(); });
    $('[data-ant]', car).addEventListener('click', () => { ir(i - 1); auto(); });
    pontos.forEach(p => p.addEventListener('click', () => { ir(+p.dataset.ir); auto(); }));
    car.addEventListener('mouseenter', () => clearInterval(t)); car.addEventListener('mouseleave', auto);
    let x0 = null;
    car.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { ir(i + (dx < 0 ? 1 : -1)); auto(); } x0 = null; });
    auto();
  }

  atualizar();
  if ($('[data-lista-tabela]') || $('[data-sugere]')) carregar().then(atualizar);
})();
