// Dr. André Colaneri, cirurgião plástico em Uberlândia/MG (site cirurgiaestetica.com.br). Gera public/{a,b}/ e a página de escolha.
// node clientes/andrecolaneri/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs andrecolaneri https://www.cirurgiaestetica.com.br/)
// Textos: páginas do site atual (WordPress de 2017): home, clínica, currículo, 23 cirurgias (corporais, faciais, íntimas), depoimentos, contato.
// Fotos: retrato do Dr., Dr. no consultório, congresso ISAPS, capa do livro "Cirurgia Íntima" e a Clínica Dermac (Uberlândia), todas do site.
// Logo: "cirurgia estética" com o círculo verde, redesenhado em vetor. Os desenhos de traço (corpo, mama, rosto) do site também viraram vetor.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Dr. André Colaneri', url: 'https://andrecolaneri.overtus.com.br/', antigo: 'https://www.cirurgiaestetica.com.br/',
  wa: '5534997140335', waVer: '(34) 99714-0335', email: 'dr.andre@cirurgiaestetica.com.br',
  rua: 'Av. Nicomedes Alves dos Santos, 1500', bairro: 'Morada da Colina, Uberlândia/MG · CEP 38411-106', q: 'Avenida Nicomedes Alves dos Santos, 1500, Uberlândia MG',
  crm: 'CRM-MG 53648', insta: 'https://www.instagram.com/dr.andrecolaneri/', yt: 'https://www.youtube.com/channel/UCV2cXWpp2OZt8I6lrz6mNgw', face: 'https://www.facebook.com/drcolanericirurgiaplastica/',
};
export const nomesVersao = { a: 'Círculo', b: 'Mata' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;1,400&family=Source+Sans+3:wght@400;600;700&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const linha = (n, alt = '') => `<img class="linha" src="/assets/linha-${n}.svg" alt="${esc(alt)}" loading="lazy">`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#ffffff', b: '#12332d' };
const waMsg = (m = 'Olá! Vim pelo site e gostaria de agendar uma consulta com o Dr. André Colaneri.') => waHref(E.wa, m);

const nav = [{ slug: 'clinica', nome: 'Clínica' }, { slug: 'cirurgias', nome: 'Cirurgias plásticas' }, { slug: 'cirurgia-intima', nome: 'Cirurgia íntima' }, { slug: 'depoimentos', nome: 'Depoimentos' }, { slug: 'contato', nome: 'Fale conosco' }];
const curto = 'Cirurgia plástica estética em Uberlândia com o Dr. André Colaneri, membro titular da Sociedade Brasileira de Cirurgia Plástica e da ISAPS, autor do livro "Cirurgia Íntima".';
const intro = 'A procura pela qualidade de vida tem sido uma tônica na sociedade moderna. Além de viver muito, queremos viver bem. A cirurgia plástica estética pode nos auxiliar, por elevar nossa autoestima e melhorar nossa qualidade de vida.';
const formacao = [
  'Medicina pela Universidade Estadual de Campinas (UNICAMP), com o Prêmio Departamento de Cirurgia ao médico de maior destaque na área cirúrgica',
  'Residência em Cirurgia Geral pela UNICAMP',
  'Cirurgia Plástica pelo Instituto de Cirurgia Plástica Santa Cruz',
];
const titulos = [
  'Membro titular da Sociedade Brasileira de Cirurgia Plástica (SBCP)',
  'Membro da Sociedade Internacional de Cirurgia Estética (ISAPS)',
  'Especialista em cirurgia plástica reconhecido pelo CFM e pelo CRM',
  'Médico perito pela Sociedade Brasileira de Cirurgia Plástica',
  'Especialista certificado pelo Instituto Lipedema Brasil',
  'Membro da Associação Médica Brasileira e da Associação Paulista de Medicina',
];
const publicacoes = [
  'Autor do livro "Cirurgia Íntima: Plástica Genital Feminina", editora Elsevier, 2018',
  '"Nova classificação para hipertrofia dos pequenos lábios vaginais e correlação com as técnicas cirúrgicas indicadas", Revista Brasileira de Cirurgia Plástica, 2018',
  'Nove capítulos do livro "Cirurgia Plástica: Fundamentos e Arte" (Mélega, Medsi, 2002), entre eles ginecomastia, reconstrução mamária e complicações na cirurgia do abdome',
];
const grupos = [
  { id: 'corporais', t: 'Corporais', l: 'lipo', d: 'Contorno do corpo, mamas e abdome.' },
  { id: 'faciais', t: 'Faciais', l: 'face', d: 'Rejuvenescimento e harmonia do rosto.' },
  { id: 'intimas', t: 'Íntimas', l: 'intima', d: 'Especialidade do Dr. André, autor do livro "Cirurgia Íntima".' },
];
const P = (g, id, t, s, p, an, int) => ({ g, id, t, s, p, an, int });
const procs = [
  P('corporais', 'lipoaspiracao', 'Lipoaspiração', 'Gordura localizada', 'Reduz o volume de gordura em áreas localizadas e melhora o contorno corporal. Não é feita para perder peso: a maior mudança se dá na silhueta, e não na balança.', 'Local, local com sedação, peridural ou geral, conforme a área', 'De 12 a 24 horas'),
  P('corporais', 'lipoescultura', 'Lipoescultura', 'Contorno corporal', 'Parte da gordura aspirada é purificada, concentrada e enxertada em áreas que precisam de volume, como o glúteo e os sulcos da face.', 'Depende da área e do volume', 'De 12 a 24 horas'),
  P('corporais', 'protese-de-mama', 'Prótese de mama', 'Mamoplastia de aumento', 'Indicada para mamas pequenas ou que perderam volume após a amamentação, sem queda. Estudos extensos comprovaram que a prótese não traz prejuízo à saúde; a troca é estimada em torno de 20 anos.', 'Local com sedação, peridural ou geral', 'De 12 a 24 horas'),
  P('corporais', 'mamoplastia', 'Mamoplastia e mastopexia', 'Lifting das mamas', 'Suspende a mama e retira o excesso de pele e tecido mamário. Indicada para reduzir mamas volumosas e levantar mamas caídas, inclusive após a gravidez.', 'Geralmente geral', 'Geralmente 24 horas'),
  P('corporais', 'abdominoplastia', 'Abdominoplastia', 'Cirurgia do abdome', 'Retira o excesso de gordura e de pele do abdome, corrige a fraqueza dos músculos e as estrias, para uma cintura mais delicada e bem torneada.', 'Peridural ou geral', 'De 24 a 48 horas'),
  P('corporais', 'lipoabdominoplastia', 'Lipoabdominoplastia', 'Lipo e abdome juntos', 'Para quando há mais gordura do que flacidez: lipoaspiração, retirada da pele que sobra, plicatura dos músculos e um umbigo novo, mais bem posicionado.', 'Peridural ou geral', 'De 24 a 48 horas'),
  P('corporais', 'abdome-apos-emagrecimento', 'Abdome após grandes emagrecimentos', 'Dermolipectomia abdominal', 'Retira o "abdome em avental", a sobra de pele que fica abaixo do umbigo depois de uma grande perda de peso, e ajusta a cinta muscular.', 'Peridural ou geral', 'Entre 24 e 48 horas'),
  P('corporais', 'braco', 'Cirurgia de braço', 'Dermolipectomia braquial', 'Retira o excesso de pele flácida da parte de trás do braço, comum após emagrecimentos ou com a idade, para um contorno mais natural.', 'Local com sedação', 'Geralmente 12 horas'),
  P('corporais', 'protese-de-gluteo', 'Prótese de glúteo', 'Gluteoplastia', 'Aumenta e modela o bumbum com implante de silicone, para quem tem o glúteo pouco projetado ou perdeu volume com o tempo.', 'Raqui, peridural ou geral', 'Ao menos um dia'),
  P('corporais', 'protese-de-panturrilha', 'Prótese de panturrilha', 'Batata da perna', 'Aumenta a projeção da panturrilha e harmoniza o contorno das pernas em relação às coxas. A cicatriz fica na dobra de trás do joelho.', 'Geralmente peridural', 'De 12 a 24 horas'),
  P('corporais', 'ginecomastia', 'Ginecomastia', 'Mamas no homem', 'Corrige o aumento das mamas em homens, de origem glandular, gordurosa ou mista, que tira a autoestima de muitos.', 'Local com sedação ou geral', 'Conforme o caso'),
  P('corporais', 'reconstrucao-de-mama', 'Reconstrução de mama', 'Após a mastectomia', 'Reconstrução mamária com retalho do músculo reto abdominal (TRAM), feita normalmente em três tempos cirúrgicos.', 'Geral', 'Conforme o caso'),
  P('faciais', 'lifting-facial', 'Lifting facial', 'Ritidoplastia', 'Atua sobre os músculos e retira o excesso de pele da face, sem mudar os traços e expressões: o resultado é um rosto mais jovem e natural.', 'Local com sedação ou geral', 'De 12 a 24 horas'),
  P('faciais', 'mini-lifting', 'Mini lifting', 'Flacidez leve a moderada', 'Retira o excedente de pele para corrigir a flacidez facial em graus leve a moderado, atenuando rugas e melhorando o contorno do rosto.', 'Local com sedação ou geral', 'De 12 a 24 horas'),
  P('faciais', 'lifting-frontal', 'Lifting frontal', 'Testa e sobrancelhas', 'Reposiciona as sobrancelhas caídas e ameniza as rugas da testa, por pequenas incisões no couro cabeludo, inclusive por endoscopia.', 'Local com sedação', '12 horas'),
  P('faciais', 'blefaroplastia', 'Blefaroplastia', 'Cirurgia das pálpebras', 'Retira o excesso de pele e reduz as bolsas de gordura das pálpebras, devolvendo ao rosto um aspecto mais alegre e descansado.', 'Local, local com sedação ou geral', 'Até 12 horas'),
  P('faciais', 'otoplastia', 'Otoplastia', 'Orelha de abano', 'Forma a dobra da orelha e aproxima a orelha da cabeça, sem estigma de cirurgia. A idade ideal é a partir dos 6 anos.', 'Local com sedação ou geral', 'Até 12 horas'),
  P('faciais', 'mentoplastia', 'Mentoplastia', 'Cirurgia do queixo', 'Aumenta ou reduz o queixo, que junto com o nariz define o perfil do rosto. O caso mais comum é o queixo retraído, corrigido com implante ou avanço ósseo.', 'Local com sedação ou geral', 'Conforme o caso'),
  P('faciais', 'bichectomia', 'Bichectomia', 'Cirurgia das bochechas', 'Retira parte da bola de Bichat, a gordura das bochechas, para um rosto mais fino e harmônico.', 'Local', 'Sem internação'),
  P('intimas', 'ninfoplastia', 'Ninfoplastia', 'Redução dos pequenos lábios', 'Reduz os pequenos lábios vaginais aumentados, que causam incômodo com roupas justas, dor na relação e constrangimento. Pode ser feita a laser.', 'Local com sedação', 'Sem internação'),
  P('intimas', 'grandes-labios', 'Grandes lábios vaginais', 'Correção da flacidez', 'Reduz a flacidez e o excesso de pele dos grandes lábios, corrigindo o aspecto murcho e harmonizando a região genital.', 'Local com sedação', 'Sem internação'),
  P('intimas', 'monte-de-venus', 'Redução do monte de Vênus', 'Gordura pubiana', 'Retira o acúmulo de gordura logo acima da região genital, que não sai com dieta nem exercício. A volta ao trabalho pode ser após 3 dias.', 'Local, sedação ou peridural', 'Sem internação'),
  P('intimas', 'laser', 'O laser nas cirurgias íntimas', 'Recuperação mais rápida', 'O laser faz a incisão com menos trauma e menos sangramento, o que reduz o inchaço e a roxidão: a recuperação costuma ser mais rápida e confortável.', 'Conforme a cirurgia', 'Sem internação'),
];
const depos = [
  { n: 'C. G.', c: 'Munique, Alemanha', t: 'Marquei consulta com o Dr. André e mais 4 profissionais de São Paulo. De todas as consultas, digo sinceramente que o Dr. André foi a pessoa que mais me fez sentir segura. Um profissional sério, objetivo e muito atencioso.' },
  { n: 'L. C.', c: 'Portugal', t: 'A distância não foi uma barreira. As minhas muitas dúvidas foram esclarecidas e na consulta ainda senti mais segurança. A cirurgia correu muito bem e foi bem mais fácil do que eu imaginava.' },
  { n: 'M. C.', c: 'Pittsburgh, Estados Unidos', t: 'O Dr. André me transmitiu domínio de conhecimento, experiência e tranquilidade. Harmonizou meu nariz e a estética do meu rosto de maneira perfeita e equilibrada. Agora não tenho mais medo de fotografias.' },
  { n: 'R. M.', c: 'Paris, França', t: 'Os resultados da otoplastia ficaram bem acima das minhas expectativas e marcaram uma nova fase na minha vida. Vindo do estrangeiro para fazer a cirurgia, não poderia ter escolhido melhor equipe.' },
  { n: 'I. G.', c: 'Bassano del Grappa, Itália', t: 'Ele me passou muita seriedade, profissionalismo e confiança, e esclareceu todas as minhas dúvidas com muita atenção. Simplesmente adorei o resultado!' },
  { n: 'G. M. E.', c: 'Londres, Inglaterra', t: 'During my research I not only found Dr. André the most qualified surgeon, but also noticed him replying to all my questions. The whole procedure went without complications. I would recommend Dr. André at any time.' },
];

const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Dr. André Colaneri | Cirurgia Plástica Estética em Uberlândia' : `${titulo} | Dr. André Colaneri`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = claro => `<span class="marca-ac"><img src="/assets/logo${claro ? '-branco' : ''}.svg" alt="cirurgia estética" width="205" height="118"><span><b>Dr. André Colaneri</b><small>Cirurgia plástica · ${E.crm}</small></span></span>`;
const redes = () => `<p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span><span class="faixa-dir"><a href="${E.insta}" target="_blank" rel="noopener">${ic('insta')}@dr.andrecolaneri</a><a href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Dr. André Colaneri, página inicial">${marca(v === 'b')}</a>
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
    <div class="rod-marca">${marca(true)}<p>${curto}</p>${redes()}</div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Cirurgia Plástica Estética · Dr. André Colaneri · ${E.crm}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site e gostaria de agendar uma consulta com o Dr. André Colaneri." id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Cirurgia de interesse<select name="cirurgia">${procs.map(p => `<option>${p.t}</option>`).join('')}<option>Lipedema</option><option>Ainda não sei</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Conte o que você deseja, e de onde você é"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp do consultório. Atendemos também pacientes de outras cidades e do exterior.</p>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.q)}&z=15&output=embed"></iframe>`;
const agendar = p => `<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e gostaria de agendar uma avaliação de ${p.t.toLowerCase()} com o Dr. André Colaneri.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a>`;
const ficha = p => `<dl class="ficha"><div><dt>Anestesia</dt><dd>${p.an}</dd></div><div><dt>Internação</dt><dd>${p.int}</dd></div></dl>`;
const instalacoes = () => `<div class="galeria galeria-5">${[1, 2, 3, 4, 5].map(n => `<a href="/assets/img/dermac-${n}.webp" data-caixa="clinica">${img(`dermac-${n}`, 'Instalações da clínica em Uberlândia')}</a>`).join('')}</div>`;

function comum(v, pag, cab, cta, listaProcs) {
  pag.clinica = head(v, 'clinica', 'Clínica e currículo', curto) + topo(v, 'clinica') + cab('Clínica', 'Dr. André Gonçalves de Freitas Colaneri', 'dr-andre', `Cirurgião plástico · ${E.crm}`) + `
<div class="in"><section class="dr-pag"><figure>${img('dr-consultorio', 'Dr. André Colaneri no consultório')}</figure><div><p class="k">Formação médica</p><h2>Da UNICAMP ao Instituto Santa Cruz</h2>${lista(formacao)}<p class="k">Títulos e sociedades</p>${lista(titulos)}</div></section>
<section class="bloco livro"><figure>${img('livro', 'Livro Cirurgia Íntima, editora Elsevier')}</figure><div><p class="k">Publicações</p><h2>Autor do livro "Cirurgia Íntima"</h2><p>Referência nacional para o estudo das cirurgias íntimas: ninfoplastia, labioplastia, redução do monte de Vênus, flacidez dos grandes lábios e laser em cirurgia íntima.</p>${lista(publicacoes)}</div></section>
<section class="bloco congresso"><figure>${img('congresso-isaps', 'Dr. André Colaneri no 24º Congresso da ISAPS')}</figure><figure>${img('palestra', 'Dr. André Colaneri em palestra')}</figure></section>
<section class="bloco" id="instalacoes"><header class="tit"><p class="k">Uberlândia</p><h2>Instalações</h2><p>Para me aproximar mais de meus pacientes e oferecer um serviço de qualidade e cheio de cuidados, atendo na cidade de Uberlândia, em Minas Gerais.</p></header>${instalacoes()}</section></div>
` + cta() + rodape(v);
  pag.cirurgias = head(v, 'cirurgias', 'Cirurgias plásticas', 'Lipoaspiração, prótese de mama, mamoplastia, abdominoplastia, lifting facial, blefaroplastia, cirurgia íntima e mais, em Uberlândia.') + topo(v, 'cirurgias') + cab('Cirurgias plásticas', 'Mais do que uma questão estética', 'dr-consultorio', 'Mais do que viver muito, podemos viver bem conosco. Pequenas mudanças que fazem grandes diferenças.') + `
<div class="in"><nav class="grupos-nav" aria-label="Grupos">${grupos.map(g => `<a href="#${g.id}">${g.t}</a>`).join('')}<a href="https://lipedemaminas.com.br/" target="_blank" rel="noopener">Lipedema ${ic('seta')}</a></nav>${listaProcs(procs, grupos)}</div>
` + cta() + rodape(v);
  pag['cirurgia-intima'] = head(v, 'cirurgia-intima', 'Cirurgia íntima', 'Ninfoplastia, grandes lábios, monte de Vênus e laser com o Dr. André Colaneri, autor do livro Cirurgia Íntima.') + topo(v, 'cirurgia-intima') + cab('Cirurgia íntima', 'Especialidade do Dr. André Colaneri', 'congresso-isaps', 'Autor do livro "Cirurgia Íntima" (Elsevier) e de uma nova classificação para a hipertrofia dos pequenos lábios vaginais.') + `
<div class="in"><section class="intima-intro"><div><p class="k">Por que procurar</p><h2>Autoestima e conforto, sem constrangimento</h2><p class="lead">As cirurgias íntimas estão entre as cirurgias estéticas que mais crescem. Muitas mulheres sentem incômodo com roupas justas, dor ou vergonha na relação e constrangimento ao se trocar em vestiários.</p><p>O Dr. André é especialista em cirurgias íntimas e participou de congressos internacionais, como o 24º Congresso da ISAPS, apresentando sua classificação para a hipertrofia dos pequenos lábios.</p></div><figure class="livro-capa">${img('livro', 'Livro Cirurgia Íntima')}</figure></section>
${listaProcs(procs, grupos.filter(g => g.id === 'intimas'))}</div>
` + cta() + rodape(v);
  pag.depoimentos = head(v, 'depoimentos', 'Depoimentos', 'Depoimentos de pacientes do Dr. André Colaneri, muitos vindos do exterior.') + topo(v, 'depoimentos') + cab('Depoimentos', 'Pacientes de vários países confiaram no Dr. André', 'palestra', 'Alemanha, Portugal, Estados Unidos, França, Itália, Inglaterra e Canadá.') + `
<div class="in"><section class="bloco depos-pag">${depos.map(d => `<figure class="depo sobe"><blockquote><p>“${d.t}”</p></blockquote><figcaption><b>${d.n}</b><span>${ic('pin')}${d.c}</span></figcaption></figure>`).join('')}</section></div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Fale conosco', `WhatsApp ${E.waVer}. ${E.rua}, ${E.bairro}.`) + topo(v, 'contato') + cab('Fale conosco', 'Entre em contato', 'clinica-fachada', 'Para receber informações sobre os procedimentos e seus valores, envie sua mensagem.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2>${formulario()}</div><div><ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.waVer}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">@dr.andrecolaneri</a></div></li>
</ul>${mapa()}</div></section></div>
` + rodape(v);
}

// ---------- A: Círculo (branco, o círculo verde do logo como desenho, traços do site) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><span class="cta-circ" aria-hidden="true"></span><div><h2>Agende sua consulta</h2><p>Atendimento em Uberlândia, para pacientes de todo o Brasil e do exterior.</p></div><p class="bts"><a class="btn btn-claro" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a></p></div></section>`;
  const listaProcs = (lst, gs) => gs.map(g => `<section class="grupo-a" id="${g.id}"><header class="grupo-tit">${linha(g.l)}<div><h2>${g.t}</h2><p>${g.d}</p></div></header><div class="procs-a">${lst.filter(p => p.g === g.id).map(p => `<article class="proc-a sobe" id="${p.id}"><p class="k">${p.s}</p><h3>${p.t}</h3><p>${p.p}</p>${ficha(p)}${agendar(p)}</article>`).join('')}</div></section>`).join('');
  const destaques = [['lipo', 'lipoaspiracao', 'Lipoaspiração'], ['protese', 'protese-de-mama', 'Prótese de mama'], ['mamoplastia', 'mamoplastia', 'Mamoplastia e mastopexia'], ['intima', 'ninfoplastia', 'Cirurgia íntima'], ['nariz', 'mentoplastia', 'Perfil e queixo'], ['face', 'lifting-facial', 'Face e pálpebras']];
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Cirurgia plástica estética · Uberlândia</p><h1>Além de viver muito, queremos viver bem.</h1><p>Clínica especializada em cirurgia plástica estética com o Dr. André Colaneri, especialista pela Sociedade Brasileira de Cirurgia Plástica.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'cirurgias')}">Ver cirurgias</a></p></div>
<div class="hero-a-foto"><span class="circ" aria-hidden="true"></span>${img('dr-andre', 'Dr. André Colaneri', ' loading="eager" fetchpriority="high"')}<p class="hero-a-selo"><b>SBCP · ISAPS</b>Membro titular e internacional</p></div></div></section>
<section class="in proc-home-a"><header class="tit tit-linha"><div><p class="k">Cirurgias plásticas</p><h2>Clínica especializada em cirurgia plástica estética</h2></div><a class="link-seta" href="${link(v, 'cirurgias')}">Todas as ${procs.length} cirurgias ${ic('seta')}</a></header><div class="tracos">${destaques.map(([l, id, t]) => `<a class="traco sobe" href="${link(v, id === 'ninfoplastia' ? 'cirurgia-intima' : 'cirurgias')}#${id}">${linha(l, t)}<h3>${t}</h3></a>`).join('')}</div></section>
<section class="intro-a"><div class="in intro-a-in"><figure>${img('dr-consultorio', 'Dr. André Colaneri no consultório')}</figure><div><p class="k">Dr. André G. de Freitas Colaneri</p><h2>Formado pela UNICAMP, membro da SBCP e da ISAPS</h2><p>${intro}</p>${lista(['Prêmio Departamento de Cirurgia na formatura da UNICAMP', 'Cirurgia plástica pelo Instituto Santa Cruz', 'Especialista certificado pelo Instituto Lipedema Brasil'])}<a class="link-seta" href="${link(v, 'clinica')}">Currículo completo ${ic('seta')}</a></div></div></section>
<section class="in livro-a"><div><p class="k">Cirurgia íntima</p><h2>Autor do livro de referência nacional</h2><p>O Dr. André é autor de "Cirurgia Íntima: Plástica Genital Feminina" (Elsevier) e apresentou no 24º Congresso da ISAPS uma nova classificação para a hipertrofia dos pequenos lábios vaginais.</p><a class="btn btn-linha" href="${link(v, 'cirurgia-intima')}">Conheça a cirurgia íntima</a></div><figure class="livro-capa">${img('livro', 'Livro Cirurgia Íntima')}</figure><figure>${img('congresso-isaps', 'Dr. André Colaneri no congresso da ISAPS')}</figure></section>
<section class="depo-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Depoimentos</p><h2>Pacientes que vieram de longe</h2></div><a class="link-seta" href="${link(v, 'depoimentos')}">Todos os depoimentos ${ic('seta')}</a></header><div class="depos-a">${depos.slice(0, 3).map(d => `<figure class="sobe"><blockquote><p>“${d.t}”</p></blockquote><figcaption><b>${d.n}</b>${d.c}</figcaption></figure>`).join('')}</div></div></section>
<section class="in local-a"><div><p class="k">A clínica</p><h2>Morada da Colina, Uberlândia</h2><p>${E.rua}<br>${E.bairro}</p>${instalacoes()}</div>${mapa()}</section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, listaProcs);
  return pag;
}

