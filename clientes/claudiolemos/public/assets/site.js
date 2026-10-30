// Menu do celular, vídeo (pausar), abas e pontos do mapa, depoimentos e formulário de contato.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// vídeo: pausa automática para quem pede menos movimento; botão de pausar/tocar
const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.video').forEach(box => {
  const v = box.querySelector('video'), b = box.querySelector('[data-video]');
  if (parado) v.pause();
  const icone = () => { b.innerHTML = v.paused ? '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>' : '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>'; };
  b?.addEventListener('click', () => { v.paused ? v.play() : v.pause(); icone(); });
  v.addEventListener('play', icone); v.addEventListener('pause', icone); icone();
});

// abas, com setas do teclado
document.querySelectorAll('[data-abas]').forEach(box => {
  const bts = [...box.querySelectorAll('[role=tab]')];
  const abrir = b => bts.forEach(o => { const on = o === b; o.setAttribute('aria-selected', String(on)); o.tabIndex = on ? 0 : -1; document.getElementById(o.getAttribute('aria-controls')).hidden = !on; });
  bts.forEach((b, i) => {
    b.addEventListener('click', () => abrir(b));
    b.addEventListener('keydown', e => {
      const d = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0;
      if (d) { e.preventDefault(); const n = bts[(i + d + bts.length) % bts.length]; abrir(n); n.focus(); }
    });
  });
});

// pontos do mapa: ponto e item da lista acendem juntos
const acende = (id, on) => document.querySelectorAll(`[data-ponto="${id}"]`).forEach(e => e.classList.toggle('on', on));
document.querySelectorAll('[data-ponto]').forEach(e => {
  const id = e.dataset.ponto;
  e.addEventListener('mouseenter', () => acende(id, true));
  e.addEventListener('mouseleave', () => acende(id, false));
  if (e.tagName === 'BUTTON') {
    e.addEventListener('focus', () => acende(id, true)); e.addEventListener('blur', () => acende(id, false));
    e.addEventListener('click', () => { const on = !e.classList.contains('on'); document.querySelectorAll('.ponto.on,.mapa-lista li.on').forEach(x => x.classList.remove('on')); acende(id, on); });
  }
});

// depoimentos: troca a cada 8 s, ou pelos pontinhos
document.querySelectorAll('[data-carrossel]').forEach(box => {
  const itens = [...box.querySelectorAll('.depo-item')], bts = [...box.querySelectorAll('.depo-pontos button')];
  let at = 0, timer;
  const mostra = n => { at = n; itens.forEach((it, i) => it.hidden = i !== n); bts.forEach((b, i) => b.setAttribute('aria-pressed', String(i === n))); };
  const roda = () => { clearInterval(timer); if (!parado) timer = setInterval(() => mostra((at + 1) % itens.length), 8000); };
  bts.forEach((b, i) => b.addEventListener('click', () => { mostra(i); roda(); }));
  roda();
});

// formulário: na prévia não envia, só confirma
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
