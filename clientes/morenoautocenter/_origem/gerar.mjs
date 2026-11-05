// Moreno Auto Center (Vila Letônia, São José dos Campos). Gera public/{a,b}/ e a página de escolha.
// node clientes/morenoautocenter/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs morenoautocenter http://www.morenoautocenter.com.br/)
// Textos tirados do site atual (morenoautocenter.com.br: início, Quem somos, Equipamentos, Serviços, Fale Conosco e a página de dicas).
// Fotos: as da própria oficina, publicadas no site atual (galerias), com a data impressa recortada.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Moreno Auto Center', curto: 'Moreno Auto Center', url: 'https://morenoautocenter.overtus.com.br/', antigo: 'http://www.morenoautocenter.com.br/',
  fone: '(12) 3942-6343', email: 'morenoreparacao@gmail.com',
  rua: 'Rua Dinamarca, 332', bairro: 'Vila Letônia', cidade: 'São José dos Campos/SP',
  horario: 'Segunda a sexta, das 8h às 17h45',
  face: 'https://www.facebook.com/Moreno-Auto-Center-511302115721465/',
  tour: 'https://tourmkr.com/F1QoETYKZP/35181052p&2.17h&88.05t',
};
const tel = telHref(E.fone);
const ext = 'target="_blank" rel="noopener"';
const mapsQ = encodeURIComponent('Rua Dinamarca, 332, Vila Letônia, São José dos Campos SP');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;

