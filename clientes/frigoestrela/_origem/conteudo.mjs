// Textos do site, em português (do site atual, frigoestrela.com.br, lido em 2026-10-13) e inglês (tradução; o site atual também tem /en/).
// Cada texto é { pt, en }. Nomes de produtos ficam em português nas duas línguas, como nas embalagens.
export const T = (pt, en) => ({ pt, en });

export const site = {
  nome: 'Frigoestrela',
  dominio: 'https://frigoestrela.overtus.com.br',
  atual: 'https://frigoestrela.com.br/',
  fone: '(17) 3833-2800', foneHref: '+551738332800',
  sac: '0800 775 5656', sacHref: '08007755656',
  ouvidoria: 'https://contatoseguro.com.br/pt/frigoestrela/',
  cnpj: '52.645.009/0001-53',
  linkedin: 'https://www.linkedin.com/company/estrela-alimentos/',
  facebook: 'https://www.facebook.com/EstrelaAlimentos',
  instagram: 'https://www.instagram.com/estrelaalimentosoficial/',
  video: '565610230',
};

// Menu na mesma ordem do site atual. Sobre Nós e Marcas abrem submenu.
export const menu = [
  { s: 'sobre-nos', t: T('Sobre Nós', 'About us'), sub: [
    ['sobre-nos', T('Quem somos', 'Who we are')],
    ['unidades', T('Unidades', 'Units')],
    ['controle-de-qualidade', T('Controle de qualidade', 'Quality control')],
    ['areas-de-atuacao', T('Áreas de atuação', 'Business areas')],
  ] },
  { s: 'marcas', t: T('Marcas', 'Brands'), sub: [
    ['marcas/estrela-alimentos', T('Estrela Alimentos', 'Estrela Alimentos')],
    ['marcas/linhas-especiais', T('Linhas Especiais', 'Special Lines')],
    ['marcas/donna-estrela', T('Donna Estrela', 'Donna Estrela')],
    ['marcas/tche', T('Tchê', 'Tchê')],
  ] },
  { s: 'exportacao', t: T('Exportação', 'Export') },
  { s: 'boutique-de-carne', t: T('Boutique de Carne', 'Meat Boutique') },
  { s: 'esg', t: T('ESG', 'ESG') },
  { s: 'contato', t: T('Contato', 'Contact') },
  { s: 'trabalhe-conosco', t: T('Trabalhe Conosco', 'Careers') },
];

export const ui = {
  saibaMais: T('Saiba mais', 'Learn more'),
  conheca: T('Conheça nossa história', 'Learn our history'),
  central: T('Central de atendimento', 'Call center'),
  ouvidoria: T('Ouvidoria', 'Ombudsman'),
  ouvidoriaTxt: T('Canal independente e sigiloso para relatos e denúncias.', 'Independent, confidential channel for reports.'),
  institucional: T('Institucional', 'Company'),
  linhas: T('Linhas', 'Lines'),
  siga: T('Siga a Estrela', 'Follow Estrela'),
  privacidade: T('Política de Privacidade', 'Privacy Policy'),
  direitos: T('Todos os direitos reservados.', 'All rights reserved.'),
  inicio: T('Início', 'Home'),
  menu: T('Menu', 'Menu'),
  enviar: T('Enviar', 'Send'),
  conservacao: T('Conservação', 'Storage'),
  validade: T('Validade', 'Shelf life'),
  embalagem: T('Embalagem', 'Pack'),
  todos: T('Todos', 'All'),
  resfriado: T('Resfriado', 'Chilled'),
  congelado: T('Congelado', 'Frozen'),
  ambiente: T('Temperatura ambiente', 'Room temperature'),
  buscar: T('Buscar produto', 'Search product'),
  nenhum: T('Nenhum produto com esse nome.', 'No product with that name.'),
  produtos: T('produtos', 'products'),
  verVideo: T('Assistir ao vídeo', 'Watch the video'),
  noticias: T('Notícias', 'News'),
  lerMais: T('Ler a notícia', 'Read the story'),
  voltar: T('Voltar para notícias', 'Back to news'),
  outrasMarcas: T('Outras marcas', 'Other brands'),
  falar: T('Fale conosco', 'Contact us'),
  comoChegar: T('Ver no mapa', 'See on map'),
  ligar: T('Ligar', 'Call'),
};

