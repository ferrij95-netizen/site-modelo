import sys, os, json
from PIL import Image
M, OUT = sys.argv[1], sys.argv[2]
def sv(src, name, w=None, crop=None, q=80):
    im = Image.open(os.path.join(M, src))
    im = im.convert('RGBA' if im.mode in ('P','RGBA','LA') and 'transparency' in im.info or im.mode=='RGBA' else 'RGB')
    if crop: im = im.crop(crop)
    if w and im.width > w: im = im.resize((w, round(im.height*w/im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, name+'.webp'), quality=q, method=6)
    return im.size
P = {
 'queijo-do-reino': ('2019_11_queijo-do-reino-1.jpg', ['2019_11_47.jpg','2019_11_61.jpg','2019_11_67.jpg','2020_02_queijo-do-reino.jpg','2020_02_queijo-do-reino2.jpg','2020_02_queijo-do-reino3.jpg','2020_02_queijo-do-reino4.jpg','2020_02_queijo-do-reino5.jpg','2020_02_queijo-do-reino6.jpg'], '2019_11_reino-1.jpg'),
 'queijo-parmesao': ('2019_11_25.jpg', ['2019_11_16.jpg','2019_11_25-1.jpg','2019_11_73.jpg','2020_02_queijo-parmesao.jpg'], '2019_11_parmesão-1.jpg'),
 'queijo-minas-padrao': ('2019_11_queijo-minas-padrao.jpg', ['2019_11_31.jpg','2019_11_37.jpg','2019_11_5.jpg','2020_02_queijo-minas-padrao.jpg','2020_02_quiejo-minas-padrao.jpg'], '2019_11_queijo-minas-padrão-2.jpg'),
 'queijo-tipo-caccio-cavalo': ('2019_11_7.jpg', ['2019_11_12.jpg','2019_11_48.jpg','2019_11_72.jpg','2020_02_queijo-caccio-cavalo.jpg','2020_02_queijo-caccio-cavalo2.jpg'], '2019_11_cavalo-1.jpg'),
 'queijo-prato': ('2019_11_14.jpg', ['2019_11_26.jpg','2019_11_30.jpg','2019_11_54.jpg','2019_11_76.jpg','2020_02_queijo-prato.jpg'], '2019_11_prato-1.jpg'),
 'doce-de-leite': ('2019_11_33.jpg', ['2019_11_22.jpg','2019_11_55.jpg','2019_11_9.jpg','2020_01_Doce-de-leite-1.png','2020_01_Doce-de-leite-2.png','2020_01_Doce-de-leite-3.png','2020_01_Doce-de-leite-4.png'], '2020_01_Banner-doce-de-leite.png'),
}
info = {}
for slug,(cap,gal,ban) in P.items():
    sv(cap, f'p-{slug}')
    info[slug] = {'galeria': len(gal)}
    for i,g in enumerate(gal,1): sv(g, f'p-{slug}-{i}')
    sv(ban, f'p-{slug}-faixa', w=1800)
R = {'sanduiche-incrementado':'2020_02_72997f3f-4e92-47b8-8b01-47168e8839b7.jpg','risoto-especial':'2020_02_459a4581-cbfa-4e44-a1b7-2b7c72104810.jpg','empanado-de-queijo-com-ervas':'2020_02_98fc1427-9021-4d6e-9289-9a06a15d651c.jpg','bruschetta-millano':'2020_02_11027073-118f-4175-981e-86c6c315b59e.jpg','batata-rustica':'2020_02_efff6f4e-4cad-4960-b513-e7473db7bd85.jpg','arroz-tropical':'2020_02_0888d7db-4699-4c3e-a5e4-0a7c9aa03188.jpg','pizza-alla-millano':'2020_02_44d5a15f-3285-4ac4-b1a9-eefb03e79bdd.jpg','torta-de-queijo-do-reino':'2019_11_torta-queijo-principa.jpg','tomate-recheado-com-queijo-minas-padrao':'2019_11_tomate-recheado-pincipal.jpg','risoto-de-brocolis-com-queijo-parmesao':'2019_11_img-risoto-principal.jpg'}
for s,f in R.items(): sv(f, f'r-{s}')
G = ['2020_02_manteiga.jpg','2020_02_manteiga2.jpg','2020_02_manteiga3.jpg','2020_02_7c6c552f-30c9-47f8-955f-ff6801902346.jpg','2020_02_8c297830-13c3-4860-9478-a1e4e0462dfa.jpg','2020_02_71e9aa88-70d6-46d9-82d4-605d664f0e6b.jpg','2020_02_dedfab02-ddb6-4c47-a23d-5fe5307f345d.jpg','2020_02_f1f05acc-3fd0-411e-a461-f7b8a3a95ec6.jpg'] + [f'2020_01_Produto-{i}.png' for i in range(1,21)]
for i,g in enumerate(G,1): sv(g, f'g-{i}')
info['galeria'] = len(G)
sv('2019_11_millano-quem-somos.jpg','mesa',w=1800)
sv('2019_11_millano-produtos-1.jpg','linha',w=1800)
sv('2019_11_torta-queijo-post.jpg','torta-faixa',w=1600)
sv('2020_01_Banner-sem-parte-azul.png','madeira',crop=(0,0,2104,150),q=70)
sv('2020_01_Banner-sem-parte-azul.png','mesa-madeira',crop=(0,1300,2104,1680),q=70)
sv('2020_01_logo-para-site.png','logo')
Image.open(os.path.join(M,'2020_01_logo-para-site.png')).convert('RGBA').resize((96,96),Image.LANCZOS).save(os.path.join(OUT,'..','favicon.png'))
print(json.dumps(info))
