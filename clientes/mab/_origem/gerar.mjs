// Metalúrgica MAB (Cachoeirinha/RS), indústria de engrenagens. Gera public/{a,b}/ e a página de escolha.
// node clientes/mab/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mab https://metalurgicamab.com.br/)
// Textos das páginas do site atual (WordPress). Logo vetorizado em 4 cores a partir do PNG de 300 px (logo-mab.svg).
// O site atual tem endereço de exemplo (Washington) no rodapé; o endereço usado aqui vem de diretório (Infobel) e precisa ser confirmado.
// A empresa não divulga WhatsApp: o formulário abre o e-mail (form data-email no site.js).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const LOGO = fs.readFileSync(path.join(aqui, 'logo-mab.svg'), 'utf8').replace('<svg ', '<svg class="logo-svg" role="img" aria-label="Metalúrgica MAB" ').replace(/ xmlns="[^"]*"/, '');
const E = {
  nome: 'Metalúrgica MAB', razao: 'Metalúrgica MAB Eireli', url: 'https://mab.overtus.com.br/', antigo: 'https://metalurgicamab.com.br/',
  fone1: '(51) 3471-4722', fone2: '(51) 3471-5776', email: 'metalurgicamab@terra.com.br',
  rua: 'Rua Caí, 305', cidade: 'Cachoeirinha - RS',
  horario: [['Segunda a quinta', '8h às 12h e 13h às 18h'], ['Sexta-feira', '8h às 12h e 13h às 17h']],
  curto: 'Engrenagens cilíndricas retas e helicoidais, cônicas, parafuso sem fim e pinhão-cremalheira sob encomenda e em série. Usinagem própria em Cachoeirinha desde 1998.',
};
const setores = ['Petrolífero', 'Siderúrgico', 'Ferroviário', 'Petroquímico', 'Metalúrgico', 'Flow management', 'Indústria em geral'];
const tipos = [
  { id: 'retas', foto: 'pinhoes', t: 'Cilíndricas retas', d: 'Dentes paralelos ao eixo de rotação. Encaixam com facilidade e são a solução mais econômica para transmitir movimento entre eixos paralelos.' },
  { id: 'helicoidais', foto: 'helicoidal', t: 'Cilíndricas helicoidais', d: 'Dentes em hélice, transversais ao eixo. Trabalham em paralelo ou em outros ângulos, normalmente 60° ou 90°, com engrenamento mais suave que as retas.' },
  { id: 'conicas', foto: 'conicas-espirais', t: 'Cônicas', d: 'Em forma de tronco de cone, transmitem movimento entre eixos concorrentes, geralmente a 90°. Exigem fabricação e montagem precisas.' },
  { id: 'sem-fim', foto: 'eixos', t: 'Parafuso sem fim', d: 'Para grandes reduções: o normal é 20:1, podendo chegar a 300:1. O parafuso gira a coroa, mas a coroa não consegue girar o parafuso.' },
  { id: 'cremalheira', foto: 'cremalheira', t: 'Pinhão-cremalheira', d: 'Transforma movimento de rotação em movimento retilíneo, e vice-versa. Muito usado em esteiras, com dentes retos ou helicoidais.' },
];
const outros = ['Pistão de cilindro de roda', 'Parafusos sangradores', 'Parafusos especiais', 'Componentes usinados em série'];
const processos = ['Tornos automáticos monofusos', 'Torno CNC', 'Retífica', 'Fresamento e geração de dentes'];
const historia = [
  'Fundada em setembro de 1998 em Cachoeirinha (RS), a Metalúrgica MAB sempre se preocupou com a qualidade dos seus produtos, buscando cada vez mais a satisfação dos clientes.',
  'Vinda do ramo da usinagem com alta capacidade de produção, é especialista em tornos automáticos monofusos, torno CNC e retífica. A experiência está comprovada na produção de engrenagens cilíndricas retas, helicoidais, cônicas, parafuso sem fim, pinhão-cremalheira, pistão de cilindro de roda, parafusos sangradores, parafusos especiais e diversos outros componentes.',
  'Com equipamentos modernos e profissionais preparados, a MAB está apta a atender as mais rigorosas exigências de normas de qualidade do mercado e tem recursos para produzir em série uma ampla variedade de peças, com bitolas e complexidades variadas.',
];
const missao = 'Ser uma empresa de referência nos mercados de sua atuação, através da qualidade dos seus produtos, serviços e relacionamento.';
const visao = 'Oferecer soluções de usinagem de engrenagens sob encomenda de maneira economicamente sustentável, com responsabilidade social e ambiental, atendendo as necessidades do mercado com soluções inovadoras.';
const valores = ['Ética nas transações', 'Responsabilidade social com colaboradores e público externo', 'Responsabilidade ambiental, com crescimento econômico ajustado à preservação do meio ambiente'];
const galeria = [['fresando-1', 'Engrenagem na geradora'], ['coroa-grande', 'Coroa de grande diâmetro'], ['conica', 'Par cônico'], ['fresando-2', 'Geração de dentes'], ['engrenagens-variadas', 'Engrenagens e coroa interna'], ['helicoidal', 'Engrenagem helicoidal'], ['fresando-3', 'Engrenagem em usinagem'], ['conjunto', 'Conjunto de engrenagens'], ['polia-dentada', 'Polia dentada com correia'], ['geradora', 'Coroa na máquina'], ['fresando-4', 'Fresamento de dentes'], ['pinhoes-2', 'Pinhões'], ['fresando-5', 'Coroa em usinagem'], ['eixos', 'Eixos e pinhões'], ['fresando-6', 'Usinagem de engrenagem'], ['conicas-espirais', 'Cônicas espirais'], ['interior', 'Fábrica da MAB'], ['oficina', 'Parque de máquinas']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Quem somos' }, { slug: 'engrenagens', nome: 'Engrenagens' }, { slug: 'galeria', nome: 'Galeria' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Engrenagem', b: 'Chão de Fábrica' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,500;0,600;0,700;1,700;1,800&family=Barlow:wght@400;500;600&family=Oxanium:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const mail = (assunto = 'Pedido de orçamento pelo site') => `mailto:${E.email}?subject=${encodeURIComponent(assunto)}`;
const cores = { a: '#ffffff', b: '#0f1530' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Indústria de engrenagens em Cachoeirinha` : `${titulo} | Metalúrgica MAB`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const horarioHtml = () => `<dl class="horario">${E.horario.map(h => `<div><dt>${h[0]}</dt><dd>${h[1]}</dd></div>`).join('')}</dl>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Pedido de orçamento pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Tipo de engrenagem<select name="tipo">${tipos.map(t => `<option>${t.t}</option>`).join('')}<option>Outra peça usinada</option></select></label></div>
  <label>Detalhes da peça<textarea name="mensagem" rows="4" placeholder="Módulo, número de dentes, material, quantidade. Se tiver desenho ou amostra, conte aqui."></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}. Prefere ligar? ${E.fone1}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fone1)}">${E.fone1}</a><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.cidade}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário de atendimento</strong>${E.horario.map(h => `<span>${h[0]}: ${h[1]}</span>`).join('')}</div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Metalúrgica MAB" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Caí, 305, Cachoeirinha RS')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Metalúrgica MAB, página inicial">${LOGO}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${LOGO}<p>Indústria de engrenagens desde 1998.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.cidade}</span></li>
      <li>${ic('relogio')}<span>Seg. a qui. 8h–18h · Sex. 8h–17h</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.razao}. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Quem somos', historia[0]) + topo(v, 'empresa') + cab('Quem somos', 'Fundada em setembro de 1998, em Cachoeirinha.', 'fachada') + `
