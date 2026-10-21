// Dados da Mazzer tirados do site atual (mazzer.com.br, outubro de 2026). Equipamentos em equipamentos.json
// (nome, texto, tabela e fotos de cada página de produto do site atual; tabelas reorganizadas a partir do texto corrido).
import fs from 'node:fs';

export const empresa = {
  nome: 'Mazzer Equipamentos Industriais',
  curto: 'Mazzer',
  url: 'https://mazzer.overtus.com.br/',
  antigo: 'http://www.mazzer.com.br/',
  fone: '(16) 3942-9773',
  foneHref: '+551639429773',
  email: 'mazzer@mazzer.com.br',
  endereco: ['Rua Antônio Gatto Júnior, 111', 'Distrito Industrial', 'Sertãozinho / SP'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Ant%C3%B4nio+Gatto+J%C3%BAnior+111+Sert%C3%A3ozinho+SP',
  mapaEmbed: 'https://maps.google.com/maps?q=Rua%20Ant%C3%B4nio%20Gatto%20J%C3%BAnior%2C%20111%2C%20Sert%C3%A3ozinho%20SP&z=15&output=embed',
  horario: 'Seg a Qui: 07:00 às 17:00 · Sex: 07:00 às 16:00',
  desde: 1993,
  area: '4.000 m²',
};

// Texto "A Empresa" do site atual, sem mudanças.
export const sobre = [
  'A Mazzer Equipamentos Industriais é uma empresa voltada para a fabricação de componentes para a indústria que procura suprir as necessidades do setor sucroalcooleiro, como usinas de açúcar e destilarias de álcool, e do setor de papel e celulose com a fabricação de equipamentos de preparação de massa e máquinas de papel.',
  'Com sede em Sertãozinho, Estado de São Paulo, município conhecido pela alta oferta de subprodutos da cana-de-açúcar e grande polo de desenvolvimento tecnológico para este setor, a empresa também atua em serviços de recuperação e desenvolvimento de equipamentos desde 1993.',
  'Hoje a Mazzer Equipamentos Industriais é uma empresa estruturada para oferecer serviços de usinagem, reforma de equipamentos, aprimoramento e desenvolvimento de novos projetos, com uma área total de 4.000 m² e mão de obra qualificada.',
];

export const setores = {
  papel: {
    nome: 'Papel e Celulose', foto: 'setor-papel.webp',
    texto: 'A Mazzer Equipamentos Industriais fabrica equipamentos para preparação de massa, máquina de papel e máquina de reciclagem de papel e papelão. Caso não haja na lista o equipamento que interessa à sua empresa, entre em contato conosco: também fabricamos sob encomenda.',
  },
  acucar: {
    nome: 'Açúcar e Etanol', foto: 'setor-acucar.webp',
    texto: 'A Mazzer também atua no setor sucroenergético com o fornecimento de peças de reposição usinadas ou fundidas. Os materiais usados são de ótima qualidade e o acabamento das peças é uma garantia da Mazzer Equipamentos Industriais.',
  },
  manutencao: {
    nome: 'Manutenção e Recuperação', foto: 'setor-manutencao.webp',
    texto: 'A Mazzer garante aos seus clientes suporte exclusivo. A empresa oferece manutenção, recuperação e reforma de qualquer item adquirido, fabricado ou não pela Mazzer. Atende os setores de papel e celulose e sucroalcooleiro.',
  },
  mineracao: {
    nome: 'Mineração', foto: 'setor-mineracao.webp',
    texto: 'Peças e componentes usinados para a mineração, fabricados sob encomenda a partir do seu desenho ou da peça original.',
  },
};

// Grupos de equipamentos, na ordem do processo (o site atual lista em ordem alfabética).
export const grupos = {
  'preparacao-de-massa': { nome: 'Preparação de Massa', setor: 'papel', curto: 'Preparação de massa',
    texto: 'Equipamentos para desagregar, depurar, limpar, engrossar e estocar a massa de fibras virgens ou recicladas.' },
  'maquina-de-papel': { nome: 'Máquina de Papel', setor: 'papel', curto: 'Máquina de papel',
    texto: 'Da caixa de entrada à rebobinadeira: formação, prensagem, secagem e enrolamento da folha.' },
  'pecas-papel': { nome: 'Peças de Reposição', setor: 'papel', curto: 'Peças (papel)',
    texto: 'Rotores, peneiras, roscas, camisas e mancais de reposição para a linha de papel e celulose.' },
  'acucar-e-etanol': { nome: 'Peças para Açúcar e Etanol', setor: 'acucar', curto: 'Açúcar e etanol',
    texto: 'Peças de reposição usinadas ou fundidas para moenda, esteira e preparo de cana.' },
};

// Texto padrão para os itens que no site atual só têm nome e foto (escrito por nós a partir do texto de cada setor).
export const textoPadrao = {
  'preparacao-de-massa': 'Equipamento para a preparação de massa, fabricado pela Mazzer conforme a produção e a consistência da sua linha. Fale com a engenharia para dimensionar.',
  'maquina-de-papel': 'Componente para máquina de papel, fabricado pela Mazzer conforme o padrão da sua máquina. Fale com a engenharia para dimensionar.',
  'pecas-papel': 'Peça de reposição fabricada pela Mazzer, usinada conforme o desenho ou a amostra da peça original.',
  'acucar-e-etanol': 'Peça de reposição usinada ou fundida pela Mazzer, com materiais de ótima qualidade e acabamento garantido.',
};

const dados = JSON.parse(fs.readFileSync(new URL('./equipamentos.json', import.meta.url)));
export const equipamentos = dados.map(e => ({ ...e, setor: grupos[e.grupo].setor }));
export const porSlug = Object.fromEntries(equipamentos.map(e => [e.slug, e]));

// "Da fibra à bobina": etapas do processo ligadas aos equipamentos reais do catálogo.
export const processo = [
  { etapa: 'Desagregação', texto: 'A fibra ou as aparas viram massa no hidrapulper; o extrator tira as tranças.', itens: ['hidrapulper', 'extrator-de-trancas', 'rotor-hidrapulper'], foto: 'rotor-hidrapulper' },
  { etapa: 'Depuração', texto: 'Turbo separador, separador de plástico e depurador vertical tiram rejeitos leves e pesados.', itens: ['turbo-separador', 'separador-de-plastico', 'depurador-vertical'], foto: 'depurador-vertical' },
  { etapa: 'Limpeza e engrosse', texto: 'Cleaners e o separador centrífugo tiram areia e grampos; os engrossadores recuperam fibra.', itens: ['separador-centrifugo-k2000', 'bateria-de-cleaners', 'engrossador-de-massa', 'engrossador-side-hill'], foto: 'separador-centrifugo-k2000' },
  { etapa: 'Formação', texto: 'A caixa de entrada distribui o fluxo sobre a mesa plana, que desagua a folha.', itens: ['caixas-de-entrada', 'mesa-plana', 'caixas-de-succao-mesa-plana', 'hidro-foil'], foto: 'caixas-de-entrada' },
  { etapa: 'Prensagem', texto: 'Rolos de sucção e rolos prensa tiram água da folha antes da secagem.', itens: ['rolo-de-succao', 'rolo-prensa', 'prensa-desaguadora', 'esticadores-de-feltro'], foto: 'esticadores-de-feltro' },
  { etapa: 'Secagem', texto: 'Cilindros secadores aquecidos a vapor completam a secagem da folha.', itens: ['cilindros-secadores', 'chuveiro-oscilante'], foto: 'cilindros-secadores' },
  { etapa: 'Enrolamento', texto: 'A enroladeira Pope forma a bobina e a rebobinadeira corta no tamanho do cliente.', itens: ['enroladeira-pope', 'rebobinadeira-rbm-240-110', 'desenroladeira'], foto: 'rebobinadeira-rbm-200-110' },
];

// Reformas "Antes e Depois" do site atual (Manutenção e Recuperação).
export const reformas = [
  { nome: 'Prensa de sucção', antes: ['reforma-prensa-1.webp', 'reforma-prensa-2.webp'], depois: ['reforma-prensa-3.webp', 'reforma-prensa-4.webp'] },
  { nome: 'Rebobinadeira', antes: ['reforma-rebob-1.webp'], depois: ['reforma-rebob-2.webp'] },
];
