# Versão "Clássica": herança italiana, papel creme, azul-marinho da marca, títulos em Tinos (a fonte do logotipo).
from comum import *

def cabecalho(p):
    return f'''<header class="topo"><div class="tricolor"></div><div class="barra">
<a class="marca" href="./" aria-label="Início">{logo()}<span>Mecânica desde 1960</span></a>
<nav class="menu">{nav(p)}</nav>
<a class="botao botao-pequeno" href="orcamento.html">Pedir orçamento</a>
<button class="abrir-menu" data-menu aria-label="Menu"><i></i><i></i><i></i></button></div></header>'''

def rodape():
    return f'''<footer class="rodape"><span>{RUA} · {BAIRRO} · CEP {CEP}</span><span><a href="tel:{TEL_HREF}">{TEL}</a> · <a href="mailto:{EMAIL}">{EMAIL}</a></span><span><a href="creditos.html">Créditos das fotos</a> · <a href="/">Outra versão</a></span></footer>'''

def foto(nome, alt, cls='foto'):
    return f'<figure class="{cls}"><img src="/img/{nome}.jpg" alt="{e(alt)}" loading="lazy"></figure>'

def corpo(p):
    if p == 'index':
        return f'''<section class="inicio">
<div class="texto"><p class="sobre">Pinheiros · São Paulo · desde 1960</p>
<h1>Cuidamos do seu carro como se fosse nosso.</h1>
<p class="lead">Oficina mecânica multimarcas, de nacionais a importados, em sede própria na Rua Fradique Coutinho. Manutenção, diagnóstico eletrônico e preparação, com orçamento pelo WhatsApp.</p>
<div class="acoes"><a class="botao" href="orcamento.html">Pedir orçamento</a><a class="botao botao-linha" href="servicos.html">Ver serviços</a></div>
<ul class="fatos"><li><b>1960</b><span>ano de fundação</span></li><li><b>Sede própria</b><span>em Pinheiros, SP</span></li><li><b>Scanner OBD2</b><span>diagnóstico eletrônico</span></li></ul></div>
<div class="imagem">{foto('oficina-restauracao', 'Carro em restauração dentro de uma oficina')}<img class="selo" src="/img/selo-1960.png" alt="Selo De Filippo 1960"></div>
</section>'''
    if p == 'oficina':
        return f'''<section class="duas">
<div class="texto rolagem"><p class="sobre">A oficina</p><h1>Tradição desde 1960, em sede própria em Pinheiros.</h1>
<p>A De Filippo nasceu em 1960 com um compromisso simples: dar a cada cliente um atendimento diferenciado. Há décadas atendemos em sede própria na Rua Fradique Coutinho, com equipe especializada em reparação automotiva e equipamentos de diagnóstico.</p>
<p>Trabalhamos com carros nacionais e importados, de todas as marcas, com a mesma atenção que daríamos ao nosso próprio carro.</p>
<div class="destaque"><h2>Vai comprar um carro?</h2><p>Na compra de um carro novo ou seminovo, consulte-nos: avaliamos o veículo e recomendamos a melhor opção, mesmo que você esteja negociando com outra loja. Venha tomar um café e conhecer a oficina.</p></div>
<a class="botao" href="contato.html">Como chegar</a></div>
<div class="arquivo"><p class="legenda">Do arquivo da De Filippo</p>
<div class="grade-arquivo"><img src="/img/real-loja.jpg" alt="Fachada da De Filippo"><img src="/img/real-dentro.jpg" alt="Interior da oficina"><img src="/img/real-oficina.jpg" alt="Carros na oficina"><img src="/img/real-ftcorr.jpg" alt="Foto antiga de corrida"><img src="/img/real-ftcorr1.jpg" alt="Foto antiga de largada"><img class="selo-arquivo" src="/img/selo-1960.png" alt="Selo De Filippo 1960"></div></div>
</section>'''
    if p == 'servicos':
        cards = ''.join(f'''<a class="cartao" href="{s['slug']}.html">{foto(s['foto'], s['titulo'])}<div><h2>{s['titulo']}</h2><p>{s['resumo']}</p><span class="mais">Ver detalhes</span></div></a>''' for s in SERVICOS)
        return f'''<section class="servicos"><div class="cabeca"><div><p class="sobre">Serviços</p><h1>Tudo o que o seu carro precisa, em um só lugar.</h1></div><p>Diagnóstico antes de qualquer troca, peças recomendadas pelo fabricante e só o serviço que for necessário.</p></div>
<div class="cartoes">{cards}</div>
<div class="faixa"><span><b>Avaliação antes da compra.</b> Vai comprar um usado? Traga o carro para uma avaliação.</span><a href="orcamento.html">Agendar pelo WhatsApp →</a></div></section>'''
    for s in SERVICOS:
        if p == s['slug']:
            itens = ''.join(f'<li><h3>{t}</h3><p>{d}</p></li>' for t, d in s['itens'])
            outros = ''.join(f'<a href="{o["slug"]}.html">{o["titulo"]}</a>' for o in SERVICOS if o is not s)
            return f'''<section class="detalhe">{foto(s['foto'], s['titulo'], 'foto foto-alta')}
<div class="texto"><p class="sobre"><a href="servicos.html">Serviços</a> / {s['titulo']}</p><h1>{s['titulo']}</h1><p class="lead">{s['intro']}</p>
<ul class="itens rolagem">{itens}</ul>
<div class="acoes"><a class="botao" href="orcamento.html">Pedir orçamento</a><span class="outros">Veja também: {outros}</span></div></div></section>'''
    if p == 'compromisso':
        itens = ''.join(f'<li><b>{i + 1}</b><p>{t}</p></li>' for i, t in enumerate(ETICA))
        return f'''<section class="compromisso"><div class="texto"><p class="sobre">Compromisso</p><h1>Nosso código de ética.</h1>
<p class="lead">Seguimos o código de ética dos profissionais automotivos certificados pela ASE Brasil. É ele que orienta cada orçamento e cada serviço.</p>
<blockquote>“Tratar o carro do cliente como se fosse nosso.”</blockquote></div>
<ol class="etica rolagem">{itens}</ol></section>'''
    if p == 'orcamento':
        return f'''<section class="duas orcamento"><div class="texto"><p class="sobre">Orçamento</p><h1>Peça seu orçamento pelo WhatsApp.</h1>
<p class="lead">Conte qual é o carro e o que está acontecendo. A mensagem chega pronta no WhatsApp da oficina e respondemos por lá.</p>
<p class="contato-rapido">Prefere ligar? <a href="tel:{TEL_HREF}">{TEL}</a></p>
<img class="selo-pequeno" src="/img/selo-1960.png" alt=""></div>
{formulario('formulario')}</section>'''
    if p == 'contato':
        return f'''<section class="duas contato"><div class="texto"><p class="sobre">Contato</p><h1>Venha nos conhecer.</h1>
<dl><dt>Endereço</dt><dd>{RUA}<br>{BAIRRO}<br>CEP {CEP}</dd>
<dt>Telefones</dt><dd><a href="tel:{TEL_HREF}">{TEL}</a><br><a href="tel:{TEL2_HREF}">{TEL2}</a> (telefax)</dd>
<dt>E-mail</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></dl>
<div class="acoes"><a class="botao" href="{wa()}" target="_blank" rel="noopener">WhatsApp</a><a class="botao botao-linha" href="{MAPA}" target="_blank" rel="noopener">Abrir no mapa</a></div></div>
<iframe class="mapa" src="{MAPA_EMBED}" loading="lazy" title="Mapa da Oficina De Filippo" referrerpolicy="no-referrer-when-downgrade"></iframe></section>'''
    if p == 'creditos':
        return f'''<section class="creditos rolagem"><p class="sobre">Créditos</p><h1>Fotos ilustrativas</h1><p>As fotos marcadas “Do arquivo da De Filippo” são da própria oficina. As demais são ilustrativas, do Wikimedia Commons, usadas conforme a licença de cada uma:</p><ul>{creditos_lista()}</ul></section>'''

