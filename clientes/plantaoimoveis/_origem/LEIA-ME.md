# Plantão Imóveis: prévia do site novo

Este arquivo descreve a prévia do site novo da Plantão Imóveis, imobiliária com sede própria no Ouro Preto, região da Pampulha, em Belo Horizonte/MG (CRECI PJ 2957). O site atual é http://www.plantaoimoveis.com.br/principal.asp: roda na plataforma SIPI e não tem HTTPS.

Foram feitas duas versões, cada uma com 46 páginas. As duas têm Início, Comprar, Alugar, Serviços, A imobiliária, Contato e uma ficha para cada um dos 40 imóveis.

- **A "Pampulha":** clara, no vermelho do logo, com o traço da casinha do logo e molduras em linha vermelha como detalhe. Usa as fontes Alata e Hind.
- **B "Plantão":** grafite escura, com letra serifada (Lora e Sen) e um quadro dos últimos imóveis cadastrados, mostrando código, tipo, bairro e valor.

## De onde veio cada coisa

- **Contatos:** endereço, telefones, WhatsApp, e-mail, Instagram, CRECI e link do Google Maps foram copiados do rodapé e dos botões do site atual.
- **Slogan e serviços:** o slogan "Os melhores imóveis da Pampulha e região" e os textos dos quatro serviços são do site atual. As mensagens de WhatsApp dos serviços também vêm dos botões de lá, com a gramática corrigida.
- **Imóveis:** os dados vêm de busca.asp e detalhes.asp, coletados em 05/11/2026. Cada imóvel traz tipo, bairro, valor, IPTU, condomínio, área, quartos, suítes, vagas, descrição e até 5 fotos.
- **Logo:** o logo.png (188x66, vermelho #ed3237) foi redesenhado em vetor (`marca.svg`). O favicon é a casinha do logo.

## Imóveis incluídos: 40 de 400

O site atual anuncia 388 imóveis à venda e 12 para alugar.

- **Aluguel, 8 dos 12:** ficaram de fora 96346 e 98436 (sem fotos) e 96439 e 98508 (só 1 foto).
- **Venda, 32 dos 388:**
  - 15 dos destaques da home. O 15424 ficou de fora porque tem só 1 foto.
  - 17 com os códigos mais altos, que tratamos como os cadastrados mais recentemente.

## Para confirmar com o cliente

1. **WhatsApp:** usamos o (31) 99987-3135, que é o número dos botões de serviço. O site atual também tem um link de WhatsApp para o (31) 3498-3877. Qual é o principal?
2. **Logo:** o logo escreve "Imoveis" sem acento, e mantivemos assim no desenho. Nos textos usamos "Imóveis". O logo foi redesenhado a partir de um PNG minúsculo (188x66), então vale pedir o arquivo original em vetor.
3. **A imobiliária:** a página "Nossa História" do site atual está vazia. Por isso não há história, ano de fundação, equipe nem horário de atendimento. A página "A imobiliária" usa só fatos conhecidos: sede própria, CRECI, serviços e o número de imóveis anunciados. Pedir a história e o horário.
4. **"Últimos cadastrados" (versão B):** são os 10 imóveis à venda desta seleção com os códigos mais altos. Supusemos que código mais alto quer dizer cadastro mais recente.
5. **Textos dos anúncios:** vários deles foram colados de um chatbot sem revisão. Isso dá um bom argumento de venda.
   - Começam com "Claro! Esse imóvel..." (98395), "Claro. Aqui está uma descrição mais completa..." (98357) e "Parece ser uma descrição de imóvel. Se você quiser um texto mais atraente..." (98408).
   - Têm citações de busca, como "([Chaves Na Mão][1])" e "([Wikipedia][1])", e restos de markdown ("###", "---").
   - Removemos esses restos na prévia.
   - No 98395, "Em alguns anúncios, o imóvel aceita:" virou "Aceita:". Confirmar se o imóvel aceita financiamento e FGTS.
6. **Imóvel 98431:** o texto diz "R$ 3.600.000,00", mas o valor anunciado é R$ 3.290.000,00. Usamos o valor anunciado e tiramos o outro valor do texto. Confirmar qual está certo.
7. **Emojis:** os emojis dos anúncios chegam como "?" no site atual, por causa da codificação. Foram removidos.
8. **Fotos:**
   - Muitas fotos têm a marca d'água vermelha do logo bem no centro, e várias têm só 448 px de largura. Fotos sem marca d'água e maiores deixariam o site bem melhor.
   - Em vários imóveis, a primeira foto do anúncio é de banheiro ou corredor. Escolhemos outra foto como capa.
9. **Foto do topo:** não usamos a foto do topo do site atual (a casa com pergolado), porque parece foto de banco de imagens. As fotos de abertura são de imóveis reais da carteira: 98431, 98406, 94856 e 98443.
10. **Erro no site atual:** o rodapé do site atual mostra "Sede Prï¿½pria", um erro de codificação. Também é um argumento de venda.
11. **Nossas frases:** são nossas as frases de abertura e os títulos de seção, por exemplo "Quatro imóveis para conhecer de perto" e "Tem um imóvel? A Plantão cuida dele.".

## Gerar de novo

`node clientes/plantaoimoveis/_origem/gerar.mjs`. Os prints são feitos com `node componentes/gerador/prints.mjs plantaoimoveis http://www.plantaoimoveis.com.br/principal.asp`.