export const home = {
  titulo: T('Qualidade e dedicação para sua família', 'Quality and dedication to your family'),
  intro: [
    T('Desde 1979, o Frigoestrela tem como principal objetivo levar carne de qualidade para a mesa de seus consumidores e clientes.',
      'Since 1979, Frigoestrela’s main goal has been to bring quality meat to the tables of its consumers and customers.'),
    T('Hoje, com tecnologia avançada, produz carnes bovinas e suínas, embutidos, miúdos e subprodutos com segurança, para o mercado nacional e internacional.',
      'Today, with advanced technology, it safely produces beef, pork, sausages, offal and by-products for the domestic and international markets.'),
  ],
  // Slides do site atual (mesmos produtos e ordem).
  slides: [
    { img: 'slide-linha', foto: 'linguica-queijo', k: T('Linha', 'Line'), t: T('Estrela Alimentos', 'Estrela Alimentos'), d: T('A Estrela da sua mesa.', 'The star of your table.'), s: 'marcas/estrela-alimentos' },
    { img: 'slide-tbone', foto: 'hero-tomahawk', k: T('Angus Series', 'Angus Series'), t: T('T-Bone', 'T-Bone'), d: T('Corte especial do programa Angus Frigoestrela.', 'A special cut from the Frigoestrela Angus program.'), s: 'marcas/linhas-especiais' },
    { img: 'slide-ancho', foto: 'hero-especiais', k: T('Novilha Jovem', 'Young Heifer'), t: T('Ancho', 'Ancho'), d: T('Fêmeas de até 24 meses, terminadas em confinamento.', 'Heifers up to 24 months old, feedlot finished.'), s: 'marcas/linhas-especiais' },
    { img: 'slide-tche', foto: 'hero-tche', k: T('Linha', 'Line'), t: T('Tchê', 'Tchê'), d: T('Embutidos com o sabor do Sul.', 'Sausages with the taste of southern Brazil.'), s: 'marcas/tche' },
  ],
  numeros: [
    ['1979', T('ano de fundação', 'year founded')],
    ['4', T('plantas de abate em SP, MT e RS', 'slaughter plants in SP, MT and RS')],
    ['4', T('marcas próprias', 'own brands')],
    ['4', T('continentes atendidos', 'continents served')],
  ],
  boutiqueTitulo: T('Boutique de Carne', 'Meat Boutique'),
  boutiqueSub: T('Da fábrica para sua mesa!', 'From the plant to your table!'),
  boutiqueTxt: T('Para ampliar o atendimento ao consumidor, a Boutique de Carne Estrela oferece os produtos de todas as nossas linhas e também itens para churrasco.',
    'To serve consumers even better, the Estrela Meat Boutique offers products from all our lines, plus barbecue items.'),
  marcasTitulo: T('Nossas marcas', 'Our brands'),
  noticiasTitulo: T('Grupo Estrela na comunidade', 'Grupo Estrela in the community'),
};

export const marcas = [
  { s: 'marcas/estrela-alimentos', nome: 'Estrela Alimentos', logo: 'logo-estrela', foto: 'picanha-crua',
    lema: T('A Estrela da sua mesa', 'The star of your table'),
    resumo: T('Carnes bovinas e suínas, embutidos e industrializados para o dia a dia e os momentos especiais.', 'Beef and pork, sausages and processed foods for everyday meals and special moments.') },
  { s: 'marcas/linhas-especiais', nome: 'Linhas Especiais', logo: 'logo-especiais', foto: 'angus-selection',
    lema: T('Seleção de cortes especiais', 'A selection of special cuts'),
    resumo: T('Angus Selection, Angus Series, Novilha Jovem e Suíno Selection.', 'Angus Selection, Angus Series, Young Heifer and Pork Selection.') },
  { s: 'marcas/donna-estrela', nome: 'Donna Estrela', logo: 'logo-donna', foto: 'donna-capa',
    lema: T('Ingredientes selecionados e muito sabor', 'Selected ingredients and lots of flavor'),
    resumo: T('Frios e embutidos: mortadelas, salame italiano, salaminho e calabresinha.', 'Cold cuts and sausages: mortadella, Italian salami, mini salami and calabresa.') },
  { s: 'marcas/tche', nome: 'Tchê', logo: 'logo-tche', foto: 'tche-linguica',
    lema: T('Nossa Calabresa Tchê', 'Our Tchê Calabresa'),
    resumo: T('Linhas Tchê e Refeição: mortadelas, linguiças, bacon e lanches.', 'Tchê and Refeição lines: mortadella, sausages, bacon and luncheon meat.') },
];

