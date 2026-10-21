# Contorna em vetor o logo HaramaQ (o maior que existe no site atual, recortado de imagens/haramaq-campo/20-anos-haramaq.webp).
# python3 logo.py logo-big.png ../public/assets
import sys, numpy as np, potrace
from PIL import Image, ImageFilter
src, out = sys.argv[1], sys.argv[2]
S = 4
im = Image.open(src).convert('RGBA'); W, H = im.size
big = im.resize((W*S, H*S), Image.LANCZOS)
m = Image.fromarray(((np.asarray(big)[..., 3] > 128)*255).astype('uint8')).filter(ImageFilter.GaussianBlur(2))
mask = np.asarray(m) > 127
pl = potrace.Bitmap(~mask).trace(turdsize=30, alphamax=1.0, opticurve=True, opttolerance=0.25)
d = []
for c in pl:
    s = c.start_point; d.append(f"M{s.x/S:.1f} {s.y/S:.1f}")
    for seg in c.segments:
        if seg.is_corner: d.append(f"L{seg.c.x/S:.1f} {seg.c.y/S:.1f}L{seg.end_point.x/S:.1f} {seg.end_point.y/S:.1f}")
        else: d.append(f"C{seg.c1.x/S:.1f} {seg.c1.y/S:.1f} {seg.c2.x/S:.1f} {seg.c2.y/S:.1f} {seg.end_point.x/S:.1f} {seg.end_point.y/S:.1f}")
    d.append('Z')
d = ''.join(d)
for nome, cor in (('logo-cor.svg', '#c52127'), ('logo-claro.svg', '#ffffff')):
    open(f'{out}/{nome}', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="HaramaQ"><path fill="{cor}" fill-rule="evenodd" d="{d}"/></svg>')
print('ok', W, H, len(d))
