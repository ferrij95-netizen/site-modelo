# Monta dados.json e as fotos (public/assets/img/{p,t}) a partir do que foi baixado do site atual.
# Uso: python3 -I extrair.py <pasta-baixada>
#   <pasta>/produtos.json  -> /wp-json/wc/store/products?per_page=100&page=1..4 (WooCommerce antigo, 326 produtos)
#   <pasta>/pcat.json      -> id do produto -> categorias, lido das páginas /categoria-produto/<cat>/ (data-product_id)
#   <pasta>/img/<id>-<n>.* -> fotos dos produtos
import json, re, sys, html, unicodedata, os
from PIL import Image

base = sys.argv[1]
aqui = os.path.dirname(os.path.abspath(__file__))
pub = os.path.join(aqui, '..', 'public', 'assets', 'img')

ps = json.load(open(os.path.join(base, 'produtos.json')))
pcat = {int(k): v for k, v in json.load(open(os.path.join(base, 'pcat.json'))).items()}

# Departamentos e subcategorias, na ordem do menu do site atual; nomes com acento e caixa corrigidos.
DEPS = [
  ('aluminio', 'Alumínio', [('bandeja-de-aluminio', 'Bandejas de alumínio'), ('folha-de-aluminio', 'Folhas de alumínio')]),
  ('baldes', 'Baldes', []),
  ('bobina', 'Bobinas', [('bobina-de-papel', 'Bobinas de papel'), ('bobina-de-plastico', 'Bobinas de plástico'), ('filme-pvc', 'Filme PVC'), ('filme-stretch', 'Filme stretch'), ('toalha-de-mesa', 'Toalha de mesa')]),
  ('caixas', 'Caixas', [('caixas-de-papelao', 'Caixas de papelão'), ('caixas-de-papel', 'Papel kraft'), ('caixas-de-plastico', 'Caixas de plástico'), ('com-divisorias', 'Com divisórias'), ('doces-salgados', 'Doces e salgados')]),
  ('descartaveis', 'Descartáveis', [('canudos', 'Canudos'), ('cartucho-de-papel', 'Cartucho de papel'), ('cartucho-de-papel-fundo-quadrado', 'Cartucho fundo quadrado'), ('copos', 'Copos'), ('garrafas-de-plastico', 'Garrafas de plástico'), ('palitos', 'Palitos'), ('pratos', 'Pratos'), ('talheres', 'Talheres')]),
  ('fitas', 'Fitas', [('adesivasacrilicas', 'Adesivas e acrílicas'), ('crepe-e-kraft', 'Crepe e kraft'), ('dupla-face', 'Dupla face'), ('etiquetas', 'Etiquetas'), ('gomada', 'Gomada')]),
  ('potes-freezer-micro', 'Freezer e micro-ondas', [('pote-retangular', 'Potes retangulares'), ('pote-redondo', 'Potes redondos')]),
  ('isopor-2', 'Isopor', [('bandeja', 'Bandejas'), ('copo-de-isopor', 'Copos de isopor'), ('diversos-isopor', 'Diversos'), ('lancheira', 'Lancheiras'), ('termicas', 'Caixas térmicas')]),
  ('limpezahigiene', 'Limpeza e higiene', [('agua-sanitaria', 'Água sanitária'), ('amaciante-de-roupas', 'Amaciante'), ('desinfetante', 'Desinfetante'), ('detergente', 'Detergente'), ('lava-roupas', 'Lava-roupas'), ('papeis', 'Papéis'), ('sabonete-liquido', 'Sabonete líquido')]),
  ('sacola', 'Sacolas', [('sacolas-de-papel-sacola', 'Sacolas de papel'), ('sacola-plastica', 'Sacolas plásticas')]),
  ('sacos', 'Sacos', [('adesivado', 'Adesivados'), ('saco-de-lixo', 'Saco de lixo'), ('saco-plastico', 'Saco plástico')]),
  ('tecidos', 'Tecidos', [('tnt', 'TNT')]),
  ('variedades', 'Variedades', [('abracadeira', 'Abraçadeiras'), ('cordas', 'Cordas e barbantes'), ('lonas', 'Lonas'), ('recipientes', 'Recipientes'), ('suportes', 'Suportes'), ('tapetes', 'Tapetes')]),
  ('vidrostampas', 'Vidros', [('garrafas', 'Garrafas'), ('potes', 'Potes'), ('tampas-para-vidro', 'Tampas para vidro')]),
]
SLUG_DEP = {'isopor-2': 'isopor', 'potes-freezer-micro': 'freezer-e-micro-ondas', 'limpezahigiene': 'limpeza-e-higiene', 'vidrostampas': 'vidros', 'bobina': 'bobinas', 'sacola': 'sacolas'}
SLUG_SUB = {'adesivasacrilicas': 'adesivas-e-acrilicas', 'caixas-de-papel': 'papel-kraft', 'sacolas-de-papel-sacola': 'sacolas-de-papel'}
DESTAQUES = [2935, 2875, 2836, 2823, 2801, 2797, 1631, 1223, 1044, 1029, 849, 841, 680, 622, 620, 617, 615, 610, 432]

