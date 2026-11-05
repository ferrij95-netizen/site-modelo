// Dermatolaser Estética, clínica de tratamentos a laser em Campinas/SP. Gera public/{a,b}/ e a página de escolha.
// node clientes/dermatolaser/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs dermatolaser http://www.dermatolaserestetica.com.br/)
// Textos: o site atual (WordPress de uma página só): a clínica, 10 tratamentos, 17 equipamentos, notícias e contato.
// Fotos: as da própria clínica (recepção, consultórios, salas), as dos equipamentos e as de tratamento do site.
// Logo: as bolhas azuis e verdes e "DERMATOLASER estética", redesenhados em vetor a partir do logo do site.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Dermatolaser Estética', url: 'https://dermatolaser.overtus.com.br/', antigo: 'http://www.dermatolaserestetica.com.br/',
  fone: '(19) 3255-6551', wa: '5519997952025', waVer: '(19) 99795-2025',
  rua: 'Av. José Bonifácio, 2.280', bairro: 'Jardim das Paineiras, Campinas/SP', q: 'Avenida José Bonifácio, 2280, Campinas',
  insta: 'https://www.instagram.com/dermatolaserestetica/', face: 'https://www.facebook.com/dermatolaserestetica/',
};
export const nomesVersao = { a: 'Bolhas', b: 'Marinho' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;800&family=Lato:wght@400;700&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#ffffff', b: '#0d2a47' };
const waMsg = (m = 'Olá! Vim pelo site e gostaria de agendar uma avaliação na Dermatolaser.') => waHref(E.wa, m);

const nav = [{ slug: 'a-clinica', nome: 'A clínica' }, { slug: 'tratamentos', nome: 'Tratamentos' }, { slug: 'equipamentos', nome: 'Equipamentos' }, { slug: 'noticias', nome: 'Notícias' }, { slug: 'contato', nome: 'Contato' }];
const curto = 'Clínica de estética e dermatologia em Campinas, com equipamentos próprios de alta tecnologia para tratamentos faciais e corporais.';
const sobre = [
  'A Clínica Dermatolaser Estética atua com equipamentos da mais alta tecnologia para tratamentos faciais e corporais.',
  'Os equipamentos pertencem à Clínica, facilitando assim os agendamentos, de acordo com a conveniência dos pacientes.',
  'Além disso, o fato de os aparelhos serem próprios permite revisão e manutenção constantes, propiciando maior confiança e qualidade nos procedimentos.',
];
const prof = 'Os profissionais da Clínica são capacitados e especializados, visando prestar atendimento qualificado.';
const melasma = 'A Dermatolaser Estética, em conjunto com a nossa dermatologista Dra. Christiana Blattner, desenvolveu um protocolo exclusivo no tratamento do melasma, para atingir todos os componentes da mancha: vascular, inflamatório e pigmentar, na mesma sessão.';

const tratamentos = [
  { id: 'cabelos', t: 'Cabelos', f: 't-cabelos', eq: ['bulge', 'led'], p: ['A queda de cabelos pode acometer homens e mulheres. Nas mulheres, os fios ficam cada vez mais finos e rarefeitos; nos homens, o problema pode aparecer mais cedo e de modo mais severo, por isso o tratamento precoce é fundamental.', 'Além de medicamentos e produtos tópicos, é possível usar a tecnologia a laser, que estimula o crescimento de forma não invasiva. A grande novidade é o Bulge Hair Restoration, que une LEDs, laser de baixa potência e radiofrequência microagulhada.'], l: ['Queda de cabelo', 'Alopecia areata e androgenética', 'Eflúvio telógeno pós-parto', 'Tratamento pós-implante'] },
  { id: 'depilacao', t: 'Depilação a laser', f: 't-depilacao', eq: ['zye', 'fotona', 'gentlelase'], p: ['O equipamento é de rápida aplicação e seguro. Durante o procedimento, um jato frio resfria a pele, o que o torna praticamente indolor.', 'O Zye ALX, padrão-ouro mundial em depilação, trata todos os tons de pele: o spot de safira resfria a pele até 4 °C, para uma depilação rápida, uniforme e sem risco de queimaduras. O Fotona é usado em pelos mais finos e claros e em pele negra.', 'É importante não estar bronzeado e evitar o sol por 15 dias antes e depois da aplicação.'] },
  { id: 'estrias', t: 'Estrias', f: 't-estrias', eq: ['vbeam', 'fraxel', 'fotona', 'co2'], p: ['As estrias aparecem em tons avermelhados e evoluem para o esbranquiçado. As brancas são uma espécie de cicatriz e são mais difíceis de tratar.', 'Contamos com vários equipamentos para este procedimento: o laser vascular Vbeam atua nos vasos e preserva o tecido em volta; o Fraxel melhora especialmente as estrias brancas; o Fotona e o CO2 Fracionado estimulam colágeno novo e deixam as linhas mais sutis.'] },
  { id: 'flacidez', t: 'Flacidez corporal', f: 't-flacidez', eq: ['fotona', 'velashape', 'onda', 'ultralift', 'liftera', 'unyque'], p: ['A flacidez da pele decorre da diminuição ou desorganização do colágeno com o passar dos anos.', 'Pode ser tratada com Fotona (Erbium e Yag), Velashape II (radiofrequência, infravermelho e massagem), Onda Coolwaves (micro-ondas que tratam gordura, celulite e flacidez ao mesmo tempo), Endolaser, Liftera-V e Unyque-Pro, indicado para abdômen, braços, glúteos e coxas.'] },
  { id: 'gordura', t: 'Gordura localizada e celulite', f: 't-gordura', eq: ['velashape', 'vanquish', 'onda', 'unyque'], p: ['Dispomos de vários aparelhos para tratar celulite, gordura localizada e flacidez. O Velashape II une radiofrequência, infravermelho e um rolamento que promove drenagem linfática.', 'O Vanquish, de radiofrequência multipolar, trata a gordura abdominal e o culote sem contato com a pele, em 4 sessões semanais. O Unyque-Pro reduz medidas, suaviza a celulite e ajuda no desconforto do lipedema.'] },
  { id: 'limpeza', t: 'Limpeza de pele', f: 'limpeza', eq: [], p: ['A limpeza de pele remove cravos, impurezas e células mortas, deixando a pele mais saudável e limpa.', 'Livre de impurezas, a pele absorve melhor os tratamentos e cremes do dia a dia. É indicada para todos os tipos de pele e deve ser feita por profissional capacitado.'] },
  { id: 'peeling-diamante', t: 'Peeling de diamante', f: 't-peeling-diamante', eq: [], p: ['Peelings superficiais sequenciais, indicados para qualquer tipo de pele: a descamação é leve, mas a sequência leva a um resultado efetivo, sem os efeitos indesejáveis dos peelings tradicionais.', 'Normalmente são 6 sessões, uma a cada 7 ou 15 dias, sem tirar o paciente da rotina.'] },
  { id: 'peeling-fenol', t: 'Peeling de fenol', f: 't-peeling-fenol', eq: [], p: ['Peeling químico que atua de maneira profunda: a solução de fenol e óleo de cróton penetra até a derme reticular e gera efeitos mais profundos.', 'É o melhor para excesso de pele nas pálpebras e rugas acima dos lábios, os "códigos de barra". Bem aplicado e bem acompanhado, é o padrão-ouro no tratamento de rugas finas e flacidez.'] },
  { id: 'tatuagem', t: 'Remoção de tatuagem', f: 't-tatuagem', eq: ['spectra', 'starwalker'], p: ['As tatuagens podem ser removidas com o laser Spectra, de forma segura, depois de uma avaliação na clínica.', 'O Fotona StarWalker gera pulsos de picossegundos de alta energia que alcançam pigmentos mais profundos, e tem o pulso Fractat, um laser frio que abre canais para eliminar o pigmento e estimula colágeno.'] },
  { id: 'rugas', t: 'Rugas e rejuvenescimento', f: 't-rejuvenescimento', eq: ['co2', 'fraxel', 'spectra', 'fotona', 'ultraformer', 'zye', 'vbeam'], p: ['No tratamento antienvelhecimento, buscamos melhorar as rugas e marcas de expressão, mas também o brilho, a textura e o fechamento dos poros.', 'Podemos usar CO2 Fracionado, Fraxel, Spectra, Fotona, Ultraformer III, Zye ALX e Vbeam, além de peelings, preenchimento, microagulhamento com radiofrequência e fios de sustentação, conforme a necessidade de cada pessoa.'] },
];
const equipamentos = [
  { id: 'starwalker', t: 'Fotona StarWalker', f: 'e-starwalker', d: 'Laser premiado em 2017 como a tecnologia mais inovadora do mundo, para melasma, tatuagens, lesões pigmentadas e acne. Quebra os pigmentos em partículas menores, com o pulso frio Fractat que diminui o efeito rebote.', l: ['Melasma', 'Tatuagens', 'Olheiras e rosácea', 'Cicatrizes de acne'] },
  { id: 'zye', t: 'Zye ALX', f: 'e-zye', d: 'Laser de alexandrite para todos os tons de pele, padrão-ouro em depilação, com resfriamento simultâneo até 4 °C. Trata também manchas, melasma, rugas, rosácea, vasinhos e poros dilatados.', l: ['Depilação', 'Manchas e melasma', 'Rosácea e vasinhos'] },
  { id: 'bulge', t: 'Bulge Hair Restoration', f: 'e-bulge', d: 'Reúne LEDs vermelho, amarelo e azul, laser de baixa potência e radiofrequência microagulhada para diagnosticar e tratar o couro cabeludo: grau de alopecia, densidade, espessura e lesões foliculares.', l: ['Queda de cabelo', 'Crescimento dos fios', 'Pós-implante'] },
  { id: 'fotona', t: 'Fotona (Erbium:YAG)', f: 'e-fotona', d: 'Duas tecnologias num só aparelho, para rejuvenescimento facial, prevenção de rugas e cicatrizes. Combate a flacidez facial e corporal e também é usado em tratamentos ginecológicos, como perda urinária e ressecamento vaginal.', l: ['Rejuvenescimento', 'Flacidez', 'Laser íntimo'] },
  { id: 'vbeam', t: 'Laser Vbeam', f: 'e-vbeam', d: 'Laser vascular de última geração, presente em poucos locais do país, para vasinhos do rosto e das pernas, estrias, hemangiomas e manchas vinho do porto. Pode ser aplicado em todas as idades, inclusive em bebês.', l: ['Vasinhos', 'Hemangiomas', 'Manchas vinho do porto'] },
  { id: 'spectra', t: 'Spectra Laser Toning', f: 'e-spectra', d: 'Laser Nd:YAG de baixa agressividade, projetado para atacar as células causadoras do melasma. Também elimina manchas, seca a acne ativa, remove tatuagens de todas as cores e suaviza olheiras.', l: ['Melasma', 'Acne ativa', 'Tatuagens'] },
  { id: 'onda', t: 'Onda Coolwaves', f: 'e-onda', d: 'Micro-ondas que tratam ao mesmo tempo gordura localizada, celulite e flacidez, remodelando a pele. Indolor, sem marcas e sem recuperação, em qualquer época do ano.', l: ['Gordura localizada', 'Celulite', 'Flacidez'] },
  { id: 'ultralift', t: 'Ultralift Duo (Endolaser)', f: 'e-ultralift', d: 'Laser de diodo de duplo comprimento de onda por microfibra ótica, minimamente invasivo, para lifting facial, efeito blefaroplastia e eliminação de gordura localizada no rosto e no corpo.', l: ['Lifting facial', 'Papada e pescoço', 'Gordura localizada'] },
  { id: 'ultraformer', t: 'Ultraformer III', f: 'e-ultraformer', d: 'Ultrassom micro e macrofocado: no rosto, produz colágeno com efeito lifting imediato; no corpo, melhora a flacidez e elimina gordura localizada. Praticamente indolor e sem marcas.', l: ['Lifting sem cirurgia', 'Contorno facial', 'Flacidez corporal'] },
  { id: 'liftera', t: 'Liftera-V', f: 'e-liftera', d: 'Ultrassom microfocado de alta intensidade com ponteiras em caneta para áreas delicadas: pálpebras, lábios, papada, sulco nasogeniano e contorno facial.', l: ['Pálpebras', 'Papada', 'Contorno facial'] },
  { id: 'unyque', t: 'Unyque-Pro', f: 'e-unyque', d: 'Tecnologia não invasiva para reduzir gordura localizada, suavizar a celulite e aliviar o desconforto do lipedema, com sessões rápidas e confortáveis.', l: ['Celulite', 'Lipedema', 'Firmeza da pele'] },
  { id: 'velashape', t: 'Velashape II', f: 'e-velashape', d: 'Radiofrequência para encolher a pele, infravermelho profundo para a gordura e massagem, tudo em um só equipamento: um dos melhores tratamentos corporais contra gordura localizada e celulite.', l: ['Celulite', 'Gordura localizada'] },
  { id: 'vanquish', t: 'Vanquish', f: 'e-vanquish', d: 'Radiofrequência multipolar que aquece o tecido adiposo sem contato com a pele, para a gordura abdominal e o culote, em 4 sessões com intervalos semanais.', l: ['Gordura abdominal', 'Culote'] },
  { id: 'fraxel', t: 'Fraxel', f: 'e-fraxel', d: 'Laser fracionado que estimula colágeno e elastina, para cicatrizes de acne, rugas, estrias e danos do sol na face, colo, mãos e pescoço.', l: ['Cicatrizes de acne', 'Estrias', 'Rugas'] },
  { id: 'led', t: 'Luz LED', f: 'e-led', d: 'Luzes azul, vermelha e infravermelha de baixa intensidade, que estimulam colágeno sem agredir a pele. Ajuda na acne, queda de cabelo, psoríase, herpes e na recuperação pós-laser.', l: ['Acne', 'Pós-laser', 'Cicatrização'] },
  { id: 'co2', t: 'CO2 Fracionado', f: '', d: 'Microfeixes de luz que alcançam a segunda camada da pele e formam ilhas saudáveis ao redor, para uma recuperação rápida. Indicado para cicatrizes de acne, rejuvenescimento, linhas finas, poros abertos e estrias.', l: ['Cicatrizes', 'Poros', 'Textura'] },
  { id: 'gentlelase', t: 'GentleLase', f: '', d: 'Laser para retirada de pelos, com resfriamento da pele de efeito anestésico, para um tratamento praticamente sem dor.', l: ['Depilação'] },
];
const eqNome = Object.fromEntries(equipamentos.map(e => [e.id, e.t]));
const noticias = [
  ['Skinbooster: o que é, para quem é indicado e quais são os benefícios para a pele?', 'skinbooster', '2026/10/29/skinbooster-o-que-e-para-quem-e-indicado-e-quais-sao-os-beneficios-para-a-pele/', 'Outubro de 2026'],
  ['Outubro Rosa: prevenção do câncer de mama, diagnóstico precoce e a importância de cuidar da saúde da mulher', 'n-outubro', '2026/10/23/outubro-rosa-prevencao-do-cancer-de-mama-diagnostico-precoce-e-a-importancia-de-cuidar-da-saude-da-mulher/', 'Outubro de 2026'],
  ['Megahair causa queda de cabelo? Conheça as complicações e os riscos para a saúde capilar', 'n-megahair', '2026/10/16/megahair-causa-queda-de-cabelo-conheca-as-complicacoes-e-os-riscos-para-a-saude-capilar/', 'Outubro de 2026'],
  ['Unha precisa respirar? Entenda o mito e como cuidar da saúde das unhas', 'n-unhas', '2026/10/09/unha-precisa-respirar-entenda-o-mito-e-como-cuidar-da-saude-das-unhas/', 'Outubro de 2026'],
  ['Toxina botulínica vai me deixar deformada? A verdade sobre o Botox', 'injecao', '2026/10/02/toxina-botulinica-vai-me-deixar-deformada-a-verdade-sobre-o-botox/', 'Outubro de 2026'],
  ['Filtro solar: você está usando do jeito certo?', 'n-filtro', '2026/09/25/filtro-solar-voce-esta-usando-do-jeito-certo/', 'Setembro de 2026'],
];
const maisNoticias = [
  ['Pele do idoso: por que ela fica tão fina e frágil?', '2026/09/18/pele-do-idoso-por-que-ela-fica-tao-fina-e-fragil/'],
  ['Unhas fracas: o que a dermatologista vai investigar?', '2026/09/11/unhas-fracas-o-que-a-dermatologista-vai-investigar/'],
  ['O dermatologista deve dizer NÃO ao paciente? Quando recusar um procedimento também é cuidar', '2026/09/04/o-dermatologista-deve-dizer-nao-ao-paciente-quando-recusar-um-procedimento-tambem-e-cuidar/'],
  ['Bromidrose: por que o suor pode ficar com cheiro forte?', '2026/08/28/bromidrose-por-que-o-suor-pode-ficar-com-cheiro-forte/'],
  ['As cicatrizes da cirurgia da face estão mudando de localização? Entenda por quê', '2026/08/21/as-cicatrizes-da-cirurgia-da-face-estao-mudando-de-localizacao-entenda-por-que/'],
  ['Homens estão procurando mais tratamentos estéticos e cirurgias? O novo perfil do homem que cuida da aparência', '2026/08/14/homens-estao-procurando-mais-tratamentos-esteticos-e-cirurgias-o-novo-perfil-do-homem-que-cuida-da-aparencia/'],
];
const fotosClinica = [['recepcao', 'Recepção'], ['recepcao-2', 'Recepção'], ['consultorio', 'Consultório'], ['consultorio-jardim', 'Consultório com jardim'], ['sala-maca', 'Sala de procedimentos'], ['sala-procedimentos', 'Sala de procedimentos'], ['sala-aparelhos', 'Sala de aparelhos'], ['sala-azul', 'Sala de tratamento'], ['sala-fotos', 'Sala de avaliação']];

const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Dermatolaser Estética | Laser e estética em Campinas' : `${titulo} | Dermatolaser Estética`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = claro => `<img class="logo" src="/assets/logo${claro ? '-clara' : ''}.svg" alt="Dermatolaser Estética" width="326" height="104">`;
const galeria = (lst = fotosClinica) => `<div class="galeria galeria-clinica">${lst.map(([f, a]) => `<a href="/assets/img/${f}.webp" data-caixa="clinica">${img(f, a)}</a>`).join('')}</div>`;
const mapa = () => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.q)}&z=16&output=embed"></iframe>`;
const chipsEq = (ids, v) => ids.length ? `<p class="usa">${ids.map(i => `<a href="${link(v, 'equipamentos')}#${i}">${eqNome[i]}</a>`).join('')}</p>` : '';
const cartaoEq = (e, v) => `<article class="eq sobe" id="${e.id}">${e.f ? `<figure>${img(e.f, e.t)}</figure>` : ''}<div><h3>${e.t}</h3><p>${e.d}</p><ul class="tags">${e.l.map(x => `<li>${x}</li>`).join('')}</ul></div></article>`;
const cartaoNoticia = ([t, f, u, d]) => `<a class="noticia sobe" href="${E.antigo}${u}" target="_blank" rel="noopener"><figure>${img(f, '')}</figure><span class="data">${d}</span><h3>${t}</h3><span class="link-seta">Ler no blog ${ic('seta')}</span></a>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${E.rua} · ${E.bairro}</span><span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Dermatolaser Estética, página inicial">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waMsg()}" target="_blank" rel="noopener">Agendar</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${marca(true)}<p>${curto}</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Dermatolaser Estética. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site e gostaria de agendar uma avaliação na Dermatolaser." id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Tratamento<select name="tratamento"><option>Avaliação</option>${tratamentos.map(p => `<option>${p.t}</option>`).join('')}<option>Melasma</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp da clínica. Se preferir, ligue: ${E.fone}.</p>
</form>`;

