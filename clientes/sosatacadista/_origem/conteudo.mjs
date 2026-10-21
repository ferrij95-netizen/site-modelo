// Textos e dados do SOS Atacadista, copiados do site atual (sosatacadista.com.br, outubro de 2026).
// O catálogo (catalogo.json) saiu das 105 subcategorias do menu "Departamentos" e das páginas de detalhe.
import fs from 'node:fs';

const cat = JSON.parse(fs.readFileSync(new URL('./catalogo.json', import.meta.url)));
const limpa = n => n.replace(/\s+-\s+/g, ' ').replace(/\s{2,}/g, ' ').trim();
export const produtos = cat.prods.map(p => ({ ...p, nome: limpa(p.nome) }));
export const departamentos = cat.deps;

export const empresa = {
  nome: 'SOS Atacadista',
  nomeLongo: 'SOS Atacadista de Alimentos',
  razao: 'SOS Atacadista de Alimentos EIRELI',
  url: 'https://sosatacadista.overtus.com.br/',
  antigo: 'https://www.sosatacadista.com.br/',
  fundacao: 'agosto de 2019',
  endereco: 'Rua Freitas de Guimarães, 250',
  bairro: 'Cidade Líder, São Paulo - SP',
  cep: '08280-380',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Freitas+de+Guimar%C3%A3es%2C+250+-+Cidade+L%C3%ADder%2C+S%C3%A3o+Paulo+-+SP%2C+08280-380',
  fone: '(11) 2746-1111',
  foneHref: '+551127461111',
  whats: '(11) 94745-8219',
  whatsNum: '5511947458219',
  instagram: 'sos.atacadistaoficial',
  horario: 'Segunda a quinta, 9h às 21h30 · sexta, 9h às 17h',
  horarioCurto: 'Seg a qui 9h–21h30 · sex 9h–17h',
};

// Banner de contatos do site atual.
export const setores = [
  ['Vendas', '(11) 94745-8219', '5511947458219'],
  ['Administração', '(11) 96303-7888', '5511963037888'],
  ['Compras', '(11) 94027-9185', '5511940279185'],
  ['Expedição', '(11) 98859-2018', '5511988592018'],
  ['Financeiro', '(11) 96329-7647', '5511963297647'],
];

export const quemSomos = 'A SOS Atacadista foi fundada em agosto de 2019 para atender as pizzarias na região leste de São Paulo. No decorrer da trajetória, começamos a atender algumas padarias, bares, lanchonetes, pasteleiros e mercados, aumentando assim nosso portfólio de produtos. Com o passar do tempo passamos a atender outras regiões: Zona Norte, ABC, Guarulhos, Ferraz de Vasconcelos, Poá, Suzano, Braz Cubas, Mogi das Cruzes, Arujá e Santa Isabel.';
export const lema = 'Mantendo parcerias com fornecedores, clientes e colaboradores, nosso lema é fortalecer, crescer e somar benefícios para todos, distribuindo produtos de qualidade, com qualidade e responsabilidade social.';
export const entregaTexto = 'A SOS Atacadista oferece transporte de suas mercadorias com qualidade, prazo e atendimento. Vans e caminhões dedicados, presteza nos serviços e colaboradores de alto nível. Atendemos toda a região de São Paulo.';
export const retiradaTexto = 'Temos preços especiais para retirada na SOS. Os preços do encarte são exclusivos para compras com retirada em nossa loja, com pagamento em dinheiro ou Pix.';

export const regioes = ['Zona Leste', 'Zona Norte', 'ABC', 'Guarulhos', 'Ferraz de Vasconcelos', 'Poá', 'Suzano', 'Braz Cubas', 'Mogi das Cruzes', 'Arujá', 'Santa Isabel'];

export const faq = [
  ['Como posso ser cliente da SOS?', 'Basta entrar em contato com nosso tele-atendimento, que funciona de segunda a quinta das 9h às 21h30 e às sextas das 9h às 17h, ou, se preferir, pedir a visita de um de nossos representantes pelo telefone (11) 2746-1111.'],
  ['Como faço uma compra?', 'Para comprar na SOS você precisa estar cadastrado em nosso sistema. O cadastro é simples e leva 24 horas. Esse procedimento é só para a primeira compra: depois do cadastro aprovado pelo nosso departamento, os pedidos seguem o fluxo normal, bem mais rápido.'],
  ['Como faço o meu pedido?', 'Com o cadastro liberado, basta entrar em contato com nosso departamento de vendas e nossa atendente irá atendê-lo com toda atenção. Pelo site novo você também pode montar a lista e mandar pelo WhatsApp de vendas.'],
  ['Quais são as formas de pagamento?', 'Temos algumas formas de pagamento à disposição, que são concedidas após a aprovação do seu cadastro. Consulte uma de nossas atendentes. Na retirada com preço de encarte, o pagamento é em dinheiro ou Pix.'],
  ['Quais são os custos e prazos para entrega?', 'As entregas são feitas sem custo adicional para compras acima de R$ 500,00 e chegam em 24 horas, de segunda a sexta. Na segunda-feira, início da semana, entregamos no mesmo dia os pedidos feitos até as 12h.'],
];

export const avisos = [
  'Consulte-nos sobre atendimento na sua região.',
  'Preços exclusivos para compras com retirada em nossa loja.',
  'Ofertas válidas até o prazo determinado ou enquanto durar nosso estoque. Vendas sujeitas à análise e confirmação de dados.',
  'Em caso de divergência de preços no site, o valor válido é o valor para retirada.',
];

