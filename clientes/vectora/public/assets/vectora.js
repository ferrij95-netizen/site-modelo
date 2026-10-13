// Vectora: menu do celular, carrossel da home, filtro do catálogo, prateleira de produtos e formulários (por e-mail).
(() => {
  const corpo = document.body;
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  // Topo muda de fundo quando a página rola.
  const marcaRolagem = () => corpo.classList.toggle('rolou', scrollY > 24);
  addEventListener('scroll', marcaRolagem, { passive: true });
  marcaRolagem();

  // Carrossel: troca sozinho a cada 7 s, para quando o mouse está em cima.
  const car = document.querySelector('[data-carrossel]');
  if (car) {
    const slides = [...car.querySelectorAll('[data-slide]')];
    const pontos = [...car.querySelectorAll('[data-ir]')];
    let atual = 0, timer;
    const ir = n => {
      atual = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('ativo', k === atual));
      pontos.forEach((p, k) => p.toggleAttribute('aria-current', k === atual));
    };
    const tocar = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(atual + 1), 7000); };
    pontos.forEach((p, k) => p.addEventListener('click', () => { ir(k); tocar(); }));
    car.querySelector('[data-ant]')?.addEventListener('click', () => { ir(atual - 1); tocar(); });
    car.querySelector('[data-prox]')?.addEventListener('click', () => { ir(atual + 1); tocar(); });
    car.addEventListener('mouseenter', () => clearInterval(timer));
    car.addEventListener('mouseleave', tocar);
    tocar();
  }

  // Filtro do catálogo, também pelo endereço (#saneamento, #oleo-gas, #web, #iot).
  const cat = document.querySelector('[data-catalogo]');
  if (cat) {
    const botoes = [...document.querySelectorAll('[data-filtro]')];
    const filtra = f => {
      if (!botoes.some(b => b.dataset.filtro === f)) f = '';
      botoes.forEach(b => b.setAttribute('aria-pressed', b.dataset.filtro === f));
      cat.querySelectorAll('[data-cats]').forEach(c => { c.hidden = !!f && !c.dataset.cats.split(' ').includes(f); });
    };
    botoes.forEach(b => b.addEventListener('click', () => {
      filtra(b.dataset.filtro);
      history.replaceState(null, '', b.dataset.filtro ? '#' + b.dataset.filtro : location.pathname);
    }));
    filtra(location.hash.slice(1));
    addEventListener('hashchange', () => filtra(location.hash.slice(1)));
  }

  // Prateleira de produtos com setas.
  const trilho = document.querySelector('[data-trilho]');
  document.querySelectorAll('[data-rolar]').forEach(b => b.addEventListener('click', () => {
    trilho.scrollBy({ left: +b.dataset.rolar * trilho.clientWidth * 0.8, behavior: 'smooth' });
  }));

  const email = corpo.dataset.email;
  const enviar = (assunto, txt) => { location.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(txt)}`; };

  // Formulário de contato: aceita ?produto=... no endereço.
  const form = document.querySelector('[data-form]');
  if (form) {
    const q = new URLSearchParams(location.search);
    if (q.get('produto')) form.mensagem.value = `Gostaria de um orçamento de: ${q.get('produto')}.`;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      enviar(`${d.assunto} · ${d.nome}`, `${d.assunto}\n\nNome: ${d.nome}\nEmpresa: ${d.empresa}\nTelefone: ${d.telefone}\nE-mail: ${d.email}\n\n${d.mensagem || ''}`);
    });
  }
  document.querySelectorAll('[data-noticias]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    enviar('Assinar as notícias', `Quero receber as notícias da Vectora.\n\nE-mail: ${new FormData(f).get('email')}`);
  }));
})();
