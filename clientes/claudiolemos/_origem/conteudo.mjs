// Conteúdo do site do Dr. Cláudio Lemos, tirado de claudiolemos.com (home, contato, hospitais, menus) e da narração do
// vídeo de abertura (banner-novo.mp4). Cada texto vem em [pt, en, es]; en e es são traduções nossas.
export const LANGS = ['pt', 'en', 'es'];

export const C = {
  nome: 'Dr. Cláudio Lemos',
  url: 'https://claudiolemos.overtus.com.br/',
  antigo: 'https://claudiolemos.com/',
  tel: '(21) 3854-4688', telHref: '+552138544688',
  cel: '(21) 98648-4145', whats: '5521986484145',
  email: 'plasticaclaudiolemos@gmail.com', email2: 'contato@claudiolemos.com',
  rua: 'Rua Real Grandeza, 108, sala 311', predio: 'Real Medical Center', bairro: 'Botafogo', cidade: 'Rio de Janeiro', uf: 'RJ', cep: '22281-034',
  mapa: 'https://goo.gl/maps/Kc26Mtb5zdN2',
  instagram: 'https://www.instagram.com/plasticaclaudiolemos/', facebook: 'https://www.facebook.com/claudiolemos.com.br/',
  youtube: 'https://www.youtube.com/channel/UCURUBMx71jK80S8R8FCV5QA', video: 'https://www.youtube.com/watch?v=k6e0X2aIIiQ', linkedin: 'https://www.linkedin.com/in/dr-claudio-lemos-cirurgia-pl%C3%A1stica-a01673281/',
};

