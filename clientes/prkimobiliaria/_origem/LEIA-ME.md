# PRK Imobiliária: novo site (prévia Overtus)

Imobiliária no Tarumã, Curitiba (CRECI J 5920), que também faz consultoria imobiliária e financeira (Built to Suit, Sale Leaseback, avaliação PTAM, carteira para renda). Setor "construcao".

Duas versões, cada uma com Início, Comprar, Alugar, Lançamentos, Soluções (com simuladores e "Quero vender"), A PRK, Contato e uma página por imóvel (16):
- **A "Perspectiva"**: clara, no cinza-pérola do site atual, com o vinho e o vermelho do logo. Noto Serif (a mesma letra do "PRK Imobiliária" do logo) + Hanken Grotesk. As faixas em perspectiva do símbolo aparecem no fundo da abertura e nos topos de página. Abre com "comprar, alugar ou vender".
- **B "Patrimônio"**: escura, para investidor. IBM Plex Serif/Sans. A consultoria vem primeiro, e a carteira aparece como índice (ref., imóvel, tamanho, valor).

## Imóveis
- **Imóveis próprios: todos os 16 do site em 05/11/2026** (9 para alugar, 7 à venda), com valor, área, quartos, banheiros, vagas e a descrição completa do anúncio. Até 5 fotos de cada (webp); a página diz quantas fotos o anúncio tem. Dados em `_origem/imoveis.json`.
- **Lançamentos**: a lista de venda do site atual também traz 320 unidades de lançamentos de construtoras (vêm do Órulo). Agrupei em **79 empreendimentos** numa tabela (plantas, área, valor "a partir de"), **sem fotos**, porque as fotos são das construtoras. Dados em `_origem/lancamentos.json`. Num site de verdade isso deve vir direto do Órulo.
- Terreno ref. 424: as fotos 2 a 5 do anúncio são a Guia Amarela (documento); usei só a primeira (mapa).
- Títulos curtos dos imóveis (ex.: "Sobrado triplex 3 quartos") são nossos, tirados do título em caixa alta de cada anúncio.

## Para confirmar
- **WhatsApp**: todos os botões e formulários vão para **(41) 99280-0636**, o único número do site. O site não diz que é WhatsApp.
- **Fotos de abertura**: os banners do site atual são fotos de banco (skyline de Austin, EUA), por isso não usei. A abertura usa fotos dos próprios imóveis (casa colonial ref. 422 e sala do sobrado ref. 426). Uma foto do escritório ou da equipe ajudaria.
- **Ref. 426**: o site mostra o valor como "R$ 1650.000,00"; usei R$ 1.650.000,00.
- **Textos nossos**: as manchetes das duas versões e as frases curtas de cada solução nos cards da home. Os textos completos das soluções são os do site atual.
- **Consórcio imobiliário**: aparece na lista da página Empresa, mas a página consorcio.php não tem conteúdo; ficou só na lista.
- **Logo**: redesenhei o símbolo (as 4 faixas) em vetor a partir do PNG de 246 px e escrevi o nome em Noto Serif. Melhor pedir o arquivo original.
- Formulário "Quero vender" agora abre o WhatsApp; no site atual ia por e-mail.
