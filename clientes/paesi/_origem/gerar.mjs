// Paesi Metalúrgica (São Leopoldo/RS), usinagem de precisão e conjuntos técnicos. Gera public/{a,b}/ (pt) e public/{a,b}/en/ (inglês) e a página de escolha.
// node clientes/paesi/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs paesi https://paesimetal.com.br/br)
// Textos do site atual em português e da versão em inglês (paesimetal.com.br/en), revisados. Fotos do site atual.
// A empresa não divulga e-mail nem WhatsApp no site: o contato é por telefone (o formulário do site atual envia pelo servidor Drupal).
import { esc, ic, cabeca, link as linkPt, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
let L = 'pt';
const t = (pt, en) => (L === 'en' ? en : pt);
const link = (v, s) => (L === 'en' ? `/${v}/en/${s === 'index' ? '' : `${s}/`}` : linkPt(v, s));
const linkOutro = (v, s) => (L === 'en' ? linkPt(v, s) : `/${v}/en/${s === 'index' ? '' : `${s}/`}`);

const E = {
  nome: 'Paesi Metalúrgica', razao: 'Paesi Metalúrgica Ltda', url: 'https://paesi.overtus.com.br/', antigo: 'https://paesimetal.com.br/br',
  fone1: '(51) 3589-6852', fone2: '(51) 3589-8689',
  rua: 'Av. João Alberto, 895', bairro: 'Bairro Vicentina', cidade: 'São Leopoldo - RS', cep: '93025-490',
};
const LOGO = `<span class="logo"><span class="logo-p">Paes<span class="logo-i">ı</span></span><span class="logo-m">metalúrgica</span></span>`;

// ---------- conteúdo (pt / en) ----------
const D = () => ({
  slogan: t('Fabricando e montando soluções', 'Manufacturing and assembling solutions'),
  curto: t('Usinagem seriada e não seriada em máquinas convencionais e CNC, e conjuntos técnicos montados para a indústria. Em São Leopoldo/RS desde 1997.',
    'Serial and non-serial machining on conventional and CNC machines, plus technical assemblies for industry. In São Leopoldo, Brazil, since 1997.'),
  intro: t('A Paesi possui centros de torneamento de última geração, que concentram torneamento, fresamento, furação e roscamento numa única fase. Para o cliente, isso significa mais produtividade, eficiência e qualidade na usinagem de peças.',
    'Paesi has state-of-the-art turning centers that combine turning, milling, drilling and threading in a single stage. For the customer, that means more productivity, efficiency and quality in machined parts.'),
  numeros: [['1997', t('fundação, em São Leopoldo', 'founded in São Leopoldo')], ['ISO 9001', t('certificada desde 2004', 'certified since 2004')], ['~50', t('fornecedores na cadeia', 'suppliers in our chain')], ['3', t('setores atendidos', 'industries served')]],
  servicos: [
    { id: 'ferramenta-acionada', foto: 'cnc-acionada', t: t('Torneamento com ferramenta acionada', 'Turning with driven tools'),
      d: t('Com máquinas CNC de ferramenta acionada e placa orientada, fazemos torneamento e fresamento simultâneos de precisão num único processo. Menos preparação, menos tempo de produção e menor custo para peças complexas, seriadas ou não.',
        'With driven-tool CNC machines and an indexing chuck, we perform simultaneous precision turning and milling in a single process. Less setup, shorter production times and lower cost for complex parts, serial or not.'),
      tec: t('Torno CNC Feeler FTC350 XL, comando Fanuc, alimentador CNC e placa orientada. Programação em SolidWorks CAM.', 'Feeler FTC350 XL CNC lathe, Fanuc control, CNC bar feeder and indexing chuck. Programming in SolidWorks CAM.'),
      dif: t('Quatro eixos unem torneamento, fresamento, furação e rosca numa só máquina: menos máquinas para preparar, menos tempo de preset e mais precisão. A placa orientada permite fresar e furar na frente e na lateral, em ângulo.',
        'Four axes bring turning, milling, drilling and threading together on one machine: fewer machines to set up, less preset time and more accuracy. The indexing chuck allows angled milling and drilling on the face and side.'),
      ben: t(['Alta velocidade de usinagem', 'Ótima qualidade de usinagem', 'Menores custos de produção', 'Agilidade de preparação e programação', 'Menor tempo ocioso', 'Melhor aproveitamento de material', 'Alta precisão dimensional', 'Menos preset e menos máquinas'],
        ['High machining speed', 'Excellent machining quality', 'Lower production costs', 'Fast setup and programming', 'Less downtime', 'Better use of material', 'High dimensional accuracy', 'Less preset, fewer machines']),
      ficha: { nome: 'Feeler FTC350 XL', linhas: [[t('Diâmetro da placa', 'Chuck diameter'), 'mm', '300'], [t('Capacidade para barras', 'Bar capacity'), 'mm', '52'], [t('Volteio sobre a base', 'Swing over bed'), 'mm', '600'], ['RPM', '', '45–6.000'], [t('Diâmetro máx. torneável', 'Max. turning diameter'), 'mm', '350'], [t('Comprimento máx. torneável', 'Max. turning length'), 'mm', '1.000'], [t('Motor principal', 'Main motor'), 'kW', '18,5'], [t('Ferramentas na torre', 'Turret tools'), 'un', '12'], [t('Ferramentas acionadas', 'Driven tools'), 'un', '6'], [t('Avanço rápido X/Z', 'Rapid traverse X/Z'), 'm/min', '30/30'], [t('Peso da máquina', 'Machine weight'), 'kg', '4.500']] } },
    { id: 'fresamento-cnc', foto: 'centro-fresamento', t: t('Fresamento CNC', 'CNC milling'),
      d: t('Fresamento CNC seriado e não seriado de materiais ferrosos e não ferrosos, mesmo após tratamento térmico. Carcaças fundidas, eixos, ferramentas, chavetas, flanges e peças para a indústria agrícola, petrolífera e de máquinas.',
        'Serial and non-serial CNC milling of ferrous and non-ferrous materials, even after heat treatment. Cast housings, shafts, tools, keys, flanges and parts for the agricultural, oil and machinery industries.'),
      tec: t('Centro de usinagem Feeler FV1000 com comando Mitsubishi M730. Laboratório de programação e simulação com CAD, CAE e CAM: perdas e colisões são evitadas antes de preparar a máquina.',
        'Feeler FV1000 machining center with Mitsubishi M730 control. Programming and simulation lab with CAD, CAE and CAM: scrap and collisions are avoided before the machine is set up.'),
      dif: t('Ferramental, acessórios e softwares atualizados garantem qualidade, versatilidade e rapidez em séries grandes, médias e pequenas.', 'Up-to-date tooling, accessories and software ensure quality, versatility and speed in large, medium and small batches.'),
      ben: null,
      ficha: { nome: 'Feeler FV1000', linhas: [[t('Cursos X/Y/Z', 'Travel X/Y/Z'), 'mm', '1.000 × 500 × 500'], [t('Dimensões da mesa', 'Table size'), 'mm', '475 × 1.150'], [t('Peso sobre a mesa', 'Table load'), 'kg', '800'], [t('Rotação', 'Spindle speed'), 'rpm', '50–30.000'], [t('Motor principal', 'Main motor'), 'kW', '11'], [t('Avanço rápido X/Y/Z', 'Rapid traverse X/Y/Z'), 'm/min', '24/24/15'], [t('Ferramentas', 'Tools'), 'un', '24'], [t('Peso da máquina', 'Machine weight'), 'kg', '4.950']] } },
    { id: 'torneamento-cnc', foto: 'torno-cnc', t: t('Torneamento CNC', 'CNC turning'),
      d: t('Peças de torneamento de precisão, em produção seriada ou não, em materiais ferrosos e não ferrosos. A usinagem CNC garante acabamento e estabilidade dimensional na produção em série.',
        'Precision turned parts, serial or non-serial, in ferrous and non-ferrous materials. CNC machining ensures surface finish and dimensional stability in series production.'),
      tec: t('Comando Fanuc, com programação manual ou em SolidWorks CAM.', 'Fanuc control, programmed manually or in SolidWorks CAM.'),
      dif: t('Torneamento seriado de pequenos e médios lotes, com boa qualidade de usinagem, alta precisão dimensional e baixo custo de operação.', 'Serial turning of small and medium batches, with good machining quality, high dimensional accuracy and low operating cost.'),
      ben: t(['Alta velocidade de usinagem', 'Boa qualidade de usinagem', 'Boa precisão dimensional', 'Agilidade de preparação e programação'], ['High machining speed', 'Good machining quality', 'Good dimensional accuracy', 'Fast setup and programming']),
      ficha: { nome: t('Torno CNC', 'CNC lathe'), linhas: [[t('Diâmetro máx. torneável', 'Max. turning diameter'), 'mm', '220'], [t('Comprimento máx. torneável', 'Max. turning length'), 'mm', '600'], [t('Curso X, Y', 'Travel X, Y'), 'mm', '215/220'], [t('Faixa de velocidade', 'Speed range'), 'rpm', '5.000'], [t('Passagem do spindle', 'Spindle bore'), 'mm', '52'], [t('Motor principal', 'Main motor'), 'kW', '15'], [t('Curso do contraponto', 'Tailstock travel'), 'mm', '425'], [t('Diâmetro do contraponto', 'Tailstock diameter'), 'mm', '65'], [t('Cone', 'Taper'), 'MT', '4'], [t('Peso da máquina', 'Machine weight'), 'kg', '3.200']] } },
    { id: 'carros-multiplos', foto: 'carros-multiplos', t: t('Torno CNC de carros múltiplos (até 60 mm)', 'Multi-slide CNC lathe (up to 60 mm)'),
      d: t('Torno CNC de carros múltiplos com alimentação automática para produção seriada. Usinagem de buchas, eixos e pinos a partir de barras, em materiais ferrosos, latão e alumínio. Hoje atende a indústria de máquinas e implementos agrícolas.',
        'Multi-slide CNC lathe with automatic bar feeding for series production. Bushings, shafts and pins machined from bar stock in ferrous materials, brass and aluminum. It currently serves the machinery and agricultural implement industries.'),
      tec: t('Máquina desenvolvida conforme as necessidades da Paesi, com comando CNC programável manualmente ou por computador e alimentação automática de barras.', 'A machine built to Paesi\'s requirements, with a CNC control programmed manually or by computer, and automatic bar feeding.'),
      dif: t('Lotes médios e grandes com menos tempo ocioso, graças à alimentação automática. Baixo custo operacional, boa qualidade de usinagem e boa qualidade dimensional.', 'Medium and large batches with less downtime thanks to automatic feeding. Low operating cost, good machining and dimensional quality.'),
      ben: t(['Alta velocidade de usinagem', 'Boa precisão dimensional', 'Baixo custo em grandes lotes', 'Melhor aproveitamento de matéria-prima', 'Alta produtividade'], ['High machining speed', 'Good dimensional accuracy', 'Low cost for large batches', 'Better use of raw material', 'High productivity']),
      ficha: { nome: t('Carros múltiplos', 'Multi-slide lathe'), linhas: [[t('Diâmetro máx. torneável', 'Max. turning diameter'), 'mm', '60'], [t('Comprimento máx. torneável', 'Max. turning length'), 'mm', '320'], [t('Faixa de velocidade', 'Speed range'), 'rpm', '5.000'], [t('Passagem do spindle', 'Spindle bore'), 'mm', '60'], [t('Motor principal', 'Main motor'), 'kW', '15'], [t('Curso do contraponto', 'Tailstock travel'), 'mm', '340'], [t('Ferramentas', 'Tools'), 'un', '10'], [t('Ferramentas usinando ao mesmo tempo', 'Tools cutting at once'), 'un', '5'], [t('Peso da máquina', 'Machine weight'), 'kg', '1.600']] } },
    { id: 'ajustagem', foto: 'ajustagem', t: t('Torneamento, fresamento e ajustagem mecânica', 'Turning, milling and mechanical fitting'),
      d: t('Máquinas convencionais para torneamento, fresamento e ajustagem (furação, rosqueamento e lixa) em produção não seriada, peças de manutenção, pré-usinagem para CNC e acabamento de peças.',
        'Conventional machines for turning, milling and fitting (drilling, tapping and sanding) for non-serial production, maintenance parts, pre-machining for CNC and part finishing.'),
      tec: t('Brocas, alargadores e ferramentas insertadas escolhidos com fornecedores que dão suporte técnico e atualização.', 'Drills, reamers and indexable tools chosen with suppliers that provide technical support and updates.'),
      dif: null,
      ben: t(['Agilidade em ajustes e manutenções', 'Matéria-prima de dimensões variadas'], ['Quick adjustments and maintenance work', 'Raw material in varied dimensions']),
      equip: t(['2 tornos mecânicos Cleaver: 1.500 mm entre pontas, Ø 660 mm admissível', '9 furadeiras para furação e rosqueamento, de 60 a 1.760 rpm', 'Laminadora de roscas Atlas 7/30, roscas até 30 mm', 'Brochadeira Camporesi B7: tração máxima de 7.000 kg, 1.250 mm de comprimento', 'Fresadora mecânica'],
        ['2 Cleaver engine lathes: 1,500 mm between centers, Ø 660 mm swing', '9 drill presses for drilling and tapping, 60 to 1,760 rpm', 'Atlas 7/30 thread rolling machine, threads up to 30 mm', 'Camporesi B7 broaching machine: 7,000 kg max. pull, 1,250 mm total length', 'Manual milling machine']) },
    { id: 'conjuntos', foto: 'conjunto-hidraulico', t: t('Desenvolvimento e fornecimento de conjuntos', 'Development and supply of assemblies'),
      d: t('Além de usinar e soldar, desenvolvemos, montamos e fornecemos conjuntos técnicos sobre o produto do cliente. Com processos internos e uma cadeia de cerca de 50 fornecedores, entregamos uma solução integrada: corte, dobra, injeção, fundição, acabamento, tratamento, montagem, usinagem e adesivagem.',
        'Besides machining and welding, we develop, assemble and supply technical assemblies based on the customer\'s product. With in-house processes and a chain of about 50 suppliers, we deliver an integrated solution: cutting, bending, injection, casting, finishing, treatment, assembly, machining and bonding.'),
      tec: t('Hoje fornecemos conjuntos para linhas de montagem de tratores, colheitadeiras e implementos agrícolas, e conjuntos técnicos para a indústria de máquinas, como alavancas de acionamento hidráulico.', 'We currently supply assemblies for tractor, combine and agricultural implement assembly lines, and technical assemblies for the machinery industry, such as hydraulic control levers.'),
      dif: null,
      ben: t(['Conjuntos pré-montados, prontos para a linha', 'Qualidade assegurada', 'Menos peças e fornecedores para o cliente gerenciar'], ['Pre-assembled units, ready for the line', 'Assured quality', 'Fewer parts and suppliers for the customer to manage']),
      equip: t(['Bancada de montagem com ferramentas pneumáticas', '2 máquinas de solda MIG', '2 unidades de solda por brasagem', '1 máquina de solda ponto'], ['Assembly bench with pneumatic tools', '2 MIG welding machines', '2 brazing units', '1 spot welding machine']) },
  ],
  areas: [
    { id: 'agricola', foto: 'conjunto-acionamento', t: t('Equipamentos agrícolas', 'Agricultural equipment'),
      p: [t('A indústria agrícola busca o tempo todo novas tecnologias e processos que reduzam custos. Fornecemos peças e conjuntos de linha de montagem e reposição para tratores e implementos agrícolas.', 'The agricultural industry is always looking for technologies and processes that cut costs. We supply parts and assemblies for assembly lines and spare parts for tractors and agricultural implements.'),
        t('Trabalhamos com clientes e fornecedores na programação de compras e na produção de lotes econômicos, para garantir os prazos de entrega. Mantemos estoque interno para atendimento.', 'We work with customers and suppliers on purchase planning and economical batch production to meet delivery dates. We keep in-house stock to serve customers.'),
        t('As montadoras precisavam receber conjuntos pré-montados, direto para a linha, sem processos internos de fabricação, montagem e gestão de estoque. A Paesi desenvolveu sua metodologia com os clientes e criou parcerias com fornecedores nacionais e internacionais para entregar grandes volumes: conjuntos soldados, conjuntos montados, transmissões e engrenagens.', 'Manufacturers needed pre-assembled units delivered straight to the line, without in-house manufacturing, assembly and inventory management. Paesi developed its method with customers and partnered with Brazilian and international suppliers to deliver large volumes: welded assemblies, mounted assemblies, transmissions and gears.')],
      itens: t(['Conjuntos de acionamento do hidráulico', 'Tampas de combustível', 'Mancais', 'Varetas de nível', 'Tirantes', 'Conjuntos do hidráulico', 'Cintas de fixação de tanque', 'Calços, eixos e buchas'], ['Hydraulic control assemblies', 'Fuel caps', 'Bearing housings', 'Dipsticks', 'Tie rods', 'Hydraulic assemblies', 'Tank mounting straps', 'Shims, shafts and bushings']) },
    { id: 'petroquimico', foto: 'flange', t: t('Equipamentos petroquímicos', 'Petrochemical equipment'),
      p: [t('Um setor em grande desenvolvimento, que busca novos equipamentos e tecnologias. Fornecemos peças usinadas e conjuntos com a qualidade e a segurança que essa indústria exige.', 'A fast-developing industry that is always seeking new equipment and technology. We supply machined parts and assemblies with the quality and safety this industry requires.'),
        t('Num dos projetos, o cliente trouxe uma grande variedade de peças ainda em desenvolvimento. Trabalhamos juntos nas peças e nos processos até aprovar o protótipo: desenvolvimento, usinagem e apoio na montagem dos protótipos. A parceria permitiu atender no menor prazo e com o menor custo, sem prejudicar a qualidade.', 'In one project, the customer brought a wide range of parts still under development. We worked together on parts and processes until the prototype was approved: development, machining and support in assembling the prototypes. The partnership delivered in the shortest time and at the lowest cost, without compromising quality.')],
      itens: null },
    { id: 'maquinas', foto: 'carcaca', t: t('Máquinas e ferramentas', 'Machinery and tools'),
      p: [t('Fornecemos peças seriadas e não seriadas, com ou sem tratamento térmico e de superfície. Máquinas CNC e ferramentas de corte atualizadas permitem fabricar de peças simples a complexas, com tolerâncias de forma e posição menores.', 'We supply serial and non-serial parts, with or without heat and surface treatment. CNC machines and up-to-date cutting tools let us make simple to complex parts with tighter form and position tolerances.'),
        t('Para a indústria de máquinas, entregamos peças usinadas complexas, conjuntos e chaparias soldadas já pintadas, com acabamento, tratamento e pequenas montagens. Também usinamos ferramentas de corte e dobra, peças seriadas para diversos ramos e peças de manutenção de ferramentas.', 'For the machinery industry we deliver complex machined parts and welded, painted assemblies and sheet metal, with finishing, treatment and small sub-assemblies. We also machine cutting and bending tools, serial parts for many industries and tool maintenance parts.')],
      itens: null },
  ],
  casos: [
    { foto: 'eixo-tracao', area: 'maquinas', t: t('Usinagem de eixo de tração', 'Traction shaft machining'), d: t('O eixo faz a tração e a expansão do pneu na fabricação. Variações de paralelismo do eixo, e em especial do recartilhado, podem deslocar ou expulsar o pneu da máquina.', 'The shaft drives and expands the tire during manufacturing. Any parallelism variation in the shaft, especially in the knurling, can shift the tire or throw it off the machine.') },
    { foto: 'eixo', area: 'agricola', t: t('Eixo de acionamento hidráulico para tratores', 'Hydraulic drive shaft for tractors'), d: t('Por ser usado numa grande variedade de máquinas, o eixo de acionamento precisa ser produzido continuamente e em grandes quantidades.', 'Because it goes into a wide range of machines, the drive shaft has to be produced continuously and in large quantities.') },
    { foto: 'peca-fresada', area: 'maquinas', t: t('Usinagem em aço ferramenta D6 endurecido', 'Machining hardened D6 tool steel'), d: t('O cliente vinha tendo problemas de qualidade e de custo no fornecimento de palhetas. Os fornecedores tinham dificuldade em usinar o material, por causa da dureza e da resistência, o que aumentava o tempo de operação e o gasto com ferramental.', 'The customer had quality and cost problems with the supply of vanes. Suppliers struggled to machine the material because of its hardness and strength, which drove up cycle time and tooling costs.') },
    { foto: 'alavanca', area: 'agricola', t: t('Conjunto de algema', 'Shackle assembly'), d: t('Na montagem de subconjuntos para montadora de tratores, problemas detectados na montagem geram paradas de linha, e não há tempo hábil para resolver.', 'When assembling sub-assemblies for a tractor maker, problems found during assembly stop the line, with no time left to solve them.') },
    { foto: 'tubo-inox', area: 'agricola', t: t('Usinagem de tubete', 'Tube fitting machining'), d: t('Feita em tornos CNC de carros múltiplos, direto da barra de inox, o que reduz o tempo ocioso entre uma peça e outra.', 'Done on multi-slide CNC lathes straight from stainless bar stock, which cuts idle time between parts.') },
    { foto: 'aneis', area: 'agricola', t: t('Usinagem de tubo espaçador', 'Spacer tube machining'), d: t('Peça usada em conjuntos para maquinário agrícola. Usinada em torno CNC de carros múltiplos a partir de tubos de 4 m, e a peça sai pronta.', 'A part used in assemblies for agricultural machinery. Machined on a multi-slide CNC lathe from 4 m tubes, and it comes off the machine finished.') },
    { foto: 'tampa', area: 'agricola', t: t('Inserto para borracha com rosca interna', 'Insert for rubber with internal thread'), d: t('Produzido a partir de barras de 4 m em torno CNC de carros múltiplos. Várias ferramentas trabalham ao mesmo tempo, o que reduz bastante o tempo de produção.', 'Produced from 4 m bars on a multi-slide CNC lathe. Several tools cut at the same time, which greatly reduces production time.') },
  ],
  depo: [
    { q: t('É muito bom trabalhar com a Paesi. Ágil nos orçamentos, pontualidade nas entregas e bom atendimento, além de um preço competitivo. É o que qualquer cliente precisa e deseja.', 'It\'s great to work with Paesi. Fast quotes, on-time delivery and good service, plus a competitive price. That\'s what any customer needs and wants.'), n: 'Vilmar Müller', c: t('Copé & Cia Ltda · Setor de Suprimentos', 'Copé & Cia Ltda · Purchasing') },
    { q: t('Trabalhamos com a Paesi já faz alguns anos. Eles possuem equipamentos bastante sofisticados que conseguem usinar peças de bastante complexidade com alto padrão de qualidade dentro de um prazo bastante curto. É o fornecedor que todo mundo gostaria de ter.', 'We have worked with Paesi for some years. They have very sophisticated equipment that machines fairly complex parts to a high standard of quality within a very short time. It\'s the supplier everyone would like to have.'), n: 'Darlan Geremia', c: t('Rijeza Metalurgia · Diretor Administrativo e Comercial', 'Rijeza Metalurgia · CEO / CFO') },
  ],
  historia: [
    ['1997', t('Fundada em abril, para prestar serviço rápido e de qualidade em usinagem e ajustagem de precisão para a cadeia produtiva de petróleo e gás do Rio Grande do Sul.', 'Founded in April to provide fast, quality precision machining and fitting for the oil and gas supply chain in Rio Grande do Sul.')],
    ['2000', t('Em março, parceria com uma multinacional fabricante de equipamentos agrícolas para o fornecimento de conjuntos técnicos.', 'In March, a partnership with a multinational agricultural equipment maker to supply technical assemblies.')],
    ['2004', t('Em dezembro, a Paesi passa a se dedicar exclusivamente à produção e montagem de conjuntos e peças técnicas para a indústria. Certificação ISO 9001.', 'In December, Paesi focuses exclusively on producing and assembling technical parts and assemblies for industry. ISO 9001 certification.')],
    ['2005', t('Em janeiro, muda para a nova sede, também em São Leopoldo: iluminação adequada, células de montagem, controle de estoque Kanban e troca do parque de máquinas por CNCs de última geração.', 'In January, moves to new headquarters, also in São Leopoldo: proper lighting, assembly cells, Kanban inventory control and a switch to state-of-the-art CNC machines.')],
    [t('Hoje', 'Today'), t('Com a cadeia de fornecedores, oferece montagem e usinagem de conjuntos e peças com corte, solda, estamparia, injeção de plásticos, ferramental, pintura eletrostática e KTL e adesivagem para injeção ou prensagem de elastômeros.', 'With its supplier chain, it offers assembly and machining of parts and assemblies involving cutting, welding, stamping, plastic injection, tooling, electrostatic and KTL painting, and bonding for elastomer injection or pressing.')],
  ],
  visao: t('Ser referência no setor metal mecânico do Brasil, em usinagem, fabricação de peças e conjuntos técnicos.', 'To be a reference in Brazil\'s metalworking industry in machining, parts manufacturing and technical assemblies.'),
  missao: t('Fornecer soluções integradas para o setor metal mecânico com o constante comprometimento em competitividade, qualidade e confiança, promovendo o desenvolvimento dos clientes, sócios, colaboradores e fornecedores.', 'To provide integrated solutions for the metalworking industry with constant commitment to competitiveness, quality and trust, fostering the growth of customers, partners, employees and suppliers.'),
  valores: t(['Honestidade', 'Ética', 'Qualidade', 'Lucratividade', 'Confiança', 'Transparência', 'Reconhecimento'], ['Honesty', 'Ethics', 'Quality', 'Profitability', 'Trust', 'Transparency', 'Recognition']),
  qualidade: t('A Paesi é certificada ISO 9001 desde 2004, recebeu um prêmio de desenvolvimento setorial do Sebrae e participa do sistema de avaliação do PGQP. Da AGCO, recebeu o Prêmio Top Quality (2003) e o Prêmio ACRE de redução de custos (2007 e 2008).',
    'Paesi has been ISO 9001 certified since 2004, received a sector development award from Sebrae and takes part in the PGQP quality assessment system. From AGCO, it received the Top Quality Award (2003) and the ACRE cost reduction award (2007 and 2008).'),
  premios: [['iso-9001', t('Certificado ISO 9001, Bureau Veritas', 'ISO 9001 certificate, Bureau Veritas')], ['top-quality-2003', t('Prêmio Top Quality AGCO, 2003', 'AGCO Top Quality Award, 2003')], ['premio-agco-2007', t('Prêmio ACRE AGCO, 2007', 'AGCO ACRE Award, 2007')], ['premio-agco-2008', t('Prêmio ACRE AGCO, 2008', 'AGCO ACRE Award, 2008')], ['trofeu', t('Troféu de reconhecimento', 'Recognition trophy')]],
  galeria: [['carcaca', t('Carcaça fundida usinada', 'Machined cast housing')], ['flange', t('Flange usinado', 'Machined flange')], ['eixo-recartilhado', t('Eixo recartilhado', 'Knurled shaft')], ['conjunto-acionamento', t('Conjunto de acionamento', 'Drive assembly')], ['bloco-usinado', t('Bloco usinado', 'Machined block')], ['tampa', t('Tampa de combustível', 'Fuel cap')], ['conjunto-hidraulico', t('Conjunto do hidráulico', 'Hydraulic assembly')], ['torre', t('Torre do torno CNC', 'CNC lathe turret')]],
  nav: [{ slug: 'index', nome: t('Início', 'Home') }, { slug: 'empresa', nome: t('Empresa', 'Company') }, { slug: 'usinagem', nome: t('Usinagem', 'Machining') }, { slug: 'areas', nome: t('Áreas de atuação', 'Industries') }, { slug: 'casos', nome: t('Estudos de caso', 'Case studies') }, { slug: 'contato', nome: t('Contato', 'Contact') }],
});

export const nomesVersao = { a: 'Linha de Montagem', b: 'Ficha de Processo' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Arimo:wght@700&family=Libre+Franklin:wght@500;700;800;900&family=Public+Sans:wght@400;500;600&family=Encode+Sans+Semi+Condensed:wght@600;700;800&family=Encode+Sans:wght@400;500;600&family=Martian+Mono:wght@400;500&display=swap';
const cores = { a: '#ffffff', b: '#0b1a33' };
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const chave = s => (L === 'en' ? (s === 'index' ? 'en' : `en/${s}`) : s);

function head(v, s, titulo, descricao) {
  const tt = s === 'index' ? `${E.nome} | ${t('Usinagem de precisão e conjuntos técnicos em São Leopoldo/RS', 'Precision machining and technical assemblies in Brazil')}` : `${titulo} | ${E.nome}`;
  let h = cabeca({ E, v, slug: chave(s), titulo: tt, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v], lang: t('pt-BR', 'en') });
  const pt = `${E.url}${v}/${s === 'index' ? '' : `${s}/`}`, en = `${E.url}${v}/en/${s === 'index' ? '' : `${s}/`}`;
  h = h.replace('<link rel="icon"', `<link rel="alternate" hreflang="pt-BR" href="${pt}">\n<link rel="alternate" hreflang="en" href="${en}">\n<link rel="icon"`);
  if (L === 'en') h = h.replace('og:locale" content="pt_BR"', 'og:locale" content="en_US"').replace('Pular para o conteúdo', 'Skip to content');
  return h;
}
function idiomas(v, s) {
  const a = `<a href="${link(v, s)}" class="ativo" aria-current="true" lang="${t('pt-BR', 'en')}">${t('PT', 'EN')}</a>`;
  const b = `<a href="${linkOutro(v, s)}" lang="${t('en', 'pt-BR')}" hreflang="${t('en', 'pt-BR')}" title="${t('English version', 'Versão em português')}">${t('EN', 'PT')}</a>`;
  return `<div class="idiomas">${L === 'pt' ? a + b : b + a}</div>`;
}
function topo(v, s, d) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, ${t('página inicial', 'home page')}">${LOGO}</a>
    <nav id="menu" class="menu" aria-label="${t('Principal', 'Main')}"><ul>${d.nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    ${idiomas(v, s)}
    <a class="btn btn-topo" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="${t('Abrir menu', 'Open menu')}">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v, d) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${LOGO}<p>${d.slogan}. ${t('Usinagem de precisão e conjuntos técnicos desde 1997.', 'Precision machining and technical assemblies since 1997.')}</p></div>
    <div><h3>${t('Páginas', 'Pages')}</h3><ul>${d.nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>${t('Contato', 'Contact')}</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a></span></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.razao}. ${t('Todos os direitos reservados.', 'All rights reserved.')}</span><span>${t('Prévia feita pela Overtus', 'Preview by Overtus')}</span></div></div>
</footer>
</body>
</html>
`;
}
const ficha = f => `<div class="ficha"><p class="ficha-nome">${f.nome}</p><div class="ficha-rola"><table><tbody>${f.linhas.map(l => `<tr><th scope="row">${l[0]}</th><td>${l[2]}</td><td class="un">${l[1]}</td></tr>`).join('')}</tbody></table></div></div>`;
const mapaFrame = () => `<iframe class="mapa" title="${t('Mapa da Paesi Metalúrgica', 'Map to Paesi Metalúrgica')}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Av. João Alberto, 895, São Leopoldo RS')}&z=15&output=embed"></iframe>`;
const ligue = (cls = '') => `<p class="bts ${cls}"><a class="btn" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a><a class="btn btn-linha" href="${telHref(E.fone2)}">${ic('tel')}${E.fone2}</a></p>`;

// ---------- páginas comuns ----------
function comum(v, pag, cab, d) {
  pag[chave('empresa')] = head(v, 'empresa', t('Empresa', 'Company'), d.intro) + topo(v, 'empresa', d) + cab(t('Empresa', 'Company'), t('Da usinagem para o petróleo à montagem de conjuntos para a indústria.', 'From oil and gas machining to assemblies for industry.'), 'fachada') + `
<div class="in">
<section class="texto-pag"><div><p class="lead">${d.intro}</p><p>${d.qualidade}</p></div><figure>${img('fachada', t('Sede da Paesi Metalúrgica em São Leopoldo', 'Paesi Metalúrgica headquarters in São Leopoldo'))}<figcaption>${E.rua}, ${E.cidade}</figcaption></figure></section>
<section class="historia"><h2>${t('Histórico', 'History')}</h2><ol>${d.historia.map(h => `<li class="sobe"><b>${h[0]}</b><p>${h[1]}</p></li>`).join('')}</ol></section>
<section class="mvv"><div class="sobe"><h2>${t('Visão', 'Vision')}</h2><p>${d.visao}</p></div><div class="sobe"><h2>${t('Missão', 'Mission')}</h2><p>${d.missao}</p></div><div class="sobe"><h2>${t('Princípios e valores', 'Principles and values')}</h2><ul class="valores">${d.valores.map(x => `<li>${x}</li>`).join('')}</ul></div></section>
<section class="premios" id="qualidade"><header class="tit"><p class="k">${t('Qualidade', 'Quality')}</p><h2>${t('Certificações e premiações', 'Certifications and awards')}</h2></header><div class="premios-grade">${d.premios.map(p => `<a class="sobe" href="/assets/img/${p[0]}.webp" data-foto data-legenda="${esc(p[1])}"><figure>${img(p[0], p[1])}</figure><span>${p[1]}</span></a>`).join('')}</div></section>
</div>
` + rodape(v, d);

  pag[chave('usinagem')] = head(v, 'usinagem', t('Usinagem de precisão', 'Precision machining'), t('Torneamento com ferramenta acionada, fresamento CNC, torneamento CNC, torno de carros múltiplos, ajustagem mecânica e conjuntos técnicos.', 'Driven-tool turning, CNC milling, CNC turning, multi-slide lathe, mechanical fitting and technical assemblies.')) + topo(v, 'usinagem', d) + cab(t('Usinagem de precisão', 'Precision machining'), t('Seis frentes de trabalho, do torno CNC à montagem de conjuntos.', 'Six capabilities, from CNC lathes to finished assemblies.'), 'torre') + `
<div class="in">
<nav class="indice" aria-label="${t('Serviços', 'Services')}">${d.servicos.map((s, i) => `<a href="#${s.id}"><span>0${i + 1}</span>${s.t}</a>`).join('')}</nav>
${d.servicos.map((s, i) => `<section class="servico sobe" id="${s.id}">
  <figure>${img(s.foto, s.t)}</figure>
  <div class="servico-txt"><p class="k">0${i + 1}</p><h2>${s.t}</h2><p class="lead">${s.d}</p>
    <h3>${t('Tecnologia', 'Technology')}</h3><p>${s.tec}</p>
    ${s.dif ? `<h3>${t('Diferencial', 'Advantage')}</h3><p>${s.dif}</p>` : ''}
    ${s.equip ? `<h3>${t('Equipamentos', 'Equipment')}</h3>${lista(s.equip)}` : ''}
    ${s.ben ? `<h3>${t('Benefícios', 'Benefits')}</h3><ul class="tags">${s.ben.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
  </div>
  ${s.ficha ? ficha(s.ficha) : ''}
</section>`).join('\n')}
<section class="cta-faixa"><h2>${t('Relate-nos sua necessidade', 'Tell us what you need')}</h2><p>${t('Se você tem uma necessidade específica em usinagem industrial, ligue e conte o que precisa: desenho, material e quantidade.', 'If you have a specific industrial machining need, call us and tell us about it: drawing, material and quantity.')}</p>${ligue()}</section>
</div>
` + rodape(v, d);

  pag[chave('areas')] = head(v, 'areas', t('Áreas de atuação', 'Industries'), t('Peças e conjuntos para a indústria de equipamentos agrícolas, petroquímicos e de máquinas e ferramentas.', 'Parts and assemblies for the agricultural, petrochemical and machinery and tools industries.')) + topo(v, 'areas', d) + cab(t('Áreas de atuação', 'Industries'), t('Agrícola, petroquímico e máquinas: três setores, a mesma usinagem.', 'Agricultural, petrochemical and machinery: three industries, one machine shop.'), 'conjunto-acionamento') + `
<div class="in">
${d.areas.map(a => `<section class="area sobe" id="${a.id}"><figure>${img(a.foto, a.t)}</figure><div><h2>${a.t}</h2>${a.p.map(p => `<p>${p}</p>`).join('')}${a.itens ? `<h3>${t('Produtos fornecidos', 'Products supplied')}</h3><ul class="tags">${a.itens.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}${d.casos.some(c => c.area === a.id) ? `<a class="link-seta" href="${link(v, 'casos')}">${t('Estudos de caso deste setor', 'Case studies in this industry')} ${ic('seta')}</a>` : ''}</div></section>`).join('\n')}
<section class="galeria-sec"><header class="tit"><p class="k">${t('Peças', 'Parts')}</p><h2>${t('Algumas peças e conjuntos produzidos', 'Some parts and assemblies we produce')}</h2></header><div class="galeria">${d.galeria.map(f => `<a class="sobe" href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}</a>`).join('')}</div></section>
</div>
` + rodape(v, d);

  pag[chave('casos')] = head(v, 'casos', t('Estudos de caso', 'Case studies'), t('Estudos de caso de usinagem e montagem de conjuntos realizados pela Paesi Metalúrgica.', 'Machining and assembly case studies by Paesi Metalúrgica.')) + topo(v, 'casos', d) + cab(t('Estudos de caso', 'Case studies'), t('Problemas reais de clientes e como foram resolvidos na usinagem.', 'Real customer problems and how machining solved them.'), 'eixo-recartilhado') + `
<div class="in">
<section class="casos">${d.casos.map((c, i) => `<article class="caso sobe"><figure>${img(c.foto, c.t)}</figure><div><p class="k">${String(i + 1).padStart(2, '0')} · ${d.areas.find(a => a.id === c.area).t}</p><h2>${c.t}</h2><p>${c.d}</p></div></article>`).join('')}</section>
<section class="depos"><header class="tit"><p class="k">${t('Depoimentos', 'Testimonials')}</p><h2>${t('O que dizem os clientes', 'What customers say')}</h2></header><div class="depo-grade">${d.depo.map(x => `<figure class="depo sobe"><blockquote><p>${x.q}</p></blockquote><figcaption><b>${x.n}</b><span>${x.c}</span></figcaption></figure>`).join('')}</div></section>
</div>
` + rodape(v, d);

  pag[chave('contato')] = head(v, 'contato', t('Contato', 'Contact'), `${E.nome}: ${E.rua}, ${E.cidade}. ${t('Telefones', 'Phones')} ${E.fone1} / ${E.fone2}.`) + topo(v, 'contato', d) + cab(t('Contato', 'Contact'), t('Fale com a Paesi sobre a sua peça.', 'Talk to Paesi about your part.'), 'fachada') + `
<div class="in"><section class="contato-pag">
  <div class="contato-cards">
    <a class="ccard" href="${telHref(E.fone1)}">${ic('tel')}<span>${t('Comercial', 'Sales')}</span><b>${E.fone1}</b></a>
    <a class="ccard" href="${telHref(E.fone2)}">${ic('tel')}<span>${t('Telefone', 'Phone')}</span><b>${E.fone2}</b></a>
    <div class="ccard">${ic('pin')}<span>${t('Endereço', 'Address')}</span><b>${E.rua}</b><small>${E.bairro}, ${E.cidade} · CEP ${E.cep}</small></div>
    <div class="prepare"><h2>${t('Para agilizar o orçamento', 'To speed up your quote')}</h2>${lista(t(['Desenho técnico ou amostra da peça', 'Material e tratamento (térmico ou de superfície)', 'Quantidade por lote e frequência', 'Prazo desejado'], ['Technical drawing or a sample part', 'Material and treatment (heat or surface)', 'Batch size and frequency', 'Required lead time']))}</div>
  </div>
  <div>${mapaFrame()}<p class="como">${t('Fica na Av. João Alberto, no Bairro Vicentina, em São Leopoldo, Região Metropolitana de Porto Alegre.', 'On Av. João Alberto, Vicentina district, São Leopoldo, in the Porto Alegre metropolitan area, Brazil.')}${L === 'en' ? ' ' + 'From abroad, dial +55 51 3589-6852.' : ''}</p></div>
</section></div>
` + rodape(v, d);
}

// ---------- versão A: Linha de Montagem ----------
function A() {
  const v = 'a', pag = {};
  for (const lang of ['pt', 'en']) {
    L = lang; const d = D();
    const cab = (k, tt, foto) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${tt}</h1></div></div><figure>${img(foto, '', ' loading="eager"')}</figure></section>`;
    pag[chave('index')] = head(v, 'index', '', d.curto) + topo(v, 'index', d) + `
<section class="hero-a"><div class="hero-a-txt"><div class="hero-a-in"><p class="k">${t('Usinagem de precisão · São Leopoldo/RS', 'Precision machining · São Leopoldo, Brazil')}</p><h1>${d.slogan}.</h1><p>${d.curto}</p><p class="bts"><a class="btn" href="${link(v, 'usinagem')}">${t('Conheça nossas soluções', 'See our capabilities')}</a><a class="btn btn-linha" href="${link(v, 'contato')}">${t('Pedir orçamento', 'Request a quote')}</a></p></div></div><figure class="hero-a-foto">${img('cnc-acionada', t('Torno CNC com alimentador de barras na Paesi', 'CNC lathe with bar feeder at Paesi'), ' loading="eager" fetchpriority="high"')}</figure></section>
<section class="numeros-a"><div class="in">${d.numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in servicos-a"><header class="tit"><p class="k">${t('Usinagem de precisão', 'Precision machining')}</p><h2>${t('Do torno CNC ao conjunto montado', 'From CNC lathe to finished assembly')}</h2><p>${d.intro}</p></header><div class="cards">${d.servicos.map(s => `<a class="card sobe" href="${link(v, 'usinagem')}#${s.id}"><figure>${img(s.foto, s.t)}</figure><h3>${s.t}</h3><span class="link-seta">${t('Ver detalhes', 'Details')} ${ic('seta')}</span></a>`).join('')}</div></section>
<section class="conj-a"><div class="in conj-in"><div class="conj-fotos"><figure>${img('conjunto-hidraulico', t('Conjunto de acionamento hidráulico montado', 'Assembled hydraulic control unit'))}</figure><figure>${img('alavanca', t('Conjunto de alavanca com mola', 'Lever assembly with spring'))}</figure></div><div><p class="k">${t('Conjuntos técnicos', 'Technical assemblies')}</p><h2>${t('Conjuntos pré-montados, direto para a linha de montagem', 'Pre-assembled units, straight to the assembly line')}</h2><p>${d.servicos[5].d}</p>${lista(d.servicos[5].ben)}<a class="link-seta" href="${link(v, 'usinagem')}#conjuntos">${t('Como funciona', 'How it works')} ${ic('seta')}</a></div></div></section>
<section class="in areas-a"><header class="tit"><p class="k">${t('Áreas de atuação', 'Industries')}</p><h2>${t('Três setores que exigem precisão e prazo', 'Three industries that demand precision and on-time delivery')}</h2></header><div class="areas-grade">${d.areas.map(a => `<a class="area-card sobe" href="${link(v, 'areas')}#${a.id}">${img(a.foto, a.t)}<div><h3>${a.t}</h3><p>${a.p[0]}</p></div></a>`).join('')}</div></section>
<section class="quali-a"><div class="in quali-in"><div><p class="k">${t('Qualidade', 'Quality')}</p><h2>${t('ISO 9001 desde 2004 e premiada pela AGCO', 'ISO 9001 since 2004, with AGCO awards')}</h2><p>${d.qualidade}</p><a class="link-seta" href="${link(v, 'empresa')}#qualidade">${t('Certificações e prêmios', 'Certifications and awards')} ${ic('seta')}</a></div><div class="quali-fotos">${d.premios.slice(0, 3).map(p => `<figure>${img(p[0], p[1])}</figure>`).join('')}</div></div></section>
<section class="in depo-a"><figure class="depo"><blockquote><p>${d.depo[1].q}</p></blockquote><figcaption><b>${d.depo[1].n}</b><span>${d.depo[1].c}</span></figcaption></figure><figure class="depo"><blockquote><p>${d.depo[0].q}</p></blockquote><figcaption><b>${d.depo[0].n}</b><span>${d.depo[0].c}</span></figcaption></figure></section>
<section class="cta-a"><div class="in"><div><h2>${t('Relate-nos sua necessidade.', 'Tell us what you need.')}</h2><p>${t('Se você tem uma necessidade específica em usinagem industrial, fale com a gente.', 'If you have a specific industrial machining need, talk to us.')}</p></div>${ligue()}</div></section>
` + rodape(v, d);
    comum(v, pag, cab, d);
  }
  return pag;
}

// ---------- versão B: Ficha de Processo ----------
function B() {
  const v = 'b', pag = {};
  for (const lang of ['pt', 'en']) {
    L = lang; const d = D();
    const cab = (k, tt, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${tt}</h1></div></section>`;
    pag[chave('index')] = head(v, 'index', '', d.curto) + topo(v, 'index', d) + `
<section class="hero-b">${img('torre', t('Torre de ferramentas do torno CNC', 'CNC lathe tool turret'), ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><div><p class="k">Paesi Metalúrgica · ${t('desde 1997', 'since 1997')}</p><h1>${t('Torneamento, fresamento, furação e roscamento numa única fase.', 'Turning, milling, drilling and threading in a single stage.')}</h1><p>${d.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">${t('Pedir orçamento', 'Request a quote')}</a><a class="btn btn-linha" href="${link(v, 'usinagem')}">${t('Ver o parque de máquinas', 'See our machines')}</a></p></div>
<dl class="ficha-hero">${[[t('Processo', 'Process'), t('Usinagem seriada e não seriada', 'Serial and non-serial machining')], [t('Materiais', 'Materials'), t('Ferrosos, não ferrosos, aço temperado', 'Ferrous, non-ferrous, hardened steel')], [t('Máquinas', 'Machines'), 'Feeler FTC350 XL · FV1000 · CNC Fanuc'], [t('Qualidade', 'Quality'), 'ISO 9001 · PGQP'], [t('Entrega', 'Delivery'), t('Peça pronta ou conjunto montado', 'Finished part or assembly')]].map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('')}</dl></div></section>
<section class="in servicos-b"><header class="tit-b"><p class="k">${t('Usinagem de precisão', 'Precision machining')}</p><h2>${t('O que a Paesi faz', 'What Paesi does')}</h2></header><div class="linhas">${d.servicos.map((s, i) => `<a class="linha sobe" href="${link(v, 'usinagem')}#${s.id}"><span class="num">0${i + 1}</span>${img(s.foto, s.t)}<div><h3>${s.t}</h3><p>${s.d.split('. ')[0]}.</p></div>${ic('seta')}</a>`).join('')}</div></section>
<section class="maquinas-b"><div class="in"><header class="tit-b"><p class="k">${t('Parque de máquinas', 'Machine park')}</p><h2>${t('Fichas técnicas', 'Technical data')}</h2></header><div class="fichas">${d.servicos.filter(s => s.ficha).slice(0, 2).map(s => `<div class="ficha-b"><figure>${img(s.foto, s.ficha.nome)}</figure>${ficha(s.ficha)}</div>`).join('')}</div><a class="link-seta" href="${link(v, 'usinagem')}">${t('Todas as máquinas', 'All machines')} ${ic('seta')}</a></div></section>
<section class="in casos-b"><header class="tit-b"><p class="k">${t('Estudos de caso', 'Case studies')}</p><h2>${t('Problemas reais, resolvidos na usinagem', 'Real problems, solved by machining')}</h2></header><div class="casos-grade">${d.casos.slice(0, 3).map(c => `<article class="sobe">${img(c.foto, c.t)}<h3>${c.t}</h3><p>${c.d}</p></article>`).join('')}</div><a class="link-seta" href="${link(v, 'casos')}">${t('Todos os estudos de caso', 'All case studies')} ${ic('seta')}</a></section>
<section class="setores-b"><div class="in">${d.areas.map(a => `<a href="${link(v, 'areas')}#${a.id}"><b>${a.t}</b><span>${ic('seta')}</span></a>`).join('')}</div></section>
<section class="in depo-b"><blockquote><p>“${d.depo[1].q}”</p></blockquote><p class="quem"><b>${d.depo[1].n}</b> · ${d.depo[1].c}</p></section>
<section class="cta-b"><div class="in"><h2>${t('Tem o desenho da peça? A gente estuda o processo.', 'Have a drawing? We\'ll work out the process.')}</h2>${ligue()}</div></section>
` + rodape(v, d);
    comum(v, pag, cab, d);
  }
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
L = 'pt';
await escolha(pub, {
  nome: 'Paesi Metalúrgica', artigo: 'da', url: E.url, lang: 'pt', cor: '#14315e', fundo: '#0b1a33', claro: '#f3f5f8',
  fonteTitulo: "'Libre Franklin',system-ui,sans-serif", fonteTexto: "'Public Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com o azul-marinho e o amarelo do logo: torno CNC na abertura, as seis frentes de usinagem em cartões e os conjuntos montados em destaque.', pontos: ['Português e inglês, como o site atual', 'Fichas técnicas das máquinas em texto (antes eram imagens)', 'Prêmios AGCO e ISO 9001 em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Azul-marinho escuro com amarelo, em formato de ficha técnica: torre do torno CNC na abertura, serviços numerados e dados das máquinas logo na página inicial.', pontos: ['"Torneamento, fresamento, furação e roscamento numa única fase"', 'Português e inglês', 'Estudos de caso na página inicial'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