export const T = {
  // menu e botões
  inicio: ['Início', 'Home', 'Inicio'],
  dr: ['Dr. Cláudio Lemos', 'Dr. Cláudio Lemos', 'Dr. Cláudio Lemos'],
  proc: ['Cirurgias e procedimentos', 'Surgeries and procedures', 'Cirugías y procedimientos'],
  procCurto: ['Procedimentos', 'Procedures', 'Procedimientos'],
  hosp: ['Hospitais', 'Hospitals', 'Hospitales'],
  contato: ['Contato', 'Contact', 'Contacto'],
  agendar: ['Agendar avaliação', 'Book a consultation', 'Agendar consulta'],
  whatsMsg: ['Olá! Vim pelo site e gostaria de agendar uma avaliação com o Dr. Cláudio Lemos.', 'Hello! I found you through the website and would like to book a consultation with Dr. Cláudio Lemos.', '¡Hola! Vi el sitio web y me gustaría agendar una consulta con el Dr. Cláudio Lemos.'],
  conheca: ['Conheça o Dr. Cláudio', 'Meet Dr. Cláudio', 'Conozca al Dr. Cláudio'],
  verTodos: ['Ver todos os procedimentos', 'See all procedures', 'Ver todos los procedimientos'],
  verHosp: ['Ver os hospitais', 'See the hospitals', 'Ver los hospitales'],
  pular: ['Pular para o conteúdo', 'Skip to content', 'Ir al contenido'],
  abrirMenu: ['Abrir menu', 'Open menu', 'Abrir menú'],
  idioma: ['Idioma', 'Language', 'Idioma'],
  horario: ['Segunda a sexta, das 13h às 20h', 'Monday to Friday, 1 pm to 8 pm', 'Lunes a viernes, de 13 h a 20 h'],
  horarioT: ['Horário', 'Office hours', 'Horario'],
  endereco: ['Endereço', 'Address', 'Dirección'],
  telefones: ['Telefones', 'Phone', 'Teléfonos'],
  emails: ['E-mails', 'E-mail', 'Correos'],
  verMapa: ['Ver no mapa', 'Open in Maps', 'Ver en el mapa'],
  redes: ['Redes sociais', 'Social media', 'Redes sociales'],
  direitos: ['Todos os direitos reservados.', 'All rights reserved.', 'Todos los derechos reservados.'],
  aviso: ['As informações deste site são educativas e não substituem a consulta. Cada indicação é avaliada individualmente pelo cirurgião.', 'The information on this website is educational and does not replace a consultation. Every indication is assessed individually by the surgeon.', 'La información de este sitio es educativa y no sustituye la consulta. Cada indicación es evaluada individualmente por el cirujano.'],
  local: ['Botafogo, Rio de Janeiro', 'Botafogo, Rio de Janeiro', 'Botafogo, Río de Janeiro'],
  especialidade: ['Cirurgia plástica', 'Plastic surgery', 'Cirugía plástica'],

  // abertura (palavras do próprio Dr. Cláudio no vídeo da clínica)
  heroEyebrow: ['Cirurgião plástico no Rio de Janeiro', 'Plastic surgeon in Rio de Janeiro', 'Cirujano plástico en Río de Janeiro'],
  heroH1: ['A cirurgia plástica começa muito antes do centro cirúrgico.', 'Plastic surgery begins long before the operating room.', 'La cirugía plástica comienza mucho antes del quirófano.'],
  heroSub: ['Ela começa quando escutamos com atenção, respeitamos a individualidade e entendemos cada história.', 'It begins when we listen carefully, respect each person and understand every story.', 'Comienza cuando escuchamos con atención, respetamos la individualidad y entendemos cada historia.'],
  heroAssin: ['Dr. Cláudio Lemos, no vídeo de apresentação da clínica', 'Dr. Cláudio Lemos, in the clinic’s introduction video', 'Dr. Cláudio Lemos, en el video de presentación de la clínica'],
  videoPausa: ['Pausar vídeo', 'Pause video', 'Pausar video'],

  // profissional
  profEyebrow: ['O profissional', 'The surgeon', 'El profesional'],
  bio: ['Dr. Cláudio Lemos é cirurgião plástico estético, membro especialista e titular pela Sociedade Brasileira de Cirurgia Plástica. Também é membro efetivo da Associação dos ex-alunos do Prof. Ivo Pitanguy, da International Society of Plastic Surgery, da American Society of Plastic Surgery e do Colégio Brasileiro de Cirurgiões.',
    'Dr. Cláudio Lemos is an aesthetic plastic surgeon, a specialist and full member of the Brazilian Society of Plastic Surgery. He is also an active member of the Association of Former Students of Prof. Ivo Pitanguy, the International Society of Plastic Surgery, the American Society of Plastic Surgeons and the Brazilian College of Surgeons.',
    'El Dr. Cláudio Lemos es cirujano plástico estético, miembro especialista y titular de la Sociedad Brasileña de Cirugía Plástica. También es miembro efectivo de la Asociación de exalumnos del Prof. Ivo Pitanguy, de la International Society of Plastic Surgery, de la American Society of Plastic Surgeons y del Colegio Brasileño de Cirujanos.'],
  pitanguy: ['Tive a honra de ser aluno do professor Ivo Pitanguy, uma referência mundial que moldou minha forma de enxergar a cirurgia.', 'I had the honour of being a student of Professor Ivo Pitanguy, a world reference who shaped the way I see surgery.', 'Tuve el honor de ser alumno del profesor Ivo Pitanguy, una referencia mundial que moldeó mi forma de ver la cirugía.'],
  tecnologia: ['A tecnologia de ponta é uma aliada, mas só faz sentido quando aplicada com critério, segurança e experiência.', 'Advanced technology is an ally, but it only makes sense when applied with judgement, safety and experience.', 'La tecnología de punta es una aliada, pero solo tiene sentido cuando se aplica con criterio, seguridad y experiencia.'],
  planejamento: ['Cada planejamento é individual, criterioso e focado em naturalidade, segurança e harmonia.', 'Every plan is individual, careful and focused on a natural look, safety and harmony.', 'Cada planificación es individual, rigurosa y enfocada en la naturalidad, la seguridad y la armonía.'],
  acompanha: ['Cada paciente é acompanhado com responsabilidade técnica, critério e atenção individual.', 'Every patient is followed with technical responsibility, judgement and individual attention.', 'Cada paciente es acompañado con responsabilidad técnica, criterio y atención individual.'],
  titulosT: ['Sociedades e títulos', 'Societies and titles', 'Sociedades y títulos'],
  contatoBio: ['O especialista realiza cirurgias plásticas e procedimentos minimamente invasivos em mulheres, homens, idosos e crianças. Para cuidar do corpo de forma segura, é preciso uma longa conversa com o especialista para tirar todas as dúvidas e alinhar as expectativas sobre qualquer procedimento.',
    'He performs plastic surgery and minimally invasive procedures for women, men, older adults and children. Taking care of your body safely starts with a long conversation with the specialist, to answer every question and align expectations about any procedure.',
    'Realiza cirugías plásticas y procedimientos mínimamente invasivos en mujeres, hombres, adultos mayores y niños. Cuidar el cuerpo de forma segura exige una larga conversación con el especialista para aclarar todas las dudas y alinear las expectativas sobre cualquier procedimiento.'],

  // cirurgia plástica
  cpEyebrow: ['Cirurgia plástica', 'Plastic surgery', 'Cirugía plástica'],
  cpH: ['As cirurgias mais procuradas', 'The most sought-after surgeries', 'Las cirugías más buscadas'],
  cpP: ['A cirurgia plástica é realizada em homens e mulheres, atendendo à necessidade de cada paciente. As mais procuradas são ginecomastia, abdominoplastia, braquioplastia e mamoplastia redutora, entre outras.',
    'Plastic surgery is performed on men and women, according to each patient’s needs. The most requested include gynecomastia, abdominoplasty, brachioplasty and breast reduction, among others.',
    'La cirugía plástica se realiza en hombres y mujeres, según la necesidad de cada paciente. Las más buscadas son ginecomastia, abdominoplastia, braquioplastia y mamoplastia de reducción, entre otras.'],
  mapaEyebrow: ['Conheça todos os procedimentos', 'Explore every procedure', 'Conozca todos los procedimientos'],
  mapaH: ['Toque nos pontos para ver o que é tratado em cada região', 'Tap the points to see what is treated in each area', 'Toque los puntos para ver qué se trata en cada región'],
  mapaVer: ['Ver a lista completa', 'See the full list', 'Ver la lista completa'],

  // vídeos e depoimentos
  videosH: ['Vídeos do profissional', 'Videos', 'Videos del profesional'],
  videosP: ['Entrevistas, explicações sobre procedimentos e o dia a dia da clínica no canal do Dr. Cláudio Lemos.', 'Interviews, explanations about procedures and daily life at the clinic on Dr. Cláudio Lemos’s channel.', 'Entrevistas, explicaciones sobre procedimientos y el día a día de la clínica en el canal del Dr. Cláudio Lemos.'],
  videosBtn: ['Ver todos os vídeos', 'Watch all videos', 'Ver todos los videos'],
  depH: ['Depoimentos', 'Testimonials', 'Testimonios'],
  avaliacoes: ['Nota 5,0 no Google, com mais de 600 avaliações de pacientes', 'Rated 5.0 on Google, with more than 600 patient reviews', 'Nota 5,0 en Google, con más de 600 opiniones de pacientes'],

  // passo a passo
  passoEyebrow: ['Passo a passo', 'Step by step', 'Paso a paso'],
  passoH: ['Da primeira consulta ao acompanhamento depois da cirurgia', 'From the first consultation to follow-up after surgery', 'De la primera consulta al seguimiento después de la cirugía'],

  // hospitais
  hospEyebrow: ['Hospitais', 'Hospitals', 'Hospitales'],
  hospH: ['Cirurgias realizadas em hospitais de referência do Rio', 'Surgery performed in leading Rio de Janeiro hospitals', 'Cirugías realizadas en hospitales de referencia de Río'],
  hospP: ['Toda cirurgia plástica, estética ou reparadora, deve ser feita em hospital, com equipe médica de prontidão e estrutura completa. Não é luxo: é segurança.', 'Every plastic surgery, aesthetic or reconstructive, should take place in a hospital, with a medical team on call and full facilities. It is not a luxury: it is safety.', 'Toda cirugía plástica, estética o reparadora, debe realizarse en un hospital, con equipo médico de guardia y estructura completa. No es un lujo: es seguridad.'],

  // contato
  faleH: ['Fale conosco', 'Get in touch', 'Contáctenos'],
  faleP: ['Entre em contato para fazer uma avaliação completa e tirar todas as suas dúvidas sobre cirurgia plástica ou outro tratamento que deseja realizar.', 'Get in touch to book a full assessment and ask all your questions about plastic surgery or any other treatment you are considering.', 'Contáctenos para una evaluación completa y para aclarar todas sus dudas sobre cirugía plástica u otro tratamiento que desee realizar.'],
  fNome: ['Seu nome', 'Your name', 'Su nombre'], fEmail: ['Seu e-mail', 'Your e-mail', 'Su correo'], fTel: ['Telefone ou WhatsApp', 'Phone or WhatsApp', 'Teléfono o WhatsApp'],
  fInteresse: ['Procedimento de interesse', 'Procedure of interest', 'Procedimiento de interés'], fMsg: ['Mensagem', 'Message', 'Mensaje'],
  fWhats: ['Aceito receber o retorno pelo WhatsApp', 'I agree to be contacted on WhatsApp', 'Acepto recibir la respuesta por WhatsApp'],
  fEnviar: ['Enviar mensagem', 'Send message', 'Enviar mensaje'],
  fOk: ['Mensagem pronta. Nesta prévia o formulário não envia; no site no ar ela chega à equipe do Dr. Cláudio.', 'Message ready. In this preview the form does not send; on the live site it reaches Dr. Cláudio’s team.', 'Mensaje listo. En esta vista previa el formulario no envía; en el sitio publicado llega al equipo del Dr. Cláudio.'],
  localH: ['Localização', 'Location', 'Ubicación'],
  localP: ['O consultório fica no Real Medical Center, em Botafogo.', 'The office is at the Real Medical Center, in Botafogo.', 'El consultorio está en el Real Medical Center, en Botafogo.'],

  // páginas internas
  drH: ['Formação, sociedades e a forma de trabalhar', 'Training, societies and approach', 'Formación, sociedades y forma de trabajar'],
  clinicaH: ['A clínica', 'The clinic', 'La clínica'],
  clinicaP: ['Recepção, consultório e sala de procedimentos no Real Medical Center, em Botafogo. Imagens do vídeo de apresentação da clínica.', 'Reception, office and procedure room at the Real Medical Center, in Botafogo. Stills from the clinic’s introduction video.', 'Recepción, consultorio y sala de procedimientos en el Real Medical Center, en Botafogo. Imágenes del video de presentación de la clínica.'],
  imprensaH: ['Na imprensa', 'In the press', 'En la prensa'],
  procH: ['Cirurgias e procedimentos por perfil de paciente', 'Surgeries and procedures by patient profile', 'Cirugías y procedimientos por perfil de paciente'],
  procP: ['Mulheres, homens, crianças e idosos têm necessidades diferentes. Veja os procedimentos realizados pelo Dr. Cláudio Lemos em cada caso; a indicação é sempre definida em consulta.', 'Women, men, children and older adults have different needs. See the procedures Dr. Cláudio Lemos performs in each case; the indication is always defined in consultation.', 'Mujeres, hombres, niños y adultos mayores tienen necesidades diferentes. Vea los procedimientos que realiza el Dr. Cláudio Lemos en cada caso; la indicación siempre se define en consulta.'],
  hospPor: ['Por que operar em hospital?', 'Why operate in a hospital?', '¿Por qué operar en un hospital?'],
  hospPorP: ['Existe a ideia equivocada de que a cirurgia plástica é diferente de uma cirurgia convencional. Assim como ninguém imagina uma cirurgia cardíaca em qualquer consultório, a cirurgia plástica também deve ser tratada assim. Mesmo com todas as medidas de segurança, uma intercorrência pode acontecer, e no hospital a resposta é imediata.',
    'There is a common misconception that plastic surgery is different from conventional surgery. Just as nobody would picture heart surgery in an ordinary office, plastic surgery deserves the same standard. Even with every safety measure, a complication can happen, and in a hospital the response is immediate.',
    'Existe la idea equivocada de que la cirugía plástica es diferente de una cirugía convencional. Así como nadie imagina una cirugía cardíaca en cualquier consultorio, la cirugía plástica también debe tratarse así. Aun con todas las medidas de seguridad, puede ocurrir una complicación, y en el hospital la respuesta es inmediata.'],
  vantagensH: ['O que o hospital garante', 'What a hospital guarantees', 'Lo que garantiza el hospital'],
  contatoH: ['Agende sua avaliação', 'Book your consultation', 'Agende su consulta'],
};

