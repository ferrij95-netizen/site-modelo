// Conteúdo do site da Vilela Peloso Sociedade de Advogados.
// Textos marcados "site atual" foram copiados de advribeirao.com.br em 21/10/2026 (só a grafia "ple" virou "pela").
// Os demais foram escritos por nós e precisam da confirmação do escritório (ver LEIA-ME.md).

export const empresa = {
  nome: 'Vilela Peloso Advogados',
  completo: 'Vilela Peloso Sociedade de Advogados',
  marcaAtual: 'Advocacia Ribeirão Preto',
  desde: 1998,
  endereco: 'Rua Visconde do Rio Branco, 1043',
  bairro: 'Centro',
  cep: '14015-000',
  cidade: 'Ribeirão Preto - SP',
  tel: '(16) 3610-3655',
  telHref: '+551636103655',
  email: 'daniela@advribeirao.com.br',
  mapa: 'https://www.google.com/maps/place/Vilela+Peloso+Sociedade+de+Advogados/@-21.1760345,-47.8036749,17z',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Visconde+do+Rio+Branco,+1043+-+Centro,+Ribeir%C3%A3o+Preto+-+SP&z=16&output=embed',
  google: { nota: '4,6', avaliacoes: 13 },
  url: 'https://vilelapeloso.overtus.com.br/',
  antigo: 'http://advribeirao.com.br/',
};

export const equipe = [
  { nome: 'Daniela Vilela Peloso Vasconcelos', papel: 'Fundadora', nota: 'Estabeleceu o escritório em Ribeirão Preto em 1998.' },
  { nome: 'Dr. Vitor Hugo Vasconcelos Matos', papel: 'Advogado associado' },
  { nome: 'Dra. Maria Isabel Vilela Peloso', papel: 'Advogada associada' },
];

// site atual
export const textos = {
  quemSomos: [
    'A advogada <strong>Daniela Vilela Peloso Vasconcelos</strong> estabeleceu seu escritório de advocacia em Ribeirão Preto no ano de 1998, atuou com sucesso em grandes causas e se expandiu primordialmente no ramo do direito do trabalho e previdenciário, desenvolvendo suas atividades com base na agilidade, seriedade, qualidade, profissionalismo e acima de tudo <strong>justiça</strong>.',
    'Hoje conta com a participação dos advogados associados <strong>Dr. Vitor Hugo Vasconcelos Matos</strong> e <strong>Dra. Maria Isabel Vilela Peloso</strong>, além de uma equipe de colaboradores unida e competente.',
  ],
  missao: 'Merecer a confiança e o respeito de nossos clientes, partes e comunidade, através do exercício da advocacia de excelência, alcançada pelo constante aprimoramento técnico-jurídico, e observação dos princípios éticos.',
  valores: ['Agilidade', 'Seriedade', 'Qualidade', 'Profissionalismo', 'Justiça'],
  andamento: [
    'A Advocacia Ribeirão Preto disponibiliza a seus clientes, gratuitamente, consulta on-line aos andamentos processuais de sua escolha.',
    'O acesso a este serviço depende da utilização de nome de usuário e de senha únicos, previamente fornecidos pela Advocacia Ribeirão Preto a cada cliente.',
    'Os andamentos processuais são atualizados toda vez que o processo judicial apresentar algum movimento relevante.',
    'Se você é nosso cliente e deseja fazer uso deste serviço, por favor, solicite seu nome de usuário e sua senha através de nossa página de cadastro ou do e-mail daniela@advribeirao.com.br.',
  ],
  offline: 'Advocacia off-line: clique aqui para deixar uma mensagem!',
};

