// Textos e dados da Cofril copiados do site atual (www.cofril.com.br, outubro de 2026).
// dados.json foi montado a partir das páginas de produto, receitas, notícias e representantes do site atual.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dados = JSON.parse(fs.readFileSync(path.join(aqui, 'dados.json'), 'utf8'));
export const mapaES = fs.readFileSync(path.join(aqui, 'mapa-es.svg'), 'utf8');

export const empresa = {
  nome: 'Cofril',
  url: 'https://cofril.overtus.com.br/',
  antigo: 'https://www.cofril.com.br/',
  slogan: 'Paixão pelo seu sabor!',
  fone: '(28) 3200-5010',
  foneHref: '+552832005010',
  celular: '(28) 99904-4236',
  celularHref: '+5528999044236',
  ramalSac: 'Ramal 2032',
  email: 'cofril@cofril.com.br',
  emailRh: 'recursoshumanos@cofril.com.br',
  rua: 'Rua João Batista Calegário, 139 – B. Aeroporto',
  cep: 'CEP 29314-020',
  cidade: 'Cachoeiro de Itapemirim - ES',
  mapa: 'https://www.google.com/maps?q=Rua+Jo%C3%A3o+Batista+Caleg%C3%A1rio,+139,+Cachoeiro+de+Itapemirim+-+ES&output=embed',
  app: 'https://play.google.com/store/apps/details?id=br.com.arcoinformatica.cofril',
  nfe: 'https://www.cofril.com.br/nfe',
  downloads: 'https://www.cofril.com.br/download-de-imagens/',
  redes: [
    ['Instagram', 'https://www.instagram.com/cofriloficial/'],
    ['Facebook', 'https://www.facebook.com/CofrilOficial/'],
    ['YouTube', 'https://www.youtube.com/channel/UCSKmkuqiRlGqHVhbHvddh0A'],
  ],
  video: 'HbeRHHP989E',
};

export const numeros = [
  { n: '1987', t: 'ano de fundação, em Cachoeiro de Itapemirim' },
  { n: '1.400', t: 'colaboradores', mais: true },
  { n: '2.400', t: 'toneladas por mês de derivados de carne suína', u: 't' },
  { n: '18 mil', t: 'animais abatidos por mês, entre suínos e bovinos' },
  { n: '120', t: 'itens de derivados de carne suína', mais: true },
];

export const historia = [
  'Desde 1987 a Cofril vem construindo uma história de sucesso. Tudo começou quando os irmãos José Carlos, Antonio Cezar e Elson Correa resolveram atuar no ramo de suínos, inspirados no segmento de negócio iniciado pelo pai anos antes.',
  'Com uma pequena produção artesanal de 300 kg de linguiça por semana, observaram que o mercado era receptivo e investiram no incremento dos negócios. Aos poucos a produção foi crescendo, o mercado foi se expandindo, fruto de muito trabalho e uma constante preocupação com a qualidade.',
  'Com o aumento das vendas e da produção, veio a necessidade de expandir as atividades para que novos mercados pudessem ser atendidos, sendo necessário investir em nova fábrica, novos equipamentos e agregar novos colaboradores.',
  'A Cofril conta hoje com a parceria de mais de 1.400 funcionários e em suas três unidades produtivas em Cachoeiro de Itapemirim e Atílio Vivácqua produz mais de 2.400 toneladas/mês de derivados de carne suína. Também abate mensalmente 18 mil animais entre suínos e bovinos, tanto para utilizar na indústria como em prestação de serviços a produtores e comerciantes.',
  'A empresa conta ainda com a retaguarda de granjas de suínos próprias, em Muqui e Vargem Alta, além de adquirir animais de outras granjas parceiras.',
  'São disponibilizados ao mercado mais de 120 itens de derivados de carne suína, desde carnes in natura, temperadas, defumadas, assim como embutidos como linguiças diversas, presunto, apresuntado, mortadela, além de bacon, ingredientes para feijoada, entre outros. Destaque especial para a linguiça de churrasco, líder no mercado na preferência dos consumidores.',
  'A Cofril investe em melhoria contínua da qualidade, tanto em tecnologia de máquinas e equipamentos como treinamento da mão de obra, fazendo com que seus produtos tenham o diferencial de sabor que conquista os consumidores. O meio ambiente é outra preocupação da empresa, onde tudo é feito dentro dos mais rigorosos controles em todas as etapas do processo.',
  'Essa é a Cofril. Paixão pelo seu sabor!',
];

export const missao = 'Atender com excelência às demandas de nossos clientes a partir do desenvolvimento e oferta de produtos e serviços que contribuam para a melhoria da qualidade de vida das pessoas, gerando riqueza de forma sustentável.';
export const visao = 'Ser empresa de referência, reconhecida como a melhor opção por clientes, colaboradores, comunidade, fornecedores e investidores, devido à qualidade de nossos produtos, serviços e relacionamento.';
export const valores = ['Integridade', 'Comprometimento', 'Valorização Humana', 'Superação de Resultados', 'Melhoria contínua', 'Inovação', 'Sustentabilidade'];

