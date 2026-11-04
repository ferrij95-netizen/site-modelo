// ATM USI Metalúrgica (Cachoeirinha/RS), usinagem seriada de precisão desde 1995. Gera public/{a,b}/ e a página de escolha.
// node clientes/atmusi/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs atmusi https://www.metalurgica-atmusi.com.br/)
// Textos, fotos, lista de máquinas e de metrologia, clientes e contatos: do site atual (WordPress de 2020).
// Logo: redesenhado em vetor a partir do PNG do site (sem o selo "25 anos", que era de 2020).
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');

const E = {
  nome: 'ATM USI Metalúrgica', url: 'https://atmusi.overtus.com.br/', antigo: 'https://www.metalurgica-atmusi.com.br/',
  fone: '(51) 3470-6832', cel: '(51) 99731-5723', wa: '5551997315723',
  comercial: 'comercial@atmusi.com.br', vagas: 'vagas@atmusi.com.br',
  rua: 'Rua Heini Renner, 140', bairro: 'Vila Cachoeirinha', cidade: 'Cachoeirinha/RS', cep: '94910-045',
  face: 'https://www.facebook.com/metalurgica.atmusi/', linkedin: 'https://br.linkedin.com/company/metalurgica-atm-usi',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';
const MAPA = `https://maps.google.com/maps?q=${encodeURIComponent('Rua Heini Renner, 140, Cachoeirinha - RS, 94910-045')}&z=15&output=embed`;

// ---------- conteúdo ----------
const C = {
  intro: [
    'A Metalúrgica ATM-USI está no mercado de prestação de serviços de usinagem desde 1995, construindo uma história de sucesso no ramo de peças e produtos seriados com valor agregado.',
    'Atendemos as linhas automotiva, agrícola e peças especiais, com capacidade para peças de pequeno e médio porte.',
    'Temos um time de profissionais altamente qualificados e comprometidos, garantindo desta forma a qualidade, a pontualidade e o melhor custo-benefício para nossos clientes.',
  ],
  empresa: [
    'A Metalúrgica ATM-USI atua no mercado do Rio Grande do Sul desde 1995, prestando serviços no ramo de peças e produtos seriados com valor agregado. A maior competência da empresa está no campo de usinagem, atendendo variados segmentos industriais.',
    'A área fabril conta com equipamentos variados, de alta qualidade e tecnologia, para atender aos requisitos dos clientes. A produção é apoiada pelos processos de Qualidade, Manutenção e Ferramentaria, todos adequadamente equipados para as exigências do mercado.',
    'Além dos requisitos da ISO 9001:2015, a Metalúrgica ATM-USI está apta a atender a normas específicas, como as do ramo automotivo: PPAP, FMEA, MSA, CEP, entre outras.',
  ],
  missao: 'Atender o cliente dentro do prazo estipulado, na quantidade desejada e na qualidade exigida, buscando constantes inovações tecnológicas, para que a organização se perpetue no mercado e cumpra sua função econômica e social.',
  visao: 'Ser uma das maiores empresas da região Sul do Brasil no fornecimento de peças usinadas para as indústrias que montam conjuntos, subconjuntos e produto final.',
  valores: ['Eficiência no atendimento', 'Transparência nas relações', 'Integridade', 'Agilidade nos serviços prestados', 'Respeito', 'Honestidade'],
  linhas: [
    { t: 'Linha automotiva', d: 'Peças seriadas usinadas para quem monta conjuntos, subconjuntos e produto final, com o pessoal preparado para PPAP, FMEA, MSA e CEP.', img: 'peca-6.webp', alt: 'Garfos e eixos usinados' },
    { t: 'Linha agrícola', d: 'Suportes, carcaças e braços fundidos usinados em série para fabricantes de máquinas e implementos agrícolas.', img: 'peca-13.webp', alt: 'Suporte fundido usinado' },
    { t: 'Peças especiais', d: 'Blocos hidráulicos, flanges e componentes de pequeno e médio porte usinados conforme o desenho do cliente.', img: 'peca-12.webp', alt: 'Blocos usinados em alumínio' },
  ],
  centros: ['Romi PH 400', 'Romi D1250', 'Romi D760', 'Romi D560', 'Mazak VTC-200C', 'Okuma MX-50HB'],
  tornos: ['Romi CNC Galaxy 15', 'Romi CNC Galaxy 15M', 'Romi Galaxy 10', 'Romi Galaxy 30'],
  outros: ['Retífica externa', 'Laminadora de rosca', 'Fresadora para eixos estriados', 'Demais equipamentos convencionais'],
  apoio: [
    { t: 'Engenharia de processos', d: 'Define a sequência de operações, os dispositivos e o tempo de ciclo de cada peça antes da produção.' },
    { t: 'Ferramentaria', d: 'Prepara e mantém dispositivos e ferramentas para que o lote rode sem parada.' },
    { t: 'Usinagem seriada', d: 'Centros de usinagem e tornos CNC Romi, Mazak e Okuma produzem o lote com repetibilidade.' },
    { t: 'Controle de qualidade', d: 'Medição em tridimensional CNC, projetor de perfil e rugosímetro, com registros conforme a ISO 9001.' },
    { t: 'Manutenção', d: 'Equipe própria mantém o parque fabril em condição de cumprir prazo e quantidade.' },
  ],
  metrologia: ['Tridimensional CNC Mitutoyo Crysta Apex S 574', 'Tridimensional Mitutoyo CRT-PM7106', 'Tridimensional Mitutoyo QM-353', 'Projetor de perfil Mitutoyo PH-3500', 'Altímetro Mitutoyo 192-632-10', 'Ogiva de medição Marposs Quickread', 'Rugosímetro Mitutoyo SJ-201P', 'Paquímetros, micrômetros e relógios comparadores'],
  normas: [['PPAP', 'Aprovação de peça de produção'], ['FMEA', 'Análise de modo e efeito de falha'], ['MSA', 'Análise dos sistemas de medição'], ['CEP', 'Controle estatístico do processo']],
  pecas: [
    ['peca-12.webp', 'Peça usinada pela ATM-USI'], ['peca-13.webp', 'Peça usinada pela ATM-USI'], ['peca-10.webp', 'Peça usinada pela ATM-USI'], ['peca-11.webp', 'Peça usinada pela ATM-USI'],
    ['peca-1.webp', 'Peça usinada pela ATM-USI'], ['peca-2.webp', 'Peça usinada pela ATM-USI'], ['peca-3.webp', 'Peça usinada pela ATM-USI'], ['peca-4.webp', 'Peça usinada pela ATM-USI'],
    ['peca-5.webp', 'Peça usinada pela ATM-USI'], ['peca-6.webp', 'Peça usinada pela ATM-USI'], ['peca-7.webp', 'Peça usinada pela ATM-USI'], ['peca-8.webp', 'Peça usinada pela ATM-USI'],
  ],
  clientes: [['dana', 'Dana'], ['stara', 'Stara'], ['bucher', 'Bucher Hydraulics'], ['rexnord', 'Rexnord'], ['taurus', 'Taurus'], ['eletroforja', 'Eletroforja'], ['cbc', 'CBC']],
  fabrica: [['fabrica-alto.webp', 'Vista do parque fabril'], ['fabrica-1.webp', 'Área fabril'], ['fabrica-2.webp', 'Operador em centro de usinagem'], ['fabrica-3.webp', 'Linha de tornos CNC'], ['fabrica-4.webp', 'Comando CNC e terminal de produção'], ['syneco.webp', 'Monitoramento da produção']],
};

const NAV = [
  { slug: 'index', nome: 'Início' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'o-que-fazemos', nome: 'O que fazemos' },
  { slug: 'qualidade', nome: 'Qualidade' }, { slug: 'contato', nome: 'Contato' },
];
const desc = {
  index: 'Usinagem seriada de precisão em Cachoeirinha/RS desde 1995. Peças para as linhas automotiva, agrícola e especiais, com certificação ISO 9001.',
  'quem-somos': 'Metalúrgica ATM-USI: desde 1995 no Rio Grande do Sul, usinagem de peças e produtos seriados com valor agregado. Missão, visão e valores.',
  'o-que-fazemos': 'Usinagem seriada em centros de usinagem e tornos CNC Romi, Mazak e Okuma. Parque fabril, setores de apoio e peças produzidas.',
  qualidade: 'Certificada ISO 9001 desde 2002, com pessoal para PPAP, FMEA, MSA e CEP. Política da qualidade e equipamentos de metrologia.',
  contato: 'Fale com a ATM-USI: Rua Heini Renner, 140, Cachoeirinha/RS. (51) 3470-6832, WhatsApp (51) 99731-5723, comercial@atmusi.com.br.',
};
const titulos = { index: 'ATM USI Metalúrgica · Usinagem seriada de precisão', 'quem-somos': 'Quem somos · ATM USI', 'o-que-fazemos': 'O que fazemos · ATM USI', qualidade: 'Qualidade · ATM USI', contato: 'Contato · ATM USI' };

const logo = (branco) => `<img src="${IMG}${branco ? 'logo-branco' : 'logo'}.svg" alt="ATM USI Metalúrgica" width="210" height="70">`;
const raio = `<svg class="raio" viewBox="0 0 120 120" aria-hidden="true"><path d="M60 8l10 32 32-10-22 26 30 14-34 4 8 34-24-24-24 24 8-34-34-4 30-14L-2 30l32 10z" fill="currentColor"/></svg>`;
const fig = (src, alt, cls = '') => `<img class="${cls}" src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;

function topo(v, ativo) {
  const escuro = v === 'b';
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('pin')} ${E.rua} · ${E.cidade}</span>
    <span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a><a href="mailto:${E.comercial}">${ic('mail')} ${E.comercial}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo(escuro)}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV, ativo)}</ul></nav>
    <a class="btn topo-cta" href="${link(v, 'contato')}#orcamento">Solicitar orçamento</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<section class="parceiro"><div class="in parceiro-in">
  <div><p class="sobre">Seja nosso parceiro</p><h2>Tem um desenho para usinar em série?</h2><p>Envie o desenho e a quantidade. A equipe comercial responde com prazo e orçamento.</p></div>
  <div class="parceiro-bts"><a class="btn" href="${link(v, 'contato')}#orcamento">Fale conosco ${ic('seta')}</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Vim pelo site da ATM USI e gostaria de um orçamento.')}" target="_blank" rel="noopener">${icWa()} WhatsApp</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p>Usinagem e fabricação de peças seriadas para as linhas automotiva, agrícola e especiais. Certificada ISO 9001.</p>
    <p class="redes"><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
  <div><h3>Páginas</h3><ul>${NAV.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Contato</h3><ul class="rodape-contato">
    <li>${ic('pin')}<span>${E.rua} – ${E.bairro}<br>CEP ${E.cep} – ${E.cidade}</span></li>
    <li>${ic('tel')}<span><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel} (WhatsApp)</a></span></li>
    <li>${ic('mail')}<span>Comercial: <a href="mailto:${E.comercial}">${E.comercial}</a><br>Trabalhe conosco: <a href="mailto:${E.vagas}">${E.vagas}</a></span></li>
  </ul></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} ATM USI Metalúrgica. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
<a class="wa-flutua" href="${waHref(E.wa, 'Olá! Vim pelo site da ATM USI.')}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">${icWa()}</a>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#EB891A' : '#2a2927' }) + topo(v, slug) + corpo + rodape(v);

const cabecalhoPg = (v, sobre, titulo, texto, foto) => `<section class="pg-topo"${foto ? ` style="--foto:url(${IMG}${foto})"` : ''}><div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a> / ${esc(sobre)}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const numeros = `<ul class="numeros">
  <li><b>1995</b><span>no mercado de usinagem</span></li>
  <li><b>ISO 9001</b><span>certificada desde 2002</span></li>
  <li><b>10</b><span>centros e tornos CNC</span></li>
  <li><b>3</b><span>linhas atendidas</span></li>
</ul>`;

const processo = `<ol class="processo">${C.apoio.map((p, i) => `<li class="sobe" style="--i:${i}"><span class="proc-n">${String(i + 1).padStart(2, '0')}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>`;

const clientes = `<ul class="logos">${C.clientes.map(([f, n]) => `<li><img src="${IMG}clientes/${f}.webp" alt="${n}" loading="lazy"></li>`).join('')}</ul>`;

const galeriaPecas = (lim, fora = []) => `<div class="galeria">${C.pecas.filter(([f]) => !fora.includes(f)).slice(0, lim).map(([f, a]) => `<a href="${IMG}${f}" data-foto="${esc(a)}">${fig(f, a)}</a>`).join('')}</div>`;

const parque = `<div class="parque">
  <div><h3>Centros de usinagem</h3><ul>${C.centros.map(m => `<li><span>Centro de usinagem</span><b>${m}</b></li>`).join('')}</ul></div>
  <div><h3>Tornos CNC</h3><ul>${C.tornos.map(m => `<li><span>Torno</span><b>${m}</b></li>`).join('')}</ul>
  <h3 class="mt">Outros equipamentos</h3><ul class="lista-check">${C.outros.map(m => `<li>${m}</li>`).join('')}</ul></div>
</div>`;

const normas = `<ul class="normas">${C.normas.map(([s, d]) => `<li><b>${s}</b><span>${d}</span></li>`).join('')}</ul>`;

const formulario = `<form class="form" data-wa="Olá! Vim pelo site da ATM USI e gostaria de um orçamento." id="orcamento">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Orçamento de usinagem</option><option>Peças seriadas (lote recorrente)</option><option>Outro assunto</option></select></label><label>Quantidade estimada<input name="quantidade" placeholder="Ex.: 500 peças/mês"></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Conte qual é a peça, o material e o prazo. Se tiver desenho, envie depois pelo WhatsApp ou e-mail."></textarea></label>
  <button class="btn" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da equipe comercial, (51) 99731-5723. Prefere e-mail? <a href="mailto:${E.comercial}">${E.comercial}</a></p>
</form>`;

// ---------- versão A: "Precisão" (clara) ----------
function versaoA() {
  const v = 'a';
  const slides = [['fabrica-alto.webp', 'Parque fabril da ATM-USI em Cachoeirinha'], ['torneamento-eixo.webp', 'Torneamento de eixo em torno CNC'], ['painel-cnc.webp', 'Comando CNC com terminal de apontamento'], ['torno-peca.webp', 'Peça em usinagem']];
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Metalúrgica · Cachoeirinha/RS · desde 1995</p>
    <h1>Usinagem seriada de precisão para a indústria</h1>
    <p class="lead">Peças e produtos seriados com valor agregado para as linhas automotiva, agrícola e peças especiais. Pequeno e médio porte, dentro do prazo e na quantidade combinada.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'contato')}#orcamento">Solicitar orçamento ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'o-que-fazemos')}">Ver o parque fabril</a></div>
  </div>
  <div class="hero-foto" data-carrossel="5500">
    ${slides.map(([f, a]) => `<figure class="slide"><img src="${IMG}${f}" alt="${esc(a)}"></figure>`).join('')}
    <div class="pontos"></div>
    <span class="selo-iso">${ic('escudo')} ISO 9001:2015</span>
  </div>
</div></section>
<section class="faixa-num"><div class="in">${numeros}</div></section>

<section class="sec intro"><div class="in intro-in">
  <div class="intro-tit sobe"><p class="sobre">Quem somos</p><h2>Mais de 30 anos usinando peças em série no Rio Grande do Sul</h2></div>
  <div class="intro-txt sobe">${C.intro.map(p => `<p>${p}</p>`).join('')}<a class="link-seta" href="${link(v, 'quem-somos')}">Conheça a empresa ${ic('seta')}</a></div>
</div></section>

<section class="sec linhas"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Linhas atendidas</p><h2>Peças de pequeno e médio porte, do fundido à peça pronta</h2></div>
  <div class="linhas-grade">${C.linhas.map((l, i) => `<article class="linha sobe" style="--i:${i}"><div class="linha-foto">${fig(l.img, l.alt)}</div><h3>${l.t}</h3><p>${l.d}</p></article>`).join('')}</div>
</div></section>

<section class="sec proc-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Como a peça é feita</p><h2>Da engenharia de processos à peça medida e entregue</h2><p>A produção é apoiada pelos setores de Qualidade, Manutenção, Ferramentaria e Engenharia de Processos, todos dentro de casa.</p></div>
  ${processo}
</div></section>

<section class="sec parque-sec"><div class="in parque-in">
  <div class="parque-foto sobe">${fig('fabrica-2.webp', 'Operador em centro de usinagem CNC')}</div>
  <div class="sobe"><p class="sobre">Parque fabril</p><h2>Centros de usinagem e tornos CNC Romi, Mazak e Okuma</h2>
    <p>Máquinas convencionais e CNC, com retífica externa, laminadora de rosca e fresadora para eixos estriados.</p>
    <ul class="maq-lista">${[...C.centros.slice(0, 3), C.tornos[0]].map(m => `<li>${m}</li>`).join('')}<li class="mais">+ ${C.centros.length + C.tornos.length - 4} máquinas CNC</li></ul>
    <a class="link-seta" href="${link(v, 'o-que-fazemos')}">Ver todos os equipamentos ${ic('seta')}</a></div>
</div></section>

<section class="sec qual-sec"><div class="in qual-in">
  <div class="sobe"><p class="sobre">Qualidade</p><h2>Certificada ISO 9001 desde 2002</h2><p>Além dos requisitos da ISO 9001:2015, temos pessoal qualificado para as exigências do ramo automotivo.</p>${normas}<a class="link-seta" href="${link(v, 'qualidade')}">Política e metrologia ${ic('seta')}</a></div>
  <div class="qual-cert sobe">${fig('certificado-iso.webp', 'Certificado NBR ISO 9001 BRTÜV')}</div>
</div></section>

<section class="sec cli-sec"><div class="in">
  <div class="sec-tit centro sobe"><p class="sobre">Clientes</p><h2>Ao longo de mais de 30 anos, diversos clientes foram nossos parceiros</h2></div>
  ${clientes}
</div></section>`;

  return {
    index: pagina(v, 'index', home),
    'quem-somos': pagina(v, 'quem-somos', paginaEmpresa(v)),
    'o-que-fazemos': pagina(v, 'o-que-fazemos', paginaFazemos(v)),
    qualidade: pagina(v, 'qualidade', paginaQualidade(v)),
    contato: pagina(v, 'contato', paginaContato(v)),
  };
}