export const titulos = [
  ['Especialista e membro em Cirurgia Plástica pela Sociedade Brasileira de Cirurgia Plástica (SBCP)', 'Specialist and member in Plastic Surgery, Brazilian Society of Plastic Surgery (SBCP)', 'Especialista y miembro en Cirugía Plástica por la Sociedad Brasileña de Cirugía Plástica (SBCP)'],
  ['Membro da Sociedade Americana de Cirurgia Estética (ASAPS)', 'Member of the American Society for Aesthetic Plastic Surgery (ASAPS)', 'Miembro de la Sociedad Americana de Cirugía Estética (ASAPS)'],
  ['Membro da Sociedade Americana de Cirurgia Plástica (ASPS)', 'Member of the American Society of Plastic Surgeons (ASPS)', 'Miembro de la Sociedad Americana de Cirugía Plástica (ASPS)'],
  ['Membro efetivo da Associação dos ex-alunos do Prof. Ivo Pitanguy (AExPI)', 'Active member of the Association of Former Students of Prof. Ivo Pitanguy (AExPI)', 'Miembro efectivo de la Asociación de exalumnos del Prof. Ivo Pitanguy (AExPI)'],
  ['Membro da Sociedade Internacional de Cirurgia Plástica Estética (ISAPS)', 'Member of the International Society of Aesthetic Plastic Surgery (ISAPS)', 'Miembro de la Sociedad Internacional de Cirugía Plástica Estética (ISAPS)'],
  ['Membro da Sociedade Internacional de Cirurgiões Plásticos Reparadores (ISPRES)', 'Member of the International Society of Plastic and Regenerative Surgeons (ISPRES)', 'Miembro de la Sociedad Internacional de Cirujanos Plásticos Reparadores (ISPRES)'],
  ['Reconhecimento na especialidade de Cirurgia Plástica pela Associação Médica Brasileira (AMB)', 'Board recognition in Plastic Surgery by the Brazilian Medical Association (AMB)', 'Reconocimiento en la especialidad de Cirugía Plástica por la Asociación Médica Brasileña (AMB)'],
  ['Instrutor na cadeira de Cirurgia Plástica do Hospital Federal da Lagoa (RJ)', 'Instructor in Plastic Surgery at Hospital Federal da Lagoa (Rio de Janeiro)', 'Instructor en la cátedra de Cirugía Plástica del Hospital Federal da Lagoa (RJ)'],
];

