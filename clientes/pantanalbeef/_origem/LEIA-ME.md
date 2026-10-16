# Pantanal Beef: como regenerar

- Dados da empresa e textos: `dados.mjs` (tirados do site atual pantanalbeef.ind.br).
- Produtos: `produtos.json` (83 itens, dos catálogos em PDF do cliente).
- Layout: `comum.mjs` (cabeçalho, rodapé, tabela) e `paginas.mjs` (todas as páginas).
- Gerar: `node clientes/pantanalbeef/_origem/gerar.mjs` escreve `public/a` e `public/b`.
- CSS e JS ficam à mão em `public/assets/` (base.css, a.css, b.css, site.js).
