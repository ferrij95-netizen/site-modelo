// Textos e dados da Transpérola Transportes Rodoviários.
// Fontes: site atual (transperola.com.br: empresa, atuação, tecnologia, qualidade, contato e a lista de cidades)
// e a apresentação comercial deles em PDF (heyzine, out/2026): trajetória, filiais, áreas, prazos, frota, responsabilidade social.
// Títulos e frases de ligação foram escritos por nós.
import fs from 'node:fs';

export const empresa = {
  nome: 'Transpérola',
  razao: 'Transpérola Transportes Rodoviários Ltda.',
  slogan: 'Transportando o futuro',
  url: 'https://transperola.overtus.com.br/',
  antigo: 'https://www.transperola.com.br/',
  fone: '(11) 2431-5651', foneHref: '+551124315651',
  fax: '(11) 2432-5480',
  wa: '551124315651',
  horario: 'Segunda a sexta, das 8h às 18h',
  email: 'sac@transperola.com.br',
  endereco: ['Av. Papa João Paulo I, 1.795', 'Vila Aeroporto · Guarulhos/SP', 'CEP 07170-350'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Transp%C3%A9rola+Av.+Papa+Jo%C3%A3o+Paulo+I+1795+Guarulhos',
  mapaEmbed: 'https://www.google.com/maps?q=Av.+Papa+Jo%C3%A3o+Paulo+I,+1795,+Guarulhos,+SP&z=15&output=embed',
  facebook: 'https://www.facebook.com/TransperolaTransportesRodoviariosLtda',
  // serviços online que continuam no site atual (formulários e portal de rastreio)
  portal: 'https://www.transperola.com.br/portal.php',
  formColeta: 'https://www.transperola.com.br/nova_coleta.php',
  formCotacao: 'https://www.transperola.com.br/cotacao.php',
  apresentacao: 'https://www.transperola.com.br/apresentacao.php',
  nota: '4,3', avaliacoes: 519,
};

// Números da apresentação comercial.
export const numeros = [
  { n: '1973', t: 'ano de fundação' },
  { n: '11', t: 'unidades próprias' },
  { n: '130', t: 'cidades atendidas' },
  { n: '50', t: 'veículos de frota própria' },
  { n: '+200', t: 'parceiros homologados' },
  { n: '+50 mil m²', t: 'de terrenos próprios' },
];

export const historia = [
  'A Transpérola Transportes Rodoviários Ltda foi fundada em 1973, tendo a origem de seu nome inspirada na cidade de Birigui, estado de São Paulo, considerada a pérola do noroeste paulista e cidade natal dos fundadores.',
  'Os dois primeiros veículos da frota foram da marca Mercedes-Benz, modelos LP 321, ano 1964, e 1111, ano 1969.',
  'A matriz está localizada em Guarulhos/SP, cobrindo mais de cem localidades, com estrutura própria em Rio Branco/AC, Londrina/PR, Maringá/PR, Ariquemes/RO, Cacoal/RO, Ji-Paraná/RO, Guajará-Mirim/RO, Porto Velho/RO, Vilhena/RO e Birigui/SP.',
];

export const trajetoria = [
  { ano: '1964', t: 'Primeiro caminhão', d: 'Um Mercedes-Benz LP 321 abre a frota.' },
  { ano: '1973', t: 'Fundação', d: 'Em Birigui/SP, a "pérola do noroeste paulista".' },
  { ano: '1975', t: 'Marca Transpérola', d: 'Filial na capital paulista.' },
  { ano: '1994', t: 'Nova sede em Guarulhos', d: 'E o início das operações no Acre.' },
  { ano: '1996', t: 'Expansão no Paraná', d: 'Filiais em Londrina e Maringá.' },
  { ano: 'Hoje', t: 'SP · PR · RO · AC', d: 'Mais de 50 anos ligando o Sudeste e o Sul ao Norte.' },
];

export const valores = [
  { t: 'Rapidez e eficácia', d: 'Cumprimento rigoroso de prazos e metas.' },
  { t: 'Segurança total', d: 'Tranquilidade e integridade da carga.' },
  { t: 'Foco no cliente', d: 'Prioridade na satisfação e no atendimento.' },
  { t: 'Inovação e ética', d: 'Olhar para o futuro com responsabilidade.' },
];

// Frota (apresentação, "Capacidade operacional").
export const frota = {
  coleta: [{ n: 17, t: 'Tocos', d: 'Distribuição urbana' }, { n: 5, t: "VUC's", d: 'Veículo urbano de carga' }, { n: 3, t: 'Trucks', d: 'Cargas médias' }],
  estrada: [{ n: 25, t: 'Carretas sider', d: 'Carga fracionada' }],
  parceiros: [{ n: 100, t: 'Carretas' }, { n: 100, t: 'Trucks' }],
};

export const tecnologia = [
  { t: 'Rastreamento 24 horas', d: 'Todos os caminhões, de estrada e de coleta, têm tecnologia Trucks Control e são monitorados via satélite pela Opentech.' },
  { t: 'Seguro da carga', d: 'Apólices RCF-DC e RCTR-C de R$ 1,5 milhão cada, pela Mapfre Seguros.' },
  { t: 'Motorista em contato', d: 'A comunicação entre motoristas, matriz e filiais é feita por celular, acompanhando coletas, entregas e viagens.' },
  { t: 'Informação pela internet e EDI', d: 'Posição da carga pela web, no portal do cliente, e por EDI (troca eletrônica de dados).' },
];

// As 11 unidades (apresentação comercial). prazo: [capital, interior] em dias úteis a partir da saída da carga.
export const filiais = [
  { id: 'guarulhos', cidade: 'Guarulhos', uf: 'SP', tipo: 'Matriz', grupo: 'sudeste', end: 'Av. Papa João Paulo I, 1.795 · Vila Aeroporto', cep: '07170-350',
    fone: '(11) 2431-5651', wa: '(11) 99498-4402', email: 'sac@transperola.com.br', terreno: '10.000', construcao: '4.200', km: 0 },
  { id: 'birigui', cidade: 'Birigui', uf: 'SP', tipo: 'Filial', grupo: 'sudeste', end: 'Rua Manoel Segundo Celice, 330 · Res. Jd. Trevo', cep: '16201-263',
    fone: '(18) 3213-0471', wa: '(18) 99180-9402', email: 'birigui@transperola.com.br', terreno: '1.000', construcao: '749', km: 540, prazo: [2, 4] },
  { id: 'londrina', cidade: 'Londrina', uf: 'PR', tipo: 'Filial', grupo: 'sul', end: 'Rua das Indústrias, 435 · Jd. Cidadela', cep: '86072-100',
    fone: '(43) 3342-4343', wa: '(43) 99838-0125', email: 'londrina@transperola.com.br', terreno: '3.444', construcao: '1.000', km: 536, prazo: [2, 5] },
  { id: 'maringa', cidade: 'Maringá', uf: 'PR', tipo: 'Filial', grupo: 'sul', end: 'Rua Pioneiro Bonifácio Rosa, 570 · Pq. Industrial, Zona 22', cep: '87062-400',
    fone: '(44) 3100-0020', wa: '(44) 9158-0020', email: 'maringa@transperola.com.br', terreno: '4.519', construcao: '1.500', km: 634, prazo: [2, 5] },
  { id: 'vilhena', cidade: 'Vilhena', uf: 'RO', tipo: 'Filial', grupo: 'norte', end: 'Av. Marechal Rondon, 5.470 · 5º BEC', cep: '76988-034',
    fone: '(69) 3321-2490', wa: '(69) 3321-2490', email: 'vilhena@transperola.com.br', terreno: '2.400', construcao: '860', km: 2503, prazo: [8, 10] },
  { id: 'cacoal', cidade: 'Cacoal', uf: 'RO', tipo: 'Filial', grupo: 'norte', end: 'Av. Castelo Branco, 18.223 · Centro', cep: '78975-000',
    fone: '(69) 3441-2537', wa: '(69) 3441-2537', email: 'cacoal@transperola.com.br', terreno: '6.000', construcao: '1.140', km: 2718, prazo: [8, 10] },
  { id: 'jiparana', cidade: 'Ji-Paraná', uf: 'RO', tipo: 'Filial', grupo: 'norte', end: 'Av. Transcontinental, 3.640 · Jd. Flórida', cep: '76914-640',
    fone: '(69) 3421-2125', wa: '(69) 3421-2125', email: 'ji-parana@transperola.com.br', terreno: '5.000', construcao: '2.870', km: 2817, prazo: [8, 10] },
  { id: 'ariquemes', cidade: 'Ariquemes', uf: 'RO', tipo: 'Filial', grupo: 'norte', end: 'Rodovia BR-364, km 514, Lote 2, Qd. 2, nº 2.656 · Jd. Industrial Jamari', cep: '76877-221',
    fone: '(69) 3535-3040', wa: '(69) 99289-7880', email: 'ariquemes@transperola.com.br', terreno: '6.600', construcao: '1.080', km: 3014, prazo: [8, 10] },
  { id: 'portovelho', cidade: 'Porto Velho', uf: 'RO', tipo: 'Filial', grupo: 'norte', end: 'Rua da Beira, 6.340 · Jd. Eldorado', cep: '76806-130',
    fone: '(69) 3227-3083', wa: '(69) 3227-3083', email: 'portovelho@transperola.com.br', terreno: '5.000', construcao: '2.900', km: 3174, prazo: [8, 10] },
  { id: 'guajaramirim', cidade: 'Guajará-Mirim', uf: 'RO', tipo: 'Filial', grupo: 'norte', end: 'Av. Marechal Deodoro, 460 · Centro', cep: '78957-000',
    fone: '(69) 3227-3083', wa: '(69) 3227-3083', email: 'guajaramirim@transperola.com.br', terreno: '800', construcao: '800', km: 3524, prazo: [11, 17] },
  { id: 'riobranco', cidade: 'Rio Branco', uf: 'AC', tipo: 'Filial', grupo: 'norte', end: 'Via Chico Mendes, 2.882-B · Triângulo Novo', cep: '69906-302',
    fone: '(68) 3221-5000', wa: '(68) 3221-5000', email: 'riobranco@transperola.com.br', terreno: '5.000', construcao: '1.800', km: 3696, prazo: [12, 15],
    nota: 'Cidades de difícil acesso no Acre: 30 dias por terra (Cruzeiro do Sul, Feijó, Tarauacá e outras) e 40 dias por via aérea ou fluvial a partir de Cruzeiro do Sul (Jordão, Porto Walter, Marechal Thaumaturgo, Santa Rosa do Purus), com frete à vista.' },
];

export const estados = [
  { uf: 'SP', nome: 'São Paulo', papel: 'Matriz e operações', cobertura: 'parcial' },
  { uf: 'PR', nome: 'Paraná', papel: 'Hub Sul', cobertura: 'parcial' },
  { uf: 'RO', nome: 'Rondônia', papel: 'Ampla cobertura', cobertura: 'todo' },
  { uf: 'AC', nome: 'Acre', papel: 'Hub Norte', cobertura: 'todo' },
];

// Lista de cidades atendidas do site atual (cidade, UF, filial que atende).
export const cidades = JSON.parse(fs.readFileSync(new URL('./cidades.json', import.meta.url), 'utf8'))
  .map(([nome, uf, filial]) => ({ nome, uf, filial }));

export const mapa = JSON.parse(fs.readFileSync(new URL('./mapa.json', import.meta.url), 'utf8'));

// E-mails por departamento (página Fale Conosco do site atual).
export const departamentos = [
  ['Departamento comercial', 'castro@transperola.com.br'],
  ['Coletas e informações sobre coletas', 'coleta@transperola.com.br'],
  ['Orçamentos', 'fabiano@transperola.com.br'],
  ['Posição de mercadoria', 'expedicao@transperola.com.br'],
  ['Datas de entrega (frete CIF)', 'atendimento@transperola.com.br'],
  ['SAC e devoluções', 'sac@transperola.com.br'],
  ['Pendências', 'pendencia.sp@transperola.com.br'],
  ['Faturamento', 'cobranca@transperola.com.br'],
  ['Departamento financeiro', 'financeiro@transperola.com.br'],
  ['Departamento de RH', 'rh@transperola.com.br'],
];

export const social = {
  texto: 'A Transpérola vai além do transporte de cargas: leva de graça equipamentos, remédios e alimentos arrecadados de São Paulo até Porto Velho.',
  texto2: 'Apoia a NAPRA (Núcleo de Apoio à População Ribeirinha da Amazônia) e os Doutores Sem Fronteiras, facilitando ações de saúde, educação e desenvolvimento sustentável para comunidades em Rondônia e na Amazônia.',
};

export const qualidade = [
  'A Transpérola está constantemente investindo em treinamento, capacitação e tecnologia visando aprimorar a qualidade dos seus serviços, garantindo eficiência, confiabilidade, prazos de entrega e baixo índice de avarias.',
  'A empresa está capacitada e registrada para o transporte de produtos químicos, contando com pessoal qualificado e equipamentos necessários para o transporte seguro destes produtos.',
  'A qualidade dos serviços de transporte da Transpérola é atestada pelos prêmios recebidos, como o troféu Ouro da Amanco.',
];

export const fotos = {
  'cavalo-vermelho': ['Cavalo mecânico vermelho com carreta sider amarela da Transpérola', 536, 542],
  'sider-ceu': ['Carreta sider amarela com as faixas azuis da Transpérola', 654, 542],
  reflexo: ['Carreta da Transpérola refletida numa poça na beira da estrada', 526, 542],
  'noite-chuva': ['Carreta da Transpérola na estrada à noite, com chuva', 1536, 1024],
  doca: ['Carreta amarela da Transpérola na doca, com o logo no galpão', 633, 730],
  galpao: ['Galpão da Transpérola com caminhões de coleta encostados', 747, 1024],
  napra: ['Voluntários de ação na Amazônia apoiada pela Transpérola', 996, 1150],
  'matriz-arte': ['Carreta da Transpérola sobre foto de Guarulhos', 946, 494],
  bitrem: ['Bitrem da Transpérola', 560, 183],
  'frota-toco': ['Caminhões de coleta da Transpérola', 560, 190],
  premio: ['Troféu Ouro recebido da Amanco', 270, 214],
  estrada: ['Estrada', 630, 271],
};