// Os 5 selos (louros) do site atual, na ordem do sprite selos.webp
export const selos = [
  ['Membro · Sociedade Americana de Cirurgia Plástica (ASPS)', 'Member · American Society of Plastic Surgeons (ASPS)', 'Miembro · Sociedad Americana de Cirugía Plástica (ASPS)'],
  ['Membro · Sociedade Internacional de Cirurgia Plástica (ISAPS)', 'Member · International Society of Aesthetic Plastic Surgery (ISAPS)', 'Miembro · Sociedad Internacional de Cirugía Plástica (ISAPS)'],
  ['Especialista · Sociedade Brasileira de Cirurgia Plástica (SBCP)', 'Specialist · Brazilian Society of Plastic Surgery (SBCP)', 'Especialista · Sociedad Brasileña de Cirugía Plástica (SBCP)'],
  ['Ex-aluno · Prof. Ivo Pitanguy (AExPI)', 'Former student · Prof. Ivo Pitanguy (AExPI)', 'Exalumno · Prof. Ivo Pitanguy (AExPI)'],
  ['Membro · Sociedade Americana de Cirurgia Estética (ASAPS)', 'Member · American Society for Aesthetic Plastic Surgery (ASAPS)', 'Miembro · Sociedad Americana de Cirugía Estética (ASAPS)'],
];

// As 12 cirurgias com ícone na home atual, na ordem do sprite icones.webp
export const destaques = [
  ['Facelifting', 'Facelift', 'Lifting facial'], ['Blefaroplastia', 'Blepharoplasty', 'Blefaroplastia'], ['Otoplastia', 'Otoplasty', 'Otoplastia'],
  ['Braquioplastia', 'Brachioplasty', 'Braquioplastia'], ['Mastopexia', 'Breast lift', 'Mastopexia'], ['Prótese de mama', 'Breast implants', 'Prótesis mamaria'],
  ['Mamoplastia redutora', 'Breast reduction', 'Mamoplastia de reducción'], ['Cirurgia pós-bariátrica', 'Post-bariatric surgery', 'Cirugía posbariátrica'],
  ['Abdominoplastia', 'Abdominoplasty', 'Abdominoplastia'], ['Prótese de glúteo', 'Gluteal implants', 'Prótesis de glúteo'],
  ['Lipoaspiração', 'Liposuction', 'Liposucción'], ['Cirurgia íntima', 'Intimate surgery', 'Cirugía íntima'],
];