export const sobre = {
  titulo: T('Sobre nós', 'About us'),
  lema: T('Nosso maior compromisso é a qualidade', 'Our greatest commitment is quality'),
  txt: [
    T('Desde 1979 o Frigorífico Estrela atende os mais rigorosos padrões com instalações eficientes e equipamentos de última geração, que permitem uma linha de produção de carnes de bovinos, suínos e embutidos com qualidade no mercado nacional e internacional.',
      'Since 1979 Frigorífico Estrela has met the strictest standards with efficient facilities and state-of-the-art equipment, running a production line of quality beef, pork and sausages for the domestic and international markets.'),
    T('Todas as unidades Frigoestrela são fiscalizadas por técnicos do Serviço de Inspeção Federal (SIF), que atestam a produção de todos os animais com supervisão internacional para atender ao mercado mundial.',
      'Every Frigoestrela unit is inspected by technicians of the Federal Inspection Service (SIF), who certify the production of every animal under international supervision to serve the world market.'),
    T('Para garantir a qualidade dos produtos, são mantidos contínuos programas de melhoria e soluções integradas com laboratórios credenciados, padrões de higiene e processos de alta tecnologia e produtividade.',
      'To guarantee product quality, we run continuous improvement programs and integrated solutions with accredited laboratories, hygiene standards and high-tech, high-productivity processes.'),
    T('Observando rigorosamente as especificações determinadas por seus clientes, nossa produção busca conquistar cada vez mais destaque com as nossas marcas: Estrela Alimentos, Estrela Alimentos Linhas Especiais, Donna Estrela e Tchê.',
      'Strictly following the specifications set by our customers, our production keeps earning recognition with our brands: Estrela Alimentos, Estrela Alimentos Special Lines, Donna Estrela and Tchê.'),
    T('Todas as unidades de produção Frigoestrela estão localizadas nos estados de SP, RS e MT, além de Centros de Distribuição nas cidades de Valinhos, Bauru, Brasília e Campo Grande e um escritório comercial em São Paulo, SP.',
      'All Frigoestrela production units are located in the states of São Paulo, Rio Grande do Sul and Mato Grosso, with Distribution Centers in Valinhos, Bauru, Brasília and Campo Grande and a sales office in São Paulo.'),
  ],
  mvv: [
    { k: T('Missão', 'Mission'), t: T('Oferecer alimentos de alta qualidade, que atendam às necessidades e aos desejos dos nossos clientes.', 'To offer high-quality food that meets the needs and wishes of our customers.') },
    { k: T('Visão', 'Vision'), t: T('Ser referência no mercado de proteína animal.', 'To be a reference in the animal protein market.') },
    { k: T('Valores', 'Values'), lista: [T('Pessoas', 'People'), T('Ética', 'Ethics'), T('Paixão', 'Passion'), T('Qualidade', 'Quality'), T('Respeito', 'Respect')] },
  ],
  gestorTitulo: T('Palavra do gestor', 'A word from our CEO'),
  gestorAbre: T('Dedicação, compromisso e amor pelo que fazemos.', 'Dedication, commitment and love for what we do.'),
  gestor: [
    T('Essa sempre foi a essência do nosso crescimento e da nossa excelência profissional. Temos mostrado, dia após dia, que dedicação e amor nunca são demais quando o propósito é entregar qualidade, valorizar nossos clientes e construir um ambiente de sucesso para todo o nosso time.',
      'That has always been the essence of our growth and professional excellence. Day after day we have shown that dedication and love are never too much when the purpose is to deliver quality, value our customers and build a successful environment for our whole team.'),
    T('Desde a fundação da empresa, em 1979, seguimos construindo nossa trajetória com trabalho, responsabilidade, ética e união. E é justamente essa constância que nos permitiu crescer de forma sólida ao longo dos anos.',
      'Since the company was founded in 1979, we have built our path with work, responsibility, ethics and unity. That consistency is exactly what has allowed us to grow solidly over the years.'),
    T('Hoje, o Grupo Estrela se tornou referência em princípios éticos, transparência e credibilidade, graças ao empenho diário de cada colaborador que faz parte dessa história. Nossa honestidade caminha lado a lado com a confiança de trabalhar com pessoas que compartilham dos mesmos valores e da mesma integridade em cada atividade realizada.',
      'Today Grupo Estrela is a reference in ethical principles, transparency and credibility, thanks to the daily effort of every employee who is part of this story. Our honesty goes hand in hand with the trust of working with people who share the same values and integrity in everything they do.'),
    T('Se hoje alcançamos grandes resultados, devemos isso à dedicação, ao comprometimento e à confiança de cada membro da nossa equipe. Por isso, seguimos trabalhando diariamente com orgulho, responsabilidade e paixão pelo que fazemos.',
      'If we achieve great results today, we owe it to the dedication, commitment and trust of every member of our team. That is why we keep working every day with pride, responsibility and passion for what we do.'),
    T('Amamos as nossas empresas, o Grupo Estrela, e temos satisfação em fazer parte dessa história construída com seriedade e excelência. É essa dedicação coletiva que nos inspira a continuar evoluindo, crescendo e construindo um futuro cada vez melhor, dia após dia.',
      'We love our companies, Grupo Estrela, and we are proud to be part of this story built with seriousness and excellence. This collective dedication inspires us to keep evolving, growing and building a better future, day after day.'),
  ],
  gestorNome: 'Etivaldo Vadão Gomes',
  gestorCargo: T('Fundador do Grupo Estrela', 'Founder of Grupo Estrela'),
};

