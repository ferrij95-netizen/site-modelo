# Maranello Motors (prévia Overtus)

Oficina mecânica para importados e nacionais, Av. Costábile Romano, 2465, Ribeirânia, Ribeirão Preto/SP.
Site atual: http://oficinamaranello.com.br/ (Mobirise, agência Mentecoletiva, © 2022, sem HTTPS). Problemas do atual: um bloco preto vazio no meio da página inicial, mapa "Onde estamos" em branco, fotos de banco nos serviços, sem formulário que funcione no celular.

## Versões
- **A "Piso de oficina"**: clara, branco do piso epóxi, vermelho do logo e das áreas dos elevadores, grafite da fachada. Rajdhani (inclinada, como o logo) + Geologica.
- **B "Totem vermelho"**: escura, grafite da fachada, barra vermelha vertical como o totem da entrada. Funnel Display + Funnel Sans.
- 5 páginas cada: Início, A Maranello, Serviços, Estrutura, Contato. Gerar: `node clientes/oficinamaranello/_origem/gerar.mjs`.

## De onde veio o conteúdo
- Todos os textos (serviços, listas, "por que alinhar", "quando fazer", sobre, marcas atendidas), telefones, WhatsApp, e-mail, endereço, Instagram e Facebook: site atual.
- WhatsApp (16) 99298-5852: confirmado pelo link api.whatsapp.com do site atual.
- Fotos: só as reais da oficina (estrutura-1 a 5, quem-somos, manutencao, alinhamento, banner-mb com a placa Maranello), em webp. As 4 fotos de serviço de banco de imagens (assessoria, escape, reprogramação, revisão) ficaram de fora.
- Logo: vetorizado do PNG de 220 px do site (`logo-traçado.svg`), versões vermelha e branca.

## Confirmar com o cliente
1. **Horário de atendimento**: o site atual não informa, então a prévia não mostra horário.
2. **Fotos ilustrativas nos serviços**: reprogramação usa a foto dos boxes, escapes usa a BMW no elevador, diagnóstico usa o salão e assessoria usa a recepção. São fotos reais da oficina, mas não mostram esse serviço.
3. **Foto da Mercedes na estrada** (banner do site atual): tem placa Maranello, mas pode ser foto de divulgação de terceiros.
4. **Textos nossos**: títulos como "Seu importado em boas mãos.", "Do preventivo à performance", "Seis especialidades", "Piso claro, elevadores vermelhos, equipamento atual" e as legendas das fotos. Pequenos ajustes de redação ("suspenção" virou "suspensão").
5. **Logo**: pedir o arquivo vetorial original; o traçado vem de um PNG pequeno.
6. Não há ano de fundação no site atual; nenhum número de anos foi usado.
7. Antes de publicar: rota `oficinamaranello.overtus.com.br` no wrangler.
