// Converte o export do Claude Design (site-loewe/) em clientes/loewe/public, sem CDN.
// uso: node converter.mjs <pasta-export> <pasta-npm-x> <saida>
import fs from 'node:fs';
import path from 'node:path';

const [src, npm, out] = process.argv.slice(2);
const DOMAIN = 'https://loewe.overtus.com.br';

// página do export -> caminho limpo
const PAGES = {
  'Loewe Home v4.dc.html': { file: 'index.html', url: '/', og: 'home' },
  'Quem Somos v2.dc.html': { file: 'quem-somos.html', url: '/quem-somos', og: 'quem-somos' },
  'Servicos.dc.html': { file: 'servicos.html', url: '/servicos', og: 'servicos' },
  'Produtos.dc.html': { file: 'produtos.html', url: '/produtos', og: 'produtos' },
  'Trabalhe Conosco.dc.html': { file: 'trabalhe-conosco.html', url: '/trabalhe-conosco', og: 'trabalhe-conosco' },
  'Contato.dc.html': { file: 'contato.html', url: '/contato', og: 'contato' },
  'Politica de Privacidade.dc.html': { file: 'politica-de-privacidade.html', url: '/politica-de-privacidade', og: 'politica-de-privacidade' },
  'Catalogo Loewe.dc.html': { file: 'catalogo.html', url: '/catalogo', og: 'catalogo' },
};
const COMPONENTS = ['MenuMobile.dc.html', 'ModalProposta.dc.html', 'NavProdutos.dc.html', 'NavServicos.dc.html'];
const SCRIPTS = ['support.js', 'cookies.js', 'image-slot.js', 'doc-page.js'];

const DESCR = {
  'index.html': 'Loewe Equipamentos Industriais, de Esteio/RS: projeto, fabricação e automação de máquinas, dispositivos e linhas de montagem desde 1991, com engenharia e manutenção.',
  'quem-somos.html': 'Conheça a Loewe Equipamentos Industriais: desde 1991 em Esteio/RS desenvolvendo máquinas, dispositivos e automação sob medida para a indústria.',
  'servicos.html': 'Serviços de engenharia e manutenção industrial da Loewe: projeto, retrofitting, adequação à NR-12, assistência técnica e mão de obra especializada.',
  'produtos.html': 'Produtos Loewe: dispositivos de montagem e soldagem, automação industrial, células robotizadas, linhas e bancadas de montagem sob medida.',
  'trabalhe-conosco.html': 'Trabalhe na Loewe Equipamentos Industriais: vagas em engenharia e manutenção industrial em Esteio/RS. Envie seu currículo.',
  'contato.html': 'Fale com a Loewe Equipamentos Industriais: telefone (51) 3458-2525, WhatsApp e e-mail comercial. R. 24 de Agosto, 2436, Esteio/RS.',
  'politica-de-privacidade.html': 'Política de privacidade e cookies do site da Loewe Equipamentos Industriais: quais dados coletamos, como usamos e seus direitos pela LGPD.',
  'catalogo.html': 'Catálogo 2026 da Loewe Equipamentos Industriais: dispositivos, automação, linhas de montagem e serviços de engenharia e manutenção.',
};

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets/vendor'), { recursive: true });
fs.mkdirSync(path.join(out, 'assets/fonts'), { recursive: true });
fs.cpSync(path.join(src, 'assets'), path.join(out, 'assets'), { recursive: true });
fs.copyFileSync(path.join(npm, 'react-18.3.1/package/umd/react.production.min.js'), path.join(out, 'assets/vendor/react.production.min.js'));
fs.copyFileSync(path.join(npm, 'react-dom-18.3.1/package/umd/react-dom.production.min.js'), path.join(out, 'assets/vendor/react-dom.production.min.js'));
fs.copyFileSync(path.join(npm, 'fontsource-variable-inter-5.3.0/package/files/inter-latin-wght-normal.woff2'), path.join(out, 'assets/fonts/InterVariable-latin.woff2'));

const enc = s => s.replace(/ /g, '%20');
function relink(t) {
  for (const [name, p] of Object.entries(PAGES)) {
    for (const n of [name, enc(name)]) {
      // "X.dc.html#ancora" -> "/x#ancora"
      t = t.split(n + '#').join(p.url + '#').split(n).join(p.url);
    }
  }
  t = t.split('./imagens/fonts/InterVariable-latin.woff2').join('/assets/fonts/InterVariable-latin.woff2');
  // fonte local antes do rsms.me também no catálogo (que só tinha o CDN)
  t = t.split("src:url('https://rsms.me/inter/font-files/InterVariable.woff2') format('woff2')}").join("src:url('/assets/fonts/InterVariable-latin.woff2') format('woff2'),url('https://rsms.me/inter/font-files/InterVariable.woff2') format('woff2')}");
  t = t.replace(/(["'(])\.\/assets\//g, '$1/assets/');
  t = t.replace(/(["'])\.\/(support|cookies|image-slot|doc-page)\.js/g, '$1/$2.js');
  return t;
}

// React/ReactDOM servidos pelo próprio site (support.js consulta window.__resources antes do unpkg);
// componentes buscados sempre na raiz, valendo para qualquer caminho.
const resources = {
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js': '/assets/vendor/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js': '/assets/vendor/react-dom.production.min.js',
};
for (const c of COMPONENTS) resources['./' + encodeURIComponent(c.replace(/\.dc\.html$/, '')) + '.dc.html'] = '/' + c;
const RES_SCRIPT = `<script>window.__resources=${JSON.stringify(resources)};</script>`;

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
for (const [name, p] of Object.entries(PAGES)) {
  let t = relink(fs.readFileSync(path.join(src, name), 'utf8'));
  const title = t.match(/<title>([^<]*)<\/title>/)[1].trim();
  const canon = DOMAIN + p.url;
  const d = esc(DESCR[p.file]);
  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${d}">`,
    `<link rel="canonical" href="${canon}">`,
    `<link rel="alternate" hreflang="pt-BR" href="${canon}">`,
    `<link rel="alternate" hreflang="x-default" href="${canon}">`,
    `<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">`,
    `<meta name="theme-color" content="#9C0016">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Loewe Equipamentos Industriais">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:url" content="${canon}">`,
    `<meta property="og:image" content="${DOMAIN}/assets/og/${p.og}.jpg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${d}">`,
    `<meta name="twitter:image" content="${DOMAIN}/assets/og/${p.og}.jpg">`,
    `<link rel="preload" href="/assets/fonts/InterVariable-latin.woff2" as="font" type="font/woff2" crossorigin>`,
    RES_SCRIPT,
  ].join('\n');
  t = t.replace('<html>', '<html lang="pt-BR">');
  t = t.replace('<script src="/support.js"></script>\n</head>', head + '\n<script src="/support.js"></script>\n</head>');
  if (!t.includes('og:image')) throw new Error('head não encontrado em ' + name);
  // a foto da empresa na home estava vazia no export (aparecia o aviso "Foto: sede da Loewe em Esteio")
  t = t.replace('<image-slot id="v4-inst" shape="rect"', '<image-slot id="v4-inst" shape="rect" src="/assets/ferramental.webp"');
  fs.writeFileSync(path.join(out, p.file), t);
}
// componentes não são páginas: fora do Google
for (const c of COMPONENTS) fs.writeFileSync(path.join(out, c), relink(fs.readFileSync(path.join(src, c), 'utf8')).replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="robots" content="noindex">'));
for (const s of SCRIPTS) fs.writeFileSync(path.join(out, s), relink(fs.readFileSync(path.join(src, s), 'utf8')));
console.log('ok', out);
