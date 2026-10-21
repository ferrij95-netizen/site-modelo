// Textos e dados do Grupo Tozzo, tirados do site atual (grupotozzo.com.br) e dos sites das empresas do grupo
// (tozzocereais, tozzobebidas, transtozzo, tozzofazenda), em 21/10/2026. O que foi escrito por nós está marcado com "nosso".

export const empresa = {
  nome: 'Grupo Tozzo',
  razao: 'Tozzo Alimentos Ltda.',
  cnpj: '01.314.317/0001-65',
  fone: '(49) 3321-1000',
  foneHref: '+554933211000',
  email: 'contato@grupotozzo.com.br',
  rua: 'Acesso Plínio Arlindo de Nês, 4303-D, Sala 101',
  bairro: 'Belvedere, Chapecó - SC',
  cep: '89810-460',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Acesso+Pl%C3%ADnio+Arlindo+de+N%C3%AAs+4303+Chapec%C3%B3+SC',
  url: 'https://tozzo.overtus.com.br/',
  antigo: 'http://www.grupotozzo.com.br/',
};

// Texto da página "Sobre o Grupo Tozzo", com a grafia corrigida.
export const sobre = [
  'O Grupo Tozzo é composto por diversas empresas. Dentre elas destacam-se a Tozzo Alimentos, a Tozzo Bebidas, a Cerealista Tozzo, a Tozzo Distribuidora, a Tozzo Atacado, a Tozzo Atacado de Balcão, a Tozzo Transportes (Transtozzo) e a Fazenda Tozzo. Cada uma dessas empresas carrega a responsabilidade e, sobretudo, os valores associados à marca Tozzo.',
  'A atuação das empresas somadas abrange os três estados do Sul. Algumas são regionais, como é o caso da Tozzo Bebidas, e outras vendem para todo o Brasil, como é o caso da Tozzo Cerealista.',
  'Na área de distribuição, destaca-se por ser uma das pioneiras do país a utilizar o sistema Broker, ou seja, possui uma filial da indústria dentro da empresa. Esta é uma forma diferenciada de distribuir os produtos. No atacado, o principal diferencial é o mix de produtos, que ultrapassa os 5 mil itens e abrange alguns dos fornecedores de produtos de primeira necessidade mais bem conceituados do mercado.',
  'A estrutura logística de todas essas empresas tem o respaldo da Transtozzo, que possibilita o uso de frota própria pelas demais empresas do grupo e entregas em até 48 horas após o recebimento dos pedidos.',
];

export const numeros = [
  { n: '5 mil+', t: 'itens no mix do atacado' },
  { n: '48 h', t: 'para entregar depois do pedido' },
  { n: '353', t: 'carretas frigoríficas na frota' },
  { n: '14', t: 'filiais da Transtozzo' },
  { n: '3', t: 'países: Brasil, Argentina e Chile' },
];

// "Do grão à entrega": o caminho do Feijão Tozzo descrito no site atual (verticalização).
export const cadeia = [
  { emp: 'cerealista', verbo: 'Beneficia', t: 'A Cerealista Tozzo beneficia o feijão e o arroz em Cordilheira Alta (SC) e Feira de Santana (BA).', foto: 'cerealista-aereo' },
  { emp: 'alimentos', verbo: 'Distribui', t: 'A Tozzo Distribuidora leva os produtos ao varejo, inclusive pelo sistema Broker, com uma filial da indústria dentro da empresa.', foto: 'armazem' },
  { emp: 'alimentos', verbo: 'Vende', t: 'A Tozzo Atacado e o Atacado de Balcão vendem um mix de mais de 5 mil itens de primeira necessidade.', foto: 'complexo-aereo' },
  { emp: 'transportes', verbo: 'Entrega', t: 'A Transtozzo transporta com frota própria e entrega em até 48 horas depois do pedido.', foto: 'frota-trio' },
];

