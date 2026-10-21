// Pizzinatto · menu, destaques, abas, telha sanduíche, filtro de obras, lista de orçamento, "Monte o seu produto" e calculadora.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const v = location.pathname.split('/')[1] || 'a';

// menu do celular
$$('.menu-bt').forEach(b => b.addEventListener('click', () => {
  const m = document.getElementById('menu'); const ab = m.classList.toggle('aberto');
  b.setAttribute('aria-expanded', ab);
}));

// destaques da home A
const hero = $('[data-slides]');
if (hero) {
  const sl = $$('.a-slide', hero), pts = $$('.a-hero-pts button', hero);
  let i = 0, t;
  const vai = n => { sl[i].classList.remove('on'); pts[i].removeAttribute('aria-selected'); i = (n + sl.length) % sl.length; sl[i].classList.add('on'); pts[i].setAttribute('aria-selected', 'true'); };
  const roda = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => vai(i + 1), 6500); };
  pts.forEach((p, n) => p.addEventListener('click', () => { vai(n); roda(); }));
  roda();
}

// abas "Qual é a sua obra?"
$$('[data-abas]').forEach(box => {
  const tabs = $$('[role=tab]', box);
  tabs.forEach(tb => tb.addEventListener('click', () => {
    tabs.forEach(o => { o.setAttribute('aria-selected', o === tb); document.getElementById(o.getAttribute('aria-controls')).hidden = o !== tb; });
  }));
});

// telha sanduíche
$$('[data-sand]').forEach(box => {
  const up = () => {
    const r = $('input[name=sand-r]:checked', box).value, a = $('input[name=sand-a]:checked', box).value;
    $$('[data-r]', box).forEach(el => el.hidden = el.dataset.r !== r);
    $$('[data-a]', box).forEach(el => el.hidden = el.dataset.a !== a);
  };
  box.addEventListener('change', up);
});

// vídeo institucional (só carrega o YouTube no clique)
$$('[data-video]').forEach(b => b.addEventListener('click', () => {
  b.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.video}?autoplay=1" title="Vídeo institucional Pizzinatto" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}, { once: true }));

// filtro de obras
$$('[data-filtro]').forEach(box => {
  const bts = $$('.filtro button', box), itens = $$('.galeria li', box);
  bts.forEach(b => b.addEventListener('click', () => {
    bts.forEach(o => o.setAttribute('aria-pressed', o === b));
    itens.forEach(li => li.hidden = b.dataset.cat && li.dataset.cat !== b.dataset.cat);
  }));
});

// ---------- lista de orçamento (fica no navegador) ----------
const CH = 'pizzinatto-orcamento';
const lista = () => { try { return JSON.parse(localStorage.getItem(CH)) || []; } catch { return []; } };
const salva = l => { try { localStorage.setItem(CH, JSON.stringify(l)); } catch {} conta(); };
const conta = () => $$('.orc-n').forEach(n => { const q = lista().length; n.textContent = q; n.hidden = !q; });
let toastT;
const avisa = txt => {
  let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.innerHTML = `${txt}<a href="/${v}/contato/#orcamento">Ver lista</a>`; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3500);
};
const adiciona = item => { const l = lista(); if (!l.includes(item)) l.push(item); salva(l); avisa(`Adicionado: ${item.split('\n')[0]}`); };
conta();
$$('.add[data-item]').forEach(b => b.addEventListener('click', () => { adiciona(b.dataset.item); b.classList.add('ok'); }));

// Monte o seu produto
$$('[data-monte]').forEach(f => {
  const tipo = $('[data-tipo]', f);
  const texto = () => {
    const d = Object.fromEntries(new FormData(f)), termo = d.tipo === 'Telha termoacústica';
    const partes = [`${termo ? 'Telha termoacústica' : 'Telha'} ${d.modelo}`, termo && `${d.recheio} ${d['esp-recheio']}`, termo && `inferior ${d.inferior.toLowerCase()}`, `aço ${d.aco.toLowerCase()} ${d.esp}`, d.cor, d.comp && `peças de ${d.comp} m`, d.qtd && `qtd. ${d.qtd}`];
    return partes.filter(Boolean).join(' · ');
  };
  const up = () => { $$('[data-so-termo]', f).forEach(el => el.hidden = tipo.value !== 'Telha termoacústica'); $('[data-monte-res]', f).textContent = texto(); };
  f.addEventListener('change', up); f.addEventListener('input', up); up();
  f.addEventListener('submit', e => { e.preventDefault(); adiciona(texto()); });
});

// formulário de orçamento: mostra a lista, envia por e-mail ou WhatsApp
$$('[data-orc]').forEach(f => {
  const box = $('[data-orc-lista]', f), ul = $('ul', box), itens = $('textarea[name=Itens]', f);
  const desenha = () => {
    const l = lista(); box.hidden = !l.length;
    ul.innerHTML = l.map((x, i) => `<li><span>${x.replace(/</g, '&lt;').replace(/\n/g, '<br>')}</span><button type="button" data-i="${i}" aria-label="Remover">remover</button></li>`).join('');
    if (l.length && !itens.value.trim()) itens.value = l.join('\n');
  };
  ul.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (!b) return; const l = lista(); l.splice(+b.dataset.i, 1); salva(l); itens.value = l.join('\n'); desenha(); });
  $('[data-orc-limpa]', f).addEventListener('click', () => { salva([]); itens.value = ''; desenha(); });
  desenha();
  const linhas = () => [...new FormData(f)].filter(([, val]) => String(val).trim()).map(([k, val]) => `${k}: ${val}`);
  f.addEventListener('submit', e => { e.preventDefault(); location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas().join('\n'))}`; });
  $('[data-wa]', f).addEventListener('click', ev => { if (!f.reportValidity()) return; open(`https://wa.me/${ev.currentTarget.dataset.wa}?text=${encodeURIComponent(`${f.dataset.assunto}\n${linhas().join('\n')}`)}`, '_blank'); });
});

