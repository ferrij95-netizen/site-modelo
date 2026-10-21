// Monta as páginas das versões A ("Escritório": fiel ao site atual, faixa azul com o logo na aba branca, atalhos em ícones,
// agenda tributária na abertura) e B ("Balancete": títulos em Oswald como o site atual, números em livro-razão, serviços como
// plano de contas e o mês da empresa numa linha do tempo). Estilos em public/assets/{base,a,b}.css.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, textos as T, numeros, inicio, segmentos, servicos, depoimentos, clientes, atalhos, agenda, noticias, utilitarios, artigos, temas } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const chama = fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), '../public/assets/chama.svg'), 'utf8')
  .replace('<svg ', '<svg aria-hidden="true" focusable="false" class="chama" ');
const frase = s => /^[A-ZÀ-Ú0-9 :,–-]+$/.test(s) ? s.charAt(0) + s.slice(1).toLowerCase() : s;

export const nomesVersao = { a: 'Escritório', b: 'Balancete' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'sobre', nome: 'Sobre nós', caminho: 'sobre/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'parceiros', nome: 'Parceiros', caminho: 'parceiros/' },
  { slug: 'depoimentos', nome: 'Depoimentos', caminho: 'depoimentos/' },
  { slug: 'artigos', nome: 'Artigos', caminho: 'artigos/' },
  { slug: 'utilitarios', nome: 'Utilitários', caminho: 'utilitarios/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  fora: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cadeado: '<rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  // atalhos (traço fino como os ícones do site atual)
  artigos: '<path d="M6 2.5h9l4 4v15H6z"/><path d="M15 2.5v4h4M9 10h7M9 13h7M9 16h7M9 19h5"/>',
  utilitarios: '<rect x="5" y="2.5" width="14" height="19" rx="1.5"/><rect x="7.5" y="5" width="9" height="3.5"/><path d="M8 12h.01M12 12h.01M16 12h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01M16 18h.01" stroke-width="2.4"/>',
  tabelas: '<path d="M3 9l9-4.5L21 9l-9 4.5z"/><path d="M3 12.5l9 4.5 9-4.5M3 16l9 4.5 9-4.5"/>',
  manual: '<path d="M12 6c-2-1.6-5-2-8.5-1.5v14c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5v-14C17 4 14 4.4 12 6z"/><path d="M12 6v14"/>',
  indices: '<path d="M3 3v18h18"/><path d="M6 17l4-6 3 3 3-7 4 4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Führ Contabilidade e gostaria de falar com a equipe.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const fora = ' target="_blank" rel="noopener"';
const hrefAtalho = (v, a) => a.pag ? `/${v}/${a.pag}` : a.url;
const alvoAtalho = a => a.pag ? '' : fora;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600'
    : 'family=Oswald:wght@400;500;600&family=Inter:wght@400;500;600';
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
<meta property="og:site_name" content="${E.completo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0951A1">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script>window.AGENDA=${JSON.stringify(agenda)}</script>
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const botaoArea = cls => `<a class="${cls}" href="#area-cliente">${ic('cadeado')}<span>Área do cliente</span></a>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa"><div class="in">
  <a href="tel:${E.fones[0].h}">${ic('tel')} ${E.fones[0].t}</a>
  <a href="${waLink()}"${fora}>${ic('wa')} ${E.celular}</a>
  <a class="so-pc" href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
  ${botaoArea('faixa-area')}
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Führ Contabilidade, página inicial"><img src="/assets/logo.svg" alt="Führ Contabilidade" width="1348" height="876"><small>${E.crc}</small></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Führ Contabilidade, página inicial"><img src="/assets/logo.svg" alt="Führ Contabilidade" width="1348" height="876"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.fones[0].h}">${ic('tel')} ${E.fones[0].t}</a></nav>
  ${botaoArea('topo-area')}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

// Área restrita iDocumentos (mesmo formulário do site atual, abre o sistema da Ideal em outra aba).
const areaCliente = v => `<section class="area" id="area-cliente">${chama}<div class="in">
  <div class="area-txt"><p class="eyebrow">iDocumentos · área restrita</p><h2>Área do cliente</h2><p>Guias, folhas e documentos da sua empresa, a qualquer hora. Use o usuário e a senha que a equipe da Führ enviou para você.</p></div>
  <form class="area-form" action="${E.idoc.action}" method="post" target="_blank" accept-charset="utf-8">
    <label><span>Usuário</span><input type="text" name="inp_login" autocomplete="username" required></label>
    <label><span>Senha</span><input type="password" name="inp_senha" autocomplete="current-password" required></label>
    <input type="hidden" name="inp_codigo" value="${E.idoc.codigo}">
    <button type="submit">${ic('cadeado')} Entrar</button>
    <p class="area-ajuda">Esqueceu a senha? <a href="${waLink('Olá! Preciso de ajuda com o acesso ao iDocumentos.')}"${fora}>Fale com a equipe</a>.</p>
  </form>
</div></section>`;

function rodape(v) {
  return `${areaCliente(v)}
<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Führ Contabilidade" width="1348" height="876"><p>${E.completo}. Contabilidade, consultoria e gestão em Lajeado desde ${E.fundacao}.</p><p class="rod-crc">${E.crc}</p></div>
  <div><h3>Localização</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}"${fora}>${ic('pin')} Ver no mapa</a></div>
  <div><h3>Contato</h3><p>${E.fones.map(f => `<a href="tel:${f.h}">${f.t}</a>`).join('<br>')}<br><a href="${waLink()}"${fora}>Celular e WhatsApp ${E.celular}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}</nav>
