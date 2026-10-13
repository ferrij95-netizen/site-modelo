// Textos e dados do site da Coopermil, tirados do site atual (coopermil.com) em 2026-10-13.
// Os números, nomes, unidades e datas são os do site atual; os parágrafos foram reescritos a partir dele.

export const site = {
  nome: 'Coopermil',
  razao: 'Cooperativa Mista São Luiz Ltda.',
  slogan: 'Acreditando e investindo nesta terra',
  dominio: 'https://coopermil.overtus.com.br',
  fone: '(55) 3511-9400',
  foneHref: '+555535119400',
  whats: '555535119400',
  endereco: 'Rua Júlio Leopoldo Rauber, 162, Centro',
  cidade: 'Santa Rosa, RS',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+J%C3%BAlio+Leopoldo+Rauber+162+Santa+Rosa+RS',
  instagram: 'https://www.instagram.com/coopermil.cooperativa',
  facebook: 'https://www.facebook.com/coopermil',
  linkedin: 'https://www.linkedin.com/company/coopermil',
  ouvidoria: 'https://ouvidoria.coopermil.com',
  whatsSuper: 'https://www.coopermil.com/whatsapp',
  whatsLojas: 'https://www.coopermil.com/whatsapp-lojas-agropecuarias',
  cadastroCurriculo: 'https://www.coopermil.com/trabalheconosco',
  video: 'VCU1O4ZRwrw',
  atual: 'https://www.coopermil.com/',
};

// Acessos internos do rodapé do site atual (Webmail, Intranet, Portal RH, NF-e): o site atual não mostra os endereços, ficam apontando para o site atual.
export const acessos = ['Webmail', 'Intranet', 'Portal RH', 'NF-e'];

// Números do site atual (páginas Associados, Colaboradores, Grãos, Supermercados, Postos, banner "Resultado 2025").
export const numeros = [
  ['71', 'anos de história', 'fundada em 27 de agosto de 1955'],
  ['5 mil+', 'associados', 'produtores do Noroeste gaúcho'],
  ['1.000+', 'colaboradores', 'em todas as áreas de negócio'],
  ['28', 'unidades de grãos', 'recebimento de soja, milho e trigo'],
  ['4 mi', 'de sacas', 'de capacidade de armazenagem'],
  ['18', 'supermercados', 'com a marca Super São Luiz'],
];
export const resultado2025 = [
  ['Faturamento 2025', 'R$ 1,424', 'bilhão'],
  ['Resultado líquido 2025', 'R$ 24,4', 'milhões'],
  ['Impostos pagos 2025', 'R$ 30,8', 'milhões'],
  ['Retorno total 2025', 'R$ 10,9', 'milhões'],
];

// Menu na mesma ordem do site atual.
export const cooperativa = [
  ['a-cooperativa/historico', 'Histórico'],
  ['a-cooperativa/principios-institucionais', 'Princípios institucionais'],
  ['a-cooperativa/diretoria', 'Diretoria'],
  ['a-cooperativa/colaboradores', 'Colaboradores'],
  ['a-cooperativa/associados', 'Associados'],
  ['a-cooperativa/validacao-de-pesquisas', 'Validação de Pesquisas'],
  ['a-cooperativa/educacao-social', 'Educação Social'],
  ['a-cooperativa/area-de-atuacao', 'Área de atuação'],
];
export const lgpd = [
  ['Política de Privacidade', 'https://www.coopermil.com/'],
  ['Aviso de privacidade (uso de imagem)', 'https://www.coopermil.com/'],
  ['Guia Prático', 'https://www.coopermil.com/'],
  ['Código de Conduta e Ética', 'https://www.coopermil.com/'],
  ['Vídeo do Código de Conduta e Ética', 'https://www.coopermil.com/'],
];

