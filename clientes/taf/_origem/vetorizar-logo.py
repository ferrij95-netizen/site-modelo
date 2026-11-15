# Vetoriza o logo da TAF (logo-TAF-v02-1-scaled.png do site atual): selo branco, topo vermelho com o símbolo, "TAF" e "Siga esta energia" em azul.
# python3 vetorizar-logo.py <logo.png> <pasta-saida>
from PIL import Image
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
im=im.crop(im.getbbox()); S=0.5
im=im.resize((int(im.width*S),int(im.height*S)),Image.LANCZOS)
a=np.array(im).astype(int); r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
forma=al>128
verm=forma&(r>150)&(g<90)&(b<90)
azul=forma&(b>100)&(r<90)
branco=forma&~verm&~azul
def caminho(m,turd=8):
  pl=potrace.Bitmap(~m).trace(turdsize=turd,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x:.1f} {s.y:.1f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x:.1f} {seg.c.y:.1f}L{seg.end_point.x:.1f} {seg.end_point.y:.1f}")
      else: d.append(f"C{seg.c1.x:.1f} {seg.c1.y:.1f} {seg.c2.x:.1f} {seg.c2.y:.1f} {seg.end_point.x:.1f} {seg.end_point.y:.1f}")
    d.append('Z')
  return ''.join(d)
H,W=forma.shape
# o selo (sem o slogan) termina onde a forma branca contínua acaba
linhas=np.where(forma.any(axis=1))[0]
vazias=[y for y in range(linhas.min(),linhas.max()) if not forma[y].any()]
ysel=vazias[0] if vazias else H
pf,pv,pa=caminho(forma),caminho(verm),caminho(azul)
def svg(nome,vb,partes):
  open(f'{out}/{nome}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'+''.join(f'<path fill="{c}" fill-rule="evenodd" d="{p}"/>' for c,p in partes)+'</svg>')
selo=forma.copy(); selo[ysel:]=False
ps=caminho(selo); pa_selo=caminho(azul&(np.arange(H)[:,None]<ysel)); pv_selo=caminho(verm&(np.arange(H)[:,None]<ysel))
svg('logo-completo',f'0 0 {W} {H}',[('#fff',pf),('#e30613',pv),('#094496',pa)])
svg('selo',f'0 0 {W} {ysel}',[('#fff',ps),('#e30613',pv_selo),('#094496',pa_selo)])
# slogan sozinho em branco e azul
ys=np.where(forma[ysel:].any(axis=1))[0]
sl=forma.copy(); sl[:ysel]=False; psl=caminho(sl)
y0=ysel+ys.min()-2; y1=ysel+ys.max()+2
svg('slogan-azul',f'0 {y0} {W} {y1-y0}',[('#094496',psl)]); svg('slogan-branco',f'0 {y0} {W} {y1-y0}',[('#fff',psl)])
print(W,H,ysel)
