// Conteúdo da Marmoraria Lonardi. Fatos (contatos, endereço, horário, lema, "desde 1928", as quatro linhas de trabalho e as fotos)
// vêm do site atual (marmorarialonardi.com.br, Wix). Legendas das fotos foram escritas por nós olhando cada foto.
export const empresa = {
  nome: 'Marmoraria Lonardi',
  url: 'https://marmorarialonardi.overtus.com.br/',
  antigo: 'http://marmorarialonardi.com.br/',
  desde: 1928,
  lema: ['Qualidade', 'Agilidade', 'Tradição'],
  endereco: 'Av. Professor Oscar Pereira, 198A',
  cidade: 'Porto Alegre, RS',
  fone: '(51) 3398-6098',
  foneHref: '+555133986098',
  whats: '(51) 99907-6743',
  wa: '5551999076743',
  email: 'marmorarialonardi@gmail.com',
  horario: ['Segunda a sexta-feira', 'das 9h às 12h e das 13h30 às 17h30'],
  mapa: 'https://www.google.com/maps?q=Av.+Professor+Oscar+Pereira,+198A,+Porto+Alegre,+RS&output=embed',
  rota: 'https://www.google.com/maps/dir/?api=1&destination=Av.+Professor+Oscar+Pereira,+198A,+Porto+Alegre,+RS',
};

// [arquivo, legenda, largura, altura]
export const fotos = {
  lavatorios: [
    ['lavatorio-01', 'Lavatório suspenso em mármore branco, com cuba embutida e frontão', 1600, 1200],
    ['lavatorio-03', 'Bancada em mármore claro com cuba de apoio retangular', 665, 645],
    ['lavatorio-05', 'Bancada de canto em granito bege com cuba de apoio', 503, 450],
    ['lavatorio-04', 'Bancada em granito escuro com cuba oval embutida', 1032, 581],
    ['lavatorio-02', 'Bancada em granito claro com cuba de apoio redonda', 720, 1280],
  ],
  pias: [
    ['pia-01', 'Cozinha em L em granito amarelo, com frontão e cuba dupla', 1600, 1200],
    ['pia-07', 'Bancada em L em granito preto', 1032, 774],
    ['pia-04', 'Cozinha em granito cinza claro, de parede a parede', 1040, 780],
    ['pia-06', 'Granito preto com península para refeições', 1032, 774],
    ['pia-09', 'Bancada em granito marrom com cuba e cooktop embutidos', 1032, 581],
    ['pia-02', 'Bancada em granito preto com cooktop', 960, 1280],
    ['pia-08', 'Cozinha em granito amarelo com cuba dupla', 640, 480],
    ['pia-03', 'Bancada em granito claro em cozinha estreita', 960, 1280],
    ['pia-05', 'Bancada em granito cinza com cooktop', 581, 1032],
    ['pia-10', 'Bancada em granito claro com cuba de inox', 960, 1280],
  ],
  lapides: [
    ['lapide-04', 'Lápide em mármore bege com moldura dupla, porta-flores e assinatura Lonardi', 1600, 1256],
    ['lapide-13', 'Lápide dupla em mármore bege com floreira', 1280, 846],
    ['lapide-11', 'Lápide em granito preto com letras gravadas', 442, 305],
    ['lapide-02', 'Lápide em granito cinza com foto e frase', 1032, 581],
    ['lapide-06', 'Lápide em mármore branco com crucifixo', 727, 485],
    ['lapide-09', 'Lápide em mármore branco com frase em destaque', 783, 518],
    ['lapide-01', 'Lápide em granito claro com floreira "Saudades eternas"', 640, 480],
    ['lapide-03', 'Lápide em granito preto com frase manuscrita', 821, 508],
    ['lapide-05', 'Lápide em granito marrom', 862, 434],
    ['lapide-07', 'Lápide em granito cinza', 1032, 581],
    ['lapide-08', 'Lápide em mármore branco com porta-vasos', 712, 486],
    ['lapide-10', 'Lápide em mármore branco com letras em bronze', 752, 549],
    ['lapide-12', 'Lápide em mármore bege com vidro', 1600, 900],
    ['lapide-14', 'Par de lápides em mármore bege', 1280, 720],
    ['lapide-15', 'Lápide em granito claro com floreira', 640, 480],
    ['lapide-16', 'Lápide em granito claro com floreira "Gratidão e amor eterno"', 640, 480],
  ],
  tumulos: [
    ['tumulo-02', 'Túmulo em granito preto polido', 1500, 843],
    ['tumulo-01', 'Túmulo em granito rosado com cabeceira', 1600, 1200],
    ['tumulo-03', 'Túmulo em granito escuro com tampa em degrau', 587, 558],
  ],
};

