# Fundição Bitencourt: prévia do site novo

Site atual: https://www.fundicaobitencourt.com.br/ (Principal, Empresa, Produtos com 15 fichas, Contato).
Duas versões com as mesmas 19 páginas (Principal, Empresa, Produtos, 15 páginas de produto e Contato):
- **A "Peça acabada":** o marrom-cobre texturizado do site atual na abertura e nas faixas, corpo claro, dourado #e5a300 nos botões. Abre com a foto do anel de cobre no torno e mantém a faixa de telefone, horário e e-mail logo abaixo, como hoje. Linha do tempo com abas por ano.
- **B "Centrifugação":** grafite e dourado, a peça incandescente saindo da centrífuga em tela cheia, os cinco processos de fundição desenhados, produtos por linha com os códigos FB e história em linha vertical.

Gerar: `node clientes/fundicaobitencourt/_origem/gerar.mjs` (prints: `node componentes/gerador/prints.mjs fundicaobitencourt https://www.fundicaobitencourt.com.br/`).

## De onde veio cada coisa
- **Logo:** vetorizado do logo do site (200 x 42 px, `vetorizar-logo.py`): F preto, B verde-petróleo #48887b. Como o original é pequeno, as letras ficam levemente irregulares; um logo em vetor do cliente resolve. Favicon: o "FB" verde e dourado do site.
- **Fontes:** títulos em Saira larga (a mais parecida com o letreiro do logo); texto em Asap, a fonte do site atual.
- **Textos:** todos do site: frase da abertura, as três frases do banner, os quatro pilares, "Comprometimento com a excelência", Quem somos, a linha do tempo 1986 a 2016, "Como produzimos", diferenciais técnicos e socioambientais, política de qualidade, carteira de clientes (50/30/10/02), logística, as duas plantas e as 15 fichas de produto (descrição, dimensões, ligas FB e referências SAE/UNS, aplicações).
- **Fotos:** as 18 fotos de "Nossas instalações", os banners (centrífuga, cadinho, usinagem) e as fotos de produtos e aplicações, convertidas para webp.

## Escrito por nós (não veio do site)
- A frase curta de cada processo de fundição (areia verde, shell molding, coquilhamento, centrifugação, semi-centrifugação) e os desenhos esquemáticos deles (versão B).
- O agrupamento dos produtos em quatro linhas (cobre para eletricidade, bronze para mecânica, alumínio, peças especiais) e a tabela "qual liga vai em cada peça", cruzada das fichas.
- Títulos de seção e legendas das fotos da fábrica.

## Para confirmar com o cliente
1. Não há WhatsApp no site atual: os botões levam ao formulário (abre o e-mail para contato@fundicaobitencourt.com.br) e ao telefone (48) 3433-0147.
2. Se a certificação é ISO 9000 / 9001 e se segue válida.
3. Fotos de bustos e estátuas: usamos só as do site que parecem peças feitas por eles; tiramos a Pequena Sereia e o Einstein, que são monumentos conhecidos.
4. Várias fotos de aplicação (usina, torres de energia, bombas) parecem de banco de imagens no site atual; fotos próprias das peças valorizariam muito.
