// Conteúdo da Distribuidora Ultramix, copiado do site atual (www.distribuidoraultramix.com.br) em 21/10/2026.
// O catálogo (956 produtos de 18 marcas) fica em public/assets/produtos.json e as 84 cidades em public/assets/cidades.json.
import fs from 'node:fs';
import path from 'node:path';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
export const catalogo = JSON.parse(fs.readFileSync(path.join(pub, 'assets/produtos.json'), 'utf8'));
export const cidades = JSON.parse(fs.readFileSync(path.join(pub, 'assets/cidades.json'), 'utf8'));

export const empresa = {
  nome: 'Ultramix',
  nomeLongo: 'Distribuidora Ultramix',
  url: 'https://ultramix.overtus.com.br/',
  antigo: 'https://www.distribuidoraultramix.com.br/',
  fone: '(16) 3512-0125',
  foneHref: '+551635120125',
  whats: '(16) 99390-8784',
  whatsNum: '5516993908784',
  email: 'contato@distribuidoraultramix.com.br',
  rua: 'Rua Farjala Moises, 375',
  bairro: 'Pq. Residencial Candido Portinari',
  cidade: 'Ribeirão Preto - SP',
  cep: '14093-540',
  desde: 2017,
  raio: 200,
  facebook: 'https://www.facebook.com/Distribuidoraultramix',
  instagram: 'https://www.instagram.com/distribuidoraultramixrp/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Farjala+Moises+375+Ribeir%C3%A3o+Preto+SP',
};

export const textos = {
  titulo: 'Distribuindo Qualidade',
  intro: [
    'Sediada na cidade de Ribeirão Preto - SP, a ULTRAMIX é uma distribuidora que desde 2017 atua em toda a Macro Região de Ribeirão Preto, cobrindo um raio de 200 km a partir de sua sede.',
    'Temos como principal objetivo diferenciar-nos das empresas do segmento, focando nosso atendimento nas necessidades específicas de nossos clientes. Conscientes da importância da qualidade no processo de distribuição, nos propomos a investir intensamente no desenvolvimento das marcas parceiras.',
    'A ULTRAMIX traz para o setor de distribuição de alimentos e bebidas uma gestão de alta performance e ética em suas relações comerciais.',
  ],
  missao: 'Garantir aos nossos colaboradores um ambiente de trabalho que lhes proporcione oportunidades de desenvolvimento pessoal e profissional, com segurança financeira para si e seus familiares, sustentado por um serviço diferenciado oferecido aos nossos parceiros.',
  visao: 'Conquistar espaço no mercado distribuidor, operando com produtos de qualidade adequados à necessidade de cada cliente.',
  estruturaIntro: 'Situada em um grande centro de distribuição em Ribeirão Preto, a Ultramix possui:',
  estrutura: [
    { t: 'Veículos próprios e rastreados', ic: 'caminhao', x: 'A Ultramix possui veículos caracterizados e climatizados para realização das entregas nos estabelecimentos comerciais. Todos os veículos são monitorados via satélite desde o carregamento até a finalização da entrega, e tudo isso acompanhado por um moderno sistema de gestão 100% informatizado para garantir o rápido carregamento e a entrega dos alimentos nos horários combinados.' },
    { t: 'Armazenamento', ic: 'floco', x: 'A Ultramix distribui alimentos refrigerados e linha seca com elevado padrão de qualidade. Para isso possui uma câmara fria que mantém a temperatura e a umidade controladas, o que garante a conservação e a qualidade dos produtos até a entrega ao cliente.' },
    { t: 'Equipe Ultramix', ic: 'equipe', x: 'A distribuidora é formada por pessoas que gostam do que fazem. A empresa é dividida nos setores comercial, administrativo e operacional, e todos passam por um treinamento para garantir a qualificação de suas funções e a satisfação dos clientes.' },
  ],
  lema: 'Profissionalismo na Distribuição de Alimentos',
  // Frase das páginas de produto do site atual.
  clientes: ['Supermercados', 'Mercados', 'Conveniências', 'Padarias', 'Bares', 'Lanchonetes', 'Restaurantes', 'Cozinhas Industriais', 'Bufês'],
  cesta: {
    titulo: 'Cesta básica para empresas',
    sub: 'Qualidade e Praticidade!',
    texto: 'A Distribuidora Ultramix comercializa cestas básicas para empresas. As cestas são entregues na empresa em dias pré-estabelecidos.',
    tipos: ['Cesta Básica para colaboradores', 'Cesta de Natal', 'Cesta personalizada'],
    pontos: [
      { t: 'Qualidade', x: 'As cestas são cuidadosamente montadas, armazenadas e distribuídas.' },
      { t: 'Segurança', x: 'Toda a logística é rastreada por satélite desde a saída da Ultramix até a entrega das cestas.' },
    ],
  },
  passos: [
    { t: 'Monte a lista', x: 'Busque por nome ou navegue pelas marcas e departamentos. Escolha a quantidade e adicione ao orçamento.' },
    { t: 'Envie o pedido', x: 'Mande a lista pelo WhatsApp ou por e-mail, com o nome do seu estabelecimento e a cidade.' },
    { t: 'Receba na porta', x: 'A equipe comercial confirma preços e prazo, e a entrega sai em veículo próprio, climatizado e rastreado.' },
  ],
};

export const creditos = 'Fotos e embalagens: site atual da Distribuidora Ultramix e materiais das marcas parceiras. Foto do armazém: Axisadman, Wikimedia Commons, CC BY-SA 3.0 (ilustrativa).';
