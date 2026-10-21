// As 32 serras do site atual (revalserras.com.br/serras/produto/<id>), com o texto do site em português (só acertos de
// grafia: "riscador", "longitudinais", "Finger", "seccionadoras") e a tradução para inglês e espanhol feita por nós,
// porque o site atual não traduz as fichas. As tabelas de medidas são as imagens do próprio site (já em pt/es/en).
// spec: [rótulo, {pt:[...], en:[...], es:[...]}]; rótulos traduzidos em ROTULOS.

export const ROTULOS = {
  aplicacao: { pt: 'Aplicação', en: 'Application', es: 'Aplicación' },
  material: { pt: 'Material a ser cortado', en: 'Material to be cut', es: 'Material a cortar' },
  maquina: { pt: 'Máquina', en: 'Machine', es: 'Máquina' },
  maquinas: { pt: 'Máquinas', en: 'Machines', es: 'Máquinas' },
  dentes: { pt: 'Dentes', en: 'Teeth', es: 'Dientes' },
  fornecimento: { pt: 'Fornecimento', en: 'Supply', es: 'Suministro' },
  tiposDentes: { pt: 'Tipos de dentes', en: 'Tooth types', es: 'Tipos de dientes' },
  passos: { pt: 'Passos disponíveis (distância entre dentes)', en: 'Available pitches (distance between teeth)', es: 'Pasos disponibles (distancia entre dientes)' },
  marcas: { pt: 'Marcas', en: 'Brands', es: 'Marcas' },
  informar: { pt: 'Informe no pedido', en: 'Please state in your order', es: 'Informe en el pedido' },
};

export const SEGMENTOS = [
  {
    id: 'paineis', antigo: 2, foto: 'seg-paineis',
    nome: { pt: 'Painéis', en: 'Panels', es: 'Paneles' },
    slug: { pt: 'paineis', en: 'panels', es: 'paneles' },
    desc: {
      pt: 'Serras de última geração para corte de painéis com precisão incomparável.',
      en: 'State-of-the-art saws for cutting panels with unparalleled precision.',
      es: 'Sierras de última generación para el corte de paneles con una precisión incomparable.',
    },
    materiais: { pt: 'MDF, aglomerado, compensado, multilaminado e painéis revestidos', en: 'MDF, chipboard, plywood, multi-laminated and coated panels', es: 'MDF, aglomerado, contrachapado, multilaminado y paneles revestidos' },
  },
  {
    id: 'madeira', antigo: 4, foto: 'seg-madeira',
    nome: { pt: 'Madeira maciça', en: 'Solid wood', es: 'Madera maciza' },
    slug: { pt: 'madeira', en: 'wood', es: 'madera' },
    desc: {
      pt: 'A melhor opção em serras para cortes de madeira maciça com qualidade e eficiência.',
      en: 'The best option for solid wood cutting saws with quality and efficiency.',
      es: 'La mejor opción en sierras para el corte de madera maciza con calidad y eficiencia.',
    },
    materiais: { pt: 'Madeira verde e seca, dura ou macia, do desdobro de toras ao acabamento', en: 'Green and dry wood, hard or soft, from log breakdown to finishing', es: 'Madera verde y seca, dura o blanda, del aserrado de troncos al acabado' },
  },
  {
    id: 'aluminio', antigo: 34, foto: 'seg-aluminio',
    nome: { pt: 'Alumínio e metais', en: 'Aluminum and metals', es: 'Aluminio y metales' },
    slug: { pt: 'aluminio', en: 'aluminum', es: 'aluminio' },
    desc: {
      pt: 'Cortes precisos em alumínio com as serras de alta qualidade da Reval Serras.',
      en: "Precise cuts in aluminum with Reval's high-quality saws.",
      es: 'Cortes precisos en aluminio con las sierras de alta calidad de Reval.',
    },
    materiais: { pt: 'Perfis e maciços de alumínio, cobre, latão e tubos de aço', en: 'Aluminum, copper and brass profiles and solids, steel tubes', es: 'Perfiles y macizos de aluminio, cobre, latón y tubos de acero' },
  },
  {
    id: 'polimeros', antigo: 35, foto: 'seg-polimeros',
    nome: { pt: 'Polímeros', en: 'Polymers', es: 'Polímeros' },
    slug: { pt: 'polimeros', en: 'polymers', es: 'polimeros' },
    desc: {
      pt: 'Serras especializadas em cortes precisos de polímeros.',
      en: 'Specialized saws for precise cuts of polymers.',
      es: 'Sierras especializadas en cortes precisos de polímeros.',
    },
    materiais: { pt: 'Plástico, acrílico e perfis com alto acabamento superficial', en: 'Plastic, acrylic and profiles needing a high surface finish', es: 'Plástico, acrílico y perfiles con alto acabado superficial' },
  },
];

