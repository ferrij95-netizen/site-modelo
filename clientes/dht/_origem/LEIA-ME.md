# DHT Indústria Médica: como este site é feito

- Cliente: DHT Indústria Médica Ltda., CNPJ 42.233.000/0001-81, Rua Barão de Tramandaí, 196, Porto Alegre (dados do cadastro público). Fabrica instrumentais e utensílios médicos e distribui insumos.
- Site estático em `public/`: `/` é a página de escolha, `/a/` é a versão A "Catálogo" (branca e azul) e `/b/` a versão B "Indústria" (azul-marinho). Onze páginas em cada: início, produtos, 4 linhas de produto, fabricação, distribuição, qualidade, empresa e contato.
- As páginas são geradas: textos e produtos em `conteudo.mjs`, ilustrações de produto em `ilustra.mjs`, peças comuns em `comum.mjs`, estrutura de cada versão em `versao-a.mjs` e `versao-b.mjs`. Depois de mudar qualquer texto: `node clientes/dht/_origem/gerar.mjs`.
- Lista de cotação: o visitante adiciona produtos, a lista fica salva no navegador e é enviada pelo WhatsApp ou e-mail da DHT já formatada (`public/assets/dht.js`).
- Sem fotos: as imagens de produto são ilustrações em SVG. Trocar por fotos reais quando a DHT mandar. Códigos, linhas, números e textos são propostas.
- Fonte: IBM Plex Sans. A primeira proposta (estilo FigureAI) foi recusada pelo Joao em 2026-10-09.
- `public/assets/versao-*.jpg`, `og-*.jpg` e `../capa.jpg` são prints das páginas, refeitos à mão quando o visual mudar.
