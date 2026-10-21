// Conteúdo da Vidrex Vidros, tirado do site atual (vidrexvidros.com.br, 2009). Textos dos produtos, serviços e dicas
// são os do site, só com acentos e pontuação corrigidos. O que foi escrito por nós está marcado com "nosso".

export const empresa = {
  nome: 'Vidrex Vidros',
  url: 'https://vidrexvidros.overtus.com.br/',
  antigo: 'https://www.vidrexvidros.com.br/',
  fundacao: 2009,
  slogan: 'Do básico ao moderno',
  blindex: 'Distribuidora autorizada Blindex',
  fone: '(65) 3321-8371', foneHref: '+556533218371',
  cel: '(65) 98406-9096', celHref: '+5565984069096', // no site atual: (65) 8406-9096, sem o 9 da frente
  wa: '5565984069096',
  rua: 'Rua Joaquim Murtinho, 2001',
  esquina: 'esquina com a Rua Prof. Feliciano Galdinho',
  bairro: 'Porto', cidade: 'Cuiabá', uf: 'MT',
  mapa: 'https://www.google.com/maps?q=-15.60414,-56.116465&z=16&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Vidra%C3%A7aria+Vidrex+Cuiab%C3%A1&query_place_id=',
  rota: 'https://www.google.com/maps/dir/?api=1&destination=-15.60414,-56.116465',
};
empresa.endereco = `${empresa.rua}, ${empresa.esquina}, ${empresa.bairro}, ${empresa.cidade} - ${empresa.uf}`;

export const sobre = 'A Vidrex foi fundada em 2009 e dispõe de profissionais altamente capacitados para especificar as utilizações de qualquer tipo de vidro, prezando a segurança de cada caso e proporcionando compromisso, qualidade, transparência e sofisticação, com a preocupação de garantir a satisfação do nosso cliente.';
export const valores = ['Compromisso', 'Qualidade', 'Transparência', 'Sofisticação'];
export const blindexFrase = { t: 'Todo Blindex® é vidro temperado.', s: 'Mas cuidado: nem todo vidro temperado é Blindex®.' };
export const blindexTexto = 'A qualidade que você precisa, nos mais diversos formatos que você deseja. Só a Blindex oferece.';

// Categorias do menu "Produtos" do site atual, na mesma ordem.
export const produtos = [
  { slug: 'vidro-comum', nome: 'Vidro comum', grupo: 'vidros', foto: '4555e8', fotoAlt: 'Ambiente com divisória de vidro',
    texto: 'Vidro que se aplica nas mais diversas soluções funcionais e decorativas. Por ser plano, possui uma transparência perfeita. Também possuímos vidros comuns coloridos.' },
  { slug: 'vidro-temperado', nome: 'Vidro temperado', grupo: 'vidros', foto: 'prota0', fotoAlt: 'Janela de vidro temperado com vista para a cidade',
    texto: 'O vidro temperado é um vidro que, durante sua produção, passa por um processo de temperatura especial, recebendo fortes jatos de ar direcionados a toda a superfície. A vantagem é que o produto fica mecanicamente mais resistente, menos sujeito a lascamento durante o uso, e em caso de quebra os cacos são menores e sem pontas, reduzindo os riscos de ferimentos.' },
  { slug: 'vidro-laminado', nome: 'Vidro laminado', grupo: 'vidros', foto: 'd738eb', fotoAlt: 'Fachada em vidro laminado da Clínica Salutte',
    texto: 'O vidro laminado padrão é composto por duas lâminas de vidro e uma película de polivinil butiral (PVB). Esta película torna o vidro mais resistente a impactos frontais. No caso de quebra, os estilhaços ficam presos à película, reduzindo o risco de ferimentos. Existe também o laminado múltiplo, para casos de resistência à bala, usando três vidros ou mais.' },
  { slug: 'espelhos', nome: 'Espelhos', grupo: 'ambientes', foto: '85b5ae', fotoAlt: 'Espelho redondo e aparador',
    texto: 'O espelho é um recurso amplamente explorado por arquitetos e decoradores por sua nobre função na composição de ambientes. O espelho é capaz de tornar pequenos espaços mais charmosos e harmônicos. Os espelhos podem agregar acabamentos especiais como lapidação, bisotê e jateamento, molduras, além de montagens diversas e painéis.',
    galeria: [['b09378', 'Espelho no banheiro'], ['f6597b', 'Espelhos na sala'], ['161533', 'Parede de espelho em sala de estar'], ['13fa0f', 'Aparador de vidro colorido Lacobel']] },
  { slug: 'box', nome: 'Box', grupo: 'ambientes', foto: '90fe9a', fotoAlt: 'Box Blindex de vidro temperado',
    texto: 'A praticidade e a segurança são os melhores atributos que o box de vidro temperado Blindex pode oferecer para o seu banheiro.' },
  { slug: 'portas-e-janelas', nome: 'Portas e janelas', grupo: 'ambientes', foto: 'ec0f55', fotoAlt: 'Porta com kit Versatik Truck',
    texto: 'O vidro temperado Blindex® é ideal para a utilização em portas e janelas, seja em residências ou em edifícios comerciais. Por ser um vidro de segurança, atende às principais necessidades técnicas para pequenos e grandes fechamentos, além de ser um material nobre e muito requisitado nos mais diversos projetos de arquitetura.',
    galeria: [['758834', 'Porta de vidro'], ['28fab1', 'Porta em vidro incolor']] },
  { slug: 'acessorios', nome: 'Acessórios', grupo: 'ambientes', foto: null,
    texto: 'Aqui você encontrará variedade em ferragens para vidro temperado das linhas Santa Marina e Blindex, ferragens de alumínio e de polímero, de todas as cores disponibilizadas no mercado.' },
  { slug: 'fachadas', nome: 'Fachadas', grupo: 'obras', foto: 'c28d2b', fotoAlt: 'Fachada em vidro cinza do Soneca Hotel',
    texto: 'Com o poder de garantir luz natural, modernidade, sofisticação e segurança, as fachadas de vidro são sempre bem-vindas. Sejam elas para edifícios corporativos ou casas, a Vidrex Vidros realiza fachadas em vidro temperado, laminado, com proteção solar, isolamento térmico e isolamento acústico.',
    galeria: [['2e399d', 'Fachada em vidro laminado'], ['7e268e', 'Pele de vidro leitoso']] },
  { slug: 'sacadas', nome: 'Sacadas', grupo: 'obras', foto: '2282fb', fotoAlt: 'Fechamento de sacada com vista para Cuiabá',
    texto: 'Tendo como benefício valorizar o ambiente, deixando-o muito mais aconchegante sem perder a visibilidade, as sacadas também podem proteger de ventos fortes, impedir a entrada de água e até mesmo ajudar na diminuição da poluição.',
    galeria: [['afad52', 'Fechamento de sacada'], ['4773d3', 'Fechamento de sacada aberto'], ['401e6b', 'Guarda-corpo de vidro verde']] },
];

