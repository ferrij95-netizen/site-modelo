// Textos da Fino Alimentos, copiados de finoalimentos.com.br (21/10/2026). Só erros de digitação corrigidos.
export const empresa = {
  nome: 'Fino Alimentos',
  url: 'https://finoalimentos.overtus.com.br/',
  antigo: 'https://finoalimentos.com.br/',
  telefone: '+55 45 4102-9700',
  telefoneHref: '+554541029700',
  email: 'contato@finoalimentos.com.br',
  endereco: 'Estrada Municipal, s/n',
  bairro: 'Concórdia do Oeste',
  cidade: 'Toledo/PR - Brasil',
  mapa: 'https://goo.gl/maps/F1xZRjfhHrr',
  mapaEmbed: 'https://www.google.com/maps?q=Concórdia+do+Oeste,+Toledo+-+PR&z=13&output=embed',
  facebook: 'https://www.facebook.com/finoalimentos/',
  departamentos: ['Comercial', 'Compras', 'Qualidade'],
};

export const numeros = [
  { n: '250', u: 't/dia', t: 'de mandioca moída' },
  { n: '70', u: 't/dia', t: 'de produto acabado' },
  { n: '24', u: 'h', t: 'no máximo entre a colheita e a moagem' },
  { n: '70', u: '%', t: 'da caldeira movida a biogás' },
];

export const destaque = {
  titulo: 'Amido de Mandioca',
  texto: 'Tem uma ampla gama de aplicação na indústria alimentícia e uso também na fabricação de papel e celulose, farmacêutica e cosmética, têxtil, entre outros.',
};

export const quemSomos = [
  { slug: 'empresa', icone: 'historia', titulo: 'História', texto: 'Localizado em Toledo no Oeste do Estado do Paraná, em uma região extremamente agrícola com grande disponibilidade de matéria-prima.' },
  { slug: 'qualidade', icone: 'qualidade', titulo: 'Qualidade', texto: 'Nosso produto se caracteriza pela adoção de itens das Boas Práticas de Fabricação (BPF) e a Análise de Perigos e Pontos Críticos de Controle (HACCP).' },
  { slug: 'meio-ambiente', icone: 'ambiente', titulo: 'Meio Ambiente', texto: 'Para alcançar resultados comerciais expressivos e o respeito dos clientes, nós estamos atentos à preservação ambiental.' },
];

export const historia = [
  'Localizada em Toledo, no oeste do estado do Paraná, em uma região extremamente agrícola com grande disponibilidade de matéria-prima, o que faz com que tenhamos produto para beneficiar o ano todo, atendendo assim as nossas demandas e as demandas dos nossos parceiros.',
  'Nossa matéria-prima é de altíssima qualidade, o que é um fator importantíssimo para a qualidade do produto final.',
  'Temos capacidade de moagem de 250 toneladas por dia de mandioca, com produção de 70 toneladas de produto acabado por dia.',
  'Disponibilizamos produtos em sacaria de 25 kg na embalagem papel kraft ou embalagem plástica, além de big-bag de 700 a 1.350 kg.',
  'Fazemos toda a logística até a sua empresa, para uma entrega rápida, eficiente e com qualidade.',
];

export const mvv = [
  { t: 'Missão', p: 'Incentivar o plantio de mandioca buscando uma parceria forte e duradoura com o homem do campo, visando a melhoria contínua do relacionamento com seus clientes e colaboradores e o aperfeiçoamento da tecnologia dos processos, respeitando a comunidade e o meio ambiente.' },
  { t: 'Visão', p: 'Superar a expectativa de satisfação do cliente, fornecedor e colaboradores.' },
  { t: 'Valores', p: 'Proatividade com o cliente; comprometimento com os resultados da Companhia; respeito com as pessoas; segurança e satisfação dos clientes.' },
];

