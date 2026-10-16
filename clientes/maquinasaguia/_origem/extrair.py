# Lê o catálogo, as notícias e as páginas do site atual (WordPress + WooCommerce de maquinasaguia.com.br)
# e grava dados.json com os textos limpos e a lista de fotos de cada máquina.
# Rodar de novo só se o site atual mudar: python3 clientes/maquinasaguia/_origem/extrair.py
import html, json, os, re, urllib.parse, urllib.request

AQUI = os.path.dirname(os.path.abspath(__file__))
API = 'https://www.maquinasaguia.com.br/site/wp-json'

# Nome de cada máquina em caixa normal e o modelo à parte (o site atual usa tudo em maiúsculas).
NOMES = {
    'multi-processadora-de-blocos': ('Multiprocessador de Blocos', 'Lançamento'),
    'dip-destopadeira-inferior-pneumatica': ('Destopadeira Inferior Pneumática', 'DIP-35 · DIP-45 · DIP-55'),
    'serra-circular-multipla-cmba-160': ('Serra Circular Múltipla', 'CMBA-110 · CMBA-160 · CMBA-210'),
    'serra-circular-geminada-scgt4': ('Serra Circular Geminada / Bloqueadeira', 'SCGT4 · SCGT2'),
    'afiadeira-para-serras-de-fita-e-circulares-a-2': ('Afiadeira para Serras de Fita', 'A-2'),
    'igualador': ('Igualador', ''),
    'recalcador': ('Recalcador', ''),
    'laminadeira-tensionadora': ('Laminadeira Tensionadora', ''),
    'destopadeira-multipla-inferior-dmi': ('Destopadeira Múltipla Inferior', 'DMI'),
    'unitizador-de-toras-ou-tabuas': ('Unitizador de Toras ou Tábuas', ''),
    'serras-de-fita-geminadas-gemeas': ('Serras de Fita Geminadas "Gêmeas"', 'SFG-1100 a SFG-1500'),
    'transportador-correntes-transversais-ct-ctt': ('Transportador de Correntes Transversais', 'CT · CTT'),
    'virador-de-toras-vc-2-vc-3': ('Virador de Toras Pneumático', 'VC-2 · VC-3'),
    'serras-circulares-refiladeiras': ('Serra Circular Refiladeira', 'CA-80'),
    'avancamento-para-carro-porta-toras': ('Avançamento para Carro Porta Toras', ''),
    'carro-porta-toras-pneumatico-cpa-800': ('Carro Porta Toras Pneumático', 'CPA-800'),
    'carro-porta-toras-pneumatico-cpa1500': ('Carro Porta Toras Pneumático', 'CPA-1500'),
    'serra-de-fita-desdobro-horizontal-dh-110': ('Serra de Fita de Desdobro Horizontal', 'DH-110'),
    'tupiafresadora-copiativa-de-cepas-tfcc': ('Tupia/Fresadora Copiativa de Cepas', 'TFCC'),
    'torno-tubular-tte5400-egp': ('Torno Tubular', 'TTE5400 EG/P'),
    'torno-tubular-ttr-90-e-ttr-90p': ('Torno Tubular', 'TTR 90 · TTR 90/P'),
    'torno-tubular-ttr-130-e-ttr-130p': ('Torno Tubular', 'TTR 130 · TTR 130/P'),
    'torno-tubular-ttr-160p': ('Torno Tubular para Roletes', 'TTR 160/P'),
    'serra-destopadeira-de-cavilhas-pdc-14000': ('Serra Destopadeira de Cavilhas', 'PDC-14000'),
    'plaina-moldureira-pmr100': ('Plaina Moldureira Duas Faces', 'PMR100'),
    'serra-destopadeira-sd-3-e-sd-5': ('Serra Destopadeira', 'SD-3 · SD-5'),
    'serra-circular-srl-75-e-srm10': ('Serra Circular Refiladeira', 'SRL 7,5 · SRM10'),
    'serra-refiladeira-srp-15': ('Serra Circular Refiladeira', 'SRP-15'),
    'serra-circular-multilaminas-sm350': ('Serra Circular Multilâminas', 'New-SM350'),
    'serra-circular-multilaminas-sm200-2er2f': ('Serra Circular Multilâminas', 'SM200 2ER2F'),
    'serra-circular-multilaminas-sm200-ad': ('Serra Circular Multilâminas', 'SM200-AD'),
    'afiadeira-para-facas-de-torno-e-similares': ('Afiadeira para Facas de Torno e Similares', ''),
    'torno-tubulartp': ('Torno Tubular', 'TP'),
    'plaina-moldureira-duas-facer-pmr1006tr': ('Plaina Moldureira Duas Faces', 'PMR100/6tr'),
    'plaina-moldureira-2-faces': ('Plaina Moldureira Duas Faces', 'PMR-50'),
    'rosqueadeira-interna-ri': ('Rosqueadeira Interna', 'RI'),
    'rosqueadeira-externa-pneumatica-rec-p': ('Rosqueadeira Externa Pneumática', 'REC-p'),
    'conificadora-por-fresa-lateral-cfl-p': ('Conificadora por Fresa Lateral', 'CFL-p'),
    'lixadeira-de-uma-lixa-l12400': ('Lixadeira de Uma Lixa', 'L1-2400'),
    'lixadeira-dupla-lpd-2400': ('Lixadeira Dupla', 'LD-2400'),
    'lixadeira-dupla-lpd-3200': ('Lixadeira Dupla', 'LPD-3200'),
    'torno-cabeceiro-pneumatico-ca45-pn': ('Torno Cabeceiro Pneumático', 'CA45-PN'),
    'torno-cabeceiro-ca18-ex': ('Torno Cabeceiro', 'CA18-EX'),
    'torno-tubular': ('Torno Tubular', 'TTE5400'),
    'serras-de-fita-de-desdobro-vertical': ('Serras de Fita de Desdobro Vertical', ''),
    'serra-de-fita-para-toras': ('Serra de Fita para Toras', ''),
}

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return json.load(urllib.request.urlopen(req, timeout=60))

