// Textos e dados da Cooperativa Rio Branco, tirados do site atual (cooperativariobranco.com.br, páginas .php de 2008).
// O que foi escrito por nós está marcado com "nosso" no LEIA-ME.md.

export const E = {
  nome: 'Cooperativa Rio Branco',
  razao: 'Cooperativa Agrícola Mista Rio Branco Ltda.',
  slogan: 'Tradição, qualidade e preço justo',
  lema: 'Sempre fazendo amigos',
  url: 'https://cooperativariobranco.overtus.com.br/',
  antigo: 'https://cooperativariobranco.com.br/',
  endereco: 'Rua Padre Feijó, 357, Centro, São Marcos, RS',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Padre+Feij%C3%B3+357+S%C3%A3o+Marcos+RS',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Padre+Feij%C3%B3,+357,+S%C3%A3o+Marcos+-+RS&output=embed',
  email: 'contato@cooperativariobranco.com.br',
  fundacao: '14 de dezembro de 1941',
};

export const telefones = [
  { nome: 'Matriz', num: '(54) 3291-1237', href: '+555432911237' },
  { nome: 'Super Coop I', num: '(54) 3291-4227', href: '+555432914227' },
  { nome: 'Super Coop II (filial)', num: '(54) 3291-1422', href: '+555432911422' },
  { nome: 'Compras do supermercado', num: '(54) 3291-2147', href: '+555432912147' },
  { nome: 'Loja Agrícola', num: '(54) 3291-1237, ramal 222', href: '+555432911237' },
  { nome: 'Loja de Confecções', num: '(54) 3291-1237, ramal 210', href: '+555432911237' },
];

export const emails = [
  { area: 'Assuntos da cooperativa', email: 'contato@cooperativariobranco.com.br' },
  { area: 'Recursos Humanos', email: 'camila@cooperativariobranco.com.br' },
  { area: 'Contábil', email: 'sandra@cooperativariobranco.com.br' },
  { area: 'Contábil', email: 'denise@cooperativariobranco.com.br' },
  { area: 'Financeiro', email: 'mari@cooperativariobranco.com.br' },
  { area: 'Compras', email: 'compras@cooperativariobranco.com.br' },
  { area: 'Loja Agrícola', email: 'agricola@cooperativariobranco.com.br' },
  { area: 'Loja de Confecções', email: 'confeccao@cooperativariobranco.com.br' },
  { area: 'Supermercado filial', email: 'super2@cooperativariobranco.com.br' },
];

export const lojas = [
  {
    id: 'super1', nome: 'Super Coop I', tipo: 'Supermercado', desde: '1983', foto: 'super1-fachada', foto2: 'super1-interior',
    curto: 'O supermercado do centro, perto da matriz. Boa parte dos clientes vem do interior do município.',
    texto: ['Inaugurado em 1983, fica próximo da nossa matriz, na área central da cidade. Por isso, grande parte dos clientes são do interior de São Marcos.',
      'Variedade de produtos para o consumo do lar, para os associados e para toda a população são-marquense.'],
    tel: telefones[1], email: null,
  },
  {
    id: 'super2', nome: 'Super Coop II', tipo: 'Supermercado, padaria e confeitaria', desde: '1998', foto: 'super2-fachada', foto2: 'super2-interior',
    curto: 'A filial a uns 700 metros da matriz, com a padaria e a confeitaria que abastecem os dois mercados.',
    texto: ['Adquirido para melhorar ainda mais a estrutura de atendimento à população são-marquense, foi inaugurado em 1998. Fica a mais ou menos setecentos metros da matriz e atende um público mais urbano.',
      'Além dos setores do supermercado, tem a padaria e a confeitaria que abastecem os dois supermercados da Cooperativa.'],
    tel: telefones[2], email: 'super2@cooperativariobranco.com.br',
  },
  {
    id: 'agricola', nome: 'Loja Agrícola', tipo: 'Insumos, rações e ferragens', desde: '1941', foto: 'matriz-agricola', foto2: 'agricola-interior',
    curto: 'Insumos agrícolas, rações para animais, ferragens e acessórios. Revendedor autorizado Stihl.',
    texto: ['Existe desde a fundação da Cooperativa. Comercializa insumos agrícolas, rações para animais, ferragens e acessórios para a agricultura.',
      'Fica no centro da cidade, junto à matriz, e atende também cidades vizinhas como Antônio Prado, Flores da Cunha, Campestre da Serra e Vacaria.'],
    tel: telefones[4], email: 'agricola@cooperativariobranco.com.br',
  },
  {
    id: 'confeccao', nome: 'Loja de Confecções', tipo: 'Roupas masculinas e femininas', desde: '1991', foto: 'matriz-esquina', foto2: 'confeccao',
    curto: 'Roupas masculinas e femininas, com atendimento próximo, junto à matriz.',
    texto: ['Antigamente a confecção funcionava junto com o setor agrícola. Desde 1991 tem um setor próprio, que fica junto à matriz.',
      'Comercializa roupas masculinas e femininas, com um atendimento diferenciado e de qualidade para a população são-marquense.'],
    tel: telefones[5], email: 'confeccao@cooperativariobranco.com.br',
  },
];

export const linhaDoTempo = [
  { ano: '1941', titulo: 'Fundação', texto: 'Em 14 de dezembro, 70 sócios fundadores, quase todos agricultores, criam a Cooperativa em São Marcos, então parte de Caxias do Sul.' },
  { ano: '1949', titulo: 'O moinho', texto: 'Em 31 de janeiro é inaugurado o moinho de trigo e milho, para a moagem dos sócios e a industrialização das colheitas.' },
  { ano: '1983', titulo: 'Super Coop I', texto: 'O primeiro supermercado abre perto da matriz, no centro da cidade.' },
  { ano: '1991', titulo: 'Loja de Confecções', texto: 'A confecção deixa o setor agrícola e ganha loja própria junto à matriz.' },
  { ano: '1998', titulo: 'Super Coop II', texto: 'A filial chega a um público mais urbano, com padaria e confeitaria próprias.' },
];

