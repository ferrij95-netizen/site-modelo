// Gascom Equipamentos Industriais (Sertãozinho/SP): comboios de lubrificação e abastecimento, oficinas volantes, viaturas de combate a incêndios, tanques para calda pronta, pipas e tratamento de solo.
// node clientes/gascom/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs gascom https://www.gascom.com.br/)
// Textos do site atual (ASP de 2013) e dos catálogos em PDF; fotos dos equipamentos em recorte (PNG do site) e dos setores (catálogo Pressolub). Logo redesenhado em vetor.
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');

const E = {
  nome: 'Gascom Equipamentos Industriais', url: 'https://gascom.overtus.com.br/', antigo: 'https://www.gascom.com.br/',
  fone: '(16) 2105-3622', fax: '(16) 2105-3623', email: 'comercial@gascom.com.br',
  end: 'Av. Marginal Sérgio Cancian, 5.293', ref: 'Marginal da Rodovia Armando Salles de Oliveira (antiga Av. João Olézio Marques)', cidade: 'Sertãozinho – SP', cep: '14176-503', cx: 'Caixa Postal 61',
  face: 'https://www.facebook.com/gascomonline', insta: 'https://www.instagram.com/gascom_implementadora/', yt: 'https://www.youtube.com/channel/UCb-_K9uI6MyxpPSDKtqjNHg',
  mapa: 'https://www.google.com/maps?q=Av.+Marginal+S%C3%A9rgio+Cancian,+5293,+Sert%C3%A3ozinho+-+SP&output=embed',
  tba: { site: 'https://www.tbatec.com.br/', fone: '(16) 2105-7800', end: 'Av. Marginal Sérgio Cancian, 5.255, Sertãozinho (SP)' },
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap';
const IMG = '/assets/img/';
const PDF = 'https://www.gascom.com.br/img/produtos/';

// Funções (ícones e nomes dos cabeçalhos de produto do site atual)
const F = {
  comb: ['Abastecimento de combustível', 'oleo'], lub: ['Abastecimento de lubrificantes', 'gota'], ar: ['Fornecimento de ar comprimido', 'medidor'],
  agua: ['Fornecimento de água bombeada', 'piscina'], manut: ['Manutenção preventiva e corretiva', 'chave'], pneus: ['Transporte e troca de pneus', 'disco'],
  fogo: ['Combate a incêndios', 'chama'], irrig: ['Irrigação', 'chuveiro'], calda: ['Calda pronta', 'escudo'], adubo: ['Transporte de adubo granulado', 'pacote'],
  lav: ['Lavação', 'caminhao'], solo: ['Tratamento de solo', 'trator'],
};
const LINHAS = [
  { n: 1, id: 'abastecimento', t: 'Abastecimento e lubrificação móvel', d: 'Realiza operações de abastecimento ou lubrificação móvel com desempenho e assepsia superiores.', cor: '#f2b705', txt: '#1d1d1f', foto: 'pressolub' },
  { n: 2, id: 'manutencao', t: 'Manutenção e assistência móvel', d: 'Realiza manutenção de máquinas que operam no campo ou na obra.', cor: '#e2832b', txt: '#1d1d1f', foto: 'furgao-oficina' },
  { n: 3, id: 'incendio', t: 'Combate a incêndios, lavação e irrigação', d: 'Combate incêndios, controla queimadas e executa aplicações multitarefas em áreas agrícolas ou florestais.', cor: '#d7262e', txt: '#fff', foto: 'agribomba' },
  { n: 4, id: 'solo', t: 'Tratamento de solo, lavação e irrigação', d: 'Executa operações multitarefas como abastecimento, irrigação, tratamento de solo e lavação.', cor: '#1f4f9c', txt: '#fff', foto: 'multiflex' },
  { n: 5, id: 'calda', t: 'Calda pronta de defensivos e fertilizantes', d: 'Executa a mistura e a transferência de caldas prontas de defensivos e/ou fertilizantes agrícolas.', cor: '#1f8a3c', txt: '#fff', foto: 'procalda' },
];
const PROD = [
  { s: 'pressolub', nome: 'Pressolub', l: 1, desde: 'Conceito inovador, desde 1998', pdf: 'catalogo-101014-pressolub.pdf', fn: { comb: 'B', lub: 'B', ar: 'B', agua: 'A' },
    intro: 'Lubrificação por impulsão de óleos à baixa pressão, que vem produzindo grandes resultados. Desenvolvido pela Gascom, reconhecido e consagrado pelo mercado.',
    bs: ['Vazões superiores em até 3 vezes em média', 'Baixíssimo índice de manutenção pela ausência de bombas', 'Reduzido nível de contaminação devido à sua concepção de projeto'] },
  { s: 'mastercom', nome: 'Mastercom', l: 1, pdf: 'catalogo-101014-mastercom.pdf', fn: { comb: 'B', lub: 'B', ar: 'B', agua: 'A' },
    intro: 'Moderno, desenvolvido para atender às altas demandas no fornecimento de combustíveis, óleos hidráulicos e lubrificantes.',
    bs: ['Alto desempenho no abastecimento de combustíveis, óleos e graxa e no fornecimento de ar comprimido', 'Autonomia superior com grandes volumes nos reservatórios de combustíveis, óleos e outros produtos', 'Robusto estruturalmente e dotado de componentes altamente confiáveis para executar suas funções'] },
  { s: 'masterlub', nome: 'Masterlub', l: 1, pdf: 'catalogo-101014-masterlub.pdf', fn: { lub: 'B', ar: 'B', agua: 'A' },
    intro: 'Especialista com alto desempenho no fornecimento de óleos hidráulicos e lubrificantes.',
    bs: ['Alto desempenho no fornecimento de óleos e graxas e de ar comprimido', 'Autonomia superior com grandes volumes nos reservatórios de óleos e outros produtos', 'Robusto estruturalmente e dotado de componentes altamente confiáveis para executar suas funções'] },
  { s: 'prolub', nome: 'Prolub', l: 1, pdf: 'catalogo-101014-prolub.pdf', fn: { comb: 'B', lub: 'B', ar: 'B', agua: 'A' },
    intro: 'O pioneiro na adoção de compartimentos blindados em comboios de lubrificação.',
    bs: ['Blindado. Compartimentos fechados mantêm os componentes protegidos contra poeira, sol e chuva', 'Seguro. As principais operações são realizadas ao nível do solo', 'Homologado. Fornecido com certificado de inspeção Inmetro'] },
  { s: 'prodiesel', nome: 'Prodiesel', l: 1, pdf: 'catalogo-101014-prodiesel.pdf', fn: { comb: 'B', lub: 'A', ar: 'A' },
    intro: 'Apropriado e eficaz no suprimento específico e qualificado de combustíveis em máquinas que operam no campo ou na obra.',
    bs: ['Confiável. Bomba de transmissão direta e engrenada, acionada pela tomada de força do veículo', 'Abastecimento com desempenho superior: 250 L/min na versão básica ou até 500 L/min opcional', 'Eficiência comprovada nos sistemas de filtragem e de medição do consumo de combustível'] },
  { s: 'furgao-oficina', nome: 'Furgão Oficina', l: 2, pdf: 'catalogo-101014-furgao-oficina.pdf', fn: { manut: 'B', ar: 'B', agua: 'A' },
    intro: 'O melhor e mais renovado apoio, que garante frentes mecanizadas operantes e resultados crescentes. Oficina móvel de atendimento rápido 24 horas.',
    bs: ['Projeto moderno com layout extremamente funcional e seguro', 'Potência suficiente para acionar todos os recursos disponíveis simultaneamente', 'Componentes de primeira linha e dimensionados adequadamente'],
    extra: ['Versões veicular, convencional (encarroçada) ou embarcada (roll-on/off)', 'Gerador elétrico, tomadas de 110 V e 220 V, esmeril e furadeira de bancada', 'Linha pneumática de 150 PSI com filtro regulador e lubrificador'] },
  { s: 'guindaste-oficina', nome: 'Guindaste Oficina', l: 2, pdf: 'catalogo-101014-guindaste-oficina.pdf', fn: { manut: 'B', ar: 'B', agua: 'A' },
    intro: 'O mais avançado e completo equipamento para atender montagens e manutenções em instalações e frentes de máquinas.',
    bs: ['Conceito inovador. Características e configurações que permitem variadas operações de forma simultânea', 'Polivalente. Combina com eficácia atendimentos de oficina volante, auto-guindaste e almoxarifado de campo', 'Seguro. As operações são realizadas ao nível do solo, com amplas possibilidades de visualização e manobras'],
    extra: ['Guindaste hidráulico com estabilizadores nos dois lados', 'Gerador elétrico, esmeril e tomadas de 110 V e 220 V', 'Linha pneumática de 100 PSI e saídas para ferramentas nos dois lados'] },
  { s: 'sos-pneus', nome: 'SOS Pneus', l: 2, pdf: 'catalogo-101014-SOS-Pneus.pdf', fn: { ar: 'B', pneus: 'B', agua: 'A' },
    intro: 'O mais eficaz e prestativo equipamento na logística de suprimento e assistência a pneus em frentes motomecanizadas.',
    bs: ['Indispensável. Recurso essencial nas logísticas de apoio à motomecanização', 'Agilidade no atendimento nas interfaces campo/obra com borracharia e/ou almoxarifado de pneus', 'Funcional. Acondiciona e transporta pneus, disponibiliza ar comprimido para calibragem e água para lastração'],
    extra: ['Guindaste telescópico tipo munk para carga e descarga de pneus', 'Bomba d’água centrífuga de 100 L/min e 50 PSI para lastração', 'Carretel retrátil de ar comprimido com mangueira de 15 metros'] },
  { s: 'agribomba', nome: 'Agribomba', l: 3, desde: 'Inovação e pioneirismo, desde 1987', pdf: 'Agribomba_190115.pdf', fn: { fogo: 'B', irrig: 'A' },
    intro: 'Referência de segurança e confiabilidade, conquistada pelo pioneirismo somado a 25 anos de constante inovação tecnológica do produto. Da cana à floresta.',
    bs: ['Incomparável performance no desempenho de suas exigentes funções', 'Insuperável em atributos que o tornam operacionalmente seguro e confiável', 'Imbatível como precursor de inovações incorporadas ao produto'],
    extra: ['Caixa-bomba CBV.IA 40 com transmissão direta e engrenada, acionada pela tomada de força (PTO/TDF) do veículo', 'Cardan automotivo balanceado em aço forjado'] },
  { s: 'agrirriga', nome: 'Agrirriga', l: 3, pdf: 'Agrirriga_190115.pdf', fn: { fogo: 'A', irrig: 'B' },
    intro: 'Extrema versatilidade por combinar com eficácia a irrigação localizada de muda-planta com combate a incêndios e aplicações multitarefas.',
    bs: ['Pioneiro. Tecnologia de ponta com componentes apropriados para atender as funções que disponibiliza', 'Versátil. Realiza operações tanto com água como com mistura homogênea de água e gel', 'Confiável. Robusto e resistente, com baixa incidência de paradas indesejadas e mínimos custos de manutenção'] },
  { s: 'agricalda', nome: 'Agricalda', l: 3, l2: 5, pdf: 'Agricalda_190115.pdf', fn: { fogo: 'A', irrig: 'A', calda: 'B' },
    intro: 'Polivalência destacada por conjugar o manejo e o abastecimento de caldas prontas com combate a incêndios e aplicações multitarefas.',
    bs: ['Confiável. Bomba com transmissão direta e engrenada, acionada pelo câmbio do veículo (caixa-bomba)', 'Seguro e ecológico. Oferece condições adequadas de segurança e proteção aos operadores e ao meio ambiente', 'Homologado. Fornecido com Certificado de Inspeção Inmetro para transporte de produtos perigosos'] },
  { s: 'prosolo', nome: 'Prosolo', l: 4, desde: 'Desde 1991', pdf: 'catalogo-101014-prosolo.pdf', fn: { solo: 'B', irrig: 'A', agua: 'A' },
    intro: 'Grandes resultados no tratamento de solo, gerados pela combinação de rendimentos superiores com recursos apropriados. Desenvolvido pela Gascom, reconhecido e consagrado pelo mercado.',
    bs: ['Bomba com desempenho 50% superior', 'Até 12 possibilidades de regulagem de cobertura', 'Rendimento de cobertura 35% superior em m²/min'],
    extra: ['Bomba d’água de até 2.000 L/min x 85 PSI com aspersores e 1.500 L/min em autocarregamento', 'Caixa-bomba CBV.IA 50 acionada pela tomada de força (PTO/TDF) do veículo', 'Engate Fácil Automático: troca de marchas sem interromper a aspersão', 'Todas as operações executadas à distância por um único operador'] },
  { s: 'multiflex', nome: 'Multiflex', l: 4, pdf: 'catalogo-101014-multiflex.pdf', fn: { lav: 'B', solo: 'A', irrig: 'A', agua: 'A' },
    intro: 'Multifuncionalidade à toda prova por aliar eficácia e amplitude operacional, tanto nas funções como nos segmentos atendidos.',
    bs: ['Disponibiliza várias funções, oferecendo os recursos com rendimentos satisfatórios para cada operação', 'Robusto e resistente, proporciona vida útil prolongada, baixa incidência de paradas indesejadas e mínimos custos de manutenção', 'Opera em diversas situações, com o veículo parado ou em movimento, mantendo as condições ideais de funcionamento'] },
  { s: 'prolavi', nome: 'Prolavi', l: 4, pdf: 'catalogo-101014-prolavi.pdf', fn: { lav: 'B', irrig: 'A' },
    intro: 'Autêntico especialista quando a necessidade é alto desempenho na lavação de pistas e pisos.',
    bs: ['Bomba com pressão 40% superior, garantindo a eficácia dos serviços propostos', 'Maior autonomia propiciada pela bomba e demais componentes, colaborando também com a economia de água', 'Opera em diversas situações, com o veículo parado ou em movimento'],
    extra: ['Caixa-bomba CBV.LI2 acionada pela tomada de força (PTO/TDF) do veículo', 'Conjunto lava-ruas com 3 bicos de pato de acionamento eletropneumático, comandados na cabine', 'Lavação por jateamento de alta pressão para defensas, muretas, colunas e placas'] },
  { s: 'proagua', nome: 'Proágua', l: 4, pdf: 'catalogo-101014-pro%C3%A1gua.pdf', fn: { irrig: 'A', agua: 'B' },
    intro: 'Indispensável, responsável e capacitado para atender o suprimento avançado de água potável.',
    bs: ['Confiável. Bomba d’água com transmissão direta e engrenada (caixa-bomba)', 'Compatibilidade entre os materiais dos componentes e a água potável, preservando a saúde do consumidor final', 'Providencial em situações de emergência e de imprevistos, oferecendo atendimento de qualidade'],
    extra: ['Caixa-bomba CBV.IA 40 acionada pela tomada de força (PTO/TDF) do veículo', 'Revestimento interno anticorrosivo em epóxi amina, apto para o transporte de água potável', 'Abastece à distância reservatórios, inclusive aéreos, com elevação de até 50 metros'] },
  { s: 'procalda', nome: 'Procalda', l: 5, pdf: 'catalogo-101014-procalda.pdf', fn: { calda: 'B' },
    intro: 'Resultado do sucesso obtido ao longo de quase 30 anos de atuação no apoio às operações com caldas prontas.',
    bs: ['Confiável. Resistente à corrosão, com alta performance de bombeamento mantendo a calda homogeneizada', 'Seguro e ecológico. Oferece condições adequadas de segurança e proteção aos operadores e ao meio ambiente', 'Versátil. Atende diversos tipos de caldas prontas nas versões veicular, embarcada e rebocada'],
    extra: ['Bomba de calda de até 2.000 L/min e 80 MCA', 'Opera caldas de herbicidas, inseticidas, fungicidas ou acaricidas em cana, citros, florestas, algodão e grãos', 'Fornecido com Certificado de Inspeção Inmetro para transporte de produtos perigosos'] },
  { s: 'apoio-plantio', nome: 'Apoio Plantio', l: 5, pdf: 'catalogo-101014-apoio-plantio.pdf', fn: { calda: 'B', adubo: 'B' },
    intro: 'Seu nome exprime o verdadeiro significado: atender a nova demanda da logística operacional agrícola, que é dar o melhor apoio ao plantio.',
    bs: ['Polivalente e eclético. Transporta e movimenta contentores de fertilizantes e opera caldas prontas', 'Confiável. Robusto, resistente e com bomba de transmissão direta e engrenada, acionada pelo câmbio do veículo', 'Homologado. Fornecido com Certificado de Inspeção Inmetro para transporte de produtos perigosos'],
    extra: ['Caixa-bomba CBV.DF 40 com transmissão direta e engrenada', 'Plataforma superior em toda a extensão do tanque, preparada para receber bags de adubo', 'Tanque único ou duplo em aço naval'] },
];
const porLinha = n => PROD.filter(p => p.l === n || p.l2 === n);
const HIST = [
  ['Início do século XX', 'Em Sertãozinho (SP), a fábrica fundada por Fausto Gaiofatto produz carrinhos, carretas, carroças, carroções, charretes e semitroles.'],
  ['1948', 'A empresa passa a se chamar Viúva Fausto Gaiofatto & Cia. Ltda., comandada por Corona Zambonini Gaiofatto; doze anos depois, assume o filho Hugo Gaiofatto.'],
  ['Anos 1970', 'João Carlos Gaiofatto e Diógenes Antônio Cortês passam a fabricar fogões industriais. Nasce o nome Gascom: Gaiofatto e Cortês, gás e comércio.'],
  ['1977', 'Com o mercado aberto pelo Proálcool, a Gascom passa a fabricar tanques para caminhões distribuidores de vinhaça, transporte de combustível e pipas.'],
  ['1986', 'Mudança no quadro societário, com Jairo Ferreira Lima na diretoria ao lado de João Carlos. A empresa se instala na sede atual.'],
  ['1993', 'A Gascom adquire toda a área onde está localizada hoje, às margens da Rodovia Armando Salles de Oliveira.'],
];
const HIST_TX = [
  'Atualmente, a Gascom fornece equipamentos para os setores canavieiro, de infraestrutura, mineração, florestal, agrícola e de concessão de serviços públicos, entre outros.',
  'Possui uma completa linha de produtos destinados à lubrificação e ao abastecimento de máquinas em frentes de trabalho mecanizadas e distantes de suas bases operacionais; viaturas para combate a incêndios e queimadas em regiões urbanas, rurais e industriais; tanques rodoviários para mistura, transporte e transferência de defensivos e adubos fluidos; oficinas volantes para manutenção e reparos em canteiros ou frentes avançadas; tanques-pipa para transporte de água potável, lavação de ruas, umedecimento e tratamento de solo, além de equipamentos correlatos como canhão monitor, carretel de mangotinho e caixa-bomba.',
  'Produzidos com tecnologia de ponta e desenvolvidos para gerar soluções, os equipamentos Gascom equipam as frotas das principais empresas do país e muitas do exterior. Líder no mercado de equipamentos para apoio logístico operacional, a Gascom prima pela excelência, versatilidade e pontualidade, com processos de fabricação rígidos e modernos e equipes preparadas e especializadas.',
];
const SETORES = [
  { t: 'Canavieiro', f: 'setor-cana', d: 'Comboios, Agribomba, Prosolo e Apoio Plantio nas frentes de corte e plantio.' },
  { t: 'Agrícola', f: 'setor-graos', d: 'Calda pronta de defensivos e fertilizantes e abastecimento no campo.' },
  { t: 'Florestal', f: 'setor-florestal', d: 'Combate a incêndios, irrigação de mudas e lubrificação de máquinas.' },
  { t: 'Mineração e infraestrutura', f: 'setor-mineracao', d: 'Abastecimento, oficinas volantes, tratamento de solo e lavação de pistas.' },
];
const DIFS = [
  { t: 'Caixa-bomba Gascom', d: 'Bomba com transmissão direta e engrenada, acionada pela tomada de força do veículo, sem correias, correntes ou motores auxiliares.', i: 'engrenagem' },
  { t: 'Homologado Inmetro', d: 'Equipamentos fornecidos com Certificado de Inspeção para transporte de produtos perigosos.', i: 'escudo' },
  { t: 'Peças originais TBA', d: 'Peças genuínas a pronta entrega, produzidas pela TBA sob supervisão da Gascom.', i: 'pacote' },
  { t: 'Assistência técnica', d: 'Técnicos treinados para manter e potencializar o desempenho dos equipamentos.', i: 'chave' },
];

const NAV = [
  { slug: 'index', nome: 'Inicial' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos' },
  { slug: 'servicos-e-pecas', nome: 'Serviços e Peças' }, { slug: 'multimidia', nome: 'Multimídia' }, { slug: 'contato', nome: 'Contato' },
];
const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}.webp" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const logo = () => `<img class="logo" src="${IMG}logo.svg" alt="Gascom Confiável" width="190" height="62">`;
const pPor = s => PROD.find(p => p.s === s);
const L = n => LINHAS.find(l => l.n === n);
const orc = (v, p) => `${link(v, 'contato')}${p ? `?equipamento=${encodeURIComponent(p)}` : ''}#orcamento`;
const negrito = s => { const m = s.match(/^([A-ZÁÉÍÓÚ][\wçãõáéíóúê ]{2,24})\. (.+)$/); return m ? `<b>${esc(m[1])}.</b> ${esc(m[2])}` : esc(s); };

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('pin')} Sertãozinho – SP</span>
    <span class="faixa-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo()}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV.slice(1), ativo)}</ul></nav>
    <a class="btn topo-cta" href="${orc(v)}">Solicite seu orçamento</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}