// Negócios: [slug, nome, título da página, resumo curto, foto de capa, foto do banner do site atual, galeria, parágrafos, destaques]
export const negocios = [
  {
    slug: 'agropecuaria', nome: 'Agropecuária', titulo: 'Lojas completas para atender você', curto: 'Insumos, ferragens, máquinas e implementos em lojas por todo o Noroeste gaúcho.',
    capa: 'agro-5', banner: 'neg-agropecuaria', galeria: ['agro-5', 'agro-6', 'agro-7', 'agro-1', 'agro-8', 'agro-2', 'agro-9', 'agro-10'],
    texto: [
      'As Lojas Agropecuárias Coopermil atendem o produtor rural em toda a região Noroeste do Rio Grande do Sul, com insumos agropecuários, ferragens, máquinas e implementos agrícolas para o trabalho de todos os dias na propriedade.',
      'Associados e clientes contam também com a transferência de tecnologia feita pela equipe técnica da cooperativa, que acompanha a lavoura de perto e orienta a escolha dos produtos.',
      'A Coopermil trabalha em parceria com marcas reconhecidas pela qualidade, para gerar mais produtividade com qualidade no campo.',
    ],
    destaques: ['Insumos agropecuários', 'Ferragens', 'Máquinas e implementos', 'Assistência técnica'],
  },
  {
    slug: 'graos', nome: 'Grãos', titulo: 'Produção transformada em resultados', curto: '28 unidades de recebimento e 4 milhões de sacas de capacidade de armazenagem.',
    capa: 'graos-1', banner: 'neg-graos', galeria: ['graos-1', 'graos-2', 'agro-4', 'agro-3'],
    texto: [
      'A agricultura é uma das principais atividades econômicas do Rio Grande do Sul. Para facilitar o trabalho do agricultor, a Coopermil mantém 28 Unidades de Recebimento de Grãos de soja, milho e trigo distribuídas por toda a região Noroeste do estado.',
      'A capacidade total de armazenagem é de 4.000.000 (quatro milhões) de sacas, o que garante ao produtor a estocagem da produção com qualidade e segurança.',
      'Os armazéns seguem padrões de controle de qualidade de armazenagem de grãos e são certificados por empresas certificadoras independentes.',
    ],
    destaques: ['Soja, milho e trigo', '28 unidades de recebimento', '4 milhões de sacas', 'Armazéns certificados'],
  },
  {
    slug: 'leite', nome: 'Leite', titulo: 'Compromisso com o produtor associado', curto: 'Captação do leite dos associados desde 1980, com assistência técnica especializada.',
    capa: 'leite-1', banner: 'neg-leite', galeria: ['leite-1', 'leite-2', 'leite-3'],
    texto: [
      'A Coopermil atua no mercado de leite desde 1980, sem interrupções, junto à indústria e ao lado do produtor de leite associado.',
      'A cooperativa recolhe o leite produzido pelos associados e oferece assistência técnica especializada, com foco na qualidade do produto desde a propriedade.',
      'A produção é integralizada na CCGL (Cooperativa Central Gaúcha Ltda.), que mantém uma indústria de leite em pó em Cruz Alta (RS).',
    ],
    destaques: ['Desde 1980', 'Captação na propriedade', 'Assistência técnica', 'Integração com a CCGL'],
  },
  {
    slug: 'maquinas', nome: 'Máquinas', titulo: 'Evolução em prol da produtividade', curto: 'Máquinas e equipamentos com orientação de uso e assistência técnica.',
    capa: 'maq-1', banner: 'neg-maquinas', galeria: ['maq-1', 'maq-2', 'maq-3'],
    texto: [
      'A Coopermil busca soluções em máquinas e equipamentos agrícolas para atender o produtor com mais qualidade e precisão no trabalho da lavoura.',
      'Representa marcas como Planticenter, Jan, DJI Drones e Ipacol, com orientação sobre a utilização dos maquinários e assistência técnica especializada.',
      'O objetivo é ajudar o produtor a obter melhores resultados em todas as atividades da propriedade rural.',
    ],
    destaques: ['Planticenter', 'Jan', 'DJI Drones', 'Ipacol'],
  },
  {
    slug: 'postos-de-combustiveis', nome: 'Postos de Combustíveis', titulo: 'Combustíveis com a qualidade Ipiranga, Petrobras, Charrua e RodOil', curto: '8 postos com abastecimento, troca de óleo e lojas de conveniência.',
    capa: 'postos-3', banner: 'neg-postos', galeria: ['postos-3', 'postos-1', 'postos-2', 'postos-4', 'postos-5', 'postos-6'],
    texto: [
      'A Coopermil conta com 8 postos de combustíveis: 1 em Santo Cristo, 2 em Santa Rosa, 2 em Tucunduva, 1 em Novo Machado e 1 em Mato Grande (Giruá).',
      'A equipe oferece atendimento qualificado no abastecimento, na troca de óleo e nas lojas de conveniência.',
      'Os postos trabalham com Ipiranga, Petrobras, Charrua e RodOil: a garantia de produtos de qualidade aliada ao bom atendimento e ao compromisso com a comunidade regional.',
    ],
    destaques: ['Abastecimento', 'Troca de óleo', 'Lojas de conveniência', '8 postos na região'],
  },
  {
    slug: 'racoes', nome: 'Rações', titulo: 'Conheça, compare e ganhe em produtividade', curto: 'Rações Bovimil, Suimil e Avemil e minerais Nutrimil, com fórmulas em parceria com a Vaccinar.',
    capa: 'racoes-1', banner: 'neg-racoes', galeria: ['racoes-1'],
    texto: [
      'A Cooperativa produz e comercializa produtos de Nutrição Animal: as Rações Coopermil das marcas Bovimil, Suimil e Avemil, e os Minerais e Núcleos da marca Nutrimil.',
      'Os produtos Produz Mais Nutrição Animal são fabricados com rigoroso controle de qualidade, desde a seleção da matéria-prima, como milho, farelo de soja e trigo, até a finalização do processo e a embalagem.',
      'A Coopermil tem parceria com a Vaccinar, que contribui com experiência, transferência de tecnologia e conhecimento técnico na elaboração das fórmulas das rações.',
    ],
    destaques: ['Bovimil (bovinos)', 'Suimil (suínos)', 'Avemil (aves)', 'Nutrimil (minerais e núcleos)'],
  },
  {
    slug: 'sementes', nome: 'Sementes', titulo: 'Tecnologia e excelência para multiplicar', curto: 'Sementes de soja e trigo de alto padrão e Centro de Tratamento Industrial de Sementes.',
    capa: 'sem-1', banner: 'neg-sementes', galeria: ['sem-1', 'sem-2', 'sem-3'],
    texto: [
      'A Coopermil produz e comercializa sementes de alto padrão, que resultam em plantas fortes e saudáveis e em maior rentabilidade para associados e clientes.',
      'São desenvolvidas pesquisas de novas sementes de soja, com as obtentoras Brasmax, Nidera, TMG-Dom Mario, Neogen, Embrapa-Fundação Pró Sementes e Basf, e de trigo, com a Biotrigo e a OR.',
      'No moderno Centro de Tratamento Industrial de Sementes, as sementes são selecionadas e tratadas com produtos específicos para o controle de pragas e doenças. Isso reduz a exposição do produtor a agroquímicos e diminui o número de embalagens no meio rural.',
    ],
    destaques: ['Soja e trigo', 'Pesquisa de cultivares', 'Tratamento industrial (CTS)', 'Menos embalagens no campo'],
  },
  {
    slug: 'supermercados', nome: 'Supermercados', titulo: 'Super São Luiz: é muito bom comprar aqui', curto: '18 supermercados Super São Luiz em toda a área de atuação.',
    capa: 'super-4', banner: 'neg-super', galeria: ['super-4', 'super-1', 'super-3', 'super-2', 'super-5'],
    texto: [
      'Como parte da diversificação dos negócios, a Coopermil mantém 18 supermercados com a marca Super São Luiz, distribuídos por toda a sua área de atuação. A rede facilita a compra para o produtor rural e atende também os clientes urbanos.',
      'Em parceria com as melhores marcas distribuidoras para o varejo, o Super São Luiz oferece carnes de procedência certificada, frutas selecionadas, padaria e outros perecíveis expostos com cuidado para preservar o sabor e a saúde dos consumidores.',
      'O Super São Luiz está presente na vida das pessoas e na rotina das famílias, levando a qualidade Coopermil a toda a comunidade.',
    ],
    destaques: ['Carnes de procedência', 'Hortifrúti selecionado', 'Padaria', '18 lojas'],
  },
];