export const empresas = [
  {
    slug: 'alimentos', nome: 'Tozzo Alimentos', sub: 'Atacado e Distribuidor', logo: 'logo',
    frase: 'Uma grande diversidade de produtos congelados, embutidos e enlatados.',
    foto: 'armazem', fotos: ['armazem', 'complexo-aereo', 'fachada', 'frota-entrega', 'complexo-aereo-2'],
    texto: [
      'A Tozzo Alimentos trabalha com uma grande diversidade de produtos congelados, embutidos e enlatados. Reúne a Tozzo Distribuidora, a Tozzo Atacado e a Tozzo Atacado de Balcão.',
      'Na distribuição, é uma das pioneiras do país a utilizar o sistema Broker: uma filial da indústria dentro da empresa. No atacado, o mix ultrapassa 5 mil itens e reúne alguns dos fornecedores de produtos de primeira necessidade mais bem conceituados do mercado.',
    ],
    fatos: ['Mais de 5 mil itens no mix', 'Sistema Broker na distribuição', 'Atacado e Atacado de Balcão', 'Entregas em até 48 horas com a Transtozzo'],
    fone: '(49) 3321-1000', site: 'https://www.tozzoalimentos.com.br/',
    enderecos: [['Chapecó - SC', 'Acesso Plínio Arlindo de Nês, 4303-D, Sala 101, Belvedere']],
  },
  {
    slug: 'cerealista', nome: 'Tozzo Cerealista', sub: 'Feijão e arroz', logo: 'logo-cerealista',
    frase: 'Uma das maiores lideranças nacionais nos mercados de arroz e feijão.',
    foto: 'cerealista-aereo', fotos: ['cerealista-aereo', 'cerealista-silos', 'empacotadora', 'cerealista-predio', 'empacotadora-2', 'cerealista-aereo-2', 'cerealista-escritorio'],
    texto: [
      'A Tozzo Cerealista é o braço do Grupo Tozzo no mercado de cereais. Tem sua matriz em Cordilheira Alta, no oeste de Santa Catarina, e filial em Feira de Santana, na Bahia. A distribuição se dá principalmente nos três estados do Sul, com o diferencial logístico da Transtozzo.',
      'Na cerealista, atuamos principalmente com o beneficiamento de feijão e arroz. Possuímos marcas próprias para embalá-los; dentre elas destacam-se as tradicionais Feijão Tozzo e Arroz Tozzo, muito populares no Sul do Brasil.',
      'É, sobretudo, através do trabalho sério e honesto que crescemos ao longo do tempo e construímos um empreendimento sólido que provê ao mercado produtos de alta qualidade.',
    ],
    fatos: ['Beneficiamento de feijão e arroz', 'Marcas Feijão Tozzo, Arroz Tozzo e Feijão da Feira', 'Matriz em Cordilheira Alta (SC)', 'Filial em Feira de Santana (BA)'],
    fone: '(49) 3358-0033', fone2: '(75) 3211-6000', email: 'contato@tozzocereais.com.br', site: 'https://www.tozzocereais.com.br/',
    enderecos: [['Cordilheira Alta - SC', 'Rodovia BR-282, s/n, Km 533'], ['Feira de Santana - BA', 'Rua Rio Pardo, nº 35, Bairro Santa Mônica II']],
  },
  {
    slug: 'bebidas', nome: 'Tozzo Bebidas', sub: 'Distribuidora exclusiva Heineken', logo: 'logo-bebidas',
    frase: 'Distribuidora exclusiva Heineken no oeste catarinense e no Paraná.',
    foto: 'frota-eisenbahn', fotos: ['bebidas-linha', 'frota-eisenbahn', 'frota-entrega'],
    texto: [
      'Fundada em Chapecó, a Tozzo Bebidas atua desde 2004 com foco na distribuição de bebidas nas regiões Oeste e Meio Oeste de Santa Catarina e Oeste, Sudoeste, Campos Gerais, Centro e Sul do Paraná.',
      'As empresas são sediadas em Chapecó (SC), Cascavel (PR), Ponta Grossa (PR) e Francisco Beltrão (PR), com Centros de Distribuição em Joaçaba e São Miguel do Oeste, em Santa Catarina, e em Foz do Iguaçu e Guarapuava, no Paraná.',
      'Atualmente a Tozzo Bebidas é distribuidora exclusiva Heineken, com as cervejas Heineken, Amstel, Schin, Glacial, Praya, Baden Baden, Lagunitas e Blue Moon, além da linha de não alcoólicos Fys, Itubaína, Mamba Water, Baer Mate, Suco Mitto e Skinka.',
    ],
    fatos: ['Desde 2004', 'Sedes em Chapecó, Cascavel, Ponta Grossa e Francisco Beltrão', 'CDs em Joaçaba, São Miguel do Oeste, Foz do Iguaçu e Guarapuava', 'Venda só para maiores de 18 anos'],
    fone: '(49) 3321-1022', site: 'https://www.tozzobebidas.com.br/', insta: 'https://www.instagram.com/tozzo.bebidas/',
    enderecos: [['Chapecó - SC', 'Acesso Plínio Arlindo de Nês, 3521-D, Belvedere'], ['Cascavel - PR', 'Av. Doutor Ezuel Portes, nº 19369'], ['Ponta Grossa - PR', 'Av. Continental, nº 2299']],
    marcas: ['b-heineken', 'b-heineken0-0', 'b-amstel', 'b-amstel-ultra', 'b-schin', 'b-glacial', 'b-baden-baden', 'b-devassa', 'b-lagunitas', 'b-bluemoon', 'b-itubaina', 'b-fys', 'b-skinka'],
  },
  {
    slug: 'transportes', nome: 'Tozzo Transportes', sub: 'Transtozzo', logo: 'logo-transportes',
    frase: 'Transporte rodoviário no Brasil, na Argentina e no Chile.',
    foto: 'frota-andes', fotos: ['frota-andes', 'frota-trio', 'frota-neve', 'frota-garagem', 'frota-frente', 'frota-montanha', 'frota-serra', 'frota-cordilheira', 'frota-estrada'],
    texto: [
      'Com presença no Brasil, na Argentina e no Chile, a Transportes Tozzo é referência no transporte rodoviário de alimentos, bebidas e produtos de higiene e limpeza. Sediada em Chapecó (SC), conta com 14 filiais: 5 em Santa Catarina, 4 no Paraná, 4 no Rio Grande do Sul e 1 em São Paulo.',
      'A frota tem idade média de 2,5 anos e é equipada com monitoramento em tempo real, controle de temperatura e gestão de jornada, garantindo segurança e pontualidade em cada entrega.',
      'A Tozzo se diferencia pelo atendimento personalizado, com Focais dedicados a cada cliente, oferecendo suporte exclusivo, comunicação direta e soluções sob medida, aliando inovação, manutenção preventiva e responsabilidade ambiental.',
    ],
    fatos: ['Monitoramento em tempo real', 'Controle de temperatura', 'Gestão de jornada', 'Focal dedicado a cada cliente'],
    frota: [{ n: '353', t: 'carretas frigoríficas' }, { n: '69', t: 'carretas de carga seca e Sider' }, { n: '100+', t: 'veículos leves dedicados ao grupo' }, { n: '2,5 anos', t: 'idade média da frota' }],
    filiais: [{ uf: 'SC', n: 5 }, { uf: 'PR', n: 4 }, { uf: 'RS', n: 4 }, { uf: 'SP', n: 1 }],
    fone: '(49) 3321-1001', email: 'transporte@transtozzo.com.br', site: 'https://www.transtozzo.com.br/',
    enderecos: [['Chapecó - SC', 'Acesso Plínio Arlindo de Nês (acesso BR-282), 4401-D, Belvedere']],
  },
  {
    slug: 'fazenda', nome: 'Fazenda Tozzo', sub: 'Cabanha São Sepé', logo: 'logo-fazenda',
    frase: 'Criação de bovinos de raça Charolês, com muitos prêmios em exposições.',
    foto: 'fazenda-campo', fotos: ['fazenda-campo', 'lavoura', 'milho'],
    texto: [
      'A Fazenda e Agropecuária Tozzo, também conhecida como Cabanha São Sepé, é uma criadora de bovinos de raça e ovinos, localizada em Chapecó (SC).',
      'A fazenda conta com reprodutores machos e fêmeas da raça Charolês. Os animais são selecionados e contabilizam todas as garantias de fertilidade e sanidade. Na região de Chapecó a genética Charolês domina a produção pecuária bovina e, como especialista em Charolês, a Tozzo Fazenda se coloca entre os principais nomes da pecuária catarinense.',
      'A empresa participa de exposições e coleciona muitos prêmios por seus belíssimos animais.',
    ],
    fatos: ['Reprodutores machos e fêmeas Charolês', 'Garantia de fertilidade e sanidade', 'Bovinos de raça e ovinos', 'Premiada em exposições'],
    fone: '(49) 3321-1000', site: 'https://www.tozzofazenda.com.br/',
    enderecos: [['Chapecó - SC', 'Av. Fernando Machado, 1653-D, Bairro São Cristóvão']],
  },
];