// Unidades (página /unidades/ do site atual). tipo: chave de tiposUnidade.
export const tiposUnidade = {
  bovinos: { t: T('Abate de bovinos', 'Cattle slaughter'), cor: '#1f3f8f' },
  suinos: { t: T('Abate de suínos', 'Pig slaughter'), cor: '#2aa6dc' },
  industriais: { t: T('Industrializados', 'Processed foods'), cor: '#f2c230' },
  cd: { t: T('Centro de distribuição', 'Distribution center'), cor: '#c8102e' },
  escritorio: { t: T('Escritório comercial', 'Sales office'), cor: '#8a8a8a' },
};
export const unidades = [
  { n: "Estrela d'Oeste", uf: 'SP', tipos: ['bovinos', 'industriais'], end: "Chácara Aparecida, Zona Rural, Estrela d'Oeste - SP", fone: '(17) 3833-2800', x: 61, y: 61 },
  { n: 'Rondonópolis', uf: 'MT', tipos: ['bovinos'], end: 'Rodovia BR 163, s/n, km 112, Rondonópolis - MT', fone: '(66) 3410-4900', x: 50, y: 52 },
  { n: 'Tupã', uf: 'SP', tipos: ['suinos'], end: 'Rod. Tupã Queiroz, Alto da Vila Marabá, Tupã - SP', fone: '(14) 3404-2800', x: 59, y: 66 },
  { n: 'São Luiz Gonzaga', uf: 'RS', tipos: ['suinos', 'industriais'], end: 'Rua Vicente Ferrer do Prado, s/n, Raimundo Gomes, São Luiz Gonzaga - RS', fone: '(55) 3352-8000', x: 51, y: 84 },
  { n: 'Valinhos', uf: 'SP', tipos: ['cd'], end: 'Estrada Lino Giovani Brugnoli, 120, Valinhos - SP', fone: '(19) 2137-2800', x: 66, y: 68 },
  { n: 'Recife', uf: 'PE', tipos: ['cd'], end: 'Avenida Assedipe, Quadra A, Lote 13, s/n, Timbó, Abreu e Lima - PE', fone: '(81) 3366-4200', x: 91, y: 33 },
  { n: 'São Paulo', uf: 'SP', tipos: ['escritorio'], end: 'Rua Carlos do Pinhal, 696, 10º andar, Alto da Boa Vista, São Paulo - SP', fone: '(11) 3016-2190', x: 67, y: 71 },
];
export const unidadesTxt = T('Conheça a localização de todas as unidades Frigoestrela e entre em contato com o telefone da sua região.',
  'Find every Frigoestrela unit and contact the phone number for your region.');

export const qualidade = {
  titulo: T('Controle de qualidade', 'Quality control'),
  sub: T('Qualidade Frigoestrela', 'Frigoestrela quality'),
  txt: [
    T('O Frigoestrela se dedica continuamente a produzir carnes de alto padrão, com a participação de todos os setores, da compra dos animais ao atendimento ao consumidor.',
      'Frigoestrela is continuously dedicated to producing high-standard meat, with every department involved, from buying the animals to serving the consumer.'),
    T('A qualidade da carne depende de procedimentos de segurança e de padrões que envolvem bem-estar animal, cuidados sanitários, nutrição e sustentabilidade.',
      'Meat quality depends on safety procedures and standards covering animal welfare, sanitary care, nutrition and sustainability.'),
  ],
  // Etapas do processo, na ordem em que acontecem (textos das seções Parcerias e Processos).
  etapas: [
    { t: T('Parcerias com fazendas', 'Farm partnerships'), d: T('O setor de Compra de Gado faz auditorias rigorosas e seleciona fazendas que atendem às exigências de bem-estar animal, criação, manejo pré-abate e transporte.', 'Our Cattle Purchasing team runs strict audits and selects farms that meet animal welfare, breeding, pre-slaughter handling and transport requirements.'), foto: 'qualidade-gado' },
    { t: T('Transporte e bem-estar', 'Transport and welfare'), d: T('O transporte até as unidades segue as boas práticas de bem-estar animal, inclusive no desembarque e no manejo antes da produção.', 'Transport to our units follows animal welfare best practices, including unloading and handling before production.') },
    { t: T('Autocontrole MAPA', 'MAPA self-control'), d: T('Toda a linha de produção tem programas de autocontrole exigidos e fiscalizados pelo Ministério da Agricultura, Pecuária e Abastecimento (MAPA) e pelos países importadores.', 'The whole production line runs self-control programs required and inspected by the Ministry of Agriculture (MAPA) and by importing countries.') },
    { t: T('Boas Práticas de Fabricação', 'Good Manufacturing Practices'), d: T('Todos os colaboradores da fábrica são treinados em BPF, que orientam todos os dias a higiene pessoal, de equipamentos, instalações e áreas comuns, e os cuidados na produção.', 'Every plant employee is trained in GMP, which guides personal, equipment, facility and common-area hygiene and care in production every day.'), foto: 'qualidade-equipe' },
    { t: T('Procedimentos Sanitários', 'Sanitary procedures'), d: T('Toda a operação segue os Procedimentos Sanitários Operacionais (PSO).', 'The entire operation follows Sanitation Standard Operating Procedures (SSOP).') },
    { t: T('Laboratórios credenciados', 'Accredited laboratories'), d: T('Programas contínuos de melhoria e soluções integradas com laboratórios credenciados, padrões de higiene e processos de alta tecnologia.', 'Continuous improvement programs and integrated solutions with accredited laboratories, hygiene standards and high-tech processes.'), foto: 'qualidade-lab' },
  ],
};