</div><p class="rod-fim">© ${E.completo} · Lajeado, RS</p></footer>
<a class="wa-flut" href="${waLink()}"${fora} aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
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

// Título de seção: na A, título com a chama dourada do logo; na B, rótulo numerado como conta contábil e título em Oswald.
const tit = (v, titulo, { eyebrow, conta, tag = 'h2', id, cls = '' } = {}) => v === 'a'
  ? `<div class="tit ${cls}"${id ? ` id="${id}"` : ''}>${eyebrow ? `<p class="eyebrow">${chama}${eyebrow}</p>` : ''}<${tag}>${titulo}</${tag}></div>`
  : `<div class="tit ${cls}"${id ? ` id="${id}"` : ''}>${eyebrow ? `<p class="eyebrow">${conta ? `<b>${conta}</b>` : ''}${eyebrow}</p>` : ''}<${tag}>${titulo}</${tag}></div>`;

const capa = (v, eyebrow, titulo, sub) => v === 'a'
  ? `<section class="capa"><div class="in"><p class="eyebrow">${chama}${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`
  : `<section class="capa">${chama}<div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- blocos ----------
const calendario = (cls = '') => `<div class="agenda ${cls}" data-agenda>
  <div class="ag-topo"><p class="ag-rot">Agenda tributária</p><p class="ag-mes" data-ag-mes>Outubro de 2026</p></div>
  <div class="ag-grade" data-ag-grade role="grid" aria-label="Dias do mês"></div>
  <p class="ag-leg"><span class="ag-ponto"></span> dias com obrigações · toque no dia para ver o que vence</p>
  <p class="ag-links"><a href="${agenda.link}"${fora}>Agenda federal completa ${ic('fora')}</a><a href="${agenda.estadual}"${fora}>Agenda estadual ${ic('fora')}</a></p>
