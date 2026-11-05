// Dra. Márcia Lima Polo, dermatologista em Maringá/PR. Gera public/{a,b}/ e a página de escolha.
// node clientes/marciapolo/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs marciapolo https://marciapolodermato.com.br/)
// Textos: páginas do site atual (WordPress/BeTheme, rodapé de 2020): home, sobre, procedimentos (7), Ultraformer III, contato.
// Fotos: as do próprio site (retrato da Dra., fachada da clínica, imagens dos procedimentos e do Ultraformer).
// Logo: a assinatura "Dra. Márcia Polo" do site, redesenhada em vetor; "Dermatologista · CRM 16.001" ao lado, como no logo original.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Dra. Márcia Polo', url: 'https://marciapolo.overtus.com.br/', antigo: 'https://marciapolodermato.com.br/',
  fone: '(44) 3225-0705', wa: '554432250705', email: 'contato@marciapolodermato.com.br',
  rua: 'Av. Luís Teixeira, 2370', bairro: 'Zona 05, Maringá/PR · CEP 87015-020', q: 'Avenida Luís Teixeira, 2370, Zona 05, Maringá PR',
  horario: 'Segunda a sexta, das 8h às 18h',
};
export const nomesVersao = { a: 'Linho', b: 'Café' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Marcellus&family=Lato:wght@300;400;700&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#f8f5ef', b: '#2a211c' };
const waMsg = (m = 'Olá! Vim pelo site e gostaria de agendar uma consulta com a Dra. Márcia Polo.') => waHref(E.wa, m);

const nav = [{ slug: 'sobre', nome: 'Sobre' }, { slug: 'procedimentos', nome: 'Procedimentos' }, { slug: 'ultraformer', nome: 'Ultraformer III' }, { slug: 'contato', nome: 'Contato' }];
const curto = 'Dermatologista em Maringá, membro da Sociedade Brasileira de Dermatologia desde 1998. Dermatologia clínica, cirúrgica e estética, a partir de 12 anos de idade.';
const frase = 'Seu bem-estar tem que estar em primeiro lugar. Afinal, você bem faz toda a diferença!';
const formacao = [
  'Medicina pela Pontifícia Universidade Católica do Paraná (PUC)',
  'Dermatologia pela Santa Casa de Curitiba',
  'Especialização em Paris, pelo Hospital Henri Mondor',
  'Medicina Estética pela Faculdade Souza Marques, no Rio de Janeiro',
  'Membro da Sociedade Brasileira de Dermatologia desde 1998',
];
const grupos = [
  { id: 'dermatologia', t: 'Dermatologia', d: 'Doenças da pele, do cabelo e das unhas, e pequenas cirurgias no consultório.' },
  { id: 'estetica', t: 'Estética', d: 'Tratamentos para rejuvenescer, uniformizar e cuidar da pele.' },
];
const procs = [
  { g: 'dermatologia', id: 'dermatologia-clinica', t: 'Dermatologia clínica', f: 'p-clinica', p: ['Envelhecimento cutâneo, tratamento de acne, câncer de pele, queda de cabelo (alopecias), micoses, vitiligo, alergias, nevos e verrugas, cicatrizes e outras doenças da pele.'], l: ['Acne', 'Câncer de pele', 'Queda de cabelo', 'Micoses', 'Vitiligo', 'Alergias'] },
  { g: 'dermatologia', id: 'dermatologia-cirurgica', t: 'Dermatologia cirúrgica', f: 'p-cirurgica', p: ['Retirada de verrugas, cistos, lipomas, xantelasmas, pintas (nevos), retirada de câncer de pele e outros tumores, tratamento de cicatrizes e de queloides.'], l: ['Verrugas e pintas', 'Cistos e lipomas', 'Câncer de pele', 'Queloides'] },
  { g: 'estetica', id: 'peeling', t: 'Peeling', f: 'p-peeling', p: ['Aplicação de substâncias que removem de forma controlada as camadas mais superficiais ou mais profundas da pele, regenerando a pele e o seu aspecto.', 'Tira manchas e cicatrizes, diminui lesões e rugas, e atua também na prevenção do câncer de pele e no controle da acne.'], l: ['Manchas', 'Rugas', 'Cicatrizes', 'Rejuvenescimento'] },
  { g: 'estetica', id: 'toxina-botulinica', t: 'Toxina botulínica (botox)', f: 'p-botox', p: ['Muito eficaz no rejuvenescimento: a toxina é aplicada em músculos específicos e bloqueia a contração do local, impedindo o enrugamento da pele.', 'O procedimento leva em média 15 minutos, tem resultado gradativo e dura de 4 a 5 meses. Pode ser aplicada ao redor dos olhos, na testa, entre as sobrancelhas e no contorno dos lábios.'], l: ['Testa', 'Pés de galinha', 'Entre as sobrancelhas', 'Contorno labial'] },
  { g: 'estetica', id: 'preenchimento', t: 'Preenchimento com ácido hialurônico', f: 'p-preenchimento', p: ['O ácido hialurônico é uma substância que a própria pele produz, mas que diminui com o tempo. Aplicado na pele, devolve volume e sustentação.', 'Indicado para olheiras, bigode chinês, cicatrizes, volume dos lábios, rugas e linhas de expressão. O resultado dura de 8 a 12 meses, conforme a pele e a área tratada.'], l: ['Olheiras', 'Bigode chinês', 'Lábios', 'Linhas de expressão'] },
  { g: 'estetica', id: 'microagulhamento', t: 'Microagulhamento (dermaroller)', f: 'p-microagulhamento', p: ['Estimula a produção natural de colágeno e elastina para restaurar a pele danificada, e melhora a firmeza e o aspecto da pele.', 'Indicado para rugas, queda de cabelo, flacidez, cicatrizes de acne, melasma, linhas de expressão, estrias, celulite e gordura localizada.'], l: ['Cicatrizes de acne', 'Melasma', 'Estrias', 'Queda de cabelo'] },
  { g: 'estetica', id: 'laser', t: 'Laser Lavieen', f: 'p-laser', p: ['O laser emite uma luz que age nos vasos sanguíneos e é usado em diversos tratamentos: rejuvenescimento da pele, flacidez, depilação definitiva, acne e estrias.', 'O Lavieen estimula o colágeno, suaviza manchas, reduz rugas, linhas e flacidez, e trata também a acne e a queda de cabelo.'], l: ['Manchas', 'Rejuvenescimento', 'Acne', 'Queda de cabelo'] },
];
const lavieen = ['Estimula colágeno', 'Suaviza manchas', 'Proporciona o rejuvenescimento da pele', 'Reduz rugas, linhas e flacidez', 'Tratamento de acne', 'Tratamento de queda de cabelo'];
const ultraLista = ['Rejuvenesce e fortalece a pele', 'Corrige linhas finas e a flacidez da face', 'Corrige sinais de envelhecimento', 'Dá mais elasticidade à pele', 'Remodela o contorno do corpo', 'Corrige a flacidez da pele do corpo', 'Levanta a pele', 'Reduz a gordura localizada no abdômen'];
const pilares = [
  { t: 'Neocolagênese', f: 'u-neocolagenese', d: 'Os transdutores microfocados atuam na face, com efeito lifting, melhorando linhas e rugas.' },
  { t: 'Ancoragem muscular', f: 'u-ancoragem', d: 'A energia chega ao SMAS, a camada músculo-aponeurótica da face, e estimula a remodelação do colágeno.' },
  { t: 'Gordura localizada', f: 'u-gordura', d: 'Os macrofocados reduzem a flacidez e até 20% da gordura localizada no abdômen e no interno das coxas.' },
];
const fases = [
  { t: 'Fase inflamatória', q: '0 a 48 horas', l: ['Hemostasia', 'Coagulação da pele', 'Migração celular'] },
  { t: 'Fase proliferativa', q: '2 dias a 2 semanas', l: ['Tecido de granulação', 'Contração da lesão', 'Síntese de colágeno'] },
  { t: 'Fase remodeladora', q: '3 meses', l: ['Reagrupamento do colágeno', 'Aumento do tônus da pele', 'Efeito lifting'] },
];

const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Dra. Márcia Polo | Dermatologista em Maringá' : `${titulo} | Dra. Márcia Polo`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = cor => `<span class="marca-mp"><img src="/assets/assinatura${cor}.svg" alt="Dra. Márcia Polo" width="390" height="50"><small>Dermatologista · CRM 16.001</small></span>`;
const fig = (n, alt) => n ? `<figure>${img(n, alt)}</figure>` : '';

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('relogio')}${E.horario}</span><span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Dra. Márcia Polo, página inicial">${marca(v === 'b' ? '-ouro' : '')}</a>
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
    <div class="rod-marca">${marca('-clara')}<p>${curto}</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></li>
      <li>${ic('relogio')}<span>${E.horario}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Dra. Márcia Polo. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site e gostaria de agendar uma consulta com a Dra. Márcia Polo." id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Consulta dermatológica</option>${procs.map(p => `<option>${p.t}</option>`).join('')}<option>Ultraformer III</option><option>Convênio</option></select></label>
  <label>Sua mensagem<textarea name="mensagem" rows="4" placeholder="Conte o que você precisa"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp da clínica. Se preferir, ligue: ${E.fone}.</p>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.q)}&z=16&output=embed"></iframe>`;
