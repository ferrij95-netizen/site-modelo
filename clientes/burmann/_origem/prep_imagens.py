# Prepara as imagens de public/assets a partir do site atual baixado (wget) e das fotos de banco.
# python3 -I prep_imagens.py <pasta www.burmannalimentos.com.br> <pasta das faixas rot-0N.jpg> <pasta das fotos de banco>
import sys, os, glob
from PIL import Image
site, rot, banco = sys.argv[1:4]
pub = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'assets')
for d in ('img', 'faixa', 'graos'): os.makedirs(os.path.join(pub, d), exist_ok=True)
# Grãos: as fotos 145 px do catálogo atual, sem ampliar.
for f in glob.glob(os.path.join(site, 'imagens', '0[0-9][0-9]-a.jpg')):
    Image.open(f).convert('RGB').save(os.path.join(pub, 'graos', os.path.basename(f)[:3] + '.webp'), quality=88)
# Faixas do rotativo do topo (960 x 262 com a sombra branca embaixo): só a foto.
for f in sorted(glob.glob(os.path.join(rot, 'rot-0*.jpg'))):
    Image.open(f).convert('RGB').crop((0, 7, 960, 222)).save(os.path.join(pub, 'faixa', os.path.basename(f)[:-4] + '.webp'), quality=84)
# Fotos de banco: 1800 px e 900 px.
for f in glob.glob(os.path.join(banco, '*.jpg')):
    im = Image.open(f).convert('RGB'); n = os.path.basename(f)[:-4]
    for w, suf in ((1800, ''), (900, '-p')):
        w2 = min(w, im.width)
        im.resize((w2, round(im.height * w2 / im.width)), Image.LANCZOS).save(os.path.join(pub, 'img', f'{n}{suf}.webp'), quality=74)
print('ok')
