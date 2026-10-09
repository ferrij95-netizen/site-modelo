// Textos da Engenho A. M. Ltda. O site atual (engenhoam.com.br, 2026-10-09) mostra só o logo, então não há texto para copiar.
// Fatos confirmados vêm do cadastro da empresa (CNPJ 75.197.160/0001-71): fundação em 28/03/1973, beneficiamento de arroz,
// fabricação de produtos do arroz, atacado de cereais com fracionamento e empacotamento, endereço e filiais antigas.
// O telefone vem do Apontador. Tudo o que foi escrito para o novo site e precisa ser confirmado está marcado com "PROPOSTO".

export const site = {
  nome: 'Engenho A. M.',
  razao: 'Engenho A. M. Ltda.',
  cnpj: '75.197.160/0001-71',
  dominio: 'https://engenho-am.overtus.com.br',
  assinatura: 'Comércio e beneficiamento de arroz',
  fundacao: 1973,
  tel: '(51) 3499-1015',
  telHref: '+555134991015',
  endereco: ['Av. Mário Ribeiro, 470, Centro', 'Eldorado do Sul/RS', 'CEP 92990-000'],
  mapa: 'https://www.google.com/maps?q=Av.+M%C3%A1rio+Ribeiro+470+Eldorado+do+Sul+RS&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Av.+M%C3%A1rio+Ribeiro+470+Eldorado+do+Sul+RS',
  atual: 'https://engenhoam.com.br/',
};

export const anos = 2026 - site.fundacao;

export const nav = [
  ['empresa', 'A empresa'],
  ['produtos', 'Produtos'],
  ['beneficiamento', 'Beneficiamento'],
  ['atacado', 'Para revenda'],
  ['contato', 'Contato'],
];

// [título da aba, descrição para buscadores]
export const paginas = {
  index: ['Engenho A. M. · Comércio e beneficiamento de arroz em Eldorado do Sul/RS', `Beneficiamento e empacotamento de arroz em Eldorado do Sul/RS desde ${site.fundacao}. Arroz branco, parboilizado e subprodutos para atacado e revenda.`],
  empresa: ['A empresa · Engenho A. M.', `Engenho de arroz familiar em Eldorado do Sul, na região metropolitana de Porto Alegre, desde ${site.fundacao}.`],
  produtos: ['Produtos · Engenho A. M.', 'Arroz branco tipo 1, arroz parboilizado e subprodutos do beneficiamento: farelo, quirera e casca.'],
  'produtos/arroz-branco': ['Arroz branco · Engenho A. M.', 'Arroz branco polido, grão longo fino, beneficiado e empacotado em Eldorado do Sul/RS.'],
  'produtos/arroz-parboilizado': ['Arroz parboilizado · Engenho A. M.', 'Arroz parboilizado, grão soltinho e mais nutritivo, beneficiado em Eldorado do Sul/RS.'],
  'produtos/subprodutos': ['Subprodutos do arroz · Engenho A. M.', 'Farelo, quirera e casca de arroz do beneficiamento, para ração, indústria e energia.'],
  beneficiamento: ['Beneficiamento · Engenho A. M.', 'Do arroz em casca ao pacote: recebimento, secagem, descasque, polimento, seleção e empacotamento.'],
  atacado: ['Para revenda · Engenho A. M.', 'Arroz para atacadistas, distribuidores, supermercados e cozinhas industriais. Fracionamento e empacotamento.'],
  contato: ['Contato · Engenho A. M.', `Av. Mário Ribeiro, 470, Eldorado do Sul/RS. Telefone ${site.tel}.`],
};

