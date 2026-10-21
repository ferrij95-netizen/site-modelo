// Menu do celular, busca de cidades atendidas, painel de rota (distância e prazo) e formulário que monta a mensagem.
const topo = document.querySelector('.topo');
const ajustaTopo = () => topo && document.documentElement.style.setProperty('--topo-h', topo.getBoundingClientRect().bottom + 'px');
ajustaTopo(); addEventListener('resize', ajustaTopo); addEventListener('scroll', ajustaTopo, { passive: true });
addEventListener('scroll', () => document.body.classList.toggle('rolou', scrollY > 40), { passive: true });

const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); ajustaTopo(); });

// busca de cidade (a lista completa já está no HTML)
const tira = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
document.querySelectorAll('[data-busca]').forEach(b => {
  const input = b.querySelector('[data-busca-input]'), info = b.querySelector('[data-busca-info]'), itens = [...b.querySelectorAll('[data-busca-lista] li')];
  const total = info.textContent;
  input.addEventListener('input', () => {
    const q = tira(input.value); let n = 0;
    itens.forEach(li => { const ok = !q || li.dataset.nome.includes(q); li.hidden = !ok; if (ok) n++; });
    b.classList.toggle('filtrando', !!q);
    info.textContent = !q ? total : n ? `${n} ${n === 1 ? 'cidade encontrada' : 'cidades encontradas'}.` : 'Nenhuma cidade com esse nome na lista. Fale com o comercial: a Transpérola também atende por parceiros.';
  });
});

// painel de rota: escolhe a filial e acende a rota no mapa ao lado
document.querySelectorAll('.rota-painel').forEach(p => {
  const dados = JSON.parse(p.dataset.rotas), sel = p.querySelector('[data-destino]');
  const svg = p.parentElement.querySelector('svg');
  const mostra = id => {
    const d = dados[id]; if (!d) return;
    p.querySelector('[data-km]').textContent = d.km.toLocaleString('pt-BR') + ' km';
    p.querySelector('[data-p0]').textContent = d.p[0] + ' dias úteis';
    p.querySelector('[data-p1]').textContent = d.p[1] + ' dias úteis';
    svg?.querySelectorAll('[data-rota]').forEach(r => r.classList.toggle('ativa', r.dataset.rota === id));
    svg?.querySelectorAll('[data-ponto]').forEach(r => r.classList.toggle('ativo', r.dataset.ponto === id));
  };
  sel.addEventListener('change', () => mostra(sel.value));
  svg?.querySelectorAll('[data-ponto]').forEach(g => g.addEventListener('click', () => { if (dados[g.dataset.ponto]?.p) { sel.value = g.dataset.ponto; mostra(sel.value); } }));
  mostra(sel.value);
});

const form = document.querySelector('form.form');
const texto = () => [...new FormData(form)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`).join('\n');
form?.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(form.dataset.assunto)}&body=${encodeURIComponent(texto())}`;
});
form?.querySelector('[data-envia-wa]')?.addEventListener('click', () => {
  if (!form.reportValidity()) return;
  window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent('Olá! Mensagem pelo site:\n' + texto())}`, '_blank', 'noopener');
});
