// Menu do celular, slider da abertura (A), premiação na lateral (A), abas das áreas (A)
// e formulário de contato que monta o e-mail para o escritório.
document.documentElement.classList.add('js');
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => {
  const a = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!a));
  btn.setAttribute('aria-label', a ? 'Abrir menu' : 'Fechar menu');
  menu.classList.toggle('aberto', !a);
});

// slider da abertura: as frases do site atual ("40 anos de experiência"...) trocam com as fotos
document.querySelectorAll('[data-slider]').forEach(s => {
  const slides = [...s.querySelectorAll('.slide')], pontos = [...s.querySelectorAll('.pontos button')];
  let i = 0, timer;
  const vai = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((f, k) => f.classList.toggle('ativo', k === i));
    pontos.forEach((p, k) => p.setAttribute('aria-selected', String(k === i)));
  };
  const auto = () => { clearInterval(timer); if (!reduz) timer = setInterval(() => vai(i + 1), 6500); };
  pontos.forEach((p, k) => p.addEventListener('click', () => { vai(k); auto(); }));
  auto();
});

// premiação e destaques (lateral, com as setas como no site atual)
document.querySelectorAll('.lateral').forEach(l => {
  const itens = [...l.querySelectorAll('[data-premios] figure')];
  let i = 0, timer;
  const vai = n => { i = (n + itens.length) % itens.length; itens.forEach((f, k) => f.hidden = k !== i); };
  const auto = () => { clearInterval(timer); if (!reduz) timer = setInterval(() => vai(i + 1), 5000); };
  l.querySelector('[data-pr-ant]')?.addEventListener('click', () => { vai(i - 1); auto(); });
  l.querySelector('[data-pr-prox]')?.addEventListener('click', () => { vai(i + 1); auto(); });
  auto();
});

// abas das áreas de atuação
document.querySelectorAll('[data-abas]').forEach(box => {
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const vai = t => tabs.forEach(o => {
    const on = o === t;
    o.setAttribute('aria-selected', String(on)); o.tabIndex = on ? 0 : -1;
    document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
  });
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => vai(t));
    t.addEventListener('keydown', e => {
      const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (k) { e.preventDefault(); const n = tabs[(i + k + tabs.length) % tabs.length]; vai(n); n.focus(); }
    });
  });
});

// formulário: monta o e-mail (o site atual enviava pelo servidor; aqui abre o programa de e-mail)
document.querySelectorAll('[data-contato]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  const corpo = `${d.mensagem}\n\n${d.nome}\n${d.email}${d.telefone ? `\n${d.telefone}` : ''}${d.empresa ? `\n${d.empresa}` : ''}`;
  location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(`Contato pelo site: ${d.nome}`)}&body=${encodeURIComponent(corpo)}`;
}));
