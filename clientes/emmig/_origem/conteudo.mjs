// Conteúdo da EMMIG, todo tirado do site atual (emmig.com.br/portal, WordPress, páginas, posts e galerias pela API wp-json).
// As descrições curtas de cada obra saem dos nomes das fotos do próprio site (ex.: "Usina-Itapagipe-Casa-de-Força.jpg").

export const empresa = {
  nome: 'EMMIG',
  nomeLongo: 'EMMIG Estruturas Metálicas Minas Gerais',
  url: 'https://emmig.overtus.com.br/',
  antigo: 'https://emmig.com.br/portal/',
  fundacao: 1967,
  anos: new Date().getFullYear() - 1967,
  telefone: '(34) 3229-9100',
  telHref: '+553432299100',
  email: 'emmig@emmig.com.br',
  endereco: 'BR-452, km 140',
  cep: '38.407-049',
  cidade: 'Uberlândia - MG',
  mapa: 'https://www.google.com/maps/d/embed?mid=1iHwZYBzpJD1vYNMt4_ZJRVuNzaY',
  rotaMapa: 'https://www.google.com/maps/search/?api=1&query=EMMIG+Estruturas+Met%C3%A1licas+BR-452+km+140+Uberl%C3%A2ndia',
};

export const sobre = {
  curto: 'A EMMIG foi fundada em 1967 na cidade de Uberlândia (MG). São décadas de experiência em construção de estruturas metálicas, a serviço da indústria e do comércio de grande e médio porte.',
  paragrafos: [
    'A EMMIG foi fundada em 1967 na cidade de Uberlândia (MG). São décadas de experiência em construção em aço, a serviço da indústria e do comércio de grande e médio porte. Ao longo desse período, vem desenvolvendo e racionalizando processos e consolidando sua qualidade, solidez e credibilidade.',
    'Atualmente a EMMIG fabrica estruturas metálicas para coberturas, caminhos para ponte rolante, projetos para fabricação e montagem de estruturas, mezaninos e torres, além de equipamentos para instalações industriais em geral. Também elabora projetos em 2D e 3D que permitem visualizar interfaces entre estruturas, conexões, interferências e sequência de montagem.',
    'Possui em seu quadro profissionais altamente qualificados, para fornecer aos clientes as melhores soluções técnicas para suas necessidades, com excelência operacional, melhoria contínua dos serviços e a eficácia do sistema de gestão da qualidade.',
    'A EMMIG preza pela qualidade e segurança de seus projetos, sempre respeitando e garantindo o bom resultado e o prazo especificado pelo cliente. Assim conquistou o respeito e a admiração pela sua eficiência.',
  ],
  pilares: [
    { nome: 'Qualidade', texto: 'Processos desenvolvidos e racionalizados ao longo de décadas, com sistema de gestão da qualidade e melhoria contínua.' },
    { nome: 'Solidez', texto: 'Empresa de Uberlândia desde 1967, com fábrica própria às margens da BR-452 e equipe técnica qualificada.' },
    { nome: 'Credibilidade', texto: 'Respeito ao resultado e ao prazo especificado pelo cliente, em obras para indústria, comércio, educação e setor público.' },
  ],
};

export const fabricamos = [
  { nome: 'Coberturas', texto: 'Galpões, armazéns, coberturas industriais e comerciais em grandes vãos.', foto: 'cargill-1' },
  { nome: 'Caminhos para ponte rolante', texto: 'Vigas de rolamento e estruturas preparadas para pontes rolantes em fábricas e oficinas.', foto: 'capa-fabrica' },
  { nome: 'Mezaninos e torres', texto: 'Mezaninos, torres, escadas e plataformas para indústria e usinas.', foto: 'vertente-2' },
  { nome: 'Equipamentos para instalações industriais', texto: 'Pipe racks, estruturas de filtros, centrífugas, caldeiras e casas de força.', foto: 'itapagipe-1' },
  { nome: 'Edifícios em estrutura metálica', texto: 'Prédios comerciais, escolas e shoppings com pilares e vigas de aço.', foto: 'gavea-office-1' },
];

