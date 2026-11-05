// ImplArt Odontologia (São Paulo/SP, perto da Av. Paulista): implantes, prótese, estética dental e enxerto ósseo.
// Gera public/{a,b}/ (pt) e public/{a,b}/en/ (inglês, como o site atual tem) e a página de escolha.
// node clientes/implart/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs implart https://www.implart.com.br/)
// Textos: páginas do site atual (WordPress/YOOtheme) em português e da versão /en/, resumidos sem mudar o sentido.
// Fotos: biblioteca de mídia do site atual (as originais têm no máximo 720 px; só a sala de espera é maior).
import { esc, ic, icWa, cabeca, link as linkPt, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from "node:path";
import fs from "node:fs";

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
let L = 'pt';
const t = (pt, en) => (L === 'en' ? en : pt);
const link = (v, s) => (L === 'en' ? `/${v}/en/${s === 'index' ? '' : `${s}/`}` : linkPt(v, s));
const linkOutro = (v, s) => (L === 'en' ? linkPt(v, s) : `/${v}/en/${s === 'index' ? '' : `${s}/`}`);

const E = {
  nome: 'ImplArt Odontologia', url: 'https://implart.overtus.com.br/', antigo: 'https://www.implart.com.br/',
  fone: '(11) 3262-4750', wa: '551132624750', email: 'contato@implart.com.br',
  rua: 'Rua Cincinato Braga, 37, cj. 112 (11º andar)', bairro: 'Bela Vista', cidade: 'São Paulo - SP', cep: '01333-011',
  insta: 'https://www.instagram.com/clinicaimplart/', face: 'https://www.facebook.com/ImplanteDentarioClinicaImplArt', yt: 'https://www.youtube.com/channel/UCdWWiXihVDictn26Dv50eQw',
  google: 'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+ImplArt+Rua+Cincinato+Braga+37+S%C3%A3o+Paulo',
};
export const nomesVersao = { a: 'Lavanda', b: 'Paulista' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Source+Sans+3:wght@400;600;700&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const chave = s => (L === 'en' ? (s === 'index' ? 'en' : `en/${s}`) : s);
const cores = { a: '#ffffff', b: '#2b1f5c' };

// ---------- conteúdo (pt / en) ----------
function D() {
  const nav = [
    { slug: 'implantes', nome: t('Implantes', 'Implants') },
    { slug: 'protese', nome: t('Prótese', 'Prosthesis') },
    { slug: 'estetica', nome: t('Estética', 'Aesthetics') },
    { slug: 'enxerto-osseo', nome: t('Enxerto ósseo', 'Bone graft') },
    { slug: 'clinica', nome: t('Clínica', 'Clinic') },
    { slug: 'contato', nome: t('Contato', 'Contact') },
  ];
  return {
    nav,
    curto: t('Clínica especializada em implante dentário, prótese e estética, com laboratório digital 3D próprio, a 50 m da Avenida Paulista.',
      'Specialist clinic in dental implants, prosthodontics and aesthetics, with its own 3D digital lab, 50 m from Paulista Avenue.'),
    intro: t('A clínica tem estrutura, equipe e experiência para tratamentos simples ou de alta complexidade em Implantodontia, Reabilitação Oral, Enxerto Ósseo e Prótese Dentária, com implantes de última geração e as mais novas técnicas de Odontologia Digital.',
      'Our clinic has the structure, team and experience for simple or highly complex treatments in Implantology, Oral Rehabilitation, Bone Grafting and Dental Prosthesis, using latest-generation implants and the newest Digital Dentistry techniques.'),
    gcr: t('Considerada a melhor clínica de implante dentário do Brasil pelo ranking internacional GCR desde 2017, após análise de equipamentos, estrutura física e técnicas vindas da Ásia, Europa e Estados Unidos.',
      'Considered the best dental implant clinic in Brazil by the international GCR ranking since 2017, after an assessment of our equipment, facilities and techniques from Asia, Europe and the United States.'),
    destaques: [
      { f: 'straumann', t: t('Implantes Straumann', 'Straumann implants'), d: t('O implante suíço Straumann é considerado o melhor do mundo: cicatriza mais rápido e é mais seguro.', 'The Swiss Straumann implant is considered the best in the world: it heals faster and is safer.'), s: 'implantes', a: 'straumann' },
      { f: 'coroa-3d', t: t('Coroa 3D de porcelana', '3D porcelain crown'), d: t('Coroa de porcelana para reconstruir dentes, com dentes provisórios impressos em 3D para provar antes.', 'Porcelain crowns to rebuild teeth, with 3D printed try-in teeth before the final work.'), s: 'protese', a: 'coroa-3d' },
      { f: 'protese-zirconia', t: t('Prótese em zircônia', 'Zirconia prosthesis'), d: t('A zircônia dental deixa a prótese fixa e a coroa mais resistentes. Somos pioneiros em zircônia multicamadas.', 'Dental zirconia makes fixed bridges and crowns stronger. We pioneered multilayer zirconia in Brazil.'), s: 'protese', a: 'zirconia' },
      { f: 'ad-lentes-1', t: t('Lentes de contato dentais', 'Dental veneers'), d: t('Lentes e facetas de porcelana, clareamento e tratamentos estéticos rápidos para o sorriso.', 'Porcelain veneers, whitening and quick aesthetic treatments for your smile.'), s: 'estetica', a: 'lentes' },
    ],
    estrutura: [
      { i: 'dente', t: t('Especialista em Implantodontia', 'Implantology specialists'), d: t('A melhor reputação e experiência em tratamentos com implantes simples ou complexos.', 'Strong reputation and experience with simple or complex implant treatments.') },
      { i: 'painel', t: t('Odontologia digital CAD-CAM', 'CAD-CAM digital dentistry'), d: t('Scanner intraoral e moldes 3D: próteses e coroas melhores, mais bonitas e mais rápidas.', 'Intraoral scanner and 3D models: better, more beautiful and faster crowns and prostheses.') },
      { i: 'engrenagem', t: t('Laboratório de prótese próprio', 'In-house dental lab'), d: t('Um laboratório digital dentro da clínica, para dentes novos em menos tempo.', 'A digital lab inside the clinic, for new teeth in less time.') },
      { i: 'relogio', t: 'Day Clinic', d: t('Tratamento rápido e completo, para quem tem pressa, vem de fora ou tem medo de dentista.', 'Fast, complete treatment for people in a hurry, coming from abroad or afraid of the dentist.') },
    ],
    dr: {
      nome: 'Dr. Roberto Markarian', cro: 'CRO-SP 73.583',
      cargo: t('Diretor clínico · Implantodontia e Prótese Dentária', 'Clinical director · Implantology and Prosthodontics'),
      texto: [
        t('É o dentista responsável pela clínica, com mais de 25 anos de experiência em Implantodontia, Prótese Dentária e Reabilitação Oral, e mais de 12.000 implantes realizados.',
          'He is the dentist in charge of the clinic, with more than 25 years of experience in Implantology, Prosthodontics and Oral Rehabilitation, and more than 12,000 implants placed.'),
        t('Sua filosofia une os avanços da ciência odontológica com a prática clínica. É pioneiro no Brasil no uso de Odontologia Digital 3D em todas as etapas do tratamento, com grande experiência em cirurgia de implantes guiada por computador e prótese protocolo de zircônia.',
          'His philosophy brings together advances in dental science and clinical practice. He pioneered the use of 3D Digital Dentistry in every stage of treatment in Brazil, with extensive experience in computer-guided implant surgery and full-arch zirconia prostheses.'),
      ],
      formacao: [
        t('Doutorado em Implantodontia (PhD)', 'Doctorate in Implantology (PhD)'),
        t('Pós-doutorado em Implantologia', 'Post-doctorate in Implantology'),
        t('Mestrado em Prótese Dentária, USP', 'Master in Dental Prosthesis Science, University of São Paulo'),
        t('Especialista em Implante Dentário, USP', 'Dental Implant Specialist, University of São Paulo'),
        t('Especialista em Prótese Dentária', 'Prosthodontics Specialist'),
        t('Pós-graduado por Harvard, Boston (EUA)', 'Postgraduate studies at Harvard, Boston (USA)'),
        t('Autor de capítulos de livros científicos internacionais sobre Implantodontia Digital (2022) e Inteligência Artificial em Prótese (2026)', 'Author of chapters in international scientific books on Digital Implantology (2022) and Artificial Intelligence in Prosthodontics (2026)'),
        t('Cirurgião do corpo clínico do Hospital Oswaldo Cruz', 'Surgeon on the clinical staff of Oswaldo Cruz Hospital'),
      ],
    },
    numeros: [['12.000+', t('implantes realizados', 'implants placed')], ['25', t('anos de experiência', 'years of experience')], ['4,8 ★', t('287 avaliações no Google', '287 Google reviews')], ['6', t('salas de atendimento', 'treatment rooms')]],
    depo: [
      { q: t('Extremamente satisfeito com o tratamento feito na Implart. Equipamentos de ponta, profissionais atenciosos e competentes, ênfase na excelência. Realmente uma tranquilidade poder contar com tratamento de tão alto nível.', 'Extremely satisfied with my treatment at Implart. State-of-the-art equipment, caring and competent professionals, a focus on excellence. It is a real peace of mind to count on such high-level care.'), n: 'Daniel Soares' },
      { q: t('Meu tratamento estético ficou perfeito. Excelentes profissionais que só concluem o tratamento se você estiver realmente satisfeito. Muito obrigada a todos vocês. Eu indico.', 'My aesthetic treatment turned out perfect. Excellent professionals who only finish the treatment when you are truly satisfied. Thank you all so much. I recommend them.'), n: 'Liz Rodrigues' },
      { q: t('Fiquei muito satisfeita com meus resultados, ótimo atendimento. O Dr. Roberto é sensacional, super atencioso, com toda a equipe super bem preparada.', 'I was very happy with my results, great service. Dr. Roberto is outstanding and very attentive, and the whole team is very well prepared.'), n: 'Maria Aparecida Malta' },
      { q: t('A Implart mudou minha vida.', 'Implart changed my life.'), n: 'Eliana Fagundes' },
    ],
    // implante: etapas (processo) e tipos
    oQue: [
      t('Implante dentário é uma raiz dental artificial instalada no osso maxilar pelo implantodontista. A cirurgia é pouco invasiva e repõe um dente perdido, vários dentes ou até a arcada completa.',
        'A dental implant is an artificial tooth root placed in the jaw bone by the implantologist. The surgery is minimally invasive and replaces one missing tooth, several teeth or even a full arch.'),
      t('O tratamento pode ser feito por qualquer pessoa com boa saúde bucal e geral, de qualquer idade. Como pré-requisito, é preciso ter osso na região, ou fazer antes um enxerto ósseo.',
        'Treatment can be done by anyone with good oral and general health, at any age. As a prerequisite, there must be bone in the area, or a bone graft is done first.'),
    ],
    etapas: [
      { t: t('Avaliação e tomografia', 'Assessment and CT scan'), d: t('Exame clínico, raio X e tomografia no centro radiológico da própria clínica.', 'Clinical exam, X-ray and CT scan in the clinic\'s own radiology center.') },
      { t: t('Planejamento digital', 'Digital planning'), d: t('O implante é planejado no computador, na posição da futura prótese.', 'The implant is planned on the computer, in the position of the future prosthesis.') },
      { t: t('Cirurgia guiada', 'Guided surgery'), d: t('Implantes guiados por computador, pouco invasivos, que podem ser feitos em Day Clinic.', 'Computer-guided, minimally invasive implant surgery that can be done in Day Clinic.') },
      { t: t('Osseointegração', 'Osseointegration'), d: t('O implante cicatriza e se une ao osso. Os implantes Straumann cicatrizam mais rápido.', 'The implant heals and bonds to the bone. Straumann implants heal faster.') },
      { t: t('Dente novo', 'New tooth'), d: t('Uma coroa ou prótese feita no laboratório digital, parecida com o dente natural na mastigação e na estética.', 'A crown or prosthesis made in the digital lab, similar to a natural tooth in chewing and looks.') },
    ],
    tipos: [
      { id: 'straumann', f: 'implante-coroa', t: t('Implante Straumann', 'Straumann implant'), d: t('Implante suíço considerado o melhor tipo de implante do mundo. A superfície SLActive cicatriza mais rápido e com mais segurança. Estamos entre os maiores usuários de implantes Straumann no Brasil.', 'Swiss implant considered the best type of implant in the world. The SLActive surface heals faster and more safely. We are among the largest users of Straumann implants in Brazil.') },
      { id: 'curto', f: 'implante-curto', t: t('Implante curto', 'Short implant'), d: t('Implantes de 4 a 6 mm para regiões com pouca altura de osso. Em alguns casos evitam o enxerto ósseo.', 'Implants of 4 to 6 mm for areas with little bone height. In some cases they avoid a bone graft.') },
      { id: 'estreito', f: 'implante-estreito', t: t('Implante estreito', 'Narrow implant'), d: t('Implantes de 2,9 mm de diâmetro para espaços pequenos ou osso fino.', 'Implants 2.9 mm in diameter for small gaps or thin bone.') },
      { id: 'zigomatico', f: 'implante-zigomatico', t: t('Implante zigomático', 'Zygomatic implant'), d: t('Implantes longos ancorados no osso zigomático, para quem perdeu muito osso na maxila e quer dentes fixos sem grandes enxertos.', 'Long implants anchored in the zygomatic bone, for patients who have lost a lot of upper jaw bone and want fixed teeth without large grafts.') },
      { id: 'zirconia', f: 'implante-zirconia', t: t('Implante de zircônia', 'Zirconia implant'), d: t('Implante cerâmico, sem metal, branco como o dente, indicado para quem busca máxima estética.', 'Ceramic, metal-free implant, white like a tooth, for those seeking the best aesthetics.') },
      { id: 'total', f: 'protese-provisoria', t: t('Implante total com carga imediata', 'Full arch with immediate loading'), d: t('Reabilitação de todos os dentes, superiores ou inferiores, com prótese fixa instalada logo após a cirurgia.', 'Rehabilitation of all upper or lower teeth, with a fixed prosthesis placed right after surgery.') },
    ],
    proteses: [
      { id: 'zirconia', f: 'protese-zirconia', t: t('Prótese protocolo em zircônia', 'Full-arch zirconia prosthesis'), d: t('A zircônia translúcida permite próteses fixas mais resistentes e naturais. Somos pioneiros no Brasil em pontes de zircônia translúcida multicamadas.', 'Translucent zirconia allows stronger, more natural fixed prostheses. We pioneered translucent multilayer full-contour zirconia bridges in Brazil.') },
      { id: 'coroa-3d', f: 'coroa-3d', t: t('Coroa de porcelana 3D', '3D porcelain crown'), d: t('Coroas de porcelana estética para reconstruir dentes. Antes da peça final, o paciente prova versões impressas em 3D.', 'Aesthetic porcelain crowns to rebuild teeth. Before the final piece, patients try on 3D printed versions.') },
      { id: 'provisoria', f: 'protese-provisoria', t: t('Prótese provisória total', 'Full temporary prosthesis'), d: t('Dentes fixos provisórios enquanto os implantes cicatrizam, para não ficar sem dentes em nenhum momento.', 'Fixed temporary teeth while implants heal, so you are never without teeth.') },
      { id: 'protocolo', f: 'protocolo', t: t('Prótese sobre implantes', 'Implant-supported prosthesis'), d: t('Opções em zircônia, zircônia com porcelana, metal com porcelana ou resina, com ou sem gengiva artificial.', 'Options in zirconia, zirconia with porcelain, metal with porcelain or resin, with or without artificial gum.') },
      { id: 'digital', f: 'planejamento', t: t('Prótese digital (CAD-CAM)', 'Digital prosthesis (CAD-CAM)'), d: t('Scanner intraoral no lugar da massa de moldagem, projeto no computador e fresadoras e impressoras 3D no laboratório próprio.', 'Intraoral scanner instead of impression paste, computer design and milling machines and 3D printers in our own lab.') },
    ],
    estetica: {
      intro: t('A odontologia estética restaura a beleza do sorriso com clareamento, restaurações em resina ou porcelana, cirurgia gengival (gengivectomia) e as modernas lentes de contato dental. A ImplArt usa Odontologia Digital em todos os tratamentos.',
        'Aesthetic dentistry restores the beauty of your smile with whitening, resin or porcelain restorations, gum surgery (gingivectomy) and modern dental veneers. ImplArt uses Digital Dentistry in every treatment.'),
      lentes: [
        t('As lentes de contato dental são lâminas de porcelana ultrafinas, coladas na superfície do dente com pouco ou nenhum desgaste. Corrigem:', 'Dental veneers are ultra-thin porcelain shells bonded to the tooth surface with little or no tooth reduction. They correct:'),
      ],
      corrige: [t('Manchas escuras ou brancas', 'Dark or white stains'), t('Pequenas fraturas ou lascas', 'Small fractures or chips'), t('Assimetrias', 'Asymmetries'), t('Formato ou tamanho irregular', 'Irregular shape or size'), t('Espaço entre os dentes (diastema)', 'Gaps between teeth (diastema)')],
      natural: t('A porcelana é biossegura e parecida com o dente natural em textura, cor e translucidez. Na ImplArt as lentes são projetadas por computador e feitas em impressoras 3D.',
        'Porcelain is biosafe and similar to natural teeth in texture, color and translucency. At ImplArt, veneers are computer designed and produced with 3D printers.'),
      outros: [t('Clareamento dental', 'Teeth whitening'), t('Alinhadores ortodônticos (plaquinhas)', 'Clear aligners'), t('Planejamento digital do sorriso', 'Digital smile design'), t('Gengivectomia', 'Gingivectomy'), t('Coroas de porcelana', 'Porcelain crowns')],
      harmonizacao: t('A harmonização orofacial equilibra a estética e a função oral, com benefícios para uma aparência mais rejuvenescida. É regulamentada pelo Conselho Federal de Odontologia (Resolução 198/2019).',
        'Orofacial harmonization balances aesthetics and oral function, for a more youthful look. It is regulated by the Brazilian Federal Council of Dentistry (Resolution 198/2019).'),
      harm: [
        { t: t('Bichectomia', 'Buccal fat removal'), d: t('Cirurgia para afinar o rosto, diminuindo as bochechas.', 'Surgery to slim the face by reducing the cheeks.') },
        { t: t('Preenchimento labial', 'Lip filler'), d: t('Com ácido hialurônico, harmoniza o formato dos lábios com o rosto.', 'With hyaluronic acid, it balances the shape of the lips with the face.') },
        { t: t('Bigode chinês', 'Nasolabial folds'), d: t('Suaviza a ruga que vai da asa do nariz ao canto da boca.', 'Softens the line that runs from the nose to the corner of the mouth.') },
        { t: t('Tratamento da papada', 'Double chin treatment'), d: t('Com ácido deoxicólico, a chamada lipo de papada enzimática.', 'With deoxycholic acid, the so-called enzymatic double chin lipolysis.') },
      ],
    },
    casos: [
      ['ad-lentes-1', t('Lentes dentais', 'Dental veneers')], ['ad-lentes-gengiva', t('Gengivectomia e lentes', 'Gingivectomy and veneers')], ['ad-emax', t('Gengivectomia e coroas E.max', 'Gingivectomy and E.max crowns')],
      ['ad-coroas', t('Lentes, coroas e clareamento', 'Veneers, crowns and whitening')], ['ad-sorriso-gengival', t('Sorriso gengival', 'Gummy smile')], ['ad-lentes-coroas', t('Lentes e coroas dentais', 'Veneers and crowns')],
      ['ad-lentes-4', t('Lentes dentais', 'Dental veneers')], ['ad-alinhador', t('Alinhamento e peeling gengival', 'Alignment and gum peeling')], ['ad-gengivectomia', t('Gengivectomia', 'Gingivectomy')],
    ],
    enxerto: {
      intro: [
        t('Os enxertos ósseos dentários não são necessariamente grandes nem invasivos. Na maioria dos casos são simples e pequenos, feitos para resolver a perda óssea com o máximo de eficiência e o mínimo de invasividade.',
          'Dental bone grafts are not necessarily large or invasive. In most cases they are simple and small, done to solve bone loss with maximum efficiency and minimum invasiveness.'),
        t('O enxerto reconstrói regiões da maxila e da mandíbula que perderam volume, quando o osso não tem condições para receber um implante. Às vezes é feito na mesma cirurgia da extração ou do implante; em outros casos, vem antes.',
          'A graft rebuilds areas of the upper or lower jaw that lost volume, when the bone cannot yet receive an implant. Sometimes it is done in the same surgery as the extraction or implant; in other cases, it comes first.'),
      ],
      frase: t('O objetivo do enxerto não é simplesmente acrescentar osso, mas reconstruir o volume necessário, em altura, espessura ou contorno, de acordo com a posição planejada do implante e da futura prótese.',
        'The goal of a graft is not simply to add bone, but to rebuild the volume needed, in height, width or contour, according to the planned position of the implant and the future prosthesis.'),
      materiais: [
        [t('Autógeno', 'Autogenous'), t('Do próprio paciente', 'From the patient'), t('Contém componentes do próprio tecido ósseo. Pode exigir uma segunda área cirúrgica.', 'Contains the patient\'s own bone components. May require a second surgical site.')],
        [t('Alógeno', 'Allogeneic'), t('Banco de tecidos humanos', 'Human tissue bank'), t('Reconstrói sem coletar osso do paciente, com material selecionado e rastreável.', 'Rebuilds without harvesting the patient\'s bone, using selected, traceable material.')],
        [t('Xenógeno', 'Xenogeneic'), t('Origem animal, geralmente bovina', 'Animal, usually bovine'), t('Atua como arcabouço para a regeneração óssea.', 'Works as a scaffold for bone regeneration.')],
        [t('Sintético', 'Synthetic'), t('Produzido industrialmente', 'Industrially made'), t('Diferentes composições e formatos, inclusive impressos em 3D.', 'Various compositions and shapes, including 3D printed.')],
      ],
      ganhos: [
        { f: 'enx-seio', t: t('Ganho vertical (em altura)', 'Vertical gain (height)'), d: t('Aumenta a altura do osso, por exemplo com a elevação do seio maxilar (sinus lift) na parte de trás da maxila.', 'Increases bone height, for example with a sinus lift in the back of the upper jaw.') },
        { f: 'enx-implante', t: t('Ganho horizontal (em espessura)', 'Horizontal gain (width)'), d: t('Amplia uma região de osso muito fina para instalar o implante na posição planejada.', 'Widens very thin bone so the implant can be placed in the planned position.') },
        { f: 'enx-extracao', t: t('Preenchimento e contorno', 'Filling and contour'), d: t('Preenche o espaço após a extração e preserva o desenho da gengiva ao redor do dente ou implante.', 'Fills the socket after an extraction and preserves the gum contour around the tooth or implant.') },
      ],
      forma: t('O enxerto em grânulos (em pó) se adapta a cavidades e defeitos específicos. O enxerto em bloco é uma peça planejada para reconstruções que pedem mais estabilidade e volume, às vezes fixada com parafusos e membranas.',
        'Particulate (granule) grafts adapt to specific cavities and defects. Block grafts are planned pieces for reconstructions that need more stability and volume, sometimes fixed with screws and membranes.'),
      nem: t('Nem toda perda óssea exige enxerto: em alguns casos o implantodontista pode indicar implantes mais curtos ou estreitos.', 'Not every bone loss requires a graft: in some cases the implantologist may choose shorter or narrower implants.'),
    },
    estruturaLista: [
      t('Centro de radiologia próprio (raio X e tomografia)', 'Own radiology center (X-ray and CT scan)'), t('Laboratório dental próprio', 'Own dental lab'),
      t('Cerâmicas avançadas, como zircônia e E.max', 'Advanced ceramics such as zirconia and E.max'), t('Moldagem digital com scanner intraoral, sem massa', 'Digital impressions with intraoral scanner, no paste'),
      t('Fresadoras e impressoras 3D para produzir dentes', 'Milling machines and 3D printers to make teeth'), t('Planejamento digital do sorriso', 'Digital smile design'),
      t('6 salas de atendimento completas', '6 fully equipped treatment rooms'), t('One Stop Clinic: todas as especialidades num só lugar', 'One Stop Clinic: all specialties in one place'),
      t('Atendimento hospitalar quando necessário', 'Hospital-based care when needed'), t('Harmonização facial', 'Facial harmonization'),
    ],
    espaco: [['sala-espera', t('Sala de espera', 'Waiting room')], ['recepcao', t('Recepção', 'Reception')], ['consultorio', t('Consultório', 'Treatment room')], ['sala-dr', t('Consultório', 'Treatment room')], ['radiologia', t('Centro radiológico', 'Radiology center')], ['escritorio', t('Sala de planejamento', 'Planning room')], ['espera', t('Sala de espera', 'Waiting room')], ['vista', t('Vista para a região da Paulista', 'View over the Paulista area')]],
    local: t('Desde 2019 num novo espaço a uma quadra da Avenida Paulista / Paraíso, pensado para oferecer mais qualidade, conforto e comodidade. Em frente ao Shopping Paulista, perto dos metrôs Brigadeiro, Vergueiro e Paraíso.',
      'Since 2019 in a new space one block from Paulista Avenue / Paraíso, designed for more quality, comfort and convenience. In front of Shopping Paulista mall, near Brigadeiro, Vergueiro and Paraíso metro stations.'),
    horario: [[t('Segunda a sexta', 'Monday to Friday'), '08:30 – 19:30'], [t('Sábado', 'Saturday'), '08:00 – 13:00']],
    chegar: [
      [t('Aeroporto de Guarulhos', 'Guarulhos Airport'), t('Táxi ou Uber, cerca de 45 minutos. Ou ônibus Airport Bus Service até a Av. Paulista (1h30) e metrô até a estação Brigadeiro.', 'Cab or Uber, about 45 minutes. Or the Airport Bus Service to Paulista Ave. (1h30) and the metro to Brigadeiro station.')],
      [t('Aeroporto de Congonhas', 'Congonhas Airport'), t('Táxi ou Uber, cerca de 15 minutos.', 'Cab or Uber, about 15 minutes.')],
      [t('Rodoviária Tietê', 'Tietê Bus Terminal'), t('Metrô linha 1-azul sentido Jabaquara, descer na estação Vergueiro.', 'Metro line 1-blue towards Jabaquara, get off at Vergueiro station.')],
      [t('Terminal Barra Funda', 'Barra Funda Terminal'), t('Metrô linha 3-vermelha até a Sé, linha 1-azul até Vergueiro. Cerca de 7 minutos a pé.', 'Metro line 3-red to Sé, then line 1-blue to Vergueiro. About a 7-minute walk.')],
    ],
  };
}

// ---------- partes comuns ----------
function head(v, s, titulo, descricao) {
  const tt = s === 'index' ? `${E.nome} | ${t('Implante dentário perto da Av. Paulista, São Paulo', 'Dental implants near Paulista Ave., São Paulo')}` : `${titulo} | ImplArt`;
  let h = cabeca({ E, v, slug: chave(s), titulo: tt, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v], lang: t('pt-BR', 'en') });
  const pt = `${E.url}${v}/${s === 'index' ? '' : `${s}/`}`, en = `${E.url}${v}/en/${s === 'index' ? '' : `${s}/`}`;
  h = h.replace('<link rel="icon"', `<link rel="alternate" hreflang="pt-BR" href="${pt}">\n<link rel="alternate" hreflang="en" href="${en}">\n<link rel="icon"`);
  if (L === 'en') h = h.replace('og:locale" content="pt_BR"', 'og:locale" content="en_US"').replace('Pular para o conteúdo', 'Skip to content');
  return h;
}
function idiomas(v, s) {
  const a = `<a href="${link(v, s)}" class="ativo" aria-current="true" lang="${t('pt-BR', 'en')}">${t('PT', 'EN')}</a>`;
  const b = `<a href="${linkOutro(v, s)}" lang="${t('en', 'pt-BR')}" hreflang="${t('en', 'pt-BR')}" title="${t('English version', 'Versão em português')}">${t('EN', 'PT')}</a>`;
  return `<div class="idiomas">${L === 'pt' ? a + b : b + a}</div>`;
}
const marca = (claro = false) => `<img class="logo" src="/assets/marca${claro ? '-clara' : ''}.svg" alt="ImplArt Odontologia" width="151" height="77">`;
const waMsg = () => waHref(E.wa, t('Olá! Vim pelo site e gostaria de agendar uma avaliação.', 'Hello! I found you on the website and would like to book an appointment.'));

function topo(v, s, d) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${t('A 50 m da Av. Paulista · Bela Vista, São Paulo', '50 m from Paulista Ave. · Bela Vista, São Paulo')}</span><span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>${idiomas(v, s)}</span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, ${t('página inicial', 'home page')}">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="${t('Principal', 'Main')}"><ul>${d.nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}#agendar">${ic('calendario')}${t('Agendar', 'Book')}</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="${t('Abrir menu', 'Open menu')}">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v, d) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${marca(true)}<p>${d.curto}</p><p>${t('Responsável técnico', 'Clinical director')}: ${d.dr.nome}, ${d.dr.cro}.</p></div>
    <div><h3>${t('Páginas', 'Pages')}</h3><ul>${[{ slug: 'index', nome: t('Início', 'Home') }, ...d.nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>${t('Contato', 'Contact')}</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.fone}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">+55 ${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade} · CEP ${E.cep}</span></li>
      <li>${ic('relogio')}<span>${d.horario.map(h => `${h[0]}: ${h[1]}`).join('<br>')}</span></li>
    </ul><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></p></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ImplArt Odontologia. ${t('Todos os direitos reservados.', 'All rights reserved.')}</span><span>${t('Prévia feita pela Overtus', 'Preview by Overtus')}</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="${esc(t('Olá! Vim pelo site da ImplArt e quero agendar uma avaliação.', 'Hello! I found ImplArt\'s website and would like to book an appointment.'))}" id="agendar">
  <div class="form-duas"><label>${t('Nome', 'Name')}<input name="nome" required autocomplete="name"></label><label>${t('Telefone', 'Phone')}<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>${t('Interesse', 'Interest')}<select name="interesse"><option>${t('Implante dentário', 'Dental implant')}</option><option>${t('Prótese', 'Prosthesis')}</option><option>${t('Lentes de contato dental', 'Dental veneers')}</option><option>${t('Enxerto ósseo', 'Bone graft')}</option><option>${t('Harmonização orofacial', 'Orofacial harmonization')}</option><option>${t('Outro', 'Other')}</option></select></label></div>
  <label>${t('Mensagem', 'Message')}<textarea name="mensagem" rows="4" placeholder="${t('Conte o que você precisa e o melhor dia e horário', 'Tell us what you need and your preferred day and time')}"></textarea></label>
  <button class="btn" type="submit">${icWa()}${t('Enviar pelo WhatsApp', 'Send via WhatsApp')}</button>
  <p class="form-nota">${t('A mensagem abre pronta no WhatsApp da clínica. Se preferir, ligue:', 'The message opens ready in the clinic\'s WhatsApp. Or call:')} +55 ${E.fone}.</p>
</form>`;
const mapaFrame = `<iframe class="mapa" title="Mapa ImplArt" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Cincinato Braga, 37, Bela Vista, São Paulo SP')}&z=16&output=embed"></iframe>`;
const contatoLista = d => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">+55 ${E.fone}</a></div></li>
  <li>${ic('tel')}<div><strong>${t('Telefone', 'Phone')}</strong><a href="${telHref(E.fone)}">+55 ${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>${t('Endereço', 'Address')}</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade} · CEP ${E.cep}</span><span>${t('Edifício Antônio Huespe', 'Antônio Huespe Building')}</span></div></li>
  <li>${ic('relogio')}<div><strong>${t('Horário', 'Opening hours')}</strong>${d.horario.map(h => `<span>${h[0]}: ${h[1]}</span>`).join('')}</div></li>
</ul>`;
const etapas = d => `<ol class="etapas">${d.etapas.map((e, i) => `<li class="sobe"><span class="n">${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>`;
const galeriaCasos = (d, n = 9) => `<ul class="casos">${d.casos.slice(0, n).map(c => `<li><a href="/assets/img/${c[0]}.webp" data-foto="${esc(c[1])}">${img(c[0], `${c[1]}: ${t('antes (em cima) e depois (embaixo)', 'before (top) and after (bottom)')}`)}<span>${c[1]}</span></a></li>`).join('')}</ul>`;
const depoimentos = d => `<div class="depos">${d.depo.map(x => `<figure class="depo sobe"><span class="estrelas" aria-label="5 ${t('estrelas', 'stars')}">★★★★★</span><blockquote><p>${x.q}</p></blockquote><figcaption>${x.n}</figcaption></figure>`).join('')}</div>`;
const google = () => `<a class="google" href="${E.google}" target="_blank" rel="noopener"><b>4,8</b><span class="estrelas">★★★★★</span><span>${t('287 avaliações no Google', '287 Google reviews')}</span></a>`;

// páginas internas: iguais nas duas versões, cada versão passa o cabeçalho (cab) e a forma da lista (item)
function comum(v, pag, cab, item, d, cta) {
  pag[chave('implantes')] = head(v, 'implantes', t('Implante dentário', 'Dental implants'), d.oQue[0]) + topo(v, 'implantes', d) + cab(t('Implantodontia', 'Implantology'), t('O que é um implante dentário', 'What is a dental implant'), 'implante-coroa', d.oQue[0]) + `
<div class="in"><section class="texto-pag"><div><p class="lead">${d.oQue[1]}</p><p>${t('A Implantodontia permite repor um dente, vários dentes ou a arcada completa, num implante total com carga imediata para a reabilitação de todos os dentes.', 'Implantology lets us replace one tooth, several teeth or the full arch, with immediate loading for a complete oral rehabilitation.')}</p></div><aside class="caixa"><h3>${t('Por que Straumann', 'Why Straumann')}</h3><p>${d.destaques[0].d}</p>${img('straumann', 'Implante Straumann')}</aside></section>
<section class="bloco"><header class="tit"><p class="k">${t('Passo a passo', 'Step by step')}</p><h2>${t('Como é o tratamento com implante', 'How implant treatment works')}</h2></header>${etapas(d)}</section>
<section class="bloco"><header class="tit"><p class="k">${t('Tipos de implante', 'Implant types')}</p><h2>${t('Um implante para cada caso', 'An implant for every case')}</h2></header>${item(d.tipos, v)}</section></div>
` + cta(v) + rodape(v, d);

  pag[chave('protese')] = head(v, 'protese', t('Prótese dentária', 'Dental prosthesis'), d.proteses[0].d) + topo(v, 'protese', d) + cab(t('Prótese dentária', 'Prosthodontics'), t('Dentes novos feitos no nosso laboratório digital', 'New teeth made in our own digital lab'), 'protese-zirconia', t('Coroas e próteses projetadas no computador e produzidas dentro da clínica: melhores, mais bonitas e mais rápidas.', 'Crowns and prostheses designed on the computer and produced inside the clinic: better, more beautiful and faster.')) + `
<div class="in"><section class="bloco">${item(d.proteses, v)}</section></div>
` + cta(v) + rodape(v, d);

  const es = d.estetica;
  pag[chave('estetica')] = head(v, 'estetica', t('Estética dental', 'Dental aesthetics'), es.intro) + topo(v, 'estetica', d) + cab(t('Estética dental', 'Dental aesthetics'), t('Sorriso mais bonito e harmonioso', 'A more beautiful, harmonious smile'), 'ad-lentes-3', es.intro) + `
<div class="in"><section class="texto-pag" id="lentes"><div><h2>${t('Lentes de contato dental e facetas de porcelana', 'Dental veneers and porcelain laminates')}</h2><p>${es.lentes[0]}</p>${lista(es.corrige)}<p>${es.natural}</p></div><aside class="caixa"><h3>${t('Outros tratamentos estéticos', 'Other aesthetic treatments')}</h3>${lista(es.outros)}</aside></section>
<section class="bloco"><header class="tit"><p class="k">${t('Antes e depois', 'Before and after')}</p><h2>${t('Casos tratados na ImplArt', 'Cases treated at ImplArt')}</h2><p>${t('Fotos de pacientes da clínica. Em cada foto, em cima é antes e embaixo é depois.', 'Photos of our patients. In each photo, top is before and bottom is after.')}</p></header>${galeriaCasos(d)}</section>
<section class="bloco harm" id="harmonizacao"><header class="tit"><p class="k">${t('Harmonização orofacial', 'Orofacial harmonization')}</p><h2>${t('Equilíbrio entre estética e função', 'Balance between aesthetics and function')}</h2><p>${es.harmonizacao}</p></header><ul class="harm-lista">${es.harm.map(h => `<li class="sobe"><h3>${h.t}</h3><p>${h.d}</p></li>`).join('')}</ul></section></div>
` + cta(v) + rodape(v, d);

  const en = d.enxerto;
  pag[chave('enxerto-osseo')] = head(v, 'enxerto-osseo', t('Enxerto ósseo', 'Bone graft'), en.intro[0]) + topo(v, 'enxerto-osseo', d) + cab(t('Enxerto ósseo dentário', 'Dental bone graft'), t('Não tenha medo do enxerto de osso', 'Don\'t be afraid of bone grafts'), 'enx-biomateriais', en.intro[0]) + `
<div class="in"><section class="texto-pag"><div><p class="lead">${en.intro[1]}</p><p>${t('Na ImplArt, a indicação é feita com avaliação clínica, tomografia computadorizada e planejamento protético.', 'At ImplArt, the indication is based on a clinical exam, CT scan and prosthetic planning.')}</p><p>${en.forma}</p><p>${en.nem}</p></div><aside class="citacao"><blockquote><p>“${en.frase}”</p></blockquote><p><b>${d.dr.nome}</b><br>${d.dr.cro}</p></aside></section>
<section class="bloco"><header class="tit"><p class="k">${t('Objetivo do enxerto', 'Goal of the graft')}</p><h2>${t('Altura, espessura ou contorno', 'Height, width or contour')}</h2></header><div class="ganhos">${en.ganhos.map(g => `<article class="sobe"><figure>${img(g.f, g.t)}</figure><h3>${g.t}</h3><p>${g.d}</p></article>`).join('')}</div></section>
<section class="bloco"><header class="tit"><p class="k">${t('Biomateriais', 'Biomaterials')}</p><h2>${t('Tipos de enxerto ósseo', 'Types of bone graft')}</h2></header><div class="tabela-rola"><table class="tabela"><thead><tr><th>${t('Material', 'Material')}</th><th>${t('Origem', 'Origin')}</th><th>${t('Características', 'Features')}</th></tr></thead><tbody>${en.materiais.map(m => `<tr><th>${m[0]}</th><td>${m[1]}</td><td>${m[2]}</td></tr>`).join('')}</tbody></table></div>
<ul class="galeria galeria-3">${[['enx-sinus', 'Sinus lift'], ['enx-granulos', t('Enxerto particulado em grânulos', 'Particulate graft granules')], ['enx-summers', t('Técnica de Summers', 'Summers technique')]].map(e => `<li><a href="/assets/img/${e[0]}.webp" data-foto="${esc(e[1])}">${img(e[0], e[1])}</a></li>`).join('')}</ul></section></div>
` + cta(v) + rodape(v, d);

  pag[chave('clinica')] = head(v, 'clinica', t('A clínica', 'The clinic'), d.gcr) + topo(v, 'clinica', d) + cab(t('A clínica', 'The clinic'), t('Estrutura completa perto da Avenida Paulista', 'A complete clinic near Paulista Avenue'), 'recepcao', d.gcr) + `
<div class="in"><section class="dr-pag"><figure>${img('dr-markarian', `${d.dr.nome}`)}</figure><div><p class="k">${d.dr.cargo}</p><h2>${d.dr.nome}</h2>${d.dr.texto.map(p => `<p>${p}</p>`).join('')}<h3>${t('Formação', 'Education')}</h3>${lista(d.dr.formacao)}</div></section>
<section class="bloco"><header class="tit"><p class="k">${t('Estrutura', 'Facilities')}</p><h2>${t('Os destaques dos nossos tratamentos', 'What sets our treatments apart')}</h2></header><div class="duas-col">${lista(d.estruturaLista)}<figure class="foto-alta">${img('dr-markarian-cad', t('Planejamento digital no computador', 'Digital planning on the computer'))}</figure></div></section>
<section class="bloco"><header class="tit"><p class="k">${t('O espaço', 'Our space')}</p><h2>${t('Conheça a clínica', 'Take a look inside')}</h2></header><ul class="galeria">${d.espaco.map(e => `<li><a href="/assets/img/${e[0]}.webp" data-foto="${esc(e[1])}">${img(e[0], e[1])}</a></li>`).join('')}</ul></section>
<section class="bloco"><header class="tit tit-linha"><div><p class="k">${t('Depoimentos', 'Testimonials')}</p><h2>${t('O que dizem os pacientes', 'What our patients say')}</h2></div>${google()}</header>${depoimentos(d)}</section></div>
` + cta(v) + rodape(v, d);

  pag[chave('contato')] = head(v, 'contato', t('Contato', 'Contact'), `${t('Agende', 'Book')}: +55 ${E.fone}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato', d) + cab(t('Localização e contato', 'Location and contact'), t('Agende sua consulta', 'Book your appointment'), 'sala-espera', d.local) + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>${t('Fale com a clínica', 'Talk to the clinic')}</h2>${formulario()}</div><div>${contatoLista(d)}${mapaFrame}</div></section>
<section class="bloco"><header class="tit"><p class="k">${t('Como chegar', 'How to get here')}</p><h2>${t('Fácil de chegar de qualquer lugar', 'Easy to reach from anywhere')}</h2><p>${t('Avenida Paulista a 50 m, em frente ao Shopping Paulista. Metrô Brigadeiro ou Vergueiro a 7 minutos.', 'Paulista Avenue 50 m away, in front of Shopping Paulista mall. Brigadeiro or Vergueiro metro 7 minutes away.')}</p></header><ul class="chegar">${d.chegar.map(c => `<li>${ic('pin')}<div><h3>${c[0]}</h3><p>${c[1]}</p></div></li>`).join('')}</ul></section></div>
` + rodape(v, d);
}

// ---------- versão A: Lavanda (clara, com o lilás #e7e4f2 e o roxo #513f95 do site atual) ----------
function A() {
  const v = 'a', pag = {};
  for (const lang of ['pt', 'en']) {
    L = lang; const d = D();
    const cab = (k, tt, foto, desc = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${tt}</h1>${desc ? `<p>${desc}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
    const item = (itens) => `<div class="itens-a">${itens.map(p => `<article class="item-a sobe" id="${p.id}"><figure>${img(p.f, p.t)}</figure><div><h3>${p.t}</h3><p>${p.d}</p><a class="link-seta" href="${link(v, 'contato')}#agendar">${t('Agendar avaliação', 'Book an assessment')} ${ic('seta')}</a></div></article>`).join('')}</div>`;
    const cta = () => `<section class="cta-a"><div class="in cta-in"><div><h2>${t('Agende já sua avaliação', 'Book your assessment now')}</h2><p>${t('Também atendemos por consulta online, para quem mora fora de São Paulo ou do Brasil.', 'We also offer online consultations for patients living outside São Paulo or Brazil.')}</p></div><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
    pag[chave('index')] = head(v, 'index', '', d.curto) + topo(v, 'index', d) + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">${t('Implante · Prótese · Estética', 'Implants · Prosthodontics · Aesthetics')}</p><h1>${t('Implante dentário com odontologia digital, perto da Paulista.', 'Dental implants with digital dentistry, near Paulista Avenue.')}</h1><p>${d.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}#agendar">${ic('calendario')}${t('Agendar avaliação', 'Book an assessment')}</a><a class="btn btn-linha" href="${link(v, 'implantes')}">${t('Como é o implante', 'How implants work')}</a></p>${google()}</div>
<div class="hero-a-fotos"><figure class="f1">${img('sala-espera', t('Sala de espera da ImplArt', 'ImplArt waiting room'), ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${img('consultorio', t('Consultório com vista para a cidade', 'Treatment room with city view'), ' loading="eager"')}</figure><figure class="f3">${img('ad-lentes-2', t('Lentes dentais: antes e depois', 'Dental veneers: before and after'), ' loading="eager"')}<figcaption>${t('Antes e depois', 'Before and after')}</figcaption></figure></div></div></section>
<section class="in destaques-a"><header class="tit"><p class="k">${t('Clínica tecnológica e completa', 'A complete, high-tech clinic')}</p><h2>${t('Tratamentos simples ou de alta complexidade', 'Simple or highly complex treatments')}</h2><p>${d.intro}</p></header><div class="cards-a">${d.destaques.map(x => `<a class="card-a sobe" href="${link(v, x.s)}#${x.a}"><figure>${img(x.f, x.t)}</figure><div><h3>${x.t}</h3><p>${x.d}</p><span class="link-seta">${t('Saiba mais', 'Learn more')} ${ic('seta')}</span></div></a>`).join('')}</div></section>
<section class="etapas-a"><div class="in"><header class="tit"><p class="k">${t('O que é um implante dentário', 'What is a dental implant')}</p><h2>${t('Do planejamento ao dente novo', 'From planning to your new tooth')}</h2><p>${d.oQue[0]}</p></header>${etapas(d)}<a class="link-seta" href="${link(v, 'implantes')}">${t('Tipos de implante', 'Implant types')} ${ic('seta')}</a></div></section>
<section class="in estrutura-a"><div class="estrutura-a-txt"><p class="k">Day Clinic</p><h2>${t('Estrutura completa com laboratório 3D, raio X digital e equipe de especialistas', 'Full structure with 3D lab, digital X-ray and a team of specialists')}</h2><ul class="icones">${d.estrutura.map(x => `<li>${ic(x.i)}<div><h3>${x.t}</h3><p>${x.d}</p></div></li>`).join('')}</ul></div><div class="estrutura-a-fotos">${img('radiologia', t('Centro radiológico', 'Radiology center'))}${img('recepcao', t('Recepção com o logo ImplArt', 'Reception'))}</div></section>
<section class="dr-a"><div class="in dr-a-in"><figure>${img('dr-markarian', d.dr.nome)}</figure><div><p class="k">${d.dr.cargo}</p><h2>${d.dr.nome}</h2><p>${d.dr.texto[0]}</p><ul class="numeros">${d.numeros.slice(0, 2).map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul>${lista(d.dr.formacao.slice(0, 4))}<a class="link-seta" href="${link(v, 'clinica')}">${t('Formação completa', 'Full curriculum')} ${ic('seta')}</a></div></div></section>
<section class="in antes-a"><header class="tit tit-linha"><div><p class="k">${t('Antes e depois', 'Before and after')}</p><h2>${t('Sorrisos tratados na ImplArt', 'Smiles treated at ImplArt')}</h2></div><a class="link-seta" href="${link(v, 'estetica')}">${t('Ver estética dental', 'See dental aesthetics')} ${ic('seta')}</a></header>${galeriaCasos(d, 6)}</section>
<section class="depo-a"><div class="in"><header class="tit tit-linha"><div><p class="k">${t('A confiança dos nossos pacientes do Brasil e do exterior', 'Trusted by patients from Brazil and abroad')}</p><h2>${t('Avaliação 4,8 no Google', 'Rated 4.8 on Google')}</h2></div>${google()}</header>${depoimentos(d)}</div></section>
<section class="in gcr-a"><div><p class="k">${t('Ranking GCR', 'GCR ranking')}</p><h2>${t('Reconhecida internacionalmente desde 2017', 'Internationally recognized since 2017')}</h2><p>${d.gcr}</p></div><div class="idioma-box"><h3>${t('English fluent dentist', 'Atendimento em inglês e espanhol')}</h3><p>${t('Atendemos pacientes do exterior em inglês e espanhol, com planejamento prévio por consulta online.', 'We treat patients from abroad in English and Spanish, with prior planning through an online consultation.')}</p><a class="link-seta" href="${linkOutro(v, 'index')}">${t('Site em inglês', 'Site em português')} ${ic('seta')}</a></div></section>
` + cta() + rodape(v, d);
    comum(v, pag, cab, item, d, cta);
  }
  return pag;
}

// ---------- versão B: Paulista (roxo profundo do logo, mais editorial) ----------
function B() {
  const v = 'b', pag = {};
  for (const lang of ['pt', 'en']) {
    L = lang; const d = D();
    const cab = (k, tt, foto, desc = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${tt}</h1>${desc ? `<p>${desc}</p>` : ''}</div></section>`;
    const item = (itens) => `<div class="procs">${itens.map((p, i) => `<details class="proc sobe" id="${p.id}"${i === 0 ? ' open' : ''}><summary><span class="num">${String(i + 1).padStart(2, '0')}</span><b>${p.t}</b>${ic('seta')}</summary><div class="proc-corpo"><figure>${img(p.f, p.t)}</figure><div><p>${p.d}</p><a class="link-seta" href="${link(v, 'contato')}#agendar">${t('Agendar avaliação', 'Book an assessment')} ${ic('seta')}</a></div></div></details>`).join('')}</div>`;
    const cta = () => `<section class="cta-b"><div class="in cta-in"><h2>${t('Agende já!', 'Schedule now!')} <a href="${telHref(E.fone)}">${E.fone}</a></h2><p class="bts"><a class="btn btn-claro" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha" href="${link(v, 'contato')}#agendar">${t('Consulta online', 'Online consultation')}</a></p></div></section>`;
    pag[chave('index')] = head(v, 'index', '', d.curto) + topo(v, 'index', d) + `
<section class="hero-b">${img('sala-espera', t('Sala de espera da ImplArt', 'ImplArt waiting room'), ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">${t('Clínica de implante dentário, prótese e estética', 'Dental implant, prosthodontics and aesthetics clinic')}</p><h1>${t('Implantes, próteses e lentes dentais com tecnologia 3D, a uma quadra da Paulista.', 'Implants, prostheses and veneers with 3D technology, one block from Paulista.')}</h1><p>${t('Prótese protocolo de zircônia, implantes Straumann, lentes de contato, tratamentos rápidos com Day Clinic e odontologia digital.', 'Full-arch zirconia prostheses, Straumann implants, veneers, fast Day Clinic treatments and digital dentistry.')}</p><p class="bts"><a class="btn btn-claro" href="${link(v, 'contato')}#agendar">${ic('calendario')}${t('Agendar avaliação', 'Book an assessment')}</a><a class="btn btn-linha" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></div></section>
<section class="numeros-b"><div class="in">${d.numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in servicos-b"><header class="tit"><p class="k">${t('Tratamentos', 'Treatments')}</p><h2>${t('Especialidades da clínica', 'Our specialties')}</h2></header><div class="linhas">${[['implantes', 'implante-coroa', t('Implante dentário', 'Dental implants'), d.oQue[0]], ['protese', 'protese-zirconia', t('Prótese dentária', 'Dental prosthesis'), d.proteses[0].d], ['estetica', 'ad-lentes-1', t('Estética e harmonização', 'Aesthetics and harmonization'), d.estetica.intro], ['enxerto-osseo', 'enx-biomateriais', t('Enxerto ósseo', 'Bone graft'), d.enxerto.intro[0]]].map((s, i) => `<a class="linha sobe" href="${link(v, s[0])}"><span class="num">0${i + 1}</span>${img(s[1], s[2])}<div><h3>${s[2]}</h3><p>${s[3]}</p></div>${ic('seta')}</a>`).join('')}</div></section>
<section class="etapas-b"><div class="in"><header class="tit"><p class="k">${t('Passo a passo', 'Step by step')}</p><h2>${t('Como é o implante na ImplArt', 'How implants work at ImplArt')}</h2></header>${etapas(d)}</div></section>
<section class="in dr-b"><div><p class="k">${t('Expertise acadêmica', 'Academic expertise')}</p><h2>${d.dr.nome}</h2><p class="lead">${d.dr.texto[0]}</p><p>${d.dr.texto[1]}</p>${lista(d.dr.formacao.slice(0, 6))}</div><figure>${img('dr-markarian-cad', d.dr.nome)}<figcaption>${d.dr.nome} · ${d.dr.cro}</figcaption></figure></section>
<section class="estrutura-b"><div class="in"><header class="tit"><p class="k">Day Clinic</p><h2>${t('Tratamento dentário rápido, com alta tecnologia e estrutura', 'Fast dental treatment with high technology and full structure')}</h2></header><div class="mosaico">${['consultorio', 'radiologia', 'recepcao', 'sala-dr'].map(f => img(f, d.espaco.find(e => e[0] === f)[1])).join('')}</div><ul class="icones">${d.estrutura.map(x => `<li>${ic(x.i)}<div><h3>${x.t}</h3><p>${x.d}</p></div></li>`).join('')}</ul></div></section>
<section class="in antes-b"><header class="tit tit-linha"><div><p class="k">${t('Antes e depois', 'Before and after')}</p><h2>${t('Resultados reais', 'Real results')}</h2></div>${google()}</header>${galeriaCasos(d, 6)}<div class="depo-b"><blockquote><p>“${d.depo[0].q}”</p></blockquote><p class="quem">${d.depo[0].n}</p></div></section>
<section class="in gcr-b"><p class="k">${t('Ranking internacional GCR', 'International GCR ranking')}</p><p class="frase">${d.gcr}</p><p><a class="link-seta" href="${linkOutro(v, 'index')}">${t('English fluent dentist: site em inglês', 'Versão em português')} ${ic('seta')}</a></p></section>
` + cta() + rodape(v, d);
    comum(v, pag, cab, item, d, cta);
  }
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
L = 'pt';
await escolha(pub, {
  nome: 'ImplArt Odontologia', artigo: 'da', url: E.url, lang: 'pt', cor: '#513f95', fundo: '#2b1f5c', claro: '#f3f1f9',
  fonteTitulo: 'Jost,system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Clara, no lilás e no roxo do site atual: fotos da clínica e um antes e depois na abertura, o passo a passo do implante e o Dr. Markarian em destaque.', pontos: ['Português e inglês, como o site atual', 'Antes e depois reais dos pacientes', 'Avaliação 4,8 no Google e depoimentos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Roxo profundo do logo, mais editorial: sala de espera em tela cheia, números da clínica e tratamentos numerados.', pontos: ['12.000 implantes e 25 anos à vista', 'Tratamentos em sanfona, fáceis no celular', 'Português e inglês'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
