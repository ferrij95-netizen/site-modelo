# Kit de apresentação (molduras de aparelho + animações ao rolar)

Dois arquivos sem dependência: `apresenta.css` e `apresenta.js`. Copie os dois para a pasta `assets/` do site e inclua:

```html
<link rel="stylesheet" href="/assets/apresenta.css">
<script src="/assets/apresenta.js" defer></script>
```

Cor de destaque: `--ap-cor` (padrão teal). Quem marca "reduzir movimento" no aparelho vê tudo parado e visível. Sem JavaScript, tudo aparece normal.
Exemplo no ar: a página de escolha https://northeastprecision.overtus.com.br/ (antes de entrar nas versões A e B).

## Página de escolha pronta (`escolha.mjs`)

A página que o cliente abre antes de entrar no site: abertura com notebook e celular, uma tela para cada versão (letra grande, texto, pontos, notebook e celular rolando o print da página inteira), o site atual numa janela de navegador e a escolha final. Exemplo de uso em `clientes/northeastprecision/_origem/gerar.mjs`.

1. Tire prints de página inteira de cada versão: computador 1440 px (salvar com 1000 px de largura) e celular 390 px com escala 2 (salvar com 600 px), em `public/assets/apresentacao/<a|b>-pc.webp` e `<a|b>-cel.webp`.
2. Copie `apresenta.css` e `apresenta.js` para `public/assets/`.
3. Gere `public/index.html` com `paginaEscolha({ nome, url, lang: 'en'|'pt', cor, fundo, claro, fonteTitulo, fonteTexto, googleFonts, favicon, ogImagem, versoes: [{ letra, nome, texto, pontos, paginas }], corTextoBotao (opcional, ex.: '#222' quando a cor é amarela), antigo: { url, img, rola: true } })`. Com `rola: true`, `img` é um print de página inteira do site atual e ele rola sozinho dentro da janela.

## Molduras

```html
<!-- notebook (a tela "abre" quando entra na tela se tiver data-rev) -->
<div class="mk mk-notebook" data-rev><div class="mk-tela"><div class="mk-vis"><img src="print.jpg" alt=""></div></div><div class="mk-base"></div></div>

<!-- celular -->
<div class="mk mk-celular" data-rev><div class="mk-vis"><img src="print-celular.jpg" alt=""></div></div>

<!-- janela de navegador com endereço -->
<div class="mk mk-janela" data-url="cliente.overtus.com.br"><div class="mk-vis"><img src="print.jpg" alt=""></div></div>
```

- Dentro de `.mk-vis` cabe imagem, vídeo, iframe ou HTML de verdade.
- O celular é todo proporcional a `--mk-larg` (bordas, recorte, barra de status). A barra de status ("9:41" e bateria) pega a cor do topo do print sozinha, pelo apresenta.js; se o print vier de outro domínio, fica branca.
- Notebook e celular lado a lado sem um cobrir a tela do outro: alinhar pela base e sobrepor só a borda vazia do notebook (uns 8% da largura dele), como faz `escolha.mjs` (`.es-palco`).
- Print de página inteira rolando sozinho na tela: `<div class="mk-vis mk-rola"><img src="print-longo.jpg"></div>` (pausa ao passar o mouse; `--mk-t:20s` muda a velocidade).
- Tamanho: `--mk-larg` (notebook 880px, celular 290px). Flutuar devagar: classe `mk-flutua`.
- Para o site da Overtus: notebook com o print longo do site novo e celular com o print do celular, lado a lado. Prints prontos ficam em `clientes/<cliente>/capa.jpg` e `public/assets/versao-*.jpg`.

## Animações

| Atributo | O que faz |
|---|---|
| `data-rev` (`""`, `esq`, `dir`, `zoom`, `baixo`, `cortina`) | entra ao aparecer na tela; `style="--ap-d:300ms"` atrasa |
| `data-rev-filhos="" data-rev-passo="120"` | os filhos entram um depois do outro |
| `data-palavras` | título sobe palavra por palavra (mantém `<em>`) |
| `data-conta` | números do texto contam até o valor ("100 – 25,000", "137 kW", "40+"); `data-conta-de="1900"` muda o início |
| `data-etapas` + filhos `.ap-etapa` + `<span class="ap-trilho">` | linha que enche e etapas que acendem conforme rola |
| `data-troca` + `.ap-troca-midia > figure` + `.ap-troca-passo` | foto fixa que troca enquanto o texto rola (no celular vira lista) |
| `data-slide="Nome"` | seção em tela cheia; com 3 ou mais aparecem os pontos de navegação à direita, a barra de progresso no topo e o encaixe suave |
| `data-paralaxe=".12"` | paralaxe leve (no filho de um bloco com `overflow:hidden`) |
| `.ap-kenburns` | foto de abertura que se aproxima devagar |
| `<body data-ap-auto="seletores">` | marca `data-rev` sozinho em páginas internas já prontas |
