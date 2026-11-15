// Dados da Effisa (Braço do Norte/SC) tirados do site atual effisa.com.br (páginas, wp-json e fichas das máquinas).
// L(pt, en, es): o site atual tem bandeiras PT/EN/ES, então todo texto fixo vem nas três línguas.
import fs from 'node:fs';
import path from 'node:path';
const aqui = path.dirname(new URL(import.meta.url).pathname);

export const E = {
  nome: 'Effisa', legal: 'Effisa Indústria de Máquinas e Equipamentos Ltda.',
  url: 'https://effisa.overtus.com.br/', antigo: 'https://effisa.com.br/',
  fone1: '+55 48 3658-2242', fone2: '+55 48 3658-6134', email: 'effisa@effisa.com.br',
  end: 'Rua Olavio Cardoso, 567, Uruguaia', cidade: 'Braço do Norte/SC, Brasil', cep: 'CEP 88750-000',
  horario: ['Segunda a sexta', '7h30 às 12h00 · 13h10 às 17h30'],
  deptos: [
    { pt: 'Gerência comercial', en: 'Sales management', es: 'Gerencia comercial', fone: '+55 48 9 9964-0485', email: 'comercial@effisa.com.br' },
    { pt: 'Assistência técnica', en: 'Technical support', es: 'Asistencia técnica', fone: '+55 48 9 9938-0162', email: 'sac@effisa.com.br' },
    { pt: 'Peças de reposição', en: 'Spare parts', es: 'Repuestos', fone: '+55 48 9 9924-0358', email: 'comercial4@effisa.com.br' },
  ],
  social: { insta: 'https://www.instagram.com/empresa.effisa/', face: 'https://www.facebook.com/empresa.effisa', yt: 'https://www.youtube.com/empresaeffisa', linkedin: 'https://www.linkedin.com/company/empresaeffisa' },
};

