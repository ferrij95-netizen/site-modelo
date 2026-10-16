# Recorta as fotos das máquinas (tira o fundo e a moldura) com rembg, modelo isnet-general-use.
# Grava PNG transparente em <originais>/recortes/<arquivo>.png; imagens.mjs usa o recorte quando ele existe.
# python3 clientes/maquinasaguia/_origem/recortar.py [pasta dos originais]
import json, os, sys
from PIL import Image
from rembg import remove, new_session

AQUI = os.path.dirname(os.path.abspath(__file__))
orig = sys.argv[1] if len(sys.argv) > 1 else os.path.join(AQUI, 'img')
dest = os.path.join(orig, 'recortes'); os.makedirs(dest, exist_ok=True)
sessao = new_session('isnet-general-use')
dados = json.load(open(os.path.join(AQUI, 'dados.json')))
fotos = [f for p in dados['produtos'] for f in p['fotos'][:4]]
for i, f in enumerate(fotos):
    out = os.path.join(dest, os.path.splitext(f)[0] + '.png')
    if os.path.exists(out): continue
    im = Image.open(os.path.join(orig, f)).convert('RGB'); im.thumbnail((1400, 1400))
    r = remove(im, session=sessao, post_process_mask=True)
    bb = r.getbbox()
    if bb: r = r.crop(bb)
    r.save(out)
    print(i + 1, len(fotos), f, flush=True)