</div>`;

const listaNoticias = (n = 5) => `<ul class="noticias">${noticias.itens.slice(0, n).map(x => `<li><a href="${x.u}"${fora}><time>${x.d}</time><span>${esc(x.t)}</span></a></li>`).join('')}</ul>
<a class="link-seta" href="${noticias.todas}"${fora}>Ver todas as notícias ${ic('seta')}</a>`;

const comCorpo = artigos.filter(a => a.corpo);
const linkArtigo = (v, a) => a.corpo ? `/${v}/artigos/${a.slug}/` : a.url;
const alvoArtigo = a => a.corpo ? '' : fora;

const logoCliente = (c, cls = '') => `<img class="${cls}" src="/assets/img/clientes/${c}.png" alt="" loading="lazy" decoding="async">`;

const contatoLinhas = () => `<ul class="contato-linhas">
  <li>${ic('tel')}<div><b>Telefones</b>${E.fones.map(f => `<a href="tel:${f.h}">${f.t}</a>`).join(' · ')}</div></li>
  <li>${ic('wa')}<div><b>Celular e WhatsApp</b><a href="${waLink()}"${fora}>${E.celular}</a></div></li>
  <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><b>Endereço</b>${E.endereco.join(', ')}<a href="${E.mapa}"${fora}>Ver no mapa</a></div></li>
</ul>`;

const formContato = () => `<form class="form-contato" data-contato>
  <div class="campos">
    <label><span>Nome</span><input name="nome" autocomplete="name" required></label>
    <label><span>E-mail</span><input name="email" type="email" autocomplete="email" required></label>
    <label><span>Telefone</span><input name="telefone" type="tel" autocomplete="tel"></label>
    <label><span>Cidade/UF</span><input name="cidade" autocomplete="address-level2"></label>
    <label class="largo"><span>Assunto</span><select name="assunto">
      <option>Quero abrir uma empresa</option><option>Quero trocar de contador</option><option>Planejamento tributário</option><option>Departamento pessoal</option><option>Já sou cliente</option><option>Outro assunto</option>
    </select></label>
    <label class="largo"><span>Mensagem</span><textarea name="mensagem" rows="5"></textarea></label>
  </div>
  <div class="form-botoes"><button type="submit" name="via" value="email">${ic('mail')} Enviar por e-mail</button><button type="submit" name="via" value="whats" class="sec">${ic('wa')} Enviar pelo WhatsApp</button></div>
</form>`;

// Corpo do artigo: linhas com ✅, ☑️, ·, • ou "-" viram lista; perguntas e linhas curtas sem ponto viram subtítulo.
function corpoArtigo(linhas) {
  let html = '', lista = false;
  const fecha = () => { if (lista) { html += '</ul>'; lista = false; } };
  linhas.forEach((l0, i) => {
    let l = l0.replace(/[✨☑️✅]️?/g, '').replace('entendao', 'entenda o').replace('DeRE,;', 'DeRE;').trim();
    if (!l) return;
    const marcador = /^[✅☑·•-]/.test(l0.trim()) || /;$/.test(l) || (/;$/.test(linhas[i - 1] || '') && l.length < 70);
    if (marcador) {
      l = l.replace(/^[·•-]\s*/, '');
      const m = l.match(/^([^:]{3,60}):\s*(.*)$/);
      if (!lista) { html += '<ul>'; lista = true; }
      html += `<li>${m ? `<b>${esc(m[1])}:</b> ${esc(m[2])}` : esc(l)}</li>`;
      return;
    }
    fecha();
    const num = l.match(/^(\d+) - (.*?):?$/);
    if (num) html += `<h3><span>${num[1]}</span>${esc(num[2])}</h3>`;
    else if ((/\?$/.test(l) && l.length < 90 && i > 0) || (l.length < 60 && !/[.!]$/.test(l) && !/:$/.test(l))) html += `<h2>${esc(l)}</h2>`;
    else html += `<p>${esc(l)}</p>`;
  });
  fecha();
  return html;
}

// ---------- páginas ----------
function home(v) {
  const atalhosHtml = v === 'a'
    ? `<section class="atalhos" aria-label="Ferramentas"><div class="in">${atalhos.map(a => `<a href="${hrefAtalho(v, a)}"${alvoAtalho(a)}>${ic(a.id, 'ic-at')}<b>${a.nome}</b><span>${a.t}</span></a>`).join('')}</div></section>`
    : `<section class="atalhos" aria-label="Ferramentas"><div class="in"><p class="at-rot">Ferramentas do contribuinte</p>${atalhos.map((a, i) => `<a href="${hrefAtalho(v, a)}"${alvoAtalho(a)}><i>0${i + 1}</i><b>${a.nome}</b>${ic(a.url ? 'fora' : 'seta')}</a>`).join('')}</div></section>`;

  if (v === 'a') return pagina(v, 'index', '', `${E.completo} · Lajeado, RS`, 'Contabilidade, consultoria tributária, societária e trabalhista em Lajeado (RS) desde 2009. Mais de 100 empresas atendidas.', `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">${chama}Contabilidade e assessoria em Lajeado desde ${E.fundacao}</p>
    <h1>Contabilidade com qualidade, segurança e agilidade para a sua empresa crescer.</h1>
    <p class="hero-sub">Rotinas contábeis e fiscais, planejamento tributário, gestão societária e departamento pessoal, com uma equipe em permanente atualização com a legislação.</p>
    <div class="botoes"><a class="btn" href="/a/contato/">Falar com a equipe ${ic('seta')}</a><a class="btn btn-sec" href="/a/servicos/">O que fazemos</a></div>
    <ul class="hero-num">${numeros.map(n => `<li><b>${n.n}</b><span>${n.t}</span></li>`).join('')}</ul>
  </div>
  ${calendario('ag-hero')}