// Processos (menu "Aplicações > processo" do site atual). Textos curtos escritos por nós a partir das fichas das máquinas.
export const processos = [
  { id: 'laminacao', foto: 'laminadora-plana-horizontal-omega-ff-1401-lpho', pt: 'Laminação e recobrimento', en: 'Laminating and wrapping', es: 'Laminación y recubrimiento',
    dpt: 'Laminadoras planas, recobridoras de perfis, coladeiras e hot stamping para aplicar papel, CPL, PVC, PET ou lâmina de madeira com adesivo PUR.',
    den: 'Flat laminators, profile wrappers, edge gluers and hot stamping to apply paper, CPL, PVC, PET or wood veneer with PUR adhesive.',
    des: 'Laminadoras planas, recubridoras de perfiles, encoladoras y hot stamping para aplicar papel, CPL, PVC, PET o chapa de madera con adhesivo PUR.' },
  { id: 'corte', foto: 'fresadora-de-perfis-beta-ff-301-fpb4', pt: 'Corte e fresamento', en: 'Cutting and milling', es: 'Corte y fresado',
    dpt: 'Fresadoras de perfis, fatiadoras de bobinas e modeladoras universais para cortar e dar forma a peças e materiais bobinados.',
    den: 'Profile milling machines, coil slitters and universal shapers to cut and shape parts and coiled materials.',
    des: 'Fresadoras de perfiles, cortadoras de bobinas y moldeadoras universales para cortar y dar forma a piezas y materiales en bobina.' },
  { id: 'lixamento', foto: 'lixadeira-de-perfis-omega-ff-301-lpo6', pt: 'Lixamento e polimento', en: 'Sanding and polishing', es: 'Lijado y pulido',
    dpt: 'Lixadeiras de perfis, de bordos e de topos para calibrar, lixar e polir antes e entre as demãos de acabamento.',
    den: 'Profile, edge and end sanders to calibrate, sand and polish before and between finishing coats.',
    des: 'Lijadoras de perfiles, de cantos y de topes para calibrar, lijar y pulir antes y entre las capas de acabado.' },
  { id: 'extrusao', foto: 'extrusora-de-perfis-omega-ff-305-ep', pt: 'Extrusão e gravação', en: 'Extrusion and embossing', es: 'Extrusión y grabado',
    dpt: 'Extrusoras, engessadeiras e câmaras de alta pressão que aplicam gesso, massa acrílica e materiais UV e nivelam a face do perfil.',
    den: 'Extruders, gesso coaters and high-pressure chambers that apply gesso, acrylic filler and UV materials and level the profile face.',
    des: 'Extrusoras, enyesadoras y cámaras de alta presión que aplican yeso, masilla acrílica y materiales UV y nivelan la cara del perfil.' },
  { id: 'pintura', foto: 'pintura-automatica-spray-de-perfis-omega', pt: 'Pintura', en: 'Painting', es: 'Pintura',
    dpt: 'Pintura a vácuo (com ou sem teflon), spray automático e aplicadora por rolo para hot coating.',
    den: 'Vacuum coating (with or without Teflon lining), automatic spray and roller applicator for hot coating.',
    des: 'Pintura al vacío (con o sin teflón), spray automático y aplicadora por rodillo para hot coating.' },
  { id: 'secagem', foto: 'tunel-de-secagem-linear-ultravioleta-omega-ff-309-tsluvo', pt: 'Secagem', en: 'Drying and curing', es: 'Secado',
    dpt: 'Túneis de secagem longitudinais, transversais a gás e ultravioleta, dimensionados para a velocidade da linha.',
    den: 'Longitudinal, gas-fired transverse and UV drying tunnels, sized to the speed of the line.',
    des: 'Túneles de secado longitudinales, transversales a gas y ultravioleta, dimensionados a la velocidad de la línea.' },
  { id: 'movimentacao', foto: 'alimentador-automatico-a-vacuo-por-elevacao-ff-1006-aave', pt: 'Movimentação', en: 'Handling', es: 'Movimiento',
    dpt: 'Mesas alimentadoras e descarregadoras, transferidores por correia, roletes e aletas, alimentadores a vácuo e carros de armazenamento que ligam uma máquina à outra.',
    den: 'Infeed and outfeed tables, belt, roller and flap transfers, vacuum loaders and storage carts that link one machine to the next.',
    des: 'Mesas alimentadoras y descargadoras, transferidores por correa, rodillos y aletas, alimentadores al vacío y carros de almacenamiento que unen una máquina con la otra.' },
  { id: 'embalagem', foto: 'embaladora-circular-de-perfis-omega-ff-301-ecp', pt: 'Embalagem', en: 'Packaging', es: 'Embalaje',
    dpt: 'Embaladoras circulares, plastificadoras, etiquetadoras e aplicadores de stretch para fechar a linha com o produto pronto para expedir.',
    den: 'Orbital wrappers, film wrappers, labellers and stretch applicators to finish the line with the product ready to ship.',
    des: 'Embaladoras circulares, plastificadoras, etiquetadoras y aplicadores de stretch para cerrar la línea con el producto listo para despachar.' },
];
const mapaProc = { 'laminacao-e-recobrimento': 'laminacao', corte: 'corte', 'lixamento-e-polimento': 'lixamento', 'extrusao-e-gravacao': 'extrusao', pintura: 'pintura', secagem: 'secagem', movimentacao: 'movimentacao', embalagem: 'embalagem', 'linhas-effisa': 'linhas' };

// Máquinas: nome, foto e primeira frase da ficha técnica de cada uma no site atual (62 itens)
export const maquinas = JSON.parse(fs.readFileSync(path.join(aqui, 'maquinas.json'), 'utf8')).map(m => ({ ...m, p: mapaProc[m.p] }));
export const linhas = maquinas.filter(m => m.p === 'linhas');

