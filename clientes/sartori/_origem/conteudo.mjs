// Conteúdo do site da Sartori Alimentos, copiado de sartorialimentos.com.br (páginas, linhas de produto, contatos e posts de 2017-2018).
// Os textos são os do site atual com acentos e erros de digitação corrigidos; nada inventado.
import fs from 'node:fs';
import path from 'node:path';

export const empresa = {
  nome: 'Sartori Alimentos',
  url: 'https://sartori.overtus.com.br/',
  antigo: 'https://sartorialimentos.com.br/',
  desde: 1995,
  cidade: 'Augusto Pestana · RS',
  local: 'Noroeste do Rio Grande do Sul, município de Augusto Pestana',
  mapa: 'https://www.google.com/maps/place/Sartori+Alimentos/@-28.4763453,-53.964482,15z',
  whats: '5555999322498',
  foneVendas: '(55) 99932-2498',
  foneVendasHref: '+5555999322498',
  emailVendas: 'vendas@sartorialimentos.com.br',
  video: 'T2MkwQhLIxk',
  horario: [
    ['Segunda a sexta', '08h às 12h e 13h30 às 17h30'],
    ['Sábados', '07h30 às 11h30'],
    ['Domingos e feriados', 'sem atendimento'],
  ],
};

// "Canais de Informação" do site atual
export const canais = [
  { setor: 'Vendas', email: 'vendas', fones: ['(55) 99971-1780', '(55) 99973-2818', '(55) 99932-2498'] },
  { setor: 'Compra de bovinos', fones: ['(55) 99971-1794'] },
  { setor: 'Gerência', email: 'gerencia', fones: ['(55) 99682-1582'] },
  { setor: 'Qualidade', email: 'qualidade', fones: ['(55) 99849-3440'] },
  { setor: 'Faturamento', email: 'faturamento', fones: ['(55) 99980-9221'] },
  { setor: 'Financeiro', email: 'financeiro', fones: ['(55) 99932-9242'] },
  { setor: 'Recursos humanos', email: 'rh', fones: ['(55) 98405-3382'] },
];
export const telHref = f => '+55' + f.replace(/\D/g, '');