// "Trabalhamos com" (início) + lista da página Serviços, agrupados (os nomes dos grupos são nossos)
const grupos = [
  { id: 'diagnostico', ic: 'medidor', t: 'Diagnóstico e eletrônica', itens: ['Diagnóstico eletrônico', 'Diagnóstico computadorizado completo', 'Injeção eletrônica', 'ABS', 'Airbag', 'Troca de bateria'] },
  { id: 'freios', ic: 'disco', t: 'Freios, suspensão e direção', itens: ['Conserto de freios (especialidade da casa)', 'Suspensão e amortecedores', 'Direção e problemas de direção', 'Alinhamento', 'Pneus', 'Sistema de exaustão'] },
  { id: 'revisao', ic: 'oleo', t: 'Óleo e revisões', itens: ['Revisões programadas', 'Troca de óleo e filtros', 'Troca de óleo de câmbio automático', 'Análise de segurança completa', 'Vistoria'] },
  { id: 'ar', ic: 'floco', t: 'Ar-condicionado', itens: ['Higienização do ar-condicionado'] },
];
const trabalhamos = ['Revisões programadas', 'Diagnóstico eletrônico', 'Suspensão', 'Troca de óleo e filtros', 'Freios', 'ABS', 'Airbag', 'Injeção eletrônica', 'Higienização do ar-condicionado', 'Troca de óleo de câmbio automático'];
const quem = [
  'Em 1997 era fundada a Moreno Auto Center, com pequenas instalações, em São José dos Campos, na Rua Dinamarca, 332, na Vila Letônia, onde, com muito orgulho, segue até hoje.',
  'Uma empresa familiar que visa sempre receber bem seus clientes. Nossa equipe é formada por técnicos experientes e especializados.',
  'Nossa prestação de serviços é baseada em soluções rápidas, seguras e transparentes, priorizando sempre a necessidade do cliente.',
  'Temos planos de manutenção preventiva, sistemas automatizados e informatizados, e estamos sempre nos atualizando.',
];
const pilares = [
  { t: 'Rápido', d: 'Soluções rápidas para o carro não ficar parado mais do que o necessário.' },
  { t: 'Seguro', d: 'Técnicos experientes e especializados, sempre capacitados.' },
  { t: 'Transparente', d: 'A necessidade do cliente vem antes de tudo.' },
];
const preventiva = ['Você ganha mais tranquilidade', 'Seu carro se torna mais confiável e seguro', 'Evita as manutenções de emergência e os gastos inesperados'];
const dicas = [
  { t: 'Abasteça sempre em postos de confiança', d: 'O combustível adulterado pode prejudicar todo o veículo.' },
  { t: 'Conduza com precaução e segurança', d: 'Isso evita prejuízos a curto e longo prazo, tanto na parte do motor quanto na funilaria.' },
  { t: 'Atenção aos ruídos da suspensão', d: 'A suspensão é responsável pela estabilidade do veículo: absorve os impactos do solo através de seus componentes e ajuda no desempenho. Faça o alinhamento uma vez por mês ou logo depois de um impacto forte.' },
  { t: 'Cuide da parte elétrica', d: 'Cerca de 90% do funcionamento dos veículos modernos está ligado à parte elétrica. Fique atento às revisões preventivas e corretivas para evitar imprevistos.' },
  { t: 'Verifique o nível do óleo', d: 'Ao ligar o carro pela primeira vez no dia, confira o nível do óleo e troque sempre que atingir a quilometragem indicada. Óleo velho prejudica o funcionamento e a vida útil do motor.' },
  { t: 'Calibre os pneus', d: 'A calibragem errada pode diminuir a vida útil dos pneus em pelo menos 8.000 km, aumenta o consumo de combustível, pode superaquecer o motor e favorece o risco de acidentes.' },
  { t: 'Água e fluido do radiador', d: 'O radiador resfria o motor e faz circular o fluido de arrefecimento. Se houver vazamento, o motor superaquece e pode sofrer danos sérios.' },
];
const fotos = {
  fachada: 'A fachada da Moreno Auto Center, na Rua Dinamarca, 332',
  'fachada-q': 'A entrada da oficina, com a placa da Moreno',
  boxes: 'Os boxes de atendimento',
  elevador: 'Carro no elevador, nos boxes da oficina',
  salao: 'O salão da oficina',
  equipe: 'A equipe da Moreno em volta de um carro',
  treino: 'Técnicos da Moreno com o computador de diagnóstico',
  motor: 'Técnico trabalhando no motor',
  medicao: 'Medição no motor com equipamento eletrônico',
  scanner: 'Scanner de diagnóstico ligado ao carro',
  bicos: 'Máquina de limpeza e teste de bicos injetores',
  injetores: 'Equipamento de limpeza e teste de injetores',
  freios: 'Equipamento de sangria de freios em uso',
  dicatec: 'Esquema elétrico de injeção eletrônica consultado na tela',
  oleo: 'Carro no elevador durante a troca de óleo',
  mecanico: 'Mecânico da Moreno trabalhando no motor',
  espera: 'A sala de espera, com Wi-Fi',
};
const tam = { fachada: [1004, 565], 'fachada-q': [1004, 1004], boxes: [1280, 720], elevador: [1280, 720], salao: [1160, 1160], equipe: [1280, 719], treino: [1280, 719], motor: [1600, 800], medicao: [1600, 800], scanner: [856, 1136], bicos: [1080, 1436], injetores: [992, 1515], freios: [1600, 800], dicatec: [1480, 1100], oleo: [720, 1279], mecanico: [715, 1273], espera: [1080, 563] };
const equip = ['bicos', 'freios', 'scanner', 'injetores', 'dicatec', 'medicao'];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'equipamentos', nome: 'Equipamentos' }, { slug: 'dicas', nome: 'Dicas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Faixa laranja', b: 'Revisão em dia' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Mukta:wght@400;500;600;700&family=Days+One&family=Heebo:wght@400;500;600;700&display=swap';
const cor = { a: '#f0811f', b: '#232427' };

const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '', extra = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n, extra)}</a>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina mecânica em São José dos Campos desde 1997` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const marcaCheck = `<svg class="chk" viewBox="0 0 40 40" aria-hidden="true"><rect x="3" y="7" width="27" height="27" fill="none" stroke="#d8232a" stroke-width="3.4"/><path d="M9 20l7 8L37 4" fill="none" stroke="#f39a1d" stroke-width="5" stroke-linecap="square"/></svg>`;
const listaChk = itens => `<ul class="chk-lista">${itens.map(x => `<li>${marcaCheck}<span>${x}</span></li>`).join('')}</ul>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Moreno Auto Center, página inicial"><img src="/assets/logo.webp" alt="Moreno Auto Center" width="1148" height="300"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${tel}">${ic('tel')}<span>${E.fone}</span></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca"><span class="placa"><img src="/assets/logo.webp" alt="Moreno Auto Center" width="1148" height="300" loading="lazy"></span><p>Oficina mecânica familiar na Vila Letônia, em São José dos Campos, desde 1997.</p><a class="rod-face" href="${E.face}" ${ext}>${ic('face')}Facebook</a></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
      <li>${ic('relogio')}<span>Seg. a sex., 8h às 17h45</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Moreno Auto Center. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Moreno Auto Center">${ic('tel')}</a>
