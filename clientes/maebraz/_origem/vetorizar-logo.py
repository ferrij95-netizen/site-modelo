# Vetoriza o logo da Maebraz (logo22.png do site atual, 232x54, ampliado 6x pelo canal alfa): "MAEBRAZ Industrial LTDA" em azul.
# python3 vetorizar-logo.py <logo22.png> <pasta-saida>
from PIL import Image, ImageFilter
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
K=6
a=im.split()[3].resize((im.width*K,im.height*K),Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
m=np.array(a)>128
k=1/K
pl=potrace.Bitmap(~m).trace(turdsize=20,alphamax=1.0,opticurve=True,opttolerance=0.2)
d=[]
for c in pl:
  s=c.start_point; d.append(f"M{s.x*k:.2f} {s.y*k:.2f}")
  for seg in c.segments:
    if seg.is_corner: d.append(f"L{seg.c.x*k:.2f} {seg.c.y*k:.2f}L{seg.end_point.x*k:.2f} {seg.end_point.y*k:.2f}")
    else: d.append(f"C{seg.c1.x*k:.2f} {seg.c1.y*k:.2f} {seg.c2.x*k:.2f} {seg.c2.y*k:.2f} {seg.end_point.x*k:.2f} {seg.end_point.y*k:.2f}")
  d.append('Z')
ys=np.where(m.any(axis=1))[0]; xs=np.where(m.any(axis=0))[0]
vb=f'{xs.min()*k-1:.0f} {ys.min()*k-1:.0f} {(xs.max()-xs.min())*k+2:.0f} {(ys.max()-ys.min())*k+2:.0f}'
for nome,cor in [('logo','#1e6bb3'),('logo-branco','#ffffff')]:
  open(f'{out}/{nome}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="{cor}" fill-rule="evenodd" d="{"".join(d)}"/></svg>')
print(vb)
