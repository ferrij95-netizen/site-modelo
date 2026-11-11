// Instruções fixas de cada agente e o formato JSON que cada um devolve.
// Ficam iguais para todas as empresas (é isso que deixa o cache de prompt funcionar).
import { KIT } from './kit.mjs';

export const FONTES_TITULO = ['Montserrat', 'Poppins', 'Exo 2', 'Red Hat Display', 'Barlow', 'Barlow Condensed', 'Oswald', 'Rajdhani',
  'Titillium Web', 'Archivo', 'Raleway', 'Roboto Slab', 'Merriweather', 'Lato', 'Nunito Sans', 'Saira', 'Kanit', 'Work Sans', 'Libre Franklin', 'Source Serif 4'];

const obj = (props, obrig = Object.keys(props)) => ({ type: 'object', properties: props, required: obrig, additionalProperties: false });
const str = { type: 'string' };
const strs = { type: 'array', items: str };
const item = obj({ titulo: str, texto: str, imagem: str });
const TIPOS_SECAO = ['texto', 'cards', 'lista', 'processo', 'numeros', 'galeria', 'marcas', 'depoimentos', 'cta', 'faq', 'contato'];

// ---------- Triagem ----------
export const TRIAGEM_SISTEMA = `Você avalia sites de empresas brasileiras para uma agência que refaz sites antigos.
Recebe dois prints do site atual: computador (1366 px de largura) e celular (390 px).
Julgue só pelo que se vê, como um dono de empresa veria: visual datado, amador, quebrado, ilegível, desalinhado, sem versão de celular, banner pixelado, fontes e cores velhas, cara de modelo pronto, página vazia ou em construção.
Não dê nota alta para site que é simples mas bonito e atual: o dono não vai querer trocar.
nota: 0 = site moderno e bonito, 10 = site muito ruim, velho ou quebrado. vale_refazer = true só se a nota for 6 ou mais.
problemas: até 4 problemas visíveis, em frases curtas que o vendedor possa falar ao telefone (ex.: "no celular o texto fica cortado").`;
export const TRIAGEM_ESQUEMA = obj({
  nota: { type: 'integer' }, parece: { type: 'string', enum: ['moderno', 'simples', 'datado', 'muito_antigo', 'quebrado', 'vazio'] },
  problemas: strs, vale_refazer: { type: 'boolean' }, resumo: str,
});

// ---------- Conteúdo ----------
export const CONTEUDO_SISTEMA = `Você extrai a ficha de uma empresa a partir da captura do site atual (textos de cada página, menu, imagens, cores e fontes medidas pelo navegador) e da imagem do logo.
Regras:
- Use só fatos que estão na captura. Não invente produto, número, cliente, certificação, ano ou endereço. Se algo parece incerto ou contraditório, ponha em fatos_incertos.
- Mantenha a ordem do menu e a ordem das seções da home como estão no site atual.
- Copie os textos do site quase literalmente (pode corrigir ortografia). Quem reescreve é a próxima etapa.
- imagem: use o id da imagem baixada (ex.: "foto-3") que combina com o item, ou "" se nenhuma combina. Nunca use URL.
- marca: cor_principal é a cor da marca (logo, botões, títulos), cor_escura uma versão escura dela ou a cor escura usada no site, cor_destaque a segunda cor do logo ou dos botões. Use as cores medidas, em hex. fundo diz se o site atual é predominantemente claro, escuro ou colorido (muito fundo na cor da marca).
- fonte_titulo: a fonte da lista mais parecida com as letras do logo (formato, peso, se é reta ou arredondada).
- logo: o id da imagem do logo; logo_fundo diz se o logo foi feito para fundo claro ou escuro.
- idiomas: só os que o site atual realmente oferece (bandeiras, /en/, troca de idioma). "tem-tradutor" na captura conta como en e es.
- problemas_site: defeitos objetivos vistos na captura (ano antigo no rodapé, sem https, textos repetidos, placeholder, lorem ipsum, link quebrado, página com erro, sem WhatsApp, lento).`;
export const conteudoEsquema = fontes => obj({
  empresa: obj({ nome: str, nome_curto: str, cidade: str, uf: str, segmento: str, descricao_curta: str, ano_fundacao: str }),
  marca: obj({ cor_principal: str, cor_escura: str, cor_destaque: str, fundo: { type: 'string', enum: ['claro', 'escuro', 'colorido'] },
    fonte_titulo: { type: 'string', enum: fontes }, logo: str, logo_fundo: { type: 'string', enum: ['claro', 'escuro'] } }),
  idiomas: { type: 'array', items: { type: 'string', enum: ['pt', 'en', 'es'] } },
  menu: { type: 'array', items: obj({ rotulo: str, tipo: { type: 'string', enum: ['inicio', 'sobre', 'produtos', 'servicos', 'solucoes', 'clientes', 'blog', 'contato', 'outro'] }, url: str }) },
  home: { type: 'array', items: obj({ tipo: { type: 'string', enum: TIPOS_SECAO }, titulo: str, texto: str, itens: { type: 'array', items: item } }) },
  paginas: { type: 'array', items: obj({ rotulo: str, url: str, titulo: str, texto: str, itens: { type: 'array', items: item } }) },
  numeros: { type: 'array', items: obj({ valor: str, rotulo: str }) },
  diferenciais: strs,
  clientes_marcas: { type: 'array', items: obj({ nome: str, imagem: str }) },
  contato: obj({ telefones: strs, whatsapp: str, emails: strs, endereco: str, horario: str, redes: strs }),
  fatos_incertos: strs, problemas_site: strs,
});

