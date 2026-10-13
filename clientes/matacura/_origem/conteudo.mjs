// Textos e dados do site da Matacura, tirados do site atual (matacura.com.br) em 2026-10-13.
// Fichas dos produtos (indicação, ativos, modo de usar, precauções, licença) em dados-produtos.json; empresa, contato e representantes em dados-empresa.json.
// Depois de mudar qualquer coisa aqui: node clientes/matacura/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ler = f => JSON.parse(fs.readFileSync(path.join(aqui, f), 'utf8'));
const fichas = ler('dados-produtos.json');
const empresa = ler('dados-empresa.json');
const cores = ler('cores.json');

export const site = {
  nome: 'Matacura',
  razao: 'Agro Industrial Catarinense Ltda',
  dominio: 'https://matacura.overtus.com.br',
  antigo: 'https://www.matacura.com.br/',
  fone: '(49) 3622-0090',
  foneHref: '+554936220090',
  sac0800: '0800 642 2905',
  sac0800Href: '08006422905',
  zap: 'https://api.whatsapp.com/send?phone=554936220090',
  email: 'atendimento@matacura.com.br',
  endereco: 'Rua Oiapoc, 1085, Bairro Agostini',
  cidade: 'São Miguel do Oeste, SC',
  cep: '89900-000',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Oiapoc+1085+Agostini+S%C3%A3o+Miguel+do+Oeste+SC',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Oiapoc+1085+Agostini+S%C3%A3o+Miguel+do+Oeste+SC&output=embed',
  catalogo: 'https://drive.google.com/file/d/1uWbJbgC_aLzpTJ1TbF7f0QwsJACOyxRP/view?usp=drive_link',
  video: 'hg65tq9aQIA',
  rt: 'Dr. Eduardo Dillenburg Zanette, CRF/SC 1901',
  redes: [
    ['Instagram', 'https://www.instagram.com/matacuraoficial/'],
    ['Facebook', 'http://facebook.com/matacuraoficial'],
    ['YouTube', 'https://www.youtube.com/channel/UCFXMMcg22UzAurl4FcnlShg'],
    ['LinkedIn', 'https://www.linkedin.com/company/aicveterinaria'],
  ],
  slogan: 'Os momentos com seu pet têm nossa marca!',
};

export const menu = [['produtos', 'Produtos'], ['empresa', 'Empresa'], ['representantes', 'Representantes'], ['contato', 'Contato']];

// Linhas, na ordem da home do site atual. Assinaturas tiradas dos logos de cada linha.
export const linhas = [
  { id: 'classicos', nome: 'Clássicos desde 1945', marca: 'Matacura', assinatura: 'Cuidado que passa de geração em geração.', cor: '#fdd011',
    texto: 'Os produtos que fizeram o nome da Matacura: sarnicidas, antipulgas e antissépticos em shampoo, condicionador, aerossol e sabonete, com a eficácia comprovada desde o primeiro registro, em 1945.' },
  { id: 'pet-moments', nome: 'Pet Moments', marca: 'Matacura', assinatura: 'Tem cuidado em todo momento.', cor: '#5de3cf',
    texto: 'Higiene e bem-estar para o dia a dia: shampoos neutro, hidratante e hipoalergênico e a linha de banho a seco em talco e spray, para cães e gatos.' },
  { id: 'cao-fiel', nome: 'Cão Fiel', marca: 'Cão Fiel', assinatura: 'Ectoparasiticidas para uso diário.', cor: '#ee1a24',
    texto: 'Linha de ectoparasiticidas lançada em 1999, com shampoo e sabonete sarnicida e antipulgas para cães.' },
  { id: 'saralogo', nome: 'Saralogo', marca: 'Saralogo', assinatura: 'Antisséptica e cicatrizante.', cor: '#e8c80e',
    texto: 'Pomada antisséptica e cicatrizante para cães e gatos, registrada em 1974 e fabricada até hoje.' },
];

