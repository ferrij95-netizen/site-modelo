// Conteúdo do Grupo KSS. Textos, produtos e eventos vêm do site atual (grupokss.com.br, lido em 21/10/2026).
// Produtos e eventos estão em dados.json (gerado pela leitura das páginas /produto/<slug> e /evento/<slug>).
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dados = JSON.parse(fs.readFileSync(path.join(aqui, 'dados.json'), 'utf8'));

export const empresa = {
  nome: 'Grupo KSS',
  razao: 'KSS Comércio e Indústria de Equipamentos Médico Ltda.',
  slogan: 'Foco em soluções médicas',
  url: 'https://grupokss.overtus.com.br/',
  antigo: 'http://grupokss.com.br/',
  desde: 1987,
  cidade: 'São José dos Pinhais, Paraná',
  endereco: 'R. Castro, 29, Jd. Cruzeiro, São José dos Pinhais, Paraná',
  mapa: 'https://www.google.com/maps/search/?api=1&query=R.+Castro,+29,+Jardim+Cruzeiro,+S%C3%A3o+Jos%C3%A9+dos+Pinhais+PR',
  tel: '(41) 3382-2066', telHref: '+554133822086',
  tel2: '(41) 3084-7963', tel2Href: '+554130847963',
  whats: '554130847963',
  horario: 'Segunda a sexta, 8h às 12h e 13h às 17h45',
  emailComercial: 'kss@grupokss.com.br',
  emailFinanceiro: 'financeiro@grupokss.com.br',
  redes: [
    { nome: 'Facebook', url: 'https://www.facebook.com/grupokss/' },
    { nome: 'Instagram', url: 'https://www.instagram.com/grupokss/' },
    { nome: 'LinkedIn', url: 'https://www.linkedin.com/company/grupokss/' },
    { nome: 'YouTube', url: 'https://www.youtube.com/channel/UCCYsdR1_llQUYkqGw7k7Cxw' },
  ],
};

// Textos do site atual (home e Quem Somos).
export const textos = {
  heroTitulo: 'Seu centro cirúrgico preparado para qualquer procedimento',
  intro: { titulo: 'Produtos de alta qualidade com ótimo custo-benefício', texto: 'Desde 1987 trazemos uma expertise no mercado médico-hospitalar, aliando boas práticas de fabricação a uma linha de produção altamente competente para entregar a solução ideal ao cliente, fazendo dessa união perfeita para levar os melhores equipamentos médicos do mercado com o melhor custo-benefício.' },
  pilares: [
    { titulo: 'Desde 1987 nosso foco é você', texto: 'Trazemos uma vasta experiência para o mercado médico-hospitalar, fabricando equipamentos médicos de alta qualidade, que atendem todas as exigências médicas.' },
    { titulo: 'Produção altamente qualificada', texto: 'Contamos com o que há de mais moderno em soluções tecnológicas para os nossos produtos, que são 100% nacionais, projetados, fabricados e comercializados em nossa fábrica.' },
    { titulo: 'Melhoria contínua nos processos', texto: 'Colocamos a necessidade do cliente à frente, focados em fabricar e entregar os equipamentos médicos com excelência. Qualidade e segurança são nossa filosofia.' },
  ],
  quemSomos: [
    'Presentes no mercado desde 1987, o Grupo KSS traz uma vasta experiência para o mercado médico-hospitalar, fabricando equipamentos médicos de alta qualidade, que atendem às mais específicas exigências médicas. Com a expertise na fabricação de foco e mesa cirúrgica, conta ainda com uma vasta linha de produtos, que vão da hotelaria hospitalar a equipamentos para centro cirúrgico.',
    'Contando com uma linha de produção altamente qualificada e com o que há de mais moderno em soluções tecnológicas, nossos produtos são 100% nacionais, projetados, fabricados e comercializados dentro das dependências do Grupo KSS. Hoje nossos equipamentos estão instalados e em pleno uso em instituições de saúde nos quatro cantos do Brasil.',
    'Com a visão e filosofia de melhoria contínua em todos os processos, colocamos a necessidade do cliente à frente, focados em fabricar e entregar os equipamentos médicos com excelência, zelo, qualidade e segurança, mantendo o cuidado e o respeito com a vida sempre em primeiro lugar.',
  ],
  missao: 'Planejar, projetar e fabricar equipamentos médicos com excelência e alta qualidade, visar primeiramente atender toda a necessidade do mercado e de nossos clientes, garantir os processos que oferecem produtos de segurança e alto desempenho, respeitar sempre todas as normas impostas para a produção e comercialização de dispositivos médico-hospitalares.',
  visao: 'Consolidar-se como referência no mercado nacional, posicionando-se como a melhor escolha para o público de interesse, sendo reconhecidos pela alta qualidade de nossos produtos.',
  valores: ['Qualidade', 'Comprometimento', 'Valor justo por produto de alto desempenho', 'Produtos de alto desempenho acessíveis ao mercado', 'Respeito e valorização humana'],
  depoimentosIntro: 'Desde 1987, entregamos muitos produtos e satisfizemos muitos clientes. Alguns deles deixaram seus depoimentos sobre o nosso atendimento.',
};

