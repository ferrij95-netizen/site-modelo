// Textos e dados da Mecânica Meier, tirados do site atual (mecanicameier.com.br: Home, Empresa, Serviços, Fotos, Contato)
// e da ficha do Google (nota e avaliações em 21/10/2026). Acentuação e grafia revisadas.
export const empresa = {
  nome: 'Mecânica Meier',
  razao: 'Auto Mecânica e Comércio de Peças Adelino Meier Ltda',
  url: 'https://mecanicameier.overtus.com.br/',
  antigo: 'http://www.mecanicameier.com.br/',
  fone: '(47) 3425-1193', foneHref: '+554734251193',
  fone2: '(47) 3425-4250', fone2Href: '+554734254250',
  wa: '554734251193', // a confirmar se o número fixo tem WhatsApp
  rua: 'Rua Frederico Schlemm, 58',
  bairro: 'Bom Retiro',
  cidade: 'Joinville · SC',
  cep: '89222-150',
  referencia: 'Lateral da Rua Xanxerê',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Auto+Mec%C3%A2nica+Adelino+M%C3%A9ier+Rua+Frederico+Schlemm+58+Joinville',
  mapaEmbed: 'https://maps.google.com/maps?q=-26.2707626,-48.8430314&z=16&output=embed',
  google: { nota: '4,6', avaliacoes: 169, frase: 'Mecânicos excelentes e atendimento excepcional.' },
  slogan: 'Desde 1990 com tradição e qualidade',
  lema: 'Seu patrimônio sob nossa responsabilidade',
};

export const missao = 'A Mecânica Meier tem por objetivo priorizar a segurança e a satisfação do cliente por meio da qualidade.';
export const visao = ['Ser líder em qualidade na área de reparação automotiva de veículos importados, nacionais e antigos.', 'Ser reconhecida no atendimento personalizado ao cliente.'];

// Página Empresa do site atual, em ordem.
export const historia = [
  { ano: '1968–1990', titulo: 'Precisão na casa dos mícrons', texto: 'Adelino Meier trabalhou 22 anos numa indústria metal-mecânica de Joinville que fabricava motores e compressores para refrigeração. Com a precisão exigida, na casa dos mícrons, foi ferramenteiro, supervisor e chefe de ferramentaria.' },
  { ano: 'SENAI', titulo: 'O sonho de voar mais alto', texto: 'Apesar do bom emprego, cursou Mecânica Automotiva no SENAI para fundar a própria empresa.' },
  { ano: '1990', titulo: 'Nasce a Auto Mecânica Adelino Meier', texto: 'Idealizada por Adelino Meier e seus filhos: uma empresa familiar, com sede própria no Bom Retiro.' },
  { ano: 'Anos 90', titulo: 'Estudo na Europa', texto: 'Com a importação oficial de veículos, a equipe aprimorou injeção eletrônica, câmbio automático e Tiptronic, freios ABS, controle de tração, piloto automático, scanner e módulos, com cursos, visitas e estágios na Audi, Porsche, VW, Mercedes e BMW.' },
  { ano: 'Hoje', titulo: '11 pessoas, do engenheiro ao escritório', texto: 'A equipe tem mestre engenheiro mecânico e técnicos, e atende automóveis e pick-ups nacionais e importados, além de veículos antigos.' },
];

export const especialidades = [
  { slug: 'cambio', nome: 'Câmbio automático', texto: 'A especialidade da casa: diagnóstico, reparo e troca de óleo de câmbios automáticos e Tiptronic, além de câmbio mecânico, embreagem e diferencial.', foto: 'oficina-bmw' },
  { slug: 'importados', nome: 'Importados', texto: 'Formação na Audi, Porsche, VW, Mercedes e BMW e scanner para os veículos nacionais e importados que rodam no Brasil.', foto: 'porsche-cayenne-3.6-v6' },
  { slug: 'antigos', nome: 'Antigos', texto: 'Conserto e restauração mecânica de clássicos, com restauração de lataria e pintura feita por parceiros.', foto: 'camaro-raiter' },
  { slug: 'nacionais', nome: 'Nacionais', texto: 'Reparo completo de automóveis e pick-ups nacionais, da revisão de óleo e filtros à retífica de motor.', foto: 'meier-9' },
];

