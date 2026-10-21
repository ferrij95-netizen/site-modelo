// Textos e dados da Alumac. Telefones, endereço, frases e produtos vêm do site atual (alumac.com.br, index.html e diversos.html)
// e dos vídeos do canal do YouTube da empresa; nota do Google Maps. Descrições de cada linha de produto foram escritas por nós.
import fs from 'node:fs';

export const empresa = {
  nome: 'Alumac',
  completo: 'Alumac Montagem de Alumínio',
  slogan: 'O melhor resultado, sempre!',
  url: 'https://alumac.overtus.com.br/',
  antigo: 'http://www.alumac.com.br/',
  cidade: 'Fortaleza · CE',
  endereco: ['Rua Cuiabá, 230 · Jóquei Clube', 'Fortaleza · CE · CEP 60510-055'],
  mapa: 'https://www.google.com/maps/search/Alumac/@-3.769887,-38.576765,17z',
  mapaEmbed: 'https://www.google.com/maps?q=-3.7700348,-38.5768058&z=16&output=embed',
  fone: '(85) 3290-2000', foneHref: '+558532902000',
  celulares: [
    { n: '(85) 9 9651-9136', h: '5585996519136', quem: 'Raquel Machado, diretora' },
    { n: '(85) 9 8585-2000', h: '5585985852000', quem: 'Machado' },
    { n: '(85) 9 8703-2956', h: '5585987032956', quem: 'Atendimento' },
  ],
  wa: '5585996519136',
  instagram: 'https://www.instagram.com/alumac.fortaleza/',
  youtube: 'https://www.youtube.com/@ALUMAC.FORTALEZA',
  nota: '4,8',
  cartao: 'Cartões de crédito em até 10 vezes sem entrada',
};

// As seis linhas de produto que aparecem nas fotos e nas frases do site atual.
export const linhas = [
  { slug: 'portoes', nome: 'Portões', foto: 'portoes-1',
    resumo: 'Portões de garagem, sociais e corrediços, com a estrutura sempre do lado de dentro.',
    texto: 'O produto mais pedido da Alumac. Cada portão é fabricado sob medida na Rua Cuiabá, com a armação do lado de dentro da casa, como recomenda o fabricante do perfil: de fora não há parafuso nem estrutura para forçar.',
    tipos: ['Portão de garagem de duas folhas', 'Portão com porta social embutida', 'Portão corrediço com trava anti-rebote em inox 304', 'Bandeirola de segurança: ventila de dia, fecha à noite', 'Portão conversível'] },
  { slug: 'janelas', nome: 'Janelas', foto: 'janelas-1',
    resumo: 'Janelas de correr e maxim-ar em alumínio branco, com vidro incolor, verde ou fumê.',
    texto: 'Janela de verdade, com perfil de esquadria e não de box. A Alumac mostra lado a lado a diferença entre a sua janela e a chamada M2000 no vídeo do canal da empresa.',
    tipos: ['Janelas de correr de 2 e 4 folhas', 'Maxim-ar para banheiro e cozinha', 'Janelas com grade integrada', 'Fechamento de varandas e fachadas'] },
  { slug: 'portas', nome: 'Portas', foto: 'portas-1',
    resumo: 'Portas de abrir, de correr e de vidro, lambri ou com visor.',
    texto: 'A Alumac foi pioneira em Fortaleza nas portas de alumínio e PVC industrial. Hoje faz portas de entrada, de cozinha, de banheiro e de área de serviço, todas no mesmo padrão de acabamento.',
    tipos: ['Porta lambri de abrir', 'Porta de vidro com quadro', 'Porta de correr para varanda', 'Porta com visor lateral e puxador'] },
  { slug: 'grades', nome: 'Grades', foto: 'grades-1',
    resumo: 'Grades de janela, de varanda e portões de grade, firmes e sem ferrugem.',
    texto: 'Grade de alumínio não enferruja com a maresia de Fortaleza e não precisa de pintura. A Alumac faz grades retas e projetadas, para janelas, varandas, portas e portões.',
    tipos: ['Grade projetada para janela', 'Grade de varanda e sacada', 'Porta e portão de grade', 'Grade com cobertura'] },
  { slug: 'corrimaos', nome: 'Corrimãos e guarda-corpos', curto: 'Corrimãos', foto: 'corrimaos-1',
    resumo: 'Corrimãos de escada e de rampa, guarda-corpos com vidro e cercados de piscina.',
    texto: 'Segurança para escadas, mezaninos, rampas e piscinas. Fixação firme, tubo arredondado na mão e vidro quando o projeto pede leveza.',
    tipos: ['Corrimão de escada', 'Guarda-corpo com vidro', 'Rampa de acessibilidade', 'Cercado de piscina'] },
  { slug: 'moveis', nome: 'Guarda-roupas e armários', curto: 'Guarda-roupas', foto: 'moveis-1',
    resumo: 'Guarda-roupas, armários de pia e sapateiras de alumínio, feitos para durar.',
    texto: 'Guarda-roupa para durar mais de meio século é com a Alumac. Alumínio não estufa com umidade nem dá cupim: serve para quarto, cozinha, área de serviço e banheiro.',
    tipos: ['Guarda-roupa com portas de vidro', 'Armário de pia e de cozinha', 'Estante e home office', 'Sapateira sob medida'] },
];