export const depoimentos = [
  { nome: 'Dr. Rodrigo de Mello Scalla', local: 'Hospital Scalla', foto: 'depo-scalla', texto: 'Sou cliente do Grupo KSS há 11 anos, com 7 mesas e 7 focos cirúrgicos, e sempre foram prestativos, tanto na venda como no pós-venda. O hospital Scalla conta com uma moderna estrutura, e fez a compra contando com o alto desempenho de seus equipamentos.' },
  { nome: 'Dr. Edilson C. Ramos', local: 'Med Plastic', foto: 'depo-medplastic', texto: 'Adquiri um moderno e avançado Foco Cirúrgico com a tecnologia SKYLED, que me oferece um conforto sem igual para operar e, devido à possibilidade da regulagem de luz, é possível ajustar a luminosidade sem ofuscar ou perder qualidade.' },
  { nome: 'Dr. Rafael Martin', local: 'Santa Brígida', foto: 'depo-santabrigida', texto: 'Os resultados e diferenciais dos Focos SKYLED durante os procedimentos cirúrgicos são muito satisfatórios.' },
];

// Árvore de categorias do menu "Produtos" do site atual. img = foto de capa da linha.
export const linhas = [
  { slug: 'foco-cirurgico', nome: 'Foco Cirúrgico', solucao: 'cirurgia', img: 'foco-cirurgico-skyled-de-teto-dois-bracos-160-160-160000-1', texto: 'Linha SKYLED de teto e auxiliar, de 65.000 a 160.000 lux, com câmera e suporte para monitor.', subs: [
    { slug: 'foco-cirurgico-de-teto', nome: 'Foco Cirúrgico de Teto' }, { slug: 'foco-cirurgico-auxiliar', nome: 'Foco Cirúrgico Auxiliar' }] },
  { slug: 'mesa-cirurgica', nome: 'Mesa Cirúrgica', solucao: 'cirurgia', img: 'mesa-cirurgica-eletro-hidraulica-vision-t4-eh-1', texto: 'Mesas Vision T elétricas, eletro-hidráulicas e manuais, com kits e suportes em gel para cada especialidade.', subs: [
    { slug: 'mesa-cirurgica-eletrica', nome: 'Mesa Cirúrgica Elétrica' }, { slug: 'mesa-cirurgica-manual', nome: 'Mesa Cirúrgica Manual' }, { slug: 'acessorios-opcionais', nome: 'Acessórios Opcionais' }] },
  { slug: 'aspirador-cirurgico', nome: 'Aspirador Cirúrgico', solucao: 'cirurgia', img: 'aspirador-cirurgico-eletrico-isento-de-oleo-1', texto: 'Aspirador elétrico isento de óleo, de funcionamento contínuo e baixo ruído.', subs: [
    { slug: 'aspirador-cirurgico', nome: 'Aspirador Cirúrgico' }] },
  { slug: 'cama-hospitalar', nome: 'Cama Hospitalar', solucao: 'hotelaria', img: 'cama-eletrica-suite-master-11', texto: 'Cama elétrica Suíte Master e cama Fowler manual com elevação.', subs: [
    { slug: 'cama-hospitalar-eletrica', nome: 'Cama Hospitalar Elétrica' }, { slug: 'cama-hospitalar-manual', nome: 'Cama Hospitalar Manual' }] },
  { slug: 'carros-maca', nome: 'Carros Maca', solucao: 'hotelaria', img: 'carro-maca-com-elevacao-hidraulica-modelo-com-freio-central-1', texto: 'Macas com elevação hidráulica, altura regulável ou fixa e modelo de transposição.', subs: [
    { slug: 'elevacao-hidraulica', nome: 'Elevação Hidráulica' }, { slug: 'carro-maca', nome: 'Carro Maca' }] },
  { slug: 'carro-de-emergencia-e-medicamentos', nome: 'Carro de Emergência e Medicamentos', curto: 'Carros de Emergência', solucao: 'hotelaria', img: 'carro-de-emergencia-compacto-com-acessorios-oxigenoterapi-1', texto: 'Carros de emergência compactos e carro de administração de medicamentos.', subs: [
    { slug: 'carro-de-emergencia', nome: 'Carro de Emergência' }, { slug: 'carro-de-administracao-de-medicamentos', nome: 'Carro de Administração de Medicamentos' }] },
  { slug: 'hotelaria-hospitalar', nome: 'Hotelaria Hospitalar', solucao: 'hotelaria', img: 'poltrona-para-suites-1', texto: 'Poltrona para suítes, mesas de cabeceira, auxiliar e de Mayo, escadinhas, suporte de soro e carro de curativos.', subs: [
    { slug: 'hotelaria-hospitalar', nome: 'Hotelaria Hospitalar' }] },
];