</div></section>
${atalhosHtml}
<section class="bemvindo"><div class="in">
  <div>${tit(v, 'Bem-vindo à Führ', { eyebrow: 'Sobre nós' })}
    <p class="lead">${T.bemVindo}</p>
    <p>${T.historia[0]} ${T.historia[1]}</p>
    <a class="link-seta" href="/a/sobre/">Conheça o escritório ${ic('seta')}</a></div>
  <figure class="citacao">${chama}<blockquote>“${T.frase.t}”</blockquote><figcaption>${T.frase.autor}</figcaption></figure>
</div></section>
<section class="servicos-home"><div class="in">
  ${tit(v, 'O que fazemos', { eyebrow: 'Serviços' })}
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist">${servicos.map((s, i) => `<button role="tab" type="button" id="aba-${s.id}" aria-controls="painel-${s.id}" aria-selected="${i === 0}"><i>0${i + 1}</i>${s.nome}</button>`).join('')}</div>
    ${servicos.map((s, i) => `<div class="abas-painel" role="tabpanel" id="painel-${s.id}" aria-labelledby="aba-${s.id}"${i ? ' hidden' : ''}><p class="ab-num">0${i + 1}</p><h3>${s.nome}</h3><p>${s.resumo}</p><ul>${s.itens.map(x => `<li>${ic('ok')}${x}</li>`).join('')}</ul><a class="link-seta" href="/a/servicos/#${s.id}">Detalhes ${ic('seta')}</a></div>`).join('')}
  </div>
</div></section>
<section class="segmentos"><div class="in">
  <p class="eyebrow">Atendemos empresas de</p>
  <p class="seg-lista">${segmentos.map(s => `<span>${s}</span>`).join('')}</p>
</div></section>
<section class="depo-home"><div class="in">
  ${tit(v, 'Quem trabalha com a Führ', { eyebrow: 'Depoimentos' })}
  <div class="depo-slider" data-slider>
    ${depoimentos.map((d, i) => `<figure class="depo"${i ? ' hidden' : ''}><blockquote>${d.t}</blockquote><figcaption>${d.logo ? logoCliente(d.logo) : ''}<span>${d.quem}</span></figcaption></figure>`).join('')}
    <div class="slider-nav"><button type="button" data-ant aria-label="Depoimento anterior">${ic('seta')}</button><span data-pos>1 / ${depoimentos.length}</span><button type="button" data-prox aria-label="Próximo depoimento">${ic('seta')}</button></div>
  </div>
  <div class="logos-faixa">${clientes.map(c => logoCliente(c.logo)).join('')}</div>
