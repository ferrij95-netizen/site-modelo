// Versão B, "Plantão": mesma marca, cores e fontes da A, mas escura por padrão, como a tela de um monitor
// à noite. Capítulos numerados, índice lateral nas subpáginas e folhas brancas de documentação.
import { site, nav, specs, passos, solucoes, recursosPlataforma, specsPlataforma, fichaSensor, seguranca, valores } from './conteudo.mjs';
import { marca, desenhoTopo, desenhoLado, monitor, painel } from './pecas.mjs';
import { documento } from './comum.mjs';

const V = 'b';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;
const num = i => String(i + 1).padStart(2, '0');

const header = slug => `<header class="barra">
  <a class="barra-marca" href="${L('index')}" aria-label="DHT, início">${marca()}</a>
  <nav class="barra-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n], i) => `<a href="${L(s)}"${s === slug ? ' aria-current="page"' : ''}><small>${num(i)}</small>${n}</a>`).join('\n    ')}
  </nav>
  <a class="pilula pilula-clara barra-cta" href="${L('contato')}">Agendar demonstração</a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu>Menu</button>
</header>`;

const footer = () => `<footer class="rodape">
  <div class="rodape-palavra" aria-hidden="true">DHT</div>
  <div class="rodape-linhas">
    <div class="rodape-grupo"><h2>Produto</h2><a href="${L('plataforma')}">Plataforma</a><a href="${L('sensor')}">Sensor</a><a href="${L('seguranca')}">Segurança</a></div>
    <div class="rodape-grupo"><h2>Soluções</h2>${solucoes.map(([id, n]) => `<a href="${L('solucoes')}#${id}">${n}</a>`).join('')}</div>
    <div class="rodape-grupo"><h2>DHT</h2><a href="${L('empresa')}">Empresa</a><a href="${L('contato')}">Contato</a><a href="mailto:${site.email}">${site.email}</a></div>
    <div class="rodape-grupo"><h2>Proposta</h2><a href="/">Ver as duas versões</a><a href="/a/">Versão A</a></div>
  </div>
  <div class="rodape-base"><span>© 2026 DHT · ${site.tagline}</span><span>${site.cidade}</span></div>
</footer>`;

const grade = lista => `<dl class="grade-specs">${lista.map(([v, r]) => `<div><dd>${v}</dd><dt>${r}</dt></div>`).join('')}</dl>`;

const cta = (titulo = 'Veja a DHT funcionando na sua ala.') => `<section class="folha cta">
  <p class="rotulo">Próximo passo</p>
  <h2 class="display-m">${titulo}</h2>
  <div class="cta-acoes"><a class="pilula" href="${L('contato')}">Agendar demonstração</a><a class="sublinhado" href="mailto:${site.email}">${site.email}</a></div>
</section>`;

// Subpáginas: índice fixo à esquerda com as seções da página.
const sub = (i, nome, titulo, lead, secoes, html) => `
<section class="sub-cab">
  <span class="sub-num" aria-hidden="true">${num(i)}</span>
  <div><p class="rotulo">${nome}</p><h1 class="display-m">${titulo}</h1><p class="lead">${lead}</p></div>
</section>
<div class="sub-corpo">
  <aside class="indice" aria-label="Nesta página"><p class="rotulo">Nesta página</p>${secoes.map(([id, n]) => `<a href="#${id}">${n}</a>`).join('')}</aside>
  <div class="sub-conteudo">${html}</div>
</div>`;