// Encarte da semana (banners do site atual). Trocar os arquivos em public/assets/encarte/ toda semana.
export const encarte = {
  validade: 'De 19/10 a 23/10',
  pagamento: 'Oferta especial para retirada. Pagamento em dinheiro ou Pix.',
  paginas: ['8878', '8879', '8880', '8881', '8882', '8883', '8884', '8885', '8886', '8887', '8888', '8889', '8890', '8891', '8892'],
  titulos: ['Farinhas para pizza e pastel', 'Mussarelas', 'Mussarela Lacpizza', 'Parmesão, provolone e gorgonzola', 'Carne moída, costela, bacon e calabresa', 'Requeijão, cream cheese e cheddar', 'Ervilha, milho, caldos e extrato', 'Molhos, ketchup e Ajinomoto', 'Atum e palmito', 'Peito de frango, sassami e filé', 'Chocolates', 'Refrigerantes', 'Óleo composto, azeite, azeitonas e alcachofra', 'Fermentos', 'Limpeza Gopabo'],
  // Preços lidos do encarte (retirada, dinheiro ou Pix), com a referência do mesmo produto no catálogo.
  ofertas: [
    { ref: '122', nome: 'Farinha Anaconda Pizza 5x5', preco: '94,59', por: 'fardo' },
    { ref: '118', nome: 'Farinha Motasa Pizza 5x5', preco: '73,78', por: 'fardo' },
    { ref: '370', nome: 'Mussarela Tradição', preco: '38,48', por: 'kg' },
    { ref: '445', nome: 'Mussarela Sabor', preco: '32,98', por: 'kg' },
    { ref: '46', nome: 'Calabresa Aurora pct 5 kg', preco: '92,10', por: 'pacote' },
    { ref: '338', nome: 'Provolone Sabor', preco: '39,29', por: 'kg' },
    { ref: '211', nome: 'Parmesão Búfalo ralado 1 kg', preco: '36,10', por: 'kg' },
    { ref: '3', nome: 'Requeijão Scala 1,5 kg', preco: '48,38', por: 'unidade' },
    { ref: '178', nome: 'Molho pizza Ekma 1,7 kg', preco: '10,05', por: 'unidade' },
    { ref: '128', nome: 'Fermento Fleischmann', preco: '10,80', por: 'unidade' },
    { ref: '354', nome: 'Azeite Gomes da Costa extravirgem 500 ml', preco: '32,10', por: 'unidade' },
    { ref: '77', nome: 'Coca-Cola pet 6x2 L', preco: '62,40', por: 'fardo' },
  ],
};

// Marcas da faixa "Parceiros" do site atual.
export const marcas = [
  ['1332', 'Scala'], ['1335', "A D'oro"], ['1337', 'Sadia'], ['1544', 'Aurora'], ['1546', 'Anaconda'],
  ['1547', 'Fleischmann'], ['1561', 'Ceratti'], ['1562', 'Catupiry'], ['1563', 'Goiás Verde'], ['1564', 'Gomes da Costa'],
  ['1565', 'Harald'], ['1566', 'Marcol'], ['1567', 'Nobre'], ['1569', 'Rezende'], ['8644', 'QSabor Laticínios'],
];

// "Fornecimento para pizzarias, padarias, pastelarias, mercados, hotéis e ramos alimentícios" (banner do site atual).
// Cada segmento junta as subcategorias do catálogo que esse tipo de cliente costuma pedir.
export const segmentos = [
  { slug: 'pizzaria', nome: 'Pizzaria', frase: 'Farinha, queijo, frios, molho e caixa: a SOS começou atendendo pizzarias da Zona Leste.', subs: ['52', '53', '48', '49', '40', '35', '96', '100', '91', '90', '98', '94', '62', '60', '59', '22', '21', '20', '23', '25', '103', '102', '29', '8', '4', '6', '7', '5'] },
  { slug: 'padaria', nome: 'Padaria', frase: 'Farinha, fermento, margarina, frios e doces para o balcão e a produção.', subs: ['52', '53', '47', '46', '50', '54', '72', '31', '33', '32', '83', '91', '90', '48', '36', '40', '116'] },
  { slug: 'pastelaria', nome: 'Pastelaria', frase: 'Massa, recheio e fritura: farinha de pastel, óleo, frios, frango e carretilha.', subs: ['52', '55', '51', '95', '48', '91', '90', '81', '86', '25', '103', '105', '33', '5', '116'] },
  { slug: 'lanchonete-e-bar', nome: 'Lanchonete e bar', frase: 'Bebida gelada, bacon, cheddar, batata, sachês e copos.', subs: ['10', '11', '12', '13', '9', '94', '34', '119', '61', '62', '83', '81', '3', '68', '116'] },
  { slug: 'mercado', nome: 'Mercado', frase: 'Bebidas, conservas, mercearia e limpeza para a gôndola.', subs: ['9', '10', '11', '12', '13', '15', '18', '21', '22', '23', '24', '25', '29', '50', '51', '54', '55', '56', '31', '33', '32', '73', '77', '79', '70'] },
  { slug: 'hotel-e-restaurante', nome: 'Hotel e restaurante', frase: 'Cozinha e limpeza: temperos, azeite, frios, verduras e descartáveis.', subs: ['51', '55', '56', '26', '28', '119', '85', '35', '36', '81', '83', '62', '61', '114', '73', '117', '68', '71', '70', '79', '77', '9'] },
];

// Produtos em destaque na home (referências do site atual).
export const destaques = ['122', '370', '46', '204', '178', '9', '303', '128', '259', '30', '92', '198'];

export const creditos = 'Foto do forno: Dale Cruse, CC BY 2.0, via Wikimedia Commons. Demais fotos, logos e encartes: site atual do SOS Atacadista.';
