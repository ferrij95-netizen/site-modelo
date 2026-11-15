# Vetoriza o logo Tecnofibras (logo-tecnofibras-footer-azul.png, 255x101, único disponível no site): azul #0d3e6b e laranja #cf6328, fundo transparente. Ampliado 8x antes do potrace.
# python3 vetorizar-logo.py <logo.png> <pasta-saida> -> logo.svg, logo-branco.svg, simbolo.svg
from PIL import Image, ImageFilter
import numpy as np, potrace, sys
from scipy import ndimage
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
S=8; im=im.resize((im.width*S,im.height*S),Image.BICUBIC).filter(ImageFilter.GaussianBlur(2))
a=np.array(im).astype(int); r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
azul=(al>128)&(b>r+20)
lar=(al>128)&(r>g+50)&(r>120)
def limpa(m):
  lb,n=ndimage.label(m);sz=ndimage.sum(m,lb,range(1,n+1));return np.isin(lb,[i+1 for i,v in enumerate(sz) if v>=300])
azul,lar=limpa(azul),limpa(lar)
k=1/S
def cam(m):
  pl=potrace.Bitmap(~m).trace(turdsize=80,alphamax=1.0,opticurve=True,opttolerance=0.3)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x*k:.2f} {s.y*k:.2f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x*k:.2f} {seg.c.y*k:.2f}L{seg.end_point.x*k:.2f} {seg.end_point.y*k:.2f}")
      else: d.append(f"C{seg.c1.x*k:.2f} {seg.c1.y*k:.2f} {seg.c2.x*k:.2f} {seg.c2.y*k:.2f} {seg.end_point.x*k:.2f} {seg.end_point.y*k:.2f}")
    d.append('Z')
  return ''.join(d)
def vb(m):
  ys=np.where(m.sum(axis=1)>0)[0]; xs=np.where(m.sum(axis=0)>0)[0]
  return f'{xs.min()*k-1:.1f} {ys.min()*k-1:.1f} {(xs.max()-xs.min())*k+2:.1f} {(ys.max()-ys.min())*k+2:.1f}'
pa,pl=cam(azul),cam(lar); v=vb(azul|lar)
open(f'{out}/logo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{v}"><path fill="#0d3e6b" fill-rule="evenodd" d="{pa}"/><path fill="#cf6328" fill-rule="evenodd" d="{pl}"/></svg>')
open(f'{out}/logo-branco.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{v}"><path fill="#fff" fill-rule="evenodd" d="{pa}"/><path fill="#e8834a" fill-rule="evenodd" d="{pl}"/></svg>')
# símbolo: parte de cima (acima do texto)
ys=np.where((azul|lar).sum(axis=1)>0)[0]
sm=(azul|lar).copy(); cut=int(ys.min()+(ys.max()-ys.min())*0.62); 
az2=azul.copy(); az2[cut:]=False; la2=lar.copy(); la2[cut:]=False
open(f'{out}/simbolo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb(az2|la2)}"><path fill="#0d3e6b" fill-rule="evenodd" d="{cam(az2)}"/><path fill="#cf6328" fill-rule="evenodd" d="{cam(la2)}"/></svg>')
print(v)
