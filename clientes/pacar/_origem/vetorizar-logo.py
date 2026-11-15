# Vetoriza o logo PACAR (logo-footer.png 646x258 do site atual): "PACAR" vermelho, "FERRAMENTAS PNEUMÁTICAS" e ® pretos. Ampliado 4x antes do potrace.
# python3 vetorizar-logo.py <logo.png> <pasta-saida> -> logo.svg, logo-branco.svg
from PIL import Image
import numpy as np, potrace, sys
from scipy import ndimage
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); im=bg.convert('RGB')
im=im.resize((im.width*4,im.height*4),Image.LANCZOS)
a=np.array(im).astype(int); r,g,b=a[...,0],a[...,1],a[...,2]
red=(r>150)&(g<110)&(b<110)
blk=(r<110)&(g<110)&(b<110)
def limpa(m):
  lb,n=ndimage.label(m);sz=ndimage.sum(m,lb,range(1,n+1));return np.isin(lb,[i+1 for i,v in enumerate(sz) if v>=60])
red,blk=limpa(red),limpa(blk)
k=1/4
def cam(m):
  pl=potrace.Bitmap(~m).trace(turdsize=30,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[];f=lambda p:f"{p.x*k:.1f} {p.y*k:.1f}"
  for c in pl:
    d.append("M"+f(c.start_point))
    for s in c.segments: d.append(f"L{f(s.c)}L{f(s.end_point)}" if s.is_corner else f"C{f(s.c1)} {f(s.c2)} {f(s.end_point)}")
    d.append('Z')
  return ''.join(d)
vis=red|blk; ys=np.where(vis.any(1))[0]; xs=np.where(vis.any(0))[0]
vb=f'{xs.min()*k-1:.0f} {ys.min()*k-1:.0f} {(xs.max()-xs.min())*k+2:.0f} {(ys.max()-ys.min())*k+2:.0f}'
pr,pb=cam(red),cam(blk)
open(f'{out}/logo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="#fe0606" fill-rule="evenodd" d="{pr}"/><path fill="#1a1a1a" fill-rule="evenodd" d="{pb}"/></svg>')
open(f'{out}/logo-branco.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="#fff" fill-rule="evenodd" d="{pr}"/><path fill="#fff" fill-rule="evenodd" d="{pb}"/></svg>')
print(vb, a[red].mean(axis=0) if red.any() else '')
