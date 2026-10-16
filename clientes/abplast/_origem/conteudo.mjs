// Conteúdo do site novo da AB (AB Plast, Joinville/SC), em pt / en / es.
// Tudo vem do site atual (abplast.com.br): textos institucionais copiados das páginas, e o catálogo
// (coleções, embalagens, fichas técnicas, cores e pumps) lido por extrair.py em dados.json.
// Traduções en/es feitas para este site. Textos marcados com [x, y, z] = [pt, en, es].
import fs from 'node:fs';
import path from 'node:path';

const AQUI = path.dirname(new URL(import.meta.url).pathname);
const temImg = n => { try { return fs.statSync(path.join(AQUI, '../public/assets/img', n + '.webp')).size > 0; } catch (e) { return false; } };
const dados = JSON.parse(fs.readFileSync(path.join(AQUI, 'dados.json'), 'utf8'));

export const LANGS = ['pt', 'en', 'es'];
export const HTMLLANG = { pt: 'pt-BR', en: 'en', es: 'es' };
export const LOCALE = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };

export const site = {
  nome: 'AB',
  nomeLongo: 'AB Soluções em Embalagens Plásticas',
  dominio: 'https://abplast.overtus.com.br',
  atual: 'https://abplast.com.br/',
  whats: '554799770601',
  whatsTxt: '(47) 99977-0601',
  endereco: 'Rua Frederico Hubner, 118',
  cidade: 'Joinville | Santa Catarina',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Frederico+Hubner+118+Joinville+SC',
  denuncia: '0800 512 6655',
  denunciaUrl: 'https://www.contatoseguro.com.br/',
  linkedin: 'https://www.linkedin.com/company/ab-plast-brasil/',
  instagram: 'https://www.instagram.com/abplastbrasil/',
  facebook: 'https://www.facebook.com/abplastbrasil',
  youtube: 'https://www.youtube.com/@abplastbrasil',
  portal: 'https://platform.senior.com.br/login/?redirectTo=https%3A%2F%2Fplatform.senior.com.br%2Fsenior-x%2F&tenant=catarinensepharma.com.br',
};

export const UI = {
  inicio: ['Início', 'Home', 'Inicio'],
  linha: ['Linha AB', 'AB Line', 'Línea AB'],
  catalogo: ['Catálogo', 'Catalog', 'Catálogo'],
  colecoes: ['Coleções', 'Collections', 'Colecciones'],
  colecao: ['Coleção', 'Collection', 'Colección'],
  pumps: ['Pumps', 'Pumps', 'Bombas'],
  cores: ['Cores', 'Colors', 'Colores'],
  exclusivas: ['Exclusivas', 'Custom packaging', 'Exclusivos'],
  mercados: ['Mercados', 'Markets', 'Mercados'],
  empresa: ['Sobre nós', 'About us', 'Nosotros'],
  sustentabilidade: ['Sustentabilidade', 'Sustainability', 'Sostenibilidad'],
  carreiras: ['Carreiras', 'Careers', 'Carreras'],
  contato: ['Contato', 'Contact', 'Contacto'],
  institucional: ['Institucional', 'Company', 'Institucional'],
  menu: ['Menu', 'Menu', 'Menú'],
  idioma: ['Idioma', 'Language', 'Idioma'],
  falar: ['Falar com vendas', 'Talk to sales', 'Hablar con ventas'],
  orcamento: ['Lista de orçamento', 'Quote list', 'Lista de presupuesto'],
  adicionar: ['Adicionar ao orçamento', 'Add to quote', 'Agregar al presupuesto'],
  adicionado: ['No orçamento', 'In quote list', 'En el presupuesto'],
  verFicha: ['Ver ficha', 'View specs', 'Ver ficha'],
  verColecao: ['Ver a coleção', 'View collection', 'Ver la colección'],
  verTodas: ['Ver todas as coleções', 'View all collections', 'Ver todas las colecciones'],
  verCatalogo: ['Ver o catálogo completo', 'View full catalog', 'Ver el catálogo completo'],
  saibaMais: ['Saiba mais', 'Learn more', 'Más información'],
  buscar: ['Buscar por nome, referência ou molde', 'Search by name, reference or mold', 'Buscar por nombre, referencia o molde'],
  filtros: ['Filtros', 'Filters', 'Filtros'],
  limpar: ['Limpar filtros', 'Clear filters', 'Limpiar filtros'],
  itens: ['itens', 'items', 'ítems'],
  nenhum: ['Nenhuma embalagem com esses filtros.', 'No packaging matches these filters.', 'Ningún envase con estos filtros.'],
  grade: ['Fotos', 'Photos', 'Fotos'],
  tabela: ['Tabela técnica', 'Spec table', 'Tabla técnica'],
  tipo: ['Tipo', 'Type', 'Tipo'],
  volume: ['Volume', 'Capacity', 'Volumen'],
  volNominal: ['Volume nominal', 'Nominal capacity', 'Volumen nominal'],
  volTotal: ['Volume total', 'Brim-full capacity', 'Volumen total'],
  resina: ['Resina', 'Resin', 'Resina'],
  gargalo: ['Gargalo', 'Neck finish', 'Cuello'],
  molde: ['Molde', 'Mold', 'Molde'],
  dimensao: ['Dimensão (mm)', 'Dimensions (mm)', 'Dimensión (mm)'],
  referencia: ['Des./ref.', 'Drawing/ref.', 'Dib./ref.'],
  mercado: ['Mercado', 'Market', 'Mercado'],
  combina: ['Fecha com', 'Closes with', 'Cierra con'],
  combinaLead: ['Fechamentos da Linha AB com o mesmo gargalo desta embalagem.', 'AB Line closures with the same neck finish as this item.', 'Cierres de la Línea AB con el mismo cuello de este envase.'],
  emUso: ['Em uso por marcas clientes', 'In use by client brands', 'En uso por marcas clientes'],
  cartela: ['Cartela de cores', 'Color chart', 'Carta de colores'],
  coresVariam: ['*As cores podem variar de tela para tela.', '*Colors may vary from screen to screen.', '*Los colores pueden variar según la pantalla.'],
  personalizacao: ['Personalização', 'Decoration', 'Personalización'],
  versatilidade: ['Versatilidade', 'Capacities', 'Versatilidad'],
  materiaPrima: ['Matéria-prima', 'Raw material', 'Materia prima'],
  perfeita: ['Perfeita para', 'Ideal for', 'Ideal para'],
  embalagens: ['embalagens', 'items', 'envases'],
  enviar: ['Enviar pelo WhatsApp', 'Send via WhatsApp', 'Enviar por WhatsApp'],
  quantidade: ['Quantidade (peças)', 'Quantity (pcs)', 'Cantidad (piezas)'],
  remover: ['Remover', 'Remove', 'Quitar'],
  vazio: ['Sua lista está vazia. Adicione embalagens pelo catálogo.', 'Your list is empty. Add items from the catalog.', 'Su lista está vacía. Agregue envases desde el catálogo.'],
  fechar: ['Fechar', 'Close', 'Cerrar'],
  pedirAmostra: ['Pedir orçamento desta embalagem', 'Request a quote for this item', 'Pedir presupuesto de este envase'],
  todos: ['Todos', 'All', 'Todos'],
  outros: ['Outras embalagens da coleção', 'More items in this collection', 'Otros envases de la colección'],
  voltar: ['Voltar ao catálogo', 'Back to catalog', 'Volver al catálogo'],
  copiar: ['© 2026 AB Soluções em Embalagens Plásticas. Todos os direitos reservados.', '© 2026 AB Soluções em Embalagens Plásticas. All rights reserved.', '© 2026 AB Soluções em Embalagens Plásticas. Todos los derechos reservados.'],
  portal: ['Portal do Colaborador', 'Employee portal', 'Portal del colaborador'],
  denuncias: ['Denúncias', 'Ethics hotline', 'Denuncias'],
  grupo: ['Parte do grupo Catarinense Pharma', 'Part of the Catarinense Pharma group', 'Parte del grupo Catarinense Pharma'],
  nome: ['Nome', 'Name', 'Nombre'],
  email: ['E-mail', 'E-mail', 'Correo'],
  telefone: ['Telefone', 'Phone', 'Teléfono'],
  empresaCampo: ['Empresa', 'Company', 'Empresa'],
  cidadeUf: ['Cidade / Estado', 'City / State', 'Ciudad / Estado'],
  mensagem: ['Mensagem', 'Message', 'Mensaje'],
  enviarMsg: ['Enviar mensagem', 'Send message', 'Enviar mensaje'],
  formNota: ['Ao enviar, a mensagem abre pronta no WhatsApp da equipe de vendas.', 'When you send, the message opens ready in the sales team WhatsApp.', 'Al enviar, el mensaje se abre listo en el WhatsApp del equipo de ventas.'],
};

