# Militão Imóveis: novo site (prévia Overtus)

Imobiliária de Fortaleza/CE (CRECI 1336 J) que vende casas, apartamentos e lotes em Fortaleza, no Eusébio e no Aquiraz. O site atual (https://www.militaoimoveis.com.br/) é um WordPress com o tema RealHomes, rodapé "© 2022".

Duas versões. Cada uma tem Início, Imóveis (com filtro), Bairros, A imobiliária, Contato e uma página por imóvel (26 páginas):
- **A "Cumeeira"**: clara, no vermelho e grafite do logo. Títulos em Tomorrow e texto em Albert Sans. A foto de abertura é recortada no formato do telhado da marca, com a faixa vermelha do logo atrás. Tem uma barra com Casas, Apartamentos, Lotes e Por bairro, e separa Fortaleza da Região Metropolitana.
- **B "Litoral"**: escura, com carrossel de fotos em tela cheia. Mostra um índice de todos os imóveis por região (Fortaleza / Eusébio e Aquiraz), do mais caro ao mais barato. Títulos em Geologica e texto em Onest.

## Imóveis
- Estão **todos os 21 anúncios publicados (21 de 21)**, todos à venda. Saíram da API do WordPress do site atual (`?rest_route=/wp/v2/imóvel`) em 05/11/2026.
- Cada imóvel tem até 5 fotos, 103 no total, em webp. As fotos já vêm com a marca d'água da Militão.
- Os dados ficam em `_origem/imoveis.json`, que também guarda o título original e o link de cada anúncio.
- **Títulos**: reescrevemos os títulos (o original estava em caixa alta e às vezes era vago). As descrições são as dos anúncios: só tiramos os emojis, a caixa alta e as linhas de preço repetidas.
- **WhatsApp**: o botão de cada imóvel chama o WhatsApp de casas e apartamentos, (85) 99417-1814. Só o River Lake (lotes) chama o de lotes, (85) 99296-6846. Os dois números são os dos botões do site atual. O formulário de contato vai para o de casas e apartamentos.
- O filtro por tipo (Casas / Apartamentos / Lotes) é feito só com CSS.

## Para confirmar
- **Anúncios antigos**: todos são de abril e maio de 2024, então confirmar quais ainda estão disponíveis e se os valores mudaram.
- **Paço das Águas (cód. AP0016FM)**: o valor cadastrado é R$ 170.000.000, um erro de digitação. Por isso mostramos "Valor sob consulta". Pedir o valor certo (talvez R$ 1.700.000).
- **Carlos Albuquerque Lima (AP002VG)**: o campo de área diz 49 m², mas o texto diz 149 m². Usamos 149 m².
- **Porto Damasco (AP002RM)**: o campo de área diz 180 m², mas o texto diz "metragem 108 metros quadrados". Não mostramos a área até confirmar.
- **Código repetido**: CA0018DC aparece na casa duplex de Messejana e no Jardins de Munique.
- **River Lake**: o anúncio não tem código, e o texto fala em "Paraíso Residencial". Confirmar o nome do loteamento.
- **Jardins de Munique**: o anúncio fala em "pré-lançamento" com entregas de jun/25 a dez/26. Confirmar o estágio da obra e as condições ("a partir de R$ 270 mil, entrada em até 30 meses").
- **Bairro ou cidade que deduzimos**:
  - o Enseada do Mucuripe não tem bairro marcado; usamos Mucuripe, que vem do endereço do mapa;
  - o Residencial Milano não tem localização; usamos Aquiraz, também do endereço do mapa;
  - o San Juan está marcado como Edson Queiroz, mas o texto e o mapa dizem Sapiranga; usamos Sapiranga;
  - a "Linda casa plana ao lado de Messejana" não tem localização nem tipo; ficou "Perto de Messejana".
- **Sem descrição**: a casa plana do Luciano Cavalcante e o Residencial Milano não têm texto. A página monta uma frase com os números do anúncio e pede para chamar no WhatsApp.
- **Dados da empresa**: o site não traz endereço, e-mail, telefone fixo, redes sociais nem texto "quem somos".
  - O CRECI 1336 J só aparece no logo.
  - A página "A imobiliária" usa só o que sabemos: CRECI, regiões, tipos e WhatsApp. Pedir a história, o endereço, o nome do corretor responsável e o Instagram.
- **Textos de chamada**: as frases das aberturas e das seções são nossas e foram escritas a partir dos anúncios.
- **Logo**: vetorizamos o telhado (marca.svg) e escrevemos "Militão" e "Imóveis" em Tomorrow, com a faixa vermelha. É parecido com o original, mas não é igual. Pedir o arquivo vetorial.

## Argumentos de venda (site atual)
- A página "Contato" dá erro 404.
- O site ainda tem o conteúdo de demonstração do tema: corretores fictícios ("Nathan James" e outros), agências de exemplo e páginas de amostra.
- As seções "Imóveis em destaque" e "Aluguel" estão vazias.
- Os endereços aparecem como texto cru do mapa ("Região Geográfica Imediata de Fortaleza, Região Nordeste, Brasil").
- O valor do Paço das Águas aparece como R$ 170 milhões.
- O rodapé diz © 2022.
