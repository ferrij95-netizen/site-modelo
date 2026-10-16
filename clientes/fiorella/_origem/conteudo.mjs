// Textos do site da Fiorella Brasil em pt / en / es.
// Fonte: site atual (fiorellaonline.com, Wix, com as três línguas) e as fichas dos produtos da FiorellaShop
// (fiorellashop.com.br, Tray). Tudo que é dado (gramaturas, larguras, números, endereço) vem de lá.
// Cada texto traduzível é [pt, en, es].

export const LANGS = ['pt', 'en', 'es'];
export const LOCALE = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };
export const HTMLLANG = { pt: 'pt-BR', en: 'en', es: 'es' };

export const site = {
  nome: 'Fiorella Brasil',
  razao: 'Fiorella Brasil Indústria e Comércio Têxtil Ltda.',
  cnpj: '33.460.396/0001-09',
  fone: '+55 (11) 4718-8000',
  foneHref: '+551147188000',
  whats: '551147188000',
  email: 'fiorella@fiorella.ind.br',
  emailLoja: 'sac@fiorella.ind.br',
  loja: 'https://www.fiorellashop.com.br/',
  instagram: 'https://www.instagram.com/fiorellabrasil_',
  waze: 'https://waze.com/ul/h6gy6ne924',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Avenida+do+Caf%C3%A9+1000+Distrito+Industrial+Mairinque+SP',
  mapaEmbed: 'https://www.google.com/maps?q=Avenida+do+Caf%C3%A9,+1000,+Distrito+Industrial,+Mairinque+-+SP,+18121-141&output=embed',
  dominio: 'https://fiorella.overtus.com.br',
  atual: 'https://www.fiorellaonline.com/',
  endereco: ['Avenida do Café, nº 1.000, Distrito Industrial, Mairinque/SP, Brasil, CEP 18121-141', 'Avenida do Café, 1,000, Industrial District, Mairinque/SP, Brazil, ZIP 18121-141', 'Avenida do Café, nº 1.000, Distrito Industrial, Mairinque/SP, Brasil, CP 18121-141'],
};

// Interface
export const UI = {
  tag: ['Nãotecidos | Nonwovens', 'Nonwovens | Nãotecidos', 'No tejidos | Nonwovens'],
  inicio: ['Início', 'Home', 'Inicio'],
  produtos: ['Produtos', 'Products', 'Productos'],
  empresa: ['Sobre nós', 'About us', 'Sobre nosotros'],
  contato: ['Contato', 'Contact', 'Contacto'],
  loja: ['Loja', 'Shop', 'Tienda'],
  lojaNome: ['Loja da fábrica', 'Factory store', 'Tienda de fábrica'],
  falar: ['Falar com a Fiorella', 'Talk to Fiorella', 'Hablar con Fiorella'],
  whats: ['WhatsApp', 'WhatsApp', 'WhatsApp'],
  orcamento: ['Pedir orçamento', 'Request a quote', 'Pedir presupuesto'],
  comprar: ['Comprar na loja', 'Buy online (Brazil)', 'Comprar en la tienda (Brasil)'],
  verProdutos: ['Ver produtos', 'See products', 'Ver productos'],
  verLinha: ['Ver a linha', 'See the range', 'Ver la línea'],
  saibaMais: ['Saiba mais', 'Learn more', 'Más información'],
  todos: ['Todos', 'All', 'Todos'],
  gramatura: ['Gramatura', 'Weight', 'Gramaje'],
  composicao: ['Composição', 'Composition', 'Composición'],
  larguras: ['Larguras', 'Widths', 'Anchos'],
  comprimentos: ['Comprimentos', 'Lengths', 'Largos'],
  aplicacao: ['Aplicação', 'Application', 'Aplicación'],
  referencia: ['Referência', 'Reference', 'Referencia'],
  linha: ['Linha', 'Range', 'Línea'],
  mercados: ['Mercados', 'Markets', 'Mercados'],
  idioma: ['Idioma', 'Language', 'Idioma'],
  menu: ['Menu', 'Menu', 'Menú'],
  links: ['Links rápidos', 'Quick links', 'Enlaces rápidos'],
  siga: ['Siga-nos', 'Follow us', 'Síguenos'],
  localizacao: ['Localização', 'Location', 'Ubicación'],
  atendimento: ['Atendimento', 'Customer service', 'Atención'],
  comoChegar: ['Como chegar', 'Directions', 'Cómo llegar'],
  direitos: ['Todos os direitos reservados.', 'All rights reserved.', 'Todos los derechos reservados.'],
  enviar: ['Enviar pelo WhatsApp', 'Send via WhatsApp', 'Enviar por WhatsApp'],
  nome: ['Nome', 'Name', 'Nombre'],
  empresaCampo: ['Empresa', 'Company', 'Empresa'],
  telefone: ['Telefone', 'Phone', 'Teléfono'],
  mercadoCampo: ['Mercado', 'Market', 'Mercado'],
  mensagem: ['Mensagem', 'Message', 'Mensaje'],
  mensagemPh: ['Conte o que você precisa: aplicação, gramatura, largura, quantidade...', 'Tell us what you need: application, weight, width, quantity...', 'Cuéntenos lo que necesita: aplicación, gramaje, ancho, cantidad...'],
  outro: ['Outro', 'Other', 'Otro'],
  voltar: ['Voltar ao topo', 'Back to top', 'Volver arriba'],
  emDestaque: ['Em destaque', 'Featured', 'Destacado'],
  tambemNaLoja: ['Também na loja', 'Also in the store', 'También en la tienda'],
  fichaTecnica: ['Ficha técnica', 'Specifications', 'Ficha técnica'],
  desenvolvimento: ['Desenvolvimento sob medida', 'Custom development', 'Desarrollo a medida'],
  oQueInformar: ['O que informar no pedido', 'What to include in your request', 'Qué informar en el pedido'],
};