// Linha do tempo (página Histórico do site atual, e Leite e Validação de Pesquisas para 1980 e 1992).
export const linhaTempo = [
  ['1955', 'Fundação', 'Em 27 de agosto, 47 agricultores fundam a Cooperativa Mista São Luiz em Cinquentenário, então distrito de Santa Rosa (hoje Tuparendi). A dificuldade de comercializar, principalmente na suinocultura, uniu os produtores.'],
  ['1971', 'Santa Rosa', 'Depois da primeira sede em Cinquentenário e da filial de Nova Esperança (Tucunduva), abre a filial de Santa Rosa, onde se instala a sede administrativa. O quadro de associados dobra.'],
  ['1975–1986', 'Expansão regional', 'Novas filiais e estruturas em Santo Cristo, Cruzeiro, Tuparendi, Novo Machado e Linha Timbaúva: graneleiros, lojas e supermercados.'],
  ['1980', 'Leite', 'Começa a atuação no mercado de leite, mantida sem interrupções até hoje.'],
  ['1987', 'Sede em Santa Rosa', 'A sede da cooperativa é transferida oficialmente de Cinquentenário para Santa Rosa.'],
  ['1992–1994', 'Pesquisa', 'Início da validação de pesquisas e criação da Área Experimental Coopermil. Entra em operação a unidade de produção de leitões.'],
  ['1996–2003', 'Novas regiões', 'Chegada a Giruá, incorporação de estruturas de outras cooperativas e novas unidades de recebimento de grãos.'],
  ['2004', 'Leite e educação', 'Unidade de recebimento e resfriamento de leite em Guia Lopes (Santa Rosa) e início do Programa de Educação Social.'],
  ['2008', 'Postos Coopermil', 'Começa a operar a rede de postos de combustíveis.'],
  ['2010–2013', 'Sementes e grãos', 'Novas estruturas em Giruá, unidade de beneficiamento de grãos em Cruz Alta, Centro de Tratamento de Sementes em parceria com a Syngenta e nova unidade em Doutor Maurício Cardoso.'],
  ['Hoje', 'Fábrica de rações', 'Construção da fábrica de rações na unidade de Esquina Candeia, em Santa Rosa. Em 2025, 70 anos com resultados positivos em todas as áreas.'],
];