// ---------- Redação ----------
// V1: o prompt de antes do kit de treino. Fica só para comparar (node comparar.mjs).
export const REDACAO_SISTEMA_V1 = `Você é redator de uma agência que refaz sites de empresas. Recebe a ficha da empresa (tirada do site atual) e escreve os textos do site novo, em português do Brasil.
O site novo é o site atual da empresa, melhorado. Regras da agência:
1. Identidade real: use os produtos, serviços, números, clientes e contatos da ficha. Nada inventado: nenhum número, prêmio, certificação, depoimento, cliente ou ano que não esteja na ficha. Sem depoimento na ficha, não crie seção de depoimentos.
2. Estrutura fiel: mantenha as páginas do menu atual, na mesma ordem, e as seções da home na ordem do site atual. Pode juntar seções repetidas e cortar o que é lixo de modelo pronto.
3. Tom formal e direto para empresas e indústrias. Frases curtas, sem clichê ("soluções inovadoras", "excelência", "paixão"), sem exclamação, sem emoji.
4. Seções variadas: escolha o tipo que melhor mostra cada conteúdo (cards, lista, processo em etapas, números, galeria, marcas, faq, cta). Processos e etapas viram "processo". Não use o mesmo tipo em seções vizinhas.
5. Cada página tem chamada (título forte e curto, subtítulo de uma ou duas frases) e de 2 a 5 seções. A página de contato termina com uma seção tipo "contato".
6. imagem: só ids de imagens da ficha (ex.: "foto-3") ou "". Prefira fotos grandes e reais para as chamadas.
7. slug: minúsculo, sem acento, com hífen (ex.: "quem-somos"). A primeira página é sempre a home, com slug "inicio".
8. botao: o texto do botão principal (ex.: "Solicitar orçamento", "Falar com um consultor"), coerente com o que a empresa vende.`;

// V2 (kit de treino): guia de estilo com as correções do João + exemplos de ouro. Texto fixo, então fica em cache.
export const REDACAO_SISTEMA = `Você é o redator sênior da Overtus, agência que refaz sites de empresas e indústrias brasileiras. Recebe a ficha da empresa (tirada do site atual) e escreve, em português do Brasil, os textos do site novo em JSON.
Antes de escrever, leia a ficha e anote mentalmente os fatos que você tem: produtos e linhas, serviços, números, cidades e estados, marcas, clientes, anos, canais de contato. Cada título e cada card do site deve usar esses fatos.

${KIT.guia}

${KIT.exemplos}

Formato:
- slug: minúsculo, sem acento, com hífen (ex.: "quem-somos"). A primeira página é sempre a home, com slug "inicio".
- Cada página tem chamada (sobretitulo curto com fato, título forte, subtítulo de uma ou duas frases, imagem) e de 2 a 5 seções (a home pode ter até 7).
- secoes[].subtitulo é o rótulo pequeno acima do título da seção.
- Campos sem conteúdo ficam "" ou [], nunca com texto de preenchimento.`;
const secao = obj({ tipo: { type: 'string', enum: TIPOS_SECAO }, titulo: str, subtitulo: str, texto: str, imagem: str, itens: { type: 'array', items: item } });
export const SITE_ESQUEMA = obj({
  slogan: str, botao: str, rodape: str,
  paginas: { type: 'array', items: obj({ slug: str, menu: str, titulo_seo: str, descricao_seo: str,
    chamada: obj({ sobretitulo: str, titulo: str, subtitulo: str, imagem: str }), secoes: { type: 'array', items: secao } }) },
});

