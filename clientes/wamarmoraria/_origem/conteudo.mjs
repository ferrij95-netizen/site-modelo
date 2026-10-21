// Conteúdo da W&A Mármores e Granitos. Textos da empresa, pedras, dicas e contatos copiados do site atual
// (wamarmoraria.com.br, 2001); o que foi escrito por nós está marcado com "nosso" e listado no LEIA-ME.
export const empresa = {
  nome: 'W&A Mármores e Granitos',
  curto: 'W&A',
  url: 'https://wamarmoraria.overtus.com.br/',
  antigo: 'http://www.wamarmoraria.com.br/',
  fundada: 2001,
  rua: 'Rua Paula Bueno, 171',
  bairro: 'Taquaral',
  cidade: 'Campinas - SP',
  fone: '(19) 3254-3851',
  foneHref: '+551932543851',
  email: 'contato@wamarmoraria.com.br',
  mapa: 'https://www.google.com/maps/search/?api=1&query=W%26A+M%C3%A1rmores+e+Granitos+Rua+Paula+Bueno+171+Campinas',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Paula+Bueno,+171+-+Taquaral,+Campinas+-+SP&output=embed',
};

// Texto da página "A empresa" do site atual, na íntegra.
export const sobre = {
  intro: 'Fundada em 2001 para atender a demanda por serviços e projetos de revestimentos, pisos e pedras em mármore e granito, a W&A tem como principal diferencial o comprometimento com a qualidade e confiabilidade nos serviços prestados.',
  estrutura: 'Contando com estrutura informatizada e disponibilizando recursos de tecnologia de última geração, agregando eficiência aos serviços prestados.',
  equipe: 'Com técnicos altamente capacitados e em constante atualização, o objetivo único da W&A é criar e implantar as melhores soluções, suprindo todas as expectativas e buscando a total satisfação de nossos clientes.',
  pedras: 'Fundamental na escolha de mármores e granitos é a qualidade das pedras, encontradas aqui na W&A Marmoraria.',
  polimento: 'Nossas pedras recebem polimento especial, realçando ainda mais sua beleza natural.',
  escolha: 'Nossa equipe treinada está preparada para oferecer um ótimo atendimento aos clientes, ajudando na escolha das pedras ideais para cada ambiente. Mármore ou granito, nacional ou importado, a escolha será sempre assistida por nós. Venha até nossa loja e verifique os tipos de pedras para sua residência ou comércio.',
  jazidas: 'Os mármores e granitos da W&A Marmoraria são oriundos das melhores jazidas de pedra bruta do mundo.',
  parque: 'Em nosso parque industrial encontram-se as melhores máquinas existentes para beneficiar as pedras.',
};

// Pilares tirados do texto acima (títulos nossos, frases do site).
export const pilares = [
  { t: 'Qualidade das pedras', d: 'Mármores e granitos vindos das melhores jazidas de pedra bruta do mundo.' },
  { t: 'Polimento especial', d: 'Acabamento que realça ainda mais a beleza natural de cada chapa.' },
  { t: 'Escolha assistida', d: 'Nacional ou importado: a equipe ajuda a escolher a pedra ideal para cada ambiente.' },
  { t: 'Estrutura informatizada', d: 'Parque industrial com máquinas modernas para beneficiar as pedras.' },
];

// Do bloco bruto à obra: etapas tiradas do texto do site, ilustradas com as fotos do próprio site (a jazida é foto de banco).
export const etapas = [
  { n: '01', t: 'Jazida', d: 'As pedras vêm das melhores jazidas de pedra bruta, nacionais e importadas.', foto: 'jazida-carrara', banco: true },
  { n: '02', t: 'Bloco bruto', d: 'O bloco chega ao pátio e é escolhido pela qualidade da pedra.', foto: 'bloco-bruto' },
  { n: '03', t: 'Beneficiamento', d: 'No parque industrial, máquinas modernas cortam o bloco em chapas.', foto: 'corte-bloco' },
  { n: '04', t: 'Polimento', d: 'Cada chapa recebe polimento especial, que realça o desenho natural da pedra.', foto: 'patio-blocos' },
  { n: '05', t: 'Sua obra', d: 'Medimos no local, produzimos as peças sob medida e instalamos.', foto: 'escada-curva' },
];

