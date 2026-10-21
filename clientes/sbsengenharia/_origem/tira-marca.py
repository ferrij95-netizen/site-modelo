# Remove a marca d'água "sbs engenharia" (branca translúcida, canto inferior esquerdo) das fotos 765x430 do site atual.
import sys, numpy as np, cv2
from PIL import Image
logo = Image.open(sys.argv[1]).convert('RGBA').split()[3]
X, Y, T = 17, 347, 69
def limpa(caminho):
    x = cv2.imread(caminho).astype(float)
    m = np.zeros(x.shape[:2]); m[Y:Y+T, X:X+T] = np.array(logo.resize((T, T), Image.LANCZOS), float) / 255
    anel = np.zeros_like(m, bool); anel[Y-14:Y+T+8, max(X-14,0):X+T+14] = True; anel[Y-2:Y+T+2, X-2:X+T+2] = False
    alvo = x[anel].mean(0)
    melhor = None
    for a in np.arange(.45, .9, .02):
        am = (a * m)[..., None]
        r = (x - am * 255) / np.maximum(1 - am, .08)
        d = np.abs(r[m > .9].mean(0) - alvo).sum()
        if melhor is None or d < melhor[0]: melhor = (d, a, r)
    r = np.clip(melhor[2], 0, 255).astype('uint8')
    borda = ((m > .03) & (m < .97)).astype('uint8') * 255
    borda[Y-3:Y+T+3, X+T-3:X+T+3] = 255; borda[Y+T-3:Y+T+3, X-3:X+T+3] = 255; borda[Y-3:Y+3, X-3:X+T+3] = 255; borda[Y-3:Y+T+3, X-3:X+3] = 255
    borda = cv2.dilate(borda, np.ones((3, 3), np.uint8), iterations=2)
    # pixels saturados (onde a foto já era clara) também vão para o inpaint
    sat = ((m > .5) & (x.min(2) > 245)).astype('uint8') * 255
    r = cv2.inpaint(r, cv2.bitwise_or(borda, sat), 4, cv2.INPAINT_TELEA)
    liso = cv2.bilateralFilter(r, 7, 40, 7)
    k = cv2.GaussianBlur((m > .03).astype(float), (0, 0), 2)[..., None]
    return (liso * k + r * (1 - k)).astype('uint8')
# Uso: python3 tira-marca.py img/logo.png <pasta com img_obra_<g>_<n>_zoom.jpg do site atual>
# Grava ../public/assets/img/obras/<slug>-<n>.webp (765 px) e <slug>-<n>-g.webp (1224 px, para capas e galeria).
if __name__ == '__main__':
    import glob, os
    from PIL import ImageFilter
    grupos = {10: 'br-116', 11: 'br-392-contorno', 2: 'ecosul', 5: 'br-392-lote-03', 1: 'aeroporto-jericoacoara', 3: 'pch-salto-das-flores',
              4: 'ecovia', 6: 'sede-concepa-terminal-triangulo', 8: 'br-290-freeway', 9: 'vala-do-leao', 7: 'rs-377'}
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'assets', 'img', 'obras')
    for g, slug in grupos.items():
        for f in sorted(glob.glob(os.path.join(sys.argv[2], f'img_obra_{g}_*_zoom.jpg'))):
            n = f.split('_')[-2]
            im = Image.fromarray(cv2.cvtColor(limpa(f), cv2.COLOR_BGR2RGB))
            im.save(os.path.join(out, f'{slug}-{n}.webp'), quality=84)
            im.resize((1224, 688), Image.LANCZOS).filter(ImageFilter.UnsharpMask(1.2, 60, 2)).save(os.path.join(out, f'{slug}-{n}-g.webp'), quality=80)
    print('ok')