export const etapas = [
  { nome: 'Projeto 2D e 3D', texto: 'O projeto em 2D e 3D mostra as interfaces entre estruturas, conexões, interferências e a sequência de montagem antes de cortar a primeira peça.', foto: 'fabrica-5' },
  { nome: 'Fabricação', texto: 'As peças são cortadas, soldadas e pintadas na fábrica da EMMIG em Uberlândia, com controle de qualidade em todo o processo industrial.', foto: 'fabrica-8' },
  { nome: 'Montagem', texto: 'A equipe monta a estrutura na obra com guindastes, em paralelo com outras frentes de serviço, sem depender da chuva.', foto: 'adm-2' },
  { nome: 'Entrega', texto: 'Estrutura aprumada e nivelada, pronta para fechamentos, esquadrias e instalações, no prazo combinado com o cliente.', foto: 'dmae-1' },
];

// Segmentos = menu "Serviços" do site atual, na mesma ordem.
export const segmentos = [
  { slug: 'edificios-comerciais', capa: 'algar-1', nome: 'Edifícios comerciais', texto: 'Prédios de escritórios e centros empresariais com estrutura em aço, de Uberlândia para o Triângulo Mineiro.' },
  { slug: 'predios-industriais', capa: 'adm-1', nome: 'Prédios industriais', texto: 'Plantas, graneleiros, áreas de ensaque e edificações industriais para grandes empresas do agronegócio.' },
  { slug: 'usinas-de-acucar', capa: 'itapagipe-1', nome: 'Usinas de açúcar', texto: 'Fábricas de açúcar, armazéns, casas de força, caldeiras e pipe racks para usinas de Minas e Goiás.' },
  { slug: 'shoppings-e-hipermercados', capa: 'bahamas-1', nome: 'Shoppings e hipermercados', texto: 'Coberturas, ampliações e estruturas para shoppings, lojas e hipermercados.' },
  { slug: 'escolas', capa: 'unitri-1', nome: 'Escolas', texto: 'Blocos de sala de aula, escadas e coberturas para colégios e universidades.' },
  { slug: 'outros', capa: 'cocal-1', nome: 'Outras obras', texto: 'Sede pública, terminal urbano, clube e transportadora: obras especiais em aço.' },
];

