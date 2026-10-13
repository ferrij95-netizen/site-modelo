// Páginas internas (iguais em conteúdo nas duas versões; o visual muda pelo CSS de cada versão)
// e a página inicial de cada versão.
import { site, textos, numeros, sabores, fotos, eventos } from './conteudo.mjs';
import { esc, num, zap, zapEventos, linkDe, foto, icone, logo, porDoSolHoje, abertoAgora, arcoDoDia, formReserva, formContato, formEvento } from './comum.mjs';

const eyebrow = t => `<span class="eyebrow">${t}</span>`;

// Cabeçalho das páginas internas.
const cabecalho = ({ eyebrow: e, titulo, texto, img, alt }) => `<section class="pg-cab">
  <div class="pg-cab-foto">${foto(img, alt, 'fetchpriority="high" loading="eager"')}</div>
  <div class="in pg-cab-in">
    ${eyebrow(e)}
    <h1>${titulo}</h1>
    ${texto ? `<p>${texto}</p>` : ''}
  </div>
</section>`;

const numerosFaixa = (cls = '') => `<ul class="numeros ${cls}" data-rev>${numeros.map(([n, t], i) => `<li style="--i:${i}"><b>${n}</b><span>${t}</span></li>`).join('')}</ul>`;

const galeria = (lista, cls = '', grande = true) => `<div class="galeria ${cls}" data-galeria>${lista.map(([n, l], i) => `<a href="/assets/img/${n}.webp" data-legenda="${esc(l)}" class="g-${i + 1}" style="--i:${i}">${foto(n, l, '', !grande)}<span>${l}</span></a>`).join('')}</div>`;

// ---------- Páginas internas ----------

export function restaurante() {
  return `${cabecalho({ eyebrow: 'Sobre · 360 POA Gastrobar', titulo: 'O Restaurante', texto: 'Um prédio redondo de vidro, dentro do Guaíba, com a cidade de um lado e o pôr do sol do outro.', img: 'fachada-por-do-sol', alt: 'O prédio redondo do 360 POA ao entardecer' })}
<section class="sec hist">
  <div class="in hist-in">
    <div class="hist-txt" data-rev>
      ${eyebrow(textos.conhecaEyebrow)}
      <h2>Nascido junto com a nova orla de Porto Alegre</h2>
      <p class="lead">${textos.conheca}</p>
      <p>${textos.conheca2}</p>
      <p class="assina">${textos.chamada}</p>
    </div>
    <ol class="linha" data-rev>
      <li><b>2018</b><span>A orla do Guaíba ganha o Parque Moacyr Scliar, novo cartão-postal de Porto Alegre.</span></li>
      <li><b>23 out 2018</b><span>Inauguração oficial do 360 POA Gastrobar, com a presença da Prefeitura.</span></li>
      <li><b>Hoje</b><span>Referência entre os restaurantes turísticos do Rio Grande do Sul, aberto todos os dias.</span></li>
    </ol>
  </div>
</section>
<section class="sec arq">
  <div class="in arq-in">
    <figure class="arq-foto" data-rev>${foto('vidro-por-do-sol', 'O salão envidraçado avança sobre o Guaíba')}<figcaption>O salão de vidro avança sobre as águas do Guaíba.</figcaption></figure>
    <div class="arq-txt" data-rev>
      ${eyebrow('O espaço')}
      <h2>Construído dentro do Guaíba</h2>
      <p>O 360 POA ocupa uma estrutura de metal e vidro sobre o lago, ao lado do ponto de atracação dos barcos de turismo da Orla Moacyr Scliar. Do salão envidraçado, a vista corre em volta: o centro histórico, a Usina do Gasômetro e o horizonte do Guaíba.</p>
      <p>O projeto de interiores e do deck é dos arquitetos Alexandre Viero, Sheila Bittencourt e Silvia Benedetti. Do lado de fora, o jardim e a varanda coberta ganham luzes à noite.</p>
      <ul class="arq-lista">
        <li>${icone('copa')} Salão envidraçado com vista para o lago</li>
        <li>${icone('folha')} Deck e jardim ao ar livre</li>
        <li>${icone('pessoas')} Até 250 pessoas ao mesmo tempo</li>
      </ul>
    </div>
    <figure class="arq-foto2" data-rev>${foto('salao-gasometro', 'Mesas do salão com vista para a Usina do Gasômetro')}</figure>
  </div>
</section>
<section class="sec faixa-360">
  <div class="faixa-img">${foto('faixa-noite', 'O 360 POA iluminado à noite, sobre o Guaíba')}</div>
  <div class="in">${numerosFaixa()}</div>
</section>
<section class="sec dia">
  <div class="in">
    <div class="sec-cab" data-rev>${eyebrow('Das 11:00 às 22:30')}<h2>Um dia no 360</h2>${porDoSolHoje()}</div>
    ${arcoDoDia()}
  </div>
</section>`;
}

