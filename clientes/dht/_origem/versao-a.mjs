// Versão A, "Laboratório": fiel à referência FigureAI. Canvas branco, display gigante em caixa alta,
// trilho de especificações e capítulos pretos sangrados com texto no canto.
import { site, nav, specs, passos, solucoes, recursosPlataforma, specsPlataforma, fichaSensor, seguranca, valores } from './conteudo.mjs';
import { marca, desenhoTopo, desenhoLado, monitor, painel } from './pecas.mjs';
import { documento, esc } from './comum.mjs';

const V = 'a';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;
const num = i => String(i + 1).padStart(2, '0');

const header = slug => `<header class="topo" data-topo>
  <a class="topo-marca" href="${L('index')}" aria-label="DHT, início">${marca()}</a>
  <nav class="topo-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${s === slug ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  <a class="pilula pilula-topo" href="${L('contato')}">Agendar demonstração</a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu>Menu</button>
</header>`;

const footer = () => `<footer class="rodape">
  <div class="rodape-marca">${marca()}<p>${site.tagline}.</p></div>
  <div class="rodape-grupo"><h2>Produto</h2><a href="${L('plataforma')}">Plataforma</a><a href="${L('sensor')}">Sensor</a><a href="${L('seguranca')}">Segurança</a></div>
  <div class="rodape-grupo"><h2>Soluções</h2>${solucoes.map(([id, n]) => `<a href="${L('solucoes')}#${id}">${n}</a>`).join('')}</div>
  <div class="rodape-grupo"><h2>DHT</h2><a href="${L('empresa')}">Empresa</a><a href="${L('contato')}">Contato</a><a href="mailto:${site.email}">${site.email}</a></div>
  <div class="rodape-base"><span>© 2026 DHT</span><span>${site.cidade}</span><a href="/">Ver as duas versões</a></div>
</footer>`;

const trilho = lista => `<dl class="trilho">${lista.map(([v, r]) => `<div><dd>${v}</dd><dt>${r}</dt></div>`).join('')}</dl>`;

const capitulo = (conteudo, titulo, texto, canto = 'esq', extra = '') => `<section class="capitulo escuro ${extra}">
  <div class="capitulo-midia">${conteudo}</div>
  <div class="capitulo-legenda canto-${canto}"><h2>${titulo}</h2><p>${texto}</p></div>
</section>`;

const cta = (titulo = 'Veja a DHT funcionando na sua ala.') => `<section class="cta">
  <h2 class="display-m">${titulo}</h2>
  <div class="cta-acoes"><a class="pilula" href="${L('contato')}">Agendar demonstração</a><a class="sublinhado" href="mailto:${site.email}">${site.email}</a></div>
</section>`;

const cabeca = (i, nome, titulo, lead) => `<section class="cabeca">
  <p class="rotulo">${num(i)} / ${nome}</p>
  <h1 class="display-m">${titulo}</h1>
  <p class="lead">${lead}</p>
</section>`;

