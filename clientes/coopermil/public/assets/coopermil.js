// Coopermil: menu, carrossel, vídeo, galeria, tempo em Santa Rosa, filtro das unidades, busca e formulário pelo WhatsApp.
(() => {
  const corpo = document.body;
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => botao.setAttribute('aria-expanded', corpo.classList.toggle('menu-aberto')));
  document.querySelectorAll('.sub-btn').forEach(b => b.addEventListener('click', () => {
    const sub = b.parentElement, aberto = !sub.classList.contains('aberto');
    document.querySelectorAll('.sub.aberto').forEach(s => { s.classList.remove('aberto'); s.firstElementChild.setAttribute('aria-expanded', 'false'); });
    sub.classList.toggle('aberto', aberto);
    b.setAttribute('aria-expanded', aberto);
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.sub')) document.querySelectorAll('.sub.aberto').forEach(s => s.classList.remove('aberto')); });

  // Carrossel de banners: troca a cada 6 s, para com o mouse em cima; o fundo desfocado acompanha o banner.
  const car = document.querySelector('[data-carrossel]');
  if (car) {
    const slides = [...car.querySelectorAll('[data-slide]')], pontos = [...car.querySelectorAll('[data-ir]')];
    let atual = 0, timer;
    const ir = n => {
      atual = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('ativo', k === atual));
      pontos.forEach((p, k) => p.toggleAttribute('aria-current', k === atual));
      car.style.setProperty('--fundo-atual', slides[atual].style.getPropertyValue('--fundo'));
    };
    const tocar = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(atual + 1), 6000); };
    pontos.forEach((p, k) => p.addEventListener('click', () => { ir(k); tocar(); }));
    car.querySelector('[data-ant]').addEventListener('click', () => { ir(atual - 1); tocar(); });
    car.querySelector('[data-prox]').addEventListener('click', () => { ir(atual + 1); tocar(); });
    car.addEventListener('mouseenter', () => clearInterval(timer));
    car.addEventListener('mouseleave', tocar);
    let x0 = null;
    car.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { ir(atual + (dx < 0 ? 1 : -1)); tocar(); } x0 = null; });
    ir(0); tocar();
  }

  // Vídeo institucional: o YouTube só carrega no clique.
  document.querySelectorAll('[data-video]').forEach(v => v.addEventListener('click', () => {
    v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.video}?autoplay=1&rel=0" title="Vídeo institucional da Coopermil" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }, { once: true }));

  // Galeria: abre a foto grande por cima da página.
  document.querySelectorAll('[data-foto]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = `<img src="${a.href}" alt="${a.querySelector('img').alt}"><button aria-label="Fechar">×</button>`;
    const fechar = () => { box.remove(); document.removeEventListener('keydown', tecla); };
    const tecla = ev => { if (ev.key === 'Escape') fechar(); };
    box.addEventListener('click', ev => { if (ev.target !== box.querySelector('img')) fechar(); });
    document.addEventListener('keydown', tecla);
    document.body.append(box);
    box.querySelector('button').focus();
  }));

  // Tempo em Santa Rosa (Open-Meteo, sem chave).
  const DESC = { 0: 'Céu limpo', 1: 'Poucas nuvens', 2: 'Parcialmente nublado', 3: 'Nublado', 45: 'Neblina', 48: 'Neblina', 51: 'Garoa', 53: 'Garoa', 55: 'Garoa', 61: 'Chuva fraca', 63: 'Chuva', 65: 'Chuva forte', 80: 'Pancadas de chuva', 81: 'Pancadas de chuva', 82: 'Temporal', 95: 'Trovoadas', 96: 'Trovoadas', 99: 'Trovoadas' };
  const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  document.querySelectorAll('[data-tempo]').forEach(async t => {
    try {
      const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-27.87&longitude=-54.48&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=5');
      const d = await r.json();
      t.querySelector('[data-t-temp]').textContent = Math.round(d.current.temperature_2m) + '°';
      t.querySelector('[data-t-desc]').textContent = DESC[d.current.weather_code] || 'Agora';
      t.querySelector('[data-t-dias]').innerHTML = d.daily.time.slice(1, 5).map((dia, i) => `<li><b>${DIAS[new Date(dia + 'T12:00').getDay()]}</b>${Math.round(d.daily.temperature_2m_max[i + 1])}° / ${Math.round(d.daily.temperature_2m_min[i + 1])}°<br><small>${d.daily.precipitation_probability_max[i + 1]}% chuva</small></li>`).join('');
    } catch (e) { t.querySelector('[data-t-desc]').textContent = 'Previsão indisponível agora.'; }
  });

  // Área de atuação: filtro por tipo de unidade e por cidade.
  const filtros = document.querySelector('[data-filtros]');
  if (filtros) {
    const sel = document.querySelector('[data-cidade]');
    let tipo = '';
    const aplica = () => {
      let algum = false;
      document.querySelectorAll('[data-c]').forEach(c => {
        let n = 0;
        c.querySelectorAll('[data-t]').forEach(u => { const ok = !tipo || u.dataset.t.includes(tipo); u.hidden = !ok; if (ok) n++; });
        c.hidden = !n || (sel.value && c.dataset.c !== sel.value);
        if (!c.hidden) algum = true;
      });
      document.querySelector('[data-vazio]').hidden = algum;
    };
    filtros.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      tipo = b.dataset.f;
      filtros.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      aplica();
    });
    sel.addEventListener('change', aplica);
  }

  // Busca: procura no site da Coopermil pelo Google.
  document.querySelectorAll('.busca').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const q = f.querySelector('[data-busca]').value.trim();
    window.open('https://www.google.com/search?q=' + encodeURIComponent('site:coopermil.com ' + q), '_blank', 'noopener');
  }));

  // Formulário de contato: abre o WhatsApp da Coopermil com a mensagem pronta.
  const form = document.querySelector('[data-form]');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const txt = `Olá, Coopermil! Assunto: ${d.assunto}\nNome: ${d.nome}\nCidade: ${d.cidade}\n\n${d.mensagem}`;
    window.open(`https://api.whatsapp.com/send?phone=${corpo.dataset.whats}&text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  });
})();
