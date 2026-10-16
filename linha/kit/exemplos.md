# Exemplos de ouro

Trechos de sites que o João aprovou, no mesmo formato JSON que você devolve. Use como padrão de qualidade: o nível de detalhe, o tipo de título, a variedade de seções. Nunca copie os fatos destas empresas para outra.

## Reescritas (genérico -> aprovado)
| Genérico (recusado) | Aprovado |
|---|---|
| "Soluções inovadoras para o agronegócio" | "Produtos veterinários e nutrição animal no Sul do Brasil" |
| "Qualidade e excelência em cada detalhe" | "Desde 1979 levando carne bovina e suína para a mesa de consumidores no Brasil e em 4 continentes" |
| "Nossos Serviços" | "Usinagem, balanceamento, reparo, corte a jato d'água e solda" |
| "Por que nos escolher" | "Do pedido ao campo, com a mesma equipe" |
| "Atendimento personalizado e ágil" | "Televendas das 7h às 19h pelo 0800 049 5555" |
| "Entre em contato e saiba mais" | "Envie o desenho, o croqui ou a peça original e receba a avaliação do serviço" |
| "Trabalhamos com diversos produtos" | lista real: "Bombas, ventiladores, moinhos de martelo, eixos, rolos, mancais, engrenagens, polias, volantes" |
| "Somos referência no mercado" | "4 plantas de abate em SP, MT e RS" (só porque a ficha traz esse número) |

## Exemplo 1: distribuidora de produtos veterinários e nutrição animal (home)
```json
{"slogan":"Produtos veterinários e nutrição animal no Sul do Brasil","botao":"Fazer pedido pelo televendas",
"paginas":[{"slug":"inicio","menu":"Início","chamada":{"sobretitulo":"Distribuidora · SC, PR e RS","titulo":"Medicamentos veterinários e suplementos minerais para todo o rebanho","subtitulo":"Distribuição com frota própria nos três estados do Sul e televendas gratuito das 7h às 19h.","imagem":"foto-2"},
"secoes":[
{"tipo":"cards","subtitulo":"Para cada criação","titulo":"Bovinos de corte e leite, suínos, equinos, ovinos, caprinos e aves","texto":"","itens":[{"titulo":"Bovinos de corte","texto":"Suplementos minerais PNI para cada fase da pecuária de corte.","imagem":"foto-5"},{"titulo":"Bovinos de leite","texto":"Núcleos e suplementos minerais para o rebanho leiteiro.","imagem":"foto-6"},{"titulo":"Suínos","texto":"Medicamentos veterinários dos laboratórios parceiros.","imagem":"foto-7"}]},
{"tipo":"processo","subtitulo":"Como atendemos","titulo":"Do pedido ao campo, com a mesma equipe","texto":"","itens":[{"titulo":"Televendas","texto":"Compra, dúvidas e pós-venda pelo 0800 049 5555, das 7h às 19h.","imagem":""},{"titulo":"Representante","texto":"Equipe de vendas em SC, PR e RS, perto da propriedade.","imagem":""},{"titulo":"Frota própria","texto":"Entrega em todo o Sul com caminhões da Dispra.","imagem":""},{"titulo":"Assistência no campo","texto":"Veterinários e zootecnistas orientando nutrição e prevenção.","imagem":""}]},
{"tipo":"galeria","subtitulo":"Dispra no campo","titulo":"Presente nas principais feiras agropecuárias do Sul","texto":"","itens":[{"titulo":"Expointer, Esteio (RS)","texto":"","imagem":"foto-9"},{"titulo":"Expodireto Cotrijal, Não-Me-Toque (RS)","texto":"","imagem":"foto-10"},{"titulo":"Show Rural Coopavel, Cascavel (PR)","texto":"","imagem":"foto-11"}]},
{"tipo":"cta","subtitulo":"","titulo":"Faça seu pedido pelo 0800 049 5555","texto":"Ligação gratuita de todo o Sul ou contato com o representante da sua região.","itens":[]}]}]}
```

## Exemplo 2: indústria de carnes (home)
```json
{"slogan":"Qualidade e dedicação para sua família desde 1979","botao":"Falar com o comercial",
"paginas":[{"slug":"inicio","menu":"Início","chamada":{"sobretitulo":"Desde 1979","titulo":"Carnes bovinas e suínas do campo à mesa, no Brasil e no exterior","subtitulo":"Cortes, embutidos e miúdos produzidos com tecnologia e inspeção federal, para o mercado nacional e internacional.","imagem":"foto-1"},
"secoes":[
{"tipo":"numeros","subtitulo":"Grupo Estrela","titulo":"","texto":"","itens":[{"titulo":"1979","texto":"ano de fundação","imagem":""},{"titulo":"4","texto":"plantas de abate em SP, MT e RS","imagem":""},{"titulo":"4","texto":"marcas próprias","imagem":""},{"titulo":"4","texto":"continentes atendidos","imagem":""}]},
{"tipo":"cards","subtitulo":"Nossas marcas","titulo":"Estrela, Angus Series, Novilha Jovem e Tchê","texto":"","itens":[{"titulo":"Estrela Alimentos","texto":"A linha completa de cortes bovinos e suínos.","imagem":"foto-3"},{"titulo":"Angus Series","texto":"Seleção de cortes especiais, como T-Bone e Ancho.","imagem":"foto-4"},{"titulo":"Linha Tchê","texto":"Calabresa e embutidos com ingredientes selecionados.","imagem":"foto-5"}]},
{"tipo":"texto","subtitulo":"Da fábrica para sua mesa","titulo":"Boutique de Carne Estrela","texto":"Os produtos de todas as linhas e itens para churrasco, vendidos direto ao consumidor.","imagem":"foto-6","itens":[]},
{"tipo":"lista","subtitulo":"Certificações","titulo":"Habilitações e reconhecimentos","texto":"","itens":[{"titulo":"SIF 2924","texto":"Habilitado para exportar aos Estados Unidos.","imagem":""},{"titulo":"Indicador do Boi DATAGRO","texto":"Premiação Ouro.","imagem":""}]}]}]}
```

## Exemplo 3: oficina de usinagem e reparo (página de serviços)
```json
{"slug":"servicos","menu":"Serviços","chamada":{"sobretitulo":"5 serviços na mesma oficina","titulo":"Usinagem de precisão, balanceamento, reparo mecânico, corte a jato d'água e solda","subtitulo":"Peças novas e reparo de equipamentos críticos a partir de desenho, croqui, ideia ou peça original.","imagem":"foto-2"},
"secoes":[
{"tipo":"processo","subtitulo":"Como funciona","titulo":"Do croqui à peça pronta","texto":"","itens":[{"titulo":"Envie o que tiver","texto":"Desenho, croqui, ideia ou a peça original.","imagem":""},{"titulo":"Avaliação","texto":"Analisamos o serviço e enviamos o orçamento.","imagem":""},{"titulo":"Usinagem ou reparo","texto":"Usinagem, balanceamento, jato d'água e solda na oficina.","imagem":""},{"titulo":"Entrega no prazo","texto":"Peças precisas entregues quando a sua linha precisa.","imagem":""}]},
{"tipo":"lista","subtitulo":"O que usinamos e reparamos","titulo":"Bombas, ventiladores, eixos, engrenagens e mais 24 tipos de peça","texto":"","itens":[{"titulo":"Bombas e ventiladores","texto":"","imagem":""},{"titulo":"Moinhos de martelo e trituradores","texto":"","imagem":""},{"titulo":"Eixos, rolos e mancais","texto":"","imagem":""},{"titulo":"Engrenagens, polias e volantes","texto":"","imagem":""}]}]}
```
