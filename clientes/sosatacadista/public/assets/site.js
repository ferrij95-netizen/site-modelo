// SOS Atacadista: menu do celular, encarte em carrossel, filtros do catálogo, lista de pedido (WhatsApp) e formulários.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const WHATS = '5511947458219';
const versao = document.body.classList.contains('v-b') ? 'b' : 'a';

// ---------- menu ----------
const btn = $('.menu-btn'), menu = $('#menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// ---------- carrossel do encarte ----------
$$('[data-slider]').forEach(sl => {
  const tri = $('.sl-trilho', sl), itens = $$('.sl-item', sl), pontos = $$('[data-sl-ir]', sl);
  let i = 0, timer;
  const ir = n => {
    i = (n + itens.length) % itens.length;
    tri.style.transform = `translateX(${-i * 100}%)`;
    pontos.forEach((p, k) => p.toggleAttribute('aria-current', k === i));
  };
  const auto = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(i + 1), 5000); };
  $$('[data-sl]', sl).forEach(b => b.addEventListener('click', () => { ir(i + Number(b.dataset.sl)); auto(); }));
  pontos.forEach(p => p.addEventListener('click', () => { ir(Number(p.dataset.slIr)); auto(); }));
  sl.addEventListener('mouseenter', () => clearInterval(timer));
  sl.addEventListener('mouseleave', auto);
  let x0 = null;
  sl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  sl.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) ir(i + (dx < 0 ? 1 : -1)); x0 = null; auto(); });
  auto();
});

// ---------- catálogo: busca + departamento + subcategoria ----------
const sem = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
$$('[data-catalogo]').forEach(cat => {
  const itens = $$('[data-item]', cat), q = $('[data-busca]', cat), vazio = $('[data-vazio]', cat);
  const params = new URLSearchParams(location.search);
  let dep = params.get('dep') || '', sub = '';
  if (q && params.get('q')) q.value = params.get('q');
  const aplicar = () => {
    const termos = sem(q?.value || '').split(/\s+/).filter(Boolean);
    let n = 0;
    itens.forEach(el => {
      const ok = (!dep || el.dataset.dep === dep) && (!sub || el.dataset.sub === sub) && termos.every(t => el.dataset.texto.includes(t));
      el.hidden = !ok; if (ok) n++;
    });
    if (vazio) vazio.hidden = n > 0;
  };
  const marcar = (attr, val) => $$(`[${attr}]`, cat).forEach(b => b.setAttribute('aria-pressed', String(b.getAttribute(attr) === val)));
  $$('[data-dep-filtro]', cat).forEach(b => b.addEventListener('click', () => { dep = b.dataset.depFiltro; marcar('data-dep-filtro', dep); aplicar(); }));
  $$('[data-sub-filtro]', cat).forEach(b => b.addEventListener('click', () => { sub = b.dataset.subFiltro; marcar('data-sub-filtro', sub); aplicar(); }));
  q?.addEventListener('input', aplicar);
  if (dep) marcar('data-dep-filtro', dep);
  aplicar();
});

// ---------- lista de pedido ----------
const CHAVE = 'sos-pedido';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch { return {}; } };
let pedido = ler();
const gravar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(pedido)); } catch { /* prévia sem armazenamento */ } };
let catalogo = null;
const carregar = () => catalogo ? Promise.resolve(catalogo) : fetch('/assets/catalogo.json').then(r => r.json()).then(c => (catalogo = c)).catch(() => (catalogo = {}));

