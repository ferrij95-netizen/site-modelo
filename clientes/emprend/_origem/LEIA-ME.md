# Emprend Imóveis: prévia

Site atual: http://emprend.com.br/ (rodapé "© 2018 Desenvolvido por Universal Software"). Imobiliária na Asa Norte, Brasília/DF, desde 2011.

Gerar: `node clientes/emprend/_origem/gerar.mjs`

## Versões
- **A "Plano Piloto"**: clara, no azul (#07517e) e no verde (#74b847) do logo. O céu de Brasília (banner do site atual) abre a página, e as barras dos prédios do logo aparecem como detalhe nos títulos. Fontes: Josefin Sans e Hind.
- **B "Eixo"**: escura (azul-noite). A carteira inteira aparece em lista por tipo (salas e lojas, casas e apartamentos, chácaras), com metragem e preço lado a lado. Fontes: Tenor Sans e Lexend.

Páginas: início, imóveis (com filtro), anuncie seu imóvel, a Emprend, contato e uma página por imóvel. São 20 páginas por versão.

## Imóveis
Entraram **os 15 de 15** anunciados no site em 05/11/2026: 7 à venda e 8 para alugar. Cada um tem até 5 fotos do anúncio, convertidas para webp. Os dados estão em `imoveis.json`.

Os textos dos anúncios passaram por uma limpeza:
- tiramos a assinatura "EMPREND IMOBILIÁRIA COMPRA / VENDA / LOCAÇÃO";
- palavras em caixa alta ("EXCELENTE") foram para minúsculas;
- o aviso "valores sujeitos a alteração" virou uma linha fixa no fim de cada ficha.

## Conferir com o cliente
- **Cód. 311 (venda)**: no site, o título diz "para locação". É o mesmo conjunto do Via Capital anunciado para alugar no cód. 34. Precisamos saber se está à venda e para alugar ao mesmo tempo.
- **Cód. 270 (chácara, Gama)**: a ficha diz 500 m², mas o texto diz 10.000 m² de terreno. Usamos 10.000 m², do texto. Também corrigimos "poço com 100m² de profundidade" para "100 m".
- **Cód. 230**: está cadastrado como Chácara, mas o texto começa com "Casa à venda". Mantivemos "Chácara".
- **Cód. 257 e 255 (lojas em Luziânia)**: a ficha diz 0 banheiros, e o texto diz 2. Usamos 2.
- O campo "Andares" das fichas não ficou claro, por isso não aparece.
- **Fotos internas** da página Sobre (sobre1 a 5): não sabemos se são de imóveis da carteira ou de banco de imagens. O mesmo vale para a foto aérea de Brasília.
- **Logo**: ampliado do PNG de 327 px do rodapé. Pedir o arquivo vetorial.
- **CRECI e horário de atendimento**: não estão no site atual, por isso não aparecem. Pedir ao cliente.
- **Fichas cadastrais (PDF)**: os links apontam para os arquivos do site atual (emprend.com.br/download/…). Ao publicar, é preciso copiar os PDFs.
- A Área do cliente aponta para o portal da Universal Software (portalunsoft.com.br/area-do-cliente/emprend).
- Formulários e botões abrem o WhatsApp de venda e locação, (61) 99173-8014.
- Os títulos e chamadas são nossos. As frases "Transformamos expectativas em realizações concretas" e "Mais do que imóveis…" são do texto Sobre do site atual.