CSS = r'''
:root{--creme:#F6F3EC;--papel:#FFFDF8;--tinta:#16181D;--cinza:#5B5E66;--linha:#DCD5C6;--marinho:#04146C;--marinho-2:#0B2190;--vermelho:#BE0102;--verde:#0B6B3A;--ouro:#A88E5E;
--serif:Tinos,'Times New Roman',serif;--sans:'Source Sans 3',system-ui,sans-serif;--h:clamp(56px,8.5vh,78px);--pad:clamp(20px,4vw,64px)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--creme);color:var(--tinta);font:400 clamp(15px,1.05vw + .35vh,17.5px)/1.55 var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit}img{display:block;max-width:100%}
h1,h2,h3{font-family:var(--serif);font-weight:400;letter-spacing:-.01em;line-height:1.08;color:var(--marinho)}
h1{font-size:clamp(2rem,2.2vw + 2.6vh,4.1rem);margin-bottom:clamp(10px,2vh,22px)}
h2{font-size:clamp(1.3rem,1vw + 1.2vh,1.9rem)}h3{font-size:1.2rem}
.sobre{font:600 .74rem/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--ouro);margin-bottom:clamp(10px,2vh,20px);display:flex;align-items:center;gap:12px}
.sobre::before{content:"";width:34px;height:1px;background:var(--ouro)}
.sobre a{text-decoration:none}
.lead{font-size:1.08em;color:var(--cinza);max-width:36em}
.botao{display:inline-flex;align-items:center;gap:8px;background:var(--marinho);color:#fff;text-decoration:none;font-weight:600;padding:.85em 1.5em;border-radius:2px;border:1px solid var(--marinho);transition:background .2s}
.botao:hover{background:var(--marinho-2)}
.botao-linha{background:transparent;color:var(--marinho)}.botao-linha:hover{background:var(--marinho);color:#fff}
.botao-pequeno{padding:.6em 1.1em;font-size:.92em}
.acoes{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:clamp(14px,3vh,30px)}
/* estrutura: no computador cada página cabe na janela */
.app{min-height:100dvh;display:flex;flex-direction:column}
main{flex:1;display:flex;flex-direction:column;padding:clamp(16px,3.5vh,44px) var(--pad)}
main>section{flex:1}
@media (min-width:900px) and (min-height:560px){
 html,body{height:100%;overflow:hidden}
 .app{height:100dvh}
 main{min-height:0}
 main>section{min-height:0}
 .rolagem{overflow:auto;scrollbar-width:thin;scrollbar-color:var(--linha) transparent}
}
.topo{background:var(--papel);border-bottom:1px solid var(--linha);position:relative;z-index:5}
.tricolor{height:4px;background:linear-gradient(90deg,var(--verde) 0 33.3%,#fff 0 66.6%,var(--vermelho) 0)}
.barra{height:var(--h);display:flex;align-items:center;gap:clamp(16px,3vw,48px);padding:0 var(--pad)}
.marca{display:flex;align-items:center;gap:14px;text-decoration:none}
.marca .logo{height:calc(var(--h) - 18px);width:auto}
.marca span{font:600 .68rem/1.2 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--ouro);max-width:7em}
.menu{display:flex;gap:clamp(14px,2vw,34px);margin-left:auto}
.menu a{text-decoration:none;font-weight:500;color:var(--tinta);padding:6px 0;border-bottom:1px solid transparent}
.menu a:hover,.menu a[aria-current]{color:var(--marinho);border-color:var(--vermelho)}
.abrir-menu{display:none;background:none;border:0;width:40px;height:40px;flex-direction:column;justify-content:center;gap:5px;margin-left:auto}
.abrir-menu i{display:block;height:2px;background:var(--marinho)}
.rodape{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 24px;padding:12px calc(var(--pad) + 70px) 12px var(--pad);border-top:1px solid var(--linha);font-size:.82em;color:var(--cinza);background:var(--papel)}
.rodape a{text-decoration:none}.rodape a:hover{color:var(--marinho)}
.foto{overflow:hidden;background:#ddd;border-radius:2px}.foto img{width:100%;height:100%;object-fit:cover}
/* início */
.inicio{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(24px,4vw,72px);align-items:stretch}
.inicio .texto{display:flex;flex-direction:column;justify-content:center}
.inicio h1{font-size:clamp(2.3rem,2.6vw + 3vh,4.8rem)}
.fatos{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);margin-top:clamp(18px,5vh,56px);border-top:1px solid var(--linha)}
.fatos li{padding:clamp(10px,2vh,18px) 16px 0 0}.fatos li+li{padding-left:16px;border-left:1px solid var(--linha)}
.fatos b{display:block;font:400 clamp(1.2rem,1vw + 1.3vh,1.8rem)/1.1 var(--serif);color:var(--marinho)}
.fatos span{font-size:.85em;color:var(--cinza)}
.inicio .imagem{position:relative;min-height:0}
.inicio .imagem .foto{position:absolute;inset:0}
.selo{position:absolute;left:-46px;bottom:28px;width:clamp(96px,10vw + 4vh,170px);background:var(--papel);border-radius:50%;padding:10px;box-shadow:0 10px 30px rgba(4,20,108,.18)}
/* duas colunas */
.duas{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,72px);align-items:stretch}
.duas .texto{display:flex;flex-direction:column;justify-content:center}
.duas .texto p+p{margin-top:.8em}
.texto>.botao{align-self:flex-start}
.destaque{margin:clamp(14px,3vh,28px) 0;padding:clamp(14px,2.4vh,24px);background:var(--papel);border-left:3px solid var(--vermelho)}
.destaque h2{margin-bottom:6px}
.arquivo{display:flex;flex-direction:column;justify-content:center;min-height:0}
.legenda{font:italic 400 1.05rem var(--serif);color:var(--cinza);margin-bottom:12px}
.grade-arquivo{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;min-height:0}
.grade-arquivo img{width:100%;aspect-ratio:4/3;object-fit:cover;background:#fff;padding:6px;border:1px solid var(--linha);filter:sepia(.15)}
.grade-arquivo .selo-arquivo{object-fit:contain;filter:none}
/* serviços */
.servicos{display:flex;flex-direction:column;gap:clamp(14px,2.6vh,28px)}
.cabeca{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:end}.cabeca h1{margin:0}.cabeca>p{color:var(--cinza)}
.cartoes{flex:1;min-height:0;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,1.6vw,26px)}
.cartao{display:flex;flex-direction:column;background:var(--papel);border:1px solid var(--linha);text-decoration:none;min-height:0;transition:transform .25s,box-shadow .25s}
.cartao:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(4,20,108,.12)}
.cartao .foto{flex:1;min-height:120px;border-radius:0}
.cartao div{padding:clamp(12px,2vh,22px)}.cartao p{color:var(--cinza);font-size:.95em;margin:4px 0 8px}
.mais{font-weight:600;color:var(--vermelho);font-size:.9em}
.faixa{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;padding:14px 20px;background:var(--marinho);color:#fff}
.faixa a{color:#fff;font-weight:600;text-decoration:none}
/* detalhe de serviço */
.detalhe{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(24px,4vw,64px);min-height:0}
.foto-alta{min-height:0}
.detalhe .texto{display:flex;flex-direction:column;min-height:0}
.itens{list-style:none;margin-top:clamp(10px,2vh,20px);border-top:1px solid var(--linha);min-height:0}
.itens li{display:grid;grid-template-columns:minmax(10em,.8fr) 1.2fr;gap:20px;padding:clamp(8px,1.5vh,14px) 0;border-bottom:1px solid var(--linha)}
.itens h3{font-size:1.15rem;color:var(--marinho)}.itens p{color:var(--cinza);font-size:.95em}
.outros{font-size:.9em;color:var(--cinza)}.outros a{margin-left:10px;color:var(--marinho)}
/* compromisso */
.compromisso{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(24px,4vw,72px);min-height:0}
.compromisso .texto{display:flex;flex-direction:column;justify-content:center}
blockquote{margin-top:clamp(14px,3vh,30px);font:italic 400 clamp(1.3rem,1vw + 1.4vh,2rem)/1.25 var(--serif);color:var(--vermelho);padding-left:18px;border-left:2px solid var(--ouro)}
.etica{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:0 28px;align-content:center;min-height:0}
.etica li{display:flex;gap:14px;padding:clamp(10px,2vh,18px) 0;border-bottom:1px solid var(--linha)}
.etica b{font:400 1.7rem/1 var(--serif);color:var(--ouro);min-width:1.1em}
/* orçamento */
.contato-rapido{margin-top:14px}.contato-rapido a{color:var(--marinho);font-weight:600}
.selo-pequeno{width:clamp(80px,6vw + 4vh,130px);margin-top:clamp(14px,4vh,40px)}
.formulario{align-self:center;background:var(--papel);border:1px solid var(--linha);padding:clamp(18px,3.5vh,36px);display:grid;gap:clamp(8px,1.6vh,16px);box-shadow:0 20px 50px rgba(4,20,108,.08)}
.formulario label{display:grid;gap:5px;font-weight:600;font-size:.9em}.formulario label span{font-weight:400;color:var(--cinza)}
.formulario input,.formulario select,.formulario textarea{font:inherit;font-weight:400;padding:.65em .8em;border:1px solid var(--linha);background:#fff;border-radius:2px;color:var(--tinta)}
.formulario input:focus,.formulario select:focus,.formulario textarea:focus{outline:2px solid var(--marinho);outline-offset:-1px}
.formulario button{display:flex;align-items:center;justify-content:center;gap:10px;font:600 1em var(--sans);padding:.95em;background:#1F8F4E;color:#fff;border:0;border-radius:2px;cursor:pointer}
.formulario button svg{width:20px;height:20px}
/* contato */
dl{display:grid;grid-template-columns:auto 1fr;gap:clamp(8px,1.8vh,16px) 28px;margin-top:6px}
dt{font:600 .74rem/1.9 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--ouro)}dd a{color:var(--marinho)}
.mapa{width:100%;height:100%;min-height:320px;border:1px solid var(--linha);filter:saturate(.7)}
.creditos ul{margin-top:16px;padding-left:18px;font-size:.88em;color:var(--cinza)}.creditos li{margin:4px 0}
.wa-flutuante{position:fixed;right:18px;bottom:18px;width:54px;height:54px;border-radius:50%;background:#1F8F4E;color:#fff;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:20}
.wa-flutuante svg{width:28px;height:28px}
.formulario button svg,.wa-flutuante svg{flex:none}
@media (min-width:900px) and (max-height:700px){.marca span,.fatos span,.selo-pequeno{display:none}}
@media (max-width:899px){
 .menu{position:fixed;inset:calc(var(--h) + 4px) 0 auto;flex-direction:column;background:var(--papel);padding:16px var(--pad) 24px;border-bottom:1px solid var(--linha);display:none}
 .menu-aberto .menu{display:flex}
 .abrir-menu{display:flex}.barra .botao-pequeno{display:none}.marca span{display:none}
 .inicio,.duas,.detalhe,.compromisso,.cabeca{grid-template-columns:1fr}
 .inicio .imagem{height:62vw}.selo{left:12px;bottom:-30px}
 .cartoes{grid-template-columns:1fr}.cartao .foto{height:200px;flex:none}
 .foto-alta{height:56vw}.itens li{grid-template-columns:1fr;gap:2px}
 .etica{grid-template-columns:1fr}.grade-arquivo{grid-template-columns:repeat(2,1fr)}
 .mapa{height:320px}
}
'''
