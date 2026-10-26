# Recorta (rembg) as fotos de produto e converte tudo para webp em public/assets/img.
import sys, io, json
from PIL import Image
from rembg import remove, new_session
O='orig/'; D='/home/user/site-modelo/clientes/khromatintas/public/assets/img/'
sess=new_session('birefnet-general-lite')
recorte={ # slug: (arquivo, largura)
 'tachao-amarelo':('IMG_9131.jpg',800),'tachao-lado':('IMG_9127.jpg',800),'tachao-frente':('IMG_9128.jpg',700),'tachao-pino':('IMG_9129.jpg',700),
 'tacha-cristal':('IMG_9136.jpg',800),'tacha-cristal-2':('IMG_9134.jpg',700),'tacha-lado':('IMG_9139.jpg',700),'tacha-pino':('IMG_9147.jpg',700),
 'demarcacao-agua':('demarcacaoviariaabasedeagua01.jpg',800),'demarcacao-solvente':('demarcacaoviariaabasedesolvente.jpg',800),'diluente':('demarcacaoabasedesolvente.jpg',800),
 'termoplastico':('termoplastico1000x1000.png',800),'microesfera':('microesfera1000x1000.png',800),
 'textura':('texturaacrilica.jpg',800),'grafiato':('grafiato.jpg',800),'seladora':('seladoracrilico.jpg',800),'massa':('massaniveladora.jpg',800),'latex':('latexeconomico-1.jpg',800),
 'trio-latex':('tinta-top.png',800),'trio-textura':('textura.png',800),'trio-grafiato':('Grafiato.png',800),'trio-massa':('Massa-niveladora.png',800),'trio-seladora':('selador.png',800),
 'trio-economico':('econo.png',700),'trio-standard':('stan.png',700),'trio-premium':('premi.png',700),
 'barrica-grafiato':('barricagrafiato.jpg',700),'barrica-latex':('barricalatexeconomico.jpg',700),
}
fotos={
 'obra-ciclofaixa':('WhatsApp-Image-2021-10-13-at-12.27.50.jpeg',1200),'obra-faixa':('WhatsApp-Image-2021-10-13-at-12.27.50-1.jpeg',1200),'obra-lombada':('WhatsApp-Image-2021-10-13-at-12.27.50-2.jpeg',1400),
 'fabrica-fachada':('WhatsApp-Image-2021-10-13-at-12.30.59.jpeg',1400),'fabrica-galpao':('WhatsApp-Image-2021-10-18-at-06.31.18.jpeg',1200),'fabrica-latas':('WhatsApp-Image-2021-10-18-at-06.28.37.jpeg',1200),
 'fabrica-laboratorio':('WhatsApp-Image-2021-10-18-at-06.28.37-1.jpeg',1200),'fabrica-porta':('WhatsApp-Image-2021-10-18-at-06.28.37-2.jpeg',1400),'fabrica-aerea':('WhatsApp-Image-2021-10-15-at-16.51.56.jpeg',609),
 'parede-rolo':('Rectangle-10.png',650),
 'inmetro':('logo-inmetro.png',181),'abnt':('logo-abnt.png',181),
}
dim={}
sel=sys.argv[1:]
for k,(f,w) in recorte.items():
    if sel and k not in sel: continue
    im=Image.open(O+f).convert('RGB')
    out=remove(im,session=sess,post_process_mask=True)
    out=out.crop(out.getbbox())
    if out.width>w: out=out.resize((w,round(out.height*w/out.width)),Image.LANCZOS)
    out.save(D+k+'.webp',quality=82,method=6); dim[k]=out.size; print(k,out.size)
for k,(f,w) in fotos.items():
    if sel and k not in sel: continue
    im=Image.open(O+f); im=im.convert('RGBA' if im.mode in('RGBA','LA','P') else 'RGB')
    if im.width>w: im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
    im.save(D+k+'.webp',quality=78,method=6); dim[k]=im.size; print(k,im.size)
old={}
try: old=json.load(open(D+'../../../_origem/dim.json'))
except: pass
old.update(dim); json.dump(old,open('/home/user/site-modelo/clientes/khromatintas/_origem/dim.json','w'),indent=0)
