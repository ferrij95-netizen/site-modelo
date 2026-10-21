// Monta as páginas das versões A ("Escudo": fiel ao site atual, faixa grafite com o logo, prédio da Savassi na abertura,
// títulos em Cinzel como o "Reis & Reis" do logo, ladrilhos 01 a 06 listrados em grafite e areia) e B ("Parecer": títulos em
// Anton como os do site atual, áreas como um índice numerado, as três frentes do escritório numa linha e o currículo do
// titular em linha do tempo). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, filosofia, citacao, frentes, areas, titular, equipe, artigos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const nomesVersao = { a: 'Escudo', b: 'Parecer' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'atuacao', nome: 'Áreas de atuação', caminho: 'atuacao/' },
  { slug: 'equipe', nome: 'Equipe', caminho: 'equipe/' },
  { slug: 'artigos', nome: 'Notícias & artigos', caminho: 'artigos/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  volta: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  sobe: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z"/>',
  in: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/>',
  fora: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Reis & Reis e gostaria de falar com o escritório.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const fora = ' target="_blank" rel="noopener"';
const dataBR = d => { const [a, m, dd] = d.split('-'); return `${dd}/${m}/${a}`; };
const mesAno = d => { const m = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']; const [a, mm] = d.split('-'); return `${m[+mm - 1]} ${a}`; };
const n2 = i => String(i + 1).padStart(2, '0');

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600'
    : 'family=Anton&family=Inter:wght@400;500;600';
  const t = titulo ? `${titulo} | ${E.nome}` : `${E.nome} | Advocacia empresarial em Belo Horizonte`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(E.nome)}">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#454245' : '#ffffff'}">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${fontes}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'LegalService', name: E.nomeLongo, url: E.url, telephone: E.telHref, email: E.email, image: `${E.url}assets/og-${v}.jpg`, address: { '@type': 'PostalAddress', streetAddress: 'Rua Raul Pompeia, 77, 5º andar', addressLocality: 'Belo Horizonte', addressRegion: 'MG', postalCode: '30330-080', addressCountry: 'BR' } })}</script>
</head>`;
}

const marca = (v, claro) => `<a class="marca" href="/${v}/" aria-label="${esc(E.nomeLongo)}, início"><img class="marca-escudo" src="/assets/escudo.webp" alt="" width="492" height="480"><img class="marca-texto" src="/assets/marca-${claro ? 'clara' : 'escura'}.svg" alt="Reis &amp; Reis Advocacia Empresarial" width="1854" height="582"></a>`;

function topo(v, ativo) {
  const links = nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === ativo ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
  <div class="topo-in">
    ${marca(v, v === 'a')}
    <nav class="menu" id="menu" aria-label="Principal">${links}<a class="menu-wa" href="${waLink()}"${fora}>${ic('wa')}WhatsApp</a></nav>
    <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu">${ic('menu')}<span>Menu</span></button>
  </div>
</header>`;
}