// ---------- B: Mata (verde-escuro, retrato em destaque, sanfona de cirurgias) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><h2>Agende sua consulta</h2><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a><a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')}E-mail</a></p></div></section>`;
  const listaProcs = (lst, gs) => gs.map(g => `<section class="grupo-b" id="${g.id}"><header class="grupo-tit">${linha(g.l)}<div><h2>${g.t}</h2><p>${g.d}</p></div></header><div class="procs">${lst.filter(p => p.g === g.id).map((p, i) => `<details class="proc sobe" id="${p.id}"${i === 0 ? ' open' : ''}><summary><b>${p.t}</b><small>${p.s}</small>${ic('seta')}</summary><div class="proc-corpo"><p>${p.p}</p>${ficha(p)}${agendar(p)}</div></details>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Dr. André Colaneri · ${E.crm}</p><h1>Cirurgia plástica estética, com quem escreveu o livro.</h1><p>Membro titular da Sociedade Brasileira de Cirurgia Plástica e da ISAPS, autor de "Cirurgia Íntima" (Elsevier). Em Uberlândia, para pacientes de todo o Brasil e do exterior.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'cirurgias')}">Cirurgias</a></p></div><figure class="hero-b-foto">${img('dr-andre', 'Dr. André Colaneri', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="numeros-b"><div class="in"><div><b>${procs.length}</b><span>cirurgias plásticas</span></div><div><b>SBCP</b><span>membro titular</span></div><div><b>ISAPS</b><span>sociedade internacional</span></div><div><b>7 países</b><span>de onde vieram pacientes</span></div></div></section>
