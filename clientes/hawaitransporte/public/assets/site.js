// Menu do celular, cotação pelo WhatsApp e caixa de fotos da galeria.
(() => {
  const WA = '5585999030753';
  const btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    btn.setAttribute('aria-expanded', aberto);
  });

  const nomeUf = sel => sel && sel.value ? sel.options[sel.selectedIndex].text : '';
  document.querySelectorAll('[data-cotacao]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    f.querySelectorAll('[required]').forEach(c => {
      const vazio = !c.value.trim();
      c.closest('label').classList.toggle('erro', vazio);
      if (vazio && ok) { c.focus(); ok = false; }
    });
    if (!ok) return;
    const v = n => (f.elements[n] && f.elements[n].value.trim()) || '';
    const origem = [v('cidade_origem'), nomeUf(f.elements.uf_origem)].filter(Boolean).join(' / ');
    const destino = [v('cidade_destino'), nomeUf(f.elements.uf_destino)].filter(Boolean).join(' / ');
    const linhas = ['Olá! Gostaria de uma cotação de transporte de veículo.',
      v('nome') && `Nome: ${v('nome')}`, v('email') && `E-mail: ${v('email')}`, v('telefone') && `Telefone: ${v('telefone')}`,
      `Origem: ${origem}`, `Destino: ${destino}`, v('veiculo') && `Veículo: ${v('veiculo')}`,
      v('valor') && `Valor do veículo: R$ ${v('valor')}`, v('mensagem') && `Mensagem: ${v('mensagem')}`].filter(Boolean);
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
  }));
  document.addEventListener('input', e => { const l = e.target.closest('label.erro'); if (l && e.target.value.trim()) l.classList.remove('erro'); });

  const caixa = document.querySelector('.caixa-foto');
  if (caixa) {
    const fotos = [...document.querySelectorAll('[data-foto]')];
    let i = 0;
    const abre = n => {
      i = (n + fotos.length) % fotos.length;
      caixa.querySelector('img').src = fotos[i].href;
      caixa.querySelector('img').alt = fotos[i].dataset.foto;
      caixa.querySelector('figcaption').textContent = fotos[i].dataset.foto;
      caixa.hidden = false;
    };
    fotos.forEach((a, n) => a.addEventListener('click', e => { e.preventDefault(); abre(n); }));
    caixa.addEventListener('click', e => { if (e.target === caixa || e.target.closest('.caixa-fechar')) caixa.hidden = true; });
    document.addEventListener('keydown', e => {
      if (caixa.hidden) return;
      if (e.key === 'Escape') caixa.hidden = true;
      if (e.key === 'ArrowRight') abre(i + 1);
      if (e.key === 'ArrowLeft') abre(i - 1);
    });
  }
})();
