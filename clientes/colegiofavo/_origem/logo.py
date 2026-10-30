# Vetoriza o logo "Colégio Favo" a partir do banner 1 do site atual (img/banner/banner1.jpg, o maior logo publicado):
# hexágonos regulares medidos no original, disco e brilho de cada favo e o nome traçados com potrace.
# Uso: python3 clientes/colegiofavo/_origem/logo.py <banner1.jpg>  ->  _origem/logo-original.svg
import numpy as np, cv2, potrace, sys
from PIL import Image
S=6
import os
im=Image.open(sys.argv[1]).convert('RGB').crop((940,50,1160,262))
W,H=im.size
big=np.array(im.resize((W*S,H*S),Image.BICUBIC)).astype(np.float32)
big=cv2.GaussianBlur(big,(0,0),S*0.25)
pal={'teal':(6,102,130),'mid':(87,144,162),'navy':(7,54,79),'bg1':(185,211,223),'bg2':(217,231,238),'bg3':(166,197,213)}
names=list(pal); P=np.array([pal[n] for n in names],np.float32)
d=((big[:,:,None,:]-P[None,None])**2).sum(-1); lab=d.argmin(-1)
m=lambda *ns: np.isin(lab,[names.index(n) for n in ns]).astype(np.uint8)
textY=int(172*S)  # wordmark starts below this line in the crop
dark=m('teal','mid','navy'); dark[textY:]=0
# hexagon silhouettes: fill holes
cnts,_=cv2.findContours(dark,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
hexm=np.zeros_like(dark); cnts=[c for c in cnts if cv2.contourArea(c)>2000*S*S/36]
polys=[cv2.approxPolyDP(cv2.convexHull(c),0.012*cv2.arcLength(cv2.convexHull(c),True),True) for c in cnts]
import math
reg=[]
for P in polys:
    P=P.reshape(-1,2).astype(float); c=P.mean(0); r=np.sqrt(((P-c)**2).sum(1)).mean()
    reg.append((c,r))
R=np.mean([r for c,r in reg])
polys=[np.array([[[c[0]+R*math.sin(math.radians(60*k)), c[1]-R*math.cos(math.radians(60*k))]] for k in range(6)]).astype(np.int32) for c,r in reg]
print(R/S,[ (c/S).round(1) for c,r in reg])
cv2.drawContours(hexm,polys,-1,1,-1)
mid=m('mid')*hexm; light=m('bg1','bg2','bg3')*hexm
lum=big.mean(-1); navy=(lum<128).astype(np.uint8); navy[:textY]=0
def op(x,k=3):
    k=np.ones((k,k),np.uint8); return cv2.morphologyEx(cv2.morphologyEx(x,cv2.MORPH_OPEN,k),cv2.MORPH_CLOSE,k)
def path(mask,turd=40,am=1.0):
    bm=potrace.Bitmap(~mask.astype(bool)); pl=bm.trace(turdsize=turd,alphamax=am,opticurve=True,opttolerance=0.3)
    out=[]
    for c in pl:
        s=c.start_point; seg=[f'M{s.x/S:.2f},{s.y/S:.2f}']
        for g in c.segments:
            if g.is_corner: seg.append(f'L{g.c.x/S:.2f},{g.c.y/S:.2f}L{g.end_point.x/S:.2f},{g.end_point.y/S:.2f}')
            else: seg.append(f'C{g.c1.x/S:.2f},{g.c1.y/S:.2f} {g.c2.x/S:.2f},{g.c2.y/S:.2f} {g.end_point.x/S:.2f},{g.end_point.y/S:.2f}')
        out.append(''.join(seg)+'Z')
    return ''.join(out)
layers=[('teal',hexm,'#066682','poly'),('mid',op(mid,9),'#5790a2',''),('light',op(light,9),'#c3dbe6',''),('navy',op(navy,3),'#07364f','')]
# bounding box
ys,xs=np.where((hexm|navy)>0); x0,y0,x1,y1=xs.min()/S-2,ys.min()/S-2,xs.max()/S+2,ys.max()/S+2
polyd=''.join('M'+'L'.join(f'{p[0][0]/S:.2f},{p[0][1]/S:.2f}' for p in P)+'Z' for P in polys)
body=''.join(f'<path fill="{c}" fill-rule="evenodd" d="{polyd if k else path(mk, am=(0.75 if n=='navy' else 1.0))}"/>' for n,mk,c,k in layers)
svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.1f} {y0:.1f} {x1-x0:.1f} {y1-y0:.1f}">{body}</svg>'
open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'logo-original.svg'),'w').write(svg); print(len(svg), x0,y0,x1,y1)
