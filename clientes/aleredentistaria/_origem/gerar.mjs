// Alere Dentistaria (Campo Grande/MS). Gera public/{a,b}/ e a página de escolha.
// node clientes/aleredentistaria/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs aleredentistaria https://aleredentistaria.com.br/)
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Alere Dentistaria', url: 'https://aleredentistaria.overtus.com.br/', antigo: 'https://aleredentistaria.com.br/',
  wa: '5567999427984', fone: '(67) 99942-7984', email: 'suzimmvendas@gmail.com',
  rua: 'Rua Alagoas, 396', predio: 'Edifício Atrium Corporate', bairro: 'Jardim dos Estados', cidade: 'Campo Grande - MS',
  insta: 'https://instagram.com/aleredentistaria', face: 'https://facebook.com/aleredentistaria', yt: 'https://youtube.com/@aleredentistaria',
  cnpj: '26.705.784/0001-47', rt: 'Responsável técnica: Dra. Suzi Magali Moura Vendas, CRO-MS 852',
};
const historia = ['Meu nome é Suzi Vendas, sou dentista há mais de 40 anos e escolhi dedicar minha vida a transformar sorrisos e, principalmente, histórias.',
  'Ao longo dessa jornada, mantive um compromisso inabalável com a ciência, com a evolução constante e, acima de tudo, com as pessoas.',
  'Sempre sonhei em construir uma clínica onde os pacientes encontrassem não apenas tratamentos de excelência, mas também acolhimento, empatia e segurança. Assim nasceu a Alere Dentistaria: uma clínica multidisciplinar, com especialistas qualificados, tecnologia de ponta e um propósito muito claro, cuidar de você e da sua família.',
  'Dentistas experientes em todas as especialidades, dividindo responsabilidades e potencializando resultados. Centenas de sorrisos transformados, tudo em um só lugar.'];
const primeira = ['Na Alere, entendemos que cada sorriso tem uma história e, muitas vezes, essa história traz medos, traumas ou experiências difíceis no dentista. Por isso, nosso atendimento é humanizado, acolhedor, gentil e sem julgamentos. Aqui você é ouvido, respeitado e cuidado no seu tempo e no seu ritmo.',
  'Explicamos cada passo antes de começar. Nenhum procedimento é feito sem a sua autorização e sem você se sentir confortável. Usamos técnicas modernas, tecnologia de ponta e protocolos que tornam os procedimentos mais rápidos, seguros e, principalmente, sem dor.'];
