// Monta as páginas das versões A ("Faixas": fiel ao site atual, amarelo da fachada, faixas azuis do logo,
// as três fotos de carreta e a faixa grafite de Atuação/Coleta/Tecnologia) e B ("Rota": azul e amarelo da
// apresentação comercial, mapa Guarulhos → Norte com distância e prazo de cada filial).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, numeros, historia, trajetoria, valores, frota, tecnologia, filiais, estados, cidades, mapa, departamentos, social, qualidade, fotos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, extra = '', alt = fotos[n][0]) => {
  const [, w, h] = fotos[n];
  return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${/loading=/.test(extra) ? '' : ' loading="lazy"'} decoding="async"${extra}>`;
};
const fig = (n, cls = '', legenda = '') => `<figure${cls ? ` class="${cls}"` : ''}>${img(n)}${legenda ? `<figcaption>${esc(legenda)}</figcaption>` : ''}</figure>`;
const telHref = n => '+55' + n.replace(/\D/g, '');
const waHref = (n, txt = 'Olá! Vim pelo site da Transpérola.') => `https://wa.me/55${n.replace(/\D/g, '')}?text=${encodeURIComponent(txt)}`;
const waLink = (txt = 'Olá! Vim pelo site da Transpérola e gostaria de uma cotação.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const F = id => filiais.find(f => f.id === id);

export const nomesVersao = { a: 'Faixas', b: 'Rota' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A empresa', caminho: 'empresa/' },
  { slug: 'atuacao', nome: 'Área de atuação', caminho: 'atuacao/' },
  { slug: 'tecnologia', nome: 'Tecnologia', caminho: 'tecnologia/' },
  { slug: 'coleta', nome: 'Coleta e cotação', caminho: 'coleta/' },
  { slug: 'qualidade', nome: 'Qualidade', caminho: 'qualidade/' },
  { slug: 'contato', nome: 'Fale conosco', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  caixa: '<path d="M3 8l9-4 9 4v9l-9 4-9-4z"/><path d="M3 8l9 4 9-4M12 12v9"/>',
  radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12l6-6"/><circle cx="12" cy="12" r="1"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  portal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h4"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Faixas azuis do logo, redesenhadas como elemento gráfico (7 linhas, como no logo atual).
const faixas = (cls = 'faixas') => `<svg class="${cls}" viewBox="0 0 400 70" preserveAspectRatio="none" aria-hidden="true">${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect y="${i * 10}" width="400" height="${i === 0 || i === 6 ? 6 : 5}"/>`).join('')}</svg>`;

// ---------- mapa (estados do IBGE simplificados, cidades das 11 unidades) ----------
const cobertura = { AC: 'todo', RO: 'todo', SP: 'parcial', PR: 'parcial' };
function mapaSvg({ cls = 'mapa-br', rotas = true, rotulos = true } = {}) {
  const [gx, gy] = mapa.cidades.guarulhos;
  const ests = Object.entries(mapa.estados).map(([uf, d]) => `<path d="${d}" class="uf${cobertura[uf] ? ' ' + cobertura[uf] : ''}" data-uf="${uf}"/>`).join('');
  const linhas = rotas ? filiais.filter(f => f.id !== 'guarulhos').map(f => {
    const [x, y] = mapa.cidades[f.id];
    const mx = (gx + x) / 2, my = Math.min(gy, y) - Math.abs(gx - x) * 0.18;
    return `<path class="rota" data-rota="${f.id}" d="M${gx} ${gy}Q${mx.toFixed(0)} ${my.toFixed(0)} ${x} ${y}"/>`;
  }).join('') : '';
  const pontos = filiais.map(f => {
    const [x, y] = mapa.cidades[f.id];
    const lado = ['riobranco', 'guajaramirim', 'ariquemes', 'jiparana', 'maringa'].includes(f.id) ? 'end' : 'start';
    const dx = lado === 'end' ? -12 : 12;
    const dy = { portovelho: -6, ariquemes: 2, jiparana: 4, cacoal: 8, vilhena: 10, guajaramirim: 16, londrina: -12, maringa: 14, birigui: -2 }[f.id] || 4;
    return `<g class="ponto${f.id === 'guarulhos' ? ' matriz' : ''}" data-ponto="${f.id}"><title>${f.cidade}/${f.uf}</title><circle cx="${x}" cy="${y}" r="${f.id === 'guarulhos' ? 9 : 6.5}"/>${rotulos ? `<text x="${x + dx}" y="${y + dy}" text-anchor="${lado}">${f.cidade}</text>` : ''}</g>`;
  }).join('');
  return `<svg class="${cls}" viewBox="0 0 ${mapa.w} ${mapa.h - 120}" role="img" aria-label="Mapa do Brasil com a matriz em Guarulhos e as filiais em SP, PR, RO e AC">${ests}${linhas}${pontos}</svg>`;
}

function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
  const fontes = v === 'a'
    ? 'family=Inter+Tight:wght@700;800;900&family=Inter:wght@400;500;600'
    : 'family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600';
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
<meta name="theme-color" content="${v === 'a' ? '#FFD902' : '#14107a'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const logo = (v, cls = 'logo') => `<a class="${cls}" href="/${v}/" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Transpérola · Transportando o futuro" width="640" height="205"></a>`;

function topo(v, atual) {
  const portal = `<a class="btn-portal" href="${E.portal}" target="_blank" rel="noopener">${ic('portal')}<span>Portal · Rastrear carga</span></a>`;
  if (v === 'a') return `<header class="topo"><div class="in">
  ${logo(v)}
  <div class="topo-acoes">${portal}<a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div>
<nav id="menu" class="menu" aria-label="Principal"><div class="in">${menu(v, atual)}</div></nav></header>`;
  return `<div class="faixa-topo"><div class="in"><span>${ic('relogio')} ${E.horario}</span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a class="so-pc" href="mailto:${E.email}">${ic('mail')} ${E.email}</a></div></div>
<header class="topo"><div class="in">
  ${logo(v)}
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${portal}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><p class="rod-slogan">www.transperola.com.br <span>|</span> transportando o futuro</p><p>Transporte rodoviário de cargas desde 1973. Matriz em Guarulhos/SP e filiais próprias em São Paulo, Paraná, Rondônia e Acre.</p></div>
  <div><h3>Matriz</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div>
  <div><h3>Atendimento</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br>Fax ${E.fax}<br>${E.horario}</p><p><a href="mailto:${E.email}">${E.email}</a></p></div>
  <div><h3>Serviços online</h3><p><a href="${E.portal}" target="_blank" rel="noopener">Portal do cliente e rastreio</a><br><a href="${E.formColeta}" target="_blank" rel="noopener">Solicitar coleta</a><br><a href="${E.formCotacao}" target="_blank" rel="noopener">Pedir cotação</a><br><a href="${E.facebook}" target="_blank" rel="noopener">Facebook</a></p></div>
</div>
<nav aria-label="Rodapé" class="rod-nav"><div class="in">${menu(v, '')}</div></nav>
<p class="rod-fim">© ${E.razao} · Guarulhos/SP</p></footer>
<a class="wa-flut" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === slug).caminho, titulo, descricao)}
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

// ---------- blocos comuns ----------
const prazoTxt = f => f.prazo ? `${f.prazo[0]} dias úteis na cidade-sede · ${f.prazo[1]} no interior` : 'Coleta e distribuição na Grande São Paulo';
const dadosRotas = JSON.stringify(Object.fromEntries(filiais.map(f => [f.id, { c: f.cidade, uf: f.uf, km: f.km, p: f.prazo || null }]))).replace(/</g, '\\u003c');

// busca de cidade: a lista inteira vai no HTML (funciona sem JS), o script só filtra.
const buscaCidades = (v) => `<div class="busca" data-busca>
  <label class="busca-campo">${ic('busca')}<span class="sr">Buscar cidade</span><input type="search" placeholder="Digite a cidade de destino" autocomplete="off" data-busca-input></label>
  <p class="busca-info" data-busca-info aria-live="polite">${cidades.length} cidades atendidas em ${estados.length} estados.</p>
  <ul class="cidades" data-busca-lista>${cidades.map(c => { const f = F(c.filial); return `<li data-nome="${esc(c.nome.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''))}"><b>${esc(c.nome)}</b><span class="uf">${c.uf}</span><a href="/${v}/atuacao/#${f.id}">Filial ${f.cidade}</a>${f.prazo ? `<span class="pz">${c.nome === f.cidade ? f.prazo[0] : f.prazo[1]} dias úteis</span>` : ''}</li>`; }).join('')}</ul>
</div>`;

const contatoForm = () => `<form class="form" id="mensagem" data-mailto="${E.email}" data-assunto="Contato pelo site" data-wa="${E.wa}">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Empresa<input name="Empresa" autocomplete="organization"></label>
    <label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label>Cidade<input name="Cidade" autocomplete="address-level2"></label>
    <label>Assunto<select name="Assunto"><option>Cotação de frete</option><option>Coleta</option><option>Posição de mercadoria</option><option>SAC e devoluções</option><option>Financeiro e faturamento</option><option>Trabalhe conosco</option><option>Outro</option></select></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="4" required></textarea></label>
  </div>
  <div class="form-acoes"><button class="btn btn-wa" type="button" data-envia-wa>${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-linha" type="submit">${ic('mail')} Enviar por e-mail</button></div>
</form>`;

const deptos = () => `<dl class="deptos">${departamentos.map(([d, m]) => `<div><dt>${d}</dt><dd><a href="mailto:${m}">${m}</a></dd></div>`).join('')}</dl>`;
const mapaGoogle = `<div class="mapa-g"><iframe title="Mapa da matriz da Transpérola em Guarulhos" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const servOnline = (v) => [
  { ic: 'caixa', t: 'Solicitar coleta', d: 'A Transpérola faz a coleta da sua carga em qualquer lugar da área de cobertura. Preencha o formulário e a equipe agenda.', href: E.formColeta, b: 'Abrir formulário de coleta' },
  { ic: 'doc', t: 'Pedir cotação', d: 'Informe origem, destino, peso e volume e receba a cotação por e-mail ou WhatsApp.', href: E.formCotacao, b: 'Abrir formulário de cotação' },
  { ic: 'radar', t: 'Rastrear carga', d: 'Consulte o CTRC, a nota fiscal ou a coleta no portal do cliente, com status em tempo real.', href: E.portal, b: 'Entrar no portal' },
];

// ================= VERSÃO A · Faixas =================
const A = {
  home: () => pagina('a', 'index', `${E.nome} · Transporte rodoviário de cargas desde 1973`, 'Transporte rodoviário de cargas fracionadas desde 1973. Matriz em Guarulhos/SP e filiais próprias em Birigui, Londrina, Maringá, Rondônia e Acre, atendendo 130 cidades.', `
<section class="hero">
  <div class="in hero-txt">
    <p class="eyebrow">Transporte rodoviário de cargas · desde 1973</p>
    <h1>Transportando o futuro de São Paulo ao Acre.</h1>
    <p>Frota própria, rastreamento 24 horas e 11 unidades próprias ligando Guarulhos ao Paraná, a Rondônia e ao Acre.</p>
    <div class="botoes"><a class="btn" href="/a/coleta/">${ic('doc')} Pedir cotação</a><a class="btn btn-claro" href="/a/coleta/#coleta">${ic('caixa')} Solicitar coleta</a></div>
  </div>
  <div class="triptico">
    ${fig('cavalo-vermelho', 't1')}${fig('sider-ceu', 't2')}${fig('reflexo', 't3')}
  </div>
</section>

<section class="grafite"><div class="in">
  <a href="/a/atuacao/"><span class="g-ic">${mapaSvg({ cls: 'mini-br', rotas: false, rotulos: false })}</span><span class="g-txt"><b>Atuação</b>Conheça toda a nossa área de atuação: ${cidades.length} cidades em SP, PR, RO e AC.<span class="mais">${ic('seta')} Saiba mais</span></span></a>
  <a href="/a/coleta/#coleta"><span class="g-ic">${ic('caixa', 'ic grande')}</span><span class="g-txt"><b>Coleta</b>A Transpérola faz a coleta da sua carga em qualquer lugar da área de cobertura.<span class="mais">${ic('seta')} Solicitar</span></span></a>
  <a href="/a/tecnologia/"><span class="g-ic">${ic('radar', 'ic grande')}</span><span class="g-txt"><b>Tecnologia</b>Rastreamento via satélite em todos os caminhões, de estrada e de coleta.<span class="mais">${ic('seta')} Saiba mais</span></span></a>
</div></section>

<section class="futuro"><div class="in">
  <div class="futuro-txt">
    ${faixas()}
    <h2>Transportando o futuro</h2>
    <p>A empresa atua no transporte rodoviário de cargas nos estados do Acre, Paraná, Rondônia e São Paulo, com estrutura própria em Rio Branco, Londrina, Maringá, Ariquemes, Cacoal, Ji-Paraná, Guajará-Mirim, Porto Velho, Vilhena e Birigui.</p>
    <p>A matriz fica em Guarulhos/SP, cobrindo mais de cem localidades.</p>
    <ul class="numeros">${numeros.slice(0, 4).map(n => `<li><b>${n.n}</b><span>${n.t}</span></li>`).join('')}</ul>
    <a class="link" href="/a/empresa/">Conheça a nossa história ${ic('seta')}</a>
  </div>
  <figure class="futuro-foto">${img('noite-chuva')}</figure>
</div></section>

<section class="filiais-home"><div class="in">
  <div class="fh-tit"><p class="eyebrow">Fale com a filial</p><h2>Onze unidades próprias.</h2><p>Cada filial tem atendimento, e-mail e WhatsApp próprios para coletas, entregas e posição de carga.</p><a class="btn btn-azul" href="/a/atuacao/">Ver o mapa de atuação ${ic('seta')}</a></div>
  <ul class="fh-lista">${filiais.map(f => `<li><a href="/a/atuacao/#${f.id}"><b>${f.cidade}<small>${f.uf}${f.tipo === 'Matriz' ? ' · Matriz' : ''}</small></b><span>${f.email}</span><span>${f.fone}</span></a></li>`).join('')}</ul>
</div></section>

<section class="frota-a"><div class="in">
  <figure class="fa-foto">${img('galpao')}</figure>
  <div class="fa-txt">
    <p class="eyebrow">Frota própria</p>
    <h2>Sua encomenda vai em caminhão da Transpérola.</h2>
    <p>Frota própria com manutenção periódica e rastreamento, mais uma rede de motoristas parceiros homologados para os picos de demanda.</p>
    <dl class="frota-num">
      <div><dt>Carretas sider</dt><dd>${frota.estrada[0].n}</dd></div>
      <div><dt>Tocos de coleta</dt><dd>${frota.coleta[0].n}</dd></div>
      <div><dt>VUC's e trucks</dt><dd>${frota.coleta[1].n + frota.coleta[2].n}</dd></div>
      <div><dt>Parceiros</dt><dd>+200</dd></div>
    </dl>
  </div>
  <figure class="fa-doca">${img('doca')}</figure>
</div></section>

<section class="faixa-cta"><div class="in">
  <div><h2>Precisa enviar uma carga?</h2><p>Cotação por e-mail ou WhatsApp. Coleta em qualquer ponto da área de cobertura.</p></div>
  <div class="botoes"><a class="btn btn-azul" href="${E.formCotacao}" target="_blank" rel="noopener">${ic('doc')} Pedir cotação</a><a class="btn btn-branco" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
</div></section>`),

  empresa: () => pagina('a', 'empresa', `A empresa · ${E.nome}`, 'Desde 1973 atendendo com segurança, qualidade e pontualidade. A história da Transpérola, de Birigui a Guarulhos e ao Norte do Brasil.', `
<section class="capa"><div class="in">${faixas()}<p class="eyebrow">Sobre a empresa</p><h1>Desde 1973 atendendo com segurança, qualidade e pontualidade.</h1></div></section>
<section class="historia"><div class="in">
  <div class="hist-txt">${historia.map(p => `<p>${p}</p>`).join('')}
    <blockquote>"Rapidez, segurança e tranquilidade são princípios que fazem da Transpérola sinônimo de transportadora."</blockquote></div>
  <figure class="hist-foto">${img('galpao')}<figcaption>Galpão da Transpérola</figcaption></figure>
</div></section>
<section class="linha-tempo"><div class="in">
  <h2>Nossa trajetória</h2>
  <ol class="lt">${trajetoria.map(t => `<li><span class="ano">${t.ano}</span><b>${t.t}</b><p>${t.d}</p></li>`).join('')}</ol>
</div></section>
<section class="valores-a"><div class="in">
  <div><p class="eyebrow">Valores e princípios</p><h2>Nosso objetivo</h2><p>Há mais de 50 anos vencendo obstáculos e atingindo metas, trabalhamos com eficácia e qualidade. Somos uma empresa de olho no futuro, atenta às exigências do mercado para priorizar sempre a total satisfação dos nossos clientes.</p></div>
  <dl>${valores.map(x => `<div><dt>${ic('check')} ${x.t}</dt><dd>${x.d}</dd></div>`).join('')}</dl>
</div></section>
<section class="social-a"><div class="in">
  <figure>${img('napra')}</figure>
  <div><p class="eyebrow">Responsabilidade social</p><h2>Logística solidária até a Amazônia.</h2><p>${social.texto}</p><p>${social.texto2}</p></div>
</div></section>`),

  atuacao: () => pagina('a', 'atuacao', `Área de atuação · ${E.nome}`, `Cidades atendidas pela Transpérola: ${cidades.length} cidades em São Paulo, Paraná, Rondônia e Acre, com filiais próprias.`, `
<section class="capa"><div class="in">${faixas()}<p class="eyebrow">Área de atuação</p><h1>Conheça as cidades atendidas pela Transpérola.</h1></div></section>
<section class="atuacao-a"><div class="in">
  <div class="at-mapa">${mapaSvg({ rotas: false })}<ul class="legenda"><li><i class="todo"></i>Atende todo o estado</li><li><i class="parcial"></i>Atende parcialmente</li><li><i class="pt"></i>Unidade própria</li></ul></div>
  <div class="at-busca"><h2>Sua cidade está na rota?</h2>${buscaCidades('a')}</div>
</div></section>
<section class="filiais-a"><div class="in">
  <h2>Filiais</h2>
  ${['sudeste', 'sul', 'norte'].map(g => `<h3 class="grupo">${{ sudeste: 'São Paulo', sul: 'Paraná', norte: 'Rondônia e Acre' }[g]}</h3>
  <div class="fil-grade">${filiais.filter(f => f.grupo === g).map(f => `<article id="${f.id}" class="fil">
    <h4>${f.cidade} <span>${f.uf}</span>${f.tipo === 'Matriz' ? '<em>Matriz</em>' : ''}</h4>
    <p>${f.end}<br>CEP ${f.cep}</p>
    <p><a href="tel:${telHref(f.fone)}">${ic('tel')} ${f.fone}</a><br><a href="${waHref(f.wa)}" target="_blank" rel="noopener">${ic('wa')} WhatsApp ${f.wa}</a><br><a href="mailto:${f.email}">${ic('mail')} ${f.email}</a></p>
    <p class="fil-pz">${f.km ? `<b>${f.km.toLocaleString('pt-BR')} km</b> de Guarulhos · ` : ''}${prazoTxt(f)}</p>
    ${f.nota ? `<p class="fil-nota">${f.nota}</p>` : ''}
  </article>`).join('')}</div>`).join('')}
</div></section>`),

  tecnologia: () => pagina('a', 'tecnologia', `Tecnologia · ${E.nome}`, 'Rastreamento 24 horas via satélite, seguro da carga pela Mapfre, comunicação constante com os motoristas e informação pela web e por EDI.', `
<section class="capa"><div class="in">${faixas()}<p class="eyebrow">Tecnologia</p><h1>Não basta entregar, é preciso entregar com qualidade e confiabilidade.</h1></div></section>
<section class="tec-a"><div class="in">
  <div class="tec-intro"><p>A Transpérola está sempre investindo em tecnologia visando garantir e aprimorar a qualidade dos seus serviços. Utilizando suporte de TI para o controle das informações, da operação e do faturamento, a empresa mantém um plano de investimentos nesta área.</p></div>
  <ol class="tec-lista">${tecnologia.map((t, i) => `<li><span class="n">0${i + 1}</span><div><h2>${t.t}</h2><p>${t.d}</p></div></li>`).join('')}</ol>
</div></section>
<section class="seguro-a"><div class="in">
  <div class="apolice"><b>R$ 1,5 mi</b><span>Apólice RCF-DC</span></div>
  <div class="apolice"><b>R$ 1,5 mi</b><span>Apólice RCTR-C</span></div>
  <p>Transporte seguro com total integridade da mercadoria, coberto pela Mapfre Seguros.</p>
</div></section>
<section class="frota-tec"><div class="in">
  <h2>Frota própria</h2>
  <div class="ft-grade">
    <div class="ft"><h3>Coleta SP · frota urbana</h3><ul>${frota.coleta.map(c => `<li><b>${String(c.n).padStart(2, '0')}</b>${c.t}<small>${c.d}</small></li>`).join('')}</ul></div>
    <div class="ft"><h3>Estrada · frota rodoviária</h3><ul>${frota.estrada.map(c => `<li><b>${c.n}</b>${c.t}<small>${c.d}</small></li>`).join('')}</ul>${img('bitrem')}</div>
    <div class="ft"><h3>Parceiros homologados</h3><ul>${frota.parceiros.map(c => `<li><b>${c.n}</b>${c.t}</li>`).join('')}</ul><p>Ampla rede de motoristas autônomos para atender picos de demanda.</p></div>
  </div>
</div></section>`),

  coleta: () => pagina('a', 'coleta', `Coleta e cotação · ${E.nome}`, 'Solicite coleta, peça cotação de frete e rastreie sua carga no portal do cliente da Transpérola.', `
<section class="capa"><div class="in">${faixas()}<p class="eyebrow">Coleta e cotação</p><h1>Preencha o formulário e receba a coleta na sua empresa.</h1></div></section>
<section class="online-a"><div class="in">${servOnline('a').map((s, i) => `
  <div class="onl" id="${['coleta', 'cotacao', 'rastreio'][i]}"><span class="onl-ic">${ic(s.ic, 'ic grande')}</span><h2>${s.t}</h2><p>${s.d}</p><a class="btn${i === 1 ? '' : ' btn-azul'}" href="${s.href}" target="_blank" rel="noopener">${s.b} ${ic('seta')}</a></div>`).join('')}
</div></section>
<section class="prazos-a"><div class="in">
  <div><p class="eyebrow">Prazos de entrega</p><h2>Quantos dias até a filial?</h2><p>Prazos em dias úteis estimados a partir da saída da carga em Guarulhos.</p></div>
  <table class="tab-prazos"><thead><tr><th>Destino</th><th>Distância</th><th>Cidade-sede</th><th>Interior</th></tr></thead><tbody>${filiais.filter(f => f.prazo).map(f => `<tr><th>${f.cidade}/${f.uf}</th><td>${f.km.toLocaleString('pt-BR')} km</td><td>${f.prazo[0]} dias</td><td>${f.prazo[1]} dias</td></tr>`).join('')}</tbody></table>
</div></section>
<section class="faixa-cta"><div class="in"><div><h2>Prefere falar com alguém?</h2><p>Coletas: <a href="mailto:coleta@transperola.com.br">coleta@transperola.com.br</a> · Orçamentos: <a href="mailto:fabiano@transperola.com.br">fabiano@transperola.com.br</a></p></div><div class="botoes"><a class="btn btn-azul" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} WhatsApp</a><a class="btn btn-branco" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>`),

  qualidade: () => pagina('a', 'qualidade', `Qualidade · ${E.nome}`, 'Por que confiar a sua carga à Transpérola: treinamento, tecnologia, baixo índice de avarias, transporte de produtos químicos e prêmios.', `
<section class="capa"><div class="in">${faixas()}<p class="eyebrow">Qualidade</p><h1>Saiba por que confiar a sua encomenda em nossas mãos.</h1></div></section>
<section class="qual-a"><div class="in">
  <div class="q-txt">${qualidade.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="q-premio">${img('premio')}<figcaption>Troféu Ouro Amanco, um dos prêmios recebidos pela Transpérola</figcaption></figure>
</div></section>
<section class="valores-a alt"><div class="in">
  <div><p class="eyebrow">O que garantimos</p><h2>Eficiência, prazo e baixo índice de avarias.</h2></div>
  <dl>${valores.map(x => `<div><dt>${ic('check')} ${x.t}</dt><dd>${x.d}</dd></div>`).join('')}</dl>
</div></section>
<section class="triptico-faixa">${fig('doca')}${fig('sider-ceu')}${fig('galpao')}</section>`),

  contato: () => pagina('a', 'contato', `Fale conosco · ${E.nome}`, `Dúvidas, críticas ou sugestões: ${E.fone}, ${E.email}. E-mails das filiais e dos departamentos da Transpérola.`, `
<section class="capa"><div class="in">${faixas()}<p class="eyebrow">Fale conosco</p><h1>Dúvidas, críticas ou sugestões, nossa equipe terá o maior prazer em atendê-lo.</h1></div></section>
<section class="contato"><div class="in">
  <div><h2>Contate-nos pelo formulário</h2>${contatoForm()}</div>
  <aside class="contato-info"><h2>Matriz · Guarulhos/SP</h2><p>${E.endereco.join('<br>')}</p><p><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><br>Fax ${E.fax}<br>${E.horario}</p>${mapaGoogle}</aside>
</div></section>
<section class="emails"><div class="in">
  <div><h2>Se preferir, use nossos e-mails</h2>${deptos()}</div>
  <div><h2>Filiais</h2><dl class="deptos">${filiais.map(f => `<div><dt>${f.cidade}/${f.uf}</dt><dd><a href="mailto:${f.email}">${f.email}</a></dd></div>`).join('')}</dl></div>
</div></section>`),
};

// ================= VERSÃO B · Rota =================
const rotaPainel = () => `<div class="rota-painel" data-rotas='${dadosRotas}'>
  <label for="destino">Destino</label>
  <select id="destino" data-destino>${filiais.filter(f => f.prazo).map(f => `<option value="${f.id}"${f.id === 'portovelho' ? ' selected' : ''}>${f.cidade}/${f.uf}</option>`).join('')}</select>
  <dl class="rota-dados">
    <div><dt>Origem</dt><dd>Guarulhos/SP</dd></div>
    <div><dt>Distância</dt><dd data-km>${F('portovelho').km.toLocaleString('pt-BR')} km</dd></div>
    <div><dt>Cidade-sede</dt><dd data-p0>${F('portovelho').prazo[0]} dias úteis</dd></div>
    <div><dt>Interior</dt><dd data-p1>${F('portovelho').prazo[1]} dias úteis</dd></div>
  </dl>
</div>`;

const B = {
  home: () => pagina('b', 'index', `${E.nome} · De Guarulhos ao Norte do Brasil`, 'Transportadora rodoviária desde 1973: matriz em Guarulhos e 10 filiais próprias em SP, PR, RO e AC. Veja a distância e o prazo até cada filial.', `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Transpérola · desde 1973</p>
    <h1>De Guarulhos ao Acre, com frota própria e prazo certo.</h1>
    <p>Transporte rodoviário de cargas fracionadas com 11 unidades próprias, rastreamento 24 horas e ${cidades.length} cidades atendidas em São Paulo, Paraná, Rondônia e Acre.</p>
    <div class="botoes"><a class="btn" href="${E.formCotacao}" target="_blank" rel="noopener">Pedir cotação ${ic('seta')}</a><a class="btn btn-claro" href="/b/coleta/">Solicitar coleta</a></div>
  </div>
  <div class="hero-mapa">${mapaSvg()}${rotaPainel()}</div>
</div></section>

<section class="numeros-b"><div class="in"><ul>${numeros.map(n => `<li><b>${n.n}</b><span>${n.t}</span></li>`).join('')}</ul></div></section>

<section class="quem-b"><div class="in">
  <figure class="qb-foto">${img('doca')}</figure>
  <div class="qb-txt">
    <p class="eyebrow">Quem somos</p>
    <h2>Frota própria e gente especializada, há mais de 50 anos.</h2>
    <p>A Transpérola conta com frota própria e pessoal especializado para atender ao cliente no transporte de cargas e encomendas. O nome vem de Birigui, "a pérola do noroeste paulista", cidade natal dos fundadores.</p>
    <a class="link" href="/b/empresa/">Nossa trajetória ${ic('seta')}</a>
  </div>
</div></section>

<section class="trajeto-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Linha do tempo</p><h2>De um Mercedes LP 321 a quatro estados.</h2></div>
  <ol class="estrada">${trajetoria.map(t => `<li><span class="ano">${t.ano}</span><h3>${t.t}</h3><p>${t.d}</p></li>`).join('')}</ol>
</div></section>

<section class="servicos-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Para o seu embarque</p><h2>Cotação, coleta e rastreio no mesmo lugar.</h2></div>
  <ol class="sb-lista">${servOnline('b').map((s, i) => `<li><span class="n">0${i + 1}</span><div><h3>${s.t}</h3><p>${s.d}</p></div><a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.b}">${ic('seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="frota-b"><div class="in">
  <div class="fb-txt"><p class="eyebrow">Capacidade operacional</p><h2>50 veículos próprios e mais de 200 parceiros.</h2>
  <div class="fb-cols">
    <div><h3>Coleta SP</h3><ul>${frota.coleta.map(c => `<li><b>${String(c.n).padStart(2, '0')}</b> ${c.t}</li>`).join('')}</ul></div>
    <div><h3>Estrada</h3><ul>${frota.estrada.map(c => `<li><b>${c.n}</b> ${c.t}</li>`).join('')}</ul></div>
    <div><h3>Parceiros</h3><ul>${frota.parceiros.map(c => `<li><b>${c.n}</b> ${c.t}</li>`).join('')}</ul></div>
  </div></div>
  <figure class="fb-foto">${img('noite-chuva')}</figure>
</div></section>

<section class="cta-b"><div class="in">
  <div><h2>Sua cidade está na rota?</h2><p>Busque entre as ${cidades.length} cidades atendidas e veja o prazo.</p></div>
  <a class="btn" href="/b/atuacao/">Buscar cidade ${ic('busca')}</a>
</div></section>`),

  empresa: () => pagina('b', 'empresa', `A empresa · ${E.nome}`, 'Mais de 50 anos de transporte rodoviário de cargas: trajetória, valores, infraestrutura própria e responsabilidade social da Transpérola.', `
<section class="capa"><div class="in"><p class="eyebrow">Institucional</p><h1>Mais de 50 anos transportando o futuro.</h1><p>Rapidez, segurança e tranquilidade são princípios que fazem da Transpérola sinônimo de transportadora.</p></div></section>
<section class="quem-b"><div class="in">
  <figure class="qb-foto">${img('galpao')}</figure>
  <div class="qb-txt">${historia.map(p => `<p>${p}</p>`).join('')}</div>
</div></section>
<section class="trajeto-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Linha do tempo</p><h2>Nossa trajetória</h2></div>
  <ol class="estrada">${trajetoria.map(t => `<li><span class="ano">${t.ano}</span><h3>${t.t}</h3><p>${t.d}</p></li>`).join('')}</ol>
  <blockquote>"Começamos com um Mercedes-Benz LP 321 em 1964. Hoje, somos sinônimo de transporte, conectando o Sudeste, o Sul e o Norte do Brasil com excelência e tradição."</blockquote>
</div></section>
<section class="valores-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Valores e princípios</p><h2>Nosso objetivo</h2><p>Há mais de 50 anos vencendo obstáculos e atingindo metas. Uma empresa de olho no futuro, atenta às exigências do mercado para priorizar sempre a total satisfação dos nossos clientes.</p></div>
  <ol>${valores.map((x, i) => `<li><span class="n">0${i + 1}</span><h3>${x.t}</h3><p>${x.d}</p></li>`).join('')}</ol>
</div></section>
<section class="infra-b"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Instalações próprias</p><h2>Nossa infraestrutura</h2></div><dl class="infra-tot"><div><dt>Terrenos</dt><dd>+50.000 m²</dd></div><div><dt>Área construída</dt><dd>+17.480 m²</dd></div></dl></div>
  <table class="tab-infra"><thead><tr><th>Unidade</th><th>Terreno</th><th>Construção</th></tr></thead><tbody>${filiais.map(f => `<tr><th>${f.cidade}/${f.uf}${f.tipo === 'Matriz' ? ' <em>Matriz</em>' : ''}</th><td>${f.terreno} m²</td><td>${f.construcao} m²</td></tr>`).join('')}</tbody></table>
</div></section>
<section class="social-b"><div class="in">
  <div><p class="eyebrow">Responsabilidade social</p><h2>Logística solidária</h2><p>${social.texto}</p><p>${social.texto2}</p><ul class="selos"><li><b>NAPRA</b>Apoio à Amazônia</li><li><b>DSF</b>Doutores Sem Fronteiras</li></ul></div>
  <figure>${img('napra')}</figure>
</div></section>`),

  atuacao: () => pagina('b', 'atuacao', `Área de atuação · ${E.nome}`, `Mapa de atuação da Transpérola: matriz em Guarulhos e filiais em Birigui, Londrina, Maringá, Rondônia e Acre. Busque entre ${cidades.length} cidades.`, `
<section class="capa"><div class="in"><p class="eyebrow">Presença nacional</p><h1>Nossas filiais e as cidades atendidas.</h1><p>Origem em Guarulhos, apoio no Sudeste e no Sul, distribuição no Norte.</p></div></section>
<section class="atuacao-b"><div class="in">
  <div class="ab-mapa">${mapaSvg()}${rotaPainel()}</div>
  <div class="ab-busca"><h2>Busque a sua cidade</h2>${buscaCidades('b')}</div>
</div></section>
<section class="filiais-b"><div class="in">
  ${estados.map(e => `<div class="estado"><h2><span>${e.uf}</span>${e.nome}<small>${e.papel}</small></h2>
  <div class="fb-lista">${filiais.filter(f => f.uf === e.uf).map(f => `<article id="${f.id}">
    <header><h3>${f.cidade}</h3>${f.tipo === 'Matriz' ? '<em>Matriz · sede própria</em>' : '<em>Sede própria</em>'}</header>
    <dl>
      <div><dt>Endereço</dt><dd>${f.end}<br>CEP ${f.cep}</dd></div>
      <div><dt>Contato</dt><dd><a href="tel:${telHref(f.fone)}">${f.fone}</a><br><a href="mailto:${f.email}">${f.email}</a></dd></div>
      <div><dt>WhatsApp</dt><dd><a href="${waHref(f.wa)}" target="_blank" rel="noopener">${f.wa}</a></dd></div>
      <div><dt>Estrutura</dt><dd>${f.terreno} m² de terreno<br>${f.construcao} m² construídos</dd></div>
    </dl>
    ${f.prazo ? `<p class="rota-linha"><span>Guarulhos</span><i></i><b>${f.km.toLocaleString('pt-BR')} km</b><i></i><span>${f.cidade}</span></p><p class="pz"><b>${f.prazo[0]}</b> dias úteis na cidade-sede · <b>${f.prazo[1]}</b> no interior</p>` : '<p class="pz">Coleta e distribuição na Grande São Paulo e saída de todas as rotas.</p>'}
    ${f.nota ? `<p class="fil-nota">${f.nota}</p>` : ''}
  </article>`).join('')}</div></div>`).join('')}
  <p class="obs">Prazos em dias úteis estimados a partir da saída da carga.</p>
</div></section>`),

  tecnologia: () => pagina('b', 'tecnologia', `Segurança e tecnologia · ${E.nome}`, 'Gerenciamento de risco da Transpérola: rastreamento via satélite Trucks Control e Opentech, seguro Mapfre e informação por web e EDI.', `
<section class="capa"><div class="in"><p class="eyebrow">Segurança e tecnologia</p><h1>Gerenciamento de risco do começo ao fim da viagem.</h1><p>Não basta entregar, é preciso entregar com qualidade e confiabilidade.</p></div></section>
<section class="tec-b"><div class="in">
  <ol>${tecnologia.map((t, i) => `<li><span class="n">0${i + 1}</span><h2>${t.t}</h2><p>${t.d}</p></li>`).join('')}</ol>
  <aside class="apolices"><p class="eyebrow">Mapfre Seguros</p><div><b>R$ 1,5 mi</b><span>Apólice RCF-DC</span></div><div><b>R$ 1,5 mi</b><span>Apólice RCTR-C</span></div></aside>
</div></section>
<section class="frota-b claro"><div class="in">
  <div class="fb-txt"><p class="eyebrow">Frota e equipamentos</p><h2>Capacidade operacional</h2>
  <div class="fb-cols">
    <div><h3>Coleta SP</h3><ul>${frota.coleta.map(c => `<li><b>${String(c.n).padStart(2, '0')}</b> ${c.t}<small>${c.d}</small></li>`).join('')}</ul></div>
    <div><h3>Estrada</h3><ul>${frota.estrada.map(c => `<li><b>${c.n}</b> ${c.t}<small>${c.d}</small></li>`).join('')}</ul></div>
    <div><h3>Parceiros</h3><ul>${frota.parceiros.map(c => `<li><b>${c.n}</b> ${c.t}<small>Frota terceirizada</small></li>`).join('')}</ul></div>
  </div></div>
  <figure class="fb-foto">${img('sider-ceu')}</figure>
</div></section>`),

  coleta: () => pagina('b', 'coleta', `Coleta e cotação · ${E.nome}`, 'Solicite coleta, peça cotação e rastreie sua carga. Prazos de entrega da Transpérola de Guarulhos a cada filial.', `
<section class="capa"><div class="in"><p class="eyebrow">Coleta, cotação e rastreio</p><h1>Do pedido de cotação à entrega no destino.</h1><p>Os formulários e o portal do cliente abrem no sistema da Transpérola.</p></div></section>
<section class="servicos-b pg"><div class="in">
  <ol class="sb-lista">${servOnline('b').map((s, i) => `<li id="${['coleta', 'cotacao', 'rastreio'][i]}"><span class="n">0${i + 1}</span><div><h3>${s.t}</h3><p>${s.d}</p></div><a class="btn" href="${s.href}" target="_blank" rel="noopener">${s.b}</a></li>`).join('')}</ol>
</div></section>
<section class="prazos-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Rota e prazos</p><h2>Quanto tempo até o destino?</h2><p>Escolha a filial de destino.</p></div>
  <div class="pb-grade">${mapaSvg({ rotulos: true })}${rotaPainel()}</div>
</div></section>
<section class="cta-b"><div class="in"><div><h2>Coletas e orçamentos</h2><p><a href="mailto:coleta@transperola.com.br">coleta@transperola.com.br</a> · <a href="mailto:fabiano@transperola.com.br">fabiano@transperola.com.br</a></p></div><a class="btn" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} WhatsApp</a></div></section>`),

  qualidade: () => pagina('b', 'qualidade', `Qualidade · ${E.nome}`, 'Treinamento, tecnologia, baixo índice de avarias, registro para produtos químicos e prêmios: a qualidade da Transpérola.', `
<section class="capa"><div class="in"><p class="eyebrow">Qualidade</p><h1>Por que confiar a sua carga à Transpérola.</h1></div></section>
<section class="qual-b"><div class="in">
  <ol>${qualidade.map((p, i) => `<li><span class="n">0${i + 1}</span><p>${p}</p></li>`).join('')}</ol>
  <figure>${img('premio')}<figcaption>Troféu Ouro Amanco</figcaption></figure>
</div></section>
<section class="valores-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Princípios</p><h2>O que cada embarque leva junto.</h2></div>
  <ol>${valores.map((x, i) => `<li><span class="n">0${i + 1}</span><h3>${x.t}</h3><p>${x.d}</p></li>`).join('')}</ol>
</div></section>`),

  contato: () => pagina('b', 'contato', `Atendimento · ${E.nome}`, `Central de atendimento da Transpérola: ${E.fone}, de segunda a sexta, das 8h às 18h. E-mails dos departamentos e das filiais.`, `
<section class="capa"><div class="in"><p class="eyebrow">Fale conosco</p><h1>Atendimento ao cliente</h1><p>Nossa equipe atende de segunda a sexta-feira, das 8h às 18h.</p></div></section>
<section class="contato"><div class="in">
  <div>${contatoForm()}</div>
  <aside class="contato-info"><div class="central"><span>Central de atendimento</span><a href="tel:${E.foneHref}">${E.fone}</a><small>${E.horario}</small></div><p><b>Matriz Guarulhos/SP</b><br>${E.endereco.join(' · ')}</p>${mapaGoogle}</aside>
</div></section>
<section class="emails"><div class="in">
  <div><h2>Departamentos</h2>${deptos()}</div>
  <div><h2>Filiais</h2><dl class="deptos">${filiais.map(f => `<div><dt>${f.cidade}/${f.uf}</dt><dd><a href="mailto:${f.email}">${f.email}</a> · <a href="tel:${telHref(f.fone)}">${f.fone}</a></dd></div>`).join('')}</dl></div>
</div></section>`),
};

export function gerarVersao(v) {
  const X = v === 'a' ? A : B;
  return Object.fromEntries(nav.map(n => [n.slug, X[n.slug === 'index' ? 'home' : n.slug]()]));
}
