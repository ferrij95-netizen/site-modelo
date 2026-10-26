from PIL import Image, ImageFilter
import numpy as np, potrace
im=Image.open('orig/image-1.png').convert('RGBA')
a=np.array(im).astype(float)
rgb=a[...,:3]*(a[...,3:]/255)+255*(1-a[...,3:]/255)
g=Image.fromarray(rgb.astype('uint8'))
S=8
big=g.resize((im.width*S,im.height*S),Image.LANCZOS).filter(ImageFilter.GaussianBlur(4))
b=np.array(big).astype(int)
r,gg,bb=b[...,0],b[...,1],b[...,2]
lum=0.3*r+0.59*gg+0.11*bb
black=lum<95
yellow=(r>140)&(gg>110)&(bb<120)
H,W=lum.shape
yy,xx=np.mgrid[0:H,0:W]
band=(yy<53.5*S)&(xx>87*S)
grey=(lum<200)&~yellow&band
black=black&~band; yellow=yellow&~band
def trace(mask,turd=30):
    bm=potrace.Bitmap(~mask)
    path=bm.trace(turdsize=turd,alphamax=1.2,opticurve=True,opttolerance=0.2)
    d=[]
    for c in path:
        s=c.start_point; d.append(f"M{s.x/S:.2f} {s.y/S:.2f}")
        for seg in c:
            if seg.is_corner: d.append(f"L{seg.c.x/S:.2f} {seg.c.y/S:.2f}L{seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
            else: d.append(f"C{seg.c1.x/S:.2f} {seg.c1.y/S:.2f} {seg.c2.x/S:.2f} {seg.c2.y/S:.2f} {seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
        d.append('Z')
    return ''.join(d)
pb=trace(black); py=trace(yellow|black); pg=trace(grey,8)
ys,xs=np.where(yellow|black|grey); print(xs.min()/S,xs.max()/S,ys.min()/S,ys.max()/S)
x0,x1,y0,y1=xs.min()/S-1,xs.max()/S+1,ys.min()/S-1,ys.max()/S+1
vb=f"{x0:.1f} {y0:.1f} {x1-x0:.1f} {y1-y0:.1f}"
for name,cols in [('logo',('#FFE600','#000','#4a4a4a')),('logo-branco',('#FFE600','#fff','#e6e6e6'))]:
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill-rule="evenodd" fill="{cols[0]}" d="{py}"/><path fill-rule="evenodd" fill="{cols[1]}" d="{pb}"/><path fill-rule="evenodd" fill="{cols[2]}" d="{pg}"/></svg>'
    open(name+'.svg','w').write(svg)
print(vb)
