// REM Consultoria Metz: menu do celular e envio do formulário por e-mail ou WhatsApp.
(() => {
  const corpo = document.body;
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  const form = document.querySelector('[data-form]');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter ? e.submitter.dataset.via : 'email';
    const d = Object.fromEntries(new FormData(form));
    const txt = `${d.assunto}\n\nNome: ${d.nome}\nEmpresa: ${d.empresa}\nE-mail: ${d.email}\nTelefone: ${d.telefone || '-'}\n\n${d.mensagem || ''}`;
    if (via === 'zap') location.href = `https://wa.me/${corpo.dataset.zap}?text=${encodeURIComponent(txt)}`;
    else location.href = `mailto:${corpo.dataset.email}?subject=${encodeURIComponent(d.assunto + ' · ' + d.empresa)}&body=${encodeURIComponent(txt)}`;
  });
})();
