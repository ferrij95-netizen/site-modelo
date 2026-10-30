// Textos e dados da Hawai Transportes de Veículos. Tudo que está aqui veio do site atual (www.hawaitransporte.com.br),
// exceto o que está marcado como "escrito por nós".
export const empresa = {
  nome: 'Hawai Transportes',
  razao: 'Hawai Transportes de Veículos LTDA',
  url: 'https://hawaitransporte.overtus.com.br/',
  antigo: 'https://www.hawaitransporte.com.br/',
  whatsapp: '5585999030753',
  instagram: 'https://www.instagram.com/_hawaitransportes/',
  instagramNome: '@_hawaitransportes',
  frase: 'Transportamos para as principais cidades do Brasil com eficiência, segurança e responsabilidade',
};

export const unidades = [
  {
    id: 'fortaleza',
    cidade: 'Fortaleza',
    uf: 'CE',
    titulo: 'Fortaleza - CE',
    endereco: 'BR 116, km 03, nº 6300, salas 24/25, Aerolândia',
    complemento: 'Anexo ao posto São Cristóvão',
    cep: '60.850-012',
    fixos: ['(85) 3227 6677', '(85) 3227 3737'],
    celulares: ['(85) 9 9903 0937', '(85) 9 9903 0740', '(85) 9 9903 0745', '(85) 9 9903 0753'],
    mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1990.5780298733052!2d-38.517222541773755!3d-3.776202699313203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74f3ab16db897%3A0xf2ebd0cd981678d6!2sHawai+Transporte!5e0!3m2!1spt-BR!2sbr!4v1493931043157',
    rota: 'https://www.google.com/maps/search/?api=1&query=Hawai+Transporte+BR+116+6300+Aerol%C3%A2ndia+Fortaleza',
    lonlat: [-38.52, -3.78],
  },
  {
    id: 'guarulhos',
    cidade: 'Guarulhos',
    uf: 'SP',
    titulo: 'Guarulhos - SP',
    endereco: 'Rua Buenopolis, 220, Parque Alvorada',
    complemento: '',
    cep: '07.242-340',
    fixos: ['(11) 2480 1323', '(11) 2303 5959'],
    celulares: [],
    mapa: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3660.7099664915945!2d-46.420589!3d-23.434842!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce89e00d3a40bb%3A0xab09e81ff6b7e49!2sR.%20Buenopolis%20-%20Jardim%20Pres.%20Dutra%2C%20Guarulhos%20-%20SP%2C%2007242-340%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1760470269702!5m2!1spt-BR!2sus',
    rota: 'https://www.google.com/maps/search/?api=1&query=Rua+Buenopolis+220+Guarulhos+SP',
    lonlat: [-46.42, -23.43],
  },
];

// Os três blocos de "A história da Hawaí Transporte", na ordem do site atual.
export const historia = [
  {
    titulo: 'A história da Hawai Transporte',
    texto: 'Surgiu no final da década de 90, fruto das necessidades que o mercado de transporte de veículos tinha em ter uma empresa local que apresentasse alto grau de confiabilidade e pontualidade, e que pudesse atender a todos os segmentos envolvidos em veículos, tais como revendedores, locadoras, frotistas e pessoas físicas em geral.',
    mais: 'Desde a sua fundação, a maior preocupação dos seus gestores foi primar pela qualidade dos serviços oferecidos e, para tanto, não pouparam esforços em montar uma equipe altamente comprometida em oferecer aos seus clientes os melhores serviços, tratando cada cliente de forma personalizada a fim de superar todas as suas expectativas com relação aos serviços executados.',
  },
  {
    titulo: 'Além de uma equipe treinada e motivada',
    texto: 'A Hawai Transporte também tem como um de seus pilares fundamentais o investimento em equipamentos e tecnologia. Baseada nesses princípios, a empresa investe fortemente em manter uma frota de carretas novas, cada uma equipada com rastreador 24 horas, com a localização em tempo real.',
    mais: 'Sem contar com um enorme galpão coberto para melhor acomodar os veículos, gerando mais segurança e cuidado com eles. E, para garantir a tranquilidade dos nossos clientes, todos os veículos transportados contam com seguro RC/TRC.',
  },
  {
    titulo: 'Por essas e outras razões',
    texto: 'A nossa empresa vem crescendo de forma contínua e consistente ao longo de todos estes anos, porque, para nós, transportar veículos é muito mais que transportar bens: na verdade, transportamos sonhos e progresso que ajudam a alavancar o desenvolvimento do nosso país.',
    mais: 'Por isso, quando precisar de transporte de veículos, entre em contato conosco. Será um grande prazer tê-lo como cliente.',
  },
];

