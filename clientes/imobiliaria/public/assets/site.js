// Quadra Imóveis: menu, cabeçalho, favoritos, filtros da busca, galeria, simuladores e formulários para o WhatsApp.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  document.documentElement.classList.add('js');
  const whatsNum = document.body.dataset.whatsNum || '';
  const abreWhats = txt => window.open(`https://wa.me/${whatsNum}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');

  // Menu do celular
  const mb = $('[data-menu]'), nav = $('[data-nav]');
  mb?.addEventListener('click', () => { const ab = nav.classList.toggle('aberto'); mb.setAttribute('aria-expanded', ab); });

  // Cabeçalho sobre a foto fica sólido ao rolar
  const cab = $('.cab-foto');
  if (cab) { const f = () => cab.classList.toggle('rolou', scrollY > 40); f(); addEventListener('scroll', f, { passive: true }); }

  // WhatsApp
  $$('[data-whats]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); abreWhats(a.dataset.whats); }));
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
    abreWhats(`Olá! ${f.dataset.form}\n\n${linhas.join('\n')}`);
    const ok = $('.form-ok', f); if (ok) { ok.hidden = false; ok.textContent = 'Pronto! Abrimos o WhatsApp com a sua mensagem. É só enviar.'; }
  }));

  // Favoritos (guardados neste aparelho)
  const CH = 'quadra-favoritos';
  let favs = []; try { favs = JSON.parse(localStorage.getItem(CH) || '[]'); } catch (e) {}
  const salva = () => { try { localStorage.setItem(CH, JSON.stringify(favs)); } catch (e) {} };
  const pinta = () => {
    $$('[data-fav]').forEach(b => b.setAttribute('aria-pressed', favs.includes(b.dataset.fav)));
    const n = $('[data-fav-n]'); if (n) { n.textContent = favs.length; n.hidden = !favs.length; }
    const lista = $('[data-favs]');
    if (lista) { let k = 0; $$('.card', lista).forEach(c => { c.hidden = !favs.includes(c.dataset.ref); if (!c.hidden) k++; }); $('[data-favs-vazio]').hidden = k > 0; }
  };
  $$('[data-fav]').forEach(b => b.addEventListener('click', () => {
    const r = b.dataset.fav; favs = favs.includes(r) ? favs.filter(x => x !== r) : [...favs, r]; salva(); pinta();
  }));
  pinta();

  // Busca com filtros
  const filtros = $('[data-filtros]'), lista = $('[data-lista]');
  if (filtros && lista) {
    const cards = $$('.card', lista);
    const num = s => +String(s || '').replace(/\D/g, '') || 0;
    const p = new URLSearchParams(location.search);
    for (const [k, v] of p) { const el = filtros.elements[k]; if (!el) continue; if (el instanceof RadioNodeList) { const r = [...el].find(x => x.value === v); if (r) r.checked = true; } else el.value = v; }
    if (!filtros.elements.fin.value) filtros.elements.fin[0].checked = true;
    if (!filtros.elements.dorm.value) filtros.elements.dorm[0].checked = true;
    if (!filtros.elements.vagas.value) filtros.elements.vagas[0].checked = true;
    const titulo = $('[data-lista-titulo]'), nres = $('[data-res-n]'), vazio = $('[data-vazio]'), ordem = $('[data-ordem]');
    const aplica = (atualizaUrl) => {
      const f = Object.fromEntries(new FormData(filtros));
      const min = num(f.min), max = num(f.max);
      let n = 0;
      for (const c of cards) {
        const d = c.dataset;
        const ok = (!f.fin || d.fin === f.fin) && (!f.tipo || d.tipo === f.tipo) && (!f.bairro || d.bairro === f.bairro)
          && (!min || +d.preco >= min) && (!max || +d.preco <= max) && (!f.dorm || +d.dorm >= +f.dorm) && (!f.vagas || +d.vagas >= +f.vagas);
        c.hidden = !ok; if (ok) n++;
      }
      const o = ordem.value;
      const ord = [...cards].sort((a, b) => o === 'menor' ? a.dataset.preco - b.dataset.preco : o === 'maior' ? b.dataset.preco - a.dataset.preco : o === 'area' ? b.dataset.area - a.dataset.area : a.style.getPropertyValue('--ord') - b.style.getPropertyValue('--ord'));
      ord.forEach(c => lista.appendChild(c));
      nres.textContent = `${n} imóve${n === 1 ? 'l' : 'is'} encontrado${n === 1 ? '' : 's'}`;
      vazio.hidden = n > 0;
      titulo.textContent = (f.fin === 'venda' ? 'Imóveis à venda' : f.fin === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda e para alugar') + (f.bairro ? ` em ${f.bairro}` : ' em Porto Alegre');
      if (atualizaUrl) {
        const q = new URLSearchParams(); for (const [k, v] of Object.entries(f)) if (v) q.set(k, v);
        history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname);
      }
    };
    filtros.addEventListener('input', () => aplica(true));
    filtros.addEventListener('change', () => aplica(true));
    filtros.addEventListener('reset', () => setTimeout(() => { filtros.elements.fin[0].checked = true; filtros.elements.dorm[0].checked = true; filtros.elements.vagas[0].checked = true; aplica(true); }));
    ordem.addEventListener('change', () => aplica(false));
    aplica(false);
    const fb = $('[data-filtros-abrir]');
    fb?.addEventListener('click', () => { const ab = filtros.classList.toggle('aberto'); fb.setAttribute('aria-expanded', ab); });
  }

  // Galeria com lightbox
  const lb = $('[data-lb]'), gal = $$('[data-gal]');
  if (lb && gal.length) {
    let k = 0;
    const mostra = i => { k = (i + gal.length) % gal.length; $('[data-lb-img]').src = gal[k].dataset.gal; $('[data-lb-img]').alt = gal[k].querySelector('img').alt; $('[data-lb-cont]').textContent = `${k + 1} / ${gal.length}`; };
    gal.forEach((b, i) => b.addEventListener('click', () => { mostra(i); lb.showModal(); }));
    $('[data-lb-fechar]').addEventListener('click', () => lb.close());
    $('[data-lb-ant]').addEventListener('click', () => mostra(k - 1));
    $('[data-lb-prox]').addEventListener('click', () => mostra(k + 1));
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') mostra(k - 1); if (e.key === 'ArrowRight') mostra(k + 1); });
  }

  // Simulador de financiamento (SAC e Price)
  const sim = $('[data-sim]');
  if (sim) {
    const preco = +sim.dataset.preco;
    const calc = () => {
      const ent = +$('[data-ent]', sim).value, meses = +$('[data-prazo]', sim).value, aa = +$('[data-juros]', sim).value / 100;
      const pv = preco * (1 - ent / 100), i = Math.pow(1 + aa, 1 / 12) - 1;
      $('[data-ent-out]', sim).textContent = `${ent}% · ${brl(preco * ent / 100)}`;
      $('[data-prazo-out]', sim).textContent = `${meses} meses (${Math.round(meses / 12)} anos)`;
      $('[data-fin-val]', sim).textContent = brl(pv);
      $('[data-sac]', sim).textContent = brl(pv / meses + pv * i);
      $('[data-price]', sim).textContent = brl(pv * i / (1 - Math.pow(1 + i, -meses)));
    };
    sim.addEventListener('input', calc); calc();
  }
  const al = $('[data-sim-aluguel]');
  if (al) {
    const a = +al.dataset.aluguel, seg = Math.round(a * 0.012);
    $('[data-seguro]', al).textContent = brl(seg);
    $('[data-total]', al).textContent = brl(a + +al.dataset.cond + +al.dataset.iptu + seg);
  }

  // Carrossel
  const car = $('[data-carrossel]');
  $$('[data-car]').forEach(b => b.addEventListener('click', () => car.scrollBy({ left: +b.dataset.car * (car.querySelector('.card').offsetWidth + 24), behavior: 'smooth' })));

  // Prévia de foto ao passar pelos bairros (versão A)
  $$('.bairros-lista [data-bairro]').forEach(a => {
    const on = () => $$('[data-bairro-img]').forEach(im => im.classList.toggle('on', im.dataset.bairroImg === a.dataset.bairro));
    a.addEventListener('mouseenter', on); a.addEventListener('focus', on);
  });

  // Entrada suave das seções
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const alvos = $$('.sec-topo, .grade-cards > .card:not([hidden]), .dest-grade > *, .linha-tempo li, .zigue li, .cat, .porque-lista li, .etapas-anuncio li, .valores > div');
    alvos.forEach(el => el.setAttribute('data-rev', ''));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(el => io.observe(el));
  }
})();