<section class="in grupos-home-b"><header class="tit"><p class="k">Cirurgias plásticas</p><h2>Corporais, faciais e íntimas</h2></header><div class="grupos-b">${grupos.map(g => `<a class="grupo-card-b sobe" href="${link(v, g.id === 'intimas' ? 'cirurgia-intima' : 'cirurgias')}#${g.id}">${linha(g.l, g.t)}<h3>${g.t}</h3><p>${g.d}</p><ul>${procs.filter(p => p.g === g.id).slice(0, 6).map(p => `<li>${p.t}</li>`).join('')}</ul><span class="link-seta">Ver todas ${ic('seta')}</span></a>`).join('')}</div></section>
<section class="livro-b"><div class="in livro-b-in"><figure class="livro-capa">${img('livro', 'Livro Cirurgia Íntima')}</figure><div><p class="k">Cirurgia íntima</p><h2>"Cirurgia Íntima: Plástica Genital Feminina"</h2><p>Referência nacional para o estudo da ninfoplastia, labioplastia, redução do monte de Vênus e do laser em cirurgia íntima, publicado pela Elsevier em 2018.</p><a class="link-seta" href="${link(v, 'cirurgia-intima')}">Cirurgia íntima ${ic('seta')}</a></div><figure class="livro-foto">${img('palestra', 'Dr. André Colaneri em palestra')}</figure></div></section>
<section class="in depo-b"><header class="tit"><p class="k">Depoimentos</p><h2>Pacientes de vários países</h2></header><div class="depos-b">${depos.slice(0, 4).map(d => `<figure class="sobe"><blockquote><p>“${d.t}”</p></blockquote><figcaption>${d.n} · ${d.c}</figcaption></figure>`).join('')}</div><a class="link-seta" href="${link(v, 'depoimentos')}">Ler todos ${ic('seta')}</a></section>
<section class="local-b"><div class="in local-b-in"><div><p class="k">Uberlândia</p><h2>A clínica</h2><p>${E.rua}<br>${E.bairro}</p><p><a class="link-seta" href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer} ${ic('seta')}</a></p></div>${instalacoes()}</div></section>
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
  nome: 'Dr. André Colaneri', artigo: 'do', url: E.url, lang: 'pt', cor: '#26987f', fundo: '#12332d', claro: '#ffffff',
  fonteTitulo: 'Alegreya,Georgia,serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Branca, com o círculo verde do logo e os desenhos de traço do site atual, agora em vetor.', pontos: [`${procs.length} cirurgias com anestesia e internação`, 'Livro "Cirurgia Íntima" em destaque', 'Depoimentos de pacientes do exterior'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Verde-escura e sóbria, com o retrato do Dr. André e as cirurgias em sanfona por grupo.', pontos: ['Corporais, faciais e íntimas', 'Currículo e publicações completos', 'Instalações da clínica em Uberlândia'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
