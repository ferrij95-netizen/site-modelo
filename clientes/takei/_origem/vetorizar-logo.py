# Vetoriza o logo do catálogo digital da Takei (imagem 1084x332, logo branco sobre preto): círculo com o T listrado e "TAKEI ESTOFADOS".
# python3 vetorizar-logo.py <logo-mask.png> <pasta-saida>
from PIL import Image
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('L'); out=sys.argv[2]
S=3
a=np.array(im.resize((im.width*S,im.height*S),Image.LANCZOS)).astype(int)
H,W=a.shape
m=a>128
pl=potrace.Bitmap(~m).trace(turdsize=40, alphamax=1.0, opticurve=True, opttolerance=0.2)
d=[]
for c in pl:
  s=c.start_point; d.append(f"M{s.x/S:.1f} {s.y/S:.1f}")
  for seg in c.segments:
    if seg.is_corner: d.append(f"L{seg.c.x/S:.1f} {seg.c.y/S:.1f}L{seg.end_point.x/S:.1f} {seg.end_point.y/S:.1f}")
    else: d.append(f"C{seg.c1.x/S:.1f} {seg.c1.y/S:.1f} {seg.c2.x/S:.1f} {seg.c2.y/S:.1f} {seg.end_point.x/S:.1f} {seg.end_point.y/S:.1f}")
  d.append('Z')
P=''.join(d)
ys,xs=np.where(m); x0,x1,y0,y1=xs.min()/S-1,xs.max()/S+1,ys.min()/S-1,ys.max()/S+1
vb=f'{x0:.0f} {y0:.0f} {x1-x0:.0f} {y1-y0:.0f}'
for nome,cor in [('logo','#fe122a'),('logo-branco','#ffffff'),('logo-escuro','#3b302d')]:
  open(f'{out}/{nome}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="{cor}" fill-rule="evenodd" d="{P}"/></svg>')
# só o círculo (para favicon): parte esquerda até o fim do círculo
cols=np.where(m.any(axis=0))[0]
gap=[c for c in range(cols.min(),cols.max()) if not m[:,c].any()]
cx=gap[0]/S if gap else (x0+(y1-y0))
open(f'{out}/marca.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.0f} {y0:.0f} {cx-x0+1:.0f} {y1-y0:.0f}"><path fill="#fe122a" fill-rule="evenodd" d="{P}"/></svg>')
print(vb,cx)