// tipo: circular | fita | segmento | riscador (para o filtro da versão B)
export const PRODUTOS = [
  // ---------- Painéis ----------
  { id: 74, seg: 'paineis', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para trituradores', en: 'Carbide-tipped (HM) circular saw for hoggers', es: 'Sierra circular con dientes de metal duro (HM) para trituradores' },
    spec: [['aplicacao', { pt: ['Serras para trituradores nas operações de esquadrejar painéis sem refil.'], en: ['Hogger saws for squaring panels without trim waste.'], es: ['Sierras para trituradores en las operaciones de escuadrar paneles sin recorte.'] }]],
    nota: { pt: 'Diâmetros do eixo e furos de arraste a serem definidos pelo usuário.', en: 'Bore diameter and pin holes to be defined by the user.', es: 'Diámetro del eje y agujeros de arrastre a definir por el usuario.' } },
  { id: 77, seg: 'paineis', tipo: 'segmento', tabs: 1,
    nome: { pt: 'Segmento para trituradores com dentes de metal duro (HM)', en: 'Carbide-tipped (HM) hogger segment', es: 'Segmento para trituradores con dientes de metal duro (HM)' },
    spec: [['aplicacao', { pt: ['Triturar sobras de material nas operações de esquadrejar painéis sem refil.'], en: ['Shredding leftover material when squaring panels without trim waste.'], es: ['Triturar sobrantes de material en las operaciones de escuadrar paneles sin recorte.'] }]] },
  { id: 82, seg: 'paineis', tipo: 'fita', tabs: 1,
    nome: { pt: 'Serra fita estreita bi-metálica', en: 'Bi-metal narrow band saw', es: 'Sierra cinta estrecha bimetálica' },
    spec: [
      ['aplicacao', { pt: ['Corte de madeira maciça de precisão e durabilidade.'], en: ['Precise, long-lasting cutting of solid wood.'], es: ['Corte de madera maciza con precisión y durabilidad.'] }],
      ['fornecimento', { pt: ['Em rolos ou emendadas.'], en: ['In coils or welded to length.'], es: ['En rollos o soldadas.'] }],
    ] },
  { id: 86, seg: 'paineis', tipo: 'circular', tabs: 1,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para seccionadoras', en: 'Carbide-tipped (HM) circular saw for panel sizing machines', es: 'Sierra circular con dientes de metal duro (HM) para seccionadoras' },
    spec: [
      ['aplicacao', { pt: ['Seccionar painéis simples ou pacotes.'], en: ['Sizing single panels or stacks.'], es: ['Seccionar paneles simples o en paquetes.'] }],
      ['material', { pt: ['Painéis de aglomerados e MDF, cru ou revestidos, em conjunto com riscador.'], en: ['Chipboard and MDF panels, raw or coated, used together with a scoring saw.'], es: ['Paneles de aglomerado y MDF, crudos o revestidos, junto con incisor.'] }],
      ['maquina', { pt: ['Seccionadoras horizontais com riscador.'], en: ['Horizontal panel saws with scoring unit.'], es: ['Seccionadoras horizontales con incisor.'] }],
      ['dentes', { pt: ['Reto-trapezoidal com ângulo de ataque positivo.'], en: ['Triple chip (flat/trapezoidal) with positive hook angle.'], es: ['Recto-trapezoidal con ángulo de ataque positivo.'] }],
      ['fornecimento', { pt: ['De 200 mm até 1300 mm.'], en: ['From 200 mm to 1300 mm.'], es: ['De 200 mm hasta 1300 mm.'] }],
    ] },
  { id: 87, seg: 'paineis', tipo: 'riscador', tabs: 1,
    nome: { pt: 'Riscador com dentes de metal duro (HM) para seccionadoras', en: 'Carbide-tipped (HM) scoring saw for panel sizing machines', es: 'Incisor con dientes de metal duro (HM) para seccionadoras' },
    spec: [
      ['aplicacao', { pt: ['Incisor da serra principal.'], en: ['Scoring blade for the main saw.'], es: ['Incisor de la sierra principal.'] }],
      ['material', { pt: ['Aglomerados e MDF, revestidos ou não.'], en: ['Chipboard and MDF, coated or not.'], es: ['Aglomerados y MDF, revestidos o no.'] }],
      ['maquina', { pt: ['Seccionadoras e esquadrejadeiras.'], en: ['Panel sizing machines and sliding table saws.'], es: ['Seccionadoras y escuadradoras.'] }],
      ['dentes', { pt: ['Cônicos para profundidade de corte regulável. Recomenda-se profundidade de 1,5 a 2,5 mm.'], en: ['Conical, for adjustable cutting depth. A depth of 1.5 to 2.5 mm is recommended.'], es: ['Cónicos para profundidad de corte regulable. Se recomienda profundidad de 1,5 a 2,5 mm.'] }],
    ] },
  { id: 88, seg: 'paineis', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para compensado e multilaminado', en: 'Carbide-tipped (HM) circular saw for plywood and multi-laminated panels', es: 'Sierra circular con dientes de metal duro (HM) para contrachapado y multilaminado' },
    spec: [
      ['aplicacao', { pt: ['Seccionar painéis com acabamento fino.'], en: ['Sizing panels with a fine finish.'], es: ['Seccionar paneles con acabado fino.'] }],
      ['material', { pt: ['Compensado, MDF e aglomerados crus ou com revestimentos.'], en: ['Plywood, MDF and chipboard, raw or coated.'], es: ['Contrachapado, MDF y aglomerados crudos o revestidos.'] }],
      ['maquina', { pt: ['Esquadrejadeiras, seccionadoras e máquinas especiais de mesa.'], en: ['Sliding table saws, panel sizing machines and special table machines.'], es: ['Escuadradoras, seccionadoras y máquinas especiales de mesa.'] }],
      ['dentes', { pt: ['Alternados e trapezoidal/reto conforme a aplicação, com número de dentes adaptado para diferentes máquinas especiais de mesa.'], en: ['Alternate top bevel and triple chip depending on the application, with tooth count adapted to different special table machines.'], es: ['Alternos y trapezoidal/recto según la aplicación, con número de dientes adaptado a diferentes máquinas especiales de mesa.'] }],
    ] },
  { id: 89, seg: 'paineis', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para compensado e multilaminado, baixo ruído', en: 'Low-noise carbide-tipped (HM) circular saw for plywood and multi-laminated panels', es: 'Sierra circular de bajo ruido con dientes de metal duro (HM) para contrachapado y multilaminado' },
    spec: [
      ['aplicacao', { pt: ['Seccionar painéis com acabamento fino.'], en: ['Sizing panels with a fine finish.'], es: ['Seccionar paneles con acabado fino.'] }],
      ['material', { pt: ['Compensado, MDF e aglomerados crus ou com revestimentos.'], en: ['Plywood, MDF and chipboard, raw or coated.'], es: ['Contrachapado, MDF y aglomerados crudos o revestidos.'] }],
      ['maquina', { pt: ['Esquadrejadeiras, seccionadoras e máquinas especiais de mesa.'], en: ['Sliding table saws, panel sizing machines and special table machines.'], es: ['Escuadradoras, seccionadoras y máquinas especiales de mesa.'] }],
      ['dentes', { pt: ['Alternados e trapezoidal/reto conforme a aplicação, com número de dentes adaptado para diferentes velocidades e alturas de corte.'], en: ['Alternate top bevel and triple chip depending on the application, with tooth count adapted to different speeds and cutting heights.'], es: ['Alternos y trapezoidal/recto según la aplicación, con número de dientes adaptado a diferentes velocidades y alturas de corte.'] }],
    ] },
  { id: 93, seg: 'paineis', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular de baixo ruído com dentes de metal duro (HM) para painéis com melamina, topo 38°', en: 'Low-noise carbide-tipped (HM) circular saw for melamine panels, 38° top bevel', es: 'Sierra circular de bajo ruido con dientes de metal duro (HM) para paneles melamínicos, bisel 38°' },
    spec: [
      ['aplicacao', { pt: ['Cortar painéis revestidos e perfis plásticos com fino acabamento sem riscador.'], en: ['Cutting coated panels and plastic profiles with a fine finish, without a scoring saw.'], es: ['Cortar paneles revestidos y perfiles plásticos con acabado fino sin incisor.'] }],
      ['material', { pt: ['Revestidos com melamina ou madeira em um ou ambos os lados e perfis de plástico com parede fina.'], en: ['Panels coated with melamine or veneer on one or both sides, and thin-walled plastic profiles.'], es: ['Revestidos con melamina o madera en una o ambas caras y perfiles de plástico de pared fina.'] }],
      ['maquina', { pt: ['Esquadrejadeiras e serras de mesa sem riscador e máquinas especiais para plástico.'], en: ['Sliding table saws and table saws without scoring unit, and special machines for plastic.'], es: ['Escuadradoras y sierras de mesa sin incisor y máquinas especiales para plástico.'] }],
      ['dentes', { pt: ['Alternados com ângulo de ataque positivo e ângulo de bisel elevado.'], en: ['Alternate, with positive hook angle and high bevel angle.'], es: ['Alternos con ángulo de ataque positivo y ángulo de bisel elevado.'] }],
    ],
    nota: { pt: 'Não necessita riscador.', en: 'No scoring saw needed.', es: 'No necesita incisor.' } },

  // ---------- Madeira ----------
  { id: 24, seg: 'madeira', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para corte longitudinal com limitador de avanço', en: 'Carbide-tipped (HM) rip saw with feed limiter', es: 'Sierra circular con dientes de metal duro (HM) para corte longitudinal con limitador de avance' },
    spec: [
      ['maquinas', { pt: ['Serras de mesa, máquinas especiais e outras com avanço manual.'], en: ['Table saws, special machines and others with manual feed.'], es: ['Sierras de mesa, máquinas especiales y otras con avance manual.'] }],
      ['dentes', { pt: ['Alternados e retos com limitadores para avanços manuais e proteção dos dentes contra nós soltos.'], en: ['Alternate and flat, with limiters for manual feed and to protect the teeth against loose knots.'], es: ['Alternos y rectos con limitadores para avance manual y protección de los dientes contra nudos sueltos.'] }],
    ] },
  { id: 29, seg: 'madeira', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) standard', en: 'Standard carbide-tipped (HM) circular saw', es: 'Sierra circular con dientes de metal duro (HM) estándar' },
    spec: [
      ['aplicacao', { pt: ['Todos os tipos de madeiras secas e maciças, com acabamento médio em cortes simples ou múltiplos.'], en: ['All types of dry solid wood, with a medium finish in single or multiple cuts.'], es: ['Todo tipo de maderas secas y macizas, con acabado medio en cortes simples o múltiples.'] }],
      ['maquinas', { pt: ['Múltiplas, moldureiras, serras de mesa, etc.'], en: ['Multi-rip saws, moulders, table saws, etc.'], es: ['Múltiples, molduradoras, sierras de mesa, etc.'] }],
      ['dentes', { pt: ['Alternados ou retos com ângulo de ataque positivo.'], en: ['Alternate or flat, with positive hook angle.'], es: ['Alternos o rectos con ángulo de ataque positivo.'] }],
    ] },
  { id: 64, seg: 'madeira', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular de aço cromo vanádio para destopadeira (pêndulo)', en: 'Chrome vanadium steel circular saw for cross-cut (pendulum) saws', es: 'Sierra circular de acero cromo vanadio para despuntadora (péndulo)' },
    spec: [['aplicacao', {
      pt: ['Corte de madeira verde, sem necessidade de acabamento. Não utiliza pastilhas de MD.', 'A preparação da serra deve ser feita pelo cliente: trava ou aplicação de estelite.'],
      en: ['Cutting green wood where no finish is needed. No carbide tips.', 'Saw preparation is done by the customer: setting or stellite tipping.'],
      es: ['Corte de madera verde, sin necesidad de acabado. No utiliza pastillas de MD.', 'La preparación de la sierra la hace el cliente: triscado o aplicación de estelita.'] }]] },
  { id: 66, seg: 'madeira', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para multiserra com 2 limpadores', en: 'Carbide-tipped (HM) multi-rip saw with 2 rakers', es: 'Sierra circular con dientes de metal duro (HM) para multisierra con 2 limpiadores' },
    spec: [
      ['aplicacao', { pt: ['Madeira maciça verde, dura ou macia.'], en: ['Green solid wood, hard or soft.'], es: ['Madera maciza verde, dura o blanda.'] }],
      ['maquinas', { pt: ['Múltiplas com um ou dois eixos e bloqueadeiras.'], en: ['Single or double arbor multi-rip saws and edgers.'], es: ['Múltiples de uno o dos ejes y canteadoras.'] }],
      ['dentes', { pt: ['Alternados ou retos, com ângulo de ataque positivo e limpadores de MD para impedir o contato da madeira com a lateral da serra.'], en: ['Alternate or flat, positive hook angle, with carbide rakers that keep the wood off the side of the saw.'], es: ['Alternos o rectos, con ángulo de ataque positivo y limpiadores de MD que impiden el contacto de la madera con el lateral de la sierra.'] }],
    ] },
  { id: 67, seg: 'madeira', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para multiserra com 3 limpadores', en: 'Carbide-tipped (HM) multi-rip saw with 3 rakers', es: 'Sierra circular con dientes de metal duro (HM) para multisierra con 3 limpiadores' },
    spec: [
      ['aplicacao', { pt: ['Madeira maciça verde, dura ou macia.'], en: ['Green solid wood, hard or soft.'], es: ['Madera maciza verde, dura o blanda.'] }],
      ['maquinas', { pt: ['Múltiplas com um ou dois eixos e bloqueadeiras.'], en: ['Single or double arbor multi-rip saws and edgers.'], es: ['Múltiples de uno o dos ejes y canteadoras.'] }],
      ['dentes', { pt: ['Alternados ou retos, com ângulo de ataque positivo e limpadores de MD para impedir o contato da madeira com a lateral da serra.'], en: ['Alternate or flat, positive hook angle, with carbide rakers that keep the wood off the side of the saw.'], es: ['Alternos o rectos, con ángulo de ataque positivo y limpiadores de MD que impiden el contacto de la madera con el lateral de la sierra.'] }],
    ] },
  { id: 68, seg: 'madeira', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para multiserra com 4 limpadores', en: 'Carbide-tipped (HM) multi-rip saw with 4 rakers', es: 'Sierra circular con dientes de metal duro (HM) para multisierra con 4 limpiadores' },
    spec: [
      ['aplicacao', { pt: ['Madeira maciça verde, dura ou macia.'], en: ['Green solid wood, hard or soft.'], es: ['Madera maciza verde, dura o blanda.'] }],
      ['maquinas', { pt: ['Múltiplas com um ou dois eixos e bloqueadeiras.'], en: ['Single or double arbor multi-rip saws and edgers.'], es: ['Múltiples de uno o dos ejes y canteadoras.'] }],
      ['dentes', { pt: ['Alternados ou retos, com ângulo de ataque positivo e limpadores de MD para impedir o contato da madeira com a lateral da serra.'], en: ['Alternate or flat, positive hook angle, with carbide rakers that keep the wood off the side of the saw.'], es: ['Alternos o rectos, con ángulo de ataque positivo y limpiadores de MD que impiden el contacto de la madera con el lateral de la sierra.'] }],
    ] },
  { id: 69, seg: 'madeira', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para corte longitudinal, desdobro de toras', en: 'Carbide-tipped (HM) rip saw for log breakdown', es: 'Sierra circular con dientes de metal duro (HM) para corte longitudinal, aserrado de troncos' },
    spec: [
      ['aplicacao', { pt: ['Corte lateral de troncos para bloquear madeiras verdes.'], en: ['Side cutting of logs to square green timber.'], es: ['Corte lateral de troncos para escuadrar maderas verdes.'] }],
      ['maquinas', { pt: ['Bloqueadeiras com avanço automático.'], en: ['Edgers with automatic feed.'], es: ['Canteadoras con avance automático.'] }],
      ['dentes', { pt: ['Retos com ângulo de ataque positivo e janelas para refrigeração.', 'Diâmetro do eixo, furos de arraste e chavetas a serem definidos pelo usuário. Fornecimento de serras até 1000 mm de diâmetro externo.'], en: ['Flat, positive hook angle, with cooling slots.', 'Bore diameter, pin holes and keyways to be defined by the user. Saws supplied up to 1000 mm outside diameter.'], es: ['Rectos con ángulo de ataque positivo y ventanas de refrigeración.', 'Diámetro del eje, agujeros de arrastre y chaveteros a definir por el usuario. Sierras de hasta 1000 mm de diámetro exterior.'] }],
    ] },
  { id: 70, seg: 'madeira', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para corte de lambris duplos', en: 'Carbide-tipped (HM) circular saw for double panelling', es: 'Sierra circular con dientes de metal duro (HM) para corte de machihembrado doble' },
    spec: [['maquina', { pt: ['Moldureiras.'], en: ['Moulders.'], es: ['Molduradoras.'] }]] },
  { id: 71, seg: 'madeira', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para máquinas portáteis', en: 'Carbide-tipped (HM) circular saw for portable machines', es: 'Sierra circular con dientes de metal duro (HM) para máquinas portátiles' },
    spec: [
      ['aplicacao', { pt: ['Cortes transversais, longitudinais e angulares de madeiras maciças e painéis.'], en: ['Cross, rip and angle cuts in solid wood and panels.'], es: ['Cortes transversales, longitudinales y angulares de maderas macizas y paneles.'] }],
      ['maquina', { pt: ['Circulares portáteis.'], en: ['Portable circular saws.'], es: ['Sierras circulares portátiles.'] }],
      ['dentes', { pt: ['Alternados com ângulos de ataque positivos. Usar serras com poucos dentes para madeira e alto número de dentes para painéis.'], en: ['Alternate, with positive hook angles. Use fewer teeth for wood and a high tooth count for panels.'], es: ['Alternos con ángulos de ataque positivos. Usar sierras con pocos dientes para madera y con muchos dientes para paneles.'] }],
    ] },
  { id: 72, seg: 'madeira', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para corte transversal de madeira maciça, destopadeira', en: 'Carbide-tipped (HM) cross-cut saw for solid wood, trimmers', es: 'Sierra circular con dientes de metal duro (HM) para corte transversal de madera maciza, despuntadora' },
    spec: [
      ['material', { pt: ['Todos os tipos de madeira maciça, seca e verde.'], en: ['All types of solid wood, dry and green.'], es: ['Todo tipo de madera maciza, seca y verde.'] }],
      ['maquinas', { pt: ['Destopadeiras e serras pendulares.'], en: ['Trimmers and pendulum saws.'], es: ['Despuntadoras y sierras pendulares.'] }],
      ['dentes', { pt: ['Alternados com ângulo de ataque positivo, e negativo para máquinas pendulares com avanço manual.'], en: ['Alternate, with positive hook angle, and negative for pendulum machines with manual feed.'], es: ['Alternos con ángulo de ataque positivo, y negativo para máquinas pendulares con avance manual.'] }],
    ] },
  { id: 73, seg: 'madeira', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para corte longitudinal de madeira maciça', en: 'Carbide-tipped (HM) rip saw for solid wood', es: 'Sierra circular con dientes de metal duro (HM) para corte longitudinal de madera maciza' },
    spec: [
      ['material', { pt: ['Todos os tipos de madeiras secas e maciças, com acabamento médio em cortes simples ou múltiplos.'], en: ['All types of dry solid wood, with a medium finish in single or multiple cuts.'], es: ['Todo tipo de maderas secas y macizas, con acabado medio en cortes simples o múltiples.'] }],
      ['maquinas', { pt: ['Múltiplas, moldureiras, serras de mesa, etc.'], en: ['Multi-rip saws, moulders, table saws, etc.'], es: ['Múltiples, molduradoras, sierras de mesa, etc.'] }],
      ['dentes', { pt: ['Alternados ou retos com ângulo de ataque positivo.'], en: ['Alternate or flat, with positive hook angle.'], es: ['Alternos o rectos con ángulo de ataque positivo.'] }],
    ] },
  { id: 75, seg: 'madeira', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para finger joint', en: 'Carbide-tipped (HM) circular saw for finger joint', es: 'Sierra circular con dientes de metal duro (HM) para finger joint' },
    spec: [
      ['aplicacao', { pt: ['Para destopar e esquadrejar com precisão a madeira maciça em preparação para a operação finger.'], en: ['Precise trimming and squaring of solid wood before the finger-jointing operation.'], es: ['Para despuntar y escuadrar con precisión la madera maciza antes de la operación finger.'] }],
      ['maquina', { pt: ['Finger joint.'], en: ['Finger joint lines.'], es: ['Finger joint.'] }],
      ['dentes', { pt: ['Especiais, com corte esquerdo ou direito.'], en: ['Special, left- or right-hand cut.'], es: ['Especiales, con corte izquierdo o derecho.'] }],
    ] },
  { id: 76, seg: 'madeira', tipo: 'circular', tabs: 3,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para linha cola', en: 'Carbide-tipped (HM) glue-line rip saw', es: 'Sierra circular con dientes de metal duro (HM) para línea de encolado' },
    spec: [
      ['aplicacao', { pt: ['Corte longitudinal de precisão e acabamento fino em madeiras secas e aplainadas, com posterior montagem de painéis.'], en: ['Precision ripping with a fine finish in dry, planed wood that will be glued into panels.'], es: ['Corte longitudinal de precisión y acabado fino en maderas secas y cepilladas, para posterior armado de paneles.'] }],
      ['maquina', { pt: ['Múltiplas e moldureiras: Giacomelli, Mereen Johnson, Raimann, Weinig, etc.'], en: ['Multi-rip saws and moulders: Giacomelli, Mereen Johnson, Raimann, Weinig, etc.'], es: ['Múltiples y molduradoras: Giacomelli, Mereen Johnson, Raimann, Weinig, etc.'] }],
      ['dentes', { pt: ['Trapézio/reto para corte de precisão e ângulo de ataque positivo.'], en: ['Triple chip for precision cutting, positive hook angle.'], es: ['Trapecio/recto para corte de precisión y ángulo de ataque positivo.'] }],
    ] },
  { id: 78, seg: 'madeira', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular em aço cromo vanádio ventilada', en: 'Ventilated chrome vanadium steel circular saw', es: 'Sierra circular de acero cromo vanadio ventilada' },
    spec: [['aplicacao', {
      pt: ['Corte de madeira verde, sem necessidade de acabamento. Não utiliza pastilhas de MD.', 'A preparação da serra deve ser feita pelo cliente: trava ou aplicação de estelite.'],
      en: ['Cutting green wood where no finish is needed. No carbide tips.', 'Saw preparation is done by the customer: setting or stellite tipping.'],
      es: ['Corte de madera verde, sin necesidad de acabado. No utiliza pastillas de MD.', 'La preparación de la sierra la hace el cliente: triscado o aplicación de estelita.'] }]] },
  { id: 79, seg: 'madeira', tipo: 'segmento', tabs: 2,
    nome: { pt: 'Segmento para destroçadores com dentes de metal duro (HM)', en: 'Carbide-tipped (HM) chipper segment', es: 'Segmento para trituradores con dientes de metal duro (HM)' },
    spec: [
      ['aplicacao', { pt: ['Trituradores para madeiras verdes no desdobro de troncos.'], en: ['Chippers for green wood in log breakdown.'], es: ['Trituradores para maderas verdes en el aserrado de troncos.'] }],
      ['maquina', { pt: ['Bloqueadeiras, tipo Linele, Moosmayer, etc.'], en: ['Edgers such as Linele, Moosmayer, etc.'], es: ['Canteadoras tipo Linele, Moosmayer, etc.'] }],
      ['dentes', { pt: ['Dentes retos e ângulo de ataque positivo.'], en: ['Flat teeth with positive hook angle.'], es: ['Dientes rectos y ángulo de ataque positivo.'] }],
    ] },
  { id: 80, seg: 'madeira', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular de aço cromo vanádio', en: 'Chrome vanadium steel circular saw', es: 'Sierra circular de acero cromo vanadio' },
    spec: [['aplicacao', {
      pt: ['Corte de madeira verde, sem necessidade de acabamento. Não utiliza pastilhas de MD.', 'A preparação da serra deve ser feita pelo cliente: trava ou aplicação de estelite.'],
      en: ['Cutting green wood where no finish is needed. No carbide tips.', 'Saw preparation is done by the customer: setting or stellite tipping.'],
      es: ['Corte de madera verde, sin necesidad de acabado. No utiliza pastillas de MD.', 'La preparación de la sierra la hace el cliente: triscado o aplicación de estelita.'] }]] },
  { id: 81, seg: 'madeira', tipo: 'fita', tabs: 2,
    nome: { pt: 'Serra fita estreita Reval', en: 'Reval narrow band saw', es: 'Sierra cinta estrecha Reval' },
    spec: [
      ['aplicacao', { pt: ['Madeira maciça verde, dura ou macia.'], en: ['Green solid wood, hard or soft.'], es: ['Madera maciza verde, dura o blanda.'] }],
      ['dentes', { pt: ['Normal ou com têmpera (endurecido).', 'Travados e afiados.'], en: ['Standard or hardened.', 'Set and sharpened.'], es: ['Normal o templado (endurecido).', 'Triscados y afilados.'] }],
      ['fornecimento', { pt: ['Em rolos ou emendadas, em caixas de 25 peças.', 'Produção própria.'], en: ['In coils or welded, in boxes of 25 pieces.', 'Made in-house.'], es: ['En rollos o soldadas, en cajas de 25 piezas.', 'Producción propia.'] }],
    ] },
  { id: 83, seg: 'madeira', tipo: 'fita', tabs: 1,
    nome: { pt: 'Serra fita estreita calçada em metal duro (HM)', en: 'Carbide-tipped (HM) narrow band saw', es: 'Sierra cinta estrecha con insertos de metal duro (HM)' },
    spec: [['aplicacao', { pt: ['Serra fita com inserto de metal duro (HM) para corte de madeira maciça e painéis. Para cortes curvos e precisos.'], en: ['Band saw with carbide (HM) inserts for solid wood and panels. For precise and curved cuts.'], es: ['Sierra cinta con insertos de metal duro (HM) para corte de madera maciza y paneles. Para cortes curvos y precisos.'] }]] },
  { id: 84, seg: 'madeira', tipo: 'fita', tabs: 2,
    nome: { pt: 'Serra fita larga', en: 'Wide band saw', es: 'Sierra cinta ancha' },
    spec: [
      ['tiposDentes', { pt: ['Fundo reto, bico de papagaio e corta-cavaco.'], en: ['Flat gullet, parrot beak and chip breaker.'], es: ['Fondo recto, pico de loro y rompe-viruta.'] }],
      ['passos', { pt: ['25, 30, 35, 40, 45, 50 e 55 mm.'], en: ['25, 30, 35, 40, 45, 50 and 55 mm.'], es: ['25, 30, 35, 40, 45, 50 y 55 mm.'] }],
      ['fornecimento', { pt: ['Em rolos, emendadas ou prontas para uso.'], en: ['In coils, welded or ready to use.'], es: ['En rollos, soldadas o listas para usar.'] }],
      ['marcas', { pt: ['Reval, BV e Böhler Strip Uddeholm.'], en: ['Reval, BV and Böhler Strip Uddeholm.'], es: ['Reval, BV y Böhler Strip Uddeholm.'] }],
    ] },
  { id: 94, seg: 'madeira', tipo: 'circular', tabs: 1,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para otimizadora', en: 'Carbide-tipped (HM) circular saw for optimizing cross-cut saws', es: 'Sierra circular con dientes de metal duro (HM) para optimizadora' },
    spec: [
      ['aplicacao', { pt: ['Corte transversal de alta velocidade.'], en: ['High-speed cross cutting.'], es: ['Corte transversal de alta velocidad.'] }],
      ['maquinas', { pt: ['Otimizadoras.'], en: ['Optimizing cross-cut saws.'], es: ['Optimizadoras.'] }],
      ['dentes', { pt: ['Alternado WZ ou WZ + bisel.'], en: ['Alternate WZ or WZ + bevel.'], es: ['Alterno WZ o WZ + bisel.'] }],
    ] },

  // ---------- Alumínio ----------
  { id: 91, seg: 'aluminio', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para corte de alumínio', en: 'Carbide-tipped (HM) circular saw for aluminum', es: 'Sierra circular con dientes de metal duro (HM) para corte de aluminio' },
    spec: [
      ['aplicacao', { pt: ['Cortar perfis e maciços de alumínio, cobre, latão, etc. (usar refrigeração sempre que possível).'], en: ['Cutting aluminum, copper and brass profiles and solids, etc. (use coolant whenever possible).'], es: ['Cortar perfiles y macizos de aluminio, cobre, latón, etc. (usar refrigeración siempre que sea posible).'] }],
      ['maquinas', { pt: ['Serras de mesa, manuais ou especiais, com avanço manual ou automático e com fixação mecânica da peça.'], en: ['Table, manual or special saws, with manual or automatic feed and mechanical clamping of the part.'], es: ['Sierras de mesa, manuales o especiales, con avance manual o automático y fijación mecánica de la pieza.'] }],
      ['dentes', { pt: ['Trapézio/reto com ângulo de ataque positivo ou negativo, conforme as características do corte.', 'Informar se as serras são para avanço manual ou automático.'], en: ['Triple chip with positive or negative hook angle, depending on the cut.', 'Please state whether the saws are for manual or automatic feed.'], es: ['Trapecio/recto con ángulo de ataque positivo o negativo, según las características del corte.', 'Informar si las sierras son para avance manual o automático.'] }],
    ] },
  { id: 92, seg: 'aluminio', tipo: 'circular', tabs: 1,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) ou cermet para tubos e perfis de aço', en: 'Carbide-tipped (HM) or cermet circular saw for steel tubes and profiles', es: 'Sierra circular con dientes de metal duro (HM) o cermet para tubos y perfiles de acero' },
    spec: [
      ['aplicacao', { pt: ['Cortar tubos e perfis de aço.'], en: ['Cutting steel tubes and profiles.'], es: ['Cortar tubos y perfiles de acero.'] }],
      ['material', { pt: ['Aço sem têmpera, de baixa e média dureza.'], en: ['Non-hardened steel, low and medium hardness.'], es: ['Acero sin temple, de dureza baja y media.'] }],
      ['maquina', { pt: ['Especiais para cortes com avanço manual ou automático.'], en: ['Special machines with manual or automatic feed.'], es: ['Especiales para cortes con avance manual o automático.'] }],
      ['dentes', { pt: ['Reto-trapezoidal com ângulo de ataque de zero a negativo, conforme a aplicação.'], en: ['Triple chip with zero to negative hook angle, depending on the application.'], es: ['Recto-trapezoidal con ángulo de ataque de cero a negativo, según la aplicación.'] }],
      ['informar', {
        pt: ['Se o material é maciço, e o seu diâmetro.', 'Se o material é tubo, o seu diâmetro e a espessura da parede.', 'Se o corte é seco ou refrigerado.', 'A rotação (RPM) e o avanço da máquina.'],
        en: ['If the material is solid, its diameter.', 'If the material is a tube, its diameter and wall thickness.', 'Whether the cut is dry or with coolant.', 'The machine speed (RPM) and feed rate.'],
        es: ['Si el material es macizo, y su diámetro.', 'Si el material es tubo, su diámetro y el espesor de la pared.', 'Si el corte es en seco o refrigerado.', 'La rotación (RPM) y el avance de la máquina.'] }],
    ] },

  // ---------- Polímeros ----------
  { id: 39, seg: 'polimeros', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) fino acabamento, dente abaulado', en: 'Fine-finish carbide-tipped (HM) circular saw, hollow-ground teeth', es: 'Sierra circular con dientes de metal duro (HM) de acabado fino, diente abombado' },
    spec: [
      ['aplicacao', { pt: ['Cortes especiais onde se necessita alto acabamento superficial em madeiras maciças e secas, painéis, plásticos, alumínio, etc.'], en: ['Special cuts that need a high surface finish in dry solid wood, panels, plastics, aluminum, etc.'], es: ['Cortes especiales que necesitan alto acabado superficial en maderas macizas y secas, paneles, plásticos, aluminio, etc.'] }],
      ['maquina', { pt: ['Destopadeiras, seccionadoras, esquadrejadeiras, etc.'], en: ['Trimmers, panel sizing machines, sliding table saws, etc.'], es: ['Despuntadoras, seccionadoras, escuadradoras, etc.'] }],
      ['dentes', { pt: ['Abaulados, retos e alternados.'], en: ['Hollow-ground, flat and alternate.'], es: ['Abombados, rectos y alternos.'] }],
    ] },
  { id: 90, seg: 'polimeros', tipo: 'circular', tabs: 2,
    nome: { pt: 'Serra circular com dentes de metal duro (HM) para cortar plástico e acrílico', en: 'Carbide-tipped (HM) circular saw for plastic and acrylic', es: 'Sierra circular con dientes de metal duro (HM) para cortar plástico y acrílico' },
    spec: [
      ['aplicacao', { pt: ['Cortes especiais em que se necessita alto acabamento superficial.'], en: ['Special cuts that need a high surface finish.'], es: ['Cortes especiales que necesitan alto acabado superficial.'] }],
      ['maquina', { pt: ['Destopadeiras, seccionadoras, esquadrejadeiras, etc.'], en: ['Trimmers, panel sizing machines, sliding table saws, etc.'], es: ['Despuntadoras, seccionadoras, escuadradoras, etc.'] }],
      ['dentes', { pt: ['Abaulados, retos e alternados.'], en: ['Hollow-ground, flat and alternate.'], es: ['Abombados, rectos y alternos.'] }],
    ] },
];

export const TIPOS = {
  circular: { pt: 'Serras circulares', en: 'Circular saws', es: 'Sierras circulares' },
  fita: { pt: 'Serras fita', en: 'Band saws', es: 'Sierras cinta' },
  segmento: { pt: 'Segmentos', en: 'Segments', es: 'Segmentos' },
  riscador: { pt: 'Riscadores', en: 'Scoring saws', es: 'Incisores' },
};
