// Detector de texto genérico (sem IA). Confere o JSON da redação contra a ficha e o texto do site atual,
// seguindo o kit/checklist.md. Dá uma nota de 0 a 100 e a lista de problemas com o caminho de cada um,
// que a autocrítica usa para corrigir só o que precisa.

const CLICHES = ['soluções inovadoras', 'inovação', 'inovador', 'excelência', 'paixão', 'comprometimento', 'comprometidos com', 'referência no mercado',
  'referência em', 'líder de mercado', 'de ponta', 'alto padrão', 'qualidade e eficiência', 'atendimento personalizado', 'sua satisfação',
  'fazer a diferença', 'faz a diferença', 'parceiro ideal', 'know-how', 'sinergia', 'transformar', 'jornada', 'elevar', 'potencializar', 'descubra',
  'mergulhe', 'no coração de', 'cuidadosamente', 'sob medida para você', 'bem-vindo', 'bem-vinda', 'conheça nossa', 'conheça nosso',
  'tudo o que você precisa', 'e muito mais', 'nossa missão é', 'buscamos sempre', 'temos orgulho', 'o melhor para você', 'não perca',
  'soluções completas', 'compromisso com a qualidade', 'qualidade superior', 'tradição e qualidade', 'confiança e qualidade', 'clique aqui'];
const TITULOS_VAZIOS = ['nossos serviços', 'nossos produtos', 'sobre nós', 'quem somos', 'nossos diferenciais', 'diferenciais', 'por que nos escolher',
  'por que escolher', 'nossa empresa', 'a empresa', 'bem-vindo', 'bem-vindos', 'nossa história', 'nossa missão', 'missão, visão e valores',
  'serviços', 'produtos', 'soluções', 'nossas soluções', 'entre em contato', 'fale conosco', 'contato', 'saiba mais', 'conheça', 'galeria', 'clientes', 'parceiros'];
const BOTOES_VAZIOS = ['saiba mais', 'clique aqui', 'entre em contato', 'fale conosco', 'contato', 'ver mais', 'conheça'];
const PALAVRAS_COMUNS = new Set('a o e de da do das dos em no na nos nas para por com sem um uma uns umas ao aos que se sua seu suas seus mais muito como ltda sa s/a me eireli industria indústria comercio comércio empresa grupo brasil sao tem ser foi pela pelo nao ate sob ano anos'.split(' '));

const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const palavras = s => norm(s).split(/[^a-z0-9]+/).filter(p => p.length >= 3 && !PALAVRAS_COMUNS.has(p));
const numerosDe = s => (String(s || '').match(/\d[\d.,]*/g) || []).map(n => n.replace(/[.,]$/, '').replace(/\./g, '').replace(',', '.')).filter(n => n.length);

// Termos que ancoram o texto na empresa: nomes de produtos, linhas, serviços, cidades, marcas e o próprio nome.
export function ancoras(ficha) {
  const t = [];
  const e = ficha.empresa || {};
  t.push(e.nome, e.nome_curto, e.cidade, e.uf, e.segmento);
  for (const p of ficha.paginas || []) { t.push(p.rotulo, p.titulo); for (const i of p.itens || []) t.push(i.titulo); }
  for (const s of ficha.home || []) for (const i of s.itens || []) t.push(i.titulo);
  for (const c of ficha.clientes_marcas || []) t.push(c.nome);
  for (const d of ficha.diferenciais || []) t.push(d);
  return new Set(t.flatMap(palavras));
}

// Tudo o que vale como "fato conhecido": a ficha inteira e o texto do site atual.
export function textoFonte(ficha, captura) {
  const partes = [JSON.stringify(ficha)];
  if (captura) {
    const blocos = b => (b || []).map(x => x.t).join('\n');
    partes.push(blocos(captura.home?.blocos), ...(captura.paginas || []).map(p => blocos(p.blocos)));
    partes.push(JSON.stringify(captura.empresa || {}));
  }
  return partes.join('\n');
}