export const textos = {
  heroTit: 'Produtos 100% inspecionados',
  heroSub: 'Controle rigoroso de qualidade e procedência',
  paixaoTit: 'Paixão. Somente quem vive esse sentimento valoriza a excelência em cada detalhe.',
  paixao: [
    'Desde 1995, a Sartori Alimentos se preocupa com a excelência de suas atividades e vem ampliando sua estrutura ao longo do tempo para melhor atender ao mercado varejista, adotando criteriosos padrões de qualidade que garantem ao consumidor final um produto à altura dos mais rigorosos paladares.',
    'Localizados no município de Augusto Pestana/RS, construímos nossas relações de confiança com o mercado, desde o campo até a mesa dos consumidores, com processos e produtos que são destaque em sabor, qualidade e procedência.',
  ],
  paixaoFecho: 'A história da Sartori Alimentos se confunde e entrelaça com a paixão do gaúcho por comer bem, e pela tradição e cultura do churrasco.',
  experiencia: 'Uma verdadeira experiência gastronômica que agrada a todos os exigentes paladares',
  quem: [
    'Localizada no noroeste do estado do Rio Grande do Sul, no município de Augusto Pestana, a Sartori Alimentos construiu suas relações com o mercado desde o campo até a mesa dos consumidores, com processos e produtos que são destaque em sustentabilidade, procedência e responsabilidade.',
    'Nossa infraestrutura atende às mais exigentes normas e padrões de qualidade. De modo que nos tornamos a cada dia sinônimo de qualidade, confiança e de bons resultados para nossos parceiros varejistas.',
    'Tudo isso, para fazer parte da vida e dos hábitos alimentares de consumidores cada vez mais especializados, informados e criteriosos. Nossa tradição é entregar ao mercado um produto de extrema e real qualidade. Afinal, entendemos que o momento de saborear e apreciar uma carne deve ser uma experiência acima de suas expectativas.',
  ],
  sisbiTit: 'Certificação nacional SISBI',
  sisbi: 'O Sistema Brasileiro de Inspeção de Produtos de Origem Animal (SISBI-POA), que faz parte do Sistema Unificado de Atenção à Sanidade Agropecuária (SUASA), padroniza e harmoniza os procedimentos de inspeção de produtos de origem animal para garantir a inocuidade e segurança alimentar, possibilitando a comercialização de nossos produtos em todo o território nacional.',
  socio: 'Nossa empresa trabalha para que todas as atividades sejam realizadas de forma ética e responsável, preconizando o bem-estar animal, as relações trabalhistas e o respeito ao meio ambiente. Ser sustentável é conduzir as operações com responsabilidade no uso dos recursos naturais, na segurança alimentar, na promoção do bem-estar animal, no respeito às diretrizes internas e no fortalecimento de parcerias. Tudo isso com a responsabilidade de entregar aos nossos consumidores um produto de extrema qualidade.',
  ambiente: [
    'Entre as nossas maiores preocupações está o cuidado com o meio ambiente, por este motivo trabalhamos a sustentabilidade ambiental na fabricação de produtos de alta qualidade sem agredir o meio ambiente.',
    'Os resíduos gerados no empreendimento são tratados conforme as exigências da legislação ambiental em vigor, possuindo todas as licenças ambientais para o desenvolvimento de suas atividades.',
    'Aplicando tecnologias limpas e boas práticas de fabricação em sua produção, a geração de resíduos e o consumo de água são reduzidos, diminuindo o impacto sobre o meio ambiente relativo ao processo produtivo. Desta maneira a empresa contribui com o cuidado ao meio ambiente, preservando-o para as gerações futuras.',
  ],
  bemEstarIntro: 'Para garantir que os princípios de bem-estar animal sejam cumpridos ao longo da cadeia produtiva, as práticas são adotadas em todas as etapas:',
  liberdadesIntro: 'As ações adotadas nas diferentes operações estão baseadas em políticas ou princípios que levam em consideração as cinco liberdades fundamentais dos animais, conceituadas pelo Farm Animal Welfare Council (FAWC):',
  liberdades: ['Ser livre de medo e estresse', 'Ser livre de sede, fome e má nutrição', 'Ser livre de desconforto', 'Ser livre de dor, doenças e injúrias', 'Ter liberdade para expressar seu comportamento normal'],
  qualidadeIntro: 'Adotamos práticas e processos que garantem a excelência de nossos produtos.',
  boitataIntro: 'Conheça toda a linha de produtos que fazem da Boitatá® uma verdadeira experiência gastronômica que agrada a todos os exigentes paladares.',
  churrascoSub: 'Cortes especiais para o preparo do seu churrasco com os amigos!',
  lenda: [
    'Diz a lenda que há muito tempo atrás, uma noite se prorrogou muito, parecendo que nunca mais haveria luz do dia. Era uma noite muito escura, sem estrelas, sem vento e sem barulho algum dos bichos da floresta, era um grande silêncio. Os homens viveram dentro de casa e estavam passando fome e frio. Não havia como cortar lenha para os braseiros que mantinham as pessoas aquecidas, nem como caçar naquela escuridão. Era uma noite sem fim.',
    'Os dias foram passando e a chuva começou, choveu muito, esta chuva inundou tudo e muitos animais acabaram morrendo. Uma grande cobra que vivia em repouso num imenso tronco despertou faminta e começou a comer os olhos de animais mortos que brilhavam boiando nas águas. Alguns dizem que eles brilhavam devido à luz do último dia em que os animais viram o sol. De tantos olhos brilhantes que a cobra comeu, ela ficou toda brilhante como fogo e transparente.',
    'A cobra se transformou num monstro brilhante, o Boitatá. Dizem que o Boitatá assusta as pessoas quando elas entram na mata à noite. Mas muitos acreditam que o Boitatá protege as matas contra incêndios.',
  ],
  lendaFecho: 'Da tradição lendária do povo gaúcho, a linha de cortes nobres e diferenciados da Sartori Alimentos, Boitatá é sinônimo de qualidade. Cortes selecionados de novilhos precoces fazem da linha Boitatá uma excelente escolha para quem busca ainda mais sabor para a sua mesa.',
  universoSub: 'Dicas do dia a dia no preparo e manejo de carnes',
  gourmetSub: 'Acompanhado de nossos produtos, receitas para deixar você com água na boca.',
};

