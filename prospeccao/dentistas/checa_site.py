"""Checagem de site em 10 pontos (copiada da prospecção agro) + ponto próprio de dentista (agendamento)."""
import json, glob, re, time, sys
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse, urljoin
import requests

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'}
NAO_SITE = ('google.', 'instagram.com', 'facebook.com', 'wa.me', 'whatsapp.com', 'linktr.ee', 'youtube.com',
            'mercadolivre', 'bit.ly', 'linkme', 'beacons.ai', 'tiktok.com', 'goo.gl', 'business.site', 'ifood',
            'linkedin.com', 'negocio.site', 'wixsite.com/', 'sites.google')

def parse_card(c):
    t = c['texto']
    m = re.search(r'(\d[,.]\d)\s*\(([\d.]+)\)', t)
    for a in c.get('arias', []):
        mm = re.search(r'(\d[,.]\d)\s*estrelas?\s*([\d.]+)\s*(?:comentários|avaliações|avaliação|comentário)', a or '', re.I)
        if mm: m = mm; break
    tel = re.search(r'\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}', t)
    site = ''
    for l in c['links']:
        h = l['href'] or ''
        if h.startswith('http') and not any(s in h for s in ('google.', 'gstatic')):
            site = h; break
    linhas = [x.strip() for x in t.split('\n') if x.strip()]
    cat = ''
    for x in linhas[1:5]:
        if '·' in x and not re.match(r'^\d', x):
            cat = x.split('·')[0].strip(); break
    return dict(nome=c['nome'], cidade=c['cidade'], busca=c['busca'], maps=c['maps'],
                nota=float(m.group(1).replace(',', '.')) if m else None,
                avaliacoes=int(m.group(2).replace('.', '')) if m else 0,
                telefone=tel.group(0) if tel else '', categoria=cat, site=site, texto=t)

def anos(s):
    return [int(y) for y in re.findall(r'(?<!\d)(20[0-2]\d)(?!\d)', s) if 2000 <= int(y) <= 2026]

