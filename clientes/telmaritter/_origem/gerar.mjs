// Dra. Telma Ritter, cirurgia plástica (Brasília/DF). Gera public/{a,b}/ e a página de escolha.
// node clientes/telmaritter/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs telmaritter https://www.dratelmaritter.com.br/)
// Textos: páginas do site atual em Wix (Sobre mim, Estrutura, A equipe, Depoimentos, as 18 páginas de especialidades e Contato).
// Fotos: as do próprio site (Dra. Telma, equipe, salas do consultório, galeria, imagens de cada especialidade).
// Logo: redesenhado em vetor (potrace) a partir do PNG do site, com as três cores originais.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Dra. Telma Ritter', url: 'https://telmaritter.overtus.com.br/', antigo: 'https://www.dratelmaritter.com.br/',
  fone: '(61) 3245-3926', wa: '5561993960808', waVer: '(61) 99396-0808', email: 'consultorio.telmaritter@gmail.com',
  insta: 'https://www.instagram.com/dratelmaritter', area: 'https://area-paciente-telma-ritter.netlify.app/',
  tour: 'https://tour360.meupasseiovirtual.com/035596/130682/tourvirtual/',
  rua: 'SGAS 614, lote 99, Edifício Vitrium, sala 210', bairro: 'Asa Sul, Brasília/DF · CEP 70200-740',
  mapa: 'https://www.google.com/maps/dir//SGAS+614+Edif%C3%ADcio+Vitrium+-+Asa+Sul,+Bras%C3%ADlia+-+DF,+70200-740',
};
export const nomesVersao = { a: 'Mármore', b: 'Galeria' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#fbf8f6', b: '#3E3735' };
const waMsg = (m = 'Olá! Vim pelo site e gostaria de marcar uma consulta com a Dra. Telma.') => waHref(E.wa, m);

const nav = [{ slug: 'sobre', nome: 'Sobre mim' }, { slug: 'especialidades', nome: 'Especialidades' }, { slug: 'estrutura', nome: 'Estrutura' }, { slug: 'depoimentos', nome: 'Depoimentos' }, { slug: 'contato', nome: 'Contato' }];
const curto = 'Cirurgia plástica e estética em Brasília: mamas, contorno corporal, face e cirurgia íntima, com a Dra. Telma Ritter, membro da SBCP desde 2002.';
const frase = 'Todo o cuidado com você para que esteja sempre bem com o espelho.';
const bio = 'Sou especialista em cirurgia da mama, do contorno corporal, abdominoplastia, reconstrução mamária pós-mastectomia, reconstrução oncológica, cirurgia reparadora após grande perda de peso e rejuvenescimento e estética facial.';
const formacao = [
  ['1999', 'Formada em Medicina pela Universidade de Brasília (UnB).'],
  ['2000–2002', 'Residência em Cirurgia Geral no Hospital Universitário de Brasília.'],
  ['2002–2005', 'Residência em Cirurgia Plástica e Microcirurgia no Instituto Nacional de Câncer (INCA), Rio de Janeiro.'],
  ['1º lugar', 'Aprovada em primeiro lugar na prova de especialista da Sociedade Brasileira de Cirurgia Plástica (SBCP).'],
  ['Nova York', 'Convidada para o International Fellow em Reconstrução Oncológica no Memorial Sloan Kettering Cancer Center.'],
  ['Pós', 'Pós-graduação em Medicina Estética pelo Colégio Brasileiro de Medicina Estética.'],
];
const membro = ['Sociedade Brasileira de Cirurgia Plástica (SBCP), desde 2002', 'Colégio Brasileiro de Cirurgiões (CBC)', 'American Society of Plastic Surgeons (ASPS)'];
const numeros = [['UnB', 'formada em 1999'], ['INCA', 'residência em cirurgia plástica'], ['1º lugar', 'na prova de especialista da SBCP'], ['5,0', 'no Google, mais de 450 avaliações']];

const grupos = [
  { id: 'mamas', t: 'Mamas', f: 'p-protese', d: 'Prótese, mamoplastia, reconstrução e explante.' },
  { id: 'corpo', t: 'Contorno corporal', f: 'p-abdominoplastia', d: 'Abdominoplastia, lipo, lifting e pós-bariátrica.' },
  { id: 'face', t: 'Face', f: 'p-blefaroplastia', d: 'Rejuvenescimento facial, pálpebras e orelhas.' },
  { id: 'intima', t: 'Cirurgia íntima', f: 'p-ninfoplastia', d: 'Ninfoplastia e lipo do monte de Vênus.' },
];
const procs = [
  { g: 'mamas', id: 'protese-de-mama', f: 'p-protese', t: 'Prótese de mama', p: ['Procedimento cirúrgico que tem como objetivo aumentar, corrigir ou devolver o volume dos seios e proporcionar um melhor contorno, firmeza e simetria através da inclusão de prótese de silicone.', 'É indicado para mulheres com seios pequenos ou desproporcionais ao corpo, correção de assimetria e seios murchos devido à amamentação. O tamanho e o formato (redondo, anatômico ou cônico) são decididos juntos, em consulta, provando diferentes próteses com sutiã.'] },
  { g: 'mamas', id: 'mamoplastia', f: 'p-mamoplastia', t: 'Mamoplastia', p: ['Pode ser redutora ou de aumento. A redutora eleva a mama e remove o excesso de pele e tecido mamário, revertendo a queda (ptose) que a idade e a gestação aceleram.', 'Na de aumento, o volume vem de próteses de silicone ou enxerto de gordura, para melhorar a silhueta, corrigir diferenças entre os seios ou reconstruir após mastectomia.'] },
  { g: 'mamas', id: 'reconstrucao-de-mama', f: 'p-reconstrucao', t: 'Reconstrução de mama', p: ['Uma das principais preocupações de quem enfrenta o câncer de mama é perder um ou ambos os seios. A cirurgia de reconstrução mamária devolve o volume e renova a autoestima.', 'Na reconstrução parcial, a cirurgia oncoplástica combina técnicas de mamoplastia e oncologia. Nas mastectomias, além das próteses, a lipoenxertia tem melhorado os resultados em casos que pareciam sem solução.'] },
  { g: 'mamas', id: 'explante-mamario', f: 'p-explante', t: 'Explante mamário', p: ['É a cirurgia de retirada das próteses mamárias, cada vez mais procurada, e as novas técnicas trazem resultados muito satisfatórios para o contorno.', 'A mulher é soberana sobre o próprio corpo: o explante pode ser uma decisão da paciente ou uma indicação médica, pelo tempo das próteses ou por raras complicações.'] },
  { g: 'corpo', id: 'abdominoplastia', f: 'p-abdominoplastia', t: 'Abdominoplastia', p: ['Reduz o volume abdominal removendo a pele flácida, depósitos de gordura e estrias da parte inferior do abdômen, e aproxima os músculos para deixar a barriga mais firme.', 'Muitas mulheres associam a abdominoplastia à lipoaspiração para um contorno mais completo. Não é tratamento de obesidade: o ideal é chegar ao peso desejado antes da cirurgia.'] },
  { g: 'corpo', id: 'lipoaspiracao', f: 'p-lipoaspiracao', t: 'Lipoaspiração', p: ['Aspiração da gordura localizada através de cânulas, em diversas partes do corpo. Pode ser pequena, média ou grande, conforme a quantidade de gordura e as regiões tratadas.', 'As cicatrizes medem cerca de meio centímetro e com o tempo ficam quase imperceptíveis. A anestesia pode ser geral, peridural ou local, conforme o caso.'] },
  { g: 'corpo', id: 'lipo-laser', f: 'dra-laser', t: 'Lipo LASER', p: ['Lipoaspiração feita com o auxílio de um laser que derrete a gordura mais profunda antes de aspirá-la. O laser estimula o colágeno, o que ajuda a pele a não ficar flácida e melhora o contorno da silhueta.', 'É feita em ambiente hospitalar, com incisões iguais às da lipoaspiração comum.'] },
  { g: 'corpo', id: 'lipoescultura', f: 'p-lipoescultura', t: 'Lipoescultura', p: ['Também conhecida como contorno corporal ou body lifting, ajuda quem ainda não está satisfeita com o corpo, mesmo depois de perder peso, a encontrar a harmonia que deseja.', 'É um conjunto de cirurgias, feitas juntas ou separadas, para remover gordura localizada ou o excesso de flacidez causado por grandes emagrecimentos, envelhecimento ou gravidez.'] },
  { g: 'corpo', id: 'lipo-enxertia', f: 'p-enxertia', t: 'Lipo enxertia', p: ['Enxerto de gordura do próprio paciente, com resultados surpreendentes em rejuvenescimento e remodelação, porque a gordura enxertada carrega uma grande quantidade de células-tronco.', 'Pode ser feito em qualquer região para aumentar volume ou corrigir depressões, cicatrizes, deformidades congênitas ou sequelas de doenças.'] },
  { g: 'corpo', id: 'braquioplastia', f: 'p-braquioplastia', t: 'Braquioplastia', p: ['Cirurgia para o excesso de pele nos braços, com ou sem acúmulo de gordura, que aparece depois de grande perda de peso, do efeito sanfona ou com o envelhecimento.', 'Há três abordagens diferentes, cada uma com suas indicações, cicatrizes e resultados, escolhidas em boa sintonia entre cirurgiã e paciente.'] },
  { g: 'corpo', id: 'lifting-de-coxa', f: 'p-lifting-coxa', t: 'Lifting de coxa', p: ['Devolve firmeza e afina as coxas que ficaram flácidas com o envelhecimento ou o emagrecimento, quando dieta e exercícios não bastam.', 'Não remove gordura, só estica a pele: se houver gordura localizada, faz-se uma lipoaspiração antes. O ideal é operar já no peso desejado.'] },
  { g: 'corpo', id: 'pos-bariatrica', f: 'p-pos-bariatrica', t: 'Pós-bariátrica', p: ['O contorno corporal após grande perda de peso melhora a forma e o tônus dos tecidos que sustentam a gordura e a pele, e remove o excesso de gordura e de flacidez.', 'Depois da cirurgia de redução de estômago, a pele muitas vezes perde a elasticidade e não acompanha o novo tamanho do corpo.'] },
  { g: 'corpo', id: 'mommy-makeover', f: 'p-mommy', t: 'Mommy makeover', p: ['Depois da gravidez e da amamentação vêm mudanças nas mamas, estrias, flacidez e gordura localizada, difíceis de corrigir só com dieta e exercícios.', 'O Mommy Makeover é a combinação das cirurgias de mama, abdômen e lipoaspiração, pensada para a mulher após a gestação.'] },
  { g: 'face', id: 'rejuvenescimento-facial', f: 'p-rejuvenescimento', t: 'Rejuvenescimento facial', p: ['O lifting facial (ritidoplastia) elimina rugas, flacidez e o excesso de pele, levanta o rosto, ameniza os vincos e resgata os contornos faciais.', 'O envelhecimento da face vem sobretudo da perda de gordura e da flacidez dos tecidos; a cirurgia reposiciona tecido e musculatura no terço médio da face.'] },
  { g: 'face', id: 'blefaroplastia', f: 'p-blefaroplastia', t: 'Blefaroplastia', p: ['Melhora o aspecto das pálpebras superiores e inferiores, eliminando bolsas de gordura, rugas e flacidez, e pode até melhorar o campo de visão.', 'Pode ser feita no próprio consultório, com anestesia local ou sedação acompanhada por anestesista.'] },
  { g: 'face', id: 'otoplastia', f: 'p-otoplastia', t: 'Otoplastia', p: ['Cirurgia plástica das orelhas, em geral para corrigir orelhas proeminentes (de abano), mas também sequelas de traumas, orelhas constritas ou muito grandes.', 'É ao mesmo tempo reparadora e estética, buscando harmonia de forma, volume e posição.'] },
  { g: 'intima', id: 'ninfoplastia', f: 'p-ninfoplastia', t: 'Cirurgia íntima (ninfoplastia)', p: ['O Brasil é recordista mundial em plásticas íntimas. A mais procurada é a labioplastia dos pequenos lábios, indicada para quem está insatisfeita com a aparência, sente dor nas relações ou incômodo com roupas justas.', 'O procedimento dura cerca de uma hora, em ambiente hospitalar, normalmente sem internação, e as atividades leves voltam em três dias.'] },
  { g: 'intima', id: 'lipo-monte-de-venus', f: 'p-monte-venus', t: 'Lipo do monte de Vênus', p: ['Para o excesso de gordura na região do púbis, que costuma constranger ao usar roupas justas, a lipoaspiração da área resolve o desconforto.', 'É uma cirurgia que pode ser feita no consultório, com o auxílio de anestesista.'] },
];
const salas = [
  { f: 'recepcao', t: 'A recepção', p: ['O design interior foi projetado pela designer Stella Garcia. Com uma arquitetura moderna e ao mesmo tempo clássica, a recepção ampla e clean traz conforto, tranquilidade e serenidade.', 'Por todo o consultório você verá obras de arte que combinam com os painéis de madeira e a bancada de mármore, porque a minha segunda paixão é a arte.'] },
  { f: 'corredor', t: 'Corredor de acessos', p: ['Leva a todos os ambientes do consultório. É aqui que você é recebida por mim, e por uma linda estátua de Bruno Giorgi.'] },
  { f: 'curativos', t: 'Sala de curativos', p: ['Com maca e foco cirúrgico modernos, é dedicada à troca de curativos e ao acompanhamento da cicatrização.', 'Tem dois acessos, um pelo corredor e outro direto ao meu consultório, para preservar a sua privacidade.'] },
  { f: 'pequenas-cirurgias', t: 'Sala de pequenas cirurgias', p: ['Foco e maca cirúrgicos de última geração, bisturi elétrico e sistema automatizado de água, para conforto e segurança nas pequenas cirurgias.', 'Tem acesso direto à sala de higienização e esterilização: os instrumentos não passam pelos outros ambientes.'] },
  { f: 'dra-sala', t: 'Minha sala', p: ['É aqui que conversamos sobre a sua cirurgia, as suas expectativas e receios. Explico como podem ser os resultados e juntas decidimos a melhor abordagem para você e o seu corpo.', 'E sim, o quadro na parede é um Di Cavalcanti. Quer ver de pertinho? Venha me visitar.'] },
  { f: 'exame', t: 'Sala de exame', p: ['Também com muito carinho e belas obras de arte, para você se sentir em casa enquanto eu te examino e continuamos a nossa conversa.'] },
  { f: 'pagamento', t: 'Sala de pagamento e fotografia', p: ['Ambiente reservado para os pagamentos, com total segurança e privacidade. É lá também que tiramos as fotos de pré e pós-operatório.'] },
];
const equipe = [
  { f: 'flavia', n: 'Flavia Dutra', ap: 'Mas pode chamar de Flavinha', ig: 'dutraflavinha', d: 'Está comigo há quase 18 anos e conhece todas vocês. Cuida das marcações, do hospital, do agendamento e dos encaixes, e participa das angústias, urgências, alegria e gratidão de cada paciente.' },
  { f: 'tatiana', n: 'Tatiana Fernandes', ap: 'Pode chamar de Tati, ela adora', ig: 'tatianafer30', d: 'Há quase 15 anos comigo, técnica de enfermagem, me acompanha nas cirurgias e sabe exatamente do que preciso: somos quatro mãos trabalhando juntas. Também ajuda nos retornos e curativos.' },
  { f: 'adriana', n: 'Adriana Nunes', ap: 'A Dri', ig: 'adrinunes22', d: 'Técnica de enfermagem, ajuda nos curativos, instrumenta em algumas cirurgias e faz agendamentos. É o meio de campo, dando suporte ao centro cirúrgico e ao consultório.' },
  { f: 'pedro', n: 'Pedro Berredo', ap: 'Pedro Berredo mesmo', ig: 'berredopedro', d: 'Engenheiro mecânico pela UnB, cuida da administração, manutenção, compras e marketing. Faz o Instagram, gerencia o site e garante que o consultório funcione impecavelmente nos bastidores.' },
];
const depo = {
  autora: 'Viviane A.', cirurgia: 'Abdominoplastia e mastopexia com prótese',
  curto: 'De forma muito clara, honesta e objetiva, a Dra. Telma explicou o que era mais indicado para o meu caso, foi muito sincera sobre os cortes e cicatrizes. Saí de lá com a certeza de que seria ela.',
  todo: [
    'Eu já estava marcada com outro profissional, mas algumas situações aconteceram e eu resolvi ouvir outra opinião. Fiquei sabendo da Dra. Telma e corri para a internet, aí pensei: “nossa, ela deve ser realmente boa, vou lá, não custa nada”.',
    'De forma muito clara, honesta e objetiva, Dra. Telma explicou o que era mais indicado para o meu caso, foi muito sincera sobre os cortes e cicatrizes. Saí de lá com a certeza de que seria ela.',
    'Dra. Telma, além de competente, experiente e segura das suas ações e indicações, é detalhista. Vi simetria entre os seios, ficou como eu sempre quis. Ah, quer saber sobre o meu umbigo? Estou amando!',
    'No pós-operatório tive todo o suporte dela. E não tem como finalizar sem falar da equipe: Flávia, Adriana e Tati, vocês foram muito importantes nesse processo. Sempre ligando para saber se eu precisava de alguma coisa.',
    'A medicina estética está além de um corpo bonito. Hoje tenho marcas pelo meu corpo, mas elas contam um pouco da minha história, de algumas superações, e trouxeram alegria.',
    'Antes de decidirem pelo profissional, vocês precisam consultar com a Dra. Telma. Pensem numa cirurgiã competente, experiente, detalhista. Você trabalha com vidas e sonhos.',
  ],
};
const galeria = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12'];

const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Dra. Telma Ritter | Cirurgia Plástica em Brasília' : `${titulo} | Dra. Telma Ritter`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const logo = claro => `<img class="logo" src="/assets/logo${claro ? '-clara' : ''}.svg" alt="Telma Ritter Cirurgia Plástica" width="999" height="263">`;

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}SGAS 614, Ed. Vitrium · Asa Sul, Brasília</span><span class="faixa-dir"><a href="${E.area}" target="_blank" rel="noopener">${ic('usuarios')}Área da paciente</a><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Dra. Telma Ritter, página inicial">${logo(v === 'b')}</a>
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
    <div class="rod-marca">${logo(true)}<p>${frase}</p><p>Dra. Telma Ritter, cirurgiã plástica, membro da SBCP.</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}<li><a href="${E.area}" target="_blank" rel="noopener">Área da paciente</a></li></ul></div>
    <div><h3>Consultório</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<a href="${E.mapa}" target="_blank" rel="noopener">${E.rua}<br>${E.bairro}</a></li>
    </ul><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a></p></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Dra. Telma Ritter. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site e gostaria de marcar uma consulta com a Dra. Telma." id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Cirurgia de interesse<select name="cirurgia">${procs.map(p => `<option>${p.t}</option>`).join('')}<option>Ainda não sei</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Conte um pouco do que você deseja"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp do consultório. Se preferir, ligue: ${E.fone}.</p>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa do consultório" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Edifício Vitrium, SGAS 614, Asa Sul, Brasília')}&z=16&output=embed"></iframe>`;
const orcar = p => `<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e quero saber mais sobre ${p.t.toLowerCase()} com a Dra. Telma.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a>`;

function comum(v, pag, cab, cta, listaProcs) {
  pag.sobre = head(v, 'sobre', 'Sobre mim', bio) + topo(v, 'sobre') + cab('Sobre mim', 'Dra. Telma Ritter', 'dra-coracao', 'Cirurgiã plástica em Brasília, formada pela UnB e especialista pelo INCA.') + `
