# Imobiliária Fernando Freitas: novo site (prévia Overtus)

Site atual: http://fernandofreitas.com/ (plataforma Imoview/Universal Software, rodapé © 2018, topo com bloco cinza vazio, seção "Lançamentos" vazia, página de documentos com lorem ipsum e links "#").

Duas versões, cada uma com Início, Comprar, Alugar, Anuncie seu imóvel, A imobiliária, Contato e uma página por imóvel (38):
- **A "Planta"**: clara como papel, vermelho, amarelo e cinza do logo, Gelasio + Mukta. Escolha "comprar / alugar / anunciar" na abertura; blocos amarelo e cinza repetem as caixas da marca.
- **B "Aldeota"**: escura como o rodapé do site atual, amarelo do logo, Asap Condensed + Asap. As quatro caixas da marca viram quatro fotos de imóveis; imóveis à venda listados por código, bairro e valor; faixa amarela com a história da família.

## Imóveis
- **38 de 83**: a 1ª página de cada lista do site em 05/11/2026, **20 dos 29 à venda e 18 dos 54 para alugar** (171 e 175 ficaram de fora por repetirem o 173). As páginas de lista dizem isso ao visitante.
- Até 5 fotos de cada (webp, máx. 1280 px), valores, condomínio, IPTU, atributos e descrição. Dados em `_origem/imoveis.json`. Num site de verdade a lista viria do sistema Imoview da imobiliária.
- Endereço: só rua e número (tirei apto/bloco/sala). Tirei das descrições as linhas de CRECI, de telefone/WhatsApp de corretor e de valores repetidos.
- Filtro por tipo (Apartamentos / Casas e duplex / Comerciais / Terrenos) só com CSS.

## Para confirmar
- **WhatsApp (85) 98863-1444**: tirado do botão do site atual. Telefone fixo (85) 3491-1444, contato@fernandofreitas.com, CRECI 0967-J.
- **Dados que não batem no site atual**:
  - cód. 1663: condomínio R$ 622,00 na ficha, R$ 662,22 no texto (usei o da ficha).
  - cód. 1572: R$ 17.000 no cartão, R$ 20.000 no texto (entrada + parcelas). Usei o do cartão.
  - cód. 33: tipo "Galpão", mas o texto diz "Prédio Comercial 1.042 m²".
  - cód. 1645: bairro Itaoca no cadastro, Montese no título.
- **Fotos**: as do site têm a marca d'água pequena da imobiliária; ficou assim.
- **Logo**: recolori o símbolo do logo-footer.png (preto, amarelo e cinza, como o logo do topo) e escrevi "Imobiliária / Fernando Freitas" em texto. Pedir o arquivo vetorial.
- **Textos nossos** (não estão no site): "Imóveis em Fortaleza com atendimento de família" (A), "Desde 1996 abrindo portas em Fortaleza" (B), os resumos dos serviços (a administração apresentada como "o sonho do fundador", a partir do Quem somos) e os 3 passos de "Anuncie seu imóvel". História, missão e o triângulo "clientes, parceiros e amigos" são do Quem somos do site.
- Área do cliente aponta para o portal atual (portalunsoft.com.br). Página "Documentos" ficou de fora (o site atual só tem lorem ipsum).
