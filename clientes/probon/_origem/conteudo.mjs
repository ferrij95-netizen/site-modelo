// Conteúdo do site da Probon, tirado do site atual (probon.com.br, lido em 21/10/2026).
// Produtos: produtos.json (raspado das 31 páginas /produto/<id>/...). O resto está aqui.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);

export const empresa = {
  nome: 'Probon',
  razao: 'Probon Indústria de Colchões Ltda',
  cnpj: '05.759.847/0001-78',
  slogan: 'Mais conforto para a sua vida',
  url: 'https://probon.overtus.com.br/',
  antigo: 'https://www.probon.com.br/',
  whatsapp: '555531994180',
  whatsappTxt: '(55) 3199-4180',
  telefone: '(55) 3744-3297',
  telefoneHref: '+555537443297',
  email: 'comercial@probon.com.br',
  rua: 'Rua Osvaldo Edmundo Schwertz, 1671',
  bairro: 'Bairro Jardim Primavera',
  cidade: 'Frederico Westphalen (RS)',
  cep: '98400-000',
  instagram: 'https://www.instagram.com/proboncolchoes/',
  trabalhe: 'https://forms.gle/bXWf39hfc6vJcyxx6',
  pedidoWeb: 'http://186.209.134.27:8888/',
  video: 'HVt3VoMCg7Y',
  fundacao: 1989,
};

export const historia = {
  intro: 'Desde 1989, em uma constante busca de inovação para garantir os mais elevados padrões de qualidade e confiabilidade em nossos produtos.',
  marcos: [
    { ano: '1989', titulo: 'Uma empresa de família', texto: 'No dia 3 de novembro de 1989, nossa jornada começou em Frederico Westphalen (RS). Éramos uma empresa familiar, composta pelos irmãos Leandro e Deoclides Frizon, motivados pelo sonho de empreender e inspirados pelo legado do pai. No início havia a fabricação de estofados sob medida e reformas de estofados residenciais e automotivos.' },
    { ano: 'Jardim Primavera', titulo: 'Mais espaço para crescer', texto: 'À medida que nossos negócios cresciam, a necessidade de espaço aumentava. Mudamos para a Rua Osvaldo Edmundo Schwertz, no bairro Jardim Primavera, em Frederico Westphalen, onde permanecemos até hoje.' },
    { ano: '1996', titulo: 'Nascem as espumas e os Colchões Probon', texto: 'Por volta de 1996 começamos a fabricar espumas, o que nos permitiu manter a qualidade dos nossos estofados a um custo acessível. Foi aí que surgiu a ideia de um novo produto: os Colchões Probon.' },
    { ano: 'Hoje', titulo: 'Espumação contínua', texto: 'Para atender ainda melhor o mercado de espumas industriais, embarcamos na expansão da espumação contínua, que eleva nossos padrões de qualidade e aumenta a capacidade de produção. É o começo de uma grande jornada, um marco da nossa determinação em investir no futuro.' },
  ],
  fecho: 'Continuaremos a crescer, inovar e oferecer produtos de qualidade excepcional para nossos clientes!',
  missao: 'Produzir colchões de alto padrão de qualidade, garantindo o crescimento permanente da empresa, satisfazendo clientes internos e externos.',
  visao: 'Ser reconhecida como uma empresa líder na geração de conforto e qualidade através da produção de colchões, alcançando excelência com a credibilidade perante seus clientes internos e externos.',
};

export const industrial = {
  espumacao: {
    titulo: 'Espumação contínua',
    texto: 'Contamos com o sistema MaxFoam para a produção de espumas contínuas.',
    beneficios: ['Blocos de espuma com acabamento plano', 'Menor espessura da casca e menos desperdício', 'Sem variação de densidade de espuma no bloco', 'Conversão química otimizada', 'Totalmente atualizável, com design modular', 'Capaz de produzir todos os tipos e graus de espuma'],
  },
  linhas: [
    { id: 'pecas', nome: 'Peças e lâminas', img: 'espumas-linha', itens: ['Produzidas com a mais alta tecnologia', 'Elevado padrão de qualidade', 'Adaptadas de acordo com a necessidade do cliente', 'Utilizadas em diversos tipos de cadeiras e estofados'] },
    { id: 'corte3d', nome: 'Corte em 3D', img: 'corte-3d', itens: ['Tecnologia de corte automático CNC', 'Evita desperdícios', 'Mantém os padrões de alta qualidade', 'Pode ser utilizado em diversos ramos'] },
    { id: 'cilindrica', nome: 'Espuma cilíndrica', img: 'espuma-cilindrica', itens: ['Espumas produzidas com melhor aproveitamento de corte', 'Utilizadas em caixarias de diversos tipos de cadeiras e estofados', 'Espessuras variadas de 0,5 cm a 2,5 cm'] },
    { id: 'molejo', nome: 'Molejo ensacado', img: 'molejo-ensacado', itens: ['Molas de aço endurecido, ensacadas individualmente, o que prolonga a vida útil do produto', 'Podem ser usadas na produção de colchões, assentos e estofados', 'Preparadas para receber o peso e o corpo da melhor forma, elevando o conforto'] },
  ],
};

