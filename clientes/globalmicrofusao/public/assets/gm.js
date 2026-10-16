// Menu do celular, cabeçalho que muda ao rolar, slides da capa (versão A) e formulário que abre o e-mail.
(() => {
  const topo = document.querySelector('.topo');
  const btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', () => {
    const aberto = topo.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
  });
  const rolar = () => topo.classList.toggle('rolado', scrollY > 40);
  rolar(); addEventListener('scroll', rolar, { passive: true });

  const slides = [...document.querySelectorAll('.slide')];
  const pontos = [...document.querySelectorAll('.pontos button')];
  if (slides.length > 1) {
    let i = 0, t;
    const ir = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('ativo', k === i));
      pontos.forEach((p, k) => p.classList.toggle('ativo', k === i));
    };
    const auto = () => { clearInterval(t); t = setInterval(() => ir(i + 1), 6000); };
    pontos.forEach((p, k) => p.addEventListener('click', () => { ir(k); auto(); }));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) auto();
  }

  const form = document.querySelector('.form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const corpo = `Nome: ${d.nome}\nEmpresa: ${d.empresa || '-'}\nE-mail: ${d.email}\nTelefone: ${d.telefone}\n\n${d.mensagem}`;
    location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(d.assunto + ' (site)')}&body=${encodeURIComponent(corpo)}`;
  });
})();
