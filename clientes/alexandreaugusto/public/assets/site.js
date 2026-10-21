// Alexandre Augusto Imóveis: menu, abas, busca da listagem, galeria, simulador e formulários que abrem o WhatsApp.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const WHATS = '5511952030378';
  const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const numero = s => Number(String(s || '').replace(/[^\d,]/g, '').replace(',', '.')) || 0;

  // Menu do celular
  const btn = $('.menu-btn'), menu = $('#menu');
  btn?.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
  });

  // Abas (destaques venda/aluguel)
  $$('[data-abas]').forEach(box => {
    const abas = $$('[data-aba]', box);
    abas.forEach(a => a.addEventListener('click', () => {
      abas.forEach(x => x.setAttribute('aria-selected', x === a));
      $$('[data-painel]', box).forEach(p => { p.hidden = p.dataset.painel !== a.dataset.aba; });
    }));
  });

  // Listagem: filtros lidos da URL (vindo da busca da home) e aplicados nos cards
  const form = $('[data-filtros]'), lista = $('[data-lista]');
  if (form && lista) {
    const cards = $$('.im-card', lista);
    const params = new URLSearchParams(location.search);
    for (const [k, v] of params) {
      const campo = form.elements[k];
      if (!campo) continue;
      if (campo instanceof RadioNodeList) [...campo].forEach(r => { r.checked = r.value === v; });
      else campo.value = v;
    }
    const titulo = $('[data-titulo-lista]'), conta = $('[data-conta]'), contaTxt = $('[data-conta-txt]'), vazio = $('[data-vazio]');
    const aplicar = (gravar = true) => {
      const f = Object.fromEntries(new FormData(form));
      const max = numero(f.max), q = Number(f.quartos) || 0, cod = (f.codigo || '').trim().toLowerCase();
      let n = 0;
      cards.forEach(c => {
        const d = c.dataset;
        const ok = (!f.negocio || d.negocio === f.negocio) && (!f.tipo || d.cat === f.tipo) && (!f.bairro || d.bairro === f.bairro)
          && (!max || Number(d.preco) <= max) && (!q || Number(d.quartos) >= q) && (!cod || d.cod.includes(cod));
        c.hidden = !ok; if (ok) n++;
      });
      const ord = { menor: (a, b) => a.dataset.preco - b.dataset.preco, maior: (a, b) => b.dataset.preco - a.dataset.preco, area: (a, b) => b.dataset.area - a.dataset.area }[f.ordem]
        || ((a, b) => b.dataset.id - a.dataset.id);
      cards.slice().sort(ord).forEach(c => lista.appendChild(c));
      conta.textContent = n;
      contaTxt.textContent = n === 1 ? 'imóvel encontrado' : 'imóveis encontrados';
      titulo.textContent = f.negocio === 'venda' ? 'Imóveis à venda' : f.negocio === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda e para alugar';
      vazio.hidden = n > 0;
      $$('#menu a').forEach(a => {
        const m = a.getAttribute('href').match(/negocio=(\w+)/);
        if (m) m[1] === f.negocio ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
      });
      if (gravar) {
        const p = new URLSearchParams(Object.entries(f).filter(([, v]) => v));
        history.replaceState(null, '', p.toString() ? `?${p}` : location.pathname);
      }
    };
    form.addEventListener('input', () => aplicar());
    form.addEventListener('change', () => aplicar());
    form.addEventListener('submit', e => { e.preventDefault(); aplicar(); });
    form.addEventListener('reset', () => setTimeout(() => aplicar()));
    aplicar(false);
  }

  // Galeria da ficha + tela cheia
  const gal = $('[data-galeria]');
  if (gal) {
    const lb = $('[data-lightbox]');
    const fotos = JSON.parse($('[data-fotos]', lb).textContent);
    const img = $('[data-gal-img]', gal), lbImg = $('[data-lb-img]', lb), lbConta = $('[data-lb-conta]', lb);
    let atual = 0;
    const ir = k => {
      atual = (k + fotos.length) % fotos.length;
      img.src = fotos[atual];
      img.parentElement.style.setProperty('--f', `url(${fotos[atual]})`);
      $$('[data-gal-ir]', gal).forEach(b => b.setAttribute('aria-current', Number(b.dataset.galIr) === atual));
      lbImg.src = fotos[atual];
      lbConta.textContent = `${atual + 1} de ${fotos.length}`;
    };
    $$('[data-gal-ir]', gal).forEach(b => b.addEventListener('click', () => ir(Number(b.dataset.galIr))));
    $('[data-gal-abrir]', gal).addEventListener('click', () => { ir(atual); lb.showModal(); });
    $('[data-lb-fechar]', lb).addEventListener('click', () => lb.close());
    $('[data-lb-ant]', lb).addEventListener('click', () => ir(atual - 1));
    $('[data-lb-prox]', lb).addEventListener('click', () => ir(atual + 1));
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') ir(atual - 1); if (e.key === 'ArrowRight') ir(atual + 1); });
    if (fotos.length < 2) $$('.lb-nav', lb).forEach(b => b.hidden = true);
  }

  // Simulador SAC e Price
  $$('[data-sim]').forEach(sim => {
    const calc = () => {
      const valor = numero(sim.valor.value), entrada = numero(sim.entrada.value);
      const n = Number(sim.anos.value) * 12, i = Math.pow(1 + numero(sim.juros.value) / 100, 1 / 12) - 1;
      const fin = Math.max(valor - entrada, 0);
      const price = i ? fin * i / (1 - Math.pow(1 + i, -n)) : fin / n;
      const sac = fin / n + fin * i;
      $('[data-fin]', sim).textContent = brl(fin);
      $('[data-price]', sim).textContent = fin ? brl(price) : '—';
      $('[data-sac]', sim).textContent = fin ? brl(sac) : '—';
      $('[data-sim-zap]', sim).href = `https://wa.me/${WHATS}?text=${encodeURIComponent(`Olá! Quero uma simulação de financiamento: imóvel de ${brl(valor)}, entrada de ${brl(entrada)}, em ${sim.anos.value} anos.`)}`;
    };
    sim.addEventListener('input', calc);
    sim.addEventListener('submit', e => e.preventDefault());
    calc();
  });

  // Formulários: montam a mensagem e abrem o WhatsApp da imobiliária
  $$('form[data-zap]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [f.dataset.zapMsg || 'Olá!'];
    for (const [k, v] of new FormData(f)) if (String(v).trim()) linhas.push(`${k}: ${String(v).trim()}`);
    window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
  }));
})();