// Lista do banner da home e da página Serviços, agrupada.
export const servicos = [
  { grupo: 'Câmbio e transmissão', itens: ['Câmbio automático e Tiptronic', 'Câmbio mecânico', 'Embreagem', 'Transmissão', 'Diferencial'] },
  { grupo: 'Motor e injeção', itens: ['Motor (retífica)', 'Injeção eletrônica e limpeza de bicos', 'Carburação', 'Sistema de refrigeração'] },
  { grupo: 'Óleo, fluidos e filtros', itens: ['Super troca de óleo: motor, câmbio mecânico e automático, diferencial', 'Fluido de freio, aditivo e radiador', 'Filtros: óleo do motor, gasolina, flex, diesel e cabine'] },
  { grupo: 'Freios, suspensão e direção', itens: ['Freios (ABS)', 'Suspensão', 'Direção hidráulica e mecânica', 'Balanceamento'] },
  { grupo: 'Elétrica e diagnóstico', itens: ['Scanner para nacionais e importados', 'Avaliação técnica de veículos', 'Elétrica (parcial)', 'Alternador e baterias', 'Air-bag', 'Anti-furto e alarme', 'Ar-condicionado (parcial)'] },
  { grupo: 'Antigos, peças e cuidado', itens: ['Restauração mecânica de veículos antigos', 'Comércio de peças', 'Acessórios', 'Higienização'] },
];
// "Administramos": serviços feitos com parceiros, coordenados pela Meier.
export const administramos = ['Geometria', 'Escapamentos', 'Rodas e pneus', 'Lataria e pintura', 'Restauração de lataria e pintura de antigos', 'Estofamentos em geral', 'Conserto de portas', 'Vidros', 'Martelinho de ouro', 'Inspeção automotiva', 'Guincho', 'Películas'];

// Listas do banner da home do site atual (esquerda e direita da foto do motor).
export const bannerEsq = ['Troca de óleo', 'Troca de fluidos', 'Troca de filtros', 'Suspensão', 'Direção hidráulica x mecânica', 'Freios (ABS)', 'Motor (retífica)', 'Embreagem', 'Câmbio automático', 'Injeção eletrônica', 'Scanner nacionais x importados'];
export const bannerDir = ['Elétrica (parcial)', 'Sistema de refrigeração', 'Carburação', 'Transmissão', 'Diferencial', 'Restauração mecânica', 'Air-bag', 'Avaliação técnica', 'Comércio de peças', 'Baterias e alternador', 'Balanceamento'];

export const marcas = [
  ['chevrolet', 'Chevrolet'], ['volkswagen', 'Volkswagen'], ['bmw', 'BMW'], ['landrover', 'Land Rover'], ['audi', 'Audi'], ['toyota', 'Toyota'],
  ['citroen', 'Citroën'], ['suzuki', 'Suzuki'], ['fiat', 'Fiat'], ['alfaromeu', 'Alfa Romeo'], ['nissan', 'Nissan'], ['chrysler', 'Chrysler'],
  ['peugeot', 'Peugeot'], ['ferrari', 'Ferrari'], ['kia', 'Kia'], ['honda', 'Honda'], ['renault', 'Renault'], ['ford', 'Ford'],
  ['mercedes', 'Mercedes-Benz'], ['mitsubishi', 'Mitsubishi'], ['volvo', 'Volvo'], ['porsche', 'Porsche'], ['hyundai', 'Hyundai'],
];

