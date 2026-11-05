# Lídder Imobiliária: novo site (prévia Overtus)

Imobiliária de Goiânia/GO (Líder Empreendimentos Imobiliários LTDA, CRECI J 27357), site atual na plataforma Imobzi.

Duas versões, 6 páginas + 38 fichas de imóvel cada (Início, Comprar, Alugar, Aluguel sem fiador, Anuncie, A Lídder, Contato):
- **A "Torres"**: clara, laranja e grafite do logo, Quicksand (próxima do "Lídder" do logo) + Mulish. As torres do logo viram moldura da foto de abertura e o cabeçalho das páginas; etiquetas em caixa grafite com letras espaçadas, como o "IMOBILIÁRIA" do logo.
- **B "Noite em Goiânia"**: escura, abre com a foto de Goiânia à noite do site atual, Montserrat (fonte do site atual) + Figtree; imóveis listados como fichas com o preço em destaque e atalhos por tipo.

## De onde veio o conteúdo
- Textos: home, Quem Somos, Aluguel sem fiador (CredPago) e Portais de Divulgação do site atual.
- Imóveis: API pública do site atual (api2.imobzi.app, a mesma que o site usa), em 05/11/2026. **38 de cerca de 588** (460 à venda e 128 para alugar segundo o site): a 1ª página de Comprar e de Alugar e os destaques da home, com até 5 fotos cada. Saíram 3 imóveis sem foto (3808, 4005, 4214) e 2 que a API não devolveu (1201, 2362). Dados em `imoveis.json`.
- Cada ficha tem o corretor responsável e o WhatsApp dele, como no site atual.
- Equipe: os 12 corretores com CRECI e celular, como na home atual.
- Logo: arquivo original (logo.png), recolorido em grafite para fundo claro; favicon = as torres do logo.

## Conferir com o cliente
- Imóvel 2465 (chácara Flor do Cerrado): a 1ª foto no site atual é um folheto de anúncio ("Seu futuro está aqui"); mandei ela para o fim da galeria.
- Imóvel 4070 está à venda e para alugar; aparece em Comprar com o valor do aluguel na ficha, e também em Alugar.
- Algumas descrições citam telefones de corretores (ex.: Eduardo e Marcela no 3940); mantive como estão.
- Corretores que atendem imóveis mas não aparecem na equipe da home: Paulo Sergio, Eduardo Stywer, Marcela Borghi.
- "Há mais de 20 anos" vem do Quem Somos, sem ano de fundação.
- Formulários abrem WhatsApp (62) 98253-0910 (número do site para locação).
- Títulos de abertura ("Seu imóvel na grande Goiânia, com quem conhece a cidade...") são nossos, a partir do texto do site.
- "Simule um financiamento" do site atual não foi trazido (não achei o destino do link).
- Para o site final, os imóveis devem vir direto do Imobzi (integração), senão ficam desatualizados.
