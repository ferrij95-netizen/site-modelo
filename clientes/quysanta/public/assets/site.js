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

// Formulário de contato: abre o e-mail já preenchido. ?assunto=revenda escolhe o assunto.
const form = document.getElementById('form-contato');
if (form) {
  const assunto = new URLSearchParams(location.search).get('assunto');
  if (assunto && form.assunto.querySelector(`option[value="${assunto}"]`)) form.assunto.value = assunto;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const titulo = form.assunto.selectedOptions[0].textContent;
    const local = [d.get('cidade'), d.get('estado')].filter(Boolean).join(' / ') || '-';
    const corpo = `Nome: ${d.get('nome')}\nE-mail: ${d.get('email')}\nTelefone: ${d.get('telefone') || '-'}\nCidade: ${local}\n\n${d.get('mensagem')}`;
    location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(`${titulo} · site Quysanta`)}&body=${encodeURIComponent(corpo)}`;
  });
}