export const principios = {
  missao: 'Desenvolver soluções para o agronegócio que unam inovação, eficiência e sustentabilidade, para que associados e cooperativa prosperem juntos.',
  visao: 'Ser referência no agronegócio pela solidez e pelas soluções.',
  valores: [
    ['Cooperativismo', 'A união dos associados é a razão de ser da Coopermil.'],
    ['Honestidade', 'Relações corretas com associados, clientes e colaboradores.'],
    ['Transparência', 'Informação clara sobre a gestão e os resultados.'],
    ['Credibilidade', '71 anos de compromissos cumpridos na região.'],
    ['Sustentabilidade', 'Crescer cuidando das pessoas, da terra e do futuro.'],
  ],
};

export const diretoria = {
  executiva: [['Presidente', 'Ernani Thober'], ['Vice-Presidente', 'Joel Antonio Capeletti'], ['Secretário', 'Arno Arnaldo Mayer'], ['Diretor Executivo', 'Jaime Stochero']],
  conselhoAdm: {
    periodo: 'Gestão 2025–2029',
    efetivos: ['Angelica W. Hohenreuther', 'Anildo Fantinel', 'Eloi Pizzoni', 'Gilson Aloisio Thomas', 'Ivan Roberto Haas', 'Jaime Paulo Beck', 'Jerson Jose Bonfanti', 'Mario Wisniewski', 'Mauricio Andre Horn', 'Nolir Loureiro', 'Paulo Cesar Froner', 'Valdir Modes', 'Werner Sipert'],
    suplentes: ['Alcir Luis Meinerz', 'Carlos Alberto Hibler', 'João Luis Zamin', 'José Henrique Witczak', 'Nelson Gross', 'Romeu Carlos Schuh', 'Rosane Schein Gromowski', 'Valmir José Bortoluzzi', 'Vilmar Antonio Ferrari', 'Vilmar Luiz Vier'],
  },
  conselhoFiscal: {
    periodo: 'Gestão 2026–2027',
    efetivos: ['Alvair Vicente Dilly', 'Delmar Kolling', 'Cesar Luis Dillmann'],
    suplentes: ['Estefano Jaskulski', 'Paulino Cesar Capeletti', 'Alfonso Alvisio Kieling'],
  },
  assessoria: [['Auditor Interno', 'José Guilherme Pretto'], ['Assessor da Diretoria', 'Iriceu Uhlmann'], ['Ouvidoria', 'Arno Arnaldo Mayer']],
  supervisores: [['Contabilidade', 'Elton Jair Minikel'], ['Financeiro', 'Cristian Felipe Streich'], ['Obras, Patrimônio e Gestão Ambiental', 'Irio Antônio Brun'], ['Vendas Agro e Máquinas', 'Marcos Antonio Loureiro'], ['Grãos', 'Tiago Angioletto'], ['Técnico', 'João Gabriel Dias'], ['Leite e Pecuária', 'Marcos André de Lima'], ['Controladoria', 'Marcos Puhl']],
};

export const beneficios = ['PPR (Programa de Participação nos Resultados)', 'Plano de Previdência Privada (Brasilprev)', 'Plano Odontológico (BBDental)', 'Cartão Alimentação', 'Cartão Coopermil', 'Bolsas de estudo de graduação e pós-graduação', 'Programas de desenvolvimento profissional'];

export const pesquisa = {
  inovacoes: [
    ['Plantio direto', 'Consolidação do plantio direto em pequenas propriedades.'],
    ['Milho', 'Mudança no zoneamento oficial da época de plantio, com estabilidade e aumento de rendimento: bons produtores colhem acima de 11.500 kg/ha.'],
    ['Trigo', 'Inseticidas alternativos no tratamento de sementes contra corós, com redução de mais de 30% no custo.'],
    ['Milho', 'Inseticidas líquidos no sulco de plantio contra larvas de cascudinho verde (Diabrotica sp.).'],
    ['Soja', 'Adubo foliar à base de molibdênio, após mais de 8 anos de pesquisa: ganhos de 300 a 480 kg/ha.'],
    ['Trigo', 'Novo posicionamento de fungicidas contra manchas foliares: ganhos de 360 a 600 kg/ha no trigo sobre trigo.'],
    ['Milho', 'Manejo de fungicidas pioneiro no Estado: ganhos acima de 4 mil kg/ha em híbridos suscetíveis.'],
    ['Trigo', 'Manejo de nitrogênio com redutor de crescimento: ganhos acima de 600 kg/ha e melhor qualidade industrial.'],
    ['Milho', 'Seleção de híbridos tolerantes a viroses e enfezamentos transmitidos pela cigarrinha.'],
    ['Trigo', 'Uso de pré-emergentes para controle do azevém.'],
    ['Herbicidas', 'Definição de produtos substitutos do Paraquat após a proibição de uso.'],
    ['Soja', 'Consolidação da aplicação "0" de fungicidas no vegetativo.'],
    ['Solo', 'Aumento de 25% nas recomendações de calcário, para novos patamares de produtividade.'],
  ],
  parceiros: ['Agroeste', 'Agroceres', 'Basf', 'Bioagro', 'Biotrigo', 'CCGL TEC', 'DB', 'Dekalb', 'Ipacol', 'Mosaic', 'Nogueira', 'Corteva', 'Syngenta', 'Vaccinar', 'Yara', 'São José Implementos', 'Foorseed', 'Brevant', 'Bayer', 'NK Sementes', 'Nidera', 'Planti Center', 'Agrimaster', 'ADS Drones', 'Inducal', 'Fertimacro', 'Argos', 'Jan', 'Piratini', 'Cibra', 'Unifertil', 'Ferticel', 'Ourofértil', 'Multifértil', 'Ihara', 'Fort Green', 'OR Sementes', 'Simbiose', 'Nortox', 'FMC', 'Weizur', 'Globo Vac'],
};

