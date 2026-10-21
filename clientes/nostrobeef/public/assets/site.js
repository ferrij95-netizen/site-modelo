// Menu do celular, galeria das caixas, caminho do pasto ao pedido (B), lista de cotação (B) e formulário.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// galeria: a miniatura troca a foto grande
document.querySelectorAll('[data-gal]').forEach(g => {
  const alvo = g.querySelector('[data-gal-alvo]');
  g.querySelectorAll('[data-gal-src]').forEach(b => b.addEventListener('click', () => {
    alvo.src = b.dataset.galSrc; alvo.removeAttribute('width'); alvo.removeAttribute('height');
    g.querySelectorAll('[data-gal-src]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  }));
});

// caminho: a foto fixa troca conforme a etapa passa no meio da tela
const cam = document.querySelector('[data-caminho]');
if (cam && 'IntersectionObserver' in window) {
  const figs = [...cam.querySelectorAll('.b-cam-fotos figure')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) figs.forEach((f, i) => f.classList.toggle('on', i === Number(e.target.dataset.passo)));
  }), { rootMargin: '-45% 0px -45% 0px' });
  cam.querySelectorAll('[data-passo]').forEach(p => io.observe(p));
}

// lista de cotação: os cortes marcados viram uma mensagem de WhatsApp
document.querySelectorAll('form[data-cotacao]').forEach(f => {
  const conta = f.querySelector('[data-cot-conta]');
  const marcados = () => [...f.querySelectorAll('input[name="corte"]:checked')].map(i => i.value);
  f.addEventListener('change', () => { const n = marcados().length; conta.textContent = n ? `${n} ${n === 1 ? 'corte marcado' : 'cortes marcados'}` : 'Nenhum corte marcado'; });
  f.addEventListener('submit', e => {
    e.preventDefault();
    const m = marcados();
    const txt = m.length ? `Olá, gostaria de uma cotação da Nostro Beef dos seguintes cortes:\n${m.map(c => `- ${c}`).join('\n')}` : 'Olá, gostaria de uma cotação de cortes da Nostro Beef.';
    window.open(`https://wa.me/${f.dataset.zap}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  });
});

// formulário: na prévia não envia, só confirma
document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.form-ok').hidden = false;
  f.querySelector('button[type="submit"]').disabled = true;
}));
