// Menu do celular, banners passando (A), busca e filtro por área (B), lista de cotação (fica no navegador) e formulário que monta a mensagem do WhatsApp.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// banners (versão A)
const slides = document.querySelector('[data-slides]');
if (slides) {
  const figs = [...slides.querySelectorAll('.slide')], pontos = slides.querySelector('[data-slides-pontos]');
  let i = 0, timer;
  const vai = n => { figs[i].classList.remove('on'); pontos.children[i].removeAttribute('aria-current'); i = (n + figs.length) % figs.length; figs[i].classList.add('on'); pontos.children[i].setAttribute('aria-current', 'true'); };
  figs.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Banner ${n + 1}`); b.onclick = () => { vai(n); clearInterval(timer); }; pontos.append(b); });
  pontos.children[0].setAttribute('aria-current', 'true');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 5600);
}

// busca e filtro por área (catálogo e downloads da versão B)
const busca = document.querySelector('[data-busca]');
const chips = [...document.querySelectorAll('.chip[data-area]')];
let area = '';
const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function filtra() {
  const q = semAcento(busca?.value.trim() || '');
  let total = 0;
  document.querySelectorAll('.area-grupo, .doc-grupo').forEach(g => {
    let n = 0;
    const naArea = !area || g.dataset.grupo === area;
    g.querySelectorAll('[data-item-busca]').forEach(li => { const ok = naArea && (!q || li.dataset.itemBusca.includes(q)); li.hidden = !ok; if (ok) n++; });
    g.hidden = !n; total += n;
  });
  const sem = document.querySelector('[data-sem-res]'); if (sem) sem.hidden = total > 0;
}
busca?.addEventListener('input', filtra);
chips.forEach(c => c.addEventListener('click', () => { area = c.dataset.area; chips.forEach(o => o.setAttribute('aria-pressed', String(o === c))); filtra(); }));
if (chips.length && location.hash) { const c = chips.find(x => x.dataset.area === location.hash.slice(1)); if (c) c.click(); }

// lista de cotação
const CHAVE = 'medicor-cotacao';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; } };
const gravar = l => { try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch {} pinta(); };
const escHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function pinta() {
  const l = ler();
  document.querySelectorAll('.cot-n').forEach(n => { n.textContent = l.length; n.hidden = !l.length; });
  document.querySelectorAll('.add').forEach(b => b.classList.toggle('on', l.some(x => x.item === b.dataset.item)));
  const box = document.querySelector('[data-cot-lista]');
  if (!box) return;
  const campo = document.querySelector('[data-cot-campo]');
  const resumo = lista => lista.map(x => `${x.item} · ${x.qt || '?'}`).join('; ');
  campo.value = resumo(l);
  if (!l.length) { box.innerHTML = `<p class="cot-vazia">${escHtml(box.dataset.vazia)}</p>`; return; }
  box.innerHTML = `<ul>${l.map((x, k) => `<li><b>${escHtml(x.item)}</b><input aria-label="${escHtml(box.dataset.qtd)}: ${escHtml(x.item)}" placeholder="${escHtml(box.dataset.qtd)}" value="${escHtml(x.qt || '')}" data-k="${k}"><button type="button" data-tira="${k}" aria-label="${escHtml(box.dataset.tirar)}: ${escHtml(x.item)}">✕</button></li>`).join('')}</ul>`;
  box.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => { const l2 = ler(); l2[inp.dataset.k].qt = inp.value; try { localStorage.setItem(CHAVE, JSON.stringify(l2)); } catch {} campo.value = resumo(l2); }));
  box.querySelectorAll('[data-tira]').forEach(b => b.addEventListener('click', () => { const l2 = ler(); l2.splice(+b.dataset.tira, 1); gravar(l2); }));
}
document.addEventListener('click', e => {
  const b = e.target.closest('.add'); if (!b) return;
  const l = ler(), k = l.findIndex(x => x.item === b.dataset.item);
  if (k >= 0) l.splice(k, 1); else l.push({ item: b.dataset.item });
  gravar(l);
});
pinta();

// formulário: monta a mensagem e abre o WhatsApp comercial
document.querySelectorAll('form[data-wa-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
  open(`https://wa.me/${f.dataset.waForm}?text=${encodeURIComponent(`${f.dataset.assunto}\n${linhas.join('\n')}`)}`, '_blank');
}));
