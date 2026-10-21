// Dados da Fax Imobiliária: textos das páginas do site atual (faximobiliaria.com.br) e os 34 imóveis
// lidos de detalhes.php?imovel=N (imoveis-site-atual.json). Aqui só se limpa e organiza; nada inventado.
import fs from 'node:fs';
import path from 'node:path';

const dir = path.dirname(new URL(import.meta.url).pathname);
const bruto = JSON.parse(fs.readFileSync(path.join(dir, 'imoveis-site-atual.json'), 'utf8'));

export const empresa = {
  nome: 'Fax Imobiliária',
  url: 'https://faximobiliaria.overtus.com.br/',
  antigo: 'http://www.faximobiliaria.com.br/',
  slogan: 'Levando segurança e satisfação.',
  desde: 1992,
  creci: '651-J',
  tel: '(85) 3224-4445',
  telHref: '+558532244445',
  email: 'faleconosco@faximobiliaria.com.br',
  rua: 'Rua José Vilar, 1202',
  bairro: 'Aldeota',
  cidade: 'Fortaleza/CE',
  endereco: 'Rua José Vilar, 1202, Aldeota, Fortaleza/CE',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Jos%C3%A9+Vilar%2C+1202%2C+Aldeota%2C+Fortaleza+CE',
  mapaEmbed: 'https://maps.google.com/maps?q=Rua+Jos%C3%A9+Vilar,+1202+-+Aldeota,+Fortaleza+-+CE&z=15&output=embed',
  // Página "A empresa" do site atual
  sobre: [
    'A Fax Imobiliária é uma empresa de tradição no mercado imobiliário, atuando no setor de administração, venda de imóveis e consultoria imobiliária desde 1992.',
    'A Fax Imobiliária vem conquistando o mercado com os melhores serviços, buscando sempre atender às necessidades de seus clientes. Contamos hoje com uma equipe de agentes de locação, corretores e advogados altamente qualificados, que estão sempre prontos para servi-lo.',
    'Nossa empresa está sempre buscando acompanhar as evoluções do mercado, preparando sua equipe de colaboradores para apresentar aos seus clientes um serviço de qualidade, por meio de constante reciclagem profissional.',
    'Pensando assim, inauguramos em 2002 nova sede na Aldeota, em local estratégico, de fácil acesso e com amplo estacionamento, sempre com o intuito de atender melhor nosso cliente.',
  ],
  convite: 'Senhores proprietários, antes de alugar o seu imóvel venha nos fazer uma visita ou entre em contato conosco.',
  equipe: ['Agentes de locação', 'Corretores', 'Advogados'],
};

// Página "Serviços" do site atual, agrupada (o texto de cada item é o do site)
export const servicos = {
  proprietario: [
    'Aluguel garantido, com a melhor taxa de administração do mercado',
    'Pontualidade e garantia no pagamento ao proprietário conforme contrato de administração',
    'Solidez econômica e financeira do grupo',
    'Assistência jurídica gratuita para os proprietários em ações envolvendo o imóvel locado',
    'Seguro contra incêndio para cada imóvel locado, sem custos para o proprietário',
    'Laudo de vistoria inicial, parcial e final por conta da imobiliária',
  ],
  // Etapas da locação, na ordem em que acontecem (itens da página Serviços)
  etapas: [
    { t: 'Seleção do locatário', d: 'Clientes cadastrados, anúncios em jornais e outros, com informações por telefone, atendimento pessoal e acompanhamento dos interessados no imóvel.' },
    { t: 'Análise de cadastro', d: 'Locatário e fiador, com consulta em órgãos de informação de crédito (SPC e outros), além de consultas entre imobiliárias.' },
    { t: 'Seleção de fiadores', d: 'Conferência das garantias antes de qualquer assinatura.' },
    { t: 'Contrato de locação', d: 'Elaboração do contrato com apoio e acompanhamento jurídico, de acordo com a lei do inquilinato.' },
    { t: 'Vistoria detalhada', d: 'Vistoria do imóvel para fins de locação, acompanhada do futuro locatário.' },
    { t: 'Aluguel garantido', d: 'Pagamento pontual ao proprietário, conforme o contrato de administração.' },
  ],
  venda: [
    'Na venda de imóveis, temos a melhor avaliação',
    'Confecção de contrato de compra e venda sem custos',
    'Assistência gratuita de advogado',
  ],
  geral: [
    'Experiência, organização, qualidade e segurança na prestação dos nossos serviços',
    'Equipe de profissionais competentes e treinados',
  ],
};

