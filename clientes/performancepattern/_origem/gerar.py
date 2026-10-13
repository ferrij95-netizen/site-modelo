#!/usr/bin/env python3
# Gera as páginas de public/ (versões a e b) a partir do conteúdo real do site atual
# (performancepattern.com, salvo pelo João em 13/10/2026). Rodar: python3 clientes/performancepattern/_origem/gerar.py
import os, html

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public')

NOME = 'Performance Pattern &amp; Machine'
EMAIL = 'info@performancepattern.com'

MENU = [
    ('index', 'Home'),
    ('sobre', 'About PPM'),
    ('servicos', 'Services'),
    ('contato', 'Contact'),
]

INDUSTRIAS = ['Aerospace', 'Mining', 'Heavy equipment', 'Petroleum', 'Foundries',
              'Natural gas', 'Transportation', 'Marine']

ESTATISTICAS = [('1980', 'Year established'), ('13,700', 'Projects completed'),
                ('55,000', 'Square feet under roof'), ('28', 'Employees')]

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

CERTIFICACOES = [
    ('assets/as9100d.png', 'AS9100:2016 Rev. D', 'PPM is certified AS9100:2016 Rev. D.'),
    ('assets/iso9001.png', 'ISO 9001:2015', 'PPM is certified ISO 9001:2015.'),
]


def pagina(versao, slug, titulo, corpo, titulo_pagina):
    nav = ''.join(
        f'<a href="{s}.html"' + (' class="on"' if s == slug else '') + f'>{t}</a>' for s, t in MENU)
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo_pagina}</title>
<meta name="description" content="Leaders in quality pattern making, machining and aerospace manufacturing. Performance Pattern &amp; Machine, Peoria, IL.">
<meta name="robots" content="noindex">
<meta property="og:title" content="{titulo_pagina}">
<meta property="og:image" content="https://performancepattern.overtus.com.br/assets/hero.jpg">
<link rel="icon" href="../assets/logo-pp.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:ital,wght@0,700;0,800;1,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/{versao}.css">
</head>
<body class="v-{versao}">
<header class="top">
  <a class="marca" href="index.html"><img src="../assets/logo-pp.png" alt="Performance Pattern &amp; Machine"></a>
  <nav class="menu" aria-label="Main menu">{nav}</nav>
</header>
<main>
{corpo}
</main>
<footer class="rodape">
  <div>
    <strong>Performance Pattern &amp; Machine</strong>
    <span>Peoria, Illinois</span>
  </div>
  <div>
    <a href="mailto:{EMAIL}">{EMAIL}</a>
    <span>ISO 9001:2015 · AS9100D · ITAR registered</span>
  </div>
</footer>
</body>
</html>
'''


def estat():
    return ''.join(f'<div class="num"><b>{n}</b><span>{t}</span></div>' for n, t in ESTATISTICAS)


def industrias():
    return ''.join(f'<li>{i}</li>' for i in INDUSTRIAS)


def certs(classe):
    return ''.join(
        f'<figure class="{classe}"><img src="../{src}" alt="{alt}"><figcaption>{rotulo}</figcaption></figure>'
        for src, rotulo, alt in [(s, r, a) for s, r, a in CERTIFICACOES])


def sobre_paragrafos():
    return ''.join(f'<p>{p}</p>' for p in SOBRE_TEXTO)


def servicos_lista(classe):
    return ''.join(
        f'<article class="{classe}"><span class="n">0{i + 1}</span><h3>{t}</h3><p>{d}</p></article>'
        for i, (t, d) in enumerate(SERVICOS))


def paginas_a():
    hero = f'''<section class="hero">
  <img src="../assets/hero.jpg" alt="Performance Pattern &amp; Machine building, Peoria">
  <div class="hero-txt">
    <p class="kicker">Peoria, Illinois · since 1980</p>
    <h1>Leaders in quality pattern making, machining and aerospace manufacturing</h1>
    <div class="botoes"><a class="btn" href="sobre.html">About PPM</a><a class="btn ghost" href="contato.html">Contact us</a></div>
  </div>