function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Se você tem Gascom, você tem pós-venda</p><h2>Qual operação a sua frente de trabalho precisa atender?</h2><p>Conte a aplicação, o volume e o chassi disponível. A equipe comercial indica o equipamento e a configuração adequados.</p></div>
  <div class="cta-bts"><a class="btn" href="${orc(v)}">${ic('mail')} Solicite seu orçamento</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca"><span class="logo-placa">${logo()}</span><p>Equipamentos para apoio logístico operacional: abastecimento, lubrificação, manutenção móvel, combate a incêndios, tratamento de solo e calda pronta.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></p></div>
  <div><h3>Produtos</h3><ul>${LINHAS.map(l => `<li><a href="${link(v, 'produtos')}#${l.id}">${l.t}</a></li>`).join('')}</ul></div>
  <div><h3>Gascom</h3><ul><li><a href="${link(v, 'empresa')}">História</a></li><li><a href="${link(v, 'empresa')}#localizacao">Localização</a></li><li><a href="${link(v, 'servicos-e-pecas')}">Assistência técnica</a></li><li><a href="${link(v, 'servicos-e-pecas')}#pecas">Peças e componentes</a></li><li><a href="${link(v, 'multimidia')}">Catálogos e vídeos</a></li><li><a href="${link(v, 'contato')}#trabalhe">Trabalhe conosco</a></li><li><a href="${link(v, 'contato')}#fornecedor">Seja nosso fornecedor</a></li></ul></div>
  <div><h3>Contato</h3><p>${E.end}<br>${E.cidade} · CEP ${E.cep}<br>${E.cx}</p><p><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Gascom Equipamentos Industriais Ltda. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}