// Portão seguro: o que o site atual repete em várias frases.
export const portao = [
  { t: 'Estrutura do lado de dentro', d: 'A Alumac tem equipamento para seguir a recomendação do fabricante e nunca inverte a armação. Do lado de fora fica só o lambri liso.' },
  { t: 'Trava anti-rebote em inox 304', d: 'Criada pela Alumac para os portões corrediços: segura o rebote do portão no fim do curso, com uma peça que não enferruja.' },
  { t: 'Bandeirola com guia chaveta', d: 'Guias chavetas projetadas e produzidas na própria fábrica: a bandeirola deixa entrar luz e ar de dia e fecha tudo à noite.' },
  { t: 'Portão conversível', d: 'Mais uma criação da Alumac, que está sempre acima do seu tempo: rapidez na entrega e durabilidade em tudo que faz.' },
];

// Como a venda acontece (do aviso "Alumac informa" e das frases do site).
export const etapas = [
  { t: 'Visita e medição', d: 'A Alumac vai até o endereço do cliente, ou o cliente vem à fábrica, para medir e ver o projeto de perto.' },
  { t: 'Orçamento com recibo timbrado', d: 'Orçamento feito na presença do cliente, com recibo timbrado da Alumac. Nada de link ou Pix antecipado.' },
  { t: 'Fabricação na Rua Cuiabá', d: 'Corte, montagem e acabamento na fábrica própria, com material de primeira linha.' },
  { t: 'Montagem e entrega', d: 'Instalação pela equipe da Alumac, com prazo rápido de entrega.' },
];

// Frases do próprio site atual (cada uma era um link para um vídeo do Instagram).
export const frases = [
  'A segurança da sua casa começa pelo portão.',
  'Quando o que quer não existe, inventa o que quer.',
  'Não trabalhamos com o menor preço e sim com o melhor preço.',
  'Os produtos da Alumac não custam mais. Nossos produtos valem mais.',
  'Um produto que se compra para durar dezenas de anos não deve ser comprado e feito em qualquer lugar. Visite o lugar que está comprando.',
  'Uma vida num só lugar. Rua Cuiabá, 230.',
];

export const videos = [
  { id: 'KCjV93yJhoI', foto: 'video-portao', t: 'Portão de alumínio com a estrutura invertida não fornece segurança', larg: true },
  { id: 'swxujXJDSEg', foto: 'video-m2000', t: 'O que chamam de "M2000" é um box disfarçado de janela', larg: true },
  { id: 'wqfVxzcLg04', foto: 'video-esquadrias', t: 'As melhores esquadrias de Fortaleza são da Alumac' },
  { id: 'boaBpr0dS1o', foto: 'video-branco', t: 'Esquadrias de alumínio branco em Fortaleza' },
];

export const aviso = 'A Alumac só vende na presença do cliente, no nosso endereço ou no endereço da obra, para medir, orçar e entregar o recibo timbrado da venda. Nunca pedimos entrada por Pix ou link de cartão. A única pessoa autorizada a vender em nome da Alumac é Raquel Machado, diretora da empresa. Já foi feito boletim de ocorrência contra quem se passa pela Alumac: isto é golpe.';

