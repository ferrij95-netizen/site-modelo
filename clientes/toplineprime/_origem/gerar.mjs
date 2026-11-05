// Top Line Prime (Brasília/DF): imobiliária com serviço de hotel. Gera public/{a,b}/ e a página de escolha.
// node clientes/toplineprime/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs toplineprime https://toplineprime.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 das páginas /empreendimento/ do site atual (wp-json lista 25; 23 entraram: a loja da
// CLS 103 aparece duas vezes e a kitnet 211 do Portal Master tem dois anúncios com as mesmas fotos; ficou um de cada). O site só mostra um resumo cortado de cada descrição: o texto aqui é esse resumo, sem as caixas altas.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Top Line Prime', url: 'https://toplineprime.overtus.com.br/', antigo: 'https://toplineprime.com.br/',
  wa: '556193041031', // número de todos os botões de WhatsApp do site atual (locação)
  fone1: '(61) 3328-5252', fone2: '(61) 3328-5151', foneLoc: '(61) 99304-1031', foneVen: '(61) 99304-1015',
  emVen: 'comercial.vendas@toplineprime.com.br', emAlu: 'comercial.aluguel@toplineprime.com.br', emRes: 'reservas@toplineprime.com.br', emSel: 'selecao@toplineprime.com.br',
  end: 'SHN Quadra 2, Bloco H, Ed. Metropolitan Flat, térreo', bairro: 'Asa Norte, Brasília - DF',
  insta: 'https://www.instagram.com/topline.prime/', face: 'https://www.facebook.com/toplineempreendimentos', yt: 'https://www.youtube.com/channel/UC4ab234MLL--hlATG0hUR4w',
  slogan: 'Especializada em administrar imóveis com rígidos padrões de qualidade em atendimento.',
  amigo: 'Na Top Line cada cliente é um amigo. Por isso, cuidamos especialmente de cada um.',
  curto: 'Imobiliária e hotelaria em Brasília: flats, studios e apartamentos mobiliados com serviço de hotel, salas, lojas e casas para alugar e comprar no Distrito Federal.',
};
const historia = [
  'O Grupo Top Line sempre priorizou as pessoas: para que elas tenham uma experiência completa em viver bem, seja locatário ou locador.',
  'Mas a nossa história começa antes de nos especializarmos no ramo imobiliário. O ano é 1966 e o local, uma fábrica de colchão: a Atlas Colchões. A preocupação sempre foi oferecer um produto de qualidade superior, mesmo que isso significasse vender menos.',
  'A empresa expandiu para o ramo imobiliário, sempre mantendo o mesmo interesse: trabalhar com excelência. Hoje, o Grupo Top Line é um misto de imobiliária e hotelaria especializado em administrar imóveis seguindo rígidos padrões internacionais de qualidade e atendimento em regiões nobres do Distrito Federal.',
  'Dispondo de uma equipe multidisciplinar, propomos as melhores soluções para facilitar a vida do cliente, sempre trabalhando com seriedade, competência e equipamentos de primeira linha.',
];
const procura = [
  'Os imóveis do Grupo Top Line são avaliados por consultores capacitados e dedicados para oferecer um empreendimento que se adeque exatamente ao que você procura.',
  'Aqui, você encontra flats, estúdios, lojas, casas, salas comerciais, apartamentos (mobiliados e sem mobília), galpões e garagens disponíveis no Distrito Federal.',
  'Os imóveis administrados pelo Grupo Top Line possuem todos os serviços para que você tenha conforto, segurança e comodidade, com dois diferenciais fundamentais: o preço e a qualidade dos serviços prestados.',
];
const servicosIntro = 'O cliente Top Line é fiel, porque sempre é bem atendido. Nunca fica sem resposta para sua solicitação. Todos os funcionários da empresa passam por um treinamento qualificado e estão sempre pesquisando e procurando conhecer as preferências e demandas do mercado. Os serviços variam de acordo com o empreendimento.';
const visita = 'É a única administradora, no mercado imobiliário brasiliense, que acompanha a visita do cliente ao imóvel pretendido. O potencial morador está sempre acompanhado de um consultor. Se o cliente necessitar de um meio de locomoção para conhecer determinado imóvel, a empresa disponibiliza um motorista ou um consultor para melhor atendê-lo.';
const servicos = [
  ['estrela', 'Limpeza e arrumação', 'Praticidade e bem-estar com serviços de limpeza e arrumação.'],
  ['chave', 'Serviços de manutenção', 'Comodidade com pequenos reparos nas instalações.'],
  ['casa', 'Enxoval de cama e banho', 'Sono gostoso e banho relaxante com lençóis e toalhas macios e perfumados.'],
  ['calendario', 'Pagamento de contas', 'Compromissos financeiros sempre em dia sem o incômodo de ir a bancos.'],
  ['engrenagem', 'Reformas e melhorias', 'Imóveis sempre novos e atuais com um processo constante de vistorias e realização de obras.'],
  ['painel', 'Ao investidor', 'Consultoria jurídica, reformas financiadas, decoração dos imóveis e muito mais.'],
];
const modalidades = [['casa', 'Venda'], ['calendario', 'Temporada'], ['chave', 'Locação'], ['relogio', 'Diária'], ['carro', 'Translado']];
const depoimentos = [
  ['Para mim é um prazer falar sobre a Top Line. Há mais de 10 anos tenho relações profissionais com a empresa, nunca tive nada a lamentar, pelo contrário: tenho recebido atenção especial da Direção e toda sua equipe com eficiência e dedicação. Agradeço pelo excelente serviço prestado ao longo dos anos.', 'Derblay Galvão'],
  ['A Top Line realiza um trabalho que me proporciona confiança, tranquilidade e resultados positivos na medida em que sua atuação e interesse é como se estivesse tratando de objetos de sua propriedade. Parabenizo e agradeço pelo zelo e comprometimento com que a Empresa atua.', 'Maria Necy de Andrade Oliveira'],
  ['Se você está procurando uma imobiliária em Brasília, a Top Line tem um serviço de qualidade, bom custo e atendimento de respeito.', 'Thiago Augusto Hernandes Rocha'],
  ['Os serviços da Top Line são da melhor qualidade, desde o atendimento até a organização, limpeza e conservação do apartamento. São dignos de todos os elogios.', 'Ministro Pedro Paulo Teixeira Manus'],
  ['Com a Top Line não existe preocupação para quem mora em outra cidade e tem imóvel em Brasília. Por 12 anos cuidaram de tudo, até da venda.', 'Silvia Maria Agostinho'],
  ['O que sempre me impressionou na Top Line nesses mais de 10 anos com eles é o compromisso com o cliente acima de tudo. Venderam a minha cobertura e com esse recurso comprei com eles três imóveis pequenos, muito bem localizados, que estão sendo reformados para serem alugados. Com isso, minha receita vai quase que triplicar.', 'José de Campos Nascentes Junior'],
];

