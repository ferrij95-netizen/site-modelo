// Menu do celular, simulador de economia e formulários que abrem o WhatsApp já preenchido.
(() => {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  menuBtn?.addEventListener('click', () => {
    const aberto = menuBtn.getAttribute('aria-expanded') === 'true';
    document.documentElement.style.setProperty('--topo-h', document.querySelector('.topo').getBoundingClientRect().bottom + 'px');
    menuBtn.setAttribute('aria-expanded', String(!aberto));
    menu.classList.toggle('aberto', !aberto);
    document.body.classList.toggle('menu-aberto', !aberto);
  });

  const real = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
  document.querySelectorAll('[data-simulador]').forEach(f => {
    const ent = f.querySelector('[data-sim-in]'), wa = f.querySelector('[data-sim-wa]');
    const conta = f.querySelector('[data-sim-conta]'), mes = f.querySelector('[data-sim-mes]'), ano = f.querySelector('[data-sim-ano]');
    const calc = () => {
      const v = +ent.value;
      conta.textContent = real(v);
      mes.textContent = 'até ' + real(v * 0.95);
      ano.textContent = 'até ' + real(v * 0.95 * 12);
      ent.style.setProperty('--p', ((v - ent.min) / (ent.max - ent.min) * 100) + '%');
      if (wa) wa.href = wa.href.replace(/text=.*/, 'text=' + encodeURIComponent(`Olá, vim do site. Minha conta de luz é de cerca de ${real(v)} por mês e gostaria de um orçamento de energia solar.`));
    };
    ent.addEventListener('input', calc);
    calc();
  });

  document.querySelectorAll('form[data-form-wa]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [`Olá, vim do site. ${f.dataset.assunto || ''}`.trim()];
    f.querySelectorAll('input, textarea').forEach(c => { if (c.value.trim()) linhas.push(`${c.name}: ${c.value.trim()}`); });
    window.open(`https://wa.me/${f.dataset.formWa}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
  }));
})();