// PROPOSTO: as linhas abaixo são as que todo engenho de arroz produz. Confirmar com a empresa as marcas, os tipos e as embalagens.
export const produtos = [
  {
    id: 'arroz-branco', nome: 'Arroz branco', sub: 'Tipo 1 · grão longo fino', foto: 'arroz-branco',
    resumo: 'Polido e selecionado, para o arroz soltinho de todo dia.',
    texto: 'O arroz do prato de todo dia: grão longo fino, descascado, polido e selecionado grão a grão antes de ir para o pacote.',
    itens: [['Classe', 'Longo fino'], ['Tipo', 'Tipo 1'], ['Embalagens', '1 kg e 5 kg, fardos de 30 kg'], ['Para', 'Varejo, atacado e cozinhas']],
    pontos: ['Grãos inteiros e uniformes', 'Polimento que deixa o grão claro e limpo', 'Seleção eletrônica de impurezas e grãos manchados', 'Empacotado na própria unidade'],
  },
  {
    id: 'arroz-parboilizado', nome: 'Arroz parboilizado', sub: 'Tipo 1 · grão longo fino', foto: 'arroz-parboilizado',
    resumo: 'Grão mais firme e soltinho, que guarda mais nutrientes.',
    texto: 'No parboilizado o arroz ainda em casca passa por água quente e vapor antes de ser descascado. Os nutrientes da película migram para dentro do grão, que fica mais firme e soltinho depois de cozido.',
    itens: [['Classe', 'Longo fino'], ['Tipo', 'Tipo 1'], ['Embalagens', '1 kg e 5 kg, fardos de 30 kg'], ['Para', 'Varejo, atacado e cozinhas']],
    pontos: ['Não empapa e aceita reaquecer', 'Mais vitaminas e sais minerais do que o branco polido', 'Rende bem em cozinhas industriais e restaurantes', 'Mesma seleção eletrônica do arroz branco'],
  },
  {
    id: 'subprodutos', nome: 'Subprodutos', sub: 'Farelo, quirera e casca', foto: 'arroz-casca',
    resumo: 'O que sai do beneficiamento vira ração, insumo e energia.',
    texto: 'Nada se perde no engenho. O farelo, a quirera e a casca que saem do beneficiamento são vendidos a granel para fábricas de ração, criadores, indústrias e caldeiras.',
    itens: [['Farelo de arroz', 'Ração animal e indústria'], ['Quirera', 'Ração e consumo'], ['Casca', 'Biomassa para caldeiras e cama de aviário'], ['Venda', 'A granel ou ensacado']],
    pontos: ['Farelo vindo direto do polimento', 'Quirera separada na classificação', 'Casca para queima em caldeira ou cama de aviário', 'Retirada na unidade de Eldorado do Sul'],
  },
];
export const produto = id => produtos.find(p => p.id === id);

// Etapas do beneficiamento (o caminho de qualquer engenho de arroz). PROPOSTO: confirmar os equipamentos da unidade.
export const etapas = [
  ['Recebimento', 'O arroz em casca chega das lavouras, é pesado e tem umidade e impurezas medidas na amostra.'],
  ['Secagem e silos', 'Secagem até a umidade certa e armazenagem em silos, para beneficiar o ano todo com o mesmo padrão.'],
  ['Descasque', 'A casca é retirada e o grão integral segue para o brunimento.'],
  ['Polimento', 'O polimento tira a película e deixa o grão branco e limpo. Daqui sai o farelo.'],
  ['Seleção', 'Peneiras separam a quirera e a seleção eletrônica retira grãos manchados e impurezas.'],
  ['Empacotamento', 'O arroz é fracionado em pacotes de 1 e 5 kg e enfardado para a expedição.'],
];

// Números que estão no cadastro da empresa.
export const fatos = [
  [String(site.fundacao), 'ano de fundação'],
  [`${anos} anos`, 'beneficiando arroz'],
  ['Eldorado do Sul', 'na Grande Porto Alegre'],
];

// Unidades que a empresa já teve (filiais baixadas no cadastro), para a linha do tempo.
export const historia = [
  [String(site.fundacao), 'Fundação do Engenho A. M., em Eldorado do Sul.'],
  ['Expansão', 'Unidades e depósitos em Porto Alegre, Guaíba, São Paulo e Maringá ao longo das décadas.'],
  ['Hoje', 'Beneficiamento, empacotamento e venda concentrados na unidade de Eldorado do Sul.'],
];

export const clientes = [
  ['Atacadistas e distribuidores', 'Fardos e paletes para revenda, com o mesmo padrão de grão em todos os lotes.'],
  ['Supermercados e mercados', 'Pacotes de 1 e 5 kg prontos para a gôndola.'],
  ['Restaurantes e cozinhas industriais', 'Pacotes de 5 kg e volumes maiores, com parboilizado para quem cozinha em escala.'],
  ['Fábricas de ração e indústria', 'Farelo, quirera e casca a granel, retirados na unidade.'],
];
