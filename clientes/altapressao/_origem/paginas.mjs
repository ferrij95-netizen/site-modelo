// Monta as páginas das versões A ("Fachada": segue o site atual, azul do topo e do menu, faixas do logo, cabeçalho com horário,
// telefone e certificações) e B ("Bancada": técnica, foto da bancada de teste, curva de pressão do logo guiando as etapas).
// Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, servicos, etapas, fotos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, extra = '', w = 1024, h = 512) => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Fachada', b: 'Bancada' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Quem somos', caminho: 'empresa/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'estrutura', nome: 'Estrutura', caminho: 'estrutura/' },
  { slug: 'qualidade', nome: 'Política de qualidade', caminho: 'qualidade/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// As três linhas do logo (vermelha, azul, vermelha) com a elevação de pressão. pico = posição do pico (0 a 1).
export function onda({ w = 1440, h = 120, pico = .72, larg = 150, alt = 70, cls = 'onda', anima = false } = {}) {
  const y0 = h - 22, gap = 15;
  const linha = (dy, k) => {
    let d = '';
    for (let x = 0; x <= w; x += 8) {
      const g = Math.exp(-Math.pow((x - pico * w) / larg, 2));
      d += `${x ? 'L' : 'M'}${x},${(y0 - 2 * gap + dy - alt * g * k).toFixed(1)}`;
    }
    return d;
  };
  return `<svg class="${cls}${anima ? ' onda-anima' : ''}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
<path d="${linha(0, 1)}" stroke="#D7262B"/><path d="${linha(gap, .93)}" stroke="#1E88CF"/><path d="${linha(2 * gap, .86)}" stroke="#D7262B"/></svg>`;
}

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
<meta name="theme-color" content="${v === 'a' ? '#0093DD' : '#14212d'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('')
  + `<a class="menu-tel" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a>`;
const logo = (v, branco = false) => `<a class="marca" href="/${v}/" aria-label="${E.nome}, página inicial"><img src="/assets/logo${branco ? '-branco' : ''}.svg" alt="${E.nome}" width="150" height="66"></a>`;
const selos = `<span class="selos"><img src="/assets/img/iso9001.webp" alt="ISO 9001, Fundação Vanzolini" width="150" height="150"><img src="/assets/img/iqnet.webp" alt="IQNet Recognized Certification" width="150" height="150"></span>`;

function topoA(atual) {
  return `<div class="faixa-topo"><div class="in"><span>Seja bem-vindo!</span><span class="ft-dir">${ic('relogio')} Seg a sex 08:30 às 18:00 · Sáb 08:00 às 12:00</span></div></div>
<header class="topo"><div class="in topo-a">
${logo('a')}
<div class="topo-info">
  <div class="ti">${ic('relogio', 'ic ti-ic')}<div><b>Funcionamento</b><span>Seg a sex: 08:30 às 18:00</span><span>Sábado: 08:00 às 12:00</span></div></div>
  <div class="ti">${ic('tel', 'ic ti-ic')}<div><b>Telefone</b><a href="tel:${E.telHref}">${E.tel}</a></div></div>
  <div class="ti ti-cert"><div><b>Certificações</b>${selos}</div></div>
</div>
<button class="menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu">${ic('menu')}</button>
</div>
<nav class="nav-a" aria-label="Principal"><div class="in"><div class="menu" id="menu">${menu('a', atual)}</div></div></nav>
</header>`;
}

function topoB(atual) {
  return `<header class="topo topo-b"><div class="in">
${logo('b')}
<nav class="menu" id="menu" aria-label="Principal">${menu('b', atual)}</nav>
<a class="btn btn-tel" href="tel:${E.telHref}">${ic('tel')}<span>${E.tel}</span></a>
<button class="menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  const links = nav.map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('');
  return `<footer class="rodape">
${v === 'a' ? onda({ cls: 'onda onda-rodape', h: 90, alt: 46, pico: .82 }) : ''}
<div class="in rod-grade">
  <div class="rod-marca">${logo(v, v === 'b')}<p>${T.empresa}</p>${selos}</div>
  <div><h3>Páginas</h3><ul class="rod-links">${links}</ul></div>
  <div><h3>Contato</h3>
    <p class="rod-l">${ic('pin')}<span>${E.endereco}<br>${E.bairro}, ${E.cep}<br>${E.cidade}</span></p>
    <p class="rod-l">${ic('tel')}<a href="tel:${E.telHref}">${E.tel}</a></p>
    <p class="rod-l">${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>
  </div>
  <div><h3>Funcionamento</h3>${E.horario.map(([d, h]) => `<p class="rod-h"><span>${d}</span><b>${h}</b></p>`).join('')}</div>
</div>
<div class="in rod-base"><span>© ${new Date().getFullYear()} ${E.razao}</span><span>Uberlândia, Minas Gerais</span></div>
</footer>`;
}

function pagina(v, slug, titulo, descricao, corpo) {
  const n = nav.find(x => x.slug === slug);
  const t = slug === 'index' ? `${E.nome} | Bombas e Cilindros Hidráulicos em Uberlândia` : `${titulo} | ${E.nome}`;
  return `${head(v, n.caminho, t, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${v === 'a' ? topoA(slug) : topoB(slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;
}

// ---------- blocos comuns ----------
const formulario = v => `<form class="form" data-form>
  <div class="campo"><label for="f-nome">Nome</label><input id="f-nome" name="nome" required autocomplete="name"></div>
  <div class="campo"><label for="f-empresa">Empresa</label><input id="f-empresa" name="empresa" autocomplete="organization"></div>
  <div class="campo"><label for="f-tel">Telefone</label><input id="f-tel" name="telefone" type="tel" autocomplete="tel"></div>
  <div class="campo"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
  <div class="campo campo-l"><label for="f-tipo">Equipamento</label><select id="f-tipo" name="equipamento"><option>Cilindro hidráulico</option><option>Bomba hidráulica</option><option>Comando hidráulico</option><option>Sistema hidráulico</option><option>Outro</option></select></div>
  <div class="campo campo-l"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="mensagem" rows="4" placeholder="Conte o que aconteceu com o equipamento, a máquina e o modelo, se souber."></textarea></div>
  <button class="btn" type="submit">${ic('mail')} Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;

const mapa = `<div class="mapa"><iframe src="${E.mapa}" title="Mapa: ${E.endereco}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const cabPagina = (v, eyebrow, titulo, texto, foto) => v === 'a'
  ? `<section class="cab-a"><div class="in"><p class="trilha"><a href="/a/">Página principal</a> / ${eyebrow}</p><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div>${onda({ cls: 'onda onda-cab', h: 80, alt: 40, pico: .8 })}</section>`
  : `<section class="cab-b"><div class="cab-b-foto">${img(foto, '', ' loading="eager"')}</div><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div></section>`;

// =====================================================================
// VERSÃO A · FACHADA
// =====================================================================
function homeA() {
  return `<section class="hero-a">
  <div class="in hero-a-grade">
    <figure class="hero-a-foto">${img('fachada', 'Fachada da Alta Pressão em Uberlândia', ' loading="eager" fetchpriority="high"')}</figure>
    <div class="hero-a-txt">
      <p class="eyebrow">Seja bem-vindo · Uberlândia, MG</p>
      <h1>Bombas e cilindros hidráulicos com qualidade certificada</h1>
      <p class="lead">Manutenção e recuperação de cilindros, bombas, comandos e sistemas hidráulicos, com sistema de gestão certificado ISO 9001:2015.</p>
      <div class="acoes"><a class="btn" href="/a/contato/">Fale conosco ${ic('seta')}</a><a class="btn btn-linha" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></div>
    </div>
  </div>
  ${onda({ cls: 'onda onda-hero', h: 120, alt: 70, pico: .7, anima: true })}
</section>

<section class="sec servicos-a">
  <div class="in">
    <div class="titulo-sec"><p class="eyebrow">Serviços</p><h2>O que fazemos na oficina</h2><p>${T.servicos}</p></div>
    <ol class="lista-serv">
      ${servicos.map((s, i) => `<li><a href="/a/servicos/#${s.id}">
        <figure>${img(s.foto, s.nome)}</figure>
        <span class="ls-n">0${i + 1}</span><h3>${s.nome}</h3><p>${s.curto}</p><span class="ls-mais">Ver serviço ${ic('seta')}</span></a></li>`).join('')}
    </ol>
  </div>
</section>

<section class="faixa-iso">
  <div class="in faixa-iso-grade">
    <div class="fi-selos"><img src="/assets/img/iso9001.webp" alt="ISO 9001, Fundação Vanzolini" width="150" height="150"><img src="/assets/img/iqnet.webp" alt="IQNet" width="150" height="150"></div>
    <div><p class="eyebrow">Política de qualidade</p><h2>Certificada NBR ISO 9001:2015 pela Fundação Vanzolini / IQNet</h2><p>Escopo: “${T.escopo}” ${T.auditoria}</p><a class="btn btn-claro" href="/a/qualidade/">Conheça nossa política ${ic('seta')}</a></div>
  </div>
</section>

<section class="sec empresa-a">
  <div class="in empresa-a-grade">
    <div><p class="eyebrow">A empresa</p><h2>Melhoria contínua em cada serviço</h2><p>${T.empresa}</p><p>${T.foco}</p><a class="link-seta" href="/a/empresa/">Quem somos ${ic('seta')}</a></div>
    <div class="mosaico-a">
      ${img('galpao', 'Oficina de cilindros', '', 1024, 680)}${img('bancada-bomba', 'Bancada de teste')}${img('torno', 'Torno')}
    </div>
  </div>
</section>

<section class="cta-a">
  <div class="in cta-a-grade"><h2>Como podemos ajudá-lo(a)?</h2><div class="acoes"><a class="btn btn-claro" href="/a/contato/">Fale conosco ${ic('seta')}</a><a class="btn btn-linha-clara" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></div></div>
</section>`;
}

function empresaA() {
  return `${cabPagina('a', 'Quem somos', 'Quem somos', T.empresa)}
<section class="sec">
  <div class="in duas">
    <div><h2>Qualidade comprovada</h2><p>${T.iso}</p><p>Escopo da certificação: “${T.escopo}”</p><p>${T.auditoria}</p></div>
    <figure class="foto-moldura">${img('fachada', 'Sede da Alta Pressão em Uberlândia')}<figcaption>Sede e oficina em Uberlândia, MG</figcaption></figure>
  </div>
</section>
<section class="sec sec-azul-claro">
  <div class="in">
    <div class="titulo-sec"><p class="eyebrow">Nosso compromisso</p><h2>Servir com qualidade, no menor tempo possível</h2></div>
    <div class="pilares">
      <div><span class="pl-n">01</span><h3>Qualidade</h3><p>Matéria-prima e reparos de alta qualidade, confiabilidade e garantia.</p></div>
      <div><span class="pl-n">02</span><h3>Prazo</h3><p>Foco em devolver o equipamento no menor tempo possível.</p></div>
      <div><span class="pl-n">03</span><h3>Preço justo</h3><p>Preços compatíveis com o mercado.</p></div>
      <div><span class="pl-n">04</span><h3>Pessoas</h3><p>Comprometimento e desenvolvimento dos nossos colaboradores.</p></div>
    </div>
  </div>
</section>
<section class="sec">
  <div class="in"><div class="titulo-sec"><p class="eyebrow">Galeria</p><h2>Nossa oficina</h2></div>
  <div class="galeria-a">${fotos.slice(0, 8).map(f => `<figure>${img(f.f, f.t)}<figcaption>${f.t}</figcaption></figure>`).join('')}</div>
  <p class="centro"><a class="btn" href="/a/estrutura/">Ver toda a estrutura ${ic('seta')}</a></p></div>
</section>`;
}

function servicosA() {
  return `${cabPagina('a', 'Serviços', 'Serviços', T.servicos)}
<section class="sec">
  <div class="in">
    ${servicos.map((s, i) => `<article class="serv-a${i % 2 ? ' inv' : ''}" id="${s.id}">
      <figure>${img(s.foto, s.nome)}</figure>
      <div><span class="ls-n">0${i + 1}</span><h2>${s.nome}</h2><p>${s.curto}</p>
      <ul class="checks">${s.itens.map(x => `<li>${ic('ok')}${x}</li>`).join('')}</ul>
      <a class="link-seta" href="/a/contato/?equipamento=${encodeURIComponent(s.nome.replace(/s hidráulic.*$/, ''))}">Solicitar orçamento ${ic('seta')}</a></div>
    </article>`).join('')}
  </div>
</section>
<section class="sec etapas-a">
  <div class="in"><div class="titulo-sec"><p class="eyebrow">Como trabalhamos</p><h2>Do recebimento à entrega</h2></div>
  <ol class="setas">${etapas.map((e, i) => `<li><span class="st-n">${i + 1}</span><h3>${e.nome}</h3><p>${e.txt}</p></li>`).join('')}</ol>
  <p class="nota-foco">${T.foco}</p></div>
</section>
<section class="cta-a"><div class="in cta-a-grade"><h2>Precisa recuperar um equipamento?</h2><div class="acoes"><a class="btn btn-claro" href="/a/contato/">Fale conosco ${ic('seta')}</a></div></div></section>`;
}

function estruturaA() {
  return `${cabPagina('a', 'Estrutura', 'Nossa estrutura', 'Oficina própria em Uberlândia com usinagem, bancadas de teste e área de montagem de cilindros, bombas e comandos.')}
<section class="sec">
  <div class="in galeria-a galeria-toda">${fotos.map(f => `<figure><a href="/assets/img/${f.f}.webp" data-zoom>${img(f.f, f.t)}</a><figcaption>${f.t}</figcaption></figure>`).join('')}</div>
</section>`;
}

function qualidadeA() {
  return `${cabPagina('a', 'Política de qualidade', 'Política de qualidade', '')}
<section class="sec">
  <div class="in duas duas-centro">
    <blockquote class="politica">${T.politica}</blockquote>
    <div class="cert-box">
      <div class="fi-selos">${selos}</div>
      <h3>NBR ISO 9001:2015</h3>
      <p>Avaliada pela Fundação Vanzolini / IQNet. Escopo: “${T.escopo}”</p>
      <p>${T.auditoria}</p>
    </div>
  </div>
</section>
<section class="faixa-iso"><div class="in"><p class="eyebrow">Sobre a certificação</p><h2>Gestão da qualidade em vigor</h2><p>${T.empresa} ${T.iso}</p></div></section>`;
}

function contatoA() {
  return `${cabPagina('a', 'Contato', 'Contato', 'Dúvidas, elogios, sugestões ou orçamento: fale com a gente.')}
<section class="sec">
  <div class="in contato-grade">
    <div class="contato-dados">
      <p class="rod-l">${ic('pin')}<span><b>Endereço</b>${E.endereco}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</span></p>
      <p class="rod-l">${ic('tel')}<span><b>Telefone</b><a href="tel:${E.telHref}">${E.tel}</a></span></p>
      <p class="rod-l">${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></p>
      <p class="rod-l">${ic('relogio')}<span><b>Funcionamento</b>Seg a sex: 08:30 às 18:00<br>Sábado: 08:00 às 12:00</span></p>
    </div>
    ${formulario('a')}
  </div>
</section>
${mapa}`;
}

// =====================================================================
// VERSÃO B · BANCADA
// =====================================================================
function homeB() {
  return `<section class="hero-b">
  <div class="hero-b-foto">${img('bancada-bomba', 'Técnico da Alta Pressão testando bomba hidráulica em bancada', ' loading="eager" fetchpriority="high"')}</div>
  <div class="in hero-b-txt">
    <p class="eyebrow">Bombas e cilindros hidráulicos · Uberlândia, MG</p>
    <h1>Recuperação hidráulica testada em bancada</h1>
    <p class="lead">Manutenção e recuperação de cilindros, bombas, comandos e sistemas hidráulicos, com gestão da qualidade certificada ISO 9001:2015.</p>
    <div class="acoes"><a class="btn" href="/b/contato/">Solicitar orçamento ${ic('seta')}</a><a class="btn btn-linha-clara" href="/b/servicos/">Ver serviços</a></div>
  </div>
  ${onda({ cls: 'onda onda-hero-b', h: 140, alt: 90, pico: .78, larg: 120, anima: true })}
</section>

<section class="painel">
  <div class="in painel-grade">
    <div class="pn"><b>ISO 9001</b><span>Sistema de gestão da qualidade certificado (NBR ISO 9001:2015)</span></div>
    <div class="pn"><b>4</b><span>frentes: cilindros, bombas, comandos e sistemas hidráulicos</span></div>
    <div class="pn"><b>Bancada</b><span>teste de pressão e funcionamento antes da entrega</span></div>
    <div class="pn"><b>Seg a sáb</b><span>atendimento de segunda a sábado pela manhã</span></div>
  </div>
</section>

<section class="sec serv-b">
  <div class="in serv-b-grade">
    <div class="serv-b-cab"><p class="eyebrow">Serviços</p><h2>Quatro frentes, uma oficina</h2><p>${T.servicos}</p><a class="link-seta" href="/b/servicos/">Todos os serviços ${ic('seta')}</a></div>
    <div class="abas" data-abas>
      <div class="abas-lista" role="tablist">${servicos.map((s, i) => `<button role="tab" type="button" aria-selected="${i === 0}" aria-controls="aba-${s.id}" id="tab-${s.id}"><span>0${i + 1}</span>${s.nome}</button>`).join('')}</div>
      ${servicos.map((s, i) => `<div class="aba" role="tabpanel" id="aba-${s.id}" aria-labelledby="tab-${s.id}"${i ? ' hidden' : ''}>
        <figure>${img(s.foto, s.nome)}</figure>
        <div class="aba-txt"><p>${s.curto}</p><ul class="checks">${s.itens.map(x => `<li>${ic('ok')}${x}</li>`).join('')}</ul></div>
      </div>`).join('')}
    </div>
  </div>
</section>

${curvaEtapas('b')}

<section class="sec cert-b">
  <div class="in cert-b-grade">
    <figure>${img('galpao', 'Oficina de cilindros da Alta Pressão', '', 1024, 680)}</figure>
    <div><p class="eyebrow">Qualidade</p><h2>Processo auditado todo ano</h2><p>${T.iso}</p><p>${T.auditoria}</p>${selos}<a class="link-seta" href="/b/qualidade/">Política de qualidade ${ic('seta')}</a></div>
  </div>
</section>

<section class="faixa-fotos" aria-label="Fotos da oficina">
  <div class="trilho">${fotos.filter(f => !f.f.startsWith('tratamento') && f.f !== 'fachada').map(f => `<figure>${img(f.f, f.t, ' loading="eager"')}<figcaption>${f.t}</figcaption></figure>`).join('')}</div>
</section>

<section class="cta-b">
  <div class="in cta-b-grade"><div><h2>Como podemos ajudá-lo(a)?</h2><p>Envie os dados do equipamento ou ligue. Atendemos de segunda a sexta das 08:30 às 18:00 e sábado das 08:00 às 12:00.</p></div>
  <div class="acoes"><a class="btn" href="/b/contato/">Fale conosco ${ic('seta')}</a><a class="btn btn-linha-clara" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></div></div>
</section>`;
}

// Etapas sobre a curva de pressão do logo: a linha sobe até o teste em bancada e as etapas acendem ao rolar.
function curvaEtapas(v) {
  return `<section class="sec curva" data-etapas>
  <div class="in">
    <div class="titulo-sec"><p class="eyebrow">Como trabalhamos</p><h2>Do recebimento à entrega, em seis etapas</h2></div>
    <div class="curva-grafico">
      ${onda({ cls: 'onda onda-curva', w: 1200, h: 150, alt: 95, pico: .75, larg: 110 })}
      <ol class="curva-etapas">${etapas.map((e, i) => `<li class="ap-etapa"><span class="cv-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.nome}</h3><p>${e.txt}</p></li>`).join('')}</ol>
    </div>
  </div>
</section>`;
}

function empresaB() {
  return `${cabPagina('b', 'Quem somos', 'Alta Pressão Bombas e Cilindros Hidráulicos', T.empresa, 'oficina')}
<section class="sec">
  <div class="in empresa-b">
    <figure class="eb-foto">${img('fachada', 'Sede da Alta Pressão em Uberlândia')}<figcaption>Sede e oficina: ${E.endereco}, ${E.bairro}, ${E.cidade}</figcaption></figure>
    <div><h2>Qualidade com gestão certificada</h2><p>${T.iso}</p><p>${T.auditoria}</p></div>
  </div>
</section>
<section class="sec sec-cinza">
  <div class="in">
    <div class="titulo-sec"><p class="eyebrow">Compromisso</p><h2>O que guia o nosso serviço</h2></div>
    <dl class="valores">
      <div><dt>Qualidade e garantia</dt><dd>Matéria-prima e reparos de alta qualidade, confiabilidade e garantia.</dd></div>
      <div><dt>Menor prazo possível</dt><dd>O equipamento parado custa caro: o foco é devolver rápido e certo.</dd></div>
      <div><dt>Preço compatível</dt><dd>Preços compatíveis com o mercado.</dd></div>
      <div><dt>Equipe em desenvolvimento</dt><dd>Comprometimento e qualificação contínua dos colaboradores.</dd></div>
    </dl>
  </div>
</section>
<section class="faixa-fotos" aria-label="Fotos da oficina"><div class="trilho">${fotos.slice(0, 9).map(f => `<figure>${img(f.f, f.t, ' loading="eager"')}<figcaption>${f.t}</figcaption></figure>`).join('')}</div></section>`;
}

function servicosB() {
  return `${cabPagina('b', 'Serviços', 'Serviços', T.servicos, 'torno')}
<section class="sec">
  <div class="in serv-b-lista">
    ${servicos.map((s, i) => `<article class="sb" id="${s.id}">
      <div class="sb-cab"><span class="sb-n">0${i + 1}</span><h2>${s.nome}</h2></div>
      <figure>${img(s.foto, s.nome)}</figure>
      <div class="sb-txt"><p>${s.curto}</p><ol class="sb-itens">${s.itens.map(x => `<li>${x}</li>`).join('')}</ol>
      <a class="btn btn-sm" href="/b/contato/?equipamento=${encodeURIComponent(s.nome.replace(/s hidráulic.*$/, ''))}">Orçar ${s.nome.toLowerCase()} ${ic('seta')}</a></div>
    </article>`).join('')}
  </div>
</section>
${curvaEtapas('b')}
<section class="cta-b"><div class="in cta-b-grade"><div><h2>${T.foco.split(',')[0]}.</h2></div><div class="acoes"><a class="btn" href="/b/contato/">Solicitar orçamento ${ic('seta')}</a></div></div></section>`;
}

function estruturaB() {
  const grupos = [
    ['Usinagem', ['oficina', 'torno', 'serra', 'barras']],
    ['Montagem e teste', ['bancada-bomba', 'bancada-cilindro', 'cilindros-teste', 'galpao']],
    ['Recuperação de peças', ['tratamento-1', 'tratamento-2', 'tratamento-3', 'cilindros-recuperacao']],
  ];
  const t = Object.fromEntries(fotos.map(f => [f.f, f.t]));
  return `${cabPagina('b', 'Estrutura', 'Oficina própria em Uberlândia', 'Usinagem, bancadas de teste e montagem no mesmo lugar, para controlar cada etapa do serviço.', 'galpao')}
${grupos.map(([nome, fs], gi) => `<section class="sec estr-b${gi % 2 ? ' sec-cinza' : ''}"><div class="in">
  <div class="estr-cab"><span class="sb-n">0${gi + 1}</span><h2>${nome}</h2></div>
  <div class="estr-grade">${fs.map((f, i) => `<figure class="${i === 0 ? 'grande' : ''}"><a href="/assets/img/${f}.webp" data-zoom>${img(f, t[f])}</a><figcaption>${t[f]}</figcaption></figure>`).join('')}</div>
</div></section>`).join('')}`;
}

function qualidadeB() {
  return `${cabPagina('b', 'Política de qualidade', 'Política de qualidade', 'NBR ISO 9001:2015, avaliada pela Fundação Vanzolini / IQNet.', 'bancada-cilindro')}
<section class="sec">
  <div class="in qual-b">
    <div><p class="eyebrow">Nossa política</p><blockquote class="politica politica-b">${T.politica}</blockquote></div>
    <aside class="qual-ficha">
      ${selos}
      <dl>
        <div><dt>Norma</dt><dd>NBR ISO 9001:2015</dd></div>
        <div><dt>Certificadora</dt><dd>Fundação Vanzolini / IQNet</dd></div>
        <div><dt>Escopo</dt><dd>${T.escopo}</dd></div>
        <div><dt>Acompanhamento</dt><dd>Auditorias anuais de supervisão</dd></div>
      </dl>
    </aside>
  </div>
</section>
<section class="sec sec-cinza"><div class="in duas"><div><h2>Por que isso importa para você</h2><p>${T.iso}</p></div><div><p>${T.auditoria}</p><p>${T.foco}</p></div></div></section>`;
}

function contatoB() {
  return `${cabPagina('b', 'Contato', 'Fale com a Alta Pressão', 'Dúvidas, elogios, sugestões ou orçamento. Responderemos em breve.', 'fachada')}
<section class="sec">
  <div class="in contato-grade contato-b">
    ${formulario('b')}
    <div class="contato-dados">
      <a class="cd-tel" href="tel:${E.telHref}">${ic('tel')}<span><small>Ligue</small>${E.tel}</span></a>
      <p class="rod-l">${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></p>
      <p class="rod-l">${ic('pin')}<span><b>Endereço</b>${E.endereco}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep} · <a href="${E.mapaLink}" target="_blank" rel="noopener">Abrir no mapa</a></span></p>
      <p class="rod-l">${ic('relogio')}<span><b>Funcionamento</b>Seg a sex: 08:30 às 18:00<br>Sábado: 08:00 às 12:00</span></p>
    </div>
  </div>
</section>
${mapa}`;
}

const desc = {
  index: 'Manutenção e recuperação de cilindros, bombas, comandos e sistemas hidráulicos em Uberlândia (MG), com gestão da qualidade certificada ISO 9001:2015.',
  empresa: 'Conheça a Alta Pressão Bombas e Cilindros Hidráulicos, de Uberlândia (MG): melhoria contínua, equipe qualificada e certificação ISO 9001:2015.',
  servicos: 'Manutenção e recuperação de cilindros, bombas, comandos e sistemas hidráulicos, com teste em bancada e garantia.',
  estrutura: 'Oficina da Alta Pressão em Uberlândia: usinagem, bancadas de teste e montagem de cilindros, bombas e comandos.',
  qualidade: 'Política de qualidade da Alta Pressão e certificação NBR ISO 9001:2015 pela Fundação Vanzolini / IQNet.',
  contato: 'Telefone, e-mail, endereço e horário da Alta Pressão em Uberlândia (MG). Peça seu orçamento.',
};

export function gerarVersao(v) {
  const f = v === 'a'
    ? { index: homeA, empresa: empresaA, servicos: servicosA, estrutura: estruturaA, qualidade: qualidadeA, contato: contatoA }
    : { index: homeB, empresa: empresaB, servicos: servicosB, estrutura: estruturaB, qualidade: qualidadeB, contato: contatoB };
  return Object.fromEntries(nav.map(n => [n.slug, pagina(v, n.slug, n.nome, desc[n.slug], f[n.slug]())]));
}