function rodape(v) {
  const areasLinks = areas.map(a => `<li><a href="/${v}/atuacao/${a.slug}/">${a.nome}</a></li>`).join('');
  return `<footer class="rodape">
  <div class="rodape-in">
    <div class="rodape-marca">${marca(v, true)}<p>${E.linha}.</p>
      <p class="redes"><a href="${E.facebook}"${fora} aria-label="Facebook">${ic('fb')}</a><a href="${E.linkedin}"${fora} aria-label="LinkedIn">${ic('in')}</a><a href="${waLink()}"${fora} aria-label="WhatsApp">${ic('wa')}</a></p></div>
    <div><h2>Áreas de atuação</h2><ul>${areasLinks}</ul></div>
    <div><h2>Escritório</h2><address>${E.rua}<br>Bairro ${E.bairro}<br>${E.cidade}<br>${E.cep}</address>
      <p><a href="tel:${E.telHref}">${E.tel}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  </div>
  <div class="rodape-pe"><span>© ${new Date().getFullYear()} ${E.nomeLongo}. Todos os direitos reservados.</span><a href="#conteudo" class="sobe">${ic('sobe')}Voltar ao topo</a></div>
</footer>
<a class="wa-flutua" href="${waLink()}"${fora} aria-label="Falar no WhatsApp">${ic('wa')}</a>
<script>
(function(){var b=document.querySelector('.menu-bt'),m=document.getElementById('menu');b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));m.classList.toggle('aberto',!o);document.body.classList.toggle('travado',!o);});
document.querySelectorAll('form[data-wa]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f),t='Olá! Vim pelo site da Reis & Reis.';d.forEach(function(v,k){if(v)t+='\\n'+k+': '+v;});window.open('https://wa.me/${E.wa}?text='+encodeURIComponent(t),'_blank');});});
document.querySelectorAll('form[data-informativo]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var m=f.querySelector('input').value;location.href='mailto:${E.email}?subject='+encodeURIComponent('Quero receber o informativo')+'&body='+encodeURIComponent('Por favor, incluam o e-mail '+m+' na lista do informativo da Reis & Reis.');});});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('visto');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px'});document.querySelectorAll('[data-rev]').forEach(function(el){el.classList.add('rev');io.observe(el);});}
})();
</script>`;
}