<div class="in"><section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<p class="assina">Estamos esperando você. <b>Paulo &amp; Roberto</b></p></div><figure>${img('interior', 'Fábrica da Metalúrgica MAB')}<figcaption>Parque de máquinas da MAB em Cachoeirinha.</figcaption></figure></section>
<section class="mvv"><div class="sobe"><h2>Missão</h2><p>${missao}</p></div><div class="sobe"><h2>Visão</h2><p>${visao}</p></div><div class="sobe"><h2>Valores</h2>${lista(valores)}</div></section>
<section class="setores-sec"><h2>Segmentos atendidos</h2><ul class="setores">${setores.map(s => `<li>${s}</li>`).join('')}</ul></section></div>
` + rodape(v);
  pag.engrenagens = head(v, 'engrenagens', 'Engrenagens', 'Engrenagens cilíndricas retas, helicoidais, cônicas, parafuso sem fim e pinhão-cremalheira sob encomenda e em série em Cachoeirinha/RS.') + topo(v, 'engrenagens') + cab('Engrenagens', 'Cinco tipos de engrenagem, sob encomenda ou em série.', 'fresando-1') + `
<div class="in"><section class="tipos">${tipos.map(t => `<article class="tipo sobe" id="${t.id}"><figure>${img(t.foto, t.t)}</figure><div><h2>${t.t}</h2><p>${t.d}</p><a class="link-seta" href="${mail('Orçamento: ' + t.t)}">Pedir orçamento ${ic('seta')}</a></div></article>`).join('')}</section>
<section class="duas-col"><div><h2>Outras peças</h2>${lista(outros)}</div><div><h2>Processos</h2>${lista(processos)}</div></section>
<section class="cta-faixa"><h2>Precisa repor uma engrenagem?</h2><p>Mande o desenho ou os dados da peça: módulo, número de dentes, material e quantidade.</p><p class="bts"><a class="btn" href="${mail()}">${ic('mail')}${E.email}</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></section></div>
` + rodape(v);
  pag.galeria = head(v, 'galeria', 'Galeria', 'Fotos de engrenagens, coroas, pinhões e da fábrica da Metalúrgica MAB.') + topo(v, 'galeria') + cab('Galeria', 'Engrenagens que saíram da nossa fábrica.', 'coroa-grande') + `
