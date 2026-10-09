// Service worker do app Overtus Hub (instalável no PC). Não guarda nada em cache: o hub é privado e
// sempre vem atualizado do servidor. Só mostra um aviso quando a internet cai.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Overtus Hub</title>' +
    '<body style="margin:0;height:100vh;display:grid;place-items:center;background:#f4f4f1;color:#16181b;font:16px system-ui,sans-serif;text-align:center">' +
    '<div><p style="font-size:20px;font-weight:600;margin:0 0 6px">Sem conexão com a internet</p>' +
    '<p style="color:#6b7079;margin:0 0 18px">O hub abre assim que a conexão voltar.</p>' +
    '<button onclick="location.reload()" style="font:inherit;font-weight:600;padding:8px 16px;border-radius:8px;border:0;background:#182644;color:#fff;cursor:pointer">Tentar de novo</button></div>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