// ---------- números e textos institucionais ----------
export const numeros = [
  { n: '300+', t: ['marcas atendidas', 'brands served', 'marcas atendidas'] },
  { n: '170', t: ['milhões de embalagens por ano', 'million packages a year', 'millones de envases al año'] },
  { n: '600+', t: ['profissionais', 'professionals', 'profesionales'] },
  { n: 'ISO', t: ['9001:2015 e 22716:2007', '9001:2015 and 22716:2007', '9001:2015 y 22716:2007'] },
];

export const X = {
  heroEyebrow: ['Embalagens plásticas · Joinville (SC)', 'Plastic packaging · Joinville, Brazil', 'Envases plásticos · Joinville, Brasil'],
  heroTitulo: ['Embalagens que fazem a sua marca ser escolhida.', 'Packaging that gets your brand chosen.', 'Envases que hacen que su marca sea elegida.'],
  heroLead: [
    'Frascos, frasnagas, potes, tampas e pumps para cosméticos, petcare e farma. Linha AB pronta para personalizar ou embalagem exclusiva, da ideia à materialização.',
    'Bottles, tube bottles, jars, caps and pumps for cosmetics, pet care and pharma. The ready-to-decorate AB Line or fully custom packaging, from idea to production.',
    'Frascos, frascos squeeze, potes, tapas y bombas para cosméticos, petcare y farma. Línea AB lista para personalizar o envase exclusivo, de la idea a la producción.',
  ],
  dado66: ['66% das pessoas testam novas marcas por causa das embalagens.', '66% of people try new brands because of the packaging.', 'El 66% de las personas prueba marcas nuevas por el envase.'],
  dado59: ['59% das pessoas comparam produtos no ponto de venda.', '59% of people compare products at the point of sale.', 'El 59% de las personas compara productos en el punto de venta.'],
  paraQuem: ['Para quem criamos', 'Who we create for', 'Para quién creamos'],
  paraQuemLead: [
    'Independente do seu segmento, você pode facilitar a escolha dos seus clientes com a nossa parceria, expertise e alta qualidade.',
    'Whatever your segment, you can make your customers’ choice easier with our partnership, expertise and high quality.',
    'Sea cual sea su segmento, puede facilitar la elección de sus clientes con nuestra alianza, experiencia y alta calidad.',
  ],
  quemSomosTitulo: ['Da ideia à materialização, todo o suporte para o seu projeto.', 'From idea to production, full support for your project.', 'De la idea a la producción, todo el apoyo para su proyecto.'],
  quemSomos: [
    'Contamos com processos de qualidade certificados e um time completo de especialistas em diversos métodos produtivos de frascos e embalagens, como sopro, injeção, ISBM-PET e decoração em PET, PP e PE. Como parte do grupo Catarinense Pharma, compartilhamos experiência, qualidade e propósito em cada entrega que realizamos.',
    'We rely on certified quality processes and a complete team of specialists in many bottle and packaging production methods, such as extrusion blow molding, injection, ISBM-PET and decoration on PET, PP and PE. As part of the Catarinense Pharma group, we share experience, quality and purpose in every delivery.',
    'Contamos con procesos de calidad certificados y un equipo completo de especialistas en diversos métodos de producción de frascos y envases, como soplado, inyección, ISBM-PET y decoración en PET, PP y PE. Como parte del grupo Catarinense Pharma, compartimos experiencia, calidad y propósito en cada entrega.',
  ],
  linhaTitulo: ['Linha AB: 12 coleções prontas para levar a sua marca.', 'AB Line: 12 ready-made collections to carry your brand.', 'Línea AB: 12 colecciones listas para llevar su marca.'],
  linhaLead: [
    'Escolha uma embalagem da Linha AB, versátil e personalizável, que valoriza a experiência do cliente, protege o produto e destaca sua marca no ponto de venda.',
    'Choose an AB Line package: versatile and customizable, it enhances the customer experience, protects the product and makes your brand stand out on the shelf.',
    'Elija un envase de la Línea AB, versátil y personalizable, que valoriza la experiencia del cliente, protege el producto y destaca su marca en el punto de venta.',
  ],
  catalogoTitulo: ['Catálogo da Linha AB', 'AB Line catalog', 'Catálogo de la Línea AB'],
  catalogoLead: [
    'Todas as embalagens das 12 coleções em um só lugar, com a ficha técnica do site atual. Filtre por tipo, volume, resina, gargalo ou mercado e monte sua lista de orçamento.',
    'Every item from the 12 collections in one place, with full technical data. Filter by type, capacity, resin, neck finish or market and build your quote list.',
    'Todos los envases de las 12 colecciones en un solo lugar, con su ficha técnica. Filtre por tipo, volumen, resina, cuello o mercado y arme su lista de presupuesto.',
  ],
  exclusivasTitulo: ['Embalagens exclusivas, como o seu produto.', 'Custom packaging, as unique as your product.', 'Envases exclusivos, como su producto.'],
  exclusivasLead: [
    'Somos especialistas para desenvolver ou viabilizar projetos exclusivos. Da matéria-prima ideal, seja PET ou PEAD sustentáveis, cores especiais, hotstamping e outras inúmeras formas de decorar cada embalagem como você imagina. E o impacto vai muito além do seu produto: nossas embalagens valorizam a sua marca!',
    'We are specialists in developing and making custom projects viable. From the ideal raw material, sustainable PET or HDPE, to special colors, hot-stamping and countless other ways to decorate each package the way you imagine it. And the impact goes well beyond your product: our packaging adds value to your brand!',
    'Somos especialistas en desarrollar o viabilizar proyectos exclusivos. Desde la materia prima ideal, PET o PEAD sostenibles, colores especiales, hot-stamping y muchas otras formas de decorar cada envase como usted lo imagina. Y el impacto va mucho más allá de su producto: ¡nuestros envases valorizan su marca!',
  ],
  porque: [
    [['Deixar o seu produto ', 'mais premium', ', agregando qualidade e valor.'], ['Make your product ', 'more premium', ', adding quality and value.'], ['Hacer su producto ', 'más premium', ', sumando calidad y valor.']],
    [['Facilitar a decisão de compra, pois ', 'a embalagem influencia em 66% dos casos', '.'], ['Make the purchase decision easier: ', 'packaging influences 66% of cases', '.'], ['Facilitar la decisión de compra, ya que ', 'el envase influye en el 66% de los casos', '.']],
    [['Oferecer mais ', 'qualidade, segurança e melhor experiência de uso', ' ao cliente.'], ['Offer more ', 'quality, safety and a better user experience', ' to your customer.'], ['Ofrecer más ', 'calidad, seguridad y mejor experiencia de uso', ' al cliente.']],
    [['Encantar os consumidores, pois ', '59% deles comparam embalagens no PDV', '.'], ['Delight consumers, since ', '59% of them compare packaging at the point of sale', '.'], ['Encantar a los consumidores, ya que ', 'el 59% compara envases en el punto de venta', '.']],
  ],
  casos: [
    { img: 'ex-australian', t: 'Australian Gold + Medina', p: [
      'Produzimos embalagens exclusivas para a nova linha de protetores da Australian Gold, lançada em parceria com o surfista Gabriel Medina. Elas são feitas com plásticos retirados da região litorânea, reforçando o compromisso sustentável compartilhado por todos os envolvidos no projeto.',
      'We produced custom packaging for Australian Gold’s new sunscreen line, launched with surfer Gabriel Medina. It is made with plastic collected from the coastline, reinforcing the sustainability commitment shared by everyone in the project.',
      'Producimos envases exclusivos para la nueva línea de protectores de Australian Gold, lanzada junto al surfista Gabriel Medina. Están hechos con plásticos retirados de la costa, reforzando el compromiso sostenible de todos los involucrados.'] },
    { img: 'ex-neutrogena', t: 'Neutrogena', p: [
      'Desenvolvemos a embalagem do Neutrogena Hydro Boost Water Gel, premiada em “Grandes Cases de Embalagem” pela Revista EmbalagemMarca. O objetivo era preservar a apresentação premium do produto, mantendo a sustentabilidade como prioridade e utilizando materiais recicláveis.',
      'We developed the packaging for Neutrogena Hydro Boost Water Gel, awarded in “Grandes Cases de Embalagem” by EmbalagemMarca magazine. The goal was to keep the product’s premium look while prioritizing sustainability and using recyclable materials.',
      'Desarrollamos el envase de Neutrogena Hydro Boost Water Gel, premiado en “Grandes Cases de Embalagem” por la revista EmbalagemMarca. El objetivo era preservar la presentación premium del producto, con la sostenibilidad como prioridad y materiales reciclables.'] },
  ],
  etapasExclusiva: [
    { img: 'proc-producao', t: ['Processos de produção', 'Production processes', 'Procesos de producción'], p: [
      'Atuamos com os processos de PET (ISBM), sopro por extrusão (EBM) e injeção, onde as embalagens permitem maior flexibilidade, acabamento e uso de resinas recicladas pós-consumo.',
      'We work with PET (ISBM), extrusion blow molding (EBM) and injection, processes that allow more flexibility, better finish and the use of post-consumer recycled resins.',
      'Trabajamos con PET (ISBM), soplado por extrusión (EBM) e inyección, procesos que permiten mayor flexibilidad, acabado y uso de resinas recicladas posconsumo.'] },
    { img: 'proc-materia', t: ['Matéria-prima', 'Raw material', 'Materia prima'], p: [
      'Podemos processar diversos tipos de matéria-prima, tudo de acordo com a sua necessidade. Frascos de PET, PEAD, PP e PET-G virgem ou reciclado (PCR).',
      'We can process many raw materials, according to your needs: PET, HDPE, PP and PET-G bottles, virgin or recycled (PCR).',
      'Podemos procesar diversas materias primas, según su necesidad: frascos de PET, PEAD, PP y PET-G virgen o reciclado (PCR).'] },
    { img: 'proc-decoracao', t: ['Decoração', 'Decoration', 'Decoración'], p: [
      'Decoramos as embalagens com as tecnologias de serigrafia, rotulagem, tampografia, hot-stamping e aplicação sleeve.',
      'We decorate packaging with screen printing, labeling, pad printing, hot-stamping and sleeve application.',
      'Decoramos los envases con serigrafía, etiquetado, tampografía, hot-stamping y aplicación de sleeve.'] },
    { img: 'inovacao', t: ['Inovação e P&D', 'Innovation and R&D', 'Innovación e I+D'], p: [
      'Estamos em constante busca por novas tecnologias, processos e materiais. Nossa equipe de P&D entende as suas necessidades, agrega valor ao seu produto e diferencial competitivo à sua marca, com mais segurança e melhor experiência de uso.',
      'We are always looking for new technologies, processes and materials. Our R&D team understands your needs and adds value to your product and a competitive edge to your brand, with more safety and a better user experience.',
      'Buscamos constantemente nuevas tecnologías, procesos y materiales. Nuestro equipo de I+D entiende sus necesidades y suma valor a su producto y diferencial competitivo a su marca, con más seguridad y mejor experiencia de uso.'] },
  ],
  processos: [
    { k: 'ISBM-PET', p: ['Embalagens de PET com alta resistência mecânica, alto brilho e transparência.', 'PET packaging with high mechanical strength, high gloss and transparency.', 'Envases de PET con alta resistencia mecánica, alto brillo y transparencia.'] },
    { k: ['Sopro', 'Blow molding', 'Soplado'], p: ['Embalagens mais flexíveis (squeeze), com opções de acabamento e uso de resinas recicladas pós-consumo.', 'More flexible (squeeze) packaging, with finishing options and post-consumer recycled resins.', 'Envases más flexibles (squeeze), con opciones de acabado y uso de resinas recicladas posconsumo.'] },
    { k: ['Injeção', 'Injection', 'Inyección'], p: ['Processamento de resinas como PE e PP.', 'Processing of resins such as PE and PP.', 'Procesamiento de resinas como PE y PP.'] },
    { k: ['Decoração', 'Decoration', 'Decoración'], p: ['Serigrafia, rotulagem, tampografia, hot-stamping e aplicação sleeve.', 'Screen printing, labeling, pad printing, hot-stamping and sleeves.', 'Serigrafía, etiquetado, tampografía, hot-stamping y sleeve.'] },
  ],
  qualidadeTitulo: ['Qualidade indiscutível', 'Unquestionable quality', 'Calidad indiscutible'],
  qualidade: [
    ['Nosso Programa de Qualidade Assegurada garante que o produto saia da nossa fábrica diretamente para a linha de produção do cliente, sem precisar de inspeção no recebimento, ganhando em velocidade e segurança na produção.',
     'Our Quality Assurance Program ensures the product goes from our plant straight to the customer’s production line, with no incoming inspection, gaining speed and safety in production.',
     'Nuestro Programa de Calidad Asegurada garantiza que el producto salga de nuestra fábrica directamente a la línea de producción del cliente, sin inspección en la recepción, ganando velocidad y seguridad.'],
    ['Mantemos um rigoroso sistema de gestão de qualidade, com certificações ISO 9001:2015 e ISO 22716:2007 e rastreabilidade em todo o processo, desde a entrada da matéria-prima na fábrica até a expedição do produto para o cliente.',
     'We maintain a rigorous quality management system, certified to ISO 9001:2015 and ISO 22716:2007, with traceability across the whole process, from raw material intake to shipping.',
     'Mantenemos un riguroso sistema de gestión de calidad, con certificaciones ISO 9001:2015 e ISO 22716:2007 y trazabilidad en todo el proceso, desde la entrada de la materia prima hasta la expedición.'],
  ],
  isos: [
    { img: 'iso-9001', t: 'ISO 9001:2015', p: ['Sistema de gestão que garante a otimização de processos, maior agilidade no desenvolvimento de produtos e produção mais ágil, com foco na satisfação dos clientes aliado ao sucesso sustentado.', 'Management system that ensures optimized processes, faster product development and more agile production, focused on customer satisfaction and sustained success.', 'Sistema de gestión que garantiza procesos optimizados, desarrollo de productos y producción más ágiles, con foco en la satisfacción de los clientes y el éxito sostenido.'] },
    { img: 'iso-22716', t: 'ISO 22716:2007', p: ['A norma que define as boas práticas de fabricação aplicáveis à produção, controle, armazenamento e expedição de produtos cosméticos. Concedida pelo Bureau Veritas.', 'The standard that defines good manufacturing practices for the production, control, storage and shipping of cosmetic products. Granted by Bureau Veritas.', 'La norma que define las buenas prácticas de fabricación para producción, control, almacenamiento y expedición de cosméticos. Otorgada por Bureau Veritas.'] },
  ],
  sgi: [
    'A AB assume o compromisso de garantir a satisfação de seus clientes e partes interessadas, assegurando o atendimento dos requisitos legais e outros aplicáveis, por meio de boas práticas de fabricação e melhoria contínua do sistema de gestão integrado. Promovemos a prevenção da poluição e a proteção ambiental, atuamos na prevenção de lesões e doenças ocupacionais e reforçamos nosso compromisso com resultado, desenvolvimento humano, valorização das pessoas e contribuição social.',
    'AB is committed to the satisfaction of its customers and stakeholders, meeting legal and other applicable requirements through good manufacturing practices and continuous improvement of the integrated management system. We promote pollution prevention and environmental protection, act to prevent occupational injuries and illnesses, and reinforce our commitment to results, human development, valuing people and social contribution.',
    'AB asume el compromiso de garantizar la satisfacción de sus clientes y partes interesadas, cumpliendo los requisitos legales y aplicables mediante buenas prácticas de fabricación y mejora continua del sistema de gestión integrado. Promovemos la prevención de la contaminación y la protección ambiental, actuamos en la prevención de lesiones y enfermedades laborales y reforzamos nuestro compromiso con los resultados, el desarrollo humano, la valoración de las personas y la contribución social.',
  ],
  essencia: [
    { t: ['Missão', 'Mission', 'Misión'], p: ['Desenvolver, produzir e comercializar soluções em embalagens plásticas de forma consciente e sustentável, respeitando e contribuindo para o desenvolvimento socioambiental.', 'To develop, produce and sell plastic packaging solutions consciously and sustainably, respecting and contributing to social and environmental development.', 'Desarrollar, producir y comercializar soluciones en envases plásticos de forma consciente y sostenible, respetando y contribuyendo al desarrollo socioambiental.'] },
    { t: ['Visão', 'Vision', 'Visión'], p: ['Ser a melhor empresa de embalagens plásticas, reconhecida como parceira ideal através do desenvolvimento de soluções inovadoras, rentáveis e sustentáveis até 2027.', 'To be the best plastic packaging company, recognized as the ideal partner for developing innovative, profitable and sustainable solutions by 2027.', 'Ser la mejor empresa de envases plásticos, reconocida como socia ideal por desarrollar soluciones innovadoras, rentables y sostenibles hasta 2027.'] },
    { t: ['Propósito', 'Purpose', 'Propósito'], p: ['Conectar saúde e beleza.', 'Connecting health and beauty.', 'Conectar salud y belleza.'] },
  ],
  valores: [
    { t: ['Alegria', 'Joy', 'Alegría'], p: ['Tem atitudes que motivam os demais a contribuir para um ambiente de trabalho positivo e alegre.', 'Acts in ways that motivate others to build a positive, joyful workplace.', 'Tiene actitudes que motivan a los demás a contribuir a un ambiente de trabajo positivo y alegre.'] },
    { t: ['Humildade', 'Humility', 'Humildad'], p: ['Trata com igualdade e respeito todos os colaboradores, conhece suas limitações e é responsável pelo seu sucesso e sucesso da equipe.', 'Treats every colleague with equality and respect, knows their limits and is responsible for their own and the team’s success.', 'Trata con igualdad y respeto a todos, conoce sus limitaciones y es responsable de su éxito y el del equipo.'] },
    { t: ['Honra', 'Honor', 'Honor'], p: ['Atua de forma exemplar e honra os compromissos assumidos contribuindo para um ambiente de confiança.', 'Acts as an example and honors commitments, building an environment of trust.', 'Actúa de forma ejemplar y honra los compromisos asumidos, contribuyendo a un ambiente de confianza.'] },
  ],
  sustTitulo: ['Sustentabilidade: isso é AB!', 'Sustainability: that’s AB!', 'Sostenibilidad: ¡eso es AB!'],
  sustLead: [
    'Confira nosso Relatório de Sustentabilidade 2024 e descubra os compromissos que assumimos para construir um futuro mais sustentável.',
    'See our 2024 Sustainability Report and the commitments we have made to build a more sustainable future.',
    'Conozca nuestro Informe de Sostenibilidad 2024 y los compromisos que asumimos para construir un futuro más sostenible.',
  ],
  meta2027: ['Nosso compromisso até 2027 é fazer 40% da resina transformada na AB ser de origem reciclada pós-consumo.', 'Our commitment for 2027: 40% of the resin processed at AB will be post-consumer recycled.', 'Nuestro compromiso para 2027: que el 40% de la resina transformada en AB sea reciclada posconsumo.'],
  ods: ['Os Objetivos de Desenvolvimento Sustentável são um apelo global à ação para acabar com a pobreza, proteger o meio ambiente e o clima e garantir que as pessoas possam desfrutar de paz e prosperidade. A AB contribui com os ODS 3, 4, 9, 11 e 12.', 'The Sustainable Development Goals are a global call to end poverty, protect the environment and the climate and ensure people can enjoy peace and prosperity. AB contributes to SDGs 3, 4, 9, 11 and 12.', 'Los Objetivos de Desarrollo Sostenible son un llamado global para acabar con la pobreza, proteger el medio ambiente y el clima y garantizar que las personas disfruten de paz y prosperidad. AB contribuye con los ODS 3, 4, 9, 11 y 12.'],
  iafa: ['O Instituto A Fonte da Alegria mantém ações voltadas à melhoria da qualidade de vida das famílias e da comunidade e desperta a consciência social nos colaboradores, que podem participar como voluntários. Os projetos têm 3 bases: Criando Memórias (idosos), Inspirando o Amanhã (educação de crianças) e Nutrindo Gerações (doação de alimentos e suplementos).', 'The A Fonte da Alegria Institute runs actions to improve the quality of life of families and the community and raises social awareness among employees, who can volunteer. Its projects have 3 pillars: Creating Memories (elderly), Inspiring Tomorrow (children’s education) and Nourishing Generations (food and supplement donations).', 'El Instituto A Fonte da Alegria realiza acciones para mejorar la calidad de vida de las familias y la comunidad y despierta la conciencia social de los colaboradores, que pueden participar como voluntarios. Sus proyectos tienen 3 bases: Creando Recuerdos (adultos mayores), Inspirando el Mañana (educación infantil) y Nutriendo Generaciones (donación de alimentos y suplementos).'],
  carreirasTitulo: ['Junte-se a nós', 'Join us', 'Únase a nosotros'],
  carreirasLead: ['Criamos um ambiente alegre, acolhedor, inspirador e repleto de aprendizado. Juntos, construímos nossa qualidade todos os dias, por isso incentivamos o desenvolvimento contínuo de cada colaborador.', 'We create a joyful, welcoming and inspiring workplace full of learning. Together we build our quality every day, so we encourage each employee’s continuous development.', 'Creamos un ambiente alegre, acogedor, inspirador y lleno de aprendizaje. Juntos construimos nuestra calidad cada día, por eso incentivamos el desarrollo continuo de cada colaborador.'],
  cuidar: ['Programa Cuidar + de Você: prevenção da saúde em diferentes frentes de cuidado, considerando corpo, mente, espírito e relações. Inclui serviço de Capelania.', 'Cuidar + de Você program: preventive health across body, mind, spirit and relationships, including a chaplaincy service.', 'Programa Cuidar + de Você: prevención de la salud en distintos frentes, considerando cuerpo, mente, espíritu y relaciones. Incluye servicio de capellanía.'],
  contatoTitulo: ['Fale com a gente', 'Talk to us', 'Hable con nosotros'],
  contatoLead: ['Conte o que você precisa: embalagem da Linha AB, projeto exclusivo, pumps ou amostras. A equipe de vendas responde pelo WhatsApp.', 'Tell us what you need: AB Line packaging, a custom project, pumps or samples. The sales team answers on WhatsApp.', 'Cuéntenos qué necesita: envase de la Línea AB, proyecto exclusivo, bombas o muestras. El equipo de ventas responde por WhatsApp.'],
  pumpsTitulo: ['Pumps que se adaptam ao seu produto', 'Pumps that fit your product', 'Bombas que se adaptan a su producto'],
  pumpsLead: ['Os pumps da AB foram desenvolvidos para unir eficiência e design. Com tecnologia que garante dosagem precisa, resistência e vedação segura, eles elevam a experiência do seu cliente e valorizam o seu produto no PDV.', 'AB pumps combine efficiency and design. With technology for precise dosing, durability and secure sealing, they improve your customer’s experience and add value to your product on the shelf.', 'Las bombas de AB unen eficiencia y diseño. Con tecnología que garantiza dosificación precisa, resistencia y sellado seguro, elevan la experiencia de su cliente y valorizan su producto en el punto de venta.'],
  coresTitulo: ['Cartela de cores da Linha AB', 'AB Line color chart', 'Carta de colores de la Línea AB'],
  coresLead: ['Cores sólidas, peroladas e translúcidas para PEAD e PET, incluindo opção translúcida com resina reciclada. Para cores especiais, fale com a equipe de vendas.', 'Solid, pearlescent and translucent colors for HDPE and PET, including a translucent option with recycled resin. For special colors, talk to the sales team.', 'Colores sólidos, perlados y translúcidos para PEAD y PET, incluida una opción translúcida con resina reciclada. Para colores especiales, hable con ventas.'],
  pagamento: ['A embalagem perfeita para o seu produto agora pode ser paga no cartão de crédito, em até 12x.', 'The perfect packaging for your product can now be paid by credit card, in up to 12 installments (Brazil).', 'El envase perfecto para su producto ahora se puede pagar con tarjeta de crédito, hasta en 12 cuotas (Brasil).'],
};

