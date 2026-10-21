# Converte as fotos originais do site atual (baixadas em <originais>, nome = caminho da URL com / trocado por __) para public/assets/img.
# Uso: python3 imagens.py <originais>   (cópia em /mnt/project-files/haramaq/originais)
import json, os, sys, urllib.request
from PIL import Image, ImageDraw
orig = sys.argv[1]
aqui = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(aqui, '../public/assets/img'); os.makedirs(out, exist_ok=True)
D = json.load(open(os.path.join(aqui, 'dados.json')))
loc = lambda url: os.path.join(orig, url.replace('https://www.haramaq.com.br/', '').replace('/', '__'))

def salva(src, nome, larg, q=80, recorte=False):
    im = Image.open(src)
    im = im.convert('RGBA') if (im.mode in ('RGBA', 'LA', 'P') or recorte) else im.convert('RGB')
    if recorte and im.getextrema()[3][0] == 255:  # fundo branco: apaga o branco ligado às bordas
        rgb = im.convert('RGB'); W, H = im.size
        for xy in [(0, 0), (W-1, 0), (0, H-1), (W-1, H-1), (W//2, 0), (W//2, H-1), (0, H//2), (W-1, H//2)]:
            if sum(rgb.getpixel(xy)) > 720: ImageDraw.floodfill(rgb, xy, (255, 0, 255), thresh=28)
        px = rgb.load(); alfa = im.split()[3]; a = alfa.load()
        for y in range(H):
            for x in range(W):
                if px[x, y] == (255, 0, 255): a[x, y] = 0
        im.putalpha(alfa)
    if recorte and im.mode == 'RGBA': im = im.crop(im.getbbox())
    if im.width > larg: im = im.resize((larg, round(im.height * larg / im.width)), Image.LANCZOS)
    im.save(os.path.join(out, nome + '.webp'), 'WEBP', quality=q, method=6)

fotos = {
    'hero-confinamento': ('imagens__slider__banner-02.png', 2000), 'hero-leite': ('imagens__slider__banner-03.png', 2000),
    'hero-rodoviario': ('imagens__slider__banner-07.png', 2000), 'pasto': ('imagens__slider__banner-03.jpg', 1620),
    'entardecer': ('imagens__slider__banner-06.jpg', 1620), 'fabrica': ('imagens__breadcrumbs__bread-empresa.webp', 1700),
    'produtos-topo': ('imagens__breadcrumbs__bread-produtos.webp', 1700), 'campo-aereo': ('imagens__haramaq-campo__bg-haramaq-campo.webp', 1894),
    'selo-20anos': ('imagens__haramaq-campo__20-anos-haramaq.webp', 700), 'trato-leite': ('imagens__video-covers__vagao-misturador.webp', 336),
}
for n, (f, w) in fotos.items(): salva(os.path.join(orig, f), n, w)
for p in D['produtos']:
    salva(loc(p['foto']), 'p-' + p['slug'], 900, 82, recorte=True)
    for i, b in enumerate(p['spec'] + p['opc']):
        if b['img']: salva(loc(b['img']), f"f-{p['slug']}-{i}", 640, 78)
for b in D['blog']: salva(loc(b['img']), 'b-' + b['slug'][:40], 900)
vdir = os.path.join(orig, 'youtube'); os.makedirs(vdir, exist_ok=True)
# o terceiro depoimento da home atual (Lucas Badalotti) não está na página de vídeos
for v in D['videos'] + [{'id': 'iONPHwtYoTU'}]:
    f = os.path.join(vdir, v['id'] + '.jpg')
    if not os.path.exists(f):
        for q in ('maxresdefault', 'hqdefault'):
            try:
                dados = urllib.request.urlopen(f"https://img.youtube.com/vi/{v['id']}/{q}.jpg", timeout=30).read()
                if len(dados) > 5000: open(f, 'wb').write(dados); break
            except Exception: pass
    if os.path.exists(f): salva(f, 'v-' + v['id'], 800, 72)
print('imagens:', len(os.listdir(out)))
