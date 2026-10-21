// Conteúdo da Pregos Triângulo. Textos entre aspas vêm do site atual (pregostriangulo.com.br: home, institucional, produtos);
// frases de apoio (descrição curta de cada linha, passos de "Como comprar", títulos de seção) foram escritas por nós a partir deles.
import { tabelas } from './tabelas.mjs';

export const empresa = {
  nome: 'Pregos Triângulo',
  razao: 'Pregos Triângulo Ltda',
  url: 'https://pregostriangulo.overtus.com.br/',
  antigo: 'https://www.pregostriangulo.com.br/',
  desde: 1958,
  endereco: ['Av. Comendador Alexandrino Garcia, 2165', 'Distrito Industrial · 38402-288', 'Uberlândia · MG'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Comendador+Alexandrino+Garcia,+2165,+Uberl%C3%A2ndia+MG',
  fone: '(34) 3292-8200', foneHref: '+553432928200',
  fax: '(34) 3212-2524',
  email: 'pregos@pregostriangulo.com.br',
  vendas: [
    { nome: 'Vanderlei', fone: '(34) 9 9992-5646', wa: '5534999925646' },
    { nome: 'Thiago', fone: '(34) 9 9992-5626', wa: '5534999925626' },
  ],
};

export const textos = {
  bemVindo: 'A Pregos Triângulo é uma indústria 100% brasileira, especializada na produção de pregos e arames de alta qualidade para as mais diversas finalidades e aplicações, sejam elas industriais ou profissionais.',
  comoComprar: 'Se você deseja comprar nossos produtos, entre em contato conosco por meio de nosso formulário online.',
  historia: [
    'Em 1958 a Pregos Triângulo LTDA foi criada exclusivamente para atender um mercado amplo no ramo de pregos e arames, no qual se tornou líder de vendas em várias regiões.',
    'Em sua sede a Pregos Triângulo dispõe de um amplo parque industrial, equipado com máquinas de última geração e operando com tecnologia de ponta.',
    'Desde o início de nossas atividades, procuramos ter o esmero com a formação de mão de obra, dando formação e qualidade de vida aos nossos funcionários, assim trabalhando com o que há de melhor no mercado de matéria-prima.',
  ],
  ideal: 'Este é o nosso ideal: trabalhar com dedicação para obter um resultado final com qualidade, tecnologia e satisfação.',
  herois: 'Queremos agradecer a todos os heróis da construção civil e agradecer a preferência pela marca.',
  representante: 'Você é um profissional autônomo e deseja representar nossos produtos? Confira em nosso mapa de abrangência os estados onde nossa empresa atua e seja nosso parceiro na abertura de novos mercados.',
  contratando: 'Estamos contratando representantes em nível nacional.',
};

// Estados pintados no mapa "Área de atuação da empresa" (institucional).
export const estados = ['Pará', 'Maranhão', 'Tocantins', 'Rondônia', 'Mato Grosso', 'Goiás', 'Mato Grosso do Sul', 'Minas Gerais', 'São Paulo'];

// As 8 abas do site atual, na mesma ordem.
export const linhas = [
  { slug: 'com-cabeca', nome: 'Com Cabeça', curta: 'O prego comum, de 3/4" a 6 1/2", da marcenaria ao mata-burro.', tipo: 'prego' },
  { slug: 'cabeca-dupla', nome: 'Cabeça Dupla', curta: 'Fácil de arrancar: fôrmas para concreto e andaimes na construção civil.', tipo: 'dupla' },
  { slug: 'sem-cabeca', nome: 'Sem Cabeça', curta: 'Acabamento que some na madeira: rodapés, molduras, móveis e assoalho.', tipo: 'sem' },
  { slug: 'ardox', nome: 'Ardox', curta: 'Prego espiralado. Indisponível no momento.', tipo: 'ardox', indisponivel: true },
  { slug: 'telhado', nome: 'Telhado', curta: 'Para fixação de telhados, em 2 1/2" e 3 1/4".', tipo: 'telhado' },
  { slug: 'grampos', nome: 'Grampos', curta: 'Grampos para cercas, inclusive galvanizado.', tipo: 'grampo' },
  { slug: 'taco', nome: 'Taco', curta: 'Prego para taco, medida 15 x 7/8.', tipo: 'taco' },
  { slug: 'arames', nome: 'Arames', curta: 'Arame recozido em rolos de 1 kg e de 35 kg, BWG 8 a 18.', tipo: 'arame' },
].map(l => ({ ...l, itens: tabelas[l.slug] }));

export const totalMedidas = linhas.filter(l => l.tipo !== 'arame').reduce((s, l) => s + l.itens.length, 0);

// Usos para o "Qual prego para o seu trabalho?": cada um junta as linhas da tabela cuja aplicação cita as palavras.
export const usos = [
  { id: 'marcenaria', nome: 'Marcenaria e móveis', palavras: ['marcenaria', 'mobili', 'móveis', 'rodapé', 'moldura', 'acabamento'] },
  { id: 'caixas', nome: 'Caixas e embalagens', palavras: ['caixas para frutas', 'embalage'] },
  { id: 'telhado', nome: 'Telhados e ripas', palavras: ['telhado', 'ripas'] },
  { id: 'lambris', nome: 'Lambris e assoalho', palavras: ['lambri', 'carpintaria', 'assoalho'] },
  { id: 'concreto', nome: 'Fôrmas e escoramento', palavras: ['concreto', 'fôrma', 'escoramento', 'caibr', 'andaime', 'caixaria'] },
  { id: 'portal', nome: 'Portais, portas e escadas', palavras: ['portal', 'porta', 'escada'] },
  { id: 'rural', nome: 'Mata-burros e garimpos', palavras: ['mata-burro', 'garimpo'] },
  { id: 'cercas', nome: 'Cercas', palavras: ['cerca'] },
];

// "2 1/2 x 10" -> { pol: 2.5, bwg: 10 }
export function medida(m) {
  const [p, b] = String(m).split(' x ');
  const pol = p.split(' ').reduce((s, x) => s + (x.includes('/') ? x.split('/')[0] / x.split('/')[1] : +x), 0);
  return { pol, bwg: parseInt(b, 10) };
}
// Diâmetro do fio pela tabela BWG (mm).
export const bwgMm = { 1: 7.62, 3: 6.58, 4: 6.05, 6: 5.16, 8: 4.19, 9: 3.76, 10: 3.4, 11: 3.05, 12: 2.77, 13: 2.41, 14: 2.11, 15: 1.83, 16: 1.65, 17: 1.47, 18: 1.24 };