export const premios = [
  ['2000', 'Boti – ADVB', ['O Boticário · Top de Marketing', 'O Boticário · Top de Marketing', 'O Boticário · Top de Marketing']],
  ['2008', 'Qlicar Produtivos', ['Natura · Embalagem', 'Natura · Packaging', 'Natura · Envase']],
  ['2012', 'Qlicar Produtivos', ['Natura · Embalagem', 'Natura · Packaging', 'Natura · Envase']],
  ['2013', 'Qlicar Produtivos', ['Natura · Embalagem', 'Natura · Packaging', 'Natura · Envase']],
  ['2013', 'ABRE', ['Ouro · Prêmio ABRE da Embalagem Brasileira', 'Gold · ABRE Brazilian Packaging Award', 'Oro · Premio ABRE del Envase Brasileño']],
  ['2015', 'Grandes Cases de Embalagens', ['Avon · Categoria Serviços', 'Avon · Services category', 'Avon · Categoría Servicios']],
  ['2015', 'Melhor Fornecedor', ['Avon · Categoria Serviços', 'Avon · Services category', 'Avon · Categoría Servicios']],
  ['2018', 'Grandes Cases de Embalagens', ['Grupo Boticário · Baby Boti', 'Grupo Boticário · Baby Boti', 'Grupo Boticário · Baby Boti']],
  ['2019', 'ABRE', ['Ouro · Prêmio ABRE da Embalagem Brasileira', 'Gold · ABRE Brazilian Packaging Award', 'Oro · Premio ABRE del Envase Brasileño']],
  ['2022', 'ABRE', ['Bronze · Frasco Tato Senses', 'Bronze · Tato Senses bottle', 'Bronce · Frasco Tato Senses']],
  ['2022', 'Grandes Cases de Embalagens', ['Tato Senses · Fresh.CO Cosméticos', 'Tato Senses · Fresh.CO Cosméticos', 'Tato Senses · Fresh.CO Cosméticos']],
  ['2023', 'ABRE', ['Ouro · Prêmio ABRE da Embalagem Brasileira', 'Gold · ABRE Brazilian Packaging Award', 'Oro · Premio ABRE del Envase Brasileño']],
  ['2024', 'PADP', ['Prata · 27º Encontro de Parceiros', 'Silver · 27th Partners Meeting', 'Plata · 27º Encuentro de Socios']],
  ['2024', 'Embanews', ['Nº 1 · Tecnologia e Qualidade', 'No. 1 · Technology and Quality', 'Nº 1 · Tecnología y Calidad']],
  ['2024', 'Grandes Cases de Embalagens', ['O Boticário · Cuide-se Creme', 'O Boticário · Cuide-se Creme', 'O Boticário · Cuide-se Creme']],
  ['2025', 'PADP', ['Ouro · 28º Encontro de Parceiros', 'Gold · 28th Partners Meeting', 'Oro · 28º Encuentro de Socios']],
];

