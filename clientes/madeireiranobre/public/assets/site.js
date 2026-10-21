// Madeireira Nobre · menu, destaques, abas por etapa, busca de produtos, calculadora e lista de orçamento.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const v = location.pathname.split('/')[1] || 'a';

// menu do celular
$$('.menu-bt').forEach(b => b.addEventListener('click', () => {
  const ab = $('#menu').classList.toggle('aberto');
  b.setAttribute('aria-expanded', ab);
}));

// destaques (versão A)
$$('[data-slides]').forEach(hero => {
  const sl = $$('.slide', hero), pts = $$('.pts button', hero);
  let i = 0, t;
  const vai = n => { sl[i].classList.remove('on'); pts[i].removeAttribute('aria-current'); i = (n + sl.length) % sl.length; sl[i].classList.add('on'); pts[i].setAttribute('aria-current', 'true'); };
  const roda = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => vai(i + 1), 6000); };
  pts.forEach((p, n) => p.addEventListener('click', () => { vai(n); roda(); }));
  roda();
});

// abas por etapa da obra (versão B)
$$('[data-abas]').forEach(box => {
  const tabs = $$('[role=tab]', box);
  tabs.forEach(tb => tb.addEventListener('click', () => {
    tabs.forEach(o => { o.setAttribute('aria-selected', o === tb); document.getElementById(o.getAttribute('aria-controls')).hidden = o !== tb; });
  }));
});

// busca de produtos (?q= na página de produtos)
$$('[data-busca]').forEach(box => {
  const campo = $('input', box), itens = $$('[data-txt]', box.closest('main') || document), vazio = $('[data-vazio]');
  const filtra = () => {
    const q = campo.value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
    let n = 0;
    itens.forEach(el => { const ok = !q || el.dataset.txt.includes(q); el.hidden = !ok; n += ok; });
    if (vazio) vazio.hidden = n > 0;
  };
  campo.addEventListener('input', filtra);
  const q = new URLSearchParams(location.search).get('q'); if (q) { campo.value = q; filtra(); }
});

// ---------- lista de orçamento (fica no navegador) ----------
const CH = 'nobre-orcamento';
const lista = () => { try { return JSON.parse(localStorage.getItem(CH)) || []; } catch { return []; } };
const salva = l => { try { localStorage.setItem(CH, JSON.stringify(l)); } catch {} conta(); };
const conta = () => $$('.orc-n').forEach(n => { const q = lista().length; n.textContent = q; n.hidden = !q; });
let toastT;
const avisa = txt => {
  let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.innerHTML = `<span>${txt}</span><a href="/${v}/contato/#orcamento">Ver lista</a>`; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3500);
};
const adiciona = (item, qtd = '') => {
  const l = lista(), achou = l.find(x => x.item === item);
  if (achou) { if (qtd) achou.qtd = qtd; } else l.push({ item, qtd });
  salva(l); avisa(`Adicionado: ${item}`);
};
conta();
$$('[data-add]').forEach(b => b.addEventListener('click', () => {
  const sel = b.closest('[data-produto]')?.querySelector('select');
  adiciona(sel && sel.value ? `${b.dataset.add} · ${sel.value}` : b.dataset.add);
  b.classList.add('ok');
}));

