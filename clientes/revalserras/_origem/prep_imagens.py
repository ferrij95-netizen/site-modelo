# Prepara as imagens do site a partir do material baixado do site atual (revalserras.com.br): fotos, logos,
# fotos e tabelas das serras, imagens do catálogo da Reval Laser (catalogo2.pdf) e quadros do vídeo serras.mp4.
# Uso: python3 prep_imagens.py <pasta-baixada> (pasta com img/, pdfi/, fr/ e dados.json, ver LEIA-ME.md)
import json, os, sys
from PIL import Image
src = sys.argv[1]
pub = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../public/assets')
I = lambda *p: os.path.join(src, *p)
def loc(u):
    u = u.replace('https://www.revalserras.com.br', '').lstrip('/')
    return I('img', u.replace('/', '__'))
def salvar(im, dest, larg, q=80, crop=None):
    im = im.convert('RGB')
    if crop: im = im.crop(crop)
    if im.size[0] > larg: im = im.resize((larg, round(im.size[1] * larg / im.size[0])), Image.LANCZOS)
    im.save(os.path.join(pub, dest), 'WEBP', quality=q, method=6)

# Logos: Reval Serras e Reval Laser (PNG transparente 2900 px). Versão branca: azul vira branco, disco cinza clareia.
for nome, f in [('serras', 'site__images__serras.png'), ('laser', 'site__images__laser.png')]:
    im = Image.open(I('img', f)).convert('RGBA'); im = im.crop(im.getbbox())
    im.resize((900, round(im.size[1] * 900 / im.size[0])), Image.LANCZOS).save(os.path.join(pub, f'logo-{nome}.png'), optimize=True)
    px = im.load(); w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a and b > r + 40: px[x, y] = (255, 255, 255, a)
            elif a: px[x, y] = (min(255, r + 40), min(255, g + 40), min(255, b + 40), a)
    im.resize((900, round(h * 900 / w)), Image.LANCZOS).save(os.path.join(pub, f'logo-{nome}-branco.png'), optimize=True)
    if nome == 'serras':
        disco = Image.open(I('img', f)).convert('RGBA').crop((154, 123, 154 + 683, 806))
        disco = disco.crop(disco.getbbox())
        disco.resize((256, 256), Image.LANCZOS).save(os.path.join(pub, 'favicon.png'), optimize=True)
        disco.resize((400, 400), Image.LANCZOS).save(os.path.join(pub, 'disco.png'), optimize=True)

fotos = {
    'aerea': I('img', 'uploads__imagens__SGxbqL14fEkS4n16wSzJWJCw96PzssfgTrtOGnsr.jpg'),
    'aerea-2': I('pdfi', 'l-003.png'),
    'fabrica-telhado': I('img', 'uploads__imagens__1hY98BwVHjLzxugYvjbhJSjDWqmw3iP3PAvUjsSd.jpg'),
    'fachada': I('pdfi', 'l-007.png'),
    'fachada-pb': I('pdfi', 'l-000.png'),
    'fachada-2': I('img', 'uploads__imagens__OWMZ6sqRNVKtITcB3n9MLxr2G2iudO3vyMb1szqC.jpg'),
    'letreiro': I('img', 'uploads__imagens__IZ11mMxa3ytDINVaSGzj81aGjEHdqEf1E9NL7Aol.jpg'),
    'serras-mesa': I('img', 'uploads__imagens__5Xkp5LVYkZdxp08QcctrE1CD7IFTXmnD24dgZWD0.jpg'),
    'laser-trumpf': I('pdfi', 'l-004.png'),
    'dobra': I('pdfi', 'l-005.png'),
    'laser-chapa': I('pdfi', 'l-008.png'),
    'dobra-2': I('pdfi', 'l-009.png'),
    'laser-cabecote': I('img', 'uploads__categorias_de_produtos____GSxelLG0CfS1M1h9uYwRUoUbSFQYNue0MExbF7AA.jpg'),
    'dobra-3': I('img', 'uploads__categorias_de_produtos____xpUTtHxSjyJj8I3KcYzwXbEb3lZv7NKLIorYbxb0.png'),
    'iso': I('img', 'uploads__imagens__0Z6ADK8DJMxcndntFTURymfDjOX4sZV2BrSsW7rk.jpg'),
    'certificado': I('pdfi', 'l-006.png'),
    'afiacao-linha': I('fr', 'vs-0.5.jpg'),
    'afiacao-operador': I('fr', 'vs-3.5.jpg'),
    'afiacao-robo': I('fr', 'vs-9.5.jpg'),
    'afiacao-serra': I('fr', 'vs-11.jpg'),
}
for n, f in fotos.items(): salvar(Image.open(f), f'img/{n}.webp', 1600, 78)
# Fotos de segmento do site atual: o rótulo branco ("Painéis", "Madeira Maciça"...) fica no alto; corta fora.
segs = {'paineis': '2zQ9mrm6kRHzpjmBZfMAlzZ0at1eix8e9dLV6veF', 'madeira': 'v2xyUQNgtoRxfoqtxji2hsooBXzTpwf4Bn4CiYt9',
        'aluminio': 'rK0XCgjCb5XSBA95jPFi6Lzhd1yVdXg1bIKIfs7m', 'polimeros': 'Gdjq89wUNYOeGpTHLwDdZ9r54OHmGOxYzI5zj33b'}
for n, h in segs.items():
    im = Image.open(I('img', f'uploads__categorias_de_produtos____{h}.jpg')); w, hh = im.size
    salvar(im, f'img/seg-{n}.webp', 900, 80, crop=(0, round(hh * .27), w, hh))

# Serras: foto principal e as tabelas/ilustrações de cada produto (já vêm em pt/es/en no próprio desenho).
dados = json.load(open(I('dados.json')))['pt']['prods']
for p in dados:
    im = Image.open(loc(p['img'])); im = im.convert('RGB')
    salvar(im, f"img/p/{p['id']}.webp", 900, 82)
    for k, g in enumerate(p['gal']):
        salvar(Image.open(loc(g)), f"img/t/{p['id']}-{k + 1}.webp", 1100, 86)
print('ok')
