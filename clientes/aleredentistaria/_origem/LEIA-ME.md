# Alere Dentistaria (Campo Grande/MS)

Site atual: https://aleredentistaria.com.br/ · Prévia: aleredentistaria.overtus.com.br (ainda não publicada, feita na nuvem sem deploy).

## Versões
- **A "Ameixa"**: fiel ao site atual. Roxo ameixa do logo, Poppins, a família na recepção na abertura, e as mesmas seções da página inicial atual (sobre nós, serviços, equipe, depoimentos, galeria), agora organizadas e funcionando no celular.
- **B "Sorriso Sereno"**: mais delicada. Fundo rosado claro, títulos com serifa (Fraunces), a Dra. Suzi na abertura, uma seção para quem tem medo de dentista e os tratamentos em destaque.

8 páginas em cada versão: início, sobre nós (história da Dra. Suzi, primeira consulta, galeria), serviços (16 tratamentos em 4 grupos), ortodontia, tratamento de canal, equipe (6 dentistas), depoimentos (12 avaliações do Google) e contato.

## Conteúdo
- Textos, serviços, equipe (com CRO quando o site informa), depoimentos, endereço, WhatsApp, e-mail, CNPJ e responsável técnica vieram do site atual e das páginas de ortodontia, endodontia, tratamento de canal e "dentista Campo Grande".
- Fotos (equipe, consultório, edifício, recepção e galeria de pacientes) são as do site atual, convertidas para webp.
- O logo foi montado com o símbolo do site atual + o nome escrito em fonte (o site não tem o logo completo em boa resolução). Pedir o arquivo do logo.
- As descrições curtas de cada serviço (implante, protocolo, lentes etc.) foram escritas por nós, porque o site atual só lista os nomes. Confirmar.

## Para confirmar com o cliente
- O site atual está com o visual quebrado (estilos não carregam): textos soltos, botão do WhatsApp por cima do título. Bom argumento de venda.
- Tempo de profissão: a página inicial fala "mais de 40 anos" e outra página "42 anos". Usamos "mais de 40 anos".
- "Não atendemos convênios" aparece no site atual. Na prévia ficou "atendimento particular, com facilidades de pagamento".
- O e-mail do site é um Gmail pessoal (suzimmvendas@gmail.com). Vale sugerir um e-mail do domínio.
- CRO do Dr. Vitor, da Dra. Renata e da Dra. Sofia não aparecem no site atual.
- A foto da família na recepção parece montagem/banco de imagens.

## Gerar
`node clientes/aleredentistaria/_origem/gerar.mjs` · prints: `node componentes/gerador/prints.mjs aleredentistaria https://aleredentistaria.com.br/`
Antes de publicar: adicionar a rota no wrangler.
