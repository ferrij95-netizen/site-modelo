// CEPEP Escola Técnica (Fortaleza/CE). Gera public/{a,b}/ e a página de escolha.
// node clientes/cepep/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs cepep http://www.cepepescolatecnica.com.br/)
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const cursos = JSON.parse(fs.readFileSync(path.join(aqui, 'cursos.json'), 'utf8'));
const E = {
  nome: 'CEPEP Escola Técnica', url: 'https://cepep.overtus.com.br/', antigo: 'http://www.cepepescolatecnica.com.br/',
  fone: '(85) 3214-1111', wa: '5585997954500', waTxt: '(85) 99795-4500', email: 'reservastec@cepep.com.br',
  rua: 'Av. da Universidade, 3232', bairro: 'Benfica', cidade: 'Fortaleza - CE',
  horario: [['Segunda a sexta', '7h30 às 21h'], ['Sábado', '7h30 às 18h']],
  faculdade: { nome: 'Faculdade CEPEP', fone: '(85) 3771-9322', url: 'http://faculdadecepep.com.br/' },
  profissionalizantes: 'https://cepepprofissionalizantes.com.br/', online: 'http://tdssoft.web1476ft.kinghost.net/online/menuprincipal.aspx',
  video: 'https://www.youtube.com/watch?v=EJ9xIriMjVU', estagioCadastro: 'http://177.19.133.162:8080/fortesrh/externo/prepareLogin.action?empresaId=4',
  escola: ['O CEPEP é uma instituição particular de ensino técnico e profissionalizante na área tecnológica, tendo como foco principal a inserção de jovens e adultos no mercado de trabalho, através da educação profissionalizante e do técnico pós-médio. Hoje, com reconhecidos resultados alcançados.',
    'Atualmente o CEPEP está presente em quase todos os estados do Nordeste, formando uma rede de escolas técnicas conveniadas em suas estruturas pedagógicas, com o objetivo de levar um excelente padrão de ensino técnico e profissionalizante para todas as unidades. Uma experiência pioneira, de excelentes resultados, em toda a rede CEPEP.'],
  estagio: 'O estágio é uma oportunidade para que estudantes dos cursos técnicos possam vivenciar as atividades profissionais relacionadas à sua área de estudos. Com isso, os estagiários podem relacionar o conhecimento obtido nos bancos escolares com a prática da futura profissão.',
};
const filiais = ['Av. da Universidade', 'Benfica', 'Praça da Bandeira', 'General Sampaio', '24 de Maio', 'Duque de Caxias', 'Horizonte'];
const numeros = [['25', 'anos no mercado', 'ic-25anos'], ['15', 'cursos técnicos', 'ic-tecnicos'], ['34', 'cursos profissionalizantes', 'ic-profissionalizantes'], ['+100 mil', 'alunos formados', 'ic-alunos']];
const depoimentos = [
  { t: 'Agradeço a todos os professores e à escola CEPEP pela preparação para o mercado de trabalho e por me fazer acreditar em um sonho profissional.', n: 'Thayse Farias' },
  { t: 'Agradeço ao CEPEP e à Ivone pela oportunidade e desejo sucesso a todos os alunos que venham a fazer o curso e que nunca desistam de seus ideais.', n: 'Marcio Gomes' },
  { t: 'Agradeço à Escola CEPEP por ter aberto as portas para nós. Para o futuro espero uma vida melhor para mim e para minha família. Sou um dos contratados da empresa TotalWind.', n: 'Antonio José' },
];
const parceiros = [['top', 'Top Company RH'], ['iel', 'IEL'], ['ideprh', 'IDEP RH'], ['ciee', 'CIEE'], ['nube', 'Nube'], ['vikon', 'Vikon']];
const documentos = ['Certidão de nascimento', 'Certificado e histórico escolar do ensino médio', 'Comprovante de endereço', 'Título de eleitor', 'Identidade', 'CPF', 'Alistamento militar', 'Foto 3x4'];
const areas = ['Indústria', 'Construção', 'Gestão e negócios', 'Tecnologia', 'Segurança e meio ambiente'];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'escola', nome: 'A Escola' }, { slug: 'cursos', nome: 'Cursos' }, { slug: 'programacao', nome: 'Programação dos cursos' }, { slug: 'estagios', nome: 'Estágios' }, { slug: 'contato', nome: 'Contatos' }];
export const nomesVersao = { a: 'Azul CEPEP', b: 'Chegue na Frente' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Russo+One&family=Inter:wght@400;500;600;700&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site do CEPEP Escola Técnica e tenho interesse em um curso técnico.') => waHref(E.wa, m);
const waCurso = c => wa(`Olá! Vim pelo site do CEPEP e tenho interesse no curso Técnico em ${c.nome}.`);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Cursos técnicos em Fortaleza` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#13007c' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lC = (v, c) => `/${v}/cursos/${c.slug}/`;
const blocos = bs => {
  let h = '', lista = false;
  for (const b of bs) {
    if (b.li && !lista) { h += '<ul class="lista-check">'; lista = true; }
    if (!b.li && lista) { h += '</ul>'; lista = false; }
    h += b.li ? `<li>${esc(b.li)}</li>` : `<p>${esc(b.p)}</p>`;
  }
  return h + (lista ? '</ul>' : '');
};
const resumo = c => {
  const p = c.atividades.find(b => b.p && b.p.length > 60) || c.mercado.find(b => b.p);
  if (p) { const t = p.p; const i = t.indexOf('.', 80); return i > 0 && i < 220 ? t.slice(0, i + 1) : t.slice(0, 180).replace(/\s\S*$/, '') + '…'; }
  const li = c.atividades.filter(b => b.li).slice(0, 2).map(b => b.li);
  return li.length ? li.join('; ') + '.' : `Formação técnica em ${c.nome} com ${c.disciplinas.length} disciplinas.`;
};
const fichaCurso = c => `<dl class="ficha">${c.duracao ? `<div><dt>Duração</dt><dd>${c.duracao}</dd></div>` : ''}${c.carga ? `<div><dt>Carga horária</dt><dd>${c.carga}</dd></div>` : ''}<div><dt>Disciplinas</dt><dd>${c.disciplinas.length}</dd></div>${c.turnos ? `<div><dt>Turnos</dt><dd>${c.turnos}</dd></div>` : ''}</dl>`;
const formulario = (curso = '') => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <label>Curso de interesse<select name="curso" required><option value="">Escolha o curso</option>${cursos.map(c => `<option${c.nome === curso ? ' selected' : ''}>Técnico em ${c.nome}</option>`).join('')}<option>Outro / ainda não sei</option></select></label>
  <label>Turno preferido<select name="turno"><option>Manhã</option><option>Noite</option><option>Sábado e domingo</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pré-inscrição pelo WhatsApp</button>
  <p class="form-nota">A pré-inscrição não garante vaga nos cursos.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Cursos técnicos</strong><span>${E.rua}, ${E.bairro}, ${E.cidade}</span></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" target="_blank" rel="noopener">${E.waTxt}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong>${E.horario.map(h => `<span>${h[0]}: ${h[1]}</span>`).join('')}</div></li>
  <li>${ic('capelo')}<div><strong>${E.faculdade.nome}</strong><span>${E.rua}, ${E.bairro} · <a href="${telHref(E.faculdade.fone)}">${E.faculdade.fone}</a></span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa do CEPEP" loading="lazy" src="https://maps.google.com/maps?q=Av.%20da%20Universidade%2C%203232%2C%20Benfica%2C%20Fortaleza%20CE&z=16&output=embed"></iframe>`;
const parceirosHtml = cls => `<ul class="${cls}">${parceiros.map(p => `<li><img src="/assets/img/parceiros/${p[0]}.webp" alt="${p[1]}" loading="lazy"></li>`).join('')}</ul>`;

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="CEPEP Escola Técnica" width="276" height="110"><img class="selo" src="/assets/selo-25.webp" alt="25 anos" width="84" height="108"></a>
    <div class="topo-dados"><p><small>Cursos técnicos</small><a href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.waTxt}</a></p><p><small>Contatos</small><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></p></div>
    ${btnMenu}
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in menu-in"><ul>${menuItens(v, nav, slug)}</ul><p class="menu-ext"><a class="m-verde" href="${E.online}" target="_blank" rel="noopener">CEPEP Online</a><a class="m-verm" href="${E.faculdade.url}" target="_blank" rel="noopener">Faculdade</a></p></div></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="CEPEP Escola Técnica" width="276" height="110"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), slug)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Pré-inscrição</a>
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
    <div class="rod-marca"><img src="/assets/logo-rodape.webp" alt="CEPEP Escola Técnica" width="200" height="80" loading="lazy"><p>Ensino técnico e profissionalizante para jovens e adultos entrarem no mercado de trabalho. Há 25 anos em Fortaleza, com mais de 100 mil alunos formados.</p></div>
    <div><h3>Navegação</h3><ul>${nav.filter(n => n.slug !== 'index').map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}<li><a href="${E.profissionalizantes}" target="_blank" rel="noopener">Cursos profissionalizantes</a></li><li><a href="${E.online}" target="_blank" rel="noopener">CEPEP Online</a></li></ul></div>
    <div><h3>Cursos técnicos</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.waTxt}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    </ul></div>
    <div><h3>${E.faculdade.nome}</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li><li>${ic('tel')}<a href="${telHref(E.faculdade.fone)}">${E.faculdade.fone}</a></li><li>${ic('ext')}<a href="${E.faculdade.url}" target="_blank" rel="noopener">faculdadecepep.com.br</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} CEPEP Cursos Técnicos. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function paginaCurso(v, c) {
  const outros = cursos.filter(o => o.area === c.area && o.slug !== c.slug).concat(cursos.filter(o => o.area !== c.area)).slice(0, 4);
  const corpo = `<article class="curso">
  <div class="curso-txt">
    ${c.atividades.length ? `<section><h2>O que faz o técnico</h2>${blocos(c.atividades)}</section>` : ''}
    ${c.mercado.length ? `<section><h2>Mercado de trabalho</h2>${blocos(c.mercado)}</section>` : ''}
    <section><h2>Disciplinas</h2><ol class="disciplinas">${c.disciplinas.map(d => `<li>${esc(d)}</li>`).join('')}</ol></section>
    <section><h2>Documentação para matrícula</h2><p>Cópias de:</p><ul class="lista-check docs">${documentos.map(d => `<li>${d}</li>`).join('')}</ul></section>
  </div>
  <aside class="curso-lado">
    <figure>${img('cursos/' + c.img, 'Técnico em ' + c.nome)}</figure>
    ${fichaCurso(c)}
    <div class="curso-form"><h2>Pré-inscrição</h2>${formulario(c.nome)}</div>
  </aside>
</article>
<section class="outros"><h2>Outros cursos técnicos</h2><ul>${outros.map(o => `<li><a href="${lC(v, o)}">${img('cursos/' + o.img, '')}<span>${o.nome}</span></a></li>`).join('')}</ul></section>`;
  const desc = `Curso Técnico em ${c.nome} no CEPEP, Fortaleza. ${resumo(c)}`;
  if (v === 'a') return head(v, 'cursos', `Técnico em ${c.nome}`, desc) + topo(v, 'cursos') + `
<div class="in"><p class="trilha"><a href="${link(v, 'index')}">Início</a> / <a href="${link(v, 'cursos')}">Cursos técnicos</a> / ${c.nome}</p>
<header class="tit-a"><h1>Técnico em ${c.nome}</h1></header>
${corpo}</div>
` + rodape(v);
  return head(v, 'cursos', `Técnico em ${c.nome}`, desc) + topo(v, 'cursos') + `
<section class="curso-topo"><div class="in curso-topo-in"><div><p class="trilha"><a href="${link(v, 'cursos')}">Cursos técnicos</a> · ${c.area}</p><h1>Técnico em ${c.nome}</h1><p>${resumo(c)}</p><p class="bts"><a class="btn" href="${waCurso(c)}" target="_blank" rel="noopener">${icWa()}Quero me inscrever</a></p></div>${img('cursos/' + c.img, 'Técnico em ' + c.nome, ' loading="eager"')}</div></section>
<div class="in">${corpo}</div>
` + rodape(v);
}

