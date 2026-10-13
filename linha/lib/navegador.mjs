// O que prints.mjs e buscar.mjs têm em comum: um navegador só, os endereços a tentar e o erro em português.
import sharp from 'sharp';

export const UA_PC = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
export const UA_CEL = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

// Endereços a tentar, na ordem: como veio, outro protocolo, com/sem www (sites antigos só abrem de um jeito).
export function candidatos(site) {
  const base = site.startsWith('http') ? site : 'http://' + site;
  let u; try { u = new URL(base); } catch { return []; }
  const lista = [u.href];
  const outro = new URL(u.href); outro.protocol = u.protocol === 'https:' ? 'http:' : 'https:'; lista.push(outro.href);
  const www = new URL(u.href); www.hostname = u.hostname.startsWith('www.') ? u.hostname.slice(4) : 'www.' + u.hostname; lista.push(www.href);
  const www2 = new URL(outro.href); www2.hostname = www.hostname; lista.push(www2.href);
  return [...new Set(lista)];
}

export function erroLegivel(e) {
  const m = String(e?.message || e);
  if (/ERR_NAME_NOT_RESOLVED/.test(m)) return 'O endereço não existe mais (domínio não encontrado)';
  if (/ERR_CONNECTION_REFUSED|ERR_CONNECTION_RESET|ERR_CONNECTION_CLOSED|ERR_EMPTY_RESPONSE/.test(m)) return 'O servidor recusou ou derrubou a conexão';
  if (/ERR_CONNECTION_TIMED_OUT|Timeout/.test(m)) return 'Demorou mais de 30 segundos para abrir';
  if (/ERR_TOO_MANY_REDIRECTS/.test(m)) return 'O site entra em loop de redirecionamento';
  if (/^HTTP (\d+)/.test(m)) return 'O site responde com erro ' + m.match(/^HTTP (\d+)/)[1];
  return m.split('\n')[0].replace(/^page\.goto: /, '').slice(0, 140);
}

let navegador = null;
// Um único navegador para todos os trabalhadores (guarda a promessa, senão cada um abriria o seu).
export function abrirNavegador() {
  navegador ??= (async () => {
    const { chromium } = await import('playwright');
    const opc = { args: ['--ignore-certificate-errors'] };
    if (process.env.CHROME) opc.executablePath = process.env.CHROME;
    if (process.env.LINHA_PROXY) opc.proxy = { server: process.env.LINHA_PROXY };
    return chromium.launch(opc);
  })();
  return navegador;
}
// Nada da captura fala com o Google a partir do IP do PC (o João teve erro 403 no Google em 13/10/2026):
// fontes, analytics, tag manager, reCAPTCHA, mapas e vídeos do YouTube embutidos nas páginas dos clientes são bloqueados.
export const GOOGLE = /^https?:\/\/([^/]*\.)?(google|googleapis|gstatic|googletagmanager|google-analytics|googlesyndication|googleadservices|doubleclick|youtube|youtube-nocookie|ytimg|recaptcha)\.[a-z.]+(\/|$)/i;
export async function semGoogle(ctx) { await ctx.route(GOOGLE, r => r.abort()); return ctx; }

export async function fecharNavegador() { if (navegador) await (await navegador).close(); navegador = null; }

export async function abrirPagina(pg, site) {
  let primeiro;
  for (const [n, url] of candidatos(site).entries()) {
    try {
      // A primeira tentativa espera até 30 s; as alternativas (outro protocolo, com/sem www) só 12 s.
      const r = await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: n === 0 ? 30000 : 12000 });
      if (r && r.status() >= 400) { primeiro ??= new Error('HTTP ' + r.status()); continue; }
      return r;
    } catch (e) { primeiro ??= e; }
  }
  // O erro que vale é o do endereço como veio na lista (os outros foram só tentativas).
  throw primeiro || new Error('endereço inválido');
}

export const reduzir = (buf, largura, qualidade) => sharp(buf).resize({ width: largura, withoutEnlargement: true }).jpeg({ quality: qualidade, mozjpeg: true }).toBuffer();
