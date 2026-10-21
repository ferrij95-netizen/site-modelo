// Dados e textos da VRC Equipamentos, tirados do site atual (equipamentosvrc.com.br) em 21/10/2026.
// produtos.json sai de limpar.py; depoimentos.json e revendas.json foram extraídos das páginas Home e Onde Comprar.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ler = f => JSON.parse(fs.readFileSync(path.join(aqui, f), 'utf8'));

export const empresa = {
  nome: 'VRC Equipamentos',
  url: 'https://equipamentosvrc.overtus.com.br/',
  antigo: 'http://www.equipamentosvrc.com.br/',
  fones: [
    { n: '(11) 2411-2255', href: '+551124112255' },
    { n: '(11) 2412-5600', href: '+551124125600' },
    { n: '(11) 2481-9986', href: '+551124819986' },
  ],
  whats: { n: '(11) 94998-9893', wa: '5511949989893' },
  email: 'contatovrc@equipamentosvrc.com.br',
  endereco: ['Av. Justino de Maio, 1111', 'Cumbica, Guarulhos - SP', 'CEP 07222-000'],
  horario: 'Segunda a sexta, das 7h às 17h',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Justino+de+Maio,+1111+Cumbica+Guarulhos+SP',
  suporte: 'https://qualidade.equipamentosvrc.com.br/login',
  facebook: 'https://www.facebook.com/vrc.equipamentos/',
  youtube: 'https://www.youtube.com/channel/UCp9BtyhuGj3xs4C0Vr90jGA',
  catalogoCeram: 'https://cumbicloud.com.br/?dl=378b7a98ef99b11e8e6a1a8b5c8d340b',
};

export const textos = {
  slogan: ['Melhor <b>tecnologia</b> para', 'os melhores <b>equipamentos</b>'],
  tripe: 'Qualidade, tecnologia e melhor custo-benefício.',
  apresentacao: 'Com mais de 30.000 equipamentos vendidos no Brasil, América do Sul, Europa e África, a VRC, respeitada marca no mercado de produtos para laboratórios de prótese dentária, traz a seus clientes um tripé de privilégios: une em seus produtos qualidade, tecnologia e o melhor custo-benefício do mercado.',
  grupo: 'A marca VRC faz parte do Grupo Cumbica, um conglomerado que industrializa diversas marcas próprias de diversos segmentos, assegurando um controle interno de produção maior e mais sofisticado. Unindo suas forças e produzindo diversas peças próprias, garante originalidade nos produtos e os melhores resultados competitivos no mercado. Este é um dos princípios que nos mantêm à frente com o melhor custo-benefício.',
  sobreIntro: 'A essência do empenho e do trabalho competente da VRC, transcrita em palavras para que você, cliente, conheça melhor os princípios e as bases do nosso trabalho.',
  produtosIntro: 'Com uma ampla linha de produtos e equipamentos de fabricação própria, a VRC Equipamentos, simbolizada no mercado por sua exclusiva marca “VRC”, traz a seus clientes um tripé de privilégios que soma qualidade, tecnologia e melhor custo-benefício.',
  missao: 'Contribuir para o sorriso perfeito, através da parceria com profissionais da área de prótese dentária e odontologia, sempre inovando tecnologicamente, desenvolvendo, criando e aprimorando nossos e novos produtos, tratando com excelência estes que são os responsáveis por nossa existência: nossos clientes parceiros.',
  visao: 'Nossa visão soma-se a cada dia, cada hora e cada minuto. Com essa visão em cadeia somatória e crescente, nossos ideais se tornam sempre novos desafios para serem alcançados e, com isso, traçamos e buscamos novos objetivos. É isso que sempre irá nos manter à frente.',
  valores: ['Não buscamos apenas clientes, e sim clientes parceiros.', 'Respeitamos todos os nossos clientes parceiros.', 'Possuímos produtos de excelente qualidade e custo-benefício.', 'Respeitamos o meio ambiente.', 'Respeitamos e honramos nossos amigos e colaboradores.', 'Nossa comunicação é clara e objetiva.', 'Buscamos a cada dia a inovação.', 'Possuímos integridade.', 'Crescimento e rentabilidade.', 'Empreendedorismo responsável.'],
  garantia: 'Todos os equipamentos da VRC possuem 1 ano de garantia de fábrica.',
  assistencia: 'Pensando na satisfação total de seus clientes, a VRC posicionou pontos de assistência técnica autorizada em diversas regiões do território nacional e mantém um setor da fábrica, em São Paulo, para atender as regiões ainda sem assistência cadastrada. A engenharia desenvolveu mecanismos em todos os produtos que facilitam a substituição e o reparo de peças, muitas vezes permitindo ao profissional trocar peças de desgaste natural no próprio laboratório: os equipamentos são para uso profissional e jamais podem impedir o trabalho.',
  frete: 'Quando for preciso levar o produto até a fábrica dentro do prazo de garantia, todo o custo de frete (ida e volta) é por conta da VRC.',
  fraseGarantia: 'Só uma empresa que se preocupa com seus clientes faz o que a VRC faz.',
  bordao: 'VRC, só a original evolui.',
  indica: 'Quem faz a diferença, indica VRC!',
  sugestoes: 'Faz parte da nossa missão tratar com excelência nossos clientes parceiros. Por isso sua opinião é de extrema importância: com ela aperfeiçoamos nossos serviços, produtos e atendimento.',
};

