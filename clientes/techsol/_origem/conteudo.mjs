// Textos e dados da Techsol. Tudo vem do site atual (techsolbrasil.com.br) e da matéria patrocinada no Campo Grande News
// (out/2025), salvo os títulos curtos de seção e as frases de ligação entre os blocos.
export const empresa = {
  nome: 'Techsol',
  completo: 'Techsol Energia Solar',
  marca: 'Techsol Brasil',
  url: 'https://techsol.overtus.com.br/',
  antigo: 'http://www.techsolbrasil.com.br/',
  fundacao: 2018,
  anos: 7,
  tel: { t: '(67) 99973-9331', h: '+5567999739331', wa: '5567999739331' },
  tel2: { t: '(67) 99973-9333', h: '+5567999739333', wa: '5567999739333' },
  email: 'contato@techsolbrasil.com.br',
  endereco: ['Av. Ceará, 1039 · Jardim dos Estados', 'Campo Grande · MS'],
  mapa: 'https://www.google.com/maps/place/Techsol+%7C+Empresa+de+Energia+Solar/@-20.4573628,-54.5928955,17z',
  mapaEmbed: 'https://www.google.com/maps?q=-20.4573628,-54.5928955&z=16&output=embed',
  horario: ['Seg a Sex: 08h às 18h', 'Sáb: 08h às 12h'],
  instagram: 'https://www.instagram.com/techsolbrasil',
  nota: { valor: '4,6', avaliacoes: 175 },
};

export const waLink = (msg = 'Olá, vim do site e gostaria de um orçamento!') => `https://wa.me/${empresa.tel.wa}?text=${encodeURIComponent(msg)}`;

export const hero = {
  titulo: 'Economize na conta de luz e valorize seu imóvel com energia limpa e sustentável',
  texto: 'Há 7 anos no mercado, nós somos referência em soluções completas de energia solar em todo Mato Grosso do Sul. Atendemos residências, comércios, indústrias e o agronegócio.',
};

export const motivos = [
  { t: 'Experiência comprovada', d: 'Com 7 anos no mercado de energia solar.' },
  { t: 'Equipe especializada', d: 'Profissionais qualificados para garantir a melhor solução.' },
  { t: 'Atendimento personalizado', d: 'Projetos sob medida para cada cliente.' },
  { t: 'Compromisso com prazos', d: 'Instalações realizadas em até 60 dias.' },
];

export const servicos = [
  { slug: 'venda-e-instalacao', t: 'Venda e instalação de painéis solares', d: 'Projetos personalizados para sua necessidade.', longo: 'Do estudo da sua conta de luz ao sistema ligado: a Techsol dimensiona, fornece os equipamentos e instala os painéis com equipe própria.', foto: 'instalacao' },
  { slug: 'usinas', t: 'Instalação de usinas de pequeno, médio e grande porte', d: 'Soluções escaláveis para seu projeto.', longo: 'Usinas em telhado, em solo ou em garagem solar, para casas, empresas, indústrias e propriedades rurais.', foto: 'usina-solo' },
  { slug: 'expansao', t: 'Expansão de sistemas existentes', d: 'Adicionais de painéis conforme seu consumo.', longo: 'O consumo aumentou? Acrescentamos painéis ao sistema que você já tem, para a geração voltar a acompanhar a conta.', foto: 'frama-aerea' },
  { slug: 'manutencao', t: 'Manutenção preventiva e corretiva', d: 'Garantia de desempenho contínuo.', longo: 'Limpeza, inspeção e correção do sistema para manter a geração no nível do projeto ao longo dos anos.', foto: 'garagem-solar' },
];

