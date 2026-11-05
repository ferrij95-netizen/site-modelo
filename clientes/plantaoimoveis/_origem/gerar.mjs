// Plantão Imóveis (Ouro Preto, Pampulha, Belo Horizonte/MG, CRECI PJ 2957). Gera public/{a,b}/ e a página de escolha.
// node clientes/plantaoimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs plantaoimoveis http://www.plantaoimoveis.com.br/principal.asp)
// Imóveis: imoveis.json, tirado em 05/11/2026 de busca.asp?modalidade=V|L + detalhes.asp do site atual (plataforma SIPI).
// 40 dos 400 anunciados: 8 dos 12 de aluguel (os com fotos) e 32 dos 388 à venda (destaques da home + os de código mais alto). Até 5 fotos de cada.
// Marca: logo.png (188x66, vermelho #ed3237) redesenhado em vetor (marca.svg).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Plantão Imóveis', url: 'https://plantaoimoveis.overtus.com.br/', antigo: 'http://www.plantaoimoveis.com.br/principal.asp',
  fone: '(31) 3498-3877', cel: '(31) 99987-3135', wa: '5531999873135', email: 'falecom@plantaoimoveis.com.br',
  end: 'Av. Manuel Elias de Aguiar, 291', bairro: 'Ouro Preto, Belo Horizonte - MG', creci: 'CRECI PJ 2957',
  insta: 'https://www.instagram.com/plantaodosimoveispampulha', arroba: '@plantaodosimoveispampulha',
  mapaLink: 'https://maps.app.goo.gl/G9TmQmy68ZuhKXV78',
  slogan: 'Os melhores imóveis da Pampulha e região',
  curto: 'Imobiliária com sede própria no Ouro Preto, na Pampulha: casas, apartamentos, lotes e sítios para comprar e alugar em Belo Horizonte e região.',
  mapa: 'Avenida Manuel Elias de Aguiar, 291, Ouro Preto, Belo Horizonte, MG',
};
// serviços do site atual (textos e mensagens de WhatsApp dos botões de lá)
const servicos = [
  { id: 'anuncie', ic: 'casa', t: 'Anuncie seu imóvel', p: 'Nossa estrutura de divulgação permite negociar seu imóvel rapidamente.', msg: 'Desejo anunciar meu imóvel.' },
  { id: 'administracao', ic: 'chave', t: 'Administração de bens', p: 'O seu patrimônio merece um cuidado extremamente especial. Cuidamos do aluguel do seu imóvel.', msg: 'Desejo alugar meu imóvel.' },
  { id: 'avaliacao', ic: 'escudo', t: 'Avaliação de imóveis', p: 'Elaboramos laudos de avaliação de imóveis com base nas normas ABNT.', msg: 'Desejo uma avaliação do meu imóvel.' },
  { id: 'credito', ic: 'painel', t: 'Simulação de crédito', p: 'Faça uma simulação de crédito para a compra do seu novo imóvel.', msg: 'Desejo fazer uma simulação de crédito.' },
];

