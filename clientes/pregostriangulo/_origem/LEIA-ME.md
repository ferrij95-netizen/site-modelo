# Pregos Triângulo: como este site é feito

- Cliente: Pregos Triângulo Ltda, Av. Comendador Alexandrino Garcia, 2165, Distrito Industrial, Uberlândia MG. Escolhido no piloto de 10 sites ruins (21/10/2026), sem pedido do cliente.
- Site atual: pregostriangulo.com.br (PHP antigo, 950 px fixos, sem celular). Só português, sem troca de idioma, então o novo é só `pt`.
- Marca: logo vetorizado (potrace) a partir de `images/logo_footer.png` do site atual: `public/assets/logo.svg` (vermelho #E8003A) e `logo-branco.svg`. Vermelho e degradê da faixa (#E8003A até #B4002D) tirados do logo e do `bg_header.png`. O site usa Myriad Pro; títulos em Source Sans 3 (desenho parecido) e texto em Inter.
- Fotos: as 6 do slider do site atual (950x340, `foto-1..6.webp`), mapa "Área de atuação" (`mapa.png`) e os ícones das 8 abas de produto recortados de `aba_pregos.jpg` (`ic-*.png`, fundo tirado). Não há fotos da fábrica no site atual.
- Textos: home e institucional do site atual em `conteudo.mjs`; tabelas das 8 abas em `tabelas.mjs` (acentuação corrigida). Escritos por nós: descrição curta de cada linha, passos de "Como comprar", títulos de seção. Medida em mm é conversão da polegada; diâmetro pela tabela BWG; pregos em escala desenhados em SVG a partir dessas medidas.
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Tradição" (fiel: faixa vermelha, selo do logo, fotos passando, abas de produto), `/b/` "Bitola" (branca e grafite, "Qual prego para o seu trabalho?" com pregos em escala, lista das 8 linhas). 5 páginas em cada: Home, Institucional, Produtos, Representantes, Contato.
- Lista de orçamento: botões "Orçar" guardam os itens no navegador e o formulário envia por e-mail (pregos@) ou WhatsApp (Vanderlei).
- Gerar: `node clientes/pregostriangulo/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: linha 19 x 42 aparece como "3 1/4 x 9" (provável 3 3/4); Ardox está "indisponível no momento"; estados do mapa (9) vêm da imagem do site atual.
