// Textos do site da Dispra. Tirados do site atual (dispra.com.br) em 2026-10-10.
// Os textos da empresa são os do site atual, só com a ortografia atualizada.

export const site = {
  nome: 'Dispra Distribuidora',
  dominio: 'https://dispra.overtus.com.br',
  atual: 'https://www.dispra.com.br/',
  fone: '(49) 3551-6000',
  foneHref: '+554935516000',
  gratis: '0800 049 5555',
  gratisHref: '08000495555',
  email: 'dispra@dispra.com.br',
  endereco: 'Av. Caetano Natal Branco, 1162',
  cidade: 'Joaçaba - SC',
  cep: '89600-000',
  horario: 'Televendas das 7h às 19h',
  facebook: 'https://www.facebook.com/dispra',
  nfe: 'http://www.cofrenfe.com.br',
  mapa: 'https://www.google.com/maps?q=Av.+Caetano+Natal+Branco,+1162,+Joa%C3%A7aba+-+SC&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Av.+Caetano+Natal+Branco,+1162,+Joa%C3%A7aba+-+SC',
};

// Menu na mesma ordem do site atual.
export const menu = [
  ['index', 'Home'],
  ['empresa', 'Empresa'],
  ['nutricao', 'Nutrição'],
  ['promocoes', 'Promoções'],
  ['atendimento', 'Atendimento'],
  ['dispra-no-campo', 'Dispra no Campo'],
  ['produtos', 'Produtos'],
  ['artigos', 'Artigos Técnicos'],
  ['contato', 'Contato'],
];

// [título da aba, descrição]
export const paginas = {
  index: ['Dispra Distribuidora · Produtos veterinários e nutrição animal no Sul do Brasil', 'Distribuidora de produtos veterinários e suplementos minerais em Joaçaba (SC), com frota própria, televendas 0800 e assistência técnica no campo.'],
  empresa: ['Empresa · Dispra Distribuidora', 'Missão, área comercial, assistência técnica, logística e parcerias da Dispra Distribuidora.'],
  nutricao: ['Nutrição · PNI Nutrição Animal e Dispra', 'Suplementos minerais, núcleos e aditivos PNI Nutrição Animal, com fábrica certificada BPF e HACCP.'],
  promocoes: ['Promoções · Dispra Distribuidora', 'Preços baixos e melhores condições de compra. Fale com um representante ou ligue 0800 049 5555.'],
  atendimento: ['Atendimento · Dispra Distribuidora', 'Representantes em Santa Catarina, Paraná e Rio Grande do Sul, televendas 0800 e frota própria.'],
  'dispra-no-campo': ['Dispra no Campo · Assistência técnica e eventos', 'Médicos veterinários e zootecnistas no campo, palestras com cooperativas e presença nas maiores feiras agropecuárias.'],
  produtos: ['Produtos · Dispra Distribuidora', 'Medicamentos veterinários e suplementos minerais para bovinos de corte e leite, suínos, equinos, caprinos, ovinos, aves e pequenos animais.'],
  artigos: ['Artigos Técnicos · Dispra Distribuidora', 'Artigos técnicos sobre nutrição e sanidade animal escritos pela equipe da Dispra.'],
  'artigos/leveduras-na-nutricao-de-ruminantes': ['Leveduras na Nutrição de Ruminantes · Artigos Técnicos Dispra', 'Como as leveduras Saccharomyces cerevisiae ajudam o rúmen, por Cristiano Cunico Neto, zootecnista.'],
  indicadores: ['Indicadores · Cotações e previsão do tempo', 'Previsão do tempo, dólar, farelos, preço do suíno e cotações agropecuárias em um só lugar.'],
  'trabalhe-conosco': ['Trabalhe conosco · Dispra Distribuidora', 'Oportunidades de carreira na Dispra Distribuidora. Junte-se à nossa empresa.'],
  contato: ['Contato · Dispra Distribuidora', 'Av. Caetano Natal Branco, 1162, Joaçaba (SC). Telefone (49) 3551-6000, 0800 049 5555 e dispra@dispra.com.br.'],
};

