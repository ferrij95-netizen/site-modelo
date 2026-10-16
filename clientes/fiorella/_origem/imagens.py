# Converte as fotos reais da Fiorella (site atual e FiorellaShop) em _origem/img para public/assets/img/*.webp.
# Corta as faixas brancas das fotos da loja e limita a 1800 px. Rodar: python3 clientes/fiorella/_origem/imagens.py
import os
from PIL import Image, ImageChops, ImageOps
base = os.path.dirname(os.path.abspath(__file__))
src, out = os.path.join(base, 'img'), os.path.join(base, '../public/assets/img')
os.makedirs(out, exist_ok=True)

def sem_borda(im):
  rgb = im.convert('RGB')
  dif = ImageChops.difference(rgb, Image.new('RGB', rgb.size, (255, 255, 255))).convert('L').point(lambda v: 255 if v > 18 else 0)
  box = dif.getbbox()
  return im.crop(box) if box else im

# recortes manuais (frações da imagem já sem borda)
CORTE = {
  'fibra-vermelha': (0.12, 0.2, 0.99, 0.99),
  'fibra-vermelha-2': (0.12, 0.2, 0.99, 0.99),
}
MAX = {'logo': 1200, 'simbolo': 600, 'iso-sgs-ukas': 600}
for f in sorted(os.listdir(src)):
  n, ext = os.path.splitext(f)
  im = Image.open(os.path.join(src, f))
  im = ImageOps.exif_transpose(im)
  alfa = im.mode in ('RGBA', 'LA', 'P') and n in ('logo',)
  im = im.convert('RGBA' if alfa else 'RGB')
  if not alfa and not n.startswith('ficha') and n not in ('iso-sgs-ukas', 'simbolo', 'nt-laser-caixa'):
    im = sem_borda(im)
  if n in CORTE:
    w, h = im.size; a, b, c, d = CORTE[n]
    im = im.crop((int(a * w), int(b * h), int(c * w), int(d * h)))
  if n == 'simbolo':
    im = sem_borda(im)
  m = MAX.get(n, 1800)
  im.thumbnail((m, m * 2 if n == 'confeccao-moda' else m))
  im.save(os.path.join(out, n + '.webp'), quality=80, method=6)
  if n == 'logo':
    # versão branca para fundos escuros
    a = im.getchannel('A'); br = Image.new('RGBA', im.size, (255, 255, 255, 255)); br.putalpha(a)
    br.save(os.path.join(out, 'logo-branco.webp'), quality=90)
  print(n, im.size)
