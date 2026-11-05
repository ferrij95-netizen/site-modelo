# J. Dias Imóveis: novo site (prévia Overtus)

Imobiliária no Barreiro, Belo Horizonte (CRECI PJ-4693). Site atual: http://www.jdiasimoveis.com.br/ (modelo SIPI, rodapé © 2020).

Duas versões, cada uma com Início, Comprar, Alugar, Serviços, Quem somos, Contato e uma página por imóvel (40):
- **A "Barreiro"**: clara, no verde e no azul-petróleo do logo e no amarelo da fachada da loja; Outfit + Source Sans 3; telhado do logo como desenho de fundo; foto da loja na abertura e a escolha "comprar, alugar ou anunciar".
- **B "Vizinhança"**: verde-escura, Petrona (serifada) + Nunito Sans; índice de bairros com o número de imóveis de cada um; imóveis à venda em cartões largos; serviços numerados.

## Imóveis
- **40 dos 64 imóveis ativos no site atual em 05/11/2026**: os **16 de 16 para alugar** e **24 dos 48 à venda** (escolhidos para variar tipo, bairro e preço, só com fotos boas). Até 5 fotos de cada (186 fotos, webp). A página Comprar avisa que são 24 dos 48.
- Dados em `_origem/imoveis.json`, tirados de busca.asp + detalhes.asp do site atual. Num site de verdade isso precisa vir do sistema da imobiliária (SIPI), que muda todo dia.
- Descrições estavam em CAIXA ALTA no site atual; passei para letra normal sem mudar o texto.
- Imóveis de aluguel com só 1 foto: cód. 98427 e 97853.
- Cód. 98538 (venda): a primeira foto é um panfleto, não o imóvel; deixei-o no fim da lista.
- Cód. 96445: galpão para alugar a R$ 45.000/mês, mantido como está no site.
- Filtro por tipo (Casas / Apartamentos / Lotes e sítios / Comerciais) feito só com CSS.

## Para confirmar
- **Endereço**: rodapé do site atual diz "Rua Eduardo Carlos, 75, Bairro Milionários"; o mapa do Google aponta para Flávio Marques Lisboa (mesmo CEP 30620-440). Usei Milionários.
- **WhatsApp**: usei (31) 98340-1616, o do botão wa.me do site atual. Os formulários (contato, anuncie, encomende, avalie, financiamento) agora abrem o WhatsApp; no site atual iam por e-mail com captcha.
- **Logo**: o logo.png do site tem só 157 px. Vetorizei o símbolo (casa no "J") e escrevi "J.Dias Imóveis" em texto. Pedir o arquivo original do logo.
- **Foto**: a única foto da empresa no site é a fachada da loja (slide do topo); usei-a nas duas versões. Os outros slides e o fundo de casa eram fotos de banco e ficaram de fora.
- **Textos nossos** (o resto é do site atual): a linha de baixo do título da versão A ("Casas, apartamentos, lotes e pontos comerciais no Barreiro e região, com quem conhece cada rua do bairro"), o título "Casas e sítio à venda, com fotos e valor" da versão B, o texto do serviço Financiamento (o site atual só tem o formulário) e os subtítulos das páginas internas.
- Visão "referência da região do Barreiro de Cima": texto do site atual, mantido.
- Área do cliente e fichas de cadastro (PDF) continuam apontando para o site/sistema atual.
- Horário (seg. a sex. 8h às 18h, sáb. 8h às 12h), CNPJ 17.993.070/0001-90, e-mail e Instagram @jdiasimoveis: do site atual.