const f = (...nomes) => nomes;
// fotos: nomes dos arquivos originais (pasta wp-content/uploads/AAAA/MM achatada como AAAA_MM_nome.jpg); imagens.mjs gera <slug>-<n>.webp
export const obras = [
  { slug: 'algar', seg: 'edificios-comerciais', nome: 'Algar · Granja Marileusa', texto: 'Estrutura metálica no empreendimento Granja Marileusa, do Grupo Algar, em Uberlândia, acompanhada mês a mês de 2015 a 2016.',
    fotos: f('2016_06_GEDC0487.jpg', '2016_06_Granja-Marileusa-em-2016-01-14-às-15.28.56.jpg', '2016_06_Granja-Marileusa-em-2015-12-09-às-16.22.29.jpg', '2016_06_Granja-Marileusa-em-2015-11-25-às-15.06.47.jpg', '2016_06_Granja-Marileusa-em-2015-11-12-às-15.38.19.jpg', '2016_06_Granja-Marileusa-em-2015-10-30-às-15.27.20.jpg', '2016_06_Granja-Marileusa-em-2015-10-15-às-16.57.31.jpg', '2016_06_Granja-Marileusa-em-2015-09-17-às-16.46.48.jpg', '2016_06_GEDC0402.jpg', '2016_06_GEDC0493.jpg', '2016_06_GEDC0482.jpg', '2016_06_GEDC0523.jpg') },
  { slug: 'eurobike', seg: 'edificios-comerciais', nome: 'Eurobike', texto: 'Estrutura em aço da loja e prédio da Eurobike, com pilares e vigas aparentes.',
    fotos: f('2016_06_2012-08-07-07.54.54.jpg', '2016_06_2012-09-27-08.58.42.jpg', '2016_06_2012-10-11-07.50.20.jpg') },
  { slug: 'gavea-office', seg: 'edificios-comerciais', nome: 'Gávea Office', texto: 'Edifício comercial em estrutura metálica, dos pilares à cobertura.',
    fotos: f('2016_06_DSC02396.jpg', '2016_06_DSC02460.jpg', '2016_06_DSC02500.jpg', '2016_06_DSC04357.jpg', '2016_06_DSC02368.jpg', '2016_06_DSC02369.jpg', '2016_06_DSC02393.jpg', '2016_06_DSC02394.jpg') },
  { slug: 'gavea-business', seg: 'edificios-comerciais', nome: 'Gávea Business', texto: 'Centro empresarial com estrutura em aço em vários pavimentos.',
    fotos: f('2016_06_DSCN0219.jpg', '2016_06_DSC04475.jpg', '2016_06_DSCN0221.jpg', '2016_06_DSCN0181.jpg', '2016_06_DSCN0607.jpg', '2016_06_DSCN0212.jpg', '2016_06_DSCN0271.jpg', '2016_06_DSCN0580.jpg', '2016_06_DSCN0216.jpg', '2016_06_DSCN0249.jpg', '2016_06_DSCN0218.jpg') },
  { slug: 'wbc', seg: 'edificios-comerciais', nome: 'World Business Center', texto: 'O WBC de Uberlândia, centro de negócios com fachada marcante e estrutura metálica.',
    fotos: f('2016_06_WBC-UBERLANDIA-6.jpg', '2016_06_WBC-UBERLANDIA-2.jpg', '2016_06_WBC-UBERLANDIA-1.jpg', '2016_06_WBC-UBERLANDIA-4.jpg', '2016_06_WBC-UBERLANDIA-5.jpg', '2016_06_IMGP0107.jpg', '2016_06_IMGP0113.jpg', '2016_06_IMGP0119.jpg') },

  { slug: 'adm', seg: 'predios-industriais', nome: 'ADM', texto: 'Estrutura de prédio industrial para a ADM, com montagem por guindaste em vários níveis (relatório de obra de Campo Grande, 2015).',
    fotos: f('2016_06_adm-1.jpg', '2016_06_adm-2.jpg', '2016_06_adm-3.jpg', '2016_06_adm-campo-grande-relatorio-16-04-2015.png.jpg') },
  { slug: 'cargill', seg: 'predios-industriais', nome: 'Cargill', texto: 'Graneleiro em Perdizes (MG) e ampliação da área de ensaque.',
    fotos: f('2016_06_Cargill-Perdizes-Graneleiro.jpg', '2016_06_Cargill-Perdizes-Graneleiro-1.jpg', '2016_06_Cargill-Ampliacao-Ensaque.jpg', '2016_06_Cargill-Ampliacao-Ensaque-1.jpg') },
  { slug: 'monsanto', seg: 'predios-industriais', nome: 'Monsanto', texto: 'Prédio industrial de vários pavimentos para a Monsanto, da fundação à estrutura completa.',
    fotos: f('2016_06_20130910_123616.jpg', '2016_06_20130910_160231.jpg', '2016_06_20130910_114902.jpg', '2016_06_IMG693.jpg', '2016_06_IMG694.jpg', '2016_06_20130911_134022.jpg', '2016_06_Monsanto.jpg', '2016_06_Monsanto2.jpg', '2016_06_Foto-0025.jpg', '2016_06_Monsanto4.jpg', '2016_06_Monsanto-1.jpg', '2016_06_20130910_084610.jpg') },
  { slug: 'tecnoseed', seg: 'predios-industriais', nome: 'Tecnoseed', texto: 'Galpão e torre com passarela para a unidade de sementes da Tecnoseed.',
    fotos: f('2016_06_tecnoseeds-1.jpg', '2016_06_tecnoseeds-5.jpg', '2016_06_tecnoseeds-2.jpg', '2016_06_tecnoseeds-3.jpg', '2016_06_tecnoseeds-4.jpg') },

  { slug: 'continental', seg: 'usinas-de-acucar', nome: 'Usina Continental', texto: 'Estruturas e coberturas metálicas para a Usina Continental.',
    fotos: f('2016_06_Usina-Continental2.jpg', '2016_06_Usina-Continental-1024x768.jpg', '2016_06_Usina-Continental1.jpg') },
  { slug: 'itapagipe', seg: 'usinas-de-acucar', nome: 'Usina de Itapagipe', texto: 'Fábrica de açúcar, casa de força, cobertura da caldeira e pipe rack.',
    fotos: f('2016_06_Usina-Itapagipe-Fabrica-de-Acucar-2.jpg', '2016_06_usina-Itapagipe-Pipe-rack.jpg', '2016_06_Usina-Itapagipe-Fabrica-de-Acucar.jpg', '2016_06_Usina-Itapagipe-Casa-de-Força.jpg', '2016_06_Usina-Itapagipe-Cobertura-da-caldeira.jpg', '2016_06_Usina-Itapagipe-Fabrica-de-Acucar-3.jpg') },
  { slug: 'itumbiara', seg: 'usinas-de-acucar', nome: 'Usina de Itumbiara', texto: 'Armazém de açúcar e estruturas da planta industrial em Itumbiara (GO).',
    fotos: f('2016_06_Usina-Itumbiara5.jpg', '2016_06_Usina-Itumbiara6.jpg', '2016_06_Usina-Itumbiara2.jpg', '2016_06_Usina-Itumbiara11.jpg', '2016_06_Usina-Itumbiara-Armazém-de-Açúcar7.jpg', '2016_06_Usina-Itumbiara.jpg', '2016_06_Usina-Itumbiara1.jpg', '2016_06_Usina-Itumbiara8.jpg', '2016_06_Usina-Itumbiara9.jpg', '2016_06_Usina-Itumbiara10.jpg', '2016_06_Usina-Itumbiara12.jpg', '2016_06_Usina-Itumbiara13.jpg') },
  { slug: 'moema', seg: 'usinas-de-acucar', nome: 'Usina Moema', texto: 'Lavador, oficina e caldeira em estrutura metálica.',
    fotos: f('2016_06_Usina-Moema-Lavador.jpg', '2016_06_Usina-Moema-Oficina.jpg', '2016_06_usina-Moema-Caldeira.jpg', '2016_06_Usina-Moema.jpg') },
  { slug: 'uberaba', seg: 'usinas-de-acucar', nome: 'Usina Uberaba', texto: 'Estruturas e plataformas metálicas para a Usina Uberaba.',
    fotos: f('2016_06_Usina-Uberaba13.jpg', '2016_06_Usina-Uberaba12.jpg', '2016_06_Usina-Uberaba11.jpg', '2016_06_Usina-Uberaba7.jpg', '2016_06_Usina-Uberaba8.jpg', '2016_06_Usina-Uberaba9.jpg', '2016_06_Usina-Uberaba6.jpg', '2016_06_Usina-Uberaba10.jpg', '2016_06_Usina-Uberaba4.jpg', '2016_06_Usina-Uberaba.jpg', '2016_06_Usina-Uberaba2.jpg', '2016_06_Usina-Uberaba3.jpg') },
  { slug: 'vertente', seg: 'usinas-de-acucar', nome: 'Usina Vertente', texto: 'Fábrica de açúcar, torre de escada, carregamento de açúcar a granel, centrífugas, dornas e estrutura do filtro rotativo.',
    fotos: f('2016_06_usina-Vertente-Fábrica-de-açúcar.jpg', '2016_06_Usina-VertenteTorre-Escada-Fábrica-Açúcar.jpg', '2016_06_Usina-Vertente.jpg', '2016_06_Usina-vertente-Carreg-Açúcar-Grane.jpg', '2016_06_Usina-Vertente-Centrifugas-Dornas.jpg', '2016_06_Usina-vertente-Estr.-Filtro-Rotativo-1.jpg', '2016_06_Usina-Vertente-Estr-Filtro-Rotativo.jpg') },

  { slug: 'bahamas', seg: 'shoppings-e-hipermercados', nome: 'Bahamas', texto: 'Supermercado Bahamas Gourmet: estrutura e fachada.',
    fotos: f('2016_06_banner13.jpg', '2016_06_fachada-bahamas.jpg', '2016_06_fachada-trazeira-bahamas.jpg') },
  { slug: 'carrefour', seg: 'shoppings-e-hipermercados', nome: 'Carrefour', texto: 'Estrutura do hipermercado e do totem de identificação.',
    fotos: f('2016_06_Carrefour.jpg', '2016_06_Carrefour-Totem-1.jpg', '2016_06_Carrefour-Totem-768x1024.jpg') },
  { slug: 'center-shopping', seg: 'shoppings-e-hipermercados', nome: 'Center Shopping', texto: 'Coberturas e estruturas metálicas no Center Shopping de Uberlândia.',
    fotos: f('2016_06_Cetner-Shopping-4.jpg', '2016_06_Center-Shpping-5.jpg', '2016_06_Center-Shopping.jpg', '2016_06_Center-Shopping-1.jpg', '2016_06_Center-Shopping-2.jpg', '2016_06_Center-Shopping-3.jpg') },
  { slug: 'tok-stok', seg: 'shoppings-e-hipermercados', nome: 'Tok&Stok', texto: 'Estrutura da loja Tok&Stok, com montagem das tesouras por guindaste.',
    fotos: f('2016_06_Tok-Stok-4.jpg', '2016_06_Tok-Stok-2.jpg', '2016_06_Tok-Stok-3.jpg', '2016_06_Tok-Stok-9.jpg', '2016_06_Tok-Stok-1.jpg', '2016_06_Tok-Stok-5.jpg', '2016_06_Tok-Stok-6.jpg', '2016_06_Tok-Stok-8.jpg', '2016_06_Tok-Stok-7.jpg') },

  { slug: 'gabarito', seg: 'escolas', nome: 'Colégio Gabarito', texto: 'Prédio do Colégio Gabarito em estrutura metálica, da montagem à fachada pronta.',
    fotos: f('2016_06_Colégio-Gabarito-1.jpg', '2016_06_6.jpg', '2016_06_1.jpg', '2016_06_7.jpg', '2016_06_banner12.jpg', '2016_06_Colégio-Gabarito-3.jpg', '2016_06_Colégio-Gabarito-5.jpg', '2016_06_GEDC8694.jpg', '2016_06_GEDC8697.jpg', '2016_06_GEDC8704.jpg') },
  { slug: 'unitri', seg: 'escolas', nome: 'Unitri', texto: 'Bloco E do Centro Universitário do Triângulo, com escadas e passarelas em aço.',
    fotos: f('2016_06_unitri-Bloco-E.jpg', '2016_06_Unitri-1.jpg', '2016_06_Unitri-2.jpg', '2016_06_Unitri-4.jpg', '2016_06_Unitri.jpg') },
  { slug: 'uniube', seg: 'escolas', nome: 'Uniube', texto: 'Estruturas para a Universidade de Uberaba.',
    fotos: f('2016_06_uniube.jpg', '2016_06_uniube-1.jpg', '2016_06_uniube-3.jpg', '2016_06_uniube-2.jpg') },

  { slug: 'dmae', seg: 'outros', nome: 'DMAE · nova sede', texto: 'Nova sede do Departamento Municipal de Água e Esgoto de Uberlândia, na Av. Rondon Pacheco, ao lado do Teatro Municipal. Projeto do arquiteto Zied Sabbagh, 8.073 m² de área construída.',
    fotos: f('2016_06_20170214_120328.jpg', '2016_06_20170214_120702.jpg', '2016_06_20170220_120803.jpg', '2016_06_20170214_120257.jpg', '2016_06_20170214_121500.jpg', '2016_06_20170214_120304.jpg', '2016_06_20170214_121110.jpg', '2016_06_20170214_114556.jpg', '2016_06_20170214_114516.jpg', '2017_02_banner23.jpg') },
  { slug: 'cocal', seg: 'outros', nome: 'Cocal Transportes', texto: 'Cobertura estaiada em estrutura tubular branca, montada com guindaste.',
    fotos: f('2016_06_cocal-transportes-2.jpg', '2016_06_cocal-transportes-1.jpg', '2016_06_cocal-transportes-3.jpg', '2016_06_cocal-transportes-4.jpg', '2016_06_cocal-12.jpg', '2016_06_cocal-13.jpg', '2016_06_cocal-15.jpg', '2016_06_cacal-11.jpg', '2016_06_cocal-10.jpg') },
  { slug: 'praia-clube', seg: 'outros', nome: 'Praia Clube', texto: 'Passarela metálica que acompanha a margem do rio e estruturas do clube.',
    fotos: f('2016_06_Praia-Clube-Passarela-que-acompanha-margem-rio.jpg', '2016_06_Praia-Clube-1.jpg', '2016_06_Praia-Clube-5.jpg', '2016_06_Praia-Clube-2.jpg', '2016_06_Praia-Clube-3.jpg', '2016_06_Praia-Clube-4.jpg', '2016_06_Praia-Clube-6.jpg', '2016_06_Praia-Clube-7.jpg', '2016_06_Praia-Clube-8.jpg', '2016_06_Praia-Clube-9.jpg') },
  { slug: 'santa-luzia', seg: 'outros', nome: 'Terminal Santa Luzia', texto: 'Cobertura metálica do terminal de ônibus Santa Luzia, em Uberlândia.',
    fotos: f('2016_06_096.jpg', '2016_06_097.jpg', '2016_06_099.jpg', '2016_06_094.jpg') },
];

