// Menu, frentes da home (B), busca e filtro do catálogo de laboratório, zoom de fotos, lista de orçamento (fica no navegador)
// e formulários que montam e-mail ou WhatsApp.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', Math.max(0, topo.getBoundingClientRect().bottom) + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// frentes: passar o mouse (ou focar) troca a foto
const frentes = document.querySelector('[data-frentes]');
if (frentes) {
  const links = [...frentes.querySelectorAll('[data-frente]')], figs = [...frentes.querySelectorAll('.frentes-fotos figure')];
  const vai = i => { links.forEach((l, k) => l.classList.toggle('on', k === i)); figs.forEach((f, k) => f.classList.toggle('on', k === i)); };
  links.forEach((l, i) => { l.addEventListener('mouseenter', () => vai(i)); l.addEventListener('focus', () => vai(i)); });
}

// busca e filtro no catálogo de laboratório
const busca = document.querySelector('[data-busca]');
let filtro = '';
function filtra() {
  const q = (busca?.value || '').trim().toLowerCase();
  let total = 0;
  document.querySelectorAll('[data-grupo]').forEach(g => {
    const okCat = !filtro || g.dataset.cat === filtro;
    let n = 0;
    g.querySelectorAll('[data-busca]').forEach(r => { const ok = okCat && (!q || r.dataset.busca.includes(q)); r.hidden = !ok; if (ok) n++; });
    g.hidden = !n; total += n;
    if (q && n && g.tagName === 'DETAILS') g.open = true;
  });
  const sem = document.querySelector('[data-sem-res]'); if (sem) sem.hidden = total > 0;
}
busca?.addEventListener('input', filtra);
document.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => {
  filtro = b.dataset.filtro;
  document.querySelectorAll('[data-filtro]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  filtra();
}));
if (location.hash.startsWith('#lab-')) { const d = document.querySelector(location.hash); if (d?.tagName === 'DETAILS') d.open = true; }

// zoom de fotos e páginas do folder
const dlg = document.querySelector('[data-zoom-dlg]');
document.addEventListener('click', e => {
  const z = e.target.closest('[data-zoom]'); if (!z || !dlg) return;
  const im = dlg.querySelector('img'); im.src = z.dataset.zoom; im.alt = z.querySelector('img')?.alt || '';
  dlg.showModal();
});
dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

// lista de orçamento
const CHAVE = 'bioplast-orcamento';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; } };
const gravar = l => { try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch {} pinta(); };
const resumo = l => l.map(x => `${x.item} · ${x.qt || 'qtd. a definir'}`).join('; ');
function pinta() {
  const l = ler();
  document.querySelectorAll('.orc-n').forEach(n => { n.textContent = l.length; n.hidden = !l.length; });
  document.querySelectorAll('.add').forEach(b => b.classList.toggle('on', l.some(x => x.item === b.dataset.item)));
  const campo = document.querySelector('[data-orc-campo]'); if (campo) campo.value = resumo(l);
  const box = document.querySelector('[data-orc-lista]');
  if (!box || !l.length) return;
  box.innerHTML = '<ul></ul>';
  const ul = box.firstChild;
  l.forEach((x, k) => {
    const li = document.createElement('li');
    const b = document.createElement('b'); b.textContent = x.item;
    const inp = document.createElement('input'); inp.placeholder = 'Quantidade'; inp.value = x.qt || ''; inp.setAttribute('aria-label', `Quantidade de ${x.item}`);
    inp.addEventListener('change', () => { const l2 = ler(); l2[k].qt = inp.value; try { localStorage.setItem(CHAVE, JSON.stringify(l2)); } catch {} if (campo) campo.value = resumo(l2); });
    const t = document.createElement('button'); t.type = 'button'; t.textContent = '✕'; t.setAttribute('aria-label', `Tirar ${x.item}`);
    t.addEventListener('click', () => { const l2 = ler(); l2.splice(k, 1); gravar(l2); if (!l2.length) location.reload(); });
    li.append(b, inp, t); ul.append(li);
  });
}
document.addEventListener('click', e => {
  const b = e.target.closest('.add'); if (!b) return;
  const l = ler(), k = l.findIndex(x => x.item === b.dataset.item);
  if (k >= 0) l.splice(k, 1); else l.push({ item: b.dataset.item });
  gravar(l);
});
pinta();

// formulários
const linhasForm = f => [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
document.querySelectorAll('form[data-mailto]').forEach(f => {
  f.addEventListener('submit', e => { e.preventDefault(); location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhasForm(f).join('\n'))}`; });
  f.querySelector('[data-wa]')?.addEventListener('click', ev => { if (!f.reportValidity()) return; open(`https://wa.me/${ev.currentTarget.dataset.wa}?text=${encodeURIComponent(`${f.dataset.assunto}\n${linhasForm(f).join('\n')}`)}`, '_blank'); });
});