const recebe = ['Orçamento na hora, transparente e sem surpresas', 'Plano de tratamento claro e personalizado, explicado passo a passo, com etapas, prazos e valores', 'Facilidades de pagamento'];
const diferenciais = [['coracao', 'Atendimento humanizado e acolhedor'], ['estrela', 'Equipamentos de última geração'], ['casa', 'Ambiente confortável e aconchegante'], ['usuarios', 'Time de profissionais selecionados a dedo']];
const grupos = [
  { id: 'ortodontia-estetica', nome: 'Ortodontia e estética', itens: [['Ortodontia', 'Aparelhos metálicos, estéticos de porcelana, invisíveis e ortopédicos, para crianças e adultos.', 'ortodontia'], ['Lentes de contato dental', 'Lâminas finas que corrigem cor, forma e pequenos desalinhamentos.'], ['Clareamento', 'Dentes mais claros com acompanhamento profissional.']] },
  { id: 'canal-cirurgia', nome: 'Canal e cirurgia', itens: [['Tratamento de canal', 'Canal, retratamento e emergência com especialistas em endodontia.', 'tratamento-de-canal'], ['Cirurgia', 'Cirurgia e traumatologia bucomaxilofacial, incluindo extrações.'], ['Bruxismo', 'Diagnóstico e placas para proteger os dentes do apertamento.']] },
  { id: 'reabilitacao', nome: 'Reabilitação', itens: [['Implante', 'Reposição do dente perdido com implante e coroa.'], ['Protocolo', 'Prótese fixa sobre implantes para a arcada inteira.'], ['Prótese fixa', 'Coroas e pontes para devolver função e estética.'], ['Dentadura', 'Próteses removíveis confortáveis e bem adaptadas.']] },
  { id: 'familia', nome: 'Família e prevenção', itens: [['Clínico geral', 'Restaurações, diagnóstico e o cuidado do dia a dia.'], ['Limpeza', 'Profilaxia e orientação de higiene.'], ['Consulta odontológica', 'Avaliação completa com orçamento na hora.'], ['Atendimento a crianças', 'Odontopediatria com paciência e carinho, sem traumas.'], ['Programa de prevenção infantil', 'Acompanhamento para crescer sem cáries.'], ['Pré-natal odontológico', 'Cuidado da saúde bucal da gestante.']] },
];
const equipe = [
  ['dra-suzi', 'Dra. Suzi Magali Moura Vendas', 'Especialista em Ortodontia', 'CRO-MS 852 · fundadora, mais de 40 anos de odontologia'],
  ['dra-talita', 'Dra. Talita dos Anjos Vaez', 'Especialista em Endodontia', 'CRO-MS 7013'],
  ['dra-isabela', 'Dra. Isabela Resende Oliveira', 'Especialista em Endodontia', 'CRO-MS 08684'],
  ['dr-vitor', 'Dr. Vitor Bruno Teslenco', 'Especialista em Cirurgia e Traumatologia Bucomaxilofacial', ''],
  ['dra-renata', 'Dra. Renata Vaz', 'Especialista em Odontopediatria', ''],
  ['dra-sofia', 'Dra. Sofia Moura Gonçalves', 'Clínica geral', ''],
];
const depo = [
  ['Simony Coelho', 'Sempre tive muito medo de dentistas. Quando precisei ir por conta da mordida cruzada, minha mão ficou gelada e suando de medo. Mas quando conheci a Dra. Suzi, com toda sua paciência e carinho, fui ficando a cada consulta mais tranquila e confiante. Hoje tenho um sorrisão, e minha filha e meu esposo são clientes também.'],
  ['Larissa França', 'Precisei de atendimento emergencial de canal e fui prontamente atendida. Tenho uma gratidão enorme pelo atendimento humanizado e profissional. O tratamento seguiu com sucesso e sem dor! Consultório impecável na limpeza, com estrutura de primeira e muito bem localizado.'],
  ['Letícia Lemes', 'Atendimento nota mil! Levei minha filha, que costuma ter medo de dentista, mas ela amou e se sentiu super confortável. A Dra. é super atenciosa e querida.'],
  ['Marcelo', 'Sem sombra de dúvidas é o melhor consultório odontológico de Campo Grande. Restaurações duradouras e procedimentos realizados com perfeição. Atende nossa família há mais de 12 anos.'],
  ['Andrea Costa da Silva Ost', 'Sou paciente da Dra. Suzi há 35 anos e durante todos esses anos tenho recebido um tratamento de competência e profissionalismo, além da cordialidade e gentileza que são característicos dela.'],
  ['Josiane Santana', 'Ela é muito competente, paciente, quer conhecer realmente os hábitos do paciente antes de tratar e orientar. Super recomendo, para quem procura um profissional de qualidade.'],
  ['Karina Cintrão', 'Clínica muito bem organizada, ambiente limpo e agradável, dentro das normas de biossegurança. Profissional comprometida, atenciosa, competente e ética.'],
  ['Tereza Gonçalves', 'Não podia deixar de agradecer pelo excelente trabalho que me fez há 20 anos. Recentemente ele foi muito elogiado por outro profissional da área.'],
  ['Vivi', 'Melhor consultório odontológico de Campo Grande. Atendimento maravilhoso, repleto de carinho e cuidado com os pacientes, ambiente acolhedor e profissionais de excelência!'],
  ['Luciana Yoshie Hiratsuka', 'Minha família e eu somos pacientes da Dra. Suzi desde 2008. Profissional dedicada e competente. Ótimo atendimento.'],
  ['Raul Aguilera', 'Ótimas dependências do consultório, atendimento profissional do melhor nível, além de localização estratégica.'],
  ['Natalia Corrales', 'Ela é excelente profissional, extremamente delicada, estudiosa, atenciosa e não mede esforços para o melhor resultado em seus pacientes. Além de tudo, é extremamente humana.'],
];
const aparelhos = [
  ['Metálicos', 'Feitos de aço inoxidável. São duráveis, resistentes a manchas e costumam ser a opção mais econômica. Excelentes para diferentes tipos de má oclusão.'],
  ['Estéticos de porcelana', 'Bráquetes da cor dos dentes, menos perceptíveis que os metálicos. Opção discreta e muito eficaz.'],
  ['Invisíveis', 'Alinhadores de plástico transparente, quase invisíveis e removíveis para comer e escovar. Não são indicados para todos os casos.'],
  ['Ortopédicos', 'Aparelhos removíveis indicados para crianças e adolescentes em fase de crescimento, e também para alguns adultos.'],
];
const passosOrto = [['Consulta com especialista', 'Uma conversa para alinhar suas expectativas com as possibilidades de tratamento.'], ['Exames', 'Você faz a documentação ortodôntica em um centro de radiologia.'], ['Planejamento', 'Analisamos os exames e sugerimos o melhor plano de tratamento para você.'], ['Tratamento', 'Começa a jornada rumo ao sorrisão que você sempre quis.']];
const riscosOrto = [['Halitose', 'Dentes desalinhados escondem cantinhos que a escova não alcança e acumulam placa.'], ['Cáries escondidas', 'Dentes encavalados criam refúgios para as cáries, até em quem cuida bem da higiene.'], ['Dores e bruxismo', 'Dentes mal posicionados contribuem para dores de cabeça, dores na face, bruxismo e desgaste.'], ['Mastigação comprometida', 'A mordida que não encaixa dificulta a mastigação e a digestão.'], ['Perda de dentes', 'A sobrecarga com os anos pode levar à perda do dente por falta de sustentação óssea.'], ['Autoestima', 'Um sorriso que incomoda afeta a confiança na vida pessoal e profissional.']];
const tecCanal = [['Sensor digital', 'Captura e digitaliza imagens de excelente qualidade.'], ['Ultrassom', 'Otimiza a limpeza dos canais radiculares e facilita a remoção de pinos.'], ['Localizador apical', 'Determina com precisão o comprimento do canal radicular.'], ['Motor endodôntico', 'Aciona as limas para remover o tecido pulpar infectado.']];
const riscosCanal = [['Dor intensa', 'Sem remover a polpa infectada ou inflamada, a dor só aumenta e persiste.'], ['Perda do dente', 'A infecção pode danificar o tecido de suporte e tornar a extração a única opção.'], ['Infecção disseminada', 'Bactérias de um dente infectado podem alcançar a corrente sanguínea.'], ['Endocardite', 'A inflamação do revestimento do coração pode ser causada por bactérias da boca.']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'clinica', nome: 'Sobre nós' }, { slug: 'tratamentos', nome: 'Serviços' }, { slug: 'equipe', nome: 'Equipe' }, { slug: 'depoimentos', nome: 'Depoimentos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Ameixa', b: 'Sorriso Sereno' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Nunito+Sans:wght@400;600;700&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Alere Dentistaria e gostaria de agendar uma consulta.') => waHref(E.wa, m);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Dentistas especialistas em Campo Grande MS` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#590a43' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const ext = 'target="_blank" rel="noopener"';
const marca = (v, claro = false) => `<a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/simbolo${claro ? '-claro' : ''}.webp" alt="" width="493" height="466"><span><b>Alere</b><small>Dentistaria</small></span></a>`;
const redes = `<p class="redes"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a></p>`;
const lista = ls => `<ul class="lista-check">${ls.map(t => `<li>${ic('check')}<span>${t}</span></li>`).join('')}</ul>`;
const ini = n => n.split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase();
const depoCard = d => `<figure class="depo sobe"><blockquote>${esc(d[1])}</blockquote><figcaption><span class="ini" aria-hidden="true">${ini(d[0])}</span><span><b>${esc(d[0])}</b><small>Avaliação no Google</small></span></figcaption></figure>`;
const todosServ = grupos.flatMap(g => g.itens.map(i => i[0]));
const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>WhatsApp<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Tratamento de interesse<select name="tratamento"><option value="">Quero uma avaliação</option>${todosServ.map(s => `<option>${s}</option>`).join('')}<option>Urgência / dor de dente</option></select></label>
  <label>Melhor período<select name="periodo"><option>Manhã</option><option>Tarde</option><option>Qualquer horário</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Agendar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.predio}</span><span>${E.bairro}, ${E.cidade}</span></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('calendario')}<div><strong>Atendimento</strong><span>Com hora marcada e horários flexíveis</span><span>Atendimento particular, com facilidades de pagamento</span></div></li>
  <li>${ic('insta')}<div><strong>Redes</strong><span><a href="${E.insta}" ${ext}>Instagram</a> · <a href="${E.face}" ${ext}>Facebook</a> · <a href="${E.yt}" ${ext}>YouTube</a></span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Alere Dentistaria" loading="lazy" src="https://maps.google.com/maps?q=Rua%20Alagoas%2C%20396%2C%20Campo%20Grande%20MS&z=16&output=embed"></iframe>`;