</div></section>
<section class="noticias-home"><div class="in">
  <div>${tit(v, 'Últimas notícias', { eyebrow: 'Ideal News' })}${listaNoticias(4)}</div>
  <div>${tit(v, 'iArtigos da equipe', { eyebrow: 'Artigos' })}
    <ul class="artigos-mini">${comCorpo.slice(0, 3).map(a => `<li><a href="${linkArtigo(v, a)}"><span class="tema">${temas[a.id] || 'Artigo'}</span><b>${esc(frase(a.titulo))}</b><time>${a.data}</time></a></li>`).join('')}</ul>
    <a class="link-seta" href="/a/artigos/">Todos os artigos ${ic('seta')}</a></div>
</div></section>`);

  // B
  return pagina(v, 'index', '', `${E.completo} · Lajeado, RS`, 'Contabilidade, consultoria tributária, societária e trabalhista em Lajeado (RS) desde 2009. Mais de 100 empresas atendidas.', `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">${E.crc} · Lajeado, RS</p>
    <h1>Contabilidade, consultoria e gestão para empresas do Vale do Taquari</h1>
    <p class="hero-sub">${T.missao}</p>
    <div class="botoes"><a class="btn" href="/b/contato/">Falar com a equipe ${ic('seta')}</a><a class="btn btn-sec" href="/b/servicos/">Ver o plano de serviços</a></div>
  </div>
  <div class="razao">${chama}
    <p class="razao-tit">Führ Contabilidade · resumo</p>
    <dl>
      <div><dt>Fundação</dt><dd>${E.fundacao}</dd></div>
      <div><dt>Começamos com</dt><dd>${inicio.colab} pessoas · ${inicio.clientes} clientes</dd></div>
      <div><dt>Colaboradores hoje</dt><dd>10</dd></div>
      <div><dt>Empresas atendidas</dt><dd>100+</dd></div>
      <div><dt>Áreas de atuação</dt><dd>${servicos.length}</dd></div>
    </dl>
    <p class="razao-fim">Sala 404, Rua Júlio de Castilhos, 745 · Centro</p>
  </div>
</div></section>
${atalhosHtml}
<section class="plano"><div class="in">
  ${tit(v, 'Plano de serviços', { eyebrow: 'O que fazemos', conta: '1' })}
  <div class="plano-grade">${servicos.map((s, i) => `<div class="conta" id="${s.id}"><h3><i>${i + 1}</i>${s.nome}</h3><ol>${s.itens.map((x, k) => `<li><i>${i + 1}.${k + 1}</i>${x}</li>`).join('')}</ol></div>`).join('')}</div>
</div></section>
<section class="mes"><div class="in">
  ${tit(v, 'Um mês da sua empresa com a Führ', { eyebrow: 'Como trabalhamos', conta: '2' })}
  <ol class="mes-linha" data-mes>
    <li style="--ini:0;--fim:.2"><b>Dia 1 ao 5</b><h3>Documentos chegam</h3><p>Notas, extratos e movimentos do mês enviados pelo iDocumentos ou entregues no escritório.</p></li>
    <li style="--ini:.2;--fim:.45"><b>Primeira quinzena</b><h3>Folha e encargos</h3><p>Folha de pagamento, pró-labore, férias e rescisões, com as guias de FGTS e INSS.</p></li>
    <li style="--ini:.45;--fim:.7"><b>Até o dia 20</b><h3>Impostos apurados</h3><p>Apuração fiscal e guias de impostos no prazo, conferidas pela equipe e disponíveis na área do cliente.</p></li>
    <li style="--ini:.7;--fim:1"><b>Fechamento</b><h3>Números para decidir</h3><p>Lançamentos contábeis, balancete e análise para as decisões do mês seguinte.</p></li>
  </ol>
  <div class="mes-regua" aria-hidden="true">${Array.from({ length: 31 }, (_, i) => `<span>${i + 1}</span>`).join('')}</div>
