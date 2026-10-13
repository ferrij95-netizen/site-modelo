// Textos do site da BM Soluções em Aços, tirados do site atual (bmsolucoesemacos.com.br) em 2026-10-10.
// As especificações (alturas, fios, malhas, espessuras) são as mesmas das páginas de produto de hoje.

const PDF = 'https://bmsolucoesemacos.com.br/wp-content/uploads';

export const site = {
  nome: 'BM Soluções em Aços',
  razao: 'BM Soluções em Aços Ltda.',
  dominio: 'https://bmsolucoes.overtus.com.br',
  fundacao: 2001,
  fone: '(51) 3034-4246', foneHref: '+555130344246',
  zapTxt: '(51) 9.9634-8662', zap: '5551996348662',
  email: 'bm@bmsolucoesemacos.com.br',
  endereco: 'Rua Marques de Olinda, 360/380',
  bairro: 'São José, Canoas/RS',
  cep: '92420-580',
  horario: ['Segunda a sexta', 'Das 08h às 12h e das 13h às 17h48'],
  mapa: 'https://maps.google.com/maps?q=R.%20Marqu%C3%AAs%20de%20Olinda%2C%20360%20-%20S%C3%A3o%20Jos%C3%A9%20Canoas%20-%20RS%2092420-580&t=m&z=15&output=embed&iwloc=near',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Rua+Marques+de+Olinda+360+S%C3%A3o+Jos%C3%A9+Canoas+RS',
  redes: [['Facebook', 'https://www.facebook.com/bmsolucoesemacos', 'bmsolucoesemacos'], ['Instagram', 'https://www.instagram.com/bm.solucoesemacos/', '@bm.solucoesemacos']],
  atual: 'https://bmsolucoesemacos.com.br/',
};
export const anos = 2026 - site.fundacao;

// Título e descrição de cada página (SEO e Open Graph).
export const paginas = {
  index: ['BM Soluções em Aços · Aço carbono e inox, corte a laser e telas em Canoas/RS', 'Distribuição de aço carbono e inox, corte a laser, chapas expandidas, conexões e fabricação e instalação de telas. Desde 2001 em Canoas/RS.'],
  sobre: ['Sobre a BM Soluções em Aços · Desde 2001', 'Há mais de 20 anos no mercado de comercialização de aço, corte a laser e fabricação e instalação de telas, em Canoas/RS.'],
  produtos: ['Produtos · BM Soluções em Aços', 'Corte a laser, telas, chapas expandidas, conexões, arames, comercialização de aço, concertinas e sistemas para suinocultura.'],
  'produtos/corte-a-laser': ['Corte a laser · BM Soluções em Aços', 'Corte a laser de aço carbono, galvanizado e inox, peça única ou grandes lotes. Mesa de até 1500 x 3000 mm.'],
  'produtos/telas': ['Telas e gradis · BM Soluções em Aços', 'Telas soldadas, telas em rolo, gradis NR12, galvanizados, com pintura epóxi e revestidos em PVC, alambrado e tela otis.'],
  'produtos/chapas-expandidas': ['Chapas expandidas · BM Soluções em Aços', 'Chapas expandidas pretas e galvanizadas, malhas de 5x10 a 50x100, com catálogo completo.'],
  'produtos/conexoes': ['Conexões · BM Soluções em Aços', 'Conexões galvanizadas, em aço carbono e em aço inox, flanges, válvulas e acessórios para corrimão.'],
  'produtos/arames': ['Arames · BM Soluções em Aços', 'Arame farpado, arame galvanizado e arame revestido.'],
  'produtos/comercializacao-de-aco': ['Comercialização de aço · BM Soluções em Aços', 'Aço carbono, aço inox e aços especiais: barras, tubos, chapas e perfis.'],
  'produtos/concertinas': ['Concertinas · BM Soluções em Aços', 'Concertinas simples e clipadas, concertina flat, rede laminada e lança "V" para muro.'],
  'produtos/suinocultura': ['Sistemas para suinocultura · BM Soluções em Aços', 'Sistemas para suinocultura e comedouro Spotfeeder, com catálogo completo.'],
  obras: ['Obras · BM Soluções em Aços', 'Algumas das obras realizadas pela BM Soluções em Aços: cercamentos, gradis, quadras, guarda-corpos e galpões.'],
  contato: ['Contato · BM Soluções em Aços', 'Rua Marques de Olinda, 360/380, São José, Canoas/RS. (51) 3034-4246 · WhatsApp (51) 9.9634-8662.'],
};

