// Engenho A. M.: menu do celular e topo que ganha sombra ao rolar.
(() => {
  const corpo = document.body;
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });
  const f = () => corpo.classList.toggle('rolou', scrollY > 30);
  addEventListener('scroll', f, { passive: true }); f();
})();
