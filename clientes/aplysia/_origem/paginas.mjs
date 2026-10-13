// Páginas internas, iguais em estrutura nas duas versões (o visual muda pelo CSS de cada versão).
// Cada função devolve { titulo, desc, corpo } no idioma pedido.
import { site, segmentos, areas, quemSomos, missao, visao, valores, etapas, premios, casos, noticias, clientes } from './conteudo.mjs';
import { T, U, esc, num, img, icone, linkDe, segLink, areaLink, formContato, zap } from './comum.mjs';

const anosLab = new Date().getFullYear() - 1998; // laboratório: "27 anos" no banner do site atual em 2025

export function cabecalho({ foto, sobre, titulo, intro, pos = 'center', cor }) {
  return `<section class="cab"${cor ? ` style="--seg:${cor}"` : ''}>
  ${img(foto, '', `class="cab-foto" style="object-position:${pos}" loading="eager" fetchpriority="high"`)}
  <div class="in cab-txt">${sobre ? `<p class="sobre">${sobre}</p>` : ''}<h1>${titulo}</h1>${intro ? `<p class="cab-intro">${intro}</p>` : ''}</div>
</section>`;
}

const migalha = (L, lang, itens) => `<nav class="migalha in" aria-label="breadcrumb"><a href="${L('index')}">${T(U.inicio, lang)}</a>${itens.map(([s, t]) => (s ? `<a href="${L(s)}">${t}</a>` : `<span>${t}</span>`)).join('')}</nav>`;

export const numeros = lang => `<ul class="numeros">
  <li><b>1997</b><span>${T(['início das atividades', 'year founded'], lang)}</span></li>
  <li><b>15</b><span>${T(U.estados, lang)} ${T(['e diversos países', 'and several countries'], lang)}</span></li>
  <li><b>${premios.length}</b><span>${T(U.premiosN, lang)}</span></li>
  <li><b>ISO 17025</b><span>${T(['laboratório de ecotoxicologia acreditado', 'accredited ecotoxicology laboratory'], lang)}</span></li>
</ul>`;

// Lateral das páginas de serviço: "Conheça nossos serviços por: Segmento / Área", como no site atual.
function lateral(L, lang, atual) {
  const lista = (itens, link) => itens.map(x => `<li><a href="${L(link(x))}"${x.slug === atual ? ' aria-current="page"' : ''}>${x.cor ? `<i style="background:${x.cor}"></i>` : icone(x.icone)}${T(x.nome, lang)}</a></li>`).join('');
  return `<aside class="lateral">
  <div class="lat-caixa"><p class="lat-tit">${T(U.conhecaPor, lang)}</p>
    <h3>${T(U.segmento, lang)}</h3><ul>${lista(segmentos, segLink)}</ul>
    <h3>${T(U.area, lang)}</h3><ul>${lista(areas, areaLink)}</ul></div>
  <div class="lat-cta"><p>${T(U.querSaber, lang)}</p><a class="btn btn-prim" href="${L('contato')}">${T(U.cliqueContato, lang)}</a>
    <a class="lat-zap" href="${zap(lang)}" target="_blank" rel="noopener">${icone('zap')}WhatsApp</a></div>
</aside>`;
}

const cta = (L, lang) => `<section class="faixa-cta"><div class="in">
  <div><h2>${T(['Vamos conversar sobre o desafio ambiental da sua empresa?', 'Shall we talk about your company’s environmental challenge?'], lang)}</h2>
  <p>${T(['Fale com a equipe de Soluções em Ecotoxicologia ou com o Laboratório.', 'Talk to our Ecotoxicology Solutions team or to the Laboratory.'], lang)}</p></div>
  <div class="cta-acoes"><a class="btn btn-prim" href="${L('contato')}">${T(U.fale, lang)}</a><a class="btn btn-claro" href="tel:+552733374877">${icone('fone')}(27) 3337-4877</a></div>
</div></section>`;