// ---------- imóveis ----------
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => ({ ...x, slug: `imovel/${x.id}`, area: (x.area || '').replace(/,00$/, '') }));
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const bairros = [...new Set(imoveis.map(i => i.bairro))];
const porId = id => imoveis.find(i => i.id === id);

const nav = [{ slug: 'alugar', nome: 'Alugar' }, { slug: 'comprar', nome: 'Comprar' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'empresa', nome: 'A Top Line' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Recepção', b: 'Lago Sul' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Poiret+One&family=Montserrat:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500&family=Figtree:wght@400;500;600&display=swap',
};
const cores = { a: '#f6f3ec', b: '#141414' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Top Line Prime | Imobiliária com serviço de hotel em Brasília' : `${titulo} | Top Line Prime`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const logo = { a: ['logo.webp', 'logo-claro.webp'], b: ['logo-claro.webp', 'logo-claro.webp'] };
const marca = (v, tag = 'a', claro = false) => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Top Line Prime, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro.webp' : logo[v][0]}" width="750" height="222" alt="Top Line Imobiliária Prime"></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.suites && quando(i.suites, 'suíte', 'suítes'), i.vagas && quando(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá! Gostaria de saber mais sobre o imóvel "${i.titulo}" (${i.bairro}) que vi no site da Top Line Prime.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const redes = `<a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${telHref(E.fone1)}">${ic('tel')}<span>${E.fone1}</span></a>
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
    <div class="rod-marca">${marca(v, 'div', true)}<p>Imobiliária e hotelaria: administração, locação, temporada e venda de imóveis em regiões nobres do Distrito Federal.</p><p class="rod-redes">${redes}</p></div>
    <div><h3>Visite-nos</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li></ul></div>
    <div><h3>Ligue</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone1)}">${E.fone1}</a></li><li>${ic('tel')}<a href="${telHref(E.fone2)}">${E.fone2}</a></li><li>${ic('tel')}<span><a href="${telHref(E.foneLoc)}">${E.foneLoc}</a> locação</span></li><li>${ic('tel')}<span><a href="${telHref(E.foneVen)}">${E.foneVen}</a> vendas</span></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'alugar')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'comprar')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'servicos')}">Serviços ao morador</a></li><li><a href="${link(v, 'contato')}#trabalhe">Trabalhe conosco</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Top Line Prime. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

