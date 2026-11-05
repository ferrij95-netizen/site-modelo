// Lídder Imobiliária (Goiânia/GO). Gera public/{a,b}/ e a página de escolha.
// node clientes/lidder/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs lidder https://www.lidderimobiliaria.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 da API pública do site atual (plataforma Imobzi, site2/properties):
// os imóveis da 1ª página de "Comprar" e de "Alugar" e os destaques da home, com até 5 fotos cada (38 de cerca de 588).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref, soNum } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Lídder Imobiliária', url: 'https://lidder.overtus.com.br/', antigo: 'https://www.lidderimobiliaria.com.br/',
  wa: '5562982530910', cel: '(62) 98253-0910', fone: '(62) 3541-6575',
  email: 'lidderimobiliaria@lidderimobiliaria.com.br', creci: 'CRECI J 27357', razao: 'Líder Empreendimentos Imobiliários LTDA',
  end: 'Av. Dona Ana Nunes de Morais, 527, Qd. 194, Lt. 15', bairro: 'Parque Amazônia, Goiânia - GO',
  mapa: 'Avenida Dona Ana Nunes de Morais 527 Parque Amazônia Goiânia GO',
  face: 'https://facebook.com/lidderimobiliaria', insta: 'https://instagram.com/lidder.imobiliaria', yt: 'https://youtube.com/L%C3%ADdderImobili%C3%A1ria',
  totalVenda: 460, totalAluguel: 128, // contagem mostrada pelo site atual em 05/11/2026
  curto: 'Locação e vendas na grande Goiânia e região: apartamentos, casas, lotes, chácaras, salas e galpões, com a consultoria de quem está há mais de 20 anos no mercado.',
};
const sobre = 'Há mais de 20 anos no mercado imobiliário, a Lídder oferece um serviço especializado e personalizado com foco na satisfação de seus clientes.';
const pilares = [
  ['casa', 'Os melhores imóveis', 'Escolha entre apartamentos, casas, salas e mais. Considere uma visita com nossa equipe de atendimento.'],
  ['usuarios', 'Vamos acompanhar você', 'Oferecemos a melhor consultoria na escolha do seu imóvel, desde a localização até o tipo e as características.'],
  ['check', 'Sempre a melhor condição', 'Nossa equipe busca a melhor condição de fechamento, inclusive com consultoria no financiamento.'],
];
// equipe exatamente como na home do site atual
const equipe = [
  ['Lídder Imobiliária', 'J 27357', '(62) 98253-0910'], ['Marcio Oliveira Pereira', '28071', '(62) 99977-5608'], ['Alessandra Cordeiro', '24368', '(62) 98459-8199'],
  ['Leonardo Viana', '30039', '(62) 98104-9078'], ['Willian Pimentel', '29038', '(62) 98112-0104'], ['Cesar Ramos', '8026', '(62) 99997-9011'],
  ['Diego Damazo', '41890', '(62) 98469-4162'], ['Viviane Ferreira', '34.232E', '(62) 99962-4355'], ['Aldenor Coutinho', '8019', '(62) 98598-8199'],
  ['Jacildo Gonçalves', '31749', '(62) 99381-2104'], ['Marcos Manso', '8292', '(62) 98222-0900'], ['Cleonice Marques', 'E-20276', '(62) 98253-8899'], ['Rossi', '37752', '(62) 98437-2425'],
].slice(1);