function comum(v, pag, cab, cta) {
  pag['a-clinica'] = head(v, 'a-clinica', 'A clínica', curto) + topo(v, 'a-clinica') + cab('A clínica', 'Equipamentos próprios, agenda do seu jeito', 'recepcao-2', 'Ciência, estética e beleza no Jardim das Paineiras, em Campinas.') + `
<div class="in"><section class="texto-pag"><div><p class="k">Quem somos</p><h2>Alta tecnologia para tratamentos faciais e corporais</h2>${sobre.map(p => `<p>${p}</p>`).join('')}<p>${prof}</p></div><aside class="caixa"><h3>Protocolo exclusivo para melasma</h3><p>${melasma}</p>${img('tratamento-rosto', 'Tratamento a laser no rosto')}</aside></section>
<section class="bloco"><header class="tit"><p class="k">Estrutura</p><h2>Conheça a clínica</h2></header>${galeria()}</section>
<section class="bloco por-que"><header class="tit"><p class="k">Por que a Dermatolaser</p><h2>O que muda quando os aparelhos são da clínica</h2></header><div class="motivos">
  <div class="sobe"><b>${equipamentos.length}</b><h3>Equipamentos próprios</h3><p>Lasers, ultrassons e radiofrequências da clínica, sem depender de aluguel.</p></div>
  <div class="sobe"><b>${ic('relogio')}</b><h3>Agenda conveniente</h3><p>Os horários são marcados conforme a conveniência do paciente.</p></div>
  <div class="sobe"><b>${ic('escudo')}</b><h3>Manutenção constante</h3><p>Revisão frequente dos aparelhos, com mais confiança e qualidade nos procedimentos.</p></div>
</div></section></div>
` + cta() + rodape(v);
  pag.noticias = head(v, 'noticias', 'Notícias', 'Artigos da Dermatolaser Estética sobre pele, cabelos, unhas e tratamentos estéticos.') + topo(v, 'noticias') + cab('Notícias', 'Blog da Dermatolaser', 'skinbooster', 'Artigos semanais sobre pele, cabelos, unhas e tratamentos.') + `
<div class="in"><section class="bloco"><div class="noticias">${noticias.map(cartaoNoticia).join('')}</div></section>
<section class="bloco"><header class="tit"><p class="k">Mais artigos</p><h2>Leia também</h2></header><ul class="mais-noticias">${maisNoticias.map(([t, u]) => `<li><a href="${E.antigo}${u}" target="_blank" rel="noopener">${t}${ic('seta')}</a></li>`).join('')}</ul></section></div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `${E.fone} · WhatsApp ${E.waVer}. ${E.rua}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Tire suas dúvidas e agende', 'consultorio-jardim', 'Fale com a gente pelo WhatsApp, pelo telefone ou pelo formulário.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie uma mensagem</h2>${formulario()}</div><div><ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.waVer}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">@dermatolaserestetica</a></div></li>
</ul>${mapa()}</div></section></div>
` + rodape(v);
}

// ---------- A: Bolhas (branco, as bolhas azuis e verdes do logo) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}<img class="cab-bolhas" src="/assets/simbolo.svg" alt="" width="100" height="110"></figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><img src="/assets/simbolo.svg" alt="" width="100" height="110"><div><h2>Agende sua avaliação</h2><p>Atendimento no Jardim das Paineiras, em Campinas.</p></div><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Laser e estética em Campinas</p><h1>Onde ciência, estética e beleza se encontram.</h1><p>Tratamentos faciais e corporais com ${equipamentos.length} equipamentos próprios de alta tecnologia, do laser StarWalker ao Ultraformer III.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar avaliação</a><a class="btn btn-linha" href="${link(v, 'tratamentos')}">Tratamentos</a></p></div>
<div class="hero-a-foto">${img('hero-mulher', 'Pele saudável', ' loading="eager" fetchpriority="high"')}<span class="b b1"></span><span class="b b2"></span><span class="b b3"></span><span class="b b4"></span></div></div></section>
<section class="in trat-a"><header class="tit tit-linha"><div><p class="k">Tratamentos</p><h2>Todos os tratamentos em um só lugar</h2></div><a class="link-seta" href="${link(v, 'tratamentos')}">Ver todos ${ic('seta')}</a></header><div class="trat-grade">${tratamentos.map(p => `<a class="trat sobe" href="${link(v, 'tratamentos')}#${p.id}"><figure>${img(p.f, p.t)}</figure><h3>${p.t}</h3></a>`).join('')}</div></section>
<section class="sobre-a"><div class="in sobre-a-in"><div class="mosaico">${img('recepcao', 'Recepção')}${img('consultorio', 'Consultório')}${img('sala-maca', 'Sala de procedimentos')}</div><div><p class="k">A clínica</p><h2>Os equipamentos são nossos. A agenda é sua.</h2>${sobre.slice(1).map(p => `<p>${p}</p>`).join('')}<a class="link-seta" href="${link(v, 'a-clinica')}">Conheça a clínica ${ic('seta')}</a></div></div></section>
<section class="in eq-a"><header class="tit tit-linha"><div><p class="k">Equipamentos</p><h2>Alta tecnologia para tratamentos faciais e corporais</h2></div><a class="link-seta" href="${link(v, 'equipamentos')}">Todos os ${equipamentos.length} ${ic('seta')}</a></header><div class="eq-faixa">${equipamentos.filter(e => e.f).slice(0, 6).map(e => `<a href="${link(v, 'equipamentos')}#${e.id}" class="sobe"><figure>${img(e.f, e.t)}</figure><span>${e.t}</span></a>`).join('')}</div></section>
<section class="melasma-a"><div class="in melasma-in"><div><p class="k">Exclusivo</p><h2>Protocolo para melasma com o Fotona StarWalker</h2><p>${melasma}</p><a class="btn" href="${waMsg('Olá! Vim pelo site e gostaria de saber sobre o protocolo para melasma da Dermatolaser.')}" target="_blank" rel="noopener">${icWa()}Quero saber mais</a></div><figure>${img('tratamento-rosto', 'Laser no rosto')}</figure></div></section>
<section class="in not-a"><header class="tit tit-linha"><div><p class="k">Notícias</p><h2>Do nosso blog</h2></div><a class="link-seta" href="${link(v, 'noticias')}">Todas ${ic('seta')}</a></header><div class="noticias">${noticias.slice(0, 3).map(cartaoNoticia).join('')}</div></section>
` + cta() + rodape(v);
  pag.tratamentos = head(v, 'tratamentos', 'Tratamentos', 'Cabelos, depilação a laser, estrias, flacidez, gordura localizada, celulite, peelings, remoção de tatuagem e rejuvenescimento em Campinas.') + topo(v, 'tratamentos') + cab('Tratamentos', 'Estéticos, corporais e faciais', 't-rejuvenescimento', 'A clínica tem o que existe de mais moderno para cada tratamento.') + `
<div class="in"><nav class="grupos-nav" aria-label="Tratamentos">${tratamentos.map(p => `<a href="#${p.id}">${p.t}</a>`).join('')}</nav><div class="procs-a">${tratamentos.map(p => `<article class="proc-a sobe" id="${p.id}"><figure>${img(p.f, p.t)}</figure><div><h3>${p.t}</h3>${p.p.map(x => `<p>${x}</p>`).join('')}${p.l ? lista(p.l) : ''}${chipsEq(p.eq, v)}<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e gostaria de saber mais sobre ${p.t.toLowerCase()} na Dermatolaser.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a></div></article>`).join('')}</div></div>
` + cta() + rodape(v);
  pag.equipamentos = head(v, 'equipamentos', 'Equipamentos', 'StarWalker, Zye ALX, Bulge Hair, Fotona, Vbeam, Spectra, Onda Coolwaves, Ultraformer III, Liftera-V e mais: os equipamentos da Dermatolaser.') + topo(v, 'equipamentos') + cab('Equipamentos', 'Tecnologia própria, revisada sempre', 'sala-aparelhos', `${equipamentos.length} equipamentos da clínica para tratamentos faciais e corporais.`) + `
<div class="in"><section class="bloco"><div class="eqs">${equipamentos.map(e => cartaoEq(e, v)).join('')}</div></section></div>
` + cta() + rodape(v);
  comum(v, pag, cab, cta);
  return pag;
}

