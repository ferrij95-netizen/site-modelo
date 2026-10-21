// Textos e dados da Belo Minas. Tudo que está em `textos` e `produtos` veio do site atual (belominas.com.br),
// inclusive pesos, sabores, ingredientes e %VD da tabela nutricional. O resto (títulos de seção, legendas) é nosso.

export const empresa = {
  nome: 'Belo Minas',
  nomeLongo: 'Belo Minas Laticínios',
  razao: 'Agroindústria São Sebastião da Bela Vista Ltda.',
  url: 'https://belominas.overtus.com.br/',
  antigo: 'https://www.belominas.com.br',
  fone: '(11) 3337-6865',
  foneHref: '+551133376865',
  horario: 'Segunda a sexta, das 8h às 18h',
  cidade: 'São Sebastião da Bela Vista, MG',
  sif: '2190',
};

export const textos = {
  chamada: 'Produtos de qualidade superior feitos com carinho para que você possa desfrutar o máximo do sabor do verdadeiro queijo!',
  bannerHome: 'Belo Minas, estar de bem com você mesmo...',
  bannerProdutos: 'Nossos produtos da fonte ao consumidor...',
  bannerContato: 'Satisfação e cuidado com o consumidor...',
  bannerAmbiente: 'Responsabilidade Ambiental!',
  combinacao: 'A combinação perfeita entre produtos de qualidade em um só queijo...',
  destaque1: { titulo: 'Queijo Coalho, pronto para assar!', texto: 'Produzido de forma única preservando sabor e maciez mesmo depois de assado, para que você possa aproveitar ao máximo o seu churrasco.' },
  destaque2: { titulo: 'Queijo Coalho, nova embalagem!', texto: 'Novo Queijo Coalho com 7 espetos! Agora você também pode desfrutar do melhor queijo de coalho em uma embalagem com 7 unidades.' },
  etapas: [
    { n: '01', titulo: 'Leite', sub: 'O precioso recurso', texto: 'Uma completa seleção aliada a efetivas análises de nossa matéria-prima asseguram a qualidade de nossos produtos antes mesmo do início de sua produção.' },
    { n: '02', titulo: 'Transformação', sub: 'Sabor + qualidade', texto: 'Rigorosos controles de processos com a tecnologia aplicada em nossa produção garantem, além de qualidade, mais sabor a nossos produtos, sempre preservando características essenciais do leite.' },
    { n: '03', titulo: 'Fim do processo', sub: 'Distribuição e pós-venda', texto: 'Satisfação e cuidado com o consumidor são os compromissos primordiais de nossa empresa.' },
  ],
  missao: [
    'Embora a Belo Minas continue evoluindo e adaptando-se a um mundo em mudança, a nossa base é idêntica à do início de nosso trabalho. O tempo das origens de nossa empresa reflete as ideias básicas de justiça, honestidade e uma preocupação geral para com as pessoas e também para com a sociedade.',
    'Nossa empresa fabrica e comercializa produtos de modo a criar valores que podem ser sustentados para funcionários, consumidores e empresas parceiras, favorecendo ações de longo prazo para um sólido desenvolvimento empresarial.',
    'Acreditamos que os consumidores tenham um sincero e legítimo interesse no comportamento, crenças e ações da companhia por detrás da marca em que depositam sua confiança, e que, sem os seus consumidores e clientes, a companhia não existiria.',
    'A Belo Minas está consciente do fato de que o sucesso de uma empresa é o reflexo do profissionalismo, conduta, atitude responsável de sua gestão e de seus trabalhadores. Portanto, o certo recrutamento de pessoas e uma formação contínua, além do constante desenvolvimento, são cruciais para o alcance desse sucesso.',
  ],
  valores: ['Justiça', 'Honestidade', 'Cuidado com as pessoas', 'Desenvolvimento de longo prazo'],
  ambienteIntro: 'Em constante preocupação com o meio ambiente e a qualidade de vida da sociedade, a Belo Minas pesquisa e investe para aprimorar cada vez mais os processos produtivos, visando à proteção e ao respeito à natureza.',
  ambiente: [
    { titulo: 'Coleta seletiva', texto: 'Coleta seletiva de lixo, onde todos os resíduos orgânicos são encaminhados para aterros credenciados.' },
    { titulo: 'Limpeza biodegradável', texto: 'Materiais de limpeza e higiene pessoal totalmente biodegradáveis e controlados.' },
    { titulo: 'Controle de pragas', texto: 'Rigoroso controle ambiental de pragas para assegurar a total higiene e proteção de nossa produção.' },
    { titulo: 'Tratamento de esgoto', texto: 'Todo o sistema de esgoto, antes de ser eliminado nos afluentes, passa por uma tecnológica e consistente estação de tratamento.' },
  ],
  selo: 'Como forma de expressar nossa preocupação, todas as nossas embalagens trazem nosso "Selo Verde" impresso. Participe dessa iniciativa também: baixe o selo em alta resolução para usar onde você quiser e a qualquer hora!',
  contato: 'Produtos de qualidade feitos especialmente para você que quer sempre o melhor sabor em sua mesa!',
};

// Nutrientes na ordem do site atual; valores são %VD.
const coalhoComp = 'Leite pasteurizado integral, fermento láctico, sal refinado, cloreto de cálcio e coalho.';
const coalhoNut = [['Valor energético', '5%'], ['Carboidratos', '0%'], ['Proteínas', '9%'], ['Gorduras totais', '13%'], ['Gorduras saturadas', '23%'], ['Gorduras trans', '-'], ['Fibra alimentar', '0%'], ['Sódio', '12%']];

