# Casa Forte Empilhadeiras (Recife/PE)

Site atual: http://casaforteempilhadeiras.com.br/ · Prévia: casaforte.overtus.com.br (ainda não publicada, feita na nuvem sem deploy).

## Versões
- **A "Amarelo Hyster"**: fiel ao site atual. Barra preta com os telefones, os 4 banners amarelos com a Hyster, o logo em destaque, a faixa amarela com os 4 selos (Hyster, manutenção, máquinas reserva, treinamento) e o bloco "Solicite uma visita sem compromisso".
- **B "Pátio"**: mais moderna. Grafite com faixas zebradas amarelas de pátio, a empilhadeira em destaque na abertura, "Você opera, a manutenção é com a gente" e a locação passo a passo.

5 páginas em cada versão: início, a empresa (objetivo, missão, por que alugar), os produtos (Hyster H-50 FT com ficha técnica), serviços (diferenciais + como funciona) e contato (formulário para WhatsApp + mapa).

## Conteúdo
- Textos, missão, ficha da H-50 FT, telefones, e-mail, endereço e contato (Carlos Augusto Fernandes) vieram do site atual.
- Logo, banners, selos e a foto recortada da empilhadeira são do site atual (convertidos para webp).
- O site atual tem só uma foto real. Para não deixar o site vazio, usamos 5 fotos de domínio público (CC0, rawpixel/Openverse) de empilhadeiras em armazém: operador-hyster, galpao-carga, empilhadeira-retratil, armazem, paletes. **Trocar por fotos da frota e de clientes da Casa Forte.**
- "Como funciona a locação" e "Por que alugar" foram escritos a partir do que o site atual promete (visita sem compromisso, manutenção agendada, máquina reserva, treinamento, atendimento 24 horas). Confirmar com o cliente.

## Para confirmar com o cliente
- A página de contato do site atual mostra (81) 9 8436-9098 no topo, e as outras páginas mostram (81) 9 8272-5749. Usamos 9 9569-8381 (WhatsApp) e 9 8272-5749.
- Os ícones de Facebook e Instagram do site atual não têm link. Pedir os perfis.
- Só um equipamento (H-50 FT) aparece no site atual. Se houver outros modelos (elétrica, retrátil, maior capacidade), mandar a lista.

## Gerar
`node clientes/casaforte/_origem/gerar.mjs` · prints: `node componentes/gerador/prints.mjs casaforte http://casaforteempilhadeiras.com.br/`
Antes de publicar: adicionar a rota no wrangler.