// Fotos soltas (capa, fábrica). Nome final -> original.
export const soltas = {
  'capa-fabrica': '2016_06_paralax-1.jpg',
  'fabrica-1': '2016_06_DSCN3578.jpg', 'fabrica-2': '2016_06_DSCN5023.jpg', 'fabrica-3': '2016_06_DSCN5025.jpg',
  'fabrica-4': '2016_06_DSCN5026.jpg', 'fabrica-5': '2016_06_DSCN5027.jpg', 'fabrica-6': '2016_06_DSCN5028.jpg',
  'fabrica-7': '2016_06_DSCN5036.jpg', 'fabrica-8': '2016_06_DSCN5040.jpg', 'fabrica-9': '2016_06_DSCN5042.jpg',
  'noticia-dmae-1': '2017_01_43813.jpg', 'noticia-dmae-2': '2017_01_127761547.jpg',
  'revista-cult': '2016_06_artigo-revista-_cult-113.jpg', 'predio-revista': '2016_06_predio-foto-revista.jpg',
};

// Página "Construção em aço" do site atual (dados do CBCA).
export const vantagens = [
  { nome: 'Liberdade no projeto de arquitetura', texto: 'A tecnologia do aço confere aos arquitetos total liberdade criadora, permitindo projetos arrojados e de expressão arquitetônica marcante.' },
  { nome: 'Maior área útil', texto: 'As seções dos pilares e vigas de aço são bem mais esbeltas do que as equivalentes em concreto, com melhor aproveitamento do espaço interno e mais área útil, o que pesa principalmente em garagens.' },
  { nome: 'Flexibilidade', texto: 'Indicada quando há necessidade de adaptações, ampliações, reformas e mudança de ocupação. Também facilita a passagem de água, ar condicionado, eletricidade, esgoto, telefonia e informática.' },
  { nome: 'Compatibilidade com outros materiais', texto: 'Compatível com qualquer fechamento vertical ou horizontal, dos convencionais (tijolos, blocos, lajes moldadas in loco) aos pré-fabricados (lajes e painéis de concreto, drywall).' },
  { nome: 'Menor prazo de execução', ate: true, numero: '40%', rotulo: 'menos tempo de obra', texto: 'Fabricação em paralelo com as fundações, várias frentes de serviço ao mesmo tempo, menos formas e escoramentos e montagem que não para com chuva.' },
  { nome: 'Racionalização de materiais e mão de obra', numero: '25%', rotulo: 'de desperdício evitado', texto: 'Em processos convencionais o desperdício de materiais pode chegar a 25% em peso. A estrutura em aço permite sistemas industrializados e reduz esse desperdício.' },
  { nome: 'Alívio de carga nas fundações', ate: true, numero: '30%', rotulo: 'menos custo de fundação', texto: 'Por serem mais leves, as estruturas em aço podem reduzir em até 30% o custo das fundações.' },
  { nome: 'Garantia de qualidade', texto: 'A estrutura é fabricada dentro de uma indústria, com mão de obra qualificada e rígido controle durante todo o processo.' },
  { nome: 'Antecipação do ganho', texto: 'Com a obra mais rápida, o imóvel é ocupado antes e o capital investido retorna mais cedo.' },
  { nome: 'Organização do canteiro', texto: 'Sem grandes depósitos de areia, brita, cimento, madeira e ferragens: canteiro limpo, menos entulho e mais segurança para o trabalhador.' },
  { nome: 'Precisão construtiva', numero: 'mm', rotulo: 'é a unidade de precisão', texto: 'No concreto a precisão é medida em centímetros; no aço, em milímetros. A estrutura sai aprumada e nivelada, o que facilita esquadrias, elevadores e revestimentos.' },
  { nome: 'Reciclabilidade e meio ambiente', numero: '100%', rotulo: 'reciclável', texto: 'O aço é 100% reciclável e a estrutura pode ser desmontada e reaproveitada. Reduz o uso de madeira, a poeira e o barulho na obra.' },
];