</section>
<section class="faixa">
  <p><b>PPM continues to grow!</b> Adding staff positions: pattern makers / mold makers. Join our community of professionals.
  <a href="mailto:{EMAIL}">{EMAIL}</a></p>
</section>
<section class="stats">{estat()}</section>
<section class="bloco">
  <h2>A little bit about PPM</h2>
  <div class="duas">
    <div>{sobre_paragrafos()}</div>
    <div class="certs">{certs('cert')}</div>
  </div>
</section>
<section class="bloco cinza">
  <h2>Industries we serve</h2>
  <ul class="industrias">{industrias()}</ul>
</section>
<section class="bloco">
  <h2>Services</h2>
  <div class="servicos">{servicos_lista('card')}</div>
</section>'''
    p = {}
    p['index'] = pagina('a', 'index', 'Home', hero, 'Performance Pattern &amp; Machine · Version A')
    sobre = f'''<section class="bloco topo">
  <p class="kicker">About PPM</p>
  <h1>Pattern making and machining since 1980</h1>
</section>
<section class="bloco">
  <div class="duas">
    <div>{sobre_paragrafos()}</div>
    <div class="certs">{certs('cert')}</div>
  </div>
</section>
<section class="stats">{estat()}</section>'''
    p['sobre'] = pagina('a', 'sobre', 'About', sobre, 'About PPM · Performance Pattern &amp; Machine')
    servicos = f'''<section class="bloco topo">
  <p class="kicker">Services</p>
  <h1>Pattern making, machining and aerospace manufacturing</h1>
</section>
<section class="bloco">
  <div class="servicos">{servicos_lista('card')}</div>
</section>
<section class="bloco cinza">
  <h2>Industries we serve</h2>
  <ul class="industrias">{industrias()}</ul>
</section>'''
    p['servicos'] = pagina('a', 'servicos', 'Services', servicos, 'Services · Performance Pattern &amp; Machine')
    contato = f'''<section class="bloco topo">
  <p class="kicker">Contact</p>
  <h1>Talk to Performance Pattern &amp; Machine</h1>
</section>
<section class="bloco contato">
  <div class="cartao"><h3>Email</h3><p><a href="mailto:{EMAIL}">{EMAIL}</a></p></div>
  <div class="cartao"><h3>Location</h3><p>Peoria, Illinois</p></div>
  <div class="cartao"><h3>Join our team</h3><p>We are adding pattern maker and mold maker positions. Send your résumé to {EMAIL}.</p></div>
</section>'''
    p['contato'] = pagina('a', 'contato', 'Contact', contato, 'Contact · Performance Pattern &amp; Machine')
    return p


def paginas_b():
    hero = f'''<section class="hero">
  <div class="hero-txt">
    <p class="kicker">Peoria, Illinois · since 1980</p>
    <h1>Leaders in quality pattern making, machining and aerospace manufacturing</h1>
    <div class="botoes"><a class="btn" href="servicos.html">Our services</a><a class="btn ghost" href="contato.html">Contact us</a></div>
  </div>
  <div class="hero-foto"><img src="../assets/hero.jpg" alt="Performance Pattern &amp; Machine building, Peoria"></div>
</section>
<section class="stats">{estat()}</section>
<section class="faixa">
  <p><b>PPM continues to grow!</b> Adding staff positions: pattern makers / mold makers.
  <a href="mailto:{EMAIL}">{EMAIL}</a></p>
</section>
<section class="bloco">
  <h2>Services</h2>
  <div class="servicos">{servicos_lista('linha')}</div>
</section>
<section class="bloco escuro">
  <div class="duas">
    <div>
      <h2>A little bit about PPM</h2>
      {sobre_paragrafos()}
    </div>
    <div class="certs">{certs('cert')}</div>
  </div>
</section>
<section class="bloco">
  <h2>Industries we serve</h2>
  <ul class="industrias">{industrias()}</ul>
</section>'''
    p = {}
    p['index'] = pagina('b', 'index', 'Home', hero, 'Performance Pattern &amp; Machine · Version B')
    sobre = f'''<section class="bloco topo">
  <p class="kicker">About PPM</p>
  <h1>Pattern making and machining since 1980</h1>
