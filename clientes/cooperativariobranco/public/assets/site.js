// Menu do celular, abas das lojas (versão B) e formulário que monta o e-mail.
document.querySelectorAll('.abre-menu').forEach(b => {
  const m = document.getElementById(b.getAttribute('aria-controls'));
  b.addEventListener('click', () => {
    const aberto = m.classList.toggle('aberto');
    b.setAttribute('aria-expanded', aberto);
  });
});

document.querySelectorAll('[data-abas]').forEach(caixa => {
  const abas = [...caixa.querySelectorAll('[role="tab"]')];
  const mostrar = aba => abas.forEach(a => {
    const sel = a === aba;
    a.setAttribute('aria-selected', sel);
    document.getElementById(a.getAttribute('aria-controls')).hidden = !sel;
  });
  abas.forEach((a, i) => {
    a.addEventListener('click', () => mostrar(a));
    a.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { const n = abas[(i + d + abas.length) % abas.length]; n.focus(); mostrar(n); }
    });
  });
});

document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const corpo = `Nome: ${d.get('nome')}\nContato: ${d.get('contato')}\n\n${d.get('mensagem')}`;
  location.href = `${f.action}?subject=${encodeURIComponent('Site: ' + d.get('assunto'))}&body=${encodeURIComponent(corpo)}`;
}));
