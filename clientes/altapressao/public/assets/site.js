// Menu, abas de serviços (B), etapas que acendem ao rolar, zoom de fotos e formulário que monta o e-mail.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', Math.max(0, topo.getBoundingClientRect().bottom) + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// abas de serviços
document.querySelectorAll('[data-abas]').forEach(box => {
  const tabs = [...box.querySelectorAll('[role=tab]')], abas = [...box.querySelectorAll('[role=tabpanel]')];
  const vai = i => { tabs.forEach((t, k) => t.setAttribute('aria-selected', String(k === i))); abas.forEach((a, k) => { a.hidden = k !== i; }); };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => vai(i));
    t.addEventListener('keydown', e => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); const n = (i + d + tabs.length) % tabs.length; vai(n); tabs[n].focus(); } });
  });
});

// etapas e linhas do logo que aparecem ao rolar
const vis = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); vis.unobserve(e.target); } }), { threshold: .25 });
document.querySelectorAll('[data-etapas], .onda-anima, .setas').forEach(el => vis.observe(el));
document.documentElement.classList.add('js');

// zoom de fotos
let dlg;
document.addEventListener('click', e => {
  const z = e.target.closest('[data-zoom]'); if (!z) return;
  e.preventDefault();
  if (!dlg) {
    dlg = document.createElement('dialog'); dlg.className = 'zoom';
    dlg.innerHTML = '<img alt=""><button type="button" aria-label="Fechar">×</button>';
    dlg.addEventListener('click', ev => { if (ev.target === dlg || ev.target.tagName === 'BUTTON') dlg.close(); });
    document.body.append(dlg);
  }
  const im = dlg.querySelector('img'); im.src = z.getAttribute('href'); im.alt = z.querySelector('img')?.alt || '';
  dlg.showModal();
});

// formulário: abre o e-mail com a mensagem pronta
const eq = new URLSearchParams(location.search).get('equipamento');
document.querySelectorAll('form[data-form]').forEach(f => {
  if (eq) { const s = f.querySelector('select'); const o = [...s.options].find(o => o.text.startsWith(eq)); if (o) s.value = o.text; }
  f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
    location.href = `mailto:altapressao@altapressao.com.br?subject=${encodeURIComponent('Contato pelo site · ' + (f.equipamento?.value || ''))}&body=${encodeURIComponent(linhas.join('\n'))}`;
  });
});
