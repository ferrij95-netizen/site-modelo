// Textos copiados do site atual (catei.net.br: Início, História, Quem Somos, Contato), só com acentos e vírgulas corrigidos.
export const empresa = {
  nome: 'Catei',
  nomeLongo: 'Catei Armazém & Frigorífico',
  razao: 'Catei S/A',
  url: 'https://catei.overtus.com.br/',
  antigo: 'http://catei.net.br/',
  linha: 'Comércio – Administração – Transporte – Exportação – Indústria',
  fone: '(41) 3257-2111',
  foneHref: '+554132572111',
  email: 'frigo.catei@gmail.com',
  endereco: 'Rua Venezuela, 490 – Bacacheri',
  cidade: 'Curitiba – PR',
  unidade: 'Catei Matriz Bacacheri – Curitiba',
  horario: 'Atendimento de 2ª a 6ª, das 8:00 às 18:00 h',
  mapa: 'https://maps.google.com/maps?q=Rua%20Venezuela%20490%20Bacacheri%20Curitiba&t=m&z=14&output=embed&iwloc=near',
  rota: 'https://www.google.com/maps/dir/?api=1&destination=Rua+Venezuela+490+Bacacheri+Curitiba+PR',
};

export const textos = {
  reconhecimento: 'Reconhecida pela revista Tecnologística como pioneira no Mercado Brasileiro de Operadores Logísticos Frigorificados, destacando-se pelos serviços oferecidos aos clientes.',
  localTitulo: 'Estamos em um local estratégico para melhor servi-lo',
  quemSomos: 'A Catei S.A. oferece a melhor opção para armazenagem de suas mercadorias. Contando com equipamentos e mão de obra de qualidade para garantir um ótimo serviço, atendendo às necessidades, especificações e exigências requeridas, garantindo assim as características originais do produto.',
  matriz: 'Rua Venezuela 490, na região central de Curitiba. Proporcionando fácil acesso aos bairros centrais, viabilizando o atendimento e o transporte às empresas e comércios locais.',
  atende: 'Atendendo tanto as grandes empresas, como também os médios e pequenos comerciantes.',
  historiaTit: 'Tradição e qualidade que ultrapassaram décadas',
  historia: 'São 56 anos de atividade que parabenizamos especialmente aos funcionários, clientes, parceiros e fornecedores. Sem os quais não teríamos chegado até aqui.',
  adequa: 'Seja qual forem as características de seus produtos, a Catei está preparada para se adequar às suas necessidades.',
  visita: ['Faça-nos uma visita e conheça toda nossa infraestrutura.', 'Com certeza adequaremos seu orçamento aos nossos serviços.', 'Nosso objetivo é manter uma parceria íntegra e duradoura para ambas as partes.'],
  pilares: ['Atendimento', 'Disponibilidade de espaço', 'Cuidados e higiene', 'Qualidade', 'Organização e segurança'],
};

// Números que aparecem no texto do site atual.
export const numeros = [
  { n: '7.600', u: 'm³', t: 'de área refrigerada' },
  { n: '22.500', u: 'm²', t: 'de pátio interno para espera e pernoite' },
  { n: '-25', u: '°C', t: 'nas câmaras individuais ou coletivas' },
  { n: '15', u: 't', t: 'em dois túneis de congelamento' },
];

export const vantagens = [
  { id: 'localizacao', titulo: 'Localização', texto: 'Região central de Curitiba, na Rua Venezuela 490, Bacacheri: fácil acesso aos bairros centrais para atender e transportar às empresas e comércios locais.' },
  { id: 'espaco', titulo: 'Espaço', texto: 'Com 7.600 metros cúbicos de área refrigerada e mais de 22.500 metros quadrados de pátio interno para espera e pernoite de motoristas, contando com cozinha e banheiros disponíveis.' },
  { id: 'pacotes', titulo: 'Pacotes de serviços personalizados', texto: 'Visando a maior interação com o cliente e a otimização dos serviços oferecidos, a Catei dispõe do melhor serviço de acordo com suas necessidades, visando assim um ótimo custo-benefício para sua empresa.' },
  { id: 'temperatura', titulo: 'Temperatura controlada', texto: 'Câmaras individuais ou coletivas que podem atingir até -25 °C.' },
  { id: 'tomadas', titulo: 'Tomadas para reefers e caminhões', texto: 'Em casos de espera podemos acomodar seu veículo em nosso pátio, conectado a tomadas exclusivas para caminhões refrigerados ou Container Reefer.' },
  { id: 'mao', titulo: 'Mão de obra especializada', texto: 'Mão de obra especializada em carga, descarga, contagem, separação, paletização, etiquetagem, entre outros.' },
  { id: 'estoque', titulo: 'Controle de estoque', texto: 'Controle de entradas, saídas, PEPS, UEPS, endereçamento, localização etc.' },
];

