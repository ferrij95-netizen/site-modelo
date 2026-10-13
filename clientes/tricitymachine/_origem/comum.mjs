// Peças comuns às duas versões: cabeçalho, rodapé e <head>. Cada versão tem seu CSS em public/assets/.
import { empresa, servicos } from './conteudo.mjs';

export const paginas = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'sobre', nome: 'About Us', caminho: 'sobre/' },
  { slug: 'servicos', nome: 'Services', caminho: 'servicos/' },
  { slug: 'qualidade', nome: 'Quality', caminho: 'qualidade/' },
  { slug: 'galeria', nome: 'Photo Gallery', caminho: 'galeria/' },
  { slug: 'contato', nome: 'Contact Us', caminho: 'contato/' },
];

export function head({ v, titulo, descricao, caminho, fontes }) {
  const url = `${empresa.url}${v}/${caminho}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<meta name="description" content="${descricao}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${empresa.nome}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${descricao}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://tricitymachine.overtus.com.br/assets/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/icone.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes}">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body>
<a class="pular" href="#conteudo">Skip to content</a>
`;
}

export function cabecalho(v, ativa) {
  const links = paginas.map(p => `<a href="/${v}/${p.caminho}"${p.slug === ativa ? ' aria-current="page"' : ''}>${p.nome}</a>`).join('');
  return `<header class="topo">
  <a class="marca" href="/${v}/"><img src="/assets/img/logo-branco.png" alt="${empresa.nome} logo" width="60" height="78"><span>${empresa.curto}<small>${empresa.cidade}</small></span></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" onclick="this.setAttribute('aria-expanded',this.getAttribute('aria-expanded')==='true'?'false':'true');document.getElementById('menu').classList.toggle('aberto')">Menu</button>
  <nav id="menu" class="menu" aria-label="Main">${links}<a class="menu-tel" href="tel:${empresa.telefoneHref}">${empresa.telefone}</a></nav>
</header>
<main id="conteudo">
`;
}

export function rodape(v) {
  const links = servicos.map(s => `<li><a href="/${v}/servicos/#${s.slug}">${s.nome}</a></li>`).join('');
  return `</main>
<footer class="rodape">
  <div class="rodape-in">
    <div>
      <strong>${empresa.nome}</strong>
      <p>${empresa.endereco}</p>
      <p>Phone <a href="tel:${empresa.telefoneHref}">${empresa.telefone}</a> · Fax ${empresa.fax}</p>
      <p><a href="mailto:${empresa.email}">${empresa.email}</a></p>
    </div>
    <ul>${links}</ul>
    <p class="direitos">© ${new Date().getFullYear()} ${empresa.nome}</p>
  </div>
</footer>
</body>
</html>
`;
}
