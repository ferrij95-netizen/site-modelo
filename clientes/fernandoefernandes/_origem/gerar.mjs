// Fernando & Fernandes Imobiliária (Rio de Janeiro, desde 1996). Gera public/{a,b}/ e a página de escolha.
// node clientes/fernandoefernandes/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs fernandoefernandes http://www.fernandoefernandes.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 das páginas public.php?inform=N do site atual (os 37 imóveis em destaque
// que index.php, aluguel.php e cev.php mostravam; até 5 fotos de cada, faixas pretas cortadas). Marca: logo_min.png redesenhado (marca.svg).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ANT = 'https://www.fernandoefernandes.com.br/';
const E = {
  nome: 'Fernando & Fernandes', url: 'https://fernandoefernandes.overtus.com.br/', antigo: 'http://www.fernandoefernandes.com.br/',
  email: 'contato@fernandoefernandes.com.br', locacao: 'locacao@fernandoefernandes.com.br',
  wa: '5521979490441', // botão flutuante de WhatsApp do site atual
  vendas: '(21) 3529-1033', // telefone de visita citado nos anúncios de venda
  curto: 'Administração de condomínios, locação e venda de imóveis no Rio de Janeiro desde 1996. Mais de 1.200 condomínios administrados.',
};
const unidades = [
  { t: 'Vila Isabel', tag: 'Matriz', fone: '(21) 2575-0880', end: 'R. Torres Homem, 217', bairro: 'Vila Isabel, Rio de Janeiro - RJ', q: 'Rua Torres Homem 217 Vila Isabel Rio de Janeiro' },
  { t: 'Centro', tag: 'Filial', fone: '(21) 2526-8450', end: 'R. Rodrigo Silva, 18, 6º andar', bairro: 'Centro, Rio de Janeiro - RJ', q: 'Rua Rodrigo Silva 18 Centro Rio de Janeiro' },
  { t: 'Recreio', tag: 'Filial', fone: '(21) 2497-9150', end: 'Est. Benvindo de Novaes, 1825, loja A', bairro: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ', q: 'Estrada Benvindo de Novaes 1825 Recreio Rio de Janeiro' },
  { t: 'Jacarepaguá', tag: 'Filial', fone: '(21) 2497-9150', end: 'Est. Geremário Dantas, 1389, loja A', bairro: 'Jacarepaguá, Rio de Janeiro - RJ', q: 'Estrada Geremario Dantas 1389 Jacarepagua Rio de Janeiro' },
];
const horario = 'Segunda a sexta, das 9h às 17h (exceto feriados)';
const sobre = [
  'Fundada em 1996, a Fernando & Fernandes nasceu com o propósito de oferecer soluções completas em administração de condomínios e intermediação imobiliária.',
  'Ao longo de quase três décadas, unimos experiência, tecnologia e atendimento humanizado para simplificar a vida de síndicos, condôminos e proprietários de imóveis.',
  'Mais do que administrar, cuidamos do patrimônio e das pessoas. Acreditamos em transparência, eficiência e proximidade no relacionamento com nossos clientes.',
];
const servicosCond = [
  ['usuarios', 'Assessoria completa', 'Assessoria completa aos síndicos e condôminos.'],
  ['painel', 'Análise financeira', 'Análise constante das receitas e despesas do condomínio, evitando, sobretudo, o déficit orçamentário.'],
  ['escudo', 'Auxílio jurídico', 'Corpo jurídico próprio, capacitado para resolver problemas na área imobiliária.'],
  ['calendario', 'Controle de inadimplência', 'Controle rígido da cobrança das cotas condominiais, com cartas de cobrança após 30, 60 e 90 dias de atraso.'],
  ['livro', 'Transparência financeira', 'Balancetes mensais, comprovantes de despesas e relação de inadimplência enviados ao síndico nos primeiros 10 dias úteis do mês.'],
  ['usuarios', 'Gestão de pessoal', 'Administração completa do departamento pessoal e das obrigações trabalhistas.'],
  ['escudo', 'Seguros', 'Seguros obrigatórios do condomínio: vida/funeral e incêndio.'],
  ['check', 'Facilidade de pagamento', 'Pagamento das cotas condominiais em qualquer agência bancária.'],
  ['calendario', 'Assembleias', 'Profissionais para assessorar as assembleias, da convocação ao registro em cartório.'],
  ['medidor', 'Consultoria financeira', 'Consultoria para otimizar a análise dos custos do condomínio.'],
  ['carro', 'Motoboy exclusivo', 'Serviço de motoboy exclusivo para os condomínios.'],
];
const servicosEmpresa = [
  ['fabrica', 'Gestão de condomínio', 'Administração condominial de verdade: peça a sua proposta e vamos começar uma gestão de sucesso para o seu condomínio.'],
  ['chave', 'Locação', 'Uma política voltada ao atendimento dos proprietários e inquilinos, com atendimento personalizado.'],
  ['casa', 'Compra e venda', 'Total segurança e credibilidade na compra e venda do seu imóvel.'],
  ['escudo', 'Pessoal e jurídico', 'Corpo jurídico e departamento pessoal para atender as demandas do seu condomínio e tirar suas dúvidas.'],
  ['check', 'Certificado digital', 'Emissão do certificado digital da sua empresa ou condomínio, com confiabilidade e segurança.'],
  ['painel', 'Tecnologia e segurança', 'Gestão corporativa voltada para resultados, baseada nas necessidades dos nossos clientes.'],
];
const app = [
  ['Relatórios financeiros detalhados', 'Relatórios semanais, mensais e anuais, exportáveis para Excel.'],
  ['Boletos e documentos', 'Boletos e documentos do condomínio a qualquer hora, com transparência e organização financeira.'],
  ['Pasta digital de prestação de contas', 'Gráficos e indicadores visuais para entender as finanças do condomínio.'],
  ['100% digital', 'Pelo computador, tablet ou celular, com segurança e mobilidade.'],
];
const depoimentos = [
  ['Ana Mello', 'Como síndica, a proatividade e o bom senso da minha gerente me dão a segurança necessária para meu trabalho. A assessoria jurídica da F&F também é exemplar, sempre disponível e com recomendações de alta qualidade.'],
  ['Mauricio Reis', 'O atendimento da F&F para o nosso condomínio é excelente. Eles são uma empresa de total confiança, com funcionários competentes e dedicados.'],
  ['Roberto Castro', 'A equipe da F&F é extremamente atenciosa e bem treinada. Eles superaram minhas expectativas, e a administradora está de parabéns pelo excelente trabalho!'],
  ['Vania Araújo', 'Desde que a F&F começou a administrar nosso condomínio, posso finalmente ficar mais tranquila. Eles são uma excelente opção, oferecendo um serviço de confiança e qualidade.'],
];
const docs = [
  ['Condomínio', [['Ficha cadastral de síndico', 'ficha_cadastral_de_sindico'], ['Cadastro de moradores', 'cadastro_de_moradores'], ['Alteração de titularidade de síndico', 'alteracao_titularidade_sindico'], ['Solicitação do síndico', 'solicitacao_do_sindico'], ['Autorização para serviço de sindicância', 'autorizacao_p_execucao_do_servico_de_sindicancia'], ['Contas a pagar', 'contas_a_pagar'], ['Débito automático', 'form_debito_automatico'], ['Controle de consumo de água', 'controle_de_consumo_de_agua']]],
  ['Departamento pessoal', [['Ficha cadastral', 'ficha_cadastral'], ['Autorização de admissão', 'autorizacao_admissao'], ['Documentos para admissão', 'relacao_de_documentos_p_admissao'], ['Autorização de dispensa', 'autorizacao_dispensa'], ['Autorização de férias', 'autorizacao_de_ferias'], ['Folha de ponto (01 a 31)', 'folha_de_ponto_diario_01_31'], ['Folha de ponto (15 a 14)', 'folha_de_ponto_diario_15_14'], ['Folha de ponto (16 a 15)', 'folha_de_ponto_diario_16_15'], ['Concessão de vale-transporte', 'pedido_de_concessao_de_vale-transporte'], ['Dispensa de vale-transporte', 'dispensa_de_vale-transporte'], ['Planilha mensal de horas extras', 'planinha_mensal_de_horas_extras'], ['Recibo de vale', 'vale'], ['Ficha de prestador de serviços', 'ficha_prestador_servicos'], ['Pagamento do salário via PIX', 'autorizacao_transferencia_pix']]],
  ['Jurídico', [['Procuração para ações em geral', 'procuracao_acao'], ['Procuração para cobrança de cota condominial', 'procuracao_cota']]],
];
const acessos = [
  ['Condomínio', 'FF Facilities: boletos, balancetes e prestação de contas', 'https://fffacilities.com.br/'],
  ['Locação', 'Área do proprietário e do inquilino', 'https://fernandoefernandes.com.br/ffnet/'],
  ['Funcionário', 'Área do departamento pessoal', 'https://fernandoefernandes.com.br/ffnet_imob/areadp.php'],
  ['FFNet', 'Acesso dos clientes ao sistema FFNet', 'https://fernandoefernandes.com.br/ffnet_ext/logon.php'],
];
const lojasApp = { ios: 'https://apps.apple.com/us/app/ff-facilities/id6743017582', android: 'https://play.google.com/store/apps/details?id=com.lvffernandofernandes' };
const redes = { insta: 'https://www.instagram.com/fernandoefernandesimobiliaria/', face: 'https://www.facebook.com/fernandoefernandesimobiliaria/' };

// ---------- imóveis ----------
const minus = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em']);
const titulo = s => s.toLowerCase().replace(/\s+/g, ' ').trim().split(' ').map((w, n) => (n && minus.has(w)) ? w : w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  .replace(/\bRj\b/g, 'RJ').replace(/\bSfx\b/g, 'SFX');
const frase = s => s.toLowerCase().replace(/\s+/g, ' ').replace(/\s+([,.!])/g, '$1').replace(/!{2,}/g, '!').replace(/\.{3,}/g, '...')
  .replace(/(^|[.!?]\s+)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(f&f|sfx|iptu|rgi)\b/gi, m => m.toUpperCase())
  .replace(/\b(rua|avenida|estrada|boulevard) ([a-zà-ú][a-zà-ú ]+?)(?=\s(localiza|ótima|boa|pr[ée]dio|perto|junto|impec|condom|com |\d))/gi, (m, a, b) => `${a} ${titulo(b)}`);
const reais = s => {
  const n = Number(String(s || '').replace(/[^\d,]/g, '').replace(',', '.'));
  return n > 1 ? `R$ ${n.toLocaleString('pt-BR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}` : '';
};
const cap = s => s.charAt(0) + s.slice(1).toLowerCase().replace(/\bpet\b/, 'PET');
const GRUPO = t => /Casa|Sobrado/.test(t) ? 'casas' : /Sala|Loja|Galp/.test(t) ? 'comerciais' : /Box|Lote/.test(t) ? 'outros' : 'apartamentos';
const TIPO = { 'Sala / Conjunto': 'Sala comercial', 'Box / Garagem': 'Vaga de garagem', 'Loja / Salão': 'Loja', 'Lote / Terreno': 'Terreno', 'Casa em Condominio': 'Casa em condomínio' };
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const neg = x.venda ? 'venda' : 'aluguel';
  const it = x.itens.split('•').map(s => s.trim()).filter(Boolean);
  const nQ = (re) => { const m = it.find(s => re.test(s)); return m ? parseInt(m, 10) || 1 : 0; };
  const areaM = (it.find(s => /^Metragem/.test(s)) || '').match(/(\d+)/);
  const amen = it.filter(s => !/Quarto|Banheiro|Suite|^Metragem|^Garagem$/.test(s)).map(s => s.replace('Armario', 'Armário').replace('Gas Encanado', 'Gás encanado').replace('Quarto / WC Empregada', 'Dependência de empregada').replace('Acessibilidade / Rampa', 'Acessibilidade / rampa').replace('Moveis', 'Móveis'));
  const predio = x.condinfo.flatMap(s => s.split('•')).map(s => s.trim()).filter(s => s && !/^de \d/.test(s)).map(s => s.replace('Condominio', 'Condomínio').replace('Construção', 'construção').replace(/^Area de Lazer$/, 'Área de lazer').replace(/^Circuito de Cameras$/, 'Circuito de câmeras'));
  let end = titulo(x.endereco.replace(/,\s*0$/, ''));
  const [bai] = x.bairro.split(' - Rio de Janeiro');
  const bairro = titulo(bai.replace(/\s+-\s+/g, ' - '));
  let desc;
  if (neg === 'venda') desc = [frase(x.desc[0].replace(/\s*PARA VISIT.*$/i, '').trim())];
  else desc = x.desc.slice(2).filter(s => !/^(aluguel|condom|iptu|observa|contato|\*|ressalv|localiza[çc][ãa]o e prox|diferenciais)/i.test(s)).map(s => s.replace(/^-\s*/, '').replace(/;$/, '.'));
  return {
    id: x.id, neg, cod: x.cod, slug: `imovel/${x.id}`, end, bairro, tipo: TIPO[x.tipo] || x.tipo.replace('Condominio', 'condomínio'), grupo: GRUPO(x.tipo),
    preco: reais(x.venda || x.locacao), cond: reais(x.condominio), iptu: reais(x.iptu),
    quartos: nQ(/Quarto/), banh: nQ(/Banheiro/), suites: nQ(/Suite/), gar: it.some(s => /Garagem/.test(s)) ? 1 : 0, area: areaM ? +areaM[1] : 0,
    amen: amen.map(cap), predio: predio.map(cap), desc, fotos: x.img,
  };
});
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const bairros = [...new Set(imoveis.map(i => i.bairro))];

