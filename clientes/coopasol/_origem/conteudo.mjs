// Textos e dados do site novo da Coopasol. Fontes: site atual (coopasol.com.br/coopasol: missão, visão, valores
// e o formulário "Seja um cooperado"), cadastro público do CNPJ 01.646.273/0001-70 (endereço, telefones, abertura,
// atividades registradas e diretoria) e a foto dos silos enviada pelo João. Nada de número inventado: o que falta
// confirmar com a cooperativa está marcado em LEIA-ME.md.

export const site = {
  nome: 'Coopasol',
  razao: 'Coopasol Cooperativa Agropecuária Sulmatogrossense',
  cnpj: '01.646.273/0001-70',
  fundacao: 1997,
  cidade: 'Dourados, MS',
  endereco: 'Rodovia MS-162, km 12, Zona Rural',
  cep: '79866-000',
  caixa: 'Caixa Postal 381',
  fone: '(67) 3427-1300',
  foneHref: '+556734271300',
  fone2: '(67) 3427-1301',
  fone2Href: '+556734271301',
  email: 'coopasol.contabil@hotmail.com',
  instagram: 'https://www.instagram.com/coopasolcooperativa/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Coopasol+Rodovia+MS-162+km+12+Dourados+MS',
  mapaEmbed: 'https://www.google.com/maps?q=Coopasol+Cooperativa+Agropecuaria+Sulmatogrossense+Dourados+MS&output=embed',
  atual: 'https://coopasol.com.br/coopasol',
};

// Exatamente como no site atual.
export const missao = 'Promover desenvolvimento econômico social do cooperado e colaboradores, com segurança e confiabilidade.';
export const visao = 'Ser a principal opção do cooperado no recebimento e armazenamento de grãos.';
export const valores = ['Confiabilidade', 'Honestidade', 'Equidade'];
export const valoresTexto = {
  Confiabilidade: 'O grão entregue é pesado, classificado e guardado com o cuidado de quem cuida do que é do cooperado.',
  Honestidade: 'Peso, desconto e saldo às claras, para o produtor saber exatamente o que tem armazenado.',
  Equidade: 'Cada cooperado é dono da cooperativa e tem as mesmas condições, seja qual for o tamanho da lavoura.',
};

// Atividades registradas da cooperativa (CNAE do CNPJ), escritas para o produtor.
export const servicos = [
  {
    slug: 'recebimento-e-armazenagem', foto: 'banco-descarga', nome: 'Recebimento e armazenagem', ico: 'silo',
    curto: 'Recebimento da safra, limpeza, secagem e guarda do grão nos silos da cooperativa, na MS-162.',
    texto: [
      'É o coração da Coopasol e o que a visão da cooperativa promete: ser a principal opção do cooperado no recebimento e armazenamento de grãos.',
      'Na unidade da Rodovia MS-162, km 12, o caminhão é pesado, o grão é amostrado e classificado, passa por limpeza e secagem e segue para os silos metálicos, onde fica guardado em nome do cooperado até a hora de vender.',
    ],
    pontos: ['Pesagem e classificação na chegada', 'Limpeza e secagem antes de armazenar', 'Silos metálicos e armazém graneleiro', 'Saldo armazenado em nome do cooperado'],
  },
  {
    slug: 'comercializacao-de-graos', foto: 'banco-soja', nome: 'Comercialização de grãos', ico: 'grafico',
    curto: 'A cooperativa negocia a safra dos cooperados no atacado, com volume e poder de negociação.',
    texto: [
      'Comércio atacadista de cereais e leguminosas é a atividade principal registrada da Coopasol. Juntando a produção de muitos cooperados, a cooperativa vende em volume e negocia melhor do que cada produtor sozinho.',
      'O cooperado decide quando vender o que está armazenado e acompanha a negociação com a equipe comercial.',
    ],
    pontos: ['Venda em volume, com mais poder de negociação', 'O cooperado escolhe o momento de vender', 'Atendimento direto com a equipe comercial'],
  },
  {
    slug: 'insumos', foto: 'banco-terra-ms', nome: 'Insumos agrícolas', ico: 'saco',
    curto: 'Insumos agropecuários para a lavoura, comprados em conjunto pela cooperativa.',
    texto: [
      'A Coopasol tem registrado o comércio de insumos agropecuários. Comprando em conjunto para os cooperados, a cooperativa leva para a lavoura o que ela precisa em cada safra.',
    ],
    pontos: ['Compra conjunta para os cooperados', 'Planejamento por safra', 'Entrega combinada com a equipe'],
  },
  {
    slug: 'sementes', foto: 'banco-fileiras', nome: 'Sementes certificadas', ico: 'semente',
    curto: 'Produção de sementes certificadas, com origem e qualidade garantidas.',
    texto: [
      'A produção de sementes certificadas está entre as atividades registradas da cooperativa. Semente certificada tem origem conhecida, germinação e pureza testadas, e é o primeiro passo para uma lavoura uniforme.',
    ],
    pontos: ['Origem conhecida e rastreável', 'Germinação e pureza testadas', 'Pensadas para a região de Dourados'],
  },
  {
    slug: 'assistencia-tecnica', foto: 'banco-safrinha', nome: 'Assistência técnica', ico: 'agronomo',
    curto: 'Serviços de agronomia e consultoria para o cooperado produzir mais e melhor.',
    texto: [
      'Serviços de agronomia e consultoria às atividades agrícolas fazem parte do que a Coopasol oferece. O técnico vai a campo, acompanha a lavoura e ajuda o cooperado a decidir da semente à colheita.',
      'A cooperativa também tem registrada a atividade de ensino, para capacitação dos cooperados e colaboradores.',
    ],
    pontos: ['Acompanhamento da lavoura', 'Recomendações técnicas por safra', 'Capacitação de cooperados e colaboradores'],
  },
  {
    slug: 'transporte', foto: 'banco-carretas', nome: 'Transporte de cargas', ico: 'caminhao',
    curto: 'Transporte rodoviário para levar a produção da lavoura até a unidade.',
    texto: [
      'O transporte rodoviário de carga está entre as atividades registradas da Coopasol, ligando a lavoura do cooperado à unidade de recebimento e a unidade aos compradores.',
    ],
    pontos: ['Da lavoura até a unidade', 'Da unidade até o comprador', 'Programação junto com a recepção'],
  },
];

