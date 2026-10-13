// Páginas internas, iguais em estrutura nas duas versões (o visual muda pelo CSS de cada versão).
import { site, empresa, marcas, regioes, cidades, tiposEstabelecimento, cargos, areas, comoEncontrou, assuntos, numeros } from './conteudo.mjs';
import { esc, img, icone, relogio48, barras, eyebrow, formulario, zap, linkDe, listaNumeros, svgZap, svgFone } from './comum.mjs';

const categorias = [...new Set(marcas.map(m => m.cat))];

export function blocos(versao) {
  const L = linkDe(versao);

  const cab = (titulo, sub, migalha = titulo) => `<section class="cab">
  ${barras('cab-barras')}
  <div class="in">
    <nav class="migalha" aria-label="Você está em"><a href="${L('index')}">Início</a><span>›</span><span>${migalha}</span></nav>
    <h1>${titulo}</h1>
    ${sub ? `<p>${sub}</p>` : ''}
  </div>
</section>`;

  const cta = (titulo = 'Leve as marcas da Flamarsul para o seu negócio', texto = 'Faça o pré-cadastro e receba seus pedidos em até 48h, com atendimento especializado para o seu estabelecimento.') => `<section class="cta">
  ${barras('cta-barras')}
  <div class="in">
    <div><h2>${titulo}</h2><p>${texto}</p></div>
    <div class="acoes"><a class="btn btn-prim" href="${L('seja-nosso-cliente')}">Quero ser cliente</a><a class="btn btn-claro" href="${zap()}" target="_blank" rel="noopener">${svgZap}Falar no WhatsApp</a></div>
  </div>
</section>`;

  const paginas = {};

  paginas.empresa = `${cab('Empresa', 'Empresa familiar de Cachoeirinha/RS, com mais de 25 anos de distribuição.')}
<section class="secao emp-intro">
  <div class="in duas">
    <div class="texto">
      ${eyebrow('Quem somos')}
      <h2>Uma distribuidora feita de gente que gosta de vender</h2>
      ${empresa.texto.map(p => `<p>${p}</p>`).join('')}
    </div>
    <div class="mosaico">
      <figure class="m1">${img('equipe-2025', 'Equipe Flamarsul reunida em 2025')}</figure>
      <figure class="m2">${img('frota', 'Frota de veículos da Flamarsul no pátio da empresa')}</figure>
      <figure class="m3">${img('equipe-portao', 'Equipe de vendas da Flamarsul em frente ao portão "Vá e Vença"')}</figure>
    </div>
  </div>
</section>
<section class="secao secao-num">
  <div class="in">${listaNumeros()}</div>
</section>
<section class="secao norte">
  <div class="in">
    <div class="secao-cab centro">${eyebrow('Norteadores')}<h2>${empresa.lema}</h2></div>
    <div class="norte-grade">
      <article class="nc nc-missao"><span class="nc-tag">Missão</span><p>${empresa.missao}</p></article>
      <article class="nc nc-visao"><span class="nc-tag">Visão</span><p>${empresa.visao}</p></article>
      <article class="nc nc-valores"><span class="nc-tag">Valores</span><ul>${empresa.valores.map(v => `<li>${v}</li>`).join('')}</ul></article>
    </div>
  </div>
</section>
<section class="secao social">
  <div class="in duas">
    <div>
      ${eyebrow('Responsabilidade social')}
      <h2>Uma prioridade dentro da empresa</h2>
      <p>A responsabilidade social faz parte do dia a dia da Flamarsul. Estas são algumas das ações que a empresa realiza e apoia:</p>
      <ol class="social-lista">${empresa.social.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join('')}</ol>
    </div>
    <figure class="social-foto">${img('equipe-rosa', 'Colaboradoras da Flamarsul em ação de conscientização')}</figure>
  </div>
</section>
<section class="secao galeria-sec">
  <div class="in">
    <div class="secao-cab">${eyebrow('Nossa equipe')}<h2>Mais de 140 colaboradores, da venda à entrega</h2></div>
    <div class="galeria">
      ${[['equipe-toda', 'Equipe Flamarsul em frente à sede'], ['equipe-2020', 'Confraternização da equipe Flamarsul'], ['palestra', 'Palestra para colaboradores na sede'], ['equipe-rosa-2', 'Equipe Flamarsul no Outubro Rosa'], ['frota-2', 'Veículos da equipe de vendas externas']].map(([n, a]) => `<figure>${img(n, a)}</figure>`).join('')}
    </div>
  </div>
</section>
${cta()}`;

  paginas.produtos = `${cab('Produtos', 'As marcas que a Flamarsul distribui no Rio Grande do Sul, com entrega em até 48h.')}
<section class="secao">
  <div class="in">
    <div class="filtro" role="group" aria-label="Filtrar marcas por categoria">
      <button type="button" class="chip" aria-pressed="true" data-cat="">Todas as marcas <i>${marcas.length}</i></button>
      ${categorias.map(c => `<button type="button" class="chip" aria-pressed="false" data-cat="${esc(c)}">${c} <i>${marcas.filter(m => m.cat === c).length}</i></button>`).join('')}
    </div>
    <div class="marcas-lista">
      ${marcas.map((m, i) => `<article class="mc" id="${m.slug}" data-cat="${esc(m.cat)}">
        <div class="mc-logo">${img('marca-' + m.slug, m.nome)}</div>
        <div class="mc-txt">
          <span class="mc-cat">${m.cat}${m.desde ? ` · desde ${m.desde}` : ''}</span>
          <h2>${m.nome}</h2>
          <p>${m.texto}</p>
          <a class="link" href="${zap(`Olá! Gostaria de comprar produtos ${m.nome} com a Flamarsul.`)}" target="_blank" rel="noopener">Pedir ${m.nome}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
${cta('Quer essas marcas na sua prateleira?')}`;

  paginas['onde-estamos'] = `${cab('Onde estamos', 'Rotas de venda e entrega em Porto Alegre, na Grande Porto Alegre, nos Vales e no Litoral Norte do RS.')}
<section class="secao mapa-sec">
  <div class="in duas">
    <div>
      ${eyebrow('Área de atendimento')}
      <h2>${cidades.length} cidades atendidas por mais de 30 rotas</h2>
      <p>Atualmente a Flamarsul atende diversas rotas de venda que passam pelas regiões de Porto Alegre, Grande Porto Alegre, Vale dos Sinos, Vale do Paranhana e Litoral Norte do RS, com entrega em até 48h.</p>
      <ul class="regioes">${regioes.map(r => `<li>${r}</li>`).join('')}</ul>
      <p class="sede-txt"><b>Sede:</b> ${site.endereco}, ${site.bairro}</p>
    </div>
    <figure class="mapa-fig">${img('mapa-rs', 'Mapa do Rio Grande do Sul com a área atendida pela Flamarsul')}</figure>
  </div>
</section>
<section class="secao cidades-sec">
  <div class="in">
    <div class="secao-cab"><h2>Sua cidade está na rota?</h2><p>Digite o nome da cidade para conferir.</p></div>
    <label class="busca"><span class="sr">Buscar cidade</span><input type="search" placeholder="Ex.: Gravataí" data-busca-cidade autocomplete="off"></label>
    <p class="busca-res" data-busca-res aria-live="polite"></p>
    <ul class="cidades" data-cidades>${cidades.map(c => `<li>${c}</li>`).join('')}</ul>
  </div>
</section>
${cta('Sua cidade está na lista?', 'Faça o pré-cadastro do seu estabelecimento e um vendedor da sua região entra em contato.')}`;

  paginas['seja-nosso-cliente'] = `${cab('Seja nosso cliente', 'Junte-se aos mais de 8 mil clientes que atendemos atualmente.')}
<section class="secao cad">
  <div class="in cad-grade">
    <aside class="cad-lado">
      <h2>Faça e agilize seus pedidos</h2>
      <p>Receba em até 48h e desfrute de um atendimento especializado para o seu negócio. Preencha o pré-cadastro e esclareça suas dúvidas: será um grande prazer atendê-lo!</p>
      <ul class="cad-van">
        <li>${relogio48()}<span><b>Entrega em até 48h</b>Toda a linha de produtos, em mais de 30 rotas.</span></li>
        <li>${icone('atendimento')}<span><b>Atendimento especializado</b>Vendedores externos e televendas.</span></li>
        <li>${icone('agilidade')}<span><b>Compra em diversos canais</b>Com o vendedor, por telefone ou WhatsApp.</span></li>
      </ul>
      <figure class="cad-img">${img('van', 'Van de entregas com a marca Flamarsul')}</figure>
    </aside>
    <div class="cad-form">
      <h3>Pré-cadastro</h3>
      ${formulario({ assunto: 'Pré-cadastro de cliente pelo site', rotuloEnviar: 'Enviar pré-cadastro', campos: [
        ['Nome', 'Nome', 'text', true], ['E-mail', 'E-mail', 'email', true], ['Telefone', 'Telefone', 'tel', true], ['Contato', 'Pessoa de contato'],
        ['Razão social', 'Razão social', 'text', true], ['CNPJ', 'CNPJ', 'text', true], ['Inscrição estadual/municipal', 'Inscrição estadual/municipal'],
        ['Tipo de estabelecimento', 'Tipo de estabelecimento', tiposEstabelecimento, true],
        ['Endereço', 'Endereço', 'text', true, true], ['Complemento', 'Complemento'], ['CEP', 'CEP'], ['Bairro', 'Bairro'],
        ['Cidade', 'Cidade (RS)', cidades, true], ['Melhor horário para visita', 'Melhor horário para visitá-lo'],
        ['Mensagem', 'Mensagem', 'textarea'],
      ] })}
    </div>
  </div>
</section>`;

  paginas['trabalhe-conosco'] = `${cab('Trabalhe conosco', 'Na Flamarsul, acreditamos que uma grande história é construída por pessoas.')}
<section class="secao tc">
  <div class="in duas">
    <div>
      ${eyebrow('Venha fazer parte')}
      <h2>Compromisso, respeito e transparência</h2>
      <p>São mais de 140 colaboradores em vendas, televendas, logística, entregas e administração. Se você se identifica com os nossos valores e quer crescer com uma empresa referência na distribuição no Rio Grande do Sul, envie seu currículo.</p>
      <ul class="tc-areas">${cargos.slice(0, -1).map(c => `<li>${c}</li>`).join('')}</ul>
      <figure class="tc-foto">${img('equipe-portao', 'Equipe de vendas da Flamarsul')}</figure>
    </div>
    <div class="cad-form">
      <h3>Envie seu currículo</h3>
      ${formulario({ assunto: 'Currículo enviado pelo site', botoes: false, rotuloEnviar: 'Enviar por e-mail', campos: [
        ['Nome completo', 'Nome completo', 'text', true, true], ['E-mail', 'E-mail', 'email', true], ['Telefone', 'Telefone', 'tel', true],
        ['Cargo pretendido', 'Cargo pretendido', cargos, true], ['Área de atuação', 'Área de atuação', areas],
        ['Anos de experiência', 'Anos de experiência', 'number'], ['LinkedIn ou portfólio', 'LinkedIn ou portfólio', 'url'],
        ['Como nos encontrou', 'Como nos encontrou?', comoEncontrou, false, true],
        ['Mensagem', 'Mensagem / motivação', 'textarea'],
      ], extra: '<p class="form-nota cheia">Ao enviar, o seu e-mail abre com os dados preenchidos: anexe o currículo (PDF ou Word) antes de enviar.</p>' })}
    </div>
  </div>
</section>`;

  paginas.contato = `${cab('Contato', 'Fale com a Flamarsul de segunda a sexta, das 08:00 às 12:00 e das 13:00 às 18:00.')}
<section class="secao contato">
  <div class="in">
    <ul class="ct-cards">
      <li><a href="tel:${site.foneHref}">${icone('telefone')}<span>Telefone</span><b>${site.fone}</b></a></li>
      <li><a href="${zap()}" target="_blank" rel="noopener">${icone('whats')}<span>WhatsApp</span><b>${site.zapTexto}</b></a></li>
      <li><a href="mailto:${site.email}">${icone('email')}<span>E-mail</span><b>${site.email}</b></a></li>
      <li><a href="${site.mapa}" target="_blank" rel="noopener">${icone('gps')}<span>Endereço</span><b>${site.endereco}</b><small>${site.bairro}</small></a></li>
    </ul>
    <div class="ct-grade">
      <div class="cad-form">
        <h3>Envie sua mensagem</h3>
        ${formulario({ assunto: 'Contato pelo site', campos: [
          ['Nome', 'Nome', 'text', true], ['Telefone', 'Telefone', 'tel'], ['E-mail', 'E-mail', 'email', true],
          ['Assunto', 'Escolha o assunto', assuntos, true], ['Mensagem', 'Mensagem', 'textarea', true],
        ] })}
      </div>
      <div class="ct-mapa">
        <iframe title="Mapa da sede da Flamarsul em Cachoeirinha" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent('R. Dr. Washington Luís, 114 - Vila Veranopolis, Cachoeirinha - RS, 94935-450')}&output=embed"></iframe>
        <p><b>Horário de atendimento</b> Segunda a sexta · 08:00 às 12:00 · 13:00 às 18:00</p>
      </div>
    </div>
  </div>
</section>`;

  paginas['transparencia-e-igualdade-salarial'] = `${cab('Transparência e igualdade salarial', 'Relatórios de transparência e igualdade salarial entre mulheres e homens, conforme a Lei 14.611/2023.', 'Transparência')}
<section class="secao transp">
  <div class="in">
    <p class="transp-intro">A Flamarsul Distribuidora LTDA (CNPJ ${site.cnpj}) publica aqui os relatórios semestrais de transparência salarial e de critérios remuneratórios. Clique no relatório para abrir em tamanho original.</p>
    <div class="relatorios">
      <a class="rel" href="/assets/img/relatorio-2026-1.webp" target="_blank" rel="noopener">${img('relatorio-2026-1', 'Relatório de transparência e igualdade salarial, 1º semestre de 2026')}<span>Relatório · 1º semestre de 2026</span></a>
      <a class="rel" href="/assets/img/relatorio-2024-2.webp" target="_blank" rel="noopener">${img('relatorio-2024-2', 'Relatório de transparência e igualdade salarial, 2º semestre de 2024')}<span>Relatório · 2º semestre de 2024</span></a>
    </div>
  </div>
</section>`;

  return { paginas, cta, cab, L };
}