</body>
</html>
`;
}

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
</ul>`;
const form = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
  <label>Nome<input name="Nome" autocomplete="name" required></label>
  <label>Telefone<input name="Telefone" type="tel" autocomplete="tel" required></label>
  <label>Carro (modelo e ano)<input name="Carro"></label>
  <label>Mensagem<textarea name="Mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
</form>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Moreno Auto Center na Rua Dinamarca, 332" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const grupoHtml = (g, i) => `<article class="grupo sobe" id="${g.id}"><header><span class="n">${String(i + 1).padStart(2, '0')}</span>${ic(g.ic)}<h3>${g.t}</h3></header>${listaChk(g.itens)}</article>`;

function comum(v, pag, cab) {
  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'Fundada em 1997 na Rua Dinamarca, 332, Vila Letônia, a Moreno Auto Center é uma oficina familiar de São José dos Campos com técnicos experientes e especializados.') + topo(v, 'quem-somos') + cab('Quem somos', 'Desde 1997 no mesmo endereço', 'fachada-q') + `
<div class="in">
<section class="hist">
  <div class="hist-ano"><b>1997</b><span>Rua Dinamarca, 332</span></div>
  <div class="hist-txt">${quem.map(p => `<p>${p}</p>`).join('')}<p class="bts">${btnTel()}${btnMapa()}</p></div>
</section>
<section class="pilares">${pilares.map((p, i) => `<article class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${p.t}</h2><p>${p.d}</p></article>`).join('')}</section>
<section class="galeria g-quem">${['equipe', 'treino', 'mecanico', 'espera'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="tour"><div><p class="k">Visite sem sair de casa</p><h2>Tour virtual pela oficina</h2><p>Dê uma volta pelos boxes e pela recepção em 360°.</p></div><a class="btn btn-linha" href="${E.tour}" ${ext}>${ic('ext')}Abrir o tour virtual</a></section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Diagnóstico eletrônico, injeção eletrônica, ABS, airbag, freios, suspensão, direção, alinhamento, troca de óleo e filtros, óleo de câmbio automático, revisões e higienização do ar-condicionado.') + topo(v, 'servicos') + cab('Serviços', 'Do diagnóstico à revisão programada', 'elevador') + `
<div class="in">
<p class="intro">Faça manutenção preventiva periodicamente. Atendemos com diagnóstico computadorizado, técnicos especializados e equipamentos atualizados.</p>
<section class="grupos">${grupos.map(grupoHtml).join('')}</section>
<section class="faixa-info"><ul><li>${ic('check')}Aceitamos cartões de crédito e débito</li><li>${ic('check')}Sala de espera com Wi-Fi</li><li>${ic('check')}Parceria com a Bosch em diagnóstico veicular</li></ul></section>
<p class="cta-linha">${btnTel('Ligar para agendar')}<a class="btn btn-linha" href="${link(v, 'contato')}">${ic('mail')}Pedir orçamento</a></p>
</div>
` + rodape(v);
  pag.equipamentos = head(v, 'equipamentos', 'Equipamentos', 'Equipamentos de diagnóstico, limpeza e teste de bicos injetores e sangria de freios. A Moreno Auto Center procura sempre se manter atualizada.') + topo(v, 'equipamentos') + cab('Equipamentos', 'Equipamentos modernos a favor do seu carro', 'treino') + `
