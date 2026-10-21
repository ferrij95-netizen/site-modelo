// Textos da Copermutum. Tudo vem do site atual (copermutum.com.br, coper.html e assembleia2021/) e do cadastro do CNPJ 26.584.623/0001-42.
// O que foi escrito por nós (títulos de seção, frases de apoio, etapas "do grão à carne") está marcado com "nosso" no LEIA-ME.

export const empresa = {
  nome: 'Copermutum',
  razao: 'Cooperativa Agropecuária Mista Nova Mutum Ltda.',
  cnpj: '26.584.623/0001-42',
  url: 'https://copermutum.overtus.com.br/',
  antigo: 'https://copermutum.com.br/',
  cidade: 'Nova Mutum, Mato Grosso',
  fundacao: '21 de setembro de 1990',
  telefone: '(65) 3308-1512',
  telefoneHref: '+556533081512',
  facebook: 'https://www.facebook.com/Copermutum-270382806711276/',
  webmail: 'http://webmail.copermutum.com.br/',
};

export const numeros = [
  { valor: '1990', rotulo: 'ano de fundação' },
  { valor: '4.200', rotulo: 'matrizes na Granja UPL' },
  { valor: '150 mil', rotulo: 'leitões por ano para as terminações' },
  { valor: '70', rotulo: 'colaboradores, aproximadamente' },
];

export const sobre = {
  intro: 'A Cooperativa Agropecuária Mista de Nova Mutum Ltda. está localizada no município de Nova Mutum, no Mato Grosso, a cerca de 240 km da capital Cuiabá. Foi fundada em 21 de setembro de 1990: diante da crise da época, os cooperados resolveram unir forças para enfrentar a crise na agricultura dos anos 90. Assim os produtores puderam assegurar uma renda para o sustento da família e fomentar o progresso do município.',
  projeto: 'O projeto da entidade é transformar a matéria-prima, farelo de soja e milho produzidos pelos cooperados, em carne suína, agregando valor aos cereais.',
  frigorifico: 'Com a criação dos suínos e a transformação das matérias-primas em nutrição animal, surgiu outro desafio para os produtores: onde abater os animais? Levá-los para outra cidade deixaria o produto menos competitivo, pelo aumento de custo. Isso não desanimou os cooperados, e o empreendedorismo deles trouxe uma alternativa excelente, embora complicada de executar: em 1991 foi aberto o Frigorífico Excelência, que realizaria o abate dos animais, motivo de orgulho e crescimento da cidade.',
  atividade: 'A atividade econômica principal é a criação de suínos (CNAE 01.54-7/00), e a secundária, a fabricação de alimentos para animais (CNAE 10.66-0/00). A natureza jurídica é 214-3, cooperativa, e a contabilidade é feita internamente.',
  cooperados: 'A cooperativa conta com 41 cooperados, dos quais 17 atuam na suinocultura, e com aproximadamente 70 colaboradores entre a matriz, a UPL e a fábrica de ração.',
  futuro: 'A visão de futuro é ampliar as unidades da matriz e aumentar o número de suínos abatidos.',
};

export const entrevista = {
  texto: 'E qual é o segredo dessa cooperativa "à prova de crises"? Tudo começou com 760 matrizes (fêmeas reprodutoras), na virada das décadas de 80 e 90. "Foi uma maneira de diversificar e agregar valor a um produto que não valia nada: o milho", diz.',
  autor: 'Ottonelli',
  cargo: 'Presidente',
};

export const unidades = [
  {
    slug: 'matriz', nome: 'Matriz', subtitulo: 'Unidade administrativa',
    texto: 'Na matriz ficam a diretoria e a área administrativa: financeiro, fiscal, contábil e recursos humanos.',
    endereco: 'Av. dos Uirapurus, 354-W, Centro, Nova Mutum - MT',
    mapa: 'Av. dos Uirapurus, 354, Nova Mutum, MT',
    foto: 'campo-soja',
  },
  {
    slug: 'granja', nome: 'Granja UPL', subtitulo: 'Unidade Produtora de Leitões',
    texto: 'Concentra o alojamento das 4.200 matrizes, dos reprodutores e dos leitões recém-nascidos até 60 dias de vida. A partir dessa idade os animais seguem para as propriedades dos cooperados, as terminações, que funcionam como uma extensão da matriz.',
    endereco: 'BR-163, km 598, Nova Mutum - MT',
    mapa: 'BR-163 km 598, Nova Mutum, MT',
    foto: 'maternidade',
  },
  {
    slug: 'fabrica', nome: 'Fábrica de Ração', subtitulo: 'Nutrição dos animais',
    texto: 'Produz as rações para os animais da UPL e das terminações. Ali são armazenados e misturados os nutrientes, cereais, medicamentos e demais insumos necessários para a alimentação dos suínos.',
    endereco: 'Perimetral das Samambaias, 1518-W, Nova Mutum - MT',
    mapa: 'Perimetral das Samambaias, 1518, Nova Mutum, MT',
    foto: 'fabrica-silos',
  },
];

export const granja = {
  intro: 'Contamos hoje com duas principais genéticas de matrizes, que correspondem à produção anual de 150.000 leitões para as terminações. Estamos atentos às tecnologias e ao cuidado para sempre ter o melhor resultado.',
  autor: 'Vamir Bassegio',
  cargo: 'Gerente da Granja UPL',
  sitios: [
    'Multiplicadora',
    'UPL 1 e UPL 2',
    'Creche',
    '5º Sítio',
  ],
  ambiente: 'Na UPL há investimentos ambientais da cooperativa, pela preocupação com o meio ambiente e pela busca de autossuficiência em alguns setores, o que garante custos menores de produção. Os biodigestores transformam os dejetos em biogás, que gera energia elétrica: com essa energia alternativa a unidade é autossuficiente.',
  compostagem: 'Além do biodigestor, a granja trabalha com compostagem.',
  estrutura: 'A UPL tem alojamentos para os funcionários e cantina para as refeições.',
};