// Dicionário dos nomes de procedimento (pt -> [en, es])
const N = {
  '8 Point Lift (MD Codes)': ['8 Point Lift (MD Codes)', '8 Point Lift (MD Codes)'],
  'Abdominoplastia': ['Abdominoplasty', 'Abdominoplastia'], 'Mini abdominoplastia': ['Mini abdominoplasty', 'Miniabdominoplastia'],
  'Aumento de lábios': ['Lip augmentation', 'Aumento de labios'], 'Bichectomia': ['Buccal fat removal', 'Bichectomía'],
  'Blefaroplastia': ['Blepharoplasty', 'Blefaroplastia'], 'Braquioplastia': ['Brachioplasty', 'Braquioplastia'],
  'Câncer de pele': ['Skin cancer', 'Cáncer de piel'], 'Cicatrizes': ['Scar revision', 'Cicatrices'],
  'Cirurgia de papada': ['Double chin surgery', 'Cirugía de papada'], 'Cirurgia íntima': ['Intimate surgery', 'Cirugía íntima'],
  'Cisto sebáceo': ['Sebaceous cyst', 'Quiste sebáceo'], 'Contorno corporal': ['Body contouring', 'Contorno corporal'],
  'Elevação do monte de Vênus': ['Mons pubis lift', 'Elevación del monte de Venus'], 'Enxerto de gordura': ['Fat grafting', 'Injerto de grasa'],
  'Expansor de pele': ['Tissue expander', 'Expansor de piel'], 'Gluteoplastia': ['Gluteoplasty', 'Gluteoplastia'],
  'Hiperidrose': ['Hyperhidrosis', 'Hiperhidrosis'], 'Hipertrofia de masseter': ['Masseter hypertrophy', 'Hipertrofia de masetero'],
  'Hipertrofia de mamilo': ['Nipple hypertrophy', 'Hipertrofia de pezón'], 'Lifting de coxas': ['Thigh lift', 'Lifting de muslos'],
  'Lifting facial (ritidoplastia)': ['Facelift (rhytidectomy)', 'Lifting facial (ritidoplastia)'],
  'Lipoaspiração': ['Liposuction', 'Liposucción'], 'Lipoaspiração com fuso de pele': ['Liposuction with skin excision', 'Liposucción con huso de piel'],
  'Lipoma': ['Lipoma', 'Lipoma'], 'Mama tuberosa': ['Tuberous breasts', 'Mama tuberosa'], 'Mamas assimétricas': ['Breast asymmetry', 'Mamas asimétricas'],
  'Mamilo invertido': ['Inverted nipple', 'Pezón invertido'], 'Rejuvenescimento das mãos': ['Hand rejuvenation', 'Rejuvenecimiento de manos'],
  'Mamoplastia redutora': ['Breast reduction', 'Mamoplastia de reducción'], 'Mastopexia': ['Breast lift', 'Mastopexia'],
  'Mentoplastia': ['Chin surgery (mentoplasty)', 'Mentoplastia'], 'Nano fat grafting': ['Nano fat grafting', 'Nano fat grafting'],
  'Orelha rasgada': ['Torn earlobe repair', 'Oreja rasgada'], 'Otoplastia': ['Otoplasty', 'Otoplastia'], 'Polimastia': ['Polymastia', 'Polimastia'],
  'Prótese de panturrilha': ['Calf implants', 'Prótesis de pantorrilla'], 'Peeling químico': ['Chemical peel', 'Peeling químico'],
  'Pós-bariátrica': ['Post-bariatric surgery', 'Posbariátrica'], 'Preenchimento de rugas': ['Wrinkle fillers', 'Relleno de arrugas'],
  'Prótese de glúteo': ['Gluteal implants', 'Prótesis de glúteo'], 'Prótese de mama': ['Breast implants', 'Prótesis mamaria'],
  'Ptose palpebral': ['Eyelid ptosis', 'Ptosis palpebral'], 'Revisão de implantes mamários': ['Breast implant revision', 'Revisión de implantes mamarios'],
  'Reconstrução de aréola e mamilo': ['Areola and nipple reconstruction', 'Reconstrucción de areola y pezón'], 'Queimaduras': ['Burns', 'Quemaduras'],
  'Queloide': ['Keloid', 'Queloide'], 'Reconstrução de mama': ['Breast reconstruction', 'Reconstrucción mamaria'],
  'Redução de lóbulo de orelha': ['Earlobe reduction', 'Reducción del lóbulo de la oreja'], 'Rinoplastia': ['Rhinoplasty', 'Rinoplastia'],
  'Rippling': ['Rippling', 'Rippling'], 'Tratamento de rugas': ['Wrinkle treatment', 'Tratamiento de arrugas'],
  'Síndrome de Poland': ['Poland syndrome', 'Síndrome de Poland'], 'Síndrome de Romberg': ['Romberg syndrome', 'Síndrome de Romberg'],
  'Skinbooster': ['Skinbooster', 'Skinbooster'], 'Subcisão para celulite': ['Subcision for cellulite', 'Subcisión para celulitis'],
  'Suspensão supercircular': ['Supercircular suspension', 'Suspensión supercircular'], 'Troca de prótese de silicone': ['Breast implant exchange', 'Cambio de prótesis de silicona'],
  'Vaser lipo': ['Vaser lipo', 'Vaser lipo'], 'Xantelasma': ['Xanthelasma', 'Xantelasma'], 'Ginecomastia': ['Gynecomastia', 'Ginecomastia'],
  'Kybella': ['Kybella', 'Kybella'], 'Preenchimento cutâneo': ['Dermal fillers', 'Relleno cutáneo'], 'Sculptra': ['Sculptra', 'Sculptra'],
  'Transplante capilar': ['Hair transplant', 'Trasplante capilar'],
  'Alterações congênitas das mamas': ['Congenital breast deformities', 'Alteraciones congénitas de las mamas'],
  'Orelha de abano (curativo Earwell)': ['Prominent ears (EarWell splint)', 'Orejas en asa (férula EarWell)'], 'Hemangioma': ['Hemangioma', 'Hemangioma'],
  'Nevo melanocítico congênito': ['Congenital melanocytic nevus', 'Nevo melanocítico congénito'], 'Polidactilia': ['Polydactyly', 'Polidactilia'],
  'Lábio leporino': ['Cleft lip', 'Labio leporino'], 'Belkyra': ['Belkyra', 'Belkyra'], 'Latisse': ['Latisse', 'Latisse'],
  'Kybella (queixo duplo)': ['Kybella (double chin)', 'Kybella (papada)'], 'Preenchimento de lábios': ['Lip fillers', 'Relleno de labios'],
  'Preenchimento de olheiras': ['Under-eye fillers', 'Relleno de ojeras'], 'Preenchimento do queixo': ['Chin fillers', 'Relleno de mentón'],
  'Preenchimento de têmporas e supercílios': ['Temple and brow fillers', 'Relleno de sienes y cejas'], 'Resurfacing a laser': ['Laser resurfacing', 'Resurfacing con láser'],
  'Toxina botulínica': ['Botulinum toxin', 'Toxina botulínica'], 'Ulthera': ['Ulthera', 'Ulthera'], 'Volite': ['Volite', 'Volite'], 'Laser': ['Laser', 'Láser'],
  'Ptose mamária': ['Breast ptosis (sagging)', 'Ptosis mamaria'], 'Correção de manchas': ['Dark spot correction', 'Corrección de manchas'],
  'Correção de sulcos': ['Fold correction', 'Corrección de surcos'],
};
export const nomeProc = (pt, i) => (i === 0 ? pt : (N[pt] || [pt, pt])[i - 1]);

