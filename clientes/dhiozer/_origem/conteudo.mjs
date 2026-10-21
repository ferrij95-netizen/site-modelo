// Textos e dados da Dhiozer, tirados do site atual (www.dhiozer.com.br) e dos catálogos em PDF da página Catálogo.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
export const catalogo = JSON.parse(fs.readFileSync(path.join(aqui, 'catalogo.json'), 'utf8'));

const PDF = 'https://storage.googleapis.com/production-hostgator-brasil-v1-0-3/663/1442663/0dUPUIXW/';

export const empresa = {
  nome: 'Dhiozer Distribuidora',
  razao: 'Dhiozer Distribuidora Ltda',
  cnpj: '02.090.780/0001-33',
  url: 'https://dhiozer.overtus.com.br/',
  antigo: 'https://www.dhiozer.com.br/',
  wa: '5549991761805',
  fone: '(49) 99176-1805',
  email: 'dhiozer@dhiozer.com.br',
  endereco: 'Rua Denilde Maria Copetti, 765-D, Líder',
  cidade: 'Chapecó, SC',
  cep: '89811-048',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Denilde+Maria+Copetti+765+Chapec%C3%B3+SC',
  facebook: 'https://www.facebook.com/dhiozerdistribuidora',
  instagram: 'https://www.instagram.com/dhiozerdistribuidora/',
  lgpdEmail: 'encarregadodedados@dhiozer.com.br',
  lgpdCanal: 'lgpdaguia@gmail.com',
  horario: [['Segunda a sexta', '8h às 18h'], ['Sábado', '8h às 11h30'], ['Domingo', 'Fechado']],
  frase: 'Desde 1997 distribuindo produtos de consumo no varejo do oeste e meio oeste de Santa Catarina',
};

// Supervisores por região (página Área de Atuação do site atual).
export const regioes = [
  { id: 'oeste', nome: 'Oeste', cor: 'verde', supervisor: 'Lucas', wa: '5549991566987', fone: '(49) 99156-6987' },
  { id: 'meio-oeste', nome: 'Meio Oeste', cor: 'salmão', supervisor: 'Juliano', wa: '5549998310575', fone: '(49) 99831-0575' },
];

export const segmentos = ['Supermercados', 'Mercados', 'Mercearias', 'Restaurantes', 'Lanchonetes', 'Bares', 'Floriculturas', 'Academias', 'Bazares', 'Agropecuárias', 'Pet shops'];

// Marcas na ordem da home atual. "catalogo" = nome da marca nos produtos (catalogo.json).
export const marcas = [
  { id: 'arcor', nome: 'Arcor do Brasil', curto: 'Arcor', catalogo: 'Arcor', site: 'https://www.arcor.com.br/', pdf: PDF + '5d794732376443a98413a6630f4f7018?fileName=catalogo%20arcor%202022.pdf',
    texto: 'O Grupo Arcor é uma empresa multinacional de origem argentina, especializada na elaboração de alimentos, guloseimas, chocolates e biscoitos.',
    linhas: 'Tabletes, bombons Bon o Bon, Tortuguita, balas 7 Belo, chicles Poosh! e BigBig' },
  { id: 'triunfo', nome: 'Triunfo', curto: 'Triunfo', catalogo: 'Triunfo', pdf: PDF + '24edb0ee5e1a4a749f6bed7001eaf4bc?fileName=Triunfo%202022.pdf',
    texto: 'A marca é sinônimo de tradição e qualidade, tem forte presença nos lares brasileiros e seus produtos são voltados para toda a família. Presente nos mais variados segmentos (cracker, wafers, recheados, rosquinhas, amanteigados, cereal mix), há mais de 40 anos de mercado.',
    linhas: 'Cracker, wafers, recheados, rosquinhas, amanteigados e Cereal Mix' },
  { id: 'bretzke', nome: 'Bretzke', curto: 'Bretzke', catalogo: 'Bretzke', site: 'https://www.bretzke.com.br/br/', pdf: PDF + 'c4a02ef83f194024b7b727a2b79e70aa?fileName=Bretzke%202022.pdf',
    texto: 'A cozinha, o forno e o fogão são a alma de um lar, onde os produtos Bretzke fazem aquela diferença!',
    linhas: 'Pudins, gelatinas, misturas para bolo, Muky, Xuky e chocolate em pó' },
  { id: 'leke', nome: 'Leke', curto: 'Leke', catalogo: 'Leke', site: 'http://www.lekealimentos.com.br/br/', pdf: PDF + '63712520d69548808fb118e6847d6876?fileName=Leke%202022.pdf',
    texto: 'A Leke Alimentos tem uma linha completa de especiarias, pimentas, temperos e ervas para deixar suas receitas ainda mais saborosas. E para confeitar e decorar, uma linha de granulados, miçangas e açúcares coloridos.',
    linhas: 'Temperos Horta & Sabor e confeitaria Faça a Festa' },
  { id: 'tesai', nome: 'Tesãi of Fruit', curto: 'Splash e Gravatal', catalogo: 'Gravatal', site: 'https://splashoffruit.com.br/', pdf: PDF + '93dde2abac81404c8308271488f97e97?fileName=GRAVATAL%202022.pdf',
    texto: 'É uma bebida com sabor de fruta, preparada com água mineral gaseificada. Junto com ela, as águas minerais Gravatal e Acqva.',
    linhas: 'Splash Of Fruit em 8 sabores, água mineral Gravatal e Acqva' },
  { id: 'taschibra', nome: 'Taschibra', curto: 'Taschibra', catalogo: 'Taschibra', pdf: PDF + 'd23056efec214d018be97fe8706eb273?fileName=taschibra%202023.pdf',
    texto: 'A Taschibra é uma das maiores empresas do ramo de iluminação do país, está sediada em Indaial (SC).',
    linhas: 'Lâmpadas LED, smart Wi-Fi, halógenas e eletrônicas' },
];
export const marcaDe = p => marcas.find(m => m.catalogo === p.marca);