export const linhas = [
  { slug: 'banheiros', chave: 'lavatorios', nome: 'Lavatórios', curto: 'Lavatórios e bancadas de banheiro', capa: 'lavatorio-01', grupo: 'casa',
    texto: 'Bancadas de banheiro e lavatórios suspensos em mármore e granito, para cuba de embutir ou de apoio, cortados na medida do seu espaço.' },
  { slug: 'cozinhas', chave: 'pias', nome: 'Pias', curto: 'Pias e bancadas de cozinha', capa: 'pia-01', grupo: 'casa',
    texto: 'Pias, bancadas em L, penínsulas e frontões em granito, com recortes para cuba, cooktop e torneira feitos na marmoraria.' },
  { slug: 'lapides', chave: 'lapides', nome: 'Lápides', curto: 'Lápides e placas', capa: 'lapide-04', grupo: 'memoria',
    texto: 'Lápides em mármore e granito com nome, datas, frase, foto e símbolos, com moldura, floreira ou porta-vasos.' },
  { slug: 'tumulos', chave: 'tumulos', nome: 'Túmulos', curto: 'Túmulos e revestimentos', capa: 'tumulo-02', grupo: 'memoria',
    texto: 'Túmulos e tampas em granito polido, com cabeceira ou em degrau, feitos e instalados pela equipe da Lonardi.' },
];

// Pedras que aparecem nas fotos do site atual (nomes genéricos; os nomes comerciais ficam para o cliente confirmar).
export const pedras = [
  { id: 'granito-cinza', nome: 'Granito cinza', tom: 'claro', fotos: ['lapide-02', 'pia-04', 'pia-05'] },
  { id: 'granito-preto', nome: 'Granito preto', tom: 'escuro', fotos: ['lapide-11', 'tumulo-02', 'pia-07'] },
  { id: 'marmore-branco', nome: 'Mármore branco', tom: 'claro', fotos: ['lapide-06', 'lavatorio-01', 'lapide-09'] },
  { id: 'marmore-bege', nome: 'Mármore bege', tom: 'claro', fotos: ['lapide-04', 'lapide-13', 'lapide-14'] },
];

// Frases lidas nas lápides das fotos do site atual.
export const frases = ['Saudades eternas', 'Eterno em nossos corações', 'Saudades de teus filhos', 'Descanse em paz', 'Amor eterno dos seus filhos e netos', 'Gratidão e amor eterno', 'Saudades'];

// Escrito por nós (a confirmar com o cliente).
export const passos = [
  { t: 'Mande as medidas', d: 'Uma foto do local e as medidas pelo WhatsApp já bastam para o primeiro orçamento.' },
  { t: 'Escolha a pedra', d: 'Granito ou mármore, na cor e no acabamento que combinam com o ambiente.' },
  { t: 'Corte e acabamento', d: 'A peça é cortada, recortada para cuba e cooktop e polida na marmoraria.' },
  { t: 'Instalação', d: 'A equipe da Lonardi entrega e instala na sua casa ou no cemitério.' },
];

export const valores = [
  { t: 'Qualidade', d: 'Pedra escolhida chapa por chapa, polimento caprichado e acabamento nos cantos e recortes.' },
  { t: 'Agilidade', d: 'Orçamento rápido pelo WhatsApp e prazo combinado desde o primeiro contato.' },
  { t: 'Tradição', d: `Uma marmoraria de Porto Alegre que trabalha a pedra desde ${empresa.desde}.` },
];