// Os oito serviços, na ordem da home atual. "temp" e "fase" servem à régua de temperatura da versão B.
export const servicos = [
  { id: 'armazenagem', titulo: 'Armazenagem', temp: '-18 °C', fase: 'guardar', curto: 'Câmaras individuais e coletivas', texto: 'Oferecendo uma solução mais eficiente e econômica para o seu comércio, a Catei dispõe de amplas câmaras individuais e coletivas onde seus produtos manterão as características originais, garantindo a adequação às exigências específicas de cada produto.' },
  { id: 'recuperacao-de-frio', titulo: 'Recuperação de frio', temp: 'de volta ao ponto', fase: 'receber', curto: 'Volta à temperatura certa após o transporte', texto: 'No processo de transporte o produto sofre uma variação constante na temperatura, a qual pode afetar as propriedades do alimento. A recuperação de frio devolve a carga à temperatura certa antes da armazenagem.' },
  { id: 'congelamento', titulo: 'Congelamento', temp: 'abaixo de -25 °C', fase: 'congelar', curto: 'Dois túneis para até 15 toneladas', texto: 'A empresa conta com dois túneis de congelamento para até 15 toneladas. No congelamento rápido o alimento é submetido a um abaixamento muito brusco de temperatura, e a água presente nos espaços intracelulares congela-se rapidamente. Assim, durante o descongelamento não é possível verificar nenhuma alteração na qualidade do alimento. Utilizam-se temperaturas abaixo de -25 °C para o congelamento e, depois, o produto é armazenado a -18 °C.' },
  { id: 'picking', titulo: 'Picking', temp: '', fase: 'separar', curto: 'Agendamento, contagem e separação', texto: 'Agendamento de carga com contagem e separação de seus produtos, agilizando os processos e otimizando a logística de carga e transporte.' },
  { id: 'embalagem', titulo: 'Embalagem', temp: '', fase: 'separar', curto: 'Embalar, etiquetar e acondicionar', texto: 'Mão de obra para embalamento, desembalamento, etiquetagem e acondicionamento de carga.' },
  { id: 'paletizacao', titulo: 'Paletização', temp: '', fase: 'separar', curto: 'Para armazenagem e transporte', texto: 'Paletização para armazenagem e transporte, garantindo a integridade física da embalagem do produto.' },
  { id: 'cross-docking', titulo: 'Cross docking', temp: '', fase: 'expedir', curto: 'Direto às regiões estratégicas de Curitiba', texto: 'Serviços para grandes empresas distribuidoras e importadoras que necessitam disseminar seus produtos diretamente às regiões estratégicas de Curitiba, gerenciando a troca de informações da melhor maneira possível.' },
  { id: 'transferencia', titulo: 'Transferência', temp: '', fase: 'receber', curto: 'Docas na medida do seu veículo', texto: 'Docas que atendem às dimensões e capacidades de seus veículos, com espaço para manobras, respeitando o declive necessário para garantir uma movimentação mais segura e eficiente para seus produtos.' },
];

// Etapas da cadeia do frio (versão B): agrupam os serviços na ordem em que a carga passa pela Catei.
export const fases = [
  { id: 'receber', n: '01', titulo: 'Chegada e doca', temp: 'temperatura do transporte', foto: 'doca-frimesa', alt: 'Carreta frigorífica na doca do galpão azul da Catei' },
  { id: 'congelar', n: '02', titulo: 'Congelamento rápido', temp: 'abaixo de -25 °C', foto: 'antecamara', alt: 'Antecâmara refrigerada com piso de chapa xadrez' },
  { id: 'guardar', n: '03', titulo: 'Armazenagem', temp: '-18 °C', foto: 'camara-paletes', alt: 'Câmara fria da Catei com caixas sobre paletes' },
  { id: 'separar', n: '04', titulo: 'Separação e preparo', temp: 'em ambiente controlado', foto: 'camara-paletes', alt: 'Paletes montados na câmara fria' },
  { id: 'expedir', n: '05', titulo: 'Saída para Curitiba', temp: 'carga pronta para o destino', foto: 'galpao-lateral', alt: 'Galpão azul e branco da Catei com o nome na fachada' },
];

// Logos da seção "Conheça alguns de nossos clientes" do site atual.
export const clientes = [
  { arq: 'frigo-arrobba', nome: 'Frigo Arrobba', w: 130, h: 70 },
  { arq: 'carne-sul', nome: 'Carne Sul Distribuidora', w: 180, h: 61 },
  { arq: 'tapajos', nome: 'Frigorífico Tapajós', w: 320, h: 155 },
  { arq: 'yerbalatina', nome: 'Yerbalatina Phytoactives', w: 264, h: 138 },
  { arq: 'natural-life', nome: 'Natural Life', w: 130, h: 81 },
  { arq: 'novilho-nobre', nome: 'Novilho Nobre', w: 120, h: 90 },
];
