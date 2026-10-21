// Menu do celular, banners da abertura (A) e formulário de contato que monta a mensagem de WhatsApp ou o e-mail.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// banners (A): troca a foto e a legenda a cada 7 s; os pontos levam direto a uma foto
document.querySelectorAll('[data-slides]').forEach(s => {
  const fotos = [...s.querySelectorAll('.hero-foto')], textos = [...s.querySelectorAll('.hero-t')], pontos = [...s.querySelectorAll('.hero-pontos button')];
  let i = 0, timer;
  const vai = n => {
    i = (n + fotos.length) % fotos.length;
    fotos.forEach((f, k) => { f.classList.toggle('on', k === i); if (k === i) f.loading = 'eager'; });
    textos.forEach((t, k) => t.classList.toggle('on', k === i));
    pontos.forEach((p, k) => p.setAttribute('aria-selected', String(k === i)));
  };
  const auto = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 7000); };
  pontos.forEach((p, k) => p.addEventListener('click', () => { vai(k); auto(); }));
  auto();
});

// formulário: WhatsApp ou e-mail com a mensagem pronta
document.querySelectorAll('[data-contato]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f), via = e.submitter?.value || 'whats';
  const linhas = [`Nome: ${d.get('nome')}`, `E-mail: ${d.get('email')}`, `Telefone: ${d.get('telefone')}`, d.get('area') ? `Assunto: ${d.get('area')}` : '', '', d.get('mensagem')].filter((l, k) => l || k === 4);
  const texto = linhas.join('\n');
  if (via === 'email') location.href = `mailto:gastaldi.adv@gmail.com?subject=${encodeURIComponent('Contato pelo site' + (d.get('area') ? ' · ' + d.get('area') : ''))}&body=${encodeURIComponent(texto)}`;
  else window.open(`https://wa.me/5547991480078?text=${encodeURIComponent('Olá! Vim pelo site da Gastaldi & Schultz.\n\n' + texto)}`, '_blank', 'noopener');
}));
