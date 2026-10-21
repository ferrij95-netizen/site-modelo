// Menu do celular, filtro de projetos, foto ampliada e formulário que monta o e-mail.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// filtro por frente (também abre direto em /projetos/#estandes)
const grade = document.querySelector('[data-grade]');
if (grade) {
  const botoes = [...document.querySelectorAll('[data-filtro]')];
  const filtra = area => {
    botoes.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filtro === area)));
    grade.querySelectorAll('li').forEach(li => { li.hidden = !!area && li.dataset.area !== area; });
  };
  botoes.forEach(b => b.addEventListener('click', () => { filtra(b.dataset.filtro); history.replaceState(null, '', b.dataset.filtro ? '#' + b.dataset.filtro : location.pathname); }));
  const h = location.hash.slice(1);
  if (botoes.some(b => b.dataset.filtro === h && h)) filtra(h);
}

// foto ampliada
const lb = document.querySelector('.lb');
document.querySelectorAll('[data-zoom]').forEach(b => b.addEventListener('click', () => {
  if (!lb?.showModal) return;
  lb.querySelector('img').src = b.dataset.zoom; lb.querySelector('img').alt = b.dataset.legenda;
  lb.querySelector('figcaption').textContent = b.dataset.legenda; lb.showModal();
}));
lb?.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lb-x')) lb.close(); });

// formulário: abre o e-mail pronto
const form = document.querySelector('[data-form-email]');
if (form) {
  const proj = new URLSearchParams(location.search).get('projeto');
  if (proj) form.querySelector('textarea').value = `Olá! Vi o projeto "${proj}" no site e gostaria de conversar sobre algo parecido.\n\n`;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form), assunto = `Contato pelo site: ${d.get('Assunto')}`;
    const corpo = [...d.entries()].map(([k, v]) => `${k}: ${v}`).join('\n');
    location.href = `mailto:${form.dataset.formEmail}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  });
}

// linha do tempo: setas e fim do degradê
document.querySelectorAll('[data-tempo]').forEach(t => {
  const nav = document.createElement('div'); nav.className = 'tempo-nav';
  const seta = (d, rot) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', d < 0 ? 'Anteriores' : 'Próximos');
    b.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(${rot}deg)"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
    b.onclick = () => t.scrollBy({ left: d * t.clientWidth * .8, behavior: 'smooth' }); return b; };
  const ant = seta(-1, 180), prox = seta(1, 0); nav.append(ant, prox); t.before(nav);
  const pinta = () => { const fim = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4; t.classList.toggle('fim', fim); ant.disabled = t.scrollLeft < 4; prox.disabled = fim; nav.hidden = t.scrollWidth <= t.clientWidth + 4; };
  t.addEventListener('scroll', pinta, { passive: true }); addEventListener('resize', pinta); pinta();
});
