// DHT: menu do celular, cor do header sobre capítulos escuros, sinais vitais ao vivo, relógio do painel e formulário.
(() => {
  const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
    botao.textContent = aberto ? 'Fechar' : 'Menu';
  });

  // Versão A: header branco quando passa por cima de um capítulo escuro
  const topo = document.querySelector('[data-topo]');
  if (topo) {
    const escuros = [...document.querySelectorAll('.escuro')];
    const atualiza = () => {
      const y = topo.offsetHeight / 2;
      topo.classList.toggle('sobre-escuro', escuros.some(s => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom >= y; }));
    };
    addEventListener('scroll', atualiza, { passive: true }); atualiza();
  }

  // Versão B: índice lateral marca a seção visível
  const indice = [...document.querySelectorAll('.indice a')];
  if (indice.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) indice.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-40% 0px -55% 0px' });
    indice.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); });
  }

  // Formas de onda (valores entre -1 e 1), t em segundos
  const g = (x, m, s) => Math.exp(-((x - m) ** 2) / (2 * s * s));
  const ondas = {
    ecg: t => { const f = (t % 0.83) / 0.83; return 0.12 * g(f, .18, .025) - 0.12 * g(f, .30, .01) + 0.95 * g(f, .33, .012) - 0.25 * g(f, .36, .012) + 0.22 * g(f, .58, .05); },
    pleth: t => { const f = (t % 0.83) / 0.83; return 0.9 * g(f, .25, .08) + 0.3 * g(f, .55, .07) - 0.45; },
    resp: t => 0.7 * Math.sin(t * 2 * Math.PI / 3.7),
    temp: t => 0.06 * Math.sin(t * 0.4) + 0.03 * Math.sin(t * 1.7),
  };
  const canais = [...document.querySelectorAll('canvas[data-onda]')].map(c => ({ c, f: ondas[c.dataset.onda], x: 0, py: null }));
  const ajusta = () => canais.forEach(k => {
    const r = k.c.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    k.c.width = Math.max(1, r.width * d); k.c.height = Math.max(1, r.height * d); k.d = d; k.x = 0; k.py = null;
    const ctx = k.c.getContext('2d'); ctx.strokeStyle = getComputedStyle(k.c).color; ctx.lineWidth = 1.6 * d; ctx.lineJoin = 'round';
    k.ctx = ctx;
    { ctx.beginPath(); for (let x = 0; x < k.c.width; x += 2) { const y = k.c.height / 2 - k.f(x / (110 * d)) * k.c.height * 0.42; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }  // traço inicial; a varredura escreve por cima
  });
  if (canais.length) {
    ajusta(); addEventListener('resize', ajusta);
    if (!calmo) {
      const vel = 110; // px por segundo
      let t0 = performance.now(), visiveis = new Set(canais);
      if ('IntersectionObserver' in window) {
        visiveis = new Set();
        const io = new IntersectionObserver(es => es.forEach(e => { const k = canais.find(k => k.c === e.target); e.isIntersecting ? visiveis.add(k) : visiveis.delete(k); }));
        canais.forEach(k => io.observe(k.c));
      }
      let tempo = 0;
      const passo = agora => {
        const dt = Math.min(0.05, (agora - t0) / 1000); t0 = agora; tempo += dt;
        visiveis.forEach(k => {
          const { ctx, c, d } = k, w = c.width, h = c.height, dx = vel * d * dt;
          const nx = k.x + dx, y = h / 2 - k.f(tempo) * h * 0.42;
          ctx.clearRect(k.x, 0, dx + 24 * d, h);
          if (k.py !== null && nx < w) { ctx.beginPath(); ctx.moveTo(k.x, k.py); ctx.lineTo(nx, y); ctx.stroke(); }
          k.x = nx >= w ? 0 : nx; k.py = nx >= w ? null : y;
          if (k.x === 0) ctx.clearRect(0, 0, 24 * d, h);
        });
        requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
      // Valores oscilam um pouco, como num paciente real
      const base = { ecg: 72, pleth: 98, resp: 16 };
      setInterval(() => document.querySelectorAll('.valor[data-t]').forEach(v => {
        const b = base[v.dataset.t]; if (!b) return;
        const n = b + Math.round((Math.random() - 0.5) * (v.dataset.t === 'pleth' ? 2 : 4));
        v.textContent = Math.min(v.dataset.t === 'pleth' ? 100 : 999, n);
      }), 2200);
    }
  }

  // Relógio do painel
  const rel = document.querySelectorAll('[data-relogio]');
  const hora = () => rel.forEach(r => r.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
  if (rel.length) { hora(); setInterval(hora, 30000); }

  // Formulário (prévia: só confirma na tela)
  document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault(); f.querySelector('.form-ok').hidden = false; f.querySelector('button').disabled = true;
  }));
})();
