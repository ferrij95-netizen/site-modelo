// Menu, busca e filtros do catálogo, modo lista/grade (versão B), lista de pedido (fica no navegador)
// e envio da lista pelo WhatsApp ou e-mail.
const WA = '5541998760158', EMAIL = 'casadosplasticospr@gmail.com';
const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// ---------- catálogo ----------
const cat = document.querySelector('[data-catalogo]');
if (cat) {
  const campo = cat.querySelector('[data-busca-cat]'), itens = [...cat.querySelectorAll('.pr')];
  const chips = [...cat.querySelectorAll('[data-filtro]')], nivel = cat.dataset.nivel;
  const n = cat.querySelector('[data-cat-n]'), sem = cat.querySelector('[data-sem-res]');
  let filtro = '';
  const aplica = () => {
    const termos = semAcento(campo?.value || '').split(/\s+/).filter(Boolean);
    let k = 0;
    for (const it of itens) {
      const ok = (!filtro || it.dataset[nivel] === filtro) && termos.every(t => it.dataset.busca.includes(t));
      it.hidden = !ok; if (ok) k++;
    }
    if (n) n.textContent = k;
    if (sem) sem.hidden = k > 0;
  };
  const escolhe = f => { filtro = f; chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filtro === f))); aplica(); };
  chips.forEach(c => c.addEventListener('click', () => escolhe(c.dataset.filtro)));
  campo?.addEventListener('input', aplica);
  const qs = new URLSearchParams(location.search);
  if (qs.get('q') && campo) { campo.value = qs.get('q'); document.querySelectorAll('input[name=q]').forEach(i => { i.value = qs.get('q'); }); }
  if (qs.get('f') && chips.some(c => c.dataset.filtro === qs.get('f'))) escolhe(qs.get('f')); else aplica();

  const grade = cat.querySelector('[data-itens]'), vistas = [...cat.querySelectorAll('[data-vista]')];
  const vista = v => { grade.classList.toggle('em-linhas', v === 'linhas'); vistas.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.vista === v))); try { localStorage.setItem('cdp-vista', v); } catch {} };
  vistas.forEach(b => b.addEventListener('click', () => vista(b.dataset.vista)));
  if (vistas.length) { let v = 'linhas'; try { v = localStorage.getItem('cdp-vista') || v; } catch {} vista(v); }
}

// ---------- lista de pedido ----------
const CHAVE = 'cdp-lista';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; } };
const salvar = l => { try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch {} };
const texto = (l, extra = '') => `Olá! Vim pelo site da Casa dos Plásticos e gostaria de um orçamento:\n${l.map(x => `- ${x.qt || '?'} × ${x.item}`).join('\n')}${extra}`;

function linhas(box, editavel = true) {
  const l = ler();
  box.replaceChildren();
  if (!l.length) return;
  const ul = document.createElement('ul'); ul.className = 'lista-itens';
  l.forEach((x, k) => {
    const li = document.createElement('li');
    const a = document.createElement('a'); a.href = `${location.pathname.startsWith('/b/') ? '/b' : '/a'}/produto/${x.slug}/`; a.textContent = x.item;
    const q = document.createElement('input'); q.inputMode = 'numeric'; q.placeholder = 'Qtd.'; q.value = x.qt || ''; q.setAttribute('aria-label', `Quantidade de ${x.item}`);
    q.addEventListener('input', () => { const l2 = ler(); if (l2[k]) { l2[k].qt = q.value; salvar(l2); atualizaWa(); } });
    const t = document.createElement('button'); t.type = 'button'; t.className = 'tira'; t.textContent = '×'; t.setAttribute('aria-label', `Tirar ${x.item} da lista`);
    t.addEventListener('click', () => { const l2 = ler(); l2.splice(k, 1); salvar(l2); pinta(); });
    li.append(a, q);
    if (editavel) li.append(t);
    ul.append(li);
  });
  box.append(ul);
}
function atualizaWa() {
  document.querySelectorAll('[data-envia-wa]').forEach(a => { a.href = `https://wa.me/${WA}?text=${encodeURIComponent(texto(ler()))}`; });
}
function pinta() {
  const l = ler();
  document.querySelectorAll('.lista-n').forEach(n => { n.textContent = l.length; n.hidden = !l.length; });
  document.querySelectorAll('.add').forEach(b => b.classList.toggle('on', l.some(x => x.slug === b.dataset.slug)));
  const g = document.querySelector('[data-gaveta]');
  if (g) { linhas(g.querySelector('[data-lista-itens]')); g.querySelector('[data-vazia]').hidden = !!l.length; g.querySelector('[data-cheia]').hidden = !l.length; }
  const f = document.querySelector('[data-form-lista]');
  if (f) { if (l.length) linhas(f); else if (!f.querySelector('.vazia')) f.innerHTML = f.dataset.vazio || ''; }
  atualizaWa();
}
const fl = document.querySelector('[data-form-lista]'); if (fl) fl.dataset.vazio = fl.innerHTML;

document.addEventListener('click', e => {
  const b = e.target.closest('.add');
  if (b) {
    const l = ler(), k = l.findIndex(x => x.slug === b.dataset.slug);
    if (k >= 0) l.splice(k, 1); else l.push({ slug: b.dataset.slug, item: b.dataset.item, qt: '' });
    salvar(l); pinta();
    if (k < 0) { b.classList.add('pulo'); setTimeout(() => b.classList.remove('pulo'), 400); }
    return;
  }
  if (e.target.closest('[data-abre-lista]')) { const g = document.querySelector('[data-gaveta]'); g?.showModal(); return; }
  if (e.target.closest('[data-fecha]')) e.target.closest('dialog')?.close();
});
document.querySelector('[data-gaveta]')?.addEventListener('click', e => { if (e.target.matches('[data-gaveta]')) e.target.close(); });

// formulário de contato: monta a mensagem e abre WhatsApp ou e-mail
const form = document.querySelector('[data-form]');
let via = 'wa';
form?.querySelectorAll('[data-via]').forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
form?.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form), l = ler();
  const quem = `\n\nNome: ${d.get('nome')}${d.get('empresa') ? `\nEmpresa: ${d.get('empresa')}` : ''}\nE-mail: ${d.get('email')}${d.get('fone') ? `\nTelefone: ${d.get('fone')}` : ''}`;
  const corpo = (l.length ? texto(l) : 'Olá! Vim pelo site da Casa dos Plásticos.') + (d.get('msg') ? `\n\n${d.get('msg')}` : '') + quem;
  if (via === 'wa') window.open(`https://wa.me/${WA}?text=${encodeURIComponent(corpo)}`, '_blank', 'noopener');
  else location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(d.get('assunto') || 'Orçamento')}&body=${encodeURIComponent(corpo)}`;
});

pinta();
