# Divino Imóveis: novo site (prévia Overtus)

Duas versões, cada uma com Início, Imóveis, Avaliação de imóveis, Quem somos, Anuncie ou encomende, Contato e uma página por imóvel (18):
- **A "Quadras"**: clara (marfim + petróleo + verde do logo), Kumbh Sans + Atkinson Hyperlegible. Abertura com uma foto de chácara cortada em 5 faixas, como as listras do logo; os imóveis divididos em "cidade" (salas, lojas, prédios) e "campo" (chácaras, casas, lotes).
- **B "Lago Oeste"**: escura, foto aérea da chácara cód. 1088 em tela cheia, Young Serif + Be Vietnam Pro. Bloco só de chácaras (com a soma dos hectares), faixa sobre o escritório no mesmo prédio das salas que alugam (SEPN 515), imóveis da cidade em fichas.

## Imóveis
- Todos os imóveis que o site atual (plataforma Imobia) mostrava em 05/11/2026: **15 à venda e 3 para alugar, 18 de 18** (temporada: nenhum). Até 5 fotos de cada, webp.
- Dados em `_origem/imoveis.json`. A lista muda: num site de verdade precisa vir do sistema da Imobia.
- Tirei das descrições os celulares pessoais de corretores (Roberto, Orlandina etc.); os contatos ficam só no botão e no quadro lateral.
- Correções de digitação nos textos: "cormeciais" → "comerciais", "Seção de uso" → "Cessão de uso".
- Tipos: "Imóvel padrão" e "Ponto comercial" viraram "Prédio"; "Chacara" e "Galpao" com acento.
- Cód. 774 vem sem bairro; usei "Rota do Cavalo (Sobradinho)", tirado do título.
- Cód. 1082: a 3ª foto era uma tabela/documento, ficou de fora (2 fotos).
- Cód. 752 (terreno, R$ 35.000) tem uma única foto, de piscina estilo resort; parece imagem de divulgação de loteamento, confirmar.
- Cód. 1088, 1081 e 1066 estão sem preço no site atual: aparecem como "Valor sob consulta".

## Para confirmar
- **WhatsApp**: o site atual mostra dois celulares, Gracielle (61) 99601-6111 e Divino (61) 99902-7416, sem dizer qual é WhatsApp. Usei o da Gracielle no botão e nos formulários (palpite). Os dois aparecem como telefone.
- **"Desde 1985"**: o texto do site diz que o Divino começou como corretor autônomo em 1985, com mais de 30 anos de mercado. Usei "desde 1985" / "raiz em 1985" para a imobiliária; confirmar se pode.
- Avaliação judicial: "corretores inscritos no CNAI, com 11 anos de experiência em avaliações judiciais" vem do site atual; o número de anos pode estar desatualizado.
- Títulos e chamadas ("Da sala na Asa Norte à chácara no Lago Oeste", "Terra, sala ou lar", "Comprar e alugar é só uma parte") são texto nosso.
- Formulários (anunciar e encomendar imóvel) abrem o WhatsApp com a mensagem pronta; não há envio por e-mail.
- Fotos são as dos anúncios (feitas com celular). **Logo**: só existe um PNG pequeno (318×120); ampliei e fiz versão clara para fundo escuro. Pedir o arquivo vetorial.
- O site atual está instável: sem "www" dá erro 500, e com "www" dá 500 aleatório. O print do site atual foi feito a partir de uma cópia salva da página, porque o navegador automático recebia erro.