// Números do site atual
export const numeros = [
  { n: '+18', u: ['milhões', 'million', 'millones'], t: ['metros de nãotecidos produzidos a cada ano', 'meters of nonwovens produced every year', 'metros de no tejidos producidos cada año'] },
  { n: '+2', u: ['mil', 'thousand', 'mil'], t: ['clientes atendidos a cada ano', 'customers served every year', 'clientes atendidos cada año'] },
  { n: '50.000', u: ['m²', 'm²', 'm²'], t: ['de área em Mairinque (SP)', 'site in Mairinque (SP)', 'de área en Mairinque (SP)'] },
  { n: '1977', u: ['', '', ''], t: ['ano de fundação', 'year founded', 'año de fundación'] },
];

export const textos = {
  heroEyebrow: ['Indústria de nãotecidos desde 1977', 'Nonwovens manufacturer since 1977', 'Industria de no tejidos desde 1977'],
  heroTitulo: ['Nãotecidos para aplicações diversas', 'Nonwovens for various applications', 'No tejidos para diversas aplicaciones'],
  heroTituloB: ['49 anos de tradição em nãotecidos', '49 years of tradition in nonwovens', '49 años de tradición en no tejidos'],
  heroLead: ['Nãotecidos resinados em poliéster e/ou viscose, especialmente desenvolvidos para cada finalidade: entretelas para bordado e confecção, proteção automotiva, filtros, materiais de limpeza e aplicações especiais.', 'Chemical bonding nonwovens in polyester and/or viscose, specially developed for each purpose: interlinings for embroidery and clothing, automotive protection, filtration, cleaning materials and special applications.', 'No tejidos resinados en poliéster y/o viscosa, desarrollados especialmente para cada finalidad: entretelas para bordado y confección, protección automotriz, filtros, materiales de limpieza y aplicaciones especiales.'],
  anos: ['49 anos de tradição', '49 years of tradition', '49 años de tradición'],
  iso: ['Certificado ISO 9001:2015', 'ISO 9001:2015 certified', 'Certificación ISO 9001:2015'],
  americas: ['Brasil e Américas', 'Brazil and the Americas', 'Brasil y las Américas'],
  mercadosTitulo: ['Escolha pelo seu mercado', 'Choose by market', 'Elija por su mercado'],
  mercadosLead: ['Cada nãotecido Fiorella é desenvolvido para uma aplicação. Comece pelo que você produz.', 'Every Fiorella nonwoven is developed for an application. Start with what you make.', 'Cada no tejido Fiorella se desarrolla para una aplicación. Empiece por lo que usted produce.'],
  sobreTitulo: ['Sobre a Fiorella', 'About Fiorella', 'Sobre la Fiorella'],
  sobre: [
    ['A Fiorella Brasil é uma indústria de nãotecidos fundada em 1977, fabricante de nãotecidos resinados em poliéster e/ou viscose para segmentos diversos.', 'Fiorella Brasil is a nonwovens manufacturer founded in 1977, producing chemical bonding nonwovens in polyester and/or viscose for a wide range of segments.', 'Fiorella Brasil es una industria de no tejidos fundada en 1977, fabricante de no tejidos resinados en poliéster y/o viscosa para diversos segmentos.'],
    ['Através do emprego de tecnologia, eficiência na execução de processos e muita dedicação de toda sua equipe, atravessou esses longos anos com muito sucesso.', 'Through the use of technology, efficient processes and the great dedication of its entire team, it has come through these many years with great success.', 'Mediante el uso de tecnología, la eficiencia en la ejecución de los procesos y la dedicación de todo su equipo, ha recorrido estos largos años con mucho éxito.'],
    ['A experiência acumulada em décadas de história lhe confere tradição e conhecimento de todo o processo de fabricação de nãotecidos. A crescente demanda por produtos inovadores levou a Fiorella a investir em modernos sistemas de produção, alcançando a excelência exigida por padrões internacionais.', 'The experience built over decades gives it tradition and knowledge of the entire nonwoven manufacturing process. Growing demand for innovative products led Fiorella to invest in modern production systems, reaching the excellence required by international standards.', 'La experiencia acumulada en décadas de historia le confiere tradición y conocimiento de todo el proceso de fabricación de no tejidos. La creciente demanda de productos innovadores llevó a Fiorella a invertir en modernos sistemas de producción, alcanzando la excelencia exigida por los estándares internacionales.'],
    ['Atende todo o mercado nacional e Américas, com produtos especialmente desenvolvidos para cada finalidade específica.', 'It serves the entire Brazilian market and the Americas, with products specially developed for each specific purpose.', 'Atiende todo el mercado brasileño y el continente americano, con productos desarrollados especialmente para cada finalidad específica.'],
    ['Estamos localizados no município de Mairinque, Estado de São Paulo, em uma área com aproximadamente 50.000 m². Possuímos Certificado de Qualidade ISO 9001:2015.', 'We are located in Mairinque, São Paulo State, Brazil, on a site of approximately 50,000 m². We hold ISO 9001:2015 quality certification.', 'Estamos ubicados en el municipio de Mairinque, Estado de São Paulo, Brasil, en un área de aproximadamente 50.000 m². Contamos con la certificación de calidad ISO 9001:2015.'],
  ],
  politicaTitulo: ['Política da qualidade', 'Quality policy', 'Política de calidad'],
  politicaIntro: ['A Fiorella, cuja atividade é o desenvolvimento, fabricação e comercialização de produtos nãotecidos, tecidos e produtos têxteis para diversas aplicações, assume o compromisso de:', 'Fiorella, whose activity is the development, manufacturing and sale of nonwoven, woven and textile products for various applications, is committed to:', 'Fiorella, cuya actividad es el desarrollo, la fabricación y la comercialización de no tejidos, tejidos y productos textiles para diversas aplicaciones, asume el compromiso de:'],
  politica: [
    ['Satisfazer as necessidades dos clientes', 'Meeting customer needs', 'Satisfacer las necesidades de los clientes'],
    ['Oferecer inovações constantes aos mercados em que atua', 'Providing continuous innovation to the markets it serves', 'Ofrecer innovaciones constantes a los mercados en que actúa'],
    ['Atender aos requisitos acordados', 'Complying with agreed requirements', 'Cumplir los requisitos acordados'],
    ['Melhorar continuamente a eficácia do Sistema de Gestão Fiorella', 'Continuously improving the effectiveness of the Fiorella Management System', 'Mejorar continuamente la eficacia del Sistema de Gestión Fiorella'],
  ],
  politicaAss: ['A Diretoria · Mairinque, setembro de 2022', 'The Board · Mairinque, September 2022', 'La Dirección · Mairinque, septiembre de 2022'],
  processoTitulo: ['Como nasce um nãotecido resinado', 'How a chemical bonding nonwoven is made', 'Cómo nace un no tejido resinado'],
  processoLead: ['Sem fiação e sem tecelagem: as fibras de poliéster e viscose formam uma manta, que a resina consolida. O resultado é um material leve, uniforme e ajustado a cada uso.', 'No spinning and no weaving: polyester and viscose fibers form a web that the resin bonds together. The result is a light, even material tuned to each use.', 'Sin hilatura ni tejeduría: las fibras de poliéster y viscosa forman un velo que la resina consolida. El resultado es un material liviano, uniforme y ajustado a cada uso.'],
  processo: [
    [['Fibras', 'Fibers', 'Fibras'], ['Poliéster e/ou viscose, escolhidos para o toque e a resistência que a aplicação pede.', 'Polyester and/or viscose, chosen for the hand and strength the application calls for.', 'Poliéster y/o viscosa, elegidos por el tacto y la resistencia que pide la aplicación.']],
    [['Manta', 'Web', 'Velo'], ['As fibras são abertas e distribuídas em uma manta contínua e uniforme.', 'The fibers are opened and laid into a continuous, even web.', 'Las fibras se abren y se distribuyen en un velo continuo y uniforme.']],
    [['Resinagem', 'Bonding', 'Resinado'], ['A resina une as fibras e define rigidez, maciez e o rasgo da entretela.', 'The resin binds the fibers and sets stiffness, softness and how the interlining tears.', 'La resina une las fibras y define rigidez, suavidad y el rasgado de la entretela.']],
    [['Secagem', 'Curing', 'Secado'], ['A manta passa pela estufa, onde a resina cura e o nãotecido ganha estabilidade.', 'The web goes through the oven, where the resin cures and the nonwoven becomes stable.', 'El velo pasa por la estufa, donde la resina cura y el no tejido gana estabilidad.']],
    [['Rolo', 'Roll', 'Rollo'], ['Acabamento, corte nas larguras pedidas e enrolamento, com controle ISO 9001.', 'Finishing, slitting to the widths ordered and winding, under ISO 9001 control.', 'Acabado, corte en los anchos pedidos y enrollado, con control ISO 9001.']],
  ],
  reguaTitulo: ['Régua de gramaturas', 'Weight guide', 'Regla de gramajes'],
  reguaLead: ['As entretelas Fiorella por peso e por toque. Quanto maior a gramatura, mais corpo e sustentação.', 'Fiorella interlinings by weight and by hand. The higher the weight, the more body and support.', 'Las entretelas Fiorella por gramaje y por tacto. Cuanto mayor el gramaje, más cuerpo y soporte.'],
  finderTitulo: ['Qual entretela é a certa?', 'Which interlining is right?', '¿Qué entretela es la correcta?'],
  finderLead: ['Filtre pelo uso e pelo toque e veja as referências da linha.', 'Filter by use and by hand to see the references in the range.', 'Filtre por uso y por tacto y vea las referencias de la línea.'],
  lojaTitulo: ['Compre direto da fábrica', 'Buy direct from the factory', 'Compre directo de la fábrica'],
  lojaLead: ['As entretelas para bordado, confecção e artesanato estão na FiorellaShop, a loja da fábrica: em até 5x no cartão, com entrega em casa.', 'Embroidery, clothing and craft interlinings are sold at FiorellaShop, the factory store (deliveries in Brazil).', 'Las entretelas para bordado, confección y artesanía están en FiorellaShop, la tienda de fábrica (entregas en Brasil).'],
  ctaTitulo: ['Precisa de um nãotecido para o seu produto?', 'Need a nonwoven for your product?', '¿Necesita un no tejido para su producto?'],
  ctaLead: ['Fale com a fábrica. A equipe Fiorella indica a referência certa ou desenvolve uma especial para a sua aplicação.', 'Talk to the factory. The Fiorella team will point you to the right reference or develop a special one for your application.', 'Hable con la fábrica. El equipo Fiorella indica la referencia correcta o desarrolla una especial para su aplicación.'],
  contatoTitulo: ['Fale com a Fiorella', 'Get in touch with Fiorella', 'Hable con Fiorella'],
  contatoLead: ['Atendimento comercial para todo o Brasil e Américas. Mande sua mensagem: ela chega pronta no WhatsApp da fábrica.', 'Sales service for Brazil and the Americas. Send your message: it arrives ready on the factory WhatsApp.', 'Atención comercial para Brasil y las Américas. Envíe su mensaje: llega listo al WhatsApp de la fábrica.'],
  comercial: ['Comercial', 'Sales', 'Comercial'],
  lojaSac: ['Loja virtual (SAC)', 'Online store (support)', 'Tienda virtual (SAC)'],
  produtosTitulo: ['Produtos', 'Products', 'Productos'],
  produtosLead: ['Nãotecidos resinados em poliéster e/ou viscose para cinco frentes. Abaixo, todas as referências da linha de entretelas.', 'Chemical bonding nonwovens in polyester and/or viscose for five fields. Below, every reference in the interlining range.', 'No tejidos resinados en poliéster y/o viscosa para cinco frentes. Abajo, todas las referencias de la línea de entretelas.'],
  tabelaTitulo: ['Todas as referências', 'All references', 'Todas las referencias'],
  empresaTitulo: ['Uma indústria de nãotecidos com 49 anos de história', 'A nonwovens manufacturer with 49 years of history', 'Una industria de no tejidos con 49 años de historia'],
};

