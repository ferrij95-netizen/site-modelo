// Agrotecsilos (Rolândia/PR): silos, secadores, máquinas de limpeza e transportadores de grãos; fabricação, montagem, projetos e assistência.
// node clientes/agrotecsilos/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs agrotecsilos https://www.agrotecsilos.com.br/)
// Textos do site atual (WordPress, com spam de apostas injetado) e do catálogo em PDF (dez/2022), de onde vêm as tabelas técnicas.
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');

const E = {
  nome: 'Agrotecsilos', url: 'https://agrotecsilos.overtus.com.br/', antigo: 'https://www.agrotecsilos.com.br/',
  fone: '(43) 3029-9467', wa: '5543998059411', waTxt: '(43) 99805-9411', projetos: '(43) 99188-1690', adm: '(43) 99873-9239',
  email: 'comercial@agrotecsilos.com.br',
  fab: 'Av. José Antonio Santis, 120 – Parque Industrial', fabCidade: 'Rolândia – PR',
  esc: 'Rua Deputado Fernando Ferrari, 953, Sala 02 – Campo Belo', escCidade: 'Londrina – PR',
  catalogo: 'https://www.agrotecsilos.com.br/wp-content/uploads/2022/12/catalogo-agrotec.pdf',
  insta: 'https://www.instagram.com/agrotecsilos', face: 'https://pt-br.facebook.com/agrotecsilos',
  mapa: 'https://www.google.com/maps?q=Av.+Jos%C3%A9+Antonio+Santis,+120,+Rol%C3%A2ndia+-+PR&output=embed',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';
const msgWa = o => `Olá! Vim pelo site da Agrotecsilos e gostaria de ${o}.`;

const CATS = [
  { id: 'armazenagem', nome: 'Armazenagem', i: 'casa', foto: 'silos-guindaste.webp',
    lead: 'Projetamos e fabricamos silos armazenadores, silos elevados e silos de expedição, todos com estruturas reforçadas e materiais certificados de alta resistência para a melhor conservação dos grãos.',
    extra: 'Os silos graneleiros podem estar situados nas fazendas, nos portos, em empresas cerealistas, geralmente em locais de fácil acesso junto a cidades, rodovias, ferrovias ou hidrovias.' },
  { id: 'limpeza', nome: 'Limpeza', i: 'floco', foto: 'p-maquinas-de-limpeza-1.webp',
    lead: 'Máquinas de limpeza e pré-limpeza de corpo oscilante, ciclofiltros e ciclones para um resultado eficaz, com alta qualidade e baixo custo na limpeza dos cereais.', extra: '' },
  { id: 'secagem', nome: 'Secagem', i: 'chama', foto: 'secador-torre.webp',
    lead: 'Secadores de dutos colunados e fornalhas com ótima relação custo-benefício: rendimento na secagem, facilidade de operação e baixo consumo energético.', extra: '' },
  { id: 'transporte', nome: 'Transporte', i: 'seta', foto: 'p-transportador-de-correias-1.webp',
    lead: 'Elevadores de canecas, correias transportadoras, roscas helicoidais, redlers e acessórios de interligação para movimentar os grãos com segurança e baixo custo operacional.', extra: '' },
];

const nota075 = '* Valores de capacidade para transporte horizontal de cereais com peso específico de 0,75 t/m³. Inclinação máxima de 25°.';
const PROD = [
  { slug: 'silos-armazenadores', cat: 'armazenagem', nome: 'Silos metálicos armazenadores e pulmão secadores', curto: 'Silos armazenadores', fotos: 3,
    lead: 'Silos armazenadores construídos em aço galvanizado ZAR 345 de alta resistência, em diversos diâmetros, com capacidades variáveis conforme a necessidade do armazém.',
    itens: ['Chapas em aço galvanizado ZAR 345', 'Montantes de reforço instalados na parte externa, em aço ASTM, evitando o acúmulo de resíduos', 'Anéis de contraventamento no corpo do silo em tubos galvanizados', 'Parafusos e porcas bicromatizados', 'Sistema de aeração com ventilador centrífugo de alta eficiência', 'Piso com chapas galvanizadas', 'Rosca varredora para descarregar o talude restante após a descarga por gravidade'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/silos-metalicosa-armazenadores-01.pdf' },
  { slug: 'silos-elevados', cat: 'armazenagem', nome: 'Silos elevados de fundo cônico', curto: 'Silos elevados', fotos: 1, extraFotos: ['silos-elevados-obra.webp'],
    lead: 'Silos metálicos armazenadores elevados, com fundo cônico de 45° ou 65° e estrutura metálica ou em concreto, para descarga total por gravidade e expedição.',
    itens: ['Fundo cônico de 45° ou 65°', 'Estrutura de sustentação metálica ou em concreto', 'Chapas em aço galvanizado', 'Parafusos e porcas bicromatizados', 'Colunas de reforço externo em aço ASTM'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/silos-metalicos-armazenadores-02.pdf' },
  { slug: 'tulha-metalica', cat: 'armazenagem', nome: 'Tulha metálica graneleira', curto: 'Tulha metálica', fotos: 3,
    lead: 'Projetamos tulhas metálicas conforme a necessidade da capacidade de expedição. Tulhas de pequeno, médio e grande porte.',
    itens: ['Praticidade no carregamento e na expedição dos grãos para os caminhões', 'Dimensionadas para resistir a ventos de até 120 km/h', 'Parafusos bicromatizados de alta resistência, com vedação especial contra intempéries', 'Superfície externa do corpo em chapas galvanizadas e estrutura dos funis em aço pintado'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/tulha-metalica-10.pdf' },
  { slug: 'fabrica-de-racao', cat: 'armazenagem', nome: 'Fábrica de ração', curto: 'Fábrica de ração', fotos: 4, extraFotos: ['fabrica-racao-catalogo.webp'],
    lead: 'Projetamos sua fábrica de ração conforme a necessidade de consumo. Fábricas de pequeno, médio e grande porte, de 500 kg a 6.000 kg por hora.',
    itens: ['Projeto conforme o consumo da propriedade', 'Capacidade de 500 a 6.000 kg/hora', 'Silos, roscas, misturador e ensaque integrados'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/fabrica-de-racao-11.pdf' },
  { slug: 'ventilador-centrifugo', cat: 'armazenagem', nome: 'Ventilador centrífugo', curto: 'Ventilador centrífugo', fotos: 1,
    lead: 'Ventiladores centrífugos para aeração de silos. O desviador de fluxo modifica o fluxo de ar dos silos, tirando a pressão de ventilação para o exaustor.',
    itens: ['Aeração de silos armazenadores', 'Motores de 5 a 40 cv', 'Vazão de 150 a 1.000 m³/min'],
    tabela: { t: 'Dados técnicos', cab: ['Modelo', 'Motor (cv)', 'Diâmetro (mm)', 'Pressão estática (mmca)', 'Vazão (m³/min)', 'RPM'],
      linhas: [['VC150', '5,0', '520', '50', '150', '1750'], ['VC150', '7,5', '550', '70', '230', '1750'], ['VC300', '10,0', '650', '90', '320', '1750'], ['VC300', '12,5', '650', '120', '400', '1750'], ['VC500', '15,0', '700', '140', '500', '1750'], ['VC500', '20,0', '700', '160', '600', '1750'], ['VC700', '25,0', '730', '180', '700', '1750'], ['VC750', '30,0', '760', '200', '800', '1750'], ['VC800', '40,0', '850', '250', '1000', '1750']] },
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/ventilador-centrifugo.-13.pdf' },
  { slug: 'maquinas-de-limpeza', cat: 'limpeza', nome: 'Máquinas de limpeza e pré-limpeza', curto: 'Máquinas de limpeza', fotos: 4,
    lead: 'Máquinas de limpeza de grãos com corpo oscilante, totalmente em aço e dimensionadas para operação em regime contínuo, com grande área de peneiramento para uma execução perfeita do processo.',
    itens: ['Escadas e plataformas de acesso operacional', 'Peneiras com facilidade e agilidade no manuseio', 'Acionamento por volante com fácil acesso para manutenção', 'Limpeza das peneiras por esferas de borracha', 'Estrutura em chapa preta de 3/16" (4,75 mm) e 1/4" (6,35 mm)', 'Pintura de fundo antioxidante e acabamento em esmalte sintético'],
    sub: { t: 'Acompanha cada unidade', itens: ['Peneiras acionadas por movimento oscilante com motor de 2 cv', 'Bica de ensaque de impureza', 'Exaustor centrífugo de 1740 rpm com motor de 7,5 cv', 'Aspiração na entrada do produto', 'Ciclone com estrutura metálica e 6 m de tubo de ligação', '1 jogo de peneiras com furação conforme especificação do cliente'] },
    tabela: { t: 'Dados técnicos – pré-limpeza', cab: ['Capacidade (t/h)', 'Motor (cv)', 'Exaustor (cv)', 'Peneiras', 'Largura c/ passarela (mm)', 'Comprimento c/ passarela (mm)', 'Altura (mm)', 'Área de peneira (m²)'],
      linhas: [['60', '2', '7,5', '4', '3805', '3340', '4800', '13'], ['80', '2', '7,5', '6', '3805', '3340', '5195', '20'], ['120', '2 × 2', '7,5', '8', '3790', '3910', '6265', '26'], ['160', '2 × 2', '7,5', '12', '3790', '3910', '6985', '40'], ['180', '3 × 2', '7,5', '12', '3790', '3910', '7715', '39'], ['240', '3 × 2', '7,5', '18', '3790', '3910', '8775', '60']], nota: 'Umidade de entrada de 18% e impureza de entrada de 8%.' },
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/maquinas-de-limpeza-09.pdf' },
  { slug: 'ciclofiltros', cat: 'limpeza', nome: 'Ciclofiltros e ciclones', curto: 'Ciclofiltros', fotos: 2,
    lead: 'O ciclofiltro coleta particulados em indústrias e unidades de armazenamento de grãos e pode ser fabricado em várias dimensões, atendendo a diversas aplicações industriais.',
    itens: ['Design robusto, consumo mínimo de energia e longa vida útil do cartucho do filtro', 'O ar entra tangencialmente pela parte superior do ciclone e o pó segue para a parte inferior, descarregado por válvula dupla basculante', 'Ciclone: separa partículas sólidas suspensas no ar sem filtro, usando um vórtice'] },
  { slug: 'secadores', cat: 'secagem', nome: 'Secadores de dutos colunados', curto: 'Secadores', fotos: 4, extraFotos: ['secador-torre.webp'],
    lead: 'Secadores de dutos colunados com maior rendimento na secagem de milho por serem de alta pressão e vazão, com fácil operação e possibilidade de ampliação por serem totalmente modulares.',
    itens: ['Chapas de fechamento galvanizadas', 'Torre de secagem com sistema autolimpante', 'Escadas com guarda-corpo e plataforma de inspeção para manutenção externa e interna', 'Controle de nível mínimo e máximo de cereal', 'Secador modular: capacidade de secagem conforme a sua necessidade', 'Fornalha metálica com ciclones mistos e baixo consumo de lenha'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/secadores-de-dutos-colunados-03.pdf' },
  { slug: 'fornalhas', cat: 'secagem', nome: 'Fornalhas metálicas e de alvenaria', curto: 'Fornalhas', fotos: 4,
    lead: 'Fornalhas com alimentador de lenha que podem ser conectadas à automação do secador e auxiliam na operação do sistema.',
    itens: ['Revestimento em chapas metálicas galvanizadas e alvenaria em tijolos maciços', 'Revestimento interno em tijolos refratários, com portas e grelhas em ferro fundido', 'Amplo cinzeiro que melhora a queima da lenha, tornando-a mais eficiente e econômica'],
    tabela: { t: 'Dados técnicos', cab: ['Modelo', 'Secador', 'Valor calorífico (kcal/h)', 'Área de grelha (m²)', 'Consumo de lenha (m/h)'],
      linhas: [['ATS-II com SCATS-I', 'até 20 t/h', '1.094.000', '1,23', '0,82'], ['ATS-III com SCATS-I', 'até 30 t/h', '1.641.000', '1,73', '1,22'], ['ATS-IV com SCATS-II', 'até 40 t/h', '2.188.000', '2,90', '1,63'], ['ATS-V com SCATS-II', 'até 60 t/h', '3.282.000', '3,42', '2,45'], ['ATS-VI com SCATS-III', 'até 80 t/h', '4.376.000', '5,16', '3,27'], ['ATS-VII com SCATS-III', 'até 100 t/h', '5.470.000', '6,00', '4,10'], ['ATS-VIII com SCATS-III', 'até 120 t/h', '6.564.000', '7,20', '4,90'], ['ATS-IX com SCATS-IV', 'até 150 t/h', '8.205.000', '8,48', '6,15']],
      nota: 'Dados ilustrativos; o fabricante pode alterá-los sem aviso prévio em função da evolução dos equipamentos.' },
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/fornalhas-metalicas-alvenaria-04.pdf' },
  { slug: 'elevadores', cat: 'transporte', nome: 'Elevadores de cereais com canecas plásticas', curto: 'Elevadores de canecas', fotos: 4,
    lead: 'Elevadores para transporte vertical de grãos e derivados, por correia plana com canecas tipo sementeira, convencional ou vazada, com estrutura autoportante galvanizada na altura necessária.',
    itens: ['Totalmente metálicos, com corpo em aço galvanizado, flanges e cantoneiras com pintura de alta resistência', 'Cabeçotes reforçados com aço 1045, montados sobre rolamentos autocompensadores', 'Freios automáticos contra retorno de canecas', 'Janelas de inspeção com fácil acesso operacional', 'Acionamento por polias, correias ou motorredutores', 'Respiro para evitar a formação de gases (opcional)', 'Escada com guarda-corpo e plataformas de manutenção e de descanso'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/elevadores-de-cereais-canecas-plastica-08.pdf' },
  { slug: 'transportador-de-correias', cat: 'transporte', nome: 'Transportador de correias', curto: 'Correias transportadoras', fotos: 3,
    lead: 'Projetado para transportar grãos de forma suave e contínua, na horizontal ou inclinado até 8°, em sentido único ou reversível.',
    itens: ['Baixo custo operacional e de manutenção', 'Estrutura robusta e modular, com acabamento pintado e em aço galvanizado', 'Roletes com rolamentos blindados', 'Carga e descarga em qualquer ponto do equipamento, com dispositivos apropriados', 'Acionamento por polias, correias ou motorredutores', 'Tambores abaulados e roletes-guia para evitar desalinhamento da correia'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/transportador-de-correias-05.pdf' },
  { slug: 'rosca-transportadora', cat: 'transporte', nome: 'Rosca transportadora helicoidal', curto: 'Rosca helicoidal', fotos: 3,
    lead: 'Transporte horizontal de grãos na carga e descarga de silos, secadores, armazéns, moegas e máquinas de pré-limpeza. Construída em módulos de chapa galvanizada, com helicoide dentro de calha em "U" e acionamento por motorredutor.',
    itens: ['Helicoides com mancais intermediários e rolamentos autocompensadores', 'Longa vida útil', 'Baixo índice de manutenção', 'Adequação conforme a necessidade de cada operação'],
    tabela: { t: 'Rosca transportadora de calha', cab: ['Modelo', 'Capacidade* (t/h)', 'Diâmetro (mm)'], linhas: [['RT ATS-10', '10', '200'], ['RT ATS-20', '20', '200'], ['RT ATS-30', '30', '250'], ['RT ATS-40', '40', '300'], ['RT ATS-60', '60', '300'], ['RT ATS-80', '80', '350'], ['RT ATS-90', '90', '400'], ['RT ATS-120', '120', '400'], ['RT ATS-130', '130', '450'], ['RT ATS-170', '170', '450']], nota: nota075 },
    tabela2: { t: 'Rosca varredora para silos', cab: ['Modelo', 'Capacidade* (t/h)', 'Diâmetro (mm)'], linhas: [['RV ATS-20', '20', '150'], ['RV ATS-40', '40', '150'], ['RV ATS-60', '60', '150'], ['RV ATS-80', '80', '200'], ['RV ATS-100', '100', '200'], ['RV ATS-120', '120', '250']], nota: nota075 },
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/rosca-transportadorahelicoidal-07.pdf' },
  { slug: 'redler', cat: 'transporte', nome: 'Transportador de correntes (redler)', curto: 'Redler', fotos: 2,
    lead: 'Transporte horizontal de grãos na carga e descarga de silos, secadores, moegas, máquinas de pré-limpeza e armazéns em geral.',
    itens: ['Construído em partes modulares, com chapas galvanizadas', 'Correntes entrelaçadas com buchas e pinos resistentes ao desgaste'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/transportador-de-correntes-redler-06.pdf' },
  { slug: 'rosca-chupim', cat: 'transporte', nome: 'Rosca chupim (transportador tubular helicoidal)', curto: 'Rosca chupim', fotos: 1,
    lead: 'Transporte horizontal ou vertical de grãos, usado na carga e descarga de silos, caminhões em transbordo, moegas e fábricas de ração.',
    itens: ['Construída em uma peça, com chapas galvanizadas', 'Helicoide de rosca sem fim dentro de tubo', 'Acionamento por motorredutor'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/rosca-chupim-12.pdf' },
  { slug: 'acessorios-de-interligacao', cat: 'transporte', nome: 'Acessórios de interligação e desvio de fluxo', curto: 'Acessórios de interligação', fotos: 4,
    lead: 'Peças, acessórios e válvulas de direção do fluxo são essenciais em qualquer instalação de movimentação de grãos: são elas que direcionam os grãos para o local determinado na operação.',
    itens: ['Baixo custo operacional e de manutenção', 'Estrutura robusta, com acabamento pintado e em aço galvanizado', 'Peças feitas sob medida', 'Aço galvanizado ou pintura reforçada'],
    pdf: 'https://www.agrotecsilos.com.br/wp-content/uploads/2018/10/acessorios-de-interligacoes-14.pdf' },
];
const porCat = id => PROD.filter(p => p.cat === id);
const catDe = p => CATS.find(c => c.id === p.cat);
const fotosDe = p => [...Array.from({ length: p.fotos }, (_, i) => `p-${p.slug}-${i + 1}.webp`), ...(p.extraFotos || [])];

const SERV = [
  { t: 'Projetos de execução', d: 'Projeto completo da unidade de armazenagem, secagem e beneficiamento.', foto: 'projeto-3d.webp', i: 'livro' },
  { t: 'Montagem', d: 'Equipe própria de montagem de silos, secadores e transportadores.', foto: 'montagem.webp', i: 'chave' },
  { t: 'Assistência técnica', d: 'Atendimento na unidade, inclusive para equipamentos de outras marcas.', foto: 'assistencia-1.webp', i: 'engrenagem' },
  { t: 'Assessoria de obras e projetos', d: 'Acompanhamento técnico do projeto à entrega da obra.', foto: 'equipe-projeto.webp', i: 'usuarios' },
  { t: 'Construção civil', d: 'Bases, moegas e estruturas em concreto para a unidade.', foto: 'obra-civil.webp', i: 'fabrica' },
  { t: 'Reformas e ampliações', d: 'Peças para reforma e ampliação de silos, secadores e equipamentos.', foto: 'montagem-secador.webp', i: 'escudo' },
];
const SOBRE = [
  'A Agrotecsilos atua no ramo agrícola com foco na linha de equipamentos para <b>armazenagem, secagem, limpeza e transporte de grãos</b>. Trabalhamos com a fabricação, comercialização, montagem, projetos e assistência técnica de toda a linha para armazenagem pós-colheita.',
  'Fabricamos peças para reforma e ampliação de silos, secadores e equipamentos agrícolas. Temos também todas as peças de reposição, <b>mesmo que o seu equipamento seja de outras marcas</b>.',
  'Trabalhamos com compromisso, eficiência e agilidade, e fabricamos as peças de acordo com a necessidade de cada cliente. Enviamos para todo o Brasil e países da América do Sul.',
];
const OBRAS = [
  { f: 'obra-torre.webp', t: 'Unidade com secador e silos' }, { f: 'silos-guindaste.webp', t: 'Montagem de silos' }, { f: 'silos-elevados-obra.webp', t: 'Silos elevados' },
  { f: 'obra-armazem.webp', t: 'Armazém graneleiro' }, { f: 'montagem-secador.webp', t: 'Montagem de secador' }, { f: 'silos-obra.webp', t: 'Silos armazenadores' },
];

const NAV = [
  { slug: 'index', nome: 'Inicial' }, { slug: 'sobre-nos', nome: 'Sobre nós' }, { slug: 'produtos', nome: 'Produtos' },
  ...CATS.map(c => ({ slug: c.id, nome: c.nome })), { slug: 'servicos', nome: 'Serviços' }, { slug: 'contato', nome: 'Fale conosco' },
];
const titulos = { index: 'Agrotecsilos · Silos, secadores e equipamentos para armazenagem de grãos', 'sobre-nos': 'Sobre nós · Agrotecsilos', produtos: 'Produtos · Agrotecsilos', servicos: 'Serviços · Agrotecsilos', contato: 'Fale conosco · Agrotecsilos' };
const desc = {
  index: 'Agrotecsilos, Rolândia/PR: fabricação, montagem, projetos e assistência técnica de silos, secadores, máquinas de limpeza e transportadores de grãos.',
  'sobre-nos': 'Fabricação, comercialização, montagem, projetos e assistência técnica de toda a linha para armazenagem pós-colheita. Peças de reposição para todas as marcas.',
  produtos: 'Silos armazenadores e elevados, tulhas, fábrica de ração, ventiladores, máquinas de limpeza, ciclofiltros, secadores, fornalhas, elevadores, correias, roscas e redler.',
  servicos: 'Projetos de execução, montagem, assistência técnica, assessoria de obras, construção civil, reformas e ampliações de unidades armazenadoras.',
  contato: 'Fale com a Agrotecsilos: (43) 3029-9467, WhatsApp (43) 99805-9411, comercial@agrotecsilos.com.br. Rolândia e Londrina – PR.',
};
for (const c of CATS) { titulos[c.id] = `${c.nome} de grãos · Agrotecsilos`; desc[c.id] = c.lead.slice(0, 280); }
for (const p of PROD) { titulos[`produtos/${p.slug}`] = `${p.nome} · Agrotecsilos`; desc[`produtos/${p.slug}`] = p.lead.slice(0, 280); }

const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const logo = (b = false) => `<img class="logo" src="${IMG}${b ? 'logo-branco' : 'logo'}.svg" alt="Agrotecsilos" width="2277" height="422">`;
const btnWa = (txt, o, cls = 'btn') => `<a class="${cls} btn-wa" href="${waHref(E.wa, msgWa(o))}" target="_blank" rel="noopener">${icWa()} ${txt}</a>`;

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('pin')} Fábrica em Rolândia · escritório em Londrina – PR</span>
    <span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${icWa()} ${E.waTxt}</a><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo()}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV.slice(1), ativo)}</ul></nav>
    ${btnWa('Orçamento', 'um orçamento', 'btn topo-cta')}
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Consulte-nos</p><h2>Solicite um orçamento para a sua unidade</h2><p>Silos, secadores, transportadores ou peças de reposição, inclusive para equipamentos de outras marcas.</p></div>
  <div class="cta-bts">${btnWa('Falar no WhatsApp', 'um orçamento')}<a class="btn btn-linha" href="${E.catalogo}" target="_blank" rel="noopener">${ic('livro')} Catálogo (PDF)</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p>Fabricação, montagem, projetos e assistência técnica para armazenagem pós-colheita. Enviamos para todo o Brasil e países da América do Sul.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
  <div><h3>Produtos</h3><ul>${CATS.map(c => `<li><a href="${link(v, c.id)}">${c.nome}</a></li>`).join('')}<li><a href="${link(v, 'produtos')}">Todos os produtos</a></li></ul></div>
  <div><h3>Empresa</h3><ul><li><a href="${link(v, 'sobre-nos')}">Sobre nós</a></li><li><a href="${link(v, 'servicos')}">Serviços</a></li><li><a href="${link(v, 'contato')}">Fale conosco</a></li><li><a href="${E.catalogo}" target="_blank" rel="noopener">Catálogo (PDF)</a></li></ul></div>
  <div><h3>Contato</h3><p><b>Fábrica:</b> ${E.fab}, ${E.fabCidade}</p><p><b>Escritório:</b> ${E.esc}, ${E.escCidade}</p><p><a href="${telHref(E.fone)}">${E.fone}</a> · <a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Agrotecsilos. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
<a class="wa-flutua" href="${waHref(E.wa, msgWa('um orçamento'))}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#007d05' }) + topo(v, slug.startsWith('produtos/') ? PROD.find(p => `produtos/${p.slug}` === slug).cat : slug) + corpo + rodape(v);
const cabecalhoPg = (v, trilha, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a>${trilha.map(([n, s]) => s ? ` / <a href="${link(v, s)}">${n}</a>` : ` / ${esc(n)}`).join('')}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;
const galeria = (fotos, alt) => `<div class="galeria">${fotos.map(f => `<a href="${IMG}${f}" data-foto>${fig(f, alt)}</a>`).join('')}</div>`;
const tabela = t => `<div class="tab-wrap"><table class="tab"><caption>${t.t}</caption><thead><tr>${t.cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${t.linhas.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>${t.nota ? `<p class="tab-nota">${t.nota}</p>` : ''}</div>`;

// ---------- blocos ----------
const cartaoProd = v => (p, i = 0) => `<li class="sobe" style="--i:${i % 4}"><a class="prod" href="${link(v, `produtos/${p.slug}`)}"><span class="prod-foto">${fig(`p-${p.slug}-1.webp`, p.nome)}</span><span class="prod-cat">${catDe(p).nome}</span><strong>${p.curto}</strong>${p.tabela ? '<span class="prod-selo">Tabela técnica</span>' : ''}</a></li>`;
const etapas = v => `<ol class="fluxo">${CATS.map((c, i) => `<li class="sobe" style="--i:${i}"><a class="fluxo-a" href="${link(v, c.id)}"><span class="fluxo-n">${ic(c.i)}</span><h3>${c.nome}</h3><p>${porCat(c.id).map(p => p.curto).join(', ')}</p></a></li>`).join('')}</ol>`;
const servCards = v => `<ul class="servs">${SERV.map((s, i) => `<li class="sobe" style="--i:${i % 3}">${fig(s.foto, s.t)}<div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ul>`;
const obras = `<div class="obras">${OBRAS.map(o => `<a href="${IMG}${o.f}" data-foto>${fig(o.f, o.t)}<span>${o.t}</span></a>`).join('')}</div>`;
const formulario = `<form class="form" id="form" data-wa="${E.wa}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa / fazenda<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Cidade / estado<input name="cidade" autocomplete="address-level2"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Orçamento de equipamento</option><option>Projeto de unidade armazenadora</option><option>Peças de reposição</option><option>Assistência técnica</option><option>Reforma ou ampliação</option><option>Outro assunto</option></select></label>
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Capacidade, tipo de grão, equipamento ou peça que precisa"></textarea></label>
  <button class="btn btn-wa" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp comercial. Se preferir, escreva para <a href="mailto:${E.email}">${E.email}</a>.</p>
</form>`;

// ---------- páginas internas ----------
const paginaSobre = v => cabecalhoPg(v, [['Sobre nós']], 'Tecnologia para o pós-colheita', 'Com investimentos constantes em tecnologia, aprimoramos um vetor importante da produção: o pós-colheita.', 'panorama.webp') + `
<section class="sec sobre-sec"><div class="in sobre-in">
  <div class="sobe sobre-txt">${SOBRE.map(p => `<p>${p}</p>`).join('')}<p>Não medimos esforços para ir além: seguimos o processo e evoluímos com tecnologia, ajudando o trabalho de todos que fazem o progresso do campo, sempre com qualidade, eficiência e segurança.</p></div>
  <figure class="sobe sobre-foto">${fig('sede-catalogo.webp', 'Sede da Agrotecsilos')}<figcaption>Sede da Agrotecsilos</figcaption></figure>
</div></section>
<section class="sec dif-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Nosso diferencial</p><h2>Peças de reposição para qualquer marca</h2><p>Se você precisar de qualquer peça de reposição, nós teremos, mesmo que o seu equipamento seja de outra marca. Fabricamos conforme a necessidade de cada cliente.</p></div>
  <ul class="difs">${[['Fabricação própria', 'Silos, secadores, transportadores e peças.', 'fabrica'], ['Montagem', 'Equipe própria na sua unidade.', 'chave'], ['Projetos', 'Unidades completas de armazenagem.', 'livro'], ['Assistência técnica', 'Também para outras marcas.', 'engrenagem']].map(([t, d, i]) => `<li class="sobe">${ic(i)}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
</div></section>
<section class="sec equipe-sec"><div class="in equipe-in">
  <div class="equipe-fotos sobe">${fig('equipe-campo.webp', 'Equipe Agrotecsilos em obra')}${fig('assistencia-2.webp', 'Equipe técnica em visita')}</div>
  <div class="sobe"><p class="sobre">Enviamos para todo o Brasil</p><h2>E para países da América do Sul</h2><p>Atendemos fazendas, cerealistas, cooperativas e indústrias, do projeto à montagem e à assistência técnica.</p>${btnWa('Falar com a equipe', 'falar com a equipe técnica')}</div>
</div></section>`;

const paginaProdutos = v => cabecalhoPg(v, [['Produtos']], 'Produtos', 'Equipamentos para armazenagem, limpeza, secagem e transporte de grãos.', 'silos-guindaste.webp') + `
<section class="sec prods-sec"><div class="in">
  ${CATS.map(c => `<section class="cat-bloco" id="${c.id}"><header class="cat-cab sobe">${ic(c.i)}<h2>${c.nome}</h2><a class="link-seta" href="${link(v, c.id)}">Ver linha ${ic('seta')}</a></header><ul class="prods">${porCat(c.id).map(cartaoProd(v)).join('')}</ul></section>`).join('')}
  <p class="centro sobe"><a class="btn btn-linha" href="${E.catalogo}" target="_blank" rel="noopener">${ic('livro')} Catálogo completo em PDF</a></p>
</div></section>`;

const paginaCat = (v, c) => cabecalhoPg(v, [['Produtos', 'produtos'], [c.nome]], c.nome, c.lead, c.foto) + `
<section class="sec cat-sec"><div class="in">
  ${porCat(c.id).map((p, i) => `<article class="linha-prod sobe${i % 2 ? ' inv' : ''}"><a class="lp-foto" href="${link(v, `produtos/${p.slug}`)}">${fig(`p-${p.slug}-1.webp`, p.nome)}</a><div><p class="sobre">${c.nome}</p><h2>${p.nome}</h2><p>${p.lead}</p><ul class="checks">${p.itens.slice(0, 4).map(x => `<li>${ic('check')} <span>${x}</span></li>`).join('')}</ul><a class="link-seta" href="${link(v, `produtos/${p.slug}`)}">${p.tabela ? 'Ficha e tabela técnica' : 'Ver detalhes'} ${ic('seta')}</a></div></article>`).join('')}
  ${c.extra ? `<p class="cat-extra sobe">${c.extra}</p>` : ''}
</div></section>`;

const paginaProduto = (v, p) => {
  const c = catDe(p); const irmaos = porCat(p.cat).filter(x => x !== p); const fs = fotosDe(p);
  return `<section class="pd-topo"><div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a> / <a href="${link(v, 'produtos')}">Produtos</a> / <a href="${link(v, c.id)}">${c.nome}</a> / ${esc(p.curto)}</p>
</div></section>
<section class="sec pd"><div class="in pd-in">
  <div class="pd-fotos sobe"><a class="pd-foto" href="${IMG}${fs[0]}" data-foto>${fig(fs[0], p.nome)}</a>${fs.length > 1 ? `<div class="pd-mini">${fs.slice(1).map(f => `<a href="${IMG}${f}" data-foto>${fig(f, p.nome)}</a>`).join('')}</div>` : ''}</div>
  <div class="pd-txt sobe">
    <p class="sobre">${c.nome}</p><h1>${p.nome}</h1>
    <p class="pd-lead">${p.lead}</p>
    <h2>Características</h2><ul class="checks">${p.itens.map(i => `<li>${ic('check')} <span>${i}</span></li>`).join('')}</ul>
    ${p.sub ? `<h2>${p.sub.t}</h2><ul class="checks">${p.sub.itens.map(i => `<li>${ic('check')} <span>${i}</span></li>`).join('')}</ul>` : ''}
    <div class="hero-bts">${btnWa('Pedir orçamento', `um orçamento de ${p.curto.toLowerCase()}`)}${p.pdf ? `<a class="btn btn-linha" href="${p.pdf}" target="_blank" rel="noopener">${ic('livro')} Ficha em PDF</a>` : ''}</div>
  </div>
</div>
${p.tabela ? `<div class="in pd-tabs sobe">${tabela(p.tabela)}${p.tabela2 ? tabela(p.tabela2) : ''}</div>` : ''}
</section>
${irmaos.length ? `<section class="sec pd-outros"><div class="in"><div class="sec-tit sobe"><p class="sobre">${c.nome}</p><h2>Outros equipamentos da linha</h2></div><ul class="prods">${irmaos.map(cartaoProd(v)).join('')}</ul></div></section>` : ''}`;
};

const paginaServicos = v => cabecalhoPg(v, [['Serviços']], 'Nossos serviços', 'Projetos de execução, montagem, assistência técnica, assessoria de obras e projetos, construção civil, reformas e ampliações.', 'montagem.webp') + `
<section class="sec servs-sec"><div class="in">${servCards(v)}</div></section>
<section class="sec obras-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Obras realizadas</p><h2>Unidades montadas pela Agrotecsilos</h2></div>${obras}</div></section>
<section class="sec proj-sec"><div class="in proj-in">
  <div class="sobe"><p class="sobre">Projetos</p><h2>A unidade desenhada antes da obra</h2><p>Do layout dos silos à interligação dos transportadores, o projeto define capacidades, fluxos e a construção civil necessária.</p>${btnWa('Solicitar projeto', 'solicitar um projeto de unidade armazenadora')}</div>
  <div class="proj-fotos sobe">${fig('projeto-silos-3d.webp', 'Projeto 3D de silos')}${fig('projeto-armazem-3d.webp', 'Projeto 3D de armazém graneleiro')}</div>
</div></section>`;

const paginaContato = v => cabecalhoPg(v, [['Fale conosco']], 'Fale conosco', 'Solicite um orçamento online e sem compromisso. Estamos à disposição para atendê-lo.', null) + `
<section class="sec cont-sec"><div class="in cont-in">
  <div class="sobe"><h2>Dúvidas e orçamentos</h2>${formulario}</div>
  <aside class="cont-info sobe"><ul>
    <li>${ic('tel')}<div><b>Comercial</b><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a> (WhatsApp)</div></li>
    <li>${icWa()}<div><b>Projetos</b><a href="${waHref('5543991881690')}" target="_blank" rel="noopener">${E.projetos}</a></div></li>
    <li>${icWa()}<div><b>Administrativo</b><a href="${waHref('5543998739239')}" target="_blank" rel="noopener">${E.adm}</a></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Fábrica</b><span>${E.fab}<br>${E.fabCidade}</span></div></li>
    <li>${ic('pin')}<div><b>Escritório</b><span>${E.esc}<br>${E.escCidade}</span></div></li>
  </ul></aside>
</div></section>
<section class="mapa-sec"><iframe src="${E.mapa}" title="Mapa da fábrica da Agrotecsilos em Rolândia" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;

const internas = v => {
  const o = { 'sobre-nos': pagina(v, 'sobre-nos', paginaSobre(v)), produtos: pagina(v, 'produtos', paginaProdutos(v)), servicos: pagina(v, 'servicos', paginaServicos(v)), contato: pagina(v, 'contato', paginaContato(v)) };
  for (const c of CATS) o[c.id] = pagina(v, c.id, paginaCat(v, c));
  for (const p of PROD) o[`produtos/${p.slug}`] = pagina(v, `produtos/${p.slug}`, paginaProduto(v, p));
  return o;
};

// ---------- A "Pós-colheita": clara, fluxo do grão em quatro etapas ----------
function versaoA() {
  const v = 'a';
  const destaques = ['silos-armazenadores', 'secadores', 'maquinas-de-limpeza', 'elevadores', 'fornalhas', 'rosca-transportadora', 'fabrica-de-racao', 'ventilador-centrifugo'].map(s => PROD.find(p => p.slug === s));
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Rolândia – PR · fabricação e montagem</p>
    <h1>Soluções em secagem e armazenagem de grãos</h1>
    <p class="lead">Silos, secadores, máquinas de limpeza e transportadores fabricados, montados e assistidos pela própria Agrotecsilos, com peças de reposição para qualquer marca.</p>
    <div class="hero-bts">${btnWa('Solicitar orçamento', 'um orçamento')}<a class="btn btn-linha" href="${link(v, 'produtos')}">Ver produtos ${ic('seta')}</a></div>
  </div>
  <div class="hero-fotos">${fig('obra-torre.webp', 'Unidade armazenadora montada pela Agrotecsilos', 'hf-1')}${fig('silos-guindaste.webp', 'Montagem de silos', 'hf-2')}<span class="hero-selo"><b>Brasil e América do Sul</b>enviamos equipamentos e peças</span></div>
</div></section>

<section class="sec fluxo-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">O caminho do grão</p><h2>Equipamentos para cada etapa do pós-colheita</h2></div>
  ${etapas(v)}
</div></section>

<section class="sec destaques-sec"><div class="in">
  <div class="sec-tit sec-tit-linha sobe"><div><p class="sobre">Produtos</p><h2>Linha completa de fabricação própria</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Todos os ${PROD.length} produtos ${ic('seta')}</a></div>
  <ul class="prods">${destaques.map(cartaoProd(v)).join('')}</ul>
</div></section>

<section class="sec dif-home"><div class="in dif-home-in">
  <div class="sobe">${fig('sede-catalogo.webp', 'Sede da Agrotecsilos')}</div>
  <div class="sobe"><p class="sobre">Sobre a Agrotecsilos</p><h2>Peças de reposição mesmo para outras marcas</h2><p>${SOBRE[0]}</p><p>${SOBRE[1]}</p><a class="link-seta" href="${link(v, 'sobre-nos')}">Conheça a empresa ${ic('seta')}</a></div>
</div></section>

<section class="sec servs-sec"><div class="in">
  <div class="sec-tit sec-tit-linha sobe"><div><p class="sobre">Serviços</p><h2>Do projeto à assistência técnica</h2></div><a class="link-seta" href="${link(v, 'servicos')}">Nossos serviços ${ic('seta')}</a></div>
  ${servCards(v)}
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

// ---------- B "Unidade": foto da obra em tela cheia, linhas em blocos escuros ----------
function versaoB() {
  const v = 'b';
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}obra-torre.webp)"></div><div class="in hero-in">
  <p class="sobre">Agrotecsilos · Rolândia – PR</p>
  <h1>Otimize o seu armazém com quem sabe</h1>
  <p class="lead">Fabricação, montagem, projetos e assistência técnica de toda a linha para armazenagem pós-colheita: silos, secadores, limpeza e transporte de grãos.</p>
  <div class="hero-bts">${btnWa('Solicitar orçamento', 'um orçamento')}<a class="btn btn-linha" href="${E.catalogo}" target="_blank" rel="noopener">${ic('livro')} Catálogo</a></div>
</div>
<div class="hero-cats"><div class="in"><ul>${CATS.map(c => `<li><a href="${link(v, c.id)}">${ic(c.i)}<span><b>${c.nome}</b>${porCat(c.id).length} produtos</span></a></li>`).join('')}</ul></div></div></section>

<section class="sec linhas-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Soluções completas</p><h2>Quatro linhas, uma unidade armazenadora</h2></div>
  <div class="linhas">${CATS.map((c, i) => `<article class="linha sobe" style="--i:${i}"><a class="linha-foto" href="${link(v, c.id)}">${fig(c.foto, c.nome)}<span class="linha-n">0${i + 1}</span></a><div class="linha-txt"><h3>${c.nome}</h3><ul>${porCat(c.id).map(p => `<li><a href="${link(v, `produtos/${p.slug}`)}">${p.curto} ${ic('seta')}</a></li>`).join('')}</ul></div></article>`).join('')}</div>
</div></section>

<section class="sec tab-home"><div class="in tab-home-in">
  <div class="sobe"><p class="sobre">Dados técnicos</p><h2>Ventiladores centrífugos de 5 a 40 cv</h2><p>Aeração de silos com vazão de 150 a 1.000 m³/min. As fichas dos produtos trazem as tabelas técnicas do catálogo em texto.</p><a class="link-seta" href="${link(v, 'produtos/ventilador-centrifugo')}">Ver a ficha completa ${ic('seta')}</a></div>
  <div class="sobe">${tabela({ ...PROD.find(p => p.slug === 'ventilador-centrifugo').tabela, linhas: PROD.find(p => p.slug === 'ventilador-centrifugo').tabela.linhas.filter((_, i) => i % 2 === 0) })}</div>
</div></section>

<section class="sec obras-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Obras em todo o Brasil</p><h2>Unidades montadas pela Agrotecsilos</h2></div>
  ${obras}
</div></section>

<section class="sec servs-b"><div class="in servs-b-in">
  <div class="sobe"><p class="sobre">Serviços</p><h2>Além da fabricação</h2><ul class="serv-lista">${SERV.map(s => `<li>${ic(s.i)}<div><b>${s.t}</b><span>${s.d}</span></div></li>`).join('')}</ul><a class="btn" href="${link(v, 'servicos')}">Conheça os serviços ${ic('seta')}</a></div>
  <div class="servs-b-fotos sobe">${fig('equipe-projeto.webp', 'Equipe de projetos')}${fig('assist-b.webp', 'Assistência técnica em campo')}</div>
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

copiarSiteJs(pub, E.wa);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
const A = versaoA(), B = versaoB();
escreverVersao(pub, 'a', A);
escreverVersao(pub, 'b', B);
await escolha(pub, {
  nome: 'Agrotecsilos', artigo: 'da', url: E.url, lang: 'pt', cor: '#007d05', fundo: '#0f2a16', claro: '#f4f5f0',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Pós-colheita', paginas: Object.keys(A).length, texto: 'Clara, com a obra e os silos na abertura e o caminho do grão em quatro etapas: armazenagem, limpeza, secagem e transporte.', pontos: [`${PROD.length} fichas de produto com fotos`, 'Tabelas técnicas do catálogo em texto', 'Sem o conteúdo invasor de apostas'] },
    { letra: 'b', nome: 'Unidade', paginas: Object.keys(B).length, texto: 'A unidade armazenadora em tela cheia, as quatro linhas em blocos e as obras realizadas.', pontos: ['Mesmo menu do site atual', 'Logo redesenhado em vetor', 'Formulário que abre o WhatsApp'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
