// Menu do celular, submenus, abas de soluções (B), simulador de economia e formulário que abre o WhatsApp.
(() => {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  menuBtn?.addEventListener('click', () => {
    const aberto = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!aberto));
    menu.classList.toggle('aberto', !aberto);
    document.body.classList.toggle('menu-aberto', !aberto);
  });
  document.querySelectorAll('.m-abre').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const pai = b.parentElement, aberto = b.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.sub-aberto').forEach(x => { if (x !== pai) { x.classList.remove('sub-aberto'); x.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false'); } });
    b.setAttribute('aria-expanded', String(!aberto));
    pai.classList.toggle('sub-aberto', !aberto);
  }));
  document.addEventListener('click', () => document.querySelectorAll('.sub-aberto').forEach(x => { x.classList.remove('sub-aberto'); x.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false'); }));

  // Abas: sem JavaScript todos os painéis aparecem um embaixo do outro.
  document.querySelectorAll('[data-abas]').forEach(a => {
    a.classList.add('js');
    const bts = [...a.querySelectorAll('[role=tab]')];
    const mostra = b => {
      bts.forEach(x => x.setAttribute('aria-selected', String(x === b)));
      a.querySelectorAll('[role=tabpanel]').forEach(p => { p.hidden = p.id !== b.getAttribute('aria-controls'); });
    };
    bts.forEach(b => b.addEventListener('click', () => mostra(b)));
    mostra(bts[0]);
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
    const linhas = ['Olá, vim do site e gostaria de um orçamento de energia solar.'];
    f.querySelectorAll('input, select, textarea').forEach(c => { if (c.value.trim()) linhas.push(`${c.name}: ${c.value.trim()}`); });
    window.open(`https://wa.me/${f.dataset.formWa}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
  }));
})();