// Necessidades: atalhos do catálogo (filtram pelas etiquetas dos produtos).
export const necessidades = [
  { id: 'sarna-pulgas', nome: 'Sarna e pulgas', ico: 'escudo', texto: 'Sarnicidas e antipulgas com permetrina e benzoato de benzila.' },
  { id: 'dia-a-dia', nome: 'Banho do dia a dia', ico: 'bolha', texto: 'Shampoos neutro e hidratante para banhos frequentes.' },
  { id: 'banho-seco', nome: 'Banho a seco', ico: 'vento', texto: 'Talcos e sprays que limpam sem água, entre um banho e outro.' },
  { id: 'pele-sensivel', nome: 'Pele sensível', ico: 'coracao', texto: 'Fórmulas hipoalergênicas, suaves e de pH neutro.' },
  { id: 'antisseptico', nome: 'Antissépticos', ico: 'gota', texto: 'Ação antisséptica para auxiliar nas afecções da pele.' },
  { id: 'feridas', nome: 'Feridas', ico: 'curativo', texto: 'Pomada cicatrizante e antisséptica.' },
  { id: 'gatos', nome: 'Para gatos', ico: 'gato', texto: 'Produtos feitos para a pele e o pelo dos felinos.' },
];

// Dados de vitrine de cada produto. url = página do produto no site atual (liga com a ficha).
const vitrine = [
  { slug: 'shampoo-sarnicida-antipulgas', url: 'matacura-shampoo-matacura-sarnicida-e-antipulgas-200ml', linha: 'classicos', tipo: 'Shampoo', curto: 'Shampoo Sarnicida e Antipulgas', conteudo: '200 ml',
    foto: 'p-shampoo-sarnicida', foto2: 'p-shampoo-sarnicida-ant', para: ['caes'], tags: ['sarna-pulgas'], nova: true, destaque: 'Seu cão livre de sarnas e pulgas.',
    resumo: 'Controle das pulgas e tratamento da sarna, com higiene e condicionamento de todos os tipos de pelo.' },
  { slug: 'condicionador-sarnicida', url: 'matacura-condicionador-matacura-sarnicida-200ml', linha: 'classicos', tipo: 'Condicionador', curto: 'Condicionador Sarnicida', conteudo: '200 ml',
    foto: 'p-condicionador-sarnicida', foto2: 'p-condicionador-sarnicida-ant', para: ['caes'], tags: ['sarna-pulgas'], nova: true,
    resumo: 'Tratamento da sarna e controle das pulgas, deixando os pelos macios e brilhantes.' },
  { slug: 'antipulgas-para-gatos', url: 'matacura-shampoo-e-condicionador-matacura-antipulgas-para-gatos-200ml', linha: 'classicos', tipo: 'Shampoo e condicionador', curto: 'Antipulgas para Gatos', conteudo: '200 ml',
    foto: 'p-antipulgas-gatos', para: ['gatos', 'caes'], tags: ['sarna-pulgas', 'gatos'],
    resumo: 'Combate as pulgas dos gatos e deixa os pelos macios, brilhosos e volumosos. Pode ser usado em cães.' },
  { slug: 'shampoo-antisseptico', url: 'matacura-shampoo-matacura-antisseptico-200ml', linha: 'classicos', tipo: 'Shampoo', curto: 'Shampoo Antisséptico', conteudo: '200 ml',
    foto: 'p-shampoo-antisseptico', para: ['caes', 'gatos'], tags: ['antisseptico'],
    resumo: 'Higiene para todos os tipos de pelagem, com ação antisséptica que auxilia nas afecções da pele.' },
  { slug: 'aerossol-sarnicida', url: 'matacura-aerossol-matacura-sarnicida-100ml', linha: 'classicos', tipo: 'Aerossol', curto: 'Aerossol Sarnicida', conteudo: '100 ml / 55 g',
    foto: 'p-aerossol-sarnicida', foto2: 'p-aerossol-sarnicida-ant', para: ['caes', 'gatos'], tags: ['sarna-pulgas'], nova: true,
    resumo: 'Tratamento das sarnas provocadas pelo ácaro Sarcoptes scabiei em cães e gatos.' },
  { slug: 'sabonete-sarnicida-antipulgas', url: 'matacura-sabonete-matacura-sarnicida-e-antipulgas-80g', linha: 'classicos', tipo: 'Sabonete', curto: 'Sabonete Sarnicida e Antipulgas', conteudo: '80 g',
    foto: 'p-sabonete-sarnicida', para: ['caes'], tags: ['sarna-pulgas'], caixa: true, destaque: 'O produto que começou tudo, registrado em 1945.',
    resumo: 'Controle de pulgas e da sarna sarcóptica em cães adultos, deixando o pelo limpo e perfumado.' },
  { slug: 'sabonete-antisseptico', url: 'matacura-sabonete-matacura-antisseptico-90g', linha: 'classicos', tipo: 'Sabonete', curto: 'Sabonete Antisséptico', conteudo: '90 g',
    foto: 'p-sabonete-antisseptico', para: ['caes', 'gatos'], tags: ['antisseptico'], caixa: true,
    resumo: 'Sabonete cremoso e suave, com ação antisséptica e desodorizante para cães e gatos.' },
  { slug: 'horse-shampoo-antisseptico', url: 'matacura-shampoo-matacura-horse-antisseptico-1000ml', linha: 'classicos', tipo: 'Shampoo', curto: 'Horse Shampoo Antisséptico', conteudo: '1 L e 5 L',
    foto: 'p-horse', para: ['cavalos'], tags: ['antisseptico'],
    resumo: 'Higiene, condicionamento e assepsia da pelagem de cavalos.' },
  { slug: 'talco-banho-seco-caes-e-gatos', url: 'pet-moments-talco-banho-seco-matacura-caes-e-gatos-100g', linha: 'pet-moments', tipo: 'Talco banho seco', curto: 'Talco Banho Seco Cães e Gatos', conteudo: '100 g',
    foto: 'p-talco-caes-gatos', para: ['caes', 'gatos'], tags: ['banho-seco'],
    resumo: 'Pet limpo e cheiroso nos dias frios, em viagens ou entre um banho e outro.' },
  { slug: 'shampoo-neutro', url: 'pet-moments-shampoo-matacura-neutro-200ml', linha: 'pet-moments', tipo: 'Shampoo', curto: 'Shampoo Neutro', conteudo: '200 ml',
    foto: 'p-shampoo-neutro', foto2: 'p-shampoo-neutro-ant', para: ['caes', 'gatos'], tags: ['dia-a-dia'], nova: true,
    resumo: 'Banho e higiene frequente da pelagem, deixando pele e pelos macios e levemente perfumados.' },
  { slug: 'talco-banho-seco-hipoalergenico', url: 'pet-moments-talco-banho-seco-hipoalergenico-100g', linha: 'pet-moments', tipo: 'Talco banho seco', curto: 'Talco Banho Seco Hipoalergênico', conteudo: '100 g',
    foto: 'p-talco-hipoalergenico', para: ['caes', 'gatos'], tags: ['banho-seco', 'pele-sensivel'],
    resumo: 'Higiene sem água para peles sensíveis, com controle da umidade e da oleosidade.' },
  { slug: 'shampoo-condicionador-hipoalergenico', url: 'pet-moments-shampoo-e-condicionador-hipoalergenico-matacura-200ml', linha: 'pet-moments', tipo: 'Shampoo e condicionador', curto: 'Shampoo e Condicionador Hipoalergênico', conteudo: '200 ml',
    foto: 'p-hipoalergenico', foto2: 'p-hipoalergenico-ant', para: ['caes', 'gatos'], tags: ['pele-sensivel', 'dia-a-dia'], nova: true,
    resumo: 'Fórmula suave, de pH neutro e essência livre de alergênicos, para pele sensível.' },
  { slug: 'spray-banho-seco-hipoalergenico', url: 'pet-moments-spray-banho-seco-hipoalergenico-200ml', linha: 'pet-moments', tipo: 'Spray banho seco', curto: 'Spray Banho Seco Hipoalergênico', conteudo: '200 ml',
    foto: 'p-spray-hipoalergenico', para: ['caes', 'gatos'], tags: ['banho-seco', 'pele-sensivel'],
    resumo: 'Higiene prática e sem enxágue, com ativos suaves que respeitam a pele sensível.' },
  { slug: 'talco-banho-seco-gatos', url: 'pet-moments-talco-banho-seco-limpeza-suave-para-gatos-100g', linha: 'pet-moments', tipo: 'Talco banho seco', curto: 'Talco Limpeza Suave para Gatos', conteudo: '100 g',
    foto: 'p-talco-gatos', para: ['gatos'], tags: ['banho-seco', 'gatos'],
    resumo: 'Limpa o pelo dos gatos sem água, elimina odores e facilita a escovação.' },
  { slug: 'shampoo-condicionador-hidratante', url: 'pet-moments-shampoo-e-condicionador-matacura-hidratante-200ml', linha: 'pet-moments', tipo: 'Shampoo e condicionador', curto: 'Shampoo e Condicionador Hidratante', conteudo: '200 ml',
    foto: 'p-hidratante', foto2: 'p-hidratante-ant', para: ['caes', 'gatos'], tags: ['dia-a-dia'], nova: true,
    resumo: 'Cremoso e suave: limpa, hidrata e deixa os pelos desembaraçados, sedosos e perfumados.' },
  { slug: 'spray-banho-seco-gatos', url: 'pet-moments-spray-banho-seco-desodorizante-para-gatos-200ml', linha: 'pet-moments', tipo: 'Spray banho seco', curto: 'Spray Desodorizante para Gatos', conteudo: '200 ml',
    foto: 'p-spray-gatos', para: ['gatos'], tags: ['banho-seco', 'gatos'],
    resumo: 'Aplicação rápida e sem enxágue, com fórmula feita para a pele e a pelagem dos gatos.' },
  { slug: 'talco-banho-seco-limpeza-profunda', url: 'pet-moments-talco-banho-seco-limpeza-profunda-100g', linha: 'pet-moments', tipo: 'Talco banho seco', curto: 'Talco Limpeza Profunda', conteudo: '100 g',
    foto: 'p-talco-profunda', para: ['caes'], tags: ['banho-seco'],
    resumo: 'Limpeza sem água depois de passeios e brincadeiras, com ação desodorizante intensa.' },
  { slug: 'cao-fiel-shampoo-sarnicida', url: 'cao-fiel-shampoo-sarnicida-e-antipulgas-200ml', linha: 'cao-fiel', tipo: 'Shampoo', curto: 'Shampoo Sarnicida e Antipulgas', conteudo: '200 ml',
    foto: 'p-caofiel-shampoo', para: ['caes'], tags: ['sarna-pulgas'], cor: '#b9a3d8',
    resumo: 'Controle de pulgas e tratamento das sarnas dos cães, com higiene para todos os tipos de pelo.' },
  { slug: 'cao-fiel-sabonete-sarnicida', url: 'cao-fiel-sabonete-cao-fiel-sarnicida-e-anti-pulgas-90g', linha: 'cao-fiel', tipo: 'Sabonete', curto: 'Sabonete Sarnicida e Antipulgas', conteudo: '90 g',
    foto: 'p-caofiel-sabonete', para: ['caes'], tags: ['sarna-pulgas'], caixa: true, cor: '#d9a6c9',
    resumo: 'Controle de pulgas em cães, com pelos macios e levemente perfumados.' },
  { slug: 'pomada-saralogo', url: 'saralogo-pomada-saralogo-antisseptica-e-cicatrizante-30g', linha: 'saralogo', tipo: 'Pomada', curto: 'Pomada Antisséptica e Cicatrizante', conteudo: '30 g',
    foto: 'p-saralogo', para: ['caes', 'gatos'], tags: ['feridas', 'antisseptico'], caixa: true,
    resumo: 'Cicatrização de ferimentos e ação antisséptica no tratamento de doenças da pele.' },
];

