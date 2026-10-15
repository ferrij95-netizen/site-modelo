# Bertolini do Brasil: como este site é feito

- Cliente: Bertolini do Brasil Ltda (Piracicaba/SP), filial comercial da Idromeccanica Bertolini SPA (Reggio Emilia, Itália). Site atual: bertolinipumps.com.br, só em português (sem troca de idioma). Textos e produtos lidos em 2026-10-15.
- `public/`: `/` é a página de escolha, `/a/` versão A "Clássica" (grafite #23242F e vermelho #951A1D do site atual, mesma ordem da home atual) e `/b/` versão B "Industrial" (fundo claro, degradê vermelho→laranja #E2913E do "B" do logo). 15 páginas em cada.
- Gerar: `node clientes/bertolini/_origem/gerar.mjs` (textos, menu e páginas no próprio arquivo). Catálogo em `produtos.json`, extraído das páginas `produtos/*.html` do site atual; fichas técnicas e catálogos em PDF apontam para os arquivos do site atual.
- Imagens: todas do site atual (`img/`), convertidas por `node clientes/bertolini/_origem/imagens.mjs` (produtos recortados e centralizados em 520×520). Não há foto de banco. 4 modelos não têm foto no site atual (link quebrado lá): aparecem como "Foto no catálogo PDF".
- Fontes: títulos em Oswald (mais parecida com as letras do logo), texto em Inter. Logo: PNG do site (153×191); `logo-escuro.png` é a mesma imagem com o texto em grafite para o fundo claro. Pedir o vetor ao cliente.
- Formulário abre o WhatsApp (19) 98290-4243 com a mensagem pronta.
- Falta confirmar: famílias que o site atual lista mas deixa sem página (bombas de alumínio e latão, Compact, motores elétricos e hidráulicos, acessórios); fotos que faltam; se o 1919 (home) ou 1918 (rodapé do informativo) é o ano certo de fundação.
