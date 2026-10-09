// Versão em inglês: pega o HTML em português já gerado e troca cada texto pela tradução de `en.mjs`.
// O site atual da Instor tem PT e EN (bandeiras no topo), então o novo também tem.
// Texto sem tradução faz o gerar.mjs falhar, para nenhuma página sair meio em português.
import { en, iguais } from './en.mjs';

const ATRIBUTOS = /\s(alt|placeholder|aria-label|title)="([^"]*)"/g;
const META = /(<meta (?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)" content=")([^"]*)(")/g;

export function traduzir(html, versao, faltando) {
  const t = (txt) => {
    const k = txt.trim();
    if (!k || !/[A-Za-zÀ-ú]/.test(k) || iguais.has(k)) return txt;
    if (k in en) return txt.replace(k, en[k]);
    faltando.add(k);
    return txt;
  };
  let dentro = null; // não traduz <script> nem <style>
  html = html.split(/(<[^>]+>)/).map(parte => {
    if (parte.startsWith('<')) {
      const m = parte.match(/^<\/?(script|style)\b/i);
      if (m) dentro = parte.startsWith('</') ? null : m[1].toLowerCase();
      if (/^<meta /.test(parte)) return parte.replace(META, (_, a, c, b) => a + t(c) + b);
      return parte
        .replace(ATRIBUTOS, (m0, nome, val) => ` ${nome}="${t(val)}"`)
        .replace(/(href="https:\/\/wa\.me\/\d+\?text=)([^"]*)"/, (_, a, q) => a + encodeURIComponent(t(decodeURIComponent(q))) + '"');
    }
    return dentro ? parte : t(parte);
  }).join('');
  return html
    .replace('<html lang="pt-BR">', '<html lang="en">')
    .replace('content="pt_BR"', 'content="en_US"')
    .replaceAll(`href="/${versao}/`, `href="/${versao}/en/`)
    .replaceAll(`.overtus.com.br/${versao}/`, `.overtus.com.br/${versao}/en/`);
}
