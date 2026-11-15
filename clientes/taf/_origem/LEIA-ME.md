# TAF Indústria de Plásticos

Gerar: `node clientes/taf/_origem/gerar.mjs` (prints: `node componentes/gerador/prints.mjs taf https://www.taf.ind.br/` e gerar de novo).

- Produtos: 186 com foto, da loja WooCommerce do site atual (Store API), com concessionária, região, medidas e tabela de códigos (`produtos.json`).
- Textos, ensaios, unidades, certificados (ISO 9001, UL 467, Intertek RETIE) e fotos do site atual. Logo vetorizado (`vetorizar-logo.py`).
- PT/EN/ES como no site atual; nomes e medidas de produto ficam em português.
- A: "Siga esta energia" (branca). B: "Nacional com qualidade global" (azul-marinho).

## Confirmar com o cliente
- "13 países" (lista da página Empresa) e "mais de 15 países" (texto da home) divergem: usamos 13.
- Laboratório: "mais de 18 ensaios", mostramos os 11 descritos.
- Frase "do Oiapoque ao Chuí" é nossa (produtos homologados em todos os estados).
