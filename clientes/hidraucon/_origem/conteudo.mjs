// Conteúdo da Hidraucon. Textos entre aspas vêm do site atual (hidraucon.com.br, 2017);
// o que foi escrito por nós está marcado com "nosso" e listado em LEIA-ME.md para confirmar.

export const empresa = {
  nome: 'Hidraucon',
  razao: 'Hidraucon Comércio de Mangueiras, Conexões Hidráulicas e Pneumáticas Ltda',
  url: 'https://hidraucon.overtus.com.br/',
  antigo: 'http://www.hidraucon.com.br/',
  selo: 'Mais de 10 anos fazendo melhor', // o site de 2017 dizia "10 anos fazendo melhor"
  unidades: [
    {
      id: 'poa', nome: 'Matriz', cidade: 'Porto Alegre', endereco: 'Av. Sertório, 389', bairro: 'Navegantes', cep: '91020-001',
      tel: '(51) 3026-0000', telHref: '+555130260000', email: 'vendas@hidraucon.com.br', email2: 'hidraucon@hidraucon.com.br',
      mapa: 'Av.+Sertório,+389+-+Navegantes,+Porto+Alegre+-+RS,+91020-001',
    },
    {
      id: 'gba', nome: 'Filial', cidade: 'Guaíba', endereco: 'Av. Castelo Branco, 3565', bairro: 'Nossa Sra. de Fátima', cep: '92500-000',
      tel: '(51) 3055-1111', telHref: '+555130551111', email: 'guaiba@hidraucon.com.br',
      mapa: 'Av.+Castelo+Branco,+3565+-+Guaíba+-+RS,+92500-000',
    },
  ],
};

export const textos = {
  faixa: ['Hidraucon comércio de mangueiras,', 'conexões hidráulicas e pneumáticas'],
  quem: [
    'A Hidraucon nasceu visando aliar uma necessidade básica do mercado, custo benefício, a uma renomada linha de produtos com qualidade consagrada no mercado mundial.',
    'Com um quadro profissional experiente, conseguimos oferecer o produto certo para cada situação combinando qualidade e custo.',
    'Voltada a atender diversos segmentos do mercado regional, conseguimos desenvolver com agilidade e competência num curto espaço de tempo soluções tecnológicas e logísticas que satisfaçam o cliente.',
  ],
  missao: 'Atender com agilidade e competência, oferecendo produtos e serviços a todos os clientes.',
  visao: 'Ser referência no mercado fornecendo com o melhor custo benefício componentes hidráulicos, pneumáticos e correias.',
  valores: [
    'Oferecer acima de tudo a melhor solução;',
    'Satisfazer as necessidades específicas de cada cliente;',
    'Oferecer os melhores produtos disponíveis no mercado agregando, se necessário, novos produtos e serviços;',
    'Manter a satisfação dos colaboradores visando melhor servir aos clientes.',
  ],
};

// As três linhas do site atual, com o texto de cada uma.
export const linhas = [
  {
    id: 'hidraulica', nome: 'Hidráulica', foto: 'linha-hidraulica',
    curto: 'Mangueiras e conectores para as rigorosas exigências de sistemas onde é necessária alta tecnologia. Produtos com característica de transportar qualquer tipo de fluídos.',
    intro: 'Disponíveis para baixa, média, alta, super e extrema alta pressão.',
    dados: [['3/16" até 3"', 'Bitolas'], ['100 a 10.000 psi', 'Pressão']],
  },
  {
    id: 'industrial', nome: 'Industrial', foto: 'linha-industrial',
    curto: 'Mangueiras com bitolas e pressões variadas visando atender a rigorosas exigências e normas industriais para utilização em diversas aplicações.',
    intro: 'Mangueiras com bitolas e pressões variadas para atender as rigorosas exigências e normas do meio industrial para utilização em diversas aplicações.',
    dados: [['24', 'Aplicações atendidas']],
  },
  {
    id: 'pneumatica', nome: 'Pneumática', foto: 'linha-pneumatica',
    curto: 'Montagem e manutenção de redes pneumáticas, automação industrial, agrícola e aplicações que necessitem de alta rapidez de acoplamento em conexões.',
    intro: 'Ampla gama de opções para viabilizar qualquer montagem pneumática nos mais diversos graus de complexidade, pressão, bitolas e roscas.',
    dados: [['12', 'Famílias de produto']],
  },
];

