# Kit de apresentação (molduras de aparelho + animações ao rolar)

Dois arquivos sem dependência: `apresenta.css` e `apresenta.js`. Copie os dois para a pasta `assets/` do site e inclua:

```html
<link rel="stylesheet" href="/assets/apresenta.css">
<script src="/assets/apresenta.js" defer></script>
```

Cor de destaque: `--ap-cor` (padrão teal). Quem marca "reduzir movimento" no aparelho vê tudo parado e visível. Sem JavaScript, tudo aparece normal.
Exemplo no ar: https://northeastprecision.overtus.com.br/c/ (gerado por `clientes/northeastprecision/_origem/paginas.mjs`, função `homeC`, estilos em `public/assets/c.css`).

## Molduras

```html
<!-- notebook (a tela "abre" quando entra na tela se tiver data-rev) -->
<div class="mk mk-notebook" data-rev><div class="mk-tela"><div class="mk-vis"><img src="print.jpg" alt=""></div></div><div class="mk-base"></div></div>

<!-- celular -->
<div class="mk mk-celular" data-rev><div class="mk-vis"><img src="print-celular.jpg" alt=""></div></div>

<!-- janela de navegador com endereço -->
<div class="mk mk-janela" data-url="cliente.overtus.com.br"><div class="mk-vis"><img src="print.jpg" alt=""></div></div>
```

- Dentro de `.mk-vis` cabe imagem, vídeo, iframe ou HTML de verdade (na NEP o celular mostra um formulário de orçamento animado).
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
