#!/usr/bin/env python3
# Gera as páginas de public/ (versões a e b) com o conteúdo real do site atual
# (performancepattern.com, salvo pelo João em 13/10/2026). Só texto e imagens que vieram do site.
# Rodar: python3 clientes/performancepattern/_origem/gerar.py
import os

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public')
EMAIL = 'info@performancepattern.com'

MENU = [('index', 'Home'), ('sobre', 'About'), ('servicos', 'Services'), ('contato', 'Contact')]

INDUSTRIAS = ['Aerospace', 'Mining', 'Heavy equipment', 'Petroleum', 'Foundries',
              'Natural gas', 'Transportation', 'Marine']

ESTATISTICAS = [('1980', 'Year established', 1980), ('13,700', 'Projects completed', 13700),
                ('55,000', 'Square feet under roof', 55000), ('28', 'Employees', 28)]

SERVICOS = [
    ('Pattern making', 'Patterns for sand casting, built by our pattern shop since 1980.'),
    ('Machining', 'Billet machining and machining of castings, with modern equipment and an experienced staff.'),
    ('Aerospace manufacturing', 'Parts for aerospace projects, under AS9100D certification and ITAR registration.'),
    ('Prototype manufacturing', 'From a single prototype to the first production run, on the same floor.'),
]

SOBRE_TEXTO = [
    'Performance Pattern &amp; Machine first started in 1980 by Vince Herman and George Munger. '
    'Its beginning as a pattern shop has developed over the years into the multi-faceted business it is today.',
    'Over time, we have expanded our family business in order to provide more complete services by keeping up '
    'with the technological advances in the industry. Today, we have technologically advanced equipment manned by '
    'an experienced staff.',
    'We have earned our reputation through hard work, uncompromising precision and constant learning and adapting. '
    'We love what we do, and the variety of projects we accomplish proves the scope of our capabilities.',
]

CITACAO = 'Uncompromising precision.'

HEADLINE = 'Leaders in quality pattern making, machining and aerospace manufacturing'
VAGA = ('PPM continues to grow!', 'Adding staff positions: pattern makers and mold makers. Join our community of professionals.')


def cabecalho(versao, slug):
    links = ''.join(
        f'<a href="{s}.html"' + (' aria-current="page"' if s == slug else '') + f'>{t}</a>' for s, t in MENU)
    return f'''<header class="top">
  <a class="marca" href="index.html"><img src="../assets/logo-pp.png" alt="Performance Pattern &amp; Machine"></a>
  <button class="abrir" type="button" aria-expanded="false" aria-controls="menu">Menu</button>
  <nav class="menu" id="menu" aria-label="Main menu">{links}<a class="pill" href="contato.html">Contact us</a></nav>
</header>'''


def rodape():
    return f'''<footer class="rodape">
  <div class="rodape-marca"><img src="../assets/logo-pp.png" alt=""><span>Peoria, Illinois · since 1980</span></div>
  <div><strong>Contact</strong><a href="mailto:{EMAIL}">{EMAIL}</a><span>Peoria, Illinois</span></div>
  <div><strong>Certified</strong><span>AS9100D · ISO 9001:2015</span><span>ITAR registered</span></div>
</footer>
<script src="../assets/site.js" defer></script>'''


def pagina(versao, slug, titulo_pagina, corpo):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo_pagina}</title>
<meta name="description" content="{HEADLINE}. Performance Pattern &amp; Machine, Peoria, IL.">
<meta name="robots" content="noindex">
<meta property="og:title" content="{titulo_pagina}">
<meta property="og:image" content="https://performancepattern.overtus.com.br/assets/hero.jpg">
<link rel="icon" href="../assets/logo-pp.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/{versao}.css">
</head>
<body class="v-{versao}">
<a class="pular" href="#conteudo">Skip to content</a>
{cabecalho(versao, slug)}
<main id="conteudo">
{corpo}
</main>
{rodape()}
</body>
</html>
'''


def contagem():
    return ''.join(
        f'<div class="num reveal"><b data-count="{v}">{t_}</b><span>{r}</span></div>'
        for t_, r, v in [(n, r, v) for n, r, v in ESTATISTICAS])


def contagem_simples():
    return ''.join(f'<div class="num reveal"><b data-count="{v}">{n}</b><span>{r}</span></div>'
                   for n, r, v in ESTATISTICAS)


def industrias():
    return ''.join(f'<li>{i}</li>' for i in INDUSTRIAS)


def paragrafos():
    return ''.join(f'<p>{p}</p>' for p in SOBRE_TEXTO)


def selos(classe):
    return (f'<figure class="{classe} reveal"><img src="../assets/as9100d.png" alt="PPM is certified AS9100:2016 Rev. D">'
            f'<figcaption>AS9100:2016 Rev. D</figcaption></figure>'
            f'<figure class="{classe} reveal"><img src="../assets/iso9001.png" alt="PPM is certified ISO 9001:2015">'
            f'<figcaption>ISO 9001:2015</figcaption></figure>')


def servicos_a():
    cores = ['wide', '', '', 'wide']
    return ''.join(
        f'<article class="card reveal {cores[i]}"><span class="ico">{i + 1:02d}</span><h3>{t}</h3><p>{d}</p></article>'
        for i, (t, d) in enumerate(SERVICOS))


def servicos_b():
    return ''.join(
        f'<article class="etapa reveal"><span class="losango" aria-hidden="true"></span>'
        f'<h3>{t}</h3><p>{d}</p></article>'
        for t, d in SERVICOS)


def vaga():
    return f'<p class="vaga-t">{VAGA[0]}</p><p>{VAGA[1]}</p><a class="btn" href="mailto:{EMAIL}">{EMAIL}</a>'


# ---------- Versão A · Moderna clara ----------

def paginas_a():
    hero = f'''<section class="hero">
  <img src="../assets/hero.jpg" alt="Performance Pattern &amp; Machine building in Peoria">
  <div class="hero-txt reveal">
    <p class="kicker">Peoria, Illinois · since 1980</p>
    <h1>{HEADLINE}</h1>
    <div class="botoes"><a class="btn" href="sobre.html">About PPM</a><a class="btn ghost" href="contato.html">Contact us</a></div>
  </div>
  <span class="losango-grande" aria-hidden="true"></span>
  <a class="descer" href="#stats" aria-label="Scroll to content">↓</a>
