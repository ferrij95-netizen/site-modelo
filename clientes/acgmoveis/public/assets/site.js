// ACG Móveis: menu do celular, topo que escurece ao rolar (versão B), filtros de produtos e representantes, formulário por e-mail.
(() => {
  const topo = document.querySelector('.topo');
  const burger = document.querySelector('.burger');
  burger?.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    burger.setAttribute('aria-expanded', aberto);
  });

  // Versão B: topo transparente sobre a foto, sólido depois de rolar.
  if (topo?.classList.contains('topo-sobre')) {
    const marca = topo.querySelector('.marca img');
    const ajusta = () => topo.classList.toggle('topo-fixo', scrollY > 40 || document.body.classList.contains('menu-aberto'));
    addEventListener('scroll', ajusta, { passive: true });
    burger?.addEventListener('click', ajusta);
    ajusta();
    if (marca && !marca.dataset.logoClaro) marca.src = '/assets/img/logo-claro.png';
  }

  // Filtros com o estado na âncora (#conjuntos, #RS), para os links do menu e do rodapé.
  function filtro(box, attr, aplicar) {
    if (!box) return;
    const chips = [...box.querySelectorAll('.chip')];
    const marcar = val => {
      if (!chips.some(c => c.dataset[attr] === val)) val = '';
      chips.forEach(c => c.setAttribute('aria-pressed', c.dataset[attr] === val));
      aplicar(val);
    };
    chips.forEach(c => c.addEventListener('click', () => {
      marcar(c.dataset[attr]);
      history.replaceState(null, '', c.dataset[attr] ? '#' + c.dataset[attr] : location.pathname);
    }));
    const deHash = () => marcar(decodeURIComponent(location.hash.slice(1)));
    addEventListener('hashchange', deHash);
    deHash();
  }
  filtro(document.querySelector('[data-filtro-cat]'), 'cat', val => {
    document.querySelectorAll('[data-grupo]').forEach(g => { g.hidden = !!val && g.dataset.grupo !== val; });
  });
  filtro(document.querySelector('[data-filtro-uf]'), 'uf', val => {
    document.querySelectorAll('.rep').forEach(r => { r.hidden = !!val && !r.dataset.uf.split(' ').includes(val); });
  });

  // Formulário: monta um e-mail para a fábrica (o site atual usa o formulário do Wix).
  document.querySelectorAll('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const corpo = `Nome: ${d.get('nome')}\nTelefone: ${d.get('telefone')}\nE-mail: ${d.get('email')}\nCidade/UF: ${d.get('cidade') || ''}\n\n${d.get('mensagem')}`;
    location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(d.get('assunto') || 'Contato pelo site')}&body=${encodeURIComponent(corpo)}`;
  }));
})();
