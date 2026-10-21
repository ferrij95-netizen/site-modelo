// Menu do celular, topo que muda ao rolar, abas de ambiente (versão B) e formulário de orçamento que monta o e-mail.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });
const rolou = () => document.body.classList.toggle('rolou', scrollY > 40);
rolou(); addEventListener('scroll', rolou, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); document.body.classList.toggle('menu-aberto', !a); ajustaTopo(); });

// abas "Escolha o ambiente"
document.querySelectorAll('[data-abas]').forEach(box => {
  const abas = [...box.querySelectorAll('[role=tab]')];
  const mostra = aba => abas.forEach(a => { const on = a === aba; a.setAttribute('aria-selected', String(on)); document.getElementById(a.getAttribute('aria-controls')).hidden = !on; });
  abas.forEach((a, i) => {
    a.addEventListener('click', () => mostra(a));
    a.addEventListener('keydown', e => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { const n = abas[(i + d + abas.length) % abas.length]; n.focus(); mostra(n); } });
  });
});

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
