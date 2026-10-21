# Vetoriza o logo do site atual (img/logo.png, só existe com 90 px). Quadrado azul com "sbs" vazado e "engenharia" embaixo.
from PIL import Image, ImageFilter
import potrace, numpy as np, os
d = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(d, '..', 'public', 'assets')
S = 16
a = np.array(Image.open(os.path.join(d, 'img/logo.png')).convert('RGBA'))[..., 3]
g = Image.fromarray(a).resize((a.shape[1] * S, a.shape[0] * S), Image.BICUBIC).filter(ImageFilter.GaussianBlur(S * 0.6))
m = np.array(g) > 128
def caminhos(mask):
    bm = potrace.Bitmap(mask)
    ps = []
    for c in bm.trace(turdsize=40, alphamax=1.15, opticurve=True, opttolerance=1.2):
        st = c.start_point; p = [f"M{st.x:.0f},{st.y:.0f}"]
        for s in c.segments:
            if s.is_corner: p.append(f"L{s.c.x:.0f},{s.c.y:.0f}L{s.end_point.x:.0f},{s.end_point.y:.0f}")
            else: p.append(f"C{s.c1.x:.0f},{s.c1.y:.0f} {s.c2.x:.0f},{s.c2.y:.0f} {s.end_point.x:.0f},{s.end_point.y:.0f}")
        ps.append("".join(p) + "Z")
    return "".join(ps)
corte = 73 * S
caixa = m.copy(); caixa[corte:] = False
texto = m.copy(); texto[:corte] = False
Dc, Dt = caminhos(caixa), caminhos(texto)
W, H = m.shape[1], m.shape[0]
for nome, cor in [('logo.svg', '#00519B'), ('logo-branco.svg', '#ffffff')]:
    open(os.path.join(out, nome), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="SBS Engenharia"><path fill="{cor}" fill-rule="evenodd" d="{Dc}{Dt}"/></svg>')
print('ok', W, H, len(Dc), len(Dt))