export const racoes = [
  { nome: 'Rações das UPLs', texto: 'Destinadas à Unidade Produtora de Leitões: todas as rações consumidas na granja, das matrizes aos leitões da creche.', foto: 'soja-linhas' },
  { nome: 'Rações de Terminação', texto: 'Para os suínos alojados nas propriedades dos cooperados, as terminações, até a saída para o abate.', foto: 'suinos-2' },
  { nome: 'Rações Comerciais', texto: 'Rações produzidas para venda ao consumidor final, por meio de parceiros revendedores como a Agropecuaril.', foto: 'milho' },
];

export const fabrica = {
  intro: 'Na fábrica de ração da Copermutum o milho e o farelo de soja produzidos pelos cooperados viram nutrição para os animais, com o apoio das empresas parceiras de nutrição.',
  bpf: 'A equipe da fábrica se capacita em Boas Práticas de Fabricação (BPF) de rações, com foco em implementação e gestão.',
};

// Etapas "do grão à carne" (texto nosso, a partir do site atual).
export const cadeia = [
  { titulo: 'Lavoura do cooperado', texto: 'Milho e soja produzidos pelos cooperados em Nova Mutum.', foto: 'colheita' },
  { titulo: 'Fábrica de ração', texto: 'Os grãos viram ração para a granja e as terminações.', foto: 'fabrica-silos' },
  { titulo: 'Granja UPL', texto: '4.200 matrizes; leitões até 60 dias de vida.', foto: 'maternidade' },
  { titulo: 'Terminação', texto: 'Nas propriedades dos cooperados, extensão da matriz.', foto: 'suinos-1' },
  { titulo: 'Frigorífico Excelência', texto: 'Abate na própria cidade desde 1991.', foto: 'suinos-3' },
];

export const historia = [
  { ano: 'Anos 80', texto: 'Tudo começa com 760 matrizes, na virada das décadas de 80 e 90, para agregar valor ao milho.' },
  { ano: '1990', texto: 'Em 21 de setembro, os produtores fundam a Cooperativa Agropecuária Mista de Nova Mutum para enfrentar a crise na agricultura.' },
  { ano: '1991', texto: 'Abertura do Frigorífico Excelência, para abater os suínos na própria cidade.' },
  { ano: 'Hoje', texto: '4.200 matrizes, 150 mil leitões por ano, fábrica de ração própria e energia gerada com biogás na granja.' },
];

export const parceiros = [
  { nome: 'Frigorífico Excelência', area: 'Abate e carne suína', url: 'http://www.excelenciamt.com.br/' },
  { nome: 'De Heus', area: 'Nutrição animal', url: 'https://www.deheus.com.br/' },
  { nome: 'Nutron', area: 'Nutrição animal', url: 'http://nutron.com.br/' },
  { nome: 'Tectron', area: 'Nutrição e saúde animal', url: 'https://www.tectron.com/' },
  { nome: 'Tecnomerc', area: 'Produtos veterinários', url: 'http://tecnomerc.com.br' },
  { nome: 'Datacoper', area: 'Gestão para cooperativas', url: 'http://www.datacoper.com.br/' },
  { nome: 'ABCS', area: 'Associação Brasileira dos Criadores de Suínos', url: 'http://www.abcs.org.br/' },
];

export const noticias = [
  { titulo: 'Copermutum presente no X Brasil Sul de Suinocultura', fonte: 'Simpósio Brasil Sul de Suinocultura', url: 'http://www.nucleovet.com.br/simposio-suinocultura/' },
  { titulo: 'Como 760 leitoas levantaram uma cidade no governo Collor', fonte: 'Gazeta do Povo, Expedição Suinocultura 2017', url: 'http://www.gazetadopovo.com.br/agronegocio/expedicoes/expedicao-suinocultura/2017/como-760-leitoas-levantaram-uma-cidade-no-governo-collor-22vwdx61v105kuvy2bv0eq7bd' },
  { titulo: 'Boas Práticas de Fabricação (BPF) de rações: implementação e gestão', fonte: 'CPT Cursos Presenciais', url: 'http://www.cptcursospresenciais.com.br/cursos/industrializacao-de-racoes/curso-de-boas-praticas-de-fabricacao-de-racao--bpf-implementacao-e-gestao' },
  { titulo: 'Associação Brasileira dos Criadores de Suínos', fonte: 'ABCS', url: 'http://www.abcs.org.br/' },
];

export const assembleia = {
  titulo: 'Assembleia 2021',
  texto: 'Devido às condições de saúde de 2020 e 2021, a Copermutum realizou a assembleia de forma online, pelo aplicativo Zoom. O link, o ID e a senha da assembleia digital foram enviados no WhatsApp dos cooperados na manhã da assembleia.',
  docs: [
    { nome: 'Edital da Assembleia 2021', url: 'https://www.copermutum.com.br/assembleia2021/edital.pdf' },
    { nome: 'Balanço e DRE 2020', url: 'https://www.copermutum.com.br/assembleia2021/balancodre2020.pdf' },
  ],
};
