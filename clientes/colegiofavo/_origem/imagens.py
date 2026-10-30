# Converte as imagens baixadas do site atual (colegiofavo.com.br/img, pasta orig/) para webp em public/assets/img e grava dim.json.
# Uso: python3 clientes/colegiofavo/_origem/imagens.py <pasta orig/img> [<pasta com cut-alunos.png e cut-criancas.png>]
# Os recortes dos alunos saem dos banners 1 e 2 do site atual com rembg (u2net), ver LEIA-ME.md.
import sys, os, json
from PIL import Image, ImageChops
O = sys.argv[1]; C = sys.argv[2] if len(sys.argv) > 2 else None
aqui = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(aqui, '../public/assets/img'); os.makedirs(D, exist_ok=True)
dim = {}
def salva(im, nome, w=None, q=78):
    if w and im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(D, nome + '.webp'), 'WEBP', quality=q, method=6)
    dim[nome] = [im.width, im.height]
def apara(im):  # tira a moldura branca
    bg = Image.new('RGB', im.size, (255, 255, 255)); bb = ImageChops.difference(im, bg).point(lambda p: 255 if p > 18 else 0).getbbox()
    return im.crop(bb) if bb else im
# Fotos da estrutura: a faixa azul com o nome é cortada (o nome vira legenda em HTML), 2x para telas densas.
for n in [1,2,3,4,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,27,28,29]:
    im = apara(Image.open(f'{O}/estrutura/{n}.png').convert('RGB').crop((0, 0, 350, 240)))
    salva(im.resize((im.width * 2, im.height * 2), Image.LANCZOS), f'est-{n}', q=80)
im = Image.open(f'{O}/imginfantil.jpg').convert('RGB'); salva(im.crop((100, 262, 872, 742)), 'infantil-roda')
im = Image.open(f'{O}/about-plan.jpg').convert('RGB'); salva(im, 'ad-tecnologia')
im = Image.open(f'{O}/bg-agende1.png').convert('RGB'); salva(im.crop((35, 118, 392, 468)), 'orgulho-pedro')
for f, n in [('ftd.png', 'parc-ftd'), ('cleverup.png', 'parc-cleverup'), ('esportelazer.png', 'parc-esporte')]:
    salva(apara(Image.open(f'{O}/{f}').convert('RGB')), n, q=90)
im = Image.open(f'{O}/abelha1.png').convert('RGBA'); salva(im, 'abelha', q=90)
im = Image.open(f'{O}/diamond1.png').convert('RGBA'); salva(im, 'abelha-grande', 500, q=88)
im = Image.open(f'{O}/atv33.jpg').convert('RGB'); salva(im, 'mel-escorrendo', 1920, q=80)
im = Image.open(f'{O}/banner/banner1.jpg').convert('RGB'); salva(im, 'banner-matriculas', q=82)
im = Image.open(f'{O}/banner/banner2.jpg').convert('RGB'); salva(im, 'banner-infantil', q=82)
if C:
    for n in ['alunos', 'criancas']:
        im = Image.open(f'{C}/cut-{n}.png').convert('RGBA'); im = im.crop(im.getbbox())
        salva(im.resize((round(im.width * 1.5), round(im.height * 1.5)), Image.LANCZOS), f'recorte-{n}', q=86)
json.dump(dim, open(os.path.join(aqui, 'dim.json'), 'w'))
print(len(dim), 'imagens')