const pagina = (v, slug, ativo, titulo, descricao, corpo) => cabeca({ E, v, slug, titulo, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#e41f2b' }) + topo(v, ativo) + corpo + rodape(v);
const cabecalhoPg = (v, trilha, titulo, texto) => `<section class="pg-topo"><div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Inicial</a>${trilha.map(([n, s]) => ` / ${s ? `<a href="${link(v, s)}">${esc(n)}</a>` : esc(n)}`).join('')}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div><span class="barras" aria-hidden="true">${'<i></i>'.repeat(7)}</span></section>`;

// ---------- blocos ----------
const fnLista = p => `<ul class="fns">${Object.entries(p.fn).map(([k, t]) => `<li class="fn-${t === 'B' ? 'b' : 'a'}">${ic(F[k][1])}<span>${F[k][0]}</span><em>${t === 'B' ? 'Básica' : 'Adicional'}</em></li>`).join('')}</ul>`;
const card = (v, p, i = 0, n = p.l) => `<li class="sobe" style="--i:${i % 6};--lc:${L(n).cor}"><a href="${link(v, `produtos/${p.s}`)}"><span class="pd-foto">${fig(p.s, `${p.nome} Gascom`)}</span><span class="pd-txt"><b>${p.nome}</b><small>${Object.entries(p.fn).filter(([, t]) => t === 'B').map(([k]) => F[k][0]).join(' · ')}</small></span></a></li>`;
const catalogo = v => LINHAS.map(l => `<section class="cat" id="${l.id}" style="--lc:${l.cor};--lt:${l.txt}"><div class="cat-tit sobe"><span class="cat-n">${l.n}</span><div><h2>${l.t}</h2><p>${l.d}</p></div></div><ul class="pds">${porLinha(l.n).map((p, i) => card(v, p, i, l.n)).join('')}</ul></section>`).join('');
const difs = `<ul class="difs">${DIFS.map((s, i) => `<li class="sobe" style="--i:${i}">${ic(s.i)}<div><b>${s.t}</b><span>${s.d}</span></div></li>`).join('')}</ul>`;
const setores = `<ul class="setores">${SETORES.map((s, i) => `<li class="sobe" style="--i:${i}">${fig(s.f, `Setor ${s.t.toLowerCase()}`)}<div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ul>`;
const linhaTempo = `<ol class="tempo">${HIST.map(([a, t], i) => `<li class="sobe" style="--i:${i}"><b>${a}</b><p>${t}</p></li>`).join('')}</ol>`;
const matriz = v => {
  const ks = Object.keys(F);
  return `<div class="mtz-rola"><table class="mtz"><thead><tr><th>Equipamento</th>${ks.map(k => `<th><span>${F[k][0]}</span></th>`).join('')}</tr></thead><tbody>${LINHAS.map(l => porLinha(l.n).filter(p => p.l === l.n).map((p, i) => `<tr style="--lc:${l.cor}"${i === 0 ? ' class="mtz-ini"' : ''}><td><a href="${link(v, `produtos/${p.s}`)}">${p.nome}</a></td>${ks.map(k => `<td>${p.fn[k] === 'B' ? '<i class="pt-b" title="Básica">Básica</i>' : p.fn[k] === 'A' ? '<i class="pt-a" title="Adicional">Adicional</i>' : ''}</td>`).join('')}</tr>`).join('')).join('')}</tbody></table></div><p class="mtz-leg"><span><i class="pt-b"></i> Função básica</span><span><i class="pt-a"></i> Função adicional (opcional)</span></p>`;
};
const campos = (extra = '') => `<div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail*<input name="email" type="email" required autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Cidade<input name="cidade" autocomplete="address-level2"></label><label>Estado<input name="estado" autocomplete="address-level1"></label></div>${extra}`;
const formOrc = `<form class="form" data-email="${E.email}" data-assunto="Solicitação de orçamento pelo site">
  ${campos(`<label>Equipamento<select name="equipamento" data-param="equipamento">${PROD.map(p => `<option>${p.nome}</option>`).join('')}<option>Peças e componentes</option><option>Assistência técnica</option><option>Outro assunto</option></select></label>`)}
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Aplicação, volume do tanque, chassi disponível e prazo."></textarea></label>
  <button class="btn" type="submit">${ic('mail')} Enviar solicitação</button>
  <p class="form-nota">A mensagem abre no seu e-mail, endereçada a ${E.email}.</p>
</form>`;
const formSimples = (assunto, extra, ph) => `<form class="form" data-email="${E.email}" data-assunto="${assunto}">
  ${campos(extra)}
  <label>Mensagem*<textarea name="mensagem" rows="4" required placeholder="${ph}"></textarea></label>
  <button class="btn" type="submit">${ic('mail')} Enviar</button>
</form>`;

function internas(v) {
  const P = {};
  P.produtos = pagina(v, 'produtos', 'produtos', 'Produtos · Gascom', 'Comboios de lubrificação e abastecimento, oficinas volantes, viaturas de combate a incêndios, tanques para tratamento de solo, lavação, água potável e calda pronta.',
    cabecalhoPg(v, [['Produtos']], 'Cinco linhas de equipamentos', `${PROD.length} equipamentos para apoio logístico operacional, montados sobre chassi de caminhão, nas versões veicular, embarcada ou rebocada.`) + `
<section class="sec cats-sec"><div class="in"><nav class="cat-nav" aria-label="Linhas">${LINHAS.map(l => `<a href="#${l.id}" style="--lc:${l.cor}"><i>${l.n}</i> ${l.t}</a>`).join('')}</nav>${catalogo(v)}
<p class="nota">A Gascom se reserva o direito de alterar as configurações técnicas ou o layout dos equipamentos sem aviso prévio.</p></div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Comparativo</p><h2>Funções de cada equipamento</h2><p>Funções básicas acompanham o equipamento; as adicionais são opcionais e configuradas no pedido.</p></div>${matriz(v)}</div></section>`);
  for (const p of PROD) {
    const l = L(p.l);
    const outros = porLinha(p.l).filter(o => o.s !== p.s);
    P[`produtos/${p.s}`] = pagina(v, `produtos/${p.s}`, 'produtos', `${p.nome} · Gascom`, `${p.nome}: ${p.intro}`.slice(0, 160),
      `<section class="pr-topo" style="--lc:${l.cor};--lt:${l.txt}"><div class="in pr-topo-in">
  <div class="pr-cab sobe"><p class="trilha"><a href="${link(v, 'index')}">Inicial</a> / <a href="${link(v, 'produtos')}">Produtos</a> / <a href="${link(v, 'produtos')}#${l.id}">${l.t}</a></p>
    <span class="pr-linha"><i>${l.n}</i> ${l.t}</span><h1>${p.nome}</h1>${p.desde ? `<p class="pr-desde">${p.desde}</p>` : ''}<p class="pr-resumo">${esc(p.intro)}</p>
    <div class="hero-bts"><a class="btn" href="${orc(v, p.nome)}">Solicite seu orçamento</a><a class="btn btn-linha" href="${PDF}${p.pdf}" target="_blank" rel="noopener">${ic('livro')} Catálogo em PDF</a></div></div>
  <figure class="pr-foto sobe"><span class="barras" aria-hidden="true">${'<i></i>'.repeat(7)}</span>${fig(p.s, `${p.nome} Gascom montado sobre caminhão`)}</figure>
</div></section>
<section class="sec pr-corpo"><div class="in pr-corpo-in">
  <div class="sobe"><h2>Por que o ${p.nome}</h2><ul class="pr-itens">${p.bs.map(x => `<li>${ic('check')} <span>${negrito(x)}</span></li>`).join('')}</ul>
  ${p.extra ? `<h2 class="h2-sep">Destaques do catálogo</h2><ul class="pr-itens">${p.extra.map(x => `<li>${ic('seta')} <span>${esc(x)}</span></li>`).join('')}</ul>` : ''}</div>
  <div class="sobe"><h2>Funções</h2>${fnLista(p)}<p class="nota">Configuração completa, componentes e opcionais no <a href="${PDF}${p.pdf}" target="_blank" rel="noopener">catálogo em PDF</a>.</p></div>
</div></section>
${outros.length ? `<section class="sec outros-sec"><div class="in"><div class="sec-tit sobe"><h2>Outros em ${l.t.toLowerCase()}</h2></div><ul class="pds pds-mini">${outros.map((o, i) => card(v, o, i, p.l)).join('')}</ul></div></section>` : ''}`);
  }
  P.empresa = pagina(v, 'empresa', 'empresa', 'Empresa · Gascom', 'A história da Gascom, de Sertãozinho (SP): da fábrica de carroças de Fausto Gaiofatto aos tanques do Proálcool e aos equipamentos para apoio logístico operacional.',
    cabecalhoPg(v, [['Empresa']], 'Tradição e inovação tecnológica', 'As origens da Gascom remontam ao início do século XX, em Sertãozinho (SP).') + `
<section class="sec"><div class="in emp-in">
  <div class="sobe emp-txt"><h2>História</h2>${HIST_TX.map(p => `<p>${p}</p>`).join('')}</div>
  <div class="sobe">${linhaTempo}</div>
</div></section>
<section class="sec setores-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Setores atendidos</p><h2>Do canavial à mineração</h2><p>Também infraestrutura rodoviária e concessões de serviços públicos.</p></div>${setores}</div></section>
<section class="sec" id="localizacao"><div class="in loc-in">
  <div class="sobe"><p class="sobre">Localização</p><h2>Sede em Sertãozinho (SP)</h2>
    <p class="loc-end"><b>Gascom Equipamentos Industriais Ltda.</b><br>${E.end}<br>${E.ref}<br>${E.cx} · CEP ${E.cep}<br>${E.cidade} · Brasil</p>
    <p>Telefone <a href="${telHref(E.fone)}">${E.fone}</a> · Fax ${E.fax}</p>
    <a class="btn btn-linha" href="https://www.google.com/maps/search/?api=1&query=Av.+Marginal+S%C3%A9rgio+Cancian,+5293,+Sert%C3%A3ozinho+SP" target="_blank" rel="noopener">${ic('pin')} Abrir no Google Maps</a></div>
  <iframe class="mapa sobe" src="${E.mapa}" title="Mapa da Gascom em Sertãozinho" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div></section>`);
  P['servicos-e-pecas'] = pagina(v, 'servicos-e-pecas', 'servicos-e-pecas', 'Serviços e Peças · Gascom', 'Assistência técnica Gascom e peças originais TBA a pronta entrega para os equipamentos Gascom.',
    cabecalhoPg(v, [['Serviços e Peças']], 'Se você tem Gascom, você tem pós-venda', 'Assistência técnica com técnicos treinados e peças originais a pronta entrega.') + `
<section class="sec"><div class="in sv-in">
  <article class="sv sobe">${ic('chave')}<h2>Assistência técnica</h2><p>Estamos preparados para fornecer rapidamente completa assistência técnica aos produtos fornecidos. Disponibilizamos técnicos treinados para oferecer sugestões inteligentes, visando potencializar o desempenho de equipamentos já existentes.</p><p>Consulte nossa equipe: estamos sempre prontos para atender.</p><a class="btn" href="${orc(v, 'Assistência técnica')}">Solicitar assistência</a> <a class="link-seta" href="${telHref(E.fone)}">${E.fone} ${ic('seta')}</a></article>
  <article class="sv sobe" id="pecas">${ic('pacote')}<h2>Peças e componentes</h2><p>Disponibilizamos através da TBA peças originais a pronta entrega, utilizadas em nossos equipamentos. São peças genuínas, produzidas na própria TBA sob nossa supervisão e confeccionadas com a melhor tecnologia existente no mercado.</p><p class="tba"><b>TBA</b><br>${E.tba.end}<br>Tel. <a href="${telHref(E.tba.fone)}">${E.tba.fone}</a></p><a class="btn" href="${E.tba.site}" target="_blank" rel="noopener">${ic('ext')} www.tbatec.com.br</a> <a class="link-seta" href="https://www.gascom.com.br/img/produtos/folder-tba-200513.pdf" target="_blank" rel="noopener">Folder da TBA (PDF) ${ic('seta')}</a></article>
</div></section>
<section class="sec difs-sec"><div class="in">${difs}</div></section>`);
  P.multimidia = pagina(v, 'multimidia', 'multimidia', 'Multimídia · Gascom', 'Catálogos em PDF dos equipamentos Gascom, vídeos e redes sociais.',
    cabecalhoPg(v, [['Multimídia']], 'Catálogos e vídeos', 'Baixe o catálogo de cada equipamento e acompanhe a Gascom nas redes.') + `
<section class="sec"><div class="in">
  ${LINHAS.map(l => `<div class="cats-pdf sobe" style="--lc:${l.cor}"><h2><i>${l.n}</i> ${l.t}</h2><ul>${porLinha(l.n).filter(p => p.l === l.n).map(p => `<li><a href="${PDF}${p.pdf}" target="_blank" rel="noopener">${fig(p.s, p.nome)}<span><b>${p.nome}</b><small>${ic('livro')} Catálogo em PDF</small></span></a></li>`).join('')}</ul></div>`).join('')}
</div></section>
<section class="sec redes-sec"><div class="in redes-in">
  <a class="rede sobe" href="${E.yt}" target="_blank" rel="noopener">${ic('yt')}<b>YouTube</b><span>Vídeos de produto e vídeos técnicos dos equipamentos</span></a>
  <a class="rede sobe" href="${E.insta}" target="_blank" rel="noopener">${ic('insta')}<b>Instagram</b><span>@gascom_implementadora</span></a>
  <a class="rede sobe" href="${E.face}" target="_blank" rel="noopener">${ic('face')}<b>Facebook</b><span>/gascomonline</span></a>
</div></section>`);
  P.contato = pagina(v, 'contato', 'contato', 'Contato · Gascom', `Fale com a Gascom: ${E.fone}, ${E.email}. ${E.end}, ${E.cidade}.`,
    cabecalhoPg(v, [['Contato']], 'Contato', 'Fale conosco, solicite seu orçamento, envie seu currículo ou cadastre sua empresa como fornecedora.') + `
<section class="sec"><div class="in cont-in">
  <div class="sobe" id="orcamento"><nav class="cont-nav" aria-label="Assuntos"><a href="#orcamento">Solicite seu orçamento</a><a href="#trabalhe">Trabalhe conosco</a><a href="#fornecedor">Seja nosso fornecedor</a></nav><h2>Fale conosco e orçamentos</h2>${formOrc}</div>
  <aside class="cont-info sobe"><ul>
    <li>${ic('tel')}<div><b>Telefone</b><a href="${telHref(E.fone)}">${E.fone}</a><br><span>Fax ${E.fax}</span></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.cidade} · CEP ${E.cep}<br>${E.cx}</span></div></li>
    <li>${ic('pacote')}<div><b>Peças (TBA)</b><a href="${telHref(E.tba.fone)}">${E.tba.fone}</a></div></li>
  </ul></aside>
</div></section>
<section class="sec cont-mais"><div class="in cont-mais-in">
  <div class="sobe" id="trabalhe"><h2>Trabalhe conosco</h2><p>Envie seus dados e a área de interesse. Anexe o currículo na mensagem de e-mail que será aberta.</p>${formSimples('Trabalhe conosco: currículo pelo site', '<label>Área de interesse<input name="area"></label>', 'Formação, experiência e área de interesse.')}</div>
  <div class="sobe" id="fornecedor"><h2>Seja nosso fornecedor</h2><p>Cadastre sua empresa. Anexe a apresentação (até 5 MB) na mensagem de e-mail que será aberta.</p>${formSimples('Cadastro de fornecedor pelo site', '<div class="form-duas"><label>CNPJ<input name="cnpj"></label><label>Inscrição estadual<input name="ie"></label></div>', 'Produtos ou serviços fornecidos.')}</div>
</div></section>
<section class="mapa-sec"><iframe src="${E.mapa}" title="Mapa da Gascom em Sertãozinho" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>
<script>(()=>{const q=new URLSearchParams(location.search).get('equipamento');const s=document.querySelector('[data-param=equipamento]');if(q&&s)s.value=q})()</script>`);
  return P;
}

const T_HOME = 'Gascom · Comboios, oficinas volantes e tanques para frentes de trabalho';
const D_HOME = 'Gascom, Sertãozinho/SP: comboios de lubrificação e abastecimento, oficinas volantes, viaturas de combate a incêndios, tanques para tratamento de solo, água e calda pronta.';

// ---------- A "Frota": clara, barras crescentes da marca e as cinco linhas coloridas ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Apoio logístico operacional · Sertãozinho – SP</p>
    <h1>Equipamentos que levam o apoio até a frente de trabalho</h1>
    <p class="lead">Comboios de lubrificação e abastecimento, oficinas volantes, viaturas de combate a incêndios e tanques para tratamento de solo, água e calda pronta, montados sobre caminhão.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Conheça os produtos ${ic('seta')}</a><a class="btn btn-linha" href="${orc(v)}">Solicite seu orçamento</a></div>
  </div>
  <figure class="hero-foto"><span class="barras" aria-hidden="true">${'<i></i>'.repeat(7)}</span>${fig('pressolub', 'Comboio de lubrificação Pressolub da Gascom')}<figcaption><b>Pressolub</b>Conceito inovador, desde 1998</figcaption></figure>
</div></section>
<section class="linhas-sec"><div class="in"><ul class="linhas">${LINHAS.map((l, i) => `<li class="sobe" style="--i:${i};--lc:${l.cor};--lt:${l.txt}"><a href="${link(v, 'produtos')}#${l.id}"><span class="ln-n">${l.n}</span><h2>${l.t}</h2>${fig(l.foto, l.t)}<span class="ln-pr">${porLinha(l.n).map(p => p.nome).join(' · ')}</span></a></li>`).join('')}</ul></div></section>
<section class="sec"><div class="in">${difs}</div></section>
<section class="sec destaque"><div class="in dest-in">
  <div class="sobe"><p class="sobre">Caixa-bomba: o coração do equipamento</p><h2>Bomba acionada pelo câmbio do veículo</h2><p>Nos equipamentos de água e calda, a bomba tem transmissão direta e engrenada, acionada pela tomada de força (PTO/TDF) por cardan automotivo balanceado em aço forjado, sem correias, correntes, motores auxiliares ou sistemas hidráulicos.</p><p>No Prosolo, o dispositivo Engate Fácil Automático permite trocar de marcha em qualquer condição de terreno sem interromper a aspersão.</p><a class="btn" href="${link(v, 'produtos/prosolo')}">Ver o Prosolo ${ic('seta')}</a></div>
  <ul class="dest-num sobe"><li><b>2.000<small>L/min</small></b><span>Bomba de calda do Procalda</span></li><li><b>12</b><span>Regulagens de cobertura no Prosolo</span></li><li><b>50<small>m</small></b><span>Elevação de água potável do Proágua</span></li><li><b>3x</b><span>Vazão média do Pressolub</span></li></ul>
</div></section>
<section class="sec setores-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Setores atendidos</p><h2>Equipando as frotas das principais empresas do país</h2><p>Canavieiro, agrícola, florestal, mineração, infraestrutura e concessões de serviços públicos.</p></div>${setores}</div></section>
<section class="sec hist-home"><div class="in hist-in">
  <div class="sobe"><p class="sobre">Desde o início do século XX</p><h2>Da fábrica de carroças aos tanques do Proálcool</h2><p>${HIST[0][1]} Em 1977, com o Proálcool, vieram os tanques para vinhaça, combustível e pipas. Hoje a Gascom é líder em equipamentos para apoio logístico operacional.</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a história ${ic('seta')}</a></div>
  <ol class="tempo tempo-curto sobe">${HIST.filter((_, i) => [0, 2, 3, 5].includes(i)).map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</div></section>`;
  return { index: pagina(v, 'index', 'index', T_HOME, D_HOME, home), ...internas(v) };
}