// Etapas do bem-estar animal (página Responsabilidade Socioambiental), com o texto de cada uma.
export const etapas = [
  { tit: 'Criação', txt: 'Criação animal própria e nos fornecedores de matéria-prima.', foto: 'rebanho' },
  { tit: 'Transporte', txt: 'O transporte dos animais é realizado por frota própria, garantindo controle rigoroso do bem-estar animal nesta etapa. Os motoristas são orientados quanto à condução cuidadosa dos veículos, sem paradas prolongadas e desnecessárias durante o percurso.', foto: 'frota' },
  { tit: 'Pré-abate', txt: 'Ao chegarem no estabelecimento, os animais passam por um período de repouso, jejum e dieta hídrica.', foto: 'angus' },
  { tit: 'Abate', txt: 'Os colaboradores envolvidos nas atividades de manejo dos animais são periodicamente treinados quanto ao bem-estar animal e abate humanitário.', foto: 'equipe' },
];

export const qualidade = [
  { tit: 'CIPA', sub: 'Comissão Interna de Prevenção de Acidentes', txt: 'Formada por uma equipe de colaboradores e representantes da empresa com o objetivo de buscar a prevenção de acidentes de trabalho e a promoção da saúde dos colaboradores.' },
  { tit: 'SIPAT', sub: 'Semana Interna de Prevenção de Acidentes', txt: 'Evento organizado pela empresa onde são realizadas palestras com especialistas em diferentes áreas da saúde, além de atividades recreativas relacionadas à prevenção de acidentes de trabalho.' },
  { tit: 'Segurança do trabalho', txt: 'A empresa possui profissional técnico presente em turno integral responsável pela segurança do trabalho e pela aquisição e distribuição de Equipamentos de Proteção Individual (EPIs) e Coletiva (EPCs) para os colaboradores, de acordo com a função exercida na empresa.' },
  { tit: 'Capacitação profissional', txt: 'A empresa disponibiliza cursos de capacitação aos colaboradores em caso de necessidade para a função exercida. Também estamos vinculados ao programa Jovem Aprendiz.' },
  { tit: 'Ambientação dos colaboradores', txt: 'Quando o colaborador é admitido, recebe treinamento de acordo com a função que irá desempenhar dentro da indústria e orientação quanto ao uso, guarda e conservação dos Equipamentos de Proteção Individual (EPIs).' },
];