// As seis pedras da página "Produtos" do site atual (fotos originais ampliadas). Tipo e origem: conhecimento geral sobre cada pedra.
export const pedras = [
  { slug: 'calacata-gold', nome: 'Calacata Gold', tipo: 'Mármore', origem: 'Importado · Itália', tons: 'Branco com veios cinza e dourados', uso: 'Bancadas, lavabos e paredes de destaque' },
  { slug: 'crema-marfil', nome: 'Crema Marfil', tipo: 'Mármore', origem: 'Importado · Espanha', tons: 'Bege claro, uniforme', uso: 'Pisos, escadas e banheiros' },
  { slug: 'crema-valencia', nome: 'Crema Valencia', tipo: 'Mármore', origem: 'Importado · Espanha', tons: 'Amarelo e salmão com veios vermelhos', uso: 'Revestimentos e peças de destaque' },
  { slug: 'grigio-argento', nome: 'Grigio Argento', tipo: 'Mármore', origem: 'Importado', tons: 'Cinza prateado com manchas suaves', uso: 'Pisos e revestimentos' },
  { slug: 'rosso-verona', nome: 'Rosso Verona', tipo: 'Mármore', origem: 'Importado · Itália', tons: 'Vermelho com nódulos rosados', uso: 'Detalhes, soleiras e tampos' },
  { slug: 'onix-arco-iris', nome: 'Ônix Arco-Íris', tipo: 'Ônix', origem: 'Importado', tons: 'Faixas em marrom, mel e creme', uso: 'Painéis, lavabos e peças retroiluminadas' },
];

// Onde as pedras vão. Fotos 1 a 3 são do site atual; cozinha e banheiro são de banco (crédito no rodapé).
export const ambientes = [
  { t: 'Escadas', d: 'Degraus e espelhos em granito ou mármore, inclusive em curva.', foto: 'escada-curva' },
  { t: 'Revestimentos', d: 'Paredes e colunas revestidas em pedra polida.', foto: 'revestimento-preto' },
  { t: 'Pisos', d: 'Pisos de alto tráfego para residências e comércio.', foto: 'escada-granito' },
  { t: 'Cozinhas', d: 'Bancadas e ilhas em granito, sob medida.', foto: 'cozinha-granito', banco: true },
  { t: 'Banheiros', d: 'Tampos e lavatórios em mármore.', foto: 'banheiro-marmore', banco: true },
];

// Dicas: as três primeiras são do site atual; limpeza estava incompleta ("recomendamos......") e foi completada por nós.
export const dicas = [
  { t: 'Nada quente direto na pedra', d: 'Para melhor conservação do seu mármore ou granito, recomendamos que não coloque objetos quentes direto em cima das pedras. Use descanso de panela.' },
  { t: 'Cuidado com pancadas', d: 'Evite bater com objetos pontiagudos em cima das pedras: quinas e bordas são os pontos mais sensíveis.' },
  { t: 'Mármore pede mais atenção', d: 'Mármores, por serem mais porosos, têm uma fragilidade maior em relação aos granitos. Limões, vinagre e vinho devem ser limpos logo.' },
  { t: 'Limpeza do dia a dia', d: 'Pano macio, água e detergente neutro. Evite produtos ácidos, saponáceos e palha de aço, que tiram o brilho do polimento.', nosso: true },
];

export const comparativo = {
  marmore: ['Veios marcantes e desenho elegante', 'Mais poroso: absorve manchas com mais facilidade', 'Ideal para pisos internos, banheiros, lavabos e paredes'],
  granito: ['Desenho granulado, cores do branco ao preto absoluto', 'Mais duro e menos poroso', 'Ideal para cozinhas, áreas externas e escadas de uso intenso'],
};

export const pecas = ['Piso', 'Escada', 'Revestimento de parede', 'Bancada de cozinha', 'Banheiro ou lavabo', 'Soleira e peitoril', 'Outro'];

export const creditos = 'Fotos de jazida, cozinha e banheiro: Wittylama (CC BY-SA, Wikimedia), Chris Feser (CC BY, Wikimedia) e rawpixel (CC0).';