// Marcas parceiras da página "Parceiros" do site atual, separadas por categoria (separação nossa).
export const categorias = [
  { slug: 'cervejas', nome: 'Cervejas', marcas: ['b-heineken', 'b-heineken0-0', 'b-amstel', 'b-amstel-ultra', 'nova-schin', 'b-glacial', 'b-baden-baden', 'cerveja-devassa', 'cerveja-eisenbahn', 'b-lagunitas', 'b-bluemoon'] },
  { slug: 'nao-alcoolicos', nome: 'Refrigerantes e sucos', marcas: ['schin-refrigerantes', 'refrigerante-itubaina', 'suco-skinka', 'b-fys'] },
  { slug: 'destilados', nome: 'Destilados e vinhos', marcas: ['chivas-s', 'j-w', 'passport-p', 'vodka-ciroc', 'yce-s', 'ron-bacardi', 'grupo-campari', 'cinzano-bebidas', 'contreau-c', 'fante-raiska', 'velho-barreiro', 'underberg-u', 'vinho-aurora', 'vinho-c', 'global-bev'] },
  { slug: 'mercearia', nome: 'Mercearia', marcas: ['tozzo-feijao', 'tozzo-arroz', 'feijao-da-feira', 'gomes-da-costa', 'goias-verde', 'ducoco-c', 'melitta-2', 'vale-fertil'] },
  { slug: 'doces', nome: 'Chocolates e balas', marcas: ['bis-b', 'chocolates-m-m', 'snickers-chocolates', 's-t', 'halls-h', 'trident-t'] },
  { slug: 'limpeza', nome: 'Higiene e limpeza', marcas: ['unilever-u', 'gessy-lever', 'p-g', 'reckitt-r', 'bombril-b', 'materiais-de-limpeza-ito', 'astoria-papeis', 'l-m', 'l-m2'] },
  { slug: 'bazar', nome: 'Bazar e utilidades', marcas: ['grupo-bic', 'calcados-havaianas', 'lampadas-philips', 'fosforo-gaboardi', 'pregos-gerdau', 'extra-power'] },
  { slug: 'pet', nome: 'Pet', marcas: ['p-w'] },
];