// escrito por nós (a confirmar): o que cada área cobre e o que levar na primeira conversa
export const areas = [
  {
    slug: 'direito-do-trabalho', curto: 'Trabalho', nome: 'Direito do Trabalho', foto: 'gabinete',
    resumo: 'Orientação e ações na Justiça do Trabalho: rescisão, horas extras, vínculo, FGTS, acidente e doença ocupacional.',
    intro: 'O direito do trabalho é uma das duas frentes em que o escritório se concentrou desde 1998. Cuidamos da relação de trabalho do começo ao fim: do contrato e dos direitos do dia a dia à rescisão, aos acordos e às ações na Justiça do Trabalho.',
    temas: [
      ['Rescisão e verbas rescisórias', 'Conferência do termo de rescisão, aviso prévio, férias, 13º salário e multa do FGTS.'],
      ['Horas extras e adicionais', 'Jornada, intervalos, adicional noturno, de insalubridade e de periculosidade.'],
      ['Vínculo de emprego', 'Reconhecimento do vínculo e registro em carteira para quem trabalhou sem registro.'],
      ['FGTS', 'Depósitos em atraso ou não feitos e saque nas hipóteses previstas em lei.'],
      ['Acidente e doença ocupacional', 'Estabilidade, indenização e o reflexo na Previdência, que o escritório também acompanha.'],
      ['Acordos e audiências', 'Negociação, audiências e acompanhamento do processo até o fim, inclusive em recurso.'],
    ],
    docs: ['Carteira de trabalho (física ou digital)', 'Holerites e cartões de ponto que tiver', 'Termo de rescisão e guias, se já saiu', 'Extrato do FGTS', 'RG, CPF e comprovante de endereço'],
  },
  {
    slug: 'direito-previdenciario', curto: 'Previdência', nome: 'Direito Previdenciário', foto: 'justica',
    resumo: 'Aposentadorias, benefícios por incapacidade, pensão, BPC/LOAS e revisões, no INSS e na Justiça Federal.',
    intro: 'A outra frente principal do escritório. Acompanhamos o segurado no INSS e, quando preciso, na Justiça Federal: da contagem do tempo de contribuição ao pedido, ao recurso e à revisão do benefício.',
    temas: [
      ['Aposentadorias', 'Por idade, por tempo de contribuição nas regras de transição, especial e da pessoa com deficiência.'],
      ['Benefícios por incapacidade', 'Auxílio por incapacidade temporária, aposentadoria por incapacidade permanente e auxílio-acidente.'],
      ['Pensão por morte', 'Pedido e defesa do direito dos dependentes, além do auxílio-reclusão.'],
      ['BPC/LOAS', 'Benefício assistencial para idosos e pessoas com deficiência de baixa renda.'],
      ['Revisões', 'Conferência do cálculo do benefício já concedido e pedido de revisão quando cabível.'],
      ['Planejamento', 'Análise do CNIS e do tempo de contribuição para escolher a melhor regra e a melhor data.'],
    ],
    docs: ['RG, CPF e comprovante de endereço', 'Carteiras de trabalho e carnês de contribuição', 'Extrato do CNIS (aplicativo Meu INSS)', 'Carta de concessão ou de indeferimento do INSS', 'Laudos e exames médicos, PPP se trabalhou em atividade especial'],
  },
];

// escrito por nós (a confirmar): como o atendimento acontece
export const etapas = [
  ['Primeira conversa', 'No escritório, no Centro de Ribeirão Preto, ou por telefone. Você conta o caso e traz os documentos que tiver.'],
  ['Análise', 'Estudamos carteira, holerites, CNIS e laudos para dizer com clareza quais caminhos existem.'],
  ['Caminho definido', 'Pedido administrativo, acordo ou ação judicial, com honorários combinados por escrito.'],
  ['Acompanhamento', 'Petições, audiências, perícias e recursos conduzidos pelos advogados do escritório.'],
  ['Andamento on-line', 'Com usuário e senha, você consulta o andamento do processo sempre que houver movimento relevante.'],
];

export const creditos = [
  ['Encadernações antigas', 'Tom Murphy VII', 'CC BY-SA', 'https://commons.wikimedia.org/wiki/File:Old_book_bindings.jpg'],
  ['Estátua da Justiça', 'James Cridland', 'CC BY', 'https://commons.wikimedia.org/wiki/File:The_scales_of_justice_(4984060658).jpg'],
  ['Gabinete com estantes', 'Michael D Beckwith', 'CC0', 'https://commons.wikimedia.org/wiki/File:Abbotsford_House_Study_Room_(248456373).jpeg'],
  ['Biblioteca', 'Michael D Beckwith', 'CC0', 'https://commons.wikimedia.org/wiki/File:Abbotsford_House_Library_(248527955).jpeg'],
  ['Volumes encadernados em couro', 'FrogUnderALilyPad', 'CC BY-SA', 'https://commons.wikimedia.org/wiki/File:Leather_bound_books_with_sprinkled_edges.jpg'],
  ['Theatro Pedro II, Ribeirão Preto', 'Leandro Maranghetti Lourenço', 'CC BY-SA', 'https://commons.wikimedia.org/wiki/File:Teatro_Pedro_II-Ribeirao_Preto.jpg'],
  ['Quarteirão Paulista, Ribeirão Preto', 'Eduardo Felipe Pimentel', 'CC BY', 'https://commons.wikimedia.org/wiki/File:Ribeirao_quarteirao_paulista_by_rodrigolinkweb-d343orl.jpg'],
];
