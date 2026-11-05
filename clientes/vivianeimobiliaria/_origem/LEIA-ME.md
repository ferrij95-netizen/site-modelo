# Viviane Imobiliária: novo site (prévia Overtus)

Imobiliária na Av. Portugal, 870, Pampulha, Belo Horizonte (CRECI 19245, do logo). Site atual: http://vivianeimobiliaria.com.br/

Duas versões, 6 páginas + 39 páginas de imóvel cada (Início, Comprar, Alugar, A imobiliária, Consultoria jurídica, Contato):
- **A "Pampulha"**: clara, marfim e dourado do logo, ameixa (#730d56, do site atual) nas etiquetas. Archivo nos títulos (próxima ao nome do logo), Roboto Condensed (fonte do site atual) nos rótulos, Source Sans 3 no texto. Abre com a foto da Lagoa da Pampulha recortada no formato do telhado do logo.
- **B "Noite de BH"**: preta e dourada como o topo do site atual, magenta (#d117b5, do menu atual) só nos detalhes. Roboto Condensed + Manrope. Abre com BH ao pôr do sol, destaque grande da Casa São Luiz e lista de imóveis com foto, bairro e valor.

## Imóveis
- `imoveis.json`: tirado em 05/11/2026 de venda.php (21 páginas), aluguel.php e imovel.php?id=.
- **39 de 189 anúncios** do site: os 2 de aluguel, os 6 destaques da home e os mais recentes com 5 ou mais fotos. Até 5 fotos de cada, em webp.
- O site completo precisaria de integração com o sistema da imobiliária.
- Bairro e tipo saem do título/descrição (o site não tem campo de bairro na ficha). Quando o título não diz o bairro, aparece "BH e região".
- Ajustes: títulos em maiúsculas viraram frase normal e nomes de bairro ganharam acento; cód. V197 tinha o título "Linda com entrada independente" e virou "Casa com entrada independente"; V200 ficou de fora porque parece ser o mesmo imóvel do V190 (mesmo texto).
- Descrições copiadas como estão (inclusive erros de digitação como "goumert"). Alguns anúncios têm dados estranhos no site (área "0m²", lote V183 com IPTU R$ 345 e condomínio R$ 100); campos vazios ou zerados foram escondidos.

## Para confirmar
- **Telefone fixo**: o topo do site atual diz (31) 3495-8339 e o resto do site diz (31) 3495-8389. Usei 8389.
- **WhatsApp**: (31) 99373-6862 (o botão do topo do site atual aponta para o DDD 51 por erro; o certo é 31).
- **E-mail**: o site atual não mostra nenhum; todos os formulários abrem o WhatsApp.
- **Sobre a imobiliária**: a página "Quem Somos" do site atual está vazia ("área de texto"). Usei só o texto da home. Faltam história, ano de fundação e fotos do escritório e da equipe.
- **Consultoria jurídica**: o site só diz "Advocacia Especializada" e o horário. Não há nome do advogado nem OAB.
- **Instagram**: o link do site atual está quebrado; ficou só o Facebook.
- **Fotos de abertura**: Lagoa da Pampulha (crédito "Monique Renne" na própria foto) e vista de BH vêm dos banners do site atual; parecem fotos de terceiros, confirmar direito de uso.
- **Logo**: é o PNG original (713 px, dourado com textura). Um arquivo vetorial ficaria mais nítido. O favicon é o telhado com o "V" do logo.
- Área do corretor e administração de condomínios (boletos etc.) não foram trazidas: o site atual só tem o link "/sistema".