export const qualidade = {
  titulo: 'De olho no melhor processo de fabricação',
  paragrafos: [
    'Nosso produto se caracteriza pela adoção de itens das Boas Práticas de Fabricação (BPF) e a Análise de Perigos e Pontos Críticos de Controle (HACCP).',
    'Após a colheita, o processo de moagem da raiz de mandioca se dá no máximo em 24h, o que se traduz em um produto de qualidade, alto teor amiláceo, com uniformidade em suas características físico-químicas, uniformidade na coloração, no teor de umidade, no índice de pH e ótimos níveis bacteriológicos, propiciando seu uso com segurança no segmento alimentício, de papel e celulose e farmacêutico.',
    'O ensaque do produto ocorre de forma automatizada e o mesmo é estocado em paletes dentro da indústria de maneira apropriada, assegurando a qualidade do amido.',
  ],
  controles: [['Teor amiláceo', 'alto'], ['Coloração', 'uniforme'], ['Teor de umidade', 'uniforme'], ['Índice de pH', 'uniforme'], ['Níveis bacteriológicos', 'ótimos']],
};

export const ambiente = {
  titulo: 'Boas práticas para o nosso planeta',
  texto: 'Para alcançar resultados comerciais expressivos e o respeito dos clientes, a Fecularia Fino Alimentos está atenta à preservação ambiental. A caldeira utiliza 70% de gás gerado pelo biodigestor e 30% de madeiras de reflorestamento autorizado, localizado nas proximidades da empresa.',
};

export const produtosIntro = [
  'A Fino Alimentos oferece em seu portfólio uma linha completa de amidos nativos e modificados derivados de mandioca, não somente para as indústrias alimentícias, mas também para outros mercados como industriais, cosméticos e farmacêuticos.',
  'As modificações utilizadas pela Fino Alimentos são físicas, ou seja, utilizam calor para o desenvolvimento da modificação. Com isso, as indústrias alimentícias podem contar com amidos extremamente especiais e que conferem características multifuncionais como corpo, estabilidade, cremosidade e textura.',
];

