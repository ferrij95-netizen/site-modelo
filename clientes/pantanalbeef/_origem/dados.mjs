// Textos do Pantanal Beef, copiados do site atual (pantanalbeef.ind.br, Wix) e dos dois catálogos em PDF
// do próprio site (Catálogo completo, 97 páginas, e Linha Maciatta, 15 páginas). Lidos em 2026-10-16.
// Não inventar números: quando o site e o catálogo divergem, vale o site (ex.: 840 abates/dia e 297 t de congelados).
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
export const produtos = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

export const empresa = {
  nome: 'Pantanal Beef',
  razao: 'Frigorífico Pantanal',
  desde: 1982,
  cidade: 'Várzea Grande - MT',
  endereco: ['Estrada Nossa Senhora Aparecida, km 8,5', 'Capão Grande, Várzea Grande - MT', 'CEP 78164-000'],
  sac: { tel: '(65) 3028-9550', href: '+556530289550', email: 'sac@pantanalbeef.ind.br' },
  comercial: { tel: '(66) 3026-0708', href: '+556630260708', email: 'comercial@pantanalbeef.ind.br' },
  vendedores: [
    { nome: 'Plínio Bernardes Franco', tel: '(66) 99984-7749', href: '+5566999847749', email: 'plinio.franco@pantanalbeef.ind.br' },
    { nome: 'Hector Leiva Borges Machado', tel: '(66) 99984-1695', href: '+5566999841695', email: 'hector.leiva@pantanalbeef.ind.br' },
    { nome: 'Wendell Gonçalves Lima', tel: '(66) 99654-7979', href: '+5566996547979', email: 'wendell.lima@pantanalbeef.ind.br' },
  ],
  dpo: 'dpo@pantanalbeef.ind.br',
  redes: [
    { nome: 'Instagram', url: 'https://instagram.com/pantanalbeef', rotulo: '@pantanalbeef' },
    { nome: 'Facebook', url: 'http://www.facebook.com/pantanalfrigorifico', rotulo: '/pantanalfrigorifico' },
    { nome: 'LinkedIn', url: 'https://www.linkedin.com/company/pantanal-beef/', rotulo: 'Pantanal Beef' },
  ],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Estrada+Nossa+Senhora+Aparecida+km+8,5+Cap%C3%A3o+Grande+V%C3%A1rzea+Grande+MT',
};

// Números do site atual (Indústria e Sustentabilidade).
export const numeros = [
  { n: '840', u: 'abates por dia', d: 'capacidade de abate da planta de Várzea Grande' },
  { n: '1.700', u: 'peças desossadas por dia', d: 'capacidade diária de desossa' },
  { n: '180 t', u: 'de resfriados', d: 'em câmaras de armazenamento' },
  { n: '297 t', u: 'de congelados', d: 'em câmaras de armazenamento' },
  { n: '500+', u: 'especialistas em carne', d: 'trabalhando todos os dias' },
];

export const abates = [
  { ano: '2023', n: '222 mil', t: 'cabeças abatidas' },
  { ano: '2024', n: '245 mil', t: 'cabeças abatidas (mais de)' },
  { ano: '2025', n: '172 mil', t: 'cabeças até a data do relatório' },
];

