// Menu, banners, animações ao rolar, catálogo com busca e filtro, lista de orçamento (fica no navegador) e envio por e-mail.
document.documentElement.classList.add('js');
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// banners (versão A)
document.querySelectorAll('[data-banners]').forEach(box => {
  const figs = [...box.querySelectorAll('figure')], pts = [...box.querySelectorAll('.ban-pontos button')];
  let i = 0, t;
  const vai = n => { i = (n + figs.length) % figs.length; figs.forEach((f, k) => f.classList.toggle('ativo', k === i)); pts.forEach((p, k) => p.setAttribute('aria-current', String(k === i))); };
  const roda = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => vai(i + 1), 5000); };
  pts.forEach((p, k) => p.addEventListener('click', () => { vai(k); roda(); }));
  roda();
});

// animações ao rolar
const vis = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); vis.unobserve(e.target); } }), { threshold: .3 });
document.querySelectorAll('.regua, .manometro, .desenho').forEach(el => vis.observe(el));

// ---------- lista de orçamento ----------
const CHAVE = 'hidraucon-orcamento';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; } };
let lista = ler();
const grava = () => { try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch {} atualiza(); };
const aviso = document.querySelector('.aviso-orc');
let tAviso;
const avisa = txt => {
  if (!aviso) return;
  const v = location.pathname.split('/')[1] || 'a';
  aviso.innerHTML = `${txt}<a href="/${v}/orcamento/">Ver lista</a>`; aviso.hidden = false;
  clearTimeout(tAviso); tAviso = setTimeout(() => { aviso.hidden = true; }, 3500);
};
function atualiza() {
  const n = lista.reduce((s, x) => s + (+x.qtd || 1), 0);
  document.querySelectorAll('[data-orc-n]').forEach(b => { b.textContent = n; });
  document.querySelectorAll('[data-add]').forEach(b => {
    const tem = lista.some(x => x.id === b.dataset.add);
    b.classList.toggle('na-lista', tem);
    b.querySelector('span').textContent = tem ? 'Na lista' : 'Orçamento';
  });
  desenhaLista();
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function desenhaLista() {
  const ol = document.querySelector('[data-lista]'); if (!ol) return;
  ol.innerHTML = lista.map((x, k) => `<li><div><b>${esc(x.nome)}</b><small>${esc(x.detalhe || x.linha || '')}</small></div>
    <label><span class="sr">Quantidade</span><input type="number" min="1" value="${+x.qtd || 1}" data-qtd="${k}"></label>
    <button type="button" data-tira="${k}" aria-label="Tirar ${esc(x.nome)} da lista"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></li>`).join('');
  document.querySelector('[data-vazia]').hidden = lista.length > 0;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]');
  if (b) {
    const k = lista.findIndex(x => x.id === b.dataset.add);
    if (k >= 0) { lista.splice(k, 1); grava(); return; }
    lista.push({ id: b.dataset.add, nome: b.dataset.nome, linha: 'Linha ' + b.dataset.linha.toLowerCase(), qtd: 1 }); grava();
    document.querySelectorAll('.btn-orc').forEach(o => { o.classList.remove('pulsa'); void o.offsetWidth; o.classList.add('pulsa'); });
    avisa(`“${b.dataset.nome}” entrou no orçamento.`);
    return;
  }
  const t = e.target.closest('[data-tira]');
  if (t) { lista.splice(+t.dataset.tira, 1); grava(); }
});
document.addEventListener('change', e => {
  const q = e.target.closest('[data-qtd]');
  if (q) { lista[+q.dataset.qtd].qtd = Math.max(1, +q.value || 1); grava(); }
});

// mangueira montada
document.querySelectorAll('form[data-montador]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  const detalhe = [`Bitola ${d.bitola}`, d.pressao, `pontas: ${d.ponta1} / ${d.ponta2}`, d.comprimento ? `${d.comprimento} cm` : 'comprimento a definir', d.aplicacao].filter(Boolean).join(' · ');
  lista.push({ id: 'montada-' + Date.now(), nome: `Mangueira montada, linha ${d.linha.toLowerCase()}`, detalhe, qtd: Math.max(1, +d.qtd || 1) });
  grava(); avisa('Mangueira montada entrou no orçamento.');
  f.querySelector('[name=comprimento]').value = ''; f.querySelector('[name=aplicacao]').value = '';
  document.querySelector('[data-lista]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}));

// envio por e-mail para a loja escolhida
document.querySelectorAll('form[data-enviar]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const loja = f.querySelector('[name=loja]:checked');
  const itens = lista.map((x, k) => `${k + 1}. ${x.nome} (qtd ${x.qtd || 1})${x.detalhe ? '\n   ' + x.detalhe : ''}`);
  const corpo = [
    `Nome: ${d.get('nome')}`, d.get('empresa') && `Empresa: ${d.get('empresa')}`, `Telefone: ${d.get('telefone')}`, d.get('email') && `E-mail: ${d.get('email')}`,
    '', itens.length ? 'Itens do orçamento:' : '', ...itens, '', d.get('mensagem') && `Observações: ${d.get('mensagem')}`,
  ].filter(x => x !== null && x !== undefined && x !== false).join('\n');
  location.href = `mailto:${loja.dataset.email}?subject=${encodeURIComponent('Pedido de orçamento pelo site · ' + d.get('nome'))}&body=${encodeURIComponent(corpo)}`;
}));

// ---------- catálogo ----------
document.querySelectorAll('[data-catalogo]').forEach(cat => {
  const busca = cat.querySelector('[data-busca]'), conta = cat.querySelector('[data-conta]'), vazio = cat.querySelector('.cat-vazio');
  const fams = [...cat.querySelectorAll('.familia')], btns = [...cat.querySelectorAll('[data-filtro]')];
  let linha = '';
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const filtra = () => {
    const termos = norm(busca.value.trim()).split(/\s+/).filter(Boolean);
    let n = 0;
    fams.forEach(f => {
      const okL = !linha || f.dataset.linha === linha; let m = 0;
      f.querySelectorAll('.item').forEach(it => { const ok = okL && termos.every(t => norm(it.dataset.busca).includes(t)); it.hidden = !ok; if (ok) m++; });
      f.hidden = m === 0; n += m;
    });
    conta.textContent = n; vazio.hidden = n > 0;
  };
  btns.forEach(b => b.addEventListener('click', () => { linha = b.dataset.filtro; btns.forEach(x => x.setAttribute('aria-pressed', String(x === b))); filtra(); }));
  busca.addEventListener('input', filtra);
  const q = new URLSearchParams(location.search).get('busca');
  if (q) { busca.value = q; filtra(); }
  if (location.hash === '#busca') busca.focus();
});
atualiza();
