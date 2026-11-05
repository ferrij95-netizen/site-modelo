# Xavier & Brito Imóveis: novo site (prévia Overtus)

Imobiliária na Av. Itaquera, 2200 (esquina com a Rua Damasqueiro), Jardim Maringá, Zona Leste de São Paulo. CRECI 17.967-J, CNPJ 04.258.981/0001-22.
O site atual roda na plataforma Arbo/Superlógica: fontes caem para Times New Roman, há um bloco vazio enorme abaixo da busca e as fotos da capa são de banco de imagens.

Duas versões, 5 páginas cada (Comprar, Alugar, Crédito e seguros, A imobiliária, Contato) + início + uma página por imóvel:
- **A "Avenida Itaquera"**: clara, vermelho e preto do logo, títulos em Anybody (larga e pesada como o letreiro) e texto em Public Sans. Abre com "Para você morar bem." (frase do site atual), três fotos reais de imóveis e as três frentes da empresa: imóveis, crédito imobiliário e seguros.
- **B "Plantão"**: escura, com "placas" de metal escovado como a faixa IMÓVEIS do logo, Archivo Narrow + Archivo. Imóveis para alugar organizados por bairro, com código e valor.

## Imóveis
- 36 imóveis (19 à venda, 18 para alugar; o AP0774 está nos dois), dos 593 à venda e 79 para alugar que o site informa.
  Vieram dos 8 destaques da home, da 1ª página de venda e de aluguel e de imóveis "relacionados", lidos do `__NEXT_DATA__` de cada página (`_origem/imoveis.json`).
- Até 5 fotos originais de cada imóvel (sem a marca d'água da plataforma), em webp.
- Ficaram de fora: AP0901, AP3527 e AP3529 (mesmo prédio e mesmo texto do AP3530, que foi mantido) e AP0257 (sem bairro no cadastro).
- AP0426 também vem com bairro "1" no cadastro: aparece como "São Paulo".
- Textos dos anúncios mantidos; tirei só o "Ref. ..." do começo e os emojis.

## Para confirmar
- **Horário**: o site atual mostra 12h às 21h (seg-sex) e 12h às 16h (sáb), mas o cadastro da plataforma diz 9h às 18h e sábado 9h às 13h; a diferença de 3 horas é erro de fuso do site. Usei 9h–18h e sáb 9h–13h.
- **Crédito imobiliário e seguros**: o site só tem os banners (financiamento residencial, aquisição de imóveis, credibilidade e agilidade; seguros, proteção, tranquilidade). Os textos curtos dessas seções são nossos, a partir desses banners. Os botões levam aos mesmos links do site atual (seucorretor.digital e thehouse.com.br).
- **Logo**: é o arquivo "melhorado" (3D) do site, com o fundo branco removido; sobre fundo escuro ele vai num cartão claro. Pedir o vetor.
- **Frases nossas**: "no mesmo balcão" e "Prontos para morar ou abrir seu negócio" (títulos), e o resumo do topo.
- **"Zona Leste"**: todos os imóveis publicados ficam na Zona Leste e um dos anúncios usa o termo; o site atual não se apresenta assim.
- Formulários abrem o WhatsApp (11) 93070-5400; o site atual envia por e-mail.
- O anúncio gratuito leva ao formulário de contato (o site atual tem um cadastro de imóvel com login).
