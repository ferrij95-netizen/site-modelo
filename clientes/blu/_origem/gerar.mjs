// Clínica Blu Odontologia (Brasília/DF, Conjunto Nacional). Gera public/{a,b}/ e a página de escolha.
// node clientes/blu/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs blu https://www.clinicablu.com.br/)
// Textos: páginas do site atual (WordPress/Elementor, 2025): início, implantes e facetas. Fotos: biblioteca de mídia do site
// e quadros do vídeo "Conheça a Clínica Blu" (legendas cortadas). Logo redesenhado em vetor a partir do PNG do site.
// O link de e-mail do site atual está vazio: o contato é por WhatsApp (61) 98341-3338 e telefone (61) 3326-9940.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Clínica Blu Odontologia', url: 'https://blu.overtus.com.br/', antigo: 'https://www.clinicablu.com.br/',
  fone: '(61) 3326-9940', wa: '5561983413338', waVer: '(61) 98341-3338',
  rua: 'SDN, Conjunto Nacional, Sala 4017, Torre Verde', bairro: 'Asa Norte', cidade: 'Brasília - DF', horario: 'Segunda a sexta, das 8h às 18h',
  insta: 'https://www.instagram.com/clinicablu/', face: 'https://www.facebook.com/clinicablu/', yt: 'https://www.youtube.com/channel/UCE861PMv6FrhPZx7klcBAeA',
};
export const nomesVersao = { a: 'Água', b: 'Conjunto Nacional' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Inter:wght@400;500;600&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#ffffff', b: '#06222d' };
const waMsg = (m = 'Olá! Estava no site da Blu e gostaria de marcar uma avaliação!') => waHref(E.wa, m);

// ---------- conteúdo (do site atual) ----------
const nav = [{ slug: 'clinica', nome: 'A clínica' }, { slug: 'tratamentos', nome: 'Tratamentos' }, { slug: 'implantes', nome: 'Implantes' }, { slug: 'facetas', nome: 'Facetas' }, { slug: 'contato', nome: 'Contato' }];
const curto = 'Clínica odontológica no Conjunto Nacional, no coração de Brasília: implantes, facetas e todas as especialidades num só lugar.';
const sobre = [
  'Na Clínica Blu, acreditamos que cada sorriso tem o poder de transformar a vida de uma pessoa. Por isso, estamos aqui para proporcionar a você uma experiência única e segura em cuidados odontológicos, com uma equipe de dentistas altamente qualificados.',
  'Aqui, nós sabemos que um sorriso saudável é muito mais do que estética: é parte essencial do bem-estar e da autoestima dos nossos pacientes. Desde a nossa fundação, temos o compromisso de oferecer um atendimento odontológico de excelência, com profissionais altamente qualificados e um ambiente acolhedor.',
  'Nossa missão é proporcionar cuidados personalizados que atendem às necessidades únicas de cada paciente, com o máximo de conforto, segurança e confiança.',
];
const valores = ['Entendimento', 'Eficiência', 'Transparência'];
const especialidades = [
  { i: 'escudo', t: 'Clínico geral', d: 'Atendimento preventivo e diagnóstico para manter seu sorriso saudável e livre de problemas.', m: 'realizar um tratamento' },
  { i: 'dente', t: 'Implantodontia', d: 'Colocação de implantes dentários para recuperar dentes perdidos, com resultados duradouros.', s: 'implantes', m: 'marcar uma avaliação de implantodontia' },
  { i: 'estrela', t: 'Facetas e estética', d: 'Lâminas de porcelana ou resina para corrigir dentes manchados, desgastados ou desalinhados.', s: 'facetas', m: 'marcar uma avaliação de facetas' },
  { i: 'gota', t: 'Endodontia', d: 'Tratamento de canais para salvar dentes comprometidos e restaurar sua função.', m: 'realizar um tratamento de endodontia' },
  { i: 'coracao', t: 'Periodontia', d: 'Cuidado das gengivas e dos tecidos ao redor dos dentes para prevenir doenças periodontais.', m: 'realizar um tratamento de periodontia' },
  { i: 'usuarios', t: 'Odontopediatria', d: 'Atendimento odontológico especializado para crianças, garantindo sorrisos saudáveis desde cedo.', m: 'marcar uma avaliação para meu pequeno' },
  { i: 'engrenagem', t: 'Ortodontia', d: 'Correção de dentes e mandíbulas desalinhados, para um sorriso mais bonito e funcional.', m: 'marcar uma avaliação de ortodontia' },
];
const porque = [
  { t: 'Profissionais especializados', d: 'Dentistas com anos de experiência, prontos para lidar com qualquer situação.' },
  { t: 'Tecnologia de ponta', d: 'Equipamentos modernos para tratamentos rápidos e eficazes.' },
  { t: 'Atendimento personalizado', d: 'Cada paciente é único, e seu tratamento também será.' },
  { t: 'Resultados comprovados', d: 'Transformação com tratamentos modernos e eficientes.' },
];
const espaco = [['recepcao', 'Recepção'], ['parede-video', 'Entrada da clínica'], ['blublioteca', 'Blublioteca, o cantinho de leitura'], ['cadeiras', 'Sala de espera'], ['consultorio-2', 'Consultório'], ['cha', 'Chás para os pacientes'], ['caneca', 'Café na recepção'], ['filtro', 'Água e café à vontade']];
const convenios = [['e-vida', 'E-Vida'], ['pro-ser', 'Pró-Ser (STJ e CJF)'], ['assefaz', 'Fundação Assefaz'], ['banco-central', 'Banco Central do Brasil'], ['apex', 'ApexBrasil'], ['stf-med', 'STF-Med'], ['plan-assiste', 'Plan-Assiste (MPU)'], ['stj', 'Superior Tribunal de Justiça'], ['trf1', 'TRF-1'], ['jf', 'Justiça Federal']];
const avaliacoes = [
  { n: 'Jéssica Gomes', d: '17/06/2025', q: 'Atendimento impecável! Desde o agendamento até o pós-tratamento, todos da clínica são extremamente educados e atenciosos! Os dentistas são incríveis! Recomendo de olhos fechados.' },
  { n: 'Mônica Canêdo', d: '31/05/2025', q: 'Simplesmente a melhor clínica de Brasília, atendimento humanizado e equipe nota 10. Eu e minha mãe somos pacientes há anos e não troco o Dr. Raimundo por nada!' },
  { n: 'Claudia Maria da Silva', d: '01/06/2025', q: 'Ótimo atendimento, sempre recomendo a Blu para as pessoas que conheço. Parabéns para toda a equipe!' },
  { n: 'Maria do Rosário', d: '01/06/2025', q: 'Gosto muito dos profissionais, são muito atenciosos e cuidadosos. A Dra. Alyne é um amor.' },
  { n: 'Lucas Lins', d: '03/06/2025', q: 'Excelente atendimento do Dr. Raimundo.' },
];
const pacientes = ['paciente-1', 'paciente-2', 'paciente-3', 'paciente-4'];
const implantes = {
  intro: 'Na Blu, entendemos que um sorriso vai além da estética. Ele devolve autoestima, liberdade e qualidade de vida. Nossa equipe é formada por especialistas em implantes, que utilizam tecnologia de ponta para garantir conforto e resultados duradouros.',
  marcas: 'O tratamento com implantes é mais simples do que parece. Com a tecnologia que usamos, o procedimento é rápido e seguro. Trabalhamos com duas das melhores marcas de implantes do mundo: Neodent e Straumann.',
  pontos: ['Equipe especializada em implantes e reabilitação oral', 'Tecnologia avançada: anestesia geral e cirurgia guiada', 'Atendimento com atenção refinada e personalizado', 'Avaliação completa e condições facilitadas de pagamento'],
  etapas: [
    { t: 'Avaliação e planejamento', d: 'Consulta completa com escaneamento digital e análise detalhada. Seu sorriso é planejado em cada detalhe.' },
    { t: 'Cirurgia guiada', d: 'O implante é colocado com anestesia geral, de forma rápida e minimamente invasiva. A cirurgia guiada aumenta a precisão e reduz o desconforto.' },
    { t: 'Prótese provisória', d: 'Em alguns casos, você já sai com um dente provisório fixo no mesmo dia, para não ficar sem sorrir durante a cicatrização.' },
    { t: 'Cicatrização', d: 'Durante algumas semanas o implante se integra ao osso, com a equipe acompanhando de perto a sua recuperação.' },
    { t: 'Prótese definitiva', d: 'Um novo dente fixo, natural e resistente, pronto para sorrir, mastigar e transformar seu dia a dia.' },
  ],
  paraQuem: ['Perdeu um ou mais dentes e quer recuperar o sorriso', 'Usa dentadura e sente desconforto ao mastigar', 'Já tentou outros tratamentos e quer uma solução definitiva', 'Quer parar de esconder o sorriso nas fotos'],
};
const facetas = {
  intro: 'As facetas dentárias são finas lâminas de porcelana ou resina aplicadas sobre os dentes para corrigir imperfeições, como dentes manchados, desgastados ou desalinhados. O tratamento é rápido, pouco invasivo e oferece resultados imediatos, com um sorriso mais harmonioso e natural.',
  blu: 'Na Clínica Blu, usamos materiais de alta qualidade e técnicas avançadas para que as facetas se adaptem perfeitamente aos seus dentes, respeitando a sua anatomia dental. Você escolhe a cor, para garantir naturalidade.',
  beneficios: ['Corrige dentes manchados, desgastados e desalinhados', 'Aumenta a confiança e a autoestima, e acaba com o medo de sorrir', 'Resultados rápidos, efetivos, duradouros e com aspecto natural', 'Procedimento minimamente invasivo e seguro'],
  etapas: [
    { t: 'Consulta e avaliação', d: 'O dentista avalia sua saúde bucal e conversa sobre suas expectativas para definir o melhor plano.' },
    { t: 'Planejamento do sorriso', d: 'Planejamento digital e preparo de uma pequena camada do esmalte para ajustar as facetas.' },
    { t: 'Facetas sob medida', d: 'Feitas com a cor escolhida por você e uma forma que respeita o formato do seu rosto.' },
    { t: 'Aplicação', d: 'As facetas são aplicadas com precisão, para um sorriso alinhado, natural e confortável.' },
    { t: 'Acompanhamento', d: 'Sorriso transformado na hora, com acompanhamento para garantir um resultado duradouro.' },
  ],
  paraQuem: [
    ['Dentes manchados ou descoloridos', 'Se o clareamento não deu o resultado esperado, as facetas oferecem um sorriso mais branco e duradouro.'],
    ['Dentes desgastados ou danificados', 'Restauram pequenas falhas, fraturas ou desgaste excessivo, devolvendo estética e função.'],
    ['Dentes tortos ou com espaços', 'Corrigem desalinhamentos de forma estética, sem aparelho ortodôntico.'],
    ['Quem quer um sorriso perfeito', 'Uma transformação rápida e efetiva, com harmonia e equilíbrio no sorriso.'],
  ],
};
const compromisso = { t: 'Confiança e compromisso com o seu sorriso', d: 'Transformar um sorriso vai muito além da técnica. Envolve respeito, escuta e um plano sob medida para cada paciente. Sem promessas milagrosas, sem soluções apressadas: apenas comprometimento com a sua saúde bucal e qualidade de vida.', l: ['Do diagnóstico ao pós-tratamento', 'Do planejamento à entrega do trabalho definitivo', 'Com transparência em cada decisão'] };

// ---------- partes comuns ----------
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Dentista no Conjunto Nacional, Brasília` : `${titulo} | Clínica Blu`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = claro => `<img class="logo" src="/assets/marca${claro ? '-clara' : ''}.svg" alt="Blu Odontologia" width="2210" height="1634">`;
function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}Conjunto Nacional, Torre Verde, sala 4017 · Asa Norte</span><span class="faixa-dir">${ic('relogio')}8h às 18h<a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Clínica Blu, página inicial">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar</a>
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
    <div class="rod-marca">${marca(true)}<p>${curto}</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Onde estamos</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
      <li>${ic('relogio')}<span>${E.horario}</span></li>
    </ul><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></p></div>
  </div>
  <div class="rod-base"><div class="in"><span>© 2009 – ${new Date().getFullYear()} Clínica Blu Odontologia. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Estava no site da Blu e gostaria de marcar uma avaliação!" id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Tratamento<select name="tratamento">${especialidades.map(e => `<option>${e.t}</option>`).join('')}<option>Ainda não sei</option></select></label><label>Convênio<select name="convenio"><option>Particular</option>${convenios.map(c => `<option>${c[1]}</option>`).join('')}</select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Conte o que você precisa e o melhor dia e horário"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp da clínica. Se preferir, ligue: ${E.fone}.</p>
</form>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Clínica Blu" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Conjunto Nacional Brasília Torre Verde')}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.waVer}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">@clinicablu</a></div></li>
</ul>`;
const etapas = arr => `<ol class="etapas">${arr.map((e, i) => `<li class="sobe"><span class="n">${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>`;
const convLogos = () => `<ul class="conv-logos">${convenios.map(c => `<li><img src="/assets/img/conv/${c[0]}.webp" alt="${esc(c[1])}" title="${esc(c[1])}" loading="lazy"></li>`).join('')}</ul>`;
const depos = (n = 4) => `<div class="depos">${avaliacoes.slice(0, n).map(x => `<figure class="depo sobe"><span class="estrelas" aria-label="5 estrelas">★★★★★</span><blockquote><p>${x.q}</p></blockquote><figcaption>${x.n}<small>Google · ${x.d}</small></figcaption></figure>`).join('')}</div>`;
const galeria = (arr) => `<ul class="galeria">${arr.map(e => `<li><a href="/assets/img/${e[0]}.webp" data-foto="${esc(e[1])}">${img(e[0], e[1])}</a></li>`).join('')}</ul>`;
const fotoPacientes = () => `<ul class="pacientes">${pacientes.map(p => `<li>${img(p, 'Paciente da Clínica Blu')}</li>`).join('')}</ul>`;

function comum(v, pag, cab, cta, cartoes) {
  pag.clinica = head(v, 'clinica', 'A clínica', sobre[0]) + topo(v, 'clinica') + cab('A clínica Blu', 'Conheça a clínica que cuida de você', 'parede-video', 'No Conjunto Nacional, no coração de Brasília. Uma clínica integrada, do atendimento básico e da prevenção à implantodontia.') + `
<div class="in"><section class="texto-pag"><div><p class="lead">${sobre[0]}</p>${sobre.slice(1).map(p => `<p>${p}</p>`).join('')}</div><aside class="caixa"><h3>Nossos valores</h3><ul class="valores">${valores.map(x => `<li>${x}</li>`).join('')}</ul><p>Dr. Raimundo Pacífico, CEO da Clínica Blu.</p>${img('dr-raimundo', 'Dr. Raimundo Pacífico')}</aside></section>
<section class="bloco"><header class="tit"><p class="k">Por que escolher a Blu</p><h2>O porquê a Blu é a melhor para você</h2></header><ul class="porque">${porque.map((p, i) => `<li class="sobe"><span class="n">0${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ul></section>
<section class="bloco"><header class="tit"><p class="k">Por dentro</p><h2>Um espaço pensado no seu conforto</h2></header>${galeria(espaco)}</section>
<section class="bloco"><header class="tit"><p class="k">Avaliações no Google</p><h2>Quem passou por aqui recomenda</h2></header>${depos(4)}</section></div>
` + cta() + rodape(v);

  pag.tratamentos = head(v, 'tratamentos', 'Tratamentos', 'Clínico geral, implantodontia, facetas, endodontia, periodontia, odontopediatria e ortodontia em Brasília.') + topo(v, 'tratamentos') + cab('Tratamentos', 'Especialistas dedicados para o que você precisar', 'dr-raimundo-paciente', 'Uma clínica integrada: da prevenção à reabilitação, todas as especialidades no mesmo lugar.') + `
<div class="in"><section class="bloco bloco-topo">${cartoes()}</section>
<section class="bloco"><header class="tit"><p class="k">Convênios</p><h2>Aceitamos os seguintes convênios</h2><p>Você que usufrui dos convênios abaixo também pode ter uma experiência diferenciada na Blu.</p></header>${convLogos()}</section></div>
` + cta() + rodape(v);

  const pagTrat = (slug, titulo, k, h1, foto, desc, corpo) => head(v, slug, titulo, desc) + topo(v, slug) + cab(k, h1, foto, desc) + `<div class="in">${corpo}</div>` + cta() + rodape(v);
  pag.implantes = pagTrat('implantes', 'Implantes dentários', 'Implantes dentários', 'As melhores soluções em implantes de Brasília', 'protese', 'Os melhores especialistas em implantes e o atendimento humanizado e eficiente que você merece.', `
<section class="texto-pag"><div><h2>Por que a Clínica Blu?</h2><p class="lead">${implantes.intro}</p>${lista(implantes.pontos)}</div><aside class="caixa"><h3>Neodent e Straumann</h3><p>${implantes.marcas}</p><a class="btn" href="${waMsg('Olá! Estava no site e tenho interesse em marcar uma avaliação de implantodontia!')}" target="_blank" rel="noopener">${icWa()}Agendar avaliação</a></aside></section>
<section class="bloco"><header class="tit"><p class="k">Como funciona</p><h2>O tratamento com implantes, passo a passo</h2></header>${etapas(implantes.etapas)}</section>
<section class="bloco duas-col"><div><p class="k">Para quem é</p><h2>Indicado para você que:</h2>${lista(implantes.paraQuem)}</div><figure class="foto-alta">${img('cirurgia', 'Cirurgia de implante')}</figure></section>
<section class="bloco"><header class="tit"><p class="k">Quem já fez com a Blu</p><h2>O sorriso transforma</h2><p>Sorrisos transformados, pessoas confiantes, vidas mudadas.</p></header>${fotoPacientes()}</section>
<section class="bloco compromisso"><div><h2>${compromisso.t}</h2><p>${compromisso.d}</p></div>${lista(compromisso.l)}</section>`);

  pag.facetas = pagTrat('facetas', 'Facetas dentárias', 'Facetas dentárias', 'Transforme seu sorriso com as facetas dentárias', 'facetas-cor', 'Alinhamento, cor escolhida por você e naturalidade: qualidades que só as facetas proporcionam.', `
<section class="texto-pag"><div><h2>O que são facetas dentárias?</h2><p class="lead">${facetas.intro}</p><p>${facetas.blu}</p></div><aside class="caixa"><h3>Benefícios</h3>${lista(facetas.beneficios)}</aside></section>
<section class="bloco"><header class="tit"><p class="k">Como funciona</p><h2>Simples, rápido e eficaz</h2></header>${etapas(facetas.etapas)}</section>
<section class="bloco"><header class="tit"><p class="k">Para quem é</p><h2>Indicado para você que tem:</h2></header><ul class="para-quem">${facetas.paraQuem.map(p => `<li class="sobe"><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ul></section>
<section class="bloco duas-col"><figure class="foto-alta">${img('sorriso-2', 'Sorriso com facetas')}</figure><div><h2>${compromisso.t}</h2><p>${compromisso.d}</p>${lista(compromisso.l)}<a class="btn" href="${waMsg('Olá! Estava no site e tenho interesse em facetas dentárias!')}" target="_blank" rel="noopener">${icWa()}Quero transformar meu sorriso</a></div></section>`);

  pag.contato = head(v, 'contato', 'Contato', `WhatsApp ${E.waVer}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + cab('Contato', 'Seu novo sorriso começa aqui', 'recepcao', 'Agende sua avaliação gratuita e descubra como podemos devolver a confiança e a estética do seu sorriso.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Agende sua avaliação</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section>
<section class="bloco"><header class="tit"><p class="k">Convênios</p><h2>Atendemos pelos convênios</h2></header>${convLogos()}</section></div>
` + rodape(v);
}

// ---------- A: Água (clara, azul #06A3DA do logo, cantos redondos como as letras) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><div><h2>Seu novo sorriso começa aqui!</h2><p>A transformação que você merece está a um clique: agende sua avaliação gratuita.</p></div><p class="bts"><a class="btn btn-claro" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Quero transformar meu sorriso</a></p></div></section>`;
  const cartoes = () => `<div class="espec-a">${especialidades.map(e => `<a class="espec sobe" href="${e.s ? link(v, e.s) : waMsg(`Olá! Estava no site e tenho interesse em ${e.m}!`)}"${e.s ? '' : ' target="_blank" rel="noopener"'}><span class="ico">${ic(e.i)}</span><h3>${e.t}</h3><p>${e.d}</p><span class="link-seta">${e.s ? 'Saiba mais' : 'Agendar'} ${ic('seta')}</span></a>`).join('')}<a class="mais sobe" href="${waMsg('Olá! Estava no site e tenho interesse em realizar um tratamento!')}" target="_blank" rel="noopener"><b>...e muito mais!</b><span>Fale com a gente pelo WhatsApp ${ic('seta')}</span></a></div>`;
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Clínica Blu · Conjunto Nacional, Brasília</p><h1>Transforme seu sorriso com a Blu!</h1><p>${sobre[0]}</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar avaliação gratuita</a><a class="btn btn-linha" href="${link(v, 'tratamentos')}">Ver tratamentos</a></p></div>
<div class="hero-a-foto"><figure class="bolha">${img('sorriso-1', 'Paciente sorrindo', ' loading="eager" fetchpriority="high"')}</figure><figure class="selo">${img('parede-logo-2', 'Logo da Blu na entrada da clínica', ' loading="eager"')}</figure><p class="nota"><span class="estrelas">★★★★★</span>Avaliações no Google</p></div></div></section>
<section class="in espec-sec"><header class="tit tit-linha"><div><p class="k">Tratamentos odontológicos de alta qualidade</p><h2>Especialistas dedicados para o que você precisar</h2></div><a class="link-seta" href="${link(v, 'tratamentos')}">Todos os tratamentos ${ic('seta')}</a></header>${cartoes()}</section>
<section class="duo-a"><div class="in duo-in"><a class="duo sobe" href="${link(v, 'implantes')}">${img('protese', 'Prótese sobre implantes')}<div><p class="k">Implantes dentários</p><h2>As melhores soluções em implantes de Brasília</h2><p>Neodent e Straumann, anestesia geral e cirurgia guiada.</p><span class="link-seta">Como funciona ${ic('seta')}</span></div></a><a class="duo sobe" href="${link(v, 'facetas')}">${img('facetas-cor', 'Escala de cores das facetas')}<div><p class="k">Facetas dentárias</p><h2>Alinhamento perfeito e a cor que você escolher</h2><p>Porcelana ou resina, sob medida para o seu sorriso.</p><span class="link-seta">Saiba mais ${ic('seta')}</span></div></a></div></section>
<section class="in sobre-a"><div class="sobre-a-fotos">${img('recepcao', 'Recepção da Clínica Blu')}${img('dr-raimundo', 'Dr. Raimundo Pacífico, CEO da Clínica Blu')}</div><div><p class="k">A clínica Blu: quem somos nós?</p><h2>Conheça a clínica que cuida de você</h2><p>${sobre[1]}</p><p>${sobre[2]}</p><ul class="porque-mini">${porque.map(p => `<li>${ic('check')}<div><b>${p.t}</b><span>${p.d}</span></div></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'clinica')}">Conheça a clínica ${ic('seta')}</a></div></section>
<section class="espaco-a"><div class="in"><header class="tit"><p class="k">A Blu por dentro</p><h2>Conheça nosso espaço, pensado no seu conforto</h2></header>${galeria(espaco.slice(0, 4))}</div></section>
<section class="in conv-a"><div><p class="k">Convênios</p><h2>Aceitamos os seguintes convênios</h2><p>Você que usufrui dos convênios abaixo também pode ter uma experiência diferenciada na Blu.</p></div>${convLogos()}</section>
<section class="depo-sec-a"><div class="in"><header class="tit"><p class="k">Nossas avaliações</p><h2>Pessoas que saíram da Blu com um belo sorriso</h2></header>${depos(4)}</div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, cartoes);
  return pag;
}

// ---------- B: Conjunto Nacional (escuro petróleo #003B50 com a madeira e o mármore da clínica) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><div><h2>Agende sua avaliação gratuita</h2><p>${E.rua}, ${E.bairro}</p></div><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const cartoes = () => `<ol class="espec-b">${especialidades.map((e, i) => `<li class="sobe"><a href="${e.s ? link(v, e.s) : waMsg(`Olá! Estava no site e tenho interesse em ${e.m}!`)}"${e.s ? '' : ' target="_blank" rel="noopener"'}><span class="num">${String(i + 1).padStart(2, '0')}</span><div><h3>${e.t}</h3><p>${e.d}</p></div>${ic('seta')}</a></li>`).join('')}</ol>`;
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b"><video autoplay muted loop playsinline poster="/assets/img/brasilia.webp" aria-hidden="true"><source src="/assets/brasilia.mp4" type="video/mp4"></video><div class="in hero-b-in"><p class="k">Localizada no coração de Brasília · Shopping Conjunto Nacional</p><h1>Blu, mais que uma clínica.</h1><p>Cuidados odontológicos de alta qualidade, do atendimento básico e da prevenção à implantodontia, com uma equipe de dentistas altamente qualificados.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar avaliação gratuita</a><a class="btn btn-linha" href="${link(v, 'clinica')}">Conheça a clínica</a></p></div></section>
<section class="valores-b"><div class="in">${valores.map(x => `<span>${x}</span>`).join('')}<a href="${link(v, 'clinica')}">Nossos valores ${ic('seta')}</a></div></section>
<section class="in sobre-b"><div><p class="k">A clínica Blu</p><h2>Um sorriso saudável é muito mais do que estética</h2><p class="lead">${sobre[1]}</p><p>${sobre[2]}</p></div><figure>${img('dr-raimundo-paciente', 'Dr. Raimundo Pacífico atendendo um paciente')}<figcaption>Dr. Raimundo Pacífico, CEO da Clínica Blu</figcaption></figure></section>
<section class="trat-b"><div class="in"><header class="tit"><p class="k">Tratamentos</p><h2>Especialistas dedicados para o que você precisar</h2></header>${cartoes()}</div></section>
<section class="in destaque-b"><a class="dest sobe" href="${link(v, 'implantes')}"><figure>${img('protese', 'Prótese sobre implantes')}</figure><div><p class="k">Implantes</p><h3>Neodent e Straumann, com anestesia geral e cirurgia guiada</h3></div></a><a class="dest sobe" href="${link(v, 'facetas')}"><figure>${img('sorriso-2', 'Sorriso com facetas')}</figure><div><p class="k">Facetas</p><h3>Porcelana ou resina, na cor que você escolher</h3></div></a></section>
<section class="espaco-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Por dentro</p><h2>Madeira, mármore e café à vontade</h2></div><a class="link-seta" href="${link(v, 'clinica')}">Ver a clínica ${ic('seta')}</a></header><div class="mosaico">${['recepcao', 'blublioteca', 'caneca', 'consultorio-2', 'cadeiras'].map(f => img(f, espaco.find(e => e[0] === f)[1])).join('')}</div></div></section>
<section class="in aval-b"><div class="aval-dest"><span class="estrelas">★★★★★</span><blockquote><p>“${avaliacoes[1].q}”</p></blockquote><p class="quem">${avaliacoes[1].n} · Google</p></div><div class="aval-lado">${avaliacoes.filter((_, i) => i !== 1).slice(0, 3).map(a => `<figure><blockquote><p>“${a.q}”</p></blockquote><figcaption>${a.n}</figcaption></figure>`).join('')}</div></section>
<section class="conv-b"><div class="in"><p class="k">Convênios aceitos</p>${convLogos()}</div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, cartoes);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Clínica Blu', artigo: 'da', url: E.url, lang: 'pt', cor: '#06A3DA', fundo: '#003B50', claro: '#F4FCFF',
  fonteTitulo: 'Nunito,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no azul do logo e com cantos redondos como as letras da Blu: sorriso na abertura, especialidades em cartões e convênios com os logos.', pontos: ['Fotos reais da clínica e do Dr. Raimundo', 'Implantes e facetas com passo a passo', 'Agendamento pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura, no petróleo da marca e na madeira da clínica, com o vídeo aéreo de Brasília do site atual na abertura.', pontos: ['"Blu, mais que uma clínica"', 'Valores: Entendimento, Eficiência e Transparência', 'Avaliações do Google em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
