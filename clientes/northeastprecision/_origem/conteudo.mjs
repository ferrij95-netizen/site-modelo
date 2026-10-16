// Textos do site atual northeastprecisioncnc.com (WordPress, lidos pela API /wp-json/wp/v2/pages em 2026-10-16).
// Só reorganizados para o site novo; nada inventado sobre a empresa. Frases curtas de apoio estão marcadas em LEIA-ME.md.

export const empresa = {
  nome: 'North East Precision CNC',
  tagline: 'Measuring Success One Part at a Time',
  url: 'https://northeastprecision.overtus.com.br/',
  antigo: 'https://northeastprecisioncnc.com/',
  endereco: '4 Progress Drive, Dover, NH 03820',
  rua: '4 Progress Drive',
  cidade: 'Dover, New Hampshire 03820',
  telefone: '(603) 742-6247',
  telefoneHref: '+16037426247',
  emails: [
    { rotulo: 'For Quoting', email: 'steve@northeastprecisioncnc.com' },
    { rotulo: 'For Sales', email: 'jon@northeastprecisioncnc.com' },
    { rotulo: 'For Quality Questions', email: 'qc@northeastprecisioncnc.com' },
  ],
  cage: '0FLD1',
  redes: [
    { nome: 'YouTube', url: 'https://www.youtube.com/@NorthEastPrecisionCNC' },
    { nome: 'Facebook', url: 'https://www.facebook.com/share/1KDhyzwxnW/?mibextid=LQQJ4d' },
    { nome: 'Instagram', url: 'https://www.instagram.com/neprecisioncnc?igsh=MTFqZ2d6NWs3d2p0eQ==' },
  ],
  pdfs: {
    iso: 'https://northeastprecisioncnc.com/wp-content/uploads/2024/11/North-East-Precision-CNC-ISO-9001-2015.pdf',
    itar: 'https://northeastprecisioncnc.com/wp-content/uploads/2025/11/ITAR-Registration-Letter-REDACTED.pdf',
    ambiental: 'https://northeastprecisioncnc.com/wp-content/uploads/2024/11/Environmental_Compliance.pdf',
  },
};

export const sobre = {
  resumo: 'With 40 years of experience, North East Precision CNC provides exceptional service to a wide range of industries. Our recent investments in CNC milling, lathe departments, state-of-the-art inspection equipment, and automation with Universal Robots enable us to meet the complex and evolving needs of our clients. Our fully climate-controlled, 14,600-square-foot facility operates 24/7, specializing in high production runs.',
  resumo2: 'Trust our proven expertise in machining steel and aluminum to fulfill your high-volume manufacturing needs. Experience our commitment to quality and innovation today.',
  historia: 'Since our founding in 1985, North East Precision CNC has become a leader in precision manufacturing, driven by the need for high-quality parts with reliable on-time delivery. Over the years, we have built a reputation for innovation and dependability, making us a trusted partner for a wide range of industries.',
  expertise: ['Aluminum, Stainless Steel, and Steels Machining.', 'Automation Centers with Universal Robots: Enhancing efficiency, consistency and precision in our CNC milling and lathe departments.'],
  qualidade: 'Quality and customer service are at the heart of North East Precision CNC. Our fully-equipped quality control department ensures that only the best parts, products, and components leave our shop. We are dedicated to continuous improvement through the ISO 9001 process, and our recent investments in state-of-the-art machines, advanced inspection methods and automation further enhance our capabilities.',
  convite: 'Discover how our expertise, advanced technology, and unwavering commitment to quality can serve your manufacturing needs.',
  comunidade: [
    'Dover High School Career Technical Center Program (CTC) & Member of Dover High School Career Technical Center Advisory Board',
    'Sponsor First Robotics',
    'Donor New Hampshire Food Bank',
    'Member of Rochester High School Program Advisory Committee (PAC)',
  ],
  solar: 'We keep our impact on our environment at the forefront of our mind as we strive to minimize our carbon footprint. To that end, we have installed 365 solar panels boasting a 137 KW array.',
  reciclagem: 'North East Precision CNC is recycling 100% of all our cutting chips and fluids, achieving a zero-waste stream.',
  equipe: 'We have 18 machines, including lathes and mills, with eight robots on site, and we utilize AI and other new technologies daily. Our shop is ahead of its time for its size, with 20 full-time employees, family-run, and in business for 40 years.',
};

