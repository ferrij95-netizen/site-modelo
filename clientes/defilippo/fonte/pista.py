# Versão "Pista": noturna, azul-marinho quase preto, bandeira quadriculada do site original e vermelho de corrida.
from comum import *

def cabecalho(p):
    return f'''<header class="topo"><div class="xadrez"></div><div class="barra">
<a class="marca" href="./" aria-label="Início">{logo()}</a>
<nav class="menu">{nav(p)}</nav>
<a class="botao" href="orcamento.html">Orçamento</a>
<button class="abrir-menu" data-menu aria-label="Menu"><i></i><i></i><i></i></button></div></header>'''

def rodape():
    return f'''<footer class="rodape"><span>De Filippo · desde 1960</span><span>{RUA} · {BAIRRO}</span><span><a href="tel:{TEL_HREF}">{TEL}</a></span><span><a href="creditos.html">Créditos das fotos</a> · <a href="/">Outra versão</a></span></footer>'''

def fundo(nome):
    return f'<div class="fundo" style="background-image:url(/img/{nome}.jpg)"></div>'

def corpo(p):
    if p == 'index':
        tiles = ''.join(f'<a class="tile" href="{s["slug"]}.html"><b>0{i + 1}</b><span>{s["titulo"]}</span><small>{s["resumo"]}</small></a>' for i, s in enumerate(SERVICOS))
        return f'''<section class="inicio">{fundo('fiat500-fila')}
<div class="hero"><p class="ano">1960</p><p class="sobre">Oficina mecânica · Pinheiros, São Paulo</p>
<h1>Mecânica de<br>quem entende<br>de carro.</h1>
<p class="lead">Multimarcas, nacionais e importados. Manutenção, diagnóstico eletrônico e preparação, em sede própria na Rua Fradique Coutinho.</p>
<div class="acoes"><a class="botao" href="orcamento.html">Pedir orçamento</a><a class="link" href="oficina.html">Nossa história →</a></div></div>
<div class="tiles">{tiles}<a class="tile tile-wa" href="{wa()}" target="_blank" rel="noopener"><b>{ICONE_WA}</b><span>WhatsApp</span><small>Orçamento rápido, direto com a oficina.</small></a></div>
</section>'''
    if p == 'oficina':
        return f'''<section class="oficina"><div class="texto rolagem"><p class="sobre">A oficina</p><h1>Paixão por automóveis desde 1960.</h1>
<p class="lead">A De Filippo nasceu em 1960 para dar a cada cliente um atendimento diferenciado. Há décadas atendemos em sede própria na Rua Fradique Coutinho, em Pinheiros.</p>
<p>Equipe especializada em reparação automotiva, carros nacionais e importados de todas as marcas, e equipamentos de diagnóstico do mesmo tipo usado pelos fabricantes.</p>
<div class="bloco"><h2>Vai comprar um carro?</h2><p>Avaliamos o novo ou seminovo e recomendamos a melhor opção, mesmo que você esteja negociando com outra loja. O café é por nossa conta.</p></div>
<div class="acoes"><a class="botao" href="contato.html">Como chegar</a></div></div>
<div class="filme"><figure class="f1"><img src="/img/real-ftcorr.jpg" alt="Foto antiga de corrida"></figure><figure class="f2"><img src="/img/real-ftcorr1.jpg" alt="Foto antiga de largada"></figure>
<figure class="f3"><img src="/img/real-loja.jpg" alt="Fachada da De Filippo"></figure><figure class="f4"><img src="/img/real-dentro.jpg" alt="Interior da oficina"></figure>
<p class="legenda">Arquivo De Filippo</p></div></section>'''
    if p == 'servicos':
        cols = ''.join(f'''<a class="coluna" href="{s['slug']}.html">{fundo(s['foto'])}<b>0{i + 1}</b><h2>{s['titulo']}</h2><p>{s['resumo']}</p><span>Ver serviço →</span></a>''' for i, s in enumerate(SERVICOS))
        return f'''<section class="servicos"><div class="cabeca"><p class="sobre">Serviços</p><h1>Do óleo à preparação.</h1></div>
<div class="colunas">{cols}<div class="coluna coluna-extra"><b>04</b><h2>Avaliação antes da compra</h2><p>Vai comprar um usado? Traga o carro e saiba o estado real dele antes de fechar negócio.</p><a class="botao" href="orcamento.html">Agendar</a></div></div></section>'''
    for i, s in enumerate(SERVICOS):
        if p == s['slug']:
            itens = ''.join(f'<li><b>{j + 1:02d}</b><div><h3>{t}</h3><p>{d}</p></div></li>' for j, (t, d) in enumerate(s['itens']))
            outros = ''.join(f'<a href="{o["slug"]}.html">{o["titulo"]}</a>' for o in SERVICOS if o is not s)
            return f'''<section class="detalhe">{fundo(s['foto'])}<div class="painel"><p class="sobre"><a href="servicos.html">Serviços</a> / 0{i + 1}</p><h1>{s['titulo']}</h1><p class="lead">{s['intro']}</p>
<ol class="itens rolagem">{itens}</ol><div class="acoes"><a class="botao" href="orcamento.html">Pedir orçamento</a><span class="outros">{outros}</span></div></div></section>'''
    if p == 'compromisso':
        itens = ''.join(f'<li><b>{i + 1}</b><p>{t}</p></li>' for i, t in enumerate(ETICA))
        return f'''<section class="compromisso"><div class="cabeca"><p class="sobre">Compromisso</p><h1>Código de ética.</h1><p class="lead">O mesmo código dos profissionais automotivos certificados pela ASE Brasil, aplicado em cada serviço.</p></div>
<ol class="etica rolagem">{itens}</ol></section>'''
    if p == 'orcamento':
        return f'''<section class="orcamento">{fundo('bancada')}<div class="texto"><p class="sobre">Orçamento</p><h1>Seu orçamento pelo WhatsApp.</h1>
<p class="lead">Preencha em menos de um minuto. A mensagem chega pronta para a oficina e respondemos por lá.</p><p class="tel">Ou ligue: <a href="tel:{TEL_HREF}">{TEL}</a></p></div>
{formulario('formulario')}</section>'''
    if p == 'contato':
        return f'''<section class="contato"><div class="texto"><p class="sobre">Contato</p><h1>Rua Fradique Coutinho, 60.</h1>
<ul class="dados"><li><small>Endereço</small>{RUA} · {BAIRRO} · CEP {CEP}</li><li><small>Telefones</small><a href="tel:{TEL_HREF}">{TEL}</a> · <a href="tel:{TEL2_HREF}">{TEL2}</a> (telefax)</li><li><small>E-mail</small><a href="mailto:{EMAIL}">{EMAIL}</a></li></ul>
<div class="acoes"><a class="botao" href="{wa()}" target="_blank" rel="noopener">WhatsApp</a><a class="link" href="{MAPA}" target="_blank" rel="noopener">Abrir no mapa →</a></div></div>
<iframe class="mapa" src="{MAPA_EMBED}" loading="lazy" title="Mapa da Oficina De Filippo" referrerpolicy="no-referrer-when-downgrade"></iframe></section>'''
    if p == 'creditos':
        return f'''<section class="creditos rolagem"><p class="sobre">Créditos</p><h1>Fotos ilustrativas</h1><p>As fotos do “Arquivo De Filippo” são da própria oficina. As demais são ilustrativas, do Wikimedia Commons, usadas conforme a licença de cada uma:</p><ul>{creditos_lista()}</ul></section>'''

