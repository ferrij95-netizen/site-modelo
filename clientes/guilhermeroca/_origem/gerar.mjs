// Dr. Guilherme Roça, cirurgião plástico (Curitiba/PR), referência em cirurgia pós-emagrecimento. Gera public/{a,b}/ e a página de escolha.
// node clientes/guilhermeroca/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs guilhermeroca https://www.guilhermeroca.com.br/)
// Textos: páginas do site atual (WordPress, via /wp-json): médico, equipe, procedimentos, pós-emagrecimento, pacientes de fora, FAQ, contato.
// Fotos: biblioteca de mídia do site (retratos do Dr., banners recortados sem o texto, equipe, antes e depois, imagens dos procedimentos).
// Logo: o PNG atual (espiral + "Guilherme Roça") redesenhado em vetor com o azul #002C53.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Dr. Guilherme Roça', url: 'https://guilhermeroca.overtus.com.br/', antigo: 'https://www.guilhermeroca.com.br/',
  fone: '(41) 3076-4526', wa: '5541984779664', waVer: '(41) 98477-9664', email: 'contato@guilhermeroca.com.br',
  insta: 'https://www.instagram.com/dr.guilherme.roca/', face: 'https://www.facebook.com/drguilhermeroca',
  lattes: 'http://lattes.cnpq.br/9024364906769380', crm: 'CRM-PR 23.172 · RQE 754 · Cirurgia Plástica RQE 2677',
};
const locais = [
  { id: 'clinica-bellage', n: 'Clínica Bellage', f: 'clinica-bellage', rua: 'R. Alferes Ângelo Sampaio, 2462', bairro: 'Bigorrilho, Curitiba/PR', fone: '(41) 3076-4526', d: 'Consultas', q: 'Rua Alferes Ângelo Sampaio, 2462, Curitiba' },
  { id: 'hospital-cruz-vermelha', n: 'Hospital da Cruz Vermelha', f: 'hospital-cruz-vermelha', rua: 'Av. Vicente Machado, 1280', bairro: 'Centro, Curitiba/PR', fone: '(41) 3016-6622', d: 'Cirurgias', q: 'Hospital da Cruz Vermelha, Avenida Vicente Machado, 1280, Curitiba' },
];
export const nomesVersao = { a: 'Espiral', b: 'Noturno' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600&family=Barlow:wght@400;500;600&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#f6f8fa', b: '#002C53' };
const waMsg = (m = 'Olá! Vim pelo site e gostaria de agendar uma consulta com o Dr. Guilherme Roça.') => waHref(E.wa, m);

const nav = [{ slug: 'sobre', nome: 'Sobre' }, { slug: 'pos-emagrecimento', nome: 'Pós-emagrecimento' }, { slug: 'procedimentos', nome: 'Procedimentos' }, { slug: 'pacientes-de-fora', nome: 'Pacientes de fora' }, { slug: 'contato', nome: 'Contato' }];
const curto = 'Cirurgião plástico em Curitiba, referência no Brasil em cirurgia plástica pós-emagrecimento. Membro titular da SBCP, mestre e doutor pela UFPR.';
const formacao = [
  ['UFPR', 'Médico graduado pela Universidade Federal do Paraná.'],
  ['Joinville', 'Residência em Cirurgia Geral no Hospital São José, em Joinville/SC.'],
  ['HC-UFPR', 'Residência em Cirurgia Plástica e Reparadora no Hospital de Clínicas da UFPR.'],
  ['SBCP', 'Membro Titular da Sociedade Brasileira de Cirurgia Plástica.'],
  ['Mestre', 'Mestre em Clínica Cirúrgica pela UFPR.'],
  ['Doutor', 'Doutor em Clínica Cirúrgica pela UFPR.'],
  ['São Lucas', 'Chefe do Serviço de Cirurgia Plástica Pós-Bariátrica do Hospital São Lucas, em Campo Largo.'],
];
const numeros = [['UFPR', 'graduação, mestrado e doutorado'], ['SBCP', 'membro titular'], ['Pós-bariátrica', 'chefe do serviço no Hospital São Lucas'], ['Brasil todo', 'estrutura para pacientes de fora']];
const depos = [
  'Médico e equipe incríveis! Não canso de falar como o Dr. Guilherme é um profissional maravilhoso, mas o mais importante é humano, se preocupa e cuida tão bem da gente, pensa em todos os mínimos detalhes. A melhor escolha que eu poderia ter feito.',
  'Dr. Guilherme e sua equipe foram muito atenciosos. Ele respeita o limite do nosso corpo e deixa claro as melhores escolhas. Ainda sou recente da cirurgia, mas já estou muito feliz com o resultado.',
  'Dr. Guilherme é um cirurgião comprometido, cuidadoso e principalmente ama o que faz. Super recomendo, estou muito feliz com o meu resultado, já fiz há 5 anos.',
  'Médico top, detalhista, perfeccionista e principalmente humano. Atendimento pós super atencioso: independente do horário ou da dúvida, ele te responde. E as meninas da clínica, super atenciosas. Confiança resume tudo.',
];
const equipe = [
  { f: 'megui', n: 'Megui Petroli de Souza', c: 'Instrumentadora cirúrgica' },
  { f: 'monalisa', n: 'Monalisa Alves', c: 'Instrumentadora cirúrgica' },
  { f: 'ana-carmen', n: 'Ana Carmen', c: 'Concierge' },
  { f: 'rute', n: 'Rute Bonfim', c: 'Fisioterapeuta' },
  { f: 'bruna', n: 'Bruna Rodrigues', c: 'Nutricionista' },
];
const parceiros = [['Dr. João Henrique Felício de Lima', 'CRM 17773/PR · gastrobeso.com.br'], ['Dr. Glauco Afonso Morgenstern', 'CRM 17071/PR · gastrocirurgia.com'], ['Dra. Simone Marchesini', 'Psicóloga']];

const grupos = [
  { id: 'pos-emagrecimento', t: 'Pós-emagrecimento', f: 'pos-costas', d: 'Contorno corporal depois de grandes perdas de peso, inclusive pós-bariátrica.' },
  { id: 'corpo', t: 'Corpo', f: 'p-aumento-gluteo', d: 'Mamas, lipoaspiração, glúteos, panturrilha, ginecomastia e cicatrizes.' },
  { id: 'face', t: 'Face', f: 'p-ritidoplastia', d: 'Pálpebras, rosto, testa, nariz e orelhas.' },
  { id: 'intimidade', t: 'Intimidade', f: 'p-ninfoplastia', d: 'Ninfoplastia e redução do monte pubiano.' },
  { id: 'esteticos', t: 'Procedimentos estéticos', f: 'p-preenchimentos', d: 'Lipoenxertia e preenchimentos faciais.' },
];
const procs = [
  { g: 'pos-emagrecimento', id: 'abdominoplastia', t: 'Abdominoplastia', f: 'pos-costas', p: ['Remove o excesso de gordura e pele da parte inferior do abdome. Diferente da lipoaspiração, é indicada quando o excesso de pele predomina, muito procurada por quem teve várias gestações ou perdeu muito peso.', 'Internação de cerca de 24 horas e recuperação de 14 a 21 dias, variando de pessoa para pessoa.'] },
  { g: 'pos-emagrecimento', id: 'cirurgia-circunferencial', t: 'Cirurgia circunferencial', f: 'p-circunferencial', p: ['Incisão em forma de cinto ao redor da cintura, a “belt lipectomy”, para quem tem excesso de pele no abdome e nas costas. Além do contorno, suspende e melhora a região glútea.', 'Cirurgia de grande porte, segura quando feita dentro de protocolos bem estabelecidos. Internação de 24 horas e recuperação de 21 a 30 dias.'] },
  { g: 'pos-emagrecimento', id: 'mamoplastia-redutora-e-mastopexia', t: 'Mamoplastia redutora e mastopexia', f: 'p-mamoplastia', p: ['A redutora diminui os seios e os deixa mais simétricos e proporcionais ao corpo, podendo tratar flacidez e reduzir aréolas. A mastopexia levanta as mamas sem mudar o volume.', 'As duas podem ser associadas a próteses de silicone. Internação de 12 a 24 horas e recuperação de 14 a 21 dias.'] },
  { g: 'pos-emagrecimento', id: 'braquioplastia', t: 'Braquioplastia (braços)', f: 'p-braquioplastia', p: ['Retira o excesso de pele e gordura da parte de trás do braço, comum depois de grandes emagrecimentos, do efeito sanfona ou com a idade, deixando um contorno mais natural.', 'Internação de 24 horas e recuperação de 14 a 21 dias.'] },
  { g: 'pos-emagrecimento', id: 'coxoplastia', t: 'Coxoplastia (coxas)', f: 'p-coxoplastia', p: ['Lipoaspiração da parte interna das coxas e, quando necessário, retirada do excesso de pele. Feita principalmente em pacientes bariátricos que perderam muito peso.', 'Internação de 24 horas e recuperação de 14 a 21 dias.'] },
  { g: 'corpo', id: 'protese-de-mama', t: 'Prótese de mama', p: ['Uma das cirurgias estéticas mais realizadas no Brasil. Cada paciente tem peso, altura, biótipo, histórico de filhos e expectativas diferentes, por isso cada caso é avaliado de forma individual.', 'Usamos próteses de silicone de alta coesividade de marcas consagradas, nacionais e americanas, em diferentes perfis e formatos, com um plano cirúrgico para cada paciente.'] },
  { g: 'corpo', id: 'lipoaspiracao', t: 'Lipoaspiração', p: ['Retirada de gordura localizada com cânulas. Não é para emagrecer, e sim para modelar a silhueta: o ideal é estar próximo do peso ideal.', 'Internação de 12 a 24 horas e recuperação de 7 a 14 dias.'] },
  { g: 'corpo', id: 'vibrolipoaspiracao', t: 'Vibrolipoaspiração', f: 'p-vibrolipo', p: ['A vibrolipo (Power Assisted Lipoplasty) usa um aparelho vibratório que liquefaz a gordura enquanto ela é aspirada: o procedimento fica mais rápido e suave, com menos hematomas, inchaço e dor.', 'Internação de 12 a 24 horas e recuperação de 7 a 10 dias.'] },
  { g: 'corpo', id: 'aumento-gluteo', t: 'Aumento glúteo', f: 'p-aumento-gluteo', p: ['A gordura da lipoaspiração do abdome é tratada e enxertada nas nádegas para aumentar o volume e melhorar o contorno, sem prótese, com a gordura da própria pessoa.', 'Parte da gordura pode ser absorvida com o tempo. Internação de 12 a 24 horas e recuperação de 7 a 14 dias.'] },
  { g: 'corpo', id: 'protese-de-panturrilha', t: 'Prótese de panturrilha', f: 'p-panturrilha', p: ['Para quem tem pouca projeção na “batata da perna”: o aumento de volume deixa o contorno das pernas mais harmônico em relação às coxas.', 'Internação de 12 a 24 horas e recuperação de 10 a 21 dias.'] },
  { g: 'corpo', id: 'ginecomastia', t: 'Ginecomastia', f: 'p-ginecomastia', p: ['Crescimento das mamas masculinas, em geral por desajustes hormonais ou excesso de peso. A cirurgia remove glândula e gordura por lipoaspiração e, se preciso, por uma cicatriz quase imperceptível ao redor da aréola.', 'Internação de 12 horas e recuperação de 14 a 21 dias.'] },
  { g: 'corpo', id: 'cicatrizes', t: 'Cicatrizes', f: 'p-cicatrizes', p: ['O cirurgião plástico é o médico mais habilitado para corrigir cicatrizes inestéticas em qualquer região do corpo: de acidentes, de cirurgias como a cesariana, ou de queimaduras.'] },
  { g: 'corpo', id: 'tumores-de-pele', t: 'Tumores de pele', f: 'p-tumores-pele', p: ['Em conjunto com a dermatologia, remoção de tumores de pele como carcinoma basocelular, espinocelular e melanoma. Tumores vasculares também podem ser tratados, com ou sem laser.'] },
  { g: 'face', id: 'blefaroplastia', t: 'Blefaroplastia (pálpebras)', f: 'p-blefaroplastia', p: ['Excesso de pele, bolsas de gordura e rugas deixam o olhar cansado. A cirurgia pode ser feita na pálpebra superior e na inferior, com cicatrizes quase imperceptíveis.', 'Internação de 12 horas e recuperação de 7 dias.'] },
  { g: 'face', id: 'ritidoplastia', t: 'Ritidoplastia (face)', f: 'p-ritidoplastia', p: ['Corrige a flacidez da pele e dos músculos da face e do pescoço, para um rosto rejuvenescido com resultado duradouro. Responde melhor quando combinada a tratamentos não invasivos, como peeling e laser.', 'Internação de 24 horas e recuperação de 14 a 21 dias.'] },
  { g: 'face', id: 'lifting-frontal', t: 'Levantamento do supercílio e lifting frontal', f: 'p-lifting-frontal', p: ['Neutraliza as rugas da testa e reposiciona as sobrancelhas, por técnica convencional ou endoscópica, com cortes menores na linha dos cabelos.', 'Internação de 12 horas e recuperação de 7 dias.'] },
  { g: 'face', id: 'rinoplastia', t: 'Rinoplastia', f: 'p-rinoplastia', p: ['Remodela a estrutura do nariz para corrigir deformidades estéticas e funcionais, buscando o nariz mais harmônico possível para o seu rosto. As cicatrizes são nulas ou quase imperceptíveis.', 'Internação de 12 horas e recuperação de 14 a 21 dias; um leve inchaço na ponta pode durar até 6 meses.'] },
  { g: 'face', id: 'otoplastia', t: 'Otoplastia (orelha de abano)', f: 'p-otoplastia', p: ['Corrige as orelhas afastadas da cabeça, deixando-as naturais, sem estigma de orelha de abano ou de cirurgia. Pode ser feita a partir dos 6 anos.', 'Internação de 12 horas e recuperação de 7 a 14 dias.'] },
  { g: 'face', id: 'ocidentalizacao', t: 'Ocidentalização', f: 'p-ocidentalizacao', p: ['Procurada sobretudo por jovens de origem oriental: retira parte da gordura das pálpebras superiores e cria uma “dobrinha” acima dos olhos, para um olhar mais harmonioso.', 'Internação de 12 horas e recuperação de 7 dias.'] },
  { g: 'intimidade', id: 'ninfoplastia', t: 'Ninfoplastia', f: 'p-ninfoplastia', p: ['Redução dos pequenos lábios vaginais aumentados, que causam desconforto e constrangimento, deixando-os em tamanho normal sem reduzir de forma exagerada.', 'Internação de 12 horas e recuperação de 7 dias; atividade sexual liberada após cerca de 21 dias.'] },
  { g: 'intimidade', id: 'reducao-do-monte-pubiano', t: 'Redução do monte pubiano', f: 'p-monte-pubiano', p: ['Para o monte de Vênus muito proeminente, visível até sobre a calça: lipoaspiração e, se necessário, retirada de tecido excedente para aplainar a região.', 'Internação de 12 horas e recuperação de cerca de 7 dias.'] },
  { g: 'esteticos', id: 'lipoenxertia', t: 'Lipoenxertia', f: 'p-lipoenxertia', p: ['Enxerto da gordura da própria pessoa, retirada por lipoaspiração, lavada e injetada onde se deseja: rugas da face, lábios, cicatrizes ou contorno glúteo.', 'A recuperação depende da lipoaspiração associada. Parte da gordura pode ser absorvida com o tempo.'] },
  { g: 'esteticos', id: 'preenchimentos-faciais', t: 'Preenchimentos faciais', f: 'p-preenchimentos', p: ['Substâncias como o ácido hialurônico, a mais usada pela segurança, são aplicadas com microcânulas para preencher rugas e sulcos ou realçar lábios e contorno da mandíbula.', 'Leva de 15 a 40 minutos e a recuperação é imediata.'] },
];
const posTxt = {
  intro: ['A perda significativa de peso é uma conquista importante. Mas depois dela é comum o corpo ficar com excesso de pele, flacidez e perda de definição do contorno, o que afeta conforto, estética e autoestima.', 'A cirurgia plástica pós-emagrecimento reorganiza essas alterações e devolve a harmonia corporal de forma planejada, segura e individualizada.'],
  indicacoes: ['Excesso de pele em abdômen, braços, coxas ou mamas', 'Flacidez importante em várias regiões do corpo', 'Desconforto em dobras de pele ou assaduras recorrentes', 'Dificuldade de adaptação de roupas', 'Impacto estético mesmo depois de atingir o peso desejado'],
  etapas: [['Avaliação', 'Análise detalhada do caso, inclusive para quem vem de fora, com organização prévia da consulta.'], ['Plano por etapas', 'Em geral mais de uma técnica, em diferentes áreas do corpo, em etapas planejadas para a sua segurança e recuperação.'], ['Cirurgia', 'Equipe multidisciplinar com suporte anestésico e foco em contorno corporal e pós-emagrecimento.'], ['Pós-operatório', 'Acompanhamento próximo, fisioterapia e nutrição, até a recuperação completa.']],
  resultado: 'Os resultados envolvem melhora significativa do contorno, redução do excesso de pele e mais harmonia. Muitos pacientes também relatam mais conforto no dia a dia e liberdade de movimento.',
};
const hoteis = [['Nomaa Hotel', '5 estrelas'], ['Hotel Full Jazz by Slaviero', '4 estrelas'], ['Quality Hotel Curitiba', '3 estrelas'], ['Hospedagem Nossa Casa', 'Casa para recuperação cirúrgica']];
const faq = [
  ['Quanto tempo após a gastroplastia posso fazer a cirurgia plástica?', 'O recomendável são 18 meses, mas muitos pacientes são liberados após 1 ano, quando já perderam peso suficiente. O importante é fazer as plásticas somente depois que o peso estabilizar.'],
  ['Quais partes do corpo costumam precisar de plástica após a gastroplastia?', 'Barriga, coxas, seios, costas, nádegas, pescoço, braços e região íntima. Mas cada corpo reage de uma maneira.'],
  ['Uma plástica abdominal tira a cicatriz da gastroplastia?', 'Depende. Se a cirurgia foi por vídeo, sim. Se o corte foi acima do umbigo, a cicatriz não desaparece, mas pode ser trocada por uma cicatriz mais fina e discreta.'],
  ['Quanto dura uma cirurgia plástica?', 'Em média: abdômen, 4 horas; costas e nádegas, 4 horas; pescoço e face, 4 horas; braços, seios e coxas, 3 horas cada.'],
  ['Em quanto tempo volto a trabalhar?', 'Em média de 14 a 21 dias, conforme a cirurgia e a sua recuperação.'],
  ['Como é o pós-operatório?', '24 horas de internação; em 7 dias, troca de curativo e retirada de drenos; em 15 dias, retirada dos pontos e caminhadas leves; em 21 dias, volta ao trabalho e a dirigir; em 90 dias, academia e fim da cinta modeladora.'],
  ['Sou fumante, como devo proceder?', 'É preciso parar de fumar pelo menos 21 dias antes da cirurgia. O cigarro afeta a cicatrização, a circulação e a respiração durante a anestesia.'],
  ['Quais anestesias são usadas?', 'Geral ou bloqueio espinhal. Em qualquer técnica, o paciente dorme durante toda a cirurgia, porque recebe sedação antes.'],
];

const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Dr. Guilherme Roça | Cirurgião Plástico em Curitiba' : `${titulo} | Dr. Guilherme Roça`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const logo = claro => `<img class="logo" src="/assets/logo${claro ? '-clara' : ''}.svg" alt="Guilherme Roça, cirurgião plástico" width="350" height="153">`;
const fig = (n, alt) => n ? `<figure>${img(n, alt)}</figure>` : '';

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}Curitiba/PR · ${E.crm}</span><span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Dr. Guilherme Roça, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waMsg()}" target="_blank" rel="noopener">Agendar consulta</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${logo(true)}<p>${curto}</p><p>${E.crm}</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      ${locais.map(l => `<li>${ic('pin')}<span><b>${l.n}</b>: ${l.rua}, ${l.bairro}</span></li>`).join('')}
    </ul><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Dr. Guilherme Roça. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site e gostaria de agendar uma consulta com o Dr. Guilherme Roça." id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Cidade<input name="cidade" autocomplete="address-level2" placeholder="De onde você é?"></label><label>Procedimento<select name="procedimento">${procs.map(p => `<option>${p.t}</option>`).join('')}<option>Ainda não sei</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Conte um pouco do seu caso"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp do consultório. Se preferir, ligue: ${E.fone}.</p>
