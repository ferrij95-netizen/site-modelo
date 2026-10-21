// Menu do celular.
const btn = document.querySelector('.abre-menu');
const menu = document.getElementById('menu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
  });
  menu.addEventListener('click', e => { if (e.target.closest('a')) menu.classList.remove('aberto'); });
}

// Filtro da galeria de produtos (como o filtro do site atual).
document.querySelectorAll('.filtro').forEach(f => {
  const itens = f.parentElement.querySelectorAll('.galeria li');
  f.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    f.querySelectorAll('button').forEach(x => { x.classList.toggle('ativo', x === b); x.setAttribute('aria-pressed', x === b); });
    itens.forEach(li => { li.hidden = b.dataset.filtro !== 'todos' && li.dataset.cat !== b.dataset.filtro; });
  });
});

// Formulário de contato: monta a mensagem e abre o WhatsApp ou o e-mail do comercial.
document.querySelectorAll('[data-form]').forEach(form => {
  let via = 'whats';
  form.querySelectorAll('[data-via]').forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const aviso = form.querySelector('.form-aviso');
    if (!d.get('nome') || !d.get('mensagem')) { aviso.textContent = 'Preencha o nome e a mensagem.'; return; }
    const texto = `Olá, sou ${d.get('nome')}.\nAssunto: ${d.get('assunto')}\n${d.get('mensagem')}\n\nTelefone: ${d.get('telefone') || '-'}\nE-mail: ${d.get('email') || '-'}`;
    aviso.textContent = via === 'whats' ? 'Abrindo o WhatsApp...' : 'Abrindo o seu e-mail...';
    location.href = via === 'whats'
      ? `https://api.whatsapp.com/send?phone=551639612320&text=${encodeURIComponent(texto)}`
      : `mailto:comercial@acentervidros.com.br?subject=${encodeURIComponent(`${d.get('assunto')} · site`)}&body=${encodeURIComponent(texto)}`;
  });
});