const pag = {
  index: () => `
<section class="abertura">
  <div class="abertura-monitor">${monitor('monitor-fundo')}</div>
  <div class="abertura-texto">
    <h1 class="display">Sinais vitais, sem pausa.</h1>
    <div class="abertura-lado">
      <p>Sensor de braço e plataforma clínica que acompanham cada paciente 24 horas por dia e avisam a equipe antes que o quadro piore.</p>
      <div class="acoes"><a class="pilula pilula-clara" href="${L('contato')}">Agendar demonstração</a><a class="sublinhado" href="${L('plataforma')}">Ver a plataforma</a></div>
    </div>
  </div>
</section>
<nav class="sumario" aria-label="Capítulos">
  ${nav.slice(0, 5).map(([s, n], i) => `<a href="${L(s)}"><span>${num(i)}</span>${n}</a>`).join('\n  ')}
</nav>
<section class="folha folha-produto">
  <div class="folha-cab"><p class="rotulo">Ficha 01 · Sensor DHT</p><h2 class="titulo-ed">Dezoito gramas, cinco sinais vitais, uma semana de bateria.</h2></div>
  <figure class="folha-desenho">${desenhoTopo()}</figure>
  ${grade(specs)}
</section>
<section class="passos-b">
  <p class="rotulo">Como funciona</p>
  ${passos.map(([t, d], i) => `<div class="passo"><span class="passo-num">${num(i)}</span><h2 class="display-s">${t}</h2><p>${d}</p></div>`).join('\n  ')}
</section>
<section class="tela">
  <div class="tela-cab"><p class="rotulo">Plataforma</p><h2 class="media">Uma ala inteira em uma tela.</h2><p>Todos os leitos ao mesmo tempo. Só quem precisa de atenção agora fica em destaque.</p></div>
  ${painel()}
</section>
<section class="paineis">
  <p class="rotulo">Para quem</p>
  <div class="paineis-grade">${solucoes.map(([id, n, d], i) => `<a class="painel-sol" href="${L('solucoes')}#${id}"><span class="rotulo">${num(i)}</span><h2 class="media">${n}</h2><p>${d}</p><span class="seta" aria-hidden="true">→</span></a>`).join('')}</div>
</section>
${cta()}`,

  plataforma: () => sub(0, 'Plataforma', 'O plantão inteiro, em uma tela.', 'A plataforma recebe os sinais de cada sensor, calcula o risco de cada paciente e organiza o trabalho da equipe por prioridade.',
    [['painel', 'Painel da ala'], ['recursos', 'Recursos'], ['tecnico', 'Ficha técnica']], `
<section id="painel" class="bloco">${painel()}<p class="legenda">Painel da ala 3B: oito leitos, um em alerta (NEWS2 6). Dados fictícios.</p></section>
<section id="recursos" class="bloco linhas">${recursosPlataforma.map(([t, d], i) => `<div class="linha"><span class="rotulo">${num(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</section>
<section id="tecnico" class="folha bloco">${grade(specsPlataforma)}<p class="corpo-g">Nada para instalar no hospital: o painel abre no navegador e o app da equipe roda em iOS e Android. Integração com o prontuário por HL7 FHIR.</p></section>`) + cta(),

  sensor: () => sub(1, 'Sensor', 'Dezoito gramas de vigilância.', 'Cinco sinais vitais a cada segundo, uma semana com uma carga, e pode ir ao banho com o paciente.',
    [['desenho', 'Desenho técnico'], ['ficha', 'Ficha técnica'], ['sinais', 'Sinais ao vivo'], ['colocar', 'Como colocar']], `
<section id="desenho" class="folha bloco folha-dupla"><figure>${desenhoTopo()}</figure><figure>${desenhoLado()}</figure></section>
<section id="ficha" class="bloco linhas">${fichaSensor.map(([k, v]) => `<div class="linha linha-ficha"><h3>${k}</h3><p>${v}</p></div>`).join('')}</section>
<section id="sinais" class="bloco">${monitor()}<p class="legenda">Leitura simulada de um paciente estável.</p></section>
<section id="colocar" class="bloco linhas">${[['Encaixar', 'Prender o sensor na pulseira até ouvir o clique.'], ['Ajustar', 'Fechar a pulseira no braço, dois dedos acima do cotovelo.'], ['Vincular', 'Ler o código do leito no app da equipe. Pronto.']].map(([t, d], i) => `<div class="linha"><span class="rotulo">${num(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</section>`) + cta(),

  solucoes: () => sub(2, 'Soluções', 'Onde houver um paciente, há um sinal.', 'Do leito do hospital à casa do paciente, com a mesma plataforma e o mesmo sensor.',
    solucoes.map(([id, n]) => [id, n]), solucoes.map(([id, n, d, itens], i) => `
<section id="${id}" class="bloco${i === 1 ? ' folha' : ''}">
  <p class="rotulo">${num(i)}</p><h2 class="display-s">${n}</h2><p class="corpo-g">${d}</p>
  <div class="linhas">${itens.map(([t, x]) => `<div class="linha"><h3>${t}</h3><p>${x}</p></div>`).join('')}</div>
</section>`).join('')) + cta(),

  seguranca: () => sub(3, 'Segurança', 'Dado de saúde é dado sensível.', 'Cada leitura sai do sensor criptografada e só chega a quem cuida do paciente.',
    [['principios', 'Princípios'], ['brasil', 'Dados no Brasil']], `
<section id="principios" class="bloco linhas">${seguranca.map(([t, d], i) => `<div class="linha"><span class="rotulo">${num(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</section>
<section id="brasil" class="folha bloco"><p class="display-s">Os dados dos seus pacientes não saem do Brasil.</p></section>`) + cta('Quer ver a documentação de segurança?'),

  empresa: () => sub(4, 'Empresa', 'Cuidar entre uma ronda e outra.', 'Uma healthtech brasileira que junta engenharia biomédica, enfermagem e software.',
    [['origem', 'Origem'], ['valores', 'Valores'], ['equipe', 'Equipe']], `
<section id="origem" class="bloco"><p class="corpo-g">A ideia veio de quem já passou noites contando leitos: a tecnologia precisava trabalhar enquanto a equipe cuida, e não o contrário. A DHT existe para que nenhuma piora passe despercebida nas horas em que ninguém está olhando.</p>${monitor()}</section>
<section id="valores" class="bloco linhas">${valores.map(([t, d], i) => `<div class="linha"><span class="rotulo">${num(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</section>
<section id="equipe" class="folha bloco">${grade([['2026', 'primeiros hospitais parceiros'], ['3', 'áreas sob o mesmo teto'], ['100%', 'desenvolvido no Brasil']])}<p class="corpo-g">Engenheiros, enfermeiros e médicos na mesma mesa, do desenho do sensor ao texto de cada alerta.</p></section>`) + cta(),

  contato: () => `
<section class="contato">
  <div class="contato-info">
    <p class="rotulo">06 · Contato</p>
    <h1 class="display-m">Agende uma demonstração.</h1>
    <p class="lead">Levamos o sensor e o painel até a sua ala. Em trinta minutos você vê a DHT funcionando com o seu fluxo.</p>
    ${grade([[site.email, 'E-mail'], [site.telefone, 'Telefone'], [site.cidade, 'Sede']])}
  </div>
  <form class="folha form" data-form>
    <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
    <label><span>Instituição</span><input name="instituicao" required autocomplete="organization"></label>
    <label><span>Cargo</span><input name="cargo" autocomplete="organization-title"></label>
    <label><span>E-mail</span><input name="email" type="email" required autocomplete="email"></label>
    <label><span>Telefone</span><input name="telefone" type="tel" autocomplete="tel"></label>
    <label><span>Número de leitos</span><input name="leitos" inputmode="numeric"></label>
    <label class="cheia"><span>Mensagem</span><textarea name="mensagem" rows="3"></textarea></label>
    <button class="pilula" type="submit">Enviar</button>
    <p class="form-ok" hidden>Recebemos sua mensagem. A equipe da DHT responde em até um dia útil.</p>
  </form>
</section>`,
};

export function versaoB() {
  return Object.fromEntries(Object.entries(pag).map(([slug, f]) => [slug, documento({
    versao: V, slug, css: 'b.css', tema: '#000000',
    corpo: `${header(slug)}\n<main id="conteudo">${f()}\n</main>\n${footer()}`,
  })]));
}
