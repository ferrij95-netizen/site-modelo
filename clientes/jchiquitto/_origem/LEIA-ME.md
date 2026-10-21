# J. Chiquitto: como este site é feito

- Cliente: J. Chiquitto & Cia Ltda (equipamentos para movimentação de carga), Rua Antônio Alcântara Machado, 822, Piracicaba SP, desde 1963. Escolhido no lote 4 de sites ruins (21/10/2026, /mnt/project-files/piloto-10d/LISTA.md), sem pedido do cliente.
- Site atual: jchiquitto.com.br (Mobirise, feito pela Ideia Dois). Só português, então o novo é só `pt`.
- Marca: logo do site atual (`logo-branco`, letreiro branco) e versão com o letreiro em verde-petróleo #003E52 do círculo do logo (`logo`, para fundo claro). Azul-marinho #07286B do banner e do topo atual, rodapé em degradê azul como o atual. Títulos: A em Roboto Condensed (a fonte do banner e do site atual), B em Montserrat (mais parecida com o "J.Chiquitto" do logo). Texto em Inter.
- Fotos: todas do site atual. `fotos/empilhadeira-recorte` é a empilhadeira do banner-3 recortada (rembg), `fotos/selo-1963` é o selo do mesmo banner, `fotos/hyster-recorte` é a Hyster amarela da página Empilhadeiras. Fotos de produto (`prod/`) sem a moldura arredondada; marcas em `marcas/`.
- Textos: do site atual em `conteudo.mjs`. Escritos por nós: títulos de seção, "resumo" de cada produto, itens das listas de aluguel/venda/peças/compra e "Até onde a gente levanta" (que só junta capacidades citadas no site atual).
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Selo 1963" e `/b/` "Pátio". 18 páginas em cada: Início, Empresa, Empilhadeiras, Produtos, 12 páginas de produto, Serviços, Contato.
- Cotação: botões de WhatsApp com o nome do produto; formulário de contato monta mensagem para WhatsApp (19) 3417-3450 ou e-mail vendas@.
- Gerar: `node clientes/jchiquitto/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: qual WhatsApp é o certo (o site atual usa três números: 19 3417-3450, 19 3414-3450 e 17 99755-7006; usamos o escrito, 3417-3450); se ainda trabalham com todas as 10 marcas do carrossel; os "anos de mercado" contam a partir de 1963.
