// Textos e dados da Ideal Esquadrias. Endereço, telefones, e-mail, lista de produtos, "Quem somos",
// "Oferecemos" e o slogan "Arte em alumínio" vêm do site atual (idealesquadrias.ind.br).
// Descrições de cada linha de produto e legendas das fotos foram escritas por nós a partir das fotos.
export const empresa = {
  nome: 'Ideal Esquadrias',
  slogan: 'Arte em alumínio',
  url: 'https://idealesquadrias.overtus.com.br/',
  antigo: 'http://idealesquadrias.ind.br/',
  cidade: 'Porto Alegre · RS',
  endereco: ['Av. Bernardino Silveira Amorim, 2333', 'Rubem Berta, Porto Alegre · RS', 'CEP 91160-000'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Bernardino+Silveira+Amorim%2C+2333%2C+Porto+Alegre+RS',
  mapaEmbed: 'https://www.google.com/maps?q=Av.+Bernardino+Silveira+Amorim,+2333+-+Rubem+Berta,+Porto+Alegre+-+RS&z=15&output=embed',
  fone: '(51) 3367-0078', foneHref: '+555133670078',
  cel: '(51) 99802-7618', celHref: '+5551998027618',
  wa: '5551998027618',
  email: 'esquadriasideal14@gmail.com',
};

export const quemSomos = 'Nossa empresa tem vasta experiência em produção de esquadrias de alumínio, o que nos qualifica a atender cada vez mais e melhor nossos clientes. A Ideal Esquadrias fabrica box para banheiro, esquadrias, portas, portões, grades e coberturas. Também fazemos consertos em geral.';
export const oferecemos = 'Um produto com excelente qualidade, agregando valor ao seu patrimônio, com o melhor custo-benefício e respeitando prazos de entrega e colocação.';

// Os quatro itens do bloco "Oferecemos" do site atual.
export const diferenciais = [
  { t: 'Nossos produtos', d: 'Excelente qualidade, agregando valor ao seu patrimônio.' },
  { t: 'Qualidade', d: 'Produtos modernos, seguros, práticos e resistentes.' },
  { t: 'Custo x benefício', d: 'O melhor custo-benefício, agregando valor aos seus projetos.' },
  { t: 'Instalação', d: 'Fabricação, montagem e instalação de esquadrias em alumínio.' },
];

// Linhas de produto: a lista do "Quem somos" + as duas categorias de trabalhos do site atual.
export const produtos = [
  { slug: 'janelas', nome: 'Janelas e esquadrias', curto: 'Janelas',
    texto: 'Janelas de correr, de canto, com veneziana ou com persiana integrada, em alumínio branco ou preto, com vidro liso ou jateado. Feitas sob medida para o vão da sua obra.',
    fotos: ['janela-correr', 'janela-canto', 'casa-piscina', 'janela-veneziana', 'persiana', 'janela-preta', 'janela-jateada'] },
  { slug: 'portas', nome: 'Portas', curto: 'Portas',
    texto: 'Portas pivotantes em lambri com visor de vidro, portas de correr de vidro com perfil preto, portas camarão e portas de vidro com bandeira para entradas e lojas.',
    fotos: ['porta-pivotante', 'porta-correr-preta', 'porta-pivotante-pedra', 'porta-correr-3', 'fachada-vidro', 'porta-jateada', 'porta-camarao'] },
  { slug: 'portoes', nome: 'Portões e grades', curto: 'Portões e grades',
    texto: 'Portões de correr e de pedestre e fechamentos de frente em alumínio, que não enferrujam e pedem pouca manutenção.',
    fotos: ['portao', 'fechamento'] },
  { slug: 'vidro', nome: 'Cercas e guarda-corpos de vidro temperado', curto: 'Vidro temperado',
    texto: 'Cercas de frente e guarda-corpos de piscina e sacada em vidro temperado com perfis de alumínio: segurança sem esconder a fachada.',
    fotos: ['cerca-vidro', 'guarda-corpo'] },
  { slug: 'coberturas', nome: 'Coberturas', curto: 'Coberturas',
    texto: 'Coberturas de vidro com estrutura de alumínio para corredores, varandas e áreas externas, deixando a luz entrar.',
    fotos: ['cobertura'] },
  { slug: 'box', nome: 'Box para banheiro', curto: 'Box',
    texto: 'Box de vidro com perfis de alumínio, sob medida para o seu banheiro.',
    fotos: [] },
  { slug: 'consertos', nome: 'Consertos em geral', curto: 'Consertos',
    texto: 'Também fazemos consertos em geral: janela que emperra, porta desalinhada, portão que precisa de ajuste. Mande uma foto pelo WhatsApp.',
    fotos: [] },
];

// Do pedido à colocação: etapas tiradas do próprio texto do site ("orçamento por WhatsApp", "fabricação,
// montagem e instalação", "respeitando prazos de entrega e colocação").
export const etapas = [
  { t: 'Orçamento', d: 'Mande pelo WhatsApp o que precisa, com foto e as medidas aproximadas do vão.', foto: 'janela-correr' },
  { t: 'Fabricação', d: 'A esquadria é produzida sob medida na nossa fábrica em Porto Alegre.', foto: 'janela-veneziana' },
  { t: 'Montagem', d: 'Perfis, vidros e ferragens montados e conferidos antes de sair.', foto: 'porta-camarao' },
  { t: 'Colocação', d: 'Instalação na obra dentro do prazo combinado.', foto: 'porta-pivotante' },
];

export const fotos = {
  'janela-veneziana': 'Janela de correr com veneziana em alumínio',
  'casa-piscina': 'Casa com portas e janelas de correr em alumínio branco',
  fechamento: 'Fechamento de frente em alumínio',
  portao: 'Portão de correr e portão de pedestre em alumínio branco',
  'cerca-vidro': 'Cerca de vidro temperado com perfis de alumínio',
  'fachada-vidro': 'Porta e fachada de vidro com bandeira',
  cobertura: 'Cobertura de vidro com estrutura de alumínio',
  'janela-jateada': 'Janela branca com vidro jateado',
  'porta-pivotante': 'Porta pivotante em lambri branco com visor de vidro',
  'porta-jateada': 'Porta de vidro jateado com bandeira',
  'porta-pivotante-pedra': 'Porta pivotante branca com visores laterais',
  'janela-canto': 'Janela de canto em alumínio branco',
  'janela-correr': 'Janela de correr de três folhas',
  'porta-correr-preta': 'Porta de correr de vidro com perfil preto',
  'porta-correr-3': 'Porta de correr de vidro com perfil preto, três folhas',
  'guarda-corpo': 'Guarda-corpo de vidro temperado na piscina',
  persiana: 'Porta de correr com persiana integrada',
  'janela-preta': 'Janela em alumínio preto',
  'porta-camarao': 'Porta camarão em alumínio',
};
export const tamanhos = {"janela-veneziana": [1046, 1200], "casa-piscina": [1200, 450], "fechamento": [1200, 450], "portao": [1200, 450], "cerca-vidro": [1200, 450], "fachada-vidro": [1050, 1400], "cobertura": [787, 1400], "janela-jateada": [1050, 1400], "porta-pivotante": [1050, 1400], "porta-jateada": [1050, 1400], "porta-pivotante-pedra": [1050, 1400], "janela-canto": [480, 640], "janela-correr": [550, 490], "porta-correr-preta": [415, 739], "porta-correr-3": [479, 640], "guarda-corpo": [640, 480], "persiana": [543, 496], "janela-preta": [665, 461], "porta-camarao": [640, 640]};