const pag = {
  index: () => `
<section class="hero">
  <figure class="hero-produto">${desenhoTopo({ chamadas: false })}</figure>
  <div class="hero-texto">
    <p class="rotulo">Sensor vestível + plataforma clínica</p>
    <h1 class="display">Sinais vitais, sem pausa.</h1>
    <p>A DHT conecta um sensor de braço a uma plataforma que acompanha cada paciente 24 horas por dia e avisa a equipe antes que o quadro piore.</p>
    <div class="acoes"><a class="pilula" href="${L('contato')}">Agendar demonstração</a><a class="sublinhado" href="${L('sensor')}">Conhecer o sensor</a></div>
  </div>
</section>
<section class="doc">
  <figure class="doc-desenho">${desenhoLado()}</figure>
  ${trilho(specs)}
</section>
${capitulo(monitor(), 'Do leito ao posto de enfermagem', 'Frequência cardíaca, saturação, respiração e temperatura chegam ao painel a cada segundo. A equipe vê o que mudou, não uma planilha de números.')}
<section class="editorial">
  <h2 class="titulo-ed">Como funciona</h2>
  <ol class="passos">${passos.map(([t, d], i) => `<li><span class="rotulo">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</section>
${capitulo(painel(), 'Uma ala inteira em uma tela', 'O painel mostra todos os leitos ao mesmo tempo e destaca só quem precisa de atenção agora.', 'dir')}
<section class="lista">
  <h2 class="titulo-ed">Para quem</h2>
  ${solucoes.map(([id, n, d]) => `<a class="lista-linha" href="${L('solucoes')}#${id}"><span class="lista-nome">${n}</span><span class="lista-desc">${d}</span><span class="seta" aria-hidden="true">→</span></a>`).join('\n  ')}
</section>
${cta()}`,

  plataforma: () => `
${cabeca(0, 'Plataforma', 'O plantão inteiro, em uma tela.', 'A plataforma recebe os sinais de cada sensor, calcula o risco de cada paciente e organiza o trabalho da equipe por prioridade, no posto de enfermagem e no celular.')}
${capitulo(painel(), 'Painel da ala', 'Leitos em ordem de prioridade, com o escore de alerta precoce e a tendência das últimas horas de cada paciente.', 'dir')}
<section class="editorial">
  <h2 class="titulo-ed">O que a plataforma faz</h2>
  <div class="grade-2">${recursosPlataforma.map(([t, d], i) => `<article><span class="rotulo">${num(i)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>
</section>
<section class="doc doc-texto">
  <div><h2 class="titulo-ed">Feita para a rotina da enfermagem</h2><p class="corpo-g">Nada para instalar no hospital: o painel abre no navegador do posto e o app da equipe roda em iOS e Android. A integração com o prontuário usa o padrão HL7 FHIR.</p></div>
  ${trilho(specsPlataforma)}
</section>
${cta()}`,

  sensor: () => `
${cabeca(1, 'Sensor', 'Dezoito gramas de vigilância.', 'Um sensor de braço que mede cinco sinais vitais a cada segundo, dura uma semana com uma carga e pode ir ao banho com o paciente.')}
<section class="doc doc-ficha">
  <figure class="doc-desenho">${desenhoTopo()}</figure>
  <dl class="ficha">${fichaSensor.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
</section>
${capitulo(monitor(), 'Cinco sinais, um segundo', 'A janela óptica lê frequência cardíaca e saturação; o acelerômetro percebe respiração, postura e quedas; o sensor de contato acompanha a temperatura.')}
<section class="doc">
  <figure class="doc-desenho">${desenhoLado()}</figure>
  <div class="passos-v"><h2 class="titulo-ed">Como colocar</h2>${[['Encaixar', 'Prender o sensor na pulseira até ouvir o clique.'], ['Ajustar', 'Fechar a pulseira no braço, dois dedos acima do cotovelo.'], ['Vincular', 'Ler o código do leito no app da equipe. Pronto.']].map(([t, d], i) => `<div><span class="rotulo">${num(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</section>
${cta()}`,

  solucoes: () => `
${cabeca(2, 'Soluções', 'Onde houver um paciente, há um sinal.', 'Do leito do hospital à casa do paciente, a DHT acompanha quem precisa ser acompanhado, com a mesma plataforma e o mesmo sensor.')}
${solucoes.map(([id, n, d, itens], i) => `${i === 1 ? capitulo(monitor(), 'Entre uma ronda e outra', 'A maioria das pioras clínicas dá sinais horas antes. A DHT existe para que alguém veja esses sinais a tempo.') : ''}
<section class="solucao" id="${id}">
  <div class="solucao-cab"><span class="rotulo">${num(i)}</span><h2 class="display-s">${n}</h2><p class="corpo-g">${d}</p></div>
  <div class="solucao-itens">${itens.map(([t, x]) => `<div><h3>${t}</h3><p>${x}</p></div>`).join('')}</div>
</section>`).join('\n')}
${cta()}`,

  seguranca: () => `
${cabeca(3, 'Segurança', 'Dado de saúde é dado sensível.', 'Cada leitura sai do sensor criptografada e só chega a quem cuida do paciente. Tudo o que acontece fica registrado.')}
<section class="editorial">
  <div class="grade-3">${seguranca.map(([t, d], i) => `<article><span class="rotulo">${num(i)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>
</section>
<section class="capitulo escuro capitulo-frase"><p class="display-m">Os dados dos seus pacientes não saem do Brasil.</p></section>
${cta('Quer ver a documentação de segurança?')}`,

  empresa: () => `
${cabeca(4, 'Empresa', 'Cuidar entre uma ronda e outra.', 'A DHT é uma healthtech brasileira que junta engenharia biomédica, enfermagem e software para que nenhuma piora passe despercebida nas horas em que ninguém está olhando.')}
<section class="lista">
  <h2 class="titulo-ed">No que acreditamos</h2>
  ${valores.map(([n, d]) => `<div class="lista-linha"><span class="lista-nome">${n}</span><span class="lista-desc">${d}</span></div>`).join('\n  ')}
</section>
${capitulo(monitor(), 'Nascida no plantão', 'A ideia veio de quem já passou noites contando leitos: a tecnologia precisava trabalhar enquanto a equipe cuida, e não o contrário.')}
<section class="doc doc-texto">
  <div><h2 class="titulo-ed">Quem faz a DHT</h2><p class="corpo-g">Engenheiros, enfermeiros e médicos trabalhando na mesma mesa, do desenho do sensor ao texto de cada alerta. Cada função do produto é testada com equipes reais antes de chegar ao hospital.</p></div>
  ${trilho([['2026', 'primeiros hospitais parceiros'], ['3', 'áreas sob o mesmo teto'], ['100%', 'desenvolvido no Brasil']])}
</section>
${cta()}`,

  contato: () => `
<section class="contato">
  <div class="contato-info">
    <p class="rotulo">06 / Contato</p>
    <h1 class="display-m">Agende uma demonstração.</h1>
    <p class="lead">Levamos o sensor e o painel até a sua ala. Em uma conversa de trinta minutos você vê a DHT funcionando com o seu fluxo.</p>
    <dl class="trilho trilho-esq"><div><dd>E-mail</dd><dt><a href="mailto:${site.email}">${site.email}</a></dt></div><div><dd>Telefone</dd><dt>${site.telefone}</dt></div><div><dd>Sede</dd><dt>${site.cidade}</dt></div></dl>
  </div>
  <form class="form" data-form>
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

export function versaoA() {
  return Object.fromEntries(Object.entries(pag).map(([slug, f]) => [slug, documento({
    versao: V, slug, css: 'a.css',
    corpo: `${header(slug)}\n<main id="conteudo">${f()}\n</main>\n${footer()}`,
  })]));
}
