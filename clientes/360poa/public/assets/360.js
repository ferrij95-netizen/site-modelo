// 360 POA Gastrobar: menu, pôr do sol de hoje, aberto agora, arco do dia, galeria, formulários e animações.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const body = document.body;

  // Menu do celular.
  const btn = $('[data-menu]');
  if (btn) btn.addEventListener('click', () => {
    const aberto = body.classList.toggle('menu-aberto');
    btn.setAttribute('aria-expanded', aberto);
  });

  // Topo fica sólido depois de rolar.
  const topo = $('[data-topo]');
  const rolar = () => topo && topo.classList.toggle('solido', scrollY > 40);
  addEventListener('scroll', rolar, { passive: true }); rolar();

  // Hora de Porto Alegre (UTC-3, sem horário de verão desde 2019), em minutos desde a meia-noite.
  const agoraPOA = () => { const d = new Date(Date.now() - 3 * 3600e3); return { d, min: d.getUTCHours() * 60 + d.getUTCMinutes() }; };
  const hm = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(Math.round(m % 60)).padStart(2, '0')}`;

  // Pôr do sol (algoritmo da NOAA) para a posição do restaurante.
  function porDoSol(d, lat, lon) {
    const N = Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5);
    const g = 2 * Math.PI / 365 * (N - 1);
    const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    const de = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    const r = Math.PI / 180;
    const ha = Math.acos(Math.cos(90.833 * r) / (Math.cos(lat * r) * Math.cos(de)) - Math.tan(lat * r) * Math.tan(de)) / r;
    return 720 - 4 * (lon - ha) - eq - 180;
  }
  const { d, min } = agoraPOA();
  const sol = porDoSol(d, +body.dataset.lat, +body.dataset.lon);
  $$('[data-hora-sol]').forEach(el => el.textContent = hm(sol).replace(':', 'h'));
  $$('[data-hora-sol-curta]').forEach(el => el.textContent = hm(sol));
  $$('[data-falta-sol]').forEach(el => {
    const f = sol - min;
    el.textContent = f > 60 ? `Faltam ${Math.floor(f / 60)}h${String(Math.round(f % 60)).padStart(2, '0')} para o pôr do sol` : f > 0 ? `Faltam ${Math.round(f)} minutos para o pôr do sol` : 'Reserve para ver o pôr do sol amanhã';
  });

  // Aberto agora (11:00 às 22:30, todos os dias).
  const ABRE = 11 * 60, FECHA = 22 * 60 + 30;
  const aberto = min >= ABRE && min < FECHA;
  $$('[data-aberto]').forEach(el => {
    el.classList.toggle('sim', aberto);
    $('[data-aberto-txt]', el).textContent = aberto ? 'Aberto agora · até 22:30' : 'Fechado agora · abre às 11:00';
  });

  // Arco do dia: o sol anda do almoço ao fechamento; o ponto marca o pôr do sol de hoje.
  const ponto = t => { const a = Math.PI * (1 - Math.min(1, Math.max(0, (t - ABRE) / (FECHA - ABRE)))); return [500 + 460 * Math.cos(a), 300 - 270 * Math.sin(a)]; };
  $$('[data-arco]').forEach(arco => {
    const [mx, my] = ponto(sol);
    $('[data-marca-sol]', arco).setAttribute('transform', `translate(${mx} ${my})`);
    const s = $('[data-sol-agora]', arco);
    const t = aberto ? min : (min < ABRE ? ABRE : FECHA);
    const [x, y] = ponto(t);
    s.setAttribute('transform', `translate(${x} ${y})`);
    arco.classList.toggle('noite', min >= sol || min < ABRE);
    const ativo = !aberto ? -1 : min < 14 * 60 ? 0 : min < sol - 45 ? 1 : min < sol + 30 ? 2 : 3;
    $$('.arco-momentos li', arco).forEach((li, i) => li.classList.toggle('agora', i === ativo));
  });

  // Fotos que trocam sozinhas (topo da página inicial).
  $$('[data-slides]').forEach(box => {
    const itens = $$('.slide', box); let i = 0;
    if (itens.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInterval(() => { itens[i].classList.remove('on'); i = (i + 1) % itens.length; itens[i].classList.add('on'); }, 6000);
  });

  // Setas do filme de fotos.
  $$('[data-rolar]').forEach(b => b.addEventListener('click', () => {
    const f = b.closest('section').querySelector('.filme');
    if (f) f.scrollBy({ left: +b.dataset.rolar * f.clientWidth * 0.8, behavior: 'smooth' });
  }));

  // Galeria em tela cheia.
  const lb = $('[data-lb]');
  let lista = [], pos = 0;
  const mostrar = () => { const a = lista[pos]; $('img', lb).src = a.href; $('img', lb).alt = a.dataset.legenda || ''; $('figcaption', lb).textContent = a.dataset.legenda || ''; };
  $$('[data-galeria]').forEach(g => $$('a', g).forEach((a, i, todos) => a.addEventListener('click', e => {
    e.preventDefault(); lista = todos; pos = i; mostrar(); lb.hidden = false; body.classList.add('lb-on');
  })));
  const fechar = () => { lb.hidden = true; body.classList.remove('lb-on'); };
  if (lb) {
    $('[data-lb-fechar]', lb).onclick = fechar;
    $('[data-lb-ant]', lb).onclick = () => { pos = (pos - 1 + lista.length) % lista.length; mostrar(); };
    $('[data-lb-prox]', lb).onclick = () => { pos = (pos + 1) % lista.length; mostrar(); };
    lb.addEventListener('click', e => { if (e.target === lb) fechar(); });
    addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowRight') $('[data-lb-prox]', lb).click();
      if (e.key === 'ArrowLeft') $('[data-lb-ant]', lb).click();
    });
  }

  // Formulários: o site é estático, então a mensagem sai pronta no WhatsApp ou no e-mail.
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter?.dataset.via || 'zap';
    const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => {
      if (k === 'Data' && /^\d{4}-\d{2}-\d{2}$/.test(v)) v = v.split('-').reverse().join('/');
      return `${k}: ${v}`;
    });
    const assunto = f.dataset.assunto;
    const txt = `${assunto} · 360 POA\n\n${linhas.join('\n')}`;
    if (via === 'email') location.href = `mailto:${body.dataset.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(txt)}`;
    else open(`https://wa.me/${body.dataset.zap}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  }));

  // Entradas suaves ao rolar.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('[data-rev]').forEach(el => io.observe(el));
  } else $$('[data-rev]').forEach(el => el.classList.add('vis'));
})();