export const sustentabilidade = [
  { img: 'sus-carbono', t: ['Carbono Neutro', 'Carbon Neutral', 'Carbono Neutro'], p: ['Conquistamos o certificado de Empresa Carbono Neutro com a neutralização da quantidade de gases que emitimos direta e indiretamente.', 'We earned the Carbon Neutral Company certificate by offsetting the gases we emit directly and indirectly.', 'Obtuvimos el certificado de Empresa Carbono Neutro al neutralizar los gases que emitimos directa e indirectamente.'] },
  { img: 'sus-energia', t: ['Energia renovável', 'Renewable energy', 'Energía renovable'], p: ['A energia que utilizamos em nossas operações provém de fontes 100% renováveis.', 'The energy used in our operations comes from 100% renewable sources.', 'La energía que usamos en nuestras operaciones proviene de fuentes 100% renovables.'] },
  { img: 'sus-lixozero', t: ['Lixo Zero', 'Zero Waste', 'Basura Cero'], p: ['Com gestão total de resíduos de processos, somos uma empresa certificada Lixo Zero, destinando mais de 95% de todos os nossos resíduos de forma sustentável.', 'With full process waste management, we are a certified Zero Waste company, sending over 95% of our waste to sustainable destinations.', 'Con gestión total de residuos, somos empresa certificada Basura Cero y destinamos más del 95% de nuestros residuos de forma sostenible.'] },
  { img: 'sus-chuva', t: ['Reutilização da água da chuva', 'Rainwater reuse', 'Reutilización del agua de lluvia'], p: ['Utilizamos água da chuva para o abastecimento dos banheiros, cerca de 10% do consumo total de água da operação.', 'Rainwater supplies our restrooms, about 10% of the operation’s total water use.', 'Usamos agua de lluvia en los baños, cerca del 10% del consumo total de agua.'] },
  { img: 'sus-compostagem', t: ['Programa de compostagem', 'Composting program', 'Programa de compostaje'], p: ['Desde 2024, aproximadamente 20% dos resíduos orgânicos do refeitório vão para compostagem.', 'Since 2024, about 20% of the cafeteria’s organic waste goes to composting.', 'Desde 2024, cerca del 20% de los residuos orgánicos del comedor va a compostaje.'] },
  { img: 'sus-coleta', t: ['Coleta seletiva', 'Waste sorting', 'Recolección selectiva'], p: ['Taxa de reciclagem maior que 90% há 4 anos. A média anual da coleta, incluindo os resíduos de produção, é de mais de 440 toneladas.', 'Recycling rate above 90% for 4 years. Average annual collection, including production waste, exceeds 440 tonnes.', 'Tasa de reciclaje superior al 90% hace 4 años. La recolección anual, incluidos residuos de producción, supera 440 toneladas.'] },
  { img: 'sus-pev', t: ['Ponto de coleta voluntário', 'Drop-off point', 'Punto de recolección voluntaria'], p: ['PEV para pilhas, baterias e óleo de cozinha usado. Desde 2022, mais de 200 litros de óleo por ano deixaram de ser descartados de forma inadequada.', 'Drop-off point for batteries and used cooking oil. Since 2022, over 200 liters of oil a year no longer go to improper disposal.', 'Punto de entrega de pilas, baterías y aceite usado. Desde 2022, más de 200 litros de aceite al año dejaron de desecharse de forma inadecuada.'] },
];

