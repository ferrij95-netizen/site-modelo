// Textos e catálogos do Grupo Bioplast, tirados do site atual (bioplast.com.br) e dos folders publicados nele.
// Códigos e descrições copiados dos folders (Laboratórios, Biovin, PartyParts); acentuação corrigida.

export const empresa = {
  nome: 'Grupo Bioplast',
  razao: 'Bioplast Ind. e Com. de Plásticos Ltda.',
  url: 'https://bioplast.overtus.com.br/',
  antigo: 'http://www.bioplast.com.br/',
  fundacao: 1992,
  fone: '(51) 3344-3354', foneHref: '+555133443354',
  fone2: '(51) 3344-1194', fone2Href: '+555133441194',
  whats: '(51) 99186-6725', wa: '5551991866725',
  email: 'bioplast@bioplast.com.br', vendas: 'vendas@bioplast.com.br', emailBiovin: 'contato@biovin.com.br',
  endereco: ['Rua Eng. João Luderitz, 495', 'Bairro Sarandi · CEP 91130-050', 'Porto Alegre · RS · Brasil'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Engenheiro+Jo%C3%A3o+Luderitz%2C+495%2C+Porto+Alegre+RS',
  slogan: 'Injetando Conceitos',
};

export const textos = {
  chamada: 'Produtos, projetos, peças e serviços de injeção plástica',
  quem: 'A Bioplast é uma empresa de capital totalmente brasileiro, fundada em 1992 na cidade de Porto Alegre (RS), voltada exclusivamente à fabricação e à comercialização de produtos para laboratórios em geral.',
  quem2: 'Alguns anos mais tarde, percebendo a necessidade de diversificar sua produção e visualizando a crescente evolução do plástico no Brasil e no mundo, a empresa iniciou, paralelamente, a fabricação de peças técnicas injetadas, bem como o desenvolvimento de produtos para terceiros. Depois vieram duas novas linhas: a Biovin, com acessórios para vinhos e espumantes, e a PartyParts, com artigos para festas.',
  qualidade: 'Controle de qualidade feito diretamente na produção, identificando e corrigindo eventuais problemas instantaneamente. Isso só é possível graças à mão de obra treinada e qualificada pelo SENAI, o que proporciona segurança e melhoria para o seu produto.',
  pgqp: 'Em 2002 a Bioplast assinou o termo de adesão ao PGQP, Programa Gaúcho da Qualidade e Produtividade. Desde então obtém ótimos resultados nos sistemas de avaliação e é diplomada pelo PGQP.',
  garantia: 'A Bioplast se responsabiliza por todos os seus produtos e se compromete, inclusive, com a sua substituição no caso de eventual defeito de fabricação.',
  lema: 'Produzimos produtos com qualidade, a preços justos, dentro da ética e do respeito, através de muito trabalho, honestidade e disciplina.',
  pecas: 'A Bioplast, por sua experiência, qualidade e conhecimento em injeção de peças, oferece o serviço de desenvolvimento e injeção de peças técnicas para terceiros. Trabalhamos com lotes pequenos ou grandes, de forma contínua ou personalizada. Atendemos a todas as normas e regulamentações vigentes.',
  pecas2: 'Injeção de peças técnicas para diversos segmentos da indústria e utilidades. Polímeros de engenharia de qualquer natureza são a nossa especialidade.',
  desenvolvemos: 'Desenvolvemos sua ideia. Consulte-nos.',
  contato: 'Qualquer dica, sugestão, reclamação ou solicitação de serviço será muito bem-vinda. Estamos à disposição!',
};

// Os quatro mercados (página "Marcas" do site atual).
export const marcas = [
  { slug: 'laboratorios', nome: 'Laboratórios', marca: 'Bioplast', logo: 'logo-lab', curta: 'Produtos para análises clínicas e laboratoriais.',
    texto: 'Com a marca Bioplast, estamos presentes nos laboratórios clínicos, de análises, hospitais, universidades, escolas e outros. Os produtos são feitos com matéria-prima de alta qualidade, respeitando todas as normas e requisitos legais.',
    foto: 'lab/folder-azul-1', cor: '#00A859' },
  { slug: 'biovin', nome: 'Biovin', marca: 'Biovin', logo: 'logo-biovin', curta: 'Acessórios para vinhos e espumantes.',
    texto: 'Com a marca Biovin, estamos presentes nas vinícolas, lojas de vinhos, boutiques de bebidas, mercados, bodegas e lojas. Os produtos se destacam pela qualidade no acabamento, pela resistência, durabilidade e praticidade no uso, e pela personalização conforme a necessidade de cada cliente.',
    foto: 'biovin/escuro-torre', cor: '#7A2E35', slogan: 'Beber com estilo' },
  { slug: 'partyparts', nome: 'PartyParts', marca: 'PartyParts', logo: 'logo-partyparts', curta: 'Produtos para festas, casas noturnas, bares e eventos.',
    texto: 'Com a marca PartyParts, estamos presentes em bares, casas noturnas, festas, eventos e clubes. Os produtos têm grande variação de cores e personalizações, deixando o seu evento muito mais personalizado.',
    foto: 'party/copos-coloridos', cor: '#F28C28', slogan: 'Personalize os momentos!' },
  { slug: 'pecas-tecnicas', nome: 'Peças técnicas', marca: 'Bioplast', logo: 'logo-injetando', curta: 'Injeção e personalização de peças técnicas.',
    texto: textos.pecas, foto: 'pecas/azul', cor: '#006DA0' },
];

export const equipamentos = [
  ['Injetoras com CLP', 'até 500 g de injeção e 220 toneladas de fechamento'],
  ['Tampografia', 'para personalização de peças'],
  ['Torre de resfriamento', 'e unidade de água gelada com ciclo fechado'],
  ['Selador skin', 'para embalagens'],
  ['Desumidificador e estufas', 'para secagem do material'],
  ['Moinho', 'para reaproveitamento de aparas'],
  ['Alimentador automático', 'para materiais'],
  ['Compressor de ar', 'e outros equipamentos de apoio'],
];

export const polimeros = ['PP', 'PEAD', 'PEBD', 'PEBDL', 'PS', 'PSHI', 'ABS', 'SAN', 'EVA', 'TPU', 'PA 6', 'PA 6.6', 'PA 6.6 + FV', 'PC', 'PC + ABS', 'TPE', 'EPDM', 'PMMA', 'POM', 'TR', 'PVC flexível'];
export const polimerosNome = {
  PP: 'Polipropileno', PEAD: 'Polietileno de alta densidade', PEBD: 'Polietileno de baixa densidade', PEBDL: 'Polietileno linear de baixa densidade',
  PS: 'Poliestireno', PSHI: 'Poliestireno de alto impacto', ABS: 'Acrilonitrila butadieno estireno', SAN: 'Estireno acrilonitrila', EVA: 'Etileno acetato de vinila',
  TPU: 'Poliuretano termoplástico', 'PA 6': 'Poliamida 6 (náilon)', 'PA 6.6': 'Poliamida 6.6', 'PA 6.6 + FV': 'Poliamida 6.6 com fibra de vidro', PC: 'Policarbonato',
  'PC + ABS': 'Blenda policarbonato e ABS', TPE: 'Elastômero termoplástico', EPDM: 'Borracha EPDM', PMMA: 'Acrílico', POM: 'Poliacetal', TR: 'Borracha termoplástica', 'PVC flexível': 'Policloreto de vinila',
};

// Folder "Bioplast · Materiais para laboratórios" (numeração do folder).
export const lab = [
  { n: 1, nome: 'Câmara de Mac Master', cat: 'Lâminas e citologia', foto: 'mac-master', desc: 'Lâmina 26 x 76 mm para análises laboratoriais, com reticulado impresso, injetada em poliestireno cristal.', itens: [['2011', 'Câmara de Mac Master']] },
  { n: 2, nome: 'Copos de Becker', cat: 'Medição', foto: 'becker', desc: 'Gravados em silk screen (SC) ou auto relevo (AR). Injetados em polipropileno translúcido autoclavável.', itens: [['2051', 'Capacidade 30 ml, escala graduada em 2,5 ml'], ['2052', 'Capacidade 50 ml, escala graduada em 5 ml'], ['2053', 'Capacidade 100 ml, escala graduada em 5 ml'], ['2054', 'Capacidade 150 ml, escala graduada em 5 ml'], ['2055', 'Capacidade 250 ml, escala graduada em 5 ml'], ['2056', 'Capacidade 400 ml, escala graduada em 10 ml'], ['2057', 'Capacidade 600 ml, escala graduada em 10 ml'], ['2058', 'Capacidade 1000 ml, escala graduada em 50 ml'], ['2059', 'Capacidade 2000 ml, escala graduada em 100 ml']] },
  { n: 3, nome: 'Coletores', cat: 'Coleta', foto: 'coletores', desc: 'Capacidade até 50 ml para fezes, urina etc. Tampa de pressão, corpo em polipropileno autoclavável.', itens: [['2110', 'Transparente com pazinha'], ['2111', 'Opaco com pazinha'], ['2112', 'Transparente sem pazinha'], ['2113', 'Opaco sem pazinha'], ['2114', 'Transparente esterilizado']] },
  { n: 4, nome: 'Coletores universais', cat: 'Coleta', desc: 'Capacidade até 100 ml para fezes, escarro, urina etc. Tampa de rosca com vedação, em polipropileno autoclavável.', itens: [['2600', 'Opaco com pazinha'], ['2605', 'Transparente sem pazinha'], ['2610', 'Transparente esterilizado']] },
  { n: 5, nome: 'Espátulas em aço inox', cat: 'Manuseio', desc: 'Com cabo de madeira.', itens: [['1251', 'Lâmina de 75 mm'], ['1252', 'Lâmina de 100 mm'], ['1253', 'Lâmina de 125 mm'], ['1254', 'Lâmina de 150 mm'], ['1255', 'Lâmina de 180 mm'], ['1256', 'Lâmina de 200 mm']] },
  { n: 6, nome: 'Espátulas em polipropileno', cat: 'Manuseio', foto: 'espatulas-pp2', desc: 'Lâmina e cabo autoclaváveis.', itens: [['1271', 'Lâmina de 75 mm'], ['1272', 'Lâmina de 100 mm'], ['1273', 'Lâmina de 125 mm'], ['1274', 'Lâmina de 150 mm'], ['1275', 'Lâmina de 180 mm'], ['1276', 'Lâmina de 200 mm']] },
  { n: 7, nome: 'Estojo para aparelhos', cat: 'Lâminas e citologia', foto: 'estojo', desc: 'Para móveis, contenções, placa de Hawley, placas ativas, placas de mordida etc.', itens: [['6000', 'Pode ser fornecido em diversas cores']] },
  { n: 8, nome: 'Frascos de Erlenmeyer', cat: 'Medição', desc: 'Em polipropileno translúcido autoclavável, com escalas impressas em silk screen.', itens: [['2125', 'Capacidade 125 ml'], ['2250', 'Capacidade 250 ml'], ['2500', 'Capacidade 500 ml']] },
  { n: 9, nome: 'Frascos para reagentes', cat: 'Frascos e pissetas', foto: 'frascos', desc: 'Uso geral, em polipropileno translúcido autoclavável, com 30 ml de boca, tampa à prova de vazamentos.', itens: [['2900', 'Capacidade 250 ml, sem gravação'], ['2910', 'Capacidade 500 ml, sem gravação'], ['2920', 'Capacidade 1000 ml, sem gravação']] },
  { n: 10, nome: 'Funil em polipropileno', cat: 'Medição', foto: 'funil', desc: 'Uso geral e farmácia de manipulação, capacidade até 250 ml, translúcido.', itens: [['1503', 'Diâmetro 55 mm, altura 110 mm'], ['1504', 'Diâmetro 75 mm, altura 140 mm'], ['1506', 'Diâmetro 100 mm, altura 120 mm']] },
  { n: 11, nome: 'Jarra graduada', cat: 'Medição', desc: 'Jarra de 1000 ml graduada em 125 ml.', itens: [['2068', '1000 ml, graduada em 125 ml']] },
  { n: 12, nome: 'Peras para buretas', cat: 'Pipetagem', foto: 'pera-rabicho', desc: 'Insufladoras, volume de 60 ml, em PVC especial.', itens: [['3861', 'Comum, simples'], ['3871', 'Com rabicho e uma extremidade'], ['3872', 'Com rabicho e duas extremidades']] },
  { n: 13, nome: 'Pipetadores', cat: 'Pipetagem', foto: 'pipetadores', desc: 'Capacidade 60 ml, em PVC especial, adaptável em pipeta até 100 ml.', itens: [['3881', 'Com esferas em aço (cor preta, sob encomenda)'], ['3882', 'Com esferas em polipropileno (cor verde)']] },
  { n: 14, nome: 'Pipetas de transferência (tipo Pasteur)', cat: 'Pipetagem', desc: 'Com graduação, inertes a fluidos biológicos e ácidos.', itens: [['3884', 'Capacidade total de 3,4 ml'], ['3885', 'Capacidade total de 3,4 ml, esterilizada'], ['3886', 'Capacidade total de 7,8 ml'], ['3887', 'Capacidade total de 7,8 ml, esterilizada']] },
  { n: 15, nome: 'Pissetas', cat: 'Frascos e pissetas', foto: 'pissetas', desc: 'Bico reto ou curvo, em polietileno translúcido.', itens: [['2800', 'Sem gravação, capacidade 250 ml'], ['2810', 'Sem gravação, capacidade 500 ml'], ['2820', 'Sem gravação, capacidade 1000 ml'], ['2825', 'Com gravação, capacidade 250 ml'], ['2850', 'Com gravação, capacidade 500 ml']] },
  { n: 16, nome: 'Placas de Petri', cat: 'Lâminas e citologia', desc: 'Diâmetro 94 mm x 16 mm de altura.', itens: [['4100', 'Em poliestireno cristal, descartável'], ['4111', 'Em poliestireno cristal, esterilizada'], ['4112', 'Em polipropileno autoclavável'], ['4113', 'Em poliestireno cristal, com divisão'], ['4114', 'Em poliestireno cristal, com divisão, esterilizada']] },
  { n: 17, nome: 'Porta-lâminas para citologia', cat: 'Lâminas e citologia', foto: 'porta-laminas', desc: 'Em polipropileno autoclavável.', itens: [['4200', 'Para 3 lâminas, com tampa de pressão (altura 80 mm, diâmetro 30 mm)'], ['4400', 'Para 2 lâminas, em forma de estojo (altura 90 mm, largura 70 mm)']] },
  { n: 18, nome: 'Provetas', cat: 'Medição', foto: 'provetas', desc: 'Em polipropileno autoclavável, com graduação em auto relevo.', itens: [['2151', 'Capacidade 10 ml, graduada em 0,1 ml'], ['2152', 'Capacidade 25 ml, graduada em 0,2 ml'], ['2153', 'Capacidade 50 ml, graduada em 2 ml'], ['2154', 'Capacidade 100 ml, graduada em 1 ml'], ['2155', 'Capacidade 250 ml, graduada em 2 ml'], ['2156', 'Capacidade 500 ml, graduada em 5 ml'], ['2157', 'Capacidade 1000 ml, graduada em 10 ml']] },
  { n: 19, nome: 'Bases de proveta', cat: 'Medição', foto: 'bases', desc: 'Em polipropileno, nas cores branco e vermelho.', itens: [['2253', 'Base para proveta de 50 ml'], ['2254', 'Base para proveta de 100 ml'], ['2255', 'Base para proveta de 250 ml'], ['2256', 'Base para proveta de 500 ml'], ['2257', 'Base para proveta de 1000 ml']] },
  { n: 20, nome: 'Rolhas para tubo de ensaio', cat: 'Tubos de ensaio', desc: 'Em borracha termoplástica Santoprene, cônicas.', itens: [['3890', 'Altura 35 mm, diâmetro inferior 5 mm, superior 10 mm'], ['3891', 'Altura 35 mm, diâmetro inferior 10 mm, superior 15 mm'], ['3892', 'Altura 35 mm, diâmetro inferior 15 mm, superior 20 mm'], ['3893', 'Altura 35 mm, diâmetro inferior 20 mm, superior 24 mm'], ['3894', 'Altura 21 mm, diâmetro inferior 12 mm, superior 16 mm'], ['3895', 'Altura 35 mm, diâmetro inferior 14,5 mm, superior 19 mm'], ['3896', 'Altura 35 mm, diâmetro inferior 21 mm, superior 26 mm']] },
  { n: 21, nome: 'Tampas de Kimble', cat: 'Tubos de ensaio', foto: 'kimble', desc: 'Em polipropileno autoclavável, para tubos de ensaio.', itens: [['3812', 'Diâmetro 12 mm'], ['3816', 'Diâmetro 16 mm'], ['3818', 'Diâmetro 18 mm'], ['3820', 'Diâmetro 20 mm'], ['3825', 'Diâmetro 25 mm']] },
];
export const labCats = ['Medição', 'Coleta', 'Pipetagem', 'Frascos e pissetas', 'Lâminas e citologia', 'Tubos de ensaio', 'Manuseio'];

// Folder Biovin.
export const biovin = [
  { nome: 'Corta-gotas (Drip Off) com tampa', grupo: 'Servir', foto: 'corta-gotas', desc: 'Para evitar manchas e respingos de vinho em toalhas. Opções nas cores preta e cromada.', cods: ['4500PR', '4500C', '4500CE'] },
  { nome: 'Corta-gotas prático cristal', grupo: 'Servir', foto: 'corta-gotas-cristal', desc: 'Simples e eficiente: a maneira mais fácil de evitar gotas e respingos.', cods: ['4800AV', '4800'] },
  { nome: 'Corta-gotas com tampa', grupo: 'Servir', foto: 'corta-gotas-tampa', desc: 'Para evitar manchas e respingos de vinho. Em inox com tampa ou especial cromado com tampa.', cods: ['4604A', '4402'] },
  { nome: 'Anel corta-gotas', grupo: 'Servir', foto: 'anel-corta-gotas', desc: 'Para evitar manchas de vinho na mesa. Em metal cromado com feltro lavável.', cods: ['4401'] },
  { nome: 'Aerador com base ou torre', grupo: 'Servir', foto: 'aerador-torre', desc: 'Libera todos os aromas e sabores, fazendo o vinho respirar. Acompanha filtro em aço inox.', cods: ['4411', '4412', '4407'] },
  { nome: 'Aerador corta-gotas', grupo: 'Servir', foto: 'aerador-corta-gotas', desc: 'A forma mais rápida e prática de liberar os aromas e sabores do vinho.', cods: ['4408'] },
  { nome: 'Corta-lacre (Seal Off)', grupo: 'Abrir', foto: 'corta-lacre', desc: 'Retira o lacre do vinho com uniformidade e sem esforço, com rodízios cortantes de alumínio. Cores preta e cromada.', cods: ['4505', '4504', '4504E', '4504CE'] },
  { nome: 'Saca-rolhas dois estágios', grupo: 'Abrir', foto: 'saca-rolhas', desc: 'Espiral em aço teflonado, lâmina para cortar a cápsula e abridor de garrafas. Acabamentos preto e aço escovado.', cods: ['4602', '4602CX', '4602M'] },
  { nome: 'Saca-rolhas especial', grupo: 'Abrir', foto: 'saca-rolhas-especial', desc: 'Desenho robusto e moderno, com 2 estágios e lâmina para cortar a cápsula.', cods: ['4403', '4403CX'] },
  { nome: 'Saca-rolhas reversível', grupo: 'Abrir', foto: 'saca-rolhas-reversivel', desc: 'Retira as rolhas de forma prática e sem esforço. Corpo em ABS com espiral em aço polido.', cods: ['4404'] },
  { nome: 'Saca-rolhas para espumantes', grupo: 'Abrir', foto: 'saca-rolhas-espumante', desc: 'A maneira mais fácil de abrir espumantes e tampas de rosca em geral.', cods: ['4610'] },
  { nome: 'Chaveiro abridor', grupo: 'Abrir', foto: 'chaveiro-foto', desc: 'Para garrafas tipo long neck e latas de bebidas. Em formato de garrafa e de lata.', cods: ['4606G', '4606L', '4605'] },
  { nome: 'Tampa para espumantes (Slip On)', grupo: 'Conservar', foto: 'tampa-slip-on', desc: 'Conserva os espumantes por muito mais tempo, mantendo a pressão e as características. Alça em aço inox, cores preta, transparente e cromada.', cods: ['4506P', '4506T', '4506CE', '4506PE'] },
  { nome: 'Tampa para espumantes', grupo: 'Conservar', foto: 'tampa-espumante', desc: 'Capacete em metal cromado, tampa especial com alça em inox e corpo em ABS, ou cristal com corpo em policarbonato.', cods: ['ZR255C', 'ZR255P', 'ZR376', 'ZR257'] },
  { nome: 'Salva-vinhos (VacuVin)', grupo: 'Conservar', foto: 'salva-vinhos-foto', desc: 'Extrai o ar da garrafa aberta, retardando a oxidação e conservando o vinho por mais tempo. Acompanha duas rolhas; cores preta e bordô.', cods: ['4608', '4608BC', '4609', '4609RC'] },
  { nome: 'Termômetro digital', grupo: 'Conservar', foto: 'termometro-digital', desc: 'Mostra a temperatura ideal para apreciar o vinho. Digital, movido a pilha, em plástico e aço inox.', cods: ['ZR671'] },
  { nome: 'Termômetro bracelete', grupo: 'Conservar', foto: 'termometro-bracelete', desc: 'Temperatura ideal de cada tipo de vinho, direto na garrafa. Em aço inox.', cods: ['ZR670'] },
  { nome: 'Termômetro sommelier', grupo: 'Conservar', foto: 'termometro-sommelier', desc: 'Tipo lapiseira, escala de 0 a 40 °C.', cods: ['4406'] },
  { nome: 'Balde para espumantes (champanheira)', grupo: 'Mesa e eventos', foto: 'balde-cristal-foto', desc: 'Para até 2 garrafas ou 6 latas, volume 5 L, de fácil limpeza. Em PP translúcido, PS cristal, PS preto e PP preto.', cods: ['4601PS', '4601PSP', '4600PP', '4600PT'] },
  { nome: 'Balde com alça', grupo: 'Mesa e eventos', foto: 'balde-alca', desc: 'Para 1 garrafa ou 3 latas, volume 2,6 L, de fácil limpeza. Em PS cristal, PS preto e PP preto.', cods: ['4603PS', '4603PSP', '4603PP'] },
  { nome: 'Bandeja para coquetel', grupo: 'Mesa e eventos', foto: 'bandeja', desc: 'Prática e moderna, com divisória e suporte para taças. Cores cristal e preta.', cods: ['4700', '4702'] },
  { nome: 'Identificador de taças', grupo: 'Mesa e eventos', foto: 'identificador', desc: 'Uma maneira descontraída de identificar as taças em festas e jantares. Também em forma de bonecos.', cods: ['4705', '4705CX', '4706', '4707'] },
  { nome: 'Kit 8 peças', grupo: 'Kits', foto: 'kit-8', desc: 'Estojo de MDF preto acetinado com veludo vermelho: salva-vinhos com duas rolhas, saca-rolhas 2 estágios, corta-gotas com tampa, corta-lacre e dois corta-gotas práticos. 5,5 x 30 x 24,5 cm.', cods: ['5002'] },
  { nome: 'Kit 5 peças', grupo: 'Kits', foto: 'kit-5', desc: 'Estojo de MDF preto acetinado com veludo vermelho: corta-gotas com tampa, saca-rolhas 2 estágios, corta-lacre e dois corta-gotas práticos. 5,5 x 23 x 19 cm.', cods: ['5001'] },
  { nome: 'Kit 2 peças', grupo: 'Kits', foto: 'kit-2', desc: 'Estojo de MDF preto acetinado com veludo vermelho: saca-rolhas para espumantes e tampa para espumantes preta. 5,5 x 24,5 x 20,2 cm.', cods: ['5000'] },
  { nome: 'Kit de acessórios sommelier', grupo: 'Kits', foto: 'kit-sommelier', desc: 'Estojo em couro: saca-rolhas 2 estágios, identificador de taças, corta-lacre e corta-gotas prático.', cods: ['5003'] },
];
export const biovinGrupos = ['Servir', 'Abrir', 'Conservar', 'Mesa e eventos', 'Kits'];

// Folder PartyParts.
export const party = [
  { nome: 'Copo shot drink', foto: 'shot', desc: 'Capacidade até 60 ml, em PS cristal com fino acabamento. Caixa com 6 peças.', cods: ['3624'], cores: ['Cristal', 'Amarelo', 'Verde', 'Laranja', 'Vermelho', 'Azul', 'Branco', 'Preto'] },
  { nome: 'Copo long drink', foto: 'long-drink', desc: 'Capacidade até 290 ml, em PS cristal com fino acabamento. Caixa com 6 peças.', cods: ['3625'], cores: ['Cristal', 'Amarelo', 'Verde', 'Laranja', 'Vermelho', 'Azul', 'Branco', 'Preto'] },
  { nome: 'Copo para bebidas', foto: 'copo-bebidas', desc: 'Capacidade até 390 ml, em PS cristal com fino acabamento. Caixa com 6 peças.', cods: ['3707'], cores: ['Cristal', 'Amarelo', 'Verde', 'Laranja', 'Vermelho', 'Azul', 'Branco', 'Preto'] },
  { nome: 'Copo para whisky', foto: 'whisky', desc: 'Capacidade até 360 ml, em PS cristal com fino acabamento.', cods: [] },
  { nome: 'Copo long drink decorado', foto: 'long-decorado', desc: 'Capacidade até 290 ml, em PS cristal. Caixas com 6 peças, nas cores branca ou preta.', cods: [] },
  { nome: 'Copo para bebidas decorado', foto: 'bebidas-decorado', desc: 'Capacidade até 390 ml, em PS cristal. Caixas com 6 peças, nas cores branca ou preta.', cods: [] },
  { nome: 'Gelo ecológico', foto: 'gelo', desc: 'O gelo que não derrete e não altera o sabor da bebida. Totalmente atóxico. Formas de bola, cubo, coração e estrela, colorido ou transparente.', cods: ['4709', '4708'] },
  { nome: 'Balde com alça, cores especiais', foto: 'balde-alca-cores', desc: 'Para 1 garrafa ou 3 latas, volume 2,6 L. Verde, amarelo, laranja, vermelho e azul.', cods: ['4603PSC'] },
  { nome: 'Champanheira, cores especiais', foto: 'champanheira-cores', desc: 'Para até 2 garrafas ou 6 latas, volume 5 L. Amarelo, verde, laranja, vermelho e azul.', cods: ['4601PSC'] },
];
// Galeria de fotos de ambiente (as do site atual).
export const partyGaleria = [
  ['party/copos-coloridos', 'Copos long drink coloridos'], ['party/baldes-neon', 'Baldes com alça em cores especiais'], ['party/tacas-espumante', 'Taças para espumante em várias cores'],
  ['party/long-cores', 'Copos long drink nas cores branco, branco pérola, prata, rosa, azul, vermelho, amarelo e verde'], ['party/tacas-decoradas', 'Taças para espumante decoradas'],
  ['party/taca-gin', 'Taça de gin em cristal'], ['party/long-translucidos', 'Copos long drink translúcidos'], ['party/champanheiras-cores', 'Champanheiras em cores especiais'], ['party/long-decorados', 'Copos long drink decorados'],
];
