# Como garimpar médicos que não estão na internet

Médico com secretária e telefone fixo quase não aparece no Google, mas aparece em **cadastros oficiais**, porque é obrigado a estar neles. O garimpo começa nesses cadastros e usa o Google só para confirmar quem *não* está lá.

## O que funcionou (testado em 08/10/2026)

| Fonte | O que dá | Funciona? |
|---|---|---|
| **CNES – consultórios isolados** (Ministério da Saúde, dados abertos) | Nome, endereço, **telefone**, e-mail de todo consultório particular registrado | ✅ Fonte principal. 12.764 consultórios em 16 cidades do RS |
| **CNES – arquivo de profissionais (PF)** do DATASUS | Nome do médico, **especialidade** (CBO) e **número do CRM** de cada consultório | ✅ Cruza com a de cima e diz quem é médico (e não dentista, psicólogo etc.) |
| **Google Maps** | Se tem site, nota e quantidade de avaliações | ✅ Usado para confirmar quem está fora do digital |
| Portal do CFM (Busca Médicos) | CRM, especialidade | ❌ Tem captcha; e o CNES já traz o CRM |
| Listas telefônicas online (Telelistas, GuiaMais) | — | ❌ Fora do ar ou sem a categoria |
| Apontador / Doctoralia | Lista de médicos | ⚠️ Responde, mas quem está ali já é digital: serve para **excluir**, não para achar |
| Receita Federal (CNPJ, CNAE 8630-5/03) | Telefone e e-mail de consultórios com CNPJ | ⚠️ Funciona, mas o médico mais analógico atende como pessoa física (sem CNPJ). Bom para uma segunda leva |

## Sinais de "consultório analógico" (a nota de 0 a 10+)

- **Só telefone fixo** no cadastro (secretária atende) → o sinal mais forte
- **E-mail de provedor antigo** (terra, bol, uol, ig, yahoo, brturbo, via-rs) ou nenhum e-mail
- **Sem site** e **poucas ou nenhuma avaliação** no Google
- **Atende como pessoa física** e **sozinho** no consultório (decisor = o próprio médico)
- **CRM antigo** (número baixo = formado há muitos anos, geralmente agenda de papel)
- Tem domínio próprio no e-mail → perde pontos (provavelmente já tem site)

Ficaram de fora radiologistas, anestesistas, patologistas e afins, que não marcam consulta com secretária.

## Outras formas de garimpar (offline, para depois)

- **Prédios médicos**: um endereço do CNES com 30+ consultórios é um prédio inteiro para visitar ou prospectar de porta em porta.
- **Convênios** (Unimed, IPE Saúde, Cassi): o guia do convênio lista médicos credenciados com telefone; muitos só existem ali.
- **Sociedades de especialidade** (SBC, SBD, Febrasgo): listas de associados por cidade.
- **Representantes de laboratório farmacêutico**: conhecem cada consultório pelo nome; boa parceria de indicação.

## LGPD: o que pode e o que não pode

- Pode: contato **B2B** com o médico como profissional, usando dados que ele próprio tornou públicos em cadastro oficial (CNES é público por lei). A base legal é **legítimo interesse** (art. 7º, IX e §4º): oferta de serviço ligada à atividade profissional dele.
- Precisa: dizer **de onde veio o contato** se ele perguntar ("cadastro público do CNES"), e **tirar da lista na hora** quem pedir. Anotar isso na planilha.
- Não pode: usar CPF (não guardamos), vender ou repassar a lista, ou disparar mensagem em massa no WhatsApp (bloqueio e reclamação). Ligação e visita uma a uma são o caminho.
- Telefone celular pessoal: tratar com mais cuidado; nesta lista a prioridade é o fixo do consultório.

## Como repetir

O coletor fica no repositório site-modelo (ramo `claude/project-thread-0xo7ls`, pasta `prospeccao/medicos`). Para outra região basta trocar a lista de cidades em `coleta.py` e o estado no `pf.sh`; roda sozinho no GitHub.
