# Vetoriza o logo do site atual (LOGO.png, 246x62) em SVG: python3 _origem/vetorizar-logo.py 0.3 (precisa de pip install potracer), rodar dentro de public/assets/.
from PIL import Image, ImageFilter
import potrace, numpy as np, sys
import os; src=os.path.join(os.path.dirname(os.path.abspath(__file__)),'img/2018_11_LOGO.png')
im=Image.open(src).convert('RGBA')
S=10; BL=float(sys.argv[1]) if len(sys.argv)>1 else 0.35
big=im.resize((im.width*S,im.height*S),Image.BICUBIC)
a=np.array(big).astype(float)
r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
W=big.width;H=big.height
xs=np.arange(W)[None,:].repeat(H,0)
alpha=Image.fromarray(al.astype('uint8')).filter(ImageFilter.GaussianBlur(S*BL))
A=np.array(alpha)>100
red=A&(r>b+40)&(xs<50*S)
emb=A&(xs<50*S)&~red
txt=A&(xs>=50*S)
def trace(mask):
    bm=potrace.Bitmap(~mask)
    bm=potrace.Bitmap(~mask)
    plist=bm.trace(turdsize=30,alphamax=1.1,opticurve=True,opttolerance=0.4)
    d=[]
    for c in plist:
        st=c.start_point; d.append(f"M{st.x:.0f},{st.y:.0f}")
        for s in c.segments:
            if s.is_corner: d.append(f"L{s.c.x:.0f},{s.c.y:.0f}L{s.end_point.x:.0f},{s.end_point.y:.0f}")
            else: d.append(f"C{s.c1.x:.0f},{s.c1.y:.0f} {s.c2.x:.0f},{s.c2.y:.0f} {s.end_point.x:.0f},{s.end_point.y:.0f}")
        d.append("Z")
    return "".join(d)
dt,de,dr=trace(txt),trace(emb),trace(red)
grad=f'<defs><linearGradient id="fg" x1="0" y1="0" x2="{48*S}" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1f2a61"/><stop offset="1" stop-color="#0d6cb5"/></linearGradient></defs>'
def svg(t,e,rr,defs=''):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="Flamarsul Distribuidora">{defs}<path fill="{e}" d="{de}"/><path fill="{rr}" d="{dr}"/><path fill="{t}" d="{dt}"/></svg>'
open('logo-cor.svg','w').write(svg('#1f2a61','url(#fg)','#c91b27',grad))
open('logo-branco.svg','w').write(svg('#ffffff','#ffffff','#e3343f'))
open('simbolo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {50*S} {H}">{grad}<path fill="url(#fg)" d="{de}"/><path fill="#c91b27" d="{dr}"/></svg>')
