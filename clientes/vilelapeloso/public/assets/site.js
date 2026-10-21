// Menu do celular, entrada suave ao rolar, etapas que acendem conforme a rolagem e formulário que monta o e-mail.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
const alvos = document.querySelectorAll('main section .in > *, .a-area, .b-area, .temas > div');
if (!calmo && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  alvos.forEach(el => { if (el.getBoundingClientRect().top > innerHeight * .9) { el.setAttribute('data-rev', ''); io.observe(el); } });
}

// etapas: cada passo acende quando passa do meio da tela; na versão B a linha enche junto
const listas = document.querySelectorAll('[data-etapas]');
const acende = () => listas.forEach(ol => {
  const meio = innerHeight * .62;
  ol.querySelectorAll('li').forEach(li => li.classList.toggle('aceso', calmo || li.getBoundingClientRect().top < meio));
  const r = ol.getBoundingClientRect();
  ol.style.setProperty('--enche', `${Math.max(0, Math.min(100, (meio - r.top) / r.height * 100))}%`);
});
acende(); addEventListener('scroll', acende, { passive: true }); addEventListener('resize', acende);

// assunto vindo do link (?assunto=Direito do Trabalho)
const q = new URLSearchParams(location.search).get('assunto');
if (q) document.querySelectorAll('select[name="assunto"]').forEach(s => { [...s.options].forEach(o => { if (o.text === q) s.value = o.text; }); });

// formulário: abre o e-mail do escritório com a mensagem pronta
document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const corpo = [`Nome: ${d.get('nome')}`, d.get('telefone') && `Telefone: ${d.get('telefone')}`, d.get('email') && `E-mail: ${d.get('email')}`, '', d.get('mensagem')].filter(x => x !== null && x !== undefined && x !== false).join('\n');
  location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(`Site: ${d.get('assunto')}`)}&body=${encodeURIComponent(corpo)}`;
}));