// Página "Parceiros" do site atual.
export const parceiros = {
  arquitetura: ['Andrade Guerra Arquitetos', 'Arquiteto Marcílio Ferreira Rosa', 'Arq. Milton Leite', 'Arquiteta Meigna Carrijo Pereira', 'Arquiteto Nilton Nadruz', 'Arquiteto Ronaldo Cardoso de Oliveira', 'Brandão Russo', 'Finotti Arquitetura e Urbanismo', 'Fukuoka Arquitetura e Construção Ltda.'],
  engenharia: ['Chapini Engenharia Civil e Construção Ltda.', 'Codeme Engenharia', 'Comercial Construtora Marcelo Costa', 'Conel Construtora Ltda.', 'Constrig Uberaba', 'CP Construplan Construção e Planejamento Ltda.', 'Dreste Construtora Ltda.', 'Elglobal Construtora Ltda.', 'Eng. Carlos Amaral', 'Eng. Carlos Kaufmann', 'Engº Fábio Nogueira Leite', 'Eng. Salvador', 'Engesilo', 'Gafisa S.A.', 'Grupo Andrade', 'IAM Engenharia Ltda.', 'M & M Projetos', 'MAP Engenharia Ltda.'],
};

export const noticias = [
  { slug: 'nova-sede-do-dmae', data: '2017-01-02', titulo: 'Nova sede do DMAE em Uberlândia', foto: 'noticia-dmae-1', fotos: ['noticia-dmae-1', 'noticia-dmae-2'],
    texto: [
      'A EMMIG teve a honra de participar da construção da nova sede do DMAE, Departamento Municipal de Água e Esgoto de Uberlândia, no cruzamento das avenidas Rondon Pacheco e Benjamin Magalhães, ao lado do Teatro Municipal.',
      'Projetada pelo arquiteto Zied Sabbagh, a sede substitui as instalações que a autarquia ocupou por quase cinquenta anos na região central de Uberlândia. Com área construída de 8.073 m², o novo prédio reúne os setores administrativos do DMAE, entre eles a Procuradoria Autárquica, antes instalada em salas alugadas.',
    ],
    link: { url: 'http://g1.globo.com/minas-gerais/triangulo-mineiro/mgtv-1edicao/videos/v/nova-sede-do-dmae-em-uberlandia-sera-entregue-ate-o-fim-de-novembro/5426100/', nome: 'Matéria no G1 Triângulo Mineiro (MGTV 1ª edição)' } },
  { slug: 'premio-talento-engenharia-estrutural', data: '2016-06-08', titulo: 'IX Prêmio Talento Engenharia Estrutural', foto: 'predio-revista',
    texto: ['Participação no IX Prêmio Talento Engenharia Estrutural, categoria pequeno porte: Residência Unifamiliar Condomínio Bosque Karaíba, Uberlândia (MG). Autora: Marinês Santos Cerchi. Coautora: Lorena Alves Pereira.'],
    link: { url: 'https://emmig.com.br/portal/wp-content/uploads/2016/06/Resid%C3%AAncia-Unifamiliar-Uberl%C3%A2ndia-Marin%C3%AAs-Santos-Cerchi.pdf', nome: 'Material completo em PDF' } },
  { slug: 'revista-cult-113', data: '2016-06-05', titulo: 'Artigo na revista Cult nº 113', foto: 'revista-cult',
    texto: ['A EMMIG em matéria da revista Cult, edição 113.'] },
];

// Clientes que aparecem nas obras do site atual (para a faixa de nomes).
export const clientes = ['DMAE', 'Algar', 'Cargill', 'Monsanto', 'ADM', 'Carrefour', 'Tok&Stok', 'Center Shopping', 'Bahamas', 'WBC', 'Unitri', 'Uniube', 'Colégio Gabarito', 'Praia Clube', 'Cocal', 'Tecnoseed', 'Usina Vertente', 'Usina Moema'];