</div></section>
<section class="seg"><div class="in">
  ${tit(v, 'Segmentos atendidos', { eyebrow: 'Clientes', conta: '3' })}
  <ol class="seg-grade">${segmentos.map((s, i) => `<li><i>${String(i + 1).padStart(2, '0')}</i>${s}</li>`).join('')}</ol>
</div></section>
<section class="depo-b"><div class="in">
  ${tit(v, 'O que dizem os clientes', { eyebrow: 'Depoimentos', conta: '4' })}
  <div class="depo-grade">${depoimentos.slice(0, 3).map(d => `<figure><blockquote>“${d.t}”</blockquote><figcaption>${d.quem}</figcaption></figure>`).join('')}</div>
  <a class="link-seta" href="/b/depoimentos/">Todos os depoimentos ${ic('seta')}</a>
</div></section>
<section class="agenda-b"><div class="in">
  <div>${tit(v, 'Agenda tributária', { eyebrow: 'Prazos do mês', conta: '5' })}${calendario()}</div>
  <div>${tit(v, 'Últimas notícias', { eyebrow: 'Ideal News', conta: '6' })}${listaNoticias(5)}</div>
</div></section>`);
}

function sobre(v) {
  return pagina(v, 'sobre', 'sobre/', `Sobre nós · ${E.completo}`, 'A Führ Contabilidade e Assessoria foi fundada em 2009 em Lajeado (RS). Hoje são 10 colaboradores e mais de 100 clientes.', `
${capa(v, 'Sobre nós', 'Desde 2009 no Centro de Lajeado', 'De 3 colaboradores e cerca de 30 clientes para uma equipe de 10 pessoas que atende mais de 100 empresas.')}
<section class="historia"><div class="in">
  <div class="hist-txt">${T.historia.map(p => `<p>${p}</p>`).join('')}</div>
  <div class="cresc" aria-label="Crescimento da Führ">
    <div class="cresc-col"><p class="cresc-ano">${E.fundacao}</p><p><b>${inicio.colab}</b> colaboradores</p><p><b>${inicio.clientes}</b> clientes</p></div>
    <div class="cresc-seta">${ic('seta')}</div>
    <div class="cresc-col hoje"><p class="cresc-ano">Hoje</p><p><b>10</b> colaboradores</p><p><b>100+</b> clientes</p></div>
  </div>