// ---------- imóveis ----------
const TIPO = { 'Area Privativa': 'Área privativa', 'Sitio/Chacara': 'Sítio', 'Lote/Terreno': 'Lote', 'Casa em Condominio': 'Casa em condomínio', 'Lote em Condominio': 'Lote em condomínio', 'Casa Geminada': 'Casa geminada' };
const GRUPO = t => /Apartamento|Cobertura|Privativa|Kitnet/.test(t) ? 'apartamentos' : /Lote|Sitio/.test(t) ? 'terrenos' : /Loja|Sala/.test(t) ? 'comerciais' : 'casas';
const BAIRRO = { 'Ceu Azul': 'Céu Azul', Paqueta: 'Paquetá', 'Piratininga (Venda Nova)': 'Piratininga', 'Jardim America': 'Jardim América', 'Alipio de Melo': 'Alípio de Melo', 'Cachoeira Do Choro': 'Cachoeira do Choro', 'Santa Amelia': 'Santa Amélia', Gloria: 'Glória', 'COND ESTANCIAS DA MATA': 'Condomínio Estâncias da Mata', 'Sagrada Familia': 'Sagrada Família', 'Enseada das Garcas': 'Enseada das Garças', 'Alto Caicaras': 'Alto Caiçaras', Graca: 'Graça', 'Santa Monica': 'Santa Mônica', 'zona rural': 'Zona rural', 'Portal do Sol': 'Condomínio Portal do Sol' };
const NA = { 'Enseada das Garças': 'na', Graça: 'na', 'Zona rural': 'na' };
const CIDADE = {};
const num = s => Number(String(s || '0').replace(/[^\d,]/g, '').replace(',', '.'));
const real = s => num(s) > 0 ? `R$ ${String(s).replace(/R\$\s*/, '')}` : '';
const SIGLAS = /\b(bh|iptu|abnt|mg|br|fgts|ufmg|ade|ii)\b/gi;
const caixaAlta = s => (s.match(/[A-ZÀ-Ú]/g) || []).length > 0.6 * (s.match(/[A-Za-zÀ-ú]/g) || []).length && s.length > 12;
const frase = s => s.toLowerCase().replace(/(^|[.!?:–]\s+)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase()).replace(SIGLAS, m => m.toUpperCase()).replace(/\bm²/g, 'm²');
// limpeza dos textos: o site atual guarda restos de texto gerado por chatbot e marcação markdown
const LIXO = /^(parece ser uma descrição|claro[!.,]|aqui está|---+$|imobiliária plantão imóveis$)/i;
const limpa = l => {
  const tit = /^#+\s/.test(l.trim()) && l.length < 70;
  let s = l.trim().replace(/^#+\s*(–\s*)?/, '').replace(/\s*\(?\[[^\]]*\]\[\d+\]\)?/g, '').replace(/R\$\s*R\$\s*/g, 'R$ ').replace(/(\d)\s?m2\b/gi, '$1 m²').replace(/(\d)M²/g, '$1 m²').replace(/\s+([,;:!?])/g, '$1').replace(/,(?=\S)/g, ', ').replace(/(\d), (\d)/g, '$1,$2');
  if (/^Em alguns anúncios, o imóvel aceita:?$/i.test(s)) s = 'Aceita:';
  s = caixaAlta(s) ? frase(s) : s.charAt(0).toUpperCase() + s.slice(1);
  return tit && !/:$/.test(s) ? s + ':' : s;
};
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const b = BAIRRO[x.bairro] || x.bairro;
  let desc = x.desc.filter(l => !LIXO.test(l.trim())).map(limpa).filter(Boolean);
  if (x.id === '98431') desc[0] = desc[0].replace(/\s*-\s*R\$.*$/, ''); // o texto trazia um valor diferente do anunciado
  return {
    neg: x.neg, cod: x.id, slug: `imovel/${x.id}`, tipo: TIPO[x.tipo] || x.tipo, grupo: GRUPO(x.tipo),
    bairro: b, prep: NA[b] || 'no', cidade: CIDADE[x.cidade] || x.cidade, preco: `R$ ${x.preco}`, valor: num(x.preco),
    area: num(x.area) ? x.area : '', quartos: +x.quartos || 0, suites: +x.suites || 0, banh: +x.banh || 0, vagas: +x.vagas || 0,
    cond: real(x.cond), iptu: real(x.iptu), desc, fotos: x.img,
  };
});
const aluguel = imoveis.filter(i => i.neg === 'aluguel').sort((a, b) => a.valor - b.valor);
const vendas = imoveis.filter(i => i.neg === 'venda').sort((a, b) => a.valor - b.valor);
const contaBairro = {};
for (const i of imoveis) if (i.cidade === 'Belo Horizonte') contaBairro[i.bairro] = (contaBairro[i.bairro] || 0) + 1;
const bairros = Object.entries(contaBairro).sort((a, b) => b[1] - a[1]);
const cidades = [...new Set(imoveis.filter(i => i.cidade !== 'Belo Horizonte').map(i => i.cidade))];
const TOTAL_VENDA = 388, TOTAL_ALUGA = 12; // anunciados no site atual em 05/11/2026
const porCod = c => imoveis.find(i => i.cod === c);

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'sobre', nome: 'A imobiliária' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Pampulha', b: 'Plantão' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Alata&family=Hind:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=Sen:wght@400;600;700&display=swap',
};
const cores = { a: '#e3262d', b: '#1b1d22' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Plantão Imóveis | Imobiliária na Pampulha, Belo Horizonte' : `${titulo} | Plantão Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').replace('<svg ', '<svg class="marca-r" role="img" aria-label="Plantão Imóveis" ');
const casaSvg = `<svg class="casa-r" viewBox="0 0 128 66" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M4 21 67 2 126 24M101.5 7v5.5M99 7h12v8M52 15v32H46v16M116 21.5V48H50"/><rect x="52" y="18" width="14" height="27" stroke-width="2.2"/><rect x="74.5" y="19.5" width="22" height="10.5" stroke-width="2.2"/></svg>`;
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Plantão Imóveis, página inicial"` : ''}>${marcaSvg}</${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const semFoto = () => `<div class="sem-foto">${casaSvg}<span>Fotos sob consulta</span></div>`;
const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && plural(i.quartos, 'quarto', 'quartos'), i.suites && plural(i.suites, 'suíte', 'suítes'), i.vagas && plural(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const onde = i => i.bairro === 'Zona rural' ? `na zona rural de ${i.cidade}` : `${i.prep} ${i.bairro}`;
const titulo = i => `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} ${onde(i)}`;
const local = i => i.bairro === 'Zona rural' ? `Zona rural · ${i.cidade}` : `${i.bairro} · ${i.cidade}`;
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo}, ${i.bairro}, ${i.preco}) que vi no site da Plantão Imóveis.`);
const mes = i => i.neg === 'aluguel' ? '<small>/mês</small>' : '';
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

// descrição: linhas curtas em sequência viram lista; linhas terminadas em ":" viram subtítulo
function textoImovel(desc) {
  const out = []; let lista = [];
  const fecha = () => { if (lista.length) out.push(lista.length > 1 ? `<ul class="lista-check">${lista.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : `<p>${esc(lista[0])}</p>`); lista = []; };
  for (const l of desc) {
    if (/:$/.test(l) && l.length < 70) { fecha(); out.push(`<p class="sub">${esc(l.replace(/:$/, ''))}</p>`); }
    else if (l.length < 75 && !/[.!]$/.test(l)) lista.push(l.replace(/[;.]$/, ''));
    else { fecha(); out.push(`<p>${esc(l)}</p>`); }
  }
  fecha();
  return out.join('');
}

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${telHref(E.fone)}">${ic('tel')}<span>${E.fone}</span></a>
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
    <div class="rod-marca">${marca(v, 'div')}<p>${E.slogan}.</p><p class="rod-legal">${E.creci}</p></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('insta')}<a href="${E.insta}" target="_blank" rel="noopener">${E.arroba}</a></li></ul></div>
    <div><h3>Sede própria</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li><li>${ic('ext')}<a href="${E.mapaLink}" target="_blank" rel="noopener">Abrir no Google Maps</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'servicos')}#anuncie">Anuncie seu imóvel</a></li><li><a href="${link(v, 'servicos')}#credito">Simulação de crédito</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Plantão Imóveis · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${i.fotos[0] ? foto(i.fotos[0], `${i.tipo} ${onde(i)}`) : semFoto()}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${local(i)}</p><h3>${titulo(i)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${mes(i)}<span class="card-cod">cód. ${i.cod}</span></p></div></a></li>`;