const clarear = (hex, t) => '#' + [1, 3, 5].map(i => Math.round(parseInt(hex.slice(i, i + 2), 16) + (255 - parseInt(hex.slice(i, i + 2), 16)) * t).toString(16).padStart(2, '0')).join('');
const lista = v => (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);

export const produtos = vitrine.map(v => {
  const f = fichas.find(x => x.url && x.url.includes(v.url + '/')) || {};
  const cor = v.cor || cores[v.foto] || '#fdd011';
  return {
    ...v,
    nome: f.nome || v.curto,
    codigo: f.codigo || '',
    apresentacao: f.apresentacao || v.conteudo,
    indicacao: f.indicacao || v.resumo,
    beneficios: lista(f.beneficios),
    ativo: f.principio_ativo || f.composicao || '',
    modo: lista(f.modo_de_usar),
    precaucoes: lista(f.precaucoes),
    licenca: f.licenca || '',
    rt: f.responsavel_tecnico ? site.rt : '',
    video: (f.video || '').split('/embed/')[1] || '',
    antigo: f.url || '',
    cor,
    cor2: clarear(cor, 0.82),
  };
});

// Empresa: textos da página Empresa (Sobre, Políticas, Histórico) do site atual.
export const historia = empresa.empresa.historia;
export const linhaDoTempo = empresa.empresa.timeline.map(t => ({ ano: t.ano, texto: t.texto, foto: 'h-' + t.ano }));
export const politicas = {
  missao: 'Fornecer soluções de higiene, beleza e tratamento pet-veterinário que promovam saúde e bem-estar para toda a família, sendo referência em qualidade de processos e produtos na indústria farmacêutica veterinária brasileira.',
  valores: ['Busca constante de excelência', 'Integridade e ética', 'Gestão do conhecimento', 'Comprometimento com qualidade e segurança', 'Valorização das pessoas', 'Responsabilidade socioambiental'],
  blocos: [
    ['Qualidade', 'Cumprir a legislação e os acordos assumidos, decidir com proatividade, agilidade e inovação, buscar melhoria contínua com foco em sustentabilidade e competitividade, e manter relações de diálogo, ética e transparência.'],
    ['Segurança', 'Capacitar os colaboradores e criar condições para práticas seguras de saúde e trabalho, reduzindo perdas e oferecendo ao mercado produtos seguros.'],
    ['Produção', 'Cumprir a programação de produção no prazo e com qualidade, buscar melhores condições na compra de insumos e aprimorar processos e produtos.'],
    ['Meio ambiente', 'Gerir o meio ambiente como processo contínuo, atender ou superar a legislação, evitar resíduos prejudiciais e incentivar fornecedores e parceiros a seguir os mesmos princípios.'],
  ],
};
export const numeros = [
  ['80', 'anos do primeiro registro', 'Sabonete Matacura, 26 de outubro de 1945'],
  ['5.000', 'm² de estrutura industrial', 'em São Miguel do Oeste (SC)'],
  ['27', 'estados com pontos de venda', 'presentes em todo o Brasil'],
  [String(vitrine.length), 'produtos em 4 linhas', 'cães, gatos e cavalos'],
];

// Onde comprar e representantes (página Onde Comprar e Representantes do site atual).
export const lojas = [
  { marca: 'Matacura', links: [['Petz', 'https://www.petz.com.br/busca?q=matacura'], ['Petlove', 'https://www.petlove.com.br/matacura']] },
  { marca: 'Cão Fiel', links: [['Petz', 'https://www.petz.com.br/busca/Cao-fiel'], ['Petlove', 'https://www.petlove.com.br/cachorro/shampoos-e-cosmeticos/da_caofiel?results_per_page=20']] },
];
const UF = { SC: 'Santa Catarina', RS: 'Rio Grande do Sul', PR: 'Paraná', SP: 'São Paulo' };
export const representantes = Object.entries(empresa.representantes).filter(([k]) => UF[k]).map(([uf, rs]) => ({
  uf, estado: UF[uf],
  lista: rs.map(r => ({ empresa: r.nome, contato: r.contato, atuacao: r.atuacao, telefone: r.telefone, email: r.email })),
}));
export const destinatarios = empresa.contato.formulario.campos.find(c => c.opcoes).opcoes;