export const beneficios = [
  { t: ['Educação', 'Education', 'Educación'], i: [['Convênio com escola de idiomas', 'Language school partnership', 'Convenio con escuela de idiomas'], ['Treinamentos e capacitações contínuas', 'Ongoing training', 'Capacitaciones continuas'], ['Programa Jovem Aprendiz', 'Young Apprentice program', 'Programa Joven Aprendiz']] },
  { t: ['Finanças', 'Finances', 'Finanzas'], i: [['PPR · Participação nos Resultados', 'Profit sharing (PPR)', 'Participación en los resultados (PPR)'], ['Empréstimo consignado', 'Payroll loans', 'Préstamo con descuento en nómina'], ['Desconto em produtos Catarinense Pharma', 'Catarinense Pharma product discount', 'Descuento en productos Catarinense Pharma'], ['Vale-transporte e convênio estacionamento', 'Transit pass and parking', 'Vale de transporte y estacionamiento']] },
  { t: ['Saúde e família', 'Health and family', 'Salud y familia'], i: [['Plano de saúde e odontológico', 'Health and dental plans', 'Plan de salud y odontológico'], ['Seguro de vida', 'Life insurance', 'Seguro de vida'], ['Auxílio creche', 'Childcare aid', 'Ayuda para guardería'], ['Restaurante interno', 'On-site restaurant', 'Restaurante interno'], ['Wellhub (Gympass)', 'Wellhub (Gympass)', 'Wellhub (Gympass)']] },
  { t: ['Projetos e eventos', 'Projects and events', 'Proyectos y eventos'], i: [['PABS · Programa AB Plast de Sugestões', 'PABS · AB Plast suggestion program', 'PABS · Programa de sugerencias AB Plast'], ['SIPAT, Semana da Inovação e da Sustentabilidade', 'Safety, Innovation and Sustainability weeks', 'Semanas de Seguridad, Innovación y Sostenibilidad'], ['Homenagem por Tempo de Casa e Festa Junina', 'Length-of-service awards and June festival', 'Homenaje por antigüedad y Fiesta Junina']] },
];

export const faq = [
  [['Qual é a menor e a maior volumetria da Linha AB?', 'What are the smallest and largest AB Line capacities?', '¿Cuál es el menor y el mayor volumen de la Línea AB?'], ['O catálogo atual vai de frasnagas de 10 ml (Prainha) até o frasco de 1 litro (Ubatuba).', 'The current catalog goes from 10 ml tube bottles (Prainha) to the 1 liter bottle (Ubatuba).', 'El catálogo actual va de frascos squeeze de 10 ml (Prainha) hasta el frasco de 1 litro (Ubatuba).']],
  [['A partir de quantas unidades consigo decorar minha embalagem?', 'From what quantity can I decorate my packaging?', '¿A partir de cuántas unidades puedo decorar mi envase?'], ['A partir de 10 mil peças podemos rotular ou serigrafar.', 'From 10,000 pieces we can label or screen print.', 'A partir de 10 mil piezas podemos etiquetar o serigrafiar.']],
  [['Todas as embalagens são vendidas em quantidade mínima de 1.000 peças?', 'Are all items sold with a 1,000-piece minimum?', '¿Todos los envases se venden con mínimo de 1.000 piezas?'], ['Confira com o comercial quais coleções vendemos com esta quantidade.', 'Check with sales which collections are sold in this quantity.', 'Consulte con ventas qué colecciones vendemos en esta cantidad.']],
  [['A AB vende tampas apenas de cor branca e preta?', 'Does AB only sell white and black caps?', '¿AB vende tapas solo en blanco y negro?'], ['Não. Entre em contato com o comercial e conheça todas as possibilidades e quantidades mínimas para personalização.', 'No. Contact sales to learn all options and minimum quantities for customization.', 'No. Contacte a ventas para conocer todas las opciones y cantidades mínimas de personalización.']],
  [['A AB tem pumps e válvulas?', 'Does AB offer pumps and valves?', '¿AB tiene bombas y válvulas?'], ['Sim: a linha de pumps AB tem pump dosadora, spray, mini trigger, fine mist ouro e dosadora de tratamento, com gargalos 20/410, 24/410 e 28/410.', 'Yes: the AB pump line includes lotion, spray, mini trigger, gold fine mist and treatment pumps, in 20/410, 24/410 and 28/410 neck finishes.', 'Sí: la línea de bombas AB incluye dosificadora, spray, mini gatillo, fine mist oro y dosificadora de tratamiento, en cuellos 20/410, 24/410 y 28/410.']],
  [['A AB trabalha com sacos e plástico bolha?', 'Does AB make bags or bubble wrap?', '¿AB trabaja con bolsas y plástico de burbujas?'], ['Não.', 'No.', 'No.']],
];

