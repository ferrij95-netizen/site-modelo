// SBS Engenharia: menu do celular, banner (A), galeria e caixa de luz, filtros de obras, mapa (B), abas de valores,
// busca na frota e aviso dos formulários de prévia.
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const btn = $('.menu-btn'), menu = $('#menu');
  btn?.addEventListener('click', () => { const ab = menu.classList.toggle('aberto'); btn.setAttribute('aria-expanded', ab); });

  // banner com troca automática
  const sl = $('[data-slider]');
  if (sl) {
    const slides = $$('[data-slide]', sl), txts = $$('[data-txt]', sl), dots = $$('[data-ir]', sl);
    let i = 0, t;
    const ir = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('ativo', k === i); s.setAttribute('aria-hidden', k !== i); });
      txts.forEach((s, k) => s.classList.toggle('ativo', k === i));
      dots.forEach((d, k) => k === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current'));
    };
    const roda = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => ir(i + 1), 6500); };
    dots.forEach(d => d.addEventListener('click', () => { ir(+d.dataset.ir); roda(); }));
    roda();
  }

  // caixa de luz
  const abrir = src => {
    const cx = document.createElement('div');
    cx.className = 'caixa-luz'; cx.setAttribute('role', 'dialog'); cx.setAttribute('aria-modal', 'true');
    cx.innerHTML = `<img src="${src}" alt=""><button type="button" aria-label="Fechar"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`;
    const fecha = () => { cx.remove(); document.removeEventListener('keydown', esc); };
    const esc = e => e.key === 'Escape' && fecha();
    cx.addEventListener('click', e => { if (e.target.tagName !== 'IMG') fecha(); });
    document.addEventListener('keydown', esc);
    document.body.append(cx); $('button', cx).focus();
  };
  $$('[data-lightbox]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); abrir(a.getAttribute('href')); }));

  // galeria da obra
  $$('[data-galeria]').forEach(g => {
    const a = $('.gal-principal a', g), img = $('.gal-principal img', g), leg = $('figcaption', g);
    $$('[data-foto]', g).forEach(b => b.addEventListener('click', () => {
      img.src = b.dataset.foto; img.alt = b.dataset.legenda; a.href = b.dataset.foto; leg.textContent = b.dataset.legenda;
      $$('[data-foto]', g).forEach(x => x.removeAttribute('aria-current')); b.setAttribute('aria-current', 'true');
    }));
  });

  // filtros de obras (A)
  const fl = $('[data-filtros]');
  fl?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', fl).forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('.obra-item').forEach(o => { o.hidden = b.dataset.f && o.dataset.seg !== b.dataset.f; });
  });

  // mapa: passar o mouse na obra acende o pino (B)
  const pinos = $$('.pino');
  const acende = slug => pinos.forEach(p => p.classList.toggle('ativo', !!slug && p.dataset.obras.split(' ').includes(slug)));
  $$('[data-obra]').forEach(a => {
    a.addEventListener('mouseenter', () => acende(a.dataset.obra)); a.addEventListener('focus', () => acende(a.dataset.obra));
    a.addEventListener('mouseleave', () => acende(null)); a.addEventListener('blur', () => acende(null));
  });
  pinos.forEach(p => {
    p.addEventListener('mouseenter', () => { p.classList.add('ativo'); p.dataset.obras.split(' ').forEach(s => $$(`[data-obra="${s}"]`).forEach(a => a.classList.add('ativo'))); });
    p.addEventListener('mouseleave', () => { p.classList.remove('ativo'); $$('[data-obra].ativo').forEach(a => a.classList.remove('ativo')); });
  });

  // abas de valores (B)
  $$('[data-abas]').forEach(w => $$('[data-aba]', w).forEach(b => b.addEventListener('click', () => {
    $$('[data-aba]', w).forEach(x => x.setAttribute('aria-selected', x === b));
    $$('[data-painel]', w).forEach(p => { p.hidden = p.dataset.painel !== b.dataset.aba; });
  })));

  // busca na frota (B)
  const bu = $('[data-busca]');
  if (bu) {
    const itens = $$('[data-lista] li'), conta = $('[data-conta]');
    const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    bu.addEventListener('input', () => {
      const q = norm(bu.value.trim()); let n = 0;
      itens.forEach(li => { const ok = !q || norm(li.textContent).includes(q); li.hidden = !ok; n += ok; });
      conta.textContent = `${n} equipamento${n === 1 ? '' : 's'}`;
    });
  }

  // formulários da prévia: não enviam nada, só avisam
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); const av = $('.form-aviso', f); av.hidden = false; av.focus?.(); }));
});