// formulário de orçamento: lista com quantidades, envia por WhatsApp ou e-mail
$$('[data-orc]').forEach(f => {
  const box = $('[data-orc-lista]', f), ul = $('ul', box);
  const desenha = () => {
    const l = lista(); box.hidden = !l.length;
    ul.innerHTML = l.map((x, i) => `<li><span>${x.item.replace(/</g, '&lt;')}</span><label><span class="sr">Quantidade</span><input inputmode="numeric" placeholder="Qtd." value="${(x.qtd || '').replace(/"/g, '')}" data-q="${i}"></label><button type="button" data-i="${i}" aria-label="Remover ${x.item.replace(/"/g, '')}">×</button></li>`).join('');
  };
  ul.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (!b) return; const l = lista(); l.splice(+b.dataset.i, 1); salva(l); desenha(); });
  ul.addEventListener('input', e => { const q = e.target.closest('[data-q]'); if (!q) return; const l = lista(); l[+q.dataset.q].qtd = q.value; salva(l); });
  $('[data-orc-limpa]', f).addEventListener('click', () => { salva([]); desenha(); });
  desenha();
  const texto = () => {
    const d = new FormData(f), l = lista();
    const linhas = [f.dataset.assunto];
    for (const [k, val] of d) if (String(val).trim()) linhas.push(`${k}: ${val}`);
    if (l.length) linhas.push('', 'Itens:', ...l.map(x => `- ${x.item}${x.qtd ? ` (qtd. ${x.qtd})` : ''}`));
    return linhas.join('\n');
  };
  f.addEventListener('submit', e => { e.preventDefault(); location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(texto())}`; });
  $('[data-wa]', f).addEventListener('click', ev => { if (!f.reportValidity()) return; open(`https://wa.me/${ev.currentTarget.dataset.wa}?text=${encodeURIComponent(texto())}`, '_blank'); });
});

// ---------- calculadora (usa as medidas que estão nas fichas do site atual) ----------
$$('[data-calc]').forEach(f => {
  const num = k => { const x = parseFloat(String(f.elements[k]?.value || '').replace(',', '.')); return isFinite(x) && x > 0 ? x : 0; };
  const fmt = x => x.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  let resumo = '';
  const calcula = () => {
    const tipo = f.elements.tipo.value;
    $$('[data-so]', f).forEach(el => el.hidden = !el.dataset.so.split(' ').includes(tipo));
    const out = $('[data-res]', f), env = $('[data-calc-env]', f);
    let r = null;
    if (tipo === 'ondulada') {
      const larg = num('larg'), agua = num('agua'), comp = parseFloat(f.elements.comp.value), rec = 0.14;
      if (larg && agua) {
        const col = Math.ceil(larg / 1.05), fil = agua <= comp ? 1 : 1 + Math.ceil((agua - comp) / (comp - rec)), aguas = +f.elements.aguas.value;
        const n = col * fil * aguas;
        r = { n: `${n} telhas`, det: `${col} por fileira × ${fil} fileira${fil > 1 ? 's' : ''}${aguas > 1 ? ' × 2 águas' : ''}, telha de ${fmt(comp)} m, largura útil 1,05 m`, extra: `Parafusos: cerca de ${n * 2} (2 por telha)` };
        resumo = `Telha ondulada 6 mm de ${fmt(comp)} m: ${n} un. (telhado ${fmt(larg)} m × ${fmt(agua)} m${aguas > 1 ? ', 2 águas' : ''})`;
      }
    } else if (tipo === 'concreto') {
      const a = num('area');
      if (a) { const n = Math.ceil(a * 10.5 * 1.05); r = { n: `${n} telhas`, det: `${fmt(a)} m² × 10,5 telhas por m², com 5% de sobra`, extra: '' }; resumo = `Telha de concreto Coppo Veneto: ${n} un. (${fmt(a)} m²)`; }
    } else {
      const a = num('area');
      if (a) { const n = Math.ceil(a / 2.42); r = { n: `${n} chapas`, det: `${fmt(a)} m² ÷ 2,42 m² por chapa (1,10 × 2,20 m)`, extra: '' }; resumo = `Compensado / madeirite ${f.elements.chapa.value}: ${n} chapas (${fmt(a)} m²)`; }
    }
    out.innerHTML = r ? `<b>${r.n}</b><span>${r.det}</span>${r.extra ? `<span>${r.extra}</span>` : ''}` : '<b>—</b><span>Preencha as medidas para ver a estimativa.</span>';
    env.disabled = !r; if (!r) resumo = '';
  };
  f.addEventListener('input', calcula); f.addEventListener('change', calcula);
  const h = location.hash.slice(1); if (['ondulada', 'concreto', 'compensado'].includes(h)) f.elements.tipo.value = h;
  calcula();
  $('[data-calc-env]', f).addEventListener('click', () => { if (resumo) { adiciona(resumo); location.href = `/${v}/contato/#orcamento`; } });
});
