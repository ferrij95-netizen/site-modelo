// Menu do celular, altura do topo e formulário de orçamento que monta a mensagem para WhatsApp ou e-mail.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });
addEventListener('scroll', () => document.body.classList.toggle('rolou', scrollY > 40), { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// serviço vindo do link "Pedir orçamento" (?servico=...)
const sel = document.querySelector('[data-servico]'), pedido = new URLSearchParams(location.search).get('servico');
if (sel && pedido) sel.value = [...sel.options].some(o => o.value === pedido) ? pedido : '';

const form = document.querySelector('form.form');
const texto = () => [...new FormData(form)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`).join('\n');
form?.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(form.dataset.assunto)}&body=${encodeURIComponent(texto())}`;
});
form?.querySelector('[data-envia-wa]')?.addEventListener('click', () => {
  if (!form.reportValidity()) return;
  window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent('Olá! Pedido de orçamento pelo site:\n' + texto())}`, '_blank', 'noopener');
});