export const menu = [['index', 'Início'], ['sobre', 'Sobre'], ['produtos', 'Produtos'], ['obras', 'Obras'], ['contato', 'Contato']];

export const inicio = {
  slides: [
    ['banner-inox', 'Distribuição de aço', 'Aço carbono e inox para a sua obra', 'Tubos, barras, chapas, perfis e conexões com pronta entrega em Canoas/RS.', 'produtos/comercializacao-de-aco'],
    ['banner-laser', 'Corte a laser', 'Precisão e qualidade que você precisa', 'Peça única ou grandes lotes em aço carbono, galvanizado e inox, em mesa de até 1500 x 3000 mm.', 'produtos/corte-a-laser'],
    ['banner-chapa', 'Chapa expandida', 'Chapas expandidas pretas e galvanizadas', 'Malhas de 5x10 a 50x100, com catálogo completo para escolher a medida certa.', 'produtos/chapas-expandidas'],
    ['banner-telas-oficina', 'Fábrica de telas', 'Fabricação e instalação de telas', 'Telas soldadas, alambrado, gradis e concertinas para cercar casas, indústrias, quadras e áreas rurais.', 'produtos/telas'],
    ['banner-carbono', 'Conexões', 'Conexões, flanges e válvulas', 'Galvanizadas, em aço carbono e em aço inox, para solda, rosca e padrão OD.', 'produtos/conexoes'],
  ],
  especialidades: [
    ['esp-laser', 'Corte a laser', 'produtos/corte-a-laser'],
    ['esp-chapa', 'Chapa expandida', 'produtos/chapas-expandidas'],
    ['esp-telas', 'Fábrica de telas', 'produtos/telas'],
    ['esp-aco', 'Distribuição de aço', 'produtos/comercializacao-de-aco'],
    ['esp-conexoes', 'Conexões', 'produtos/conexoes'],
  ],
  sobre: [
    'Atuamos no mercado de distribuição de aço carbono e inox, serviço de corte a laser, fabricação e instalação de telas e desenvolvimento de projetos, entregando serviços com qualidade e comprometimento.',
    'O nosso principal diferencial é fornecer as soluções mais completas para cada demanda, com os nossos mais diversificados produtos e serviços.',
    'Além disso, todas as nossas especialidades seguem os padrões de segurança conforme as normas de fabricação.',
  ],
};

// Os cinco diferenciais da home atual, com os ícones de lá.
export const diferenciais = [
  ['comprometimento', 'Comprometimento'],
  ['qualidade', 'Qualidade'],
  ['custo-beneficio', 'Custo-benefício'],
  ['agilidade', 'Agilidade na entrega'],
  ['solucao', 'Solução'],
];

export const sobre = {
  textos: [
    'Para quem não nos conhece, estamos no mercado de comercialização de aço, fabricação de tela e instalação há mais de 20 anos, desde agosto de 2001.',
    'Contamos com uma equipe de profissionais especializados e experientes, dando suporte para que cada demanda seja realizada de forma eficiente e com agilidade.',
    'Com excelência na comercialização e no corte a laser de aço e na fabricação e instalação de telas, nosso time tem a solução que você precisa. Conte conosco!',
  ],
  frase: 'Nós temos a solução que você precisa!',
  areas: [
    ['Construcao-civil', 'Construção civil'], ['Petroquimica', 'Petroquímica'], ['Industria', 'Indústria'], ['Agroalimentar', 'Agroalimentar'],
    ['Metalomecanica', 'Metalmecânica'], ['Infraestrutura', 'Infraestrutura'], ['Industria-da-Saude', 'Indústria da saúde'], ['Estrutura', 'Estrutura'],
  ],
};