// ---------- versão B: "Chão de fábrica" (grafite e laranja) ----------
function versaoB() {
  const v = 'b';
  const slides = [['torneamento-eixo.webp', 'Torneamento de eixo em torno CNC'], ['fabrica-alto.webp', 'Parque fabril da ATM-USI'], ['usinagem-fresa.webp', 'Fresamento com refrigeração'], ['torno-interno.webp', 'Usinagem no interior do torno']];
  const home = `
<section class="hero" data-carrossel="6000">
  ${slides.map(([f, a]) => `<figure class="slide"><img src="${IMG}${f}" alt="${esc(a)}"></figure>`).join('')}
  <div class="in hero-in">
    <p class="sobre">Usinagem e fabricação de peças</p>
    <h1>Peças seriadas usinadas no prazo, na quantidade e na qualidade exigida</h1>
    <p class="lead">Desde 1995 em Cachoeirinha/RS, atendendo as linhas automotiva, agrícola e peças especiais.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'contato')}#orcamento">Solicitar orçamento ${ic('seta')}</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Vim pelo site da ATM USI.')}" target="_blank" rel="noopener">${icWa()} ${E.cel}</a></div>
    <div class="pontos"></div>
  </div>
</section>

<section class="sec intro"><div class="in intro-in">
  <div class="ano sobe"><b>1995</b><span>ano de fundação</span></div>
  <div class="intro-txt sobe"><p class="sobre">A empresa</p><h2>Usinagem é a nossa maior competência</h2>${C.intro.map(p => `<p>${p}</p>`).join('')}<a class="link-seta" href="${link(v, 'quem-somos')}">Quem somos ${ic('seta')}</a></div>
</div></section>

<section class="sec linhas"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Linhas atendidas</p><h2>Três linhas, uma mesma exigência de precisão</h2></div>
  <div class="linhas-lista">${C.linhas.map((l, i) => `<article class="linha sobe"><span class="linha-n">0${i + 1}</span><div class="linha-txt"><h3>${l.t}</h3><p>${l.d}</p></div><div class="linha-foto">${fig(l.img, l.alt)}</div></article>`).join('')}</div>
</div></section>

<section class="sec maq-sec"><div class="in maq-in">
  <div class="sobe"><p class="sobre">Parque fabril</p><h2>${C.centros.length} centros de usinagem e ${C.tornos.length} tornos CNC</h2><p>Romi, Mazak e Okuma, além de retífica externa, laminadora de rosca, fresadora para eixos estriados e equipamentos convencionais.</p><a class="btn" href="${link(v, 'o-que-fazemos')}">Ver o parque fabril ${ic('seta')}</a></div>
  <ul class="maq-tags sobe">${[...C.centros, ...C.tornos].map(m => `<li>${m}</li>`).join('')}</ul>
</div></section>

<section class="sec proc-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Setores de apoio</p><h2>Cada peça passa por cinco frentes dentro de casa</h2></div>
  ${processo}
</div></section>

<section class="sec fotos-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Peças produzidas</p><h2>Do bruto fundido à peça pronta para a montagem</h2></div>
  ${galeriaPecas(8, C.linhas.map(l => l.img))}
  <p class="centro"><a class="link-seta" href="${link(v, 'o-que-fazemos')}#pecas">Ver todas as peças ${ic('seta')}</a></p>
</div></section>

<section class="sec qual-sec"><div class="in qual-in">
  <div class="qual-cert sobe">${fig('certificado-iso.webp', 'Certificado NBR ISO 9001 BRTÜV')}</div>
  <div class="sobe"><p class="sobre">Qualidade</p><h2>ISO 9001 desde 2002, com pessoal para PPAP, FMEA, MSA e CEP</h2>${normas}</div>
</div></section>

<section class="sec cli-sec"><div class="in">
  <div class="sec-tit centro sobe"><p class="sobre">Clientes</p><h2>Empresas que confiam na ATM-USI</h2></div>
  ${clientes}
</div></section>`;
  return {
    index: pagina(v, 'index', home),
    'quem-somos': pagina(v, 'quem-somos', paginaEmpresa(v)),
    'o-que-fazemos': pagina(v, 'o-que-fazemos', paginaFazemos(v)),
    qualidade: pagina(v, 'qualidade', paginaQualidade(v)),
    contato: pagina(v, 'contato', paginaContato(v)),
  };
}

