from PIL import Image
import numpy as np, potrace, sys
im=Image.open('/tmp/cf/media/logo.png').convert('RGBA')
S=10
big=np.array(im.resize((im.width*S,im.height*S),Image.LANCZOS))
mask=big[...,3]>120
H,W=mask.shape
yy,xx=np.mgrid[0:H,0:W]
tag = mask & (yy>=52*S)
inC = xx<46*S
red = mask & inC & (((yy>=10*S)&(yy<19*S))|((yy>=30*S)&(yy<39*S)))
ora = mask & inC & ((yy>=20*S)&(yy<29*S))
wine = mask & ~tag & ~red & ~ora
def path(m):
  bm=potrace.Bitmap(~m)
  pl=bm.trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x/S:.2f} {s.y/S:.2f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x/S:.2f} {seg.c.y/S:.2f}L{seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
      else: d.append(f"C{seg.c1.x/S:.2f} {seg.c1.y/S:.2f} {seg.c2.x/S:.2f} {seg.c2.y/S:.2f} {seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
    d.append('Z')
  return ''.join(d)
P={k:path(v) for k,v in dict(wine=wine,red=red,ora=ora,tag=tag).items()}
def svg(cols):
  return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 73">'+''.join(f'<path fill="{c}" fill-rule="evenodd" d="{P[k]}"/>' for k,c in zip(['wine','red','ora','tag'],cols))+'</svg>'
open('logo.svg','w').write(svg(['#5b122d','#7a1925','#d48342','#d9935c']))
open('logo-branco.svg','w').write(svg(['#fff','#fff','#e8a466','#f1c9a4']))
# mark only
open('marca.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 52">'+''.join(f'<path fill="{c}" fill-rule="evenodd" d="{P[k]}"/>' for k,c in zip(['red','ora'],['#7a1925','#d48342']))+'</svg>')
