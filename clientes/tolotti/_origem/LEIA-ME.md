# Mecânica Irmãos Tolotti: como este site é feito

- Cliente: Mecânica Irmãos Tolotti, R. Imperatriz Leopoldina, 62 E, Chapecó SC. Escolhida no lote 3 de sites ruins (21/10/2026), sem pedido do cliente.
- Site atual: tolotti.com.br (FrontPage 4.0, uma página só, sem celular, sem HTTPS). Tem verificação anti-robô: abrir com Playwright (navegador com `--disable-blink-features=AutomationControlled`), não com curl. Só português.
- Marca: não há arquivo de logo. O logo foi redesenhado a partir da parede pintada da oficina (fotos `t-02.jpg` e `01.jpg`): quadrado vermelho com chave azul segurando uma porca, e "MECÂNICA / IRMÃOS / Tolotti" em azul e vermelho (`public/assets/marca.svg` + texto em Archivo). Cores: azul #1F3D99, vermelho #D7262E; ciano #e4f5f7 vem da caixa de serviços do site atual e a seta azul de `bluearro.gif`.
- Fotos: todas reais, do site atual (400 a 600 px, ampliadas 2x): `t-01..t-13.jpg` (visíveis) e `01..05.jpg` (estavam no servidor sem link: fachada, mecânica, recepção, estufa, tintas). Originais em `fotos-originais/`. Nenhuma foto de banco.
- Textos: lista dos 7 serviços, telefones e e-mail do site atual; endereço, telefone novo e nota do Google Maps. Escritos por nós: descrição de cada serviço, as 5 etapas do percurso e títulos.
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Fachada" (branca com faixas azuis, letreiro, caixa ciano com setas), `/b/` "Percurso" (azul, serviços numerados, trilha do guincho à entrega). 4 páginas em cada: Início, Serviços, A oficina, Contato.
- Formulário: monta a mensagem e abre o WhatsApp (celular 1) ou o e-mail. Sem servidor.
- Gerar: `node clientes/tolotti/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: telefones 3323-2033 e 3323-0821 e celulares com o 9 na frente (no site estão no formato antigo); qual celular é o WhatsApp e qual é o do guincho; arquivo original do logo; fotos atuais da oficina (as do site são de por volta de 2000).
