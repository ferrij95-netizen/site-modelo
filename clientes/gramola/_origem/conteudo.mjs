// Textos e dados da Gramola. Fontes: site atual gramola.com.br (página "em construção" com contatos por setor)
// e o catálogo em PDF de 2024 (84 páginas) que o site atual oferece para baixar.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);

export const site = {
  nome: 'Gramola',
  razao: 'Gramola Fundição Ltda.',
  dominio: 'https://gramola.overtus.com.br',
  slogan: 'Qualidade e tradição fundida em cada peça',
  endereco: ['Rodovia Engenheiro João Tosello, km 100', 'Bairro do Pinhal', 'Limeira, São Paulo'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Gramola+Fundi%C3%A7%C3%A3o+Rodovia+Engenheiro+Jo%C3%A3o+Tosello+km+100+Limeira+SP',
  mapaEmbed: 'https://www.google.com/maps?q=Rodovia+Engenheiro+Jo%C3%A3o+Tosello+km+100,+Limeira+-+SP&output=embed',
  fones: [['(19) 3446-1334', '1934461334'], ['(19) 3446-1128', '1934461128'], ['(19) 3453-9300', '1934539300'], ['(19) 3453-9596', '1934539596']],
  whats: '5519974223485',
  whatsTxt: '(19) 97422-3485',
  email: 'vendas@gramola.com.br',
  catalogoPdf: 'https://drive.google.com/file/d/1OKV3EWf0Oz599Q2j-uX7AsU_c_cO9tV5/view?usp=sharing',
  antigo: 'https://www.gramola.com.br/',
};

// Contatos por setor, como nos botões do site atual.
export const setores = [
  { id: 'comercial', nome: 'Comercial', txt: 'Orçamentos, pedidos e dúvidas sobre aplicação de peças.', canais: [
    ['whats', '(19) 97422-3485', 'https://wa.me/5519974223485'], ['mail', 'vendas@gramola.com.br', 'mailto:vendas@gramola.com.br'],
    ['whats', '(19) 3446-1128', 'https://wa.me/551934461128'], ['mail', 'vendas2@gramola.com.br', 'mailto:vendas2@gramola.com.br'] ] },
  { id: 'financeiro', nome: 'Financeiro', txt: 'Boletos, notas fiscais e cadastro de clientes.', canais: [
    ['whats', '(19) 97133-8552', 'https://wa.me/5519971338552'], ['mail', 'financeiro@gramola.com.br', 'mailto:financeiro@gramola.com.br'] ] },
  { id: 'compras', nome: 'Compras', txt: 'Fornecedores de insumos, matéria-prima e serviços.', canais: [
    ['mail', 'compras@gramola.com.br', 'mailto:compras@gramola.com.br'] ] },
  { id: 'rh', nome: 'RH', txt: 'Trabalhe na Gramola: envie seu currículo.', canais: [
    ['mail', 'rh@gramola.com.br', 'mailto:rh@gramola.com.br'] ] },
];

// Linhas do catálogo, na ordem do índice do PDF. foto = abertura da marca no catálogo.
export const linhas = [
  { id: 'mercedes-benz', nome: 'Mercedes-Benz', m: 'Mercedes-Benz', foto: 'mercedes', pre: 'MB' },
  { id: 'scania', nome: 'Scania', m: 'Scania', foto: 'scania', pre: 'SC' },
  { id: 'volvo', nome: 'Volvo', m: 'Volvo', foto: 'volvo', pre: 'VO' },
  { id: 'volkswagen', nome: 'Volkswagen', m: 'Volkswagen', foto: 'volkswagen', pre: 'VW' },
  { id: 'ford', nome: 'Ford', m: 'Ford', foto: 'ford', pre: 'FO' },
  { id: 'iveco', nome: 'Iveco', m: 'Iveco', foto: 'iveco', pre: 'IV' },
  { id: 'implementos', nome: 'Implementos', m: 'Implementos', sub: 'Diversos, Carreta, Truck e Truck 5 Irmãos',
    grupos: [['GR', 'Diversos'], ['CAR', 'Carreta'], ['TRU', 'Truck'], ['TR5', 'Truck 5 Irmãos']] },
  { id: 'veiculos-especiais', nome: 'Veículos especiais', m: 'Veículos especiais', sub: 'Chevrolet, Toyota, Jeep, Mitsubishi, FNM, Agrale, International e Dodge',
    grupos: [['CH', 'Chevrolet'], ['TOY', 'Toyota'], ['JEEP', 'Jeep'], ['MIT', 'Mitsubishi'], ['FNM', 'FNM'], ['AG', 'Agrale'], ['INT', 'International'], ['DO', 'Dodge']] },
];

const bruto = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));
const cx = s => (s || '').replace(/\s+/g, ' ').trim();
export const produtos = bruto.map(p => {
  const linha = linhas.find(l => l.m === p.m);
  // grupo pelo prefixo do código (o mais longo primeiro: TRU antes de TR5)
  const g = linha.grupos && [...linha.grupos].sort((a, b) => b[0].length - a[0].length).find(([pre]) => p.c.startsWith(pre));
  return {
    cod: p.c, slug: p.c.toLowerCase().replace(/\./g, '-'), nome: cx(p.n), linha: linha.id,
    grupo: g ? g[1] : '', aplic: cx(p.ap), original: cx(p.o), obs: cx(p.obs),
    novo: p.t.includes('novo'), exp: p.t.includes('exp'),
  };
});
export const linha = id => linhas.find(l => l.id === id);
export const daLinha = id => produtos.filter(p => p.linha === id);

// Números do catálogo (página 2)
export const numeros = [
  ['1992', 'no mercado desde'],
  ['200 t', 'por mês em ferro fundido nodular e cinzento'],
  ['50 t', 'por mês em aço'],
  ['5 países', 'do Mercosul, além de todo o Brasil'],
];