<div class="in">
<p class="intro">Procuramos sempre nos manter atualizados para melhor atender nossos clientes. Trabalhamos com equipamentos modernos que nos auxiliam na manutenção veicular.</p>
<section class="galeria g-equip">${equip.map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<p class="cta-linha">${btnTel('Agendar um diagnóstico')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.dicas = head(v, 'dicas', 'Dicas', 'Dicas da Moreno Auto Center: combustível de confiança, ruídos da suspensão, parte elétrica, nível do óleo, calibragem dos pneus e radiador.') + topo(v, 'dicas') + cab('Dicas', 'Pequenos cuidados que evitam grandes gastos', 'motor') + `
<div class="in">
<section class="dicas-pag"><ol class="dicas-lista">${dicas.map((d, i) => `<li class="dica sobe"><span class="n">${i + 1}</span><div><h2>${d.t}</h2><p>${d.d}</p></div></li>`).join('')}</ol>
<aside class="prev"><p class="k">Manutenção preventiva</p><h2>Por que fazer</h2>${listaChk(preventiva)}<p class="bts">${btnTel('Agendar revisão')}</p></aside></section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Moreno Auto Center: ${E.rua}, ${E.bairro}, São José dos Campos. Telefone ${E.fone}. ${E.horario}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Moreno', 'espera') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div><div class="contato-form"><h2>Mande uma mensagem</h2>${form()}</div></section>${mapaFrame}</div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(f, ' loading="eager"')}</figure></div><div class="faixa" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina mecânica familiar em São José dos Campos desde 1997: diagnóstico eletrônico, injeção, freios, suspensão, troca de óleo e revisões. Rua Dinamarca, 332, Vila Letônia.') + topo(v, 'index') + `
<section class="hero-a">
  <div class="in hero-a-in">
    <div class="hero-a-txt"><p class="k">Vila Letônia · São José dos Campos · desde 1997</p><h1>Faça manutenção preventiva periodicamente.</h1><p>Uma oficina familiar com técnicos experientes, diagnóstico computadorizado e o mesmo endereço há mais de vinte anos.</p><p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
    <figure class="hero-a-foto">${foto('fachada', '', ' loading="eager" fetchpriority="high"')}</figure>
  </div>
  <div class="faixa" aria-hidden="true"></div>
  <div class="info-a"><div class="in"><ul>
    <li>${ic('pin')}<span><b>${E.rua}</b>${E.bairro}</span></li>
    <li>${ic('relogio')}<span><b>Seg. a sex.</b>8h às 17h45</span></li>
    <li>${ic('tel')}<span><b>Telefone</b><a href="${tel}">${E.fone}</a></span></li>
  </ul></div></div>
</section>
<section class="in trab-a"><div class="trab-a-txt"><p class="k">Trabalhamos com</p><h2>O que o seu carro precisa, numa oficina só</h2>${listaChk(trabalhamos)}<a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></div><div class="trab-a-fotos">${foto('oleo', 't1')}${foto('motor', 't2')}</div></section>
<section class="quem-a"><div class="in quem-a-in"><figure>${foto('equipe')}</figure><div><p class="k">Quem somos</p><h2>Empresa familiar, técnicos especializados</h2><p>${quem[1]}</p><p>${quem[2]}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Nossa história ${ic('seta')}</a></div></div></section>
<section class="in equip-a"><header class="tit"><p class="k">Equipamentos</p><h2>Sempre nos atualizando</h2><p>Equipamentos modernos que nos auxiliam na manutenção veicular.</p></header><div class="equip-a-fotos">${['bicos', 'freios', 'scanner'].map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</div><a class="link-seta" href="${link(v, 'equipamentos')}">Ver os equipamentos ${ic('seta')}</a></section>
<section class="in prev-a"><div><p class="k">Manutenção preventiva</p><h2>Por que não esperar o carro quebrar</h2></div>${listaChk(preventiva)}</section>
<section class="espera-a"><div class="in espera-a-in"><div><h2>Sala de espera com Wi-Fi</h2><p>Aceitamos cartões de crédito e débito.</p><p class="bts">${btnTel()}${btnMapa()}</p></div>${foto('espera')}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Diagnóstico computadorizado, freios, suspensão, injeção eletrônica, troca de óleo e revisões programadas em São José dos Campos. Moreno Auto Center, desde 1997.') + topo(v, 'index') + `
<section class="hero-b">${img('boxes', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">Moreno Auto Center · São José dos Campos</p><h1>Revisão em dia, carro sem surpresa.</h1><p>Diagnóstico computadorizado, freios, suspensão e injeção eletrônica numa oficina familiar da Vila Letônia.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="num-b"><div class="in"><ul>
  <li><b>1997</b><span>ano de fundação</span></li>
  <li><b>332</b><span>Rua Dinamarca, o mesmo endereço desde o início</span></li>
  <li><b>8h–17h45</b><span>de segunda a sexta</span></li>
</ul></div></section>
<section class="in chk-b"><header class="tit"><p class="k">Checklist da oficina</p><h2>O que fazemos</h2></header><div class="grupos">${grupos.map(grupoHtml).join('')}</div></section>
<section class="equip-b"><div class="in equip-b-in"><div class="equip-b-txt"><p class="k">Equipamentos</p><h2>Diagnóstico antes de trocar peça</h2><p>Procuramos sempre nos manter atualizados. Trabalhamos com equipamentos modernos que nos auxiliam na manutenção veicular.</p><a class="link-seta" href="${link(v, 'equipamentos')}">Ver os equipamentos ${ic('seta')}</a></div><div class="equip-b-fotos">${foto('scanner', 'e1')}${foto('injetores', 'e2')}${foto('medicao', 'e3')}</div></div></section>
<section class="in quem-b"><div><p class="k">Desde 1997</p><h2>Uma empresa familiar que recebe bem</h2><p>${quem[0]}</p><p>${quem[2]}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Quem somos ${ic('seta')}</a></div>${foto('fachada-q', 'quem-b-foto')}</section>
<section class="dica-b"><div class="in dica-b-in"><p class="k">Dica da Moreno</p><blockquote>${dicas[2].d}</blockquote><a class="link-seta" href="${link(v, 'dicas')}">Mais dicas ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Agende sua revisão</h2><p>${E.rua}, ${E.bairro}. ${E.horario}. Sala de espera com Wi-Fi e cartões de crédito e débito.</p></div><p class="bts">${btnTel()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#f0811f', fundo: '#232427', claro: '#f4f4f2',
  fonteTitulo: "'Oswald',Impact,sans-serif", fonteTexto: "'Mukta',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com a faixa laranja sobre o grafite das paredes da própria oficina. Abre com a frase do site atual, "Faça manutenção preventiva periodicamente", ao lado da fachada.', pontos: ['A lista "Trabalhamos com" com o check do logo', 'Equipe, equipamentos e sala de espera com fotos reais', 'Telefone, endereço e horário sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Grafite e laranja, com títulos largos como as letras do logo. Abre nos boxes da oficina e mostra os serviços como um checklist de revisão.', pontos: ['"Revisão em dia, carro sem surpresa."', 'Desde 1997 no mesmo endereço, em números', 'Equipamentos de diagnóstico em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
