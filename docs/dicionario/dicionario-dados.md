# Dicionário de Dados

Este documento descreve as bases simuladas utilizadas no projeto **BI Operational Dashboard**.

O projeto utiliza dados fictícios para simular um cenário operacional envolvendo contratos, fornecedores, demandas, pagamentos, SLA e indicadores de desempenho.

---

## Base: fornecedores.csv

Arquivo:

```text
data/raw/fornecedores.csv
```

| Campo | Descrição |
|---|---|
| fornecedor_id | Identificador único do fornecedor |
| fornecedor | Nome do fornecedor |
| categoria_fornecedor | Categoria principal de atuação do fornecedor |
| uf | Unidade federativa do fornecedor |
| status_fornecedor | Situação do fornecedor, podendo ser Ativo ou Inativo |
| avaliacao | Nota média simulada do fornecedor |

---

## Base: contratos.csv

Arquivo:

```text
data/raw/contratos.csv
```

| Campo | Descrição |
|---|---|
| contrato_id | Identificador único do contrato |
| fornecedor_id | Identificador do fornecedor vinculado ao contrato |
| fornecedor | Nome do fornecedor vinculado ao contrato |
| objeto_contrato | Objeto ou finalidade do contrato |
| data_inicio | Data de início da vigência contratual |
| data_fim | Data final da vigência contratual |
| valor_total_contrato | Valor total previsto para o contrato |
| status_contrato | Situação do contrato |
| gestor_responsavel | Gestor responsável pelo acompanhamento |
| unidade | Unidade interna responsável pelo contrato |

---

## Base: demandas.csv

Arquivo:

```text
data/raw/demandas.csv
```

| Campo | Descrição |
|---|---|
| demanda_id | Identificador único da demanda |
| contrato_id | Identificador do contrato relacionado |
| fornecedor_id | Identificador do fornecedor relacionado |
| fornecedor | Nome do fornecedor |
| data_abertura | Data de abertura da demanda |
| data_limite | Data limite para atendimento conforme SLA |
| data_conclusao | Data de conclusão da demanda |
| categoria_demanda | Categoria da demanda |
| prioridade | Prioridade da demanda |
| status_demanda | Situação atual da demanda |
| sla_dias | Prazo de SLA definido em dias |
| tempo_atendimento_dias | Tempo utilizado para atendimento da demanda |
| sla_cumprido | Indica se o SLA foi cumprido |
| valor_estimado | Valor estimado associado à demanda |
| unidade | Unidade interna responsável pela demanda |

---

## Base: pagamentos.csv

Arquivo:

```text
data/raw/pagamentos.csv
```

| Campo | Descrição |
|---|---|
| pagamento_id | Identificador único do pagamento |
| contrato_id | Identificador do contrato relacionado |
| fornecedor_id | Identificador do fornecedor |
| fornecedor | Nome do fornecedor |
| competencia | Competência do pagamento |
| data_pagamento | Data em que o pagamento foi realizado |
| valor_pago | Valor do pagamento |
| status_pagamento | Situação do pagamento |
| tipo_despesa | Tipo de despesa relacionada |

---

## Relacionamentos esperados

```text
fornecedores.csv 1:N contratos.csv
contratos.csv 1:N demandas.csv
contratos.csv 1:N pagamentos.csv
fornecedores.csv 1:N demandas.csv
fornecedores.csv 1:N pagamentos.csv
```

---

## Indicadores esperados

Os dados permitem construir indicadores como:

- Total de demandas;
- Demandas concluídas;
- Demandas em andamento;
- Demandas atrasadas;
- Percentual de SLA cumprido;
- Tempo médio de atendimento;
- Valor total contratado;
- Valor pago;
- Pagamentos pendentes;
- Contratos vigentes;
- Contratos próximos do vencimento;
- Demandas por fornecedor;
- Demandas por unidade;
- Demandas por prioridade;
- Pagamentos por competência.

---

## Observação

Todas as informações são fictícias e foram geradas exclusivamente para fins de estudo, prática de análise de dados, Excel, Power BI e construção de portfólio.