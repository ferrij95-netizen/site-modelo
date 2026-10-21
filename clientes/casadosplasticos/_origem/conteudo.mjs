// Dados da Casa dos Plásticos tirados do site atual (casadosplasticos.com.br: páginas Contato, Horários, Localização e a loja WooCommerce).
// O catálogo (326 produtos, departamentos e fotos) sai de extrair.py em dados.json.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
export const { deps, produtos, destaques } = JSON.parse(fs.readFileSync(path.join(aqui, 'dados.json'), 'utf8'));

export const empresa = {
  nome: 'Casa dos Plásticos',
  sub: 'Embalagens',
  url: 'https://casadosplasticos.overtus.com.br/',
  antigo: 'http://casadosplasticos.com.br/',
  fone: '(41) 3262-3050', foneHref: '+554132623050',
  fone2: '(41) 3148-8100', fone2Href: '+554131488100',
  whats: '(41) 99876-0158', wa: '5541998760158',
  email: 'casadosplasticospr@gmail.com',
  rua: 'Av. Sete de Setembro, 2131',
  bairro: 'Centro · CEP 80060-070',
  cidade: 'Curitiba · Paraná',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Sete+de+Setembro%2C+2131%2C+Centro%2C+Curitiba+PR',
  mapaEmbed: 'https://maps.google.com/maps?q=Av.%20Sete%20de%20Setembro%2C%202131%2C%20Centro%2C%20Curitiba%20PR&z=16&output=embed',
  horarios: [['Segunda a sexta', '8h às 18h'], ['Sábado', '8h às 13h'], ['Domingo', 'Fechado']],
};

export const textos = {
  contato: 'Você está convidado a entrar em contato com a Casa dos Plásticos para um orçamento sem compromisso ou para a discussão sobre suas necessidades específicas. Estamos aqui para identificar as soluções mais adequadas para você.',
  horarios: 'A Casa dos Plásticos está atendendo nos seguintes horários.',
};

// Agrupamentos dos departamentos reais por tipo de cliente (escritos por nós, só reorganizam o catálogo).
export const negocios = [
  { nome: 'Confeitaria e salgados', texto: 'Caixas com visor, bipacks, cartuchos e potes para doces, bolos e salgados.',
    links: [['caixas', 'doces-salgados'], ['caixas', 'papel-kraft'], ['caixas', 'com-divisorias'], ['descartaveis', 'cartucho-de-papel-fundo-quadrado'], ['variedades', 'recipientes']],
    fotos: ['caixa-oitavada-40cm', 'bipack-bp-32-media', 'caixa-de-papel-kraft-branca-com-visor-acetato-15x15x5-5cm'] },
  { nome: 'Restaurante e delivery', texto: 'Marmitas de alumínio e isopor, potes para freezer e micro-ondas, talheres, copos e etiqueta lacre.',
    links: [['aluminio', 'bandeja-de-aluminio'], ['freezer-e-micro-ondas', ''], ['isopor', 'diversos-isopor'], ['descartaveis', 'talheres'], ['fitas', 'etiquetas']],
    fotos: ['bandeja-de-aluminio-3-divisorias', 'pote-redondo-750ml', 'pote-bowl-micro-e-freezer-500ml'] },
  { nome: 'Bebidas, conservas e temperos', texto: 'Garrafas e potes de vidro com tampa, garrafas plásticas e conta-gotas.',
    links: [['vidros', 'garrafas'], ['vidros', 'potes'], ['vidros', 'tampas-para-vidro'], ['descartaveis', 'garrafas-de-plastico']],
    fotos: ['garrafa-de-vidro-cachaca-700ml', 'pote-de-vidro-sextavado-230ml', 'garrafa-de-vidro-para-pimenta-150ml'] },
  { nome: 'Comércio, estoque e limpeza', texto: 'Sacolas, sacos, bobinas, filme stretch, fitas, lonas e produtos de limpeza.',
    links: [['sacolas', ''], ['sacos', ''], ['bobinas', 'filme-stretch'], ['fitas', ''], ['limpeza-e-higiene', '']],
    fotos: ['sacola-de-papel-kraft-n3', 'sacos-de-lixo-preto', 'desinfetante-lavanda'] },
];
