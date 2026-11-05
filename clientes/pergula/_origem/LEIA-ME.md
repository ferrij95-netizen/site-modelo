# Pérgula Administração de Imóveis: novo site (prévia Overtus)

Administradora de imóveis de aluguel em Goiânia, fundada em fevereiro de 1987 (CJ-4945), Rua 146 nº 167, Setor Marista.
Site atual: https://pergulaimoveis.com.br/ (layout fixo antigo com banner em Flash; o endereço com "www" responde erro 503).

Duas versões, 4 páginas + 1 página por imóvel (Início, Imóveis para alugar, Proprietários, A Pérgula, Contato):
- **A "Pérgula"**: clara, no azul e vermelho do logo; as quatro ripas azuis do símbolo (a pérgula) aparecem sobre a foto da abertura e nos cabeçalhos. Signika + Be Vietnam Pro.
- **B "Só aluguel"**: vermelha, com o lema "Quem só aluga, aluga melhor." grande (Bebas Neue + Rethink Sans) e os imóveis listados como etiquetas de preço, do mais caro ao mais barato.

## Imóveis
- 10 de 10: varri detalhesImoveis.php?c=1..330 e só esses 10 códigos estão ativos (os mesmos da home). Todos são para alugar; o site não tem venda.
- Dados em `_origem/imoveis.json` (tirados em 05/11/2026), até 5 fotos de cada em webp (fotos de celular, 500 a 700 px).
- O site atual não dá título nem endereço aos imóveis. Os títulos curtos ("Apto. 703 no Residencial Park View", "Loja em frente ao Matsuri"...) são nossos, tirados da descrição de cada anúncio.

## Para confirmar com o cliente
- **Salas 1405 e 1406 (Ed. Governador Magalhães Pinto)**: o site mostra aluguel de R$ 150,00 com condomínio de R$ 440 e R$ 530. Parece valor errado; mantive como está.
- **Cód. 267**: a ficha diz 4 quartos e 3 suítes, a descrição diz "03 quartos sendo 02 suítes". Mantive os dois como estão.
- **Cód. 179**: a ficha diz IPTU R$ 60, a descrição diz R$ 70.
- **Cód. 252**: o site chama de sobrado; a descrição cita "piscina desativada".
- Correções de texto: "Playgroud" → "Playground", "Espaço Gourmed" → "Espaço Gourmet"; descrições em maiúsculas passaram para caixa normal (mesmas palavras).
- **WhatsApp**: (62) 98231-7799, que o site atual chama de "Celular/Whatsapp". Todos os formulários abrem esse WhatsApp (o site atual mandava por e-mail).
- **Logo**: o original tem só 336 px; foi recortado (sem o lema e os telefones), fundo removido e ampliado 3×. Pedir o arquivo vetorial.
- **Página Proprietários**: o site atual não lista serviços de administração; usei só o texto da página "Empresa". Se houver lista de serviços (vistoria, repasse, cobrança...), vale incluir.
- **Nossa redação**: frases de abertura e "Uma administradora que faz uma coisa só, há quase quatro décadas" (versão B).
- **Fotos de Goiânia** dos banners do site atual (parque, lago, vista noturna) não foram usadas: são pequenas (626 px) e parecem de terceiros.
- Não há fotos do escritório nem da equipe.
