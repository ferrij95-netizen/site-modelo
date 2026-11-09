# Vetoriza o logo.png (181x81) do site atual da Trefix: T cinza, órbita laranja e "TREFIX" laranja.
# python3 vetorizar-logo.py <logo.png> <pasta-saida>
from PIL import Image
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
S=12
big=np.array(im.resize((im.width*S,im.height*S),Image.LANCZOS)).astype(int)
r,g,b,a=big[...,0],big[...,1],big[...,2],big[...,3]
H,W=a.shape
yy,xx=np.mgrid[0:H,0:W]
vis=a>110
laranja=vis&(r-b>70)
cinza=vis&~laranja
orbita=laranja&(yy<44*S)
nome=laranja&(yy>=44*S)
def path(m):
  pl=potrace.Bitmap(~m).trace(turdsize=30, alphamax=1.0, opticurve=True, opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x/S:.2f} {s.y/S:.2f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x/S:.2f} {seg.c.y/S:.2f}L{seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
      else: d.append(f"C{seg.c1.x/S:.2f} {seg.c1.y/S:.2f} {seg.c2.x/S:.2f} {seg.c2.y/S:.2f} {seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
    d.append('Z')
  return ''.join(d)
P=dict(cinza=path(cinza),orbita=path(orbita),nome=path(nome))
ys,xs=np.where(vis); x0,x1,y0,y1=xs.min()/S-1,xs.max()/S+1,ys.min()/S-1,ys.max()/S+1
vb=f'{x0:.1f} {y0:.1f} {x1-x0:.1f} {y1-y0:.1f}'
grad='<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a00"/><stop offset="1" stop-color="#e05400"/></linearGradient></defs>'
def svg(cT,cO,cN,extra=''):
  return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">{extra}<path fill="{cT}" fill-rule="evenodd" d="{P["cinza"]}"/><path fill="{cO}" fill-rule="evenodd" d="{P["orbita"]}"/><path fill="{cN}" fill-rule="evenodd" d="{P["nome"]}"/></svg>'
open(f'{out}/logo.svg','w').write(svg('#4d4d4d','#f86300','url(#g)',grad))
open(f'{out}/logo-branco.svg','w').write(svg('#ffffff','#ff7a1a','#ff7a1a'))
open(f'{out}/marca.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.1f} {y0:.1f} {x1-x0:.1f} 44"><path fill="#4d4d4d" fill-rule="evenodd" d="{P["cinza"]}"/><path fill="#f86300" fill-rule="evenodd" d="{P["orbita"]}"/></svg>')
print(vb)