export const estados = ['Mato Grosso', 'Santa Catarina', 'Paraná', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Goiás', 'Espírito Santo', 'Bahia', 'Pernambuco', 'Tocantins', 'Rio Grande do Norte', 'Ceará', 'Pará', 'Distrito Federal'];
export const uf = ['MT', 'SC', 'PR', 'SP', 'RJ', 'MG', 'GO', 'ES', 'BA', 'PE', 'TO', 'RN', 'CE', 'PA', 'DF'];

// Países com nome em destaque no mapa "Nosso objetivo é chegar cada vez mais longe" do catálogo.
export const paises = {
  'Américas': ['Canadá', 'Bahamas', 'Jamaica', 'Haiti', 'Ilhas Turcas e Caicos', 'Colômbia', 'Guiana', 'Guiana Francesa', 'Suriname', 'Paraguai', 'Uruguai', 'Argentina', 'Groelândia'],
  'África': ['Marrocos', 'Argélia', 'Egito', 'Senegal', 'Nigéria', 'Gana', 'Costa do Marfim', 'Camarões', 'Congo', 'Angola', 'Quênia', 'Moçambique'],
  'Oriente Médio e Ásia': ['Líbano', 'Jordânia', 'Palestina', 'Geórgia', 'Irã', 'Catar', 'Arábia Saudita', 'Emirados Árabes', 'Paquistão', 'Sri Lanka', 'Ilhas Maldivas', 'Mianmar', 'Coreia do Sul', 'Hong Kong', 'Taiwan'],
  'Oceania': ['Nova Zelândia', 'Samoa'],
};
export const totalPaises = Object.values(paises).flat().length;

export const linhas = {
  maciatta: {
    nome: 'Maciatta', rotulo: 'Cortes premium', logo: 'linha-maciatta', capa: 'cat-maciatta', cor: '#16171b',
    texto: 'A Linha Maciatta possui cortes premium selecionados exclusivamente de novilhas jovens, destinados ao público gourmet, que oferecem o equilíbrio perfeito entre maciez e marmoreio, proporcionando qualidade única e sabor sem igual.',
    site: 'Animais precoces, abaixo de 30 meses, criteriosamente selecionados. Produtos cuidadosamente manipulados em nosso frigorífico garantem os diferenciais desta linha.',
    extra: 'Uma linha de cortes selecionados, de novilhas de dois dentes, com maciez e gordura na medida certa, resultando em equilíbrio para a carne perfeita.',
  },
  grill: {
    nome: 'Grill', rotulo: 'Carne bovina resfriada', logo: 'linha-grill', capa: 'cat-grill', cor: '#13162b',
    texto: 'A Linha Grill possui cortes selecionados com bom acabamento de gordura, especiais para assados e grelhados, para que o seu churrasco fique ainda melhor.',
  },
  beefhouse: {
    nome: 'Beef House', rotulo: 'Carne bovina resfriada', logo: 'linha-beefhouse', capa: 'cat-beefhouse', cor: '#ffffff',
    texto: 'A Linha Beef House é a mais completa em cortes tradicionais do traseiro e dianteiro do bovino, para o consumo diário, colocando mais sabor em cada refeição.',
    site: 'Produtos abrangentes de cortes do dianteiro, traseiro e miúdos devidamente manipulados, garantindo qualidade superior para atender a todas as necessidades do dia a dia da cozinha doméstica e profissional.',
  },
  pantanal: {
    nome: 'Pantanal', rotulo: 'Carne bovina congelada', logo: 'p-branco', capa: 'cat-pantanal', cor: '#1b5e3b',
    texto: 'A Linha Pantanal tem cortes simples, congelados, com pouco ou sem acabamento de gordura, ideais para quem busca mais praticidade, leveza e sabor no dia a dia.',
  },
  miudos: {
    nome: 'Miúdos', rotulo: 'Congelados', capa: 'cat-miudos', cor: '#2a2b30',
    texto: 'Os miúdos bovinos são ricos em nutrientes, fonte de proteínas e ferro, além de oferecer sabores únicos. Perfeitos para quem busca uma alimentação saudável e diversificada.',
  },
  carcaca: {
    nome: 'Carcaça Bovina', rotulo: 'Resfriada', capa: 'cat-carcaca', cor: '#2a2b30',
    texto: 'Carcaças inteiras, serradas e quartos (dianteiro, ponta de agulha e traseiros) resfriados de 0 °C a 7 °C.',
  },
  subprodutos: {
    nome: 'Subprodutos', rotulo: 'Indústria', capa: 'cat-subprodutos', cor: '#2a2b30',
    texto: 'Ossos e farinha de carne e osso, com o mesmo controle de processo da linha de cortes.',
  },
};
export const ordemLinhas = ['maciatta', 'grill', 'beefhouse', 'pantanal', 'miudos', 'carcaca', 'subprodutos'];

export const textos = {
  sobre: [
    'O Pantanal Beef tem o objetivo de oferecer produtos de qualidade e, para um bom resultado, investimos na entrega de confiança aos nossos clientes. O processo da indústria frigorífica se inicia com a equipe de profissionais da compra de bovinos, a qual está sempre em busca de animais que representam precocidade, padrão racial e acabamento para proporcionar carne de primeira qualidade a você. Nosso compromisso com a credibilidade nos levou a atender mercados nacionais e internacionais.',
    'O frigorífico possui uma estrutura moderna, com eficientes e contínuos controles dos processos de segurança alimentar, que garantem lugar de destaque junto aos nossos clientes e parceiros, no Brasil e no mundo. Investimos continuamente na modernização de nossa planta, hoje localizada estrategicamente na cidade de Várzea Grande-MT, no entroncamento entre as BR 070, BR 163 e BR 364, para originação de animais e escoamento da carne.',
    'Diariamente somos mais de 500 especialistas treinados e dedicados em levar até você produtos de procedência e qualidade. Nossos produtos possuem o selo SIF (Sistema de Inspeção Federal, do Ministério da Agricultura, Pecuária e Abastecimento), que atende às mais exigentes normas higiênico-sanitárias para o Brasil e para o mundo. Isso é sinônimo de confiança, da qual podemos nos orgulhar, e gostaríamos de lhe entregar nossos produtos com garantia de qualidade.',
  ],
  frigomarca: [
    'O Frigomarca adquiriu o controle acionário do Frigorífico Pantanal, expandindo sua atuação no mercado de carne bovina, tanto para o mercado interno quanto para exportação.',
    'A marca Pantanal Beef, já consolidada no mercado, ganhou ainda mais destaque com a aquisição, tornando-se referência em carne bovina no Brasil e no exterior.',
    'A aquisição permitiu ao Frigomarca aumentar sua capacidade de abate e processamento de carne, atendendo à crescente demanda do mercado. O Frigomarca realizará investimentos na modernização das unidades adquiridas, visando aumentar a eficiência e a qualidade dos produtos.',
    'A aquisição do Frigorífico Pantanal pelo Frigomarca é um marco importante na história da empresa. Essa operação não apenas expandiu a capacidade produtiva do Frigomarca, mas também fortaleceu a marca Pantanal. Agora somos todos FRIGOMARCA!',
  ],
  pecuaria: [
    'Nosso rebanho é originado a partir dos melhores criadores de gado Nelore e Angus do estado do Mato Grosso. São animais criteriosamente selecionados por compradores profissionais dentro das expectativas de qualidade da PANTANAL.',
    'Os animais são acompanhados desde o carregamento até a chegada ao frigorífico. Contamos com uma frota própria, moderna e adequada para o correto transporte dos animais. Nossos motoristas são treinados para conduzir os veículos corretamente no trajeto da fazenda ao frigorífico, com a preocupação do bem-estar animal, garantindo assim a qualidade da carne no processo de abate.',
    'A empresa possui instalações adequadas, atendendo corretamente às normas descritas pelo Ministério da Agricultura (MAPA) e pela Inspeção Federal (SIF), garantindo assim o bem-estar animal dos currais até o setor de abate.',
  ],
  industria: [
    'Investimos continuamente na modernização de nossa planta buscando sempre a melhoria da qualidade do processo e aumento da segurança alimentar para os nossos clientes. Diariamente somos mais de 500 especialistas em carne dedicados em levar até você produtos de altíssima qualidade e procedência.',
    'Temos capacidade de 840 abates por dia, capacidade diária de desossa de 1.700 peças, armazenamento para mais de 180 toneladas de resfriados e 297 toneladas de congelados, além de amplo espaço físico para novas ampliações.',
  ],
  distribuicao: 'Contamos com uma moderna planta industrial localizada estrategicamente na cidade de Várzea Grande-MT, no entroncamento entre as BR 070, 163 e 364, para originação de animais e distribuição de nossos produtos.',
  comercial: [
    'Nossos produtos chegam em quase todos os cantos do Brasil através de veículos rastreados e com a temperatura de suas carretas frigoríficas controlada online, assegurando o compromisso com a eficiência e a garantia da qualidade. Somos uma das maiores exportadoras de carne bovina de Mato Grosso, alcançando países com elevados padrões de qualidade, e trabalhamos continuamente em busca da expansão destes horizontes.',
    'Competência comercial, produtos de qualidade e logística própria são alguns dos nossos diferenciais. Entre em contato com nosso departamento de vendas e descubra como é fácil ter PANTANAL em sua cidade.',
  ],
  exportacao: 'O Pantanal Beef distribui seus produtos para todos os estados brasileiros, além de exportar para grandes mercados internacionais. Seguimos em busca de novos mercados, trabalhando incansavelmente para novas habilitações.',
  linhaPropria: 'O Pantanal Beef também oferece o serviço de consultoria para parceiros com produção própria. Este trabalho realiza uma consultoria completa para o desenvolvimento da linha de produtos, desde a compra dos animais, abate, até a seleção dos cortes de carne, embalagens e distribuição.',
  sustentabilidade: {
    intro: 'Para garantir que nossas operações estejam alinhadas às melhores práticas globais, implementamos um sistema de monitoramento robusto, desenvolvido em parceria com empresas especializadas. Esse sistema não apenas atende às exigências legais, mas também promove a sustentabilidade em toda a cadeia produtiva, mitigando riscos ambientais e sociais.',
    respaldo: ['Políticas de Responsabilidade Social, Ambiental e Climática (PRSAC)', 'Gerenciamento Integrado de Riscos (GIR)', 'Protocolos rigorosos contra desmatamento ilegal e trabalho análogo à escravidão'],
    rastreio: 'Garantimos 100% de rastreabilidade dos fornecedores diretos, com controles avançados para assegurar que nenhum animal adquirido esteja vinculado a:',
    vinculos: ['Áreas de desmatamento ilegal (monitoradas via PRODES/INPE, Ibama e órgãos estaduais)', 'Terras indígenas, unidades de conservação ou territórios quilombolas', 'Propriedades com embargos ambientais ou cadastros irregulares no CAR (Cadastro Ambiental Rural)', 'Fazendas com registros de trabalho escravo (lista suja do MTE)'],
    auditoria: 'Além disso, auditorias independentes validam a integridade dos dados, reforçando a credibilidade de nosso sistema.',
    indiretos: 'Embora o monitoramento de fornecedores indiretos seja um desafio setorial, estamos comprometidos em expandir cada vez mais nosso controle. Todos os animais abatidos são rastreados até os fornecedores diretos. Para os indiretos, temos um plano estratégico estabelecido, com metas claras:',
    plano: [
      { t: 'SMGEO PROSPEC', d: 'Transferência de tecnologia para produtores rurais, permitindo análises socioambientais em nível de propriedade.' },
      { t: 'Visipec', s: 'parceria com a NWF', d: 'Plataforma que cruza dados de GTAs e SICAR para identificar riscos em fornecedores indiretos.' },
      { t: 'GTFI', s: 'Grupo de Trabalho dos Fornecedores Indiretos', d: 'Atuação colaborativa com poder público e entidades setoriais para aprimorar regulamentações.', andamento: true },
      { t: 'PRIMI', s: 'Programa de Rastreabilidade Individual', d: 'Em negociação com a NS SOLUTION, visa rastrear toda a vida do animal, com auditorias independentes.' },
    ],
    meta: 'Nossa meta em 2025: monitorar fornecedores indiretos de nível 1, condicionado às disponibilidades de dados públicos e ferramentas tecnológicas.',
    tecnologia: 'Atualmente utilizamos a tecnologia de sistema de geomonitoramento, blockchain e análise de big data para:',
    usos: ['Identificar desmatamentos recentes', 'Validar autorizações de supressão vegetal', 'Garantir que nenhum fornecedor esteja em áreas embargadas', 'Rastrear movimentações de gado em tempo real'],
    preventivo: 'Essas ferramentas nos permitem antever riscos e agir preventivamente, assegurando que nossa cadeia seja livre de ilegalidades.',
    passosIntro: 'Nosso objetivo é liderar a transição para uma pecuária de baixo carbono e zero desmatamento, e para isso:',
    passos: ['Ampliamos o diálogo com produtores rurais, incentivando a regularização ambiental.', 'Fortaleceremos parcerias com ONGs e institutos de pesquisa para desenvolver soluções inovadoras.', 'Implementaremos relatórios periódicos de sustentabilidade, aumentando a transparência para stakeholders.'],
    fecho: 'O Pantanal Beef não apenas cumpre regulamentações: nós as antecipamos. Acreditamos que a produção de carne sustentável é possível, e estamos comprometidos em tornar esse futuro uma realidade. Juntos, construímos uma pecuária responsável, do campo à mesa, com ética e qualidade.',
    frase: 'Pantanal Beef produzindo qualidade, alimentando desenvolvimento sustentável!',
  },
  lgpdContato: 'Estou ciente que ao me cadastrar no site, concordo que meus dados pessoais acima informados sejam tratados pela Pantanal Beef, para finalidade de contato e recebimento de informações da empresa, sendo certo que o armazenamento das informações será pelo prazo de 180 dias, quando então serão eliminados. Por fim, estou ciente que poderei revogar meu consentimento, sem custo e a qualquer momento.',
  lgpdCurriculo: 'Estou ciente que ao cadastrar meu currículo no site, concordo que meus dados pessoais informados através do currículo sejam tratados pela Pantanal Beef, com a finalidade de participar de processo seletivo para preenchimento de vaga de trabalho, podendo ser comunicado através de telefone, e-mail e WhatsApp, que o currículo poderá ser compartilhado entre empresas parceiras, sendo que o armazenamento das informações será pelo prazo de 180 dias, quando então serão eliminados. Por fim, estou ciente que poderei revogar meu consentimento, sem custo e a qualquer momento através do canal de atendimento: dpo@pantanalbeef.ind.br',
};

// Parceiros mostrados na página "Linha própria" do catálogo Maciatta.
export const parceiros = [
  { nome: 'Biglar', fotos: ['biglar-picanha', 'biglar-pack'] },
  { nome: 'Açougue 154', logo: 'acougue154', fotos: ['acougue154-gondola'] },
  { nome: 'BBQ Secrets', logo: 'bbq-secrets', fotos: ['bbq-secrets-pack'] },
  { nome: 'Canção', fotos: ['cancao-ancho', 'cancao-brisket'] },
  { nome: 'Origem', fotos: ['origem-fraldinha', 'origem-file'] },
];
