const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'data', 'raw');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let seed = 12345;

function random() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

function escolha(lista) {
  return lista[Math.floor(random() * lista.length)];
}

function numero(min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function moeda(min, max) {
  return (random() * (max - min) + min).toFixed(2).replace('.', ',');
}

function dataAleatoria(inicio, fim) {
  const start = new Date(inicio).getTime();
  const end = new Date(fim).getTime();
  const data = new Date(start + random() * (end - start));
  return data.toISOString().split('T')[0];
}

function adicionarDias(data, dias) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() + dias);
  return novaData.toISOString().split('T')[0];
}

function salvarCSV(nomeArquivo, cabecalho, linhas) {
  const conteudo = [cabecalho.join(';'), ...linhas.map(linha => linha.join(';'))].join('\n');
  fs.writeFileSync(path.join(outputDir, nomeArquivo), conteudo, 'utf8');
}

const fornecedores = [
  ['F001', 'Alpha Serviços', 'Limpeza', 'DF', 'Ativo', '4,7'],
  ['F002', 'Beta Facilities', 'Manutenção', 'GO', 'Ativo', '4,3'],
  ['F003', 'Central Tech', 'Tecnologia', 'DF', 'Ativo', '4,8'],
  ['F004', 'Delta Segurança', 'Segurança', 'DF', 'Ativo', '4,1'],
  ['F005', 'Eco Office', 'Material de Escritório', 'SP', 'Ativo', '4,0'],
  ['F006', 'Forte Logística', 'Transporte', 'MG', 'Ativo', '3,9'],
  ['F007', 'Global Sistemas', 'Tecnologia', 'RJ', 'Ativo', '4,6'],
  ['F008', 'Higieniza Mais', 'Limpeza', 'DF', 'Inativo', '3,7'],
  ['F009', 'InfraMax', 'Manutenção', 'GO', 'Ativo', '4,2'],
  ['F010', 'Prime Soluções', 'Consultoria', 'SP', 'Ativo', '4,5']
];

salvarCSV(
  'fornecedores.csv',
  ['fornecedor_id', 'fornecedor', 'categoria_fornecedor', 'uf', 'status_fornecedor', 'avaliacao'],
  fornecedores
);

const objetos = [
  'Prestação de serviços continuados',
  'Suporte técnico operacional',
  'Fornecimento de materiais',
  'Serviços de manutenção preventiva',
  'Atendimento de demandas administrativas'
];

const gestores = ['Bruno Ramos', 'Ana Paula', 'Carlos Mendes', 'Fernanda Lima', 'Rafael Costa'];
const unidades = ['Administrativo', 'Operações', 'Tecnologia', 'Contratos', 'Atendimento'];

const contratos = [];

for (let i = 1; i <= 20; i++) {
  const fornecedor = escolha(fornecedores);
  const inicio = dataAleatoria('2024-01-01', '2025-06-30');
  const duracaoMeses = escolha([12, 18, 24, 30, 36]);
  const fim = adicionarDias(inicio, duracaoMeses * 30);
  const status = new Date(fim) < new Date('2026-07-01') ? 'Encerrado' : escolha(['Vigente', 'Vigente', 'Vigente', 'Próximo do vencimento']);

  contratos.push([
    `C${String(i).padStart(3, '0')}`,
    fornecedor[0],
    fornecedor[1],
    escolha(objetos),
    inicio,
    fim,
    moeda(80000, 850000),
    status,
    escolha(gestores),
    escolha(unidades)
  ]);
}

salvarCSV(
  'contratos.csv',
  ['contrato_id', 'fornecedor_id', 'fornecedor', 'objeto_contrato', 'data_inicio', 'data_fim', 'valor_total_contrato', 'status_contrato', 'gestor_responsavel', 'unidade'],
  contratos
);

const categoriasDemandas = ['Solicitação', 'Manutenção', 'Suporte', 'Entrega', 'Correção', 'Análise'];
const prioridades = ['Baixa', 'Média', 'Alta', 'Crítica'];
const statusDemandas = ['Concluída', 'Concluída', 'Concluída', 'Em andamento', 'Atrasada', 'Cancelada'];

const demandas = [];

for (let i = 1; i <= 240; i++) {
  const contrato = escolha(contratos);
  const dataAbertura = dataAleatoria('2025-01-01', '2026-06-30');
  const prioridade = escolha(prioridades);
  const slaDias = prioridade === 'Crítica' ? 2 : prioridade === 'Alta' ? 5 : prioridade === 'Média' ? 10 : 15;
  const dataLimite = adicionarDias(dataAbertura, slaDias);
  const status = escolha(statusDemandas);

  let tempoAtendimento = '';
  let dataConclusao = '';
  let slaCumprido = '';

  if (status === 'Concluída') {
    tempoAtendimento = numero(1, 20);
    dataConclusao = adicionarDias(dataAbertura, tempoAtendimento);
    slaCumprido = tempoAtendimento <= slaDias ? 'Sim' : 'Não';
  } else if (status === 'Atrasada') {
    tempoAtendimento = numero(slaDias + 1, slaDias + 20);
    dataConclusao = '';
    slaCumprido = 'Não';
  } else if (status === 'Em andamento') {
    tempoAtendimento = '';
    dataConclusao = '';
    slaCumprido = '';
  } else {
    tempoAtendimento = '';
    dataConclusao = '';
    slaCumprido = 'Não se aplica';
  }

  demandas.push([
    `D${String(i).padStart(4, '0')}`,
    contrato[0],
    contrato[1],
    contrato[2],
    dataAbertura,
    dataLimite,
    dataConclusao,
    escolha(categoriasDemandas),
    prioridade,
    status,
    slaDias,
    tempoAtendimento,
    slaCumprido,
    moeda(500, 25000),
    contrato[9]
  ]);
}

salvarCSV(
  'demandas.csv',
  ['demanda_id', 'contrato_id', 'fornecedor_id', 'fornecedor', 'data_abertura', 'data_limite', 'data_conclusao', 'categoria_demanda', 'prioridade', 'status_demanda', 'sla_dias', 'tempo_atendimento_dias', 'sla_cumprido', 'valor_estimado', 'unidade'],
  demandas
);

const pagamentos = [];

for (let i = 1; i <= 120; i++) {
  const contrato = escolha(contratos);
  const competencia = `${numero(2025, 2026)}-${String(numero(1, 12)).padStart(2, '0')}`;
  const status = escolha(['Pago', 'Pago', 'Pago', 'Pendente', 'Em análise', 'Atrasado']);

  pagamentos.push([
    `P${String(i).padStart(4, '0')}`,
    contrato[0],
    contrato[1],
    contrato[2],
    competencia,
    status === 'Pago' ? dataAleatoria('2025-01-01', '2026-06-30') : '',
    moeda(3000, 60000),
    status,
    escolha(['Mensal', 'Serviço avulso', 'Material', 'Suporte', 'Manutenção'])
  ]);
}

salvarCSV(
  'pagamentos.csv',
  ['pagamento_id', 'contrato_id', 'fornecedor_id', 'fornecedor', 'competencia', 'data_pagamento', 'valor_pago', 'status_pagamento', 'tipo_despesa'],
  pagamentos
);

console.log('Bases simuladas geradas com sucesso em data/raw');
console.log('- fornecedores.csv');
console.log('- contratos.csv');
console.log('- demandas.csv');
console.log('- pagamentos.csv');