// Fotos reais do site atual (página "diversos"), 800 px de largura. Nomes originais em fotos.json.
const j = JSON.parse(fs.readFileSync(new URL('./fotos.json', import.meta.url)));
export const tamanhos = j.tam;
const legendaLinha = Object.fromEntries(linhas.map(l => [l.slug, l.curto || l.nome]));
export const legendas = {
  'fabrica-1': 'O muro da Alumac na Rua Cuiabá, 230', 'fabrica-2': 'Entrada da fábrica, no número 230',
  'fabrica-3': 'Mesas de montagem da fábrica', 'fabrica-4': 'Bancadas e furadeira de coluna', 'fabrica-5': 'Portas prontas para entrega',
  'fabrica-6': 'Janelas montadas aguardando a instalação',
  'portoes-1': 'Portão de garagem com porta social e bandeirola', 'portoes-2': 'Dois portões de garagem com bandeirola',
  'portoes-3': 'Portão lambri com porta social', 'portoes-4': 'Portão liso em fachada revestida',
  'portoes-5': 'Portão de garagem liso', 'portoes-6': 'Portão com bandeirola e porta social ao lado',
  'portoes-7': 'Portão de duas folhas com bandeirola', 'portoes-8': 'Portão com ventilação superior', 'portoes-9': 'Portão com porta social embutida',
  'janelas-1': 'Janela de correr de 4 folhas com vidro verde', 'janelas-2': 'Fechamento de varanda com vidro verde',
  'janelas-3': 'Porta-janela de correr', 'janelas-4': 'Janela com vidro verde', 'janelas-5': 'Janela de correr para o jardim',
  'janelas-6': 'Janela de correr de 4 folhas', 'janelas-7': 'Porta-janela com grade integrada', 'janelas-8': 'Janela de fachada em balanço',
  'janelas-9': 'Janelas maxim-ar em fachada',
  'portas-1': 'Porta de vidro com quadro e lambri', 'portas-2': 'Porta de vidro para área de serviço', 'portas-3': 'Porta de vidro para a garagem',
  'portas-4': 'Porta de duas folhas com vidro', 'portas-5': 'Porta de entrada com puxador', 'portas-6': 'Porta lambri de entrada',
  'portas-7': 'Porta de entrada com visores', 'portas-8': 'Porta de vidro verde', 'portas-9': 'Janela e porta com visor',
  'grades-1': 'Grade projetada de janela', 'grades-2': 'Grades projetadas na fachada', 'grades-3': 'Grade de varanda',
  'grades-4': 'Porta de grade de duas folhas', 'grades-5': 'Grade de janela', 'grades-6': 'Portão e porta de grade',
  'grades-7': 'Porta de grade de entrada', 'grades-8': 'Porta de grade', 'grades-9': 'Grade com cobertura',
  'corrimaos-1': 'Rampa com corrimão', 'corrimaos-2': 'Guarda-corpo com vidro fumê', 'corrimaos-3': 'Guarda-corpo com vidro verde',
  'corrimaos-4': 'Cercado de piscina', 'corrimaos-5': 'Corrimão de escada com vidro', 'corrimaos-6': 'Corrimão de escada',
  'corrimaos-7': 'Guarda-corpo de varanda com vidro', 'corrimaos-8': 'Guarda-corpo de escada', 'corrimaos-9': 'Guarda-corpo de vidro na descida',
  'moveis-1': 'Guarda-roupa de alumínio com porta de vidro', 'moveis-2': 'Estante e home office em alumínio', 'moveis-3': 'Sapateira de tubos',
  'moveis-4': 'Armário de pia', 'moveis-5': 'Armário de cozinha em L', 'moveis-6': 'Armário de pia em L', 'moveis-7': 'Estante com bancada',
};
export const fotosDe = slug => Object.keys(tamanhos).filter(n => n.startsWith(slug + '-')).sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]));
export const legenda = n => legendas[n] || legendaLinha[n.split('-')[0]] || 'Alumac';
