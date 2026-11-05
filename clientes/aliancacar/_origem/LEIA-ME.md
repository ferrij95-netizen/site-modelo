# Aliança Car — site novo (prévia)

Site atual: https://funilariaaliancacar.com.br/ (template Bootstrap da Netgator, sem página "Empresa": o link leva à página de funilaria).
Duas versões, 5 páginas cada (Início, A empresa, Serviços, Antes e depois, Endereços e orçamento):
- **A · Selo**: clara, papel creme e tinta preta, títulos em Marcellus SC (capitais com serifa, como o nome no selo), texto em Libre Franklin, três estrelas do logo como marcador.
- **B · Faixa preta**: blocos laranja e brancos, faixa preta inclinada (a fita do selo) atravessando as seções, títulos em Gabarito e texto em Rethink Sans.

Gerar: `node clientes/aliancacar/_origem/gerar.mjs`

## De onde veio cada coisa
- Textos, 6 serviços, etapas da vitrificação, missão/visão/valores, sustentabilidade, vantagens, números "desde 2007", endereços, telefones, e-mail, Instagram e seguradoras: site atual.
- Fotos: só as reais do site (salão da oficina e fotos de antes e depois do portfólio), em webp. As fotos de banco do site antigo (banners e ilustrações dos serviços) não foram usadas.
- Vídeos: 4 vídeos do canal "funilaria aliancacar" no YouTube que o site antigo incorpora (Porsche Cayenne, Discovery 2022, Mercedes GLA 200, Versa 2021); a prévia mostra a miniatura e leva ao YouTube.
- Selo: redesenhado em vetor (`selo.svg`) a partir do logotipo.png de 140 px. O nome "ALIANÇA CAR" foi reescrito em Marcellus SC, parecida mas não igual à fonte original.

## Confirmar com o cliente
1. **"Há mais de 15 anos"** e **"desde 2007"**: o texto é antigo; se a empresa é de 2007, já são mais de 18 anos.
2. **Números de expediente**: usamos os da página inicial (5.980 / 1.020 / 1.240 / 475). A página de funilaria mostra números menores e mais antigos.
3. **Seguradoras**: o site só mostra os logos em "Franquias de seguros" (Porto, Itaú, Azul, Marítima, HDI, SulAmérica, Sura, Yasuda, Sompo), sem dizer se há desconto ou credenciamento. A prévia diz apenas que atendemos essas franquias.
4. **WhatsApp**: (11) 94355-2825 (o botão do site antigo já abre o WhatsApp nesse número). O fixo (11) 2676-3141 vale para as duas unidades? Cada unidade tem telefone próprio?
5. **Horário de atendimento**: não aparece no site antigo; não foi colocado.
6. **Cartões**: o site antigo mostra Visa, Mastercard, Visa Electron e Redeshop. Escrevemos "cartões de crédito e débito".
7. **Legendas das fotos**: descrevemos o que se vê (ex.: "capô preto de um Chevrolet"); o site antigo não diz qual serviço foi feito em cada carro.
8. **Fotos pequenas** (350 a 834 px): fotos novas da oficina e dos carros ajudariam muito.
9. **Frases nossas**: títulos como "Seis serviços, uma só equipe", "O que entra amassado sai assim" e "Saiu daqui assim" foram escritos por nós a partir do conteúdo do site.
10. **Domínio**: falta a rota aliancacar.overtus.com.br no wrangler antes de publicar.
