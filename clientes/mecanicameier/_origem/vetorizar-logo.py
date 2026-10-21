# Vetoriza o logo do site atual (images/logo.png, 212x61): a assinatura "Meier", as bandeiras quadriculadas,
# "Adelino" e "MECÂNICA AUTOMOTIVA". Monta a placa vermelha (logo.svg) e a versão sem placa do rodapé atual (logo-*.svg).
# Uso: python3 clientes/mecanicameier/_origem/vetorizar-logo.py  (precisa de pip install potracer numpy pillow).
from PIL import Image, ImageFilter
import potrace, numpy as np, os
d = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(d, '..', 'public', 'assets'); os.makedirs(out, exist_ok=True)
a = np.array(Image.open(os.path.join(d, 'img/logo.png')).convert('RGB')).astype(float)
S = 10
L = a.mean(2); G = a[..., 1]

def tracar(tinta, caixa, limiar=120, blur=0.35, turd=20):
    x0, y0, x1, y1 = caixa
    t = np.zeros_like(tinta); t[y0:y1, x0:x1] = tinta[y0:y1, x0:x1]
    g = Image.fromarray(np.clip(t, 0, 255).astype('uint8')).resize((a.shape[1] * S, a.shape[0] * S), Image.BICUBIC).filter(ImageFilter.GaussianBlur(S * blur))
    m = np.array(g) > limiar
    ps = []
    for c in potrace.Bitmap(~m).trace(turdsize=turd, alphamax=1.0, opticurve=True, opttolerance=0.4):
        st = c.start_point; p = [f"M{st.x / S:.2f},{st.y / S:.2f}"]
        for s in c.segments:
            if s.is_corner: p.append(f"L{s.c.x / S:.2f},{s.c.y / S:.2f}L{s.end_point.x / S:.2f},{s.end_point.y / S:.2f}")
            else: p.append(f"C{s.c1.x / S:.2f},{s.c1.y / S:.2f} {s.c2.x / S:.2f},{s.c2.y / S:.2f} {s.end_point.x / S:.2f},{s.end_point.y / S:.2f}")
        ps.append("".join(p) + "Z")
    return "".join(ps)

# Fundo da placa muda de cor linha a linha (degradê): a "tinta" é a diferença para a mediana da linha.
fundoL = np.median(L[:, 30:180], axis=1, keepdims=True); fundoG = np.median(G[:, 30:180], axis=1, keepdims=True)
preto = np.clip((fundoL - L - 6) / 40, 0, 1) * 255
branco = np.clip((G - fundoG - 25) / 60, 0, 1) * 255
escuro = np.clip((fundoL - L - 8) / 30, 0, 1) * 255  # "Adelino": vinho sobre rosa
pm = preto.copy(); pm[:23, :52] = 0  # tira a caixa do "Adelino"
meier = tracar(pm, (24, 7, 172, 44), limiar=95, blur=0.3, turd=30)
bandeiras = tracar(preto, (172, 6, 206, 34), limiar=110, blur=0.5, turd=4)
adelino = tracar(escuro, (13, 11, 48, 20), limiar=130, blur=0.45, turd=4)
tag = tracar(branco, (8, 46, 204, 56), limiar=110, blur=0.45, turd=4)

placa = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 61" role="img" aria-label="Adelino Meier Mecânica Automotiva">
<defs><linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3a59e"/><stop offset=".42" stop-color="#d23a2e"/><stop offset=".62" stop-color="#b3241c"/><stop offset="1" stop-color="#d8401f"/></linearGradient></defs>
<rect x=".8" y=".8" width="210.4" height="59.4" rx="7" fill="#111" stroke="#cfcfcf" stroke-width="1.2"/>
<rect x="3.5" y="3.5" width="205" height="54" rx="5" fill="url(#p)"/>
<rect x="12" y="10.5" width="37" height="10" rx="1.5" fill="none" stroke="#8f1d16" stroke-opacity=".55" stroke-width=".7"/>
<path fill="#5a0f0b" d="{adelino}"/>
<path fill="#111" stroke="#fff" stroke-width=".7" paint-order="stroke" stroke-linejoin="round" d="{meier}"/>
<path fill="#111" d="{bandeiras}"/>
<path fill="#fff" d="{tag}"/>
</svg>'''
open(os.path.join(out, 'logo.svg'), 'w').write(placa)
# Versão sem placa (como no rodapé do site atual): assinatura vermelha e "MECÂNICA AUTOMOTIVA" clara ou escura.
for nome, cm, ct in [('logo-escuro.svg', '#d0291f', '#ffffff'), ('logo-claro.svg', '#b3241c', '#1a1a1a')]:
    open(os.path.join(out, nome), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 6 186 52" role="img" aria-label="Meier Mecânica Automotiva"><path fill="{cm}" d="{meier}"/><path fill="{ct}" d="{tag}"/></svg>')
print('ok', len(meier), len(bandeiras), len(adelino), len(tag))
