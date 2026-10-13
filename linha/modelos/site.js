// Menu do celular e formulário de contato (abre o WhatsApp ou o e-mail com a mensagem pronta).
document.querySelector('.menu-btn')?.addEventListener('click', e => {
  const aberto = document.body.classList.toggle('menu-aberto');
  e.currentTarget.setAttribute('aria-expanded', aberto);
});
document.querySelectorAll('form.form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  const txt = [d.msg, '', d.nome, d.empresa, d.fone].filter(x => x !== undefined).join('\n').trim();
  if (f.dataset.zap) window.open(`https://wa.me/${f.dataset.zap.length <= 11 ? '55' + f.dataset.zap : f.dataset.zap}?text=${encodeURIComponent(txt)}`, '_blank');
  else location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent('Contato pelo site')}&body=${encodeURIComponent(txt)}`;
}));
