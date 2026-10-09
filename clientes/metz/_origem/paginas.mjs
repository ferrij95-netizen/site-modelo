// Páginas internas, iguais em estrutura nas duas versões (o visual muda pelo CSS de cada uma).
// A página inicial de cada versão fica em versao-a.mjs e versao-b.mjs.
import { site, solucoes, sobre, diferenciais, ferramentas, artigos, chamada, depoimento } from './conteudo.mjs';
import { esc, num, img, zap, linkDe, alvo, faixa, formContato } from './comum.mjs';

export function blocos(versao) {
  const L = linkDe(versao);

  const cabeca = (eyebrow, titulo, lead, trilha = []) => `<section class="cabeca">
  <div class="in">
    <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${trilha.map(([s, t]) => (s ? `<a href="${L(s)}">${t}</a>` : `<span>${t}</span>`)).join('')}</nav>
    ${faixa()}<span class="eyebrow">${eyebrow}</span>
    <h1>${titulo}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

  const cta = () => `<section class="cta">
  <div class="in">
    <div><h2>${chamada.titulo}</h2><p>${chamada.texto}</p></div>
    <div class="cta-acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar diagnóstico</a><a class="btn btn-sec" href="${zap()}" target="_blank" rel="noopener">Conversar pelo WhatsApp</a></div>
  </div>
</section>`;

  const cartoesSolucoes = () => `<div class="grade-sol">${solucoes.map((s, i) => `<a class="sol" href="${L('solucoes/' + s.slug)}">
    <figure>${img(s.img, s.nome)}</figure>
    <div><span class="n">${num(i)}</span><h3>${s.nome}</h3><p>${s.resumo}</p><b class="mais">Saiba mais</b></div>
  </a>`).join('')}</div>`;

  const listaDiferenciais = () => `<ol class="difs">${diferenciais.itens.map(([t, d], i) => `<li><span class="n">${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>`;

  const gradeFerramentas = () => `<ul class="ferr">${ferramentas.map(([n, d, u]) => `<li><a href="${u}" target="_blank" rel="noopener"><b>${n}</b><span>${d}</span></a></li>`).join('')}</ul>`;

  const blocoDepoimento = () => `<section class="depo">
  <div class="in">
    <div class="depo-video"><video controls preload="none" poster="/assets/img/perfil-rem.webp" src="${site.video}"></video></div>
    <figure class="depo-txt">
      <span class="eyebrow">Voz do cliente</span>
      <blockquote><p>“${depoimento.frase}”</p></blockquote>
      <p class="depo-resumo">${depoimento.resumo}</p>
      <figcaption>${img('leonardo', depoimento.nome, 'width="64" height="64"')}<span><b>${depoimento.nome}</b>${depoimento.cargo}</span></figcaption>
    </figure>
  </div>
</section>`;

  const paginas = {};

  paginas.sobre = `${cabeca('A empresa', sobre.titulo, sobre.selo + '.', [[null, 'A empresa']])}
<section class="secao">
  <div class="in duas">
    <div class="texto">
      <h2>${sobre.h2}</h2>
      ${sobre.texto.map(p => `<p>${p}</p>`).join('\n      ')}
    </div>
    <figure class="foto-alta">${img('christian', 'Christian Metz, fundador da REM Consultoria Metz')}<figcaption>Christian Metz, fundador</figcaption></figure>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in mv">
    <div><span class="eyebrow">Missão</span><p>${sobre.missao}</p></div>
    <div><span class="eyebrow">Visão</span><p>${sobre.visao}</p></div>
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab"><span class="eyebrow">Valores</span><h2>Princípios que orientam cada projeto</h2></div>
    <ol class="valores">${sobre.valores.map(([t, d], i) => `<li><span class="n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>
${blocoDepoimento()}
${cta()}`;

  paginas.solucoes = `${cabeca('Soluções', 'Soluções sob medida para o seu negócio', 'Cada empresa tem uma realidade própria. As soluções da REM são construídas a partir das necessidades concretas do negócio, com foco em eficiência operacional, redução de desperdícios e competitividade.', [[null, 'Soluções']])}
<section class="secao">
  <div class="in">${cartoesSolucoes()}</div>
</section>
${cta()}`;

  solucoes.forEach((s, i) => {
    const [rot, dest] = s.cta;
    const outras = solucoes.filter(o => o !== s);
    paginas['solucoes/' + s.slug] = `${cabeca('Solução ' + num(i), s.nome, s.resumo, [['solucoes', 'Soluções'], [null, s.nome]])}
<section class="secao">
  <div class="in duas sol-det">
    <div class="texto">
      ${s.texto.map(p => `<p>${p}</p>`).join('\n      ')}
      <div class="acoes"><a class="btn btn-prim" href="${L(dest)}"${alvo(dest)}>${rot}</a><a class="btn btn-sec" href="${zap(`Olá. Gostaria de saber mais sobre: ${s.nome}.`)}" target="_blank" rel="noopener">Falar pelo WhatsApp</a></div>
    </div>
    <figure class="foto-sol foto-${s.img}">${img(s.img, s.nome)}</figure>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab"><span class="eyebrow">Base de trabalho</span><h2>Pilares da REM</h2></div>
    ${listaDiferenciais()}
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab"><span class="eyebrow">Outras soluções</span><h2>Conheça também</h2></div>
    <ul class="outras">${outras.map(o => `<li><a href="${L('solucoes/' + o.slug)}"><b>${o.nome}</b><span>${o.resumo}</span></a></li>`).join('')}</ul>
  </div>
</section>
${cta()}`;
  });

  paginas.metodologia = `${cabeca('Metodologia', 'Por que escolher a REM Consultoria Metz', diferenciais.intro, [[null, 'Metodologia']])}
<section class="secao">
  <div class="in">${listaDiferenciais()}</div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab"><span class="eyebrow">Sistema Toyota de Produção</span><h2>Ferramentas aplicadas na prática</h2><p>Temas tratados por Christian Metz nos artigos da REM. Cada item leva ao texto completo.</p></div>
    ${gradeFerramentas()}
  </div>
</section>
<section class="secao">
  <div class="in normas">
    <div><span class="eyebrow">Padrões internacionais</span><h2>ISO 9001 e Objetivos de Desenvolvimento Sustentável</h2></div>
    <p>A gestão proposta pela REM está alinhada à ISO 9001 e aos Objetivos de Desenvolvimento Sustentável da ONU, para que os ganhos de eficiência se sustentem ao longo do tempo e considerem o impacto social e ambiental do negócio.</p>
  </div>
</section>
${cta()}`;

  paginas.artigos = `${cabeca('Artigos', 'Gestão, Lean e excelência operacional', 'Textos de Christian Metz sobre os temas que a REM aplica no dia a dia das empresas.', [[null, 'Artigos']])}
<section class="secao">
  <div class="in">
    <ul class="artigos">${artigos.map(([d, t, u]) => `<li><a href="${u}" target="_blank" rel="noopener"><time>${d}</time><h3>${esc(t)}</h3><span class="mais">Ler artigo</span></a></li>`).join('')}</ul>
    <p class="nota-artigos"><a href="https://metzconsultoria.com.br/blog/" target="_blank" rel="noopener">Ver todos os artigos</a></p>
  </div>
</section>
${cta()}`;

  paginas.contato = `${cabeca('Contato', 'Leve sua empresa ao próximo nível', 'Nossa equipe está à disposição para compreender os desafios da sua empresa e apresentar soluções práticas e sob medida.', [[null, 'Contato']])}
<section class="secao">
  <div class="in contato">
    <div>${formContato()}</div>
    <aside class="canais">
      <h2>Canais de atendimento</h2>
      <dl>
        <dt>Telefone e WhatsApp</dt><dd><a href="tel:+${site.zap}">${site.fone}</a></dd>
        <dt>E-mail</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd>
        <dt>Redes sociais</dt><dd>${site.redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join(' · ')}</dd>
      </dl>
      <a class="btn btn-prim" href="${zap()}" target="_blank" rel="noopener">Conversar pelo WhatsApp</a>
    </aside>
  </div>
</section>`;

  return { paginas, cta, cartoesSolucoes, listaDiferenciais, gradeFerramentas, blocoDepoimento, L };
}
