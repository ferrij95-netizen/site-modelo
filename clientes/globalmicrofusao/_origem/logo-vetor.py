import sys, numpy as np, potrace
from PIL import Image
src,out=sys.argv[1:3]
im=Image.open(src).convert('RGBA')
S=8
big=im.resize((im.width*S,im.height*S),Image.LANCZOS)
a=np.asarray(big).astype(int)
r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
red=(al>128)&(r>150)&(g<140)&(r-g>60)
ys,xs=np.where(red)
y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max()
print('square',x0,y0,x1,y1)
grey=(al>90)&(abs(r-g)<25)&(r<200)
grey[:y1+2,:]=False
def path(mask):
    bm=potrace.Bitmap(~mask)
    p=bm.trace(turdsize=8,alphamax=1.0,opticurve=True,opttolerance=0.2)
    d=''
    for c in p:
        s=c.start_point; d+=f'M{s.x/S:.2f},{s.y/S:.2f}'
        for seg in c.segments:
            if seg.is_corner: d+=f'L{seg.c.x/S:.2f},{seg.c.y/S:.2f}L{seg.end_point.x/S:.2f},{seg.end_point.y/S:.2f}'
            else: d+=f'C{seg.c1.x/S:.2f},{seg.c1.y/S:.2f} {seg.c2.x/S:.2f},{seg.c2.y/S:.2f} {seg.end_point.x/S:.2f},{seg.end_point.y/S:.2f}'
        d+='Z'
    return d
# square region: everything in bbox that's red, path with evenodd so white shows through
sq=np.zeros_like(red); sq[y0:y1+1,x0:x1+1]=red[y0:y1+1,x0:x1+1]
W,H=im.width,im.height
dr=path(sq); dg=path(grey)
def svg(redc,greyc,inner=None):
    bg=f'<path d="{dr}" fill="{redc}" fill-rule="evenodd"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{bg}<path d="{dg}" fill="{greyc}"/></svg>'
open(out+'/logo-cor.svg','w').write(svg('#E23236','#737476'))
open(out+'/logo-claro.svg','w').write(svg('#E23236','#C9CACC'))