const nav = [{ slug: 'condominios', nome: 'Condomínios' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'comprar', nome: 'Comprar' }, { slug: 'empresa', nome: 'A F&F' }, { slug: 'cliente', nome: 'Área do cliente' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Quadra', b: 'Balancete' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Sora:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
};
const cores = { a: '#263657', b: '#1b2742' };
const head = (v, s, t, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Fernando & Fernandes | Administração de condomínios e imóveis no Rio' : `${t} | Fernando & Fernandes`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').replace('<svg ', '<svg class="marca-ff" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Fernando & Fernandes Imobiliária, página inicial"` : ''}>${marcaSvg}<span class="marca-txt"><b>Fernando<i>&amp;</i></b><b>Fernandes</b><small>Imobiliária</small></span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.suites && quando(i.suites, 'suíte', 'suítes'), i.gar && 'vaga'].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo}, ${i.end}, ${i.bairro}) que vi no site da Fernando & Fernandes.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'condominios')}#proposta">Proposta para condomínio</a>
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
    <div class="rod-marca">${marca(v, 'div')}<p>Administração de condomínios, locação e venda de imóveis no Rio de Janeiro desde 1996.</p>
      <p class="rod-redes"><a href="${redes.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${redes.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Unidades</h3><ul class="rod-dados">${unidades.map(u => `<li><strong>${u.t}</strong><span>${u.end}</span><a href="${telHref(u.fone)}">${u.fone}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${ic('relogio')}<span>${horario}</span></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('chave')}<a href="mailto:${E.locacao}">${E.locacao}</a></li></ul>
      <h3>Aplicativo FF Facilities</h3><p class="rod-app"><a href="${lojasApp.ios}" target="_blank" rel="noopener">App Store</a><a href="${lojasApp.android}" target="_blank" rel="noopener">Google Play</a></p></div>
    <div><h3>Credenciamentos</h3><ul class="selos"><li><img src="/assets/img/abadi.webp" width="200" height="52" alt="ABADI" loading="lazy"></li><li><img src="/assets/img/secovi.webp" width="160" height="52" alt="Secovi Rio" loading="lazy"></li><li><img src="/assets/img/creci.webp" width="175" height="42" alt="CRECI-RJ" loading="lazy"></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Fernando & Fernandes Imobiliária. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="card-cod">${i.cod}</span></figure>
  <div class="card-txt"><p class="card-tipo">${i.tipo} · ${i.bairro}</p><h3>${esc(i.end)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['casas', 'Casas'], ['comerciais', 'Salas e lojas'], ['outros', 'Vagas e terrenos']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const tt = `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}`;
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vaga', i.gar ? 'Sim' : '']].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.tipo}, ${i.end} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${tt}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const contato = i.neg === 'aluguel'
    ? `<a class="btn btn-linha" href="${telHref(unidades[0].fone)}">${ic('tel')}Locação: ${unidades[0].fone}</a><a class="btn btn-linha" href="mailto:${E.locacao}?subject=${encodeURIComponent(`Imóvel cód. ${i.cod}`)}">${ic('mail')}Enviar e-mail</a>`
    : `<a class="btn btn-linha" href="${telHref(E.vendas)}">${ic('tel')}Vendas: ${E.vendas}</a>`;
  return head(v, i.slug, `${i.tipo}, ${i.end}`, `${tt}: ${i.end}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, i.neg === 'aluguel' ? 'alugar' : 'comprar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'aluguel' ? 'alugar' : 'comprar')}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${tt} · cód. ${i.cod}</p>
      <h1>${esc(i.end)}</h1>
      <p class="ficha-local">${ic('pin')}${i.bairro}, Rio de Janeiro - RJ</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Descrição</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}
      ${i.amen.length ? `<h2>No imóvel</h2><ul class="lista-check amen">${i.amen.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
      ${i.predio.length ? `<h2>No prédio</h2><ul class="lista-check amen">${i.predio.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      <dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a>
      ${contato}
      <p class="pb-nota">${i.neg === 'aluguel' ? 'Imóvel de terceiros: aluguel, condomínio, IPTU e taxas podem variar até a entrega do contrato. A visita não garante a reserva.' : 'Valores informados pela imobiliária; confirme na visita.'}</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Fernando & Fernandes.', sel = 0) => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto">${['Proposta de administração para condomínio', 'Quero alugar um imóvel', 'Quero comprar um imóvel', 'Quero alugar ou vender meu imóvel', 'Já sou cliente (SAC)', 'Ouvidoria', 'Trabalhe conosco'].map((o, n) => `<option${n === sel ? ' selected' : ''}>${o}</option>`).join('')}</select></label><label>Condomínio ou bairro<input name="local" placeholder="Nome do condomínio, bairro..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed"></iframe>`;
const unidadesBloco = (m = false) => `<div class="unids">${unidades.map(u => `<article class="unid sobe"><p class="k">${u.tag}</p><h3>${u.t}</h3><p>${ic('pin')}<span>${u.end}<br>${u.bairro}</span></p><p>${ic('tel')}<a href="${telHref(u.fone)}">${u.fone}</a></p>${m ? mapa(u.q) : ''}</article>`).join('')}</div>`;
const servLista = (lista = servicosCond) => `<ul class="servs">${lista.map((x, n) => `<li class="sobe"><span class="sv-n">${String(n + 1).padStart(2, '0')}</span>${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul>`;
const depBloco = () => `<ul class="deps">${depoimentos.map(d => `<li class="sobe"><blockquote><p>${esc(d[1])}</p></blockquote><p class="dep-nome">${d[0]}</p></li>`).join('')}</ul>`;
const appBloco = () => `<div class="app-in"><div><p class="k">Aplicativo FF Facilities</p><h2>O condomínio na palma da mão</h2><p>Plataforma que une síndicos e moradores: boletos, documentos, relatórios e comunicação direta, no Android e no iPhone.</p>
  <p class="bts"><a class="btn" href="${lojasApp.android}" target="_blank" rel="noopener">Google Play</a><a class="btn btn-linha" href="${lojasApp.ios}" target="_blank" rel="noopener">App Store</a></p></div>
  <ul class="app-lista">${app.map(a => `<li>${ic('check')}<span><b>${a[0]}.</b> ${a[1]}</span></li>`).join('')}</ul></div>`;

function comum(v, pag, cab) {
  pag.condominios = head(v, 'condominios', 'Administração de condomínios', 'Administração de condomínios no Rio de Janeiro: assessoria ao síndico, prestação de contas, cobrança, jurídico, departamento pessoal e assembleias.') + topo(v, 'condominios') + cab('Gestão condominial', 'A sua melhor opção em gestão condominial', 'Desde 1996 no mercado, a Fernando & Fernandes vem entregando resultados e simplificando a vida de síndicos e condôminos.') + `
<div class="in"><section class="cond-sec"><header class="tit"><p class="k">Soluções completas</p><h2>Tudo o que o seu condomínio precisa, em um só lugar</h2></header>${servLista()}</section>
<section class="pilares"><article class="sobe"><h3>Equipe qualificada</h3><p>Equipe especializada nas áreas jurídica, contábil e de RH, com soluções inteligentes e suporte completo.</p></article><article class="sobe"><h3>Soluções online</h3><p>Com o FF Facilities, no Android e no iPhone, o síndico consulta receitas, despesas, balancetes e boletos a qualquer hora.</p></article><article class="sobe"><h3>Liderança e crescimento</h3><p>Hoje são mais de 1.200 condomínios administrados no Rio de Janeiro.</p></article></section></div>
<section class="app-sec">${appBloco()}</section>
<div class="in"><section class="proposta" id="proposta"><div><p class="k">Proposta</p><h2>Peça uma proposta para o seu condomínio</h2><p>Conte o nome e o bairro do condomínio e quantas unidades ele tem. A equipe responde com a proposta de administração.</p><ul class="lista-check"><li>${ic('check')}Balancete até o 10º dia útil do mês</li><li>${ic('check')}Cobrança após 30, 60 e 90 dias de atraso</li><li>${ic('check')}Corpo jurídico e departamento pessoal próprios</li></ul></div>${formulario('Olá! Quero uma proposta de administração para o meu condomínio.')}</section>
<section><header class="tit"><p class="k">Quem já é cliente</p><h2>O que dizem os síndicos</h2></header>${depBloco()}</section></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar no Rio de Janeiro: apartamentos, salas, lojas, vagas e terreno.`) + topo(v, 'alugar') + cab('Locação', `${aluguel.length} imóveis para alugar`, 'Apartamentos, salas, lojas e vagas na Tijuca, Vila Isabel, Centro, Recreio e região. Visitas pelo telefone (21) 2575-0880.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}
<section class="por-que"><header class="tit"><p class="k">Por que alugar com a F&F</p></header><ul class="servs servs-3">${[['casa', 'Amplo catálogo de imóveis', 'Encontrar um imóvel pode parecer uma tarefa desafiadora, mas com a F&F é diferente.'], ['usuarios', 'Atendimento personalizado', 'Priorizamos o contato com o cliente: atendimento humanizado e sem burocracia.'], ['relogio', 'Processo ágil de análise', 'Análise de documentos minuciosa, com agilidade para o proprietário e para o inquilino.']].map((x, n) => `<li><span class="sv-n">0${n + 1}</span>${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul></section></div>
` + rodape(v);
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda no Rio de Janeiro, na Grande Tijuca, Méier, Jacarepaguá e região.`) + topo(v, 'comprar') + cab('Compra e venda', `${vendas.length} imóveis à venda`, 'Apartamentos, casas e salas, muitos com exclusividade F&F. Segurança e credibilidade na compra do seu imóvel.') + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}
<section class="anuncie"><div><p class="k">Proprietário</p><h2>Quer vender ou alugar o seu imóvel?</h2><p>Conte onde ele fica e a equipe entra em contato.</p></div>${formulario('Olá! Quero vender ou alugar o meu imóvel com a F&F.', 3)}</section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A F&F', sobre[0]) + topo(v, 'empresa') + cab('Quem somos', 'Desde 1996 cuidando de condomínios e imóveis no Rio', 'Matriz em Vila Isabel e filiais no Centro, no Recreio e em Jacarepaguá.') + `
<div class="in"><section class="inst">${sobre.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</section>
<section class="numeros-sec"><ul class="numeros"><li><b>1996</b><span>ano de fundação</span></li><li><b>+1.200</b><span>condomínios administrados</span></li><li><b>4</b><span>unidades no Rio</span></li><li><b>${imoveis.length}</b><span>imóveis em destaque hoje</span></li></ul></section>
<section><header class="tit"><p class="k">Serviços</p><h2>O que a F&F faz</h2></header>${servLista(servicosEmpresa)}</section>
<section class="credenc"><header class="tit"><p class="k">Credenciamentos</p><h2>Credenciada nas entidades do setor</h2></header><ul class="selos selos-g"><li><img src="/assets/img/abadi.webp" width="200" height="52" alt="ABADI" loading="lazy"></li><li><img src="/assets/img/secovi.webp" width="160" height="52" alt="Secovi Rio" loading="lazy"></li><li><img src="/assets/img/creci.webp" width="175" height="42" alt="CRECI-RJ" loading="lazy"></li></ul></section>
<section><header class="tit"><p class="k">Unidades</p><h2>Venha conversar com a gente</h2></header>${unidadesBloco(true)}</section></div>
` + rodape(v);
  pag.cliente = head(v, 'cliente', 'Área do cliente', 'Acessos dos clientes da Fernando & Fernandes: FF Facilities, locação, departamento pessoal, FFNet e formulários para download.') + topo(v, 'cliente') + cab('Área do cliente', 'Acessos e documentos', 'Entre no sistema certo e baixe os formulários do condomínio, do departamento pessoal e do jurídico.') + `
<div class="in"><section><ul class="acessos">${acessos.map(a => `<li><a href="${a[2]}" target="_blank" rel="noopener"><span class="k">${a[0]}</span><b>${a[1]}</b>${ic('ext')}</a></li>`).join('')}</ul></section>
<section class="docs"><header class="tit"><p class="k">Documentos e formulários</p><h2>Formulários em PDF</h2></header><div class="docs-grade">${docs.map(g => `<div><h3>${g[0]}</h3><ul>${g[1].map(d => `<li><a href="${ANT}ffnet_imob/pdf/${d[1]}.pdf" target="_blank" rel="noopener">${ic('livro')}${d[0]}</a></li>`).join('')}</ul></div>`).join('')}</div></section></div>
<section class="app-sec">${appBloco()}</section>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Fernando & Fernandes: ${unidades[0].fone} (Vila Isabel), ${unidades[1].fone} (Centro), ${unidades[2].fone} (Recreio e Jacarepaguá), ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Fernando & Fernandes', `${horario}. Escolha o assunto e escreva pelo formulário, ou ligue para a unidade mais perto de você.`) + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div><ul class="contato-lista"><li>${ic('mail')}<div><strong>Contato</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('chave')}<div><strong>Locação</strong><a href="mailto:${E.locacao}">${E.locacao}</a></div></li><li>${ic('relogio')}<div><strong>Horário</strong><span>${horario}</span></div></li></ul>${unidadesBloco()}</div></section>
<section class="mapas">${unidades.slice(0, 3).map(u => mapa(u.q)).join('')}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

// capas escolhidas a olho (as melhores fotos de cada lista); o resto vem na ordem do site
const PREF = [1723, 662, 1418, 1715, 610, 1060, 696, 1628, 1037, 1389, 1249];
const destaque = (lista, n) => lista.slice().sort((a, b) => ((PREF.indexOf(a.id) + 1) || 99) - ((PREF.indexOf(b.id) + 1) || 99)).slice(0, n);

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div><div class="cab-blocos" aria-hidden="true"><i></i><i></i><i></i></div></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Administradora de condomínios · Rio de Janeiro · desde 1996</p><h1>A gestão que traz <em>tranquilidade</em> para o seu condomínio.</h1><p>Com anos de experiência, simplificamos a rotina do condomínio para dar mais controle, organização e tranquilidade ao síndico.</p>
    <p class="bts"><a class="btn" href="${link(v, 'condominios')}#proposta">Solicite sua proposta</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Imóveis para alugar e comprar</a></p></div>
  <div class="hero-a-arte" aria-hidden="true">${marcaSvg.replace('class="marca-ff"', 'class="marca-grande"')}
    <p class="selo s1"><b>+1.200</b><span>condomínios administrados</span></p><p class="selo s2"><b>1996</b><span>no mercado imobiliário</span></p></div>
</div></section>
<section class="faixa-a"><div class="in"><ul>${[['Gestão financeira e prestação de contas claras', 'painel'], ['Departamento pessoal especializado', 'usuarios'], ['Assessoria jurídica condominial', 'escudo'], ['Atendimento ágil e próximo', 'tel']].map(x => `<li>${ic(x[1])}<span>${x[0]}</span></li>`).join('')}</ul></div></section>
<section class="in sind-a"><header class="tit tit-linha"><div><p class="k">Para o síndico</p><h2>O que a F&F faz pelo seu condomínio</h2></div><a class="link-seta" href="${link(v, 'condominios')}">Todos os serviços ${ic('seta')}</a></header>${servLista(servicosCond.slice(0, 6))}</section>
<section class="app-sec">${appBloco()}</section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Locação</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${destaque(aluguel, 4).map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Compra e venda</p><h2>À venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${destaque(vendas, 4).map(i => cartao(v, i)).join('')}</ul></section>
<section class="dep-sec"><div class="in"><header class="tit"><p class="k">Depoimentos</p><h2>O que nossos clientes dizem</h2></header>${depBloco()}</div></section>
<section class="in unid-sec"><header class="tit"><p class="k">Unidades</p><h2>Vila Isabel, Centro, Recreio e Jacarepaguá</h2></header>${unidadesBloco()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k"><span>F&F</span>${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = imoveis.find(i => i.id === 1715).fotos[0];
  const linhas = [['Balancete mensal', 'até o 10º dia útil'], ['Cobrança de atrasos', 'cartas aos 30, 60 e 90 dias'], ['Assembleias', 'da convocação ao cartório'], ['Departamento pessoal', 'completo'], ['Jurídico', 'corpo próprio'], ['Boletos e contas', 'no app FF Facilities']];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Fernando & Fernandes · desde 1996</p><h1>Estamos aqui para simplificar a gestão do seu condomínio.</h1><p>${E.curto}</p>
    <p class="bts"><a class="btn" href="${link(v, 'condominios')}#proposta">Solicite sua proposta</a><a class="btn btn-linha" href="${link(v, 'condominios')}">Ver os serviços</a></p></div>
  <div class="hero-b-doc"><figure>${foto(capa, 'Fachada de prédio residencial no Maracanã', ' loading="eager" fetchpriority="high"')}</figure>
    <div class="extrato"><p class="ex-cab"><span>O que o síndico recebe</span><span>F&F</span></p><dl>${linhas.map(l => `<div><dt>${l[0]}</dt><dd>${l[1]}</dd></div>`).join('')}</dl><p class="ex-pe">+1.200 condomínios administrados no Rio</p></div></div>
</div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>1996</b><span>fundação</span></li><li><b>+1.200</b><span>condomínios</span></li><li><b>4</b><span>unidades</span></li><li><b>${imoveis.length}</b><span>imóveis em destaque</span></li></ul></div></section>
<section class="in sind-b"><header class="tit"><p class="k"><span>01</span>Gestão condominial</p><h2>Soluções completas para o seu condomínio</h2></header>${servLista()}<p class="bts"><a class="btn" href="${link(v, 'condominios')}#proposta">Pedir proposta</a></p></section>
<section class="app-sec">${appBloco()}</section>
<section class="in dest-b"><header class="tit tit-linha"><div><p class="k"><span>02</span>Imóveis</p><h2>Para alugar e para comprar</h2></div></header>
  <div class="dest-b-grade"><div><h3 class="sub-b">Para alugar <a class="link-seta" href="${link(v, 'alugar')}">${aluguel.length} imóveis ${ic('seta')}</a></h3><ul class="cards">${destaque(aluguel, 3).map(i => cartao(v, i)).join('')}</ul></div>
  <div><h3 class="sub-b">À venda <a class="link-seta" href="${link(v, 'comprar')}">${vendas.length} imóveis ${ic('seta')}</a></h3><ul class="cards">${destaque(vendas, 3).map(i => cartao(v, i)).join('')}</ul></div></div></section>
<section class="in dep-b"><header class="tit"><p class="k"><span>03</span>Depoimentos</p><h2>O que dizem os clientes</h2></header>${depBloco()}</section>
<section class="unid-b"><div class="in"><header class="tit"><p class="k"><span>04</span>Unidades</p><h2>Matriz em Vila Isabel e três filiais</h2></header>${unidadesBloco()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Fernando & Fernandes', artigo: 'da', url: E.url, lang: 'pt', cor: '#8a7628', fundo: '#1b2742', claro: '#f4f1e8',
  fonteTitulo: 'Sora,system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7 + imoveis.length, texto: 'Clara, em azul-marinho e dourado, com o prédio do logo em destaque e a gestão de condomínios em primeiro lugar.', pontos: ['Os 11 serviços para o síndico e o pedido de proposta', `Os ${imoveis.length} imóveis em destaque, com fotos e ficha`, 'Área do cliente com os acessos e os 24 formulários'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7 + imoveis.length, texto: 'Sóbria, com cara de prestação de contas: um extrato do que o síndico recebe logo na abertura e números em fonte mono.', pontos: ['Serviços numerados como num balancete', 'Imóveis para alugar e comprar lado a lado', 'Quatro unidades com telefone e endereço'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
