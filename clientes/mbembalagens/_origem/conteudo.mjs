// Textos e catálogo da MB Embalagens. Tabelas copiadas do site atual (mbembalagens.com/produtos.html, 2026-10-09).
// O que foi escrito aqui para o novo site, e precisa ser confirmado com a MB, está marcado com "PROPOSTO".

export const site = {
  nome: 'MB Embalagens',
  razao: 'MB Embalagens',
  dominio: 'https://mbembalagens.overtus.com.br',
  slogan: 'Uma empresa comprometida com a qualidade.',
  fundacao: 2004,
  email: 'mbembalagens@mbembalagens.com',
  tel: '(51) 3452-3653',
  telHref: '+555134523653',
  // O site atual usa wa.me/5134535034 (sem o 55 do Brasil). PROPOSTO: 55 51 3453-5034, confirmar.
  zap: '555134535034',
  zapTel: '(51) 3453-5034',
  endereco: ['Estrada do Boqueirão, 150, Pavilhão 1', 'Esteio/RS', 'CEP 93295-300'],
  mapa: 'https://www.google.com/maps?q=Estrada+do+Boqueir%C3%A3o+150+Esteio+RS+93295-300&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Estrada+do+Boqueir%C3%A3o+150+Esteio+RS',
  horario: 'Segunda a sexta, 8h às 18h', // PROPOSTO: o site atual não informa horário.
};

export const anos = 2026 - site.fundacao;

export const nav = [
  ['produtos', 'Produtos'],
  ['industria', 'Para indústrias'],
  ['segmentos', 'Segmentos'],
  ['empresa', 'Empresa'],
  ['contato', 'Contato'],
];

// [título da aba, descrição para buscadores]
export const paginas = {
  index: ['MB Embalagens · Embalagens plásticas e flexíveis em Esteio/RS', 'Bobinas, sacarias e sacolas plásticas fabricadas em Esteio/RS desde 2004. Atendimento a distribuidores, atacadistas e indústrias de todo o Sul.'],
  empresa: ['Empresa · MB Embalagens', 'Fábrica de embalagens plásticas flexíveis em Esteio, região metropolitana de Porto Alegre, desde 2004.'],
  produtos: ['Produtos · MB Embalagens', 'Catálogo completo: bobinas, bobinas multidobras, sacarias e sacolas plásticas, com medidas e embalagens.'],
  'produtos/bobinas': ['Bobinas plásticas · MB Embalagens', 'Bobinas picotadas de 1 a 15 litros: milheiro, reforçada 2.8, utilitárias, baixa e média densidade e industriais.'],
  'produtos/multidobras': ['Bobinas multidobras · MB Embalagens', 'Bobinas multidobras de 3 a 15 litros, por milheiro ou por peso.'],
  'produtos/sacarias': ['Sacarias · MB Embalagens', 'Sacos plásticos por capacidade, por utilidade e para frigorífico.'],
  'produtos/sacolas': ['Sacolas plásticas · MB Embalagens', 'Sacolas Light, Padrão e Plus em três tamanhos, caixas com 1.000 unidades.'],
  industria: ['Bobinas industriais · MB Embalagens', 'Filme de polietileno extrusado em bobinas industriais para empresas que não têm extrusão própria.'],
  segmentos: ['Segmentos atendidos · MB Embalagens', 'Embalagens para mercados, hortifrútis, lanchonetes, açougues, frigoríficos, padarias, farmácias e distribuidores.'],
  contato: ['Contato e orçamento · MB Embalagens', 'Peça orçamento de bobinas, sacarias e sacolas. Estrada do Boqueirão, 150, Esteio/RS. (51) 3452-3653.'],
};

