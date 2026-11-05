// Bambuí (Goiânia/GO): incorporadora, revenda de imóveis e móveis planejados. Gera public/{a,b}/ e a página de escolha.
// node clientes/bambui/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs bambui https://www.bambui.com.br/)
// Conteúdo e fotos tirados do site atual em 05/11/2026: home, /institucional, /lancamentos, /lancamento/<7 empreendimentos>,
// /moveis-planejados, /contato e /busca (revenda). Fotos originais do wp-content/uploads, convertidas para webp.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const TAM = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const E = {
  nome: 'Bambuí', url: 'https://bambui.overtus.com.br/', antigo: 'https://www.bambui.com.br/',
  wa: '556232391929', // botão de WhatsApp flutuante do site atual (o ícone do rodapé usa 556232391919, o fone da sede)
  portal: 'https://bambui.cvcrm.com.br/cliente/bambui',
  cnpj: '10.871.039/0001-38',
  sobre: 'A Bambuí nasceu há mais de 30 anos, como imobiliária. Já ajudamos milhares de pessoas a encontrar uma varanda em que coubessem mais amigos, ou uma janela por onde o sol entrasse todas as manhãs.',
  curto: 'Incorporadora de Goiânia com mais de 30 empreendimentos lançados, revenda de imóveis e móveis planejados de alto padrão. Setor Marista, Jardim América, Bueno e região.',
};
const redes = [
  ['insta', 'Instagram', 'https://www.instagram.com/bambuisingular/'],
  ['face', 'Facebook', 'https://www.facebook.com/grupobambui'],
  ['yt', 'YouTube', 'https://www.youtube.com/c/GrupoBambu%C3%AD'],
  ['linkedin', 'LinkedIn', 'https://www.linkedin.com/company/grupo-bambu%C3%AD/'],
];
const enderecos = [
  { t: 'Sede', l1: 'Truver Corporate Center', l2: 'R. C-238, 481, St. Bueno', l3: 'Goiânia - GO, 74290-150', fone: '(62) 3239-1919', mapa: 'https://maps.app.goo.gl/dEP38yPgvotCyfcM9' },
  { t: 'Central de decorados', l1: 'Alameda Ricardo Paranhos, 946', l2: 'Setor Marista', l3: 'Goiânia - GO, 74175-020', fone: '(62) 3239-1999' },
  { t: 'Decorado B.Great Nova Suíça', l1: 'Av. Transbrasiliana c/ Rua Córdoba, 151', l2: 'Parque Amazônia', l3: 'Goiânia - GO, 74835-300', fone: '(62) 3239-1999' },
  { t: 'Decorado Praça 232', l1: 'Rua C-237, 156', l2: 'Jardim América', l3: 'Goiânia - GO, 74290-140', fone: '(62) 3638-1628' },
];