// Mercados (os quatro do site atual, com "Entretelas para Confecção e Bordado" separado em dois)
export const mercados = [
  { slug: 'bordado', foto: 'bordadeiras', cor: '#9b1015',
    nome: ['Entretelas para bordado', 'Embroidery backings', 'Entretelas para bordado'],
    curto: ['Bordado', 'Embroidery', 'Bordado'],
    resumo: ['Entretelas de rasgo fácil em todos os sentidos, de toque rígido, macio ou soft, e dupla face para bordado aplicado.', 'Easy-tear backings in every direction, with stiff, soft or extra-soft hand, plus double-sided interlining for appliqué.', 'Entretelas de rasgado fácil en todos los sentidos, de tacto rígido, suave o soft, y doble faz para bordado aplicado.'],
    texto: ['A entretela tem a função de dar suporte ao bordado durante a perfuração das agulhas, bem como corpo ao bordado durante a vida útil da peça. Mesmo com rasgo fácil em todos os sentidos, são entretelas resistentes, com gramatura que varia de acordo com a referência.', 'The backing supports the embroidery while the needles pierce the fabric and gives it body throughout the life of the garment. Even though they tear easily in every direction, they are strong backings, with weights that vary by reference.', 'La entretela da soporte al bordado durante la perforación de las agujas y cuerpo al bordado durante la vida útil de la prenda. Aun con rasgado fácil en todos los sentidos, son entretelas resistentes, con gramaje que varía según la referencia.'] },
  { slug: 'confeccao', foto: 'confeccao-modelos', cor: '#12393a',
    nome: ['Entretelas para confecção', 'Interlinings for clothing', 'Entretelas para confección'],
    curto: ['Confecção', 'Clothing', 'Confección'],
    resumo: ['Entretelas termocolantes de toque rígido para caimento estruturado e etiquetas de composição em nãotecido.', 'Fusible interlinings with stiff hand for a structured drape, and nonwoven care labels.', 'Entretelas termoadhesivas de tacto rígido para una caída estructurada y etiquetas de composición en no tejido.'],
    texto: ['Entretelas colantes rígidas produzidas em nãotecido, que proporcionam ao produto final um caimento estruturado e dão corpo ao tecido entretelado, com fabricação e adesivagem simplificadas. Indicadas para o fusionamento em tecidos da linha feminina e masculina.', 'Stiff fusible interlinings made of nonwoven, giving the finished garment a structured drape and adding body to the fabric, with simplified manufacturing and fusing. Suitable for fusing onto fabrics for womenswear and menswear.', 'Entretelas adhesivas rígidas producidas en no tejido, que dan a la prenda una caída estructurada y cuerpo al tejido entretelado, con fabricación y adhesivado simplificados. Indicadas para el fusionado en tejidos de la línea femenina y masculina.'] },
  { slug: 'automotiva', foto: 'automotiva', cor: '#4a4f55',
    nome: ['Indústria automotiva', 'Automotive industry', 'Industria automotriz'],
    curto: ['Automotiva', 'Automotive', 'Automotriz'],
    resumo: ['Matéria-prima para proteção de automotores e materiais desmoldantes para termo-moldados. Nãotecidos adaptáveis e resistentes, com características especiais para cada aplicação.', 'Raw material for vehicle protection and release materials for thermoformed parts. Adaptable, strong nonwovens with special characteristics for each application.', 'Materia prima para protección de automotores y materiales desmoldantes para termoformados. No tejidos adaptables y resistentes, con características especiales para cada aplicación.'],
    texto: ['Para a indústria automotiva, a Fiorella produz matéria-prima para a proteção de automotores e materiais desmoldantes para peças termo-moldadas: nãotecidos adaptáveis e resistentes, com características especiais definidas para cada aplicação.', 'For the automotive industry, Fiorella produces raw material for vehicle protection and release materials for thermoformed parts: adaptable, strong nonwovens with special characteristics defined for each application.', 'Para la industria automotriz, Fiorella produce materia prima para la protección de automotores y materiales desmoldantes para piezas termoformadas: no tejidos adaptables y resistentes, con características especiales definidas para cada aplicación.'] },
  { slug: 'filtros', foto: 'filtros', cor: '#6f8796',
    nome: ['Indústria de filtros', 'Filtration industry', 'Industria de filtros'],
    curto: ['Filtros', 'Filtration', 'Filtros'],
    resumo: ['Nãotecidos especialmente desenvolvidos para filtração de ar e líquidos, com resistência e permeabilidade adequadas a cada uso.', 'Nonwovens specially developed for air and liquid filtration, with strength and permeability suited to each use.', 'No tejidos desarrollados especialmente para la filtración de aire y líquidos, con resistencia y permeabilidad adecuadas a cada uso.'],
    texto: ['Nãotecidos especialmente desenvolvidos para a filtração de ar e de líquidos, com resistência e permeabilidade ajustadas a cada uso.', 'Nonwovens specially developed for air and liquid filtration, with strength and permeability adjusted to each use.', 'No tejidos desarrollados especialmente para la filtración de aire y de líquidos, con resistencia y permeabilidad ajustadas a cada uso.'] },
  { slug: 'aplicacoes', foto: 'forminhas-laranja', cor: '#c2408f',
    nome: ['Aplicações diversas', 'Multiple applications', 'Aplicaciones variadas'],
    curto: ['Aplicações', 'Applications', 'Aplicaciones'],
    resumo: ['Toda a versatilidade dos nãotecidos para projetos diversos: absorção, rigidez, resistência, maciez. Inclui materiais de limpeza e as linhas para artesanato.', 'All the versatility of nonwovens for a variety of projects: absorbency, stiffness, strength, softness. Includes cleaning materials and the craft range.', 'Toda la versatilidad de los no tejidos para proyectos variados: absorción, rigidez, resistencia, suavidad. Incluye materiales de limpieza y las líneas para artesanía.'],
    texto: ['Toda a versatilidade dos nãotecidos à disposição de projetos diversos. Absorção, rigidez, resistência, maciez: uma infinidade de características, inclusive para materiais de limpeza. Para artesanato, a Fiorella tem entretelas moldáveis e tingíveis, dupla face e mantas.', 'All the versatility of nonwovens available for a variety of projects. Absorbency, stiffness, strength, softness: an endless range of characteristics, including cleaning materials. For crafts, Fiorella offers mouldable and dyeable interlinings, double-sided interlinings and wadding.', 'Toda la versatilidad de los no tejidos al servicio de proyectos variados. Absorción, rigidez, resistencia, suavidad: una infinidad de características, inclusive para materiales de limpieza. Para artesanía, Fiorella tiene entretelas moldeables y teñibles, doble faz y mantas.'] },
];