// Aplicações (setores), com os textos do site atual. Fotos: as do site atual (são de banco de imagem, usadas lá também).
export const setores = [
  { id: 'molduras-boards', pt: 'Molduras e boards', en: 'Mouldings and boards', es: 'Molduras y boards',
    dpt: 'Atendendo grandes fabricantes que são referência mundial neste ramo, a Effisa se consolidou como fornecedora de soluções em qualidade e produtividade para molduras e boards: equipamentos, tecnologia e know-how.',
    den: 'Serving manufacturers that are world references in this field, Effisa has become a supplier of quality and productivity solutions for mouldings and boards: equipment, technology and know-how.',
    des: 'Atendiendo a grandes fabricantes que son referencia mundial en el rubro, Effisa se consolidó como proveedora de soluciones de calidad y productividad para molduras y boards: equipos, tecnología y know-how.' },
  { id: 'molduras-decorativas', pt: 'Molduras decorativas', en: 'Decorative frames', es: 'Molduras decorativas',
    dpt: 'Clássica, retrô, moderna ou discreta, a moldura está sempre presente na decoração. Fazemos as máquinas de extrusão, gesso, pintura e lixamento que dão esse acabamento.',
    den: 'Classic, retro, modern or understated, the frame is always part of the décor. We build the extrusion, gesso, painting and sanding machines behind that finish.',
    des: 'Clásica, retro, moderna o discreta, la moldura siempre está en la decoración. Fabricamos las máquinas de extrusión, yeso, pintura y lijado que dan ese acabado.' },
  { id: 'moveis', pt: 'Móveis', en: 'Furniture', es: 'Muebles',
    dpt: 'A indústria moveleira pede altos níveis de automação para competir num mercado global. A Effisa desenvolve soluções para fábricas de móveis de todo o Brasil e de várias partes do mundo.',
    den: 'The furniture industry needs high levels of automation to compete globally. Effisa develops solutions for furniture plants across Brazil and around the world.',
    des: 'La industria del mueble necesita altos niveles de automatización para competir en un mercado global. Effisa desarrolla soluciones para fábricas de muebles de todo Brasil y de varias partes del mundo.' },
  { id: 'portas', pt: 'Kit portas e rodapés', en: 'Door kits and skirting', es: 'Kit puertas y zócalos',
    dpt: 'Máquinas dedicadas à produção de kits de portas prontas e rodapés: padronização e agilidade para as construtoras, sem abrir mão da qualidade.',
    den: 'Machines dedicated to pre-hung door kits and skirting boards: standardisation and speed for builders, without giving up quality.',
    des: 'Máquinas dedicadas a la producción de kits de puertas listas y zócalos: estandarización y agilidad para las constructoras, sin resignar calidad.' },
  { id: 'hot-coating', pt: 'Hot coating', en: 'Hot coating', es: 'Hot coating',
    dpt: 'Acabamento que resiste à maioria dos produtos químicos e dura mais que os revestimentos líquidos. Com os equipamentos Effisa, a peça revestida volta ao uso em menos de uma hora.',
    den: 'A finish that resists most chemicals and outlasts liquid coatings. With Effisa equipment a coated part is back in service in under an hour.',
    des: 'Acabado que resiste a la mayoría de los químicos y dura más que los recubrimientos líquidos. Con los equipos Effisa la pieza vuelve al uso en menos de una hora.' },
  { id: 'esquadrias', pt: 'Esquadrias PVC e alumínio', en: 'PVC and aluminium frames', es: 'Aberturas de PVC y aluminio',
    dpt: 'Recobrimento de perfis de PVC e alumínio com laminados e adesivo PUR, para um produto final nos mais variados tons.',
    den: 'Wrapping of PVC and aluminium profiles with laminates and PUR adhesive, for a final product in a wide range of finishes.',
    des: 'Recubrimiento de perfiles de PVC y aluminio con laminados y adhesivo PUR, para un producto final en los más variados tonos.' },
  { id: 'forros', pt: 'Forros de PVC', en: 'PVC ceilings', es: 'Cielorrasos de PVC',
    dpt: 'Uma das melhores opções para obras residenciais, comerciais e industriais. A Effisa fornece o recobrimento, o corte, a etiquetagem e a embalagem desses perfis.',
    den: 'One of the best options for residential, commercial and industrial projects. Effisa supplies the wrapping, cutting, labelling and packing of these profiles.',
    des: 'Una de las mejores opciones para obras residenciales, comerciales e industriales. Effisa provee el recubrimiento, corte, etiquetado y embalaje de estos perfiles.' },
  { id: 'cabos', pt: 'Cabos', en: 'Tool handles', es: 'Cabos',
    dpt: 'Revestimento de perfis redondos de vários diâmetros, em tauari, pinus e eucalipto: a peça passa por um banho do produto, seca em UV e sai etiquetada.',
    den: 'Coating of round profiles in several diameters, in tauari, pine and eucalyptus: the part is bathed in the product, UV-cured and labelled.',
    des: 'Recubrimiento de perfiles redondos de varios diámetros, en tauari, pino y eucalipto: la pieza pasa por un baño del producto, se cura en UV y sale etiquetada.' },
];

export const clientes = [['tramontina', 'Tramontina'], ['truper', 'Truper'], ['pinelli', 'Pinelli'], ['santaluzia', 'Santa Luzia'], ['zeni', 'Zeni'], ['wigga', 'Wigga'], ['koala', 'Koala Energy']];