// ---------- empreendimentos (ordem da home do site atual) ----------
const EMP = [
  {
    slug: 'vox-home', nome: 'Vox Home', status: 'Pronto para morar', bairro: 'Jardim América', chamada: 'A 2 quadras do Goiânia Shopping',
    ficha: [['Área', '130 m²'], ['Quartos', '3 suítes'], ['Vagas', '2 vagas']],
    texto: ['Um olhar atento não basta. As mudanças do hoje gritam. E foi ouvindo diferentes vozes, gerações, estilos, rotinas e expressões, que a Bambuí criou um projeto que é mais que conceito, é a voz do nosso tempo.', 'Apartamentos de 3 suítes, a três quadras do Parque Vaca Brava.'],
    local: ['Pra começo de conversa, uma localização plural.', 'Não é por acaso que o Vox Home está localizado a 2 quadras do Goiânia Shopping. A escolha deste endereço faz todo sentido para aqueles que realmente desejam desfrutar a pluralidade de opções e formas de viver em uma das regiões mais expressivas de Goiânia.'],
    end: 'R. C-238, Q. 541, Jardim América, Goiânia - GO, 74290-150', video: 'zoXKp2-ow5I',
    obra: { quando: 'Pronto para morar', etapas: [['Escavação', 100], ['Projeto', 100], ['Fundação', 100], ['Estrutura', 100], ['Alvenaria', 100], ['Instalações', 100], ['Paisagismo', 100], ['Acabamento', 100]], total: 100 },
    capa: 'vox-2', fotos: [['vox-2', 'Fachada do Vox Home ao entardecer'], ['vox-1', 'Piscina do Vox Home com vista para a cidade'], ['vox-3', 'Living integrado com cozinha'], ['vox-4', 'Suíte master'], ['vox-5', 'Espaço gourmet'], ['vox-6', 'Pub do condomínio']], planta: ['vox-p', 'Planta do apartamento de 3 suítes'],
  },
  {
    slug: 'areiao-1141', nome: 'Areião 1141', status: 'Breve lançamento', bairro: 'Setor Marista', chamada: 'Na Rua 1141, perto do Parque Areião',
    ficha: [['Área', '78 e 115 m²'], ['Quartos', '2 e 3 suítes']],
    texto: ['Pleno de sentido. Conheça o Areião 1141: metragens raras no Marista, com lazer pensado para impressionar em cada detalhe.'],
    local: ['More na Rua 1141. Tranquila, residencial e arborizada.', 'A 1 minuto da Ricardo Paranhos e a 2 minutos do Parque Areião.'],
    end: 'Rua 1141, Qd. 253, Lt. 38/40, Setor Marista, Goiânia - GO, 74180-081', video: 'KSkxNa-bZ-A',
    capa: 'areiao-1', fotos: [['areiao-1', 'Torre do Areião 1141 ao pôr do sol'], ['areiao-2', 'Acesso social com paisagismo'], ['areiao-3', 'Sala do decorado de 115 m²'], ['areiao-4', 'Suíte master do decorado de 115 m²'], ['areiao-5', 'Piscina com vista para a cidade'], ['areiao-6', 'Rooftop']], planta: ['areiao-p', 'Planta do pavimento tipo'],
  },
  {
    slug: 'praca-232', nome: 'Praça 232', status: 'Obra iniciada', bairro: 'Jardim América', chamada: 'Vista definitiva para a Praça C-232',
    ficha: [['Área', '151 e 157 m²'], ['Quartos', '3 suítes']],
    texto: ['O novo aparece em cada uma das escolhas, do paisagismo aos detalhes do apartamento decorado.', 'Um projeto singular, com vista definitiva para a Praça C-232.'],
    local: ['Experiências que somente uma praça pode oferecer.', 'Nos arredores do Parque Vaca Brava, a 5 minutos do Goiânia Shopping, com vista definitiva para a Praça C-232. Visite o decorado.'],
    end: 'R. C-237, 156, Jardim América, Goiânia - GO, 74290-140', video: 'AZHohU3P7jc',
    obra: { quando: 'Atualizado em outubro de 2026', etapas: [['Escavação', 100], ['Projeto', 90], ['Fundação', 100], ['Estrutura', 69], ['Alvenaria', 32.5], ['Instalações', 15.47], ['Acabamento', 2.95]], total: 36.52 },
    capa: 'praca-1', fotos: [['praca-1', 'Fachada do Praça 232'], ['praca-2', 'Embasamento com palmeiras'], ['praca-3', 'Cozinha integrada do apartamento'], ['praca-4', 'Piscina com vista para a cidade'], ['praca-5', 'Salão de festas'], ['praca-6', 'Adega do condomínio']], planta: ['praca-p', 'Planta do apartamento tipo 1'],
  },
  {
    slug: 'marista-262', nome: 'Marista 262', status: 'Obra iniciada', bairro: 'Setor Marista', chamada: 'A 200 m da Ricardo Paranhos',
    ficha: [['Área', '118 a 252 m²'], ['Quartos', '3 e 4 suítes']],
    texto: ['Arquitetura impressionante, projetada no detalhe.', 'O Marista 262 privilegia o design brasileiro em seus mobiliários e acabamentos.'],
    local: ['Uma composição privilegiada de localização, arquitetura e experiência.', 'A 200 metros da Ricardo Paranhos e do Parque Areião.'],
    end: 'R. 1143, Q. 262, 481, St. Marista, Goiânia - GO, 74180-200',
    obra: { quando: 'Atualizado em outubro de 2026', etapas: [['Escavação', 100], ['Projeto', 87], ['Fundação', 62], ['Estrutura', 0.6]], total: 6.15 },
    capa: 'm262-1', fotos: [['m262-1', 'Fachada do Marista 262 entre as árvores'], ['m262-2', 'Living com varanda'], ['m262-3', 'Varanda gourmet'], ['m262-4', 'Piscina com paisagismo'], ['m262-5', 'Suíte master'], ['m262-6', 'After lounge']], planta: ['m262-p', 'Planta do apartamento de 3 suítes'],
  },
  {
    slug: 'b-great-bosque-dos-buritis', nome: 'B.Great Bosque dos Buritis', status: 'Pronto para morar', bairro: 'Setor Central', chamada: 'A 300 m do Bosque dos Buritis',
    ficha: [['Área', '57, 78 e 94 m²'], ['Quartos', '1, 2 e 3 suítes'], ['Vagas', '1 ou 2 vagas']],
    texto: ['O segundo empreendimento da linha B.Great, de apartamentos práticos da Bambuí, depois do sucesso do B.Great Nova Suíça.', 'Localização valorizada, próxima de tudo e com fácil acesso, a apenas 300 metros do Bosque dos Buritis e a 160 metros do Colégio Salesiano Ateneu Dom Bosco. Apartamentos de 1, 2 ou 3 suítes, com plantas de 57, 78 e 94 m². Serviços e conveniências que facilitam o dia a dia.'],
    local: ['Você no centro de tudo.', 'Uma região com grande oferta de serviços e conveniência. A 300 m do Bosque dos Buritis e a 160 m do Colégio Ateneu Dom Bosco.'],
    end: 'Rua 29 c/ Rua 31, Qd. 83, Lt. 20-1, 24 e 26, nº 162, Setor Central, Goiânia - GO', video: 'kHORoJEfuGw',
    obra: { quando: 'Agosto de 2026', etapas: [['Escavação', 100], ['Projeto', 95], ['Fundação', 100], ['Estrutura', 100], ['Alvenaria', 100], ['Instalações', 99], ['Paisagismo', 100], ['Acabamento', 98]], total: 99.71 },
    capa: 'bosque-1', fotos: [['bosque-1', 'Torre do B.Great Bosque dos Buritis'], ['bosque-2', 'Espaço gourmet do condomínio'], ['bosque-4', 'Varanda do apartamento decorado'], ['bosque-5', 'Piscina com jardim'], ['bosque-6', 'Brinquedoteca'], ['bosque-3', 'Sala do apartamento decorado']], planta: ['bosque-p', 'Implantação do lazer'],
  },
  {
    slug: 'b-great-nova-suica', nome: 'B.Great Nova Suíça', status: 'Pronto para morar', bairro: 'Parque Amazônia', chamada: 'Aos pés do Nova Suíça',
    ficha: [['Área', '74 a 90 m²'], ['Quartos', '2 e 3 suítes'], ['Vagas', '1 e 2 vagas']],
    texto: ['Com uma localização estratégica e valorizada, a Bambuí e a Trinus trazem um empreendimento feito para você viver uma vida mais fluida e moderna.', 'Apartamentos práticos, modernos e funcionais, de 2 e 3 suítes, com plantas entre 74 e 90 m². Na região mais prática de Goiânia, aos pés do Nova Suíça e a 3 minutos do Parque Vaca Brava, com serviços que resolvem o dia a dia no próprio condomínio e 2.000 m² de lazer.'],
    local: ['Aos pés do Nova Suíça.', 'Localização prática e com alto potencial de valorização. Acesso fácil por grandes avenidas, cercado por serviços de conveniência e perto dos bares e restaurantes da cidade.'],
    end: 'Av. Transbrasiliana esq. c/ R. Córdoba, Parque Amazônia, Goiânia - GO, 74835-300', video: '9YVXXtGR4zs',
    capa: 'suica-1', fotos: [['suica-1', 'Torres do B.Great Nova Suíça'], ['suica-2', 'Área de lazer com playground'], ['suica-3', 'Piscina entre as torres'], ['suica-4', 'Living do apartamento decorado'], ['suica-5', 'Sala de jantar e cozinha'], ['suica-6', 'Lavabo']], planta: ['suica-p', 'Implantação do lazer'],
  },
  {
    slug: 'ares-marista', nome: 'Ares Marista', status: 'Pronto para morar', bairro: 'Setor Marista', chamada: 'Vista total para o Parque Areião',
    ficha: [['Área', '172 a 356 m²'], ['Quartos', '3 e 4 suítes'], ['Vagas', '2 a 4 vagas']],
    texto: ['O Ares Marista não tem apenas uma localização perfeita. O design ousado, de linhas leves e alinhamento incomum, aproveita o melhor que a sua posição oferece: ventilação, luz solar e vista total para o Parque Areião de todos os apartamentos.', 'Dentro e fora, ele é ideal para receber esta versão mais leve de você, de viver sua família. Conheça, explore, sonhe e descubra sua geometria. Nela, o vento e tudo mais sopram a seu favor.'],
    local: ['Na área mais nobre do Marista.', 'No bairro mais desejado de Goiânia. Área arborizada, próxima de vários shoppings, restaurantes, escolas e parques.'],
    end: 'Rua 1141, St. Marista, Goiânia - GO, 74180-081', video: 'wjABAOl2QUs',
    capa: 'ares-2', fotos: [['ares-2', 'Fachada do Ares Marista'], ['ares-1', 'Ares Marista visto do alto, entre as torres do Marista'], ['ares-3', 'Cozinha com móveis planejados verdes'], ['ares-4', 'Quarto do apartamento decorado'], ['ares-5', 'Salão de festas'], ['ares-6', 'Brinquedoteca']], planta: ['ares-p', 'Plantas dos apartamentos de 3 suítes'],
  },
];
const prontos = EMP.filter(e => e.status === 'Pronto para morar');
const emObra = EMP.filter(e => e.obra && e.obra.total < 100);