// Linhas de cor das fichas da FiorellaShop (a faixa colorida de cada embalagem)
export const linhas = {
  rigido: { cor: '#9b1015', nome: ['Toque rígido · rasgo fácil', 'Stiff hand · easy tear', 'Tacto rígido · rasgado fácil'] },
  macio: { cor: '#f0662d', nome: ['Toque macio · rasgo fácil', 'Soft hand · easy tear', 'Tacto suave · rasgado fácil'] },
  soft: { cor: '#5f9a96', nome: ['Soft · limpeza com tesoura', 'Extra soft · trim with scissors', 'Soft · limpieza con tijera'] },
  dupla: { cor: '#c9962c', nome: ['Dupla face · corte a laser', 'Double-sided · laser cut', 'Doble faz · corte láser'] },
  colante: { cor: '#12393a', nome: ['Termocolante · toque rígido', 'Fusible · stiff hand', 'Termoadhesiva · tacto rígido'] },
  moldavel: { cor: '#f07ad8', nome: ['Termo moldável · tingível', 'Heat-mouldable · dyeable', 'Termomoldeable · teñible'] },
  etiqueta: { cor: '#d11f27', nome: ['Etiqueta para impressora laser', 'Label for laser printers', 'Etiqueta para impresora láser'] },
};

const VP = ['Viscose e poliéster', 'Viscose and polyester', 'Viscosa y poliéster'];
const PO = ['Poliéster', 'Polyester', 'Poliéster'];
const VI = ['Viscose', 'Viscose', 'Viscosa'];
const APL_RIG = ['Bordados que precisam do máximo de limpeza. Rasgo fácil em todos os sentidos.', 'Embroidery that needs the cleanest finish. Tears easily in every direction.', 'Bordados que necesitan la máxima limpieza. Rasgado fácil en todos los sentidos.'];
const APL_MAC = ['Bordados da linha baby, infantil, feminina e uniformes. Deixa o verso do bordado com toque suave.', 'Embroidery for babywear, childrenswear, womenswear and uniforms. Leaves the back of the embroidery soft to the touch.', 'Bordados de la línea bebé, infantil, femenina y uniformes. Deja el revés del bordado con tacto suave.'];
const APL_TELA = ['Confecções que buscam toque rígido e caimento estruturado. Fusionamento em tecidos da linha feminina e masculina.', 'Garments that need a stiff hand and structured drape. Fusing onto womenswear and menswear fabrics.', 'Confecciones que buscan tacto rígido y caída estructurada. Fusionado en tejidos de la línea femenina y masculina.'];
const APL_NTD = ['Fabricação de forminhas de doces finos. Fácil tingimento, aceita cores claras e escuras, não precisa engomar.', 'Making paper-like cups for fine sweets. Dyes easily in light and dark colours, no starching needed.', 'Fabricación de pirotines para dulces finos. Fácil teñido, acepta colores claros y oscuros, no necesita almidonar.'];
const S = 'https://www.fiorellashop.com.br/';

