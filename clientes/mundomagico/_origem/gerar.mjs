// Gera clientes/mundomagico/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/mundomagico/_origem/gerar.mjs
// A "Selo": clara, topo branco com o selo e o nome na letra de faculdade do site atual, capa azul com a faixa amarela,
// diferenciais em linha com ícones, as turmas numa trilha de 2 a 10 anos e os projetos nas fotos redondas do site de hoje.
// B "Recreio": azul como o site atual, topo azul com filete amarelo, capa de foto inteira com o bilhete de matrícula 2027,
// diferenciais numa faixa azul numerada, ensino em abas, projetos numa esteira de fotos e convênios em etiquetas.
import fs from 'node:fs';
import path from 'node:path';
import { escola as E, textos as T, destaques, diferenciais, turmas, projetos, equipe, convenios, objetivosInstitucionais, objetivosGerais, fundamentos, linhaTempo, noticias, galeria, denuncia } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const DIM = JSON.parse(fs.readFileSync(path.join(aqui, 'dim.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${DIM[src][0]}" height="${DIM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';
export const nomesVersao = { a: 'Selo', b: 'Recreio' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'ensino', nome: 'Ensino', caminho: 'ensino/' },
  { slug: 'sobre', nome: 'Sobre', caminho: 'sobre/' },
  { slug: 'equipe', nome: 'Equipe', caminho: 'equipe/' },
  { slug: 'galeria', nome: 'Galeria de fotos', caminho: 'galeria/' },
  { slug: 'convenios', nome: 'Convênios', caminho: 'convenios/' },
  { slug: 'noticias', nome: 'Notícias', caminho: 'noticias/' },
  { slug: 'denuncias', nome: 'Denúncias', caminho: 'denuncias/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const u = (v, slug, ancora = '') => `/${v}/${nav.find(n => n.slug === slug).caminho}${ancora}`;
const whats = (msg = 'Olá! Vim pelo site e gostaria de informações sobre a Escola Mundo Mágico.') => `https://wa.me/${E.whats}?text=${encodeURIComponent(msg)}`;
const whatsVisita = whats('Olá! Gostaria de agendar uma visita à Escola Mundo Mágico.');
const whatsMatricula = whats('Olá! Gostaria de informações sobre as matrículas 2027.');

const I = {
  whats: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1.1z"/><path d="M9 8.5c0 3.3 2.9 6.5 6.4 6.6l1-1.6-2.1-1-1 .9a5 5 0 01-2.4-2.4l.9-1-1-2.1z"/>',
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  login: '<path d="M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4M10 16l4-4-4-4M14 12H4"/>',
  escola: '<path d="M3 10l9-6 9 6M5 9.5V20h14V9.5M10 20v-5h4v5"/>',
  arvore: '<path d="M12 21v-6M12 15c-4 0-6.5-2.3-6.5-5.3 0-2.4 1.6-4.2 3.6-4.6A3.8 3.8 0 0112 3a3.8 3.8 0 012.9 2.1c2 .4 3.6 2.2 3.6 4.6 0 3-2.5 5.3-6.5 5.3z"/>',
  camera: '<rect x="2.5" y="7" width="13" height="10" rx="2"/><path d="M15.5 10.5l6-3v9l-6-3"/>',
  banheiro: '<circle cx="7" cy="4.5" r="1.8"/><circle cx="17" cy="4.5" r="1.8"/><path d="M5 8.5h4l.5 6H8.5V21h-3v-6.5h-1zM12 3v18M15 8.5h4l2 7.5h-2.5V21h-3v-5H13z"/>',
  bilingue: '<path d="M4 5h9v7H8l-4 3zM20 10h-4v7h3l3 2V12a2 2 0 00-2-2z"/>',
  musica: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  psico: '<circle cx="12" cy="4.5" r="2"/><path d="M5 9l7 1.5L19 9M12 10.5V15l-4 6M12 15l4 6"/>',
  neve: '<path d="M12 2v20M4 6.5l16 11M20 6.5l-16 11M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>',
  coracao: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20z"/>',
  balanco: '<path d="M4 3h16M7 3v12M17 3v12M5.5 15h13l-1 2.5h-11z"/>',
  professor: '<circle cx="9" cy="7" r="3"/><path d="M3.5 20v-1.5A5.5 5.5 0 0114.5 18.5V20M14 4h7v8h-5"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  escudo: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  livro: '<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5zM4 20.5A2.5 2.5 0 006.5 23H20v-5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const fontes = 'https://fonts.googleapis.com/css2?family=Graduate&family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600&display=swap';

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
<meta name="theme-color" content="${v === 'a' ? '#FFFFFF' : '#1B75BA'}">
<link rel="icon" href="/assets/favicon.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const marca = v => `<a class="marca" href="/${v}/" aria-label="${E.nome}, início"><img src="/assets/selo.webp" alt="" width="86" height="82"><span class="marca-txt"><b>Escola Mundo Mágico</b><small>Cruzeiro Novo · Brasília · DF</small></span></a>`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const portais = `<a href="${E.portalAlunos}" target="_blank" rel="noopener">${ic('login')} Portal dos alunos</a><a href="${E.portalProfessores}" target="_blank" rel="noopener">${ic('login')} Portal dos professores</a>`;
const menu = (v, atual) => `<nav id="menu" class="menu" aria-label="Principal">${nav.slice(1, -1).map(n => link(v, n, atual)).join('')}<a class="btn btn-amarelo btn-peq" href="${u(v, 'contato')}"${atual === 'contato' ? ' aria-current="page"' : ''}>Contato</a><span class="menu-portais">${portais}</span></nav>`;

function topo(v, atual) {
  return `<div class="pre"><div class="in"><span class="pre-cont"><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a><a href="${whats()}" target="_blank" rel="noopener">${ic('whats')} ${E.cel}</a></span><span class="pre-portais">${portais}</span></div></div>
<header class="topo"><div class="in">
  ${marca(v)}
  ${menu(v, atual)}
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<div class="faixa-marca" aria-hidden="true"></div>
<footer class="rodape"><div class="in">
  <div class="rod-marca">${marca(v)}<p>${E.slogan}. ${T.cuidado}</p></div>
  <div><h3>Endereço</h3><p>${E.endereco}<br>${E.cidade} · ${E.uf} · CEP ${E.cep}</p><p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></p></div>
  <div><h3>Secretaria</h3><p>${E.secretaria}</p><p><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a><br><a href="${whats()}" target="_blank" rel="noopener">${ic('whats')} ${E.cel}</a><br><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}<a href="${E.portalAlunos}" target="_blank" rel="noopener">Portal dos alunos</a><a href="${E.portalProfessores}" target="_blank" rel="noopener">Portal dos professores</a></nav>
</div>
<p class="rod-fim">© ${new Date().getFullYear()} ${E.nome}. Todos os direitos reservados.</p></footer>
<a class="whats-flut" href="${whats()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${ic('whats')}</a>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- blocos comuns ----------
const tit = (sobre, h, p = '', cls = '') => `<div class="tit ${cls}"><p class="eyebrow">${sobre}</p><h2>${h}</h2>${p ? `<p>${p}</p>` : ''}</div>`;
const btnWhats = (cls, txt, href = whats()) => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${ic('whats')} ${txt}</a>`;

const form = () => `<form class="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    <label>Telefone / WhatsApp<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label>Assunto<select name="Assunto"><option>Matrículas 2027</option><option>Agendar uma visita</option><option>Convênios</option><option>Outro assunto</option></select></label>
    <label class="campo-todo">Sua mensagem<textarea name="Mensagem" rows="4"></textarea></label>
  </div>
  <button class="btn btn-azul" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" hidden role="status">Mensagem pronta. Na versão publicada ela chega à secretaria; por enquanto, fale pelo WhatsApp ${E.cel}.</p>
</form>`;

const infoContato = () => `<ul class="info">
  <li>${ic('tel')}<div><b>Telefone</b><a href="tel:${E.telHref}">${E.tel}</a></div></li>
  <li>${ic('whats')}<div><b>WhatsApp</b><a href="${whats()}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><b>Endereço</b>${E.endereco}, ${E.cidade} · ${E.uf}<br>CEP ${E.cep}</div></li>
  <li>${ic('relogio')}<div><b>Secretaria</b>${E.secretaria}</div></li>
</ul>`;

const mapa = () => `<div class="mapa"><iframe title="Mapa: Escola Mundo Mágico no Cruzeiro Novo" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const contatoSec = (v, cls = '') => `<section class="contato ${cls}" id="contato"><div class="in">
  <div class="ct-txt">${tit('Contato', 'Venha conhecer a escola', 'Agende sua visita, tire dúvidas sobre as matrículas 2027 ou fale com a secretaria.')}${infoContato()}</div>
  <div class="ct-form">${form()}</div>
</div></section>`;

const turmaTrilha = () => `<ol class="trilha">${turmas.map(t => `<li class="t-${t.etapa}"><span class="t-idade"><b>${t.idade}</b>${t.unidade}</span><h3>${t.nome}</h3><p>${t.nivel}${t.etapa === 'fundamental' ? '<br>6 a 10 anos' : ''}</p></li>`).join('')}</ol>`;

const projetosRedondos = () => `<ul class="redondos">${projetos.map(p => `<li>${foto(p.foto, p.titulo)}<h3>${p.titulo}</h3><p>${p.quando}</p></li>`).join('')}</ul>`;

const listaConvenios = cls => `<ul class="${cls}">${convenios.map(([s, n]) => `<li><b>${s}</b><span>${n}</span></li>`).join('')}</ul>`;

const equipeBloco = () => `<ul class="diretoria">${equipe.map(([c, n]) => `<li><img src="/assets/selo.webp" alt="" width="64" height="61" loading="lazy"><div><span>${c}</span><b>${n}</b></div></li>`).join('')}</ul>`;

const noticiaCard = n => `<article class="nt"><a href="${n.url}" target="_blank" rel="noopener"><figure>${foto(n.foto, n.titulo)}</figure><p class="nt-data">${n.data}</p><h3>${n.titulo}</h3><span class="link">Ler no site ${ic('seta')}</span></a></article>`;

const galeriaGrade = (lista, cls = 'galeria') => `<div class="${cls}">${lista.map(([f, a], i) => `<figure class="g g${i % 8}">${foto(f, a)}<figcaption>${a}</figcaption></figure>`).join('')}</div>`;

const linhaBloco = () => `<ol class="linha">${linhaTempo.map(([a, t, p]) => `<li><span class="ano">${a}</span><h3>${t}</h3><p>${p}</p></li>`).join('')}</ol>`;

const fundamentosBloco = () => `<dl class="fundamentos">${fundamentos.map(([t, p], i) => `<div><dt><span>${String(i + 1).padStart(2, '0')}</span>${t}</dt><dd>${p}</dd></div>`).join('')}</dl>`;

const objetivos = (lista, cls = 'objetivos') => `<ol class="${cls}">${lista.map(o => `<li>${o}</li>`).join('')}</ol>`;

const denunciaBloco = () => `<section class="denuncia"><div class="in">
  <div class="dn-txt"><p class="lead">${denuncia.intro}</p>${denuncia.itens.map(([t, p]) => `<h2>${t}</h2><p>${p}</p>`).join('')}</div>
  <aside class="dn-box">${ic('escudo', 'ic ic-grande')}<h3>E-mail exclusivo para denúncias</h3><p>Canal exclusivo para denúncias de assédio no trabalho.</p><a class="btn btn-verm" href="mailto:${E.emailDenuncia}">${ic('mail')} ${E.emailDenuncia}</a></aside>
</div></section>`;

const visitaCta = (v, cls = '') => `<section class="visita ${cls}"><div class="in">
  <div><p class="eyebrow">Matrículas abertas 2027</p><h2>Agende sua visita!</h2><p>Educação Infantil e Ensino Fundamental I no Cruzeiro Novo. ${T.cuidado}</p></div>
  <div class="acoes">${btnWhats('btn btn-amarelo', 'Agendar pelo WhatsApp', whatsVisita)}<a class="btn btn-contorno-claro" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></div>
</div></section>`;

// ---------- versão A: Selo ----------
const capaA = (sobre, h, p, img) => `<section class="capa-int"><div class="in"><div class="ci-txt"><p class="eyebrow">${sobre}</p><h1>${h}</h1>${p ? `<p>${p}</p>` : ''}</div>${img ? `<figure>${foto(img, h, ja)}</figure>` : ''}</div></section>`;

const homeA = v => `<section class="hero"><div class="hero-in">
  <div class="hero-txt">
    <p class="selo-chip">Matrículas abertas 2027</p>
    <h1>Sejam bem-vindos à Escola Mundo Mágico!</h1>
    <p>${T.boasVindas}</p>
    <div class="acoes">${btnWhats('btn btn-amarelo', 'Agende sua visita', whatsVisita)}<a class="btn btn-contorno-claro" href="${u(v, 'ensino')}">Conheça o ensino</a></div>
  </div>
  <figure class="hero-img">${foto('fachada', 'Fachada e parquinho da Escola Mundo Mágico', ja)}</figure>
</div></section>
<div class="faixa-marca" aria-hidden="true"></div>
<section class="destaques"><div class="in">
  <ul>${destaques.map(([i, t]) => `<li>${ic(i)}<span>${t}</span></li>`).join('')}</ul>
  <p>${T.integral}</p>
</div></section>
<section class="difs"><div class="in">
  ${tit('Por que a Mundo Mágico', 'Diferenciais', '', 'tit-centro')}
  <div class="difs-grade">${diferenciais.map((d, i) => `<article class="dif"><span class="dif-ic">${ic(d.icone, 'ic ic-grande')}</span><h3>${d.titulo}</h3><p>${d.texto}</p></article>`).join('')}</div>
  <div class="difs-fotos">${['patio', 'sala-infantil', 'parquinho-predios'].map(f => `<figure>${foto(f, galeria.find(g => g[0] === f)[1])}</figure>`).join('')}</div>
</div></section>
<section class="ensino-home"><div class="in">
  ${tit('Ensino', 'Dos 2 aos 10 anos na mesma escola', 'Educação Infantil e Ensino Fundamental, anos iniciais do 1º ao 5º ano.')}
  ${turmaTrilha()}
  ${projetosRedondos()}
  <p class="centro"><a class="btn btn-azul" href="${u(v, 'ensino')}">Ver o ensino completo ${ic('seta')}</a></p>
</div></section>
<section class="hist-home"><div class="in">
  <figure>${foto('globo', 'Escultura do globo com as mãos, símbolo da escola')}</figure>
  <div><p class="eyebrow">Desde 1971</p><h2>Tradição com alunos da 3ª geração</h2><p>${T.historia[0]}</p><a class="link" href="${u(v, 'sobre')}">Nossa história ${ic('seta')}</a></div>
</div></section>
<section class="equipe-home"><div class="in">
  <div>${tit('Equipe', 'Quem cuida da escola', `Professores em constante formação pedagógica. ${T.formacao}`)}${equipeBloco()}</div>
  <figure>${foto('equipe', 'Equipe de professoras e funcionárias da Escola Mundo Mágico')}</figure>
</div></section>
<section class="conv-home"><div class="in">
  <div class="conv-cab">${tit('Convênios', 'Associados têm convênio com a escola', T.convenios)}<a class="link link-claro" href="${u(v, 'convenios')}">Ver a lista completa ${ic('seta')}</a></div>
  ${listaConvenios('conv-lista conv-curta')}
</div></section>
<section class="gal-home"><div class="in">
  <div class="cab-linha">${tit('Galeria de fotos', 'Um dia na Mundo Mágico')}<a class="link" href="${u(v, 'galeria')}">Ver todas as fotos ${ic('seta')}</a></div>
  ${galeriaGrade(galeria.slice(0, 5), 'galeria galeria-home')}
</div></section>
${contatoSec(v)}
${mapa()}`;

const ensinoA = v => `${capaA('Ensino', 'Educação Infantil e Ensino Fundamental I', 'Da creche ao 5º ano, com projeto bilíngue, psicomotricidade, tecnologia, musicalização, artes e educação física.', 'sala-infantil')}
<section class="ensino-home"><div class="in">${tit('Turmas', 'Uma trilha dos 2 aos 10 anos')}${turmaTrilha()}</div></section>
<section class="etapas"><div class="in">
  <article><figure>${foto('turma-mesa', 'Turma da Educação Infantil')}</figure><div><p class="eyebrow">Creche e Educação Infantil</p><h2>Educação Infantil</h2><ul class="lista">${turmas.filter(t => t.etapa === 'infantil').map(t => `<li><b>${t.nome}</b> crianças de ${t.idade} anos</li>`).join('')}</ul></div></article>
  <article><figure>${foto('turma-banco', 'Alunos do Ensino Fundamental')}</figure><div><p class="eyebrow">Anos iniciais</p><h2>Ensino Fundamental</h2><p>Anos iniciais: do 1º ao 5º ano.</p><p>${T.finalidade}</p></div></article>
</div></section>
<section class="projetos-sec"><div class="in">${tit('Projetos', 'Muito mais para o desenvolvimento integral do seu filho', '', 'tit-centro')}${projetosRedondos()}</div></section>
<section class="estrutura"><div class="in">
  ${tit('Estrutura', 'Escola térrea, ventilada e climatizada')}
  <div class="difs-grade">${diferenciais.map(d => `<article class="dif"><span class="dif-ic">${ic(d.icone, 'ic ic-grande')}</span><h3>${d.titulo}</h3><p>${d.texto}</p></article>`).join('')}</div>
</div></section>
${visitaCta(v)}`;

const sobreA = v => `${capaA('Sobre a escola', 'Educando com afeto desde 1971', 'Originária da Escola Três Amiguinhos, a Escola Mundo Mágico tem hoje alunos da 3ª geração no Cruzeiro Novo.', 'globo')}
<section class="hist"><div class="in">
  <div class="hist-txt"><h2>Da organização da instituição</h2>${T.historia.map(p => `<p>${p}</p>`).join('')}</div>
  ${linhaBloco()}
</div></section>
<section class="missao" id="missao"><div class="in"><p class="eyebrow">Missão</p><blockquote>${T.missao}</blockquote></div></section>
<section class="fund" id="fundamentos"><div class="in">
  ${tit('Fundamentos norteadores da prática educativa', 'Os princípios que guiam cada dia na escola', T.principios)}
  ${fundamentosBloco()}
</div></section>
<section class="objs" id="objetivos"><div class="in">
  <div>${tit('Objetivos institucionais', 'O aluno no centro de toda ação educativa')}${objetivos(objetivosInstitucionais)}</div>
  <div class="objs-gerais"><h3>Objetivos gerais da instituição</h3>${objetivos(objetivosGerais, 'objetivos objetivos-curtos')}</div>
</div></section>
${visitaCta(v)}`;

const equipeA = v => `${capaA('Equipe', 'Professores em constante formação pedagógica', T.formacao, 'equipe')}
<section class="equipe-pag"><div class="in">
  ${tit('Direção e coordenação', 'Quem conduz a escola')}
  ${equipeBloco()}
</div></section>
<section class="hist-home"><div class="in">
  <figure>${foto('musica', 'Professor em aula de musicalização')}</figure>
  <div><p class="eyebrow">Família e escola</p><h2>Unindo esforços na formação integral</h2><p>${T.familia}</p><p>A Instituição possui quadro docente, administrativo e técnico-pedagógico qualificado e competente para a execução do objetivo maior: proporcionar uma educação de qualidade.</p>${btnWhats('btn btn-whats', 'Falar com a coordenação', whatsVisita)}</div>
</div></section>`;

const galeriaA = v => `${capaA('Galeria de fotos', 'A escola por dentro', 'Salas, pátio, parquinho, laboratório de informática e as turmas da Mundo Mágico.', '')}
<section class="gal-pag"><div class="in">${galeriaGrade(galeria)}</div></section>
${visitaCta(v)}`;

const conveniosA = v => `${capaA('Convênios', 'Convênios com associações e sindicatos', T.convenios, '')}
<section class="conv-pag"><div class="in">${listaConvenios('conv-lista')}</div></section>
${visitaCta(v)}`;

const noticiasA = v => `${capaA('Notícias', 'Acontece na Mundo Mágico', T.instagram, '')}
<section class="news-pag"><div class="in"><div class="nt-grade">${noticias.map(noticiaCard).join('')}</div></div></section>`;

const denunciasA = v => `${capaA('Canal de denúncias', 'Canal exclusivo para denúncias de assédio no trabalho', '', '')}
${denunciaBloco()}`;

const contatoA = v => `${capaA('Contato', 'Fale com a secretaria', `${E.endereco}, ${E.cidade} · ${E.uf}. Secretaria das ${E.secretaria}.`, '')}
${contatoSec(v, 'ct-pag')}
${mapa()}`;

// ---------- versão B: Recreio ----------
const capaB = (sobre, h, p, img) => `<section class="capa-b">${foto(img, h, ja)}<div class="in"><p class="eyebrow">${sobre}</p><h1>${h}</h1>${p ? `<p>${p}</p>` : ''}</div></section>`;

const abasEnsino = () => `<div class="abas" data-abas>
  <div class="abas-bts" role="tablist" aria-label="Etapas de ensino">
    <button role="tab" id="ab-inf" aria-controls="pn-inf" aria-selected="true">Educação Infantil</button>
    <button role="tab" id="ab-fund" aria-controls="pn-fund" aria-selected="false" tabindex="-1">Ensino Fundamental</button>
  </div>
  <div role="tabpanel" id="pn-inf" aria-labelledby="ab-inf" class="aba">
    <figure>${foto('sala-infantil', 'Sala da Educação Infantil')}</figure>
    <div><h3>Creche e Educação Infantil</h3><ul class="idades">${turmas.filter(t => t.etapa === 'infantil').map(t => `<li><b>${t.idade}</b><span>anos</span><em>${t.nome}</em></li>`).join('')}</ul><p>Musicalização e Artes a partir do Maternal I. Projeto bilíngue, psicomotricidade e tecnologia.</p></div>
  </div>
  <div role="tabpanel" id="pn-fund" aria-labelledby="ab-fund" class="aba" hidden>
    <figure>${foto('sala-fund', 'Sala do Ensino Fundamental')}</figure>
    <div><h3>Ensino Fundamental · anos iniciais</h3><ul class="idades">${[1, 2, 3, 4, 5].map(n => `<li><b>${n}º</b><span>ano</span></li>`).join('')}</ul><p>Do 1º ao 5º ano, com Educação Física, Musicalização e Artes a partir do 1º ano, projeto bilíngue e tecnologia.</p></div>
  </div>
</div>`;

const esteiraProjetos = () => `<div class="esteira">${projetos.map(p => `<figure>${foto(p.grande, p.titulo)}<figcaption><b>${p.titulo}</b><span>${p.quando}</span></figcaption></figure>`).join('')}</div>`;

const homeB = v => `<section class="hero-b">${foto('turma-banco', 'Alunos da Escola Mundo Mágico no pátio', ja)}<div class="in">
  <div class="hb-txt"><p class="eyebrow">Educação Infantil e Fundamental I · Cruzeiro Novo</p><h1>Escola Mundo Mágico</h1><p>${T.boasVindas}</p>
  <div class="acoes">${btnWhats('btn btn-amarelo', 'Agende sua visita', whatsVisita)}<a class="btn btn-contorno-claro" href="${u(v, 'ensino')}">Conheça o ensino</a></div></div>
  <a class="bilhete" href="${whatsMatricula}" target="_blank" rel="noopener"><span class="bl-top">Matrículas abertas</span><b>2027</b><span>Educação Infantil e Ensino Fundamental I</span><span class="bl-fim">${ic('whats')} ${E.cel}</span></a>
</div></section>
<section class="difs-b"><div class="in">
  ${tit('Diferenciais', 'Cada detalhe pensado com carinho e responsabilidade', '', 'tit-claro')}
  <ol class="difs-num">${diferenciais.map(d => `<li><span class="dn-ic">${ic(d.icone, 'ic ic-grande')}</span><h3>${d.titulo}</h3><p>${d.texto}</p></li>`).join('')}</ol>
</div></section>
<section class="ensino-b"><div class="in">
  ${tit('Ensino', 'Da creche ao 5º ano')}
  ${abasEnsino()}
</div></section>
<section class="proj-b"><div class="in">${tit('Projetos', 'Muito mais para o desenvolvimento integral')}</div>${esteiraProjetos()}</section>
<section class="hist-b"><div class="in">
  <div><p class="eyebrow">Desde 1971</p><h2>Alunos da 3ª geração</h2><p>${T.historia[0]}</p><a class="btn btn-azul" href="${u(v, 'sobre')}">Nossa história ${ic('seta')}</a></div>
  ${linhaBloco()}
</div></section>
<section class="equipe-b"><div class="in">
  <figure>${foto('equipe', 'Equipe da Escola Mundo Mágico')}</figure>
  <div>${tit('Equipe', 'Professores em constante formação pedagógica')}${equipeBloco()}</div>
</div></section>
<section class="conv-b"><div class="in">
  <div class="cab-linha">${tit('Convênios', 'É associado? Fale com a secretaria', T.convenios)}<a class="link" href="${u(v, 'convenios')}">Ver os detalhes ${ic('seta')}</a></div>
  <ul class="etiquetas">${convenios.map(([s]) => `<li>${s}</li>`).join('')}</ul>
</div></section>
<section class="gal-b"><div class="in"><div class="cab-linha">${tit('Galeria de fotos', 'A escola por dentro')}<a class="link" href="${u(v, 'galeria')}">Ver todas ${ic('seta')}</a></div>
  ${galeriaGrade(galeria.slice(0, 8), 'mosaico')}
</div></section>
${contatoSec(v, 'ct-b')}
${mapa()}`;

const ensinoB = v => `${capaB('Ensino', 'Da creche ao 5º ano', 'Educação Infantil e Ensino Fundamental, anos iniciais.', 'sala-infantil')}
<section class="ensino-b"><div class="in">${abasEnsino()}</div></section>
<section class="trilha-b"><div class="in">${tit('Turmas', 'Uma trilha dos 2 aos 10 anos', '', 'tit-claro')}${turmaTrilha()}</div></section>
<section class="proj-b"><div class="in">${tit('Projetos', 'Bilíngue, psicomotricidade, tecnologia, música, artes e educação física')}</div>${esteiraProjetos()}</section>
<section class="intro-b"><div class="in"><p class="lead">${T.finalidade}</p></div></section>
${visitaCta(v, 'visita-b')}`;

const sobreB = v => `${capaB('Sobre a escola', 'Educando com afeto desde 1971', 'Tradição, alunos da 3ª geração e uma marca registrada no INPI.', 'fachada-placa')}
<section class="hist-b"><div class="in">
  <div>${T.historia.map(p => `<p>${p}</p>`).join('')}</div>
  ${linhaBloco()}
</div></section>
<section class="missao missao-b" id="missao"><div class="in"><p class="eyebrow">Missão</p><blockquote>${T.missao}</blockquote></div></section>
<section class="fund fund-b" id="fundamentos"><div class="in">${tit('Fundamentos norteadores', 'Os princípios da prática educativa', T.principios)}${fundamentosBloco()}</div></section>
<section class="objs" id="objetivos"><div class="in">
  <div>${tit('Objetivos institucionais', 'O aluno como centro de toda ação educativa')}${objetivos(objetivosInstitucionais)}</div>
  <div class="objs-gerais"><h3>Objetivos gerais da instituição</h3>${objetivos(objetivosGerais, 'objetivos objetivos-curtos')}</div>
</div></section>`;

const equipeB = v => `${capaB('Equipe', 'Quem cuida dos nossos alunos', T.formacao, 'equipe')}
<section class="equipe-pag"><div class="in">${tit('Direção e coordenação', 'Direção da escola')}${equipeBloco()}</div></section>
<section class="intro-b"><div class="in"><p class="lead">${T.familia}</p>${btnWhats('btn btn-whats', 'Falar com a coordenação', whatsVisita)}</div></section>`;

const galeriaB = v => `${capaB('Galeria de fotos', 'A escola por dentro', 'Salas, pátio, parquinho e as turmas.', 'patio')}
<section class="gal-b gal-pag"><div class="in">${galeriaGrade(galeria, 'mosaico')}</div></section>`;

const conveniosB = v => `${capaB('Convênios', 'Convênios', T.convenios, 'turma-parquinho')}
<section class="conv-pag"><div class="in">${listaConvenios('conv-lista')}</div></section>
${visitaCta(v, 'visita-b')}`;

const noticiasB = v => `${capaB('Notícias', 'Acontece na Mundo Mágico', T.instagram, 'salao')}
<section class="news-pag"><div class="in"><div class="nt-grade">${noticias.map(noticiaCard).join('')}</div></div></section>`;

const denunciasB = v => `${capaB('Canal de denúncias', 'Denúncias de assédio no trabalho', 'Canal exclusivo, com e-mail próprio.', 'fachada')}
${denunciaBloco()}`;

const contatoB = v => `${capaB('Contato', 'Fale com a secretaria', `Secretaria das ${E.secretaria}.`, 'fachada-placa')}
${contatoSec(v, 'ct-b ct-pag')}
${mapa()}`;

const P = {
  a: { index: homeA, ensino: ensinoA, sobre: sobreA, equipe: equipeA, galeria: galeriaA, convenios: conveniosA, noticias: noticiasA, denuncias: denunciasA, contato: contatoA },
  b: { index: homeB, ensino: ensinoB, sobre: sobreB, equipe: equipeB, galeria: galeriaB, convenios: conveniosB, noticias: noticiasB, denuncias: denunciasB, contato: contatoB },
};
const meta = {
  index: ['Escola Mundo Mágico · Cruzeiro Novo, Brasília · Educando com afeto desde 1971', 'Educação Infantil e Ensino Fundamental I no Cruzeiro Novo, Brasília/DF. Matrículas abertas 2027. Projeto bilíngue, musicalização e psicomotricidade.'],
  ensino: ['Ensino · Educação Infantil e Fundamental I · Escola Mundo Mágico', 'Maternal I e II, Jardim I e II e Ensino Fundamental do 1º ao 5º ano. Projeto bilíngue, psicomotricidade, tecnologia, musicalização e educação física.'],
  sobre: ['Sobre · Missão, fundamentos e história · Escola Mundo Mágico', 'Originária da Escola Três Amiguinhos (1971), fundada em 1986, com alunos da 3ª geração. Missão, fundamentos norteadores e objetivos.'],
  equipe: ['Equipe · Escola Mundo Mágico', 'Direção e coordenação pedagógica da Escola Mundo Mágico. Professores em constante formação pedagógica.'],
  galeria: ['Galeria de fotos · Escola Mundo Mágico', 'Salas, pátio, parquinho, laboratório de informática e as turmas da Escola Mundo Mágico.'],
  convenios: ['Convênios · Escola Mundo Mágico', 'Convênios com associações, sindicatos e órgãos de Brasília.'],
  noticias: ['Notícias · Escola Mundo Mágico', 'Passeios, homenagens e o dia a dia da Escola Mundo Mágico.'],
  denuncias: ['Canal de denúncias · Escola Mundo Mágico', 'Canal exclusivo para denúncias de assédio moral, assédio sexual e discriminação no trabalho.'],
  contato: ['Contato · Escola Mundo Mágico', `${E.endereco}, ${E.cidade}/${E.uf}. ${E.tel} · WhatsApp ${E.cel} · ${E.email}.`],
};

for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const n of nav) {
    const dir = path.join(pub, v, n.caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), pagina(v, n.slug, n.caminho, ...meta[n.slug], P[v][n.slug](v)));
  }
  console.log(`mundomagico: versão ${v.toUpperCase()}, ${nav.length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#EBDB00', fundo: '#0F4C7E', claro: '#F3F8FC',
  fonteTitulo: 'Graduate,Georgia,serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: fontes,
  favicon: '/assets/favicon.webp', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: nav.length, texto: 'Clara e acolhedora: topo branco com o selo e o nome na mesma letra de faculdade do site de hoje, capa azul com a faixa amarela da escola e a foto da fachada. As turmas viram uma trilha dos 2 aos 10 anos.', pontos: ['Matrículas 2027 e "Agende sua visita" logo na capa', 'Os projetos nas fotos redondas azul e amarelo do site atual', 'Missão, 13 fundamentos e a história desde 1971'] },
    { letra: 'b', nome: nomesVersao.b, paginas: nav.length, texto: 'Mais azul, como o site atual: topo azul com filete amarelo, foto grande dos alunos na capa e um bilhete amarelo de "Matrículas abertas 2027". Diferenciais numa faixa azul numerada.', pontos: ['Ensino em abas: Educação Infantil e Fundamental', 'Projetos numa esteira de fotos', 'Convênios em etiquetas, galeria em mosaico'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('mundomagico: escolha em public/index.html');
