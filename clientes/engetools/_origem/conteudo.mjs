// Dados e textos da Engetools. Tudo que vem do site atual (engetoolsferramentas.com.br, 22/10/2026) está marcado "site";
// o que foi escrito por nós e precisa de confirmação do cliente está em LEIA-ME.md.
export const empresa = {
  nome: 'Engetools Ferramentas',
  razao: 'Engetools Comércio e Representações Ltda.', // site
  fundacao: 1999, // site
  fone: '(51) 3589-1035', foneHref: '+555135891035', // site
  fone2: '(51) 3592-2142', fone2Href: '+555135922142', // site (página Contato)
  email: 'vendas@engetoolsferramentas.com.br', // site
  email2: 'engetools@terra.com.br', // site (página Contato)
  endereco: 'Rua Independência, 129, sala 202', bairro: 'Centro', cidade: 'São Leopoldo', uf: 'RS', cep: '93010-001', // site
  regiao: 'Grande Porto Alegre',
  url: 'https://engetools.overtus.com.br/',
  antigo: 'https://engetoolsferramentas.com.br/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Independ%C3%AAncia+129+S%C3%A3o+Leopoldo+RS',
  mapaEmbed: 'https://maps.google.com/maps?q=Rua%20Independ%C3%AAncia%2C%20129%2C%20S%C3%A3o%20Leopoldo%20RS&z=16&output=embed',
};