// ---------- mercados e segmentos ----------
export const mercados = [
  { slug: 'cosmeticos', img: 'm-cosmeticos', hero: 'hero-itapema', nome: ['Cosméticos', 'Cosmetics', 'Cosméticos'],
    titulo: ['Embalagens influenciam a decisão de compra em 99% dos casos.', 'Packaging influences the purchase decision in 99% of cases.', 'Los envases influyen en la decisión de compra en el 99% de los casos.'],
    p: ['Beleza, materiais de alta qualidade e a experiência de uso da embalagem agregam valor ao seu produto, principalmente no mercado de cosméticos. Garanta praticidade, durabilidade e design inovador em frascos, potes, tampas e embalagens com a qualidade AB.', 'Beauty, high-quality materials and the packaging’s user experience add value to your product, especially in cosmetics. Get practicality, durability and innovative design in bottles, jars, caps and packaging with AB quality.', 'Belleza, materiales de alta calidad y la experiencia de uso del envase suman valor a su producto, sobre todo en cosméticos. Garantice practicidad, durabilidad y diseño innovador en frascos, potes y tapas con la calidad AB.'],
    seg: ['cabelos', 'corporais', 'faciais', 'solar', 'bodysplash'] },
  { slug: 'petcare', img: 'm-petcare', hero: 'hero-pet', nome: ['PetCare', 'Pet care', 'PetCare'],
    titulo: ['Valorize seu produto: todas as possibilidades para o PetCare.', 'Add value to your product: every option for pet care.', 'Valorice su producto: todas las posibilidades para PetCare.'],
    p: ['Shampoos, condicionadores, colônias e sprays para pets pedem embalagens resistentes, práticas no banho e bonitas na prateleira. A Linha AB tem coleções em PEAD e PET, com flip-top, spray e válvulas, prontas para a sua marca.', 'Pet shampoos, conditioners, colognes and sprays need packaging that is tough, easy to use at bath time and attractive on the shelf. The AB Line has HDPE and PET collections with flip-tops, sprays and pumps, ready for your brand.', 'Champús, acondicionadores, colonias y sprays para mascotas piden envases resistentes, prácticos en el baño y lindos en la góndola. La Línea AB tiene colecciones en PEAD y PET, con flip-top, spray y válvulas.'],
    seg: [] },
  { slug: 'farma', img: 'm-farma', hero: 'hero-farma', nome: ['Farma', 'Pharma', 'Farma'],
    titulo: ['Dermocosméticos, fito e suplementos: sua fórmula merece mais proteção e sofisticação.', 'Dermocosmetics, herbal medicines and supplements: your formula deserves more protection and sophistication.', 'Dermocosméticos, fito y suplementos: su fórmula merece más protección y sofisticación.'],
    p: ['Muito além da estética, a embalagem protege a fórmula, preserva a eficácia dos ativos e garante uma experiência premium para o consumidor. Com opções personalizadas em formatos, acabamentos e materiais, criamos embalagens que combinam sofisticação, funcionalidade e segurança, atendendo às exigências do mercado.', 'Beyond aesthetics, packaging protects the formula, preserves the efficacy of the actives and ensures a premium experience. With custom shapes, finishes and materials, we create packaging that combines sophistication, functionality and safety, meeting market requirements.', 'Más allá de la estética, el envase protege la fórmula, preserva la eficacia de los activos y garantiza una experiencia premium. Con formatos, acabados y materiales personalizados, creamos envases que combinan sofisticación, funcionalidad y seguridad.'],
    seg: ['dermo', 'fito', 'oral'] },
];
export const segmentos = {
  cabelos: { nome: ['Cabelos', 'Hair care', 'Cabello'], img: 's-cabelos' },
  corporais: { nome: ['Corporais', 'Body care', 'Corporales'], img: 's-corporais' },
  faciais: { nome: ['Faciais', 'Face care', 'Faciales'], img: 's-faciais' },
  solar: { nome: ['Solar', 'Sun care', 'Solar'], img: 's-solar' },
  bodysplash: { nome: ['Bodysplash', 'Body splash', 'Bodysplash'], img: 's-desodorante' },
  dermo: { nome: ['Dermocosméticos', 'Dermocosmetics', 'Dermocosméticos'], img: 's-dermo' },
  fito: { nome: ['Fitoterápicos e suplementos', 'Herbal and supplements', 'Fitoterápicos y suplementos'], img: 'farma-1' },
  oral: { nome: ['Oral care', 'Oral care', 'Oral care'], img: 'farma-asepsia' },
  farma: { nome: ['Farma', 'Pharma', 'Farma'], img: 'm-farma' },
  petcare: { nome: ['PetCare', 'Pet care', 'PetCare'], img: 'm-petcare' },
};
// mercado da lista "A coleção é perfeita para" do site atual -> chave
const SEGMAP = { 'Solar': 'solar', 'Faciais': 'faciais', 'Cabelos': 'cabelos', 'Farma': 'farma', 'PetCare': 'petcare', 'Corporais': 'corporais', 'Bodysplash': 'bodysplash' };