// ---------- B "Comboio": escura, a frota das cinco linhas e o quadro de funções ----------
function versaoB() {
  const v = 'b';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Gascom · Confiável</p>
    <h1>A oficina, o combustível e a água vão até a máquina</h1>
    <p class="lead">Equipamentos para frentes de trabalho mecanizadas e distantes da base: lubrificação, abastecimento, manutenção móvel, combate a incêndios, tratamento de solo e calda pronta.</p>
    <div class="hero-bts"><a class="btn" href="${orc(v)}">Solicite seu orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver as 5 linhas</a></div>
  </div>
</div>
<div class="frota" aria-label="Uma caminhão de cada linha">${LINHAS.map((l, i) => `<a href="${link(v, 'produtos')}#${l.id}" style="--i:${i};--lc:${l.cor}">${fig(l.foto, l.t)}<span><i>${l.n}</i>${l.t}</span></a>`).join('')}</div>
<div class="estrada" aria-hidden="true"></div></section>
<section class="sec mtz-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Qual equipamento faz o quê</p><h2>${PROD.length} equipamentos, 12 funções</h2><p>Funções básicas acompanham o equipamento; as adicionais são configuradas no pedido. Clique no nome para ver o equipamento.</p></div>${matriz(v)}</div></section>
<section class="sec linhas-b"><div class="in">${catalogo(v)}</div></section>
<section class="sec difs-sec"><div class="in">${difs}</div></section>
<section class="sec setores-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Setores atendidos</p><h2>Onde os equipamentos Gascom trabalham</h2></div>${setores}</div></section>
<section class="sec hist-b"><div class="in"><div class="sec-tit sobe"><p class="sobre">História</p><h2>Gaiofatto + Cortês = Gascom</h2><p>Uma empresa familiar de Sertãozinho que acompanhou a mecanização do campo.</p></div>${linhaTempo}<p class="centro"><a class="btn btn-linha" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></p></div></section>`;
  return { index: pagina(v, 'index', 'index', T_HOME, D_HOME, home), ...internas(v) };
}

import fs from 'node:fs';
copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
const A = versaoA(), B = versaoB();
escreverVersao(pub, 'a', A);
escreverVersao(pub, 'b', B);
await escolha(pub, {
  nome: 'Gascom', artigo: 'da', url: E.url, lang: 'pt', cor: '#e41f2b', fundo: '#1c1c1e', claro: '#f2f2f0',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Frota', paginas: Object.keys(A).length, texto: 'Clara, com as barras crescentes da marca, as cinco linhas nas cores do catálogo, a caixa-bomba em destaque e os setores atendidos.', pontos: [`${PROD.length} equipamentos com página própria`, 'Catálogos em PDF em cada produto', 'Logo redesenhado em vetor'] },
    { letra: 'b', nome: 'Comboio', paginas: Object.keys(B).length, texto: 'Escura, com um caminhão de cada linha na estrada, o quadro de funções de todos os equipamentos e a história em linha do tempo.', pontos: ['Mesmos textos do site e dos catálogos', 'Orçamento, currículo e fornecedor por e-mail', 'Assistência técnica e peças TBA'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
