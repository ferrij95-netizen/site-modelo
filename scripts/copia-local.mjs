// Copia clientes/<c>/public para uma pasta que abre com dois cliques, sem servidor (file://).
// Troca caminhos que começam com "/" (href, src, srcset, url(), content de og) por caminhos relativos
// e aponta links de pasta para ".../index.html".
// Uso: node scripts/copia-local.mjs <cliente> <pasta-destino>
import fs from 'node:fs';
import path from 'node:path';

const [cliente, destino] = process.argv.slice(2);
if (!cliente || !destino) { console.error('uso: node scripts/copia-local.mjs <cliente> <pasta-destino>'); process.exit(1); }
const raiz = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const origem = path.join(raiz, 'clientes', cliente, 'public');
if (!fs.existsSync(origem)) { console.error('não achei', origem); process.exit(1); }
fs.rmSync(destino, { recursive: true, force: true });
fs.cpSync(origem, destino, { recursive: true });

const andar = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? andar(path.join(d, e.name)) : [path.join(d, e.name)]);

function relativo(arquivo, alvo) {
  // alvo começa com "/" (ex.: /a/empresa/#x, /assets/a.css)
  const m = alvo.match(/^([^?#]*)([?#].*)?$/);
  let p = m[1]; const resto = m[2] || '';
  if (p.endsWith('/')) p += 'index.html';
  else if (!path.extname(p) && fs.existsSync(path.join(destino, p, 'index.html'))) p += '/index.html';
  let r = path.relative(path.dirname(arquivo), path.join(destino, p)).split(path.sep).join('/');
  if (!r) r = 'index.html';
  return r + resto;
}

let n = 0;
for (const f of andar(destino)) {
  const ext = path.extname(f);
  if (!['.html', '.css', '.js'].includes(ext)) continue;
  let t = fs.readFileSync(f, 'utf8');
  const antes = t;
  // atributos html: href="/..", src="/..", poster, data-*
  t = t.replace(/((?:href|src|poster|data-[a-z-]+|action)=["'])(\/(?!\/)[^"']*)(["'])/g, (_, a, u, b) => a + relativo(f, u) + b);
  // srcset
  t = t.replace(/(srcset=["'])([^"']+)(["'])/g, (_, a, s, b) => a + s.split(',').map(x => x.trim().replace(/^(\/(?!\/)\S+)/, u => relativo(f, u))).join(', ') + b);
  // css url(/..)
  t = t.replace(/url\((["']?)(\/(?!\/)[^)"']+)\1\)/g, (_, q, u) => `url(${q}${relativo(f, u)}${q})`);
  // js/html com caminhos em strings: '/assets/...', "/a/..."
  if (ext !== '.css') t = t.replace(/(["'`])(\/(?:assets|a|b|c)\/[^"'`\s]*)(["'`])/g, (_, a, u, b) => a + relativo(f, u) + b);
  if (t !== antes) { fs.writeFileSync(f, t); n++; }
}
console.log(`${cliente}: copiado para ${destino} (${n} arquivos ajustados para abrir sem servidor)`);