export const textos = {
  // site, home
  sobre: [
    'A Engetools Comércio e Representações é uma empresa brasileira, localizada na Grande Porto Alegre, fundada em 1999 e dedicada ao comércio, importação e exportação, representação e assistência técnica de uma linha completa em ferramentas de usinagem.',
    'Nossos produtos são usados tanto em máquinas operatrizes de última geração quanto em máquinas convencionais.',
    'Nossa linha está dividida em dois grandes grupos: ferramentas de corte em metal duro e HSS, e abrasivos convencionais e diamantados.',
  ],
  // site, página Missão
  missao: 'A excelência no atendimento e na assistência aos nossos clientes e, junto a eles, resolver todas as suas dificuldades, indicando a melhor solução em ferramentas de usinagem e em melhorias de processo, buscando sempre o melhor custo-benefício.',
  destaque: 'A Engetools destaca-se pela eficiência, agilidade no atendimento, qualificação do corpo técnico e controle de qualidade de seus produtos, buscando satisfazer as necessidades e as exigências de nossos clientes e exceder suas expectativas.',
  atuacao: ['Comércio', 'Importação e exportação', 'Representação', 'Assistência técnica'], // site
  diferenciais: [ // site, página Missão
    { t: 'Eficiência', d: 'Indicação da ferramenta certa para a operação, sem tentativa e erro na sua máquina.' },
    { t: 'Agilidade no atendimento', d: 'Resposta rápida a consultas, cotações e problemas de processo.' },
    { t: 'Corpo técnico qualificado', d: 'Quem atende entende de usinagem, retificação e processo.' },
    { t: 'Controle de qualidade', d: 'Ferramentas conferidas antes de chegar à sua produção.' },
  ],
  // site: "dois grandes grupos" (home) e lista de Produtos e Serviços
  grupos: [
    { letra: 'A', slug: 'corte', titulo: 'Ferramentas de corte em metal duro e HSS', foto: 'fresas-azuis', alt: 'Fresas de topo em metal duro com revestimento azul',
      texto: 'Ferramentas standard e especiais em metal duro ou aço rápido (HSS), para centros de usinagem CNC e para máquinas convencionais.',
      itens: ['Ferramentas standard em metal duro', 'Ferramentas standard em HSS', 'Fresas de topo, de raio e de desbaste'],
      fotos: [['fresas-cobre', 'Fresas de topo em metal duro com revestimento cobre'], ['fresa-topo', 'Fresa de topo de desbaste'], ['fresas-grupo', 'Conjunto de fresas de metal duro']] },
    { letra: 'B', slug: 'abrasivos', titulo: 'Abrasivos convencionais e diamantados', foto: 'rebolos-diamantados', alt: 'Rebolos diamantados em suportes',
      texto: 'Abrasivos convencionais e especiais, diamantados em ligas vitrificada, resinoide, metálica e eletrolítica.',
      itens: ['Liga vitrificada', 'Liga resinoide', 'Liga metálica', 'Liga eletrolítica'],
      fotos: [['anel-abrasivo', 'Rebolo anel para retificação'], ['rebolo-interno', 'Rebolo para retificação interna'], ['rolo-diamantado', 'Rolo diamantado']] },
    { letra: 'C', slug: 'grafite', titulo: 'Grafite e carvão', foto: 'grafite-tarugos', alt: 'Tarugos de grafite',
      texto: 'Tarugos, blocos e placas em grafite e carvão.',
      itens: ['Tarugos', 'Blocos', 'Placas'],
      fotos: [['grafite-placas', 'Placas de grafite'], ['grafite-cadinho', 'Peça usinada em grafite']] },
  ],
  // site: home (3 destaques) e Produtos e Serviços (lista)
  // A Engetools revende (Joao, 22/10): só o que o site diz sobre atendimento. Fabricação, usinagem para terceiros e projetos ficaram de fora.
  servicos: [
    { slug: 'assistencia', titulo: 'Assistência técnica', texto: 'Acompanhamos o uso da ferramenta na sua máquina e ajudamos a resolver as dificuldades da usinagem.', foto: 'fresas-cobre' },
    { slug: 'indicacao', titulo: 'Indicação técnica e melhoria de processo', texto: 'Indicamos a ferramenta com o melhor custo-benefício para a sua operação e sugerimos melhorias no processo.', foto: 'fresas-grupo' },
    { slug: 'importacao', titulo: 'Importação e representação', texto: 'Comércio, importação e representação de uma linha completa em ferramentas de usinagem.', foto: 'rebolos-diamantados' },
  ],
  // escrito por nós (a confirmar): como funciona uma consulta
  // texto do Joao (22/10), exatamente como ele mandou
  etapas: [
    { t: 'Consulta', d: 'Você envia a peça, o desenho ou o problema que está tendo na usinagem.', ic: 'doc' },
    { t: 'Análise técnica', d: 'Avaliamos material, máquina, operação e custo por peça.', ic: 'lupa' },
    { t: 'Indicação ou projeto', d: 'Indicamos uma ferramenta standard ou projetamos uma especial.', ic: 'docgear' },
    { t: 'Fornecimento', d: 'Ferramenta entregue, de estoque, importada ou fabricada.', ic: 'caixa' },
    { t: 'Acompanhamento', d: 'Assistência técnica na máquina e recuperação quando gastar.', ic: 'fone' },
  ],
};