export const temasEducacao = ['Qualidade de Vida', 'Cooperativismo e Gestão', 'Alimentação e Culinária', 'Saúde e bem-estar', 'Educação Financeira', 'Autoestima', 'Assuntos técnicos', 'Relacionamento e família'];

// Área de atuação: [cidade, [[unidade, endereço, telefone, tipos]]]. Tipos: a = agropecuária, s = Super São Luiz, g = grãos, p = posto, o = outros.
export const unidades = [
  ['Santa Rosa', [
    ['Sede Administrativa', 'Rua Júlio Leopoldo Rauber, 162, Centro', '(55) 3511-9400', 'o'],
    ['Agropecuária Coopermil', 'Rua Júlio Leopoldo Rauber, 127, Centro', '(55) 3511-9400', 'a'],
    ['Agropecuária Coopermil Cruzeiro', 'Rua São Jorge, 110, Cruzeiro', '(55) 3511-7680 · (55) 9 9603-7569', 'a'],
    ['Super São Luiz', 'Rua Júlio Leopoldo Rauber, 172, Centro', '(55) 3511-9420', 's'],
    ['Super São Luiz', 'Rua Dr. João Dahne, 488, Centro', '(55) 9 9915-7998', 's'],
    ['Super São Luiz', 'Rua Augusto Krebs, 96, Bairro Central', '(55) 9 9647-8583', 's'],
    ['Postos Coopermil', 'Av. Expedicionário Weber, 2820, Bairro Central', '(55) 9 9661-9142', 'p'],
    ['Postos Coopermil', 'Av. Inhacorá, 673, Centro', '(55) 9 9686-7883', 'p'],
    ['Postos Coopermil', 'Rua João Pedro Timm, 55, Bairro Sulina', '(55) 9 9614-9335', 'p'],
    ['Postos Coopermil', 'Rodovia RS 344, nº 3565', '(55) 9 9900-0981', 'p'],
    ['Recebimento de Grãos e Centro de Tratamento de Sementes', 'Rua São Jorge, 110, Bairro Cruzeiro', '(55) 9 9603-7569', 'g'],
    ['Centro de Distribuição de Insumos Agropecuários', 'Rua São Jorge, 110, Bairro Cruzeiro', '(55) 9 9603-7569', 'o'],
    ['Centro de Distribuição de Supermercados', 'Rodovia RS 344, 3463, Distrito Industrial', '(55) 3511-9400', 'o'],
    ['Esquina Candeia: Agropecuária, Super São Luiz e Grãos', 'Esquina Candeia', '(55) 9 9613-9043 · (55) 3511-9425', 'asg'],
    ['Esquina Candeia: Fábrica de Rações', 'Esquina Candeia', '(55) 9 9978-9288', 'o'],
    ['Lajeado Ipê: Agropecuária e Grãos', 'RS 344, Km 35', '(55) 9 9614-9245', 'ag'],
    ['Linha Boa Vista: Agropecuária e Grãos', 'Linha Boa Vista, s/nº', '(55) 9 9950-4290', 'ag'],
    ['Centro Tecnológico Produz Mais Coopermil', 'Lajeado Ipê', '(55) 3511-9400', 'o'],
  ]],
  ['Santo Cristo', [
    ['Agropecuária e Super São Luiz', 'Rua Bahia, 264, Centro', '(55) 3541-1150', 'as'],
    ['Recebimento de Grãos', 'Rua Dr. Ronchi, s/nº', '(55) 3541-1000', 'g'],
    ['Postos Coopermil', 'Av. Dom Pedro II, 1805, Centro', '(55) 9 9643-3889', 'p'],
  ]],
  ['Tuparendi', [
    ['Agropecuária e Recebimento de Grãos', 'Estrada RS 344', '(55) 9 9614-9331 · (55) 9 9613-9041', 'ag'],
    ['Super São Luiz', 'Av. Mauá, 1876, Centro', '(55) 3543-1434 · (55) 9 9647-6294', 's'],
    ['Cinquentenário: Agropecuária e Grãos', 'Estrada RS 344', '(55) 9 9614-5626', 'ag'],
    ['Cinquentenário: Super São Luiz', 'Rua Eligio Cavedon, 553', '(55) 9 9930-2922', 's'],
    ['Santa Lúcia: Agropecuária, Super São Luiz e Grãos', 'Santa Lúcia', '(55) 9 9953-3597', 'asg'],
    ['Campininha: Agropecuária e Grãos', 'RS 305, km 4, s/nº', '(55) 9 9950-4229', 'ag'],
  ]],
  ['Novo Machado', [
    ['Agropecuária', 'Av. Pratos, s/nº, Centro', '(55) 3544-1080', 'a'],
    ['Super São Luiz', 'Rua Independência, 580, Centro', '(55) 9 9655-0526', 's'],
    ['Postos Coopermil', 'Av. Pratos, 399, Centro', '(55) 9 9658-9575', 'p'],
    ['Recebimento de Grãos', 'RS 305, s/nº', '(55) 9 9713-9943', 'g'],
    ['Vila Pratos: Agropecuária, Super São Luiz e Grãos', 'Av. Mauá, 872', '(55) 9 9699-4367', 'asg'],
  ]],
  ['Cândido Godói', [
    ['Linha Timbaúva: Agropecuária, Super São Luiz e Grãos', 'Rod. RS 307, Km 20', '(55) 9 9965-1950', 'asg'],
    ['Linha Acre: Agropecuária e Grãos', 'Linha Acre, s/nº', '(55) 9 9622-8890', 'ag'],
  ]],
  ['Giruá', [
    ['Agropecuária e Recebimento de Grãos', 'Rua Sete de Setembro, 600, Bairro Santo Antônio', '(55) 9 9613-6684', 'ag'],
    ['Recebimento de Grãos', 'RS 344, Trevo Giruá', '(55) 9 9613-6684', 'g'],
    ['Super São Luiz', 'Rua Bento Gonçalves, 1060, Centro', '(55) 3361-3461', 's'],
    ['Mato Grande: Agropecuária e Grãos', 'Vila Mato Grande', '(55) 9 9613-3199', 'ag'],
    ['Mato Grande: Postos Coopermil', 'Av. Giruá, 297, Vila Mato Grande', '(55) 9 9625-0893', 'p'],
    ['Santo Antônio: Agropecuária e Grãos', 'RS 344, km 76', '(55) 9 9969-7710', 'ag'],
  ]],
  ['Três de Maio', [
    ['Consolata: Agropecuária e Grãos', 'Av. Consolata, 1333, Distrito Consolata', '(55) 9 9607-1807', 'ag'],
  ]],
  ['Doutor Maurício Cardoso', [
    ['Agropecuária e Recebimento de Grãos', 'Rua 15 de Novembro, 1042, Centro', '(55) 3534-1525 · (55) 9 9622-8897', 'ag'],
    ['Super São Luiz', 'Rua do Comércio, 1450, Centro', '(55) 3534-1548 · (55) 9 9944-2101', 's'],
    ['Pranchada: Recebimento de Grãos', 'Rua Carlos Lacerda, 741, Pranchada', '(55) 9 8472-0595', 'g'],
  ]],
  ['Cerro Largo', [
    ['Agropecuária e Recebimento de Grãos', 'Rua São Francisco, 1200, Bairro Esplanada', '(55) 3359-2610 · (55) 9 9936-1223', 'ag'],
  ]],
  ['São Pedro do Butiá', [
    ['Agropecuária e Recebimento de Grãos', 'BR 392, Km 677', '(55) 9 9614-9249', 'ag'],
  ]],
  ['Santo Ângelo', [
    ['Agropecuária e Recebimento de Grãos', 'Rua Farrapos, 699, Bairro Indubrás', '(55) 9 9614-9338', 'ag'],
  ]],
  ['Guarani das Missões', [
    ['Agropecuária e Recebimento de Grãos', 'BR 392, Km 641, s/nº', '(55) 9 9958-4322', 'ag'],
    ['Super São Luiz', 'Rua Boa Vista, 201', '(55) 9 9727-0630', 's'],
    ['Linha Timbó: Agropecuária, Super São Luiz e Grãos', 'Linha Timbó, s/nº', '(55) 9 9727-0651', 'asg'],
    ['PCH Coopermil', 'Vila Três Irmãos, s/nº', '(55) 3511-9400', 'o'],
  ]],
  ['Campina das Missões', [
    ['Linha 8 de Maio: Agropecuária e Grãos', 'Linha 8 de Maio, s/nº', '(55) 9 9921-1106', 'ag'],
    ['Linha Teresa: Agropecuária, Grãos e Super São Luiz', 'Linha Teresa, s/nº', '(55) 9 9727-0641', 'asg'],
  ]],
  ['Tucunduva', [
    ['Agropecuária', 'Av. Dr. Osvaldo Teixeira, 1290, Centro', '(55) 9 9633-1159', 'a'],
    ['Super São Luiz', 'Rua São Nicolau, 66, Centro', '(55) 9 9727-0634', 's'],
    ['Postos Coopermil', 'Rua Duque de Caxias, 69, Centro', '(55) 9 9660-1215', 'p'],
    ['Postos Coopermil', 'Av. Oswaldo Teixeira, 609, Centro', '(55) 9 9691-5879', 'p'],
    ['Recebimento de Grãos', 'Rua Professor Antônio Barella, 2100', '(55) 9 9640-1898', 'g'],
    ['Esquina Tucunduva: Agropecuária e Grãos', 'Rod. VRS 837', '(55) 9 9905-8086', 'ag'],
    ['Esquina Tucunduva: Super São Luiz', 'Rua Eduardo Busanello, 194', '(55) 9 9992-7401', 's'],
  ]],
  ['Sete de Setembro', [
    ['Agropecuária e Recebimento de Grãos', 'Linha Rincão dos Donatos, s/nº', '(55) 9 9958-3179', 'ag'],
  ]],
  ['Ubiretama', [
    ['Agropecuária', 'Rua Santo Ângelo, 70', '(55) 9 8472-0595', 'a'],
    ['Super São Luiz', 'Rua Santo Ângelo, 70', '(55) 9 9955-1936', 's'],
    ['Recebimento de Grãos', 'Linha Paranaguá, 1807', '(55) 9 8472-0595', 'g'],
  ]],
];

