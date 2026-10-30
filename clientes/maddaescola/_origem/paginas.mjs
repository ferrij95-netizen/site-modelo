// Monta as páginas das versões A ("Casinha": fundo lilás com textura, cabeçalho branco de borda recortada e
// logo redondo como no site atual, menu colorido, pilares em zigue-zague) e B ("Jardim": clara, colagem de fotos
// em círculos como o logo, faixa de fatos, espaços com foto fixa que troca, rodapé roxo).
// Estilos em public/assets/{base,a,b}.css.
import { empresa as E, fotos, boasVindas, pilares, espacos, servicos, servicosExtras } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (n, extra = '', cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(fotos[n][2])}" width="${fotos[n][0]}" height="${fotos[n][1]}"${extra.includes('loading=') ? '' : ' loading="lazy"'} decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';

export const nomesVersao = { a: 'Casinha', b: 'Jardim' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'madda', nome: 'Maddá', caminho: 'madda/' },
  { slug: 'estrutura', nome: 'Estrutura', caminho: 'estrutura/' },
  { slug: 'bebe-online', nome: 'Bebê Online', caminho: 'bebe-online/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  relogio: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M5 4L3 6M19 4l2 2"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  gota: '<path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 002.5 2.5"/>',
  colher: '<path d="M8 3v7a2 2 0 004 0V3M10 10v11M17 3c-1.7 0-3 2-3 5s1.3 4 3 4v9"/>',
  livro: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 21V5M9 7h6"/>',
  tela: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><circle cx="12" cy="10" r="2.2"/>',
  coracao: '<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>',
  chave: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l2 2M15 8l2 2"/>',
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  mouse: '<rect x="7" y="3" width="10" height="16" rx="5"/><path d="M12 7v3"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#F1DFFA' : '#FFFFFF'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual, i) => `<a class="n${i}" href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 120, cls = 'logo') => `<img class="${cls}" src="/assets/logo.png" alt="Maddá Kids House" width="${w}" height="${w}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btn = (href, txt, cls = 'btn') => `<a class="${cls}" href="${href}">${txt} ${ic('seta')}</a>`;

function topo(v, atual) {
  const links = nav.map((n, i) => link(v, n, atual, i)).join('');
  if (v === 'a') return `<div class="faixa-info"><div class="in">
  <p>${ic('relogio')}<span><b>Horários</b>${E.horario}</span></p>
  <p>${ic('mail')}<span><b>Fale com a gente</b><a href="mailto:${E.email}">${E.email}</a></span></p>
  <p>${ic('tel')}<span><b>Agende uma visita</b><a href="${E.telHref}">${E.telefone}</a></span></p>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Maddá Kids House, início">${logo(150)}</a>
  <p class="slogan"><span>A segunda casa<br>da sua criança.</span><small>${E.lema}</small></p>
  ${menuBtn}
  <nav id="menu" class="menu" aria-label="Principal">${links}</nav>
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Maddá Kids House, início">${logo(72)}<span>A segunda casa<br>da sua criança.</span></a>
  ${menuBtn}
  <nav id="menu" class="menu" aria-label="Principal">${links}<a class="menu-cta" href="${E.telHref}">${ic('tel')} ${E.telefone}</a></nav>
</div></header>`;
}

function rodape(v) {
  const links = nav.map((n, i) => link(v, n, '', i)).join('');
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(96)}<p>${E.slogan}<br>${E.lema}</p></div>
  <div><h2>Navegue</h2><nav aria-label="Rodapé">${links}</nav></div>
  <div><h2>Contato</h2>
    <p>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</span></p>
    <p>${ic('tel')}<a href="${E.telHref}">${E.telefone}</a></p>
    <p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>
    <p>${ic('relogio')}<span>${E.horario}</span></p>
  </div>