export const qualidade = [
  'Além da qualidade que você vê nos nossos produtos, nossos processos de fabricação atendem aos mais altos padrões. Cuidando também do que você não vê, podemos levar para a sua mesa produtos saudáveis, saborosos e com toda a segurança que esses processos oferecem.',
  'Mantemos rigoroso controle de qualidade nas várias etapas do processo, buscando a melhoria contínua. Ao adquirir os produtos Cofril os clientes podem ter a certeza de que existe um sistema confiável de controle das etapas de desenvolvimento, elaboração, execução e entrega de produtos que foram feitos com o objetivo de garantir o melhor para os consumidores.',
];
export const sustentabilidade = {
  intro: 'Toda empresa ou instituição precisa ser sustentável. Não é uma questão de escolha ou apenas preservar o meio ambiente. A Cofril busca a sustentabilidade sendo uma empresa ecologicamente correta, economicamente viável, socialmente justa e culturalmente diversa. Somente seguindo esses princípios podemos tornar a nossa sociedade melhor.',
  itens: [
    { t: 'Nada vai para a natureza', d: 'Tudo que a Cofril gera de subprodutos derivados de seu processo produtivo é aproveitado e transformado em ração animal. Com isso, nada é jogado na natureza ou queimado.' },
    { t: 'Educação ambiental', d: 'A Cofril realiza anualmente palestras de educação ambiental para todos os colaboradores e para as comunidades onde suas unidades estão inseridas, preparadas e ministradas por profissionais de engenharia ambiental.' },
    { t: 'Cuidado com quem trabalha', d: 'Plano de saúde e odontológico com custo subsidiado, atendimento médico ambulatorial, fisioterapia, ginástica laboral e segurança e saúde ocupacional para os colaboradores.' },
  ],
};

// Do processo, nas palavras do texto institucional.
export const etapas = [
  { t: 'Granjas', d: 'Granjas de suínos próprias em Muqui e Vargem Alta, além de granjas parceiras.' },
  { t: 'Abate', d: '18 mil animais por mês entre suínos e bovinos, para a indústria e para produtores e comerciantes.' },
  { t: 'Indústria', d: 'Três unidades produtivas em Cachoeiro de Itapemirim e Atílio Vivácqua: 2.400 toneladas por mês.' },
  { t: 'Sua mesa', d: 'Mais de 120 itens levados por representantes a todo o Espírito Santo.' },
];

// Reconhecimentos tirados das notícias do site atual.
export const premios = [
  { ano: 2026, nome: 'Prêmio Gazeta Empresarial Sul', o: '1º lugar' },
  { ano: 2026, nome: 'Recall de Marcas', o: 'Marca mais lembrada pelos capixabas' },
  { ano: 2026, nome: 'Marcas Ícones', o: '1º lugar' },
  { ano: 2025, nome: 'Marcas de Valor', o: 'Marca nº 1 em Carnes e Embutidos' },
  { ano: 2025, nome: 'Prêmio Gazeta Empresarial', o: '1º lugar' },
  { ano: 2025, nome: 'Prêmio Gazeta Empresarial de Linhares', o: '1º lugar em Linguiça, Mortadela e Presunto' },
  { ano: 2025, nome: 'ACAPS Trade Show', o: 'Troféu Estande de Ouro' },
  { ano: 2024, nome: 'Recall de Marcas', o: '1º lugar em Linguiça, Mortadela e outros Embutidos' },
  { ano: 2023, nome: 'Anuário IEL 200 Maiores e Melhores', o: 'Melhor empresa do setor de Alimentos e Bebidas no ES' },
];

// Calculadora de churrasco do site atual: kg por pessoa e divisão entre as carnes (mesma conta do servidor deles).
export const churrasco = { homem: 0.5, mulher: 0.3, crianca: 0.2, divisao: [['Linguiças', 0.3], ['Suíno', 0.1], ['Bovino', 0.5], ['Frango', 0.1]] };

export const { categorias, produtos, receitas, noticias, representantes } = dados;
export const catNome = Object.fromEntries(categorias.map(c => [c.slug, c.nome]));

// Linhas em destaque na home (fotos de produto do site atual).
export const destaques = ['linguica-de-pernil-para-churrasco', 'linguica-tipo-calabresa-cozida-fina-sabor-defumado', 'apresuntado-cofril-retangular', 'bacon-em-cubos', 'mortadela-defumada-cofril', 'costela-suina-temperada-resfriada', 'ingredientes-para-feijoada', 'presunto-cozido', 'copa-lombo-temperado-resfriado', 'jerked-beef-dianteiro-cofril-500g'];
