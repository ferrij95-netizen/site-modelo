import json,re,unicodedata,os
from PIL import Image
OUT='/home/user/site-modelo/clientes/herpin/public/assets/img/p/'
it=json.load(open('prod/itens.json'))
nomes={'ALCOOL':'Álcool','BOBINA PAPELAO':'Bobina papelão','JARRA DE SUCO/AGUA':'Jarra de suco/água','SUPORTE FITA CREPE/DUREX/EMPACOT.':'Suporte para fita crepe, durex e empacotamento','COLHER, GARFO, FACA, PAZINHA':'Colher, garfo, faca e pazinha','DISPENSER INOX':'Dispenser inox','DISPENSER PINTADO':'Dispenser pintado','BOBINA PVC ESTICÁVEL':'Bobina PVC esticável','FILME PVC':'Filme PVC','PAPEL HD ROSA':'Papel HD rosa','PLÁSTICO VIRGEM':'Plástico virgem','BOBINA PAPEL STRONG':'Bobina papel strong','SACO PAPEL HAMBURGUER':'Saco de papel para hambúrguer','SACO PAPEL PIPOCA':'Saco de papel para pipoca','SACO PAPEL KRAFT':'Saco de papel kraft','BOBINA PLÁSTICA HOT DOG':'Bobina plástica hot dog'}
deps=[('aluminio','Embalagens de alumínio',0,5),('isopor','Embalagens de isopor',6,12),('papel','Embalagens de papel',13,33),('plasticas','Embalagens plásticas',34,57),('utensilios','Equipamentos, acessórios e utensílios',58,86),('limpeza','Produtos de limpeza e higiene',87,109)]
def slug(s): return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower()).strip('-')
res=[]
for o in it:
  d=[x for x in deps if x[2]<=o['i']<=x[3]][0]
  n=nomes.get(o['name']) or o['name'].capitalize()
  s=slug(n)
  fotos=[]
  for k,u in enumerate([] if o['i']==13 else o['imgs']):
    im=Image.open('img/'+u.split('/')[-1])
    im=im.convert('RGBA') if im.mode in ('P','RGBA','LA') else im.convert('RGB')
    if im.mode=='RGBA':
      bg=Image.new('RGB',im.size,'white'); bg.paste(im,mask=im.split()[3]); im=bg
    im.thumbnail((800,800))
    f=f'{d[0]}-{s}-{k+1}'
    im.save(OUT+f+'.webp',quality=82)
    fotos.append([f,im.width,im.height])
  res.append(dict(dep=d[0],nome=n,slug=s,fotos=fotos))
open('produtos.json','w').write(json.dumps(res,ensure_ascii=False))
print(len(res), sum(len(r['fotos']) for r in res))
for r in res: print(r['dep'],r['nome'],len(r['fotos']))