export const linhas = { coalho: 'Linha churrasco', frescos: 'Frescos', fatiar: 'Mussarela, prato e provolone' };

export const produtos = [
  { slug: 'queijo-coalho-espeto', img: 'coalho-espeto', linha: 'coalho', nome: 'Queijo de Coalho Espeto', curto: 'Coalho espeto', peso: '0,4 kg', sabor: 'Natural', comp: coalhoComp, nut: coalhoNut,
    nota: 'Linha Churrasco Natural: espetos prontos para ir à brasa, que preservam o sabor e a maciez mesmo depois de assados.' },
  { slug: 'queijo-coalho-espeto-oregano', img: 'coalho-oregano', linha: 'coalho', nome: 'Queijo Coalho Espeto com Orégano', curto: 'Coalho com orégano', peso: '0,4 kg', sabor: 'Orégano', comp: coalhoComp, nut: coalhoNut,
    nota: 'O mesmo espeto de coalho da linha churrasco, com orégano.' },
  { slug: 'queijo-coalho-peca', img: 'coalho-peca', linha: 'coalho', nome: 'Queijo de Coalho Peça', curto: 'Coalho peça', peso: '2,5 kg', sabor: 'Natural', comp: coalhoComp, nut: coalhoNut,
    nota: 'A peça inteira de 2,5 kg, para cortar no tamanho que a sua cozinha precisa.' },
  { slug: 'queijo-minas-frescal', img: 'minas-frescal', linha: 'frescos', nome: 'Queijo Minas Frescal', curto: 'Minas frescal', peso: '0,5 kg', sabor: 'Tradicional',
    comp: 'Leite pasteurizado, cloreto de sódio, acidulante ácido lático, coalho e cloreto de cálcio.',
    nut: [['Valor energético', '3%'], ['Carboidratos', '0%'], ['Proteínas', '7%'], ['Gorduras totais', '9%'], ['Gorduras saturadas', '18%'], ['Gorduras trans', '-'], ['Fibra alimentar', '0%'], ['Cálcio', '23%'], ['Sódio', '6%']],
    nota: 'O queijo fresco tradicional de Minas, em peça de 0,5 kg.' },
  { slug: 'ricota-fresca', img: 'ricota', linha: 'frescos', nome: 'Ricota Fresca', curto: 'Ricota fresca', peso: '0,5 kg', sabor: 'Tradicional',
    comp: 'Soro de queijos, leite pasteurizado, regulador de acidez ácido lático e bicarbonato de sódio.',
    nut: [['Valor energético', '3%'], ['Carboidratos', '0%'], ['Proteínas', '5%'], ['Gorduras totais', '7%'], ['Gorduras saturadas', '11%'], ['Gorduras trans', '-'], ['Fibra alimentar', '0%'], ['Sódio', '1%']],
    nota: 'Ricota fresca feita a partir do soro dos queijos, em peça de 0,5 kg.' },
  { slug: 'queijo-mussarela', img: 'mussarela', linha: 'fatiar', nome: 'Queijo Mussarela', curto: 'Mussarela', peso: '3,5 kg', sabor: 'Tradicional', comp: coalhoComp,
    nut: [['Valor calórico', '3%'], ['Carboidratos', '0%'], ['Proteínas', '14%'], ['Gorduras totais', '9%'], ['Gorduras saturadas', '16%'], ['Gorduras trans', '-'], ['Colesterol', '10%'], ['Fibra alimentar', '0%'], ['Cálcio', '22%'], ['Ferro', '0%'], ['Sódio', '8%']],
    nota: 'Mussarela tradicional em peça de 3,5 kg.' },
  { slug: 'queijo-prato', img: 'prato', linha: 'fatiar', nome: 'Queijo Prato', curto: 'Prato', peso: '3,5 kg', sabor: 'Tradicional',
    comp: 'Leite pasteurizado integral, fermento láctico, sal refinado, cloreto de cálcio, coalho e corante natural de urucum.',
    nut: [['Valor energético', '6%'], ['Carboidratos', '0%'], ['Proteínas', '12%'], ['Gorduras totais', '15%'], ['Gorduras saturadas', '18%'], ['Gorduras trans', '-'], ['Fibra alimentar', '0%'], ['Sódio', '8%']],
    nota: 'Queijo prato (lanche) em peça de 3,5 kg, com a cor do urucum natural.' },
  { slug: 'queijo-provolone', img: 'provolone', linha: 'fatiar', nome: 'Queijo Provolone', curto: 'Provolone', peso: '0,5 / 3,5 kg', sabor: 'Tradicional',
    comp: 'Leite pasteurizado, fermento láctico, coalho bovino, cloreto de cálcio e cloreto de sódio (sal).',
    nut: [['Valor calórico', '2%'], ['Carboidratos', '0%'], ['Proteínas', '5%'], ['Gorduras totais', '5%'], ['Gorduras saturadas', '9%'], ['Gorduras trans', '-'], ['Colesterol', '0%'], ['Fibra alimentar', '0%'], ['Cálcio', '0%'], ['Ferro', '0%'], ['Sódio', '3%']],
    nota: 'Provolone amarrado no barbante, em peças de 0,5 kg e 3,5 kg.' },
];

// Fotos de banco (Wikimedia Commons e Flickr, licenças Creative Commons): créditos em ../creditos-fotos.json.
export const creditos = 'Fotos de paisagem, gado e produção: Wikimedia Commons e Flickr (Creative Commons), usadas na prévia até chegarem as fotos da Belo Minas.';
