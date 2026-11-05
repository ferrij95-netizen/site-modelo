// Textos do Colégio Favo, tirados do site atual (colegiofavo.com.br: index.html, kids.html e as artes em img/).
// Muitos textos do site atual estão dentro de imagens (png3, png6favo, missao1, visao1, valores1, coord*.png); foram transcritos aqui.
export const escola = {
  nome: 'Colégio Favo',
  nomeKids: 'Colégio Favo de Mel Kids',
  bairro: 'Cabula',
  endereco: 'R. Silveira Martins, 208 B',
  cidade: 'Salvador',
  uf: 'BA',
  cep: '41150-000',
  tel: '(71) 3384-8118',
  telHref: '+557133848118',
  whats: '5571997061085',
  cel: '(71) 99706-1085',
  email: 'atendimento@colegiofavo.com.br',
  instagram: 'https://www.instagram.com/colegiofavo.oficial/',
  facebook: 'https://www.facebook.com/colegiofavo.oficial/',
  portal: 'http://www.colegiofavo.com.br/portal-185.html',
  calendario: 'http://www.colegiofavo.com.br/img/calendario.pdf',
  antigo: 'http://www.colegiofavo.com.br/',
  url: 'https://colegiofavo.overtus.com.br/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Col%C3%A9gio+Favo+R.+Silveira+Martins+208+Cabula+Salvador',
  mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.185320778345!2d-38.47013638517818!3d-12.959990390863489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161af7de2d5c2b%3A0xa33a6cebc6580872!2sCol%C3%A9gio%20Favo!5e0!3m2!1spt-BR!2sbr!4v1580489548646!5m2!1spt-BR!2sbr',
  slogan: 'Novos desafios e a qualidade de ensino de sempre.',
  anos: 38,
};

export const textos = {
  colegio: [
    'É com grande alegria que partimos para mais uma caminhada rumo aos 38 anos em educação.',
    'Esta alegria aumenta quando percebemos o quanto o nosso Colégio é conceituado, pois os senhores nos escolheram para “cuidar” do seu bem maior: seu filho. Além das inúmeras experiências que nossos alunos vivenciam desde a Educação Infantil à 3ª série do Ensino Médio, a infraestrutura do Colégio Favo é, sem dúvida, um dos nossos maiores diferenciais.',
    'O cuidado em oferecer um espaço físico completo, com um avançado recurso tecnológico, além de uma Proposta Pedagógica diferenciada, demonstra a nossa preocupação com a formação integral dos nossos alunos.',
    'Nossa meta é educar para desenvolver indivíduos plenos, capazes de interagir com o mundo que os cerca, a partir de uma sólida base de conhecimento e cidadania. Sentimo-nos orgulhosos por podermos fazer parte do seu crescimento, formação e, portanto, da sua história.',
  ],
  proposta: [
    'Nossa Proposta Pedagógica alicerça-se na visão sócio-interacionista, na qual valorizamos a formação e a interação do ser humano na sociedade. Os Projetos Interdisciplinares acontecem sistematicamente, dando suporte às diversas áreas do conhecimento.',
    'Durante o ano letivo, o nosso Colégio realiza diversos Projetos que colaboram com o desenvolvimento das áreas do conhecimento, fazendo com que a aprendizagem seja significativa.',
  ],
  tecnologia: 'No Favo seu filho tem toda a estrutura tecnológica e pedagógica necessária durante todo o ano.',
  citacao: { texto: 'Educar não é ensinar respostas. Educar é ensinar a pensar.', autor: 'Rubem Alves' },
  portal: 'Ambiente virtual de serviços destinado aos pais, responsáveis e alunos. Nele você tem acesso a tarefas, notas, grade de aulas e boletos.',
  calendario: 'Calendário escolar do ano letivo, com a organização do trabalho pedagógico.',
};

export const filosofia = [
  { t: 'Missão', p: 'Formar cidadãos críticos, que possam cultivar valores e desenvolver competências e conhecimentos vitais à vida social e profissional, com modernidade, eficiência e disciplina.' },
  { t: 'Visão', p: 'Ser reconhecido como colégio referência no bairro do Cabula e arredores, pela qualidade humana e acadêmica dos serviços educacionais prestados, a partir da utilização diferenciada da tecnologia e da visão sócio-interacionista.' },
  { t: 'Valores', p: 'Proporcionar experiências educativas e sociais com profissionais qualificados são deveres seguidos por todos os funcionários do colégio, para que seus valores sejam bem fomentados pela instituição.', itens: ['Respeito ao aluno', 'Respeito à infraestrutura escolar', 'Respeito à metodologia que atende aos novos paradigmas do mundo atual'] },
];