<div class="in"><section class="galeria">${galeria.map(f => `<a class="sobe" href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}</a>`).join('')}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Metalúrgica MAB: ${E.rua}, ${E.cidade}. Telefones ${E.fone1} e ${E.fone2}.`) + topo(v, 'contato') + cab('Contato', 'Seu contato é muito importante.', 'fachada') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Solicite orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1><span class="faixa" aria-hidden="true"></span></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div><p class="k">Indústria de engrenagens · Cachoeirinha/RS</p><h1>Engrenagens para a indústria brasileira, desde 1998.</h1><span class="faixa" aria-hidden="true"></span><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'engrenagens')}">Tipos de engrenagem</a></p></div><div class="hero-a-fotos"><figure class="f1">${img('fresando-1', 'Engrenagem sendo gerada na máquina', ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${img('conicas-espirais', 'Par de engrenagens cônicas', ' loading="eager"')}</figure></div></div></section>
<section class="setores-a"><div class="in"><span>Atendemos os segmentos</span><ul>${setores.map(s => `<li>${s}</li>`).join('')}</ul></div></section>
<section class="in tipos-a"><header class="tit"><p class="k">O que fabricamos</p><h2>Cinco tipos de engrenagem, em série ou sob encomenda</h2></header><div class="cards">${tipos.map(t => `<a class="card sobe" href="${link(v, 'engrenagens')}#${t.id}"><figure>${img(t.foto, t.t)}</figure><h3>${t.t}</h3></a>`).join('')}</div></section>
<section class="fab-a"><div class="in fab-in"><figure>${img('interior', 'Parque de máquinas da MAB')}</figure><div><p class="k">Usinagem própria</p><h2>Tornos automáticos, CNC e retífica na mesma fábrica</h2><p>${historia[2]}</p>${lista(outros)}<a class="link-seta" href="${link(v, 'empresa')}">Quem somos ${ic('seta')}</a></div></div></section>
<section class="in galeria-a"><header class="tit"><p class="k">Galeria</p><h2>Da geradora para o seu equipamento</h2></header><div class="mosaico">${['coroa-grande', 'helicoidal', 'fresando-2', 'engrenagens-variadas', 'conjunto'].map((n, i) => { const f = galeria.find(x => x[0] === n); return `<a class="m${i + 1}" href="/assets/img/${n}.webp" data-foto data-legenda="${esc(f[1])}">${img(n, f[1])}</a>`; }).join('')}</div><a class="link-seta" href="${link(v, 'galeria')}">Ver galeria completa ${ic('seta')}</a></section>
<section class="cta-a"><div class="in"><div><h2>Estamos à disposição para encontrar a solução que você precisa.</h2><p>Ligue e seja nosso parceiro.</p></div><p class="bts"><a class="btn" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a><a class="btn btn-linha" href="${mail()}">${ic('mail')}E-mail</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('geradora', 'Coroa sendo usinada na MAB', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Desde 1998 · Cachoeirinha/RS</p><h1>Fazendo usinagem e engrenagens para a indústria brasileira.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></div></section>
<section class="faixa-b"><div class="in">${[['1998', 'fundação'], ['5', 'tipos de engrenagem'], ['Série', 'e sob encomenda'], ['7', 'segmentos atendidos']].map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in tipos-b"><header class="tit-b"><p class="k">Engrenagens</p><h2>Qual engrenagem você precisa?</h2></header><div class="lista-tipos">${tipos.map((t, i) => `<a class="sobe" href="${link(v, 'engrenagens')}#${t.id}"><span class="num">0${i + 1}</span>${img(t.foto, t.t)}<div><h3>${t.t}</h3><p>${t.d}</p></div></a>`).join('')}</div></section>
<section class="fotos-b"><div class="in"><header class="tit-b"><p class="k">Chão de fábrica</p><h2>Onde as engrenagens são feitas</h2></header><div class="tira">${['fresando-3', 'fresando-4', 'coroa-grande', 'fresando-6', 'eixos'].map(n => { const f = galeria.find(x => x[0] === n); return `<a href="/assets/img/${n}.webp" data-foto data-legenda="${esc(f[1])}">${img(n, f[1])}</a>`; }).join('')}</div><a class="link-seta" href="${link(v, 'galeria')}">Galeria ${ic('seta')}</a></div></section>
<section class="in sobre-b"><figure>${img('fachada', 'Fachada da Metalúrgica MAB')}</figure><div><p class="k">Quem somos</p><h2>Uma indústria que nasceu da usinagem</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></div></section>
<section class="in horario-b"><div><h2>Horário de atendimento</h2>${horarioHtml()}</div><div><h2>Fale com a MAB</h2><p><a href="${telHref(E.fone1)}">${E.fone1}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Metalúrgica MAB', artigo: 'da', url: E.url, lang: 'pt', cor: '#2b3a87', fundo: '#0f1530', claro: '#f3f5fa',
  fonteTitulo: "Saira,system-ui,sans-serif", fonteTexto: 'Barlow,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o azul, o amarelo e o itálico do logo: engrenagens reais na abertura, os cinco tipos em cartões e a fábrica em destaque.', pontos: ['Logo redesenhado em vetor', 'Segmentos atendidos logo abaixo da abertura', 'Galeria com 18 fotos da fábrica'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Azul-marinho escuro com amarelo, foco no chão de fábrica: coroa na máquina na abertura, tipos de engrenagem explicados e horário de atendimento.', pontos: ['"Fazendo usinagem e engrenagens para a indústria brasileira"', 'Cada tipo de engrenagem explicado', 'Fotos da geração de dentes'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
