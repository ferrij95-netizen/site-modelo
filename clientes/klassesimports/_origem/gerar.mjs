// Klasses Imports (Marechal Floriano, Caxias do Sul/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/klassesimports/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs klassesimports http://mecanicaklassesimports.com.br/)
// Textos tirados do site atual (mecanicaklassesimports.com.br). Fotos: banners e fotos da empresa do próprio site.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Klasses Imports', curto: 'Klasses Imports', url: 'https://klassesimports.overtus.com.br/', antigo: 'http://mecanicaklassesimports.com.br/',
  fone: '(54) 3027-2649', email: 'klasses.imports@hotmail.com', face: 'https://www.facebook.com/klassesimports',
  rua: 'Rua Giovanni Antônio Covolan, 240', bairro: 'Marechal Floriano', cidade: 'Caxias do Sul/RS',
};
const slogan = 'Oficina mecânica especializada em veículos nacionais e importados';
const especialidades = ['Peugeot', 'Citroën', 'Renault', 'Mercedes-Benz'];
const marcas = ['Fiat', 'BMW', 'Volkswagen', 'Volvo', 'Ford', 'Toyota', 'Hyundai', 'Mercedes-Benz', 'Audi', 'Kia', 'Honda', 'Citroën', 'Peugeot', 'Chevrolet', 'Land Rover', 'Dodge', 'Jeep', 'Renault', 'Mitsubishi', 'Suzuki'];
const empresa = 'A Klasses Imports iniciou suas atividades em 2005 no segmento de manutenção de veículos nacionais e importados. Hoje a empresa atua em sua sede própria com modernas instalações, experiência e tecnologia.';
const servicos = [
  { id: 'revisao-15', ic: 'check', t: 'Revisão de 15 itens', nota: 'Rápida e grátis', d: 'Uma revisão de 15 itens do veículo, rápida e sem custo.' },
  { id: 'box-rapido', ic: 'oleo', t: 'Box rápido', nota: 'Mobil OilExpress', d: 'Box rápido para atendermos nossos clientes com mais rapidez e eficiência.' },
  { id: 'geometria', ic: 'volante', t: 'Geometria e balanceamento', nota: 'Veículos leves', d: 'Temos também serviço de geometria e balanceamento para veículos leves.' },
  { id: 'arrefecimento', ic: 'medidor', t: 'Limpeza do sistema de arrefecimento', nota: 'Radiador e circuito de água', d: 'O sistema de arrefecimento tem como função manter o motor operando em uma faixa de temperatura ideal e constante, independentemente da exigência à qual esteja submetido. Na maioria dos veículos ele é refrigerado a água, o que garante temperatura adequada, aquecimento rápido em tempo frio e mais resistência ao superaquecimento.' },
  { id: 'ferias', ic: 'calendario', t: 'Revisão de férias', nota: 'Com hora marcada', d: 'Ligue e agende sua revisão de férias, para viajar com sua família com segurança.' },
];
const dicas = [
  { id: 'ferias', t: 'Revise seu veículo depois das férias', p: [
    'A manutenção preventiva é fundamental para que problemas com o carro não atrapalhem as férias. Mas, depois da volta para casa, uma boa revisão também evita gastos extras e dores de cabeça.',
    'Os principais itens a verificar são os freios, a parte mecânica, velas, filtros de ar, esticadores de correias e os sistemas de ignição e alimentação. Quando o carro que roda na cidade vai para uma área rural ou de maresia, o filtro de ar pode entupir e a correia dentada pode sofrer.',
    'Carros que ficam parados durante as férias também precisam de cuidado: combustível, óleo e água do radiador envelhecem. A gasolina pode entupir bicos injetores, os pneus devem ser calibrados e os dutos do ar-condicionado, limpos.'] },
  { id: 'radiador', t: 'Radiador e aditivo', p: [
    'O radiador é a peça do sistema de arrefecimento que trabalha para manter a temperatura ideal do motor. Não precisa de manutenção periódica: a substituição só é necessária em caso de vazamento.',
    'O aditivo impede o congelamento e a fervura do líquido de arrefecimento, lubrifica o eixo da bomba d\'água e previne corrosão nas partes metálicas. A válvula termostática, o termo-interruptor e o sensor de temperatura têm vida útil, por isso o sistema deve ser drenado, limpo e ter o líquido reposto.'] },
  { id: 'combustivel', t: 'Filtro de combustível', p: [
    'O filtro de combustível retém poeira, ferrugem e resíduos que danificariam os componentes da injeção eletrônica. Trocá-lo no prazo da montadora garante desempenho, conforto, menor consumo e menos emissão de poluentes.'],
    lista: ['Falha no funcionamento do motor', 'Marcha lenta irregular (oscilante)', 'Falhas de aceleração', 'Lâmpada de advertência no painel (mistura pobre)'], listaT: 'Sintomas de filtro com problema' },
  { id: 'correia', t: 'Kit correia dentada', p: [
    'A troca da correia dentada é mais barata antes de ela quebrar. Quando quebra, o motor gira mas não pega, e o estrago pode chegar ao empenamento das válvulas, à quebra de pistões ou até à destruição do cabeçote.',
    'Os materiais de hoje permitem passar dos 60 mil km sem preocupação, mas a troca periódica recomendada pelo fabricante não pode deixar de ser feita. Consulte o manual de manutenção do seu veículo.'] },
  { id: 'filtro-ar', t: 'Filtro de ar', p: [
    'O filtro de ar retém pólen, fuligem e partículas de sujeira que, com o tempo, danificariam o motor. Ele influencia diretamente o desempenho, a potência e a durabilidade.',
    'A troca costuma ser feita a cada oito a quinze mil quilômetros em uso normal, e antes disso em trilhas e lugares com muita poeira ou areia. É uma peça barata que evita danos caros.'] },
  { id: 'freios', t: 'Sistema de freios', p: [
    'O freio precisa estar sempre com a manutenção em dia: suporta o peso do veículo e os esforços de frenagem, e depende de muitos componentes.',
    'Do pedal, a força passa pelo servo freio, que ajuda o motorista, chega ao cilindro mestre, que gera pressão no fluido, e segue pelas tubulações e flexíveis até as pinças. Ali as pastilhas tocam o disco e o carro perde velocidade.'] },
];
const fotos = {
  fachada: 'A sede própria da Klasses Imports, na Rua Giovanni Antônio Covolan', totem: 'A entrada da oficina, com o totem da Klasses Imports',
  elevadores: 'Carros nos elevadores da oficina', box: 'O salão da oficina e o box rápido Mobil OilExpress', alinhamento: 'A área de geometria e balanceamento',
};
const tam = { fachada: [960, 720], totem: [960, 720], elevadores: [900, 600], box: [960, 720], alinhamento: [960, 720] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'empresa', nome: 'A empresa' }, { slug: 'dicas', nome: 'Dicas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Sede própria', b: 'Cromado' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:ital,wght@0,600;0,800;1,800&family=Fira+Sans:wght@400;500;600&family=Roboto:ital,wght@0,500;1,700;1,900&family=Noto+Sans:wght@400;500;600&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#e4e6e9', b: '#0c0c0d' };
const tel = telHref(E.fone);
const mapsQ = encodeURIComponent('Rua Giovanni Antônio Covolan, 240, Marechal Floriano, Caxias do Sul RS');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const emblema = (cls = 'emb') => `<svg class="${cls}" viewBox="0 0 200 230" aria-hidden="true">${fs.readFileSync(path.join(aqui, 'emblema.svg'), 'utf8')}</svg>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina mecânica de nacionais e importados em Caxias do Sul` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const horario = '<span>Segunda a sexta</span><span>8h às 12h e 13h30 às 18h20</span>';

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário de atendimento</strong>${horario}</div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>Bairro ${E.bairro}, ${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Klasses Imports na Rua Giovanni Antônio Covolan, 240" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const form = () => `<form class="form" id="mensagem" data-email="${E.email}" data-assunto="Contato pelo site da Klasses Imports" novalidate>
  <label>Nome<input name="nome" autocomplete="name" required></label>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Veículo<input name="veiculo" placeholder="Marca, modelo e ano"></label>
  <label>Mensagem<textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar mensagem</button>
  <p class="form-nota">O botão abre o seu programa de e-mail com a mensagem pronta. Se preferir, ligue: ${E.fone}.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Klasses Imports, página inicial"><img src="/assets/${logo}.webp" alt="Klasses Imports" width="1434" height="260"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${tel}">${ic('tel')}<span>${E.fone}</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Klasses Imports" width="1434" height="260" loading="lazy"><p>${slogan}. Desde 2005 em Caxias do Sul.</p><a class="rod-face" href="${E.face}" ${ext}>${ic('face')}facebook.com/klassesimports</a></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
      <li>${ic('relogio')}<span>Seg. a sex., 8h–12h e 13h30–18h20</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Klasses Imports. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Klasses Imports">${ic('tel')}</a>
</body>
</html>
`;
}

const listaServicos = (cls = '') => `<ol class="servs ${cls}">${servicos.map((s, i) => `<li class="serv sobe" id="${s.id}"><span class="serv-n">${String(i + 1).padStart(2, '0')}</span><div class="serv-t"><h3>${s.t}</h3><p class="nota">${s.nota}</p></div><p class="serv-d">${s.d}</p></li>`).join('')}</ol>`;
const muroMarcas = () => `<ul class="marcas">${marcas.map(m => `<li${especialidades.includes(m) ? ' class="esp"' : ''}>${m}</li>`).join('')}</ul>`;
const dicaHtml = (d, i) => `<article class="dica sobe" id="${d.id}"><span class="dica-n">${String(i + 1).padStart(2, '0')}</span><div><h2>${d.t}</h2>${d.p.map(p => `<p>${p}</p>`).join('')}${d.lista ? `<p class="dica-lt">${d.listaT}</p><ul class="lista-check">${d.lista.map(x => `<li><span>${x}</span></li>`).join('')}</ul>` : ''}</div></article>`;

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Revisão de 15 itens grátis, box rápido Mobil OilExpress, geometria e balanceamento, limpeza do sistema de arrefecimento e revisão de férias. Klasses Imports, Caxias do Sul.') + topo(v, 'servicos') + cab('Serviços', 'Manutenção de nacionais e importados, do box rápido à revisão completa', 'elevadores') + `
<div class="in">
<p class="intro">Oficina mecânica especializada em Peugeot, Citroën, Renault e Mercedes-Benz, e que atende veículos de ${marcas.length} marcas, nacionais e importados.</p>
${listaServicos('servs-pag')}
<section class="marcas-pag"><header class="tit"><p class="k">Marcas em que atuamos</p><h2>Especialistas em ${especialidades.slice(0, 3).join(', ')} e ${especialidades[3]}</h2></header>${muroMarcas()}</section>
<p class="cta-linha">${btnTel('Ligar e agendar')}<a class="btn btn-linha" href="${link(v, 'contato')}#mensagem">${ic('mail')}Enviar mensagem</a></p>
</div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A empresa', 'A Klasses Imports atua desde 2005 na manutenção de veículos nacionais e importados, em sede própria no bairro Marechal Floriano, em Caxias do Sul. Convênio com a OAB.') + topo(v, 'empresa') + cab('A empresa', 'Desde 2005 cuidando de nacionais e importados', 'fachada') + `
<div class="in">
<section class="emp-pag"><div class="emp-txt sobe"><p class="emp-ano">2005</p><p class="emp-lead">${empresa}</p></div>
<ul class="emp-fatos">
  <li class="sobe">${emblema('emb-m')}<div><h3>Sede própria</h3><p>Instalações modernas no bairro Marechal Floriano, com elevadores, área de geometria e balanceamento e box rápido.</p></div></li>
  <li class="sobe">${emblema('emb-m')}<div><h3>Nacionais e importados</h3><p>${marcas.length} marcas atendidas, com especialização em ${especialidades.join(', ').replace(/, ([^,]*)$/, ' e $1')}.</p></div></li>
  <li class="sobe">${emblema('emb-m')}<div><h3>Convênio com a OAB</h3><p>A Klasses Imports tem convênio com a Ordem dos Advogados do Brasil.</p></div></li>
</ul></section>
<section class="galeria g-emp">${['totem', 'box', 'alinhamento', 'elevadores'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
</div>
` + rodape(v);
  pag.dicas = head(v, 'dicas', 'Dicas', 'Revisão depois das férias, radiador e aditivo, filtro de combustível, correia dentada, filtro de ar e sistema de freios. Dicas da Klasses Imports.') + topo(v, 'dicas') + cab('Dicas', 'Manutenção preventiva sai mais barato', 'alinhamento') + `
<div class="in">
<p class="intro">O que observar no seu carro entre uma revisão e outra. Na dúvida, consulte o manual do veículo ou fale com a oficina.</p>
<nav class="dicas-indice" aria-label="Dicas">${dicas.map(d => `<a href="#${d.id}">${d.t}</a>`).join('')}</nav>
<section class="dicas-pag">${dicas.map(dicaHtml).join('')}</section>
<p class="cta-linha">${btnTel('Agendar uma revisão')}</p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Klasses Imports: ${E.rua}, ${E.bairro}, Caxias do Sul. Telefone ${E.fone}. Segunda a sexta, 8h às 12h e 13h30 às 18h20.`) + topo(v, 'contato') + cab('Contato', 'Agende sua revisão', 'totem') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div><div><h2 class="form-tit">Envie uma mensagem</h2>${form()}</div></section>
<section class="mapa-pag">${mapaFrame}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${emblema('emb-k')}${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina mecânica especializada em veículos nacionais e importados em Caxias do Sul, desde 2005. Especialistas em Peugeot, Citroën, Renault e Mercedes-Benz.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">${emblema('emb-k')}Caxias do Sul · desde 2005</p><h1>${slogan}</h1>
  <p>Sede própria no bairro Marechal Floriano, com elevadores, geometria e balanceamento e box rápido. Especialistas em Peugeot, Citroën, Renault e Mercedes-Benz.</p>
  <p class="bts">${btnTel()}${btnMapa()}</p></div>
  <figure class="hero-a-foto">${foto('fachada')}</figure>
</div>
<div class="faixa-a"><div class="in"><ul>
  <li>${ic('pin')}<span><b>${E.rua}</b>${E.bairro}, Caxias do Sul</span></li>
  <li>${ic('relogio')}<span><b>Segunda a sexta</b>8h–12h e 13h30–18h20</span></li>
  <li>${ic('tel')}<span><b>Telefone</b><a href="${tel}">${E.fone}</a></span></li>
</ul></div></div></section>
<section class="in esp-a"><header class="tit"><p class="k">Especialidades</p><h2>Mecânica especializada em</h2></header>
<ol class="esp-lista">${especialidades.map((e, i) => `<li class="sobe"><span>${String(i + 1).padStart(2, '0')}</span>${e}</li>`).join('')}</ol>
<p class="esp-nota">E atendemos mais ${marcas.length - especialidades.length} marcas de nacionais e importados: ${marcas.filter(m => !especialidades.includes(m)).join(', ')}.</p></section>
<section class="servs-a"><div class="in servs-a-in"><div class="servs-a-cab"><p class="k">Serviços</p><h2>Do box rápido à revisão completa</h2>${foto('box', 'servs-a-foto')}<a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></div>${listaServicos()}</div></section>
<section class="in grat-a"><div class="grat-a-num">15</div><div><p class="k">Rápida e grátis</p><h2>Revisão de 15 itens</h2><p>Antes de viajar ou depois das férias, passe na oficina e peça a revisão. Não custa nada.</p><p class="bts">${btnTel('Ligar e agendar')}</p></div></section>
<section class="emp-a"><div class="in emp-a-in">${foto('totem', 'emp-a-foto')}<div><p class="k">A empresa</p><h2>Sede própria, modernas instalações</h2><p>${empresa}</p><p class="oab">${ic('escudo')}<span>Temos convênio com a <b>OAB</b>.</span></p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></div></div></section>
<section class="in dicas-a"><header class="tit"><p class="k">Dicas</p><h2>Manutenção preventiva sai mais barato</h2></header><ul class="dicas-a-lista">${dicas.map(d => `<li><a href="${link(v, 'dicas')}#${d.id}">${d.t}${ic('seta')}</a></li>`).join('')}</ul></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Agende sua revisão</h2><p>${E.rua}, ${E.bairro}, Caxias do Sul. Segunda a sexta, das 8h às 12h e das 13h30 às 18h20.</p></div><p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'contato')}#mensagem">${ic('mail')}Enviar mensagem</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Mecânica especializada em Peugeot, Citroën, Renault e Mercedes-Benz em Caxias do Sul. Nacionais e importados de 20 marcas, desde 2005, em sede própria.') + topo(v, 'index') + `
<section class="hero-b">${img('elevadores', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">Klasses Imports · Caxias do Sul</p><h1><span class="cromo">Peugeot. Citroën. Renault. Mercedes-Benz.</span></h1><p>Mecânica especializada nessas quatro marcas e em mais ${marcas.length - especialidades.length}, nacionais e importados. Em sede própria, desde 2005.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="marcas-b"><div class="in"><p class="k">Marcas em que atuamos</p>${muroMarcas()}</div></section>
<section class="numeros-b"><div class="in"><ul>
  <li class="sobe"><b>2005</b><span>Início das atividades</span></li>
  <li class="sobe"><b>${marcas.length}</b><span>Marcas atendidas</span></li>
  <li class="sobe"><b>15</b><span>Itens na revisão grátis</span></li>
  <li class="sobe"><b>OAB</b><span>Convênio</span></li>
</ul></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>O que fazemos</h2></header>${listaServicos('servs-b-lista')}<a class="link-seta" href="${link(v, 'servicos')}">Detalhes dos serviços ${ic('seta')}</a></section>
<section class="sede-b"><div class="in sede-b-in"><div class="sede-b-txt"><p class="k">Sede própria</p><h2>Modernas instalações, experiência e tecnologia</h2><p>${empresa}</p><a class="link-seta" href="${link(v, 'empresa')}">A empresa ${ic('seta')}</a></div><div class="sede-b-fotos">${foto('fachada', 's1')}${foto('alinhamento', 's2')}${foto('box', 's3')}</div></div></section>
<section class="in dicas-b"><header class="tit"><p class="k">Dicas</p><h2>Antes que vire conserto</h2></header><div class="dicas-b-grade">${dicas.slice(0, 3).map(d => `<a class="sobe" href="${link(v, 'dicas')}#${d.id}"><h3>${d.t}</h3><p>${d.p[0]}</p><span class="link-seta">Ler ${ic('seta')}</span></a>`).join('')}</div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Ligue e agende sua revisão</h2><p>${E.rua}, ${E.bairro}. Segunda a sexta, 8h–12h e 13h30–18h20.</p></div><p class="bts">${btnTel()}${btnMapa()}</p></div></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#1a1b1d', fundo: '#0c0c0d', claro: '#e4e6e9',
  fonteTitulo: "'Fira Sans Extra Condensed',system-ui,sans-serif", fonteTexto: "'Fira Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em cinza-aço e preto, sem outra cor além das do logo. Abre com a frase do site atual e a foto da sede, e lista as quatro marcas de especialidade em letras grandes.', pontos: ['Especialidades em destaque logo no início', 'Revisão de 15 itens grátis em evidência', 'Endereço, horário e telefone sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Preta e prata, como o emblema cromado do logo. Abre na foto da oficina com as quatro marcas de especialidade em letras cromadas e mostra as 20 marcas atendidas.', pontos: ['Quatro marcas em letras cromadas', 'Números: 2005, 20 marcas, 15 itens, OAB', 'Sede própria em fotos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
