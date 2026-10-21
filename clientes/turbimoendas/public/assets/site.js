// Menu, medida do topo, entrada suave, contagem dos números, zoom de fotos, busca no parque de máquinas
// e formulário de orçamento que abre o e-mail com a mensagem pronta.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', Math.max(0, topo.getBoundingClientRect().bottom) + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// entrada dos blocos e contagem dos números
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
const conta = el => {
  const alvo = el.textContent.trim(), n = parseInt(alvo.replace(/\./g, ''), 10); if (!n || quieto) return;
  const t0 = performance.now(), dur = 1200, fmt = x => Math.round(x).toLocaleString('pt-BR');
  const passo = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = fmt(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(passo); else el.textContent = alvo; };
  requestAnimationFrame(passo);
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; io.unobserve(e.target);
  if (e.target.hasAttribute('data-rev-filhos')) {
    const passo = +(e.target.dataset.revPasso || 90);
    [...e.target.children].forEach((c, i) => { c.style.transitionDelay = `${i * passo}ms`; });
    e.target.classList.add('vis');
  }
  e.target.querySelectorAll('[data-conta]').forEach(conta);
}), { threshold: 0, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('[data-rev-filhos]').forEach(el => io.observe(el));

// zoom de fotos
const dlg = document.querySelector('[data-zoom-dlg]');
document.addEventListener('click', e => {
  const z = e.target.closest('[data-zoom]'); if (!z || !dlg) return;
  const im = dlg.querySelector('img'), alt = z.querySelector('img')?.alt || '';
  im.src = z.dataset.zoom; im.alt = alt; dlg.querySelector('p').textContent = alt;
  dlg.showModal();
});
dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

// busca no parque de máquinas
const busca = document.querySelector('[data-busca-eq]');
busca?.addEventListener('input', () => {
  const q = busca.value.trim().toLowerCase(); let total = 0;
  document.querySelectorAll('[data-eq-grupo]').forEach(g => {
    let n = 0;
    g.querySelectorAll('[data-eq]').forEach(m => { const ok = !q || m.dataset.eq.includes(q); m.hidden = !ok; if (ok) n++; });
    g.hidden = !n; total += n;
  });
  document.querySelector('[data-eq-vazio]').hidden = total > 0;
});

// assunto vindo dos botões "Orçar"
const assunto = new URLSearchParams(location.search).get('assunto');
const sel = document.querySelector('[data-assunto]');
if (assunto && sel) { const o = [...sel.options].find(x => x.text === assunto); if (o) sel.value = o.text; }

// formulário → e-mail pronto
document.querySelector('[data-form]')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target), g = k => (f.get(k) || '').toString().trim();
  const corpo = [`Nome: ${g('nome')}`, `Empresa: ${g('empresa')}`, `E-mail: ${g('email')}`, `Telefone: ${g('telefone')}`, '', g('mensagem')].join('\n');
  location.href = `mailto:turbimoendas@turbimoendas.com.br?subject=${encodeURIComponent(`${g('assunto')} · site`)}&body=${encodeURIComponent(corpo)}`;
});

// garantia: se algum bloco não entrou pela rolagem (pulo por âncora, print), mostra depois de um tempo
addEventListener('load', () => setTimeout(() => document.querySelectorAll('[data-rev-filhos]:not(.vis)').forEach(el => el.classList.add('vis')), 2500));