</section>
<section class="vaga-faixa reveal" id="stats">
  <div>{vaga()}</div>
</section>
<section class="bento">{contagem()}</section>
<section class="bloco sobre">
  <div class="sobre-texto reveal">
    <p class="kicker">A little bit about PPM</p>
    <blockquote>{CITACAO}</blockquote>
    {paragrafos()}
  </div>
  <div class="selos">{selos('selo')}</div>
</section>
<section class="bloco">
  <p class="kicker">What we do</p>
  <h2 class="reveal">Services</h2>
  <div class="cards">{servicos_a()}</div>
</section>
<section class="bloco faixa-ind">
  <p class="kicker">Who we work with</p>
  <h2 class="reveal">Industries we serve</h2>
  <ul class="industrias">{industrias()}</ul>
</section>
<section class="chamada reveal">
  <h2>Talk to Performance Pattern &amp; Machine</h2>
  <a class="btn" href="contato.html">Contact us</a>
</section>'''
    p = {'index': pagina('a', 'index', 'Performance Pattern &amp; Machine · Version A', hero)}
    sobre = f'''<section class="cabeca">
  <p class="kicker">About PPM</p>
  <h1 class="reveal">Pattern making and machining since 1980</h1>
</section>
<section class="bloco sobre">
  <div class="sobre-texto reveal"><blockquote>{CITACAO}</blockquote>{paragrafos()}</div>
  <div class="selos">{selos('selo')}</div>
</section>
<section class="bento">{contagem()}</section>'''
    p['sobre'] = pagina('a', 'sobre', 'About PPM · Performance Pattern &amp; Machine', sobre)
    servicos = f'''<section class="cabeca">
  <p class="kicker">Services</p>
  <h1 class="reveal">Pattern making, machining and aerospace manufacturing</h1>
</section>
<section class="bloco"><div class="cards">{servicos_a()}</div></section>
<section class="bloco faixa-ind">
  <h2 class="reveal">Industries we serve</h2>
  <ul class="industrias">{industrias()}</ul>
</section>'''
    p['servicos'] = pagina('a', 'servicos', 'Services · Performance Pattern &amp; Machine', servicos)
    contato = f'''<section class="cabeca">
  <p class="kicker">Contact</p>
  <h1 class="reveal">Talk to Performance Pattern &amp; Machine</h1>
</section>
<section class="bloco contatos">
  <a class="contato-card reveal" href="mailto:{EMAIL}"><b>Email</b><span>{EMAIL}</span></a>
  <div class="contato-card reveal"><b>Location</b><span>Peoria, Illinois</span></div>
  <div class="contato-card reveal"><b>Join our team</b><span>We are adding pattern maker and mold maker positions.</span></div>
</section>'''
    p['contato'] = pagina('a', 'contato', 'Contact · Performance Pattern &amp; Machine', contato)
    return p


# ---------- Versão B · Industrial escura ----------

def paginas_b():
    hero = f'''<section class="hero">
  <div class="hero-foto"><img src="../assets/hero.jpg" alt="Performance Pattern &amp; Machine building in Peoria"></div>
  <div class="hero-txt">
    <p class="kicker">Peoria, Illinois · since 1980</p>
    <h1>{HEADLINE}</h1>
    <div class="botoes"><a class="btn" href="servicos.html">Our services</a><a class="btn ghost" href="contato.html">Contact us</a></div>
  </div>
