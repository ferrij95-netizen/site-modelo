// Menu do celular, submenus e formulários (abrem o e-mail com a mensagem pronta).
(() => {
  const btn = document.querySelector('[data-menu]');
  const nav = document.getElementById('nav');
  if (btn && nav) btn.addEventListener('click', () => {
    const aberto = nav.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
  });
  document.querySelectorAll('.sub-btn').forEach(b => b.addEventListener('click', () => {
    const aberto = b.parentElement.classList.toggle('aberto');
    b.setAttribute('aria-expanded', aberto);
  }));
  document.addEventListener('click', e => {
    document.querySelectorAll('.sub.aberto').forEach(s => { if (!s.contains(e.target) && window.innerWidth > 1180) s.classList.remove('aberto'); });
  });

  const EMAIL = 'distriboi@distriboi.com.br';
  document.querySelectorAll('[data-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(c => {
      const bom = c.value.trim() && (c.type !== 'email' || /.+@.+\..+/.test(c.value));
      c.closest('.campo').classList.toggle('erro', !bom);
      if (!bom) ok = false;
    });
    const aviso = form.querySelector('[data-aviso]');
    if (!ok) { aviso.textContent = 'Preencha os campos marcados com * para continuar.'; return; }
    const d = Object.fromEntries(new FormData(form));
    const trab = form.dataset.form === 'trabalhe';
    const assunto = trab ? `Trabalhe conosco: ${d.nome} (${d.area})` : `${d.assunto}: ${d.nome}`;
    const corpo = trab
      ? `Olá, DistriBoi! Quero trabalhar com vocês.\n\nNome: ${d.nome}\nTelefone: ${d.telefone}\nE-mail: ${d.email || '-'}\nCidade: ${d.cidade || '-'}\nUnidade: ${d.unidade}\nÁrea: ${d.area}\n\n${d.mensagem || ''}`
      : `Olá, DistriBoi!\n\nNome: ${d.nome}\nEmpresa: ${d.empresa || '-'}\nTelefone: ${d.telefone}\nE-mail: ${d.email}\nUnidade: ${d.unidade}\n\n${d.mensagem}`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    aviso.textContent = 'Abrimos o seu e-mail com a mensagem pronta. Se não abrir, ligue (69) 3416-9400.';
  }));
})();