const GRUPOS = [['todos', 'Todos'], ['casas', 'Casas'], ['apartamentos', 'Apartamentos e coberturas'], ['terrenos', 'Lotes e sítios'], ['comerciais', 'Lojas e salas']];
const filtro = (v, lista, nome) => {
  const g = GRUPOS.filter(x => x[0] === 'todos' || lista.some(i => i.grupo === x[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${g.map((x, n) => `<label><input type="radio" name="f-${nome}" value="${x[0]}"${n ? '' : ' checked'}><span>${x[1]} <small>${x[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === x[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vagas', i.vagas]].filter(d => d[1]);
  const fotos = i.fotos.length ? `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${titulo(i)} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo(i)}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>` : `<div class="galeria galeria-vazia">${semFoto()}</div>`;
  const volta = i.neg === 'aluguel' ? 'alugar' : 'comprar';
  return head(v, i.slug, `${i.tipo} ${onde(i)}, cód. ${i.cod}`, `${titulo(i)}, ${i.cidade}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.neg === 'aluguel' ? 'Aluguel' : 'Venda'} · cód. ${i.cod}</p>
      <h1>${titulo(i)}</h1>
      <p class="ficha-local">${ic('pin')}${i.bairro === 'Zona rural' ? 'Zona rural' : i.bairro}, ${i.cidade} - MG</p>
      <p class="preco-m"><b>${i.preco}</b>${mes(i)}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Tenho interesse</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre este imóvel</h2>${textoImovel(i.desc)}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${mes(i)}</p>
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Os preços e informações estão sujeitos a alteração sem aviso prévio.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (msg = 'Olá! Vim pelo site da Plantão Imóveis.', sel = 0) => `<form class="form" data-wa="${esc(msg)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto">${['Quero comprar um imóvel', 'Quero alugar um imóvel', 'Quero anunciar meu imóvel', 'Administração do meu imóvel', 'Avaliação de imóvel', 'Simulação de crédito', 'Outro assunto'].map((o, n) => `<option${n === sel ? ' selected' : ''}>${o}</option>`).join('')}</select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa da sede da Plantão Imóveis" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Sede própria</strong><span>${E.end}<br>${E.bairro}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">${E.arroba}</a></div></li>
</ul>`;
const lista = cods => cods.map(porCod).filter(Boolean);
const DEST_VENDA = ['98431', '98380', '98406', '94856', '98473', '98377'];
const DEST_ALUGA = ['96372', '98041', '98298', '98510'];
const RECENTES = imoveis.filter(i => i.neg === 'venda').sort((a, b) => b.cod - a.cod).slice(0, 10);

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda na Pampulha, em Belo Horizonte e região: casas, apartamentos, coberturas, lotes e sítios.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda na Pampulha e região', `Casas, apartamentos, coberturas, lotes e sítios em Belo Horizonte, Contagem, Betim, Jaboticatubas e Curvelo. Do mais em conta ao mais caro.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}<p class="lista-nota">Aqui estão ${vendas.length} dos ${TOTAL_VENDA} imóveis à venda da Plantão. Não achou o que procura? <a href="${link(v, 'contato')}">Conte para a gente</a> ou ligue ${E.fone}.</p></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar na Pampulha e região: casas, apartamentos, kitnet, sala e galpão.`) + topo(v, 'alugar') + cab('Para alugar', `${aluguel.length} imóveis para alugar`, 'Casas, apartamentos, kitnet, sala comercial e galpão, a maioria na região da Pampulha. Do aluguel mais em conta ao mais caro.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}<p class="lista-nota">Tem um imóvel para alugar? A Plantão cuida da <a href="${link(v, 'servicos')}#administracao">administração do seu bem</a>.</p></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Anuncie seu imóvel, deixe a administração do aluguel com a Plantão, peça uma avaliação pelas normas ABNT ou simule seu crédito.') + topo(v, 'servicos') + cab('Serviços', 'Para quem tem um imóvel e para quem procura um', 'Escolha o que você precisa e fale com a gente pelo WhatsApp.') + `
<div class="in serv-pag">
  ${servicos.map((s, n) => `<section class="serv" id="${s.id}"><div><span class="serv-n">0${n + 1}</span>${ic(s.ic)}<h2>${s.t}</h2><p>${s.p}</p><a class="btn" href="${waHref(E.wa, s.msg)}" target="_blank" rel="noopener">${icWa()}Falar pelo WhatsApp</a></div></section>`).join('')}
</div>
` + rodape(v);
  pag.sobre = head(v, 'sobre', 'A imobiliária', E.curto) + topo(v, 'sobre') + cab('A imobiliária', 'Plantão Imóveis, com sede própria no Ouro Preto', `${E.slogan}. ${E.creci}.`) + `
<div class="in">
  <section class="inst">
    <p class="lead">A Plantão Imóveis atende na sua sede própria, na ${E.end}, no Ouro Preto, região da Pampulha. Compra, venda, aluguel e administração de imóveis, além de avaliações e simulação de crédito.</p>
    <dl class="numeros"><div><dt>${TOTAL_VENDA}</dt><dd>imóveis à venda anunciados</dd></div><div><dt>${TOTAL_ALUGA}</dt><dd>para alugar</dd></div><div><dt>${bairros.length}+</dt><dd>bairros de BH nesta seleção</dd></div></dl>
    <p>Além de Belo Horizonte, há imóveis em ${cidades.join(', ').replace(/, ([^,]*)$/, ' e $1')}.</p>
  </section>
  <section class="mvv">${servicos.map(s => `<article><p class="k">${s.t}</p><p>${s.p}</p></article>`).join('')}</section>
  <section class="loja-sec"><div><p class="k">Venha nos visitar</p><h2>${E.end}</h2><p>${E.bairro}</p>${contatoLista()}</div>${mapa()}</section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Plantão Imóveis: ${E.fone}, WhatsApp ${E.cel}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Plantão Imóveis', 'Mande sua mensagem pelo formulário, ligue ou passe na nossa sede, no Ouro Preto.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}</div></section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p>${casaSvg}</div></section>`;
  const capa = porCod('98431');
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária no Ouro Preto · Pampulha · BH</p><h1>Os melhores imóveis <em>da Pampulha e região.</em></h1><p>Casas, apartamentos, lotes e sítios para comprar e alugar, com atendimento na nossa sede própria, no Ouro Preto.</p>
    <div class="atalhos"><a href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${TOTAL_VENDA} à venda</b>${ic('seta')}</a><a href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${TOTAL_ALUGA} para alugar</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto"><a href="${link(v, capa.slug)}">${foto(capa.fotos[0], `${capa.tipo} ${onde(capa)}`, ' loading="eager" fetchpriority="high"')}<figcaption><b>${capa.tipo}, ${capa.bairro} · Contagem</b><span>${resumo(capa).slice(0, 3).join(' · ')} · ${capa.preco}</span></figcaption></a></figure>
</div></section>
<section class="bairros-a"><div class="in"><p class="k">Bairros com imóveis nesta seleção</p><ul>${bairros.slice(0, 12).map(b => `<li>${b[0]}</li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Destaques de venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os imóveis à venda ${ic('seta')}</a></header><ul class="cards">${lista(DEST_VENDA).map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Destaques de locação</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${lista(DEST_ALUGA).map(i => cartao(v, i)).join('')}</ul></section>
<section class="serv-a"><div class="in"><header class="tit"><p class="k">Serviços</p><h2>Para quem tem um imóvel</h2></header><ul class="serv-a-lista">${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${ic(s.ic)}<h3>${s.t}</h3><p>${s.p}</p></a></li>`).join('')}</ul></div></section>
<section class="in sede-a"><div><p class="k">Sede própria</p><h2>${E.end}</h2><p>${E.bairro}. Passe para conversar com a gente ou chame no WhatsApp.</p>${contatoLista()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const tri = ['98406', '94856', '98443'].map(porCod);
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="q-cod">${i.cod}</span><span class="q-tipo">${i.tipo}</span><span class="q-local">${i.bairro === 'Zona rural' ? i.cidade : i.bairro}</span><span class="q-res">${resumo(i).slice(0, 2).join(' · ')}</span><span class="q-preco">${i.preco}${mes(i)}</span>${ic('seta')}</a></li>`;
  const largo = i => `<li class="lg"><a href="${link(v, i.slug)}"><figure>${foto(i.fotos[0], titulo(i))}</figure><div><p class="lg-local">${local(i)}</p><h3>${i.tipo}${i.quartos ? ` · ${plural(i.quartos, 'quarto', 'quartos')}` : ''}</h3><p class="lg-res">${resumo(i).join(' · ')}</p><p class="lg-preco">${i.preco}${mes(i)}</p></div></a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Plantão Imóveis · Ouro Preto · Pampulha</p><h1>Os melhores imóveis da Pampulha <em>e região.</em></h1><p>Comprar, vender, alugar ou deixar seu imóvel em boas mãos: fale com quem tem sede própria no Ouro Preto.</p><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Imóveis para alugar</a></p></div>
  <div class="mosaico">${tri.map((i, n) => `<a class="m${n}" href="${link(v, i.slug)}">${foto(i.fotos[0], titulo(i), n ? ' loading="lazy" decoding="async"' : ' loading="eager" fetchpriority="high"')}<span>${i.tipo} · ${i.bairro === 'Zona rural' ? i.cidade : i.bairro}</span></a>`).join('')}</div>
</div></section>
<section class="quadro-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Últimos cadastrados</p><h2>Entraram há pouco no estoque</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header>
  <ol class="quadro"><li class="q-cab" aria-hidden="true"><span class="q-cod">Cód.</span><span class="q-tipo">Tipo</span><span class="q-local">Bairro</span><span class="q-res">Área</span><span class="q-preco">Valor</span></li>${RECENTES.map(linha).join('')}</ol></div></section>
<section class="in lg-b"><header class="tit tit-linha"><div><p class="k">Destaques de venda</p><h2>Quatro imóveis para conhecer de perto</h2></div></header><ul class="lgs">${lista(['98431', '98380', '98473', '98377']).map(largo).join('')}</ul></section>
<section class="aluga-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Destaques de locação</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${lista(DEST_ALUGA).map(i => cartao(v, i)).join('')}</ul></div></section>
<section class="in serv-b"><header class="tit"><p class="k">Serviços</p><h2>Tem um imóvel? A Plantão cuida dele.</h2></header><ol class="passos">${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${ic(s.ic)}<h3>${s.t}</h3><p>${s.p}</p></a></li>`).join('')}</ol></section>
<section class="sede-b"><div class="in sede-b-in"><div><p class="k">Sede própria</p><h2>${E.end}</h2><p>${E.bairro}</p>${contatoLista()}</div>${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Plantão Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#e3262d', fundo: '#1b1d22', claro: '#faf6f1',
  fonteTitulo: 'Alata,system-ui,sans-serif', fonteTexto: 'Hind,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, no vermelho do logo, com o traço da casinha do logo como detalhe e o "comprar ou alugar" logo na abertura.', pontos: [`${imoveis.length} imóveis com fotos, valores e ficha`, 'Filtro por casas, apartamentos, lotes e comerciais', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Escura e serifada, com um quadro dos últimos imóveis cadastrados, como o mural de uma imobiliária de plantão.', pontos: ['Quadro com código, bairro e valor', 'Casas de destaque em fotos grandes', 'Sede própria com mapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