// Linhas de produto. rot = rótulo em /assets/rot/, foto = foto do corte em /assets/img/ (só quando o site atual tem uma do mesmo corte).
const c = (nome, rot, foto) => ({ nome, rot, foto });
export const linhas = {
  boitata: {
    slug: 'boitata', nome: 'Boitatá Novilho Precoce', curto: 'Boitatá', selo: 'linha-boitata', rotulo: 'rotulo-boitata-premium',
    resumo: 'Cortes nobres e selecionados de novilhos precoces, em duas linhas: Premium e Churrasco.',
    grupos: [
      { nome: 'Linha Premium', sub: 'Cortes selecionados de novilhos precoces.', itens: [
        c('Acém', 'acem-boitata', 'c-acem'), c('Coxão de fora', 'coxao-fora-boitata'), c('Coxão mole', 'coxao-mole-boitata'),
        c('Filé mignon', 'file-mignon-boitata', 'c-file-mignon'), c('Paleta', 'paleta-boitata', 'c-paleta'), c('Patinho', 'patinho-boitata', 'c-patinho'),
        c('Matambre', 'matambre-boitata', 'c-matambre'), c('Tatu', 'tatu-boitata', 'c-tatu')] },
      { nome: 'Linha Churrasco', sub: 'Cortes especiais para o preparo do seu churrasco com os amigos!', itens: [
        c('Picanha', 'picanha-boitata', 'c-picanha'), c('Alcatra', 'alcatra-boitata', 'c-alcatra'), c('Contrafilé', 'contrafile-boitata', 'c-contrafile'),
        c('Maminha', 'maminha-boitata', 'c-maminha'), c('Entrecote', 'entrecote-boitata', 'c-entrecote'), c('Prime rib', 'prime-rib-boitata'),
        c('T-bone', 't-bone-boitata'), c('Vazio', 'vazio-boitata'), c('Costela do dianteiro', 'costela-dianteiro-boitata', 'c-costela-dianteiro'),
        c('Costela do traseiro', 'costela-traseiro-boitata')] },
    ],
  },
  tradicional: {
    slug: 'tradicional', nome: 'Linha Tradicional', curto: 'Tradicional', selo: 'linha-tradicional', rotulo: 'rotulo-sartori-linha-tradicional',
    resumo: 'Carne resfriada de bovino, com e sem osso: os cortes do dia a dia com a marca Sartori.',
    grupos: [{ nome: 'Cortes', itens: [
      c('Acém', 'acem', 'c-acem'), c('Alcatra', 'alcatra', 'c-alcatra'), c('Bife do vazio', 'bife-vazio', 'c-bife-vazio'), c('Capa de filé', 'capa-file'),
      c('Contrafilé', 'contrafile', 'c-contrafile'), c('Costela do dianteiro', 'costela-dianteiro', 'c-costela-dianteiro'), c('Costela do traseiro', 'costela-traseiro'),
      c('Costela em tiras', 'costela-tiras', 'c-costela-tiras'), c('Coxão de fora', 'coxao-fora'), c('Coxão mole', 'coxao-mole'),
      c('Entrecote', 'entrecote', 'c-entrecote'), c('Filé mignon', 'file-mignon', 'c-file-mignon'), c('Maminha', 'maminha', 'c-maminha'),
      c('Matambre', 'matambre', 'c-matambre'), c('Paleta', 'paleta', 'c-paleta'), c('Patinho', 'patinho', 'c-patinho'), c('Peito', 'peito', 'c-peito'),
      c('Picanha', 'picanha', 'c-picanha'), c('Tatu', 'tatu', 'c-tatu'), c('Vazio', 'vazio')] }],
  },
  miudos: {
    slug: 'miudos', nome: 'Linha Miúdos', curto: 'Miúdos', selo: 'linha-miudosl', rotulo: 'rotulo-sartori-linha-miudos',
    resumo: 'Miúdos resfriados de bovino, inspecionados e embalados com a marca Sartori.',
    grupos: [{ nome: 'Miúdos', itens: [
      c('Coração', 'coracao'), c('Estômago', 'estomago'), c('Estômago fatiado', 'estomago-fatiado'), c('Fígado', 'figado'), c('Fígado fatiado', 'figado-fatiado'),
      c('Língua', 'lingua'), c('Rabo', 'rabo'), c('Retículo (colmeia)', 'reticulo'), c('Rim', 'rim')] }],
  },
};
export const ordemLinhas = ['boitata', 'tradicional', 'miudos'];
export const totalCortes = l => linhas[l].grupos.reduce((s, g) => s + g.itens.length, 0);

// Posts de "Universo da Carne" e "Espaço Gourmet" (posts.json foi limpo do HTML do WordPress).
const dir = path.dirname(new URL(import.meta.url).pathname);
const titulosSecao = /<p>\s*<strong>\s*(ingredientes|modo de preparo)\s*:?\s*<\/strong>\s*<\/p>|<h[34]>\s*(?:<strong>)?\s*(ingredientes|modo de preparo)\s*:?\s*(?:<\/strong>)?\s*<\/h[34]>/gi;
export const posts = JSON.parse(fs.readFileSync(path.join(dir, 'posts.json'), 'utf8')).map(p => ({
  ...p,
  titulo: p.titulo.replace('Os pontos da Carne', 'Os pontos da carne'),
  html: p.html.replace(titulosSecao, (m, a, b) => { const t = (a || b).toLowerCase(); return `<h3>${t === 'ingredientes' ? 'Ingredientes' : 'Modo de preparo'}</h3>`; })
    .replace(/<p>\s*<strong>([^<]{60,})<\/strong>\s*<\/p>/g, '<p class="lead">$1</p>'),
  resumo: p.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/^\s*(Ingredientes|INGREDIENTES)\s*/, '').trim().slice(0, 150).replace(/\s\S*$/, '') + '…',
}));
