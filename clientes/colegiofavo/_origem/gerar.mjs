// Gera clientes/colegiofavo/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/colegiofavo/_origem/gerar.mjs
// A "Colmeia": clara, no azul-petróleo do logo. Barra azul-marinho de acessos no topo (portal, boleto, calendário, matrícula),
// como no site atual; capa com os alunos do banner de matrículas sobre um favo grande; as etapas como uma trilha de favos.
// B "Favo de Mel": a porta dupla da home atual (Colégio Favo azul e Favo de Mel Kids amarelo) virou a capa, com o mel
// escorrendo do site atual como divisa; azul-marinho e amarelo-mel mais fortes, filosofia num favo de três células.
import fs from 'node:fs';
import path from 'node:path';
import { escola as E, textos as T, filosofia, etapas, direcao, projetos, estrutura, parceiros, orgulho } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const DIM = JSON.parse(fs.readFileSync(path.join(aqui, 'dim.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${DIM[src][0]}" height="${DIM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';
export const nomesVersao = { a: 'Colmeia', b: 'Favo de Mel' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'o-colegio', nome: 'O Colégio', caminho: 'o-colegio/' },
  { slug: 'ensino', nome: 'Ensino', caminho: 'ensino/' },
  { slug: 'estrutura', nome: 'Estrutura', caminho: 'estrutura/' },
  { slug: 'projetos', nome: 'Projetos', caminho: 'projetos/' },
  { slug: 'contato', nome: 'Matrículas e contato', caminho: 'contato/' },
];
const u = (v, slug, ancora = '') => `/${v}/${nav.find(n => n.slug === slug).caminho}${ancora}`;
const whats = (msg = 'Olá! Vim pelo site e gostaria de informações sobre matrícula no Colégio Favo.') => `https://wa.me/${E.whats}?text=${encodeURIComponent(msg)}`;
const fora = ' target="_blank" rel="noopener"';

const I = {
  whats: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1.1z"/><path d="M9 8.5c0 3.3 2.9 6.5 6.4 6.6l1-1.6-2.1-1-1 .9a5 5 0 01-2.4-2.4l.9-1-1-2.1z"/>',
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  portal: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 9h6M7 12h10"/>',
  boleto: '<path d="M4 4h16v16l-2.5-1.5L15 20l-3-1.5L9 20l-2.5-1.5L4 20z"/><path d="M8 9h8M8 13h5"/>',
  matricula: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h4"/>',
  livro: '<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5z"/><path d="M4 20.5A2.5 2.5 0 016.5 18H20v3H6.5"/>',
  campo: '<path d="M3 20l6-11 4 7 3-4 5 8z"/><circle cx="17" cy="6" r="2"/>',
  familia: '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.3"/><path d="M2.5 20a5.5 5.5 0 0111 0M13.5 20a4 4 0 017.5-2"/>',
  bola: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5l4 3-1.5 4.5h-5L8 10.5zM12 3.5v4M20 10l-4 .5M17 19l-2.5-4M7 19l2.5-4M4 10l4 .5"/>',
  compartilha: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1"/>',
  musica: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  mala: '<rect x="3.5" y="7" width="17" height="13" rx="2"/><path d="M9 7V4.5h6V7M3.5 12h17M11 12v2h2v-2"/>',
  roda: '<circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="5" cy="12" r="2"/><path d="M14 6.5l3.5 3.5M17.5 14L14 17.5M10 17.5L6.5 14M6.5 10L10 6.5"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5a19 19 0 00-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.2H8.3v3h2.6V21"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  aspas: '<path d="M10 7H6a2 2 0 00-2 2v4h5v5H4M20 7h-4a2 2 0 00-2 2v4h5v5h-5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icProjeto = { 'Aulas em Campo': 'campo', 'Escola e Família': 'familia', 'Campeonato Estudantil': 'bola', 'Projeto Literário': 'livro', 'Favo Compartilha': 'compartilha', 'Projeto Expo': 'musica', 'Roda de Leitura': 'roda', 'Mala Surpresa': 'mala' };
const fontes = {
  a: 'https://fonts.googleapis.com/css2?family=Cabin:wght@500;600;700&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Cabin:wght@500;600;700&family=Open+Sans:wght@400;600;700&display=swap',
};
// Hexágono de ponta para cima, o mesmo dos favos do logo.
const hexPath = 'M50 0L93.3 25V75L50 100L6.7 75V25Z';
const hex = (cls = 'hex') => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><path d="${hexPath}"/></svg>`;

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
<meta name="theme-color" content="#0F2B4D">
<link rel="icon" href="/assets/favicon.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes[v]}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 220, cor = '') => `<img src="/assets/logo-h${cor}.svg" alt="${E.nome}" width="${w}" height="${Math.round(w * 68 / 291)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const menu = (v, atual) => `<nav id="menu" class="menu" aria-label="Principal">${nav.slice(1, -1).map(n => link(v, n, atual)).join('')}<a class="btn btn-mel btn-peq" href="${u(v, 'contato')}"${atual === 'contato' ? ' aria-current="page"' : ''}>Matrículas</a></nav>`;
const acessos = () => `<a href="${E.portal}"${fora}>${ic('portal')} Portal do aluno</a><a href="${E.portal}"${fora}>${ic('boleto')} Boleto</a><a href="${E.calendario}"${fora}>${ic('cal')} Calendário</a>`;

function topo(v, atual) {
  return `<div class="pre"><div class="in"><span class="pre-acessos">${acessos()}</span><span class="pre-cont"><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a><a href="${whats()}"${fora}>${ic('whats')} Informações de matrícula</a></span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="${E.nome}, início">${logo(v === 'a' ? 214 : 204, v === 'b' ? '-branco' : '')}</a>
  ${menu(v, atual)}
  ${menuBtn}
</div></header>`;
}

const redes = () => `<p class="redes"><a href="${E.instagram}"${fora} aria-label="Instagram">${ic('instagram')}</a><a href="${E.facebook}"${fora} aria-label="Facebook">${ic('facebook')}</a></p>`;

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(220, '-branco')}<p>${E.slogan} Da Educação Infantil à 3ª série do Ensino Médio, no ${E.bairro}.</p>${redes()}</div>
  <div><h3>Endereço</h3><p>${E.endereco}<br>${E.bairro}, ${E.cidade} · ${E.uf}<br>CEP ${E.cep}</p><p><a class="link" href="${E.mapa}"${fora}>Ver no mapa ${ic('seta')}</a></p></div>
  <div><h3>Fale com o Favo</h3><p><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a><br><a href="${whats()}"${fora}>${ic('whats')} ${E.cel}</a><br><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}<a href="${E.portal}"${fora}>Portal do aluno</a></nav>
</div>
<p class="rod-fim"><span>© ${new Date().getFullYear()} ${E.nome} e ${E.nomeKids}. Todos os direitos reservados.</span></p></footer>
<a class="whats-flut" href="${whats()}"${fora} aria-label="Conversar no WhatsApp">${ic('whats')}</a>`;
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

const form = () => `<form class="form" data-form>
  <div class="campos">
    <label>Nome do responsável<input name="Nome" autocomplete="name" required></label>
    <label>Telefone / WhatsApp<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email"></label>
    <label>Etapa de interesse<select name="Etapa">${etapas.map(e => `<option>${e.nome} (${e.series})</option>`).join('')}<option>Outro assunto</option></select></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="4" placeholder="Idade ou série do aluno, melhor horário para conversar, se quer agendar uma visita..."></textarea></label>
  </div>
  <button class="btn btn-mel" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto para a secretaria. Enquanto isso, chame no <a href="${whats()}"${fora}>WhatsApp ${E.cel}</a>.</p>
</form>`;

const mapa = () => `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: Colégio Favo no Cabula, Salvador" loading="lazy"></iframe></div>`;

const contatos = () => `<ul class="contatos">
  <li>${ic('pin')}<span><b>Endereço</b>${E.endereco}, ${E.bairro}<br>${E.cidade}/${E.uf} · CEP ${E.cep}</span></li>
  <li>${ic('tel')}<span><b>Secretaria</b><a href="tel:${E.telHref}">${E.tel}</a></span></li>
  <li>${ic('whats')}<span><b>Informações de matrícula</b><a href="${whats()}"${fora}>${E.cel}</a></span></li>
  <li>${ic('mail')}<span><b>Atendimento</b><a href="mailto:${E.email}">${E.email}</a></span></li>
</ul>`;

const coordenacoes = () => `<div class="coords">
  ${[...direcao.map(d => ({ coord: d.cargo, email: d.email })), ...etapas].map(c => `<p><span>${c.coord}</span><a href="mailto:${c.email}">${c.email}</a></p>`).join('')}
</div>`;

const parceirosBloco = () => `<ul class="parceiros">${parceiros.map(p => `<li>${foto(p.img, p.nome)}<span><b>${p.nome}</b>${p.p}</span></li>`).join('')}</ul>`;

const acessoRapido = () => `<div class="rapido">
  <a href="${E.portal}"${fora}>${ic('portal', 'ic-g')}<span><b>Portal do aluno</b>${T.portal}</span></a>
  <a href="${E.calendario}"${fora}>${ic('cal', 'ic-g')}<span><b>Calendário escolar</b>${T.calendario}</span></a>
  <a href="${whats()}"${fora}>${ic('matricula', 'ic-g')}<span><b>Matrículas abertas</b>Do Infantil ao Ensino Médio. Fale com a secretaria pelo WhatsApp ${E.cel}.</span></a>
</div>`;

const projetoLista = (lista, cls = '') => `<ul class="projetos ${cls}">${lista.map(p => `<li>${ic(icProjeto[p.t], 'ic-p')}<h3>${p.t}</h3><p>${p.p}</p></li>`).join('')}</ul>`;

const orgulhoBloco = (v) => `<section class="orgulho"><div class="in">
  <figure>${foto('orgulho-pedro', `Arte do Colégio Favo: Sua conquista, nosso orgulho! Parabéns, ${orgulho.nome}`)}</figure>
  <div>
    <p class="eyebrow">Sua conquista, nosso orgulho</p>
    <h2>${orgulho.nome}: ${orgulho.curso}.</h2>
    <p class="nota"><b>${orgulho.nota}</b><span>pontos ${orgulho.prova}</span></p>
    <p>Do Infantil ao 3º ano do Médio, o Favo acompanha cada aluno até a aprovação. Esse é o resultado que mais nos orgulha.</p>
    <a class="btn ${v === 'a' ? 'btn-azul' : 'btn-mel'}" href="${u(v, 'ensino', '#medio')}">Conheça o Ensino Médio ${ic('seta')}</a>
  </div>
</div></section>`;

const citacao = () => `<blockquote class="citacao">${ic('aspas', 'ic-aspas')}<p>${T.citacao.texto}</p><cite>${T.citacao.autor}</cite></blockquote>`;

const galeria = (lista, cls = '') => `<ul class="galeria ${cls}">${lista.map(([n, nome]) => `<li><figure>${foto(`est-${n}`, nome)}<figcaption>${nome}</figcaption></figure></li>`).join('')}</ul>`;

const capaInterna = (v, sobre, h, p, img) => `<section class="capa-int"><div class="in">
  <div><p class="eyebrow">${sobre}</p><h1>${h}</h1><p>${p}</p></div>
  ${img ? `<figure>${foto(img[0], img[1], ja)}</figure>` : ''}
</div></section>`;

// ---------- páginas internas (iguais nas duas versões; o CSS de cada versão muda o desenho) ----------
const pColegio = v => `${capaInterna(v, `${E.anos} anos em educação`, 'Um colégio que cuida do seu bem maior', 'Colégio Favo e Colégio Favo de Mel Kids, no Cabula: da Educação Infantil à 3ª série do Ensino Médio, no mesmo endereço.', ['est-12', 'Pátio amplo do Colégio Favo'])}
<section class="sec texto-colegio"><div class="in duas">
  <div class="corpo">${T.colegio.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="destaque-num"><p><b>${E.anos}</b><span>anos em educação</span></p><p><b>4</b><span>etapas, do Grupo 2 à 3ª série do Médio</span></p><p><b>2</b><span>escolas: Favo de Mel Kids e Colégio Favo</span></p></aside>
</div></section>
<section class="sec filosofia" id="filosofia"><div class="in">
  ${tit('Nossa filosofia', 'Missão, visão e valores')}
  <div class="filo">${filosofia.map((f, i) => `<article class="filo-item">${hex('hex filo-hex')}<span class="filo-n">0${i + 1}</span><h3>${f.t}</h3><p>${f.p}</p>${f.itens ? `<ul>${f.itens.map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul>` : ''}</article>`).join('')}</div>
</div></section>
<section class="sec proposta" id="proposta"><div class="in duas">
  <div>${tit('Proposta pedagógica', 'Visão sócio-interacionista')}${T.proposta.map(p => `<p>${p}</p>`).join('')}<p><a class="link" href="${u(v, 'projetos')}">Ver os projetos pedagógicos ${ic('seta')}</a></p></div>
  <div>${citacao()}<figure class="foto-borda">${foto('infantil-roda', 'Crianças da Educação Infantil do Colégio Favo de Mel Kids em roda')}</figure></div>
</div></section>
<section class="sec parc-sec"><div class="in">${tit('Parceiros', 'Quem está com a gente em sala', 'Material didático, inglês e esporte com parceiros conhecidos pelas famílias.')}${parceirosBloco()}</div></section>`;

const pEnsino = v => `${capaInterna(v, 'Do Infantil ao Ensino Médio', 'Quatro etapas, um mesmo cuidado', 'O Colégio Favo de Mel Kids recebe a Educação Infantil e o Fundamental I; o Colégio Favo, o Fundamental II e o Ensino Médio. Cada etapa tem coordenação própria.', null)}
<section class="sec etapas-det"><div class="in">
  ${etapas.map((e, i) => `<article class="etapa-det" id="${e.id}">
    <figure>${foto(e.foto, `${e.nome} no Colégio Favo`)}</figure>
    <div><p class="eyebrow">${String(i + 1).padStart(2, '0')} · ${e.sub}</p><h2>${e.nome}</h2><p class="series">${e.series}</p><p>${e.texto}</p>
    <p class="coord">${ic('mail')} <span>${e.coord}: <a href="mailto:${e.email}">${e.email}</a></span></p>
    <a class="btn btn-borda" href="${whats(`Olá! Gostaria de informações sobre matrícula no ${e.nome} (${e.series}).`)}"${fora}>${ic('whats')} Matrícula no ${e.nome.replace('Ensino ', '')}</a></div>
  </article>`).join('')}
</div></section>
<section class="sec tecnologia"><div class="in duas">
  <figure class="foto-borda">${foto('ad-tecnologia', 'Arte do Colégio Favo: No Favo seu filho tem toda estrutura tecnológica e pedagógica necessária durante todo o ano')}</figure>
  <div>${tit('Tecnologia e material', 'Estrutura tecnológica e pedagógica o ano todo', T.tecnologia)}${parceirosBloco()}</div>
</div></section>`;

const pEstrutura = v => `${capaInterna(v, 'Nossa estrutura', 'Um dos nossos maiores diferenciais', 'Piscina, quadra poliesportiva, parque e área com grama sintética para o Infantil, salas climatizadas com projetor e um pavilhão próprio para o Ensino Médio.', ['est-14', 'Piscina do Colégio Favo'])}
${estrutura.map((g, i) => `<section class="sec est-grupo${i % 2 ? ' alt' : ''}"><div class="in">
  <h2 class="est-tit">${hex('hex est-hex')}${g.area}</h2>
  ${galeria(g.fotos, g.fotos.length <= 2 ? 'g-duas' : g.fotos.length === 4 ? 'g-quatro' : '')}
</div></section>`).join('')}
<section class="sec cta-visita"><div class="in"><h2>Venha conhecer o Favo pessoalmente</h2><p>Agende uma visita com a secretaria e conheça as salas, a piscina e o parque com seu filho.</p><a class="btn btn-mel" href="${whats('Olá! Gostaria de agendar uma visita ao Colégio Favo.')}"${fora}>${ic('whats')} Agendar visita</a></div></section>`;

const pProjetos = v => `${capaInterna(v, 'Projetos pedagógicos', 'Aprender fazendo, o ano inteiro', T.proposta[1], ['est-10', 'Área arborizada do Colégio Favo'])}
<section class="sec proj-sec"><div class="in">
  ${tit('Colégio Favo', 'Fundamental II e Ensino Médio', 'Projetos interdisciplinares que acontecem sistematicamente, dando suporte às diversas áreas do conhecimento.')}
  ${projetoLista(projetos.colegio)}
</div></section>
<section class="sec proj-sec kids"><div class="in">
  ${tit('Colégio Favo de Mel Kids', 'Educação Infantil e Fundamental I', 'Leitura, linguagem oral e família, de forma lúdica.')}
  ${projetoLista(projetos.kids, 'p-kids')}
  <img class="abelha-voa" src="/assets/img/abelha.webp" alt="" width="${DIM.abelha[0]}" height="${DIM.abelha[1]}" loading="lazy">
</div></section>
<section class="sec"><div class="in duas">${citacao()}<div>${tit('Proposta pedagógica', 'Visão sócio-interacionista')}<p>${T.proposta[0]}</p></div></div></section>`;

const pContato = v => `${capaInterna(v, 'Matrículas abertas', 'Matrículas e contato', 'Do Infantil ao Ensino Médio. Fale com a secretaria pelo telefone, pelo WhatsApp ou deixe sua mensagem que retornamos.', null)}
<section class="sec contato-sec"><div class="in duas">
  <div>${contatos()}<h2 class="h-peq">Coordenações e direção</h2>${coordenacoes()}</div>
  <div class="form-box"><h2 class="h-peq">Quero informações de matrícula</h2>${form()}</div>
</div></section>
<section class="sec mapa-sec"><div class="in">${mapa()}</div></section>
<section class="sec rapido-sec"><div class="in">${tit('Para quem já é Favo', 'Portal do aluno, boleto e calendário')}${acessoRapido()}</div></section>`;

// ---------- home A "Colmeia" ----------
const homeA = v => `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">${E.bairro} · ${E.cidade} · do Infantil ao Ensino Médio</p>
    <h1>${E.slogan}</h1>
    <p class="lead">${E.anos} anos formando cidadãos críticos no Cabula, com estrutura completa, tecnologia em sala e uma Proposta Pedagógica sócio-interacionista.</p>
    <p class="botoes"><a class="btn btn-mel" href="${whats()}"${fora}>${ic('whats')} Matrículas abertas</a><a class="btn btn-borda" href="${u(v, 'estrutura')}">Conheça a estrutura</a></p>
  </div>
  <div class="hero-img">
    ${hex('hex hero-hex')}${hex('hex hero-hex2')}
    <img src="/assets/img/recorte-alunos.webp" alt="Alunos do Colégio Favo com o uniforme da escola" width="${DIM['recorte-alunos'][0]}" height="${DIM['recorte-alunos'][1]}"${ja}>
    <span class="hero-selo"><img src="/assets/marca.svg" alt="" width="40" height="40"> Colégio Favo · ${E.bairro}</span>
  </div>
</div></section>
<section class="rapido-sec faixa"><div class="in">${acessoRapido()}</div></section>
<section class="sec home-colegio"><div class="in duas">
  <div class="mosaico">${foto('est-1', 'Entrada principal do Colégio Favo')}${foto('est-16', 'Parque infantil do Colégio Favo de Mel Kids')}${foto('est-14', 'Piscina do Colégio Favo')}</div>
  <div>${tit(`${E.anos} anos em educação`, 'Um colégio que cuida do seu bem maior')}<p>${T.colegio[1]}</p><p>${T.colegio[3]}</p><a class="link" href="${u(v, 'o-colegio')}">Conheça o Colégio ${ic('seta')}</a></div>
</div></section>
<section class="sec filosofia"><div class="in">
  ${tit('Nossa filosofia', 'Missão, visão e valores')}
  <div class="filo">${filosofia.map((f, i) => `<article class="filo-item">${hex('hex filo-hex')}<span class="filo-n">0${i + 1}</span><h3>${f.t}</h3><p>${f.p}</p></article>`).join('')}</div>
</div></section>
<section class="sec trilha-sec"><div class="in">
  ${tit('Ensino', 'Do Grupo 2 à 3ª série do Médio', 'Duas escolas no mesmo endereço: o Colégio Favo de Mel Kids e o Colégio Favo. Cada etapa com coordenação própria.')}
  <ol class="trilha">${etapas.map((e, i) => `<li><a href="${u(v, 'ensino', '#' + e.id)}"><span class="t-hex">${hex('hex')}<b>${String(i + 1).padStart(2, '0')}</b></span><span class="t-txt"><small>${e.sub}</small><strong>${e.nome}</strong><em>${e.series}</em></span></a></li>`).join('')}</ol>
</div></section>
<section class="sec est-home"><div class="in">
  <div class="est-cab">${tit('Nossa estrutura', 'Espaço completo para cada idade')}<a class="link" href="${u(v, 'estrutura')}">Ver todas as fotos ${ic('seta')}</a></div>
  ${galeria([[14, 'Piscina'], [15, 'Quadra poliesportiva'], [18, 'Área com grama sintética'], [21, 'Salas climatizadas'], [27, 'Curso de inglês Clever Up']], 'g-home')}
</div></section>
<section class="sec proj-home"><div class="in duas">
  <div>${tit('Projetos pedagógicos', 'Aprender fazendo, o ano inteiro', T.proposta[1])}<a class="btn btn-azul" href="${u(v, 'projetos')}">Ver os projetos ${ic('seta')}</a></div>
  ${projetoLista(projetos.colegio, 'p-compacta')}
</div></section>
<section class="sec proposta-home"><div class="in duas">
  <figure class="foto-borda">${foto('infantil-roda', 'Crianças da Educação Infantil do Colégio Favo de Mel Kids em roda')}</figure>
  <div>${citacao()}${tit('Proposta pedagógica', 'Visão sócio-interacionista', T.proposta[0])}</div>
</div></section>
${orgulhoBloco(v)}
<section class="sec parc-sec"><div class="in">${tit('Parceiros', 'Quem está com a gente em sala')}${parceirosBloco()}</div></section>
<section class="sec contato-home"><div class="in duas">
  <div>${tit('Matrículas abertas', 'Fale com o Favo')}${contatos()}${redes()}</div>
  <div class="form-box">${form()}</div>
</div></section>`;

// ---------- home B "Favo de Mel" ----------
const homeB = v => `<section class="portas">
  <a class="porta porta-favo" href="${u(v, 'ensino', '#fund2')}">
    <span class="porta-txt"><img src="/assets/marca.svg" alt="" width="64" height="56"><small>Fundamental II e Ensino Médio</small><strong>Colégio Favo</strong><span>${E.slogan}</span><em>Conhecer ${ic('seta')}</em></span>
    <img class="porta-img" src="/assets/img/recorte-alunos.webp" alt="Alunos do Colégio Favo" width="${DIM['recorte-alunos'][0]}" height="${DIM['recorte-alunos'][1]}"${ja}>
  </a>
  <a class="porta porta-kids" href="${u(v, 'ensino', '#infantil')}">
    <span class="porta-txt"><img src="/assets/marca-mel.svg" alt="" width="64" height="56"><small>Educação Infantil e Fundamental I</small><strong>Favo de Mel Kids</strong><span>Leitura, brincadeira e família desde o Grupo 2.</span><em>Conhecer ${ic('seta')}</em></span>
    <img class="porta-img" src="/assets/img/recorte-criancas.webp" alt="Crianças do Colégio Favo de Mel Kids" width="${DIM['recorte-criancas'][0]}" height="${DIM['recorte-criancas'][1]}"${ja}>
    <img class="porta-abelha" src="/assets/img/abelha.webp" alt="" width="${DIM.abelha[0]}" height="${DIM.abelha[1]}">
  </a>
</section>
<div class="mel" role="presentation"></div>
<section class="sec intro-b"><div class="in">
  <p class="eyebrow">${E.anos} anos em educação · ${E.bairro}, ${E.cidade}</p>
  <h1>Matrículas abertas, do Infantil ao Ensino Médio</h1>
  <p class="lead">${T.colegio[1]}</p>
  <p class="botoes"><a class="btn btn-mel" href="${whats()}"${fora}>${ic('whats')} Informações de matrícula</a><a class="btn btn-borda" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></p>
  ${acessoRapido()}
</div></section>
<section class="sec favo3"><div class="in">
  ${tit('Nossa filosofia', 'Missão, visão e valores', '', 'claro')}
  <div class="colmeia">${filosofia.map(f => `<article class="cel"><h3>${f.t}</h3><p>${f.p}</p></article>`).join('')}</div>
</div></section>
<section class="sec abas-est"><div class="in">
  ${tit('Nossa estrutura', 'Um dos nossos maiores diferenciais')}
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist">${estrutura.map((g, i) => `<button role="tab" id="t-${i}" aria-controls="ab-${i}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${g.area}</button>`).join('')}</div>
    ${estrutura.map((g, i) => `<div class="aba" role="tabpanel" id="ab-${i}" aria-labelledby="t-${i}"${i ? ' hidden' : ''}>${galeria(g.fotos.slice(0, 4), 'g-aba')}</div>`).join('')}
  </div>
  <p><a class="link" href="${u(v, 'estrutura')}">Ver a estrutura completa ${ic('seta')}</a></p>
</div></section>
<section class="sec etapas-b"><div class="in">
  ${tit('Ensino', 'Quatro etapas, um mesmo cuidado')}
  <div class="etapas-grid">${etapas.map((e, i) => `<a class="etapa-b et-${e.id}" href="${u(v, 'ensino', '#' + e.id)}">${foto(e.foto, e.nome)}<span><small>${e.sub}</small><strong>${e.nome}</strong><em>${e.series}</em></span></a>`).join('')}</div>
</div></section>
<section class="sec proj-b"><div class="in">
  ${tit('Projetos pedagógicos', 'Aprender fazendo, o ano inteiro', T.proposta[1])}
  <div class="duas proj-duas">
    <div class="proj-col"><h3 class="proj-h">${hex('hex')} Colégio Favo</h3>${projetoLista(projetos.colegio, 'p-linha')}</div>
    <div class="proj-col kids"><h3 class="proj-h">${hex('hex')} Favo de Mel Kids</h3>${projetoLista(projetos.kids, 'p-linha')}</div>
  </div>
</div></section>
<section class="sec citacao-b"><div class="in">${citacao()}</div></section>
${orgulhoBloco(v)}
<section class="sec parc-sec"><div class="in">${tit('Parceiros', 'Quem está com a gente em sala')}${parceirosBloco()}</div></section>
<section class="sec contato-home"><div class="in duas">
  <div>${tit('Fale com o Favo', 'Agende uma visita')}${contatos()}</div>
  <div>${mapa()}</div>
</div></section>`;

const P = { index: { a: homeA, b: homeB }, 'o-colegio': pColegio, ensino: pEnsino, estrutura: pEstrutura, projetos: pProjetos, contato: pContato };
const meta = {
  index: ['Colégio Favo · Do Infantil ao Ensino Médio no Cabula, Salvador', `${E.slogan} Colégio Favo e Colégio Favo de Mel Kids, ${E.anos} anos em educação no Cabula. Matrículas: ${E.tel}.`],
  'o-colegio': ['O Colégio · Colégio Favo', `${E.anos} anos em educação no Cabula. Missão, visão, valores e Proposta Pedagógica sócio-interacionista do Colégio Favo.`],
  ensino: ['Ensino · Colégio Favo', 'Educação Infantil, Fundamental I, Fundamental II e Ensino Médio no Colégio Favo e no Colégio Favo de Mel Kids, com coordenação própria em cada etapa.'],
  estrutura: ['Estrutura · Colégio Favo', 'Piscina, quadra poliesportiva, parque infantil, salas climatizadas com projetor, curso de inglês Clever Up e pavilhão do Ensino Médio.'],
  projetos: ['Projetos pedagógicos · Colégio Favo', 'Aulas em Campo, Escola e Família, Campeonato Estudantil, Projeto Literário, Favo Compartilha, Projeto Expo, Roda de Leitura e Mala Surpresa.'],
  contato: ['Matrículas e contato · Colégio Favo', `Matrículas abertas do Infantil ao Ensino Médio. ${E.endereco}, ${E.bairro}, ${E.cidade}. ${E.tel} · WhatsApp ${E.cel}.`],
};

for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const n of nav) {
    const dir = path.join(pub, v, n.caminho);
    fs.mkdirSync(dir, { recursive: true });
    const corpo = typeof P[n.slug] === 'function' ? P[n.slug](v) : P[n.slug][v](v);
    fs.writeFileSync(path.join(dir, 'index.html'), pagina(v, n.slug, n.caminho, ...meta[n.slug], corpo));
  }
  console.log(`colegiofavo: versão ${v.toUpperCase()}, ${nav.length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'do', url: E.url, lang: 'pt', cor: '#ECB327', corTextoBotao: '#0F2B4D', fundo: '#0F2B4D', claro: '#F3F8FA',
  fonteTitulo: 'Cabin,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: fontes.a,
  favicon: '/assets/favicon.webp', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: nav.length, texto: 'Clara, no azul-petróleo do logo. A barra azul de acessos do site de hoje (portal do aluno, boleto, calendário e matrícula) continua no topo; na capa, os alunos do banner de matrículas sobre um favo grande, como os três favos do logo.', pontos: ['As 4 etapas, do Grupo 2 ao Médio, numa trilha de favos', 'Missão, visão e valores, projetos e parceiros (FTD, Clever Up)', 'Fotos reais da estrutura, sem as faixas escritas por cima'] },
    { letra: 'b', nome: nomesVersao.b, paginas: nav.length, texto: 'Mais forte no azul-marinho e no amarelo-mel. A porta dupla da home atual (Colégio Favo e Favo de Mel Kids) virou a capa, com os alunos e as crianças dos banners, e o mel escorrendo do site atual como divisa.', pontos: ['Missão, visão e valores num favo de três células', 'Estrutura em abas: chegada, salas, Infantil, esporte e Médio', 'Projetos do Colégio e do Kids lado a lado'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('colegiofavo: escolha em public/index.html');
