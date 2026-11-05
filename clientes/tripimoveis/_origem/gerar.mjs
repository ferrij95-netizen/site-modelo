// Trip Imóveis (Campo Grande, Rio de Janeiro/RJ). Gera public/{a,b}/ e a página de escolha.
// node clientes/tripimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs tripimoveis http://www.tripimoveis.com.br/)
// Empreendimentos: imoveis.json, tirado em 05/11/2026 do wp-json do site atual (os 31 publicados; fotos das galerias, sem as páginas de folheto).
// Marca: logo.png (136 px) redesenhado em SVG (marca.svg). Ver LEIA-ME.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Trip Imóveis', url: 'https://tripimoveis.overtus.com.br/', antigo: 'http://www.tripimoveis.com.br/',
  wa: '5521994693200', fone: '(21) 99469-3200', email: 'contato@tripimoveis.com.br', creci: 'CRECI-RJ J7818',
  face: 'https://www.facebook.com/tripimoveis/',
  end: 'Rua Augusto de Vasconcelos, 544', salas: 'Salas 201, 202, 203 e 204', bairro: 'Campo Grande, Rio de Janeiro - RJ',
  mapa: 'Rua Augusto de Vasconcelos 544 Campo Grande Rio de Janeiro RJ',
  curto: 'Imobiliária em Campo Grande (RJ) especializada em apartamentos do Minha Casa Minha Vida na Zona Oeste do Rio e na Baixada.',
};
// Texto "Sobre" do site atual (dois blocos quase iguais, juntados e com as maiúsculas desfeitas)
const sobre = [
  'A Trip nasceu para realizar o sonho dos brasileiros de ter o seu imóvel próprio e não perder mais dinheiro com aluguel.',
  'Com o programa Minha Casa Minha Vida, uma parceria de empreendimentos com o governo federal, quem ganha de um salário mínimo até 5 mil reais por mês pode realizar esse sonho: condomínios completos, prestações bem menores que um aluguel, documentação grátis e entradas a partir de R$ 99.',
  'Graças à Trip Imóveis você pode melhorar de vida e ainda sobrar dinheiro no bolso todo mês. Conheça a nossa sede no centro de Campo Grande!',
];
const pilares = [
  ['estrela', 'Oportunidades', 'Empreendimentos das principais construtoras do Minha Casa Minha Vida na Zona Oeste.'],
  ['usuarios', 'Atendimento', 'Nossos corretores são os mais bem preparados para cuidar do seu sonho, da simulação à assinatura.'],
  ['escudo', 'Qualidade', 'Prezamos pela qualidade dos parceiros e dos empreendimentos que oferecemos.'],
];
// "Vantagens do programa Minha Casa, Minha Vida" do site atual (regras de 2018/2019, ver LEIA-ME)
const vantagens = [
  ['Prestações bem menores que um aluguel', ''],
  ['Prestações fixas', 'Nunca aumentam.'],
  ['Ajuda do governo', 'Subsídio de até R$ 29 mil, e alguns empreendimentos anunciam até R$ 47.500.'],
  ['Seguro de vida incluso', ''],
  ['Documentação grátis', ''],
  ['Entrada a partir de R$ 99', ''],
  ['Renda de um salário mínimo pode comprar', 'Sem o programa, só quem ganha acima de 4 mil reais por mês.'],
  ['FGTS diminui as parcelas', 'Use o seu FGTS para abater nas prestações.'],
  ['Condomínios completos', 'Lazer e segurança 24 horas para a família.'],
];

