// Vordex: menu do celular e envio dos formulários por e-mail ou WhatsApp (site estático).
(() => {
  const corpo = document.body;
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  document.querySelectorAll('[data-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter ? e.submitter.dataset.via : 'email';
    const linhas = [...form.querySelectorAll('input, select, textarea')]
      .filter(c => c.value.trim())
      .map(c => `${c.closest('label').querySelector('span').textContent.replace(' (opcional)', '')}: ${c.value.trim()}`);
    const assunto = form.dataset.assunto;
    const txt = `${assunto}\n\n${linhas.join('\n')}`;
    if (via === 'zap') location.href = `https://wa.me/${corpo.dataset.zap}?text=${encodeURIComponent(txt)}`;
    else location.href = `mailto:${form.dataset.para}?subject=${encodeURIComponent(assunto + ' · site')}&body=${encodeURIComponent(txt)}`;
  }));
})();
