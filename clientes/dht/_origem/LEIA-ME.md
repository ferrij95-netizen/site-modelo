# DHT: como este site é feito

- Site estático em `public/`: `/` é a página de escolha, `/a/` é a versão A "Laboratório" (clara) e `/b/` a versão B "Plantão" (escura). Sete páginas em cada.
- As páginas são geradas: textos em `conteudo.mjs`, peças comuns (marca, desenhos técnicos, monitor de sinais, painel) em `pecas.mjs`, estrutura de cada versão em `versao-a.mjs` e `versao-b.mjs`. Depois de mudar qualquer texto: `node clientes/dht/_origem/gerar.mjs`.
- Estilo: referência FigureAI do banco de designs (`/mnt/project-files/designs/figureai.md`). Space Grotesk (substituto da PP Neue Machina) nos títulos e Inter no texto; monocromático, sem cor de acento.
- Sem fotos: a DHT ainda não mandou material. No lugar da fotografia de produto há desenhos técnicos do sensor (SVG) e sinais vitais ao vivo (canvas). Logo, produto, números e textos são provisórios.
- `public/assets/versao-*.jpg`, `og-*.jpg` e `../capa.jpg` são prints das páginas, refeitos à mão quando o visual mudar.