// Nome de cada logo (o arquivo vem do nome que o site atual dá à imagem).
export const nomesMarca = {
  'b-heineken': 'Heineken', 'b-heineken0-0': 'Heineken 0.0', 'b-amstel': 'Amstel', 'b-amstel-ultra': 'Amstel Ultra', 'nova-schin': 'Nova Schin',
  'b-glacial': 'Glacial', 'b-baden-baden': 'Baden Baden', 'cerveja-devassa': 'Devassa', 'cerveja-eisenbahn': 'Eisenbahn', 'b-lagunitas': 'Lagunitas',
  'b-bluemoon': 'Blue Moon', 'b-devassa': 'Devassa', 'b-schin': 'Schin', 'b-itubaina': 'Itubaína', 'b-fys': 'Fys', 'b-skinka': 'Skinka',
  'schin-refrigerantes': 'Schin Refrigerantes', 'refrigerante-itubaina': 'Itubaína', 'suco-skinka': 'Skinka',
  'chivas-s': 'Chivas Regal', 'j-w': 'Johnnie Walker', 'passport-p': 'Passport', 'vodka-ciroc': 'Cîroc', 'yce-s': 'Smirnoff Ice', 'ron-bacardi': 'Bacardi',
  'grupo-campari': 'Campari', 'cinzano-bebidas': 'Cinzano', 'contreau-c': 'Cointreau', 'fante-raiska': 'Raiska', 'velho-barreiro': 'Velho Barreiro',
  'underberg-u': 'Underberg', 'vinho-aurora': 'Vinícola Aurora', 'vinho-c': 'Concha y Toro', 'global-bev': 'GlobalBev',
  'tozzo-feijao': 'Feijão Tozzo', 'tozzo-arroz': 'Arroz Tozzo', 'feijao-da-feira': 'Feijão da Feira', 'gomes-da-costa': 'Gomes da Costa', 'goias-verde': 'Goiás Verde', 'ducoco-c': 'Ducoco', 'melitta-2': 'Melitta', 'vale-fertil': 'Vale Fértil',
  'bis-b': 'Bis', 'chocolates-m-m': "M&M's", 'snickers-chocolates': 'Snickers', 's-t': 'Twix', 'halls-h': 'Halls', 'trident-t': 'Trident',
  'unilever-u': 'Unilever', 'gessy-lever': 'Gessy Lever', 'p-g': 'P&G', 'reckitt-r': 'Reckitt Benckiser', 'bombril-b': 'Bombril', 'materiais-de-limpeza-ito': 'Ito',
  'astoria-papeis': 'Astória', 'l-m': 'Royal Pack', 'l-m2': 'Absoluto',
  'grupo-bic': 'BIC', 'calcados-havaianas': 'Havaianas', 'lampadas-philips': 'Philips', 'fosforo-gaboardi': 'Gaboardi', 'pregos-gerdau': 'Pregos Gerdau', 'extra-power': 'Extra Power',
  'p-w': 'Pedigree e Whiskas',
};

