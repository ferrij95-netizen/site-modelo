# Vetoriza o logo do site atual (_origem/img/logo-original.png, 249x172 com o círculo branco, o único arquivo publicado).
# Uso: python3 clientes/hawaitransporte/_origem/vetorizar-logo.py  (precisa de pip install potracer numpy). Grava em ../public/assets/.
from PIL import Image, ImageFilter
import potrace, numpy as np, os
d = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(d, '..', 'public', 'assets')
im = Image.open(os.path.join(d, 'img/logo-original.png')).convert('RGBA')
a = np.array(im).astype(float)
al = a[..., 3] / 255
r, g, b = a[..., 0], a[..., 1], a[..., 2]
S = 8

def trace(tinta, blur=0.6, turd=40):
    t = Image.fromarray((np.clip(tinta, 0, 1) * 255).astype('uint8'))
    t = t.resize((im.width * S, im.height * S), Image.BICUBIC).filter(ImageFilter.GaussianBlur(S * blur))
    m = np.array(t) > 128
    ps = []
    for c in potrace.Bitmap(~m).trace(turdsize=turd, alphamax=1.0, opticurve=True, opttolerance=0.4):
        st = c.start_point; p = [f"M{st.x:.0f},{st.y:.0f}"]
        for s in c.segments:
            if s.is_corner: p.append(f"L{s.c.x:.0f},{s.c.y:.0f}L{s.end_point.x:.0f},{s.end_point.y:.0f}")
            else: p.append(f"C{s.c1.x:.0f},{s.c1.y:.0f} {s.c2.x:.0f},{s.c2.y:.0f} {s.end_point.x:.0f},{s.end_point.y:.0f}")
        ps.append("".join(p) + "Z")
    return "".join(ps), m

lum = (r + g + b) / 3
escuro = al * np.clip((90 - lum) / 40, 0, 1) * (np.abs(b - r) < 40)
# estrada inteira (com as faixas brancas) = escuro fechado
fe = Image.fromarray((escuro * 255).astype('uint8')).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))
estrada_cheia = np.array(fe) / 255
amarelo = al * np.clip((r + g) / 2 - b - 120, 0, 60) / 60 * (np.abs(r - g) < 70)
laranja = al * np.clip((r - g - 60) / 50, 0, 1) * (b < 90)
azul = al * np.clip((b - r - 30) / 50, 0, 1)
azul[97:] = 0  # a linha de baixo (7 px de altura) não dá para vetorizar: vai como texto em curvas, abaixo
faixa = estrada_cheia * np.clip((lum - 150) / 60, 0, 1)

p_estrada, m1 = trace(estrada_cheia)
p_faixa, _ = trace(faixa, 0.4, 10)
p_am, m2 = trace(amarelo)
p_la, m3 = trace(laranja)
p_az, m4 = trace(azul, 0.35, 4)
m = m1 | m2 | m3 | m4

# "TRANSPORTES DE VEÍCULOS LTDA": no original ocupa x 84-185, y 100-108 (letras de 8 px). Desenhada com a
# Liberation Sans Bold (métrica da Arial, a fonte do logo), apertada na largura do original e convertida em curvas.
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
fonte = TTFont('/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf')
gs, cmap, hmtx = fonte.getGlyphSet(), fonte.getBestCmap(), fonte['hmtx']
texto = 'TRANSPORTES DE VEÍCULOS LTDA'
larg = sum(hmtx[cmap[ord(c)]][0] for c in texto)
cap = fonte['OS/2'].sCapHeight
esc_y = 8 * S / cap * 1.06
esc_x = (185 - 84 + 1) * S / larg
pen = SVGPathPen(gs)
x = 0
for c in texto:
    n = cmap[ord(c)]
    gs[n].draw(TransformPen(pen, (esc_x, 0, 0, -esc_y, 84 * S + x * esc_x, 108.6 * S)))
    x += hmtx[n][0]
p_az += pen.getCommands()
ys, xs = np.where(m); x0, y0, x1, y1 = xs.min() - 6, ys.min() - 6, xs.max() + 6, ys.max() + 6
vb = f"{x0} {y0} {x1 - x0} {y1 - y0}"
def svg(cest, cfx, cam, cla, caz):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Hawai Transportes de Veículos">'
            f'<path fill="{cam}" d="{p_am}"/><path fill="{cla}" d="{p_la}"/><path fill="{cest}" d="{p_estrada}"/>'
            f'<path fill="{cfx}" d="{p_faixa}"/><path fill="{caz}" d="{p_az}"/></svg>')
open(os.path.join(out, 'logo.svg'), 'w').write(svg('#141414', '#ffffff', '#f6e400', '#ea7a15', '#33338a'))
open(os.path.join(out, 'logo-branco.svg'), 'w').write(svg('#141414', '#ffffff', '#f6e400', '#ea7a15', '#ffffff'))
print('ok', vb, len(p_estrada), len(p_faixa), len(p_am), len(p_la), len(p_az))
