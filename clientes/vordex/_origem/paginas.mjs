// Páginas internas, iguais nas duas versões (o visual muda pelo CSS de cada versão).
import { site, anos, inicio, servicos, estrutura, quemSomos, denuncia } from './conteudo.mjs';
import { img, num, zap, linkDe, eyebrow, barras, marcaV, formulario, barrasFrota } from './comum.mjs';

export function blocos(versao) {
  const L = linkDe(versao);

  // Cabeçalho das páginas internas.
  const cab = ({ trilha = [], olho, titulo, lead, foto, alt }) => `<section class="cab${foto ? ' cab-foto' : ''}">
  ${marcaV('cab-v')}
  <div class="in">
    <div class="cab-txt">
      <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${trilha.map(([s, t]) => `<a href="${L(s)}">${t}</a>`).join('')}</nav>
      ${eyebrow(olho)}
      <h1>${titulo}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>
    ${foto ? `<figure class="cab-img">${img(foto, alt, 'loading="eager" fetchpriority="high"')}</figure>` : ''}
  </div>
</section>`;

  // Faixa final de chamada, com as duas frases do site atual.
  const cta = () => `<section class="cta">
  <div class="in">
    <div><h2>${inicio.chamada[0]}<br><em>${inicio.chamada[1]}</em></h2><p>Fale com a nossa equipe comercial. Atendimento 24 horas.</p></div>
    <div class="cta-acoes"><a class="btn btn-prim" href="${zap()}" target="_blank" rel="noopener">Solicitar orçamento</a><a class="btn btn-claro" href="${L('contato')}">Outros contatos</a></div>
  </div>
</section>`;

  // Os quatro serviços com a foto redonda do site atual.
  const circulos = (atual = '') => `<ul class="circulos">${servicos.filter(s => s.slug !== atual).map(s => `<li><a href="${L('servicos/' + s.slug)}">
    <span class="circ">${img(s.circulo, s.nome)}</span><b>${s.nome}</b><small>${s.resumo}</small><i class="seta" aria-hidden="true">→</i></a></li>`).join('')}</ul>`;

  // Bloco de estrutura com os ícones do site atual.
  const icones = () => `<ul class="icones">${estrutura.itens.map(([ic, n, t, d]) => `<li>${img(ic, '', 'width="72" height="72"')}<div><b>${n}</b><span>${t}</span><p>${d}</p></div></li>`).join('')}</ul>`;

  const paginas = {};

  // ---------- Serviços ----------
  paginas.servicos = `${cab({ olho: 'Serviços', titulo: 'Soluções completas para a indústria', lead: 'Da fabricação à montagem, da locação de equipamentos à terraplanagem: uma só empresa, com estrutura e frota próprias.' })}
<section class="secao">
  <div class="in linhas-serv">${servicos.map((s, i) => `<article class="linha-serv">
    <a class="ls-foto" href="${L('servicos/' + s.slug)}">${img(s.circulo, s.nome)}</a>
    <div class="ls-txt"><span class="n">${num(i)}</span><h2>${s.nome}</h2><p>${s.intro}</p>
      <ul class="tags">${(s.linhas || s.oferecidos || s.pontos.slice(0, 3).map(p => p.replace(/[.;]$/, ''))).map(t => `<li>${t}</li>`).join('')}</ul>
      <a class="link" href="${L('servicos/' + s.slug)}">Conhecer ${s.curto.toLowerCase()}</a></div>
  </article>`).join('')}</div>
</section>
${cta()}`;

  // ---------- Página de cada serviço ----------
  for (const s of servicos) {
    const corpo = [];
    corpo.push(`<section class="secao">
  <div class="in duas serv-intro">
    <div class="texto"><h2>${s.intro}</h2>
      <ol class="pontos">${s.pontos.map((p, i) => `<li><span>${num(i)}</span><p>${p}</p></li>`).join('')}</ol>
      ${s.compromisso ? `<p class="nota">${s.compromisso}</p>` : ''}
    </div>
    <figure class="serv-foto${s.foto.startsWith('frota') ? ' lamina' : ''}">${img(s.foto, s.nome)}</figure>
  </div>
</section>`);
    if (s.etapas) corpo.push(`<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab">${eyebrow('Do projeto à entrega')}<h2>Etapas da fabricação</h2><p>A matéria-prima passa por cinco etapas até virar produto acabado, todas dentro da nossa fábrica.</p></div>
    <ol class="etapas">${s.etapas.map((e, i) => `<li><span>${num(i)}</span><b>${e}</b></li>`).join('')}</ol>
    <div class="linhas-prod"><b>Linhas de fabricação</b>${s.linhas.map(l => `<span>${l}</span>`).join('')}</div>
  </div>
</section>`);
    if (!s.etapas && s.linhas) corpo.push(`<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab">${eyebrow('Montagem industrial')}<h2>Disciplinas que executamos</h2><p>Equipes próprias para cada disciplina, com controle de qualidade em todas as frentes.</p></div>
    <ul class="disciplinas">${s.linhas.map((l, i) => `<li><span>${num(i)}</span>${l}</li>`).join('')}</ul>
  </div>
</section>`);
    if (s.oferecidos) corpo.push(`<section class="secao secao-alt">
  <div class="in duas">
    <div class="secao-cab">${eyebrow('Serviços oferecidos')}<h2>Do terreno bruto à base pronta para construir</h2><p>Comprometidos com o meio ambiente: realizamos nossos serviços com respeito e responsabilidade ambiental.</p></div>
    <ol class="oferecidos">${s.oferecidos.map((o, i) => `<li><span>${num(i)}</span>${o}</li>`).join('')}</ol>
  </div>
</section>`);
    if (s.frota) corpo.push(`<section class="secao secao-frota">
  <div class="in">
    <div class="secao-cab">${eyebrow(s.etapas ? 'Frota' : s.oferecidos ? 'Alguns equipamentos que utilizamos em sua obra' : 'Frota para locação')}<h2>${s.oferecidos ? 'Frota própria de terraplanagem' : 'Frota própria para locação'}</h2>${s.frotaTexto ? `<p>${s.frotaTexto}</p>` : ''}</div>
    <div class="laminas">${s.laminas.filter(([f]) => f !== s.foto).map(([f, a]) => img(f, a)).join('')}</div>
  </div>
</section>`);
    if (s.galeria) corpo.push(`<section class="secao">
  <div class="in">
    <div class="secao-cab">${eyebrow(s.etapas ? 'Conheça algumas de nossas fabricações' : 'Montagem de estruturas')}<h2>${s.etapas ? 'Trabalhos recentes' : 'Obras e montagens'}</h2></div>
    <div class="galeria g-${s.galeria.length}">${s.galeria.map(([f, a]) => `<figure>${img(f, a)}<figcaption>${a}</figcaption></figure>`).join('')}</div>
  </div>
</section>`);
    corpo.push(`<section class="secao secao-alt outros">
  <div class="in">
    <div class="secao-cab">${eyebrow('Outros serviços')}<h2>Conheça também</h2></div>
    ${circulos(s.slug)}
  </div>
</section>`);
    paginas['servicos/' + s.slug] = `${cab({ trilha: [['servicos', 'Serviços']], olho: s.nome, titulo: s.nome, lead: s.resumo, foto: s.circulo, alt: s.nome })}
${corpo.join('\n')}
${cta()}`;
  }

  // ---------- Estrutura ----------
  paginas.estrutura = `${cab({ olho: 'Estrutura e operações', titulo: 'Estrutura própria para atender grandes operações', lead: estrutura.intro })}
<section class="secao">
  <div class="in">
    <figure class="sede">${img('sede', 'Sede da Vordex no polo industrial de Conselheiro Lafaiete')}<figcaption><b>Sede Vordex</b>${site.endereco}, ${site.cidade}</figcaption></figure>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab">${eyebrow('Números')}<h2>Estrutura e operações</h2></div>
    ${icones()}
  </div>
</section>
<section class="secao secao-frota">
  <div class="in duas">
    <div class="secao-cab">${eyebrow('Frota de apoio')}<h2>Veículos e máquinas para as nossas frentes de trabalho</h2><p>Frota própria, além dos veículos locados. Para a frota de locação e de terraplanagem, veja as páginas de cada serviço.</p>
      <div class="acoes"><a class="link" href="${L('servicos/locacao-de-equipamentos')}">Frota para locação</a><a class="link" href="${L('servicos/terraplanagem')}">Frota de terraplanagem</a></div></div>
    ${barrasFrota(estrutura.frotaApoio, 'compacta')}
  </div>
</section>
${cta()}`;

  // ---------- Quem somos ----------
  paginas['quem-somos'] = `${cab({ olho: 'Quem somos', titulo: 'Conheça um pouco sobre a família Vordex', lead: `Há ${anos} anos em Conselheiro Lafaiete, contribuindo com projetos de grandes empresas da indústria e da mineração.` })}
<section class="secao">
  <div class="in duas qs">
    <figure class="qs-foto">${img('montagem-4', 'Equipe Vordex em montagem de estrutura')}</figure>
    <div class="texto">
      <ol class="marcos">${quemSomos.pontos.map(([t, d], i) => `<li><span>${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
    </div>
  </div>
</section>
<section class="missao">
  ${marcaV('missao-v')}
  <div class="in"><span class="eyebrow">${barras}Nossa missão</span><blockquote>${inicio.missao}</blockquote></div>
</section>
<section class="secao">
  <div class="in duas">
    <div class="secao-cab">${eyebrow('Onde estamos')}<h2>Sede no polo industrial de Conselheiro Lafaiete</h2><p>Quatro bases próprias, que somam 3.750 m²: escritório administrativo, galpão de fábrica, pátio de equipamentos e materiais e garagem de veículos.</p><a class="link" href="${L('estrutura')}">Ver a estrutura</a></div>
    <figure class="sede sede-p">${img('sede', 'Sede da Vordex')}</figure>
  </div>
</section>
${cta()}`;

  // ---------- Canal de denúncias ----------
  paginas['canal-de-denuncias'] = `${cab({ olho: 'Canal de denúncias', titulo: 'Ética e integridade em primeiro lugar', lead: denuncia.intro })}
<section class="secao">
  <div class="in duas">
    <div class="secao-cab">${eyebrow('O que relatar')}<h2>Quando usar este canal</h2>
      <ul class="check">${denuncia.temas.map(t => `<li>${t}</li>`).join('')}</ul>
      <p class="nota">${denuncia.aviso}</p></div>
    <figure class="integridade">${img('integridade', 'Profissional da indústria')}</figure>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab">${eyebrow('Como funciona')}<h2>Do relato à apuração, com sigilo</h2></div>
    <ol class="fluxo">${denuncia.como.map(([t, d], i) => `<li><span>${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="secao">
  <div class="in duas form-bloco">
    <div class="secao-cab">${eyebrow('Fazer um relato')}<h2>Registre a sua denúncia</h2><p>Os campos de identificação são opcionais. Se preferir, escreva diretamente para <a href="mailto:${site.denuncias}">${site.denuncias}</a> ou ligue para ${denuncia.fone}.</p></div>
    ${formulario({ para: site.denuncias, assunto: 'Canal de denúncias', botoes: false, campos: [['nome', 'Nome (opcional)'], ['funcao', 'Função (opcional)'], ['email', 'E-mail (opcional)', 'email'], ['telefone', 'Telefone (opcional)', 'tel'], ['denuncia', 'Denúncia', 'textarea', true]] })}
  </div>
</section>`;

  // ---------- Trabalhe conosco ----------
  paginas['trabalhe-conosco'] = `${cab({ olho: 'Currículo', titulo: 'Quer entrar para a nossa equipe?', lead: 'São cerca de 220 colaboradores em fabricação, montagem, manutenção, locação e terraplanagem. Envie o seu currículo.' })}
<section class="secao">
  <div class="in duas form-bloco">
    <div class="secao-cab">${eyebrow('Envie seu currículo')}<h2>Faça parte da família Vordex</h2><p>Preencha os campos e anexe o seu currículo (PDF ou Word) na mensagem que vai abrir no seu e-mail.</p>
      <figure class="tc-foto">${img('montagem-2', 'Estrutura montada pela equipe Vordex')}</figure></div>
    ${formulario({ para: site.curriculos, assunto: 'Currículo', botoes: false, campos: [['nome', 'Nome completo', 'text', true], ['email', 'E-mail', 'email', true], ['telefone', 'Telefone', 'tel'], ['area', 'Área de interesse', ['Fabricação', 'Montagem e manutenção', 'Locação e operação de equipamentos', 'Terraplanagem', 'Administrativo', 'Outra']], ['mensagem', 'Conte um pouco da sua experiência', 'textarea']] })}
  </div>
</section>`;

  // ---------- Contato ----------
  paginas.contato = `${cab({ olho: 'Contato', titulo: 'Fale com a Vordex', lead: 'Atendimento 24 horas. Escolha o canal mais prático ou envie a sua mensagem pelo formulário.' })}
<section class="secao">
  <div class="in contato-grade">
    <div class="canais">
      <a class="canal canal-zap" href="${zap()}" target="_blank" rel="noopener"><small>WhatsApp e telefone</small><b>${site.fone}</b></a>
      ${site.emails.map(([t, e]) => `<a class="canal" href="mailto:${e}"><small>${t}</small><b>${e}</b></a>`).join('')}
      <div class="canal"><small>Endereço</small><b>${site.endereco}</b><span>${site.cidade}</span><a class="link" href="${site.rota}" target="_blank" rel="noopener">Como chegar</a></div>
    </div>
    <div class="form-bloco">
      <h2>Envie uma mensagem</h2>
      ${formulario({ para: site.email, assunto: 'Contato pelo site', campos: [['nome', 'Nome', 'text', true], ['empresa', 'Empresa'], ['email', 'E-mail', 'email', true], ['telefone', 'Telefone', 'tel', true], ['servico', 'Serviço', ['Fabricação industrial', 'Manutenção e montagem industrial', 'Locação de equipamentos', 'Terraplanagem', 'Outro assunto'], false, true], ['mensagem', 'Mensagem', 'textarea']] })}
    </div>
  </div>
</section>
<section class="mapa"><iframe src="${site.mapa}" title="Mapa da sede da Vordex" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;

  return { paginas, cta, circulos, icones, L };
}