// ---------- catálogo ----------
export const slug = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const COLTXT = {
  camboriu: { cor: '#2f5f86', p: [
    null,
    'Camboriú packaging was designed to set the product apart on the shelf. Its cylindrical shape and exclusive flip-top cap make opening and closing easy, giving a clean, modern look to lines such as hair care, dermocosmetics, body deodorants and pet care.',
    'Los envases de la Colección Camboriú fueron pensados para diferenciar el producto en el punto de venta. Su formato cilíndrico y la tapa exclusiva flip-top facilitan abrir y cerrar, con un aspecto limpio y moderno para cabello, dermocosméticos, desodorantes corporales y petcare.'] },
  floripa: { cor: '#1f6f72', p: [null,
    'The Floripa collection has an ergonomic design for a more practical, comfortable experience. Distinctive shapes such as tube bottles and oval bottles are easy to carry and store, and the exclusive flip-top cap adds innovation and functionality.',
    'La colección Floripa tiene un diseño ergonómico para una experiencia más práctica y cómoda. Formatos diferenciados como frascos squeeze y frascos ovalados facilitan el transporte y el almacenamiento, y la tapa flip-top exclusiva aporta innovación y funcionalidad.'] },
  garopaba: { cor: '#1d7a62', p: [null,
    'Garopaba packaging was planned for liquid soaps, moisturizers, hair care, body and face oils, body deodorants and full men’s, women’s and pet lines. Its shoulder gives the bottle elegance; the 24/410 and 28/410 necks make caps and pumps easy to find, plus AB Line options such as droppers with wiper plugs, oil-orifice plugs with screw caps and flip-tops.',
    'Los envases de la colección Garopaba fueron pensados para jabones líquidos, cremas hidratantes, cabello, aceites corporales y faciales, desodorantes y líneas completas masculinas, femeninas y petcare. Su hombro aporta elegancia y los cuellos 24/410 y 28/410 facilitan encontrar tapas y válvulas, además de goteros con obturador raspador, obturador para aceite con tapa rosca y flip-top de la Línea AB.'] },
  itajuba: { cor: '#7357a8', p: [null,
    'Modern, functional HDPE packaging in 60, 100, 120, 150 and 200 ml bottles, ideal for squeeze products. Itajuba uses the standard Vera flip-top (new mold) with 2 or 4 mm orifice and snap or upside-down neck. Minimal and symmetrical, perfect for lotions, creams, gels, shampoos, conditioners, oral care, pet care, herbal products, travel sizes and samples. Made in HDPE with a PCR-HDPE option.',
    'Envases modernos y funcionales en PEAD, en frascos de 60, 100, 120, 150 y 200 ml, ideales para productos squeeze. Itajuba usa la tapa flip-top estándar Vera (molde nuevo) con orificio de 2 o 4 mm y cuello snap o upside-down. Minimalistas y simétricos, perfectos para lociones, cremas, geles, champús, acondicionadores, oral care, petcare, fitoterápicos, tamaños de viaje y muestras. En PEAD y opción PEAD-PCR.'] },
  itapema: { cor: '#a8322f', p: [null,
    'For dermocosmetics such as face, body and hair creams or treatment masks and herbal products, the Itapema collection offers 60 and 100 ml jars without refill and the option of 30 and 50 ml refills.',
    'Para dermocosméticos como cremas o mascarillas de tratamiento facial, corporal y capilar y fitoterápicos, la colección Itapema ofrece potes de 60 y 100 ml sin repuesto y la opción de repuestos de 30 y 50 ml.'] },
  joaquina: { cor: '#b5652b', p: [null,
    'The Joaquina collection, with 250 and 300 ml PET bottles, stands out for its minimal design. With Garopaba flip-top, plug and screw caps and upside-down valves, it is practical and elegant. Made in virgin PET and PCR PET, ideal for pet care, deodorants and dermocosmetics for men’s (shampoo, conditioner, body wash) and women’s lines (hair kits, spray and face).',
    'La colección Joaquina, con frascos de PET de 250 y 300 ml, se destaca por su diseño minimalista. Con tapas flip-top, obturador y tapa rosca Garopaba y válvulas upside-down, ofrece practicidad y elegancia. En PET virgen y PET PCR, ideal para petcare, desodorantes y dermocosméticos masculinos (champú, acondicionador, jabón líquido) y femeninos (kit capilar, spray y rostro).'] },
  jurere: { cor: '#4f8c86', p: [null,
    'With a modern, refined design, Jurerê packaging is perfect for liquid soaps, body moisturizers and hair care lines. Its conical shape makes it ergonomic and easy to handle, and the 28 mm neck is ideal for pumps.',
    'Con un diseño moderno y refinado, los envases Jurerê son perfectos para jabones líquidos, hidratantes corporales y cuidado capilar. Su formato cónico es ergonómico y fácil de manipular, y el cuello de 28 mm es ideal para válvulas.'] },
  laguna: { cor: '#b0566a', p: [
    'A Coleção Laguna tem design minimalista, linhas retas e detalhes curvos na base. Seu diferencial está na possibilidade de personalização da tampa, pump e cachê, trazendo uma identidade única para a marca. Pensada para a perfumaria de entrada, combina estética e funcionalidade para valorizar o produto no ponto de venda.',
    'The Laguna collection has a minimal design, straight lines and curved details at the base. Its edge is the option to customize the cap, pump and collar, giving the brand a unique identity. Designed for entry-level perfumery, it combines aesthetics and function to enhance the product on the shelf.',
    'La Colección Laguna tiene diseño minimalista, líneas rectas y detalles curvos en la base. Su diferencial es la posibilidad de personalizar la tapa, la bomba y el collar, dando una identidad única a la marca. Pensada para la perfumería de entrada, combina estética y funcionalidad.'] },
  prainha: { cor: '#a07d5a', p: [null,
    'Prainha offers 30 and 50 ml HDPE/LDPE bottles with a minimal, straight-shoulder design in cylindrical and oval versions, plus the new 10 and 20 ml tube bottles. Options include a plug with a 1.0 mm applicator tip and screw cap, flip-top cap or 20/415 spray/lotion valve. Ideal for liquid foundations, face sunscreens and creams, kids’ lines, men’s beard kits and women’s products such as hand sanitizer and serum, plus pet care, herbal products and oral care.',
    'Prainha ofrece frascos de 30 y 50 ml en PEAD/PEBD con diseño minimalista y hombro recto, en versiones cilíndrica y ovalada, además de los nuevos frascos squeeze de 10 y 20 ml. Opciones de obturador con pico aplicador de 1,0 mm y tapa rosca, flip-top o válvula spray/loción 20/415. Ideal para bases líquidas, protectores faciales y cremas, líneas infantiles, kits de barba y productos femeninos como higienizante de manos y sérum, además de petcare, fitoterápicos y oral care.'] },
  'sao-francisco': { cor: '#2f6f8e', p: [
    'As embalagens da coleção São Francisco são versáteis para os segmentos de dermocosméticos, protetores solares e linha pet. Formato oval, simples e de fácil manuseio, é produzida em PEAD e permite adaptações para tampas flip-top, spray e válvula.',
    'São Francisco packaging is versatile for dermocosmetics, sunscreens and pet lines. Oval, simple and easy to handle, it is made in HDPE and accepts flip-top caps, sprays and pumps.',
    'Los envases São Francisco son versátiles para dermocosméticos, protectores solares y línea pet. Formato ovalado, simple y fácil de usar, en PEAD, admite tapas flip-top, spray y válvula.'] },
  ubatuba: { cor: '#c27a1c', p: [null,
    'The Ubatuba collection is made of straight-shoulder cylindrical HDPE bottles, available with different neck finishes and caps for a wide range of products: simple, functional and versatile, from 60 ml to 1 liter.',
    'La colección Ubatuba está compuesta por frascos cilíndricos de PEAD con hombros rectos, disponibles con distintos cuellos y tapas para una gran variedad de productos: forma simple y funcional, de 60 ml a 1 litro.'] },
  vera: { cor: '#6c8a3a', p: [null,
    'Elegant and sophisticated, in tube bottles and bottles, the Vera collection offers versatile cap options besides its exclusive flip-top, and decoration by screen printing.',
    'Formato elegante y sofisticado, en frascos squeeze y frascos, la Colección Vera ofrece versatilidad de tapas además de su flip-top exclusiva, y personalización por serigrafía.'] },
};

const TIPO = {
  Frasco: { k: 'frasco', n: ['Frascos', 'Bottles', 'Frascos'], s: ['Frasco', 'Bottle', 'Frasco'] },
  Frasnaga: { k: 'frasnaga', n: ['Frasnagas', 'Tube bottles', 'Frascos squeeze'], s: ['Frasnaga', 'Tube bottle', 'Frasco squeeze'] },
  Pote: { k: 'pote', n: ['Potes', 'Jars', 'Potes'], s: ['Pote', 'Jar', 'Pote'] },
  Tampa: { k: 'tampa', n: ['Tampas', 'Caps', 'Tapas'], s: ['Tampa', 'Cap', 'Tapa'] },
  Batoque: { k: 'batoque', n: ['Batoques', 'Plugs', 'Obturadores'], s: ['Batoque', 'Plug', 'Obturador'] },
  'Conta-Gotas': { k: 'conta-gotas', n: ['Conta-gotas', 'Droppers', 'Goteros'], s: ['Conta-gotas', 'Dropper', 'Gotero'] },
  Caches: { k: 'cache', n: ['Cachês', 'Collars', 'Collares'], s: ['Cachê', 'Collar', 'Collar'] },
};
export const TIPOS = Object.values(TIPO);

// nome do produto em en/es (palavras do site atual)
const TROCA = [
  [/Pote \+ caneca/i, ['Jar + inner cup', 'Pote + vaso interno']], [/Pote sem caneca/i, ['Jar without inner cup', 'Pote sin vaso interno']],
  [/^Caneca/i, ['Inner cup (refill)', 'Vaso interno (repuesto)']], [/Conta-Gotas/i, ['Dropper', 'Gotero']],
  [/Batoque Raspador/i, ['Wiper plug', 'Obturador raspador']], [/Batoque/i, ['Plug', 'Obturador']],
  [/Cachê Laguna Com Tampa/i, ['Laguna collar with cap', 'Collar Laguna con tapa']], [/Cachê Laguna Sem Tampa/i, ['Laguna collar without cap', 'Collar Laguna sin tapa']],
  [/Frasco Laguna/i, ['Laguna bottle', 'Frasco Laguna']], [/Tampa Pote/i, ['Jar cap', 'Tapa de pote']], [/Tampa/i, ['Cap', 'Tapa']], [/Frasnaga/i, ['Tube bottle', 'Frasco squeeze']], [/Frasco/i, ['Bottle', 'Frasco']],
  [/ Rosca/i, [' screw', ' rosca']], [/ Curva/i, [' curved', ' curva']], [/ Reta/i, [' straight', ' recta']],
];
function nomeL(n) {
  const out = [n, n, n];
  for (const li of [1, 2]) {
    let s = n;
    for (const [re, tr] of TROCA) s = s.replace(re, tr[li - 1]);
    out[li] = s;
  }
  return out.map(s => s.replace(/(\d)ml/g, '$1 ml'));
}
const limpo = v => (v || '').replace(/^(Resina|Gargalo|Molde|Dimensão|Desenho):\s*/i, '').replace(/\s+\/\s*|\s*\/\s+/g, ' / ').replace(/,\s*/g, ', ').replace(/\s+/g, ' ').trim();
const RESINA = r => { const s = r.toUpperCase(); const out = []; if (s.includes('PET')) out.push('PET'); if (/PEAD|PEAD\/BD/.test(s)) out.push('PEAD'); if (/PEBD|\/BD/.test(s)) out.push('PEBD'); if (/\bPP\b/.test(s)) out.push('PP'); return out; };
const GARG = g => { const s = g.replace(/^Rosca 20$/, 'R20'); return s ? s.split(' / ')[0] : ''; };

