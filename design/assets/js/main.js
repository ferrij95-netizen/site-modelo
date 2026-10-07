// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
// Lembra o idioma escolhido para o redirecionamento da raiz
document.querySelectorAll('.lang-switch a').forEach(a =>
  a.addEventListener('click', () => { try { localStorage.setItem('lang', a.hreflang); } catch {} })
);
