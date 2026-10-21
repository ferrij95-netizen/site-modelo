# Destil: como este site é feito

- Cliente: Destil Balanceamentos Industriais, Rua Tupis, 180, Paulicéia (Jd. Pacaembu), Piracicaba SP. Escolhido no piloto 2 de sites ruins (21/10/2026), sem pedido do cliente.
- Site atual: destil.ind.br (Adobe Muse, 2017, sem HTTPS). Todo o conteúdo está em 12 imagens de slide; os textos foram lidos dessas imagens. Só português, sem troca de idioma, então o novo é só `pt`.
- Marca: logo vetorizado (potrace) a partir do slide `destil - site - julho 2017-01.jpg`: `public/assets/logo.svg` (laranja #FF7117, subtítulo grafite) e `logo-branco.svg`; o ® é texto. Laranja do logo da web (#FF7117), grafite e faixa diagonal laranja/cinza tirados dos slides. Títulos em Archivo larga (desenho pesado e largo como o logo), texto em Inter.
- Fotos: recortadas dos slides do site atual (`public/assets/img/*.webp`), sem as faixas e o selo. As 6 de setores vêm da colagem da home. Nenhuma foto de banco nossa.
- Textos do site atual: "A Destil oferece...", "Excelência em balanceamentos...", Quem Somos, Balanceamento, Metalização, Diferenciais (mesmo dia, fresamento), Contato (`conteudo.mjs`). Escritos por nós: legendas das peças, as 5 etapas do processo, nomes dos setores e as frases curtas das listas.
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Faixa" (fiel: tarja laranja, e-mail e telefones no topo, barra grafite com "Outros serviços", colagem de setores sobre a faixa laranja, faixa diagonal dos slides), `/b/` "Rotação" (clara e técnica, rotor laranja, selos, processo em etapas, antes e depois). 6 páginas em cada: Home, Empresa, Balanceamento, Metalização, Diferenciais, Contato.
- Formulário de contato abre o e-mail com a mensagem pronta para destil@destil.ind.br (não há WhatsApp no site atual).
- Gerar: `node clientes/destil/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: setores atendidos (tirados da colagem de fotos, que parecem de banco); capacidade da ponte rolante (15 t lida na foto); WhatsApp; ano de fundação (não aparece no site).
