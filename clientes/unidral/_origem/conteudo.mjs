// Textos e dados da Unidral, tirados do site atual (unidral.com.br, páginas Início, Serviços, Portfólio e Contato).
// O que foi escrito por nós (títulos de seção, etapas do recondicionamento, partes do cilindro) está marcado com "nosso".
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);

export const empresa = {
  nome: 'Unidral',
  completo: 'Unidral Cilindros Hidráulicos',
  url: 'https://unidral.overtus.com.br/',
  antigo: 'https://unidral.com.br/',
  email: 'comercial@unidral.com.br',
  fones: [{ txt: '+55 19 3423.1673', href: '+551934231673' }, { txt: '+55 19 3423.3178', href: '+551934233178' }],
  whats: [{ txt: '+55 19 9.7402.8830', wa: '5519974028830' }, { txt: '+55 19 9.7401.1048', wa: '5519974011048' }],
  rua: 'Rua Cravinhos, 499 – Parque São Jorge',
  cidade: 'Piracicaba/SP',
  horario: 'Segunda à Sexta, das 8:00 às 18:00',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Cravinhos,+499,+Parque+S%C3%A3o+Jorge,+Piracicaba+SP',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Cravinhos,+499,+Parque+S%C3%A3o+Jorge,+Piracicaba+-+SP&output=embed',
};

export const textos = {
  diferencial: 'Temos como diferencial o desenvolvimento de projetos em acordo à necessidade do cliente, priorizando a qualidade técnica, a flexibilidade comercial e o lead time de atendimento.',
  linhaMobil: 'Nosso campo de atuação é para toda a linha Mobil, desde cilindros para escavadeiras, carregadeiras de rodas, retroescavadeiras até os mais variados equipamentos de marcas mundialmente renomadas.',
  supervisao: 'Nosso trabalho de recuperação e serviços em cilindros hidráulicos tem supervisão e acompanhamento técnico de pessoal responsável por toda a engenharia dentro da Unidral, com garantia e segurança de funcionamento e execução.',
  preventiva: 'Oferecemos aos nossos clientes o serviço de manutenção preventiva, mobilizando nossos representantes comercial e técnico até a sua empresa para assegurar que seu equipamento não pare nos momentos mais críticos ou de maior necessidade.',
  parado: 'É nosso objetivo não deixar você, cliente, com maquinário parado por motivo de cilindros hidráulicos, pois sabemos que máquina parada é sinônimo de prejuízo.',
  logistica: 'Contamos com logística própria para que o nosso atendimento seja o mais rápido possível.',
  portfolio: 'A Unidral já realizou e realiza diversos tipos de serviços para uma enorme quantidade de clientes espalhados pelo Brasil ao longo dos anos. Veja abaixo alguns de nossos trabalhos entregues, da montagem até a entrega.',
};

// Lista "Produtos e serviços" do site atual, na mesma ordem. "foto" é do próprio portfólio; "txt" é nosso.
export const servicos = [
  { t: 'Fabricação e recondicionamento de cilindros hidráulicos e pneumáticos', foto: 'g-73', txt: 'Cilindros novos sob medida ou recuperados para voltar ao trabalho com o desempenho original.' },
  { t: 'Cilindros Mill Type, soldados, tirantados, normalizados ISO 6020/6022', foto: 'g-75', txt: 'Todos os tipos de construção, inclusive cilindros normalizados pelas ISO 6020 e 6022.' },
  { t: 'Brunimento e retífica', foto: 'g-70', txt: 'Acabamento interno da camisa e retífica de hastes e peças para a vedação trabalhar certo.' },
  { t: 'Cromação de peças', foto: 'g-27', txt: 'Hastes e peças cromadas para resistir ao desgaste e à corrosão.' },
  { t: 'Recondicionamento de bombas hidráulicas', foto: 'g-74', txt: 'Bombas e comandos hidráulicos revisados e devolvidos prontos para montar.' },
  { t: 'Usinagem em geral', foto: 'g-67', txt: 'Usinagem de olhais, cabeçotes, buchas, blocos e peças especiais.' },
];

export const areas = ['Agrícola', 'Automotivo', 'Construção Civil', 'Florestal', 'Industrial', 'Mineração', 'Naval', 'Pedreira', 'Portuário', 'Siderúrgica', 'Sucroalcooleira'];

// "Maquinários atendidos" do site atual (logos CAT, Komatsu, Liebherr e Volvo).
export const marcas = [
  { n: 'Caterpillar', f: 'marca-cat.png', w: 732 },
  { n: 'Komatsu', f: 'marca-komatsu.png', w: 628 },
  { n: 'Liebherr', f: 'marca-liebherr.png', w: 887 },
  { n: 'Volvo', f: 'marca-volvo.png', w: 873 },
];

// nosso: etapas montadas a partir dos textos de Serviços (logística própria, supervisão técnica, serviços da lista, garantia). Confirmar com o cliente.
export const etapas = [
  { t: 'Retirada', d: 'Buscamos o cilindro ou a bomba com logística própria.' },
  { t: 'Avaliação técnica', d: 'Desmontagem e diagnóstico com acompanhamento da engenharia.' },
  { t: 'Recuperação', d: 'Usinagem, brunimento, retífica e cromação do que for preciso.' },
  { t: 'Montagem', d: 'Montagem com vedações novas e conferência de funcionamento.' },
  { t: 'Entrega', d: 'O equipamento volta para a obra com garantia.' },
];

// nosso: partes do cilindro e o serviço da Unidral em cada uma (desenho na versão B).
export const partes = [
  { t: 'Camisa', d: 'Brunimento interno para a vedação deslizar sem vazamento.' },
  { t: 'Haste', d: 'Retífica e cromação contra desgaste, riscos e corrosão.' },
  { t: 'Cabeçote e vedações', d: 'Montagem com kit de vedação novo.' },
  { t: 'Olhais e buchas', d: 'Usinagem e recuperação dos pontos de fixação.' },
];

export const fotos = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
export const categorias = { cilindros: 'Cilindros', bombas: 'Bombas e comandos', pecas: 'Peças e oficina' };