// Lista de serviços do site atual. As descrições curtas são nossas (nosso).
export const servicos = [
  { nome: 'Corte', d: 'Chapas cortadas na medida do projeto.' },
  { nome: 'Lapidação', d: 'Bordas lisas e seguras, prontas para ficar à vista.' },
  { nome: 'Biseladora', d: 'Bisotê nas bordas de espelhos e vidros decorativos.' },
  { nome: 'Furação', d: 'Furos para ferragens, puxadores e fixação.' },
  { nome: 'Jateamento', d: 'Vidro fosco, faixas e desenhos para privacidade.' },
  { nome: 'Pintura', d: 'Vidros pintados e coloridos para ambientes.' },
  { nome: 'Montagens especiais', d: 'Painéis, aparadores, espelhos com moldura e peças sob medida.' },
  { nome: 'Transporte', d: 'Entrega do vidro pronto até a obra.' },
];
export const servicosIntro = 'A Vidrex conta com profissionais altamente qualificados, acompanhando e manipulando todas as fases e processos a que são submetidos os espelhos e os vidros laminados, temperados e jateados.';
export const fotosServico = [['serv-b', 'Lapidação de vidro na Vidrex'], ['serv-a', 'Vidro na máquina de lapidar'], ['serv-c', 'Funcionário operando a máquina de furação']];

// Portfólio do site atual. "obra" agrupa as fotos do mesmo trabalho.
export const obras = [
  { obra: 'Sala de Banho', autor: 'Arquiteta Susana Vilela', tipo: 'Espelhos e box', fotos: ['6ce0c2', 'a40d6c', '0f1545', 'c5479f', '3d2cb8', '77ab9b', 'fc9623'] },
  { obra: 'Banho da Moça', autor: 'Casa Cor MT 2012 · Arquitetos Michelly Bortolotti e Lucas Sborchia', tipo: 'Espelhos e box', fotos: ['133dac', 'df8dbe', 'abe04b', '497ebf'] },
  { obra: 'Fechamento de sacada', autor: 'Edifício residencial em Cuiabá', tipo: 'Sacadas', fotos: ['2282fb', '134e2a', '2646a2', '66bf95', '6b9cac'] },
  { obra: 'Fachada em vidro laminado', autor: 'Clínica Salutte', tipo: 'Fachadas', fotos: ['d738eb', 'f96b6a'] },
  { obra: 'Fachada em vidro cinza', autor: 'Soneca Hotel', tipo: 'Fachadas', fotos: ['66fd9a'] },
  { obra: 'Pele de vidro', autor: 'Colégio Fato Júnior, antes e depois', tipo: 'Fachadas', fotos: ['e05a91', 'ac534d'] },
  { obra: 'Pele de vidro leitoso', autor: 'Fachada comercial', tipo: 'Fachadas', fotos: ['7e268e'] },
  { obra: 'Corrimão em vidro e inox', autor: 'Escada residencial', tipo: 'Escadas e guarda-corpos', fotos: ['40c1cc', 'a794ec'] },
  { obra: 'Guarda-corpo em inox e vidro', autor: 'Escada residencial', tipo: 'Escadas e guarda-corpos', fotos: ['b912bb'] },
  { obra: 'Porta em vidro incolor', autor: 'Concessionária Volvo Estocolmo', tipo: 'Portas', fotos: ['28fab1'] },
  { obra: 'Box Blindex', autor: 'Banheiro residencial', tipo: 'Espelhos e box', fotos: ['90fe9a'] },
  { obra: 'Espelho redondo e aparador', autor: 'Hall de entrada', tipo: 'Espelhos e box', fotos: ['85b5ae'] },
];
export const tiposObra = ['Espelhos e box', 'Sacadas', 'Fachadas', 'Escadas e guarda-corpos', 'Portas'];

