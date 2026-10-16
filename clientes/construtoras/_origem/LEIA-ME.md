# Overtus por segmento

- `construtoras.overtus.com.br` (construtoras e incorporadoras) e `industrias.overtus.com.br` (indústrias, primeira versão). Em cada um, `/` é a escolha de versão, `/a/` a "Editorial" e `/b/` a "Marinho", no mesmo visual do site da agência (clientes/agencia).
- Textos em `conteudo-construtoras.mjs` e `conteudo-industrias.mjs`; páginas em `gerar.mjs`, que gera as duas pastas `clientes/construtoras/public` e `clientes/industrias/public`. Depois de mudar qualquer texto: `node clientes/construtoras/_origem/gerar.mjs`.
- `base.css`, `a.css`, `b.css`, `site.js`, fontes e imagens vêm de `clientes/agencia/public/assets` a cada geração (não editar as cópias). Peças próprias: `seg.css` e `seg.js` desta pasta.
- Páginas (10 por versão): início, soluções e uma página por frente, jornada (do lançamento às chaves / da pesquisa ao pedido), como trabalhamos, perguntas, contato.
- A tabela de disponibilidade é demonstração com dados fictícios, com aviso na tela. Sem preços, clientes ou números inventados. Indústrias usa os estudos de redesenho do portfólio da agência, com a mesma legenda.
- A inicial da agência tem a faixa "Especialistas no seu segmento" e a coluna "Segmentos" no rodapé, apontando para as duas.
- `public/assets/versao-*.jpg`, `og-*.jpg` e `../capa.jpg` são prints das páginas, refeitos quando o visual mudar.
- Inglês (só indústrias): `industrias.overtus.com.br/en/` (escolha), `/en/a/` e `/en/b/`. `traduzir-en.mjs` roda no fim do `gerar.mjs`, pega as páginas em português já geradas e troca cada texto pelo de `industrias-en.mjs`; o build falha se algum texto ficar sem tradução. Botão PT/EN no topo. `public/assets/versao-en-*.jpg` são prints das versões em inglês.
