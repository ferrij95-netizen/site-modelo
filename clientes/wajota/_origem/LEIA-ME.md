# Wajota Imobiliária: novo site (prévia Overtus)

Imobiliária no Tucuruvi, Zona Norte de São Paulo (Wajota Incorporações Imobiliárias, CRECI 002935-J). Site atual: https://www.wajota.com.br/ (ASP antigo, carrossel com 108 bolinhas, fonte Times, página Condomínios dá erro 404 e Financiamento está vazia).

Duas versões, 6 páginas cada (Início, Alugar, Comprar, Anuncie seu imóvel, A Wajota, Contato) + 1 página por imóvel:
- **A "Venezianas"**: clara, azul do logo (#1954bc), títulos em Michroma (letra larga como a do nome no logo) e texto em Onest. A foto de abertura fica entre duas folhas de veneziana, como no símbolo. Escolha "alugar / comprar / anunciar" logo na abertura.
- **B "Zona Norte"**: azul-marinho, Gloock + Schibsted Grotesk. Mosaico de fotos dos imóveis, índice de bairros com quantidade de imóveis e imóveis listados em linhas (foto, bairro, tamanho, valor).

## Imóveis
- 40 dos 108 anúncios do site atual: 16 dos 36 para alugar e 24 dos 72 à venda (dados em `imoveis.json`, tirados em 05/11/2026 de `detalhes.asp?codigo=…`). Até 5 fotos de cada, em webp. O site completo precisaria puxar os anúncios do sistema da imobiliária.
- As fotos do site atual têm só 500 px de largura (fotos de celular); por isso aparecem em tamanho moderado.
- Textos em maiúsculas foram passados para letra normal; tiramos das descrições as linhas "Entre em contato / agende uma visita / telefone" e "Valor: …" (o botão de WhatsApp e o preço já estão na página).
- Cód. 432 (aluguel) e cód. 881 (venda) usam a mesma foto de fachada no site atual (mesmo prédio).
- Cód. 816 "Condomínio fechado" aparece como "Casa em condomínio fechado".
- Cód. 416 está como "Casa" no cadastro, mas o texto diz "sobrado"; a legenda da foto de abertura (versão A) diz "Sobrado na Vila Constança".
- Duas fotos do cód. 108 eram prints do Google Street View; esse imóvel não entrou na seleção.

## A confirmar
- **WhatsApp**: (11) 98163-4685 é o número do botão flutuante e das descrições; formulários e botões "Agendar visita" abrem esse WhatsApp (no site atual o formulário enviava por e-mail).
- **Logo**: o arquivo original tem só 262 px. O símbolo (casa com W e venezianas) foi vetorizado a partir dele; o nome "WAJOTA / imobiliária" foi composto em Michroma, parecida com a letra do logo. Pedir o logo em vetor.
- **Divisões**: Locação, Administração e Venda, Administração de Condomínios vêm do texto "Empresa". As frases curtas de cada divisão são nossas, baseadas nesse texto e nos anúncios ("locação através de seguro fiança ou fiador").
- **Financiamento**: a página antiga tinha só a aba "CAIXA" (simulador comentado no código). O site novo leva para o simulador habitacional da Caixa.
- **Títulos de abertura** ("Abra a janela para o seu próximo imóvel na Zona Norte", "Do Tucuruvi ao Tremembé, a Zona Norte bairro a bairro") e os 3 passos da página Anuncie são nossos.
- Não há fotos do escritório nem da equipe no site atual; seria bom pedir.
- Ficaram de fora: "Trabalhe conosco", "Dicas", "Indicativos" e a área restrita (/sistema/).