export const solucoes = [
  { slug: 'cirurgia', nome: 'Cirurgia Geral', texto: 'Focos, mesas, acessórios e aspiradores para montar o centro cirúrgico completo.', img: 'site/feira-2018-2' },
  { slug: 'hotelaria', nome: 'Hotelaria Hospitalar', texto: 'Camas, macas, carros de emergência e mobiliário para quartos, suítes e corredores.', img: 'p/cama-eletrica-suite-master-6' },
];

export const produtos = dados.produtos.map(p => {
  const linha = linhas.find(l => l.subs.some(s => s.slug === p.cat));
  return { ...p, linha: linha.slug, linhaNome: linha.nome };
});
// Ordem do catálogo: segue a ordem das linhas do menu.
produtos.sort((a, b) => linhas.findIndex(l => l.slug === a.linha) - linhas.findIndex(l => l.slug === b.linha));

const fotosEvento = {
  'grupo-kss-brilha-na-feira-hospitalar-2025-com-inovacao-e-tec': 'evento-hospitalar-2025',
  'grupo-kss-e-prefeitura-de-sao-jose-dos-pinhais-uma-parceria': 'evento-induspar-2025',
  'grupo-kss-estara-presente-no-iii-congresso-cearense-de-hospi': 'evento-congresso-cearense',
  'grupo-kss-na-expo-hospital-2025-conheca-o-futuro-da-saude-e': 'evento-expohospital-2025',
  // Sem foto própria no site atual: fotos do estande na Feira Hospitalar.
  'grupo-kss-leva-inovacao-e-tecnologia-para-o-33-congresso-na': 'feira-2019-5',
  'grupo-kss-na-hospitalmed-2025-encontre-as-melhores-solucoes': 'feira-2018-4',
};
const locais = {
  'grupo-kss-brilha-na-feira-hospitalar-2025-com-inovacao-e-tec': { evento: 'Feira Hospitalar 2025', cidade: 'São Paulo, SP' },
  'grupo-kss-e-prefeitura-de-sao-jose-dos-pinhais-uma-parceria': { evento: 'INDUSPAR 2025', cidade: 'Pinhais, PR' },
  'grupo-kss-leva-inovacao-e-tecnologia-para-o-33-congresso-na': { evento: '33º Congresso das Santas Casas', cidade: 'Brasília, DF' },
  'grupo-kss-na-expo-hospital-2025-conheca-o-futuro-da-saude-e': { evento: 'Expo-Hospital Brasil 2025', cidade: 'Belo Horizonte, MG' },
  'grupo-kss-estara-presente-no-iii-congresso-cearense-de-hospi': { evento: 'III Congresso Cearense', cidade: 'Fortaleza, CE' },
  'grupo-kss-na-hospitalmed-2025-encontre-as-melhores-solucoes': { evento: 'HospitalMED 2025', cidade: 'Recife, PE' },
};
const dataNum = d => d.split('/').reverse().join('');
export const eventos = dados.eventos
  .map(e => ({ ...e, foto: fotosEvento[e.slug], ...locais[e.slug], resumo: e.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 170).replace(/\s\S*$/, '') + '…' }))
  .sort((a, b) => dataNum(b.data).localeCompare(dataNum(a.data)));

