# Probon: como este site é feito

- Cliente: Probon Indústria de Colchões Ltda, Frederico Westphalen (RS). Piloto de 10 sites ruins (21/10/2026), escolhido pela Overtus sem pedido do cliente.
- Site atual: probon.com.br (VirtualBit, 2016). Só português, sem troca de idioma.
- Marca: logo PROBON vermelho com arcos dourados e "colchões & polímeros" (logo.png e logo-branco.png do site atual). Cor do tema do site atual #991C1F; dourado do arco #a88a4e. Títulos em Archivo larga (wdth 112-125, 800), a mais parecida com as letras largas e pesadas do logo; texto em Inter.
- Textos: todos do site atual (quem somos, missão, visão, linha industrial, laboratório, assistência). Produtos: os 31 de /produto/<id>/ raspados em `produtos.json` (nome, características, informações, ficha técnica, foto). Escritos por nós: títulos de seção, frases de apoio, as 5 etapas "Do bloco de espuma ao colchão" e o corte do Imperial (camadas tiradas da ficha técnica dele).
- Fotos: todas do site atual (banners, /img/industrial, /img/img_lab*, fotos de produto). O selo "34 anos" não foi usado (desatualizado).
- Representantes: o site atual não lista nenhum (a busca por estado volta vazia em todos). O novo manda para o WhatsApp do comercial com estado e cidade; mantém o link "Pedido web" (http://186.209.134.27:8888/). E-commerce (loja.probon.com.br) fora do ar e blog vazio: não entram.
- Assistência técnica: mesmos campos do formulário atual; abre um e-mail para comercial@ (o site atual não diz o e-mail da assistência) e pede para anexar as 3 fotos.
- Estrutura: `/` escolha (componentes/apresentacao), `/a/` "Tradição" (topo branco com contatos e barra vermelha, como hoje), `/b/` "Descanso" (buscador, corte do colchão, escala de conforto). 8 páginas + 31 fichas em cada.
- Gerar: `node clientes/probon/_origem/gerar.mjs`. Prints (`public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg`, `../capa.jpg`) refeitos à mão quando o visual mudar.