// Linhas de produto e tabelas. cols: cabeçalho; rows: linhas da tabela.
export const linhas = [
  {
    id: 'bobinas', nome: 'Bobinas', sub: 'Linha virgem', foto: 'linha-bobinas', faixa: 'faixa-bobinas',
    resumo: 'Sacos picotados em rolo, de 1 a 15 litros, para balcão, hortifrúti, frios e lanches.',
    texto: 'O saco em rolo de todo balcão: picotado, fácil de destacar e de abrir. Seis famílias, da bobina de milheiro à industrial, em polietileno de baixa e média densidade.', // PROPOSTO
    produtos: [
      { id: 'milheiro', nome: 'Bobinas de milheiro', foto: 'p-milheiro', nota: 'Vendidas por quantidade: 1.000, 750 ou 500 sacos por bobina.',
        cols: ['Ref.', 'Medidas', 'Qtd.', 'Fardo'],
        rows: [['1 litro', '17 x 31 cm', '1000/750/500', '12'], ['2 litros', '21 x 31 cm', '1000/750/500', '8'], ['3 litros', '23,5 x 35 cm', '1000/750/500', '8'], ['5 litros', '28 x 41 cm', '1000/750/500', '7'], ['7 litros', '28 x 49 cm', '1000/750/500', '10'], ['10 litros', '35 x 49 cm', '1000/750/500', '8'], ['15 litros', '40 x 59 cm', '500', '10'], ['Sanduíche', '23,5 x 49 cm', '1000/500', '10']] },
      { id: 'reforcada', nome: 'Bobinas reforçada 2.8', foto: 'p-reforcada', nota: 'Filme mais encorpado, vendida por peso de bobina.',
        cols: ['Ref.', 'Medidas', 'Peso (kg)', 'Fardo'],
        rows: [['1 litro', '17 x 31 cm', '0,900', '12'], ['2 litros', '21 x 31 cm', '1,050', '8'], ['3 litros', '23,5 x 35 cm', '1,200', '8'], ['5 litros', '28 x 41 cm', '1,700', '7'], ['7 litros', '28 x 49 cm', '1,950', '10'], ['10 litros', '35 x 49 cm', '2,200', '8'], ['15 litros', '40 x 59 cm', '3,000', '10'], ['Sanduíche', '23,5 x 49 cm', '1,650', '10']] },
      { id: 'utilitarias', nome: 'Bobinas utilitárias', foto: 'p-utilitarias', nota: 'Medidas próprias para lanchonete, frios e açougue.',
        cols: ['Ref.', 'Medidas', 'Qtd.', 'Fardo'],
        rows: [['Dog', '28 x 14 cm', '1000/500', '12'], ['Sanduíche', '23,5 x 50 cm', '1000/500', '8'], ['Frios', '28 x 36 cm', '1000/500', '8'], ['Frios leitoso', '28 x 36 cm', '1000/500', '7'], ['Baurú', '23,5 x 18 cm', '1000/500', '10'], ['Xis', '23,5 x 14 cm', '1000/500', '8'], ['Açougue', '30, 60 ou 90', 'Sob demanda', '–']] },
      { id: 'baixa', nome: 'Bobinas de baixa densidade', foto: 'p-baixa', nota: 'Filme macio e transparente. Fardo de 8,5 kg.',
        cols: ['Ref.', 'Medidas', 'Peso'],
        rows: [['2 litros', '21 x 32 cm', '8,5 kg'], ['3 litros', '23,5 x 36 cm', '8,5 kg'], ['5 litros', '28 x 42 cm', '8,5 kg'], ['7 litros', '28 x 50 cm', '8,5 kg'], ['10 litros', '35 x 50 cm', '8,5 kg'], ['15 litros', '40 x 60 cm', '8,5 kg']] },
      { id: 'media', nome: 'Bobinas de média densidade', foto: 'p-media', nota: 'Filme mais firme, rende mais sacos por quilo. Fardo de 8,5 kg.',
        cols: ['Ref.', 'Medidas', 'Peso'],
        rows: [['2 litros', '21 x 32 cm', '8,5 kg'], ['3 litros', '23,5 x 36 cm', '8,5 kg'], ['5 litros', '28 x 42 cm', '8,5 kg'], ['7 litros', '28 x 50 cm', '8,5 kg'], ['10 litros', '35 x 50 cm', '8,5 kg'], ['15 litros', '40 x 60 cm', '8,5 kg']] },
      { id: 'industriais', nome: 'Bobinas industriais', foto: 'p-industriais', nota: 'Baixa (BX) ou média (MD) densidade, peso e preço sob consulta.',
        cols: ['Largura', 'Densidade', 'Peso e preço'],
        rows: [['17 cm', 'BX ou MD', 'Consultar'], ['21 cm', 'BX ou MD', 'Consultar'], ['23,5 cm', 'BX ou MD', 'Consultar'], ['28 cm', 'BX ou MD', 'Consultar'], ['35 cm', 'BX ou MD', 'Consultar'], ['40 cm', 'BX ou MD', 'Consultar'], ['Outras medidas', '–', 'Consultar']] },
    ],
  },
  {
    id: 'multidobras', nome: 'Bobinas multidobras', sub: 'Linha virgem', foto: 'p-multi-milheiro', faixa: 'faixa-bobinas',
    resumo: 'Saco dobrado no rolo: bobina mais curta, mesmo saco largo. De 3 a 15 litros.',
    texto: 'O saco vem dobrado no sentido da largura antes de enrolar. A bobina fica mais estreita, cabe em suportes menores e o saco abre na medida cheia.', // PROPOSTO
    produtos: [
      { id: 'multi-milheiro', nome: 'Multidobras de milheiro', foto: 'p-multi-milheiro', nota: 'Vendidas por quantidade de sacos.',
        cols: ['Ref.', 'Medidas', 'Qtd.', 'Fardo'],
        rows: [['3 litros', '25 x 39 cm', '1000/500', '6'], ['5 litros', '30 x 39 cm', '1000/500', '6'], ['10 litros', '35 x 49 cm', '800/500', '6'], ['15 litros', '40 x 59 cm', '500', '6']] },
      { id: 'multi-peso', nome: 'Multidobras por peso', foto: 'p-multi-peso', nota: 'Bobinas de 0,800 kg.',
        cols: ['Ref.', 'Medidas', 'Peso (kg)', 'Fardo'],
        rows: [['3 litros', '25 x 39 cm', '0,800', '6'], ['5 litros', '30 x 39 cm', '0,800', '6'], ['10 litros', '35 x 49 cm', '0,800', '6'], ['15 litros', '40 x 59 cm', '0,800', '6']] },
    ],
  },
  {
    id: 'sacarias', nome: 'Sacarias', sub: 'Linha virgem', foto: 'linha-sacarias', faixa: 'faixa-sacarias',
    resumo: 'Sacos soltos por capacidade, por utilidade e sacos grandes para frigorífico.',
    texto: 'Sacos soltos em pacotes, do saquinho de rapadura ao saco de 90 x 200 cm para frigorífico.', // PROPOSTO
    produtos: [
      { id: 'sacos-capacidade', nome: 'Sacos plásticos por capacidade', foto: 'p-sacos-capacidade', nota: 'De 1 a 15 litros.',
        cols: ['Ref.', 'Medidas', 'Qtd.'],
        rows: [['1 litro', '17 x 28 cm', '5.000 un'], ['2 litros', '21 x 32 cm', '2.500 un'], ['3 litros', '23,5 x 36 cm', '3.000 un'], ['5 litros', '28 x 42 cm', '2.500 un'], ['7 litros', '28 x 50 cm', '5.000 un'], ['10 litros', '35 x 50 cm', '5.000 un'], ['15 litros', '40 x 60 cm', '5.000 un']] },
      { id: 'sacos-utilidade', nome: 'Sacos plásticos por utilidade', foto: 'p-sacos-utilidade', nota: 'Medidas pensadas para cada produto.',
        cols: ['Ref.', 'Medidas', 'Qtd.'],
        rows: [['Rapadura', '8 x 12 cm', '25.000 un'], ['–', '8 x 20 cm', '20.000 un'], ['Alho', '10 x 20 cm', '120.000 un'], ['Bolo', '14 x 18 cm', '15.000 un'], ['1/2 litro', '12 x 25 cm', '15.000 un'], ['Prego', '18 x 30 cm', '3.000 un'], ['Algodão doce', '19 x 50 cm', '5.000 un']] },
      { id: 'sacos-frigorifico', nome: 'Sacos para frigorífico', foto: 'p-sacos-frigorifico', nota: 'Espessura 0.003, pacotes de 500 unidades.',
        cols: ['Medidas', 'Qtd.', 'Espessura'],
        rows: [['60 x 100 cm', '500 un', '0.003'], ['70 x 100 cm', '500 un', '0.003'], ['80 x 100 cm', '500 un', '0.003'], ['90 x 100 cm', '500 un', '0.003'], ['100 x 100 cm', '500 un', '0.003'], ['70 x 150 cm', '500 un', '0.003'], ['90 x 200 cm', '500 un', '0.003']] },
    ],
  },
  {
    id: 'sacolas', nome: 'Sacolas', sub: 'Linha virgem', foto: 'linha-sacolas', faixa: 'faixa-sacolas',
    resumo: 'Sacolas Light, Padrão e Plus, em três tamanhos, caixas com 1.000 unidades.',
    texto: 'Três espessuras para três tipos de compra: Light para itens leves, Padrão para o dia a dia e Plus para peso. Mesmos tamanhos nas três linhas.', // PROPOSTO
    produtos: [
      { id: 'sacola-light', nome: 'Sacolas Light', foto: 'p-sacola-light', nota: 'Para compras leves.',
        cols: ['Tamanho', 'Medidas', 'Qtd.'],
        rows: [['Pequeno', '30 x 40 cm', '1.000 un'], ['Médio', '38 x 48 cm', '1.000 un'], ['Médio', '40 x 50 cm', '1.000 un'], ['Grande', '48 x 58 cm', '1.000 un'], ['Grande', '50 x 60 cm', '1.000 un']] },
      { id: 'sacola-padrao', nome: 'Sacolas Padrão', foto: 'p-sacola-padrao', nota: 'A sacola do dia a dia do comércio.',
        cols: ['Tamanho', 'Medidas', 'Qtd.'],
        rows: [['Pequeno', '30 x 40 cm', '1.000 un'], ['Médio', '38 x 48 cm', '1.000 un'], ['Médio', '40 x 50 cm', '1.000 un'], ['Grande', '48 x 58 cm', '1.000 un'], ['Grande', '50 x 60 cm', '1.000 un']] },
      { id: 'sacola-plus', nome: 'Sacolas Plus', foto: 'p-sacola-plus', nota: 'Mais resistente, para compras pesadas.',
        cols: ['Tamanho', 'Medidas', 'Qtd.'],
        rows: [['Pequeno', '30 x 40 cm', '1.000 un'], ['Médio', '38 x 48 cm', '1.000 un'], ['Médio', '40 x 50 cm', '1.000 un'], ['Grande', '48 x 58 cm', '1.000 un'], ['Grande', '50 x 60 cm', '1.000 un']] },
    ],
  },
];
export const linha = id => linhas.find(l => l.id === id);
export const totalProdutos = linhas.reduce((n, l) => n + l.produtos.length, 0);