def checa(url):
    r = dict(site_ok=False, pontos=0, problemas=[])
    try:
        t0 = time.time()
        resp = requests.get(url, headers=UA, timeout=25, allow_redirects=True)
        dt = time.time() - t0
    except Exception as e:
        r['erro'] = type(e).__name__
        # tenta sem https
        try:
            resp = requests.get(url.replace('https://', 'http://'), headers=UA, timeout=20); dt = 99
            r['problemas'].append('certificado/HTTPS com erro')
        except Exception:
            return r
    h = resp.text or ''
    low = h.lower()
    r.update(site_ok=resp.status_code < 400, status=resp.status_code, final=resp.url, tempo=round(dt, 1), kb=len(resp.content) // 1024)
    if not r['site_ok'] or len(h) < 300:
        return r
    texto = re.sub(r'<script.*?</script>|<style.*?</style>|<[^>]+>', ' ', h, flags=re.S | re.I)
    g = re.search(r'<meta[^>]+name=["\']generator["\'][^>]+content=["\']([^"\']+)', h, re.I)
    r['gerador'] = g.group(1) if g else ''
    P = r['problemas']
    # 1 ano antigo no rodapé
    cp = []
    for a, b in re.findall(r'(?:©|&copy;|copyright)[^\d]{0,40}(20[0-2]\d)(?:\s*[-–/]\s*(20[0-2]\d))?', texto, re.I):
        cp.append(int(b or a))
    r['ano_rodape'] = max(cp) if cp else None
    if cp and max(cp) <= 2022: P.append(f'rodapé © {max(cp)}')
    # 2 celular
    if 'name="viewport"' not in low and "name='viewport'" not in low and 'name=viewport' not in low: P.append('não adaptado para celular')
    # 3 lento/pesado
    if dt > 3 or r['kb'] > 2500: P.append(f'lento ({r["tempo"]}s, {r["kb"]} KB de HTML)')
    # 5 texto de modelo
    for k in ('lorem ipsum', 'sample page', 'hello world', 'seu texto aqui', 'insira seu texto', 'your company', 'título da notícia', 'just another wordpress', 'texto de exemplo', 'coming soon'):
        if k in low: P.append(f'texto de modelo ("{k}")'); break
    # 6 tecnologia antiga
    old = []
    gm = re.search(r'wordpress\s*([\d.]+)', r['gerador'], re.I)
    if gm and tuple(int(x) for x in gm.group(1).split('.')[:2] if x.isdigit()) < (5, 5): old.append(f'WordPress {gm.group(1)}')
    jq = re.search(r'jquery[-.]?(1\.\d+(?:\.\d+)?)(?:\.min)?\.js', low)
    if jq: old.append(f'jQuery {jq.group(1)}')
    if '.swf' in low or 'shockwave' in low: old.append('Flash')
    if '<frameset' in low or '<marquee' in low: old.append('frames/marquee')
    if re.search(r'mobirise\s*v?[1-4]\b', low): old.append('Mobirise antigo')
    if re.search(r'joomla!?\s*(1\.|2\.)', low): old.append('Joomla antigo')
    if low.count('<table') >= 6 and 'viewport' not in low: old.append('layout em tabelas')
    if re.search(r'bootstrap(?:\.min)?\.(?:css|js)\?ver=[23]\.|bootstrap/[23]\.\d', low): old.append('Bootstrap 2/3')
    if old: P.append('tecnologia antiga: ' + ', '.join(old))
    # 7 HTTPS
    if not resp.url.startswith('https'): P.append('sem HTTPS')
    # 8 compartilhamento
    if 'og:image' not in low and 'og:title' not in low: P.append('sem prévia ao compartilhar (Open Graph)')
    # 9 WhatsApp/formulário
    wa = re.search(r'(?:wa\.me/|api\.whatsapp\.com/send\?phone=|whatsapp\.com/send/?\?phone=)(\d{10,13})', low)
    r['whatsapp'] = wa.group(1) if wa else ''
    if not wa and 'whatsapp' not in low and '<form' not in low: P.append('sem WhatsApp nem formulário')
    # 10 conteúdo parado
    ay = anos(texto)
    r['ano_mais_novo'] = max(ay) if ay else None
    if ay and max(ay) <= 2022 and not (cp and max(cp) <= 2022): P.append(f'conteúdo mais recente de {max(ay)}')
    # 4 links/imagens quebrados (amostra)
    alvos = []
    for src in re.findall(r'<img[^>]+src=["\']([^"\']+)', h, re.I)[:10] + re.findall(r'<a[^>]+href=["\']([^"\'#]+)', h, re.I)[:20]:
        u = urljoin(resp.url, src)
        if u.startswith('http') and urlparse(u).netloc == urlparse(resp.url).netloc and u not in alvos: alvos.append(u)
    ruins = 0
    for u in alvos[:15]:
        try:
            x = requests.get(u, headers=UA, timeout=10, stream=True); x.close()
            if x.status_code >= 400: ruins += 1
        except Exception: ruins += 1
    if ruins: P.append(f'{ruins} link(s) ou imagem(ns) quebrado(s)')
    tel = re.findall(r'\(?\b\d{2}\)?\s?9?\d{4}[-.\s]\d{4}\b', texto)
    r['tel_site'] = tel[0] if tel else ''
    em = re.findall(r'[\w.+-]+@[\w-]+\.[\w.]+', texto)
    r['email'] = next((e for e in em if not e.endswith(('.png', '.jpg', 'sentry.io', 'wixpress.com'))), '')
    r['cnpj'] = ''
    cn = re.search(r'\b(\d{2})\.?(\d{3})\.?(\d{3})/?(\d{4})-?(\d{2})\b', texto)
    if cn: r['cnpj'] = ''.join(cn.groups())
    S = []
    tl = texto.lower()
    if re.search(r'export(a|amos|ação|ações|adora|ando)|mercado externo|países', tl): S.append('exporta')
    u = re.search(r'(\d{1,3})\s+(unidades|filiais|lojas|fábricas|plantas industriais|armazéns)', tl)
    if u and 2 <= int(u.group(1)) <= 500: S.append(f'{u.group(1)} {u.group(2)}')
    elif re.search(r'\b(filiais|nossas unidades)\b', tl): S.append('várias unidades')
    f = re.search(r'(\d{1,3}(?:\.\d{3})*|\d+)\s*(?:mil\s+)?(colaboradores|funcionários|empregos diretos)', tl)
    if f: S.append(f'{f.group(0).strip()}')
    if re.search(r'\bfrota\b', tl): S.append('frota própria')
    if re.search(r'\b(sif|iso 9001|iso 22000|fssc|brcgs|globalg\.a\.p)\b', tl): S.append('certificações (SIF/ISO)')
    d = re.search(r'(?:desde|fundada em|há mais de)\s+(19\d\d|\d{2}\s+anos)', tl)
    if d: S.append(d.group(0))
    t2 = re.search(r'(\d{1,3}(?:\.\d{3})*(?:,\d+)?)\s*(mil\s+)?(toneladas|t/dia|cabeças|litros/dia|litros por dia|hectares|sacas)', tl)
    if t2: S.append(t2.group(0).strip()[:40])
    r['sinais_site'] = S
    r['titulo'] = (re.search(r'<title[^>]*>(.*?)</title>', h, re.S | re.I) or [None, ''])[1].strip()[:120]
    # dentista: agendamento online ou chamada para marcar consulta
    if not re.search(r'agend|marcar (?:uma )?consulta|marque (?:sua|uma) |doctoralia|booking|calendly', low): P.append('sem agendamento online nem botão para marcar consulta')
    r['pontos'] = len(P)
    return r