// cartão de imóvel e filtro por tipo (CSS :has, sem JS)
const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${i.bairro}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos e flats'], ['comerciais', 'Salas, lojas e galpão'], ['casas', 'Casas']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  ${grupos.length > 2 ? `<fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>` : ''}
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const titulo = `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}`;
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Vagas', i.vagas]].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.titulo} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  return head(v, i.slug, i.titulo, `${titulo}: ${i.end}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, i.neg === 'aluguel' ? 'alugar' : 'comprar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'aluguel' ? 'alugar' : 'comprar')}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${titulo}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${esc(i.end)}, ${i.bairro}${i.bairro === 'Valparaíso de Goiás' ? ' - GO' : ' - DF'}</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre o imóvel</h2><p>${esc(i.texto)}</p>
      ${i.itens.length ? `<ul class="lista-check amen">${i.itens.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
      <p class="visita-nota">${ic('usuarios')}<span><b>Visita assistida.</b> Um consultor da Top Line acompanha você na visita e, se precisar, a empresa disponibiliza um motorista.</span></p>
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${i.cond ? `<dl><div><dt>Condomínio</dt><dd>${i.cond}</dd></div></dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(i.neg === 'aluguel' ? E.foneLoc : E.foneVen)}">${ic('tel')}${i.neg === 'aluguel' ? E.foneLoc : E.foneVen}</a>
      <p class="pb-nota">Valores informados pela Top Line; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Top Line Prime.') => `<form class="form" data-wa="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero alugar um imóvel</option><option>Quero comprar um imóvel</option><option>Temporada ou diária</option><option>Quero que a Top Line administre meu imóvel</option><option>Translado</option><option>Outro assunto</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa: Top Line Prime, Ed. Metropolitan Flat" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Top Line Administração e Assessoria de Imóveis, SHN Quadra 2 Bloco H, Brasília')}&z=16&output=embed"></iframe>`;