const agendar = p => `<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e gostaria de agendar uma avaliação de ${p.t.toLowerCase()} com a Dra. Márcia Polo.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a>`;
const chips = l => `<ul class="tags">${l.map(x => `<li>${x}</li>`).join('')}</ul>`;

function comum(v, pag, cab, cta, listaProcs) {
  pag.sobre = head(v, 'sobre', 'Sobre a Dra. Márcia', curto) + topo(v, 'sobre') + cab('Sobre', 'Dra. Márcia Lima Polo', 'faixa-rosto', 'Dermatologista · CRM 16.001 PR') + `
<div class="in"><section class="dr-pag"><figure class="dra-foto">${img('dra-marcia', 'Dra. Márcia Lima Polo')}<figcaption>Dra. Márcia Lima Polo<br><small>CRM 16.001 PR</small></figcaption></figure><div><p class="k">Formação</p><h2>Clínica geral aliada à dermatologia</h2><p class="lead">Unindo a formação em clínica geral à dermatologia, é possível trazer melhores resultados nos tratamentos e procedimentos dos pacientes.</p>${lista(formacao)}<p>Atende dermatologia geral a partir de 12 anos de idade, tanto as doenças de pele como a parte estética.</p><p>Sempre em busca da satisfação e do bem-estar dos pacientes, investe em melhorias na infraestrutura da clínica e em novos cursos e produtos.</p></div></section>
<section class="bloco clinica-sobre"><figure>${img('clinica-fachada', 'Fachada da clínica na Av. Luís Teixeira')}</figure><div><p class="k">A clínica</p><h2>Na Zona 05, em Maringá</h2><p>${E.rua}, ${E.bairro}.</p><p>Atendemos os principais convênios de saúde e particular.</p><a class="link-seta" href="${link(v, 'contato')}">Como chegar ${ic('seta')}</a></div></section></div>
` + cta() + rodape(v);
  pag.procedimentos = head(v, 'procedimentos', 'Procedimentos', 'Dermatologia clínica e cirúrgica, peeling, toxina botulínica, preenchimento, microagulhamento e laser em Maringá.') + topo(v, 'procedimentos') + cab('Procedimentos', 'Conheça os procedimentos que tenho o prazer em oferecer a você', 'faixa-rosto-2', 'Para saber mais, agende sua consulta.') + `
<div class="in"><nav class="grupos-nav" aria-label="Grupos">${grupos.map(g => `<a href="#${g.id}">${g.t}</a>`).join('')}<a href="${link(v, 'ultraformer')}">Ultraformer III</a></nav>${listaProcs(procs, grupos)}</div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `${E.fone}. ${E.rua}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Entre em contato e agende uma consulta', 'rua', 'Viva bem com você e sua saúde!') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2>${formulario()}</div><div><ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp e telefone</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
  <li>${ic('escudo')}<div><strong>Convênios</strong><span>Atendemos os principais convênios de saúde e particular.</span></div></li>
</ul>${mapa()}</div></section></div>
` + rodape(v);
  pag.ultraformer = head(v, 'ultraformer', 'Ultraformer III', 'Ultrassom micro e macrofocado para lifting facial, flacidez e gordura localizada, sem cirurgia, em Maringá.') + topo(v, 'ultraformer') + cab('Ultraformer III', 'Ultrassom micro e macrofocado para lifting, flacidez e gordura localizada', 'u-neocolagenese', 'A evolução da tecnologia de ultrassom, sem cirurgia.') + `
<div class="in"><section class="u-intro"><div><p class="k">A tecnologia</p><h2>Máxima eficácia para lifting facial e contorno corporal</h2><p class="lead">O Ultraformer III é a última palavra para tratamento da flacidez, contorno corporal e ancoragem muscular no mundo.</p><p>A tecnologia combina o ultrassom micro e macrofocado, ajustados de acordo com o objetivo e a área do tratamento. É um tratamento não invasivo, sem cirurgia, a mais recente tecnologia HIFU, capaz de tratar qualquer parte da pele, do corpo ou do rosto.</p></div><figure class="u-aparelho">${img('ultraformer-aparelho', 'Aparelho Ultraformer III')}</figure></section>
<section class="bloco"><header class="tit"><p class="k">Comprovados</p><h2>Os 3 pilares de atuação</h2></header><div class="pilares">${pilares.map(p => `<article class="pilar sobe"><figure>${img(p.f, p.t)}</figure><h3>${p.t}</h3><p>${p.d}</p></article>`).join('')}</div></section>
<section class="bloco u-aplica"><figure>${img('u-face', 'Aplicações do Ultraformer na face')}</figure><figure>${img('u-corpo', 'Aplicações do Ultraformer no corpo')}</figure><div><p class="k">Benefícios</p><h2>A tecnologia definitiva para gordura localizada e flacidez</h2>${lista(ultraLista)}</div></section>
<section class="bloco"><header class="tit"><p class="k">Alcance e frequência</p><h2>Cada transdutor, uma profundidade</h2></header><div class="alcance"><article><b>1,5 a 4,5 mm</b><h3>Transdutores faciais</h3><p>Entregam energia de ultrassom nas camadas do SMAS da face para estimular a remodelação do colágeno.</p></article><article><b>6 a 13 mm</b><h3>Transdutores corporais</h3><p>Entregam energia no tecido subcutâneo, destruindo as células de gordura, que o corpo elimina naturalmente.</p></article><article><b>8×</b><h3>Mais volume</h3><p>Os macrofocados atingem um volume 8 vezes maior que os microfocados, o que permite o efeito lipólise.</p></article></div></section>
<section class="bloco"><header class="tit"><p class="k">Neocolagênese</p><h2>Como o Ultraformer III forma colágeno novo, aos poucos</h2></header><ol class="fases">${fases.map((f, i) => `<li><span class="n">${i + 1}</span><div><h3>${f.t}</h3><p class="q">${f.q}</p><p>${f.l.join(' · ')}</p></div></li>`).join('')}</ol></section></div>
` + cta() + rodape(v);
}

// ---------- A: Linho (creme, dourado #b19c73 do site, cinza quente da assinatura) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><div><p class="k">Agende uma consulta</p><h2>Viva bem com você e sua saúde</h2><p>Atendemos os principais convênios de saúde e particular.</p></div><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const listaProcs = (lst, gs) => gs.map(g => `<section class="grupo-a" id="${g.id}"><header class="grupo-tit"><h2>${g.t}</h2><p>${g.d}</p></header><div class="procs-a">${lst.filter(p => p.g === g.id).map(p => `<article class="proc-a sobe" id="${p.id}">${fig(p.f, p.t)}<div><h3>${p.t}</h3>${p.p.map(x => `<p>${x}</p>`).join('')}${chips(p.l)}${agendar(p)}</div></article>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Dermatologista em Maringá</p><h1>Seu bem‑estar em primeiro lugar</h1><p>Afinal, você bem faz toda a diferença. Dermatologia clínica, cirúrgica e estética com a Dra. Márcia Lima Polo, a partir de 12 anos de idade.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'procedimentos')}">Procedimentos</a></p></div>
<figure class="hero-a-foto">${img('hero-casal', 'Casal sorrindo', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="selos-a"><div class="in"><div><b>CRM 16.001</b><span>Dermatologista</span></div><div><b>SBD desde 1998</b><span>Sociedade Brasileira de Dermatologia</span></div><div><b>Paris</b><span>Especialização no Hospital Henri Mondor</span></div><div><b>Convênios</b><span>Principais planos e particular</span></div></div></section>
<section class="in dra-a"><div class="dra-a-fotos"><figure>${img('dra-marcia', 'Dra. Márcia Lima Polo')}</figure><figure>${img('clinica-fachada', 'Fachada da clínica')}</figure></div><div><p class="k">Dra. Márcia Lima Polo</p><h2>Dermatologia geral, da saúde da pele à estética</h2><p>Atende dermatologia geral a partir de 12 anos de idade, tanto as doenças de pele como a parte estética.</p><p>Sempre em busca de satisfação e bem-estar, investe em melhorias na infraestrutura da clínica e em novos cursos e produtos.</p><a class="link-seta" href="${link(v, 'sobre')}">Formação completa ${ic('seta')}</a></div></section>
<section class="procs-home-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Procedimentos</p><h2>Conheça os procedimentos que ofereço na clínica</h2></div><a class="link-seta" href="${link(v, 'procedimentos')}">Ver todos ${ic('seta')}</a></header><div class="cards-a">${procs.map(p => `<a class="card-a sobe" href="${link(v, 'procedimentos')}#${p.id}"><figure>${img(p.f, p.t)}</figure><h3>${p.t}</h3></a>`).join('')}<a class="card-a card-u sobe" href="${link(v, 'ultraformer')}"><figure>${img('u-ancoragem', 'Ultraformer III')}</figure><h3>Ultraformer III</h3></a></div></div></section>
<section class="tec-a"><div class="in tec-a-in"><figure>${img('laser-pele', 'Laser Lavieen')}</figure><div><p class="k">Tecnologia</p><h2>Laser Lavieen</h2>${lista(lavieen)}<a class="link-seta" href="${link(v, 'procedimentos')}#laser">Saiba mais ${ic('seta')}</a></div></div></section>
<section class="tec-a tec-a-inv"><div class="in tec-a-in"><div><p class="k">Ultraformer III</p><h2>A tecnologia definitiva para gordura localizada e flacidez</h2>${lista(ultraLista.slice(0, 6))}<a class="link-seta" href="${link(v, 'ultraformer')}">Conheça o Ultraformer ${ic('seta')}</a></div><figure class="u-aparelho">${img('ultraformer-aparelho', 'Aparelho Ultraformer III')}</figure></div></section>
<section class="in local-a"><div><p class="k">A clínica</p><h2>Av. Luís Teixeira, 2370, Zona 05</h2><ul class="contato-lista"><li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro}</span></div></li><li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li><li>${icWa()}<div><strong>WhatsApp e telefone</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.fone}</a></div></li></ul></div>${mapa()}</section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, listaProcs);
  return pag;
}

// ---------- B: Café (marrom escuro da faixa do site, dourado e a assinatura em ouro) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><img src="/assets/assinatura-clara.svg" alt="" width="390" height="50"><h2>Agende sua consulta</h2><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha-clara" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const listaProcs = (lst, gs) => gs.map(g => `<section class="grupo-b" id="${g.id}"><header class="grupo-tit"><h2>${g.t}</h2><p>${g.d}</p></header><div class="procs-b">${lst.filter(p => p.g === g.id).map((p, i) => `<article class="proc-b sobe${i % 2 ? ' inv' : ''}" id="${p.id}">${fig(p.f, p.t)}<div><span class="num">${String(procs.indexOf(p) + 1).padStart(2, '0')}</span><h3>${p.t}</h3>${p.p.map(x => `<p>${x}</p>`).join('')}${chips(p.l)}${agendar(p)}</div></article>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b">${img('hero-ambiente', '', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><img class="hero-b-ass" src="/assets/assinatura-ouro.svg" alt="Dra. Márcia Polo" width="390" height="50"><p class="k">Dermatologista · Maringá</p><h1>${frase}</h1><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'procedimentos')}">Procedimentos</a></p></div></section>
<section class="in dra-b"><figure>${img('dra-marcia', 'Dra. Márcia Lima Polo')}</figure><div><p class="k">CRM 16.001 PR</p><h2>Dra. Márcia Lima Polo</h2><p class="lead">Dermatologista pela Santa Casa de Curitiba, com especialização em Paris e membro da Sociedade Brasileira de Dermatologia desde 1998.</p><p>Unindo a formação em clínica geral à dermatologia, traz melhores resultados nos tratamentos. Atende a partir de 12 anos de idade, das doenças de pele à estética.</p><a class="link-seta" href="${link(v, 'sobre')}">Sobre a Dra. Márcia ${ic('seta')}</a></div></section>
<section class="lista-b"><div class="in"><header class="tit"><p class="k">Procedimentos</p><h2>O que a clínica oferece</h2></header><div class="lista-b-grade">${procs.map((p, i) => `<a class="item-b sobe" href="${link(v, 'procedimentos')}#${p.id}"><figure>${img(p.f, p.t)}</figure><span class="num">${String(i + 1).padStart(2, '0')}</span><b>${p.t}</b></a>`).join('')}<a class="item-b sobe" href="${link(v, 'ultraformer')}"><figure>${img('u-neocolagenese', 'Ultraformer III')}</figure><span class="num">08</span><b>Ultraformer III</b></a></div></div></section>
<section class="u-b"><div class="in u-b-in"><div><p class="k">Ultraformer III</p><h2>Lifting sem cirurgia, flacidez e gordura localizada</h2><p>Ultrassom micro e macrofocado: a mais recente tecnologia HIFU, para o rosto e para o corpo.</p><div class="pilares-b">${pilares.map(p => `<div><b>${p.t}</b><span>${p.d}</span></div>`).join('')}</div><a class="btn" href="${link(v, 'ultraformer')}">Conheça o Ultraformer</a></div><figure>${img('ultraformer-aparelho', 'Aparelho Ultraformer III')}</figure></div></section>
<section class="in lavieen-b"><figure>${img('p-laser', 'Laser Lavieen')}</figure><div><p class="k">Tecnologia</p><h2>Laser Lavieen</h2>${lista(lavieen)}</div></section>
<section class="local-b"><div class="in local-b-in"><figure>${img('clinica-fachada', 'Fachada da clínica')}</figure><div><p class="k">A clínica</p><h2>Zona 05, Maringá</h2><p>${E.rua}<br>${E.bairro}</p><p>${E.horario}</p><p>Atendemos os principais convênios de saúde e particular.</p><a class="link-seta" href="${link(v, 'contato')}">Contato e mapa ${ic('seta')}</a></div></div></section>
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
  nome: 'Dra. Márcia Polo', artigo: 'da', url: E.url, lang: 'pt', cor: '#b19c73', fundo: '#2a211c', claro: '#f8f5ef',
  fonteTitulo: 'Marcellus,Georgia,serif', fonteTexto: 'Lato,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em creme e dourado, com a assinatura da Dra. Márcia: procedimentos em cards, Laser Lavieen e Ultraformer em destaque.', pontos: ['7 procedimentos e o Ultraformer', 'Formação e convênios à vista', 'Consulta pelo WhatsApp em um toque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura e acolhedora, no marrom da faixa do site atual, com a assinatura em dourado e as tecnologias da clínica.', pontos: ['Assinatura em dourado', 'Página própria do Ultraformer III', 'Mapa e horários da clínica'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
