# Testa quais fontes públicas de médicos respondem a partir do GitHub Actions.
import json, os, requests, traceback
os.makedirs('sonda', exist_ok=True)
H = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0', 'Accept': 'application/json, text/plain, */*'}
T = [
 ('cnes_api_tipo22', 'GET', 'https://apidadosabertos.saude.gov.br/cnes/estabelecimentos?codigo_tipo_unidade=22&codigo_municipio=431490&limit=20&offset=0', None),
 ('cnes_api_tipos', 'GET', 'https://apidadosabertos.saude.gov.br/cnes/tipounidades', None),
 ('cnes_site_estab', 'GET', 'https://cnes.datasus.gov.br/services/estabelecimentos?municipio=431490&tipoUnidade=22', None),
 ('cnes_site_estab2', 'GET', 'https://cnes.datasus.gov.br/services/estabelecimentos?municipio=431490', None),
 ('cnes_ftp_list', 'GET', 'https://ftp.datasus.gov.br/cnes/', None),
 ('cnes_downloads', 'GET', 'https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp', None),
 ('cfm_busca', 'POST', 'https://portal.cfm.org.br/api_rest_php/api/v1/medicos/buscar_medicos',
   [{"useCaptchav2": True, "captcha": "", "medico": {"nome": "", "ufMedico": "RS", "crmMedico": "", "municipioMedico": "", "tipoInscricaoMedico": "", "situacaoMedico": "A", "detalheSituacaoMedico": "", "especialidadeMedico": "", "areaAtuacaoMedico": ""}, "page": 1, "pageNumber": 1, "pageSize": 10}]),
 ('cremers', 'GET', 'https://cremers.org.br/busca-medicos/', None),
 ('telelistas', 'GET', 'https://www.telelistas.net/rs/porto+alegre/medicos', None),
 ('guiamais', 'GET', 'https://www.guiamais.com.br/porto-alegre-rs/medicos', None),
 ('apontador', 'GET', 'https://www.apontador.com.br/local/rs/porto_alegre/medicos', None),
 ('doctoralia', 'GET', 'https://www.doctoralia.com.br/pesquisa?q=Cardiologista&loc=Porto%20Alegre', None),
]
res = {}
for nome, m, url, body in T:
    try:
        r = requests.request(m, url, headers=H, json=body, timeout=40)
        res[nome] = {'status': r.status_code, 'tipo': r.headers.get('content-type'), 'tam': len(r.content)}
        open(f'sonda/{nome}.txt', 'w').write(r.text[:60000])
    except Exception as e:
        res[nome] = {'erro': repr(e)[:300]}
    print(nome, res[nome], flush=True)
json.dump(res, open('sonda/resumo.json', 'w'), indent=1)
