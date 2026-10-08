// Textos provisórios da DHT. Nada aqui veio do cliente: trocar quando a DHT mandar logo, produto e dados reais.
export const site = {
  nome: 'DHT',
  dominio: 'https://dht.overtus.com.br',
  tagline: 'Monitoramento contínuo de pacientes',
  email: 'contato@dht.com.br',
  telefone: '(51) 0000-0000',
  cidade: 'Brasil',
};

export const nav = [
  ['plataforma', 'Plataforma'],
  ['sensor', 'Sensor'],
  ['solucoes', 'Soluções'],
  ['seguranca', 'Segurança'],
  ['empresa', 'Empresa'],
  ['contato', 'Contato'],
];

export const specs = [
  ['5', 'sinais vitais medidos'],
  ['1 s', 'entre uma leitura e outra'],
  ['7 dias', 'de bateria por ciclo'],
  ['18 g', 'de peso no braço'],
  ['IP67', 'contra água e poeira'],
  ['< 30 s', 'do desvio ao celular da equipe'],
];

export const passos = [
  ['Colocar', 'O sensor vai no braço do paciente em menos de um minuto. Sem fios, sem cabos presos à cama, sem atrapalhar o sono.'],
  ['Acompanhar', 'A plataforma calcula o escore de alerta precoce de cada leito a cada leitura e organiza a ala por prioridade.'],
  ['Agir', 'Quando um padrão foge do esperado, o enfermeiro responsável recebe o alerta no celular com o histórico das últimas horas.'],
];

export const solucoes = [
  ['hospitais', 'Hospitais', 'Enfermarias, pós-operatório e pronto-atendimento com vigilância contínua entre uma ronda e outra.',
    [['Enfermarias', 'Todos os leitos acompanhados ao mesmo tempo, não só os que estão na vez da ronda.'],
     ['Pós-operatório', 'Desvios de frequência respiratória e saturação aparecem horas antes da piora clínica.'],
     ['Pronto-atendimento', 'Pacientes em observação seguem monitorados mesmo no corredor ou na sala de espera.']]],
  ['home-care', 'Home care', 'Alta mais cedo com a mesma segurança: o paciente vai para casa e a equipe continua vendo seus sinais.',
    [['Desospitalização', 'Leito liberado antes, com acompanhamento remoto nos primeiros dias em casa.'],
     ['Central de monitoramento', 'Uma equipe acompanha dezenas de pacientes em casa a partir de um único painel.'],
     ['Família informada', 'Avisos simples para o cuidador quando algo precisa de atenção.']]],
  ['operadoras', 'Operadoras de saúde', 'Programas de crônicos com dados contínuos, não só com a consulta de três em três meses.',
    [['Crônicos', 'Insuficiência cardíaca, DPOC e hipertensão acompanhados no dia a dia.'],
     ['Menos internações', 'Sinais de descompensação percebidos a tempo de agir fora do hospital.'],
     ['Indicadores', 'Relatórios por população, por programa e por paciente.']]],
];

export const recursosPlataforma = [
  ['Painel da ala', 'Todos os leitos em uma tela, ordenados por quem precisa de atenção agora.'],
  ['Escore de alerta precoce', 'NEWS2 calculado a cada leitura, com a tendência das últimas 24 horas.'],
  ['Alertas no celular', 'O aviso vai para o enfermeiro responsável, com escalonamento se ninguém responder.'],
  ['Histórico do paciente', 'Curvas contínuas de cada sinal, anotações da equipe e eventos marcados no sensor.'],
  ['Integração com prontuário', 'Envio dos sinais e alertas para o prontuário eletrônico por HL7 FHIR.'],
  ['Relatório de turno', 'Resumo automático da passagem de plantão: o que mudou, quem piorou, quem melhorou.'],
];

export const specsPlataforma = [
  ['24/7', 'acompanhamento de cada leito'],
  ['FHIR', 'integração com o prontuário'],
  ['2 apps', 'painel no navegador e app da equipe'],
  ['0', 'servidor para instalar no hospital'],
];

export const fichaSensor = [
  ['Dimensões', '54 × 42 × 11 mm'],
  ['Peso', '18 g com pulseira'],
  ['Sinais', 'Frequência cardíaca, SpO₂, frequência respiratória, temperatura, postura e movimento'],
  ['Leitura', 'Contínua, com envio a cada 1 segundo'],
  ['Bateria', '7 dias por ciclo, recarga completa em 90 minutos'],
  ['Conexão', 'Bluetooth 5.3 com a central do leito ou o celular do paciente'],
  ['Proteção', 'IP67, pode ir ao banho'],
  ['Materiais', 'Carcaça em policarbonato de grau médico, pulseira têxtil lavável'],
  ['Limpeza', 'Álcool 70% entre um paciente e outro'],
];

export const seguranca = [
  ['LGPD', 'Dados de saúde tratados como dados sensíveis, com base legal, finalidade e prazo de guarda definidos.'],
  ['Criptografia', 'Dados criptografados no sensor, no envio (TLS 1.3) e no armazenamento (AES-256).'],
  ['Dados no Brasil', 'Servidores em território nacional, com cópias de segurança em duas regiões.'],
  ['Acesso por perfil', 'Cada profissional vê só os pacientes da sua unidade, com login individual.'],
  ['Trilha de auditoria', 'Todo acesso e toda ação ficam registrados com data, hora e responsável.'],
  ['Regulatório', 'Sensor e software desenvolvidos para regularização como dispositivo médico junto à ANVISA.'],
];

export const valores = [
  ['Precisão', 'Um alerta só vale se a equipe confiar nele. Medimos bem antes de medir muito.'],
  ['Silêncio', 'Menos alarmes, mais certos. A tecnologia some e sobra o cuidado.'],
  ['Proximidade', 'Engenharia, enfermagem e medicina trabalhando na mesma mesa.'],
];

export const paginas = {
  index: { titulo: 'DHT · Monitoramento contínuo de pacientes', desc: 'Sensor vestível e plataforma clínica que acompanham sinais vitais 24 horas por dia e avisam a equipe antes que o quadro piore.' },
  plataforma: { titulo: 'Plataforma · DHT', desc: 'Painel da ala, escore de alerta precoce, alertas no celular e integração com o prontuário.' },
  sensor: { titulo: 'Sensor · DHT', desc: 'Sensor vestível de 18 g que mede cinco sinais vitais a cada segundo, com 7 dias de bateria.' },
  solucoes: { titulo: 'Soluções · DHT', desc: 'Monitoramento contínuo para hospitais, home care e operadoras de saúde.' },
  seguranca: { titulo: 'Segurança · DHT', desc: 'LGPD, criptografia, dados no Brasil e trilha de auditoria.' },
  empresa: { titulo: 'Empresa · DHT', desc: 'Uma healthtech brasileira que junta engenharia, enfermagem e medicina para cuidar entre uma ronda e outra.' },
  contato: { titulo: 'Contato · DHT', desc: 'Agende uma demonstração da DHT na sua ala.' },
};