function* textos(site) {
  yield ['slogan', site.slogan];
  yield ['botao', site.botao];
  for (const [i, p] of (site.paginas || []).entries()) {
    const b = `paginas[${i}]`;
    yield [`${b}.chamada.sobretitulo`, p.chamada?.sobretitulo];
    yield [`${b}.chamada.titulo`, p.chamada?.titulo];
    yield [`${b}.chamada.subtitulo`, p.chamada?.subtitulo];
    for (const [j, s] of (p.secoes || []).entries()) {
      const bs = `${b}.secoes[${j}]`;
      for (const k of ['subtitulo', 'titulo', 'texto']) yield [`${bs}.${k}`, s[k]];
      for (const [k, it] of (s.itens || []).entries()) { yield [`${bs}.itens[${k}].titulo`, it.titulo]; yield [`${bs}.itens[${k}].texto`, it.texto]; }
    }
  }
}

const PESO = { inventado: 8, cliche: 4, vago: 3, titulo_vazio: 3, estrutura: 4, repeticao: 3, tamanho: 1, pontuacao: 2, botao: 3, foto: 2, menu: 4 };

export function avaliar(site, ficha, captura = null) {
  const fonte = norm(textoFonte(ficha, captura));
  const numerosFonte = new Set(numerosDe(textoFonte(ficha, captura)));
  const anc = ancoras(ficha);
  const problemas = [];
  const add = (regra, onde, texto) => problemas.push({ regra, onde, texto });

  for (const [onde, t] of textos(site)) {
    if (!t) continue;
    const n = norm(t);
    for (const c of CLICHES) if (n.includes(norm(c)) && !fonte.includes(norm(c))) add('cliche', onde, `"${c}" é clichê (não está no site atual): troque por um fato da ficha`);
    for (const num of numerosDe(t)) if (!numerosFonte.has(num) && !/(telefone|fone|whats)/.test(onde)) add('inventado', onde, `o número "${num}" não está na ficha nem no site atual`);
    if (/[!¡]/.test(t)) add('pontuacao', onde, 'tem exclamação');
    if (/\p{Extended_Pictographic}/u.test(t)) add('pontuacao', onde, 'tem emoji');
    if (/\?\s*$/.test(t) && !/faq|itens\[\d+\]\.titulo/.test(onde)) add('pontuacao', onde, 'pergunta retórica');
    const nPal = t.split(/\s+/).length;
    if (/itens\[\d+\]\.texto$/.test(onde) && nPal > 35) add('tamanho', onde, `texto de item com ${nPal} palavras (máx. 30)`);
    if (/\.texto$/.test(onde) && !/itens/.test(onde) && nPal > 90) add('tamanho', onde, `parágrafo com ${nPal} palavras`);
    if (/(\.titulo|chamada\.sobretitulo)$/.test(onde) && !/itens/.test(onde) && TITULOS_VAZIOS.some(v => norm(v) === norm(t).replace(/[.:]$/, '').trim())) add('titulo_vazio', onde, `"${t}" é rótulo vazio: diga o que é, com fato da ficha`);
  }

  if (BOTOES_VAZIOS.some(v => norm(v) === norm(site.botao).trim())) add('botao', 'botao', `botão "${site.botao}" não diz o que se pede`);

  const paginas = site.paginas || [];
  const home = paginas[0];
  if (home) {
    const ch = home.chamada || {};
    if (!palavras(`${ch.titulo} ${ch.subtitulo}`).some(p => anc.has(p))) add('vago', 'paginas[0].chamada.titulo', 'a chamada da home não cita produto, serviço, cidade ou marca da empresa');
    const tipos = (home.secoes || []).map(s => s.tipo);
    const distintos = new Set(tipos).size;
    if (tipos.length >= 4 && distintos < 4) add('estrutura', 'paginas[0].secoes', `a home usa só ${distintos} tipos de seção (${tipos.join(', ')}): varie`);
    if (tipos.filter(t => t === 'cards').length > 2) add('estrutura', 'paginas[0].secoes', 'mais de 2 seções de cards na home');
  }
  const fotosChamada = [];
  for (const [i, p] of paginas.entries()) {
    const secs = p.secoes || [];
    fotosChamada.push(p.chamada?.imagem);
    for (const [j, s] of secs.entries()) {
      const onde = `paginas[${i}].secoes[${j}]`;
      if (j && secs[j - 1].tipo === s.tipo) add('estrutura', onde, `mesmo tipo "${s.tipo}" da seção anterior`);
      if (j && s.imagem && secs[j - 1].imagem === s.imagem) add('foto', `${onde}.imagem`, 'mesma foto da seção anterior');
      const tituloSec = `${s.titulo} ${s.subtitulo} ${s.texto}`;
      if (!['cta', 'contato', 'faq'].includes(s.tipo) && !palavras(tituloSec + ' ' + (s.itens || []).map(x => x.titulo).join(' ')).some(p => anc.has(p)))
        add('vago', `${onde}.titulo`, 'seção sem nenhum produto, serviço, cidade ou marca da empresa');
      if (s.tipo === 'depoimentos' && !/depoiment|"cite"|disse|afirma/.test(fonte)) add('inventado', onde, 'depoimentos sem depoimento na ficha');
      if (s.tipo === 'numeros' && (s.itens || []).some(it => numerosDe(it.titulo).some(n => !numerosFonte.has(n)))) add('inventado', onde, 'número que não está na ficha');
      // Itens com a mesma primeira palavra ("Oferecemos...", "Contamos...") em mais da metade.
      const its = s.itens || [];
      if (its.length >= 3) {
        const aberturas = its.map(it => norm(it.texto).split(/\s+/)[0]).filter(a => a && a.length > 3);
        const conta = {}; for (const a of aberturas) conta[a] = (conta[a] || 0) + 1;
        const [maisComum, n] = Object.entries(conta).sort((a, b) => b[1] - a[1])[0] || [];
        if (n > its.length / 2 && n >= 3) add('repeticao', `${onde}.itens`, `${n} itens começam igual ("${maisComum}...")`);
        const titulos = its.map(it => norm(it.titulo));
        if (new Set(titulos).size < titulos.length) add('repeticao', `${onde}.itens`, 'itens com título repetido');
      }
    }
  }
  const usoFoto = {}; for (const f of fotosChamada.filter(Boolean)) usoFoto[f] = (usoFoto[f] || 0) + 1;
  for (const [f, n] of Object.entries(usoFoto)) if (n > 2) add('foto', 'paginas[*].chamada.imagem', `a foto ${f} é chamada de ${n} páginas`);

  // Estrutura fiel: páginas do menu atual.
  const menuAtual = (ficha.menu || []).filter(m => m.tipo !== 'inicio').map(m => norm(m.rotulo));
  const menuNovo = paginas.slice(1).map(p => norm(p.menu));
  const faltam = menuAtual.filter(m => m && !menuNovo.some(n => n.includes(m) || m.includes(n) || palavras(m).some(p => palavras(n).includes(p))));
  if (menuAtual.length && faltam.length > menuAtual.length / 3) add('menu', 'paginas', `faltam páginas do menu atual: ${faltam.join(', ')}`);

  const pontos = problemas.reduce((a, p) => a + (PESO[p.regra] || 2), 0);
  return { nota: Math.max(0, 100 - pontos), problemas };
}

export function resumo(r) {
  const por = {}; for (const p of r.problemas) por[p.regra] = (por[p.regra] || 0) + 1;
  return `nota ${r.nota}/100${r.problemas.length ? ' · ' + Object.entries(por).map(([k, v]) => `${v} ${k}`).join(', ') : ''}`;
}