</div>
<p class="rod-fim">© ${E.nome}. Berçário e Educação Infantil em Belo Horizonte. Prévia feita pela Overtus.</p>
</footer>`;
}

const pagina = (v, slug, titulo, desc, corpo) => {
  const n = nav.find(x => x.slug === slug);
  return `${head(v, n.caminho, titulo, desc)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>`;
};

// ---------- blocos comuns ----------
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<span><b>Endereço</b>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
  <li>${ic('tel')}<span><b>Telefone</b><a href="${E.telHref}">${E.telefone}</a></span></li>
  <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
  <li>${ic('relogio')}<span><b>Horário</b>Segunda a sexta, das 7h às 19h</span></li>
</ul>`;
const mapa = () => `<figure class="mapa"><iframe src="${E.mapa}" title="Mapa: ${E.rua}, ${E.bairro}, Belo Horizonte" loading="lazy"></iframe><figcaption><a href="${E.mapaLink}" target="_blank" rel="noopener">Abrir mapa maior</a></figcaption></figure>`;
const form = () => `<form class="form" data-form>
  <div class="campo"><label for="f-nome">Seu nome</label><input id="f-nome" name="nome" autocomplete="name" required></div>
  <div class="campo"><label for="f-tel">Telefone ou WhatsApp</label><input id="f-tel" name="telefone" type="tel" autocomplete="tel" required></div>
  <div class="campo"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
  <div class="campo"><label for="f-idade">Idade da criança</label><input id="f-idade" name="idade" placeholder="Ex.: 1 ano e 3 meses"></div>
  <div class="campo campo-l"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="mensagem" rows="4" placeholder="Quero agendar uma visita, saber sobre vagas..."></textarea></div>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Esta é uma prévia: a mensagem não foi enviada. No site publicado ela chega no e-mail da escola.</p>
</form>`;

// ================= VERSÃO A =================
const A = {};
const cabA = (titulo, sub, f) => `<section class="cab-a"><div class="in">
  <div><p class="eyebrow">Maddá Kids House</p><h1>${titulo}</h1><p>${sub}</p></div>
  ${f ? `<div class="cab-foto">${foto(f, ja)}</div>` : ''}
</div></section>`;

const pilaresA = () => `<section class="pilares-a" id="pilares" data-secao="Pilares"><div class="in">
  <h2 class="tit-c">Amor ao ensinar, cuidar e estimular</h2>
  <p class="sub-c">As três palavras que a Maddá escolheu para o próprio lema e que guiam o dia a dia na escola.</p>
  <div class="pilares-caixa"><svg class="trilha" viewBox="0 0 1000 900" preserveAspectRatio="none" aria-hidden="true"><path d="M150 282C320 340 690 250 850 318"/><path d="M850 586C690 652 320 560 150 620"/></svg>
  <ol>${pilares.map((p, i) => `<li class="pilar c-${p.cor}">
    <div class="pilar-foto">${foto(p.foto)}</div>
    <div class="pilar-txt"><span class="pilar-n">${i + 1}</span><h3>${p.verbo}</h3><p>${p.texto}</p></div>
  </li>`).join('')}</ol></div>
</div></section>`;

const espacosA = (todos = false) => {
  const lista = todos ? espacos : espacos.filter(e => e.foto);
  if (!todos) return `<section class="mosaico" id="estrutura" data-secao="Estrutura"><div class="in">
  <div class="mosaico-cab"><h2>Cada canto pensado para a criança</h2>${btn('/a/estrutura/', 'Conheça a estrutura', 'link-seta')}</div>
  <div class="mosaico-grade">${lista.map(e => `<a href="/a/estrutura/#${e.id}" class="m-${e.id}">${foto(e.foto)}<span>${e.nome}</span></a>`).join('')}</div>
</div></section>`;
  return `<section class="espacos-a"><div class="in">${lista.map((e, i) => `<article class="espaco${i % 2 ? ' inv' : ''}" id="${e.id}">
    <div class="espaco-midia${e.foto ? '' : ' sem-foto'}">${e.foto ? foto(e.foto) : `<div class="ilustra">${ic(e.icone, 'ic-g')}</div>`}</div>
    <div class="espaco-txt"><span class="num">${String(i + 1).padStart(2, '0')}</span><h2>${e.nome}</h2><p>${e.texto}</p></div>
  </article>`).join('')}</div></section>`;
};

const visitaA = () => `<section class="visita-a" id="visita" data-secao="Visita"><div class="in">
  <div><h2>Venha conhecer a Maddá</h2><p>Agende uma visita e conheça o berçário, as salas e o parquinho pessoalmente.</p>${contatoLista()}<a class="btn" href="${E.telHref}">${ic('tel')} Ligar para ${E.telefone}</a></div>
  ${mapa()}
</div></section>`;

A.index = () => pagina('a', 'index', `${E.nome} · Berçário e Educação Infantil em BH`, `${E.slogan} ${E.lema} Berçário e educação infantil no Santo Agostinho, Belo Horizonte.`, `
<section class="hero-a" data-secao="Início"><div class="in">
  <div class="hero-txt">
    <p class="selo">Berçário e Educação Infantil · Santo Agostinho, BH</p>
    <h1><span>Matrículas</span> <span>abertas</span></h1>
    <p class="hero-sub">${E.slogan} ${E.lema}</p>
    <div class="hero-bts"><a class="btn" href="/a/contato/">Agende uma visita ${ic('seta')}</a><a class="btn btn-2" href="${E.telHref}">${ic('tel')} ${E.telefone}</a></div>
  </div>
  <div class="hero-fotos"><div class="recorte r1">${foto('musica', ja)}</div><div class="recorte r2">${foto('bebe-brincando', ja)}</div><img class="hero-logo" src="/assets/logo.png" alt="" width="150" height="150"></div>
</div>
<a class="rolar" href="#bem-vindo">${ic('mouse')}<span>rolar</span></a>
</section>
<nav class="pontos" aria-label="Navegue pelo site"><span>Navegue<br>pelo site</span></nav>

<section class="bem-vindo" id="bem-vindo" data-secao="Bem-vindo"><div class="in">
  <h2>Bem-vindo!</h2>
  <p class="destaque">${boasVindas}</p>
  <p>A Maddá Kids House é berçário e escola de educação infantil no bairro Santo Agostinho, em Belo Horizonte. Aqui a criança encontra um ambiente seguro, acolhedor e cheio de estímulos para crescer, de segunda a sexta, das 7h às 19h.</p>
  ${btn('/a/madda/', 'Conheça a Maddá', 'link-seta')}
</div></section>

${pilaresA()}
${espacosA()}

<section class="fases-a" data-secao="Turmas"><div class="in">
  ${servicos.map(s => `<a class="fase c-${s.cor}" href="/a/servicos/">${foto(s.foto)}<span class="fase-txt"><h2>${s.nome}</h2><p>${s.texto}</p><span class="link-seta">Ver serviços ${ic('seta')}</span></span></a>`).join('')}
</div></section>

<section class="online-a" data-secao="Bebê Online"><div class="in">
  ${ic('tela', 'ic-g')}
  <div><h2>Bebê Online</h2><p>Acompanhe o dia do seu filho na Maddá mesmo à distância.</p></div>
  ${btn('/a/bebe-online/', 'Saiba como funciona', 'btn btn-claro')}
</div></section>

${visitaA()}`);

A.madda = () => pagina('a', 'madda', `A Maddá · ${E.nome}`, 'Conheça a Maddá Kids House: berçário e educação infantil com proposta socioconstrutivista no Santo Agostinho, BH.', `
${cabA('A segunda casa<br>da sua criança', boasVindas, 'musica')}
<section class="texto-a"><div class="in duas">
  <div><h2>Quem somos</h2><p>A Maddá Kids House é berçário e escola de educação infantil no bairro Santo Agostinho, em Belo Horizonte. Recebemos as crianças de segunda a sexta, das 7h às 19h, num espaço preparado para cada fase: dos primeiros meses no berçário até as turmas da educação infantil.</p></div>
  <div><h2>Como ensinamos</h2><p>Nossa proposta é socioconstrutivista: a criança constrói o conhecimento brincando, convivendo com os colegas e com os educadores e explorando o ambiente. O trabalho em sala segue um sistema de ensino com material didático para cada fase.</p></div>
</div></section>
${pilaresA()}
<section class="galeria-a"><div class="in">
  <h2 class="tit-c">Um pouco do nosso dia</h2>
  <div class="galeria">${['miniquadra-mascaras', 'bercario-tatame', 'sala-espaco', 'parquinho', 'bebe-brincando', 'sala-casinhas'].map(f => `<figure>${foto(f)}</figure>`).join('')}</div>
</div></section>
${visitaA()}`);

A.estrutura = () => pagina('a', 'estrutura', `Estrutura · ${E.nome}`, 'Berçário, parquinho, miniquadra, salas de aula, banheiros e cozinha planejados para as crianças.', `
${cabA('Estrutura', 'Espaços planejados para o tamanho, a segurança e a curiosidade das crianças.', 'bercario-casinha')}
${espacosA(true)}
<section class="galeria-a tom"><div class="in">
  <h2 class="tit-c">Mais fotos da escola</h2>
  <div class="galeria">${['bercario-sala', 'sala-ovelha', 'sala-espaco'].map(f => `<figure>${foto(f)}</figure>`).join('')}</div>
</div></section>
${visitaA()}`);

A['bebe-online'] = () => pagina('a', 'bebe-online', `Bebê Online · ${E.nome}`, 'Bebê Online: acompanhe o dia do seu filho na Maddá à distância.', `
${cabA('Bebê Online', 'O canal da Maddá para as famílias acompanharem o dia do filho à distância.', 'bercario-tatame')}
<section class="online-pag"><div class="in">
  <div class="online-passos">
    <div>${ic('chave', 'ic-g')}<h2>Acesso da família</h2><p>O acesso é pessoal e liberado pela secretaria para os pais e responsáveis.</p></div>
    <div>${ic('tela', 'ic-g')}<h2>De onde estiver</h2><p>Pelo computador ou pelo celular, com o login que a escola fornece.</p></div>
    <div>${ic('coracao', 'ic-g')}<h2>Mais tranquilidade</h2><p>Acompanhar a rotina ajuda a família e a escola a cuidarem juntas da criança.</p></div>
  </div>
  <div class="online-cta"><p>Ainda não tem acesso? Fale com a secretaria.</p><a class="btn" href="${E.telHref}">${ic('tel')} ${E.telefone}</a><a class="btn btn-2" href="mailto:${E.email}">${ic('mail')} Enviar e-mail</a></div>
</div></section>`);

A.servicos = () => pagina('a', 'servicos', `Serviços · ${E.nome}`, 'Berçário e educação infantil das 7h às 19h, alimentação conforme o pediatra e material didático.', `
${cabA('Serviços', 'Do berçário à educação infantil, de segunda a sexta, das 7h às 19h.', 'sala-casinhas')}
<section class="fases-a fases-pag"><div class="in">
  ${servicos.map(s => `<div class="fase c-${s.cor}">${foto(s.foto)}<span class="fase-txt"><h2>${s.nome}</h2><p>${s.texto}</p></span></div>`).join('')}
</div></section>
<section class="extras-a"><div class="in">
  <h2 class="tit-c">No dia a dia</h2>
  <ul>${servicosExtras.map(x => `<li>${ic(x.icone, 'ic-g')}<h3>${x.titulo}</h3><p>${x.texto}</p></li>`).join('')}</ul>
</div></section>
${visitaA()}`);

A.contato = () => pagina('a', 'contato', `Contato · ${E.nome}`, `Agende uma visita: ${E.telefone}, ${E.email}. ${E.rua}, ${E.bairro}, BH.`, `
${cabA('Contato', 'Agende uma visita ou tire suas dúvidas sobre vagas e turmas.', null)}
<section class="contato-a"><div class="in">
  <div>${contatoLista()}${mapa()}</div>
  <div class="form-caixa"><h2>Fale com a gente</h2>${form()}</div>
</div></section>`);

// ================= VERSÃO B =================
const B = {};
const cabB = (titulo, sub, f) => `<section class="cab-b${f ? '' : ' sem-foto'}"><div class="in">
  <div class="cab-txt"><p class="eyebrow">Maddá Kids House</p><h1>${titulo}</h1><p>${sub}</p></div>
  ${f ? `<div class="cab-circulo">${foto(f, ja)}</div>` : ''}
</div></section>`;

const fatos = () => `<section class="fatos"><div class="in">
  <p>${ic('casa')}<span><b>Berçário e Educação Infantil</b>uma escola para os primeiros anos</span></p>
  <p>${ic('relogio')}<span><b>7h às 19h</b>de segunda a sexta</span></p>
  <p>${ic('livro')}<span><b>Socioconstrutivista</b>com material didático</span></p>
  <p>${ic('pin')}<span><b>Santo Agostinho</b>Belo Horizonte</span></p>
</div></section>`;

const trocaB = () => `<section class="troca" data-troca><div class="in">
  <div class="troca-cab"><p class="eyebrow">Estrutura</p><h2>Os espaços da Maddá</h2></div>
  <div class="troca-grade">
    <div class="troca-midia">${espacos.map((e, i) => `<figure class="${i ? '' : 'on'}${e.foto ? '' : ' sem-foto'}">${e.foto ? foto(e.foto) : `<div class="ilustra">${ic(e.icone, 'ic-g')}<span>${e.nome}</span></div>`}</figure>`).join('')}</div>
    <ol class="troca-passos">${espacos.map((e, i) => `<li data-passo="${i}" id="${e.id}"><div class="troca-mob">${e.foto ? foto(e.foto) : ''}</div><h3>${e.nome}</h3><p>${e.texto}</p></li>`).join('')}</ol>
  </div>
</div></section>`;

const tiraB = fs => `<section class="tira"><div class="tira-faixa" tabindex="0" aria-label="Fotos da escola">${fs.map(f => `<figure>${foto(f, ' loading="eager"')}</figure>`).join('')}</div></section>`;

const visitaB = () => `<section class="visita-b"><div class="in">
  <div class="visita-txt"><p class="eyebrow">Visite a escola</p><h2>Conheça a Maddá pessoalmente</h2>${contatoLista()}
  <div class="bts"><a class="btn" href="/b/contato/">Agendar visita ${ic('seta')}</a><a class="btn btn-2" href="${E.telHref}">${ic('tel')} ${E.telefone}</a></div></div>
  ${mapa()}
</div></section>`;

const pilaresB = () => `<section class="pilares-b"><div class="in">
  <div class="pilares-cab"><p class="eyebrow">Nosso lema</p><h2>Amor ao ensinar, cuidar e estimular</h2></div>
  <ol>${pilares.map((p, i) => `<li class="c-${p.cor}"><span class="pb-n">0${i + 1}</span><h3>${p.verbo}</h3><p>${p.texto}</p></li>`).join('')}</ol>
</div></section>`;

B.index = () => pagina('b', 'index', `${E.nome} · Berçário e Educação Infantil em BH`, `${E.slogan} ${E.lema} Berçário e educação infantil no Santo Agostinho, Belo Horizonte.`, `
<section class="hero-b"><div class="in">
  <div class="hero-txt">
    <p class="fita">Matrículas abertas</p>
    <h1>A segunda casa da sua criança.</h1>
    <p class="hero-sub">${E.lema} Berçário e educação infantil no Santo Agostinho, em Belo Horizonte.</p>
    <div class="bts"><a class="btn" href="/b/contato/">Agende uma visita ${ic('seta')}</a><a class="btn btn-2" href="/b/estrutura/">Ver a estrutura</a></div>
  </div>
  <div class="colagem">
    <div class="circ c1">${foto('bercario-tatame', ja)}</div>
    <div class="circ c2">${foto('musica', ja)}</div>
    <div class="circ c3">${foto('bebe-brincando', ja)}</div>
    <img class="ovelha" src="/assets/logo.png" alt="" width="150" height="150">
  </div>
</div></section>
${fatos()}
<section class="bv-b"><div class="in">
  <div class="bv-foto">${foto('miniquadra-mascaras')}</div>
  <div><p class="eyebrow">Bem-vindo!</p><h2>${boasVindas}</h2><p>Na Maddá a criança encontra um ambiente seguro, acolhedor e cheio de estímulos, com espaços do tamanho dela e uma proposta socioconstrutivista que valoriza o brincar e a convivência.</p>${btn('/b/madda/', 'Conheça a Maddá', 'link-seta')}</div>
</div></section>
${pilaresB()}
${trocaB()}
${tiraB(['sala-espaco', 'parquinho', 'bercario-sala', 'sala-casinhas', 'sala-ovelha', 'bercario-casinha'])}
<section class="turmas-b"><div class="in">
  ${servicos.map(s => `<div class="turma c-${s.cor}"><div class="turma-foto">${foto(s.foto)}</div><h2>${s.nome}</h2><p>${s.texto}</p></div>`).join('')}
  <div class="turma-online">${ic('tela', 'ic-g')}<h2>Bebê Online</h2><p>Acompanhe o dia do seu filho à distância, com acesso liberado pela secretaria.</p>${btn('/b/bebe-online/', 'Como funciona', 'link-seta')}</div>
</div></section>
${visitaB()}`);

B.madda = () => pagina('b', 'madda', `A Maddá · ${E.nome}`, 'Conheça a Maddá Kids House: berçário e educação infantil com proposta socioconstrutivista no Santo Agostinho, BH.', `
${cabB('A segunda casa da sua criança', boasVindas, 'musica')}
${fatos()}
<section class="texto-b"><div class="in">
  <div><h2>Quem somos</h2><p>A Maddá Kids House é berçário e escola de educação infantil no bairro Santo Agostinho, em Belo Horizonte. Recebemos as crianças de segunda a sexta, das 7h às 19h, num espaço preparado para cada fase: dos primeiros meses no berçário até as turmas da educação infantil.</p></div>
  <div><h2>Como ensinamos</h2><p>Nossa proposta é socioconstrutivista: a criança constrói o conhecimento brincando, convivendo com os colegas e com os educadores e explorando o ambiente. O trabalho em sala segue um sistema de ensino com material didático para cada fase.</p></div>
</div></section>
${pilaresB()}
${tiraB(['miniquadra-mascaras', 'bercario-tatame', 'sala-espaco', 'parquinho', 'bebe-brincando', 'sala-casinhas'])}
${visitaB()}`);

B.estrutura = () => pagina('b', 'estrutura', `Estrutura · ${E.nome}`, 'Berçário, parquinho, miniquadra, salas de aula, banheiros e cozinha planejados para as crianças.', `
${cabB('Estrutura', 'Espaços planejados para o tamanho, a segurança e a curiosidade das crianças.', 'parquinho')}
${trocaB()}
${tiraB(['bercario-sala', 'sala-ovelha', 'sala-espaco', 'musica', 'bercario-casinha'])}
${visitaB()}`);

B['bebe-online'] = () => pagina('b', 'bebe-online', `Bebê Online · ${E.nome}`, 'Bebê Online: acompanhe o dia do seu filho na Maddá à distância.', `
${cabB('Bebê Online', 'O canal da Maddá para as famílias acompanharem o dia do filho à distância.', 'bercario-sala')}
<section class="online-b"><div class="in">
  <ol>
    <li>${ic('chave', 'ic-g')}<div><h2>Acesso da família</h2><p>O acesso é pessoal e liberado pela secretaria para os pais e responsáveis.</p></div></li>
    <li>${ic('tela', 'ic-g')}<div><h2>De onde estiver</h2><p>Pelo computador ou pelo celular, com o login que a escola fornece.</p></div></li>
    <li>${ic('coracao', 'ic-g')}<div><h2>Mais tranquilidade</h2><p>Acompanhar a rotina ajuda a família e a escola a cuidarem juntas da criança.</p></div></li>
  </ol>
  <div class="online-cta"><h2>Ainda não tem acesso?</h2><p>Fale com a secretaria da escola.</p><a class="btn" href="${E.telHref}">${ic('tel')} ${E.telefone}</a><a class="btn btn-2" href="mailto:${E.email}">${ic('mail')} Enviar e-mail</a></div>
</div></section>`);

B.servicos = () => pagina('b', 'servicos', `Serviços · ${E.nome}`, 'Berçário e educação infantil das 7h às 19h, alimentação conforme o pediatra e material didático.', `
${cabB('Serviços', 'Do berçário à educação infantil, de segunda a sexta, das 7h às 19h.', 'sala-espaco')}
<section class="turmas-b turmas-pag"><div class="in">
  ${servicos.map(s => `<div class="turma c-${s.cor}"><div class="turma-foto">${foto(s.foto)}</div><h2>${s.nome}</h2><p>${s.texto}</p></div>`).join('')}
</div></section>
<section class="extras-b"><div class="in">
  <h2>No dia a dia</h2>
  <dl>${servicosExtras.map(x => `<div>${ic(x.icone, 'ic-g')}<dt>${x.titulo}</dt><dd>${x.texto}</dd></div>`).join('')}</dl>
</div></section>
${visitaB()}`);

B.contato = () => pagina('b', 'contato', `Contato · ${E.nome}`, `Agende uma visita: ${E.telefone}, ${E.email}. ${E.rua}, ${E.bairro}, BH.`, `
${cabB('Contato', 'Agende uma visita ou tire suas dúvidas sobre vagas e turmas.', null)}
<section class="contato-b"><div class="in">
  <div class="form-caixa"><h2>Envie uma mensagem</h2>${form()}</div>
  <div>${contatoLista()}${mapa()}</div>
</div></section>`);

export function gerarVersao(v) {
  const P = v === 'a' ? A : B;
  return Object.fromEntries(nav.map(n => [n.slug, P[n.slug]()]));
}