export const noticias = [
  {
    slug: 'encontro-novos-associados', data: '08/10/2026', foto: 'noticia-1', fotos: ['noticia-1', 'noticia-1b', 'noticia-1c'],
    titulo: 'Coopermil promove mais um encontro de integração com novos associados',
    resumo: 'O projeto Somos Coopermil reuniu 53 novos cooperados no auditório da sede, em Santa Rosa.',
    texto: [
      'A Coopermil realizou, no dia 7 de outubro, mais uma edição do projeto Somos Coopermil, voltado à integração de novos associados. O encontro aconteceu no auditório da sede administrativa, em Santa Rosa, e reuniu 53 novos cooperados das unidades de Cinquentenário, Santa Lúcia, Campininha e Tuparendi.',
      'A programação tratou dos princípios e valores do cooperativismo, da trajetória da Coopermil, da sua estrutura administrativa e dos segmentos de atuação. Também foram apresentados os diferenciais da cooperativa, como o modelo de atendimento, os serviços oferecidos e as soluções para o desenvolvimento das propriedades rurais.',
      'Os supervisores de negócios apresentaram as principais oportunidades disponíveis ao quadro social, com ênfase no atendimento próximo, no suporte técnico e em soluções que contribuem para a rentabilidade das famílias cooperadas.',
      'Para o secretário da Coopermil, Arno Arnaldo Mayer, o encontro aproxima os novos associados da essência do cooperativismo, para que conheçam seus direitos e deveres, e reforça o trabalho diário da cooperativa para gerar resultados e contribuir com a rentabilidade das propriedades rurais.',
      'O projeto terá continuidade ao longo de 2027, com novos grupos.',
    ],
  },
  {
    slug: 'curso-liderancas-conselheiros', data: '06/10/2026', foto: 'noticia-2', fotos: ['noticia-2', 'noticia-2b', 'noticia-2c'],
    titulo: 'Coopermil encerra Curso de Desenvolvimento de Lideranças para Conselheiros de Administração e Fiscal',
    resumo: 'A última etapa, feita com a Escoop, tratou do posicionamento do conselheiro.',
    texto: [
      'A Coopermil realizou, na terça-feira, 6 de outubro, a última etapa do Curso de Desenvolvimento de Lideranças para Conselhos, voltado aos integrantes dos Conselhos de Administração e Fiscal da cooperativa.',
      'O curso foi feito em parceria com a Escoop (Faculdade de Tecnologia do Cooperativismo), por convênio com o Sescoop/RS e o Sistema Ocergs. O módulo de encerramento, "Posicionamento do Conselheiro", foi conduzido pela professora Sheila Sampaio, mestre em Gestão e Negócios e especialista em Comércio Internacional.',
      'Foram debatidos a postura institucional, a comunicação pessoal, a coerência entre discurso e prática e a forma como o conselheiro se posiciona com os associados e nas decisões da cooperativa.',
      'Desenvolvido ao longo de 2026, o curso buscou qualificar a atuação dos conselheiros com ferramentas para uma gestão mais eficiente, transparente e alinhada aos princípios do cooperativismo. O diretor-presidente, Ernani Thober, destacou que a capacitação faz parte do compromisso contínuo da Coopermil com o desenvolvimento de suas lideranças.',
    ],
  },
];

