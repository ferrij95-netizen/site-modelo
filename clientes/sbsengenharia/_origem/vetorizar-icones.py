# Vetoriza os ícones dos segmentos do site atual (img/ico-*.png, 55 px: desenho branco num círculo cinza).
# Grava icones.json com o "d" de cada desenho (viewBox 0 0 880 880) para usar em fill="currentColor".
from PIL import Image, ImageFilter
import potrace, numpy as np, os, json
d = os.path.dirname(os.path.abspath(__file__))
S = 16
res = {}
for n in ['aeroportuarias', 'rodovias', 'viarias', 'civil', 'energia', 'locacao']:
    a = np.array(Image.open(os.path.join(d, f'img/ico-{n}.png')).convert('RGBA')).astype(float)
    a = a[:55, :55]
    branco = ((a[..., :3].min(2) - 200) / 55).clip(0, 1) * (a[..., 3] / 255) * 255
    g = Image.fromarray(branco.astype('uint8')).resize((55 * S, 55 * S), Image.BICUBIC).filter(ImageFilter.GaussianBlur(S * 0.5))
    m = np.array(g) > 110
    ps = []
    for c in potrace.Bitmap(~m).trace(turdsize=60, alphamax=1.1, opticurve=True, opttolerance=1.0):
        st = c.start_point; p = [f"M{st.x:.0f},{st.y:.0f}"]
        for s in c.segments:
            if s.is_corner: p.append(f"L{s.c.x:.0f},{s.c.y:.0f}L{s.end_point.x:.0f},{s.end_point.y:.0f}")
            else: p.append(f"C{s.c1.x:.0f},{s.c1.y:.0f} {s.c2.x:.0f},{s.c2.y:.0f} {s.end_point.x:.0f},{s.end_point.y:.0f}")
        ps.append("".join(p) + "Z")
    ys, xs = np.where(m)
    res[n] = {'d': ''.join(ps), 'vb': f'{xs.min()-20} {ys.min()-20} {xs.max()-xs.min()+40} {ys.max()-ys.min()+40}'}
json.dump(res, open(os.path.join(d, 'icones.json'), 'w'))
print({k: (len(v['d']), v['vb']) for k, v in res.items()})
