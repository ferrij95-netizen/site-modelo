# SOS Atacadista: como este site é feito

- Cliente: SOS Atacadista de Alimentos EIRELI, Rua Freitas de Guimarães, 250, Cidade Líder, São Paulo SP. Escolhido na lista de distribuidoras (prospeccao/nichos/distribuidoras, 21/10/2026), sem pedido do cliente.
- Site atual: www.sosatacadista.com.br (loja CakePHP antiga, latin-1, largura fixa, não responsiva). Só português.
- Marca: logo `img/logo/logo_gg.png` do site atual (1115 px, fundo transparente). Verde da faixa do logo, laranja da linguiça e dos botões "Destaques"/"Departamentos", verde escuro, amarelo e etiqueta vermelha do encarte. Títulos em Montserrat (é a letra do "ATACADISTA" do logo), texto em Inter. Favicon é a pizza do logo.
- Catálogo: `catalogo.json` com os 225 produtos das 105 subcategorias do menu Departamentos (nome, referência, unidade de venda, foto grande). O site atual não mostra preço no catálogo; os preços são só os do encarte.
- Encarte: os 15 banners da semana (19/10 a 23/10) em `public/assets/encarte/`, mais os banners "Fornecimento para..." e de contatos por setor. Os 12 preços de `encarte.ofertas` em `conteudo.mjs` foram lidos dos banners. Toda semana: trocar os arquivos, a validade e as ofertas.
- Foto de banco: só o forno a lenha da versão B (Dale Cruse, CC BY 2.0, Wikimedia). A câmara fria é recorte do banner de contatos do site atual.
- Estrutura: `/` escolha (componentes/apresentacao), `/a/` "Balcão" (topo com logo, busca e telefones; botões inclinados; encarte em carrossel; departamentos ao lado e destaques, como o site atual; 20 páginas, uma por departamento) e `/b/` "Pedido rápido" (busca grande, listas por tipo de negócio, tabela de pedido com quantidade e resumo ao lado; 13 páginas).
- Pedido: lista guardada no navegador (`site.js`, chave `sos-pedido`) e enviada como texto para o WhatsApp de vendas (11) 94745-8219. Formulários de contato e currículo não enviam na prévia.
- Gerar: `node clientes/sosatacadista/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos à mão (Playwright) quando o visual mudar.
- A confirmar com o cliente: e-mail de contato (não aparece no site atual), se querem preço no catálogo (hoje só no encarte), se os segmentos de cada lista da versão B estão certos, fotos reais da loja, do estoque e dos caminhões.
