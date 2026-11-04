# AgriArt Peças Agrícolas: como este site é feito

- Cliente: AgriArt Peças Agrícolas, Ribeirão Preto/SP (desde 2015), peças de reposição para transbordos e máquinas agrícolas. Da lista de revendas de máquinas (prospeccao/nichos/revendas-maquinas/LISTA.md).
- Site atual: https://www.agriart.com.br/ (Wix, verde, só português). Páginas: início, sobre-nos, contato e 7 páginas de produtos (transbordos, implementos, plantadeiras-2, pulverizadores-1, tratores, carretas, irrigacao).
- Catálogo: `catalogo.json` tem as 174 peças (nome + foto) lidas das páginas de produtos do site atual (as fotos têm a marca d'água "Agriart" do próprio cliente). A página "plantadeiras" antiga está vazia; a usada é "plantadeiras-2". Cada página antiga pode ter mais peças do que as 40 lidas (a leitura parou em 40 itens nas maiores).
- Marca: logo com a cana (PNG sem fundo do site atual), verde #6ab04c do fundo e verde #1e8a3f do menu. Títulos em Roboto Slab (parecida com a Clarendon do logo e do menu), texto em Inter.
- Fotos de máquinas (transbordos e colhedoras) e canavial: as do topo do site atual.
- Textos: do site atual. Escritos por nós: frases de abertura, os 4 passos "Como comprar" (B) e os textos curtos de qualidade/preço/serviço.
- Versões: A "Canavial" (fiel: logo na pílula verde, faixa de máquinas, menu verde em abas, fundo verde com painel branco, peças com o nome na faixa verde) e B "Balcão de Peças" (busca de peças, catálogo completo com filtro, lista de linhas, passo a passo). 11 páginas cada: Início, Sobre, Produtos e uma página por linha, Contato.
- Cotação: cada peça abre o WhatsApp de vendas (16) 98804-8601 (Cleber) com o nome da peça.
- Não publicado (limite de 20.000 arquivos da Cloudflare). Para publicar falta a rota em wrangler.jsonc; são 174 fotos de peças.
- A confirmar: qual número é o WhatsApp principal de vendas; se o e-mail da expedição é estoqueagriart@gmail.com (o site atual escreve "gmai.com"); se há marcas representadas (o site guarda logos da Marcher, Ikeda e ADR, mas não os mostra).