// ---------- páginas internas (mesmo conteúdo; o visual muda pelo CSS de cada versão) ----------
function paginaEmpresa(v) {
  return cabecalhoPg(v, 'Quem somos', 'Desde 1995 usinando peças seriadas com valor agregado', 'Uma metalúrgica gaúcha com competência em usinagem e foco em prazo, quantidade e qualidade.', 'fabrica-1.webp') + `
<section class="sec emp"><div class="in emp-in">
  <div class="emp-txt sobe">${C.empresa.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="emp-foto sobe">${fig('fabrica-3.webp', 'Linha de tornos CNC')}<figcaption>Área fabril em Cachoeirinha/RS</figcaption></figure>
</div></section>
<section class="sec mvv"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Direção estratégica</p><h2>A empresa é pautada por três pilares</h2></div>
  <div class="mvv-grade">
    <div class="mvv-missao sobe"><h3>Missão</h3><blockquote>“${C.missao}”</blockquote></div>
    <div class="mvv-visao sobe"><h3>Visão</h3><blockquote>“${C.visao}”</blockquote></div>
    <div class="mvv-valores sobe"><h3>Valores</h3><ul>${C.valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
  </div>
</div></section>
<section class="sec fab"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">A fábrica</p><h2>Por dentro da ATM-USI</h2></div>
  <div class="galeria galeria-fab">${C.fabrica.map(([f, a]) => `<a href="${IMG}${f}" data-foto="${esc(a)}">${fig(f, a)}<span>${esc(a)}</span></a>`).join('')}</div>
</div></section>`;
}

