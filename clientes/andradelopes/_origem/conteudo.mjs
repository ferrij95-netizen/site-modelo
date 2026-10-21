// Textos do site atual (andradelopes.com.br, copiados em 21/10/2026). Só os títulos de seção e as frases curtas
// marcadas "nosso" foram escritos para o site novo; o resto é do cliente, com a grafia corrigida (JURICIAIS, infra-estrutura).
export const empresa = {
  nome: 'Andrade Lopes',
  completo: 'Andrade Lopes Engenharia e Consultoria',
  razao: 'Andrade Lopes Engenharia e Consultoria Ltda-ME',
  url: 'https://andradelopes.overtus.com.br/',
  antigo: 'http://andradelopes.com.br/',
  endereco: ['Rua Jerônimo Coelho, 85, conjunto 903', 'Centro, Porto Alegre, RS', 'CEP 90010-241'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Jer%C3%B4nimo+Coelho%2C+85%2C+Centro%2C+Porto+Alegre+RS',
  fones: [{ t: '(51) 3029-4535', h: '+555130294535' }, { t: '(51) 3029-4565', h: '+555130294565' }],
  email: 'contato@andradelopes.com.br',
  horario: 'Segunda a sexta, das 9h às 12h e das 13h30 às 19h',
  webmail: 'http://webmail.andradelopes.com.br/src/login.php',
};

export const textos = {
  sobre: 'A Andrade Lopes é uma empresa de engenharia consultiva em âmbito nacional, que atua nos segmentos de avaliações de ativos patrimoniais, controle patrimonial, estudos de viabilidade econômico-financeira, orçamentação e fiscalização de obras e assessoria técnica em processos judiciais, em conjunto com as esferas públicas e privadas.',
  valores: 'Visando a qualidade dos trabalhos e a excelência nas atividades realizadas, a Andrade Lopes prioriza os seguintes valores: eficiência, qualidade técnica, dinamismo e agilidade, que aliados resultam em competência e satisfação para os clientes.',
  solucoes: 'Buscando atingir os melhores resultados, a Andrade Lopes oferece soluções individuais e específicas, de forma a atender os clientes de acordo com as suas necessidades, em prazos de execução e custos reduzidos.',
  equipe: 'O corpo técnico da Andrade Lopes é composto por profissionais habilitados e qualificados, com vasta experiência em engenharia consultiva, capacitados a desenvolver a melhor solução para suas necessidades.',
};

export const valores = ['Eficiência', 'Qualidade técnica', 'Dinamismo', 'Agilidade'];

// Os segmentos da frase de apresentação, usados como lista na abertura.
export const segmentos = [
  'Avaliações de ativos patrimoniais',
  'Controle patrimonial',
  'Estudos de viabilidade econômico-financeira',
  'Orçamentação e fiscalização de obras',
  'Assessoria técnica em processos judiciais',
];

export const servicos = [
  {
    slug: 'avaliacoes', foto: 'plantas', curto: 'Engenharia econômica e de avaliações',
    titulo: 'Serviços de engenharia econômica e de avaliações',
    resumo: 'Quanto vale um imóvel, uma máquina, uma empresa ou um empreendimento, com laudo técnico e método declarado.', // nosso
    grupos: [
      { nome: 'Avaliações patrimoniais', itens: ['Avaliação de imóveis urbanos e rurais: determinação do valor de venda e/ou locação e arrendamento', 'Avaliação de máquinas, veículos, equipamentos e ferramentas', 'Avaliação de ativos fixos e controle patrimonial', 'Avaliação de empresas, processos, indústrias e agroindústrias', 'Controle e gestão patrimonial'] },
      { nome: 'Avaliações econômicas', itens: ['Avaliação de empresas, negócios, concessões, marcas e patentes', 'Viabilidade econômico-financeira de empreendimentos imobiliários', 'Estudos de viabilidade sob a ótica econômica, financeira e ambiental'] },
    ],
  },
  {
    slug: 'tecnicos', foto: 'engenheiros-obra', curto: 'Serviços técnicos de engenharia',
    titulo: 'Serviços técnicos de engenharia',
    resumo: 'Orçamento, acompanhamento e gerenciamento de obras, laudos estruturais, projetos viários e topografia.', // nosso
    grupos: [
      { nome: 'Obras e projetos', itens: ['Orçamento de obras e serviços', 'Acompanhamento e gerenciamento de obras comerciais, residenciais e industriais', 'Pavimentação e drenagem', 'Redes de água e saneamento', 'Execução de laudos técnicos estruturais e de marquises', 'Projetos de pavimentação, sinalização e drenagem', 'Topografia e georreferenciamento'] },
    ],
  },
  {
    slug: 'assessoria', foto: 'capacete-plantas', curto: 'Assessoria em processos administrativos e judiciais',
    titulo: 'Assessoria técnica em processos administrativos e judiciais',
    resumo: 'Laudos para partilhas, inventários, fusões e cisões, quotas de empresas e perícias de patologias construtivas.', // nosso
    grupos: [
      { nome: 'Perícias e laudos', itens: ['Avaliação de bens para partilha, inventário e sucessões', 'Avaliação de bens para fusões, aquisições ou cisões de empresas', 'Avaliação de quotas de participação em empresas ou negócios', 'Execução de laudos técnicos sobre patologias construtivas', 'Execução de laudos técnicos sobre compartilhamento de infraestrutura', 'Execução de laudos técnicos sobre segurança do trabalho'] },
    ],
  },
];

// Etapas tiradas das descrições do portfólio ("vistoria, análise, pesquisa cartorial e tratamento de dados direto de mercado").
export const etapas = [
  { n: 'Vistoria', t: 'Visita técnica ao bem, com documentário fotográfico e descrição detalhada.' },
  { n: 'Pesquisa cartorial', t: 'Matrículas, áreas averbadas e não averbadas, situação documental do imóvel.' },
  { n: 'Dados de mercado', t: 'Coleta e tratamento de dados direto de mercado e inferência estatística.' },
  { n: 'Método', t: 'Comparativo direto, evolutivo, involutivo ou quantificação de custo, conforme o caso.' },
  { n: 'Laudo técnico', t: 'Valor determinado, fundamentação e conclusão assinadas pelo responsável técnico.' },
];

export const metodos = ['Método comparativo direto de dados de mercado', 'Método da quantificação do custo', 'Método evolutivo', 'Método involutivo', 'Inferência estatística'];

// Portfólio: os 12 trabalhos do site atual, na mesma ordem. "finalidade" e "numeros" resumem o próprio texto.
export const portfolio = [
  {
    slug: 'desapropriacao-gravatai', cliente: 'Secretaria de Habitação, Saneamento e Desenvolvimento Urbano', sigla: 'SEHADUR', logo: 'sehadur', foto: 'porto-alegre',
    titulo: 'Desapropriação de área no Passo do Hilário', local: 'Gravataí, RS', finalidade: 'Desapropriação', area: 'Avaliação de imóveis',
    numeros: [['5,04 ha', 'de área de terras']],
    texto: ['Laudo técnico de avaliação, vistoria e análise para determinação de valor de mercado de área de terras com superfície de 5,04 hectares, localizada no Passo do Hilário, em Gravataí/RS, objetivando a sua desapropriação e utilização para o reassentamento das famílias que residem na faixa de domínio da Rodovia RS-118.'],
  },
  {
    slug: 'aeroporto-salgado-filho', cliente: 'Secretaria de Habitação, Saneamento e Desenvolvimento Urbano', sigla: 'SEHADUR', logo: 'sehadur', foto: 'gruas',
    titulo: 'Ampliação do Aeroporto Internacional Salgado Filho', local: 'Porto Alegre, RS', finalidade: 'Desapropriação', area: 'Avaliação de imóveis',
    numeros: [['10', 'imóveis avaliados'], ['36,36 ha', 'de área total']],
    texto: ['Elaboração de laudo técnico de avaliação, compreendendo vistoria, análise e pesquisa cartorial, para determinação de valor de mercado de terrenos e benfeitorias, totalizando 10 imóveis, com área total de 36,36 hectares, localizados no município de Porto Alegre/RS, decretados de utilidade pública para fins de desapropriação, visando a ampliação e modernização do Aeroporto Internacional Salgado Filho.'],
  },
  {
    slug: 'fase-predios-historicos', cliente: 'Secretaria da Justiça e do Desenvolvimento Social, Fundação de Atendimento Sócio-Educativo do Rio Grande do Sul', sigla: 'FASE', logo: 'fase', foto: 'centro-administrativo',
    titulo: 'Prédios históricos do período imperial', local: 'Rio Grande do Sul', finalidade: 'Compra e venda', area: 'Avaliação de imóveis',
    numeros: [['735.588 m²', 'de área superficial'], ['26.806,64 m²', 'de área construída']],
    texto: ['Elaboração de laudo técnico de avaliação para determinar o valor de mercado para a compra e venda de imóvel, com área superficial de 735.588 m², com 26.806,64 m² de área construída. Para o desenvolvimento deste trabalho foram utilizados, entre outras metodologias, o Método Comparativo de Dados de Mercado, o Método da Quantificação do Custo e o Método Evolutivo.', 'A particularidade deste trabalho está na avaliação dos prédios históricos do período imperial do Brasil, tratando-se não somente do valor de mercado do imóvel, mas também do valor histórico desses prédios, valorizando a sua arquitetura e impressionante robustez.'],
  },
  {
    slug: 'fator-capital-social', cliente: 'Fator Engenharia Ltda.', sigla: 'Fator Engenharia', logo: 'fator', foto: 'edificio-vidro',
    titulo: 'Imóveis para aumento de capital social', local: 'Porto Alegre e Canoas, RS; Blumenau, SC', finalidade: 'Capital social', area: 'Avaliação de imóveis',
    numeros: [['4', 'imóveis avaliados'], ['1.989,80 m²', 'no centro de distribuição']],
    texto: ['Elaboração de laudo técnico de avaliação do valor de mercado dos imóveis pertencentes à empresa, para fins de aumento do capital social. A Lei 8.666/93 determina que, para fins de contratação com as esferas federal, estadual e municipal, a empresa tenha 10% de capital social do preço orçado para participação em licitações. A Andrade Lopes Engenharia foi contratada para avaliar os imóveis desta empresa com o fim de incrementar o capital social para a participação em grandes concorrências.'],
    lista: ['Apartamento com área construída de 361,48 m², na Avenida Sertório, 4005, em Porto Alegre/RS', 'Imóvel residencial multifamiliar com área total de 139,46 m² e box, na Rua Portugal, 423, em Porto Alegre/RS', 'Centro de Distribuição e Logística (CDL) com área total de 1.989,80 m², no Loteamento Jorge Lanner, Bairro Niterói, em Canoas/RS', 'Fazenda com área superficial de 100.000,00 m², na Estrada Braço Sul, em Blumenau/SC'],
  },
  {
    slug: 'gaspar-enchentes', cliente: 'Prefeitura Municipal de Gaspar', sigla: 'Prefeitura de Gaspar', logo: 'gaspar', foto: 'obra-vistoria',
    titulo: 'Laudos após as enchentes de 2008', local: 'Gaspar, SC', finalidade: 'Estabilidade estrutural', area: 'Laudos técnicos',
    numeros: [['882', 'laudos de estabilidade estrutural']],
    texto: ['Elaboração de laudos técnicos dos imóveis atingidos pelas enchentes e deslizamentos ocorridos na catástrofe de novembro de 2008, compreendendo os seguintes serviços:'],
    lista: ['Vistoria detalhada individual acompanhada de documentário fotográfico', 'Análise e descrição técnica dos imóveis', 'Descrição dos danos físicos', 'Levantamento de possíveis deslizamentos de encostas e taludes', 'Análise, vistoria e avaliação de estabilidade estrutural em estruturas de concreto armado e em alvenaria da moradia e entorno', 'Análise de estrutura de telhados e coberturas'],
    fim: 'Para todos os laudos foi apresentada a sugestão técnica de recuperação, definindo caso a caso a liberação ou a interdição definitiva do imóvel. Foram emitidos 882 laudos de avaliação de estabilidade estrutural no município de Gaspar/SC.',
  },
  {
    slug: 'gibarroz-complexo-industrial', cliente: 'Gibarroz Ltda., beneficiamento de arroz', sigla: 'Gibarroz', logo: 'gibarroz', foto: 'usina',
    titulo: 'Complexo industrial de beneficiamento de arroz', local: 'Alegrete, RS', finalidade: 'Garantia de operações financeiras', area: 'Avaliação industrial',
    numeros: [['4.062,32 m²', 'de área construída'], ['45.000 m²', 'de terreno']],
    texto: ['Elaboração de laudo técnico de avaliação de complexo industrial voltado ao beneficiamento do grão de arroz, em Alegrete/RS, envolvendo terreno, edificações, benfeitorias e equipamentos de propriedade da Gibarroz Ltda. Trata-se de uma avaliação atípica, com a finalidade de garantia de operações financeiras, na qual foram avaliados todos os imóveis averbados e não averbados, bem como suas máquinas e equipamentos.', 'Foi aplicado o Método Evolutivo (Comparativo Direto de Dados de Mercado com o Método da Quantificação do Custo) para as construções e inferência estatística para o terreno. A área total construída deste imóvel é de 4.062,32 m² e a de terreno, de 45.000,00 m².'],
  },
  {
    slug: 'uergs-marquises', cliente: 'Universidade Estadual do Rio Grande do Sul', sigla: 'UERGS', logo: 'uergs', foto: 'armadura',
    titulo: 'Estabilidade estrutural de marquises', local: 'Av. Farrapos, 151, Porto Alegre, RS', finalidade: 'Estabilidade estrutural', area: 'Laudos técnicos',
    numeros: [['58,82 m²', 'de marquises'], ['NBR 6118', 'na análise estrutural']],
    texto: ['Laudo técnico de avaliação de estabilidade estrutural para as marquises, perfazendo 58,82 m², localizadas na Avenida Farrapos, 151, em Porto Alegre/RS. Para a execução dos serviços foram feitos os seguintes levantamentos:'],
    lista: ['Localização e descrição: a marquise foi localizada em relação à edificação e aos logradouros por meio de planta de situação', 'Levantamento geométrico: feito in situ e registrado em desenhos em planta e cortes específicos', 'Sistema de drenagem: verificado quanto ao dimensionamento hidráulico e às obstruções por sobreposições nas impermeabilizações junto aos ralos', 'Fissuração e deformação mecânica: resistência característica provável à compressão do concreto determinada por ensaios não destrutivos', 'Armaduras: bitola e posição do aço medidas com equipamentos e registradas em desenhos, verificando perdas de seção resistente, como subsídio para o projeto de recuperação estrutural', 'Estabilidade: análise segundo os preceitos da NBR 6118 (2007), englobando condições ambientais, carregamentos, esquema estrutural, geometria, armaduras, seções resistentes, deformações e, conforme o caso, análise dinâmica'],
  },
  {
    slug: 'aeroporto-caxias-do-sul', cliente: 'Secretaria dos Transportes do Estado do Rio Grande do Sul, Departamento Aeroportuário', sigla: 'DAP-RS', logo: '', foto: 'linhas-transmissao',
    titulo: 'Equipamentos de proteção ao voo', local: 'Aeroporto Regional de Caxias do Sul, RS', finalidade: 'Manutenção e testes', area: 'Serviços técnicos',
    numeros: [['5', 'sistemas ajustados e testados']],
    texto: ['Elaboração de levantamento, avaliação e manutenção de equipamentos, testes e ajustes dos equipamentos de proteção ao voo no Aeroporto Regional de Caxias do Sul/RS. Sistemas ajustados e testados:'],
    lista: ['Balizamento noturno de pista de pouso e decolagem', 'Rádio-farol não direcional (NDB)', 'Estação meteorológica de superfície', 'Sistema AVASIS', 'VOR-DME (DVOR)'],
  },
  {
    slug: 'angeloni-florianopolis', cliente: 'Angeloni & Cia. Ltda.', sigla: 'Angeloni', logo: 'angeloni', foto: 'estrutura-metalica',
    titulo: 'Complexo comercial em área de Marinha', local: 'Av. Max Schramm, 3450, Florianópolis, SC', finalidade: 'Avaliação patrimonial', area: 'Avaliação de imóveis',
    numeros: [['14.549 m²', 'de terreno'], ['21.750,60 m²', 'de área construída']],
    texto: ['Elaboração de laudo de avaliação de complexo comercial, tratando-se de edificação de uso comercial envolvendo terreno e benfeitorias de propriedade de Supermercados A. Angeloni & Cia. Ltda. A metodologia empregada neste serviço foi a dos métodos evolutivo, involutivo, comparativo direto de dados de mercado, quantificação de custo e inferência estatística para o terreno.', 'O imóvel avaliado tem 14.549,00 m² de área de terreno e 21.750,60 m² de área construída, e está localizado na Av. Max Schramm, 3450, em Florianópolis/SC. A particularidade deste imóvel está na sua localização, em área de Marinha.'],
  },
  {
    slug: 'olvebra-eldorado-do-sul', cliente: 'Olvebra Industrial S.A.', sigla: 'Olvebra', logo: 'olvebra', foto: 'vigas-aco',
    titulo: 'Levantamento patrimonial de complexo industrial', local: 'BR-116, km 287, Eldorado do Sul, RS', finalidade: 'Levantamento patrimonial', area: 'Avaliação industrial',
    numeros: [['117.278,50 m²', 'de terreno'], ['27.031,13 m²', 'de área construída']],
    texto: ['Elaboração de laudo de avaliação de complexo industrial com a finalidade de levantamento patrimonial, tratando de edificações, benfeitorias e equipamentos de propriedade da Olvebra S.A., localizada na BR-116, km 287, em Eldorado do Sul/RS.', 'Foram utilizados os métodos comparativo direto de dados de mercado e da quantificação do custo para as benfeitorias e inferência estatística para o terreno. Foram avaliados 117.278,50 m² de terreno e 27.031,13 m² de área construída.'],
  },
  {
    slug: 'doux-frangosul-montenegro', cliente: 'Doux Frangosul S.A.', sigla: 'Doux Frangosul', logo: 'doux', foto: 'trelica',
    titulo: 'Complexo industrial em Montenegro', local: 'Rua Buarque de Macedo, 3620, Montenegro, RS', finalidade: 'Garantia de operações financeiras', area: 'Avaliação industrial',
    numeros: [['262.213,76 m²', 'de terreno'], ['14.664,16 m²', 'de área construída']],
    texto: ['Elaboração de laudo de avaliação de complexo industrial com a finalidade de garantia de operações financeiras, tratando de edificações, benfeitorias e equipamentos de propriedade da Doux Frangosul S.A., localizada na Rua Buarque de Macedo, 3620, em Montenegro/RS.', 'Foram utilizados os métodos comparativo direto de dados de mercado e da quantificação do custo para as benfeitorias e inferência estatística para o terreno. Foram avaliados 262.213,76 m² de terreno e 14.664,16 m² de área construída.'],
  },
  {
    slug: 'ipergs-142-laudos', cliente: 'Instituto de Previdência do Estado do Rio Grande do Sul', sigla: 'IPERGS', logo: 'ipergs', foto: 'lacador',
    titulo: '142 laudos para alienação de imóveis', local: 'Diversas cidades do Rio Grande do Sul', finalidade: 'Compra e venda', area: 'Avaliação de imóveis',
    numeros: [['142', 'laudos técnicos'], ['40 dias', 'corridos de execução']],
    texto: ['A Andrade Lopes Engenharia e Consultoria elaborou os 142 laudos técnicos de avaliação para determinar o valor de mercado para compra e venda dos imóveis, para fins de alienação, fazendo a vistoria, a análise, a pesquisa cartorial e o tratamento de dados direto de mercado.', 'O serviço se deu em diversas localidades do Estado do Rio Grande do Sul, perfazendo um total de 3.395,71 m² de área construída avaliada em 40 dias corridos.'],
  },
];

// Página Clientes do site atual (logos na mesma ordem). tipo: público ou privado.
export const clientes = [
  { id: 'ipergs', nome: 'IPERGS', tipo: 'pub' }, { id: 'uergs', nome: 'UERGS', tipo: 'pub' }, { id: 'engebein', nome: 'Engebein', tipo: 'priv' },
  { id: 'aessul', nome: 'AES Sul', tipo: 'priv' }, { id: 'sehadur', nome: 'SEHADUR', tipo: 'pub' }, { id: 'gibarroz', nome: 'Gibarroz', tipo: 'priv' },
  { id: 'fase', nome: 'FASE', tipo: 'pub' }, { id: 'huop', nome: 'HUOP', tipo: 'pub' }, { id: 'caixa', nome: 'Caixa', tipo: 'pub' },
  { id: 'gaspar', nome: 'Prefeitura de Gaspar', tipo: 'pub' }, { id: 'doux', nome: 'Doux Frangosul', tipo: 'priv' }, { id: 'bancodobrasil', nome: 'Banco do Brasil', tipo: 'pub' },
  { id: 'fator', nome: 'Fator Engenharia', tipo: 'priv' }, { id: 'olvebra', nome: 'Olvebra', tipo: 'priv' }, { id: 'caixars', nome: 'Caixa RS', tipo: 'pub' },
  { id: 'telear', nome: 'Telear', tipo: 'priv' }, { id: 'angeloni', nome: 'Angeloni', tipo: 'priv' },
];

// "Profissionais associados" da home atual.
export const entidades = [
  { id: 'crea-rs', nome: 'CREA-RS', desc: 'Conselho Regional de Engenharia e Agronomia do RS', url: 'https://www.crea-rs.org.br' },
  { id: 'igel', nome: 'IGEL', desc: 'Instituto Gaúcho de Engenharia Legal e de Avaliações', url: 'http://www.igel.org.br' },
  { id: 'sergs', nome: 'SERGS', desc: 'Sociedade de Engenharia do Rio Grande do Sul', url: 'https://www.sergs.org.br' },
  { id: 'ibape', nome: 'IBAPE', desc: 'Instituto Brasileiro de Avaliações e Perícias de Engenharia', url: 'https://www.ibape-nacional.com.br' },
];

// Página Indicadores do site atual (três links).
export const indicadores = [
  { id: 'sinduscon', nome: 'Sinduscon-RS', desc: 'CUB/RS, o Custo Unitário Básico da construção, publicado mensalmente pelo sindicato da construção.', url: 'https://www.sinduscon-rs.com.br' },
  { id: 'ibge', nome: 'IBGE · SIDRA', desc: 'Banco de tabelas do IBGE, com o SINAPI e os índices de preços usados em orçamentos e reajustes.', url: 'https://sidra.ibge.gov.br' },
  { id: 'piniweb', nome: 'PINIweb', desc: 'Custos, composições e referências técnicas de engenharia e construção.', url: 'https://www.piniweb.com.br' },
];