export const videos = [
  { id: '9PKIyUmPVKc', titulo: 'Foco Cirúrgico SKYLED 160/160 com câmera, monitor e três braços' },
  { id: 'G4Hz9tiBkZE', titulo: 'Foco Cirúrgico SKYLED com câmera e duas cúpulas 160/160 mil lux' },
  { id: 'v_xv-nE6BjE', titulo: 'Foco Cirúrgico SKYLED 160/160 com focalizador eletrônico e duas cúpulas' },
  { id: 'g5p4qIFblG0', titulo: 'Cama Hospitalar Elétrica Suíte Master' },
  { id: 'mCBl-jW_cXY', titulo: 'Aspirador Cirúrgico isento de óleo e elétrico' },
  { id: 'ufErLDSjoaQ', titulo: 'Grupo KSS na Feira Hospitalar 2023' },
  { id: 'EG7BhXFwn-w', titulo: 'Mesa Cirúrgica Elétrica Vision T, leito fixo' },
  { id: 'O18n_NRpZXQ', titulo: 'Mesa Cirúrgica Elétrica Vision T4' },
  { id: 'AjiIawiJip8', titulo: 'Acessórios opcionais da Mesa Cirúrgica Elétrica Vision T4' },
  { id: 'mqEOfZjODyE', titulo: 'Foco Cirúrgico de Teto SKYLED 120 + 160' },
  { id: 'VQg4Tzij2CY', titulo: 'Foco Cirúrgico Auxiliar SKYLED 120' },
  { id: 'r8MeHL_LsaM', titulo: 'Mesa Cirúrgica Manual Vision T3' },
];

export const galerias = [
  { nome: 'Feira Hospitalar 2019', fotos: Array.from({ length: 11 }, (_, i) => `feira-2019-${i + 1}`) },
  { nome: 'Feira Hospitalar 2018', fotos: Array.from({ length: 6 }, (_, i) => `feira-2018-${i + 1}`) },
];

// Números da ficha do Foco SKYLED de Teto 160 (aba Diferenciais do site atual).
export const skyled = [
  { n: '160.000', u: 'lux', t: 'por cúpula, a 1 metro do campo operatório' },
  { n: '3.000 a 6.000', u: 'K', t: 'temperatura de cor ajustável no painel' },
  { n: '300.000', u: 'horas', t: 'de vida útil dos LEDs' },
  { n: 'RA 96', u: '', t: 'índice de reprodução de cor (R9 = 97)' },
  { n: 'IP-54', u: '', t: 'cúpula selada, sem ventilação forçada e sem ruído' },
  { n: '500', u: 'ciclos', t: 'de autoclave da manopla em alumínio a 134 °C' },
];
// Números da ficha da Mesa Vision T4 EH.
export const visionT4 = ['Suporta pacientes de até 465 kg', 'Painel LCD touch screen', 'Sensores anticolisão', 'Posições memorizáveis e histórico de movimentos', 'Tampo radiotransparente, colchonete sem costura, IP-54', 'Rodas com travamento eletro-hidráulico'];