// Referências com ficha completa na FiorellaShop
export const produtos = [
  { cod: 'BDO 45', g: 30, linha: 'rigido', merc: 'bordado', comp: VP, larg: '0,30 · 0,90 m', compr: '10 · 100 m', apl: APL_RIG, ficha: 'ficha-bdo-45', url: S + 'bordados/bdo-45-entretela-para-bordado' },
  { cod: 'BDO 61', g: 38, linha: 'rigido', merc: 'bordado', comp: VP, larg: '0,30 · 0,90 m', compr: '100 m', apl: APL_RIG, ficha: 'ficha-bdo-61', url: S + 'bordados/bdo-61-entretela-para-bordado' },
  { cod: 'BDO 80', g: 45, linha: 'rigido', merc: 'bordado', comp: VP, larg: '0,30 · 0,90 m', compr: '10 · 100 m', apl: APL_RIG, ficha: 'ficha-bdo-80', url: S + 'bordados/bdo-80-entretela-para-bordado' },
  { cod: 'BDO 102', g: 55, linha: 'rigido', merc: 'bordado', comp: VP, larg: '0,30 · 0,90 m', compr: '100 m', apl: APL_RIG, ficha: 'ficha-bdo-102', url: S + 'bordados/bdo-102-entretela-para-bordado' },
  { cod: 'BDO 105', g: 65, linha: 'rigido', merc: 'bordado', comp: VP, larg: '0,30 · 0,90 m', compr: '10 · 100 m', apl: APL_RIG, ficha: 'ficha-bdo-105', url: S + 'bordados/bdo-105-entretela-para-bordado' },
  { cod: 'BDO 120', g: 75, linha: 'rigido', merc: 'bordado', comp: VP, larg: '0,30 · 0,90 m', compr: '100 m', apl: APL_RIG, ficha: 'ficha-bdo-120', url: S + 'bordados/bdo-120-entretela-para-bordado' },
  { cod: 'BDO 46', g: 30, linha: 'macio', merc: 'bordado', comp: VP, larg: '0,30 · 0,90 m', compr: '10 · 100 m', apl: APL_MAC, ficha: 'ficha-bdo-46', url: S + 'bordados/bdo-46-entretela-para-bordado' },
  { cod: 'BDO 86', g: 50, linha: 'macio', merc: 'bordado', comp: VP, larg: '0,30 m', compr: '100 m', apl: APL_MAC, ficha: 'ficha-bdo-86', url: S + 'bordados/bdo-86-entretela-para-bordado' },
  { cod: 'BDO 107', g: 70, linha: 'soft', merc: 'bordado', comp: VP, larg: '0,90 m', compr: '100 m', apl: ['Bordado com aspecto soft. Ótima resistência a todos os tipos de bordado; limpeza final com tesoura.', 'Embroidery with a soft look. Great strength for every kind of embroidery; final trimming with scissors.', 'Bordado con aspecto soft. Excelente resistencia para todo tipo de bordado; limpieza final con tijera.'], ficha: 'ficha-bdo-107', url: S + 'bordados/bdo-107-entretela-de-toque-macio-e-sem-rasgo' },
  { cod: 'APLIC PATCH', g: '98 · 102', gNum: 100, linha: 'dupla', merc: 'bordado', comp: VP, larg: '0,30 · 0,45 m', compr: '10 · 30 m', apl: ['Dupla função: um lado termocolante e o outro autoadesivo. Bordado aplicado, corte a laser e mesa aberta; também em costura e artesanato.', 'Dual function: one side fusible, the other self-adhesive. Appliqué, laser-cut designs and open-table work; also for sewing and crafts.', 'Doble función: un lado termoadhesivo y el otro autoadhesivo. Bordado aplicado, corte láser y mesa abierta; también costura y artesanía.'], ficha: 'ficha-aplic', url: S + 'bordados/aplic-patch-entretela-dupla-face-termocolante-e-auto-adesvia' },
  { cod: 'TELA 30', g: 28, linha: 'colante', merc: 'confeccao', comp: PO, larg: '0,90 m', compr: '50 m', apl: APL_TELA, ficha: 'ficha-tela-30', url: S + 'confeccao/tela-30-entretela-para-bordado' },
  { cod: 'TELA 40', g: 35, linha: 'colante', merc: 'confeccao', comp: PO, larg: '0,90 m', compr: '50 m', apl: APL_TELA, ficha: 'ficha-tela-40', url: S + 'confeccao/tela-40-entretela-colante' },
  { cod: 'TELA 50', g: 45, linha: 'colante', merc: 'confeccao', comp: PO, larg: '0,90 m', compr: '50 m', apl: APL_TELA, ficha: 'ficha-tela-50', url: S + 'confeccao/tela-50-entretela-colante' },
  { cod: 'TELA 70', g: 58, linha: 'colante', merc: 'confeccao', comp: PO, larg: '0,90 m', compr: '50 m', apl: APL_TELA, ficha: 'ficha-tela-70', url: S + 'confeccao/tela-70-entretela-colante' },
  { cod: 'NT LASER', g: 68, linha: 'etiqueta', merc: 'confeccao', comp: VI, larg: ['Folha A4', 'A4 sheet', 'Hoja A4'], compr: ['Caixa com 500 folhas', 'Box of 500 sheets', 'Caja con 500 hojas'], apl: ['Etiqueta de composição têxtil e cuidados de lavagem para vestuário, cama, mesa e banho. Ótima impressão nos dois lados.', 'Fibre content and care labels for apparel and home textiles. Prints well on both sides.', 'Etiqueta de composición textil y cuidados de lavado para vestuario y blancos. Excelente impresión en ambos lados.'], ficha: 'nt-laser-caixa', url: S + 'confeccao/nt-laser-etiqueta-para-confeccao',
    variacoes: [['NT LASER 1', '25 × 40 mm', 56, '28.000'], ['NT LASER 2', '25 × 55 mm', 40, '20.000'], ['NT LASER 3', '33 × 55 mm', 30, '15.000'], ['NT LASER 4', '33 × 69,9 mm', 24, '12.000']] },
  { cod: 'NTD 40', g: 40, linha: 'moldavel', merc: 'aplicacoes', comp: VI, larg: '0,90 m', compr: '50 m', apl: APL_NTD, ficha: 'ficha-ntd-40', url: S + 'artesanato/ntd-40-entretela-para-forminha-de-doces-100-viscose-para-aplicacoes-especiais' },
  { cod: 'NTD 50', g: 50, linha: 'moldavel', merc: 'aplicacoes', comp: VI, larg: '0,90 m', compr: '50 m', apl: APL_NTD, ficha: 'ficha-ntd-50', url: S + 'artesanato/ntd-50-ntretela-para-forminha-de-doces-100-viscose-para-aplicacoes-especiais' },
];