// ---------- Autocrítica ----------
// Um segundo passo barato: o revisor confere o rascunho contra o checklist e os problemas que o detector achou
// (lib/genericos.mjs) e devolve só as trocas, não o site inteiro (menos tokens e sem risco de cortar o JSON).
export const CRITICA_SISTEMA = `Você é o editor-chefe da Overtus. Recebe a ficha da empresa, o rascunho dos textos do site novo (JSON) e uma lista de problemas encontrados por um verificador automático.
Sua tarefa: deixar o rascunho específico desta empresa, sem nada genérico e sem nada inventado, seguindo o guia e o checklist abaixo.
Devolva só as trocas necessárias. Cada troca tem caminho (ex.: "paginas[0].chamada.titulo", "paginas[1].secoes[2].itens[0].texto", "paginas[0].secoes[3].tipo") e novo (o texto novo; para tipo, um dos tipos permitidos).
Para apagar uma seção ou um item (por exemplo, número ou depoimento inventado), use remover com o caminho da seção ou do item (ex.: "paginas[0].secoes[4]").
Corrija todos os problemas da lista e tudo o que o checklist pegar. Não mexa no que já está bom. Use só fatos da ficha.

${KIT.guia}

${KIT.checklist}`;
export const CRITICA_ESQUEMA = obj({
  avaliacao: str,
  trocas: { type: 'array', items: obj({ caminho: str, novo: str }) },
  remover: strs,
});

// ---------- Tradução ----------
export const TRADUCAO_SISTEMA = `Você traduz o JSON de textos de um site institucional do português para o idioma pedido, em tom formal e natural para clientes empresariais.
Mantenha exatamente a mesma estrutura, os mesmos slugs, ids de imagem, nomes próprios, marcas, telefones e e-mails. Traduza todo o resto.`;

// ---------- Revisão ----------
export const REVISAO_SISTEMA = `Você é o diretor de arte de uma agência que refaz sites. Compara o print do site atual da empresa com as duas versões novas (A e B), no computador e no celular.
Reprove se: as cores não lembram a marca ou mudaram muito o peso (site atual cheio de cor e o novo quase todo branco, ou o contrário); a foto da chamada é ruim, cortada ou sem relação; o logo some ou fica ilegível no fundo; textos ou elementos desalinhados, sobrepostos ou cortados; seções vizinhas com o mesmo fundo parecendo quebradas; contraste ruim.
Aprove quando qualquer dono da empresa reconheceria a própria marca e acharia o novo claramente melhor.
ajustes: só o que muda o resultado, usando os campos permitidos. valor é um hex para cores, um id de imagem para imagem_chamada (foto da primeira dobra da home), um nome da lista para fonte_titulo.`;
export const revisaoEsquema = fontes => obj({
  aprovado: { type: 'boolean' }, problemas: strs,
  ajustes: { type: 'array', items: obj({ versao: { type: 'string', enum: ['a', 'b', 'ambas'] },
    campo: { type: 'string', enum: ['cor_principal', 'cor_escura', 'cor_destaque', 'imagem_chamada', 'fonte_titulo'] }, valor: str }) },
});

// ---------- Abordagem ----------
export const abordagemSistema = scriptBase => `Você prepara a ligação de venda da Overtus para uma empresa específica. O vendedor é o João.
A Overtus já refez o site da empresa (duas versões no ar) e o objetivo da ligação NÃO é vender por telefone: é conseguir o WhatsApp ou e-mail de quem decide e a permissão para mandar o link.
Use o roteiro-base abaixo e adapte cada fala à empresa: nome, segmento, cidade, e 1 ou 2 problemas reais e visíveis do site atual (dos dados recebidos). Fale como gente, frases curtas, sem jargão.
Não invente nada sobre a empresa. Não prometa preço, prazo ou resultado.
whatsapp: a mensagem curta que o João manda junto com os dois links (use {LINK_A} e {LINK_B} onde entram os links).
followup: a mensagem do dia seguinte, curta.
melhor_horario: quando ligar, pelo segmento (o roteiro traz os horários gerais).

=== ROTEIRO-BASE ===
${scriptBase}`;
export const ABORDAGEM_ESQUEMA = obj({
  problemas: strs,
  script: obj({ recepcao: str, decisor: str, pitch: str, pedido: str, objecoes: { type: 'array', items: obj({ objecao: str, resposta: str }) }, whatsapp: str, followup: str }),
  melhor_horario: str,
});