export const numeros = [
  { n: '40+', t: 'Years of experience', d: 'Founded in 1985 in Dover, NH' },
  { n: '24/7', t: 'Facility operation', d: 'Lights-out machining with robot cells' },
  { n: '100 – 25,000', t: 'Piece runs', d: 'High-volume production is our specialty' },
  { n: '20', t: 'Universal Robots', d: '(17) UR10e and (3) UR5e on the floor' },
  { n: '14,600', t: 'Sq ft, climate-controlled', d: 'Temperature and humidity managed' },
];

export const servicos = [
  { slug: 'turning', nome: 'CNC Turning', img: 'lathe-stock', texto: 'Mori Seiki and Takisawa lathes up to 3.10″ bar capacity and 8 axes, many of them tended by Universal Robots.', link: 'facilities/#lathes' },
  { slug: 'milling', nome: '5-Axis CNC Milling', img: 'sparks-stock', texto: 'Brother Speedio, DMU 50 and Okuma 5-axis centers with full part probing.', link: 'facilities/#mills' },
  { slug: 'automation', nome: 'Robot Automation', img: 'robot-cart', texto: 'Universal Robots load and unload parts day and night to scale capacity.', link: 'facilities/#robots' },
  { slug: 'inspection', nome: 'Inspection & QC', img: 'qc-room', texto: 'CMM, vision and laser measuring in a temperature and humidity-controlled room.', link: 'quality/' },
  { slug: 'edm', nome: 'Wire EDM & Finishing', img: 'edm-stock', texto: 'Fanuc Robocut wire EDM, hole popper, vibratory finishing, honing and bead blasting.', link: 'facilities/#edm' },
];

export const industrias = [
  { nome: 'Aerospace', icone: 'aviao' },
  { nome: 'Defense', icone: 'escudo' },
  { nome: 'Medical', icone: 'cruz' },
  { nome: 'Automotive', icone: 'carro' },
  { nome: 'Energy', icone: 'raio' },
  { nome: 'Heavy Equipment', icone: 'engrenagem' },
  { nome: 'Industrial Automation', icone: 'robo' },
  { nome: 'Consumer Electronics', icone: 'chip' },
];

export const certificados = [
  { nome: 'ISO 9001:2015', img: null, selo: 'ISO<br>9001:2015', texto: 'Machining of Metal and Plastic Parts to Customer Specification for Aerospace to Commercial. ISO 9001:2015 Certified as of September 1, 2018.', link: 'iso', rotulo: 'ISO 9001:2015 Certificate' },
  { nome: 'ITAR Registered', img: 'itar', texto: 'International Traffic in Arms Regulations. ITAR Compliant as of January 23, 2014.', link: 'itar', rotulo: 'ITAR DOS/DDTC Registration Letter' },
  { nome: 'FFL Type 7', img: 'ffl', texto: 'Federal License: FFL Type 7 Manufacturing License.' },
  { nome: 'CMMC Level 1', img: 'cmmc', texto: 'CMMC Level 1 Self-Assessment Completed, in accordance with DoD requirements (DFARS 252.204-7012).' },
  { nome: 'CAGE Code 0FLD1', img: null, selo: 'CAGE<br>0FLD1', texto: 'Registered with the CAGE Code 0FLD1. JCP Certified.' },
  { nome: 'ISO 13485:2016', img: 'iso13485', texto: 'Coming soon: Medical Devices. ISO 13485:2016 Quality Management System implementation in progress.' },
];

