// Menu do celular, abas "o que a sua retífica precisa usinar?" (versão B) e formulário que monta o e-mail
// (o ?maquina= dos botões "Pedir orçamento" já escolhe o equipamento).
const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];

const btn = $('.menu-btn'), menu = $('#menu');
btn?.addEventListener('click', () => {
  const aberto = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!aberto));
  menu.classList.toggle('aberto', !aberto);
});

// abas
const abas = $$('[role="tab"]');
const ativa = a => {
  abas.forEach(o => { const on = o === a; o.setAttribute('aria-selected', String(on)); o.tabIndex = on ? 0 : -1; $('#' + o.getAttribute('aria-controls')).hidden = !on; });
};
abas.forEach((a, i) => {
  a.tabIndex = i ? -1 : 0;
  a.addEventListener('click', () => ativa(a));
  a.addEventListener('keydown', e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const n = abas[(i + d + abas.length) % abas.length]; ativa(n); n.focus();
  });
});

// formulário
const f = $('form[data-mailto]');
if (f) {
  const q = new URLSearchParams(location.search), sel = $('[data-maquina]', f);
  if (q.get('maquina') && sel) sel.value = q.get('maquina');
  f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [...f.elements].filter(el => el.name && el.value.trim()).map(el => `${el.name}: ${el.tagName === 'SELECT' ? el.options[el.selectedIndex].text : el.value}`);
    location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.assunto)}&body=${encodeURIComponent(linhas.join('\n'))}`;
  });
}
