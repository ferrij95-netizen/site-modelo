// Textos do site da Alumigroup. Tirados do site atual (alumigroup.com.br) em 2026-10-09 e reescritos
// com mais acabamento, sem inventar dados: o que não está no site atual fica marcado em LEIA-ME.md para confirmar.

export const site = {
  nome: 'Alumigroup',
  assinatura: 'Metais e Moldes',
  dominio: 'https://alumigroup.overtus.com.br',
  atual: 'https://alumigroup.com.br/',
  zap: '555199236455',
  celular: '(51) 9923-6455',
  fixo: '(51) 3582-2805',
  fixoHref: '+555135822805',
  horario: [
    ['Segunda a quinta', '07:30 às 11:30 e 13:00 às 18:00'],
    ['Sexta-feira', '07:30 às 11:30 e 13:00 às 17:00'],
  ],
  unidades: [
    { nome: 'Matriz', linhas: ['R. João Pedro Schmitt, 830', 'Rondônia, Novo Hamburgo/RS', 'CEP 93415-640'], mapa: 'R. João Pedro Schmitt, 830, Rondônia, Novo Hamburgo - RS, 93415-640' },
    { nome: 'Filial', linhas: ['Rua Nações Unidas, 3009', 'Rio Branco, Novo Hamburgo/RS', 'CEP 93336-075'], mapa: 'Rua Nações Unidas, 3009, Rio Branco, Novo Hamburgo - RS, 93336-075' },
  ],
};

// [slug, rótulo no menu]: mesma ordem do menu do site atual.
export const menu = [
  ['index', 'Home'],
  ['empresa', 'Empresa'],
  ['metais', 'Metais'],
  ['moldes-planos', 'Moldes Planos'],
  ['moldes-circulares', 'Moldes Circulares'],
  ['sinterizados', 'Sinterizados'],
  ['trabalhe-conosco', 'Trabalhe conosco'],
];

// [título da página, descrição para buscadores e redes]
export const paginas = {
  index: ['Alumigroup · Metais e Moldes', 'Metais não ferrosos cortados sob medida, moldes planos e circulares para pneus e peças sinterizadas. Empresa familiar de Novo Hamburgo/RS.'],
  empresa: ['Empresa · Alumigroup', 'Empresa familiar do Sul do Brasil, com mais de 40 anos no mercado de reforma de pneus pela marca Schmidt e uma divisão de metais não ferrosos.'],
  metais: ['Metais não ferrosos sob medida · Alumigroup', 'Chapas, blocos, vergalhões, tarugos, barras retangulares, varetas e bobinas para solda, cortados sob medida.'],
  'moldes-planos': ['Moldes planos · Alumigroup', 'Moldes planos para bandas pré-moldadas de reforma de pneus, usinados em alumínio ou aço conforme a especificação do cliente.'],
  'moldes-circulares': ['Moldes circulares · Alumigroup', 'Moldes circulares para pneus novos industriais, de moto e de bicicleta, e para protótipos, usinados em alumínio e aço.'],
  sinterizados: ['Sinterizados · Alumigroup', 'Peças técnicas sinterizadas por metalurgia do pó e compressão mecânica para os setores agrícola, automotivo, metalmecânico e linha branca.'],
  'trabalhe-conosco': ['Trabalhe conosco · Alumigroup', 'Envie seu currículo para a Alumigroup, em Novo Hamburgo/RS.'],
  contato: ['Orçamento e contato · Alumigroup', 'Solicite um orçamento personalizado de metais, moldes ou sinterizados. Telefone, WhatsApp, endereços e horários.'],
};

