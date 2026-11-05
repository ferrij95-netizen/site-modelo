# Imobiliária Pompéia: novo site (prévia Overtus)

Imobiliária Pompéia, Av. Mirandópolis, 119, Vila Pompéia, Campinas/SP, CEP 13050-470. CRECI 8256, empresa familiar fundada em 1987. Site atual: http://www.pompeiaimoveis.com.br/ (WordPress de 2018, sem logo no topo, e várias páginas mostram código cru de blocos do WordPress no meio do texto, um bom argumento de venda).

Duas versões, 4 páginas cada (Imóveis, Documentos, A Pompéia, Contato), mais a página inicial e uma página por imóvel:
- **A "Placa"**: clara, vermelho do logo (#c4161c), Mohave + Golos Text. O motivo é a placa amarela "IMOB. POMPÉIA ALUGA" que a própria imobiliária coloca nos imóveis (aparece nas fotos). Na abertura há a escolha "alugar / comprar / tenho um imóvel", e há um bloco só dos comerciais.
- **B "Telhado"**: escura, Kanit + Sarabun. A foto de abertura é recortada no telhado do logo, e os imóveis estão listados por bairro, com a missão e a lista de documentos na página inicial.

## Imóveis
Estão no site **14 de 14** imóveis publicados (lidos em 05/11/2026 da API do WordPress e da página de cada um), em `_origem/imoveis.json`: 12 para alugar e 2 à venda (8951, duas casas em Barão Geraldo por R$ 430.000, e 7578, imóvel comercial na Cidade Jardim por R$ 500.000). 11 são comerciais (salões, barracão, sobreloja). As fotos são as do site atual, até 5 por imóvel, em webp.

## Para confirmar
- **Sem WhatsApp:** o site atual não tem. Os botões ligam para (19) 3227-1099 e os formulários abrem o e-mail. Se houver um WhatsApp, é só pôr no `site.config.json` e no gerador.
- **E-mail:** as páginas dos imóveis no site atual mostram contato@pompeiaimoveis.com.br, mas o resto do site usa perguntas@pompeiaimoveis.com.br. Usei perguntas@ em tudo.
- **Cód. 8900 (Hortolândia):** a descrição escreve os valores por extenso de forma que não bate com os números ("(Tres Mil Reais)", "(Quatro Mil e Quinhentos Reais)"). Tirei os parênteses e deixei só os números.
- **Cód. 8173 (sobreloja, Castelo):** anunciada com 500 m², o que parece muito para uma sobreloja.
- **Cód. 3694 (sala, Jardim do Lago):** sem fotos e sem descrição; pode já estar alugada. Aparece com o telhado do logo e "Fotos sob consulta".
- **Títulos curtos dos imóveis** ("Salão + 2 casas", "Duas casas no mesmo terreno" etc.) são nossos; os títulos antigos eram frases longas de anúncio. Os emojis das descrições foram tirados.
- **Textos nossos:** os títulos da página inicial ("O imóvel certo para morar ou para o seu negócio", "Com a placa na porta", "Salões, barracão e sobreloja nas avenidas de Campinas") e o resumo de uma linha. "Sobre nós", missão, visão, serviços, horário e documentos são do site atual.
- **Logo:** o melhor arquivo achado é um PNG de 560 px (logo22.png na biblioteca do WordPress). Fiz uma versão com o texto em branco para fundo escuro. Vale pedir o vetorial.
- Deixado de fora: busca com filtros avançados (são só 14 imóveis; há um filtro simples por alugar, comprar e comerciais).
