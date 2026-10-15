// Textos do site da Reina Sementes. Tudo o que é da empresa vem do site atual (reinasementes.com),
// com os erros de digitação corrigidos. As descrições de cada etapa são explicações gerais do que a etapa é,
// sem número nem dado inventado. Telefone: o do Google Maps, (34) 3823-3004 (o site atual mostra (35) 3823-3444,
// mas o DDD de Patos de Minas é 34; confirmar com a empresa).

export const site = {
  nome: 'Reina Sementes',
  razao: 'Reina Sementes Ltda',
  cnpj: '20.057.786/0001-90',
  dominio: 'https://reina.overtus.com.br',
  fone: '(34) 3823-3004',
  foneHref: 'tel:+553438233004',
  endereco: 'Rodovia BR 365, km 414,7, Zona Rural',
  cidade: 'Patos de Minas (MG)',
  cep: '38709-899',
  mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.8631733749535!2d-46.54282632391743!3d-18.670134982452637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ae61e74b6f1885%3A0x63476e0b1633aac4!2sReina%20Sementes!5e0!3m2!1spt-BR!2sbr!4v1730488821903!5m2!1spt-BR!2sbr',
  rota: 'https://www.google.com/maps/dir/?api=1&destination=Reina+Sementes+Patos+de+Minas',
  sistema: 'http://sistema.reinasementes.com',
};

export const lema = 'Por trás de uma plantação de sucesso, há uma semente de qualidade.';

export const sobre = {
  intro: 'A Reina Sementes é uma empresa familiar, criada em 2014 para explorar as atividades econômicas de produção de sementes, classificação, tratamento industrial e prestação de serviços de armazenagem climatizada e convencional.',
  pilares: [
    { t: 'Família', ico: 'familia', p: 'Fruto da experiência e do ideal empreendedor de seus sócios, a Reina Sementes nasceu com o objetivo de aliar tradição e tecnologia nas atividades ligadas ao agronegócio.' },
    { t: 'Posição geográfica', ico: 'pin', p: 'A região do Alto Paranaíba é tradicional na produção de sementes: clima bem definido, altitude e topografia favorável. A Reina Sementes está às margens da BR 365, a 7 km de Patos de Minas, município que concentra vários campos de produção de soja e está posicionado para receber e escoar a produção de outros municípios da região, que também têm grandes produtores.' },
    { t: 'Qualidade', ico: 'coroa', p: 'Com alta tecnologia e um alto padrão de profissionais, temos em nosso currículo várias premiações pela qualidade dos serviços prestados e uma logística eficiente.' },
  ],
  fatos: [
    ['2014', 'empresa familiar fundada'],
    ['BR 365', 'km 414,7, às margens da rodovia'],
    ['7 km', 'de Patos de Minas (MG)'],
    ['Alto Paranaíba', 'região tradicional em sementes'],
  ],
};

export const beneficiamento = {
  intro: 'A empresa possui uma planta industrial nova, automatizada, com equipamentos que permitem um processamento adequado, preservando assim a qualidade da semente.',
  etapas: [
    { t: 'Amostragem', ico: 'lupa', p: 'Coleta de amostras da carga para conferir umidade, impurezas e as condições do lote antes da entrada.' },
    { t: 'Recebimento', ico: 'balanca', p: 'Pesagem e registro da carga, com a identificação do lote que acompanha a semente até a expedição.' },
    { t: 'Descarga', ico: 'moega', p: 'A carga é descarregada na moega e segue pelas correias e elevadores para dentro da planta.' },
    { t: 'Pré-limpeza', ico: 'peneira', p: 'Retirada de palha, terra e impurezas maiores antes da secagem.' },
    { t: 'Secagem', ico: 'secador', p: 'Ajuste da umidade da semente para conservar o vigor e a germinação no armazenamento.' },
    { t: 'Beneficiamento', ico: 'semente', p: 'Classificação da semente nos equipamentos automatizados da planta, separando o que vai virar semente de qualidade.' },
  ],
};

export const tratamento = {
  intro: 'Maior eficiência no controle de químicos para qualidade no tratamento de sementes.',
  itens: [
    { t: 'Aplicação individual dos produtos', ico: 'gota', p: 'Cada produto é aplicado separadamente, com dose controlada para cada lote.' },
    { t: 'Aplicação de pó secante', ico: 'po', p: 'Acabamento com pó secante para a semente tratada sair seca e fluir bem na plantadeira.' },
    { t: 'Equipamentos modernos e automatizados', ico: 'engrenagem', p: 'Equipamentos automatizados dão precisão e repetibilidade ao tratamento.' },
    { t: 'Tratamento em fluxo contínuo', ico: 'fluxo', p: 'A semente passa pelo tratamento em fluxo contínuo, sem interromper a linha.' },
  ],
};

export const armazenagem = {
  intro: 'Nossas instalações possuem modernos armazéns e silos, podendo oferecer as modalidades de armazenagem convencional e climatizada.',
  modos: [
    { t: 'Armazém convencional', ico: 'silo', itens: ['Silos metálicos', 'Silos de madeira ventilados', 'Termometria em todos os silos', 'Gestão de estoque (WMS)'] },
    { t: 'Armazém climatizado', ico: 'termometro', itens: ['Área de empilhamento', 'Controle de temperatura e umidade', 'Gestão de estoque (WMS)'] },
  ],
};

export const destaques = {
  intro: 'A Reina Sementes preza pela atualização constante de suas operações, sempre atenta a princípios básicos.',
  itens: [
    { t: 'Preocupação com saúde, segurança e meio ambiente (HSE)', ico: 'escudo' },
    { t: 'Qualidade de serviço', ico: 'coroa' },
    { t: 'Profissionais capacitados', ico: 'pessoas' },
  ],
};

// Fotos reais do site atual (public/assets/img).
export const fotos = [
  ['fachada', 'Fachada da sede da Reina Sementes com as bandeiras e o letreiro'],
  ['aerea-lavouras', 'Vista aérea da unidade da Reina Sementes entre lavouras, às margens da BR 365'],
  ['fachada-carretas', 'Carretas na frente do prédio da Reina Sementes'],
  ['equipe', 'Equipe da Reina Sementes dentro da planta de beneficiamento'],
  ['aerea-unidade', 'Vista aérea dos armazéns da Reina Sementes'],
  ['fachada-bandeiras', 'Entrada da Reina Sementes com o letreiro e as bandeiras'],
  ['portico-ceu', 'Pórtico de concreto da entrada da Reina Sementes'],
  ['reflexo', 'Acesso da unidade refletido na fachada de vidro'],
  ['portaria-chao', 'Portaria da Reina Sementes vista do chão'],
  ['acesso', 'Pista de acesso da unidade da Reina Sementes refletida no vidro'],
];
