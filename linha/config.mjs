// Configuração da linha. Tudo o que muda custo ou qualidade fica aqui.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const AQUI = path.dirname(fileURLToPath(import.meta.url));
// LINHA_REPO: outra cópia do site-modelo (usado nos testes, para não sujar o repositório).
export const REPO = path.resolve(process.env.LINHA_REPO || path.join(AQUI, '..'));
// Dados de trabalho (listas, prints, respostas da IA). Fica FORA do repositório, que é público.
export const DADOS = path.resolve(process.env.LINHA_DADOS || path.join(REPO, '..', 'linha-dados'));

// Modelo de cada etapa. Haiku é barato e vê imagem; Sonnet só onde a qualidade do texto e o olho crítico contam.
export const MODELOS = {
  triagem: 'claude-haiku-5-5',
  conteudo: 'claude-haiku-5-5',
  redacao: 'claude-sonnet-5-5',
  traducao: 'claude-haiku-5-5',
  revisao: 'claude-sonnet-5-5',
  abordagem: 'claude-haiku-5-5',
};

// Esforço de raciocínio por etapa (menos esforço = menos tokens de saída).
export const ESFORCO = {
  triagem: 'low', conteudo: 'low', redacao: 'medium', traducao: 'low', revisao: 'low', abordagem: 'low',
};

// US$ por milhão de tokens (tabela da Anthropic, outubro de 2026). Cache: escrita 1,25x, leitura 0,1x. Lote: metade.
export const PRECOS = {
  'claude-haiku-5-5': { entrada: 0.10, saida: 0.50 },
  'claude-sonnet-5-5': { entrada: 2.00, saida: 10.00 },
  'claude-opus-5-5': { entrada: 4.00, saida: 20.00 },
};
export const DOLAR = Number(process.env.DOLAR || 5.5);

// Triagem: nota visual de 0 (site ótimo) a 10 (site muito ruim). Só segue para produção quem tiver nota >= isto.
export const NOTA_MINIMA = Number(process.env.NOTA_MINIMA || 6);

// Captura: quantas páginas internas ler e quantas fotos baixar por empresa.
export const MAX_PAGINAS = 8;
export const MAX_FOTOS = 24;

// Domínio dos previews.
export const DOMINIO = 'overtus.com.br';