const portfolio = [
  ['Inspirare Spa Residence', 'port-Inspirare-Bambui'], ['Palco Vaca Brava', 'port-Palco-Vaca-Brava-Bambui'], ['Campus Life', 'port-Campus-life'],
  ['Vistta Lago das Rosas', 'port-Vistta-Lago-das-Rosas'], ['Like Bueno', 'port-Like-Bueno'], ['Vistta Parque Flamboyant', 'port-Residencial-Vistta-Parq.-Flam'],
  ['Incanto Viver', 'port-Incanto-Viver-Bueno'], ['Easy Life', 'port-Easy-Life'], ['La Musique Resort Residence', 'port-La-musique'],
  ['Mirante Bueno', 'port-Mirante-Bueno'], ['Oásis Bueno', 'port-Oasis-Bueno'], ['Residencial Mediterrâneo', 'port-Res.-Mediterraneo'],
  ['Solar Universitário', 'port-Solar-Uni'], ['Residencial Tayamã', 'port-Tayama'], ['Residencial Barravento', 'port-Barra-Vento'],
  ['Residencial Jangadeiro', 'port-Res.-jangadeiro'], ['Residencial Canoeiros', 'port-Canoeiros'], ['Residencial Serramar', 'port-Serramar'],
  ['Residencial Buena Vista', 'port-Buena-Vista'], ['Residencial Arapoema', 'port-Res.-ARAPOEMA'], ["Residencial Solar D'Aldeia", 'port-solar-d-aldeia'],
  ['Residencial Renascença', 'port-Renascenca'],
];
const manifesto = [
  'Aqui, há sempre um olhar para o novo. Que vê no conhecimento, no design e na tecnologia, o centro da construção. E na sinergia com o nosso tempo, uma solução.',
  'Nosso olhar está nos detalhes, nos espaços, determinando a nossa essência. Tão elegante quanto despretensiosa. Tão simples quanto inteligente.',
  'Mais que criação, o nosso novo é sobre transformação. Um encontro com o inesperado consolidando sensações. Um lugar onde queremos estar, tão novo quanto familiar.',
  'Há um novo se desenhando sempre por aqui, cheio de inquietude e querer. E se a cada segundo tivermos a chance de construir esse novo melhor lugar, é aí que queremos estar.',
];
const frentes = [
  { t: 'Incorporação', n: '+30', d: 'empreendimentos lançados', l: ['Certificações PBQP-H e ISO 9001', 'Auditoria anual Ernst & Young'] },
  { t: 'Revenda de imóveis', n: '+1,8 mil', d: 'imóveis comercializados', l: ['Venda e aluguel de imóveis prontos', 'Anuncie o seu com a Bambuí'] },
  { t: 'Móveis planejados', n: '05', d: 'anos de garantia', l: ['Design moderno e sofisticado', 'Do projeto à montagem'] },
];
const moveis = [
  ['mov-1', 'Cozinha com ilha e bancada em pedra'], ['mov-3', 'Sala com painel de madeira e adega'], ['mov-7', 'Canto alemão com adega envidraçada'],
  ['mov-2', 'Quarto com closet de vidro'], ['mov-4', 'Cozinha linear com adega'], ['mov-6', 'Quarto de casal com cabeceira em madeira'],
  ['mov-8', 'Quarto com escrivaninha'], ['mov-9', 'Closet com penteadeira'], ['mov-5', 'Banheiro com gabinete suspenso'],
];
const revenda = { cod: '53083362', nome: 'Residencial Buena Vista', end: 'T-44, Qd. 18, Lt. 3/4, apto 1104, Setor Bueno', preco: 'R$ 600.000,00', cond: 'R$ 1.267,00', ficha: ['110 m²', '3 quartos', '1 suíte', '2 vagas'], foto: 'revenda-1' };