// Rádio: programa Mensageiro Rural (áudios do site atual).
export const radio = [
  ['13/10/2026', 'https://www.coopermil.com/files/audios/4f2a1bb6-8c4a-4c9e-9746-a1faeff35cab.mp3'],
  ['12/10/2026', 'https://www.coopermil.com/files/audios/3064d0f2-4454-4161-8179-ec0620a8445d.mp3'],
  ['09/10/2026', 'https://www.coopermil.com/files/audios/a568d5f9-4b15-4b6b-ab45-9ccd86505a9c.mp3'],
  ['08/10/2026', 'https://www.coopermil.com/files/audios/bc05867a-d1d2-4edd-b325-a03b04973e01.mp3'],
  ['07/10/2026', 'https://www.coopermil.com/files/audios/bda7f526-aeb7-4b04-8709-e73af6c30970.mp3'],
  ['06/10/2026', 'https://www.coopermil.com/files/audios/d5b8bf24-05aa-4462-a3b8-f77dffb3accd.mp3'],
  ['05/10/2026', 'https://www.coopermil.com/files/audios/37a05267-1415-4d57-9299-40f7dca1de70.mp3'],
  ['02/10/2026', 'https://www.coopermil.com/files/audios/9c23f65a-e867-4615-bf3d-28c412239564.mp3'],
];

