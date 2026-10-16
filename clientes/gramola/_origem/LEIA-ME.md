# Gramola: como este site é feito

- Cliente: Gramola Fundição Ltda., Limeira (SP), peças fundidas para suspensão de ônibus e caminhões desde 1992. Site atual gramola.com.br (WordPress/Elementor) é só uma página "em construção" com contatos por setor e um catálogo em PDF (Google Drive, 84 páginas, 222 MB). Sem troca de idioma.
- Textos da empresa: páginas 2 e 3 do catálogo. Contatos: botões do site atual. Endereço: contracapa do catálogo.
- Catálogo: as 639 peças (código, nome, aplicação, código original, observação, selos Novo/Exportação) foram lidas do PDF por OCR em 2026-10-16 e conferidas por amostra; ficam em `produtos.json`. Fotos das peças recortadas das páginas do PDF (originais em /mnt/project-files/gramola/pecas, lista em `pecas.json`).
- Site estático em `public/`: `/` é a página de escolha, `/a/` a versão A "Fundição" (fiel ao site atual e ao catálogo: marinho #0f0e45, índigo #23245c, royal #2e2c9e, fundo de caminhões do site atual) e `/b/` a versão B "Engenharia" (busca em primeiro plano, fundo claro com degradês). Títulos em Montserrat (mais próxima do logo), texto em Inter. 652 páginas em cada: home, empresa, fundição, catálogo com busca e filtros, 8 linhas, 639 páginas de peça e contato. `/antigo/` tem o print do site atual.
- Fotos: fundo do site atual, vista aérea da fábrica (página 2 do catálogo) e caminhões das aberturas de cada marca no catálogo. Nenhuma foto de banco.
- Depois de mudar texto: `node clientes/gramola/_origem/gerar.mjs`. Imagens: `node clientes/gramola/_origem/imagens.mjs`.
- Falta confirmar com a Gramola: as etapas do processo na página Fundição (texto genérico de fundição), o uso de cada material (nodular, cinzento, aço), e eventuais erros de leitura em códigos e aplicações do catálogo.
