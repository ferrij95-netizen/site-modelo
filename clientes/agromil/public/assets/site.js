// Menu do celular.
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  menu.addEventListener('click', e => { if (e.target.closest('a')) menu.classList.remove('aberto'); });
}

// Lista de sementes (página Sementes): toca na espécie para pôr na lista e envia ao vendedor pelo WhatsApp.
const barra = document.querySelector('.lista-barra');
if (barra) {
  const chips = [...document.querySelectorAll('.chip')];
  const qtd = barra.querySelector('.lista-qtd');
  const msg = itens => `Olá! Vim pelo site da Agromil Sementes. Gostaria de um orçamento destas sementes:\n${itens.map(i => `- ${i}`).join('\n')}`;
  const atualiza = () => {
    const itens = chips.filter(c => c.getAttribute('aria-pressed') === 'true').map(c => `${c.closest('.linha').querySelector('h2').textContent}: ${c.dataset.item}`);
    qtd.textContent = itens.length;
    barra.hidden = itens.length === 0;
    barra.querySelectorAll('[data-wa]').forEach(a => { a.href = `https://wa.me/${a.dataset.wa}?text=${encodeURIComponent(msg(itens))}`; });
  };
  chips.forEach(c => c.addEventListener('click', () => { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true'); atualiza(); }));
  barra.querySelector('.lista-limpar').addEventListener('click', () => { chips.forEach(c => c.setAttribute('aria-pressed', 'false')); atualiza(); });
}

// Pedido de orçamento (página Vendas): abre o WhatsApp do vendedor escolhido com o texto pronto.
document.querySelectorAll('form[data-pedido]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const texto = `Olá! Vim pelo site da Agromil Sementes.\nNome: ${d.get('nome')}\nCidade: ${d.get('cidade')}\nSou: ${d.get('tipo')}\nPreciso de: ${d.get('msg')}`;
  window.open(`https://wa.me/${d.get('vend')}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
}));

// Formulário de contato: abre o e-mail com a mensagem pronta.
document.querySelectorAll('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const corpo = `Nome: ${d.get('nome')}\nTelefone: ${d.get('fone') || '-'}\n\n${d.get('msg')}`;
  location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(corpo)}`;
}));