// ---------- B: Marinho (o azul-escuro do site com o verde do logo) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><h2>Agende sua avaliação na Dermatolaser</h2><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a><a class="btn btn-linha-clara" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b">${img('tratamento-rosto', '', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Dermatolaser Estética · Campinas</p><h1>Tecnologia de ponta para a sua pele.</h1><p>Lasers, ultrassons e radiofrequências próprios, para tratar rosto, corpo e cabelos com segurança.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar avaliação</a><a class="btn btn-linha-clara" href="${link(v, 'equipamentos')}">Equipamentos</a></p></div></section>
<section class="faixa-b"><div class="in"><div><b>${equipamentos.length}</b><span>equipamentos próprios</span></div><div><b>${tratamentos.length}</b><span>áreas de tratamento</span></div><div><b>4 °C</b><span>resfriamento na depilação Zye ALX</span></div><div><b>Desde 2014</b><span>artigos no blog toda semana</span></div></div></section>
<section class="in eq-b"><header class="tit tit-linha"><div><p class="k">Equipamentos</p><h2>O que existe de mais moderno</h2></div><a class="link-seta" href="${link(v, 'equipamentos')}">Todos ${ic('seta')}</a></header><div class="eq-grade-b">${equipamentos.filter(e => e.f).slice(0, 8).map(e => `<a class="eq-b sobe" href="${link(v, 'equipamentos')}#${e.id}"><figure>${img(e.f, e.t)}</figure><h3>${e.t}</h3><p>${e.l.join(' · ')}</p></a>`).join('')}</div></section>
<section class="trat-b"><div class="in trat-b-in"><div><p class="k">Tratamentos</p><h2>Todos os tratamentos em um só lugar</h2><p>${prof}</p><a class="btn" href="${link(v, 'tratamentos')}">Ver tratamentos</a></div><ul class="trat-lista">${tratamentos.map((p, i) => `<li><a href="${link(v, 'tratamentos')}#${p.id}"><span class="num">${String(i + 1).padStart(2, '0')}</span>${p.t}${ic('seta')}</a></li>`).join('')}</ul></div></section>
<section class="in clinica-b"><header class="tit tit-linha"><div><p class="k">A clínica</p><h2>Estrutura no Jardim das Paineiras</h2></div><a class="link-seta" href="${link(v, 'a-clinica')}">Conheça ${ic('seta')}</a></header>${galeria(fotosClinica.slice(0, 6))}</section>
<section class="melasma-b"><div class="in melasma-in"><figure>${img('tratamento-rosto', 'Laser no rosto')}</figure><div><p class="k">Protocolo exclusivo</p><h2>Melasma tratado em todas as frentes</h2><p>${melasma}</p><a class="link-seta" href="${link(v, 'equipamentos')}#starwalker">Sobre o StarWalker ${ic('seta')}</a></div></div></section>
` + cta() + rodape(v);
  pag.tratamentos = head(v, 'tratamentos', 'Tratamentos', 'Cabelos, depilação a laser, estrias, flacidez, gordura localizada, celulite, peelings, remoção de tatuagem e rejuvenescimento em Campinas.') + topo(v, 'tratamentos') + cab('Tratamentos', 'Estéticos, corporais e faciais', 'avaliacao', 'Aparelhos de alta tecnologia e profissionais especializados.') + `