<div class="in"><section class="dr-pag"><figure>${img('dra-balao', 'Dra. Telma Ritter no consultório')}</figure><div><p class="k">Cirurgiã plástica</p><h2>Cuidado de ponta a ponta, da consulta ao pós-operatório</h2><p class="lead">${bio}</p>
<ol class="formacao">${formacao.map(f => `<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ol>
<h3>Membro de</h3>${lista(membro)}</div></section>
<section class="bloco" id="equipe"><header class="tit"><p class="k">A equipe</p><h2>A super equipe</h2><p>Quem cuida de você comigo, do agendamento ao centro cirúrgico.</p></header><div class="equipe">${equipe.map(p => `<article class="pessoa sobe"><figure>${img(p.f, p.n)}</figure><h3>${p.n}</h3><p class="ap">${p.ap}</p><p>${p.d}</p><a href="https://www.instagram.com/${p.ig}" target="_blank" rel="noopener">${ic('insta')}@${p.ig}</a></article>`).join('')}</div></section></div>
` + cta() + rodape(v);
  pag.especialidades = head(v, 'especialidades', 'Especialidades', 'Prótese de mama, mamoplastia, abdominoplastia, lipoaspiração, lipo LASER, blefaroplastia, rejuvenescimento facial, cirurgia íntima e mais, em Brasília.') + topo(v, 'especialidades') + cab('Especialidades', 'Cirurgia plástica e cirurgia estética', 'dra-centro', 'Conheça os procedimentos. O preço é personalizado, definido depois de uma avaliação criteriosa, com formas de pagamento acessíveis.') + `
<div class="in"><nav class="grupos-nav" aria-label="Grupos">${grupos.map(g => `<a href="#${g.id}">${g.t}</a>`).join('')}</nav>${listaProcs()}</div>
` + cta() + rodape(v);
  pag.estrutura = head(v, 'estrutura', 'Estrutura', 'Consultório projetado pela designer Stella Garcia na Asa Sul, com sala de pequenas cirurgias, curativos e obras de arte.') + topo(v, 'estrutura') + cab('Estrutura', 'Conheça a nossa estrutura para a sua melhor experiência', 'recepcao', 'Um consultório pensado para o seu conforto, a sua segurança e a sua privacidade.') + `
<div class="in"><section class="salas">${salas.map(s => `<article class="sala sobe"><figure>${img(s.f, s.t)}</figure><div><h2>${s.t}</h2>${s.p.map(x => `<p>${x}</p>`).join('')}</div></article>`).join('')}</section>
<section class="tour"><div><p class="k">Tour 360°</p><h2>Visite o consultório sem sair de casa</h2><p>Passeie pelas salas em 360 graus antes da sua consulta.</p></div><a class="btn" href="${E.tour}" target="_blank" rel="noopener">Abrir o tour virtual ${ic('seta')}</a></section>
<section class="bloco" id="galeria"><header class="tit"><p class="k">Galeria de fotos</p><h2>Dia a dia do consultório e do centro cirúrgico</h2></header><ul class="galeria galeria-fotos">${galeria.map(g => `<li><a href="/assets/img/${g}.webp" data-foto="Dra. Telma Ritter e equipe">${img(g, 'Dra. Telma Ritter e equipe')}</a></li>`).join('')}</ul></section></div>
` + cta() + rodape(v);
  pag.depoimentos = head(v, 'depoimentos', 'Depoimentos', 'Nota 5,0 no Google. Leia o relato de pacientes da Dra. Telma Ritter.') + topo(v, 'depoimentos') + cab('Depoimentos', 'Quem já operou conta como foi', 'equipe-consultorio', 'Nota 5,0 no Google, com mais de 450 avaliações.') + `
<div class="in"><section class="depo-longo"><div class="depo-lado"><p class="estrelas">★★★★★</p><p class="k">${depo.cirurgia}</p><h2>“Saí de lá com a certeza de que seria ela.”</h2><p class="autora">${depo.autora}</p><a class="google" href="https://www.google.com/maps/place/Dra+Telma+Ritter+Cirurgia+Pl%C3%A1stica/" target="_blank" rel="noopener"><b>5,0</b><span class="estrelas">★★★★★</span>Ver avaliações no Google</a></div><blockquote>${depo.todo.map(p => `<p>${p}</p>`).join('')}<footer>${depo.autora}</footer></blockquote></section>
<section class="bloco"><header class="tit"><p class="k">No Instagram</p><h2>O carinho das pacientes com a equipe</h2></header><ul class="comentarios">${['com1', 'com2', 'com3', 'com4', 'com5', 'com6'].map(c => `<li>${img(c, 'Comentário de paciente no Instagram')}</li>`).join('')}</ul></section></div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `WhatsApp ${E.waVer}. ${E.rua}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Será um prazer conversar com você', 'dra-sala', 'Se você tem alguma dúvida ou quer mais informações, estamos à disposição para ajudar.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Agende sua consulta</h2>${formulario()}</div><div><ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.waVer}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><a href="${E.mapa}" target="_blank" rel="noopener">${E.rua}</a><span>${E.bairro}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">@dratelmaritter</a></div></li>
  <li>${ic('usuarios')}<div><strong>Já é paciente?</strong><a href="${E.area}" target="_blank" rel="noopener">Área da paciente</a></div></li>
</ul>${mapa}</div></section></div>
` + rodape(v);
}

// ---------- A: Mármore (claro, blush e taupe do logo, delicada) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><img class="cta-flor" src="/assets/flor.svg" alt="" width="232" height="232"><div><h2>Vamos conversar sobre o seu sonho?</h2><p>Agende a sua consulta pelo WhatsApp ou pelo telefone ${E.fone}.</p></div><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a></p></div></section>`;
  const listaProcs = () => grupos.map(g => `<section class="grupo-a" id="${g.id}"><header class="grupo-tit"><img src="/assets/flor.svg" alt="" width="232" height="232"><h2>${g.t}</h2></header><div class="procs-a">${procs.filter(p => p.g === g.id).map(p => `<article class="proc-a sobe" id="${p.id}"><figure>${img(p.f, p.t)}</figure><div><h3>${p.t}</h3>${p.p.map(x => `<p>${x}</p>`).join('')}${orcar(p)}</div></article>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Cirurgia plástica · Brasília</p><h1>Todo o cuidado com você para que esteja sempre <em>bem com o espelho.</em></h1><p>Mamas, contorno corporal, face e cirurgia íntima com a Dra. Telma Ritter, cirurgiã plástica formada pela UnB, especialista pelo INCA e membro da SBCP desde 2002.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'especialidades')}">Ver especialidades</a></p></div>
