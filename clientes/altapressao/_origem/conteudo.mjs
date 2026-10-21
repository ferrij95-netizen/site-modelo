// Textos e dados da Alta Pressão. O que vem do site atual (altapressao.com.br) está marcado; o resto foi escrito por nós.
export const empresa = {
  nome: 'Alta Pressão',
  razao: 'Alta Pressão Bombas e Cilindros Hidráulicos Ltda',
  url: 'https://altapressao.overtus.com.br/',
  antigo: 'http://www.altapressao.com.br/',
  tel: '(34) 3216-7411',
  telHref: '+553432167411',
  email: 'altapressao@altapressao.com.br',
  endereco: 'Av. Professora Minervina Cândida de Oliveira, 507',
  bairro: 'Osvaldo Rezende',
  cidade: 'Uberlândia - MG',
  cep: '38.400-488',
  horario: [['Segunda a sexta', '08:30 às 18:00'], ['Sábado', '08:00 às 12:00']],
  mapa: 'https://maps.google.com/maps?q=Av.+Professora+Minervina+Candida+de+Oliveira,+507,+Uberl%C3%A2ndia+MG&z=16&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Av.+Professora+Minervina+Candida+de+Oliveira+507+Uberlandia+MG',
};

// Do site atual (home, quem somos, serviços e política de qualidade), sem mudar o sentido.
export const textos = {
  empresa: 'A Alta Pressão Bombas e Cilindros Hidráulicos Ltda está sempre em busca da melhoria contínua, da qualificação dos colaboradores e principalmente da satisfação de seus clientes.',
  iso: 'Para evidenciar a nossa política e também atender às exigências do mercado regional e nacional, no decorrer do ano de 2020 a Fundação Vanzolini/IQNet avaliou a conformidade do Sistema de Gestão da Qualidade NBR ISO 9001:2015 em vigor na empresa, recomendando a recertificação do SGQ em seus processos.',
  escopo: 'Prestação de serviços de manutenção e recuperação de cilindros, bombas, comandos e sistemas hidráulicos na unidade Uberlândia (MG).',
  auditoria: 'A certificação é validada pelas auditorias anuais de supervisão realizadas pela entidade, o que comprova e assegura a qualidade em nossos processos na prestação de serviços.',
  servicos: 'Realizamos serviços de manutenção e recuperação de cilindros, bombas e comandos hidráulicos com o objetivo de atender às necessidades e à satisfação dos nossos clientes, através do comprometimento e desenvolvimento dos nossos colaboradores e da melhoria contínua do nosso sistema de gestão da qualidade.',
  foco: 'Mantemos sempre o foco em servir com qualidade, no menor tempo possível, aplicando preços compatíveis ao mercado e sempre utilizando matéria-prima e reparos de alta qualidade, confiabilidade e garantia.',
  politica: 'Realizar serviços de manutenção e recuperação de cilindros, bombas e comandos hidráulicos, com objetivo de atender as necessidades e satisfação dos clientes, através do comprometimento e desenvolvimento dos nossos colaboradores e da melhoria contínua do sistema de gestão da qualidade.',
};

// As quatro frentes do escopo da certificação. Descrições curtas escritas por nós a partir do escopo e das fotos da oficina.
export const servicos = [
  { id: 'cilindros', nome: 'Cilindros hidráulicos', foto: 'cilindros-recuperacao', foto2: 'laranja-1',
    curto: 'Manutenção e recuperação de cilindros de máquinas e equipamentos, do pequeno ao de grande porte.',
    itens: ['Desmontagem e avaliação de haste, camisa e vedações', 'Usinagem e recuperação de componentes', 'Troca de reparos e vedações', 'Montagem e teste de estanqueidade em bancada'] },
  { id: 'bombas', nome: 'Bombas hidráulicas', foto: 'bancada-bomba', foto2: 'bancada-cilindro',
    curto: 'Recuperação de bombas com teste em bancada antes da entrega, para devolver vazão e pressão de trabalho.',
    itens: ['Diagnóstico do desgaste interno', 'Substituição de peças e reparos', 'Montagem com reparos de alta qualidade', 'Teste de vazão e pressão em bancada'] },
  { id: 'comandos', nome: 'Comandos hidráulicos', foto: 'comandos', foto2: 'bancada-cilindro',
    curto: 'Revisão de comandos e válvulas direcionais, com ajuste e teste de funcionamento.',
    itens: ['Desmontagem e limpeza do comando', 'Avaliação de carretéis e alojamentos', 'Troca de vedações e componentes', 'Ajuste e teste de funcionamento'] },
  { id: 'sistemas', nome: 'Sistemas hidráulicos', foto: 'galpao', foto2: 'oficina',
    curto: 'Manutenção do sistema hidráulico como um todo, com o mesmo controle de qualidade da oficina.',
    itens: ['Avaliação do conjunto e dos componentes', 'Recuperação de cilindros, bombas e comandos', 'Montagem e conferência', 'Garantia do serviço'] },
];

// Etapas do serviço na oficina (escritas por nós; o teste em bancada aparece nas fotos e a garantia no texto do site).
export const etapas = [
  { nome: 'Recebimento', txt: 'O equipamento chega, é identificado e registrado para acompanhar todo o processo.' },
  { nome: 'Desmontagem e diagnóstico', txt: 'Desmontamos, limpamos e avaliamos cada componente para definir o que recuperar e o que trocar.' },
  { nome: 'Orçamento', txt: 'O cliente recebe o orçamento com o serviço necessário e o prazo para aprovar.' },
  { nome: 'Recuperação', txt: 'Usinagem, recuperação de peças e troca de reparos com matéria-prima de alta qualidade.' },
  { nome: 'Montagem e teste', txt: 'Montagem e teste em bancada com manômetros, para conferir pressão e funcionamento.' },
  { nome: 'Entrega com garantia', txt: 'O equipamento volta pronto para trabalhar, no menor tempo possível e com garantia.' },
];

// Fotos da oficina (todas do site atual, galeria "Quem Somos"). Legendas escritas por nós.
export const fotos = [
  { f: 'galpao', t: 'Oficina de cilindros' },
  { f: 'oficina', t: 'Área de usinagem' },
  { f: 'bancada-bomba', t: 'Bancada de teste' },
  { f: 'torno', t: 'Torno para hastes e camisas' },
  { f: 'barras', t: 'Estoque de barras' },
  { f: 'serra', t: 'Corte de material' },
  { f: 'cilindros-teste', t: 'Montagem de cilindro' },
  { f: 'cilindros-recuperacao', t: 'Cilindros em recuperação' },
  { f: 'comandos', t: 'Comandos hidráulicos' },
  { f: 'tratamento-1', t: 'Processo de recuperação de peças' },
  { f: 'tratamento-2', t: 'Processo de recuperação de peças' },
  { f: 'tratamento-3', t: 'Processo de recuperação de peças' },
  { f: 'bancada-cilindro', t: 'Teste de comando em bancada' },
  { f: 'fachada', t: 'Sede em Uberlândia' },
];