export const atuacao = {
  titulo: T('Áreas de atuação', 'Business areas'),
  txt: [
    T('Com uma linha de produção de alto padrão, o Frigoestrela abastece o mercado nacional e internacional com carnes para consumo e também com subprodutos e insumos para diversos setores.',
      'With a high-standard production line, Frigoestrela supplies the domestic and international markets with meat and also with by-products and raw materials for many industries.'),
    T('Toda a matéria-prima é aproveitada, o que reduz perdas e descartes no meio ambiente. Nosso objetivo é uma produção sustentável.',
      'All raw material is used, which reduces losses and waste in the environment. Our goal is sustainable production.'),
  ],
  mercados: [
    { ic: 'gota', t: T('Proteína e gordura animal', 'Animal protein and fat'), u: T("Estrela d'Oeste (SP, bovinos), Tupã (SP, suínos) e Rondonópolis (MT, bovinos)", "Estrela d'Oeste (SP, cattle), Tupã (SP, pigs) and Rondonópolis (MT, cattle)"),
      d: T('Reciclagem de resíduos animais, todos inspecionados pelo SIF, em três graxarias: duas de origem bovina e uma suína. Atende biodiesel, sabões e sabonetes, pet, nutrição animal, oleoquímica e farmacêutico.', 'Recycling of animal residues, all SIF-inspected, in three rendering plants: two for cattle and one for pigs. Serves biodiesel, soaps, pet, animal nutrition, oleochemical and pharmaceutical industries.') },
    { ic: 'couro', t: T('Couros', 'Hides'), d: T('Couro curtido (wet blue) para calçados, indústria automobilística, estofados e acessórios como bolsas e cintos.', 'Tanned leather (wet blue) for footwear, automotive, upholstery and accessories such as bags and belts.') },
    { ic: 'pet', t: T('Mercado pet', 'Pet market'), u: T("Estrela d'Oeste (SP), Tupã (SP) e Rondonópolis (MT)", "Estrela d'Oeste (SP), Tupã (SP) and Rondonópolis (MT)"),
      d: T('16 itens para o setor pet: oito de origem bovina (vísceras, ossos e partes), uma carne industrial e sete de origem suína.', '16 items for the pet industry: eight of bovine origin (offal, bones and parts), one industrial meat and seven of porcine origin.') },
    { ic: 'tripa', t: T('Envoltórios (tripas)', 'Natural casings'), u: T("Estrela d'Oeste (SP), Tupã (SP) e Rondonópolis (MT)", "Estrela d'Oeste (SP), Tupã (SP) and Rondonópolis (MT)"),
      d: T('Envoltórios naturais bovinos e suínos para indústrias de alimentos, açougues e fábricas artesanais. Produção mensal de tripas bovinas de primeiro e segundo corte e tripas suínas longa, média e curta.', 'Natural beef and pork casings for food industries, butchers and artisan makers. Monthly production of first and second cut beef casings and long, medium and short pork casings.') },
    { ic: 'cruz', t: T('Farmacêutico', 'Pharmaceutical'), u: T("Estrela d'Oeste (SP), Tupã (SP) e Rondonópolis (MT)", "Estrela d'Oeste (SP), Tupã (SP) and Rondonópolis (MT)"),
      d: T('Matérias-primas para medicamentos e produtos médico-hospitalares: sangue fetal bovino, membrana do pericárdio bovino, traqueia bovina, válvula de leitão e traqueia suína.', 'Raw materials for medicines and medical products: fetal bovine blood, bovine pericardium membrane, bovine trachea, piglet valve and pig trachea.') },
  ],
};

export const exportacao = {
  titulo: T('Exportação', 'Export'),
  sub: T('Exportamos para diversos países', 'We export to many countries'),
  txt: [
    T('O Frigoestrela exporta para países da América do Sul, da União Europeia e da Ásia, seguindo protocolos rigorosos de sanidade, segurança e controle de qualidade.',
      'Frigoestrela exports to countries in South America, the European Union and Asia, following strict health, safety and quality control protocols.'),
    T('Com a certificação Halal, também atendemos os países islâmicos.', 'With Halal certification, we also serve Islamic countries.'),
  ],
  destaque: T('Alcatra Novilha Jovem', 'Young Heifer Rump'),
  regioes: [
    { r: T('Europa', 'Europe'), p: [T('Alemanha', 'Germany'), T('Holanda', 'Netherlands'), T('Suécia', 'Sweden'), T('Itália', 'Italy')] },
    { r: T('Ásia', 'Asia'), p: [T('China', 'China'), T('Hong Kong', 'Hong Kong'), T('Filipinas', 'Philippines'), T('Vietnã', 'Vietnam')] },
    { r: T('África', 'Africa'), p: [T('Angola', 'Angola'), T('Congo', 'Congo'), T('Costa do Marfim', 'Ivory Coast')] },
    { r: T('Américas', 'Americas'), p: [T('Bolívia', 'Bolivia'), T('Estados Unidos (SIF 2924 habilitado)', 'United States (SIF 2924 approved)')] },
  ],
  halal: T('Certificação Halal', 'Halal certified'),
};

