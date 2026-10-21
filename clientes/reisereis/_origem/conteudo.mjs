// Textos do site atual (www.reisereis.com, copiados em 21/10/2026). Escritos por nós: títulos de seção curtos,
// as três frentes de "Como atuamos" (resumem a missão do próprio site) e os textos de botão.
import fs from 'node:fs';
import path from 'node:path';

export const empresa = {
  nome: 'Reis & Reis Advogados',
  nomeLongo: 'Reis & Reis Advocacia Empresarial',
  url: 'https://reisereis.overtus.com.br/',
  antigo: 'https://www.reisereis.com/',
  linha: 'Direito Empresarial, Bancário e Tributário',
  tel: '(31) 3141-6250',
  telHref: '+553131416250',
  wa: '553196326250',
  waTxt: '(31) 99632-6250',
  email: 'contato@reisereis.com',
  rua: 'Rua Raul Pompeia, 77, 5º andar',
  bairro: 'Savassi',
  cidade: 'Belo Horizonte / MG',
  cep: 'CEP 30330-080',
  mapa: 'https://www.google.com/maps/place/REIS+%26+REIS+Advogados+-+Advocacia+Empresarial/@-19.9409864,-43.937862,18z/data=!3m1!4b1!4m6!3m5!1s0xa699d0f72343c3:0x4da003acb338cf7c!8m2!3d-19.9409864!4d-43.9367677',
  mapaEmbed: 'https://www.google.com/maps?q=-19.9409864,-43.9367677&z=17&output=embed',
  facebook: 'https://www.facebook.com/reisadvocaciaempresarial/',
  linkedin: 'https://www.linkedin.com/in/reisereis',
  lattes: 'http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8738020U6',
};

export const filosofia = [
  'Atuando há quase duas décadas nas áreas empresarial, bancária, tributária e cível, nossa filosofia é a busca da excelência em serviços jurídicos, com o exercício de uma advocacia ética e transparente.',
  'Nossa missão é ser referência na área jurídica negocial, na administração de contenciosos judiciais e na elaboração de pareceres e contratos. Nosso compromisso é a busca constante de resultados para a satisfação das necessidades de nossos clientes e parceiros.',
];
export const citacao = 'O atendimento ágil, eficiente e totalmente personalizado dos clientes é um dos principais fatores de sucesso do nosso escritório.';

// As três frentes vêm da missão do site atual ("jurídica negocial", "contenciosos judiciais", "pareceres e contratos").
export const frentes = [
  { nome: 'Consultoria negocial', texto: 'Estruturação de negócios, auditoria legal e consultoria preventiva antes de cada decisão da empresa.' },
  { nome: 'Pareceres e contratos', texto: 'Elaboração e revisão de contratos, acordos de quotistas e pareceres com análise de riscos.' },
  { nome: 'Contencioso', texto: 'Administração de contenciosos judiciais e administrativos, da defesa aos recursos.' },
];