const nav = [{ slug: 'empreendimentos', nome: 'Empreendimentos' }, { slug: 'a-bambui', nome: 'A Bambuí' }, { slug: 'moveis-planejados', nome: 'Móveis planejados' }, { slug: 'imoveis', nome: 'Comprar e anunciar' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Varanda', b: 'Singular' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Mulish:wght@400;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@200;300;500;600&family=Instrument+Sans:wght@400;500;600&display=swap',
};
const cores = { a: '#323826', b: '#262b1d' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Bambuí | Incorporadora em Goiânia: lançamentos e prontos para morar' : `${titulo} | Bambuí`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });

const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n}.webp" width="${TAM[n][0]}" height="${TAM[n][1]}" alt="${esc(alt)}"${extra}>`;
const marca = (v, claro, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Bambuí, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="520" height="176" alt="Bambuí, singular"></${tag}>`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const pct = n => `${String(n).replace('.', ',')}%`;
const fichaTxt = e => e.ficha.map(f => f[1]).join(' · ');
const waEmp = e => waHref(E.wa, `Olá! Vi o ${e.nome} no site da Bambuí e quero receber mais informações.`);

function topo(v, s) {
  const claro = v === 'b';
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, claro)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-portal" href="${E.portal}" target="_blank" rel="noopener">${ic('usuarios')}<span>Portal do cliente</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-topo">
    <div class="rod-marca">${marca(v, true, 'div')}<p>${E.sobre}</p>
      <ul class="redes">${redes.map(r => `<li><a href="${r[2]}" target="_blank" rel="noopener" aria-label="${r[1]}">${ic(r[0])}</a></li>`).join('')}<li><a href="${waHref(E.wa, 'Olá, visitei o site da Bambuí e gostaria de mais informações.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a></li></ul></div>
    <div><h3>Empreendimentos</h3><ul>${EMP.map(e => `<li><a href="${link(v, `empreendimentos/${e.slug}`)}">${e.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Bambuí</h3><ul><li><a href="${link(v, 'a-bambui')}">A Bambuí</a></li><li><a href="${link(v, 'moveis-planejados')}">Móveis planejados</a></li><li><a href="${link(v, 'imoveis')}">Comprar e anunciar</a></li><li><a href="${link(v, 'contato')}">Contato</a></li><li><a href="${E.portal}" target="_blank" rel="noopener">Portal do cliente</a></li></ul></div>
  </div>
  <div class="in rod-end">${enderecos.map(l => `<div><h3>${l.t}</h3><p>${l.l1}<br>${l.l2}<br>${l.l3}</p><a class="rod-fone" href="${telHref(l.fone)}">${ic('tel')}${l.fone}</a></div>`).join('')}</div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Bambuí Empreendimentos Ltda · CNPJ ${E.cnpj}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const sKey = e => e.status === 'Pronto para morar' ? 'pronto' : e.status === 'Obra iniciada' ? 'obra' : 'breve';
const cartao = (v, e) => `<li class="emp sobe" data-s="${sKey(e)}"><a href="${link(v, `empreendimentos/${e.slug}`)}">
  <figure>${foto(e.capa, `${e.nome}, ${e.bairro}`)}<span class="selo selo-${sKey(e)}">${e.status}</span></figure>
  <div class="emp-txt"><p class="emp-bairro">${e.bairro}</p><h3>${e.nome}</h3><p class="emp-chamada">${e.chamada}</p><p class="emp-ficha">${fichaTxt(e)}</p></div></a></li>`;
const barras = (o, curto = false) => `<div class="obra"><div class="obra-cab"><p class="obra-total"><b>${pct(o.total)}</b><span>concluído</span></p><p class="obra-data">${o.quando}</p></div>
  <ul class="obra-etapas">${(curto ? o.etapas.filter((x, n) => x[1] < 100 || n === o.etapas.findIndex(y => y[1] === 100)) : o.etapas).map(x => `<li><span>${x[0]}</span><span class="barra" style="--p:${x[1]}%"><i></i></span><b>${pct(x[1])}</b></li>`).join('')}</ul></div>`;
const formulario = (msg, opcoes, extra = '') => `<form class="form" data-wa="${esc(msg)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  ${opcoes ? `<label>Assunto<select name="assunto">${opcoes.map(o => `<option>${o}</option>`).join('')}</select></label>` : ''}${extra}
  <label>Mensagem<textarea name="mensagem" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = q => `<iframe class="mapa" title="Mapa: ${esc(q)}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed"></iframe>`;
const video = (e, nFoto) => e.video ? `<a class="video" href="https://www.youtube.com/watch?v=${e.video}" target="_blank" rel="noopener">${foto(e.fotos[nFoto][0], `Vídeo do ${e.nome}`)}<span class="video-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span><span class="video-txt">Assista ao vídeo do ${e.nome}</span></a>` : '';

function ficha(v, e, cab) {
  const s = `empreendimentos/${e.slug}`;
  const g = e.fotos.slice(1);
  return head(v, s, e.nome, `${e.nome}, ${e.bairro}, Goiânia: ${e.status.toLowerCase()}. ${fichaTxt(e)}. ${e.texto[0]}`) + topo(v, 'empreendimentos') + cab(e) + `
<div class="in emp-pag">
  <section class="emp-sobre">
    <div class="emp-desc"><p class="k">${e.status} · ${e.bairro}</p>${e.texto.map((p, n) => `<p${n ? '' : ' class="lead"'}>${esc(p)}</p>`).join('')}</div>
    <aside class="emp-box"><dl>${e.ficha.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}<div><dt>Bairro</dt><dd>${e.bairro}</dd></div></dl>
      <a class="btn" href="${waEmp(e)}" target="_blank" rel="noopener">${icWa()}Falar com um corretor</a>
      <a class="btn btn-linha" href="${telHref('(62) 3239-1999')}">${ic('tel')}(62) 3239-1999</a></aside>
  </section>
  <section class="emp-galeria"><header class="tit"><p class="k">Galeria</p><h2>Fachada, apartamento e lazer</h2></header>
    <div class="galeria">${g.map((f, n) => `<a href="/assets/img/${f[0]}.webp" data-foto="${esc(f[1])}" class="g${n}">${foto(f[0], f[1])}</a>`).join('')}</div>
  </section>
  <section class="emp-planta"><div><p class="k">Planta</p><h2>${esc(e.planta[1])}</h2><p>As plantas completas, com todas as opções de metragem, estão no caderno do empreendimento. Peça o seu a um corretor.</p><a class="link-seta" href="${waEmp(e)}" target="_blank" rel="noopener">Pedir o caderno de plantas ${ic('seta')}</a></div>
    <a class="planta" href="/assets/img/${e.planta[0]}.webp" data-foto="${esc(e.planta[1])}">${foto(e.planta[0], e.planta[1])}</a></section>
  ${e.obra ? `<section class="emp-obra"><header class="tit"><p class="k">Acompanhamento da obra</p><h2>${e.obra.total === 100 ? 'Obra concluída' : 'Em que pé está a obra'}</h2></header>${barras(e.obra)}</section>` : ''}
  <section class="emp-local"><div><p class="k">Localização</p><h2>${esc(e.local[0])}</h2>${e.local.slice(1).map(p => `<p>${esc(p)}</p>`).join('')}<p class="emp-end">${ic('pin')}<span>${esc(e.end)}</span></p>${video(e, 2)}</div>${mapa(e.end)}</section>
  <section class="emp-form"><div><p class="k">Cadastre-se</p><h2>Receba condições exclusivas do ${e.nome}</h2><p>Deixe seu nome e telefone. Um corretor da Bambuí responde pelo WhatsApp.</p></div>${formulario(`Olá! Quero receber as condições do ${e.nome}.`, null)}</section>
  <nav class="emp-outros" aria-label="Outros empreendimentos"><p class="k">Outros empreendimentos</p><ul>${EMP.filter(x => x !== e).map(x => `<li><a href="${link(v, `empreendimentos/${x.slug}`)}">${x.nome}<small>${x.status}</small></a></li>`).join('')}</ul></nav>
</div>
` + rodape(v);
}

function comum(v, pag, cab, cabEmp) {
  pag.empreendimentos = head(v, 'empreendimentos', 'Empreendimentos', `Lançamentos e prontos para morar da Bambuí em Goiânia: ${EMP.map(e => e.nome).join(', ')}.`) + topo(v, 'empreendimentos') + cab('Empreendimentos', 'Lançamentos e prontos para morar', `${EMP.length} empreendimentos no Setor Marista, Jardim América, Setor Central e Parque Amazônia. Visite os decorados.`) + `
<div class="in lista-emp">
  <fieldset class="filtro"><legend>Mostrar</legend>${[['todos', 'Todos', EMP.length], ['pronto', 'Prontos para morar', prontos.length], ['obra', 'Em obra', EMP.filter(e => e.status === 'Obra iniciada').length], ['breve', 'Breve lançamento', EMP.filter(e => e.status === 'Breve lançamento').length]].map((f, n) => `<label><input type="radio" name="f" value="${f[0]}"${n ? '' : ' checked'}><span>${f[1]} <small>${f[2]}</small></span></label>`).join('')}</fieldset>
  <ul class="emps">${EMP.map(e => cartao(v, e)).join('')}</ul>
  <section class="decorados"><header class="tit"><p class="k">Decorados</p><h2>Conheça os apartamentos pessoalmente</h2></header><ul class="ends">${enderecos.slice(1).map(l => `<li><h3>${l.t}</h3><p>${l.l1}, ${l.l2}<br>${l.l3}</p><a href="${telHref(l.fone)}">${ic('tel')}${l.fone}</a></li>`).join('')}</ul></section>
</div>
` + rodape(v);
  pag['a-bambui'] = head(v, 'a-bambui', 'A Bambuí', `${E.sobre} Mais de 30 empreendimentos lançados, certificações PBQP-H e ISO 9001.`) + topo(v, 'a-bambui') + cab('A Bambuí', 'Transformar é o nosso lugar_', E.sobre) + `
<div class="in">
  <section class="manifesto">${manifesto.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</section>
  <section class="frentes">${frentes.map(f => `<article class="frente sobe"><p class="k">${f.t}</p><p class="frente-n"><b>${f.n}</b><span>${f.d}</span></p><ul class="lista-check">${f.l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul></article>`).join('')}</section>
  <section class="portfolio"><header class="tit"><p class="k">Portfólio de incorporação</p><h2>Empreendimentos do portfólio da Bambuí em Goiânia</h2></header>
    <ul class="port">${portfolio.map(p => `<li><a href="/assets/img/${p[1]}.webp" data-foto="${esc(p[0])}">${foto(p[1], p[0])}<span>${p[0]}</span></a></li>`).join('')}</ul></section>
  <section class="cnpj"><p>Bambuí Empreendimentos Ltda · CNPJ ${E.cnpj} · Sede no Truver Corporate Center, Setor Bueno, Goiânia.</p></section>
</div>
` + rodape(v);
  pag['moveis-planejados'] = head(v, 'moveis-planejados', 'Móveis planejados', 'Bambuí Planejados: móveis planejados de alto padrão em Goiânia, com arquitetos do projeto à montagem e 5 anos de garantia.') + topo(v, 'moveis-planejados') + cab('Bambuí Planejados', 'Móveis planejados de alto padrão', 'Projetos personalizados para o seu estilo de vida, com tendências de design e acabamento de alto padrão e funcional.') + `
<div class="in">
  <section class="mov-intro"><p class="lead">A Bambuí Planejados conta com uma equipe de arquitetos e especialistas preparada para desenvolver projetos, desde a idealização à montagem.</p>
    <ul class="mov-amb">${['Salas', 'Cozinhas', 'Quartos', 'Home office', 'Banheiros'].map(x => `<li>${x}</li>`).join('')}</ul>
    <p class="frente-n"><b>05</b><span>anos de garantia</span></p></section>
  <section class="mov-galeria">${moveis.map((m, n) => `<a href="/assets/img/${m[0]}.webp" data-foto="${esc(m[1])}" class="m${n}">${foto(m[0], m[1])}</a>`).join('')}</section>
  <section class="emp-form"><div><p class="k">Orçamento</p><h2>Solicite seu orçamento</h2><p>Conte qual ambiente você quer planejar. Nossa equipe responde pelo WhatsApp.</p></div>${formulario('Olá! Quero um orçamento da Bambuí Planejados.', ['Cozinha', 'Sala', 'Quarto', 'Home office', 'Banheiro', 'Apartamento completo'])}</section>
</div>
` + rodape(v);
  pag.imoveis = head(v, 'imoveis', 'Comprar e anunciar', 'Revenda e aluguel de imóveis com a Bambuí em Goiânia: imóveis à venda e anúncio do seu imóvel.') + topo(v, 'imoveis') + cab('Revenda de imóveis', 'Comprar, vender ou alugar com a Bambuí', 'A Bambuí nasceu como imobiliária e já comercializou mais de 1,8 mil imóveis. Além dos lançamentos, vende e aluga imóveis prontos.') + `
<div class="in">
  <section class="revenda"><header class="tit"><p class="k">À venda agora</p><h2>Imóvel de revenda</h2></header>
    <article class="rev-card">${foto(revenda.foto, `${revenda.nome}, Setor Bueno`)}<div><p class="k">Venda · cód. ${revenda.cod}</p><h3>${revenda.nome}</h3><p>${ic('pin')}${revenda.end}</p><p class="emp-ficha">${revenda.ficha.join(' · ')}</p><p class="rev-preco"><b>${revenda.preco}</b><small>Condomínio ${revenda.cond}</small></p>
      <a class="btn" href="${waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${revenda.cod} (${revenda.nome}, Setor Bueno) que vi no site da Bambuí.`)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></div></article>
    <p class="nota">Veja também os <a href="${link(v, 'empreendimentos')}">${prontos.length} empreendimentos prontos para morar</a> da Bambuí.</p></section>
  <section class="emp-form"><div><p class="k">Anuncie seu imóvel</p><h2>Quer vender ou alugar o seu imóvel?</h2><p>Conte onde ele fica e o que você procura. A equipe de revenda da Bambuí entra em contato.</p></div>${formulario('Olá! Quero anunciar meu imóvel com a Bambuí.', ['Quero vender meu imóvel', 'Quero alugar meu imóvel'], '<label>Endereço ou bairro do imóvel<input name="imovel"></label>')}</section>
  <section class="portal-box"><div><p class="k">Já é cliente?</p><h2>Portal do cliente</h2><p>Quem já é cliente da incorporação Bambuí entra no portal com o próprio login.</p></div><a class="btn" href="${E.portal}" target="_blank" rel="noopener">${ic('usuarios')}Acessar o portal</a></section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Bambuí: sede (62) 3239-1919, central de decorados (62) 3239-1999. Truver Corporate Center, Setor Bueno, Goiânia.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Bambuí', 'Escolha o assunto e mande sua mensagem pelo WhatsApp, ou ligue para a sede e para os decorados.') + `
<div class="in">
  <section class="contato-pag"><div><h2>Como podemos te ajudar?</h2>${formulario('Olá! Vim pelo site da Bambuí.', ['Quero comprar um apartamento', 'Oferecer um terreno', 'Atendimento ao corretor', 'Atendimento ao fornecedor', 'Quero trabalhar na Bambuí', 'LGPD (proteção de dados)', 'Registrar reclamação, elogio ou sugestão'])}</div>
    <div><ul class="ends ends-1">${enderecos.map(l => `<li><h3>${l.t}</h3><p>${l.l1}<br>${l.l2}<br>${l.l3}</p><a href="${telHref(l.fone)}">${ic('tel')}${l.fone}</a>${l.mapa ? ` <a href="${l.mapa}" target="_blank" rel="noopener">${ic('pin')}Como chegar</a>` : ''}</li>`).join('')}</ul></div></section>
  <section class="mapas">${mapa('Truver Corporate Center, R. C-238, 481, Setor Bueno, Goiânia')}${mapa('Alameda Ricardo Paranhos, 946, Setor Marista, Goiânia')}</section>
</div>
` + rodape(v);
  for (const e of EMP) pag[`empreendimentos/${e.slug}`] = ficha(v, e, cabEmp);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const cabEmp = e => `<section class="emp-hero-a"><div class="in emp-hero-a-in"><div><p class="voltar"><a href="${link(v, 'empreendimentos')}">${ic('seta', 'ic vira')}Empreendimentos</a></p><span class="selo">${e.status}</span><h1>${e.nome}</h1><p class="emp-chamada">${e.chamada}</p><p class="emp-ficha">${fichaTxt(e)}</p></div><figure>${foto(e.capa, e.fotos[0][1], ' loading="eager" fetchpriority="high"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Incorporadora em Goiânia · há mais de 30 anos</p><h1>Uma varanda em que caibam mais amigos. <em>Uma janela por onde o sol entre todas as manhãs.</em></h1><p>${E.curto}</p>
    <p class="bts"><a class="btn" href="${link(v, 'empreendimentos')}">Ver empreendimentos</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá, visitei o site da Bambuí e gostaria de mais informações.')}" target="_blank" rel="noopener">${icWa()}Falar com um corretor</a></p></div>
  <div class="hero-a-fotos"><figure class="hf1">${foto('areiao-1', 'Torre do Areião 1141 ao pôr do sol, Setor Marista', ' loading="eager" fetchpriority="high"')}<figcaption>Areião 1141 · breve lançamento</figcaption></figure><figure class="hf2">${foto('m262-3', 'Varanda gourmet do Marista 262', ' loading="eager"')}</figure></div>
</div></section>
<section class="faixa-a"><div class="in"><ul>${frentes.map(f => `<li><b>${f.n}</b><span>${f.d}</span></li>`).join('')}<li><b>ISO 9001</b><span>e PBQP-H</span></li></ul></div></section>
<section class="in home-emps"><header class="tit tit-linha"><div><p class="k">Empreendimentos</p><h2>Do breve lançamento ao pronto para morar</h2></div><a class="link-seta" href="${link(v, 'empreendimentos')}">Ver todos ${ic('seta')}</a></header><ul class="emps">${EMP.map(e => cartao(v, e)).join('')}</ul></section>
<section class="obras-a"><div class="in"><header class="tit"><p class="k">Acompanhamento da obra</p><h2>Quem compra na planta acompanha cada etapa</h2><p>Percentuais publicados pela Bambuí na página de cada empreendimento.</p></header>
  <div class="obras-grade">${emObra.map(e => `<article class="obra-card"><a href="${link(v, `empreendimentos/${e.slug}`)}">${foto(e.capa, e.nome)}</a><div><h3><a href="${link(v, `empreendimentos/${e.slug}`)}">${e.nome}</a></h3>${barras(e.obra, true)}</div></article>`).join('')}</div></div></section>
<section class="in mov-a"><figure>${foto('mov-1', 'Cozinha planejada com ilha em pedra e banquetas')}</figure><div><p class="k">Bambuí Planejados</p><h2>Móveis planejados de alto padrão, do projeto à montagem</h2><p>Arquitetos e especialistas da Bambuí desenham salas, cozinhas, quartos, home offices e banheiros. Cinco anos de garantia.</p><a class="btn" href="${link(v, 'moveis-planejados')}">Conhecer e pedir orçamento</a></div></section>
<section class="portal-a"><div class="in portal-a-in"><div><p class="k">Portal do cliente</p><h2>Já é cliente? Acesse o portal do cliente.</h2></div><a class="btn" href="${E.portal}" target="_blank" rel="noopener">${ic('usuarios')}Acessar o portal</a></div></section>
<section class="in visite-a"><header class="tit"><p class="k">Visite</p><h2>Sede e decorados</h2></header><ul class="ends">${enderecos.map(l => `<li><h3>${l.t}</h3><p>${l.l1}<br>${l.l2}<br>${l.l3}</p><a href="${telHref(l.fone)}">${ic('tel')}${l.fone}</a></li>`).join('')}</ul></section>
` + rodape(v);
  comum(v, pag, cab, cabEmp);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const cabEmp = e => `<section class="emp-hero-b">${foto(e.capa, e.fotos[0][1], ' loading="eager" fetchpriority="high"')}<div class="in"><p class="voltar"><a href="${link(v, 'empreendimentos')}">${ic('seta', 'ic vira')}Empreendimentos</a></p><span class="selo">${e.status}</span><h1>${e.nome}</h1><p class="emp-chamada">${e.chamada} · ${e.bairro}</p></div></section>`;
  const linha = (e, n) => `<li class="lin sobe"><a href="${link(v, `empreendimentos/${e.slug}`)}"><figure>${foto(e.capa, `${e.nome}, ${e.bairro}`)}</figure><div class="lin-txt"><span class="lin-n">${String(n + 1).padStart(2, '0')}</span><span class="selo">${e.status}</span><h3>${e.nome}</h3><p>${e.chamada}</p><dl>${e.ficha.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}<div><dt>Bairro</dt><dd>${e.bairro}</dd></div></dl><span class="link-seta">Conhecer ${ic('seta')}</span></div></a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto('m262-1', 'Fachada do Marista 262 entre as árvores do Setor Marista', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Bambuí · Goiânia</p><h1>Transformar é o nosso lugar_</h1><p>${E.sobre}</p><p class="bts"><a class="btn" href="${link(v, 'empreendimentos')}">Empreendimentos</a><a class="btn btn-linha" href="${link(v, 'a-bambui')}">Conheça a Bambuí</a></p></div></section>
<section class="num-b"><div class="in"><ul>${frentes.map(f => `<li><b>${f.n}</b><span>${f.d}</span><small>${f.t}</small></li>`).join('')}</ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Empreendimentos</p><h2>${EMP.length} endereços em Goiânia</h2></div><a class="link-seta" href="${link(v, 'empreendimentos')}">Filtrar por status ${ic('seta')}</a></header><ol class="lins">${EMP.map(linha).join('')}</ol></section>
<section class="obras-b"><div class="in"><header class="tit"><p class="k">Obras em andamento</p><h2>Acompanhamento da obra</h2></header><div class="obras-grade">${emObra.map(e => `<article class="obra-card"><h3><a href="${link(v, `empreendimentos/${e.slug}`)}">${e.nome}</a></h3>${barras(e.obra)}</article>`).join('')}</div></div></section>
<section class="in port-b"><header class="tit tit-linha"><div><p class="k">Portfólio</p><h2>Mais de 30 empreendimentos lançados</h2></div><a class="link-seta" href="${link(v, 'a-bambui')}">Ver o portfólio ${ic('seta')}</a></header><ul class="port port-curto">${portfolio.slice(0, 8).map(p => `<li><a href="${link(v, 'a-bambui')}">${foto(p[1], p[0])}<span>${p[0]}</span></a></li>`).join('')}</ul></section>
<section class="mov-b">${foto('mov-7', 'Canto alemão planejado com adega envidraçada')}<div class="in"><div class="mov-b-box"><p class="k">Bambuí Planejados</p><h2>Móveis planejados com cinco anos de garantia</h2><p>Projetos personalizados, do desenho à montagem, para salas, cozinhas, quartos, home office e banheiros.</p><a class="btn" href="${link(v, 'moveis-planejados')}">Pedir orçamento</a></div></div></section>
<section class="in visite-b"><header class="tit"><p class="k">Visite</p><h2>Sede e decorados</h2></header><ul class="ends">${enderecos.map(l => `<li><h3>${l.t}</h3><p>${l.l1}<br>${l.l2}<br>${l.l3}</p><a href="${telHref(l.fone)}">${ic('tel')}${l.fone}</a></li>`).join('')}</ul></section>
` + rodape(v);
  comum(v, pag, cab, cabEmp);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Bambuí', artigo: 'da', url: E.url, lang: 'pt', cor: '#786947', fundo: '#262b1d', claro: '#f3efe6',
  fonteTitulo: 'Montserrat,system-ui,sans-serif', fonteTexto: 'Mulish,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + EMP.length, texto: 'Clara, no verde-oliva e no bronze da marca, abrindo com a frase da própria Bambuí sobre varandas e janelas.', pontos: [`Os ${EMP.length} empreendimentos com galeria, planta, mapa e vídeo`, 'Acompanhamento da obra em barras na home', 'Cadastro de interesse pelo WhatsApp em cada empreendimento'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + EMP.length, texto: 'Escura, com foto em tela cheia e os empreendimentos numerados em lista, com a ficha de cada um ao lado.', pontos: ['"Transformar é o nosso lugar_" na abertura', 'Portfólio de 22 prédios entregues', 'Móveis planejados com pedido de orçamento'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