// Categorias que a FiorellaShop também vende (sem ficha técnica publicada)
export const tambem = {
  bordado: [[['Entretela hidrossolúvel', 'Water-soluble backing', 'Entretela hidrosoluble'], S + 'bordados/entretelas-hidrossoluvel']],
  confeccao: [[['Entretela colante de malha', 'Knit fusible interlining', 'Entretela adhesiva de punto'], S + 'confeccao/entretelas-colantes-para-confeccao'], [['Entretela colante tecida', 'Woven fusible interlining', 'Entretela adhesiva tejida'], S + 'entretelas-colantes-para-confeccao/entretela-tecida']],
  aplicacoes: [[['Entretela moldável', 'Mouldable interlining', 'Entretela moldeable'], S + 'artesanato/entretela-moldavel'], [['Manta de poliéster rígida', 'Stiff polyester wadding', 'Manta de poliéster rígida'], S + 'artesanato/manta-pes-rigida-150'], [['Entretela dupla face', 'Double-sided interlining', 'Entretela doble faz'], S + 'artesanato/aplic-patch']],
};

// O que informar num pedido de desenvolvimento (automotiva / filtros / aplicações)
export const especificar = [
  ['Aplicação e processo do cliente (termo-moldagem, filtração de ar ou de líquidos...)', 'Your application and process (thermoforming, air or liquid filtration...)', 'Aplicación y proceso del cliente (termoformado, filtración de aire o de líquidos...)'],
  ['Composição: poliéster, viscose ou mistura', 'Composition: polyester, viscose or blend', 'Composición: poliéster, viscosa o mezcla'],
  ['Gramatura desejada (g/m²)', 'Target weight (g/m²)', 'Gramaje deseado (g/m²)'],
  ['Largura e comprimento dos rolos', 'Roll width and length', 'Ancho y largo de los rollos'],
  ['Características: rigidez, maciez, resistência, permeabilidade, absorção', 'Properties: stiffness, softness, strength, permeability, absorbency', 'Características: rigidez, suavidad, resistencia, permeabilidad, absorción'],
  ['Volume mensal estimado', 'Estimated monthly volume', 'Volumen mensual estimado'],
];