const porRef = new Map();
export const colecoes = dados.colecoes.map(c => {
  const s = slug(c.nome);
  const tx = COLTXT[s];
  const desc = c.descricao[0] || tx.p[0];
  const at = Object.fromEntries(c.atributos.map(([k, v]) => [k.replace(':', '').trim(), v.replace(/\.$/, '')]));
  return {
    slug: s, nome: c.nome, cor: tx.cor, img: temImg(`col-${s}`) ? `col-${s}` : `g-${s}-1`,
    desc: [desc, tx.p[1], tx.p[2]],
    vers: at['Versatilidade'], pers: at['Personalização'], mat: at['Matéria-prima'],
    mercados: c.mercados.map(m => SEGMAP[m]).filter(Boolean),
    galeria: c.galeria.slice(0, 14).map((_, i) => `g-${s}-${i + 1}`).filter(temImg),
    itens: c.produtos.map(p => {
      const a = p.atrib;
      const ref = limpo(a['Des./ref.']).replace(/^Desenho:\s*/, '').replace(', ', ' / ');
      const id = ref.replace(/\D+/g, '-').replace(/^-|-$/g, '');
      const key = id;
      if (!porRef.has(key)) {
        const nome = p.nome.replace(/\s+/g, ' ').replace('+ Caneca', '+ caneca').trim();
        const nom = (nome.match(/(\d+)\s*ml/i) || [])[1];
        porRef.set(key, {
          slug: slug(`${nome}-${s}-${id}`), ref, nome: nomeL(nome), tipo: TIPO[p.aba], foto: 'f-' + slug(p.foto.split('/').pop().replace(/\.[a-z]+$/, '')),
          resina: limpo(a['Resina']), resinas: RESINA(limpo(a['Resina'])), gargalo: limpo(a['Gargalo']), garg: GARG(limpo(a['Gargalo'])),
          molde: limpo(a['Molde']), dim: limpo(a['Dimensão']).replace(/×/g, 'x'), vol: limpo(a['Volume']), nominal: nom ? +nom : null,
          colecoes: [],
        });
      }
      porRef.get(key).colecoes.push(s);
      return key;
    }),
  };
});
export const produtos = [...porRef.values()];
for (const c of colecoes) c.itens = c.itens.map(k => porRef.get(k));
export const COL = Object.fromEntries(colecoes.map(c => [c.slug, c]));
for (const p of produtos) p.mercados = [...new Set(p.colecoes.flatMap(s => COL[s].mercados))];

// pumps: dados do site atual (abplast.com.br/pumps)
export const pumps = [
  { slug: 'pump-dosadora', img: 'pump-dosadora', nome: ['Pump Dosadora · 2 ml', 'Lotion pump · 2 ml', 'Bomba dosificadora · 2 ml'],
    p: ['Ideal para produtos líquidos como shampoos, cremes, géis e loções. Trava on/off e mola externa sem contato com o bulk.', 'Ideal for liquids such as shampoos, creams, gels and lotions. On/off lock and external spring with no contact with the bulk.', 'Ideal para líquidos como champús, cremas, geles y lociones. Traba on/off y resorte externo sin contacto con el producto.'],
    tipo: 'Lotion', vazao: '2,00 cc', caixa: '800', variantes: [
      { garg: '24/410', colar: ['Branco', 'White', 'Blanco'], atuador: ['Branco', 'White', 'Blanco'], modelo: 'TP309CR' },
      { garg: '28/410', colar: ['Preto, branco ou dourado*', 'Black, white or gold*', 'Negro, blanco o dorado*'], atuador: ['Preto ou branco', 'Black or white', 'Negro o blanco'], modelo: 'TP309C · TP309CA (750 peças)' },
    ], nota: ['*Colar dourado apenas com atuador branco.', '*Gold collar only with white actuator.', '*Collar dorado solo con actuador blanco.'], colecoes: ['camboriu', 'garopaba', 'joaquina', 'jurere', 'ubatuba'] },
  { slug: 'pump-spray', img: 'pump-spray', nome: ['Pump Spray 20/410 · 0,13 ml', 'Spray pump 20/410 · 0.13 ml', 'Bomba spray 20/410 · 0,13 ml'],
    p: ['Alto padrão de tecnologia de pulverização. Fecha suave e inclui tampa montada.', 'High-standard spray technology. Soft closing, overcap included and assembled.', 'Alta tecnología de pulverización. Cierre suave e incluye tapa montada.'],
    tipo: 'Spray', vazao: '0,13 cc', caixa: '1000', variantes: [{ garg: '20/410', colar: ['Branco', 'White', 'Blanco'], atuador: ['Branco', 'White', 'Blanco'], sobretampa: ['Cristal', 'Clear', 'Cristal'], modelo: 'TP603A' }], colecoes: ['garopaba', 'prainha'] },
  { slug: 'mini-trigger', img: 'pump-trigger', nome: ['Mini Trigger · 0,25 ml', 'Mini trigger · 0.25 ml', 'Mini gatillo · 0,25 ml'],
    p: ['Alto padrão em tecnologia de pulverização por gatilho, projetado para dar uma sensação confortável ao manusear. Trava on/off.', 'High-standard trigger spray technology, designed to feel comfortable in the hand. On/off lock.', 'Pulverización por gatillo de alto estándar, diseñada para un manejo cómodo. Traba on/off.'],
    tipo: 'Spray', vazao: '0,25 ml', caixa: '1000', variantes: [{ garg: '24/410', colar: ['Preto', 'Black', 'Negro'], atuador: ['Preto', 'Black', 'Negro'], modelo: 'Mini Trigger TP105A' }], colecoes: ['camboriu', 'garopaba', 'joaquina', 'ubatuba'] },
  { slug: 'fine-mist-ouro', img: 'pump-finemist', nome: ['Pump Spray Fine Mist Ouro · 0,12 ml', 'Gold fine mist spray · 0.12 ml', 'Bomba spray fine mist oro · 0,12 ml'],
    p: ['Pulverização fina com acabamento dourado brilho. Fecha suave e inclui tampa montada.', 'Fine mist spray with a glossy gold finish. Soft closing, overcap included and assembled.', 'Pulverización fina con acabado dorado brillante. Cierre suave e incluye tapa montada.'],
    tipo: 'Spray', vazao: '0,12 cc', caixa: '528', variantes: [{ garg: '24/410', colar: ['Dourado brilho', 'Glossy gold', 'Dorado brillante'], atuador: ['Dourado brilho', 'Glossy gold', 'Dorado brillante'], sobretampa: ['Cristal', 'Clear', 'Cristal'], modelo: 'TP24P-11' }], colecoes: ['garopaba'] },
  { slug: 'dosadora-tratamento', img: 'pump-tratamento', nome: ['Pump Dosadora de Tratamento · 0,13 ml', 'Treatment pump · 0.13 ml', 'Bomba de tratamiento · 0,13 ml'],
    p: ['Compatível com várias funcionalidades e aplicação precisa. Produto sem contato com partes metálicas, sem resina POM, inclui tampa montada.', 'Suits many uses with precise application. No contact with metal parts, POM-free, overcap included.', 'Compatible con varias funciones y aplicación precisa. Sin contacto con partes metálicas, sin resina POM, incluye tapa montada.'],
    tipo: ['Tratamento', 'Treatment', 'Tratamiento'], vazao: '0,13 ml', caixa: '1000', variantes: [{ garg: '20/410', colar: ['Branco', 'White', 'Blanco'], atuador: ['Branco', 'White', 'Blanco'], sobretampa: ['Cristal', 'Clear', 'Cristal'], modelo: 'TP802C' }], colecoes: ['garopaba', 'prainha'] },
];

// cartela de cores (a mesma em todas as coleções no site atual)
const NOMECOR = { 'Sólidas': ['Sólidas', 'Solid', 'Sólidos'], 'Peroladas': ['Peroladas', 'Pearlescent', 'Perlados'], 'Translúcidas': ['Translúcidas', 'Translucent', 'Translúcidos'], 'Translúcidas reciclagem': ['Translúcida com resina reciclada', 'Translucent, recycled resin', 'Translúcido con resina reciclada'] };
export const cores = dados.colecoes[0].cores.map(g => ({
  grupo: g.grupo.replace('Cores ', ''),
  tipos: g.tipos.map(t => ({ tipo: NOMECOR[t.tipo] || [t.tipo, t.tipo, t.tipo], cores: t.cores.map(c => ({ nome: c.nome, img: 'cor-' + slug(c.nome) })) })),
}));

export const marcasClientes = ['grupo-boticario', 'avon', 'coty', 'bioderma', 'ache', 'brainfarma', 'dermage', 'flora', 'ajinomoto', 'cottonbaby', 'amend', 'bioextratus', 'clamed', 'daudt', 'fgm'];
