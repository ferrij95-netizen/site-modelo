// Textos do site novo da Pato Indústria. Tudo tirado do site atual (patoindustria.com.br) em 2026-10-13,
// com a ortografia corrigida (índice, Transportadores, Antiestáticas). O que falta confirmar está no LEIA-ME.

export const site = {
  nome: 'Pato Indústria',
  slogan: 'Silos e Secadores',
  dominio: 'https://patoindustria.overtus.com.br',
  fones: [
    ['+55 (46) 3223-4556', '+554632234556'],
    ['(46) 3225-8342', '+554632258342'],
    ['(46) 9 9111-2337', '+5546991112337'],
  ],
  whats: '5546991112337',
  whatsTexto: '(46) 9 9111-2337',
  email: 'contato@patoindustria.com.br',
  instagram: 'https://www.instagram.com/patoindustria/',
  unidades: [
    { nome: 'Matriz e fábrica', linhas: ['Rua Getúlio Dalpascoale, nº 300', 'Parque Industrial · Pato Branco/PR', 'CEP 85504-610'], mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Get%C3%BAlio+Dalpascoale+300+Pato+Branco+PR' },
    { nome: 'Unidade Bahia', linhas: ['Rua Burle Marx, nº 2122', 'Jardim Paraíso Fase II · Luís Eduardo Magalhães/BA', 'CEP 47850-000'], mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Burle+Marx+2122+Lu%C3%ADs+Eduardo+Magalh%C3%A3es+BA' },
  ],
  mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57276.310173510305!2d-52.71349568969931!3d-26.204179159949234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e553ebcb953d83%3A0xaca0dfc141e785bc!2sPato%20Industria%20Comercio%20de%20M%C3%A1quinas%20Agr%C3%ADcolas%20-%20Eireli!5e0!3m2!1spt-BR!2sbr!4v1642715864266!5m2!1spt-BR!2sbr',
};

// Menu na mesma ordem do site atual.
export const menu = [
  ['index', 'Home'],
  ['empresa', 'Sobre Nós'],
  ['produtos', 'Linha de Produtos'],
  ['obras', 'Obras Realizadas'],
  ['contato', 'Contato'],
];

export const home = {
  sobretitulo: 'Silo também tem marca!',
  titulo: 'Fabricação, montagem e manutenção de silos e secadores.',
  texto: 'Com sede na cidade de Pato Branco/PR, atuando em todo o Brasil, a PATO INDÚSTRIA atua no setor de agronegócios, na etapa de pós-colheita da cadeia produtiva de grãos.',
  diferenciais: ['Soluções Completas', 'Tecnologia Aplicada', 'Qualidade & Agilidade'],
};

export const historia = [
  'A PATO INDÚSTRIA teve sua constituição no dia 25 de agosto de 1999 em Pato Branco/PR. Iniciou como uma pequena empresa realizando pequenas reformas em elevadores, máquinas de pré-limpeza e secadores. Fabricava caçambas para elevadores, roscas transportadoras, elevadores de caçamba e equipamentos para diversos segmentos da agroindústria.',
  'Visando suprir a crescente demanda do mercado adquiriu suas próprias instalações. Com esta nova unidade, novos produtos começaram a ser fabricados como silos, secadores, estruturas metálicas, máquinas de pré-limpeza, elevadores, transportes helicoidais e equipamentos periféricos.',
  'A empresa passou a realizar execução de toda a parte civil de bases de silos, secadores, moegas, estruturas metálicas e demais itens necessários para uma unidade completa de beneficiamento, secagem e armazenagem.',
  'Recentemente a empresa adquiriu uma usina de concreto móvel juntamente com caminhão betoneira e máquina pá-carregadeira para melhorar a qualidade do concreto em localidades de difícil acesso. Possuímos ainda transporte próprio para realizar nossas entregas.',
  'Atualmente a PATO INDÚSTRIA é reconhecida como uma indústria metalúrgica fabricante de equipamentos robustos, tem como principal característica não só a fabricação, mas também a montagem e a instalação completa dos seus equipamentos em seus destinos. As unidades só são consideradas entregues após o funcionamento completo de toda a linha, e ainda hoje as obras são gerenciadas e acompanhadas pelos fundadores da empresa.',
];

export const mvv = [
  ['Missão', 'Fornecer soluções avançadas e tecnológicas para armazenagem de grãos.'],
  ['Visão', 'Contribuir para o desenvolvimento sustentável da agricultura.'],
  ['Valores', 'Responsabilidade, Inovação, Transparência, Agilidade, Comprometimento.'],
];

export const otimize = {
  titulo: 'Otimize o seu Armazém',
  texto: 'Para manter a qualificação de seu produto é necessário que a armazenagem seja feita com alta tecnologia, responsabilidade e com grandes especialistas da área.',
  itens: [
    ['Eficiência', 'Os espalhadores de grãos instalados são usados para distribuir de maneira homogênea a entrada de grãos e impurezas no silo. Este sistema de homogeneização torna o sistema de aeração mais eficiente, garantindo o melhor fluxo de ar entre os grãos.'],
    ['Durabilidade', 'Oferecemos um serviço especializado com experiência em montagem e manutenção de silos, secadores e equipamentos para armazenagem industrial capaz de solucionar as demandas dos nossos clientes com autonomia no processo e confiança no resultado.'],
    ['Estrutura', 'As paredes dos silos da PATO INDÚSTRIA são corrugadas e construídas com chapas galvanizadas, garantindo resistência, maior durabilidade, redução nos custos operacionais e menor índice de quebra de grãos.'],
    ['Acesso e Segurança', 'Conforme as normas de segurança NR12, os acessos a essas portas são de maneira segura com escadas e plataformas galvanizadas incorporadas às paredes do silo, a escada da parede do silo poderá ser de forma caracol, facilitando o acesso na mesma.'],
  ],
};

// Linha de produtos, na ordem do menu do site atual. fotos = peças das colagens do site atual (a 1ª é a maior).
export const produtos = [
  {
    slug: 'silos-planos', nome: 'Silos Planos', fotos: ['produtos-01-1', 'produtos-01-2', 'produtos-01-3'],
    resumo: 'Armazenagem em longo período com garantia de qualidade e segurança na operação.',
    texto: ['Desenvolvidos conforme as normas vigentes e diferenciais estruturais específicos, os silos da Pato Indústria oferecem ao mercado garantia de qualidade na armazenagem e segurança na operação, próprios para armazenagem em longo período e que garante a qualidade dos grãos, nossos silos planos possuem:'],
    specs: [['Modelos', 'SAG 0400 à SAG 3300'], ['Capacidade (sacas)', '819 à 278.540'], ['Volume (m³)', '49 à 21.634'], ['Diâmetro (m)', '4,58 à 33,0'], ['Altura (m)', '4,70 à 32,02'], ['Inclinação do Telhado (°)', '30'], ['Aeração', 'Canal maior, canal menor, fundo falso quadrado, fundo falso total'], ['Espalhador de Grãos', 'Cinético ou Motorizado'], ['Escadas', 'Marinheiro ou Caracol']],
    extraTitulo: 'Segurança',
    extra: ['Monovia para trole', 'Telha de resgate', 'Pontos de ancoragem interno ao longo da vertical a cada 4 m', 'Pontos de ancoragem interno ao longo do diâmetro do silo (quantidade conforme modelo)', 'Anéis de vento', 'Portas de acesso (telhado e corpo)', 'Guarda corpo no telhado', 'Respiros'],
    destaque: ['278.540', 'sacas no maior modelo'],
  },
  {
    slug: 'silos-elevados', nome: 'Silos Elevados', fotos: ['produtos-02-1', 'produtos-02-2'],
    resumo: 'Produto isolado do solo, longe da umidade e com menos ruptura do grão.',
    texto: ['Os silos elevados são concebidos para armazenamento de cereais, sementes, leguminosas, peletes e outros produtos que requerem condições especiais de armazenamento.', 'O produto armazenado fica isolado do solo, evitando assim a umidade e diminuindo a ruptura do grão.'],
    specs: [['Modelos', 'SEG 0300 à SEG 0900'], ['Capacidade (sacas)', '282 à 13.748'], ['Volume (m³)', '21,28 à 1.037'], ['Diâmetro (m)', '3,67 à 9,16'], ['Altura (m)', '3,97 à 20,21'], ['Inclinação do Telhado (°)', '30'], ['Inclinação do Funil (°)', '45 ou 60'], ['Aeração', 'Ventiladores centrífugos, uso de canaletas'], ['Espalhador de Grãos', 'Cinético ou Motorizado'], ['Escadas', 'Marinheiro ou Caracol']],
    extraTitulo: 'Segurança',
    extra: ['Anéis de vento', 'Portas de acesso (telhado e corpo)', 'Guarda corpo no telhado', 'Respiros'],
    destaque: ['13.748', 'sacas no maior modelo'],
  },
  {
    slug: 'secadores', nome: 'Secadores', fotos: ['produtos-03-1', 'produtos-03-2', 'produtos-03-3'],
    resumo: 'Secador contínuo de fluxo misto, com eficiência e segurança na secagem.',
    texto: ['O secador contínuo de fluxo misto para cereais foi desenvolvido para secar com eficiência e segurança, garantindo a integridade e a alta qualidade dos grãos.'],
    specs: [['Modelos', 'SEC 10 ao SEC 200'], ['Fluxos de Ar', 'Dupla Recirculação'], ['Tipo de Torre', 'Cavalete ou Coluna'], ['Capacidade (ton/h)', '10 à 200'], ['Potência Instalada (cv)', '15 à 150'], ['Sensor de Nível', 'Máximo e Mínimo'], ['Sensor de Temperatura', 'Sim'], ['Carga', 'Gravitacional ou Transportador']],
    extraTitulo: 'Segurança',
    extra: ['Monitoramento da operação para melhor rendimento de secagem', 'Monitora quantas t/h está saindo do secador', 'Segurança na operação com qualidade de secagem', 'Alarmes de eventos e de manutenções preventivas'],
    destaque: ['200 t/h', 'no maior modelo'],
  },
  {
    slug: 'maquina-de-pre-limpeza', nome: 'Máquina de Pré-Limpeza', fotos: ['produtos-04-1'],
    resumo: 'Mais qualidade nos grãos armazenados e menos consumo de energia nos secadores.',
    texto: [
      'As máquinas de pré-limpeza e limpeza de cereais são equipamentos de fundamental importância em unidades armazenadoras de grãos, pois além de aumentarem a qualidade dos grãos armazenados, diminuem o consumo de energia dos secadores.',
      'Totalmente metálicas, elas são desenhadas para suportar regime de trabalho pesado, com mais economia e sem perda na qualidade final de limpeza.',
      'O sistema de limpeza atua por peneiramento, no qual são retiradas as impurezas maiores e menores independentes do peso, e por aspiração, em que são retiradas as impurezas leves através de ventiladores.',
      'Possuem sistema de captação de pó através de ciclone ou filtro de manga, acompanhados de tubulação para ligação da máquina ao sistema de captação. Suas peneiras são intercambiáveis e de fácil troca, podendo trabalhar com diversos tipos de cereais. As impurezas das peneiras e da calha de aspiração são coletadas manualmente ou podem ter sua coleta automatizada.',
      'O objetivo da máquina de pré-limpeza e limpeza de cereais concentra-se em eliminar o maior número possível de impurezas para oferecer uma boa secagem e/ou armazenamento.',
    ],
    specs: [['Modelos', 'MPL 20 à MPL 240'], ['Capacidade (ton/h)', '20 à 240'], ['Altura (m)', '3,5 à 7,90'], ['Área de Peneiras (m²)', 'Até 35'], ['Potência Instalada (cv)', '7,5 + 1,5 a 12,5 + 4 x 2,0']],
    extraTitulo: 'Segurança',
    extra: ['Acompanha ciclone coletor de pó'],
    destaque: ['240 t/h', 'no maior modelo'],
  },
  {
    slug: 'elevadores', nome: 'Elevadores', fotos: ['produtos-05-1', 'produtos-05-2', 'produtos-05-3'],
    resumo: 'Transporte vertical de granel econômico, compacto e de montagem rápida.',
    texto: ['Um dos meios mais econômicos no transporte vertical de material a granel, os elevadores apresentam inúmeras vantagens, pois estão disponíveis em uma linha completamente padronizada, possuem dimensões compactas, ocupando o mínimo de espaço mesmo para elevadas capacidades, podem ser instalados a céu aberto, e o custo, tempo de entrega e de montagem, são reduzidos.'],
    specs: [['Modelos', 'ELV 20 ao ELV 300'], ['Capacidade (ton/h)', '20 à 300'], ['Altura Máxima (m)', 'Até 56 (conforme modelo)'], ['Velocidade (m/s)', '1,30 à 3,6'], ['Potência (cv)', '1,5 à 100'], ['Plataforma', 'Superior e Intermediária'], ['Janelas', 'Inspeção e Alívio de Pressão'], ['Correia', '3 ou 4 Lonas Antiestáticas e Antichamas']],
    destaque: ['56 m', 'de altura máxima'],
  },
  {
    slug: 'fitas-transportadoras', nome: 'Fitas Transportadoras', fotos: ['produtos-06-1', 'produtos-06-2', 'produtos-06-3'],
    resumo: 'Correias para cereais a granel, farelos e peletizados, com mínimo dano mecânico.',
    texto: ['As correias transportadoras são utilizadas para o transporte de cereais a granel, farelos e produtos peletizados, atendendo as diversas capacidades de movimentação, com mínimo de danos mecânicos aos produtos.'],
    specs: [['Modelos', 'FTP 30 à FTP 400'], ['Capacidade (ton/h)', '30 à 400'], ['Comprimento (m)', '5 à 150'], ['Descarga', 'Padrão ou Tripper'], ['Potência (cv)', '1,5 à 50'], ['Correia', '2 ou 3 Lonas Antiestáticas e Antichamas']],
    destaque: ['400 t/h', 'no maior modelo'],
  },
  {
    slug: 'transportador-de-correntes-redler', nome: 'Transportador de Correntes Redler', curto: 'Correntes Redler', fotos: ['produtos-07-1', 'produtos-07-2'],
    resumo: 'Força e resistência, desgaste menor e baixo custo de manutenção mecânica.',
    texto: ['É uma corrente que combina força e resistência, diminui o desgaste garantindo uma vida útil prolongada.', 'É uma corrente com baixo custo de manutenção mecânica.'],
    specs: [['Modelos', 'RED 60 à RED 400'], ['Capacidade (ton/h)', '60 à 400'], ['Comprimento (m)', '5 à 120'], ['Descarga', 'Padrão ou Tripper'], ['Potência (cv)', '1,5 à 60'], ['Inclinação Máxima (°)', '12'], ['Registro', 'Manual']],
    destaque: ['400 t/h', 'no maior modelo'],
  },
  {
    slug: 'tulhas', nome: 'Tulhas', fotos: ['produtos-08-1', 'produtos-08-2'],
    resumo: 'Praticidade no carregamento e na expedição dos grãos para os caminhões.',
    texto: ['As tulhas metálicas dão praticidade ao carregamento e expedição dos grãos na logística de transporte dos caminhões.'],
    specs: [['Modelos', 'CEX 40 à CEX 120'], ['Capacidade (ton)', '40, 80 e 120'], ['Descarga', '2, 4 ou 6']],
    destaque: ['120 t', 'no maior modelo'],
  },
  {
    slug: 'transportador-helicoidal', nome: 'Transportador Helicoidal', fotos: ['produtos-09-1'],
    resumo: 'Carga e descarga de silos e secadores em sistema fechado e de baixa manutenção.',
    texto: ['Os Transportadores Helicoidais podem ser utilizados para diversas aplicações, principalmente carga e descarga de silos, descarga de secadores e outros usos semelhantes.', 'Aplicação simples, baixo custo de manutenção, sistema fechado com baixo índice de poluição ambiental.'],
    extraTitulo: 'Funcionalidades',
    extra: ['O transportador helicoidal, ou rosca sem fim, transporta os grãos através do movimento de rotação de um helicoide, que pode ser direito ou esquerdo.', 'O grão é deslocado, por arraste, no sentido longitudinal do transportador até o bocal de descarga.', 'Indicado para pequenas e médias distâncias, podendo ser utilizado para transporte horizontal e com inclinação máxima de 25°.', 'Sua carga e descarga intermediária pode ser instalada em qualquer ponto de seu comprimento.', 'Este modelo de transportador apresenta características favoráveis como a baixa emissão de partículas, instalação versátil e econômica entre outras.'],
    destaque: ['25°', 'de inclinação máxima'],
  },
  {
    slug: 'estrutura-metalica', nome: 'Estrutura Metálica', fotos: ['produtos-10-1'],
    resumo: 'Estruturas para silos verticais e horizontais, com mais espaço útil.',
    texto: ['Os silos horizontais e verticais são especificados quanto à capacidade de armazenagem, rotatividade do material em estoque, espaço disponível, custos de investimento e manutenção, velocidade de depósito e descarga, etc.', 'A estrutura metálica utilizada em silos verticais permite uma menor interferência entre o sistema estrutural e os sistemas de armazenagem e transporte.', 'Para a construção de silos horizontais a utilização das estruturas metálicas é a solução mais adequada pela geometria peculiar, menor esforço sobre a fundação, maior espaço útil, etc.'],
    destaque: ['Civil + metal', 'bases, moegas e estruturas'],
  },
];

// Etapas de uma unidade de pós-colheita, montadas só com os equipamentos que a Pato fabrica
// (mesma sequência das listas de "Detalhes da Obra" do site atual).
export const fluxo = [
  ['Recebimento', 'Moega e estrutura metálica', ['estrutura-metalica']],
  ['Pré-limpeza', 'Peneiramento e aspiração', ['maquina-de-pre-limpeza']],
  ['Secagem', 'Fluxo misto, dupla recirculação', ['secadores']],
  ['Movimentação', 'Elevadores, fitas, redler e roscas', ['elevadores', 'fitas-transportadoras', 'transportador-de-correntes-redler', 'transportador-helicoidal']],
  ['Armazenagem', 'Silos planos e elevados', ['silos-planos', 'silos-elevados']],
  ['Expedição', 'Tulhas para caminhões', ['tulhas']],
];

// Unidades entregues, na ordem dos cartões da home do site atual (obra_1, obra_3, obra_4, obra_2).
export const obras = [
  { n: 1, cidade: 'Correntina/BA', capa: 'obra-capa-1', fotos: ['obras-01-1'], itens: ['Estrutura Metálica de 24x30 m', 'Moega de 15.000 scs', 'Silo Pulmão Secador de 15.000 scs', '2 Máquinas de Pré-Limpeza de 120 ton/h', '1 Secador de 120 ton/h', '5 Elevadores de 240 ton/h', 'Transportadores de correia de 240 ton/h', '02 Silos 100.000 scs + 01 Silo de 100.000 scs', 'Caixa de Expedição de 120 ton', 'Balança Rodoviária de 30 m/120 ton'] },
  { n: 3, cidade: 'Correntina/BA', capa: 'obra-capa-3', fotos: ['obras-03-1', 'obras-03-2', 'obras-03-3'], itens: ['Estrutura Metálica de 24x30 m', 'Moega de 10.000 scs', 'Silo Pulmão Secador de 20.000 scs', '1 Máquina de Pré-Limpeza de 120 ton/h', '1 Secador de 120 ton/h', '04 Elevadores de 120 ton/h', 'Transportadores de Correia de 120 ton/h', '03 Silos 100.000 scs', 'Caixa de Expedição de 80 ton', 'Balança Rodoviária de 31 m/120 ton'] },
  { n: 4, cidade: 'Correntina/BA', capa: 'obra-capa-4', fotos: ['obras-04-1'], itens: ['Estrutura Metálica de 24x30 m', 'Moega de 10.000 scs', 'Silo Pulmão Secador de 10.000 scs', '1 Máquina de Pré-Limpeza de 120 ton/h', '1 Secador de 100 ton/h', '05 Elevadores de 120 ton/h', 'Transportadores de Correia de 120 ton/h', '03 Silos 50.000 scs', 'Caixa de Expedição de 80 ton', 'Balança Rodoviária de 31 m/120 ton'] },
  { n: 2, cidade: 'Correntina/BA', capa: 'obra-capa-2', fotos: ['obras-02-1'], itens: ['Silo Pulmão Secador de 15.000 scs', '1 Máquina de Pré-Limpeza de 120 ton/h', '03 Silos 75.000 scs', '01 Caixa de Expedição'] },
];

export const obrasTexto = {
  sub: 'Grandes obras para grandes colheitas. As unidades só são consideradas entregues após o funcionamento completo de toda a linha.',
  detalhe: 'Há infinitas maneiras de transformar sua produtividade, modernizar e alcançar novos patamares. Tudo o que desenvolvemos tem como objetivo aumentar a produtividade dos produtores que procuram maneiras mais modernas e eficientes de cuidar dos seus grãos armazenados.',
};
