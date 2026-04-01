document.addEventListener('DOMContentLoaded', () => {
  const seletorTurma = document.getElementById('turmaSelecionada');
  const cabecalhoNotas = document.getElementById('cabecalhoNotas');
  const corpoTabelaNotas = document.getElementById('corpoTabelaNotas');
  const loadingNotas = document.getElementById('loadingNotas');
  const erroNotas = document.getElementById('erroNotas');
  const wrapperTabelaNotas = document.getElementById('wrapperTabelaNotas');

  let dadosCSV = [];
  let cabecalhos = [];

  function separarCSV(linha) {
    const valores = [];
    let atual = '';
    let dentroAspas = false;

    for (let i = 0; i < linha.length; i++) {
      const char = linha[i];

      if (char === '"') {
        if (dentroAspas && linha[i + 1] === '"') {
          atual += '"';
          i++;
        } else {
          dentroAspas = !dentroAspas;
        }
      } else if (char === ',' && !dentroAspas) {
        valores.push(atual.trim());
        atual = '';
      } else {
        atual += char;
      }
    }

    valores.push(atual.trim());
    return valores.map(valor => valor.replace(/^"(.*)"$/, '$1'));
  }

  function parseCSV(texto) {
    const linhas = texto
      .trim()
      .split(/\r?\n/)
      .filter(linha => linha.trim() !== '');

    if (linhas.length === 0) return [];

    const headers = separarCSV(linhas[0]);

    return linhas.slice(1).map(linha => {
      const valores = separarCSV(linha);
      const objeto = {};

      headers.forEach((header, index) => {
        objeto[header] = valores[index] ?? '';
      });

      return objeto;
    });
  }

  function normalizarTurma(valor) {
    return String(valor ?? '').trim();
  }

  function criarOpcoesTurma(dados) {
    const turmasUnicas = [...new Set(dados.map(linha => normalizarTurma(linha.turma)).filter(Boolean))].sort();

    seletorTurma.innerHTML = '<option value="">Todas</option>';

    turmasUnicas.forEach(turma => {
      const option = document.createElement('option');
      option.value = turma;
      option.textContent = turma;
      seletorTurma.appendChild(option);
    });
  }

  function criarCabecalho() {
    cabecalhoNotas.innerHTML = '';

    const tr = document.createElement('tr');

    cabecalhos.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header === 'ra' ? 'RA' : header;
      tr.appendChild(th);
    });

    cabecalhoNotas.appendChild(tr);
  }

  function renderizarTabela() {
    const turmaSelecionada = seletorTurma.value;

    const filtrados = turmaSelecionada
      ? dadosCSV.filter(linha => normalizarTurma(linha.turma) === turmaSelecionada)
      : dadosCSV;

    corpoTabelaNotas.innerHTML = '';

    if (filtrados.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = cabecalhos.length;
      td.textContent = 'Nenhum dado encontrado para a turma selecionada.';
      tr.appendChild(td);
      corpoTabelaNotas.appendChild(tr);
      return;
    }

    filtrados.forEach(linha => {
      const tr = document.createElement('tr');

      cabecalhos.forEach(header => {
        const td = document.createElement('td');

        if (header === 'turma') {
          td.textContent = linha[header] ?? '';
        } else if (header === 'ra') {
          td.textContent = linha[header] ?? '';
        } else {
          td.textContent = linha[header] ?? '';
        }

        tr.appendChild(td);
      });

      corpoTabelaNotas.appendChild(tr);
    });
  }

  async function carregarNotas() {
    try {
      const resposta = await fetch('notas.csv');
      if (!resposta.ok) {
        throw new Error('Falha ao acessar o arquivo CSV.');
      }

      const texto = await resposta.text();
      dadosCSV = parseCSV(texto);

      if (dadosCSV.length === 0) {
        throw new Error('Arquivo CSV vazio.');
      }

      cabecalhos = Object.keys(dadosCSV[0]);

      if (!cabecalhos.includes('turma') || !cabecalhos.includes('ra')) {
        throw new Error('O CSV precisa conter as colunas turma e ra.');
      }

      criarOpcoesTurma(dadosCSV);
      criarCabecalho();
      renderizarTabela();

      loadingNotas.style.display = 'none';
      wrapperTabelaNotas.style.display = 'block';
    } catch (erro) {
      console.error(erro);
      loadingNotas.style.display = 'none';
      erroNotas.style.display = 'block';
    }
  }

  seletorTurma.addEventListener('change', renderizarTabela);

  carregarNotas();
});