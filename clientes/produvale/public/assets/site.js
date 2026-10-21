// Produvale: menu do celular, índice de linhas com foto que troca (versão A), formulário por e-mail.
(() => {
  const burger = document.querySelector('.burger');
  burger?.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    burger.setAttribute('aria-expanded', aberto);
  });

  // Versão A: ao passar o mouse numa linha, a foto ao lado troca.
  const indice = document.querySelector('[data-indice]');
  if (indice) {
    const links = [...indice.querySelectorAll('ol a')];
    const fotos = [...indice.querySelectorAll('.a-indice-foto img')];
    const ativa = a => {
      links.forEach(l => l.classList.toggle('ativo', l === a));
      fotos.forEach(f => f.classList.toggle('ativo', f.dataset.foto === a.dataset.foto));
    };
    links.forEach(a => { a.addEventListener('mouseenter', () => ativa(a)); a.addEventListener('focus', () => ativa(a)); });
  }

  // Contato: "Cotar esta linha" já preenche a mensagem.
  const linha = new URLSearchParams(location.search).get('linha');
  const msg = document.querySelector('form[data-mailto] textarea');
  if (linha && msg && !msg.value) msg.value = `Gostaria de uma cotação da linha ${linha}.\n\nItens e quantidades:\n`;

  document.querySelectorAll('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const corpo = `Nome: ${d.get('nome')}\nInstituição: ${d.get('instituicao') || ''}\nTelefone: ${d.get('telefone')}\nE-mail: ${d.get('email')}\n\n${d.get('mensagem')}`;
    location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(d.get('assunto') || 'Contato pelo site')}&body=${encodeURIComponent(corpo)}`;
  }));
})();