// Etapas do recebimento (processo padrão de uma unidade armazenadora).
export const etapas = [
  ['Chegada e pesagem', 'O caminhão é pesado na balança rodoviária na entrada da unidade.', 'balanca'],
  ['Amostragem e classificação', 'Uma amostra é retirada e classificada: umidade, impurezas e avariados.', 'lupa'],
  ['Descarga na moega', 'O grão é descarregado e segue pelos elevadores da unidade.', 'moega'],
  ['Limpeza e secagem', 'Máquinas de pré-limpeza e secadores deixam o grão no ponto de guardar.', 'secador'],
  ['Armazenagem nos silos', 'O grão fica nos silos metálicos, em nome do cooperado, até a venda.', 'silo'],
  ['Comercialização', 'Na hora certa, a cooperativa vende o grão e o cooperado recebe.', 'grafico'],
];

// Diretoria conforme o cadastro público do CNPJ (Receita Federal).
export const diretoria = [
  ['Laertes Alberto Dierings', 'Presidente'],
  ['Murilo Bonilha Botelho', 'Diretor'],
  ['Mario Vieira Verdasca', 'Diretor'],
  ['Allan Christian Kruger', 'Diretor'],
  ['Alexandre Decian Zanon', 'Diretor'],
  ['Nilson Lago Decian', 'Diretor'],
];

export const porque = [
  ['Perto da lavoura', 'Unidade na Rodovia MS-162, km 12, no meio da região produtora de Dourados.', 'pin'],
  ['O dono é o cooperado', 'Cooperativa é dos associados: as decisões e os resultados são de quem produz.', 'pessoas'],
  ['Desde 1997', `Quase três décadas recebendo e guardando a safra da região.`, 'calendario'],
];

// Fotos ilustrativas (Wikimedia Commons, lista em fotos-banco.md). Toda foto de banco sai com este crédito.
export const creditos = {
  'banco-milho-dourados': 'Colheita de milho em Dourados (MS). Foto: Valter Campanato/Agência Brasil, CC BY 3.0 BR',
  'banco-terra-ms': 'Plantio de soja em Mato Grosso do Sul. Foto: James Martins, CC BY 3.0',
  'banco-soja': 'Lavoura de soja. Foto: Marcelo Camargo/Agência Brasil, CC BY 3.0 BR',
  'banco-colheita': 'Colheita de soja. Foto: Roosevelt Pinheiro/Agência Brasil, CC BY 3.0 BR',
  'banco-descarga': 'Descarga de soja no graneleiro. Foto: Roosevelt Pinheiro/Agência Brasil, CC BY 3.0 BR',
  'banco-carretas': 'Carretas graneleiras. Foto: Roosevelt Pinheiro/Agência Brasil, CC BY 3.0 BR',
  'banco-safrinha': 'Milho safrinha. Foto: Tiago Firmino Boaventura, CC BY 3.0',
  'banco-fileiras': 'Soja em fileiras. Foto: Marcelo Camargo/Agência Brasil, CC BY 3.0 BR',
};