function paginaFazemos(v) {
  return cabecalhoPg(v, 'O que fazemos', 'Usinagem seriada', 'Soluções em usinagem de precisão para a sua empresa, com máquinas convencionais e CNC.', 'torneamento-eixo.webp') + `
<section class="sec faz"><div class="in faz-in">
  <div class="sobe"><p class="sobre">Parque fabril</p><h2>Moderno parque fabril, com setores de apoio próprios</h2><p>Possuímos um moderno parque fabril, composto por máquinas convencionais e CNC, além dos setores de apoio: Controle de Qualidade, Manutenção, Ferramentaria e Engenharia de Processos, adequados e equipados para as exigências do mercado.</p><p>Com atuação em diversos segmentos industriais, a Metalúrgica ATM-USI fornece peças usinadas de precisão para as linhas automotiva, agrícola e peças especiais.</p></div>
  <figure class="sobe">${fig('fabrica-alto.webp', 'Vista do parque fabril')}</figure>
</div></section>
<section class="sec equip"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Equipamentos</p><h2>Dentre os equipamentos do parque fabril, destacamos</h2></div>
  ${parque}
</div></section>
<section class="sec proc-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Setores de apoio</p><h2>Como uma peça passa pela fábrica</h2></div>
  ${processo}
</div></section>
<section class="sec pecas-sec" id="pecas"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Peças produzidas</p><h2>Alguns exemplos de peças usinadas</h2><p>Clique numa foto para ampliar.</p></div>
  ${galeriaPecas(12)}
</div></section>`;
}

