// Textos e dados da TOP Engenharia, copiados do site atual (topengenharia.com.br, 21/10/2026).
// O que foi escrito por nós está marcado com "nosso" nos comentários.

export const empresa = {
  nome: 'TOP Engenharia',
  completo: 'TOP Engenharia Ltda.',
  url: 'https://topengenharia.overtus.com.br/',
  antigo: 'http://www.topengenharia.com.br/',
  fundacao: 1977,
  tel: { t: '+55 71 2109-4949', h: '+557121094949' },
  fax: '+55 71 2109-4888',
  email: 'top@topengenharia.com.br',
  denuncia: 'denuncia@topengenharia.com.br',
  endereco: ['Rua do Zaire, s/n, Granjas Rurais Presidente Vargas', 'Salvador – BA · CEP 41.230-060'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Top+Engenharia+Rua+do+Zaire+Salvador+BA',
  mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8555951788258!2d-38.46168652400448!3d-12.917001287393367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x716106a28c66195%3A0x9badd5d7035cf39d!2sTop%20Engenharia!5e0!3m2!1spt-BR!2sbr!4v1685669115336!5m2!1spt-BR!2sbr',
  // Links de colaborador do menu atual (Webmail e Intranet).
  colaborador: [
    { nome: 'Webmail', url: 'https://webmail-seguro.com.br/topengenharia.com.br' },
    { nome: 'Arquivos', url: 'http://ecm.topengenharia.com.br:8082/share' },
    { nome: 'Messenger', url: 'http://sparkweb.topengenharia.com.br:8081' },
    { nome: 'Suporte', url: 'http://suporte.topengenharia.com.br:8080/otrs/customer.pl' },
  ],
  formDenuncia: 'http://www.topengenharia.com.br/canal-denuncias.php',
};

export const textos = {
  resumo: 'TOP Engenharia atua em diversos estados do Brasil, prestando serviços de reconhecida qualidade no ramo da construção pesada.',
  empresa: [
    'A TOP Engenharia é sinônimo de solidez, tradição e credibilidade. Fundada em 1977, a empresa atua em diversos estados do Brasil, prestando serviços de reconhecida qualidade no ramo da construção pesada. A TOP Engenharia contribui para o desenvolvimento do país com obras de terraplenagem, pavimentação, infraestrutura, saneamento, barragens, aeroportos e obras de arte especiais.',
    'Administrada por uma equipe de profissionais experientes, a empresa conta com equipamentos próprios e modernos, além de controlar uma pedreira comercial e uma incorporadora.',
    'Utilizando métodos específicos e padronizados de trabalho, a TOP Engenharia recebeu as certificações ISO 9001:2000 para obras rodoviárias e Qualiop Nível A nos setores de obras de urbanização, obras rodoviárias e saneamento.',
    'O compromisso com a satisfação do cliente e a pontualidade na entrega de suas obras, aliados ao respeito às normas de segurança do trabalho e preservação do meio ambiente, fazem com que a TOP Engenharia ocupe lugar de destaque no mercado brasileiro da construção civil e infraestrutura em geral.',
  ],
  atuacao: ['Terraplenagem', 'Pavimentação', 'Infraestrutura', 'Saneamento', 'Barragens', 'Aeroportos', 'Obras de arte especiais'],
  estrutura: [ // os três itens repartem o 2º parágrafo de "A empresa"
    { t: 'Equipamentos próprios', d: 'A empresa conta com equipamentos próprios e modernos.' },
    { t: 'Pedreira comercial', d: 'A empresa controla uma pedreira comercial.' },
    { t: 'Incorporadora', d: 'A empresa também controla uma incorporadora.' },
  ],
  certificacoes: [
    { t: 'ISO 9001:2000', d: 'Para obras rodoviárias.' },
    { t: 'Qualiop Nível A', d: 'Nos setores de obras de urbanização, obras rodoviárias e saneamento.' },
  ],
  qualidade: 'A garantia da qualidade é um compromisso constante de todos os colaboradores da empresa, visando a melhoria contínua dos nossos serviços de obras civis pela busca total da satisfação de nossos clientes, através de medidas eficazes de preservação ao meio ambiente e na valorização da saúde e segurança, capacitação e treinamento dos nossos colaboradores, conquistando novos mercados, reduzindo nossos custos operacionais.',
  qualidadeCurto: 'A garantia da qualidade é um compromisso constante de todos os colaboradores da empresa, visando a melhoria contínua dos nossos serviços de obras civis pela busca total da satisfação de nossos clientes.',
  objetivos: [
    'Capacitar, treinar e motivar os nossos colaboradores quanto às questões referentes ao SGI e reduzir os riscos a sua saúde e segurança;',
    'Buscar a satisfação dos nossos clientes internos e externos;',
    'Padronizar os processos da empresa, visando à melhoria contínua dos nossos serviços, reduzindo a poluição, observando a preservação ambiental, a saúde e segurança dos nossos colaboradores;',
    'Atender à Legislação Ambiental e a relativa à saúde e segurança do trabalho e demais normas aplicáveis;',
    'Conquistar novos mercados;',
    'Reduzir os custos operacionais.',
  ],
  seguranca: [
    'A saúde e segurança são partes indissociáveis em todas as atividades que fazem parte das obras da TOP ENGENHARIA LTDA. A Alta Administração se preocupa em destacar de forma especial a saúde e segurança de seus funcionários. Procedimentos, programas e campanhas visando a promoção da saúde e segurança são elaborados e implementados em todas as obras da empresa com o objetivo de reduzir o índice de acidentes, associando com a ideia de que todos os acidentes podem ser evitados. Levantamentos de risco também são realizados antes da instalação dos canteiros para elaboração do PCMAT, PPRA e PCMSO.',
    'A intensificação das boas práticas de segurança no trabalho adotada pela empresa para garantir índice zero de acidentes através da conscientização dos funcionários, evitando os atos e comportamentos inseguros, é uma das principais razões do investimento na área de saúde e segurança. O trabalho seguro, a saúde e a preocupação com o meio ambiente são princípios que a TOP ENGENHARIA LTDA julga importantes e que devem ser assumidos por todos os funcionários no seu dia a dia, seja dentro ou fora da empresa.',
  ],
  // Pontos de segurança do site atual, na ordem da obra (nosso: agrupamento em etapas e os títulos curtos).
  etapasSeguranca: [
    { t: 'Antes do canteiro', d: 'Levantamento de riscos para elaboração do PCMAT, PPRA e PCMSO.' },
    { t: 'Admissão', d: 'Elaboração de O.S. (Ordem de Serviço) e integração dos funcionários no momento da admissão.' },
    { t: 'Na obra', d: 'Formação dos SESMTs nas obras e formação da CIPA.' },
    { t: 'EPI por função', d: 'Book de EPI x Função, fornecimento de EPIs para todos os funcionários e Certificado de Aprovação para todos os EPIs.' },
    { t: 'Índice zero', d: 'Conscientização dos funcionários para evitar atos e comportamentos inseguros.' },
  ],
  pontosSeguranca: [
    'Elaboração de O.S. (Ordem de Serviço);',
    'Realização de integração dos funcionários no momento da admissão;',
    'Formação dos SESMTs nas obras;',
    'Elaboração do Book de EPI x Função;',
    'Fornecimento de EPIs para todos os funcionários;',
    'Formação da CIPA;',
    'Especificação de Certificado de Aprovação para todos os EPIs.',
  ],
  ambiental: [
    'A TOP Engenharia tem desenvolvido um conjunto de atitudes com foco no desenvolvimento sustentável do planeta. Estas atitudes levam em consideração o crescimento econômico ajustado à proteção do meio ambiente na atualidade e para as gerações futuras, garantindo assim a sustentabilidade do nosso planeta.',
    'Abaixo algumas ações que a TOP Engenharia está e estará adotando para atingir este intuito:',
  ],
  ambientalCurto: 'A TOP Engenharia tem desenvolvido um conjunto de atitudes com foco no desenvolvimento sustentável do planeta.',
  acoesAmbientais: [
    'Utilização do sistema de coleta seletiva de lixo.',
    'Realização de treinamentos informativos para os funcionários quanto à importância da sustentabilidade.',
    'Dar preferência para a compra de produtos de empresas que também sigam os princípios da sustentabilidade.',
    'Utilizar, sempre que possível, fontes de energia limpas e renováveis em nosso processo operacional.',
    'Nunca adotar ações que possam provocar danos ao meio ambiente, como por exemplo, poluição de rios e desmatamento.',
    'Promover a economia de energia elétrica e o consumo de água em todas as unidades da TOP Engenharia.',
    'Utilização de tecnologias que visem diminuir o volume de impressões e consequentemente o volume de papéis utilizados.',
    'Substituição dos copos plásticos descartáveis por canecas confeccionadas com materiais reciclados.',
  ],
  denuncia: [
    'Este canal foi criado para receber denúncias de forma segura e confidencial.',
    'Você pode optar por se identificar ou fazer uma denúncia anônima.',
    'Todas as denúncias serão tratadas com seriedade e confidencialidade.',
  ],
  tiposDenuncia: ['Assédio moral', 'Assédio sexual', 'Fraude', 'Discriminação', 'Outro'],
};

// Segmentos = submenu "Obras" do site atual, na mesma ordem.
export const segmentos = [
  { slug: 'saneamento', nome: 'Saneamento', capa: 'obras/esgotamento-feira-de-santana-1.webp' },
  { slug: 'barragens', nome: 'Barragens', capa: 'obras/barragem-pedras-altas-1.webp' },
  { slug: 'rodovias', nome: 'Rodovias', capa: 'obras/br-101-se-1.webp' },
  { slug: 'portos', nome: 'Portos', capa: 'obras/porto-de-salvador-1.webp' },
  { slug: 'aeroportos', nome: 'Aeroportos', capa: 'obras/aeroporto-aracati-2.webp' },
  { slug: 'pontes', nome: 'Pontes e Viadutos', capa: 'obras/vias-elevadas-feira-de-santana-4.webp' },
];

// Obras: ordem e textos das páginas de detalhe do site atual. km = extensão informada no próprio texto.
// periodo: como está no site; "em execução" no site atual virou só a data de início (o site não é atualizado desde ~2010).
export const obras = [
  { slug: 'esgotamento-feira-de-santana', seg: 'saneamento', uf: 'BA', local: 'Feira de Santana/BA', titulo: 'Esgotamento sanitário de Feira de Santana',
    desc: 'Obras de Ampliação do Serviço de Esgotamento Sanitário de Feira de Santana.', inicio: '07/2008', cliente: 'EMBASA – Empresa Baiana de Águas e Saneamento' },
  { slug: 'abastecimento-candeias', seg: 'saneamento', uf: 'BA', local: 'Candeias/BA', titulo: 'Abastecimento de água de Candeias',
    desc: 'Obras de Ampliação do Sistema Integrado de Abastecimento de Água de Candeias / São Francisco do Conde, Madre de Deus e das Localidades de Monte Recôncavo e Paramirim-BA.', periodo: '01/1997 a 09/1997', cliente: 'PABLO – Construtora Pablo Ltda (Contrato de Sub-Empreitada)' },
  { slug: 'barragem-pedras-altas', seg: 'barragens', uf: 'BA', local: 'Rio Itapicuru-Açu/BA', titulo: 'Barragem de Pedras Altas',
    desc: 'Serviços de Implantação da Barragem de Pedras Altas e suas Obras Complementares, localizada no Rio Itapicuru-Açu.', periodo: '24/06/2000 a 28/02/2002', cliente: 'CERB – Companhia de Engenharia Rural da Bahia' },
  { slug: 'barragem-barra-do-choca', seg: 'barragens', uf: 'BA', local: 'Barra do Choça/BA', titulo: 'Barragem de Barra do Choça',
    desc: 'Serviços de Implantação da Barragem de Barra do Choça/BA.', periodo: '01/06/2005 a 27/01/2006 (previsto)', cliente: 'EMBASA – Empresa Baiana de Águas e Saneamento' },
  { slug: 'ba-026-reabilitacao', seg: 'rodovias', uf: 'BA', local: 'BA-026', titulo: 'Reabilitação da BA-026', km: 68.35,
    desc: 'Execução de obras rodoviárias – Reabilitação.', trechos: ['Lote III – Rodovia BA-026, trecho: Rio Tamboril - Contendas do Sincorá, extensão 28,94 km', 'Lote IV – Rodovia BA-026, trecho: Tanhaçu - Contendas do Sincorá, extensão 39,41 km'], cliente: 'DERBA – Departamento de Infraestrutura de Transportes da Bahia' },
  { slug: 'br-430-jua-riacho-de-santana', seg: 'rodovias', uf: 'BA', local: 'BR-430/BA', titulo: 'Restauração em CBUQ na BR-430', km: 35,
    desc: 'Restauração em CBUQ na Rodovia BR-430, trecho: Povoado de Juá - Riacho de Santana, extensão 35,00 km.', periodo: '17/06/2005 a 10/09/2006', cliente: 'DERBA – Departamento de Infraestrutura de Transportes da Bahia' },
  { slug: 'anel-viario-sao-raimundo-nonato', seg: 'rodovias', uf: 'PI', local: 'São Raimundo Nonato/PI', titulo: 'Anel Viário de São Raimundo Nonato', km: 7.03,
    desc: 'Obras e serviços de Implantação e Pavimentação do Anel Viário de São Raimundo Nonato.', trechos: ['Rodovia BR-020/PI, trecho: Anel Viário de São Raimundo Nonato, subtrecho: Acesso a São Raimundo Nonato, extensão 7,03 km'], periodo: '18/09/2007 a 07/12/2009', cliente: 'DNIT – Departamento Nacional de Infraestrutura de Transportes' },
  { slug: 'br-163-mt', seg: 'rodovias', uf: 'MT', local: 'BR-163/MT', titulo: 'Restauração da BR-163/MT', km: 56,
    desc: 'Restauração na Rodovia BR-163/MT.', trechos: ['Trecho: Divisa MS/MT - Divisa MT/PA, subtrecho: Sinop - Entr. MT-320(A) (Santa Helena), segmento: km 899,3 - km 955,3, extensão 56,0 km'], inicio: '03/02/2009', cliente: 'DNIT – Departamento Nacional de Infraestrutura de Transportes' },
  { slug: 'br-135-ba', seg: 'rodovias', uf: 'BA', local: 'BR-135/BA', titulo: 'Implantação e pavimentação da BR-135/BA', km: 60,
    desc: 'Execução de obras e serviços de implantação e pavimentação.', trechos: ['Lote I – Rodovia BR-135/BA, trecho: Divisa PI/BA - Divisa BA/MG, subtrecho: São Desidério - km 267,0, segmento: km 207,0 - km 267,0, extensão 60,0 km'], inicio: '03/10/2005', cliente: 'DNIT – Departamento Nacional de Infraestrutura de Transportes' },
  { slug: 'br-101-se', seg: 'rodovias', uf: 'SE', local: 'BR-101/SE', titulo: 'Adequação da BR-101/SE', km: 14.3,
    desc: "Obras de Terraplenagem, Drenagem, Obras D'arte Corrente, Pavimentação, Sinalização, Obras Complementares, Proteção e Paisagismo, Adequação Rodoviária.", trechos: ['Rodovia BR-101/SE, subtrecho: SE-208 (Maruim) / Entr. BR-235(B) 349(A), segmento: km 77,3 - km 91,6'], inicio: '03/09/2000', cliente: 'DNIT – Departamento Nacional de Infraestrutura de Transportes' },
  { slug: 'ligacao-br-101-socorro', seg: 'rodovias', uf: 'SE', local: 'Nossa Senhora do Socorro/SE', titulo: 'Ligação do Distrito Industrial de N. S. do Socorro à BR-101', km: 5.7,
    desc: 'Obras de Implantação e Pavimentação da Rodovia de Ligação do Distrito Industrial de Nossa Senhora do Socorro / BR-101, com 5,7 km de extensão.', periodo: '25/04/2003 a 20/02/2005', cliente: 'DNIT – Departamento Nacional de Infraestrutura de Transportes' },
  { slug: 'se-090', seg: 'rodovias', uf: 'SE', local: 'SE-090', titulo: 'Rodovia SE-090',
    desc: 'Obras de Terraplenagem, Pavimentação, Obras de Arte Corrente, Obras Especiais, Sinalização e Obras Complementares na Rodovia SE-090, trecho: Fábrica de Cimento Nassau / Entr. SE-448 (Laranjeiras).', periodo: '03/05/2004 a 29/04/2006', cliente: 'DER/SE – Departamento Estadual de Infraestrutura Rodoviária de Sergipe' },
  { slug: 'rdm-bahia', seg: 'rodovias', uf: 'BA', local: 'RDM Bahia', titulo: 'Vias e pavimentação na unidade industrial da RDM Bahia',
    desc: 'Recuperação de vias e pavimentação com asfalto de áreas na unidade industrial da RDM Bahia – lançamento da Pedra Fundamental do Parque Botânico da RDM (08/2005).',
    trechos: ["Serviços de pavimentação em asfalto dos acessos em volta da área dos fornos e utilidade da planta 03, pavimentação em asfalto e concreto armado dos acessos em volta da área das baias de produtos acabados e pátio de Big-Bags e pavimentação asfáltica (03/2005).", 'Construção da sala elétrica para a central de britagem III da RDM Bahia (03/05/2004 a 29/04/2006).'], cliente: 'CVRD – Companhia Vale do Rio Doce' },
  { slug: 'crema-br-242', seg: 'rodovias', uf: 'BA', local: 'BR-242/BA', titulo: 'CREMA 1ª etapa · BR-242/BA', km: 300,
    desc: 'Obras de Revitalização – CREMA 1ª ETAPA (PIR-IV – Recuperação, Restauração e Manutenção Rodoviária).', trechos: ['Lote 04 – Rodovia BR-242/BA, trecho: Entr. BR-420(A) (São Roque do Paraguaçu) - Div. BA/TO, subtrecho: Entr. BA-156(A) - Entr. BA-172, segmento: km 498,0 - km 645,9, extensão 147,9 km', 'Lote 05 – Rodovia BR-242/BA, trecho: Entr. BR-420(A) (São Roque do Paraguaçu) - Div. BA/TO, subtrecho: Entr. BA-172 - Entr. BR-135(A)/430(B)/BA-455 (Barreiras), segmento: km 645,9 - km 798,0, extensão 152,1 km'], inicio: '14/04/2009', cliente: 'DNIT – Departamento Nacional de Infraestrutura de Transportes' },
  { slug: 'crema-br-030', seg: 'rodovias', uf: 'BA', local: 'BR-030/BA', titulo: 'CREMA 1ª etapa · BR-030/BA', km: 136.7,
    desc: 'Obras de Revitalização – CREMA 1ª ETAPA (PIR-IV – Recuperação, Restauração e Manutenção Rodoviária).', trechos: ['Rodovia BR-030/BA, trecho: Divisa MG/BA - Campinho, subtrecho: Entr. BR-122(A) (Guanambi) - Entr. BA-026(A)/262 (Brumado), segmento: km 158,6 - km 295,3, extensão 136,7 km'], inicio: '14/04/2009', cliente: 'DNIT – Departamento Nacional de Infraestrutura de Transportes' },
  { slug: 'ba-001-046-premar', seg: 'rodovias', uf: 'BA', local: 'BA-001/046', titulo: 'Restauração PREMAR da BA-001/046', km: 90.1,
    desc: 'Obras de Restauração PREMAR da Rodovia BA-001/046, trecho: Bom Despacho - Nazaré - Santo Antônio de Jesus, com 90,10 km de extensão.', inicio: '12/03/2009', cliente: 'DERBA – Departamento de Infraestrutura de Transportes da Bahia' },
  { slug: 'porto-de-salvador', seg: 'portos', uf: 'BA', local: 'Porto de Salvador/BA', titulo: 'Porto Organizado de Salvador',
    desc: 'Execução de recalçamento de trechos de pavimentação na retroárea do cais comercial e sinalização horizontal e vertical dos acessos ao Porto Organizado de Salvador/BA.', periodo: '16/06/2008 a 25/10/2008', cliente: 'CODEBA – Companhia das Docas do Estado da Bahia' },
  { slug: 'aeroporto-cariri', seg: 'aeroportos', uf: 'CE', local: 'Juazeiro do Norte/CE', titulo: 'Aeroporto de Cariri',
    desc: 'Obras de Restauração e Ampliação do Aeroporto de Cariri (em operação) em Juazeiro do Norte/CE.', periodo: '25/02/2003 a 19/02/2004', cliente: 'DERT/CE – Departamento de Edificações, Rodovias e Transportes do Estado do Ceará' },
  { slug: 'aeroporto-aracati', seg: 'aeroportos', uf: 'CE', local: 'Aracati/CE', titulo: 'Aeroporto de Aracati',
    desc: 'Reabilitação e Construção do Aeroporto de Aracati/CE.', inicio: '03/05/2008', cliente: 'DERT/CE – SETUR' },
  { slug: 'ponte-rio-paraguacu-iacu', seg: 'pontes', uf: 'BA', local: 'Iaçu/BA', titulo: 'Ponte sobre o Rio Paraguaçu',
    desc: 'Reconstrução da Ponte sobre o Rio Paraguaçu em Iaçu/BA.', inicio: '10/01/2010', cliente: 'DERBA – Departamento de Infraestrutura de Transportes da Bahia' },
  { slug: 'vias-elevadas-feira-de-santana', seg: 'pontes', uf: 'BA', local: 'Feira de Santana/BA', titulo: 'Vias elevadas de Feira de Santana',
    desc: 'Integração das Vias Urbanas na Cidade de Feira de Santana/BA, por meio de vias elevadas, nos seguintes locais:', trechos: ['Interseção Av. João Durval Carneiro / Av. Getúlio Vargas.', 'Interseção Av. Getúlio Vargas / Av. Eduardo Fróes da Mota e Av. Noide Cerqueira, até a Estaca 80.', 'Interseção Av. João Durval Carneiro / Av. Eduardo Fróes da Mota e Av. Ayrton Senna, até a Estaca 21.', 'Interseção Av. Maria Quitéria / Av. Eduardo Fróes da Mota e Av. Francisco Fraga Maia, até a Estaca 30.', 'Interseção Av. Eduardo Fróes da Mota / Rod. BR-116 Norte.'], periodo: '27/08/2007 a 10/12/2008', cliente: 'Prefeitura Municipal de Feira de Santana' },
];

// Destaques do carrossel da home atual (mesma ordem e legendas).
export const destaques = [
  { img: 'slide1.webp', obra: 'barragem-pedras-altas', legenda: 'Barragem de Pedras Altas e suas obras complementares, localizada no Rio Itapicuru-Açu' },
  { img: 'slide2.webp', obra: 'barragem-barra-do-choca', legenda: 'Implantação da Barragem de Barra do Choça/BA' },
  { img: 'slide3.webp', obra: 'esgotamento-feira-de-santana', legenda: 'Ampliação do Serviço de Esgotamento Sanitário de Feira de Santana' },
  { img: 'slide4.webp', obra: 'abastecimento-candeias', legenda: 'Sistema Integrado de Abastecimento de Água de Candeias' },
  { img: 'slide5.webp', obra: 'ba-026-reabilitacao', legenda: 'Execução de obras rodoviárias – Reabilitação' },
];

// Página "Clientes" (logos que existem no site atual; os demais só com o nome).
export const clientes = [
  { sigla: 'DNIT', nome: 'Departamento Nacional de Infraestrutura de Transportes', logo: 'dnit' },
  { sigla: 'DERBA', nome: 'Departamento de Infraestrutura de Transportes da Bahia', logo: 'derb' },
  { sigla: 'DER/SE', nome: 'Departamento Estadual de Infraestrutura Rodoviária de Sergipe', logo: 'derse' },
  { sigla: 'CERB', nome: 'Companhia de Engenharia Rural da Bahia', logo: 'cerb' },
  { sigla: 'Petrobras', nome: 'Petróleo Brasileiro S.A.', logo: 'petrobras' },
  { sigla: 'Vale', nome: 'Companhia Vale do Rio Doce', logo: 'vale' },
  { sigla: 'CONDER', nome: 'Companhia de Desenvolvimento Urbano do Estado da Bahia', logo: 'conder' },
  { sigla: 'SURCAP', nome: 'Superintendência de Urbanização da Capital', logo: 'surcap' },
  { sigla: 'SUMAC', nome: 'Superintendência de Manutenção e Conservação da Cidade', logo: 'sumac' },
  { sigla: 'Embasa', nome: 'Empresa Baiana de Águas e Saneamento', logo: 'embasa' },
  { sigla: 'Feira de Santana', nome: 'Prefeitura Municipal de Feira de Santana', logo: 'feira' },
  { sigla: 'SUCOP', nome: 'Superintendência de Conservação de Obras Públicas de Salvador' },
  { sigla: 'DERT/CE', nome: 'Departamento de Edificações e Rodovias do Ceará' },
  { sigla: 'DER/PI', nome: 'Departamento de Estradas de Rodagem do Piauí' },
  { sigla: 'SETUR', nome: 'Secretaria de Turismo do Ceará' },
  { sigla: 'CODEBA', nome: 'Companhia das Docas do Estado da Bahia' },
  { sigla: 'CLN', nome: 'Consórcio Litoral Norte' },
  { sigla: 'RDM', nome: 'Rio Doce Manganês' },
];

export const kmTotal = obras.reduce((s, o) => s + (o.km || 0), 0);
export const ufs = [...new Set(obras.map(o => o.uf))];
