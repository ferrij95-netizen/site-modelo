// Conteúdo da Produvale. Fonte: site atual produvale.com.br (home, produtos, parceiros, contato; páginas de 2009).
// Os textos "exemplos" de cada linha são itens típicos da linha, escritos por nós: confirmar com o cliente.
export const empresa = {
  nome: 'Produvale',
  razao: 'Produvale Produtos Hospitalares Ltda',
  url: 'https://produvale.overtus.com.br/',
  antigo: 'http://produvale.com.br/',
  fundacao: 1996,
  cidade: 'Blumenau · SC',
  endereco: 'Rua Colibri, 425',
  bairro: 'Salto Weissbach',
  cidadeUf: 'Blumenau, SC',
  cep: '89032-235',
  telefone: '(47) 3323-5244',
  email: 'produvale@produvale.com.br',
  afe: 'P0334M12L4XW',
  afeData: '21/05/2007',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Colibri+425+Salto+Weissbach+Blumenau+SC',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Colibri,+425,+Salto+Weissbach,+Blumenau+-+SC,+89032-235&output=embed',
};

// Texto da home do site atual, sem mudar o sentido.
export const sobre = [
  'Com sede em Blumenau, a Produvale foi fundada em 1996. Atua, desde então, no segmento médico-hospitalar, na comercialização e distribuição de produtos para saúde.',
  'Com forte atuação no mercado público, tem se consolidado na comercialização de produtos de marcas renomadas e na presteza no atendimento, alcançando o respeito e o reconhecimento de clientes e fornecedores.',
];

// As 7 linhas da página "Produtos" do site atual, na mesma ordem.
export const linhas = [
  { id: 'consumo', nome: 'Material de consumo hospitalar', curto: 'Consumo hospitalar', img: 'consumo',
    texto: 'O que o hospital, a UBS e a clínica usam todos os dias, com reposição constante e marcas conhecidas pela equipe de enfermagem.',
    exemplos: ['Gazes, compressas e ataduras', 'Seringas e agulhas', 'Curativos e fitas', 'Fios de sutura'],
    marcas: ['cremer', 'injex', 'shalon', 'mda'] },
  { id: 'instrumental', nome: 'Instrumental cirúrgico', curto: 'Instrumental', img: 'instrumental',
    texto: 'Instrumentos para centro cirúrgico, ambulatório e consultório, avulsos ou em caixas montadas.',
    exemplos: ['Pinças e tesouras', 'Porta-agulhas', 'Cubas e bandejas inox', 'Caixas cirúrgicas'],
    marcas: [] },
  { id: 'moveis', nome: 'Móveis e equipamentos médicos', curto: 'Móveis e equipamentos', img: 'moveis',
    texto: 'Mobiliário e equipamentos para enfermarias, consultórios e unidades de saúde.',
    exemplos: ['Camas e macas', 'Mesas auxiliares e suportes de soro', 'Balanças', 'Esfigmomanômetros'],
    marcas: ['welmy'] },
  { id: 'odontologicos', nome: 'Equipamentos odontológicos', curto: 'Odontológicos', img: 'odontologico',
    texto: 'Equipamentos e biossegurança para consultórios odontológicos públicos e particulares.',
    exemplos: ['Autoclaves', 'Seladoras', 'Equipamentos de biossegurança', 'Acessórios de consultório'],
    marcas: ['cristofoli'] },
  { id: 'laboratorio', nome: 'Produtos para laboratório', curto: 'Laboratório', img: 'laboratorio',
    texto: 'Material para coleta e análise em laboratórios de análises clínicas e unidades de saúde.',
    exemplos: ['Coletores universais', 'Tubos e frascos', 'Ponteiras e pipetas', 'Lâminas e lamínulas'],
    marcas: ['adlin'] },
  { id: 'descartaveis', nome: 'Descartáveis', curto: 'Descartáveis', img: 'descartaveis',
    texto: 'Itens de uso único para proteção do profissional e do paciente.',
    exemplos: ['Luvas de procedimento', 'Máscaras e toucas', 'Aventais e campos', 'Propés'],
    marcas: ['supermax', 'mda'] },
  { id: 'saneantes', nome: 'Saneantes', curto: 'Saneantes', img: 'saneantes',
    texto: 'Produtos para limpeza, desinfecção e higienização de ambientes e artigos de saúde.',
    exemplos: ['Detergentes enzimáticos', 'Desinfetantes', 'Álcool e antissépticos', 'Sabonetes'],
    marcas: ['tecpon'] },
];

// Página "Parceiros" do site atual (os links são os mesmos do site atual).
export const marcas = [
  { id: 'adlin', nome: 'Adlin', url: 'https://www.adlin.com.br/', area: 'Plásticos para laboratório' },
  { id: 'cremer', nome: 'Cremer', url: 'https://www.cremer.com.br/', area: 'Curativos e material de consumo' },
  { id: 'cristofoli', nome: 'Cristófoli', url: 'https://cristofoli.com/', area: 'Biossegurança e odontologia' },
  { id: 'injex', nome: 'Injex', url: 'https://www.injex.com.br/', area: 'Seringas e agulhas' },
  { id: 'lmfarma', nome: 'LM Farma', url: 'http://www.lmfarma.com.br/', area: '' },
  { id: 'mda', nome: 'MDA Têxtil', url: 'http://www.mdatextil.com.br/', area: 'Têxteis médico-hospitalares' },
  { id: 'medihouse', nome: 'Medi House', url: 'http://www.medihouse.com.br/', area: '' },
  { id: 'missner', nome: 'Missner', url: 'https://missner.com.br/', area: '' },
  { id: 'shalon', nome: 'Shalon', url: 'http://www.shalonsuturas.com.br/', area: 'Fios de sutura' },
  { id: 'supermax', nome: 'Supermax', url: 'http://www.supermax-brasil.com/', area: 'Luvas' },
  { id: 'tecpon', nome: 'Tecpon', url: 'https://www.tecpon.com.br/', area: 'Higienização e saneantes' },
  { id: 'welmy', nome: 'Welmy', url: 'http://www.welmy.com.br/', area: 'Balanças e equipamentos' },
];

// Quem a Produvale atende (o site fala em mercado público; os outros são o público natural de uma distribuidora hospitalar).
export const clientes = [
  { nome: 'Prefeituras e secretarias de saúde', texto: 'Fornecimento por licitação, pregão e ata de registro de preços.' },
  { nome: 'Hospitais e pronto-atendimentos', texto: 'Reposição de consumo, instrumental e equipamentos.' },
  { nome: 'Clínicas, consultórios e laboratórios', texto: 'Linhas médica, odontológica e de análises clínicas.' },
];

// Como funciona um fornecimento (etapas genéricas de distribuidora para o setor público: confirmar com o cliente).
export const etapas = [
  { t: 'Edital ou pedido', d: 'Recebemos o edital, a cotação ou a lista de itens.' },
  { t: 'Proposta', d: 'Indicamos marcas com registro na ANVISA e preparamos a proposta.' },
  { t: 'Entrega', d: 'Separação e envio a partir de Blumenau, no prazo combinado.' },
  { t: 'Acompanhamento', d: 'Atendimento direto para reposições, trocas e novas compras.' },
];
