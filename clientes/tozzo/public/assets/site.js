// Menu, banner das empresas (A), filtro do catálogo, lista de cotação guardada no navegador
// e o formulário de contato que monta o e-mail com a lista.
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn?.addEventListener('click', () => { const a = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!a)); menu.classList.toggle('aberto', !a); });

// banner com uma foto por empresa (versão A)
document.querySelectorAll('[data-slider]').forEach(box => {
  const slides = [...box.querySelectorAll('[data-foto-slide]')], pontos = [...box.querySelectorAll('.slide-pontos button')];
  let i = 0, t;
  const vai = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('on', k === i)); pontos.forEach((p, k) => p.toggleAttribute('aria-current', k === i)); };
  const roda = () => { clearInterval(t); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) t = setInterval(() => vai(i + 1), 5500); };
  pontos.forEach((p, k) => p.addEventListener('click', () => { vai(k); roda(); }));
  box.addEventListener('mouseenter', () => clearInterval(t)); box.addEventListener('mouseleave', roda);
  roda();
});

// lista de cotação
const CHAVE = 'tozzo-cotacao';
const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; } };
const gravar = l => { try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch { /* navegador sem armazenamento: a lista vale só nesta página */ } };
let lista = ler();
const pintar = () => {
  document.querySelectorAll('[data-add]').forEach(b => {
    const on = lista.some(x => x.id === b.dataset.add);
    b.setAttribute('aria-pressed', String(on));
    b.querySelector('.add-txt').textContent = on ? 'Na lista' : 'Cotar';
  });
  document.querySelectorAll('[data-conta-lista]').forEach(el => { el.textContent = lista.length; el.hidden = !lista.length; });
  const flutua = document.querySelector('[data-lista-flutua]');
  if (flutua) flutua.hidden = !lista.length || !document.querySelector('[data-add]');
  const ul = document.querySelector('[data-lista-itens]');
  if (ul) {
    ul.innerHTML = '';
    lista.forEach(x => {
      const li = document.createElement('li');
      li.innerHTML = '<span></span><label>Qtd. <input type="text" inputmode="numeric" size="5"></label><button type="button" aria-label="Tirar da lista">×</button>';
      li.querySelector('span').textContent = x.nome;
      const q = li.querySelector('input'); q.value = x.qtd || ''; q.addEventListener('input', () => { x.qtd = q.value; gravar(lista); });
      li.querySelector('button').addEventListener('click', () => { lista = lista.filter(o => o !== x); gravar(lista); pintar(); });
      ul.append(li);
    });
    document.querySelector('[data-lista-vazia]').hidden = !!lista.length;
  }
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]'); if (!b) return;
  const id = b.dataset.add;
  lista = lista.some(x => x.id === id) ? lista.filter(x => x.id !== id) : [...lista, { id, nome: b.dataset.nome }];
  gravar(lista); pintar();
});
pintar();

// filtro do catálogo: busca por nome e categorias
const campo = document.querySelector('[data-busca-cat]');
if (campo) {
  const chips = [...document.querySelectorAll('[data-chip]')], blocos = [...document.querySelectorAll('[data-bloco]')];
  let cat = '';
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const filtra = () => {
    const q = norm(campo.value); let total = 0;
    blocos.forEach(bl => {
      let n = 0;
      bl.querySelectorAll('.tm').forEach(t => { const ok = (!cat || t.dataset.cat === cat) && (!q || t.dataset.busca.includes(q)); t.hidden = !ok; n += ok; });
      bl.hidden = !n; total += n;
    });
    document.querySelector('[data-vazio]').hidden = !!total;
    chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.chip === cat)));
  };
  chips.forEach(c => c.addEventListener('click', () => { cat = c.dataset.chip; filtra(); }));
  campo.addEventListener('input', filtra);
  const q = new URLSearchParams(location.search).get('q');
  if (q) campo.value = q;
  const h = location.hash.slice(1);
  if (h && chips.some(c => c.dataset.chip === h)) cat = h;
  filtra();
  if (cat) document.querySelector('.cat-corpo')?.scrollIntoView();
}

// formulário: monta o e-mail com a lista de cotação
const form = document.querySelector('[data-form]');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const itens = lista.map(x => `- ${x.nome}${x.qtd ? ` (qtd.: ${x.qtd})` : ''}`);
  const se = (c, ...s) => (c ? s : []);
  const txt = [
    'Pedido de cotação pelo site', '',
    `Nome: ${d.nome}`, ...se(d.empresa, `Empresa: ${d.empresa}`), ...se(d.cnpj, `CNPJ: ${d.cnpj}`), `Telefone: ${d.telefone}`, `E-mail: ${d.email}`, ...se(d.cidade, `Cidade: ${d.cidade}`),
    ...se(itens.length, '', 'Itens:', ...itens),
    ...se(d.mensagem, '', `Mensagem: ${d.mensagem}`),
  ].join('\n');
  location.href = `mailto:contato@grupotozzo.com.br?subject=${encodeURIComponent(`Cotação pelo site: ${d.empresa || d.nome}`)}&body=${encodeURIComponent(txt)}`;
});
