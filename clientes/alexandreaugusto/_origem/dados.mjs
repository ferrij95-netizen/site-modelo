// Dados da Alexandre Augusto Imóveis, todos lidos do site atual (alexandreaugustoimoveis.com.br) em 21/10/2026.
// imoveis-site-atual.json: os 60 imóveis da home (detalhes-imovel.php?cod_imovel=N), com ficha, textos e fotos.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const brutos = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis-site-atual.json'), 'utf8'));

export const empresa = {
  nome: 'Alexandre Augusto Imóveis',
  curto: 'Alexandre Augusto',
  url: 'https://alexandreaugusto.overtus.com.br/',
  antigo: 'http://www.alexandreaugustoimoveis.com.br/',
  slogan: 'Os melhores imóveis estão aqui!',
  especialidade: 'Especializado no Ipiranga',
  creci: '112961',
  rua: 'Rua Clemente Pereira, 129',
  bairro: 'Ipiranga',
  cidade: 'São Paulo',
  endereco: 'Rua Clemente Pereira, 129 · Ipiranga · São Paulo',
  tel: '(11) 2337-9941',
  telHref: '+551123379941',
  cel: '(11) 95203-0378',
  whats: '5511952030378',
  email: 'contato@alexandreaugustoimoveis.com.br',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Clemente+Pereira+129+Ipiranga+S%C3%A3o+Paulo',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Clemente+Pereira,+129+-+Ipiranga,+S%C3%A3o+Paulo+-+SP&output=embed',
  // Página "Empresa" do site atual, como está escrita lá.
  sobre: 'Com uma vasta experiência no ramo imobiliário, atuamos há mais de 17 anos na região do Ipiranga. Contamos com uma equipe altamente qualificada para atendê-los com total cordialidade e competência. Temos opções exclusivas de imóveis para venda e locação, inclusive no alto padrão. Teremos prazer em recebê-los em nosso escritório!',
  anos: 17,
  // Página "Simulador Financeiro" do site atual.
  bancos: ['Caixa Econômica Federal', 'Santander', 'Itaú', 'Banco do Brasil', 'Bradesco'],
  financiamento: 'Contamos com correspondentes parceiros para oferecer simulações de financiamentos junto aos mais renomados bancos e instituições financeiras do segmento imobiliário.',
  locacao: 'Nas pretensões de locações, oferecemos também corretoras parceiras com total agilidade para análises de cadastros junto à Porto Seguro.',
  // Busca do site atual: Negócio (Administração, Alugar, Venda).
  servicos: ['Venda', 'Locação', 'Administração'],
};

// Pontos de referência citados nas descrições dos próprios imóveis.
export const referencias = [
  { nome: 'Museu do Ipiranga', txt: 'O cartão-postal do bairro, cercado de sobrados e ruas arborizadas.' },
  { nome: 'Parque da Independência', txt: 'Área verde para caminhar e passear com a família, a cerca de 1 km de muitos dos imóveis.' },
  { nome: 'Metrô Sacomã', txt: 'Linha 2 Verde a poucas quadras de vários sobrados e apartamentos da carteira.' },
  { nome: 'Estação Santos-Imigrantes', txt: 'Outra porta para a Linha 2 Verde, a menos de 2 km.' },
  { nome: 'Mooca Plaza Shopping', txt: 'Compras, cinema e serviços a pouco mais de 1 km.' },
  { nome: 'Instituto Cristóvão Colombo', txt: 'Quadras e espaço tranquilo para esportes ao ar livre.' },
];

const corrigeTexto = s => String(s)
  // O site atual traz "Hayloft" (tradução automática de "sobrado") e "Hangar"/"Hall" no lugar de galpão e salão.
  .replace(/Hayloft/gi, 'Sobrado').replace(/Hangar/gi, 'Galpão').replace(/Hall Comercial/gi, 'Salão Comercial')
  .replace(/\bOtima\b/g, 'Ótima').replace(/!{2,}/g, '!').replace(/\s+,/g, ',').replace(/\s{2,}/g, ' ').trim();

