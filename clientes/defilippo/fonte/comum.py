# Peças comuns às duas versões (SEO, logo, WhatsApp, formulário).
import os, html, json
from conteudo import *

AQUI = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.join(AQUI, '..', 'public')
DOMINIO = 'https://defilippo.overtus.com.br'
e = html.escape

FONTES = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">'

def logo(cls='logo'):
    # Recriação vetorial do logotipo: elipse preta, "De Filippo" espaçado, 4 estrelas douradas e faixa tricolor.
    estrelas = ''.join(f'<path transform="translate({128+i*22} 22) scale(.5)" d="M0-10 2.9-3.1 10-3.1 4.3 1.2 6.5 8.1 0 3.8-6.5 8.1-4.3 1.2-10-3.1-2.9-3.1Z" fill="#A88E5E"/>' for i in range(4))
    return f'''<svg class="{cls}" viewBox="0 0 420 100" role="img" aria-label="De Filippo"><ellipse cx="196" cy="58" rx="192" ry="40" fill="#191B1C"/>{estrelas}
<path d="M226 32 248 18h56l-22 14Z" fill="#0B6B3A"/><path d="M282 32l22-14h60l-22 14Z" fill="#fff"/><path d="M342 32l22-14h52l-22 14Z" fill="#C8102E"/>
<text x="196" y="74" text-anchor="middle" font-family="Tinos, 'Times New Roman', serif" font-size="44" letter-spacing="8" fill="#fff">De Filippo</text></svg>'''

def seo(v, pagina, titulo, desc):
    url = f'{DOMINIO}/{v}/' + ('' if pagina == 'index' else f'{pagina}.html')
    t = f'{titulo} · {NOME}' if pagina != 'index' else f'{NOME} · Mecânica em Pinheiros desde 1960'
    ld = {"@context": "https://schema.org", "@type": "AutoRepair", "name": NOME, "telephone": TEL_HREF, "email": EMAIL, "foundingDate": "1960",
          "address": {"@type": "PostalAddress", "streetAddress": RUA, "addressLocality": "São Paulo", "addressRegion": "SP", "postalCode": CEP, "addressCountry": "BR"}, "url": url}
    return f'''<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>{e(t)}</title><meta name="description" content="{e(desc)}"><link rel="canonical" href="{url}">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="{NOME}"><meta property="og:title" content="{e(t)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{DOMINIO}/img/og.jpg"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/favicon.png"><script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>{FONTES}<link rel="stylesheet" href="estilo.css">'''

def wa(texto='Olá! Gostaria de um orçamento para o meu carro.'):
    from urllib.parse import quote
    return f'https://wa.me/{WHATS}?text={quote(texto)}'

ICONE_WA = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.5 6.5 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 0 0 2.2-1.6 2.8 2.8 0 0 0 .2-1.6c-.1-.1-.3-.2-.6-.4Z"/></svg>'

def flutuante():
    return f'<a class="wa-flutuante" href="{wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">{ICONE_WA}</a>'

def nav(ativo):
    itens = ''.join(f'<a href="{"./" if p == "index" else p + ".html"}"{" aria-current=page" if p == ativo or (p == "servicos" and ativo in ("manutencao", "preparacao", "diagnostico")) else ""}>{t}</a>' for p, t in NAV)
    return itens

FORM_JS = '''<script>
document.querySelectorAll('form[data-whats]').forEach(f=>f.addEventListener('submit',ev=>{ev.preventDefault();const d=new FormData(f);
const t=`Olá, De Filippo! Gostaria de um orçamento.%0A%0ANome: ${d.get('nome')}%0ACarro: ${d.get('carro')}%0AServiço: ${d.get('servico')}%0A${d.get('mensagem')?'Detalhes: '+d.get('mensagem'):''}`;
window.open(`https://wa.me/${f.dataset.whats}?text=${t.replace(/ /g,'%20')}`,'_blank','noopener');}));
document.querySelectorAll('[data-menu]').forEach(b=>b.addEventListener('click',()=>document.body.classList.toggle('menu-aberto')));
</script>'''

