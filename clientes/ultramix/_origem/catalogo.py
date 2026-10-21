import json,re,unicodedata,os
from PIL import Image
D=json.load(open('scr/dados.json'))
home={p['url']:p for p in D['home'] if p['url'].rstrip('/')!='https://www.distribuidoraultramix.com.br'}
marca_de={}
for b in D['marcas']:
    for u in b['produtos']: marca_de[u]=b['slug']
def k(s): return unicodedata.normalize('NFKD',s.lower()).encode('ascii','ignore').decode()
CATS=[('chocolates','Chocolates e wafers'),('balas','Balas, pirulitos e gomas'),('biscoitos','Biscoitos e bolos'),('massas','Massas e farinhas'),('salgadinhos','Salgadinhos e batata palha'),('mercearia','Mercearia, molhos e conservas'),('temperos','Temperos, caldos e confeitaria'),('doces','Geleias, mel e coberturas'),('bebidas','Bebidas'),('cereais','Cereais, granolas e aveia'),('jogos','Baralhos e jogos'),('pilhas','Pilhas e baterias')]
def cat(n,m):
    x=k(n)
    if m=='toshiba': return 'pilhas'
    if m=='copag': return 'jogos'
    if m in('baly','tial','jussara') or 'bebida' in x or 'achocolatado 1' in x: return 'bebidas'
    if m=='kobber' or 'aveia' in x or 'mingau' in x or 'farinha lactea' in x or 'oat bran' in x: return 'cereais'
    if m=='chef-chips' or 'batata palha' in x or 'farofa' in x: return 'salgadinhos'
    if m=='homemade':
        if 'antipasti' in x: return 'mercearia'
        if 'bolo' in x: return 'biscoitos'
        return 'doces'
    if m in('pramesa','rigomel','robinson-crusoe'): return 'mercearia'
    if m=='qualimax':
        if 'achocolatado' in x or 'chocolate em po' in x or 'hocolate em po' in x: return 'temperos'
        if 'pure' in x or 'sopao' in x or 'canjao' in x or 'pre de batata' in x: return 'mercearia'
        return 'temperos'
    if m=='selmi':
        if 'bolo' in x or 'biscoito' in x or 'cookie' in x or 'torrada' in x or 'wafer' in x or 'rosquinha' in x: return 'biscoitos'
        if 'macarrao' in x or 'farinha' in x or 'lasanha' in x: return 'massas'
        return 'mercearia'
    if re.search(r'pirulito|bala|chicle|goma|gelatines|canudinho|fitinha|docigoma|pastil|mallow|pacoquinha|minty|pastilha|docioma|elatines',x) and 'trento' not in x: return 'balas'
    if m=='dadinho' and 'creme de amendoim' in x: return 'doces'
    return 'chocolates'
SMALL={'de','da','do','das','dos','com','e','em','ao','para','c/','s/','a','o','na','no','di','tipo'}
def nice(n):
    n=re.sub(r'\s+',' ',n.strip())
    out=[]
    for i,w in enumerate(n.split(' ')):
        lw=w.lower()
        if re.match(r'^[\d.,%+x/]+[a-z]*$',lw) and re.search(r'\d',lw): out.append(lw); continue
        if lw in ('ml','g','kg','l','un'): out.append(lw); continue
        if lw in ('aa','aaa','9v','12v','23a','ev','ev3.5','ee','v','ex','rt','dp','ct','dsp','fp','pr41','des.','pet','bc','gt','t-pro','zda','sm'): out.append(w.upper()); continue
        if i>0 and lw in SMALL: out.append(lw); continue
        out.append(lw[:1].upper()+lw[1:])
    s=' '.join(out)
    return s
prods=[]
order=[b['slug'] for b in D['marcas']]
for u,p in home.items():
    m=marca_de.get(u,'outras')
    slug=u.rsplit('/',1)[1]
    prods.append({'id':p['id'],'slug':slug,'nome':nice(p['nome']),'marca':m,'cat':cat(p['nome'],m),'img':p['img']})
# keep brand order then original order
idx={u:i for i,u in enumerate(home)}
prods.sort(key=lambda p:(order.index(p['marca']) if p['marca'] in order else 99))
# sprites
CELL=240;COLS=5;PER=40
os.makedirs('out/sprites',exist_ok=True)
for si in range(0,len(prods),PER):
    chunk=prods[si:si+PER]; rows=(len(chunk)+COLS-1)//COLS
    sheet=Image.new('RGB',(CELL*COLS,CELL*rows),'white')
    for j,p in enumerate(chunk):
        f='prod/'+p['img'].rsplit('/',1)[1]
        try:
            im=Image.open(f).convert('RGBA'); bg=Image.new('RGBA',im.size,'white'); bg.alpha_composite(im); im=bg.convert('RGB')
            # trim white borders
            from PIL import ImageChops
            diff=ImageChops.difference(im,Image.new('RGB',im.size,'white')); bb=diff.point(lambda v:255 if v>12 else 0).getbbox()
            if bb: im=im.crop(bb)
            im.thumbnail((CELL-20,CELL-20),Image.LANCZOS)
            sheet.paste(im,((j%COLS)*CELL+(CELL-im.width)//2,(j//COLS)*CELL+(CELL-im.height)//2))
        except Exception as e: print('ERR',p['slug'],e)
        p['s']=si//PER; p['i']=j
    sheet.save(f'out/sprites/p{si//PER:02d}.webp','WEBP',quality=78,method=6)
for p in prods: del p['img']
cnt={}
for p in prods: cnt[p['cat']]=cnt.get(p['cat'],0)+1
print(cnt,len(prods))
marcas=[{'slug':b['slug'],'nome':b['nome'],'n':len(b['produtos'])} for b in D['marcas']]
json.dump({'cats':CATS,'marcas':marcas,'produtos':prods},open('out/produtos.json','w'),ensure_ascii=False,separators=(',',':'))
