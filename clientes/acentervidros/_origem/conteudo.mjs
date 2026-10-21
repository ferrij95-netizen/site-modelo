// Conteúdo do site da A Center Vidros. Textos do site atual (acentervidros.com.br) salvo onde o LEIA-ME diz que foi escrito por nós.
export const empresa = {
  nome: 'A Center Vidros',
  url: 'https://acentervidros.overtus.com.br/',
  antigo: 'http://www.acentervidros.com.br/',
  ecommerce: 'http://ecommerce.acentervidros.com.br/login.aspx',
  telefone: '(16) 3961-3001',
  telHref: '+551639613001',
  whatsapp: '(16) 3961-2320',
  whatsHref: '551639612320',
  email: 'comercial@acentervidros.com.br',
  rua: 'Av. Eduardo Andrea Matarazzo, 803 (Via Norte)',
  bairro: 'Ipiranga · CEP 14060-810 · Ribeirão Preto, SP',
  mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1106.2356965946997!2d-47.81100967906083!3d-21.155640386316172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc009b56d3c3d4ff2!2sCenter+Vidros!5e0!3m2!1spt-BR!2sbr!4v1470661753431',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Center+Vidros+Av.+Eduardo+Andrea+Matarazzo+803+Ribeir%C3%A3o+Preto',
};

export const lema = ['Compromisso', 'Qualidade', 'Agilidade'];

export const historia = [
  'Presente no mercado de distribuição de vidros planos para construção civil, arquitetura e decoração e indústria moveleira há mais de 30 anos, a Center Vidros atua no fornecimento de produtos de alta qualidade, tanto no atacado, quanto no varejo.',
  'Atenta às novas tecnologias que atendem as constantes mudanças do setor, a empresa comercializa e produz vidros, espelhos, vidros temperados, box para banheiros, vidros extra-clear, tampos de mesa, lapidações bisotê, entre outros.',
  'Com foco na área de distribuição de vidros, a missão da Center Vidros é ser uma empresa dinâmica que busca, incessantemente, a excelência do produto acabado, sempre oferecendo qualidade elevada a um preço justo.',
  'Com mais de três décadas de operação no mercado vidreiro, a Center Vidros é uma empresa 100% brasileira, pioneira em seu segmento, que investe constantemente em treinamentos e novas tecnologias na busca incessante pela excelência e qualidade de seus produtos e serviços.',
];

export const missao = 'Ser uma empresa dinâmica que busca, incessantemente, a excelência do produto acabado, sempre oferecendo qualidade elevada a um preço justo.';

export const numeros = [
  { n: '30+', t: 'anos no mercado vidreiro' },
  { n: '100%', t: 'empresa brasileira' },
  { n: '5', t: 'linhas de produtos' },
  { n: '2', t: 'canais: atacado e varejo' },
];

export const mercados = [
  { nome: 'Construção civil', texto: 'Vidros planos, temperados e espelhos para obras residenciais e comerciais.' },
  { nome: 'Arquitetura e decoração', texto: 'Espelhos com bisotê, vidros fantasia e peças sob medida para ambientes.' },
  { nome: 'Indústria moveleira', texto: 'Tampos de mesa, espelhamento de móveis, furos e recortes para montagem.' },
];

export const servicos = [
  { slug: 'bisote', nome: 'Bisotê', icone: 'bisote', resumo: 'Borda chanfrada, lapidada e polida.',
    texto: 'É a técnica que dá um tratamento diferenciado e sofisticado à borda do vidro e espelho, com lapidação e polimento por meio das biseladoras. O acabamento de bisotê é muito usado no vidro e espelho destinado à construção civil, à indústria moveleira e à decoração. O vidro com bisotê é disponibilizado aos clientes para ornamentar ambientes, propiciando aos mesmos aconchego, requinte e sofisticação.' },
  { slug: 'lapidacao', nome: 'Lapidação', icone: 'lapidacao', resumo: 'Borda sem corte vivo e mais resistente.',
    texto: 'A lapidação é um processo utilizado para modelagem do vidro, sendo aplicado às bordas das placas para que o corte seja retirado e a resistência aumentada. A técnica é bastante aplicada na produção de tampos de mesas de vidro e espelhos, e é também um processo bastante utilizado para a produção de peças mais artísticas e decorativas, como o vidro bisotê.' },
  { slug: 'espelhamento', nome: 'Espelhamento de Móveis', icone: 'movel', resumo: 'Espelho aplicado em portas, tampos e frentes.',
    texto: 'Móveis espelhados são uma bela adição a salas tradicionais, contemporâneas, chalés ou a salas em estilo provençal. Para refletir vaidades ou ampliar espaços, os espelhos são grandes aliados na decoração. E eles não só frequentam as paredes e portas de armário.' },
  { slug: 'furos-recortes', nome: 'Furos e Recortes em Geral', icone: 'furo', resumo: 'Tomadas, colunas, fixação com parafusos.',
    texto: 'Cada vez mais a arquitetura de casas e escritórios busca soluções compactas e práticas visando o melhor aproveitamento das áreas construídas, o que pode gerar alguns obstáculos na instalação de vidros e espelhos, como tomadas, colunas e móveis embutidos. Para tornar a instalação dos vidros viável, mantendo a qualidade do acabamento, oferecemos o serviço de recorte e furação para as peças que necessitam de adaptação ou, em sua instalação, utilizam prolongadores e parafusos como forma de fixação.' },
];