// ---------- calculadora (mesmas fórmulas do "Calcule a sua obra" do site atual) ----------
$$('[data-calc]').forEach(f => {
  const rot = {
    uma: ['Largura (X)', 'Comprimento (Y), sentido da caída'],
    duas: ['Largura (X), sentido da caída', 'Comprimento (Y)'],
    shed: ['Largura (X)', 'Comprimento (Y), sentido da caída'],
    arco: ['Largura (X)', 'Comprimento (Y)'],
  };
  const n = k => { const x = parseFloat(String(f.elements[k]?.value || '').replace(',', '.')); return isFinite(x) && x > 0 ? x : 0; };
  const fmt = (x, u) => `${x.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} ${u}`;
  let resumo = '';
  const calcula = () => {
    const tipo = f.elements.tipo.value;
    $('[data-rot-x]', f).textContent = rot[tipo][0]; $('[data-rot-y]', f).textContent = rot[tipo][1];
    $$('[data-ex]', f).forEach(i => i.hidden = i.dataset.ex !== tipo);
    $('[data-so-shed]', f).hidden = tipo !== 'shed';
    $('[data-so-d]', f).hidden = !(tipo === 'shed' || tipo === 'arco');
    const termo = f.elements.telha.value === 'Telha termoacústica';
    $('[data-so-termo]', f).hidden = !termo;
    const X = n('x'), Y = n('y'), q = Math.max(1, Math.round(n('q')) || 1), h = n('h');
    const lados = n('a') + n('b') + n('c') + (tipo === 'shed' || tipo === 'arco' ? n('d') : 0);
    const dl = $('[data-res]', f), env = $('[data-calc-env]', f);
    if (!X || !Y) { dl.innerHTML = '<div><dt>Telhas da cobertura</dt><dd>—</dd></div>'; env.disabled = true; resumo = ''; return; }
    const base = Math.round(X * Y / 0.98 * 1.1);
    const T = tipo === 'duas' ? base * 2 : tipo === 'shed' ? Math.round(X * Y * q / 0.98 * 1.1) : base;
    const L = Math.round(lados * h / 0.98);
    const calhas = f.elements.calhas.value === 'Sim';
    const r = [['Telhas da cobertura', fmt(T, 'm²')]];
    if (L) r.push(['Telhas do fechamento lateral', fmt(L, 'm²')]);
    if (tipo === 'duas') r.push(['Cumeeiras', fmt(Math.round(X), 'm')]);
    if (tipo === 'shed') r.push(['Cumeeiras shed', fmt(Math.round(X * q), 'm')]);
    r.push(['Parafusos de fixação', fmt(Math.ceil((T + L) * 2.5), 'un.')], ['Parafusos de costura', fmt(Math.ceil((T + L) * 1.5), 'un.')]);
    r.push(['Fechamento de onda', fmt(Math.ceil(tipo === 'uma' ? X : tipo === 'shed' ? q * X : 2 * X), 'un.')], ['Fita vedadora', fmt(T, 'm')]);
    if (calhas) {
      r.push(['Calhas', fmt(tipo === 'uma' ? X : tipo === 'shed' ? X * q : X * 2, 'm')]);
      if (tipo === 'uma') r.push(['Rufos', fmt(X * 4, 'm')]);
      if (tipo === 'duas') r.push(['Rufos', fmt(X + Y * 2, 'm')]);
    }
    dl.innerHTML = r.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
    env.disabled = false;
    const nome = $(`input[name=tipo][value=${tipo}]`, f).parentElement.textContent.trim();
    const telha = termo ? `Telha termoacústica (${f.elements.recheio.value})` : 'Telha simples';
    resumo = `Calcule a sua obra · cobertura ${nome.toLowerCase()} ${fmt(X, 'm')} × ${fmt(Y, 'm')}${tipo === 'shed' ? `, ${q} sheds` : ''}\n${telha}; fechamento lateral: ${f.elements.lateral.value.toLowerCase()}\n` + r.map(([a, b]) => `${a}: ${b}`).join('; ');
  };
  f.addEventListener('input', calcula); f.addEventListener('change', calcula);
  const hash = location.hash.slice(1); if (rot[hash]) f.elements.tipo.value = hash;
  calcula();
  $('[data-calc-env]', f).addEventListener('click', () => { if (resumo) { adiciona(resumo); location.href = `/${v}/contato/#orcamento`; } });
});
