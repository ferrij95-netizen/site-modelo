// Textos e dados da Class-Service. Tudo que vem do site atual (class-service.com.br) está marcado "site atual";
// o resto é texto nosso, escrito a partir dessas informações.
export const empresa = {
  nome: 'Class-Service',
  url: 'https://classservice.overtus.com.br/',
  antigo: 'http://class-service.com.br/',
  // site atual (rodapé e página Mapa do Site)
  endereco: ['Av. José Maria Whitaker, 1220', 'Planalto Paulista · São Paulo, SP', 'CEP 04057-000'],
  referencia: 'Paralela à Av. Indianópolis, perto da Av. 23 de Maio e do Aeroporto de Congonhas',
  fones: [{ n: '(11) 5078-6567', h: '+551150786567' }, { n: '(11) 2592-1577', h: '+551125921577' }],
  whats: { n: '(11) 99252-4408', wa: '5511992524408' },
  email: 'tec.wagner@class-service.com.br',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Class-Service+Av.+Jos%C3%A9+Maria+Whitaker+1220+S%C3%A3o+Paulo',
  mapaEmbed: 'https://www.google.com/maps?q=Av.+Jos%C3%A9+Maria+Whitaker,+1220+-+Planalto+Paulista,+S%C3%A3o+Paulo+-+SP,+04057-000&z=16&output=embed',
  fundacao: 2007,
  desde: 1998,
  // Google Maps, outubro de 2026
  nota: '4,8', avaliacoes: 90,
};

// site atual, página Class-Services ("Agradecimentos"), com acentos corrigidos
export const historia = [
  'A Class-Service foi fundada em 2007 por profissionais que trabalhavam em concessionária Mercedes-Benz desde 1998, com cursos técnicos especializados pela fábrica.',
  'Montamos uma equipe com excelentes técnicos, altamente treinados e especializados, e equipamos a empresa com aparelhos especiais, para proporcionar o máximo de qualidade e de tecnologia avançada aos automóveis Mercedes-Benz.',
  'Não somos homologados, porém seguimos os critérios e a metodologia de trabalho conforme as especificações da fábrica. Trabalhamos com peças genuínas e de primeira linha.',
];
export const filosofia = 'Nossa filosofia: promover um trabalho honesto e seguro, para garantir tranquilidade e satisfação aos nossos clientes.';
export const agradecimento = 'Dedicamos o mérito a todos que participaram para fazer a diferença, tornando-se assim parte da nossa família Class-Service.';
export const parceirosFrase = 'As colunas de uma empresa são formadas das estruturas de seus parceiros.';

// site atual, Serviços > Assistência Técnica (os 7 itens, na ordem). "curta" é texto nosso.
export const servicos = [
  { slug: 'consultoria', nome: 'Consultoria técnica', curta: 'Antes de qualquer serviço, um técnico conversa com você sobre o histórico do carro, o que ele está apresentando e o que vale a pena fazer agora ou depois.', foto: 'mecanico-1' },
  { slug: 'apresentacao', nome: 'Apresentação técnica do veículo', curta: 'Mostramos no próprio carro o que foi encontrado e o que foi feito, peça por peça, para você entender cada item do orçamento.', foto: 'interior-e' },
  { slug: 'diagnostico', nome: 'Diagnóstico eletrônico avançado', curta: 'Leitura completa dos módulos eletrônicos do Mercedes-Benz com equipamento dedicado, para achar a causa e não só apagar a falha.', foto: 'interior-s' },
  { slug: 'plataforma', nome: 'Plataforma com seguro', curta: 'Precisa trazer o carro até a oficina? Fazemos o transporte em plataforma, com seguro.', foto: 'elevador' },
  { slug: 'revisao', nome: 'Revisão preventiva e reparativa', curta: 'Revisões no plano da fábrica e reparos de motor, câmbio, suspensão e freios. Também atendemos veículos multimarcas.', foto: 'motor-c' },
  { slug: 'alinhamento', nome: 'Alinhamento técnico e balanceamento', curta: 'Alinhamento computadorizado Beissbarth com inclinômetro, homologado pela Mercedes-Benz, e balanceamento das rodas.', foto: 'alinhamento' },
  { slug: 'laudo', nome: 'Comercialização de veículos com laudo', curta: 'Compra e venda de veículos com laudo técnico de acordo com as condições gerais do carro: você sabe exatamente o que está levando.', foto: 'classe-s' },
];

