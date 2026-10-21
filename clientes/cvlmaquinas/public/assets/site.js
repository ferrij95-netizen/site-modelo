// Menu do celular, vitrine (A), etapas "Do painel ao móvel" (B), galeria e zoom das fotos, filtros de catálogo e de representantes,
// e o formulário de orçamento que abre o e-mail pronto.
const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];

const btn = $('.menu-btn'), menu = $('#menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// vitrine da versão A
const vit = $('[data-vitrine]');
if (vit) {
  const slides = $$('[data-slide]', vit), abas = $$('[data-ir]', vit);
  let i = 0, t;
  const vai = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('on', k === i); s.setAttribute('aria-hidden', String(k !== i)); });
    abas.forEach((a, k) => a.setAttribute('aria-selected', String(k === i)));
  };
  const roda = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => vai(i + 1), 6500); };
  abas.forEach((a, k) => a.addEventListener('click', () => { vai(k); roda(); }));
  vit.addEventListener('mouseenter', () => clearInterval(t)); vit.addEventListener('mouseleave', roda);
  roda();
}

// etapas da versão B
const et = $('[data-etapas-b]');
if (et) {
  const bts = $$('[data-etapa]', et), pns = $$('[data-painel]', et);
  const vai = n => { bts.forEach((b, k) => b.setAttribute('aria-selected', String(k === n))); pns.forEach((p, k) => { p.hidden = k !== n; }); };
  bts.forEach((b, k) => b.addEventListener('click', () => vai(k)));
  vai(0);
}

// galeria: miniatura troca a foto principal
$$('[data-galeria]').forEach(g => {
  const princ = $('.gal-princ', g), img = $('img', princ);
  $$('[data-foto]', g).forEach(b => b.addEventListener('click', () => {
    img.src = b.dataset.foto; img.alt = $('img', b).alt; princ.dataset.zoom = b.dataset.foto; princ.dataset.leg = b.dataset.leg || '';
    $$('[data-foto]', g).forEach(o => o.setAttribute('aria-current', String(o === b)));
  }));
});

// zoom
const dlg = $('[data-zoom-dlg]');
document.addEventListener('click', e => {
  const z = e.target.closest('[data-zoom]'); if (!z || !dlg?.showModal) return;
  const im = $('img', dlg); im.src = z.dataset.zoom; im.alt = $('img', z)?.alt || '';
  $('p', dlg).textContent = z.dataset.leg || '';
  dlg.showModal();
});
dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

// filtros (linha + busca no catálogo B; estado nos representantes)
const params = new URLSearchParams(location.search);
const itens = $$('[data-linha][data-txt]'), busca = $('[data-busca-maq]');
let linhaF = params.get('linha') || '';
function filtra() {
  const q = (busca?.value || '').trim().toLowerCase();
  let n = 0;
  itens.forEach(li => { const ok = (!linhaF || li.dataset.linha === linhaF) && (!q || li.dataset.txt.includes(q)); li.hidden = !ok; if (ok) n++; });
  const sem = $('[data-sem-res]'); if (sem) sem.hidden = n > 0;
  $$('[data-linha-f]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.linhaF === linhaF)));
}
if (itens.length) {
  $$('[data-linha-f]').forEach(b => b.addEventListener('click', () => { linhaF = b.dataset.linhaF; filtra(); }));
  busca?.addEventListener('input', filtra);
  filtra();
}
$$('[data-uf-f]').forEach(b => b.addEventListener('click', () => {
  const uf = b.dataset.ufF;
  $$('[data-uf-f]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  $$('[data-uf]').forEach(s => { s.hidden = !!uf && s.dataset.uf !== uf; });
}));

// formulário de orçamento: a máquina vem do link (?maquina=) e o pedido abre pronto no e-mail
$$('[data-form-orc]').forEach(f => {
  const m = params.get('maquina'); if (m && f.maquina) f.maquina.value = m;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    const maq = f.maquina.selectedIndex > 0 ? f.maquina.options[f.maquina.selectedIndex].text : '';
    const linhas = [`Nome: ${d.nome}`];
    if (d.empresa) linhas.push(`Empresa: ${d.empresa}`);
    linhas.push(`E-mail: ${d.email}`);
    if (d.fone) linhas.push(`Telefone: ${d.fone}`);
    if (d.cidade || d.uf) linhas.push(`Cidade: ${[d.cidade, d.uf].filter(Boolean).join(' / ')}`);
    if (maq) linhas.push(`Máquina de interesse: ${maq}`);
    if (d.msg) linhas.push('', d.msg);
    const assunto = `Pedido de orçamento pelo site${maq ? ` · ${maq}` : ''}`;
    location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
  });
});