export const equipamentos = [
  { id: 'lathes', nome: 'CNC Lathes', img: 'robot-lathe', itens: [
    'MORI SEIKI NL-Y-2500, 3.10″ bar capacity, 8-axis', 'MORI SEIKI NL-2500, 3.10″ bar capacity, 3-axis', 'MORI SEIKI NL-2000, 2.56″ bar capacity, 4-axis',
    'MORI SEIKI NLXY-2000, 2.56″ bar capacity, 4-axis', 'MORI SEIKI NZX-2000, 2.56″ bar capacity, 8-axis', 'MORI SEIKI NL-1500, 2.05″ bar capacity, 3-axis',
    'TAKISAWA TCY-200IIYSLS, 2.01″ bar capacity, 6-axis', 'SUPERMAX ENGINE LATHE, 16″ × 43″', '(2) HARDINGE second-operation chuckers'] },
  { id: 'mills', nome: 'CNC Mills', img: 'shop-robots', itens: [
    'BROTHER TC-32B with 5-axis pallet system & full part probing', 'BROTHER SPEEDIO 300X2 with full part probing', 'BROTHER SPEEDIO M140X3 5-axis with turning & full part probing',
    'BROTHER SPEEDIO M200X3 5-axis with turning & full part probing', 'BROTHER SPEEDIO M300Xd1-5AX 5-axis with turning & full part probing', 'BROTHER SPEEDIO U500xd1 5-axis with full part probing',
    'Brother Speedio R450X1 Pallet Machine with full part probing', 'DMU 50 ECOLINE 5-axis with full part probing', 'KITAMURA 2XD SPARKCHARGER with full part probing',
    'OKUMA M560 (20″ × 40″) 5-axis with Koma rotary table & full part probing', 'BRIDGEPORT / PROTOTRAK 3-axis CNC, 3 HP, 10″ × 42″ table (conversational controls)', 'SHARP milling machine, 10″ × 52″ capacity'] },
  { id: 'robots', nome: 'Robot Automation', img: 'robot-cart', itens: ['(17) UNIVERSAL ROBOT UR10e', '(3) UNIVERSAL ROBOT UR5e', 'Utilizing AI technology and the latest software'] },
  { id: 'quality', nome: 'Quality Control', img: 'qc-room', itens: [
    'Two Full-Time Employees Dedicated to Inspection', 'Temperature and Humidity-controlled Room', 'HIGH QA – a Manufacturing Quality Management System',
    '(2) FOWLER CMM MARK 1 Coordinate Measuring Machine', 'THERMO FISHER NITRON XL5 Plus (Positive Material Identification Analyzer)', '(2) KEYENCE LM-X100TL (CMM/Vision/Laser measuring system)',
    'Sylvac F60T Optical Scanner', 'OPTICAL GAGE PRODUCT SMART SCOPE FLASH 302 (Vision/CMM measuring system)', 'Tesa Micro Hite Plus M600, 24″ – .00001″ Resolution',
    '(3) Tesa Micro Hite, 24″ – .0001″ Resolution', 'FOWLER MASTER GAGE BLOCK SET, calibrated/certified by outside company', '(4) 24″ × 36″ Starrett Granite Surface Plate',
    'Starrett HDV300 Horizontal Digital Video Comparator', 'BOWER HOLEMATIC XT3 BORE GAGES, .250 to 4.0″', 'MITUTOYO PROFILOMETER SJ-210',
    'All Standard Thread Ring and Thread Plug Gages – calibrated/certified by outside company', 'Gage pin sets ranging from .011 to 1.00″'] },
  { id: 'edm', nome: 'Electrical Discharge Machines (EDM)', img: 'wire-edm', itens: ['FANUC ROBOCUT C400iC-ADV wire EDM (X 15.75″, Y 11.75″, Z axis)', 'OCEAN/RIVER 600 HOLE POPPER, 12-position ATC (work table X 23.5″, Y 15.5″, Z axis)'] },
  { id: 'finishing', nome: 'Finishing', img: 'edm-stock', itens: ['ROYSON VIBRATORY FINISHING MACHINE – 6 ft diameter', 'MASS FINISHING INC HIGH ENERGY TUMBLER', 'GALLMEYER & LIVINGSTON #25 surface grinder', 'SUNNEN HONE machine', 'DAYTON BEAD BLASTING CABINET'] },
  { id: 'material', nome: 'Material Preparation & Support', img: 'shop-aisle', itens: ['HEM SAW with 12″ capacity', '2500 lb Clark Fork Lift', 'RAMCO ULTRASONIC 3-STATION PARTS WASHER'] },
];