// As nove linhas do menu "Produtos" do site atual, na mesma ordem.
export const produtos = [
  { slug: 'panificacao', nome: 'Panificação', tipo: 'Pré-misturas e amido pré-gel', usos: ['Pão de queijo', 'Chipas', 'Bolos', 'Biscoitos'],
    texto: ['A Fino Alimentos conta com variado mix de pré-misturas para panificação. Os amidos modificados pré-gel fisicamente à base de mandioca conferem consistência aos produtos finais em processos que dispensam cozimento e oferecem praticidade e qualidade na fabricação.', 'Atribuem estabilidade a sistemas com altas temperaturas e oscilações de temperatura, com sinérese reduzida, sendo um diferencial no shelf life do produto de panificação.'] },
  { slug: 'molhos', nome: 'Molhos', tipo: 'Amido modificado fisicamente', usos: ['Molho à base de tomate', 'Molho tipo catchup', 'Molho branco tipo bechamel', 'Molho tipo mostarda', 'Molhos para saladas'],
    texto: ['O ideal para os molhos congelados é utilizar amidos modificados com uma performance alta para suportar os ciclos de congelamento e descongelamento. Pela utilização do amido de mandioca modificado, garantimos melhor textura aos molhos, evitando sinérese.', 'Além da aplicação a quente, alguns amidos não necessitam de cocção, podendo ser aplicados a frio no alimento.'] },
  { slug: 'frigorifico', nome: 'Frigorífico', tipo: 'Amido modificado fisicamente', usos: ['Carnes enlatadas', 'Embutidos', 'Emulsões cárneas'],
    texto: ['Os amidos modificados fisicamente da Fino Alimentos possuem uma linha completa para aplicações em frigorífico. Agem como espessante, dando estabilidade e consistência aos produtos finais à base cárnea.'] },
  { slug: 'fecula-e-polvilhos', nome: 'Fécula e Polvilhos', tipo: 'Fécula de mandioca e polvilho azedo industrial', usos: ['Pães de queijo', 'Polvilhos', 'Massas', 'Pães', 'Bolos', 'Tapioca', 'Embutidos'],
    texto: ['A Fécula de Mandioca e o Polvilho Azedo Industrial da Fino Alimentos são produzidos com raízes selecionadas e com alto padrão de qualidade.', 'Características e benefícios: necessita cozimento, não interfere no sabor e confere uma textura de alta viscosidade.'] },
  { slug: 'pratos-prontos', nome: 'Pratos Prontos', tipo: 'Mandioca em pó', usos: ['Escondidinho de purê de mandioca', 'Bolinhos de mandioca'],
    texto: ['Mandioca em Pó é o produto para facilitar o dia a dia da indústria. Com fácil aplicação, deixa o produto com textura cremosa e/ou suave e estável a sistema de cisalhamento. Dessa forma, produzir alimentos saborosos e com qualidade fica fácil.', 'Produto ideal para elaborar pratos prontos à base de mandioca.'] },
  { slug: 'empanados', nome: 'Empanados', tipo: 'Amido modificado fisicamente', usos: ['Aderência de empanamento', 'Produtos crocantes'],
    texto: ['Estável para aderência de empanamento, os amidos modificados fisicamente à base de mandioca deixam o produto mais sequinho, saboroso e muito mais crocante.'] },
  { slug: 'salgadinhos', nome: 'Salgadinhos', tipo: 'Amido para fritura e congelados', usos: ['Coxinhas', 'Kibes', 'Almôndegas', 'Massas assadas'],
    texto: ['Amidos ideais para suportar a fritura, deixando seu produto mais sequinho. Estável para produtos que requerem estocagem em baixas temperaturas e redução de trincas nas massas.'] },
  { slug: 'tapioca', nome: 'Tapioca', tipo: 'Goma hidratada', usos: ['Tapiocas recheadas', 'Bolo de tapioca', 'Pratos doces e salgados'], selo: 'Isenta de glúten e lactose',
    texto: ['A tapioca é uma iguaria tipicamente brasileira, de origem indígena, produzida a partir da fécula da mandioca.', 'A goma hidratada para tapioca é isenta de glúten e lactose, ideal para dietas com restrição, e garante rapidez no preparo, sabor e qualidade a vários pratos doces e salgados.'] },
  { slug: 'batata-noisette', nome: 'Batata Noisette', tipo: 'Pré-mix pronto', usos: ['Ao forno', 'Frita', 'Acompanhamento'],
    texto: ['A Fino Alimentos possui um pré-mix já pronto para batata noisette. Com isso, garantimos facilidade e rapidez no preparo.', 'Em formato de bolinha, as batatas noisette ficam com uma casquinha crocante por fora e um recheio cremoso e delicioso por dentro. Ficam perfeitas tanto ao forno quanto fritas e acompanham bem os mais variados pratos.'] },
];

// Do campo ao caminhão: etapas tiradas das páginas História e Qualidade do site atual.
export const processo = [
  { t: 'Lavoura', p: 'Oeste do Paraná, região extremamente agrícola: mandioca para beneficiar o ano todo.', img: 'planta-mandioca' },
  { t: 'Colheita', p: 'Raízes selecionadas, de altíssima qualidade, seguem direto para a fecularia.', img: 'raizes' },
  { t: 'Moagem em até 24 h', p: 'Capacidade de 250 toneladas de raiz por dia; alto teor amiláceo e cor uniforme.', img: 'aereo' },
  { t: 'Amido', p: 'Fécula nativa ou modificada fisicamente, com calor, sem alterar o sabor.', img: 'fecula-tigela' },
  { t: 'Ensaque automatizado', p: 'Sacaria de 25 kg (papel kraft ou plástico) ou big-bag de 700 a 1.350 kg, estocados em paletes.', img: 'sacaria' },
  { t: 'Entrega', p: 'Fazemos toda a logística até a sua empresa.', img: 'lavoura' },
];

export const creditos = 'Fotos de lavoura, raízes e fécula: Wikimedia Commons e WordPress Photo Directory (licenças CC). Demais fotos: site da Fino Alimentos.';