// Página "Venda" do site atual
export const docsComprador = [
  'Título de escritura do imóvel devidamente registrada no cartório de registro de imóveis, constando a averbação da construção',
  'Carnê de IPTU do ano em exercício',
  'Certidão de propriedade com negativa de ônus (matrícula atualizada do registro de imóveis)',
  'Certidões dos cartórios de protestos',
  'Certidão da Justiça Federal',
  'Certidão de ações cíveis',
  'Certidão de executivos fiscais',
  'Certidão da Justiça do Trabalho',
  'Certidão da Prefeitura comprovando negativa de débito referente ao IPTU',
  'Certidão negativa de débitos condominiais (em caso de apartamento)',
];
export const notasComprador = [
  'Caso o vendedor seja casado, as certidões devem ser apresentadas pelo casal.',
  'Na hipótese de constar desabono em alguma das certidões, deverá ser apresentada a certidão de objeto e pé.',
];

// Página "Aluguel" do site atual
export const docsLocacao = {
  pf: [
    'Cópia da identidade e do CPF',
    'Cópia do comprovante de endereço (conta de água, luz ou telefone)',
    'Cópia de comprovante de renda (renda mínima de três vezes o valor do aluguel)',
    'Imóvel quitado em Fortaleza/CE, com registro e certidão atualizada em cartório',
  ],
  pj: [
    'Cópia do contrato social e aditivos da empresa, autenticados em cartório',
    'Cópia do cartão CNPJ autenticada em cartório',
    'Comprovante de renda atualizado e autenticado em cartório (IR)',
  ],
};

// ---------- Imóveis ----------
const semEmoji = s => s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B50}\u{2705}\u{2714}\u{2728}]/gu, '').replace(/\*\*/g, '').replace(/[ \t]+/g, ' ').trim();
const corrige = s => s
  .replace(/Imperdivel/gi, 'Imperdível').replace(/disponivel/gi, 'disponível').replace(/Otimo/g, 'Ótimo').replace(/otimo/g, 'ótimo')
  .replace(/Olávo/g, 'Olavo').replace(/Antonio Bezerra/g, 'Antônio Bezerra').replace(/Icarai/g, 'Icaraí').replace(/Euzébio/g, 'Eusébio');
const temMaiusculas = s => s.replace(/[^A-Za-zÀ-ú]/g, '').length > 8 && s === s.toUpperCase();
const frase = s => temMaiusculas(s) ? s.charAt(0) + s.slice(1).toLowerCase().replace(/ fortal\w*/g, ' Fortaleza') : s;
const limpa = s => corrige(frase(semEmoji(s))).replace(/\s+([!,.])/g, '$1').replace(/!{2,}/g, '!').replace(/^[-–—•\s]+/, '');
const num = s => Number(String(s).replace(/[^\d,]/g, '').replace(',', '.')) || 0;

const TIPOS = {
  'Apartamento residencial': ['Apartamento', 'apartamento'],
  'Casa residencial': ['Casa', 'casa'],
  'Casa em condomínio': ['Casa em condomínio', 'casa'],
  'Casa de praia': ['Casa de praia', 'casa'],
  'Casa comercial': ['Casa comercial', 'comercial'],
  'Kitinet': ['Kitnet', 'apartamento'],
  'Galpões': ['Galpão', 'comercial'],
  'Loja comercial': ['Loja', 'comercial'],
  'Ponto comercial': ['Ponto comercial', 'comercial'],
  'Prédio': ['Prédio', 'comercial'],
  'Sala comercial': ['Sala comercial', 'comercial'],
  'Sala': ['Sala comercial', 'comercial'],
  'Terreno': ['Terreno', 'terreno'],
  'Sítio': ['Sítio', 'terreno'],
};
export const CATS = [
  { k: 'apartamento', n: 'Apartamentos e kitnets' },
  { k: 'casa', n: 'Casas' },
  { k: 'comercial', n: 'Comerciais e prédios' },
  { k: 'terreno', n: 'Terrenos e sítios' },
];

function tipoDe(t) {
  const chave = Object.keys(TIPOS).find(k => t.toLowerCase().startsWith(k.toLowerCase()));
  if (chave) return TIPOS[chave];
  if (/kitnet|kitinet/i.test(t)) return ['Kitnet', 'apartamento'];
  if (/galp[aã]o/i.test(t)) return ['Galpão', 'comercial'];
  if (/pr[eé]dio/i.test(t)) return ['Prédio', 'comercial'];
  if (/ponto comercial/i.test(t)) return ['Ponto comercial', 'comercial'];
  if (/condom[ií]nio/i.test(t) && /casa/i.test(t)) return ['Casa em condomínio', 'casa'];
  if (/comercial/i.test(t)) return ['Imóvel comercial', 'comercial'];
  if (/apart/i.test(t)) return ['Apartamento', 'apartamento'];
  if (/casa/i.test(t)) return ['Casa', 'casa'];
  if (/terreno|lote/i.test(t)) return ['Terreno', 'terreno'];
  return [t, 'comercial'];
}