export function internas(versao, lang) {
  const L = linkDe(versao, lang);
  const p = {};

  // EMPRESA (Quem somos)
  p.empresa = {
    titulo: T(U.quem, lang),
    desc: T(['Desde 1997 a APLYSIA desenvolve soluções ambientais completas para a indústria, com laboratório próprio acreditado ISO/IEC 17025.', 'Since 1997 APLYSIA has developed complete environmental solutions for industry, with its own ISO/IEC 17025 accredited laboratory.'], lang),
    corpo: `${cabecalho({ foto: 'rio-equipe', sobre: T(U.empresa, lang), titulo: T(['Conheça a APLYSIA', 'Meet APLYSIA'], lang), pos: 'center 40%' })}
${migalha(L, lang, [[null, T(U.quem, lang)]])}
<section class="sec in quem">
  <div class="quem-foto">${img('ourico', T(['Pesquisadora da APLYSIA com ouriço-do-mar no laboratório', 'APLYSIA researcher holding a sea urchin in the laboratory'], lang))}</div>
  <div class="quem-txt texto"><h2>${T(['Muito prazer, nós somos a APLYSIA.', 'Nice to meet you, we are APLYSIA.'], lang)}</h2>${quemSomos.map(q => `<p>${T(q, lang)}</p>`).join('')}</div>
</section>
<section class="faixa-grad"><div class="in">
  <h2 class="frase-grande">${T(['Resultados práticos que atendem à legislação <b>e podem trazer ganhos de eficiência e redução</b> de custos para as empresas.', 'Practical results that comply with legislation <b>and can bring efficiency gains and cost reductions</b> to companies.'], lang)}</h2>
  <div class="trio">${['lab-1', 'lab-2', 'lab-3'].map((f, i) => `<figure>${img(f, T([['Equipe no Laboratório de Ecotoxicologia', 'Team at the Ecotoxicology Laboratory'], ['Coleta de ouriço-do-mar em campo', 'Sea urchin collection in the field'], ['Análise ao microscópio no laboratório', 'Microscope analysis in the laboratory']][i], lang))}</figure>`).join('')}</div>
</div></section>
<section class="sec in identidade">
  <p class="sobre">${T(['Identidade corporativa', 'Corporate identity'], lang)}</p>
  <div class="mv">
    <div class="mv-item"><h3>${T(['Missão', 'Mission'], lang)}</h3><p>${T(missao, lang)}</p></div>
    <div class="mv-item"><h3>${T(['Visão', 'Vision'], lang)}</h3><p>${T(visao, lang)}</p></div>
  </div>
  <h3 class="tit-valores">${T(['Valores', 'Values'], lang)}</h3>
  <ol class="valores">${valores.map(([n, d]) => `<li><b>${T(n, lang)}</b><span>${T(d, lang)}</span></li>`).join('')}</ol>
</section>
<section class="sec-alt"><div class="in">${numeros(lang)}</div></section>
${cta(L, lang)}`,
  };

  // PRÊMIOS
  const decadas = [...new Set(premios.map(x => x[0]))];
  p.premios = {
    titulo: T(U.premios, lang),
    desc: T(['Prêmios e reconhecimentos da APLYSIA de 1997 a 2023, entre eles o BRICS Solutions for SDGs Awards e o Best Paper SETAC/IEAM.', 'APLYSIA awards and acknowledgments from 1997 to 2023, including the BRICS Solutions for SDGs Awards and the SETAC/IEAM Best Paper.'], lang),
    corpo: `${cabecalho({ foto: 'rio-floresta', sobre: T(U.empresa, lang), titulo: T(U.premios, lang), intro: T([`${premios.length} reconhecimentos em mais de 25 anos de trabalho, do Prêmio Tião de Sá em 1997 ao Best Paper da SETAC em 2023.`, `${premios.length} acknowledgments in more than 25 years of work, from the Tião de Sá Award in 1997 to the SETAC Best Paper in 2023.`], lang), pos: 'center 60%' })}
${migalha(L, lang, [['empresa', T(U.empresa, lang)], [null, T(U.premios, lang)]])}
<section class="sec in">
  <ol class="linha-tempo">${decadas.map(ano => `<li><span class="ano">${ano}</span><div>${premios.filter(x => x[0] === ano).map(([, nome, quem, desc]) => `<article class="premio">${icone('premio')}<div><h3>${T(nome, lang)}</h3><p class="quem">${T(quem, lang)}</p><p>${T(desc, lang)}</p></div></article>`).join('')}</div></li>`).join('')}</ol>
</section>
${cta(L, lang)}`,
  };

  // CASOS DE SUCESSO
  p['casos-de-sucesso'] = {
    titulo: T(U.casos, lang),
    desc: T(['Estudos e casos de sucesso da APLYSIA em celulose e papel, siderurgia, portos, óleo e gás e outros segmentos.', 'APLYSIA studies and success cases in pulp and paper, steel, ports, oil and gas and other segments.'], lang),
    corpo: `${cabecalho({ foto: 'rio-medicao', sobre: T(U.empresa, lang), titulo: T(U.casos, lang), intro: T(['Estudos aplicados que mostram, com dados, o resultado do nosso trabalho para a indústria.', 'Applied studies that show, with data, the results of our work for industry.'], lang), pos: 'center 35%' })}
${migalha(L, lang, [['empresa', T(U.empresa, lang)], [null, T(U.casos, lang)]])}
<section class="sec in">
  <div class="filtro-seg">${segmentos.map(s => `<span style="--seg:${s.cor}">${T(s.nome, lang)}</span>`).join('')}</div>
  <ul class="casos">${casos.map(([ano, tit, seg, url]) => { const s = segmentos.find(x => x.slug === seg); return `<li style="--seg:${s.cor}"><a href="${url}" target="_blank" rel="noopener"><span class="c-ano">${ano}</span><span class="c-seg">${T(s.nome, lang)}</span><h3>${T(tit, lang)}</h3><span class="c-link">${T(U.verCaso, lang)}${icone('externo')}</span></a></li>`; }).join('')}</ul>
</section>
${cta(L, lang)}`,
  };

  // SERVIÇOS (visão geral)
  p.servicos = {
    titulo: T(U.servicos, lang),
    desc: T(['Serviços ambientais da APLYSIA por segmento (mineração, siderurgia, portos, celulose, óleo e gás) e por área (estudos, monitoramento, efluentes, ecotoxicologia, restauro fluvial).', 'APLYSIA environmental services by segment (mining, steel, ports, pulp, oil and gas) and by area (studies, monitoring, effluents, ecotoxicology, river restoration).'], lang),
    corpo: `${cabecalho({ foto: 'rio-amostra', sobre: T(U.servicos, lang), titulo: T(['Soluções para a indústria. Respeito com o planeta.', 'Solutions for the industry. Respecting the planet.'], lang), intro: T(['Conheça nossos serviços por segmento da indústria ou por área de atuação.', 'Explore our services by industry segment or by area of expertise.'], lang) })}
${migalha(L, lang, [[null, T(U.servicos, lang)]])}
<section class="sec in">
  <div class="tit-sec"><p class="sobre">${T(U.porSeg, lang)}</p><h2>${T(['Cada segmento com a sua lista completa de serviços', 'Each segment with its complete list of services'], lang)}</h2></div>
  <div class="segs-lista">${segmentos.map((s, i) => `<a class="seg-linha" href="${L(segLink(s))}" style="--seg:${s.cor}"><span class="n">${num(i)}</span>${img(s.foto, T(s.nome, lang))}<span class="t"><b>${T(s.nome, lang)}</b><em>${T(s.frase, lang)}</em></span><span class="q">${s.servicos.length} ${T(['serviços', 'services'], lang)}</span>${icone('seta')}</a>`).join('')}</div>
</section>
<section class="sec-alt"><div class="in">
  <div class="tit-sec"><p class="sobre">${T(U.porArea, lang)}</p><h2>${T(['Seis áreas de atuação', 'Six areas of expertise'], lang)}</h2></div>
  <div class="areas-grade">${areas.map(a => `<a class="area-card" href="${L(areaLink(a))}">${img(a.foto, T(a.nome, lang))}<div>${icone(a.icone)}<h3>${T(a.nome, lang)}</h3><p>${T(a.resumo, lang)}</p></div></a>`).join('')}</div>
</div></section>
${cta(L, lang)}`,
  };

  // PÁGINAS DE SEGMENTO
  for (const s of segmentos) {
    const casosSeg = casos.filter(c => c[2] === s.slug);
    p[segLink(s)] = {
      titulo: T(s.nome, lang),
      desc: `${T(s.nome, lang)}: ${T(s.frase, lang)} ${s.servicos.length} ${T(['serviços ambientais da APLYSIA para o segmento.', 'APLYSIA environmental services for the segment.'], lang)}`,
      corpo: `${cabecalho({ foto: s.foto, sobre: `${T(U.servicos, lang)} · ${T(U.segmento, lang)}`, titulo: T(s.nome, lang), intro: T(s.frase, lang), cor: s.cor })}
${migalha(L, lang, [['servicos', T(U.servicos, lang)], [null, T(s.nome, lang)]])}
<section class="sec in com-lateral" style="--seg:${s.cor}">
  <div class="conteudo">
    <p class="lead">${T(s.intro, lang)}</p>
    <div class="caixa-serv"><h2>${T(U.nossosServ, lang)} <span>${s.servicos.length}</span></h2>
      <ol class="lista-serv">${s.servicos.map(x => `<li>${T(x, lang)}</li>`).join('')}</ol></div>
    ${casosSeg.length ? `<div class="casos-seg"><h2>${T(U.casos, lang)}</h2><ul>${casosSeg.map(([ano, tit, , url]) => `<li><a href="${url}" target="_blank" rel="noopener"><span>${ano}</span>${T(tit, lang)}${icone('externo')}</a></li>`).join('')}</ul></div>` : ''}
  </div>
  ${lateral(L, lang, s.slug)}
</section>
${cta(L, lang)}`,
    };
  }

  // PÁGINAS DE ÁREA
  for (const a of areas) {
    const titulo = T(a.titulo || a.nome, lang);
    let extra = '';
    if (a.slug === 'restauro-fluvial') {
      const fotos = [['rio-trabalho', ['Equipe instalando estruturas de madeira no leito do rio', 'Team installing wooden structures in the riverbed']], ['rio-subaquatico', ['Vista subaquática de rio restaurado', 'Underwater view of a restored river']], ['rio-medicao', ['Medição em campo no córrego', 'Field measurement in the stream']], ['rio-fundo', ['Peixe no leito de cascalho', 'Fish on the gravel riverbed']], ['rio-estrutura', ['Montagem das estruturas do ReNaturalize', 'Building the ReNaturalize structures']], ['rio-educacao', ['Educação ambiental com a comunidade', 'Environmental education with the community']], ['rio-lagostim', ['Fauna aquática de volta ao rio', 'Aquatic fauna back in the river']], ['rio-grupo', ['Equipe de campo às margens do rio', 'Field team on the riverbank']], ['rio-peixe', ['Peixe nadando em trecho renaturalizado', 'Fish swimming in a renaturalized stretch']]];
      extra = `<blockquote class="destaque-rio">${T(a.destaque, lang)}</blockquote>
    <div class="ganhos">${[['Redução dos sedimentos', 'Sediment reduction'], ['Controle de enchentes', 'Flood control'], ['Restauração da biota local', 'Restoration of local biota'], ['Recuperação das margens e da vazão', 'Recovery of banks and flow']].map((g, i) => `<div><span>${num(i)}</span>${T(g, lang)}</div>`).join('')}</div>
    <h2 class="tit-galeria">${T(U.galeria, lang)}</h2>
    <div class="galeria">${fotos.map(([f, alt]) => `<a href="/assets/img/${f}.webp" data-galeria>${img(f, T(alt, lang))}</a>`).join('')}</div>
    <h2 class="tit-galeria">${T(U.videos, lang)}</h2>
    <div class="videos">${a.videos.map(v => `<a href="https://www.youtube.com/watch?v=${v}" target="_blank" rel="noopener"><img src="https://i.ytimg.com/vi/${v}/hqdefault.jpg" alt="${T(['Vídeo do ReNaturalize no YouTube', 'ReNaturalize video on YouTube'], lang)}" loading="lazy">${icone('play', 'play')}</a>`).join('')}</div>`;
    }
    p[areaLink(a)] = {
      titulo,
      desc: `${titulo}: ${T(a.resumo, lang)} APLYSIA Soluções Ambientais.`,
      corpo: `${cabecalho({ foto: a.slug === 'restauro-fluvial' ? 'rio-curso' : a.foto, sobre: `${T(U.servicos, lang)} · ${T(U.area, lang)}`, titulo, intro: T(a.resumo, lang) })}
${migalha(L, lang, [['servicos', T(U.servicos, lang)], [null, T(a.nome, lang)]])}
<section class="sec in com-lateral">
  <div class="conteudo">
    <div class="texto">${a.intro.map((x, i) => `<p${i === 0 ? ' class="lead"' : ''}>${T(x, lang)}</p>`).join('')}</div>
    ${a.slug === 'ecotoxicologia' ? `<div class="selo-lab">${img('certificado', 'ABNT NBR ISO/IEC 17025, CRL 0420', 'width="73" height="120"')}<div><b>${T(['Maior número de ensaios acreditados no Brasil', 'The largest number of accredited tests in Brazil'], lang)}</b><p>${T([`Laboratório de Ecotoxicologia com ${anosLab} anos, acreditado pela ABNT NBR ISO/IEC 17025 (CRL 0420), em Serra/ES.`, `Ecotoxicology Laboratory with ${anosLab} years of history, accredited to ABNT NBR ISO/IEC 17025 (CRL 0420), in Serra/ES.`], lang)}</p></div></div>` : ''}
    ${extra}
    ${a.servicos.length ? `<div class="serv-cards">${a.servicos.map(([f, t, d], i) => `<article class="serv-card">${img(f, T(t, lang))}<div><span class="n">${num(i)}</span><h3>${T(t, lang)}</h3><p>${T(d, lang)}</p></div></article>`).join('')}</div>` : ''}
  </div>
  ${lateral(L, lang, a.slug)}
</section>
${cta(L, lang)}`,
    };
  }

  // CLIENTES
  p.clientes = {
    titulo: T(U.clientes, lang),
    desc: T(['Empresas que confiam na APLYSIA: Vale, ArcelorMittal, Petrobras, Suzano, Cenibra, Klabin, Gerdau, CSN e outras.', 'Companies that trust APLYSIA: Vale, ArcelorMittal, Petrobras, Suzano, Cenibra, Klabin, Gerdau, CSN and others.'], lang),
    corpo: `${cabecalho({ foto: 'rio-grupo', sobre: T(U.clientes, lang), titulo: T(['Conheça algumas das empresas que confiam na APLYSIA', 'Some of the companies that trust APLYSIA'], lang), pos: 'center 30%' })}
${migalha(L, lang, [[null, T(U.clientes, lang)]])}
<section class="sec in">
  <p class="lead centro">${T(['Mineração, siderurgia, celulose e papel, portos, óleo e gás, saneamento e indústria química: clientes em 15 estados brasileiros e em diversos países.', 'Mining, steel, pulp and paper, ports, oil and gas, sanitation and chemical industry: clients in 15 Brazilian states and several countries.'], lang)}</p>
  <ul class="logos">${clientes.map(([f, n]) => `<li>${img('clientes/' + f, n, 'width="360" height="200"')}</li>`).join('')}</ul>
</section>
${cta(L, lang)}`,
  };

  // NOTÍCIAS
  p.noticias = {
    titulo: T(U.noticias, lang),
    desc: T(['Notícias da APLYSIA: ciência aplicada, laboratório de ecotoxicologia, ReNaturalize e participação em congressos.', 'APLYSIA news: applied science, ecotoxicology laboratory, ReNaturalize and conference participation.'], lang),
    corpo: `${cabecalho({ foto: 'lab-1', sobre: T(U.noticias, lang), titulo: T(U.noticias, lang), intro: T(['Ciência aplicada, laboratório, ReNaturalize e a presença da APLYSIA nos principais congressos do setor.', 'Applied science, laboratory, ReNaturalize and APLYSIA’s presence at the main industry conferences.'], lang), pos: 'center 30%' })}
${migalha(L, lang, [[null, T(U.noticias, lang)]])}
<section class="sec in">
  <div class="noticias-dest">${noticias.filter(n => n[2]).map(n => `<article class="noticia"><a href="${n[4]}" target="_blank" rel="noopener">${img(n[3], '')}<div><time datetime="${n[0]}">${new Date(n[0] + 'T12:00').toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</time><h3>${T(n[1], lang)}</h3><p>${T(n[2], lang)}</p><span class="c-link">${T(U.lerNoticia, lang)}${icone('externo')}</span></div></a></article>`).join('')}</div>
  <h2 class="tit-galeria">${T(['Mais notícias', 'More news'], lang)}</h2>
  <ul class="noticias-lista">${noticias.filter(n => !n[2]).map(n => `<li><a href="${n[4]}" target="_blank" rel="noopener">${T(n[1], lang)}${icone('externo')}</a></li>`).join('')}</ul>
</section>
${cta(L, lang)}`,
  };

  // CONTATO (Fale conosco, Trabalhe conosco, Seja um fornecedor)
  p.contato = {
    titulo: T(U.contato, lang),
    desc: T(['Fale com a APLYSIA: Soluções em Ecotoxicologia em Vitória/ES e Laboratório de Ecotoxicologia em Serra/ES. Telefone (27) 3337-4877.', 'Contact APLYSIA: Ecotoxicology Solutions in Vitória/ES and Ecotoxicology Laboratory in Serra/ES. Phone +55 27 3337-4877.'], lang),
    corpo: `${cabecalho({ foto: 'lab-3', sobre: T(U.contato, lang), titulo: T(['Fale com a APLYSIA', 'Talk to APLYSIA'], lang), intro: T(['Para tirar dúvidas e saber tudo que a APLYSIA pode fazer por sua empresa, fale com a gente pelo telefone, WhatsApp, e-mail ou pelo formulário.', 'To ask questions and learn everything APLYSIA can do for your company, reach us by phone, WhatsApp, email or the form below.'], lang), pos: 'center 40%' })}
${migalha(L, lang, [[null, T(U.contato, lang)]])}
<section class="sec in contato" id="fale">
  <div class="unidades">${site.unidades.map(u => `<div class="unidade"><h2>${T(u.nome, lang)}</h2>
    <a class="u-fone" href="tel:+${u.fone[1]}">${icone('fone')}+55 ${u.fone[0]}</a>
    <a href="mailto:${u.email}">${icone('email')}${u.email}</a>
    <a href="${u.mapa}" target="_blank" rel="noopener">${icone('local')}<span>${u.end[0]}<br>${u.end[1]}</span></a></div>`).join('')}
    <a class="btn btn-zap" href="${zap(lang)}" target="_blank" rel="noopener">${icone('zap')}${T(U.whatsapp, lang)} · (27) 99839-4839</a>
  </div>
  <div class="form-caixa"><h2>${T(U.fale, lang)}</h2>${formContato(lang)}</div>
</section>
<section class="sec-alt"><div class="in duas">
  <div id="trabalhe" class="bloco-rh"><h2>${T(U.trabalhe, lang)}</h2><p>${T(['A APLYSIA é uma empresa formada por pessoas apaixonadas pelo que fazem. Se você é um ótimo profissional, envie seu currículo pra nós.', 'APLYSIA is made up of people who are passionate about what they do. If you are a great professional, send us your résumé.'], lang)}</p>
    <form class="form" data-form data-assunto="${T(U.trabalhe, lang)}">
      <label><span>${T(['Nome', 'Name'], lang)} *</span><input name="nome" required></label>
      <label><span>E-mail *</span><input name="email" type="email" required></label>
      <label><span>${T(['Cargo pretendido', 'Desired position'], lang)} *</span><input name="cargo" required></label>
      <label><span>${T(['Formação', 'Education'], lang)} *</span><input name="formacao" required></label>
      <label class="cheia aceite"><input type="checkbox" required><span>${T(['Aceito o envio dos meus dados pessoais conforme a LGPD (Lei nº 13.709).', 'I agree to the processing of my personal data under the LGPD (Law 13.709).'], lang)}</span></label>
      <p class="cheia nota">${T(['O e-mail abre já preenchido; anexe o seu currículo antes de enviar.', 'Your email opens pre-filled; attach your résumé before sending.'], lang)}</p>
      <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="email">${T(['Enviar currículo', 'Send résumé'], lang)}</button></div>
    </form></div>
  <div id="fornecedor" class="bloco-rh"><h2>${T(U.fornecedor, lang)}</h2><p>${T(['Seja também um fornecedor da APLYSIA. Cadastre-se e aguarde o nosso contato.', 'Become an APLYSIA vendor. Register and we will get in touch.'], lang)}</p>
    <form class="form" data-form data-assunto="${T(U.fornecedor, lang)}">
      <label><span>${T(['Empresa', 'Company'], lang)} *</span><input name="empresa" required></label>
      <label><span>CNPJ *</span><input name="cnpj" required></label>
      <label><span>E-mail *</span><input name="email" type="email" required></label>
      <label><span>${T(['Telefone', 'Phone'], lang)} *</span><input name="telefone" type="tel" required></label>
      <label class="cheia"><span>${T(['O que a sua empresa fornece', 'What your company supplies'], lang)} *</span><textarea name="mensagem" rows="3" required></textarea></label>
      <label class="cheia aceite"><input type="checkbox" required><span>${T(['Aceito o envio dos meus dados pessoais conforme a LGPD (Lei nº 13.709).', 'I agree to the processing of my personal data under the LGPD (Law 13.709).'], lang)}</span></label>
      <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="email">${T(['Enviar cadastro', 'Send registration'], lang)}</button></div>
    </form></div>
</div></section>`,
  };

  return p;
}

export { etapas, esc };
