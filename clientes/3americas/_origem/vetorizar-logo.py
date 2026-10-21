# Vetoriza o logo do site atual (_origem/img/logo-original.png, 293x93, o único arquivo do logo publicado).
# Uso: python3 clientes/3americas/_origem/vetorizar-logo.py  (precisa de pip install potracer numpy). Grava em ../public/assets/.
from PIL import Image, ImageFilter
import potrace, numpy as np, os
d = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(d, '..', 'public', 'assets')
im = Image.open(os.path.join(d, 'img/logo-original.png')).convert('RGBA')
a = np.array(im).astype(float)
al = a[..., 3] / 255
r, g, b = a[..., 0], a[..., 1], a[..., 2]
S = 8

def trace(tinta):
    t = Image.fromarray((np.clip(tinta, 0, 1) * 255).astype('uint8'))
    t = t.resize((im.width * S, im.height * S), Image.BICUBIC).filter(ImageFilter.GaussianBlur(S * 0.6))
    m = np.array(t) > 128
    ps = []
    for c in potrace.Bitmap(~m).trace(turdsize=40, alphamax=1.0, opticurve=True, opttolerance=0.4):
        st = c.start_point; p = [f"M{st.x:.0f},{st.y:.0f}"]
        for s in c.segments:
            if s.is_corner: p.append(f"L{s.c.x:.0f},{s.c.y:.0f}L{s.end_point.x:.0f},{s.end_point.y:.0f}")
            else: p.append(f"C{s.c1.x:.0f},{s.c1.y:.0f} {s.c2.x:.0f},{s.c2.y:.0f} {s.end_point.x:.0f},{s.end_point.y:.0f}")
        ps.append("".join(p) + "Z")
    return "".join(ps), m

vermelho, mv = trace(al * np.clip((r - b - 40) / 80, 0, 1))
azul, ma = trace(al * np.clip((b - r - 40) / 80, 0, 1))
m = mv | ma
ys, xs = np.where(m); x0, y0, x1, y1 = xs.min() - 4, ys.min() - 4, xs.max() + 4, ys.max() + 4
vb = f"{x0} {y0} {x1 - x0} {y1 - y0}"
grad = f'<defs><linearGradient id="ta-azul" x1="0" y1="{y0}" x2="0" y2="{y1}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0a64ad"/><stop offset=".55" stop-color="#004a98"/><stop offset="1" stop-color="#003580"/></linearGradient></defs>'
def svg(fazul, fverm, defs=''):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Três Américas Logística e Transporte">{defs}<path fill="{fverm}" fill-rule="evenodd" d="{vermelho}"/><path fill="{fazul}" fill-rule="evenodd" d="{azul}"/></svg>'
open(os.path.join(out, 'logo.svg'), 'w').write(svg('url(#ta-azul)', '#c4161c', grad))
open(os.path.join(out, 'logo-branco.svg'), 'w').write(svg('#ffffff', '#e0262c'))
open(os.path.join(out, 'logo-mono.svg'), 'w').write(svg('#ffffff', '#ffffff'))
print('ok', vb, len(vermelho), len(azul))