// Fotos da página Fotos do site atual (nome do arquivo, legenda, grupo). Legendas pelos nomes dos arquivos e pelo que aparece na foto.
export const fotos = [
  ['porsche-cayenne-3.6-v6', 'Porsche Cayenne 3.6 V6', 'importados'], ['mercedes-c180-kompressor', 'Mercedes-Benz C180 Kompressor', 'importados'],
  ['bmw-x5-8-c', 'BMW X5 no elevador', 'importados'], ['audi-a3', 'Audi A3', 'importados'], ['bmw-330i', 'BMW 330i', 'importados'],
  ['bmw-x3', 'BMW X3', 'importados'], ['mercedes', 'Mercedes-Benz', 'importados'], ['300-c', 'Chrysler 300C', 'importados'],
  ['bmw-325-frente', 'BMW 325i', 'importados'], ['bmw-120i', 'BMW 120i', 'importados'], ['bmw-328i', 'BMW 328i', 'importados'],
  ['mercedes-e55', 'Mercedes-Benz E55', 'importados'], ['edge-v6-frente', 'Ford Edge V6', 'importados'], ['mitsubishi-asx-4wd', 'Mitsubishi ASX 4WD', 'importados'],
  ['jeep-bmw-x5', 'Jeep e BMW X5', 'importados'], ['nissan', 'Nissan 300ZX e Porsche', 'importados'], ['bmw-320i', 'BMW 320i', 'importados'],
  ['bmw-jefo', 'BMW Série 3', 'importados'], ['chrysler-stratus', 'Chrysler Stratus', 'importados'], ['nissan-raiter-2011', 'Nissan 300ZX', 'importados'],
  ['camaro-raiter', 'Chevrolet Camaro', 'antigos'], ['mustang-shelby', 'Ford Mustang Shelby', 'antigos'], ['maverick-raiter', 'Ford Maverick', 'antigos'],
  ['impala', 'Chevrolet Impala', 'antigos'], ['camaro', 'Chevrolet Camaro', 'antigos'], ['maverick-lino', 'Ford Maverick', 'antigos'],
  ['galaxie-2013-lateral', 'Ford Galaxie', 'antigos'], ['maveco', 'Ford Maverick', 'antigos'], ['dodge-raiter', 'Dodge Dart', 'antigos'],
  ['meier-13', 'Jeep Willys', 'antigos'], ['mustang-marcos', 'Ford Mustang', 'antigos'], ['mustangm', 'Ford Mustang', 'antigos'],
  ['mustangv6', 'Ford Mustang V6', 'antigos'], ['mustang', 'Ford Mustang', 'antigos'],
  ['meier-17', 'O galpão da oficina', 'oficina'], ['oficina-bmw', 'BMW na oficina', 'oficina'], ['oficina-jetta-bmw', 'Jetta e BMW na oficina', 'oficina'],
  ['alemaes', 'Pátio da oficina', 'oficina'], ['meier-14', 'Recepção e elevadores', 'oficina'], ['nissan-raiter', 'Nissan 300ZX no box', 'oficina'],
  ['meier-1', 'Audi A4', 'importados'], ['meier-2', 'Renault', 'nacionais'], ['meier-3', 'Fiat Stilo', 'nacionais'], ['meier-4', 'Volkswagen Gol', 'nacionais'],
  ['meier-5', 'Chevrolet', 'nacionais'], ['meier-6', 'Chevrolet Celta', 'nacionais'], ['meier-7', 'Volkswagen Jetta', 'nacionais'],
  ['meier-8', 'Volkswagen Gol', 'nacionais'], ['meier-9', 'Volkswagen Fox', 'nacionais'], ['meier-10', 'Chevrolet Celta', 'nacionais'],
  ['meier-11', 'Ford Fusion', 'nacionais'], ['meier-12', 'Renault Duster', 'nacionais'], ['meier-15', 'Hyundai Veloster', 'importados'], ['meier-16', 'Peugeot', 'importados'],
];
export const gruposFotos = { importados: 'Importados', antigos: 'Antigos', nacionais: 'Nacionais', oficina: 'A oficina' };