export const etapas = [
  { t: 'Projeto', d: 'Estudamos o seu consumo e o local da instalação e desenhamos um sistema sob medida.' },
  { t: 'Aprovação', d: 'Cuidamos da aprovação técnica do projeto junto à concessionária.' },
  { t: 'Equipamentos', d: 'Fornecemos os painéis, inversores e estruturas, de última geração.' },
  { t: 'Instalação', d: 'Equipe própria instala o sistema, com prazo médio de até 60 dias úteis após o contrato.' },
  { t: 'Monitoramento', d: 'Você acompanha a geração em tempo real pelo celular: quanto economizou e quanto CO₂ deixou de emitir.' },
];

export const segmentos = [
  { slug: 'residencial', foto2: 'painel-grama', nome: 'Residências', curto: 'Casa', foto: 'telhado', titulo: 'Energia solar para a sua casa',
    lead: 'Economize na conta de luz e valorize seu imóvel com energia limpa e sustentável.',
    texto: ['O sistema é dimensionado a partir da sua conta de luz e do espaço do telhado, para gerar a energia que a família consome.', 'A economia pode chegar a até 95% na conta de luz, dependendo do seu consumo e do dimensionamento do sistema.'],
    pontos: ['Projeto pelo consumo real da sua conta', 'Até 95% de economia na conta de luz', 'Parcelamento em até 21x no cartão ou financiamento bancário'] },
  { slug: 'comercial', foto2: 'garagem-solar', nome: 'Comércios', curto: 'Comércio', foto: 'frama-aerea', titulo: 'Energia solar para o seu comércio',
    lead: 'Lojas, atacados e escritórios com a conta de energia sob controle.',
    texto: ['A energia é um dos maiores custos fixos de quem tem ar-condicionado, câmaras frias e iluminação ligados o dia todo. Com o sistema solar, esse custo fica previsível e de longo prazo.', 'A Techsol instalou o sistema de energia solar da unidade do Frama Atacadista, em Campo Grande.'],
    pontos: ['Usinas em telhado ou garagem solar', 'Monitoramento da geração em tempo real', 'Equipe de engenharia própria'] },
  { slug: 'industrial', foto2: 'instalacao', nome: 'Indústrias', curto: 'Indústria', foto: 'usina-solo', titulo: 'Energia solar para a indústria',
    lead: 'Usinas de médio e grande porte, escaláveis conforme o consumo da planta.',
    texto: ['Para a indústria, a Techsol projeta usinas de médio e grande porte, com equipe de engenharia própria garantindo a segurança do projeto.', 'O sistema pode crescer junto com a produção: fazemos a expansão de sistemas existentes com adicionais de painéis conforme o consumo.'],
    pontos: ['Usinas de pequeno, médio e grande porte', 'Expansão conforme o consumo', 'Manutenção preventiva e corretiva'] },
  { slug: 'agronegocio', foto2: 'usina-solo', nome: 'Agronegócio', curto: 'Agro', foto: 'campo-solar', titulo: 'Energia solar para o agronegócio',
    lead: 'Propriedades rurais de Mato Grosso do Sul gerando a própria energia.',
    texto: ['Irrigação, ordenha, secagem e armazenagem pesam na conta de energia da propriedade. Uma usina solar no telhado do galpão ou no solo transforma o sol do Mato Grosso do Sul em economia.', 'Trabalhamos com financiamento agro e FCO, além das linhas dos principais bancos.'],
    pontos: ['Financiamento agro e FCO', 'Usinas em solo ou em galpões', 'Atendimento em todo Mato Grosso do Sul'] },
];

export const financiamento = {
  texto: 'Você pode investir em energia solar com total flexibilidade, parcelamos em até 21X no cartão ou financiamento bancário através dos principais bancos e financiamento agro.',
  bancos: ['Sicredi', 'Banco do Brasil', 'Santander', 'BV', 'Solfácil', 'Financiamento agro', 'FCO'],
};