export const boutique = {
  titulo: T('Boutique de Carne', 'Meat Boutique'),
  sub: T('Da fábrica para sua mesa', 'From the plant to your table'),
  chamada: T('Conheça nossas boutiques de carne', 'Visit our meat boutiques'),
  txt: T('Todas as nossas marcas para você compartilhar conosco a paixão pela carne.', 'All our brands, so you can share our passion for meat.'),
  lojas: [
    { n: "Estrela d'Oeste - SP", end: 'Rua Mato Grosso, 670, Centro, CEP 15650-000', fone: '(17) 3833-2860' },
    { n: 'São José do Rio Preto - SP', end: 'Av. Pres. Juscelino K. de Oliveira, 1450, Jardim Panorama, CEP 15091-235', fone: '(17) 3216-2025' },
  ],
};

export const esg = {
  titulo: T('ESG', 'ESG'),
  sub: T('Gestão socioambiental e rastreabilidade', 'Social-environmental management and traceability'),
  atualizado: T('Atualização: março de 2026', 'Updated: March 2026'),
  sust: [
    T('A sustentabilidade é tema central no Frigoestrela. Atuamos na conservação ambiental e no bem-estar animal e mantemos programas de capacitação em todas as unidades sobre a proteção da fauna e da flora brasileiras.',
      'Sustainability is central at Frigoestrela. We work on environmental conservation and animal welfare, and run training programs in every unit on protecting Brazilian fauna and flora.'),
    T('Com três unidades de graxaria, a empresa também opera o ciclo de reciclagem animal, que gera empregos, movimenta a economia e apoia o desempenho sustentável.',
      'With three rendering units, the company also runs the animal recycling cycle, which creates jobs, moves the economy and supports sustainable performance.'),
    T('Desenvolvemos diversos projetos de proteção ambiental, com investimentos que somam milhões de reais. Para nós, o compromisso com o meio ambiente é, além de obrigação, uma satisfação moral.',
      'We run several environmental protection projects, with investments totaling millions of reais. For us, commitment to the environment is a moral satisfaction as well as an obligation.'),
  ],
  governancaTitulo: T('Governança da cadeia de suprimento bovino', 'Governance of the cattle supply chain'),
  governanca: [
    T('A Frigoestrela S/A mantém uma estrutura corporativa de gestão socioambiental da cadeia de gado, com controles formais de monitoramento, rastreabilidade e verificação de conformidade de fornecedores diretos e indiretos, no âmbito do protocolo SARB 026.',
      'Frigoestrela S/A maintains a corporate social-environmental management structure for its cattle chain, with formal monitoring, traceability and compliance checks for direct and indirect suppliers under the SARB 026 protocol.'),
    T('Os controles incluem consulta ao SICAR, monitoramento de embargos ambientais, verificação de sobreposição com áreas de desmatamento, Unidades de Conservação, Terras Indígenas e territórios quilombolas, e consulta a cadastros de trabalho análogo à escravidão. A companhia mantém os registros de aquisição de animais, com Notas Fiscais e GTAs.',
      'Checks include SICAR queries, monitoring of environmental embargoes, overlap checks with deforested areas, Conservation Units, Indigenous Lands and quilombola territories, and checks against slave-like labor registries. The company keeps animal purchase records, with invoices and GTAs.'),
  ],
  linha: [
    ['2020', T('Planejamento do rastreamento total de fornecedores.', 'Planning of full supplier traceability.')],
    ['2021', T('Implantação da tecnologia de rastreamento, com a adoção do AGROTOOLS.', 'Traceability technology deployed, adopting AGROTOOLS.')],
    ['2022', T('Cadastro dos fornecedores diretos na plataforma. Com o CAR e a GTA, passa a ser possível consultar irregularidades ambientais.', 'Direct suppliers registered on the platform. With CAR and GTA data, environmental irregularities can be checked.')],
    ['2023', T('100% dos fornecedores diretos rastreados, com PRODES e DETER para identificar desmatamento na Amazônia e no Cerrado e trabalho análogo à escravidão.', '100% of direct suppliers traced, using PRODES and DETER to detect deforestation in the Amazon and Cerrado and slave-like labor.')],
    ['2024', T('Orientação e apoio aos pecuaristas parceiros sobre a importância do rastreamento de toda a cadeia.', 'Guidance and support for partner ranchers on tracing the whole chain.')],
    ['2025', T('Avanço no mapeamento e rastreamento dos fornecedores indiretos.', 'Progress in mapping and tracing indirect suppliers.')],
    ['2026', T('Planta de Rondonópolis (MT) alcança 100% de conformidade integral.', 'Rondonópolis (MT) plant reaches 100% full compliance.')],
    ['2029', T('Meta: cumprir todas as metas da SARB 026/2023, se possível antes do prazo.', 'Goal: meet every SARB 026/2023 target, ahead of schedule if possible.')],
  ],
  indicadoresTitulo: T('Evolução dos indicadores, planta de Rondonópolis (MT)', 'Indicators, Rondonópolis (MT) plant'),
  indicadores: [
    [T('Cabeças de gado abatidas rastreadas e monitoradas até os fornecedores diretos', 'Cattle slaughtered, traced and monitored to direct suppliers'), '100%', '100%'],
    [T('Cabeças de gado abatidas rastreadas e monitoradas até os fornecedores indiretos', 'Cattle slaughtered, traced and monitored to indirect suppliers'), '100%', '100%'],
    [T('Cabeças de gado abatidas em conformidade integral com os critérios de monitoramento e compromisso', 'Cattle slaughtered in full compliance with monitoring and commitment criteria'), '84,66%', '100%'],
  ],
  colunas: [T('Fechamento de 2025', 'End of 2025'), T('Janeiro de 2026', 'January 2026')],
  ferramentas: [
    ['VISIPEC', T('Implantado com a National Wildlife Federation (NWF) para identificar e verificar fornecedores indiretos, cruzando dados do SICAR e das GTAs.', 'Deployed with the National Wildlife Federation (NWF) to identify and verify indirect suppliers by cross-checking SICAR and GTA data.')],
    ['GTFI', T('Fórum multissetorial que desenvolve soluções de rastreabilidade, transparência e monitoramento de fornecedores indiretos na cadeia da carne bovina.', 'Multi-stakeholder forum developing traceability, transparency and indirect-supplier monitoring solutions for the beef chain.')],
    ['Niceplanet', T('Monitoramento socioambiental remoto da cadeia produtiva.', 'Remote social-environmental monitoring of the supply chain.')],
    ['AGROTOOLS', T('Análise geográfica da cadeia e robustez em compliance e ESG.', 'Geographic analysis of the chain and robust compliance and ESG.')],
  ],
};

