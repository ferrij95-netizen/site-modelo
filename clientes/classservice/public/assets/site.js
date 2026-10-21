// Menu, destaque com botões numerados (versão A), serviços com foto que troca (versão B) e formulário que monta WhatsApp ou e-mail.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// destaque com botões 1 a 5, como no site atual
const slides = document.querySelector('[data-slides]');
if (slides) {
  const figs = [...slides.querySelectorAll('figure')], pontos = document.querySelector('[data-slides-pontos]');
  let i = 0, timer;
  const vai = n => { figs[i].classList.remove('on'); pontos.children[i].removeAttribute('aria-current'); i = (n + figs.length) % figs.length; figs[i].classList.add('on'); pontos.children[i].setAttribute('aria-current', 'true'); };
  figs.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = n + 1; b.setAttribute('aria-label', `Foto ${n + 1}`); b.onclick = () => { vai(n); clearInterval(timer); }; pontos.append(b); });
  pontos.children[0].setAttribute('aria-current', 'true');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 5000);
}

// serviços: a foto acompanha o item escolhido
document.querySelectorAll('[data-troca-serv]').forEach(box => {
  const itens = [...box.querySelectorAll('[data-serv]')], fotos = [...box.querySelectorAll('[data-foto]')];
  const ativa = slug => { itens.forEach(li => li.classList.toggle('on', li.dataset.serv === slug)); fotos.forEach(f => f.classList.toggle('on', f.dataset.foto === slug)); };
  itens.forEach(li => { li.querySelector('button').addEventListener('click', () => ativa(li.dataset.serv)); li.addEventListener('mouseenter', () => matchMedia('(hover:hover)').matches && ativa(li.dataset.serv)); });
});

// formulário
const linhasForm = f => [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
document.querySelectorAll('form[data-mailto]').forEach(f => {
  f.addEventListener('submit', e => { e.preventDefault(); location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhasForm(f).join('\n'))}`; });
  f.querySelector('[data-wa]')?.addEventListener('click', ev => { if (!f.reportValidity()) return; open(`https://wa.me/${ev.currentTarget.dataset.wa}?text=${encodeURIComponent(`${f.dataset.assunto}\n${linhasForm(f).join('\n')}`)}`, '_blank'); });
});
