// English version of Overtus for manufacturers, written for US machine shops and manufacturers (not a word-for-word translation).
// Same keys and pages as conteudo-industrias.mjs, published under /en/. Same rules: no prices, no invented clients or numbers.
// The RFQ demo uses fictitious parts and part numbers, with a notice on screen.

export default {
  slug: 'industrias',
  dominio: 'https://industrias.overtus.com.br',
  segmento: 'Manufacturers',
  curto: 'Manufacturing',
  meta: 'Overtus for manufacturers',

  hero: {
    rotulo: 'Overtus for manufacturers',
    titulo: 'Your shop floor, <em>visible on your website.</em>',
    tituloSimples: 'Your shop floor, visible on your website.',
    lead: 'Websites that show your capabilities, equipment and certifications, RFQ forms that take drawings, a portal for sales reps and the sales routine that turns quotes into purchase orders.',
    vidro: 'See your new website live, in two versions, before we ever talk price.',
  },
  faixa: ['Capabilities pages', 'Equipment list', 'RFQ with drawing upload', 'Quality and certifications', 'Rep portal', 'Trade shows', 'CRM and sales dashboard'],

  dores: {
    rotulo: 'What usually holds sales back',
    titulo: 'Your shop is capable. Your website does not show it yet.',
    itens: [
      ['A website that hides the shop', 'Buyers cannot see your machines, tolerances, materials or part envelope, so they compare you with any other shop on price alone.'],
      ['RFQs that arrive incomplete', 'Quotes come in by email and phone without drawings, quantities or material, and your estimator spends the first call asking for them.'],
      ['Certifications nobody finds', 'ISO 9001, AS9100 or ITAR registration are buried in a PDF or missing, and buyers filling their supplier list move on.'],
      ['Built for a desktop from years ago', 'Engineers and buyers research on their phones, and the site breaks, loads slowly or looks like the company stopped investing.'],
    ],
  },

  grupos: [
    {
      slug: 'sites',
      nome: 'Website',
      titulo: 'Your company presented the way it really is.',
      resumo: 'A multi-page website with your capabilities, equipment list, materials, quality system, industries served and parts you have made, built on your real brand.',
      lead: 'Every website is designed from your real identity: your logo, colors, photos of your shop and the parts you make. Never a template with your name swapped in.',
      itens: [
        ['Capabilities and equipment', 'Pages for CNC milling, turning, fabrication or whatever you do, with your machine list, travels, tolerances and part size envelope.', ['Machine list with make and model', 'Tolerances and part envelope', 'Photos of your real shop floor']],
        ['Materials and industries', 'The materials you cut and the industries you serve, so buyers recognize their own part in your work.', ['Metals and plastics you machine', 'Industries served', 'Gallery of parts you have made']],
        ['Quality and certifications', 'A page for your quality system: certifications, inspection equipment, first article inspection and traceability.', ['ISO 9001, AS9100, ITAR when you hold them', 'CMM and inspection equipment', 'Certificates to download']],
        ['Found on Google', 'Titles, descriptions and a page per capability and material, so you show up when an engineer searches for what you do.', ['A page per capability', 'Share images on every page', 'Fast on phones']],
        ['English and Spanish', 'A Spanish version when you hire Spanish speakers or sell into Latin America, with a language switch on every page.', ['Language switch on every page', 'Reviewed technical copy', 'Own address for each language']],
      ],
    },
    {
      slug: 'catalogo',
      nome: 'RFQ and catalog',
      titulo: 'Buyers send a complete RFQ the first time.',
      resumo: 'An RFQ form that takes drawings, quantities, material and due date, plus a searchable catalog for shops that also sell standard parts.',
      lead: 'Your estimator gets the drawing, the quantity and the material in the first message, and buyers of standard parts build a quote list in a few clicks.',
      itens: [
        ['RFQ with drawing upload', 'Buyers attach STEP, IGES, DXF or PDF files and fill in quantities, material, finish and due date in one form.', ['STEP, IGES, DXF and PDF files', 'Quantities, material and finish', 'Due date and company details']],
        ['Catalog and quote list', 'Standard parts with search, filters and spec sheets, where the buyer builds a list and sends it as one quote request.', ['Search by part number and material', 'Spec sheet on every part', 'One request for the whole list']],
        ['Controlled data', 'If your shop handles ITAR or export-controlled data, the form can collect only the contact and leave drawings to your own secure transfer.', ['Contact-only RFQ option', 'Link to your secure file transfer', 'Clear notice for buyers']],
      ],
    },
    {
      slug: 'representantes',
      nome: 'Reps and outreach',
      titulo: 'Sales reps and distributors working from the same information.',
      resumo: 'A portal for sales reps with line cards, capabilities and materials, prospect lists by industry and region, and a setup for trade shows.',
      lead: 'Manufacturing sales go through reps, distributors and trade shows. We organize the material and the contacts for each of those channels.',
      itens: [
        ['Rep portal', 'Each rep logs in to the latest line card, capabilities deck, certifications and their own customer list.', ['Always the current material', 'Access per rep', 'Customer list through the portal']],
        ['Outreach by industry', 'Lists of companies in the industries and regions you serve, with contacts and a call and email script.', ['Lists by industry and region', 'Call and email script', 'Every attempt logged in the CRM']],
        ['Trade shows', 'A page for the show, booth meeting scheduling and visitor capture straight into the CRM.', ['Booth meeting calendar', 'Visitor capture', 'Organized follow-up after the show']],
      ],
    },
    {
      slug: 'comercial',
      nome: 'Sales structure',
      titulo: 'Every quote followed until it becomes a PO.',
      resumo: 'A CRM for technical sales, a sales dashboard and automatic replies, so no RFQ goes unanswered.',
      lead: 'The website, the catalog and your reps bring in RFQs. The sales structure makes sure every one of them gets an answer, a follow-up and a decision.',
      itens: [
        ['CRM for technical sales', 'RFQs, quotes and purchase orders organized in stages, with each customer history and the next step for each salesperson.', ['Pipeline by capability or product line', 'Full customer history', 'Follow-up reminders']],
        ['Sales dashboard', 'New RFQs, open quotes and the week’s POs on one screen for management.', ['The week on one screen', 'By capability, region and rep', 'Works on a phone']],
        ['Automatic replies', 'An assistant trained on your capabilities answers common questions on the website, even after hours, and hands the contact to your team.', ['Trained on your own information', 'Answers after hours', 'Routes to the right person']],
      ],
    },
  ],

  jornada: {
    rotulo: 'From search to repeat order',
    titulo: 'A structure for every stage of an industrial sale.',
    lead: 'Industrial buyers search, compare, request a quote and only then place the order. Each stage needs a clear answer from your company.',
    fases: [
      ['Search', 'Be found by engineers and buyers looking for what you make.', ['Website', 'Google search', 'Capability pages']],
      ['Evaluation', 'Show equipment, quality and capacity.', ['Machine list', 'Certifications', 'Parts gallery']],
      ['RFQ', 'Make it easy to send a complete request.', ['Drawing upload', 'Quote list', 'Direct line to sales']],
      ['Purchase order', 'Answer fast and follow every quote.', ['CRM', 'Follow-up reminders', 'Sales dashboard']],
      ['Repeat orders', 'Keep customers coming back.', ['Customer portal', 'Technical updates', 'New capabilities']],
    ],
  },

  // RFQ demo with fictitious parts.
  demo: {
    tipo: 'cotacao',
    rotulo: 'Live demo',
    titulo: 'A catalog with a quote list, the way a buyer uses it.',
    lead: 'Search, filter by product line, build the list with quantities and attach a drawing. On a real website, the request reaches your sales team with the buyer’s company details.',
    aviso: 'Demo with fictitious parts and part numbers. No data or file leaves this page.',
    catalogo: 'Parts catalog',
    linhas: [['bushings', 'Bushings'], ['shafts', 'Shafts and pins'], ['flanges', 'Flanges'], ['pulleys', 'Pulleys'], ['brackets', 'Brackets']],
    produtos: [
      ['BS-1000', 'Flanged bronze bushing', 'bushings', 'C93200 bronze · 1.000" ID × 1.250" OD', 'bucha'],
      ['BS-0750', 'Plain sleeve bushing', 'bushings', 'Oilite bronze · 0.750" ID × 1.000" OD', 'bucha'],
      ['SH-0625', 'Precision ground shaft', 'shafts', '1045 steel · Ø 0.625" × 18"', 'eixo'],
      ['DP-0250', 'Dowel pin', 'shafts', '416 stainless · Ø 0.250" × 1.5"', 'eixo'],
      ['FL-0400', 'Blind flange', 'flanges', 'A105 carbon steel · 4" · class 150', 'flange'],
      ['FL-0200', 'Weld neck flange', 'flanges', '316 stainless · 2" · class 300', 'flange'],
      ['PL-2A06', 'Two-groove V-belt pulley', 'pulleys', 'Cast iron · A section · 6" OD', 'polia'],
      ['SC-0500', 'Shaft collar', 'shafts', '303 stainless · 0.500" bore', 'anel'],
      ['BR-0090', 'Angle mounting bracket', 'brackets', '6061-T6 aluminum · 3.5" × 3.5"', 'suporte'],
      ['BR-0140', 'Heavy-duty mounting bracket', 'brackets', 'A36 steel, powder coated · 5.5" × 4"', 'suporte'],
    ],
    tx: {
      produtos: 'parts', linhas: 'lines', busca: 'Search by part number, name or material', filtro: 'Product lines', todas: 'All',
      adicionar: 'Add', naLista: 'In list', remover: 'Remove', qtd: 'Quantity', nada: 'No parts found.',
      lista: 'Quote list', itens: 'items', vazia: 'Add parts from the catalog to build your request.',
      anexar: 'Attach a drawing', formatos: '.step,.stp,.igs,.iges,.dxf,.dwg,.pdf', formatosTx: 'STEP, IGES, DXF or PDF', arquivos: 'file(s) attached',
      enviar: 'Send quote request',
      enviado: 'Request built in this demo. On a real website it reaches your sales team by email with the list, quantities and attachments.',
    },
  },

  // Inside the website: the pages of a machine shop website and what goes in each one.
  anatomia: {
    rotulo: 'Inside the website',
    titulo: 'What goes into a machine shop website.',
    lead: 'Each page answers a question buyers ask before they send an RFQ. Pick a page to see what goes in it.',
    dominio: 'yourshop.com',
    porqueRotulo: 'Why it matters',
    paginas: [
      ['Home', '/', 'Who you are, what you make and for which industries, on one screen, with the RFQ button always in sight.', ['Hero with shop floor photo or video', 'Core capabilities', 'Industries served', 'Certifications', 'Request a quote'], 'It is the page buyers open first, often on a phone, to decide whether to keep looking.'],
      ['Capabilities', '/capabilities', 'What you do and how well: milling, turning, fabrication, finishing, with tolerances and part sizes.', ['CNC milling and turning', 'Tolerances and part envelope', 'Secondary operations', 'Prototype to production'], 'Engineers screen suppliers by capability first. If it is not on the page, they assume you do not do it.'],
      ['Equipment', '/equipment', 'Your machine list with make, model, axes and travels, plus inspection equipment.', ['Machine list by type', 'Axes and travels', 'Automation and lights-out', 'Inspection equipment'], 'A real equipment list tells a buyer in seconds whether their part fits your shop.'],
      ['Materials', '/materials', 'The metals and plastics you machine every day, and the ones you can source.', ['Aluminum, steel, stainless', 'Titanium and exotic alloys', 'Engineering plastics', 'Material certs on request'], 'Buyers search by material. A page for it brings the right RFQs.'],
      ['Industries', '/industries', 'The industries you serve, each with the kind of parts and requirements you handle.', ['Aerospace and defense', 'Medical devices', 'Industrial equipment', 'Parts gallery by industry'], 'Buyers trust a shop that already works with parts like theirs.'],
      ['Quality', '/quality', 'Your quality system, certifications, inspection and traceability.', ['ISO 9001, AS9100, ITAR', 'CMM inspection', 'First article inspection', 'Certificates to download'], 'For many buyers, certification is required just to get on the approved supplier list.'],
      ['RFQ', '/rfq', 'A request form that takes the drawing, quantities, material, finish and due date.', ['Drawing upload', 'Quantities and due date', 'Material and finish', 'NDA on request'], 'A complete RFQ the first time means a faster, more accurate quote.'],
      ['Careers', '/careers', 'Open positions and what it is like to work in your shop, for machinists and programmers.', ['Open positions', 'Shop culture and photos', 'Benefits', 'Simple application'], 'Hiring skilled machinists is hard. Your website is often the first place they check.'],
    ],
  },

  // Industries page: what buyers in each industry look for and what the website shows.
  setores: {
    rotulo: 'Industries',
    titulo: 'Every industry buys differently.',
    lead: 'A medical device engineer looks for different things than an aerospace buyer. The website shows first what weighs most in each decision.',
    procuraRotulo: 'What the buyer looks for',
    mostraRotulo: 'What the website shows',
    itens: [
      ['CNC machine shops', 'Machine capacity, tolerances, materials and lead time, from prototype to production runs.', ['Equipment list', 'Parts you have made', 'Materials and tolerances', 'RFQ with drawing upload']],
      ['Aerospace and defense suppliers', 'AS9100, ITAR registration, first article inspection and full traceability.', ['Quality system page', 'Certifications up front', 'Inspection equipment', 'Controlled-data RFQ option']],
      ['Medical device manufacturing', 'ISO 13485, clean processes, documentation and validated production.', ['Certifications and processes', 'Materials for medical parts', 'Documentation and traceability', 'Confidential RFQ']],
      ['Fabrication and welding', 'Welding certifications, sheet and plate capacity, finishing and assembly.', ['Cutting, forming and welding', 'Certified welders', 'Finishing and assembly', 'Project gallery']],
      ['Plastics and molding', 'Materials, press tonnage, tooling, secondary operations and volumes.', ['Presses and tonnage', 'Resins and materials', 'Tooling and mold care', 'Sample request']],
      ['Industrial equipment makers', 'Models, specifications, service and spare parts, plus dealers by region.', ['A page per machine', 'Videos of the machines running', 'Service and spare parts', 'Dealers and reps']],
    ],
  },

  diferencial: {
    rotulo: 'How we start',
    titulo: 'You see your new website live before we talk price.',
    texto: 'We study your company and your current website and build two complete versions of the new site, with your logo, your colors, photos of your shop and the parts you make. Both go live on a preview link.',
    pontos: [
      ['Your real brand', 'Your logo, colors, photos and parts.'],
      ['Two versions', 'Both true to your brand, in different styles.'],
      ['Live', 'One link to open on your computer and your phone.'],
    ],
  },

  etapas: [
    ['Study', 'We review your company, your current website, your capabilities and how buyers find you today.', 'A 30-minute call and access to the material you already have.'],
    ['Two versions live', 'We design two complete versions of your new website and publish each one on a preview link.', 'Links to open on your computer and your phone.'],
    ['Choice and changes', 'You pick a version, ask for changes and approve each page.', 'A change list tracked until approval.'],
    ['Launch', 'The website goes live on your domain, with the RFQ form, Google search setup and contact tracking.', 'RFQs arriving in the right inbox.'],
    ['Ongoing care', 'We update capabilities and parts, run your ads and organize the sales routine.', 'Change requests by message and an RFQ report.'],
  ],

  paraQuem: {
    rotulo: 'Who it is for',
    titulo: 'Manufacturers that sell to other companies.',
    itens: [
      ['Machine shops', 'CNC milling, turning, Swiss and multi-axis work.'],
      ['Aerospace and defense', 'Suppliers of parts and assemblies.'],
      ['Medical devices', 'Contract manufacturing of components.'],
      ['Fabrication', 'Sheet metal, welding and structures.'],
      ['Plastics', 'Injection molding and machined plastics.'],
      ['Equipment makers', 'Machines, systems and industrial lines.'],
    ],
  },

  // Redesign studies: [image, industry, text].
  projetos: [
    ['p-northeastprecision', 'CNC machine shop, New Hampshire', 'English website with capabilities, materials, automated production and an RFQ path on every page.'],
    ['p-texian', 'Industrial engineering and assembly', 'Corporate website with a video hero, areas of work and dozens of inner pages.'],
    ['p-instor', 'Mobile robotics', 'Website in Portuguese, English and Spanish with solutions organized by application.'],
    ['p-toniolo', 'Tailings, dams and dredging', 'Three-language website with solutions, operation figures and a catalog.'],
    ['p-vordex', 'Industrial fabrication and maintenance', 'Website with services, in-house facilities and a quote request.'],
    ['p-sulpol', 'Plastics and masterbatch', 'Product catalog with a page per line and a quote request.'],
  ],
  legendaProjetos: 'Projects developed by Overtus as redesign studies. Brands and content belong to their respective companies. Their presence here does not imply a business relationship.',

  faq: [
    ['Can you work with a shop in the United States?', 'Yes. Everything happens online: a video call to understand your shop, live preview links to review the two versions, and change requests by email or message.'],
    ['Do you keep our logo and colors?', 'Yes. The new website starts from your current identity: logo, colors, photos and the parts you make. If buyers know your current site structure, we keep it and make it better.'],
    ['Can buyers upload drawings with the RFQ?', 'Yes. The form takes STEP, IGES, DXF and PDF files along with quantities, material, finish and due date. For controlled data, the form can collect only the contact.'],
    ['Do we need new photos of the shop?', 'We use the photos you already have. If something is missing, we tell you what is worth photographing and mark where an image is temporary.'],
    ['Who receives the RFQs?', 'Whoever you choose: your estimator’s email, a sales inbox or the CRM. Each request arrives with the drawing, the quantities and the buyer’s details.'],
    ['Can you also build a Spanish version?', 'Yes, with reviewed technical copy and a language switch on every page.'],
    ['What happens after launch?', 'We keep taking care of it: new capabilities, machines and parts, new pages, ads and the sales routine. Change requests are sent by message.'],
  ],

  chamada: {
    titulo: 'Sales structure for companies that really sell.',
    texto: 'Book a call with our team. We review your website and your sales presence and present a clear plan to improve them.',
    nota: 'No-obligation video call.',
  },

  menu: [
    ['solucoes', 'Solutions'],
    ['setores', 'Industries'],
    ['jornada', 'Search to PO'],
    ['como-trabalhamos', 'How we work'],
    ['contato', 'Contact'],
  ],

  paginas: {
    index: ['Overtus for manufacturers and machine shops', 'Websites with capabilities, equipment and certifications, RFQ forms with drawing upload, a rep portal and sales structure for manufacturers. See your new website live before we talk price.'],
    solucoes: ['Solutions for manufacturers · Overtus', 'Websites with capabilities and equipment, RFQ with drawing upload, catalog and quote list, rep portal, outreach, trade shows and a CRM for technical sales.'],
    'solucoes/sites': ['Websites for machine shops and manufacturers · Overtus', 'Capabilities, equipment list, materials, quality and certifications, industries served and parts gallery, built on your real brand.'],
    'solucoes/catalogo': ['RFQ and catalog for manufacturers · Overtus', 'RFQ form with STEP, IGES, DXF and PDF upload, and a searchable parts catalog with a quote list.'],
    'solucoes/representantes': ['Reps and outreach · Overtus', 'A portal for sales reps, prospect lists by industry and region, and a setup for trade shows.'],
    'solucoes/comercial': ['Sales structure for manufacturers · Overtus', 'A CRM for technical sales, a sales dashboard and automatic replies to follow every quote until it becomes a PO.'],
    setores: ['Industries · Overtus for manufacturers', 'What buyers in each industry look for and what the website shows: machine shops, aerospace, medical devices, fabrication, plastics and equipment makers.'],
    jornada: ['From search to purchase order · Overtus', 'The sales structure of a manufacturer at every stage: search, evaluation, RFQ, purchase order and repeat orders.'],
    'como-trabalhamos': ['How we work with manufacturers · Overtus', 'Study, two complete versions live, choice and changes, launch and ongoing care.'],
    perguntas: ['FAQ · Overtus for manufacturers', 'Answers about working with US shops, drawings and RFQs, photos, Spanish versions and what happens after launch.'],
    contato: ['Book a call · Overtus for manufacturers', 'Book a call with Overtus. We review your website and your sales presence.'],
  },
};