// Etapas e coordenações: placas da escola (estrutura/5.png: "Entrada G2, G3, G4 e G5, 1º ao 5º ano Fund I") e artes coord*.png.
export const etapas = [
  { id: 'infantil', nome: 'Educação Infantil', sub: 'Colégio Favo de Mel Kids', series: 'Grupos 2, 3, 4 e 5', texto: 'A primeira casa da criança no Favo: salas do Infantil, parque, área com grama sintética e projetos de leitura e linguagem oral vividos com a família.', coord: 'Coordenação da Educação Infantil', email: 'joseneide@colegiofavo.com.br', foto: 'est-17' },
  { id: 'fund1', nome: 'Ensino Fundamental I', sub: 'Colégio Favo de Mel Kids', series: '1º ao 5º ano', texto: 'Alfabetização e as bases de todas as áreas, com material do sistema FTD, salas climatizadas e o Projeto Literário.', coord: 'Coordenação do Fundamental I', email: 'elen@colegiofavo.com.br', foto: 'est-21' },
  { id: 'fund2', nome: 'Ensino Fundamental II', sub: 'Colégio Favo', series: '6º ao 9º ano', texto: 'Mais autonomia, aulas em campo, campeonato estudantil e o Favo Compartilha, que junta alunos, mídias sociais e saberes.', coord: 'Coordenação do 6º ao 8º ano', email: 'josy@colegiofavo.com.br', foto: 'est-20' },
  { id: 'medio', nome: 'Ensino Médio', sub: 'Colégio Favo', series: '1ª à 3ª série', texto: 'Pavilhão próprio, com entrada, corredor e salas do Ensino Médio, e preparação para o ENEM e os vestibulares.', coord: 'Coordenação do 9º ano ao Médio', email: 'cristiane@colegiofavo.com.br', foto: 'est-29' },
];
export const direcao = [
  { cargo: 'Direção geral', email: 'rita@colegiofavo.com.br' },
  { cargo: 'Direção pedagógica', email: 'luciana@colegiofavo.com.br' },
];

export const projetos = {
  colegio: [
    { t: 'Aulas em Campo', p: 'Promovem uma aprendizagem dinâmica, aliando a teoria e a prática.' },
    { t: 'Escola e Família', p: 'Tem o objetivo de promover a integração entre as famílias e a escola.' },
    { t: 'Campeonato Estudantil', p: 'Um momento esportivo de integração, despertando a consciência sobre a importância da prática esportiva.' },
    { t: 'Projeto Literário', p: 'Propicia ao aluno, de forma lúdica, a experiência com o livro em estudo.' },
    { t: 'Favo Compartilha', p: 'Promove a integração entre os nossos alunos, as mídias sociais e os saberes.' },
    { t: 'Projeto Expo', p: 'Acontece no 2º semestre e culmina num “Show Musical”, desenvolvendo as habilidades necessárias para a formação integral.' },
  ],
  kids: [
    { t: 'Roda de Leitura', p: 'Desperta o prazer pelo mundo da leitura.' },
    { t: 'Mala Surpresa', p: 'Desenvolve a linguagem oral através das experiências vividas em família.' },
    { t: 'Projeto Literário', p: 'Propicia à criança, de forma lúdica, a experiência com o livro em estudo.' },
    { t: 'Projeto Expo', p: 'No 2º semestre, termina num “Show Musical” que desenvolve as habilidades para a formação integral.' },
  ],
};

// Fotos da estrutura (img/estrutura/N.png do site atual), com os nomes que estavam escritos na faixa de cada foto.
export const estrutura = [
  { area: 'Chegada e convivência', fotos: [[1, 'Entrada principal'], [2, 'Acesso à secretaria'], [10, 'Área arborizada'], [12, 'Amplo espaço'], [8, 'Área de convivência'], [9, 'Cantina']] },
  { area: 'Salas de aula', fotos: [[20, 'Salas com projetores'], [21, 'Salas climatizadas'], [22, 'Salas do Grupo 2'], [23, 'Salas do Infantil'], [27, 'Curso de inglês Clever Up'], [28, 'Sala do curso de inglês']] },
  { area: 'Educação Infantil', fotos: [[19, 'Fachada do Infantil'], [16, 'Parque infantil'], [17, 'Área do Infantil'], [18, 'Área com grama sintética']] },
  { area: 'Esporte', fotos: [[14, 'Piscina'], [15, 'Quadra poliesportiva']] },
  { area: 'Ensino Médio e pavilhões', fotos: [[13, 'Entrada do Ensino Médio'], [6, 'Acesso ao Ensino Médio'], [7, 'Corredor do Ensino Médio'], [29, 'Sala do Ensino Médio'], [4, 'Pavilhão Raimundo Eloy'], [24, 'Pavilhão Lúcia Almeida']] },
];

export const parceiros = [
  { img: 'parc-ftd', nome: 'FTD Sistema de Ensino', p: 'Material didático e plataforma do sistema FTD.' },
  { img: 'parc-cleverup', nome: 'Clever Up', p: 'Curso de inglês com sala própria dentro do colégio.' },
  { img: 'parc-esporte', nome: 'SS Esporte e Lazer', p: 'Atividades esportivas e de lazer.' },
];

export const orgulho = { nome: 'Pedro Carreiro', curso: 'Comunicação Social, Jornalismo, na UFBA', nota: '920', prova: 'na redação do ENEM' };
