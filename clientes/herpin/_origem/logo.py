import potrace, numpy as np
from PIL import Image
im=Image.open('img/logo.png').convert('RGBA')
S=10
big=im.resize((im.width*S,im.height*S),Image.LANCZOS)
a=np.asarray(big).astype(float)
r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
red=(al>128)&(r>110)&(g<90)&(b<90)
navy=(al>128)&(b>r+20)&(r<110)
dark=(al>128)&~navy&~red&(r<120)&(g<120)&(b<140)
yy,xx=np.mgrid[0:dark.shape[0],0:dark.shape[1]]
dark&=(yy>78*S)&(xx>136*S)
def trace(mask):
    bm=potrace.Bitmap(~mask)
    p=bm.trace(turdsize=40,alphamax=1.0,opttolerance=0.4)
    d=[]
    for c in p:
        s=c.start_point; d.append(f'M{s.x/S:.2f},{s.y/S:.2f}')
        for seg in c.segments:
            if seg.is_corner: d.append(f'L{seg.c.x/S:.2f},{seg.c.y/S:.2f}L{seg.end_point.x/S:.2f},{seg.end_point.y/S:.2f}')
            else: d.append(f'C{seg.c1.x/S:.2f},{seg.c1.y/S:.2f} {seg.c2.x/S:.2f},{seg.c2.y/S:.2f} {seg.end_point.x/S:.2f},{seg.end_point.y/S:.2f}')
        d.append('Z')
    return ''.join(d)
dr,dn,dk=trace(red),trace(navy),trace(dark)
# bounding box
ys,xs=np.where(red|navy|dark); x0,y0,x1,y1=xs.min()/S,ys.min()/S,xs.max()/S,ys.max()/S
vb=f'{x0-1:.1f} {y0-1:.1f} {x1-x0+2:.1f} {y1-y0+2:.1f}'
grad='<defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E81C1C"/><stop offset=".55" stop-color="#C40000"/><stop offset="1" stop-color="#8E0000"/></linearGradient></defs>'
open('logo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">{grad}<path fill="url(#hg)" fill-rule="evenodd" d="{dr}"/><path fill="#05056A" fill-rule="evenodd" d="{dn}"/><path fill="#14142B" d="{dk}"/></svg>')
open('logo-branco.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">{grad}<path fill="url(#hg)" fill-rule="evenodd" d="{dr}"/><path fill="#fff" fill-rule="evenodd" d="{dn}"/><path fill="#fff" d="{dk}"/></svg>')
open('logo-mono.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="#fff" fill-rule="evenodd" d="{dr}"/><path fill="#fff" fill-rule="evenodd" d="{dn}"/><path fill="#fff" d="{dk}"/></svg>')
print(vb, len(dr), len(dn))