export const noticias = [
  { s: 'reciclar-para-transformar', img: 'noticia-reciclar', data: '2026-09-23',
    t: T('Reciclar para transformar', 'Recycling to transform'),
    r: T('Há mais de dez anos, o Frigoestrela é parceiro do Lar São Francisco de Assis.', 'For more than ten years, Frigoestrela has partnered with Lar São Francisco de Assis.'),
    p: [
      T('Há mais de dez anos, o Frigoestrela mantém uma parceria com o Lar São Francisco de Assis. A empresa envia à instituição papelão e outros resíduos industriais que podem ser reaproveitados. O Lar separa, organiza e comercializa esses materiais, e a renda sustenta suas atividades e o atendimento a pessoas em recuperação da dependência de álcool e outras drogas.',
        'For more than ten years, Frigoestrela has partnered with Lar São Francisco de Assis. The company sends the institution cardboard and other reusable industrial waste. The Lar sorts, organizes and sells these materials, and the income funds its work with people recovering from alcohol and drug addiction.'),
      T('Os participantes do programa também ajudam no manuseio e na preparação dos materiais. A atividade ajuda a criar rotina, senso de responsabilidade, autonomia e cooperação, e favorece a reinserção social e o retorno ao trabalho.',
        'Program participants also help handle and prepare the materials. The activity builds routine, responsibility, autonomy and cooperation, and supports social reintegration and the return to work.'),
      T('A iniciativa une responsabilidade ambiental e desenvolvimento humano. Todos ganham: os materiais voltam à cadeia produtiva, o descarte correto é reforçado, a instituição recebe recursos e as pessoas atendidas ganham novas possibilidades.',
        'The initiative brings together environmental responsibility and human development. Everyone wins: materials return to the production chain, proper disposal is reinforced, the institution receives funds and the people it serves gain new possibilities.'),
    ] },
  { s: 'equoterapia', img: 'noticia-equoterapia', data: '2026-09-23',
    t: T('Equoterapia Vadão Gomes: uma conexão que transforma vidas', 'Vadão Gomes Equine Therapy: a bond that changes lives'),
    r: T('Projeto em parceria com a APAE de Estrela d’Oeste usa o cavalo como ferramenta terapêutica.', 'A project with APAE Estrela d’Oeste that uses horses as a therapeutic tool.'),
    p: [
      T('Ao longo da carreira, o empresário Vadão Gomes manteve uma ligação próxima com iniciativas que beneficiam a comunidade. Da combinação entre sua afinidade com o meio rural, sua afeição pelos animais e seu engajamento em causas sociais surgiu a Equoterapia Vadão Gomes, realizada em parceria com a APAE de Estrela d’Oeste.',
        'Throughout his career, businessman Vadão Gomes has stayed close to initiatives that benefit the community. His affinity with rural life, his love of animals and his commitment to social causes gave rise to Vadão Gomes Equine Therapy, run in partnership with APAE Estrela d’Oeste.'),
      T('O projeto usa o cavalo como ferramenta terapêutica e educativa para crianças e pessoas com deficiência. Os movimentos do animal ajudam no equilíbrio, na coordenação motora, na percepção do corpo e na força muscular, e a convivência estimula a autoconfiança, a autoestima, a autonomia e a socialização. Cada sessão respeita o ritmo de quem participa.',
        'The project uses the horse as a therapeutic and educational tool for children and people with disabilities. The animal’s movement helps balance, motor coordination, body awareness and muscle strength, and the contact builds self-confidence, self-esteem, autonomy and social skills. Each session respects the participant’s pace.'),
      T('Para Vadão Gomes, o empreendedor deve pensar no bem que pode fazer ao próximo, e não apenas no que pode conquistar para si. O projeto reúne duas paixões: os animais e o cuidado com as crianças. Cuidar de uma região inclui cuidar de quem vive nela.',
        'For Vadão Gomes, entrepreneurs should think about the good they can do for others, not only what they can achieve for themselves. The project brings together two passions: animals and caring for children. Caring for a region includes caring for the people who live there.'),
    ] },
  { s: 'cuidar', img: 'noticia-regiao', data: '2026-09-23',
    t: T('Quando cuidar de uma região também significa lutar pela vida', 'When caring for a region also means fighting for life'),
    r: T('A participação de Vadão Gomes na criação do Hospital de Amor de Jales.', 'Vadão Gomes’ role in founding Hospital de Amor in Jales.'),
    p: [
      T('Etivaldo “Vadão” Gomes, fundador do Grupo Estrela, participou da mobilização que levou à criação do Hospital de Amor de Jales, no interior paulista. A iniciativa começou como um ambulatório regional de prevenção e combate ao câncer, para reduzir os longos deslocamentos de pacientes de vários municípios. A Câmara Municipal de Jales homenageou Vadão por sua contribuição nessa fase.',
        'Etivaldo “Vadão” Gomes, founder of Grupo Estrela, took part in the effort that led to Hospital de Amor in Jales, in inland São Paulo. It began as a regional cancer prevention clinic, to cut the long trips patients from many towns had to make. Jales City Council honored Vadão for his contribution at that stage.'),
      T('Com a Fundação Pio XII, mantenedora do Hospital de Amor de Barretos, o projeto se tornou um hospital completo, o primeiro da rede fora de Barretos. Hoje atende pacientes de centenas de municípios, com diagnóstico, quimioterapia, radioterapia, cirurgia oncológica, internação e atendimento multiprofissional.',
        'With the Pio XII Foundation, which runs Hospital de Amor in Barretos, the project grew into a full hospital, the network’s first outside Barretos. Today it treats patients from hundreds of towns, with diagnosis, chemotherapy, radiotherapy, cancer surgery, inpatient care and multidisciplinary support.'),
      T('Uma empresa pode contribuir com o desenvolvimento de sua região de muitas formas, inclusive com ações que não aparecem na linha de produção nem no balanço. O desenvolvimento também se constrói quando pessoas, instituições e lideranças se unem.',
        'A company can contribute to its region’s development in many ways, including actions that never show up on the production line or the balance sheet. Development is also built when people, institutions and leaders come together.'),
    ] },
];
// Destaques do slider atual que não têm página de notícia no site (texto vem do próprio banner).
export const destaques = [
  { img: 'noticia-eua', t: T('SIF 2924 habilitado para os Estados Unidos', 'SIF 2924 approved for the United States') },
  { img: 'noticia-datagro', t: T('Grupo Estrela recebe premiação Ouro no Indicador do Boi DATAGRO', 'Grupo Estrela wins Gold at the DATAGRO Cattle Indicator awards') },
];