// ---------- empreendimentos ----------
const CONSTRUTORA = s => /^viva-vida|^conquista|^olinda/.test(s) ? 'Direcional' : /mrv$/.test(s) ? 'MRV' : s === 'solar-do-oeste-tenda' ? 'Tenda' : s === 'reserva-do-campo' ? 'Emccamp' : s === 'villaggio-verona' ? 'Novolar' : s === 'quinta-do-inga' ? 'Eólica' : '';
const PEQ = new Set(['de', 'do', 'da', 'dos', 'das', 'e']);
const titulo = s => s.replace('NATURELE', 'NATURALE').replace(/\s*[–-]\s*(TENDA|MRV)$|\s+MRV$/i, '').toLowerCase().split(/\s+/).map((w, n) => n && PEQ.has(w) ? w : w[0].toUpperCase() + w.slice(1)).join(' ').replace(/\bi$/i, 'I');
const reais = s => { const n = Number(String(s).replace(/[.,]$/, '').replace(/\.(?=\d{3})/g, '').replace(',', '.')); return `R$ ${n.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`; };
// textos com trechos em maiúsculas, links de vídeo e restos do tema: reescritos a partir do próprio texto publicado
const DESC = {
  'royal-blue-residencial': ['Apartamentos com varanda, elevador e suíte em Bangu.', ['Varanda com barra de alumínio', 'Elevador', 'Suíte', 'Piso cerâmico na sala, quartos, cozinha e banheiros', 'Revestimento até o teto nas áreas molhadas', 'Ar-condicionado de janela nos quartos', 'Piscina adulto e infantil', 'Fachada de textura e vidros']],
  riviera: ['O melhor preço do Rio de Janeiro em um condomínio completo, com área de lazer e segurança 24 horas para a sua família. Obras já iniciadas.', ['Renda familiar bruta de R$ 1.200 já consegue comprar', 'Ajuda do governo de até R$ 47.500', 'Parcelas a partir de R$ 299 morando', 'Documentação grátis', 'Entregue com piso laminado e cozinha americana', 'Piscina, 4 churrasqueiras, playground e quadra poliesportiva', 'Use o seu FGTS para abater nas parcelas']],
  'villaggio-verona': ['Ao lado da Av. Brasil e bem perto do Centro de Santa Cruz. Seu sonho de mudar de vida está mais próximo do que você imagina: viva com conforto e segurança sem sacrificar o bolso, com estrutura completa de lazer, segurança 24 horas e a qualidade da Novolar.', ['ITBI e registro de cartório grátis', 'Apartamento decorado para visitar', '2 quartos com 44 m²', 'Vaga de garagem', 'Acompanhamento durante todo o processo']],
  'residencial-santa-cecilia': ['Chegou a sua vez! Apartamentos de 2 quartos com lazer completo para você realizar o sonho da casa própria. O melhor ponto de Campo Grande espera por você.', ['46 m², a maior metragem do Minha Casa Minha Vida', 'Piso grátis', 'Documentação grátis', 'A partir de R$ 129.900*, com subsídio de até R$ 47.500*']],
};
const AREA = { 'residencial-santa-cecilia': '46 m²', 'villaggio-verona': '44 m²' };
// plantas baixas: vão para o fim da galeria
const PLANTAS = new Set(['cedro-rosa-mrv-4', 'flor-de-laranjeiras-mrv-3', 'reserva-do-campo-2', 'reserva-do-campo-3', 'rio-araras-mrv-4', 'royal-blue-residencial-2', 'royal-blue-residencial-3', 'royal-blue-residencial-4', 'viva-vida-moinho-4', 'viva-vida-tranquilidade-2', 'west-garden-4'].map(n => `${n}.webp`));
const CAPA = { 'west-garden': 2, 'olinda-ellis': 0 };
const limpa = t => t.replace(/https?:\/\/\S+\.mp4/g, '').replace(/document\.createElement\('video'\);/g, '').replace(/Tour Virtual pelo.*$/i, '').replace(/^Entrada (a partir )?de R\$ ?[\d.,]+[.!]?\s*/i, '').replace(/\s+([.,!])/g, '$1').replace(/\s{2,}/g, ' ').replace(/R\$(\d)/g, 'R$ $1').trim();
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const m = x.desc.match(/Entrada (?:a partir )?de R\$ ?([\d.,]+)/i) || x.desc.match(/R\$ ?([\d.,]+) de entrada/i);
  const bairro = (x.bairro[0] || 'Campo Grande').replace('Paciencia', 'Paciência');
  const parc = Number(x.parcela);
  const [desc, lista] = DESC[x.slug] || [limpa(x.desc), []];
  const fotos = x.fotos.filter(f => f[1] / f[2] < 3);
  const ci = CAPA[x.slug] || 0;
  return {
    slug: `empreendimento/${x.slug}`, id: x.slug, nome: titulo(x.nome), construtora: CONSTRUTORA(x.slug),
    parcela: parc, parcelaTxt: reais(parc), entrada: m ? reais(m[1]) : '',
    quartos: x.quartos, banh: x.banh, vagas: x.vagas, area: AREA[x.slug] || '',
    subsidio: x.subsidio ? reais(x.subsidio) : '', end: x.end.replace(/,?\s*Brasil$/, '').replace(/\s+-\s*$/, ''),
    bairro, status: x.status.find(s => s !== 'Parcelas morando') || 'Sob consulta', casa: x.tipo.includes('Casa'),
    itens: x.itens.filter(i => i !== 'Fachada'), desc, lista,
    capa: fotos[ci], fotos: [fotos[ci], ...fotos.filter((f, n) => n !== ci && !PLANTAS.has(f[0])), ...fotos.filter((f, n) => n !== ci && PLANTAS.has(f[0]))],
  };
}).sort((a, b) => a.parcela - b.parcela);
const bairros = [...new Set(imoveis.map(i => i.bairro))].map(b => [b, imoveis.filter(i => i.bairro === b).length]).sort((a, b) => b[1] - a[1]);
const STATUS = ['Lançamento', 'Em construção', 'Pronto para morar'];
const menor = Math.min(...imoveis.map(i => i.parcela));
const por = id => imoveis.find(i => i.id === id);

