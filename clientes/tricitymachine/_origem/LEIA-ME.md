# Tri-City Machine: como este site é feito

- Cliente: Tri-City Machine Products, Inc., oficina de usinagem completa em Peoria, Illinois (EUA). Site atual: tricitymachine.com (WordPress). Só em inglês, sem bandeiras nem troca de idioma, então o site novo também é só em inglês (`langs: ["en"]`).
- Textos: vieram da página inicial do site atual, salva pelo João em 2026-10-13 (`conteudo.mjs`). As outras páginas do site atual (sobre, serviços, qualidade, estoque e galeria) não foram salvas ainda, então usam só o que aparece na home. Faltam os textos de cada serviço.
- Duas versões em `public/`: `/` escolhe, `/a/` é a Clássica (navy e branco, títulos em Merriweather, faixa de fotos da home atual) e `/b/` é a Industrial (gradiente navy, títulos em Alegreya Sans, blocos recortados). Cada uma com 6 páginas: home, sobre, serviços, qualidade, galeria e contato.
- Depois de mudar qualquer texto: `node clientes/tricitymachine/_origem/gerar.mjs`. Não editar `public/a` ou `public/b` à mão.
- Logo: `logo-branco.png` e `logo-cor.png` são o desenho original do site atual (tcm_logo_2014) recoloridos com fundo transparente. Trocar pelo arquivo original em vetor quando o cliente mandar.
- Fotos: as cinco fotos e a faixa da home do site atual, em webp (`public/assets/img/`).
- Marca: navy #011750 (cor exata do topo da foto de cabeçalho do site atual), azul #0A3D91 e amarelo #F2B705 (acento, tirado das peças amarelas das fotos).
- Falta confirmar com o cliente: textos das páginas de cada serviço, a foto da fachada ou da equipe, e se "Since 1993" (ano de fundação no site atual) está certo, porque o mesmo site diz "more than 47 years", o que não bate com 1993.