// Grupos do menu atual. "pontos": regiões marcadas na foto do grupo (x e y em % da imagem), como no mapa da home atual.
export const grupos = [
  { id: 'feminina', img: 'mapa-mulher', nome: ['Femininas', 'Women', 'Femeninas'], titulo: ['Cirurgia plástica feminina', 'Plastic surgery for women', 'Cirugía plástica femenina'],
    itens: ['8 Point Lift (MD Codes)', 'Abdominoplastia', 'Aumento de lábios', 'Bichectomia', 'Blefaroplastia', 'Braquioplastia', 'Câncer de pele', 'Cicatrizes', 'Cirurgia de papada', 'Cirurgia íntima', 'Cisto sebáceo', 'Contorno corporal', 'Elevação do monte de Vênus', 'Enxerto de gordura', 'Expansor de pele', 'Gluteoplastia', 'Hiperidrose', 'Hipertrofia de masseter', 'Hipertrofia de mamilo', 'Lifting de coxas', 'Lifting facial (ritidoplastia)', 'Lipoaspiração', 'Lipoaspiração com fuso de pele', 'Lipoma', 'Mama tuberosa', 'Mamas assimétricas', 'Mamilo invertido', 'Mamoplastia redutora', 'Mastopexia', 'Mentoplastia', 'Mini abdominoplastia', 'Nano fat grafting', 'Orelha rasgada', 'Otoplastia', 'Peeling químico', 'Polimastia', 'Pós-bariátrica', 'Preenchimento de rugas', 'Prótese de glúteo', 'Prótese de mama', 'Prótese de panturrilha', 'Ptose palpebral', 'Queimaduras', 'Queloide', 'Reconstrução de aréola e mamilo', 'Reconstrução de mama', 'Redução de lóbulo de orelha', 'Rejuvenescimento das mãos', 'Revisão de implantes mamários', 'Rinoplastia', 'Rippling', 'Síndrome de Poland', 'Síndrome de Romberg', 'Skinbooster', 'Subcisão para celulite', 'Suspensão supercircular', 'Tratamento de rugas', 'Troca de prótese de silicone', 'Vaser lipo', 'Xantelasma'],
    pontos: [[56, 6, 'Toxina botulínica'], [66, 14, 'Preenchimento de têmporas e supercílios'], [57, 21, 'Preenchimento de olheiras'], [47, 27, '8 Point Lift (MD Codes)'], [41, 33, 'Preenchimento de lábios'], [37, 42, 'Preenchimento do queixo'], [56, 39, 'Hipertrofia de masseter'], [40, 56, 'Kybella (queixo duplo)']] },
  { id: 'masculina', img: 'mapa-homem', nome: ['Masculinas', 'Men', 'Masculinas'], titulo: ['Cirurgia plástica masculina', 'Plastic surgery for men', 'Cirugía plástica masculina'],
    itens: ['8 Point Lift (MD Codes)', 'Abdominoplastia', 'Bichectomia', 'Blefaroplastia', 'Câncer de pele', 'Cicatrizes', 'Cirurgia de papada', 'Cisto sebáceo', 'Contorno corporal', 'Enxerto de gordura', 'Expansor de pele', 'Ginecomastia', 'Hiperidrose', 'Hipertrofia de mamilo', 'Hipertrofia de masseter', 'Kybella', 'Lifting facial (ritidoplastia)', 'Lipoaspiração', 'Lipoma', 'Mentoplastia', 'Orelha rasgada', 'Otoplastia', 'Peeling químico', 'Pós-bariátrica', 'Preenchimento cutâneo', 'Prótese de glúteo', 'Prótese de panturrilha', 'Ptose palpebral', 'Queimaduras', 'Queloide', 'Redução de lóbulo de orelha', 'Rinoplastia', 'Sculptra', 'Síndrome de Poland', 'Síndrome de Romberg', 'Skinbooster', 'Transplante capilar', 'Tratamento de rugas', 'Vaser lipo', 'Xantelasma'],
    pontos: [[58, 14, 'Transplante capilar'], [60, 25, 'Toxina botulínica'], [73, 30, 'Preenchimento de têmporas e supercílios'], [66, 41, 'Preenchimento de olheiras'], [57, 45, 'Rinoplastia'], [57, 56, 'Preenchimento de lábios'], [55, 67, 'Mentoplastia'], [69, 60, 'Hipertrofia de masseter']] },
  { id: 'infantil', img: 'mapa-criancas', nome: ['Infantil', 'Children', 'Infantil'], titulo: ['Cirurgia plástica infantil', 'Paediatric plastic surgery', 'Cirugía plástica infantil'],
    itens: ['Alterações congênitas das mamas', 'Orelha de abano (curativo Earwell)', 'Hemangioma', 'Lábio leporino', 'Nevo melanocítico congênito', 'Otoplastia', 'Polidactilia', 'Queimaduras', 'Queloide'],
    pontos: [[13, 27, 'Orelha de abano (curativo Earwell)'], [27, 37, 'Lábio leporino'], [33, 60, 'Alterações congênitas das mamas'], [11, 59, 'Polidactilia'], [39, 50, 'Queimaduras'], [79, 32, 'Hemangioma'], [92, 58, 'Queloide'], [76, 62, 'Nevo melanocítico congênito']] },
  { id: 'minimamente-invasivos', img: 'mapa-mulher', nome: ['Minimamente invasivos', 'Minimally invasive', 'Mínimamente invasivos'], titulo: ['Procedimentos minimamente invasivos', 'Minimally invasive procedures', 'Procedimientos mínimamente invasivos'],
    itens: ['8 Point Lift (MD Codes)', 'Belkyra', 'Hipertrofia de masseter', 'Kybella (queixo duplo)', 'Latisse', 'Peeling químico', 'Preenchimento de lábios', 'Preenchimento de olheiras', 'Preenchimento de têmporas e supercílios', 'Preenchimento do queixo', 'Resurfacing a laser', 'Sculptra', 'Toxina botulínica', 'Ulthera', 'Volite'],
    pontos: [[56, 6, 'Toxina botulínica'], [62, 18, 'Latisse'], [57, 21, 'Preenchimento de olheiras'], [47, 27, 'Volite'], [41, 33, 'Preenchimento de lábios'], [37, 42, 'Preenchimento do queixo'], [56, 39, 'Ulthera'], [40, 56, 'Kybella (queixo duplo)']] },
  { id: 'idosos', img: 'mapa-idosa', nome: ['Idosos', 'Older adults', 'Adultos mayores'], titulo: ['Cirurgia plástica em idosos', 'Plastic surgery for older adults', 'Cirugía plástica en adultos mayores'],
    itens: ['Abdominoplastia', 'Blefaroplastia', 'Braquioplastia', 'Correção de manchas', 'Correção de sulcos', 'Lifting facial (ritidoplastia)', 'Ptose mamária', 'Rejuvenescimento das mãos'],
    pontos: [[37, 4, 'Blefaroplastia'], [44, 6, 'Lifting facial (ritidoplastia)'], [40, 8, 'Correção de sulcos'], [56, 14, 'Correção de manchas'], [37, 18, 'Braquioplastia'], [57, 20, 'Rejuvenescimento das mãos'], [46, 26, 'Ptose mamária'], [47, 36, 'Abdominoplastia']] },
];

