// Páginas internas. A estrutura é a mesma nas duas versões; o visual muda pelo CSS de cada uma
// e por alguns blocos que cada versão monta de um jeito (formato dos cartões varia de página para página).
import { site, produtos, vantagens, sobre, trajetoria, pilares, metais, moldesPlanos, moldesCirculares, sinterizados } from './conteudo.mjs';
import { img, icone, num, linkDe, zap, mapa, formOrcamento, formCurriculo, esc } from './comum.mjs';

export function blocos(versao) {
  const L = linkDe(versao);

  // Cabeçalho das páginas internas: título com a barra vermelha do site atual e foto ao lado.
  const cab = ({ rotulo, titulo, texto, foto, alt, selo }) => `<section class="cab">
  <div class="in">
    <div class="cab-txt">
      <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Home</a><span>/</span>${rotulo}</nav>
      ${selo ? `<span class="selo">${selo}</span>` : ''}
      <h1>${titulo}</h1>
      <p class="lead">${texto}</p>
      <div class="acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar orçamento</a><a class="btn btn-sec" href="${zap(`Olá! Estou no site da Alumigroup e gostaria de informações sobre ${rotulo.toLowerCase()}.`)}" target="_blank" rel="noopener">${icone('zap', 'ic-p')}WhatsApp</a></div>
    </div>
    ${foto ? `<figure class="cab-foto">${img(foto, alt, 'loading="eager" fetchpriority="high"')}</figure>` : ''}
  </div>
</section>`;

  const titulo = (sobre, principal, texto = '') => `<div class="tit"><span class="tit-fino">${sobre}</span><h2>${principal}</h2>${texto ? `<p>${texto}</p>` : ''}</div>`;

  const galeria = (lista, cls = '') => `<div class="galeria ${cls}">${lista.map(([f, a]) => `<figure>${img(f, a)}<figcaption>${a}</figcaption></figure>`).join('')}</div>`;

  const outros = atual => `<section class="secao outros">
  <div class="in">
    ${titulo('Conheça também', 'Outras linhas')}
    <div class="outros-lista">${produtos.filter(p => p.slug !== atual).map(p => `<a href="${L(p.slug)}">${img(p.foto, p.fotoAlt)}<span><b>${p.nome}</b>${p.curto}</span>${icone('seta', 'ic-seta')}</a>`).join('')}</div>
  </div>
</section>`;

  const cta = () => `<section class="cta">
  <div class="in">
    <div><span class="tit-fino">Solicite um orçamento</span><h2>Fale com nosso time de consultores</h2><p>Conte o que você precisa e receba um orçamento personalizado.</p></div>
    <div class="acoes"><a class="btn btn-prim" href="${L('contato')}">Pedir orçamento</a><a class="btn btn-zap" href="${zap()}" target="_blank" rel="noopener">${icone('zap', 'ic-p')}${site.celular}</a></div>
  </div>
</section>`;

  const faixaVantagens = () => `<section class="vantagens">
  <div class="in">${vantagens.map(([ic, t, d]) => `<div class="vt">${icone(ic, 'ic-g')}<div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>
</section>`;

  const paginas = {};

  paginas.empresa = `${cab({ rotulo: 'Empresa', titulo: 'Sobre nós', texto: 'Empresa familiar do Sul do Brasil, com mais de 40 anos de indústria e clientes no Brasil e no exterior.', foto: 'sede', alt: 'Sede da Alumigroup em Novo Hamburgo' })}
<section class="secao">
  <div class="in duas empresa-txt">
    <div>${titulo('Alumigroup', sobre.titulo)}
      <dl class="numeros"><div><dt>+40</dt><dd>anos de mercado com a marca Schmidt</dd></div><div><dt>4</dt><dd>linhas: metais, moldes planos, moldes circulares e sinterizados</dd></div><div><dt>2</dt><dd>unidades em Novo Hamburgo/RS</dd></div></dl></div>
    <div class="texto">${sobre.textos.map(p => `<p>${p}</p>`).join('')}</div>
  </div>
</section>
<section class="secao secao-alt trajetoria">
  <div class="in">
    ${titulo('Nossa história', 'Da reforma de pneus aos metais e sinterizados')}
    <ol class="linha">${trajetoria.map(([t, d], i) => `<li><span class="linha-n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="secao">
  <div class="in duas pilares-bloco">
    <div class="fotos-par">${img('sede', 'Fachada da sede da Alumigroup')}${img('sede-antiga', 'Prédio da Alumigroup visto da rua')}</div>
    <div>${titulo('O que nos move', 'Tecnologia, eficiência e infraestrutura', 'Investimos em novas tecnologias, eficiência produtiva e infraestrutura para entregar ao cliente:')}
      <ul class="pilares">${pilares.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join('')}</ul></div>
  </div>
</section>
${cta()}`;

  paginas.metais = `${cab({ rotulo: 'Metais', titulo: 'Metais não ferrosos sob medida', texto: metais.intro, foto: 'chapas-pilha', alt: 'Chapas de alumínio cortadas e empilhadas' })}
<section class="secao">
  <div class="in">
    ${titulo('Formatos', 'Cortamos na medida do seu projeto', 'Chapas, blocos, vergalhões, tarugos, barras retangulares, varetas e bobinas para solda, em diversas dimensões e ligas.')}
    <ul class="formatos">${metais.formatos.map(([t, ic]) => `<li>${icone(ic, 'ic-f')}<span>${t}</span></li>`).join('')}</ul>
  </div>
</section>
<section class="secao secao-escura passos-bloco">
  <div class="in">
    ${titulo('Como pedir', 'Do pedido ao corte em três passos')}
    <ol class="passos">${metais.passos.map(([t, d], i) => `<li><span class="passo-n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="secao">
  <div class="in">
    ${titulo('Galeria', 'Alumínio para as mais diversas aplicações')}
    ${galeria(metais.galeria, 'g-6')}
  </div>
</section>
${outros('metais')}
${cta()}`;

  paginas['moldes-planos'] = `${cab({ rotulo: 'Moldes Planos', titulo: 'Moldes planos para bandas pré-moldadas', texto: moldesPlanos.intro, foto: 'molde-plano-2', alt: 'Molde plano de alumínio com o desenho da banda' })}
<section class="secao">
  <div class="in duas">
    <div>${titulo('Reforma de pneus', 'Do projeto à revitalização do molde', moldesPlanos.texto)}
      <p class="material"><span>Alumínio</span><span>Aço</span></p></div>
    <ol class="servicos">${moldesPlanos.servicos.map(([t, d], i) => `<li><span>${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    ${titulo('Galeria', 'Moldes planos Alumigroup')}
    ${galeria(moldesPlanos.galeria, 'g-4')}
  </div>
</section>
${outros('moldes-planos')}
${cta()}`;

  paginas['moldes-circulares'] = `${cab({ rotulo: 'Moldes Circulares', titulo: 'Moldes circulares para pneus novos', texto: moldesCirculares.intro, foto: 'molde-circular-3', alt: 'Molde circular para pneus visto de cima' })}
<section class="secao">
  <div class="in">
    ${titulo('Aplicações', 'Para cada tipo de pneu, um molde personalizado')}
    <div class="aplicacoes">${moldesCirculares.aplicacoes.map(([t, d], i) => `<div><span class="ap-n">${num(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
<section class="secao secao-escura">
  <div class="in duas circ-servicos">
    <figure class="recorte">${img('molde-circular-recorte', 'Molde circular de alumínio')}</figure>
    <div>${titulo('Serviços', 'Cuidamos do molde durante toda a vida útil', 'Usinagem em alumínio e aço, além de manutenção e adaptação de moldes existentes.')}
      <ul class="lista-check">${moldesCirculares.servicos.map(s => `<li>${s}</li>`).join('')}</ul></div>
  </div>
</section>
<section class="secao">
  <div class="in">
    ${titulo('Galeria', 'Moldes circulares Alumigroup')}
    ${galeria(moldesCirculares.galeria, 'g-5')}
  </div>
</section>
${outros('moldes-circulares')}
${cta()}`;

  paginas.sinterizados = `${cab({ rotulo: 'Sinterizados', selo: 'Novidade', titulo: 'Peças sinterizadas', texto: sinterizados.intro, foto: 'sinterizados', alt: 'Engrenagens sinterizadas' })}
<section class="secao processo-bloco">
  <div class="in">
    ${titulo('Metalurgia do pó', 'Como nasce uma peça sinterizada')}
    <ol class="processo">${sinterizados.etapas.map(([t, d], i) => `<li><div class="pr-ic">${icone(['po', 'prensa', 'chama', 'engrenagem'][i], 'ic-g')}<span>${num(i)}</span></div><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="secao secao-escura">
  <div class="in duas">
    <div>${titulo('Setores atendidos', 'Precisão e durabilidade para a indústria', sinterizados.texto)}
      <ul class="setores">${sinterizados.setores.map(s => `<li>${s}</li>`).join('')}</ul></div>
    <dl class="beneficios">${sinterizados.vantagens.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>
  </div>
</section>
${outros('sinterizados')}
${cta()}`;

  paginas['trabalhe-conosco'] = `${cab({ rotulo: 'Trabalhe conosco', titulo: 'Trabalhe conosco', texto: 'Quer fazer parte de uma empresa familiar com mais de 40 anos de indústria? Envie seus dados e o seu currículo.', foto: 'sede-antiga', alt: 'Prédio da Alumigroup' })}
<section class="secao">
  <div class="in duas form-bloco">
    <div>${titulo('Currículo', 'Envie seus dados')}<p class="suave">Preencha o formulário. Ele abre uma conversa no WhatsApp da Alumigroup com os seus dados; é só anexar o currículo e enviar.</p>
      <ul class="contatos"><li>${icone('local', 'ic-p')}<span>${site.unidades[0].linhas.join(', ')}</span></li><li>${icone('fone', 'ic-p')}<a href="tel:${site.fixoHref}">${site.fixo}</a></li></ul></div>
    ${formCurriculo()}
  </div>
</section>`;

  paginas.contato = `<section class="cab cab-curto">
  <div class="in"><div class="cab-txt">
    <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Home</a><span>/</span>Orçamento</nav>
    <h1>Solicite um orçamento</h1>
    <p class="lead">Fale com nosso time de consultores. Diga o produto, a liga, o formato e as medidas, e responderemos com um orçamento personalizado.</p>
  </div></div>
</section>
<section class="secao">
  <div class="in duas form-bloco">
    ${formOrcamento()}
    <div class="contato-info">
      <div class="ci">${icone('zap', 'ic-g')}<div><h3>WhatsApp</h3><a href="${zap()}" target="_blank" rel="noopener">${site.celular}</a></div></div>
      <div class="ci">${icone('fone', 'ic-g')}<div><h3>Telefone</h3><a href="tel:${site.fixoHref}">${site.fixo}</a></div></div>
      <div class="ci">${icone('hora', 'ic-g')}<div><h3>Horário</h3>${site.horario.map(([d, h]) => `<p><b>${d}</b> ${h}</p>`).join('')}</div></div>
    </div>
  </div>
</section>
<section class="secao secao-alt unidades">
  <div class="in">
    ${titulo('Localização', 'Matriz e filial em Novo Hamburgo/RS')}
    <div class="unid">${site.unidades.map(u => `<div class="un">
      <iframe title="Mapa: ${esc(u.nome)} Alumigroup" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(u.mapa)}&output=embed"></iframe>
      <div><h3>${u.nome}</h3><p>${u.linhas.join('<br>')}</p><a class="link" href="${mapa(u.mapa)}" target="_blank" rel="noopener">Como chegar</a></div></div>`).join('')}</div>
  </div>
</section>`;

  return { paginas, cab, titulo, galeria, cta, faixaVantagens, outros, L };
}
