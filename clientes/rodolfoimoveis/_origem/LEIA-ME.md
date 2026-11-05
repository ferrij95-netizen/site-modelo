# Rodolfo Imóveis: novo site (prévia Overtus)

Duas versões, cada uma com Início, Alugar, Comprar, Proprietários, A imobiliária, Contato e uma página por imóvel (42):
- **A "Superquadra"**: clara, verde do logo, Raleway (fonte do logo) + Karla, fundo de cobogó, escolha "alugar ou comprar" na abertura.
- **B "Eixo"**: escura, foto em tela cheia, imóveis listados como índice (código, endereço, tamanho, valor), Raleway fina + Libre Franklin.

## Imóveis
- Todos os imóveis que o site atual mostrava em 04/11/2026: **33 para alugar e 9 à venda (42 de 42)**, com valores, condomínio, IPTU, atributos, itens do condomínio e descrição. Até 5 fotos de cada (199 fotos, webp).
- Dados em `_origem/imoveis.json`. A lista muda todo dia: num site de verdade isso precisa vir do sistema da imobiliária (o mesmo que alimenta aluguel_det.php / venda_det.php).
- Dois imóveis não têm foto no site atual (cód. 91 aluguel, cód. 701 venda): mostram "Fotos sob consulta".
- Filtro por tipo (Apartamentos / Lojas e salas / Casas) feito só com CSS.

## Para confirmar
- **WhatsApp dos imóveis de aluguel**: usei o número do botão "Whatsapp" de cada imóvel no site atual, **(11) 96623-5351** (DDD de São Paulo, estranho para Brasília). Os formulários também vão para ele. Confirmar qual é o WhatsApp certo; talvez seja o (61) 99520-1668 da loja de Águas Claras.
- **Venda**: botão vai para Joyce Santos, CRECI-DF 30936, (61) 99872-7187 (texto dos anúncios de venda; um anúncio traz (61) 98132-9681).
- **Telefones**: cabeçalho do site diz (61) 3322-0680; um aviso antigo (2025) no código diz (61) 3329-0680/70 e (61) 9 9264-4046.
- **Filiais**: o site mostra 2 lojas (Asa Norte e Águas Claras); um texto escondido no código fala em matriz na Asa Norte e filiais no **Sudoeste** e em Águas Claras. Usei só as 2 visíveis.
- **Página Proprietários**: as vantagens (análise cadastral, vistoria com laudo, assessoria jurídica, DF Imóveis e W Imóveis etc.) vêm de um bloco comentado no código do site atual, não visível hoje. Deixei de fora "entre as 6 maiores imobiliárias do DF" e "a melhor imobiliária"; confirmar se pode usar.
- **Tipos**: os imóveis cód. 1408 (aluguel) e 640 (venda) vêm sem etiqueta de tipo; pus "Apartamento" (2 quartos na SQS 416) e "Loja" (descrição: "loja com subsolo").
- Espaço proprietário/locatário e cadastro eletrônico continuam apontando para o sistema atual (login).
- **Logo**: vetorizei o "R" verde do logo_rod.png (123 px) e escrevi o nome em Raleway, como no site. Melhor pedir o arquivo original.
- Fotos de topo: SQN 415 (A) e SQN 112 (B), dos próprios anúncios.