// Linhas de produto (menu Produtos do site atual + Sistemas para Suinocultura, que aparece na página Produtos).
export const produtos = [
  { slug: 'corte-a-laser', nome: 'Corte a laser', foto: 'laser-chapa', mini: 'prod-laser', resumo: 'Corte de aço carbono, galvanizado e inox com alta precisão, de peça única a grandes lotes.' },
  { slug: 'telas', nome: 'Telas', foto: 'telas-rolos', mini: 'esp-telas', resumo: 'Fabricação e comércio de telas soldadas, telas em rolo, gradis, alambrado e tela otis.' },
  { slug: 'chapas-expandidas', nome: 'Chapas expandidas', foto: 'banner-chapa', mini: 'prod-chapas', resumo: 'Chapas pretas e galvanizadas em malhas de 5x10 a 50x100, para pisos, grades e fechamentos.', pdf: `${PDF}/2025/05/CATALOGO-CHAPAS-EXPANDIDAS-BM-SOLUCOES-EM-ACOS.pdf` },
  { slug: 'conexoes', nome: 'Conexões', foto: 'conexoes-mesa', mini: 'prod-conexoes', resumo: 'Conexões galvanizadas, em aço carbono e em inox, flanges, válvulas e acessórios para corrimão.' },
  { slug: 'arames', nome: 'Arames', foto: 'arame-farpado-rolos', mini: 'prod-arames', resumo: 'Arame farpado, arame galvanizado e arame revestido.' },
  { slug: 'comercializacao-de-aco', nome: 'Comercialização de aço', foto: 'banner-carbono', mini: 'prod-aco', resumo: 'Aço carbono, aço inox e aços especiais: barras, tubos, chapas e perfis.' },
  { slug: 'concertinas', nome: 'Concertinas', foto: 'concertina-muro', mini: 'prod-concertinas', resumo: 'Concertinas simples e clipadas, concertina flat, rede laminada e lança "V" para muro.' },
  { slug: 'suinocultura', nome: 'Sistemas para suinocultura', foto: 'spotfeeder', mini: 'suinos', resumo: 'Sistemas para suinocultura e o comedouro Spotfeeder.', pdf: `${PDF}/2024/09/Catalogo-BM-pt-br.pdf` },
];

export const laser = {
  vantagens: [
    ['Adequado para diversos tipos de materiais', 'Nenhuma outra tecnologia é capaz de cortar tamanha variedade de materiais orgânicos e inorgânicos.'],
    ['Dispensa pós-processamento', 'O corte a laser é um processo de separação que dispensa o pós-processamento em muitos casos. Em tecidos sintéticos e carpetes, o laser também sela as bordas e evita o desfiamento.'],
    ['Alta precisão', 'O corte resultante é pouco maior que o feixe de laser em si, o que permite cortar qualquer geometria com alta precisão. Câmeras integradas compensam desalinhamentos e distorções da arte.'],
    ['Não há desgaste de ferramentas', 'As máquinas de corte a laser não estão sujeitas a desgastes, como o de rebolos, o que contribui para economizar custos de operação.'],
  ],
  materiais: [['material-carbono', 'Aço carbono', 16], ['material-galvanizado', 'Aço galvanizado', null], ['material-inox', 'Aço inox', 10], ['material-aluminio', 'Alumínio', 4]],
  servicos: 'Cortes, peças, produtos e personalizações, em peça única ou em grandes lotes.',
  orcamento: 'O orçamento é feito com base no tempo de máquina e no custo do material. Para simular o tempo e calcular o material, precisamos do arquivo vetorial da peça. O principal formato aceito é o .DXF.',
  etapas: [
    ['Envie o arquivo', 'Mande o desenho da peça em .DXF pelo WhatsApp ou por e-mail, com material, espessura e quantidade.'],
    ['Simulação', 'Simulamos o tempo de máquina e calculamos o material a partir do arquivo vetorial.'],
    ['Orçamento', 'Você recebe o valor com base no tempo de corte e no custo do material.'],
    ['Corte e entrega', 'A peça é cortada na nossa mesa de até 1500 x 3000 mm e fica pronta para retirada ou entrega.'],
  ],
  semArquivo: [
    ['Consultoria simples', 'Para peças fáceis de vetorizar, que não exigem precisão milimétrica: silhuetas, imagens de alto contraste e desenhos simples. Geralmente remota, cobrada por vetor.'],
    ['Desenvolvimento de produto', 'Para peças de extrema precisão ou produtos criados do zero. Geralmente presencial, cobrada pelo tempo de desenvolvimento e prototipagem.'],
  ],
  mesa: '1500 x 3000 mm',
};