// Banners do site atual, na mesma ordem e com os mesmos títulos.
export const banners = [
  { t: 'Tecnologia e saúde para seu rebanho', s: 'As melhores marcas em medicamentos.', img: 'laboratorio', banco: false, link: 'produtos', cta: 'Ver produtos' },
  { t: 'As melhores ferramentas para pecuária de corte', s: 'Suplementos minerais PNI Nutrição Animal para cada fase do rebanho.', img: 'hero-corte', banco: true, link: 'nutricao', cta: 'Conhecer a nutrição PNI' },
  { t: 'Distribuição em todo Sul do Brasil', s: 'Entrega ágil e confiável, com frota própria.', img: 'caminhoes', banco: false, link: 'atendimento', cta: 'Encontrar um representante' },
  { t: 'Soluções para bovinos de leite', s: 'Núcleos e suplementos minerais.', img: 'hero-leite', banco: true, link: 'nutricao', cta: 'Ver soluções para leite' },
  { t: 'Qualidade e resultado com garantia certificada!', s: 'Empresa certificada · Feed & Food Safety.', img: 'fabrica-bpf', banco: false, link: 'nutricao', cta: 'Conhecer a fábrica' },
];

export const empresa = {
  intro: 'Respeito, excelência na qualidade dos produtos e agilidade na entrega fazem da Dispra Distribuidora uma empresa líder no segmento de distribuição de produtos veterinários e suplementos minerais no Sul do Brasil.',
  missao: 'Desenvolver e aprimorar a comercialização e distribuição de produtos veterinários e suplementos minerais, visando atender as expectativas e necessidades dos clientes.',
  comercial: [
    'Com foco na comercialização e distribuição de suplementos minerais e medicamentos veterinários para utilização em bovinos de corte e leite, suínos, equinos, caprinos, ovinos, aves e pequenos animais, a Dispra Distribuidora fortalece seu departamento comercial com diferenciais que a tornam uma referência no Sul do Brasil.',
    'A equipe de vendas é constantemente treinada para oferecer o máximo de conhecimento sobre sua linha de produtos a clientes e produtores.',
    'Outro diferencial da Dispra é o setor de televendas à disposição dos clientes para compra, dúvidas e reclamações, durante 12 horas por dia em horário diferenciado, das 7h às 19h. Desta forma, é possível agilizar o pedido em horários alternativos.',
  ],
  assistencia: [
    'A Dispra, além de fornecer produtos de excelente qualidade, preocupa-se com a utilização correta dos mesmos e com as boas práticas no campo. Por isso a equipe de médicos veterinários e zootecnistas está no campo fornecendo orientações importantes sobre nutrição animal, reprodução e prevenção a doenças.',
    'Outro serviço que a Dispra Distribuidora disponibiliza são palestras em parceria com as cooperativas, laticínios, lojas agropecuárias e produtores, onde seus técnicos transmitem informações e técnicas focadas na produção sustentável e lucrativa, além de informar sobre os lançamentos de produtos e as vantagens que os medicamentos e a nutrição PNI garantem.',
  ],
  logistica: 'O setor de logística funciona muito bem, já que a cidade de Joaçaba está estrategicamente localizada, com uma distância quase equivalente entre as principais capitais dos três estados do Sul, e cercada por importantes rodovias, tanto estaduais como federais.',
  parcerias: 'Além dos serviços diferenciados da Dispra Distribuidora, outros ingredientes são fundamentais para manter a consistente relação entre a empresa e seus parceiros (cooperativas, laticínios, lojas agropecuárias e fornecedores de produtos). Respeito, transparência, clareza nas informações, sinceridade e honestidade com que os negócios são conduzidos acabam por estabelecer uma relação de extrema confiança entre a Dispra Distribuidora e seus clientes.',
  valores: ['Respeito', 'Transparência', 'Clareza nas informações', 'Sinceridade', 'Honestidade'],
};

export const pni = {
  texto: [
    'A PNI está no mercado brasileiro com inovações na produção de suplementos minerais e aditivos alimentares para a nutrição animal.',
    'O respeito a todas as normas e protocolos dos processos produtivos, assim como a tecnologia da moderna nutrição animal, com seleção de matérias-primas nobres e um controle rígido da qualidade de seus produtos, garantem os resultados da linha de produtos.',
  ],
  juntas: 'PNI e Dispra Distribuidora juntas para melhor atender ao setor de nutrição animal, com entrega rápida e atendimento profissional das equipes técnica e comercial.',
  frase: 'Excelentes resultados aliando experiência com a mais alta tecnologia.',
};

