// Menu, abas, vídeo sob demanda, filtro do catálogo e formulários que montam WhatsApp ou e-mail.
const WA = '555531994180', EMAIL = 'comercial@probon.com.br';
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

document.querySelectorAll('[data-abas]').forEach(box => {
  const tabs = [...box.querySelectorAll('[role=tab]')];
  tabs.forEach(t => t.addEventListener('click', () => tabs.forEach(o => {
    const on = o === t; o.setAttribute('aria-selected', String(on)); document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
  })));
});

document.querySelectorAll('.video').forEach(f => f.querySelector('button').addEventListener('click', () => {
  f.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${f.dataset.video}?autoplay=1" title="Vídeo da Probon" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
}, { once: true }));

// Catálogo: filtros por tipo, linha, conforto, peso e detalhes; lê ?tipo=&conforto=&kg=&linha= vindos do buscador da home.
const cat = document.querySelector('[data-catalogo]');
if (cat) {
  const grade = cat.querySelector('.grade-prod'), itens = [...grade.children], total = cat.querySelector('[data-total]'), vazio = cat.querySelector('.vazio');
  const ordemOrig = itens.slice();
  const marcados = n => [...cat.querySelectorAll(`input[name=${n}]:checked`)].map(i => i.value);
  const q = new URLSearchParams(location.search);
  for (const [k, campo] of [['tipo', 'tipo'], ['linha', 'linha'], ['conforto', 'conforto']]) {
    const val = q.get(k); if (val) cat.querySelectorAll(`input[name=${campo}]`).forEach(i => { if (i.value === val) i.checked = true; });
  }
  if (q.get('kg')) cat.querySelector('select[name=kg]').value = q.get('kg');
  const aplica = () => {
    const tipo = marcados('tipo'), linha = marcados('linha'), conf = marcados('conforto'), tags = marcados('tag'), kg = +cat.querySelector('select[name=kg]').value || 0;
    let n = 0;
    for (const it of itens) {
      const d = it.dataset, t = d.tags.split('|');
      const ok = (!tipo.length || tipo.includes(d.tipo)) && (!linha.length || linha.includes(d.linha)) && (!conf.length || conf.includes(d.conforto))
        && (!kg || +d.kg >= kg) && tags.every(x => t.some(y => y.startsWith(x)));
      it.hidden = !ok; if (ok) n++;
    }
    total.textContent = n; vazio.hidden = n > 0;
    const ord = cat.querySelector('select[name=ordem]').value;
    const lista = ord ? itens.slice().sort((a, b) => ord === 'nome' ? a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent) : +b.dataset[ord === 'kg' ? 'kg' : 'conforto'] - +a.dataset[ord === 'kg' ? 'kg' : 'conforto']) : ordemOrig;
    lista.forEach(i => grade.appendChild(i));
  };
  cat.addEventListener('change', aplica);
  cat.querySelectorAll('.limpar').forEach(b => b.addEventListener('click', () => { cat.querySelectorAll('input:checked').forEach(i => { i.checked = false; }); cat.querySelectorAll('select').forEach(s => { s.value = ''; }); history.replaceState(null, '', location.pathname); aplica(); }));
  aplica();
  const fb = cat.querySelector('.filtros-btn');
  fb?.addEventListener('click', () => { const a = fb.getAttribute('aria-expanded') === 'true'; fb.setAttribute('aria-expanded', String(!a)); cat.querySelector('.filtros').classList.toggle('aberto', !a); });
}

const abreWa = txt => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
document.querySelector('form[data-rep]')?.addEventListener('submit', e => {
  e.preventDefault(); const d = new FormData(e.target);
  abreWa(`Olá! Procuro o representante Probon de ${d.get('cidade') ? d.get('cidade') + ', ' : ''}${d.get('estado')}. Sou ${d.get('perfil')}.`);
});
document.querySelector('form[data-contato]')?.addEventListener('submit', e => {
  e.preventDefault(); const d = new FormData(e.target);
  abreWa(`${d.get('assunto')}\nNome: ${d.get('nome')}${d.get('cidade') ? `\nCidade: ${d.get('cidade')}` : ''}\n\n${d.get('msg')}`);
});
document.querySelector('form[data-assist]')?.addEventListener('submit', e => {
  e.preventDefault(); const f = e.target;
  const linhas = [...f.querySelectorAll('input, textarea')].filter(i => i.value.trim()).map(i => `${i.closest('label').querySelector('span').textContent.replace(' *', '')}: ${i.value}`);
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Assistência técnica · NF ' + f.nf.value)}&body=${encodeURIComponent(linhas.join('\n') + '\n\nAnexos: foto da NF, foto do problema e foto da etiqueta.')}`;
});

// Prateleiras: arrastar com o mouse no computador.
document.querySelectorAll('[data-arrasta]').forEach(el => {
  let x0 = 0, s0 = 0, arrastou = false, baixo = false;
  el.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; baixo = true; arrastou = false; x0 = e.clientX; s0 = el.scrollLeft; });
  addEventListener('pointermove', e => { if (!baixo) return; const dx = e.clientX - x0; if (Math.abs(dx) > 5) arrastou = true; el.scrollLeft = s0 - dx; });
  addEventListener('pointerup', () => { baixo = false; });
  el.addEventListener('click', e => { if (arrastou) { e.preventDefault(); arrastou = false; } }, true);
  el.addEventListener('dragstart', e => e.preventDefault());
});

// Entrada suave das seções.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('visto'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.etapas li, .camada, .linha-b, .ind-item, .ensaios li, .marcos-b li, .linha-bloco').forEach(el => { el.classList.add('anima'); io.observe(el); });
}