// ---------- Loja (nova FiorellaShop, no estilo da versão A) ----------
// Preço "a partir de": menor preço de variação na FiorellaShop em 16/10/2026 (o checkout continua na Tray).
export const LOJA_PRECO = {
  'BDO 45': 23.8, 'BDO 61': 26.3, 'BDO 80': 27.5, 'BDO 102': 171.5, 'BDO 105': 35.8, 'BDO 120': 226.7,
  'BDO 46': 23.9, 'BDO 86': 156.7, 'BDO 107': 514.3, 'APLIC PATCH': 40.7,
  'TELA 30': 152.5, 'TELA 40': 177.6, 'TELA 50': 195.2, 'TELA 70': 270.7, 'NT LASER': 253.87,
  'NTD 40': 180.9, 'NTD 50': 209.3,
};
export const LOJA_FOTOS = { 'NT LASER': 1 };
export const lojaCats = [
  { slug: 'bordado', nome: ['Bordado', 'Embroidery', 'Bordado'], cods: ['BDO 45', 'BDO 61', 'BDO 80', 'BDO 102', 'BDO 105', 'BDO 120', 'BDO 46', 'BDO 86', 'BDO 107', 'APLIC PATCH'], banner: 'banner-bordados' },
  { slug: 'confeccao', nome: ['Confecção', 'Clothing', 'Confección'], cods: ['TELA 30', 'TELA 40', 'TELA 50', 'TELA 70', 'NT LASER'], banner: 'banner-confeccao' },
  { slug: 'artesanato', nome: ['Artesanato', 'Crafts', 'Artesanía'], cods: ['NTD 40', 'NTD 50', 'APLIC PATCH'], banner: 'banner-artesanato' },
];
export const lojaNomeLinha = {
  rigido: ['Entretela para bordado · toque rígido', 'Embroidery backing · stiff hand', 'Entretela para bordado · tacto rígido'],
  macio: ['Entretela para bordado · toque macio', 'Embroidery backing · soft hand', 'Entretela para bordado · tacto suave'],
  soft: ['Entretela para bordado · soft', 'Embroidery backing · extra soft', 'Entretela para bordado · soft'],
  dupla: ['Entretela dupla face termocolante e autoadesiva', 'Double-sided fusible and self-adhesive interlining', 'Entretela doble faz termoadhesiva y autoadhesiva'],
  colante: ['Entretela nãotecida colante · toque rígido', 'Nonwoven fusible interlining · stiff hand', 'Entretela no tejida adhesiva · tacto rígido'],
  etiqueta: ['Etiqueta de composição têxtil nãotecida, A4 para impressora laser', 'Nonwoven care label, A4 for laser printers', 'Etiqueta de composición textil no tejida, A4 para impresora láser'],
  moldavel: ['Entretela para forminha de doces · 100% viscose', 'Interlining for sweet cups · 100% viscose', 'Entretela para pirotines · 100% viscosa'],
};
export const LOJA = {
  titulo: ['Entretelas direto da fábrica', 'Interlinings straight from the factory', 'Entretelas directo de la fábrica'],
  lead: ['A loja oficial da Fiorella: entretelas para bordado, confecção e artesanato com a ficha técnica de cada referência. Escolha largura e metragem e finalize no checkout seguro.', 'Fiorella’s official store: embroidery, clothing and craft interlinings with full specifications for each reference. Choose width and length and check out securely (deliveries in Brazil).', 'La tienda oficial de Fiorella: entretelas para bordado, confección y artesanía con la ficha técnica de cada referencia. Elija ancho y largo y finalice en el checkout seguro (envíos en Brasil).'],
  vantagens: [
    ['Em até 5x no cartão', 'Up to 5 card instalments', 'Hasta 5 cuotas con tarjeta'],
    ['Loja da fábrica', 'Factory store', 'Tienda de fábrica'],
    ['Compre na loja e receba em casa', 'Order online, delivered to your door', 'Compre en línea y reciba en casa'],
    ['Qualidade Fiorella · ISO 9001', 'Fiorella quality · ISO 9001', 'Calidad Fiorella · ISO 9001'],
  ],
  aPartir: ['a partir de', 'from', 'desde'],
  verProduto: ['Ver produto', 'View product', 'Ver producto'],
  comprar: ['Comprar', 'Buy', 'Comprar'],
  checkout: ['Pagamento e frete no checkout seguro da FiorellaShop', 'Payment and shipping on the secure FiorellaShop checkout', 'Pago y envío en el checkout seguro de FiorellaShop'],
  pedirZap: ['Pedir pelo WhatsApp', 'Order via WhatsApp', 'Pedir por WhatsApp'],
  largura: ['Largura', 'Width', 'Ancho'],
  metragem: ['Metragem', 'Roll length', 'Metraje'],
  quantidade: ['Quantidade', 'Quantity', 'Cantidad'],
  modelo: ['Modelo', 'Model', 'Modelo'],
  descricao: ['Descrição', 'Description', 'Descripción'],
  relacionados: ['Veja também', 'You may also like', 'Vea también'],
  outrasCats: ['Mais na loja', 'More in the store', 'Más en la tienda'],
  precoNota: ['Preços de referência; o valor de cada largura e metragem aparece no checkout.', 'Reference prices; each width and length is priced at checkout.', 'Precios de referencia; el valor de cada ancho y metraje aparece en el checkout.'],
  cartao: ['ou em até 5x no cartão', 'or up to 5 card instalments', 'o hasta 5 cuotas con tarjeta'],
  entrega: ['Envio para todo o Brasil', 'Shipping across Brazil', 'Envíos a todo Brasil'],
  todos: ['Todos os produtos', 'All products', 'Todos los productos'],
};
