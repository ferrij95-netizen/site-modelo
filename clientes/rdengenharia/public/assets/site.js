// RD Engenharia Elétrica · menu do celular, slideshow da versão A e formulário por e-mail
(() => {
  const topo = document.querySelector('.topo');
  const botao = document.querySelector('.abre-menu');
  if (botao && topo) botao.addEventListener('click', () => {
    const aberto = topo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  // slideshow: troca sozinho a cada 5 s, pausa com o mouse em cima, setas e deslize no celular
  const show = document.querySelector('[data-show]');
  if (show) {
    const quadros = [...show.querySelectorAll('.slide')];
    const cont = show.querySelector('.show-cont b');
    let i = 0, timer;
    const ir = n => {
      quadros[i].classList.remove('ativo');
      i = (n + quadros.length) % quadros.length;
      quadros[i].classList.add('ativo');
      cont.textContent = String(i + 1).padStart(2, '0');
    };
    const roda = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(i + 1), 5000); };
    show.querySelector('.show-prox').addEventListener('click', () => { ir(i + 1); roda(); });
    show.querySelector('.show-ant').addEventListener('click', () => { ir(i - 1); roda(); });
    show.addEventListener('mouseenter', () => clearInterval(timer));
    show.addEventListener('mouseleave', roda);
    let x0 = null;
    show.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    show.addEventListener('touchend', e => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 40) { ir(i + (d < 0 ? 1 : -1)); roda(); } x0 = null; });
    roda();
  }

  // formulário: monta o e-mail e abre no programa de e-mail do visitante
  document.querySelectorAll('form[data-mailto]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const corpo = `Nome: ${d.get('nome')}\nEmpresa: ${d.get('empresa') || '-'}\nE-mail: ${d.get('email')}\nTelefone: ${d.get('telefone') || '-'}\n\n${d.get('mensagem')}`;
    location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent('Contato pelo site: ' + d.get('assunto'))}&body=${encodeURIComponent(corpo)}`;
  }));
})();