export function cardapio(versao) {
  const L = linkDe(versao);
  return `${cabecalho({ eyebrow: 'Gastronomia contemporânea sulista', titulo: 'Cardápio', texto: 'Carnes nobres e ingredientes frescos, em grande parte orgânicos, com sabores do Rio Grande do Sul.', img: 'deck-luzes', alt: 'O jardim e o deck iluminados à noite' })}
<section class="sec lousa">
  <div class="lousa-fundo">${foto('lousa-legumes', '', 'aria-hidden="true"')}</div>
  <div class="in lousa-in" data-rev>
    ${eyebrow(textos.cardapioTitulo)}
    <h2>O cardápio completo da casa</h2>
    <p>Entradas, pratos principais, sobremesas e a carta de bebidas do gastrobar, sempre atualizados no cardápio oficial.</p>
    <div class="acoes"><a class="btn btn-sol" href="${site.cardapioPdf}" target="_blank" rel="noopener">${icone('pdf')} Abrir o cardápio (PDF)</a><a class="btn btn-linha" href="${L('contato')}#reserva">Reservar mesa</a></div>
  </div>
</section>
<section class="sec sabores-sec">
  <div class="in">
    <div class="sec-cab" data-rev>${eyebrow('Na cozinha do 360')}<h2>Sabores do Sul, com olhar contemporâneo</h2><p>A cozinha nasceu com a ideia de levar à mesa os ingredientes e a cultura do Rio Grande do Sul.</p></div>
    <ol class="sabores" data-rev>${sabores.map(([t, d], i) => `<li style="--i:${i}"><span class="n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="sec momento">
  <div class="in momento-in">
    <figure data-rev>${foto('salao-vidro', 'O sol se pondo atrás do salão de vidro')}</figure>
    <div data-rev>
      ${eyebrow('Almoço, fim de tarde e jantar')}
      <h2>A melhor mesa é a do pôr do sol</h2>
      <p>O 360 abre às 11:00 e fecha às 22:30, todos os dias. Para jantar vendo o céu mudar de cor sobre o Guaíba, reserve para o fim da tarde.</p>
      ${porDoSolHoje()}
      <a class="btn btn-sol" href="${zap('Olá! Gostaria de reservar uma mesa para o pôr do sol no 360 POA.')}" target="_blank" rel="noopener">${icone('zap')} Reservar para o pôr do sol</a>
    </div>
  </div>
</section>`;
}

export function eventosPg() {
  return `${cabecalho({ eyebrow: 'Eventos no 360', titulo: 'Eventos', texto: 'Comemore com o Guaíba como cenário: salão envidraçado, deck e jardim, para até 250 pessoas.', img: 'deck-salao', alt: 'Mesas do deck numa noite cheia' })}
<section class="sec ev-tipos">
  <div class="in">
    <div class="sec-cab" data-rev>${eyebrow('Para cada ocasião')}<h2>Seu evento com vista para o Guaíba</h2></div>
    <div class="ev-grade">${eventos.map(([t, d, img], i) => `<article class="ev" data-rev style="--i:${i}">${foto(img, t)}<div><span class="n">${num(i)}</span><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div>
  </div>
</section>
<section class="sec ev-espaco">
  <div class="in ev-espaco-in">
    <div data-rev>
      ${eyebrow('O espaço')}
      <h2>Três ambientes, uma vista só</h2>
      <ul class="ambientes">
        <li><b>Salão envidraçado</b><span>Com vista em volta para o lago e para o centro histórico.</span></li>
        <li><b>Varanda e deck</b><span>Coberta, com luzes e plantas, aberta para a orla.</span></li>
        <li><b>Jardim</b><span>Ao ar livre, para receber os convidados ao entardecer.</span></li>
      </ul>
      <p class="cap">${icone('pessoas')} Capacidade para até 250 pessoas ao mesmo tempo.</p>
    </div>
    <div class="ev-form" data-rev>
      <h3>Peça uma proposta</h3>
      <p>Conte o que você imagina. A equipe responde pelo WhatsApp com as opções para a sua data.</p>
      ${formEvento()}
    </div>
  </div>
</section>`;
}

export function galeriaPg() {
  const todas = [...fotos, ['deck-noite-grande', 'O deck lotado, com o pôr do sol ao fundo'], ['salao-gasometro', 'Mesas do salão com vista para a Usina do Gasômetro'], ['faixa-noite', 'O 360 POA iluminado sobre o Guaíba']];
  return `${cabecalho({ eyebrow: 'Olhares', titulo: 'Galeria', texto: 'O deck, o salão de vidro e o pôr do sol no Guaíba. Toque numa foto para ampliar.', img: 'passarela', alt: 'A passarela da orla ao entardecer' })}
<section class="sec">
  <div class="in">${galeria(todas, 'galeria-pg')}</div>
</section>
<section class="sec insta">
  <div class="in insta-in" data-rev>
    ${icone('insta', 'grande')}
    <div><h2>Mais olhares no Instagram</h2><p>Fotos novas, pratos e o pôr do sol de cada dia em @360gastro.</p></div>
    <a class="btn btn-sol" href="${site.redes[0][1]}" target="_blank" rel="noopener">Seguir @360gastro</a>
  </div>
</section>`;
}

export function contato() {
  return `${cabecalho({ eyebrow: 'Reservas e contato', titulo: 'Fale Conosco', texto: textos.fale, img: 'entrada', alt: 'A entrada do 360 POA Gastrobar na orla' })}
<section class="sec ct" id="reserva">
  <div class="in ct-in">
    <div class="ct-info" data-rev>
      ${eyebrow('Reserve sua mesa')}
      <h2>Garanta seu lugar no 360</h2>
      <p>Preencha e envie: a mensagem chega pronta no WhatsApp da equipe, que confirma a reserva.</p>
      ${porDoSolHoje()}
      <ul class="ct-lista">
        <li>${icone('relogio')}<div><b>Horário</b><span>${site.horario}, todos os dias</span>${abertoAgora()}</div></li>
        <li>${icone('zap')}<div><b>WhatsApp</b><a href="${zap()}" target="_blank" rel="noopener">${site.fone}</a></div></li>
        <li>${icone('mail')}<div><b>E-mail</b><a href="mailto:${site.email}">${site.email}</a></div></li>
        <li>${icone('pin')}<div><b>Endereço</b><span>${site.endereco}<br>${site.bairro}, ${site.cep}</span></div></li>
      </ul>
    </div>
    <div class="ct-form" data-rev><h3>Reserva</h3>${formReserva()}</div>
  </div>
</section>
<section class="sec mapa-sec">
  <div class="in mapa-in">
    <div class="mapa-txt" data-rev>
      ${eyebrow('Como chegar')}
      <h2>Na Orla Moacyr Scliar, perto da Usina do Gasômetro</h2>
      <p>O 360 POA fica sobre o Guaíba, no trecho da orla junto ao Centro Histórico, ao lado do ponto de atracação dos barcos de turismo.</p>
      <a class="btn btn-sol" href="${site.rota}" target="_blank" rel="noopener">${icone('pin')} Traçar rota</a>
      <div class="ct-msg"><h3>Outras dúvidas</h3>${formContato()}</div>
    </div>
    <div class="mapa" data-rev><iframe src="${site.mapa}" title="Mapa: ${site.endereco}, ${site.bairro}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
  </div>
</section>`;
}

// ---------- Página inicial, versão A: "Noite no Guaíba" ----------

export function inicioA() {
  const L = linkDe('a');
  return `<section class="hero">
  <div class="hero-foto">${foto('deck-noite-grande', 'O deck do 360 POA lotado ao anoitecer, com o Guaíba ao fundo', 'fetchpriority="high" loading="eager"')}</div>
  <div class="in hero-in">
    ${logo('branco', 210)}
    <h1>${textos.heroTitulo}</h1>
    <p class="hero-sub">${textos.heroSub}</p>
    <div class="acoes"><a class="btn btn-sol" href="${L('cardapio')}">Cardápio</a><a class="btn btn-linha" href="${L('contato')}#reserva">Reservar mesa</a></div>
  </div>
  <div class="hero-pe"><div class="in">${porDoSolHoje()}${abertoAgora()}<span class="hero-end">${icone('pin')} Orla do Guaíba · Centro Histórico</span></div></div>
</section>

<section class="sec conheca">
  <div class="in conheca-in">
    <div class="conheca-txt" data-rev>
      ${eyebrow(textos.conhecaEyebrow)}
      <h2>${textos.conhecaTitulo}</h2>
      <p class="lead">${textos.conheca}</p>
      <p>${textos.conheca2}</p>
      <a class="link-seta" href="${L('o-restaurante')}">Saiba mais ${icone('seta')}</a>
    </div>
    <div class="circulos" data-rev>
      <div class="anel" aria-hidden="true"></div>
      <figure class="c1">${foto('vidro-por-do-sol', 'O salão envidraçado sobre o Guaíba ao pôr do sol')}</figure>
      <figure class="c2">${foto('salao-gasometro', 'Mesas do salão com vista para a Usina do Gasômetro')}</figure>
      <span class="selo"><b>360°</b>de vista</span>
    </div>
  </div>
</section>

<section class="sec faixa-360">
  <div class="faixa-img">${foto('faixa-noite', 'O 360 POA iluminado à noite, sobre o Guaíba')}</div>
  <div class="in">
    <p class="faixa-tit" data-rev>Um prédio redondo, construído dentro do Guaíba.</p>
    ${numerosFaixa()}
  </div>
</section>

<section class="sec dia">
  <div class="in">
    <div class="sec-cab" data-rev>${eyebrow('Das 11:00 às 22:30')}<h2>Um dia no 360</h2><p class="falta" data-falta-sol></p></div>
    ${arcoDoDia()}
  </div>
</section>

<section class="sec fale">
  <div class="fale-fundo">${foto('varanda-noite', '', 'aria-hidden="true"')}</div>
  <div class="in fale-in">
    <div class="fale-txt" data-rev>
      ${eyebrow('Reservas')}
      <h2>${textos.faleTitulo}</h2>
      <p>${textos.fale}</p>
      <ul class="fale-atalhos">
        <li><a href="${zap()}" target="_blank" rel="noopener">${icone('zap')}<span><b>WhatsApp</b>${site.fone}</span></a></li>
        <li><a href="mailto:${site.email}">${icone('mail')}<span><b>E-mail</b>${site.email}</span></a></li>
        <li><span class="sem-link">${icone('relogio')}<span><b>Horário</b>11:00 às 22:30, todos os dias</span></span></li>
      </ul>
    </div>
    <div class="vidro" data-rev><h3>Reserve sua mesa</h3>${formReserva()}</div>
  </div>
</section>

<section class="sec lousa">
  <div class="lousa-fundo">${foto('lousa-legumes-baixo', '', 'aria-hidden="true"')}</div>
  <div class="in lousa-home">
    <div class="sec-cab" data-rev>${eyebrow('Gastronomia contemporânea sulista')}<h2>${textos.cardapioTitulo}</h2><p>Carnes nobres e ingredientes frescos, em grande parte orgânicos, com sabores do Rio Grande do Sul.</p></div>
    <ul class="giz" data-rev>${sabores.map(([t, d], i) => `<li style="--i:${i}"><b>${t}</b><span>${d}</span></li>`).join('')}</ul>
    <div class="acoes centro" data-rev><a class="btn btn-sol" href="${L('cardapio')}">Ver o cardápio</a><a class="btn btn-linha" href="${site.cardapioPdf}" target="_blank" rel="noopener">${icone('pdf')} Cardápio em PDF</a></div>
  </div>
</section>

<section class="sec olhares">
  <div class="in">
    <div class="sec-cab lado" data-rev><div>${eyebrow('Olhares')}<h2>O 360 em fotos</h2></div><a class="link-seta" href="${L('galeria')}">Ver a galeria ${icone('seta')}</a></div>
    ${galeria(fotos, 'mosaico')}
  </div>
</section>

<section class="sec ev-teaser">
  <div class="in ev-teaser-in">
    <figure data-rev>${foto('deck-salao', 'Mesas do deck numa noite cheia')}</figure>
    <div data-rev>
      ${eyebrow('Eventos')}
      <h2>Comemore com o Guaíba como cenário</h2>
      <p>Aniversários, confraternizações e encontros de empresa no salão envidraçado, na varanda ou no deck, para até 250 pessoas.</p>
      <div class="acoes"><a class="btn btn-sol" href="${zapEventos}" target="_blank" rel="noopener">${icone('zap')} Falar sobre meu evento</a><a class="btn btn-linha" href="${L('eventos')}">Conhecer os espaços</a></div>
    </div>
  </div>
</section>`;
}

// ---------- Página inicial, versão B: "Fim de tarde" ----------

export function inicioB() {
  const L = linkDe('b');
  const roda = 'VISTA PARA O GUAÍBA · 360 POA GASTROBAR ·';
  return `<section class="hero">
  <div class="in hero-in">
    <div class="hero-txt">
      ${eyebrow('Orla do Guaíba · Porto Alegre')}
      <h1>${textos.heroTitulo}</h1>
      <p class="hero-sub">${textos.heroSub}</p>
      <div class="acoes"><a class="btn btn-sol" href="${L('cardapio')}">Cardápio</a><a class="btn btn-linha" href="${L('contato')}#reserva">Reservar mesa</a></div>
      <div class="hero-chips">${porDoSolHoje()}${abertoAgora()}</div>
    </div>
    <div class="hero-arco">
      <div class="janela" data-slides>
        <div class="slide on">${foto('fachada-por-do-sol', 'O prédio redondo do 360 POA com o céu alaranjado', 'fetchpriority="high" loading="eager"')}</div>
        <div class="slide">${foto('vidro-por-do-sol', 'O salão envidraçado sobre o Guaíba ao pôr do sol')}</div>
        <div class="slide">${foto('deck-luzes', 'O jardim e o deck iluminados à noite')}</div>
      </div>
      <svg class="roda" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="99" class="roda-fundo"/><defs><path id="circ" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><text><textPath href="#circ" textLength="488" lengthAdjust="spacing">${roda}</textPath></text></svg>
      <span class="roda-centro">360°</span>
    </div>
  </div>
</section>

<section class="sec conheca">
  <div class="in conheca-in">
    <div class="conheca-fotos" data-rev>
      <figure class="f1">${foto('passarela', 'A passarela da orla, com o 360 POA ao fundo, ao entardecer')}</figure>
      <figure class="f2">${foto('salao-gasometro', 'Mesas do salão com vista para a Usina do Gasômetro')}</figure>
    </div>
    <div class="conheca-txt" data-rev>
      ${eyebrow(textos.conhecaEyebrow)}
      <h2>${textos.conhecaTitulo}</h2>
      <p class="lead">${textos.conheca}</p>
      <p>${textos.conheca2}</p>
      <dl class="mini-num">${numeros.slice(0, 3).map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>
      <a class="btn btn-escuro" href="${L('o-restaurante')}">Saiba mais</a>
    </div>
  </div>
</section>

<section class="sec fale">
  <div class="in fale-in">
    <div class="fale-txt" data-rev>
      ${eyebrow('Reservas')}
      <h2>${textos.faleTitulo}</h2>
      <p>${textos.fale}</p>
      <ol class="passos">
        <li><b>Escolha o dia</b><span>Almoço, fim de tarde ou jantar.</span></li>
        <li><b>Envie o pedido</b><span>A mensagem sai pronta no WhatsApp.</span></li>
        <li><b>Receba a confirmação</b><span>A equipe do 360 confirma sua mesa.</span></li>
      </ol>
      <p class="fale-alt">Prefere ligar ou escrever? <a href="${zap()}" target="_blank" rel="noopener">${site.fone}</a> · <a href="mailto:${site.email}">${site.email}</a></p>
    </div>
    <div class="cartao" data-rev><h3>Reserve sua mesa</h3>${formReserva()}</div>
  </div>
</section>

<section class="sec cardapio-b">
  <div class="in cardapio-b-in">
    <div class="lousa-quadro" data-rev>
      ${foto('lousa-milho', '', 'aria-hidden="true"')}
      <div>${eyebrow('Gastronomia contemporânea sulista')}<h2>${textos.cardapioTitulo}</h2><p>Carnes nobres e ingredientes frescos, em grande parte orgânicos.</p>
      <div class="acoes"><a class="btn btn-sol" href="${L('cardapio')}">Ver o cardápio</a><a class="btn btn-linha" href="${site.cardapioPdf}" target="_blank" rel="noopener">${icone('pdf')} PDF</a></div></div>
    </div>
    <ul class="iniciais" data-rev>${sabores.map(([t, d], i) => `<li style="--i:${i}"><span class="ini" aria-hidden="true">${t[0]}</span><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ul>
  </div>
</section>

<section class="sec dia">
  <div class="in">
    <div class="sec-cab" data-rev>${eyebrow('Das 11:00 às 22:30')}<h2>Um dia no 360</h2><p class="falta" data-falta-sol></p></div>
    ${arcoDoDia()}
  </div>
</section>

<section class="sec faixa-360">
  <div class="faixa-img">${foto('faixa-noite', 'O 360 POA iluminado à noite, sobre o Guaíba')}</div>
  <div class="in"><p class="faixa-tit" data-rev>Um prédio redondo, construído dentro do Guaíba.</p></div>
</section>

<section class="sec olhares">
  <div class="in">
    <div class="sec-cab lado" data-rev><div>${eyebrow('Olhares')}<h2>O 360 em fotos</h2></div><div><div class="filme-setas"><button type="button" data-rolar="-1" aria-label="Fotos anteriores">${icone('seta')}</button><button type="button" data-rolar="1" aria-label="Próximas fotos">${icone('seta')}</button></div><a class="link-seta" href="${L('galeria')}">Ver a galeria ${icone('seta')}</a></div></div>
  </div>
  ${galeria(fotos, 'filme')}
</section>

<section class="sec ev-lista-sec">
  <div class="in ev-lista-in">
    <div class="sec-cab" data-rev>${eyebrow('Eventos')}<h2>Comemore com o Guaíba como cenário</h2><p>Salão envidraçado, varanda e deck para até 250 pessoas.</p>
      <a class="btn btn-sol" href="${zapEventos}" target="_blank" rel="noopener">${icone('zap')} Falar sobre meu evento</a></div>
    <ul class="ev-lista" data-rev>${eventos.map(([t, d, img], i) => `<li style="--i:${i}"><a href="${L('eventos')}">${foto(img, t, '', true)}<span class="n">${num(i)}</span><b>${t}</b><span class="d">${d}</span>${icone('seta')}</a></li>`).join('')}</ul>
  </div>
</section>`;
}
