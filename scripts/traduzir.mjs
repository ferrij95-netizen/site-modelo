// Idioma por dicionário: para clientes cujo design tem os textos escritos direto nas páginas (não em content/),
// o idioma extra é gerado a partir da página já montada no idioma de origem, trocando cada texto pela tradução.
// Ative com `"traduzDe": "pt"` e `"textos": { "texto em pt": "tradução" }` em content/<idioma>.json.
// Texto com letras que não está no dicionário vai para `faltando` (o build falha e lista os textos).
// Nomes próprios que ficam iguais vão em `"iguais": [...]`.

const ATRIBUTOS = /\s(alt|placeholder|aria-label|title|data-label)="([^"]*)"/g;
const META = /(<meta (?:name|property)="(?:description|og:title|og:description|og:image:alt|twitter:title|twitter:description)" content=")([^"]*)(")/g;

export function traduzir(html, { textos, iguais = [], de, para, faltando }) {
  const mesmos = new Set(iguais);
  const t = (txt) => {
    const k = txt.trim().replace(/\s+/g, ' ');
    if (!k || !/[A-Za-zÀ-ú]/.test(k) || mesmos.has(k)) return txt;
    if (k in textos) return txt.replace(txt.trim(), textos[k]);
    faltando.add(k);
    return txt;
  };
  let dentro = null; // <script>, <style> e <svg> ficam como estão
  return html.split(/(<[^>]+>)/).map(parte => {
    if (parte.startsWith('<')) {
      if (parte.startsWith('<!--')) return parte;
      const m = parte.match(/^<\/?(script|style|svg)\b/i);
      if (m && !parte.endsWith('/>')) dentro = parte.startsWith('</') ? null : m[1].toLowerCase();
      if (/^<meta /.test(parte)) return parte.replace(META, (_, a, c, b) => a + t(c) + b);
      if (/^<html /.test(parte)) return parte;
      let tag = parte
        .replace(ATRIBUTOS, (_, nome, val) => ` ${nome}="${t(val)}"`)
        .replace(/(href="https:\/\/(?:wa\.me|api\.whatsapp\.com)\/[^"?]*\?text=)([^"&]*)/, (_, a, q) => a + encodeURIComponent(t(decodeURIComponent(q))));
      // Links internos vão para o mesmo idioma; o seletor de idioma (com hreflang) fica como está.
      if (/^<a\s/.test(tag) && !/\shreflang=/.test(tag)) tag = tag.replace(new RegExp(`href="/${de}(/|")`), `href="/${para}$1`);
      return tag;
    }
    return dentro ? parte : t(parte);
  }).join('');
}