function pagina(v, slug, caminho, titulo, descricao, corpo) {
  return `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;
}

// ---------- peças comuns ----------
const traco = '<span class="traco" aria-hidden="true"></span>';

function informativo(extra = '') {
  return `<form class="informativo ${extra}" data-informativo>
  <label for="inf-${extra || 'x'}"><strong>Receba nosso informativo</strong><span>Basta informar seu e-mail.</span></label>
  <div><input id="inf-${extra || 'x'}" type="email" name="email" placeholder="Seu e-mail" required autocomplete="email"><button type="submit">Enviar</button></div>
</form>`;
}

function formContato(v, areaPadrao = '') {
  const opcoes = ['<option value="">Escolha a área</option>', ...areas.map(a => `<option${a.nome === areaPadrao ? ' selected' : ''}>${a.nome}</option>`), '<option>Outro assunto</option>'].join('');
  return `<form class="form" data-wa>
  <div class="campo"><label for="f-nome">Nome</label><input id="f-nome" name="Nome" required autocomplete="name"></div>
  <div class="campo"><label for="f-tel">Telefone</label><input id="f-tel" name="Telefone" type="tel" autocomplete="tel"></div>
  <div class="campo"><label for="f-email">E-mail</label><input id="f-email" name="E-mail" type="email" autocomplete="email"></div>
  <div class="campo"><label for="f-area">Assunto</label><select id="f-area" name="Assunto">${opcoes}</select></div>
  <div class="campo campo-largo"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="Mensagem" rows="4"></textarea></div>
  <button class="bt bt-cheio" type="submit">${ic('wa')}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp do escritório. Se preferir, escreva para <a href="mailto:${E.email}">${E.email}</a>.</p>
</form>`;
}

const contatosLista = () => `<ul class="contatos">
  <li>${ic('pin')}<div><strong>Endereço</strong><a href="${E.mapa}"${fora}>${E.rua}<br>Bairro ${E.bairro}, ${E.cidade}<br>${E.cep}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="tel:${E.telHref}">${E.tel}</a></div></li>
  <li>${ic('wa')}<div><strong>WhatsApp</strong><a href="${waLink()}"${fora}>${E.waTxt}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;

const cartaoArtigo = (v, a, cls = '') => `<a class="artigo-item ${cls}" href="/${v}/artigos/${a.slug}/">
  <span class="artigo-img"><img src="/assets/artigos/${a.img}.webp" alt="" loading="lazy"></span>
  <span class="artigo-txt"><span class="artigo-meta">${a.tema} · ${mesAno(a.data)}</span><strong>${esc(a.titulo)}</strong><span class="artigo-res">${esc(a.corpo.find(c => c.length > 80) || a.corpo[0]).slice(0, 150)}…</span></span>
</a>`;

const artigosOrdem = [...artigos].sort((x, y) => y.data.localeCompare(x.data));

// ---------- versão A: Escudo ----------
function inicioA() {
  const v = 'a';
  const tiles = areas.map((a, i) => `<a class="ladrilho ${i % 2 ? 'areia' : 'grafite'}" href="/a/atuacao/${a.slug}/" data-rev style="--d:${i * 70}ms">
    <span class="lad-num">${n2(i)}</span><span class="lad-nome">${a.curto.join('<br>')}</span><span class="lad-res">${a.resumo}</span></a>`).join('');
  return `
<section class="hero-a">
  <img class="hero-foto" src="/assets/fotos/predio.webp" alt="Prédio na Savassi, Belo Horizonte" width="2000" height="1330" fetchpriority="high">
  <div class="hero-a-in">
    <div class="hero-a-txt">
      <p class="sobre">Advocacia empresarial · Savassi, Belo Horizonte</p>
      <h1>Reis &amp; Reis<br>Advocacia Empresarial</h1>
      <p class="hero-linha">${E.linha}.</p>
      <div class="hero-bts"><a class="bt bt-areia" href="/a/artigos/">Blog jurídico</a><a class="bt bt-vazado" href="/a/contato/">Nosso atendimento</a></div>
    </div>
    ${informativo('hero')}
  </div>
</section>

<section class="filosofia-a" data-rev>
  <div class="estreito centro">${traco}<h2>Nossa filosofia</h2>
  ${filosofia.map(p => `<p>${p}</p>`).join('')}</div>
</section>

<section class="areas-a">
  <div class="largo centro">${traco}<h2>Áreas de atuação</h2></div>
  <div class="ladrilhos">${tiles}</div>
  <p class="centro"><a class="bt bt-linha" href="/a/atuacao/">Consulte todas as áreas de atuação</a></p>
</section>

<section class="escritorio-a">
  <div class="esc-fotos" data-rev>
    <img class="esc-f1" src="/assets/fotos/reuniao.webp" alt="Sala de reuniões do escritório" loading="lazy">
    <img class="esc-f2" src="/assets/fotos/recepcao.webp" alt="Recepção com o escudo da Reis &amp; Reis" loading="lazy">
  </div>
  <div class="esc-txt" data-rev>
    <blockquote>“${citacao}”</blockquote>
    <p>Atendimento no 5º andar da Rua Raul Pompeia, 77, na Savassi, com salas de reunião próprias para receber clientes e parceiros.</p>
    <a class="bt bt-grafite" href="/a/equipe/">Conheça a equipe</a>
  </div>
</section>

<section class="titular-a">
  <div class="largo titular-grade">
    <img src="/assets/equipe/gleison.webp" alt="${titular.nome}" loading="lazy" width="443" height="481">
    <div><p class="sobre">Titular</p><h2>${titular.nome}</h2><p class="oab">${titular.oab}</p>
      <ul class="bio-curta">${titular.bio.slice(0, 5).map(b => `<li><strong>${b[0]}</strong><span>${b[1]}</span></li>`).join('')}</ul>
      <a class="link-seta" href="/a/equipe/">Currículo completo e colaboradores ${ic('seta')}</a></div>
  </div>
</section>

<section class="artigos-a">
  <div class="largo">
    <div class="cab-sec">${traco}<h2>Notícias &amp; artigos</h2><a class="link-seta" href="/a/artigos/">Ver todos ${ic('seta')}</a></div>
    <div class="artigos-grade">${artigosOrdem.slice(0, 3).map(a => cartaoArtigo(v, a)).join('')}</div>
  </div>
</section>

<section class="fale-a" id="fale">
  <div class="largo fale-grade">
    <div><h2>Fale conosco</h2><p class="fale-sub">Conte com a experiência de nossa equipe.</p>${contatosLista()}</div>
    ${formContato(v)}
  </div>
</section>`;
}

function atuacaoA() {
  return `<section class="faixa-titulo">${traco}<h1>Áreas de atuação</h1></section>
<div class="largo areas-lista-a">
${areas.map((a, i) => `<section class="area-bloco" id="${a.slug}" data-rev>
  <div class="area-bloco-tit"><span class="area-n">${n2(i)}</span><h2 class="${i % 2 ? 'cor-areia' : ''}">${a.nome}</h2><p>${a.resumo}</p><a class="link-seta" href="/a/atuacao/${a.slug}/">Ver detalhes ${ic('seta')}</a></div>
  <ul class="area-itens">${a.itens.map(t => `<li>${t}</li>`).join('')}</ul>
</section>`).join('')}
</div>
<section class="cta-faixa"><div class="largo"><p>Precisa de orientação em alguma dessas áreas?</p><a class="bt bt-areia" href="${waLink()}"${fora}>${ic('wa')}Falar com o escritório</a></div></section>`;
}

function equipeA() {
  return `<section class="faixa-titulo">${traco}<h1>Titular</h1></section>
<section class="largo titular-pag">
  <div class="tp-txt"><h2>${titular.nome}<br><small>${titular.oab}</small></h2><p class="sobre">${titular.papel}</p>
    <ul class="bio-lista">${titular.bio.map(b => `<li><strong>${b[0]}</strong><span>${b[1]}</span></li>`).join('')}</ul>
    <p class="tp-emails">${titular.emails.map(m => `<a href="mailto:${m}">${m}</a>`).join(' · ')} · <a href="${E.lattes}"${fora}>Currículo Lattes</a></p></div>
  <figure class="tp-foto"><img src="/assets/fotos/parede-logo.webp" alt="${titular.nome} no escritório" loading="lazy"></figure>
</section>
<section class="colab-a">
  <div class="largo"><h2 class="centro">Colaboradores</h2>
  <div class="colab-grade">${equipe.map(p => `<article class="pessoa" data-rev><img src="/assets/equipe/${p.foto}.webp" alt="${p.nome}" loading="lazy"><h3>${p.nome}</h3><p class="papel">${p.papel}</p><p><strong>Áreas de atuação:</strong> ${p.areas}.</p></article>`).join('')}</div></div>
</section>`;
}

// ---------- versão B: Parecer ----------
function inicioB() {
  const v = 'b';
  return `
<section class="hero-b">
  <div class="hero-b-txt">
    <p class="sobre">Belo Horizonte · Savassi</p>
    <h1><span>Advocacia</span> <span>empresarial</span></h1>
    <p class="hero-linha">${E.linha}. Uma advocacia ética e transparente, com atendimento ágil e totalmente personalizado.</p>
    <div class="hero-bts"><a class="bt bt-cheio" href="/b/contato/">Agendar atendimento</a><a class="bt bt-linha" href="/b/atuacao/">Áreas de atuação</a></div>
    <dl class="hero-fatos">
      <div><dt>Titular</dt><dd>${titular.nome}<br>${titular.oab}</dd></div>
      <div><dt>Atuação</dt><dd>6 áreas do direito<br>empresarial e cível</dd></div>
      <div><dt>Endereço</dt><dd>Rua Raul Pompeia, 77<br>5º andar, Savassi</dd></div>
    </dl>
  </div>
  <figure class="hero-b-foto"><img src="/assets/fotos/reuniao.webp" alt="Sala de reuniões da Reis &amp; Reis" width="1800" height="1200" fetchpriority="high"></figure>
</section>

<section class="indice-b">
  <div class="largo">
    <div class="cab-b"><span class="cab-n">§</span><h2>Áreas de atuação</h2><p>Consultoria, pareceres e contencioso em seis áreas.</p></div>
    <ol class="indice">${areas.map((a, i) => `<li data-rev><a href="/b/atuacao/${a.slug}/"><span class="ind-n">${n2(i)}</span><span class="ind-nome">${a.nome}</span><span class="ind-res">${a.resumo}</span>${ic('seta', 'ic ind-seta')}</a></li>`).join('')}</ol>
  </div>
</section>

<section class="frentes-b">
  <div class="largo">
    <div class="cab-b claro"><span class="cab-n">§</span><h2>Como atuamos</h2><p>${filosofia[1].split('.')[0]}.</p></div>
    <ol class="frentes">${frentes.map((f, i) => `<li data-rev style="--d:${i * 120}ms"><span class="fr-n">${['I', 'II', 'III'][i]}</span><h3>${f.nome}</h3><p>${f.texto}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="citacao-b">
  <div class="largo cit-grade">
    <figure class="cit-foto" data-rev><img src="/assets/fotos/escudo-metal.webp" alt="Escudo da Reis &amp; Reis em metal na recepção" loading="lazy"></figure>
    <blockquote data-rev><p>${citacao}</p><footer>Nossa filosofia</footer></blockquote>
  </div>
</section>

<section class="equipe-b">
  <div class="largo">
    <div class="cab-b"><span class="cab-n">§</span><h2>Equipe</h2><p>Advogados e professores com atuação em todas as áreas do escritório.</p></div>
    <div class="equipe-faixa">${equipe.map(p => `<a class="membro" href="/b/equipe/"><img src="/assets/equipe/${p.foto}.webp" alt="" loading="lazy"><strong>${p.nome}</strong><span>${p.areas}</span></a>`).join('')}</div>
  </div>
</section>

<section class="artigos-b">
  <div class="largo">
    <div class="cab-b"><span class="cab-n">§</span><h2>Notícias &amp; artigos</h2><a class="link-seta" href="/b/artigos/">Ver todos ${ic('seta')}</a></div>
    <div class="artigos-linhas">${artigosOrdem.slice(0, 4).map(a => cartaoArtigo(v, a, 'linha')).join('')}</div>
  </div>
</section>

<section class="fale-b" id="fale">
  <div class="largo fale-grade">
    <div><h2>Fale com o escritório</h2>${contatosLista()}${informativo('b')}</div>
    ${formContato(v)}
  </div>
</section>`;
}

function atuacaoB() {
  return `<section class="cab-pag"><div class="largo"><p class="sobre">Reis &amp; Reis Advocacia Empresarial</p><h1>Áreas de atuação</h1><p>${filosofia[0]}</p></div></section>
<div class="largo atuacao-b">
  <nav class="atuacao-ind" aria-label="Áreas"><ol>${areas.map((a, i) => `<li><a href="#${a.slug}"><span>${n2(i)}</span>${a.nome}</a></li>`).join('')}</ol></nav>
  <div>${areas.map((a, i) => `<section class="area-sec" id="${a.slug}" data-rev>
    <header><span class="ind-n">${n2(i)}</span><div><h2>${a.nome}</h2><p>${a.resumo}</p></div></header>
    <ol class="area-itens-b">${a.itens.map(t => `<li>${t}</li>`).join('')}</ol>
    <a class="link-seta" href="/b/atuacao/${a.slug}/">Página da área ${ic('seta')}</a>
  </section>`).join('')}</div>
</div>`;
}

function equipeB() {
  return `<section class="cab-pag"><div class="largo"><p class="sobre">Equipe</p><h1>${titular.nome}</h1><p>${titular.papel}. ${titular.oab}.</p></div></section>
<section class="largo titular-b">
  <figure><img src="/assets/equipe/gleison.webp" alt="${titular.nome}" width="443" height="481"><figcaption><a href="${E.lattes}"${fora}>Currículo Lattes ${ic('fora')}</a></figcaption></figure>
  <ol class="curriculo">${titular.bio.map(b => `<li data-rev><strong>${b[0]}</strong><span>${b[1]}</span></li>`).join('')}</ol>
</section>
<section class="colab-b">
  <div class="largo"><div class="cab-b"><span class="cab-n">§</span><h2>Colaboradores</h2></div>
  <div class="colab-grade-b">${equipe.map(p => `<article class="pessoa-b" data-rev><img src="/assets/equipe/${p.foto}.webp" alt="${p.nome}" loading="lazy"><div><h3>${p.nome}</h3><p class="papel">${p.papel}</p><p>${p.areas}</p></div></article>`).join('')}</div></div>
</section>`;
}

// ---------- páginas comuns (o CSS de cada versão muda o desenho) ----------
function areaPag(v, a, i) {
  const pessoas = equipe.filter(p => p.liga.includes(a.slug));
  const outras = areas.filter(x => x !== a);
  return `<section class="area-cab ${v === 'a' ? (i % 2 ? 'areia' : 'grafite') : ''}"><div class="largo">
  <a class="volta" href="/${v}/atuacao/">${ic('volta')}Áreas de atuação</a>
  <span class="area-cab-n">${n2(i)}</span><h1>${a.nome}</h1><p>${a.resumo}</p></div></section>
<section class="largo area-corpo">
  <ol class="area-pontos">${a.itens.map(t => `<li data-rev>${t}</li>`).join('')}</ol>
  <aside class="area-lado">
    <div class="area-cta"><h2>Fale sobre ${a.nome.toLowerCase()}</h2><p>Atendimento ágil e personalizado, no escritório da Savassi ou a distância.</p>
      <a class="bt bt-cheio" href="${waLink(`Olá! Vim pelo site da Reis & Reis e gostaria de falar sobre ${a.nome}.`)}"${fora}>${ic('wa')}WhatsApp</a>
      <a class="bt bt-linha" href="tel:${E.telHref}">${ic('tel')}${E.tel}</a></div>
    ${pessoas.length ? `<div class="area-pessoas"><h2>Quem atende</h2>${pessoas.map(p => `<a href="/${v}/equipe/"><img src="/assets/equipe/${p.foto}.webp" alt="" loading="lazy"><span><strong>${p.nome}</strong>${p.areas}</span></a>`).join('')}</div>` : ''}
  </aside>
</section>
<section class="outras"><div class="largo"><h2>Outras áreas</h2><div class="outras-lista">${outras.map(o => `<a href="/${v}/atuacao/${o.slug}/"><span>${n2(areas.indexOf(o))}</span>${o.nome}</a>`).join('')}</div></div></section>`;
}

function artigosPag(v) {
  const titulo = v === 'a'
    ? `<section class="faixa-titulo">${traco}<h1>Notícias &amp; artigos</h1></section>`
    : `<section class="cab-pag"><div class="largo"><p class="sobre">Blog jurídico</p><h1>Notícias &amp; artigos</h1><p>Textos da equipe sobre tributação, LGPD, relações de trabalho e serviços públicos.</p></div></section>`;
  return `${titulo}
<section class="largo lista-artigos ${v === 'b' ? 'artigos-linhas' : 'artigos-grade'}">${artigosOrdem.map(a => cartaoArtigo(v, a, v === 'b' ? 'linha' : '')).join('')}</section>
<section class="largo inf-pag">${informativo('pag')}</section>`;
}

function paragrafo(t) {
  if (/^https?:\/\//.test(t)) return `<p><a href="${esc(t)}"${fora}>${esc(t.replace(/^https?:\/\//, '').slice(0, 60))}…</a></p>`;
  if (t.length < 60 && !/[.!"”]$/.test(t)) return `<h2>${esc(t.replace(/:$/, ''))}</h2>`;
  if (t.startsWith('“') || t.startsWith('"')) return `<blockquote>${esc(t)}</blockquote>`;
  if (/^(Art\.|Parágrafo único)/.test(t)) return `<blockquote class="lei">${esc(t)}</blockquote>`;
  return `<p>${esc(t)}</p>`;
}

function artigoPag(v, a) {
  const outros = artigosOrdem.filter(x => x !== a).slice(0, 3);
  return `<article class="artigo">
  <header class="artigo-cab"><div class="estreito">
    <a class="volta" href="/${v}/artigos/">${ic('volta')}Notícias &amp; artigos</a>
    <p class="artigo-meta">${a.tema} · <time datetime="${a.data}">${dataBR(a.data)}</time></p>
    <h1>${esc(a.titulo)}</h1><p class="artigo-autor">Por ${a.autor}</p></div></header>
  <div class="estreito artigo-corpo">
    <figure class="artigo-capa"><img src="/assets/artigos/${a.img}.webp" alt=""></figure>
    ${a.corpo.map(paragrafo).join('\n    ')}
    ${a.fonte ? `<p class="artigo-fonte">Fonte: ${esc(a.fonte)}.</p>` : ''}
    <div class="artigo-assina">${marca(v, false)}<p>${a.autor}<br>${E.linha}<br><a href="mailto:${E.email}">${E.email}</a> · <a href="tel:${E.telHref}">${E.tel}</a></p></div>
  </div>
</article>
<section class="outras"><div class="largo"><h2>Leia também</h2><div class="artigos-grade">${outros.map(o => cartaoArtigo(v, o)).join('')}</div></div></section>`;
}

function contatoPag(v) {
  const titulo = v === 'a'
    ? `<section class="faixa-titulo">${traco}<h1>Contato</h1><p>Conte com a experiência de nossa equipe.</p></section>`
    : `<section class="cab-pag"><div class="largo"><p class="sobre">Contato</p><h1>Fale com o escritório</h1><p>Conte com a experiência de nossa equipe.</p></div></section>`;
  return `${titulo}
<section class="largo contato-grade">
  <div>${contatosLista()}<p class="redes-txt"><a href="${E.facebook}"${fora}>${ic('fb')}Facebook</a> <a href="${E.linkedin}"${fora}>${ic('in')}LinkedIn</a></p></div>
  ${formContato(v)}
</section>
<section class="mapa"><iframe title="Mapa: Rua Raul Pompeia, 77, Savassi, Belo Horizonte" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

export function gerarVersao(v) {
  const p = {};
  const desc = `${E.nomeLongo}: ${E.linha.toLowerCase()} em Belo Horizonte. Consultoria, pareceres, contratos e contencioso. Rua Raul Pompeia, 77, Savassi.`;
  p.index = pagina(v, 'index', '', '', desc, v === 'a' ? inicioA() : inicioB());
  p.atuacao = pagina(v, 'atuacao', 'atuacao/', 'Áreas de atuação', 'Direito Empresarial, Bancário, Tributário, Imobiliário, Administrativo e Previdenciário, Família e Sucessões.', v === 'a' ? atuacaoA() : atuacaoB());
  areas.forEach((a, i) => { p[`atuacao/${a.slug}`] = pagina(v, 'atuacao', `atuacao/${a.slug}/`, a.nome, `${a.nome} na Reis & Reis Advocacia Empresarial: ${a.resumo}`, areaPag(v, a, i)); });
  p.equipe = pagina(v, 'equipe', 'equipe/', 'Equipe', `${titular.nome}, ${titular.oab}, e os colaboradores da Reis & Reis.`, v === 'a' ? equipeA() : equipeB());
  p.artigos = pagina(v, 'artigos', 'artigos/', 'Notícias & artigos', 'Artigos e notícias jurídicas da equipe Reis & Reis.', artigosPag(v));
  artigos.forEach(a => { p[`artigos/${a.slug}`] = pagina(v, 'artigos', `artigos/${a.slug}/`, a.titulo, (a.corpo.find(c => c.length > 80) || a.titulo).slice(0, 155), artigoPag(v, a)); });
  p.contato = pagina(v, 'contato', 'contato/', 'Contato', `Rua Raul Pompeia, 77, 5º andar, Savassi, Belo Horizonte. ${E.tel}. ${E.email}.`, contatoPag(v));
  return p;
}