</section>
<section class="stats-b">{contagem_simples()}</section>
<section class="vaga-b reveal">{vaga()}</section>
<section class="bloco">
  <p class="kicker">Capabilities</p>
  <h2 class="reveal">Services</h2>
  <div class="etapas">{servicos_b()}</div>
</section>
<section class="bloco escuro sobre-b">
  <div class="reveal">
    <p class="kicker">A little bit about PPM</p>
    <h2>Uncompromising precision since 1980</h2>
    {paragrafos()}
  </div>
  <div class="selos-b">{selos('selo')}</div>
</section>
<section class="bloco">
  <p class="kicker">Who we work with</p>
  <h2 class="reveal">Industries we serve</h2>
  <ul class="industrias">{industrias()}</ul>
</section>'''
    p = {'index': pagina('b', 'index', 'Performance Pattern &amp; Machine · Version B', hero)}
    sobre = f'''<section class="cabeca">
  <p class="kicker">About PPM</p>
  <h1 class="reveal">Pattern making and machining since 1980</h1>
</section>
<section class="bloco escuro sobre-b">
  <div class="reveal">{paragrafos()}</div>
  <div class="selos-b">{selos('selo')}</div>
</section>
<section class="stats-b">{contagem_simples()}</section>'''
    p['sobre'] = pagina('b', 'sobre', 'About PPM · Performance Pattern &amp; Machine', sobre)
    servicos = f'''<section class="cabeca">
  <p class="kicker">Services</p>
  <h1 class="reveal">Pattern making, machining and aerospace manufacturing</h1>
</section>
<section class="bloco"><div class="etapas">{servicos_b()}</div></section>
<section class="bloco escuro">
  <h2 class="reveal">Industries we serve</h2>
  <ul class="industrias">{industrias()}</ul>
</section>'''
    p['servicos'] = pagina('b', 'servicos', 'Services · Performance Pattern &amp; Machine', servicos)
    contato = f'''<section class="cabeca">
  <p class="kicker">Contact</p>
  <h1 class="reveal">Talk to Performance Pattern &amp; Machine</h1>
</section>
<section class="bloco contatos">
  <a class="contato-card reveal" href="mailto:{EMAIL}"><b>Email</b><span>{EMAIL}</span></a>
  <div class="contato-card reveal"><b>Location</b><span>Peoria, Illinois</span></div>
  <div class="contato-card reveal"><b>Join our team</b><span>We are adding pattern maker and mold maker positions.</span></div>
</section>'''
    p['contato'] = pagina('b', 'contato', 'Contact · Performance Pattern &amp; Machine', contato)
    return p


def escolha():
    return '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Performance Pattern · choose a version</title>
<meta name="robots" content="noindex">
<link rel="icon" href="assets/logo-pp.png" type="image/png">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800&display=swap" rel="stylesheet">
<style>
:root{--azul:#27568e;--azul-f:#083974;--ink:#1d2430;--mut:#55606e}
*{box-sizing:border-box}
body{margin:0;font-family:Inter,Arial,sans-serif;color:var(--ink);background:#eef2f7;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 16px}
img{width:150px;height:auto}
h1{font-family:Montserrat,Arial,sans-serif;font-weight:800;font-size:clamp(22px,4vw,30px);margin:18px 0 6px;text-align:center;color:var(--azul-f)}
p{color:var(--mut);margin:0 0 26px;text-align:center}
.opcoes{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;width:min(760px,100%)}
.opcoes a{display:block;background:#fff;padding:24px;text-decoration:none;color:inherit;border-left:5px solid var(--azul);box-shadow:0 6px 24px rgba(8,57,116,.08)}
.opcoes a.b{background:#0c1520;border-left-color:#5277ac;color:#e9eef5}
.opcoes a.b span{color:#a9b7c9}
.opcoes b{font-family:Montserrat,Arial,sans-serif;font-size:19px;color:var(--azul-f)}
.opcoes a.b b{color:#fff}
.opcoes span{display:block;margin-top:8px;color:var(--mut);font-size:15px;line-height:1.5}
</style>
</head>
<body>
<img src="assets/logo-pp.png" alt="Performance Pattern &amp; Machine">
<h1>Two versions of the new site</h1>
<p>Both use the company's real logo, photo, certifications and text.</p>
<div class="opcoes">
  <a href="a/index.html"><b>Version A · Modern light</b><span>Bright layout with a bento grid of stats, the diamond from the logo as a graphic element, and cards of different sizes.</span></a>
  <a class="b" href="b/index.html"><b>Version B · Industrial dark</b><span>Dark layout with a full-width hero, animated counters, service steps on diamond nodes, and a bold contrast.</span></a>
</div>
</body>
</html>
'''


def main():
    for v, paginas in (('a', paginas_a()), ('b', paginas_b())):
        for slug, conteudo in paginas.items():
            with open(os.path.join(RAIZ, v, f'{slug}.html'), 'w', encoding='utf-8') as f:
                f.write(conteudo)
    with open(os.path.join(RAIZ, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(escolha())
    print('ok')


if __name__ == '__main__':
    main()