export const passos = [
  ['Agendamento da consulta', 'Booking the consultation', 'Agendamiento de la consulta'],
  ['Dia da consulta', 'Consultation day', 'Día de la consulta'],
  ['Pedido de exames', 'Medical tests', 'Solicitud de exámenes'],
  ['Orçamento, com chamada para esclarecer dúvidas', 'Quote, with a call to answer your questions', 'Presupuesto, con llamada para aclarar dudas'],
  ['Consulta pré-cirúrgica', 'Pre-operative consultation', 'Consulta prequirúrgica'],
  ['Contato com o anestesista', 'Meeting the anaesthetist', 'Contacto con el anestesista'],
  ['Dia da cirurgia', 'Surgery day', 'Día de la cirugía'],
  ['Acompanhamento pós-cirúrgico', 'Post-operative follow-up', 'Seguimiento posquirúrgico'],
];

export const depoimentos = [
  ['O Dr. Cláudio é extremamente profissional e competente, sem falar em toda sua paciência, atenção e comprometimento. Me senti segura com a transparência e a riqueza de detalhes ao explicar cada procedimento e seus objetivos. Um excelente médico.',
    'Dr. Cláudio is extremely professional and competent, not to mention his patience, attention and commitment. I felt safe with the transparency and the detail with which he explained each procedure and its goals. An excellent doctor.',
    'El Dr. Cláudio es extremadamente profesional y competente, sin hablar de toda su paciencia, atención y compromiso. Me sentí segura con la transparencia y el detalle al explicar cada procedimiento y sus objetivos. Un excelente médico.'],
  ['Fui à clínica do Dr. Cláudio Lemos e fiquei muito satisfeita com o atendimento. Além de um excepcional cirurgião, Dr. Cláudio é sempre cortês e muito educado.',
    'I went to Dr. Cláudio Lemos’s clinic and was very pleased with the care. Besides being an exceptional surgeon, Dr. Cláudio is always courteous and polite.',
    'Fui a la clínica del Dr. Cláudio Lemos y quedé muy satisfecha con la atención. Además de un cirujano excepcional, el Dr. Cláudio es siempre cortés y muy educado.'],
  ['Dr. Cláudio, sua simplicidade é a sua marca! Muito obrigada pelo carinho e cuidado!', 'Dr. Cláudio, your simplicity is your hallmark! Thank you so much for your kindness and care!', '¡Dr. Cláudio, su sencillez es su marca! ¡Muchas gracias por el cariño y el cuidado!'],
];