<div class="in"><div class="procs-b">${tratamentos.map((p, i) => `<article class="proc-b sobe${i % 2 ? ' inv' : ''}" id="${p.id}"><figure>${img(p.f, p.t)}</figure><div><span class="num">${String(i + 1).padStart(2, '0')}</span><h2>${p.t}</h2>${p.p.map(x => `<p>${x}</p>`).join('')}${p.l ? lista(p.l) : ''}${chipsEq(p.eq, v)}<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e gostaria de saber mais sobre ${p.t.toLowerCase()} na Dermatolaser.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a></div></article>`).join('')}</div></div>
` + cta() + rodape(v);
  pag.equipamentos = head(v, 'equipamentos', 'Equipamentos', 'StarWalker, Zye ALX, Bulge Hair, Fotona, Vbeam, Spectra, Onda Coolwaves, Ultraformer III, Liftera-V e mais: os equipamentos da Dermatolaser.') + topo(v, 'equipamentos') + cab('Equipamentos', 'Equipamentos de alta tecnologia', 'tratamento-rosto', 'Todos pertencem à clínica, com revisão e manutenção constantes.') + `
<div class="in"><section class="bloco"><div class="eqs eqs-b">${equipamentos.map(e => cartaoEq(e, v)).join('')}</div></section></div>
` + cta() + rodape(v);
  comum(v, pag, cab, cta);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comumCss + '\n' + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Dermatolaser Estética', artigo: 'da', url: E.url, lang: 'pt', cor: '#76a83c', fundo: '#0d2a47', claro: '#ffffff',
  fonteTitulo: 'Raleway,system-ui,sans-serif', fonteTexto: 'Lato,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com as bolhas azuis e verdes do logo e os tratamentos em destaque.', pontos: ['10 tratamentos com foto', 'Protocolo de melasma', 'Blog na página inicial'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'No azul-marinho do site atual, com os equipamentos em primeiro plano.', pontos: [`${equipamentos.length} equipamentos`, 'Fotos reais da clínica', 'Tratamentos alternados com foto'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
