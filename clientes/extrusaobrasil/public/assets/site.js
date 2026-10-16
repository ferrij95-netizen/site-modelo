// Extrusão Brasil: menu no celular, carrossel da capa (A), linha interativa (B), galeria ampliada, vídeos e formulário pelo WhatsApp.
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const bt = $('.abre-menu'), menu = $('.menu');
  if (bt && menu) bt.addEventListener('click', () => { const a = menu.classList.toggle('aberto'); bt.setAttribute('aria-expanded', a); });

  // Carrossel da capa (versão A)
  const car = $('[data-carrossel]');
  if (car) {
    const s = $$('.hero-s', car), p = $$('.hero-pts button', car);
    let i = 0, t;
    const ir = n => { i = (n + s.length) % s.length; s.forEach((e, k) => e.classList.toggle('on', k === i)); p.forEach((e, k) => e.classList.toggle('on', k === i)); };
    const auto = () => { clearInterval(t); t = setInterval(() => ir(i + 1), 6000); };
    p.forEach((b, k) => b.addEventListener('click', () => { ir(k); auto(); }));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) auto();
  }

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
    for (const [k, r] of [['nome', 'Nome'], ['email', 'E-mail'], ['fone', 'Telefone'], ['cidade', 'Cidade/UF'], ['msg', 'Mensagem']]) if (d.get(k)) l.push(`${r}: ${d.get(k)}`);
    open(`${f.dataset.zap}?text=${encodeURIComponent(l.join('\n'))}`, '_blank', 'noopener');
  }));
})();
