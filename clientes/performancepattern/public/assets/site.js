// Performance Pattern · comportamento comum às versões A e B (menu no celular, revelar ao rolar, contagem dos números).
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  var abrir = document.querySelector('.abrir');
  var menu = document.getElementById('menu');
  if (abrir && menu) {
    abrir.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      abrir.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  var semMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function contar(el) {
    var alvo = parseInt(el.getAttribute('data-count'), 10);
    if (!alvo || semMovimento) return;
    var texto = el.textContent;
    var inicio = null;
    var dur = 1400;
    function passo(t) {
      if (inicio === null) inicio = t;
      var p = Math.min((t - inicio) / dur, 1);
      var v = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(passo);
      else el.textContent = texto;
    }
    requestAnimationFrame(passo);
  }

  var itens = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || semMovimento) {
    itens.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      e.target.querySelectorAll('[data-count]').forEach(contar);
      if (e.target.matches('[data-count]')) contar(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  itens.forEach(function (el) { obs.observe(el); });
})();
