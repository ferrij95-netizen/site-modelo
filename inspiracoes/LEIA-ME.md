# Banco de inspirações

Sites de referência para criar sites de clientes industriais. É material de consulta, não um estilo da casa: cada cliente continua tendo um visual próprio, escolhido entre 2 ou 3 direções.

Cada pasta tem `NOTAS.md` (cores, fontes, estrutura da home, o que reaproveitar e o que não copiar), `capa.jpg` (primeira tela), `prints/` (computador 1440px e celular 390px, página inteira e primeira tela) e `captura.json` (fontes e cores medidas).
Visão geral de todos: [mosaico.jpg](mosaico.jpg).

## Brasil
| Site | Estilo em uma frase | Etiquetas | Print |
|---|---|---|---|
| [Braskem — braskem.com](braskem/NOTAS.md) | Corporativo azul com ondas, foto grande e fotos de cantos arredondados. | corporativo, colorido, foto-grande, sustentabilidade | [capa](braskem/capa.jpg) |
| [Docol — docol.com.br](docol/NOTAS.md) | Claro e minimalista, com fotos de ambiente grandes mostrando o produto em uso. | claro, minimalista, foto-grande, produto-em-destaque | [capa](docol/capa.jpg) |
| [Embraer — embraer.com](embraer/NOTAS.md) | Corporativo técnico, com títulos condensados, fonte mono e mosaicos de fotos. | corporativo, tecnológico, tipografia-forte, foto-grande | [capa](embraer/capa.jpg) |
| [Gerdau — gerdau.com.br](gerdau/NOTAS.md) | Corporativo em azul e amarelo fortes, com faixas de cor sólida e mercados em letra grande. | corporativo, colorido, tipografia-forte, sustentabilidade | [capa](gerdau/capa.jpg) |
| [Klabin — klabin.com.br](klabin/NOTAS.md) | Natural em tons de verde e bege, com fotos de natureza e grade em xadrez. | colorido, foto-grande, sustentabilidade, corporativo | [capa](klabin/capa.jpg) |
| [Sulpol Polyurethane Machinery — sulpol.com.br](sulpol-com-br/NOTAS.md) | Industrial claro e direto, com um acento verde, carrosséis e grade de ícones por setor. | claro, corporativo, produto-em-destaque | [capa](sulpol-com-br/capa.jpg) |
| [Suzano — suzano.com.br](suzano/NOTAS.md) | Corporativo claro e caloroso, com fotos de pessoas reais, faixas coloridas de marca e números em destaque. | claro, corporativo, sustentabilidade, foto-grande | [capa](suzano/capa.jpg) |
| [Tigre — tigre.com.br](tigre/NOTAS.md) | Colorido e ousado, com tipografia condensada gigante e produto 3D sobre cor chapada. | colorido, tipografia-forte, produto-em-destaque | [capa](tigre/capa.jpg) |
| [Tupy — tupy.com.br](tupy/NOTAS.md) | Corporativo azul-marinho com acento laranja, mapa de unidades e cards escuros sobre foto da fábrica. | escuro, corporativo, tipografia-forte | [capa](tupy/capa.jpg) |
| [Votorantim Cimentos — votorantimcimentos.com.br](votorantim-cimentos/NOTAS.md) | Corporativo claro e limpo, com banner arredondado, azul elétrico e verde-limão da marca. | claro, corporativo, minimalista | [capa](votorantim-cimentos/capa.jpg) |

## Exterior
| Site | Estilo em uma frase | Etiquetas | Print |
|---|---|---|---|
| [Bright Machines — brightmachines.com](bright-machines/NOTAS.md) | Tecnológico preto e branco, com foto escura de fábrica, números grandes e acento vermelho. | escuro, tecnológico, minimalista, foto-grande | [capa](bright-machines/capa.jpg) |
| [Carbon — carbon3d.com](carbon/NOTAS.md) | Tecnológico escuro com brilho roxo, cards arredondados e mosaico de produtos. | escuro, tecnológico, colorido, produto-em-destaque | [capa](carbon/capa.jpg) |
| [Formlabs — formlabs.com](formlabs/NOTAS.md) | Preto e bege com um acento laranja, cards de produto organizados e abas por aplicação. | escuro, tecnológico, produto-em-destaque, tipografia-forte | [capa](formlabs/capa.jpg) |
| [Hadrian — hadrian.co](hadrian/NOTAS.md) | Azul-marinho minimalista com tipografia grande, rótulos mono e um acento amarelo. | escuro, minimalista, tipografia-forte, tecnológico | [capa](hadrian/capa.jpg) |
| [Hydro — hydro.com](hydro/NOTAS.md) | Corporativo claro e editorial, com título serifado, foto de gente da fábrica e mapa de unidades. | claro, corporativo, editorial, sustentabilidade | [capa](hydro/capa.jpg) |
| [Machina Labs — machinalabs.ai](machina-labs/NOTAS.md) | Industrial escuro com títulos em fonte mono, fotos de robôs e cards por setor. | escuro, tecnológico, tipografia-forte, foto-grande | [capa](machina-labs/capa.jpg) |
| [Markforged — markforged.com](markforged/NOTAS.md) | Preto e branco com um acento amarelo forte, vídeos de aplicação e pílulas. | tecnológico, escuro, produto-em-destaque, vídeo | [capa](markforged/capa.jpg) |
| [Sandvik — home.sandvik](sandvik/NOTAS.md) | Corporativo claro e sóbrio, com tipografia grande, cantos retos e faixas pretas. | corporativo, claro, minimalista, tipografia-forte | [capa](sandvik/capa.jpg) |
| [Sika — sika.com](sika/NOTAS.md) | Corporativo amarelo e preto com lema gigante, cards sobre o hero e números em blocos. | corporativo, colorido, foto-grande, tipografia-forte | [capa](sika/capa.jpg) |
| [Vention — vention.com](vention/NOTAS.md) | Tecnológico azul-marinho escuro, com abas, números grandes e casos de sucesso com resultados. | tecnológico, escuro, produto-em-destaque | [capa](vention/capa.jpg) |
| [ZF Friedrichshafen — zf.com](zf/NOTAS.md) | Corporativo claro em azul, com cards de notícias e colunas de produtos com ícones. | corporativo, claro, foto-grande | [capa](zf/capa.jpg) |

## Como adicionar um site
A rede daqui bloqueia muitos sites, então as capturas rodam pelo GitHub: adicione uma linha `nome url paginas` em `inspiracoes/lista.txt` no repositório site-modelo (branch claude/project-thread-r0bkvf) e faça push. O workflow `inspiracao-captura` tira os prints, fecha banners de cookies e devolve tudo em `inspiracoes/<nome>/`. Depois copie para cá e escreva o `NOTAS.md`.

## Capturas com falha (2026-10-08)
- Bloquearam o robô: WEG, Festo, Randoncorp/Fras-le, Marcopolo. Divergent não carregou.
- Ficaram com banner de cookies por cima: Covestro, Trumpf, voestalpine (fora da lista).
- Incompletas, mas mantidas: Docol e Votorantim Cimentos (só a primeira tela saiu); Hadrian, Machina e Embraer com vídeo do topo em branco.
