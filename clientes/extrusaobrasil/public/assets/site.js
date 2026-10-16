// Extrusão Brasil: menu no celular, abas de aplicações, linha interativa (B), galeria ampliada, vídeos e formulário pelo WhatsApp.
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const bt = $('.abre-menu'), menu = $('.menu');
  if (bt && menu) bt.addEventListener('click', () => { const a = menu.classList.toggle('aberto'); bt.setAttribute('aria-expanded', a); });

  // Abas de aplicações: escolha pelo produto final (também abre pela âncora, ex.: #tubos)
  $$('[data-abas]').forEach(g => {
    const bs = $$('[role=tab]', g), ps = $$('.apl-p', g);
    const ir = n => { bs.forEach((b, k) => b.setAttribute('aria-selected', k === n)); ps.forEach((p, k) => p.classList.toggle('on', k === n)); };
    bs.forEach((b, k) => b.addEventListener('click', () => ir(k)));
    const ids = (g.dataset.ids || '').split(',');
    const deHash = () => { const k = ids.indexOf(location.hash.slice(1)); if (k >= 0) { ir(k); g.closest('section').scrollIntoView(); } };
    addEventListener('hashchange', deHash); deHash();
  });

  // Linha de extrusão interativa (versão B)
  $$('[data-linha]').forEach(l => {
    const sl = $$('.ln-slide', l), bs = $$('.ln-est button', l);
    let t;
    const ir = n => { sl.forEach((e, k) => e.classList.toggle('on', k === n)); bs.forEach((e, k) => e.setAttribute('aria-selected', k === n)); };
    bs.forEach((b, k) => b.addEventListener('click', () => { clearInterval(t); ir(k); }));
    let n = 1;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => { n = (n + 1) % sl.length; ir(n); }, 4500);
  });

  // Caixa para foto ampliada e vídeo
  const cx = document.createElement('div');
  cx.className = 'caixa'; cx.hidden = true;
  cx.innerHTML = '<button class="fechar" aria-label="Fechar">×</button><figure></figure>';
  document.body.append(cx);
  const fig = $('figure', cx);
  const fechar = () => { cx.hidden = true; fig.innerHTML = ''; };
  cx.addEventListener('click', e => { if (e.target === cx || e.target.classList.contains('fechar')) fechar(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  document.addEventListener('click', e => {
    const z = e.target.closest('[data-zoom]');
    if (z) { fig.innerHTML = `<img src="${z.dataset.zoom}" alt="${esc(z.dataset.legenda || '')}"><figcaption>${esc(z.dataset.legenda || '')}</figcaption>`; cx.hidden = false; return; }
    const v = e.target.closest('[data-video]');
    if (v) { fig.innerHTML = `<video src="${v.dataset.video}" controls autoplay playsinline></video><figcaption>${esc(v.dataset.titulo || '')}</figcaption>`; cx.hidden = false; }
  });

  // Formulários: montam a mensagem e abrem o WhatsApp de vendas
  $$('.form-zap').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f), l = ['Olá! Vim pelo site da Extrusão Brasil.'];
    for (const [k, r] of [['nome', 'Nome'], ['empresa', 'Empresa'], ['fone', 'Telefone'], ['cidade', 'Cidade/UF'], ['msg', 'Mensagem']]) if (d.get(k)) l.push(`${r}: ${d.get(k)}`);
    open(`${f.dataset.zap}?text=${encodeURIComponent(l.join('\n'))}`, '_blank', 'noopener');
  }));
})();
