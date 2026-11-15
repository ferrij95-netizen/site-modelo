# Vetoriza o logo KREBS a partir da contracapa do catálogo 2022 (render 1200 dpi): quadrado vermelho com K vazado + palavra KREBS.
# python3 vetorizar-logo.py <render.png> <pasta-saida> -> logo.svg (horizontal), logo-branco.svg, simbolo.svg
from PIL import Image
import numpy as np, potrace, sys
from scipy import ndimage
im=Image.open(sys.argv[1]).convert('RGB'); out=sys.argv[2]
a=np.array(im).astype(int); r,g,b=a[...,0],a[...,1],a[...,2]
red=(r>180)&(g<90)&(b<90)
blk=(r<90)&(g<90)&(b<90)
def limpa(m):
  lb,n=ndimage.label(m);sz=ndimage.sum(m,lb,range(1,n+1));return np.isin(lb,[i+1 for i,v in enumerate(sz) if v>=400])
red,blk=limpa(red),limpa(blk)
def box(m):
  ys=np.where(m.sum(axis=1)>0)[0]; xs=np.where(m.sum(axis=0)>0)[0]; return xs.min(),ys.min(),xs.max(),ys.max()
k=0.05
def cam(m,dx,dy):
  pl=potrace.Bitmap(~m).trace(turdsize=60,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  f=lambda p:f"{(p.x-dx)*k:.1f} {(p.y-dy)*k:.1f}"
  for c in pl:
    d.append("M"+f(c.start_point))
    for s in c.segments:
      d.append(f"L{f(s.c)}L{f(s.end_point)}" if s.is_corner else f"C{f(s.c1)} {f(s.c2)} {f(s.end_point)}")
    d.append('Z')
  return ''.join(d)
rx0,ry0,rx1,ry1=box(red); bx0,by0,bx1,by1=box(blk)
sq=(ry1-ry0)*k
# horizontal: quadrado à esquerda, palavra à direita centrada verticalmente, altura da palavra = 52% do quadrado
pr=cam(red,rx0,ry0)
esc=0.52*sq/((by1-by0)*k)
pw=cam(blk,bx0,by0)
ww=(bx1-bx0)*k*esc; wh=(by1-by0)*k*esc
gap=sq*0.22; W=sq+gap+ww
tr=f'translate({sq+gap:.1f} {(sq-wh)/2:.1f}) scale({esc:.4f})'
def svg(cr,cw):
  return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.1f} {sq:.1f}"><rect fill="#fff" x="3" y="3" width="{sq-6:.1f}" height="{sq-6:.1f}"/><path fill="{cr}" fill-rule="evenodd" d="{pr}"/><path fill="{cw}" fill-rule="evenodd" transform="{tr}" d="{pw}"/></svg>'
open(f'{out}/logo.svg','w').write(svg('#ed1c24','#1d1d1b'))
open(f'{out}/logo-branco.svg','w').write(svg('#ed1c24','#fff'))
open(f'{out}/simbolo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {(rx1-rx0)*k:.1f} {sq:.1f}"><rect fill="#fff" x="3" y="3" width="{sq-6:.1f}" height="{sq-6:.1f}"/><path fill="#ed1c24" fill-rule="evenodd" d="{pr}"/></svg>')
print(W,sq, a[(ry0+ry1)//2, rx0+5])