export const inspecao = [
  { nome: 'Fowler CMM Mark 1', img: 'fowler-cmm', texto: 'Coordinate Measuring Machine (2 units).' },
  { nome: 'Keyence LM-X100TL', img: 'keyence-lmx', texto: 'CMM / vision / laser measuring system (2 units).' },
  { nome: 'OGP SmartScope Flash 302', img: 'ogp', texto: 'Multi-sensor vision/CMM measuring system.' },
  { nome: 'Keyence TM-X5000', img: 'keyence-tm', texto: 'High-speed measurement system.' },
  { nome: 'Starrett HDV300', img: 'comparator', texto: 'Horizontal digital video comparator.' },
];

export const software = [
  { nome: 'High QA®', img: 'highqa', texto: 'High QA software unites engineering, production and inspection teams internally and throughout the supply chain with an integrated solution to plan, manage, document and control manufacturing quality from ballooning and planning to production, reporting and submissions. With this software, North East Precision CNC can meet customer needs for FAI, APQP and PPAP process requirements. We can generate quality documents for ISO 9001:2015.' },
  { nome: 'uniPoint®', img: 'unipoint', texto: 'uniPoint is a complete compliance management software (QMS) solution that helps companies automate their processes.' },
  { nome: 'JobBoss®', img: 'jobboss', texto: 'JobBOSS is a management software and manufacturing ERP system which allows us to monitor the status of a job from start to finish, ensuring comprehensive tracking and traceability of materials throughout the manufacturing process.' },
];
export const modulosQualidade = ['uniPoint Quality Management Software', 'Non-Conformance Software Module', 'Corrective & Preventive Action Software Module', 'Tool & Equipment Management Software', 'Document Control Software Module', 'Customer Service Software Module', 'Key Indicators Dashboard', 'Trend Analysis Software Module', 'Inspection Manager Software Module', 'Risk Management Software Module', 'Auditing Software Module'];
export const jobboss = 'North East Precision CNC uses a cutting-edge job tracking system called “JobBOSS”. JobBOSS enables us to track the status of a Customer Order from the initial quotation to the final shipment. This system provides visibility by tracking and tracing material throughout the entire manufacturing process. Record Retention is 15 years.';

export const noticias = [
  { ano: '2026', titulo: 'Medical Devices: ISO 13485 in progress', texto: 'Coming soon: Medical Devices. ISO 13485:2016 Quality Management System implementation in progress.', img: 'medical' },
  { ano: '2025', titulo: 'Facility Updates', texto: 'Added 4 more Universal Robots and a 1,500 sq ft climate-controlled facility addition.', img: 'robot-cart' },
  { ano: '2024', titulo: 'Automation', texto: 'The automation improvements added 4 more Universal Robots and a Keyence TM-X5000 Measurement System.', img: 'keyence-tm' },
  { ano: '2023', titulo: 'FFL Type 7 Manufacturing License', texto: 'North East Precision CNC has received its FFL Type 7 Federal License.', img: 'ffl' },
  { ano: '2023', titulo: 'Quality Control', texto: 'The Quality Control improvements added a Keyence TM-X5000 Measurement System, a Fowler CMM Mark 1 Measuring System and our fifth Universal Robot.', img: 'fowler-cmm' },
  { ano: '2022', titulo: 'Robot Automation', texto: 'Our fourth Universal Robot was purchased with the intention of moving from work center to work center for loading and unloading parts and doing deburring tasks as well.', img: 'robot-tower' },
  { ano: '2021', titulo: 'Robot Automation', texto: 'North East Precision CNC put in its second and third Universal Robots with automated loading system.', img: 'robot-lathe' },
  { ano: '2021', titulo: 'Shop Air Conditioner', texto: 'Shop-wide air conditioning and air filtration system online summer of 2022.' },
  { ano: '2020', titulo: 'Robot Automation', texto: 'In January 2020 North East Precision CNC put in its first automated machine loading system. The Enduro-Loader Pro paired with the Universal Robot allows us to load 5-axis parts day and night and increase capacity. The automation system is the first in our Industry 4.0 mindset.', img: 'ur10e', video: 'TvwCqOVBFis' },
  { ano: '2020', titulo: 'Shipping and Parts Cleaning', texto: 'In early 2020 we added a custom Ramco parts washing unit and remodeled our shipping area. The machine comes equipped with an ultrasonic tank and an air knife drying unit, and can wash with deionized water for the customers that require it.' },
  { ano: '2019', titulo: 'Clean Energy', texto: 'In the fall of 2019 North East Precision finished construction of its nearly 350-panel solar array. The system provides enough clean energy to power the entire facility and more.', img: 'solar-field' },
  { ano: '2019', titulo: 'High Speed Inspection', texto: 'In early 2019 North East Precision added a Sylvac F60T and new inspection station. The Sylvac F60T offers high speed inspection for even the most complicated of turned parts, measuring some in just seconds.', img: 'inspection-station' },
  { ano: '2018', titulo: 'ISO 9001:2015 Certified!', texto: 'For over 30 years North East Precision CNC has been providing the highest quality machining services across many industries on a wide variety of materials. Our mission has always been to not only meet our customer’s expectations, but to exceed them. NEP CNC has achieved ISO 9001:2015 Certification.', img: 'inspection-station' },
  { ano: '2017', titulo: 'Shop Expansion!', texto: 'Since 2016 we have gone from 5,000 square feet to a total of 10,000 square feet. This expansion has allowed us to add many more machines and to streamline our operation to be much more efficient.' },
  { ano: '2017', titulo: 'New to our QC Department: Smart Scope', texto: 'The OGP Smart Scope Flash 302 is a versatile bench-top multi-sensor measurement machine. It combines optical, laser and tactile sensors to measure parts completely and efficiently.', img: 'ogp' },
  { ano: '2016', titulo: 'DMU 50 Ecoline Milling Center', texto: 'Powerful technology with five-sided machining, variable table options from fixed to swivel rotary for 5-axis simultaneous machining, a 12,000 rpm motor spindle and a 30-pocket tool magazine.', img: 'dmu50' },
];