// Títulos que no site atual estão em caixa alta, genéricos ou com erro
const TITULOS = {
  1240: 'Sala no Edifício Jaucy Metrópole, Centro',
  1245: 'Prédio na Av. João Pessoa, Damas',
  1406: 'Apartamento no Meireles com vista para o mar',
  1408: 'Apartamento de 3 quartos no Papicu',
  1409: 'Kitnet para alugar na Maraponga',
  1410: 'Galpão de 596 m² na Av. Santos Dumont',
  1413: 'Loja comercial na Aldeota',
  1414: 'Casa semimobiliada no Bom Jardim',
  1416: 'Terreno com excelente potencial construtivo em Messejana',
  31: 'Casa tipo B na Cidade 2000',
  1417: 'Apartamento de 2 quartos à venda no Mondubim',
};

function paragrafos(txt) {
  return limpa(txt || '').split(/\n+/).map(l => l.replace(/^[-*•✔\s]+/, '').trim()).filter(l => l && l.length > 1);
}

export const imoveis = bruto.map(b => {
  const c = Object.fromEntries([]);
  const dados = [];
  let rotulo = '';
  const extra = {};
  for (const [r, v] of b.campos) {
    if (r) rotulo = r.replace(/:$/, '');
    if (!v) continue;
    if (rotulo === 'Dados do imóvel' && v.includes(':')) {
      const [k, ...x] = v.split(':'); dados.push([k.trim(), x.join(':').trim()]);
    } else if (rotulo === 'Localização' && !r) extra.local = v;
    else extra[rotulo] = (extra[rotulo] ? extra[rotulo] + '\n' : '') + v;
  }
  const D = Object.fromEntries(dados);
  const [bairroBruto, cidadeBruta] = (extra.local || '').split(' - ');
  const bairro = corrige(bairroBruto.trim());
  const cidade = corrige((cidadeBruta || 'Fortaleza').replace(/\/CE$/, '').trim());
  const [tipo, cat] = tipoDe(D['Tipo'] || b.titulo);
  const negocio = b.contrato;
  const preco = num(extra['Mensalidade'] || extra['Preço']);
  let titulo = TITULOS[b.id] || limpa(b.titulo);
  if (negocio === 'venda') titulo = titulo.replace(/para loca[cç][aã]o/i, 'à venda');
  return {
    id: Number(b.id), cod: b.id, negocio, tipo, cat, bairro, cidade,
    titulo, resumo: limpa(b.resumo),
    preco, precoTxt: 'R$ ' + preco.toLocaleString('pt-BR', { maximumFractionDigits: 0 }),
    quartos: num(D['Nº de quartos']), suites: num(D['Nº de suítes']), vagas: num(D['Vagas na garagem']),
    area: Math.round(num(D['Área'])), condicao: D['Condição'] || '',
    condominio: Math.round(Number((D['Condomínio'] || '').replace(/[^\d.]/g, '')) || 0), m2: num(D['Valor do m²']), entrega: extra['Previsão de entrega'] || '',
    desc: paragrafos(extra['Carac. do Imóvel']), empreend: paragrafos(extra['Carac. do Empreend.']), referencia: paragrafos(extra['Referência']),
    fotos: b.fotos,
  };
});

export const porId = Object.fromEntries(imoveis.map(i => [i.id, i]));
export const vendas = imoveis.filter(i => i.negocio === 'venda');
export const alugueis = imoveis.filter(i => i.negocio === 'aluguel');
export const cidades = [...new Set(imoveis.map(i => i.cidade))].sort((a, b) => (a === 'Fortaleza' ? -1 : b === 'Fortaleza' ? 1 : a.localeCompare(b, 'pt')));
export const bairros = [...new Set(imoveis.map(i => i.bairro))].sort((a, b) => a.localeCompare(b, 'pt'));
export const contaCat = k => imoveis.filter(i => i.cat === k).length;
export const contaCidade = c => imoveis.filter(i => i.cidade === c).length;

// Destaques escolhidos pelas melhores fotos da carteira
export const destaquesAluguel = [1406, 1407, 401, 1403, 1408, 1413].map(id => porId[id]);
export const destaquesVenda = [1426, 1425, 1412, 1437, 1418, 1414].map(id => porId[id]);

// Créditos das fotos de Fortaleza (Wikimedia Commons, licença CC BY-SA)
export const creditos = [
  { f: 'iracema', t: 'Praia de Iracema', a: 'Mayra Pavanello Munerato', l: 'CC BY-SA 3.0', u: 'https://commons.wikimedia.org/w/index.php?curid=40430828' },
  { f: 'beira-mar', t: 'Avenida Beira Mar', a: 'Joelkaula', l: 'CC BY-SA 4.0', u: 'https://commons.wikimedia.org/w/index.php?curid=173732561' },
  { f: 'aldeota', t: 'Aldeota', a: 'Claudio Oliveira Lima', l: 'CC BY-SA 3.0', u: 'https://commons.wikimedia.org/w/index.php?curid=60032771' },
  { f: 'por-do-sol', t: 'Beira Mar, Praia de Iracema', a: 'Joao Albuquerque', l: 'CC BY-SA 4.0', u: 'https://commons.wikimedia.org/w/index.php?curid=60157582' },
];