<div class="hero-a-fotos"><figure class="hero-a-foto">${img('dra-coracao', 'Dra. Telma Ritter no centro cirúrgico', ' loading="eager" fetchpriority="high"')}</figure><figure class="hero-a-mini">${img('recepcao', 'Recepção do consultório', ' loading="eager"')}</figure><div class="selo-google"><b>5,0</b><span class="estrelas">★★★★★</span><small>+450 avaliações no Google</small></div><img class="flor-hero" src="/assets/flor.svg" alt="" width="232" height="232"></div></div></section>
<section class="numeros-a"><div class="in">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in esp-a"><header class="tit tit-linha"><div><p class="k">Especialidades</p><h2>Cirurgia plástica e cirurgia estética</h2></div><a class="link-seta" href="${link(v, 'especialidades')}">As 18 especialidades ${ic('seta')}</a></header><div class="grupos-a">${grupos.map(g => `<a class="grupo-card sobe" href="${link(v, 'especialidades')}#${g.id}"><figure>${img(g.f, g.t)}</figure><div><h3>${g.t}</h3><p>${g.d}</p><ul>${procs.filter(p => p.g === g.id).map(p => `<li>${p.t}</li>`).join('')}</ul></div></a>`).join('')}</div></section>
<section class="sobre-a"><div class="in sobre-a-in"><figure>${img('dra-sala', 'Dra. Telma Ritter em sua sala')}</figure><div><p class="k">Sobre mim</p><h2>“Juntas decidimos a melhor abordagem para você e o seu corpo.”</h2><p>${bio}</p><ol class="formacao">${formacao.slice(0, 4).map(f => `<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ol><a class="link-seta" href="${link(v, 'sobre')}">Formação completa e a equipe ${ic('seta')}</a></div></div></section>
<section class="in estr-a"><header class="tit tit-linha"><div><p class="k">Estrutura</p><h2>Um consultório com arte em cada sala</h2></div><a class="link-seta" href="${link(v, 'estrutura')}">Conheça a estrutura ${ic('seta')}</a></header><div class="estr-grade">${img('recepcao', 'Recepção')}${img('corredor', 'Corredor com estátua de Bruno Giorgi')}${img('pequenas-cirurgias', 'Sala de pequenas cirurgias')}${img('exame', 'Sala de exame')}</div></section>
<section class="depo-a"><div class="in depo-a-in"><img src="/assets/flor.svg" alt="" width="232" height="232"><blockquote><p>“${depo.curto}”</p><footer><b>${depo.autora}</b> · ${depo.cirurgia}</footer></blockquote><a class="link-seta" href="${link(v, 'depoimentos')}">Ler o depoimento completo ${ic('seta')}</a></div></section>
<section class="in equipe-a"><header class="tit"><p class="k">A equipe</p><h2>Quem cuida de você comigo</h2></header><div class="equipe equipe-mini">${equipe.map(p => `<a class="pessoa sobe" href="${link(v, 'sobre')}#equipe"><figure>${img(p.f, p.n)}</figure><h3>${p.n}</h3><p class="ap">${p.ap}</p></a>`).join('')}</div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, listaProcs);
  return pag;
}

// ---------- B: Galeria (escuro #3E3735 do logo, blush, como uma galeria de arte) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><h2>Vamos conversar sobre o seu sonho?</h2><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const listaProcs = () => grupos.map(g => `<section class="grupo-b" id="${g.id}"><header class="grupo-tit"><h2>${g.t}</h2><p>${g.d}</p></header><div class="procs">${procs.filter(p => p.g === g.id).map((p, i) => `<details class="proc sobe" id="${p.id}"${i === 0 ? ' open' : ''}><summary><span class="num">${String(procs.indexOf(p) + 1).padStart(2, '0')}</span><b>${p.t}</b>${ic('seta')}</summary><div class="proc-corpo"><figure>${img(p.f, p.t)}</figure><div>${p.p.map(x => `<p>${x}</p>`).join('')}${orcar(p)}</div></div></details>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b">${img('dra-sala', 'Dra. Telma Ritter em sua sala, com obras de arte', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><div><p class="k">Dra. Telma Ritter · Cirurgia plástica · Brasília</p><h1>Todo o cuidado com você para que esteja sempre bem com o espelho.</h1><p>Especialista em mamas, contorno corporal, reconstrução e rejuvenescimento facial. Membro da SBCP desde 2002.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'especialidades')}">Especialidades</a></p></div></div><p class="legenda-b">Minha sala · Asa Sul, Brasília</p></section>
<section class="numeros-b"><div class="in">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in esp-b"><header class="tit"><p class="k">Especialidades</p><h2>18 cirurgias, em quatro áreas</h2></header><div class="esp-b-grade">${grupos.map((g, i) => `<a class="quadro sobe" href="${link(v, 'especialidades')}#${g.id}"><figure>${img(g.f, g.t)}</figure><div class="etiqueta"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${g.t}</h3><p>${procs.filter(p => p.g === g.id).map(p => p.t).join(' · ')}</p></div></a>`).join('')}</div></section>
<section class="sobre-b"><div class="in sobre-b-in"><div><p class="k">Sobre mim</p><h2>Formada pela UnB, especialista pelo INCA, 1º lugar na prova da SBCP</h2><p class="lead">${bio}</p><ul class="membro">${membro.map(m => `<li>${m}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'sobre')}">Conheça minha formação ${ic('seta')}</a></div><div class="sobre-b-fotos">${img('dra-coracao', 'Dra. Telma Ritter')}${img('dra-cirurgia', 'Dra. Telma Ritter em cirurgia')}</div></div></section>
<section class="in estr-b"><header class="tit tit-linha"><div><p class="k">Estrutura</p><h2>Projeto de Stella Garcia, obras de arte em cada sala</h2></div><a class="link-seta" href="${link(v, 'estrutura')}">Conheça a estrutura ${ic('seta')}</a></header><div class="mosaico-b">${[['recepcao', 'A recepção'], ['corredor', 'Corredor de acessos'], ['curativos', 'Sala de curativos'], ['pequenas-cirurgias', 'Sala de pequenas cirurgias'], ['exame', 'Sala de exame']].map(s => `<figure>${img(s[0], s[1])}<figcaption>${s[1]}</figcaption></figure>`).join('')}</div></section>
<section class="depo-b"><div class="in depo-b-in"><p class="estrelas">★★★★★</p><blockquote><p>“${depo.curto}”</p><footer>${depo.autora} · ${depo.cirurgia}</footer></blockquote><a class="btn btn-linha" href="${link(v, 'depoimentos')}">Ler o depoimento completo</a></div></section>
<section class="in equipe-b"><header class="tit"><p class="k">A super equipe</p><h2>Flavinha, Tati, Dri e Pedro</h2></header><div class="equipe equipe-mini">${equipe.map(p => `<a class="pessoa sobe" href="${link(v, 'sobre')}#equipe"><figure>${img(p.f, p.n)}</figure><h3>${p.n}</h3><p class="ap">${p.ap}</p></a>`).join('')}</div></section>
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
  nome: 'Dra. Telma Ritter', artigo: 'da', url: E.url, lang: 'pt', cor: '#908780', fundo: '#3E3735', claro: '#fbf8f6',
  fonteTitulo: '"Cormorant Garamond",Georgia,serif', fonteTexto: 'Jost,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, nos tons blush e taupe do logo: a frase do site na abertura, as especialidades em quatro áreas e a Dra. Telma em destaque.', pontos: ['18 especialidades explicadas', 'Formação, equipe e estrutura do consultório', 'Consulta pelo WhatsApp em um toque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura e elegante como uma galeria de arte, inspirada nas obras do consultório: a Dra. Telma na sua sala na abertura.', pontos: ['Especialidades em sanfona, fáceis de ler', 'Tour 360° e galeria de fotos', 'Depoimento e nota 5,0 do Google'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