function paginaQualidade(v) {
  return cabecalhoPg(v, 'Qualidade', 'Certificados em ISO 9001 desde 2002', 'Foco principal na satisfação plena dos nossos clientes, buscando sempre a atualização de conhecimentos e de novas tecnologias.', 'painel-cnc.webp') + `
<section class="sec qpol"><div class="in qpol-in">
  <div class="sobe"><p>Certificados em ISO 9001 desde o ano 2002, temos como foco principal a satisfação plena dos nossos clientes, buscando sempre a atualização de nossos conhecimentos e de novas tecnologias.</p><p>Além dos requisitos da ISO 9001:2015, a Metalúrgica ATM-USI tem pessoal qualificado para atender outras exigências do ramo automotivo:</p>${normas}</div>
  <aside class="politica sobe"><p class="sobre">Política da qualidade</p><blockquote>Melhorar continuamente a qualidade do nosso serviço em usinagem, buscando a satisfação dos clientes com o atendimento dos seus requisitos.</blockquote>${fig('certificado-iso.webp', 'Certificado NBR ISO 9001 BRTÜV', 'cert')}<a class="link-seta" href="mailto:${E.comercial}?subject=${encodeURIComponent('Certificado ISO 9001')}">Solicitar cópia do certificado ${ic('seta')}</a></aside>
</div></section>
<section class="sec metro"><div class="in metro-in">
  <div class="sobe"><p class="sobre">Metrologia</p><h2>Equipamentos do Controle de Qualidade</h2><p>A lista inclui, entre outros:</p>
  <ol class="metro-lista">${C.metrologia.map(m => `<li>${m}</li>`).join('')}</ol></div>
  <figure class="sobe">${fig('syneco.webp', 'Sistema de monitoramento da produção')}<figcaption>Monitoramento da produção em tempo real</figcaption></figure>
</div></section>`;
}

