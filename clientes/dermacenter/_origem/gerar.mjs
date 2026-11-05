// Dermacenter, clínica de dermatologia em Porto Alegre/RS. Gera public/{a,b}/ e a página de escolha.
// node clientes/dermacenter/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs dermacenter http://www.clinicadermacenter.com.br/)
// Textos: páginas do site atual (ASP): sobre, profissionais, dermatologia estética (8), clínica (pele, couro cabeludo, unhas), oncologia, convênios, contato.
// Fotos: as da própria clínica (recepção, espera, consultórios, salas de procedimento) e as imagens de tratamento do site.
// Logo: os pontos coloridos e "Dermacenter", redesenhados em vetor a partir do logo do site.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Dermacenter', url: 'https://dermacenter.overtus.com.br/', antigo: 'http://www.clinicadermacenter.com.br/',
  fone: '(51) 3022-2223', wa: '5551993820442', waVer: '(51) 99382-0442', email: 'contato@clinicadermacenter.com.br',
  insta: 'https://www.instagram.com/clinica.dermacenter/', face: 'https://www.facebook.com/clinicadermacenter/',
};
const unidades = [
  { id: 'centro', n: 'Centro Histórico', rua: 'Rua dos Andradas, 1234, salas 503, 504 e 505', bairro: 'Centro Histórico, Porto Alegre/RS', q: 'Rua dos Andradas, 1234, Porto Alegre', d: 'No coração do Centro Histórico, com acesso fácil e rápido de qualquer ponto da cidade.' },
  { id: 'tres-figueiras', n: 'Três Figueiras', rua: 'Av. Soledade, 569, salas 901, 902, 911 e 912', bairro: 'Três Figueiras, Porto Alegre/RS', q: 'Avenida Soledade, 569, Porto Alegre', d: 'A segunda unidade, no bairro Três Figueiras, para a comodidade dos pacientes da zona leste.' },
];
export const nomesVersao = { a: 'Pontos', b: 'Turquesa' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Nunito+Sans:wght@400;600;700&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#ffffff', b: '#0b3b39' };
const waMsg = (m = 'Olá! Vim pelo site e gostaria de agendar uma consulta na Dermacenter.') => waHref(E.wa, m);

const nav = [{ slug: 'a-clinica', nome: 'A clínica' }, { slug: 'estetica', nome: 'Dermatologia estética' }, { slug: 'dermatologia-clinica', nome: 'Dermatologia clínica' }, { slug: 'oncologia', nome: 'Oncologia cutânea' }, { slug: 'contato', nome: 'Contato' }];
const curto = 'Clínica de dermatologia clínica, estética e oncológica em Porto Alegre, com duas unidades: Centro Histórico e Três Figueiras.';
const sobre = [
  'Os cuidados com a pele têm papel fundamental na busca da autoestima, da confiança e da saúde física e emocional, merecendo uma atenção especial pelos benefícios que nos proporciona.',
  'Pensando nisso, a Dermacenter coloca à sua disposição uma equipe altamente qualificada para oferecer todos os tipos de tratamentos e serviços na área de dermatologia clínica e estética.',
];
const estrutura = 'São seis consultórios, duas salas para procedimentos e estrutura moderna com tecnologia avançada, garantindo acessibilidade, segurança e toda conveniência para proporcionar excelência em atendimento e plena satisfação com os resultados.';
const dermaonco = 'A clínica conta com a unidade DermaOnco, especializada em diagnóstico e cirurgia de câncer de pele, coordenada pelo Dr. Ronaldo Oliveira (CREMERS 20361), integrante do corpo clínico do Hospital do Câncer Mãe de Deus, com mais de 18 anos de experiência na área.';
const medicos = [
  ['Dr. Ronaldo Oliveira da Silva', '20361', 'Cirurgião de pele'], ['Dr. Danilo Barros', '11874', 'Cirurgião geral'], ['Dr. Sérgio Luis Thiesen Hilgert', '16386', 'Cirurgião geral'],
  ['Dra. Jacqueline Fernandes', '47004', 'Dermatologista'], ['Dra. Cristina Bergamaschi', '31408', 'Dermatologista'], ['Dra. Débora Brinker', '30851', 'Dermatologista'],
  ['Dra. Ana Cristina Schmitt Dornelles', '35653', 'Dermatologista'], ['Dr. Rodrigo Oliveira Almeida', '48337', 'Dermatologista'], ['Dr. Rafael Borba', '49484', 'Dermatologista'],
  ['Dra. Luciana Longo Ferlin', '48352', 'Cirurgia vascular'], ['Dra. Thaíse Ferrari', '44501', 'Dermatologista'], ['Dr. Jorge Ricardo Moller', '15997', 'Dermatologista'],
  ['Dra. Sabrina Stefani', '25789', 'Dermatologista'], ['Dra. Samara Khoury', '60582', 'Dermatologista'], ['Dra. Juliane da Costa', '47832', 'Dermatologista'],
  ['Dra. Vanessa de Mello Terroso', '30677', 'Ginecologista e obstetra'], ['Dr. Rodrigo Perez Pereira', '22670', 'Oncologista'],
];
const convenios = ['IBCM', 'Bradesco Saúde', 'Cabergs', 'Danamed', 'IPE Saúde', 'Saúde PAS', 'Saúde Caixa', 'Mediservice', 'Unimed', 'Humana Saúde'];
const estetica = [
  { id: 'etherea', t: 'Laser Etherea MX', f: 'laser-facial', p: ['A Dermacenter adquiriu a plataforma de laser Etherea MX, que reúne num único sistema mais de 70 indicações de tratamento, indo muito além dos procedimentos cosméticos mais comuns.'] },
  { id: 'laser', t: 'Tratamento a laser', f: 'laser', p: ['Tecnologia de ponta para a melhora estética e funcional da pele: suavizar cicatrizes, eliminar manchas e rejuvenescer, com precisão e resultados seguros e visíveis.'], l: ['Cicatrizes de acne, cirúrgicas ou traumáticas', 'Estrias recentes ou antigas', 'Melasma', 'Acne ativa e sequelas'] },
  { id: 'peeling', t: 'Peeling químico', f: 'peeling', p: ['Melhora a textura da pele, ameniza acne, manchas e cicatrizes e dá um aspecto rejuvenescido. Uma solução química estimula a descamação controlada das camadas mais externas.', 'Feito no consultório, em 20 a 30 minutos. Nos peelings superficiais, a descamação dura cerca de 3 a 4 dias e o paciente mantém a rotina.'] },
  { id: 'toxina-botulinica', t: 'Toxina botulínica', f: 'rosto-maos', p: ['O "botox" atua na musculatura e atenua as linhas de expressão da testa, entre as sobrancelhas e os "pés de galinha". Também trata a hiperidrose, o suor excessivo.', 'O efeito aparece em cerca de 10 dias e dura de 3 a 6 meses; as atividades podem ser retomadas na hora.'] },
  { id: 'preenchimento', t: 'Preenchimento', f: 'marcacao', p: ['Com ácido hialurônico, harmoniza naturalmente a face, corrige rugas finas e cicatrizes superficiais e restaura o volume e a sustentação que se perdem com os anos, sem mudar a fisionomia.'] },
  { id: 'microagulhamento', t: 'Microagulhamento', f: 'tratamento-facial', p: ['Trata cicatrizes de acne, estrias e melasma e rejuvenesce, estimulando a derme a formar colágeno novo. As sessões têm intervalo de 4 a 6 semanas.'] },
  { id: 'skinboosters', t: 'Skinboosters', f: 'hero-pele', p: ['Hidratação profunda com ácido hialurônico aplicada com agulhas muito finas: a pele ganha espessura, maciez e viço. Pode ser feito no rosto, lábios, colo, mãos, pescoço e braços, em sessões de cerca de 40 minutos.'] },
  { id: 'bioestimuladores', t: 'Bioestimuladores de colágeno', f: 'retrato-pele', p: ['Ácido polilático, hidroxiapatita de cálcio e policaprolactona (Sculptra, Radiesse e Ellansé) estimulam a produção de colágeno e deixam a pele firme por mais tempo. O efeito aparece em 3 a 6 semanas.'] },
];
const clinicaGrupos = [
  { id: 'pele', t: 'Doenças da pele', f: 'exame-dermato', d: 'A dermatologia clínica abrange as doenças da pele, dos cabelos e das unhas.', itens: [
    ['Biópsia de pele', 'Retirada de um pequeno fragmento da pele ou da mucosa para análise, com anestesia local no consultório, por shaving, punch ou exérese.'],
    ['Cauterização química', 'Uma substância cáustica ou ácida destrói a lesão: queratoses, verrugas virais, granuloma piogênico e outras.'],
    ['Crioterapia', 'Nitrogênio líquido trata a lesão por congelamento, principalmente queratoses actínicas, verrugas virais e ceratoses seborreicas.'],
    ['Curetagem', 'Remoção de lesões por raspagem com a cureta, muito usada no tratamento do molusco contagioso.'],
    ['Eletrocoagulação', 'Lesões benignas ou pré-malignas são tratadas por eletricidade ou calor, com recuperação rápida.'],
  ] },
  { id: 'couro-cabeludo', t: 'Couro cabeludo', f: 'medica', d: 'Diagnóstico e tratamento da queda de cabelo e das doenças do couro cabeludo.', itens: [
    ['Intradermoterapia', 'Microinfusão de vitaminas e minerais com pequenas agulhas para diminuir a queda e estimular o crescimento dos fios.'],
    ['Corticoterapia intralesional', 'Infiltração de corticoide para alopecia areata, líquen plano pilar e lúpus discoide, com intervalos de 4 a 6 semanas.'],
    ['Biópsia do couro cabeludo', 'Ajuda no diagnóstico de queda, alopecia, alteração de textura e doenças inflamatórias.'],
    ['Tricoscopia digital', 'Exame que amplia até 70 vezes a área analisada: rápido, indolor e eficaz no diagnóstico da calvície.'],
    ['Fototerapia capilar', 'Luz, laser ou LED com ação anti-inflamatória que estimula o crescimento dos fios, em sessões indolores de 15 a 20 minutos.'],
  ] },
  { id: 'unhas', t: 'Unhas', f: 'consultorio', d: 'Alterações de cor ou de formato das unhas pedem diagnóstico rápido.', itens: [
    ['Cirurgia de unhas', 'Para deformidades, encravamentos ou tumores que causam dor e dificultam caminhar ou manusear objetos. Com anestesia local, quase sempre sem retirar toda a unha.'],
    ['Biópsias', 'Investigação de tumores, melanoníquia e distrofias ungueais, com um fragmento de no máximo 3 mm, feita ambulatorialmente.'],
  ] },
];
const sinais = ['Sinais que coçam, ardem, doem ou sangram com facilidade', 'Sinais escuros nas plantas dos pés, palmas das mãos, couro cabeludo, boca ou mucosas', 'Sinais assimétricos, de bordas irregulares ou com várias cores', 'Lesões que não cicatrizam, na pele ou nas mucosas'];
const mapeamento = ['Você tem pele clara, que reage com sensibilidade ao sol?', 'Você tem muitos nevos (pintas) pigmentados?', 'Você tem grandes nevos pigmentados congênitos?'];
const fotosClinica = [['recepcao', 'Recepção'], ['espera', 'Sala de espera'], ['consultorio', 'Consultório'], ['sala-procedimento', 'Sala de procedimentos'], ['consultorio-2', 'Consultório'], ['sala-procedimento-2', 'Sala de procedimentos'], ['balcao', 'Recepção'], ['corredor', 'Corredor']];

const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Dermacenter | Dermatologia em Porto Alegre' : `${titulo} | Dermacenter`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = claro => `<img class="logo" src="/assets/logo${claro ? '-clara' : ''}.svg" alt="Dermacenter" width="332" height="82">`;
const galeria = (lst = fotosClinica) => `<div class="galeria">${lst.map(([f, a]) => `<a href="/assets/img/${f}.webp" data-caixa="clinica">${img(f, a)}</a>`).join('')}</div>`;
const mapa = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed"></iframe>`;
const cardUnidade = u => `<article class="unidade sobe" id="${u.id}"><p class="k">Unidade</p><h3>${u.n}</h3><p>${ic('pin')}<span>${u.rua}<br>${u.bairro}</span></p><p class="unid-d">${u.d}</p>${mapa(u.q)}</article>`;
const tabelaMedicos = () => `<div class="tabela-rola"><table class="tabela"><thead><tr><th>Médico</th><th>CRM</th><th>Especialidade</th></tr></thead><tbody>${medicos.map(([n, c, e]) => `<tr><th>${n}</th><td>${c}</td><td>${e}</td></tr>`).join('')}</tbody></table></div>`;
const chipsConv = () => `<ul class="convenios">${convenios.map(c => `<li>${c}</li>`).join('')}</ul><p class="nota">Não encontrou seu convênio? Ligue para ${E.fone}.</p>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}Centro Histórico e Três Figueiras · Porto Alegre</span><span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Dermacenter, página inicial">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waMsg()}" target="_blank" rel="noopener">Agendar</a>
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
    <div class="rod-marca">${marca(true)}<p>${curto}</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      ${unidades.map(u => `<li>${ic('pin')}<span><b>${u.n}</b>: ${u.rua}</span></li>`).join('')}
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Dermacenter. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site e gostaria de agendar uma consulta na Dermacenter." id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Unidade<select name="unidade">${unidades.map(u => `<option>${u.n}</option>`).join('')}</select></label><label>Convênio<select name="convenio"><option>Particular</option>${convenios.map(c => `<option>${c}</option>`).join('')}</select></label></div>
  <label>Assunto<select name="assunto"><option>Consulta dermatológica</option>${estetica.map(p => `<option>${p.t}</option>`).join('')}<option>Mapeamento de sinais</option><option>Câncer de pele</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp da clínica. Se preferir, ligue: ${E.fone}.</p>
</form>`;

function comum(v, pag, cab, cta) {
  pag['a-clinica'] = head(v, 'a-clinica', 'A clínica', curto) + topo(v, 'a-clinica') + cab('A clínica', 'Sobre a Dermacenter', 'recepcao', 'Dermatologia clínica, estética e oncológica, com uma equipe altamente qualificada.') + `
<div class="in"><section class="texto-pag"><div><p class="k">Quem somos</p><h2>Cuidar da pele é cuidar da autoestima</h2>${sobre.map(p => `<p>${p}</p>`).join('')}<p>${dermaonco}</p></div><aside class="caixa"><h3>Estrutura</h3><p>${estrutura}</p>${img('espera', 'Sala de espera')}</aside></section>
<section class="bloco" id="estrutura"><header class="tit"><p class="k">Estrutura</p><h2>6 consultórios e 2 salas de procedimentos</h2></header>${galeria()}</section>
<section class="bloco" id="profissionais"><header class="tit"><p class="k">Profissionais</p><h2>Corpo clínico</h2><p>${medicos.length} médicos, entre dermatologistas, cirurgiões, oncologista, cirurgiã vascular e ginecologista.</p></header>${tabelaMedicos()}</section>
<section class="bloco" id="convenios"><header class="tit"><p class="k">Convênios</p><h2>Para a sua conveniência</h2></header>${chipsConv()}</section></div>
` + cta() + rodape(v);
  pag.oncologia = head(v, 'oncologia', 'Oncologia cutânea', 'Diagnóstico e cirurgia de câncer de pele com a DermaOnco e mapeamento digital de sinais com FotoFinder em Porto Alegre.') + topo(v, 'oncologia') + cab('Oncologia cutânea', 'Câncer de pele é curável quando detectado a tempo', 'exame-sinais', 'Diagnóstico e cirurgia com a DermaOnco, e mapeamento digital de sinais com FotoFinder.') + `
<div class="in"><section class="texto-pag"><div><p class="k">DermaOnco</p><h2>Diagnóstico e cirurgia de câncer de pele</h2><p class="lead">${dermaonco}</p><p>Muitos sinais ou "pintas" na pele são câncer sem que o paciente desconfie. Nem todos os tumores de pele são malignos, e existem tratamentos e procedimentos específicos para cada caso.</p><h3>Fique atento</h3>${lista(sinais)}<p>Evite a exposição excessiva ao sol, observe os sinais da pele e agende uma consulta com nossos dermatologistas.</p></div><aside class="caixa">${img('dermatoscopio', 'Exame com dermatoscópio')}<h3>Mapeamento digital de sinais</h3><p>Com o FotoFinder, fotografamos a pele e os nevos atípicos e guardamos tudo digitalmente: a cada check-up, mesmo as menores alterações ficam visíveis. O exame é indolor e você acompanha na tela.</p></aside></section>
<section class="bloco mapeamento"><header class="tit"><p class="k">Mapeamento digital</p><h2>Se responder "sim" a uma destas perguntas, fale conosco</h2></header><ol class="perguntas">${mapeamento.map((q, i) => `<li><span class="n">${i + 1}</span><p>${q}</p></li>`).join('')}</ol><p class="bts"><a class="btn" href="${waMsg('Olá! Vim pelo site e gostaria de agendar um mapeamento digital de sinais na Dermacenter.')}" target="_blank" rel="noopener">${icWa()}Agendar mapeamento</a></p></section></div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `${E.fone} · WhatsApp ${E.waVer}. Rua dos Andradas, 1234 e Av. Soledade, 569, Porto Alegre.`) + topo(v, 'contato') + cab('Contato', 'Agende sua consulta', 'balcao', 'Duas unidades em Porto Alegre: Centro Histórico e Três Figueiras.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2>${formulario()}</div><div><ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.waVer}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('escudo')}<div><strong>Convênios</strong><span>${convenios.join(', ')} e particular.</span></div></li>
</ul></div></section>
<section class="bloco"><div class="unidades">${unidades.map(cardUnidade).join('')}</div></section></div>
` + rodape(v);
}

// ---------- A: Pontos (branco, os pontos vermelho, amarelo e turquesa do logo) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}<img class="cab-pontos" src="/assets/simbolo.svg" alt="" width="90" height="82"></figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><img src="/assets/simbolo.svg" alt="" width="90" height="82"><div><h2>Agende sua consulta</h2><p>Atendemos convênios e particular, em duas unidades.</p></div><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Dermatologia em Porto Alegre</p><h1>Cuidar da pele é cuidar de você.</h1><p>Dermatologia clínica, estética e oncológica, com uma equipe de ${medicos.length} médicos e duas unidades: Centro Histórico e Três Figueiras.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'a-clinica')}#convenios">Convênios</a></p></div>
<div class="hero-a-foto">${img('hero-pele', 'Pele saudável', ' loading="eager" fetchpriority="high"')}<span class="p p1"></span><span class="p p2"></span><span class="p p3"></span><span class="p p4"></span></div></div></section>
<section class="in areas-a"><a class="area sobe" href="${link(v, 'estetica')}"><span class="p p2"></span><figure>${img('laser-facial', 'Dermatologia estética')}</figure><h2>Dermatologia estética</h2><p>Laser Etherea MX, peeling, toxina botulínica, preenchimento, skinboosters e bioestimuladores.</p><span class="link-seta">Ver tratamentos ${ic('seta')}</span></a><a class="area sobe" href="${link(v, 'dermatologia-clinica')}"><span class="p p3"></span><figure>${img('exame-dermato', 'Dermatologia clínica')}</figure><h2>Dermatologia clínica</h2><p>Doenças da pele, do couro cabeludo e das unhas: diagnóstico e procedimentos no consultório.</p><span class="link-seta">Ver procedimentos ${ic('seta')}</span></a><a class="area sobe" href="${link(v, 'oncologia')}"><span class="p p1"></span><figure>${img('exame-sinais', 'Oncologia cutânea')}</figure><h2>Cirurgia e oncologia cutânea</h2><p>DermaOnco: diagnóstico e cirurgia de câncer de pele, e mapeamento digital de sinais.</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a></section>
<section class="sobre-a"><div class="in sobre-a-in"><div class="mosaico">${img('recepcao', 'Recepção')}${img('sala-procedimento', 'Sala de procedimentos')}${img('consultorio', 'Consultório')}</div><div><p class="k">A Dermacenter</p><h2>Estrutura moderna e aconchegante, no centro de Porto Alegre</h2><p>${estrutura}</p><ul class="numeros-a"><li><b>6</b>consultórios</li><li><b>2</b>salas de procedimentos</li><li><b>${medicos.length}</b>médicos</li></ul><a class="link-seta" href="${link(v, 'a-clinica')}">Conheça a clínica ${ic('seta')}</a></div></div></section>
<section class="in etherea-a"><figure>${img('laser', 'Laser')}</figure><div><p class="k">Novidade</p><h2>Laser Etherea MX: mais de 70 indicações numa só plataforma</h2><p>Cicatrizes, estrias, melasma, acne ativa e sequelas, rejuvenescimento: tecnologia de ponta para mais saúde e autoestima.</p><a class="btn" href="${link(v, 'estetica')}#etherea">Tratamentos a laser</a></div></section>
<section class="conv-a"><div class="in"><header class="tit"><p class="k">Convênios</p><h2>Atendemos os principais convênios</h2></header>${chipsConv()}</div></section>
<section class="in unid-a"><header class="tit"><p class="k">Onde estamos</p><h2>Duas unidades em Porto Alegre</h2></header><div class="unidades">${unidades.map(cardUnidade).join('')}</div></section>
` + cta() + rodape(v);
  pag.estetica = head(v, 'estetica', 'Dermatologia estética', 'Laser Etherea MX, peeling químico, toxina botulínica, preenchimento, microagulhamento, skinboosters e bioestimuladores em Porto Alegre.') + topo(v, 'estetica') + cab('Dermatologia estética', 'Rejuvenescimento e cuidados com a pele', 'tratamento-facial', 'A partir de uma avaliação criteriosa do médico, decide-se o procedimento correto para cada caso.') + `
<div class="in"><nav class="grupos-nav" aria-label="Tratamentos">${estetica.map(p => `<a href="#${p.id}">${p.t}</a>`).join('')}</nav><div class="procs-a">${estetica.map(p => `<article class="proc-a sobe" id="${p.id}"><figure>${img(p.f, p.t)}</figure><div><h3>${p.t}</h3>${p.p.map(x => `<p>${x}</p>`).join('')}${p.l ? lista(p.l) : ''}<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e gostaria de saber mais sobre ${p.t.toLowerCase()} na Dermacenter.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a></div></article>`).join('')}</div></div>
` + cta() + rodape(v);
  pag['dermatologia-clinica'] = head(v, 'dermatologia-clinica', 'Dermatologia clínica', 'Doenças da pele, do couro cabeludo e das unhas: biópsias, crioterapia, tricoscopia, fototerapia e cirurgia de unhas em Porto Alegre.') + topo(v, 'dermatologia-clinica') + cab('Dermatologia clínica', 'Pele, cabelos e unhas', 'exame-dermato', 'Profissionais especializados e uma estrutura moderna e acolhedora.') + `
<div class="in"><nav class="grupos-nav" aria-label="Áreas">${clinicaGrupos.map(g => `<a href="#${g.id}">${g.t}</a>`).join('')}</nav>${clinicaGrupos.map(g => `<section class="grupo-a" id="${g.id}"><figure>${img(g.f, g.t)}</figure><div><h2>${g.t}</h2><p class="grupo-d">${g.d}</p><dl class="itens">${g.itens.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl></div></section>`).join('')}</div>
` + cta() + rodape(v);
  comum(v, pag, cab, cta);
  return pag;
}

// ---------- B: Turquesa (o turquesa do logo dominante, amarelo e vermelho como acento) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><h2>Agende sua consulta na Dermacenter</h2><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a><a class="btn btn-linha-clara" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b">${img('retrato-pele', '', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Dermatologia clínica, estética e oncológica</p><h1>Sua pele em boas mãos, em Porto Alegre.</h1><p>Uma equipe altamente qualificada para todos os tipos de tratamentos dermatológicos, no Centro Histórico e no Três Figueiras.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha-clara" href="${link(v, 'estetica')}">Tratamentos</a></p></div></section>
<section class="faixa-b"><div class="in"><div><b>${medicos.length}</b><span>médicos no corpo clínico</span></div><div><b>6</b><span>consultórios</span></div><div><b>70+</b><span>indicações do laser Etherea MX</span></div><div><b>${convenios.length}</b><span>convênios atendidos</span></div></div></section>
<section class="in servicos-b"><header class="tit"><p class="k">Serviços</p><h2>Tudo para a saúde e a beleza da pele</h2></header><div class="servicos">
  <div class="serv sobe"><h3><span class="bol b1"></span>Dermatologia estética</h3><ul>${estetica.map(p => `<li><a href="${link(v, 'estetica')}#${p.id}">${p.t}</a></li>`).join('')}</ul></div>
  <div class="serv sobe"><h3><span class="bol b2"></span>Dermatologia clínica</h3><ul>${clinicaGrupos.flatMap(g => g.itens.map(([t]) => `<li><a href="${link(v, 'dermatologia-clinica')}#${g.id}">${t}</a></li>`)).slice(0, 9).join('')}</ul></div>
  <div class="serv sobe"><h3><span class="bol b3"></span>Oncologia cutânea</h3><ul><li><a href="${link(v, 'oncologia')}">Diagnóstico e cirurgia de câncer de pele</a></li><li><a href="${link(v, 'oncologia')}">Mapeamento digital de sinais (FotoFinder)</a></li><li><a href="${link(v, 'oncologia')}">Biópsias</a></li></ul><p class="serv-onco">${dermaonco}</p></div>
</div></section>
<section class="estrutura-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Estrutura</p><h2>Moderna, acessível e aconchegante</h2></div><a class="link-seta" href="${link(v, 'a-clinica')}">A clínica ${ic('seta')}</a></header>${galeria(fotosClinica.slice(0, 6))}</div></section>
<section class="in medicos-b"><div><p class="k">Corpo clínico</p><h2>${medicos.length} especialistas</h2><p>Dermatologistas, cirurgiões, oncologista, cirurgiã vascular e ginecologista.</p><a class="link-seta" href="${link(v, 'a-clinica')}#profissionais">Ver a lista completa ${ic('seta')}</a></div><ul class="nomes">${medicos.slice(0, 12).map(([n, c, e]) => `<li><b>${n}</b><span>${e} · CRM ${c}</span></li>`).join('')}</ul></section>
<section class="unid-b"><div class="in"><header class="tit"><p class="k">Unidades</p><h2>Centro Histórico e Três Figueiras</h2></header><div class="unidades">${unidades.map(cardUnidade).join('')}</div><div class="conv-b">${chipsConv()}</div></div></section>
` + cta() + rodape(v);
  pag.estetica = head(v, 'estetica', 'Dermatologia estética', 'Laser Etherea MX, peeling químico, toxina botulínica, preenchimento, microagulhamento, skinboosters e bioestimuladores em Porto Alegre.') + topo(v, 'estetica') + cab('Dermatologia estética', 'Rejuvenescimento e cuidados com a pele', 'laser-facial', 'Cada caso deve ser analisado individualmente pelo seu médico.') + `
<div class="in"><div class="procs-b">${estetica.map((p, i) => `<article class="proc-b sobe${i % 2 ? ' inv' : ''}" id="${p.id}"><figure>${img(p.f, p.t)}</figure><div><span class="num">${String(i + 1).padStart(2, '0')}</span><h2>${p.t}</h2>${p.p.map(x => `<p>${x}</p>`).join('')}${p.l ? lista(p.l) : ''}<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e gostaria de saber mais sobre ${p.t.toLowerCase()} na Dermacenter.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a></div></article>`).join('')}</div></div>
` + cta() + rodape(v);
  pag['dermatologia-clinica'] = head(v, 'dermatologia-clinica', 'Dermatologia clínica', 'Doenças da pele, do couro cabeludo e das unhas: biópsias, crioterapia, tricoscopia, fototerapia e cirurgia de unhas em Porto Alegre.') + topo(v, 'dermatologia-clinica') + cab('Dermatologia clínica', 'Pele, cabelos e unhas', 'medica', 'A área de dermatologia clínica abrange as doenças da pele, dos cabelos e das unhas.') + `
<div class="in">${clinicaGrupos.map(g => `<section class="grupo-b" id="${g.id}"><header class="grupo-tit"><h2>${g.t}</h2><p>${g.d}</p></header><div class="procs">${g.itens.map(([t, d], i) => `<details class="proc"${i === 0 ? ' open' : ''}><summary><b>${t}</b>${ic('seta')}</summary><p>${d}</p></details>`).join('')}</div></section>`).join('')}</div>
` + cta() + rodape(v);
  comum(v, pag, cab, cta);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comumCss + '\n' + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Dermacenter', artigo: 'da', url: E.url, lang: 'pt', cor: '#ee1746', fundo: '#0b3b39', claro: '#ffffff',
  fonteTitulo: 'Ubuntu,system-ui,sans-serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Branca e alegre, com os pontos vermelho, amarelo e turquesa do logo espalhados pelo site.', pontos: ['Estética, clínica e oncologia', 'Fotos reais da clínica', 'Duas unidades com mapa'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'No turquesa do logo, sóbria, com o corpo clínico e os convênios em destaque.', pontos: [`${medicos.length} médicos com CRM`, `${convenios.length} convênios`, 'Tratamentos alternados com foto'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