export const revistas = [
  ['Relatório Gestão 2025', '1º semestre de 2026', 'https://heyzine.com/flip-book/f18b756a2e.html', 'rev-2025'],
  ['Relatório Gestão 2021–2024', '1º semestre de 2025', 'https://heyzine.com/flip-book/f8cb4d8cbe.html', 'rev-2021-2024'],
  ['Negócios produtivos em todas as áreas', '2º semestre de 2024', 'https://heyzine.com/flip-book/63de25c8e1.html', 'rev-2024-2'],
  ['Força da cooperação: Resultado social de 2023', '1º semestre de 2024', 'https://heyzine.com/flip-book/a553af1efc.html', 'rev-2023'],
];

// Cotações do site atual (09/10/2026), nos dois horários de faturamento.
export const cotacoes = {
  data: '09/10/2026',
  linhas: [['Soja', 'R$ 137,00', 'R$ 136,00'], ['Milho', 'R$ 62,00', 'R$ 62,00'], ['Trigo', 'R$ 73,00', 'R$ 73,00']],
  horarios: ['Manhã · 9h15 às 12h', 'Tarde · 13h40 às 15h'],
};

export const catalogos = [
  ['Landini', 'cat-landini', 'https://www.landini.it/'],
  ['Planti Center', 'cat-planticenter', 'https://www.planticenter.com.br/'],
  ['Nogueira', 'cat-nogueira', 'https://www.nogueira.com.br/'],
  ['Jan', 'cat-jan', 'https://www.jan.com.br/'],
  ['São José', 'cat-saojose', 'https://www.saojoseindustrial.com.br/'],
  ['Ipacol', 'cat-ipacol', 'https://www.ipacol.com.br/'],
  ['Argos', 'cat-argos', 'https://www.hiab.com/'],
  ['Máquinas usadas', 'maquinas-usadas', 'https://www.coopermil.com/maquinas-usadas'],
];

// Vagas abertas no site atual em 13/10/2026 (as com prazo vencido ficaram de fora).
export const vagas = [
  ['Confeiteira', 'Supermercado Santa Rosa', 'Disponibilidade para fins de semana e feriados.', '15/10/2026'],
  ['Frentista', 'Postos Coopermil, Santa Rosa', 'Carteira de motorista e disponibilidade de horário. Ensino médio é um diferencial.', '16/10/2026'],
  ['Operador de Caixa, Repositor, Empacotador e Auxiliar de Limpeza', 'Super São Luiz, Tuparendi', 'Foco, agilidade e disponibilidade de horário.', '15/10/2026'],
  ['Auxiliar de Açougue e Auxiliar de Padaria', 'Super São Luiz, Tuparendi', 'Foco, agilidade e disponibilidade de horário.', '15/10/2026'],
  ['Pessoas com Deficiência (PCD)', 'Diversas funções', 'Currículo no RH da sede, em Santa Rosa, ou pelo cadastro on-line. Anexe o laudo, se tiver.', 'Sempre aberta'],
];

export const safra = ['Assistência Técnica', 'Qualidade na armazenagem', 'Segurança na comercialização', 'Retorno para associados'];
