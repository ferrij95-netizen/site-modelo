# Vetoriza o logo Gemata do Brasil (logo-gemata-do-brasil.png do site do grupo, gemataworld.com, 1548x400, vermelho #e30613 em fundo transparente).
# python3 vetorizar-logo.py <logo.png> <pasta-saida>   -> logo.svg, logo-branco.svg, simbolo.svg
from PIL import Image
import numpy as np, potrace, sys
from scipy import ndimage
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
a=np.array(im); m=a[...,3]>120
lb,n=ndimage.label(m); sz=ndimage.sum(m,lb,range(1,n+1)); m=np.isin(lb,[i+1 for i,v in enumerate(sz) if v>=30])
k=0.5
def cam(m):
  pl=potrace.Bitmap(~m).trace(turdsize=10,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x*k:.1f} {s.y*k:.1f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x*k:.1f} {seg.c.y*k:.1f}L{seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
      else: d.append(f"C{seg.c1.x*k:.1f} {seg.c1.y*k:.1f} {seg.c2.x*k:.1f} {seg.c2.y*k:.1f} {seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
    d.append('Z')
  return ''.join(d)
def vb(m):
  ys=np.where(m.sum(axis=1)>0)[0]; xs=np.where(m.sum(axis=0)>0)[0]
  return f'{xs.min()*k-1:.0f} {ys.min()*k-1:.0f} {(xs.max()-xs.min())*k+2:.0f} {(ys.max()-ys.min())*k+2:.0f}'
p=cam(m); v=vb(m)
for nome,cor in [('logo','#e30613'),('logo-branco','#ffffff')]:
  open(f'{out}/{nome}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{v}"><path fill="{cor}" fill-rule="evenodd" d="{p}"/></svg>')
s=m.copy(); s[:,:1080]=False
open(f'{out}/simbolo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb(s)}"><path fill="#e30613" fill-rule="evenodd" d="{cam(s)}"/></svg>')
print(v, vb(s))
