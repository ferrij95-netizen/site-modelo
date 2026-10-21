# Ideal Esquadrias: como este site é feito

- Cliente: Ideal Esquadrias, Av. Bernardino Silveira Amorim, 2333, Rubem Berta, Porto Alegre RS. Escolhida na prospecção do nicho esquadrias/vidros/madeira (21/10/2026), sem pedido do cliente.
- Site atual: idealesquadrias.ind.br (WordPress, tema Firmness de 2014). A API `?rest_route=/wp/v2/media` lista todas as imagens. Só português.
- Marca: `public/assets/logo.svg` e `logo-branco.svg` vetorizados do `logo.png` (448 px) do site com potracer, uma camada por cor. Cores: azul-petróleo #042E46 e laranja #EE8E11 do logo; amarelo #FFCC00 da faixa do menu atual; verde da faixa "Orçamento on-line". Títulos em Exo 2 (mais próxima do "IDEAL" do logo), texto em Inter. Slogan "Arte em alumínio" vem do título do site atual.
- Fotos: todas reais, do site atual (`fotos-originais/`): 14 fotos de WhatsApp de 2025, 4 slides de 2014 e 2 fotos de produto. Nenhuma foto de banco. Box para banheiro e consertos não têm foto.
- Textos: "Quem somos", "Oferecemos" (4 itens), lista de produtos, endereço, telefones e e-mail do site atual. Escritos por nós: descrição de cada linha de produto, legendas, as 4 etapas (orçamento, fabricação, montagem, colocação, tiradas do texto do site) e títulos.
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Vitrine" (fiel ao site atual: faixa amarela, Quem somos, Oferecemos, faixa verde do orçamento, Alguns trabalhos), `/b/` "Caixilho" (azul do logo, janela de quatro vidros como desenho). 4 páginas em cada: Início, Produtos, Trabalhos (filtro + foto ampliada), Localização e contato.
- Formulário: monta a mensagem e abre o WhatsApp ou o e-mail. Sem servidor.
- Gerar: `node clientes/idealesquadrias/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: e-mail certo (o site tem esquadriasideal14 e esquadriaideal14), endereço do Facebook e Instagram (no site atual os ícones não têm link), fotos de box para banheiro, se a fábrica fica no mesmo endereço.