const total = () => Object.values(pedido).reduce((a, b) => a + b, 0);
function definir(ref, n) {
  n = Math.max(0, Math.min(9999, Math.round(Number(n) || 0)));
  if (n) pedido[ref] = n; else delete pedido[ref];
  gravar(); atualizar();
}
function atualizar() {
  const t = total(), itens = Object.keys(pedido).length;
  $$('[data-conta-pedido]').forEach(el => { el.textContent = itens; el.classList.toggle('tem', t > 0); });
  $$('[data-qtd]').forEach(q => { const inp = $('input', q); if (document.activeElement !== inp) inp.value = pedido[q.dataset.qtd] || 0; q.closest('tr, li')?.classList.toggle('no-pedido', !!pedido[q.dataset.qtd]); });
  $$('[data-add]').forEach(b => { const n = pedido[b.dataset.add]; b.classList.toggle('ok', !!n); $('span', b).textContent = n ? `${n} no pedido` : (versao === 'a' ? 'Adicionar' : 'Pôr no pedido'); });
  const listas = $$('[data-lista-pedido]');
  if (!listas.length) return;
  carregar().then(c => listas.forEach(ul => {
    const refs = Object.keys(pedido);
    ul.innerHTML = refs.length ? refs.map(r => {
      const [nome, venda, img] = c[r] || [`Ref. ${r}`, '', ''];
      return `<li class="ped-item"><span class="ped-foto">${img ? `<img src="/assets/prod/${img}" alt="" loading="lazy">` : ''}</span><span class="ped-nome">${nome}<small>Ref. ${r}${venda ? ` · ${venda}` : ''}</small></span>
        <span class="qtd" data-qtd="${r}"><button type="button" data-qtd-menos aria-label="Diminuir">−</button><input type="number" min="0" value="${pedido[r]}" aria-label="Quantidade de ${nome}"><button type="button" data-qtd-mais aria-label="Aumentar">+</button></span></li>`;
    }).join('') : `<li class="ped-vazio">Nenhum produto ainda. ${versao === 'a' ? 'Use o botão “Adicionar” nos produtos.' : 'Escolha a quantidade na tabela.'}</li>`;
  }));
}
document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) { definir(add.dataset.add, (pedido[add.dataset.add] || 0) + 1); add.classList.add('pulo'); setTimeout(() => add.classList.remove('pulo'), 300); return; }
  const q = e.target.closest('[data-qtd]');
  if (q && e.target.closest('[data-qtd-mais]')) definir(q.dataset.qtd, (pedido[q.dataset.qtd] || 0) + 1);
  if (q && e.target.closest('[data-qtd-menos]')) definir(q.dataset.qtd, (pedido[q.dataset.qtd] || 0) - 1);
  if (e.target.closest('[data-limpar-pedido]')) { pedido = {}; gravar(); atualizar(); }
});
document.addEventListener('change', e => { const q = e.target.closest('[data-qtd]'); if (q && e.target.matches('input')) definir(q.dataset.qtd, e.target.value); });
$$('[data-enviar-pedido]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const refs = Object.keys(pedido);
  if (!refs.length) { alert('Sua lista está vazia. Adicione produtos antes de enviar.'); return; }
  carregar().then(c => {
    const d = new FormData(f);
    const linhas = refs.map(r => { const [nome, venda] = c[r] || [`Ref. ${r}`, '']; return `• ${pedido[r]}x ${nome}${venda ? ` (por ${venda})` : ''} · ref. ${r}`; });
    const dados = [['Estabelecimento', d.get('est')], ['Nome', d.get('nome')], ['Bairro/cidade', d.get('bairro')], ['Receber por', d.get('modo')], ['Obs.', d.get('obs')]].filter(([, x]) => x).map(([k, x]) => `${k}: ${x}`);
    const txt = `Olá! Pedido pelo site da SOS Atacadista:\n\n${linhas.join('\n')}\n\n${dados.join('\n')}`;
    window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  });
}));
atualizar();

// ---------- encarte ampliado (B) ----------
const dlg = $('[data-zoom-dlg]');
if (dlg) {
  $$('[data-zoom]').forEach(b => b.addEventListener('click', () => { const img = $('img', dlg); img.src = b.dataset.zoom; img.alt = $('img', b).alt; dlg.showModal(); }));
  $('[data-zoom-fechar]', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
}

// ---------- formulários: na prévia não envia ----------
$$('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  $('.form-ok', f).hidden = false;
  $('button[type="submit"]', f).disabled = true;
}));