export const videos = [
  { grupo: 'Machines', id: '27RURSyTljY', titulo: 'Keyence LM-X Demonstration' },
  { grupo: 'Machines', id: '67zbzlQlvuk', titulo: 'Universal Robot Loading and Unloading CNC Machine' },
  { grupo: 'Machines', id: 'aFjEX3TNH5k', titulo: 'UR10 Universal Robot Lathe Automation' },
  { grupo: 'Tutorials', id: '0OuVzUBhYko', titulo: 'Keyence LM-X Tutorial (Pt. 1)' },
];

export const materiais = {
  'steel-machining': {
    nome: 'Steel Machining', curto: 'Steel', img: 'lathe-stock',
    titulo: 'Steel Machining: Strength, Precision, and Durability for Demanding Applications',
    intro: 'At North East Precision CNC, steel machining is at the core of what we do. From structural components to high-performance machine parts, steel is one of the most versatile and widely used materials in CNC manufacturing. With its excellent strength, durability, and adaptability, steel remains a top choice across industries like aerospace, defense, heavy equipment, energy, and industrial automation.',
    oque: 'Steel machining refers to the process of shaping steel workpieces into finished parts using CNC equipment such as mills, lathes, and turning centers. We machine a wide range of steel grades, both ferrous and stainless, to meet the exact requirements of each part or project. Our multi-axis CNC machines, skilled technicians, and advanced programming allow us to produce complex geometries with tight tolerances and superior surface finishes.',
    porque: [
      { t: 'Superior Strength and Toughness', d: 'Ideal for components that need to withstand high loads, impacts, or wear.', l: ['Gears and shafts', 'Structural brackets', 'High-pressure fittings', 'Machine bases and housings'] },
      { t: 'Heat Treatment Compatibility', d: 'Steel responds well to heat treating, which can be used to:', l: ['Increase hardness', 'Improve wear resistance', 'Enhance tensile strength'] },
    ],
    graus: [['Mild steel', '1018, 1020', 'Affordable and easy to machine'], ['Alloy steel', '4140, 4340', 'Heat-treatable and high-strength'], ['Stainless steel', '304, 316, 17-4 PH', 'Excellent corrosion resistance'], ['Tool steel', 'A2, D2, O1', 'Wear-resistant and durable']],
    capacidades: ['High-speed milling and turning for precision parts', 'Threading, boring, and tapping operations', 'Custom fixture design for complex steel parts', 'Post-machining processes, including heat treatment and surface finishing', 'In-house quality control with CMMs and optical comparators'],
    volume: ['High-rigidity CNC machines capable of cutting hardened steels', 'Carbide tooling and optimized tool paths for efficiency and tool life', 'Coolant systems that reduce heat and prolong tool performance', 'Lights-out machining for scalable, around-the-clock production'],
    fecho: 'Steel machining requires precision, power, and process control, three things we’ve built our shop around. Contact us today to discuss your steel machining needs or request a quote. Let’s build something strong, together.',
  },
  'aluminum-machining': {
    nome: 'Aluminum Machining', curto: 'Aluminum', img: 'shop-robots',
    titulo: 'Aluminum Machining: Precision, Efficiency, and Versatility in CNC Manufacturing',
    intro: 'At North East Precision CNC, aluminum machining is one of our specialties. As a go-to material in industries like aerospace, automotive, medical, and consumer products, aluminum offers a powerful combination of strength, machinability, and lightweight performance.',
    oque: 'Aluminum machining uses CNC machines to shape, drill, mill, or cut aluminum into precise parts or components. Thanks to its strength-to-weight ratio, corrosion resistance, and thermal conductivity, it is a top choice for high-performance applications. We utilize advanced multi-axis CNC mills, lathes, and machining centers to produce complex aluminum parts with exceptional accuracy and consistency.',
    porque: [
      { t: 'Excellent Machinability', d: 'Aluminum is easier to machine than many other metals, which allows us to:', l: ['Cut faster and reduce cycle times', 'Achieve tight tolerances and clean finishes', 'Extend tool life and lower machining costs'] },
      { t: 'High Strength-to-Weight Ratio', d: 'Structural integrity without excess weight, ideal for:', l: ['Aerospace components', 'Automotive parts', 'Portable consumer products'] },
      { t: 'Corrosion Resistance and Thermal Conductivity', d: 'A protective oxide layer resists corrosion and heat dissipates efficiently, ideal for:', l: ['Heat sinks', 'Engine housings', 'Electronic enclosures'] },
    ],
    graus: [['6061', 'General purpose', 'Excellent strength and corrosion resistance'], ['7075', 'Aerospace grade', 'Known for its high strength'], ['2024', 'Structural', 'High fatigue resistance, ideal for structural components']],
    capacidades: ['3-, 4-, and 5-axis CNC milling', 'CNC turning for round components', 'Drilling, tapping, and threading', 'Surface finishing such as anodizing, bead blasting, and powder coating'],
    volume: ['High-speed spindles that optimize cutting efficiency', 'Automated material handling for uninterrupted production', 'Real-time quality monitoring to ensure part consistency'],
    fecho: 'If your project demands high-quality aluminum components with fast turnaround and competitive pricing, North East Precision CNC is your ideal CNC machining partner. Contact us today to discuss your aluminum machining project or request a quote.',
  },
};

