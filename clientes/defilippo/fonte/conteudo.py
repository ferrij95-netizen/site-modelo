# Conteúdo compartilhado pelas duas versões do site da Oficina De Filippo.
# Textos reescritos a partir do site atual (clientes/defilippo/_origem/html/*.txt).

NOME = 'Oficina De Filippo'
WHATS = '551130642440'  # confirmar com o cliente o número de WhatsApp (o site atual só tem telefone fixo)
TEL = '(11) 3064-2440'
TEL_HREF = '+551130642440'
TEL2 = '(11) 3088-2807'
TEL2_HREF = '+551130882807'
EMAIL = 'oficinadefilippo@oficinadefilippo.com'
RUA = 'Rua Fradique Coutinho, 60'
BAIRRO = 'Pinheiros · São Paulo/SP'
CEP = '05416-010'
MAPA = 'https://www.google.com/maps/search/?api=1&query=Rua+Fradique+Coutinho+60+Pinheiros+Sao+Paulo'
MAPA_EMBED = 'https://maps.google.com/maps?q=Rua%20Fradique%20Coutinho%2060%2C%20Pinheiros%2C%20S%C3%A3o%20Paulo&z=16&output=embed'

NAV = [
    ('index', 'Início'),
    ('oficina', 'A oficina'),
    ('servicos', 'Serviços'),
    ('compromisso', 'Compromisso'),
    ('contato', 'Contato'),
]

SERVICOS = [
    {
        'slug': 'manutencao', 'titulo': 'Manutenção', 'foto': 'elevador',
        'resumo': 'Revisão completa e manutenção preventiva e corretiva, de carros nacionais e importados.',
        'intro': 'Fazemos toda a manutenção do seu carro em sede própria, com equipamento de diagnóstico e peças recomendadas pelo fabricante. Só indicamos o que for de fato necessário.',
        'itens': [
            ('Análise de gases', 'Medição das emissões para regular o motor dentro dos parâmetros do fabricante e da lei.'),
            ('Elétrica do motor', 'Sensores, atuadores, chicotes, relés e ignição verificados e corrigidos.'),
            ('Freios', 'Pastilhas, discos, fluido e cilindros, com teste ao final do serviço.'),
            ('Limpeza de bicos injetores', 'Limpeza por ultrassom e teste de vazão e estanqueidade de cada bico.'),
            ('Motor', 'Correias, vazamentos, arrefecimento e reparos mecânicos em geral.'),
            ('Suspensão', 'Amortecedores, molas, buchas, pivôs e terminais.'),
            ('Troca de óleo e filtro', 'Óleo na especificação do fabricante e filtros de óleo, ar e combustível.'),
        ],
    },
    {
        'slug': 'preparacao', 'titulo': 'Preparação', 'foto': 'motor',
        'resumo': 'Mais desempenho com segurança: motor, gerenciamento, freios e suspensão.',
        'intro': 'Para quem quer extrair mais do carro, preparamos motor, gerenciamento eletrônico, freios e suspensão de forma equilibrada, sem abrir mão da confiabilidade no uso do dia a dia.',
        'itens': [
            ('Freios', 'Conjuntos dimensionados para o novo nível de desempenho.'),
            ('Gerenciamento do motor', 'Ajuste do gerenciamento eletrônico de injeção e ignição.'),
            ('Mecânica do motor', 'Preparação e montagem de componentes internos do motor.'),
            ('Suspensão', 'Acerto de suspensão para estabilidade e dirigibilidade.'),
        ],
    },
    {
        'slug': 'diagnostico', 'titulo': 'Diagnóstico eletrônico', 'foto': 'motor-pb',
        'resumo': 'Scanner OBD2, analisador de gases e limpeza de bicos por ultrassom.',
        'intro': 'Os mesmos tipos de equipamento usados pelos fabricantes de veículos. Antes de trocar qualquer peça, medimos e mostramos o que está acontecendo.',
        'itens': [
            ('Scanner OBD2', 'Ligado ao computador do carro, faz o check-up de toda a parte eletrônica (sensores, atuadores, tensão, relés) e localiza defeitos, mau funcionamento e avarias eletrônicas ou mecânicas.'),
            ('Analisador de gases', 'Verifica se o veículo está dentro dos parâmetros e das leis de emissão de poluentes e permite regular o motor para funcionar corretamente.'),
            ('Limpeza de bicos por ultrassom', 'Remove sujeira e resíduos dos bicos injetores e faz testes em várias condições de uso para localizar qualquer defeito.'),
        ],
    },
]

ETICA = [
    'Prestar um serviço de primeira classe.',
    'Aproveitar toda oportunidade de aumentar o conhecimento e a capacidade no nosso trabalho, aprendendo sempre.',
    'Usar apenas produtos comprovadamente seguros e recomendados pelo fabricante.',
    'Recomendar apenas o trabalho e a troca de peças que acreditamos ser realmente necessários.',
    'Tratar o carro do cliente como se fosse nosso.',
    'Corrigir qualquer erro involuntário de outro profissional sem atingir a reputação da pessoa ou da empresa.',
    'Manter e aumentar o respeito do público pelos profissionais automotivos certificados pela ASE Brasil.',
    'Trabalhar com integridade, sempre pelo interesse do cliente, da empresa e o nosso.',
]

OPCOES_ORCAMENTO = ['Revisão / manutenção', 'Freios', 'Suspensão', 'Motor', 'Elétrica / diagnóstico', 'Limpeza de bicos', 'Troca de óleo', 'Preparação', 'Avaliação antes da compra', 'Outro']
