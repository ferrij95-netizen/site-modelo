// Menu do celular.
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  menu.addEventListener('click', e => { if (e.target.closest('a')) menu.classList.remove('aberto'); });
}

// Formulário de contato: abre o e-mail já endereçado à unidade escolhida.
const form = document.getElementById('form-contato');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const corpo = `Nome: ${d.get('nome')}\nE-mail: ${d.get('email')}\nTelefone: ${d.get('telefone') || '-'}\n\n${d.get('mensagem')}`;
    location.href = `mailto:${d.get('unidade')}?subject=${encodeURIComponent(`${d.get('assunto')} · site COOMAT`)}&body=${encodeURIComponent(corpo)}`;
  });
}
