// Impede que os navegadores da linha façam pedidos ao Google quando abrem os sites dos clientes (fontes, mapas, analytics,
// reCAPTCHA, vídeos do YouTube...). A linha só precisa ver a página do cliente; esses pedidos saem do IP do PC e não ajudam em nada.
// Uso: depois de `browser.newContext(...)`, chame `await semGoogle(contexto)`.
// A própria página aberta (navegação principal) nunca é bloqueada: um cliente que tem o site no Google Sites continua abrindo.
const DOMINIOS = [
  'google.com', 'google.com.br', 'g.co', 'gstatic.com', 'googleapis.com', 'googleusercontent.com', 'ggpht.com', 'gvt1.com',
  'googletagmanager.com', 'google-analytics.com', 'googlesyndication.com', 'googleadservices.com', 'doubleclick.net',
  'recaptcha.net', 'youtube.com', 'youtube-nocookie.com', 'ytimg.com',
];

export const ehGoogle = host => { host = String(host || '').toLowerCase(); return DOMINIOS.some(d => host === d || host.endsWith('.' + d)); };

// Bloqueia tudo que é do Google, menos a página principal que estamos abrindo.
export function deveBloquear(url, requisicao) {
  if (!ehGoogle(new URL(url).hostname)) return false;
  const principal = requisicao.isNavigationRequest() && !requisicao.frame().parentFrame();
  return !principal;
}

export async function semGoogle(contexto) {
  await contexto.route(u => ehGoogle(u.hostname), (rota, req) => deveBloquear(req.url(), req) ? rota.abort() : rota.continue());
  return contexto;
}