const contatoLista = `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Visite-nos</strong>${E.end}<br>${E.bairro}</div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fone1)}">${E.fone1}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('tel')}<div><strong>Locação</strong><a href="${telHref(E.foneLoc)}">${E.foneLoc}</a> · <a href="mailto:${E.emAlu}">${E.emAlu}</a></div></li>
  <li>${ic('tel')}<div><strong>Vendas</strong><a href="${telHref(E.foneVen)}">${E.foneVen}</a> · <a href="mailto:${E.emVen}">${E.emVen}</a></div></li>
  <li>${ic('calendario')}<div><strong>Reservas</strong><a href="mailto:${E.emRes}">${E.emRes}</a></div></li>
</ul>`;
const servLista = () => `<ul class="servs">${servicos.map(x => `<li class="sobe">${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul>`;
const depLista = (n = 6) => `<ul class="deps">${depoimentos.slice(0, n).map(d => `<li class="sobe"><blockquote><p>${d[0]}</p></blockquote><p class="dep-nome">${d[1]}</p></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar em Brasília com a Top Line: studios e kitnets com serviço de hotel, flat e sala comercial.`) + topo(v, 'alugar') + cab('Para alugar', 'Morar com enxoval, limpeza e serviço de hotel', `${aluguel.length} imóveis disponíveis agora no Sudoeste, na Asa Norte e na Asa Sul. Fale com um consultor para a visita assistida.`) + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}
<aside class="temporada"><div><p class="k">Temporada e diária</p><h2>Vai passar uns dias em Brasília?</h2><p>A Top Line também trabalha com temporada, diária e translado. Peça disponibilidade à central de reservas.</p></div><p class="bts"><a class="btn" href="mailto:${E.emRes}">${ic('mail')}${E.emRes}</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Quero saber sobre temporada ou diária com a Top Line.')}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></aside></div>
` + rodape(v);
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda no DF: apartamentos, flats, kitnets, cobertura, casa no Lago Sul, salas, lojas e galpão.`) + topo(v, 'comprar') + cab('À venda', `${vendas.length} imóveis à venda no Distrito Federal`, 'De uma vaga de garagem no Sudoeste a uma residência no Lago Sul, passando por kitnets para investir com serviço de hotel.') + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Visita assistida, limpeza e arrumação, manutenção, enxoval, pagamento de contas, reformas e consultoria ao investidor.') + topo(v, 'servicos') + cab('Serviços', 'Imobiliária com serviço de hotel', E.amigo) + `
<div class="in"><section class="serv-intro"><p class="lead">${servicosIntro}</p></section>
<section class="visita"><div class="visita-in"><p class="k">Exclusivo da Top Line</p><h2>Visita assistida</h2><p>${visita}</p><a class="btn" href="${waHref(E.wa, 'Olá! Quero agendar uma visita assistida.')}" target="_blank" rel="noopener">${icWa()}Agendar uma visita</a></div>${foto(porId(8329).fotos[0], 'Sala de flat mobiliado no Ed. Metropolitan Flat, Asa Norte')}</section>
<section class="serv-sec"><header class="tit"><p class="k">Para quem mora</p><h2>O que a Top Line faz por você</h2></header>${servLista()}</section>
<section class="modal-sec"><header class="tit"><p class="k">Modalidades</p><h2>Venda, temporada, locação, diária e translado</h2></header><ul class="modals">${modalidades.map(m => `<li>${ic(m[0])}<span>${m[1]}</span></li>`).join('')}</ul></section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Top Line', historia[2]) + topo(v, 'empresa') + cab('A Top Line', 'Desde 1966, qualidade antes de quantidade', 'De uma fábrica de colchões a um misto de imobiliária e hotelaria em regiões nobres do Distrito Federal.') + `
<div class="in"><section class="inst"><p class="lead">${historia[0]}</p>${historia.slice(1).map(p => `<p>${p}</p>`).join('')}</section>
<section class="inst-num"><ul class="numeros"><li><b>1966</b><span>Atlas Colchões, a origem do grupo</span></li><li><b>${aluguel.length}</b><span>imóveis para alugar hoje</span></li><li><b>${vendas.length}</b><span>imóveis à venda</span></li><li><b>${bairros.length}</b><span>regiões do DF e entorno</span></li></ul></section>
<section class="procura"><header class="tit"><p class="k">O que você procura?</p><h2>Do flat ao galpão</h2></header>${procura.map(p => `<p>${p}</p>`).join('')}</section>
<section class="dep-sec"><header class="tit"><p class="k">Depoimentos</p><h2>O que nossos clientes falam sobre nós</h2></header>${depLista()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Top Line Prime: ${E.fone1}, locação ${E.foneLoc}, vendas ${E.foneVen}. ${E.end}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Top Line', E.amigo) + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mande sua mensagem</h2>${formulario()}</div><div>${contatoLista}${mapa}</div></section>
<section class="trabalhe" id="trabalhe"><div><p class="k">Trabalhe conosco</p><h2>Banco de talentos</h2><p>Criatividade, dinamismo, iniciativa e capacidade de vencer desafios são alguns dos parâmetros considerados em nossos processos de seleção.</p><p>Cadastre seu currículo: seus dados passam a fazer parte do nosso Banco de Talentos e, sempre que surgir uma vaga com o seu perfil, entraremos em contato. As informações recebidas são de uso exclusivo da área de Recursos Humanos e têm tratamento estritamente confidencial.</p></div><p><a class="btn" href="mailto:${E.emSel}?subject=${encodeURIComponent('Currículo pelo site')}">${ic('mail')}Enviar currículo para ${E.emSel}</a></p></section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = porId(8421).fotos[2];
  const destA = [8421, 8404, 8329, 8040].map(porId);
  const destV = [8112, 3386, 8356, 6749, 8264, 5941].map(porId);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária e hotelaria · Brasília</p><h1>Imóveis em Brasília com padrão de hotel</h1><p>${E.slogan} Studios e flats mobiliados com enxoval, limpeza e manutenção, além de casas, salas e lojas para comprar.</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${vendas.length} imóveis</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto"><div class="moldura">${foto(capa, 'Studio mobiliado com painel de madeira e iluminação, Ed. Portal Master, Sudoeste', ' loading="eager" fetchpriority="high"')}</div><figcaption>Studio com serviço de hotel · Portal Master, Sudoeste</figcaption></figure>
</div></section>
<section class="balcao"><div class="in"><p class="k">Na recepção da Top Line</p><ul class="modals">${modalidades.map(m => `<li>${ic(m[0])}<span>${m[1]}</span></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Prontos para morar, com enxoval</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos ${ic('seta')}</a></header><ul class="cards cards-4">${destA.map(i => cartao(v, i)).join('')}</ul></section>
<section class="hotel-a"><div class="in hotel-a-in"><div><p class="k">Serviços ao morador</p><h2>Você mora. A Top Line cuida do resto.</h2><p>${servicosIntro.split('. ').slice(0, 2).join('. ')}.</p><a class="btn" href="${link(v, 'servicos')}">Ver todos os serviços</a></div><ul class="lista-hotel">${servicos.map(x => `<li>${ic(x[0])}<span><b>${x[1]}.</b> ${x[2]}</span></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar ou investir</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${destV.map(i => cartao(v, i)).join('')}</ul></section>
<section class="hist-a"><div class="in hist-a-in"><p class="ano">1966</p><div><p class="k">Nossa história</p><h2>Começou numa fábrica de colchões</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Top Line ${ic('seta')}</a></div></div></section>
<section class="in dep-a"><header class="tit"><p class="k">Depoimentos</p><h2>O que nossos clientes falam sobre nós</h2></header>${depLista(3)}</section>
<section class="contato-a"><div class="in contato-a-in"><div><p class="k">Entre em contato</p><h2>${E.amigo}</h2>${contatoLista}</div>${formulario()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const lago = porId(8112);
  const linha = i => `<li><a href="${link(v, i.slug)}">${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="ln-txt"><small>${i.tipo} · ${i.bairro}</small><b>${esc(i.titulo)}</b><em>${resumo(i).join(' · ')}</em></span><span class="ln-preco">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto(lago.fotos[0], 'Varanda de residência no Lago Sul com vista para o jardim', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Top Line Prime · Distrito Federal</p><h1>Imóveis em regiões nobres de Brasília, <span>administrados com padrão de hotel.</span></h1><p>${E.slogan}</p><p class="bts"><a class="btn" href="${link(v, 'alugar')}">Imóveis para alugar</a><a class="btn btn-linha" href="${link(v, 'comprar')}">Imóveis à venda</a></p></div>
<a class="hero-b-dest" href="${link(v, lago.slug)}"><small>Lago Sul · à venda</small><b>Residência com vista para o Lago Paranoá e a Ponte JK</b><span>${lago.preco}</span></a></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>1966</b><span>origem do grupo</span></li><li><b>${aluguel.length}</b><span>para alugar</span></li><li><b>${vendas.length}</b><span>à venda</span></li><li><b>5</b><span>modalidades: venda, temporada, locação, diária e translado</span></li></ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Mobiliados, com serviço de hotel</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos ${ic('seta')}</a></header><ol class="linhas">${aluguel.map(linha).join('')}</ol></section>
<section class="hotel-b"><div class="in"><header class="tit"><p class="k">Serviços</p><h2>Limpeza, enxoval, manutenção e contas em dia</h2><p>${servicosIntro.split('. ').slice(0, 2).join('. ')}.</p></header>${servLista()}<div class="visita-b"><h3>Visita assistida</h3><p>${visita}</p></div></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para morar ou investir</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ol class="linhas">${[3386, 8356, 6749, 7228, 5112, 5921].map(porId).map(linha).join('')}</ol></section>
<section class="dep-b"><div class="in"><header class="tit"><p class="k">Depoimentos</p><h2>Quem confia o imóvel à Top Line</h2></header>${depLista(4)}</div></section>
<section class="in contato-b"><div><p class="k">Contato</p><h2>${E.amigo}</h2>${contatoLista}</div><div>${mapa}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Top Line Prime', artigo: 'da', url: E.url, lang: 'pt', cor: '#cc3333', fundo: '#141414', claro: '#f6f3ec',
  fonteTitulo: '"Poiret One",system-ui,sans-serif', fonteTexto: 'Montserrat,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara como uma recepção de hotel, com o letreiro art déco do logo, o vermelho do site atual e as modalidades logo na entrada.', pontos: [`Os ${imoveis.length} imóveis do site com fotos, valores e página própria`, 'Serviços ao morador e visita assistida em destaque', 'Depoimentos reais de clientes'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Escura e prateada como o logo, abrindo na residência do Lago Sul, com os imóveis listados com foto, ficha e valor.', pontos: ['Casa do Lago Sul em destaque na abertura', 'Aluguéis mobiliados com serviço de hotel', 'Contato e mapa do Ed. Metropolitan Flat'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
