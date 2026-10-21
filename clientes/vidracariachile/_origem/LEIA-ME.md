# Vidraçaria Chile: como este site é feito

- Cliente: Vidraçaria Chile, Rua João Negrão 2150, Rebouças, Curitiba PR. Escolhida na prospecção do nicho esquadrias/vidros/madeira (21/10/2026), sem pedido do cliente.
- Site atual: vidracariachile.com.br (Joomla/Gantry, agência Klens). Só português, então o novo é só `pt`.
- Conteúdo: textos de Home, Sobre a Empresa, Produtos e Serviços (10 páginas) e Fale Conosco copiados do site atual (marcados em `conteudo.mjs`). Fotos: todas as galerias (`/media/com_unite_gallery/`, nomes com "-" no lugar das maiúsculas, baixar pelo nome literal), 168 fotos em `public/assets/img/<produto>-NN.webp`; `fotos.json` guarda as medidas.
- Marca: logo vetorizado (potrace, 8x) de `logotipo-vidracaria-chile.png`: `logo.svg` (azul #2A2A86 e turquesa #00AFB6), `logo-branco.svg`, e as partes `logo-cv*.svg` (monograma) e `logo-nome*.svg` (nome) para o cabeçalho horizontal da B. Títulos em Questrial (a mais parecida com o "Chile" do logo), texto em Inter; na A, slogan e telefones em Oswald Light como no cabeçalho atual.
- Escritos por nós: textos de Temperados, Fachadas, Muros, Esquadrias (no site atual eram só galeria), resumos curtos dos produtos, "Qual é o seu projeto?" e o corte dos vidros da B, as quatro fases (tiradas da citação e da história).
- Estrutura: `/` escolha (componentes/apresentacao), `/a/` "Vitrine" (faixa com endereço, cabeçalho com telefones, menu azul, 5 destaques emoldurados como os slides atuais, menu lateral de produtos, pagamento e fornecedores), `/b/` "Rua Chile" (curva do logo, ambientes, corte dos vidros, linha do tempo). 15 páginas cada: Home, Empresa, Produtos, 10 produtos, Obras, Contato.
- Orçamento: formulário monta a mensagem e abre o WhatsApp (41) 3333-5477 (o site atual diz que esse número também é WhatsApp). Não há e-mail no site atual.
- "Promoções" do site atual (só uma imagem de 40 anos) virou a página Obras.
- Gerar: `node clientes/vidracariachile/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: se o WhatsApp é o (41) 3333-5477 ou o celular (41) 9806-6669 do topo do site atual; e-mail de contato; textos escritos por nós.