</section>
<section class="bloco escuro">
  <div class="duas">
    <div>{sobre_paragrafos()}</div>
    <div class="certs">{certs('cert')}</div>
  </div>
</section>
<section class="stats">{estat()}</section>'''
    p['sobre'] = pagina('b', 'sobre', 'About', sobre, 'About PPM · Performance Pattern &amp; Machine')
    servicos = f'''<section class="bloco topo">
  <p class="kicker">Services</p>
  <h1>Pattern making, machining and aerospace manufacturing</h1>
</section>
<section class="bloco">
  <div class="servicos">{servicos_lista('linha')}</div>
</section>
<section class="bloco escuro">
  <h2>Industries we serve</h2>
  <ul class="industrias">{industrias()}</ul>
</section>'''
    p['servicos'] = pagina('b', 'servicos', 'Services', servicos, 'Services · Performance Pattern &amp; Machine')
    contato = f'''<section class="bloco topo">
  <p class="kicker">Contact</p>
  <h1>Talk to Performance Pattern &amp; Machine</h1>
</section>
<section class="bloco contato">
  <div class="cartao"><h3>Email</h3><p><a href="mailto:{EMAIL}">{EMAIL}</a></p></div>
  <div class="cartao"><h3>Location</h3><p>Peoria, Illinois</p></div>
  <div class="cartao"><h3>Join our team</h3><p>We are adding pattern maker and mold maker positions. Send your résumé to {EMAIL}.</p></div>
</section>'''
    p['contato'] = pagina('b', 'contato', 'Contact', contato, 'Contact · Performance Pattern &amp; Machine')
    return p


def escolha():
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Performance Pattern · choose a version</title>
<meta name="robots" content="noindex">
<link rel="icon" href="assets/logo-pp.png" type="image/png">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800&display=swap" rel="stylesheet">
<style>
:root{{--azul:#27568e;--azul-f:#083974;--ink:#1d2430;--mut:#55606e;--line:#dfe5ec}}
*{{box-sizing:border-box}}
body{{margin:0;font-family:Inter,Arial,sans-serif;color:var(--ink);background:#f5f7fa;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 16px}}
img.logo{{width:150px;height:auto}}
h1{{font-family:Montserrat,Arial,sans-serif;font-weight:800;font-size:clamp(22px,4vw,30px);margin:18px 0 6px;text-align:center}}
p.s{{color:var(--mut);margin:0 0 26px;text-align:center}}
.opcoes{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;width:min(760px,100%)}}
.opcoes a{{display:block;background:#fff;border:1px solid var(--line);border-top:5px solid var(--azul);padding:22px;text-decoration:none;color:inherit}}
.opcoes a:hover{{border-color:var(--azul-f)}}
.opcoes b{{font-family:Montserrat,Arial,sans-serif;font-size:19px;color:var(--azul-f)}}
.opcoes span{{display:block;margin-top:8px;color:var(--mut);font-size:15px;line-height:1.5}}
</style>
</head>
<body>
<img class="logo" src="assets/logo-pp.png" alt="Performance Pattern &amp; Machine">
<h1>Two versions of the new site</h1>
<p class="s">Both keep the company's real logo, colors, certifications and text.</p>
<div class="opcoes">
  <a href="a/index.html"><b>Version A · Classic</b><span>Clean white layout with the building photo, a blue stats band and a simple, direct structure.</span></a>
  <a href="b/index.html"><b>Version B · Industrial</b><span>Darker, bolder layout: split hero, numbered service rows and a dark section for the company history.</span></a>
</div>
</body>
</html>
'''


def main():
    for v, paginas in (('a', paginas_a()), ('b', paginas_b())):
        for slug, conteudo in paginas.items():
            destino = os.path.join(RAIZ, v, f'{slug}.html')
            if slug == 'index':
                destino = os.path.join(RAIZ, v, 'index.html')
            with open(destino, 'w', encoding='utf-8') as f:
                f.write(conteudo)
    with open(os.path.join(RAIZ, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(escolha())
    print('ok')


if __name__ == '__main__':
    main()