// site atual, Serviços > Pacotes promocionais
export const pacotes = {
  texto: 'A Class-Service disponibiliza para novos e antigos clientes pacotes promocionais para Mercedes-Benz, e também ótimos preços para multimarcas. Ligue e agende seu horário para melhor atendimento.',
  modelos: ['Classe B', 'C 180', 'C 200 K', 'Classe E', 'Classe S', 'GLK', 'ML'],
};

// Certificados do site atual (4 folhas digitalizadas com os comprovantes de Vander William Fioretti).
// Lidos das imagens: curso, período e local quando aparecem.
export const tecnico = 'Vander William Fioretti';
export const cursos = [
  { ano: 1999, nome: 'Introdução técnica W168 (Classe A), mecânicos', data: '29/03 a 01/04/1999' },
  { ano: 1999, nome: 'Sistema de injeção MSM1 e imobilizador FBS', data: '17 a 19/05/1999' },
  { ano: 1999, nome: 'Transmissão, freio, suspensão e direção W168', data: '26 a 29/07/1999' },
  { ano: 1999, nome: 'Sistemas de segurança ativa e passiva', data: '18 a 21/10/1999' },
  { ano: 1999, nome: 'Motor 166', data: '22 a 24/11/1999' },
  { ano: 1999, nome: 'WIS (sistema de informação de oficina)', data: '23 e 24/11/1999' },
  { ano: 2000, nome: 'Ar-condicionado TAU/KLA', data: '28/02 a 01/03/2000' },
  { ano: 2000, nome: 'Módulos eletrônicos W220 (Classe S)', data: '18 a 22/09/2000' },
  { ano: 2004, nome: 'Geometria de direção', data: '03 a 05/11/2004' },
  { ano: 2004, nome: 'Suspensão Airmatic, SLF e ABC', data: '08 a 11/11/2004' },
  { ano: 2004, nome: 'Caixa automática 722.9', data: '16 a 19/11/2004' },
  { ano: 2005, nome: 'Módulos eletrônicos Chrysler, Dodge e Jeep', data: '30/05 a 02/06/2005' },
  { ano: 2005, nome: 'DRB III avançado e gravador de dados Co-Pilot', data: '25 a 27/07/2005' },
  { ano: 2005, nome: 'Apresentação W169 (nova Classe A)', data: '26 e 27/09/2005' },
];
export const folhasCert = [
  { img: 'cert-011', w: 1100, h: 780, alt: 'Comprovantes de participação Mercedes-Benz Global Training: DRB III avançado e Apresentação W169, 2005' },
  { img: 'cert-015', w: 1100, h: 1515, alt: 'Certificados Mercedes-Benz de 1999: injeção MSM1, introdução técnica W168, segurança ativa e passiva, transmissão W168' },
  { img: 'cert-016', w: 1100, h: 1693, alt: 'Certificados de treinamento pós-venda Mercedes-Benz: WIS, Motor 166, ar-condicionado e módulos eletrônicos W220' },
  { img: 'cert-018', w: 1100, h: 1488, alt: 'Comprovantes Mercedes-Benz de 2004 e 2005: Airmatic, geometria de direção, módulos Chrysler e caixa automática 722.9' },
];

// Etapas de uma visita (texto nosso, montado a partir dos serviços do site atual)
export const etapas = [
  { n: 'Agendamento', t: 'Você liga ou chama no WhatsApp e marca o horário. Se o carro não puder rodar, buscamos na plataforma com seguro.' },
  { n: 'Consultoria técnica', t: 'Um técnico ouve o que o carro está apresentando e o histórico de manutenção.' },
  { n: 'Diagnóstico eletrônico', t: 'Leitura dos módulos e testes com equipamento dedicado à Mercedes-Benz.' },
  { n: 'Orçamento claro', t: 'Você recebe o que precisa ser feito agora e o que pode esperar, com peças genuínas ou de primeira linha.' },
  { n: 'Serviço pela metodologia da fábrica', t: 'Executado por técnicos com formação Mercedes-Benz, seguindo as especificações do fabricante.' },
  { n: 'Apresentação técnica', t: 'Na entrega mostramos no carro o que foi feito, peça por peça.' },
];

export const modelos = [
  { nome: 'Classe A e B', img: 'orig-grade' },
  { nome: 'Classe C', img: 'c63' },
  { nome: 'Classe E', img: 'orig-classe-e' },
  { nome: 'Classe S', img: 'classe-s' },
  { nome: 'GLK e ML', img: 'orig-volante' },
  { nome: 'SL e clássicos', img: 'sl-r107' },
  { nome: 'AMG', img: 'orig-amg' },
];
