// Páginas internas, iguais nas duas versões (o visual muda pelo CSS de cada versão).
import { site, anos, inicio, diferenciais, sobre, produtos, laser, telas, chapas, conexoes, arames, aco, concertinas, suinocultura, obras } from './conteudo.mjs';
import { img, num, zap, linkDe, eyebrow, titulo2, areaSvg, ic, seta, botaoZap, botaoPdf, formulario } from './comum.mjs';

export function blocos(versao) {
  const L = linkDe(versao);
  const P = s => L('produtos/' + s);

  // Cabeçalho das páginas internas.
  const cab = ({ trilha = [], fino, forte, lead, foto, alt, acoes = '' }) => `<section class="cab${foto ? ' cab-foto' : ''}">
  ${foto ? img(foto, alt || forte, 'class="cab-fundo" loading="eager" fetchpriority="high"') : ''}
  <div class="in">
    <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${trilha.map(([s, t]) => `<a href="${L(s)}">${t}</a>`).join('')}</nav>
    ${titulo2(fino, forte, 'h1')}
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${acoes ? `<div class="acoes">${acoes}</div>` : ''}
  </div>
</section>`;

  const cta = (t = 'Nós temos a solução que você precisa!', d = 'Fale com a nossa equipe pelo WhatsApp, por telefone ou por e-mail e receba o seu orçamento.') => `<section class="cta">
  <div class="in">
    <div><h2>${t}</h2><p>${d}</p></div>
    <div class="acoes">${botaoZap('Solicitar orçamento')}<a class="btn btn-claro" href="tel:${site.foneHref}">${ic('fone')}${site.fone}</a></div>
  </div>
</section>`;

  // Faixa com as outras linhas de produto, nas fotos redondas.
  const outros = atual => `<section class="secao outros">
  <div class="in">
    ${titulo2('Conheça também', 'Outros produtos')}
    <ul class="outros-lista">${produtos.filter(p => p.slug !== atual).map(p => `<li><a href="${P(p.slug)}"><span class="circ">${img(p.mini, p.nome)}</span><b>${p.nome}</b></a></li>`).join('')}</ul>
  </div>
</section>`;

  const diferenciaisHtml = (cls = '') => `<ul class="diferenciais ${cls}">${diferenciais.map(([ic, t]) => `<li><span class="dif-ic" style="--ic:url(/assets/img/icone-${ic}.png)"></span><b>${t}</b></li>`).join('')}</ul>`;
  const areasHtml = () => `<ul class="areas">${sobre.areas.map(([f, t]) => `<li>${areaSvg(f)}<span>${t}</span></li>`).join('')}</ul>`;
  const tab = (rotulos, itens) => itens.map((it, i) => it ? `<details${i === 0 ? ' open' : ''}><summary>${rotulos[i]}</summary>${it}</details>` : '').join('');
  const lista = arr => `<ul class="lista-check">${arr.map(t => `<li>${t}</li>`).join('')}</ul>`;
  const specs = arr => `<dl class="specs">${arr.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

  const paginas = {};

  // ---------- Sobre ----------
  paginas.sobre = `${cab({ fino: 'Somos a', forte: 'BM Soluções em Aços', lead: `Desde agosto de ${site.fundacao} no mercado de comercialização de aço, fabricação e instalação de telas, em Canoas/RS.`, foto: 'sede-aerea', alt: 'Sede da BM Soluções em Aços em Canoas' })}
<section class="secao">
  <div class="in duas sobre-hist">
    <div class="texto">
      ${eyebrow('Nossa história')}
      ${sobre.textos.map((t, i) => `<p${i === 0 ? ' class="destaque"' : ''}>${t}</p>`).join('')}
      <p class="frase">${sobre.frase}</p>
    </div>
    <div class="mosaico">
      <figure class="m1">${img('sede-outdoor', 'Fachada da BM Soluções em Aços com o outdoor da empresa')}</figure>
      <figure class="m2">${img('equipe-tela', 'Colaborador da BM fabricando tela')}</figure>
      <figure class="m3">${img('maquina-laser', 'Máquina de corte a laser da BM')}</figure>
      <figure class="m4">${img('chapa-mesa', 'Chapa expandida sobre a mesa')}</figure>
    </div>
  </div>
</section>
<section class="numeros">
  <div class="in">
    <div><b>${site.fundacao}</b><span>ano de fundação, em agosto</span></div>
    <div><b>+${anos - (anos % 5)}</b><span>anos de mercado</span></div>
    <div><b>${produtos.length}</b><span>linhas de produtos</span></div>
    <div><b>${sobre.areas.length}</b><span>setores atendidos</span></div>
  </div>
</section>
<section class="secao secao-areas">
  <div class="in">
    <div class="secao-cab centro">${titulo2('Áreas de', 'Atuação')}<p>Atendemos obras e indústrias de diversos setores com aço, corte a laser, telas e conexões.</p></div>
    ${areasHtml()}
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab centro">${titulo2('Por que escolher a', 'BM Soluções em Aços')}</div>
    ${diferenciaisHtml()}
  </div>
</section>
${cta()}`;

  // ---------- Produtos ----------
  paginas.produtos = `${cab({ fino: 'Conheça nossos', forte: 'Produtos', lead: 'A BM Soluções em Aços é uma empresa distribuidora de aços, chapas e tubos. Fabricante e comerciante de telas para finalidades variadas.' })}
<section class="secao">
  <div class="in prod-grade">${produtos.map((p, i) => `<article class="prod-card${i < 2 ? ' grande' : ''}">
    <a class="pc-foto" href="${P(p.slug)}">${img(p.foto, p.nome)}</a>
    <div class="pc-txt"><span class="n">${num(i)}</span><h2><a href="${P(p.slug)}">${p.nome}</a></h2><p>${p.resumo}</p>
      <div class="pc-acoes"><a class="link" href="${P(p.slug)}">Saiba mais ${seta}</a>${p.pdf ? `<a class="link link-pdf" href="${p.pdf}" target="_blank" rel="noopener">${ic('pdf')}Catálogo</a>` : ''}</div></div>
  </article>`).join('')}</div>
</section>
${cta()}`;

  // ---------- Corte a laser ----------
  const espMax = 16;
  paginas['produtos/corte-a-laser'] = `${cab({ trilha: [['produtos', 'Produtos']], fino: 'Serviço', forte: 'Corte a laser', lead: 'Precisão e qualidade que você precisa. ' + laser.servicos, foto: 'laser-feixe', alt: 'Feixe de corte a laser sobre chapa de aço', acoes: botaoZap('Solicitar orçamento', 'btn-prim', 'Olá! Gostaria de um orçamento de corte a laser.') })}
<section class="secao">
  <div class="in">
    <ol class="vantagens">${laser.vantagens.map(([t, d], i) => `<li><span class="n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in duas laser-mat">
    <div>
      ${titulo2('Principais', 'Materiais')}
      <p>Trabalhamos principalmente com aço carbono, aço galvanizado e aço inox. Mesa de corte de até <strong>${laser.mesa}</strong>.</p>
      <ul class="espessuras">${laser.materiais.filter(m => m[2]).map(([f, n, e]) => `<li><span class="esp-nome">${n}</span><span class="esp-barra" style="--p:${(e / espMax) * 100}%"><i></i></span><b>até ${e} mm</b></li>`).join('')}</ul>
      <p class="nota">Espessura máxima de corte por material.</p>
    </div>
    <ul class="materiais">${laser.materiais.map(([f, n]) => `<li>${img(f, n)}<span>${n}</span></li>`).join('')}</ul>
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab">${titulo2('Como pedir o seu', 'Orçamento')}<p>${laser.orcamento}</p></div>
    <ol class="etapas">${laser.etapas.map(([t, d], i) => `<li><span class="n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in duas laser-vetor">
    <figure>${img('laser-orcamento', 'Peças cortadas a laser')}</figure>
    <div>
      ${titulo2('Não tem o arquivo', 'Vetorial?')}
      <p>Oferecemos consultoria para criar o arquivo a partir de imagens de referência, desenhos à mão ou do próprio objeto físico.</p>
      <div class="opcoes">${laser.semArquivo.map(([t, d]) => `<div class="opcao"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
    </div>
  </div>
</section>
<section class="secao mesa-sec">
  <div class="in duas">
    <div>${titulo2('Dimensões e', 'Espessuras')}<p>A mesa de corte comporta chapas de até ${laser.mesa}. Espessura máxima de 16 mm em aço carbono, 10 mm em aço inox e 4 mm em alumínio.</p>${botaoZap('Enviar meu arquivo .DXF', 'btn-prim', 'Olá! Quero enviar um arquivo .DXF para orçamento de corte a laser.')}</div>
    <div class="mesa" aria-label="Mesa de corte de 1500 por 3000 milímetros"><div class="mesa-chapa"><span class="m-larg">3000 mm</span><span class="m-alt">1500 mm</span>${img('laser-dimensoes', 'Dimensões de corte')}</div></div>
  </div>
</section>
${outros('corte-a-laser')}
${cta()}`;

  // ---------- Telas ----------
  paginas['produtos/telas'] = `${cab({ trilha: [['produtos', 'Produtos']], fino: 'Fabricação e instalação de', forte: 'Telas e gradis', lead: 'Telas soldadas, telas em rolo, gradis, alambrado e tela otis para residências, indústrias, condomínios, quadras e áreas rurais.', foto: 'telas-rolos', alt: 'Rolos de tela alambrado', acoes: botaoZap('Pedir orçamento de telas', 'btn-prim', 'Olá! Gostaria de um orçamento de telas.') })}
<section class="secao">
  <div class="in">
    <div class="filtros" role="tablist" aria-label="Filtrar telas"><button class="ativo" data-filtro="todas">Todas</button>${telas.grupos.map(([g, t]) => `<button data-filtro="${g}">${t}</button>`).join('')}</div>
    <div class="telas-lista">${telas.itens.map(t => `<article class="tela" data-grupo="${t.g}">
      <figure class="tela-foto">${img(t.foto, t.nome)}</figure>
      <div class="tela-txt">
        <span class="tag">${telas.grupos.find(g => g[0] === t.g)[1]}</span>
        <h2>${t.nome}</h2>
        ${t.texto ? `<p>${t.texto}</p>` : ''}
        <div class="abas">${tab(t.specs ? ['Características', 'Principais aplicações', 'Não recomenda-se'] : ['Principais aplicações', 'Bitolas de fio'],
          t.specs ? [specs(t.specs), lista(t.usos), t.nao ? lista(t.nao) : ''] : [lista(t.usos), `<div class="bitolas">${img(t.malha, 'Medida da malha e diâmetro do fio')}<table><thead><tr><th>Fio</th><th>Diâmetro</th></tr></thead><tbody>${telas.bitolas.map(([f, d]) => `<tr><td>${f}</td><td>${d} mm</td></tr>`).join('')}</tbody></table></div>`])}</div>
        <div class="acoes">${botaoZap('Solicitar orçamento', 'btn-prim', `Olá! Gostaria de um orçamento de ${t.nome}.`)}${t.pdf ? botaoPdf(t.pdf, 'Catálogo') : ''}</div>
      </div>
    </article>`).join('')}</div>
  </div>
</section>
${outros('telas')}
${cta()}`;

  // ---------- Chapas expandidas ----------
  const chapaPdf = produtos.find(p => p.slug === 'chapas-expandidas').pdf;
  paginas['produtos/chapas-expandidas'] = `${cab({ trilha: [['produtos', 'Produtos']], fino: 'Pretas e galvanizadas', forte: 'Chapas expandidas', lead: 'Malhas de 5x10 a 50x100 mm, em espessuras de 0,75 a 7,94 mm.', foto: 'banner-chapa', alt: 'Chapa expandida sobre a mesa', acoes: `${botaoPdf(chapaPdf, 'Baixar o catálogo completo')}${botaoZap('Solicitar orçamento', 'btn-claro', 'Olá! Gostaria de um orçamento de chapa expandida.')}` })}
<section class="secao">
  <div class="in duas chapa-medir">
    <div>${titulo2('Como medir a', 'Chapa expandida')}<p>${chapas.intro}</p></div>
    <figure class="diagrama">${img('chapa-diagrama', 'Diagrama de medidas da chapa expandida')}
      <figcaption><dl class="legenda">${chapas.medidas.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></figcaption></figure>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab">${titulo2('Malhas e', 'Espessuras')}<p>Medidas da malha em milímetros (A x B). Espessuras disponíveis em chapa preta e galvanizada, em mm.</p></div>
    <div class="malhas">
      <div class="malhas-cab" aria-hidden="true"><span>Malha</span><span>Preta</span><span>Galvanizada</span></div>
      ${chapas.malhas.map(([m, f, p, g]) => `<div class="malha">
        <div class="malha-id">${img(f, 'Malha ' + m)}<b>${m}</b></div>
        <div class="malha-esp"><small>Preta</small>${p.map(e => `<span class="chip preta">${e}</span>`).join('')}</div>
        <div class="malha-esp"><small>Galvanizada</small>${g.length ? g.map(e => `<span class="chip galv">${e}</span>`).join('') : '<span class="sem">sob consulta</span>'}</div>
      </div>`).join('')}
    </div>
  </div>
</section>
<section class="secao">
  <div class="in galeria-3">
    <figure>${img('mao-chapa', 'Chapa expandida sendo manuseada')}</figure>
    <figure>${img('rolos-expandida', 'Rolos de chapa expandida no estoque')}</figure>
    <figure>${img('rolos-chapa', 'Chapas expandidas no estoque')}</figure>
  </div>
</section>
${outros('chapas-expandidas')}
${cta('Conheça mais sobre os nossos produtos', 'Conte o seu projeto e a nossa equipe propõe a malha e a espessura certas.')}`;

  // ---------- Conexões ----------
  paginas['produtos/conexoes'] = `${cab({ trilha: [['produtos', 'Produtos']], fino: 'Galvanizadas, carbono e inox', forte: 'Conexões', lead: 'Conexões, flanges, válvulas e acessórios para corrimão para obras, indústrias e instalações sanitárias.', foto: 'conexoes-mesa', alt: 'Conexões em aço sobre a mesa', acoes: botaoZap('Pedir o catálogo de acessórios', 'btn-prim', 'Olá! Gostaria de receber o catálogo de acessórios (conexões).') })}
<section class="secao">
  <div class="in con-grade">${conexoes.map(([f, n], i) => `<article class="con">
    <figure>${img(f, n)}</figure><span class="n">${num(i)}</span><h2>${n}</h2>
    <a class="link" href="${zap(`Olá! Gostaria de um orçamento de ${n.toLowerCase()}.`)}" target="_blank" rel="noopener">Solicitar orçamento ${seta}</a></article>`).join('')}</div>
</section>
<section class="faixa-foto">
  ${img('banner-sanitario', 'Conexões sanitárias em aço inox', 'class="ff-fundo"')}
  <div class="in"><div class="ff-txt">${titulo2('Linha sanitária', 'Em aço inox')}<p>Curvas, abraçadeiras, uniões e válvulas em aço inox para a indústria de alimentos, bebidas e saúde.</p>${botaoZap('Consultar disponibilidade', 'btn-prim', 'Olá! Gostaria de consultar conexões sanitárias em aço inox.')}</div></div>
</section>
${outros('conexoes')}
${cta()}`;

  // ---------- Arames ----------
  paginas['produtos/arames'] = `${cab({ trilha: [['produtos', 'Produtos']], fino: 'Farpado, galvanizado e revestido', forte: 'Arames', lead: 'Arames para cercamentos, amarração e uso geral, na obra e no campo.' })}
<section class="secao">
  <div class="in arames">${arames.map(([f, n, d], i) => `<article class="arame">
    <figure>${img(f, n)}</figure>
    <div><span class="n">${num(i)}</span><h2>${n}</h2><p>${d}</p>${botaoZap('Solicitar orçamento', 'btn-sec', `Olá! Gostaria de um orçamento de ${n.toLowerCase()}.`)}</div></article>`).join('')}</div>
</section>
${outros('arames')}
${cta()}`;

  // ---------- Comercialização de aço ----------
  paginas['produtos/comercializacao-de-aco'] = `${cab({ trilha: [['produtos', 'Produtos']], fino: 'Carbono, inox e especiais', forte: 'Comercialização de aço', lead: 'Barras, tubos, chapas e perfis em aço carbono, aço inox e aços especiais.', foto: 'banner-carbono', alt: 'Conexões e flanges em aço carbono', acoes: botaoZap('Consultar estoque', 'btn-prim', 'Olá! Gostaria de consultar o estoque de aço.') })}
<section class="secao">
  <div class="in">
    <ul class="familias">${aco.familias.map(([f, itens], i) => `<li><span class="n">${num(i)}</span><h2>${f}</h2><ul>${itens.map(t => `<li>${t}</li>`).join('')}</ul></li>`).join('')}</ul>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in duas aco-mat">
    <div>${titulo2('Os materiais que', 'Distribuímos')}<p>Aço carbono para estruturas e serralheria, aço inox para as indústrias de alimentos, saúde e química, e aços especiais sob consulta.</p>
      <div class="acoes">${botaoZap('Pedir cotação', 'btn-prim', 'Olá! Gostaria de uma cotação de aço.')}<a class="btn btn-sec" href="${P('corte-a-laser')}">Corte a laser sob medida</a></div></div>
    <ul class="materiais altos">${aco.materiais.map(([f, n]) => `<li>${img(f, n)}<span>${n}</span></li>`).join('')}</ul>
  </div>
</section>
<section class="secao">
  <div class="in galeria-3">
    <figure>${img('aco-tubos', 'Tubos de aço no estoque')}</figure>
    <figure>${img('aco-chapas', 'Chapas de aço inox')}</figure>
    <figure>${img('esp-aco', 'Tubos galvanizados')}</figure>
  </div>
</section>
${outros('comercializacao-de-aco')}
${cta()}`;

  // ---------- Concertinas ----------
  paginas['produtos/concertinas'] = `${cab({ trilha: [['produtos', 'Produtos']], fino: 'Segurança perimetral', forte: 'Concertinas', lead: concertinas.intro, foto: 'concertina-muro', alt: 'Concertina instalada sobre muro' })}
<section class="secao">
  <div class="in">
    <div class="secao-cab">${titulo2('Diversos tipos de concertinas', 'Para o seu projeto')}</div>
    <div class="concertinas">${concertinas.tipos.map(([f, n, d, s]) => `<article class="conc">
      <div class="conc-diam"><b>${d.replace(' cm', '')}</b><small>cm</small></div>
      <figure>${img(f, `${n} ${d}`)}</figure>
      <h2>${n}</h2>${specs(s)}</article>`).join('')}</div>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in galeria-4">${concertinas.galeria.map(f => `<figure>${img(f, 'Concertina instalada')}</figure>`).join('')}</div>
</section>
<section class="secao">
  <div class="in conc-outros">${concertinas.outros.map(([f, n, d, extra]) => `<article>
    <div class="co-fotos">${img(f, n)}${extra.map(e => img(e, n)).join('')}</div>
    <h2>${n}</h2><p>${d}</p><a class="link" href="${zap(`Olá! Gostaria de um orçamento de ${n}.`)}" target="_blank" rel="noopener">Solicitar orçamento ${seta}</a></article>`).join('')}</div>
</section>
${outros('concertinas')}
${cta()}`;

  // ---------- Suinocultura ----------
  paginas['produtos/suinocultura'] = `${cab({ trilha: [['produtos', 'Produtos']], fino: 'Agro', forte: 'Sistemas para suinocultura', lead: 'Equipamentos em aço para a suinocultura, entre eles o comedouro Spotfeeder. Veja os catálogos completos.' })}
<section class="secao">
  <div class="in duas suino">
    <figure class="suino-prod">${img('spotfeeder', 'Comedouro Spotfeeder')}</figure>
    <div>
      <figure class="suino-circ">${img('suinos', 'Suínos no comedouro')}</figure>
      ${titulo2('Comedouro', 'Spotfeeder')}
      <p>Linha de sistemas para suinocultura da BM Soluções em Aços. As medidas, os modelos e as especificações estão nos catálogos.</p>
      <div class="acoes">${suinocultura.pdfs.map(([t, u]) => botaoPdf(u, t)).join('')}</div>
      <div class="acoes">${botaoZap('Falar com um consultor', 'btn-prim', 'Olá! Gostaria de saber mais sobre os sistemas para suinocultura.')}</div>
    </div>
  </div>
</section>
${outros('suinocultura')}
${cta()}`;

  // ---------- Obras ----------
  paginas.obras = `${cab({ fino: 'Veja algumas das nossas', forte: 'Obras realizadas', lead: 'Cercamentos, gradis, quadras, guarda-corpos e fechamentos de galpão executados pela nossa equipe.' })}
<section class="secao">
  <div class="in obras-grade" data-galeria>${obras.destaques.map(([f, t], i) => `<button class="obra o${i + 1}" data-foto="/assets/img/${f}.webp" aria-label="Ampliar: ${t}">${img(f, t)}<span>${t}</span></button>`).join('')}
    ${obras.outras.map(f => `<button class="obra pequena" data-foto="/assets/img/${f}.webp" aria-label="Ampliar foto de obra">${img(f, 'Obra realizada pela BM Soluções em Aços')}</button>`).join('')}</div>
</section>
<dialog class="lightbox" data-lightbox><button class="lb-fechar" data-fechar aria-label="Fechar">×</button><img alt=""></dialog>
${cta('Tem uma obra para cercar?', 'Fazemos a fabricação e a instalação de telas, gradis e concertinas. Peça o seu orçamento.')}`;

  // ---------- Contato ----------
  paginas.contato = `${cab({ fino: 'Fale com a', forte: 'BM Soluções em Aços', lead: 'Envie a sua mensagem ou fale direto com a nossa equipe pelo WhatsApp.' })}
<section class="secao">
  <div class="in contato">
    <div class="contato-form">${titulo2('Envie-nos', 'Sua mensagem')}${formulario()}</div>
    <div class="contato-info">
      ${titulo2('Entre em', 'Contato')}
      <ul class="info">
        <li>${ic('local')}<div><b>Endereço</b><a href="${site.mapaLink}" target="_blank" rel="noopener">${site.endereco} · ${site.bairro}</a></div></li>
        <li>${ic('relogio')}<div><b>Horário de atendimento</b><span>${site.horario[0]}, ${site.horario[1].toLowerCase()}</span></div></li>
        <li>${ic('fone')}<div><b>Telefone</b><a href="tel:${site.foneHref}">${site.fone}</a></div></li>
        <li>${ic('zap')}<div><b>WhatsApp</b><a href="${zap()}" target="_blank" rel="noopener">${site.zapTxt}</a></div></li>
        <li>${ic('email')}<div><b>E-mail</b><a href="mailto:${site.email}">${site.email}</a></div></li>
      </ul>
      <div class="redes">${site.redes.map(([n, u, h]) => `<a href="${u}" target="_blank" rel="noopener">${ic(n.toLowerCase())}${h}</a>`).join('')}</div>
    </div>
  </div>
</section>
<section class="mapa"><iframe title="Mapa: ${site.endereco}, ${site.bairro}" src="${site.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;

  return { paginas, cta, cab, outros, diferenciaisHtml, areasHtml, L, P };
}
