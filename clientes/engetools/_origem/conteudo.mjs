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
    'Além das ferramentas de corte, desenvolvemos projetos de automação e melhorias de processo, aplicando conceitos modernos e inovadores em todos os processos desenvolvidos.',
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
      itens: ['Ferramentas standard em metal duro', 'Ferramentas standard em HSS', 'Ferramentas especiais sob desenho', 'Fresas de topo, de raio e de desbaste'],
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
  servicos: [
    { slug: 'especiais', titulo: 'Ferramentas especiais', texto: 'Engenharia, desenvolvimento e fabricação de ferramentas especiais e standard, em metal duro ou HSS.', foto: 'fresas-cobre' },
    { slug: 'diamantadas', titulo: 'Ferramentas diamantadas', texto: 'Desenvolvimento e fabricação de ferramentas diamantadas e abrasivos especiais.', foto: 'rebolos-diamantados' },
    { slug: 'recuperacao', titulo: 'Recuperação de ferramentas', texto: 'Recuperamos e restauramos ferramentas e dispositivos para usinagem.', foto: 'rolo-diamantado' },
    { slug: 'usinagem', titulo: 'Usinagem para terceiros', texto: 'Serviços de usinagem para outras empresas.', foto: 'grafite-cadinho' },
    { slug: 'automacao', titulo: 'Automação e melhoria de processos', texto: 'Desenvolvimento de projetos de automação e melhoria de processos.', foto: 'fresas-grupo' },
    { slug: 'pecas', titulo: 'Peças técnicas e projetos especiais', texto: 'Desenvolvimento de peças técnicas e projetos especiais.', foto: 'rebolo-interno' },
  ],
  // escrito por nós (a confirmar): como funciona uma consulta
  etapas: [
    { t: 'Consulta', d: 'Você envia a peça, o desenho ou o problema que está tendo na usinagem.' },
    { t: 'Análise técnica', d: 'Avaliamos material, máquina, operação e custo por peça.' },
    { t: 'Indicação ou projeto', d: 'Indicamos uma ferramenta standard ou projetamos uma especial.' },
    { t: 'Fornecimento', d: 'Ferramenta entregue, de estoque, importada ou fabricada.' },
    { t: 'Acompanhamento', d: 'Assistência técnica na máquina e recuperação quando gastar.' },
  ],
};
