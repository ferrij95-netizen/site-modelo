// Menu do celular, submenu de serviços e formulário "Seja um cooperado" (abre o e-mail com a mensagem pronta).
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
    document.querySelectorAll('.sub.aberto').forEach(s => { if (!s.contains(e.target) && window.innerWidth > 1080) s.classList.remove('aberto'); });
  });

  document.querySelectorAll('[data-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(c => {
      const bom = c.value.trim() && (c.type !== 'email' || /.+@.+\..+/.test(c.value));
      c.parentElement.classList.toggle('erro', !bom);
      if (!bom) ok = false;
    });
    const aviso = form.querySelector('[data-aviso]');
    if (!ok) { aviso.textContent = 'Preencha nome, e-mail e telefone para continuar.'; return; }
    const d = Object.fromEntries(new FormData(form));
    const corpo = `Olá, Coopasol! Quero ser cooperado.\n\nNome: ${d.nome}\nE-mail: ${d.email}\nTelefone: ${d.telefone}\nCidade: ${d.cidade || '-'}\nÁrea e culturas: ${d.area || '-'}\n\n${d.mensagem || ''}`;
    location.href = `mailto:coopasol.contabil@hotmail.com?subject=${encodeURIComponent('Quero ser cooperado: ' + d.nome)}&body=${encodeURIComponent(corpo)}`;
    aviso.textContent = 'Abrimos o seu e-mail com a mensagem pronta. Se não abrir, ligue (67) 3427-1300.';
  }));
})();