// Vitrine de produtos (pedido do Joao em 22/10: site mais comercial, foco nas fresas). Cada item é uma foto real do site atual;
// as fresas azuis foram recortadas uma a uma da foto do conjunto. Nomes e usos identificados pela foto: a confirmar com o cliente.
export const categorias = [
  { slug: 'fresas', img: 'cat-fresas', nome: 'Fresas de metal duro', curto: 'Fresas', foto: 'fresa-4cortes-azul', texto: 'Topo reto, ponta esférica, cônicas e de desbaste, com revestimento.' },
  { slug: 'linha', img: 'cat-especiais', nome: 'Linha completa de corte', curto: 'Linha completa', foto: 'fresas-grupo', texto: 'Fresas e ferramentas de corte em metal duro e HSS, para CNC e máquinas convencionais.' },
  { slug: 'abrasivos', img: 'cat-abrasivos', nome: 'Abrasivos e diamantados', curto: 'Abrasivos', foto: 'rebolos-diamantados', texto: 'Rebolos convencionais e diamantados, rolos de dressagem.' },
  { slug: 'grafite', img: 'cat-grafite', nome: 'Grafite e carvão', curto: 'Grafite', foto: 'grafite-tarugos', texto: 'Tarugos, blocos e placas em grafite e carvão.' },
];
export const produtos = [
  { cat: 'fresas', foto: 'fresa-4cortes-azul', nome: 'Fresa de topo reto 4 cortes', uso: 'Desbaste e acabamento de paredes e fundos planos.', tags: ['Metal duro', 'Revestida', '4 cortes'], destaque: true },
  { cat: 'fresas', foto: 'fresa-2cortes-azul', nome: 'Fresa de topo reto 2 cortes', uso: 'Rasgos, canais e entrada em cheio, com boa saída de cavaco.', tags: ['Metal duro', 'Revestida', '2 cortes'], destaque: true },
  { cat: 'fresas', foto: 'fresa-esferica-azul', nome: 'Fresa de ponta esférica', uso: 'Acabamento de superfícies 3D em moldes e matrizes.', tags: ['Metal duro', 'Revestida', 'Esférica'], destaque: true },
  { cat: 'fresas', foto: 'fresa-micro-esferica-azul', nome: 'Fresa esférica de pescoço longo', uso: 'Detalhes no fundo de cavidades, com haste rebaixada.', tags: ['Metal duro', 'Revestida', 'Pescoço longo'], destaque: true },
  { cat: 'fresas', foto: 'fresa-conica-azul', nome: 'Fresa cônica de ponta esférica', uso: 'Ângulos de saída e detalhes finos em moldes.', tags: ['Metal duro', 'Revestida', 'Cônica'], destaque: true },
  { cat: 'fresas', foto: 'fresa-desbaste-cobre', nome: 'Fresa de desbaste com quebra-cavaco', uso: 'Remoção rápida de material, com cavaco curto.', tags: ['Metal duro', 'Revestida', 'Desbaste'], destaque: true },
  { cat: 'linha', foto: 'fresas-cobre', nome: 'Fresas revestidas linha cobre', uso: 'Topo reto e ponta esférica com revestimento cobre.', tags: ['Metal duro', 'Topo reto', 'Esférica'] },
  { cat: 'linha', foto: 'fresas-grupo', nome: 'Linha de fresas de metal duro', uso: 'Desbaste, acabamento e perfis, para centros de usinagem CNC e máquinas convencionais.', tags: ['Metal duro', 'CNC', 'Convencional'] },
  { cat: 'abrasivos', foto: 'rebolos-diamantados', nome: 'Rebolos diamantados', uso: 'Ligas vitrificada, resinoide, metálica e eletrolítica.', tags: ['Diamante', 'Vitrificada', 'Resinoide'] },
  { cat: 'abrasivos', foto: 'anel-abrasivo', nome: 'Rebolo anel', uso: 'Retificação de faces e superfícies planas.', tags: ['Abrasivo', 'Anel'] },
  { cat: 'abrasivos', foto: 'rebolo-interno', nome: 'Rebolo para retificação interna', uso: 'Furos e diâmetros internos de precisão.', tags: ['Abrasivo', 'Interno'] },
  { cat: 'abrasivos', foto: 'rolo-diamantado', nome: 'Rolo diamantado', uso: 'Dressagem de rebolos com perfil.', tags: ['Diamante', 'Dressagem'] },
  { cat: 'grafite', foto: 'grafite-tarugos', nome: 'Tarugos de grafite', uso: 'Barras redondas para usinar eletrodos e peças.', tags: ['Grafite', 'Tarugo'] },
  { cat: 'grafite', foto: 'grafite-placas', nome: 'Blocos e placas de grafite', uso: 'Material em bloco e placa, em grafite e carvão.', tags: ['Grafite', 'Carvão', 'Placa'] },
];