// Linha da Cerealista (tozzocereais.com.br/Produtos).
export const produtos = [
  { slug: 'feijao-vermelho-1kg', nome: 'Feijão Vermelho Tozzo', det: 'Tipo 1 · 1 kg', tipo: 'Carioca e cores' },
  { slug: 'feijao-cores-vermelho-500g', nome: 'Feijão Cores (Vermelho) Tozzo', det: 'Tipo 1 · 500 g', tipo: 'Carioca e cores' },
  { slug: 'feijao-cores-tipo2-1kg', nome: 'Feijão Cores Tozzo', det: 'Tipo 2 · 1 kg', tipo: 'Carioca e cores' },
  { slug: 'feijao-branco-500g', nome: 'Feijão Branco Tozzo', det: 'Tipo 1 · 500 g', tipo: 'Branco' },
  { slug: 'feijao-preto-1kg', nome: 'Feijão Preto Tozzo', det: 'Tipo 1 · 1 kg', tipo: 'Preto' },
  { slug: 'feijao-preto-super-1kg', nome: 'Feijão Preto Super Tozzo', det: 'Tipo 1 · 1 kg', tipo: 'Preto' },
  { slug: 'feijao-preto-da-feira-1kg', nome: 'Feijão Preto da Feira', det: 'Tipo 1 · 1 kg', tipo: 'Preto' },
];

export const telefones = [
  ['Grupo Tozzo e Tozzo Alimentos', '(49) 3321-1000', '+554933211000'],
  ['Tozzo Bebidas', '(49) 3321-1022', '+554933211022'],
  ['Transportes Tozzo', '(49) 3321-1001', '+554933211001'],
  ['Tozzo Cerealista', '(49) 3358-0033', '+554933580033'],
  ['Cerealista em Feira de Santana', '(75) 3211-6000', '+557532116000'],
];

export const boletos = [
  ['Banco do Brasil', 'https://www63.bb.com.br/portalbb/boleto/boletos/hc21e,802,3322,10343.bbx'],
  ['Banrisul', 'https://ww8.banrisul.com.br/brb/link/Brbw2Lhw_Bloqueto_Titulos_Internet.aspx?SegundaVia=1&secao_id=2539'],
  ['Sicredi', 'https://si-web.sicredi.com.br/boletoweb/BoletoWeb.servicos.Index.task'],
  ['Itaú', 'https://www.itau.com.br/servicos/boletos/segunda-via/'],
  ['Santander', 'https://www.santander.com.br/atendimento-para-voce/boletos/emissao-boleto-vencido'],
];

export const links = {
  vagas: 'https://platform.senior.com.br/hcmrs/hcm/curriculo/?tenant=grupotozzocombr&tenantdomain=grupotozzo.com.br#!/vacancies/list',
  denuncias: 'https://www.grupotozzo.com.br/Canal_de_den%C3%BAncias',
  webmail: 'https://mail.grupotozzo.com.br/',
  optiwork: 'https://grupotozzo.work.optidata.cloud/',
  intranet: 'http://grupotozzo.ddns.com.br:1710/',
};

export const galeria = [
  { f: 'premio-1', t: 'Prêmios recebidos' }, { f: 'premio-2', t: 'Prêmios recebidos' },
  { f: 'sede-aereo', t: 'Vista aérea' }, { f: 'cerealista-silos', t: 'Tozzo Cerealista' },
  { f: 'frota-sede', t: 'Sede da Transtozzo' }, { f: 'armazem', t: 'Armazém do atacado' },
];