// Catálogo em famílias: cada família tem a foto real dela (recortada dos banners do site atual) e os itens.
// Itens: [nome, detalhe (nosso, curto), palavras de busca].
export const familias = [
  {
    id: 'mangueiras-hidraulicas', linha: 'hidraulica', nome: 'Mangueiras hidráulicas', foto: 'fam-hid-mangueiras',
    texto: 'Bitolas de 3/16" até 3", pressão de 100 a 10.000 psi.',
    itens: [
      ['Mangueira hidráulica de baixa pressão', 'Retorno, sucção e linhas de baixa pressão.', 'baixa pressão retorno'],
      ['Mangueira hidráulica de média pressão', 'Linhas de trabalho em máquinas e implementos.', 'média pressão'],
      ['Mangueira hidráulica de alta pressão', 'Malha de aço para pressões altas.', 'alta pressão trama aço'],
      ['Mangueira hidráulica super alta pressão', 'Construção espiralada para pressão elevada e pulsante.', 'super alta pressão espiral'],
      ['Mangueira hidráulica extrema alta pressão', 'Para os sistemas mais exigentes, até 10.000 psi.', 'extrema alta pressão 10000 psi'],
      ['Mangueiras especiais', 'Aplicações fora do padrão: consulte a equipe.', 'especial'],
    ],
  },
  {
    id: 'terminais', linha: 'hidraulica', nome: 'Terminais e adaptadores', foto: 'fam-hid-terminais',
    texto: 'Para montar e conectar as mangueiras ao equipamento.',
    itens: [
      ['Terminais hidráulicos', 'Retos e curvos, para prensar na mangueira.', 'terminal prensar'],
      ['Adaptadores', 'Ligação entre roscas e padrões diferentes.', 'adaptador rosca'],
      ['Acessórios hidráulicos', 'Capas, protetores e complementos da montagem.', 'acessório capa protetor'],
    ],
  },
  {
    id: 'engates-hidraulicos', linha: 'hidraulica', nome: 'Engates rápidos hidráulicos', foto: 'fam-hid-engates',
    texto: 'Acoplamento rápido para implementos e equipamentos hidráulicos.',
    itens: [
      ['Engate rápido hidráulico', 'Macho e fêmea, para conectar e desconectar sem perda de óleo.', 'engate rápido hidráulico acoplamento'],
      ['Engate rápido para mangueira industrial', 'Para linhas de ar, água e produtos industriais.', 'engate rápido mangueira industrial'],
      ['Engate Camlock', 'Engate de alavanca para uso industrial e agrícola.', 'camlock engate agrícola'],
    ],
  },
  {
    id: 'mangueiras-industriais', linha: 'industrial', nome: 'Mangueiras industriais por aplicação', foto: 'fam-ind-mangueiras',
    texto: 'Bitolas e pressões variadas, conforme as normas de cada aplicação.',
    itens: [
      ['Ar / água', '', 'ar água compressor'],
      ['Isolante para cabos', '', 'isolante cabos elétrica'],
      ['Descarga de água', '', 'descarga água'],
      ['Inseticidas / herbicidas', '', 'pulverização agrícola defensivo inseticida herbicida'],
      ['Derivados de petróleo', '', 'óleo petróleo'],
      ['Jateamento de areia', '', 'jateamento areia abrasivo'],
      ['Lavagem de auto', '', 'lava jato lavadora alta pressão lavagem'],
      ['GLP / GN', '', 'gás glp gn'],
      ['Combustível', '', 'combustível diesel gasolina'],
      ['Sucção e descarga de derivados de petróleo', '', 'sucção descarga petróleo'],
      ['Bombas de combustível', '', 'bomba combustível posto'],
      ['Oxigênio / acetileno, solda dupla', '', 'solda oxigênio acetileno dupla'],
      ['Oxigênio / acetileno, solda individual', '', 'solda oxigênio acetileno individual'],
      ['Vapor saturado', '', 'vapor caldeira'],
      ['Vapor frigorífico', '', 'vapor frigorífico'],
      ['Sucção e descarga de polpa de minério', '', 'mineração minério polpa'],
      ['Caminhão tanque', '', 'caminhão tanque'],
      ['Freio a ar (sistema de freio pneumático)', '', 'freio ar caminhão'],
      ['Oilfield hose / rotary', '', 'oilfield rotary perfuração'],
      ['Produtos químicos', '', 'químico ácido'],
      ['Alimentos e bebidas', '', 'alimento bebida atóxica'],
      ['Solvente para pintura', '', 'solvente pintura'],
      ['Mangueiras de silicone', '', 'silicone'],
      ['Mangueiras automotivas', '', 'automotiva carro radiador'],
    ],
  },
  {
    id: 'jardinagem', linha: 'industrial', nome: 'Jardinagem', foto: 'fam-jardinagem',
    texto: 'Mangueiras de jardim, trançadas e espirais, com bicos e conectores.',
    itens: [
      ['Mangueira de jardim', 'Lisa ou trançada, em rolo.', 'jardim jardinagem'],
      ['Conectores e esguichos', 'Engates, bicos e reparos.', 'esguicho bico conector jardim'],
    ],
  },
  {
    id: 'engates-pneumaticos', linha: 'pneumatica', nome: 'Engates rápidos pneumáticos', foto: 'fam-pneu-conexoes',
    texto: 'Para ar comprimido, vapor e refrigeração de matrizes.',
    itens: [
      ['Engates rápidos pneumáticos', '', 'engate rápido ar comprimido'],
      ['Engates rápidos para vapor', '', 'engate vapor'],
      ['Engates rápidos para refrigeração de matrizes', '', 'refrigeração matriz injetora'],
      ['Terminais, engates rápidos e extensores', '', 'terminal extensor'],
    ],
  },
  {
    id: 'tubos', linha: 'pneumatica', nome: 'Tubos e conexões', foto: 'fam-pneu-espiral',
    texto: 'Tubos em nylon e PU, retos e espirais, com conexões metálicas ou em resina.',
    itens: [
      ['Tubos nylon e PU', 'Retos ou espiralados, em várias cores.', 'tubo nylon pu poliuretano espiral'],
      ['Conexões metálicas / resina', 'Instantâneas, de rosca e de espigão.', 'conexão instantânea engate rápido'],
      ['Espigas', '', 'espiga espigão'],
    ],
  },
  {
    id: 'valvulas', linha: 'pneumatica', nome: 'Válvulas e acessórios', foto: 'fam-pneu-tubos',
    texto: 'Controle, fechamento e acabamento da rede pneumática.',
    itens: [
      ['Válvulas pneumáticas', '', 'válvula solenoide'],
      ['Válvulas de fechamento', '', 'válvula esfera fechamento registro'],
      ['Regulador de velocidade metálico / resina', '', 'regulador fluxo velocidade'],
      ['Silenciadores', '', 'silenciador'],
      ['Soprador de ar', '', 'soprador pistola ar'],
    ],
  },
];

