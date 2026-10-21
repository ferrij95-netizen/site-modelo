// Menu, topo que encolhe ao rolar, agenda tributária do mês, abas de serviços, depoimentos, busca nos utilitários
// e formulário de contato que monta o e-mail ou a mensagem de WhatsApp.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });
const marcaRolou = () => document.body.classList.toggle('rolou', scrollY > 60);
marcaRolou(); addEventListener('scroll', marcaRolou, { passive: true });

// agenda tributária: mês corrente, dias com obrigações marcados (dados da agenda Ideal do escritório)
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
document.querySelectorAll('[data-agenda]').forEach(ag => {
  const A = window.AGENDA || { dias: {}, link: '#' };
  const hoje = new Date(), ano = hoje.getFullYear(), mes = hoje.getMonth();
  const chave = `${ano}-${String(mes + 1).padStart(2, '0')}`;
  const marcados = A.dias[chave] || [];
  ag.querySelector('[data-ag-mes]').textContent = `${MESES[mes][0].toUpperCase() + MESES[mes].slice(1)} de ${ano}`;
  const g = ag.querySelector('[data-ag-grade]');
  let h = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => `<span class="sem">${d}</span>`).join('');
  const ini = new Date(ano, mes, 1).getDay(), fim = new Date(ano, mes + 1, 0).getDate();
  for (let i = 0; i < ini; i++) h += '<span></span>';
  for (let d = 1; d <= fim; d++) {
    const sem = new Date(ano, mes, d).getDay();
    const cls = [sem === 0 || sem === 6 ? 'fds' : '', marcados.includes(d) ? 'tem' : '', d === hoje.getDate() ? 'hoje' : ''].filter(Boolean).join(' ');
    h += `<a class="${cls}" href="${A.link}&d=${d}" target="_blank" rel="noopener" aria-label="${d} de ${MESES[mes]}${marcados.includes(d) ? ', com obrigações' : ''}">${d}</a>`;
  }
  g.innerHTML = h;
});

// abas de serviços (A)
document.querySelectorAll('[data-abas]').forEach(box => {
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const vai = t => tabs.forEach(o => { const on = o === t; o.setAttribute('aria-selected', String(on)); o.tabIndex = on ? 0 : -1; document.getElementById(o.getAttribute('aria-controls')).hidden = !on; });
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => vai(t));
    t.addEventListener('keydown', e => { const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (k) { e.preventDefault(); const n = tabs[(i + k + tabs.length) % tabs.length]; vai(n); n.focus(); } });
  });
});

// depoimentos (A)
document.querySelectorAll('[data-slider]').forEach(s => {
  const itens = [...s.querySelectorAll('figure')], pos = s.querySelector('[data-pos]');
  let i = 0, timer;
  const vai = n => { i = (n + itens.length) % itens.length; itens.forEach((f, k) => f.hidden = k !== i); pos.textContent = `${i + 1} / ${itens.length}`; };
  const auto = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => vai(i + 1), 9000); };
  s.querySelector('[data-ant]').addEventListener('click', () => { vai(i - 1); auto(); });
  s.querySelector('[data-prox]').addEventListener('click', () => { vai(i + 1); auto(); });
  auto();
});

// régua do mês (B): enche quando aparece
const regua = document.querySelector('.mes-regua');
if (regua && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  regua.style.setProperty('--cheio', '0%');
  new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { regua.style.setProperty('--cheio', '100%'); o.disconnect(); } }), { threshold: .6 }).observe(regua);
}

// busca nos utilitários
const ub = document.querySelector('[data-util-busca]');
ub?.addEventListener('input', () => {
  const q = ub.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  let total = 0;
  document.querySelectorAll('[data-util-g]').forEach(g => {
    if (g.tagName === 'A') { const ok = !q || norm(g.dataset.util).includes(q); g.hidden = !ok; total += ok; return; }
    let n = 0;
    g.querySelectorAll('[data-util]').forEach(li => { const ok = !q || norm(li.dataset.util).includes(q); li.hidden = !ok; n += ok; });
    g.hidden = !n; total += n;
    if (q && n) g.open = true;
  });
  document.querySelector('[data-util-sem]').hidden = total > 0;
});

// formulário de contato: e-mail (mailto) ou WhatsApp, com os campos preenchidos
document.querySelectorAll('[data-contato]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f), via = e.submitter?.value || 'email';
  const txt = `Nome: ${d.get('nome')}\nE-mail: ${d.get('email')}\nTelefone: ${d.get('telefone') || '-'}\nCidade/UF: ${d.get('cidade') || '-'}\nAssunto: ${d.get('assunto')}\n\n${d.get('mensagem') || ''}`;
  if (via === 'whats') window.open(`https://wa.me/5551995870431?text=${encodeURIComponent('Olá! Vim pelo site da Führ Contabilidade.\n\n' + txt)}`, '_blank', 'noopener');
  else location.href = `mailto:contato@fuhrcontabilidade.com.br?subject=${encodeURIComponent('Site: ' + d.get('assunto'))}&body=${encodeURIComponent(txt)}`;
}));