</div></section>
<section class="mvv"><div class="in">
  <div class="mvv-item"><h2>Missão</h2><p>${T.missao}</p></div>
  <div class="mvv-item"><h2>Visão</h2><p>${T.visao}</p></div>
  <div class="mvv-item"><h2>Valores</h2><ul>${T.valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>
<section class="seg-sobre"><div class="in">
  ${tit(v, 'Clientes dos mais variados segmentos', { eyebrow: 'Quem atendemos', conta: '1' })}
  <p class="seg-lista">${segmentos.map(s => `<span>${s}</span>`).join('')}</p>
  <a class="link-seta" href="/${v}/parceiros/">Conheça alguns clientes ${ic('seta')}</a>
</div></section>`);
}

function paginaServicos(v) {
  return pagina(v, 'servicos', 'servicos/', `Serviços · ${E.completo}`, 'Assessoria contábil e fiscal, planejamento tributário e financeiro, gestão societária e recursos humanos em Lajeado (RS).', `
${capa(v, 'Nossos serviços', 'O que fazemos', 'Quatro áreas que cobrem a rotina da empresa, da abertura do CNPJ ao balanço do fim do ano.')}
<section class="serv-lista"><div class="in">
  ${servicos.map((s, i) => `<article class="serv" id="${s.id}">
    <div class="serv-cab"><p class="serv-n">${v === 'b' ? i + 1 : '0' + (i + 1)}</p><h2>${s.nome}</h2><p>${s.resumo}</p></div>
    <ul>${s.itens.map((x, k) => `<li>${v === 'b' ? `<i>${i + 1}.${k + 1}</i>` : ic('ok')}<span>${x}</span></li>`).join('')}</ul>
  </article>`).join('')}
</div></section>
<section class="cta"><div class="in"><h2>Quer saber qual regime tributário é o melhor para a sua empresa?</h2><p>A análise de viabilidade do regime é um dos serviços da Führ. Conte como é a sua empresa e a equipe retorna.</p><a class="btn" href="/${v}/contato/">Pedir uma análise ${ic('seta')}</a></div></section>`);
}

function parceiros(v) {
  return pagina(v, 'parceiros', 'parceiros/', `Parceiros · ${E.completo}`, 'Conheça alguns dos clientes da Führ Contabilidade e aproveite para visitar as suas páginas.', `
${capa(v, 'Parceiros', 'Conheça alguns de nossos parceiros', 'Conheça alguns dos nossos clientes e aproveite para visitar as suas páginas!')}
<section class="parc"><div class="in"><ul class="parc-grade">${clientes.map(c => `<li>${c.url ? `<a href="${c.url}"${fora}>` : '<div>'}${logoCliente(c.logo)}<span>${c.nome}${c.url ? ` ${ic('fora')}` : ''}</span>${c.url ? '</a>' : '</div>'}</li>`).join('')}</ul></div></section>`);
}

function paginaDepo(v) {
  return pagina(v, 'depoimentos', 'depoimentos/', `Depoimentos · ${E.completo}`, 'O que os clientes dizem sobre o trabalho da Führ Contabilidade.', `
${capa(v, 'Depoimentos', 'O que dizem os nossos clientes', '')}
<section class="depos"><div class="in">${depoimentos.map((d, i) => `<figure class="depo-item d${i}"><blockquote>“${d.t}”</blockquote><figcaption>${d.logo ? logoCliente(d.logo) : ''}<span>${d.quem}</span></figcaption></figure>`).join('')}</div></section>`);
}

function paginaArtigos(v) {
  const [dest, ...resto] = comCorpo;
  return pagina(v, 'artigos', 'artigos/', `iArtigos · ${E.completo}`, 'Artigos da equipe da Führ Contabilidade sobre reforma tributária, Simples Nacional, rotinas trabalhistas e gestão.', `
${capa(v, 'iArtigos', 'Artigos da equipe', 'Reforma tributária, Simples Nacional, rotinas trabalhistas e gestão, explicados para o dia a dia da empresa.')}
<section class="art-lista"><div class="in">
  <a class="art-dest" href="${linkArtigo(v, dest)}"><span class="tema">${temas[dest.id]}</span><h2>${esc(dest.titulo)}</h2><p>${esc(dest.corpo[0])}</p><time>${dest.data}</time></a>
  <ul class="art-grade">${resto.map(a => `<li><a href="${linkArtigo(v, a)}"><span class="tema">${temas[a.id] || 'Artigo'}</span><b>${esc(frase(a.titulo))}</b><time>${a.data}</time></a></li>`).join('')}</ul>
  <h2 class="art-arq">Arquivo</h2>
  <ul class="art-arquivo">${artigos.filter(a => !a.corpo).map(a => `<li><a href="${a.url}"${fora}><time>${a.data}</time><span>${esc(frase(a.titulo))}</span>${ic('fora')}</a></li>`).join('')}</ul>
</div></section>`);
}

function paginaArtigo(v, a) {
  const outros = comCorpo.filter(x => x !== a).slice(0, 3);
  return pagina(v, 'artigos', `artigos/${a.slug}/`, `${a.titulo} · ${E.nome}`, a.corpo[0].slice(0, 155), `
<article class="artigo"><div class="in">
  <p class="art-volta"><a href="/${v}/artigos/">${ic('seta')} iArtigos</a></p>
  <header><span class="tema">${temas[a.id] || 'Artigo'}</span><h1>${esc(a.titulo)}</h1><p><time>${a.data}</time> · Equipe ${E.nome}</p></header>
  <div class="art-corpo">${corpoArtigo(a.corpo)}</div>
  <aside class="art-cta"><p>Ficou com dúvida sobre como isso afeta a sua empresa?</p><a class="btn" href="${waLink(`Olá! Li o artigo "${a.titulo}" no site e tenho uma dúvida.`)}"${fora}>${ic('wa')} Falar com a equipe</a></aside>
</div></article>
<section class="art-outros"><div class="in"><h2>Leia também</h2><ul class="art-grade">${outros.map(x => `<li><a href="${linkArtigo(v, x)}"><span class="tema">${temas[x.id] || 'Artigo'}</span><b>${esc(frase(x.titulo))}</b><time>${x.data}</time></a></li>`).join('')}</ul></div></section>`);
}

function paginaUtil(v) {
  return pagina(v, 'utilitarios', 'utilitarios/', `Utilitários contábeis · ${E.completo}`, 'Links úteis para empresas e contribuintes: Receita Federal, CRC, Secretarias da Fazenda, Previdência, Simples Nacional, FGTS e índices econômicos.', `
${capa(v, 'Utilitários contábeis', 'Links úteis para a sua empresa', 'Receita Federal, CRC, Secretarias da Fazenda, Previdência, Caixa, Simples Nacional e índices econômicos num lugar só.')}
<section class="util"><div class="in">
  <label class="util-busca">${ic('busca')}<input type="search" placeholder="Procurar: CNPJ, certidão, Sefaz RS, IGP-M…" data-util-busca aria-label="Procurar utilitário"></label>
  <p class="util-sem" data-util-sem hidden>Nada encontrado. Tente outra palavra ou <a href="/${v}/contato/">pergunte para a equipe</a>.</p>
  <div class="util-grade">
    ${utilitarios.map(g => g.links
      ? `<details class="util-g" data-util-g${['Receita Federal', 'Simples Nacional', 'Índices Econômicos'].includes(g.nome) ? ' open' : ''}><summary><b>${g.nome}</b><span>${g.links.length}</span></summary><ul>${g.links.map(l => `<li data-util="${esc((g.nome + ' ' + l.t).toLowerCase())}"><a href="${esc(l.u)}"${fora}>${esc(l.t)}${ic('fora')}</a></li>`).join('')}</ul></details>`
      : `<a class="util-g util-unico" data-util-g data-util="${esc(g.nome.toLowerCase())}" href="${esc(g.u)}"${fora}><b>${g.nome}</b>${ic('fora')}</a>`).join('')}
  </div>
  <div class="util-mais">${atalhos.filter(a => a.url).map(a => `<a href="${a.url}"${fora}>${ic(a.id, 'ic-at')}<b>${a.nome}</b><span>${a.t}</span></a>`).join('')}</div>
</div></section>`);
}

function contato(v) {
  return pagina(v, 'contato', 'contato/', `Contato · ${E.completo}`, 'Fale com a Führ Contabilidade: Rua Júlio de Castilhos, 745, sala 404, Centro, Lajeado (RS). (51) 3710-1862.', `
${capa(v, 'Fale conosco', T.contatoFrase, 'Escreva para a equipe pelo formulário, pelo WhatsApp ou passe no escritório, no Centro de Lajeado.')}
<section class="contato"><div class="in">
  <div>${formContato()}</div>
  <div class="contato-lado">${contatoLinhas()}<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: Rua Júlio de Castilhos, 745, Lajeado" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div>
</div></section>`);
}

export function gerarVersao(v) {
  const p = {
    index: home(v), sobre: sobre(v), servicos: paginaServicos(v), parceiros: parceiros(v), depoimentos: paginaDepo(v),
    artigos: paginaArtigos(v), utilitarios: paginaUtil(v), contato: contato(v),
  };
  for (const a of comCorpo) p[`artigos/${a.slug}`] = paginaArtigo(v, a);
  return p;
}