def slug(s):
    s = unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def texto(h):
    h = re.sub(r'<br\s*/?>|</p>|</li>', '\n', h or '')
    t = html.unescape(re.sub(r'<[^>]+>', ' ', h))
    linhas = [re.sub(r'\s+', ' ', l).strip() for l in t.split('\n')]
    linhas = [re.sub(r'^(Descri[cç][aã]o:\s*)?[–-]\s*', '', l) for l in linhas]
    linhas = [re.sub(r'^Descri[cç][aã]o:\s*$', '', l) for l in linhas]
    return [l[0].upper() + l[1:] for l in linhas if l]

def nome(n):
    n = html.unescape(n).strip()
    n = re.sub(r'\s+', ' ', n)
    n = n.replace('plastico', 'plástico').replace('Plasticos', 'Plásticos').replace('Plastica', 'Plástica').replace('Pvc', 'PVC').replace('Bipck', 'Bipack')
    for a in ('De', 'Do', 'Da', 'Com', 'Para', 'E', 'Em'): n = re.sub(rf'(?<=\S) {a} ', f' {a.lower()} ', n)
    n = n.replace('  ', ' ').rstrip('.')
    return n[0].upper() + n[1:]

deps = []
for dslug, dnome, subs in DEPS:
    deps.append({'slug': SLUG_DEP.get(dslug, dslug), 'wp': dslug, 'nome': dnome,
                 'subs': [{'slug': SLUG_SUB.get(s, s), 'wp': s, 'nome': n} for s, n in subs]})
wp2dep = {d['wp']: d for d in deps}

usados = set(); prods = []
for p in ps:
    cats = pcat.get(p['id'], [])
    folhas = [c for c in cats if '__' in c] or cats
    c = folhas[0]
    dwp, _, swp = c.partition('__')
    d = wp2dep[dwp]
    sub = next((s for s in d['subs'] if s['wp'] == swp), None)
    n = nome(p['name'])
    s = slug(n)
    if s in usados: s = f"{s}-{p['id']}"
    usados.add(s)
    desc = texto(p.get('description'))
    fotos = []
    for i, im in enumerate(p['images'][:2]):
        ext = im['src'].rsplit('.', 1)[-1]
        f = os.path.join(base, 'img', f"{p['id']}-{i}.{ext}")
        if not os.path.exists(f): continue
        o = Image.open(f).convert('RGB')
        nomef = f"{s}" + (f'-{i+1}' if i else '')
        g = o.copy(); g.thumbnail((900, 900)); g.save(os.path.join(pub, 'p', nomef + '.webp'), 'WEBP', quality=78)
        t = o.copy(); t.thumbnail((420, 420)); t.save(os.path.join(pub, 't', nomef + '.webp'), 'WEBP', quality=74)
        # fundo: média dos cantos (muitas fotos da loja são no pano vermelho)
        w, h = o.size; px = [o.getpixel((x, y)) for x in (3, w - 4) for y in (3, h - 4)]
        r, gg, b = [sum(c[k] for c in px) // 4 for k in range(3)]
        fotos.append({'f': nomef, 'w': g.size[0], 'h': g.size[1], 'fundo': '#%02x%02x%02x' % (r, gg, b),
                      'vermelho': r > 140 and gg < 70 and b < 80})
    prods.append({'id': p['id'], 'slug': s, 'nome': n, 'dep': d['slug'], 'sub': sub['slug'] if sub else '',
                  'desc': desc, 'fotos': fotos, 'antigo': p['permalink'], 'destaque': p['id'] in DESTAQUES})

ordem = {i: k for k, i in enumerate(DESTAQUES)}
for d in deps:
    d['n'] = sum(1 for p in prods if p['dep'] == d['slug'])
    for s in d['subs']: s['n'] = sum(1 for p in prods if p['dep'] == d['slug'] and p['sub'] == s['slug'])
    d['subs'] = [s for s in d['subs'] if s['n']]
json.dump({'deps': deps, 'produtos': prods, 'destaques': sorted([p['slug'] for p in prods if p['destaque']], key=lambda s: ordem[next(p['id'] for p in prods if p['slug'] == s)])},
          open(os.path.join(aqui, 'dados.json'), 'w'), ensure_ascii=False, indent=0)
print(len(prods), 'produtos;', sum(len(p['fotos']) for p in prods), 'fotos;', sum(1 for p in prods for f in p['fotos'] if f['vermelho']), 'no pano vermelho')
for d in deps: print(d['nome'], d['n'], [(s['nome'], s['n']) for s in d['subs']])
