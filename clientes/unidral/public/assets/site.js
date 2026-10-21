// Menu do celular, topo que encolhe, fotos passando, filtro e foto ampliada do portfólio, formulário que monta WhatsApp ou e-mail.
const topo = document.querySelector('.topo');
addEventListener('scroll', () => topo?.classList.toggle('min', scrollY > 60), { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// fotos passando (versão A)
const slides = document.querySelector('[data-slides]');
if (slides) {
  const figs = [...slides.children], pontos = document.querySelector('[data-slides-pontos]');
  let i = 0, timer;
  const vai = n => { figs[i].classList.remove('on'); pontos.children[i].removeAttribute('aria-current'); i = (n + figs.length) % figs.length; figs[i].classList.add('on'); pontos.children[i].setAttribute('aria-current', 'true'); };
  figs.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Foto ${n + 1}`); b.onclick = () => { vai(n); clearInterval(timer); }; pontos.append(b); });
  pontos.children[0].setAttribute('aria-current', 'true');
  figs.slice(1).forEach(f => f.querySelector('img').loading = 'eager');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 5500);
}

// filtro do portfólio
const itens = [...document.querySelectorAll('.galeria li')];
document.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('[data-filtro]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  itens.forEach(li => { li.hidden = !!b.dataset.filtro && li.dataset.cat !== b.dataset.filtro; });
}));

// foto ampliada
const luz = document.querySelector('.luz');
if (luz) {
  const fImg = luz.querySelector('img'), leg = luz.querySelector('figcaption');
  let atual = 0;
  const visiveis = () => itens.filter(li => !li.hidden).map(li => li.querySelector('a'));
  const mostra = a => { fImg.src = a.href; fImg.alt = a.querySelector('img').alt; const v = visiveis(); atual = v.indexOf(a); leg.textContent = `${a.dataset.legenda} · ${atual + 1} de ${v.length}`; };
  const passa = d => { const v = visiveis(); mostra(v[(atual + d + v.length) % v.length]); };
  document.querySelectorAll('[data-luz]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); mostra(a); luz.showModal(); }));
  luz.querySelector('.luz-x').onclick = () => luz.close();
  luz.querySelector('.luz-ant').onclick = () => passa(-1);
  luz.querySelector('.luz-prox').onclick = () => passa(1);
  luz.addEventListener('click', e => { if (e.target === luz) luz.close(); });
  luz.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') passa(-1); if (e.key === 'ArrowRight') passa(1); });
}

// formulário: abre o WhatsApp ou o e-mail com a mensagem pronta
document.querySelectorAll('[data-form]').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form)), via = e.submitter?.dataset.via || 'whats';
  const txt = `Olá! Vim pelo site da Unidral.\nNome: ${d.nome}\nE-mail: ${d.email}\nTelefone: ${d.telefone}${d.equipamento ? `\nEquipamento: ${d.equipamento}` : ''}${d.mensagem ? `\n\n${d.mensagem}` : ''}`;
  if (via === 'email') location.href = `mailto:comercial@unidral.com.br?subject=${encodeURIComponent('Orçamento pelo site')}&body=${encodeURIComponent(txt)}`;
  else open(`https://wa.me/5519974028830?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
}));