const alturas5 = '1,00 · 1,20 · 1,50 · 1,80 · 2,00 m';
const alturasGradil = '1,03 · 1,53 · 2,03 · 2,43 m';
export const telas = {
  grupos: [
    ['soldadas', 'Telas soldadas'], ['rolo', 'Telas em rolo'], ['gradis', 'Gradis'], ['alambrado', 'Alambrado e otis'],
  ],
  itens: [
    { g: 'soldadas', foto: 'tela-soldada-5x10', nome: 'Tela soldada 5x10 fio 1,9 mm', specs: [['Alturas', alturas5], ['Comprimento', '25 metros lineares'], ['Fio', '1,90 mm'], ['Malha', '5 x 10 cm']],
      usos: ['Cercamento residencial', 'Contenção de animais de pequeno e médio porte', 'Estruturas metálicas', 'Jardins', 'Serralheria'], nao: ['Áreas de alta segurança', 'Quadras esportivas e locais de alto impacto', 'Cães grandes ou agressivos'] },
    { g: 'soldadas', foto: 'tela-soldada-5x15', nome: 'Tela soldada 5x15 fio 2,3 mm', specs: [['Alturas', alturas5], ['Comprimento', '25 metros lineares'], ['Fio', '2,30 mm'], ['Malha', '5 x 15 cm']],
      usos: ['Cercamento residencial, industrial e rural', 'Condomínios', 'Estacionamentos'], nao: ['Áreas de alta segurança', 'Quadras esportivas e locais de alto impacto', 'Cães grandes ou agressivos'] },
    { g: 'soldadas', foto: 'tela-pvc', nome: 'Tela soldada revestida em PVC 5x10', specs: [['Alturas', alturas5], ['Comprimento', '25 metros lineares'], ['Fio', '2,30 mm'], ['Cores', 'Verde; outras cores sob consulta']],
      usos: ['Cercamento residencial', 'Jardins e áreas de lazer', 'Divisão de áreas com acabamento colorido'] },
    { g: 'rolo', foto: 'tela-viveiro', nome: 'Tela viveiro', specs: [['Alturas', '0,60 · 0,80 · 1,00 · 1,20 · 1,50 m'], ['Comprimento', '50 m'], ['Fio', '0,56 mm'], ['Malha', '1,2 x 1,2 cm']],
      usos: ['Viveiros e galinheiros', 'Divisórias para animais', 'Cercamentos baixos', 'Reforço de reboco'] },
    { g: 'rolo', foto: 'tela-galinheiro', nome: 'Tela galinheiro', specs: [['Alturas', '1,20 · 1,50 · 1,80 m'], ['Comprimento', '50 m'], ['Fio', '1,24 mm'], ['Malha', '5 x 5 cm']],
      usos: ['Galinheiros', 'Divisão de terrenos', 'Proteção de áreas', 'Cercamento para aves e animais silvestres'] },
    { g: 'rolo', foto: 'tela-mangueirao', nome: 'Tela mangueirão', specs: [['Alturas', '0,60 · 0,80 · 1,00 · 1,20 · 1,50 · 1,80 m'], ['Comprimento', '50 m'], ['Fio', '1,65 mm'], ['Malha', '7,5 x 7,5 cm']],
      usos: ['Divisão de terrenos', 'Cercamento para ovinos, suínos, avestruzes e animais silvestres', 'Construção em geral'] },
    { g: 'rolo', foto: 'tela-fachanet', nome: 'Tela fachanet reboco', specs: [['Alturas', '0,50 · 1,00 m'], ['Comprimento', '25 m'], ['Fio', '1,24 mm'], ['Malha', '2,5 x 2,5 cm']],
      usos: ['União de concreto e alvenaria', 'Reforço de reboco', 'Recintos para pequenos animais e gaiolas', 'Cercamentos em geral'] },
    { g: 'rolo', foto: 'tela-multy', nome: 'Tela multy uso', specs: [['Alturas', '1,00 · 1,50 m'], ['Comprimento', '25 m'], ['Fio', '1,65 mm'], ['Malha', '5 x 5 cm']],
      usos: ['Cercamento de jardins', 'Cercamento residencial', 'Proteção de grades', 'Confecção de gaiolas'] },
    { g: 'gradis', foto: 'gradil-nr12', nome: 'Gradil NR12', specs: [['Alturas', '1,53 · 2,03 m'], ['Comprimento do painel', '2,50 m'], ['Fio', '4,00 mm'], ['Malha', '2,5 x 20 cm'], ['Cores', 'Preto ou amarelo']],
      usos: ['Proteção de máquinas e equipamentos industriais (NR12)', 'Estruturas metálicas, grades e portões'] },
    { g: 'gradis', foto: 'gradil-galvanizado', nome: 'Gradil galvanizado', specs: [['Alturas', alturasGradil], ['Comprimento do painel', '2,50 m'], ['Fio', '3,80 ou 4,50 mm'], ['Malha', '5 x 20 cm']],
      usos: ['Fechamento de residências, terrenos e indústrias', 'Canis', 'Contenção de animais de grande porte', 'Serralheria'] },
    { g: 'gradis', foto: 'gradil-epoxi', nome: 'Gradil com pintura epóxi', specs: [['Alturas', alturasGradil], ['Comprimento do painel', '2,50 m'], ['Fio', '4,00 ou 4,80 mm'], ['Malha', '5 x 20 cm'], ['Cores', 'Preto, branco, verde, azul ou amarelo']],
      usos: ['Fechamento de residências, terrenos e indústrias', 'Canis', 'Contenção de animais de grande porte', 'Serralheria'] },
    { g: 'gradis', foto: 'gradil-pvc', nome: 'Gradil com revestimento em PVC', specs: [['Alturas', alturasGradil], ['Comprimento do painel', '2,50 m'], ['Fio', '4,30 ou 5,10 mm'], ['Malha', '5 x 20 cm'], ['Cores', 'Verde, branco, preto ou azul']],
      usos: ['Fio de aço eletrossoldado e galvanizado a fogo', 'Revestimento em PVC de alta aderência, 250 mícrons'] },
    { g: 'alambrado', foto: 'tela-alambrado', nome: 'Tela alambrado', malha: 'malha-alambrado', pdf: `${PDF}/2024/07/CATALOGO-TELA-ALAMBRADO.pdf`, texto: 'Arame galvanizado ou revestido, entrelaçado, flexível e durável.',
      usos: ['Quadras esportivas', 'Canis', 'Cercamento residencial, comercial, industrial e rural'] },
    { g: 'alambrado', foto: 'tela-otis', nome: 'Tela otis', malha: 'malha-otis', pdf: `${PDF}/2024/07/CATALOGO-TELA-OTIS.pdf`, texto: 'Arame galvanizado ou revestido em PVC, ondulado, com malha quadrada.',
      usos: ['Cercas e portões', 'Perímetros industriais', 'Proteção de máquinas (NR12)', 'Guarda-corpos'] },
  ],
  // Tabela de bitolas das páginas de alambrado e otis (fio 18 a fio 8).
  bitolas: [['18', '1,24'], ['16', '1,65'], ['14', '2,11'], ['12', '2,77'], ['10', '3,40'], ['8', '4,19']],
};