CSS = r'''
:root{--noite:#060A22;--noite-2:#0B1236;--marinho:#04146C;--vermelho:#D2111A;--vermelho-2:#E8303A;--branco:#F4F5F8;--cinza:#A6ACC2;--linha:rgba(255,255,255,.12);--ouro:#C2A56E;
--serif:Tinos,'Times New Roman',serif;--sans:'Source Sans 3',system-ui,sans-serif;--h:clamp(54px,8vh,74px);--pad:clamp(20px,4vw,60px)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--noite);color:var(--branco);font:400 clamp(15px,1vw + .35vh,17px)/1.55 var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit}img{display:block;max-width:100%}
h1,h2,h3{font-family:var(--serif);font-weight:400;text-transform:uppercase;letter-spacing:.08em;line-height:1.04}
h1{font-size:clamp(1.9rem,2vw + 2.8vh,4.2rem);margin-bottom:clamp(10px,2vh,22px)}
h2{font-size:clamp(1.1rem,.8vw + 1.2vh,1.6rem)}h3{font-size:1.05rem;letter-spacing:.06em}
.sobre{font:700 .72rem/1 var(--sans);letter-spacing:.24em;text-transform:uppercase;color:var(--vermelho-2);margin-bottom:clamp(10px,2vh,18px)}
.sobre a{text-decoration:none}
.lead{color:var(--cinza);font-size:1.06em;max-width:34em}
.botao{display:inline-flex;align-items:center;gap:8px;background:var(--vermelho);color:#fff;text-decoration:none;font:700 .85rem/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding:1.05em 1.6em;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);transition:background .2s}
.botao:hover{background:var(--vermelho-2)}
.link{font-weight:600;text-decoration:none;color:var(--branco);border-bottom:1px solid var(--vermelho)}
.acoes{display:flex;flex-wrap:wrap;gap:18px;align-items:center;margin-top:clamp(14px,3vh,30px)}
.app{min-height:100dvh;display:flex;flex-direction:column}
main{flex:1;display:flex;flex-direction:column;position:relative}
main>section{flex:1;position:relative;padding:clamp(18px,4vh,48px) var(--pad)}
@media (min-width:900px) and (min-height:560px){
 html,body{height:100%;overflow:hidden}.app{height:100dvh}main,main>section{min-height:0}
 .rolagem{overflow:auto;scrollbar-width:thin;scrollbar-color:var(--linha) transparent}
}
.fundo{position:absolute;inset:0;background:center/cover no-repeat;z-index:0}
.fundo::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--noite) 0%,rgba(6,10,34,.88) 40%,rgba(6,10,34,.35) 100%)}
main>section>*:not(.fundo){position:relative;z-index:1}
.topo{background:var(--noite);border-bottom:1px solid var(--linha);position:relative;z-index:5}
.xadrez{height:10px;background:conic-gradient(#fff 25%,#111 0 50%,#fff 0 75%,#111 0) 0 0/10px 10px;opacity:.9}
.barra{height:var(--h);display:flex;align-items:center;gap:clamp(16px,3vw,44px);padding:0 var(--pad)}
.marca .logo{height:calc(var(--h) - 16px);width:auto;display:block}.marca .logo ellipse{stroke:rgba(194,165,110,.55);stroke-width:1.5}
.menu{display:flex;gap:clamp(14px,2.2vw,36px);margin-left:auto}
.menu a{text-decoration:none;font:600 .78rem/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--cinza);padding:8px 0;position:relative}
.menu a:hover,.menu a[aria-current]{color:#fff}
.menu a[aria-current]::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:2px;background:var(--vermelho)}
.barra .botao{padding:.85em 1.3em}
.abrir-menu{display:none;background:none;border:0;width:40px;height:40px;flex-direction:column;justify-content:center;gap:5px;margin-left:auto}
.abrir-menu i{display:block;height:2px;background:#fff}
.rodape{display:flex;flex-wrap:wrap;gap:6px 28px;justify-content:space-between;padding:12px calc(var(--pad) + 70px) 12px var(--pad);border-top:1px solid var(--linha);font-size:.8em;color:var(--cinza);background:var(--noite)}
.rodape a{text-decoration:none}.rodape a:hover{color:#fff}
/* início */
.inicio{display:flex;flex-direction:column;justify-content:space-between;gap:20px}
.inicio .fundo::after{background:linear-gradient(90deg,var(--noite) 0%,rgba(6,10,34,.85) 38%,rgba(6,10,34,.25) 75%),linear-gradient(0deg,var(--noite) 0%,rgba(6,10,34,0) 45%)}
.hero{max-width:40em;margin:auto 0}
.ano{font:400 clamp(4rem,6vw + 6vh,10rem)/.8 var(--serif);letter-spacing:.06em;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.28);margin-bottom:clamp(6px,1.5vh,16px)}
.inicio h1{font-size:clamp(2rem,2.2vw + 3vh,4.6rem)}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--linha)}
.tile{display:grid;grid-template-columns:auto 1fr;gap:2px 14px;padding:clamp(12px,2.2vh,22px) 18px;text-decoration:none;border-right:1px solid var(--linha);transition:background .2s}
.tile:hover{background:rgba(210,17,26,.16)}
.tile b{grid-row:span 2;font:400 1.5rem/1 var(--serif);color:var(--vermelho-2)}.tile b svg{width:26px;height:26px;color:#25D366}
.tile span{font:700 .8rem/1.2 var(--sans);letter-spacing:.16em;text-transform:uppercase}
.tile small{color:var(--cinza);font-size:.85em}
/* oficina */
.oficina{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,70px)}
.oficina .texto{display:flex;flex-direction:column;justify-content:center}
.oficina .texto>p+p{margin-top:.8em;color:var(--cinza)}
.bloco{margin-top:clamp(14px,3vh,28px);padding:clamp(14px,2.4vh,22px);border:1px solid var(--linha);border-left:3px solid var(--vermelho);background:var(--noite-2)}
.bloco h2{margin-bottom:6px}.bloco p{color:var(--cinza)}
.filme{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:18px;min-height:0;align-content:center;padding-bottom:28px}
.filme figure{background:#fff;padding:8px 8px 26px;box-shadow:0 20px 40px rgba(0,0,0,.5)}
.filme img{width:100%;aspect-ratio:4/3;max-height:calc((100dvh - 260px)/2);object-fit:cover;filter:grayscale(1) contrast(1.05)}
.filme .f1{transform:rotate(-2deg)}.filme .f2{transform:rotate(1.5deg)}.filme .f3{transform:rotate(1deg)}.filme .f4{transform:rotate(-1.5deg)}
.legenda{position:absolute;right:0;bottom:-6px;font:italic 400 1rem var(--serif);color:var(--cinza)}
/* serviços */
.servicos{display:flex;flex-direction:column;gap:clamp(12px,2.4vh,26px)}.cabeca h1{margin:0}
.colunas{flex:1;min-height:0;display:grid;grid-template-columns:repeat(4,1fr);gap:2px}
.coluna{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(16px,3vh,30px);text-decoration:none;min-height:260px;background:var(--noite-2)}
.coluna .fundo{transition:transform .6s}.coluna:hover .fundo{transform:scale(1.05)}
.coluna .fundo::after{background:linear-gradient(0deg,var(--noite) 10%,rgba(6,10,34,.55) 60%,rgba(6,10,34,.3))}
.coluna>*:not(.fundo){position:relative;z-index:1}
.coluna b{font:400 clamp(2.4rem,2vw + 3vh,4rem)/1 var(--serif);color:var(--vermelho-2);margin-bottom:auto}
.coluna h2{margin:10px 0 6px}.coluna p{color:var(--cinza);font-size:.95em}
.coluna span{margin-top:12px;font:700 .75rem/1 var(--sans);letter-spacing:.16em;text-transform:uppercase}
.coluna-extra{background:var(--marinho)}.coluna-extra p{color:#C9CFEA}.coluna-extra .botao{align-self:flex-start;margin-top:14px}
/* detalhe */
.detalhe{display:flex}.detalhe .fundo{left:45%}
.detalhe .fundo::after{background:linear-gradient(90deg,var(--noite) 0%,rgba(6,10,34,.2) 60%)}
.painel{width:min(100%,46rem);display:flex;flex-direction:column;min-height:0;justify-content:center}
.itens{list-style:none;min-height:0;margin-top:clamp(8px,2vh,18px);border-top:1px solid var(--linha)}
.itens li{display:flex;gap:18px;padding:clamp(8px,1.5vh,14px) 0;border-bottom:1px solid var(--linha)}
.itens b{font:400 1.2rem/1.3 var(--serif);color:var(--vermelho-2)}.itens p{color:var(--cinza);font-size:.95em}
.outros a{margin-right:16px;font-size:.88em;color:var(--cinza)}.outros a:hover{color:#fff}
/* compromisso */
.compromisso{display:flex;flex-direction:column;gap:clamp(12px,3vh,30px)}
.compromisso .cabeca{display:grid;grid-template-columns:auto 1fr;gap:6px 50px;align-items:end}.compromisso .cabeca .sobre{grid-column:1/-1}
.etica{list-style:none;flex:1;min-height:0;display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:1fr;gap:2px}
.etica li{background:var(--noite-2);padding:clamp(12px,2.4vh,24px);display:flex;flex-direction:column;gap:10px;border-top:2px solid transparent;transition:border-color .2s}
.etica li:hover{border-color:var(--vermelho)}
.etica b{font:400 clamp(2rem,1.5vw + 2.4vh,3.4rem)/1 var(--serif);color:var(--vermelho-2)}
.etica li:nth-child(5){background:var(--marinho)}
/* orçamento */
.orcamento{display:grid;grid-template-columns:1fr minmax(320px,30rem);gap:clamp(24px,5vw,90px);align-items:center}
.tel{margin-top:12px}.tel a{font-weight:700}
.formulario{background:rgba(6,10,34,.92);border:1px solid var(--linha);border-top:3px solid var(--vermelho);padding:clamp(18px,3.5vh,34px);display:grid;gap:clamp(8px,1.6vh,15px)}
.formulario label{display:grid;gap:5px;font:700 .72rem/1.3 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--cinza)}
.formulario label span{text-transform:none;letter-spacing:0;font-weight:400}
.formulario input,.formulario select,.formulario textarea{font:400 1rem var(--sans);padding:.7em .85em;border:1px solid var(--linha);background:var(--noite-2);color:#fff}
.formulario input:focus,.formulario select:focus,.formulario textarea:focus{outline:2px solid var(--vermelho);outline-offset:-1px}
.formulario button{display:flex;align-items:center;justify-content:center;gap:10px;font:700 .85rem/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding:1.1em;background:#1F8F4E;color:#fff;border:0;cursor:pointer}
.formulario button svg{width:20px;height:20px}
/* contato */
.contato{display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(24px,4vw,70px)}
.contato .texto{display:flex;flex-direction:column;justify-content:center}
.dados{list-style:none;border-top:1px solid var(--linha)}.dados li{padding:clamp(10px,2vh,16px) 0;border-bottom:1px solid var(--linha)}
.dados small{display:block;font:700 .68rem/1.6 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--vermelho-2)}
.dados a{text-decoration:none}
.mapa{width:100%;height:100%;min-height:320px;border:0;filter:grayscale(1) invert(.92) hue-rotate(180deg) contrast(.9)}
.creditos ul{margin-top:16px;padding-left:18px;font-size:.88em;color:var(--cinza)}.creditos li{margin:4px 0}
.wa-flutuante{position:fixed;right:18px;bottom:18px;width:54px;height:54px;border-radius:50%;background:#1F8F4E;color:#fff;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.4);z-index:20}
.wa-flutuante svg{width:28px;height:28px}
.pg-index .wa-flutuante{display:none}
@media (min-width:900px) and (max-height:700px){.ano{display:none}.tile small{display:none}.oficina .texto>p+p{display:none}}
@media (max-width:899px){
 .menu{position:fixed;inset:calc(var(--h) + 10px) 0 auto;flex-direction:column;background:var(--noite);padding:16px var(--pad) 24px;border-bottom:1px solid var(--linha);display:none}
 .menu-aberto .menu{display:flex}.abrir-menu{display:flex}.barra .botao{display:none}
 .inicio{min-height:calc(100svh - var(--h) - 10px)}.tiles{grid-template-columns:1fr 1fr}.tile small{display:none}.tile{border-bottom:1px solid var(--linha)}
 .inicio .fundo::after{background:linear-gradient(180deg,rgba(6,10,34,.75),rgba(6,10,34,.92) 55%,var(--noite))}
 .oficina,.contato,.orcamento{grid-template-columns:1fr}.filme{grid-template-rows:auto}
 .colunas{grid-template-columns:1fr}.etica{grid-template-columns:1fr 1fr}
 .detalhe .fundo{left:0;opacity:.35}.compromisso .cabeca{grid-template-columns:1fr}
 .mapa{height:320px}.pg-index .wa-flutuante{display:grid}
}
'''