function paginaContato(v) {
  return cabecalhoPg(v, 'Contato', 'Fale conosco', 'Envie o desenho, o material e a quantidade. A equipe comercial responde com prazo e orçamento.', null) + `
<section class="sec cont"><div class="in cont-in">
  <div class="cont-form sobe"><h2>Solicitar orçamento</h2>${formulario}</div>
  <aside class="cont-info sobe">
    <ul>
      <li>${ic('pin')}<div><b>Endereço</b><span>${E.rua} – ${E.bairro}<br>CEP ${E.cep} – ${E.cidade}</span></div></li>
      <li>${ic('tel')}<div><b>Telefones</b><span><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a> (WhatsApp)</span></div></li>
      <li>${ic('mail')}<div><b>Comercial</b><span><a href="mailto:${E.comercial}">${E.comercial}</a></span></div></li>
      <li>${ic('usuarios')}<div><b>Trabalhe conosco</b><span>Envie seu currículo para <a href="mailto:${E.vagas}">${E.vagas}</a></span></div></li>
    </ul>
  </aside>
</div></section>
<section class="sec onde"><div class="in onde-in">
  <div class="sobe"><p class="sobre">Onde estamos</p><h2>Fácil acesso à Freeway</h2><p>Estamos em uma localização privilegiada, com fácil acesso à BR-290 (Freeway) e demais rodovias da região metropolitana de Porto Alegre. Venha nos fazer uma visita e conhecer nosso trabalho.</p><a class="link-seta" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua Heini Renner, 140, Cachoeirinha RS')}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('ext')}</a></div>
  <div class="mapa sobe"><iframe src="${MAPA}" title="Mapa: ${E.rua}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>`;
}

copiarSiteJs(pub, E.wa);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', versaoA());
escreverVersao(pub, 'b', versaoB());
await escolha(pub, {
  nome: 'ATM USI Metalúrgica', artigo: 'da', url: E.url, lang: 'pt', cor: '#EB891A', fundo: '#2a2927', claro: '#f4f3f1',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Precisão', paginas: 5, texto: 'Clara, com o laranja e o cinza do logo: fábrica na abertura, as três linhas atendidas com fotos das peças e o caminho da peça pela fábrica.', pontos: ['Mesmas 5 páginas do site atual', 'Lista de máquinas e metrologia em destaque', 'Orçamento direto pelo WhatsApp'] },
    { letra: 'b', nome: 'Chão de fábrica', paginas: 5, texto: 'Grafite com laranja, em tela cheia: usinagem em movimento na abertura, linhas numeradas, parque fabril e galeria de peças já na página inicial.', pontos: ['Fotos reais da fábrica e das peças', 'ISO 9001, PPAP, FMEA, MSA e CEP em destaque', 'Logo redesenhado em vetor'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
