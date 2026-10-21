// Textos e dados da SBS Engenharia, copiados do site atual (sbsengenharia.com.br) em 21/10/2026.
// O que foi escrito pela Overtus está marcado com "nosso" nos comentários.

export const empresa = {
  nome: 'SBS Engenharia',
  completo: 'SBS Engenharia e Construções S.A.',
  url: 'https://sbsengenharia.overtus.com.br/',
  antigo: 'http://www.sbsengenharia.com.br/',
  fundacao: 1982,
  slogan: 'Grandes obras. Grandes realizações.',
  solidez: 'Solidez que inspira confiança.',
  unidades: [
    { nome: 'Escritório central', cidade: 'Porto Alegre, RS', rua: 'Rua Professor Pedro Santa Helena, 650', bairro: 'Bairro Jardim do Salso', cep: 'CEP 91410-150',
      fones: [{ t: '(51) 3334-8512', h: '+555133348512' }], mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Professor+Pedro+Santa+Helena+650+Porto+Alegre+RS' },
    { nome: 'Central de Equipamentos', cidade: 'Capão do Leão, RS', rua: 'Rua Manoel dos Santos Victória, 513', bairro: 'Bairro Centro', cep: 'CEP 96160-000',
      fones: [{ t: '(53) 3275-1565', h: '+555332751565' }, { t: '(53) 3275-1648', h: '+555332751648' }], mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Manoel+dos+Santos+Victoria+513+Capao+do+Leao+RS' },
  ],
  locacaoFones: [{ t: '(53) 3275-1648', h: '+555332751648' }, { t: '(53) 9582-6002', h: '+555395826002' }],
  social: {
    facebook: 'https://www.facebook.com/sbsengenhariaeconstrucoes',
    linkedin: 'http://www.linkedin.com/company/sbs-engenharia-e-contru-es-sa',
  },
  restrito: [
    { nome: 'Webmail', url: 'https://mail.google.com/a/sbsengenharia.com.br' },
    { nome: 'Senior (ERP)', url: 'https://orion.seniorcloud.com.br/' },
    { nome: 'OnQualit', url: 'https://web2.onqualit.com/app_Login/' },
  ],
  cartilha: 'http://www.sbsengenharia.com.br/img/cartilha_conduta.pdf',
  igualdade: 'http://www.sbsengenharia.com.br/rptsalsbs.pdf',
  denuncia: 'https://sbsengenharia.becompliance.com/compliance/canal-denuncias',
};

// Frases das faixas do banner da página inicial do site atual.
export const banners = [
  { tit: 'Grandes obras. Grandes realizações.', txt: 'Conheça o Grupo SBS, que atua em diversas frentes e firma, diariamente, presença em importantes polos nacionais e internacionais.', foto: 'br-392-lote-03-2' },
  { tit: 'Desenvolvimento do país', txt: 'O Brasil cresceu, mas as distâncias estão cada vez menores. A SBS acredita nisso a cada rodovia entregue nos mais diferentes lugares do Brasil.', foto: 'rs-377-4' },
  { tit: 'Energia', txt: 'A SBS tem energia de sobra pra pensar no futuro. Por isso, investe em obras que geram energia limpa e renovável. É benefício para a população local e para o planeta.', foto: 'pch-salto-das-flores-4' },
  { tit: 'Projeto Pescar', txt: 'A SBS acredita no futuro. É por isso que conhecimento, treinamento e oportunidade continuam sendo nossa missão a cada turma formada no Projeto Pescar.', foto: 'br-116-1' },
];

export const segmentos = [
  { id: 'aeroportuarias', ico: 'aeroportuarias', nome: 'Obras aeroportuárias', curto: 'Conheça a execução de obras de infraestrutura e construção realizadas pela SBS no setor.',
    texto: 'O Brasil é um país gigante e em crescimento. As mudanças na realidade econômica do país fizeram com que mais aeroportos precisassem ser construídos e as distâncias fossem encurtadas. Pensando nisso, a SBS diversifica seu portfólio atuando em obras de infraestrutura e construção de aeroportos.',
    clientesRot: 'Clientes com obras entregues', clientes: ['V Comar', 'Infraero', 'Setur-CE'], foto: 'aeroporto-jericoacoara-5' },
  { id: 'rodoviarias', ico: 'rodovias', nome: 'Obras rodoviárias', curto: 'A SBS executa obras individualmente e em parceria com outras empresas do mercado.',
    texto: 'As rodovias são a principal forma de escoamento de produções, transporte de passageiros e ligação entre cidades em nosso país. É por isso que a SBS dedica um setor exclusivo para obras rodoviárias, executando projetos de infraestrutura, terraplenagem, pavimentação, recuperação, conservação e manutenção de rodovias para concessionárias e órgãos públicos.',
    clientesRot: 'Principais clientes', clientes: ['Ecosul', 'Ecovia', 'DNIT', 'DAER', 'DER/PR'], foto: 'br-392-lote-03-3' },
  { id: 'viarias', ico: 'viarias', nome: 'Obras viárias', curto: 'O grupo executa obras de infraestrutura e pavimentação de vias em municípios nos estados do Rio Grande do Sul e do Paraná.',
    texto: 'Dentro das cidades, também existe a necessidade de melhoria, manutenção e incremento da pavimentação urbana. Cada projeto conta com os padrões de exigência da população e por isso torna-se de grande importância, independente do tamanho.',
    clientesRot: 'Municípios atendidos', clientes: ['Porto Alegre', 'Pelotas', 'Capão do Leão', 'Rio Grande', 'Canoas', 'Morretes', 'Paranaguá', 'Matinhos'], foto: 'vala-do-leao-4' },
  { id: 'civil', ico: 'civil', nome: 'Construção civil', curto: 'O Grupo SBS realiza obras de construção de condomínios comerciais e residenciais, escolas, pavilhões, terminais de ônibus, entre outras.',
    texto: 'Sendo a origem do seu negócio, o Grupo SBS realiza obras de construção de condomínios comerciais e residenciais, escolas, pavilhões, terminais de ônibus, entre outras. Todas essas obras estão ligadas com o dia a dia da população, unindo grandes projetos com as necessidades da comunidade em qualquer parte do Brasil.',
    clientesRot: 'Tipos de obra', clientes: ['Condomínios comerciais e residenciais', 'Escolas', 'Pavilhões', 'Terminais de ônibus'], foto: 'sede-concepa-terminal-triangulo-2' },
  { id: 'energia', ico: 'energia', nome: 'Energia renovável', curto: 'Pensando na necessidade de sustentabilidade em todos os setores, o grupo SBS atua na construção de usinas geradoras de energia.',
    texto: 'Em sintonia com a necessidade de sustentabilidade em todos os setores, o grupo SBS investe na construção de fontes de energia renovável. A energia gerada nesses locais é distribuída para a população local e contribui para o abastecimento geral das regiões em que estão inseridas. Tudo isso, pensando nas mudanças que a SBS deseja para o mundo e fazendo a sua parte nesse processo.',
    clientesRot: 'Obra entregue', clientes: ['PCH Salto das Flores, 6,7 MW'], foto: 'pch-salto-das-flores-3' },
  { id: 'locacao', ico: 'locacao', nome: 'Locação de equipamentos', curto: 'A SBS Engenharia oferece ao mercado que necessita de soluções rápidas a locação de sua extensa e qualificada frota de equipamentos.',
    texto: 'Em consonância com sua política de trabalho, a SBS disponibiliza aos clientes a garantia de estar locando um equipamento moderno, equipado e com plano de manutenções regulares, contribuindo para o melhor desempenho de sua obra.',
    clientesRot: 'Central de Equipamentos', clientes: ['Capão do Leão, RS'], foto: null },
];

// Principais obras, na ordem da página "Principais obras" do site atual. Fotos: public/assets/img/obras/<slug>-<n>.webp
// local/uf/pontos (cidades no mapa) e "dado" (número de destaque, tirado do texto) são organização nossa.
export const obras = [
  { slug: 'br-116', seg: 'rodoviarias', fotos: 4, curto: 'BR-116, Lote 08', titulo: 'Ampliação de capacidade da BR-116, Lote 08',
    local: 'Turuçu a Pelotas', uf: 'RS', pontos: ['Turuçu', 'Pelotas'], dado: { n: 'Lote 08', t: 'duplicação Turuçu–Pelotas' },
    texto: ['Trecho entre Turuçu e Pelotas. Esta obra é a solução para um dos maiores gargalos rodoviários do sul do país: a BR-116 é o principal acesso à única zona portuária do Rio Grande do Sul.'] },
  { slug: 'br-392-contorno', seg: 'rodoviarias', fotos: 4, curto: 'BR-392, Contorno de Pelotas', titulo: 'Ampliação de capacidade da BR-392, Contorno de Pelotas, Lote 02',
    local: 'Contorno de Pelotas', uf: 'RS', pontos: ['Pelotas'], dado: { n: 'Lote 02', t: 'contorno de Pelotas' },
    texto: ['Esta obra trará melhorias no acesso à cidade de Pelotas, contribuindo também para facilitar o deslocamento de veículos entre Guaíba e Rio Grande de forma geral.', 'As rodovias BR-116 e BR-392 têm importância não só para o estado, no transporte de mercadorias até o Porto de Rio Grande, mas também no âmbito nacional, pela ligação com o Uruguai.'] },
  { slug: 'ecosul', seg: 'rodoviarias', fotos: 4, curto: 'Polo Rodoviário de Pelotas (Ecosul)', titulo: 'Recuperação, conservação e manutenção do Polo Rodoviário de Pelotas, concedido à Ecosul',
    local: 'Polo Rodoviário de Pelotas', uf: 'RS', pontos: ['Pelotas', 'Rio Grande'], dado: { n: '457,3 km', t: 'de rodovias no polo' },
    texto: ['O Polo Rodoviário de Pelotas possui 457,3 km de extensão e compreende as rodovias BR-116/RS, Camaquã/Pelotas/Jaguarão, com 260,5 km, e BR-392/RS, Rio Grande/Pelotas/Santana da Boa Vista, com 196,8 km.', 'Os serviços executados pela SBS auxiliam na manutenção do padrão de segurança e trafegabilidade para os usuários. As rodovias possuem importante função de interligar a capital ao interior do estado e ao porto de Rio Grande, sendo utilizadas tanto por grande volume de veículos particulares quanto para escoamento de safra.'] },
  { slug: 'br-392-lote-03', seg: 'rodoviarias', fotos: 3, curto: 'BR-392, km 8 a 35 (Lote 03)', titulo: 'Ampliação da capacidade da BR-392 entre os quilômetros 8 e 35 (Lote 03), entre Pelotas e Rio Grande',
    local: 'Pelotas a Rio Grande', uf: 'RS', pontos: ['Pelotas', 'Rio Grande'], dado: { n: '10 mil', t: 'veículos por dia' },
    texto: ['A ampliação desta rodovia significa maior segurança e conforto para os 10 mil veículos que a utilizam diariamente, além de facilitar o fluxo de carga.', 'A BR-392 é a principal via da economia gaúcha. Passam por ela cerca de 70% das mercadorias movimentadas pelo porto de Rio Grande, um dos maiores do país e maior do sul do Brasil.'] },
  { slug: 'aeroporto-jericoacoara', seg: 'aeroportuarias', fotos: 5, curto: 'Aeroporto de Jericoacoara', titulo: 'Construção da pista de pouso e decolagem do Aeroporto de Jericoacoara',
    local: 'Jericoacoara', uf: 'CE', pontos: ['Jericoacoara'], dado: { n: '2.200 m', t: 'de pista, 45 m de largura' },
    texto: ['Construção (Lote 1) do aeroporto do polo turístico de Jericoacoara, no Ceará, compreendendo pista de pouso e decolagem com 2.200 metros de extensão e 45 metros de largura (segunda maior pista do estado), pátio de estacionamento e pista de táxi.', 'Com a conclusão do aeroporto, compreendido em 2 lotes, a região se viabiliza como um grande destino turístico nacional e internacional, pois encurta a distância da capital Fortaleza, que é de 300 km. O aeroporto também serve ao escoamento da produção agrícola da Região Norte e da Serra da Ibiapaba, principalmente a exportação de flores e frutas para a Europa.'] },
  { slug: 'pch-salto-das-flores', seg: 'energia', fotos: 4, curto: 'PCH Salto das Flores', titulo: 'Construção da Pequena Central Hidrelétrica Salto das Flores',
    local: 'Paraíso', uf: 'SC', pontos: ['Paraíso'], dado: { n: '6,7 MW', t: '40 mil famílias abastecidas' },
    texto: ['Concluída em setembro de 2011 com capacidade instalada de 6,7 MW, está abastecendo 40 mil famílias, além de trazer incremento nas receitas do município de Paraíso/SC, onde está instalada.', 'Além disso surge a exploração da potencialidade turística, com o complexo formado pelo lago represado, pelo complexo da barragem e também pelos saltos no Rio das Flores.'] },
  { slug: 'ecovia', seg: 'rodoviarias', fotos: 1, curto: 'Rodovias da Ecovia', titulo: 'Recuperação, conservação e manutenção das rodovias concedidas à Ecovia',
    local: 'Curitiba ao litoral', uf: 'PR', pontos: ['Curitiba', 'Paranaguá'], dado: { n: '175,1 km', t: 'de 2007 a 2014' },
    texto: ['A SBS trabalhou de 2007 a 2014 na recuperação, conservação, manutenção e ampliação da capacidade nos 175,1 quilômetros de estradas entre a capital Curitiba e as cidades litorâneas paranaenses, sendo a principal a BR-277, com grande importância comercial e turística na Região Sul por ligar a capital ao Porto de Paranaguá.', 'O tráfego é de 5,5 milhões de veículos por ano, sendo 35% referente ao transporte de cargas.'] },
  { slug: 'sede-concepa-terminal-triangulo', seg: 'civil', fotos: 3, curto: 'Sede da Concepa e Terminal Triângulo', titulo: 'Construção da sede da Concepa, do Terminal de Ônibus Triângulo na Avenida Assis Brasil e outras grandes obras',
    local: 'Porto Alegre e Cascavel', uf: 'RS · PR', pontos: ['Porto Alegre', 'Cascavel'], dado: { n: '4 andares', t: 'alojamento do V Comar' },
    texto: ['Entre as obras de construção civil realizadas, destaque para a construção de um prédio de 4 andares para alojamento de soldados para o V Comar em Cascavel/PR, a construção de sua própria sede, no bairro Jardim do Salso em Porto Alegre, da sede da Concepa no bairro Navegantes em Porto Alegre/RS e o terminal de ônibus Triângulo na Avenida Assis Brasil em Porto Alegre.'],
    legendas: ['Sede da SBS, Jardim do Salso', 'Terminal Triângulo, Av. Assis Brasil', 'Sede da Concepa, Navegantes'] },
  { slug: 'br-290-freeway', seg: 'rodoviarias', fotos: 4, curto: 'BR-290, Freeway', titulo: 'Ampliação, recuperação, manutenção e conservação da BR-290/RS, Freeway',
    local: 'Osório a Eldorado do Sul', uf: 'RS', pontos: ['Osório', 'Porto Alegre'], dado: { n: 'Freeway', t: 'capital ao litoral' },
    texto: ['Trecho entre Osório e Eldorado do Sul (Freeway). Uma das principais rodovias do estado, com grande fluxo de veículos, liga a capital ao litoral, sendo a principal via de acesso ao estado.'] },
  { slug: 'vala-do-leao', seg: 'viarias', fotos: 4, curto: 'Canalização da Vala do Leão', titulo: 'Execução da canalização da Vala do Leão no município de Canoas/RS',
    local: 'Canoas', uf: 'RS', pontos: ['Canoas'], dado: { n: '2 pistas', t: 'ciclovia e passeios' },
    texto: ['Colocação de galerias de concreto pré-moldadas, 2 pistas laterais, ciclovia e passeios laterais. O processo envolveu também o reassentamento e a indenização das famílias que moravam no local por parte da prefeitura.', 'Desejo antigo da comunidade, esta obra significou grande melhoria na qualidade de vida dos moradores da região.'] },
  { slug: 'rs-377', seg: 'rodoviarias', fotos: 4, curto: 'Implantação da RS-377', titulo: 'Implantação da rodovia RS-377',
    local: 'Alegrete a Manoel Viana', uf: 'RS', pontos: ['Alegrete', 'Manoel Viana'], dado: { n: '38 km', t: 'de rodovia implantada' },
    texto: ['Trecho de 38 km entre os municípios de Alegrete e Manoel Viana, região oeste do estado do Rio Grande do Sul, importante corredor de exportação. Obra realizada após muitas reivindicações das regiões centro e fronteira oeste do estado.'] },
];

export const obrasIntro = 'Inserida no setor de serviços de infraestrutura, a SBS possui significativa participação na região Sul do Brasil, com obras do Rio Grande do Sul ao Paraná.';

// Etapas de uma obra rodoviária: palavras do texto do segmento "Obras rodoviárias"; legendas curtas são nossas.
export const etapas = [
  { n: 'Terraplenagem', t: 'Corte, aterro e regularização do leito da via.', foto: 'aeroporto-jericoacoara-2' },
  { n: 'Infraestrutura', t: 'Drenagem, galerias e obras de arte que sustentam a rodovia.', foto: 'br-116-2' },
  { n: 'Pavimentação', t: 'Base, imprimação e revestimento asfáltico ou em concreto.', foto: 'aeroporto-jericoacoara-4' },
  { n: 'Conservação', t: 'Recuperação e manutenção da rodovia em operação.', foto: 'br-290-freeway-4' },
];

export const institucional = {
  missao: 'Busca contínua do aprimoramento de nossos serviços, através da adoção permanente de novas tecnologias e do cuidado com o meio ambiente, garantindo a satisfação plena de nossos clientes, colaboradores, parceiros, comunidade e acionistas.',
  visao: 'Sermos reconhecidos pela capacidade e cultura empreendedora de nossos colaboradores, por nossa expertise em engenharia e gestão, promovendo crescimento sustentável com rentabilidade e entregando produtos e serviços de máxima qualidade.',
  valores: [
    { n: 'Valorização das pessoas', t: 'Buscamos o comprometimento e o engajamento de nossos colaboradores através do tratamento humano e igualitário, da oferta de estrutura adequada ao trabalho, do alinhamento de expectativas e da prática de políticas de desenvolvimento e remuneração que compensem pelo mérito, promovam os talentos e proporcionem crescimento profissional.' },
    { n: 'Cultura empreendedora', t: 'Promovemos em nossos colaboradores o espírito de dono, para que assumam responsabilidade, sejam eficientes, proativos, busquem constantemente a inovação e o entendimento da estratégia do negócio, tenham foco nas metas e resultados com visão global e sistêmica, procurando sempre fazer o melhor possível com o menor custo.' },
    { n: 'Crescimento sustentável', t: 'Desenvolvemos a SBS com base em políticas de perpetuação dos recursos necessários ao seu crescimento e à manutenção do planeta, mitigando os impactos, prevenindo riscos, incentivando as atitudes de segurança, saúde e preservação do meio ambiente, qualificando pessoas e perseguindo incansavelmente o retorno ao investimento dos acionistas.' },
    { n: 'Foco no cliente', t: 'Entendemos as necessidades de nossos clientes e buscamos superar suas expectativas entregando produtos e serviços com qualidade e estabelecendo relações de parceria.' },
    { n: 'Expertise em engenharia e gestão', t: 'Proporcionamos capacitação e desenvolvimento técnico a todos os nossos colaboradores, oportunizando o desenvolvimento de novas tecnologias e a troca de melhores práticas, para que possamos ser especialistas em gestão e execução de obras de engenharia.' },
    { n: 'Ética', t: 'Agimos sempre de forma idônea, ética e transparente, cumprindo nossas obrigações, promovendo e zelando pela marca SBS.' },
  ],
  politica: 'Fornecer serviços especializados na área de construção de obras rodoviárias, viárias, aeroportuárias, manutenção e restauração de pavimentos, comprometidos em satisfazer as necessidades dos clientes conforme requisitos aplicáveis, otimizando os processos com uso de novas tecnologias, possibilitando a obtenção de resultados financeiros positivos e melhoria contínua do sistema de gestão da qualidade alinhados ao direcionamento estratégico da empresa.',
  escopo: 'Serviços de infraestrutura, implantação de obras aeroportuárias, rodoviárias, viárias, manutenção, conservação, restauração de rodovias e gestão de projetos.',
  historia: [
    'O início da SBS, em 1982, foi marcado por pequenas obras de engenharia e construção civil, passando em seguida a executar obras de terraplenagem, pavimentação e saneamento. Com foco em obras públicas, diversificou seu mercado em meados da década de 90, passando a realizar obras de grande complexidade em clientes públicos e privados.',
    'Nos anos 2000 acompanhou o crescimento econômico do país investindo na ampliação de sua estrutura, aquisição de ferramentas de gestão e na capacitação de sua equipe, fazendo frente aos novos desafios. Executou obras rodoviárias, aeroportuárias, de saneamento e usina de energia renovável, que lhe trouxeram ainda mais experiência e aptidão a desenvolver quaisquer projetos de infraestrutura.',
    'Sua experiência no mercado de concessões incrementou sua expertise, e assim a SBS consolidou-se como uma organização inovadora, de múltiplas capacidades e de excelente desempenho.',
    'Comprometida com ações socioambientais e de responsabilidade social, busca constantemente melhorar o bem-estar de seus públicos, contribuindo para que o ambiente permaneça saudável e perpétuo.',
    'Hoje a SBS conta com uma qualificada e valorosa equipe de colaboradores, um parque de máquinas completo e instalações industriais robustas que fazem frente ao seu volume de obras, além do escritório central que administra e controla seus empreendimentos. Vem se destacando pela solidez diante dos tempos áridos vividos pelo segmento nos últimos anos no Brasil, o que reforça sua grande capacidade de gestão e competência.',
  ],
  certificacao: 'Em um processo de implantação iniciado em 1999, o Sistema de Gestão da Qualidade da SBS aprimorou o desempenho da empresa, que foi certificada em abril de 2001, segundo a norma ISO 9001. A implantação do Sistema trouxe ganho na produtividade, diminuição de custos, aperfeiçoamento dos controles e consequente aumento na qualidade do produto entregue aos clientes. Desde 2007, a SBS conta com uma nova visão do SGQ, gerenciada por equipe especializada, que utiliza a norma como ferramenta para potencializar ainda mais os resultados da empresa.',
  compliance: 'O objetivo do Programa de Compliance SBS Engenharia é regular as relações entre a empresa e seus públicos, mantendo-as em conformidade com seus valores e com as normas e leis às quais se submete.',
  codigo: 'Neste cenário apresentamos nosso Código de Conduta. Redigido com base nos valores que orientam a empresa desde a sua fundação, esta ferramenta estabelece o padrão de comportamento que desejamos para todos aqueles que estão envolvidos em nossa atividade. Buscamos assim assegurar a conformidade dos princípios de governança corporativa e compliance através da atitude transparente e do tratamento adequado das não conformidades detectadas.',
  eficacia: 'A eficácia do Código de Conduta depende da colaboração de todos. É fundamental que a SBS tenha conhecimento sobre eventuais violações ou desvios de conduta para que possa fornecer as orientações adequadas e remediar tais desvios. Para tanto, oferecemos os canais do Comitê de Conduta descritos no Código e o contato através deste site.',
};

// Marcos tirados do texto da página Empresa e da página Principais obras (organização em linha do tempo é nossa).
export const marcos = [
  { ano: '1982', t: 'Início com pequenas obras de engenharia e construção civil; logo depois, terraplenagem, pavimentação e saneamento.' },
  { ano: 'Anos 90', t: 'Diversifica o mercado e passa a realizar obras de grande complexidade para clientes públicos e privados.' },
  { ano: '2001', t: 'Certificação ISO 9001 do Sistema de Gestão da Qualidade, implantado desde 1999.' },
  { ano: '2007', t: 'Começa a conservação das rodovias da Ecovia, 175,1 km entre Curitiba e o litoral do Paraná.' },
  { ano: '2011', t: 'Conclui a PCH Salto das Flores, 6,7 MW em Paraíso, SC.' },
  { ano: '2014', t: 'Institui o Comitê de Compliance e o Código de Conduta.' },
];

export const equipamentos = [
  'Balança Rodoviária', 'Caminhão Comboio de Lubrificação', 'Caminhão Basculante', 'Caminhão Carroceria', 'Caminhão Multidistribuidor de Agregados',
  'Caminhão Espargidor de Asfalto', 'Caminhão de Micropavimento', 'Caminhão Guindaste', 'Caminhão Pipa', 'Caminhão Tanque', 'Cavalo Mecânico',
  'Conjunto de Britagem', 'Escavadeira Hidráulica', 'Fresadora Hidráulica', 'Grade de Disco', 'Mini Carregadeira', 'Motoniveladora', 'Pá Carregadeira',
  'Prancha', 'Retroescavadeira', 'Reboque Rodoviário (Sanitário / Sonda / Placas / Truque)', 'Roçadeira', 'Rolo Corrugado Vibratório', 'Rolo Liso Vibratório',
  'Rolo de Pneus Autopropelido', 'Rolo Tandem', 'Trator Agrícola', 'Trator de Esteiras', 'Usina de Asfalto', 'Usina de Solos', 'Vassoura Hidráulica',
  'Vassoura Mecânica', 'Vibroacabadora',
];

// Grupos da frota (nosso, só para organizar a lista do site atual).
export const gruposFrota = [
  { n: 'Caminhões e transporte', f: e => /^Caminh|Cavalo|Prancha|Reboque/.test(e) },
  { n: 'Terraplenagem', f: e => /Escavadeira|Motoniveladora|Pá Carregadeira|Mini Carregadeira|Retroescavadeira|Trator|Grade/.test(e) },
  { n: 'Pavimentação e compactação', f: e => /Rolo|Vibroacabadora|Fresadora|Vassoura|Usina/.test(e) },
  { n: 'Apoio', f: e => /Balança|Britagem|Roçadeira/.test(e) },
];

export const setoresContato = ['Administrativo', 'Recursos humanos', 'Qualidade', 'Comercial', 'Compras', 'Obras', 'Financeiro', 'TI', 'Outros'];
