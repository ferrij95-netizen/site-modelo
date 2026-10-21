// Dados da Herpin Embalagens. Textos e produtos vêm do site atual (herpin.com.br); o que foi escrito por nós está marcado.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);

export const empresa = {
  nome: 'Herpin Embalagens',
  desde: 1994,
  tel: '(62) 3286-6000',
  telHref: '+556232866000',
  wa: '5562982440168',
  waTxt: '(62) 98244-0168',
  email: 'herpin@herpin.com.br',
  rua: 'Avenida C-1, nº 1173',
  bairro: 'Jardim América (ao lado do Cepal)',
  cidade: 'Goiânia - GO',
  cep: '74265-010',
  mapa: 'https://www.google.com/maps?q=Herpin+Embalagens,+Av.+C-1,+1173+-+Jardim+Am%C3%A9rica,+Goi%C3%A2nia+-+GO,+74265-010&output=embed',
  rota: 'https://www.google.com/maps/dir/?api=1&destination=Herpin+Embalagens+Av.+C-1+1173+Jardim+Am%C3%A9rica+Goi%C3%A2nia',
  url: 'https://herpin.overtus.com.br/',
  antigo: 'http://www.herpin.com.br/',
};

// Do site atual (Quem Somos, home e banners).
export const textos = {
  quemSomos: 'A HERPIN EMBALAGENS, fundada em 1994, empresa inovadora, com uma sólida estrutura física, localizada no Bairro Jardim América em Goiânia, vem se destacando cada vez mais no comércio atacadista e varejista de embalagens em geral e produtos de limpeza e higiene.',
  diferencial: 'Nossos produtos têm como diferencial a competitividade, a qualidade, a logística, os preços e a entrega através de transporte próprio, garantindo assim excelência em nossos serviços, visando sempre trabalhar com seriedade, respeito e satisfação dos nossos clientes e parceiros.',
  pedido: 'Faça seu pedido que enviaremos o mais rápido possível.',
  banner: 'Soluções em produtos e materiais de limpeza',
  orcamento: 'Solicite-nos um orçamento através do formulário abaixo.',
  fale: 'Para entrar em contato com a Herpin Embalagens, preencha o formulário abaixo com seu nome e endereço de e-mail.',
};

// Os seis departamentos do menu "Produtos" do site atual, na mesma ordem. "frase" e "capa" escritos/escolhidos por nós.
export const departamentos = [
  { id: 'aluminio', nome: 'Embalagens de alumínio', curto: 'Alumínio', capa: 'marmitex-aluminio', frase: 'Marmitex, bandejas, pratos laminados, forro e papel alumínio para cozinha e delivery.' },
  { id: 'isopor', nome: 'Embalagens de isopor', curto: 'Isopor', capa: 'marmitex-isopor', frase: 'Marmitex, bandejas, pratos, hamburgueiras e caixas térmicas que mantêm a comida quente.' },
  { id: 'papel', nome: 'Embalagens de papel', curto: 'Papel', capa: 'sacos-kraft', frase: 'Sacos kraft, caixas de papelão, formas de pizza, guardanapos e bobinas de papel.' },
  { id: 'plasticas', nome: 'Embalagens plásticas', curto: 'Plásticas', capa: 'filme-pvc', frase: 'Bobinas, sacolas, filme PVC, copos, potes, talheres e sacos de lixo.' },
  { id: 'utensilios', nome: 'Equipamentos, acessórios e utensílios em geral', curto: 'Utensílios', capa: 'bandeja-plastica', frase: 'Dispensers, galheteiros, seladora de marmitex, lixeiras e tudo para o balcão.' },
  { id: 'limpeza', nome: 'Produtos de limpeza e higiene', curto: 'Limpeza', capa: 'detergente', frase: 'Detergentes, desinfetantes, papel higiênico, vassouras, rodos, luvas e toucas.' },
];

export const produtos = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'))
  .map(p => ({ ...p, id: `${p.dep}-${p.slug}` }));

// Escritos por nós: kits por tipo de negócio (só produtos que a Herpin já lista no site).
export const kits = [
  { id: 'marmitaria', nome: 'Restaurante e marmitaria', capa: 'marmitex-aluminio', itens: ['aluminio-marmitex', 'isopor-marmitex', 'utensilios-seladora-marmitex', 'plasticas-colher-garfo-faca-e-pazinha', 'plasticas-sacolas-plasticas', 'papel-guardanapo', 'plasticas-filme-pvc'] },
  { id: 'lanchonete', nome: 'Lanchonete e padaria', capa: 'sacos-kraft', itens: ['papel-saco-de-papel-para-hamburguer', 'papel-caixa-para-salgados', 'papel-forma-pizza', 'plasticas-copo', 'plasticas-canudo', 'isopor-hamburgueiras', 'papel-saco-de-papel-kraft'] },
  { id: 'acougue', nome: 'Açougue e mercado', capa: 'bandeja-laminada', itens: ['isopor-bandejas', 'plasticas-bobina-plastica-acougue', 'plasticas-bobina-pvc-esticavel', 'plasticas-bobina-freezer', 'papel-etiquetas', 'plasticas-sacolas-plasticas', 'utensilios-suporte-para-bobina'] },
  { id: 'limpeza', nome: 'Limpeza de empresa e condomínio', capa: 'balde', itens: ['limpeza-desinfetante', 'limpeza-detergente', 'limpeza-papel-higienico', 'limpeza-papel-toalha', 'limpeza-vassouras', 'limpeza-rodos', 'plasticas-saco-de-lixo', 'limpeza-luvas'] },
];

// Escolha nossa para a vitrine "mais procurados" (itens com foto boa no site atual).
export const destaques = ['aluminio-marmitex', 'isopor-marmitex', 'plasticas-filme-pvc', 'plasticas-sacolas-plasticas', 'papel-saco-de-papel-kraft', 'plasticas-copo', 'limpeza-desinfetante', 'limpeza-papel-higienico', 'utensilios-dispenser-inox', 'plasticas-pote', 'papel-caixa-papelao', 'limpeza-baldes'];
