// Conteúdo da Medicor. Textos de empresa, missão, valores, equipe, frases dos banners e fichas dos 31 produtos vêm do site atual
// (medicor-rs.com.br, em português e no /en/). Títulos de seção, áreas de uso, passos de "Como comprar" e o inglês do que o site
// atual não traduziu (menus, frases dos banners, formulários) foram escritos por nós a partir deles.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
export const catalogo = JSON.parse(fs.readFileSync(path.join(aqui, 'catalogo.json'), 'utf8'));
export const documentos = JSON.parse(fs.readFileSync(path.join(aqui, 'documentos.json'), 'utf8'));

export const empresa = {
  nome: 'Medicor',
  razao: 'Medicor Produtos Hospitalares Ltda',
  url: 'https://medicor.overtus.com.br/',
  antigo: 'http://www.medicor-rs.com.br/',
  desde: 1993,
  endereco: ['Av. Francisco Silveira Bitencourt, 1369', 'Pavilhões 19 e 20 · Bairro Sarandi', 'CEP 91150-010 · Porto Alegre · RS'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Francisco+Silveira+Bitencourt,+1369,+Sarandi,+Porto+Alegre+RS',
  mapaEmbed: 'https://www.google.com/maps?q=Av.+Francisco+Silveira+Bitencourt,+1369,+Sarandi,+Porto+Alegre+RS&output=embed',
  fone: '(51) 3344-8384', foneHref: '+555133448384', foneIntl: '+55 51 3344.8384',
  wa: '5551993657955', waFone: '(51) 99365-7955',
  facebook: 'https://www.facebook.com/pages/Medicor-Produtos-Hospitalares/376526835765523',
  catalogoPdf: '/assets/docs/catalogo-rmdesc.pdf',
};

// Categorias do menu "Produtos" do site atual, na mesma ordem.
export const categorias = [
  { id: 'adaptadoresconectores', pt: 'Adaptadores/Conectores', en: 'Adapters/Connectors' },
  { id: 'agulhas', pt: 'Agulhas', en: 'Needles' },
  { id: 'campos', pt: 'Campo Plástico', en: 'Plastic Field' },
  { id: 'dosador-oral', pt: 'Dosadores', en: 'Oral Syringes' },
  { id: 'equipamentos-protecao-individual', pt: 'Equipamentos de Proteção Individual', en: 'Personal Protective Equipment' },
  { id: 'equipos-para-infusao', pt: 'Equipos', en: 'Infusion Sets' },
  { id: 'esterilizacao', pt: 'Esterilização', en: 'Sterilization' },
  { id: 'frascos', pt: 'Frascos', en: 'Bottles' },
  { id: 'isolador-de-pressao', pt: 'Isolador de Pressão', en: 'Transducer Protector' },
  { id: 'lanceta', pt: 'Lanceta', en: 'Lancet' },
  { id: 'linhas-sanguineas-para-hemodialise', pt: 'Linhas Sanguíneas para Hemodiálise', en: 'Bloodlines for Hemodialysis' },
  { id: 'seringas', pt: 'Seringas', en: 'Syringes' },
  { id: 'tampas', pt: 'Tampas', en: 'Caps' },
  { id: 'torneirinhas', pt: 'Torneirinhas', en: 'Stopcocks' },
  { id: 'tricotomizador', pt: 'Tricotomizador', en: 'Trichotomizer' },
];

// Áreas de uso (versão B): agrupamento nosso dos mesmos produtos.
export const areas = [
  { id: 'hemodialise', pt: 'Hemodiálise', en: 'Hemodialysis', ptTxt: 'Linhas sanguíneas arterial e venosa, agulha de fístula com dispositivo de segurança e isolador de pressão.', enTxt: 'Arterial and venous bloodlines, fistula needle with safety device and transducer protector.' },
  { id: 'infusao', pt: 'Infusão e acesso venoso', en: 'Infusion and IV access', ptTxt: 'Equipos macrogotas, conectores, adaptador duplo spike, tampa luer e torneirinha de três vias.', enTxt: 'Macrodrip infusion sets, connectors, double spike, luer caps and three-way stopcock.' },
  { id: 'enteral', pt: 'Nutrição enteral e via oral', en: 'Enteral and oral', ptTxt: 'Equipo e frasco de nutrição enteral, dosador oral e seringa bico cateter.', enTxt: 'Enteral feeding set and bottle, oral syringe and catheter-tip syringe.' },
  { id: 'seringas', pt: 'Seringas e coleta', en: 'Syringes and sampling', ptTxt: 'Seringas descartáveis de 3 a 60 ml, seringa para insulina e lanceta de segurança.', enTxt: 'Disposable syringes from 3 to 60 ml, insulin syringe and safety lancet.' },
  { id: 'epi', pt: 'Proteção individual', en: 'Personal protection', ptTxt: 'Avental, gorro, touca, máscara, propé e luvas plásticas estéreis.', enTxt: 'Gown, doctor’s cap, mob cap, facemask, shoe cover and sterile plastic gloves.' },
  { id: 'cme', pt: 'Centro cirúrgico e CME', en: 'Surgery and sterile services', ptTxt: 'Campo plástico estéril, pacote teste Bowie & Dick e tricotomizador.', enTxt: 'Sterile plastic field, Bowie & Dick test pack and trichotomizer.' },
];

export const slides = [
  { img: 'slide-1', pt: 'Integridade, honestidade e segurança', en: 'Integrity, honesty and safety' },
  { img: 'slide-2', pt: 'Em nossa bandeira está estampado o segredo de nosso sucesso: conhecimento e amor', en: 'The secret of our success is printed on our flag: knowledge and love' },
  { img: 'slide-3', pt: 'Ética, responsabilidade e sustentabilidade', en: 'Ethics, responsibility and sustainability' },
  { img: 'slide-4', pt: 'Os melhores produtos do mundo para a sua saúde', en: 'The best products in the world for your health' },
];

export const links = [
  ['Portal da Saúde', 'https://www.gov.br/saude/'], ['SINDHOSP', 'https://www.sindhosp.com.br'], ['FUNDACENTRO', 'https://www.gov.br/fundacentro/'],
  ['ABIH', 'https://www.abih.net.br'], ['CGVS Porto Alegre', 'https://prefeitura.poa.br/sms/vigilancia-em-saude'], ['Nota Fiscal Eletrônica', 'https://www.nfe.fazenda.gov.br'],
  ['ABNT', 'https://www.abnt.org.br'], ['Ministério do Trabalho', 'https://www.gov.br/trabalho-e-emprego/'], ['Conselho Federal de Enfermagem', 'https://www.cofen.gov.br'],
  ['Conselho Federal de Medicina', 'https://portal.cfm.org.br'], ['SOBECC', 'https://sobecc.org.br'], ['BVS', 'https://bvsalud.org'],
  ['Risco Biológico', 'http://www.riscobiologico.org/'], ['ANVISA', 'https://www.gov.br/anvisa/'], ['Diário Oficial da União', 'https://www.in.gov.br'],
  ['CND FGTS', 'https://consulta-crf.caixa.gov.br'], ['CND INSS e Dívida Ativa', 'https://solucoes.receita.fazenda.gov.br/servicos/certidaointernet/pj/emitir'],
  ['Consulta Optantes do Simples', 'https://www8.receita.fazenda.gov.br/SimplesNacional/aplicacoes.aspx?id=21'],
];

export const T = {
  pt: {
    lang: 'pt-BR', og: 'pt_BR', bandeira: 'Português',
    slugs: { index: '', empresa: 'empresa/', produtos: 'produtos/', downloads: 'downloads/', contato: 'contato/' },
    nav: { index: 'Home', empresa: 'Empresa', produtos: 'Produtos', downloads: 'Downloads', contato: 'Fale Conosco' },
    cotacao: 'Cotação', addCot: 'Adicionar à cotação', naCot: 'Na cotação', pular: 'Pular para o conteúdo', abrirMenu: 'Abrir menu',
    tagline: 'Tecnologia e qualidade a serviço da saúde',
    banner: 'Com uma estrutura funcional muito capacitada e com experiência desde 1993, a Medicor é especializada na importação e distribuição de produtos hospitalares. Sua busca por produtos de qualidade é constante.',
    empresa: [
      'Fornecer produtos para a área da saúde é uma responsabilidade muito grande. A Medicor Produtos Hospitalares, especializada na distribuição de produtos descartáveis para a saúde desde 1993, conta com infraestrutura e equipe capacitada para atendimento em todo o território nacional de forma muito eficiente.',
      'A Medicor foi pioneira na importação de descartáveis médicos no Rio Grande do Sul. Com seriedade, agilidade e segurança atende as mais variadas áreas do segmento, sempre investindo em inovação e qualidade em sua cadeia de fornecedores.',
      'Para atender as exigências do mercado criou marca própria, a RMDESC, uma linha que atende plenamente as necessidades dos clientes e hoje é reconhecida por sua qualidade aliada aos bons preços de seus produtos.',
    ],
    bandeiraTit: 'Em nossa bandeira está estampado o segredo de nosso sucesso',
    bandeiraTxt: 'Na Medicor acreditamos que conhecer aquilo que fazemos, atender as necessidades, carências e desejos de nossos clientes atrelados ao amor que depositamos em nossas ações é a melhor forma de contribuir para o avanço contínuo do segmento. Nossa bandeira ganha forma e força, levando a cada dia mais e mais pessoas a dizerem “TÔ NESSA”, eu contribuo para a “QUALIDADE NA SAÚDE”.',
    conhecimento: 'Conhecimento', amor: 'Amor', qualidade: 'Qualidade na saúde',
    missaoTit: 'Missão', missao: 'Estar presente na recuperação da saúde, fornecendo produtos de qualidade a preços competitivos, assegurando a rentabilidade do negócio e atendendo as necessidades dos clientes.',
    valoresTit: 'Valores', valores: ['Ética', 'Responsabilidade', 'Confiança', 'Sustentabilidade'],
    equipeTit: 'Nossa equipe', equipe: [
      'Conhecer o cliente e suas necessidades é uma preocupação constante que temos e para isso, investimos na qualificação de nossos colaboradores, com a finalidade de juntos, formar um time altamente comprometido com resultados.',
      'Nossos vendedores são preparados para serem apoiadores na hora de tomar a decisão de compra, visando auxiliar o comprador a decidir sempre pela melhor alternativa.',
    ],
    rmdescTit: 'RMDESC, a marca própria da Medicor',
    rmdescTxt: 'Uma linha que atende plenamente as necessidades dos clientes e é reconhecida por sua qualidade aliada aos bons preços.',
    destaque: 'Produtos em destaque', produtos: 'Produtos', verTodos: 'Ver todos os produtos', verProduto: 'Ver produto',
    catalogoTit: 'Catálogo RMDESC', catalogoTxt: 'Venha conferir nossa linha completa de produtos! Baixe o catálogo em PDF, com códigos, caixas e registros ANVISA.', baixarCatalogo: 'Baixar catálogo (PDF)',
    registro: 'Registro ANVISA', inmetro: 'Produto certificado pelo INMETRO', composicao: 'Composição', apresentacao: 'Apresentação', modelos: 'Modelos', informacoes: 'Informações',
    rms: 'Registro do produto (RMS, PDF)', voltar: 'Voltar para Produtos', relacionados: 'Na mesma linha', fotoAmpliar: 'Ampliar foto',
    buscar: 'Buscar produto, código ou registro', semRes: 'Nenhum produto encontrado. Fale com o comercial: temos outros itens sob consulta.', todos: 'Todos',
    downloadsTit: 'Downloads', downloadsSub: 'Licenças da empresa, certificados INMETRO, publicações no Diário Oficial e registros dos produtos RMDESC, prontos para o cadastro de fornecedor.',
    grupos: { empresa: 'Licenças da empresa', cert: 'Certificados INMETRO', dou: 'Diário Oficial da União', rms: 'Registros dos produtos RMDESC (RMS)' },
    sobConsulta: 'Sob consulta', linksTit: 'Links de sites', linksSub: 'Órgãos e entidades do setor que usamos no dia a dia.',
    contatoTit: 'Fale Conosco', contatoSub: 'Peça uma cotação, tire dúvidas sobre um produto ou solicite documentos para o cadastro de fornecedor.',
    form: { nome: 'Nome', empresa: 'Hospital, clínica ou empresa', cidade: 'Cidade / UF', fone: 'Telefone', email: 'E-mail', msg: 'Mensagem', novidades: 'Desejo receber informações e novidades da Medicor.', enviar: 'Enviar pelo WhatsApp', assunto: 'Contato pelo site da Medicor', cot: 'Itens da cotação' },
    cotVazia: 'Sua cotação está vazia. Em cada produto, use “Adicionar à cotação” para montar a lista.',
    cotTit: 'Sua cotação', qtd: 'Quantidade', tirar: 'Tirar',
    ligue: 'Ligue', whatsapp: 'WhatsApp comercial', endereco: 'Endereço', verMapa: 'Ver no mapa', facebook: 'Facebook',
    waMsg: 'Olá! Vim pelo site da Medicor e gostaria de uma cotação.',
    rodape: 'Distribuição de produtos descartáveis para a saúde desde 1993.',
    desde: 'desde 1993', anos: 'anos', produtosN: 'produtos RMDESC', linhasN: 'linhas de produto', brasil: 'Atendimento em todo o território nacional',
    pioneira: 'Pioneira na importação de descartáveis médicos no Rio Grande do Sul',
    areasTit: 'Encontre pela área de uso', areasSub: 'Os mesmos 31 produtos RMDESC, agrupados pelo setor do hospital que vai usar.',
    comoTit: 'Como comprar', como: [
      ['Monte a cotação', 'Em cada produto, adicione os modelos e códigos que você precisa.'],
      ['Envie para o comercial', 'Mande a lista pelo WhatsApp comercial ou ligue para (51) 3344-8384.'],
      ['Receba a proposta', 'Nossos vendedores ajudam a escolher a melhor alternativa para a sua compra.'],
      ['Receba em todo o Brasil', 'Atendimento em todo o território nacional, a partir de Porto Alegre.'],
    ],
    docsTit: 'Documentação pronta para o seu cadastro', docsTxt: 'Alvarás, certidão de regularidade técnica, certificados INMETRO e o registro de cada produto RMDESC para baixar em PDF.', verDocs: 'Ver documentos',
    fichaTit: 'Ficha técnica', codigo: 'Código', modelo: 'Modelo',
    heroB: 'Descartáveis para a saúde, com a marca própria RMDESC.', heroBSub: 'Distribuidora hospitalar em Porto Alegre desde 1993, pioneira na importação de descartáveis médicos no Rio Grande do Sul. Registro ANVISA e documentação de cada produto para baixar.',
    verCatalogo: 'Ver catálogo', pedirCot: 'Pedir cotação',
  },
  en: {
    lang: 'en', og: 'en_US', bandeira: 'English',
    slugs: { index: 'en/', empresa: 'en/company/', produtos: 'en/products/', downloads: 'en/downloads/', contato: 'en/contact/' },
    nav: { index: 'Home', empresa: 'Company', produtos: 'Products', downloads: 'Downloads', contato: 'Contact Us' },
    cotacao: 'Quote', addCot: 'Add to quote', naCot: 'In your quote', pular: 'Skip to content', abrirMenu: 'Open menu',
    tagline: 'Technology and quality serving healthcare',
    banner: 'With a highly capable structure and experience since 1993, Medicor specializes in importing and distributing hospital products. Its search for quality products never stops.',
    empresa: [
      'Providing products for healthcare is a great responsibility. Medicor Hospital Products, specialized in the distribution of disposable health products since 1993, has a qualified team and infrastructure to offer an efficient customer service throughout the country.',
      'Medicor was a pioneer in importing medical disposables in Rio Grande do Sul. With seriousness, agility and safety, Medicor supplies the most diverse areas of the segment, always investing in innovation and quality in our supply chain.',
      'To meet market demands we created our own brand, RMDESC, a line that fully meets the needs of customers and is widely recognized for its quality and good prices.',
    ],
    bandeiraTit: 'The secret of our success is printed on our flag',
    bandeiraTxt: 'We, at Medicor, believe that knowing what we do, the needs, wants and desires of our customers, tied to the love we put in our actions, is the best way to contribute to the continued advancement of the segment. Our flag takes shape and strength, making more and more people say “Count me in!”, I contribute to “QUALITY IN HEALTH”.',
    conhecimento: 'Knowledge', amor: 'Love', qualidade: 'Quality in health',
    missaoTit: 'Mission', missao: 'To be present in health recovery, providing quality products at competitive prices, ensuring business profitability and meeting customer needs.',
    valoresTit: 'Values', valores: ['Ethics', 'Responsibility', 'Trust', 'Sustainability'],
    equipeTit: 'Our team', equipe: [
      'Knowing customers and their needs is a constant concern, and for this we invest in the training of our collaborators, with the purpose of setting up a team highly committed to results.',
      'Our sales team is trained to be supportive when making purchase decisions, always aiming to help the buyer decide on the best alternative.',
    ],
    rmdescTit: 'RMDESC, Medicor’s own brand',
    rmdescTxt: 'A line that fully meets the needs of customers and is widely recognized for its quality and good prices.',
    destaque: 'Featured products', produtos: 'Products', verTodos: 'See all products', verProduto: 'See product',
    catalogoTit: 'RMDESC catalog', catalogoTxt: 'See our complete product line! Download the PDF catalog, with codes, cartons and ANVISA registrations.', baixarCatalogo: 'Download catalog (PDF)',
    registro: 'ANVISA registration', inmetro: 'INMETRO certified product', composicao: 'Composition', apresentacao: 'Packaging', modelos: 'Models', informacoes: 'Information',
    rms: 'Product registration (RMS, PDF, in Portuguese)', voltar: 'Back to Products', relacionados: 'In the same line', fotoAmpliar: 'Enlarge photo',
    buscar: 'Search product, code or registration', semRes: 'No products found. Talk to our sales team: other items are available on request.', todos: 'All',
    downloadsTit: 'Downloads', downloadsSub: 'Company licenses, INMETRO certificates, Official Gazette publications and RMDESC product registrations, ready for supplier registration (documents in Portuguese).',
    grupos: { empresa: 'Company licenses', cert: 'INMETRO certificates', dou: 'Official Gazette (DOU)', rms: 'RMDESC product registrations (RMS)' },
    sobConsulta: 'On request', linksTit: 'Useful links', linksSub: 'Brazilian healthcare agencies and associations we use every day.',
    contatoTit: 'Contact Us', contatoSub: 'Ask for a quote, a question about a product, or documents for supplier registration.',
    form: { nome: 'Name', empresa: 'Hospital, clinic or company', cidade: 'City / Country', fone: 'Phone', email: 'E-mail', msg: 'Message', novidades: 'I want to receive news from Medicor.', enviar: 'Send via WhatsApp', assunto: 'Contact from the Medicor website', cot: 'Quote items' },
    cotVazia: 'Your quote is empty. On each product, use “Add to quote” to build the list.',
    cotTit: 'Your quote', qtd: 'Quantity', tirar: 'Remove',
    ligue: 'Call', whatsapp: 'Sales WhatsApp', endereco: 'Address', verMapa: 'See on the map', facebook: 'Facebook',
    waMsg: 'Hello! I found Medicor’s website and would like a quote.',
    rodape: 'Distribution of disposable health products since 1993.',
    desde: 'since 1993', anos: 'years', produtosN: 'RMDESC products', linhasN: 'product lines', brasil: 'Service throughout Brazil',
    pioneira: 'A pioneer in importing medical disposables in Rio Grande do Sul',
    areasTit: 'Find by area of use', areasSub: 'The same 31 RMDESC products, grouped by the hospital area that uses them.',
    comoTit: 'How to buy', como: [
      ['Build your quote', 'On each product, add the models and codes you need.'],
      ['Send it to our sales team', 'Send the list via our sales WhatsApp or call +55 51 3344-8384.'],
      ['Get the proposal', 'Our sales team helps you choose the best alternative for your purchase.'],
      ['Delivery across Brazil', 'Service throughout the country, from Porto Alegre.'],
    ],
    docsTit: 'Documents ready for your supplier registration', docsTxt: 'Permits, technical compliance certificate, INMETRO certificates and the registration of every RMDESC product, as PDF downloads.', verDocs: 'See documents',
    fichaTit: 'Technical sheet', codigo: 'Code', modelo: 'Model',
    heroB: 'Disposables for healthcare, under our own RMDESC brand.', heroBSub: 'Hospital distributor in Porto Alegre since 1993, a pioneer in importing medical disposables in Rio Grande do Sul. ANVISA registration and documents for every product, ready to download.',
    verCatalogo: 'See catalog', pedirCot: 'Ask for a quote',
  },
};