// Linha do tempo da página Sobre.
export const historia = [
  { ano: '1997', tit: 'Começando', txt: 'Em 1º de setembro de 1997 foi fundada a Dhiozer, na garagem da casa de seus proprietários.', img: 'h-1997' },
  { ano: '1998', tit: 'Funcionário destaque', txt: 'Collet era quem vendia nas segundas, terças e quartas-feiras e entregava às sextas e sábados.', img: 'h-1998' },
  { ano: '2000', tit: '1ª sede', txt: 'Localizada em uma adaptação da casa, foi a estrutura utilizada para comportar as demandas que vinham crescendo.', img: 'h-2000' },
  { ano: '2005', tit: 'Modernização da marca', txt: 'A marca foi modernizada e a grafia modificada para melhorar a pronúncia e a lembrança do nome.', img: 'logo' },
  { ano: '2006', tit: '2ª sede', txt: 'Alugada e com 600 m², essa foi a segunda mudança de sede da empresa.', img: 'frota' },
  { ano: '2013', tit: '3ª sede', txt: 'Com 2.000 m² e próxima ao acesso à BR-282, é a casa atual da Dhiozer.', img: 'sede' },
  { ano: '2022', tit: 'Bodas de prata', txt: 'Completamos 25 anos de história!', img: 'selo-25' },
];
export const numeros = [['1997', 'distribuindo no oeste catarinense'], ['2.000 m²', 'de sede junto à BR-282'], ['14', 'profissionais de vendas'], ['7', 'veículos para a logística']];

export const termoLgpd = `Este documento visa registrar a manifestação livre e inequívoca pela qual o Titular concorda com o tratamento de seus dados pessoais para finalidade específica, em conformidade com a Lei nº 13.709/2018. O Titular consente que a DHIOZER DISTRIBUIDORA LTDA, CNPJ 02.090.780/0001-33, Rua Denilde Maria Copetti, 765-D, Líder, Chapecó (SC), doravante Controladora, trate seus dados pessoais (nome completo, telefone e e-mail) para: identificar e entrar em contato com o Titular para fins de relacionamento comercial; enviar ou fornecer produtos e serviços; estruturar, testar, promover e fazer propaganda de produtos e serviços; e receber e processar sugestões, reclamações e elogios. A Controladora pode compartilhar os dados com outros agentes de tratamento e com empresas terceirizadas que prestam serviços relacionados a essa finalidade, e mantém medidas de segurança técnicas e administrativas para protegê-los. Os dados podem ser mantidos enquanto forem pertinentes a essas finalidades. O Titular pode, a qualquer momento, pedir confirmação do tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados e revogação do consentimento.`;
