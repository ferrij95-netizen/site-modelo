// Textos e dados da Tecsol, tirados do site atual (industriatecsol.com.br, WordPress de 2016).
// Erros de digitação do original corrigidos: "cobra" -> cobre, "2,00 x 1100" -> 2,00 x 1,00 m, "residencias" -> residências.
export const empresa = {
  nome: 'Tecsol',
  razao: 'Tecsol Aquecedores Solar e Filtros Centrais',
  url: 'https://tecsol.overtus.com.br/',
  antigo: 'http://www.industriatecsol.com.br/',
  fone: '(19) 3424-1665',
  foneHref: '+551934241665',
  email: 'contato@industriatecsol.com.br',
  horario: 'Segunda a sexta, das 7h às 17h',
  endereco: ['Rod. Piracicaba – Americana, s/n, km 158', 'Caixa Postal 305 · CEP 13400-970', 'Piracicaba – SP'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rodovia+Piracicaba+Americana+km+158+Piracicaba+SP',
  unidades: [
    { cidade: 'Piracicaba', tipo: 'Fábrica e escritório', end: 'Rod. Piracicaba – Americana, s/n, km 158 · Cx. Postal 305 · CEP 13400-970', fone: '(19) 3424-1665', href: '+551934241665' },
    { cidade: 'Limeira', tipo: 'Loja', end: 'Av. Major José Levy Sobrinho, 1746', fone: '(19) 3451-9080', href: '+551934519080' },
    // No site atual está "(19) 534-6644" (número antigo de 7 dígitos). A confirmar com o cliente.
    { cidade: 'Rio Claro', tipo: 'Loja', end: 'Avenida 20, nº 533, esquina com Visconde de Rio Claro', fone: '(19) 3534-6644', href: '+551935346644' },
  ],
};

export const textos = {
  economia: [
    'A crescente poluição dos rios, mananciais e águas profundas levou a TECSOL a desenvolver um filtro com design e tecnologia avançada, construído inteiramente de aço inoxidável, que fornece água pura e inodora não somente para bebida e preparação de alimentos, mas também para uso geral.',
    'A limpeza do filtro também depende de uma região para outra. Normalmente, faz-se a limpeza uma vez por semana, através da simples operação de abrir uma torneira e mudar a posição de uma alavanca. Com isso inverte-se o fluxo de água e em apenas alguns minutos são expelidas todas as impurezas e o filtro volta a produzir água completamente limpa e pura.',
    'O elemento filtrante é composto de 5 (cinco) camadas de quartzo cristalino e 1 (uma) camada de carvão. A substituição destes elementos é recomendada anualmente, de acordo com a região e segundo as quantidades de cloro e material orgânico contidos na água.',
  ],
  beba: 'A filtragem é natural, através de um processo construído por uma camada de carvão ativado e por várias camadas de quartzo cristalino de diferentes granulosidades. Seu manuseio é extremamente fácil. Uma válvula de duplo caminho evita qualquer possibilidade de água poluída ser usada para o consumo.',
  empresa: [
    'Investir na preservação ambiental é mais do que nunca investir na qualidade de vida. A TECSOL Sistemas de Tratamento de Água Potável dispõe de tecnologia e equipamentos que possibilitam às empresas dos mais diversos ramos de atividade produzirem, preservando a qualidade da água potável e o meio ambiente. Aproveite melhor os recursos de sua empresa: instale um sistema de tratamento de água potável TECSOL.',
    'A crescente poluição dos rios, mananciais e águas profundas levou a TECSOL a desenvolver um sistema que fornece água pura e inodora não somente para bebida e preparação de alimentos, mas para o uso em geral.',
    'A TECSOL está há mais de 25 anos no mercado e desenvolveu um sistema de fácil manuseio, altamente recomendado para uso em escolas, hospitais, hotéis, indústrias, poços artesianos, condomínios, construtoras, aeroportos, residências, entre outras. Aprovado em todos os testes a que foi submetido, representa uma fonte de água pura e cristalina.',
  ],
  inmetro: 'A produção desses filtros segue normas internacionais.',
};

export const usosFiltro = ['Escolas', 'Hospitais', 'Hotéis', 'Indústrias', 'Poços artesianos', 'Condomínios', 'Construtoras', 'Aeroportos', 'Residências'];

// Linha de filtros centrais (vazão em litros por hora). Fotos recortadas do site atual.
export const filtros = [
  { slug: '500', vazao: 500, img: 'filtro-500', w: 500, h: 766 },
  { slug: '1k', vazao: 1000, img: 'filtro-1k', w: 317, h: 800 },
  { slug: '2k', vazao: 2000, img: 'filtro-2k', w: 300, h: 800 },
  { slug: '3k', vazao: 3000, img: 'filtro-3k', w: 425, h: 800 },
  { slug: '5k', vazao: 5000, img: 'filtro-5k', w: 461, h: 800 },
  { slug: '10k', vazao: 10000, img: 'filtro-10k', w: 424, h: 800 },
];
export const filtrosEncomenda = [15000, 20000, 30000, 40000, 50000];
export const litros = n => n.toLocaleString('pt-BR');

// Camadas do elemento filtrante, de cima para baixo (o site diz: 1 de carvão ativado e 5 de quartzo cristalino de granulosidades diferentes).
export const camadas = [
  { nome: 'Carvão ativado', txt: '1 camada · água pura e inodora', gr: 0 },
  ...[1, 2, 3, 4, 5].map(n => ({ nome: `Quartzo cristalino`, txt: `camada ${n} de 5`, gr: n })),
];

export const limpeza = [
  { t: 'Abra a torneira', d: 'Uma vez por semana, em média (depende da água de cada região).' },
  { t: 'Mude a alavanca', d: 'A válvula de duplo caminho inverte o fluxo da água dentro do filtro.' },
  { t: 'Alguns minutos', d: 'As impurezas saem pela descarga e o filtro volta a produzir água limpa e pura.' },
];

export const dadosAquecedor = [
  ['Elemento a ser aquecido', 'Água e outros'],
  ['Temperatura de funcionamento', '80 °C (a tinta suporta até 200 °C)'],
  ['Pressão de funcionamento', '3,0 kgf/cm²'],
  ['Pressão de teste', '6,0 kgf/cm²'],
  ['Volume do elemento sensível', '4,0 litros'],
  ['Área do elemento sensível', '2,0 m²'],
  ['Peso vazio de um coletor', '30,0 kg'],
];

export const partesAquecedor = [
  { t: 'Placa coletora Master', itens: ['Totalmente construída em alumínio (monobloco).', 'Cobertura de vidro plano inteiro transparente de 3 mm, calafetado com borracha especial.', 'Tamanhos: 2,00 x 1,00 m · 1,50 x 1,00 m · 1,00 x 2,00 m.'] },
  { t: 'Placa coletora Top Line para piscina', itens: ['Tecnologia de alta performance, cujo rendimento atinge 100% de aproveitamento, o que a diferencia das demais.'] },
  { t: 'Elemento sensível', itens: ['Construído em cobre: 8 tubos verticais de Ø 10 mm e dois receptores de Ø 22 mm.', 'Grade envolvida por chapa de alumínio estruturado, pintada com tinta preta especial.', 'Isolamento em polipropileno expandido.'] },
  { t: 'Reservatório térmico (boiler)', itens: ['Interno em aço inox AISI-304, espessura 1,00 mm, com fundos boleados, testado com pressão de 6 kgf/cm².', 'Externo em alumínio, isolamento em manta de polipropileno expandido.', 'Fornecemos também somente a caixa térmica, para funcionar como um aquecedor elétrico comum.'] },
  { t: 'Sistema elétrico', itens: ['Resistência com potência de 3000 W.', 'Termostato com regulagem de 45 a 56 °C.'] },
  { t: 'Suporte ajustável', itens: ['Construído em cantoneira de 1" ASTM A-36.'] },
];

export const instalacao = [
  { n: 1, t: 'Caixa de água fria' },
  { n: 2, t: 'Caixa térmica (boiler)' },
  { n: 3, t: 'Coletores' },
  { n: 4, t: 'Ângulo de inclinação do coletor' },
];
export const obsInstalacao = 'Quando os coletores forem montados sobre telhas de barro, o ângulo é o mesmo do telhado; quando montados sobre telhas de fibrocimento, deve-se dar um ângulo de 20°. Respiro obrigatório.';
export const locaisAquecedor = ['Residências', 'Hospitais', 'Indústrias', 'Hotéis', 'Motéis', 'Camping', 'Piscinas'];