def formulario(cls):
    ops = ''.join(f'<option>{o}</option>' for o in OPCOES_ORCAMENTO)
    return f'''<form class="{cls}" data-whats="{WHATS}">
<label>Seu nome<input name="nome" required autocomplete="name"></label>
<label>Carro (marca, modelo e ano)<input name="carro" required placeholder="Ex.: Fiat 500 Abarth 2014"></label>
<label>Serviço<select name="servico">{ops}</select></label>
<label>O que está acontecendo? <span>(opcional)</span><textarea name="mensagem" rows="3" placeholder="Ex.: barulho ao frear, luz da injeção acesa..."></textarea></label>
<button type="submit">{ICONE_WA}Enviar pelo WhatsApp</button>
</form>'''

PAGINAS = {
    'index': ('Início', 'Oficina mecânica multimarcas em Pinheiros, São Paulo, desde 1960. Manutenção, diagnóstico eletrônico e preparação. Orçamento pelo WhatsApp.'),
    'oficina': ('A oficina', 'A De Filippo atende em sede própria na Rua Fradique Coutinho, em Pinheiros. Conheça nossa história.'),
    'servicos': ('Serviços', 'Manutenção, preparação e diagnóstico eletrônico de carros nacionais e importados.'),
    'manutencao': ('Manutenção', SERVICOS[0]['resumo']),
    'preparacao': ('Preparação', SERVICOS[1]['resumo']),
    'diagnostico': ('Diagnóstico eletrônico', SERVICOS[2]['resumo']),
    'compromisso': ('Compromisso', 'O código de ética que seguimos em cada serviço.'),
    'orcamento': ('Orçamento', 'Peça um orçamento pelo WhatsApp em menos de um minuto.'),
    'contato': ('Contato', f'{RUA}, {BAIRRO}. Tel. {TEL}.'),
    'creditos': ('Créditos das fotos', 'Créditos e licenças das fotos ilustrativas.'),
}

def creditos_lista():
    import csv
    banco = os.path.join(AQUI, '..', '_origem', 'banco', 'creditos.tsv')
    linhas = {}
    with open(banco) as f:
        for r in csv.reader(f, delimiter='\t'):
            linhas[r[0][:-4]] = r
    out = []
    for nome, origem in FOTOS_BANCO.items():
        r = linhas[origem]
        out.append(f'<li><b>{nome}.jpg</b> · {e(r[1].strip() or "Autor desconhecido")} · {e(r[2])} · <a href="{e(r[3])}" target="_blank" rel="noopener">Wikimedia Commons</a></li>')
    return ''.join(out)

FOTOS_BANCO = {'oficina-restauracao': 'car-mechanic-workshop-61682809', 'bancada': 'car-mechanic-workshop-61683108', 'elevador': 'car-lift-garage-186889546',
    'suspensao': 'auto-repair-shop-mechanic-200532944', 'suspensao-elevada': 'auto-repair-shop-mechanic-194512646', 'motor': 'car-engine-bay-112444483', 'motor-pb': 'car-engine-bay-34387512',
    'freio': 'disc-brake-car-180762', 'freio-disco': 'disc-brake-car-70439455', 'ferramentas': 'mechanic-tools-wrench-32929603', 'alfa': 'Alfa-Romeo-Giulia-137748142',
    'fiat500-fila': 'Fiat-500-Abarth-199368191', 'abarth': 'Fiat-500-Abarth-49326468', 'fiat500': 'Fiat-500-classic-95703036', 'lancia': 'Lancia-Delta-156577200', 'fiat500-rua': 'Fiat-500-Abarth-16902129'}

def pagina(v, p, corpo, cabecalho, rodape, cls=''):
    titulo, desc = PAGINAS[p]
    return f'''<!doctype html><html lang="pt-BR"><head>{seo(v, p, titulo, desc)}</head>
<body class="pg-{p} {cls}"><div class="app">{cabecalho(p)}<main id="conteudo">{corpo}</main>{rodape()}</div>{flutuante()}{FORM_JS}</body></html>'''

