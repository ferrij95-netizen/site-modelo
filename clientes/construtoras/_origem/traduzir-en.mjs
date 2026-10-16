// Gera industrias.overtus.com.br/en/ traduzindo as páginas em português já geradas (public/a e public/b) com industrias-en.mjs.
// Roda no fim de gerar.mjs. Falha se algum texto visível ficar sem tradução, para nada sair em português na versão em inglês.
import fs from 'node:fs';
import path from 'node:path';
import { textos, iguais } from './industrias-en.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../../industrias/public');
const DOMINIO = 'https://industrias.overtus.com.br';
const tem = s => /[A-Za-zÀ-ú]/.test(s);
const des = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const enc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const faltando = new Set();

function traduz(bruto) {
  const t = des(bruto).replace(/\s+/g, ' ').trim();
  if (!t || !tem(t) || iguais.includes(t)) return null;
  if (t in textos) return textos[t];
  faltando.add(t);
  return null;
}

// Metas cujo "content" é texto para traduzir; os outros (url, imagem, cores) ficam como estão.
const META_TEXTO = /(name|property)="(description|og:title|og:description|twitter:title|twitter:description)"/;

function traduzTag(tag) {
  return tag.replace(/(\s(alt|title|aria-label|placeholder|content)=")([^"]*)"/g, (m, ini, attr, val) => {
    if (attr === 'content' && !META_TEXTO.test(tag)) return m;
    const tr = traduz(val);
    return tr == null ? m : `${ini}${enc(tr)}"`;
  });
}

function traduzHTML(html, v) {
  const partes = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/);
  let out = partes.map((p, i) => {
    if (i % 2) return p.startsWith('<script') || p.startsWith('<style') ? p : traduzTag(p);
    const tr = traduz(p);
    if (tr == null) return p;
    const [, a, z] = p.match(/^(\s*)[\s\S]*?(\s*)$/);
    return a + enc(tr) + z;
  }).join('');
  out = out
    .replace('<html lang="pt-BR">', '<html lang="en">')
    .replace('content="pt_BR"', 'content="en_US"')
    .replace(/href="\/([ab])\//g, 'href="/en/$1/')
    .replace(new RegExp(`${DOMINIO}/([ab])/`, 'g'), `${DOMINIO}/en/$1/`);
  // Botão de idioma: no inglês aponta de volta para o português (depois de reescrever os links, para não ganhar /en/).
  return out.replace(/<a class="lang" href="\/en(\/[ab]\/[^"]*)" hreflang="en" lang="en">EN<\/a>/g, '<a class="lang" href="$1" hreflang="pt-BR" lang="pt-BR">PT</a>');
}

const html = (dir, f = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) html(p, f); else if (e.name.endsWith('.html')) f.push(p);
  }
  return f;
};

fs.rmSync(path.join(pub, 'en'), { recursive: true, force: true });
let n = 0;
for (const v of ['a', 'b']) {
  for (const arq of html(path.join(pub, v))) {
    const destino = path.join(pub, 'en', path.relative(pub, arq));
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, traduzHTML(fs.readFileSync(arq, 'utf8'), v));
    n++;
  }
}

// Escolha de versão em inglês.
const raiz = fs.readFileSync(path.join(pub, 'index.html'), 'utf8');
const escolhaEn = raiz
  .replace('<html lang="pt-BR">', '<html lang="en">')
  .replace(/Overtus para indústrias · escolha a versão/g, 'Overtus for manufacturers · choose a version')
  .replace(/content="Duas versões da página[^"]*"/, 'content="Two versions of the Overtus page for manufacturers: Editorial (sand and navy) and Navy (in the Overtus Hub look)."')
  .replace(/content="Duas versões para escolher: Editorial e Marinho."/g, 'content="Two versions to choose from: Editorial and Navy."')
  .replace('content="pt_BR"', 'content="en_US"')
  .replace(`href="${DOMINIO}/"`, `href="${DOMINIO}/en/"`)
  .replace(`content="${DOMINIO}/"`, `content="${DOMINIO}/en/"`)
  .replace('<span class="seg-tag">Indústrias</span>', '<span class="seg-tag">Manufacturing</span>')
  .replace('<small>Indústrias · duas versões</small>', '<small>Manufacturing · two versions · <a href="/" hreflang="pt-BR">Português</a></small>')
  .replace('href="/a/"', 'href="/en/a/"').replace('href="/b/"', 'href="/en/b/"')
  .replace('src="/assets/versao-a.jpg"', 'src="/assets/versao-en-a.jpg"').replace('src="/assets/versao-b.jpg"', 'src="/assets/versao-en-b.jpg"')
  .replace('alt="Página inicial da versão A"', 'alt="Home page of version A"').replace('alt="Página inicial da versão B"', 'alt="Home page of version B"')
  .replace(/<span>Versão A<\/span><h2>Editorial<\/h2><p>[^<]*<\/p><b>Abrir a versão A →<\/b>/, '<span>Version A</span><h2>Editorial</h2><p>Sand and navy sections, large headlines and orange only as an accent, like version A of the Overtus website.</p><b>Open version A →</b>')
  .replace(/<span>Versão B<\/span><h2>Marinho<\/h2><p>[^<]*<\/p><b>Abrir a versão B →<\/b>/, '<span>Version B</span><h2>Navy</h2><p>In the Overtus Hub look: navy with highlights, the 3D shape up top and glass cards, like version B of the Overtus website.</p><b>Open version B →</b>');
if (/Versão|Abrir|escolha a versão|Duas versões/.test(escolhaEn)) throw new Error('traduzir-en: escolha em inglês ainda tem português');
fs.writeFileSync(path.join(pub, 'en', 'index.html'), escolhaEn);
// Link para o inglês na escolha em português.
fs.writeFileSync(path.join(pub, 'index.html'), raiz.replace('<small>Indústrias · duas versões</small>', '<small>Indústrias · duas versões · <a href="/en/" hreflang="en" lang="en">English</a></small>'));

if (faltando.size) {
  console.error(`traduzir-en: ${faltando.size} textos sem tradução em industrias-en.mjs:\n- ${[...faltando].join('\n- ')}`);
  process.exit(1);
}
console.log(`industrias: versão em inglês, ${n} páginas em /en/`);