const capsParaFrase = s => {
  const letras = s.replace(/[^A-Za-zÀ-ÿ]/g, '');
  const maiusc = letras.replace(/[^A-ZÀ-Þ]/g, '');
  if (letras.length && maiusc.length / letras.length < 0.6) {
    // Palavras soltas em maiúsculas no meio de um título normal ("ÓTIMO SOBRADO PARA LOCAÇÃO com 3 Quartos").
    return s.replace(/\p{Lu}{2,}/gu, w => ['IPTU', 'SP'].includes(w) ? w : w[0] + w.slice(1).toLowerCase()).replace(/\b(Para|No|Na|De|Em|Com)\b(?=\s)/g, w => w.toLowerCase()).replace(/^(\p{Ll})/u, c => c.toUpperCase());
  }
  const m = s.toLowerCase().replace(/(^|[.!?]\s+)(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
  return m.replace(/\bipiranga\b/g, 'Ipiranga').replace(/\bmuseu do Ipiranga\b/gi, 'Museu do Ipiranga').replace(/\bsacomã\b/g, 'Sacomã').replace(/\bm²/g, 'm²');
};

const BAIRROS = { 'Jd. Sta Cruz': 'Jardim Santa Cruz', 'Saúde': 'Jardim da Saúde' };

function tipoDe(cod, titulo) {
  const c = cod.toUpperCase();
  if (c.startsWith('SOBRCOM')) return ['Sobrado comercial', 'comercial'];
  if (c.startsWith('SOBR')) return ['Sobrado', 'sobrado'];
  if (c.startsWith('APTO')) return ['Apartamento', 'apartamento'];
  if (c.startsWith('CT')) return ['Casa', 'casa'];
  if (c.startsWith('GPO')) return /sal[aã]o|hall/i.test(titulo) ? ['Salão comercial', 'comercial'] : ['Galpão', 'comercial'];
  return ['Salão comercial', 'comercial'];
}

const num = s => s == null ? null : Number(String(s).replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '')) || null;
const sim = v => v != null && /^(sim|s)$/i.test(String(v).trim());

const EXTRAS = [
  ['Piscina', 'Piscina'], ['Churrasqueira', 'Churrasqueira'], ['Quintal', 'Quintal'], ['Sacada', 'Sacada'],
  ['Área de Serviço', 'Área de serviço'], ['Escritório', 'Escritório'], ['Closet', 'Closet'], ['lareira', 'Lareira'],
  ['Salão de Festas', 'Salão de festas'], ['Salão de Jogos', 'Salão de jogos'], ['Playground', 'Playground'],
  ['Fitness', 'Academia'], ['Quadra', 'Quadra'], ['Quarto Empregada', 'Quarto de empregada'], ['WC Empregada', 'WC de empregada'],
];

export const imoveis = brutos.map(x => {
  const f = x.ficha;
  const [tipo, cat] = tipoDe(x.cod, x.titulo);
  let titulo = capsParaFrase(corrigeTexto(x.titulo));
  if (cat === 'sobrado') titulo = titulo.replace(/Loft Residencial/i, 'Sobrado Residencial');
  if (x.negocio === 'venda') titulo = titulo.replace(/\s*Para Locação\s*/i, ' à venda ');
  const preco = num(x.preco);
  const bairro = BAIRROS[x.bairro] || x.bairro;
  const desc = x.desc.map(corrigeTexto).map(capsParaFrase).filter(p => p && p !== titulo);
  const extras = EXTRAS.filter(([k]) => sim(f[k])).map(([, n]) => n);
  if (f['Lavabo'] && num(f['Lavabo'])) extras.push('Lavabo');
  if (f['Elevadores'] && num(f['Elevadores'])) extras.push(num(f['Elevadores']) > 1 ? `${num(f['Elevadores'])} elevadores` : 'Elevador');
  return {
    id: x.id, cod: x.cod.toUpperCase(), negocio: x.negocio, tipo, cat, bairro, titulo, desc, preco,
    precoTxt: preco ? 'R$ ' + preco.toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : 'Consulte',
    quartos: num(f['Dormitórios']), suites: num(f['Suites']), banheiros: num(f['WCS']), vagas: num(f['Vagas']),
    area: num(f['Área']), terreno: num(f['Área do Terreno']), iptu: f['Iptu'] || null, condominio: f['Condomínio'] || null,
    salas: num(f['Sala']), andares: num(f['Nº de Andares']), destaqueLocal: f['Localização estratégica'] || null,
    extras,
    fotos: Array.from({ length: Math.min(x.fotos.length, 8) }, (_, i) => `/assets/img/imoveis/${x.id}-${i + 1}.webp`),
  };
});

export const porId = Object.fromEntries(imoveis.map(i => [i.id, i]));
export const vendas = imoveis.filter(i => i.negocio === 'venda');
export const alugueis = imoveis.filter(i => i.negocio === 'aluguel');
export const bairros = [...new Set(imoveis.map(i => i.bairro))].sort((a, b) => (b === 'Ipiranga') - (a === 'Ipiranga') || a.localeCompare(b));
export const contaBairro = b => imoveis.filter(i => i.bairro === b).length;
export const CATS = [
  { k: 'apartamento', n: 'Apartamentos', foto: 41 },
  { k: 'sobrado', n: 'Sobrados', foto: 2 },
  { k: 'casa', n: 'Casas', foto: 61 },
  { k: 'comercial', n: 'Comerciais e galpões', foto: 28 },
];
export const contaCat = k => imoveis.filter(i => i.cat === k).length;

// Escolhidos pelas melhores fotos de cada lado.
export const destaquesVenda = [20, 41, 61, 2, 50, 16].map(id => porId[id]);
export const destaquesAluguel = [40, 35, 43, 7, 9, 28].map(id => porId[id]);