// As quatro linhas de produto, na ordem do site atual.
export const produtos = [
  {
    slug: 'metais', nome: 'Metais', curto: 'Corte de metais não ferrosos sob medida.',
    foto: 'chapas-galpao', fotoAlt: 'Chapas de alumínio empilhadas no galpão',
  },
  {
    slug: 'moldes-planos', nome: 'Moldes Planos', curto: 'Moldes planos para bandas pré-moldadas para reforma de pneus.',
    foto: 'molde-plano-1', fotoAlt: 'Molde plano de alumínio com o desenho da banda de rodagem',
  },
  {
    slug: 'moldes-circulares', nome: 'Moldes Circulares', curto: 'Moldes circulares para pneus novos.',
    foto: 'molde-circular-1', fotoAlt: 'Molde circular de alumínio usinado',
  },
  {
    slug: 'sinterizados', nome: 'Sinterizados', curto: 'Peças sinterizadas para as mais diversas aplicações na indústria.',
    foto: 'sinterizados', fotoAlt: 'Engrenagens sinterizadas', novidade: true,
  },
];

// Os quatro banners do site atual, refeitos em texto. [linha fina, linha forte, apoio, página, foto]
export const banners = [
  { fino: 'Blocos e chapas de', forte: 'Alumínio', fundo: 'ALUMÍNIO', apoio: 'Diversos formatos, dimensões e ligas.', link: 'metais', foto: 'chapas-pilha', alt: 'Chapas de alumínio cortadas' },
  { forte: 'Tarugos', fino2: 'e', forte2: 'vergalhões', fundo: 'TARUGOS', apoio: 'Metais não ferrosos cortados na medida do seu projeto.', link: 'metais', foto: 'tarugo', alt: 'Tarugo de alumínio' },
  { fino: 'Moldes', forte: 'planos e circulares', fundo: 'MOLDES', apoio: 'A qualidade que o seu projeto precisa.', link: 'moldes-circulares', foto: 'molde-circular-3', alt: 'Molde circular para pneus' },
  { selo: 'Novidade', forte: 'Sinterizados', fundo: 'SINTERIZADOS', apoio: 'Processo de fabricação de peças técnicas através da metalurgia do pó por compressão mecânica.', link: 'sinterizados', foto: 'sinterizados', alt: 'Engrenagens sinterizadas' },
];

// Faixa de vantagens do site atual (três ícones).
export const vantagens = [
  ['orcamento', 'Orçamento personalizado', 'Cada pedido é cotado conforme a liga, o formato e as medidas que o seu projeto pede.'],
  ['solucoes', 'As melhores soluções para seu projeto', 'Metais, moldes e peças sinterizadas com atendimento técnico de quem conhece a aplicação.'],
  ['custo', 'Melhor custo-benefício, qualidade garantida', 'Material cortado na medida certa, menos sobra e mais economia no seu processo.'],
];

export const sobre = {
  titulo: 'Uma empresa familiar com mais de 40 anos de indústria',
  textos: [
    'A Alumigroup é uma empresa familiar localizada na região Sul do país. Há mais de 40 anos atua no mercado de reforma de pneus com a marca Schmidt, consolidada no Brasil e no exterior.',
    'Com a expansão, nasceu a divisão de metais, que comercializa metais não ferrosos cortados sob medida para os mais diversos segmentos da indústria.',
    'Investimos em novas tecnologias, eficiência produtiva e infraestrutura para oferecer aos clientes segurança, credibilidade e economia.',
  ],
};

export const trajetoria = [
  ['Schmidt', 'Mais de 40 anos no mercado de reforma de pneus, com clientes no Brasil e no exterior.'],
  ['Divisão de metais', 'Metais não ferrosos cortados sob medida para diversos segmentos da indústria.'],
  ['Moldes', 'Moldes planos e circulares usinados em alumínio e aço, com projetos personalizados.'],
  ['Sinterizados', 'A novidade: peças técnicas produzidas por metalurgia do pó.'],
];

export const pilares = [
  ['Segurança', 'Material e processos que dão tranquilidade a quem compra.'],
  ['Credibilidade', 'Quatro décadas de relação com a indústria, no Brasil e fora dele.'],
  ['Economia', 'Corte sob medida e soluções pensadas para o custo do seu processo.'],
];

