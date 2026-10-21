// Menu do celular, fotos do pátio (A), galeria e zoom das fotos, filtros e ordem do estoque,
// e o formulário que abre o e-mail pronto.
const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;

const btn = $('.menu-btn'), menu = $('#menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// fotos aéreas do pátio que trocam sozinhas (versão A)
const sl = $('[data-slider]');
if (sl) {
  const fotos = $$('[data-slide]', sl), pts = $$('[data-ir]', sl);
  let i = 0, t;
  const vai = n => { i = (n + fotos.length) % fotos.length; fotos.forEach((f, k) => f.classList.toggle('on', k === i)); pts.forEach((p, k) => p.setAttribute('aria-selected', String(k === i))); };
  const roda = () => { clearInterval(t); if (!parado) t = setInterval(() => vai(i + 1), 5500); };
  pts.forEach((p, k) => p.addEventListener('click', () => { vai(k); roda(); }));
  roda();
}

// galeria: miniatura troca a foto principal
$$('[data-galeria]').forEach(g => {
  const princ = $('.gal-princ', g), img = $('img', princ);
  $$('[data-foto]', g).forEach(b => b.addEventListener('click', () => {
    img.src = b.dataset.foto; img.alt = $('img', b).alt; princ.dataset.zoom = b.dataset.foto;
    $$('[data-foto]', g).forEach(o => o.setAttribute('aria-current', String(o === b)));
  }));
});

// zoom
const dlg = $('[data-zoom-dlg]');
document.addEventListener('click', e => {
  const z = e.target.closest('[data-zoom]'); if (!z || !dlg?.showModal) return;
  const im = $('img', dlg); im.src = z.dataset.zoom; im.alt = $('img', z)?.alt || '';
  dlg.showModal();
});
dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

// estoque: tipo (?tipo= ou botões), busca (?q= ou campo) e ordem
const lista = $('[data-lista]');
if (lista) {
  const params = new URLSearchParams(location.search);
  const itens = [...lista.children], ordemOrig = [...itens];
  let tipoF = params.get('tipo') || '', q = (params.get('q') || '').toLowerCase();
  const busca = $('[data-busca]'), ordem = $('[data-ordem]'), cont = $('[data-contagem]'), sem = $('[data-sem-res]'), limpa = $('[data-limpa]');
  if (busca) busca.value = params.get('q') || '';
  const buscaTopo = $('#busca-a'); if (buscaTopo && params.get('q')) buscaTopo.value = params.get('q');
  const sem_acento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  function filtra() {
    const termos = sem_acento(q).split(/\s+/).filter(Boolean);
    let n = 0;
    itens.forEach(li => {
      const txt = sem_acento(li.dataset.txt);
      const ok = (!tipoF || li.dataset.tipo === tipoF) && termos.every(t => txt.includes(t));
      li.hidden = !ok; if (ok) n++;
    });
    if (cont) cont.textContent = `${n} ${n === 1 ? 'máquina' : 'máquinas'}`;
    if (sem) sem.hidden = n > 0;
    if (limpa) limpa.hidden = !tipoF && !q;
    $$('[data-chip]').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.chip === tipoF)));
    $$('[data-filtro-tipo]').forEach(a => a.setAttribute('aria-current', String(a.dataset.filtroTipo === tipoF)));
    const u = new URL(location); tipoF ? u.searchParams.set('tipo', tipoF) : u.searchParams.delete('tipo'); q ? u.searchParams.set('q', q) : u.searchParams.delete('q'); history.replaceState(null, '', u);
  }
  $$('[data-chip]').forEach(c => c.addEventListener('click', () => { tipoF = c.dataset.chip; filtra(); }));
  $$('[data-filtro-tipo]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); tipoF = tipoF === a.dataset.filtroTipo ? '' : a.dataset.filtroTipo; filtra(); lista.scrollIntoView({ behavior: parado ? 'auto' : 'smooth', block: 'start' }); }));
  busca?.addEventListener('input', () => { q = busca.value.trim().toLowerCase(); filtra(); });
  limpa?.addEventListener('click', () => { tipoF = ''; q = ''; if (buscaTopo) buscaTopo.value = ''; filtra(); });
  ordem?.addEventListener('change', () => {
    const [campo, dir] = [ordem.value.slice(0, -1), ordem.value.slice(-1)];
    const arr = ordem.value ? [...itens].sort((a, b) => (dir === '+' ? 1 : -1) * (Number(b.dataset[campo]) - Number(a.dataset[campo]))) : ordemOrig;
    arr.forEach(li => lista.append(li));
  });
  filtra();
}

// formulário: escolhe a máquina e o assunto pelo endereço e abre o e-mail com tudo preenchido
const form = $('[data-form]');
if (form) {
  const p = new URLSearchParams(location.search);
  if (p.get('maquina')) form.maquina.value = p.get('maquina');
  if (p.get('assunto')) { const r = $(`input[name=assunto][value="${p.get('assunto')}"]`, form); if (r) r.checked = true; }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form), maq = form.maquina.selectedOptions[0];
    const assunto = { comprar: 'Quero comprar', vender: 'Quero vender', trocar: 'Quero trocar' }[f.get('assunto')];
    const corpo = [
      `Assunto: ${assunto}`,
      maq?.value ? `Máquina: ${maq.textContent}` : '',
      `Nome: ${f.get('nome')}`, `Telefone: ${f.get('telefone')}`, f.get('email') ? `E-mail: ${f.get('email')}` : '',
      f.get('cidade') || f.get('estado') ? `Cidade: ${f.get('cidade')} ${f.get('estado')}`.trim() : '',
      '', f.get('mensagem'),
    ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
    location.href = `mailto:rodrigo.maquinasvendas@gmail.com?subject=${encodeURIComponent(`${assunto} · site${maq?.value ? ` · ${maq.textContent.split(' · ')[0]}` : ''}`)}&body=${encodeURIComponent(corpo)}`;
  });
}
