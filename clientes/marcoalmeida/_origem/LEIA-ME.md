# Clínica Marco Almeida (Natal/RN)

Site atual: http://clinicama.com.br/ · Prévia: marcoalmeida.overtus.com.br (ainda não publicada, feita na nuvem sem deploy).

## Versões
- **A "Verde Clínico"**: fiel ao site atual. Barra cinza com endereço, menu branco, botão verde "Agende sua consulta", os 3 banners da clínica em carrossel e os serviços em quadros com foto.
- **B "Linha Fina"**: mais elegante. Títulos em serifa fina (Cormorant Garamond), fundo marfim, o Dr. Marco na abertura, as 5 áreas numeradas, a jornada do paciente e o quadro "Conversando com meu médico".

12 páginas em cada versão: início, quem somos, serviços, 5 páginas de área (cirurgias plásticas, pequenas cirurgias, procedimentos estéticos, curativos e queimaduras, práticas integrativas), conversando com meu médico, equipe médica, parceiros (Mymoment + Humana Saúde) e contato.

## Conteúdo
- Os 33 procedimentos, os textos e as fichas (tempo de cirurgia, internação, anestesia, recuperação) vieram do site atual (`_origem/servicos.json`).
- Fotos, logo e banners são os do site atual, convertidos para webp.
- Agendamento e formulário vão para o WhatsApp (84) 9 9819-1333.
- Procedimentos marcados "Serviço realizado na empresa parceira Mymoment" aparecem com esse aviso.

## Para confirmar com o cliente
- Os números da página Quem Somos do site atual (22 anos, 6000 atendimentos, 48000 cirurgias) não batem com o texto (fundada em 1999, mais de 60 mil atendimentos). Usamos só os do texto: 1999, 30+ anos do Dr. Marco e 60 mil+ atendimentos.
- A imagem do quadro "Conversando com meu médico" traz "Live quinta 29 abr às 19h" (data antiga). Trocar por uma imagem atual.
- A página da Humana Saúde no site atual tem "Nome do serviço aqui" (texto de exemplo). Escrevemos um texto geral; confirmar quais procedimentos o plano cobre.
- Só o Dr. Marco aparece na equipe médica. Se houver outros médicos, mandar foto e CRM.

## Gerar
`node clientes/marcoalmeida/_origem/gerar.mjs` · prints: `node componentes/gerador/prints.mjs marcoalmeida http://clinicama.com.br/`
Antes de publicar: adicionar a rota no wrangler.