// Os quatro diferenciais citados no texto do site atual (títulos curtos escritos por nós).
export const pilares = [
  { icone: 'caminhao', titulo: 'Frota de carretas novas', texto: 'Caminhões cegonha novos, mantidos para rodar com pontualidade.' },
  { icone: 'sat', titulo: 'Rastreador 24 horas', texto: 'Cada carreta tem rastreador, com a localização em tempo real.' },
  { icone: 'galpao', titulo: 'Galpão coberto', texto: 'Um enorme galpão para acomodar os veículos com mais segurança.' },
  { icone: 'escudo', titulo: 'Seguro RC/TRC', texto: 'Todos os veículos transportados contam com seguro RC/TRC.' },
];

// Segmentos atendidos, do primeiro parágrafo da história. Descrições curtas escritas por nós.
export const segmentos = [
  { titulo: 'Revendedores', texto: 'Concessionárias e lojas que precisam receber ou enviar veículos com prazo.' },
  { titulo: 'Locadoras', texto: 'Remanejamento de frota entre cidades e estados.' },
  { titulo: 'Frotistas', texto: 'Empresas que movimentam a própria frota de carros e utilitários.' },
  { titulo: 'Pessoas físicas', texto: 'Mudança de cidade, compra em outro estado ou retorno do carro de viagem.' },
];

// Etapas do serviço: escritas por nós a partir do que o site atual descreve (cotação, galpão, rastreador, seguro).
export const etapas = [
  { titulo: 'Cotação', texto: 'Você informa origem, destino e o veículo, pelo formulário ou WhatsApp.' },
  { titulo: 'Recebimento', texto: 'O veículo é recebido e fica no galpão coberto até o embarque.' },
  { titulo: 'Embarque na cegonha', texto: 'Carregamento na carreta, com seguro RC/TRC durante todo o trajeto.' },
  { titulo: 'Viagem rastreada', texto: 'Rastreador 24 horas, com a localização da carreta em tempo real.' },
  { titulo: 'Entrega', texto: 'O veículo chega ao destino combinado, na cidade escolhida.' },
];

// Galeria do site atual, com as legendas originais (corrigidas só na grafia).
export const galeria = [
  { img: 'cegonha-patio', legenda: 'Transportando alguns veículos' },
  { img: 'cegonha-mercedes-vermelha', legenda: 'Preparando para transportar seu veículo' },
  { img: 'cegonha-iveco-carregada', legenda: 'Transporte de veículos com agilidade' },
  { img: 'cegonha-na-rodovia', legenda: 'Transporte de veículos para todo o Brasil' },
  { img: 'cegonha-volvo-azul', legenda: 'Transportamos veículos com nossos caminhões cegonha' },
  { img: 'cegonha-mercedes-prata', legenda: 'Abastecendo nosso caminhão para transportar os veículos' },
  { img: 'cegonha-abastecendo', legenda: 'Pronto para transportar os veículos' },
  { img: 'cegonha-iveco-branca', legenda: 'Caminhão cegonha preparando para transportar os veículos' },
  { img: 'sede-fortaleza', legenda: 'Nossa empresa, Hawai Transportes' },
];

export const ufs = [
  ['AC', 'Acre'], ['AL', 'Alagoas'], ['AP', 'Amapá'], ['AM', 'Amazonas'], ['BA', 'Bahia'], ['CE', 'Ceará'], ['DF', 'Distrito Federal'],
  ['ES', 'Espírito Santo'], ['GO', 'Goiás'], ['MA', 'Maranhão'], ['MT', 'Mato Grosso'], ['MS', 'Mato Grosso do Sul'], ['MG', 'Minas Gerais'],
  ['PA', 'Pará'], ['PB', 'Paraíba'], ['PR', 'Paraná'], ['PE', 'Pernambuco'], ['PI', 'Piauí'], ['RJ', 'Rio de Janeiro'], ['RN', 'Rio Grande do Norte'],
  ['RS', 'Rio Grande do Sul'], ['RO', 'Rondônia'], ['RR', 'Roraima'], ['SC', 'Santa Catarina'], ['SP', 'São Paulo'], ['SE', 'Sergipe'], ['TO', 'Tocantins'],
];