// Etapas da peça: ordem escrita por nós a partir dos serviços do site atual.
export const etapas = [
  { nome: 'Chapa', texto: 'Vidro float, espelho, fantasia ou extra-clear do estoque da distribuidora.' },
  { nome: 'Corte, furos e recortes', texto: 'A peça ganha a medida e as aberturas para tomadas, colunas e fixação.' },
  { nome: 'Lapidação', texto: 'As bordas perdem o corte vivo e a placa fica mais resistente.' },
  { nome: 'Bisotê', texto: 'Chanfro polido na borda para espelhos e tampos decorativos.' },
  { nome: 'Entrega', texto: 'Peça pronta para a obra, a loja ou a fábrica de móveis, no atacado ou no varejo.' },
];

export const produtos = [
  { slug: 'espelhos', nome: 'Espelhos', capa: 'espelho-2',
    texto: 'Espelhos estão por toda parte, ampliam espaços, duplicam a iluminação, criam efeitos e transformam ambientes, dando-lhes requinte e charme.',
    usos: ['Paredes e painéis de salas e halls', 'Portas de armário e móveis espelhados', 'Peças com lapidação e bisotê', 'Espelhos decorativos recortados'],
    servicos: ['bisote', 'lapidacao', 'espelhamento', 'furos-recortes'],
    fotos: [['espelho-1', 'Três espelhos com moldura sobre aparador'], ['espelho-2', 'Espelho redondo veneziano'], ['espelho-3', 'Painel de espelho bronze em sala ampla'], ['espelho-4', 'Espelhos recortados em leque na parede'], ['espelho-5', 'Parede de espelhos em losango']] },
  { slug: 'vidros-float', nome: 'Vidros Float', capa: 'float-4',
    texto: 'Também chamados de vidros planos, os floats são de excelente uniformidade e não possuem quase nenhuma distorção óptica.',
    usos: ['Tampos de mesa', 'Prateleiras', 'Janelas e esquadrias', 'Base para lapidação, bisotê e têmpera'],
    servicos: ['lapidacao', 'bisote', 'furos-recortes'],
    fotos: [['float-4', 'Chapas de vidro float empilhadas'], ['float-2', 'Mesa de centro com tampo de vidro'], ['float-3', 'Mesa com tampo de vidro e pés de vidro'], ['float-1', 'Estante com prateleiras de vidro']] },
  { slug: 'vidro-fantasia', nome: 'Vidro Fantasia', capa: 'fantasia-canelado',
    texto: 'Os vidros fantasia foram estampados na hora de fabricar. Têm diversos tipos diferentes, como pontilhados, canelados ou martelados.',
    usos: ['Portas e divisórias com privacidade', 'Box e janelas de banheiro', 'Portas de armário e cristaleiras', 'Detalhes decorativos'],
    servicos: ['lapidacao', 'furos-recortes'],
    fotos: [['fantasia-canelado', 'Vidro canelado'], ['fantasia-mini-boreal', 'Vidro mini boreal'], ['fantasia-pontilhado', 'Vidro pontilhado']] },
  { slug: 'vidro-temperado', nome: 'Vidro Temperado', capa: 'temperado-2',
    texto: 'Os vidros temperados são muito fortes, pois passam por um processo especial que aumenta muito sua resistência. Por isso são usados em carros, lojas, bancos e também em box de chuveiro.',
    usos: ['Guarda-corpos e escadas', 'Fachadas e sacadas', 'Portas e vitrines de lojas', 'Box de banheiro'],
    servicos: ['furos-recortes', 'lapidacao'],
    fotos: [['temperado-2', 'Escada com guarda-corpo de vidro temperado'], ['temperado-1', 'Sacada envidraçada com vidro temperado'], ['temperado-3', 'Muro e escada com vidro temperado'], ['temperado-4', 'Chapas de vidro temperado']] },
  { slug: 'box-banheiro', nome: 'Box para Banheiro', capa: 'box-3',
    texto: 'Box padrão em vidro temperado com acabamento em alumínio, podendo ser em vidro incolor, colorido ou jateado e acabamento fosco ou brilho em diversas cores.',
    usos: ['Vidro incolor, colorido ou jateado', 'Acabamento em alumínio fosco ou brilho', 'Diversas cores de acabamento', 'Vidro temperado de segurança'],
    servicos: ['furos-recortes'],
    fotos: [['box-3', 'Banheiro com box de vidro do piso ao teto'], ['box-1', 'Banheiro amplo com box de vidro temperado'], ['box-2', 'Box de vidro com banheira'], ['box-4', 'Box de canto com vidro temperado']] },
];