export const laboratorio = {
  intro: 'Em preocupação com a qualidade total e o desenvolvimento de seus produtos, a Probon conta com um laboratório exclusivo para testes de espuma e molas ensacadas. Possuímos equipamentos da mais alta tecnologia e profissionais capacitados analisando periodicamente as amostras dos produtos, com inúmeros ensaios dos lotes produzidos: densidade, indentação, suporte do molejo, fator de conforto, deformação, entre outros.',
  ensaios: [
    { nome: 'Densidade', img: 'lab-2', texto: 'Verifica a quantidade de matéria-prima utilizada para produzir 1 metro cúbico de espuma. Garante que o colchão tem a densidade indicada na etiqueta.' },
    { nome: 'Deformação permanente à compressão (DPC)', img: 'lab-6', texto: 'Determina a perda de espessura da espuma quando submetida a compressão de 90% a 70 °C, durante 22 horas.' },
    { nome: 'Teor de cinzas', img: 'lab-4', texto: 'Verifica se há carga inorgânica na espuma, o que causaria um falso aumento da densidade e da dureza. Constata a pureza das matérias-primas.' },
    { nome: 'Indentação (suporte de carga)', img: 'lab-7', texto: 'Mede a força necessária para comprimir a espuma em 25%, 40% e 65% da espessura inicial. Um dos ensaios mais importantes para direcionar o produto conforme o requisito do cliente (tabela de biotipo).' },
    { nome: 'Compressão em molas', img: 'lab-8', texto: 'Controle de resistência das molas fabricadas, com ensaio de compressão.' },
  ],
  inmetro: 'Certificação do Inmetro de acordo com a portaria nº 79/2011 para colchões de espuma.',
};

export const estados = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'];

// ---------- produtos ----------
const bruto = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const titulo = s => s.toLowerCase().replace(/(^|\s|\/|-)(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/\bD(\d)/g, 'D$1').replace(/\bC\/ /g, 'c/ ').replace(/\bS\/ /g, 's/ ').replace(/\bE D/g, 'e D').replace(/\bEm\b/g, 'em').replace(/\bCom\b/g, 'com');
const NIVEIS = ['Macio', 'Médio', 'Médio/Firme', 'Firme', 'Extra firme'];

function tipoDe(nome, cat) {
  if (cat === 'base-bau') return 'Base baú';
  if (/cama auxiliar/i.test(nome)) return 'Cama auxiliar';
  if (/baby/i.test(nome)) return 'Colchão infantil';
  if (/conjunto|box/i.test(nome)) return 'Conjunto box';
  if (/molas/i.test(nome)) return 'Colchão de molas';
  return 'Colchão de espuma';
}

export const produtos = bruto.map(p => {
  const [n, sub] = p.nome.split(/\s+[–-]\s+/);
  const nome = titulo(n).replace('Baú', 'Baú').replace(/^Colchão /, 'Colchão ');
  const car = p.car.replace(/\s*INFORMAÇÕES DO PRODUTO\s*/, '').split(/;\s*/).map(s => s.trim()).filter(Boolean);
  const tec = p.tec.split('\n').map(l => l.replace(/;$|\.$/, '').trim()).filter(Boolean).map(l => {
    const i = l.indexOf(':');
    return i > 0 ? [l.slice(0, i).trim(), l.slice(i + 1).trim()] : [l, ''];
  });
  const confTxt = (car.find(c => /^conforto/i.test(c)) || '').replace(/^conforto\s*/i, '');
  let conforto = { 'macio': 'Macio', 'médio': 'Médio', 'médio/firme': 'Médio/Firme', 'médio firme': 'Médio/Firme', 'firme': 'Firme', 'extra firme': 'Extra firme' }[confTxt.toLowerCase()] || '';
  const kg = +((p.car + ' ' + p.tec).match(/(?:até|peso:\s*(?:até\s*)?)\s*(\d{3})\s*kg/i) || [])[1] || 0;
  const tags = [];
  if (/pillow/i.test(p.car)) tags.push(/taça/i.test(p.car) ? 'Pillow top taça' : 'Pillow top');
  if (/molas ensacadas|molejo/i.test(p.car + p.tec)) tags.push('Molas ensacadas');
  if (/dupla face/i.test(p.car)) tags.push('Dupla face');
  if (/inmetro/i.test(p.car + p.tec)) tags.push('Certificado INMETRO');
  if (/hiper soft/i.test(p.car)) tags.push('Hiper Soft');
  if (/hr/i.test(p.car)) tags.push('Espuma HR');
  const tipo = tipoDe(p.nome, p.cat);
  return {
    id: p.id, nome, slug: slugify(nome), tipo,
    subtitulo: sub ? titulo(sub).replace(/\bDe\b/g, 'de').replace(/\bCom\b/g, 'com') : tipo,
    linha: p.cat === 'linha-de-colchoes-sonho' ? 'Sonho' : p.cat === 'base-bau' ? 'Base Baú' : 'Probon',
    car, conforto, nivel: NIVEIS.indexOf(conforto), kg, tags, info: p.info.replace(/\s+/g, ' ').trim(), tec,
    img: p.id,
    medida: ((tec.find(t => /^altura( do colchão| total)?$/i.test(t[0])) || [])[1] || '').replace(/^Disponível em /, '').replace(/ cm e /, ' ou ').replace(/ cm ou /, ' ou ').replace(/ \/ /g, ' ou '),
  };
});
// Destaques da home: um de cada tipo/linha, com foto de quarto.
export const destaques = ['102', '79', '59', '104', '101', '96'].map(id => produtos.find(p => p.id === id));
export const niveis = NIVEIS;

// Camadas do Imperial, lidas da ficha técnica (de cima para baixo), para o corte do colchão.
export const camadasImperial = [
  { nome: 'Tampo em malha 73 g/m²', alt: 1.2, cor: 'tampo' },
  { nome: 'Lâmina D65, 2 cm', alt: 2, cor: 'espuma' },
  { nome: 'Molas ensacadas, 10 cm', alt: 10, cor: 'molas' },
  { nome: 'Feltro resinado', alt: 1, cor: 'feltro' },
  { nome: 'EPS, 15 cm', alt: 15, cor: 'eps' },
  { nome: 'Tampo inferior em TNT bordado', alt: 1, cor: 'tnt' },
];
