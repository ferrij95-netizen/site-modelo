// Dispra: menu do celular, carrossel da home, formulários (por e-mail) e busca de representante/produto.
(() => {
  const corpo = document.body;
  const botao = document.querySelector('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

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

  const email = corpo.dataset.email;
  const enviar = (assunto, txt) => { location.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(txt)}`; };

  // Formulário de contato: aceita ?assunto=...&produto=... na URL.
  const form = document.querySelector('[data-form]');
  if (form) {
    const q = new URLSearchParams(location.search);
    if (q.get('assunto')) [...form.assunto.options].forEach(o => { if (o.text === q.get('assunto')) o.selected = true; });
    if (q.get('produto') && form.mensagem) form.mensagem.value = `Gostaria de saber mais sobre: ${q.get('produto')}.`;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      enviar(`${d.assunto} · ${d.nome}`, `${d.assunto}\n\nNome: ${d.nome}\nCidade: ${d.cidade} - ${d.estado}\nTelefone: ${d.telefone}\nE-mail: ${d.email}\n\n${d.mensagem || ''}`);
    });
  }
  document.querySelectorAll('[data-cadastro]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    enviar('Cadastro no site', `Quero receber novidades da Dispra.\n\nNome: ${d.nome}\nE-mail: ${d.email}`);
  }));
  const rep = document.querySelector('[data-rep]');
  if (rep) rep.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(rep));
    enviar(`Representante · ${d.cidade} - ${d.uf}`, `Gostaria de falar com o representante da minha região.\n\nCidade: ${d.cidade} - ${d.uf}\nNome:\nTelefone:\n`);
  });
  const busca = document.querySelector('[data-busca]');
  if (busca) busca.addEventListener('submit', e => {
    e.preventDefault();
    const q = busca.q.value.trim();
    location.href = `../contato/?assunto=${encodeURIComponent('Compra de produtos')}&produto=${encodeURIComponent(q)}`;
  });
})();