export const hospitais = [
  { img: 'h-copa-star', nome: 'Hospital Copa Star', txt: ['Copacabana. Hospital de alto padrão, com experiência comparável à de um hotel cinco estrelas.', 'Copacabana. A high-end hospital with an experience comparable to a five-star hotel.', 'Copacabana. Hospital de alto nivel, con una experiencia comparable a un hotel cinco estrellas.'] },
  { img: 'h-copa-dor', nome: 'Hospital Copa D’Or', txt: ['Copacabana. Um dos hospitais mais conhecidos da Zona Sul.', 'Copacabana. One of the best-known hospitals in Rio’s South Zone.', 'Copacabana. Uno de los hospitales más conocidos de la Zona Sur.'] },
  { img: 'h-sao-jose', nome: 'Casa de Saúde São José', txt: ['Fundada em 1923, uma das instituições mais tradicionais da cidade.', 'Founded in 1923, one of the city’s most traditional institutions.', 'Fundada en 1923, una de las instituciones más tradicionales de la ciudad.'] },
  { img: 'h-perinatal', nome: 'Hospital Perinatal', txt: ['Hospital com mais de 30 anos de história no Rio de Janeiro.', 'A hospital with more than 30 years of history in Rio de Janeiro.', 'Hospital con más de 30 años de historia en Río de Janeiro.'] },
  { img: 'h-sao-vicente', nome: 'Clínica São Vicente', txt: ['Na Gávea desde 1933, pioneira em várias áreas da medicina.', 'In Gávea since 1933, a pioneer in several fields of medicine.', 'En Gávea desde 1933, pionera en varias áreas de la medicina.'] },
  { img: 'h-badim', nome: 'Hospital Badim', txt: ['Hospital com centro cirúrgico de ponta.', 'A hospital with a state-of-the-art surgical centre.', 'Hospital con quirófanos de última generación.'] },
];

export const vantagens = [
  ['Profissionais de todas as áreas da saúde presentes, preparados para agir numa emergência.', 'Professionals from every area of health on site, ready to act in an emergency.', 'Profesionales de todas las áreas de la salud presentes, preparados para actuar en una emergencia.'],
  ['Menor risco de infecção, com instrumentos esterilizados dentro das normas.', 'Lower risk of infection, with instruments sterilised to standard.', 'Menor riesgo de infección, con instrumental esterilizado según las normas.'],
  ['Hospitais que já são referência em saúde no Rio de Janeiro.', 'Hospitals that are already a reference in healthcare in Rio de Janeiro.', 'Hospitales que ya son referencia en salud en Río de Janeiro.'],
  ['Mais conforto e segurança para o paciente durante todo o procedimento.', 'More comfort and safety for the patient throughout the procedure.', 'Más comodidad y seguridad para el paciente durante todo el procedimiento.'],
  ['Cumprimento integral das exigências da Vigilância Sanitária.', 'Full compliance with health surveillance (Anvisa) requirements.', 'Cumplimiento integral de las exigencias de la Vigilancia Sanitaria.'],
];

export const imprensa = [
  { veiculo: 'GShow', titulo: 'Mônica Carvalho fez procedimento estético no rosto antes do No Limite', url: 'https://claudiolemos.com/imprensa/gshow-monica-carvalho-fez-procedimento-estetico-no-rosto-antes-do-no-limite-2023/' },
  { veiculo: 'Revista Caras', titulo: 'Edição 1466', url: 'https://claudiolemos.com/imprensa/revista-caras-edicao-1466/' },
];
