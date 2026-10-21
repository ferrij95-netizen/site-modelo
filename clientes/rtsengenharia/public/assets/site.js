// Menu do celular, topo que muda ao rolar, linha do fluxo que enche (B) e formulário que monta a mensagem de WhatsApp.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

const trilhos = [...document.querySelectorAll('.trilho')];
const aoRolar = () => {
  document.body.classList.toggle('rolou', scrollY > 60);
  for (const t of trilhos) {
    const r = t.getBoundingClientRect(), meio = innerHeight * .6;
    const p = Math.min(1, Math.max(0, (meio - r.top) / r.height));
    t.style.setProperty('--p', p.toFixed(3));
    t.querySelectorAll('li').forEach(li => li.classList.toggle('acesa', li.getBoundingClientRect().top < meio));
  }
};
aoRolar(); addEventListener('scroll', aoRolar, { passive: true }); addEventListener('resize', aoRolar);

document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  const linhas = [`Olá! Sou ${d.nome}${d.empresa ? ` (${d.empresa})` : ''} e vim pelo site do Grupo RTS.`];
  if (d.disc) linhas.push(`Disciplina: ${d.disc}`);
  linhas.push('', d.msg);
  if (d.tel) linhas.push('', `Meu telefone: ${d.tel}`);
  window.open(`https://wa.me/5571999723342?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
}));
