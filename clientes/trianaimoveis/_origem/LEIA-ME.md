# Triana Imóveis: novo site (prévia Overtus)

Imobiliária em Coqueiros, Florianópolis (Rua Marquês de Carvalho, 181; CRECI 4339-J). O site atual (sistema ATODA, © 2021) é um modelo pronto genérico, com banner de foto de imóvel e cards iguais aos de qualquer imobiliária do mesmo sistema.

Duas versões, 5 páginas + uma página por imóvel (Comprar, Alugar, Financiamento, A Triana, Contato):
- **A "Azulejo"**: clara, no vinho (#8a1b1e) e dourado do azulejo do logo (Triana é o bairro dos azulejos de Sevilha). Cormorant Garamond + DM Sans. Foto de abertura emoldurada por azulejos, faixa de azulejos, escolha "comprar / alugar" logo no começo, busca por tipo, simuladores dos 5 bancos.
- **B "Coqueiros"**: escura cor de vinho, Cinzel (as capitulares do logo) + Inter Tight. Foto em tela cheia (prédio nos Ingleses), imóveis organizados por cidade em listas com código e valor.

## Imóveis
- 38 páginas de imóvel: **todos os 16 de locação** e **22 dos 127 à venda** (os 6 destaques da home + os primeiros da lista com 3 fotos ou mais). Os imóveis 71 e 77 estão para venda e aluguel e têm página nos dois.
- Dados tirados em 05/11/2026 de ResultadoBusca.aspx e ImovelSelecionado.aspx do site atual: título, descrição, valor, condomínio, IPTU, áreas, quartos, banheiros, vagas e itens do imóvel; até 5 fotos de cada (com a marca d'água da própria Triana), em webp. Dados em `imoveis.json`.
- Para o lançamento, o ideal é puxar os imóveis direto do sistema da Triana (ATODA/Agiweb) para não desatualizar.

## Confirmar com o cliente
- **Logo**: o original tem só 200 px. O azulejo foi redesenhado em vetor (`marca.svg`), parecido mas não idêntico; o nome "TRIANA" foi composto em Cinzel. Pedir o arquivo vetorial.
- **WhatsApp**: o site tem dois, (48) 98411-4060 e 98412-4060, sem dizer qual é de vendas ou locação. Botões e formulários usam o 98411-4060; os dois aparecem no rodapé e no contato.
- **Formulários** agora abrem o WhatsApp (o site atual envia por e-mail).
- **Cód. 202**: o título diz "no bairro Coqueiros", mas o campo bairro diz Capoeiras. Mantido como está.
- **Cód. 1319**: título "Casas no mesmo terreno", mas o tipo no sistema é Apartamento. Mantido.
- **Galpões 1486, 1487 e 196 (Palhoça)**: estão em construção (entrega prevista set/2026); as "fotos" são vista aérea e planta do loteamento.
- **Lojas/galpões**: o sistema informa "dormitórios" em imóveis comerciais; no site novo isso não aparece para comerciais.
- **Títulos**: os que estavam todos em maiúsculas viraram frase normal, com nomes de lugar corrigidos (ex.: "florianopolis" → Florianópolis). O texto das descrições não foi alterado, só a caixa alta; tirei a frase "Agende sua visita com um de nossos corretores", porque o botão de visita já faz isso.
- **Nosso texto**: as frases de abertura ("do continente à Ilha", "Assessoria para quem compra, vende, aluga e investe"), os textos curtos da página de financiamento e "com a Ponte Hercílio Luz logo ali" (o escritório fica em Coqueiros, perto da ponte; conferir se querem isso).
- **Quem somos**: o site atual só tem um parágrafo; sem história, ano de fundação, equipe ou fotos do escritório.
- **Fora**: temporada (sem imóveis), newsletter, "Trabalhe conosco", login de clientes.
