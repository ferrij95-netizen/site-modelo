# Vêneto Transportes (Caxias do Sul/RS e mais 6 unidades)

Site atual: https://www.venetolog.com.br/ · Prévia: venetolog.overtus.com.br (ainda não publicada, feita na nuvem sem deploy).

## Versões
- **A "Tricolor"**: fiel ao site atual. Vermelho, verde e branco do logo, o bloco "Vêneto Transportes, o seu suporte logístico" com as fotos da frota, os quadros com cantos marcados (história, estrutura, onde está, rastreio), cotação e coleta na entrada e rodapé verde.
- **B "Rodovia"**: mais moderna. Fundo asfalto, faixa tricolor fina, a vista aérea do vídeo institucional na abertura, números da operação e as unidades como uma rota de 010 a 070.

7 páginas em cada versão: início, quem somos (história, estrutura, vídeo), unidades (área de atuação + as 7 unidades com foto, endereço, telefone, e-mail de coleta e áreas), qualidade (política de qualidade + 6 políticas gerais), downloads (licenças com validade + transparência + canal de denúncia), trabalhe conosco e contato.

## Como funciona
- Não há WhatsApp no site atual. O formulário de contato abre o e-mail do visitante já endereçado ao e-mail de coleta da unidade escolhida (os e-mails vieram do aviso de coletas do site atual).
- Rastreamento, currículo e canal de denúncia continuam nos sistemas atuais (rastreamento.venetolog.com.br, curriculo.venetolog.com.br, denuncia.venetolog.com.br).
- As licenças de Caxias do Sul apontam para os PDFs do site atual. As das outras unidades ficam na área de downloads atual.

## Para confirmar com o cliente
- **O site atual foi invadido**: tem dezenas de links escondidos para sites de apostas (mix parlay, sbobet, nagabola) no código da página inicial. Isso prejudica o Google e é um bom argumento de venda.
- "Nossa Estrutura" fala em 6 unidades e 80.000 m² (31.000 construídos), mas a página de localização lista 7 unidades (com São Mateus/ES) que somam mais de 113.000 m². Usamos 7 unidades e não colocamos o total.
- Downloads cita Sumaré-SP, que não aparece nas localizações.
- O vídeo institucional (YouTube) mostra "35 anos". Usamos "desde 1987".
- Fotos: as do site atual são pequenas (banners de 961 px). Fotos novas da frota e dos pavilhões deixariam o site bem melhor.

## Gerar
`node clientes/venetolog/_origem/gerar.mjs` · prints: `node componentes/gerador/prints.mjs venetolog https://www.venetolog.com.br/`
Antes de publicar: adicionar a rota no wrangler.
