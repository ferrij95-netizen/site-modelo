/* Aviso de cookies Loewe — <script src="/cookies.js"> no helmet */
(function () {
  var KEY = 'loewe-cookie-consent';
  if (localStorage.getItem(KEY)) return;
  function mount() {
    if (document.getElementById('loewe-cookies')) return;
    var box = document.createElement('div');
    box.id = 'loewe-cookies';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Aviso de cookies');
    box.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:150;max-width:560px;margin:0 auto;background:#1C1B1A;color:#fff;padding:20px 22px;display:flex;flex-wrap:wrap;align-items:center;gap:14px 20px;box-shadow:0 24px 50px -20px rgba(0,0,0,.6);font-family:"InterVariable",sans-serif;border-top:3px solid #9C0016';
    box.innerHTML =
      '<p style="margin:0;flex:1 1 280px;font-size:14px;line-height:1.6;color:rgba(255,255,255,.85)">Usamos cookies essenciais para o funcionamento do site e, se você permitir, cookies de estatística para entender como ele é usado. <a href="/politica-de-privacidade" style="color:#fff;font-weight:600;text-decoration:underline;text-underline-offset:3px">Saiba mais</a></p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      '<button data-c="essential" style="min-height:44px;padding:0 16px;border:1px solid rgba(255,255,255,.5);background:transparent;color:#fff;font:600 13px/1 inherit;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;font-family:inherit">Só essenciais</button>' +
      '<button data-c="all" style="min-height:44px;padding:0 18px;border:0;background:#9C0016;color:#fff;font:600 13px/1 inherit;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;font-family:inherit">Aceitar</button>' +
      '</div>';
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-c]');
      if (!b) return;
      localStorage.setItem(KEY, JSON.stringify({ choice: b.getAttribute('data-c'), at: new Date().toISOString() }));
      box.remove();
    });
    document.body.appendChild(box);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(mount, 800); });
  else setTimeout(mount, 800);
})();