const progTabela = () => `<div class="tabela-rola"><table class="prog">
  <thead><tr><th>Curso técnico</th><th>Dias e turnos</th><th>Duração</th><th>Carga</th><th></th></tr></thead>
  <tbody>${cursos.filter(c => c.carga).map(c => `<tr><th scope="row">${c.nome}</th><td>${c.turnos}</td><td>${c.duracao || 'A confirmar'}</td><td>${c.carga}</td><td><a href="${waCurso(c)}" target="_blank" rel="noopener">Pré-inscrição</a></td></tr>`).join('')}</tbody>
</table></div>`;

function A() {
  const v = 'a', pag = {};
  const tit = (t, sub = '') => `<header class="tit-a"><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</header>`;
  const gradeCursos = `<ul class="cursos-a">${cursos.map(c => `<li class="sobe"><a href="${lC(v, c)}">${img('cursos/' + c.img, 'Técnico em ' + c.nome)}<span>${c.nome}</span></a></li>`).join('')}</ul>`;
  pag.index = head(v, 'index', '', E.escola[0]) + topo(v, 'index') + `
<section class="banner-a" data-carrossel aria-label="Destaques">
  <a class="slide ativo" href="${link(v, 'cursos')}">${img('banner-15-cursos', '15 cursos técnicos. Aqui você chega na frente. Mais de 100 mil alunos formados.', ' loading="eager" fetchpriority="high"')}</a>
  <a class="slide" href="${link(v, 'contato')}">${img('banner-matricule-se', 'Matricule-se sem sair de casa. Condições especiais.')}</a>
  <button class="car-ant" data-ant aria-label="Anterior">${ic('seta')}</button><button class="car-prox" data-prox aria-label="Próximo">${ic('seta')}</button>
</section>
<section class="in bloco-a"><h2 class="tit-linha">Cursos Técnicos</h2>${gradeCursos}</section>
<section class="numeros-a"><div class="in"><h2>CEPEP em números</h2><ul>${numeros.map(n => `<li><img src="/assets/img/${n[2]}.webp" alt="" loading="lazy"><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></div></section>
<section class="in duas-a">
  <div><h2 class="tit-linha">Vídeos</h2><a class="video-a" href="${E.video}" target="_blank" rel="noopener">${img('video', 'Vídeo CEPEP Escola Técnica: o seu futuro começa agora')}<span>${ic('yt')}</span></a><p class="video-leg">CEPEP Escola Técnica: "O seu futuro começa agora"</p></div>
  <div><h2 class="tit-linha">Depoimentos</h2><div class="depo-a" data-carrossel>${depoimentos.map((d, i) => `<blockquote class="slide${i ? '' : ' ativo'}"><p>"${d.t}"</p><footer>${d.n} · Fortaleza, CE</footer></blockquote>`).join('')}<div class="pontos"></div></div></div>
</section>
<section class="parceiros-a"><div class="in"><h2 class="tit-linha">Nossos parceiros de estágios</h2>${parceirosHtml('parc-a')}</div></section>
` + rodape(v);

  pag.escola = head(v, 'escola', 'A Escola', E.escola[0]) + topo(v, 'escola') + `<div class="in">${tit('A Escola')}
<section class="texto-a"><div>${E.escola.map(t => `<p>${t}</p>`).join('')}<p>Os cursos técnicos funcionam na ${E.rua}, no ${E.bairro}, com turmas também nas filiais ${filiais.slice(2).join(', ')}.</p></div><aside><img src="/assets/selo-25.webp" alt="CEPEP 25 anos" width="84" height="108"><ul>${numeros.map(n => `<li><b>${n[0]}</b> ${n[1]}</li>`).join('')}</ul></aside></section></div>
<section class="numeros-a"><div class="in"><h2>CEPEP em números</h2><ul>${numeros.map(n => `<li><img src="/assets/img/${n[2]}.webp" alt="" loading="lazy"><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></div></section>
` + rodape(v);

  pag.cursos = head(v, 'cursos', 'Cursos técnicos', `Os 15 cursos técnicos do CEPEP em Fortaleza: ${cursos.map(c => c.nome).join(', ')}.`) + topo(v, 'cursos') + `<div class="in">${tit('Cursos Técnicos', 'Técnico pós-médio, com turmas de segunda a sexta e nos fins de semana.')}
${areas.map(a => `<section class="area-a"><h2>${a}</h2><ul class="cursos-a">${cursos.filter(c => c.area === a).map(c => `<li><a href="${lC(v, c)}">${img('cursos/' + c.img, 'Técnico em ' + c.nome)}<span>${c.nome}</span></a></li>`).join('')}</ul></section>`).join('')}</div>
` + rodape(v);
  for (const c of cursos) pag[`cursos/${c.slug}`] = paginaCurso(v, c);

  pag.programacao = head(v, 'programacao', 'Programação dos cursos', 'Dias, turnos, duração e carga horária dos cursos técnicos do CEPEP.') + topo(v, 'programacao') + `<div class="in">${tit('Programação dos cursos', `Disponível nas filiais Praça da Bandeira, Av. da Universidade, General Sampaio e Benfica · <a href="${telHref(E.fone)}">${E.fone}</a>`)}
<section class="caixa-a">${progTabela()}</section>
<section class="caixa-a"><h2>Documentação para matrícula</h2><p>Cópias de:</p><ul class="lista-check docs">${documentos.map(d => `<li>${d}</li>`).join('')}</ul></section></div>
` + rodape(v);

  pag.estagios = head(v, 'estagios', 'Estágios', E.estagio) + topo(v, 'estagios') + `<div class="in">${tit('Estágios')}
<section class="caixa-a estagio-a"><p>${E.estagio}</p><a class="btn" href="${E.estagioCadastro}" target="_blank" rel="noopener">${ic('ext')}Cadastre-se para se candidatar a uma vaga de estágio</a></section>
<section class="caixa-a"><h2>Nossos parceiros de estágios</h2>${parceirosHtml('parc-a')}</section></div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contatos', `Fale com o CEPEP: ${E.fone}, WhatsApp ${E.waTxt}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + `<div class="in">${tit('Contatos')}
<section class="contato-a"><div class="caixa-a"><h2>Pré-inscrição</h2>${formulario()}</div><div class="caixa-a">${contatoLista()}</div></section>
<section class="caixa-a">${mapaFrame}</section></div>
` + rodape(v);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const sub = (k, t, d) => `<section class="sub-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cartao = c => `<li class="sobe" data-area="${c.area}"><a href="${lC(v, c)}"><figure>${img('cursos/' + c.img, 'Técnico em ' + c.nome)}</figure><div><small>${c.area}</small><strong>${c.nome}</strong><span>${[c.duracao, c.carga].filter(Boolean).join(' · ') || `${c.disciplinas.length} disciplinas`}</span></div></a></li>`;
  const nums = `<section class="nums-b"><div class="in nums-b-in">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>`;
  pag.index = head(v, 'index', '', E.escola[0]) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Escola técnica em Fortaleza · 25 anos</p><h1>Aqui você <em>chega na frente</em></h1><p>15 cursos técnicos pós-médio para entrar no mercado de trabalho, com turmas de manhã, à noite e nos fins de semana.</p><p class="bts"><a class="btn" href="${link(v, 'cursos')}">Ver os 15 cursos</a><a class="btn btn-linha" href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.waTxt}</a></p></div>
  <div class="hero-b-mosaico">${['mecatronica', 'edificacoes', 'seguranca-do-trabalho', 'informatica'].map(s => img('cursos/' + s, '', ' loading="eager"')).join('')}<span class="hero-b-selo"><b>+100 mil</b>alunos formados</span></div>
</div></section>
${nums}
<section class="in cursos-b-sec"><header class="tit-b"><p class="k">Cursos técnicos</p><h2>Escolha a sua área</h2></header>
  <div class="filtro-b" role="group" aria-label="Filtrar por área"><button class="ativo" data-filtro="">Todos</button>${areas.map(a => `<button data-filtro="${a}">${a}</button>`).join('')}</div>
  <ul class="cursos-b">${cursos.map(cartao).join('')}</ul>
</section>
<section class="como-b"><div class="in como-b-in">
  <div><p class="k">Como entrar</p><h2>Pré-inscrição em três passos</h2></div>
  <ol><li><b>1</b><span><strong>Escolha o curso e o turno</strong>Manhã, noite ou sábado e domingo.</span></li><li><b>2</b><span><strong>Faça a pré-inscrição</strong>Pelo site ou pelo WhatsApp ${E.waTxt}.</span></li><li><b>3</b><span><strong>Traga a documentação</strong>Cópias de RG, CPF, histórico do ensino médio e mais.</span></li></ol>
</div></section>
<section class="in depo-b"><header class="tit-b"><p class="k">Depoimentos</p><h2>Quem passou pelo CEPEP</h2></header><div class="depo-b-grade">${depoimentos.map(d => `<blockquote class="sobe"><p>${d.t}</p><footer><b>${d.n}</b>Fortaleza, CE</footer></blockquote>`).join('')}</div></section>
<section class="in video-b"><a href="${E.video}" target="_blank" rel="noopener">${img('video', 'Vídeo CEPEP Escola Técnica')}<span>${ic('yt')}Assistir: "O seu futuro começa agora"</span></a><div><p class="k">Estágios</p><h2>Do curso para o estágio</h2><p>${E.estagio}</p>${parceirosHtml('parc-b')}<a class="link-seta" href="${link(v, 'estagios')}">Como funciona ${ic('seta')}</a></div></section>
` + rodape(v);

  pag.escola = head(v, 'escola', 'A Escola', E.escola[0]) + topo(v, 'escola') + sub('A Escola', 'Ensino técnico que leva ao mercado de trabalho', 'Instituição particular de ensino técnico e profissionalizante na área tecnológica.') + `
<section class="in texto-b"><div>${E.escola.map(t => `<p>${t}</p>`).join('')}</div><aside><h2>Onde estamos</h2><p>Cursos técnicos na ${E.rua}, ${E.bairro}. Turmas também nas filiais:</p><ul class="lista-check">${filiais.slice(2).map(f => `<li>${f}</li>`).join('')}</ul></aside></section>
${nums}
` + rodape(v);

  pag.cursos = head(v, 'cursos', 'Cursos técnicos', `Os 15 cursos técnicos do CEPEP em Fortaleza: ${cursos.map(c => c.nome).join(', ')}.`) + topo(v, 'cursos') + sub('Cursos técnicos', '15 cursos, cinco áreas', 'Técnico pós-médio com turmas de segunda a sexta e nos fins de semana.') + `
<section class="in cursos-b-sec"><div class="filtro-b" role="group" aria-label="Filtrar por área"><button class="ativo" data-filtro="">Todos</button>${areas.map(a => `<button data-filtro="${a}">${a}</button>`).join('')}</div><ul class="cursos-b">${cursos.map(cartao).join('')}</ul></section>
` + rodape(v);
  for (const c of cursos) pag[`cursos/${c.slug}`] = paginaCurso(v, c);

  pag.programacao = head(v, 'programacao', 'Programação dos cursos', 'Dias, turnos, duração e carga horária dos cursos técnicos do CEPEP.') + topo(v, 'programacao') + sub('Programação dos cursos', 'Dias, turnos e carga horária', 'Disponível nas filiais Praça da Bandeira, Av. da Universidade, General Sampaio e Benfica.') + `
<section class="in prog-b">${progTabela()}</section>
<section class="in docs-b"><h2>Documentação para matrícula</h2><p>Cópias de:</p><ul class="lista-check docs">${documentos.map(d => `<li>${d}</li>`).join('')}</ul></section>
` + rodape(v);

  pag.estagios = head(v, 'estagios', 'Estágios', E.estagio) + topo(v, 'estagios') + sub('Estágios', 'A prática da futura profissão', E.estagio) + `
<section class="in estagio-b"><div><h2>Candidate-se a uma vaga</h2><p>Alunos dos cursos técnicos podem se cadastrar no banco de vagas de estágio do CEPEP.</p><a class="btn" href="${E.estagioCadastro}" target="_blank" rel="noopener">${ic('ext')}Cadastrar para estágio</a></div><div><h2>Parceiros de estágios</h2>${parceirosHtml('parc-b')}</div></section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contatos', `Fale com o CEPEP: ${E.fone}, WhatsApp ${E.waTxt}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + sub('Contatos', 'Faça sua pré-inscrição', 'Responderemos pelo WhatsApp com turmas, horários e condições.') + `
<section class="in contato-b"><div class="contato-b-form"><h2>Pré-inscrição</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section>
` + rodape(v);
  return pag;
}

copiarSiteJs(pub, E.wa);
fs.writeFileSync(path.join(pub, 'assets/filtro.js'), `document.querySelectorAll('.filtro-b').forEach(g=>{const l=g.nextElementSibling;g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(x=>x.classList.toggle('ativo',x===b));l.querySelectorAll('li').forEach(li=>{li.hidden=!!b.dataset.filtro&&li.dataset.area!==b.dataset.filtro})})});\n`);
const comFiltro = p => Object.fromEntries(Object.entries(p).map(([k, h]) => [k, h.includes('filtro-b') ? h.replace('</body>', '<script src="/assets/filtro.js" defer></script>\n</body>') : h]));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', comFiltro(B()));
await escolha(pub, {
  nome: E.nome, artigo: 'do', url: E.url, lang: 'pt', cor: '#e3141b', fundo: '#0b0a4a', claro: '#f3f4fa',
  fonteTitulo: "'Russo One',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + cursos.length, texto: 'Fiel ao site atual: logo com o selo de 25 anos, barra de menu azul, os banners, a grade de fotos dos 15 cursos, CEPEP em números, depoimentos e parceiros de estágio.', pontos: ['Uma página completa para cada curso técnico', 'Tabela de programação com turnos e carga horária', 'Pré-inscrição pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + cursos.length, texto: 'Mais moderna: "Aqui você chega na frente" na abertura, cursos separados por área com filtro, os três passos da pré-inscrição e os depoimentos dos alunos.', pontos: ['Filtro dos cursos por área', 'Duração e carga horária em cada cartão', 'Botão de pré-inscrição em todas as páginas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
