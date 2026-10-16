"""Lê o site atual da AB (abplast.com.br) e grava dados.json com as coleções da Linha AB,
os produtos de cada uma (foto, referência, resina, gargalo, molde, dimensão, volume), as cores
e as bombas (pumps). Uso: python3 extrair.py <pasta-cache>"""
import json, re, sys, html, os, subprocess
from bs4 import BeautifulSoup

CACHE = sys.argv[1] if len(sys.argv) > 1 else '/tmp/abplast-cache'
os.makedirs(CACHE, exist_ok=True)
BASE = 'https://abplast.com.br'

def get(url):
    f = os.path.join(CACHE, re.sub(r'[^a-z0-9]+', '_', url.lower()) + '.html')
    if not os.path.exists(f):
        subprocess.run(['curl', '-sS', '-L', '-m', '60', '-o', f, url], check=True)
    return open(f, encoding='utf-8', errors='ignore').read()

def t(el):
    return re.sub(r'\s+', ' ', el.get_text(' ', strip=True)).strip() if el else ''

def src(img):
    return img.get('data-lazy-src') or img.get('src')

def maior(img):
    ss = img.get('data-lazy-srcset') or img.get('srcset') or ''
    best, bw = src(img), 0
    for part in ss.split(','):
        p = part.strip().split(' ')
        if len(p) == 2 and p[1].endswith('w') and int(p[1][:-1]) > bw and int(p[1][:-1]) <= 2048:
            best, bw = p[0], int(p[1][:-1])
    return best

api = json.loads(get(BASE + '/wp-json/wp/v2/colecoes?per_page=100'))
colecoes = []
for c in sorted(api, key=lambda c: c['name']):
    s = get(f"{BASE}/colecoes/{c['slug']}/")
    soup = BeautifulSoup(s, 'html.parser')
    col = {'slug': c['slug'], 'nome': html.unescape(c['name']), 'qtd': c['count']}
    col['atributos'] = [[t(d) for d in it.find_all('div', recursive=False)] for it in soup.select('.AtribsColecaoItem')]
    desc = []
    for p in soup.select('.elementor-widget-text-editor p'):
        tx = t(p)
        if tx and 'perfeita para os mercados' not in tx and len(tx) > 40 and 'formulário' not in tx and 'Conheça nossas' not in tx:
            desc.append(tx)
    col['descricao'] = desc
    col['mercados'] = [t(li) for li in soup.select('.listaSegmentos li')]
    bgs = re.findall(r"url\('(https://abplast\.com\.br/wp-content/uploads/[^']+)'\)", s)
    col['fundos'] = [b for b in bgs if 'banner' in b.lower() or 'cabecalho' in b.lower() or 'capas' in b.lower()]
    gal = []
    for img in soup.select('.elementor-widget-image img'):
        u = maior(img)
        if u and 'uploads' in u and not any(k in u for k in ('Logo', 'iso-', 'uai-so', 'Ab-plAst', 'Layer_1', 'Mask-group', 'Portfolio')):
            gal.append(u)
    col['galeria'] = list(dict.fromkeys(gal))
    abas = [t(b) for b in soup.select('.cards-menu .card-tab')]
    produtos = []
    for i, item in enumerate(soup.select('.cards-content .card-item')):
        aba = abas[i] if i < len(abas) else ''
        for box in item.select('.produto-box'):
            img = box.select_one('.produto-image img')
            at = {}
            for d in box.select('.atributos-produto > div'):
                sp = d.find('span')
                if sp:
                    k = t(sp).rstrip(':')
                    sp.extract()
                    at[k] = t(d)
            produtos.append({'aba': aba, 'nome': t(box.find('h4')), 'foto': src(img) if img else '', **{'atrib': at}})
    col['produtos'] = produtos
    cores = []
    for g in soup.select('.listaCoresCol .grupoCorPai'):
        grupo = {'grupo': t(g.find('h3')), 'tipos': []}
        for b in g.select('.blocoCor'):
            grupo['tipos'].append({'tipo': t(b.select_one('.corFilhoTitulo')),
                                   'cores': [{'nome': t(ci.select_one('.txtCor')), 'img': src(ci.find('img'))} for ci in b.select('.corItem')]})
        cores.append(grupo)
    col['cores'] = cores
    colecoes.append(col)
    print(col['nome'], len(produtos), 'produtos', len(col['galeria']), 'fotos', sum(len(x['cores']) for g in cores for x in g['tipos']), 'cores', file=sys.stderr)

json.dump({'colecoes': colecoes}, open(os.path.join(os.path.dirname(__file__), 'dados.json'), 'w'), ensure_ascii=False, indent=1)