// Linhas de produto e etapas do laboratório (agrupamento nosso, a partir das descrições do site atual).
export const linhas = [
  { id: 'gesso', nome: 'Gesso e modelos', etapa: 'Modelo', texto: 'Espatular, vibrar e recortar: gesso e revestimento homogêneos e sem bolhas.' },
  { id: 'fundicao', nome: 'Fundição', etapa: 'Fundição', texto: 'Fornos de anéis, elétricos e a gás, e cadinhos para eliminar a cera e fundir o metal.' },
  { id: 'injecao', nome: 'Prensagem e injeção', etapa: 'Injeção', texto: 'Porcelana injetada, facetas e coroas puras com a Prensa Fácil.' },
  { id: 'ceramica', nome: 'Queima de cerâmica', etapa: 'Cerâmica', texto: 'O forno Lótus Ceram, a pasta e.Fix e o kit que afere a temperatura real do forno.' },
  { id: 'resina', nome: 'Polimerização', etapa: 'Resina', texto: 'Panelas polimerizadoras e fotopolimerizadores para resinas acrílicas, compostas e de impressão 3D.' },
  { id: 'acabamento', nome: 'Acabamento e bancada', etapa: 'Acabamento', texto: 'Polir, limpar e manter a bancada sem pó.' },
];

const corrige = s => s.replace(/caracteristicas/g, 'características').replace(/custo beneficio/g, 'custo-benefício').replace(/esta muito/g, 'está muito').replace(/economica/g, 'econômica')
  .replace(/extremante/g, 'extremamente').replace(/tem a preocupação/g, 'têm a preocupação').replace(/excêlencia/g, 'excelência').replace(/frizar/g, 'frisar').replace(/reeembasadores/g, 'reembasadores')
  .replace(/Responsvel/g, 'Responsável').replace(/labotarório/g, 'laboratório').replace(/Graduado em Odontologia ,/g, 'Graduado em Odontologia,').replace(/Scienc$/, 'Science');
export const depoimentos = ler('depoimentos.json').map(d => ({ ...d, texto: corrige(d.texto), nome: d.nome.replace(' "Em Memória"', ''), memoria: d.nome.includes('Memória'), cv: d.cv.map(corrige) }));
export const revendas = ler('revendas.json');
export const ufs = [...new Set(revendas.map(r => r.uf))].sort((a, b) => revendas.filter(r => r.uf === b).length - revendas.filter(r => r.uf === a).length);
export const produtos = ler('produtos.json');
export const prod = slug => produtos.find(p => p.slug === slug);
