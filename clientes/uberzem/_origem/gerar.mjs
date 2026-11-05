// Uberzem (Armazéns Gerais Uberlândia Ltda): armazenagem e transbordo rodoferroviário de grãos desde 2001. Gera public/{a,b}/ e a página de escolha.
// node clientes/uberzem/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs uberzem http://www.uberzem.com.br/)
// Textos, números, serviços, certificação e fotos: do site atual (2017). Sem WhatsApp no site: formulário abre o e-mail falecom@.
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');

const E = {
  nome: 'Uberzem', url: 'https://uberzem.overtus.com.br/', antigo: 'http://www.uberzem.com.br/',
  fone: '(34) 3254-0900', email: 'falecom@uberzem.com.br',
  end: 'Av. Aírton Borges da Silva, 2445', bairro: 'Bairro Minas Gerais (Distrito Industrial)', cidade: 'Uberlândia – MG', cep: '38402-100',
  conab: 'http://consultaweb.conab.gov.br/consultas/consultaCertificacaoArmazem.do?method=detalharCertificacaoPorCda&cda=54937100012',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';

const NUM = [
  { b: '70.000 t', s: 'de grãos a granel em 11 silos metálicos' },
  { b: '5.000 t', s: 'em dois armazéns convencionais de 2.000 m²' },
  { b: '40 vagões', s: 'no terminal rodoferroviário' },
  { b: '400 t/h', s: 'de carregamento e transbordo' },
  { b: '3 moegas', s: 'de 200 t com tombadores hidráulicos' },
  { b: '2001', s: 'início das operações em Uberlândia' },
];

const SERV = [
  { slug: 'armazenagem-de-graos-e-ensacados', nome: 'Armazenagem de grãos e ensacados', curto: 'Armazenagem', foto: 'silos-ceu.webp', icone: 'pacote',
    resumo: '70.000 t a granel em 11 silos com aeração e termometria, e 5.000 t em armazéns convencionais para farelos e sacarias.',
    texto: [
      'A armazenagem contempla um conjunto de operações de recepção, descarga, carregamento, arrumação e conservação de matérias-primas, produtos acabados ou semiacabados. Ela é essencial nos processos logísticos que envolvem a cadeia de suprimentos: para atender as demandas e as exigências do mercado, é preciso ser ágil e flexível nas operações.',
      'Na Uberzem, a armazenagem tem por objetivo as atividades de guarda e conservação, em condições inalteradas de qualidade e quantidade, de produtos agrícolas e grãos.',
      'Contamos com uma capacidade de armazenagem de <b>70.000 toneladas de grãos (granel) em 11 silos metálicos</b>, cada um com sistema inteligente de aeração e termometria, responsável pelo monitoramento e controle do material armazenado. A Uberzem conta também com <b>dois armazéns convencionais com área de 2.000 m² e capacidade para 5.000 toneladas</b>, destinados à armazenagem de farelos, cereais a granel e sacarias.',
      'Todas as etapas de armazenagem são <b>controladas automaticamente por um sistema especialmente desenvolvido</b>, garantindo o manuseio correto dos produtos: rapidez nos processos, redução de possíveis perdas e, principalmente, manutenção da qualidade do grão armazenado.',
    ],
    dados: [['70.000 t', 'granel em 11 silos'], ['5.000 t', 'armazéns convencionais'], ['2.000 m²', 'de área coberta']] },
  { slug: 'transbordo-rodoferroviario', nome: 'Transbordo rodoferroviário', curto: 'Transbordo', foto: 'terminal-ferroviario.webp', icone: 'caminhao',
    resumo: 'Terminal para 40 vagões a 400 t/h, com ramal ferroviário até os portos de Santos e Vitória.',
    texto: [
      'A operação de transbordo consiste na remoção de produto de um determinado local (caminhão, silo, entre outros) para um vagão e vice-versa. Essa operação caracteriza permanência do produto em uma unidade armazenadora, cuja destinação é norteada pelas demandas do mercado interno e externo.',
      'Exige a presença de vagões vazios, limpos e fechados para o processo, que se baseia na pesagem do vagão vazio feita pela balança ferroviária. Da carga do vagão é retirada amostra para controle de qualidade. São necessárias, também, nova pesagem e a emissão dos documentos fiscais para trânsito de mercadoria.',
      'Para dinamizar as operações foi construído um <b>terminal rodoferroviário para 40 vagões</b>, destinado ao carregamento e transbordo de grãos e farelos, com capacidade de <b>400 toneladas/hora</b> e provido de um <b>ramal ferroviário que liga aos portos de Santos e de Vitória</b>.',
      'Para agilizar a descarga, além do moderno sistema pneumático de retirada de amostras, foram construídas <b>3 moegas de 200 toneladas</b> cada, equipadas com tombadores hidráulicos que operam desde pequenos caminhões até treminhões. O tombador diminui o uso de mão de obra e torna o processo mais ágil e seguro.',
    ],
    dados: [['40', 'vagões no terminal'], ['400 t/h', 'de capacidade'], ['3 × 200 t', 'moegas com tombador']] },
  { slug: 'limpeza-e-secagem', nome: 'Limpeza e secagem', curto: 'Limpeza e secagem', foto: 'secador.webp', icone: 'chama',
    resumo: 'Pré-limpeza, limpeza por ar e peneira e secagem até a umidade certa para armazenar sem perdas.',
    texto: [
      '<b>Limpeza.</b> O processo de limpeza dos grãos visa reduzir o teor de impurezas, matérias estranhas, restos culturais e grãos trincados, quebrados ou ardidos a um nível aceitável para a armazenagem e comercialização. Deve ser feita antes do armazenamento, com ou sem secagem, para garantir a qualidade dos grãos normais e sadios e uniformizar a massa de grãos para a aeração e a secagem.',
      'A limpeza é feita em máquinas de pré-limpeza e limpeza, com o objetivo de reduzir ao máximo o nível de impurezas. As máquinas de ar e peneira, um dos sistemas mais eficientes para milho a granel, retiram as impurezas maiores e menores por peneiramento e as leves por aspiração.',
      '<b>Secagem.</b> A umidade do grão afeta diretamente sua qualidade: quanto maior a umidade, maior a liberação de calor, o que acelera a respiração da massa armazenada e gera perdas. Produto muito seco representa prejuízo ao vendedor; muito úmido corre risco de deteriorar pela proliferação de fungos.',
      'A secagem é o tratamento que reduz o conteúdo de água dos grãos até um teor de umidade passível de armazenagem, mantendo ao máximo sua qualidade. Feita de maneira correta, depois da pré-limpeza, garante condições adequadas de armazenagem e a qualidade do produto para a comercialização.',
    ] },
  { slug: 'classificacao', nome: 'Classificação', curto: 'Classificação', foto: 'amostrador.webp', icone: 'medidor',
    resumo: 'Amostragem pneumática na descarga e laudo de classificação conforme a Lei nº 9.972/2000.',
    texto: [
      'A classificação de grãos avalia a qualidade dos produtos comercializados entre cooperativas, cerealistas, tradings, produtores rurais, indústrias ou poder público. A <b>Lei nº 9.972, de 25 de maio de 2000</b>, institui a classificação de produtos vegetais, subprodutos e resíduos de valor econômico, com base em padrões oficiais do Ministério da Agricultura.',
      'Para atender todos os parâmetros que a lei exige, a Uberzem dispõe de <b>estrutura física, instalações, equipamentos e profissionais habilitados</b> para a execução dos serviços de classificação. Na descarga do veículo, é retirada uma amostra do produto em diversos pontos da carga e identificado o percentual de desconto em <b>umidade, impureza, avariado, ardido e partido</b>.',
      'Após a classificação é elaborado o <b>laudo de classificação</b>, com todos os elementos de identificação do lote: firma interessada, natureza do produto, local de armazenamento, peso líquido e bruto, peso da amostra, zona de produção e o enquadramento nos padrões oficiais vigentes (grupo, classe e tipo).',
    ],
    lista: ['Referencial de identidade e qualidade', 'Uniformização da linguagem de compra e venda', 'Organização do mercado', 'Estratificação da qualidade do produto', 'Conhecimento dos atributos físicos, químicos e biológicos', 'Aproxima diferentes agentes do mercado', 'Serviço auxiliar de comercialização', 'Preços diferenciados'] },
  { slug: 'pesagem-avulsa', nome: 'Pesagem avulsa', curto: 'Pesagem', foto: 'moega-caminhao.webp', icone: 'medidor',
    resumo: 'Pesagem de veículos que não entram com produto no armazém, com ticket de balança.',
    texto: [
      'Disponibilizamos o serviço de <b>pesagem avulsa</b>, caso algum cliente necessite. Trata-se de um serviço à parte, de pesagem de veículos que não se destinam à entrada de produtos no armazém.',
      'No ticket de balança constam o nome do cliente, o peso, a placa do caminhão, a data e a hora.',
    ] },
  { slug: 'expurgo', nome: 'Expurgo', curto: 'Expurgo', foto: 'silos-armazem.webp', icone: 'escudo',
    resumo: 'Fumigação para eliminar insetos em todas as fases, buscando 100% de eficiência no controle.',
    texto: [
      'Normalmente, as pragas que ocorrem no armazenamento provêm do campo: é a chamada infestação cruzada. Ovos, larvas ou adultos chegam aos armazéns junto com as vagens, grãos ou sacarias, e grãos sadios podem ser infestados quando medidas preventivas não são tomadas.',
      'O <b>expurgo</b> é a aplicação de um produto que visa a eliminação dos insetos que se encontram nos produtos armazenados, em suas diversas fases de desenvolvimento, procurando atingir uma <b>eficiência de 100% no controle</b>.',
      'Na operação de expurgo são empregados defensivos conhecidos como fumigantes, sendo o fosfeto de alumínio (fosfina) o mais utilizado atualmente (fonte: Embrapa).',
    ] },
];

const C = {
  quem: 'A Uberzem é uma empresa do setor do agronegócio que oferece a você produtor rural, indústria, exportador e demais usuários o que há de melhor em segurança e tecnologia no sistema de armazenagem e serviços de movimentação de grãos e derivados.',
  historia: [
    'O Armazéns Gerais Uberlândia Ltda, a Uberzem, iniciou suas operações em <b>2001</b> na Avenida Aírton Borges da Silva, nº 2445, no distrito industrial de Uberlândia. Conta com uma ampla estrutura física e profissionais qualificados, oferecendo a produtores, indústrias, exportadores e demais usuários segurança e tecnologia em armazenagem e transbordo de grãos (milho, soja, café) e farelados.',
    'Com localização de fácil acesso, a empresa conquistou diversos clientes, desde pequenos e grandes produtores rurais até grandes empresas de comercialização, beneficiamento e exportação de grãos.',
    'Ciente da responsabilidade e do desafio do ramo de armazenagem de grãos, a Uberzem tem como filosofia prestar serviços de qualidade, diferenciando-se não só pela moderna estrutura física, mas também pela qualificação de sua equipe. Investe em tecnologia e treinamento para oferecer ao produtor o que há de mais moderno em armazenagem de grãos.',
    'A Uberzem está sempre atualizando suas normas diante das leis existentes, pois este mercado competitivo exige um armazém de confiança, que forneça tranquilidade e segurança aos clientes. Milho, soja, café e farelados são importantíssimos para o mercado brasileiro, consumidos internamente e comercializados internacionalmente, num país que é um dos maiores exportadores de commodities do mundo.',
  ],
  missao: 'Oferecer aos nossos clientes segurança e qualidade na prestação de serviços de armazenagem e movimentação de grãos e derivados.',
  visao: 'Ser reconhecida regionalmente pela excelência dos serviços prestados no ramo de armazenagem e transbordo de grãos e derivados.',
  valores: ['Tranquilidade: todas as vantagens oferecidas pela Uberzem resultam em tranquilidade.', 'Confiança: conquistar relacionamentos confiáveis.', 'Qualidade e segurança: entregar atividades e resultados com qualidade e segurança.'],
  diferenciais: [
    { t: 'Facilidade de acesso', d: 'Localizado no anel viário Ayrton Senna, o armazém tem fácil acesso rodoviário e ferroviário. Seja qual for o meio escolhido para transportar seu produto, a Uberzem está preparada para uma operação rápida e segura.', i: 'caminhao' },
    { t: 'Automação', d: 'Todas as etapas de armazenagem são controladas automaticamente por um sistema especialmente desenvolvido: rapidez em todo o processo, redução de possíveis perdas e manutenção da qualidade do grão armazenado.', i: 'engrenagem' },
    { t: 'Segurança para seu produto', d: 'A Uberzem investe em tecnologia para proporcionar segurança e qualidade em todas as etapas. Os armazéns funcionam com equipamentos de última geração e são modelo no segmento.', i: 'escudo' },
  ],
  produtos: ['Milho', 'Soja', 'Café', 'Farelos', 'Sacarias'],
};
// fluxo do grão dentro do armazém (processo visual)
const FLUXO = [
  { t: 'Recepção e pesagem', d: 'Balança rodoviária e 3 moegas com tombador hidráulico.' },
  { t: 'Classificação', d: 'Amostra pneumática e laudo pela Lei 9.972.' },
  { t: 'Limpeza e secagem', d: 'Pré-limpeza, ar e peneira, secador.' },
  { t: 'Armazenagem', d: '11 silos com aeração e termometria.' },
  { t: 'Expurgo', d: 'Controle de pragas por fumigação.' },
  { t: 'Expedição', d: 'Caminhão ou vagão, até 400 t/h.' },
];

const NAV = [
  { slug: 'index', nome: 'Página inicial' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'servicos', nome: 'Serviços' },
  { slug: 'certificacoes', nome: 'Certificações' }, { slug: 'contato', nome: 'Contato' },
];
const desc = {
  index: 'Uberzem, Armazéns Gerais Uberlândia: armazenagem de 70.000 t de grãos, terminal rodoferroviário para 40 vagões, limpeza, secagem, classificação, pesagem e expurgo.',
  'quem-somos': 'Armazéns Gerais Uberlândia Ltda desde 2001 no distrito industrial de Uberlândia. Missão, visão, valores e história.',
  servicos: 'Armazenagem de grãos e ensacados, transbordo rodoferroviário, limpeza e secagem, classificação, pesagem avulsa e expurgo.',
  certificacoes: 'Unidade armazenadora certificada e cadastrada na Conab. Verifique o certificado.',
  contato: 'Fale com a Uberzem: (34) 3254-0900, falecom@uberzem.com.br. Av. Aírton Borges da Silva, 2445, Uberlândia – MG.',
};
const titulos = { index: 'Uberzem · Armazéns Gerais Uberlândia', 'quem-somos': 'Quem somos · Uberzem', servicos: 'Serviços · Uberzem', certificacoes: 'Certificações · Uberzem', contato: 'Contato · Uberzem' };
for (const s of SERV) { titulos[`servicos/${s.slug}`] = `${s.nome} · Uberzem`; desc[`servicos/${s.slug}`] = `${s.nome} na Uberzem, Uberlândia – MG. ${s.resumo}`; }

const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const marca = (branco = false) => `<img class="logo" src="${IMG}${branco ? 'logo-branco' : 'logo'}.svg" alt="Uberzem" width="101" height="88">`;

function topo(v, ativo) {
  const at = ativo.startsWith('servicos') ? 'servicos' : ativo;
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('pin')} ${E.end} · ${E.cidade}</span>
    <span class="faixa-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${marca()}<span class="marca-txt">Armazéns Gerais<br>Uberlândia</span></a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV, at)}</ul></nav>
    <a class="btn topo-cta" href="${link(v, 'contato')}#form">Solicitar armazenagem</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Safra chegando?</p><h2>Reserve espaço para armazenar ou transbordar sua carga</h2><p>Fale com a área comercial: capacidade, prazos e condições para produtor, indústria e exportador.</p></div>
  <div class="cta-bts"><a class="btn" href="${link(v, 'contato')}#form">${ic('mail')} Enviar mensagem</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${marca(true)}<p>${C.quem}</p></div>
  <div><h3>Páginas</h3><ul>${NAV.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Serviços</h3><ul>${SERV.map(s => `<li><a href="${link(v, `servicos/${s.slug}`)}">${s.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Fale conosco</h3><p>${E.end}<br>${E.bairro}<br>${E.cidade} · CEP ${E.cep}</p><p><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Armazéns Gerais Uberlândia Ltda · Uberzem</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#659900' }) + topo(v, slug) + corpo + rodape(v);
const cabecalhoPg = (v, trilha, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a>${trilha.map(([n, s]) => s ? ` / <a href="${link(v, s)}">${n}</a>` : ` / ${esc(n)}`).join('')}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const numeros = (lim = 6) => `<ul class="numeros">${NUM.slice(0, lim).map(n => `<li><b>${n.b}</b><span>${n.s}</span></li>`).join('')}</ul>`;
const fluxo = `<ol class="fluxo">${FLUXO.map((f, i) => `<li class="sobe" style="--i:${i}"><span class="fluxo-n">${String(i + 1).padStart(2, '0')}</span><h3>${f.t}</h3><p>${f.d}</p></li>`).join('')}</ol>`;
const servCards = v => `<ul class="servs">${SERV.map((s, i) => `<li class="sobe" style="--i:${i}"><a href="${link(v, `servicos/${s.slug}`)}">${fig(s.foto, s.nome)}<div><h3>${s.nome}</h3><p>${s.resumo}</p><span class="link-seta">Ver serviço ${ic('seta')}</span></div></a></li>`).join('')}</ul>`;
const diferenciais = `<ul class="difs">${C.diferenciais.map(d => `<li class="sobe">${ic(d.i)}<h3>${d.t}</h3><p>${d.d}</p></li>`).join('')}</ul>`;
const certBloco = v => `<div class="cert-in">
  <figure class="cert-img sobe"><a href="${IMG}certificado.webp" data-foto>${fig('certificado.webp', 'Certificado de unidade armazenadora da Uberzem')}</a></figure>
  <div class="sobe"><p class="sobre">Certificação</p><h2>Unidade armazenadora certificada</h2><p>A unidade da Uberzem em Uberlândia é certificada e cadastrada na Conab (CDA 54937100012), atendendo aos requisitos para a guarda e conservação de produtos agropecuários.</p><p>A situação do certificado pode ser consultada a qualquer momento no site da Conab.</p><a class="btn" href="${E.conab}" target="_blank" rel="noopener">${ic('escudo')} Verificar certificado ${ic('ext')}</a></div>
</div>`;
const formContato = `<form class="form" id="form" data-email="${E.email}" data-assunto="Contato pelo site">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa ou fazenda<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail*<input name="email" type="email" required autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Serviço<select name="servico"><option value="">Selecione</option>${SERV.map(s => `<option>${s.nome}</option>`).join('')}<option>Outro assunto</option></select></label><label>Produto e volume<input name="produto" placeholder="Ex.: soja, 3.000 t"></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
  <p class="form-nota">A mensagem abre no seu e-mail endereçada a ${E.email}.</p>
</form>`;

// ---------- páginas internas ----------
function paginaQuem(v) {
  return cabecalhoPg(v, [['Quem somos']], 'Armazéns Gerais Uberlândia', 'Desde 2001 oferecendo segurança e tecnologia em armazenagem e transbordo de grãos.', 'entrada-armazem.webp') + `
<section class="sec hist"><div class="in hist-in">
  <div class="sobe hist-txt"><p class="sobre">A empresa</p><p class="hist-lead">${C.quem}</p>${C.historia.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="hist-lado sobe">${fig('silos-entardecer.webp', 'Silos da Uberzem')}<ul class="hist-prod">${C.produtos.map(p => `<li>${p}</li>`).join('')}</ul></aside>
</div></section>
<section class="sec mvv"><div class="in mvv-grade">
  <div class="mvv-col sobe"><h2>Missão</h2><p>${C.missao}</p></div>
  <div class="mvv-col sobe"><h2>Visão</h2><p>${C.visao}</p></div>
  <div class="mvv-col sobe"><h2>Valores</h2><ul>${C.valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>
<section class="sec num-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Estrutura</p><h2>Uma das estruturas mais modernas do país</h2></div>${numeros()}</div></section>`;
}

function paginaServicos(v) {
  return cabecalhoPg(v, [['Serviços']], 'Serviços', 'Da descarga do caminhão ao embarque no vagão: tudo o que o grão precisa dentro do armazém.', 'tombador.webp') + `
<section class="sec fluxo-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Caminho do grão</p><h2>Como sua carga passa pela Uberzem</h2></div>${fluxo}</div></section>
<section class="sec servs-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Seis serviços</p><h2>Escolha o serviço</h2></div>${servCards(v)}</div></section>`;
}

function paginaServico(v, s) {
  const outros = SERV.filter(o => o !== s);
  return cabecalhoPg(v, [['Serviços', 'servicos'], [s.curto]], s.nome, s.resumo, s.foto) + `
<section class="sec serv-det"><div class="in serv-det-in">
  <article class="sobe serv-txt">${s.texto.map(p => `<p>${p}</p>`).join('')}${s.lista ? `<h2 class="serv-sub">Vantagens da classificação</h2><ul class="serv-lista">${s.lista.map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul>` : ''}</article>
  <aside class="serv-lado sobe">${s.dados ? `<ul class="serv-dados">${s.dados.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join('')}</ul>` : ''}
    <div class="serv-cta"><h3>Precisa deste serviço?</h3><p>Fale com a área comercial.</p><a class="btn" href="${link(v, 'contato')}#form">${ic('mail')} Enviar mensagem</a><a class="serv-fone" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
    <nav class="serv-outros" aria-label="Outros serviços"><h3>Outros serviços</h3><ul>${outros.map(o => `<li><a href="${link(v, `servicos/${o.slug}`)}">${o.nome} ${ic('seta')}</a></li>`).join('')}</ul></nav>
  </aside>
</div></section>`;
}

function paginaCert(v) {
  return cabecalhoPg(v, [['Certificações']], 'Certificações', 'Qualidade comprovada pelos mais rígidos padrões de armazenagem.', 'silos-armazem.webp') + `
<section class="sec cert-sec"><div class="in">${certBloco(v)}</div></section>
<section class="sec difs-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Por que a Uberzem</p><h2>Segurança e tecnologia em todas as etapas</h2></div>${diferenciais}</div></section>`;
}

function paginaContato(v) {
  return cabecalhoPg(v, [['Contato']], 'Contato', 'Fale com a Uberzem por telefone, e-mail ou pelo formulário.', null) + `
<section class="sec cont-sec"><div class="in cont-in">
  <div class="sobe"><h2>Envie sua mensagem</h2>${formContato}</div>
  <aside class="cont-info sobe"><ul>
    <li>${ic('tel')}<div><b>Telefone</b><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></div></li>
    <li>${ic('caminhao')}<div><b>Acesso</b><span>Anel viário Ayrton Senna, com acesso rodoviário e ferroviário.</span></div></li>
  </ul></aside>
</div></section>
<section class="mapa-sec"><iframe src="https://maps.google.com/maps?q=${encodeURIComponent('Av. Aírton Borges da Silva, 2445, Uberlândia - MG')}&z=14&output=embed" title="Mapa da Uberzem em Uberlândia" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

const internas = v => {
  const p = { 'quem-somos': pagina(v, 'quem-somos', paginaQuem(v)), servicos: pagina(v, 'servicos', paginaServicos(v)), certificacoes: pagina(v, 'certificacoes', paginaCert(v)), contato: pagina(v, 'contato', paginaContato(v)) };
  for (const s of SERV) p[`servicos/${s.slug}`] = pagina(v, `servicos/${s.slug}`, paginaServico(v, s));
  return p;
};

// ---------- A "Terminal": clara, silos e números da estrutura ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Armazéns Gerais Uberlândia · desde 2001</p>
    <h1>Estrutura moderna para armazenar e embarcar a sua safra</h1>
    <p class="lead">70.000 toneladas em 11 silos, terminal rodoferroviário para 40 vagões e ramal até os portos de Santos e Vitória.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'servicos')}">Conheça os serviços ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'contato')}#form">Solicitar armazenagem</a></div>
  </div>
  <figure class="hero-foto">${fig('silos-ceu.webp', 'Silos metálicos da Uberzem')}<figcaption>${ic('escudo')} Unidade armazenadora certificada</figcaption></figure>
</div></section>
<section class="painel"><div class="in">${numeros()}</div></section>

<section class="sec difs-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Por que a Uberzem</p><h2>Rapidez, automação e segurança para o seu grão</h2></div>
  ${diferenciais}
</div></section>

<section class="sec fluxo-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Caminho do grão</p><h2>Do caminhão ao vagão, tudo no mesmo lugar</h2></div>
  ${fluxo}
</div></section>

<section class="sec servs-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Serviços</p><h2>Tecnologia de ponta e profissionais experientes</h2></div>
  ${servCards(v)}
</div></section>

<section class="sec ferro"><div class="in ferro-in">
  <figure class="sobe">${fig('terminal-ferroviario.webp', 'Terminal rodoferroviário da Uberzem')}</figure>
  <div class="sobe"><p class="sobre">Transbordo rodoferroviário</p><h2>Ramal ferroviário até Santos e Vitória</h2><p>Terminal para 40 vagões a 400 t/h e 3 moegas de 200 t com tombadores hidráulicos, que recebem desde pequenos caminhões até treminhões.</p>
    <ol class="rota"><li><b>Uberlândia</b><span>Uberzem</span></li><li><b>Porto de Santos</b><span>SP</span></li><li><b>Porto de Vitória</b><span>ES</span></li></ol>
    <a class="link-seta" href="${link(v, 'servicos/transbordo-rodoferroviario')}">Ver o transbordo ${ic('seta')}</a></div>
</div></section>

<section class="sec cert-sec"><div class="in">${certBloco(v)}</div></section>

<section class="sec quem-home"><div class="in quem-home-in">
  <div class="sobe"><p class="sobre">Quem somos</p><h2>Há mais de 20 anos no distrito industrial de Uberlândia</h2><p>${C.quem}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Nossa história ${ic('seta')}</a></div>
  <div class="quem-fotos sobe">${fig('entrada-armazem.webp', 'Entrada do armazém')}${fig('graos-soja.webp', 'Grãos de soja')}</div>
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

// ---------- B "Safra": foto em tela cheia, verde da marca, serviços em faixas ----------
function versaoB() {
  const v = 'b';
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}tombador.webp)"></div><div class="in hero-in">
  <p class="sobre">Uberzem · Uberlândia – MG</p>
  <h1>Armazenagem e transbordo de grãos com tecnologia de ponta</h1>
  <p class="lead">Milho, soja, café e farelos guardados com aeração, termometria e automação, e embarcados por caminhão ou trem.</p>
  <div class="hero-bts"><a class="btn" href="${link(v, 'contato')}#form">Solicitar armazenagem ${ic('seta')}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
</div></section>
<section class="painel"><div class="in">${numeros(4)}</div></section>

<section class="sec servs-faixas"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Serviços</p><h2>Seis serviços, um só armazém</h2></div>
  <ul class="faixas">${SERV.map((s, i) => `<li class="sobe"><a href="${link(v, `servicos/${s.slug}`)}"><span class="faixa-n">${String(i + 1).padStart(2, '0')}</span>${fig(s.foto, s.nome)}<div><h3>${s.nome}</h3><p>${s.resumo}</p></div><span class="faixa-seta">${ic('seta')}</span></a></li>`).join('')}</ul>
</div></section>

<section class="sec fluxo-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Caminho do grão</p><h2>Como sua carga passa pela Uberzem</h2></div>
  ${fluxo}
</div></section>

<section class="sec difs-foto"><div class="in difs-foto-in">
  <figure class="sobe">${fig('silos-entardecer.webp', 'Silos ao entardecer')}</figure>
  <div class="sobe"><p class="sobre">Por que a Uberzem</p><h2>Segurança para o seu produto</h2>
    <ul class="difs-lista">${C.diferenciais.map(d => `<li>${ic(d.i)}<div><h3>${d.t}</h3><p>${d.d}</p></div></li>`).join('')}</ul></div>
</div></section>

<section class="sec cert-sec"><div class="in">${certBloco(v)}</div></section>

<section class="galeria-sec"><div class="galeria">${['secador.webp', 'amostrador.webp', 'milho.webp', 'moega-caminhao.webp'].map(f => `<a href="${IMG}${f}" data-foto>${fig(f, 'Estrutura da Uberzem')}</a>`).join('')}</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', versaoA());
escreverVersao(pub, 'b', versaoB());
await escolha(pub, {
  nome: 'Uberzem', artigo: 'da', url: E.url, lang: 'pt', cor: '#659900', fundo: '#1d3008', claro: '#f4f5ee',
  fonteTitulo: "'Barlow Condensed',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Terminal', paginas: 11, texto: 'Clara, com os silos na abertura e os números da estrutura em destaque: 70.000 t, 40 vagões, 400 t/h.', pontos: ['Caminho do grão em 6 etapas', 'Ramal até Santos e Vitória', 'Certificado Conab com link de verificação'] },
    { letra: 'b', nome: 'Safra', paginas: 11, texto: 'Foto do tombador em tela cheia e os seis serviços em faixas, do armazém ao vagão.', pontos: ['Uma página para cada serviço, como no site atual', 'Formulário que abre o e-mail', 'Logo redesenhado em vetor'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
