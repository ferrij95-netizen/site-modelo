// Flamarsul: menu do celular, formulários por e-mail ou WhatsApp (site estático), filtro de marcas e busca de cidade.
(() => {
  const corpo = document.body;
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  document.querySelectorAll('[data-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter ? e.submitter.dataset.via : 'email';
    const linhas = [...form.querySelectorAll('input, select, textarea')]
      .filter(c => c.value.trim())
      .map(c => `${c.closest('label').querySelector('span').textContent.replace(' *', '')}: ${c.value.trim()}`);
    const assunto = form.dataset.assunto;
    const txt = `${assunto}\n\n${linhas.join('\n')}`;
    if (via === 'zap') location.href = `https://wa.me/${corpo.dataset.zap}?text=${encodeURIComponent(txt)}`;
    else location.href = `mailto:${form.dataset.para}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(txt)}`;
  }));

  // Produtos: filtro por categoria.
  const chips = document.querySelectorAll('.filtro .chip');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.setAttribute('aria-pressed', c === chip));
    document.querySelectorAll('.mc').forEach(m => { m.hidden = !!chip.dataset.cat && m.dataset.cat !== chip.dataset.cat; });
  }));

  // Onde estamos: busca de cidade (ignora acentos).
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  document.querySelectorAll('[data-busca-cidade]').forEach(campo => {
    const caixa = campo.closest('.in, div');
    const lista = caixa.querySelector('[data-cidades]');
    const res = caixa.querySelector('[data-busca-res]');
    const itens = [...lista.children];
    campo.addEventListener('input', () => {
      const q = norm(campo.value);
      let n = 0;
      itens.forEach(li => { const ok = !q || norm(li.textContent).includes(q); li.hidden = !ok; li.classList.toggle('achou', !!q && ok); if (ok) n++; });
      lista.classList.toggle('buscando', !!q);
      res.textContent = !q ? '' : n ? `Sim! ${n === 1 ? 'Esta cidade está' : n + ' cidades estão'} na rota da Flamarsul.` : 'Ainda não encontramos essa cidade na lista. Fale com a gente pelo WhatsApp para confirmar.';
      res.classList.toggle('nao', !!q && !n);
    });
  });
})();