const nav = [{ slug: 'empreendimentos', nome: 'Empreendimentos' }, { slug: 'minha-casa-minha-vida', nome: 'Minha Casa Minha Vida' }, { slug: 'sobre', nome: 'A Trip' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Hexágono', b: 'Zona Oeste' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@300;500;700;800&family=Rubik:ital,wght@0,400;0,500;0,700;1,700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@300&family=Rubik:ital,wght@0,400;0,500;0,700;1,800;1,900&display=swap',
};
const cores = { a: '#ffd400', b: '#111111' };
const head = (v, s, t, d) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Trip Imóveis | Minha Casa Minha Vida em Campo Grande e Zona Oeste do Rio' : `${t} | Trip Imóveis`, descricao: d, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').replace('<svg ', '<svg class="marca-h" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Trip Imóveis, página inicial"` : ''}>${marcaSvg}<span class="marca-t"><b>TRIP</b><small>imóveis</small></span></${tag}>`;
const foto = (f, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${f[0]}" width="${f[1]}" height="${f[2]}" alt="${esc(alt)}"${extra}>`;
const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.quartos && `${i.quartos} quartos`, i.area, i.vagas && plural(+i.vagas, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no ${i.nome} (${i.bairro}) que vi no site da Trip Imóveis. Pode me passar as condições?`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const statusCls = s => s === 'Lançamento' ? 'st-l' : s === 'Em construção' ? 'st-c' : s === 'Pronto para morar' ? 'st-p' : 'st-x';

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da Trip Imóveis.')}" target="_blank" rel="noopener">${icWa()}<span>${E.fone}</span></a>
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
    <div class="rod-marca">${marca(v, 'div')}<p>${E.curto}</p><p class="creci">${E.creci}</p></div>
    <div><h3>Sede</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.salas}<br>${E.bairro}</span></li></ul></div>
    <div><h3>Fale com a Trip</h3><ul class="rod-dados"><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.fone}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('face')}<a href="${E.face}" target="_blank" rel="noopener">facebook.com/tripimoveis</a></li></ul></div>
    <div><h3>Empreendimentos</h3><ul>${bairros.slice(0, 6).map(b => `<li><a href="${link(v, 'empreendimentos')}">${b[0]} <small>(${b[1]})</small></a></li>`).join('')}</ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Trip Imóveis · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-s="${statusCls(i.status)}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.capa, `${i.nome}, ${i.bairro}`)}<span class="pill ${statusCls(i.status)}">${i.status}</span></figure>
  <div class="card-txt"><p class="card-local">${ic('pin')}${i.bairro}${i.construtora ? ` · ${i.construtora}` : ''}</p><h3>${esc(i.nome)}</h3><p class="card-res">${resumo(i).join(' · ')}</p>
  <p class="card-preco"><small>${i.casa ? 'Parcela' : 'Parcela morando'}</small><b>${i.parcelaTxt}</b>${i.entrada ? `<span>entrada ${i.entrada}</span>` : ''}</p></div></a></li>`;
const filtro = (v, lista) => {
  const g = [['todos', 'Todos'], ...STATUS.map(s => [statusCls(s), s])];
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Situação da obra</legend>${g.map((x, n) => `<label><input type="radio" name="f-st" value="${x[0]}"${n ? '' : ' checked'}><span>${x[1]} <small>${x[0] === 'todos' ? lista.length : lista.filter(i => statusCls(i.status) === x[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const dados = [['Quartos', i.quartos], ['Banheiros', i.banh], ['Vagas', i.vagas], ['Área', i.area], ['Situação', i.status], ['Construtora', i.construtora]].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.nome} (imagem ${n + 1})`)}" class="g${n}">${foto(f, PLANTAS.has(f[0]) ? `${i.nome}, planta do apartamento` : `${i.nome}, imagem ${n + 1} da construtora`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const outros = imoveis.filter(o => o.bairro === i.bairro && o.id !== i.id).slice(0, 3);
  return head(v, i.slug, `${i.nome}, ${i.bairro}`, `${i.nome} em ${i.bairro}, Rio de Janeiro: ${resumo(i).join(', ')}. Parcela a partir de ${i.parcelaTxt}${i.entrada ? `, entrada de ${i.entrada}` : ''}.`) + topo(v, 'empreendimentos') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, 'empreendimentos')}">${ic('seta', 'ic vira')}Todos os empreendimentos</a></p>
  <div class="ficha-cab"><span class="pill ${statusCls(i.status)}">${i.status}</span><h1>${esc(i.nome)}</h1><p class="ficha-local">${ic('pin')}${esc(i.end)}</p></div>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>
      <h2>Sobre o empreendimento</h2><p>${esc(i.desc)}</p>
      ${i.lista.length ? `<ul class="lista-check">${i.lista.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
      ${i.itens.length ? `<h2>Lazer e segurança</h2><ul class="itens">${i.itens.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.casa ? 'Parcela' : 'Parcela morando'} a partir de</p>
      <p class="pb-valor">${i.parcelaTxt}<small>/mês</small></p>
      <dl>${i.entrada ? `<div><dt>Entrada</dt><dd>${i.entrada}</dd></div>` : ''}${i.subsidio ? `<div><dt>Ajuda do governo</dt><dd>até ${i.subsidio}</dd></div>` : ''}</dl>
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Simular pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Valores de referência anunciados pela Trip. Condições, subsídio e disponibilidade dependem da renda e da análise da Caixa: confirme com um corretor.</p>
    </aside>
  </div>
  ${outros.length ? `<section class="outros"><h2>Outros em ${i.bairro}</h2><ul class="cards">${outros.map(o => cartao(v, o)).join('')}</ul></section>` : ''}
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Trip Imóveis.') => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Renda familiar<select name="renda"><option>Até R$ 2.000</option><option>De R$ 2.000 a R$ 3.000</option><option>De R$ 3.000 a R$ 5.000</option><option>Acima de R$ 5.000</option></select></label><label>Bairro de interesse<select name="bairro"><option>Qualquer um</option>${bairros.map(b => `<option>${b[0]}</option>`).join('')}</select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Tenho FGTS, quero 2 quartos, prefiro perto do BRT..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa da sede da Trip Imóveis" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const sede = () => `<div class="sede"><p class="k">Nossa sede</p><h3>No centro de Campo Grande</h3><p>${ic('pin')}<span>${E.end}<br>${E.salas}<br>${E.bairro}</span></p><p>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.fone}</a></p><p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p></div>`;

function comum(v, pag, cab, vantBloco) {
  pag.empreendimentos = head(v, 'empreendimentos', 'Empreendimentos', `${imoveis.length} empreendimentos do Minha Casa Minha Vida em ${bairros.map(b => b[0]).join(', ')}, com parcelas a partir de R$ ${menor}.`) + topo(v, 'empreendimentos') + cab('Empreendimentos', `${imoveis.length} condomínios para sair do aluguel`, `Em ${bairros.length} bairros da Zona Oeste e da Baixada, com parcela a partir de R$ ${menor}. Do menor para o maior valor.`) + `
<div class="in lista-pag">${filtro(v, imoveis)}</div>
` + rodape(v);
  pag['minha-casa-minha-vida'] = head(v, 'minha-casa-minha-vida', 'Minha Casa Minha Vida', 'Vantagens do Minha Casa Minha Vida: prestações fixas e menores que um aluguel, ajuda do governo, documentação grátis, FGTS e entrada a partir de R$ 99.') + topo(v, 'minha-casa-minha-vida') + cab('Minha Casa Minha Vida', 'Pagar parcela no lugar de aluguel', 'Com renda a partir de um salário mínimo você já pode comprar. A Trip cuida da simulação e da papelada com você.') + `
<div class="in">${vantBloco()}
<section class="simula"><div><p class="k">Simulação</p><h2>Descubra quanto fica a sua parcela</h2><p>Conte a sua renda e o bairro que você prefere. Um corretor da Trip responde pelo WhatsApp com os empreendimentos que cabem no seu bolso.</p></div>${formulario('Olá! Quero simular meu Minha Casa Minha Vida com a Trip.')}</section></div>
` + rodape(v);
  pag.sobre = head(v, 'sobre', 'A Trip', sobre[0]) + topo(v, 'sobre') + cab('A Trip', 'A imobiliária com estilo', 'Especializada no Minha Casa Minha Vida, com sede no centro de Campo Grande.') + `
<div class="in"><section class="inst"><div>${sobre.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><ul class="pilares">${pilares.map(x => `<li>${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul></section>
<section class="num"><ul class="numeros"><li><b>${imoveis.length}</b><span>empreendimentos</span></li><li><b>${bairros.length}</b><span>bairros</span></li><li><b>R$ ${menor}</b><span>menor parcela</span></li><li><b>R$ 99</b><span>menor entrada</span></li></ul></section>
<section class="sede-sec">${sede()}${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Trip Imóveis: WhatsApp ${E.fone}, ${E.email}. ${E.end}, Campo Grande, Rio de Janeiro.`) + topo(v, 'contato') + cab('Contato', 'Fale com um corretor', 'Pelo WhatsApp, por e-mail ou na sede, em Campo Grande.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div>${sede()}</section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

// ---------- A: Hexágono (clara, blocos amarelos) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const vantBloco = () => `<section class="vant-a"><header class="tit"><p class="k">Vantagens</p><h2>Por que o Minha Casa Minha Vida compensa</h2></header><ol class="hexs">${vantagens.map((x, n) => `<li class="sobe"><span class="hx">${n + 1}</span><h3>${x[0]}</h3>${x[1] ? `<p>${x[1]}</p>` : ''}</li>`).join('')}</ol></section>`;
  const capa = por('viva-vida-harmonia').fotos[4];
  const dest = ['viva-vida-recanto', 'riviera', 'conquista-mendanha', 'reserva-do-campo', 'rio-araras-mrv', 'olinda-ellis'].map(por);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Minha Casa Minha Vida · Zona Oeste do Rio</p><h1>Saia do aluguel com parcela a partir de <mark>R$ ${menor}</mark></h1><p>Entrada a partir de R$ 99, documentação grátis e ajuda do governo. ${imoveis.length} condomínios em Campo Grande, Santa Cruz, Bangu e região.</p>
    <p class="bts"><a class="btn" href="${link(v, 'empreendimentos')}">Ver empreendimentos</a><a class="btn btn-linha" href="${link(v, 'minha-casa-minha-vida')}">Como funciona</a></p></div>
  <figure class="hero-a-foto">${foto(capa, 'Piscina do condomínio Viva Vida Harmonia, em Santa Cruz (perspectiva da construtora)', ' loading="eager" fetchpriority="high"')}<figcaption>Viva Vida Harmonia, Santa Cruz</figcaption></figure>
</div></section>
<section class="faixa-a"><div class="in"><p class="k">Onde estão</p><ul>${bairros.map(b => `<li><a href="${link(v, 'empreendimentos')}">${b[0]} <small>${b[1]}</small></a></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Em destaque</p><h2>Condomínios com lazer completo</h2></div><a class="link-seta" href="${link(v, 'empreendimentos')}">Ver os ${imoveis.length} ${ic('seta')}</a></header><ul class="cards">${dest.map(i => cartao(v, i)).join('')}</ul></section>
<section class="mcmv-a"><div class="in mcmv-a-in"><div><p class="k">Minha Casa Minha Vida</p><h2>Renda de um salário mínimo já pode comprar</h2><p>${sobre[1]}</p><a class="btn" href="${link(v, 'minha-casa-minha-vida')}">Ver todas as vantagens</a></div><ul class="lista-check">${vantagens.slice(0, 6).map(x => `<li>${ic('check')}<span>${x[0]}</span></li>`).join('')}</ul></div></section>
<section class="in pil-a"><header class="tit"><p class="k">A Trip</p><h2>A imobiliária com estilo</h2></header><ul class="pilares">${pilares.map(x => `<li>${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul></section>
<section class="sede-a"><div class="in sede-sec">${sede()}${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab, vantBloco);
  return pag;
}

// ---------- B: Zona Oeste (escura, por bairro) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const vantBloco = () => `<section class="vant-b"><header class="tit"><p class="k">Vantagens</p><h2>9 motivos para trocar o aluguel pela parcela</h2></header><ol class="tickets">${vantagens.map((x, n) => `<li class="sobe"><b>${String(n + 1).padStart(2, '0')}</b><div><h3>${x[0]}</h3>${x[1] ? `<p>${x[1]}</p>` : ''}</div></li>`).join('')}</ol></section>`;
  const capa = por('viva-vida-recanto').fotos[3];
  const linha = i => `<li><a href="${link(v, i.slug)}">${foto(i.capa, i.nome)}<span class="ln-nome"><b>${esc(i.nome)}</b><small>${resumo(i).slice(0, 2).join(' · ')}${i.construtora ? ` · ${i.construtora}` : ''}</small></span><span class="pill ${statusCls(i.status)}">${i.status}</span><span class="ln-preco"><small>parcela</small>${i.parcelaTxt}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto(capa, 'Jardim do condomínio Viva Vida Recanto, em Guaratiba, ao entardecer (perspectiva da construtora)', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Trip Imóveis · Campo Grande · RJ</p><h1>Sua casa própria na <span>Zona Oeste</span></h1><p>Parcela a partir de R$ ${menor}, entrada a partir de R$ 99 e documentação grátis pelo Minha Casa Minha Vida.</p><p class="bts"><a class="btn" href="${link(v, 'empreendimentos')}">${imoveis.length} empreendimentos</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Quero simular meu apartamento com a Trip.')}" target="_blank" rel="noopener">${icWa()}Simular agora</a></p></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>R$ ${menor}</b><span>menor parcela</span></li><li><b>R$ 99</b><span>menor entrada</span></li><li><b>${imoveis.length}</b><span>condomínios</span></li><li><b>${bairros.length}</b><span>bairros</span></li></ul></div></section>
<section class="in por-bairro">${bairros.filter(b => b[1] >= 2).map(([b, n]) => `<div class="bairro-b"><header><h2>${b}</h2><span>${plural(n, 'empreendimento', 'empreendimentos')}</span></header><ol class="linhas">${imoveis.filter(i => i.bairro === b).slice(0, 5).map(linha).join('')}</ol>${n > 5 ? `<a class="link-seta" href="${link(v, 'empreendimentos')}">Mais ${n - 5} em ${b} ${ic('seta')}</a>` : ''}</div>`).join('')}
<p class="outros-b">Também em ${bairros.filter(b => b[1] < 2).map(b => b[0]).join(', ')}. <a href="${link(v, 'empreendimentos')}">Ver todos</a></p></section>
<section class="mcmv-b"><div class="in">${vantBloco()}<p class="bts"><a class="btn" href="${link(v, 'minha-casa-minha-vida')}">Simular minha parcela</a></p></div></section>
<section class="in pil-b"><div><p class="k">A Trip</p><h2>A imobiliária com estilo</h2><p class="lead">${sobre[0]}</p><p>${sobre[2]}</p></div><ul class="pilares">${pilares.map(x => `<li>${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul></section>
<section class="sede-b"><div class="in sede-sec">${sede()}${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab, vantBloco);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Trip Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#ffd400', fundo: '#111111', claro: '#fff8d6',
  fonteTitulo: 'Unbounded,system-ui,sans-serif', fonteTexto: 'Rubik,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + imoveis.length + 1, texto: 'Clara, com o amarelo e o hexágono do logo, e a menor parcela em destaque logo na abertura.', pontos: [`Os ${imoveis.length} empreendimentos do site com fotos, parcela, entrada e ficha`, 'Filtro por situação da obra', 'Simulação pelo WhatsApp em cada empreendimento'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + imoveis.length + 1, texto: 'Escura, no preto e amarelo da marca, com os empreendimentos organizados por bairro da Zona Oeste.', pontos: ['Campo Grande, Santa Cruz, Bangu e Guaratiba lado a lado', 'As vantagens do Minha Casa Minha Vida numeradas', 'Sede com mapa que funciona'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
