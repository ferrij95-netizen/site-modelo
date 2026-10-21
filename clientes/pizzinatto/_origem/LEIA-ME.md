# Pizzinatto: como este site é feito

- Cliente: Pizzinatto Indústria de Metais Ltda (Grupo Pizzinatto), R. da Glória 2300, Piracicaba SP, filial na Alameda Campinas 474 cj. 56, São Paulo. Escolhido no piloto 2 de sites ruins (21/10/2026), sem pedido do cliente.
- Site atual: grupopizzinatto.com.br (WordPress). Só português, sem troca de idioma, então o novo é só `pt`.
- Fontes de conteúdo: API do WordPress (`/wp-json/wp/v2/pages`, `posts`, `media`; a resposta vem com BOM). Fórmulas da calculadora tiradas do JSON `form_structure_1` do formulário "Calcule a sua obra". Medidas dos perfis tiradas das fichas técnicas (desenhos) do site atual.
- Marca: logo vetorizado (potrace) de `default-logo.png`: `public/assets/logo.svg` (cinza #727376 e laranja #F47D35) e `logo-branco.svg`. Títulos em Kanit 800 itálico (mais parecida com o logo), texto em Inter. Contraste: botão #D35A17 com texto branco; laranja em texto sobre branco #B84C12; #F47D35 só decorativo ou sobre grafite.
- Fotos: do próprio site (obras, produtos, perfis, acessórios), convertidas para webp em `public/assets/img/`. Legendas das obras lidas das fotos e dos posts.
- Escritos por nós: descrições curtas das calhas e acessórios, títulos de seção, textos de apoio da calculadora e do "Monte o seu produto". Cores das amostras são aproximadas (hex escolhido pela foto da cartela).
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Tradição" (fiel: faixa de topo, menu laranja, slider, três caixas Calcule/Monte/Catálogos, mosaico de obras com o losango), `/b/` "Perfil" (grafite e laranja, perfis desenhados em SVG nas medidas reais, telha sanduíche camada por camada, números). 8 páginas em cada: Home, Empresa, Telhas, Calhas, Aço, Obras, Calcule, Contato.
- Lista de orçamento: botões "Adicionar ao orçamento", "Monte o seu produto" e a calculadora guardam itens no navegador (`pizzinatto-orcamento`); o formulário envia por e-mail (contato@) ou WhatsApp (fone principal).
- Gerar: `node clientes/pizzinatto/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: textos das calhas; cores das amostras; se o WhatsApp é o mesmo número do fixo; se a filial de São Paulo continua ativa. Blog, catálogos em PDF, loja on-line e 2ª via de boleto apontam para o site atual.
