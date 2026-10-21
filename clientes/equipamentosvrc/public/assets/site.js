// Menu, abas (ficha do produto, etapas, depoimentos), carrossel de depoimentos, galeria, busca de produtos, filtro por estado e formulários (e-mail ou WhatsApp).
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// abas
document.querySelectorAll('[role=tablist]').forEach(lista => {
  const tabs = [...lista.querySelectorAll('[role=tab]')];
  tabs.forEach(t => t.addEventListener('click', () => tabs.forEach(o => {
    const on = o === t; o.setAttribute('aria-selected', String(on)); document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
  })));
});

// sanfona: uma aberta por vez
document.querySelectorAll('[data-sanfona]').forEach(s => s.querySelectorAll('details').forEach(d => d.addEventListener('toggle', () => { if (d.open) s.querySelectorAll('details').forEach(o => o !== d && (o.open = false)); })));

// carrossel de depoimentos (versão A)
const car = document.querySelector('[data-carrossel]');
if (car) {
  const itens = [...car.children], pontos = document.querySelector('[data-pontos]');
  let i = 0, timer;
  const vai = n => { itens[i].hidden = true; pontos.children[i].removeAttribute('aria-current'); i = (n + itens.length) % itens.length; itens[i].hidden = false; pontos.children[i].setAttribute('aria-current', 'true'); };
  itens.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Depoimento ${n + 1}`); b.onclick = () => { vai(n); clearInterval(timer); }; pontos.append(b); });
  pontos.children[0].setAttribute('aria-current', 'true');
  document.querySelector('[data-ant]').onclick = () => { vai(i - 1); clearInterval(timer); };
  document.querySelector('[data-prox]').onclick = () => { vai(i + 1); clearInterval(timer); };
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 9000);
}

// galeria do produto
document.querySelectorAll('[data-galeria]').forEach(g => {
  const principal = g.querySelector('.gal-principal img');
  g.querySelectorAll('.gal-mini button').forEach(b => b.addEventListener('click', () => {
    principal.src = b.dataset.src; principal.width = b.dataset.w; principal.height = b.dataset.h;
    g.querySelectorAll('.gal-mini button').forEach(o => o.toggleAttribute('aria-current', o === b));
  }));
});

// vídeo do YouTube abre no lugar da miniatura
document.querySelectorAll('[data-yt]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  a.outerHTML = `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${a.dataset.yt}?autoplay=1" title="Vídeo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
}));

// busca de produtos
const busca = document.querySelector('[data-busca]');
busca?.addEventListener('input', () => {
  const q = busca.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  let total = 0;
  document.querySelectorAll('[data-linha]').forEach(sec => {
    let n = 0;
    const titulo = sec.querySelector('h2').textContent.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    sec.querySelectorAll('[data-busca-txt]').forEach(li => { const ok = !q || titulo.includes(q) || li.dataset.buscaTxt.normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q); li.hidden = !ok; if (ok) n++; });
    sec.hidden = q && !n; total += n;
  });
  document.querySelector('[data-sem-res]').hidden = total > 0;
});

// filtro de revendas por estado
const ufs = document.querySelector('[data-ufs]');
if (ufs) {
  const filtra = uf => {
    ufs.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.uf === uf)));
    document.querySelectorAll('[data-uf-grupo]').forEach(g => { g.hidden = !!uf && g.dataset.ufGrupo !== uf; });
  };
  ufs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) filtra(b.dataset.uf); });
  const h = location.hash.match(/^#uf-([A-Z]{2})$/); if (h) filtra(h[1]);
}

// formulários
const linhasForm = f => [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
document.querySelectorAll('form[data-mailto]').forEach(f => {
  f.addEventListener('submit', e => { e.preventDefault(); location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhasForm(f).join('\n'))}`; });
  f.querySelector('[data-wa]')?.addEventListener('click', ev => { if (!f.reportValidity()) return; open(`https://wa.me/${ev.currentTarget.dataset.wa}?text=${encodeURIComponent(`${f.dataset.assunto}\n${linhasForm(f).join('\n')}`)}`, '_blank'); });
});
