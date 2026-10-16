# AB · como o site é gerado

Site estático em duas versões (A "Essência" e B "Estúdio"), em pt / en / es, gerado a partir do site atual abplast.com.br.

1. `python3 extrair.py <pasta-cache>`: baixa a lista de coleções da API do WordPress e cada página `/colecoes/<slug>/` (com curl; o urllib leva 406) e grava `dados.json` (12 coleções, produtos com atributos, cores, mercados e galerias).
2. `AB_ORIGINAIS=<pasta> python3 -I imagens.py`: baixa as fotos originais e grava os `.webp` em `public/assets/img/` (produtos recortados sobre branco, galerias, banners, cores, logos de clientes).
3. `node gerar.mjs`: lê `conteudo.mjs` (textos das 3 línguas e produtos sem repetição por referência) e `paginas.mjs` (HTML) e grava `public/a/` e `public/b/`.

O visual fica em `public/assets/base.css` (comum), `a.css` e `b.css` (cores e seções de cada versão); o comportamento em `ab.js` (menu, slides, abas, filtros do catálogo com estado no endereço `#tipo=frasco&vol=0`, lista de orçamento salva no navegador e enviada pelo WhatsApp 47 99977-0601).

A fonte dos títulos é a Neulis Alt SemiBold do próprio site da AB (`public/assets/fonts/neulis-semibold.woff2`); o texto é DM Sans, como no site atual.
