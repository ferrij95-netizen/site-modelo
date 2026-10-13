# Vetoriza a palavra "Coopermil" a partir do banner da página Leite do site atual (img/neg-leite.jpg, 960x240).
# Uso: python3 _origem/vetorizar-logo.py  (precisa de pip install potracer numpy). Grava em ../public/assets/.
from PIL import Image, ImageFilter
import potrace, numpy as np, os
d = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(d, '..', 'public', 'assets'); os.makedirs(out, exist_ok=True)
im = Image.open(os.path.join(d, 'img/neg-leite.jpg')).convert('RGB').crop((562, 48, 872, 134))
S = 8
a = np.array(im).astype(float)
blue = np.clip((a[..., 2] - a[..., 0] - 40) / 120, 0, 1) * 255  # quanto mais azul, mais "tinta"
g = Image.fromarray(blue.astype('uint8')).resize((im.width * S, im.height * S), Image.BICUBIC).filter(ImageFilter.GaussianBlur(S * 0.8))
m = np.array(g) > 120
bm = potrace.Bitmap(~m)
plist = bm.trace(turdsize=60, alphamax=1.1, opticurve=True, opttolerance=0.6)
ps = []
for c in plist:
    st = c.start_point; p = [f"M{st.x:.0f},{st.y:.0f}"]
    for s in c.segments:
        if s.is_corner: p.append(f"L{s.c.x:.0f},{s.c.y:.0f}L{s.end_point.x:.0f},{s.end_point.y:.0f}")
        else: p.append(f"C{s.c1.x:.0f},{s.c1.y:.0f} {s.c2.x:.0f},{s.c2.y:.0f} {s.end_point.x:.0f},{s.end_point.y:.0f}")
    ps.append("".join(p) + "Z")
D = "".join(ps)
ys, xs = np.where(m); x0, y0, x1, y1 = xs.min() - 4, ys.min() - 4, xs.max() + 4, ys.max() + 4
vb = f"{x0} {y0} {x1 - x0} {y1 - y0}"
for nome, cor in [('logo-cor.svg', '#0066A6'), ('logo-branco.svg', '#ffffff')]:
    open(os.path.join(out, nome), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Coopermil"><path fill="{cor}" fill-rule="evenodd" d="{D}"/></svg>')
print('ok', vb, len(D))