def arquivo(src):
    """Nome do arquivo local (em img/) de uma foto do site atual."""
    rel = urllib.parse.unquote(src.split('/uploads/')[1])
    return rel.replace('/', '_')

PERMITIDAS = {'p', 'strong', 'b', 'em', 'br', 'table', 'tbody', 'tr', 'td', 'ul', 'li', 'h3'}

def limpar(h):
    """Deixa só a estrutura do texto: parágrafos, negrito, listas, tabelas e os subtítulos do site atual."""
    h = html.unescape(h).replace('\xa0', ' ')
    h = re.sub(r'<div class="title">\s*<h2>\s*(.*?)\s*</h2>.*?</div></div></div>', r'</p><h3>\1</h3><p>', h, flags=re.S)
    h = re.sub(r'<a [^>]*>\s*(<img[^>]*>)\s*</a>', r'\1', h)
    h = re.sub(r'<img[^>]*src="([^"]+)"[^>]*>', lambda m: f'[[img:{arquivo(m.group(1))}]]' if '/uploads/' in m.group(1) else '', h)
    def tag(m):
        fecha, nome, attrs = m.group(1), m.group(2).lower(), m.group(3)
        if nome == 'b': nome = 'strong'
        if nome not in PERMITIDAS: return ''
        extra = ''
        if nome == 'td' and not fecha:
            for a in ('rowspan', 'colspan'):
                v = re.search(a + r'="(\d+)"', attrs)
                if v and v.group(1) != '1': extra += f' {a}="{v.group(1)}"'
        return f'<{fecha}{nome}{extra}>'
    h = re.sub(r'<(/?)(\w+)([^>]*)>', tag, h)
    h = re.sub(r'<td([^>]*)>\s*<p>(.*?)</p>\s*</td>', lambda m: f'<td{m.group(1)}>' + re.sub(r'\s*</p>\s*<p>\s*', ' ', m.group(2)) + '</td>', h, flags=re.S)
    h = re.sub(r'<p>\s*(<br>\s*)*</p>', '', h)
    h = re.sub(r'<strong>\s*</strong>', '', h)
    h = re.sub(r'\s*\n\s*', ' ', h)
    h = re.sub(r'<br>\s*</p>', '</p>', h)
    h = re.sub(r'<p>\s*(?=<(ul|table|h3)>)', '', h)
    h = re.sub(r'(</ul>|</table>|</h3>)\s*</p>', r'\1', h)
    h = re.sub(r'<p>\s*</p>', '', h)
    return h.strip()

def texto(h):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', h))).strip()

produtos = []
for p in get(API + '/wc/store/v1/products?per_page=100'):
    nome, modelo = NOMES[p['slug']]
    resumo = texto(p['short_description'])
    desc = limpar(p['description'])
    if not resumo:
        primeiro = re.search(r'<p>(.*?)</p>', desc)
        resumo = texto(primeiro.group(1)) if primeiro else ''
    produtos.append({
        'slug': p['slug'], 'nome': nome, 'modelo': modelo, 'resumo': resumo, 'html': desc,
        'cats': [c['slug'] for c in p['categories']],
        'fotos': [arquivo(i['src']) for i in p['images']],
        'original': p['permalink'],
    })

noticias = []
for n in get(API + '/wp/v2/posts?per_page=100&_embed=1'):
    media = (n.get('_embedded', {}).get('wp:featuredmedia') or [{}])[0]
    noticias.append({
        'slug': n['slug'], 'data': n['date'][:10], 'titulo': texto(n['title']['rendered']),
        'html': limpar(n['content']['rendered']), 'foto': arquivo(media['source_url']) if media.get('source_url') else '',
        'original': n['link'],
    })

json.dump({'produtos': produtos, 'noticias': noticias}, open(os.path.join(AQUI, 'dados.json'), 'w'), ensure_ascii=False, indent=1)
print(len(produtos), 'máquinas,', len(noticias), 'notícias')