export const chapas = {
  intro: 'A chapa expandida tem muitas aplicações, por isso é preciso saber calcular as suas dimensões para escolher o material certo para cada projeto. O principal cuidado é a adequação ao estado-limite, ou seja, à resistência mecânica do material: uma malha mais aberta pode servir para uma grade, mas não para um piso, que se deformaria com o tráfego de pessoas. Medir corretamente evita desperdício, custo desnecessário e retrabalho.',
  medidas: [
    ['A', 'Abertura da malha, de centro a centro, na diagonal menor'], ['A1', 'Abertura interna da malha'], ['B', 'Comprimento da malha, de centro a centro, na diagonal maior'],
    ['B1', 'Comprimento interno da malha'], ['C', 'Cordão da malha'], ['D', 'Cruzeta (união de duas malhas)'], ['E', 'Espessura do material'], ['E1', 'Espessura da cruzeta'],
    ['SC', 'Sentido transversal'], ['SL', 'Sentido longitudinal'],
  ],
  // Malha: [preta, galvanizada] em mm, como na página atual.
  malhas: [
    ['5x10', 'malha-5x10', ['0,75', '0,90'], ['0,95']],
    ['8x16', 'malha-8x16', ['1,20'], ['1,25']],
    ['9x20', 'malha-9x20', ['0,90', '1,20'], []],
    ['12x25', 'malha-12x25', ['1,20', '1,50', '1,90', '3,17'], ['1,25', '1,55', '1,95']],
    ['25x50', 'malha-25x50', ['1,90', '3,17', '4,75', '6,35'], ['1,95', '3,17']],
    ['38x75', 'malha-38x75', ['1,90', '3,17', '4,75', '6,35'], ['1,95']],
    ['50x100', 'malha-50x100', ['3,17', '4,75', '6,35', '7,94'], []],
  ],
};