// Segmentos: a lista de usos vem do site atual ("cachorro quente, xis, bauru, frios, sacolé, farmácia, jornal,
// sanduíche, rapadura e gelo"); os textos de cada segmento são PROPOSTOS.
export const segmentos = [
  { id: 'mercados', nome: 'Mercados e hortifrútis', foto: 'hortifruti', texto: 'Bobinas picotadas para a banca de frutas e verduras e sacolas para o caixa.', itens: ['Bobinas de milheiro', 'Bobinas de baixa densidade', 'Sacolas Light, Padrão e Plus'] },
  { id: 'lanchonetes', nome: 'Lanchonetes e padarias', foto: 'lanchonete', texto: 'Medidas certas para cachorro-quente, xis, bauru, sanduíche, bolo e pão.', itens: ['Bobinas utilitárias Dog, Xis e Baurú', 'Bobina Sanduíche', 'Saco para bolo'] },
  { id: 'acougues', nome: 'Açougues e frigoríficos', foto: 'p-sacos-frigorifico', texto: 'Bobina de açougue sob demanda e sacos grandes para carcaças e cortes.', itens: ['Bobina Açougue 30, 60 ou 90', 'Sacos para frigorífico até 90 x 200 cm', 'Bobina Frios e Frios leitoso'] },
  { id: 'varejo', nome: 'Farmácias e varejo', foto: 'sacola-frutas', texto: 'Sacolas e saquinhos para farmácia, banca de jornal, gelo e sacolé.', itens: ['Sacolas Light', 'Sacos por capacidade', 'Sacos de 1/2 litro'] },
  { id: 'distribuidores', nome: 'Distribuidores e atacadistas', foto: 'banca-bobinas', texto: 'Linha completa em fardos e caixas fechadas para revenda em todo o Sul.', itens: ['Catálogo completo', 'Fardos e caixas fechadas', 'Entrega na região Sul'] },
  { id: 'industrias', nome: 'Indústrias', foto: 'p-industriais', texto: 'Filme de polietileno extrusado em bobina para quem não tem extrusão própria.', itens: ['Bobinas industriais BX ou MD', 'Larguras de 17 a 40 cm', 'Outras medidas sob consulta'] },
];

// Empresa: fatos do site atual (2004, Esteio, área industrial com máquinas de transformação e beneficiamento de
// filmes, todo o Sul, distribuidores e atacadistas, material reciclado selecionado, busca da liderança).
export const fatos = [
  [String(site.fundacao), 'ano de fundação'],
  [`${totalProdutos}`, 'produtos em 4 linhas'],
  ['Sul', 'atendimento em toda a região'],
];

// Etapas de fabricação: PROPOSTAS a partir de "máquinas de transformação e beneficiamento de filmes" do site atual.
export const etapas = [
  ['Extrusão', 'O polietileno vira filme na espessura e largura de cada produto.'],
  ['Corte e solda', 'O filme é cortado, soldado e picotado em sacos e sacolas.'],
  ['Bobinamento', 'Os sacos são enrolados em bobinas por quantidade ou por peso.'],
  ['Expedição', 'Fardos e caixas saem de Esteio para clientes de todo o Sul.'],
];
