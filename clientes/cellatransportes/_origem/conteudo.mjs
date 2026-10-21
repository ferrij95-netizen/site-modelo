// Textos e dados da Cella Transportes. Tudo o que está aqui veio do site atual (http://www.cellatransportes.com.br/)
// ou do folder "Equipamentos frigoríficos" publicado nele, salvo onde está marcado "escrito por nós".
export const empresa = {
  nome: 'Cella Transportes',
  razao: 'Cella & Cia Transportes',
  url: 'https://cellatransportes.overtus.com.br/',
  antigo: 'http://www.cellatransportes.com.br/',
  cidade: 'Chapecó',
  uf: 'SC',
  fones: [
    { txt: '(49) 3323-1916', href: '+554933231916', rotulo: 'Comercial' },
    { txt: '(49) 9 9954-0300', href: '+5549999540300', rotulo: 'WhatsApp' },
    { txt: '(49) 9 9136-1462', href: '+5549991361462', rotulo: 'Celular' },
  ],
  wa: '5549999540300',
  email: 'comercial@cellatransportes.com.br',
  // Ponto do mapa que o site atual incorpora ("Cella Transportes" no Google Maps).
  mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1776.0738262264076!2d-52.587857910453565!3d-27.088639918835117!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7a479791d14846ba!2sCella+Transportes!5e0!3m2!1spt-BR!2sbr!4v1475331208495',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Cella+Transportes+Chapec%C3%B3',
  google: { nota: '4,8', avaliacoes: 223 },
};

export const textos = {
  // folder
  intro: 'Localizada em Chapecó (SC), polo de produção de equipamentos industriais e frigoríficos, a Cella Transportes trabalha em todo o Brasil.',
  // meta description do site atual
  especialidade: 'Empresa de transporte geral de cargas, especialista em equipamentos frigoríficos, industriais e pesados.',
  missao: 'Prestar serviço em transporte de forma rápida e com satisfação aos clientes.',
  visao: 'Ser referência no transporte dedicado de cargas em todo o território nacional.',
  valores: ['Comprometimento', 'Agilidade', 'Eficiência', 'Qualidade', 'Ética', 'Transparência'],
};

// "Serviços" do site atual
export const servicos = [
  { id: 'industriais', nome: 'Equipamentos industriais', txt: 'Transporte de máquinas e equipamentos da indústria, da coleta no fornecedor até a entrega na unidade.', foto: 'tanque-actros' },
  { id: 'medidas', nome: 'Medidas especiais', txt: 'Especializada em transporte de equipamentos com medidas especiais: tanques, silos e estruturas que pedem prancha e sinalização de largura.', foto: 'largura-320' },
  { id: 'insumos', nome: 'Insumos', txt: 'Transporte de insumos para a produção, com a mesma agilidade e cuidado das cargas de equipamento.', foto: 'gaiolas' },
];

// "Modalidade de transporte" do site atual
export const modalidades = [
  { nome: 'Carga dedicada', sub: 'Exclusiva', txt: 'Cargas dedicadas e exclusivas, com extrema agilidade na entrega.', pontos: ['Caminhão só para a sua carga', 'Saída e entrega sem paradas para outros clientes', 'Indicada para equipamentos grandes ou urgentes'] },
  { nome: 'Carga compartilhada', sub: 'Fracionada', txt: 'Cargas compartilhadas, atendendo todo requisito de qualidade e norma técnica de espaçamento entre cargas, amarrações e fixação da carga.', pontos: ['Espaçamento entre cargas conforme norma', 'Amarração e fixação de cada volume', 'Custo dividido para cargas menores'] },
];

// folder: "Coletamos equipamentos para"
export const coletas = [
  { nome: 'Transferência de imobilizado', txt: 'Equipamentos e máquinas que mudam de uma unidade do grupo para outra.' },
  { nome: 'Remessa para conserto', txt: 'Envio de equipamentos para manutenção e o retorno à sua unidade.' },
  { nome: 'Compras da sua unidade', txt: 'Coleta no fornecedor dos equipamentos comprados pela sua unidade.' },
  { nome: 'Carga fechada, lotação e fracionado', txt: 'O frete no formato que a sua carga pede.' },
];

// folder: estados de coleta e de entrega
export const ufsColeta = ['RS', 'SC', 'PR', 'SP', 'RJ', 'MG', 'ES', 'MS', 'MT', 'RO', 'TO', 'BA', 'GO', 'PA'];
export const nomesUf = { AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins' };

// Fotos do carrossel do site atual. Legendas escritas por nós a partir do que aparece na foto.
export const cargas = [
  { foto: 'tanque-actros', tit: 'Tanque de inox em prancha', txt: 'Comboio com tanques de grande diâmetro amarrados com cintas.', tipo: 'Medidas especiais' },
  { foto: 'tanque-actros-vermelho', tit: 'Tanque em rodovia', txt: 'Cavalo Mercedes-Benz com prancha rebaixada.', tipo: 'Medidas especiais' },
  { foto: 'largura-320', tit: 'Largura total 3,20 m', txt: 'Carga sinalizada com a placa de largura excedente.', tipo: 'Medidas especiais' },
  { foto: 'silos-iveco', tit: 'Vasos de pressão', txt: 'Dois vasos verdes e peças de apoio na carroceria.', tipo: 'Industrial' },
  { foto: 'tanque-cargo', tit: 'Tanque horizontal', txt: 'Tanque de inox em caminhão 8x2.', tipo: 'Frigorífico' },
  { foto: 'tanque-inox', tit: 'Equipamentos de inox', txt: 'Tanque e equipamentos de processo saindo do fabricante.', tipo: 'Frigorífico' },
  { foto: 'frota-volvo', tit: 'Bitrem lonado', txt: 'Volvo FH com a marca Cella, para carga fechada.', tipo: 'Carga fechada' },
  { foto: 'engradados', tit: 'Equipamentos em engradados', txt: 'Volumes em engradados de madeira na carreta.', tipo: 'Industrial' },
  { foto: 'gaiolas', tit: 'Estruturas metálicas', txt: 'Estruturas leves e volumosas em caminhão truck.', tipo: 'Industrial' },
  { foto: 'estrutura-cargo', tit: 'Estruturas galvanizadas', txt: 'Carga alta com amarração em toda a extensão.', tipo: 'Industrial' },
  { foto: 'galpao', tit: 'Coleta na fábrica', txt: 'Carregamento na doca do fornecedor.', tipo: 'Coleta' },
  { foto: 'empilhadeira', tit: 'Carregamento com empilhadeira', txt: 'Equipamento posto no caminhão no pátio do cliente.', tipo: 'Coleta' },
];
