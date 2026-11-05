# Trip Imóveis: prévia do site novo

Site atual: http://www.tripimoveis.com.br/ (WordPress 5.2 com o tema RealHomes, rodapé "© 2018"). Imobiliária de Campo Grande (RJ), CRECI-RJ J7818, que vende apartamentos do Minha Casa Minha Vida na Zona Oeste e na Baixada.

Há duas versões, cada uma com 36 páginas: início, empreendimentos, Minha Casa Minha Vida, A Trip, contato e 31 fichas de empreendimento.

- **A "Hexágono"** é clara, usa o amarelo e o preto do logo, o hexágono como forma e as fontes Unbounded e Rubik.
- **B "Zona Oeste"** é escura, organiza os empreendimentos por bairro e usa Rubik itálico em caixa-alta, como os títulos do site atual.

Gerar: `node clientes/tripimoveis/_origem/gerar.mjs`. O CSS fica em `_origem/css/` e o gerador junta `comum.css` com `a.css` ou `b.css`.

## Empreendimentos: 31 de 31

Entraram **todos os 31** empreendimentos publicados no site, tirados do wp-json em 05/11/2026 (`imoveis.json`). Cada um tem até 5 imagens das galerias, convertidas para webp.

- **Os dados são antigos.** Os anúncios foram publicados entre jan/2019 e dez/2020, e só um foi editado em 2022. Vários desses condomínios provavelmente já foram entregues ou esgotaram. Confirmar com a Trip quais ainda estão à venda e quais valores valem hoje.
- **Valores.** Parcela, entrada e subsídio estão como publicados. Cada ficha avisa que são valores de referência e que é preciso confirmar com um corretor.
  - Olympia Park (R$ 2.500/mês, entrada R$ 40 mil) e Victoria Reserva (R$ 2.300/mês, entrada R$ 30 mil) são casas prontas. O site chama esse valor de "parcela morando", e aqui ele aparece só como "Parcela".
- **Imagens.** São perspectivas e renders das construtoras (Direcional, MRV, Tenda, Emccamp, Novolar, Eólica), que a Trip já usava.
  - Tirei as páginas de folheto: capas "material de treinamento", mapas e anúncios com pessoas.
  - As plantas foram para o fim da galeria.
- **Construtora** de cada empreendimento: deduzi pelo nome dos arquivos e pelo texto do anúncio. Não está em um campo do site.
- **Correções em relação ao site:**
  - A foto de destaque do Cedro Rosa e a do Flor de Laranjeiras estavam trocadas no site atual. Destroquei.
  - "Viva Vida Naturele" virou "Naturale", que é a grafia do texto e das imagens.
  - O West Garden não tinha bairro. Usei Campo Grande, que é o bairro do endereço.
  - "Paciencia" ganhou acento.
  - Os textos dos anúncios foram limpos: links de vídeo .mp4, "Tour Virtual pelo..." (o link não existia mais) e trechos em maiúsculas.
  - Royal Blue, Riviera, Villaggio Verona e Santa Cecília viraram texto mais lista, sem acrescentar nada.
- **Bairros com conflito no site:** Flor de Laranjeiras e Olympia Park têm endereço em Guaratiba, mas estão marcados como Campo Grande. Mantive o bairro marcado.

## Textos e regras do Minha Casa Minha Vida

- O "Sobre" e os três pilares (Oportunidades, Atendimento, Qualidade) são do site atual. Só desfiz as maiúsculas e corrigi "todos mês".
- As **9 vantagens do MCMV** são a lista do site atual, com as regras de 2018/2019: subsídio "até 29 mil", "renda de um salário mínimo pode comprar" e entrada a partir de R$ 99.
  - **O programa mudou desde então** (faixas, tetos e subsídios). É preciso revisar com a Trip antes de publicar.
  - Acrescentei a nota "alguns empreendimentos anunciam até R$ 47.500", porque os próprios anúncios dizem isso.
- O formulário de simulação, com renda e bairro, abre o WhatsApp (21) 99469-3200 com a mensagem preenchida. As faixas de renda do select são minhas.

## Marca

- O logo original tem só 136 px. **Redesenhei em SVG** (`marca.svg`): hexágono preto, prédio isométrico branco e cinza com janelas amarelas.
- A palavra "TRIP imóveis" é texto em Unbounded leve, parecida com o original, mas não é a fonte original.
- Em fundo escuro, o hexágono ganha um contorno amarelo.
- O favicon sai do mesmo SVG.

## Argumentos de venda (o que está quebrado no site atual)

- O menu tem **#VEMPRATRIP, que dá erro 404** ("THE PAGE YOU ARE LOOKING FOR IS NOT HERE!", em inglês).
- A página de contato mostra **"Ops! Algo deu errado. Esta página não carregou o Google Maps corretamente."**
- O site traz "© 2018", WordPress 5.2 e o filtro de busca lista bairros sem nenhum imóvel (Inhoaíba, Pavuna).
- Os vídeos dos anúncios aparecem como texto ("document.createElement('video'); http://...mp4").
- Não tem HTTPS no endereço principal.

## Para confirmar com o cliente

1. Quais empreendimentos ainda estão à venda, e com que parcela, entrada e subsídio hoje.
2. As regras atuais do MCMV, para atualizar a lista de vantagens.
3. Se tem Instagram (o site só mostra o Facebook) e se o WhatsApp (21) 99469-3200 continua.
4. O logo em vetor original, se existir.
5. Se as salas 201 a 204 da Rua Augusto de Vasconcelos, 544 continuam sendo a sede.
