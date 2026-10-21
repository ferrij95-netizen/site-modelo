// Monta as páginas das versões A ("Usinagem": fiel ao site atual, preto e branco, faixa diagonal dos banners, os quatro setores
// com a moldura de linha fina, bloco preto "Mazzer Equipamentos") e B ("Prancheta": clara, folha de desenho técnico com carimbo,
// catálogo único com filtro e busca). Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, sobre, setores, grupos, textoPadrao, equipamentos, porSlug, processo, reformas } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const nomesVersao = { a: 'Usinagem', b: 'Prancheta' };

const navs = {
  a: [
    { slug: 'index', nome: 'Home', caminho: '' },
    { slug: 'empresa', nome: 'A Empresa', caminho: 'empresa/' },
    { slug: 'papel-e-celulose', nome: 'Papel e Celulose', caminho: 'papel-e-celulose/' },
    { slug: 'acucar-e-etanol', nome: 'Açúcar e Etanol', caminho: 'acucar-e-etanol/' },
    { slug: 'manutencao', nome: 'Manutenção e Recuperação', caminho: 'manutencao/' },
    { slug: 'mineracao', nome: 'Mineração', caminho: 'mineracao/' },
    { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
  ],
  b: [
    { slug: 'index', nome: 'Início', caminho: '' },
    { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
    { slug: 'equipamentos', nome: 'Equipamentos', caminho: 'equipamentos/' },
    { slug: 'manutencao', nome: 'Reformas', caminho: 'manutencao/' },
    { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
  ],
};

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  arrasta: '<path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const img = (f, alt = '', { w, h, cls = '', lazy = true } = {}) => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${f}" alt="${esc(alt)}"${w ? ` width="${w}" height="${h}"` : ''}${lazy ? ' loading="lazy" decoding="async"' : ''}>`;
const fotoEq = (e, k = 0, extra = {}) => { const f = e.fotos[k]; return f ? img(`eq/${f.f}`, e.nome, { w: f.w, h: f.h, cls: f.desenho ? 'desenho' : '', ...extra }) : ''; };
const capa = e => e.fotos.find(f => !f.desenho) || e.fotos[0];
const fotoCapa = (e, extra = {}) => { const f = capa(e); return f ? img(`eq/${f.f}`, e.nome, { w: f.w, h: f.h, cls: f.desenho ? 'desenho' : '', ...extra }) : `<span class="sem-foto">${esc(e.nome)}<small>foto sob consulta</small></span>`; };
const urlEq = (v, e) => `/${v}/equipamentos/${e.slug}/`;
const doGrupo = g => equipamentos.filter(e => e.grupo === g);
const btnOrc = (e, cls = '') => `<button class="add ${cls}" type="button" data-item="${esc(e.nome)}" aria-label="Adicionar ${esc(e.nome)} ao orçamento">${ic('mais', 'ic i-mais')}${ic('ok', 'ic i-ok')}<span class="t-add">Orçar</span><span class="t-on">Na lista</span></button>`;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao, og = `og-${v}.jpg`) {
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
<meta property="og:image" content="${E.url}assets/${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#0b0b0b' : '#f2f2ee'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => navs[v].map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const orcLink = v => `<a class="btn-orc" href="/${v}/contato/#orcamento" aria-label="Lista de orçamento">${ic('lista')}<span>Orçamento</span><b class="orc-n" hidden>0</b></a>`;

function topo(v, atual) {
  const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu', 'ic i-menu')}${ic('x', 'ic i-x')}</button>`;
  if (v === 'a') return `<div class="faixa"><div class="in">
  <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <a href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
  <span class="so-pc">${ic('relogio')} ${E.horario}</span>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Mazzer Equipamentos Industriais, página inicial"><img src="/assets/logo.svg" alt="Mazzer Equipamentos Industriais" width="250" height="60"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${orcLink(v)}
  ${menuBtn}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Mazzer Equipamentos Industriais, página inicial"><img src="/assets/logo.svg" alt="Mazzer Equipamentos Industriais" width="200" height="48"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  ${orcLink(v)}
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  if (v === 'a') return `<footer class="rodape"><div class="in">
  <div><h2>Sobre nós</h2><img class="rod-logo" src="/assets/logo.svg" alt="Mazzer Equipamentos Industriais" width="230" height="55" loading="lazy"><p>Equipamentos e peças para papel e celulose, açúcar e etanol, desde ${E.desde} em Sertãozinho.</p></div>
  <nav aria-label="Rodapé"><h2>Menu</h2>${menu(v, '')}</nav>
  <div><h2>Localização</h2><p>${E.endereco.join('<br>')}<br>Fone: <a href="tel:${E.foneHref}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a></p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Traçar rota</a></div>
  <div><h2>Horário</h2><p>Segunda a quinta<br>07:00 às 17:00<br>Sexta<br>07:00 às 16:00</p></div>
</div><p class="rod-fim">© ${E.nome} · Sertãozinho, SP</p></footer>`;
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Mazzer Equipamentos Industriais" width="230" height="55" loading="lazy"><p>Projeto, usinagem, fabricação e reforma de equipamentos industriais desde ${E.desde}.</p></div>
  <div><h2>Fábrica</h2><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h2>Contato</h2><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a><br>${E.horario}</p></div>
  <nav aria-label="Rodapé"><h2>Site</h2>${menu(v, '')}</nav>
</div><p class="rod-fim"><span>© ${E.nome}</span><span>Sertãozinho · SP · Brasil</span></p></footer>`;
}

const pagina = (v, slug, caminho, titulo, descricao, corpo, og) => `${head(v, caminho, titulo, descricao, og)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- peças comuns ----------
const tabela = e => e.tabela ? `<div class="tab-rola"><table class="tab"><thead><tr>${e.tabela[0].map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${e.tabela.slice(1).map(r => `<tr>${r.map((c, k) => k ? `<td>${esc(c)}</td>` : `<th scope="row">${esc(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';

// Antes e depois com controle de arrastar (range), sem dependências.
const antesDepois = (antes, depois, nome) => `<div class="aa" style="--p:50%">
  ${img(depois, `${nome} depois da reforma`, { w: 468, h: 268 })}
  <div class="aa-antes">${img(antes, `${nome} antes da reforma`, { w: 468, h: 268 })}</div>
  <span class="aa-et aa-et-a">Antes</span><span class="aa-et aa-et-d">Depois</span>
  <span class="aa-linha" aria-hidden="true"><b>${ic('arrasta')}</b></span>
  <input type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois: ${esc(nome)}">
</div>`;

function galeria(e) {
  if (!e.fotos.length) return `<div class="gal gal-vazia"><span class="sem-foto">${esc(e.nome)}<small>Foto sob consulta</small></span></div>`;
  const ordem = [...e.fotos.filter(f => !f.desenho), ...e.fotos.filter(f => f.desenho)];
  const um = ordem[0];
  return `<div class="gal" data-gal>
  <figure class="gal-principal${um.desenho ? ' eh-desenho' : ''}">${img(`eq/${um.f}`, e.nome, { w: um.w, h: um.h, cls: um.desenho ? 'desenho' : '', lazy: false })}${um.desenho ? '<figcaption>Desenho técnico</figcaption>' : ''}</figure>
  ${ordem.length > 1 ? `<div class="gal-mini" role="list">${ordem.map((f, k) => `<button type="button" role="listitem" data-src="/assets/img/eq/${f.f}" data-desenho="${f.desenho ? 1 : 0}" data-w="${f.w}" data-h="${f.h}"${k ? '' : ' aria-current="true"'} aria-label="${f.desenho ? 'Desenho técnico' : `Foto ${k + 1}`}"><img src="/assets/img/eq/${f.f}" alt="" loading="lazy" width="${f.w}" height="${f.h}"${f.desenho ? ' class="desenho"' : ''}></button>`).join('')}</div>` : ''}
</div>`;
}

function detalhe(v, e) {
  const g = grupos[e.grupo], s = setores[e.setor];
  const textos = e.texto.length ? e.texto : [textoPadrao[e.grupo]];
  const irmaos = doGrupo(e.grupo), k = irmaos.indexOf(e);
  const ant = irmaos[(k - 1 + irmaos.length) % irmaos.length], prox = irmaos[(k + 1) % irmaos.length];
  const linkGrupo = v === 'a' ? `/a/${e.setor === 'papel' ? 'papel-e-celulose' : 'acucar-e-etanol'}/#${e.grupo}` : `/b/equipamentos/#${e.grupo}`;
  const trilha = v === 'a'
    ? `<a href="/a/">Home</a><span>/</span><a href="/a/${e.setor === 'papel' ? 'papel-e-celulose' : 'acucar-e-etanol'}/">${s.nome}</a><span>/</span><a href="${linkGrupo}">${g.nome}</a>`
    : `<a href="/b/equipamentos/">Equipamentos</a><span>/</span><a href="${linkGrupo}">${g.nome}</a>`;
  const assunto = `Orçamento: ${e.nome}`;
  const outros = irmaos.filter(x => x !== e).slice(0, 8);
  const corpo = `<div class="eq-topo"><div class="in"><nav class="trilha" aria-label="Você está aqui">${trilha}</nav></div></div>
<section class="eq-det"><div class="in">
  ${galeria(e)}
  <div class="eq-info">
    <p class="eq-grupo">${esc(g.nome)}</p>
    <h1>${esc(e.nome)}</h1>
    ${textos.map(t => `<p>${esc(t)}</p>`).join('')}
    ${e.tabela ? `<h2 class="eq-sub">Modelos</h2>${tabela(e)}` : ''}
    <p class="eq-encomenda">Fabricamos também sob encomenda, conforme desenho ou padrão da sua máquina.</p>
    <div class="eq-acoes">
      ${btnOrc(e, 'add-grande')}
      <a class="btn btn-linha" href="mailto:${E.email}?subject=${encodeURIComponent(assunto)}">${ic('mail')} Pedir por e-mail</a>
      <a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
    </div>
  </div>
</div></section>
<nav class="eq-nav" aria-label="Outros equipamentos"><div class="in">
  <a href="${urlEq(v, ant)}" rel="prev"><small>Anterior</small>${esc(ant.nome)}</a>
  <a href="${linkGrupo}" class="eq-nav-meio">Todos de ${esc(g.nome)}</a>
  <a href="${urlEq(v, prox)}" rel="next"><small>Próximo</small>${esc(prox.nome)}</a>
</div></nav>
<section class="eq-outros"><div class="in">
  <h2>Mais em ${esc(g.nome)}</h2>
  <ul class="fila">${outros.map(x => `<li><a href="${urlEq(v, x)}"><span class="fila-img">${fotoCapa(x)}</span><span>${esc(x.nome)}</span></a></li>`).join('')}</ul>
</div></section>`;
  const desc = (e.texto[0] || `${e.nome}: ${textoPadrao[e.grupo]}`).slice(0, 155);
  return pagina(v, 'equipamento', `equipamentos/${e.slug}/`, `${e.nome} | ${E.nome}`, desc, corpo);
}

const formOrc = v => `<form class="form" data-mailto="${E.email}" data-assunto="Pedido de orçamento pelo site">
  <div class="orc-box" id="orcamento">
    <h3>${ic('lista')} Sua lista de orçamento</h3>
    <div data-orc-lista><p class="orc-vazia">Nenhum item ainda. Use o botão "Orçar" nos equipamentos ou descreva abaixo o que precisa.</p></div>
    <input type="hidden" name="Itens" data-orc-campo>
  </div>
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Empresa<input name="Empresa" autocomplete="organization"></label>
    <label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label class="larga">Mensagem<textarea name="Mensagem" rows="5" placeholder="Equipamento, medidas, quantidade, se é peça nova ou reforma"></textarea></label>
  </div>
  <button class="btn btn-cheio" type="submit">${ic('mail')} Enviar pedido</button>
  <p class="form-nota">O botão abre o seu e-mail com tudo preenchido para ${E.email}.</p>
</form>`;

// =====================================================================
// VERSÃO A · Usinagem
// =====================================================================
function homeA() {
  const sets = ['papel', 'acucar', 'manutencao', 'mineracao'];
  const linksSet = { papel: 'papel-e-celulose/', acucar: 'acucar-e-etanol/', manutencao: 'manutencao/', mineracao: 'mineracao/' };
  const slides = [
    { f: 'setor-papel.webp', t: 'Papel e celulose', l: 'papel-e-celulose/' },
    { f: 'banner-moenda.webp', t: 'Açúcar e etanol', l: 'acucar-e-etanol/' },
    { f: 'setor-manutencao.webp', t: 'Manutenção e recuperação', l: 'manutencao/' },
  ];
  return `<section class="hero">
  <div class="hero-fotos" data-slides>${slides.map((s, k) => `<figure class="${k ? '' : 'on'}">${img(s.f, '', { lazy: k > 0 })}</figure>`).join('')}</div>
  <div class="hero-faixa" aria-hidden="true"></div>
  <div class="in hero-txt">
    <p class="selo-l">Sertãozinho · SP · desde ${E.desde}</p>
    <h1>Equipamentos industriais para papel e celulose, açúcar e etanol</h1>
    <p class="hero-sub">Fabricação, usinagem e reforma de equipamentos e peças de reposição, com projeto próprio e fabricação sob encomenda.</p>
    <div class="hero-bts"><a class="btn btn-claro" href="/a/papel-e-celulose/">Ver equipamentos ${ic('seta')}</a><a class="btn btn-fio" href="/a/contato/">Pedir orçamento</a></div>
    <div class="hero-pontos" data-slides-pontos aria-label="Fotos"></div>
  </div>
</section>
<section class="numeros"><div class="in">
  <p><b>${E.desde}</b><span>início das atividades em Sertãozinho</span></p>
  <p><b>${E.area}</b><span>de área total, com usinagem própria</span></p>
  <p><b>${equipamentos.length}</b><span>equipamentos e peças no catálogo</span></p>
  <p><b>2 setores</b><span>papel e celulose · sucroenergético</span></p>
</div></section>
<section class="setores"><div class="in">
  <h2 class="tit-l">Equipamentos Industriais <span>Sertãozinho, SP</span></h2>
  <div class="setores-grade">${sets.map(k => `<a class="setor" href="/a/${linksSet[k]}">${img(setores[k].foto, '', { w: 800, h: 600 })}<span class="setor-moldura"><b>${setores[k].nome}</b></span><span class="setor-veja">Veja mais ${ic('seta')}</span></a>`).join('')}</div>
</div></section>
<section class="sobre-preto"><div class="in">
  <figure class="sobre-foto">${img('fachada.webp', 'Fachada da Mazzer no Distrito Industrial de Sertãozinho', { w: 648, h: 486 })}</figure>
  <div class="sobre-txt">
    <h2>Mazzer Equipamentos</h2>
    ${sobre.map(p => `<p>${p}</p>`).join('')}
    <a class="btn btn-claro" href="/a/empresa/">Conheça mais sobre nossa empresa ${ic('seta')}</a>
  </div>
</div></section>
<section class="processo-a"><div class="in">
  <div class="sec-cab"><p class="selo-l">Papel e celulose</p><h2>Da fibra à bobina</h2><p>A Mazzer fabrica equipamentos para quase todas as etapas da linha de papel. Toque em uma etapa para ver o equipamento.</p></div>
  <ol class="setas">${processo.map((p, k) => { const e = porSlug[p.foto]; return `<li><a href="${urlEq('a', e)}"><span class="seta-n">${String(k + 1).padStart(2, '0')}</span><span class="seta-img">${fotoCapa(e)}</span><b>${p.etapa}</b><small>${p.itens.slice(0, 3).map(s => esc(porSlug[s].nome)).join(' · ')}</small></a></li>`; }).join('')}</ol>
</div></section>
<section class="reforma-a"><div class="in">
  <div class="reforma-txt"><p class="selo-l">Manutenção e recuperação</p><h2>Antes e depois</h2><p>${setores.manutencao.texto}</p><p>Arraste a linha para comparar a prensa de sucção antes e depois da reforma feita na Mazzer.</p><a class="btn btn-escuro" href="/a/manutencao/">Ver reformas ${ic('seta')}</a></div>
  ${antesDepois('reforma-prensa-1.webp', 'reforma-prensa-3.webp', 'Prensa de sucção')}
</div></section>
<section class="cta-a"><div class="in">
  <h2>Não achou o equipamento na lista?</h2>
  <p>Também fabricamos sob encomenda. Mande o desenho, a amostra ou a medida da peça.</p>
  <div class="cta-bts"><a class="btn btn-claro" href="/a/contato/">Falar com a Mazzer ${ic('seta')}</a><a class="btn btn-fio" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
</div></section>`;
}

const cabA = (titulo, trilha, foto) => `<section class="cab-pag"${foto ? ` style="--foto:url(/assets/img/${foto})"` : ''}><div class="in"><h1>${titulo}</h1><nav class="trilha" aria-label="Você está aqui"><a href="/a/">Home</a><span>/</span>${trilha}</nav></div></section>`;

const gradeA = g => `<ul class="grade-eq">${doGrupo(g).map(e => `<li><a href="${urlEq('a', e)}"><span class="ge-img">${fotoCapa(e)}</span><b>${esc(e.nome)}</b></a>${btnOrc(e)}</li>`).join('')}</ul>`;

function papelA() {
  const gs = ['preparacao-de-massa', 'maquina-de-papel', 'pecas-papel'];
  return `${cabA('Equipamentos Industriais para Papel e Celulose', '<span>Papel e Celulose</span>', 'banner-papel-bobinas.webp')}
<section class="intro-setor"><div class="in">
  <p class="intro-grande">${setores.papel.texto}</p>
  <nav class="atalhos" aria-label="Linhas">${gs.map(g => `<a href="#${g}"><b>${doGrupo(g).length}</b>${grupos[g].nome}</a>`).join('')}<a href="/a/manutencao/"><b>${ic('seta')}</b>Manutenção e reforma</a></nav>
</div></section>
${gs.map((g, k) => `<section class="grupo${k % 2 ? ' grupo-cinza' : ''}" id="${g}"><div class="in">
  <div class="grupo-cab"><h2>${grupos[g].nome}</h2><p>${grupos[g].texto}</p></div>
  ${gradeA(g)}
</div></section>`).join('')}
<section class="cta-a"><div class="in"><h2>Também fabricamos sob encomenda</h2><p>Caso não haja na lista o equipamento que interessa à sua empresa, entre em contato.</p><div class="cta-bts"><a class="btn btn-claro" href="/a/contato/">Pedir orçamento ${ic('seta')}</a></div></div></section>`;
}

function acucarA() {
  const g = 'acucar-e-etanol';
  return `${cabA('Equipamentos Açúcar e Etanol', '<span>Açúcar e Etanol</span>', 'banner-moenda.webp')}
<section class="intro-setor intro-foto"><div class="in">
  <div><p class="intro-grande">${setores.acucar.texto}</p><p>Peças para moenda, esteira de cana, mesa alimentadora e acionamentos. Fabricamos a partir do desenho ou da amostra da peça.</p></div>
  <figure>${img('setor-acucar.webp', 'Usina de açúcar e etanol', { w: 880, h: 661 })}</figure>
</div></section>
<section class="grupo grupo-cinza" id="${g}"><div class="in">
  <div class="grupo-cab"><h2>Peças de reposição</h2><p>${grupos[g].texto}</p></div>
  ${gradeA(g)}
</div></section>
<section class="cta-a"><div class="in"><h2>Precisa de uma peça fora da lista?</h2><p>Envie o desenho ou a peça original para cotação.</p><div class="cta-bts"><a class="btn btn-claro" href="/a/contato/">Pedir orçamento ${ic('seta')}</a></div></div></section>`;
}

function reformasHtml(v) {
  return reformas.map(r => `<article class="reforma">
  <h3>${r.nome}</h3>
  ${r.antes.length === r.depois.length && r.antes.length > 1
    ? `<div class="reforma-par">${r.antes.map((a, k) => antesDepois(a, r.depois[k], r.nome)).join('')}</div>`
    : `<div class="reforma-lado"><figure><figcaption>Antes</figcaption>${img(r.antes[0], `${r.nome} antes da reforma`, { w: 468, h: 255 })}</figure><figure><figcaption>Depois</figcaption>${img(r.depois[0], `${r.nome} depois da reforma`, { w: 468, h: 251 })}</figure></div>`}
</article>`).join('');
}

function manutencaoA() {
  return `${cabA('Manutenção e Recuperação', '<span>Manutenção e Recuperação</span>', 'setor-manutencao.webp')}
<section class="intro-setor"><div class="in">
  <p class="intro-grande">${setores.manutencao.texto}</p>
  <ol class="passos-a">
    <li><b>Avaliação</b><span>A peça ou o equipamento chega à Mazzer e é desmontado e medido.</span></li>
    <li><b>Recuperação</b><span>Usinagem, troca de componentes, balanceamento e pintura.</span></li>
    <li><b>Entrega</b><span>Volta pronto para a linha, com a vida útil renovada.</span></li>
  </ol>
</div></section>
<section class="grupo grupo-cinza"><div class="in">
  <div class="grupo-cab"><h2>Confira o antes e depois</h2><p>Arraste a linha sobre as fotos da prensa de sucção para comparar.</p></div>
  ${reformasHtml('a')}
</div></section>
<section class="cta-a"><div class="in"><h2>Tem um equipamento parado?</h2><p>Atendemos itens fabricados ou não pela Mazzer.</p><div class="cta-bts"><a class="btn btn-claro" href="/a/contato/">Solicitar avaliação ${ic('seta')}</a><a class="btn btn-fio" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>`;
}

function mineracaoA() {
  return `${cabA('Mineração', '<span>Mineração</span>', 'setor-mineracao.webp')}
<section class="intro-setor intro-foto"><div class="in">
  <div><p class="intro-grande">${setores.mineracao.texto}</p><p>Com usinagem própria e ${E.area} de área, a Mazzer fabrica e recupera eixos, buchas, polias, mancais e engrenagens, como faz para usinas e fábricas de papel.</p><a class="btn btn-escuro" href="/a/contato/">Enviar desenho para cotação ${ic('seta')}</a></div>
  <figure>${img('setor-mineracao.webp', 'Mineração', { w: 715, h: 536 })}</figure>
</div></section>
<section class="grupo grupo-cinza"><div class="in">
  <div class="grupo-cab"><h2>Peças que já fabricamos</h2><p>Exemplos do catálogo que mostram o tipo de usinagem e fundição feitos na Mazzer.</p></div>
  <ul class="grade-eq">${['polias-de-acionamento', 'casquilhos-moenda', 'bucha-de-bronze', 'mancais-de-rolamentos', 'luva-de-acoplamento', 'engrenagem-estrela-arraste', 'rotor-deflaker', 'rosca-screw-feeder'].map(s => porSlug[s]).map(e => `<li><a href="${urlEq('a', e)}"><span class="ge-img">${fotoCapa(e)}</span><b>${esc(e.nome)}</b></a>${btnOrc(e)}</li>`).join('')}</ul>
</div></section>`;
}

function empresaA() {
  return `${cabA('A Empresa', '<span>A Empresa</span>', 'banner-usina.webp')}
<section class="empresa-a"><div class="in">
  <figure class="empresa-foto">${img('fachada.webp', 'Fachada da Mazzer em Sertãozinho', { w: 648, h: 486, lazy: false })}<figcaption>Rua Antônio Gatto Júnior, 111 · Distrito Industrial · Sertãozinho, SP</figcaption></figure>
  <div class="empresa-txt">${sobre.map((p, k) => `<p${k ? '' : ' class="intro-grande"'}>${p}</p>`).join('')}</div>
</div></section>
<section class="numeros numeros-claro"><div class="in">
  <p><b>${E.desde}</b><span>recuperação e desenvolvimento de equipamentos</span></p>
  <p><b>${E.area}</b><span>de área total</span></p>
  <p><b>Usinagem</b><span>reforma, aprimoramento e novos projetos</span></p>
  <p><b>Sertãozinho</b><span>polo tecnológico do setor sucroenergético</span></p>
</div></section>
<section class="setores"><div class="in">
  <h2 class="tit-l">Onde a Mazzer atua</h2>
  <div class="setores-grade">${['papel', 'acucar', 'manutencao', 'mineracao'].map(k => `<a class="setor" href="/a/${{ papel: 'papel-e-celulose/', acucar: 'acucar-e-etanol/', manutencao: 'manutencao/', mineracao: 'mineracao/' }[k]}">${img(setores[k].foto, '', { w: 800, h: 600 })}<span class="setor-moldura"><b>${setores[k].nome}</b></span><span class="setor-veja">Veja mais ${ic('seta')}</span></a>`).join('')}</div>
</div></section>`;
}

function contatoA() {
  return `${cabA('Fale Conosco', '<span>Contato</span>')}
<section class="contato"><div class="in">
  <div class="contato-info">
    <p class="intro-grande">Entre em contato com a Mazzer Equipamentos pelo formulário. Faça sua solicitação ou dê sua sugestão.</p>
    <ul class="dados">
      <li>${ic('tel')}<span><small>Telefone</small><a href="tel:${E.foneHref}">${E.fone}</a></span></li>
      <li>${ic('mail')}<span><small>E-mail</small><a href="mailto:${E.email}">${E.email}</a></span></li>
      <li>${ic('pin')}<span><small>Endereço</small>${E.endereco.join(', ')}</span></li>
      <li>${ic('relogio')}<span><small>Horário de atendimento</small>${E.horario}</span></li>
    </ul>
    <a class="btn btn-escuro" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Traçar rota</a>
  </div>
  ${formOrc('a')}
</div></section>
<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: Mazzer em Sertãozinho" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
}

// =====================================================================
// VERSÃO B · Prancheta
// =====================================================================
const carimbo = (titulo, linhas) => `<div class="carimbo"><span class="carimbo-logo"><img src="/assets/logo.svg" alt="" width="120" height="29"></span><span class="carimbo-tit">${titulo}</span>${linhas.map(([k, v]) => `<span><small>${k}</small>${v}</span>`).join('')}</div>`;

function homeB() {
  const destaque = porSlug['separador-de-plastico'];
  const lista = [
    { k: 'papel', n: '01', l: '/b/equipamentos/#preparacao-de-massa', d: 'Preparação de massa, máquina de papel, reciclagem de papel e papelão e peças de reposição.' },
    { k: 'acucar', n: '02', l: '/b/equipamentos/#acucar-e-etanol', d: 'Peças usinadas ou fundidas para moenda, esteira, mesa alimentadora e acionamentos.' },
    { k: 'manutencao', n: '03', l: '/b/manutencao/', d: 'Reforma e recuperação de qualquer item, fabricado ou não pela Mazzer.' },
    { k: 'mineracao', n: '04', l: '/b/equipamentos/#mineracao', d: 'Peças e componentes usinados sob encomenda, a partir do desenho ou da peça original.' },
  ];
  return `<section class="hero-b"><div class="in">
  <div class="hero-b-txt">
    <p class="rotulo">Sertãozinho · SP · desde ${E.desde}</p>
    <h1>Projetado, usinado e montado em Sertãozinho.</h1>
    <p class="hero-sub">Equipamentos e peças para papel e celulose, açúcar e etanol. Do desenho à reforma, com ${E.area} de fábrica.</p>
    <div class="hero-bts"><a class="btn btn-cheio" href="/b/equipamentos/">Ver os ${equipamentos.length} equipamentos ${ic('seta')}</a><a class="btn btn-linha" href="/b/contato/">Enviar desenho para cotação</a></div>
  </div>
  <div class="folha">
    <div class="folha-desenho">${fotoEq(destaque, 1, { lazy: false })}<span class="cota cota-h" aria-hidden="true"></span><span class="cota cota-v" aria-hidden="true"></span></div>
    <figure class="folha-foto">${fotoEq(destaque, 0, { lazy: false })}<figcaption>Separador de plástico na fábrica</figcaption></figure>
    ${carimbo('Separador de Plástico', [['Produção', '1500 a 2500 kg/h'], ['Potência', '30 a 50 cv'], ['Linha', 'Preparação de massa']])}
  </div>
</div></section>
<section class="frentes"><div class="in">
  <h2 class="tit-b">Quatro frentes, uma usinagem</h2>
  <ol class="frentes-lista">${lista.map(x => `<li><a href="${x.l}"><span class="fr-n">${x.n}</span><span class="fr-nome">${setores[x.k].nome}</span><span class="fr-desc">${x.d}</span><span class="fr-img">${img(setores[x.k].foto, '', { w: 400, h: 300 })}</span>${ic('seta', 'ic fr-seta')}</a></li>`).join('')}</ol>
</div></section>
<section class="processo-b" data-processo><div class="in">
  <div class="sec-cab-b"><p class="rotulo">Linha de papel</p><h2 class="tit-b">Da fibra à bobina</h2><p>Escolha uma etapa e veja o que a Mazzer fabrica para ela.</p></div>
  <div class="pb-trilho" role="tablist" aria-label="Etapas do processo">${processo.map((p, k) => `<button type="button" role="tab" id="pt-${k}" aria-controls="pp-${k}" aria-selected="${k ? 'false' : 'true'}"><span>${String(k + 1).padStart(2, '0')}</span>${p.etapa}</button>`).join('')}</div>
  ${processo.map((p, k) => { const e = porSlug[p.foto]; const des = p.itens.map(s => porSlug[s]).flatMap(x => x.fotos.filter(f => f.desenho).map(f => f.f)).find(f => f !== capa(e)?.f); return `<div class="pb-painel" role="tabpanel" id="pp-${k}" aria-labelledby="pt-${k}"${k ? ' hidden' : ''}>
    <figure class="pb-foto">${fotoCapa(e)}</figure>
    ${des ? `<figure class="pb-des">${img(`eq/${des}`, 'Desenho técnico', { cls: 'desenho' })}</figure>` : ''}
    <div class="pb-txt"><p class="pb-n">Etapa ${String(k + 1).padStart(2, '0')} de ${String(processo.length).padStart(2, '0')}</p><h3>${p.etapa}</h3><p>${p.texto}</p>
      <ul>${p.itens.map(s => `<li><a href="${urlEq('b', porSlug[s])}">${esc(porSlug[s].nome)} ${ic('seta')}</a></li>`).join('')}</ul></div>
  </div>`; }).join('')}
</div></section>
<section class="ficha"><div class="in">
  <div class="ficha-txt"><p class="rotulo">Ficha técnica</p><h2 class="tit-b">Números de catálogo, não promessa</h2><p>Os equipamentos de linha têm modelos com produção, potência e rotação definidos. O que não está na tabela, a Mazzer projeta conforme a sua máquina.</p><a class="btn btn-linha" href="${urlEq('b', porSlug['turbo-separador'])}">Ver turbo separador ${ic('seta')}</a></div>
  <div class="ficha-tab"><p class="ficha-nome">Turbo Separador · TS</p>${tabela(porSlug['turbo-separador'])}<p class="ficha-nome">Engrossador de Massa · EG</p>${tabela(porSlug['engrossador-de-massa'])}</div>
</div></section>
<section class="reforma-b"><div class="in">
  ${antesDepois('reforma-prensa-2.webp', 'reforma-prensa-4.webp', 'Prensa de sucção')}
  <div class="reforma-txt"><p class="rotulo">Reformas</p><h2 class="tit-b">A mesma peça, depois de passar pela Mazzer</h2><p>${setores.manutencao.texto}</p><a class="btn btn-cheio" href="/b/manutencao/">Ver reformas ${ic('seta')}</a></div>
</div></section>
<section class="contato-b"><div class="in">
  <h2 class="tit-b">Mande o desenho. A gente devolve o orçamento.</h2>
  <div class="cb-linhas">
    <a href="tel:${E.foneHref}"><small>Telefone</small>${E.fone}</a>
    <a href="mailto:${E.email}"><small>E-mail</small>${E.email}</a>
    <a href="${E.mapa}" target="_blank" rel="noopener"><small>Fábrica</small>${E.endereco[0]}, Sertãozinho</a>
  </div>
</div></section>`;
}

function catalogoB() {
  const gs = Object.keys(grupos);
  return `<section class="cab-b"><div class="in">
  <p class="rotulo">Catálogo</p><h1 class="tit-b">Equipamentos e peças</h1>
  <p>${equipamentos.length} itens do catálogo da Mazzer. Filtre pela linha ou busque pelo nome e monte sua lista de orçamento.</p>
  <div class="filtros">
    <label class="busca">${ic('busca')}<input type="search" placeholder="Buscar: rotor, rebobinadeira, moenda..." data-busca aria-label="Buscar equipamento"></label>
    <div class="chips" role="group" aria-label="Filtrar por linha"><button type="button" data-filtro="" aria-pressed="true">Todos</button>${gs.map(g => `<button type="button" data-filtro="${g}" aria-pressed="false">${grupos[g].curto}</button>`).join('')}</div>
  </div>
</div></section>
${gs.map(g => `<section class="lin-b" id="${g}" data-linha="${g}"><div class="in">
  <div class="lin-cab"><h2>${grupos[g].nome}</h2><p>${grupos[g].texto}</p><span>${doGrupo(g).length} itens</span></div>
  <ul class="lista-b">${doGrupo(g).map(e => `<li data-busca="${esc(`${e.nome} ${grupos[g].nome} ${e.texto.join(' ')}`.toLowerCase())}"><a href="${urlEq('b', e)}"><span class="lb-img">${fotoCapa(e)}</span><span class="lb-nome">${esc(e.nome)}${e.tabela ? `<small>${e.tabela.length - 1} modelos</small>` : ''}</span><span class="lb-desc">${esc((e.texto[0] || textoPadrao[g]).slice(0, 120))}${(e.texto[0] || textoPadrao[g]).length > 120 ? '…' : ''}</span></a>${btnOrc(e)}</li>`).join('')}</ul>
</div></section>`).join('')}
<p class="sem-res" data-sem-res hidden>Nada encontrado com essa busca. A Mazzer também fabrica sob encomenda: <a href="/b/contato/">envie o desenho</a>.</p>
<section class="lin-b lin-min" id="mineracao" data-linha="mineracao"><div class="in">
  <div class="min-b"><figure>${img('setor-mineracao.webp', 'Mineração', { w: 715, h: 536 })}</figure><div><h2>Mineração e outras indústrias</h2><p>${setores.mineracao.texto}</p><a class="btn btn-cheio" href="/b/contato/">Enviar desenho ${ic('seta')}</a></div></div>
</div></section>`;
}

function empresaB() {
  return `<section class="cab-b"><div class="in"><p class="rotulo">Empresa</p><h1 class="tit-b">Mazzer Equipamentos Industriais</h1></div></section>
<section class="empresa-b"><div class="in">
  <div class="eb-txt">${sobre.map((p, k) => `<p${k ? '' : ' class="intro-b"'}>${p}</p>`).join('')}</div>
  <div class="folha folha-peq">
    <figure class="folha-foto folha-foto-solo">${img('fachada.webp', 'Fachada da Mazzer em Sertãozinho', { w: 648, h: 486, lazy: false })}</figure>
    ${carimbo('Fábrica Mazzer', [['Área', E.area], ['Desde', String(E.desde)], ['Local', 'Sertãozinho · SP']])}
  </div>
</div></section>
<section class="linha-tempo"><div class="in">
  <h2 class="tit-b">O que a fábrica faz</h2>
  <dl class="faz">
    <div><dt>Usinagem</dt><dd>Eixos, rolos, rotores, buchas, polias e engrenagens usinados na própria fábrica.</dd></div>
    <div><dt>Fabricação</dt><dd>Equipamentos de preparação de massa e componentes de máquina de papel.</dd></div>
    <div><dt>Reforma</dt><dd>Recuperação de equipamentos e peças, fabricados ou não pela Mazzer.</dd></div>
    <div><dt>Projeto</dt><dd>Aprimoramento e desenvolvimento de novos projetos, sob encomenda.</dd></div>
  </dl>
</div></section>
<section class="contato-b"><div class="in"><h2 class="tit-b">Visite a fábrica em Sertãozinho</h2><div class="cb-linhas"><a href="${E.mapa}" target="_blank" rel="noopener"><small>Endereço</small>${E.endereco.join(', ')}</a><a href="tel:${E.foneHref}"><small>Telefone</small>${E.fone}</a><a href="mailto:${E.email}"><small>E-mail</small>${E.email}</a></div></div></section>`;
}

function manutencaoB() {
  return `<section class="cab-b"><div class="in"><p class="rotulo">Manutenção e recuperação</p><h1 class="tit-b">Reformas</h1><p>${setores.manutencao.texto}</p></div></section>
<section class="etapas-b"><div class="in"><ol>
  <li><span>01</span><b>Recebimento</b>O equipamento chega à fábrica, é desmontado e medido.</li>
  <li><span>02</span><b>Recuperação</b>Usinagem, troca de componentes, balanceamento e pintura.</li>
  <li><span>03</span><b>Devolução</b>Volta para a linha com a vida útil renovada.</li>
</ol></div></section>
<section class="reformas-b"><div class="in">${reformasHtml('b')}</div></section>
<section class="contato-b"><div class="in"><h2 class="tit-b">Tem um equipamento parado?</h2><div class="cb-linhas"><a href="tel:${E.foneHref}"><small>Telefone</small>${E.fone}</a><a href="mailto:${E.email}?subject=${encodeURIComponent('Reforma de equipamento')}"><small>E-mail</small>${E.email}</a><a href="/b/contato/"><small>Formulário</small>Pedir avaliação</a></div></div></section>`;
}

function contatoB() {
  return `<section class="cab-b"><div class="in"><p class="rotulo">Contato</p><h1 class="tit-b">Peça um orçamento</h1><p>Monte a lista no catálogo ou descreva o que precisa. Responda com desenho, medida ou foto da peça, se tiver.</p></div></section>
<section class="contato contato-b2"><div class="in">
  ${formOrc('b')}
  <aside class="contato-info">
    ${carimbo('Mazzer', [['Telefone', `<a href="tel:${E.foneHref}">${E.fone}</a>`], ['E-mail', `<a href="mailto:${E.email}">${E.email}</a>`], ['Horário', E.horario], ['Endereço', E.endereco.join(', ')]])}
    <div class="mapa mapa-b"><iframe src="${E.mapaEmbed}" title="Mapa: Mazzer em Sertãozinho" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </aside>
</div></section>`;
}

// ---------- gerar ----------
export function gerarVersao(v) {
  const p = {};
  const d = 'Mazzer Equipamentos Industriais, Sertãozinho SP: equipamentos para papel e celulose, peças para açúcar e etanol, manutenção e recuperação desde 1993.';
  if (v === 'a') {
    p.index = pagina('a', 'index', '', `${E.nome} | Sertãozinho, SP`, d, homeA());
    p.empresa = pagina('a', 'empresa', 'empresa/', `A Empresa | ${E.nome}`, sobre[0].slice(0, 155), empresaA());
    p['papel-e-celulose'] = pagina('a', 'papel-e-celulose', 'papel-e-celulose/', `Papel e Celulose | ${E.nome}`, 'Equipamentos para preparação de massa, máquina de papel e peças de reposição, fabricados em Sertãozinho.', papelA());
    p['acucar-e-etanol'] = pagina('a', 'acucar-e-etanol', 'acucar-e-etanol/', `Açúcar e Etanol | ${E.nome}`, setores.acucar.texto.slice(0, 155), acucarA());
    p.manutencao = pagina('a', 'manutencao', 'manutencao/', `Manutenção e Recuperação | ${E.nome}`, setores.manutencao.texto.slice(0, 155), manutencaoA());
    p.mineracao = pagina('a', 'mineracao', 'mineracao/', `Mineração | ${E.nome}`, setores.mineracao.texto, mineracaoA());
    p.contato = pagina('a', 'contato', 'contato/', `Contato | ${E.nome}`, `Fale com a Mazzer: ${E.fone}, ${E.email}.`, contatoA());
  } else {
    p.index = pagina('b', 'index', '', `${E.nome} | Sertãozinho, SP`, d, homeB());
    p.empresa = pagina('b', 'empresa', 'empresa/', `Empresa | ${E.nome}`, sobre[0].slice(0, 155), empresaB());
    p.equipamentos = pagina('b', 'equipamentos', 'equipamentos/', `Equipamentos | ${E.nome}`, `Catálogo com ${equipamentos.length} equipamentos e peças para papel e celulose, açúcar e etanol.`, catalogoB());
    p.manutencao = pagina('b', 'manutencao', 'manutencao/', `Reformas | ${E.nome}`, setores.manutencao.texto.slice(0, 155), manutencaoB());
    p.contato = pagina('b', 'contato', 'contato/', `Contato | ${E.nome}`, `Peça um orçamento à Mazzer: ${E.fone}, ${E.email}.`, contatoB());
  }
  for (const e of equipamentos) p[`equipamentos/${e.slug}`] = detalhe(v, e);
  return p;
}