export const metais = {
  intro: 'Comercialização de metais não ferrosos cortados sob medida. Alumínio para as mais diversas aplicações.',
  // [nome, ícone]
  formatos: [
    ['Chapas', 'chapa'], ['Blocos', 'bloco'], ['Vergalhões', 'vergalhao'], ['Tarugos', 'tarugo'],
    ['Barras retangulares', 'barra'], ['Varetas para solda', 'vareta'], ['Bobinas para solda', 'bobina'],
  ],
  passos: [
    ['Informe o material', 'Diga a liga, o formato e as medidas de que precisa.'],
    ['Receba o orçamento', 'Nosso time de consultores monta um orçamento personalizado.'],
    ['Corte sob medida', 'O material é cortado nas dimensões pedidas e separado para você.'],
  ],
  galeria: [
    ['chapas', 'Chapas de alumínio'], ['chapa-xadrez', 'Chapa de alumínio xadrez'], ['tarugo', 'Tarugo de alumínio'],
    ['disco', 'Disco cortado de tarugo'], ['chapas-pilha', 'Chapas de alumínio empilhadas'], ['chapas-galpao', 'Chapas no galpão'],
  ],
};

export const moldesPlanos = {
  intro: 'Moldes planos para bandas pré-moldadas para reforma de pneus, usinados em alumínio ou aço conforme a especificação do cliente.',
  texto: 'Desenvolvemos projetos personalizados a partir do desenho da banda de rodagem e cuidamos do molde durante toda a vida útil dele.',
  servicos: [
    ['Moldes sob especificação', 'Usinagem em alumínio ou aço conforme o desenho e as medidas do cliente.'],
    ['Projetos personalizados', 'Desenvolvimento de novos desenhos de banda junto com a sua equipe.'],
    ['Porta-moldes', 'Fabricação de porta-moldes para a sua prensa.'],
    ['Alterações', 'Modificação de moldes existentes.'],
    ['Ajustes de gravação', 'Correção e ajuste da gravação do desenho.'],
    ['Revitalização', 'Recuperação de moldes para voltarem à produção.'],
  ],
  galeria: [
    ['molde-plano-1', 'Molde plano em alumínio'], ['molde-plano-2', 'Detalhe de molde plano'], ['molde-plano-3', 'Molde plano usinado'], ['molde-plano-4', 'Molde plano completo'],
  ],
};

export const moldesCirculares = {
  intro: 'Moldes circulares para pneus novos, usinados em alumínio e aço e personalizados conforme a necessidade de cada cliente.',
  aplicacoes: [
    ['Pneus industriais', 'Moldes para pneus novos de uso industrial.'],
    ['Pneus de moto', 'Moldes para pneus novos de motocicleta.'],
    ['Pneus de bicicleta', 'Moldes para pneus novos de bicicleta.'],
    ['Protótipos', 'Moldes para desenvolvimento e teste de novos pneus.'],
  ],
  servicos: ['Peças de reposição', 'Porta-moldes', 'Alteração de moldes', 'Gravação', 'Revitalização de moldes'],
  galeria: [
    ['molde-circular-1', 'Molde circular usinado'], ['molde-circular-2', 'Molde circular na bancada'], ['molde-circular-3', 'Molde circular visto de cima'],
    ['molde-circular-4', 'Detalhe da gravação do molde'], ['molde-circular-5', 'Detalhe da banda do molde'],
  ],
};

export const sinterizados = {
  intro: 'Processo de fabricação de peças técnicas através da metalurgia do pó por compressão mecânica.',
  texto: 'Atendemos os setores agrícola, automotivo, metalmecânico, linha branca e outros que precisam de peças de alta precisão e durabilidade.',
  etapas: [
    ['Pó metálico', 'A peça começa como pó metálico, na composição certa para a aplicação.'],
    ['Compressão mecânica', 'O pó é compactado no formato da peça em ferramenta de precisão.'],
    ['Sinterização', 'O aquecimento controlado une as partículas e dá resistência à peça.'],
    ['Peça técnica', 'O resultado é uma peça precisa, pronta para a produção em série.'],
  ],
  setores: ['Agrícola', 'Automotivo', 'Metalmecânico', 'Linha branca', 'Outros segmentos'],
  vantagens: [
    ['Menor desperdício', 'de matéria-prima'],
    ['Estabilidade', 'dimensional'],
    ['Alta resistência', 'mecânica e bom acabamento superficial'],
    ['Produção seriada', 'com repetibilidade'],
  ],
};
