// Marmoraria São Paulo: menu do celular, formulário de orçamento (WhatsApp ou e-mail) e foto ampliada.
(() => {
  const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
  if (btn && menu) btn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  const WA = '5511982055775', EMAIL = 'marmosp@hotmail.com';
  document.querySelectorAll('form[data-orcamento]').forEach(f => {
    let via = 'wa';
    f.querySelectorAll('button[data-via]').forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
    f.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f)), aviso = f.querySelector('.form-aviso');
      if (!d.nome || !d.fone) { aviso.textContent = 'Preencha nome e telefone para enviarmos o orçamento.'; return; }
      const txt = `Olá! Vim pelo site da Marmoraria São Paulo.\nNome: ${d.nome}\nTelefone: ${d.fone}${d.email ? `\nE-mail: ${d.email}` : ''}\nAmbiente: ${d.ambiente}\nSou: ${d.tipo}${d.msg ? `\n\n${d.msg}` : ''}`;
      if (via === 'email') location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Orçamento pelo site')}&body=${encodeURIComponent(txt)}`;
      else window.open(`https://wa.me/${WA}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
      aviso.textContent = 'Pronto! Sua mensagem foi aberta para envio.';
    });
  });

  const zooms = document.querySelectorAll('[data-zoom]');
  if (zooms.length) {
    const dlg = document.createElement('dialog');
    dlg.className = 'foto-zoom';
    dlg.innerHTML = '<img alt=""><button type="button" aria-label="Fechar">✕</button>';
    document.body.append(dlg);
    dlg.querySelector('button').onclick = () => dlg.close();
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    zooms.forEach(z => z.addEventListener('click', () => {
      const im = dlg.querySelector('img'); im.src = z.dataset.zoom; im.alt = z.querySelector('img')?.alt || '';
      dlg.showModal();
    }));
  }
})();
