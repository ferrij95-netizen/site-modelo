# Coprocarne: como este site é feito

- Cliente: Coprocarne Ltda. (Porto Alegre, atacado de carnes, representante Ouro do Sul). Escolhida na prospecção do nicho de alimentos (21/10/2026, /mnt/project-files/prospeccao/nichos/alimentos/LISTA.md), sem pedido do cliente.
- Site atual: coprocarne.com.br (2009, tabelas do Dreamweaver, só http). Páginas: index, empresa, produtos (bovino, embutidos, suino), transporte, frigorifico, atendimento, contato.
- Marca: logo vetorizado (potracer) da placa azul do topo (`menu_r2_c6.jpg`, 320 px) → `public/assets/logo-{placa,branco,azul}.svg`. Silhuetas do boi, do embutido e do porco da página de produtos vetorizadas → `_origem/silh-*.svg`, usadas em linha. Azul #265599 da placa, #006599 das silhuetas, cinza claro da faixa do topo. Títulos em EB Garamond 600 (mais próxima do logo), texto em Source Sans 3.
- Fotos: as 5 do banner em Flash (`topo.swf`, extraídas do SWF com um leitor de tags em Python, 750 px ampliadas para 1500). Frigorífico, produção e produtos: site da Ouro do Sul (API de mídia do WordPress). Mapa: tiles do OpenStreetMap recoloridos em azul (`img/mapa-regiao.webp`; posições em `_origem/mapa.json`).
- Produtos: as três tabelas do site atual com código e unidade (`conteudo.mjs`), só com os caracteres quebrados corrigidos.
- Estrutura: `/` escolha (componentes/apresentacao), `/a/` "Balcão" (faixa cinza com a placa no meio, menu azul, fotos do banner trocando, os três painéis da home de 2009, títulos com foto cinza e onda, tabelas com busca) e `/b/` "Pedido" (busca por produto/código na abertura, rota Harmonia → Porto Alegre sobre o mapa, catálogo único com lista de pedido que vai por e-mail). 10 páginas cada.
- Formulários: na prévia não enviam (mostram aviso). A lista de pedido da B abre um e-mail para gabriel@coprocarne.com.br.
- Gerar: `node clientes/coprocarne/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos à mão (Playwright) quando o visual mudar.