export const areas = [
  { slug: 'direito-empresarial', nome: 'Direito Empresarial', curto: ['Direito', 'Empresarial'],
    resumo: 'Contratos, constituição de empresas, auditoria, reorganização societária e sucessão familiar.',
    itens: [
      'Estruturação de negócios e auditoria legal.',
      'Constituição de sociedades empresariais típicas (LTDA e S/A), sociedades em conta de participação (SCP), sociedades de propósito específico (SPE) e parcerias comerciais em geral.',
      'Consultoria na elaboração e reformulação de contratos sociais e acordos de quotistas.',
      'Assessoria na realização de incorporações, cisões e fusões, bem como para dissolução total ou parcial de sociedades.',
      'Elaboração de pareceres, análise de riscos e identificação de vantagens tributárias e comerciais.',
      'Análise sucessória para organização e reestruturação de empresas familiares.',
      'Acompanhamento de contencioso judicial e exclusão de responsabilidade societária.',
      'Falência e recuperação judicial.',
    ] },
  { slug: 'direito-bancario', nome: 'Direito Bancário', curto: ['Direito', 'Bancário'],
    resumo: 'Revisão de débitos bancários, capital de giro, cartão de crédito, finame, CDC, conta garantida, leasing, descontos e demais operações financeiras.',
    itens: [
      'Consultoria preventiva e revisão de contratos e documentos bancários.',
      'Defesa e interposição de recursos em ações que tenham como objeto débitos de natureza bancária.',
      'Excelência em negociações bancárias.',
      'Revisão de contratos de empréstimo.',
      'Revisão de financiamentos e contratos de repasse, de cédulas de crédito (rural, industrial e comercial), de operações de desconto, antecipações de cartões e títulos, entre outras operações bancárias e financeiras.',
      'Distribuição e acompanhamento de ações para discussão de protesto, negativação, aval, fiança, hipoteca, penhor e outras garantias reais e fidejussórias.',
      'Distribuição de medidas judiciais para redução de taxas de juros pré e pós-fixadas, atividades creditícias e encadeamento de operações.',
    ] },
  { slug: 'direito-tributario', nome: 'Direito Tributário', curto: ['Direito', 'Tributário'],
    resumo: 'Impostos, taxas e contribuições.',
    itens: [
      'Consultoria tributária preventiva.',
      'Contencioso administrativo e judicial.',
      'Elaboração de pareceres e orientações legais.',
      'Planejamento e estruturação fiscal em operações societárias.',
      'Propositura de ações para estruturação de planejamentos tributários e restituição de valores quitados indevidamente.',
      'Recuperação de créditos fiscais e assessoria na compensação de tributos.',
      'Elaboração de consultas aos fiscos Federal, Estadual e Municipal.',
      'Planejamento e análise do impacto tributário de contratos, projetos e negócios em geral.',
    ] },
  { slug: 'direito-imobiliario', nome: 'Direito Imobiliário', curto: ['Direito', 'Imobiliário'],
    resumo: 'Consultoria em incorporações e negócios imobiliários em geral.',
    itens: [
      'Assessoria jurídica especializada na incorporação, permuta, aquisição, venda e locação de imóveis.',
      'Elaboração de contratos imobiliários, inclusive de locação e cessão de direitos.',
      'Estruturação e formalização de negócios imobiliários, com permuta física e financeira.',
      'Análise de domínio e disponibilidade do bem para venda, aquisição ou locação.',
      'Regularização de imóveis urbanos e rurais.',
      'Propositura de ação de usucapião e obtenção de baixa e habite-se.',
      'Distribuição e defesa em ações demarcatórias, possessórias, despejo e revisionais ou renovatórias da locação, entre outras.',
      'Atuação junto aos cartórios de imóveis, notas e protestos.',
      'Assessoria especializada a condomínios.',
    ] },
  { slug: 'administrativo-e-previdenciario', nome: 'Administrativo e Previdenciário', curto: ['Previdenciário/', 'Administrativo'],
    resumo: 'Licitações, servidores públicos, concursos, aposentadorias e pensões.',
    itens: [
      'Consultoria judicial e extrajudicial.',
      'Emissão de pareceres e atuação junto aos órgãos públicos municipais, estaduais e federais.',
      'Elaboração de impugnações, recursos e defesas administrativas.',
      'Suporte jurídico especializado em licitações públicas (concorrência, leilão, tomada de preços, convite, pregão, concessão e permissão de serviço público).',
      'Impetração e acompanhamento de ações populares, mandados de segurança, habeas data e ações para reintegração de servidores públicos.',
      'Revisão de questões funcionais e remuneratórias de servidores públicos.',
      'Acompanhamento e defesa em sindicâncias e processos administrativos disciplinares, bem como em ações civis públicas e de improbidade administrativa.',
      'Concessão e revisão de benefícios previdenciários (aposentadorias, pensões, licença-maternidade, auxílio-doença e auxílio-acidente).',
      'Atuação junto aos regimes próprio e geral de previdência social (RPPS e RGPS/INSS).',
    ] },
  { slug: 'familia-e-sucessoes', nome: 'Família e Sucessões', curto: ['Sucessões e', 'Família'],
    resumo: 'Direito de família, inventário e partilha.',
    itens: [
      'Divórcio judicial e extrajudicial.',
      'Inventário, partilha e sobrepartilha de bens.',
      'Assessoria jurídica para elaboração de testamentos.',
      'Tutela e curatela.',
      'Regime de participação final nos aquestos e pacto antenupcial.',
      'Investigação de paternidade, adoção e reconhecimento de união estável.',
    ] },
];

export const titular = {
  nome: 'Gleison Assis Reis', oab: 'OAB/MG 81.255', foto: 'gleison',
  papel: 'Fundador da Reis & Reis Advocacia Empresarial',
  bio: [
    ['Advogado atuante desde 1999', 'Direito Empresarial, Tributário e Bancário'],
    ['Professor', 'Direito Tributário, Administrativo, Previdenciário e Processo Civil'],
    ['Extensão em Direito Tributário', 'AUDIFISCO, 2001'],
    ['Especialização em Direito Administrativo', 'Fundação João Pinheiro, 2007'],
    ['Mestrado em Administração Pública', 'Fundação João Pinheiro, 2011'],
    ['Membro julgador', 'Conselho de Contribuintes Rec. Tributários (CART)'],
    ['Ex-gerente', 'Fundo de Previdência do Município de Belo Horizonte'],
    ['Ex-assessor', 'Secretaria de Recursos Humanos de BH e Procuradoria-Geral de Belo Horizonte'],
  ],
  emails: ['gleison@reisereis.com', 'gleison@adv.oabmg.org.br'],
};

// Ordem e textos da página Equipe do site atual. Um colaborador de Família e Sucessões aparece lá sem nome e com a foto
// preta; ficou de fora até o escritório confirmar.
export const equipe = [
  { nome: 'Gleison Assis Reis', papel: 'Advogado. Professor.', areas: 'Direito Empresarial, Tributário e Bancário', foto: 'gleison', liga: ['direito-empresarial', 'direito-bancario', 'direito-tributario'] },
  { nome: 'Geraldo Maciel Mendes', papel: 'Advogado.', areas: 'Direito do Trabalho e Direito Civil', foto: 'geraldo', liga: [] },
  { nome: 'Andre Couto e Gama', papel: 'Advogado. Professor.', areas: 'Contratos e Direito do Trabalho', foto: 'andre', liga: ['direito-empresarial'] },
  { nome: 'Cleider Bahia Campos', papel: 'Advogado.', areas: 'Direito Civil e Direito Empresarial', foto: 'cleider', liga: ['direito-empresarial'] },
  { nome: 'Clara Ruggio Vieira', papel: 'Advogada.', areas: 'Direito Penal e Direito Obrigacional', foto: 'clara', liga: [] },
  { nome: 'Sabrina Zamboni', papel: 'Advogada e Professora.', areas: 'LGPD e Direito Constitucional', foto: 'sabrina', liga: [] },
  { nome: 'Priscila Lucchesi', papel: 'Advogada.', areas: 'Direito Civil e Direito Administrativo', foto: 'priscila', liga: ['administrativo-e-previdenciario'] },
];

export const artigos = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'artigos.json'), 'utf8'));
