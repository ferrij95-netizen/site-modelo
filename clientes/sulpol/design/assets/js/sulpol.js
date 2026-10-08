// Menu do celular
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });
}
// Formulário de orçamento: monta a mensagem e abre o WhatsApp
const form = document.getElementById('orcamento');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const linhas = [
      'Olá! Gostaria de um orçamento.',
      `Nome: ${f.get('nome')}`,
      f.get('empresa') && `Empresa: ${f.get('empresa')}`,
      f.get('contato') && `Contato: ${f.get('contato')}`,
      f.get('produto') && `Produto: ${f.get('produto')}`,
      f.get('mensagem') && `Mensagem: ${f.get('mensagem')}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
  });
}
