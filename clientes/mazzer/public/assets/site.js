// Menu, fotos passando, abas do processo, filtro e busca do catálogo, galeria, antes e depois,
// lista de orçamento (fica no navegador) e formulário que monta o e-mail.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); document.body.classList.toggle('menu-aberto', !a); });

// fotos passando no topo (versão A)
const slides = document.querySelector('[data-slides]');
if (slides) {
  const figs = [...slides.children], pontos = document.querySelector('[data-slides-pontos]');
  let i = 0, timer;
  const vai = n => { figs[i].classList.remove('on'); pontos.children[i].removeAttribute('aria-current'); i = (n + figs.length) % figs.length; figs[i].classList.add('on'); pontos.children[i].setAttribute('aria-current', 'true'); };
  figs.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Foto ${n + 1}`); b.onclick = () => { vai(n); clearInterval(timer); }; pontos.append(b); });
  pontos.children[0].setAttribute('aria-current', 'true');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 5500);
}

// abas (etapas do processo, versão B)
document.querySelectorAll('[role=tablist]').forEach(lista => {
  const tabs = [...lista.querySelectorAll('[role=tab]')];
  const ativa = t => tabs.forEach(o => { const on = o === t; o.setAttribute('aria-selected', String(on)); o.tabIndex = on ? 0 : -1; document.getElementById(o.getAttribute('aria-controls')).hidden = !on; });
  tabs.forEach((t, k) => {
    t.tabIndex = k ? -1 : 0;
    t.addEventListener('click', () => ativa(t));
    t.addEventListener('keydown', e => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return; const n = tabs[(k + d + tabs.length) % tabs.length]; n.focus(); ativa(n); });
  });
});

// catálogo: filtro por linha + busca (versão B)
const busca = document.querySelector('[data-busca]'), chips = [...document.querySelectorAll('[data-filtro]')];
let filtro = '';
function filtra() {
  const q = (busca?.value || '').trim().toLowerCase();
  let total = 0;
  document.querySelectorAll('[data-linha]').forEach(sec => {
    const naLinha = !filtro || sec.dataset.linha === filtro;
    let n = 0;
    sec.querySelectorAll('li[data-busca]').forEach(li => { const ok = naLinha && (!q || li.dataset.busca.includes(q)); li.hidden = !ok; if (ok) n++; });
    const vazia = !sec.querySelector('li[data-busca]');
    sec.hidden = vazia ? (!!q || (filtro && filtro !== sec.dataset.linha)) : !n;
    total += n;
  });
  const sem = document.querySelector('[data-sem-res]'); if (sem) sem.hidden = total > 0;
}
busca?.addEventListener('input', filtra);
chips.forEach(c => c.addEventListener('click', () => { filtro = c.dataset.filtro; chips.forEach(o => o.setAttribute('aria-pressed', String(o === c))); filtra(); }));
if (chips.length && location.hash) { const c = chips.find(x => x.dataset.filtro === location.hash.slice(1)); if (c) c.click(); }

// galeria do equipamento
document.querySelectorAll('[data-gal]').forEach(g => {
  const fig = g.querySelector('.gal-principal'), im = fig.querySelector('img');
  g.querySelectorAll('.gal-mini button').forEach(b => b.addEventListener('click', () => {
    im.src = b.dataset.src; im.width = b.dataset.w; im.height = b.dataset.h;
    const des = b.dataset.desenho === '1';
    im.classList.toggle('desenho', des); fig.classList.toggle('eh-desenho', des);
    let cap = fig.querySelector('figcaption');
    if (des && !cap) { cap = document.createElement('figcaption'); cap.textContent = 'Desenho técnico'; fig.append(cap); }
    if (!des && cap) cap.remove();
    g.querySelectorAll('.gal-mini button').forEach(o => o.toggleAttribute('aria-current', o === b));
  }));
});

// antes e depois
document.querySelectorAll('.aa input[type=range]').forEach(r => r.addEventListener('input', () => r.parentElement.style.setProperty('--p', r.value + '%')));

// lista de orçamento
const CHAVE = 'mazzer-orcamento';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; } };
const salva = l => { try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch {} };
const texto = l => l.map(x => `${x.item} · ${x.qt || 'qtd. a definir'}`).join('; ');
function pinta() {
  const l = ler();
  document.querySelectorAll('.orc-n').forEach(n => { n.textContent = l.length; n.hidden = !l.length; });
  document.querySelectorAll('.add').forEach(b => { const on = l.some(x => x.item === b.dataset.item); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
  const box = document.querySelector('[data-orc-lista]');
  if (!box) return;
  document.querySelector('[data-orc-campo]').value = texto(l);
  if (!l.length) { box.innerHTML = '<p class="orc-vazia">Nenhum item ainda. Use o botão "Orçar" nos equipamentos ou descreva abaixo o que precisa.</p>'; return; }
  box.innerHTML = `<ul>${l.map((x, k) => `<li><b>${x.item}</b><input aria-label="Quantidade de ${x.item}" placeholder="Qtd." value="${x.qt || ''}" data-k="${k}"><button type="button" data-tira="${k}" aria-label="Tirar ${x.item}">✕</button></li>`).join('')}</ul>`;
  box.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => { const l2 = ler(); l2[inp.dataset.k].qt = inp.value; salva(l2); document.querySelector('[data-orc-campo]').value = texto(l2); }));
  box.querySelectorAll('[data-tira]').forEach(b => b.addEventListener('click', () => { const l2 = ler(); l2.splice(+b.dataset.tira, 1); salva(l2); pinta(); }));
}
document.addEventListener('click', e => {
  const b = e.target.closest('.add'); if (!b) return;
  const l = ler(), k = l.findIndex(x => x.item === b.dataset.item);
  if (k >= 0) l.splice(k, 1); else l.push({ item: b.dataset.item });
  salva(l); pinta();
});
pinta();

// formulário: abre o e-mail com tudo preenchido
document.querySelectorAll('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
  location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
}));
