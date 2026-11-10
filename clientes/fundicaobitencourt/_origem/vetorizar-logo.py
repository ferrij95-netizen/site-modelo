# Vetoriza o logo do site atual (fundicao-bitencourt_03.png, 200x42): F preto, B verde-petróleo #48887b, nome em preto.
# python3 vetorizar-logo.py <logo.png> <pasta-saida>
from PIL import Image, ImageFilter
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
S=16
big=im.resize((im.width*S,im.height*S),Image.BICUBIC).filter(ImageFilter.GaussianBlur(S*0.35))
a=np.array(big).astype(int)
r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
vis=al>128
teal=vis&(g-r>30)
preto=vis&~teal
H,W=al.shape
xx=np.mgrid[0:H,0:W][1]
F=preto&(xx<30*S); nome=preto&(xx>=30*S)
def path(m):
  pl=potrace.Bitmap(~m).trace(turdsize=60, alphamax=0.9, opticurve=True, opttolerance=0.3)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x/S:.2f} {s.y/S:.2f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x/S:.2f} {seg.c.y/S:.2f}L{seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
      else: d.append(f"C{seg.c1.x/S:.2f} {seg.c1.y/S:.2f} {seg.c2.x/S:.2f} {seg.c2.y/S:.2f} {seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
    d.append('Z')
  return ''.join(d)
P=dict(F=path(F),B=path(teal),N=path(nome))
ys,xs=np.where(vis); x0,x1,y0,y1=xs.min()/S-.5,xs.max()/S+.5,ys.min()/S-.5,ys.max()/S+.5
vb=f'{x0:.1f} {y0:.1f} {x1-x0:.1f} {y1-y0:.1f}'
def svg(cF,cB,cN):
  return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="{cF}" d="{P["F"]}"/><path fill="{cB}" d="{P["B"]}"/><path fill="{cN}" d="{P["N"]}"/></svg>'
open(f'{out}/logo.svg','w').write(svg('#141414','#48887b','#141414'))
open(f'{out}/logo-branco.svg','w').write(svg('#ffffff','#5fa596','#ffffff'))
print(vb)