export const vaga = {
  titulo: 'CNC Mill Machinist',
  texto: 'Join our innovative team at North East Precision CNC! We are excited to offer opportunities for experienced, full-time CNC Machinists and Machine Operators for our 1st shift operations, with prior work experience and/or formal training on multi-axis lathes. Enjoy our state-of-the-art, climate-controlled workspace and have every Friday off.',
  funcao: 'Key responsibilities include operating and setting up CNC lathes that have robots attending them at times. Ability to demonstrate strong technical, organizational, and communication skills. You will work collaboratively in a clean and hazard-free environment, taking proper care of equipment and materials.',
  beneficios: ['Every Friday off', 'Competitive wages', 'Medical insurance', 'Company matching 401(k)', 'Company-paid life insurance', 'Company-paid short and long-term disability', 'Vacation / sick pay', 'Holiday pay', 'Dental and vision at very low cost'],
  requisitos: ['Experience or a strong interest in manufacturing high-precision metal products', 'Understanding of blueprints', 'US citizenship is required', 'A basic understanding of GD&T and ISO is a plus', 'Consistently lifting 40 pounds; mathematical skills', 'High school diploma or GED', 'Use of basic hand tools, measuring tools, height gauges, and comparators'],
};

export const orcamento = 'North East Precision CNC would love the opportunity to quote your project and prove what a valuable partner we can be to your company. We are very cost effective with production runs. You may also call us at 603-742-6247 with any questions or special needs.';