// Ícones da página "Serviços" do site atual; os textos são nossos.
export const servicos = [
  ['comodato', 'Comodato', 'Equipamentos e estoque cedidos em comodato para clientes com consumo recorrente, conforme acordo comercial.'],
  ['entrega', 'Entrega', 'Entrega dos pedidos em Porto Alegre, Guaíba e região metropolitana.'],
  ['equipe', 'Equipe', 'Equipe experiente para indicar a mangueira, o terminal e a conexão certos para cada aplicação.'],
  ['estoque', 'Estoque', 'Mangueiras, terminais, conexões e engates em estoque nas duas lojas, para pronta entrega.'],
  ['treinamentos', 'Treinamentos', 'Orientação sobre especificação, montagem e uso seguro de mangueiras e conexões.'],
  ['vistoria', 'Vistoria', 'Vistoria de mangueiras e redes em operação, para trocar antes da falha e evitar a máquina parada.'],
];

// Opções do pedido de mangueira montada.
export const bitolas = ['3/16"', '1/4"', '5/16"', '3/8"', '1/2"', '5/8"', '3/4"', '1"', '1.1/4"', '1.1/2"', '2"', '2.1/2"', '3"'];
export const pressoes = ['Baixa pressão', 'Média pressão', 'Alta pressão', 'Super alta pressão', 'Extrema alta pressão', 'Não sei, preciso de ajuda'];
export const pontas = ['Terminal reto', 'Terminal curvo 45°', 'Terminal curvo 90°', 'Engate rápido', 'Flange', 'Sem terminal', 'Igual à amostra'];