export const contato = {
  titulo: T('Fale conosco', 'Contact us'),
  txt: T('Escolha o assunto e envie sua mensagem. Para falar agora, ligue para a central ou para o SAC.', 'Choose a subject and send your message. To talk now, call our call center or customer service.'),
  assuntos: [T('Reclamação', 'Complaint'), T('Elogio', 'Compliment'), T('Dúvidas', 'Questions'), T('Exportação', 'Export')],
  campos: { nome: T('Nome', 'Name'), email: T('E-mail', 'E-mail'), fone: T('Telefone', 'Phone'), cidade: T('Cidade', 'City'), assunto: T('Assunto', 'Subject'), msg: T('Mensagem', 'Message') },
  enviado: T('Mensagem pronta para envio. Nesta prévia o formulário ainda não está ligado ao e-mail da Frigoestrela.', 'Message ready. In this preview the form is not yet connected to Frigoestrela’s e-mail.'),
};

export const vagas = {
  titulo: T('Trabalhe conosco', 'Careers'),
  txt: T('Faça parte do Grupo Estrela. Preencha o cadastro e anexe seu currículo em PDF ou DOC.', 'Join Grupo Estrela. Fill in the form and attach your résumé as a PDF or DOC.'),
  pcd: T('Temos vagas para Pessoas com Deficiência (PcD). A diversidade e a inclusão fazem parte da nossa cultura: venha trabalhar conosco.', 'We have openings for People with Disabilities. Diversity and inclusion are part of our culture: come work with us.'),
  campos: [
    ['nome', T('Nome', 'Name'), 'text'], ['fone', T('Telefone', 'Phone'), 'tel'], ['email', T('E-mail', 'E-mail'), 'email'], ['cpf', T('CPF', 'CPF (Brazilian ID)'), 'text'],
    ['cidade', T('Cidade', 'City'), 'text'], ['bairro', T('Bairro', 'District'), 'text'],
  ],
  familia: T('Possui familiares na empresa?', 'Do you have relatives working here?'),
  jaTrabalhou: T('Já trabalhou na empresa ou no ramo?', 'Have you worked for us or in this industry?'),
  sim: T('Sim', 'Yes'), nao: T('Não', 'No'),
  experiencia: T('Experiência', 'Experience'),
  arquivo: T('Currículo (PDF ou DOC)', 'Résumé (PDF or DOC)'),
};
