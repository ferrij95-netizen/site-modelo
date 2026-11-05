# AP Minas Imóveis: novo site (prévia Overtus)

Imobiliária no bairro Castelo, Belo Horizonte (Rua Castelo de Lisboa, 1073). Site atual: http://www.apminasimoveis.com.br/ (modelo SIPI, rodapé © 2021, sem HTTPS).

Duas versões, cada uma com Início, Comprar, Alugar, Anuncie seu imóvel, Contato e uma página por imóvel (40):
- **A "Chaveiro"**: clara, no vermelho e no grafite do logo; Lexend + Noto Sans. O "P" do logo é uma chave, então a escolha "comprar, alugar ou anunciar" da abertura vira três etiquetas de chaveiro (com o furo da argola). Gráfico de barras com quantos imóveis há em cada bairro.
- **B "Índice"**: escura, grafite e vermelho; Syne + Work Sans. Números da carteira na abertura e imóveis listados em linhas de índice (foto pequena, código, tipo, bairro, dados, valor), boas para comparar.

## Imóveis
- **40 dos 374 imóveis do site atual em 05/11/2026**: os **15 de 15 para alugar** e os **25 mais novos dos 359 à venda** (maior código). Até 5 fotos de cada (200 fotos, webp, 6,5 MB). A página Comprar avisa que são 25 dos 359.
- Ficou de fora o cód. 91459 (entre os 26 mais novos, mas sem fotos válidas no sistema).
- Dados em `_origem/imoveis.json`, tirados de vendas.asp, locacao.asp e detalhes.asp. Num site de verdade isso precisa vir do sistema da imobiliária (SIPI), que muda todo dia.
- Números da carteira (359 à venda, 135 no Castelo, 54 no Ouro Preto, 46 no Paquetá, 154 apartamentos, 59 coberturas etc.) foram contados na listagem completa do site atual no mesmo dia.
- Muitas descrições estavam em CAIXA ALTA; passei para letra normal e arrumei espaços antes de vírgula, sem mudar as palavras (os erros de digitação do original ficaram).
- Filtro por tipo (Apartamentos / Casas / Comerciais / Lotes) feito só com CSS.
- As fotos do sistema têm marca d'água da AP Minas e no máximo 800 px; por isso nenhuma foto ocupa a tela inteira.

## Para confirmar
- **Preços**: 5 imóveis de aluguel têm "R$ 0,00" no site atual (andar corrido 77091, casa 76632, galpões 77102 e 77093, loja 76701); aparecem como "Sob consulta". O cód. 96511 (5 casas num lote em Contagem, à venda) aparece por "R$ 580,00", claramente errado; também ficou "Sob consulta".
- **Dados que não batem**: cód. 77093 está no bairro Santa Terezinha mas o texto fala em Bandeirantes; cód. 93603 está no Alípio de Melo mas o texto fala no "Bairro Castelo". Mantive o bairro do cadastro.
- **Bairro do escritório**: o site só diz "Rua Castelo de Lisboa, 1073 - Belo Horizonte". Escrevi "Castelo" (é onde fica a rua). Confirmar CEP.
- **Horário**: o site diz "09 as 18:00 hs / 09 as 12:00 hr" sem dizer os dias. Supus segunda a sexta e sábado.
- **WhatsApp**: (31) 99105-4313, marcado "Vendas" no site. Os formulários de contato e anuncie agora abrem o WhatsApp (no site atual iam por e-mail com captcha).
- **CRECI, CNPJ, redes sociais**: não achei no site. Não coloquei.
- **Páginas vazias no site atual**: "Sobre nós" não tem texto e "Lançamentos" diz que não há lançamentos. Não criei página Quem somos para não inventar história; se mandarem um texto, entra fácil.
- **Logo**: o logo do site tem 181 px. Vetorizei o símbolo (A + P em forma de chave com o telhado) e escrevi "MINAS / Imóveis" em texto com o traço vermelho. Pedir o arquivo original.
- **Textos nossos** (o resto é do site atual): o slogan "O imóvel que você procura está aqui!" e "Encontre os melhores apartamentos, casas e imóveis comerciais" são do site; são nossos os títulos de seção, o título da versão B ("Apartamentos, casas e imóveis comerciais na Pampulha"), os três passos do Anuncie e os subtítulos das páginas internas.
- Problemas do site atual que valem citar na conversa: imagem quebrada na página inicial, foto de banco (silhueta de cidade) no topo, páginas Sobre e Lançamentos vazias, preços R$ 0,00, sem HTTPS.