export const institucional = [
  'Desde 1941 até os dias atuais, a Cooperativa sempre buscou oferecer a seus associados um atendimento eficaz, ampliando suas instalações e estendendo seus serviços.',
  'Para atender melhor os associados, a Cooperativa traça suas metas e objetivos com base numa filosofia voltada à permanente busca de incentivo ao setor agrícola.',
  'As dependências foram ampliadas com a instalação dos supermercados Super Coop I e Super Coop II, que prestam importantes serviços aos associados e oferecem grande variedade de produtos. Assim, além de atender os setores de produção, a Cooperativa facilita aos associados e à população são-marquense a compra de mercadorias para o consumo do lar.',
  'A Cooperativa agradece aos seus associados, à população são-marquense e a todos que se uniram na luta por um progresso promissor, pela confiança depositada em tantos anos de lutas, buscas e vitórias.',
];

export const historico = [
  'A Cooperativa Agrícola Mista Rio Branco Ltda. foi fundada aos 14 dias do mês de dezembro de 1941. A assembleia geral de constituição reuniu 70 sócios fundadores, quase todos agricultores, além de convidados especiais da cidade e de autoridades ligadas ao cooperativismo.',
  'A cooperativa nasceu das dificuldades dos agricultores na comercialização dos produtos, que eram comprados por entidades comerciais e compradores não estabelecidos, em condições muito desfavoráveis ao produtor rural.',
  'Sua área de ação é o atual município de São Marcos, território que na época pertencia a Caxias do Sul.',
  'O objetivo principal era reunir os agricultores para um trabalho mais ordenado na produção e promover a venda em comum, alcançando melhores preços. Buscava também apoio oficial em assistência técnica e mais facilidade na compra de sementes selecionadas.',
  'Outra iniciativa de real importância foi a instalação do moinho de trigo e milho, que além da moagem para os sócios faria a industrialização das colheitas, então em quantidades realmente expressivas. O moinho foi inaugurado em 31 de janeiro de 1949, com a presença de numerosos convidados e autoridades.',
  'Por meio de um sistema de organização econômico-social, a cooperativa proporciona melhores condições de vida às nossas comunidades.',
];

// Objetivos da fundação (do Histórico), usados como etapas na versão B.
export const objetivos = [
  { t: 'Reunir os agricultores', d: 'Um trabalho mais ordenado na produção.' },
  { t: 'Vender em comum', d: 'Juntos, para alcançar melhores preços pela produção.' },
  { t: 'Apoio técnico e sementes', d: 'Assistência técnica e sementes selecionadas com mais facilidade.' },
  { t: 'Industrializar a colheita', d: 'O moinho de trigo e milho, inaugurado em 1949.' },
];

export const primeiraDiretoria = [
  { cargo: 'Diretor Presidente', nome: 'Manoel Ramos de Castilhos' },
  { cargo: 'Diretor Comercial', nome: 'Rafael Ruaro' },
  { cargo: 'Diretor Gerente', nome: 'Henrique Zaniol' },
];
export const presidentes = ['Henrique Rizzo', 'Valdociro Gonçalves', 'Walter José Rizzon', 'Rogério Soldatelli'];
export const diretoriaAtual = [
  { cargo: 'Diretor Presidente', nome: 'João Andréa Vanin' },
  { cargo: 'Diretor Gerente', nome: 'Evaldo Diemer de Camargo' },
  { cargo: 'Diretor Secretário', nome: 'José Carlos Casagranda' },
];
export const estruturaDirecao = ['Diretor Presidente', 'Diretor Gerente', 'Diretor Secretário', 'Conselho Fiscal', 'Conselho Administrativo'];

export const hino = {
  estribilho: ['Bem-vindo, meu caro amigo,', 'Bem-vindo sejas em nosso meio!', 'Saudemos todos, saudemos todos,', 'Bem-vindo, meu caro amigo,', 'Bem-vindo sejas em nosso meio!', 'Saudemos todos a nossa união!'],
  estrofes: [
    ['Passo diante da Cooperativa:', 'Ouço gente ali dentro a cantar,', 'Um amigo que folga na festa,', 'Me convida também a folgar.'],
    ['Bem ao lado da Cooperativa', 'Já funciona o nosso moinho.', 'Enfrentamos a luta unidos,', 'Pois baqueia quem luta sozinho.'],
    ['Desdobramos os nossos trigais,', 'E formamos a corporação:', 'Hoje os frutos da nossa constância', 'Sazonados, copiosos estão.'],
    ['Transformando as espigas em ouro,', 'Confirmamos do trigo o valor!', 'Compensada foi nossa labuta', 'Com a bênção de Nosso Senhor.'],
    ['Cultivemos as nossas lavouras,', 'Com coragem, com fé e ardor.', 'Abençoa-nos Santo Isidoro,', 'Que também foi agricultor.'],
    ['Resistamos com todas as forças', 'À discórdia que quer destruir,', 'Levantemos o copo e bebamos', 'À saúde do nosso porvir!'],
  ],
  fonte: 'Extraído do livro "Vamos Cantar", Monsenhor Henrique Compagnoni. São Marcos, 14 de dezembro de 1971, trigésimo aniversário.',
};