// Página "Dicas" do site atual.
export const dicas = [
  { slug: 'box', titulo: 'Cuidados com o box Blindex', itens: [
    'Após a instalação, o box só poderá ser usado depois de 24 horas, período necessário para a secagem do silicone de vedação.',
    'Faça manutenção preventiva a cada 12 meses.',
    'No perfil superior do box Blindex Aluminium está colada a etiqueta de recomendações de uso. Não retire essa etiqueta e consulte-a sempre que for necessário.',
    'Não use produtos abrasivos, como lixa, palha de aço ou ácidos, na limpeza do seu box.',
    'Não use facas ou objetos pontiagudos para retirar as etiquetas coladas no vidro.',
    'Use somente água, sabão ou detergente neutro, ou produtos específicos para limpeza de vidro.',
    'A permanência de gotas de água após o banho pode, eventualmente, provocar manchas. Portanto, remova-as mantendo o box limpo e seco.',
    'Não deixe crianças desacompanhadas utilizarem o box.',
  ] },
  { slug: 'limpeza', titulo: 'Limpeza dos vidros', itens: [
    'Para fazer a limpeza do vidro, não utilize produtos abrasivos como lixa, palha de aço ou ácidos na limpeza do seu vidro temperado.',
    'Para retirar as etiquetas coladas no vidro, não faça uso de facas ou objetos pontiagudos: utilize somente água, sabão ou detergente neutro, ou produtos específicos para limpeza de vidro.',
    'As gotas de água que ficam no vidro do box após o banho podem eventualmente provocar manchas. Por isso, procure fazer a limpeza dos vidros semanalmente.',
  ] },
  { slug: 'instalacao', titulo: 'Instalação de box', itens: [
    'Com o selante para instalação do box de vidro Blindex, que não tem cheiro e não contém solventes, o box pode ser usado em apenas 2 horas após a aplicação.',
    'Para maior durabilidade, siga as recomendações da etiqueta e faça a manutenção preventiva a cada 12 meses.',
  ] },
];

// "Como é feito o vidro?" (página Dicas). temp = temperatura citada no passo.
export const comoFeito = [
  { t: 'Os ingredientes', temp: null, d: 'O processo lembra um pouco a preparação de um bolo. O primeiro passo é juntar os ingredientes: 70% de areia, 14% de sódio, 14% de cálcio e outros 2% de componentes químicos.' },
  { t: 'O forno', temp: 1500, d: 'Os ingredientes são misturados e seguem para um forno industrial, que atinge temperaturas de até 1.500 °C. A mistura passa algumas horas no forno até se fundir, virando um material meio líquido.' },
  { t: 'O "mel"', temp: null, d: 'Ao sair do forno, a mistura é uma massa viscosa e dourada, que lembra muito o mel. Ela escorre por canaletas até os moldes, e a dosagem de cada molde é controlada conforme o tamanho da peça.' },
  { t: 'O primeiro molde', temp: 1200, d: 'O primeiro molde dá o contorno inicial do objeto, com o "mel" a cerca de 1.200 °C. O formato do molde deixa uma bolha de ar dentro da mistura incandescente.' },
  { t: 'O sopro', temp: null, d: 'O objeto segue para o molde final e uma espécie de canudo é inserido na bolha. Por ele, uma máquina injeta ar, moldando o líquido até ganhar o contorno definitivo, como o de uma garrafa.' },
  { t: 'O recozimento', temp: 600, d: 'A temperatura cai para uns 600 °C e o objeto fica rígido, podendo sair do molde. Só resta o recozimento: o vidro é deixado para resfriar e fica pronto para ser usado.' },
];