export const conexoes = [
  ['con-galvanizadas', 'Conexões galvanizadas'], ['con-carbono', 'Conexões em aço carbono'], ['con-inox-solda', 'Conexões em aço inox para solda'],
  ['con-inox-od', 'Conexões em aço inox padrão OD'], ['con-inox-rosca', 'Conexões em aço inox roscadas'], ['con-flanges', 'Flanges em aço inox e carbono'],
  ['con-valvulas', 'Válvulas'], ['con-corrimao', 'Acessórios para corrimão'],
];

export const arames = [
  ['arame-farpado', 'Arame farpado', 'Para cercas rurais, divisas e reforço de segurança em muros.'],
  ['arame-galvanizado', 'Arame galvanizado', 'Para amarração, cercamentos e uso geral na obra e no campo.'],
  ['arame-revestido', 'Arame revestido', 'Arame com revestimento colorido, para alambrados e cercas com acabamento.'],
];

export const aco = {
  materiais: [['material-carbono', 'Aço carbono'], ['material-inox', 'Aço inox'], ['material-galvanizado', 'Aços especiais']],
  familias: [
    ['Barras', ['Redondas', 'Quadradas', 'Laminadas', 'Trefiladas']],
    ['Tubos', ['Linha industrial', 'Padrão SCH', 'Padrão DIN']],
    ['Chapas', ['Chapas', 'Chapa xadrez']],
    ['Perfis', ['Barra chata', 'Cantoneiras', 'Vigas I, U, W e H']],
  ],
};

export const concertinas = {
  intro: 'Nossas concertinas são produzidas com alta tecnologia, para máxima segurança e durabilidade, em aço de alta qualidade, e podem ser adaptadas às necessidades de cada cliente.',
  tipos: [
    ['concertina-simples-30', 'Concertina simples', '30 cm', [['Metragem sugerida', '8 a 10 m'], ['Espaçamento', '20 ou 25 cm']]],
    ['concertina-simples-45', 'Concertina simples', '45 cm', [['Metragem sugerida', '10 m'], ['Espaçamento', '25 cm']]],
    ['concertina-dupla-30', 'Concertina clipada "dupla"', '30 cm', [['Metragem sugerida', '4 a 5 m'], ['Clipes', '3 por volta']]],
    ['concertina-dupla-45', 'Concertina clipada "dupla"', '45 cm', [['Metragem sugerida', '5 m'], ['Clipes', '3 por volta']]],
  ],
  galeria: ['concertina-muro', 'concertina-arcos', 'concertina-curva', 'concertina-tunel'],
  outros: [
    ['concertina-flat', 'Concertina flat', 'Painéis planos soldados, nos diâmetros 30 e 45. Vendida por metro.', ['concertina-flat-2', 'concertina-flat-3']],
    ['rede-laminada', 'Rede laminada', 'Rede de lâminas cortantes para fechamento de muros e cercas.', ['rede-laminada-2']],
    ['lanca-v', 'Lança "V" para muro', 'Lanças perfurantes em "V" para o topo de muros.', ['lanca-v-2', 'lanca-v-3']],
  ],
};

export const suinocultura = {
  pdfs: [['Catálogo completo', `${PDF}/2024/09/Catalogo-BM-pt-br.pdf`], ['Catálogo Spotfeeder', `${PDF}/2024/09/Spotfeeder-BM-Pt-BR.pdf`]],
};

export const obras = {
  destaques: [['obra-cerca-branca', 'Cercamento com gradil'], ['obra-cerca-verde', 'Gradil com revestimento verde'], ['obra-guarda-corpo', 'Guarda-corpo pintado'], ['obra-galpao', 'Fechamento de galpão'], ['obra-quadra', 'Cercamento de quadra']],
  outras: Array.from({ length: 10 }, (_, i) => `obra-${i + 1}`),
};
