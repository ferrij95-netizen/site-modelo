# JN Imóveis: novo site (prévia Overtus)

Escritório dos corretores Juvenita Silva (CRECI 2761) e Nilton Batista (CRECI 599), com Adriana Barretto (CRECI 20936), Rua Waldemar Falcão, 227, Loja 12, Brotas, Salvador/BA. Site atual: http://www.jnimoveis.com.br/ (plataforma Imobia).

Duas versões, 27 páginas cada (Início, Imóveis com filtro, uma página por imóvel, Quem somos, Financiamento, Anuncie seu imóvel, Fale conosco):
- **A "Esquina"**: clara (creme), azul-marinho e o amarelo do logo em cantoneiras que lembram o "J" e o "N". Títulos em Fjalla One (parecida com o "CORRETORES DE IMÓVEIS" do logo), texto em Nunito Sans. Imóveis em cartões, atalhos por bairro, faixa amarela com os números.
- **B "Balcão"**: azul-marinho com faixa amarela, títulos em Bricolage Grotesque e texto em Karla. Mosaico de fotos na abertura, imóveis em lista (venda e aluguel separados) e os corretores em destaque.

## Imóveis
- **21 dos 22 imóveis** do site atual (14 à venda, 7 para alugar), com título, preço, ficha (quartos, banheiros, vagas, áreas), descrição completa e até 6 fotos cada, todas do próprio site, em webp. Lista em `_origem/imoveis.json`.
- Ficou de fora o Cód. 603 (Graça, R$ 730.000), que não tem nenhuma foto no site atual.
- Títulos que estavam TODOS EM MAIÚSCULAS foram passados para letras normais; o texto é o mesmo.
- Filtro por compra/aluguel, tipo e bairro funciona sem servidor (assets/imoveis.js). Quando o site for ao ar de verdade, o ideal é puxar os imóveis direto da Imobia para não ficar desatualizado.

## Para confirmar
- **WhatsApp**: usei (71) 3014-5165, o número do botão "Chame no WhatsApp" do site atual. Os três celulares do rodapé aparecem como telefone; não sei se algum é WhatsApp.
- **Cód. 607 (Alphaville I)**: a ficha diz "5 dormitórios (sendo 2 suítes) e 4 banheiros", mas a descrição diz "2/4 sendo 2 suítes, 68 m²". Mantive os dois como estão no site; o certo deve ser 2 quartos.
- **"48 anos"**: vem do "Atuando há 48 anos" da página Quem Somos.
- **Textos novos (nossos)**: as frases de abertura ("Comprar, vender ou alugar em Salvador com quem está no mercado há 48 anos", "48 anos abrindo portas em Salvador"), o texto curto de cada serviço e o bloco "Corretores, não um balcão de anúncios". O conteúdo de base (venda, aluguel com administração, documentação simples) é do site atual.
- **Logo**: é o arquivo original (300 px) ampliado 2x; uma versão em vetor ficaria mais nítida. Para fundo claro troquei o branco das letras por azul-marinho. O favicon é o "N" do logo.
- **Financiamento**: os botões abrem os simuladores reais de Caixa, Santander, Banco do Brasil, Bradesco e Itaú (mesmos links do site atual), só com o nome do banco (sem logos de terceiros).
- **Formulários** (contato e anuncie) abrem o WhatsApp com a mensagem pronta; no site atual eles enviavam por e-mail. Os campos do "Anuncie" são os mesmos do site atual.
- Ficaram de fora: o blog (sem conteúdo útil), "Ver favoritos" e o quadro de IGP-M.