// ---------- imóveis ----------
const brl = n => 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
const m2 = n => `${Number(n).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²`;
const TIPO = { 'Predio Comercial': 'Prédio comercial', 'Galpão Comercial': 'Galpão comercial', 'Sala Comercial': 'Sala comercial', 'Casa de Condomínio': 'Casa em condomínio', 'Condomínio Horizontal': 'Casa em condomínio' };
const BAIRRO = { 'Parque Amazonia': 'Parque Amazônia', 'Chácara - Condomínio de Chácaras Flor do Cerrado': 'Cond. de Chácaras Flor do Cerrado', 'Alphaville Flamboyant Residencial Araguaia': 'Alphaville Flamboyant Araguaia' };
const GRUPO = t => /Lote|Chácara/.test(t) ? 'terrenos' : /Galp|Sala|Pr[eé]dio|Barrac/.test(t) ? 'comerciais' : /Casa|Condom/.test(t) ? 'casas' : 'apartamentos';
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const fotos = x.cod === '2465' ? [...x.fotos.slice(1), x.fotos[0]] : x.fotos; // a 1ª foto do 2465 é um folheto de anúncio
  const neg = x.tags.includes('sale') ? 'venda' : 'aluguel';
  const tipo = TIPO[x.tipo] || x.tipo;
  return {
    ...x, fotos, neg, tipo, grupo: GRUPO(x.tipo), bairro: BAIRRO[x.bairro] || x.bairro, slug: `imovel/${x.cod}`,
    preco: brl(neg === 'venda' ? x.venda : x.aluguel), precoAluguel: x.aluguel ? brl(x.aluguel) : '',
    corretor: (x.corretor || '').replace(/[ .]+$/, '') || 'Lídder Imobiliária', waNum: x.wa ? '55' + soNum(x.wa) : E.wa,
  };
});
const vendas = imoveis.filter(i => i.neg === 'venda');
const aluguel = imoveis.filter(i => i.neg === 'aluguel' || i.aluguel);
const cidades = [...new Set(imoveis.map(i => i.cidade))].map(c => [c, imoveis.filter(i => i.cidade === c).length]).sort((a, b) => b[1] - a[1]);
const porCod = c => imoveis.find(i => i.cod === c);
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area ? m2(i.area) : '', i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.suites && quando(i.suites, 'suíte', 'suítes'), i.gar && quando(i.gar, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(i.waNum, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo} em ${i.bairro}, ${i.cidade}) que vi no site da Lídder.`);

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'aluguel-sem-fiador', nome: 'Aluguel sem fiador' }, { slug: 'anuncie', nome: 'Anuncie' }, { slug: 'empresa', nome: 'A Lídder' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Torres', b: 'Noite em Goiânia' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Mulish:wght@400;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800&family=Figtree:wght@400;500;600&display=swap',
};
const cores = { a: '#f06236', b: '#18181a' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Lídder Imobiliária | Imóveis à venda e para alugar em Goiânia' : `${titulo} | Lídder Imobiliária`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const logo = (v, claro) => `<a class="marca" href="${link(v, 'index')}" aria-label="Lídder Imobiliária, página inicial"><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="632" height="251" alt="Lídder Imobiliária"></a>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${logo(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da Lídder.')}" target="_blank" rel="noopener">${icWa()}<span>${E.cel}</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" width="632" height="251" alt="Lídder Imobiliária" loading="lazy"><p>Locação e vendas na grande Goiânia e região.</p><p class="rod-social"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></p></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">Para comprar</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'aluguel-sem-fiador')}">Aluguel sem fiador</a></li><li><a href="${link(v, 'anuncie')}">Anuncie seu imóvel</a></li></ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Endereço</h3><p class="rod-end">${ic('pin')}<span>${E.end}<br>${E.bairro}</span></p></div>
  </div>
  <div class="rod-base"><div class="in"><span>${E.razao} · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="card-neg">${i.neg === 'venda' ? (i.aluguel ? 'Venda ou locação' : 'Venda') : 'Locação'}</span></figure>
  <div class="card-txt"><p class="card-local">${esc(i.bairro)} · ${esc(i.cidade)}</p><h3>${i.tipo}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<span>cód. ${i.cod}</span></p></div></a></li>`;
const GRUPOS = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['casas', 'Casas'], ['terrenos', 'Lotes e chácaras'], ['comerciais', 'Comerciais']];
const filtro = (v, lista, nome, fn = cartao) => {
  const grupos = GRUPOS.filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => fn(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const titulo = `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}`;
  const dados = [['Área', i.area ? m2(i.area) : ''], ['Terreno', i.lote ? m2(i.lote) : ''], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vagas', i.gar]].filter(d => d[1]);
  const feats = Object.entries(i.feats).filter(([, l]) => l.length);
  return head(v, i.slug, `${i.tipo} em ${i.bairro}`, `${titulo}, ${i.cidade}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, i.neg === 'aluguel' ? 'alugar' : 'comprar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'aluguel' ? 'alugar' : 'comprar')}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  <div class="galeria g${Math.min(i.fotos.length, 5)}">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.tipo} em ${i.bairro} (foto ${n + 1})`)}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.neg === 'aluguel' ? 'Locação' : 'Venda'} · cód. ${i.cod}</p>
      <h1>${esc(titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${i.end ? `${esc(i.end)}, ` : ''}${esc(i.bairro)}, ${esc(i.cidade)} - GO</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      ${i.desc.length ? `<h2>Sobre o imóvel</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}` : ''}
      ${feats.map(([g, l]) => `<h2>${g === 'Outros' ? 'Outros detalhes' : g === 'Imóvel' ? 'No imóvel' : g}</h2><ul class="lista-check feats">${l.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>`).join('')}
      ${i.perto.length ? `<h2>Por perto</h2><p class="perto">${i.perto.map(esc).join(' · ')}</p>` : ''}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${i.neg === 'venda' && i.aluguel ? `<p class="pb-alt">Também para alugar: <b>${i.precoAluguel}/mês</b></p>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a>
      <p class="pb-corretor">${ic('usuarios')}<span>Atendimento: <b>${esc(i.corretor)}</b>${i.creci ? `<br>CRECI ${esc(i.creci)}` : ''}${i.wa ? `<br>${esc(i.wa)}` : ''}</span></p>
      <p class="pb-nota">Valores informados pela imobiliária; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Lídder.', opcoes = ['Quero comprar um imóvel', 'Quero alugar um imóvel', 'Quero anunciar meu imóvel', 'Aluguel sem fiador (CredPago)', 'Outro assunto']) => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto">${opcoes.map(o => `<option>${o}</option>`).join('')}</select></label><label>Bairro ou cidade<input name="bairro" placeholder="Setor Bueno, Aparecida..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa da Lídder Imobiliária" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=15&output=embed"></iframe>`;
const equipeLista = () => `<ul class="equipe">${equipe.map(p => `<li class="sobe"><span class="eq-ini" aria-hidden="true">${p[0].split(' ').map(s => s[0]).slice(0, 2).join('')}</span><div><b>${p[0]}</b><small>CRECI ${p[1]}</small><a href="${waHref('55' + soNum(p[2]))}" target="_blank" rel="noopener">${icWa()}${p[2]}</a></div></li>`).join('')}</ul>`;
const contatoLista = () => `<ul class="contato-lista"><li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></div></li><li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('pin')}<div><strong>Endereço</strong><span>${E.end}<br>${E.bairro}</span></div></li></ul>`;
const credpago = ['A Lídder atua em parceria com a CredPago, facilitando a vida de quem procura ou tem imóvel para alugar.', 'Com a CredPago o inquilino tem uma das menores taxas do mercado como garantia do aluguel, sem precisar de fiador.', 'Com a Análise Instantânea CredPago, inquilino e proprietário têm mais segurança e assertividade para fechar negócio.'];

function comum(v, pag, cab, cartaoFn = cartao) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `Imóveis à venda em Goiânia, Aparecida de Goiânia e região: apartamentos, casas, lotes, chácaras e galpões.`) + topo(v, 'comprar') + cab('Comprar', 'Imóveis à venda na grande Goiânia', `Uma seleção de ${vendas.length} dos cerca de ${E.totalVenda} imóveis à venda na carteira da Lídder. Não achou o que procura? Fale com a equipe.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v', cartaoFn)}<p class="lista-mais">${ic('usuarios')}<span>Procurando algo específico? <a href="${waHref(E.wa, 'Olá! Estou procurando um imóvel para comprar.')}" target="_blank" rel="noopener">Conte para a equipe pelo WhatsApp</a> e receba as opções da carteira completa.</span></p></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `Imóveis para alugar em Goiânia e região, com opção de aluguel sem fiador pela CredPago.`) + topo(v, 'alugar') + cab('Alugar', 'Imóveis para alugar', `Uma seleção de ${aluguel.length} dos cerca de ${E.totalAluguel} imóveis para locação. Dá para alugar sem fiador, com a CredPago.`) + `
<div class="in lista-pag">${filtro(v, aluguel, 'a', cartaoFn)}<p class="lista-mais">${ic('chave')}<span>Sem fiador? <a href="${link(v, 'aluguel-sem-fiador')}">Veja como funciona o aluguel com a CredPago</a>.</span></p></div>
` + rodape(v);
  pag['aluguel-sem-fiador'] = head(v, 'aluguel-sem-fiador', 'Aluguel sem fiador', credpago[0]) + topo(v, 'aluguel-sem-fiador') + cab('Aluguel sem fiador', 'Alugue sem fiador, com a CredPago', 'Uma das menores taxas do mercado como garantia do aluguel.') + `
<div class="in fiador"><div class="fiador-txt">${credpago.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}<p class="bts"><a class="btn" href="${link(v, 'alugar')}">Ver imóveis para alugar</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Quero alugar sem fiador com a CredPago.')}" target="_blank" rel="noopener">${icWa()}${E.cel}</a></p></div>
<ol class="passos"><li><b>Escolha o imóvel</b><span>Entre os imóveis para locação da Lídder.</span></li><li><b>Análise instantânea</b><span>A CredPago avalia o cadastro na hora.</span></li><li><b>Contrato sem fiador</b><span>A garantia do aluguel é a CredPago.</span></li></ol></div>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Está vendendo ou alugando seu imóvel? Anuncie gratuitamente no site da Lídder e nos melhores portais da internet.') + topo(v, 'anuncie') + cab('Anuncie', 'Está vendendo ou alugando seu imóvel?', 'Anuncie gratuitamente no nosso site e nos melhores portais da internet.') + `
<div class="in anuncie"><div><ul class="lista-check">${['Anúncio gratuito no site da Lídder', 'Divulgação nos principais portais imobiliários', 'Acompanhamento de um corretor da equipe', 'Para locação: opção de garantia CredPago para o inquilino'].map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul><p>Prefere falar agora? Ligue <a href="${telHref(E.fone)}">${E.fone}</a> ou chame no WhatsApp <a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a>.</p></div>${formulario('Olá! Quero anunciar meu imóvel com a Lídder.', ['Quero vender meu imóvel', 'Quero alugar meu imóvel'])}</div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Lídder', sobre) + topo(v, 'empresa') + cab('A Lídder', 'Mais de 20 anos no mercado imobiliário de Goiânia', `${E.razao} · ${E.creci}`) + `
<div class="in"><section class="inst"><p class="lead">${sobre}</p><ul class="pilares">${pilares.map(p => `<li class="sobe">${ic(p[0])}<h3>${p[1]}</h3><p>${p[2]}</p></li>`).join('')}</ul></section>
<section class="eq-sec"><header class="tit"><p class="k">Equipe</p><h2>Corretores da Lídder</h2><p>Fale direto com quem vai acompanhar você.</p></header>${equipeLista()}</section>
<section class="end-sec"><div><p class="k">Escritório</p><h2>Parque Amazônia, Goiânia</h2>${contatoLista()}</div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Lídder Imobiliária: ${E.cel} (WhatsApp), ${E.fone}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Lídder', 'Escreva pelo formulário, ligue ou passe no escritório.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}</div></section>
<section class="mapa-sec">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

const destaques = ['3122', '3912', '3949', '2764', '4104', '3462', '2747', '3901'].map(porCod);

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="etiqueta">${k}</p><h1>${t}</h1><p>${s}</p></div><span class="torres" aria-hidden="true"></span></section>`;
  const capa = porCod('3912').fotos[0];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="etiqueta">Imobiliária em Goiânia · ${E.creci}</p><h1>Locação e vendas na <em>grande Goiânia</em> e região.</h1><p>Apartamentos, casas, lotes, chácaras, salas e galpões, com a consultoria de quem está há mais de 20 anos no mercado.</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${E.totalVenda} imóveis à venda</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${E.totalAluguel} para locação</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(capa, 'Edifício residencial no Setor Bueno, Goiânia', ' loading="eager" fetchpriority="high"')}<figcaption>Setor Bueno, Goiânia · cód. 3912</figcaption></figure>
</div></section>
<section class="pil-a"><div class="in"><ul class="pilares">${pilares.map(p => `<li class="sobe">${ic(p[0])}<h3>${p[1]}</h3><p>${p[2]}</p></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="etiqueta">Destaques</p><h2>Imóveis escolhidos pela equipe</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header><ul class="cards">${destaques.filter(i => i.cod !== '3912').concat(porCod('498')).map(i => cartao(v, i)).join('')}</ul></section>
<section class="cid-a"><div class="in"><p class="etiqueta">Onde atuamos</p><ul>${cidades.map(c => `<li><b>${c[0]}</b><small>${c[1]} ${c[1] === 1 ? 'imóvel' : 'imóveis'} nesta seleção</small></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="etiqueta">Para alugar</p><h2>Locação, com ou sem fiador</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Todos para alugar ${ic('seta')}</a></header><ul class="cards">${aluguel.filter(i => i.neg === 'aluguel').slice(0, 4).map(i => cartao(v, i)).join('')}</ul></section>
<section class="fiador-a"><div class="in fiador-a-in"><div><p class="etiqueta">Aluguel sem fiador</p><h2>Parceria com a CredPago</h2><p>${credpago[1]}</p></div><a class="btn" href="${link(v, 'aluguel-sem-fiador')}">Como funciona</a></div></section>
<section class="in eq-a"><header class="tit tit-linha"><div><p class="etiqueta">Equipe</p><h2>Fale direto com um corretor</h2></div><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Lídder ${ic('seta')}</a></header>${equipeLista()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const ficha2 = (v, i) => `<li class="card fl" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}</figure>
  <div class="fl-txt"><p class="fl-cod">${i.neg === 'venda' ? 'Venda' : 'Locação'} · ${i.cod}</p><h3>${i.tipo} <span>${esc(i.bairro)}</span></h3><p class="fl-cid">${esc(i.cidade)}</p><p class="fl-res">${resumo(i).join(' · ') || '&nbsp;'}</p></div>
  <p class="fl-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>por mês</small>' : ''}</p></a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><img src="/assets/img/goiania-noite.webp" width="1600" height="900" alt="Goiânia à noite vista do alto" loading="eager" fetchpriority="high"><div class="in hero-b-in"><p class="k">Lídder Imobiliária · Goiânia · GO</p><h1>Seu imóvel na grande Goiânia, <span>com quem conhece a cidade há mais de 20 anos.</span></h1>
  <div class="hero-b-bts"><a href="${link(v, 'comprar')}"><b>${E.totalVenda}</b><span>imóveis à venda</span>${ic('seta')}</a><a href="${link(v, 'alugar')}"><b>${E.totalAluguel}</b><span>para alugar</span>${ic('seta')}</a></div></div></section>
<section class="in dest-b"><header class="tit tit-linha"><div><p class="k">Selecionados</p><h2>À venda agora</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver mais ${ic('seta')}</a></header><ul class="fichas">${destaques.slice(0, 6).map(i => ficha2(v, i)).join('')}</ul></section>
<section class="tipos-b"><div class="in"><p class="k">Por tipo</p><ul>${[['Apartamentos', '3122', 1], ['Casas', '3901', 0], ['Lotes e chácaras', '3710', 0], ['Comerciais', '3646', 0]].map(([t, c, n]) => `<li><a href="${link(v, 'comprar')}">${foto(porCod(c).fotos[n], t)}<span>${t}</span></a></li>`).join('')}</ul></div></section>
<section class="in dest-b"><header class="tit tit-linha"><div><p class="k">Locação</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver mais ${ic('seta')}</a></header><ul class="fichas">${aluguel.filter(i => i.neg === 'aluguel').slice(0, 4).map(i => ficha2(v, i)).join('')}</ul><p class="nota-b">${ic('chave')}<span>${credpago[1]} <a href="${link(v, 'aluguel-sem-fiador')}">Como funciona</a></span></p></section>
<section class="sobre-b"><div class="in sobre-b-in"><div><p class="k">A Lídder</p><h2>${sobre}</h2><a class="btn" href="${link(v, 'empresa')}">Conheça a equipe</a></div><ul class="pilares">${pilares.map(p => `<li>${ic(p[0])}<div><h3>${p[1]}</h3><p>${p[2]}</p></div></li>`).join('')}</ul></div></section>
<section class="in anuncie-b"><div><p class="k">Proprietário</p><h2>Anuncie grátis no site e nos portais</h2></div><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a></section>
` + rodape(v);
  comum(v, pag, cab, ficha2);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Lídder Imobiliária', artigo: 'da', url: E.url, lang: 'pt', cor: '#f06236', fundo: '#2a2a2c', claro: '#f7f4f0',
  fonteTitulo: 'Quicksand,system-ui,sans-serif', fonteTexto: 'Mulish,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, no laranja e grafite do logo, com as torres da marca como moldura e a escolha "comprar ou alugar" na abertura.', pontos: [`${imoveis.length} imóveis reais com fotos, valores e ficha completa`, 'Corretor e WhatsApp de cada imóvel', 'Equipe com CRECI e contato direto'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Escura, abre com Goiânia à noite e lista os imóveis como fichas com o preço em destaque.', pontos: ['Busca por tipo: apartamentos, casas, lotes, comerciais', 'Aluguel sem fiador com a CredPago', 'Anúncio grátis para proprietários'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