const galeria = Array.from({ length: 17 }, (_, i) => `galeria/foto-${String(i + 1).padStart(2, '0')}`);

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="topo-barra"><div class="in"><span>${ic('pin')}${E.rua} · ${E.predio} · ${E.cidade}</span><a href="${wa()}" ${ext}>${icWa()}${E.fone}</a></div></div>
  <div class="in topo-linha">${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>Agende sua consulta</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), slug)}</ul></nav>
    <a class="btn-topo" href="${wa()}" ${ext}>${icWa()}<span>Agendar</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${marca(v, true)}<p>Clínica odontológica multidisciplinar em Campo Grande MS. Dentistas especialistas em transformar sorrisos, para você e para a sua família.</p>${redes}</div>
    <div><h3>Tratamentos</h3><ul><li><a href="${link(v, 'ortodontia')}">Ortodontia</a></li><li><a href="${link(v, 'tratamento-de-canal')}">Tratamento de canal</a></li>${grupos.map(g => `<li><a href="${link(v, 'tratamentos')}#${g.id}">${g.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.predio}<br>${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>Alere Dentistaria Ltda · CNPJ ${E.cnpj} · ${E.rt}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Agendar pelo WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.clinica = head(v, 'clinica', 'Sobre nós', historia[0]) + topo(v, 'clinica') + cab('Sobre nós', 'Uma vida dedicada a cuidar de sorrisos', 'dra-suzi-consultorio') + `
<div class="in"><section class="texto-pag"><div><h2>Conheça nossa história</h2>${historia.map(p => `<p>${p}</p>`).join('')}<p class="assina">Dra. Suzi Vendas<small>Fundadora · CRO-MS 852</small></p></div><figure>${img('dra-suzi-consultorio', 'Dra. Suzi Vendas no consultório da Alere Dentistaria')}</figure></section>
<section class="difs">${diferenciais.map(d => `<div class="sobe">${ic(d[0])}<span>${d[1]}</span></div>`).join('')}</section>
<section class="texto-pag inverso"><figure>${img('consultorio-vista', 'Consultório com vista para Campo Grande')}</figure><div><h2>Sua primeira consulta</h2>${primeira.map(p => `<p>${p}</p>`).join('')}<h3>Após a avaliação, você recebe:</h3>${lista(recebe)}<a class="btn" href="${wa('Olá! Quero agendar minha primeira avaliação na Alere Dentistaria.')}" ${ext}>${icWa()}Agendar minha avaliação</a></div></section>
<section class="casa" id="galeria"><h2>Conheça nossa casa</h2><p>No Edifício Atrium Corporate, com vista privilegiada de Campo Grande, estacionamento e fácil acesso.</p><div class="casa-fotos">${[['edificio-atrium', 'Edifício Atrium Corporate'], ['recepcao', 'Recepção da Alere Dentistaria'], ['sala-espera', 'Sala de espera'], ['consultorio-vista', 'Consultório']].map(f => `<a href="/assets/img/${f[0]}.webp" data-foto>${img(f[0], f[1])}</a>`).join('')}</div>
<div class="galeria">${galeria.map((g, i) => `<a href="/assets/img/${g}.webp" data-foto>${img(g, `Pacientes e equipe da Alere Dentistaria, foto ${i + 1}`)}</a>`).join('')}</div></section></div>
` + rodape(v);
  pag.tratamentos = head(v, 'tratamentos', 'Serviços', `Tratamentos na Alere Dentistaria em Campo Grande: ${todosServ.join(', ')}.`) + topo(v, 'tratamentos') + cab('Serviços', 'Cuidamos do seu sorriso de forma completa', 'consultorio-vista') + `
<div class="in">${grupos.map(g => `<section class="grupo" id="${g.id}"><h2>${g.nome}</h2><ul>${g.itens.map(i => `<li class="sobe">${i[2] ? `<a href="${link(v, i[2])}">` : '<div>'}<h3>${i[0]}</h3><p>${i[1]}</p>${i[2] ? `<span class="link-seta">Saiba mais ${ic('seta')}</span></a>` : '</div>'}</li>`).join('')}</ul></section>`).join('')}
<section class="faixa-cta"><h2>Seu sorriso e de sua família será mais feliz aqui!</h2><a class="btn" href="${wa()}" ${ext}>${icWa()}Agende sua consulta agora</a></section></div>
` + rodape(v);
  pag.ortodontia = head(v, 'ortodontia', 'Ortodontia e aparelho ortodôntico', 'Ortodontia em Campo Grande MS com especialista há mais de 40 anos: aparelhos metálicos, estéticos, invisíveis e ortopédicos.') + topo(v, 'tratamentos') + cab('Ortodontia', 'Um sorriso mais bonito e confiante em alguns meses', 'dra-suzi') + `
<div class="in"><section class="texto-pag"><div><p class="lead">Com aparelhos ortodônticos de alta performance e fios com memória e termoativados, tecnologia que acelera os resultados, você vê a transformação do seu sorriso acontecer em poucos meses.</p>${lista(['Tratamento personalizado, que leva em conta todas as particularidades do seu sorriso', 'Planejamento que valoriza o sorriso e a harmonia com o rosto', 'A experiência de uma especialista com mais de 40 anos', 'Acompanhamento durante todo o tratamento e depois da remoção do aparelho', 'Valor total fechado, sem surpresas, e pagamento facilitado', 'Horários de atendimento flexíveis'])}<a class="btn" href="${wa('Olá! Quero agendar uma avaliação de ortodontia com a Dra. Suzi.')}" ${ext}>${icWa()}Agendar avaliação de ortodontia</a></div><figure>${img('galeria/foto-11', 'Paciente da ortodontia com a equipe')}</figure></section>
<section class="blocos"><h2>Tipos de aparelho</h2><p class="sub">A escolha depende das suas preferências, das necessidades do tratamento e do seu orçamento. Na consulta inicial a gente ajuda a decidir.</p><ul class="cards-4">${aparelhos.map(a => `<li class="sobe"><h3>${a[0]}</h3><p>${a[1]}</p></li>`).join('')}</ul></section>
<section class="blocos"><h2>O passo a passo para o sorrisão</h2><ol class="passos">${passosOrto.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section>
<section class="blocos"><h2>O que dentes tortos podem esconder</h2><ul class="cards-3">${riscosOrto.map(r => `<li class="sobe"><h3>${r[0]}</h3><p>${r[1]}</p></li>`).join('')}</ul></section></div>
` + rodape(v);
  pag['tratamento-de-canal'] = head(v, 'tratamento-de-canal', 'Tratamento de canal em Campo Grande', 'Tratamento de canal sem dor com endodontistas especialistas em Campo Grande MS. Retratamento e emergência.') + topo(v, 'tratamentos') + cab('Endodontia', 'Tratamento de canal sem dor, com especialista', 'dra-talita') + `
<div class="in"><section class="texto-pag"><div><p class="lead">Dor de dente? Ninguém merece. A Alere firma um compromisso de resolver o seu problema com preço justo, pagamento facilitado, conforto e segurança, em aproximadamente uma hora de tratamento.</p><p>Tratamento de canal (endodontia) remove o tecido pulpar infectado ou danificado, limpa e veda os canais radiculares para preservar o dente.</p>${lista(['Alívio da dor já na mesma sessão, com anestesia eficaz', 'Preserva o seu dente natural e evita extrações e próteses', 'Selamento tridimensional que impede a volta das bactérias', 'Retratamento de canal e atendimento de emergência', 'Restauração ou prótese depois do canal, com orientação no pós-tratamento'])}<a class="btn" href="${wa('Olá! Estou com dor de dente e preciso de um tratamento de canal.')}" ${ext}>${icWa()}Estou com dor, quero agendar</a></div><figure>${img('consultorio-vista', 'Consultório da Alere Dentistaria')}</figure></section>
<section class="blocos"><h2>Especialistas em canal</h2><ul class="equipe-mini">${equipe.filter(e => /Endodontia|fundadora/.test(e[2] + e[3])).map(e => `<li class="sobe">${img(e[0], e[1])}<h3>${e[1]}</h3><p>${e[0] === 'dra-suzi' ? 'Emergências endodônticas · CRO-MS 852' : `${e[2]} · ${e[3]}`}</p></li>`).join('')}</ul></section>
<section class="blocos"><h2>Tecnologia de ponta</h2><ul class="cards-4">${tecCanal.map(t => `<li class="sobe"><h3>${t[0]}</h3><p>${t[1]}</p></li>`).join('')}</ul></section>
<section class="blocos"><h2>Por que não adiar o canal</h2><ul class="cards-4 alerta">${riscosCanal.map(r => `<li class="sobe"><h3>${r[0]}</h3><p>${r[1]}</p></li>`).join('')}</ul></section></div>
` + rodape(v);
  pag.equipe = head(v, 'equipe', 'Nossa equipe', 'Dentistas especialistas em ortodontia, endodontia, cirurgia bucomaxilofacial, odontopediatria e clínica geral.') + topo(v, 'equipe') + cab('Nossa equipe', 'Dentistas especialistas apaixonados por transformar sorrisos', 'dra-suzi') + `
<div class="in"><ul class="equipe">${equipe.map(e => `<li class="sobe">${img(e[0], e[1])}<div><h2>${e[1]}</h2><p class="esp">${e[2]}</p>${e[3] ? `<p class="cro">${e[3]}</p>` : ''}</div></li>`).join('')}</ul>
<section class="faixa-cta"><h2>Escolha o especialista certo para o seu caso</h2><a class="btn" href="${wa()}" ${ext}>${icWa()}Agende sua consulta</a></section></div>
` + rodape(v);
  pag.depoimentos = head(v, 'depoimentos', 'O que falam sobre nós', 'Avaliações de pacientes da Alere Dentistaria no Google: 5,0 com mais de 200 avaliações.') + topo(v, 'depoimentos') + cab('Depoimentos', 'O que falam sobre nós', 'familia-recepcao') + `
<div class="in"><p class="nota-google"><b>5,0</b><span>${'★'.repeat(5)}</span>mais de 200 avaliações no Google</p><div class="depos">${depo.map(depoCard).join('')}</div></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato e agendamento', `Alere Dentistaria: ${E.rua}, ${E.predio}, ${E.cidade}. WhatsApp ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Agende sua consulta', 'edificio-atrium') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Fale com a nossa equipe</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="tit-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', historia[3]) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div><p class="k">Clínica odontológica · Campo Grande MS</p><h1>Aqui tem dentistas especialistas em transformar sorrisos para você e para sua família!</h1><p class="nota">${'★'.repeat(5)} <b>5,0</b> · mais de 200 avaliações no Google</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agende sua consulta</a><a class="btn btn-linha" href="${link(v, 'tratamentos')}">Nossos serviços</a></p></div><figure>${img('familia-recepcao', 'Família na recepção da Alere Dentistaria', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="in sobre-a"><figure>${img('dra-suzi-consultorio', 'Dra. Suzi Vendas')}</figure><div><p class="k">Sobre nós</p><h2>São mais de 40 anos de dedicação exclusiva à odontologia!</h2><p>Comprometimento, atualização constante, respeito à ciência e ao próximo são compromissos que me trouxeram até aqui. Sempre sonhei com uma clínica de dentistas multidisciplinar, e aqui estamos!</p><p>${historia[3]}</p><ul class="difs-a">${diferenciais.map(d => `<li>${ic(d[0])}<span>${d[1]}</span></li>`).join('')}</ul><a class="btn" href="${link(v, 'clinica')}">Conheça nossa história</a></div></section>
<section class="serv-a"><div class="in"><header class="tit-sec"><p class="k">Serviços</p><h2>O que fazemos</h2></header><ul class="serv-grade">${todosServ.map(s => `<li class="sobe">${ic('dente')}<span>${s}</span></li>`).join('')}</ul><div class="destaques-a"><a href="${link(v, 'ortodontia')}">${img('galeria/foto-11', 'Ortodontia')}<span><b>Ortodontia</b>Aparelhos de alta performance com especialista há mais de 40 anos</span></a><a href="${link(v, 'tratamento-de-canal')}">${img('consultorio-vista', 'Tratamento de canal')}<span><b>Tratamento de canal</b>Sem dor, com especialistas em endodontia</span></a></div></div></section>
<section class="in equipe-a"><header class="tit-sec"><p class="k">Nossa equipe</p><h2>Dentistas especialistas apaixonados por transformar sorrisos!</h2></header><ul class="equipe-mini">${equipe.map(e => `<li class="sobe">${img(e[0], e[1])}<h3>${e[1]}</h3><p>${e[2]}</p></li>`).join('')}</ul></section>
<section class="depo-a"><div class="in"><header class="tit-sec"><p class="k">Depoimentos</p><h2>O que falam sobre nós!</h2></header><div class="depos">${depo.slice(0, 3).map(depoCard).join('')}</div><p class="centro"><a class="btn btn-linha" href="${link(v, 'depoimentos')}">Ver mais depoimentos</a></p></div></section>
<section class="in casa-a"><header class="tit-sec"><p class="k">Galeria de fotos</p><h2>Conheça nossa casa!</h2></header><div class="galeria">${galeria.slice(0, 8).map((g, i) => `<a href="/assets/img/${g}.webp" data-foto>${img(g, `Pacientes e equipe, foto ${i + 1}`)}</a>`).join('')}</div><p class="centro"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agende sua consulta agora</a></p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', historia[3]) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Dentistas especialistas · Campo Grande MS</p><h1>Um sorriso cuidado <em>sem pressa</em>, sem medo e sem surpresas.</h1><p>Ortodontia, canal, implantes e estética em um só lugar, com uma equipe liderada pela Dra. Suzi Vendas, há mais de 40 anos na odontologia.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar avaliação</a><a class="link-seta" href="${link(v, 'tratamentos')}">Ver tratamentos ${ic('seta')}</a></p><p class="nota"><b>5,0</b> ${'★'.repeat(5)} <span>mais de 200 avaliações no Google</span></p></div><figure class="hero-b-foto">${img('dra-suzi', 'Dra. Suzi Vendas, fundadora da Alere Dentistaria', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="in medo-b"><div><p class="k">Primeira consulta</p><h2>Feito para quem tem medo de dentista</h2></div><div>${primeira.map(p => `<p>${p}</p>`).join('')}${lista(recebe)}</div></section>
<section class="trat-b"><div class="in"><header class="tit-b"><p class="k">Tratamentos</p><h2>Tudo em um só lugar</h2></header><div class="trat-b-grade"><a class="trat-dest" href="${link(v, 'ortodontia')}">${img('galeria/foto-11', 'Ortodontia')}<span><small>Especialidade da casa</small><b>Ortodontia</b>Metálico, porcelana, invisível e ortopédico</span></a><a class="trat-dest" href="${link(v, 'tratamento-de-canal')}">${img('dra-talita', 'Tratamento de canal')}<span><small>Endodontia</small><b>Canal sem dor</b>Em cerca de uma hora, com especialista</span></a><div class="trat-lista">${grupos.map(g => `<div><h3>${g.nome}</h3><p>${g.itens.map(i => i[0]).join(' · ')}</p></div>`).join('')}<a class="link-seta" href="${link(v, 'tratamentos')}">Todos os tratamentos ${ic('seta')}</a></div></div></div></section>
<section class="in equipe-b"><header class="tit-b"><p class="k">Equipe</p><h2>Seis especialistas, um mesmo cuidado</h2></header><ul class="equipe-mini">${equipe.map(e => `<li class="sobe">${img(e[0], e[1])}<h3>${e[1]}</h3><p>${e[2]}</p></li>`).join('')}</ul></section>
<section class="depo-b"><div class="in"><header class="tit-b"><p class="k">Pacientes</p><h2>"Sempre tive muito medo de dentistas…"</h2></header><div class="depos">${depo.slice(0, 3).map(depoCard).join('')}</div><a class="link-seta" href="${link(v, 'depoimentos')}">Mais depoimentos ${ic('seta')}</a></div></section>
<section class="in local-b"><figure>${img('edificio-atrium', 'Edifício Atrium Corporate')}</figure><div><p class="k">Onde estamos</p><h2>Edifício Atrium Corporate, com vista para Campo Grande</h2><p>${E.rua}, ${E.bairro}. Localização privilegiada, fácil acesso e estacionamento.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}${E.fone}</a><a class="link-seta" href="${link(v, 'contato')}">Como chegar ${ic('seta')}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#a44687', fundo: '#2e0724', claro: '#f8f3f6',
  fonteTitulo: "Fraunces,Georgia,serif", fonteTexto: "'Nunito Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Fiel ao site atual: o roxo ameixa do logo, a fonte Poppins, a família na recepção na abertura e as seções que a clínica já tem (sobre nós, serviços, equipe, depoimentos e galeria), agora organizadas e funcionando no celular.', pontos: ['Páginas de ortodontia e de tratamento de canal', 'Seis especialistas com especialidade e CRO', '12 depoimentos do Google'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Mais delicada: fundo rosado claro, títulos com serifa, a Dra. Suzi na abertura e uma seção para quem tem medo de dentista.', pontos: ['"Sem pressa, sem medo e sem surpresas"', 'Ortodontia e canal em destaque', 'Orçamento na hora e plano explicado'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