// Espécies atendidas, como no texto "Comercial – Representação". Fotos de banco onde não há foto real.
export const especies = [
  ['Bovinos de corte', 'corte', 'Suplementos minerais e medicamentos para a pecuária de corte.'],
  ['Bovinos de leite', 'leite', 'Núcleos e suplementos minerais para o rebanho leiteiro.'],
  ['Suínos', 'suinos', 'Medicamentos veterinários para suínos.'],
  ['Equinos', 'equinos', 'Medicamentos veterinários e suplementação para equinos.'],
  ['Ovinos', 'ovinos', 'Suplementação e sanidade para ovinos.'],
  ['Caprinos', 'caprinos', 'Suplementação e sanidade para caprinos.'],
  ['Aves', 'aves', 'Produtos veterinários para aves.'],
];

// Promoções do site atual.
export const promocoes = [
  { nome: 'NT-51', img: 'nt51', w: 216, h: 320, txt: 'Condições especiais de compra.' },
  { nome: 'Raktil', img: 'raktil', w: 218, h: 218, txt: 'Condições especiais de compra.' },
];

// Eventos listados na home atual ("Eventos anteriores que participamos").
export const eventos = [
  ['Expointer', 'Esteio · RS'],
  ['Dia de Campo e Negócios da 3 Marias Agropecuária', 'Dia de campo'],
  ['Expotílias', 'Feira agropecuária'],
  ['Expodireto Cotrijal', 'Não-Me-Toque · RS'],
  ['Itaipu Rural Show', 'Pinhalzinho · SC'],
  ['Show Rural Coopavel', 'Cascavel · PR'],
];

export const artigo = {
  slug: 'leveduras-na-nutricao-de-ruminantes',
  titulo: 'Leveduras na Nutrição de Ruminantes',
  autor: 'Cristiano Cunico Neto, zootecnista',
  resumo: 'Como as leveduras Saccharomyces cerevisiae protegem a flora do rúmen, estabilizam o pH e melhoram o aproveitamento da fibra.',
  // Resumo do artigo publicado no site atual. Colar o texto completo quando a Dispra enviar.
  partes: [
    ['O papel das leveduras', 'Suplementos à base de leveduras, como a Saccharomyces cerevisiae, vêm sendo usados para melhorar a nutrição de ruminantes. A levedura consome o oxigênio presente no rúmen e, com isso, protege os microrganismos anaeróbios, entre eles as bactérias celulolíticas, responsáveis por digerir a fibra das plantas.'],
    ['pH mais estável', 'A levedura também ajuda a estabilizar o pH ruminal, porque reduz o acúmulo de lactato. Um rúmen mais estável trabalha melhor e pode inclusive reduzir a produção de metano.'],
    ['Resultados no rebanho', 'Com esses efeitos, aumentam a degradação dos alimentos, o consumo e o teor de gordura do leite. A levedura ainda ajuda a barrar bactérias indesejáveis no intestino.'],
  ],
};

// Página "Indicadores" do site atual: links externos.
export const indicadores = [
  ['Previsão do tempo', 'Climatempo', 'https://www.climatempo.com.br/'],
  ['Valor do dólar', 'Debit', 'https://www.debit.com.br/'],
  ['Farelo, soja, casquinha de soja, farelo de trigo', 'Scot Consultoria', 'https://www.scotconsultoria.com.br/'],
  ['Preço do suíno', 'Suínos.com', 'https://www.suinos.com.br/'],
  ['Cotações agropecuárias', 'Agrolink', 'https://www.agrolink.com.br/cotacoes/'],
];

export const assuntos = ['Compra de produtos', 'Dúvidas', 'Sugestões', 'Trabalhe conosco', 'Novartis', 'Outros'];
export const estados = [['SC', 'Santa Catarina'], ['PR', 'Paraná'], ['RS', 'Rio Grande do Sul']];
