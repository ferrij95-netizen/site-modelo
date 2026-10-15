// Menu do celular, cabeçalho que muda ao rolar sobre a capa e galeria em tela cheia.
(() => {
  const topo = document.querySelector('.topo');
  const btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', () => {
    const aberto = topo.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
  });
  const rolar = () => topo.classList.toggle('rolado', scrollY > 40);
  rolar(); addEventListener('scroll', rolar, { passive: true });

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
