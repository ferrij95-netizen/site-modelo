// MB Embalagens: menu do celular, topo que ganha fundo ao rolar e envio do orçamento por WhatsApp ou e-mail.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const corpo = document.body;

  const botao = $('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  const topo = $('.topo-sobre');
  if (topo) { const f = () => topo.classList.toggle('rolou', scrollY > 40); addEventListener('scroll', f, { passive: true }); f(); }

  const form = $('[data-form]');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter ? e.submitter.dataset.via : 'zap';
    const d = Object.fromEntries(new FormData(form));
    const txt = `Orçamento: ${d.produto}\n\nNome: ${d.nome}\nEmpresa: ${d.empresa}\nCidade: ${d.cidade || '-'}\nTelefone: ${d.telefone}\n\n${d.mensagem || ''}`;
    if (via === 'zap') location.href = `https://wa.me/${corpo.dataset.zap}?text=${encodeURIComponent(txt)}`;
    else location.href = `mailto:${corpo.dataset.email}?subject=${encodeURIComponent('Orçamento · ' + d.empresa)}&body=${encodeURIComponent(txt)}`;
  });
})();