export const projetos = [
  { slug: 'frama', t: 'Frama Atacadista', onde: 'Campo Grande · MS', tipo: 'Comércio', foto: 'frama-aerea', legenda: 'Vista aérea da unidade do Frama Atacadista com sistema de energia solar instalado pela Techsol.' },
  { slug: 'sede', t: 'Garagem solar da sede', onde: 'Av. Ceará, 1039 · Campo Grande', tipo: 'Garagem solar', foto: 'garagem-solar', legenda: 'Painéis fotovoltaicos instalados pela Techsol na garagem da própria sede, no Jardim dos Estados.' },
];

export const faq = [
  { p: 'Quanto tempo leva para a instalação do sistema solar?', r: 'O prazo médio é de até 60 dias úteis após o fechamento do contrato, podendo variar conforme o porte do projeto e aprovações técnicas.' },
  { p: 'Posso financiar o sistema solar?', r: 'Sim! Trabalhamos com diversos bancos e linhas de crédito, como Sicredi, Banco do Brasil, Santander, BV, Solfácil e financiamentos agro ou FCO.' },
  { p: 'O que está incluso no serviço da Techsol?', r: 'Cuidamos de tudo do início ao fim: projeto, aprovação, fornecimento dos equipamentos, instalação e monitoramento. Também oferecemos manutenção e expansão do sistema.' },
  { p: 'Qual a economia na conta de energia?', r: 'A economia pode chegar a até 95% na sua conta de luz, dependendo do seu consumo e do dimensionamento do sistema.' },
  { p: 'Posso instalar energia solar em qualquer imóvel?', r: 'Sim, desde que o local tenha espaço adequado para os painéis e estrutura compatível. Avaliamos cada caso com projeto personalizado.' },
];

export const sobre = {
  abertura: 'Todo mês é a mesma cena: a conta de luz chega com valores cada vez mais altos e, mesmo consumindo menos, o custo não para de crescer. Foi com esse pensamento que nasceu a Techsol Brasil, hoje referência em energia solar no Mato Grosso do Sul.',
  proposito: 'Mais do que uma empresa de tecnologia, a Techsol é movida por um propósito: mudar a forma como as pessoas consomem energia. Com projetos personalizados, ela ajuda famílias e empresas a reduzirem drasticamente suas contas e a se libertarem da dependência das concessionárias.',
  tecnologia: 'A empresa utiliza equipamentos de última geração e sistemas de monitoramento em tempo real, permitindo que cada cliente acompanhe o desempenho da própria usina pelo celular, veja quanto está economizando e o quanto deixou de emitir de CO₂ na atmosfera. Uma equipe de engenharia própria garante a segurança de cada projeto.',
  futuro: 'Com milhares de projetos instalados em todo o Mato Grosso do Sul, a Techsol continua crescendo. Cada sistema instalado é uma vitória contra o desperdício e um passo em direção a um futuro mais inteligente e sustentável.',
  citacao: { t: 'Quando o cliente vê a primeira fatura após a instalação, ele entende o poder do sol.', quem: 'Victor, gerente da Techsol' },
};

export const fotos = {
  fachada: ['fachada.webp', 1024, 683, 'Fachada da Techsol na Av. Ceará, 1039, Jardim dos Estados'],
  'garagem-solar': ['garagem-solar.webp', 1024, 683, 'Garagem solar instalada pela Techsol na sede'],
  'frama-aerea': ['frama-aerea.webp', 1024, 576, 'Vista aérea do Frama Atacadista com sistema de energia solar instalado pela Techsol'],
  telhado: ['telhado.webp', 1920, 899, 'Casa com painéis solares no telhado'],
  'campo-solar': ['campo-solar.webp', 1940, 826, 'Campo de painéis solares'],
  'usina-solo': ['usina-solo.webp', 1600, 1200, 'Usina solar em solo', 'Foto: USDA, CC BY-SA (banco de imagens)'],
  instalacao: ['instalacao.webp', 1024, 683, 'Instalador carregando um painel solar', 'Foto: National Park Service, domínio público (banco de imagens)'],
  'painel-grama': ['painel-grama.webp', 720, 790, 'Painel solar sobre grama com a marca Techsol'],
};