</form>`;
const mapa = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed"></iframe>`;
const orcar = p => `<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e quero agendar uma avaliação de ${p.t.toLowerCase()} com o Dr. Guilherme Roça.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a>`;
const cardLocal = l => `<article class="local sobe" id="${l.id}"><figure>${img(l.f, l.n)}</figure><div><p class="k">${l.d}</p><h3>${l.n}</h3><p>${ic('pin')}<span>${l.rua}<br>${l.bairro}</span></p><p>${ic('tel')}<a href="${telHref(l.fone)}">${l.fone}</a></p></div></article>`;
const faqHtml = () => `<div class="faq">${faq.map((q, i) => `<details${i === 0 ? ' open' : ''}><summary>${q[0]}${ic('seta')}</summary><p>${q[1]}</p></details>`).join('')}</div>`;

function comum(v, pag, cab, cta, listaProcs) {
  pag.sobre = head(v, 'sobre', 'Sobre', curto) + topo(v, 'sobre') + cab('Sobre o médico', 'Dr. Guilherme Roça', 'dr-consultorio', E.crm) + `
<div class="in"><section class="dr-pag"><figure>${img('dr-retrato', 'Dr. Guilherme Roça')}</figure><div><p class="k">Formação</p><h2>Mestre e doutor em Clínica Cirúrgica pela UFPR</h2><p class="lead">Cirurgião plástico em Curitiba, com ampla experiência em remodelação corporal após grandes perdas de peso e casos de alta complexidade.</p>
<ol class="formacao">${formacao.map(f => `<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ol><a class="link-seta" href="${E.lattes}" target="_blank" rel="noopener">Currículo Lattes ${ic('seta')}</a></div></section>
<section class="bloco" id="equipe"><header class="tit"><p class="k">Equipe</p><h2>Quem cuida de você junto com o Dr. Guilherme</h2><p>Equipe multidisciplinar para cirurgias de contorno corporal e pós-emagrecimento.</p></header><div class="equipe">${equipe.map(p => `<article class="pessoa sobe"><figure>${img(p.f, p.n)}</figure><h3>${p.n}</h3><p class="ap">${p.c}</p></article>`).join('')}</div></section>
<section class="bloco"><header class="tit"><p class="k">Parceiros</p><h2>Profissionais parceiros</h2></header><ul class="parceiros">${parceiros.map(p => `<li><b>${p[0]}</b><span>${p[1]}</span></li>`).join('')}</ul></section>
<section class="bloco"><header class="tit"><p class="k">Onde atende</p><h2>Consultório e hospital</h2></header><div class="locais">${locais.map(cardLocal).join('')}</div></section></div>
` + cta() + rodape(v);
  pag['pos-emagrecimento'] = head(v, 'pos-emagrecimento', 'Cirurgia plástica pós-emagrecimento', 'Reconstrução completa do contorno corporal após grande perda de peso, com o Dr. Guilherme Roça, referência no Brasil em pós-bariátrica.') + topo(v, 'pos-emagrecimento') + cab('Pós-emagrecimento', 'Reconstrução completa do contorno corporal', 'cirurgia', 'O Dr. Guilherme Roça é referência no Brasil em cirurgia plástica pós-emagrecimento, com foco em casos de alta complexidade e resultados consistentes e naturais.') + `
<div class="in"><section class="pos-intro"><div><p class="lead">${posTxt.intro[0]}</p><p>${posTxt.intro[1]}</p></div><div class="caixa"><h3>Indicações mais comuns</h3>${lista(posTxt.indicacoes)}</div></section>
<section class="bloco"><header class="tit"><p class="k">Planejamento individualizado</p><h2>Como funciona o tratamento</h2></header><ol class="etapas">${posTxt.etapas.map((e, i) => `<li><span class="n">${i + 1}</span><div><h3>${e[0]}</h3><p>${e[1]}</p></div></li>`).join('')}</ol><p class="resultado">${posTxt.resultado}</p></section>
<section class="bloco"><header class="tit"><p class="k">Antes e depois</p><h2>Resultados de pacientes</h2><p>Publicados no Instagram, com autorização das pacientes. Cada corpo responde de um jeito.</p></header><ul class="antes-depois">${[1, 2, 3].map(i => `<li><a href="/assets/img/antes-depois-${i}.webp" data-foto="Antes e depois">${img(`antes-depois-${i}`, 'Antes e depois de cirurgia pós-emagrecimento')}</a></li>`).join('')}</ul></section>
<section class="bloco"><header class="tit"><p class="k">Cirurgias</p><h2>Procedimentos pós-emagrecimento</h2></header><div class="mini-lista">${procs.filter(p => p.g === 'pos-emagrecimento').map(p => `<a href="${link(v, 'procedimentos')}#${p.id}">${fig(p.f, p.t)}<b>${p.t}</b></a>`).join('')}</div></section>
<section class="bloco"><header class="tit"><p class="k">Dúvidas frequentes</p><h2>Perguntas de quem fez bariátrica</h2></header>${faqHtml()}</section></div>
` + cta() + rodape(v);
  pag.procedimentos = head(v, 'procedimentos', 'Procedimentos', 'Cirurgias pós-emagrecimento, prótese de mama, lipoaspiração, face, intimidade e procedimentos estéticos em Curitiba.') + topo(v, 'procedimentos') + cab('Procedimentos', 'Cirurgias para mulheres e homens', 'maos', 'Cirurgia plástica com cuidado, ética e respeito ao paciente. Cada caso é avaliado de forma individual.') + `
<div class="in"><nav class="grupos-nav" aria-label="Grupos">${grupos.map(g => `<a href="#${g.id}">${g.t}</a>`).join('')}</nav>${listaProcs()}</div>
` + cta() + rodape(v);
  pag['pacientes-de-fora'] = head(v, 'pacientes-de-fora', 'Pacientes de fora', 'Atendimento para pacientes de outras cidades, estados e países: concierge, hotéis conveniados e casa de recuperação em Curitiba.') + topo(v, 'pacientes-de-fora') + cab('Pacientes de fora', 'Nosso cuidado com pacientes de fora', 'dr-consultorio', 'Se você vem de outra cidade, estado ou país, cuidamos de cada etapa, da primeira consulta ao pós-operatório.') + `
<div class="in"><section class="fora"><article><span class="ico">${ic('usuarios')}</span><h3>Atendimento personalizado</h3><p>Muitos pacientes vêm de longe. A equipe ajuda em todos os aspectos da jornada, da primeira consulta ao pós-operatório.</p></article><article><span class="ico">${ic('calendario')}</span><h3>Concierge e logística</h3><p>A concierge marca consultas, organiza os exames pré-operatórios, orienta sobre estadia e deslocamento e acompanha você durante toda a jornada cirúrgica.</p></article><article><span class="ico">${ic('coracao')}</span><h3>Hotéis e casa de recuperação</h3><p>Parcerias com hotéis próximos da clínica, escolhidos pela qualidade e pela conveniência.</p></article></section>
<section class="bloco"><header class="tit"><p class="k">Onde ficar</p><h2>Hotéis conveniados e casa de recuperação</h2></header><ul class="hoteis">${hoteis.map(h => `<li><b>${h[0]}</b><span>${h[1]}</span></li>`).join('')}</ul></section>
<section class="bloco"><header class="tit"><p class="k">Dúvidas frequentes</p><h2>Antes de marcar a viagem</h2></header>${faqHtml()}</section></div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `WhatsApp ${E.waVer}. Clínica Bellage, Bigorrilho, Curitiba.`) + topo(v, 'contato') + cab('Contato', 'Agende sua consulta', 'clinica-bellage', 'Consulta particular na Clínica Bellage, no Bigorrilho. Cirurgias no Hospital da Cruz Vermelha.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Fale com a equipe</h2>${formulario()}</div><div><ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.waVer}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">@dr.guilherme.roca</a></div></li>
</ul>${mapa(locais[0].q)}</div></section>
<section class="bloco"><div class="locais">${locais.map(cardLocal).join('')}</div></section></div>
` + rodape(v);
}

// ---------- A: Espiral (claro, azul #002C53 do logo, a espiral como desenho) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><div><h2>Cada caso exige uma análise detalhada</h2><p>Agende sua consulta e receba uma avaliação completa e individualizada.</p></div><p class="bts"><a class="btn btn-claro" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar pelo WhatsApp</a><a class="btn btn-linha-clara" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const listaProcs = () => grupos.map(g => `<section class="grupo-a" id="${g.id}"><header class="grupo-tit"><h2>${g.t}</h2><p>${g.d}</p></header><div class="procs-a">${procs.filter(p => p.g === g.id).map(p => `<article class="proc-a sobe${p.f ? '' : ' sem-foto'}" id="${p.id}">${fig(p.f, p.t)}<div><h3>${p.t}</h3>${p.p.map(x => `<p>${x}</p>`).join('')}${orcar(p)}</div></article>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Cirurgião plástico · Curitiba</p><h1>Referência no Brasil em cirurgia plástica <em>pós-emagrecimento</em></h1><p>Cirurgia plástica com cuidado, ética e respeito ao paciente. Membro titular da SBCP, mestre e doutor em Clínica Cirúrgica pela UFPR.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'pos-emagrecimento')}">Pós-emagrecimento</a></p></div>
<div class="hero-a-foto"><span class="espiral" aria-hidden="true"></span>${img('dr-retrato', 'Dr. Guilherme Roça', ' loading="eager" fetchpriority="high"')}<p class="hero-a-crm"><b>Dr. Guilherme Roça</b>${E.crm}</p></div></div></section>
<section class="numeros-a"><div class="in">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="pos-a"><div class="in pos-a-in"><figure>${img('pos-costas', 'Contorno corporal após emagrecimento')}</figure><div><p class="k">Especialidade</p><h2>Depois de perder muito peso, o corpo pede um novo contorno</h2><p>${posTxt.intro[0]}</p>${lista(posTxt.indicacoes.slice(0, 4))}<p class="bts"><a class="btn" href="${link(v, 'pos-emagrecimento')}">Como funciona o tratamento</a></p></div></div></section>
<section class="in esp-a"><header class="tit tit-linha"><div><p class="k">Procedimentos</p><h2>Cirurgias para mulheres e homens</h2></div><a class="link-seta" href="${link(v, 'procedimentos')}">Todos os ${procs.length} procedimentos ${ic('seta')}</a></header><div class="grupos-a">${grupos.map(g => `<a class="grupo-card sobe" href="${link(v, 'procedimentos')}#${g.id}"><figure>${img(g.f, g.t)}</figure><div><h3>${g.t}</h3><p>${g.d}</p></div></a>`).join('')}</div></section>
<section class="sobre-a"><div class="in sobre-a-in"><div><p class="k">Sobre o médico</p><h2>Formado, especializado e titulado pela UFPR</h2><ol class="formacao">${formacao.slice(0, 5).map(f => `<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ol><a class="link-seta" href="${link(v, 'sobre')}">Formação e equipe ${ic('seta')}</a></div><figure>${img('dr-consultorio', 'Dr. Guilherme Roça no consultório')}</figure></div></section>
<section class="in depo-a"><header class="tit"><p class="k">Depoimentos</p><h2>O que dizem os pacientes</h2></header><div class="depos-a">${depos.map(d => `<figure class="sobe"><span class="estrelas">★★★★★</span><blockquote><p>${d}</p></blockquote></figure>`).join('')}</div></section>
<section class="fora-a"><div class="in fora-a-in"><div><p class="k">Pacientes de fora</p><h2>Vem de outra cidade? A gente organiza tudo</h2><p>Concierge para marcar consultas e exames, hotéis conveniados perto da clínica e casa de recuperação.</p><a class="btn btn-claro" href="${link(v, 'pacientes-de-fora')}">Como funciona</a></div><ul class="hoteis">${hoteis.map(h => `<li><b>${h[0]}</b><span>${h[1]}</span></li>`).join('')}</ul></div></section>
<section class="in locais-a"><header class="tit"><p class="k">Onde atende</p><h2>Consultório no Bigorrilho, cirurgias na Cruz Vermelha</h2></header><div class="locais">${locais.map(cardLocal).join('')}</div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, listaProcs);
  return pag;
}

// ---------- B: Noturno (azul-marinho escuro, foto P&B do centro cirúrgico, condensada e firme) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><h2>Agende sua avaliação completa e individualizada</h2><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const listaProcs = () => grupos.map(g => `<section class="grupo-b" id="${g.id}"><header class="grupo-tit"><h2>${g.t}</h2><p>${g.d}</p></header><div class="procs">${procs.filter(p => p.g === g.id).map((p, i) => `<details class="proc sobe" id="${p.id}"${i === 0 ? ' open' : ''}><summary><span class="num">${String(procs.indexOf(p) + 1).padStart(2, '0')}</span><b>${p.t}</b>${ic('seta')}</summary><div class="proc-corpo${p.f ? '' : ' sem-foto'}">${fig(p.f, p.t)}<div>${p.p.map(x => `<p>${x}</p>`).join('')}${orcar(p)}</div></div></details>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Dr. Guilherme Roça · Cirurgião plástico · Curitiba</p><h1>Referência no Brasil em cirurgia plástica pós-emagrecimento.</h1><p>Contorno corporal depois de grandes perdas de peso, mamas, face e intimidade, com planejamento individualizado e equipe multidisciplinar.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'procedimentos')}">Procedimentos</a></p></div><figure class="hero-b-foto">${img('dr-cirurgia-pb', 'Dr. Guilherme Roça em cirurgia', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="numeros-b"><div class="in">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in pos-b"><div><p class="k">Pós-emagrecimento</p><h2>Planejamento em etapas, do primeiro contato à recuperação</h2><p class="lead">${posTxt.intro[1]}</p><a class="link-seta" href="${link(v, 'pos-emagrecimento')}">Entenda o tratamento ${ic('seta')}</a></div><ol class="etapas-b">${posTxt.etapas.map((e, i) => `<li class="sobe"><span class="n">0${i + 1}</span><h3>${e[0]}</h3><p>${e[1]}</p></li>`).join('')}</ol></section>
<section class="ad-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Antes e depois</p><h2>Resultados reais</h2></div><a class="link-seta" href="${link(v, 'pos-emagrecimento')}">Ver mais ${ic('seta')}</a></header><ul class="antes-depois">${[1, 2, 3].map(i => `<li><a href="/assets/img/antes-depois-${i}.webp" data-foto="Antes e depois">${img(`antes-depois-${i}`, 'Antes e depois de cirurgia pós-emagrecimento')}</a></li>`).join('')}</ul></div></section>
<section class="in esp-b"><header class="tit"><p class="k">Procedimentos</p><h2>${procs.length} cirurgias e procedimentos</h2></header><div class="esp-b-lista">${grupos.map((g, i) => `<a class="esp-linha sobe" href="${link(v, 'procedimentos')}#${g.id}"><span class="num">0${i + 1}</span><b>${g.t}</b><span class="itens">${procs.filter(p => p.g === g.id).map(p => p.t).join(' · ')}</span>${img(g.f, g.t)}${ic('seta')}</a>`).join('')}</div></section>
<section class="sobre-b"><div class="in sobre-b-in"><figure>${img('dr-retrato', 'Dr. Guilherme Roça')}</figure><div><p class="k">Sobre o médico</p><h2>Mestre e doutor pela UFPR, chefe do serviço de pós-bariátrica do Hospital São Lucas</h2><ol class="formacao">${formacao.slice(0, 4).map(f => `<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ol><a class="link-seta" href="${link(v, 'sobre')}">Formação completa e equipe ${ic('seta')}</a></div></div></section>
<section class="depo-b"><div class="in depo-b-in"><span class="estrelas">★★★★★</span><blockquote><p>“${depos[0]}”</p></blockquote><ul class="depo-b-mais">${['Ele respeita o limite do nosso corpo e deixa claro as melhores escolhas.', 'Um cirurgião comprometido, cuidadoso e que ama o que faz. Já fiz há 5 anos.', 'Detalhista, perfeccionista e principalmente humano. Confiança resume tudo.'].map(d => `<li>“${d}”</li>`).join('')}</ul></div></section>
<section class="in fora-b"><figure>${img('dr-consultorio', 'Dr. Guilherme Roça no consultório')}</figure><div><p class="k">Pacientes de fora</p><h2>Estrutura completa para quem vem de outras cidades</h2><p>Concierge, organização de exames, hotéis conveniados e casa de recuperação.</p>${lista(hoteis.map(h => `${h[0]} (${h[1].toLowerCase()})`))}<a class="link-seta" href="${link(v, 'pacientes-de-fora')}">Como funciona ${ic('seta')}</a></div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, listaProcs);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comumCss + '\n' + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Dr. Guilherme Roça', artigo: 'do', url: E.url, lang: 'pt', cor: '#2f6fa3', fundo: '#002C53', claro: '#f6f8fa',
  fonteTitulo: '"Barlow Condensed",system-ui,sans-serif', fonteTexto: 'Barlow,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no azul do logo e com a espiral como desenho: o Dr. Guilherme e a especialidade pós-emagrecimento logo na abertura.', pontos: ['Página própria de pós-emagrecimento', `${procs.length} procedimentos explicados`, 'Pacientes de fora, hotéis e FAQ'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Azul-marinho escuro, com a foto em preto e branco do centro cirúrgico: mais firme, com o tratamento em etapas e antes e depois.', pontos: ['Etapas do tratamento na home', 'Antes e depois em destaque', 'Procedimentos em sanfona'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
