// Conteúdo do site da J. Chiquitto. Textos copiados do site atual (jchiquitto.com.br, out/2026); o que foi escrito por nós está marcado "nosso".
export const empresa = {
  nome: 'J. Chiquitto',
  razao: 'J. Chiquitto & Cia Ltda',
  descritor: 'Equipamentos para movimentação de carga',
  fundacao: 1963,
  url: 'https://jchiquitto.overtus.com.br/',
  antigo: 'https://www.jchiquitto.com.br/',
  fone: '(19) 3417-3450',
  foneHref: '+551934173450',
  wa: '551934173450',
  email: 'vendas@jchiquitto.com.br',
  horario: 'Segunda a sexta, das 7h30 às 17h30',
  endereco: ['Rua Antônio Alcântara Machado, 822', 'Vila Pacaembu · Piracicaba/SP', 'CEP 13401-541'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=J.%20Chiquitto%20Rua%20Ant%C3%B4nio%20Alc%C3%A2ntara%20Machado%20822%20Piracicaba',
  mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7358.464535049861!2d-47.644625!3d-22.75676!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2f2cca66fe0f9459!2sJ.%20Chiquitto!5e0!3m2!1spt-BR!2sbr!4v1647010644699!5m2!1spt-BR!2sbr',
  instagram: 'https://instagram.com/jchiquitto',
  facebook: 'https://www.facebook.com/jchiquitto-114757327369293',
};

// Página "Empresa" do site atual.
export const sobre = {
  abertura: 'Atuando no mercado nacional desde 1963, a J. Chiquitto trabalha com um novo conceito em pronto atendimento e qualidade em prestação de serviços para reforma e venda de peças para empilhadeiras.',
  solucao: 'Solucionando seus problemas da maneira mais rápida e eficaz, oferecendo o que há de melhor no mercado:',
  quatro: ['Preço', 'Qualidade', 'Prazo para pagamento', 'Rapidez na entrega'],
  fecho: 'Trabalho sério, equipe capacitada e qualificada e uma grande experiência no setor resultam em pleno êxito aos desafios propostos pelas necessidades de nossos clientes em todo o país.',
  pilares: [
    { t: 'Venda de equipamentos', d: 'Oferecemos o que há de melhor no mercado: preço, qualidade, prazo para pagamento e rapidez na entrega.', foto: 'fotos/frota' },
    { t: 'Locação de empilhadeiras', d: 'Temos uma gama variada de empilhadeiras para locação. Todos os equipamentos estão com a revisão em dia!', foto: 'fotos/operador' },
    { t: 'Manutenção e reformas', d: 'Equipe de profissionais capacitados para diversos serviços como revisões, consertos e reparos em geral.', foto: 'fotos/mecanico' },
  ],
};

// Os três cards da home atual.
export const frentes = [
  { t: 'Compra, venda e locação de empilhadeiras até 20 toneladas', curto: 'Compra, venda e locação', foto: 'fotos/card-locacao', link: 'empilhadeiras/' },
  { t: 'Soluções em reforma e venda de peças', curto: 'Reforma e peças', foto: 'fotos/card-pecas', link: 'servicos/' },
  { t: 'Rapidez e estoque para agilizar seus pedidos', curto: 'Estoque e rapidez', foto: 'fotos/card-estoque', link: 'produtos/' },
];

// Página "Empilhadeiras" do site atual.
export const negocios = [
  { id: 'aluguel', t: 'Aluguel', d: 'Equipamentos novos e seminovos com capacidade de até 20 toneladas. Manutenção conforme fabricante, garantindo alta performance aos equipamentos. Aluguel em período diário, mensal e anual.', foto: 'fotos/operador', itens: ['Diário, mensal ou anual', 'Até 20 toneladas', 'Manutenção conforme fabricante'] },
  { id: 'venda', t: 'Venda', d: 'Grande variedade de empilhadeiras novas e seminovas para os mais variados segmentos.', foto: 'fotos/frota', itens: ['Novas e seminovas', 'Vários segmentos', 'Prazo para pagamento'] },
  { id: 'pecas', t: 'Peças', d: 'Peças para manutenção e prevenção de máquinas e equipamentos com garantia de origem e procedência. Consulte-nos.', foto: 'fotos/card-pecas', itens: ['Garantia de origem', 'Procedência', 'Estoque próprio'] },
  { id: 'compra', t: 'Compra', d: 'Avaliamos e compramos a sua empilhadeira oferecendo as melhores condições comerciais. Venha fazer bons negócios!', foto: 'fotos/fileira', itens: ['Avaliação do equipamento', 'Melhores condições', 'Negócio rápido'] },
];

// Capacidades citadas no site atual (página de cada produto e da home).
export const capacidades = [
  { t: 'Empilhadeiras', v: 20, txt: 'até 20 t', link: 'empilhadeiras/' },
  { t: 'Garfos', v: 16, txt: 'até 16 t', link: 'produtos/garfos/' },
  { t: 'Deslocador lateral', v: 12, txt: 'até 12 t', link: 'produtos/deslocador-lateral/' },
  { t: 'Giratório', v: 7.5, txt: 'até 7,5 t', link: 'produtos/giratorio/' },
];

// Menu "Produtos" do site atual, na mesma ordem. Textos de cada página; "resumo" é nosso.
export const produtos = [
  { slug: 'carcacas', nome: 'Carcaças', resumo: 'Linha Hyster, diversos modelos', textos: ['Somos especializados na linha Hyster e oferecemos diversos modelos.'], fotos: ['carc', 'carc2', 'carc3', 'carc4', 'carc5', 'carc6'] },
  { slug: 'carro-porta-garfo', nome: 'Carro porta-garfo', resumo: 'Diversas marcas e modelos', textos: ['Trabalhamos com diversas marcas e modelos.'], fotos: ['portagarfo', 'portagarfo2', 'portagarfo3'] },
  { slug: 'componentes-hidraulicos', nome: 'Componentes hidráulicos', resumo: 'Cilindros, bombas e comandos', textos: ['Fabricação e reforma de vários modelos de cilindros, bomba e comando hidráulicos.', 'Trabalhamos com todas as marcas e modelos.'], fotos: ['hidra', 'hidra2', 'hidra3', 'hidra4', 'hidra5', 'hidra6', 'hidra7', 'hidra8', 'hidra9', 'hidra10', 'hidra11', 'hidra12', 'hidra13', 'hidra14', 'hidra15', 'hidra16'] },
  { slug: 'deslocador-lateral', nome: 'Deslocador lateral', resumo: 'Até 12 t, desloca 10 cm', spec: [['Capacidade', 'até 12 t'], ['Deslocamento', 'cerca de 10 cm']], textos: ['Permite o deslocamento dos garfos em torno de 10 cm.', 'Trabalha até 12 toneladas.', 'Visa facilitar o posicionamento das cargas, compensando pequenos erros da manobra.'], fotos: ['desloca', 'desloca2'] },
  { slug: 'eixos', nome: 'Eixos hidráulicos', resumo: 'Fabricação, reforma e adaptação', textos: ['Trabalhamos com adaptação de eixos para sistema moderno.', 'Fabricação e reforma de vários modelos.', 'Completo ou apenas a carcaça.'], fotos: ['eixos', 'eixos2', 'eixos3', 'eixos4', 'eixos5', 'eixos6'] },
  { slug: 'garfos', nome: 'Garfos', resumo: 'Até 16 t, aço de alta resistência', spec: [['Capacidade', 'até 16 t'], ['Material', 'aço de extrema resistência']], textos: ['Garfos de até 16 toneladas.', 'Produzidos em aço de extrema resistência, estes equipamentos garantem uma operação segura com grande durabilidade.', 'Temos modelos para operações específicas conforme as necessidades dos clientes.'], fotos: ['garfos', 'garfos2', 'garfos3', 'garfos4', 'garfos5', 'garfos6'] },
  { slug: 'giratorio', nome: 'Giratório', resumo: 'Até 7,5 t, giro de 360º', spec: [['Capacidade', 'até 7,5 t'], ['Giro', '360º']], textos: ['Giratórios para empilhadeiras de até 7,5 toneladas.', 'Fazem que o conjunto de garfos gire até 360º, em qualquer direção no sentido vertical.'], fotos: ['giragarfo'] },
  { slug: 'pecas', nome: 'Peças', resumo: 'Manutenção e reparo', textos: ['Diversos tipos de peças para manutenção e reparo de empilhadeiras.'], fotos: ['pecas', 'pecas2', 'pecas3', 'pecas4', 'pecas5', 'pecas6', 'pecas7'] },
  { slug: 'posicionador-de-garfos', nome: 'Posicionador de garfos', resumo: 'Cargas de dimensões variadas', textos: ['Indicado para manusear cargas de dimensões variadas.', 'Ideal para todas as marcas e modelos.', 'Sua função é posicionar hidraulicamente a distância entre garfos, criando agilidade, rapidez e produtividade.'], fotos: ['posiciona'] },
  { slug: 'prolongador', nome: 'Prolongador', resumo: 'Carregamento com agilidade', textos: ['Para carregamento com eficiência e agilidade.'], fotos: ['prolongador', 'prolongador2'] },
  { slug: 'protetor-de-carga', nome: 'Protetor de carga', resumo: 'Várias marcas e modelos', textos: ['Trabalhamos com várias marcas e modelos.'], fotos: ['protetor', 'protetor2', 'protetor3', 'protetor4'] },
  { slug: 'torres-de-elevacao', nome: 'Torres de elevação', resumo: 'Duplex, triplex e quadriplex', spec: [['Modelos', 'duplex, triplex e quadriplex']], textos: ['Modelos duplex, triplex e quadriplex.', 'Trabalhamos com várias marcas e modelos.'], fotos: ['torres', 'torres2', 'torres3', 'torres4', 'torres5'] },
];

// Página "Serviços" do site atual. "foto" e "produto" ligam cada serviço a uma foto real da linha correspondente.
export const servicos = [
  { t: 'Aumento e diminuição de torres de elevação', foto: 'prod/torres3', produto: 'torres-de-elevacao' },
  { t: 'Reforma de equipamentos para movimentação de cargas', d: 'Clamps de bobina e fardo, G.D.I e G.D.B', foto: 'prod/posiciona', produto: 'posicionador-de-garfos' },
  { t: 'Reforma de componentes hidráulicos', d: 'Comandos, bombas e cilindros', foto: 'prod/hidra5', produto: 'componentes-hidraulicos' },
  { t: 'Reforma de eixos', d: 'Direcional e hidráulico', foto: 'prod/eixos2', produto: 'eixos' },
  { t: 'Adaptação de eixos direcionais para sistema hidráulico', foto: 'prod/eixos5', produto: 'eixos' },
  { t: 'Reforma em garfos de elevação', foto: 'prod/garfos', produto: 'garfos' },
  { t: 'Reforma em carros de elevação', d: 'Com ou sem deslocador', foto: 'prod/portagarfo2', produto: 'carro-porta-garfo' },
  { t: 'Transformação de torres duplex para triplex', foto: 'prod/torres2', produto: 'torres-de-elevacao' },
];

// "Principais marcas" (carrossel da home e de Serviços), na ordem do site atual.
export const marcas = [
  ['doosan', 'Doosan'], ['maximal', 'Maximal'], ['clark', 'Clark'], ['cmh', 'CMH'], ['hyster', 'Hyster'],
  ['linde', 'Linde'], ['mitsubishi', 'Mitsubishi'], ['toyota', 'Toyota'], ['yale', 'Yale'], ['hyundai', 'Hyundai'],
];

export const estrutura = ['fotos/estrutura1', 'fotos/estrutura2', 'fotos/estrutura3', 'fotos/estrutura4'];
