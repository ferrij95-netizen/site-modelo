// Menu, abas, fotos passando, busca no catálogo, lista de orçamento (fica no navegador) e formulários que montam e-mail ou WhatsApp.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// abas (tipo de produto e "qual prego")
document.querySelectorAll('[role=tablist]').forEach(lista => {
  const tabs = [...lista.querySelectorAll('[role=tab]')];
  tabs.forEach(t => t.addEventListener('click', () => tabs.forEach(o => {
    const on = o === t; o.setAttribute('aria-selected', String(on)); document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
  })));
});

// fotos passando (versão A)
const slides = document.querySelector('[data-slides]');
if (slides) {
  const figs = [...slides.children], pontos = document.querySelector('[data-slides-pontos]');
  let i = 0, timer;
  const vai = n => { figs[i].classList.remove('on'); pontos.children[i].removeAttribute('aria-current'); i = (n + figs.length) % figs.length; figs[i].classList.add('on'); pontos.children[i].setAttribute('aria-current', 'true'); };
  figs.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Foto ${n + 1}`); b.onclick = () => { vai(n); clearInterval(timer); }; pontos.append(b); });
  pontos.children[0].setAttribute('aria-current', 'true');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 5200);
}

// busca no catálogo
const busca = document.querySelector('[data-busca]');
busca?.addEventListener('input', () => {
  const q = busca.value.trim().toLowerCase().replace(/\s*x\s*/g, ' x ');
  let total = 0;
  document.querySelectorAll('[data-linha]').forEach(sec => {
    let n = 0;
    sec.querySelectorAll('tbody tr').forEach(tr => { const ok = !q || (tr.dataset.busca || tr.textContent.toLowerCase()).includes(q) || sec.querySelector('h2').textContent.toLowerCase().includes(q); tr.hidden = !ok; if (ok) n++; });
    sec.hidden = q && !n; total += n;
  });
  document.querySelector('[data-sem-res]').hidden = total > 0;
});

// lista de orçamento
const CHAVE = 'pregostriangulo-orcamento';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; } };
const gravar = l => { try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch {} pinta(); };
function pinta() {
  const l = ler();
  document.querySelectorAll('.orc-n').forEach(n => { n.textContent = l.length; n.hidden = !l.length; });
  document.querySelectorAll('.add').forEach(b => b.classList.toggle('on', l.some(x => x.item === b.dataset.item)));
  const box = document.querySelector('[data-orc-lista]');
  if (!box) return;
  const campo = document.querySelector('[data-orc-campo]');
  campo.value = l.map(x => `${x.item} · ${x.qt || 'qtd. a definir'}`).join('; ');
  if (!l.length) return;
  box.innerHTML = `<ul>${l.map((x, k) => `<li><b>${x.item}</b><input aria-label="Quantidade de ${x.item}" placeholder="Quantidade" value="${x.qt || ''}" data-k="${k}"><button type="button" data-tira="${k}" aria-label="Tirar ${x.item}">✕</button></li>`).join('')}</ul>`;
  box.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => { const l2 = ler(); l2[inp.dataset.k].qt = inp.value; localStorage.setItem(CHAVE, JSON.stringify(l2)); campo.value = l2.map(x => `${x.item} · ${x.qt || 'qtd. a definir'}`).join('; '); }));
  box.querySelectorAll('[data-tira]').forEach(b => b.addEventListener('click', () => { const l2 = ler(); l2.splice(+b.dataset.tira, 1); gravar(l2); if (!l2.length) location.reload(); }));
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
