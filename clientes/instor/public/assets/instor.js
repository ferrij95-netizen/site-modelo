// Instor: menu do celular, filtro de robôs por setor e envio do formulário por e-mail ou WhatsApp.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const corpo = document.body;

  const botao = $('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  // Versão B: o topo transparente sobre a foto ganha fundo ao rolar.
  const topo = $('.topo-sobre');
  if (topo) { const f = () => topo.classList.toggle('rolou', scrollY > 40); addEventListener('scroll', f, { passive: true }); f(); }

  const lista = $('[data-lista-robos]');
  $$('[data-filtro]').forEach(b => b.addEventListener('click', () => {
    $$('[data-filtro]').forEach(o => o.classList.toggle('ativo', o === b));
    $$('[data-setor]', lista).forEach(c => { c.hidden = b.dataset.filtro && c.dataset.setor !== b.dataset.filtro; });
  }));

  const form = $('[data-form]');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter ? e.submitter.dataset.via : 'email';
    const d = Object.fromEntries(new FormData(form));
    const txt = `${d.assunto}\n\nNome: ${d.nome}\nEmpresa: ${d.empresa}\nE-mail: ${d.email}\nTelefone: ${d.telefone || '-'}\n\n${d.mensagem || ''}`;
    if (via === 'zap') location.href = `https://wa.me/${corpo.dataset.zap}?text=${encodeURIComponent(txt)}`;
    else location.href = `mailto:${corpo.dataset.email}?subject=${encodeURIComponent(d.assunto + ' · ' + d.empresa)}&body=${encodeURIComponent(txt)}`;
  });
})();
