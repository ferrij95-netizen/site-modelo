# Madeireira Nobre: como este site é feito

- Cliente: Madeireira Nobre Maringá, Av. Dr. Alexandre Rasgulaeff 4458, Jardim Imperial, Maringá PR. Escolhida na prospecção do nicho esquadrias/vidros/madeira (21/10/2026), sem pedido do cliente.
- Site atual: madeireiranobremaringa.com.br (PHP próprio). Só português, então o novo é só `pt`.
- Conteúdo: textos da home e da página Empresa, as 12 categorias e os 19 produtos com descrição e medidas, tirados das páginas de produto. Correções: compensado "1,10 cm × 2,20 cm" virou metros; "10,50 t/m²" da telha de concreto lido como 10,5 telhas por m².
- Marca: logo vetorizado (potrace) de `principal/logomarca.png` em `public/assets/logo.svg` (preto, vermelho #CD2D1D, branco). Vinho #883937 dos rótulos e banners do site atual. Títulos em Josefin Sans (mais parecida com o "Nobre" do logo), texto em Inter.
- Fotos: todas do próprio site. Os banners (telhas, tábuas, vigas, compensados) tiveram o texto e o cursor "CLICK!" apagados (inpaint do OpenCV) e o texto foi refeito em HTML. Fachada e caminhão recortados da montagem `principal/empresa.png` (baixa resolução, por isso aparecem pequenas).
- Depoimentos: os do site atual, sem as fotos (parecem de banco de imagem). Confirmar com o cliente se são reais.
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Tradição" (faixa de contatos, cabeçalho com busca, banners, "Madeiras de qualidade direto da serraria", grade com faixa vinho, etapas da obra, depoimentos, visite), `/b/` "Serraria" (bitolas desenhadas em escala, produtos por etapa da obra em abas, tabela das 3 marcas de telha). 17 páginas em cada: Home, Empresa, Produtos, 12 categorias, Calcule, Contato.
- Lista de orçamento: "Adicionar ao orçamento" e a calculadora guardam itens no navegador (`nobre-orcamento`); o contato envia por WhatsApp (44 99138-4020) ou e-mail.
- Calculadora: telha ondulada pela largura útil de 1,05 m e recobrimento de 14 cm (padrão de fabricante, não está no site atual), telha de concreto 10,5/m² + 5%, compensado 2,42 m² por chapa.
- Gerar: `node clientes/madeireiranobre/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: depoimentos; rendimento da telha de concreto; se entrega na obra (o caminhão sugere, mas o site não diz).
