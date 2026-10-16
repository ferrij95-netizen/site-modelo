// Menu do celular, cabeçalho ao rolar, frases da capa, filtro cobre/alumínio, fotos da ficha, galeria e formulário por e-mail.
(() => {
  const topo = document.querySelector('.topo');
  const btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', () => btn.setAttribute('aria-expanded', topo.classList.toggle('aberto')));
  const rolar = () => topo.classList.toggle('rolado', scrollY > 40);
  rolar(); addEventListener('scroll', rolar, { passive: true });

  // Frases do carrossel do site atual
  const giro = [...document.querySelectorAll('.giro li')];
  if (giro.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let g = 0;
    setInterval(() => { giro[g].classList.remove('ativo'); g = (g + 1) % giro.length; giro[g].classList.add('ativo'); }, 4500);
  }

  // Filtro por família de liga (produtos "cobre ou alumínio" aparecem nos dois)
  document.querySelectorAll('.filtro').forEach(f => {
    const sec = f.closest('section');
    f.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      f.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      const v = b.dataset.f;
      sec.querySelectorAll('[data-familia]').forEach(el => { el.hidden = !(v === 'todos' || el.dataset.familia === v || el.dataset.familia === 'ambos'); });
    });
  });

  // Fotos da ficha do produto
  const principal = document.querySelector('.fi-principal img');
  document.querySelectorAll('.fi-miniaturas button').forEach(b => b.addEventListener('click', () => {
    principal.src = b.dataset.src;
    document.querySelectorAll('.fi-miniaturas button').forEach(x => x.toggleAttribute('aria-current', x === b));
  }));

  // Formulário: abre o e-mail com a mensagem pronta
  const peca = new URLSearchParams(location.search).get('peca');
  document.querySelectorAll('form.form').forEach(f => {
    if (peca && f.peca) f.peca.value = peca;
    f.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f));
      const corpo = `Nome: ${d.nome}\nEmpresa: ${d.empresa || '-'}\nE-mail: ${d.email}\nTelefone: ${d.fone || '-'}\nPeça ou liga: ${d.peca || '-'}\n\n${d.msg || ''}`;
      location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent('Orçamento pelo site' + (d.peca ? ': ' + d.peca : ''))}&body=${encodeURIComponent(corpo)}`;
    });
  });

  // Galeria em tela cheia
  const itens = [...document.querySelectorAll('.g-item')];
  if (!itens.length) return;
  const cx = document.createElement('div');
  cx.className = 'lightbox'; cx.hidden = true;
  cx.innerHTML = '<button class="lb-x" aria-label="Fechar">×</button><button class="lb-ant" aria-label="Foto anterior">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-prox" aria-label="Próxima foto">›</button>';
  document.body.append(cx);
  let i = 0;
  const img = cx.querySelector('img'), leg = cx.querySelector('figcaption');
  const mostrar = n => { i = (n + itens.length) % itens.length; img.src = itens[i].href; img.alt = leg.textContent = itens[i].dataset.legenda; cx.hidden = false; };
  itens.forEach((a, n) => a.addEventListener('click', e => { e.preventDefault(); mostrar(n); }));
  cx.querySelector('.lb-x').onclick = () => (cx.hidden = true);
  cx.querySelector('.lb-ant').onclick = () => mostrar(i - 1);
  cx.querySelector('.lb-prox').onclick = () => mostrar(i + 1);
  cx.addEventListener('click', e => { if (e.target === cx) cx.hidden = true; });
  addEventListener('keydown', e => { if (cx.hidden) return; if (e.key === 'Escape') cx.hidden = true; if (e.key === 'ArrowLeft') mostrar(i - 1); if (e.key === 'ArrowRight') mostrar(i + 1); });
})();
